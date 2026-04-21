# Proof: SGD for Convex Nonsmooth Functions Has an O(1/sqrt(k)) Averaged Rate

This is the standard lecture proof for nonsmooth convex SGD with unbiased stochastic subgradients and bounded second moment.

## Statement

Assume:

- $f$ is convex
- $g_x := \mathbb{E}[g(x;\xi)] \in \partial f(x)$
- $\|x^0-x^*\|^2 \le R$ for some minimizer $x^*$
- $\mathbb{E}\|g(x;\xi)\|^2 \le G^2$ for all $x$

Run SGD with fixed step size

$$
x^{t+1}=x^t-\eta g(x^t;\xi_t).
$$

If

$$
\eta = \frac{\sqrt{R}}{G\sqrt{k}},
$$

then

$$
\mathbb{E}\left[f\left(\frac1k\sum_{t=0}^{k-1}x^t\right)\right]-f(x^*)
\le
\frac{G\sqrt{R}}{\sqrt{k}}.
$$

## Big picture

This proof is the stochastic version of the subgradient-method proof:

1. expand the squared distance after one step
2. take conditional expectation
3. use the subgradient inequality
4. sum over time
5. use convexity to move from average of function values to function of the average iterate
6. optimize the step size

## Proof skeleton to memorize

If you blank on the full proof, write these six moves in order:

1. start from the SGD update and expand
$$
\|x^{t+1}-x^*\|^2
$$
2. take conditional expectation so the random gradient is replaced by its mean and the second moment is bounded by $G^2$
3. use the subgradient inequality to turn the inner product into a function gap
4. rearrange so the function gap is on the left and the distance difference is on the right
5. sum over $t$ so the distance terms telescope
6. use convexity on the averaged iterate and then optimize $\eta$

The final intermediate line you are aiming for is

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Once you have that line, choosing the best $\eta$ is mechanical.

## Step 1: distance expansion

From the update,

$$
x^{t+1}-x^* = x^t-x^*-\eta g(x^t;\xi_t).
$$

So

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta g(x^t;\xi_t)^T(x^t-x^*)
+\eta^2\|g(x^t;\xi_t)\|^2.
$$

## Step 2: conditional expectation

Take expectation conditioned on $x^t$:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta \mathbb{E}[g(x^t;\xi_t)^T(x^t-x^*)\mid x^t]
+\eta^2 G^2.
$$

Because $x^t-x^*$ is fixed after conditioning,

$$
\mathbb{E}[g(x^t;\xi_t)^T(x^t-x^*)\mid x^t]
=
\mathbb{E}[g(x^t;\xi_t)\mid x^t]^T(x^t-x^*).
$$

Define

$$
g_{x^t}:=\mathbb{E}[g(x^t;\xi_t)\mid x^t].
$$

Then

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta g_{x^t}^T(x^t-x^*)
+\eta^2 G^2.
$$

## Step 3: use the subgradient inequality

Since $g_{x^t} \in \partial f(x^t)$, convexity gives

$$
f(x^*) \ge f(x^t) + g_{x^t}^T(x^*-x^t).
$$

Equivalently,

$$
-g_{x^t}^T(x^t-x^*) \le f(x^*)-f(x^t).
$$

Substitute this into the previous bound:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
+2\eta(f(x^*)-f(x^t))
+\eta^2 G^2.
$$

Now take full expectation:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta(f(x^*)-\mathbb{E}f(x^t))
+\eta^2 G^2.
$$

## Step 4: rearrange into a sum of function gaps

Move the function-gap term to the left:

$$
2\eta(\mathbb{E}f(x^t)-f(x^*))
\le
\mathbb{E}\|x^t-x^*\|^2
-\mathbb{E}\|x^{t+1}-x^*\|^2
+\eta^2 G^2.
$$

Sum from $t=0$ to $k-1$:

$$
2\eta \sum_{t=0}^{k-1}(\mathbb{E}f(x^t)-f(x^*))
\le
\|x^0-x^*\|^2
-\mathbb{E}\|x^k-x^*\|^2
+k\eta^2 G^2.
$$

Drop the nonnegative distance term:

$$
2\eta \sum_{t=0}^{k-1}(\mathbb{E}f(x^t)-f(x^*))
\le
\|x^0-x^*\|^2 + k\eta^2 G^2.
$$

Using $\|x^0-x^*\|^2 \le R$,

$$
\frac1k\sum_{t=0}^{k-1}(\mathbb{E}f(x^t)-f(x^*))
\le
\frac{R}{2\eta k} + \frac{G^2\eta}{2}.
$$

## Step 5: pass to the averaged iterate

Let

$$
\bar x_k := \frac1k\sum_{t=0}^{k-1}x^t.
$$

By convexity of $f$,

$$
f(\bar x_k) \le \frac1k\sum_{t=0}^{k-1}f(x^t).
$$

Taking expectation,

$$
\mathbb{E}[f(\bar x_k)] - f(x^*)
\le
\frac1k\sum_{t=0}^{k-1}(\mathbb{E}f(x^t)-f(x^*))
\le
\frac{R}{2\eta k} + \frac{G^2\eta}{2}.
$$

## Step 6: choose the best step size

Define

$$
\phi(\eta)=\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Differentiate:

$$
\phi'(\eta) = -\frac{R}{2k\eta^2}+\frac{G^2}{2}.
$$

Set this to zero:

$$
\eta^2 = \frac{R}{G^2k}.
$$

So choose

$$
\eta=\frac{\sqrt{R}}{G\sqrt{k}}.
$$

Substituting this back gives

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{G\sqrt{R}}{\sqrt{k}}.
$$

That completes the proof.

## Main trick

The proof never tries to control the raw last iterate directly. It controls an average of function gaps, and then convexity converts that into a guarantee on the averaged iterate.

## What quantity is converging

Be precise:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
$$

is the standard lecture quantity here.

## Common traps

- Forgetting the expectation after using stochastic gradients.
- Replacing $\mathbb{E}[g(x;\xi)] \in \partial f(x)$ with ordinary differentiability.
- Stating an $O(1/\sqrt{k})$ rate for the last iterate without saying the lecture proof is for the averaged iterate.

## Source trail

- `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`
- `materials/processed/optimization-for-ml/HW3_prompt.md`
- [[2026-04-14-exam-2-section-01-sgd]]
- [[2026-04-19-exam-2-key-properties-identities]]
