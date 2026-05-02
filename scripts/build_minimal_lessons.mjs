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
let markdownRelativeSet = new Set()

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
  const rootResolved = path.posix.normalize(pathname)
  const sourceResolved = path.posix.normalize(path.posix.join(sourceDir, pathname))
  const resolved = markdownRelativeSet.has(rootResolved) ? rootResolved : sourceResolved

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

function wrapResponsiveTables() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table" || typeof index !== "number" || !parent) {
        return
      }

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-scroll"] },
        children: [node],
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

function escapeScriptJson(value) {
  return value
    .replaceAll("&", "\\u0026")
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029")
}

function isIndividualReading(markdownRelative) {
  return /(^|\/)lessons\/(?!index\.md$)[^/]+\.md$/i.test(markdownRelative)
}

function buildCopyContext(markdown, title) {
  const body = stripFrontmatter(markdown).trim()
  const trimmedTitle = title.trim()

  if (!body) {
    return trimmedTitle
  }

  return /^#\s+/.test(body.trimStart()) ? body : `# ${trimmedTitle}\n\n${body}`
}

function renderPage({ title, body, sourceRelative, urlPrefix, copyContext = "" }) {
  const homeHref = routeWithPrefix(urlPrefix, "")
  const recentHref = routeWithPrefix(urlPrefix, "recent-lessons")
  const topicsHref = routeWithPrefix(urlPrefix, "topics")
  const quartzHref = markdownRelativeToQuartzUrl(sourceRelative)
  const copyContextButton = copyContext
    ? '<button class="copy-context-button" type="button" data-copy-context-button><span class="copy-context-label">Copy context for AI</span></button>'
    : ""
  const copyContextScript = copyContext
    ? `
  <script type="application/json" id="lesson-copy-context">${escapeScriptJson(JSON.stringify(copyContext))}</script>
  <script>
    (() => {
      const button = document.querySelector("[data-copy-context-button]")
      const source = document.getElementById("lesson-copy-context")

      if (!button || !source) {
        return
      }

      const label = button.querySelector(".copy-context-label")
      const defaultLabel = label?.textContent || "Copy context for AI"

      function fallbackCopy(text) {
        return new Promise((resolve, reject) => {
          const textarea = document.createElement("textarea")
          textarea.value = text
          textarea.setAttribute("readonly", "")
          textarea.style.position = "fixed"
          textarea.style.top = "-9999px"
          textarea.style.opacity = "0"
          document.body.append(textarea)
          textarea.select()

          try {
            document.execCommand("copy") ? resolve() : reject(new Error("Copy command failed"))
          } catch (error) {
            reject(error)
          } finally {
            textarea.remove()
          }
        })
      }

      function setTemporaryLabel(text) {
        if (!label) {
          return
        }

        label.textContent = text
        window.setTimeout(() => {
          label.textContent = defaultLabel
        }, 1800)
      }

      button.addEventListener("click", async () => {
        try {
          const text = JSON.parse(source.textContent || '""')
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            await fallbackCopy(text)
          }
          button.blur()
          setTemporaryLabel("Copied")
        } catch (error) {
          console.error(error)
          setTemporaryLabel("Copy failed")
        }
      })
    })()
  </script>`
    : ""

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
      --surface: #0b0d10;
      --surface-soft: #11151b;
      --text: #f1f4f8;
      --muted: #a2acba;
      --line: #242b36;
      --line-strong: #3a4657;
      --link: #86adf3;
      --accent: #a8c2f6;
      --heading-strong: #d7e4ff;
      --heading: #aac4f7;
      --heading-soft: #8faddf;
      --heading-rule: rgb(143 173 223 / 0.24);
      --code-bg: #101319;
      --code-border: #283141;
      --serif-font: Charter, "Iowan Old Style", "Palatino Linotype", Georgia, serif;
      --sans-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --mono-font: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
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
      font-family: var(--serif-font);
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
      font-family: var(--sans-font);
      font-size: 13px;
    }

    .brand {
      color: var(--text);
      font-weight: 700;
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
      background: var(--surface);
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
      border-radius: 4px;
      color: var(--muted);
      text-decoration: none;
    }

    header nav a:hover {
      border-color: var(--line-strong);
      color: var(--accent);
      background: var(--surface);
    }

    .reader-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 10px;
    }

    .copy-context-button {
      min-height: 32px;
      padding: 0.34rem 0.7rem;
      border: 1px solid var(--line-strong);
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);
      font-family: var(--sans-font);
      font-size: 13px;
      line-height: 1.2;
      cursor: pointer;
    }

    .copy-context-button:hover,
    .copy-context-button:focus-visible {
      border-color: var(--accent);
      color: var(--accent);
      outline: none;
    }

    article {
      overflow-wrap: anywhere;
    }

    article img,
    article video,
    article canvas,
    article iframe {
      max-width: 100%;
    }

    article img,
    article video,
    article canvas {
      height: auto;
    }

    h1,
    h2,
    h3,
    h4 {
      line-height: 1.2;
      letter-spacing: 0;
      margin: 2.2em 0 0.55em;
      color: var(--heading);
      font-family: var(--serif-font);
    }

    h1 {
      margin-top: 0;
      font-size: 3.1rem;
      font-weight: 700;
      line-height: 1.05;
      max-width: 20ch;
      color: var(--heading-strong);
    }

    h2 {
      font-size: 1.55rem;
      border-top: 1px solid var(--heading-rule);
      padding-top: 1.1em;
      font-weight: 680;
    }

    h1 a,
    h2 a,
    h3 a,
    h4 a {
      color: inherit;
      text-decoration: none;
    }

    h3 {
      font-size: 1.2rem;
      color: var(--heading-soft);
      font-weight: 680;
    }

    h4 {
      color: var(--heading-soft);
    }

    p,
    ul,
    ol,
    blockquote,
    pre,
    .table-scroll {
      margin: 1rem 0;
    }

    a {
      color: var(--link);
      text-decoration-thickness: 0.06em;
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
      font-style: italic;
    }

    code {
      font-family: var(--mono-font);
      font-size: 0.9em;
      background: var(--code-bg);
      padding: 0.12em 0.32em;
      border-radius: 4px;
      border: 1px solid var(--code-border);
      overflow-wrap: break-word;
    }

    pre {
      max-width: 100%;
      overflow-x: auto;
      background: var(--code-bg);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--line);
      line-height: 1.45;
      color: var(--text);
      -webkit-overflow-scrolling: touch;
    }

    pre code {
      background: transparent;
      padding: 0;
      border-radius: 0;
      border: 0;
      overflow-wrap: normal;
      word-break: normal;
    }

    .table-scroll {
      max-width: 100%;
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--surface);
      box-shadow: inset -18px 0 18px -18px rgb(168 194 246 / 0.22);
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: max-content;
      min-width: 100%;
      border-collapse: collapse;
      font-size: 0.95em;
      margin: 0;
    }

    th,
    td {
      border-bottom: 1px solid var(--line);
      padding: 0.5rem 0.65rem;
      vertical-align: top;
      max-width: 24rem;
      overflow-wrap: break-word;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    th {
      text-align: left;
      font-family: var(--sans-font);
      color: var(--heading-strong);
      background: var(--surface-soft);
    }

    .katex-display {
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.5rem 0;
      -webkit-overflow-scrolling: touch;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--line);
      margin: 2.5rem 0;
    }

    ::selection {
      background: rgb(134 173 243 / 0.22);
      color: var(--text);
    }

    @media (max-width: 640px) {
      .shell {
        width: min(100% - 24px, var(--max));
        padding-top: 18px;
      }

      body {
        font-size: 16px;
        line-height: 1.68;
      }

      header {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 34px;
      }

      header nav {
        justify-content: flex-start;
      }

      .reader-actions {
        justify-content: flex-start;
      }

      h1 {
        font-size: 2.25rem;
        max-width: 100%;
      }

      h2 {
        font-size: 1.34rem;
      }

      ul,
      ol {
        padding-left: 1.35rem;
      }

      blockquote {
        padding-left: 0.85rem;
      }

      pre {
        padding: 0.85rem;
      }

      .table-scroll {
        width: calc(100vw - 24px);
        margin-left: calc(50% - 50vw + 12px);
        margin-right: calc(50% - 50vw + 12px);
        border-radius: 0;
        border-left: 0;
        border-right: 0;
      }

      table {
        font-size: 0.9em;
      }

      th,
      td {
        min-width: 8rem;
        max-width: 14rem;
        padding: 0.62rem 0.72rem;
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <a class="brand" href="${homeHref}">Learning Machine</a>
      <div class="reader-actions">
        <nav aria-label="Reader navigation">
          <a href="${recentHref}">Recent</a>
          <a href="${topicsHref}">Topics</a>
          <a href="${quartzHref}">Quartz</a>
        </nav>
        ${copyContextButton}
      </div>
    </header>
    <article>
${body}
    </article>
  </main>
${copyContextScript}
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
    const copyContext = isIndividualReading(markdownRelative) ? buildCopyContext(markdown, title) : ""
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
        .use(wrapResponsiveTables)
        .use(rehypeKatex, { strict: "warn" })
        .use(rehypeStringify)
        .process(stripFrontmatter(markdown)),
    )
    const outputPath = markdownRelativeToOutputPath(markdownRelative, outputRoot)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(
      outputPath,
      renderPage({ title, body, sourceRelative: markdownRelative, urlPrefix, copyContext }),
    )
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
markdownRelativeSet = new Set(markdownFiles.map((markdownPath) => toPosix(path.relative(contentDir, markdownPath))))
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
