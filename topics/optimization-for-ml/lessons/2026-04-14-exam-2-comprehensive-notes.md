# Exam 2 Comprehensive Notes

This document covers the `Feb 19` through `Apr 14` material in a study-text format. It is meant to be read straight through like dense lecture notes. The focus is the mathematical content: definitions, updates, theorem statements, derivations, proof targets, and practice problems.

For proof support from the earlier convex-optimization lectures, use the companion note [Convex Optimization Basics for Proofs](/Users/saahith/Desktop/learning-machine/topics/optimization-for-ml/lessons/2026-04-14-convex-optimization-basics-for-proofs.md). That note collects the convexity, smoothness, strong-convexity, subgradient, and projection facts that later proofs often use without re-deriving.

## 1. Stochastic Gradient Descent

Suppose the objective is differentiable but the full gradient is expensive to compute. Instead of using $\nabla f(x)$, we use a random estimator $g(x;\xi)$ satisfying

$$
\mathbb{E}[g(x;\xi)\mid x] = \nabla f(x).
$$

The SGD update is

$$
x^{t+1} = x^t - \eta_t g(x^t;\xi_t).
$$

This is formally identical to gradient descent, but the randomness changes the geometry of convergence. The key identity is

$$
\mathbb{E}\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi)).
$$

This explains the central phenomenon of SGD: even when the iterate is near the optimum and the true gradient is small, the stochastic gradient can still have nontrivial magnitude because of the variance term. Therefore fixed-step SGD typically does not converge exactly; instead it enters a noise-dominated regime.

### 1.1 Convex Nonsmooth SGD

Under the standard assumptions

- $f$ convex,
- the stochastic subgradient is unbiased in expectation,
- the second moment is bounded,

the averaged iterate $\bar x_k$ satisfies

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O(1/\sqrt{k}).
$$

This is slower than the `1/k` rate of deterministic gradient descent on smooth convex problems, but it is the right benchmark when one only has noisy first-order information.

### 1.2 Strongly Convex SGD

When the objective is strongly convex, one can get sharper behavior. With fixed step size,

$$
\mathbb{E}\|x^k - x^*\|^2
\le
(1-\alpha \eta)^k \|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}.
$$

The first term is the deterministic contraction term. The second is the stochastic error floor. The interpretation is:

- early iterations behave roughly like linearly convergent GD,
- later iterations are limited by variance.

If instead one uses a decaying step size and average the iterates appropriately, then

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O((1+\log k)/k).
$$

This is close to `1/k` up to a logarithmic factor.

### 1.3 What To Know

You should be able to state:

- the unbiasedness assumption,
- the SGD update,
- why fixed-step SGD usually does not converge exactly,
- the difference between the convex $1/\sqrt{k}$ regime and the strongly-convex near-`1/k` averaged regime.

## 2. Proximal Gradient and Gradient Mapping

Consider objectives of the form

$$
f(x) = g(x) + h(x),
$$

where $g$ is smooth and $h$ is convex but possibly nonsmooth.

The proximal operator is

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{ \frac{1}{2\eta}\|z-v\|^2 + h(z) \right\}.
$$

The proximal-gradient step is

$$
y_{t+1} = x_t - \eta \nabla g(x_t),
\qquad
x_{t+1} = \operatorname{prox}_{\eta,h}(y_{t+1}).
$$

The gradient mapping is

$$
G_\eta(x)
=
\frac{1}{\eta}\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

This is important because it plays the role of the gradient for the composite problem. When $h=0$, it reduces to the standard gradient.

### 2.1 Strongly Convex Proximal Gradient

If $g$ is $\beta$-smooth and $\alpha$-strongly convex, and one chooses $\eta = 1/\beta$, then with $\kappa = \beta/\alpha$ one gets

$$
\|x^k-x^*\|^2 \le (1-1/\kappa)^k \|x^0-x^*\|^2.
$$

So the structure in $h$ does not destroy the linear rate.

### 2.2 Proof Logic

The usual proof pattern is:

1. apply smoothness to $g$,
2. apply convexity / prox optimality to $h$,
3. combine the two inequalities,
4. express the result through $G_\eta(x)$.

This is a recurring exam pattern. The important thing is not only the final statement, but the decomposition into $g$ and $h$.

## 3. Lagrangians and LP Duality

