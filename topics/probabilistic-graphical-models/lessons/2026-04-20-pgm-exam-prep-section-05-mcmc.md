# 5. MCMC and Advanced Sampling

## Table of Contents

- [[#0. How To Read This Section]]
- [[#5.0 Why We Need MCMC]]
- [[#5.1 Markov-Chain Basics]]
- [[#5.2 Stationary Distribution and Detailed Balance]]
- [[#5.3 Metropolis-Hastings]]
- [[#5.4 Gibbs Sampling]]
- [[#5.5 Why High Dimensions and Multimodality Are Hard]]
- [[#5.6 HMC and the Extended-State Idea]]
- [[#5.7 Simulated Tempering]]
- [[#5.8 What To Remember]]

## 0. How To Read This Section

This section is about the sampling answer to the inference problem.

Instead of trying to compute a hard distribution exactly, we try to build a Markov chain that eventually samples from the right target.

The most important ladder is:

1. stationary distribution
2. detailed balance
3. Metropolis-Hastings and Gibbs
4. why naive chains can mix badly
5. why extended-state methods try to fix that

## 5.0 Why We Need MCMC

When exact inference is too expensive, one alternative is:

do not compute the distribution exactly; instead, sample from it.

If you can generate representative samples, then you can estimate:

- expectations
- marginals
- probabilities

This is the motivation for MCMC.

## 5.1 Markov-Chain Basics

A Markov chain is a stochastic process where the next state depends only on the current state.

For MCMC, the goal is to design a chain whose stationary distribution is the target distribution we care about.

So the big idea is:

- build an easy-to-simulate transition rule
- make sure its long-run behavior matches the target

## 5.2 Stationary Distribution and Detailed Balance

A distribution $\pi$ is stationary for a Markov chain if, once the chain is distributed as $\pi$, one transition leaves it distributed as $\pi$ again.

Detailed balance is a common sufficient condition:
$$
\pi(i)P(i,j)=\pi(j)P(j,i).
$$

The intuition is:

probability flow from $i$ to $j$ is balanced by flow from $j$ to $i$.

This is one of the most reusable facts in the MCMC part of the course.

## 5.3 Metropolis-Hastings

MH works like this:

1. propose a move from $i$ to $j$ using a proposal distribution $q(i,j)$
2. accept it with probability
$$
\alpha(i,j)=\min\left(1,\frac{\pi_j q(j,i)}{\pi_i q(i,j)}\right)
$$
3. if rejected, stay where you are

Why MH is useful:

- it only needs the target up to a normalization constant
- the unknown normalizer cancels in the acceptance ratio

That makes MH natural for models where the partition function is hard.

## 5.4 Gibbs Sampling

Gibbs sampling updates one coordinate or block at a time by sampling from the full conditional.

So a single Gibbs step is:

- pick a coordinate
- sample that coordinate from the exact conditional given the others

The important relationship is:

Gibbs is a special case of MH where the proposal is chosen so the acceptance probability is 1.

## 5.5 Why High Dimensions and Multimodality Are Hard

The course emphasized that simple chains can mix very slowly in:

- high dimensions
- multimodal distributions

Why?

Because local moves may take a very long time to move between distant high-probability regions.

So the chain can spend too long trapped in one mode.

This is one of the biggest practical limitations of naive MCMC.

## 5.6 HMC and the Extended-State Idea

Hamiltonian Monte Carlo improves exploration by augmenting the state with an auxiliary momentum or velocity variable.

The key conceptual move is:

- original state: $x$
- extended state: $(x, v)$

Then you simulate dynamics in the enlarged space to propose larger, more informed moves.

The class-level takeaway is not just the algorithm mechanics. It is the extended-state viewpoint:

you enlarge the state space to get a chain with better movement.

## 5.7 Simulated Tempering

Simulated tempering also uses an extended state space, but now the extra variable is a temperature index.

The purpose is to let the chain move temporarily through easier, flatter distributions so it can cross barriers more easily.

So HMC and tempering are different methods, but both fit the extended-state theme.

## 5.8 What To Remember

- MCMC is for approximate inference by sampling
- stationary distribution is the long-run target
- detailed balance is a common way to prove stationarity
- MH uses accept/reject correction
- Gibbs updates from full conditionals
- high dimensions and multimodality make naive mixing hard
- HMC and tempering both enlarge the state space to improve exploration
