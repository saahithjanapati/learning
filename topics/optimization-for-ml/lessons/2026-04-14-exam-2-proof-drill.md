# Exam 2 Proof Drill

Source calibration:

- `materials/processed/optimization-for-ml/submission_393376523.md`
- `materials/processed/optimization-for-ml/HW1_graded_submission.md`
- `materials/processed/optimization-for-ml/HW2_graded_submission.md`
- `materials/processed/optimization-for-ml/HW3_prompt.md`
- `topics/optimization-for-ml/lessons/2026-04-14-exam-2-study-guide-feb19-apr14.md`

## Why This Note Exists

Your old exam says the proof-style section is not mainly failing because the topics are unknown. The recurring issue is:

- wrong setup
- wrong theorem form
- missing inequality justification
- algebraically plausible but structurally invalid proof flow

So this note is about `how to start` and `how to chain` the proof, not just what theorem to memorize.

## Proof Pattern 1: Show A Function Is Convex

There are only a few standard routes. Pick one and commit to it.

## Route A: first-order condition

Use when the function is differentiable and you can compute the gradient cleanly.

Target:

$$
g(y) \ge g(x) + \nabla g(x)^T (y-x).
$$

Template:

1. write the target inequality explicitly
2. expand $g(y) - g(x) - \nabla g(x)^T(y-x)$
3. substitute a known smoothness/convexity inequality for the original function
4. conclude the remainder is nonnegative

When this appears:

- proving $g(x) = \frac{B}{2}\|x\|^2 - f(x)$ is convex from $B$-smoothness of $f$

Common failure:

- writing “want to show convex” and then jumping into Hessians or gradients without identifying the exact inequality you are trying to prove

## Route B: Jensen / two-point definition

Use when the problem is directly about sets, max/min, composition, or epigraphs.

Target:

$$
g(\theta x + (1-\theta)y) \le \theta g(x) + (1-\theta)g(y).
$$

Template:

1. choose arbitrary `x, y` and $\theta$
2. evaluate $g(\theta x + (1-\theta)y)$
3. apply the known convexity fact at the right place
4. conclude the required inequality

Common failure:

- not starting with arbitrary $x,y,\theta$
- using an inequality that goes in the wrong direction

## Route C: Hessian test

Use only when the function is twice differentiable and the Hessian is simple.

Target:

$$
\nabla^2 g(x) \succeq 0 \quad \forall x.
$$

In 2D:

- check principal minors or determinant/sign conditions cleanly
- if asking about concavity, check negative semidefiniteness too

Common failure:

- writing the Hessian but not actually finishing the PSD/NSD condition
- getting convex range but not concave range

## Proof Pattern 2: Derive Or Use A Dual

Template:

1. write the primal cleanly
2. write the Lagrangian with correct signs
3. define the dual function
4. minimize over primal variable carefully
5. split into:
   - finite case
   - $-\infty$ case
6. state the dual constraints exactly

You should literally expect to write sentences like:

`The infimum over x is finite iff ...`

and

$Otherwise, the dual function equals -\infty.$

Common failure:

- solving stationarity informally but never stating the domain of finiteness
- forgetting multiplier sign constraints
- getting the right dual objective but the wrong feasible set

## Proof Pattern 3: Use KKT To Solve And Verify

Template:

1. write primal feasibility
2. write dual feasibility
3. write complementary slackness
4. write stationarity
5. solve case-by-case using active constraints
6. if problem is convex and strong duality holds, say why KKT certifies optimality
7. if nonconvex, explicitly say KKT gives candidate points only, then verify by further argument

Common failure:

- solving stationarity before identifying the active-set structure
- forgetting that nonconvex KKT does not imply global optimality

## Proof Pattern 4: Show Weak Duality For SDP

This is a very high-yield compact proof.

Template:

Start from primal-feasible $X$ and dual-feasible `(y,S)`.

Then:

$$
C \bullet X - y^T b
=
C \bullet X - \sum_i y_i (A_i \bullet X)
=
\left(C-\sum_i y_iA_i\right)\bullet X
=
S \bullet X
\ge 0.
$$

Last line justification:

- $S \succeq 0$
- $X \succeq 0$
- inner product of PSD matrices is nonnegative

Common failure:

- skipping the substitution $b_i = A_i \bullet X$
- giving only the final inequality but not the identity

## Proof Pattern 5: Show Newton Step Is A Descent Direction

Template:

If

$$
\Delta x = -[\nabla^2 f(x)]^{-1}\nabla f(x),
$$

then compute:

$$
\nabla f(x)^T \Delta x
=
-\nabla f(x)^T[\nabla^2 f(x)]^{-1}\nabla f(x).
$$

If the Hessian is positive definite, its inverse is positive definite, so the quadratic form above is strictly negative whenever $\nabla f(x) \ne 0$.

Therefore $\Delta x$ is a descent direction.

Common failure:

- saying “Hessian positive definite implies descent” without computing the inner product that proves it

## Proof Pattern 6: Proximal-Gradient / Gradient-Mapping Proofs

These are often about selecting the right already-known inequality and plugging the prox point into it.

Checklist:

- define the prox point explicitly
- define the gradient mapping explicitly
- separate the smooth part $g$ and nonsmooth part $h$
- use smoothness on $g$
- use convexity/prox optimality on $h$
- combine

If you start mixing all three of these at once, the proof usually goes off the rails.

## Your Exam-Safe Proof Workflow

When you see a proof question:

1. identify the target form before writing algebra
   Is this a Jensen proof, first-order convexity proof, Hessian proof, dual derivation, KKT verification, or theorem application?

2. write the theorem statement you are about to use
   Even one line is enough. This prevents using the wrong version.

3. write one line of setup with the right arbitrary objects
   For convexity proofs: `let x,y and θ be arbitrary`
   For duality: `consider the Lagrangian`
   For KKT: `the KKT conditions are`

4. keep every inequality justified
   Write short tags like:
   - by convexity
   - by smoothness
   - by primal feasibility
   - by complementary slackness
   - because `S,X` are PSD

5. state the conclusion explicitly
   Don’t end on an intermediate line and expect the grader to infer the finish.

## High-Value Proof Drills

These are the four proof drills I would prioritize:

1. prove $g(x)=\frac{B}{2}\|x\|^2-f(x)$ is convex from $B$-smoothness
2. derive the dual of an LP and state exactly when the dual function is finite
3. prove SDP weak duality via the gap identity
4. solve one KKT system and explain why the candidate is or is not truly optimal

## Final Rule

For this course, a proof is usually not graded like research math. It is graded like structured optimization reasoning:

- right theorem
- right setup
- right inequality direction
- right conclusion

That is the standard you should train for.
