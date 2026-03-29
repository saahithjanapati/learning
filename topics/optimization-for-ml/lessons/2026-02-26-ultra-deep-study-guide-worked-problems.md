# Optimization for ML Ultra-Deep Study Guide + Worked Problems

Date: 2026-02-26  
Scope: `Jan13` through `Feb19` optimization lecture transcripts + Quiz 1 / Quiz 2 artifacts.

## How To Use This Guide

This is structured in three layers:
1. Core theory by topic (definitions + assumptions + theorem statements).
2. Worked problems with full reasoning.
3. Exam-style drills with concise answer keys.

If short on time:
1. Read Sections 1 to 4 (foundations + convexity + GD + subgradient/projected).
2. Do Worked Problems 4, 5, 7, 8, 9, 10.
3. Do the rapid drills at the end.

## 0) Master Notation and Assumption Map

Standard constrained form:
$$
\min_x f(x)\quad\text{s.t.}\quad g_i(x)\le 0,\ h_j(x)=0.
$$

Core assumptions used repeatedly:
- Convexity: $f(\theta x + (1-\theta)y)\le \theta f(x)+(1-\theta)f(y)$.
- $\beta$-smoothness:
$$
\|\nabla f(x)-\nabla f(y)\|\le \beta\|x-y\|.
$$
- $\alpha$-strong convexity:
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)+\frac{\alpha}{2}\|y-x\|^2.
$$
- Subgradient:
$$
g\in \partial f(x)\iff f(y)\ge f(x)+g^\top(y-x)\ \forall y.
$$

Know the three target quantities:
- stationarity: $\|\nabla f(x)\|$ or $\|\nabla f(x)\|^2$,
- objective gap: $f(x)-f^*$,
- point error: $\|x-x^*\|^2$.

## 1) Foundations and Problem Formulation (Jan 13)

Must-be-precise vocabulary:
- Feasible point: satisfies all constraints.
- Infeasible problem: no feasible point exists.
- Unbounded minimization: feasible sequence with objective $\to -\infty$.
- Optimal point: feasible point achieving infimum/minimum.

Convex optimization structural conditions:
- objective convex,
- inequalities in convex $\le 0$ form,
- equalities affine.

Practical exam warning:
- A lot of “trick” questions are sign/direction errors (`<=` vs `>=`) and hidden domain constraints.

## 2) Convex Sets + Geometry (Jan 15)

Definition:
$$
x,y\in C,\ \theta\in[0,1]\Rightarrow \theta x+(1-\theta)y\in C.
$$

High-yield closure rules:
- Intersections (countable or uncountable) preserve convexity.
- Affine image/preimage preserve convexity.
- Unions do not preserve convexity in general.

Convex hull:
$$
\operatorname{conv}(C)=\left\{\sum_{i=1}^k\theta_i x_i:\theta_i\ge 0,\ \sum_i\theta_i=1,\ x_i\in C\right\}.
$$

Normal cone:
$$
N_C(x)=\{v: v^\top(y-x)\le 0,\ \forall y\in C\}.
$$

Interpretation:
- At boundary points, normals encode which directions are infeasible at first order.

## 3) Convex Functions + Characterizations (Jan 20)

Equivalent checks for differentiable $f$:
1. Jensen/line-segment inequality.
2. First-order bound:
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x).
$$
3. Second-order condition (twice differentiable):
$$
\nabla^2 f(x)\succeq 0\ \forall x.
$$

Subgradient monotonicity:
$$
(g_x-g_y)^\top(x-y)\ge 0,\quad g_x\in\partial f(x),\ g_y\in\partial f(y).
$$

Max-function subgradient rule:
$$
f(x)=\max_i f_i(x),\quad
\partial f(x)=\operatorname{conv}\Big(\bigcup_{i\in I(x)} \partial f_i(x)\Big),
$$
where $I(x)=\arg\max_i f_i(x)$.

## 4) Matrix/Norm Toolkit (Jan 27)

Vector norms:
$$
\|x\|_1,\ \|x\|_2,\ \|x\|_\infty.
$$

