# 3. Lagrangians and LP Duality

Start with

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx \le h.
$$

The Lagrangian is

$$
L(x,u,\nu)=c^Tx + u^T(Ax-b) + \nu^T(Gx-h),
\qquad \nu \ge 0.
$$

The dual function is

$$
g(u,\nu) = \inf_x L(x,u,\nu).
$$

Expanding:

$$
L(x,u,\nu)
=
(c + A^T u + G^T \nu)^T x - b^T u - h^T \nu.
$$

Now the dual derivation hinges on one decision: when is the infimum over $x$ finite?

It is finite if and only if

$$
c + A^T u + G^T \nu = 0.
$$

Under that condition,

$$
g(u,\nu) = -b^T u - h^T \nu.
$$

Otherwise

$$
g(u,\nu) = -\infty.
$$

Therefore the dual problem is

$$
\max_{u,\nu} -b^T u - h^T \nu
\quad
\text{s.t. }
A^T u + G^T \nu + c = 0,\;
\nu \ge 0.
$$

### 3.1 Weak Duality

For primal-feasible $x$ and dual-feasible $(u,\nu)$,

$$
g(u,\nu) \le f(x).
$$

This lower-bound interpretation is the foundation for later duality results and for the KKT framework.

### 3.2 What To Practice

You should be able to derive a dual from scratch and explicitly state:

- the Lagrangian,
- the dual function,
- the finiteness condition,
- the final dual problem.

That “finite iff” step is where many exam mistakes happen.
