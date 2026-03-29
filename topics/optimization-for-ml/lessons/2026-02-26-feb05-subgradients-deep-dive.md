# Optimization for ML - February 5, 2026

## Expository Deep Dive: Subgradients and Nonsmooth Convex Analysis

Source transcript: `materials/processed/optimization-for-ml/Feb5_subgradients.md`

## How to read this lesson

This is the bridge from smooth calculus to nonsmooth optimization. Read it as "what replaces gradient when gradient does not exist."

## 1) Why gradients are not enough

Gradient descent assumes differentiability. But many important convex ML objectives are nonsmooth (absolute value, l1 norm, max-type objectives).

So we need a first-order object that survives at kinks.

## 2) Subgradient definition as a global lower bound

For convex $f$, a vector $g_x$ is a subgradient at $x$ if

$$
f(y)\ge f(x)+g_x^\top(y-x),\quad \forall y.
$$

The key word is global. This is not a local slope estimate; it is a global supporting-hyperplane statement.

Subdifferential is the set of all such vectors:

$$
\partial f(x)=\{g: g \text{ satisfies the inequality at } x\}.
$$

## 3) Relation to ordinary gradient

If $f$ is differentiable at $x$, then

$$
\partial f(x)=\{\nabla f(x)\}.
$$

So gradient is a special singleton case of subdifferential.

## 4) Core examples you should know cold

### Absolute value

$$
\partial |x| =
\begin{cases}
\{1\}, & x>0\\
[-1,1], & x=0\\
\{-1\}, & x<0
\end{cases}
$$

### l1 norm

Coordinate wise extension of absolute-value rule.

### l2 norm

$$
\partial \|x\|_2 =
\begin{cases}
\left\{\frac{x}{\|x\|_2}\right\}, & x\ne0\\
\{z:\|z\|_2\le1\}, & x=0
\end{cases}
$$

These three patterns appear constantly in optimization and regularization.

## 5) Normal cone connection

Normal cone at $x\in C$:

$$
N_C(x)=\{g: g^\top(y-x)\le0,\ \forall y\in C\}.
$$

A central result proved in lecture:

$$
\partial I_C(x)=N_C(x),\quad x\in C,
$$

where $I_C$ is the indicator function of set $C$.

This is the exact algebraic bridge between constraints and subgradients.

## 6) Max-function subgradient logic

For

$$
f(x)=\max_i f_i(x),
$$

active functions determine subgradients:

$$
\partial f(x)=\operatorname{conv}\left(\bigcup_{i\in I(x)}\partial f_i(x)\right),
\quad I(x)=\arg\max_i f_i(x).
$$

Interpretation: at a tie, you can take convex combinations of active slopes.

## 7) Subgradient calculus rules

The lecture gives practical rules:

- scaling ($a>0$): $\partial(af)=a\partial f$
- addition: $\partial(f_1+f_2)=\partial f_1+\partial f_2$
- affine composition: if $g(x)=f(Ax+b)$,
  $$
  \partial g(x)=A^\top\partial f(Ax+b)
  $$

These rules let you derive subgradients instead of re-proving from definition each time.

## 8) Why this lecture matters for what comes next

Without this lecture:

- Feb 10 subgradient method has no valid update direction
- Feb 12 projected subgradient has no nonsmooth first-order term
- Feb 17 optimality conditions cannot be written for nonsmooth problems

## Checkpoint

Make sure you can do these quickly:

- compute $\partial |x|$ at $x=0$
- compute coordinatewise subgradient set for $\|x\|_1$
- explain why subgradient is global, gradient is local
- identify active branches for a max function at a given point

## Common mistakes

- choosing one subgradient at nondifferentiable points and forgetting the whole set
- missing active-set condition in max-of-functions
- treating subgradient like derivative approximation rather than supporting hyperplane

## One-paragraph recap

Feb 5 gives the nonsmooth first-order language. Once you internalize subgradient sets and rules, nonsmooth convex optimization becomes as systematic as smooth optimization.
