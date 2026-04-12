# Quiz 4 Study Guide: SDP, Newton, ICA, and Adaptive / Momentum Methods

Scope based on lecture materials:

- `materials/processed/optimization-for-ml/March24_SDP.md`
- `materials/processed/optimization-for-ml/March26_Newton_method.md`
- `materials/processed/optimization-for-ml/March31_April2_ICA.md`
- `materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md`
- `materials/processed/optimization-for-ml/April7_EXTRA_AcceleratedGD_Theory.md`

Calibration based on prior quizzes:

- `materials/processed/optimization-for-ml/Quiz1_graded_submission.md`
- `materials/processed/optimization-for-ml/Quiz2_graded_submission.md`
- `materials/processed/optimization-for-ml/Quiz3_graded_submission.md`

## Expected quiz style

The old quizzes strongly suggest the upcoming quiz will be:

- short: likely `10-20 minutes`
- compact: answers usually fit in `2-5 lines`
- exact: you need the `right quantity`, not just the rate
- mixed-format: algorithm steps, theorem recall, T/F, one-step derivations, and “state the update / rate / condition” questions

The biggest pattern from earlier quizzes is that precision matters more than prose. You lose points for:

- writing only a rate and not the quantity converging
- mixing up assumptions like `convex` vs `strongly convex`
- giving a vague definition instead of the actual formula
- knowing the idea but not the exact update rule

## High-probability topics

If I had to prioritize for quiz probability, I would rank them:

1. `Newton method basics + convergence`
2. `Semidefinite programming basics + PSD facts + SDP duality`
3. `FastICA as an application of Newton + Lagrange multipliers`
4. `Momentum vs NAG`
5. `AdaGrad / RMSProp / AdaDelta / Adam updates and intuition`
6. `Accelerated convergence rates for NAG`
7. `Newton fractals / failure modes of Newton`

The quiz is likely to be more conceptual-and-formulaic than proof-heavy. I would expect a small proof fragment at most, not a full long theorem proof.

## Part 0: Semidefinite programming

This is very quiz-compatible material: lots of short definitions, clean true/false statements, and one-step derivations.

## What you need cold

### PSD cone

$$
S^n := \{X \in \mathbb{R}^{n \times n} : X = X^T\},
\qquad
S_+^n := \{X \in S^n : X \succeq 0\}.
$$

Interpretation:

- $X \succeq 0$ means $v^T X v \ge 0$ for all $v \in \mathbb{R}^n$
- equivalently, a symmetric matrix has nonnegative eigenvalues

### Basic PSD facts

You should know these exactly:

- `S_+^n` is a `closed convex cone`
- if $X \succeq 0$, then $X_{ii} \ge 0$ for all $i$
- if $X \succeq 0$ and $X_{ii}=0$, then the entire $i$-th row and column are zero
- if

$$
X = \begin{pmatrix} A & B \\ B^T & C \end{pmatrix},
$$

then under the lecture's assumptions,

$$
X \succeq 0
\iff
A \succeq 0
\text{ and }
C - B^T A^{-1} B \succeq 0
$$

This is the `Schur complement` fact.

### Matrix inner product

For symmetric matrices,

$$
A \bullet B := \operatorname{Tr}(A^T B) = \sum_{i,j} a_{ij} b_{ij}.
$$

Important theorem:

if $A \succeq 0$ and $B \succeq 0$, then

$$
A \bullet B \ge 0.
$$

Also from the lecture:

$$
A \bullet B = 0 \iff AB = 0
\quad \text{for } A,B \succeq 0.
$$

### Definition of an SDP

You should be able to state this cleanly:

$$
\min_X C \bullet X
\quad \text{s.t.} \quad
A_i \bullet X = b_i,\; i=1,\dots,m,
\quad X \succeq 0,
$$

with $C, A_i, X \in S^n$.

The key sentence:

`An SDP looks like an LP, except the variable is a symmetric matrix constrained to lie in the PSD cone.`

### Equivalent LMI form

The lecture also gives the linear-matrix-inequality form:

