---
name: materials-to-curriculum
description: Ingest uploaded learning materials (especially PDFs), convert to markdown, and produce topic curriculum + lesson plans. Use when the user uploads class/topic materials and wants structured lessons.
---

# Materials To Curriculum

## When To Use

Use this skill when user asks:
- "convert this PDF to markdown"
- "build lessons from these materials"
- "create a 0-1 curriculum from uploads"

## Workflow

1. Route content to topic path:
- default: `topics/<root>/<topic>/...`
- if class-specific, set `<root>` to class name.

2. Convert PDF to markdown (assistant-run, user does not run scripts):
- use Gemini API as primary converter,
- strategy:
  - attempt whole-PDF conversion first,
  - if truncated/failure, fallback to chunked conversion,
- save extracted markdown to:
  - `materials/processed/<source-name>.md`
- math formatting policy for markdown output (Obsidian/MathJax compatible):
  - inline math must use `$...$`
  - display equations must use `$$...$$` on separate lines
  - never wrap equations in backticks
  - preserve LaTeX commands and symbols (`\\frac`, `\\sum`, `\\mathbb{R}`, `\\nabla`, etc.)

3. Archive processed source files:
- move processed files from `materials/inbox/` to `materials/archive/`
- keep archive uncommitted
- keep transcript `Source:` paths aligned with archive location
- run post-ingest maintenance automatically after every successful conversion:
  - `python scripts/learning_cli.py post-ingest`
- do not wait for a separate user request to archive after conversion

4. Build curriculum and session plan using templates:
- `learning_system/templates/CURRICULUM_TEMPLATE.md`
- `learning_system/templates/LESSON_PLAN_TEMPLATE.md`

5. Update tracking:
- `learning_system/LESSON_INDEX.md`
- `learning_system/PROGRESS_LOG.md`
- `learning_system/TOPIC_INDEX.md` (if new topic)

## Git Policy

- Raw uploads in `materials/inbox/` and `materials/archive/` remain uncommitted.
- Processed markdown in `materials/processed/` is committed.
