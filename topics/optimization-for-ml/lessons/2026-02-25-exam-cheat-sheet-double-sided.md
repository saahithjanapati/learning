# Optimization Exam Cheat Sheet (Double-Sided)

Date: 2026-02-25  
Target exam: 2026-02-26  
Sources: Jan13 -> Feb19 optimization lectures + Quiz 1 + Quiz 2 transcripts.

---

## Side A: Core Definitions + Deterministic Methods

## 1) Setup and Convexity

Optimization form:
$$
\min_x f(x) \quad \text{s.t. } g_i(x)\le 0,\; h_j(x)=0
$$

Convex optimization checklist:
- Objective $f$ convex.
- Each inequality function $g_i$ convex (constraint is $g_i(x)\le 0$).
- Equality constraints affine.
- Feasible set convex.

Convex hull:
$$
\operatorname{conv}(C)=\left\{\sum_{i=1}^k \theta_i x_i: x_i\in C,\;\theta_i\ge 0,\;\sum_i\theta_i=1,\;k<\infty\right\}
$$

Normal cone:
$$
N_C(x)=\{v:\; v^\top(y-x)\le 0,\ \forall y\in C\}
$$

Epigraph:
$$
\operatorname{epi}(f)=\{(x,t): f(x)\le t\}
$$
$f$ convex $\Leftrightarrow \operatorname{epi}(f)$ convex.

## 2) Convex Function Characterizations

Definition:
$$
f(\theta x+(1-\theta)y)\le \theta f(x)+(1-\theta)f(y),\quad \theta\in[0,1]
$$

First-order (differentiable):
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)
$$

Subgradient form:
$$
g\in\partial f(x)\ \Longleftrightarrow\ f(y)\ge f(x)+g^\top(y-x),\ \forall y
$$

Monotone subgradients:
$$
(g_x-g_y)^\top(x-y)\ge 0,\quad g_x\in\partial f(x),\ g_y\in\partial f(y)
$$

Twice differentiable sufficient condition:
$$
\nabla^2 f(x)\succeq 0\ \forall x \Rightarrow f \text{ convex}
$$

## 3) Matrix and Norm Facts

Vector norms:
$$
\|x\|_1=\sum_i|x_i|,\quad
\|x\|_2=\sqrt{\sum_i x_i^2},\quad
\|x\|_\infty=\max_i |x_i|
$$

Matrix norms (high-yield):
- Spectral/operator norm: $\|A\|_2=\sigma_{\max}(A)$.
- Frobenius norm: $\|A\|_F=\sqrt{\sum_{i,j}A_{ij}^2}=\sqrt{\sum_i \sigma_i^2}$.
- Induced $1$-norm: max absolute column sum.
- Induced $\infty$-norm: max absolute row sum.

SVD and eigen relations:
- $A=U\Sigma V^\top$, $\sigma_i\ge 0$ singular values.
- Eigenvalues of $A^\top A$ are $\sigma_i^2$.
- If $Ax\neq 0$ and $A^\top A x=\lambda x$, then $AA^\top(Ax)=\lambda (Ax)$.
- For symmetric $A$: singular values are $|\lambda_i(A)|$.

Norm inequalities:
- Triangle inequality: $\|u+v\|\le \|u\|+\|v\|$.
- Cauchy-Schwarz: $|u^\top v|\le \|u\|_2\|v\|_2$.
- Submultiplicative (operator): $\|AB\|_2\le \|A\|_2\|B\|_2$.
- Vector norm comparisons:
$$
\|x\|_\infty \le \|x\|_2 \le \|x\|_1,\quad
\|x\|_1\le \sqrt n\,\|x\|_2,\quad
\|x\|_2\le \sqrt n\,\|x\|_\infty
$$

Optimization links:
- $L_p$ balls are convex iff $p\ge 1$.
- For quadratic $f(x)=\frac12 x^\top Qx-b^\top x$ with symmetric $Q$:
  - $\beta=\lambda_{\max}(Q)$ (smoothness),
  - $\alpha=\lambda_{\min}(Q)$ if $Q\succ 0$ (strong convexity),
  - $\kappa=\beta/\alpha$ controls conditioning.
- GD stable step-size (smooth case): $0<\eta<2/\beta$; common choice $\eta=1/\beta$.

## 4) Gradient Descent (GD)

Update:
$$
x^{k+1}=x^k-\eta \nabla f(x^k)
$$

Smoothness descent lemma:
$$
f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{\beta}{2}\|y-x\|^2
$$

