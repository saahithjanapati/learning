# PGM Practice Problems 7: GANs, Score Matching, NCE, and Diffusion

Use with [[2026-04-20-pgm-exam-prep-section-07-generative-models]], [[2026-04-20-pgm-worked-problems-section-07-generative-models]], [[2026-04-20-pgm-practice-problems-section-07-generative-models-answer-key]], and [[2026-04-20-pgm-memory-07-generative-models]].

These are unsolved practice problems for the late-course generative-models cluster.

## Table of Contents

- [[#Problem 7.1]]
- [[#Problem 7.2]]
- [[#Problem 7.3]]
- [[#Problem 7.4]]

## Problem 7.1

Match each method to the main object it most directly learns:

- GAN
- score matching
- NCE
- diffusion model

Targets:

- a denoising / reverse-noise process
- the score $\nabla_x \log p(x)$
- a classifier that separates data from noise
- a generator trained against a discriminator

## Problem 7.2

Why can score matching be attractive for energy-based models with difficult partition functions?

## Problem 7.3

Explain the highest-level difference between a standard GAN and a Wasserstein-style GAN.

You do not need a full theorem statement. Just explain what changes conceptually.

## Problem 7.4

Describe the forward and reverse stories in a diffusion model.

Your answer should explain what happens during training at a high level and how sampling works.
