import crypto from "node:crypto"

import { ensureReaderSchema, getSql } from "./db.js"
import { clearCookie, parseCookies, serializeCookie, setCookie, shouldUseSecureCookie } from "./http.js"

export const SESSION_COOKIE = "lm_reader_session"
export const OAUTH_STATE_COOKIE = "lm_reader_oauth_state"
export const OAUTH_NEXT_COOKIE = "lm_reader_oauth_next"

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30
const OAUTH_MAX_AGE_SECONDS = 60 * 10

function randomToken(byteLength = 32) {
  return crypto.randomBytes(byteLength).toString("base64url")
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

function sessionCookieOptions(request) {
  return {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "Lax",
    secure: shouldUseSecureCookie(request),
  }
}

function oauthCookieOptions(request) {
  return {
    httpOnly: true,
    maxAge: OAUTH_MAX_AGE_SECONDS,
    sameSite: "Lax",
    secure: shouldUseSecureCookie(request),
  }
}

export function createOAuthState(response, request, nextPath) {
  const state = randomToken(24)
  const options = oauthCookieOptions(request)

  setCookie(response, serializeCookie(OAUTH_STATE_COOKIE, state, options))
  setCookie(response, serializeCookie(OAUTH_NEXT_COOKIE, nextPath, options))

  return state
}

export function readOAuthState(request) {
  const cookies = parseCookies(request)

  return {
    state: cookies.get(OAUTH_STATE_COOKIE) ?? "",
    nextPath: cookies.get(OAUTH_NEXT_COOKIE) ?? "/",
  }
}

export function clearOAuthState(response, request) {
  clearCookie(response, request, OAUTH_STATE_COOKIE)
  clearCookie(response, request, OAUTH_NEXT_COOKIE)
}

export async function upsertGoogleUser(profile) {
  await ensureReaderSchema()

  const sql = getSql()
  const id = crypto.randomUUID()
  const email = String(profile.email ?? "").toLowerCase()
  const emailVerified = profile.email_verified === true || profile.email_verified === "true"

  const allowedEmails = String(process.env.READER_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((emailAddress) => emailAddress.trim().toLowerCase())
    .filter(Boolean)

  if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
    const error = new Error("This Google account is not allowed for this reader")
    error.statusCode = 403
    throw error
  }

  const [user] = await sql`
    INSERT INTO reader_users (
      id,
      google_sub,
      email,
      email_verified,
      name,
      picture_url
    )
    VALUES (
      ${id},
      ${profile.sub},
      ${email},
      ${emailVerified},
      ${profile.name ?? null},
      ${profile.picture ?? null}
    )
    ON CONFLICT (google_sub) DO UPDATE SET
      email = EXCLUDED.email,
      email_verified = EXCLUDED.email_verified,
      name = EXCLUDED.name,
      picture_url = EXCLUDED.picture_url,
      updated_at = now()
    RETURNING id, email, name, picture_url
  `

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    pictureUrl: user.picture_url,
  }
}

export async function createSession(response, request, userId) {
  await ensureReaderSchema()

  const sql = getSql()
  const token = randomToken(32)
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000)

  await sql`
    DELETE FROM reader_sessions
    WHERE expires_at <= now()
  `

  await sql`
    INSERT INTO reader_sessions (token_hash, user_id, expires_at)
    VALUES (${tokenHash}, ${userId}, ${expiresAt.toISOString()})
  `

  setCookie(response, serializeCookie(SESSION_COOKIE, token, sessionCookieOptions(request)))
}

export async function getSessionUser(request) {
  const token = parseCookies(request).get(SESSION_COOKIE)

  if (!token) {
    return null
  }

  await ensureReaderSchema()

  const sql = getSql()
  const [session] = await sql`
    SELECT
      u.id,
      u.email,
      u.name,
      u.picture_url,
      s.expires_at
    FROM reader_sessions s
    INNER JOIN reader_users u ON u.id = s.user_id
    WHERE s.token_hash = ${hashToken(token)}
      AND s.expires_at > now()
    LIMIT 1
  `

  if (!session) {
    return null
  }

  await sql`
    UPDATE reader_sessions
    SET last_seen_at = now()
    WHERE token_hash = ${hashToken(token)}
  `

  return {
    id: session.id,
    email: session.email,
    name: session.name,
    pictureUrl: session.picture_url,
    sessionExpiresAt: session.expires_at,
  }
}

export async function requireSessionUser(request) {
  const user = await getSessionUser(request)

  if (!user) {
    const error = new Error("Sign in required")
    error.statusCode = 401
    throw error
  }

  return user
}

export async function destroySession(response, request) {
  const token = parseCookies(request).get(SESSION_COOKIE)

  if (token) {
    await ensureReaderSchema()
    await getSql()`
      DELETE FROM reader_sessions
      WHERE token_hash = ${hashToken(token)}
    `
  }

  clearCookie(response, request, SESSION_COOKIE)
}
