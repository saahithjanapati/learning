# 3. Exact Inference and Belief Propagation

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#3.0 What Inference Is Trying To Do]]
- [[#3.1 The Brute-Force Baseline]]
- [[#3.2 Variable Elimination, Slowly]]
- [[#3.3 A Worked Variable-Elimination Example]]
- [[#3.4 Why Elimination Order Matters So Much]]
- [[#3.5 Treewidth and Junction-Tree Intuition]]
- [[#3.6 Factor Graphs as a Common Language]]
- [[#3.7 Belief Propagation Before the Formulas]]
- [[#3.8 Sum-Product BP, Slowly]]
- [[#3.9 Why BP Is Exact on Trees]]
- [[#3.10 Max-Product, MAP, and HMMs]]
- [[#3.11 What Changes on Loopy Graphs]]
- [[#3.12 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

Section 2 taught you how to write down a large distribution compactly.
This section asks the next unavoidable question:

once the model is written down, how do you actually get answers out of it?

Those answers might be:

- the probability of one variable
- the conditional distribution of a hidden variable given evidence
- the most likely assignment
- the partition function

In other words, the graph gave you a compact representation.
Now you want useful computations.

The bad news is that the naive way to do this is usually exponential.

The good news is that graphical structure sometimes lets you replace a huge global computation with many small local computations.

That is the conceptual point of this entire section.

There are three versions of the same core idea:

- **variable elimination**: exact inference as clever reordering of sums and products
- **treewidth**: a measure of how big the intermediate computations become
- **belief propagation**: exact inference on trees written as local message passing

If you keep that one-sentence summary in mind, the formulas will stop feeling random.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 5`
- `Lecture 6/7`

This is one of the most important sections in the course, and also one of the easiest to read too quickly.

Do not read it as:

"here are some formulas for messages."

Read it in this order:

1. what question is inference trying to answer?
2. what would brute force do?
3. how does variable elimination reuse work?
4. why does elimination order matter?
5. why are trees special?
6. how does BP package subtree computations as messages?

If those six things are clear, the technical details sit on top of a solid foundation.

## 3.0 What Inference Is Trying To Do

Suppose someone gives you a graphical model.
What kinds of questions might you ask?

### Marginal questions

What is the distribution of one variable or a small subset of variables?

Examples:
$$
p(x_i), \qquad p(x_i,x_j).
$$

### Conditional questions

Given evidence, what is the posterior over something hidden?

Examples:
$$
p(x_i \mid x_E), \qquad p(z \mid x).
$$

### MAP questions

What is the highest-probability assignment?

Examples:
$$
\hat x = \arg\max_x p(x),
$$
or more generally a MAP assignment for part of the variables.

### Partition-function questions

For an undirected model,
$$
Z=\sum_x \prod_C \psi_C(x_C).
$$

That is not a probability query about one node.
It is the global normalization constant itself.

So "inference" is a broad word.
It means computing useful probabilistic quantities from the model.

### One important perspective

Representation and inference are different problems.

It is possible to have:

- a compact model representation
- but a very hard inference problem

This is why the course spends so much time on algorithms after introducing the graph structure.

## 3.1 The Brute-Force Baseline

Before learning the clever methods, it helps to know what the dumb method would do.

Suppose you want a marginal:
$$
p(x_i)=\sum_{x_{-i}} p(x_i,x_{-i}).
$$

In words:

- keep the variable you care about
- sum over every other variable

That is perfectly correct.
It is also usually computationally terrible.

If there are many variables, the number of global assignments is exponential.

The same problem appears for other tasks:

- partition function: sum over all assignments
- posterior normalization: sum over all hidden assignments
- MAP: search over all assignments

So the real question is not "what is the mathematically correct formula?"
The real question is:

`can the factorized structure of the model help us avoid touching the full joint all at once?`

That is what exact inference algorithms try to exploit.

### Complexity intuition

The lectures emphasize that exact inference is hard in general.

Roughly:

- marginal and partition-function style problems are counting-like and typically #P-hard
- MAP is optimization-like and typically NP-hard

So you should not expect one magic trick that makes all graphs easy.
Instead, the course identifies special structures, especially tree-like ones, where exact inference is tractable.

## 3.2 Variable Elimination, Slowly

Variable elimination, or VE, is the first exact inference method to really understand.

The main idea is simple:

instead of expanding the whole joint and then summing over all unwanted variables at the very end, eliminate variables one at a time and reuse the intermediate results.

### The local elimination step

Suppose you want to eliminate variable $X_j$.

You do this:

1. collect every factor that contains $X_j$
2. multiply those factors together
3. sum out $X_j$
4. replace the old collection by the new smaller factor

That new factor is a summary of everything the eliminated variable was doing.

### Why this helps

Because most factors only involve a few variables.
So you can often do small local sums early, rather than dragging the eliminated variable through the entire computation.

### The mental model

Think of elimination as "compressing away" one variable while preserving its effect on the variables that remain.

The output of eliminating $X_j$ is not a number in general.
It is usually a new factor on the variables that were coupled to $X_j$.

That is a very important point.

### Tiny algebra picture

Suppose part of your expression is
$$
f(x_1,x_2)g(x_2,x_3).
$$

If you eliminate $x_2$, you form
$$
h(x_1,x_3)=\sum_{x_2} f(x_1,x_2)g(x_2,x_3).
$$

Now the two old factors are replaced by one new factor over the remaining neighbors.

That is VE in one line.

### Query rule

If you are computing a marginal over some query variable, do **not** eliminate that query variable early.
Eliminate the variables you do not care about, keep the query variables until the end, then normalize if needed.

## 3.3 A Worked Variable-Elimination Example

Take a simple chain:
$$
X_1 - X_2 - X_3 - X_4
$$
with factorization
$$
p(x_1,x_2,x_3,x_4)\propto \phi_{12}(x_1,x_2)\phi_{23}(x_2,x_3)\phi_{34}(x_3,x_4).
$$

Suppose we want the partition function
$$
Z=\sum_{x_1,x_2,x_3,x_4}\phi_{12}(x_1,x_2)\phi_{23}(x_2,x_3)\phi_{34}(x_3,x_4).
$$

### Eliminate $x_4$ first

Only one factor contains $x_4$, namely $\phi_{34}(x_3,x_4)$.
So form
$$
m_4(x_3)=\sum_{x_4}\phi_{34}(x_3,x_4).
$$

Now the expression becomes
$$
Z=\sum_{x_1,x_2,x_3}\phi_{12}(x_1,x_2)\phi_{23}(x_2,x_3)m_4(x_3).
$$

### Eliminate $x_3$

Now the factors involving $x_3$ are $\phi_{23}(x_2,x_3)$ and $m_4(x_3)$.
So form
$$
m_3(x_2)=\sum_{x_3}\phi_{23}(x_2,x_3)m_4(x_3).
$$

Now
$$
Z=\sum_{x_1,x_2}\phi_{12}(x_1,x_2)m_3(x_2).
$$

### Eliminate $x_2$

Form
$$
m_2(x_1)=\sum_{x_2}\phi_{12}(x_1,x_2)m_3(x_2).
$$

Then
$$
Z=\sum_{x_1}m_2(x_1).
$$

### Eliminate $x_1$

Now you just sum the last one-variable factor:
$$
Z=\sum_{x_1}m_2(x_1).
$$

That is the same exact value as brute force, but it never builds the whole joint table.

That small chain example already shows the pattern:
each elimination produces a reusable summary factor instead of forcing you to expand the whole joint.

## 3.4 Why Elimination Order Matters So Much

VE is always exact.
What changes with elimination order is the size of the intermediate factors.

This is the core runtime story of exact inference.

### The key rule

When you eliminate a variable, all of its remaining neighbors become coupled in the new factor.

That is the one sentence to remember.

Suppose $X_j$ is connected to three current neighbors:
$$
X_a,\; X_b,\; X_c.
$$

After eliminating $X_j$, you generally create a new factor over
$$
(X_a,X_b,X_c).
$$

So if a variable has many neighbors at elimination time, the new factor can be large.

### Why order changes everything

One elimination order may keep these intermediate factors small.
Another may create a giant factor very early.

The graph has not changed as a probability model.
The exact answer has not changed.
But the computation has become much more or much less expensive.

### The star-graph lesson

Imagine a star graph with one central node and many leaves.

- eliminate leaves first: factors stay small
- eliminate the center first: all leaves get tied together into one huge factor

So the wrong order can create a combinatorial blow-up that was not visually obvious from the original graph.

### Visual: Elimination Order Creates or Avoids Large Factors

This picture is useful because it makes the runtime mechanism visible:
eliminating a node creates a new factor on its surviving neighbors, and that can either stay harmless or explode into a large clique.

![[local-assets/openai-images/20260422-155826-a-clean-notebook-style-educational-diagram-for-a-probabilist.png]]

## 3.5 Treewidth and Junction-Tree Intuition

Treewidth is the structural summary of the elimination-order story.

At the level you need for this course, the operational definition is:

`treewidth = the smallest possible value of (largest induced clique size minus 1) over all elimination orders`

That sounds abstract, so unpack it slowly.

### What is an induced clique here?

During elimination, you may create new edges between current neighbors of the eliminated node.
Those newly connected neighbors form a clique in the induced graph.

So treewidth is measuring:

how bad does the biggest forced cluster get, even if you choose the best possible elimination order?

### Why the minus 1?

Because graph theorists define treewidth that way.
If the biggest induced clique has size `k+1`, the treewidth is `k`.

### Examples worth remembering

- a tree has treewidth `1`
- a clique on `N` nodes has treewidth `N-1`
- an `N x N` grid has treewidth on the order of `N`

These examples tell you why trees are special:
their worst forced cluster stays tiny.

### Why treewidth matters computationally

If each variable has `c` states and you create a factor over `k` variables, the table size is on the order of
$$
c^k.
$$

So exact inference is exponential in the width of the largest intermediate factor.

That is why people say exact inference is exponential in treewidth.

### Junction-tree intuition

The junction-tree algorithm takes a hard graph and turns it into a tree of clusters, often called bags.

The basic idea is:

- cluster variables into overlapping groups
- connect those groups in a tree structure
- run tree-style message passing on the cluster tree

This does not magically remove the hard part.
The hard part is now hidden in the size of the clusters.

So the junction-tree view is really the same story again:

exact inference becomes manageable when the graph can be organized into small tree-like pieces.

### Visual: Treewidth, Induced Cliques, and Bag Structure

This helps because treewidth is not just a number to memorize.
It is describing the size of the worst local cluster forced by elimination, and junction-tree bags are the cluster version of that same phenomenon.

![[local-assets/openai-images/bp-treewidth-junction-tree.png]]

## 3.6 Factor Graphs as a Common Language

Belief propagation is easiest to write on a **factor graph**.

A factor graph is a bipartite graph with two kinds of nodes:

- variable nodes
- factor nodes

If
$$
g(x_1,\dots,x_n)=\prod_{\alpha=1}^m \psi_\alpha(S_\alpha),
$$
then the factor graph contains:

- one variable node for each variable
- one factor node for each factor $\psi_\alpha$
- an edge from factor $\alpha$ to variable $i$ if $x_i$ appears in that factor

### Why this representation is helpful

Because both major model families can be translated into it.

For a DAG:

- each local conditional table becomes a factor

For a UGM:

- each clique potential becomes a factor

So factor graphs give one common language for message passing.

### Visual: From a Factorized Formula to a Factor Graph

This is helpful because many students understand the formula and the graph separately, but not the mapping between them.
The picture makes the "one factor node per local term" construction concrete.

![[local-assets/openai-images/bp-factor-graph-construction.png]]

## 3.7 Belief Propagation Before the Formulas

Before you look at BP equations, get the intuition.

Suppose the factor graph is a tree.
Pick an edge and cut it.

What happens?

The graph splits into two disconnected pieces.

That means the effect of the left side on the right side can be summarized compactly.
It does not need to send the entire internal state of the left subtree.
It only needs to send a function of the boundary variable.

That function is a **message**.

### What a message means in plain English

A message says:

"Here is everything my side of the tree wants to tell you about the value of this boundary variable."

That is all.

So BP is not magic.
It is dynamic programming on a tree.

Each subtree computes a local summary and passes it upward or outward.

### Why a two-pass schedule appears

If you root the tree somewhere, then:

- one pass collects information from leaves toward the root
- another pass sends combined information back out from the root to the leaves

That is why BP often gets taught as an upward pass and a downward pass.

### Visual: Upward and Downward Passes on a Tree Factor Graph

The equations are much easier to remember once you can see that each message needs all the incoming information from the other directions first.

![[local-assets/openai-images/20260422-155945-a-clean-notebook-style-educational-diagram-for-a-probabilist.png]]

## 3.8 Sum-Product BP, Slowly

Now write the formulas, but keep the intuition attached.

On an acyclic factor graph, **sum-product BP** computes exact marginals.

### Variable-to-factor message

$$
\mu_{i\to \alpha}(x_i)=\prod_{\alpha' \in \mathcal{N}(i)\setminus \alpha}\mu_{\alpha'\to i}(x_i)
$$

Read this in words:

the message from a variable node to a factor node is the product of all incoming messages from the variable's other neighboring factors.

Why product?

Because those incoming messages are independent subtree contributions on a tree, so they combine multiplicatively.

Why exclude $\alpha$?

Because a node does not send back along an edge the message it just received from that same edge.

### Factor-to-variable message

$$
\mu_{\alpha\to i}(x_i)
=
\sum_{\mathbf{x}_\alpha:\mathbf{x}_\alpha[i]=x_i}
\psi_\alpha(\mathbf{x}_\alpha)
\prod_{j\in \mathcal{N}(\alpha)\setminus i}\mu_{j\to \alpha}(\mathbf{x}_\alpha[j])
$$

Read this slowly:

- fix a value for the destination variable $x_i$
- look at the factor $\psi_\alpha$
- multiply by all incoming messages from the factor's other variables
- sum over the variables inside the factor that are not the destination variable

So a factor node takes local compatibility information and combines it with the beliefs coming from the neighboring subtrees.

### Variable belief

After messages are available, the belief at a variable node is
$$
b_i(x_i)=\prod_{\alpha\in \mathcal{N}(i)}\mu_{\alpha\to i}(x_i).
$$

Then you normalize.

That gives the exact marginal on a tree.

### Factor belief

Similarly,
$$
b_\alpha(\mathbf{x}_\alpha)
=
\psi_\alpha(\mathbf{x}_\alpha)
\prod_{i\in \mathcal{N}(\alpha)}\mu_{i\to \alpha}(\mathbf{x}_\alpha[i]).
$$

After normalization, this gives the exact marginal over the variables inside the factor.

### What students often miss

The formulas are not arbitrary.
Each one is just:

- combine incoming summaries from the neighboring subtrees
- eliminate local internal variables if necessary
- pass along the boundary summary

That is the same VE idea, but packaged as messages.

## 3.9 Why BP Is Exact on Trees

This is the main theorem-level idea in the section.

Belief propagation is exact on trees because cutting an edge separates the graph into two genuinely independent subproblems once the boundary variable is fixed.

That is the whole proof idea.

### Dynamic-programming interpretation

Each message is an exact summary of one subtree.

So when messages meet at a node, you really are combining exact summaries of disjoint pieces of the graph.

Nothing is being approximated.
Nothing is being guessed.

That is why tree BP is exact.

### Another way to say the same thing

Variable elimination on a tree can be organized so that the intermediate computations are exactly these messages.

So BP and VE are not unrelated algorithms.
On trees, they are two views of the same underlying reuse pattern.

### Visual: Tree BP Versus Loopy BP

This picture is valuable because it makes the exactness argument visual:
on a tree, cutting an edge really separates the graph into two subproblems; on a loopy graph, that clean decomposition breaks.

![[local-assets/openai-images/20260422-155945-a-clean-notebook-style-educational-comparison-diagram-for-a.png]]

## 3.10 Max-Product, MAP, and HMMs

Sometimes you do not want marginals.
You want the highest-scoring assignment.

Then the main change is:

replace summation by maximization.

### Max-product update

$$
\mu_{\alpha\to i}(x_i)
=
\max_{\mathbf{x}_\alpha:\mathbf{x}_\alpha[i]=x_i}
\psi_\alpha(\mathbf{x}_\alpha)
\prod_{j\in \mathcal{N}(\alpha)\setminus i}\mu_{j\to \alpha}(\mathbf{x}_\alpha[j])
$$

This computes **max-marginals** rather than ordinary marginals.

In words, it asks:

"what is the best possible global score consistent with this variable taking value $x_i$?"

### Sum-product versus max-product

These two algorithms answer different questions.

Sum-product:

- adds over all possibilities
- gives marginals or posterior probabilities

Max-product:

- keeps only the best possibility
- gives MAP-style information

Do not blur those together.

### HMM connection

The course emphasizes Hidden Markov Models because they are a clean special case.

For an HMM:

- sum-product BP becomes the **forward-backward** algorithm
- max-product BP becomes the **Viterbi** algorithm

That is a beautiful unification result:
the famous HMM algorithms are not separate magic tricks.
They are special cases of general message passing on a chain.

### Visual: Forward-Backward Versus Viterbi on an HMM

This picture helps because students often mix up "posterior at each time step" with "best single global path."
Forward-backward does the first; Viterbi does the second.

![[local-assets/openai-images/bp-hmm-forward-backward-viterbi.png]]

## 3.11 What Changes on Loopy Graphs

You can still run the same message updates on a graph with cycles.
This is called **loopy BP**.

But now the clean theorem disappears.

### What is still true

- the updates can still be written down
- the method can still work well in practice
- if it converges, it can provide useful approximations

### What is no longer guaranteed

- convergence is not guaranteed
- exactness is not guaranteed

So the exam-level summary is:

`on trees, BP is exact; on loopy graphs, BP is generally approximate`

### Why loops cause trouble

Because information can circulate and get reused in a way that is no longer equivalent to combining independent subtree summaries.

That is the structural reason.
It is not just "the formulas changed."
The graph no longer has the separation property the formulas relied on.

### Practical note

Later in the course, loopy BP connects to variational ideas such as Bethe free energy.
So even though loopy BP loses exactness, it is still conceptually important.

## 3.12 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to explain the following in plain English:

- Inference means computing useful quantities like marginals, posteriors, MAP assignments, and partition functions from the model.
- Brute-force inference is usually exponential because it sums or searches over all assignments.
- Variable elimination removes one variable at a time by multiplying the factors that contain it and summing it out.
- Eliminating a variable creates a new factor on that variable's remaining neighbors.
- Elimination order affects runtime because it changes the size of the intermediate factors.
- Treewidth measures how large those forced clusters become under the best possible elimination order.
- A factor graph is a bipartite graph with variable nodes and factor nodes.
- Belief propagation on a tree is dynamic programming with local messages.
- A variable-to-factor message is the product of incoming messages from the other neighboring factors.
- A factor-to-variable message combines the local factor with incoming messages from the other neighboring variables and sums out the internal variables.
- BP is exact on trees because each message is an exact summary of a subtree.
- Max-product replaces sums by maxes and is used for MAP-style inference.
- Forward-backward is sum-product on an HMM, and Viterbi is max-product on an HMM.
- On loopy graphs, BP can still be run, but it is approximate in general.

## Formal Anchors

These are the clean formal statements you should be able to recognize and explain.

### Exact marginalization

For a query variable $X_i$,
$$
p(x_i)=\sum_{x_{-i}} p(x_i,x_{-i}).
$$

This is the brute-force baseline that exact inference algorithms are trying to reorganize more efficiently.

### Variable elimination step

If factors involving $X_j$ are
$$
f_1(X_j,S_1),\dots,f_m(X_j,S_m),
$$
then eliminating $X_j$ forms
$$
g(S)=\sum_{x_j}\prod_{\ell=1}^m f_\ell(x_j,S_\ell),
$$
where $S$ is the union of the remaining variables in those factors.

That is the exact local algebraic move behind VE.

### Treewidth

Operationally, treewidth is:

- the minimum, over elimination orders, of
- largest induced clique size minus `1`

Exact inference complexity is exponential in this width.

### Sum-product BP updates

On a tree factor graph, the messages are
$$
\mu_{i\to \alpha}(x_i)=\prod_{\alpha' \in \mathcal{N}(i)\setminus \alpha}\mu_{\alpha'\to i}(x_i)
$$
and
$$
\mu_{\alpha\to i}(x_i)
=
\sum_{\mathbf{x}_\alpha:\mathbf{x}_\alpha[i]=x_i}
\psi_\alpha(\mathbf{x}_\alpha)
\prod_{j\in \mathcal{N}(\alpha)\setminus i}\mu_{j\to \alpha}(\mathbf{x}_\alpha[j]).
$$

The resulting beliefs are exact marginals on an acyclic factor graph.

### Max-product BP

Replacing summation by maximization gives max-product message passing, which computes max-marginal information and supports MAP recovery on trees.

### Tree versus loopy graphs

On trees, BP is exact.
On loopy graphs, the same updates can still be run but generally become approximate.

## Worked Problems

### Problem 3.1

Suppose
$$
p(x_1,x_2,x_3)=p(x_1)p(x_2\mid x_1)p(x_3\mid x_2).
$$

Write $p(x_3)$ in variable-elimination form by eliminating $x_1$ first.

### Solution

Start from
$$
p(x_3)=\sum_{x_1,x_2} p(x_1)p(x_2\mid x_1)p(x_3\mid x_2).
$$

Eliminate $x_1$ first:
$$
m(x_2)=\sum_{x_1} p(x_1)p(x_2\mid x_1).
$$

Then eliminate $x_2$:
$$
p(x_3)=\sum_{x_2} m(x_2)p(x_3\mid x_2).
$$

### Problem 3.2

Why can two elimination orders give the same exact answer but very different runtime?

### Solution

Because the elimination order determines which intermediate factors are created.
One order may only create small factors, while another may create a large induced clique and therefore a large factor table.
Correctness is unchanged, but computational cost is not.

### Problem 3.3

Why does the variable-to-factor message
$$
\mu_{i\to \alpha}(x_i)
=
\prod_{\alpha' \in \mathcal{N}(i)\setminus \alpha}\mu_{\alpha'\to i}(x_i)
$$
exclude the recipient factor $\alpha$?

### Solution

Because the message is supposed to summarize information coming from the rest of the graph, not echo information back along the same edge.
If $\alpha$ were included, information from that edge would be double-counted.

### Problem 3.4

Why is BP exact on trees but not automatically exact on loopy graphs?

### Solution

On a tree, cutting an edge separates the graph into two independent subproblems once the boundary variable is fixed.
So each message is an exact subtree summary.

On a loopy graph, that clean decomposition fails.
Messages can recirculate information around cycles, so the updates are no longer exact dynamic programming in general.

### Problem 3.5

A student says, "If I run forward-backward and then choose the most likely hidden state at each time step, I get the Viterbi path."
Why is that wrong in general?

### Solution

Forward-backward computes nodewise posterior marginals.
Viterbi computes the single best joint hidden-state sequence.

The sequence formed by picking each time step's most likely marginal state need not be the highest-probability joint path and can even be globally inconsistent with the best transition structure.

### Problem 3.6

What does treewidth measure operationally, and why does it matter for exact inference?

### Solution

Treewidth measures how large the worst induced clique must become under the best elimination order.

It matters because factor size grows exponentially in the number of variables in the factor, so exact inference cost is exponential in that width.