$$
\min_x c^T x
\quad \text{s.t.} \quad
F_0 + x_1 F_1 + \cdots + x_m F_m \succeq 0,
$$

where $F_0,\dots,F_m \in S^n$.

This is worth knowing because many short conceptual questions about SDP convexity are easiest in this form.

## Why SDP is convex

Two pieces:

- the objective is linear
- the feasible set is convex because the PSD cone is convex and

$$
F(\lambda x + (1-\lambda)y)
= \lambda F(x) + (1-\lambda)F(y)
$$

stays PSD whenever both $F(x)$ and $F(y)$ are PSD.

So if they ask “why is SDP convex?”, the shortest correct answer is:

`the objective is linear and the PSD cone is convex, so linear matrix inequality constraints define a convex feasible set.`

## LP as a special case of SDP

The lecture explicitly states:

`Any LP is a special case of an SDP.`

You do not need a full construction unless asked, but you should remember the relationship:

- LP uses vector nonnegativity
- SDP replaces this with matrix positive semidefiniteness
- this strictly generalizes LP

## SDP duality

This is the main missing piece and it is quiz-worthy.

### Primal-dual pair

Primal SDP:

$$
\min_X C \bullet X
\quad \text{s.t.} \quad
A_i \bullet X = b_i,\; i=1,\dots,m,
\quad X \succeq 0
$$

Dual SDP:

$$
\max_{y,S} y^T b
\quad \text{s.t.} \quad
S = C - \sum_{i=1}^m y_i A_i,
\quad S \succeq 0.
$$

Variables:

- $y \in \mathbb{R}^m$
- $S \in S^n$

This is the direct analogue of LP duality, with the nonnegative slack vector replaced by a PSD slack matrix.

### Weak duality

If $X$ is primal-feasible and $(y,S)$ is dual-feasible, then

$$
C \bullet X - y^T b \ge 0.
$$

The derivation is the SDP analogue of the LP duality-gap proof:

$$
C \bullet X - y^T b
= C \bullet X - \sum_{i=1}^m y_i (A_i \bullet X)
= \left(C - \sum_{i=1}^m y_i A_i\right)\bullet X
= S \bullet X
\ge 0,
$$

because $S \succeq 0$ and $X \succeq 0$ imply $S \bullet X \ge 0$.

This is a very high-yield derivation to know.

### Zero duality gap

If feasible primal and dual points satisfy

$$
C \bullet X - y^T b = 0,
$$

then the lecture says:

- $X$ is primal optimal
- $(y,S)$ is dual optimal
- and

$$
S \bullet X = 0.
$$

Using the PSD theorem from earlier, this also implies

$$
SX = 0.
$$

This is the SDP version of complementary-slackness-style structure.

### Strong duality

The lecture's strong-duality theorem uses strict feasibility on both sides:

- there exists `strictly primal feasible` $X \succ 0$
- there exists `strictly dual feasible` $(y,S)$ with $S \succ 0$

Then:

- primal and dual optimal values are equal
- the optimum is attained on both sides

So the short statement is:

`strict feasibility of both the primal and the dual implies strong duality and attainment.`

### Important caveat: optimum may not be attained

The lecture is explicit that unlike the finite-dimensional intuition many people carry from LP, an SDP can have a finite infimum that is not achieved.

So you should remember:

- `finite infimum` does not automatically mean `minimum attained`
- there can also be `positive duality gaps` in pathological examples

That is exactly the kind of conceptual T/F an instructor may ask.

## What the instructor may ask

- Define a PSD matrix.
- Why is the PSD set convex / a cone?
- State one basic property of PSD matrices.
- Define the inner product between symmetric matrices.
- State the standard primal SDP form.
- State the SDP dual.
- State weak duality for SDP.
- What does zero duality gap imply?
- What assumptions give strong duality in the lecture?
- What is the Schur complement condition?
- Why are SDPs convex?
- Give one way SDP generalizes LP.

## Likely conceptual traps

