# Convex Optimization Basics for Proofs

This note collects the foundational convex-optimization facts that repeatedly show up inside later material. Even when an exam is focused on later lectures, these basics still appear in proof steps, theorem assumptions, and short-answer logic.

## 1. Convex Sets

A set $C \subseteq \mathbb{R}^n$ is convex if for every $x,y \in C$ and every $\theta \in [0,1]$,

$$
\theta x + (1-\theta)y \in C.
$$

This is the most basic proof template for convexity of a set:

1. choose arbitrary $x,y \in C$,
2. choose arbitrary $\theta \in [0,1]$,
3. show $\theta x + (1-\theta)y$ satisfies the defining constraints of the set.

### 1.1 Standard closure properties

Intersections of convex sets are convex. This includes both finite and infinite intersections. Unions of convex sets are not convex in general.

Cartesian products of convex sets are convex. If $A \subseteq \mathbb{R}^m$ and $B \subseteq \mathbb{R}^n$ are convex, then

$$
A \times B = \{(a,b): a \in A,\; b \in B\}
$$

is convex.

Inverse images of convex sets under affine maps are convex. If $D$ is convex and

$$
C = \{x : Ax+b \in D\},
$$

then $C$ is convex.

### 1.2 Convex hull and conic hull

The convex hull of a set $C$ is the smallest convex set containing $C$. Equivalently, it is the set of all convex combinations:

$$
\operatorname{conv}(C)
=
\left\{
\sum_{i=1}^k \theta_i x_i :
x_i \in C,\;
\theta_i \ge 0,\;
\sum_{i=1}^k \theta_i = 1
\right\}.
$$

The conic hull of points $x_1,\dots,x_k$ is

$$
\operatorname{cone}\{x_1,\dots,x_k\}
=
\left\{
\sum_{i=1}^k \theta_i x_i :
\theta_i \ge 0
\right\}.
$$

The difference is that convex combinations require coefficients to sum to `1`, while conic combinations only require nonnegativity.

### 1.3 Common examples

- halfspaces and affine sets are convex
- polyhedra are convex because they are intersections of halfspaces
- $\ell_p$ balls are convex for $p \ge 1$
- ellipsoids are convex because they are inverse images of Euclidean balls under affine maps

## 2. Convex Functions

A function $f : \mathbb{R}^n \to \mathbb{R}$ is convex if for all `x,y` and all $\theta \in [0,1]$,

$$
f(\theta x + (1-\theta)y)
\le
\theta f(x) + (1-\theta)f(y).
$$

This is the Jensen / line-segment definition.

### 2.1 First-order characterization

If $f$ is differentiable, then $f$ is convex if and only if

$$
f(y) \ge f(x) + \nabla f(x)^T(y-x)
\qquad \forall x,y.
$$

This says that the tangent hyperplane is a global underestimator.

This is one of the most important tools in later proofs. Many proof problems are really just about applying this inequality correctly.

### 2.2 Second-order characterization

If $f$ is twice differentiable, then convexity is equivalent to

$$
\nabla^2 f(x) \succeq 0
\qquad \forall x.
$$

If the Hessian is positive definite everywhere, then $f$ is strictly convex. In a strictly convex problem, a minimizer is unique if it exists.

### 2.3 Epigraph characterization

The epigraph of $f$ is

$$
\operatorname{epi}(f)
=
\{(x,t) : f(x) \le t\}.
$$

The function $f$ is convex if and only if its epigraph is a convex set.

This is often useful for proving convexity of functions indirectly.

### 2.4 Pointwise max and partial minimization

If $f_1,\dots,f_m$ are convex, then

$$
f(x)=\max_i f_i(x)
$$

is convex.

If $f(x,y)$ is jointly convex in `(x,y)` and one defines

$$
g(x)=\inf_{y \in C} f(x,y)
$$

with $C$ convex, then $g(x)$ is convex. This is partial minimization.

### 2.5 Fenchel conjugate

The conjugate of a function $f$ is

$$
f^*(y)=\sup_x \{x^T y - f(x)\}.
$$

The conjugate is always convex, regardless of whether the original function is convex.

## 3. Smoothness

A differentiable function is $\beta$-smooth if its gradient is Lipschitz:

