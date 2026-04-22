# 5. MCMC and Advanced Sampling

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#5.0 What Problem MCMC Is Solving]]
- [[#5.1 What a Markov Chain Is in Plain English]]
- [[#5.2 What a Stationary Distribution Is]]
- [[#5.3 Irreducible and Aperiodic: Why Those Words Keep Showing Up]]
- [[#5.4 Detailed Balance]]
- [[#5.5 Metropolis-Hastings, Slowly]]
- [[#5.6 Gibbs Sampling, Slowly]]
- [[#5.7 Why Mixing Can Be Slow]]
- [[#5.8 MALA and HMC]]
- [[#5.9 Simulated Tempering]]
- [[#5.10 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section is about one central problem:

what do you do when exact inference is too hard, but you still want information about the target distribution?

One answer is:

- do not try to compute the whole distribution exactly
- instead, build a random process whose long-run behavior matches the distribution you want

That random process is a Markov chain.

So the big idea of MCMC is:

`approximate inference by building a random walk that eventually samples from the right target`

That is the sentence to remember.

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 9`
- `Lecture 11`

This section scares people because it introduces a lot of vocabulary quickly:

- stationary distribution
- irreducible
- aperiodic
- detailed balance
- Metropolis-Hastings
- Gibbs
- HMC
- tempering

The trick is not to memorize the vocabulary in a vacuum.
The trick is to keep asking:

`what is the chain trying to do?`

Answer:

it is trying to wander around in such a way that, after long enough, its samples look like draws from the target distribution.

## 5.0 What Problem MCMC Is Solving

Suppose there is some target distribution `pi(x)` you care about.

Maybe:

- it is a posterior distribution
- it is an undirected model with a nasty partition function
- it is some high-dimensional distribution where direct summation is impossible

You would like quantities like:

- expectations
- marginals
- probabilities of events

If you had exact samples from $\pi$, you could estimate many of these by Monte Carlo.

So the real goal becomes:

`how do I get samples whose distribution is pi?`

MCMC answers this by constructing a Markov chain with $\pi$ as its long-run distribution.

## 5.1 What a Markov Chain Is in Plain English

A Markov chain is just a random process that moves from one state to another.

The Markov property means:

the next state depends only on the current state, not on the full past history.

If the chain is currently at state $x$, the transition rule tells you how likely it is to move to each possible next state $y$.

Mathematically, this is written as
$$
P(x,y)=\Pr(X_{t+1}=y \mid X_t=x).
$$

But do not let the notation scare you.
Plain-English version:

- you are at $x$
- you flip some probabilistic coins
- you may move to $y$

That is all a Markov chain is.

## 5.2 What a Stationary Distribution Is

Now the key idea.

A distribution $\pi$ is **stationary** for the chain if:

if the current state is distributed as $\pi$, then after one more transition it is still distributed as $\pi$.

In symbols:
$$
\pi P = \pi.
$$

This is the distribution we want the chain to preserve.

Why is stationarity important?

Because if the chain eventually settles into that distribution, then long-run samples from the chain look like samples from $\pi$.

So the whole game in MCMC is:

- design a chain
- make sure $\pi$ is stationary for it
- hope the chain reaches that stationary behavior in reasonable time

## 5.3 Irreducible and Aperiodic: Why Those Words Keep Showing Up

Just having a stationary distribution is not enough.

You also want the chain to actually reach the right long-run behavior from wherever you start.

Two important properties help guarantee that.

### Irreducible

This means the chain can eventually reach any state from any other state.

Plain English:

the state space is all in one communicating piece.

### Aperiodic

This means the chain is not trapped in a rigid cycle.

Plain English:

the chain is not forced to bounce in a fixed rhythm like
“odd step here, even step there, odd step here, even step there.”

Why these matter:

for finite chains, irreducible + aperiodic usually gives you the good theorem:

- unique stationary distribution
- convergence to that distribution from any starting point

So when exam questions ask about irreducibility and aperiodicity, they are really asking:

`does this chain actually mix to one well-defined long-run target?`

## 5.4 Detailed Balance

Detailed balance is the condition
$$
\pi(x)P(x,y)=\pi(y)P(y,x).
$$

At first this looks abstract.

Here is the plain-English version:

under distribution $\pi$, the probability flow from $x$ to $y$ is exactly matched by the probability flow from $y$ to $x$.

Why do we care?

Because detailed balance is an easy way to prove stationarity.

It is **sufficient** for stationarity.

Important warning:

it is not **necessary**.

This matters because some chains, such as systematic-scan Gibbs, can still preserve the target distribution without being reversible.

So the safe mental summary is:

- detailed balance is a very useful proof tool
- but not every valid MCMC chain has to satisfy it

## 5.5 Metropolis-Hastings, Slowly

Metropolis-Hastings is one of the main general-purpose MCMC constructions.

Here is the idea in words.

### Step 1: propose a move

If you are currently at state $x$, propose a new state $y$ using some easier proposal rule $q(x,y)$.

### Step 2: maybe accept it

Do not accept every proposal blindly.
Instead accept with probability
$$
\alpha(x,y)
=
\min\left(1,\frac{\pi(y)q(y,x)}{\pi(x)q(x,y)}\right).
$$

### Step 3: if rejected, stay put

That “stay put” part is important.

### Why this works

The acceptance ratio corrects for the fact that the proposal rule may not itself preserve the target.

So MH is:

- propose using something convenient
- correct using accept/reject

This is one reason MH is so flexible.

### Why undirected models like MH

In many undirected models, the normalized target is
$$
\pi(x)=\frac{1}{Z}\tilde{\pi}(x),
$$
but `Z` is hard to compute.

The good news is that in the acceptance ratio, `Z` cancels.

So you only need the target up to proportionality.

That is a huge practical advantage.

### Independent sampler special case

If the proposal does not depend on the current state, so
$$
q(x,y)=r(y),
$$
then MH becomes
$$
\alpha(x,y)
=
\min\left(1,\frac{\pi(y)r(x)}{\pi(x)r(y)}\right).
$$

This is algebraically simple, but can mix very badly in high dimension if the proposal distribution is a poor match for the target.

## 5.6 Gibbs Sampling, Slowly

Gibbs sampling is much simpler to describe.

Suppose the full state is
$$
x=(x_1,\dots,x_d).
$$

Instead of proposing a whole new state, Gibbs updates one coordinate at a time.

For coordinate `i`, sample
$$
x_i' \sim \pi(x_i \mid x_{-i}).
$$

Read that in words:

- hold the other coordinates fixed
- resample one coordinate from its exact conditional

That is all.

### Why Gibbs is special

If you can sample from the conditional exactly, then you do not need an accept/reject correction.

So Gibbs feels cleaner than generic MH.

### Random-scan versus systematic-scan

There are two common styles:

- pick a random coordinate each step
- cycle through coordinates in a fixed order

The fixed-order version can still preserve the right target, but it may not be reversible.
That distinction showed up in the course assessment material.

## 5.7 Why Mixing Can Be Slow

Even if a chain has the right stationary distribution, it may take a long time to get there.

That is the mixing problem.

Two common reasons for slow mixing are:

### 1. Multimodality

If the target has several separated high-probability regions, a local chain may have trouble moving from one mode to another.

### 2. High dimension

In high dimension, a naive proposal may usually land in unrealistic places.

One of the midterm ideas was this:

- the target may concentrate on one kind of “typical” state
- the proposal may concentrate on a very different kind of “typical” state

Then the chain keeps proposing the wrong sort of move.

So when explaining slow mixing, do not just say “curse of dimensionality.”
Say what is mismatched:

- which states are typical under the target?
- which states are typical under the proposal?
- why does that make useful proposals rare?

## 5.8 MALA and HMC

The course then introduces smarter proposals.

### MALA

MALA uses gradient information.

Instead of wandering randomly with no guidance, it proposes moves that are nudged toward higher-probability regions.

The proposal has the form
$$
Y = x - \eta \nabla E(x) + \sqrt{2\eta}\,\xi,
$$
where `xi` is Gaussian noise.

Plain-English meaning:

- the gradient term says “move downhill in energy”
- the noise term says “but do not collapse into deterministic optimization”

That second part matters.
If you delete the noise, you are no longer really sampling properly.

### HMC

Hamiltonian Monte Carlo goes further.

It adds an auxiliary momentum variable and moves in an **extended state space**.

The big idea is not the physics story itself.
The big idea is:

- augment the state
- use that bigger space to make longer, more coherent moves
- avoid the tiny random-walk behavior of naive local proposals

So if MH is “correct a proposal,” HMC is “build a much better proposal by moving in a richer space.”

## 5.9 Simulated Tempering

Simulated tempering attacks a different difficulty.

When the target has sharp separated modes, one trick is to temporarily move to a flatter version of the distribution.

That is the role of temperature.

At higher temperature, the distribution is flatter and barriers are easier to cross.

So simulated tempering says:

- sometimes sample at the original target
- sometimes sample at easier, flatter versions
- move between these temperatures so the chain can travel more freely

Again, the deep idea is the same as HMC in spirit:

use a bigger state space to make the chain move better.

## 5.10 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say:

> MCMC is the sampling-based answer to hard inference. We build a Markov chain whose stationary distribution is the target distribution we care about. Detailed balance is a common way to prove stationarity. Metropolis-Hastings proposes then corrects with accept/reject. Gibbs resamples coordinates from exact conditionals. Mixing can still be slow, especially in high dimension or multimodal targets, which is why smarter methods like MALA, HMC, and tempering are introduced.

If you can say that in plain English, the section is working.

## Formal Anchors

These are the clean mathematical statements worth being able to recognize and explain.

### Stationarity

A distribution $\pi$ is stationary for transition kernel $P$ if
$$
\pi P=\pi,
$$
that is,
$$
\sum_x \pi(x)P(x,y)=\pi(y)
$$
for every state $y$ in the discrete case.

### Ergodic finite-chain picture

For a finite-state chain, irreducibility plus aperiodicity gives the standard convergence story:

- there is a unique stationary distribution
- the chain converges to it from any starting state

This is why those two properties show up constantly in exam questions.

### Detailed balance

If
$$
\pi(x)P(x,y)=\pi(y)P(y,x)
$$
for all states $x,y$, then $\pi$ is stationary.

So detailed balance is a convenient sufficient condition for stationarity.

### Metropolis-Hastings acceptance rule

Given proposal $q(x,y)$, MH accepts with probability
$$
\alpha(x,y)=\min\left(1,\frac{\pi(y)q(y,x)}{\pi(x)q(x,y)}\right).
$$

This construction only needs the target density up to proportionality, since any unknown normalizing constant cancels in the ratio.

### Gibbs sampling

Gibbs updates one coordinate by sampling from the exact conditional
$$
x_i' \sim \pi(x_i \mid x_{-i}).
$$

It can be viewed as a special case of MH in which the acceptance probability is effectively `1`.

### Mixing

Having the correct stationary distribution is not enough.
You also need the chain to approach it in reasonable time.
That is the practical importance of mixing time.

## Worked Problems

### Problem 5.1

What is the difference between "the chain has stationary distribution $\pi$" and "the chain mixes quickly to $\pi$"?

### Solution

Stationarity is a correctness property of the transition rule:
if the chain is already distributed as $\pi$, one more step leaves it distributed as $\pi$.

Mixing speed is a convergence property:
it asks how long it takes to get close to $\pi$ from a nonstationary starting point.

So a chain can be correct in the limit but still be practically useless if it mixes very slowly.

### Problem 5.2

Why does detailed balance imply stationarity?

### Solution

If
$$
\pi(x)P(x,y)=\pi(y)P(y,x)
$$
for all $x,y$, then summing both sides over $x$ gives
$$
\sum_x \pi(x)P(x,y)=\pi(y)\sum_x P(y,x)=\pi(y),
$$
since $\sum_x P(y,x)=1$.

That is exactly the stationarity condition.

### Problem 5.3

Why is Metropolis-Hastings especially convenient for unnormalized targets such as undirected models?

### Solution

Because the acceptance ratio uses only the ratio of target densities.
If
$$
\pi(x)=\frac{1}{Z}\tilde{\pi}(x),
$$
then the unknown constant $Z$ cancels:
$$
\frac{\pi(y)}{\pi(x)}=\frac{\tilde{\pi}(y)}{\tilde{\pi}(x)}.
$$

So MH can be implemented without computing the partition function.

### Problem 5.4

What makes Gibbs sampling simpler than generic Metropolis-Hastings?

### Solution

Gibbs samples directly from the exact conditional distribution of one coordinate given the rest.
Because the update is already exactly matched to the target conditional, no additional accept/reject step is needed.

### Problem 5.5

Give two reasons an MCMC chain can mix slowly.

### Solution

Two major reasons are:

- multimodality: the chain has trouble crossing low-probability barriers between modes
- high dimension with bad proposals: the proposal distribution tends to suggest states that are not typical under the target

Both make successful, informative moves rare.

### Problem 5.6

What is the basic idea behind HMC, and why is it often better than a naive random walk?

### Solution

HMC augments the state with momentum variables and proposes moves by approximately following Hamiltonian dynamics in the enlarged space.

This produces longer, more coherent moves through the target distribution, reducing the inefficient random-walk behavior of simpler local proposals.

### Problem 5.7

Why can simulated tempering help in a multimodal target?

### Solution

At higher temperature, the distribution is flatter and barriers between modes are easier to cross.
By allowing the chain to move between temperatures, simulated tempering helps it explore regions that would be hard to reach if it stayed only at the original sharp target.