Matrix norms:
- $\|A\|_2=\sigma_{\max}(A)$,
- $\|A\|_F^2=\sum_{i,j}A_{ij}^2=\sum_i\sigma_i^2$,
- induced $\|A\|_1$ and $\|A\|_\infty$ via max col/row sums.

SVD/eigen relations:
- $A=U\Sigma V^\top$,
- eigenvalues of $A^\top A$ are $\sigma_i^2$.

Useful bounds:
$$
\|Ax\|_2\le \|A\|_2\|x\|_2,\qquad
\|A\|_2\le \|A\|_F\le \sqrt{\operatorname{rank}(A)}\,\|A\|_2.
$$

Quadratic objective link:
$$
f(x)=\frac12 x^\top Qx-b^\top x,\ Q\succ 0
$$
gives
$$
\beta=\lambda_{\max}(Q),\ \alpha=\lambda_{\min}(Q),\ \kappa=\beta/\alpha.
$$

## 5) Gradient Descent Deep Dive (Jan 29)

Update:
$$
x^{k+1}=x^k-\eta \nabla f(x^k).
$$

Smooth descent inequality:
$$
f(x-\eta\nabla f(x))\le f(x)-\eta\left(1-\frac{\beta\eta}{2}\right)\|\nabla f(x)\|^2.
$$
So $0<\eta<2/\beta$ gives descent; $\eta=1/\beta$ is common.

Rate statements to keep unmixed:
- Smooth nonconvex:
$$
\min_{0\le t\le k-1}\|\nabla f(x^t)\|^2
\le \frac{2\beta(f(x^0)-f_{\inf})}{k}.
$$
- Smooth convex:
$$
f(x^k)-f^*\le \frac{\beta\|x^0-x^*\|^2}{2k}.
$$
- Smooth strongly convex:
$$
\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2,\quad \eta\le 1/\beta.
$$

Exam pattern:
- Always state both quantity and rate.

## 6) Subgradient Method (Feb 5, Feb 10)

Update:
$$
x^{k+1}=x^k-\eta_k g_k,\quad g_k\in\partial f(x^k).
$$

Core inequality:
$$
f(x^k)-f^*\le g_k^\top(x^k-x^*).
$$

Standard bound (bounded subgradients):
$$
f(\bar x_k)-f^*\le \frac{\|x^0-x^*\|^2}{2\eta k}+\frac{\eta G^2}{2}.
$$
Choose $\eta=\Theta(1/\sqrt{k})$ for $O(1/\sqrt{k})$.

Conceptual difference from GD:
- not guaranteed to be descent each iteration,
- averaged/best-iterate guarantees are standard.

## 7) Projected Subgradient (Feb 12)

Update:
$$
y^{k+1}=x^k-\eta_k g_k,\qquad x^{k+1}=\Pi_C(y^{k+1}).
$$

Projection operator:
$$
\Pi_C(y)=\arg\min_{x\in C}\|x-y\|^2.
$$

Critical facts:
- optimality (obtuse-angle) inequality:
$$
(y-\Pi_C(y))^\top(z-\Pi_C(y))\le 0,\ \forall z\in C;
$$
- non-expansiveness:
$$
\|\Pi_C(a)-\Pi_C(b)\|\le \|a-b\|.
$$

## 8) Optimality Conditions + KKT (Feb 17)

Unconstrained convex:
$$
x^*\text{ optimal}\iff 0\in\partial f(x^*).
$$

Constrained convex differentiable:
$$
\nabla f(x^*)^\top(y-x^*)\ge 0\ \forall y\in C
\iff -\nabla f(x^*)\in N_C(x^*).
$$

Constrained convex nonsmooth:
$$
0\in \partial f(x^*)+N_C(x^*).
$$

KKT for
$$
\min f(x)\ \text{s.t. }g_i(x)\le 0,\ h_j(x)=0:
$$
- primal feasibility,
- dual feasibility $\lambda_i\ge 0$,
- complementary slackness $\lambda_i g_i(x^*)=0$,
- stationarity $0\in\partial_x\mathcal L(x^*,\lambda^*,\nu^*)$.

Slater note:
- In convex problems, strict feasibility (plus equality feasibility) gives strong duality and KKT sufficiency.

