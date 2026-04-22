# 2. Directed and Undirected Graphical Models

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#2.0 First Question: What Kind of Structure Are We Trying To Capture?]]
- [[#2.1 Directed Models, Slowly]]
- [[#2.2 Why Directed Models Feel Generative]]
- [[#2.3 Conditional Independence in Directed Models]]
- [[#2.4 D-Separation, Slowly]]
- [[#2.5 Moralization and the Markov Blanket in a DAG]]
- [[#2.6 Undirected Models, Slowly]]
- [[#2.7 Potentials, Energies, and the Partition Function]]
- [[#2.8 Conditional Independence in Undirected Models]]
- [[#2.9 Clique Factorization and Hammersley-Clifford]]
- [[#2.10 Directed Versus Undirected: What Really Changes?]]
- [[#2.11 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is about the first major design choice in graphical models:

if you want to write down a large joint distribution compactly, what kind of local structure are you going to use?

There are two big answers in this course:

- use **directed edges**, which give you local conditional probabilities
- use **undirected edges**, which give you local compatibility scores

Both are trying to do the same high-level job:

`describe a big probability distribution using small local pieces`

But they organize those pieces differently.

If you are new to the topic, do not think:

"DAGs are one chapter, undirected graphs are another chapter."

Think:

"These are two different languages for encoding structure in a joint distribution."

That framing makes the rest of the section much easier.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 2`
- `Lecture 3/4`

This section introduces a lot of foreign terminology very quickly:

- parent
- child
- collider
- d-separation
- moralization
- Markov blanket
- clique
- partition function

So do not try to read it as a list of facts to memorize blindly.
Read it as a story:

1. directed models write the joint using local conditional probabilities
2. undirected models write the joint using local scores
3. the graph tells you what kinds of independence claims are being made
4. the normalization story is different in the two settings

If you can explain those four sentences in plain English, you are already doing well.

## 2.0 First Question: What Kind of Structure Are We Trying To Capture?

In Section 1, the problem was:

`the full joint distribution is too large to write naively`

Now we ask the next question:

what kind of compact formula should replace the gigantic joint table?

There are many possible factorizations of the same joint distribution.
The point of a graphical model is to pick a factorization that matches some local structure in the problem.

Two common kinds of local structure are:

### 1. Asymmetric "this variable depends on those variables"

This leads naturally to directed models.

Examples:

- disease status influences symptoms
- latent class influences observed features
- previous hidden state influences next hidden state

### 2. Symmetric "these variables prefer to agree or co-occur"

This leads naturally to undirected models.

Examples:

- neighboring pixels prefer similar labels
- adjacent spins in physics prefer alignment
- nearby nodes in a labeling problem prefer compatible states

So the big distinction is not just about whether arrows are present.
It is about the kind of local relationship you want the model to express.

## 2.1 Directed Models, Slowly

A **directed graphical model** uses a directed acyclic graph, or DAG.

The factorization rule is:
$$
p(x_1,\dots,x_n)=\prod_{i=1}^n p(x_i \mid pa_i),
$$
where $pa_i$ means the parents of node $X_i$ in the graph.

Read that formula slowly.

It says:

- every node contributes one local conditional distribution
- the conditionals only look at that node's parents
- multiplying all those local conditionals gives the full joint

That is the core definition.

### Why acyclic?

The graph must be acyclic because we want the factorization to be well-ordered.
If there were a directed cycle, then variables would depend on each other in a circular local definition:

$$
X_1 \to X_2 \to X_3 \to X_1.
$$

That breaks the clean "sample parents first, then children" story.

So a DAG is not just a graph with arrows.
It is a graph whose arrows can be arranged in a topological order.

### Important beginner warning

An arrow in a DAG does **not automatically** mean a causal relationship.

Sometimes it is causal.
Sometimes it is just a modeling or factorization choice.

So the safe statement is:

`in an ordinary graphical-model context, an arrow means the child's local conditional is allowed to depend on the parent`

Do not silently replace that with causality unless the problem specifically says the graph is causal.

The most basic DAG skill is:

`see the graph, read off the parent sets, and write the product of local conditionals`

### Why this is a compression

The DAG is making a strong statement:

each variable only looks locally at its parents, not at every other variable in the model.

That means missing edges matter.

If there is no edge from $X_j$ to $X_i$, the model is saying:

"once the parents of $X_i$ are known, I do not need $X_j$ inside the local conditional for $X_i$."

That is where the compression comes from.

## 2.2 Why Directed Models Feel Generative

Directed models have a very natural sampling story.

If the graph is a DAG, there exists a topological order:
parents come before children.

Then you can sample the full joint by moving through the graph in that order:

1. sample any root nodes
2. sample each later node using the values already sampled for its parents
3. continue until all variables are sampled

This is called **ancestral sampling**.

That is why people often say DAGs have a "generative" interpretation.

### Directed versus undirected at a glance

The reason this picture is useful is that it places the two normalization stories next to each other:
in a DAG, each local piece is already a conditional probability; in a UGM, each local piece is just a score and one global normalizer fixes the whole product.

![[local-assets/openai-images/section02-directed-vs-undirected.png]]

### Local normalization is the key

Each conditional in a DAG satisfies
$$
\sum_{x_i} p(x_i \mid pa_i)=1
$$
for every fixed parent assignment.

So the local pieces are already valid probabilities.
That is why there is no separate global partition function in the DAG factorization.

### Parameter savings

Suppose each variable takes `r` possible values and each node has at most `D` parents.
Then each local conditional table is on the order of `r^D` in parent configuration size, not `r^n`.

So DAG structure is useful when each node has only a few parents.

The high-level lesson is:

`low in-degree can turn an impossible full joint table into manageable local conditional tables`

### Latent variables fit naturally

Directed models are especially comfortable when you want to tell a hidden-cause story.

Typical example:
$$
p_\theta(x,z)=p_\theta(z)p_\theta(x\mid z).
$$

Read that in words:

- first there is a hidden variable $Z$
- then $Z$ generates the observation $X$

This basic template shows up everywhere:

- mixture models
- HMMs
- topic models
- VAEs later in the course

## 2.3 Conditional Independence in Directed Models

This is the section where many students first get confused.
The issue is that a DAG is not only a factorization device.
It is also an **independence language**.

The first local statement is the **local Markov property**:

`each node is conditionally independent of its non-descendants given its parents`

That sentence is correct, but it often feels abstract at first.
So the real beginner move is to master the three tiny path patterns.

### Pattern 1: Chain

$$
X \to Y \to Z
$$

Interpretation:

- information can flow from $X$ to $Z$ through $Y$
- but once $Y$ is known, the remaining uncertainty in $Z$ no longer needs $X$

So
$$
X \perp Z \mid Y.
$$

### Pattern 2: Fork

$$
X \leftarrow Y \to Z
$$

Interpretation:

- $Y$ is a common cause
- if $Y$ is hidden, then learning about $X$ tells you something about $Z$
- if $Y$ is observed, the shared cause is already known

So
$$
X \perp Z \mid Y.
$$

### Pattern 3: Collider

$$
X \to Y \leftarrow Z
$$

This is the weird one, and it is the one that students usually need to revisit several times.

If the collider $Y$ is **not observed**, the path is blocked.

If the collider $Y$, or a descendant of $Y$, **is observed**, the path opens.

So without conditioning on the collider, we have:
$$
X \perp Z.
$$

But after conditioning on the collider, the variables can become dependent.

This is the famous **explaining away** effect.

### Slow intuition for explaining away

Suppose:

- $X$ = student is sick
- $Z$ = student overslept
- $Y$ = student missed class

Both sickness and oversleeping can cause missing class.

If you only know the student missed class, then the two causes start competing:

- if you learn the student was not sick, oversleeping becomes more likely
- if you learn the student definitely overslept, sickness becomes less necessary as an explanation

That dependence appears only because the common effect was observed.

### Visual: Chain, Fork, and Collider

This is the single most important memory aid in the early DAG material.
You want to be able to look at it and immediately say "chain blocks when middle is observed, fork blocks when middle is observed, collider opens when middle is observed."

![[local-assets/openai-images/section02-dag-path-patterns.png]]

This is absolutely worth memorizing cold.

## 2.4 D-Separation, Slowly

The three small patterns are the atoms.
**D-separation** is the rule for larger graphs.

The big idea is:

to decide whether two sets of variables are conditionally independent given evidence, you check whether every path between them is blocked.

### Step 1: Ignore arrow direction when listing paths

When checking d-separation, a path just means an undirected path through the graph.
You are not asking whether there is a directed route from one node to another.
You are asking whether there is any path shape connecting them.

### Step 2: On each path, classify each middle node

Every middle node on the path behaves like one of the three patterns:

- chain
- fork
- collider

### Step 3: Decide whether the path is active or blocked

The path is blocked if it contains:

- an observed chain node
- an observed fork node
- an unobserved collider with no observed descendant

The path is active if none of those blockers occurs.

### Very common beginner mistake

Students often remember "conditioning blocks dependence" and apply it everywhere.
That is wrong.

Conditioning:

- blocks chains
- blocks forks
- opens colliders

That asymmetry is the whole point.

This is exactly the kind of short conceptual reasoning you should be ready to do on an exam:
trace a path, classify each middle node as a chain, fork, or collider, and then decide whether the evidence blocks or opens the path.

## 2.5 Moralization and the Markov Blanket in a DAG

D-separation is the native directed-graph language.
But sometimes the course converts the problem into an undirected graph.
That conversion is called **moralization**.

### Why do this at all?

Because ordinary graph separation in an undirected graph is often easier to inspect than d-separation directly in a DAG.

### The moralization procedure

To check whether $X_A \perp X_B \mid X_E$ in a DAG, the lecture procedure is:

1. keep the query nodes, the evidence nodes, and all of their ancestors
2. connect any pair of parents that share a child
3. drop arrow directions
4. remove or condition on the evidence appropriately
5. check ordinary graph separation

The phrase "marry the parents" refers to step 2.

Why do we have to connect co-parents?
Because a common child can induce dependence behavior that a plain direction-dropping step would miss.

### Markov blanket in a DAG

The **Markov blanket** of a node is the smallest set of variables that shields it from the rest of the graph.

For a node in a DAG, the blanket contains:

- its parents
- its children
- its children's other parents

This is worth understanding, not just memorizing.

### Why those three groups?

Parents matter because they directly help determine the node.

Children matter because they carry information about the node.

Children's other parents matter because once a child is observed, those co-parents interact with the node through explaining away.

So in a DAG, the blanket is a little richer than just "neighbors."

### Visual: Moralization and the DAG Markov Blanket

This is useful because it lines up two ideas that often feel separate in lecture notes:
co-parents get connected during moralization, and that same local neighborhood is what shows up in the node's Markov blanket.

![[local-assets/openai-images/section02-moralization-markov-blanket.png]]

## 2.6 Undirected Models, Slowly

Now switch languages.

An **undirected graphical model** writes the joint as
$$
p(x)=\frac{1}{Z}\prod_C \psi_C(x_C),
$$
where the factors $\psi_C$ are called **potentials** or **compatibility functions**.

This looks similar to a factorization, but the interpretation is different from a DAG.

In a DAG:

- local pieces are conditional probabilities

In a UGM:

- local pieces are arbitrary nonnegative scores

That is the conceptual shift.

### What a potential means

A potential is not saying:

"given these variables, here is a normalized probability."

It is saying:

"this local configuration is more or less compatible."

If a configuration makes many local potentials large, the total unnormalized score becomes large.
Then the partition function turns those scores into proper probabilities.

### Why this is useful

Undirected models are natural when interactions feel symmetric.

Examples:

- neighboring pixels in an image segmentation problem
- adjacent spins in an Ising model
- nearby labels on a grid

There is no obvious one-way generative arrow story there.
The important thing is just that nearby variables prefer compatible values.

That is why the lecture often describes UGMs as encoding **soft constraints**.

## 2.7 Potentials, Energies, and the Partition Function

The partition function is
$$
Z=\sum_x \prod_C \psi_C(x_C).
$$

Its job is simple:

take the unnormalized product of local scores and divide by the total mass so the result becomes a valid probability distribution.

### Why UGMs need a partition function

Because nothing forces the product
$$
\prod_C \psi_C(x_C)
$$
to sum to `1`.

The potentials are just scores.
They might be huge, tiny, or in arbitrary relative proportion.

### Why DAGs do not need one

Because each local conditional in a DAG is already normalized over the child variable.
The product of those local conditional distributions gives a valid joint automatically.

This is one of the most important comparison points in the whole section:

`directed models normalize locally; undirected models normalize globally`

### Energy form

People often rewrite a UGM as
$$
p_\theta(x)\propto \exp(-E_\theta(x)).
$$

This is the same idea in different notation.

- low energy means high probability
- high energy means low probability

You can think of the energy as a penalty score.
Configurations with smaller total penalty are more likely.

Even if the local factors are simple, the global normalization can still be difficult because computing $Z$ sums over all global assignments.

## 2.8 Conditional Independence in Undirected Models

The good news is that the independence story is simpler here.

In an undirected graph, you do not need d-separation.
You just use ordinary graph separation.

### Global Markov property

If node set $C$ separates node sets $A$ and $B$ in the graph, then
$$
X_A \perp X_B \mid X_C.
$$

That is the main rule.

### Local Markov property

A node is conditionally independent of everything else given its neighbors:
$$
p(x_v \mid x_{N(v)},x_{\text{rest}})=p(x_v \mid x_{N(v)}).
$$

So for a UGM, the Markov blanket is especially simple:

`the neighbors are the blanket`

That is much cleaner than the DAG case.

### Why this feels nicer

In a UGM, there are no collider subtleties.
There is no special rule where conditioning sometimes blocks and sometimes opens a path.

Instead, the graph is read more literally:

if all routes from $A$ to $B$ must pass through $C$, then conditioning on $C$ separates them.

## 2.9 Clique Factorization and Hammersley-Clifford

A **clique** is a fully connected set of nodes.

A **maximal clique** is a clique that cannot be enlarged without losing full connectivity.

In undirected models, the joint can be written in terms of clique potentials:
$$
p(x)=\frac{1}{Z}\prod_C \phi_C(x_C),
$$
where the product is over maximal cliques.

This matters because it tells you where the local factors are allowed to live:
on fully connected groups of variables.

### What Hammersley-Clifford says at course level

At the exam-prep level, the point is not to memorize every technical condition.
The point is to understand the equivalence:

- one way to view a UGM is by graph separation and conditional independence
- another way to view it is by factorization over cliques

Those two views line up.

So the graph is doing two jobs at once:

1. it tells you what conditional independences are implied
2. it tells you how the distribution can factor into clique potentials

### Visual: Separation and Clique Factorization in a UGM

This is useful because it keeps the two UGM viewpoints on the same page:
ordinary graph separation on one side, clique-based factorization on the other.

![[local-assets/openai-images/section02-ugm-separation-cliques.png]]

For example, in a simple chain $X_1 - X_2 - X_3$, the maximal cliques are the two edges $\{X_1,X_2\}$ and $\{X_2,X_3\}$, so the graph simultaneously tells you the factorization pattern and the separation statement $X_1 \perp X_3 \mid X_2$.

## 2.10 Directed Versus Undirected: What Really Changes?

This is the comparison you want in your head for the exam.

### Directed models

- use local conditional probabilities
- require acyclicity
- support ancestral sampling naturally
- are good for hidden-cause or generative stories
- use d-separation for conditional independence

### Undirected models

- use local compatibility scores
- allow symmetric interactions
- usually require a partition function
- are natural for soft constraints and energy-based views
- use ordinary graph separation for conditional independence

### The real tradeoff in one sentence

`directed models push structure into local normalized conditionals; undirected models push structure into unnormalized local scores plus one global normalizer`

That sentence is worth being able to say from memory.

### A second sentence that is also useful

`DAGs are usually easier to sample from; UGMs are often cleaner for symmetric interactions but harder to normalize`

### One more beginner warning

Do not turn this into:

- "DAGs are always better"
- "UGMs are always more expressive"

The right question is always:

what kind of local structure does the modeling problem naturally have?

## 2.11 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to explain all of the following in ordinary language:

- A DAG factorizes a joint as $\prod_i p(x_i \mid pa_i)$.
- Missing edges in a DAG mean the local conditional does not directly depend on every earlier variable.
- Arrows in a probabilistic DAG do not automatically mean causality.
- Chain and fork paths are blocked by observing the middle node.
- Colliders are blocked when unobserved and opened when the collider or its descendant is observed.
- D-separation means every path between two variable sets is blocked.
- Moralization turns a DAG independence question into an undirected separation question.
- The DAG Markov blanket is parents, children, and children's other parents.
- A UGM factorizes as $(1/Z)\prod_C \psi_C(x_C)$.
- UGM potentials are compatibility scores, not conditional probabilities.
- The partition function globally normalizes those scores.
- In a UGM, ordinary graph separation gives conditional independence.
- Maximal cliques determine where undirected factors can live.
- Directed and undirected models are two different languages for local structure in a joint distribution.

## Formal Anchors

These are the clean statements worth being able to write precisely.

### DAG factorization

For a directed acyclic graph,
$$
p(x_1,\dots,x_n)=\prod_{i=1}^n p(x_i\mid pa_i).
$$

This is the defining factorization rule for Bayesian networks.

### Local Markov property for DAGs

In a DAG, each node is conditionally independent of its non-descendants given its parents.

This local property is one starting point for the global d-separation story.

### D-separation

Two variable sets are d-separated by an evidence set if every path between them is blocked according to the chain, fork, and collider rules.

When d-separation holds, the corresponding conditional independence follows in the model.

### UGM factorization

For an undirected graphical model,
$$
p(x)=\frac{1}{Z}\prod_C \psi_C(x_C),
\qquad
Z=\sum_x \prod_C \psi_C(x_C).
$$

The factors are nonnegative potentials, not local conditional distributions.

### Global Markov property for UGMs

If set $C$ separates $A$ from $B$ in the undirected graph, then
$$
X_A \perp X_B \mid X_C.
$$

This is the clean undirected analogue of d-separation.

### Hammersley-Clifford at course level

For positive distributions, the undirected Markov property and factorization over cliques line up.

At exam level, the point is:

- separation statements and clique factorization are two equivalent ways of reading a UGM

## Worked Problems

### Problem 2.1

Suppose the DAG is
$$
X_1 \to X_2,\qquad X_1 \to X_3,\qquad X_2 \to X_4,\qquad X_3 \to X_4.
$$

Write the joint factorization.

### Solution

The parent sets are:

- $pa_1=\emptyset$
- $pa_2=\{X_1\}$
- $pa_3=\{X_1\}$
- $pa_4=\{X_2,X_3\}$

So
$$
p(x_1,x_2,x_3,x_4)=p(x_1)p(x_2\mid x_1)p(x_3\mid x_1)p(x_4\mid x_2,x_3).
$$

### Problem 2.2

For each path pattern, say what conditioning on the middle node does.

1. $X \to Y \to Z$
2. $X \leftarrow Y \to Z$
3. $X \to Y \leftarrow Z$

### Solution

1. In a chain, conditioning on the middle node blocks the path.
2. In a fork, conditioning on the common parent blocks the path.
3. In a collider, conditioning on the middle node opens the path.

This is one of the highest-yield memorization items in the whole representation unit.

### Problem 2.3

Consider
$$
A \to B \to C \leftarrow D.
$$

Are $A$ and $D$ independent with no conditioning? What changes if you condition on $C$?

### Solution

With no conditioning, the only path from $A$ to $D$ is
$$
A - B - C - D.
$$

The node $B$ is an unobserved chain node, so it does not block the path.
The node $C$ is an unobserved collider, so it blocks the path.
Therefore $A$ and $D$ are independent.

If you condition on $C$, the collider opens.
Then the path becomes active, so $A$ and $D$ become dependent given $C$.

### Problem 2.4

Suppose
$$
A \to B,\qquad C \to B,\qquad B \to D,\qquad E \to D.
$$

What is the Markov blanket of $B$?

### Solution

The Markov blanket of a node in a DAG consists of:

- its parents
- its children
- its children's other parents

So for $B$, the blanket is:

- parents: $A, C$
- child: $D$
- child's other parent: $E$

Hence the Markov blanket is
$$
\{A,C,D,E\}.
$$

### Problem 2.5

Why is there a partition function in a UGM but not in a DAG factorization?

### Solution

In a DAG, each local factor is a conditional probability table and is already normalized over the child variable.

In a UGM, the potentials are only nonnegative scores.
Their product is generally not normalized, so the partition function is needed to make the total mass equal to `1`.

### Problem 2.6

Suppose the undirected graph is a chain
$$
X_1 - X_2 - X_3.
$$

What are the maximal cliques, and what conditional independence does the graph imply?

### Solution

The maximal cliques are:

- $\{X_1,X_2\}$
- $\{X_2,X_3\}$

So a valid factorization is
$$
p(x_1,x_2,x_3)=\frac{1}{Z}\phi_{12}(x_1,x_2)\phi_{23}(x_2,x_3).
$$

The graph also implies
$$
X_1 \perp X_3 \mid X_2
$$
because $X_2$ separates $X_1$ from $X_3$.

### Problem 2.7

Why is it wrong to say "directed models are just graphs with arrows, and undirected models are just graphs without arrows"?

### Solution

Because the real difference is in the probability semantics.

Directed models use locally normalized conditional distributions and require acyclicity.
Undirected models use unnormalized compatibility functions and one global partition function.

So the distinction is not cosmetic.
It changes sampling, normalization, and how conditional independence is read from the graph.
