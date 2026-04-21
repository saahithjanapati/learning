# Duality Memory Sheet

Use with [[2026-04-14-exam-2-section-03-duality]].

## Table of Contents

- [[#Core Template]]
- [[#Crucial Finiteness Condition]]
- [[#Dual Problem]]
- [[#Weak Duality]]
- [[#Strong Duality Slater and Saddle Points]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]


## Core Template
- Primal:
$$
\min_x c^T x \quad \text{s.t. } Ax=b,\; Gx\le h.
$$
- Lagrangian:
$$
L(x,u,\nu)=c^Tx+u^T(Ax-b)+\nu^T(Gx-h),\qquad \nu\ge 0.
$$
- Dual function: $g(u,\nu)=\inf_x L(x,u,\nu)$.

## Crucial Finiteness Condition
- Expand $L$ as
$$
L(x,u,\nu)=(c+A^Tu+G^T\nu)^Tx-b^Tu-h^T\nu.
$$
- The infimum over $x$ is finite iff
$$
c+A^Tu+G^T\nu=0.
$$
- Under that condition,
$$
g(u,\nu)=-b^Tu-h^T\nu.
$$
- Otherwise $g(u,\nu)=-\infty$.

## Dual Problem
$$
\max_{u,\nu} -b^Tu-h^T\nu
\quad \text{s.t. } A^Tu+G^T\nu+c=0,\; \nu\ge 0.
$$

## Weak Duality
- For primal-feasible $x$ and dual-feasible $(u,\nu)$,
$$
g(u,\nu)\le f(x).
$$
- Dual objective gives a lower bound on the primal objective.

## Strong Duality Slater and Saddle Points
- In convex problems, Slater means strict feasibility of the inequality constraints.
- Slater is the standard sufficient condition you should remember for strong duality in this course.
- Strong duality means the best lower bound from the dual is tight:
$$
p^* = d^*.
$$
- Saddle-point picture:
$$
L(x^*,u,\nu)\le L(x^*,u^*,\nu^*)\le L(x,u^*,\nu^*)
$$
for feasible dual variables and primal variables in the convex strong-duality setting.
- Conceptually:
  - the primal variable minimizes the Lagrangian at the optimal multipliers
  - the dual variables maximize the Lagrangian at the optimal primal point
- This is the bridge from duality to KKT.

## What To Memorize
- Lagrangian form.
- Dual-function definition.
- Finite iff coefficient of $x$ is zero.
- Dual-feasibility sign: $\nu\ge 0$ for inequality constraints written as $Gx\le h$.
- Weak duality gives lower bounds.
- Strong duality plus regularity gives the KKT picture.

## Likely Exam Traps
- Forgetting the exact sign convention in the Lagrangian.
- Forgetting that the dual function becomes $-\infty$ when the coefficient of $x$ is not zero.
- Getting the final equality constraint in the dual wrong by a sign.
- Forgetting what Slater is actually checking.
- Treating saddle-point language as decoration instead of the structural picture behind KKT.
