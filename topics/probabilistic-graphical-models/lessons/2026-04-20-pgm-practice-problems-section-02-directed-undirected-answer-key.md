# PGM Practice Problems 2 Answer Key: Directed and Undirected Models

Use with [[2026-04-20-pgm-practice-problems-section-02-directed-undirected]].

## Table of Contents

- [[#Solution 2.1]]
- [[#Solution 2.2]]
- [[#Solution 2.3]]
- [[#Solution 2.4]]

## Solution 2.1

The parent sets are:

- $X_1$: no parents
- $X_2$: parent $X_1$
- $X_3$: parent $X_1$
- $X_4$: parent $X_3$

So the Bayesian-network factorization is
$$
p(x_1,x_2,x_3,x_4)
=
p(x_1)\,p(x_2 \mid x_1)\,p(x_3 \mid x_1)\,p(x_4 \mid x_3).
$$

## Solution 2.2

The graph is a triangle, so the maximal clique is
$$
\{1,2,3\}.
$$

One valid factorization is
$$
p(x_1,x_2,x_3)
=
\frac{1}{Z}\psi_{123}(x_1,x_2,x_3).
$$

More generally, the partition function is needed because the potential function is only a nonnegative compatibility score. It does not automatically sum to $1$. The role of
$$
Z
$$
is to normalize the product of potentials into a valid probability distribution.

## Solution 2.3

A conditional probability table in a directed model is already locally normalized. For fixed parent values, the child probabilities sum to $1$.

A potential function in an undirected model is not required to be locally normalized. It only needs to be nonnegative.

So:

- directed model: local conditional probabilities
- undirected model: unnormalized compatibility functions plus a global normalizer

## Solution 2.4

The partition function
$$
Z
$$
takes an unnormalized product of potentials and turns it into a real probability distribution by dividing by the total mass. It becomes a bottleneck because computing it usually requires summing or integrating over all configurations of the variables. That can be exponentially expensive in the wrong structure, which is why undirected models often raise normalization difficulties.
