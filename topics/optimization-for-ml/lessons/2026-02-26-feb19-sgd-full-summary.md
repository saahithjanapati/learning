# Optimization for ML - February 19, 2026

## Full Lecture Summary: Stochastic Gradient Descent (SGD)

Source transcript: `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`

## 1) Problem Setting

Goal (initially unconstrained):

$$
\min_x f(x), \quad f \text{ differentiable}.
$$

Instead of exact gradient, we can compute a stochastic gradient $g(x;\xi)$ such that

$$
\mathbb{E}_\xi[g(x;\xi)] = \nabla f(x).
$$

This is an unbiased gradient estimator.

SGD update:

$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t),
$$

where $\xi_t$ is sampled independently.

## 2) Why SGD Needs Careful Step Sizes

Main warning from lecture:
- even at/near optimum, stochastic gradients can have nonzero variance;
- therefore fixed step sizes often do not converge to the exact minimizer;
- decaying step sizes are typically required for convergence.

## 3) Core Examples of Unbiased Stochastic Gradients

### Example A: Additive Noise Model

$$
g(x,\xi)=\nabla f(x)+\xi,\quad \mathbb{E}[\xi]=0.
$$

### Example B: Randomized Incremental Gradient

For

$$
f(x)=\frac1n\sum_{i=1}^n f_i(x),
$$

sample $\xi_t\sim U\{1,\dots,n\}$ and use

$$
g(x;\xi_t)=\nabla f_{\xi_t}(x).
$$

Then $\mathbb{E}[g(x;\xi_t)]=\nabla f(x)$.

### Example C: ERM / Supervised Learning

Risk:

$$
R(f)=\mathbb{E}_{X,Y}[l(f(X),Y)].
$$

Empirical risk:

$$
R_n(f)=\frac1n\sum_{i=1}^n l(f(X_i),Y_i).
$$

With parametrization $f=f_w$, gradients from single examples or minibatches are stochastic unbiased estimators of full-gradient directions used to optimize parameters $w$.

### Example D: Mini-batch SGD

For batch $I_t$ of size $m$:

$$
x^{t+1}=x^t-\eta_t\frac1m\sum_{i\in I_t}\nabla f_i(x^t).
$$

Tradeoff:
- larger $m$ lowers variance;
- larger $m$ increases per-iteration cost.

### Example E: Randomized Coordinate Descent View

Select coordinate $i_t$ uniformly and update only that coordinate. The expected update aligns with full gradient up to scaling.

## 4) Warm-up: Mean Estimation as SGD

Objective:

$$
\min_x \frac12\sum_{t=1}^n\|X_t-x\|_2^2,\quad x^0=0.
$$

Gradient for sample $X_{t+1}$:

$$
x^t-X_{t+1}.
$$

Update:

$$
x^{t+1}=(1-\eta_t)x^t+\eta_tX_{t+1}.
$$

With $\eta_t=\frac1{t+1}$:

$$
x^n=\frac1n\sum_{i=1}^n X_i
$$

exactly after $n$ updates (moving-average recursion).

Key point:
- even in a very favorable setting, decay $\eta_t\sim 1/t$ is essential.

## 5) Population-Average Variant and Statistical Rate

Population objective:

$$
\min_x \frac12\mathbb{E}_{X\sim P}\|X-x\|_2^2.
$$

If $P$ has mean $\mu$ and variance $\sigma^2$, then $x^*=\mu$ and

$$
f(x^*)=\frac{\sigma^2}{2}.
$$

Using same SGD recursion with $\eta_t=\frac1{t+1}$ gives

$$
x^n=\frac1n\sum_{i=1}^n X_i.
$$

Excess objective:

$$
f(x^n)-f(x^*)=\frac{\sigma^2}{2n}=O\!\left(\frac1n\right).
$$

Interpretation:
- this rate is statistically optimal in this mean-estimation setting;
- one-pass SGD can match best possible estimation error scaling.

## 6) Theorem: SGD for Nonsmooth Lipschitz Convex Functions

Assumptions:
- $f$ convex, possibly nonsmooth;
- $g_x \doteq \mathbb{E}_\xi[g(x;\xi)] \in \partial f(x)$;
- initialization bound $\|x^0-x^*\|^2\le R$;
- bounded second moment $\mathbb{E}\|g(x,\xi)\|^2\le G^2$ for all $x$.

Choose fixed horizon-tuned step size:

$$
\eta=\frac{\sqrt{R}}{G\sqrt{k}}.
$$

Guarantee for averaged iterate $\bar x_k=\frac1k\sum_{t=1}^k x^t$:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt{R}}{\sqrt{k}}.
$$

