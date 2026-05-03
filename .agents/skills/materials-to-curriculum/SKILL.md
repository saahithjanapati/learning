---
name: materials-to-curriculum
description: Ingest uploaded learning materials or provided links, convert them to markdown, and produce topic curriculum + lesson plans. Use when the user uploads class/topic materials or shares URLs and wants structured lessons.
---

# Materials To Curriculum

## When To Use

Use this skill when user asks:
- "convert this PDF to markdown"
- "ingest this link / URL / website"
- "build lessons from these materials"
- "create a 0-1 curriculum from uploads"

## Workflow

1. Route content to topic path:
- default: `topics/<root>/<topic>/...`
- if class-specific, set `<root>` to class name.

2. Convert source material to markdown (assistant-run, user does not run scripts):
- for PDFs:
  - use Gemini API as primary converter,
  - strategy:
    - attempt whole-PDF conversion first,
    - if truncated/failure, fallback to chunked conversion,
- for websites/articles/URLs:
  - fetch the canonical page content directly,
  - scrape only the content needed for learning use,
  - preserve provenance with the canonical URL, title, and publish date when available,
  - prefer a structured summary/extract in markdown over raw HTML dumps,
- save extracted markdown to:
  - `materials/processed/<root>/<source-name>.md`
- math formatting policy for markdown output (Obsidian/MathJax compatible):
  - inline math must use `$...$`
  - display equations must use `$$...$$` on separate lines
  - never wrap equations in backticks
  - preserve LaTeX commands and symbols (`\\frac`, `\\sum`, `\\mathbb{R}`, `\\nabla`, etc.)

3. Preserve provenance:
- for local source files:
  - move processed files from `materials/inbox/` to `materials/archive/`
  - keep archive uncommitted
  - keep transcript `Source:` paths aligned with archive location
  - run post-ingest maintenance automatically after every successful conversion:
    - `python scripts/learning_cli.py post-ingest`
  - do not wait for a separate user request to archive after conversion
- for links/URLs:
  - keep the transcript `Source:` as the canonical URL
  - include site/title/publish metadata near the top of the processed markdown when available
  - use ingestion date/time, not source publication, submission, or revision date, for lesson filenames, `learning_system/LESSON_INDEX.md`, and public reader chronology
  - if a local snapshot is saved for debugging, keep it in local-only storage and do not require it for committed provenance

4. Build curriculum and session plan using templates:
- [learning_system/templates/CURRICULUM_TEMPLATE.md](../../../learning_system/templates/CURRICULUM_TEMPLATE.md)
- [learning_system/templates/LESSON_PLAN_TEMPLATE.md](../../../learning_system/templates/LESSON_PLAN_TEMPLATE.md)

5. Update tracking:
- [learning_system/LESSON_INDEX.md](../../../learning_system/LESSON_INDEX.md)
- [learning_system/PROGRESS_LOG.md](../../../learning_system/PROGRESS_LOG.md)
- [learning_system/TOPIC_INDEX.md](../../../learning_system/TOPIC_INDEX.md) (if new topic)

6. Verify public reader placement when publishing AI material:
- `materials/processed/ai/**/*.md` and `topics/ai/lessons/*.md` should both publish under one `AI / Lessons` section
- the root `AI` lesson count should be explainable from visible child collection sections plus any intentionally direct lessons
- newest/oldest ordering should follow ingest/add time, never source publication, submission, or revision time

## Git Policy

- Raw uploads in `materials/inbox/` and `materials/archive/` remain uncommitted.
- Local snapshots of fetched web pages remain uncommitted.
- Processed markdown in `materials/processed/` is committed.