- forgetting symmetry in the PSD definition
- saying “all entries nonnegative” instead of “$v^T X v \ge 0$ for all $v$”
- confusing elementwise positivity with PSD
- forgetting that SDP variables are matrices, not vectors
- forgetting that the objective is linear in $X$ via the matrix inner product
- forgetting the dual slack matrix $S = C - \sum_i y_i A_i$
- confusing `zero duality gap` with automatic attainment in all cases

## SDP duality: what to know

The lecture compares LP duality and SDP duality directly. I would expect either a “state the dual” question or a one-line weak-duality derivation.

If you need one sentence:

`LP duality uses vector nonnegativity; SDP duality replaces that with positive semidefiniteness of symmetric matrix slack variables, and the duality gap becomes S • X.`

## Part I: Newton's method

## What you need cold

### Root-finding form

For scalar root finding, Newton's method is

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}.
$$

For multivariate root finding,

$$
x_{k+1} = x_k - [\nabla F(x_k)]^{-1}F(x_k).
$$

### Minimization form

For minimizing differentiable $f:\mathbb{R}^n \to \mathbb{R}$, Newton step solves

$$
\nabla f(x_k) + \nabla^2 f(x_k)\Delta x = 0,
$$

so

$$
\Delta x = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad
x_{k+1}=x_k+\Delta x.
$$

### Quadratic-approximation interpretation

Newton's step is the minimizer of the second-order Taylor approximation around $x_k$:

$$
f(x) \approx f(x_k) + \nabla f(x_k)^T(x-x_k) + \frac12 (x-x_k)^T \nabla^2 f(x_k)(x-x_k).
$$

This is the cleanest explanation of why Newton can take much larger, curvature-aware steps than GD.

## What the instructor may ask

- State the Newton update for minimization.
- State the Newton system.
- Why is the Newton step a descent direction?
- What assumptions give quadratic convergence?
- Give one failure mode of Newton's method.
- What is damped Newton / why use backtracking?

## Core facts to memorize

### Descent direction fact

If $\nabla^2 f(x_k) \succ 0$, then the Newton step is a descent direction because

$$
\nabla f(x_k)^T \Delta x
= - \nabla f(x_k)^T [\nabla^2 f(x_k)]^{-1}\nabla f(x_k) < 0.
$$

### Local quadratic convergence

The lecture's main message is:

- Newton has `local`, not global, quadratic convergence.
- You need to start sufficiently close to a local minimum.
- Hessian needs to be invertible / positive definite locally.
- Second derivative / Hessian regularity matters.

The lecture theorem is essentially:

- if $f$ has Lipschitz Hessian,
- and $x^*$ is a local minimum with local strong convexity,
- and $x_0$ is close enough,

then

$$
\|x_{k+1}-x^*\| \le C \|x_k-x^*\|^2.
$$

That is the quadratic rate.

### Failure modes

You should be able to name at least three:

- divergence
- cycling / loops
- chaotic dependence on initialization
- only linear convergence when derivative degenerates at the root
- Hessian singularity / non-invertibility

### Damped Newton

To avoid divergence, use

