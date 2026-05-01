# Optimization for ML - Homework 3 Interactive Study Guide

Source prompt: [materials/processed/optimization-for-ml/HW3_prompt.md](../../../materials/processed/optimization-for-ml/HW3_prompt.md)

Companion live chat:
- [topics/optimization-for-ml/live-chats/2026-03-28-hw3-live-chat-problem-1.md](../live-chats/2026-03-28-hw3-live-chat-problem-1.md)

Primary lecture links:
- [materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md](../../../materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md)
- [materials/processed/optimization-for-ml/Feb19_stoch_gd.md](../../../materials/processed/optimization-for-ml/Feb19_stoch_gd.md)
- [materials/processed/optimization-for-ml/March10_LP_Duality.md](../../../materials/processed/optimization-for-ml/March10_LP_Duality.md)
- [materials/processed/optimization-for-ml/March12_Part1_LagrangianFunction.md](../../../materials/processed/optimization-for-ml/March12_Part1_LagrangianFunction.md)
- [materials/processed/optimization-for-ml/March12_Part2_SaddlePoints_Minimax_Slater.md](../../../materials/processed/optimization-for-ml/March12_Part2_SaddlePoints_Minimax_Slater.md)
- [materials/processed/optimization-for-ml/March17_KKT.md](../../../materials/processed/optimization-for-ml/March17_KKT.md)
- [materials/processed/optimization-for-ml/Jan15_ConvexSets.md](../../../materials/processed/optimization-for-ml/Jan15_ConvexSets.md)
- [materials/processed/optimization-for-ml/Jan20_ConvexFunctions.md](../../../materials/processed/optimization-for-ml/Jan20_ConvexFunctions.md)
- [materials/processed/optimization-for-ml/Jan27_matrix_norms.md](../../../materials/processed/optimization-for-ml/Jan27_matrix_norms.md)

## What this file is for

This is a concept guide for HW3, not a solution set.

Use it to answer:
- What is each problem really testing?
- Which lecture ideas do I need before I start writing?
- What proof pattern or modeling trick should I be looking for?
- What are the common ways to get stuck?

If you want to use this like a live session, stop at every `Pause` block and answer the prompt out loud or in writing before reading further.

## Fast rundown: the most important topics on HW3

If you are short on time, study in this order:

1. `KKT + Lagrangian thinking`
- This shows up directly in Problem 3 and indirectly in duality questions.
- You need to be fluent with feasibility, stationarity, complementary slackness, and multiplier signs.

2. `Convex relaxations and duality language`
- Problem 2 and Problem 4 both want modeling instincts, not just computation.
- You should be able to explain why we relax a hard problem, what gets lost, and how matrix/LP formulations encode the same idea.

3. `Proximal gradient / composite optimization`
- Problem 1 is really a proof-structure question.
- The key objects are the prox operator, gradient mapping, smoothness, strong convexity, and how they combine into a descent inequality.

4. `SGD behavior for logistic regression`
- Problem 5 is implementation-heavy, but the concepts are standard: unbiased stochastic gradients, mini-batches, variance, and step-size effects.

5. `Convexity constraints for piecewise-linear models`
- Problem 4 is less about memorized theorems and more about translating geometry into linear constraints.

## HW3 map: what each problem is actually about

### Problem 1: Proximal algorithms
- Topic: composite optimization, where $f(x) = g(x) + h(x)$ with smooth $g$ and nonsmooth convex $h$
- Main skill: proving inequalities by combining smoothness, prox optimality, and strong convexity
- Main theorem flavor: generalized descent lemma and linear convergence under strong convexity

### Problem 2: MaxCut via LP, QP, and SDP relaxations
- Topic: optimization modeling and relaxations for a combinatorial problem
- Main skill: re-encoding a discrete problem in continuous variables, then judging whether the relaxation is informative
- Main theorem flavor: LP too loose, QP closer but nonconvex, SDP via Gram matrices and PSD constraints

