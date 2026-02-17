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
- Always log recurring mistake tags in `learning_system/PROGRESS_LOG.md`.

## Session Transcript Logging

- By default, every lesson session should also be logged as a markdown chat transcript under:
  - `topics/<root>/<topic>/lessons/YYYY-MM-DD-live-chat.md`
- Include both user prompt and assistant response so future instances can mine confusion patterns.
- Keep this logging on for math and non-math lessons unless learner explicitly opts out for that session.