For a GD step $y=x-\eta\nabla f(x)$:
$$
f(x-\eta\nabla f(x))\le f(x)-\eta\left(1-\frac{\beta\eta}{2}\right)\|\nabla f(x)\|^2
$$
So any $0<\eta\le 1/\beta$ guarantees descent.

If $\eta=1/\beta$ (smooth case):
$$
f(x^{k+1})\le f(x^k)-\frac{1}{2\beta}\|\nabla f(x^k)\|^2
$$

Rates to memorize:
- $\beta$-smooth nonconvex:
$$
\min_{0\le t\le k-1}\|\nabla f(x^t)\|^2\le \frac{2\beta(f(x^0)-f_{\inf})}{k}
$$
- $\beta$-smooth convex:
$$
f(x^k)-f(x^*)\le \frac{\beta\|x^0-x^*\|^2}{2k}
$$
- $\alpha$-strongly convex + $\beta$-smooth (linear):
$$
\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2,\quad 0<\eta\le 1/\beta
$$

Condition number:
$$
\kappa=\beta/\alpha
$$

Quadratic deepening ($f(x)=\frac12x^\top Qx-b^\top x$, $Q\succ 0$):
- Error recursion: $e^{k+1}=(I-\eta Q)e^k$, where $e^k=x^k-x^*$.
- Convergence iff spectral radius $\rho(I-\eta Q)<1$ (equiv. $0<\eta<2/\beta$).
- Near-optimal fixed step on quadratics: $\eta^\star=2/(\alpha+\beta)$ with contraction factor $(\kappa-1)/(\kappa+1)$ in suitable norm.

---

## Side B: Nonsmooth + Optimality + SGD + Exam Traps

## 5) Subgradient and Projected Methods

Subgradient update:
$$
x^{k+1}=x^k-\eta_k g_k,\quad g_k\in\partial f(x^k)
$$

Core inequality for convex $f$:
$$
f(x^k)-f(x^*)\le g_k^\top(x^k-x^*)
$$
which is the sign-control that drives rate proofs.

Projected subgradient:
$$
y^{k+1}=x^k-\eta_k g_k,\quad x^{k+1}=\Pi_C(y^{k+1})
$$

Projection:
$$
\Pi_C(y)=\arg\min_{x\in C}\|x-y\|^2
$$

Projection optimality lemma:
$$
(y-\Pi_C(y))^\top(z-\Pi_C(y))\le 0,\ \forall z\in C
$$

Projection is non-expansive:
$$
\|\Pi_C(a)-\Pi_C(b)\|\le \|a-b\|
$$

Deterministic subgradient bound (convex, $\|g_k\|\le G$):
$$
f(\bar x_k)-f(x^*)\le \frac{\|x^0-x^*\|^2}{2\eta k}+\frac{\eta G^2}{2}
$$
Optimal fixed $\eta\propto 1/\sqrt{k}\Rightarrow O(1/\sqrt{k})$.
Common schedules:
- fixed tuned by horizon: $\eta=\Theta(1/\sqrt{k})$,
- diminishing: $\eta_t=\Theta(1/\sqrt{t+1})$ (similar asymptotic behavior).

## 6) Optimality Conditions

Unconstrained:
$$
x^*\text{ optimal } \Longleftrightarrow 0\in \partial f(x^*)
$$
(For differentiable convex: $\nabla f(x^*)=0$.)

Constrained differentiable convex:
$$
\nabla f(x^*)^\top(y-x^*)\ge 0\ \forall y\in C
\Longleftrightarrow
-\nabla f(x^*)\in N_C(x^*)
$$

Constrained convex nonsmooth:
$$
x^* \text{ optimal } \Longleftrightarrow 0\in \partial f(x^*)+N_C(x^*)
$$

KKT (convex case + Slater gives necessity/sufficiency):
- Primal feasibility: $g_i(x^*)\le 0,\ h_j(x^*)=0$.
- Dual feasibility: $\lambda_i\ge 0$.
- Complementary slackness: $\lambda_i g_i(x^*)=0$.
- Stationarity: $0\in \partial f(x^*)+\sum_i\lambda_i\partial g_i(x^*)+\sum_j\nu_j\nabla h_j(x^*)$.

Feasible-direction view (differentiable convex):
- If $x^*$ is interior point of $C$, normal cone is $\{0\}$, so stationarity reduces to $\nabla f(x^*)=0$.
- If $x^*$ is on boundary, $-\nabla f(x^*)$ must lie in outward normal cone.

## 7) LASSO / Soft Thresholding

Special case:
$$
\min_x \frac12\|y-x\|^2+\lambda\|x\|_1
$$

