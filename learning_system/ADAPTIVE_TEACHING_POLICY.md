# Adaptive Teaching Policy

This policy controls lesson style as familiarity increases.

## Instruction Modes

1. `bootstrapping`
- Use when topic is new or unstable.
- Mix: ~75% exposition, ~25% practice.
- Problem style: short checks and guided fills.

2. `guided-practice`
- Use when basic concepts are understood.
- Mix: ~45% exposition, ~55% practice.
- Problem style: medium exercises with hint-first review.

3. `independent-practice`
- Use when core concepts are stable.
- Mix: ~20% exposition, ~80% practice.
- Problem style: longer tasks with minimal scaffolding.

## Learner-Directed Overrides

The learner can explicitly select session behavior.

1. If learner says: "I know nothing about this"
- force `bootstrapping` for current session.

2. If learner says: "I want to practice this topic"
- prioritize problems over exposition for current session.

3. If learner specifies style constraints
- honor requested question style, difficulty, and format.
- examples: conceptual, coding, multiple choice, debugging, oral-check.

4. Always keep adaptation state
- even with overrides, log outcomes and update next-session recommendations.

## Promotion Rules

Promote to next mode when both are true over recent sessions:
- Accuracy >= 80%
- Mistakes are mostly implementation slips, not concept gaps

Demote or hold when:
- Accuracy < 60%
- Repeated conceptual errors on the same subtopic

## Mistake Taxonomy

Use one primary tag per missed item:
- `concept-gap`
- `shape-reasoning`
- `api-usage`
- `logic-order`
- `syntax-slip`

## Feedback Style

- Default to hints before exact fixes.
- Escalate to exact fixes only after a learner request.
- Always log recurring mistake tags in [learning_system/PROGRESS_LOG.md](PROGRESS_LOG.md).
- For concrete doubts, incorrect answers, notation confusion, or proof gaps, also log a concept-level evidence item in `learning_system/learner_evidence/EVIDENCE_LOG.jsonl`.
- When delegation is allowed, prefer spawning a worker subagent for the evidence write so the main lesson response does not block on logging.
- The `log-evidence` CLI already refreshes the learner-evidence indexes, so a separate rebuild is usually unnecessary.

## Session Transcript Logging

- By default, every lesson session should also be logged as a markdown chat transcript under:
  - `topics/<root>/<topic>/live-chats/YYYY-MM-DD-live-chat.md`
- Include both user prompt and assistant response so future instances can mine confusion patterns.
- Keep this logging on for math and non-math lessons unless learner explicitly opts out for that session.

## Concept Evidence Logging

- Use exact local timestamps when the learner demonstrates a doubt or error during a live session.
- Tag entries with:
  - topic
  - subtopic
  - one or more concept tags
  - event type (`doubt`, `incorrect-answer`, `notation-confusion`, `proof-gap`, etc.)
  - current review state (`open`, `addressed`, `reinforced`, `stable`)
- Prefer the repo CLI for writes:
  - `python3 scripts/learning_cli.py log-evidence ...`
- Prefer delegating the write to a worker subagent when allowed, and let the main agent continue teaching unless the result is immediately needed.
- `log-evidence` refreshes:
  - `learning_system/learner_evidence/INDEX.md`
  - `learning_system/learner_evidence/by_topic/<topic>.md`

## Session Closeout Recap

At the end of any live lesson/chat session, create a concise recap artifact and index it.

Minimum recap contents:
- topics/sections covered
- what the learner now seems solid on
- what needs more coverage
- mistakes and corrections (with one primary mistake tag each)
- next-session recommended drill order

Minimum index updates:
- add session row to [learning_system/LESSON_INDEX.md](LESSON_INDEX.md)
- append performance row to [learning_system/PROGRESS_LOG.md](PROGRESS_LOG.md)
