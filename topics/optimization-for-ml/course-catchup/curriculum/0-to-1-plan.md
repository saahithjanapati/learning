# Optimization for ML Catch-Up Plan

Path: `topics/optimization-for-ml/course-catchup`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Topic locator: `topics/optimization-for-ml/course-catchup/curriculum/0-to-1-plan.md`
- Transcript links: see source sections in this curriculum.

## Purpose

Bridge from backlog to active-class readiness in about 3 weeks, using the transcribed lecture sequence as the canonical source.

## Source Transcript Sequence

1. `materials/processed/optimization-for-ml/Jan13_Intro.md`
2. `materials/processed/optimization-for-ml/Jan13_Logistics.md`
3. `materials/processed/optimization-for-ml/Jan15_ConvexSets.md`
4. `materials/processed/optimization-for-ml/Jan20_ConvexFunctions.md`
5. `materials/processed/optimization-for-ml/Jan27_matrix_norms.md`
6. `materials/processed/optimization-for-ml/Jan29_GD.md`
7. `materials/processed/optimization-for-ml/Feb5_subgradients.md`
8. `materials/processed/optimization-for-ml/Feb10_subgradient-method.md`
9. `materials/processed/optimization-for-ml/Feb12-projected-subgradient.md`
10. `materials/processed/optimization-for-ml/Feb17_Optimiality_Conditions.md`
11. `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`

## Weekly Plan

1. Week 1: Foundations and convexity
- Session 1: Parse optimization standard form, feasible/infeasible/unbounded cases, explicit vs implicit constraints.
- Session 2: Convex sets and constraint-form subtleties (`<=` vs `>=`, affine equalities).
- Session 3: Convex functions, epigraph, and first-order characterization.
- Deliverable: one-page notation and convexity cheat sheet.

2. Week 2: Linear algebra toolkit and gradient descent
- Session 4: Matrix/vector norms and singular-value intuition from Jan27 transcript.
- Session 5: Derive gradient descent from local linearization and steepest-descent argument.
- Session 6: Step-size behavior (stable vs diverging trajectories) and convergence assumptions.
- Deliverable: solved derivation set plus a GD debug checklist.

3. Week 3: Non-smooth and constrained optimization
- Session 7: Subgradient definition, subdifferential, and why updates are not always descent steps.
- Session 8: Subgradient method details and best-iterate tracking.
- Session 9: Projection operators and projected subgradient updates for constrained problems.
- Deliverable: method-selection worksheet (GD vs subgradient vs projected subgradient).

## Session Format

- Start (10-15 min): recap previous transcript concepts in plain language.
- Core (35-45 min): tutor exposition tied to specific lecture content.
- Practice (20-30 min): guided problems first, then independent drills.
- Close (10 min): error log and next-session readiness check.

## Assessment Gates

- Gate A: Correctly restate convex optimization setup and constraints.
- Gate B: Prove basic convex set/function facts from definitions.
- Gate C: Derive and diagnose gradient descent behavior under step-size changes.
- Gate D: Execute projected subgradient updates and justify method choice.

## Outputs to Track

- Weekly error log (conceptual mistakes + corrected reasoning).
- Formula sheet that grows with each session.
- Readiness score (0-3) per module: notation, convexity, GD, non-smooth/constrained.
