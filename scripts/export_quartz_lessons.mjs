import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const topicsDir = path.join(repoRoot, "topics")
const contentDir = path.join(repoRoot, "web", "lessons", "content")
const contentPathPattern = /(^|[/\\])(lessons|live-chats)[/\\][^/\\]+\.md$/i

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

function publicContentPath(repoRelative, kind) {
  if (kind !== "liveChat") {
    return repoRelative
  }

  const parts = toPosix(repoRelative).split("/")
  const lessonsIndex = parts.indexOf("lessons")

  if (lessonsIndex >= 0) {
    parts[lessonsIndex] = "live-chats"
  }

  return parts.join("/")
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

function rootHrefFromTopic(topicPath) {
  return `${"../".repeat(topicPath.split("/").length + 1)}index.md`
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

const lessonFiles = (await walk(topicsDir)).sort((a, b) => toPosix(a).localeCompare(toPosix(b)))

await fs.rm(contentDir, { recursive: true, force: true })
await fs.mkdir(contentDir, { recursive: true })

const itemsByTopic = new Map()

for (const sourcePath of lessonFiles) {
  const repoRelative = path.relative(repoRoot, sourcePath)
  const stat = await fs.stat(sourcePath)
  const markdown = await fs.readFile(sourcePath, "utf8")
  const sanitizedMarkdown = sanitizeGeneratedMarkdown(markdown)
  const title = extractTitle(sanitizedMarkdown, repoRelative)
  const relativeParts = toPosix(repoRelative).split("/")
  const collectionIndex = relativeParts.findIndex((part) => part === "lessons" || part === "live-chats")
  const sourceCollection = relativeParts[collectionIndex]
  const kind = sourceCollection === "live-chats" || isLiveChat(repoRelative, sanitizedMarkdown, title) ? "liveChat" : "lesson"
  const outputRelative = publicContentPath(repoRelative, kind)
  const outputPath = path.join(contentDir, outputRelative)
  const topicPath = relativeParts.slice(1, collectionIndex).join("/")
  const topicItems = itemsByTopic.get(topicPath) ?? { lessons: [], liveChats: [] }
  const item = {
    date: extractDate(repoRelative, stat),
    title,
    href: toPosix(outputRelative),
    topicPath,
    topicTitle: topicLabel(topicPath),
  }

  if (kind === "liveChat") {
    topicItems.liveChats.push(item)
  } else {
    topicItems.lessons.push(item)
  }
  itemsByTopic.set(topicPath, topicItems)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, sanitizedMarkdown)
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
  const summary = topicSummaries.get(topicPath) ?? { lessons: [], liveChats: [], childTopicPaths: new Set() }
  topicSummaries.set(topicPath, summary)
  return summary
}

function topicSortDate(summary) {
  return latestDate(summary.lessons) || latestDate(summary.liveChats)
}

function topicSummaryParts(summary) {
  const parts = []
  const latestReading = latestDate(summary.lessons)

  if (summary.lessons.length > 0) {
    parts.push(pluralize(summary.lessons.length, "reading lesson"))
  }
  if (summary.liveChats.length > 0) {
    parts.push(pluralize(summary.liveChats.length, "live chat"))
  }
  if (latestReading) {
    parts.push(`latest reading: ${latestReading}`)
  }

  return parts.length > 0 ? parts : ["no public lessons yet"]
}

function topicListLine(topicPath, summary) {
  return `- [${topicLinkLabel(topicPath)}](${topicHref(topicPath)}) - ${topicSummaryParts(summary).join(", ")}`
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
      liveChats: sortedDatedItems(items.liveChats),
    },
  ]),
)
const topicSummaries = new Map()
const rootTopicSummary = getTopicSummary(topicSummaries, "")

