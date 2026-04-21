# PGM Practice Problems 3 Answer Key: Exact Inference and Belief Propagation

Use with [[2026-04-20-pgm-practice-problems-section-03-inference-bp]].

## Table of Contents

- [[#Solution 3.1]]
- [[#Solution 3.2]]
- [[#Solution 3.3]]
- [[#Solution 3.4]]

## Solution 3.1

The direct elimination expression is
$$
p(x_4)
=
\sum_{x_1}\sum_{x_2}\sum_{x_3}
p(x_1)p(x_2 \mid x_1)p(x_3 \mid x_2)p(x_4 \mid x_3).
$$

An efficient left-to-right elimination order is:
$$
m_2(x_2)=\sum_{x_1} p(x_1)p(x_2 \mid x_1),
$$
then
$$
m_3(x_3)=\sum_{x_2} m_2(x_2)p(x_3 \mid x_2),
$$
then
$$
p(x_4)=\sum_{x_3} m_3(x_3)p(x_4 \mid x_3).
$$

The point is to build small intermediate factors rather than one huge table.

## Solution 3.2

Different elimination orders create different intermediate factors. If an order causes many variables to appear in one intermediate factor, then that factor has many entries and the computation becomes expensive. A better order keeps the intermediate factors smaller. So the exact answer is unchanged, but the computational cost can change dramatically.

## Solution 3.3

Sum-product belief propagation is exact on tree-structured graphs or acyclic factor graphs. On graphs with cycles, the same updates become loopy belief propagation, which is generally approximate.

## Solution 3.4

No. Once the factor graph has a cycle, running the same sum-product message updates no longer guarantees exact marginals. The algorithm may still work well in practice, and it may converge, but exactness is not guaranteed on loopy graphs.
