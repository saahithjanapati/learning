# Exam 2 Mock Exam - Exam 1 Calibrated - Part II

## Select All That Apply

No need to justify. Multiple answers may be correct.

Total: `33 points`

### 2.1

[3 pts] For convex nonsmooth SGD with unbiased stochastic subgradients and bounded second moment, which of the following statements are true?

a. In the one-step proof, one conditions on $x^t$ before taking expectation over the fresh randomness.  
	True
b. The standard $O(1/\sqrt{k})$ theorem usually controls an averaged or best-seen objective quantity, not necessarily the last iterate.  
	True
c. Strong convexity together with a fixed step size removes the stochastic error floor.
	False, stochastic error floor does nto go away...
d. Mini-batching can reduce variance per update while increasing the per-step cost.  
	False, it's flipped in this statement
e. None of the above.

### 2.2

[3 pts] Which of the following statements about proximal gradient and gradient mapping are true?

a. If $h=0$, then $G_\eta(x)=\nabla g(x)$.  
	True, if h=0, proximal gradient descent just reduces to regular gradient descent

b. $G_\eta(x)=0$ is equivalent to

$$
x=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$
True, this is the optimality condition

c. If $h=\mathbb{I}_C$, then $\operatorname{prox}_{\eta,h}(v)=\Pi_C(v)$.
True


d. If $G_\eta(x)=0$, then $x$ is automatically a global minimizer even without convexity assumptions. 
False, i think you need convexity assumptions to say that it is a global minimizer


e. Under the standard smooth-convex + convex-composite setup with $\eta=1/\beta$, proximal gradient has an $O(1/k)$ objective-gap rate.
True


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
True, the latter condition is required in order for the infimum to have a finite value. when it does have a finite value, the dual function takes the states value.


b. If $A^Tu+G^T\nu+c\neq 0$ and $\nu \ge 0$, then the dual function is $+\infty$.  
- This is true. This condition needs to be zero for the dual function to have a finite value.

c. Any dual-feasible point gives a lower bound on the primal optimum.  
True, the dual function is always <= the primal function


d. The dual function is the pointwise infimum of affine functions of the dual variables.  
- true. it's given a lambda and u, the dual finds the x-value that attains the minimum value. This gets us to the 

e. Strong duality holds for every convex problem even without any constraint qualification.
- False, we need qualification like Slater's in order to be sure...

### 2.4

[3 pts] Which of the following KKT statements are true?

a. Complementary slackness means

$$
\lambda_i g_i(x^*)=0
$$
for each inequality constraint.  
- True

b. If $g_i(x^*)<0$ at the optimum, then necessarily $\lambda_i=0$.  
- True. Optimum needs to follow KKT points, and 

c. For a convex differentiable problem, primal feasibility, dual feasibility, complementary slackness, and stationarity are sufficient for optimality. 
	True

d. In nonconvex problems, KKT points need not be global optima. 
- True

e. If $x^*$ and $(\lambda^*,\nu^*)$ are primal and dual optimal, then KKT automatically holds even without strong duality / regularity assumptions.
- False? not 100% sure.

### 2.5

[3 pts] Which of the following PSD / SDP statements are true?

a. The PSD cone $S_+^n$ is a convex cone.  
	True

b. If $X \succeq 0$ and $X_{ii}=0$, then the entire $i$-th row and column must be zero. 
- True

c. If $A \succeq 0$ and $B \succeq 0$ and $A \bullet B=0$, then the lecture fact says $AB=0$.  
- True

d. If $X \succeq 0$ and $S \succeq 0$, then $XS$ must be symmetric PSD.  
- False? Not sure...
	
e. In the standard SDP dual, the slack matrix satisfies
$$
S=C-\sum_i y_i A_i,
\qquad
S \succeq 0.
$$
- True
### 2.6

[3 pts] Which of the following Newton-method statements are true?

a. The Newton step can be derived by linearizing the equation $\nabla f(x)=0$. 
	True
b. Positive-definite Hessian at the current point guarantees global convergence from any initialization.  
	False
c. Damped Newton keeps the Newton direction but rescales the step length.  
	True
d. Local quadratic convergence means

$$
\|x_{k+1}-x^*\| \le C\|x_k-x^*\|^2
$$
near the solution.  
	True

e. Root-finding Newton and minimization Newton are literally the same formula with $f$ substituted for $\phi$.
	- False, it's not just the substitution, minimiation is operating on the gradient of F
	
### 2.7

[3 pts] Which of the following ICA / FastICA statements are true?

a. Whitening is expressed by

$$
E[zz^T]=I.
$$
True

b. After whitening, the coordinates of $z$ are automatically independent.  
- False

c. For whitened data,

$$
E[(w^T z)^2]=\|w\|^2.
$$
d. In FastICA, the normalization step enforces the unit-norm constraint on $w$.
- True

e. PCA and ICA become the same method after whitening.
- False, they are different algorithms...

### 2.8

[3 pts] Which of the following momentum / acceleration statements are true?

a. Polyak momentum uses previous-update information.  
- True
b. NAG differs from Polyak momentum in where the gradient is evaluated. 
	True, NAG computes the gradient at the look-ahead point
c. In the smooth convex setting, NAG achieves an $O(1/k^2)$ function-gap rate.  
	- True
d. The standard $O(1/k^2)$ statement is a rate on $\|x_k-x^*\|^2$.  
	false, it's on the function-value gap
	
e. None of the above.

### 2.9

[3 pts] Which of the following adaptive-method statements are true?

a. AdaGrad uses a cumulative sum of squared gradients. 
	True
b. RMSProp replaces that cumulative sum by an exponential moving average.  
	True
c. AdaDelta keeps moving averages of both squared gradients and squared updates.  
	True
d. Bias correction in Adam is needed because the moment estimates are initialized at zero.  
	True
e. The existence of Adam failure examples means the bias-correction formulas are mathematically invalid.
	False

### 2.10

[3 pts] Which of the following advanced-optimizer statements are true?

a. AdamW decouples weight decay from adaptive gradient scaling.
	True
b. In Shampoo, each matrix parameter is treated using only a single scalar preconditioner.  
	False. the preconditioners are matrices...
c. SOAP can be viewed as combining Shampoo-style structure with Adam-like adaptivity in a transformed basis.  
	True
d. AdaNGD is introduced as a pure second-order method that requires explicit Hessian inversion each step.  
	True? Not sure...
e. None of the above.

### 2.11

[3 pts] Which of the following are convex optimization problems in the standard course sense?

a. Standard primal SDP:

$$
\min_X C \bullet X
\quad
\text{s.t. } A_i \bullet X=b_i,\; X \succeq 0
$$
- True

b. FastICA kurtosis maximization over $\|w\|=1$  
- True
c. Standard LP dual:

$$
\max_{u,\nu} -b^Tu-h^T\nu
\quad
\text{s.t. } A^Tu+G^T\nu+c=0,\; \nu \ge 0
$$
- False, this would be concave i believe?

d. The KKT system of a general nonconvex problem, viewed as a feasibility problem  
	- True, I think? Not sure...
e. Composite convex problem $\min_x g(x)+h(x)$ with convex smooth $g$ and convex $h$
- True, I think? we can use prox grad descent here?
