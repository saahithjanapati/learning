import { execFileSync } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const topicsDir = path.join(repoRoot, "topics")
const processedDir = path.join(repoRoot, "materials", "processed")
const lessonIndexPath = path.join(repoRoot, "learning_system", "LESSON_INDEX.md")
const contentDir = path.join(repoRoot, "web", "lessons", "content")
const contentPathPattern = /(^|[/\\])lessons[/\\][^/\\]+\.md$/i
const publishedProcessedRootTopics = new Map([["ai", "papers"]])
const publishedLessonCollectionRootTopics = new Set(["ai"])
const gitAddedDateByRepoRelative = new Map()
let ingestDatesByRepoRelative = new Map()

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

function extractMetadataDate(markdown) {
  return markdown.match(/^(?:Published|Submitted|Date):\s*`?(\d{4}-\d{2}-\d{2})`?\s*$/im)?.[1] ?? null
}

function extractIngestedMetadataDate(markdown) {
  return markdown.match(/^(?:Ingested|Ingested on|Ingest date|Date ingested):\s*`?(\d{4}-\d{2}-\d{2})`?\s*$/im)?.[1] ?? null
}

function gitAddedDate(repoRelative) {
  if (gitAddedDateByRepoRelative.has(repoRelative)) {
    return gitAddedDateByRepoRelative.get(repoRelative)
  }

  let addedDate = null

  try {
    const output = execFileSync(
      "git",
      ["log", "--diff-filter=A", "--follow", "--format=%cs", "--", repoRelative],
      { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    addedDate = output.at(-1) ?? null
  } catch {
    addedDate = null
  }

  gitAddedDateByRepoRelative.set(repoRelative, addedDate)
  return addedDate
}

function extractDate(repoRelative, stat, markdown = "", { preferIngestDate = false } = {}) {
  if (preferIngestDate) {
    const ingestedDate =
      extractIngestedMetadataDate(markdown) ??
      ingestDatesByRepoRelative.get(repoRelative) ??
      gitAddedDate(repoRelative)

    if (ingestedDate) {
      return ingestedDate
    }
  }

  const filenameDate = path.basename(repoRelative).match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]
  if (filenameDate) {
    return filenameDate
  }

  const metadataDate = extractMetadataDate(markdown)
  if (metadataDate) {
    return metadataDate
  }

  return new Date(stat.mtimeMs).toISOString().slice(0, 10)
}

async function lessonIndexIngestDates() {
  const ingestDates = new Map()

  let lessonIndex = ""
  try {
    lessonIndex = await fs.readFile(lessonIndexPath, "utf8")
  } catch (error) {
    if (error.code === "ENOENT") {
      return ingestDates
    }

    throw error
  }

  for (const line of lessonIndex.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed.startsWith("|") || trimmed.startsWith("|---")) {
      continue
    }

    const columns = trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((column) => column.trim())

    if (columns.length !== 6 || columns[0].toLowerCase() === "date") {
      continue
    }

    const rowDate = columns[0]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rowDate)) {
      continue
    }

    const fileRefs = columns[5]
    const links = fileRefs.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)

    for (const [, href] of links) {
      const { pathname } = splitHref(href)

      if (!pathname.endsWith(".md") || isExternalHref(pathname)) {
        continue
      }

      const repoRelative = pathname.startsWith("topics/") || pathname.startsWith("materials/")
        ? path.posix.normalize(pathname)
        : path.posix.normalize(path.posix.join("learning_system", pathname))

      if (repoRelative.startsWith("..")) {
        continue
      }

      const previousDate = ingestDates.get(repoRelative)
      if (!previousDate || rowDate > previousDate) {
        ingestDates.set(repoRelative, rowDate)
      }
    }
  }

  return ingestDates
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

async function walk(dir, includeFile) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath, includeFile)))
    } else if (entry.isFile() && includeFile(fullPath, entry)) {
      files.push(fullPath)
    }
  }

  return files
}

