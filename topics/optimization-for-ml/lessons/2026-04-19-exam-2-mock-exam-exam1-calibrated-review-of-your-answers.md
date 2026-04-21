# Review of Your Answers: Exam 2 Mock Exam (Exam 1 Calibrated)

This note reviews the questions from your completed `True / False` and `Select All` sections that were either:

- wrong, or
- marked as uncertain

## Quick Summary

- `True / False`: all of your marked answers match the key.
- `Select All`: the main misses were `2.1`, `2.3`, `2.7`, `2.10`, and `2.11`.
- You also explicitly flagged uncertainty on `2.4` and `2.5`, so I included them here too.

## 2.1 SGD

### Original Question

For convex nonsmooth SGD with unbiased stochastic subgradients and bounded second moment, which of the following statements are true?

- a. In the one-step proof, one conditions on $x^t$ before taking expectation over the fresh randomness.
- b. The standard $O(1/\sqrt{k})$ theorem usually controls an averaged or best-seen objective quantity, not necessarily the last iterate.
- c. Strong convexity together with a fixed step size removes the stochastic error floor.
- d. Mini-batching can reduce variance per update while increasing the per-step cost.
- e. None of the above.

### Your Answer

You marked: `a, b`

### Correct Answer

`a, b, d`

### Explanation

- `a` is true because the standard proof conditions on the current iterate `x^t`, then averages over the fresh randomness in the stochastic gradient.
- `b` is true because the classical nonsmooth SGD / subgradient statement usually controls an averaged iterate or best-seen objective quantity, not necessarily the raw last iterate.
- `c` is false because fixed-step SGD usually leaves a nonzero error floor due to gradient noise.
- `d` is true. This is the one you missed. Mini-batching reduces variance of the gradient estimate, but the tradeoff is that each step costs more computation.
- `e` is false because some earlier options are true.

## 2.3 LP Duality

### Original Question

Consider the LP

$$
\min_x c^T x
\quad
\text{s.t. } Ax=b,\; Gx \le h.
$$

Which of the following statements are true?

- a. The dual function equals $-b^Tu-h^T\nu$ whenever

$$
A^Tu+G^T\nu+c=0,
\qquad
\nu \ge 0.
$$

- b. If $A^Tu+G^T\nu+c\neq 0$ and $\nu \ge 0$, then the dual function is $+\infty$.
- c. Any dual-feasible point gives a lower bound on the primal optimum.
- d. The dual function is the pointwise infimum of affine functions of the dual variables.
- e. Strong duality holds for every convex problem even without any constraint qualification.

### Your Answer

You marked: `a, b, c, d`

### Correct Answer

`a, c, d`

### Explanation

- `a` is true. For the LP Lagrangian, the dual function is finite exactly when the coefficient of `x` vanishes and the inequality multiplier is dual-feasible.
- `b` is false. This is the main miss. If the coefficient condition fails, the infimum over `x` is not `+\infty`; it is `-\infty`. That sign is one of the classic duality traps.
- `c` is true by weak duality: any dual-feasible point gives a lower bound on the primal optimum for a minimization problem.
- `d` is true because the dual function is defined as an infimum over `x` of affine functions of the dual variables, and pointwise infima of affine functions are concave.
- `e` is false because strong duality generally needs some extra condition such as Slater-type regularity in the convex setting.

## 2.4 KKT

### Original Question

Which of the following KKT statements are true?

- a. Complementary slackness means

$$
\lambda_i g_i(x^*)=0
$$

for each inequality constraint.
- b. If $g_i(x^*)<0$ at the optimum, then necessarily $\lambda_i=0$.
- c. For a convex differentiable problem, primal feasibility, dual feasibility, complementary slackness, and stationarity are sufficient for optimality.
- d. In nonconvex problems, KKT points need not be global optima.
- e. If $x^*$ and $(\lambda^*,\nu^*)$ are primal and dual optimal, then KKT automatically holds even without strong duality / regularity assumptions.

### Your Answer

You marked: `a, b, c, d`

You also wrote that you were not `100% sure` about `e`.

### Correct Answer

`a, b, c, d`

### Explanation

Your final selected set is correct.

The uncertain point was `e`, and your instinct there was also correct:

- `e` is false. Primal and dual optimality by themselves are not enough to force KKT in complete generality. To move from optimal primal/dual points to KKT, you need the right structure, such as strong duality plus the usual regularity assumptions in the convex setting.

This is the same theme that showed up in the real course material and Quiz 3: `KKT is not automatic just because primal and dual objects both exist`.

## 2.5 PSD / SDP

### Original Question

Which of the following PSD / SDP statements are true?

- a. The PSD cone $S_+^n$ is a convex cone.
- b. If $X \succeq 0$ and $X_{ii}=0$, then the entire $i$-th row and column must be zero.
- c. If $A \succeq 0$ and $B \succeq 0$ and $A \bullet B=0$, then the lecture fact says $AB=0$.
- d. If $X \succeq 0$ and $S \succeq 0$, then $XS$ must be symmetric PSD.
- e. In the standard SDP dual, the slack matrix satisfies