$$
x_{k+1}=x_k-h_k[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad 0<h_k\le 1,
$$

with backtracking line search. Early on you may need `h_k < 1`; near the solution you often recover the full Newton step `h_k = 1`.

## Newton fractals: what to know

I would not over-invest here unless your instructor likes visual/conceptual questions.

Know the headline:

- Newton's method on complex polynomials partitions initializations into `basins of attraction`
- boundary structure can be fractal
- some initial points can fail to converge or get attracted to cycles

That is enough for a short conceptual question.

## Part II: ICA and FastICA

This is probably the newest-feeling topic in the set, so it is worth slowing down.

The quiz may still only ask short questions, but if you understand the story, the formulas are much easier to remember.

## The big picture

ICA assumes observed mixtures

$$
x(t) = As(t)
$$

and wants to recover the independent latent sources $s(t)$ from observed mixtures $x(t)$.

The standard mental picture is the `cocktail party problem`:

- several source signals are playing at once
- your microphones record mixtures of them
- you want to separate the original signals from only the mixed recordings

So:

- `sources` are the hidden clean signals
- `mixtures` are what you observe
- `mixing matrix A` tells you how the hidden signals got combined

The goal of ICA is to estimate a matrix $W$ so that

$$
y(t)=Wx(t)
$$

looks like the original independent sources.

## Dimensions and notation

This is worth making explicit, because the lecture switches quickly into formulas.

For the FastICA part of the lecture:

- $z$ is one `whitened data vector`
- $w$ is one `direction vector` we are optimizing over
- $y$ is the `scalar projection` of $z$ onto $w$

So the dimensions are

$$
z \in \mathbb{R}^d,
\qquad
w \in \mathbb{R}^d,
\qquad
y = w^T z \in \mathbb{R}.
$$

Interpretation:

- `z` = one observed sample after whitening
- `w` = one candidate component direction
- `y` = the one-dimensional signal obtained by projecting onto that direction

If you have many samples, then each sample is a vector

$$
z^{(1)}, z^{(2)}, \dots, z^{(N)} \in \mathbb{R}^d,
$$

and the corresponding projected scalars are

$$
y^{(i)} = w^T z^{(i)}.
$$

So when the lecture writes expectations like

$$
E[(w^T z)^3 z],
$$

the expectation is over the distribution of whitened data vectors $z$ or over the empirical dataset.

## Why PCA is not enough

PCA and ICA are both linear transformations, but they solve different problems.

PCA:

- finds orthogonal directions of large variance
- removes correlation
- is often used for compression

ICA:

- tries to recover statistically independent sources
- removes more than just correlation
- is not mainly about compression

The easiest way to remember the difference is:

`PCA makes coordinates uncorrelated. ICA tries to make them independent.`

That is stronger.

Why this matters:

- two random variables can be uncorrelated but still dependent
- so PCA is often not enough to actually separate sources

The lecture also emphasizes:

- PCA vectors are orthogonal
- ICA vectors generally are not orthogonal

## Whitening, slowly

Whitening is one of the most important concepts here.

### What whitening is trying to do

Suppose your observed data cloud is stretched more in some directions than others. Whitening rescales and rotates it so that the covariance becomes the identity:

$$
E[z z^T] = I.
$$

So after whitening:

- every direction has unit variance
- coordinates are uncorrelated
- the data cloud is “spherical” in covariance terms

### Why whitening helps ICA

Without whitening, ICA has to solve for a fully general invertible matrix.

After whitening, a big part of the job is already done. The lecture's key point is:

`after whitening, it is enough to search over orthogonal matrices.`

That is why the lecture says whitening “solves half of the ICA problem.”

In quiz language, if asked “why do we whiten?”, the best short answer is:

`Whitening makes the covariance identity, so the remaining separation problem reduces to finding an orthogonal transform rather than a completely general invertible one.`

## What is kurtosis?

This is the other new concept that deserves a slower explanation.

Kurtosis is a scalar statistic that measures how far a distribution is from Gaussian / normal behavior, especially in terms of tail-heaviness and peakedness.

The lecture uses

$$
\kappa_4(y) = E[y^4] - 3
$$

for a standardized variable.

Key memory points:

- Gaussian distributions have kurtosis `0` in this convention
- non-Gaussian signals often have nonzero kurtosis
- ICA wants non-Gaussianity because mixtures tend to look “more Gaussian” than the independent components

So the intuition is:

`If I search for a direction whose projected signal looks especially non-Gaussian, I may be isolating one independent source.`

That is why kurtosis appears in FastICA.

You do not need a deep statistics interpretation for the quiz. You mostly need:

- kurtosis measures departure from Gaussianity
- FastICA maximizes it (in the lecture's version)

## FastICA setup

After whitening, we search for one component at a time.

Let

$$
y = w^T z
$$

where:

- $z$ is the whitened data
- $w$ is the direction we are trying to find
- $y$ is the one-dimensional projection in that direction

We constrain

$$
\|w\| = 1
$$

because otherwise we could scale $w$ arbitrarily and make the optimization meaningless.

The lecture's objective is:

$$
f(w) = \kappa_4(y) = E[y^4] - 3.
$$

So the constrained problem is

$$
\max_w f(w)
\quad \text{s.t.} \quad
\|w\|^2 - 1 = 0.
$$

If you want one sentence:

`FastICA looks for a unit vector w such that the projection w^T z is as non-Gaussian as possible.`

## Where the Lagrange multiplier comes from

Because we have a constraint $\|w\|=1$, this is a constrained optimization problem.

So we use a Lagrange multiplier.

Define the constraint

$$
h(w)=\|w\|^2-1.
$$

At an optimum, the lecture gives the stationarity condition

$$
f'(w) + \lambda h'(w) = 0.
$$

For this specific objective, that becomes

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

This is the main “KKT-style” equation you should know from the ICA lecture.

## Why Newton shows up

At this point, we have turned ICA into a nonlinear equation-solving problem:

$$
F(w) = 4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

The lecture then says: solve this using Newton-Raphson.

So the connection to the previous Newton lecture is:

- derive the stationarity equation
- treat it like a root-finding problem
- use Newton's method to solve for $w$

## FastICA Newton step

The lecture simplifies the Jacobian using two facts:

- the data is whitened
- $\|w\|=1$

This gives the approximation

$$
F'(w) \approx 12I + 2\lambda I.
$$

The update then simplifies into the famous fixed-point form:

$$
\tilde w^{(k+1)} = E[(w^{(k)T}z)^3 z] - 3 w^{(k)}.
$$

Then normalize:

$$
w^{(k+1)} = \frac{\tilde w^{(k+1)}}{\|\tilde w^{(k+1)}\|}.
$$

That normalization step is there because we must keep $\|w\|=1$.

## What the algorithm is doing conceptually

Here is the slow intuitive version:

1. Start with whitened data.
2. Pick a direction $w$.
3. Project the data onto that direction: $y = w^T z$.
4. Ask: does this projection look strongly non-Gaussian?
5. If not, update $w$ using the Newton-derived fixed-point rule.
6. Renormalize $w$.
7. Repeat until the direction stabilizes.

For later components, add orthogonality constraints against the previously found components.

## Likely ICA quiz questions

- What is the ICA model?
- What is the difference between PCA and ICA?
- What does whitening do?
- Why does whitening simplify ICA?
- What is kurtosis measuring in this lecture?
- What constraint is imposed on $w$ in FastICA?
- What objective is optimized in the lecture's FastICA derivation?
- Write the Lagrangian first-order condition.
- Write the FastICA fixed-point update.

## Minimal answers to memorize

If you are rushed, memorize these exact short responses:

`What is whitening?`
Transform the data so its covariance becomes the identity.

`Why whiten?`
It reduces ICA to searching over orthogonal transformations.

`What is kurtosis here?`
It measures non-Gaussianity; FastICA maximizes it to find independent components.

`Why the norm constraint on w?`
Without it, scaling w changes the objective artificially and the problem is not well-posed.

`What is the FastICA update?`

$$
\tilde w \leftarrow E[(w^Tz)^3 z] - 3w,
\qquad
w \leftarrow \tilde w / \|\tilde w\|
$$

## FastICA: what you should memorize

For quiz purposes, do not try to memorize every line of the derivation. Memorize the following layers.

### Layer 1: the story

You should be able to say:

- ICA tries to recover independent sources from linear mixtures.
- PCA removes correlation; ICA aims for independence.
- Whitening makes covariance identity and simplifies the remaining search.
- FastICA looks for a direction whose projection is highly non-Gaussian.

### Layer 2: notation

Know this exactly:

$$
z \in \mathbb{R}^d,
\qquad
w \in \mathbb{R}^d,
\qquad
y = w^T z \in \mathbb{R}.
$$

Interpretation:

- `z` = one whitened sample
- `w` = one direction vector
- `y` = scalar projection of the sample onto that direction

### Layer 3: the optimization problem

Know the constrained problem:

$$
y = w^T z,
\qquad
\|w\| = 1
$$

$$
f(w) = \kappa_4(y) = E[y^4] - 3
$$

$$
\max_w f(w)
\quad \text{s.t.} \quad
\|w\|^2 - 1 = 0.
$$

The only kurtosis fact you really need is:

`kurtosis is being used here as a measure of non-Gaussianity.`

### Layer 4: the stationarity condition

This is the highest-yield formula after the final update:

$$
f'(w) + \lambda h'(w) = 0
\quad \Rightarrow \quad
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

### Layer 5: the final FastICA update

This is the one formula you should know verbatim:

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w / \|\tilde w\|.
$$

### Layer 6: why Newton appears

Memorize this sentence:

`After writing the constrained first-order condition as a nonlinear equation in w, the lecture solves it with Newton-Raphson, which simplifies into the FastICA fixed-point iteration.`

## FastICA memorization block

If you only want the bare minimum to rehearse quickly, memorize this block:

1. `z \in \mathbb{R}^d`, `w \in \mathbb{R}^d`, `y = w^T z \in \mathbb{R}`
2. whitening makes covariance identity and reduces the search space
3. PCA removes correlation; ICA seeks independence
4. objective:

$$
\max_{\|w\|=1} E[(w^T z)^4] - 3
$$

5. stationarity:

$$
4E[(w^T z)^3 z] + 2\lambda w = 0
$$

6. update:

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w/\|\tilde w\|
$$

## What not to confuse

- `uncorrelated` is weaker than `independent`
- PCA solves correlation structure, not full independence
- after whitening, the remaining search is over orthogonal transforms
- the normalization step in FastICA matters because of the unit-norm constraint

## Part III: Momentum and Nesterov

## Polyak / Heavy-ball momentum

The lecture gives

$$
v_t = \gamma v_{t-1} + \eta \nabla F(\theta_t),
$$

$$
\theta_{t+1} = \theta_t - v_t.
$$

Equivalent form:

$$
\theta_{t+1}
= \theta_t - \eta \nabla F(\theta_t) + \gamma(\theta_t - \theta_{t-1}).
$$

Interpretation:

- if the new gradient agrees with the previous step direction, push farther
- if not, the momentum term damps oscillation

## Nesterov accelerated gradient

Core difference: evaluate the gradient at a `look-ahead point`.

Momentum:

$$
\theta_{t+1}
= \theta_t - \eta \nabla F(\theta_t) + \gamma(\theta_t-\theta_{t-1})
$$

NAG:

$$
\theta_{t+1}
= \theta_t - \eta \nabla F(\theta_t + \gamma(\theta_t-\theta_{t-1}))
  + \gamma(\theta_t-\theta_{t-1}).
$$

If they ask “what is the difference between Polyak momentum and NAG?”, that is the answer.

## Convergence rates you should know exactly

For convex, $\beta$-smooth:

$$
f(x_k)-f(x^*) = O\!\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right).
$$

For $\alpha$-strongly convex and $\beta$-smooth:

$$
f(x_k)-f(x^*) = O\!\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

And standard GD in the strongly convex smooth case is slower:

$$
O\!\left(\left(1-\frac{\alpha}{\beta}\right)^k\right).
$$

That comparison is quiz-worthy.

## Accelerated-theory extra note

From the extra theory lecture, the important items are:

- look-ahead point $y_t = \theta_t + \gamma_t(\theta_t-\theta_{t-1})$
- step size $\eta = 1/L$
- sequence

$$
\tau_{t+1} = \frac{1+\sqrt{1+4\tau_t^2}}{2},
\qquad
\gamma_t = \frac{\tau_t-1}{\tau_{t+1}}
$$

- resulting rate

$$
F(\theta_t)-F^* \le \frac{4L\|\theta_0-\theta^*\|^2}{(t+2)^2}.
$$

I would memorize the `O(1/t^2)` result and the smooth-convex assumptions. I would only memorize the $\tau_t,\gamma_t$ recursion if you have reason to think the instructor likes exact theorem statements.

## Part IV: Adaptive methods

This is almost guaranteed to be tested as short “write the update / explain the intuition / compare methods.”

## AdaGrad

Motivation:

- use a different effective step size per coordinate
- shrink steps in coordinates that have seen large gradients

Diagonal accumulation:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2}.
$$

