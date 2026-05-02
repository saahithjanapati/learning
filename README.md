# Learning Machine

This repo is organized so you can:
- `Learn`: read lesson summaries and concept notes by topic.
- `Practice`: fill in coding exercises and get targeted review.
- `Plan`: track your skill progression with a lightweight skill graph.
- `Ingest`: upload source materials and convert them to reusable markdown.

## Structure

- `materials/`
  - `inbox/` raw local uploads (ignored by git)
  - `archive/` processed raw uploads moved from inbox (ignored by git)
  - `processed/` extracted markdown (committed)
- `topics/`
  - unified namespace: `topics/<root>/<topic>/...`
  - `<root>` can be a domain (`transformers`) or class name (`cs229`)
  - start with [topics/README.md](topics/README.md) for the subject map
- `learning_system/`
  - Cross-topic tracking files and templates.
  - Load [learning_system/STARTUP_CONTEXT.md](learning_system/STARTUP_CONTEXT.md) first in new sessions.
  - Use [learning_system/AGENT_NAVIGATION.md](learning_system/AGENT_NAVIGATION.md) for a compact traversal map.
  - Use [learning_system/LOAD_ORDER.md](learning_system/LOAD_ORDER.md) for deterministic context loading.

## Current Topic Coverage

- `topics/ai`
- `topics/biology/core`
- `topics/interviews/ml-system-design`
- `topics/optimization-for-ml`
- `topics/probabilistic-graphical-models`
- `topics/transformers/kv-caching`

## Workflow (Recommended)

1. Add source materials to `materials/inbox/` and specify routing:
   - infer `<root>/<topic>` and use `topics/<root>/<topic>/...`
   - if class-specific, set `<root>` to class name (example: `cs229`)
2. Ask assistant to convert materials to markdown in `materials/processed/` (Gemini API default).
3. Post-ingest maintenance runs automatically after conversion:
   - `materials/inbox/` -> `materials/archive/` for processed sources
   - transcript `Source:` path updates
   - `learning_system/SOURCE_MAP.json` refresh
   - public AI source notes listed in `SOURCE_MAP.json` appear in the web reader under `/topics/ai/papers/` on the next build/deploy
4. Build/update curriculum and lessons under:
   - `topics/<root>/<topic>/...`
5. Work in `practice/` for exercises, save summaries in `lessons/`.
6. Update:
   - [learning_system/LESSON_INDEX.md](learning_system/LESSON_INDEX.md)
   - [learning_system/TOPIC_INDEX.md](learning_system/TOPIC_INDEX.md)
   - [learning_system/PROGRESS_LOG.md](learning_system/PROGRESS_LOG.md)
   - [learning_system/SKILL_GRAPH.md](learning_system/SKILL_GRAPH.md)

## Agent Skill Commands

Use natural-language requests instead of running scripts directly.

Public skills:
- `AGENTS.md` is the canonical public skill registry.
- Public skill files live under `.agents/skills/` so native Codex discovery and `$skill-name` invocation work.
- If a skill file exists under `skills/` but is not listed in `AGENTS.md`, treat it as internal and do not rely on it showing up as a public skill.

- `learning-startup-resume`
- `topic-tree-manager`
- `materials-to-curriculum`
- `lesson-writer`
- `adaptive-session-tutor`
- `markdown-live-chat`
- `learner-evidence-tracker`
- `skill-catalog-manager`
- `openai-image-generator`

Examples:
- "show startup menu and recent topics"
- "$learning-startup-resume show startup menu and recent topics"
- "resume my latest topic"
- "reindex topics and regenerate the skill tree"
- "create a new topic under transformers called attention/rope"
- "show a reorganization report"
- "dry-run merge topic A into topic B"
- "audit the repo skills and fix the catalog"

The assistant executes maintenance actions internally.

## Source Of Truth

Use these files as the primary references instead of duplicating policy across many notes:

- `AGENTS.md`: public skill registry and routing boundaries
- [learning_system/AGENT_NAVIGATION.md](learning_system/AGENT_NAVIGATION.md): fast traversal map for future agents
- [learning_system/LOAD_ORDER.md](learning_system/LOAD_ORDER.md): startup context loading order
- [learning_system/CONTENT_ROUTING.md](learning_system/CONTENT_ROUTING.md): topic path and artifact placement rules
- [learning_system/CURRICULUM_WORKFLOW.md](learning_system/CURRICULUM_WORKFLOW.md): ingest -> curriculum -> lesson workflow

If repo skills do not appear in the Codex skill picker immediately after changes, start a new chat or restart Codex so it re-scans `.agents/skills/`.

## Self-Directed Learning Controls

At session start, you can specify:
- intent: `learn`, `practice`, or `mixed`
- question style: conceptual, coding, debugging, MCQ, short-answer
- difficulty and number of questions

Reference:
- [learning_system/SELF_DIRECTED_CONTROLS.md](learning_system/SELF_DIRECTED_CONTROLS.md)
- [learning_system/IN_DEPTH_MODE.md](learning_system/IN_DEPTH_MODE.md)
- [learning_system/CLI_HELP.md](learning_system/CLI_HELP.md)
- `AGENTS.md`
