# Gradient-Descent Proof Hub

This note is the central index for the gradient-descent-family proofs that matter most for your convex optimization review.

The goal is not just to list theorem statements. The goal is to separate:

- full proofs that your notes and lecture materials actually support line-by-line
- proof roadmaps for accelerated methods where the repo contains the rates, the update rules, and the structural ideas, but not the entire lecture derivation

## How to use this set

- If you want the most foundational proofs first, read the three plain-GD pages in order.
- If you are studying later-unit exam material, prioritize SGD, proximal gradient, Polyak momentum, and NAG.
- If you are blanking on a step in a proof, each page has a `Main trick` section and a `Common traps` section.
- If the full proofs feel too dense, start with [[2026-04-20-sgd-prox-proof-structures]]. That note turns the SGD and proximal-gradient proofs into repeatable exam scripts.

## Core GD proofs

- [[2026-04-20-proof-gd-descent-lemma]]
- [[2026-04-20-proof-gd-smooth-convex-rate]]
- [[2026-04-20-proof-gd-strongly-convex-linear-rate]]

These are the baseline proofs. A lot of later arguments are just variants of these with one new ingredient added.

## SGD proofs

- [[2026-04-20-proof-sgd-convex-nonsmooth-rate]]
- [[2026-04-20-proof-sgd-strongly-convex-recursions]]

These are the stochastic versions of the distance-recursion idea. The main new issue is that variance prevents exact linear convergence in the usual fixed-step setting.

## Proximal-gradient proofs

- [[2026-04-20-proof-prox-fixed-points-and-stationarity]]
- [[2026-04-20-proof-prox-descent-lemma]]
- [[2026-04-20-proof-prox-convergence-rates]]

These are the most exam-relevant composite-optimization proofs. The key structural move is always:

- smoothness handles the $g$ part
- convexity plus prox optimality handles the $h$ part

## Momentum and acceleration

- [[2026-04-20-proof-polyak-momentum-quadratic]]
- [[2026-04-20-proof-nag-roadmaps]]

These are intentionally split from the earlier pages because the repo material supports them differently:

- Polyak / heavy-ball: concrete HW4-style matrix proof on a quadratic
- NAG: theorem statements, update comparison, and proof roadmap rather than a fully expanded estimate-sequence proof

## Recommended order if you want the cleanest build-up

1. [[2026-04-20-proof-gd-descent-lemma]]
2. [[2026-04-20-proof-gd-smooth-convex-rate]]
3. [[2026-04-20-proof-gd-strongly-convex-linear-rate]]
4. [[2026-04-20-proof-sgd-convex-nonsmooth-rate]]
5. [[2026-04-20-proof-sgd-strongly-convex-recursions]]
6. [[2026-04-20-proof-prox-fixed-points-and-stationarity]]
7. [[2026-04-20-proof-prox-descent-lemma]]
8. [[2026-04-20-proof-prox-convergence-rates]]
9. [[2026-04-20-proof-polyak-momentum-quadratic]]
10. [[2026-04-20-proof-nag-roadmaps]]

## Main source notes used

- [[2026-04-14-convex-optimization-basics-for-proofs]]
- [[2026-04-14-exam-2-section-01-sgd]]
- [[2026-04-14-exam-2-section-02-proximal-gradient]]
- [[2026-04-14-exam-2-section-08-momentum-nag]]
- [[2026-04-14-exam-2-section-11-proof-toolkit]]
- [[2026-04-19-exam-2-key-properties-identities]]
- [[2026-04-19-hw3-hw4-topic-summary]]

## Processed lecture / homework sources used

- `materials/processed/optimization-for-ml/Jan29_GD.md`
- `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`
- `materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md`
- `materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md`
- `materials/processed/optimization-for-ml/S26_10_725_HW4_student_3__1___1_.md`
