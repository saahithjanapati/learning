# 10-715: Diffusion, Score Matching, And Generative Modeling

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-20-100_Intro_to_Denoising_Diffusion_1.md`, `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-24-115_Reverse_diffusion_1.md`, `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-26-130_ESM_DSM_2.md`, and related score-matching/diffusion papers in the processed source folder.

## Table of Contents

- [Why diffusion belongs in 10-715](#why-diffusion-belongs-in-10-715)
- [Density versus score](#density-versus-score)
- [Forward noising](#forward-noising)
- [Reverse denoising](#reverse-denoising)
- [Exact and denoising score matching](#exact-and-denoising-score-matching)
- [Quick Check](#quick-check)

## Why diffusion belongs in 10-715

Diffusion models can look like a sudden modern topic, but in this course they are a capstone. They combine probability, estimation, function approximation, optimization, and generalization.

The learning goal is not just "diffusion makes images." The goal is to understand how a model can learn to reverse a noising process and thereby generate samples from a data distribution.

## Density versus score

Classical generative modeling often tries to model a density `p(x)` directly. Score-based modeling instead focuses on the score:

```text
score(x) = grad_x log p(x)
```

The score points in the direction where log density increases most quickly. If you can estimate the score across noisy versions of the data distribution, you can use it to move samples from noise toward data-like regions.

This is why score estimation is central. The model does not need to produce a normalized density at every point if it can learn the vector field that guides denoising.

## Forward noising

The forward process gradually corrupts data with noise. After many steps, the sample becomes close to a simple noise distribution.

This side is designed by us. It is intentionally easy to sample from and analyze. The hard part is not adding noise; the hard part is learning how to reverse it.

A useful picture:

```text
data -> slightly noisy data -> very noisy data -> near pure noise
```

## Reverse denoising

Generation runs in the opposite direction:

```text
noise -> less noisy sample -> ... -> data-like sample
```

The reverse process needs information about how probability mass changes at each noise level. That is where the score enters.

The model is trained to estimate denoising directions. During sampling, these estimates guide a stochastic or deterministic procedure back toward the data distribution.

## Exact and denoising score matching

Exact score matching tries to fit the true score, but the true score is usually unknown. Denoising score matching creates a learnable objective by adding known noise and training the model to predict the score of the noisy conditional distribution.

The conceptual move is important:

- the true data score is hard to observe,
- the noising process is known,
- the denoising task creates supervised signal for score estimation.

This is a familiar 10-715 pattern: change the objective so the desired object becomes estimable from available data.

## Quick Check

1. What is the score of a distribution?
2. Why is the forward diffusion process easier than the reverse process?
3. Why does denoising score matching avoid needing direct access to the true data score?
4. How does diffusion connect probability modeling to function approximation?
