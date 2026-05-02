import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const topicsDir = path.join(repoRoot, "topics")
const contentDir = path.join(repoRoot, "web", "lessons", "content")
const contentPathPattern = /(^|[/\\])lessons[/\\][^/\\]+\.md$/i

function toPosix(filePath) {
  return filePath.split(path.sep).join("/")
}

const acronymWords = new Map([
  ["ai", "AI"],
  ["em", "EM"],
  ["ica", "ICA"],
  ["kkt", "KKT"],
  ["kv", "KV"],
  ["ml", "ML"],
  ["nag", "NAG"],
  ["pgm", "PGM"],
  ["sdp", "SDP"],
  ["sgd", "SGD"],
])
const lowercaseWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "vs", "via", "with"])

function formatSlugWord(word, index) {
  const normalized = word.toLowerCase()
  const acronym = acronymWords.get(normalized)

  if (acronym) {
    return acronym
  }

  if (index > 0 && lowercaseWords.has(normalized)) {
    return normalized
  }

  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
}

function humanizeSlug(slug) {
  return slug
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .split("-")
    .filter(Boolean)
    .map(formatSlugWord)
    .join(" ")
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

  return humanizeSlug(path.basename(fallback, ".md"))
}

function extractDate(repoRelative, stat) {
  const filenameDate = path.basename(repoRelative).match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]
  if (filenameDate) {
    return filenameDate
  }

  return new Date(stat.mtimeMs).toISOString().slice(0, 10)
}

function isLiveChat(repoRelative, markdown, title) {
  const slug = path.basename(repoRelative, ".md").toLowerCase()
  const titleLower = title.toLowerCase()

  return (
    /(^|-)live-chat($|-)/.test(slug) ||
    /(^|-)chat($|-)/.test(slug) ||
    /\blive chat\b/.test(titleLower) ||
    (/^## Transcript\s*$/m.test(markdown) && /^### Turn \d+\s*$/m.test(markdown))
  )
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

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (entry.isFile() && contentPathPattern.test(fullPath)) {
      files.push(fullPath)
    }
  }

  return files
}

function sanitizeGeneratedMarkdown(markdown) {
  return markdown
    .replaceAll(`${repoRoot}${path.sep}`, "")
    .replace(/(?:file:\/\/)?\/Users\/[^\s)\]`<>"']+/g, "[local file redacted]")
    .replace(/[A-Za-z]:\\Users\\[^\s)\]`<>"']+/g, "[local file redacted]")
    .replace(/(!?)\[([^\]]*)\]\(([^)]*(?:materials\/|learning_system\/)[^)]*)\)/g, (_, bang, label) => {
      if (bang) {
        return `_${label || "Image"} omitted from public lessons export._`
      }

      return label || "[source note]"
    })
    .replace(/\btopics\/[^\s)\]`<>"']+\/materials\/[^\s)\]`<>"']*/g, "[source material]")
    .replace(/\btopics\/[^\s)\]`<>"']+\/practice\/[^\s)\]`<>"']*/g, "[local practice file]")
    .replace(/(?:\.\.\/)+materials\/[^\s)\]`<>"']+/g, "[source material]")
    .replace(/\bmaterials\/[^\s)\]`<>"']*/g, "[source material]")
    .replace(/(?:\.\.\/)+learning_system\/[^\s)\]`<>"']+/g, "[system note]")
    .replace(/\blearning_system\/[^\s)\]`<>"']*/g, "[system note]")
}

function topicLabel(topicPath) {
  return topicPath
    .split("/")
    .map((part) => humanizeSlug(part))
    .join(" / ")
}

function topicLinkLabel(topicPath) {
  return topicPath
    .split("/")
    .map((part) => humanizeSlug(part))
    .join(" - ")
}

function topicHref(topicPath) {
  return `topics/${topicPath}/index.md`
}

function relativeMarkdownLink(fromMarkdownRelative, targetMarkdownRelative) {
  const fromDir = path.posix.dirname(fromMarkdownRelative)
  const relative = path.posix.relative(fromDir, targetMarkdownRelative)

  return relative || path.posix.basename(targetMarkdownRelative)
}

