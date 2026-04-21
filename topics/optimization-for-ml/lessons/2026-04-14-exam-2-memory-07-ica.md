# ICA / FastICA Memory Sheet

Use with [[2026-04-14-exam-2-section-07-ica]].

## Table of Contents

- [[#Core Setup]]
- [[#FastICA Stationarity Shape]]
- [[#Constraint and Lagrangian Picture]]
- [[#FastICA Update]]
- [[#Multi-Component ICA]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]


## Core Setup
- After whitening, $E[zz^T]=I$.
- In ICA we search for directions $w$ so that $w^T z$ is maximally non-Gaussian.
- A common kurtosis objective is $E[(w^T z)^4]-3$ under $\|w\|=1$.

## FastICA Stationarity Shape
- Raw first-order stationarity from
$$
E[(w^T z)^4] + \lambda(\|w\|^2-1)
$$
is
$$
4E[z(w^T z)^3] + 2\lambda w = 0.
$$
- Equivalently, after absorbing constants into the multiplier,
$$
E[z(w^T z)^3] = c\, w.
$$
- This motivates a fixed-point iteration rather than generic gradient descent.

## Constraint and Lagrangian Picture
- Standard ICA setup here uses the unit-norm constraint
$$
\|w\|=1.
$$
- The Lagrange-multiplier idea is what produces the stationarity condition
$$
4E[(w^T z)^3 z] + 2\lambda w = 0
\quad \Longleftrightarrow \quad
E[(w^T z)^3 z] = c\,w.
$$
- So the optimization problem is constrained even after whitening.

## FastICA Update
- In the whitened kurtosis setting, the fixed-point update takes the form
$$
\tilde w \leftarrow E[(w^T z)^3 z]-3w,
\qquad
w \leftarrow \tilde w/\|\tilde w\|.
$$
- The $-3w$ term is specific to the whitened kurtosis formulation used in the notes.
- Exam viewpoint: FastICA is a stationarity-derived fixed-point method, not just a memorized black-box update.

## Multi-Component ICA
- For more than one component, the rows of the unmixing matrix should stay orthogonal.
- In the whitened setting, this is
$$
WW^T=I.
$$
- So practical FastICA needs:
  - normalization for one component
  - orthogonalization / decorrelation across multiple components
- Common symmetric-decorrelation step:
$$
W \leftarrow (WW^T)^{-1/2}W.
$$
- Memory shortcut:
  - one-component FastICA: fixed-point update + normalize
  - multi-component FastICA: fixed-point update + orthogonalize

## What To Memorize
- Whitening uses covariance identity: $E[zz^T]=I$.
- The scalar $E[z^T z]$ is not the whitening condition.
- ICA is about higher-order structure after second-order correlations are removed.
- FastICA comes from the stationarity condition plus normalization.
- Multi-component FastICA also needs orthogonality / symmetric decorrelation.

## Likely Exam Traps
- Confusing PCA with ICA.
- Forgetting the unit-norm constraint on $w$.
- Writing whitening incorrectly as $E[z^T z]=I$.
- Forgetting that the raw derivative has a factor of $4$, even though it is often absorbed into the multiplier when the condition is rewritten as $E[(w^T z)^3 z]=c\,w$.
- Forgetting where the $-3w$ correction comes from in the FastICA update.
- Forgetting that multiple components need an orthogonalization step so they do not collapse to the same source.