Start with

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx \le h.
$$

The Lagrangian is

$$
L(x,u,\nu)=c^Tx + u^T(Ax-b) + \nu^T(Gx-h),
\qquad \nu \ge 0.
$$

The dual function is

$$
g(u,\nu) = \inf_x L(x,u,\nu).
$$

Expanding:

$$
L(x,u,\nu)
=
(c + A^T u + G^T \nu)^T x - b^T u - h^T \nu.
$$

Now the dual derivation hinges on one decision: when is the infimum over $x$ finite?

It is finite if and only if

$$
c + A^T u + G^T \nu = 0.
$$

Under that condition,

$$
g(u,\nu) = -b^T u - h^T \nu.
$$

Otherwise

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

### 3.1 Weak Duality

For primal-feasible $x$ and dual-feasible $(u,\nu)$,

$$
g(u,\nu) \le f(x).
$$

This lower-bound interpretation is the foundation for later duality results and for the KKT framework.

### 3.2 What To Practice

You should be able to derive a dual from scratch and explicitly state:

- the Lagrangian,
- the dual function,
- the finiteness condition,
- the final dual problem.

That “finite iff” step is where many exam mistakes happen.

## 4. KKT Conditions

For a convex differentiable problem

$$
\min_x f(x)
\quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0,
$$

with convex $f, h_i$ and affine $\ell_j$, the KKT conditions are:

Primal feasibility:

$$
h_i(x^*) \le 0,\qquad \ell_j(x^*)=0.
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

### 4.1 Sufficiency and Necessity

In the convex differentiable case:

- KKT implies primal and dual optimality,
- if strong duality holds, then optimality implies KKT.

Thus KKT becomes an if-and-only-if criterion under strong duality.

### 4.2 Slater's Condition

Slater gives a standard sufficient condition for strong duality in convex problems: strict feasibility of the inequality constraints. Once strong duality is available, KKT becomes necessary and sufficient.

### 4.3 Nonconvex KKT

If the problem is nonconvex, KKT conditions still define stationary candidates, but they no longer certify global optimality. In that case, one must solve the KKT system and then verify separately which candidate is actually optimal.

This is why a nonconvex KKT question often has two parts:

1. solve the KKT equations,
2. decide what those points actually mean.

## 5. Semidefinite Programming

The vector inequality $x \ge 0$ in LP is replaced by a matrix PSD constraint.

The symmetric matrices form

$$
S^n = \{X \in \mathbb{R}^{n\times n} : X = X^T\},
$$

and the PSD cone is

$$
S_+^n = \{X \in S^n : X \succeq 0\}.
$$

The definition is

$$
X \succeq 0
\iff
v^T X v \ge 0
\quad \forall v.
$$

### 5.1 PSD Facts

If $X \succeq 0$, then every diagonal entry is nonnegative:

$$
X_{ii} = e_i^T X e_i \ge 0.
$$

If $X \succeq 0$ and $X_{ii}=0$, then the entire $i$th row and column are zero.

For block matrices,

$$
\begin{pmatrix}
A & B \\
B^T & C
\end{pmatrix}
\succeq 0
\iff
A \succeq 0
\text{ and }
C - B^T A^{-1} B \succeq 0.
$$

This is the Schur complement criterion.

The matrix inner product is

$$
A \bullet B = \operatorname{Tr}(A^T B).
$$

If $A,B \succeq 0$, then

$$
A \bullet B \ge 0.
$$

Also, in the PSD setting,

$$
A \bullet B = 0
\iff
AB = 0.
$$

### 5.2 Standard SDP Pair

Primal:

$$
\min_X C \bullet X
\quad \text{s.t. } A_i \bullet X = b_i,\; X \succeq 0.
$$

Dual:

$$
\max_{y,S} y^T b
\quad \text{s.t. } S = C - \sum_i y_i A_i,\; S \succeq 0.
$$

The key identity is

$$
C \bullet X - y^T b = S \bullet X \ge 0.
$$

This is the SDP weak-duality proof in one line. The reason the last inequality holds is exactly the PSD inner-product theorem.

### 5.3 Conceptual Role of SDP

An SDP is still a convex optimization problem:

- the objective is linear,
- the equality constraints are linear,
- the PSD cone is convex.

The important point is that SDP generalizes LP while retaining convexity, which is why it becomes powerful for relaxations such as MaxCut.

