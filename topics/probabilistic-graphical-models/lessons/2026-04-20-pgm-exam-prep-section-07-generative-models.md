# 7. GANs, Score Matching, NCE, and Diffusion

## Table of Contents

- [[#0. How To Read This Section]]
- [[#7.0 Why This Whole Cluster Belongs Together]]
- [[#7.1 GANs]]
- [[#7.2 Wasserstein vs Standard GAN Intuition]]
- [[#7.3 Score Matching]]
- [[#7.4 Noise Contrastive Estimation]]
- [[#7.5 Diffusion Models]]
- [[#7.6 Predictor-Corrector Sampling]]
- [[#7.7 Probability Flow ODE]]
- [[#7.8 What To Remember]]

## 0. How To Read This Section

This section can feel like the most disconnected part of the course, so it helps to fix the common theme first.

All of these methods are alternative ways to train or sample from hard probabilistic models when classical normalized likelihood is inconvenient.

If you are trying not to get overwhelmed, keep one sentence for each method:

- GANs: adversarial training
- score matching: learn the score directly
- NCE: compare data to noise
- diffusion: learn to reverse noise

## 7.0 Why This Whole Cluster Belongs Together

These lectures are all different ways to build or train generative models without doing exact normalized likelihood computation in the classical way.

The recurring problem is:

- we want to model complex data
- exact normalization or exact likelihood optimization can be hard

Different methods respond differently:

- GANs use adversarial training
- score matching trains score fields directly
- NCE turns density estimation into classification
- diffusion uses noise-based training and reverse-time generation

## 7.1 GANs

GANs train two players:

- a generator
- a discriminator

The generator tries to produce realistic samples.
The discriminator tries to distinguish real data from generated data.

The standard idealized story is:

- with enough capacity and an optimal discriminator, the generator is pushed toward the data distribution

But this idealized story does not mean training is easy in practice.

## 7.2 Wasserstein vs Standard GAN Intuition

One of the main conceptual points is that changing the objective changes the geometry of the optimization problem.

The standard GAN story is tied to a Jensen-Shannon divergence viewpoint.
Wasserstein GAN changes the training signal and often helps with gradient problems.

At exam level, the point is not to memorize every implementation detail. It is to understand:

- why the loss function matters
- why different distances lead to different gradient behavior

## 7.3 Score Matching

For an energy-based model,
$$
p_\theta(x)\propto \exp(-E_\theta(x)),
$$
the partition function is hard.

Score matching avoids needing the partition function by matching score information instead:
$$
\nabla_x \log p_\theta(x).
$$

The classic takeaway is:

- score matching avoids direct partition-function gradients
- but it requires derivatives with respect to the data variable

This is exactly why practice questions often ask what derivatives are needed.

## 7.4 Noise Contrastive Estimation

NCE turns density estimation into a classification problem:

- data versus noise

The model learns by distinguishing true data from samples drawn from a chosen noise distribution.

The beginner-level conceptual point is:

- you can estimate an unnormalized model by comparing it to noise
- the quality of the noise choice matters

## 7.5 Diffusion Models

Diffusion models learn to reverse a gradual noising process.

The basic story is:

1. add noise forward
2. learn how to reverse that corruption
3. generate by running the learned reverse process

This links naturally to score-based modeling because the reverse dynamics depend on score information.

## 7.6 Predictor-Corrector Sampling

The predictor-corrector scheme combines two ideas:

- predictor: take a reverse-time SDE or ODE step
- corrector: do a few local MCMC-style refinement steps, often Langevin-like

The important conceptual point is:

the corrector is not a separate model. It is an additional sampling refinement step at a fixed noise level.

## 7.7 Probability Flow ODE

The probability flow ODE is the deterministic counterpart to the stochastic diffusion dynamics.

Why it matters:

- likelihood evaluation becomes easier to analyze
- sampling can be faster in some settings
- inversion or latent-trajectory reasoning becomes possible

So the class was highlighting that diffusion has both:

- stochastic interpretation
- deterministic ODE interpretation

## 7.8 What To Remember

- GANs use adversarial training, not explicit likelihood
- Wasserstein changes the training geometry
- score matching avoids partition-function gradients
- NCE reframes density estimation as classification against noise
- diffusion learns to reverse noise
- predictor-corrector uses reverse dynamics plus local correction steps
- the probability flow ODE gives a deterministic view of diffusion