Update:

$$
\theta_{t+1,i} = \theta_{t,i} - \eta \frac{g_{t,i}}{h_{t+1,i}}.
$$

What to say if asked for intuition:

- coordinates with large historical gradients get smaller future steps
- coordinates with small historical gradients get relatively larger steps

Main weakness:

- accumulated squared gradients only grow
- step sizes can become too small

## RMSProp

Fixes AdaGrad's monotonically shrinking denominator by replacing the full sum with a decaying average:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma) g_{t,i}^2,
$$

$$
RMS[g]_{t,i} = \sqrt{h_{t,i} + \epsilon},
$$

$$
\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{RMS[g]_{t,i}} g_{t,i}.
$$

## AdaDelta

Main lecture point:

- RMSProp update has a units / dimensions issue
- AdaDelta fixes this by scaling with a running RMS of previous parameter updates

Update shown in lecture:

$$
\theta_{t+1,i}
= \theta_{t,i}
- \eta \frac{RMS[\Delta \theta]_{t-1,i}}{RMS[g]_{t,i}} g_{t,i}.
$$

This is less likely to be asked in full detail than AdaGrad or Adam, but you should know the motivation.

## Adam

This one you need exactly.

First moment:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t
$$

Second moment:

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2
$$

Bias correction:

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