## 9) LASSO + Soft Thresholding (Feb 17)

Special case:
$$
\min_x \frac12\|y-x\|^2+\lambda\|x\|_1.
$$

Optimality:
$$
0\in -(y-x^*)+\lambda\,\operatorname{sign}(x^*).
$$

Closed form:
$$
[S_\lambda(y)]_i=\operatorname{sign}(y_i)\max(|y_i|-\lambda,0),\quad x^*=S_\lambda(y).
$$

General lasso certificate:
$$
0\in -A^\top(b-Ax^*)+\lambda\,\operatorname{sign}(x^*).
$$

## 10) SGD Deep Dive (Feb 19)

Update:
$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t),\quad \mathbb E[g(x;\xi)\mid x]=\nabla f(x).
$$

Noise decomposition:
$$
\mathbb E\|g(x,\xi)\|^2=\|\nabla f(x)\|^2+\operatorname{Var}(g(x,\xi)\mid x).
$$

Convex nonsmooth expected rate:
$$
\mathbb E[f(\bar x_k)]-f^*\le \frac{G\sqrt R}{\sqrt k}
$$
for tuned fixed horizon step size.

Strongly convex:
- fixed $\eta$: geometric transient to noise floor,
- $\eta_t=1/(\alpha(t+1))$: averaged gap $\tilde O(1/k)$.

Robbins-Monro style condition:
$$
\sum_t \eta_t=\infty,\quad \sum_t \eta_t^2<\infty.
$$

## 11) Personalized Trap Map (from your quizzes)

High-risk confusion points:
1. Mixing quantity and rate (e.g., writing $O(1/k)$ but not saying what converges).
2. Missing active-set restriction in $\partial\max_i f_i$.
3. Lipschitz function/subgradient bound vs smoothness mix-up.
4. Normal cone and constrained first-order condition phrasing.
5. Composition-convexity rule without monotonicity condition.
6. T/F where a counterexample settles it quickly (`|x|`, nonconvex union, etc.).

## 12) Worked Problems (Full Solutions)

## Problem 1: Convex Hull Definition + Quick Use

Given $C=\{(1,0),(0,1)\}$, describe $\operatorname{conv}(C)$.

Solution:
$$
\operatorname{conv}(C)=\{\theta(1,0)+(1-\theta)(0,1):\theta\in[0,1]\}
=\{(\theta,1-\theta):\theta\in[0,1]\}.
$$
So it is the line segment joining the two points.

## Problem 2: Convexity via Hessian

Check if $f(x)=x^4+2x^2$ is convex on $\mathbb R$.

Solution:
$$
f''(x)=12x^2+4\ge 4>0\ \forall x.
$$
Hence $f$ is strictly convex on $\mathbb R$.

## Problem 3: Nonconvex Counterexample

Show $f(x)=-x^2$ is not convex.

Solution:
Hessian/second derivative is $f''(x)=-2<0$.  
So $f$ is concave, not convex.

## Problem 4: GD Nonconvex Rate Interpretation

Given
$$
\min_{t<k}\|\nabla f(x^t)\|^2\le \frac{C}{k},
$$
what is the scale of gradient norm at best iterate?

Solution:
Take square roots:
$$
\min_{t<k}\|\nabla f(x^t)\|\le \sqrt{C/k}=O(1/\sqrt k).
$$
This is stationarity rate, not objective-gap-to-global-optimum rate.

## Problem 5: GD Convex Gap Bound (Numerical)

Suppose $\beta=10$, $\|x^0-x^*\|^2=5$, $k=100$. Bound $f(x^k)-f^*$.

Solution:
$$
f(x^k)-f^*\le \frac{\beta\|x^0-x^*\|^2}{2k}
=\frac{10\cdot 5}{200}=0.25.
$$

## Problem 6: Projection onto Box

Project $y=(3,-2,0.4)$ onto box $[0,1]^3$.

Solution:
Clip coordinatewise:
$$
\Pi_{[0,1]^3}(y)=(1,0,0.4).
$$

## Problem 7: Subgradient of Max

Let $f_1(x)=x$, $f_2(x)=-x$, $f(x)=\max(f_1(x),f_2(x))=|x|$. Compute $\partial f(0)$.

