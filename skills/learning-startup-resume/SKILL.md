---
name: learning-startup-resume
description: Startup and navigation skill for this learning repo. Use only for help-style onboarding, recent topics, and resume requests; do not use it for topic mutations or skill-catalog edits.
---

# Learning Startup Resume

## When To Use

Use this skill when user asks:
- "where do I start?"
- "show me options"
- "help menu"
- "what did we do recently?"
- "resume a topic"

Do not use this skill for:
- topic creation or merges
- reindex/reorg maintenance
- skill catalog reorganization

## Workflow

1. Run startup summary internally:
- `python scripts/learning_cli.py start --limit 5`

2. If user wants only recent topics:
- `python scripts/learning_cli.py recent-topics --limit <N>`

3. Ask resume question:
- "Do you want to resume one of these?"

4. If user picks a topic:
- load topic context from:
  - `topics/<root>/<topic>/README.md`
  - latest file in `topics/<root>/<topic>/lessons/`
  - `learning_system/PROGRESS_LOG.md`