### Problem 3: KKT
- Topic: Lagrange multipliers and first-order optimality conditions
- Main skill: build the Lagrangian correctly, handle the inequality sign carefully, solve KKT equations, then verify the chosen KKT point is actually a maximum
- Main theorem flavor: KKT is necessary in nonconvex settings under constraint qualifications, but not automatically sufficient

### Problem 4: Convex approximation
- Topic: linear programming formulation and LP dual interpretation
- Main skill: encode convexity of a piecewise-linear approximation with linear inequalities, and encode absolute values with auxiliary variables
- Main theorem flavor: primal LP expresses the fit problem, dual variables explain which convexity constraints matter

### Problem 5: Logistic regression with SGD
- Topic: stochastic optimization for empirical risk minimization
- Main skill: derive the gradient, implement mini-batch SGD correctly, compare batch size / learning-rate tradeoffs, and interpret plots relative to $f^*$
- Main theorem flavor: stochastic gradients are unbiased but noisy, so behavior changes with batch size and step size

## Module 1: Problem 1 is really about proximal-gradient proof structure

### Core idea

You are not being asked to invent a new algorithm. You are being asked to recognize that proximal gradient behaves like gradient descent once you replace the ordinary gradient by the gradient mapping

$$
G_\eta(x) = \frac{1}{\eta}\left(x - \operatorname{prox}_{\eta,h}(x - \eta \nabla g(x))\right).
$$

The update becomes

$$
x^+ = x - \eta G_\eta(x).
$$

That is the whole conceptual bridge.

### What you need from lecture

- $g$ is $\beta$-smooth, so quadratic upper bounds apply
- $g$ is also $\alpha$-strongly convex, so lower curvature enters the proof
- $h$ may be nonsmooth, so you do not differentiate it directly
- prox optimality gives a usable inequality at the prox point
- setting $z = x^*$ is the usual move when turning a descent lemma into a convergence rate

### The mental proof template

1. Use smoothness on $g$ at the prox-updated point.
2. Use the optimality condition of the prox subproblem to control $h$.
3. Add the two bounds.
4. Use strong convexity of $g$ to pull in the $-\frac{\alpha}{2}\|x-z\|^2$ term.
5. Choose $z = x^*$ when you want a contraction-style recursion.

### What the problem is testing

- Do you know why prox is useful for structured nonsmooth terms?
- Do you know how to replace a missing gradient for $h$ by a prox optimality statement?
- Do you know how strong convexity upgrades sublinear-style reasoning into linear convergence?

### Common traps

- Treating $h$ as if it were differentiable
- Forgetting that the prox point is $x - \eta G_\eta(x)$
- Losing track of where the strong convexity term enters
- Copying the non-strongly-convex proof without modifying the final recursion

### Pause 1

Before moving on, say in one sentence:

Why is $G_\eta(x)$ the right analogue of $\nabla f(x)$ in composite optimization?

### Minimal checklist before you solve Problem 1

- I can define the proximal operator.
- I can define the gradient mapping.
- I know the smoothness inequality for $g$.
- I know where strong convexity appears in inequalities.
- I know that $z = x^*$ is the natural plug-in for the rate proof.

## Module 2: Problem 2 is about the logic of relaxations

### Big picture

MaxCut is discrete and NP-hard, so the homework walks you through three progressively smarter continuous viewpoints:

1. LP relaxation
2. quadratic formulation
3. SDP relaxation

The goal is not just "write formulas." The goal is to understand what each formulation keeps and what each one throws away.

### Part A: what the LP relaxation is testing

The first LP introduces variables that are supposed to represent whether an edge is cut and whether a vertex is on one side of the partition.

What matters conceptually:
- every true cut should map to a feasible LP point
- the LP should preserve objective ordering across true cuts
- but the relaxation may have fractional solutions that are much better than any real cut

This is the homework's main critique:
- a relaxation can be polynomial-time solvable and still be too weak to be meaningful

### Part B: what the quadratic formulation is testing

The second model uses scalar variables $u_i$ that come from the $\{-1,1\}$ encoding of a cut.

