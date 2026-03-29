# Optimization for ML - January 13, 2026

## Expository Deep Dive: Introduction and Problem Formulation

Source transcript: `materials/processed/optimization-for-ml/Jan13_Intro.md`

## How to read this lesson

Read this as the vocabulary foundation for everything else in the course. Most later mistakes happen because one of these definitions is used loosely.

## 1) Start with the general optimization template

The lecture begins by writing optimization in its broadest useful form:

$$
\min_{x \in C} f_0(x) \quad \text{subject to } f_i(x) \le b_i,\ i=1,\dots,m.
$$

Then it expands to include equality constraints:

$$
\min f_0(x) \quad \text{subject to } f_i(x) \le b_i,\ h_j(x)=0.
$$

At first this can feel like notation overload, but the intent is simple: every real ML optimization problem can be mapped into this pattern.

## 2) The five objects you must identify every time

When you see a new optimization question, pause and label:

- variable: what is being optimized ($x$)
- objective: what is minimized ($f_0$)
- inequality constraints: what must stay below a threshold ($f_i(x) \le b_i$)
- equality constraints: what must match exactly ($h_j(x)=0$)
- feasible set: points satisfying all constraints

If you cannot name these, you are not yet solving the problem, only staring at it.

## 3) The optimal value is an infimum, not always a minimizer

The lecture emphasizes:

$$
p^*=\inf\{f_0(x): x \text{ feasible}\}.
$$

This matters because three very different cases are possible:

- feasible and attained: there is an optimizer $x^*$ with $f_0(x^*)=p^*$
- feasible but not attained: infimum exists but no point reaches it
- infeasible or unbounded: $p^*=+\infty$ or $p^*=-\infty$

Many exam errors come from assuming "optimal value exists" implies "optimal point exists." It does not.

## 4) Explicit constraints are only half the story

A subtle but critical point in this lecture is implicit feasibility through domains:

$$
\mathcal D = \operatorname{dom}(f_0) \cap \bigcap_i \operatorname{dom}(f_i) \cap \bigcap_j \operatorname{dom}(h_j).
$$

So even if the problem statement forgets to write domain constraints, they are still there. If a function is undefined at a point, that point is automatically infeasible.

## 5) Transition to convex optimization

The lecture then introduces the special class we care about most:

$$
\min_{x\in \mathcal D} f_0(x)\quad
\text{s.t. } f_i(x)\le b_i,\ h_j(x)=0,
$$

with structure:

- $\mathcal D$ convex
- $f_0,f_i$ convex
- $h_j$ affine

This structure is not decorative. It is exactly what allows strong guarantees later (global optimality, duality, efficient local methods).

## 6) Why inequality direction and affine equalities matter

Two warnings from the lecture are extremely high-value:

1. If you write convex constraints as $f_i(x) \ge b_i$, feasible sets are often nonconvex.
2. If equality constraints are nonlinear convex functions, level sets can be nonconvex.

So convex optimization is not "any problem with convex functions." The form of constraints matters.

## 7) Big-picture ML relevance

The lecture links this template to:

- least squares,
- MLE,
- empirical risk minimization,
- and many constrained estimation tasks.

This is your unifying language for the rest of the course.

## Checkpoint

Before moving on, make sure you can answer this from memory:

- What is the difference between feasible point, optimal point, and optimal value?
- Why can $p^*$ exist without an optimizer?
- Why do equality constraints need to be affine in convex standard form?

## Common mistakes

- forgetting domain constraints
- assuming infimum is attained
- checking convexity of objective but ignoring feasible-set convexity
- flipping inequality sign and still calling it convex optimization

## One-paragraph recap

Jan 13 builds the language contract for the entire course. If you can map any problem into variables, objective, explicit constraints, and implicit domain constraints, and then check convex standard form correctly, you are prepared for everything that follows.
