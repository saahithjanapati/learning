# SGD Memory Sheet

Use with [[2026-04-14-exam-2-section-01-sgd]].

## Table of Contents

- [[#Core Objects]]
- [[#Canonical Examples]]
- [[#Rates and Quantities]]
- [[#What Causes the Error Floor]]
- [[#Warm-Up Example Facts]]
- [[#Proof Ingredients To Memorize]]
- [[#Likely Exam Traps]]


## Core Objects
- Objective: minimize $f(x)$ using an unbiased stochastic gradient $g(x;\xi)$.
- Unbiasedness: $\mathbb{E}[g(x;\xi)\mid x]=\nabla f(x)$ or, in the nonsmooth case, $\mathbb{E}[g(x;\xi)\mid x]\in\partial f(x)$.
- Update: $x^{t+1}=x^t-\eta_t g(x^t;\xi_t)$.
- $\eta_t$ is the stepsize. $\xi_t$ is the fresh randomness.
- $G$ is a bound on stochastic-gradient size or second moment, not the noise itself.

## Canonical Examples
- Finite sum: if $f(x)=\frac1n\sum_{i=1}^n f_i(x)$ and $\xi_t\sim\mathrm{Unif}\{1,\dots,n\}$, then $g(x;\xi_t)=\nabla f_{\xi_t}(x)$ is unbiased.
- ERM: per-example gradient is the stochastic gradient.
- Mini-batch: average of sampled component gradients; larger batch lowers variance but costs more.
- Mean estimation: for $f(x)=\frac12\mathbb{E}(X-x)^2$, use $g(x;X)=x-X$.

## Rates and Quantities
- Quick table:

| Setting | Assumptions | Step size | Quantity controlled | Full inequality | Rate shorthand |
| --- | --- | --- | --- | --- | --- |
| Running-average warm-up | Mean-estimation example with $g(x;X)=x-X$ | $\eta_t=\frac{1}{t+1}$ | $f(x^n)-f(x^*)$ | $f(x^n)-f(x^*)=\frac{\sigma^2}{2n}$ | $O(1/n)$ |
| Convex nonsmooth SGD | Convexity, unbiased stochastic subgradient, bounded second moment | $\eta=\frac{\sqrt{R}}{G\sqrt{k}}$ | $\mathbb{E}[f(\bar x_k)]-f(x^*)$ | $\mathbb{E}[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt{R}}{\sqrt{k}}$ | $O(1/\sqrt{k})$ |
| Strongly convex SGD, fixed step | $\alpha$-strong convexity, unbiased stochastic gradients, bounded second moment | fixed $\eta<1/\alpha$ | $\mathbb{E}\|x^k-x^*\|^2$ | $\mathbb{E}\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}$ | linear contraction to an error floor |
| Strongly convex SGD, decaying step | Same strong-convexity assumptions | $\eta_t=\frac{1}{\alpha(t+1)}$ | $\mathbb{E}[f(\bar x_k)]-f(x^*)$ | $\mathbb{E}[f(\bar x_k)]-f(x^*)\le \frac{G^2(1+\log k)}{2\alpha k}$ | $O((1+\log k)/k)$ |
|                                    |                                                                                 |                                   |                                  |                                                         |

- Convex nonsmooth SGD: the theorem controls $\mathbb{E}[f(\bar x_k)]-f(x^*)$, not $\|x^k-x^*\|$.
- Bound: $\mathbb{E}[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt{R}}{\sqrt{k}}$.
- Strongly convex fixed-step SGD: controls $\mathbb{E}\|x^k-x^*\|^2$.
- Fixed-step bound: $\mathbb{E}\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}$.
- Strongly convex decreasing-step SGD: controls averaged function value.
- Bound: $\mathbb{E}[f(\bar x_k)]-f(x^*)\le \frac{G^2(1+\log k)}{2\alpha k}$.

## What Causes the Error Floor
- Identity: $\mathbb{E}\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi))$.
- Even near the optimum, the variance term need not vanish.
- Therefore fixed-step SGD usually converges only to a neighborhood of $x^*$.
- Smoothness alone does not remove this issue.

## Warm-Up Example Facts
- For $f(x)=\frac12\mathbb{E}\|X-x\|^2$, the minimizer is $x^*=\mu=\mathbb{E}[X]$.
- With $\eta_t=1/(t+1)$, SGD becomes the running average.
- After $n$ samples, $x^n=\frac1n\sum_{i=1}^n X_i$.
- Excess objective scales like $\sigma^2/(2n)$.

## Proof Ingredients To Memorize
- Distance expansion: $\|a-b\|^2=\|a\|^2-2a^Tb+\|b\|^2$.
- Tower property: $\mathbb{E}[\mathbb{E}[Z\mid x^t]]=\mathbb{E}[Z]$.
- Subgradient inequality: if $g\in\partial f(x)$, then $f(y)\ge f(x)+g^T(y-x)$.
- Convexity of averages: $f(\bar x_k)\le \frac1k\sum_{t=1}^k f(x^t)$.
- Telescoping distance sums are what turn one-step progress into a $k$-step bound.

## Likely Exam Traps
- Giving only the rate and not the quantity that converges.
- Confusing $g(x;\xi)$ with an estimate of $f(x)$ instead of an estimate of the gradient.
- Confusing $\eta_t$ and $\xi_t$.
- Treating $G$ as the noise instead of a bound.
- Forgetting that averaging appears in the convex theorem.
- Saying strongly convex SGD has deterministic-style linear convergence to $x^*$.
