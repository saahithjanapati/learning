# PGM Memory Sheet 2: Directed and Undirected Models

Use with [[2026-04-20-pgm-exam-prep-section-02-directed-undirected]].

## Core Factorizations

- Directed model:
$$
p(\mathbf{x})=\prod_i p(x_i \mid pa_i)
$$

- Undirected model:
$$
p(\mathbf{x})=\frac{1}{Z}\prod_C \psi_C(\mathbf{x}_C)
$$

## What Each Side Means

- directed = local conditionals
- undirected = local compatibility / potential functions

## Partition Function

$$
Z=\sum_{\mathbf{x}} \prod_C \psi_C(\mathbf{x}_C)
$$

- needed because potentials are unnormalized
- often computationally hard

## Energy-Based View

$$
p_\theta(x)\propto \exp(-E_\theta(x))
$$

- low energy = high probability

## What To Remember

- DAGs give parent-child factorization
- MRFs / factor graphs give potential-based factorization
- undirected models pay for flexibility with the partition function

## Likely Traps

- forgetting the $1/Z$ in undirected models
- thinking potentials are conditional probabilities
- treating arrows as automatically causal in every early-course problem