## 6. Newton Method

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

## 7. ICA and FastICA

After whitening the observed data, the transformed variables satisfy

$$
E[zz^T] = I.
$$

The extracted scalar is

$$
y = w^T z,
\qquad
z,w \in \mathbb{R}^n.
$$

ICA differs from PCA in that it seeks independence rather than mere decorrelation.

In the FastICA lecture, the objective is to maximize kurtosis under a norm constraint:

$$
\max_{\|w\|=1} E[(w^T z)^4] - 3.
$$

The Lagrangian stationarity condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

The resulting fixed-point update is

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w/\|\tilde w\|.
$$

This is a good example of the course’s general theme: derive a constrained optimization problem, write stationarity, then turn the stationarity structure into an algorithm.

## 8. Momentum and Nesterov Acceleration

Polyak momentum is

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

Nesterov acceleration is

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1}).
$$

The only formal difference is the evaluation point of the gradient, but that difference changes the convergence guarantees.

For convex smooth objectives,

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right).
$$

For strongly convex smooth objectives,

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

Compared to ordinary gradient descent in the strongly convex case,

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\frac{\alpha}{\beta}\right)^k\right),
$$

Nesterov acceleration improves the dependence on the condition number.

## 9. AdaGrad, RMSProp, AdaDelta, Adam

AdaGrad:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}.
$$

Its problem is over-shrinking: the denominator keeps growing.

RMSProp:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma)g_{t,i}^2,
\qquad
x_{t+1,i} = x_{t,i} - \frac{\eta}{\sqrt{h_{t,i}+\epsilon}} g_{t,i}.
$$

This replaces the cumulative sum with an exponential moving average.

AdaDelta:

$$
E[g^2]_t = \rho E[g^2]_{t-1} + (1-\rho)g_t^2,
$$

$$
E[\Delta x^2]_t = \rho E[\Delta x^2]_{t-1} + (1-\rho)(\Delta x_t)^2,
$$

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t.
$$

Adam:

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

The bias corrections matter because both $m_t$ and $v_t$ start at zero. Without correction, the first iterations systematically underestimate the moments.

## 10. Advanced Neural-Net Optimization

The Apr 14 lecture is organized around preconditioning:

$$
w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t).
$$

Newton is the classical second-order example. Shampoo extends this idea to matrix and tensor parameters.

For a matrix parameter $W_t$ with gradient $G_t$,

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t,
$$

and

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

The interpretation is that Shampoo acts like a structured AdaGrad, replacing a huge dense preconditioner by left and right matrix factors adapted to the matrix structure.

The stated regret bound is

$$
\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*)
\le
\sqrt{2rD}\operatorname{Tr}(L_T^{1/4})\operatorname{Tr}(R_T^{1/4}).
$$

Under bounded spectral norm of the gradients, the traces scale like $T^{1/4}$, so the regret becomes $O(T^{1/2})$.

SOAP is presented as a refinement of Shampoo that introduces Adam-style adaptation in the eigenbasis of the preconditioner.

AdaNGD is presented as a method connecting online adaptive regret with offline convergence guarantees.

AdamW emphasizes a subtle but important distinction: in ordinary SGD, weight decay and $L_2$ regularization coincide, but in adaptive methods they do not. AdamW therefore decouples the weight-decay step from the adaptive moment scaling:

$weight\ decay = L_2\ regularization$ for standard SGD,

but

$weight\ decay \ne L_2\ regularization$ for adaptive methods.

The decoupled form is

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t.
$$

So the Apr 14 lecture should be understood as extending the adaptive-optimization story into:

- structured preconditioning,
- normalization,
- and the distinction between adaptive scaling and explicit parameter shrinkage.

## 11. Proofs You Should Know

The following proof types are especially exam-relevant.

### 11.1 Show $g(x)=\frac{B}{2}\|x\|^2-f(x)$ is convex when $f$ is $B$-smooth

The clean route is the first-order convexity condition. Compute

$$
\nabla g(x) = Bx - \nabla f(x),
$$

and show

$$
g(y) - g(x) - \nabla g(x)^T(y-x) \ge 0.
$$

Expanding gives exactly the smoothness remainder term for $f$.

### 11.2 Derive the dual of an LP and state the finiteness domain

