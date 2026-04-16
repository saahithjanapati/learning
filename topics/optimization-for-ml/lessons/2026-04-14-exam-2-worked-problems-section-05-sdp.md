# 5. Semidefinite Programming Worked Problems

## Table of Contents

- [[#Problem 5.1]]
- [[#Problem 5.2]]

### Problem 5.1

Show that

$$
X=
\begin{pmatrix}
2 & 1 \\
1 & 2
\end{pmatrix}
$$

is PSD.

### Solution

This matrix is symmetric. For a $2\times 2$ symmetric matrix, positive definiteness follows if the leading principal minors are positive:

$$
2>0,
\qquad
\det(X)=4-1=3>0.
$$

Hence $X \succ 0$, so in particular $X \succeq 0$.

Equivalently, one can compute

$$
v^T X v
=
2v_1^2+2v_2^2+2v_1v_2
=
(v_1+v_2)^2+v_1^2+v_2^2 \ge 0.
$$

### Problem 5.2

Prove weak duality for the standard SDP primal-dual pair.

### Solution

Let $X$ be primal-feasible and `(y,S)` dual-feasible. Then

$$
C \bullet X - y^T b
=
C \bullet X - \sum_i y_i b_i.
$$

Since $X$ is primal-feasible,

$$
b_i = A_i \bullet X,
$$

so

$$
C \bullet X - y^T b
=
C \bullet X - \sum_i y_i(A_i \bullet X)
=
\left(C-\sum_i y_iA_i\right)\bullet X.
$$

By dual feasibility,

$$
S=C-\sum_i y_iA_i,
$$

hence

$$
C \bullet X - y^T b = S \bullet X.
$$

Now $S \succeq 0$ and $X \succeq 0$, so

$$
S \bullet X \ge 0.
$$

Therefore

$$
C \bullet X - y^T b \ge 0.
$$

This is weak duality.
