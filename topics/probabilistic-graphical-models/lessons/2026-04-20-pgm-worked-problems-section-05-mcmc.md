# PGM Worked Problems 5: MCMC

Use with [[2026-04-20-pgm-exam-prep-section-05-mcmc]] and [[2026-04-20-pgm-memory-05-mcmc]].

## Table of Contents

- [[#Problem 5.1: Stationary Distribution vs Detailed Balance]]
- [[#Problem 5.2: A Metropolis-Hastings Acceptance Ratio]]
- [[#Problem 5.3: What Gibbs Sampling Is Really Doing]]

## Problem 5.1: Stationary Distribution vs Detailed Balance

What is the difference between a stationary distribution and the detailed-balance condition?

### Solution

A stationary distribution $\pi$ satisfies
$$
\pi = \pi P,
$$
meaning that if the chain starts in distribution $\pi$, it stays in distribution $\pi$ after one step.

Detailed balance is the stronger condition
$$
\pi(x)P(x,y)=\pi(y)P(y,x)
$$
for all states $x,y$.

Detailed balance implies stationarity, but stationarity does not require detailed balance.

So:

- stationarity says the whole distribution is unchanged after one step
- detailed balance says probability flow is balanced pairwise between every two states

## Problem 5.2: A Metropolis-Hastings Acceptance Ratio

Suppose the proposal is symmetric:
$$
q(x' \mid x)=q(x \mid x').
$$

Show how the Metropolis-Hastings acceptance ratio simplifies.

### Solution

The general MH acceptance probability is
$$
\alpha(x,x')
=
\min\left(1,\frac{\pi(x')q(x \mid x')}{\pi(x)q(x' \mid x)}\right).
$$

If the proposal is symmetric, then
$$
q(x' \mid x)=q(x \mid x').
$$

So the proposal terms cancel:
$$
\alpha(x,x')
=
\min\left(1,\frac{\pi(x')}{\pi(x)}\right).
$$

This is why random-walk MH often has a simple acceptance ratio.

## Problem 5.3: What Gibbs Sampling Is Really Doing

Why is Gibbs sampling often described as an MCMC method that is especially natural for graphical models?

### Solution

Gibbs sampling updates one variable or one block at a time from its conditional distribution given the rest:
$$
x_i^{(t+1)} \sim p(x_i \mid x_{-i}^{(t)}).
$$

This is natural in graphical models because those conditionals are often determined only by a local neighborhood in the graph.

So the graph structure helps because:

- the conditional distribution can often be computed from nearby factors
- we do not need to manipulate the full joint at every step

That makes Gibbs sampling feel “graph-native” in a way that fits the whole PGM viewpoint.
