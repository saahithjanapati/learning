# Diff Tool 0 -> 1 Curriculum

Topic Path: `topics/ai/diff-tool`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Topic locator: `topics/ai/diff-tool/curriculum/0-to-1-plan.md`
- Transcript links: keep these in `## Source Materials`.

## Source Materials

- `materials/processed/ai/a-diff-tool-for-ai-finding-behavioral-differences-in-new-models.md`

## Transcript Anchors

- Why traditional benchmark suites miss unknown unknowns.
- Base-vs-finetune diffing versus cross-architecture diffing.
- Dedicated Feature Crosscoder as a shared-plus-model-specific dictionary.
- Steering as validation of causal behavioral control.
- Case studies: CCP alignment, American exceptionalism, and copyright refusal.

## Target Outcome (What "1" Means)

- [ ] Can explain why model diffing is useful for auditing behavioral changes.
- [ ] Can distinguish same-architecture diffing from cross-architecture diffing.
- [ ] Can explain the Dedicated Feature Crosscoder without collapsing it into ordinary representation matching.
- [ ] Can explain how steering validates that a discovered feature actually matters.

## Prerequisites

- Basic familiarity with model auditing and behavioral evaluation.
- High-level understanding of latent features / representations.

## Modules

1. Why diffing matters
- Objective: understand the limits of benchmark-only auditing and the appeal of comparing changes directly.
- Content type: exposition/practice
- Exit check: explain why “find unknown unknowns” is hard without a diff-style method.

2. Cross-architecture diffing intuition
- Objective: build the bilingual-dictionary analogy and why model-specific features matter.
- Content type: exposition/practice
- Exit check: explain why forcing every feature into a shared space can hide novel behavior.

3. Dedicated Feature Crosscoder
- Objective: understand the shared section plus model-exclusive sections design.
- Content type: exposition/practice
- Exit check: describe what the DFC is trying to recover that standard crosscoders miss.

4. Steering and behavioral validation
- Objective: connect identified features to actual output changes.
- Content type: exposition/practice
- Exit check: explain why amplifying/suppressing a feature gives stronger evidence than just observing correlation.

5. Case studies and limits
- Objective: understand the concrete behaviors found and the limitations of high-recall screening.
- Content type: exposition/practice
- Exit check: explain one discovered feature and one reason the method is not a silver bullet.

## Session Cadence

- Session length: 45-70 minutes
- Sessions per week: 2-3
- Practice ratio progression:
  - early: 70% exposition, 30% concept checks
  - middle: 50% exposition, 50% mechanism and case-study analysis
  - late: 30% exposition, 70% critique and transfer questions

## Assessment Plan

- Quick checks: define model diffing, cross-architecture diffing, and steering.
- Medium practice: explain why a discovered feature might deserve closer audit attention.
- Capstone task: critique whether diffing would likely catch a proposed behavioral regression between model versions.
