# ICA / FastICA Memory Sheet

Use with [[2026-04-14-exam-2-section-07-ica]].

## Core Setup
- After whitening, $E[zz^T]=I$.
- In ICA we search for directions $w$ so that $w^T z$ is maximally non-Gaussian.
- A common kurtosis objective is $E[(w^T z)^4]-3$ under $\|w\|=1$.

## FastICA Stationarity Shape
- The stationarity condition has the form
$$
E[z(w^T z)^3] = \lambda w.
$$
- This motivates a fixed-point iteration rather than generic gradient descent.

## What To Memorize
- Whitening uses covariance identity: $E[zz^T]=I$.
- The scalar $E[z^T z]$ is not the whitening condition.
- ICA is about higher-order structure after second-order correlations are removed.

## Likely Exam Traps
- Confusing PCA with ICA.
- Forgetting the unit-norm constraint on $w$.
- Writing whitening incorrectly as $E[z^T z]=I$.
