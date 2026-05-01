import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contentDir = path.join(repoRoot, "web", "lessons", "content")
const publicDir = path.join(repoRoot, "web", "lessons", "public")
const outputRoot = path.join(publicDir, "minimal")

function toPosix(filePath) {
  return filePath.split(path.sep).join("/")
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath)
    }
  }

  return files
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "")
}

function extractTitle(markdown, fallback) {
  const frontmatterTitle = markdown.match(/^---\n[\s\S]*?\ntitle:\s*["']?(.+?)["']?\s*\n[\s\S]*?\n---\n/)

  if (frontmatterTitle?.[1]) {
    return frontmatterTitle[1].trim()
  }

  const headingTitle = markdown.match(/^#\s+(.+)$/m)

  if (headingTitle?.[1]) {
    return headingTitle[1].replace(/#+\s*$/, "").trim()
  }

  return path.basename(fallback, ".md")
}

function isExternalHref(href) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)
}

function splitHref(href) {
  const match = href.match(/^([^?#]*)([?#].*)?$/)

  return {
    pathname: match?.[1] ?? href,
    suffix: match?.[2] ?? "",
  }
}

function markdownRelativeToUrl(markdownRelative) {
  const relativeWithoutExt = markdownRelative.replace(/\.md$/i, "")
  const parts = relativeWithoutExt.split("/")

  if (parts.at(-1) === "index") {
    parts.pop()
  }

  const route = parts.filter(Boolean).join("/")

  return route ? `/minimal/${route}/` : "/minimal/"
}

function markdownRelativeToQuartzUrl(markdownRelative) {
  const relativeWithoutExt = markdownRelative.replace(/\.md$/i, "")
  const parts = relativeWithoutExt.split("/")

  if (parts.at(-1) === "index") {
    parts.pop()
  }

  const route = parts.filter(Boolean).join("/")

  return route ? `/${route}/` : "/"
}

function markdownRelativeToOutputPath(markdownRelative) {
  const relativeWithoutExt = markdownRelative.replace(/\.md$/i, "")
  const parts = relativeWithoutExt.split("/")

  if (parts.at(-1) === "index") {
    parts.pop()
  }

  return path.join(outputRoot, ...parts, "index.html")
}

function rewriteMarkdownHref(href, sourceRelative) {
  if (!href || href.startsWith("#") || href.startsWith("/") || isExternalHref(href)) {
    return href
  }

  const { pathname, suffix } = splitHref(href)

  if (!pathname.endsWith(".md")) {
    return href
  }

  const sourceDir = path.posix.dirname(sourceRelative)
  const resolved = path.posix.normalize(path.posix.join(sourceDir, pathname))

  return `${markdownRelativeToUrl(resolved)}${suffix}`
}

function rewriteInternalLinks(sourceRelative) {
  return (tree) => {
    visit(tree, "element", (node) => {
      const properties = node.properties ?? {}

      if (node.tagName === "a" && typeof properties.href === "string") {
        properties.href = rewriteMarkdownHref(properties.href, sourceRelative)
        node.properties = properties
      }

      if (node.tagName === "img" && typeof properties.src === "string") {
        properties.src = rewriteMarkdownHref(properties.src, sourceRelative)
        node.properties = properties
      }
    })
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function renderPage({ title, body, sourceRelative }) {
  const quartzHref = markdownRelativeToQuartzUrl(sourceRelative)

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} - Minimal Lessons</title>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
  <style>
    :root {
      color-scheme: light dark;
      --bg: #fbfbf8;
      --text: #171717;
      --muted: #666;
      --line: #ddd9cf;
      --link: #174ea6;
      --code-bg: #f0eee8;
      --max: 760px;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #101114;
        --text: #e8e8e3;
        --muted: #aaa7a0;
        --line: #2e3035;
        --link: #8ab4f8;
        --code-bg: #1c1f24;
      }
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
      font-size: 18px;
      line-height: 1.68;
    }

    .shell {
      width: min(100% - 32px, var(--max));
      margin: 0 auto;
      padding: 28px 0 72px;
    }

    header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: baseline;
      margin-bottom: 40px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
      color: var(--muted);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
    }

    header nav {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-end;
    }

    article {
      overflow-wrap: anywhere;
    }

    h1,
    h2,
    h3,
    h4 {
      line-height: 1.2;
      letter-spacing: 0;
      margin: 2.2em 0 0.55em;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    h1 {
      margin-top: 0;
      font-size: clamp(2rem, 6vw, 3.25rem);
    }

    h2 {
      font-size: 1.65rem;
      border-top: 1px solid var(--line);
      padding-top: 1.1em;
    }

    h3 {
      font-size: 1.2rem;
    }

    p,
    ul,
    ol,
    blockquote,
    pre,
    table {
      margin: 1rem 0;
    }

    a {
      color: var(--link);
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.18em;
    }

    blockquote {
      margin-left: 0;
      padding-left: 1rem;
      border-left: 3px solid var(--line);
      color: var(--muted);
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.9em;
      background: var(--code-bg);
      padding: 0.12em 0.32em;
      border-radius: 4px;
    }

    pre {
      overflow-x: auto;
      background: var(--code-bg);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--line);
      line-height: 1.45;
    }

    pre code {
      background: transparent;
      padding: 0;
      border-radius: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95em;
      display: block;
      overflow-x: auto;
    }

    th,
    td {
      border-bottom: 1px solid var(--line);
      padding: 0.5rem 0.65rem;
      vertical-align: top;
    }

    th {
      text-align: left;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .katex-display {
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.5rem 0;
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <a href="/minimal/">Minimal Lessons</a>
      <nav>
        <a href="/">Quartz</a>
        <a href="${quartzHref}">Quartz version</a>
      </nav>
    </header>
    <article>
${body}
    </article>
  </main>
</body>
</html>
`
}

const markdownFiles = (await walk(contentDir)).sort((a, b) => toPosix(a).localeCompare(toPosix(b)))

await fs.rm(outputRoot, { recursive: true, force: true })
await fs.mkdir(outputRoot, { recursive: true })

for (const markdownPath of markdownFiles) {
  const markdownRelative = toPosix(path.relative(contentDir, markdownPath))
  const markdown = await fs.readFile(markdownPath, "utf8")
  const title = extractTitle(markdown, markdownRelative)
  const body = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: "wrap" })
      .use(rewriteInternalLinks, markdownRelative)
      .use(rehypeKatex, { strict: "warn" })
      .use(rehypeStringify)
      .process(stripFrontmatter(markdown)),
  )
  const outputPath = markdownRelativeToOutputPath(markdownRelative)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, renderPage({ title, body, sourceRelative: markdownRelative }))
}

console.log(`Rendered ${markdownFiles.length} minimalist lesson pages to ${path.relative(repoRoot, outputRoot)}`)
