# Optimization for ML - February 17, 2026

## Expository Deep Dive: Optimality Conditions, Normal Cones, and LASSO Geometry

Source transcript: `materials/processed/optimization-for-ml/Feb17_Optimiality_Conditions.md`

## How to read this lesson

This is the "what does optimal mean" lecture. Earlier lectures gave algorithms; this lecture gives exact certificates for optimality.

## 1) Unconstrained optimality in one line

For unconstrained convex minimization:

$$
x^* \text{ optimal} \iff 0\in\partial f(x^*).
$$

Smooth case reduces to familiar $\nabla f(x^*)=0$.

## 2) Constrained differentiable case

For convex differentiable $f$ over feasible set $C$:

$$
\nabla f(x^*)^\top(y-x^*)\ge0\ \forall y\in C.
$$

Equivalent cone form:

$$
-\nabla f(x^*)\in N_C(x^*),
$$

where

$$
N_C(x)=\{v: v^\top(y-x)\le0,\ \forall y\in C\}.
$$

Interpretation: the descent direction is blocked by feasible geometry.

## 3) Constrained nonsmooth master condition

When $f$ may be nonsmooth:

$$
x^*\text{ optimal} \iff 0\in\partial f(x^*)+N_C(x^*).
$$

Proof idea from lecture:

- convert constrained problem to unconstrained by adding indicator $I_C$
- apply unconstrained subgradient optimality
- use identity $\partial I_C(x)=N_C(x)$ on feasible points

This is one of the most important formulas in the whole course.

## 4) Projection geometry result

For projection onto convex set $K$:

$$
x^*=P_K(y)=\arg\min_{x\in K}\frac12\|y-x\|^2,
$$

you get

$$
(y-x^*)^\top(k-x^*)\le0,\ \forall k\in K,
$$

and non-expansiveness

$$
\|P_K(a)-P_K(b)\|\le\|a-b\|.
$$

These geometric facts power projected algorithm proofs.

## 5) LASSO special case and soft thresholding

For

$$
\min_x \frac12\|y-x\|^2+\lambda\|x\|_1,
$$

optimality gives

$$
0\in -(y-x^*)+\lambda\,\operatorname{sign}(x^*).
$$

Coordinatewise solution becomes soft-thresholding:

$$
[S_\lambda(y)]_i=\operatorname{sign}(y_i)\max(|y_i|-\lambda,0),
\quad x^*=S_\lambda(y).
$$

This is a clean example where subgradient optimality yields closed form.

## 6) General LASSO optimality certificate

For

$$
\min_x \frac12\|b-Ax\|^2+\lambda\|x\|_1,
$$

condition is

$$
0\in -A^\top(b-Ax^*)+\lambda\,\operatorname{sign}(x^*).
$$

Coordinatewise inclusion gives a practical "is this point optimal" check.

## 7) KKT bridge

This lecture is the doorway into KKT language:

- primal feasibility
- dual feasibility
- complementary slackness
- stationarity

Careful edge case: if an inequality is active ($g_i(x^*)=0$), multiplier may be zero or positive.

## Checkpoint

You should be able to state from memory:

- unconstrained condition $0\in\partial f(x^*)$
- constrained condition $0\in\partial f(x^*)+N_C(x^*)$
- soft-threshold formula

## Common mistakes

- dropping normal-cone term in constrained settings
- treating sign at zero as a single value
- confusing certificate conditions with explicit solution formulas

## One-paragraph recap

Feb 17 translates geometry into exact optimality statements. It is the conceptual target that optimization algorithms are trying to satisfy or approximate.