for (const [topicPath, { lessons, liveChats }] of directTopics) {
  rootTopicSummary.lessons.push(...lessons)
  rootTopicSummary.liveChats.push(...liveChats)

  const parts = topicPath.split("/")

  for (let index = 1; index <= parts.length; index += 1) {
    const currentTopicPath = parts.slice(0, index).join("/")
    const parentTopicPath = parts.slice(0, index - 1).join("/")
    const summary = getTopicSummary(topicSummaries, currentTopicPath)

    summary.lessons.push(...lessons)
    summary.liveChats.push(...liveChats)
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
const allLiveChats = sortedDatedItems(rootTopicSummary.liveChats)

const indexLines = [
  "---",
  "title: Lessons",
  "---",
  "",
  "# Lessons",
  "",
  "Pedagogical reading lessons from the Learning Machine vault. Live-chat transcripts are grouped separately.",
  "",
  "## Recent Lessons",
  "",
]

for (const lesson of allLessons.slice(0, 10)) {
  indexLines.push(`- ${lesson.date} - [${lesson.title}](${lesson.href}) (${lesson.topicTitle})`)
}

indexLines.push("", "[View all recent lessons](recent-lessons.md)")

indexLines.push("", "## Topics", "")

for (const topicPath of sortedChildTopicPaths("")) {
  indexLines.push(topicListLine(topicPath, topicSummaries.get(topicPath)))
}

const topicsIndexLines = [
  "---",
  "title: Topics",
  "cssclasses: lessons-topic-index",
  "---",
  "",
  "# Topics",
  "",
  "Sections are ordered by latest reading date. Live-chat transcripts are counted separately from lessons.",
  "",
  "## Sections",
  "",
]

for (const topicPath of sortedChildTopicPaths("")) {
  topicsIndexLines.push(topicListLine(topicPath, topicSummaries.get(topicPath)))
}

await writeGeneratedPage(path.join(contentDir, "topics", "index.md"), topicsIndexLines)

for (const topicPath of [...topicSummaries.keys()].filter(Boolean).sort(compareTopicPathsByRecency)) {
  const summary = topicSummaries.get(topicPath)
  const directItems = directTopics.get(topicPath) ?? { lessons: [], liveChats: [] }
  const childTopicPaths = sortedChildTopicPaths(topicPath)
  const topicIndexPath = path.join(contentDir, "topics", ...topicPath.split("/"), "index.md")
  const topicLines = [
    "---",
    `title: ${topicLabel(topicPath)}`,
    "cssclasses: lessons-topic-index",
    "---",
    "",
    `# ${topicLabel(topicPath)}`,
    "",
    `[All topics](${rootHrefFromTopic(topicPath)})`,
    "",
  ]

  if (childTopicPaths.length > 0) {
    topicLines.push("## Subtopics", "")

    for (const childTopicPath of childTopicPaths) {
      topicLines.push(topicListLine(childTopicPath, topicSummaries.get(childTopicPath)))
    }

    if (directItems.lessons.length > 0 || directItems.liveChats.length > 0) {
      topicLines.push("")
    }
  }

  if (directItems.lessons.length > 0) {
    topicLines.push("## Lessons", "")

    for (const lesson of directItems.lessons) {
      topicLines.push(`- ${lesson.date} - [${lesson.title}](${lesson.href})`)
    }
  }

  if (directItems.liveChats.length > 0) {
    topicLines.push("", "## Live Chats", "", "Interactive transcripts and problem-solving sessions.", "")

    for (const liveChat of directItems.liveChats) {
      topicLines.push(`- ${liveChat.date} - [${liveChat.title}](${liveChat.href})`)
    }
  }

  await writeGeneratedPage(topicIndexPath, topicLines)

  if (directItems.lessons.length > 0) {
    await writeGeneratedPage(path.join(contentDir, "topics", ...topicPath.split("/"), "lessons", "index.md"), [
      "---",
      `title: ${topicLabel(topicPath)} Reading Lessons`,
      "cssclasses: lessons-topic-index",
      "---",
      "",
      `# ${topicLabel(topicPath)} Reading Lessons`,
      "",
      `[${topicLabel(topicPath)}](../index.md)`,
      "",
      "## Lessons",
      "",
      ...directItems.lessons.map((lesson) => `- ${lesson.date} - [${lesson.title}](${lesson.href})`),
    ])
  }

  if (directItems.liveChats.length > 0) {
    await writeGeneratedPage(path.join(contentDir, "topics", ...topicPath.split("/"), "live-chats", "index.md"), [
      "---",
      `title: ${topicLabel(topicPath)} Live Chats`,
      "cssclasses: lessons-topic-index",
      "---",
      "",
      `# ${topicLabel(topicPath)} Live Chats`,
      "",
      `[${topicLabel(topicPath)}](../index.md)`,
      "",
      "## Live Chats",
      "",
      ...directItems.liveChats.map((liveChat) => `- ${liveChat.date} - [${liveChat.title}](${liveChat.href})`),
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
  "[Lessons](index.md)",
  "",
  "All reading lessons, newest to oldest.",
]

let currentLessonDate = ""

for (const lesson of allLessons) {
  if (lesson.date !== currentLessonDate) {
    currentLessonDate = lesson.date
    recentLessonLines.push("", `## ${currentLessonDate}`, "")
  }

  recentLessonLines.push(`- [${lesson.title}](${lesson.href}) (${lesson.topicTitle})`)
}

await writeGeneratedPage(path.join(contentDir, "recent-lessons.md"), recentLessonLines)

if (allLiveChats.length > 0) {
  indexLines.push("", "## Recent Live Chats", "")

  for (const liveChat of allLiveChats.slice(0, 5)) {
    indexLines.push(`- ${liveChat.date} - [${liveChat.title}](${liveChat.href}) (${liveChat.topicTitle})`)
  }
}

await writeGeneratedPage(path.join(contentDir, "index.md"), indexLines)

console.log(
  `Exported ${allLessons.length} reading lessons and ${allLiveChats.length} live chats to ${path.relative(repoRoot, contentDir)}`,
)
