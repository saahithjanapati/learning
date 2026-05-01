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

function routeWithPrefix(urlPrefix, route) {
  const prefix = urlPrefix.replace(/\/$/, "")

  if (!route) {
    return prefix ? `${prefix}/` : "/"
  }

  return prefix ? `${prefix}/${route}/` : `/${route}/`
}

function markdownRelativeToRoute(markdownRelative) {
  const relativeWithoutExt = markdownRelative.replace(/\.md$/i, "")
  const parts = relativeWithoutExt.split("/")

  if (parts.at(-1) === "index") {
    parts.pop()
  }

  return parts.filter(Boolean).join("/")
}

function markdownRelativeToUrl(markdownRelative, urlPrefix) {
  return routeWithPrefix(urlPrefix, markdownRelativeToRoute(markdownRelative))
}

function markdownRelativeToQuartzUrl(markdownRelative) {
  return routeWithPrefix("/quartz", markdownRelativeToRoute(markdownRelative))
}

function markdownRelativeToOutputPath(markdownRelative, outputRoot) {
  const route = markdownRelativeToRoute(markdownRelative)
  const parts = route ? route.split("/") : []

  return path.join(outputRoot, ...parts, "index.html")
}

function rewriteMarkdownHref(href, sourceRelative, urlPrefix) {
  if (!href || href.startsWith("#") || href.startsWith("/") || isExternalHref(href)) {
    return href
  }

  const { pathname, suffix } = splitHref(href)

  if (!pathname.endsWith(".md")) {
    return href
  }

  const sourceDir = path.posix.dirname(sourceRelative)
  const resolved = path.posix.normalize(path.posix.join(sourceDir, pathname))

  return `${markdownRelativeToUrl(resolved, urlPrefix)}${suffix}`
}

function rewriteInternalLinks(sourceRelative, urlPrefix) {
  return (tree) => {
    visit(tree, "element", (node) => {
      const properties = node.properties ?? {}

      if (node.tagName === "a" && typeof properties.href === "string") {
        properties.href = rewriteMarkdownHref(properties.href, sourceRelative, urlPrefix)
        node.properties = properties
      }

      if (node.tagName === "img" && typeof properties.src === "string") {
        properties.src = rewriteMarkdownHref(properties.src, sourceRelative, urlPrefix)
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

function renderPage({ title, body, sourceRelative, urlPrefix }) {
  const homeHref = routeWithPrefix(urlPrefix, "")
  const recentHref = routeWithPrefix(urlPrefix, "recent-lessons")
  const topicsHref = routeWithPrefix(urlPrefix, "topics")
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
      color-scheme: dark;
      --bg: #050507;
      --surface: #0c0e13;
      --surface-soft: #121622;
      --text: #f3f7ff;
      --muted: #9aa7bf;
      --line: #20283a;
      --line-strong: #30405f;
      --link: #6ea3ff;
      --accent: #8bb8ff;
      --code-bg: #10131c;
      --code-border: #222b40;
      --max: 820px;
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
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 17px;
      line-height: 1.72;
    }

    .shell {
      width: min(100% - 32px, var(--max));
      margin: 0 auto;
      padding: 26px 0 80px;
    }

    header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 46px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--line);
      color: var(--muted);
      font-size: 13px;
    }

    .brand {
      color: var(--text);
      font-weight: 650;
      text-decoration: none;
    }

    .brand::before {
      content: "";
      display: inline-block;
      width: 0.68em;
      height: 0.68em;
      margin-right: 0.55em;
      border: 1px solid var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 18px rgb(110 163 255 / 0.3);
    }

    header nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
    }

    header nav a {
      padding: 0.28rem 0.56rem;
      border: 1px solid transparent;
      border-radius: 999px;
      color: var(--muted);
      text-decoration: none;
    }

    header nav a:hover {
      border-color: var(--line-strong);
      color: var(--accent);
      background: var(--surface);
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
      color: var(--text);
    }

    h1 {
      margin-top: 0;
      font-size: 3.1rem;
      font-weight: 720;
      line-height: 1.05;
      max-width: 20ch;
    }

    h2 {
      font-size: 1.55rem;
      border-top: 1px solid var(--line);
      padding-top: 1.1em;
    }

    h2 a,
    h3 a,
    h4 a {
      color: inherit;
      text-decoration: none;
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
      text-underline-offset: 0.22em;
    }

    a:hover {
      color: var(--accent);
    }

    blockquote {
      margin-left: 0;
      padding-left: 1rem;
      border-left: 2px solid var(--accent);
      color: var(--muted);
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.9em;
      background: var(--code-bg);
      padding: 0.12em 0.32em;
      border-radius: 4px;
      border: 1px solid var(--code-border);
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
      border: 0;
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

    hr {
      border: 0;
      border-top: 1px solid var(--line);
      margin: 2.5rem 0;
    }

    ::selection {
      background: rgb(110 163 255 / 0.24);
      color: var(--text);
    }

    @media (max-width: 640px) {
      .shell {
        width: min(100% - 24px, var(--max));
        padding-top: 18px;
      }

      header {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }

      header nav {
        justify-content: flex-start;
      }

      h1 {
        font-size: 2.25rem;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <a class="brand" href="${homeHref}">Learning Machine</a>
      <nav aria-label="Reader navigation">
        <a href="${recentHref}">Recent</a>
        <a href="${topicsHref}">Topics</a>
        <a href="${quartzHref}">Quartz</a>
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

async function cleanOutputRoot(outputRoot, preserveNames = new Set()) {
  await fs.mkdir(outputRoot, { recursive: true })

  const entries = await fs.readdir(outputRoot, { withFileTypes: true })

  for (const entry of entries) {
    if (preserveNames.has(entry.name)) {
      continue
    }

    await fs.rm(path.join(outputRoot, entry.name), { recursive: true, force: true })
  }
}

async function renderTarget({ outputRoot, urlPrefix, preserveNames }) {
  await cleanOutputRoot(outputRoot, preserveNames)

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
        .use(rewriteInternalLinks, markdownRelative, urlPrefix)
        .use(rehypeKatex, { strict: "warn" })
        .use(rehypeStringify)
        .process(stripFrontmatter(markdown)),
    )
    const outputPath = markdownRelativeToOutputPath(markdownRelative, outputRoot)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, renderPage({ title, body, sourceRelative: markdownRelative, urlPrefix }))
  }

  await fs.writeFile(
    path.join(outputRoot, "404.html"),
    renderPage({
      title: "Not Found",
      body: "<h1>Not found</h1>\n<p>This reader could not find that lesson route.</p>",
      sourceRelative: "index.md",
      urlPrefix,
    }),
  )
}

const markdownFiles = (await walk(contentDir)).sort((a, b) => toPosix(a).localeCompare(toPosix(b)))
const targets = [
  { outputRoot: publicDir, urlPrefix: "", preserveNames: new Set(["quartz"]) },
  { outputRoot: path.join(publicDir, "minimal"), urlPrefix: "/minimal", preserveNames: new Set() },
]

for (const target of targets) {
  await renderTarget(target)
}

console.log(
  `Rendered ${markdownFiles.length} minimalist lesson pages to ${targets
    .map((target) => path.relative(repoRoot, target.outputRoot))
    .join(" and ")}`,
)
