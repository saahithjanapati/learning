# Session Recap: Quiz 2 Interactive (KKT + Subgradients + Projection)

Date: `2026-02-17`  
Topic Path: `topics/optimization-for-ml`  
Lesson IDs:
- `topics/optimization-for-ml/lessons/2026-02-16-live-chat.md`
- `topics/optimization-for-ml/lessons/2026-02-16-quiz-2-mini-textbook.md`

## Scope Locked For Quiz 2

Covered up to **February 17, 2026** topics:
- GD convergence proof ideas
- Subgradients
- Subgradient method
- Projected (sub)gradient
- Optimality conditions (including KKT)

Explicitly excluded for this quiz scope:
- Stochastic gradient content after February 17

## What We Covered

1. Rebuilt KKT from first principles:
- feasible vs optimal feasible
- stationarity meaning in constrained settings
- primal vs dual feasibility
- complementary slackness logic
- role split between inequality terms `g_i` and equality terms `h_j`

2. Solved one full mixed KKT example end-to-end:
- objective: `f(x,y)=x^2+y^2`
- constraints: `x<=0`, `x+y-1=0`
- solved by case split (`lambda=0` vs `x=0`)
- final valid point: `(x*, y*, lambda*, nu*) = (0, 1, 2, -2)`

3. Subgradient foundations:
- definition and geometric interpretation (supporting lower bound)
- `|x|` subdifferential at 0 is `[-1,1]`
- why valid subgradient step may still increase objective on a single iteration

4. Projection + projected subgradient:
- projection definition `Pi_C(z) = argmin_{u in C} ||u-z||`
- projected update = step then project
- projection is identity when tentative step is already feasible

## What Went Well

- Learner handled micro-check format effectively.
- Major conceptual distinctions stabilized:
  - KKT candidate generation vs global-optimality guarantee
  - inequality-side checks vs equality involvement
  - per-step descent (smooth GD) vs non-monotone steps (subgradient)

## Mistakes And Corrections

1. Mistake:
- Tag: `concept-gap`
- Correction: At active inequality (`g_i(x*)=0`), multiplier can be `lambda_i=0` or `lambda_i>0` (not only `>0`).
- Takeaway: complementary slackness is `lambda_i g_i(x*)=0`, with both edge cases allowed.

2. Mistake:
- Tag: `logic-order`
- Correction: KKT is not complete with inequality checks alone; must also include equality feasibility and stationarity.
- Takeaway: full KKT checklist is required before certifying candidate validity.

3. Mistake:
- Tag: `syntax-slip`
- Correction: Initial Lagrangian was written with gradient vectors instead of scalar functions.
- Takeaway: build scalar Lagrangian first, then differentiate for stationarity.

## Performance Snapshot (Estimated)

- Correct: `28`
- Incorrect: `4`
- Estimated accuracy: `0.88`

## Mastery Snapshot

Likely solid:
- KKT condition names and roles
- `g_i`/`h_j` mapping across KKT conditions
- complementary slackness case logic
- projection and projected-update mechanics

Needs one more pass:
- faster stationarity algebra under time pressure
- multi-constraint active-set case splitting with less scaffolding
- concise verbal definition recall under quiz conditions

## Recommended Next Session

1. Timed KKT drill set (2 mixed problems, hint-first).
2. Short subgradient/projection mixed quiz (yes/no + one worked step).
3. End with one-page formula/condition recall sprint for Quiz 2.

