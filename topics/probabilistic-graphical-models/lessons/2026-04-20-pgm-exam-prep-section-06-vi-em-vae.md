# 6. Variational Inference, EM, and VAEs

## Table of Contents

- [[#0. How To Read This Section]]
- [[#6.0 Why Variational Inference Exists]]
- [[#6.1 ELBO and the Approximation View]]
- [[#6.2 Mean-Field Intuition]]
- [[#6.3 Gibbs Variational Principle and Free-Energy View]]
- [[#6.4 EM as Alternating Optimization]]
- [[#6.5 Variational EM]]
- [[#6.6 VAEs]]
- [[#6.7 REINFORCE vs Reparameterization]]
- [[#6.8 What To Remember]]

## 0. How To Read This Section

This section is about the optimization answer to the inference problem.

The clean conceptual path is:

1. VI turns posterior approximation into optimization
2. the ELBO is the objective that makes this work
3. EM is an alternating latent-variable optimization method
4. VAEs are the neural version of these latent-variable / ELBO ideas

If the section starts feeling abstract, come back to that four-step storyline.

## 6.0 Why Variational Inference Exists

Variational inference is the optimization-based alternative to MCMC.

Instead of sampling from a hard posterior, you:

1. choose a simpler family
$$
q(z)
$$
2. optimize within that family to approximate the true posterior
$$
p(z \mid x)
$$

So VI turns inference into optimization.

## 6.1 ELBO and the Approximation View

The ELBO is the central object:
$$
\log p(x)\ge \mathcal{L}(q).
$$

The point is:

- maximizing the ELBO gives the best approximation inside the chosen variational family
- the gap between $\log p(x)$ and the ELBO is a KL divergence term

This is one of the central organizing ideas of the whole late-middle course.

## 6.2 Mean-Field Intuition

Mean-field VI uses a factorized approximating family, such as
$$
q(z)=\prod_i q_i(z_i).
$$

The approximation becomes easier to optimize, but it may be too restrictive.

This creates the standard tradeoff:

- simpler family
- easier optimization
- worse approximation quality

## 6.3 Gibbs Variational Principle and Free-Energy View

The Gibbs variational principle is the deeper reason variational inference exists.

It says that quantities like $\log Z$ can be written as optimization problems over distributions.

The high-level message is:

normalization constants and log evidence can often be attacked indirectly by optimizing a free-energy-like objective.

This is the bridge to:

- mean-field VI
- Bethe free energy
- loopy BP connections

## 6.4 EM as Alternating Optimization

Expectation-Maximization is an alternating procedure for latent-variable models.

The simplest story is:

- E-step: infer the latent variables under the current parameters
- M-step: update the parameters using the current latent-variable distribution

So EM alternates between inference and learning.

## 6.5 Variational EM

If the exact posterior in the E-step is intractable, you replace it with a variational approximation.

That gives variational EM.

So the relationship is:

- EM uses exact posterior inference in the inner step
- variational EM uses approximate posterior inference

## 6.6 VAEs

A VAE is a neural latent-variable model trained with the ELBO.

There are two learned parts:

- decoder / generative model
  $$
  p_\theta(x,z)
  $$
- encoder / variational posterior
  $$
  q_\phi(z \mid x)
  $$

So a VAE is really:

- latent-variable modeling
- plus amortized variational inference

## 6.7 REINFORCE vs Reparameterization

This was a very exam-like distinction in the practice material.

Use REINFORCE when:

- you can sample from $q_\phi$
- you can evaluate and differentiate
  $$
  \log q_\phi(z \mid x)
  $$
- but you do not have a differentiable reparameterization through $z$

Use reparameterization when:

- $z$ is continuous
- you can write
  $$
  z=g_\phi(\epsilon, x)
  $$
- and backpropagate through that transformation

So the intuition is:

- REINFORCE is more general but noisier
- reparameterization is more structured and usually lower variance

## 6.8 What To Remember

- VI turns inference into optimization
- ELBO is the central objective
- mean-field is a factorized approximation family
- EM alternates inference and parameter updates
- variational EM replaces exact inference by approximate inference
- VAE = ELBO + neural encoder/decoder
- REINFORCE vs reparameterization depends on the latent-variable structure