Update:

$$
\theta_{t+1}
= \theta_t - \frac{\eta}{\sqrt{\hat v_t} + \epsilon} \hat m_t
$$

Interpretation:

- `Adam = momentum + RMSProp`

Important caveat from lecture:

- Adam is the default in many DL frameworks
- but it does `not` necessarily converge without modifications, even on simple convex problems

That caveat is very quiz-able as a T/F or short conceptual question.

## Part V: likely quiz question bank

These are the questions I would actively rehearse.

### Very likely

1. Define an SDP.
2. Define a PSD matrix.
3. State the SDP dual.
4. State weak duality for SDP.
5. State one basic property of PSD matrices.
6. State the Schur complement condition from lecture.
7. State Newton's update for minimization.
8. Why is the Newton step a descent direction when the Hessian is positive definite?
9. State one assumption under which Newton has quadratic convergence.
10. Give one failure mode of Newton's method.
11. What does whitening do in ICA?
12. What is the difference between PCA and ICA?
13. Write the FastICA objective and constraint.
14. Write the FastICA fixed-point update.
15. Write Polyak momentum.
16. Write NAG and explain how it differs from Polyak momentum.
17. State the convex-case convergence rate of NAG.
18. State the strongly-convex-case convergence rate of NAG.
19. Write the AdaGrad update.
20. Why can AdaGrad become too conservative?
21. Write the Adam update including bias correction.

