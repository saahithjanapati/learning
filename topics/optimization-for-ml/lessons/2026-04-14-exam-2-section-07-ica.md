# 7. ICA and FastICA

After whitening the observed data, the transformed variables satisfy

$$
E[zz^T] = I.
$$

The extracted scalar is

$$
y = w^T z,
\qquad
z,w \in \mathbb{R}^n.
$$

ICA differs from PCA in that it seeks independence rather than mere decorrelation.

In the FastICA lecture, the objective is to maximize kurtosis under a norm constraint:

$$
\max_{\|w\|=1} E[(w^T z)^4] - 3.
$$

The Lagrangian stationarity condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

The resulting fixed-point update is

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w/\|\tilde w\|.
$$

This is a good example of the course’s general theme: derive a constrained optimization problem, write stationarity, then turn the stationarity structure into an algorithm.
