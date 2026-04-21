# PGM Practice Problems 5 Answer Key: MCMC

Use with [[2026-04-20-pgm-practice-problems-section-05-mcmc]].

## Table of Contents

- [[#Solution 5.1]]
- [[#Solution 5.2]]
- [[#Solution 5.3]]
- [[#Solution 5.4]]

## Solution 5.1

A stationary distribution $\pi$ satisfies
$$
\pi=\pi P,
$$
meaning one transition step leaves the distribution unchanged.

Detailed balance is the stronger condition
$$
\pi(x)P(x,y)=\pi(y)P(y,x)
$$
for all states $x,y$.

Detailed balance implies stationarity, but stationarity does not require detailed balance.

## Solution 5.2

The Metropolis-Hastings acceptance probability is
$$
\alpha(x,x')
=
\min\left(1,\frac{\pi(x')q(x \mid x')}{\pi(x)q(x' \mid x)}\right).
$$

If the proposal is symmetric, then
$$
q(x' \mid x)=q(x \mid x'),
$$
so the proposal terms cancel and we get
$$
\alpha(x,x')
=
\min\left(1,\frac{\pi(x')}{\pi(x)}\right).
$$

## Solution 5.3

Gibbs sampling is natural in graphical models because each update samples one variable or block from its conditional distribution given the rest. In a graphical model, those conditionals are often determined by local neighboring structure rather than the entire graph. That makes Gibbs look especially well matched to graph-based probabilistic models.

## Solution 5.4

Multimodality is hard because the chain can get stuck near one mode and have trouble moving to another. High dimension is hard because probability mass can concentrate in complicated regions, proposal tuning becomes delicate, and naive local moves may explore the space very slowly. So both features can lead to poor mixing.
