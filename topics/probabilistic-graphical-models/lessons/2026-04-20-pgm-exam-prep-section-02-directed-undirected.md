# 2. Directed and Undirected Graphical Models

## Table of Contents

- [[#0. How To Read This Section]]
- [[#2.0 Directed Models]]
- [[#2.1 Bayesian-Network Factorization]]
- [[#2.2 How To Read a Directed Model]]
- [[#2.3 Undirected Models]]
- [[#2.4 MRF Factorization and Potentials]]
- [[#2.5 The Partition Function]]
- [[#2.6 Energy-Based View]]
- [[#2.7 Directed vs Undirected: the Right Comparison]]
- [[#2.8 Moralization and the Bridge Between Them]]
- [[#2.9 Beginner Checklist]]

## 0. How To Read This Section

This section is about the two main ways the course writes a structured joint distribution:

- directed factorization
- undirected factorization

The key beginner distinction is:

- directed models use locally normalized conditional probabilities
- undirected models use unnormalized potentials plus one global normalizer

If you keep that contrast in mind, most of the section becomes much easier to follow.

## 2.0 Directed Models

A directed graphical model, or Bayesian network, uses a directed acyclic graph.

The graph tells you that each variable depends only on its parents.

If
$$
pa_i
$$
denotes the parents of node $X_i$, then the joint factorizes as
$$
p(\mathbf{x})=\prod_i p(x_i \mid pa_i).
$$

This is one of the most important equations in the course.

## 2.1 Bayesian-Network Factorization

The factorization says:

- each node contributes one conditional distribution
- multiplying those local conditionals gives the full joint

This is powerful because it replaces one giant joint with many smaller local conditionals.

A beginner-friendly way to think about it is:

the DAG tells you a recipe for generating the variables in topological order.

That is why directed models feel natural for causal or generative stories.

## 2.2 How To Read a Directed Model

When you look at a directed model, ask:

1. What are the parents of each node?
2. What conditional does each node contribute?
3. What independencies are implied by the graph?

The common beginner mistake is to look at arrows as only “causal arrows.” In the probabilistic-modeling part of the course, arrows first mean factorization structure. Sometimes that structure has causal meaning, but not always.

## 2.3 Undirected Models

An undirected graphical model, or Markov random field, uses edges without direction.

The factorization is no longer written in terms of conditional probabilities at each node. Instead, it is written in terms of local compatibility functions or potentials.

## 2.4 MRF Factorization and Potentials

The standard form is
$$
p(\mathbf{x})=\frac{1}{Z}\prod_C \psi_C(\mathbf{x}_C),
$$
where:

- $C$ ranges over cliques or chosen factor scopes
- $\psi_C$ is a nonnegative potential
- $Z$ is the partition function

The key idea is:

- directed models use normalized local conditional probabilities
- undirected models use unnormalized compatibility scores

That is why undirected models need the extra global normalizer.

## 2.5 The Partition Function

The partition function is
$$
Z=\sum_{\mathbf{x}} \prod_C \psi_C(\mathbf{x}_C)
$$
for discrete models, or the analogous integral in the continuous case.

Why is $Z$ important?

Because without it, the product of potentials is just an unnormalized score, not a probability distribution.

Why is $Z$ annoying?

Because computing it usually requires summing or integrating over all configurations, which can be very expensive.

This single object explains a lot of the later course:

- why undirected learning can be hard
- why score matching is useful
- why MCMC is useful
- why variational approximations appear

## 2.6 Energy-Based View

Undirected models are often written as
$$
p_\theta(x)\propto \exp(-E_\theta(x)).
$$

This is the energy-based-model view.

The connection is:

- low energy means high probability
- high energy means low probability

This view becomes very important later in the course for:

- energy-based models
- score matching
- Langevin sampling

## 2.7 Directed vs Undirected: the Right Comparison

The wrong comparison is:

- directed = better
- undirected = worse

The right comparison is:

- directed models are natural when local conditional structure is the main story
- undirected models are natural when symmetric compatibility or energy structure is the main story

Directed models give:

- local conditional semantics
- easy ancestral sampling if the graph is a DAG

Undirected models give:

- flexible compatibility modeling
- natural energy-based interpretation

But they pay for that flexibility with the partition function.

## 2.8 Moralization and the Bridge Between Them

One important bridge between the two views is moralization:

when converting a directed model to an undirected one for certain inference procedures, you connect co-parents and drop directions.

You do not need every detail memorized at first. The main point is:

- directed and undirected models are not unrelated worlds
- inference often moves between them

## 2.9 Beginner Checklist

You should be able to say:

- DGM factorization:
  $$
  p(\mathbf{x})=\prod_i p(x_i \mid pa_i)
  $$
- UGM factorization:
  $$
  p(\mathbf{x})=\frac{1}{Z}\prod_C \psi_C(\mathbf{x}_C)
  $$
- directed models use local conditionals
- undirected models use potentials and need $Z$
- energy-based models are a special way of writing undirected distributions
