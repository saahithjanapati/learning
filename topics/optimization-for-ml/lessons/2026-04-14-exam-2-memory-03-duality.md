# Duality Memory Sheet

Use with [[2026-04-14-exam-2-section-03-duality]].

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

## What To Memorize
- Lagrangian form.
- Dual-function definition.
- Finite iff coefficient of $x$ is zero.
- Dual-feasibility sign: $\nu\ge 0$ for inequality constraints written as $Gx\le h$.

## Likely Exam Traps
- Forgetting the exact sign convention in the Lagrangian.
- Forgetting that the dual function becomes $-\infty$ when the coefficient of $x$ is not zero.
- Getting the final equality constraint in the dual wrong by a sign.
