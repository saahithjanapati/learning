# Optimization for ML - January 29, 2026

## Expository Deep Dive: Gradient Descent from Intuition to Rates

Source transcript: `materials/processed/optimization-for-ml/Jan29_GD.md`

## How to read this lesson

Read in three passes: update rule, step-size intuition, then convergence under assumptions. This lecture is the baseline that later methods modify.

## 1) Why the GD step has this exact form

Gradient descent update:

$$
x^{t+1}=x^t-\eta_t\nabla f(x^t).
$$

Local Taylor view:

$$
f(x+\eta v)\approx f(x)+\eta v^\top\nabla f(x).
$$

To decrease $f$, choose $v$ with negative inner product against gradient. Among directions with fixed norm, $-\nabla f(x)$ is steepest.

The lecture also gives a proximal-linear derivation:

$$
x^{t+1}=\arg\min_y\left[f(x^t)+\nabla f(x^t)^\top(y-x^t)+\frac{1}{2\eta}\|y-x^t\|^2\right].
$$

So GD is not only directional intuition; it is exact minimization of a local surrogate.

## 2) Step size is the control knob

Lecture demos show three regimes:

- too large: divergence/oscillation
- too small: extremely slow progress
- calibrated: stable convergence

This is why rate results always include step-size restrictions.

## 3) Convergence-rate vocabulary

You review linear, superlinear, sublinear, and quadratic rates. In optimization practice, the most common confusion is not naming the quantity that converges.

Always state both:

- what converges (distance, objective gap, gradient norm)
- how fast (rate class)

## 4) Least squares case study (closed-form dynamics)

For

$$
f(x)=\frac12\|Ax-b\|^2,
$$

with solution $\hat x=(A^\top A)^{-1}A^\top b$, error evolves as

$$
x^{t+1}-\hat x=(I-\eta A^\top A)(x^t-\hat x).
$$

This makes GD a linear dynamical system in error coordinates.

With tuned fixed step

$$
\eta=\frac{2}{\lambda_{\max}(S)+\lambda_{\min}(S)},\quad S=A^\top A,
$$

you get linear contraction

$$
\|x^k-\hat x\|\le
\left(\frac{\kappa(S)-1}{\kappa(S)+1}\right)^k\|x^0-\hat x\|.
$$

So accuracy $\epsilon$ takes $O(\log(1/\epsilon))$ steps.

## 5) Smooth nonconvex guarantee

For $\beta$-smooth (not necessarily convex) $f$, descent lemma gives

$$
f(x-\eta\nabla f(x))\le f(x)-\eta\left(1-\frac{\beta\eta}{2}\right)\|\nabla f(x)\|^2.
$$

With $\eta=1/\beta$, within $k$ steps:

$$
\min_{0\le t\le k-1}\|\nabla f(x^t)\|^2
\le \frac{2\beta(f(x^0)-f_{\inf})}{k}.
$$

Interpretation: GD finds an approximately stationary point at $O(1/k)$ in gradient-squared metric.

## 6) Smooth convex guarantee

Under convexity and smoothness:

$$
f(x^k)-f^*\le \frac{\beta\|x^0-x^*\|^2}{2k}.
$$

So objective gap is sublinear $O(1/k)$.

## 7) Smooth strongly convex guarantee

Add $\alpha$-strong convexity and get linear convergence:

$$
\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2,
$$

for valid $\eta$ (e.g. $\eta\le 1/\beta$).

Condition number $\kappa=\beta/\alpha$ controls speed.

## 8) Why this lecture is a template

Every later method tweaks one piece of GD:

- Feb 5/10: replace gradient with subgradient
- Feb 12: add projection for constraints
- Feb 19: replace exact gradient with stochastic estimator

So Jan 29 is the reference model for all comparisons.

## Checkpoint

You should be able to explain:

- why fixed step can fail on nonsmooth $|x|$
- difference between nonconvex stationarity guarantee and convex objective-gap guarantee
- how $\kappa$ affects linear rate in least squares

## Common mistakes

- saying "$O(1/k)$" without specifying metric
- using smooth-GD guarantees on nonsmooth objectives
- ignoring admissible range of $\eta$

## One-paragraph recap

Jan 29 turns optimization from geometry into algorithmics: a simple update rule, but fundamentally different convergence behavior depending on smoothness, convexity, strong convexity, and step-size choice.
