# Probabilistic Graphical Models Midterm 1 Intro Summary (Beginner Friendly)

Date: `2026-02-20`  
Mode: `learn` (exposition-first)  
Scope: lecture content up to and including MCMC (high dimensions, multimodality)

## What This Class Is About

Probabilistic graphical models (PGMs) are a way to represent complex joint probabilities using a graph so we can reason and compute more efficiently.

- Nodes = random variables.
- Edges = dependency structure.
- Goal: answer inference questions (marginals, MAP, sampling) without brute force over all assignments.

## Big Picture Map

1. Represent distributions compactly:
- Directed graphical models (DGMs / Bayesian networks)
- Undirected graphical models (UGMs / Markov random fields)

2. Compute with those models:
- Exact inference when structure is favorable (variable elimination, belief propagation)
- Approximate inference when exact is too expensive (MCMC)

3. Connect to modern ML:
- Message passing perspective links PGMs and GNNs

## Topic-by-Topic Intro

## 1) DGM / UGM

Directed graphical models (DGM):
- Graph is a DAG (arrows, no directed cycles).
- Factorization:
$$
p(\mathbf{x}) = \prod_i p(x_i \mid pa_i)
$$
- Interpretation: local conditional rules; easy ancestral sampling in topological order.

Undirected graphical models (UGM):
- Graph has no arrow direction.
- Factorization over cliques/potentials:
$$
p(\mathbf{x}) = \frac{1}{Z}\prod_{C}\psi_C(\mathbf{x}_C)
$$
- Equivalent energy view:
$$
p_\theta(x) \propto \exp(-E_\theta(x))
$$
- Key extra object: partition function $Z$, usually hard to compute exactly.

Core intuition:
- DGM: "who directly conditions on whom"
- UGM: "which variables should be jointly compatible"

## 2) Variable Elimination and Belief Propagation

Variable Elimination (VE):
- Exact inference by summing out variables one at a time.
- Eliminating a node creates a new factor on its neighbors ("fill-in edges").
- Complexity depends heavily on elimination order.
- Treewidth captures this bottleneck (larger induced cliques => larger tables => slower).

Belief Propagation (BP):
- A message-passing dynamic program on factor graphs.
- On acyclic graphs (trees): exact marginals.
- On loopy graphs: often used approximately (no exact guarantee in general).

Useful split:
- VE: exact but can explode if bad order/high treewidth.
- BP: exact on trees and gives all marginals efficiently in that case.

## 3) Message Passing

Message passing idea:
- Each node/factor sends local summaries to neighbors.
- A variable's belief is product/combination of incoming messages.
- This avoids recomputing shared subproblems, so it is dynamic programming on graphs.

Exam-level intuition:
- Local computations + graph structure = global inference.

## 4) GNNs

GNN layer viewpoint:
- Message step: each neighbor creates a message from its current embedding.
- Aggregation step: combine neighbor messages (sum/mean/max, etc.) to update node.

Connection to PGMs:
- Looks like BP-style local information exchange.
- Difference: BP computes probabilistic quantities under a model; GNN learns task-specific embeddings.

Limits discussed in lecture:
- Standard message-passing GNNs have expressiveness limits (linked to Weisfeiler-Lehman style distinctions).

## 5) MCMC (Markov Chain Monte Carlo)

Why MCMC:
- Exact inference is often intractable in high-treewidth/high-dimensional models.
- MCMC builds a Markov chain whose stationary distribution is the target distribution.
- Then use samples to estimate marginals/expectations.

Core conditions/concepts:
- Stationary distribution
- Detailed balance (common sufficient condition)
- Irreducibility + aperiodicity (for unique limiting behavior under standard conditions)
- Mixing: how fast chain reaches representative sampling behavior

## 6) Metropolis-Hastings (MH)

MH update:
1. Propose $j$ from $q(i,j)$.
2. Accept with
$$
\alpha(i,j)=\min\left(1,\frac{\pi_j q(j,i)}{\pi_i q(i,j)}\right)
$$
3. If rejected, stay at current state.

Key practical point:
- Works with unnormalized target scores $b(x)$ since normalization constants cancel.





## 7) Gibbs Sampling

Gibbs update:
1. Pick coordinate $i$.
2. Sample $x_i$ from full conditional $p(x_i \mid x_{-i})$.
3. Replace only that coordinate; keep others fixed.

Important relation:
- Gibbs is a special case of MH with acceptance probability 1 (for that proposal choice).





## 8) MCMC in High Dimensions and Multimodality

Main challenge:
- In high dimensions or multimodal targets, local random-walk moves can mix slowly.
- Chain may spend long time in one mode before moving to another.

Why this matters:
- Poor mixing means biased estimates if run is too short.
- Motivation for better proposals and advanced methods (e.g., tempering/HMC mentioned in course framing).

## Exam-Oriented Preparation Map

Given question types (`MCQ`, `True/False`, `Short Answer`, `Calculation/Proof`), focus on:

- Definitions you can state cleanly:
  - DGM vs UGM, factorization form, partition function, treewidth, stationary distribution.
- Algorithm mechanics you can execute:
  - One VE pass, one BP message update intuition, one MH step, one Gibbs step.
- Comparisons you can explain:
  - VE vs BP, BP vs GNN message passing, MH vs Gibbs.

## One-Page Notes Draft (Print-Friendly Core)

Put these on your allowed one-page sheet:

1. Factorization formulas
$$
\text{DGM: } p(\mathbf{x})=\prod_i p(x_i\mid pa_i)
$$
$$
\text{UGM: } p(\mathbf{x})=\frac{1}{Z}\prod_C \psi_C(\mathbf{x}_C),\quad
Z=\sum_{\mathbf{x}}\prod_C \psi_C(\mathbf{x}_C)
$$

2. VE reminder
- Eliminate variable $\to$ multiply incident factors $\to$ sum out variable $\to$ new factor on neighbors.
- Order matters; complexity tied to largest induced clique (treewidth).

3. BP reminder (tree factor graph)
- Variable-to-factor: product of incoming messages from other neighbors.
- Factor-to-variable: sum over other factor variables of factor times incoming messages.
- Tree case: exact marginals after two passes (leaves->root, root->leaves).

4. MH and Gibbs
$$
\alpha(i,j)=\min\left(1,\frac{\pi_j q(j,i)}{\pi_i q(i,j)}\right)
$$
- Gibbs: sample one coordinate from full conditional; MH special case with accept=1.

5. High-yield contrasts
- DGM: local conditionals and DAG semantics.
- UGM: compatibility/potentials and $Z$.
- Exact inference can be exponential; MCMC is approximate sampling.
- GNN message passing is analogous in structure, not identical in objective.

## Suggested First Study Session (60-90 min)

1. Read this summary once end-to-end.
2. Draw one tiny DGM and one tiny UGM; write their factorizations.
3. Hand-run:
- one VE elimination on a 4-node chain,
- one MH accept/reject decision with made-up numbers,
- one Gibbs coordinate update.
4. Build your one-page sheet from the template above.

## Scope and Scheduling Notes

- Midterm scope used here: Lectures 1-11 up to and including MCMC topics listed by you.
- Review recitation noted: Friday, `2026-02-20`, `2:00-3:20 pm`, `DH 2315` (recording in Panopto).
