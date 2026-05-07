import { next } from "@vercel/functions"

import { getSessionUser } from "./api/_lib/auth.js"

const PUBLIC_FILE_PATTERN = /\.(?:css|js|mjs|json|png|jpg|jpeg|gif|svg|ico|webp|avif|woff2?|ttf|map|txt|xml)$/i

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api).*)"],
}

function isPublicAsset(pathname) {
  return pathname === "/favicon.svg" || PUBLIC_FILE_PATTERN.test(pathname)
}

export default async function middleware(request) {
  const url = new URL(request.url)

  if (isPublicAsset(url.pathname)) {
    return next()
  }

  try {
    const user = await getSessionUser(request)

    if (user) {
      return next()
    }
  } catch (error) {
    console.error("Reader auth gate failed", error)
  }

  const signInUrl = new URL("/api/auth/google", request.url)
  signInUrl.searchParams.set("next", `${url.pathname}${url.search}${url.hash}`)

  return Response.redirect(signInUrl, 302)
}
