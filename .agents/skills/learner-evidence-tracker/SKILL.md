---
name: learner-evidence-tracker
description: Log topic-level doubts, incorrect answers, and recurring confusion in a queryable learner-evidence system with timestamps and concept tags.
---

# Learner Evidence Tracker

## Temporary Override

Current repo-local preference:

- Do not use this skill by default right now.
- Do not log learner doubts, mistakes, confusion, or proof gaps unless the user explicitly asks to resume evidence logging or explicitly asks to use this skill.

This override takes precedence over the normal trigger rules below until it is removed.

## When To Use

Use this skill when the learner asks for:
- tracking questions or doubts over time
- logging mistakes for future adaptive practice
- keeping a searchable record of confusion by topic or concept
- a reusable history of incorrect answers or proof gaps

This skill also applies when a live tutoring session reveals:
- a clear doubt
- an incorrect answer
- a repeated notation confusion
- a proof setup gap
- a concept that should influence future question difficulty

## Core Files

- `learning_system/learner_evidence/EVIDENCE_LOG.jsonl`
- `learning_system/learner_evidence/INDEX.md`
- `learning_system/learner_evidence/by_topic/<topic>.md`

## Delegation Default

When subagent delegation is allowed in the current session, prefer spawning a worker subagent to perform evidence writes.

Default pattern:
- main agent continues the teaching / grading / explanation work
- worker subagent runs the evidence write in the background
- do not block on the worker unless the evidence result is immediately needed for the next user-facing step

Use direct local CLI writes only when:
- delegation is unavailable or disallowed in the current turn
- the write is the only task and there is no responsiveness benefit from delegation
- the next critical-path action depends on the finished evidence artifact right away

## Workflow

1. Identify the evidence event:
- topic
- subtopic
- one or more concept tags
- event type
- current review state

2. Record the timestamp:
- use the exact local timestamp when the event is observed
- if backfilling from an older transcript, mark the timestamp precision honestly

3. Prefer delegating the write to a worker subagent.
- hand off:
  - topic / subtopic
  - concept tags
  - event type
  - review state
  - summary
  - learner signal
  - assistant response summary
  - source path / turn
- the worker should run:
  - `python3 scripts/learning_cli.py log-evidence ...`
- `log-evidence` already refreshes the learner-evidence indexes, so an extra `evidence-index` call is usually unnecessary

4. If delegation is not being used, write the evidence entry locally with the CLI:
- `python3 scripts/learning_cli.py log-evidence ...`

5. Keep entries compact and useful:
- short summary of the issue
- optional learner quote/paraphrase
- optional assistant response summary
- source path and turn when available

6. Use the generated indexes later:
- overall summary in `INDEX.md`
- topic-specific evidence in `by_topic/`

## Event-Type Guidance

Prefer one primary event type:
- `doubt`
- `incorrect-answer`
- `partial-answer`
- `notation-confusion`
- `proof-gap`
- `recall-gap`

## Review-State Guidance

Use:
- `open` when the issue is recognized but not yet addressed
- `addressed` when it has been explained once
- `reinforced` when it has been revisited successfully
- `stable` when it no longer looks like a live weakness

## Guardrails

- Do not create vague entries like “seems shaky on optimization.”
- Prefer concept-level tags like `indicator-function`, `conditional-expectation`, or `newton-root-vs-minimization`.
- Do not overwrite old evidence; append new events so recurrence can be measured.
- Keep timestamps honest. If precision is approximate, mark it as backfilled.
