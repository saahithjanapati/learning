# PGM Practice Problems 8 Answer Key: Causality

Use with [[2026-04-20-pgm-practice-problems-section-08-causality]].

## Table of Contents

- [[#Solution 8.1]]
- [[#Solution 8.2]]
- [[#Solution 8.3]]
- [[#Solution 8.4]]

## Solution 8.1

The quantity
$$
p(y \mid x)
$$
is observational: it conditions on seeing $X=x$ in the ordinary data-generating process.

The quantity
$$
p(y \mid do(x))
$$
is interventional: it describes what happens if we actively set $X=x$ and break the usual mechanism that generated $X$.

These are different because observation can still carry information about confounding or common causes, while intervention changes the system itself.

## Solution 8.2

For a valid backdoor set $Z$, the adjustment formula in the discrete case is
$$
p(y \mid do(x))
=
\sum_z p(y \mid x,z)p(z).
$$

## Solution 8.3

The PC algorithm is a causal-discovery procedure that uses conditional-independence tests to recover a graph skeleton and orient as many edges as possible under its assumptions. At a high level, it is trying to infer causal structure from observational statistical constraints.

## Solution 8.4

Two good reasons are:

1. Different causal graphs can imply the same observational independences, so the structure is not always uniquely identified.
2. Real data may violate the assumptions of the method, such as no hidden confounders, faithfulness, or perfect conditional-independence testing.
