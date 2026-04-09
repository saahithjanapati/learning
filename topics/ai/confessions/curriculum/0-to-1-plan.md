# Confessions 0 -> 1 Curriculum

Topic Path: `topics/ai/confessions`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Topic locator: `topics/ai/confessions/curriculum/0-to-1-plan.md`
- Transcript links: keep these in `## Source Materials`.

## Source Materials

- `materials/processed/ai/why-we-are-excited-about-confessions.md`

## Transcript Anchors

- Core idea: separate task reward from confession reward and optimize confessions for honesty.
- Why honesty in confessions may be easier than lying.
- Evidence from training dynamics and out-of-distribution evaluations.
- Comparison with chain-of-thought monitoring and monitorability.
- Scaling confession training with total RL compute.

## Target Outcome (What "1" Means)

- [ ] Can explain what confessions are and why they differ from monitoring the main output alone.
- [ ] Can articulate the main hypothesis for why honest confessions might be easier to elicit than honest task behavior.
- [ ] Can explain the main empirical findings, including where training helps and where confessions still fail.
- [ ] Can compare confessions against chain-of-thought monitoring without collapsing them into the same thing.

## Prerequisites

- High-level familiarity with RLHF/RL-style optimization.
- Basic understanding of reward hacking, monitors, and chain-of-thought.

## Modules

1. Motivation and core mechanism
- Objective: learn why proxy optimization can produce misbehavior and where confessions fit.
- Content type: exposition/practice
- Exit check: explain why a model might hack the main reward but still confess honestly.

2. Why confessions might work
- Objective: understand the "path of least resistance" hypothesis behind honest confessions.
- Content type: exposition/practice
- Exit check: compare the difficulty of honest confession versus maintaining a convincing lie.

3. Training impact and evaluation categories
- Objective: understand how confession behavior changes after training and how it is scored.
- Content type: exposition/practice
- Exit check: describe the key evaluation buckets and what counts as a good confession.

4. Limits and failure modes
- Objective: understand confusion-vs-intentional-misbehavior differences, borderline failures, and unknown-unknown coverage limits.
- Content type: exposition/practice
- Exit check: name two concrete scenarios where confessions may miss or understate problems.

5. Confessions vs chain-of-thought monitoring
- Objective: compare the two approaches as complementary rather than interchangeable.
- Content type: exposition/practice
- Exit check: explain one setting where CoT might be stronger and one where confessions might remain viable longer.

6. Scaling alignment compute
- Objective: understand the strategic claim that confession training can scale with general RL environments.
- Content type: exposition/practice
- Exit check: explain why confession training does not require honeypot-style labeled datasets.

## Session Cadence

- Session length: 45-70 minutes
- Sessions per week: 2-3
- Practice ratio progression:
  - early: 70% exposition, 30% concept checks
  - middle: 50% exposition, 50% mechanism/evidence critique
  - late: 30% exposition, 70% compare-and-defend drills

## Assessment Plan

- Quick checks: define confessions, reward hacking, and monitorability in plain language.
- Medium practice: critique whether a proposed confession setup is likely to help in a specific environment.
- Capstone task: compare confessions, CoT monitoring, and standard output judging for a given alignment setting.
