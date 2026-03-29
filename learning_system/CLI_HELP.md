# Learning Skill Help

`AGENTS.md` is the canonical public skill registry for discoverable skills.
If a skill is not listed there, treat it as internal-only.

## Quick Start

Ask:
- "show startup menu"
- "what can I do here?"
- "show recent topics and ask me what to resume"

This prints:
- intro message,
- available actions,
- most recently reviewed topics,
- resume prompt.

## Skill Mapping

- startup + resume -> `learning-startup-resume`
- topic creation/merge/reindex/reorg -> `topic-tree-manager`
- materials to markdown/curriculum -> `materials-to-curriculum`
- session generation/adaptation -> `adaptive-session-tutor`
- skill audit/create/split/merge -> `skill-catalog-manager`

## Natural-Language Commands

1. Show help/start options
- "show startup help"
- "show options"

2. Show startup intro + recent topics
- "show startup intro and recent topics"

3. List recent reviewed topics
- "list my recent topics"

4. Rebuild topic index and skill tree
- "reindex topics and regenerate the skill tree"

5. Regenerate source trace map
- "regenerate the source map"

6. Run post-ingest maintenance
- "run post-ingest maintenance"
- "sync processed materials"

7. Generate reorganization report
- "generate a topic reorganization report"

8. Create a new hierarchical topic
- "create a topic transformers/attention/rope"

9. Merge topics (dry-run first)
- "dry-run merge transformers/rope into transformers/attention/rope"
- then: "apply that merge"

10. Start markdown live chat mode (math-friendly)
- "start markdown live chat for this topic"
- "switch this session to markdown chat mode"
- "log this chat in a lesson markdown file"

11. Clarify default lesson transcript logging
- "is lesson chat logging on by default?"
- "stop transcript logging for this session"
- "resume transcript logging"

12. Audit the skill catalog
- "audit the repo skills"
- "check whether our skills are registered correctly"

## Internal Note

The assistant may use `scripts/learning_cli.py` internally, but the user should not need to run scripts manually.
