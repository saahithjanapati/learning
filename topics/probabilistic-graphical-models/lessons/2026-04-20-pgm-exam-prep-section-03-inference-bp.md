# 3. Exact Inference and Belief Propagation

## Table of Contents

- [[#0. How To Read This Section]]
- [[#3.0 What Inference Means]]
- [[#3.1 Variable Elimination]]
- [[#3.2 Why Elimination Order Matters]]
- [[#3.3 Treewidth Intuition]]
- [[#3.4 Factor Graphs and Messages]]
- [[#3.5 Sum-Product Belief Propagation]]
- [[#3.6 Max-Product Belief Propagation]]
- [[#3.7 Trees vs Loopy Graphs]]
- [[#3.8 What To Actually Remember for an Exam]]

## 0. How To Read This Section

This section answers the next big course question:

`once I have a graphical model, how do I actually compute something useful from it?`

The high-yield progression is:

1. understand variable elimination
2. understand why elimination order matters
3. understand why tree structure makes belief propagation exact

If you can explain those three points out loud, you already have the core of the inference unit.

## 3.0 What Inference Means

Inference means using the model to answer probabilistic questions.

Typical targets include:

- marginals
- conditionals
- MAP assignments
- expectations

The main challenge is that even if the model factorizes nicely, these queries can still require summing over many hidden variables.

## 3.1 Variable Elimination

Variable elimination is the main exact-inference algorithmic idea.

The pattern is:

1. multiply together all factors involving a variable
2. sum out that variable
3. replace those old factors with the new factor that remains

This is exact. The difficulty is computational cost.

## 3.2 Why Elimination Order Matters

Eliminating a variable can create a new factor over its neighbors.

That means the intermediate factors can get much larger than the original ones.

So the cost is usually not about the original graph alone. It is about:

- which order you eliminate variables
- how large the induced intermediate factors become

This is one of the main exact-inference bottlenecks.

## 3.3 Treewidth Intuition

Treewidth is the structural quantity that summarizes how bad exact inference becomes.

The beginner version to remember is:

- low treewidth means exact inference is manageable
- high treewidth means exact inference can become exponential

You do not need to memorize every formal definition at first. What matters is the computational meaning:

the largest induced clique during elimination controls the size of the biggest intermediate factor.

## 3.4 Factor Graphs and Messages

Belief propagation is easiest to express on factor graphs.

There are two node types:

- variable nodes
- factor nodes

Messages pass locally between variables and factors. The global result comes from combining these local summaries.

This is dynamic programming on a graph.

## 3.5 Sum-Product Belief Propagation

Sum-product BP computes marginals.

At a high level:

- variable-to-factor messages summarize what a variable has heard from other neighboring factors
- factor-to-variable messages summarize how the factor interacts with that variable after summing over the others

The big picture:

- local messages
- reused recursively
- exact on trees

That exactness on trees is the key theorem-level fact.

## 3.6 Max-Product Belief Propagation

Max-product is the MAP analogue of sum-product.

Instead of summing over hidden configurations, you maximize over them.

So:

- sum-product gives marginal-style quantities
- max-product gives MAP-style quantities

## 3.7 Trees vs Loopy Graphs

On trees:

- BP is exact
- the dynamic-programming interpretation is clean

On loopy graphs:

- the same update rules are often run approximately
- this is called loopy BP
- it can work well in practice
- but exactness is not guaranteed in general

This distinction matters a lot on exams:

“BP” by itself is not always exact. The tree assumption is the key qualifier.

## 3.8 What To Actually Remember for an Exam

- variable elimination is exact but order-sensitive
- induced factor size is the real computational issue
- treewidth summarizes exact-inference hardness
- sum-product BP is exact on trees
- max-product is the MAP analogue
- loopy BP is approximate in general
