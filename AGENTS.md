<INSTRUCTIONS>
## Skill Registry
A skill is a reusable instruction set stored in `SKILL.md`.
`AGENTS.md` is the canonical public skill registry for this repo.
Only skills listed under `### Public skills` should be treated as discoverable and user-facing.
Skill files may exist under `skills/` for internal composition, but they should not be advertised unless they are listed here.
Public skills are authored under `skills/` and mirrored under `.agents/skills/` for native Codex discovery and `$skill-name` style invocation.

### Public skills
- learning-startup-resume: Startup help menu, recent-topic listing, and resume flow. (file: `skills/learning-startup-resume/SKILL.md`)
- topic-tree-manager: Topic creation, reindexing, reorg reporting, and topic merge workflows. (file: `skills/topic-tree-manager/SKILL.md`)
- materials-to-curriculum: Convert uploaded materials to markdown and build curriculum/lesson plans. (file: `skills/materials-to-curriculum/SKILL.md`)
- adaptive-session-tutor: Learner-directed adaptive tutoring (`learn`/`practice`/`mixed` + in-depth mode). (file: `skills/adaptive-session-tutor/SKILL.md`)
- skill-catalog-manager: Audit, create, split, merge, and reorganize the repo skill catalog itself. (file: `skills/skill-catalog-manager/SKILL.md`)

### Routing rules
- Startup help, recent topics, and resume requests -> `learning-startup-resume`
- Topic creation, reindexing, reorg reports, and topic merges -> `topic-tree-manager`
- Material ingestion, PDF conversion, curriculum building -> `materials-to-curriculum`
- Learn/practice/mixed tutoring sessions and deep dives -> `adaptive-session-tutor`
- Skill audit, skill creation, skill splitting/merging, and catalog cleanup -> `skill-catalog-manager`

### Catalog hygiene
- Every public skill listed here must map to an existing `skills/<name>/SKILL.md`.
- Every public skill listed here must also be mirrored at `.agents/skills/<name>/SKILL.md` for native Codex discovery.
- Do not list internal or composite helper skills here.
- Do not mirror internal or composite helper skills under `.agents/skills/`.
- When skill boundaries change, update this file first, then align supporting docs.
- Trigger when user names a skill or asks for behavior that matches a skill description.
- Read only the required skill files and minimal related context.
- Prefer natural-language skill invocation over asking users to run shell commands.
- For risky operations such as topic merge apply, run a dry-run first and require explicit confirmation.
</INSTRUCTIONS>
