# PGM Memory Sheet 5: MCMC

Use with [[2026-04-20-pgm-exam-prep-section-05-mcmc]].

## Core Goal

- build a Markov chain whose stationary distribution is the target distribution

## Key Definitions

- stationary distribution
- detailed balance
- mixing

## Metropolis-Hastings

$$
\alpha(i,j)=\min\left(1,\frac{\pi_j q(j,i)}{\pi_i q(i,j)}\right)
$$

- accept or reject proposed moves
- normalization constants cancel

## Gibbs Sampling

- update one coordinate from its full conditional
- special case of MH with acceptance probability 1

## Advanced Theme

- HMC and simulated tempering both use extended state spaces

## Likely Traps

- confusing stationarity with rapid mixing
- forgetting that multimodality and high dimension make local chains struggle
- forgetting why Gibbs has acceptance 1

