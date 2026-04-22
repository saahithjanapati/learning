# PGM Math Machinery Primer

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Note]]
- [[#1. Probability Algebra You Need Constantly]]
- [[#2. Expectations, Variance, and Monte Carlo]]
- [[#3. Entropy, Mutual Information, KL, and Jensen]]
- [[#4. Logs, Exponentials, Energies, and Partition Functions]]
- [[#5. Graph and Separation Language]]
- [[#6. Calculus Toolkit for PGM Problems]]
- [[#7. Linear Algebra and Gaussian Facts]]
- [[#8. Optimization Patterns and Bound Tricks]]
- [[#9. Markov Chains and Sampling Language]]
- [[#10. Causal Algebra and Adjustment Formulas]]
- [[#11. What To Do When You Get Stuck]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This note is not about one chapter of the course.
It is about the reusable mathematical moves that show up across almost every chapter.

If you are struggling with PGM problems, it is often not because the model idea is impossible.
It is because one of the following moves is still shaky:

- summing out variables
- conditioning and renormalizing
- turning products into sums with logs
- recognizing a KL divergence
- using Jensen's inequality
- understanding what a gradient or Jacobian is with respect to
- seeing why a normalizing constant cancels
- reading a graph as a conditional-independence statement

So the purpose of this note is:

`build one shared mathematical floor under the whole course`

This note is based on what keeps recurring in the lectures, the course recap, the practice exam, the graded midterm/homework material, and the rewritten section notes.

## 0. How To Use This Note

Read this note if any of the following feels true:

- the formulas in the main notes feel foreign before the actual PGM idea even starts
- you can kind of follow the words, but not the algebra
- you keep seeing the same symbols and do not feel stable on them

The right way to use this note is not to memorize every formula at once.
Use it diagnostically.

When a problem feels hard, ask:

1. Is this mainly a probability-algebra problem?
2. Is this mainly an expectation or KL problem?
3. Is this mainly a calculus or derivative problem?
4. Is this mainly a graph-separation problem?
5. Is this mainly a Markov-chain or optimization problem?

That usually tells you which part of the toolbox to reach for.

## 1. Probability Algebra You Need Constantly

This is the most important section in the whole note.
If probability algebra is unstable, almost everything later feels harder than it really is.

### Joint, marginal, and conditional

The full object is usually a **joint distribution**
$$
p(x_1,\dots,x_n).
$$

A **marginal** means:

- keep the variables you care about
- sum or integrate out the rest

For example,
$$
p(x_i)=\sum_{x_{-i}} p(x_i,x_{-i}).
$$

A **conditional** means:

- treat some variables as observed
- renormalize appropriately

For example,
$$
p(x\mid e)=\frac{p(x,e)}{p(e)}.
$$

### Why this matters everywhere

This is the algebra under:

- posterior inference
- variable elimination
- belief propagation
- Gibbs sampling conditionals
- ELBO derivations
- causal adjustment formulas

### The chain rule of probability

Any joint can be written as
$$
p(x_1,\dots,x_n)=p(x_n\mid x_{1:n-1})\cdots p(x_2\mid x_1)p(x_1).
$$

Graphical models are structured restrictions of this general identity.

For DAGs, the restriction is
$$
p(x)=\prod_i p(x_i\mid pa_i).
$$

### Bayes' rule

This is still everywhere:
$$
p(z\mid x)=\frac{p(x\mid z)p(z)}{p(x)}.
$$

The denominator is often the hard part.
It is what turns an unnormalized posterior numerator into a normalized posterior.

### Unnormalized quantities

A very common move is to write
$$
p(x)\propto \tilde p(x).
$$

This means:

- $\tilde p(x)$ is correct up to a multiplicative constant
- the missing constant does not depend on $x$

This is useful because:

- MAP only needs proportionality
- MCMC acceptance ratios often cancel the constant
- score matching with respect to $x$ kills the constant

### One high-yield exam habit

When you see a probability expression, always ask:

- is this normalized?
- if not, what is the missing normalizer?
- does the problem actually need the normalizer?

That one question saves a lot of wasted work.

## 2. Expectations, Variance, and Monte Carlo

### Expectation

For discrete variables,
$$
\mathbb{E}[f(X)] = \sum_x p(x)f(x).
$$

For continuous variables,
$$
\mathbb{E}[f(X)] = \int p(x)f(x)\,dx.
$$

You should read expectation as:

`average value under a distribution`

### Linearity of expectation

This is one of the most useful algebra facts in the whole course:
$$
\mathbb{E}[a f(X) + b g(X)] = a\mathbb{E}[f(X)] + b\mathbb{E}[g(X)].
$$

This is true whether or not `f` and `g` are independent.

### Variance

$$
\mathrm{Var}(X)=\mathbb{E}[(X-\mathbb{E}X)^2].
$$

Equivalent identity:
$$
\mathrm{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}X)^2.
$$

### Covariance

$$
\mathrm{Cov}(X,Y)=\mathbb{E}[(X-\mathbb{E}X)(Y-\mathbb{E}Y)].
$$

Covariance measures linear co-movement.
It is not the same as general dependence, but it is still very useful, especially for Gaussians.

### Law of total expectation

This one shows up constantly:
$$
\mathbb{E}[X]=\mathbb{E}[\mathbb{E}[X\mid Y]].
$$

Read it as:

`average first inside a conditioning event, then average over the conditioning variable`

### Monte Carlo estimation

If you can sample
$$
X_1,\dots,X_N \sim p,
$$
then
$$
\frac{1}{N}\sum_{i=1}^N f(X_i)
$$
estimates
$$
\mathbb{E}_p[f(X)].
$$

This is the core idea behind approximate inference by sampling.

### Variance of a sample mean

If the samples are IID,
$$
\mathrm{Var}\left(\frac{1}{N}\sum_{i=1}^N X_i\right)=\frac{\mathrm{Var}(X)}{N}.
$$

This is the basic reason more samples reduce noise.

### Chebyshev's inequality

From the early lecture material:
$$
\Pr(|X-\mathbb{E}X|\ge \epsilon)\le \frac{\mathrm{Var}(X)}{\epsilon^2}.
$$

This is not the sharpest bound in the world, but it is conceptually useful because it ties:

- accuracy
- variance
- sample size

## 3. Entropy, Mutual Information, KL, and Jensen

This group of ideas shows up in:

- Gibbs variational principle
- ELBO derivations
- mean-field VI
- GAN and JS-divergence discussions
- information-theoretic interpretations of dependence

### Entropy

For a discrete distribution,
$$
H(X)=-\sum_x p(x)\log p(x).
$$

Interpretation:

- high entropy means spread out uncertainty
- low entropy means concentrated certainty

### Conditional entropy

$$
H(Y\mid X)=\mathbb{E}_X[H(Y\mid X=x)].
$$

It measures how uncertain `Y` remains once `X` is known.

### Chain rule of entropy

$$
H(X,Y)=H(X)+H(Y\mid X)=H(Y)+H(X\mid Y).
$$

This is worth being comfortable with, because it is one of the templates behind more advanced decompositions.

### Mutual information

$$
I(X;Y)=H(X)-H(X\mid Y)=H(Y)-H(Y\mid X).
$$

It also has the KL form
$$
I(X;Y)=\mathrm{KL}(p(x,y)\,\|\,p(x)p(y)).
$$

That tells you mutual information is zero exactly when the joint equals the product of marginals, that is, when the variables are independent.

### KL divergence

$$
\mathrm{KL}(p\|q)=\sum_x p(x)\log\frac{p(x)}{q(x)}
=
\mathbb{E}_p\left[\log\frac{p(x)}{q(x)}\right].
$$

Very important facts:

- KL is always nonnegative
- KL is zero iff the distributions match almost everywhere
- KL is not symmetric
- KL is not a metric

### Why KL direction matters

The class keeps returning to this.

Minimizing
$$
\mathrm{KL}(q\|p)
$$
is not the same as minimizing
$$
\mathrm{KL}(p\|q).
$$

This matters in VI versus MLE-style behavior:

- `KL(q||p)` often behaves more mode-seeking
- `KL(p||q)` often behaves more mass-covering

That exact contrast appears in the practice exam and in the late-course generative-model discussion.

### Jensen's inequality

If $\phi$ is convex, then
$$
\phi(\mathbb{E}[X])\le \mathbb{E}[\phi(X)].
$$

If $\phi$ is concave, the inequality reverses.

This sounds abstract until you realize how often it is used:

- proving KL nonnegativity
- proving ELBO is a lower bound
- reasoning about entropy and log-sum expressions

### KL nonnegativity from Jensen

One clean derivation is:
$$
\mathrm{KL}(p\|q)=\mathbb{E}_p\left[\log\frac{p}{q}\right]
=-\mathbb{E}_p\left[\log\frac{q}{p}\right].
$$

Since `log` is concave,
$$
\mathbb{E}_p\left[\log\frac{q}{p}\right]
\le
\log \mathbb{E}_p\left[\frac{q}{p}\right]
=\log \sum_x q(x)
=\log 1
=0.
$$

So
$$
\mathrm{KL}(p\|q)\ge 0.
$$

This proof pattern is worth recognizing on sight.

## 4. Logs, Exponentials, Energies, and Partition Functions

This section is a small algebra toolkit that shows up everywhere.

### Logs turn products into sums

If
$$
p(x)=\prod_i f_i(x),
$$
then
$$
\log p(x)=\sum_i \log f_i(x).
$$

Why do we care?

Because sums are much easier than products for:

- optimization
- gradient computation
- variational derivations
- MAP reasoning

### Argmax is unchanged by log

Because `log` is strictly increasing,
$$
\arg\max_x p(x)=\arg\max_x \log p(x).
$$

This is a very useful move in MAP problems and max-product reasoning.

### Exponential-family and energy language

You will see both of these forms:
$$
p(x)\propto \exp(f(x))
\qquad\text{or}\qquad
p(x)\propto \exp(-E(x)).
$$

These are the same basic idea with different sign conventions.

- high `f(x)` means high probability
- low `E(x)` means high probability

### Partition function

If
$$
p(x)=\frac{1}{Z}\tilde p(x),
$$
then
$$
Z=\sum_x \tilde p(x)
$$
or in the continuous case
$$
Z=\int \tilde p(x)\,dx.
$$

Its role is simple:

- divide by the total mass so probabilities sum or integrate to `1`

Its computational role is hard:

- it is often the intractable part

### Log partition function

You often care about
$$
\log Z
$$
rather than `Z` itself.

Why?

- likelihoods use logs
- variational principles are often stated in terms of `log Z`
- derivatives of `log Z` have especially useful expectation forms

### Why unnormalized models are still useful

Even if you cannot compute `Z`, you can often still do useful things:

- compare energies
- run MH because $Z$ cancels
- compute scores with respect to $x$ because $\nabla_x \log Z = 0$

That cancellation instinct is one of the best habits you can build.

## 5. Graph and Separation Language

This is not pure algebra, but it is absolutely part of the reusable machinery of the class.

### Directed graph vocabulary

For a DAG, know these cold:

- parent
- child
- ancestor
- descendant
- non-descendant

These words appear in factorization statements and independence claims.

### Undirected graph vocabulary

Know these:

- neighbor
- clique
- maximal clique
- separator

These appear in UGM factorization and Markov-property questions.

### Chain, fork, collider

These three path patterns are foundational.

Chain:
$$
X \to Y \to Z
$$

Fork:
$$
X \leftarrow Y \to Z
$$

Collider:
$$
X \to Y \leftarrow Z
$$

Conditioning:

- blocks chains
- blocks forks
- opens colliders

That asymmetry is one of the highest-yield facts in the whole course.

### D-separation

Two variables or sets are d-separated given evidence if every path between them is blocked.

So many exam questions reduce to:

1. list paths
2. classify middle nodes
3. decide which ones are blocked by the evidence

### Moralization

This is the move that converts a DAG-independence question into an undirected separation question:

- keep relevant ancestors
- connect co-parents
- drop directions
- remove observed nodes appropriately
- check separation

### Treewidth intuition

Treewidth is not just a graph word.
It is the structural quantity that controls how bad exact inference becomes.

Operationally:

- eliminate a variable
- its remaining neighbors get coupled
- the largest induced clique created during the best elimination order determines treewidth

So when exact inference gets hard, treewidth is often the buried reason.

## 6. Calculus Toolkit for PGM Problems

This is the part that often scares people because the symbols come quickly.
Slow it down.

### Gradient

If $f(\theta)$ is scalar-valued, then
$$
\nabla_\theta f(\theta)
$$
is the vector of partial derivatives with respect to the coordinates of $\theta$.

Always ask:

`with respect to which variable am I differentiating?`

That question is crucial in score matching and energy models.

### Jacobian

If $s(x)$ is vector-valued, the Jacobian is the matrix of first derivatives:
$$
J_s(x)=\frac{\partial s}{\partial x}.
$$

In score matching, people often call this $Ds$ or $\nabla s$.

### Hessian

For a scalar function, the Hessian is the matrix of second derivatives:
$$
\nabla^2 f(x).
$$

The trace of the Hessian shows up in Hyvarinen score matching.

### Trace and divergence

The trace of a square matrix is the sum of its diagonal entries:
$$
\mathrm{tr}(A)=\sum_i A_{ii}.
$$

The divergence of a vector field $s(x)$ is the trace of its Jacobian:
$$
\nabla\cdot s(x)=\mathrm{tr}(J_s(x)).
$$

This exact quantity appears in score-matching formulas.

### Score function

The score of a density is
$$
\nabla_x \log p(x).
$$

Do not confuse:

- gradient with respect to $x$
- gradient with respect to parameters $\theta$

These are different objects.

In an energy-based model
$$
p_\theta(x)\propto \exp(-E_\theta(x)),
$$
we have
$$
\nabla_x \log p_\theta(x)= -\nabla_x E_\theta(x),
$$
because the normalizing constant does not depend on $x$.

That single cancellation powers score matching.

### Integration by parts

You do not need to become a PDE expert for this course.
You just need the high-level idea:

- move a derivative off the unknown data density
- put it onto something model-side that you can compute

That is why integration by parts is central in score matching, not just a side trick.

### REINFORCE identity

One useful derivative identity is
$$
\nabla_\phi \mathbb{E}_{q_\phi(z)}[f(z)]
=
\mathbb{E}_{q_\phi(z)}[f(z)\nabla_\phi \log q_\phi(z)]
$$
when $f$ does not itself depend on $\phi$.

This is the score-function estimator idea behind REINFORCE.

### Reparameterization

If you can write
$$
z=g_\phi(\epsilon,x),
\qquad
\epsilon \sim p(\epsilon),
$$
then the randomness is moved into $\epsilon$, and you can differentiate through the deterministic map $g_\phi$.

That is the core math idea behind the VAE reparameterization trick.

### Change of variables

The continuous change-of-variables identity is
$$
p_X(x)=p_Z(f^{-1}(x))\left|\det J_{f^{-1}}(x)\right|.
$$

You do not need this every day in the class, but it is part of the background language around flows and probability-flow viewpoints.

## 7. Linear Algebra and Gaussian Facts

These are the minimum useful facts.

### Vectors, matrices, and quadratic forms

Expressions like
$$
x^T A x
$$
show up constantly.
This is a quadratic form.

If `A` is symmetric positive semidefinite, then
$$
x^T A x \ge 0.
$$

### Covariance matrix

For a random vector `X`,
$$
\Sigma = \mathrm{Cov}(X).
$$

This captures pairwise linear dependence structure.

### Precision matrix

The precision matrix is
$$
J=\Sigma^{-1}.
$$

For Gaussian graphical models, sparsity of the precision matrix corresponds to sparse conditional-dependence structure.

Very important warning:

`sparse precision does not imply sparse covariance`

This is a standard conceptual test point.

### Multivariate Gaussian form

A Gaussian density is often written as
$$
p(x)\propto \exp\left(-\frac12 (x-\mu)^T \Sigma^{-1}(x-\mu)\right).
$$

That expression is worth being able to read in both directions:

- from probability to quadratic energy
- from quadratic energy to Gaussian structure

### Completing the square

This is the algebra move used to recognize Gaussian forms or derive conditional Gaussian expressions.

You do not need every version memorized, but you should recognize the goal:

- rearrange a quadratic into a centered square plus constants

### Norms and Lipschitz language

For WGAN and optimization-style statements, know the informal meaning:

- a `1`-Lipschitz function cannot change faster than linearly with slope bigger than `1`

You do not need advanced functional analysis here.
You do need to recognize that Lipschitz constraints are controlling how sharply the critic can vary.

## 8. Optimization Patterns and Bound Tricks

A lot of the course is really about turning a hard probabilistic problem into an optimization problem.

### Lower bound versus upper bound

When you see a relaxation, ask:

- did we restrict the feasible set?
- or did we enlarge it?

That often tells you whether you get a lower or upper bound.

This exact logic appears in the Gibbs variational principle relaxations:

- mean field is an inner approximation
- outer relaxations can overestimate $\log Z$

### ELBO decomposition

The key identity is
$$
\log p_\theta(x)
=
\mathcal{L}(q,\theta)
+
\mathrm{KL}(q(z)\|p_\theta(z\mid x)).
$$

This is one of the most important decomposition patterns in the course.

Why it matters:

- it proves the ELBO is a lower bound
- it explains why maximizing the ELBO improves the approximation

### Coordinate ascent

Mean-field VI and some EM-style procedures use a recurring pattern:

- hold everything else fixed
- optimize one block
- repeat

That is simpler than full joint optimization, but it can create nonconvex behavior.

### EM pattern

EM is not magic.
It is alternating optimization over:

- latent-variable inference under current parameters
- parameter optimization under current inferred latent-variable distribution

### Min-max pattern

GANs and WGANs are not simple minimization problems.
They are min-max problems:
$$
\min_G \max_D V(G,D).
$$

That means:

- one player is trying to increase the objective
- one player is trying to decrease it

So some of the weird training behavior comes from game structure, not just ordinary optimization difficulty.

### Fixed-point instinct

In message passing and some iterative inference procedures, you are often really looking for a fixed point:
$$
x = T(x).
$$

This mindset is useful for:

- loopy BP
- coordinate updates
- iterative solvers

## 9. Markov Chains and Sampling Language

This toolkit supports the MCMC section and any approximate-inference-by-sampling argument.

### Markov chain

A Markov chain has the property:

- the next state depends only on the current state
- not on the whole past

The transition kernel is
$$
P(x,y)=\Pr(X_{t+1}=y\mid X_t=x).
$$

### Stationary distribution

A distribution $\pi$ is stationary if
$$
\pi P=\pi.
$$

Meaning:

- if the chain is already distributed as $\pi$
- one more step leaves it distributed as $\pi$

### Detailed balance

$$
\pi(x)P(x,y)=\pi(y)P(y,x).
$$

This says flow from $x$ to $y$ matches flow from $y$ to $x$.

It is a very common sufficient condition for stationarity.

### Irreducible and aperiodic

These words are there to answer:

- can the chain reach the whole state space?
- is it trapped in a rigid cycle?

They matter because they support convergence to the stationary distribution.

### Extended state space

This is a common trick in advanced samplers:

- HMC augments with momentum
- tempering augments with temperature index

The enlarged state space is not a weird side detail.
It is the mechanism that makes better exploration possible.

## 10. Causal Algebra and Adjustment Formulas

This is a small but important toolkit from the causality end of the course.

### Observation versus intervention

These are not the same:
$$
P(Y\mid T=t)
\qquad\text{versus}\qquad
P(Y\mid do(T=t)).
$$

Conditioning means:

- observe
- update beliefs

Intervention means:

- force the variable
- break its normal parent mechanism

### Backdoor adjustment

If `W` blocks all backdoor paths and contains no descendants of treatment, then
$$
P(Y\mid do(T=t))
=
\sum_w P(Y\mid T=t,W=w)P(W=w).
$$

That is just ordinary probability algebra after the correct graphical condition is met.

### Front-door adjustment

The front-door formula is more delicate:
$$
P(Y\mid do(T=t))
=
\sum_m P(m\mid T=t)\sum_{t'}P(Y\mid m,T=t')P(T=t').
$$

You do not need to derive this from scratch every time.
You do need to recognize that:

- mediator structure can replace direct confounder adjustment in special graphs

### What keeps people confused

The algebra is not the main problem here.
The graph condition is.

So with causality problems, separate two tasks:

1. identify whether the graphical criterion holds
2. only then write the summation formula

## 11. What To Do When You Get Stuck

Here is a high-yield debugging checklist for exam problems.

### If the problem is about a posterior

Ask:

- can I write the numerator first?
- do I need the denominator explicitly, or only up to proportionality?

### If the problem is about marginals

Ask:

- which variables do I keep?
- which variables do I sum or integrate out?

### If the problem is about MAP

Ask:

- can I take logs?
- can I drop constants that do not depend on the variable I am optimizing over?

### If the problem is about VI

Ask:

- what is the target distribution?
- what is the approximating family?
- which KL direction is being optimized?
- where is the lower bound coming from?

### If the problem is about energy-based models or score matching

Ask:

- am I differentiating with respect to $x$ or $\theta$?
- does the partition function depend on that variable?

### If the problem is about MCMC

Ask:

- what is the stationary distribution?
- what property is proving stationarity?
- is the issue correctness, or mixing speed?

### If the problem is about causality

Ask:

- is this conditioning or intervention?
- which paths are causal, which are confounding?
- am I conditioning on something dangerous like a collider or mediator?

## Formal Anchors

These are the core mathematical statements worth being able to recognize quickly.

### Probability basics

$$
p(x\mid e)=\frac{p(x,e)}{p(e)},\qquad
p(x_A)=\sum_{x_{-A}}p(x).
$$

### Chain rule

$$
p(x_1,\dots,x_n)=\prod_{i=1}^n p(x_i\mid x_{1:i-1}).
$$

### Expectation and variance

$$
\mathbb{E}[f(X)] = \sum_x p(x)f(x),\qquad
\mathrm{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}X)^2.
$$

### Entropy and KL

$$
H(X)=-\sum_x p(x)\log p(x),\qquad
\mathrm{KL}(p\|q)=\mathbb{E}_p\log\frac{p}{q}\ge 0.
$$

### Mutual information

$$
I(X;Y)=\mathrm{KL}(p(x,y)\,\|\,p(x)p(y)).
$$

### Energy model and score

If
$$
p_\theta(x)\propto \exp(-E_\theta(x)),
$$
then
$$
\nabla_x \log p_\theta(x) = -\nabla_x E_\theta(x).
$$

### ELBO identity

$$
\log p_\theta(x)
=
\mathcal{L}(q,\theta)
+
\mathrm{KL}(q(z)\|p_\theta(z\mid x)).
$$

### Stationarity and detailed balance

$$
\pi P=\pi,\qquad
\pi(x)P(x,y)=\pi(y)P(y,x).
$$

### Backdoor adjustment

$$
P(Y\mid do(T=t))
=
\sum_w P(Y\mid T=t,W=w)P(W=w).
$$

## Worked Problems

### Problem 1

Suppose
$$
p(x_1,x_2,x_3)=p(x_1)p(x_2\mid x_1)p(x_3\mid x_2).
$$

Write the marginal $p(x_3)$.

### Solution

Sum out the variables you do not care about:
$$
p(x_3)=\sum_{x_1,x_2} p(x_1)p(x_2\mid x_1)p(x_3\mid x_2).
$$

That is the basic marginalization move underlying exact inference.

### Problem 2

Why is
$$
\arg\max_x p(x)
$$
the same as
$$
\arg\max_x \log p(x)?
$$

### Solution

Because `log` is strictly increasing.
It preserves the ordering of candidate values, so the maximizer does not change.

This is useful because logs convert products into sums and make optimization easier.

### Problem 3

Why is KL divergence always nonnegative?

### Solution

Because Jensen's inequality applied to the concave function `log` gives
$$
\mathbb{E}_p\left[\log\frac{q}{p}\right]\le \log\mathbb{E}_p\left[\frac{q}{p}\right]=\log 1=0.
$$

So
$$
\mathrm{KL}(p\|q)
=
-\mathbb{E}_p\left[\log\frac{q}{p}\right]
\ge 0.
$$

### Problem 4

For
$$
p_\theta(x)\propto \exp(-E_\theta(x)),
$$
why does the score with respect to $x$ not require the partition function?

### Solution

Because
$$
\log p_\theta(x)= -E_\theta(x)-\log Z_\theta,
$$
and $\log Z_\theta$ does not depend on $x$.
So
$$
\nabla_x \log p_\theta(x)= -\nabla_x E_\theta(x).
$$

The normalizer disappears under differentiation with respect to $x$.

### Problem 5

State the practical difference between minimizing
$$
\mathrm{KL}(q\|p)
$$
and minimizing
$$
\mathrm{KL}(p\|q).
$$

### Solution

They are different objectives and can prefer very different approximations.

In this course, a standard rough summary is:

- `KL(q||p)` tends to be more mode-seeking
- `KL(p||q)` tends to be more mass-covering

That is why VI and likelihood-based fitting can behave differently on multimodal targets.

### Problem 6

Why does detailed balance imply stationarity?

### Solution

If
$$
\pi(x)P(x,y)=\pi(y)P(y,x)
$$
for all $x,y$, then summing over $x$ gives
$$
\sum_x \pi(x)P(x,y)
=
\pi(y)\sum_x P(y,x)
=
\pi(y).
$$

That is exactly the stationarity condition.

### Problem 7

What is the key difference between covariance and precision in a Gaussian model?

### Solution

The covariance matrix $\Sigma$ measures marginal linear dependence.
The precision matrix $J=\Sigma^{-1}$ captures conditional-dependence structure in Gaussian graphical models.

So sparse precision has graphical meaning, while sparse covariance generally does not play the same role.

### Problem 8

Why is it wrong to replace
$$
P(Y\mid do(T=t))
$$
by
$$
P(Y\mid T=t)
$$
without checking the graph?

### Solution

Because conditioning and intervention are different operations.
Observational conditioning keeps the normal causes of `T` in place, while intervention cuts those incoming mechanisms.

If there is confounding, the two expressions can differ substantially.

### Problem 9

What is the Monte Carlo estimator of
$$
\mathbb{E}_p[f(X)]
$$
from IID samples $X_1,\dots,X_N\sim p$?

### Solution

It is
$$
\hat F_N=\frac{1}{N}\sum_{i=1}^N f(X_i).
$$

This is the basic bridge from sampling to approximate inference.

### Problem 10

Why does a problem about front-door or backdoor adjustment usually have two separate subproblems rather than one?

### Solution

Because you first have to verify the graph criterion, and only then can you write the algebraic adjustment formula.

Students often know the summation formula but apply it to the wrong graph.
The graphical condition is the gatekeeper.