$$
\|\nabla f(x)-\nabla f(y)\| \le \beta \|x-y\|.
$$

For twice differentiable functions, this is equivalent to

$$
\nabla^2 f(x) \preceq \beta I.
$$

The standard smoothness upper bound is

$$
f(y)
\le
f(x) + \nabla f(x)^T(y-x) + \frac{\beta}{2}\|y-x\|^2.
$$

This is the descent-lemma form of smoothness. It is one of the most common inequalities in gradient-descent and proximal-gradient proofs.

## 4. Strong Convexity

A differentiable function is $\alpha$-strongly convex if

$$
f(y)
\ge
f(x) + \nabla f(x)^T(y-x) + \frac{\alpha}{2}\|y-x\|^2.
$$

For twice differentiable functions, this is equivalent to

$$
\nabla^2 f(x) \succeq \alpha I.
$$

So:

- smoothness gives an upper quadratic bound,
- strong convexity gives a lower quadratic bound.

The condition number is

$$
\kappa = \beta/\alpha.
$$

This quantity controls the rates of many first-order and accelerated methods.

## 5. Subgradients

For a convex function $f$, a vector $g$ is a subgradient at $x$ if

$$
f(y) \ge f(x) + g^T(y-x)
\qquad \forall y.
$$

The set of all such subgradients is the subdifferential:

$$
\partial f(x).
$$

If $f$ is differentiable at $x$, then

$$
\partial f(x)=\{\nabla f(x)\}.
$$

### 5.1 Monotonicity

If $g_x \in \partial f(x)$ and $g_y \in \partial f(y)$, then

$$
(g_x-g_y)^T(x-y) \ge 0.
$$

This is monotonicity of the subdifferential. It is a key structural fact for convex analysis.

### 5.2 Max of convex functions

If

$$
f(x)=\max_i f_i(x),
$$

then

$$
\partial f(x)
=
\operatorname{conv}\left(
\bigcup_{i:\, f_i(x)=f(x)} \partial f_i(x)
\right).
$$

The union is only over active indices. This “active set” restriction is easy to forget and often appears in quiz-style questions.

### 5.3 Common examples

For $f(x)=|x|$,

$$
\partial f(x)=
\begin{cases}
\{1\}, & x>0, \\
[-1,1], & x=0, \\
\{-1\}, & x<0.
\end{cases}
$$

For $f(x)=\|x\|_1$, the subgradient is the coordinatewise sign vector, with interval values `[-1,1]` at zero coordinates.

## 6. Normal Cone and Constrained Optimality

For a convex set $C$, the normal cone at $x \in C$ is

$$
N_C(x)
=
\{v : v^T(y-x) \le 0 \text{ for all } y \in C\}.
$$

This describes the directions that point outward from the feasible set.

### 6.1 First-order constrained optimality

If $f$ is differentiable and convex, then $x^*$ solves

$$
\min_{x \in C} f(x)
$$

if and only if

$$
-\nabla f(x^*) \in N_C(x^*).
$$

Equivalently,

$$
\nabla f(x^*)^T (y-x^*) \ge 0
\qquad \forall y \in C.
$$

This is the clean bridge from geometry of the feasible set to first-order optimality.

### 6.2 Nonsmooth constrained case

For convex $f$,

$$
x^* \text{ optimal}
\iff
0 \in \partial f(x^*) + N_C(x^*).
$$

This is the set-valued generalization of the stationarity condition.

## 7. Projection Onto Convex Sets

The Euclidean projection onto a closed convex set $C$ is

$$
\Pi_C(y) = \arg\min_{x \in C} \|x-y\|^2.
$$

Two standard facts:

1. optimality condition:

$$
(y-\Pi_C(y))^T(z-\Pi_C(y)) \le 0
\qquad \forall z \in C
$$

2. non-expansiveness:

$$
\|\Pi_C(a)-\Pi_C(b)\| \le \|a-b\|.
$$

These facts are used constantly in projected-gradient and projected-subgradient proofs.

## 8. Gradient Descent Core Inequalities

For $\beta$-smooth $f$, gradient descent with $\eta = 1/\beta$ gives

$$
x^{k+1}=x^k-\eta \nabla f(x^k).
$$

