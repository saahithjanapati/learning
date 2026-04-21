# PGM Practice Problems 3: Exact Inference and Belief Propagation

Use with [[2026-04-20-pgm-exam-prep-section-03-inference-bp]], [[2026-04-20-pgm-worked-problems-section-03-inference-bp]], [[2026-04-20-pgm-practice-problems-section-03-inference-bp-answer-key]], and [[2026-04-20-pgm-memory-03-inference-bp]].

These are unsolved practice problems aimed at exact-inference intuition.

## Table of Contents

- [[#Problem 3.1]]
- [[#Problem 3.2]]
- [[#Problem 3.3]]
- [[#Problem 3.4]]

## Problem 3.1

Suppose
$$
p(x_1,x_2,x_3,x_4)=p(x_1)p(x_2 \mid x_1)p(x_3 \mid x_2)p(x_4 \mid x_3).
$$

Write an elimination expression for $p(x_4)$, and then rewrite it to show one efficient elimination order.

## Problem 3.2

Explain why two different elimination orders can have very different runtime even though they compute the same exact quantity.

Your answer should mention intermediate factors.

## Problem 3.3

State when sum-product belief propagation is exact and when it is approximate.

## Problem 3.4

Suppose a factor graph contains a cycle. Does running the same sum-product message updates still guarantee exact marginals? Explain briefly.
