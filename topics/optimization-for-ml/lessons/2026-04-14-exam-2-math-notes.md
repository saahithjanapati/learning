# Exam 2 Math Notes

This note covers the `Feb 19` through `Apr 14` material in a lecture-note style. The goal is to keep the focus on the mathematical content itself while still making the flow readable enough to study from directly.

## Stochastic Gradient Descent

Stochastic gradient descent replaces the true gradient with an unbiased random estimator. The basic assumption is

$$
\mathbb{E}[g(x;\xi)\mid x] = \nabla f(x),
$$

and the update is

$$
x^{t+1} = x^t - \eta_t g(x^t;\xi_t).
$$

This looks identical to gradient descent, but the randomness changes both the behavior and the rate statements. A useful identity is

$$
\mathbb{E}\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi)),
$$

which explains why fixed-step SGD does not usually converge exactly to the optimum: even when the true gradient is small, the variance term may remain nonzero.

For convex nonsmooth objectives, the standard averaged-iterate guarantee is

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O(1/\sqrt{k}).
$$

For strongly convex problems, fixed-step SGD gives a linear transient term plus a noise floor:

$$
\mathbb{E}\|x^k - x^*\|^2
\le
(1-\alpha \eta)^k \|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}.
$$

If instead the step sizes decay and one averages appropriately, the guarantee improves to

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O((1+\log k)/k).
$$

So the main picture is:

- unbiasedness makes SGD point in the right direction on average,
- variance prevents exact convergence with fixed step size,
- decreasing steps recover asymptotic convergence.

## Proximal Gradient

Proximal gradient methods handle objectives of the form

$$
f(x) = g(x) + h(x),
$$

where $g$ is smooth and $h$ is convex but possibly nonsmooth.

The central object is the proximal operator

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{ \frac{1}{2\eta}\|z-v\|^2 + h(z) \right\}.
$$

The proximal-gradient update first takes a gradient step on the smooth part and then applies the prox:

$$
y_{t+1} = x_t - \eta \nabla g(x_t),
\qquad
x_{t+1} = \operatorname{prox}_{\eta,h}(y_{t+1}).
$$

The right analogue of the gradient in this setting is the gradient mapping

$$
G_\eta(x)
=
\frac{1}{\eta}\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

This quantity is useful because it reduces to the ordinary gradient when $h = 0$, and many descent arguments for proximal methods are written in terms of it.

When $g$ is $\beta$-smooth and $\alpha$-strongly convex, one gets a linear convergence rate analogous to ordinary gradient descent:

$$
\|x^k-x^*\|^2 \le (1-1/\kappa)^k \|x^0-x^*\|^2,
\qquad
\kappa = \beta/\alpha,
\qquad
\eta = 1/\beta.
$$

The important conceptual point is that the method preserves fast smooth-optimization behavior even though the full objective may be nonsmooth, as long as the nonsmooth part enters through a prox-friendly structure.

## Lagrangians and LP Duality

For the linear program

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx \le h,
$$

the Lagrangian is

$$
L(x,u,\nu) = c^T x + u^T(Ax-b) + \nu^T(Gx-h),
\qquad \nu \ge 0.
$$

The dual function is defined by minimizing over the primal variable:

$$
g(u,\nu) = \inf_x L(x,u,\nu).
$$

Expanding the Lagrangian gives

$$
L(x,u,\nu)
=
(c + A^T u + G^T \nu)^T x - b^T u - h^T \nu.
$$

Now the key step is to ask when the infimum over $x$ is finite. It is finite exactly when the coefficient of $x$ is zero:

$$
c + A^T u + G^T \nu = 0.
$$

Under that condition,

$$
g(u,\nu) = -b^T u - h^T \nu.
$$

Otherwise the linear term in $x$ can be driven to $-\infty$, so

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

This derivation is important because it captures a pattern that reappears throughout the course:

1. write the Lagrangian,
2. minimize over the primal variable,
3. identify the conditions under which that minimization is finite,
4. turn those into the dual-feasible constraints.

## KKT Conditions

For a convex differentiable constrained problem

$$
\min_x f(x)
\quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0,
$$

with convex $f, h_i$ and affine $\ell_j$, the KKT conditions are the standard first-order optimality system.

Primal feasibility:

$$
h_i(x^*) \le 0,\qquad \ell_j(x^*) = 0.
$$

