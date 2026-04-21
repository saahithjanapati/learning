# Proof Patterns: SGD in the Strongly Convex Case

This page covers the two strongly-convex SGD proof patterns that matter most:

- fixed step size gives a geometric contraction plus a nonzero error floor
- decaying step size removes the error floor and yields a sublinear averaged function-value guarantee

## Setup

Assume:

- $f$ is $\alpha$-strongly convex
- $\mathbb{E}[g(x;\xi)] = \nabla f(x)$
- $\mathbb{E}\|g(x;\xi)\|^2 \le G^2$

The update is

$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t).
$$

## Proof skeleton to memorize

All strongly-convex SGD proofs run through the same master script:

1. expand
$$
\|x^{t+1}-x^*\|^2
$$
starting from the update
2. take conditional expectation
3. use strong convexity to turn the inner product into
   - a function-gap term
   - minus an extra distance term
4. substitute and get the master recursion
$$
a_{t+1}\le (1-\alpha\eta_t)a_t+\eta_t^2G^2
$$
or, if you keep more detail, a weighted function-gap inequality
5. decide which theorem you are proving:
   - fixed step: drop the nonpositive function-gap term and unroll the recursion
   - decaying step: keep the function-gap term and sum the weighted inequalities

The proof splits only at the end. The first half is the same in both cases.

## Core recursion

Start from the same distance expansion:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta_t g(x^t;\xi_t)^T(x^t-x^*)
+\eta_t^2\|g(x^t;\xi_t)\|^2.
$$

Take conditional expectation:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta_t \nabla f(x^t)^T(x^t-x^*)
+\eta_t^2 G^2.
$$

Strong convexity gives

$$
f(x^*) \ge f(x^t)+\nabla f(x^t)^T(x^*-x^t)+\frac{\alpha}{2}\|x^t-x^*\|^2,
$$

so

$$
-\nabla f(x^t)^T(x^t-x^*)
\le
f(x^*)-f(x^t)-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

Substitute:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
+2\eta_t(f(x^*)-f(x^t))
-\alpha\eta_t\|x^t-x^*\|^2
+\eta_t^2 G^2.
$$

Since $f(x^*) \le f(x^t)$, the function-value term is nonpositive, so

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
(1-\alpha\eta_t)\|x^t-x^*\|^2 + \eta_t^2 G^2.
$$

After full expectation,

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta_t)\mathbb{E}\|x^t-x^*\|^2 + \eta_t^2 G^2.
$$

This is the master recursion.

## Part I: fixed-step SGD

### Fixed-step memory version

The fixed-step proof is:

1. derive the master recursion
$$
a_{t+1}\le (1-\alpha\eta)a_t+\eta^2G^2
$$
2. unroll it as a geometric series
3. bound the geometric sum by $1/(\alpha\eta)$
4. conclude
$$
a_k\le (1-\alpha\eta)^k a_0+\frac{\eta G^2}{\alpha}
$$

This is the cleanest place to remember the phrase:

`geometric contraction plus stochastic error floor`

Take $\eta_t = \eta$ with $\eta < 1/\alpha$. Then

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta)\mathbb{E}\|x^t-x^*\|^2 + \eta^2 G^2.
$$

Let

$$
a_t := \mathbb{E}\|x^t-x^*\|^2.
$$

Then

$$
a_{t+1} \le (1-\alpha\eta)a_t + \eta^2 G^2.
$$

Unrolling the recursion gives

$$
a_k
\le
(1-\alpha\eta)^k a_0
+\eta^2 G^2 \sum_{j=0}^{k-1}(1-\alpha\eta)^j.
$$

Use the geometric-series formula:

$$
\sum_{j=0}^{k-1}(1-\alpha\eta)^j
\le
\frac{1}{\alpha\eta}.
$$

Therefore

$$
a_k
\le
(1-\alpha\eta)^k a_0 + \frac{\eta G^2}{\alpha}.
$$

So

$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}.
$$

### Meaning

The first term decays geometrically. The second term does not vanish. That is the stochastic error floor.

## Part II: decaying-step SGD

Now set

$$
\eta_t = \frac{1}{\alpha(t+1)}.
$$

The same master recursion becomes

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{1}{t+1}\right)\mathbb{E}\|x^t-x^*\|^2
+ \frac{G^2}{\alpha^2(t+1)^2}.
$$

That alone suggests the distance can keep shrinking, because the additive noise term is now summable.

The lecture theorem is usually stated for the averaged function-value gap:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{G^2(1+\log k)}{2\alpha k}.
$$

### Decaying-step memory version

Here the key choice is:

- do **not** drop the function-gap term

Instead:

1. keep the stronger inequality before the drop
2. plug in
$$
\eta_t=\frac{1}{\alpha(t+1)}
$$
3. rearrange into weighted function gaps
4. sum over $t$
5. recognize the harmonic sum
$$
\sum_{t=1}^k \frac1t \approx 1+\log k
$$

That is where the $\log k$ comes from.

## Why the proof changes here

In the fixed-step proof, we only wanted a recursion on squared distance.

In the decaying-step proof, we instead keep the stronger inequality

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta_t(f(x^*)-\mathbb{E}f(x^t))
-\alpha\eta_t \mathbb{E}\|x^t-x^*\|^2
+\eta_t^2 G^2,
$$

rearrange it into weighted function gaps, and sum over $t$.

Because $\eta_t = 1/(\alpha(t+1))$, the weights behave like $1/(t+1)$, and summing them introduces the harmonic-series term

$$
\sum_{t=1}^k \frac1t \approx 1+\log k.
$$

That is where the $\log k$ comes from.

## Main trick

The entire strongly-convex SGD story is encoded in the recursion

$$
a_{t+1} \le (1-\alpha\eta_t)a_t + \eta_t^2 G^2.
$$

If $\eta_t$ is constant, the additive noise term creates a floor.

If $\eta_t$ decays, the noise term shrinks and exact convergence in expectation becomes possible, but only at a sublinear rate.

## Comparison with deterministic GD

- Deterministic strongly-convex GD: no variance term, so exact geometric convergence.
- Strongly-convex SGD: variance term remains, so fixed-step exact convergence fails.

That is the conceptual difference the exam likes to test.

## Common traps

- Saying smoothness rescues SGD into linear convergence. In the basic SGD model, it does not.
- Forgetting the error floor term.
- Not specifying the quantity controlled in the decaying-step theorem.

## Source trail

- `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`
- [[2026-04-14-exam-2-section-01-sgd]]
- [[2026-04-19-exam-2-key-properties-identities]]
- [[2026-04-19-hw3-hw4-topic-summary]]
