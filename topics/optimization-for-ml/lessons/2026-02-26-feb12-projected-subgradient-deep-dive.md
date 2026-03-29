# Optimization for ML - February 12, 2026

## Expository Deep Dive: Projected Subgradient for Constrained Convex Problems

Source transcript: `materials/processed/optimization-for-ml/Feb12-projected-subgradient.md`

## How to read this lesson

This lecture combines two ideas you already know: subgradient steps and Euclidean projection. The core question is whether adding projection preserves convergence guarantees.

## 1) Problem setup

We now solve

$$
\min_{x\in C} f(x)
$$

with convex $f$ and convex feasible set $C$.

A naive unconstrained step can leave $C$, so feasibility must be enforced each iteration.

## 2) Algorithm structure

Projected subgradient update has two phases:

1. tentative move
   $$
   y^{t+1}=x^t-\eta_t g_{x^t},\quad g_{x^t}\in\partial f(x^t)
   $$
2. feasibility correction
   $$
   x^{t+1}=P_C(y^{t+1})=\arg\min_{x\in C}\frac12\|x-y^{t+1}\|^2
   $$

Think of it as "optimize then repair feasibility."

## 3) Why projection choice matters

The lecture lists classes where projection is easy (orthant, affine sets, norm balls) and warns that some seemingly simple sets can have expensive projection maps.

So algorithmic practicality depends on both objective and projection oracle.

## 4) Concrete example: nonnegative least squares

For $x\ge0$, projection is elementwise clipping:

$$
P_{\mathbb R_+^n}(y)=\max\{0,y\}.
$$

This gives a very clean projected-GD implementation.

## 5) Main guarantee

For convex $f$, $G$-Lipschitz, arbitrary step sizes:

$$
f(x^{\text{best}})-f(x^*)
\le
\frac{\|x^0-x^*\|^2+G^2\sum_{t=0}^{k-1}\eta_t^2}
{2\sum_{t=0}^{k-1}\eta_t}.
$$

This is the same form as the unconstrained subgradient bound.

## 6) The proof obstacle and the fix

Obstacle in the proof:

- after the tentative step, terms involve $y^{t+1}$, so naive telescoping fails.

Fix from lecture:

- projection is non-expansive,
  $$
  \|P_C(a)-P_C(b)\|\le\|a-b\|,
  $$
- replace $\|y^{t+1}-x^*\|$ by an upper quantity in terms of $\|x^{t+1}-x^*\|$,
- telescoping works again.

This is the key technical insight of the lecture.

## 7) Basis pursuit application

Lecture applies projected subgradient to

$$
\min_\beta \|\beta\|_1\quad \text{s.t. } X\beta=y,
$$

using explicit projection for affine equality sets. This shows how theory maps to sparse recovery style problems.

## 8) Intuition to keep

Projection is not "wasting progress." In the Euclidean geometry used here, it is the closest feasible correction and supports stability in analysis.

## Checkpoint

You should be able to derive from memory:

- the two-step projected subgradient iteration
- non-expansiveness inequality
- why convergence bound mirrors unconstrained case

## Common mistakes

- forgetting to project every iteration
- assuming projection is always cheap
- mixing projection metric assumptions

## One-paragraph recap

Feb 12 shows constrained nonsmooth optimization can preserve subgradient-style guarantees when projection onto the feasible set is available and non-expansiveness is used correctly.
