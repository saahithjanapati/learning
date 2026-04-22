# 6. Variational Inference, EM, and VAEs

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#6.0 What Problem VI Is Solving]]
- [[#6.1 Two Variational Stories in This Course]]
- [[#6.2 Gibbs Variational Principle, Slowly]]
- [[#6.3 Inner Relaxations, Outer Relaxations, and Bethe]]
- [[#6.4 The ELBO, Slowly]]
- [[#6.5 Mean-Field VI and Coordinate Updates]]
- [[#6.6 Why KL Direction Matters]]
- [[#6.7 EM]]
- [[#6.8 Variational EM]]
- [[#6.9 VAEs]]
- [[#6.10 REINFORCE vs Reparameterization]]
- [[#6.11 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is about the optimization-based answer to hard inference.

In MCMC, the idea was:

- build a random process
- eventually sample from the right distribution

In variational inference, the idea is different:

- choose a simpler family of distributions
- optimize inside that family so one member is as close as possible to the hard target distribution

So VI is:

`turn inference into optimization`

That is the core sentence.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 13`
- `Lecture 15`
- `Lecture 16`

This section is one of the hardest in the course for students who missed class, because many of the formulas are short but conceptually loaded.

So as you read, keep asking:

- what is the hard distribution?
- what is the simpler distribution?
- what objective are we optimizing?
- what is the tradeoff for using the simpler family?

If you keep those four questions in view, the notation becomes much less scary.

## 6.0 What Problem VI Is Solving

Suppose the true posterior you want is
$$
p(z \mid x).
$$

Often that posterior is too hard to compute exactly.

So variational inference says:

instead of computing `p(z|x)` exactly, choose a family of easier distributions `q(z)` and find the best one in that family.

This is an approximation strategy.

The price is:

- you only search inside a restricted family

The benefit is:

- optimization may be much easier than exact inference or exact sampling

## 6.1 Two Variational Stories in This Course

There are actually two related variational stories in the class.

### Story 1: partition functions in undirected models

For
$$
p(x)=\frac{1}{Z}\exp(E(x)),
$$
we want information about `log Z`.

### Story 2: approximate posterior inference

For a latent-variable model `p(x,z)`, we want to approximate
$$
p(z \mid x).
$$

These look like different problems, but they share the same high-level trick:

- introduce an auxiliary distribution `q`
- optimize an objective involving expectations and entropy

That is why these topics belong together.

## 6.2 Gibbs Variational Principle, Slowly

For an undirected model
$$
p(x)=\frac{1}{Z}\exp(E(x)),
$$
the Gibbs variational principle says
$$
\log Z
=
\max_q \left\{\mathbb{E}_q[E(x)] + H(q)\right\}.
$$

Some texts instead write the model as
$$
p(x)\propto \exp(-\mathcal{E}(x)).
$$
Then the same identity appears with `-\mathcal{E}(x)` in place of `E(x)`.
So the sign convention changes with notation, but the energy-plus-entropy idea is the same.

This can look magical the first time you see it.

Here is the plain-English meaning:

the log partition function can be rewritten as the solution to an optimization problem over all distributions `q`.

Why is that interesting?

Because it turns something that looked like a nasty normalization constant into an optimization problem.

The two pieces of the objective are:

- `E_q[E(x)]`: prefer distributions that put mass on high-energy / high-score states
- `H(q)`: prefer distributions that do not collapse too aggressively

So the optimizer balances:

- fit to good states
- spread / entropy

This “energy plus entropy” viewpoint comes back over and over in the course.

## 6.3 Inner Relaxations, Outer Relaxations, and Bethe

The optimization above is still too hard if you optimize over **all** distributions.
So the course relaxes the problem.

### Inner relaxation

Restrict attention to a smaller family `Q`, such as fully factorized mean-field distributions.

Then
$$
\max_{q \in Q} \{\mathbb{E}_q[E(x)] + H(q)\}
$$
is at most the true optimum.

So inner relaxations give a **lower bound**.

This is where mean-field lives.

### Outer relaxation

Instead of shrinking the feasible set, enlarge it to something easier to optimize over.

In undirected models, a typical example is optimizing over locally consistent pseudomarginals instead of globally valid marginals.

This often gives an **upper bound** if the same objective structure is kept.

### Bethe

Bethe is the subtle one.

On trees, the Bethe entropy expression is exact.
On loopy graphs, it becomes an approximation.

So Bethe is attractive because it connects beautifully to BP, but dangerous because on loopy graphs it does **not** behave like a clean always-lower-bound or always-upper-bound object.

That is why students get confused:

- mean-field is easy to classify as an inner approximation
- Bethe is more special and less clean on loopy graphs

## 6.4 The ELBO, Slowly

Now move from partition functions to posterior approximation.

For a latent-variable model `p_theta(x,z)`, define
$$
\mathcal{L}(q,\theta)=\mathbb{E}_q[\log p_\theta(x,z)-\log q(z)].
$$

This is the ELBO.

The key identity is
$$
\log p_\theta(x)
=
\mathcal{L}(q,\theta)
+
\mathrm{KL}(q(z)\,\|\,p_\theta(z \mid x)).
$$

This is one of the most important equations in the whole course.

Read it slowly:

- `log p_theta(x)` is the thing we would ideally like to understand
- `ELBO` is the thing we can optimize
- the gap between them is a KL divergence

Because KL divergence is always nonnegative, the ELBO is a **lower bound**:
$$
\mathcal{L}(q,\theta)\le \log p_\theta(x).
$$

And because the gap is exactly a KL divergence, maximizing the ELBO is the same as minimizing
$$
\mathrm{KL}(q(z)\,\|\,p_\theta(z \mid x)).
$$

So in plain English:

the ELBO is the optimization objective that makes variational posterior approximation work.

## 6.5 Mean-Field VI and Coordinate Updates

Mean-field VI uses a factorized approximation:
$$
q(z)=\prod_i q_i(z_i).
$$

Why do this?

Because it makes the approximation family much easier to optimize over.

The cost is expressiveness:
the approximation may be too simple to capture strong posterior dependencies.

The standard coordinate update looks like
$$
\log q_i^*(z_i)
=
\mathbb{E}_{q_{-i}}[\log p(x,z)] + \text{const}.
$$

Do not try to memorize it as a scary formula.
Memorize the meaning:

- focus on one factor `q_i`
- look only at the log-joint terms involving `z_i`
- average over the other variables using the current variational approximation
- exponentiate and normalize

That recipe is what matters.

## 6.6 Why KL Direction Matters

One of the most important conceptual facts in VI is that the direction of KL matters.

The ELBO minimizes
$$
\mathrm{KL}(q \,\|\, p).
$$

This is not the same as
$$
\mathrm{KL}(p \,\|\, q).
$$

Why does that matter?

Because the two objectives prefer different types of approximation.

Very roughly:

- `KL(q||p)` tends to avoid placing mass where the true posterior is very small
- this can make it willing to ignore some modes in a multimodal posterior

That is why a simple variational family can behave badly on a multimodal true posterior.

So if a practice question mentions:

- bimodal or multimodal posterior
- single Gaussian variational family

you should immediately think:

`the direction of KL is part of the issue`

## 6.7 EM

Expectation-Maximization is an alternating optimization algorithm for latent-variable models.

The basic idea is:

- if the latent variables were known, parameter learning would be easier
- if the parameters were known, latent-variable inference would be easier
- so alternate between those two tasks

### E-step

Infer the latent-variable distribution under the current parameters.

### M-step

Update the parameters using that inferred latent-variable distribution.

So EM is:

`infer hidden variables -> update parameters -> repeat`

That is the big idea.

## 6.8 Variational EM

What if the exact posterior in the E-step is itself intractable?

Then replace it with a variational approximation.

That gives variational EM.

So:

- EM = exact posterior in the inner inference step
- variational EM = approximate posterior in the inner inference step

This is where the EM and VI stories join.

## 6.9 VAEs

A variational autoencoder is a neural latent-variable model trained with the ELBO.

It has two main learned pieces:

### Decoder / generative model

This says how latent variables generate observations:
$$
p_\theta(x \mid z).
$$

### Encoder / variational posterior

This predicts an approximate posterior:
$$
q_\phi(z \mid x).
$$

The important new idea is **amortization**.

Classical VI often optimizes a separate variational distribution for each datapoint.
A VAE instead learns a network that maps `x` directly to variational parameters.

So a VAE is not “just VI.”
It is:

- latent-variable modeling
- ELBO training
- amortized inference with neural nets

## 6.10 REINFORCE vs Reparameterization

These are two different ways to estimate gradients through the ELBO.

### REINFORCE / score-function estimator

Use this when you can:

- sample from `q_phi`
- compute `log q_phi`
- compute gradients of `log q_phi`

It is more general.
It can handle discrete latent variables.
But it often has high variance.

### Reparameterization trick

Use this when you can write the latent variable as
$$
z=g_\phi(\epsilon,x),
$$
where `epsilon` comes from a fixed noise source.

Then gradients can flow through the transformation itself.

This is especially natural for continuous Gaussian-style latent variables.

So the plain-English comparison is:

- REINFORCE = more general, usually noisier
- reparameterization = more structured, usually cleaner and lower variance when available

## 6.11 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say:

> Variational inference solves hard inference by choosing a simpler family of distributions and optimizing inside that family. The ELBO is the key objective because it is a lower bound whose gap to the log evidence is a KL divergence. Mean-field makes optimization easier by factorizing the approximation. EM alternates between inferring latent variables and updating parameters, and variational EM does the same thing when the exact posterior is too hard. A VAE is a neural latent-variable model trained with the ELBO, and REINFORCE versus reparameterization is about two different ways to estimate gradients through that objective.

If you can say that clearly, you are in much better shape than most people feel when they first meet this material.

## Formal Anchors

These are the formal identities and distinctions that hold the whole section together.

### Gibbs variational principle

For an undirected model written as
$$
p(x)=\frac{1}{Z}\exp(E(x)),
$$
the log partition function satisfies
$$
\log Z=\max_q \left\{\mathbb{E}_q[E(x)] + H(q)\right\}.
$$

This turns a normalization problem into an optimization problem.

### ELBO identity

For latent-variable model $p_\theta(x,z)$ and variational distribution $q(z)$,
$$
\log p_\theta(x)
=
\mathcal{L}(q,\theta)
+
\mathrm{KL}(q(z)\,\|\,p_\theta(z\mid x)),
$$
where
$$
\mathcal{L}(q,\theta)=\mathbb{E}_q[\log p_\theta(x,z)-\log q(z)].
$$

Since KL is nonnegative, the ELBO is a lower bound on $\log p_\theta(x)$.

### Mean-field coordinate update

For factorized family $q(z)=\prod_i q_i(z_i)$, the coordinate optimum satisfies
$$
\log q_i^*(z_i)=\mathbb{E}_{q_{-i}}[\log p(x,z)] + \text{const}.
$$

This is the key formula behind mean-field coordinate ascent.

### KL direction matters

The standard ELBO corresponds to minimizing
$$
\mathrm{KL}(q\,\|\,p),
$$
not
$$
\mathrm{KL}(p\,\|\,q).
$$

Those are different optimization objectives and can prefer very different approximations.

### EM versus variational EM

EM uses the exact posterior in the E-step when that is tractable.
Variational EM replaces that exact posterior with a variational approximation when it is not.

### Amortized inference in VAEs

A VAE replaces separate per-datapoint variational optimization with an encoder network that predicts variational parameters directly from the observation.

That is the formal role of amortization.

## Worked Problems

### Problem 6.1

What is the difference in philosophy between MCMC and variational inference?

### Solution

MCMC tries to approximate the target distribution by building a Markov chain whose long-run samples come from that target.

Variational inference instead chooses a simpler family of distributions and solves an optimization problem to find the member of that family closest to the target according to the chosen objective.

So MCMC is sampling-based, while VI is optimization-based.

### Problem 6.2

Why does maximizing the ELBO correspond to minimizing
$$
\mathrm{KL}(q(z)\,\|\,p_\theta(z\mid x))?
$$

### Solution

Because
$$
\log p_\theta(x)=\mathcal{L}(q,\theta)+\mathrm{KL}(q(z)\,\|\,p_\theta(z\mid x)).
$$

For fixed model parameters and observation $x$, the term $\log p_\theta(x)$ does not depend on $q$.
So increasing the ELBO is exactly the same as decreasing the KL gap.

### Problem 6.3

Why is mean-field VI usually computationally easier but statistically less expressive than exact posterior inference?

### Solution

It is easier because the factorized family
$$
q(z)=\prod_i q_i(z_i)
$$
turns a hard global optimization over all possible posteriors into a much smaller structured optimization.

It is less expressive because the factorization forces artificial independence assumptions that may not hold in the true posterior.

### Problem 6.4

What practical behavior can result from minimizing
$$
\mathrm{KL}(q\,\|\,p)
$$
when the true posterior is multimodal but the variational family is unimodal?

### Solution

The approximation may focus on one mode and ignore others.

This happens because $\mathrm{KL}(q\,\|\,p)$ strongly penalizes placing mass where the true posterior is tiny, but it is more tolerant of failing to cover every region where the true posterior has mass.

### Problem 6.5

What is the conceptual difference between EM and variational EM?

### Solution

EM alternates between:

- computing the exact posterior over latent variables under current parameters
- updating parameters using that posterior

Variational EM keeps the same alternating structure but replaces the exact posterior computation with a variational approximation because the exact posterior is intractable.

### Problem 6.6

What makes a VAE different from plain classical variational inference?

### Solution

A VAE combines:

- a latent-variable generative model
- ELBO-based training
- an encoder network that amortizes inference across datapoints

So instead of separately optimizing a fresh variational distribution for each datapoint, the encoder learns to predict approximate posterior parameters directly from the input.

### Problem 6.7

When is REINFORCE preferred conceptually, and when is reparameterization preferred conceptually?

### Solution

REINFORCE is conceptually useful when you can sample from the variational distribution but cannot write the latent variable as a differentiable transformation of fixed noise.
It is more general and can handle discrete variables, but it often has high variance.

Reparameterization is preferred when the latent variable can be written as a differentiable transformation of base noise, as with many continuous Gaussian-like latents.
It usually gives lower-variance gradient estimates.