Important notes from lecture:
- guarantee is in expectation;
- rate matches subgradient-method dependence on $k$;
- SGD iterations can still be much cheaper than full-gradient subgradient iterations.

## 7) Proof Skeleton (Nonsmooth Convex Case)

Start from one-step recursion:

$$
\|x^{t+1}-x^*\|^2
=\|x^t-x^*\|^2
-2\eta g(x^t;\xi_t)^\top(x^t-x^*)
+\eta^2\|g(x^t;\xi_t)\|^2.
$$

Take conditional expectation, use bounded second moment and unbiased subgradient:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+\eta^2G^2
+2\eta(f(x^*)-\mathbb{E}f(x^t)).
$$

Sum over $t$, rearrange, divide by $k$:

$$
\frac1k\sum_{t=0}^{k-1}(\mathbb{E}f(x^t)-f(x^*))
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Use convexity/Jensen:

$$
\mathbb{E}f(\bar x_k)-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Optimize RHS in $\eta$ to get $\eta=\sqrt{R/(G^2k)}$ and the $O(1/\sqrt{k})$ bound.

## 8) Theorem: SGD for Strongly Convex Functions

Assumptions:
- $f$ is $\alpha$-strongly convex;
- $\mathbb{E}[g(x,\xi)]=\nabla f(x)$;
- $\mathbb{E}\|g(x,\xi)\|^2\le G^2$.

Result 1 (fixed step size $\eta<1/\alpha$):

$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2
+\frac{\eta G^2}{\alpha}.
$$

Interpretation:
- geometric transient term + steady-state noise floor.

Result 2 (decaying step $\eta_t=\frac1{\alpha(t+1)}$):

$$
\mathbb{E}f\!\left(\frac1k\sum_{t=1}^k x^t\right)-f(x^*)
\le
\frac{G^2(1+\log k)}{2\alpha k}.
$$

Interpretation:
- averaged iterate gets $\tilde O(1/k)$.

## 9) Variance Decomposition Insight

Lecture identity:

$$
\mathbb{E}\|g(x;\xi)\|^2
=
\|\mathbb{E}g(x;\xi)\|^2
+
\mathrm{Var}(g(x;\xi)).
$$

Consequence:
- even if $\|\nabla f(x)\|$ shrinks near optimum, variance may remain;
- this is the main reason SGD does not behave like deterministic linear-convergent GD near optimum.

## 10) Proof Skeleton (Strongly Convex Case)

From recursion and unbiasedness:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+\eta_t^2G^2
-2\eta_t\mathbb{E}\big[(x^t-x^*)^\top\nabla f(x^t)\big].
$$

Use strong convexity inequality to bound inner product:

$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)+\frac\alpha2\|y-x\|^2.
$$

This yields key recursion:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta_t)\mathbb{E}\|x^t-x^*\|^2+\eta_t^2G^2
+2\eta_t(f(x^*)-\mathbb{E}f(x^t)).
$$

Then:
- drop negative function-gap term for fixed-step claim;
- telescope with $\eta_t=1/(\alpha(t+1))$ for averaged-function-gap claim and harmonic-series $\log k$ factor.

## 11) Step-size Playbook from Lecture

- If objective is convex nonsmooth with bounded stochastic subgradient moments:
  - target averaged rates around $O(1/\sqrt{k})$.
- If objective is strongly convex:
  - fixed step gives fast initial progress then bouncing/noise floor;
  - decaying step gives asymptotic accuracy improvement.
- Practical heuristic stated in lecture:
  - run epochs with fixed step;
  - when progress stalls/bouncing appears, decay step and continue.

## 12) Rate Table (What to Memorize)

| Setting | Step size | Typical guarantee |
| --- | --- | --- |
| Convex nonsmooth SGD | Horizon-tuned fixed $\eta\sim 1/\sqrt{k}$ | $\mathbb{E}[f(\bar x_k)]-f^* = O(1/\sqrt{k})$ |
| Strongly convex SGD | Fixed $\eta<1/\alpha$ | Geometric transient + noise floor |
| Strongly convex SGD | $\eta_t=1/(\alpha(t+1))$ | $\mathbb{E}[f(\bar x_k)]-f^* = O((\log k)/k)$ |
| Mean estimation warm-up | $\eta_t=1/(t+1)$ | Excess risk $O(1/n)$ |

## 13) Common Exam/Quiz Traps

- Confusing deterministic GD linear convergence with SGD behavior under nonzero variance.
- Swapping rates:
  - convex nonsmooth SGD is $1/\sqrt{k}$,
  - strongly convex averaged SGD is approximately $(\log k)/k$.
- Forgetting that several guarantees are for averaged iterates, not necessarily the last iterate.
- Missing assumption details: unbiasedness, bounded second moment, strong convexity parameter $\alpha$.
