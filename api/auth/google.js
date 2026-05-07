import { createOAuthState } from "../_lib/auth.js"
import { getBaseUrl, getRequestUrl, methodNotAllowed, redirect, sanitizeNextPath, sendApiError } from "../_lib/http.js"

export default async function handler(request, response) {
  if (request.method !== "GET") {
    methodNotAllowed(response, ["GET"])
    return
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID

    if (!clientId) {
      const error = new Error("GOOGLE_CLIENT_ID is not configured")
      error.statusCode = 500
      throw error
    }

    const requestUrl = getRequestUrl(request)
    const nextPath = sanitizeNextPath(requestUrl.searchParams.get("next"))
    const state = createOAuthState(response, request, nextPath)
    const baseUrl = getBaseUrl(request)
    const redirectUri = `${baseUrl}/api/auth/callback/google`
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")

    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("scope", "openid email profile")
    authUrl.searchParams.set("state", state)
    authUrl.searchParams.set("prompt", "select_account")

    redirect(response, 302, authUrl.toString())
  } catch (error) {
    sendApiError(response, error, "Could not start Google sign-in")
  }
}
