# Optimization for ML - February 10, 2026

## Expository Deep Dive: Subgradient Method and Its Guarantees

Source transcript: `materials/processed/optimization-for-ml/Feb10_subgradient-method.md`

## How to read this lesson

Read this as the nonsmooth counterpart of Jan 29 GD. Same spirit, different geometry, different guarantees.

## 1) Update rule and the first conceptual shock

Subgradient method:

$$
x^{k}=x^{k-1}-\eta_k g^{k-1},\quad g^{k-1}\in\partial f(x^{k-1}).
$$

The lecture immediately stresses: this is not generally a descent method.

That means objective values can increase from one step to the next even with reasonable step sizes.

## 2) Why best iterate is tracked

Because monotone descent is not guaranteed, the algorithm tracks

$$
f(x_{\text{best}}^{(k)})=\min_{0\le i\le k} f(x^{(i)}).
$$

This is a structural change from standard GD analysis.

## 3) Step-size philosophy changes from GD

Line-search style adaptive descent tuning is less natural here because chosen subgradient can be non-descent.

Lecture focuses on pre-specified schedules:

- fixed horizon-tuned $\eta\sim 1/\sqrt{k}$
- diminishing sequence with
  $$
  \sum_k\eta_k^2<\infty,\quad \sum_k\eta_k=\infty
  $$

## 4) Lipschitz and bounded subgradient equivalence

For convex $f$:

$$
f \text{ is } G\text{-Lipschitz}
\iff
\|g\|\le G\ \forall g\in\partial f(x),\forall x.
$$

This replaces smoothness in nonsmooth convergence analysis.

## 5) The one inequality that drives everything

Core bound from lecture:

$$
f(x_{\text{best}})-f(x^*)
\le
\frac{\|x^0-x^*\|^2+G^2\sum_{t=0}^{k-1}\eta_t^2}
{2\sum_{t=0}^{k-1}\eta_t}.
$$

Interpretation:

- numerator: initial distance + cumulative step noise term
- denominator: cumulative progress weight from step sizes

This single expression yields all the main rates.

## 6) Main convergence statements

### Known horizon and bounds

If $\|x^0-x^*\|\le R$ and choose

$$
\eta=\frac{R}{G\sqrt{k}},
$$

then

$$
f(x_{\text{best}})-f(x^*)\le \frac{GR}{\sqrt{k}}.
$$

### Diminishing schedule

With square-summable / not-summable schedule:

$$
f(x_{\text{best}}^{(k)})\to f(x^*).
$$

### Unknown constants/horizon

Lecture also shows practical schedule $\eta_t=1/\sqrt{t+1}$ with an extra log factor in the bound.

## 7) Polyak step size

If optimal value is known:

$$
\eta_k=\frac{f(x^{k-1})-f(x^*)}{\|g^{k-1}\|^2}.
$$

This choice minimizes the one-step upper-bound expression in the proof and still gives $O(1/\sqrt{k})$ complexity in general convex nonsmooth settings.

## 8) Example: finding intersection of convex sets

Lecture rewrites feasibility as minimizing max distance to sets and derives subgradients through active farthest set.

With Polyak-style step, update simplifies to projection onto the currently farthest set; for two sets this recovers alternating projections.

## 9) How this differs from GD in one sentence

GD relies on smooth descent geometry; subgradient method relies on aggregate inequalities and step-size summation behavior.

## Checkpoint

You should be able to explain:

- why subgradient method can increase objective value at some iterations
- why best iterate is used in guarantees
- where the $1/\sqrt{k}$ rate comes from

## Common mistakes

- claiming per-iteration descent
- mixing $O(1/k)$ smooth-GD rate into nonsmooth setting
- using fixed step without horizon awareness and expecting exact convergence

## One-paragraph recap

Feb 10 gives a complete nonsmooth optimization algorithm with proof-level guarantees. It is slower than smooth GD but robust to nondifferentiability and widely applicable.