Solution:
Active set at $x=0$ is both indices $\{1,2\}$.  
$\partial f_1(0)=\{1\}$, $\partial f_2(0)=\{-1\}$.  
So
$$
\partial f(0)=\operatorname{conv}\{-1,1\}=[-1,1].
$$

## Problem 8: KKT Solve (Simple Quadratic + Inequality)

Solve
$$
\min_x \frac12(x-2)^2\quad\text{s.t.}\quad x\ge 0.
$$
Write as $g(x)=-x\le 0$.

Lagrangian:
$$
\mathcal L(x,\lambda)=\frac12(x-2)^2+\lambda(-x),\ \lambda\ge 0.
$$
Stationarity:
$$
\frac{\partial \mathcal L}{\partial x}=x-2-\lambda=0\Rightarrow x=2+\lambda.
$$
Complementary slackness:
$$
\lambda(-x)=0.
$$
If $\lambda>0$, then $x=0$, contradicts $x=2+\lambda>0$.  
Hence $\lambda=0$, so $x=2$ (feasible).  
Optimal solution: $x^*=2$.

## Problem 9: Soft Threshold Example

Solve
$$
\min_x \frac12(y-x)^2+\lambda|x|,\quad y=3,\ \lambda=1.
$$

Solution:
$$
x^*=S_\lambda(y)=\operatorname{sign}(3)\max(3-1,0)=2.
$$

## Problem 10: SGD Mini-batch Variance Intuition

If per-sample gradient noise has variance $\sigma^2$, what happens with batch size $m$ average?

Solution:
For independent samples:
$$
\operatorname{Var}\left(\frac1m\sum_{i=1}^m g_i\right)=\frac{\sigma^2}{m}.
$$
So larger $m$ reduces variance but costs more computation per step.

## Problem 11: Strong Convexity Gives Uniqueness

Why does strong convexity imply unique minimizer?

Solution sketch:
Assume two distinct minimizers $x\neq y$ with same value.  
Strong convexity gives strict inequality at midpoint:
$$
f\Big(\frac{x+y}{2}\Big)\le \frac{f(x)+f(y)}{2}-\frac{\alpha}{8}\|x-y\|^2<f(x),
$$
contradiction to minimality.

## Problem 12: Smoothness vs Lipschitz Confusion Check

True/False: If $f$ is convex and $G$-Lipschitz, then $\nabla f$ is $\beta$-Lipschitz.

Solution:
False in general.  
$G$-Lipschitz controls function slope magnitude/subgradients, not gradient smoothness.

## 13) Rapid Drill Set (with concise keys)

1. Give a convex but nondifferentiable function.  
Answer: $|x|$.

2. State projected subgradient update.  
Answer:
$$
y^{k+1}=x^k-\eta_k g_k,\quad x^{k+1}=\Pi_C(y^{k+1}).
$$

3. For smooth convex GD, what converges at $O(1/k)$?  
Answer: objective gap $f(x^k)-f^*$.

4. For smooth nonconvex GD, what converges at $O(1/k)$?  
Answer: best gradient norm squared $\min_{t<k}\|\nabla f(x^t)\|^2$.

5. Write normal cone definition.  
Answer:
$$
N_C(x)=\{v: v^\top(y-x)\le 0,\forall y\in C\}.
$$

6. State one KKT condition besides stationarity.  
Answer: complementary slackness $\lambda_i g_i(x^*)=0$.

7. Subgradient of $\|x\|_1$ at coordinate $x_i=0$?  
Answer: interval $[-1,1]$ for that coordinate.

8. Why does fixed-step SGD not exactly converge in general?  
Answer: persistent gradient noise/variance creates a noise floor.

## 14) Final 20-Minute Pre-Exam Protocol

1. 5 min: write from memory the three GD rate statements with correct quantities.
2. 5 min: write $0\in\partial f(x^*)+N_C(x^*)$, KKT 4 conditions, and projection lemma.
3. 5 min: do Worked Problems 7, 8, 9 mentally.
4. 5 min: review trap map and rate-table quantity/rate distinction.

If you can reproduce these cleanly, you are in exam-ready shape.
