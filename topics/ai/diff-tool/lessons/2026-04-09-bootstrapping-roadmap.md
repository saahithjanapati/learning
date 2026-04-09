# Lesson Plan

Date: `2026-04-09`  
Topic Path: `topics/ai/diff-tool`  
Mode: `bootstrapping`
Learner Intent: `learn`
Question Style: `conceptual`
Difficulty: `medium`

## Inputs

- Source materials: `materials/processed/ai/a-diff-tool-for-ai-finding-behavioral-differences-in-new-models.md`
- Prior session summary: none
- Recent mistake tags: none
- In-depth mode requested?: no
- History loaded from: `learning_system/LESSON_INDEX.md`

## Session Objectives

1. Understand why diff-style auditing can surface unknown behavioral changes.
2. Learn the DFC mechanism at the level of intuition and audit utility.
3. Connect identified features to steering-based causal validation.

## Allocation

- Exposition: 30 minutes
- Guided examples: 20 minutes
- Practice problems: 15 minutes
- One-at-a-time or batch: one-at-a-time

## Problem Set

1. Explain why benchmark suites alone miss some model changes.
- Skill tested: audit framing
- Expected difficulty: medium

2. Explain the “bilingual dictionary” analogy for cross-architecture diffing.
- Skill tested: mechanism intuition
- Expected difficulty: medium

3. Explain why steering matters after the diff tool flags a feature.
- Skill tested: causal validation
- Expected difficulty: medium-hard

## Hint Policy

- First hint: ask what changed and what stayed the same between two models.
- Second hint: separate “feature found” from “feature shown to matter.”
- Full solution trigger: after two stalled attempts or if the answer treats diffing as direct proof of harmful behavior.

## Success Criteria

- [ ] Conceptual explanation quality
- [ ] Accuracy threshold
- [ ] Independence level

## Roadmap

1. Start with the benchmark-vs-diffing motivation.
2. Build the cross-architecture analogy and DFC design.
3. Walk through steering as validation.
4. Review the concrete case studies.
5. Close with limitations and realistic auditor use.