What you should see immediately:
- discrete cut variables naturally suggest products like $u_i u_j$
- adjacency-matrix structure turns graph sums into quadratic forms
- the feasible box $u_i \in [-1,1]$ is convex, but the objective matrix need not be PSD in the way required for convex minimization

So the homework is asking you to separate two questions:
- can I write this as a quadratic program?
- is that quadratic program convex?

Those are not the same question.

### Part C: what the SDP formulation is testing

This is the conceptual high point of the problem.

Instead of forcing each $u_i$ to be a scalar in $\{-1,1\}$, you let each $u_i$ be a unit vector. Then inner products replace scalar products, and the Gram matrix

$$
X_{ij} = u_i \cdot u_j
$$

becomes the natural variable.

Why this matters:
- objective terms become linear in the matrix entries $X_{ij}$
- unit norm becomes diagonal constraints like "diagonal entries equal 1"
- Gram matrices are automatically PSD

That last point is the entire reason SDP enters:

$$
X \succeq 0
$$

encodes the existence of vectors whose pairwise inner products are exactly the entries of $X$.

### What you need from earlier lectures

- PSD matrix meaning: symmetric and $z^\top X z \ge 0$ for all $z$
- the PSD cone is convex
- adjacency-matrix and quadratic-form language
- weak intuition for why randomized rounding turns relaxed objects back into discrete ones

### Common traps

- thinking every quadratic program is convex
- forgetting that an SDP is convex because the PSD cone is convex and the rest of the constraints are linear
- not seeing why Gram matrices are PSD
- treating the LP, QP, and SDP as unrelated problems instead of a progression of modeling choices

### Pause 2

Answer these without computing anything:

1. Why can a relaxation have a better objective value than the true combinatorial problem?
2. Why is the SDP variable naturally a matrix rather than a list of vectors?

### Minimal checklist before you solve Problem 2

- I can explain the $\{-1,1\}$ encoding of a cut.
- I know how graph sums connect to an adjacency matrix.
- I know the difference between "quadratic" and "convex quadratic."
- I know why Gram matrices satisfy $X \succeq 0$.
- I know why diagonal constraints represent unit vectors.

## Module 3: Problem 3 is KKT plus verification, not just algebra

### Big picture

This problem is nonconvex, so you should not use the convex version of the KKT story blindly.

The correct mindset is:
- write down the KKT system carefully
- solve for candidate points
- then verify whether the candidate is actually a maximum

### First thing to check

There are logarithms in the objective, so the domain already forces

$$
x_1 > 0, \quad x_2 > 0.
$$

That matters before you even touch the multipliers.

### KKT ingredients you need

For a problem with equality and inequality constraints, you should be completely comfortable identifying:

- primal feasibility
- dual feasibility
- complementary slackness
- stationarity

You also need to be careful with sign conventions:
- if you learned KKT for minimization with constraints of the form $h(x) \le 0$, convert the problem consistently
- if the original problem is a maximization, either rewrite it as minimizing the negative objective or keep an internally consistent max-version of the Lagrangian

### What the homework is actually testing

- Can you form the Lagrangian without sign mistakes?
- Can you see which constraints are active?
- Can you solve the resulting system cleanly?
- Can you justify "maximum" rather than just "KKT point"?

### How to verify the candidate after KKT

You have a few legitimate paths:

1. Reduce the feasible set using the equality constraint and inspect the resulting one-variable objective.
- This is often the cleanest path in small problems.

2. Use second-order reasoning on the Lagrangian / reduced problem.
- For a maximum, you are looking for negative curvature along feasible directions.

3. Compare all KKT candidates and check which one is feasible and best.
- In nonconvex problems, multiple KKT points can exist.

The homework remark about LICQ is a clue that constraint qualification language matters here, but you do not need to overcomplicate it if direct verification is easier.

### Common traps

- forgetting the domain restrictions from $\log$
- writing complementary slackness with the wrong sign convention
- assuming KKT is sufficient just because you found multipliers
- verifying a local extremum with the unconstrained Hessian instead of along feasible directions / reduced variables

### Pause 3