### Plausible T/F

- The set of PSD matrices is a convex cone. `True`
- If all entries of a symmetric matrix are nonnegative, then it is PSD. `False`
- If $X \succeq 0$, then all diagonal entries are nonnegative. `True`
- An SDP has a linear objective in a matrix variable plus PSD constraints. `True`
- If the SDP duality gap is zero, the optimum is always attained. `False`
- If $X \succeq 0$ and $S \succeq 0$, then $S \bullet X \ge 0$. `True`
- Strict primal and strict dual feasibility imply strong duality in the lecture. `True`
- Newton is globally convergent. `False`
- Newton's method uses a quadratic local model. `True`
- Whitening alone solves ICA. `False`
- PCA removes all statistical dependence. `False`
- NAG differs from momentum by evaluating the gradient at a look-ahead point. `True`
- AdaGrad uses a single scalar learning rate shared across coordinates in its effective update. `False`
- Adam combines momentum and RMSProp-like second-moment scaling. `True`
- Adam is always convergent on convex problems. `False`

## Part VI: your personal risk areas from prior quizzes

Based on your old quiz performance, I would be careful about:

- writing just the `rate` but not the `quantity`
- giving an intuition instead of the exact theorem/formula
- partial algorithm recall where one line is missing
- mixing up assumptions, especially `convex` vs `strongly convex`, or “works in practice” vs “has theorem guarantee”

