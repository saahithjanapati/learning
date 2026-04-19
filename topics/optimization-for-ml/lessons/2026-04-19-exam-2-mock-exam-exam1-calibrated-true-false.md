# Exam 2 Mock Exam - Exam 1 Calibrated - Part I

## True / False

No need to justify.

Total: `24 points`

### 1.1

[2 pts] Suppose $f$ is $\alpha$-strongly convex and the stochastic gradients are unbiased with bounded second moment. If we run SGD with a fixed step size $\eta > 0$, then

$$
\mathbb{E}\|x^k-x^*\|^2 \to 0
$$

must hold as $k \to \infty$.

- True
- False

False, there's going to be an error floor due to the inherent stochasticity of the method.

### 1.2

[2 pts] If $h=\mathbb{I}_C$ in proximal gradient, then the update becomes a gradient step followed by Euclidean projection onto $C$.

- True
- False

True


### 1.3

[2 pts] For a primal minimization problem, the dual function is always concave in the dual variables, even if the primal problem itself is not convex.

- True
- False

True

### 1.4

[2 pts] For a convex differentiable constrained optimization problem, primal feasibility together with stationarity is enough to conclude global optimality.

- True
- False

False, you need all KKT conditions, these are just 2 of them.

### 1.5

[2 pts] If $X \succeq 0$ and $S \succeq 0$, then

$$
X \bullet S \ge 0.
$$

- True
- False

True

### 1.6

[2 pts] If $X \succeq 0$ and $S \succeq 0$, then the matrix product $XS$ must also be positive semidefinite.

- True
- False

False, not necessarily true.

### 1.7

[2 pts] If $\nabla^2 f(x_k)\succ 0$ and $\nabla f(x_k)\neq 0$, then the Newton step is a descent direction.

- True
- False
True.

### 1.8

[2 pts] Whitening is correctly written as

$$
E[zz^T]=I,
$$

and this alone implies that the coordinates of $z$ are independent.

- True
- False
False, this just means the covariance matrix is the identity, which means they are not correlated.

### 1.9

[2 pts] In the smooth convex setting, the standard $O(1/k^2)$ guarantee for Nesterov acceleration is a rate on

$$
\|x_k-x^*\|^2.
$$

- True
- False
False, it's a rate on the function value gap, not on the iterate gap.

### 1.10

[2 pts] Bias correction in Adam mainly matters because stochastic gradients are noisy.

- True
- False


### 1.11

[2 pts] In AdamW, adding an $L_2$ regularization term to the objective is exactly the same as decoupled weight decay inside Adam.

- True
- False

### 1.12

[2 pts] Every linear program can be written as a special case of a semidefinite program.

- True
- False
