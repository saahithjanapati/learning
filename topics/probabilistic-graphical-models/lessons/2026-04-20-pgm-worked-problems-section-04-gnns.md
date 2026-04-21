# PGM Worked Problems 4: GNNs and Message Passing

Use with [[2026-04-20-pgm-exam-prep-section-04-gnns]] and [[2026-04-20-pgm-memory-04-gnns]].

## Table of Contents

- [[#Problem 4.1: What GNNs Borrow from PGMs]]
- [[#Problem 4.2: Why GNNs Are Not Just Belief Propagation]]
- [[#Problem 4.3: Over-Smoothing vs Over-Squashing]]

## Problem 4.1: What GNNs Borrow from PGMs

What is the high-level similarity between a GNN layer and a belief-propagation iteration?

### Solution

In both cases, a node updates its local representation by aggregating information from nearby neighbors.

So the shared structure is:

- local neighborhoods matter
- messages are passed along edges
- repeated updates let information travel through the graph

That is why GNNs feel related to PGMs at the architecture level.

## Problem 4.2: Why GNNs Are Not Just Belief Propagation

Give one important reason a learned GNN update is not the same thing as exact probabilistic inference.

### Solution

A GNN usually learns a message/update rule from data. It is a trainable representation-learning system.

Belief propagation, in contrast, is derived from a specific probabilistic model and is trying to compute marginals or max-marginals implied by that model.

So the crucial difference is:

- BP is model-derived probabilistic inference
- a GNN is a learned message-passing architecture

They can look similar structurally while serving different goals.

## Problem 4.3: Over-Smoothing vs Over-Squashing

Explain the difference between over-smoothing and over-squashing.

### Solution

Over-smoothing means that after many message-passing layers, node representations start to look too similar. Distinct nodes become hard to distinguish.

Over-squashing means that too much information from a large part of the graph must get compressed through a narrow communication bottleneck. Long-range information gets distorted or lost.

So:

- over-smoothing is about representations becoming too alike
- over-squashing is about too much distant information being compressed into too little bandwidth
