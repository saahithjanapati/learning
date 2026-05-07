import { destroySession } from "../_lib/auth.js"
import { getRequestUrl, methodNotAllowed, redirect, sanitizeNextPath, sendApiError, sendJson } from "../_lib/http.js"

export default async function handler(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    methodNotAllowed(response, ["GET", "POST"])
    return
  }

  try {
    await destroySession(response, request)

    if (request.method === "GET") {
      const nextPath = sanitizeNextPath(getRequestUrl(request).searchParams.get("next"))
      redirect(response, 302, nextPath)
      return
    }

    sendJson(response, 200, { ok: true })
  } catch (error) {
    sendApiError(response, error, "Could not sign out")
  }
}
