# PGM Assessment Topic Map

This note is now the hub for the PGM assessment maps.

## Jump To A Map

- [[2026-04-24-pgm-assessment-map-question-to-topic|Question -> Topic Map]]
- [[2026-04-24-pgm-assessment-map-difficulty-to-questions|Difficulty -> Question Map]]
- [[2026-04-24-pgm-assessment-map-topic-to-assessments|Topic -> Assessment Reverse Map]]

## What These Sheets Cover

- written homeworks
- visible homework programming problems
- Midterm 1
- the processed `Practice_Exam_Solutions`

The main purpose is to help you move through the assessment material in three different ways:

- `question -> topic`: useful when you are reading one assessment source front to back
- `difficulty -> questions`: useful when you want a triaged practice queue
- `topic -> assessments`: useful when you want to see where an idea repeats

## Notes On Scope

- I included the written homeworks, the visible homework programming problems, Midterm 1, and the processed `Practice_Exam_Solutions`.
- The processed `HW2_graded_submission.md` has some numbering/OCR drift. I preserved the clearly visible problem blocks from the processed source, including the late-file GNN oversmoothing problem that appears there as `Q9`.
- Difficulty is approximate and meant in the sense of `how hard this is likely to feel under exam pressure`, not `how many points it was worth`.

## Difficulty Scale

- `Easy`: mostly direct application of a definition, graph rule, or one standard identity
- `Medium`: short derivation or several linked reasoning steps
- `Hard`: proof, algorithm design, many-step derivation, or a problem that mixes multiple ideas

## High-Frequency Topics

- `Directed vs undirected structure reasoning` shows up repeatedly in `HW1`, `Midterm 1`, and `Practice Final Problem 1`.
- `Exact inference / message passing / treewidth-style reasoning` is concentrated in `HW1`, but still matters later through `tree decomposition`, `loopy BP`, and `GNN message passing`.
- `MCMC and Markov-chain properties` are extremely high-yield: they dominate `HW2`, much of `Midterm 1`, and several `Practice Final` short questions.
- `Variational inference` shows up most heavily in `HW3` and the `Practice Final`, especially `KL direction`, `mean field`, `CAVI`, and `REINFORCE vs reparameterization`.
- `Beyond-likelihood generative modeling` is concentrated in `HW4` and the `Practice Final`: `score matching`, `NCE`, `GAN/WGAN`, `Wasserstein`, and `diffusion`.
- `Causality` and `diffusion` appear most clearly in the `Practice Final`, which suggests they were important late-course review targets even if they were lighter in earlier assessments.

## How To Use The Split Sheets

- Start with [[2026-04-24-pgm-assessment-map-difficulty-to-questions|Difficulty -> Question Map]] if you want to choose practice based on how overwhelmed or time-constrained you are.
- Use [[2026-04-24-pgm-assessment-map-question-to-topic|Question -> Topic Map]] if you are reviewing one source at a time and want to understand what each question was really testing.
- Use [[2026-04-24-pgm-assessment-map-topic-to-assessments|Topic -> Assessment Reverse Map]] if you want to see how often a topic came back and where to find repeated coverage.

## What This Suggests About Exam Prep

- If you are weak on `graph structure reasoning`, do `HW1-Q1/Q2/Q4/Q5`, `M1-Q1/Q2`, and `PF-P1`.
- If you are weak on `MCMC`, the densest cluster is `HW2`, then `M1-Q3-Q10`, then `PF-SQ5/SQ6`.
- If you are weak on `VI`, the most important sources are `HW3-Q1/Q4/Q5` plus `PF-SQ1/SQ4/SQ6/SQ9`.
- If you are weak on `beyond-likelihood generative modeling`, focus on `HW4-Q1/Q2`, `PF-SQ3/SQ8/SQ12/SQ13/SQ14`, and `PF-P4/P5`.
- If you want the most final-like late-course conceptual review, the `Practice Final` is the best single source because it touches `VI`, `MCMC`, `GANs`, `score matching`, `diffusion`, `causality`, and `GNNs` in one place.