Say this out loud before solving:

What is the difference between "I found a KKT point" and "I proved this is the optimizer" in a nonconvex problem?

### Minimal checklist before you solve Problem 3

- I can build the Lagrangian with correct signs.
- I can list the four KKT components from memory.
- I will check the log-domain restrictions first.
- I know I still need a separate verification step after solving KKT.

## Module 4: Problem 4 is about turning geometry into an LP

### Big picture

You are given samples of a function and want the best convex piecewise-linear approximation.

The important modeling insight is this:

Convexity of a piecewise-linear function is equivalent to its slopes not decreasing as you move from left to right.

That is the bridge from geometry to linear inequalities.

### What the primal LP is testing

Two separate modeling tricks:

1. `Convexity encoding`
- If the values of the approximation at grid points are $g_i$, then convexity can be enforced by requiring successive discrete slopes to be nondecreasing.
- Equivalently, discrete second differences should be nonnegative.

2. `Absolute-value linearization`
- The objective uses $|g_i - f(i)|$.
- In LP modeling, absolute values are usually handled by introducing auxiliary nonnegative variables that upper-bound both positive and negative deviations.

The problem is really checking whether you recognize those two patterns.

### What the dual is testing

The dual is asking for interpretation, not just symbol pushing.

What to watch for:
- dual variables correspond to primal constraints
- some dual variables measure how much the fit objective "pushes back" on deviation constraints
- other dual variables are tied to the convexity constraints, which means they encode where curvature restrictions are active or binding

You do not need a mystical story. A good dual interpretation is usually:
- which primal constraints generate the multipliers,
- what type of sensitivity they measure,
- and what it means when one is zero versus active.

### Why this problem belongs with duality

Problem 4 sits right on the boundary between modeling and interpretation:
- the primal tells you how to build the approximation
- the dual tells you which constraints shape the final answer

That is exactly the point of the March duality lectures.

### Common traps

- describing convexity vaguely instead of translating it into linear inequalities
- treating absolute values directly in an LP objective
- deriving the dual mechanically without interpreting what the multipliers mean
- forgetting which variables must be nonnegative

### Pause 4

Without writing formulas, explain:

Why does "convex piecewise linear" become a statement about how slopes change from one interval to the next?

### Minimal checklist before you solve Problem 4

- I can describe discrete convexity using slopes or second differences.
- I know the standard LP trick for absolute values.
- I remember that dual variables correspond to primal constraints.
- I can explain what an active convexity constraint means geometrically.

## Module 5: Problem 5 is an SGD implementation and interpretation problem

### Big picture

This is not a generic coding exercise. It is testing whether you understand the relationship between:

- logistic loss
- stochastic gradients
- mini-batch size
- learning rate
- variance
- convergence diagnostics

### What you need conceptually

The logistic regression objective here is an empirical average:

$$
f(w) = \frac{1}{N} \sum_{i=1}^N \log(1 + e^{-y_i \langle w, x_i \rangle}).
$$

That means:
- the full gradient is an average over data points
- a single-example or mini-batch gradient is a stochastic approximation to that full gradient
- larger batches reduce variance but cost more per iteration

### What the code is really testing

1. `Sampling correctness`
- The homework explicitly says sample with replacement.

2. `Objective evaluation correctness`
- The plotted function value is the full-data objective, not the mini-batch objective.

3. `Gradient derivation correctness`
- You should know the form of the logistic-loss gradient and implement it directly.

4. `Experimental discipline`
- 16 hyperparameter settings
- 25 runs each
- average across runs
- compare against a reference optimum $f^*$

### What the plots are supposed to teach you

- Larger batch sizes usually give smoother curves because the gradient estimate has lower variance.
- Very large learning rates may oscillate or diverge.
- Smaller learning rates may be stable but slow.
- Full-batch SGD is just gradient descent here, but with the chosen step size it may or may not be the best practical performer over a fixed 500-iteration budget.

### The theory bridge

From the SGD lecture, the right intuition is:
- unbiasedness gives you the correct direction in expectation
- variance controls how noisy the progress is
- fixed step sizes can create a noise floor