Optimality:
$$
0\in -(y-x^*)+\lambda\,\operatorname{sign}(x^*)
$$

Soft-threshold operator:
$$
[S_\lambda(y)]_i=\operatorname{sign}(y_i)\max(|y_i|-\lambda,0)
$$
and $x^*=S_\lambda(y)$.

General LASSO certificate:
$$
0\in -A^\top(b-Ax^*)+\lambda\,\operatorname{sign}(x^*)
$$

## 8) SGD (Feb 19)

Update:
$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t),\quad \mathbb E[g(x;\xi)\mid x]=\nabla f(x)\ \text{(or }g_x\in\partial f(x)\text{)}
$$

Key fact: fixed step size typically gives a noise floor due to variance.

Moment decomposition reminder:
$$
\mathbb E\|g(x,\xi)\|^2=\|\nabla f(x)\|^2+\operatorname{Var}(g(x,\xi)\mid x)
$$
This is why noise survives near optimum even when $\nabla f(x^*)=0$.

Convex nonsmooth bound (lecture form):
- Assumptions: convex, $\mathbb E\|g(x,\xi)\|^2\le G^2$, $\mathbb E\|x^0-x^*\|^2\le R$.
- Choose $\eta=\sqrt{R/(G^2k)}$.
- Then
$$
\mathbb E[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt{R}}{\sqrt{k}}
$$

Strongly convex SGD:
- Fixed $\eta<1/\alpha$: geometric contraction to an $O(\eta)$ neighborhood.
- $\eta_t=1/(\alpha(t+1))$: averaged objective gap $\tilde O(1/k)$ (often with $\log k$ factor).

Classical diminishing-step sufficient conditions (Robbins-Monro style):
$$
\sum_t \eta_t=\infty,\qquad \sum_t \eta_t^2<\infty
$$
e.g. $\eta_t\propto 1/(t+1)^p$ with $p\in(1/2,1]$.

## 9) High-Risk Quiz Traps

- For smooth nonconvex GD, the converging quantity is $\min_t\|\nabla f(x^t)\|$ (or squared norm), not function gap.
- For smooth convex GD, standard bound is on function gap $f(x^k)-f^*$.
- For $f=\max_i f_i$:
$$
\partial f(x)=\operatorname{conv}\!\Big(\bigcup_{i\in I(x)}\partial f_i(x)\Big),\quad I(x)=\arg\max_i f_i(x)
$$
- Differentiable convex $f$: $\partial f(x)=\{\nabla f(x)\}$.
- “$f$ is Lipschitz with constant $G$” (convex) implies $\|g\|\le G$ for subgradients; this is not the same as $\beta$-smoothness.
- Composition rule: $f\circ g$ convex needs conditions (e.g., outer convex nondecreasing + inner convex).
- Negative gradient is a descent direction when $\nabla f(x)\neq 0$; if gradient is zero, it is not a strict descent direction.

## 10) 60-Second Memory Dump (Write at exam start)

- $N_C(x)=\{v: v^\top(y-x)\le 0,\forall y\in C\}$
- $0\in\partial f(x^*)+N_C(x^*)$
- $\Pi_C$: projection lemma + non-expansive
- GD rates: nonconvex gradient norm $O(1/k)$; convex gap $O(1/k)$; strongly convex linear
- Subgradient/SGD: $O(1/\sqrt{k})$ baseline, strongly convex SGD with decay $\tilde O(1/k)$
- Soft-threshold: $\operatorname{sign}(y)\max(|y|-\lambda,0)$

## 11) Common Derivatives / Subgradients (Fast Lookup)

Gradient:
- $f(x)=\frac12\|Ax-b\|^2 \Rightarrow \nabla f(x)=A^\top(Ax-b)$.
- $f(x)=\frac12\|x-y\|^2 \Rightarrow \nabla f(x)=x-y$.

Subgradient:
- $f(x)=|x|$:
$$
\partial |x|=\begin{cases}\{1\},&x>0\\[-2pt]
[-1,1],&x=0\\[-2pt]
\{-1\},&x<0
\end{cases}
$$
- $f(x)=\|x\|_1$: $\partial\|x\|_1=\operatorname{sign}(x)$ coordinatewise with interval at zero.
- $f(x)=\max_i f_i(x)$ (convex $f_i$):
$$
\partial f(x)=\operatorname{conv}\left(\bigcup_{i\in I(x)}\partial f_i(x)\right),\quad I(x)=\arg\max_i f_i(x)
$$
- Indicator $I_C(x)$ of convex set $C$: $\partial I_C(x)=N_C(x)$ for $x\in C$.

## 12) Common Projections (Euclidean)