function localMarkdownTarget(href, sourceRepoRelative) {
  if (!href || href.startsWith("#") || href.startsWith("/") || isExternalHref(href)) {
    return null
  }

  const { pathname, suffix } = splitHref(href)

  if (!pathname.endsWith(".md")) {
    return null
  }

  const sourceDir = path.posix.dirname(sourceRepoRelative)
  const targetRepoRelative = pathname.startsWith("topics/")
    ? path.posix.normalize(pathname)
    : path.posix.normalize(path.posix.join(sourceDir, pathname))

  if (!targetRepoRelative.startsWith("topics/")) {
    return null
  }

  return { targetRepoRelative, suffix }
}

function rewritePublicMarkdownLinks(markdown, sourceRepoRelative, sourceOutputRelative, publicPathByRepoRelative) {
  return markdown.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (match, bang, label, href, title = "") => {
    const target = localMarkdownTarget(href, sourceRepoRelative)

    if (!target) {
      return match
    }

    const publicTarget = publicPathByRepoRelative.get(target.targetRepoRelative)

    if (!publicTarget) {
      return bang ? `_${label || "Image"} omitted from public lessons export._` : label || "[source note]"
    }

    return `${bang}[${label}](${relativeMarkdownLink(sourceOutputRelative, publicTarget)}${target.suffix}${title})`
  })
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

const lessonFiles = (await walk(topicsDir)).sort((a, b) => toPosix(a).localeCompare(toPosix(b)))

await fs.rm(contentDir, { recursive: true, force: true })
await fs.mkdir(contentDir, { recursive: true })

const itemsByTopic = new Map()
const publicPathByRepoRelative = new Map()
const exportRecords = []

for (const sourcePath of lessonFiles) {
  const repoRelative = path.relative(repoRoot, sourcePath)
  const repoRelativePosix = toPosix(repoRelative)
  const stat = await fs.stat(sourcePath)
  const markdown = await fs.readFile(sourcePath, "utf8")
  const sanitizedMarkdown = sanitizeGeneratedMarkdown(markdown)
  const title = extractTitle(sanitizedMarkdown, repoRelative)
  const relativeParts = repoRelativePosix.split("/")
  const collectionIndex = relativeParts.findIndex((part) => part === "lessons")

  if (isLiveChat(repoRelative, sanitizedMarkdown, title)) {
    continue
  }

  const outputRelative = repoRelative
  const topicPath = relativeParts.slice(1, collectionIndex).join("/")
  const topicItems = itemsByTopic.get(topicPath) ?? { lessons: [] }
  const item = {
    date: extractDate(repoRelative, stat),
    title,
    href: toPosix(outputRelative),
    topicPath,
    topicTitle: topicLabel(topicPath),
  }

  topicItems.lessons.push(item)
  itemsByTopic.set(topicPath, topicItems)

  publicPathByRepoRelative.set(repoRelativePosix, toPosix(outputRelative))
  exportRecords.push({
    markdown: sanitizedMarkdown,
    outputRelative: toPosix(outputRelative),
    repoRelative: repoRelativePosix,
  })
}

for (const record of exportRecords) {
  const outputPath = path.join(contentDir, record.outputRelative)
  const markdown = rewritePublicMarkdownLinks(record.markdown, record.repoRelative, record.outputRelative, publicPathByRepoRelative)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, markdown)
}

function compareDatedItems(a, b) {
  return b.date.localeCompare(a.date) || a.title.localeCompare(b.title) || a.href.localeCompare(b.href)
}

function sortedDatedItems(items) {
  return [...items].sort(compareDatedItems)
}

function latestDate(items) {
  return sortedDatedItems(items)[0]?.date ?? ""
}

function getTopicSummary(topicSummaries, topicPath) {
  const summary = topicSummaries.get(topicPath) ?? { lessons: [], childTopicPaths: new Set() }
  topicSummaries.set(topicPath, summary)
  return summary
}

function topicSortDate(summary) {
  return latestDate(summary.lessons)
}