This is not only an algebra problem. The proof is about recognizing when minimizing a linear function over all $x$ is finite.

### 11.3 Prove SDP weak duality

The central calculation is

$$
C \bullet X - y^T b
=
\left(C-\sum_i y_iA_i\right)\bullet X
=
S \bullet X
\ge 0.
$$

### 11.4 Show the Newton step is a descent direction

Compute the inner product between the gradient and the step. Do not stop at intuition.

### 11.5 Use KKT to solve and verify

For nonconvex examples, solve the KKT system and then separately determine which candidate is actually optimal.

### 11.6 Proximal-gradient descent lemma proofs

Split the proof into the smooth part and the prox part. Most errors here come from failing to separate those roles.

## 12. Practice Problems

### 12.1 Short-answer fundamentals

1. State the SGD update and explain in one paragraph why fixed-step SGD usually does not converge exactly.
2. Define the prox operator and the gradient mapping.
3. Derive the dual of $\min_x c^T x$ subject to $Ax=b$, $Gx \le h$.
4. State all KKT conditions for a convex differentiable constrained problem.
5. Define $X \succeq 0$ and state the Schur complement condition.
6. Write the primal and dual of an SDP in standard form.
7. Write the Newton update for minimization and explain how it differs from root-finding Newton.
8. State the FastICA objective and the fixed-point update.
9. Write Polyak momentum and NAG updates and explain the difference.
10. Write AdaGrad, RMSProp, and Adam updates.

### 12.2 Proof problems

1. Assume $f$ is differentiable and $B$-smooth. Prove that

$$
g(x)=\frac{B}{2}\|x\|^2-f(x)
$$

is convex without using Hessians.

2. Let $X$ be primal-feasible and `(y,S)` dual-feasible for an SDP. Prove weak duality.

3. Suppose $\nabla^2 f(x) \succ 0$. Prove the Newton step is a descent direction.

4. For

$$
\min_x c^T x \quad \text{s.t. } Ax=b,\; Gx \le h,
$$

derive the dual and prove precisely when the dual function is finite.

5. Let $f(x)=g(x)+h(x)$ with $g$ smooth and $h$ convex. Starting from the definition of the prox operator, derive the proximal-gradient update and explain why the gradient mapping is the right stationarity quantity.

### 12.3 KKT practice

1. Solve a convex optimization problem with one inequality and one equality using KKT. Identify the active set explicitly.
2. Solve a nonconvex KKT problem and then verify which KKT point is actually optimal.
3. Give an example where KKT conditions hold but the problem is nonconvex, so the point is not globally optimal.

### 12.4 SDP practice

1. Show that the set of PSD matrices is a convex cone.
2. Prove that if $X \succeq 0$ then $X_{ii}\ge 0$.
3. Prove that if $A,B \succeq 0$ then $A \bullet B \ge 0$.
4. Use the Schur complement to test whether a given block matrix is PSD.
5. Reformulate a simple relaxation problem as an SDP using a Gram matrix.

### 12.5 Newton and ICA practice

1. Derive Newton’s method for minimization from the stationarity equation $\nabla f(x)=0$.
2. Explain why Newton can fail far from the optimum.
3. Compare PCA and ICA mathematically.
4. Starting from the constrained kurtosis objective, derive the FastICA stationarity condition.
5. Explain why whitening gives $E[zz^T]=I$ and why that simplifies ICA.

### 12.6 Adaptive-method practice

1. Explain why AdaGrad can become too conservative.
2. Derive RMSProp from AdaGrad conceptually by replacing cumulative sums with exponential averages.
3. Explain the role of bias correction in Adam.
4. Explain why AdamW is not the same as Adam with $L_2$ regularization.
5. Show how Shampoo can be interpreted as structured preconditioning.

## 13. Final Review Checklist

You should be able to do the following from memory:

1. state every update rule
2. state every rate with the correct converging quantity
3. derive LP duality cleanly
4. write and solve KKT conditions cleanly
5. prove SDP weak duality from the gap identity
6. distinguish Newton root-finding from Newton minimization
7. write the FastICA fixed-point update
8. explain the conceptual differences among Polyak, NAG, AdaGrad, RMSProp, AdaDelta, Adam, Shampoo, and AdamW

If those are stable, you are no longer just memorizing formulas; you understand the mathematical structure of the material.
