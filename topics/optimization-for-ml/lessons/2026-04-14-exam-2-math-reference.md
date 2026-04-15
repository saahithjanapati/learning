# Exam 2 Math Content

## Stochastic Gradient Descent

$$
\mathbb{E}[g(x;\xi)\mid x] = \nabla f(x)
$$

$$
x^{t+1} = x^t - \eta_t g(x^t;\xi_t)
$$

$$
\mathbb{E}\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi))
$$

Convex nonsmooth:

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O(1/\sqrt{k})
$$

Strongly convex, fixed step:

$$
\mathbb{E}\|x^k - x^*\|^2
\le
(1-\alpha \eta)^k \|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}
$$

Strongly convex, decaying step and averaging:

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O((1+\log k)/k)
$$

## Proximal Gradient

$$
f(x) = g(x) + h(x)
$$

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{ \frac{1}{2\eta}\|z-v\|^2 + h(z) \right\}
$$

$$
y_{t+1} = x_t - \eta \nabla g(x_t),
\qquad
x_{t+1} = \operatorname{prox}_{\eta,h}(y_{t+1})
$$

$$
G_\eta(x)
=
\frac{1}{\eta}\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right)
$$

If $g$ is $\beta$-smooth and $\alpha$-strongly convex, $\eta = 1/\beta$, $\kappa = \beta/\alpha$:

$$
\|x^k-x^*\|^2 \le (1-1/\kappa)^k \|x^0-x^*\|^2
$$

## LP Duality

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx \le h
$$

$$
L(x,u,\nu) = c^T x + u^T(Ax-b) + \nu^T(Gx-h),
\qquad \nu \ge 0
$$

$$
g(u,\nu) = \inf_x L(x,u,\nu)
$$

Finite iff:

$$
c + A^T u + G^T \nu = 0
$$

Then:

$$
g(u,\nu) = -b^T u - h^T \nu
$$

Otherwise:

$$
g(u,\nu) = -\infty
$$

$$
\max_{u,\nu} -b^T u - h^T \nu
\quad
\text{s.t. }
A^T u + G^T \nu + c = 0,\;
\nu \ge 0
$$

## KKT

$$
\min_x f(x)
\quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0
$$

$$
h_i(x^*) \le 0,\qquad \ell_j(x^*) = 0
$$

$$
\nu_i^* \ge 0
$$

$$
\nu_i^* h_i(x^*) = 0
$$

$$
\nabla f(x^*)
+
\sum_i \nu_i^* \nabla h_i(x^*)
+
\sum_j u_j^* \nabla \ell_j(x^*)
=
0
$$

Convex differentiable case:

- KKT implies primal and dual optimality
- strong duality plus optimality implies KKT

Slater:

- strict feasibility implies strong duality
- hence KKT necessary and sufficient

Nonconvex:

- KKT gives candidate points only

## Semidefinite Programming

$$
S^n = \{X \in \mathbb{R}^{n \times n} : X=X^T\}
$$

$$
S_+^n = \{X \in S^n : X \succeq 0\}
$$

$$
X \succeq 0
\iff
v^T X v \ge 0
\quad \forall v
$$

$$
X \succeq 0 \Rightarrow X_{ii} \ge 0
$$

$$
X \succeq 0,\; X_{ii}=0
\Rightarrow
\text{row } i \text{ and column } i \text{ are zero}
$$

$$
\begin{pmatrix}
A & B \\
B^T & C
\end{pmatrix}
\succeq 0
\iff
A \succeq 0
\text{ and }
C-B^T A^{-1}B \succeq 0
$$

$$
A \bullet B = \operatorname{Tr}(A^T B)
$$

$$
A \succeq 0,\; B \succeq 0
\Rightarrow
A \bullet B \ge 0
$$

$$
A \bullet B = 0
\iff
AB = 0
\qquad
(A,B \succeq 0)
$$

Primal:

