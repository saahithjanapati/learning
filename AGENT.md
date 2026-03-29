# Agent Notes: Learning System

`AGENTS.md` is the canonical public skill registry for this repo.
This file is background context only and should not be treated as the source of discoverable skills.

## Purpose

This repository is a personal learning system for guided study and coding practice.
The assistant should help the learner:
- upload and organize study materials,
- generate tailored lessons and exercises,
- review solutions with hints-first feedback,
- track progress over time with a skill graph.

## Current System Goals

1. Keep topic content organized and easy to extend.
2. Save each lesson session as a reusable Markdown artifact.
3. Track skill progression from `learning -> practicing -> solid`.
4. Make next-step lesson suggestions based on prior sessions.
5. Support default topic routing and class-specific overrides.

## Current Repository Layout

- `README.md`: top-level usage and structure.
- `materials/`
  - `inbox/`: raw uploads (git-ignored).
  - `processed/`: extracted markdown (committed).
- `learning_system/`
  - `LESSON_INDEX.md`: chronological lesson registry.
  - `TOPIC_INDEX.md`: canonical topic paths + alias mapping.
  - `PROGRESS_LOG.md`: performance and mistake tracking.
  - `SKILL_GRAPH.md`: skill-tree style progress tracker.
  - `STARTUP_CONTEXT.md`: compact load-first summary for new assistant instances.
- `topics/`
  - unified route: `<root>/<topic>/...`
  - `<root>` is either a domain or a class name
  - each topic folder with:
    - `README.md` (topic overview),
    - `lessons/` (session summaries),
    - `practice/` (coding exercises and solutions).
    - `curriculum/` (0 -> 1 plans).

## Established Topic (So Far)

- `topics/transformers/kv-caching/`
  - `practice/kv_cache_exercise.py`
  - `practice/kv_cache_exercise_batched_multihead.py`
  - `lessons/2026-02-15-kv-caching-session-01.md`

## Session Style Preferences (Learned)

- The learner prefers implementation-first exercises with TODO scaffolds.
- Review style should be hint-driven before giving exact fixes.
- Keep explanations shape-focused and practical for intuition building.
- Learner may explicitly choose per-session mode: `learn`, `practice`, or `mixed`.
- Persist all lessons as markdown chat transcripts (math and non-math) for future mining/adaptation.

## Operating Conventions

1. New lesson sessions should create/update:
   - topic lesson log under `topics/.../lessons/`,
   - `learning_system/LESSON_INDEX.md`,
   - `learning_system/TOPIC_INDEX.md` if topic or aliasing changes,
   - `learning_system/PROGRESS_LOG.md`,
   - `learning_system/SKILL_GRAPH.md` if skill status changes.
2. Keep exercises in topic `practice/` folders.
3. Prefer concise, concrete notes over long prose.
4. Keep raw uploads out of git; keep processed markdown in git.
5. Maintain startup/index/reorg outputs via the public skills registered in `AGENTS.md` and implemented under `skills/`.
6. After material conversion, run post-ingest maintenance (`python scripts/learning_cli.py post-ingest`).
7. By default for every lesson session:
   - create/continue `topics/<root>/<topic>/lessons/YYYY-MM-DD-live-chat.md`,
   - append turns with separators and explicit `User asked` + `Assistant response`,
   - keep logging enabled unless user explicitly asks to stop for that session.
8. For any markdown that uses color styling:
   - prefer bright/high-contrast palette choices suitable for dark mode readability,
   - avoid low-contrast dark colors unless explicitly requested.

## Next System Upgrades

1. Add automatic similarity scoring for new topic-name matching.
2. Add metadata tags per lesson: prerequisites, difficulty, confidence.
3. Add automatic rollup metrics from `PROGRESS_LOG.md`.
4. Add "learn vs practice" quick start prompts per topic.

## Topic Routing Policy

1. Default route:
   - infer `<root>/<topic>` and store under `topics/<root>/<topic>/...`.
   - use domain as `<root>` unless user says class-specific.
2. If user explicitly says material is for a class:
   - set `<root>` to class name (example: `cs229`).
3. If a new topic sounds similar to an existing one:
   - propose closest existing match and ask for confirmation.
   - if not confirmed, create new topic path.

## Startup UX Policy

When user asks for help/get-started/startup:
1. Invoke startup skill behavior.
2. Provide the intro options.
3. Show recent topics and ask if they want to resume one.

## In-Depth Session Policy

If learner requests in-depth coverage for a topic:
1. Load prior topic artifacts first (`lessons`, `curriculum`, `practice`).
2. Load cross-topic performance context (`PROGRESS_LOG`, `SKILL_GRAPH`).
3. Build the lesson around unresolved weaknesses and requested depth/style.
