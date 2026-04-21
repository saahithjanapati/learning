# PGM Worked Problems 8: Causality

Use with [[2026-04-20-pgm-exam-prep-section-08-causality]] and [[2026-04-20-pgm-memory-08-causality]].

## Table of Contents

- [[#Problem 8.1: Conditioning vs Intervention]]
- [[#Problem 8.2: A Backdoor Adjustment Formula]]
- [[#Problem 8.3: Why Causal Discovery Is Hard]]

## Problem 8.1: Conditioning vs Intervention

Why is
$$
p(y \mid x)
$$
not generally the same thing as
$$
p(y \mid do(x))?
$$

### Solution

Conditioning means we observed that $X=x$ in the ordinary data-generating process.

Intervention means we actively set $X=x$ and cut the normal causal mechanism that would have produced $X$.

These are different because when we merely observe $X=x$, that observation can still carry information about common causes or selection effects.

So:

- conditioning updates beliefs in the observational world
- intervention changes the system itself

That is why observational association is not automatically causal effect.

## Problem 8.2: A Backdoor Adjustment Formula

Suppose $Z$ is a valid backdoor adjustment set for estimating the causal effect of $X$ on $Y$. Write the adjustment formula.

### Solution

If $Z$ blocks all backdoor paths from $X$ to $Y$, then
$$
p(y \mid do(x))
=
\sum_z p(y \mid x,z)p(z)
$$
in the discrete case.

This is the standard backdoor-adjustment formula.

The idea is that once we condition on the right confounders, we can reconstruct the interventional quantity from observational pieces.

## Problem 8.3: Why Causal Discovery Is Hard

Give two reasons why recovering a causal graph from observational data is difficult.

### Solution

Two major reasons are:

1. Different causal graphs can imply the same observational conditional-independence pattern.
2. Real data may violate the ideal assumptions used by causal-discovery methods, such as no hidden confounders, faithfulness, or perfect conditional-independence testing.

So even if a discovery algorithm outputs a graph or equivalence class, that output should be interpreted with care. The observational distribution may not uniquely identify the full causal structure.
