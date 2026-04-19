# Exam 2 Mock Exam - Exam 1 Calibrated - Part II

## Select All That Apply

No need to justify. Multiple answers may be correct.

Total: `33 points`

### 2.1

[3 pts] For convex nonsmooth SGD with unbiased stochastic subgradients and bounded second moment, which of the following statements are true?

a. In the one-step proof, one conditions on $x^t$ before taking expectation over the fresh randomness.  
b. The standard $O(1/\sqrt{k})$ theorem usually controls an averaged or best-seen objective quantity, not necessarily the last iterate.  
c. Strong convexity together with a fixed step size removes the stochastic error floor.  
d. Mini-batching can reduce variance per update while increasing the per-step cost.  
e. None of the above.

### 2.2

[3 pts] Which of the following statements about proximal gradient and gradient mapping are true?

a. If $h=0$, then $G_\eta(x)=\nabla g(x)$.  
b. $G_\eta(x)=0$ is equivalent to

$$
x=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

c. If $h=\mathbb{I}_C$, then $\operatorname{prox}_{\eta,h}(v)=\Pi_C(v)$.  
d. If $G_\eta(x)=0$, then $x$ is automatically a global minimizer even without convexity assumptions.  
e. Under the standard smooth-convex + convex-composite setup with $\eta=1/\beta$, proximal gradient has an $O(1/k)$ objective-gap rate.

### 2.3

[3 pts] Consider the LP

$$
\min_x c^T x
\quad
\text{s.t. } Ax=b,\; Gx \le h.
$$

Which of the following statements are true?

a. The dual function equals $-b^Tu-h^T\nu$ whenever

$$
A^Tu+G^T\nu+c=0,
\qquad
\nu \ge 0.
$$

b. If $A^Tu+G^T\nu+c\neq 0$ and $\nu \ge 0$, then the dual function is $+\infty$.  
c. Any dual-feasible point gives a lower bound on the primal optimum.  
d. The dual function is the pointwise infimum of affine functions of the dual variables.  
e. Strong duality holds for every convex problem even without any constraint qualification.

### 2.4

[3 pts] Which of the following KKT statements are true?

a. Complementary slackness means

$$
\lambda_i g_i(x^*)=0
$$

for each inequality constraint.  
b. If $g_i(x^*)<0$ at the optimum, then necessarily $\lambda_i=0$.  
c. For a convex differentiable problem, primal feasibility, dual feasibility, complementary slackness, and stationarity are sufficient for optimality.  
d. In nonconvex problems, KKT points need not be global optima.  
e. If $x^*$ and $(\lambda^*,\nu^*)$ are primal and dual optimal, then KKT automatically holds even without strong duality / regularity assumptions.

### 2.5

[3 pts] Which of the following PSD / SDP statements are true?

a. The PSD cone $S_+^n$ is a convex cone.  
b. If $X \succeq 0$ and $X_{ii}=0$, then the entire $i$-th row and column must be zero.  
c. If $A \succeq 0$ and $B \succeq 0$ and $A \bullet B=0$, then the lecture fact says $AB=0$.  
d. If $X \succeq 0$ and $S \succeq 0$, then $XS$ must be symmetric PSD.  
e. In the standard SDP dual, the slack matrix satisfies

$$
S=C-\sum_i y_i A_i,
\qquad
S \succeq 0.
$$

### 2.6

[3 pts] Which of the following Newton-method statements are true?

a. The Newton step can be derived by linearizing the equation $\nabla f(x)=0$.  
b. Positive-definite Hessian at the current point guarantees global convergence from any initialization.  
c. Damped Newton keeps the Newton direction but rescales the step length.  
d. Local quadratic convergence means

$$
\|x_{k+1}-x^*\| \le C\|x_k-x^*\|^2
$$

near the solution.  
e. Root-finding Newton and minimization Newton are literally the same formula with $f$ substituted for $\phi$.

### 2.7

[3 pts] Which of the following ICA / FastICA statements are true?

a. Whitening is expressed by

$$
E[zz^T]=I.
$$

b. After whitening, the coordinates of $z$ are automatically independent.  
c. For whitened data,

$$
E[(w^T z)^2]=\|w\|^2.
$$

d. In FastICA, the normalization step enforces the unit-norm constraint on $w$.  
e. PCA and ICA become the same method after whitening.

### 2.8

[3 pts] Which of the following momentum / acceleration statements are true?

a. Polyak momentum uses previous-update information.  
b. NAG differs from Polyak momentum in where the gradient is evaluated.  
c. In the smooth convex setting, NAG achieves an $O(1/k^2)$ function-gap rate.  
d. The standard $O(1/k^2)$ statement is a rate on $\|x_k-x^*\|^2$.  
e. None of the above.

### 2.9

[3 pts] Which of the following adaptive-method statements are true?

a. AdaGrad uses a cumulative sum of squared gradients.  
b. RMSProp replaces that cumulative sum by an exponential moving average.  
c. AdaDelta keeps moving averages of both squared gradients and squared updates.  
d. Bias correction in Adam is needed because the moment estimates are initialized at zero.  
e. The existence of Adam failure examples means the bias-correction formulas are mathematically invalid.

### 2.10

[3 pts] Which of the following advanced-optimizer statements are true?

a. AdamW decouples weight decay from adaptive gradient scaling.  
b. In Shampoo, each matrix parameter is treated using only a single scalar preconditioner.  
c. SOAP can be viewed as combining Shampoo-style structure with Adam-like adaptivity in a transformed basis.  
d. AdaNGD is introduced as a pure second-order method that requires explicit Hessian inversion each step.  
e. None of the above.

### 2.11

[3 pts] Which of the following are convex optimization problems in the standard course sense?

a. Standard primal SDP:

$$
\min_X C \bullet X
\quad
\text{s.t. } A_i \bullet X=b_i,\; X \succeq 0
$$

b. FastICA kurtosis maximization over $\|w\|=1$  
c. Standard LP dual:

$$
\max_{u,\nu} -b^Tu-h^T\nu
\quad
\text{s.t. } A^Tu+G^T\nu+c=0,\; \nu \ge 0
$$

d. The KKT system of a general nonconvex problem, viewed as a feasibility problem  
e. Composite convex problem $\min_x g(x)+h(x)$ with convex smooth $g$ and convex $h$
