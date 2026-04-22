# 7. GANs, Score Matching, NCE, and Diffusion

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#7.0 Why These Topics Are Grouped Together]]
- [[#7.1 GANs, Slowly]]
- [[#7.2 Why Wasserstein Changes the Story]]
- [[#7.3 Score Matching, Slowly]]
- [[#7.4 Sliced and Denoising Score Matching]]
- [[#7.5 NCE, Slowly]]
- [[#7.6 Diffusion, Slowly]]
- [[#7.7 Predictor-Corrector Sampling]]
- [[#7.8 Probability Flow ODE]]
- [[#7.9 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is about several different ways to build or train generative models when straight-up maximum likelihood is inconvenient.

The methods look very different on the surface.

But they are all reacting to the same problem:

- the data distribution is complicated
- exact normalized likelihood may be hard to optimize or even awkward to define usefully

So this section is best read as:

`different workarounds for hard generative modeling`

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 17`
- `Lecture 19`
- `Lecture 20`
- `Lecture 21`

The biggest risk in this section is that all the objective functions blur together.

So for each method, keep asking:

- what object is being learned?
- what loss is being optimized?
- what hard quantity is being avoided?

If you do that, the section becomes much easier to organize.

## 7.0 Why These Topics Are Grouped Together

Here is the one-line summary for each method:

- GANs: learn by adversarially matching model and data
- score matching: learn the score instead of the normalized density
- NCE: turn density estimation into data-vs-noise classification
- diffusion: learn how to reverse progressive noising

So the unifying idea is not that these are identical.
The unifying idea is that they are all alternative routes to powerful generative modeling.

## 7.1 GANs, Slowly

A GAN has two players:

- a generator
- a discriminator

The generator tries to produce fake samples that look real.
The discriminator tries to tell real data from generated data.

The classic objective is
$$
\min_G \max_D
\left[
\mathbb{E}_{x\sim p_{data}}\log D(x)
+
\mathbb{E}_{z\sim p(z)}\log(1-D(G(z)))
\right].
$$

Here is the plain-English interpretation:

- the discriminator is a classifier
- the generator tries to fool that classifier

That is why GANs feel game-theoretic.

### What the idealized theory says

If the discriminator is optimal and the models have enough capacity, the generator is effectively pushed toward the data distribution.

In the standard idealized analysis, the resulting generator objective is tied to Jensen-Shannon divergence.

That is a very common exam statement.

## 7.2 Why Wasserstein Changes the Story

The problem with the standard GAN story is that the geometry of the objective can be bad.

In particular, when the model distribution and data distribution live on disjoint supports, the Jensen-Shannon divergence can flatten out in a way that gives poor gradient signal.

The course made this concrete with simple examples:

- JS can saturate
- Wasserstein still reflects how far the distributions are from each other

So Wasserstein GAN matters because it changes the geometry of the learning problem.

The takeaway is not “Wasserstein is magic.”
The takeaway is:

different distance notions give different optimization behavior.

## 7.3 Score Matching, Slowly

Suppose your model is an energy-based model
$$
q_\theta(x)\propto \exp(f_\theta(x)).
$$

The difficult part of normalized likelihood is the partition function.

Score matching avoids this by focusing on the **score**
$$
\nabla_x \log q_\theta(x).
$$

Why is that helpful?

Because differentiating with respect to `x` kills off the partition function term, which does not depend on `x`.

So the model can learn something about the shape of the density without ever explicitly handling the normalizing constant in the same way as ordinary MLE.

### Why integration by parts matters

The course does not just say “match scores.”
It also uses integration by parts so the final objective depends only on:

- samples from the data
- model-side score quantities and their derivatives

That is what makes score matching practically usable.

So do not treat integration by parts as a side trick.
It is central to why the method works.

## 7.4 Sliced and Denoising Score Matching

The basic score-matching objective can be expensive because it involves derivatives of the score field.

Two important variants help.

### Sliced score matching

This uses random projections to make the derivative calculations cheaper.

Plain-English meaning:

instead of looking at the whole high-dimensional derivative structure directly, look at random directional slices of it.

### Denoising score matching

Instead of learning the score of the raw data distribution directly, first perturb the data with noise and learn the score of the noised version.

Why is that helpful?

- noisy distributions are smoother
- score estimation becomes easier
- this sets up the ideas used later in diffusion models

## 7.5 NCE, Slowly

Noise Contrastive Estimation turns density estimation into binary classification.

You give the learner:

- data samples
- noise samples from a known noise distribution

and ask it to distinguish data from noise.

The surprising idea is that if you set up the classifier correctly, learning to distinguish data from noise can recover parameters of an unnormalized probabilistic model.

So NCE is saying:

`I will avoid direct normalized likelihood by comparing data against a reference noise distribution`

### Important caution

A common mistaken intuition is:

- “make the noise as different from the data as possible”

That is not generally good.

If the discrimination problem becomes too easy, the learning signal can become weak and uninformative.

So with NCE, the choice of noise matters.

## 7.6 Diffusion, Slowly

Diffusion models begin from a very different-looking idea:

- add noise to data gradually
- then learn how to reverse that noising process

The forward process is easy.
The reverse process is the hard learned part.

Why does this connect to score matching?

Because the reverse dynamics can be expressed in terms of score information about the noisy distributions.

So diffusion is not isolated from the rest of the section.
It is deeply tied to score-based modeling.

The plain-English version is:

learn how slightly corrupted data should be denoised, and then repeat that idea across many noise levels.

## 7.7 Predictor-Corrector Sampling

Predictor-corrector is a sampling strategy used in score-based diffusion-style models.

### Predictor

Take a reverse-time step using the learned model dynamics.

### Corrector

At the current noise level, do a few local refinement steps, often Langevin-like.

The corrector is there because:

- the predictor gets you in roughly the right direction
- the corrector locally sharpens the sample

So this is another place where the course combines ideas from different units:

- diffusion-style reverse dynamics
- local MCMC-style refinement

## 7.8 Probability Flow ODE

The probability flow ODE is the deterministic cousin of the stochastic diffusion dynamics.

Why does the course care about it?

Because it gives:

- a deterministic view of the same marginal evolution
- a route to likelihood and change-of-variables reasoning
- a different way to think about sampling trajectories

So the key phrase is:

`deterministic counterpart to the diffusion dynamics`

## 7.9 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say:

> These methods are different ways to do powerful generative modeling without relying on straightforward normalized likelihood in the classical way. GANs learn through adversarial competition, and Wasserstein changes the optimization geometry. Score matching learns the score rather than the density itself. NCE turns density learning into a classification problem against noise. Diffusion learns how to reverse a noising process, and predictor-corrector plus probability-flow ideas explain different ways to sample from those learned dynamics.

If you can say that clearly, the section has become much less of a blur.

## Formal Anchors

These are the objective-level facts that make the section rigorous.

### Classical GAN objective

The minimax GAN objective is
$$
\min_G \max_D
\left[
\mathbb{E}_{x\sim p_{data}}\log D(x)
+
\mathbb{E}_{z\sim p(z)}\log(1-D(G(z)))
\right].
$$

In the idealized analysis, if the discriminator is optimized exactly, the generator is pushed toward the data distribution and the value function is connected to Jensen-Shannon divergence.

### Wasserstein GAN objective

WGAN replaces the discriminator with a `1`-Lipschitz critic and optimizes an objective motivated by Wasserstein-1 distance.

At a high level, the critic objective takes the form
$$
\max_{\|f\|_L \le 1}
\left[
\mathbb{E}_{x\sim p_{data}} f(x)
-
\mathbb{E}_{x\sim p_G} f(x)
\right].
$$

The key point is not the exact dual form to memorize, but that changing the divergence or distance notion changes gradient geometry and can improve optimization behavior when supports are poorly aligned.

### Score function

The score of a density is
$$
\nabla_x \log p(x).
$$

For unnormalized models, differentiating with respect to `x` removes additive log-normalization constants, which is why score-based objectives can avoid the partition function in a direct way.

### Score matching

The goal is to learn the model score field rather than the normalized density itself.
One standard score-matching objective can be written in the Hyvarinen form
$$
J(\theta)
=
\mathbb{E}_{p_{data}}
\left[
\frac{1}{2}\|s_\theta(x)\|^2 + \nabla \cdot s_\theta(x)
\right],
$$
where $s_\theta(x)$ is the model score field.

Integration by parts converts the objective into one that can be estimated from data and model score derivatives.

### Noise Contrastive Estimation

NCE turns density learning into a data-versus-noise classification problem.
The model learns by comparing observed samples to samples from a known noise distribution.

### Diffusion view

Diffusion models define a forward noising process and learn a reverse denoising process.
The reverse dynamics are closely tied to score estimation on noisy distributions.

In discrete-time form, the forward process is often written as a simple Gaussian corruption chain
$$
q(x_t\mid x_{t-1}),
$$
and training learns a reverse model that undoes this corruption step by step.

### Probability flow ODE

The probability flow ODE is a deterministic dynamical system whose marginal density evolution matches that of the corresponding stochastic diffusion process.

That is why it provides a deterministic counterpart to diffusion sampling.

## Worked Problems

### Problem 7.1

What are GANs trying to learn, and what role does the discriminator play?

### Solution

GANs try to learn a generator whose samples match the data distribution.
The discriminator acts as a classifier that tries to distinguish real data from generated samples.

The generator learns by trying to fool the discriminator, so the training signal comes from adversarial comparison rather than direct likelihood maximization.

### Problem 7.2

Why can Wasserstein-based training behave better than the original GAN objective when model and data supports are far apart?

### Solution

In the original GAN analysis, Jensen-Shannon divergence can saturate when the two distributions have disjoint or nearly disjoint support, which can lead to weak gradients.

Wasserstein distance still reflects how far the two distributions are from each other in a geometric sense, so its optimization signal can remain informative even when support mismatch is severe.

### Problem 7.3

Why does score matching avoid the partition-function difficulty of an energy-based model?

### Solution

Because it focuses on
$$
\nabla_x \log q_\theta(x).
$$

If
$$
\log q_\theta(x)=f_\theta(x)-\log Z_\theta,
$$
then differentiating with respect to `x` removes the constant term $\log Z_\theta$, since it does not depend on `x`.

So the score can be learned without handling the normalizer in the same direct way as maximum likelihood.

### Problem 7.4

Why is integration by parts central in score matching rather than just a minor algebra trick?

### Solution

Because the raw score-matching objective would involve derivatives of the unknown data density.
Integration by parts rewrites the objective into a form involving only model quantities and data samples, which is what makes the method practical.

### Problem 7.5

What is the basic idea of NCE?

### Solution

NCE reframes density estimation as binary classification between:

- real data samples
- noise samples from a known reference distribution

If the classification problem is set up properly, fitting that classifier can recover parameters of an unnormalized probabilistic model.

### Problem 7.6

Why is denoising score matching conceptually tied to diffusion models?

### Solution

Denoising score matching learns score information for noisy versions of the data distribution.
Diffusion models also work with a sequence of increasingly noised distributions and learn how to reverse that corruption.

So diffusion models can be understood as building a generative process from score information across noise levels.

### Problem 7.7

What is the difference between predictor-corrector sampling and the probability flow ODE viewpoint?

### Solution

Predictor-corrector sampling is a stochastic sampling strategy:

- predictor steps follow the learned reverse dynamics
- corrector steps perform local refinement, often Langevin-like

The probability flow ODE instead gives a deterministic trajectory whose marginal density evolution matches the diffusion process.

So one is stochastic sample refinement, and the other is a deterministic counterpart to the same density evolution.