- Onto box $[l,u]$: clip each coordinate: $[\Pi_{[l,u]}(y)]_i=\min(\max(y_i,l_i),u_i)$.
- Onto $\ell_2$ ball $\{x:\|x\|\le R\}$:
$$
\Pi(y)=\begin{cases}
y,&\|y\|\le R\\
\frac{R}{\|y\|}y,&\|y\|>R
\end{cases}
$$
- Onto affine hyperplane $\{x:a^\top x=b\}$:
$$
\Pi(y)=y-\frac{a^\top y-b}{\|a\|^2}a
$$
- Onto nonnegative orthant: $[\Pi_{\mathbb R_+^n}(y)]_i=\max(y_i,0)$.

## 13) Method Selection in 5 Seconds

- Unconstrained + smooth + full gradient cheap: GD.
- Unconstrained + smooth + data-sum objective large $n$: SGD / mini-batch SGD.
- Convex nonsmooth: subgradient.
- Constrained convex nonsmooth: projected subgradient.
- Lasso-like $\ell_1$ regularization: use subgradient/KKT or proximal-soft-threshold structure.

## 14) KKT Quick Solve Recipe

For
$$
\min_x f(x)\ \text{s.t. }g_i(x)\le 0,\ h_j(x)=0
$$
do:
1. Write $\mathcal L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_j h_j(x)$.
2. Stationarity: set $0\in\partial_x\mathcal L$ (or $\nabla_x\mathcal L=0$ if smooth).
3. Add primal feasibility.
4. Add dual feasibility $\lambda_i\ge 0$.
5. Add complementary slackness $\lambda_i g_i(x)=0$.
6. Solve case-by-case by active set.

Sanity checks:
- Inactive constraint ($g_i(x^*)<0$) must have $\lambda_i=0$.
- If $\lambda_i>0$, constraint must be tight.

## 15) Mini Proof Skeletons (What to Reproduce Under Time Pressure)

- Convexity via Hessian:
1. Compute $\nabla^2 f(x)$.
2. Show $\nabla^2 f(x)\succeq 0\ \forall x$.
3. Conclude $f$ convex.

- Constrained optimality via normal cone:
1. Start from first-order inequality $\nabla f(x^*)^\top(y-x^*)\ge 0$.
2. Rearrange to $(-\nabla f(x^*))^\top(y-x^*)\le 0,\ \forall y\in C$.
3. Conclude $-\nabla f(x^*)\in N_C(x^*)$.

- Subgradient rate telescoping:
1. Expand $\|x^{t+1}-x^*\|^2$.
2. Bound cross-term with subgradient inequality.
3. Sum over $t$, telescope distances.
4. Divide by $k$, optimize $\eta$.

- Bernoulli inequality from convexity:
1. Let $\phi(t)=(1+t)^r$ ($r\ge 1$), show convex for $t\ge 0$.
2. Use tangent lower bound at $t=0$:
$$
\phi(t)\ge \phi(0)+\phi'(0)t=1+rt
$$

## 16) Last-Minute Precision Reminders

- If asked “state rate,” write both:
1. quantity converging, and
2. asymptotic order.
- Distinguish:
1. Lipschitz function/subgradient bound ($G$), and
2. smoothness ($\beta$-Lipschitz gradient).
- For differentiable convex $f$: $\partial f(x)=\{\nabla f(x)\}$ exactly (singleton).

## 17) Convex Set Rules (Complete Quick List)

- Intersection of convex sets is convex (countable or uncountable intersections).
- Union of convex sets is not convex in general.
- Affine image of a convex set is convex.
- Preimage of a convex set under an affine map is convex.
- Halfspace $\{x:a^\top x\le b\}$ is convex.
- Polyhedron (finite intersection of halfspaces + affine sets) is convex.
- Sublevel set of convex $f$: $\{x:f(x)\le \alpha\}$ is convex.
- Epigraph of convex $f$ is convex.
- Norm balls are convex for norms (in particular $\ell_p$ with $p\ge 1$).
- Convex cone: closed under nonnegative scaling and addition.

## 18) Convex Function Rules (Complete Quick List)

- Nonnegative weighted sum of convex functions is convex.
- Pointwise maximum of convex functions is convex.
- Affine precomposition preserves convexity: $f(Ax+b)$ convex if $f$ convex.
- If $f$ convex and differentiable: first-order inequality holds globally.
- If $f$ is twice differentiable and Hessian PSD everywhere: convex.
- If Hessian PD everywhere: strictly convex.
- Norms are convex functions.
- If $f$ convex and nondecreasing, and $g$ convex, then $f\circ g$ is convex.
- If outer convex but not monotone, $f\circ g$ may fail to be convex.