$$
S=C-\sum_i y_i A_i,
\qquad
S \succeq 0.
$$

### Your Answer

You marked: `a, b, c, e`

You also wrote that you were unsure about `d`.

### Correct Answer

`a, b, c, e`

### Explanation

Your selected set is correct.

The subtle point is `d`, which is false:

- Even if `X` and `S` are both PSD, the matrix product `XS` need not be symmetric.
- A matrix has to be symmetric to be PSD in the usual real-matrix sense.
- So the safe theorem to remember is not “product of PSD matrices is PSD.” The safe theorem is:

$$
X \succeq 0,\; S \succeq 0
\quad\Longrightarrow\quad
X \bullet S \ge 0.
$$

That inner-product fact is the one used in SDP weak duality.

## 2.7 ICA / FastICA

### Original Question

Which of the following ICA / FastICA statements are true?

- a. Whitening is expressed by

$$
E[zz^T]=I.
$$

- b. After whitening, the coordinates of $z$ are automatically independent.
- c. For whitened data,

$$
E[(w^T z)^2]=\|w\|^2.
$$

- d. In FastICA, the normalization step enforces the unit-norm constraint on $w$.
- e. PCA and ICA become the same method after whitening.

### Your Answer

You marked: `a, d`

### Correct Answer

`a, c, d`

### Explanation

- `a` is true: whitening means the covariance of `z` is the identity.
- `b` is false: whitening removes second-order correlations, but it does **not** imply independence.
- `c` is true. This is the missed one. For whitened data,

$$
E[(w^T z)^2]
=
w^T E[zz^T] w
=
w^T I w
=
\|w\|^2.
$$

- `d` is true because the normalization step is exactly how FastICA enforces the unit-norm constraint.
- `e` is false because PCA and ICA still solve different objectives even after whitening.

## 2.10 Advanced Optimizers

### Original Question

Which of the following advanced-optimizer statements are true?

- a. AdamW decouples weight decay from adaptive gradient scaling.
- b. In Shampoo, each matrix parameter is treated using only a single scalar preconditioner.
- c. SOAP can be viewed as combining Shampoo-style structure with Adam-like adaptivity in a transformed basis.
- d. AdaNGD is introduced as a pure second-order method that requires explicit Hessian inversion each step.
- e. None of the above.

### Your Answer

You marked: `a, c, d`

You also wrote that you were not sure about `d`.

### Correct Answer

`a, c`

### Explanation

- `a` is true. That is the defining AdamW idea.
- `b` is false. Shampoo uses matrix-structured preconditioners, not a single scalar.
- `c` is true. This is the intended high-level description of SOAP.
- `d` is false. This is the miss. AdaNGD is not being introduced as “explicit Hessian inversion every step.” It is motivated by normalized / adaptive online-to-offline ideas, not by a literal second-order Hessian-based Newton-style update.
- `e` is false because some statements are true.

## 2.11 Convex Optimization Problems

### Original Question

Which of the following are convex optimization problems in the standard course sense?

- a. Standard primal SDP:

$$
\min_X C \bullet X
\quad
\text{s.t. } A_i \bullet X=b_i,\; X \succeq 0
$$

- b. FastICA kurtosis maximization over $\|w\|=1$
- c. Standard LP dual:

$$
\max_{u,\nu} -b^Tu-h^T\nu
\quad
\text{s.t. } A^Tu+G^T\nu+c=0,\; \nu \ge 0
$$

- d. The KKT system of a general nonconvex problem, viewed as a feasibility problem
- e. Composite convex problem $\min_x g(x)+h(x)$ with convex smooth $g$ and convex $h$

### Your Answer

You marked: `a, b, d, e`

You also wrote that you were unsure about `d` and `e`.

### Correct Answer

`a, c, e`

### Explanation

- `a` is true. Standard primal SDP is a convex optimization problem.
- `b` is false. FastICA kurtosis maximization over the sphere is not a convex optimization problem.
- `c` is true. This was the main miss. A linear objective with affine equality constraints and nonnegativity constraints is convex. It is completely standard for a maximization problem to still be convex in the course sense when it is equivalent to maximizing a concave objective over a convex feasible set.
- `d` is false. A general nonconvex KKT system viewed as feasibility conditions is not automatically a convex optimization problem.
- `e` is true because the objective is a sum of convex functions, with the usual composite structure.

## Pattern Summary

Most of your misses came from a few recurring traps:

- `sign trap`: in duality, when the coefficient condition fails, the dual function goes to `-\infty`, not `+\infty`
- `missed true statement`: in select-all, one correct option was sometimes left unselected even though the surrounding reasoning was solid
- `convex vs not convex`: the LP dual is still convex, but FastICA and general nonconvex KKT systems are not
- `safe PSD fact`: remember `A \bullet B \ge 0`, not “the product of PSD matrices is PSD”

## Recommended Next Step

If you want, I can next make a second short drill with just `8-10` questions targeted at these exact traps:

- LP dual sign / finiteness
- SDP product vs inner product
- ICA whitening implications
- convexity classification of optimization problems
