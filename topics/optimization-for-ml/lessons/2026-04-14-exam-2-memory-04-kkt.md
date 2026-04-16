# KKT Memory Sheet

Use with [[2026-04-14-exam-2-section-04-kkt]].

## Core KKT System
For
$$
\min_x f(x) \quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0,
$$
with convex $f,h_i$ and affine $\ell_j$:

- Primal feasibility: $h_i(x^*)\le 0$, $\ell_j(x^*)=0$.
- Dual feasibility: $\nu_i^*\ge 0$.
- Complementary slackness: $\nu_i^* h_i(x^*)=0$.
- Stationarity:
$$
\nabla f(x^*)+\sum_i \nu_i^*\nabla h_i(x^*)+\sum_j u_j^*\nabla \ell_j(x^*)=0.
$$

## Sufficiency / Necessity
- In convex differentiable problems with a constraint qualification such as Slater, KKT is necessary and sufficient.
- In nonconvex problems, KKT is only a candidate optimality condition, not sufficient for global optimality.

## Slater
- Slater means there exists a strictly feasible point for the inequality constraints.
- In convex problems, Slater helps guarantee strong duality and KKT necessity.

## Solve-and-Verify Pattern
- Write the Lagrangian.
- Write stationarity.
- Use complementary slackness to split into cases.
- Solve algebraically.
- Check primal and dual feasibility at the end.

## Likely Exam Traps
- Mixing up inequality and equality multipliers.
- Forgetting $\nu_i\ge 0$.
- Misusing complementary slackness: if $h_i(x^*)=0$, then $\nu_i^*$ may be zero or positive.
- Saying KKT always implies global optimality even in nonconvex problems.