Smoothness yields

$$
f(x^{k+1})
\le
f(x^k)-\frac{1}{2\beta}\|\nabla f(x^k)\|^2.
$$

This is the basic descent inequality.

For smooth nonconvex objectives,

$$
\min_{0\le t\le k-1}\|\nabla f(x^t)\|^2
\le
\frac{2\beta(f(x^0)-f_{\inf})}{k}.
$$

For smooth convex objectives,

$$
f(x^k)-f(x^*)
\le
\frac{\beta \|x^0-x^*\|^2}{2k}.
$$

For smooth strongly convex objectives,

$$
\|x^k-x^*\|^2
\le
(1-\alpha \eta)^k \|x^0-x^*\|^2,
\qquad \eta \le 1/\beta.
$$

These are the baseline rates that later methods are compared against.

## 9. Common Proof Patterns

### 9.1 Showing a set is convex

Start from arbitrary `x,y` in the set and arbitrary $\theta$. Show the convex combination satisfies the defining constraints.

### 9.2 Showing a function is convex

Choose one of three routes:

- Jensen definition,
- first-order lower bound,
- Hessian PSD test.

Do not mix them unless necessary.

### 9.3 Using smoothness

The smoothness inequality is an upper bound:

$$
f(y)
\le
f(x)+\nabla f(x)^T(y-x)+\frac{\beta}{2}\|y-x\|^2.
$$

### 9.4 Using convexity

The first-order convexity inequality is a lower bound:

$$
f(y)
\ge
f(x)+\nabla f(x)^T(y-x).
$$

### 9.5 Using strong convexity

Strong convexity strengthens the lower bound with a quadratic term:

$$
f(y)
\ge
f(x)+\nabla f(x)^T(y-x)+\frac{\alpha}{2}\|y-x\|^2.
$$

### 9.6 Deriving a dual

The standard route is:

1. write the Lagrangian,
2. group the terms in the primal variable,
3. determine when the infimum is finite,
4. read off the dual objective and constraints.

### 9.7 KKT verification

Write:

- primal feasibility,
- dual feasibility,
- complementary slackness,
- stationarity.

Then solve systematically.

## 10. Practice Problems

### 10.1 Convex sets and functions

1. Prove that the inverse image of a convex set under an affine map is convex.
2. Prove that the epigraph characterization is equivalent to convexity of a function.
3. Give an example of two convex functions whose composition is not convex.
4. Show that the pointwise maximum of convex functions is convex.

### 10.2 Smoothness and strong convexity

1. Starting from Lipschitz continuity of the gradient, derive the smoothness upper bound.
2. Show that for twice differentiable functions, $\nabla^2 f(x)\preceq \beta I$ implies $\beta$-smoothness.
3. Prove that $\alpha$-strong convexity implies uniqueness of the minimizer.
4. Show that if $f$ is $\alpha$-strongly convex and $g$ is $\beta$-strongly convex, then `f+g` is $(\alpha+\beta)$-strongly convex.

### 10.3 Subgradients and normal cones

1. Compute the subdifferential of `|x|` and $\|x\|_1$.
2. Prove monotonicity of subgradients.
3. State and prove the constrained first-order optimality condition using the normal cone.
4. Derive the optimality condition for

$$
\min_{x \in C} f(x)
$$

in the nonsmooth convex case.

### 10.4 Projection

1. Prove the projection optimality inequality

$$
(y-\Pi_C(y))^T(z-\Pi_C(y)) \le 0.
$$

2. Prove non-expansiveness of projection.

### 10.5 Rates

1. Derive the descent inequality for gradient descent on a $\beta$-smooth function.
2. Show how the `1/k` convex GD rate follows from smoothness and convexity.
3. Show how strong convexity leads to linear convergence of GD.

## 11. How This Note Connects To Later Material

Later topics like SGD, proximal methods, duality, KKT, SDP, and Newton all repeatedly use the facts in this note:

- smoothness upper bounds,
- convexity lower bounds,
- strong convexity curvature terms,
- subgradient and normal-cone stationarity,
- projection inequalities,
- and the general Lagrangian-to-dual derivation pattern.

So even if these early lectures are not the nominal focus of the exam, they remain part of the background language of almost every proof.
