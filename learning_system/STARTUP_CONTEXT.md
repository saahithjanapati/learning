# Startup Context (Load First)

This file is the compact memory for new assistant instances.
Use [learning_system/LOAD_ORDER.md](LOAD_ORDER.md) for full startup loading sequence.
Use `AGENTS.md` as the canonical public skill registry.
Use [learning_system/REPO_CONTEXT.md](REPO_CONTEXT.md) for fuller background repo context.
Public skills live in `.agents/skills/` for native Codex discovery.

## User Preferences

- Prefer implementation-first learning.
- Prefer hints-first review; exact fixes only on request.
- Wants progression from exposition-heavy to practice-heavy as mastery improves.
- Wants self-directed controls per session (`learn`, `practice`, `mixed`).
- Wants all lesson sessions (math and non-math) persisted as markdown chat transcripts so they can be mined later for weak spots and curriculum adaptation.

## Routing Rules

1. Default topic path:
- `topics/<root>/<topic>/...`
- usually `<root>` is a domain (example: `transformers`).

2. If user explicitly says material is for a class:
- use class name as root (example: `topics/cs229/gradient-descent/...`).

3. Topic matching:
- check [learning_system/TOPIC_INDEX.md](TOPIC_INDEX.md).
- if close match exists, suggest it and ask confirmation.
- else create a new topic path.

## Material Handling Rules

- Raw uploads go in `materials/inbox/` and are not committed.
- User-provided links can be ingested directly without requiring an inbox file.
- After successful processing, move source files to `materials/archive/` (also not committed).
- For URL-based ingest, keep the canonical URL in the processed markdown `Source:` header instead of creating a required archive file.
- Processed markdown goes in `materials/processed/` and is committed.
- Post-ingest maintenance should run automatically after conversions (`scripts/learning_cli.py post-ingest`).

## Session Update Requirements

After each lesson session, update:
- [learning_system/LESSON_INDEX.md](LESSON_INDEX.md)
- [learning_system/PROGRESS_LOG.md](PROGRESS_LOG.md)
- topic lesson file under `topics/<root>/<topic>/lessons/`
- [learning_system/SKILL_GRAPH.md](SKILL_GRAPH.md) when skill status changes
- end-of-session recap file summarizing learned concepts, mistakes/corrections, and next-session targets

## Session Control References

- [learning_system/ADAPTIVE_TEACHING_POLICY.md](ADAPTIVE_TEACHING_POLICY.md)
- [learning_system/SELF_DIRECTED_CONTROLS.md](SELF_DIRECTED_CONTROLS.md)
- [learning_system/IN_DEPTH_MODE.md](IN_DEPTH_MODE.md)
- [learning_system/CLI_HELP.md](CLI_HELP.md)

## Startup Interaction Rule

On startup/help requests:
1. invoke `learning-startup-resume` skill behavior
2. present available actions
3. include recent topics
4. ask if learner wants to resume one

## Lesson Transcript Logging Policy (Default)

For every live tutoring session (math or non-math):
1. create or continue a live chat transcript under the active topic live-chats folder:
- `topics/<root>/<topic>/live-chats/YYYY-MM-DD-live-chat.md`
2. append each entry in this format:
- `---`
- `## Response N`
- `User asked:`
- quoted user prompt
- `Assistant response:`
- assistant reply
3. keep this logging enabled by default, even if the learner is not actively reading the file.
4. use `$...$` or `$$...$$` math delimiters for Obsidian compatibility.
5. if the learner explicitly asks to stop transcript logging, honor that request for the current session.
6. at session close, create/update a recap artifact with:
- what was covered
- what is solid vs needs reinforcement
- mistake tags and corrections
- recommended next steps

## Markdown Color Accessibility Policy (Default)

When using colors in markdown output (equations, spans, callouts, or legends):
1. default to bright/light, high-contrast colors that are readable in dark mode.
2. avoid dark/saturated colors that become hard to read on dark backgrounds.
3. apply this policy to all markdown artifacts, not just textbook-style lessons.
4. if user requests a different palette for a specific file, honor that override.

## Current Known Topics

- `topics/transformers/kv-caching`
- `topics/optimization-for-ml`
- `topics/probabilistic-graphical-models`

## Latest Logged Learning Snapshot

- Use [learning_system/LESSON_INDEX.md](LESSON_INDEX.md) as the source of truth for recency.
- Latest logged live-chat entry: [topics/optimization-for-ml/live-chats/2026-02-26-live-chat-all-topics-cumulative.md](../topics/optimization-for-ml/live-chats/2026-02-26-live-chat-all-topics-cumulative.md)
