<INSTRUCTIONS>
## Skill Registry
A skill is a reusable instruction set stored in `SKILL.md`.
`AGENTS.md` is the canonical public skill registry for this repo.
Only skills listed under `### Public skills` should be treated as discoverable and user-facing.
Public skill files live under `.agents/skills/` for native Codex discovery and `$skill-name` style invocation.
Skill files may still exist under `skills/` for internal composition, but they should not be advertised unless they are listed here.

### Public skills
- learning-startup-resume: Startup help menu, recent-topic listing, and resume flow. (file: `.agents/skills/learning-startup-resume/SKILL.md`)
- topic-tree-manager: Topic creation, reindexing, reorg reporting, and topic merge workflows. (file: `.agents/skills/topic-tree-manager/SKILL.md`)
- materials-to-curriculum: Convert uploaded materials or provided links to markdown and build curriculum/lesson plans. (file: `.agents/skills/materials-to-curriculum/SKILL.md`)
- adaptive-session-tutor: Learner-directed adaptive tutoring (`learn`/`practice`/`mixed` + in-depth mode). (file: `.agents/skills/adaptive-session-tutor/SKILL.md`)
- markdown-live-chat: Create or continue lesson live-chat transcripts and mirror the actual conversation into a markdown file. (file: `.agents/skills/markdown-live-chat/SKILL.md`)
- learner-evidence-tracker: Log topic-level doubts, incorrect answers, and recurring confusion in a queryable learner-evidence system with timestamps and concept tags. (file: `.agents/skills/learner-evidence-tracker/SKILL.md`)
- skill-catalog-manager: Audit, create, split, merge, and reorganize the repo skill catalog itself. (file: `.agents/skills/skill-catalog-manager/SKILL.md`)
- openai-image-generator: Generate images with OpenAI's `gpt-image-2` API and optionally embed local-only outputs into markdown notes. (file: `.agents/skills/openai-image-generator/SKILL.md`)

### Routing rules
- Startup help, recent topics, and resume requests -> `learning-startup-resume`
- Topic creation, reindexing, reorg reports, and topic merges -> `topic-tree-manager`
- Material ingestion, PDF conversion, website/article link scraping, and curriculum building -> `materials-to-curriculum`
- Learn/practice/mixed tutoring sessions and deep dives -> `adaptive-session-tutor`
- Live chat transcript creation/continuation, markdown chat requests, or requests to mirror chat contents into an `.md` file -> `markdown-live-chat`
- Tracking learner doubts, logging mistakes over time, or building reusable evidence for future adaptation -> `learner-evidence-tracker`
- Skill audit, skill creation, skill splitting/merging, and catalog cleanup -> `skill-catalog-manager`
- OpenAI image generation, local-only note illustration, or markdown image embeds backed by OpenAI-generated assets -> `openai-image-generator`

### Catalog hygiene
- Every public skill listed here must map to an existing `.agents/skills/<name>/SKILL.md`.
- Do not list internal or composite helper skills here.
- Keep internal or composite helper skills out of `.agents/skills/`.
- When skill boundaries change, update this file first, then align supporting docs.
- Trigger when user names a skill or asks for behavior that matches a skill description.
- Read only the required skill files and minimal related context.
- Prefer natural-language skill invocation over asking users to run shell commands.
- For risky operations such as topic merge apply, run a dry-run first and require explicit confirmation.
</INSTRUCTIONS>
