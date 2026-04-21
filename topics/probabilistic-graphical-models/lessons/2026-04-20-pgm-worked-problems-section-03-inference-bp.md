# PGM Worked Problems 3: Exact Inference and Belief Propagation

Use with [[2026-04-20-pgm-exam-prep-section-03-inference-bp]] and [[2026-04-20-pgm-memory-03-inference-bp]].

## Table of Contents

- [[#Problem 3.1: A Variable-Elimination Query]]
- [[#Problem 3.2: Why Elimination Order Matters]]
- [[#Problem 3.3: When Belief Propagation Is Exact]]

## Problem 3.1: A Variable-Elimination Query

Suppose a directed chain factorizes as
$$
p(x_1,x_2,x_3)=p(x_1)p(x_2 \mid x_1)p(x_3 \mid x_2).
$$

Write an expression for the marginal $p(x_3)$ using variable elimination.

### Solution

To compute $p(x_3)$, we sum out the hidden variables $x_1$ and $x_2$:
$$
p(x_3)=\sum_{x_1}\sum_{x_2} p(x_1)p(x_2 \mid x_1)p(x_3 \mid x_2).
$$

That is the brute-force elimination expression.

The variable-elimination point is that we try to group the sums efficiently.

For example, first eliminate $x_1$:
$$
m(x_2)=\sum_{x_1} p(x_1)p(x_2 \mid x_1).
$$

Then
$$
p(x_3)=\sum_{x_2} m(x_2)p(x_3 \mid x_2).
$$

So variable elimination builds intermediate factors instead of expanding the whole joint at once.

## Problem 3.2: Why Elimination Order Matters

In variable elimination, why can two different elimination orders have very different computational cost, even though they give the same exact answer?

### Solution

The answer is that eliminating a variable creates a new intermediate factor over its neighbors.

If the elimination order creates large intermediate factors, then:

- more variables appear in one table
- the table has more entries
- the computation becomes much more expensive

If the order creates only small factors, then the same exact marginal can be computed much more cheaply.

So elimination order does not change correctness. It changes the size of the intermediate factors, which is why it changes runtime and memory.

This is the practical reason treewidth matters.

## Problem 3.3: When Belief Propagation Is Exact

State when sum-product belief propagation is exact and when it becomes approximate.

### Solution

Sum-product belief propagation is exact on a tree-structured graph or, more generally, on an acyclic factor graph.

In that setting, the local messages are enough to recover exact marginals because there are no loops causing information to circulate repeatedly.

On graphs with cycles, the same message-passing updates are called loopy belief propagation. Then the method is generally approximate:

- it may converge or fail to converge
- if it converges, the beliefs are not guaranteed to be exact marginals

So the exam-level fact to remember is:

- trees: exact
- loopy graphs: approximate
