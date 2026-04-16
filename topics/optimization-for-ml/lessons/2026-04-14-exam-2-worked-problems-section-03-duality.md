# 3. LP Duality Worked Problems

## Table of Contents

- [[#Problem 3.1]]
- [[#Problem 3.2]]

### Problem 3.1

Derive the dual of

$$
\min_x x
\quad \text{s.t. } x \ge 2.
$$

### Solution

Rewrite the constraint as

$$
-x \le -2.
$$

The Lagrangian is

$$
L(x,\nu)=x+\nu(-x+2),
\qquad \nu \ge 0.
$$

Simplify:

$$
L(x,\nu)=(1-\nu)x+2\nu.
$$

The dual function is finite iff the coefficient of $x$ is zero:

$$
1-\nu=0 \iff \nu=1.
$$

Then

$$
g(\nu)=2\nu=2.
$$

Otherwise the infimum is $-\infty$.

So the dual is

$$
\max_{\nu \ge 0} 2\nu
\quad \text{s.t. } \nu=1.
$$

Its value is `2`, matching the primal optimum.

### Problem 3.2

Derive the dual of

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx\le h.
$$

### Solution

The Lagrangian is

$$
L(x,u,\nu)=c^T x + u^T(Ax-b)+\nu^T(Gx-h),
\qquad \nu \ge 0.
$$

Rearrange:

$$
L(x,u,\nu)
=
(c+A^T u+G^T \nu)^T x - b^T u - h^T \nu.
$$

Thus

$$
g(u,\nu)=\inf_x L(x,u,\nu)
$$

is finite iff

$$
c+A^T u+G^T \nu=0.
$$

Under that condition,

$$
g(u,\nu)=-b^T u-h^T \nu.
$$

Otherwise $g(u,\nu)=-\infty$.

Therefore the dual is

$$
\max_{u,\nu} -b^T u-h^T \nu
\quad \text{s.t. } A^T u+G^T \nu+c=0,\; \nu \ge 0.
$$
