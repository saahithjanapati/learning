# 6. Newton Method Worked Problems

## Table of Contents

- [[#Problem 6.1]]
- [[#Problem 6.2]]

### Problem 6.1

Apply one Newton step to minimize

$$
f(x)=x^2-2\log x
$$

from a current iterate $x_k>0$.

### Solution

Compute derivatives:

$$
f'(x)=2x-\frac{2}{x},
\qquad
f''(x)=2+\frac{2}{x^2}.
$$

The Newton update is

$$
x_{k+1}
=
x_k-\frac{f'(x_k)}{f''(x_k)}
=
x_k-\frac{2x_k-2/x_k}{2+2/x_k^2}.
$$

Cancel the factor `2`:

$$
x_{k+1}
=
x_k-\frac{x_k-1/x_k}{1+1/x_k^2}.
$$

Multiply numerator and denominator by $x_k^2$:

$$
x_{k+1}
=
x_k-\frac{x_k^3-x_k}{x_k^2+1}
=
\frac{2x_k}{x_k^2+1}.
$$

### Problem 6.2

Show that the Newton step is a descent direction if $\nabla^2 f(x)\succ 0$.

### Solution

The Newton step is

$$
\Delta x = -[\nabla^2 f(x)]^{-1}\nabla f(x).
$$

Then

$$
\nabla f(x)^T \Delta x
=
-\nabla f(x)^T [\nabla^2 f(x)]^{-1}\nabla f(x).
$$

Since $\nabla^2 f(x)\succ 0$, its inverse is also positive definite. Therefore the quadratic form

$$
\nabla f(x)^T [\nabla^2 f(x)]^{-1}\nabla f(x)
$$

is strictly positive whenever $\nabla f(x)\ne 0$. Hence

$$
\nabla f(x)^T \Delta x < 0.
$$

So $\Delta x$ is a descent direction.
