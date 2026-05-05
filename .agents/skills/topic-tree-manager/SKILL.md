---
name: topic-tree-manager
description: Manage hierarchical topics and repo structure for Learning Machine. Use for topic creation, reindexing, reorg reports, and topic merges; do not use for startup navigation or skill-catalog edits.
---

# Topic Tree Manager

## When To Use

Use this skill for:
- topic creation (`<root>/<topic/subtopic/...>`)
- structure audits
- public reader topic/subtopic count mismatches
- skill-tree regeneration
- merge/cleanup operations

Do not use this skill for:
- startup help or recent-topic resume
- creating, splitting, or auditing repo skills

## Workflow

1. Reindex and rebuild tree:
- `python scripts/learning_cli.py reindex --write-skill-tree`

2. For public reader count mismatches, fix the generator rather than generated output:
- inspect `scripts/export_lessons.mjs` topic summary construction
- rebuild with `npm run lessons:build`
- verify parent lesson counts are explainable from visible child sections plus any direct lessons
- for AI, keep both generated collection sections visible:
  - `AI / Lessons` includes both `topics/ai/lessons/*.md` and recursive `materials/processed/ai/**/*.md`
- AI processed-source readings use exact source publication/submission dates when available; missing, partial, or inferred source dates fall back to ingest/add dates

3. Generate reorg suggestions:
- `python scripts/learning_cli.py reorganize --write-report`

4. Create new topic/subtopic:
- `python scripts/learning_cli.py new-topic --root <root> --topic <topic/subtopic/...>`

5. Merge topics (safe process):
- always run dry-run first:
  - `python scripts/learning_cli.py merge-topic --from <src> --into <dst>`
- apply only after explicit user confirmation:
  - `python scripts/learning_cli.py merge-topic --from <src> --into <dst> --apply`

## Output Requirements

Summarize changed files:
- [learning_system/TOPIC_INDEX.md](../../../learning_system/TOPIC_INDEX.md)
- [learning_system/SKILL_TREE.md](../../../learning_system/SKILL_TREE.md)
- [learning_system/reorg/latest-report.md](../../../learning_system/reorg/latest-report.md)
- [scripts/export_lessons.mjs](../../../scripts/export_lessons.mjs) when public reader counts or generated topic pages change
