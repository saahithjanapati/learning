# Optimization for ML - February 19, 2026

## Expository Deep Dive: Stochastic Gradient Descent (SGD)

Source transcript: `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`

## How to read this lesson

Read this lecture as the stochastic version of Jan 29 GD. The update looks similar, but noise changes both behavior and rates.

## 1) Core setup

We want to minimize differentiable $f$, but exact gradient is expensive. Instead we use an unbiased estimator:

$$
\mathbb E[g(x;\xi)]=\nabla f(x).
$$

SGD update:

$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t).
$$

Same shape as GD, but now every step has randomness.

## 2) Why fixed step size is dangerous in SGD

At optimum $x^*$, true gradient is zero, but stochastic gradient may still have variance. So with fixed step size, iterates can keep bouncing.

This is the lecture's central warning and the reason decaying schedules appear naturally.

## 3) Sources of unbiased stochastic gradients

The lecture gives several concrete constructions:

- additive noise model: $g=\nabla f+\xi$, $\mathbb E\xi=0$
- finite-sum sampling: choose random component gradient
- ERM single-example gradient
- mini-batch average gradient (variance-compute tradeoff)

These are not different algorithms; they are different stochastic oracles for the same SGD template.

## 4) Warm-up: sample mean as SGD

For

$$
\min_x \frac12\sum_{i=1}^n\|X_i-x\|^2,
$$

with $\eta_t=1/(t+1)$, the recursion becomes moving average and gives exactly

$$
x^n=\frac1n\sum_{i=1}^n X_i.
$$

This warm-up is important because it shows SGD can be both computationally and statistically optimal in a simple setting.

## 5) Population risk interpretation and statistical rate

For population objective $\frac12\mathbb E\|X-x\|^2$, lecture shows excess objective of sample-mean iterate scales as

$$
f(x^n)-f(x^*)=\frac{\sigma^2}{2n}=O(1/n).
$$

So SGD's one-pass behavior can match classical estimation limits.

## 6) Convex nonsmooth SGD theorem

Assumptions include convexity, unbiased subgradient in expectation, bounded second moment, and bounded initial distance.

With horizon-tuned fixed step size

$$
\eta=\frac{\sqrt R}{G\sqrt k},
$$

averaged iterate satisfies

$$
\mathbb E[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt R}{\sqrt k}.
$$

Rate: $O(1/\sqrt k)$.

## 7) Strongly convex SGD theorem

Under strong convexity and bounded second moments:

### Fixed step $\eta<1/\alpha$

$$
\mathbb E\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}.
$$

Interpretation: fast transient + noise floor.

### Decaying step $\eta_t=1/(\alpha(t+1))$

$$
\mathbb E f\left(\frac1k\sum_{t=1}^k x^t\right)-f(x^*)
\le
\frac{G^2(1+\log k)}{2\alpha k}.
$$

Interpretation: averaged iterates get near-$1/k$ behavior (up to log).

## 8) Variance decomposition is the key intuition

The lecture highlights:

$$
\mathbb E\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi)).
$$

Near optimum, gradient term shrinks but variance may not. This is why plain fixed-step SGD is not deterministic GD.

## 9) Practical reading of the theory

A common practical schedule logic follows directly from lecture:

1. run with fixed step for fast progress
2. once bouncing/plateau appears, reduce step size
3. continue in stages

This is the algorithmic reflection of transient-plus-noise-floor theory.

## Checkpoint

You should be able to answer quickly:

- Why does fixed-step SGD typically not converge exactly?
- Which rates correspond to convex nonsmooth vs strongly convex settings?
- Why are many guarantees written for averaged iterate $\bar x_k$?

## Common mistakes

- copying deterministic GD intuition directly to SGD
- swapping $1/\sqrt k$ and $(\log k)/k$ regimes
- forgetting theorem assumptions (unbiasedness and bounded second moment)

## One-paragraph recap

Feb 19 teaches that SGD is GD plus noise. Noise is what makes SGD scalable and efficient, but it also changes the best possible convergence behavior and forces careful step-size design.
