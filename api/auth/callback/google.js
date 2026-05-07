import { clearOAuthState, createSession, readOAuthState, upsertGoogleUser } from "../../_lib/auth.js"
import { getBaseUrl, getRequestUrl, methodNotAllowed, redirect, sanitizeNextPath, sendApiError } from "../../_lib/http.js"

async function exchangeCodeForToken({ code, redirectUri }) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    const error = new Error("Google OAuth environment variables are not configured")
    error.statusCode = 500
    throw error
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  })

  const tokenBody = await tokenResponse.json().catch(() => ({}))

  if (!tokenResponse.ok || !tokenBody.access_token) {
    const error = new Error("Google token exchange failed")
    error.statusCode = 401
    throw error
  }

  return tokenBody.access_token
}

async function fetchGoogleProfile(accessToken) {
  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const profile = await profileResponse.json().catch(() => ({}))

  if (!profileResponse.ok || !profile.sub || !profile.email) {
    const error = new Error("Could not read Google profile")
    error.statusCode = 401
    throw error
  }

  const emailVerified = profile.email_verified === true || profile.email_verified === "true"

  if (!emailVerified) {
    const error = new Error("Google email must be verified")
    error.statusCode = 403
    throw error
  }

  return profile
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    methodNotAllowed(response, ["GET"])
    return
  }

  try {
    const requestUrl = getRequestUrl(request)
    const code = requestUrl.searchParams.get("code")
    const returnedState = requestUrl.searchParams.get("state")
    const { state, nextPath } = readOAuthState(request)

    clearOAuthState(response, request)

    if (!code || !returnedState || !state || returnedState !== state) {
      const error = new Error("Google sign-in state did not match")
      error.statusCode = 400
      throw error
    }

    const baseUrl = getBaseUrl(request)
    const redirectUri = `${baseUrl}/api/auth/callback/google`
    const accessToken = await exchangeCodeForToken({ code, redirectUri })
    const profile = await fetchGoogleProfile(accessToken)
    const user = await upsertGoogleUser(profile)

    await createSession(response, request, user.id)
    redirect(response, 302, sanitizeNextPath(nextPath))
  } catch (error) {
    sendApiError(response, error, "Google sign-in failed")
  }
}
