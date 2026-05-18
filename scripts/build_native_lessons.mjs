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
const faviconSourcePath = path.join(repoRoot, "web", "lessons", "assets", "favicon.svg")
const includeSourceTextCopy = ["1", "true", "yes"].includes((process.env.LESSONS_INCLUDE_SOURCE_TEXT || "").toLowerCase())
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

function stripSourceTextPointers(markdown) {
  return markdown.replace(/<!--\s*(?:Source text|Full source text):\s*[^>]+?\s*-->\s*/gi, "")
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

function assetWithPrefix(urlPrefix, assetPath) {
  const prefix = urlPrefix.replace(/\/$/, "")
  return prefix ? `${prefix}/${assetPath}` : `/${assetPath}`
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
  return /(^|\/)(?:lessons|papers)\/.+\.md$/i.test(markdownRelative) && !/(^|\/)(?:lessons|papers)\/index\.md$/i.test(markdownRelative)
}

function buildCopyContext(markdown, title) {
  const body = stripSourceTextPointers(stripFrontmatter(markdown)).trim()
  const trimmedTitle = title.trim()

  if (!body) {
    return trimmedTitle
  }

  return /^#\s+/.test(body.trimStart()) ? body : `# ${trimmedTitle}\n\n${body}`
}

function extractSourceTextRelative(markdown) {
  const commentMatch = markdown.match(/<!--\s*(?:Source text|Full source text):\s*([^>]+?)\s*-->/i)
  const inlineMatch = markdown.match(/^(?:Source text|Full source text|Source text file):\s*(?:\[[^\]]+\]\(([^)]+)\)|`([^`]+)`|(.+?))\s*$/im)
  const rawValue = commentMatch?.[1] ?? inlineMatch?.[1] ?? inlineMatch?.[2] ?? inlineMatch?.[3] ?? ""

  return rawValue
    .trim()
    .replace(/^<|>$/g, "")
    .replace(/^\/+/, "")
}

async function readSourceTextForMarkdown(markdown) {
  if (!includeSourceTextCopy) {
    return ""
  }

  const sourceTextRelative = extractSourceTextRelative(markdown)

  if (!sourceTextRelative || !sourceTextRelative.startsWith("materials/source_text/")) {
    return ""
  }

  const sourceTextPath = path.resolve(repoRoot, sourceTextRelative)
  const sourceTextRoot = path.resolve(repoRoot, "materials", "source_text")

  if (!sourceTextPath.startsWith(`${sourceTextRoot}${path.sep}`)) {
    return ""
  }

  try {
    return await fs.readFile(sourceTextPath, "utf8")
  } catch {
    return ""
  }
}

function normalizedHeadingText(value) {
  return value
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

function findMarkdownSection(markdown, headingMatcher) {
  const lines = stripFrontmatter(markdown).trim().split(/\r?\n/)
  let start = -1
  let startLevel = 0

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,4})\s+(.+?)\s*#*\s*$/)

    if (!match) {
      continue
    }

    if (headingMatcher(normalizedHeadingText(match[2]))) {
      start = index
      startLevel = match[1].length
      break
    }
  }

  if (start === -1) {
    return ""
  }

  let end = lines.length

  for (let index = start + 1; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,4})\s+/)

    if (match && match[1].length <= startLevel) {
      end = index
      break
    }
  }

  return lines.slice(start, end).join("\n").trim()
}

function buildSummaryContext(markdown, title) {
  const summarySection = findMarkdownSection(markdown, (heading) =>
    [
      "medium-length version",
      "medium length version",
      "summary",
      "executive summary",
      "short version",
      "overview",
      "main ideas",
      "tl;dr",
      "tldr",
      "abstract",
    ].includes(heading),
  )

  if (summarySection) {
    return `# ${title.trim()}\n\n${summarySection}`
  }

  const body = stripFrontmatter(markdown)
    .trim()
    .replace(/^#\s+.+(?:\r?\n)+/, "")
    .replace(/^Source note:\s+.+(?:\r?\n)+/i, "")
  const withoutToc = body.replace(/##\s+Table of Contents[\s\S]*?(?=\n##\s+|\s*$)/i, "")
  const paragraphs = withoutToc
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith("#") && !paragraph.startsWith("- ["))
  const summary = []
  let totalLength = 0

  for (const paragraph of paragraphs) {
    if (summary.length >= 8 || totalLength + paragraph.length > 3200) {
      break
    }

    summary.push(paragraph)
    totalLength += paragraph.length
  }

  return `# ${title.trim()}\n\n${summary.join("\n\n") || body.slice(0, 3200).trim()}`
}

