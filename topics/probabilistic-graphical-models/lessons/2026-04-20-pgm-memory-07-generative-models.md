# PGM Memory Sheet 7: GANs, Score Matching, NCE, Diffusion

Use with [[2026-04-20-pgm-exam-prep-section-07-generative-models]].

## GANs

- generator vs discriminator game
- standard idealized GAN story tied to Jensen-Shannon viewpoint

## Wasserstein Theme

- changing the loss changes the training geometry
- often helps with gradient pathologies

## Score Matching

- avoids direct partition-function gradients
- uses derivatives with respect to data variable $x$

## NCE

- density estimation reframed as classification against noise

## Diffusion

- learn to reverse a noising process

## Predictor-Corrector

- predictor: reverse-time dynamics step
- corrector: local MCMC-style refinement at fixed noise level

## Probability Flow ODE

- deterministic counterpart to diffusion dynamics

## Likely Traps

- saying GANs provide tractable exact likelihoods
- forgetting which derivatives score matching needs
- thinking predictor and corrector require two separate learned models

