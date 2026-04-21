# PGM Practice Problems 6 Answer Key: VI, EM, and VAEs

Use with [[2026-04-20-pgm-practice-problems-section-06-vi-em-vae]].

## Table of Contents

- [[#Solution 6.1]]
- [[#Solution 6.2]]
- [[#Solution 6.3]]
- [[#Solution 6.4]]

## Solution 6.1

The identity is
$$
\log p(x)
=
\mathcal{L}(q)+\mathrm{KL}(q(z)\|p(z \mid x)).
$$

Since KL divergence is always nonnegative,
$$
\mathrm{KL}(q(z)\|p(z \mid x))\ge 0,
$$
it follows that
$$
\mathcal{L}(q)\le \log p(x).
$$

That is why the ELBO is a lower bound.

## Solution 6.2

The mean-field assumption says that the variational approximation factorizes into simpler independent pieces, for example
$$
q(z)=\prod_j q_j(z_j).
$$

This makes optimization easier because instead of searching over a completely general joint distribution, we optimize over a restricted family with simpler structure and often simpler coordinate updates.

## Solution 6.3

In the E-step, we estimate the hidden-variable distribution given the current parameters. In exact EM, this means computing the posterior over latent variables under the current model.

In the M-step, we update the parameters by maximizing the expected complete-data log-likelihood under that current hidden-variable distribution.

So EM alternates between latent-variable inference and parameter optimization.

## Solution 6.4

A score-function or REINFORCE estimator differentiates an expectation without needing to differentiate through the sample itself, so it is very general but often high variance.

A reparameterization-based estimator rewrites the sample as a differentiable transformation of noise, for example
$$
z=\mu+\sigma \odot \varepsilon.
$$

This usually gives lower-variance gradients in VAEs, which is why it is often preferred when applicable.
