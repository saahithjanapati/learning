# PGM Memory Sheet 6: VI, EM, and VAEs

Use with [[2026-04-20-pgm-exam-prep-section-06-vi-em-vae]].

## Core Variational Idea

- replace hard posterior inference by optimization over a simpler family

## ELBO

$$
\log p(x)\ge \mathcal{L}(q)
$$

- maximizing ELBO improves the approximation within the variational family

## Mean-Field

$$
q(z)=\prod_i q_i(z_i)
$$

- easier optimization, weaker approximation

## EM

- E-step: latent inference
- M-step: parameter update

## Variational EM

- same alternating pattern, but approximate posterior in the E-step

## VAE

- latent-variable model + amortized variational inference

## Gradient Estimators

- REINFORCE: general, often noisy
- reparameterization: continuous latent variables with differentiable pathwise form

## Likely Traps

- confusing EM with VI
- forgetting that ELBO is a lower bound
- mixing up when REINFORCE versus reparameterization applies

