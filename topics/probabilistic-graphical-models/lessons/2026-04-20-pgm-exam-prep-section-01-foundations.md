# 1. Foundations and Why Graphical Models Exist

## Table of Contents

- [[#0. How To Read This Section]]
- [[#1.0 What This Course Is Really About]]
- [[#1.1 What a Joint Distribution Looks Like Without Structure]]
- [[#1.2 What the Graph Is Doing for You]]
- [[#1.3 The Three Core Tasks]]
- [[#1.4 The Main Object Types]]
- [[#1.5 Why Approximate Methods Appear]]
- [[#1.6 Beginner Checklist]]

## 0. How To Read This Section

This section is here to answer one beginner question:

`why do graphical models exist at all?`

If you feel lost, focus on just three ideas first:

- the true object is still the full joint distribution
- the graph is a structured way to factorize that joint
- later algorithms matter because exact brute-force computation is too expensive

If those three points are clear, the rest of the course will feel much less arbitrary.

## 1.0 What This Course Is Really About

Probabilistic graphical models are about representing a complicated joint probability distribution in a structured way so that we can do useful computations without brute force.

At the highest level, the course is about three questions:

1. How do we represent a joint distribution compactly?
2. How do we compute marginals, MAP assignments, or samples from that distribution?
3. What do we do when exact computation is too expensive?

That is why the course moves in this order:

- representation
- exact inference
- approximate inference
- modern generative-model extensions
- causality

## 1.1 What a Joint Distribution Looks Like Without Structure

Suppose you have variables
$$
X_1,\dots,X_n.
$$

The most brute-force way to describe them is to write the full joint distribution
$$
p(x_1,\dots,x_n).
$$

That is mathematically complete, but usually computationally terrible.

Why? Because the number of entries grows exponentially with the number of variables if the variables are discrete. Even for binary variables, the full table has
$$
2^n
$$
entries.

So the core motivation for graphical models is:

- the full joint is the real object
- but we want a structured factorization of it

## 1.2 What the Graph Is Doing for You

The graph is not just a picture. It is encoding which variables interact directly and which dependencies are absent or mediated through others.

That buys you two things:

1. a factorized representation of the joint
2. algorithms that exploit the factorization

So a graphical model is useful only because the graph lines up with probability structure.

If the graph is sparse, you often get:

- fewer parameters
- easier reasoning
- faster inference

## 1.3 The Three Core Tasks

There are three recurring computational tasks in the class.

### Representation

Write or understand a joint distribution using a graph-based factorization.

### Inference

Answer questions like:

- what is
  $$
  p(x_i \mid x_j)?
  $$
- what is the marginal of one variable?
- what assignment is most likely?
- what expectation does this model imply?

### Learning or Sampling

Fit parameters, approximate posteriors, or generate samples.

Different later-course methods solve different versions of this problem:

- MCMC gives samples
- VI gives optimization-based approximations
- GANs and diffusion give generative modeling alternatives

## 1.4 The Main Object Types

You should keep these straight from the beginning.

### Random variables

The nodes in the graph.

### Joint distribution

The full probability law over all nodes.

### Conditional independence

The key structural simplification:

some variables become independent once you condition on others.

### Factors or potentials

The local pieces whose product gives the joint up to normalization.

### Partition function

In undirected models, this is the global normalizer:
$$
Z.
$$

It is important because it is often the computational bottleneck.

## 1.5 Why Approximate Methods Appear

The course keeps returning to one big fact:

exact inference is often intractable.

Even if the graphical model representation is compact, computing useful quantities exactly can still be exponential in the wrong structural parameter, usually some version of treewidth or induced clique size.

That is why the course later needs:

- belief propagation
- MCMC
- variational inference
- score-based or adversarial alternatives

So do not think of those methods as extra decorations. They are the response to exact inference becoming too expensive.

## 1.6 Beginner Checklist

By the end of this section, you should be comfortable saying:

- a graphical model is a structured factorization of a joint distribution
- the graph exists to expose conditional-independence structure
- the course is mainly about representation, inference, and approximation
- exact inference is often hard even when the model itself is compact