So on this quiz, if asked for a rate, write it in the form:

$$
\text{quantity} \le \text{explicit function of } k,\alpha,\beta,L,\text{etc.}
$$

not just “quadratic”, “linear”, or “$O(1/k^2)$”.

## Part VII: fastest high-yield review plan

If you have `90 minutes`, do this:

1. `20 min`: SDP
- memorize PSD definition, convex-cone fact, inner product, primal/dual SDP forms, weak duality, Schur complement

2. `20 min`: Newton
- memorize update, descent fact, local quadratic convergence assumptions, damped Newton, failure modes

3. `15 min`: ICA / FastICA
- whitening, PCA vs ICA, Lagrange condition, fixed-point update

4. `15 min`: Momentum / NAG
- Polyak update, NAG update, rate comparison against GD

5. `15 min`: AdaGrad / RMSProp / AdaDelta / Adam
- write each update once from memory
- emphasize AdaGrad weakness and Adam bias correction

6. `5 min`: rapid oral recall
- say all key rates and update rules without notes

## Part VIII: one-page memorization sheet

If you only memorize one block, memorize this:

### SDP

$$
X \succeq 0 \iff v^T X v \ge 0 \;\; \forall v
$$

$$
\min_X C \bullet X
\quad \text{s.t.} \quad
A_i \bullet X = b_i,\;
X \succeq 0
$$

Dual:

$$
\max_{y,S} y^T b
\quad \text{s.t.} \quad
S = C - \sum_i y_i A_i,\;
S \succeq 0
$$

$$
A \bullet B = \operatorname{Tr}(A^T B)
$$

Weak duality:

$$
C \bullet X - y^T b = S \bullet X \ge 0
$$

Schur complement:

$$
\begin{pmatrix}A & B \\ B^T & C\end{pmatrix} \succeq 0
\iff
A \succeq 0,\;
C - B^T A^{-1} B \succeq 0
$$

### Newton

$$
x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
$$

Local quadratic convergence, not global. If Hessian $\succ 0$, Newton step is a descent direction.

### FastICA

$$
\max_{\|w\|=1} \; E[(w^T z)^4] - 3
$$

Stationarity:

$$
4E[(w^T z)^3 z] + 2\lambda w = 0
$$

Fixed-point update:

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w / \|\tilde w\|
$$

### Momentum

$$
x_{t+1} = x_t - \eta \nabla f(x_t) + \gamma(x_t-x_{t-1})
$$

### NAG

$$
x_{t+1} = x_t - \eta \nabla f(x_t + \gamma(x_t-x_{t-1})) + \gamma(x_t-x_{t-1})
$$

### NAG rates

Convex smooth:

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right)
$$

Strongly convex smooth:

$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right)
$$

### AdaGrad

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t+1,i}}
$$

### RMSProp

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma) g_{t,i}^2
$$

### Adam

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t,
\qquad
v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2
$$

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

$$
x_{t+1} = x_t - \frac{\eta}{\sqrt{\hat v_t}+\epsilon}\hat m_t
$$

## Bottom line

Prepare for a quiz that rewards `exact formulas + short explanations`, not broad intuition alone.

If you can do these five things cleanly, you are probably in good shape:

1. define PSD, SDP, and the Schur complement fact cleanly
2. state the SDP dual and the weak-duality gap identity cleanly
3. write Newton, Polyak, NAG, AdaGrad, and Adam from memory
4. state both NAG rates exactly
5. explain whitening and PCA-vs-ICA in two sentences each, and derive or recognize the FastICA update
