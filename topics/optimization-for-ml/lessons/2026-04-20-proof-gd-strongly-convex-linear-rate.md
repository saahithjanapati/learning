# Proof: GD on Smooth Strongly Convex Functions Has Linear Convergence

This page gives the standard lecture proof for the strongly convex GD rate.

## Statement

Suppose $f$ is differentiable, $\beta$-smooth, and $\alpha$-strongly convex. Let $x^*$ be the unique minimizer. Run

$$
x^{t+1}=x^t-\frac{1}{\beta}\nabla f(x^t).
$$

Then

$$
\|x^k-x^*\|^2 \le \left(1-\frac{\alpha}{\beta}\right)^k\|x^0-x^*\|^2.
$$

This is linear convergence, also called geometric convergence.

## What changes from the convex proof

In the smooth-convex proof, convexity gave

$$
f(x^t)-f(x^*) \le \nabla f(x^t)^T(x^t-x^*).
$$

In the strongly convex proof, that gets upgraded to a sharper bound with an extra negative quadratic term. That extra term is exactly what produces a constant-factor contraction.

## Step 1: write strong convexity at $x = x^t$, $y = x^*$

Strong convexity says

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac{\alpha}{2}\|y-x\|^2.
$$

Plug in $x=x^t$, $y=x^*$:

$$
f(x^*) \ge f(x^t)+\nabla f(x^t)^T(x^*-x^t)+\frac{\alpha}{2}\|x^*-x^t\|^2.
$$

Rearrange:

$$
-\nabla f(x^t)^T(x^t-x^*)
\le
f(x^*)-f(x^t)-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

Multiply by $2/\beta$:

$$
-\frac{2}{\beta}\nabla f(x^t)^T(x^t-x^*)
\le
\frac{2}{\beta}(f(x^*)-f(x^t))
-\frac{\alpha}{\beta}\|x^t-x^*\|^2.
$$

This is the key replacement for the convex-case bound.

## Step 2: expand the distance recursion

From the GD update,

$$
\|x^{t+1}-x^*\|^2
=
\left\|x^t-x^*-\frac{1}{\beta}\nabla f(x^t)\right\|^2.
$$

Expanding gives

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-\frac{2}{\beta}\nabla f(x^t)^T(x^t-x^*)
+\frac{1}{\beta^2}\|\nabla f(x^t)\|^2.
$$

Use the Step 1 inequality on the inner-product term:

$$
\|x^{t+1}-x^*\|^2
\le
\|x^t-x^*\|^2
+\frac{2}{\beta}(f(x^*)-f(x^t))
-\frac{\alpha}{\beta}\|x^t-x^*\|^2
+\frac{1}{\beta^2}\|\nabla f(x^t)\|^2.
$$

Group the distance terms:

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2
+\frac{2}{\beta}(f(x^*)-f(x^t))
+\frac{1}{\beta^2}\|\nabla f(x^t)\|^2.
$$

## Step 3: control the gradient norm using one-step descent

From the smoothness descent lemma with $\eta = 1/\beta$,

$$
f(x^{t+1}) \le f(x^t)-\frac{1}{2\beta}\|\nabla f(x^t)\|^2.
$$

So

$$
\frac{1}{\beta^2}\|\nabla f(x^t)\|^2
\le
\frac{2}{\beta}(f(x^t)-f(x^{t+1})).
$$

Insert this into the previous inequality:

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2
+\frac{2}{\beta}(f(x^*)-f(x^t))
+\frac{2}{\beta}(f(x^t)-f(x^{t+1})).
$$

The $f(x^t)$ terms cancel:

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2
+\frac{2}{\beta}(f(x^*)-f(x^{t+1})).
$$

Since $x^*$ is a minimizer,

$$
f(x^*) \le f(x^{t+1}),
$$

so the last term is nonpositive. Therefore

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2.
$$

## Step 4: iterate the contraction

Apply the one-step bound repeatedly:

$$
\|x^k-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)^k\|x^0-x^*\|^2.
$$

That is the result.

## Main trick

The strongly convex proof is really:

1. expand the usual distance recursion
2. use strong convexity to make the cross term more negative
3. use descent to handle the gradient norm
4. use optimality of $x^*$ to drop the leftover function-value term

The extra $-(\alpha/2)\|x-x^*\|^2$ from strong convexity is the whole reason the rate becomes geometric.

## What quantity is converging

The theorem as stated in lecture controls:

$$
\|x^k-x^*\|^2.
$$

A function-value linear rate also follows, but the core proof here is the distance contraction proof.

## Common traps

- Claiming strong convexity alone is enough. The lecture theorem also uses smoothness.
- Forgetting where the gradient-norm term is controlled.
- Calling this $O(1/k)$. This is geometric, not sublinear.

## Source trail

- `materials/processed/optimization-for-ml/Jan29_GD.md`
- `materials/processed/optimization-for-ml/Quiz2_graded_submission.md`
- [[2026-04-14-convex-optimization-basics-for-proofs]]
- [[2026-02-19-chat-clarification-smoothness-descent]]
