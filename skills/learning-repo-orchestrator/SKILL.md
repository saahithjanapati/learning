---
name: learning-repo-orchestrator
description: Internal composite helper for the learning repo. Use only when a higher-level router needs one repo-maintenance entry point; prefer the narrower public skills for direct user requests.
visibility: internal
---

# Learning Repo Orchestrator

This is an internal composite skill.
Do not advertise it in `AGENTS.md` while the narrower public skills exist.
Route direct user requests to the leaf skills instead:
- startup/recent/resume -> `learning-startup-resume`
- topic creation/reindex/reorg/merge -> `topic-tree-manager`

This skill provides a user-facing natural-language interface for repository maintenance and startup UX.
The user should not need to run Python commands directly.

## Trigger Phrases

Use this skill when the user asks for any of:
- startup intro/help menu
- recent topics or resume suggestions
- topic/skill-tree reindexing
- topic reorganization and merge planning
- creating new topics/subtopics
- merging topics

## Command Intents

Map user intent to internal actions:

1. Startup help / where to begin
- action: run `python scripts/learning_cli.py start --limit 5`
- response: show actions + recent topics + resume prompt

2. Recent topics
- action: run `python scripts/learning_cli.py recent-topics --limit <N>`

3. Reindex topics and regenerate skill tree
- action: run `python scripts/learning_cli.py reindex --write-skill-tree`

4. Reorganization report
- action: run `python scripts/learning_cli.py reorganize --write-report`

5. Post-ingest maintenance
- action: run `python scripts/learning_cli.py post-ingest`

6. New topic or subtopic
- action: run `python scripts/learning_cli.py new-topic --root <root> --topic <topic/subtopic/...>`

7. Merge topics
- default: dry-run first with `python scripts/learning_cli.py merge-topic --from <src> --into <dst>`
- apply only after explicit confirmation:
  - `python scripts/learning_cli.py merge-topic --from <src> --into <dst> --apply`

## Safety Rules

- Never apply merge without explicit user confirmation.
- Treat `--apply` merge as state-changing; always summarize planned conflicts first.
- After structural changes, regenerate topic index and skill tree.

## Output Style

- Keep responses concise.
- Always summarize what changed and where:
  - `learning_system/TOPIC_INDEX.md`
  - `learning_system/SKILL_TREE.md`
  - `learning_system/reorg/latest-report.md`
