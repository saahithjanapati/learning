const MAX_JSON_BODY_BYTES = 32 * 1024

function appendHeader(response, name, value) {
  const existing = response.getHeader?.(name)

  if (!existing) {
    response.setHeader(name, value)
    return
  }

  const values = Array.isArray(existing) ? existing : [existing]
  response.setHeader(name, [...values, value])
}

export function parseCookies(request) {
  const header = request.headers.cookie ?? ""
  const cookies = new Map()

  for (const part of header.split(";")) {
    const [rawName, ...rawValueParts] = part.trim().split("=")

    if (!rawName) {
      continue
    }

    const rawValue = rawValueParts.join("=")

    try {
      cookies.set(rawName, decodeURIComponent(rawValue ?? ""))
    } catch {
      cookies.set(rawName, rawValue ?? "")
    }
  }

  return cookies
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`]

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`)
  }

  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`)
  }

  parts.push(`Path=${options.path ?? "/"}`)

  if (options.httpOnly !== false) {
    parts.push("HttpOnly")
  }

  parts.push(`SameSite=${options.sameSite ?? "Lax"}`)

  if (options.secure) {
    parts.push("Secure")
  }

  return parts.join("; ")
}

export function setCookie(response, cookie) {
  appendHeader(response, "Set-Cookie", cookie)
}

export function shouldUseSecureCookie(request) {
  const host = String(request.headers.host ?? "")
  const forwardedProto = String(request.headers["x-forwarded-proto"] ?? "")
    .split(",")
    .at(0)
    ?.trim()

  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return false
  }

  return forwardedProto === "https" || Boolean(process.env.VERCEL)
}

export function clearCookie(response, request, name) {
  setCookie(
    response,
    serializeCookie(name, "", {
      expires: new Date(0),
      maxAge: 0,
      secure: shouldUseSecureCookie(request),
    }),
  )
}

export function getBaseUrl(request) {
  const host = String(request.headers["x-forwarded-host"] ?? request.headers.host ?? "")
    .split(",")
    .at(0)
    ?.trim()

  if (!host) {
    return process.env.READER_BASE_URL ?? "http://localhost:8080"
  }

  const forwardedProto = String(request.headers["x-forwarded-proto"] ?? "")
    .split(",")
    .at(0)
    ?.trim()
  const proto = forwardedProto || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https")

  return `${proto}://${host}`
}

export function getRequestUrl(request) {
  return new URL(request.url ?? "/", getBaseUrl(request))
}

export function sanitizeNextPath(value, fallback = "/") {
  if (!value || typeof value !== "string") {
    return fallback
  }

  const trimmed = value.trim()

  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/api/")) {
    return fallback
  }

  return trimmed.slice(0, 800)
}

export async function readJsonBody(request) {
  const chunks = []
  let size = 0

  for await (const chunk of request) {
    size += chunk.length

    if (size > MAX_JSON_BODY_BYTES) {
      const error = new Error("Request body is too large")
      error.statusCode = 413
      throw error
    }

    chunks.push(chunk)
  }

  if (chunks.length === 0) {
    return {}
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"))
  } catch {
    const error = new Error("Request body must be valid JSON")
    error.statusCode = 400
    throw error
  }
}

export function sendJson(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  })
  response.end(JSON.stringify(body))
}

export function redirect(response, statusCode, location) {
  response.writeHead(statusCode, {
    Location: location,
    "Cache-Control": "no-store",
  })
  response.end()
}

export function methodNotAllowed(response, methods) {
  sendJson(
    response,
    405,
    { error: "Method not allowed" },
    {
      Allow: methods.join(", "),
    },
  )
}

export function sendApiError(response, error, fallbackMessage = "Request failed") {
  const statusCode = Number(error?.statusCode) || 500
  const message = statusCode >= 500 ? fallbackMessage : error.message

  if (statusCode >= 500) {
    console.error(error)
  }

  sendJson(response, statusCode, { error: message })
}
