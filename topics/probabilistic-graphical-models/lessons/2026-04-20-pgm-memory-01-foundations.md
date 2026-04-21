# PGM Memory Sheet 1: Foundations

Use with [[2026-04-20-pgm-exam-prep-section-01-foundations]].

## Core Idea

- A graphical model is a structured representation of a joint distribution.
- The graph is useful because it exposes factorization and conditional-independence structure.

## The Three Big Tasks

- representation
- inference
- learning / sampling

## Main Beginner Distinctions

- full joint distribution:
  $$
  p(x_1,\dots,x_n)
  $$
- structured factorization:
  rewrite the joint using local pieces tied to the graph

## Why the Course Exists

- brute-force joint tables become exponentially large
- graphs let us write the same probabilistic object more compactly
- even then, exact computation can still be hard

## What To Remember

- PGMs are about structure plus computation
- the graph is not decoration; it encodes local dependence assumptions
- the whole course is representation $\to$ inference $\to$ approximation $\to$ modern extensions $\to$ causality

## Likely Traps

- thinking the graph itself is the probability distribution
- forgetting that the real object is still the joint distribution
- treating later approximation methods as unrelated to the early factorization material

