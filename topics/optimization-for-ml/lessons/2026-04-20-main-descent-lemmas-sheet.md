# Main Descent Lemmas Sheet

This is the compact sheet for the main descent-style inequalities worth knowing for the exam.

The point is not to memorize every proof line. The point is to know:

- the assumptions
- the exact inequality
- what quantity it controls
- where it gets used in later proofs

## 1. Smooth GD Main Descent Lemma

Assumptions:

- $f$ is differentiable
- $f$ is $\beta$-smooth

Gradient descent step:

$$
x^+ = x - \eta \nabla f(x).
$$

Main inequality:

$$
f(x^+) \le f(x) - \eta\left(1-\frac{\beta\eta}{2}\right)\|\nabla f(x)\|^2.
$$

In particular, if $\eta \le 1/\beta$, then

$$
f(x^+) \le f(x) - \frac{\eta}{2}\|\nabla f(x)\|^2.
$$

What it controls:

- one-step decrease in objective value

Where it gets used:

- to derive the $(A2)$ inequality in the smooth-convex GD proof
- to convert gradient norms into objective differences
- as the deterministic baseline that proximal descent generalizes

Most common trap:

- using convexity here even though smoothness alone is enough

## 2. Smooth Convex GD Proof Corollaries

These are not themselves descent lemmas, but they are the two lines that immediately follow from the smooth GD proof setup and are used constantly.

From the descent lemma with $\eta = 1/\beta$:

$$
\|\nabla f(x^t)\|^2 \le 2\beta\big(f(x^t)-f(x^{t+1})\big).
$$

From convexity:

$$
f(x^t)-f(x^*) \le \nabla f(x^t)^T(x^t-x^*).
$$

Why keep these on the same sheet:

- these are exactly the lines that plug into the smooth-convex GD rate proof
- if you lose either one, the telescoping proof stalls

## 3. Pure Proximal Descent, Case $g=0$

Setup:

$$
f(x)=h(x),
\qquad
x^+ = \operatorname{prox}_{\eta,h}(x).
$$

For convex $h$, the prox step gives the one-step descent inequality

$$
h(x^+) \le h(x) - \eta \|G_\eta(x)\|^2.
$$

Here the gradient mapping is just the prox residual in the $g=0$ case.

What it controls:

- one-step decrease in the nonsmooth objective under a pure prox step

Why it matters:

- this is the simplest setting where a nonsmooth method still has a clean descent statement
- it helps explain why prox methods are better behaved than arbitrary subgradient steps

## 4. Main Proximal-Gradient Descent Lemma

Assumptions:

- $f(x)=g(x)+h(x)$
- $g$ is convex and $\beta$-smooth
- $h$ is convex
- $\eta \le 1/\beta$

Gradient mapping:

$$
G_\eta(x)
=
\frac1\eta\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

Main inequality:

$$
f(x-\eta G_\eta(x))
\le
f(z) + G_\eta(x)^T(x-z) - \frac{\eta}{2}\|G_\eta(x)\|^2
\qquad \forall z.
$$

Special case $z=x$:

$$
f(x-\eta G_\eta(x))
\le
f(x)-\frac{\eta}{2}\|G_\eta(x)\|^2.
$$

What it controls:

- one-step decrease in the composite objective

Where it gets used:

- convex proximal-gradient $O(1/k)$ proof
- strong-convexity extension
- proof questions asking you to split the smooth and nonsmooth parts correctly

Most common trap:

- using the subgradient of $h$ at the wrong point
- the prox-optimality subgradient is taken at the prox-updated point, not the original point

## 5. Strongly Convex Proximal-Gradient Descent Lemma

Assumptions:

- $f(x)=g(x)+h(x)$
- $g$ is $\alpha$-strongly convex and $\beta$-smooth
- $h$ is convex
- $\eta \le 1/\beta$

Strengthened inequality:

$$
f(x-\eta G_\eta(x))
\le
f(z) + G_\eta(x)^T(x-z) - \frac{\eta}{2}\|G_\eta(x)\|^2 - \frac{\alpha}{2}\|x-z\|^2
\qquad \forall z.
$$

What changes from the convex case:

- the extra term
$$
-\frac{\alpha}{2}\|x-z\|^2
$$
is what upgrades sublinear convergence into geometric contraction

Where it gets used:

- the linear convergence proof for proximal gradient
- HW3-style proof questions

Most common trap:

- copying the convex descent lemma and forgetting the extra strong-convexity term

## 6. Newton: Descent Direction Fact

This is not usually called a descent lemma in the same way, but it is one of the main descent-style facts you should know.

Assumptions:

- $\nabla^2 f(x) \succ 0$

Newton step:

$$
\Delta x_{\text{nt}} = -(\nabla^2 f(x))^{-1}\nabla f(x).
$$

Descent-direction check:

$$
\nabla f(x)^T \Delta x_{\text{nt}}
=
-\nabla f(x)^T (\nabla^2 f(x))^{-1}\nabla f(x)
< 0
$$

for $\nabla f(x)\neq 0$.

What it controls:

- it shows the Newton step points downhill when the Hessian is positive definite

Most common trap:

- stopping at geometric intuition instead of computing the inner product

## 7. SGD: What Replaces a Descent Lemma

SGD does not usually give a deterministic one-step descent lemma because of gradient noise.

What you use instead is the distance recursion:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta_t g_t^T(x^t-x^*)
+\eta_t^2\|g_t\|^2.
$$

Then:

- take conditional expectation
- use unbiasedness
- use convexity or strong convexity on the inner-product term

Exam takeaway:

- for SGD, think `distance recursion + expectation`, not `clean deterministic descent lemma`

## 8. Exam-Facing Memory Lines

- Smooth GD descent lemma: smoothness alone gives one-step decrease.
- Prox-GD descent lemma: same story, but replace gradient by gradient mapping and handle $h$ by prox optimality.
- Strongly convex prox lemma: same inequality plus an extra $-\frac{\alpha}{2}\|x-z\|^2$ term.
- Newton: prove descent by taking the inner product with the step.
- SGD: no clean descent lemma; use expected distance recursion.

## Related Notes

- [[2026-04-20-proof-gd-descent-lemma]]
- [[2026-04-20-proof-gd-smooth-convex-rate]]
- [[2026-04-20-proof-prox-descent-lemma]]
- [[2026-04-20-proof-prox-convergence-rates]]
- [[2026-04-20-proof-sgd-convex-nonsmooth-rate]]
- [[2026-04-20-proof-sgd-strongly-convex-recursions]]
- [[2026-04-14-exam-2-section-06-newton]]
- [[2026-04-14-exam-2-section-11-proof-toolkit]]
