# PGM Worked Problems 2: Directed and Undirected Models

Use with [[2026-04-20-pgm-exam-prep-section-02-directed-undirected]] and [[2026-04-20-pgm-memory-02-directed-undirected]].

## Table of Contents

- [[#Problem 2.1: Factorize a Simple Bayesian Network]]
- [[#Problem 2.2: Factorize a Simple Markov Random Field]]
- [[#Problem 2.3: Why the Partition Function Appears]]

## Problem 2.1: Factorize a Simple Bayesian Network

Suppose the directed graph is
$$
X_1 \to X_2, \qquad X_1 \to X_3, \qquad X_2 \to X_4, \qquad X_3 \to X_4.
$$

Write the Bayesian-network factorization of the joint distribution.

### Solution

In a directed graphical model, the joint factorizes as
$$
p(x_1,\dots,x_n)=\prod_i p(x_i \mid x_{\mathrm{pa}(i)}).
$$

So we look at the parents of each node:

- $X_1$ has no parents
- $X_2$ has parent $X_1$
- $X_3$ has parent $X_1$
- $X_4$ has parents $X_2,X_3$

Therefore
$$
p(x_1,x_2,x_3,x_4)
=
p(x_1)\,p(x_2 \mid x_1)\,p(x_3 \mid x_1)\,p(x_4 \mid x_2,x_3).
$$

## Problem 2.2: Factorize a Simple Markov Random Field

Suppose an undirected graph has edges
$$
(1,2),\ (2,3),\ (3,4).
$$

Write a valid pairwise MRF factorization for the joint.

### Solution

For an undirected graphical model, the joint is written as a product of clique potentials, divided by a global normalizer:
$$
p(x)
=
\frac{1}{Z}\prod_c \psi_c(x_c).
$$

If we use pairwise edge factors, one valid factorization is
$$
p(x_1,x_2,x_3,x_4)
=
\frac{1}{Z}\,
\psi_{12}(x_1,x_2)\,
\psi_{23}(x_2,x_3)\,
\psi_{34}(x_3,x_4).
$$

Depending on the modeling convention, you might also include singleton factors such as
$$
\psi_1(x_1),\dots,\psi_4(x_4).
$$

The key feature is that unlike the directed case, the factors are not conditional probabilities. They are nonnegative compatibility functions.

## Problem 2.3: Why the Partition Function Appears

Suppose an undirected model is written as
$$
\tilde p(x)=\psi_{12}(x_1,x_2)\psi_{23}(x_2,x_3).
$$

Why can we not automatically call this a probability distribution? What fixes the problem?

### Solution

The expression
$$
\tilde p(x)=\psi_{12}(x_1,x_2)\psi_{23}(x_2,x_3)
$$
is only an unnormalized score.

It is not automatically a valid probability distribution because probabilities must sum or integrate to $1$. In general,
$$
\sum_x \tilde p(x) \neq 1.
$$

To fix this, we define the partition function
$$
Z=\sum_x \tilde p(x)
$$
for the discrete case, or the analogous integral in the continuous case.

Then the normalized model is
$$
p(x)=\frac{1}{Z}\tilde p(x).
$$

So the partition function is what turns a product of local potentials into a genuine probability distribution.
