# Optimization for ML - January 20, 2026

## Expository Deep Dive: Convex Functions and Their Equivalent Views

Source transcript: `materials/processed/optimization-for-ml/Jan20_ConvexFunctions.md`

## How to read this lesson

Think of this as the function-side companion to convex sets. Jan 15 told you where points can live; Jan 20 tells you how objective values behave on those points.

## 1) Begin with the geometric picture

A function is convex when every chord lies above the graph:

$$
f(\theta x+(1-\theta)y)\le \theta f(x)+(1-\theta)f(y),\quad \theta\in[0,1].
$$

The lecture keeps returning to this picture because all equivalent tests are encoded in it.

## 2) Three ways to recognize convexity

The lecture organizes convexity tests into three levels.

### Zeroth-order (definition level)

Check line-segment inequality directly.

### First-order (gradient level)

For differentiable $f$:

$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x),\ \forall x,y.
$$

Interpretation: tangent plane is a global lower bound.

### Second-order (Hessian level)

For twice-differentiable $f$:

$$
\nabla^2 f(x)\succeq 0\ \forall x
\iff f \text{ is convex}.
$$

These are not different theories; they are the same convexity viewed through different regularity assumptions.

## 3) Epigraph viewpoint

The lecture gives an elegant set-based equivalence:

$$
f \text{ convex} \iff \operatorname{epi}(f)=\{(x,t): t\ge f(x)\} \text{ is convex}.
$$

Why this matters:

- it lets function questions become set questions
- it connects immediately to convex-set tools from Jan 15

## 4) Extended-value function trick

Define

$$
\tilde f(x)=
\begin{cases}
f(x), & x\in\operatorname{dom}(f)\\
+\infty, & x\notin\operatorname{dom}(f)
\end{cases}
$$

The lecture notes this preserves convexity and simplifies notation. Conceptually, domain constraints become part of the objective representation.

## 5) First-order corollary you will use constantly

If $f$ is convex and differentiable, then

$$
\nabla f(x)=0 \Rightarrow x \text{ is global minimizer}.
$$

This statement is one of the most important convex optimization shortcuts.

## 6) Strict convexity

Strict convexity strengthens the inequality to strict inequality for distinct points and $\theta\in(0,1)$. The lecture highlights examples where convex is not strict, so do not merge the two concepts.

Strict convexity is often used later to argue uniqueness of minimizers.

## 7) Subgradient bridge to nonsmooth functions

The lecture introduces subgradients as a direct generalization of first-order convexity:

$$
f(y)\ge f(x)+g_x^\top(y-x),\quad g_x\in\partial f(x).
$$

This is the doorway from smooth convex analysis to nonsmooth optimization.

## 8) Examples to internalize

Lecture examples worth remembering:

- quadratic with $Q\succeq0$ is convex
- affine function is both convex and concave
- least squares is convex
- spectral norm and trace norm are convex
- indicator of convex set is convex

These examples reappear later as objectives and regularizers.

## 9) Monotonicity of gradient/subgradient maps

A high-value theorem from this lecture:

$$
(\nabla f(x)-\nabla f(y))^\top(x-y)\ge0
$$

for convex differentiable $f$, with subgradient analogue

$$
(g_x-g_y)^\top(x-y)\ge0.
$$

This monotonicity is a hidden engine in many convergence proofs.

## Checkpoint

You should be able to do this without looking up notes:

- move between zeroth-, first-, and second-order convexity checks
- explain epigraph convexity in words
- state why $\nabla f(x)=0$ is globally optimal for convex differentiable $f$

## Common mistakes

- ignoring domain convexity
- applying Hessian test when twice differentiability is not given
- confusing strict convexity with convexity
- treating subgradient inequality as local rather than global

## One-paragraph recap

Jan 20 is the structural toolkit for objective functions: definition, equivalent tests, epigraph interpretation, and nonsmooth extension via subgradients. This lecture is the direct prerequisite for GD, subgradient, and KKT optimality analysis.
