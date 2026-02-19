# Quiz 2 Gap Audit (Through Feb 17)

Date: `2026-02-17` (local)
Topic: `topics/optimization-for-ml`

## Sources Reviewed

- Class transcripts:
  - `materials/processed/optimization-for-ml/Jan29_GD.md`
  - `materials/processed/optimization-for-ml/Feb5_subgradients.md`
  - `materials/processed/optimization-for-ml/Feb10_subgradient-method.md`
  - `materials/processed/optimization-for-ml/Feb12-projected-subgradient.md`
- Current lesson artifacts:
  - `topics/optimization-for-ml/lessons/2026-02-15-quiz-2-core-concepts.md`
  - `topics/optimization-for-ml/lessons/2026-02-16-quiz-2-mini-textbook.md`
  - `topics/optimization-for-ml/lessons/2026-02-17-quiz-2-problem-set-01.md`
  - `topics/optimization-for-ml/lessons/2026-02-17-live-chat-02-review.md`

## What Looks Solid

- $L$-smoothness inequality and safe step-size range ($0 < \eta < 2/L$, with common conservative $\eta \le 1/L$).
- Condition number intuition: $\kappa=L/\mu$ and why larger $L$ / smaller $\mu$ hurts speed.
- Function-Lipschitz vs $L$-smooth distinction.
- Subgradient definition and key examples ($|x|$, max-of-affines active branch rule).
- Projected (sub)gradient mechanics and one-step projection computations.
- KKT condition names and mapping (`primal`, `dual`, `slackness`, `stationarity`).
- Active vs inactive inequality logic for multipliers.
- Full KKT solves with case splits (including active-boundary solution pattern).

## Holes To Patch Before Quiz

1. Rate recall under pressure:
- Occasional swap between $O(1/T)$ (smooth convex GD) and $O(1/\sqrt{T})$ (non-smooth subgradient).

2. Precision with smoothness language:
- "non-smooth" (class usage) vs strict "not $L$-smooth" can blur.
- Keep method-selection rule explicit to avoid overthinking during quiz.

3. Subgradient-method proof assumptions:
- Need crisp recall that rate statements rely on convex + Lipschitz (bounded subgradient) assumptions.
- This appears in `Feb10_subgradient-method.md` but is less automatic yet.

4. Projection proof fact (not just algorithm step):
- Projection optimality/obtuse-angle inequality is in lecture notes, but not yet deeply drilled.

5. Speed in KKT algebra:
- Concepts are good, but stationarity/algebra can still be slower than ideal under time pressure.

## Coverage Gaps In Uploaded Source Materials

- For quiz schedule, there is no separately ingested `Feb3` or `Feb17` transcript file in `materials/processed/optimization-for-ml/`.
- You still have good coverage via:
  - `Jan29_GD.md` for smooth GD proofs/rates,
  - live textbook + interactive KKT sessions for optimality/KKT.
- If official Feb3/Feb17 files exist, ingesting them would tighten lecture alignment.

## Recommended Final Prep Order (Short)

1. 8-minute formula/rate recall sprint:
- smoothness inequality, strong-convexity inequality, key rates, optimality conditions.

2. 2 timed KKT case-split problems:
- one with active inequality ($\lambda>0$), one with inactive inequality ($\lambda=0$).

3. 1 projection-proof checkpoint:
- state projection definition and the core projection optimality inequality in words.

4. 1 mixed mini-drill (6 questions):
- one from each topic bucket (GD, rates, subgradient, projected method, KKT, interpretation).
