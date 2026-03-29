---
name: skill-catalog-manager
description: Manage the repository skill catalog itself. Use when the user asks to audit, add, split, merge, or reorganize repo skills and their discoverability boundaries.
---

# Skill Catalog Manager

## When To Use

Use this skill when user asks:
- "audit our skills"
- "create a new skill for X"
- "split this skill into smaller skills"
- "merge these two skills"
- "reorganize our capability skills"

## Workflow

1. Identify capability boundary:
- what behavior should trigger the skill?
- what behavior should stay outside it?

2. Create/update skill files:
- add or modify `skills/<skill-name>/SKILL.md`
- keep trigger description specific
- keep instructions concise and action-oriented
- mark helper-only skills with `visibility: internal`

3. Update registration:
- treat `AGENTS.md` as the canonical public skill registry
- mirror every public skill under `.agents/skills/<skill-name>/`
- maintain only public skill list entries there
- keep file paths accurate
- do not register internal/composite helper skills in `AGENTS.md`
- do not mirror internal/composite helper skills under `.agents/skills/`

4. Validate overlap:
- check for duplicate trigger domains
- if overlap exists, narrow descriptions or merge skills

5. Run catalog audit:
- `python scripts/learning_cli.py audit-skills --write-report`

## Safety Rules

- Do not delete a skill unless replacement is confirmed.
- Preserve behavior coverage during merges/splits.