## 19) Smoothness + Strong Convexity Inequality Bundle

$\beta$-smooth (gradient-Lipschitz):
$$
\|\nabla f(x)-\nabla f(y)\|\le \beta\|x-y\|
$$
and
$$
f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{\beta}{2}\|y-x\|^2
$$

$\alpha$-strong convexity:
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)+\frac{\alpha}{2}\|y-x\|^2
$$

Useful consequences (smooth convex, with minimizer $x^*$):
$$
f(x)-f(x^*)\ge \frac{1}{2\beta}\|\nabla f(x)\|^2
$$
and (strong convex):
$$
f(x)-f(x^*)\ge \frac{\alpha}{2}\|x-x^*\|^2
$$

## 20) Full Rate Table (Algorithm x Assumptions x Quantity)

| Method                | Assumptions                                            | Step size                | Guaranteed quantity                        |
| --------------------- | ------------------------------------------------------ | ------------------------ | ------------------------------------------ |
| GD                    | $\beta$-smooth nonconvex                               | $\eta=1/\beta$           | $\min_{t<k}\|\nabla f(x^t)\|^2=O(1/k)$     |
| GD                    | $\beta$-smooth convex                                  | $\eta=1/\beta$           | $f(x^k)-f^*=O(1/k)$                        |
| GD                    | $\alpha$-strong convex + $\beta$-smooth                | const $\eta\le 1/\beta$  | $\|x^k-x^*\|^2$ contracts linearly         |
| Subgradient           | convex, $\|g_t\|\le G$                                 | $\eta\propto 1/\sqrt{k}$ | $f(\bar x_k)-f^*=O(1/\sqrt{k})$            |
| Projected subgradient | convex + convex constraints                            | $\eta\propto 1/\sqrt{k}$ | averaged gap $O(1/\sqrt{k})$               |
| SGD                   | convex nonsmooth, unbiased grad, bounded second moment | $\eta=\sqrt{R/(G^2k)}$   | $\mathbb E[f(\bar x_k)]-f^*=O(1/\sqrt{k})$ |
| SGD                   | strongly convex                                        | fixed $\eta<1/\alpha$    | geometric transient to noise floor         |
| SGD                   | strongly convex                                        | $\eta_t=1/(\alpha(t+1))$ | averaged gap $\tilde O(1/k)$               |

Interpretation key:
- Table mixes different target quantities: gradient norm, objective gap, and distance-to-optimum.
- Always state explicitly which one you are reporting on the exam.

## 21) SGD Extra Notes (Exam-Friendly)

- Unbiasedness condition:
$$
\mathbb E[g(x;\xi)\mid x]=\nabla f(x)
$$
- Variance is why fixed-step SGD does not generally converge exactly to $x^*$.
- Mini-batch update:
$$
x^{t+1}=x^t-\eta_t\frac1m\sum_{i\in I_t}\nabla f_i(x^t)
$$
- Bigger batch $m$ lowers variance but increases per-iteration compute.
- Incremental/randomized gradient is SGD on finite sums.

## 22) KKT + Dual Variables (Expanded)

Problem:
$$
\min_x f(x)\ \text{s.t. }g_i(x)\le 0,\ h_j(x)=0
$$
Lagrangian:
$$
\mathcal L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_j h_j(x)
$$

KKT system:
- Primal feasibility.
- Dual feasibility $\lambda_i\ge 0$.
- Complementary slackness $\lambda_i g_i(x^*)=0$.
- Stationarity $0\in\partial_x\mathcal L(x^*,\lambda^*,\nu^*)$.

Reading multipliers:
- $\lambda_i=0$ for strictly inactive inequality constraints.
- Positive $\lambda_i$ usually means active/tight inequality and sensitivity to that constraint.

Slater condition (convex inequality constraints):
- If there exists strictly feasible $x$ with $g_i(x)<0$ and equality constraints satisfied, then strong duality holds and KKT conditions are both necessary and sufficient.

## 23) Frequent Objective-Specific Optimality Conditions

Unconstrained smooth:
$$
\nabla f(x^*)=0
$$

Constrained convex smooth:
$$
\nabla f(x^*)^\top(y-x^*)\ge 0,\ \forall y\in C
$$

Constrained convex nonsmooth:
$$
0\in \partial f(x^*)+N_C(x^*)
$$

Lasso special case:
$$
0\in -A^\top(b-Ax^*)+\lambda\,\operatorname{sign}(x^*)
$$

## 24) Useful Algebra / Inequalities for Proof Steps