async function publicProcessedSourceReadings(rootTopic, publicCollection) {
  const rootDir = path.join(processedDir, rootTopic)
  const readings = []
  const seen = new Set()

  try {
    await fs.access(rootDir)
  } catch (error) {
    if (error.code === "ENOENT") {
      return []
    }

    throw error
  }

  const sourcePaths = await walk(rootDir, (filePath, entry) => {
    return entry.name.endsWith(".md") && !entry.name.startsWith("_")
  })

  for (const sourcePath of sourcePaths) {
    const repoRelative = toPosix(path.relative(repoRoot, sourcePath))
    const processedRelative = toPosix(path.relative(rootDir, sourcePath))

    if (seen.has(repoRelative)) {
      continue
    }

    seen.add(repoRelative)
    readings.push({
      sourcePath,
      repoRelative,
      outputRelative: toPosix(path.join("topics", rootTopic, publicCollection, processedRelative)),
      topicPath: `${rootTopic}/${publicCollection}`,
      dateMode: "ingested",
    })
  }

  return readings.sort((a, b) => a.repoRelative.localeCompare(b.repoRelative))
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

ingestDatesByRepoRelative = await lessonIndexIngestDates()

const lessonFiles = (await walk(topicsDir, (filePath) => contentPathPattern.test(filePath))).sort((a, b) => toPosix(a).localeCompare(toPosix(b)))
const processedReadings = (
  await Promise.all(
    [...publishedProcessedRootTopics.entries()].map(([rootTopic, publicCollection]) =>
      publicProcessedSourceReadings(rootTopic, publicCollection),
    ),
  )
).flat()
const publicReadings = [
  ...lessonFiles.map((sourcePath) => {
    const repoRelative = path.relative(repoRoot, sourcePath)
    const repoRelativePosix = toPosix(repoRelative)
    const relativeParts = repoRelativePosix.split("/")
    const collectionIndex = relativeParts.findIndex((part) => part === "lessons")
    const baseTopicParts = relativeParts.slice(1, collectionIndex)
    const rootTopic = baseTopicParts[0]
    const topicPath = publishedLessonCollectionRootTopics.has(rootTopic)
      ? [...baseTopicParts, "lessons"].join("/")
      : baseTopicParts.join("/")

    return {
      sourcePath,
      repoRelative: repoRelativePosix,
      outputRelative: repoRelativePosix,
      topicPath,
      collectionIndexRelative: toPosix(path.join("topics", ...baseTopicParts, "lessons", "index.md")),
    }
  }),
  ...processedReadings,
]

await fs.rm(contentDir, { recursive: true, force: true })
await fs.mkdir(contentDir, { recursive: true })

const itemsByTopic = new Map()
const collectionIndexes = new Map()
const publicPathByRepoRelative = new Map()
const exportRecords = []

for (const reading of publicReadings) {
  const { sourcePath, repoRelative: repoRelativePosix, outputRelative, topicPath, collectionIndexRelative } = reading
  const stat = await fs.stat(sourcePath)
  const markdown = await fs.readFile(sourcePath, "utf8")
  const sanitizedMarkdown = sanitizeGeneratedMarkdown(markdown)
  const title = extractTitle(sanitizedMarkdown, repoRelativePosix)

  if (isLiveChat(repoRelativePosix, sanitizedMarkdown, title)) {
    continue
  }

  const topicItems = itemsByTopic.get(topicPath) ?? { lessons: [] }
  const item = {
    date: extractDate(repoRelativePosix, stat, sanitizedMarkdown, {
      preferIngestDate: reading.dateMode === "ingested",
    }),
    title,
    href: toPosix(outputRelative),
    topicPath,
    topicTitle: topicLabel(topicPath),
  }

  topicItems.lessons.push(item)
  itemsByTopic.set(topicPath, topicItems)

  if (collectionIndexRelative && collectionIndexRelative !== topicHref(topicPath)) {
    const collectionItems = collectionIndexes.get(collectionIndexRelative) ?? { topicPath, lessons: [] }
    collectionItems.lessons.push(item)
    collectionIndexes.set(collectionIndexRelative, collectionItems)
  }

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
    parts.push(pluralize(summary.lessons.length, "reading"))
  }
  if (includeLatest && latestReading) {
    parts.push(`latest reading: ${latestReading}`)
  }

  return parts.length > 0 ? parts : ["no public readings yet"]
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
  "title: Readings",
  "---",
  "",
  "# Readings",
  "",
  "Pedagogical lessons, paper notes, and source readings from the Learning Machine vault.",
  "",
  `Browse by topic. For a chronological archive, use [Recent Readings](${relativeMarkdownLink("index.md", "recent-lessons.md")}).`,
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
  const childTopicPaths = sortedChildTopicPaths(topicPath)
  const topicReadings = sortedDatedItems(summary.lessons)
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

    if (topicReadings.length > 0) {
      topicLines.push("")
    }
  }

  if (topicReadings.length > 0) {
    topicLines.push("## Readings", "")

    for (const lesson of topicReadings) {
      const topicSuffix = lesson.topicPath !== topicPath ? ` (${topicLinkLabel(lesson.topicPath)})` : ""
      topicLines.push(`- ${lesson.date} - [${lesson.title}](${relativeMarkdownLink(topicIndexRelative, lesson.href)})${topicSuffix}`)
    }
  }

  await writeGeneratedPage(topicIndexPath, topicLines)
}

for (const [collectionIndexRelative, collection] of [...collectionIndexes.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const sortedLessons = sortedDatedItems(collection.lessons)
  const collectionIndexPath = path.join(contentDir, ...collectionIndexRelative.split("/"))

  await writeGeneratedPage(collectionIndexPath, [
      "---",
      `title: ${topicLabel(collection.topicPath)} Reading Lessons`,
      "cssclasses: lessons-topic-index",
      "---",
      "",
      `# ${topicLabel(collection.topicPath)} Reading Lessons`,
      "",
      `[${topicLabel(collection.topicPath)}](${relativeMarkdownLink(collectionIndexRelative, topicHref(collection.topicPath))})`,
      "",
      "## Readings",
      "",
      ...sortedLessons.map((lesson) => `- ${lesson.date} - [${lesson.title}](${relativeMarkdownLink(collectionIndexRelative, lesson.href)})`),
  ])
}

const recentLessonLines = [
  "---",
  "title: Recent Readings",
  "cssclasses: lessons-topic-index",
  "---",
  "",
  "# Recent Readings",
  "",
  `[Readings](${relativeMarkdownLink("recent-lessons.md", "index.md")})`,
  "",
  "All public readings, newest to oldest.",
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
  `Exported ${allLessons.length} public readings to ${path.relative(repoRoot, contentDir)}`,
)
