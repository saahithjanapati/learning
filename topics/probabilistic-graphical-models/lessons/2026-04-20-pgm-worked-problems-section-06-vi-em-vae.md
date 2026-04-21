# PGM Worked Problems 6: VI, EM, and VAEs

Use with [[2026-04-20-pgm-exam-prep-section-06-vi-em-vae]] and [[2026-04-20-pgm-memory-06-vi-em-vae]].

## Table of Contents

- [[#Problem 6.1: Why the ELBO Is a Lower Bound]]
- [[#Problem 6.2: What EM Is Alternating Between]]
- [[#Problem 6.3: REINFORCE vs Reparameterization]]

## Problem 6.1: Why the ELBO Is a Lower Bound

Explain why the ELBO is called a lower bound on $\log p(x)$.

### Solution

The standard identity is
$$
\log p(x)
=
\mathcal{L}(q)
+ \mathrm{KL}(q(z)\|p(z \mid x)).
$$

Here $\mathcal{L}(q)$ is the ELBO.

Because KL divergence is always nonnegative,
$$
\mathrm{KL}(q(z)\|p(z \mid x)) \ge 0,
$$
we get
$$
\mathcal{L}(q)\le \log p(x).
$$

So the ELBO is literally a lower bound on the log evidence.

The optimization goal in VI is to choose $q$ to make this bound as tight as possible.

## Problem 6.2: What EM Is Alternating Between

At a high level, what are the E-step and M-step doing in EM?

### Solution

In the E-step, we estimate the hidden-variable distribution using the current parameters. In the exact EM story, this means computing the posterior over latent variables under the current parameter setting.

In the M-step, we update the parameters by maximizing the expected complete-data log-likelihood under the distribution found in the E-step.

So the alternation is:

- E-step: infer hidden structure given parameters
- M-step: improve parameters given the current hidden-structure estimate

That is why EM is often described as alternating between inference and optimization.

## Problem 6.3: REINFORCE vs Reparameterization

What is the main advantage of the reparameterization trick relative to score-function / REINFORCE estimators in VAEs?

### Solution

The reparameterization trick rewrites a random latent variable as a deterministic function of noise and parameters, for example
$$
z=\mu+\sigma \odot \varepsilon,
\qquad
\varepsilon \sim \mathcal{N}(0,I).
$$

That lets gradients pass through the sample path more directly.

Compared with REINFORCE-style estimators, this often gives lower-variance gradient estimates.

So the short answer is:

- REINFORCE works very generally but can have high variance
- reparameterization uses a differentiable transformation of noise and usually gives cleaner gradients
