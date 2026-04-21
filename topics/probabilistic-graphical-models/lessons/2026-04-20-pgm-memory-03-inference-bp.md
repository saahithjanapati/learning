# PGM Memory Sheet 3: Inference and Belief Propagation

Use with [[2026-04-20-pgm-exam-prep-section-03-inference-bp]].

## Exact Inference Core

- variable elimination is exact
- elimination order matters
- computational cost is driven by intermediate factor size

## Treewidth Intuition

- low treewidth = exact inference more manageable
- high treewidth = exact inference can become exponential

## Belief Propagation

- sum-product: marginals
- max-product: MAP-style quantities

## Main Exactness Fact

- BP is exact on trees
- loopy BP is approximate in general

## What To Remember

- VE: multiply local factors, sum out variable, replace by new factor
- BP: local messages reused recursively
- tree structure is the key qualifier in exactness statements

## Likely Traps

- saying BP is always exact
- forgetting that max-product replaces summation by maximization
- describing exact-inference hardness without mentioning elimination order or induced structure

