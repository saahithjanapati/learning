import fs from "node:fs/promises"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"

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

const server = http.createServer(async (request, response) => {
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
