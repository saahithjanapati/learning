# PGM Practice Problems 6: VI, EM, and VAEs

Use with [[2026-04-20-pgm-exam-prep-section-06-vi-em-vae]], [[2026-04-20-pgm-worked-problems-section-06-vi-em-vae]], [[2026-04-20-pgm-practice-problems-section-06-vi-em-vae-answer-key]], and [[2026-04-20-pgm-memory-06-vi-em-vae]].

These are unsolved practice problems for the variational-inference unit.

## Table of Contents

- [[#Problem 6.1]]
- [[#Problem 6.2]]
- [[#Problem 6.3]]
- [[#Problem 6.4]]

## Problem 6.1

State the identity relating
$$
\log p(x),\qquad \mathcal{L}(q),\qquad \mathrm{KL}(q(z)\|p(z \mid x)).
$$

Then explain in one sentence why the ELBO is a lower bound.

## Problem 6.2

What is the mean-field assumption in variational inference, and why can it make the optimization easier?

## Problem 6.3

Describe the E-step and M-step in EM at a high level.

Your answer should make clear what is being updated in each step.

## Problem 6.4

Explain the difference between:

1. a score-function / REINFORCE estimator
2. a reparameterization-based gradient estimator

Why is the latter often preferred in VAEs?