Dual feasibility:

$$
\nu_i^* \ge 0.
$$

Complementary slackness:

$$
\nu_i^* h_i(x^*) = 0.
$$

Stationarity:

$$
\nabla f(x^*)
+
\sum_i \nu_i^* \nabla h_i(x^*)
+
\sum_j u_j^* \nabla \ell_j(x^*)
=
0.
$$

In the convex setting, these conditions are sufficient for optimality. If strong duality also holds, then they are necessary as well. A standard sufficient condition for strong duality is Slater's condition, which asks for strict feasibility of the inequality constraints.

So the logic is:

- convexity gives sufficiency of KKT,
- strong duality upgrades KKT to an if-and-only-if condition,
- Slater is the usual route to strong duality.

For nonconvex problems, the role of KKT changes. The same equations still define candidate stationary points, but they no longer certify global optimality by themselves. In that setting, additional analysis is required.

## Semidefinite Programming

The semidefinite-programming lecture extends linear programming from vector nonnegativity to matrix positive semidefiniteness.

The space of symmetric matrices is

$$
S^n = \{X \in \mathbb{R}^{n \times n} : X=X^T\},
$$

and the PSD cone is

$$
S_+^n = \{X \in S^n : X \succeq 0\}.
$$

The definition of positive semidefiniteness is

$$
X \succeq 0
\iff
v^T X v \ge 0
\quad \forall v.
$$

Several structural facts are repeatedly useful:

$$
X \succeq 0 \Rightarrow X_{ii} \ge 0,
$$

and if a diagonal entry is zero, then the entire corresponding row and column are zero.

For block matrices, the Schur complement criterion is

$$
\begin{pmatrix}
A & B \\
B^T & C
\end{pmatrix}
\succeq 0
\iff
A \succeq 0
\text{ and }
C-B^T A^{-1}B \succeq 0.
$$

The inner product between symmetric matrices is

$$
A \bullet B = \operatorname{Tr}(A^T B).
$$

If both matrices are PSD, then

$$
A \bullet B \ge 0.
$$

Moreover, in the PSD case one also has

$$
A \bullet B = 0
\iff
AB = 0.
$$

An SDP in standard form is

$$
\min_X C \bullet X
\quad \text{s.t. } A_i \bullet X = b_i,\; X \succeq 0.
$$

Its dual is

$$
\max_{y,S} y^T b
\quad \text{s.t. } S = C-\sum_i y_i A_i,\; S \succeq 0.
$$

The key weak-duality identity is

$$
C \bullet X - y^T b = S \bullet X \ge 0.
$$

This is the exact SDP analogue of the primal-dual gap identity in LP duality. The proof is short but important:

$$
C \bullet X - y^T b
=
C \bullet X - \sum_i y_i(A_i \bullet X)
=
\left(C-\sum_i y_iA_i\right)\bullet X
=
S \bullet X
\ge 0.
$$

So semidefinite programming combines:

- convex cone geometry,
- matrix analysis,
- and standard duality logic.

## Newton Method

Newton's method first appears as a root-finding algorithm:

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}.
$$

For unconstrained minimization, Newton is applied to the stationarity equation $\nabla f(x)=0$. This gives the Newton system

$$
\nabla f(x_k) + \nabla^2 f(x_k)\Delta x_k = 0,
$$

so the step is

$$
\Delta x_k = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
$$

and the update is

$$
x_{k+1}
=
x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

If the Hessian is positive definite, then the Newton step is a descent direction because

$$
\nabla f(x_k)^T \Delta x_k
=
-\nabla f(x_k)^T [\nabla^2 f(x_k)]^{-1} \nabla f(x_k)
< 0.
$$

Near a nondegenerate minimizer, Newton enjoys local quadratic convergence:

$$
\|x_{k+1}-x^*\| \le C\|x_k-x^*\|^2.
$$

This is much faster than first-order linear convergence, but it is only a local statement. Far from the solution, Newton can fail because the Hessian may be singular, indefinite, or simply produce unstable steps. Damped Newton addresses this by inserting a step-size factor:

