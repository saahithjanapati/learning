# Optimization for ML - February 17, 2026

## Full Lecture Summary: Optimality Conditions, Projection, and LASSO

Source transcript: `materials/processed/optimization-for-ml/Feb17_Optimiality_Conditions.md`

## 1) Core Problem

The lecture studies the constrained optimization problem

$$
\min_{x \in C} f(x).
$$

Main question: how can we characterize a solution $x^*$ using first-order/subgradient information?

## 2) Unconstrained Optimality (No Constraints)

Setup: $C = \mathbb{R}^d$, $\mathrm{dom}(f)=\mathbb{R}^d$.

The lecture states the characterization:

$$
x^* \text{ is optimal } \iff 0 \in \partial f(x^*).
$$

Interpretation:
- if zero is in the subdifferential, then every global affine lower bound at $x^*$ includes the zero slope case, forcing $f(y)\ge f(x^*)$ for all $y$;
- if $x^*$ is globally optimal, then the zero vector satisfies the subgradient inequality.

## 3) Constrained, Differentiable, Convex Case

For convex differentiable $f$ on feasible set $C$:

If

$$
\nabla f(x^*)^\top (y-x^*) \ge 0 \quad \forall y\in C,
$$

then $x^*$ is optimal.

Reason:

$$
f(y)\ge f(x^*) + \nabla f(x^*)^\top (y-x^*) \ge f(x^*), \quad \forall y\in C.
$$

The condition is equivalent to

$$
-\nabla f(x^*)\in N_C(x^*),
$$

where

$$
N_C(x) \doteq \{v : v^\top(y-x)\le 0,\ \forall y\in C\}.
$$

Reverse direction (under line-segment condition, e.g., convex $C$):

$$
x^* \text{ optimal } \Rightarrow \nabla f(x^*)^\top (y-x^*)\ge 0,\ \forall y\in C.
$$

This is proved by contradiction via line search along $x^* + t(y-x^*)$.

## 4) Constrained, Nonsmooth, Convex Case

The key theorem:

$$
x^* \text{ feasible optimal } \iff 0\in \partial f(x^*) + N_C(x^*).
$$

Proof idea from lecture:
- rewrite constrained problem as unconstrained with indicator function

$$
g(x)=f(x)+I_C(x), \quad I_C(x)=\begin{cases}
0 & x\in C \\
\infty & x\notin C
\end{cases}
$$

- unconstrained optimality for $g$ gives $0\in \partial g(x^*)$;
- use $\partial I_C(x)=N_C(x)$ on feasible points.

Direct sufficiency interpretation:
- if $0=u+v$ with $u\in\partial f(x^*)$, $v\in N_C(x^*)$,
- then the subgradient and normal-cone inequalities combine to show $f(y)\ge f(x^*)$ for all $y\in C$.

## 5) Geometric Intuition (Normal Cone)

Condition

$$
-\nabla f(x^*) \in N_C(x^*)
$$

means the negative gradient is "fully blocked" by feasible geometry.

If $-\nabla f(x^*)$ has a feasible tangential component that points into a descent direction, then $x^*$ cannot be optimal.

## 6) Projection Optimality

Problem:

$$
\min_{x\in K} \frac12\|y-x\|_2^2
$$

with $K$ convex and solution $x^*=P_K(y)$.

Lecture lemma:

$$
(y-x^*)^\top (k-x^*) \le 0,\ \forall k\in K.
$$

Interpretation:
- vector from projection to source point is outward normal to feasible set at $x^*$.

Lecture theorem (contraction / non-expansiveness):

$$
\|P_K(a)-P_K(b)\| \le \|a-b\|,\quad \forall a,b.
$$

This property is foundational for projected gradient and projected subgradient analyses.

## 7) LASSO and Soft Thresholding

General LASSO:

$$
\min_{x\in\mathbb{R}^d} \frac12\|y-Ax\|_2^2 + \lambda\|x\|_1.
$$

Special case $A=I$:

$$
\min_{x\in\mathbb{R}^n} \frac12\|y-x\|_2^2 + \lambda\|x\|_1.
$$

Optimality:

$$
0\in -(y-x^*) + \lambda\,\partial\|x^*\|_1
= -(y-x^*) + \lambda\,\mathrm{sign}(x^*),
$$

with coordinate rule

$$
\mathrm{sign}(x_i)=
\begin{cases}
1 & x_i>0\\
[-1,1] & x_i=0\\
-1 & x_i<0
\end{cases}.
$$

Coordinatewise solution (soft-thresholding):

$$
[S_\lambda(y)]_i=
\begin{cases}
y_i-\lambda & y_i>\lambda \\
0 & -\lambda \le y_i\le\lambda \\
y_i+\lambda & y_i<-\lambda
\end{cases},
\quad x^*=S_\lambda(y).
$$

Equivalent compact form:

$$
[S_\lambda(y)]_i=\mathrm{sign}(y_i)\max(|y_i|-\lambda,0).
$$

## 8) General LASSO KKT-style Optimality Certificate

From

$$
0\in -A^\top(b-Ax^*)+\lambda\,\mathrm{sign}(x^*),
$$

coordinatewise:

$$
A_i^\top(b-Ax^*) \in
\begin{cases}
\lambda & x_i^*>0\\
[-\lambda,\lambda] & x_i^*=0\\
-\lambda & x_i^*<0
\end{cases}.
$$

This is a practical certificate for checking if a candidate $x^*$ is optimal, even when no closed form exists.

## 9) Formula Sheet (Feb 17)

$$
x^* \text{ optimal unconstrained } \iff 0\in\partial f(x^*)
$$

$$
x^* \text{ optimal in convex } C \iff 0\in \partial f(x^*)+N_C(x^*)
$$

$$
N_C(x)=\{v:\ v^\top(y-x)\le 0,\ \forall y\in C\}
$$

$$
x^*=P_K(y) \Rightarrow (y-x^*)^\top(k-x^*)\le 0,\ \forall k\in K
$$

$$
\|P_K(a)-P_K(b)\|\le \|a-b\|
$$

$$
x^*=S_\lambda(y),\ [S_\lambda(y)]_i=\mathrm{sign}(y_i)\max(|y_i|-\lambda,0)
$$

## 10) Common Exam/Quiz Traps

- Mixing gradient and subgradient statements: for nonsmooth objectives use $\partial f$.
- Forgetting geometry in constrained optimality: stationarity alone is not enough without feasibility.
- Misusing sign subgradient at zero: $\partial |x_i|$ at $0$ is interval $[-1,1]$, not a single value.
- Confusing certificate vs closed form in general LASSO: coordinate conditions verify optimality but usually do not directly solve for $x^*$.
