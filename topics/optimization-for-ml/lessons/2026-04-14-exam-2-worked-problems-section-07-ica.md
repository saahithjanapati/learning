# 7. ICA / FastICA Worked Problems

## Table of Contents

- [[#Problem 7.1]]
- [[#Problem 7.2]]

### Problem 7.1

Starting from

$$
\max_{\|w\|=1} E[(w^T z)^4]-3,
$$

derive the stationarity condition.

### Solution

Introduce the Lagrangian

$$
\mathcal{L}(w,\lambda)=E[(w^T z)^4]-3+\lambda(\|w\|^2-1).
$$

Differentiate with respect to $w$:

$$
\nabla_w E[(w^T z)^4]
=
E[4(w^T z)^3 z].
$$

Also,

$$
\nabla_w \lambda(\|w\|^2-1)=2\lambda w.
$$

Therefore the stationarity condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

### Problem 7.2

Explain why whitening is expressed as

$$
E[zz^T]=I
$$

rather than $E[z^T z]=I$.

### Solution

The covariance of a vector-valued random variable is a matrix. Whitening means the covariance becomes the identity:

$$
\operatorname{Cov}(z)=E[zz^T]=I.
$$

By contrast,

$$
E[z^T z]
$$

is only a scalar, namely the expected squared norm of the vector. It does not encode the coordinatewise covariance structure. So whitening must be written in matrix form as $E[zz^T]=I$.
