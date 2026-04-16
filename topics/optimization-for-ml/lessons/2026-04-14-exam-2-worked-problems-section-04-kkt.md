# 4. KKT Worked Problems

## Table of Contents

- [[#Problem 4.1]]
- [[#Problem 4.2]]

### Problem 4.1

Solve

$$
\min_x x^2
\quad \text{s.t. } x \ge 1
$$

using KKT.

### Solution

Write the constraint as

$$
1-x \le 0.
$$

Then

$$
L(x,\nu)=x^2+\nu(1-x),\qquad \nu \ge 0.
$$

KKT conditions are:

Primal feasibility:

$$
x \ge 1.
$$

Dual feasibility:

$$
\nu \ge 0.
$$

Complementary slackness:

$$
\nu(1-x)=0.
$$

Stationarity:

$$
2x-\nu=0.
$$

From stationarity,

$$
\nu=2x.
$$

If $x>1$, complementary slackness forces $\nu=0$, which would imply $x=0$, impossible.

So the constraint must be active:

$$
x=1.
$$

Then stationarity gives

$$
\nu=2.
$$

Thus

$$
x^*=1,\qquad \nu^*=2.
$$

Since the problem is convex, this KKT point is optimal.

### Problem 4.2

Consider

$$
\max_x -x^4+x^2.
$$

Find the stationary points and explain why KKT-style first-order conditions alone do not identify the global optimum in general nonconvex problems.

### Solution

The derivative is

$$
f'(x)=-4x^3+2x=2x(1-2x^2).
$$

So the stationary points are

$$
x=0,\qquad x=\pm \frac{1}{\sqrt{2}}.
$$

Evaluate:

$$
f(0)=0,
$$

and

$$
f\left(\pm \frac{1}{\sqrt{2}}\right)
=
-\frac14+\frac12
=
\frac14.
$$

So the global maximizers are

$$
x=\pm \frac{1}{\sqrt{2}}.
$$

The point $x=0$ is stationary but not globally optimal. This is why first-order stationarity in a nonconvex problem only gives candidate points.
