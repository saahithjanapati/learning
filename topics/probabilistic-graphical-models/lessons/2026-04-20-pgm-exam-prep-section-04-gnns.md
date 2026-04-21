# 4. GNNs, Message Passing, and the PGM Connection

## Table of Contents

- [[#0. How To Read This Section]]
- [[#4.0 Why GNNs Show Up in a PGM Course]]
- [[#4.1 Shared Message-Passing Intuition]]
- [[#4.2 The Important Difference]]
- [[#4.3 Over-Smoothing]]
- [[#4.4 Over-Squashing]]
- [[#4.5 What the Class Wanted You To Notice]]

## 0. How To Read This Section

This section is a conceptual bridge section, not a full separate probabilistic-inference unit.

The main thing to watch for is:

- what GNNs borrow from graphical models
- what they do differently

If you are short on time, focus on the difference between:

- BP as probabilistic inference
- GNNs as learned message passing

## 4.0 Why GNNs Show Up in a PGM Course

At first glance, GNNs can feel out of place in a graphical-models course.

The reason they appear is structural:

both PGMs and GNNs use local graph-based message passing.

So the course is making a conceptual bridge:

- old probabilistic message passing
- modern neural message passing

## 4.1 Shared Message-Passing Intuition

In both worlds, a node updates by aggregating local information from neighbors.

That is the common pattern:

- local communication
- repeated over layers or iterations
- global information emerges from repeated local exchange

This is why BP and GNNs feel related.

## 4.2 The Important Difference

They are not the same thing.

Belief propagation:

- is derived from a probabilistic model
- tries to compute marginals or MAP quantities

GNN message passing:

- is a learned neural computation
- tries to produce embeddings useful for some downstream task

So the structural motif is similar, but the objective is different.

## 4.3 Over-Smoothing

Over-smoothing means node representations become too similar after many layers.

Even nodes that should remain distinguishable can end up with nearly identical embeddings.

The intuitive picture is:

- repeated averaging or mixing
- local differences get washed out

## 4.4 Over-Squashing

Over-squashing is different.

It means information from many distant nodes has to pass through narrow graph bottlenecks into a fixed-size representation. Too much information gets compressed, so long-range dependencies are hard to preserve.

The intuitive picture is:

- too much distant information
- too little channel capacity

This is not the same phenomenon as over-smoothing, even though both hurt deep message passing.

## 4.5 What the Class Wanted You To Notice

The exam-relevant distinctions are:

- BP and GNNs both use message-passing structure
- BP is probabilistic inference; GNNs are learned representation updates
- over-smoothing means representations become too similar
- over-squashing means too much distant information is forced through bottlenecks
