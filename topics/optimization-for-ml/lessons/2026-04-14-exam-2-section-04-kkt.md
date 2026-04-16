# 4. KKT Conditions

For a convex differentiable problem

$$
\min_x f(x)
\quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0,
$$

with convex $f, h_i$ and affine $\ell_j$, the KKT conditions are:

Primal feasibility:

$$
h_i(x^*) \le 0,\qquad \ell_j(x^*)=0.
$$

Dual feasibility:

$$
\nu_i^* \ge 0.
$$

Complementary slackness:

$$
\nu_i^* h_i(x^*) = 0.
$$

Stationarity:

$$
\nabla f(x^*)
+
\sum_i \nu_i^* \nabla h_i(x^*)
+
\sum_j u_j^* \nabla \ell_j(x^*)
=
0.
$$

### 4.1 Sufficiency and Necessity

In the convex differentiable case:

- KKT implies primal and dual optimality,
- if strong duality holds, then optimality implies KKT.

Thus KKT becomes an if-and-only-if criterion under strong duality.

### 4.2 Slater's Condition

Slater gives a standard sufficient condition for strong duality in convex problems: strict feasibility of the inequality constraints. Once strong duality is available, KKT becomes necessary and sufficient.

### 4.3 Nonconvex KKT

If the problem is nonconvex, KKT conditions still define stationary candidates, but they no longer certify global optimality. In that case, one must solve the KKT system and then verify separately which candidate is actually optimal.

This is why a nonconvex KKT question often has two parts:

1. solve the KKT equations,
2. decide what those points actually mean.