- Norm expansion:
$$
\|u-v\|^2=\|u\|^2+\|v\|^2-2u^\top v
$$
- Cauchy-Schwarz:
$$
|u^\top v|\le \|u\|\,\|v\|
$$
- Young inequality:
$$
2ab\le a^2+b^2
$$
- Convex Jensen:
$$
f\!\left(\frac1k\sum_{t=0}^{k-1}x^t\right)\le \frac1k\sum_{t=0}^{k-1}f(x^t)
$$
- Telescoping pattern:
$$
\sum_{t=0}^{k-1}(a_t-a_{t+1})=a_0-a_k
$$

## 25) Quiz-Style T/F Bank (Correct Answers)

- “Convex implies differentiable everywhere.” -> False.
- “Operator norm satisfies triangle inequality.” -> True.
- “Intersections of convex sets are convex.” -> True.
- “Unions of convex sets are convex.” -> False (in general).
- “If $f$ convex and differentiable then $\partial f(x)=\{\nabla f(x)\}$.” -> True.
- “For convex $f$, epigraph is convex.” -> True.
- “Negative gradient is a descent direction for differentiable $f$.” -> True when $\nabla f(x)\neq 0$.
- “Strong convexity alone guarantees linear GD rate.” -> Not by itself in your course framing; smoothness + step-size assumptions are used for clean linear-rate result.

## 26) Micro-Templates for Common Short Answers

Convexity proof template:
1. State definition/criterion being used.
2. Plug arbitrary $x,y,\theta$ (or Hessian/first-order test).
3. Conclude in one explicit line.

Rate question template:
1. State assumptions.
2. State update and step size.
3. State converging quantity.
4. State asymptotic order.

Optimality question template:
1. Write stationarity/subgradient condition.
2. Add feasibility conditions.
3. If constrained, include normal cone or KKT terms.

Projection question template:
1. Write projection definition.
2. Use obtuse-angle inequality.
3. Use non-expansiveness if comparing two points.

## 27) “If I Blank Out” Emergency Section

Write these first:
$$
N_C(x)=\{v: v^\top(y-x)\le 0,\ \forall y\in C\}
$$
$$
0\in \partial f(x^*)+N_C(x^*)
$$
$$
x^{k+1}=x^k-\eta_k g_k,\ \ \ x^{k+1}=\Pi_C(x^k-\eta_k g_k)
$$
$$
\partial\max_i f_i(x)=\operatorname{conv}\!\left(\bigcup_{i\in \arg\max f_i(x)}\partial f_i(x)\right)
$$
$$
S_\lambda(y)=\operatorname{sign}(y)\max(|y|-\lambda,0)
$$

## 28) Foundations Vocabulary (Exact Wording)

- Feasible point: satisfies all constraints.
- Infeasible problem: no feasible point exists.
- Unbounded (minimization): objective can go to $-\infty$ along feasible points.
- Optimal point: feasible point achieving smallest objective value.
- Explicit constraints: written directly as inequalities/equalities.
- Implicit constraints: enforced through domain restrictions.
- Convex optimization standard form reminder:
1. convex objective,
2. convex inequality functions in $\le 0$ form,
3. affine equalities.

## 29) Matrix-Norm Extras (If They Ask More Theory)

Dual norm:
$$
\|z\|_*=\sup_{\|x\|\le 1} z^\top x
$$
Examples:
- dual of $\ell_2$ is $\ell_2$,
- dual of $\ell_1$ is $\ell_\infty$,
- dual of $\ell_\infty$ is $\ell_1$.

Matrix dual pairs:
- spectral norm $\leftrightarrow$ nuclear norm,
- Frobenius norm is self-dual.

Trace/Frobenius identities:
$$
\|A\|_F^2=\operatorname{tr}(A^\top A),\qquad
\langle A,B\rangle=\operatorname{tr}(A^\top B)
$$
and
$$
|\langle A,B\rangle|\le \|A\|_F\|B\|_F
$$

Loewner order:
- $A\succeq B \iff A-B\succeq 0$.
- If $A\succeq 0$, then $x^\top A x\ge 0$ for all $x$.

Spectral/Frobenius relation:
$$
\|A\|_2 \le \|A\|_F \le \sqrt{\operatorname{rank}(A)}\,\|A\|_2
$$

More useful bounds:
$$
\|Ax\|_2\le \|A\|_2\|x\|_2,\qquad
\|A^\top A\|_2=\|A\|_2^2
$$

Symmetric PSD reminders:
- $A\succeq 0 \iff x^\top A x\ge 0\ \forall x$.
- If $A\succeq B\succeq 0$, then $x^\top A x\ge x^\top B x$ for all $x$.