$$
x_{k+1}
=
x_k - h_k [\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad 0<h_k\le 1.
$$

So Newton's method should be understood as:

- a second-order local method,
- extremely fast near a good point,
- but not automatically globally stable.

## ICA and FastICA

The ICA lectures present a concrete optimization application of Newton-style reasoning and Lagrange multipliers.

After whitening, the transformed data satisfy

$$
E[zz^T] = I.
$$

The extracted scalar component is

$$
y = w^T z,
\qquad
z \in \mathbb{R}^n,\;
w \in \mathbb{R}^n.
$$

PCA and ICA are related but solve different problems:

- PCA decorrelates and finds variance directions,
- ICA seeks statistically independent components by exploiting non-Gaussianity.

In the FastICA setup from lecture, one optimizes kurtosis subject to a unit-norm constraint:

$$
\max_{\|w\|=1} E[(w^T z)^4] - 3.
$$

Introducing a Lagrange multiplier gives the stationarity condition

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

The resulting fixed-point iteration is

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w / \|\tilde w\|.
$$

This is one of the cleanest places in the course where a constrained optimization problem turns directly into a practical update rule.

## Momentum and Nesterov Acceleration

Polyak momentum modifies gradient descent by adding a fraction of the previous step:

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

Nesterov acceleration changes where the gradient is evaluated:

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1}).
$$

So the essential distinction is:

- Polyak uses the gradient at the current point,
- Nesterov uses the gradient at a look-ahead point.

The accelerated rates are

for convex smooth functions,

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right),
$$

and for strongly convex smooth functions,

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

This should be compared with ordinary gradient descent in the strongly convex case:

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\frac{\alpha}{\beta}\right)^k\right).
$$

So Nesterov improves both the convex and strongly convex rates, but the quantity in the theorem statement is still the function-value gap.

## AdaGrad, RMSProp, AdaDelta, and Adam

AdaGrad scales coordinates by the accumulated squared gradients:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}.
$$

Its main weakness is that the denominator keeps growing, so the method can become overly conservative late in training.

RMSProp replaces the cumulative sum with an exponential moving average:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma)g_{t,i}^2,
\qquad
x_{t+1,i} = x_{t,i} - \frac{\eta}{\sqrt{h_{t,i}+\epsilon}} g_{t,i}.
$$

AdaDelta goes further by also keeping a moving average of squared updates:

$$
E[g^2]_t = \rho E[g^2]_{t-1} + (1-\rho) g_t^2,
$$

$$
E[\Delta x^2]_t = \rho E[\Delta x^2]_{t-1} + (1-\rho)(\Delta x_t)^2,
$$

and then uses

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t.
$$

Adam combines first-moment averaging with second-moment adaptation:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t,
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2,
$$

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t},
$$

$$
x_{t+1} = x_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$

The bias-correction factors matter because the moving averages are initialized at zero and would otherwise be biased early in training.

## Advanced Neural-Net Optimization

The Apr 14 lecture reframes several methods as forms of preconditioned gradient descent:

$$
w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t).
$$

Newton's method is a special case where the preconditioner is the inverse Hessian. Shampoo generalizes the preconditioning idea to matrix and tensor parameters.

For a matrix parameter $W_t$ with matrix gradient $G_t$, Shampoo maintains

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t,
$$

and updates by

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

The interpretation is that Shampoo behaves like a structured version of AdaGrad, using left and right preconditioners instead of a full dense matrix. The regret bound stated in lecture is

$$
\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*)
\le
\sqrt{2rD}\operatorname{Tr}(L_T^{1/4})\operatorname{Tr}(R_T^{1/4}).
$$

Under bounded spectral norm of the gradients, this yields an $O(T^{1/2})$ regret bound.

SOAP is introduced as a refinement of Shampoo that brings Adam-style ideas into the eigenbasis of the preconditioner.

AdaNGD is presented as an adaptive normalized method that converts online adaptive regret bounds into offline convergence guarantees.

AdamW addresses a specific issue with adaptive methods. In ordinary SGD, weight decay and $L_2$ regularization coincide. In adaptive methods they do not. AdamW decouples weight decay from the adaptive gradient normalization, which is why the lecture emphasizes the distinction:

$weight\ decay = L_2\ regularization$ for standard SGD, but $weight\ decay \ne L_2\ regularization$ for adaptive methods.

The decoupled AdamW-style update is

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t.
$$

So the main conceptual content of the advanced-methods lecture is:

- preconditioning as a unifying idea,
- structure-aware scaling for matrix/tensor parameters,
- and the difference between regularization and decoupled decay in adaptive optimizers.