function topicSummaryParts(summary, { includeLatest = true } = {}) {
  const parts = []
  const latestReading = latestDate(summary.lessons)

  if (summary.lessons.length > 0) {
    parts.push(pluralize(summary.lessons.length, "reading lesson"))
  }
  if (includeLatest && latestReading) {
    parts.push(`latest reading: ${latestReading}`)
  }

  return parts.length > 0 ? parts : ["no public lessons yet"]
}

function topicListLine(topicPath, summary, fromMarkdownRelative) {
  return `- [${topicLinkLabel(topicPath)}](${relativeMarkdownLink(fromMarkdownRelative, topicHref(topicPath))}) - ${topicSummaryParts(summary).join(", ")}`
}

function topicOverviewLine(topicPath, summary, fromMarkdownRelative) {
  return `- [${topicLinkLabel(topicPath)}](${relativeMarkdownLink(fromMarkdownRelative, topicHref(topicPath))}) - ${topicSummaryParts(summary, { includeLatest: false }).join(", ")}`
}

async function writeGeneratedPage(filePath, lines) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${lines.join("\n").trimEnd()}\n`)
}

const directTopics = new Map(
  [...itemsByTopic.entries()].map(([topicPath, items]) => [
    topicPath,
    {
      lessons: sortedDatedItems(items.lessons),
    },
  ]),
)
const topicSummaries = new Map()
const rootTopicSummary = getTopicSummary(topicSummaries, "")

for (const [topicPath, { lessons }] of directTopics) {
  rootTopicSummary.lessons.push(...lessons)

  const parts = topicPath.split("/")

  for (let index = 1; index <= parts.length; index += 1) {
    const currentTopicPath = parts.slice(0, index).join("/")
    const parentTopicPath = parts.slice(0, index - 1).join("/")
    const summary = getTopicSummary(topicSummaries, currentTopicPath)

    summary.lessons.push(...lessons)
    getTopicSummary(topicSummaries, parentTopicPath).childTopicPaths.add(currentTopicPath)
  }
}

function compareTopicPathsByRecency(a, b) {
  const summaryA = topicSummaries.get(a)
  const summaryB = topicSummaries.get(b)
  const recency = topicSortDate(summaryB).localeCompare(topicSortDate(summaryA))

  return recency || topicLabel(a).localeCompare(topicLabel(b))
}

function sortedChildTopicPaths(topicPath) {
  return [...(topicSummaries.get(topicPath)?.childTopicPaths ?? [])].sort(compareTopicPathsByRecency)
}

const allLessons = sortedDatedItems(rootTopicSummary.lessons)

const indexLines = [
  "---",
  "title: Lessons",
  "---",
  "",
  "# Lessons",
  "",
  "Pedagogical reading lessons from the Learning Machine vault.",
  "",
  `Browse by topic. For a chronological archive, use [Recent Lessons](${relativeMarkdownLink("index.md", "recent-lessons.md")}).`,
  "",
]

for (const topicPath of sortedChildTopicPaths("")) {
  const summary = topicSummaries.get(topicPath)
  const childTopicPaths = sortedChildTopicPaths(topicPath)

  indexLines.push(`## ${topicLabel(topicPath)}`, "")
  indexLines.push(`[Open ${topicLabel(topicPath)}](${relativeMarkdownLink("index.md", topicHref(topicPath))})`)
  indexLines.push("")
  indexLines.push(`${topicSummaryParts(summary, { includeLatest: false }).join(", ")}.`, "")

  if (childTopicPaths.length > 0) {
    indexLines.push("### Subtopics", "")

    for (const childTopicPath of childTopicPaths.slice(0, 8)) {
      indexLines.push(topicOverviewLine(childTopicPath, topicSummaries.get(childTopicPath), "index.md"))
    }

    if (childTopicPaths.length > 8) {
      indexLines.push(`- [View all ${topicLabel(topicPath)} sections](${relativeMarkdownLink("index.md", topicHref(topicPath))})`)
    }

    indexLines.push("")
  }
}

