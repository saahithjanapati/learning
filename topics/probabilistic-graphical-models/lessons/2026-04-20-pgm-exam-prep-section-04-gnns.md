# 4. GNNs, Learned Message Passing, and the PGM Connection

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#4.0 Why GNNs Appear in a PGM Course]]
- [[#4.1 The Generic Message-Passing Template]]
- [[#4.2 What GNNs Really Borrow From Belief Propagation]]
- [[#4.3 What GNNs Do Not Borrow From Belief Propagation]]
- [[#4.4 Receptive Fields, Locality, and Permutation Symmetry]]
- [[#4.5 Over-Smoothing]]
- [[#4.6 Over-Squashing]]
- [[#4.7 A Concrete Example: Shortest Paths as Message Passing]]
- [[#4.8 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is a bridge.

The course spent a long time teaching message passing as an inference method for graphical models.
Now it wants you to notice something broader:

`local computation on graphs is a general algorithmic pattern, not just a PGM trick`

Graph neural networks reuse that pattern.

But they reuse it for a different purpose.

In belief propagation:

- messages have precise probabilistic meaning
- the update rules come from the factorization of a probability model
- on trees, the result is exact

In GNNs:

- messages are learned feature vectors
- the update rules are neural modules trained from data
- the goal is usually prediction or representation learning, not exact inference

So the relationship is:

`same graph-computation template, different semantics`

That is the most important sentence in the section.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 8`

If this note feels like a detour, that is normal.
The point is not to turn you into a GNN specialist.
The point is to help you recognize what from the PGM part of the course is being reused and what is fundamentally new.

As you read, keep asking:

- what object is being passed along edges?
- what is being updated?
- what task is the model actually trying to solve?

Those three questions organize the whole section.

## 4.0 Why GNNs Appear in a PGM Course

At first glance, GNNs may feel unrelated to probabilistic graphical models.

But the course is connecting them through **message passing**.

In a PGM:

- the graph specifies statistical structure
- inference often reduces to local summary computations on that graph

In a GNN:

- the graph specifies who can communicate directly
- hidden representations are updated by repeatedly exchanging local information

So the common computational motif is:

- local edge-wise communication
- repeated over multiple rounds
- producing nonlocal effects after enough rounds

That is why the topic belongs here.

## 4.1 The Generic Message-Passing Template

A standard message-passing GNN layer can be written as
$$
\begin{aligned}
m_v^{(t+1)}
&=
\operatorname{AGGREGATE}\left(\left\{M_t(h_v^{(t)},h_u^{(t)},e_{uv}) : u \in N(v)\right\}\right),\\
h_v^{(t+1)}
&=
\operatorname{UPDATE}(h_v^{(t)},m_v^{(t+1)}).
\end{aligned}
$$

Read this slowly.

Each node `v` has a hidden state $h_v^{(t)}$ at layer or iteration `t`.

To update node `v`:

1. each neighbor `u` contributes some message
2. those messages are aggregated
3. the node updates its hidden state using the aggregated information

That is the whole template.

### What the symbols mean in plain English

- $h_v^{(t)}$: current representation of node `v`
- $N(v)$: neighbors of `v`
- $e_{uv}$: optional edge features
- $M_t$: message function
- `AGGREGATE`: combine messages from many neighbors
- `UPDATE`: produce the next hidden state

### Why repeated layers matter

After one layer, a node has only incorporated one-hop neighbor information.

After two layers, it can incorporate information that originated two hops away.

So stacking layers increases the size of the node's **receptive field**.

This is the same broad phenomenon as repeated message passing in PGMs:
local updates can gradually produce long-range computational effects.

## 4.2 What GNNs Really Borrow From Belief Propagation

The analogy to BP is real, but you need to be precise about what is being borrowed.

### Shared structural features

In both BP and GNNs:

- nodes communicate only along graph edges
- local computations are reused everywhere in the graph
- multiple rounds let information travel farther
- the graph topology controls who can influence whom directly

This is why GNNs are called message-passing neural networks.

### The deep shared idea

Both frameworks say:

`do not try to compute everything globally in one giant step; instead, build the global computation out of repeated local summaries`

That is the real connection to remember.

## 4.3 What GNNs Do Not Borrow From Belief Propagation

This is where students often overstate the analogy.

In BP:

- messages come from probability algebra
- updates involve sums or maxima over factors
- beliefs aim to approximate or compute marginals or MAP quantities

In GNNs:

- messages are learned representations
- updates are parameterized neural operations
- the target is usually task performance, such as node classification, graph classification, or link prediction

So the meaning of the state is different.

### BP states and messages

These have probabilistic semantics.
On trees, they correspond to exact subtree summaries.

### GNN hidden states and messages

These are feature vectors learned to be useful for the training objective.
They are not usually probabilities, marginals, or partition-function quantities.

This is the simplest high-quality exam sentence:

`BP is model-derived probabilistic message passing; GNNs are learned feature-passing architectures on graphs`

## 4.4 Receptive Fields, Locality, and Permutation Symmetry

Now make the computational structure more explicit.

### Receptive field

After `k` message-passing layers, a node's representation can only depend on information from nodes at graph distance at most `k`.

That is the locality constraint.

It explains both the strength and the weakness of message-passing GNNs:

- they are natural for local graph patterns
- they struggle when the task requires subtle long-range interactions

### Permutation symmetry

The nodes in a graph do not come with a meaningful left-to-right order the way words in a sentence do.
So the aggregation rule should not depend on the arbitrary order in which neighbors are listed.

That is why `AGGREGATE` is usually something permutation-invariant such as:

- sum
- mean
- max

This is an important formal design constraint.
If neighbor order changed the result, the model would not be respecting the graph structure properly.

### Why locality matters in practice

Suppose the label of a node depends mostly on its neighborhood.
Then a local message-passing model is a natural fit.

Suppose instead the answer depends on a delicate long-range pattern many hops away.
Then pure local message passing may need many layers, and many layers create their own pathologies.

Those pathologies are over-smoothing and over-squashing.

## 4.5 Over-Smoothing

Over-smoothing means node representations become too similar after many rounds of message passing.

### Intuition

Each round mixes neighboring information.
If you keep mixing repeatedly, local distinctions get washed out.

Then many node embeddings start to cluster together in representation space, making them hard to distinguish.

### What you should remember

Over-smoothing is a **representation collapse through repeated averaging or mixing** problem.

The high-yield sentence is:

`too many layers can make different nodes look too similar`

## 4.6 Over-Squashing

Over-squashing is different.

It means information from many distant nodes is forced through a narrow communication bottleneck and compressed into a small vector.

### Intuition

Imagine a wide graph region funneling information through one thin bridge.
Even if distant information matters, the model may not have enough capacity in that bottleneck to transmit it faithfully.

### What you should remember

Over-squashing is a **long-range information bottleneck** problem.

The high-yield sentence is:

`important distant information gets compressed too aggressively while traveling through the graph`

### Keep the distinction clear

- over-smoothing = representations become too alike
- over-squashing = too much distant information is forced through too little capacity

They are not the same failure mode.

## 4.7 A Concrete Example: Shortest Paths as Message Passing

One of the nicest examples in the practice material is shortest paths on an unweighted graph.

Let `s` be a source node and let `d(v)` be the shortest-path distance from `s` to `v`.

A dynamic-programming update can be written as
$$
d_{t+1}(v)
=
\min\left(d_t(v),\,1+\min_{u\in N(v)} d_t(u)\right).
$$

Read that in words:

- either the current best distance at node `v` stays as it is
- or one of the neighbors already knows a shorter route, in which case `v` can improve its value by adding one edge

This is not a neural network.
But structurally it has the same pattern:

- neighbors send local information
- the node aggregates it
- the node updates its state

That is why this example is so useful.
It shows that "message passing" is a broad computational idea, not just a buzzword attached to GNNs.

## 4.8 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say:

> GNNs appear in a PGM course because they reuse the local message-passing template that also appears in inference algorithms like belief propagation. The resemblance is structural, not semantic: BP messages come from probability algebra, while GNN messages are learned feature vectors. Locality gives GNNs power on neighborhood-based tasks, but many layers can create over-smoothing and over-squashing.

## Formal Anchors

These are the more formal statements worth being able to recognize and explain.

### Generic message-passing layer

The standard form is
$$
\begin{aligned}
m_v^{(t+1)}
&=
\operatorname{AGGREGATE}\left(\left\{M_t(h_v^{(t)},h_u^{(t)},e_{uv}) : u \in N(v)\right\}\right),\\
h_v^{(t+1)}
&=
\operatorname{UPDATE}(h_v^{(t)},m_v^{(t+1)}).
\end{aligned}
$$

This formalizes the idea of neighbor-to-node communication followed by a state update.

### Receptive field statement

After `k` rounds of local message passing, node `v` can only depend on nodes within `k` hops of `v`.

That is the formal locality limit.

### Permutation invariance requirement

The neighbor aggregation function should be invariant to the ordering of neighbors.

This is why `sum`, `mean`, and `max` are common aggregation operators.

### BP versus GNN formal contrast

Belief propagation derives its updates from a factorized probabilistic model.
GNN updates are learned parameterized functions optimized for predictive tasks.

So the shared graph structure does not imply shared probabilistic semantics.

## Worked Problems

### Problem 4.1

Why is it reasonable to compare GNNs to belief propagation at all?

### Solution

Because both are built from local message passing on a graph.
In each case, nodes exchange local summaries along edges and repeated updates allow more distant information to have influence.

The comparison is structural, not semantic.

### Problem 4.2

What is the main conceptual difference between a BP message and a GNN message?

### Solution

A BP message has probabilistic meaning and is derived from the model factorization.
A GNN message is a learned feature vector produced by a neural architecture for a downstream task.

So BP is model-derived inference, while GNNs are learned representation computation.

### Problem 4.3

Why do GNN aggregators usually use operations like `sum`, `mean`, or `max` rather than concatenating neighbors in arbitrary listed order?

### Solution

Because a graph neighborhood has no meaningful canonical ordering.
If the output changed when the same neighbors were listed in a different order, the model would not respect the symmetry of the graph.

So the aggregator should be permutation-invariant.

### Problem 4.4

What can a node depend on after `k` rounds of message passing?

### Solution

Only information originating within `k` hops.
That is because each round only communicates across one edge.

So deeper message passing expands the receptive field one hop per layer.

### Problem 4.5

Explain the difference between over-smoothing and over-squashing.

### Solution

Over-smoothing means repeated mixing makes many node representations too similar.

Over-squashing means information from many distant nodes is compressed through a narrow bottleneck and cannot be transmitted faithfully.

So one is about collapse of similarity, while the other is about limited communication capacity.

### Problem 4.6

Why is shortest-path computation a good example of message passing even though it is not a neural network?

### Solution

Because it has the same computational shape:

- neighbors send local information
- the node aggregates it
- the node updates its state

This shows that message passing is a general graph-computation template, not something unique to deep learning.
