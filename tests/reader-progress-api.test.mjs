import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"
import test from "node:test"

import { createSession } from "../api/_lib/auth.js"
import { ensureReaderSchema, getSql } from "../api/_lib/db.js"
import { sanitizeNextPath } from "../api/_lib/http.js"
import googleAuthHandler from "../api/auth/google.js"
import meHandler from "../api/auth/me.js"
import lessonProgressHandler from "../api/lesson-progress.js"
import middleware from "../middleware.js"

function loadDotEnvLocal() {
  if (!fs.existsSync(".env.local")) {
    return
  }

  const lines = fs.readFileSync(".env.local", "utf8").split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)

    if (!match || process.env[match[1]]) {
      continue
    }

    let value = match[2].trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    process.env[match[1]] = value
  }
}

function createRequest({ method = "GET", url = "/", headers = {}, body = "" } = {}) {
  return {
    method,
    url,
    headers: {
      host: "localhost:8080",
      ...headers,
    },
    async *[Symbol.asyncIterator]() {
      if (body) {
        yield Buffer.from(body)
      }
    },
  }
}

function createResponse() {
  const headers = new Map()
  const chunks = []

  return {
    statusCode: 200,
    headersSent: false,
    setHeader(name, value) {
      headers.set(name.toLowerCase(), value)
    },
    getHeader(name) {
      return headers.get(name.toLowerCase())
    },
    writeHead(statusCode, responseHeaders = {}) {
      this.statusCode = statusCode

      for (const [name, value] of Object.entries(responseHeaders)) {
        headers.set(name.toLowerCase(), value)
      }

      this.headersSent = true
    },
    end(chunk = "") {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
      }

      this.body = Buffer.concat(chunks).toString("utf8")
      this.headers = Object.fromEntries(headers)
      this.headersSent = true
    },
    body: "",
    headers: {},
  }
}

function parseJson(response) {
  return JSON.parse(response.body || "{}")
}

function asCookieHeader(setCookie) {
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie]
  return cookies.map((cookie) => cookie.split(";")[0]).join("; ")
}

loadDotEnvLocal()

test("Google auth start redirects with a safe callback and state cookie", async () => {
  const previousClientId = process.env.GOOGLE_CLIENT_ID
  process.env.GOOGLE_CLIENT_ID = "reader-test-client.apps.googleusercontent.com"

  try {
    const request = createRequest({
      url: "/api/auth/google?next=/topics/ai/lessons/example/",
    })
    const response = createResponse()

    await googleAuthHandler(request, response)

    assert.equal(response.statusCode, 302)
    assert.match(response.headers.location, /^https:\/\/accounts\.google\.com\/o\/oauth2\/v2\/auth\?/)

    const location = new URL(response.headers.location)
    assert.equal(location.searchParams.get("client_id"), process.env.GOOGLE_CLIENT_ID)
    assert.equal(
      location.searchParams.get("redirect_uri"),
      "http://localhost:8080/api/auth/callback/google",
    )
    assert.equal(location.searchParams.get("response_type"), "code")
    assert.equal(location.searchParams.get("scope"), "openid email profile")
    assert.ok(location.searchParams.get("state"))

    const setCookie = response.headers["set-cookie"]
    assert.ok(Array.isArray(setCookie))
    assert.ok(setCookie.some((cookie) => cookie.startsWith("lm_reader_oauth_state=")))
    assert.ok(setCookie.some((cookie) => cookie.startsWith("lm_reader_oauth_next=")))
  } finally {
    if (previousClientId === undefined) {
      delete process.env.GOOGLE_CLIENT_ID
    } else {
      process.env.GOOGLE_CLIENT_ID = previousClientId
    }
  }
})

test("next paths are restricted to same-site reader pages", () => {
  assert.equal(sanitizeNextPath("/topics/ai/lessons/example/"), "/topics/ai/lessons/example/")
  assert.equal(sanitizeNextPath("https://evil.example/topics/ai"), "/")
  assert.equal(sanitizeNextPath("//evil.example/topics/ai"), "/")
  assert.equal(sanitizeNextPath("/api/auth/me"), "/")
})

test("session endpoint returns signed-out state without touching the database", async () => {
  const response = createResponse()

  await meHandler(createRequest({ url: "/api/auth/me" }), response)

  assert.equal(response.statusCode, 200)
  assert.deepEqual(parseJson(response), { user: null })
})

test("reader middleware redirects signed-out page requests to Google auth", async () => {
  const response = await middleware(
    new Request("https://learning-machine.vercel.app/topics/ai/lessons/example/?x=1"),
  )

  assert.equal(response.status, 302)

  const location = new URL(response.headers.get("location"))
  assert.equal(location.origin, "https://learning-machine.vercel.app")
  assert.equal(location.pathname, "/api/auth/google")
  assert.equal(location.searchParams.get("next"), "/topics/ai/lessons/example/?x=1")
})

test("reader middleware does not gate public assets", async () => {
  const response = await middleware(new Request("https://learning-machine.vercel.app/favicon.svg"))

  assert.equal(response.status, 200)
})

test("lesson progress requires a signed-in session", async () => {
  const response = createResponse()

  await lessonProgressHandler(createRequest({ url: "/api/lesson-progress" }), response)

  assert.equal(response.statusCode, 401)
  assert.deepEqual(parseJson(response), { error: "Sign in required" })
})

test(
  "live database progress round-trip",
  {
    skip:
      process.env.RUN_READER_DB_TEST === "1" && process.env.DATABASE_URL
        ? false
        : "set RUN_READER_DB_TEST=1 and DATABASE_URL to run the Neon-backed integration test",
  },
  async () => {
    await ensureReaderSchema()

    const sql = getSql()
    const userId = crypto.randomUUID()
    const testSuffix = crypto.randomUUID()
    const lessonId = `test/reader-progress/${testSuffix}`
    const sessionResponse = createResponse()
    const sessionRequest = createRequest()

    try {
      await sql`
        INSERT INTO reader_users (
          id,
          google_sub,
          email,
          email_verified,
          name,
          picture_url
        )
        VALUES (
          ${userId},
          ${`test-google-sub-${testSuffix}`},
          ${`reader-progress-${testSuffix}@example.invalid`},
          true,
          'Reader Progress Test',
          null
        )
      `

      await createSession(sessionResponse, sessionRequest, userId)
      const cookieHeader = asCookieHeader(sessionResponse.getHeader("Set-Cookie"))

      const updateResponse = createResponse()
      await lessonProgressHandler(
        createRequest({
          method: "PUT",
          url: "/api/lesson-progress",
          headers: {
            cookie: cookieHeader,
          },
          body: JSON.stringify({
            lessonId,
            isRead: true,
          }),
        }),
        updateResponse,
      )

      assert.equal(updateResponse.statusCode, 200)
      assert.equal(parseJson(updateResponse).progress.lessonId, lessonId)
      assert.equal(parseJson(updateResponse).progress.isRead, true)
      assert.ok(parseJson(updateResponse).progress.readAt)

      const listResponse = createResponse()
      await lessonProgressHandler(
        createRequest({
          url: "/api/lesson-progress",
          headers: {
            cookie: cookieHeader,
          },
        }),
        listResponse,
      )

      assert.equal(listResponse.statusCode, 200)
      assert.ok(parseJson(listResponse).progress.some((row) => row.lessonId === lessonId && row.isRead))
    } finally {
      await sql`
        DELETE FROM reader_users
        WHERE id = ${userId}
      `
    }
  },
)
