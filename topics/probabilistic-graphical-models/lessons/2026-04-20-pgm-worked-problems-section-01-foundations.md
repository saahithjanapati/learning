# PGM Worked Problems 1: Foundations

Use with [[2026-04-20-pgm-exam-prep-section-01-foundations]] and [[2026-04-20-pgm-memory-01-foundations]].

## Table of Contents

- [[#Problem 1.1: Why the Full Joint Blows Up]]
- [[#Problem 1.2: Sorting Questions by Task Type]]
- [[#Problem 1.3: What the Graph Is Buying You]]

## Problem 1.1: Why the Full Joint Blows Up

Suppose $X_1,\dots,X_{10}$ are binary random variables.

1. How many entries does the full joint table $p(x_1,\dots,x_{10})$ have?
2. Why is this the basic motivation for graphical models?

### Solution

For binary variables, each variable has $2$ possible values. So the joint table has
$$
2^{10}=1024
$$
entries.

The reason this matters is that the table size grows exponentially in the number of variables. If we had $n$ binary variables, we would need
$$
2^n
$$
entries.

So the lesson is:

- the full joint distribution is the true probabilistic object
- but writing it directly becomes expensive very quickly
- graphical models try to replace one huge table by a structured factorization

## Problem 1.2: Sorting Questions by Task Type

For each question below, say whether it is mainly a `representation`, `inference`, or `learning / sampling` question.

1. Write a factorization of a joint distribution using a graph.
2. Compute $p(x_3 \mid x_1)$.
3. Draw approximate samples from a posterior.
4. Find the most likely assignment of all variables.

### Solution

1. `representation`

This is about how the model is written.

2. `inference`

This is asking for a conditional distribution derived from the model.

3. `learning / sampling`

This is about generating samples rather than just representing the model.

4. `inference`

MAP inference is still an inference task. You are using the model to answer a probabilistic query.

The broad pattern to remember is:

- representation: how the joint is written
- inference: what the model implies
- learning / sampling: how parameters or approximate draws are obtained

## Problem 1.3: What the Graph Is Buying You

Explain in words why a sparse graph can make probabilistic computation easier.

### Solution

A sparse graph says that not every variable directly interacts with every other variable.

That helps in two ways.

First, it gives a smaller representation. Instead of one giant joint table, we write the model as local factors or local conditionals.

Second, it gives better algorithms. Inference methods like variable elimination or belief propagation can exploit the fact that only certain groups of variables are directly linked.

So the graph is not just a picture. It encodes assumptions about local dependence, and those assumptions can reduce:

- the number of parameters
- the size of intermediate computations
- the difficulty of probabilistic queries
