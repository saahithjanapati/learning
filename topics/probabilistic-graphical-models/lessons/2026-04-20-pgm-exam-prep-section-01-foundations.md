# 1. Foundations and Why Graphical Models Exist

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#1.0 Start With the Plain-Old Probability Problem]]
- [[#1.1 Why the Full Joint Blows Up]]
- [[#1.2 What a Graphical Model Actually Is]]
- [[#1.3 Four Objects Beginners Often Confuse]]
- [[#1.4 The Three Core Jobs of the Course]]
- [[#1.5 Directed and Undirected Models: First Preview]]
- [[#1.6 Why Compact Representation Does Not Automatically Give Easy Inference]]
- [[#1.7 Vocabulary You Should Actually Know]]
- [[#1.8 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is trying to answer the most basic question in the whole course:

why do we need graphical models in the first place?

The answer is not “because graphs are cool.”
The answer is:

- we want to describe a probability distribution over many variables
- the full distribution is usually too big to write down naively
- so we need structure

The graph is a way of showing that structure.

If you get lost later in the course, this is the sentence to come back to:

`a graphical model is a structured way to describe a large joint probability distribution`

Everything else in the course grows out of that sentence.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 1`

This is the floor of the entire class.

If terminology feels foreign, slow down here.
You do not need to be fast.
You need to be clear.

The goal of this section is that, by the end, you can explain in plain English:

- what a joint distribution is
- why large joint distributions are hard
- what the graph is doing
- why representation and computation are different problems

## 1.0 Start With the Plain-Old Probability Problem

Forget graphs for one minute.
Start with ordinary probability.

Suppose you have several random variables:
$$
X_1, X_2, \dots, X_d.
$$

Maybe they mean:

- whether it is raining
- whether traffic is bad
- whether you are late
- whether your professor is annoyed

Or maybe they mean pixels, words, genes, medical symptoms, or hidden latent states.

No matter what the variables mean, the mathematically complete object is the **joint distribution**
$$
p(x_1, x_2, \dots, x_d).
$$

That joint distribution tells you everything:

- the probability of every full assignment
- every marginal
- every conditional
- every correlation pattern

So the real object in the course is not “the graph.”
The real object is the probability distribution.

The graph is a tool that helps us describe and reason about that distribution.

## 1.1 Why the Full Joint Blows Up

Now the problem.

Suppose every variable has `c` possible values.
Then the full joint table has
$$
c^d
$$
entries.

That number grows exponentially in the number of variables.

If `c = 2`, then with:

- `10` variables you have `2^{10} = 1024` entries
- `20` variables you have `2^{20}` entries, already over a million
- `100` variables you have `2^{100}`, which is absurdly large

So even though the idea of a joint distribution is simple, writing it down naively becomes impossible very quickly.

This is the first motivation for graphical models:

we need a way to describe a huge distribution using much less information.

### Slow intuition

Imagine someone says:

“Here is the exact probability of every possible configuration of 200 binary variables.”

That is not a realistic data structure.
You would never want to store or learn that object directly.

So the real question becomes:

what assumptions let us compress the joint?

That is where graphs enter.

## 1.2 What a Graphical Model Actually Is

A graphical model is a way of saying:

`the full joint is complicated, but not every variable interacts directly with every other variable`

The graph shows which local interactions or local conditional relationships matter.

Then those local relationships give a **factorized formula** for the joint.

So a graphical model is not “just a graph.”
It is:

- a set of variables
- a graph over those variables
- a factorization rule implied by the graph
- numerical parameters inside the local factors or local conditionals

The graph is useful because it makes two kinds of structure visible:

### 1. Statistical structure

Which variables are directly related?
Which independences are being asserted?

### 2. Computational structure

Can we sample efficiently?
Can we compute marginals efficiently?
Can we exploit locality in learning or inference?

That second point is easy to miss.
Graphs are not just about pretty pictures of dependence.
They are also computational devices.

## 1.3 Four Objects Beginners Often Confuse

There are four different things here, and keeping them separate will save you a lot of confusion later.

### 1. The variables

These are the random quantities:
`X_1, ..., X_d`.

### 2. The graph

This is the structural picture saying who is connected to whom.

### 3. The factorized probability formula

This is the actual math implied by the graph, for example:
$$
p(x)=\prod_i p(x_i \mid pa_i)
$$
or
$$
p(x)=\frac{1}{Z}\prod_C \psi_C(x_C).
$$

### 4. The numerical parameters

These are the numbers inside the local conditionals or potentials.

If you mix these up, later sections become much harder than they need to be.

For example:

- the graph is not the same as the parameters
- the graph is not itself a probability distribution
- the factorization is not identical to the raw graph drawing

The graph tells you what kind of factorization is allowed.
The parameters fill in the actual numbers.

## 1.4 The Three Core Jobs of the Course

Almost the whole course can be organized into three jobs.

### Job 1: Representation

How do we write the distribution compactly?

This is where directed and undirected graphical models enter.

### Job 2: Inference

Once the model is written down, how do we answer useful questions?

Examples:

- what is the marginal probability of this variable?
- what is the most likely hidden configuration?
- what is the partition function?

### Job 3: Learning

How do we estimate the parameters of the model from data?

This later leads to:

- MLE
- EM
- variational inference
- score matching
- GANs
- diffusion

So when a later section feels abstract, try to ask:

`is this section mainly about representation, inference, or learning?`

That usually clarifies what role the math is playing.

## 1.5 Directed and Undirected Models: First Preview

There are two main families in the course.

### Directed graphical models

These are DAGs.
They say the joint can be written as
$$
p(x)=\prod_i p(x_i \mid pa_i).
$$

Intuition:

- each node is generated from its parents
- local pieces are conditional probabilities
- the model has a natural generative story

### Undirected graphical models

These say the joint can be written as
$$
p(x)=\frac{1}{Z}\prod_C \psi_C(x_C).
$$

Intuition:

- local pieces are compatibility scores, not conditional probabilities
- the graph is symmetric rather than causal-looking
- one global normalizing constant `Z` is needed

You do **not** need to master the distinction in this section.
You only need the preview:

- directed = locally normalized conditional pieces
- undirected = globally normalized compatibility pieces

## 1.6 Why Compact Representation Does Not Automatically Give Easy Inference

This is one of the most important warnings in the whole class.

You might think:

“Great, the graph gave me a compact representation, so now all the computations should also be easy.”

Unfortunately, no.

A model can be:

- easy to write down
- compact to store
- still hard to do inference in

That is why the course does not stop after representation.
It goes on to:

- variable elimination
- treewidth
- belief propagation
- MCMC
- variational inference

In other words:

representation and computation are related, but they are not the same problem.

This is why the class keeps asking not only:

- “what does the graph mean?”

but also:

- “what does the graph let us compute efficiently?”

## 1.7 Vocabulary You Should Actually Know

Here is the beginner vocabulary list worth slowing down for.

### Random variable

A quantity whose value is uncertain.

### Joint distribution

The probability distribution over **all** variables at once.

### Marginal

The distribution of a smaller subset of variables after summing/integrating out the rest.

### Conditional distribution

A distribution after you treat some variables as known.

### Factorization

A way of writing one big probability object as a product of smaller local pieces.

### Conditional independence

A statement that once certain variables are known, some others no longer provide extra information.

### Latent variable

A hidden variable that is part of the model but not directly observed in the data.

### Inference

Computing useful probabilistic quantities from the model.

### Learning

Estimating the model parameters from data.

If these words feel natural, the later sections become much easier to read.

## 1.8 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say something like this:

> A graphical model is a structured way to represent a big joint distribution.
> We need that because the full joint table grows exponentially with the number of variables.
> The graph tells us what local relationships we assume, and that gives a factorized formula for the joint.
> But writing the model compactly does not mean inference is automatically easy, which is why the rest of the course studies inference and approximation methods.

If you can say that in your own words, this section has done its job.

## Formal Anchors

This section is mostly conceptual, but there are still a few formal facts worth being able to state cleanly.

### Chain rule of probability

Any joint distribution can be written as
$$
p(x_1,\dots,x_d)=p(x_d\mid x_{1:d-1})\cdots p(x_2\mid x_1)p(x_1).
$$

Graphical models do not invent factorization from nothing.
They impose structured **restrictions** on very general factorizations like the chain rule.

### Exponential size of a full discrete joint

If each variable has `c` states and there are `d` variables, then the full joint table has
$$
c^d
$$
entries.

That is the basic complexity reason graphical models exist.

### Representation versus inference

These are logically different statements:

- "the model can be written compactly"
- "the model can be queried efficiently"

A graph may give a small factorized description while exact inference is still computationally hard.

### Directed versus undirected preview

At the highest level, the two main model families later in the course are:
$$
p(x)=\prod_i p(x_i\mid pa_i)
\qquad\text{and}\qquad
p(x)=\frac{1}{Z}\prod_C \psi_C(x_C).
$$

The first uses locally normalized conditionals.
The second uses unnormalized local scores plus one global normalizer.

## Worked Problems

### Problem 1.1

You have `12` binary random variables.
How many entries are in the full joint table?
Why is that already a warning sign for naive modeling?

### Solution

For `12` binary variables, the table has
$$
2^{12}=4096
$$
entries.

That is not yet astronomically large, but the key issue is the exponential pattern.
Adding only a few more variables multiplies the storage cost dramatically, so naive full-joint modeling does not scale.

### Problem 1.2

A student says, "The graph itself is the probability distribution."
What is wrong with that statement?

### Solution

The graph is only a structural object.
It does not by itself assign probabilities to outcomes.
To get a probability model, you also need:

- variables
- a factorization rule associated with the graph
- numerical parameters inside the factors or conditionals

So the graph constrains the form of the distribution, but it is not the distribution by itself.

### Problem 1.3

What is the difference between a marginal distribution and a conditional distribution?

### Solution

A marginal distribution is obtained by summing or integrating out variables you are not focusing on.

A conditional distribution is obtained by treating some variables as observed and renormalizing the remaining probabilities accordingly.

So:

- marginal = remove variables
- conditional = fix variables

### Problem 1.4

Why is it a mistake to think "compact representation implies easy inference"?

### Solution

Because compactness only tells you the model can be written using local pieces.
It does not guarantee that answering questions like marginals, MAP assignments, or partition functions will be easy.

In many graphical models, the representation is compact but inference is still exponential in the worst case.

### Problem 1.5

Classify each task as mainly representation, inference, or learning.

1. Writing a DAG factorization for a disease-symptom model
2. Computing $p(Z\mid X=x)$ in a latent-variable model
3. Estimating model parameters from observed data

### Solution

1. representation
2. inference
3. learning

This distinction is worth keeping clear throughout the course because different algorithms are solving different jobs.
