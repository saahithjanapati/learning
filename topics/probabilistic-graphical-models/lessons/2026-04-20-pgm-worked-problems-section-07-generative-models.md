# PGM Worked Problems 7: GANs, Score Matching, NCE, and Diffusion

Use with [[2026-04-20-pgm-exam-prep-section-07-generative-models]] and [[2026-04-20-pgm-memory-07-generative-models]].

## Table of Contents

- [[#Problem 7.1: What Each Method Learns]]
- [[#Problem 7.2: Why Score Matching Avoids the Partition Function]]
- [[#Problem 7.3: Diffusion at the Highest Level]]

## Problem 7.1: What Each Method Learns

Match each method to the object it most directly tries to learn:

1. GAN
2. score matching
3. NCE
4. diffusion model

Possible targets:

- a classifier that distinguishes data from noise
- the score $\nabla_x \log p(x)$
- a generator that fools a discriminator
- a denoising / reverse-noise process

### Solution

The correct matching is:

1. GAN $\to$ a generator that fools a discriminator
2. score matching $\to$ the score $\nabla_x \log p(x)$
3. NCE $\to$ a classifier that distinguishes data from noise
4. diffusion model $\to$ a denoising / reverse-noise process

This is a good memory exercise because these methods can feel like one big late-course blur if you do not separate the core learning target.

## Problem 7.2: Why Score Matching Avoids the Partition Function

Why is score matching attractive for energy-based models with difficult normalizing constants?

### Solution

In an energy-based model,
$$
p_\theta(x)=\frac{1}{Z_\theta}\exp(-E_\theta(x)).
$$

Taking the log gives
$$
\log p_\theta(x)=-E_\theta(x)-\log Z_\theta.
$$

Now take a gradient with respect to $x$:
$$
\nabla_x \log p_\theta(x)=-\nabla_x E_\theta(x).
$$

The term $\log Z_\theta$ disappears because it does not depend on $x$.

That is the key attraction: the score can often be worked with without explicitly computing the partition function.

## Problem 7.3: Diffusion at the Highest Level

What is the main training-and-generation story behind diffusion models?

### Solution

At a high level, diffusion models do two conceptually opposite things.

During the forward process, noise is gradually added to data until the sample becomes very noisy and eventually easy to model.

During generation, the model learns a reverse process that removes noise step by step.

So the story is:

- corrupt data by gradually adding noise
- learn how to reverse that corruption
- sample by starting from noise and repeatedly denoising
