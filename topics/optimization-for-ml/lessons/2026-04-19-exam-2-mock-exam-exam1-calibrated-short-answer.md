# Exam 2 Mock Exam - Exam 1 Calibrated - Part III

## Short Answer / Proof

Try to keep each answer to roughly `6-10 lines`, like the real exam.

Total: `20 points`

### 3.1

[5 pts] Let

$$
F(x)=g(x)+h(x),
$$

where $g$ is convex and differentiable and $h$ is proper closed convex.

Show that if

$$
0 \in \nabla g(x)+\partial h(x),
$$

then for every $\eta > 0$,

$$
x=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

### 3.2

[5 pts] Let $g_t=g(x^t;\xi_t)$ be an unbiased stochastic subgradient of a convex function $f$ at $x^t$, meaning

$$
\mathbb{E}[g_t\mid x^t]\in \partial f(x^t).
$$

Show that

$$
\mathbb{E}\big[g_t^T(x^t-x^*)\mid x^t\big]
\ge
f(x^t)-f(x^*).
$$

### 3.3

[5 pts] Consider the symmetric matrix

$$
X(a)=
\begin{pmatrix}
1 & a \\
a & 1
\end{pmatrix}.
$$

For what values of $a$ is $X(a)\succeq 0$?

### 3.4

[5 pts] Consider the convex problem

$$
\min_{x,y} x^2+y^2
$$

subject to

$$
1-x-y \le 0,
\qquad
-x \le 0.
$$

Use the KKT conditions to find the optimizer and the corresponding multipliers.