$$
\min_X C \bullet X
\quad \text{s.t. } A_i \bullet X = b_i,\; X \succeq 0
$$

Dual:

$$
\max_{y,S} y^T b
\quad \text{s.t. } S = C-\sum_i y_i A_i,\; S \succeq 0
$$

$$
C \bullet X - y^T b = S \bullet X \ge 0
$$

## Newton Method

Root finding:

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}
$$

Minimization:

$$
\nabla f(x_k) + \nabla^2 f(x_k)\Delta x_k = 0
$$

$$
\Delta x_k = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
$$

$$
x_{k+1}
=
x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
$$

If $\nabla^2 f(x_k) \succ 0$:

$$
\nabla f(x_k)^T \Delta x_k
=
-\nabla f(x_k)^T [\nabla^2 f(x_k)]^{-1} \nabla f(x_k)
< 0
$$

Local rate:

$$
\|x_{k+1}-x^*\| \le C\|x_k-x^*\|^2
$$

Damped Newton:

$$
x_{k+1}
=
x_k - h_k [\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad 0<h_k\le 1
$$

## ICA / FastICA

$$
E[zz^T] = I
$$

$$
z \in \mathbb{R}^n,\qquad
w \in \mathbb{R}^n,\qquad
y = w^T z \in \mathbb{R}
$$

$$
\max_{\|w\|=1} E[(w^T z)^4] - 3
$$

$$
4E[(w^T z)^3 z] + 2\lambda w = 0
$$

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w
$$

$$
w \leftarrow \tilde w / \|\tilde w\|
$$

## Momentum and NAG

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1})
$$

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1})
$$

Convex smooth:

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right)
$$

Strongly convex smooth:

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right)
$$

GD:

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\frac{\alpha}{\beta}\right)^k\right)
$$

## AdaGrad / RMSProp / AdaDelta / Adam

AdaGrad:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}
$$

RMSProp:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma)g_{t,i}^2,
\qquad
x_{t+1,i} = x_{t,i} - \frac{\eta}{\sqrt{h_{t,i}+\epsilon}} g_{t,i}
$$

AdaDelta:

$$
E[g^2]_t = \rho E[g^2]_{t-1} + (1-\rho) g_t^2
$$

$$
E[\Delta x^2]_t = \rho E[\Delta x^2]_{t-1} + (1-\rho)(\Delta x_t)^2
$$

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t
$$

Adam:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2
$$

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

$$
x_{t+1} = x_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
$$

## Advanced Methods

$$
w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t)
$$

### Shampoo

$$
L_t = L_{t-1} + G_t G_t^T
$$

$$
R_t = R_{t-1} + G_t^T G_t
$$

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}
$$

$$
\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*)
\le
\sqrt{2rD}\operatorname{Tr}(L_T^{1/4})\operatorname{Tr}(R_T^{1/4})
$$

If $\|G_t\|_2 \le 1$:

$$
\operatorname{Tr}(L_T^{1/4}) \le mT^{1/4},
\qquad
\operatorname{Tr}(R_T^{1/4}) \le nT^{1/4}
$$

$$
\text{Regret} = O(T^{1/2})
$$

### AdamW

L2 regularization in Adam:

$$
\nabla f_t(\theta) \to \nabla f_t(\theta) + \lambda_r \theta
$$

Decoupled weight decay:

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t
$$

### AdaNGD

- adaptive normalized gradient descent
- online-to-offline adaptive conversion

### SOAP

- Shampoo + Adam-style adaptation in eigenbasis

## Proof Targets

$$
g(x)=\frac{B}{2}\|x\|^2-f(x)
$$

Show convexity from $B$-smoothness.

Derive LP dual and exact finiteness domain.

$$
C \bullet X - y^T b = S \bullet X \ge 0
$$

Prove SDP weak duality.

Show Newton step is a descent direction.

Use $G_\eta(x)$ in proximal-gradient descent lemma proofs.

Use KKT plus verification for constrained problems.
