# PGM Practice Problems 7 Answer Key: GANs, Score Matching, NCE, and Diffusion

Use with [[2026-04-20-pgm-practice-problems-section-07-generative-models]].

## Table of Contents

- [[#Solution 7.1]]
- [[#Solution 7.2]]
- [[#Solution 7.3]]
- [[#Solution 7.4]]

## Solution 7.1

The correct matching is:

- GAN $\to$ a generator trained against a discriminator
- score matching $\to$ the score $\nabla_x \log p(x)$
- NCE $\to$ a classifier that separates data from noise
- diffusion model $\to$ a denoising / reverse-noise process

## Solution 7.2

Score matching is attractive because it works with the score
$$
\nabla_x \log p_\theta(x),
$$
and for energy-based models the partition-function term disappears when differentiating with respect to $x$. So it can avoid directly computing the global normalizer.

## Solution 7.3

The standard GAN story is built around a discriminator that tries to distinguish real from fake, while the generator tries to fool it. The Wasserstein view instead emphasizes a smoother distance-like objective between model and data distributions. Conceptually, the point is to make training geometry better behaved than the original discriminator-based objective often is.

## Solution 7.4

In the forward process, noise is gradually added to data. In the reverse process, the model learns how to remove that noise step by step. At generation time, we start from noise and repeatedly apply the learned reverse denoising process to obtain a sample.