## 30) Cone Geometry Extras

Tangent cone (informal exam version): feasible first-order directions from $x$.

Normal cone (already used):
$$
N_C(x)=\{v:\ v^\top(y-x)\le 0,\forall y\in C\}
$$

Polar cone:
$$
K^\circ=\{y:\ y^\top x\le 0,\forall x\in K\}
$$

Supporting hyperplane intuition:
- At boundary point of convex set, a hyperplane can touch the set with the set entirely on one side.

Separation intuition:
- Disjoint convex sets can often be separated by a hyperplane (strict separation needs extra conditions).

## 31) Subgradient Guarantee Variants

For convex $f$, bounded subgradients $\|g_t\|\le G$:

Averaged iterate:
$$
f(\bar x_k)-f^*\le \frac{\|x^0-x^*\|^2}{2\eta k}+\frac{\eta G^2}{2}
$$

Best iterate:
$$
\min_{0\le t\le k-1}\big(f(x^t)-f^*\big)\le \frac{\|x^0-x^*\|^2}{2\eta k}+\frac{\eta G^2}{2}
$$

Pick $\eta\propto 1/\sqrt{k}\Rightarrow O(1/\sqrt{k})$ for either bound.

## 32) SGD Constant-Level Notes

Strongly convex SGD with fixed $\eta<1/\alpha$ (lecture-style form):
$$
\mathbb E\|x^k-x^*\|^2 \le (1-\alpha\eta)^k\|x^0-x^*\|^2 + \text{(noise floor term)}
$$
with noise floor proportional to $\eta$ (exact constant depends on notation for gradient second-moment bound).

Strongly convex SGD with $\eta_t=\frac{1}{\alpha(t+1)}$:
$$
\mathbb E[f(\bar x_k)]-f^* \lesssim \frac{G^2(1+\log k)}{2\alpha k}
$$

Interpretation:
- $1/k$ up to log factor for averaged objective gap,
- variance prevents deterministic linear-to-zero behavior without variance reduction.

## 33) Extra Projection Formula (Simplex)

Probability simplex:
$$
\Delta=\{x\in\mathbb R^n:\ x_i\ge 0,\ \sum_i x_i=1\}
$$
Projection has threshold form:
$$
x_i^*=\max(y_i-\tau,0),\quad \sum_i x_i^*=1
$$
where $\tau$ is chosen so sum constraint holds (found by sorting-based routine).

## 34) Convexity-Preserving Transforms (Deeper)

- Nonnegative weighted sums preserve convexity.
- Pointwise maximum preserves convexity.
- Affine precomposition preserves convexity: $x\mapsto f(Ax+b)$.
- Affine postcomposition preserves convexity if slope is nonnegative.
- Perspective transform:
$$
g(x,t)=t\,f(x/t),\quad t>0
$$
is convex if $f$ is convex.

Fast composition rule:
- outer convex nondecreasing + inner convex -> convex,
- outer convex nonincreasing + inner concave -> convex.

## 35) Local vs Global Optimality (Smooth Case)

Unconstrained differentiable:
- First-order necessary condition: $\nabla f(x^*)=0$.
- Second-order necessary condition: $\nabla^2 f(x^*)\succeq 0$.
- Second-order sufficient condition (strict local min): $\nabla^2 f(x^*)\succ 0$.

Convex consequence:
- Any local minimum is global.
- If strongly convex, minimizer is unique.

## 36) Counterexamples Bank (For T/F and “Disprove”)

- Convex but not differentiable: $f(x)=|x|$.
- Differentiable convex but not strongly convex (global): $f(x)=x^4$.
- Strongly convex but nonsmooth: $f(x)=x^2+|x|$.
- Union of convex sets need not be convex: two disjoint intervals in $\mathbb R$.
- Composition can fail: convex outer + convex inner without monotonicity need not be convex.

## 37) SGD Step-Size Regimes (Practical + Theory)

- Constant step:
  - good fast initial progress,
  - converges to noise neighborhood (bias-variance tradeoff).
- Polynomial decay $\eta_t=\eta_0/(t+1)^p$:
  - $p\in(1/2,1]$ balances convergence and noise suppression,
  - $p=1$ often used in strongly convex theory.
- Very fast decay ($p>1$): may stall too early.
- Very slow decay ($p\le 1/2$): noise may not vanish enough.

Mini-batch scaling rule of thumb:
$$
\operatorname{Var}\!\left(\frac1m\sum_{i\in I_t} g_i\right)\approx \frac{1}{m}\operatorname{Var}(g_i)
$$

