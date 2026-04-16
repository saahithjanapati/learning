# 6. Newton Method

For root finding, Newton's method is

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}.
$$

For minimization, the goal is to solve $\nabla f(x)=0$. Linearizing the gradient gives

$$
\nabla f(x_k) + \nabla^2 f(x_k)\Delta x_k = 0,
$$

hence

$$
\Delta x_k = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
$$

and

$$
x_{k+1}
=
x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

### 6.1 Descent Direction

If $\nabla^2 f(x_k)$ is positive definite, then

$$
\nabla f(x_k)^T \Delta x_k
=
-\nabla f(x_k)^T[\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
< 0.
$$

So the Newton step is a descent direction.

### 6.2 Local Rate

Near a nondegenerate local minimizer, Newton converges quadratically:

$$
\|x_{k+1}-x^*\| \le C \|x_k-x^*\|^2.
$$

This is much faster than first-order linear convergence, but only locally.

### 6.3 Damped Newton

To stabilize the method away from the minimizer, one often uses

$$
x_{k+1}
=
x_k - h_k [\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad 0<h_k\le 1.
$$

So the right mental model is:

- Newton is second-order and locally very fast,
- but it is not automatically globally reliable.
