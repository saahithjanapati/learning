# Exam 2 Worked Problems

This companion note follows the same order as the comprehensive notes and gives worked examples section by section.

## 1. Stochastic Gradient Descent

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

## 2. Proximal Gradient

### Problem 2.1

Let

$$
g(x)=\frac12(x-3)^2,
\qquad
h(x)=\lambda |x|.
$$

Write one proximal-gradient step from $x_t$ with step size $\eta$.

### Solution

First compute the gradient of the smooth part:

$$
\nabla g(x)=x-3.
$$

The gradient step is

$$
y_{t+1}=x_t-\eta(x_t-3)=(1-\eta)x_t+3\eta.
$$

Now apply the proximal operator of the $\ell_1$ term:

$$
x_{t+1}
=
\operatorname{prox}_{\eta \lambda |\cdot|}(y_{t+1})
=
\operatorname{sign}(y_{t+1})\max(|y_{t+1}|-\eta\lambda,0).
$$

Therefore

$$
x_{t+1}
=
\operatorname{sign}((1-\eta)x_t+3\eta)\max(|(1-\eta)x_t+3\eta|-\eta\lambda,0).
$$

This is exactly the soft-thresholding form.

### Problem 2.2

Let $h(x)=|x|$. Compute

$$
\operatorname{prox}_{\eta h}(v).
$$

### Solution

We must solve

$$
\min_z \frac{1}{2\eta}(z-v)^2+|z|.
$$

Consider cases.

If $z>0$, then $|z|=z$, so

$$
\frac{d}{dz}\left(\frac{1}{2\eta}(z-v)^2+z\right)
=
\frac{1}{\eta}(z-v)+1.
$$

Setting this to zero gives

$$
z=v-\eta.
$$

This is valid only if $v>\eta$.

If $z<0$, then $|z|=-z$, so

$$
\frac{d}{dz}\left(\frac{1}{2\eta}(z-v)^2-z\right)
=
\frac{1}{\eta}(z-v)-1,
$$

hence

$$
z=v+\eta,
$$

valid only if $v<-\eta$.

If $|v|\le \eta$, the minimizer is $z=0$.

So

$$
\operatorname{prox}_{\eta |\cdot|}(v)
=
\operatorname{sign}(v)\max(|v|-\eta,0).
$$

## 3. LP Duality

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

## 4. KKT

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

## 5. Semidefinite Programming

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

## 6. Newton Method

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

## 7. ICA / FastICA

### Problem 7.1

Starting from

$$
\max_{\|w\|=1} E[(w^T z)^4]-3,
$$

derive the stationarity condition.

### Solution

Introduce the Lagrangian

$$
\mathcal{L}(w,\lambda)=E[(w^T z)^4]-3+\lambda(\|w\|^2-1).
$$

Differentiate with respect to $w$:

$$
\nabla_w E[(w^T z)^4]
=
E[4(w^T z)^3 z].
$$

Also,

$$
\nabla_w \lambda(\|w\|^2-1)=2\lambda w.
$$

Therefore the stationarity condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

### Problem 7.2

Explain why whitening is expressed as

$$
E[zz^T]=I
$$

rather than $E[z^T z]=I$.

### Solution

The covariance of a vector-valued random variable is a matrix. Whitening means the covariance becomes the identity:

$$
\operatorname{Cov}(z)=E[zz^T]=I.
$$

By contrast,

$$
E[z^T z]
$$

is only a scalar, namely the expected squared norm of the vector. It does not encode the coordinatewise covariance structure. So whitening must be written in matrix form as $E[zz^T]=I$.

## 8. Momentum and NAG

### Problem 8.1

Write Polyak momentum and NAG side by side and identify the exact difference.

### Solution

Polyak momentum:

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

NAG:

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t+\gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1}).
$$

The only structural difference is the point where the gradient is evaluated:

- Polyak uses the current point $x_t$,
- NAG uses the look-ahead point $x_t+\gamma(x_t-x_{t-1})$.

That is exactly what produces the accelerated interpretation.

## 9. AdaGrad / RMSProp / AdaDelta / Adam

### Problem 9.1

Explain mathematically why AdaGrad can become too conservative.

### Solution

AdaGrad uses

$$
h_{t,i}=\sqrt{\sum_{\tau=1}^t g_{\tau,i}^2}.
$$

This quantity is monotone nondecreasing in $t$. Therefore the effective step size in coordinate $i$,

$$
\frac{\eta}{h_{t,i}},
$$

is monotone nonincreasing. Because the denominator contains the entire gradient history, it can become very large even when the current gradients are moderate. As a result the update size can become extremely small, slowing progress.

### Problem 9.2

Why is bias correction needed in Adam?

### Solution

Adam initializes

$$
m_0=0,\qquad v_0=0,
$$

and updates

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t,
\qquad
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2.
$$

Because the recursions start at zero, the raw moments are biased toward zero at early iterations. The corrected forms

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

remove this initialization bias. Without correction, Adam underestimates the first and second moments in the initial steps.

## 10. Advanced Neural-Net Optimization

### Problem 10.1

Explain why Shampoo can be viewed as a structured form of AdaGrad.

### Solution

Ordinary AdaGrad scales coordinates according to accumulated squared gradients. Shampoo does something analogous, but for a matrix parameter $W_t$ it accumulates two structured second-moment matrices:

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t.
$$

The update is

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

So instead of using one giant dense preconditioner on the vectorized parameter, Shampoo uses left and right factors that respect the matrix structure. This is why it is a structured adaptive preconditioner rather than a generic dense one.

### Problem 10.2

Explain why AdamW is not the same as Adam with $L_2$ regularization.

### Solution

With $L_2$ regularization, the gradient becomes

$$
\nabla f_t(\theta) + \lambda_r \theta.
$$

In Adam, this modified gradient is then normalized by the adaptive moment statistics. Therefore the shrinkage term is scaled coordinatewise by the adaptive mechanism.

AdamW instead applies parameter decay outside the adaptive normalization:

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t.
$$

So the decay acts directly on the parameter, not through the adaptive gradient rescaling. That is why AdamW is decoupled weight decay rather than ordinary $L_2$ regularization inside Adam.
