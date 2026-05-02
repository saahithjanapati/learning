# Agent Navigation

Fast path for agents entering this repo.

## Start Here

1. Read `AGENTS.md` for public skill routing.
2. Read `learning_system/STARTUP_CONTEXT.md` for user preferences and session rules.
3. Read `learning_system/TOPIC_INDEX.md` to resolve existing topic paths before creating new ones.
4. Read `learning_system/SOURCE_MAP.json` when mapping lessons or curricula back to processed source materials.
5. Read the relevant `topics/<root>/README.md` or `topics/<root>/<topic>/README.md` before editing a subject area.

## Subject Roots

| Root | Purpose | Start With |
|---|---|---|
| `topics/ai` | AI papers, articles, and agent/safety research notes. | `topics/ai/README.md` |
| `topics/biology` | Biology review tracks. | `topics/biology/README.md` |
| `topics/interviews` | Interview-prep subjects. | `topics/interviews/README.md` |
| `topics/optimization-for-ml` | Optimization course catch-up and proof/problem fluency. | `topics/optimization-for-ml/README.md` |
| `topics/probabilistic-graphical-models` | PGM course catch-up, inference, learning, and generative modeling. | `topics/probabilistic-graphical-models/README.md` |
| `topics/transformers` | Transformer architecture topics. | `topics/transformers/README.md` |

## Artifact Routing

- Raw uploads: `materials/inbox/` and `materials/archive/` are local-only.
- Processed sources: `materials/processed/<root>/`.
- Public lesson content: `topics/<root>/lessons/` or `topics/<root>/<topic>/lessons/`.
- Curriculum plans: `topics/<root>/curriculum/` or `topics/<root>/<topic>/curriculum/`.
- Exercises/checkpoints: `topics/<root>/practice/` or `topics/<root>/<topic>/practice/`.
- Live tutoring transcripts: `topics/<root>/live-chats/` or `topics/<root>/<topic>/live-chats/`.

When a topic could fit at both root and leaf level, prefer the leaf topic unless the artifact clearly spans several children.

## Maintenance Commands

Use natural-language skill invocation when possible. The underlying commands are:

- Reindex topics and regenerate tree: `python scripts/learning_cli.py reindex --write-skill-tree`
- Generate reorg report: `python scripts/learning_cli.py reorganize --write-report`
- Refresh source map after ingest: `python scripts/learning_cli.py post-ingest`
- Dry-run topic merge: `python scripts/learning_cli.py merge-topic --from <src> --into <dst>`

Apply topic merges only after an explicit user confirmation of the exact source and destination paths.

## Traversal Rules

- Prefer `rg` and `rg --files` for discovery.
- Do not scan `node_modules/`, `.npm-cache/`, `.vercel/`, or `web/lessons/public/` unless debugging generated output.
- Do not stage `.obsidian/` workspace changes unless the user explicitly asks.
- Treat untracked course/material folders as user work until their scope is confirmed.
- For web reader changes, edit generator scripts under `scripts/` and verify via `npm run lessons:build`; generated public output is ignored.

## Current Reorg Boundary

The repo is organized by subject root first, then subtopic. Broad root-level collections are allowed for survey-like material, especially under `topics/ai`. Before moving existing lessons between subjects, generate a reorg report and dry-run any merge or move plan.
