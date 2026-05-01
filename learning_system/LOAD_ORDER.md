# Context Load Order

For a new assistant instance, load files in this order:

1. [learning_system/STARTUP_CONTEXT.md](STARTUP_CONTEXT.md)
2. `AGENTS.md`
3. [learning_system/REPO_CONTEXT.md](REPO_CONTEXT.md)
4. [learning_system/TOPIC_INDEX.md](TOPIC_INDEX.md)
5. `learning_system/SOURCE_MAP.json`
6. [learning_system/LESSON_INDEX.md](LESSON_INDEX.md)
7. [learning_system/PROGRESS_LOG.md](PROGRESS_LOG.md)
8. [learning_system/SKILL_GRAPH.md](SKILL_GRAPH.md)
9. [learning_system/CLI_HELP.md](CLI_HELP.md)

Registry note:
- `AGENTS.md` is the public skill registry.
- [learning_system/REPO_CONTEXT.md](REPO_CONTEXT.md) is background repo context, not the skill registry.
- `.agents/skills/` contains the native Codex-discoverable public skills.

Then load topic-specific files as needed:
- `topics/<root>/<topic>/README.md`
- `topics/<root>/<topic>/curriculum/*.md`
- `topics/<root>/<topic>/lessons/*.md`
- `topics/<root>/<topic>/live-chats/*.md`
- `topics/<root>/<topic>/practice/*`

For startup UX:
- invoke `learning-startup-resume` from `.agents/skills/learning-startup-resume/SKILL.md`