function renderPage({
  title,
  body,
  sourceRelative,
  urlPrefix,
  copyContext = "",
  copySummary = "",
  sourceText = "",
  enableLessonNavigator = false,
  lessonData = null,
  enableReviewPage = false,
}) {
  const homeHref = routeWithPrefix(urlPrefix, "")
  const recentHref = routeWithPrefix(urlPrefix, "recent-lessons")
  const topicsHref = routeWithPrefix(urlPrefix, "topics")
  const reviewHref = routeWithPrefix(urlPrefix, "review")
  const faviconHref = assetWithPrefix(urlPrefix, "favicon.svg")
  const lessonNavigatorControls = enableLessonNavigator
    ? '<button class="lesson-navigator-button" type="button" data-lesson-navigator-open><span>Sections</span></button>'
    : ""
  const lessonNavigatorSidebar = enableLessonNavigator
    ? `
    <aside class="lesson-navigator-sidebar" data-lesson-navigator-sidebar aria-label="Lesson sections">
      <div class="lesson-navigator-sidebar-header">
        <p>Contents</p>
        <button class="lesson-navigator-sidebar-hide" type="button" data-lesson-navigator-toggle aria-pressed="false">
          <span data-lesson-navigator-toggle-label>Hide</span>
        </button>
      </div>
      <nav class="lesson-navigator-sidebar-nav" aria-label="Lesson sections">
        <ol data-lesson-navigator-list></ol>
      </nav>
    </aside>`
    : ""
  const lessonNavigatorMarkup = enableLessonNavigator
    ? `
  <div class="lesson-navigator" data-lesson-navigator hidden role="dialog" aria-modal="true" aria-labelledby="lesson-navigator-title">
    <div class="lesson-navigator-panel">
      <div class="lesson-navigator-header">
        <div>
          <p class="lesson-navigator-kicker">Contents</p>
          <h2 id="lesson-navigator-title">Lesson Sections</h2>
        </div>
        <button class="lesson-navigator-close" type="button" data-lesson-navigator-close aria-label="Close section navigator">Close</button>
      </div>
      <label class="lesson-navigator-search">
        <span>Find section</span>
        <input type="search" data-lesson-navigator-search autocomplete="off" />
      </label>
      <nav class="lesson-navigator-nav" aria-label="Lesson sections">
        <ol data-lesson-navigator-list></ol>
      </nav>
    </div>
  </div>`
    : ""
  const lessonNavigatorScript = enableLessonNavigator
    ? `
  <script>
    (() => {
      const openButtons = Array.from(document.querySelectorAll("[data-lesson-navigator-open]"))
      const toggleButtons = Array.from(document.querySelectorAll("[data-lesson-navigator-toggle]"))
      const toggleLabels = Array.from(document.querySelectorAll("[data-lesson-navigator-toggle-label]"))
      const sidebar = document.querySelector("[data-lesson-navigator-sidebar]")
      const overlay = document.querySelector("[data-lesson-navigator]")
      const closeButton = document.querySelector("[data-lesson-navigator-close]")
      const search = document.querySelector("[data-lesson-navigator-search]")
      const lists = Array.from(document.querySelectorAll("[data-lesson-navigator-list]"))
      const article = document.querySelector("article")
      const storageKey = "learning-machine:lesson-navigator-hidden"

      if (openButtons.length === 0 || !overlay || !closeButton || !search || lists.length === 0 || !article) {
        return
      }

      const allHeadingElements = Array.from(article.querySelectorAll("h2, h3, h4"))
        .filter((heading) => heading.id && heading.textContent?.trim())
      const headingElements = allHeadingElements
        .filter((heading) => heading.textContent.trim().replace(/\\s+/g, " ").toLowerCase() !== "table of contents")
      const headings = Array.from(article.querySelectorAll("h2, h3, h4"))
        .filter((heading) => heading.id && heading.textContent?.trim())
        .map((heading) => ({
          id: heading.id,
          level: Number.parseInt(heading.tagName.slice(1), 10),
          text: heading.textContent.trim().replace(/\\s+/g, " "),
        }))
        .filter((heading) => heading.text.toLowerCase() !== "table of contents")

      if (headings.length === 0) {
        openButtons.forEach((button) => {
          button.hidden = true
        })
        toggleButtons.forEach((button) => {
          button.hidden = true
        })
        if (sidebar) {
          sidebar.hidden = true
        }
        return
      }

      for (const heading of allHeadingElements) {
        if (heading.textContent.trim().replace(/\\s+/g, " ").toLowerCase() !== "table of contents") {
          continue
        }

        heading.classList.add("inline-table-of-contents")
        let sibling = heading.nextElementSibling

        while (sibling && !/^H[1-4]$/.test(sibling.tagName)) {
          sibling.classList.add("inline-table-of-contents-body")
          sibling = sibling.nextElementSibling
        }
      }

      const rows = []

      for (const list of lists) {
        for (const heading of headings) {
          const item = document.createElement("li")
          item.className = "lesson-navigator-item"
          item.dataset.searchText = heading.text.toLowerCase()
          item.dataset.level = String(heading.level)
          item.dataset.headingId = heading.id

          const link = document.createElement("a")
          link.href = "#" + encodeURIComponent(heading.id)
          link.textContent = heading.text
          link.addEventListener("click", () => {
            closeNavigator({ restoreFocus: false })
          })

          item.append(link)
          list.append(item)
          rows.push(item)
        }
      }

      function storedSidebarHidden() {
        try {
          return window.localStorage?.getItem(storageKey) === "true"
        } catch {
          return false
        }
      }

      let sidebarHidden = storedSidebarHidden()

      function applySidebarState() {
        document.body.classList.toggle("lesson-navigator-sidebar-hidden", sidebarHidden)

        for (const button of toggleButtons) {
          button.setAttribute("aria-pressed", String(sidebarHidden))
        }

        for (const label of toggleLabels) {
          label.textContent = sidebarHidden ? "Show sections" : label.closest(".lesson-navigator-sidebar-hide") ? "Hide" : "Hide sections"
        }
      }

      function toggleSidebar() {
        sidebarHidden = !sidebarHidden
        try {
          window.localStorage?.setItem(storageKey, String(sidebarHidden))
        } catch {}
        applySidebarState()
      }

      function filterRows() {
        const query = search.value.trim().toLowerCase()

        for (const row of rows) {
          row.hidden = query ? !row.dataset.searchText.includes(query) : false
        }
      }

      function openNavigator() {
        overlay.hidden = false
        document.body.classList.add("lesson-navigator-open")
        search.value = ""
        filterRows()
        window.setTimeout(() => search.focus(), 0)
      }

      function closeNavigator({ restoreFocus = true } = {}) {
        overlay.hidden = true
        document.body.classList.remove("lesson-navigator-open")

        if (restoreFocus) {
          openButtons[0]?.focus()
        }
      }

      let activeHeadingId = ""
      let scrollQueued = false

      function setActiveHeading(id) {
        if (!id || id === activeHeadingId) {
          return
        }

        activeHeadingId = id

        for (const row of rows) {
          const isActive = row.dataset.headingId === id
          row.classList.toggle("is-active", isActive)
          const link = row.querySelector("a")

          if (link) {
            if (isActive) {
              link.setAttribute("aria-current", "true")
            } else {
              link.removeAttribute("aria-current")
            }
          }
        }
      }

      function updateActiveHeading() {
        scrollQueued = false
        const anchorLine = Math.max(120, window.innerHeight * 0.28)
        let current = headingElements[0]

        for (const heading of headingElements) {
          if (heading.getBoundingClientRect().top <= anchorLine) {
            current = heading
          } else {
            break
          }
        }

        if (current) {
          setActiveHeading(current.id)
        }
      }

      function queueActiveHeadingUpdate() {
        if (scrollQueued) {
          return
        }

        scrollQueued = true
        window.requestAnimationFrame(updateActiveHeading)
      }

      applySidebarState()
      updateActiveHeading()

      for (const button of openButtons) {
        button.addEventListener("click", openNavigator)
      }
      for (const button of toggleButtons) {
        button.addEventListener("click", toggleSidebar)
      }
      closeButton.addEventListener("click", () => closeNavigator())
      search.addEventListener("input", filterRows)
      window.addEventListener("scroll", queueActiveHeadingUpdate, { passive: true })
      window.addEventListener("resize", queueActiveHeadingUpdate)
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closeNavigator()
        }
      })
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !overlay.hidden) {
          closeNavigator()
        }
      })
    })()
  </script>`
    : ""
  const copyContextButtons = copyContext
    ? `<button class="copy-context-button" type="button" data-copy-summary-button><span class="copy-context-label">Copy summary</span></button>
          <button class="copy-context-button" type="button" data-copy-full-button><span class="copy-context-label">Copy full text</span></button>
          ${sourceText ? `<button class="copy-context-button" type="button" data-copy-source-button><span class="copy-context-label">Copy source text</span></button>` : ""}`
    : ""
  const copyContextScript = copyContext
    ? `
  <script type="application/json" id="lesson-copy-context">${escapeScriptJson(
    JSON.stringify({
      summary: copySummary || copyContext,
      fullText: copyContext,
      sourceText,
    }),
  )}</script>
  <script>
    (() => {
      const source = document.getElementById("lesson-copy-context")
      const buttons = [
        { button: document.querySelector("[data-copy-summary-button]"), key: "summary" },
        { button: document.querySelector("[data-copy-full-button]"), key: "fullText" },
        { button: document.querySelector("[data-copy-source-button]"), key: "sourceText" },
      ].filter((entry) => entry.button)

      if (!source || buttons.length === 0) {
        return
      }

      const copyPayload = JSON.parse(source.textContent || "{}")

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

      function setTemporaryLabel(button, text) {
        const label = button.querySelector(".copy-context-label")
        const defaultLabel = button.dataset.defaultLabel || label?.textContent || "Copy"

        if (!label) {
          return
        }

        label.textContent = text
        window.setTimeout(() => {
          label.textContent = defaultLabel
        }, 1800)
      }

      for (const { button, key } of buttons) {
        const label = button.querySelector(".copy-context-label")
        button.dataset.defaultLabel = label?.textContent || "Copy"

        button.addEventListener("click", async () => {
          try {
            const text = copyPayload[key] || ""

            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(text)
            } else {
              await fallbackCopy(text)
            }

            button.blur()
            setTemporaryLabel(button, "Copied")
          } catch (error) {
            console.error(error)
            setTemporaryLabel(button, "Copy failed")
          }
        })
      }
    })()
	  </script>`
    : ""
  const lessonNotesMarkup = lessonData
    ? `
      <section class="reader-notes-panel" data-reader-notes aria-labelledby="reader-notes-title">
        <div class="reader-notes-header">
          <div>
            <p class="reader-notes-kicker">Review</p>
            <h2 id="reader-notes-title">Lesson Notes</h2>
          </div>
          <label class="reader-review-toggle">
            <input type="checkbox" data-reader-review-saved />
            <span>Save for review</span>
          </label>
        </div>
        <div class="reader-notes-mode" role="group" aria-label="Notes mode">
          <button class="reader-notes-mode-button" type="button" data-reader-notes-mode="edit" aria-pressed="true">Edit</button>
          <button class="reader-notes-mode-button" type="button" data-reader-notes-mode="preview" aria-pressed="false">Preview</button>
        </div>
        <div class="reader-notes-toolbar" aria-label="Markdown formatting">
          <button class="reader-notes-tool" type="button" data-reader-notes-format="bold" title="Bold"><strong>B</strong></button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="italic" title="Italic"><em>I</em></button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="bullet" title="Bulleted list">•</button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="numbered" title="Numbered list">1.</button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="quote" title="Quote">“</button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="code" title="Inline code">&lt;/&gt;</button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="math-inline" title="Inline math">$x$</button>
          <button class="reader-notes-tool" type="button" data-reader-notes-format="math-block" title="Math block">$$</button>
        </div>
        <label class="reader-notes-editor" data-reader-notes-editor>
          <span>Markdown notes</span>
          <textarea data-reader-notes-input rows="9" placeholder="Questions, takeaways, examples to revisit..."></textarea>
        </label>
        <div class="reader-notes-preview" data-reader-notes-preview hidden>
          <p class="reader-notes-empty">No notes to preview yet.</p>
        </div>
        <div class="reader-notes-footer">
          <button class="reader-notes-save" type="button" data-reader-notes-save>Save notes</button>
          <p class="reader-notes-status" data-reader-notes-status>Loading notes...</p>
        </div>
      </section>`
    : ""
  const lessonNotesScript = lessonData
    ? `
  <script type="application/json" id="lesson-notes-data">${escapeScriptJson(JSON.stringify(lessonData))}</script>
  <script>
    (() => {
      const panel = document.querySelector("[data-reader-notes]")
      const source = document.getElementById("lesson-notes-data")
      const editor = document.querySelector("[data-reader-notes-editor]")
      const input = document.querySelector("[data-reader-notes-input]")
      const preview = document.querySelector("[data-reader-notes-preview]")
      const reviewSaved = document.querySelector("[data-reader-review-saved]")
      const saveButton = document.querySelector("[data-reader-notes-save]")
      const status = document.querySelector("[data-reader-notes-status]")
      const modeButtons = Array.from(document.querySelectorAll("[data-reader-notes-mode]"))
      const formatButtons = Array.from(document.querySelectorAll("[data-reader-notes-format]"))

      if (!panel || !source || !editor || !input || !preview || !reviewSaved || !saveButton || !status) {
        return
      }

      const lesson = JSON.parse(source.textContent || "{}")
      let mode = "edit"

      function setStatus(text, state = "") {
        status.textContent = text
        status.dataset.state = state
      }

      function setControlsDisabled(disabled) {
        input.disabled = disabled
        reviewSaved.disabled = disabled
        saveButton.disabled = disabled
        for (const button of formatButtons) {
          button.disabled = disabled
        }
      }

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      }

      function renderMathExpression(expression, displayMode = false) {
        const source = String(expression || "").trim()

        if (!source) {
          return displayMode ? "" : "$$"
        }

        if (window.katex?.renderToString) {
          try {
            return window.katex.renderToString(source, {
              displayMode,
              throwOnError: false,
              strict: "warn",
              trust: false,
            })
          } catch (error) {
            console.error(error)
          }
        }

        const delimiter = displayMode ? "$$" : "$"
        return escapeHtml(delimiter + source + delimiter)
      }

      function renderInline(markdown) {
        const tick = String.fromCharCode(96)
        const protectedSegments = []
        const placeholderPrefix = "\\uE000NOTE"
        const placeholderSuffix = "NOTE\\uE001"
        const protect = (html) => {
          const token = placeholderPrefix + protectedSegments.length + placeholderSuffix
          protectedSegments.push(html)
          return token
        }
        let rendered = String(markdown || "").replace(new RegExp(tick + "([^" + tick + "]+)" + tick, "g"), (_, code) =>
          protect("<code>" + escapeHtml(code) + "</code>"),
        )

        rendered = rendered.replace(/\\$([^$\\n]+)\\$/g, (_, expression) => protect(renderMathExpression(expression, false)))
        rendered = escapeHtml(rendered)
          .replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>")
          .replace(/(^|\\W)\\*([^*]+)\\*/g, "$1<em>$2</em>")

        return rendered.replace(new RegExp(placeholderPrefix + "(\\\\d+)" + placeholderSuffix, "g"), (_, index) =>
          protectedSegments[Number(index)] || "",
        )
      }

      function markdownToHtml(markdown) {
        const lines = String(markdown || "").replace(/\\r\\n/g, "\\n").split("\\n")
        const html = []
        let paragraph = []
        let listType = ""

        function closeParagraph() {
          if (paragraph.length === 0) {
            return
          }

          html.push("<p>" + renderInline(paragraph.join(" ")) + "</p>")
          paragraph = []
        }

        function closeList() {
          if (!listType) {
            return
          }

          html.push("</" + listType + ">")
          listType = ""
        }

        function openList(type) {
          closeParagraph()

          if (listType && listType !== type) {
            closeList()
          }

          if (!listType) {
            html.push("<" + type + ">")
            listType = type
          }
        }

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
          const line = lines[lineIndex]
          const trimmed = line.trim()

          if (!trimmed) {
            closeParagraph()
            closeList()
            continue
          }

          if (trimmed.startsWith("$$")) {
            closeParagraph()
            closeList()

            let expression = trimmed.slice(2).trim()

            if (expression.endsWith("$$")) {
              expression = expression.slice(0, -2).trim()
            } else {
              const blockLines = expression ? [expression] : []

              while (lineIndex + 1 < lines.length) {
                lineIndex += 1
                const mathLine = lines[lineIndex]
                const endIndex = mathLine.indexOf("$$")

                if (endIndex === -1) {
                  blockLines.push(mathLine)
                } else {
                  blockLines.push(mathLine.slice(0, endIndex))
                  break
                }
              }

              expression = blockLines.join("\\n").trim()
            }

            html.push('<div class="reader-notes-math">' + renderMathExpression(expression, true) + "</div>")
            continue
          }

          const heading = trimmed.match(/^(#{1,3})\\s+(.+)$/)

          if (heading) {
            closeParagraph()
            closeList()
            const level = heading[1].length + 2
            html.push("<h" + level + ">" + renderInline(heading[2]) + "</h" + level + ">")
            continue
          }

          const bullet = trimmed.match(/^[-*]\\s+(.+)$/)

          if (bullet) {
            openList("ul")
            html.push("<li>" + renderInline(bullet[1]) + "</li>")
            continue
          }

          const numbered = trimmed.match(/^\\d+[.)]\\s+(.+)$/)

          if (numbered) {
            openList("ol")
            html.push("<li>" + renderInline(numbered[1]) + "</li>")
            continue
          }

          const quote = trimmed.match(/^>\\s?(.+)$/)

          if (quote) {
            closeParagraph()
            closeList()
            html.push("<blockquote><p>" + renderInline(quote[1]) + "</p></blockquote>")
            continue
          }

          closeList()
          paragraph.push(trimmed)
        }

        closeParagraph()
        closeList()

        return html.join("\\n") || '<p class="reader-notes-empty">No notes to preview yet.</p>'
      }

      function renderPreview() {
        preview.innerHTML = markdownToHtml(input.value)
      }

      function setMode(nextMode) {
        mode = nextMode === "preview" ? "preview" : "edit"
        editor.hidden = mode !== "edit"
        preview.hidden = mode !== "preview"

        for (const button of modeButtons) {
          const isActive = button.dataset.readerNotesMode === mode
          button.setAttribute("aria-pressed", isActive ? "true" : "false")
        }

        if (mode === "preview") {
          renderPreview()
        } else {
          input.focus()
        }
      }

      function linePrefix(prefix) {
        const start = input.selectionStart
        const end = input.selectionEnd
        const value = input.value
        const lineStart = value.lastIndexOf("\\n", Math.max(0, start - 1)) + 1
        const lineEnd = value.indexOf("\\n", end)
        const selectionEnd = lineEnd === -1 ? value.length : lineEnd
        const block = value.slice(lineStart, selectionEnd)
        const emptyPrefix = typeof prefix === "function" ? prefix(0, "") : prefix

        if (!block.trim()) {
          input.setRangeText(emptyPrefix, lineStart, selectionEnd, "end")
          return
        }

        const lines = block.split("\\n")
        const nextBlock = lines.map((line, index) => {
          if (!line.trim()) {
            return line
          }

          return typeof prefix === "function" ? prefix(index, line) : prefix + line
        }).join("\\n")

        input.setRangeText(nextBlock, lineStart, selectionEnd, "select")
      }

      function wrapSelection(before, after = before, placeholder = "text") {
        const start = input.selectionStart
        const end = input.selectionEnd
        const selected = input.value.slice(start, end) || placeholder
        input.setRangeText(before + selected + after, start, end, "select")
      }

      function markDirty() {
        setStatus("Unsaved changes", "dirty")
        if (mode === "preview") {
          renderPreview()
        }
      }

      function applyFormat(kind) {
        if (mode !== "edit") {
          setMode("edit")
        }

        input.focus()

        if (kind === "bold") {
          wrapSelection("**", "**", "bold text")
        } else if (kind === "italic") {
          wrapSelection("*", "*", "italic text")
        } else if (kind === "bullet") {
          linePrefix("- ")
        } else if (kind === "numbered") {
          linePrefix((index, line) => String(index + 1) + ". " + line)
        } else if (kind === "quote") {
          linePrefix("> ")
        } else if (kind === "code") {
          const tick = String.fromCharCode(96)
          wrapSelection(tick, tick, "code")
        } else if (kind === "math-inline") {
          wrapSelection("$", "$", "x^2")
        } else if (kind === "math-block") {
          wrapSelection("$$\\n", "\\n$$", "x^2")
        }

        markDirty()
      }

      function formatTimestamp(value) {
        if (!value) {
          return ""
        }

        const date = new Date(value)

        if (Number.isNaN(date.getTime())) {
          return ""
        }

        return date.toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      }

      async function requestJson(url, options = {}) {
        const headers = {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(options.headers || {}),
        }

        const response = await fetch(url, {
          ...options,
          credentials: "same-origin",
          headers,
        })

        if (response.status === 401) {
          return { unauthorized: true }
        }

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.error || "Request failed")
        }

        return data
      }

      async function loadNote() {
        setControlsDisabled(true)
        setStatus("Loading notes...")

        const data = await requestJson("/api/lesson-notes?lessonId=" + encodeURIComponent(lesson.lessonId || ""))

        if (data.unauthorized) {
          setStatus("Sign in to save notes.", "error")
          return
        }

        if (data.note) {
          input.value = data.note.noteMarkdown || ""
          reviewSaved.checked = Boolean(data.note.reviewSaved)
          renderPreview()
          const savedAt = formatTimestamp(data.note.updatedAt)
          setStatus(savedAt ? "Saved " + savedAt : "Saved")
        } else {
          renderPreview()
          setStatus("No notes saved yet")
        }

        setControlsDisabled(false)
      }

      async function saveNote({ quiet = false } = {}) {
        setControlsDisabled(true)

        if (!quiet) {
          setStatus("Saving...")
        }

        try {
          const data = await requestJson("/api/lesson-notes", {
            method: "PUT",
            body: JSON.stringify({
              lessonId: lesson.lessonId,
              lessonTitle: lesson.lessonTitle,
              lessonUrl: lesson.lessonUrl,
              noteMarkdown: input.value,
              reviewSaved: reviewSaved.checked,
            }),
          })

          if (data.unauthorized) {
            setStatus("Sign in to save notes.", "error")
            return
          }

          const savedAt = formatTimestamp(data.note?.updatedAt)
          renderPreview()
          setStatus(savedAt ? "Saved " + savedAt : "Saved")
        } catch (error) {
          console.error(error)
          setStatus(error.message || "Could not save notes", "error")
        } finally {
          setControlsDisabled(false)
        }
      }

      input.addEventListener("input", () => {
        markDirty()
      })
      input.addEventListener("keydown", (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
          event.preventDefault()
          saveNote()
        }
      })
      reviewSaved.addEventListener("change", () => {
        saveNote({ quiet: true })
      })
      saveButton.addEventListener("click", () => {
        saveNote()
      })
      for (const button of modeButtons) {
        button.addEventListener("click", () => {
          setMode(button.dataset.readerNotesMode)
        })
      }
      for (const button of formatButtons) {
        button.addEventListener("click", () => {
          applyFormat(button.dataset.readerNotesFormat)
        })
      }

      loadNote().catch((error) => {
        console.error(error)
        setStatus("Could not load notes", "error")
        setControlsDisabled(false)
      })
    })()
  </script>`
    : ""
  const lessonProgressControls = lessonData
    ? `<div class="reader-progress" data-reader-progress>
            <button class="reader-progress-button" type="button" data-reader-mark-read>Mark read</button>
            <button class="reader-progress-button reader-priority-button" type="button" data-reader-toggle-priority>Deprioritize</button>
            <span class="reader-progress-count" data-reader-read-count>Read 0 times</span>
            <span class="reader-priority-status" data-reader-priority-status>Normal priority</span>
          </div>`
    : ""
  const lessonProgressScript = lessonData
    ? `
  <script>
    (() => {
      const source = document.getElementById("lesson-notes-data")
      const readButton = document.querySelector("[data-reader-mark-read]")
      const priorityButton = document.querySelector("[data-reader-toggle-priority]")
      const count = document.querySelector("[data-reader-read-count]")
      const priorityStatus = document.querySelector("[data-reader-priority-status]")

      if (!source || !readButton || !priorityButton || !count || !priorityStatus) {
        return
      }

      const lesson = JSON.parse(source.textContent || "{}")

      function countLabel(value) {
        const readCount = Math.max(0, Number(value) || 0)
        return "Read " + readCount + " " + (readCount === 1 ? "time" : "times")
      }

      function applyProgress(progress) {
        const readCount = progress?.readCount || 0
        const priorityState = progress?.priorityState === "deprioritized" ? "deprioritized" : "normal"
        const isDeprioritized = priorityState === "deprioritized"
        count.textContent = countLabel(readCount)
        count.classList.toggle("is-read", readCount > 0)
        priorityStatus.textContent = isDeprioritized ? "Deprioritized" : "Normal priority"
        priorityStatus.classList.toggle("is-deprioritized", isDeprioritized)
        readButton.textContent = progress?.isRead ? "Mark read again" : "Mark read"
        priorityButton.textContent = isDeprioritized ? "Reprioritize" : "Deprioritize"
        priorityButton.classList.toggle("is-deprioritized", isDeprioritized)
        document.dispatchEvent(new CustomEvent("reader-progress-updated", {
          detail: {
            lessonId: lesson.lessonId,
            readCount,
            priorityState,
          },
        }))
      }

      async function requestJson(url, options = {}) {
        const headers = {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(options.headers || {}),
        }

        const response = await fetch(url, {
          ...options,
          credentials: "same-origin",
          headers,
        })

        if (response.status === 401) {
          return { unauthorized: true }
        }

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.error || "Request failed")
        }

        return data
      }

      async function loadProgress() {
        const data = await requestJson("/api/lesson-progress?lessonId=" + encodeURIComponent(lesson.lessonId || ""))

        if (data.unauthorized) {
          readButton.disabled = true
          priorityButton.disabled = true
          count.textContent = "Sign in to track reads"
          priorityStatus.textContent = "Sign in to prioritize"
          return
        }

        applyProgress(data.progress)
      }

      readButton.addEventListener("click", async () => {
        readButton.disabled = true

        try {
          const data = await requestJson("/api/lesson-progress", {
            method: "PUT",
            body: JSON.stringify({
              lessonId: lesson.lessonId,
              isRead: true,
              incrementReadCount: true,
            }),
          })

          if (data.unauthorized) {
            count.textContent = "Sign in to track reads"
            return
          }

          applyProgress(data.progress)
        } catch (error) {
          console.error(error)
          count.textContent = "Could not update reads"
        } finally {
          readButton.disabled = false
        }
      })

      priorityButton.addEventListener("click", async () => {
        priorityButton.disabled = true

        const nextPriorityState = priorityButton.classList.contains("is-deprioritized")
          ? "normal"
          : "deprioritized"

        try {
          const data = await requestJson("/api/lesson-progress", {
            method: "PUT",
            body: JSON.stringify({
              lessonId: lesson.lessonId,
              priorityState: nextPriorityState,
            }),
          })

          if (data.unauthorized) {
            priorityStatus.textContent = "Sign in to prioritize"
            return
          }

          applyProgress(data.progress)
        } catch (error) {
          console.error(error)
          priorityStatus.textContent = "Could not update priority"
        } finally {
          priorityButton.disabled = false
        }
      })

      loadProgress().catch((error) => {
        console.error(error)
        count.textContent = "Could not load reads"
      })
    })()
  </script>`
    : ""
  const readerProgressSummaryScript = `
  <script>
    (() => {
      const article = document.querySelector("article")
      const reorderLessonLists = ${lessonData ? "false" : "true"}

      if (!article) {
        return
      }

      const progressByLessonId = new Map()
      const lessonListOrder = new WeakMap()

      function normalizeLessonIdFromHref(href) {
        if (!href) {
          return ""
        }

        let url

        try {
          url = new URL(href, window.location.origin)
        } catch {
          return ""
        }

        if (url.origin !== window.location.origin) {
          return ""
        }

        const lessonId = url.pathname.replace(/^\\/+|\\/+$/g, "")

        if (!lessonId || !lessonId.includes("/lessons/")) {
          return ""
        }

        return lessonId
      }

      function readCountLabel(value) {
        const readCount = Math.max(0, Number(value) || 0)
        return readCount + " " + (readCount === 1 ? "read" : "reads")
      }

      function lessonProgress(lessonId) {
        return progressByLessonId.get(lessonId) || {
          readCount: 0,
          priorityState: "normal",
        }
      }

      function ensureBadge(target, lessonId) {
        let badge = target.querySelector(":scope > [data-reader-title-read-count]")

        if (!badge) {
          badge = document.createElement("span")
          badge.className = "reader-title-read-count"
          badge.dataset.readerTitleReadCount = lessonId
          target.append(" ")
          target.append(badge)
        }

        return badge
      }

      function updateBadge(target, lessonId) {
        const progress = lessonProgress(lessonId)
        const readCount = progress.readCount || 0
        const isDeprioritized = progress.priorityState === "deprioritized"
        const badge = ensureBadge(target, lessonId)
        badge.textContent = isDeprioritized ? readCountLabel(readCount) + " · deprioritized" : readCountLabel(readCount)
        badge.classList.toggle("is-read", readCount > 0)
        badge.classList.toggle("is-unread", readCount === 0)
        badge.classList.toggle("is-deprioritized", isDeprioritized)
      }

      function firstLessonLink(container) {
        for (const link of container.querySelectorAll("a[href]")) {
          const lessonId = normalizeLessonIdFromHref(link.getAttribute("href"))

          if (lessonId) {
            return { link, lessonId }
          }
        }

        return null
      }

      function reorderProgressLists() {
        if (!reorderLessonLists) {
          return
        }

        for (const list of article.querySelectorAll("ul, ol")) {
          const rows = Array.from(list.children).filter((child) => child.tagName === "LI")
          const lessonRows = []

          rows.forEach((row, index) => {
            const lessonLink = firstLessonLink(row)

            if (!lessonLink) {
              return
            }

            if (!lessonListOrder.has(row)) {
              lessonListOrder.set(row, index)
            }

            const progress = lessonProgress(lessonLink.lessonId)
            const readCount = progress.readCount || 0
            const isDeprioritized = progress.priorityState === "deprioritized"
            row.classList.toggle("reader-progress-list-item", true)
            row.classList.toggle("is-read", readCount > 0)
            row.classList.toggle("is-unread", readCount === 0)
            row.classList.toggle("is-deprioritized", isDeprioritized)
            lessonRows.push({ row, readCount, isDeprioritized, originalIndex: lessonListOrder.get(row) ?? index })
          })

          if (lessonRows.length < 2 || lessonRows.length !== rows.length) {
            continue
          }

          const sortedRows = [...lessonRows].sort((a, b) => {
            const priorityBucket = Number(a.isDeprioritized) - Number(b.isDeprioritized)
            const readBucket = Number(a.readCount > 0) - Number(b.readCount > 0)
            return priorityBucket || readBucket || a.originalIndex - b.originalIndex
          })

          sortedRows.forEach(({ row }) => {
            list.append(row)
          })
        }
      }

      function annotateLessonLinks() {
        for (const link of article.querySelectorAll("a[href]")) {
          if (link.closest("h1")) {
            continue
          }

          const lessonId = normalizeLessonIdFromHref(link.getAttribute("href"))

          if (!lessonId || link.dataset.readerProgressCountAttached === "true") {
            continue
          }

          link.dataset.readerProgressCountAttached = "true"
          updateBadge(link, lessonId)
        }
      }

      function annotateCurrentTitle() {
        const heading = article.querySelector("h1")

        if (!heading) {
          return
        }

        const lessonId = normalizeLessonIdFromHref(window.location.pathname)

        if (!lessonId) {
          return
        }

        updateBadge(heading, lessonId)
      }

      function annotatePage() {
        annotateCurrentTitle()
        annotateLessonLinks()
        reorderProgressLists()
      }

      async function requestProgress() {
        const response = await fetch("/api/lesson-progress", {
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.status === 401) {
          return null
        }

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.error || "Could not load read counts")
        }

        return data.progress || []
      }

      requestProgress()
        .then((progressRows) => {
          if (!progressRows) {
            return
          }

          for (const row of progressRows) {
            if (row.lessonId) {
              progressByLessonId.set(row.lessonId, {
                readCount: Math.max(0, Number(row.readCount) || 0),
                priorityState: row.priorityState === "deprioritized" ? "deprioritized" : "normal",
              })
            }
          }

          annotatePage()
        })
        .catch((error) => {
          console.error(error)
        })

      document.addEventListener("reader-progress-updated", (event) => {
        const lessonId = event.detail?.lessonId

        if (!lessonId) {
          return
        }

        progressByLessonId.set(lessonId, {
          readCount: Math.max(0, Number(event.detail?.readCount) || 0),
          priorityState: event.detail?.priorityState === "deprioritized" ? "deprioritized" : "normal",
        })
        annotatePage()
      })
    })()
  </script>`
  const reviewPageScript = enableReviewPage
    ? `
  <script>
    (() => {
      const list = document.querySelector("[data-reader-review-list]")

      if (!list) {
        return
      }

      async function requestJson(url, options = {}) {
        const response = await fetch(url, {
          ...options,
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            ...(options.headers || {}),
          },
        })

        if (response.status === 401) {
          return { unauthorized: true }
        }

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.error || "Request failed")
        }

        return data
      }

      function formatTimestamp(value) {
        if (!value) {
          return ""
        }

        const date = new Date(value)

        if (Number.isNaN(date.getTime())) {
          return ""
        }

        return date.toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      }

      function renderEmpty(text) {
        const message = document.createElement("p")
        message.className = "reader-review-empty"
        message.textContent = text
        list.replaceChildren(message)
      }

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      }

      function renderMathExpression(expression, displayMode = false) {
        const source = String(expression || "").trim()

        if (!source) {
          return displayMode ? "" : "$$"
        }

        if (window.katex?.renderToString) {
          try {
            return window.katex.renderToString(source, {
              displayMode,
              throwOnError: false,
              strict: "warn",
              trust: false,
            })
          } catch (error) {
            console.error(error)
          }
        }

        const delimiter = displayMode ? "$$" : "$"
        return escapeHtml(delimiter + source + delimiter)
      }

      function renderInline(markdown) {
        const tick = String.fromCharCode(96)
        const protectedSegments = []
        const placeholderPrefix = "\\uE000NOTE"
        const placeholderSuffix = "NOTE\\uE001"
        const protect = (html) => {
          const token = placeholderPrefix + protectedSegments.length + placeholderSuffix
          protectedSegments.push(html)
          return token
        }
        let rendered = String(markdown || "").replace(new RegExp(tick + "([^" + tick + "]+)" + tick, "g"), (_, code) =>
          protect("<code>" + escapeHtml(code) + "</code>"),
        )

        rendered = rendered.replace(/\\$([^$\\n]+)\\$/g, (_, expression) => protect(renderMathExpression(expression, false)))
        rendered = escapeHtml(rendered)
          .replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>")
          .replace(/(^|\\W)\\*([^*]+)\\*/g, "$1<em>$2</em>")

        return rendered.replace(new RegExp(placeholderPrefix + "(\\\\d+)" + placeholderSuffix, "g"), (_, index) =>
          protectedSegments[Number(index)] || "",
        )
      }

      function markdownToHtml(markdown) {
        const lines = String(markdown || "").replace(/\\r\\n/g, "\\n").split("\\n")
        const html = []
        let paragraph = []
        let listType = ""

        function closeParagraph() {
          if (paragraph.length === 0) {
            return
          }

          html.push("<p>" + renderInline(paragraph.join(" ")) + "</p>")
          paragraph = []
        }

        function closeList() {
          if (!listType) {
            return
          }

          html.push("</" + listType + ">")
          listType = ""
        }

        function openList(type) {
          closeParagraph()

          if (listType && listType !== type) {
            closeList()
          }

          if (!listType) {
            html.push("<" + type + ">")
            listType = type
          }
        }

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
          const line = lines[lineIndex]
          const trimmed = line.trim()

          if (!trimmed) {
            closeParagraph()
            closeList()
            continue
          }

          if (trimmed.startsWith("$$")) {
            closeParagraph()
            closeList()

            let expression = trimmed.slice(2).trim()

            if (expression.endsWith("$$")) {
              expression = expression.slice(0, -2).trim()
            } else {
              const blockLines = expression ? [expression] : []

              while (lineIndex + 1 < lines.length) {
                lineIndex += 1
                const mathLine = lines[lineIndex]
                const endIndex = mathLine.indexOf("$$")

                if (endIndex === -1) {
                  blockLines.push(mathLine)
                } else {
                  blockLines.push(mathLine.slice(0, endIndex))
                  break
                }
              }

              expression = blockLines.join("\\n").trim()
            }

            html.push('<div class="reader-notes-math">' + renderMathExpression(expression, true) + "</div>")
            continue
          }

          const heading = trimmed.match(/^(#{1,3})\\s+(.+)$/)

          if (heading) {
            closeParagraph()
            closeList()
            const level = heading[1].length + 2
            html.push("<h" + level + ">" + renderInline(heading[2]) + "</h" + level + ">")
            continue
          }

          const bullet = trimmed.match(/^[-*]\\s+(.+)$/)

          if (bullet) {
            openList("ul")
            html.push("<li>" + renderInline(bullet[1]) + "</li>")
            continue
          }

          const numbered = trimmed.match(/^\\d+[.)]\\s+(.+)$/)

          if (numbered) {
            openList("ol")
            html.push("<li>" + renderInline(numbered[1]) + "</li>")
            continue
          }

          const quote = trimmed.match(/^>\\s?(.+)$/)

          if (quote) {
            closeParagraph()
            closeList()
            html.push("<blockquote><p>" + renderInline(quote[1]) + "</p></blockquote>")
            continue
          }

          closeList()
          paragraph.push(trimmed)
        }

        closeParagraph()
        closeList()

        return html.join("\\n") || '<p class="reader-notes-empty">No notes saved.</p>'
      }

      function renderNotes(notes) {
        const savedNotes = notes.filter((note) => note.reviewSaved)

        if (savedNotes.length === 0) {
          renderEmpty("No lessons saved for review yet.")
          return
        }

        const rows = document.createElement("ol")
        rows.className = "reader-review-list"

        for (const note of savedNotes) {
          const item = document.createElement("li")
          item.className = "reader-review-item"

          const link = document.createElement("a")
          link.href = note.lessonUrl || "/" + note.lessonId + "/"
          link.textContent = note.lessonTitle || note.lessonId
          item.append(link)

          const meta = document.createElement("p")
          meta.className = "reader-review-meta"
          const timestamp = formatTimestamp(note.reviewSavedAt || note.updatedAt)
          meta.textContent = timestamp ? "Saved " + timestamp : "Saved for review"
          item.append(meta)

          const markdown = String(note.noteMarkdown || "").trim()

          if (markdown) {
            const notePreview = document.createElement("div")
            notePreview.className = "reader-review-note markdown-note-view"
            notePreview.innerHTML = markdownToHtml(markdown)
            item.append(notePreview)
          }

          rows.append(item)
        }

        list.replaceChildren(rows)
      }

      requestJson("/api/lesson-notes")
        .then((data) => {
          if (data.unauthorized) {
            renderEmpty("Sign in to view saved lessons.")
            return
          }

          renderNotes(data.notes || [])
        })
        .catch((error) => {
          console.error(error)
          renderEmpty("Could not load saved lessons.")
        })
    })()
  </script>`
    : ""
  const readerAuthControls = `
          <div class="reader-auth" data-reader-auth>
            <a class="reader-auth-link" href="/api/auth/google" data-reader-signin>Sign in</a>
            <button class="reader-auth-button" type="button" data-reader-logout hidden>Sign out</button>
          </div>`
  const readerChromeScript = `
  <script>
    (() => {
      const header = document.querySelector("[data-reader-header]")

      if (!header) {
        return
      }

      let previousY = window.scrollY
      let queued = false

      function setHeaderHidden(hidden) {
        document.body.classList.toggle("reader-header-hidden", hidden)
      }

      function updateHeaderVisibility() {
        queued = false
        const currentY = window.scrollY
        const delta = currentY - previousY
        const navigatorOpen = document.body.classList.contains("lesson-navigator-open")

        if (currentY < 24 || navigatorOpen || header.matches(":focus-within")) {
          setHeaderHidden(false)
        } else if (delta > 8 && currentY > 120) {
          setHeaderHidden(true)
        } else if (delta < -8) {
          setHeaderHidden(false)
        }

        previousY = currentY
      }

      function queueHeaderUpdate() {
        if (queued) {
          return
        }

        queued = true
        window.requestAnimationFrame(updateHeaderVisibility)
      }

      setHeaderHidden(false)
      window.addEventListener("scroll", queueHeaderUpdate, { passive: true })
      window.addEventListener("resize", queueHeaderUpdate)
    })()
  </script>`
  const readerAuthScript = `
  <script>
    (() => {
      const signInLink = document.querySelector("[data-reader-signin]")
      const signOutButton = document.querySelector("[data-reader-logout]")
      let user = null

      function returnPath() {
        return window.location.pathname + window.location.search + window.location.hash
      }

      function setAuthUi() {
        if (signInLink) {
          signInLink.href = "/api/auth/google?next=" + encodeURIComponent(returnPath())
          signInLink.hidden = Boolean(user)
        }

        if (signOutButton) {
          signOutButton.hidden = !user
        }
      }

      async function requestJson(url, options = {}) {
        const headers = {
          Accept: "application/json",
          ...(options.headers || {}),
        }

        const response = await fetch(url, {
          ...options,
          credentials: "same-origin",
          headers,
        })

        if (response.status === 401) {
          return { unauthorized: true }
        }

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.error || "Request failed")
        }

        return data
      }

      async function loadSession() {
        const session = await requestJson("/api/auth/me")
        user = session.unauthorized ? null : session.user || null
        setAuthUi()
      }

      signOutButton?.addEventListener("click", async () => {
        signOutButton.disabled = true

        try {
          await requestJson("/api/auth/logout", { method: "POST" })
          window.location.reload()
        } catch (error) {
          console.error(error)
          signOutButton.disabled = false
        }
      })

      setAuthUi()
      loadSession().catch((error) => {
        console.error(error)
        user = null
        setAuthUi()
      })
    })()
  </script>`

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} - Learning Machine</title>
  <link rel="icon" type="image/svg+xml" href="${faviconHref}" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
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

    .reader-column {
      min-width: 0;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 46px;
      padding: 12px 0 14px;
      border-bottom: 1px solid var(--line);
      background: rgb(5 5 7 / 0.94);
      color: var(--muted);
      font-family: var(--sans-font);
      font-size: 13px;
      backdrop-filter: blur(14px);
      transform: translateY(0);
      transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
    }

    .reader-header-hidden header {
      pointer-events: none;
      transform: translateY(calc(-100% - 12px));
    }

    .reader-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
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

    .copy-context-button,
    .reader-auth-link,
    .reader-auth-button,
    .reader-progress-button,
    .reader-notes-mode-button,
    .reader-notes-tool,
    .reader-notes-save {
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

    .reader-auth {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .reader-progress {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
      color: var(--muted);
      font-family: var(--sans-font);
      font-size: 13px;
      line-height: 1.2;
      white-space: nowrap;
    }

    .reader-title-read-count {
      display: inline-flex;
      align-items: center;
      margin-left: 0.35rem;
      padding: 0.12rem 0.38rem;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--surface);
      font-family: var(--sans-font);
      font-size: 0.72rem;
      font-weight: 500;
      line-height: 1.25;
      vertical-align: middle;
      white-space: nowrap;
    }

    .reader-progress-list-item.is-unread > a {
      color: #f6d365;
    }

    .reader-progress-list-item.is-unread > a:hover,
    .reader-progress-list-item.is-unread > a:focus-visible {
      color: #ffe08a;
    }

    .reader-progress-list-item.is-deprioritized > a {
      color: #9ca3af;
    }

    .reader-progress-list-item.is-deprioritized > a:hover,
    .reader-progress-list-item.is-deprioritized > a:focus-visible {
      color: #d1d5db;
    }

    .reader-progress-count,
    .reader-priority-status {
      display: inline-flex;
      align-items: center;
      padding: 0.18rem 0.48rem;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--surface);
      font-family: var(--sans-font);
      font-size: 0.78rem;
      font-weight: 500;
      line-height: 1.25;
      white-space: nowrap;
    }

    .reader-title-read-count.is-read,
    .reader-progress-count.is-read {
      border-color: rgba(74, 222, 128, 0.42);
      color: #bbf7d0;
      background: rgba(20, 83, 45, 0.58);
    }

    .reader-title-read-count.is-unread,
    .reader-progress-count:not(.is-read) {
      border-color: rgba(250, 204, 21, 0.5);
      color: #fde68a;
      background: rgba(113, 63, 18, 0.55);
    }

    .reader-title-read-count.is-deprioritized,
    .reader-priority-status.is-deprioritized {
      border-color: rgba(148, 163, 184, 0.45);
      color: #cbd5e1;
      background: rgba(51, 65, 85, 0.62);
    }

    .reader-priority-button.is-deprioritized {
      border-color: rgba(148, 163, 184, 0.45);
      color: #d1d5db;
      background: rgba(51, 65, 85, 0.54);
    }

    .reader-auth [hidden] {
      display: none;
    }

    .reader-auth-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
    }

    .reader-auth-button:disabled,
    .reader-progress-button:disabled,
    .reader-notes-tool:disabled,
    .reader-notes-save:disabled {
      cursor: wait;
      opacity: 0.72;
    }

    .lesson-navigator-button,
    .lesson-navigator-toggle,
    .lesson-navigator-sidebar-hide {
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
    .copy-context-button:focus-visible,
    .reader-auth-link:hover,
    .reader-auth-link:focus-visible,
    .reader-auth-button:hover,
    .reader-auth-button:focus-visible,
    .reader-progress-button:hover,
    .reader-progress-button:focus-visible,
    .reader-notes-mode-button:hover,
    .reader-notes-mode-button:focus-visible,
    .reader-notes-tool:hover,
    .reader-notes-tool:focus-visible,
    .reader-notes-save:hover,
    .reader-notes-save:focus-visible,
    .lesson-navigator-button:hover,
    .lesson-navigator-button:focus-visible,
    .lesson-navigator-toggle:hover,
    .lesson-navigator-toggle:focus-visible,
    .lesson-navigator-sidebar-hide:hover,
    .lesson-navigator-sidebar-hide:focus-visible {
      border-color: var(--accent);
      color: var(--accent);
      outline: none;
    }

    .reader-notes-mode-button[aria-pressed="true"] {
      border-color: var(--accent);
      color: var(--accent);
      background: rgb(134 173 243 / 0.1);
    }

    .lesson-navigator-sidebar {
      display: none;
    }

    .lesson-navigator-sidebar[hidden] {
      display: none;
    }

    .lesson-navigator-sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--line);
      font-family: var(--sans-font);
    }

    .lesson-navigator-sidebar-header p {
      margin: 0;
      color: var(--muted);
      font-family: var(--sans-font);
      font-size: 0.78rem;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .lesson-navigator-sidebar-hide {
      min-height: 30px;
      padding: 0.28rem 0.55rem;
      font-size: 12px;
    }

    .lesson-navigator-open {
      overflow: hidden;
    }

    .lesson-navigator[hidden] {
      display: none;
    }

    .lesson-navigator {
      position: fixed;
      inset: 0;
      z-index: 30;
      display: flex;
      align-items: stretch;
      justify-content: center;
      background: rgb(5 5 7 / 0.94);
      color: var(--text);
    }

    .lesson-navigator-panel {
      width: min(100%, 920px);
      min-height: 100vh;
      padding: 34px clamp(18px, 4vw, 44px) 48px;
      background: var(--bg);
      border-left: 1px solid var(--line);
      border-right: 1px solid var(--line);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .lesson-navigator-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--line);
      font-family: var(--sans-font);
    }

    .lesson-navigator-kicker {
      margin: 0 0 0.35rem;
      color: var(--muted);
      font-family: var(--sans-font);
      font-size: 0.78rem;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .lesson-navigator-header h2 {
      margin: 0;
      padding: 0;
      border: 0;
      color: var(--heading-strong);
      font-family: var(--serif-font);
      font-size: clamp(1.9rem, 6vw, 3rem);
      line-height: 1.05;
    }

    .lesson-navigator-close {
      flex: 0 0 auto;
      min-height: 36px;
      padding: 0.42rem 0.72rem;
      border: 1px solid var(--line-strong);
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);
      font-family: var(--sans-font);
      font-size: 13px;
      cursor: pointer;
    }

    .lesson-navigator-close:hover,
    .lesson-navigator-close:focus-visible {
      border-color: var(--accent);
      color: var(--accent);
      outline: none;
    }

    .lesson-navigator-search {
      display: block;
      margin: 22px 0 18px;
      font-family: var(--sans-font);
      color: var(--muted);
      font-size: 0.84rem;
      line-height: 1.3;
    }

    .lesson-navigator-search span {
      display: block;
      margin-bottom: 0.42rem;
    }

    .lesson-navigator-search input {
      width: 100%;
      min-height: 44px;
      border: 1px solid var(--line-strong);
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);
      padding: 0.62rem 0.75rem;
      font: inherit;
      font-size: 1rem;
    }

    .lesson-navigator-search input:focus {
      border-color: var(--accent);
      outline: none;
    }

    .lesson-navigator-nav ol,
    .lesson-navigator-sidebar-nav ol {
      list-style: none;
      margin: 0;
      padding: 0;
      border-top: 1px solid var(--line);
    }

    .lesson-navigator-sidebar-nav ol {
      border-top: 0;
    }

    .lesson-navigator-item {
      margin: 0;
      border-bottom: 1px solid var(--line);
    }

    .lesson-navigator-item a {
      display: block;
      padding: 0.8rem 0;
      color: var(--text);
      font-family: var(--serif-font);
      font-size: 1.05rem;
      line-height: 1.35;
      text-decoration: none;
    }

    .lesson-navigator-item a:hover,
    .lesson-navigator-item a:focus-visible {
      color: var(--accent);
      outline: none;
    }

    .lesson-navigator-item.is-active a,
    .lesson-navigator-item a[aria-current="true"] {
      color: var(--heading-strong);
      background: rgb(134 173 243 / 0.12);
      box-shadow: inset 3px 0 0 var(--accent);
    }

    .lesson-navigator-item[data-level="3"] a {
      padding-left: 1.25rem;
      color: var(--heading-soft);
      font-size: 0.98rem;
    }

    .lesson-navigator-item[data-level="4"] a {
      padding-left: 2.2rem;
      color: var(--muted);
      font-size: 0.92rem;
    }

    .lesson-navigator-item[data-level="3"].is-active a,
    .lesson-navigator-item[data-level="4"].is-active a {
      color: var(--heading-strong);
    }

    article {
      overflow-wrap: anywhere;
    }

    .inline-table-of-contents,
    .inline-table-of-contents-body {
      display: none;
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

    .reader-notes-panel {
      margin-top: 3.2rem;
      padding: 1.05rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface);
      font-family: var(--sans-font);
    }

    .reader-notes-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 1rem;
    }

    .reader-notes-kicker {
      margin: 0 0 0.26rem;
      color: var(--muted);
      font-size: 0.75rem;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .reader-notes-panel h2 {
      margin: 0;
      padding: 0;
      border: 0;
      color: var(--heading-strong);
      font-family: var(--serif-font);
      font-size: 1.25rem;
      line-height: 1.2;
    }

    .reader-review-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      min-height: 32px;
      color: var(--text);
      font-size: 0.84rem;
      line-height: 1.2;
      cursor: pointer;
      white-space: nowrap;
    }

    .reader-review-toggle input {
      width: 1rem;
      height: 1rem;
      accent-color: var(--accent);
    }

    .reader-notes-mode,
    .reader-notes-toolbar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 0.75rem;
    }

    .reader-notes-mode {
      gap: 6px;
    }

    .reader-notes-toolbar {
      padding: 0.42rem;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: rgb(255 255 255 / 0.025);
    }

    .reader-notes-tool {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 34px;
      padding-inline: 0.5rem;
    }

    .reader-notes-editor {
      display: block;
      color: var(--muted);
      font-size: 0.84rem;
      line-height: 1.3;
    }

    .reader-notes-editor span {
      display: block;
      margin-bottom: 0.45rem;
    }

    .reader-notes-editor textarea {
      width: 100%;
      min-height: 12rem;
      resize: vertical;
      border: 1px solid var(--line-strong);
      border-radius: 4px;
      background: var(--bg);
      color: var(--text);
      padding: 0.72rem 0.78rem;
      font-family: var(--mono-font);
      font-size: 0.92rem;
      line-height: 1.55;
    }

    .reader-notes-editor textarea:focus {
      border-color: var(--accent);
      outline: none;
    }

    .reader-notes-editor textarea:disabled,
    .reader-review-toggle input:disabled {
      cursor: wait;
      opacity: 0.72;
    }

    .reader-notes-preview,
    .markdown-note-view {
      border: 1px solid var(--line-strong);
      border-radius: 4px;
      background: var(--bg);
      color: var(--text);
      padding: 0.72rem 0.78rem;
      font-family: var(--sans-font);
      font-size: 0.94rem;
      line-height: 1.55;
    }

    .reader-notes-preview {
      min-height: 12rem;
    }

    .reader-notes-preview :first-child,
    .markdown-note-view :first-child {
      margin-top: 0;
    }

    .reader-notes-preview :last-child,
    .markdown-note-view :last-child {
      margin-bottom: 0;
    }

    .reader-notes-preview h3,
    .reader-notes-preview h4,
    .reader-notes-preview h5,
    .markdown-note-view h3,
    .markdown-note-view h4,
    .markdown-note-view h5 {
      margin: 1rem 0 0.42rem;
      padding: 0;
      border: 0;
      color: var(--heading-strong);
      font-family: var(--sans-font);
      font-size: 1rem;
      line-height: 1.25;
    }

    .reader-notes-preview p,
    .markdown-note-view p {
      margin: 0.55rem 0;
    }

    .reader-notes-preview ul,
    .reader-notes-preview ol,
    .markdown-note-view ul,
    .markdown-note-view ol {
      margin: 0.55rem 0;
      padding-left: 1.25rem;
    }

    .reader-notes-preview blockquote,
    .markdown-note-view blockquote {
      margin: 0.7rem 0;
      padding-left: 0.8rem;
      border-left: 2px solid var(--accent);
      color: var(--muted);
    }

    .reader-notes-preview code,
    .markdown-note-view code {
      padding: 0.08rem 0.24rem;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--surface);
      color: var(--heading-soft);
      font-family: var(--mono-font);
      font-size: 0.9em;
    }

    .reader-notes-math {
      margin: 0.8rem 0;
      overflow-x: auto;
    }

    .reader-notes-empty {
      margin: 0;
      color: var(--muted);
    }

    .reader-notes-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 0.8rem;
    }

    .reader-notes-status {
      margin: 0;
      color: var(--muted);
      font-size: 0.82rem;
      line-height: 1.3;
      text-align: right;
    }

    .reader-notes-status[data-state="dirty"] {
      color: var(--heading-soft);
    }

    .reader-notes-status[data-state="error"] {
      color: #ffb4b4;
    }

    .reader-review-page {
      font-family: var(--sans-font);
    }

    .reader-review-page h1 {
      font-family: var(--serif-font);
    }

    .reader-review-intro,
    .reader-review-empty {
      color: var(--muted);
      font-size: 0.98rem;
    }

    .reader-review-list {
      list-style: none;
      margin: 1.5rem 0 0;
      padding: 0;
    }

    .reader-review-item {
      margin: 0;
      padding: 1rem 0;
      border-top: 1px solid var(--line);
    }

    .reader-review-item > a {
      color: var(--heading-strong);
      font-family: var(--serif-font);
      font-size: 1.18rem;
      line-height: 1.3;
      text-decoration: none;
    }

    .reader-review-item > a:hover,
    .reader-review-item > a:focus-visible {
      color: var(--accent);
      outline: none;
    }

    .reader-review-meta {
      margin: 0.2rem 0 0;
      color: var(--muted);
      font-size: 0.8rem;
      line-height: 1.3;
    }

    .reader-review-note {
      margin: 0.75rem 0 0;
      white-space: pre-wrap;
    }

    @media (min-width: 1100px) {
      .shell.has-lesson-navigator {
        width: min(100% - 48px, 1180px);
        display: grid;
        grid-template-columns: minmax(190px, 250px) minmax(0, var(--max));
        gap: clamp(30px, 4vw, 56px);
        align-items: start;
      }

      .lesson-navigator-sidebar {
        position: sticky;
        top: 18px;
        display: block;
        max-height: calc(100vh - 36px);
        padding: 4px 0 18px;
        overflow-y: auto;
        color: var(--text);
        scrollbar-width: thin;
        scrollbar-color: var(--line-strong) transparent;
      }

      .lesson-navigator-sidebar .lesson-navigator-item a {
        padding: 0.58rem 0.6rem 0.58rem 0.72rem;
        border-radius: 4px;
        color: var(--muted);
        font-family: var(--sans-font);
        font-size: 0.88rem;
        line-height: 1.32;
      }

      .lesson-navigator-sidebar .lesson-navigator-item[data-level="3"] a {
        padding-left: 1.25rem;
        font-size: 0.82rem;
      }

      .lesson-navigator-sidebar .lesson-navigator-item[data-level="4"] a {
        padding-left: 1.85rem;
        font-size: 0.78rem;
      }

      .lesson-navigator-sidebar-hidden .shell.has-lesson-navigator {
        width: min(100% - 32px, var(--max));
        display: block;
      }

      .lesson-navigator-sidebar-hidden .lesson-navigator-sidebar {
        display: none;
      }

      .lesson-navigator-sidebar-hidden .lesson-navigator-toggle {
        border-color: var(--accent);
        color: var(--accent);
      }

    }

    @media (max-width: 1099px) {
      .lesson-navigator-toggle,
      .lesson-navigator-sidebar {
        display: none;
      }
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
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 34px;
      }

      .reader-header-left {
        width: 100%;
        justify-content: space-between;
      }

      header nav {
        justify-content: flex-start;
      }

      .reader-actions {
        justify-content: flex-start;
      }

      .reader-notes-header,
      .reader-notes-footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .reader-notes-status {
        text-align: left;
      }

      .lesson-navigator-panel {
        border-left: 0;
        border-right: 0;
        padding: 22px 18px 40px;
      }

      .lesson-navigator-header {
        align-items: flex-start;
      }

      .lesson-navigator-item a {
        padding: 0.9rem 0;
        font-size: 1rem;
      }

      .lesson-navigator-item[data-level="3"] a {
        padding-left: 0.85rem;
      }

      .lesson-navigator-item[data-level="4"] a {
        padding-left: 1.45rem;
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
  <main class="shell${enableLessonNavigator ? " has-lesson-navigator" : ""}">
${lessonNavigatorSidebar}
    <div class="reader-column">
      <header data-reader-header>
        <div class="reader-header-left">
          ${lessonNavigatorControls}
          <a class="brand" href="${homeHref}">Learning Machine</a>
        </div>
        <div class="reader-actions">
          <nav aria-label="Reader navigation">
            <a href="${recentHref}">Recent</a>
            <a href="${reviewHref}">Review</a>
            <a href="${topicsHref}">Topics</a>
          </nav>
          ${lessonProgressControls}
          ${copyContextButtons}
          ${readerAuthControls}
        </div>
      </header>
      <article>
${body}
      </article>
${lessonNotesMarkup}
    </div>
  </main>
${lessonNavigatorMarkup}
${copyContextScript}
${lessonNotesScript}
${lessonProgressScript}
${readerProgressSummaryScript}
${reviewPageScript}
${lessonNavigatorScript}
${readerChromeScript}
${readerAuthScript}
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
  await fs.copyFile(faviconSourcePath, path.join(outputRoot, "favicon.svg"))

  for (const markdownPath of markdownFiles) {
    const markdownRelative = toPosix(path.relative(contentDir, markdownPath))
    const markdown = await fs.readFile(markdownPath, "utf8")
    const title = extractTitle(markdown, markdownRelative)
    const isReading = isIndividualReading(markdownRelative)
    const lessonRoute = markdownRelativeToRoute(markdownRelative)
    const copyContext = isReading ? buildCopyContext(markdown, title) : ""
    const copySummary = isReading ? buildSummaryContext(markdown, title) : ""
    const sourceText = isReading ? await readSourceTextForMarkdown(markdown) : ""
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
        .process(stripSourceTextPointers(stripFrontmatter(markdown))),
    )
    const outputPath = markdownRelativeToOutputPath(markdownRelative, outputRoot)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(
      outputPath,
      renderPage({
        title,
        body,
        sourceRelative: markdownRelative,
        urlPrefix,
        copyContext,
        copySummary,
        sourceText,
        enableLessonNavigator: isReading,
        lessonData: isReading
          ? {
              lessonId: lessonRoute,
              lessonTitle: title,
              lessonUrl: routeWithPrefix(urlPrefix, lessonRoute),
            }
          : null,
      }),
    )
  }

  const reviewOutputPath = path.join(outputRoot, "review", "index.html")
  await fs.mkdir(path.dirname(reviewOutputPath), { recursive: true })
  await fs.writeFile(
    reviewOutputPath,
    renderPage({
      title: "Review Queue",
      body: `<section class="reader-review-page">
<h1>Review Queue</h1>
<p class="reader-review-intro">Saved lessons and your markdown notes appear here.</p>
<div data-reader-review-list>
  <p class="reader-review-empty">Loading saved lessons...</p>
</div>
</section>`,
      sourceRelative: "review/index.md",
      urlPrefix,
      enableReviewPage: true,
    }),
  )

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
  { outputRoot: publicDir, urlPrefix: "", preserveNames: new Set() },
]

for (const target of targets) {
  await renderTarget(target)
}

console.log(
  `Rendered ${markdownFiles.length} native lesson pages to ${targets
    .map((target) => path.relative(repoRoot, target.outputRoot))
    .join(" and ")}`,
)