## 38) Exam Answering Patterns (Depth Upgrade)

When asked for a theorem statement, include:
1. assumptions,
2. exact conclusion (quantity + rate),
3. any step-size condition.

When asked “prove/disprove”:
1. choose correct criterion,
2. one clean computation/counterexample,
3. explicit concluding line.

When asked about an algorithm:
1. update rule,
2. assumptions,
3. guarantee target (gap/gradient norm/distance),
4. complexity order in $k$.

## 39) Basics Crash Pack (If You Feel Underprepared)

Core words:
- Feasible: satisfies all constraints.
- Infeasible: no feasible point exists.
- Optimal: best feasible objective value.
- Local minimum: best only in a neighborhood.
- Global minimum: best over all feasible points.
- Convex set: line segment between any two points stays in set.
- Convex function: chord lies above graph.
- Strongly convex: convex + quadratic curvature floor.
- Smooth: gradient does not change too fast (Lipschitz gradient).
- Subgradient: generalized slope for nonsmooth convex functions.

One-line examples:
- Convex but nonsmooth: $|x|$.
- Smooth but not convex: $-x^2$.
- Convex + smooth: $x^2$.
- Strongly convex + smooth: $x^2+\|x\|_2^2$ (quadratic forms with $Q\succ 0$).

## 40) Absolute Must-Know “If Asked X, Write Y”

- “Define convex hull” ->
$$
\operatorname{conv}(C)=\left\{\sum_{i=1}^k\theta_i x_i:\theta_i\ge 0,\ \sum_i\theta_i=1,\ x_i\in C\right\}
$$

- “Define normal cone” ->
$$
N_C(x)=\{v:\ v^\top(y-x)\le 0,\ \forall y\in C\}
$$

- “First-order convexity condition” ->
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)
$$

- “Optimality for constrained convex (nonsmooth)” ->
$$
0\in \partial f(x^*)+N_C(x^*)
$$

- “Projected subgradient step” ->
$$
y^{k+1}=x^k-\eta_k g_k,\quad x^{k+1}=\Pi_C(y^{k+1})
$$

- “GD nonconvex smooth rate” ->
$$
\min_{t<k}\|\nabla f(x^t)\|^2=O(1/k)
$$

- “GD convex smooth rate” ->
$$
f(x^k)-f^*=O(1/k)
$$

- “Subgradient / SGD convex nonsmooth baseline” ->
$$
O(1/\sqrt{k})
$$

## 41) Mini Worked Examples (Fast)

Subgradient of $|x|$:
$$
\partial |x|=\{1\}\ (x>0),\quad [-1,1]\ (x=0),\quad \{-1\}\ (x<0)
$$

Subgradient of max:
$$
f(x)=\max(f_1(x),f_2(x)),\ I(x)=\arg\max_i f_i(x)
$$
$$
\partial f(x)=\operatorname{conv}\left(\bigcup_{i\in I(x)}\partial f_i(x)\right)
$$

Projection onto nonnegative orthant:
$$
[\Pi_{\mathbb R_+^n}(y)]_i=\max(y_i,0)
$$

Projection onto $\ell_2$ ball radius $R$:
$$
\Pi(y)=
\begin{cases}
y,& \|y\|\le R\\
\frac{R}{\|y\|}y,& \|y\|>R
\end{cases}
$$

Convexity check via Hessian:
- If $\nabla^2 f(x)\succeq 0$ for all $x$, declare convex.
- If there exists $x$ with negative eigenvalue, not convex.

## 42) Basic Proof Recipe Bank

To prove convex set:
1. Pick $x,y\in C$, $\theta\in[0,1]$.
2. Show $\theta x+(1-\theta)y\in C$ using constraints.
3. Conclude convex.

To prove convex function (first-order):
1. Write target inequality $f(y)\ge f(x)+\nabla f(x)^\top(y-x)$.
2. Derive/check from known theorem or Hessian PSD.
3. State “hence convex.”

To disprove convexity:
1. Find two points and $\theta$ violating definition, or
2. Find Hessian with negative direction at some point.

To answer “rate” questions:
1. State assumptions.
2. State step-size.
3. State exact converging quantity.
4. State big-O.

## 43) Night-Before Emergency Drill (45 Minutes)

1. 10 min: memorize 8 formulas in Section 40.
2. 10 min: do 3 mini examples from Section 41 without notes.
3. 10 min: write one constrained optimality/KKT answer from memory.
4. 10 min: write GD vs Subgradient vs SGD rate table from memory.
5. 5 min: scan traps and units/quantity wording.
