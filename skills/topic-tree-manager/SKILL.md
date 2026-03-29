---
name: topic-tree-manager
description: Manage hierarchical topics and repo structure for this learning repo. Use for topic creation, reindexing, reorg reports, and topic merges; do not use for startup navigation or skill-catalog edits.
---

# Topic Tree Manager

## When To Use

Use this skill for:
- topic creation (`<root>/<topic/subtopic/...>`)
- structure audits
- skill-tree regeneration
- merge/cleanup operations

Do not use this skill for:
- startup help or recent-topic resume
- creating, splitting, or auditing repo skills

## Workflow

1. Reindex and rebuild tree:
- `python scripts/learning_cli.py reindex --write-skill-tree`

2. Generate reorg suggestions:
- `python scripts/learning_cli.py reorganize --write-report`

3. Create new topic/subtopic:
- `python scripts/learning_cli.py new-topic --root <root> --topic <topic/subtopic/...>`

4. Merge topics (safe process):
- always run dry-run first:
  - `python scripts/learning_cli.py merge-topic --from <src> --into <dst>`
- apply only after explicit user confirmation:
  - `python scripts/learning_cli.py merge-topic --from <src> --into <dst> --apply`

## Output Requirements

Summarize changed files:
- `learning_system/TOPIC_INDEX.md`
- `learning_system/SKILL_TREE.md`
- `learning_system/reorg/latest-report.md`
