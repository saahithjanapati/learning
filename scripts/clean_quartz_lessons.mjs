import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contentDir = path.join(repoRoot, "web", "lessons", "content")

await fs.rm(contentDir, { recursive: true, force: true })
console.log(`Removed generated ${path.relative(repoRoot, contentDir)}`)
