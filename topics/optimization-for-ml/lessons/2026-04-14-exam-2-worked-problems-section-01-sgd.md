# 1. Stochastic Gradient Descent Worked Problems

## Table of Contents

- [[#Problem 1.1]]
- [[#Problem 1.2]]
- [[#Problem 1.3]]
- [[#Problem 1.4]]
- [[#Problem 1.5]]
- [[#Problem 1.6]]

### Problem 1.1

Let

$$
f(x)=\frac{1}{2}\mathbb{E}(X-x)^2,
$$

where $X$ is a scalar random variable with mean $\mu$. Define

$$
g(x;X)=x-X.
$$

Show that $g$ is an unbiased stochastic gradient and write the SGD update.

### Solution

Expand the objective:

$$
f(x)=\frac12 \mathbb{E}(X^2-2xX+x^2).
$$

Differentiate:

$$
\nabla f(x)=x-\mathbb{E}[X]=x-\mu.
$$

Now check unbiasedness:

$$
\mathbb{E}[g(x;X)\mid x]
=
\mathbb{E}[x-X\mid x]
=
x-\mathbb{E}[X]
=
x-\mu
=
\nabla f(x).
$$

So $g$ is unbiased.

The SGD update is

$$
x^{t+1}=x^t-\eta_t(x^t-X_t)
=(1-\eta_t)x^t+\eta_t X_t.
$$

If one chooses $\eta_t=1/(t+1)$, this becomes the running-average recursion.

### Problem 1.2

Explain mathematically why fixed-step SGD usually does not converge exactly, even on a strongly convex objective.

### Solution

A standard strongly-convex bound with fixed step size is

$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha \eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}.
$$

The first term contracts to zero, but the second term does not. Therefore the iterates approach a neighborhood of the optimum whose radius is controlled by the step size and the gradient noise. This is the stochastic error floor. Exact convergence would require that residual term to vanish, which typically requires decreasing step sizes.

### Problem 1.3

Let

$$
f(x)=\frac{1}{n}\sum_{i=1}^n f_i(x),
$$

and let $\xi$ be uniform on $\{1,\dots,n\}$. Show that

$$
g(x;\xi)=\nabla f_\xi(x)
$$

is an unbiased stochastic gradient.

### Solution

Take expectation over the random index:

$$
\mathbb{E}_\xi[g(x;\xi)]
=
\mathbb{E}_\xi[\nabla f_\xi(x)]
=
\frac{1}{n}\sum_{i=1}^n \nabla f_i(x).
$$

But

$$
\nabla f(x)
=
\nabla \left(\frac{1}{n}\sum_{i=1}^n f_i(x)\right)
=
\frac{1}{n}\sum_{i=1}^n \nabla f_i(x).
$$

Therefore

$$
\mathbb{E}_\xi[g(x;\xi)] = \nabla f(x).
$$

So a single randomly chosen component gradient is an unbiased stochastic gradient. This is exactly the short derivation style that could plausibly appear as a small proof or short-answer question.

### Problem 1.4

Show that the recursion

$$
x^{t+1}=x^t-\frac{1}{t+1}(x^t-X_{t+1})
$$

produces the running average of the samples.

### Solution

Rewrite the update as

$$
x^{t+1}
=
\left(1-\frac{1}{t+1}\right)x^t+\frac{1}{t+1}X_{t+1}
=
\frac{t}{t+1}x^t+\frac{1}{t+1}X_{t+1}.
$$

Now check the first few iterates:

$$
x^1=X_1,
\qquad
x^2=\frac12(X_1+X_2),
\qquad
x^3=\frac13(X_1+X_2+X_3).
$$

The inductive step is

$$
x^{t+1}
=
\frac{t}{t+1}\left(\frac{1}{t}\sum_{i=1}^t X_i\right)+\frac{1}{t+1}X_{t+1}
=
\frac{1}{t+1}\sum_{i=1}^{t+1} X_i.
$$

So the SGD iterate is exactly the sample mean. This problem is exam-relevant because it is short, computational, and conceptually central to the lecture.

### Problem 1.5

In the convex nonsmooth SGD proof, suppose one arrives at

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Choose $\eta$ to optimize the right-hand side.

### Solution

Define

$$
\phi(\eta)=\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Differentiate:

$$
\phi'(\eta)=-\frac{R}{2k\eta^2}+\frac{G^2}{2}.
$$

Set $\phi'(\eta)=0$:

$$
-\frac{R}{2k\eta^2}+\frac{G^2}{2}=0
\quad \Longrightarrow \quad
G^2=\frac{R}{k\eta^2}.
$$

Hence

$$
\eta^2=\frac{R}{G^2k},
\qquad
\eta=\frac{\sqrt{R}}{G\sqrt{k}}.
$$

Substituting back gives

$$
\mathbb{E}[f(\bar x_k)]-f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}.
$$

This is the kind of compact derivation that is realistic for an exam proof part: a few lines, but you need to know what is being optimized.

### Problem 1.6

State exactly what converges in the following three SGD settings:

1. convex nonsmooth SGD
2. strongly convex SGD with fixed step size
3. strongly convex SGD with $\eta_t=1/(\alpha(t+1))$

### Solution

1. In the convex nonsmooth case, the standard theorem controls averaged function value:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*) = O(1/\sqrt{k}).
$$

2. In the strongly convex fixed-step case, the standard theorem controls squared distance to the optimizer:

$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}.
$$

3. In the strongly convex decaying-step case, the theorem again controls averaged function value:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*) = O((1+\log k)/k).
$$

This problem is intentionally exam-style. On Exam 1, several points were lost by stating only a rate and not the quantity that converges. SGD is exactly the kind of section where that mistake is easy to make.
