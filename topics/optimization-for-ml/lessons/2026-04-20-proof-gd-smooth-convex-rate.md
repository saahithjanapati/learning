# Proof: GD on Smooth Convex Functions Has an O(1/k) Rate

This page is the full proof of the standard smooth-convex GD theorem from lecture.

## Statement

Suppose $f$ is differentiable, convex, and $\beta$-smooth. Let $x^*$ be a minimizer. Run gradient descent with

$$
x^{t+1} = x^t - \frac{1}{\beta}\nabla f(x^t).
$$

Then for every $k \ge 1$,

$$
f(x^k)-f(x^*) \le \frac{\beta}{2k}\|x^0-x^*\|^2.
$$

This is the standard sublinear $O(1/k)$ function-value rate.

## Proof skeleton before the algebra

The lecture proof has three ingredients:

1. one inequality from smoothness
2. one inequality from convexity
3. one identity from expanding the squared distance after a GD step

Those three pieces combine into a telescoping inequality.

## Step 1: gradient norm is controlled by objective decrease

From the descent lemma with step $\eta = 1/\beta$,

$$
f(x^{t+1}) \le f(x^t) - \frac{1}{2\beta}\|\nabla f(x^t)\|^2.
$$

Rearrange:

$$
\|\nabla f(x^t)\|^2 \le 2\beta(f(x^t)-f(x^{t+1})).
$$

This is the lecture's $(A2)$-type inequality.

## Step 2: convexity turns function gap into an inner product

For a differentiable convex function, the first-order convexity inequality says

$$
f(y) \ge f(x) + \nabla f(x)^T(y-x)
\qquad \text{for all } x,y.
$$

Now choose

$$
x = x^t,
\qquad
y = x^*.
$$

Then

$$
f(x^*) \ge f(x^t) + \nabla f(x^t)^T(x^*-x^t).
$$

Subtract $f(x^*)$ from both sides and multiply by $-1$:

$$
f(x^t)-f(x^*) \le \nabla f(x^t)^T(x^t-x^*).
$$

This is the lecture's $(A3)$-type inequality.

## Step 3: expand the distance recursion

Using the update $x^{t+1}=x^t-(1/\beta)\nabla f(x^t)$,

$$
\|x^{t+1}-x^*\|^2
=
\left\|x^t-x^*-\frac{1}{\beta}\nabla f(x^t)\right\|^2.
$$

Expand:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-\frac{2}{\beta}\nabla f(x^t)^T(x^t-x^*)
+\frac{1}{\beta^2}\|\nabla f(x^t)\|^2.
$$

Solve this for the inner product:

$$
\nabla f(x^t)^T(x^t-x^*)
=
\frac{\beta}{2}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big)
+\frac{1}{2\beta}\|\nabla f(x^t)\|^2.
$$

## Step 4: combine Steps 1, 2, and 3

From Step 2,

$$
f(x^t)-f(x^*) \le \nabla f(x^t)^T(x^t-x^*).
$$

Substitute the identity from Step 3:

$$
f(x^t)-f(x^*)
\le
\frac{\beta}{2}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big)
+\frac{1}{2\beta}\|\nabla f(x^t)\|^2.
$$

Now use Step 1:

$$
\frac{1}{2\beta}\|\nabla f(x^t)\|^2
\le
f(x^t)-f(x^{t+1}).
$$

Hence

$$
f(x^t)-f(x^*)
\le
\frac{\beta}{2}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big)
+f(x^t)-f(x^{t+1}).
$$

Subtract $f(x^t)$ from both sides and add $f(x^{t+1})$:

$$
f(x^{t+1})-f(x^*)
\le
\frac{\beta}{2}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big).
$$

This is the crucial telescoping inequality.

## Step 5: sum over iterations

Sum from $t=0$ to $k-1$:

$$
\sum_{t=0}^{k-1}\big(f(x^{t+1})-f(x^*)\big)
\le
\frac{\beta}{2}
\sum_{t=0}^{k-1}
\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big).
$$

The distance terms telescope:

$$
\sum_{t=0}^{k-1}
\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big)
=
\|x^0-x^*\|^2-\|x^k-x^*\|^2
\le
\|x^0-x^*\|^2.
$$

Therefore

$$
\sum_{t=0}^{k-1}\big(f(x^{t+1})-f(x^*)\big)
\le
\frac{\beta}{2}\|x^0-x^*\|^2.
$$

Divide by $k$:

$$
\frac{1}{k}\sum_{t=0}^{k-1}\big(f(x^{t+1})-f(x^*)\big)
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

## Step 6: pass from average gap to last iterate gap

Because the descent lemma gives monotonic decrease,

$$
f(x^k) \le f(x^t) \qquad \forall t \le k.
$$

So

$$
f(x^k)-f(x^*)
\le
\frac{1}{k}\sum_{t=0}^{k-1}\big(f(x^{t+1})-f(x^*)\big).
$$

Combining with the previous bound,

$$
f(x^k)-f(x^*) \le \frac{\beta}{2k}\|x^0-x^*\|^2.
$$

That completes the proof.

## Main trick

The proof works because the bad inner-product term

$$
\nabla f(x^t)^T(x^t-x^*)
$$

gets expressed in terms of:

- a telescoping distance difference
- a gradient-norm term

and then the gradient-norm term is killed using the one-step descent lemma.

## What quantity is converging

Be precise:

- the theorem controls $f(x^k)-f(x^*)$
- not necessarily $\|x^k-x^*\|^2 = O(1/k)$

## Common traps

- Forgetting the last-iterate monotonicity step at the very end.
- Losing the indexing and proving a bound for $f(x^t)-f(x^*)$ but not $f(x^{t+1})-f(x^*)$.
- Saying only "$O(1/k)$" without stating it is the function-value gap.

## Source trail

- `materials/processed/optimization-for-ml/Jan29_GD.md`
- `materials/processed/optimization-for-ml/Quiz2_graded_submission.md`
- [[2026-04-14-convex-optimization-basics-for-proofs]]
- [[2026-04-19-exam-2-key-properties-identities]]
