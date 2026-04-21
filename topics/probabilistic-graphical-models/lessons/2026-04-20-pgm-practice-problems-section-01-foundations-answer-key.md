# PGM Practice Problems 1 Answer Key: Foundations

Use with [[2026-04-20-pgm-practice-problems-section-01-foundations]].

## Table of Contents

- [[#Solution 1.1]]
- [[#Solution 1.2]]
- [[#Solution 1.3]]
- [[#Solution 1.4]]

## Solution 1.1

Since each variable has $3$ values, the full joint table has
$$
3^8=6561
$$
entries.

This is exactly why graphical models are useful: the full joint grows exponentially in the number of variables, so we want a structured factorization that uses local interactions rather than one giant table.

## Solution 1.2

1. `representation`
2. `inference`
3. `learning / sampling`
4. `learning / sampling`

The last item counts as learning / sampling here because the point is to generate draws from the model, not just compute an exact marginal or conditional.

## Solution 1.3

The graph is the structural object. It tells you which variables are directly connected or which conditional-independence assumptions are being encoded.

The factorization is the mathematical decomposition implied by that structure, such as a product of local conditionals or potentials.

The full joint distribution is still the real probabilistic object of interest. The graph and factorization are useful ways of representing that joint more compactly.

So the relation is:

- graph: structure
- factorization: algebraic decomposition
- joint distribution: full probability law

## Solution 1.4

A compact model representation does not guarantee easy exact inference because the difficult part is often the size of the intermediate computations required for a query. Even if the model itself is sparse, eliminating variables or computing marginals can create large intermediate factors. That is why structural quantities like treewidth matter. So representation can be compact while exact inference is still computationally expensive.