const topicsIndexLines = [
  "---",
  "title: Topics",
  "cssclasses: lessons-topic-index",
  "---",
  "",
  "# Topics",
  "",
  "Sections are ordered by latest reading date.",
  "",
  "## Sections",
  "",
]

for (const topicPath of sortedChildTopicPaths("")) {
  topicsIndexLines.push(topicListLine(topicPath, topicSummaries.get(topicPath), "topics/index.md"))
}

await writeGeneratedPage(path.join(contentDir, "topics", "index.md"), topicsIndexLines)

for (const topicPath of [...topicSummaries.keys()].filter(Boolean).sort(compareTopicPathsByRecency)) {
  const summary = topicSummaries.get(topicPath)
  const directItems = directTopics.get(topicPath) ?? { lessons: [] }
  const childTopicPaths = sortedChildTopicPaths(topicPath)
  const topicIndexRelative = toPosix(path.join("topics", ...topicPath.split("/"), "index.md"))
  const topicIndexPath = path.join(contentDir, "topics", ...topicPath.split("/"), "index.md")
  const topicLines = [
    "---",
    `title: ${topicLabel(topicPath)}`,
    "cssclasses: lessons-topic-index",
    "---",
    "",
    `# ${topicLabel(topicPath)}`,
    "",
    `[All topics](${relativeMarkdownLink(topicIndexRelative, "index.md")})`,
    "",
  ]

  if (childTopicPaths.length > 0) {
    topicLines.push("## Subtopics", "")

    for (const childTopicPath of childTopicPaths) {
      topicLines.push(topicListLine(childTopicPath, topicSummaries.get(childTopicPath), topicIndexRelative))
    }

    if (directItems.lessons.length > 0) {
      topicLines.push("")
    }
  }

  if (directItems.lessons.length > 0) {
    topicLines.push("## Lessons", "")

    for (const lesson of directItems.lessons) {
      topicLines.push(`- ${lesson.date} - [${lesson.title}](${relativeMarkdownLink(topicIndexRelative, lesson.href)})`)
    }
  }

  await writeGeneratedPage(topicIndexPath, topicLines)

  if (directItems.lessons.length > 0) {
    const lessonsIndexRelative = toPosix(path.join("topics", ...topicPath.split("/"), "lessons", "index.md"))

    await writeGeneratedPage(path.join(contentDir, "topics", ...topicPath.split("/"), "lessons", "index.md"), [
      "---",
      `title: ${topicLabel(topicPath)} Reading Lessons`,
      "cssclasses: lessons-topic-index",
      "---",
      "",
      `# ${topicLabel(topicPath)} Reading Lessons`,
      "",
      `[${topicLabel(topicPath)}](${relativeMarkdownLink(lessonsIndexRelative, topicHref(topicPath))})`,
      "",
      "## Lessons",
      "",
      ...directItems.lessons.map((lesson) => `- ${lesson.date} - [${lesson.title}](${relativeMarkdownLink(lessonsIndexRelative, lesson.href)})`),
    ])
  }

}

const recentLessonLines = [
  "---",
  "title: Recent Lessons",
  "cssclasses: lessons-topic-index",
  "---",
  "",
  "# Recent Lessons",
  "",
  `[Lessons](${relativeMarkdownLink("recent-lessons.md", "index.md")})`,
  "",
  "All reading lessons, newest to oldest.",
]

let currentLessonDate = ""

for (const lesson of allLessons) {
  if (lesson.date !== currentLessonDate) {
    currentLessonDate = lesson.date
    recentLessonLines.push("", `## ${currentLessonDate}`, "")
  }

  recentLessonLines.push(`- [${lesson.title}](${relativeMarkdownLink("recent-lessons.md", lesson.href)}) (${lesson.topicTitle})`)
}

await writeGeneratedPage(path.join(contentDir, "recent-lessons.md"), recentLessonLines)

await writeGeneratedPage(path.join(contentDir, "index.md"), indexLines)

console.log(
  `Exported ${allLessons.length} reading lessons to ${path.relative(repoRoot, contentDir)}`,
)
