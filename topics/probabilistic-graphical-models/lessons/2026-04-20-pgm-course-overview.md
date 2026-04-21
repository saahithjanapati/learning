# Probabilistic Graphical Models Course Overview

This note is the high-level map of the class.

Use it before the detailed exam-prep sections if you feel like the course is still just a pile of disconnected topics.

## Table of Contents

- [[#0. How To Read This Overview]]
- [[#1. The Big Question of the Course]]
- [[#2. The Core Arc of the Class]]
- [[#3. Early Course: How to Represent a Joint Distribution]]
- [[#4. Middle Course: How to Compute with the Model]]
- [[#5. Approximate Inference: What to Do When Exact Computation Fails]]
- [[#6. Late Course: Modern Generative Modeling]]
- [[#7. Final Course Module: Causality]]
- [[#8. The Unifying Themes]]
- [[#9. How To Study This as a Beginner]]

## 0. How To Read This Overview

Use this note if the course still feels like a list of unrelated techniques.

The intended reading order is:

1. read Sections 1 and 2 to get the main story of the course
2. skim Sections 3 through 7 to see what each module is trying to accomplish
3. read Section 8 to understand how the whole class fits together
4. use Section 9 as the practical study plan

If you are short on time, the most important distinction to keep in mind is:

- early course: represent and query distributions
- middle course: do inference efficiently or approximately
- late course: train or sample from hard probabilistic models
- final module: reason about interventions rather than just observations

## 1. The Big Question of the Course

The course is trying to answer one big question:

> How do we represent complex probability distributions in a structured way, and then actually compute useful things from them?

That breaks into two separate challenges:

1. representation
2. computation

Most of the course is about some version of those two.

## 2. The Core Arc of the Class

The class can be seen as one long progression:

1. represent complicated joint distributions with graphs
2. use the graph structure to do inference
3. deal with the fact that exact inference is often too expensive
4. connect those ideas to modern generative modeling
5. move from probabilistic dependence to causal reasoning

So the course is not random. It is a sequence:

- structure
- inference
- approximation
- modern extensions
- interventions and causality

## 3. Early Course: How to Represent a Joint Distribution

The first chunk of the course is about graphical-model representations.

### Directed graphical models

These are Bayesian networks.

The main idea is:
$$
p(\mathbf{x})=\prod_i p(x_i \mid pa_i).
$$

So the graph gives local conditional structure.

### Undirected graphical models

These are Markov random fields or related factor graphs.

The main idea is:
$$
p(\mathbf{x})=\frac{1}{Z}\prod_C \psi_C(\mathbf{x}_C).
$$

So the graph gives local compatibility structure rather than parent-child conditionals.

### What you are supposed to learn from this part

- how the graph encodes factorization
- how conditional independence enters
- why undirected models need the partition function
- why sparse structure matters computationally

## 4. Middle Course: How to Compute with the Model

Once you have a model, the next question is:

what can you compute from it?

This leads to the inference part of the course.

### Exact inference

The class covers ideas like:

- variable elimination
- factor graphs
- sum-product belief propagation
- max-product belief propagation

The key point is:

graphical structure can make exact inference much cheaper than brute force, but not always cheap enough.

### Why structure still matters

Even exact algorithms depend heavily on the graph.

If the graph is tree-like, inference can be efficient.
If it has bad induced structure, exact inference can blow up.

So this part teaches you that:

- factorization helps
- but it does not magically remove computational hardness

## 5. Approximate Inference: What to Do When Exact Computation Fails

This is the “okay, now the real world happens” part of the class.

### Sampling / MCMC

Instead of computing things exactly, sample from the model.

The course covers:

- Markov chains
- stationarity
- detailed balance
- Metropolis-Hastings
- Gibbs sampling
- advanced MCMC ideas like HMC and tempering

This is the stochastic route to approximate inference.

### Variational inference

Instead of sampling, solve an optimization problem.

The course covers:

- ELBO
- mean-field approximations
- free-energy viewpoints
- Bethe-style ideas
- EM and variational EM

This is the optimization route to approximate inference.

### Why both are in the course

MCMC and VI solve similar problems in very different ways:

- MCMC approximates by sampling
- VI approximates by optimization

That is one of the biggest conceptual contrasts in the course.

## 6. Late Course: Modern Generative Modeling

The later lectures show how the same probabilistic ideas reappear in modern generative modeling.

### VAEs

Latent-variable models plus variational inference.

### GANs

Adversarial training instead of likelihood-based training.

### Score matching and energy-based models

Ways to work with unnormalized models without directly computing the partition function.

### NCE

Turn density estimation into classification against noise.

### Diffusion

Learn how to reverse a gradual noising process.

### Why this part belongs in the same course

Even though these models feel “deep learning,” they are still about:

- probability distributions
- latent variables
- unnormalized densities
- approximate inference or approximate sampling

So this is not a separate class bolted on top. It is the same core ideas in modern form.

## 7. Final Course Module: Causality

The causality unit changes the question.

Before this point, the course mostly asks:

- what is the probability of something?
- how do we infer hidden variables?

Now it asks:

- what happens if we intervene?

That is where:

- backdoor
- frontdoor
- do-notation
- PC algorithm
- causal discovery

start to matter.

The conceptual leap is:

conditioning and intervention are not the same thing.

That is the main mental shift of the causality part.

## 8. The Unifying Themes

If you want to compress the whole course into a few themes, use these.

### Theme 1: Local structure gives global models

Graphs let us write a huge joint distribution using local pieces.

### Theme 2: Exact computation is fragile

Structure can help a lot, but exact inference often becomes too expensive.

### Theme 3: Approximation is unavoidable

That is why the course spends so much time on:

- belief propagation
- MCMC
- variational inference

### Theme 4: Modern generative models are still probabilistic models

Even GANs, VAEs, score models, and diffusion belong to the same family of ideas:

they are different ways of representing, learning, or sampling from distributions.

### Theme 5: Causality asks a different question than ordinary inference

Probabilistic dependence is not the same as causal effect.

## 9. How To Study This as a Beginner

If you are new to the class and missed lecture, do not try to memorize everything in lecture order.

Use this order instead:

1. learn what the course is about at the representation/inference level
2. get comfortable with directed vs undirected models
3. learn exact inference at a conceptual level
4. learn why approximation is needed
5. then separate the approximation routes:
   - MCMC
   - VI / EM
6. only then move into GAN / score / diffusion
7. treat causality as its own conceptual jump at the end

The correct goal at first is not “know every formula.” It is:

- know why each module exists
- know what problem it is solving
- know how it connects to the rest of the course
