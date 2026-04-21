# 7. ICA and FastICA

## Table of Contents

- [[#7.0 Where This Topic Came From in the Course]]
- [[#7.1 What ICA Is Trying to Do]]
- [[#7.2 Whitening]]
- [[#7.3 ICA vs PCA]]
- [[#7.4 The Optimization Problem]]
- [[#7.5 Lagrangian and Stationarity]]
    - [[#7.5.1 Why the derivative looks like 4E[(wT z)^3 z]]]
- [[#7.6 From Stationarity to the FastICA Update]]
- [[#7.7 Why the Normalization Step Appears]]
    - [[#7.7.1 Multiple components, orthogonality, and symmetric decorrelation]]
- [[#7.8 Why This Topic Belongs in an Optimization Course]]
- [[#7.9 Common Traps]]

## 7.0 Where This Topic Came From in the Course

ICA appeared across:

- `March 31`: Newton + Lagrange multiplier application: FastICA
- `April 2`: ICA continuation

So this topic was meant as an application of ideas you had just learned:

- constrained optimization
- Lagrange multipliers
- Newton/fixed-point style updates

That is why it shows up after Newton rather than earlier in the semester.

## 7.1 What ICA Is Trying to Do

Independent component analysis starts from the idea that observed data may be mixtures of latent statistically independent sources.

The goal is not just to remove correlation. The goal is to recover directions in which the projected signal behaves like an independent source.

So ICA is a stronger objective than PCA:

- PCA: remove second-order correlation / maximize variance
- ICA: exploit higher-order structure to seek independence

That is why non-Gaussianity matters in ICA.

## 7.2 Whitening

The lecture assumes the data have already been whitened.

If `$z$` is the whitened random vector, then

$$
E[zz^T]=I.
$$

This is the key normalization step before the FastICA derivation.

Why whitening helps:

- it removes second-order correlations first
- after whitening, the remaining structure is in higher-order moments
- then ICA can focus on non-Gaussianity rather than covariance

One notation trap:

$$
E[zz^T]=I
$$

is correct, but

$$
E[z^T z]=I
$$

is not. The first is a matrix covariance statement; the second is a scalar.

## 7.3 ICA vs PCA

This distinction is easy to say vaguely and easy to lose points on.

The short precise comparison is:

- PCA finds orthogonal directions of maximum variance and decorrelates the data
- ICA tries to identify statistically independent components, usually through higher-order moment structure

So PCA only uses second-order information, while ICA uses higher-order information.

That is exactly why kurtosis enters the FastICA lecture.

## 7.4 The Optimization Problem

After whitening, the extracted scalar component is

$$
y=w^T z,
\qquad
z,w \in \mathbb{R}^n.
$$

The lecture uses kurtosis as the non-Gaussianity objective:

$$
\max_{\|w\|=1} E[(w^T z)^4]-3.
$$

Why subtract `$3$`?

Because for a standardized Gaussian variable, kurtosis equals `3`, so the expression

$$
E[(w^T z)^4]-3
$$

measures deviation from Gaussian behavior.

The unit-norm constraint

$$
\|w\|=1
$$

prevents trivial scaling. Without it, you could change the objective simply by scaling `$w$`.

## 7.5 Lagrangian and Stationarity

Introduce a Lagrange multiplier `$\lambda$` for the unit-norm constraint.

The Lagrangian has the form

$$
\mathcal{L}(w,\lambda)
=
E[(w^T z)^4]-3 + \lambda(\|w\|^2-1),
$$

up to an equivalent sign convention on `$\lambda$`.

Different notes may absorb constants into the multiplier, but the stationarity condition from lecture is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

This is the first-order condition with respect to `$w$`.

The main point is:

- the derivative of the kurtosis term gives `$E[(w^T z)^3 z]$`
- the derivative of the norm constraint gives a term proportional to `$w$`

So stationarity says the nonlinear moment term must align with `$w$`.

### 7.5.1 Why the derivative looks like $4E[(w^T z)^3 z]$

This derivative is easy to quote and easy to forget how it is obtained.

Let

$$
\phi(w) = (w^T z)^4.
$$

Treat `$z$` as fixed for the moment and differentiate with respect to `$w$`.

By the chain rule:

$$
\nabla_w (w^T z)^4
=
4(w^T z)^3 \nabla_w (w^T z).
$$

And

$$
\nabla_w (w^T z)=z.
$$

So

$$
\nabla_w (w^T z)^4 = 4(w^T z)^3 z.
$$

Now take expectation:

$$
\nabla_w E[(w^T z)^4] = 4E[(w^T z)^3 z].
$$

That is where the first term in the stationarity condition comes from.

## 7.6 From Stationarity to the FastICA Update

The stationarity condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

Rearrange:

$$
E[(w^T z)^3 z] = c\, w
$$

for some scalar `$c$` related to the multiplier.

This says that at a stationary point, the vector

$$
E[(w^T z)^3 z]
$$

must point in the same direction as `$w$`.

The FastICA fixed-point iteration uses that structure and, in the whitened setting, becomes

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w/\|\tilde w\|.
$$

The `$-3w$` correction appears because whitening and the kurtosis structure simplify the Newton/fixed-point form into this particular update.

So the algorithm is not magic. It is a direct algorithmic reinterpretation of the stationarity condition.

## 7.7 Why the Normalization Step Appears

After computing

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
$$

the method sets

$$
w \leftarrow \tilde w/\|\tilde w\|.
$$

This is there because the optimization problem itself has the constraint

$$
\|w\|=1.
$$

So the normalization step simply projects the iterate back onto the unit sphere.

This is conceptually the same pattern you already saw in:

- projected methods
- KKT-constrained problems
- proximal methods with indicator constraints

Take an unconstrained-looking update, then enforce the constraint structure explicitly.

### 7.7.1 Multiple components, orthogonality, and symmetric decorrelation

The single-vector FastICA derivation explains how to find one component direction $w$.

But for multiple components, there is one more constraint hiding in the whitened model:

- different recovered directions should not collapse to the same component
- the rows of the unmixing matrix should remain orthogonal

In the whitened setting, this is usually enforced as

$$
W W^T = I.
$$

There are two common ways to impose that:

1. deflation:
   after finding one component, orthogonalize the next iterate against the previous ones and renormalize
2. symmetric FastICA:
   update all rows and then perform a joint orthogonalization step

The symmetric-decorrelation formula used in practice is

$$
W \leftarrow (W W^T)^{-1/2} W.
$$

Why this matters:

- it keeps the recovered directions orthonormal
- it prevents two rows from converging to the same source
- it is the matrix-valued analogue of the single-vector normalization step

So the full FastICA picture is:

- stationarity gives the fixed-point direction update
- normalization enforces $\|w\|=1$ for one component
- orthogonalization / symmetric decorrelation enforces distinct components for many-component ICA

## 7.8 Why This Topic Belongs in an Optimization Course

FastICA is a nice synthesis topic because it forces you to see that optimization machinery is not just abstract theorem language.

This one topic uses:

- a constrained objective
- a Lagrangian
- a stationarity condition
- a derived iterative algorithm

So the point of the ICA lectures was not just “learn one signal-processing algorithm.” It was:

`see how constrained optimization ideas become a practical algorithm.`

## 7.9 Common Traps

- writing the whitening condition incorrectly as `$E[z^T z]=I$`
- saying PCA and ICA are the same because both “decorrelate”
- forgetting the unit-norm constraint in the optimization problem
- remembering the update but not the stationarity equation it came from
- forgetting to renormalize `$w$`
- forgetting that multi-component FastICA also needs an orthogonalization step so distinct rows do not collapse to the same source

The single most useful sentence to remember is:

`FastICA turns a constrained non-Gaussianity optimization problem into a fixed-point iteration derived from the stationarity condition.`
