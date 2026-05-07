import fs from "node:fs/promises"
import http from "node:http"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const publicDir = path.resolve(repoRoot, process.argv[2] ?? "web/lessons/public")
const port = Number(process.argv[3] ?? 8080)

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
}

function resolveRequestPath(requestUrl) {
  const pathname = new URL(requestUrl, "http://localhost").pathname
  const safeSegments = pathname
    .split("/")
    .map((segment) => decodeURIComponent(segment))
    .filter((segment) => segment && segment !== "." && segment !== "..")
  const filePath = path.join(publicDir, ...safeSegments)

  if (filePath !== publicDir && !filePath.startsWith(`${publicDir}${path.sep}`)) {
    return path.join(publicDir, "404.html")
  }

  return filePath
}

async function findFile(urlPath) {
  const requestedPath = resolveRequestPath(urlPath)
  const candidates = [
    requestedPath,
    `${requestedPath}.html`,
    path.join(requestedPath, "index.html"),
  ]

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate)
      if (stat.isFile()) {
        return { filePath: candidate, status: 200 }
      }
    } catch {
      // Try the next clean-URL candidate.
    }
  }

  return { filePath: path.join(publicDir, "404.html"), status: 404 }
}

function resolveApiPath(requestUrl) {
  const pathname = new URL(requestUrl, "http://localhost").pathname

  if (!pathname.startsWith("/api/")) {
    return null
  }

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment))

  if (segments.some((segment) => !/^[A-Za-z0-9_-]+$/.test(segment))) {
    return null
  }

  const apiPath = path.join(repoRoot, ...segments) + ".js"
  const apiRoot = path.join(repoRoot, "api")

  if (!apiPath.startsWith(`${apiRoot}${path.sep}`)) {
    return null
  }

  return apiPath
}

async function handleApi(request, response) {
  const apiPath = resolveApiPath(request.url ?? "/")

  if (!apiPath) {
    return false
  }

  try {
    const stat = await fs.stat(apiPath)

    if (!stat.isFile()) {
      return false
    }

    const moduleUrl = `${pathToFileURL(apiPath).href}?mtime=${stat.mtimeMs}`
    const apiModule = await import(moduleUrl)

    if (typeof apiModule.default !== "function") {
      return false
    }

    await apiModule.default(request, response)
  } catch (error) {
    console.error(error)

    if (!response.headersSent) {
      response.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      })
    }

    response.end(JSON.stringify({ error: "API request failed" }))
  }

  return true
}

const server = http.createServer(async (request, response) => {
  if (await handleApi(request, response)) {
    return
  }

  const result = await findFile(request.url ?? "/")

  if (!result) {
    response.writeHead(404)
    response.end("Not found")
    return
  }

  const { filePath, status } = result
  const ext = path.extname(filePath)
  const body = await fs.readFile(filePath)

  response.writeHead(status, {
    "Content-Type": contentTypes[ext] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  })
  response.end(body)
})

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${path.relative(repoRoot, publicDir)} at http://localhost:${port}`)
})
