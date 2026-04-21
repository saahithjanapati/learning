# PGM Practice Problems 4 Answer Key: GNNs and Message Passing

Use with [[2026-04-20-pgm-practice-problems-section-04-gnns]].

## Table of Contents

- [[#Solution 4.1]]
- [[#Solution 4.2]]
- [[#Solution 4.3]]
- [[#Solution 4.4]]

## Solution 4.1

Both belief propagation and a message-passing GNN update node-level information using local messages passed along edges of a graph. In both cases, repeated local updates let information travel beyond immediate neighbors.

## Solution 4.2

Probabilistic inference is derived from a specified probabilistic model and is trying to compute quantities like marginals or MAP values implied by that model. A GNN is usually a learned architecture whose message functions are trained from data. So the structural pattern is similar, but the objective is different.

## Solution 4.3

Over-smoothing means that after many message-passing layers, node embeddings become too similar to each other. Distinct nodes lose separability because repeated averaging or aggregation washes out important differences.

## Solution 4.4

Over-squashing means that information from a large distant part of the graph has to be compressed through a small bottleneck on its way to a node. Important long-range signals can get distorted or lost. This is different from over-smoothing, which is about embeddings becoming too alike rather than information being bottlenecked.