So when you explain the plots, you should think in terms of:
- bias/variance tradeoff from batch size
- aggressiveness/stability tradeoff from learning rate
- limited-iteration behavior, not just asymptotic convergence

### Common traps

- computing the plotted objective on the current mini-batch instead of the whole dataset
- forgetting to average across 25 runs
- mixing up the minimizer $w^*$ with the optimal value $f^*$
- treating noisy curves as coding bugs when they are actually expected SGD behavior

### Pause 5

Answer before coding:

Why can batch size $b=1$ sometimes make faster early progress but noisier curves than $b=1000$?

### Minimal checklist before you solve Problem 5

- I can derive or verify the logistic-loss gradient.
- I know the batch is sampled with replacement.
- I will evaluate $f(w)$ on the whole dataset for plots.
- I know what quantity each requested plot should show.
- I can explain results using variance and step-size logic.

## Cross-problem connections you should notice

These are not five unrelated questions.

### Connection 1: structure is everything

- Problem 1 uses structure in $f = g + h$.
- Problem 2 uses structure in graphs and Gram matrices.
- Problem 4 uses structure in piecewise-linear convexity.
- Problem 5 uses finite-sum structure in empirical risk.

The course keeps rewarding the same move: do not treat the problem as generic if it has exploitable structure.

### Connection 2: first-order information appears in different forms

- gradient in GD / SGD
- subgradient in nonsmooth optimization
- gradient mapping in proximal methods
- stationarity in KKT

These are all versions of "what condition replaces zero derivative in this setting?"

### Connection 3: relaxations trade exactness for tractability

- LP relaxation: easy but weak
- QP relaxation: more faithful but not necessarily convex
- SDP relaxation: more expressive and still convex

This is a major course theme: better models often come from richer convex sets, not just more variables.

## Suggested study order for this homework

If you want the best return on time, do this:

1. Read `Problem 3` and `Problem 1` first.
- They are closest to direct lecture material.

2. Then read `Problem 5`.
- The theory is familiar, and the coding requirements are explicit.

3. Then read `Problem 4`.
- Mostly a modeling exercise once you remember LP tricks.

4. Leave `Problem 2` for a focused block.
- It is conceptually rich and mixes graph modeling, relaxations, quadratic forms, PSD matrices, and SDP ideas.

## A short interactive session you can run by yourself

Answer these one at a time without looking back.

1. What does the proximal operator let you do that plain gradient descent cannot do directly?
2. Why can a convex relaxation be mathematically correct but still algorithmically unhelpful?
3. What is the difference between a KKT point and an optimizer in a nonconvex problem?
4. How do you recognize convexity of a discrete piecewise-linear function from its samples?
5. Why does increasing batch size usually smooth SGD trajectories?
6. What does $X \succeq 0$ mean geometrically in the SDP formulation?
7. In Problem 1, where does strong convexity enter the proof, and what improvement does it buy you?
8. In Problem 5, why is $f^*$ a useful baseline even though SGD never computes it directly?

If you cannot answer one of these cleanly, that is the topic to review before doing the corresponding homework problem.

## Final pre-solve checklist

- `Problem 1`: I know prox, gradient mapping, smoothness, strong convexity, and the descent-proof template.
- `Problem 2`: I know cut encodings, relaxations, quadratic forms, Gram matrices, and PSD constraints.
- `Problem 3`: I can set up KKT carefully and separately verify optimality.
- `Problem 4`: I can encode convexity and absolute values as linear constraints and explain dual multipliers.
- `Problem 5`: I can derive the logistic gradient, implement mini-batch SGD correctly, and interpret noisy curves.

## One-paragraph summary

HW3 is mainly testing whether you can recognize the right mathematical language for each setting: gradient mapping for composite optimization, relaxation quality for MaxCut, KKT reasoning for constrained optimization, LP modeling for convex approximation, and variance-aware SGD thinking for logistic regression. If you keep asking "what structure is this problem exploiting?" you will be using the course the way the homework expects.
