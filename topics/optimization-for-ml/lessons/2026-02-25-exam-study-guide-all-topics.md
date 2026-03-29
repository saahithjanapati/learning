# Optimization Exam Study Guide (All Topics, Detailed)

Date: 2026-02-25  
Exam target: 2026-02-26  
Coverage basis: optimization lectures (`Jan13` through `Feb19`) + graded quizzes (`Quiz 1`, `Quiz 2`) + prior in-depth guides.

## 1) Scope Map (What Your Materials Cover)

Lecture flow:
1. `Jan13_Intro` and `Jan13_Logistics`: optimization language, standard problem forms.
2. `Jan15_ConvexSets`: convex set geometry and operations.
3. `Jan20_ConvexFunctions`: function convexity and first/second-order tests.
4. `Jan27_matrix_norms`: eigen/singular-value toolkit, induced norms.
5. `Jan29_GD`: gradient descent derivation + smooth/strongly-convex rates.
6. `Feb5_subgradients`: subdifferentials and nonsmooth convex analysis.
7. `Feb10_subgradient-method`: algorithm + convergence guarantees.
8. `Feb12-projected-subgradient`: constraints via projection.
9. `Feb17_Optimiality_Conditions`: constrained optimality, normal cone, lasso/soft-threshold.
10. `Feb19_stoch_gd`: SGD setup, step-size effects, core rates.

Quiz evidence:
- Quiz 1 (`submission_385380809`): foundations/convexity/normal-cone proof precision gaps.
- Quiz 2 (`submission_391256496`): rate-statement precision + subgradient definition details.

## 2) Foundations and Problem Formulation (Jan 13)

Standard form:
$$
\min_x f(x) \quad \text{s.t. } g_i(x)\le 0,\ h_j(x)=0
$$

Vocabulary you need to use precisely:
- Feasible point: satisfies all constraints.
- Infeasible problem: no feasible points.
- Unbounded objective: feasible sequence with objective $\to -\infty$.
- Optimal solution: feasible point with minimal objective.

Convex optimization form requires:
- Convex objective.
- Convex inequality functions with $\le 0$ form.
- Affine equalities.

Common exam trick: constraint direction/sign mistakes.  
Fast check: if you rewrite a convex inequality as $g(x)\ge 0$, you probably broke the standard convex form.

## 3) Convex Sets (Jan 15)

Definition:
$$
x,y\in C,\ \theta\in[0,1]\Rightarrow \theta x+(1-\theta)y\in C
$$

High-yield examples:
- Affine sets, halfspaces, polyhedra, norm balls with $p\ge 1$.
- Intersections (countable or uncountable) of convex sets remain convex.
- Unions are generally not convex.

Convex hull:
$$
\operatorname{conv}(C)=\left\{\sum_{i=1}^k\theta_i x_i:\theta_i\ge 0,\sum_i\theta_i=1,\ x_i\in C\right\}
$$

Normal cone:
$$
N_C(x)=\{v:\ v^\top(y-x)\le 0,\ \forall y\in C\}
$$
Interpretation: feasible first-order directions are orthogonal/opposite to outward normal directions.

## 4) Convex Functions (Jan 20)

Equivalent characterizations (differentiable):
1. Jensen/line-segment definition.
2. First-order lower-bound inequality:
$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x)
$$
3. Twice differentiable sufficient/characterization:
$$
\nabla^2 f(x)\succeq 0\ \forall x
$$

Strict convexity:
- Gives unique minimizer (if minimizer exists).

Subgradient:
$$
g\in \partial f(x)\iff f(y)\ge f(x)+g^\top(y-x)\ \forall y
$$

Monotonicity of subgradients:
$$
(g_x-g_y)^\top(x-y)\ge 0,\quad g_x\in\partial f(x), g_y\in\partial f(y)
$$

Composition rule caveat:
- Convex outer + convex inner is not always convex.
- Safe sufficient pattern: outer convex and nondecreasing + inner convex.

## 5) Matrix Norm / Spectral Toolkit (Jan 27)

Must-know identities:
- $\|A\|_2=\sigma_{\max}(A)$.
- $\|A\|_F^2=\sum_i \sigma_i^2$.
- Eigenvalues of $A^\top A$ are squared singular values of $A$.
- If $A$ symmetric: singular values are $|\lambda_i(A)|$.

Optimization relevance:
- Smoothness constants often come from spectral norms/Hessian bounds.
- Conditioning:
$$
\kappa=\beta/\alpha
$$
controls practical convergence speed of first-order methods.

## 6) Gradient Descent Core (Jan 29)

Update:
$$
x^{k+1}=x^k-\eta\nabla f(x^k)
$$

Smoothness descent lemma:
$$
f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{\beta}{2}\|y-x\|^2
$$

With $\eta=1/\beta$:
$$
f(x^{k+1})\le f(x^k)-\frac{1}{2\beta}\|\nabla f(x^k)\|^2
$$

Rate statements you must keep unmixed:
- Smooth non-convex:
$$
\min_{0\le t\le k-1}\|\nabla f(x^t)\|^2\le \frac{2\beta(f(x^0)-f_{\inf})}{k}
$$
- Smooth convex:
$$
f(x^k)-f(x^*)\le \frac{\beta\|x^0-x^*\|^2}{2k}
$$
- Smooth strongly convex:
$$
\|x^k-x^*\|^2\le (1-\alpha\eta)^k\|x^0-x^*\|^2,\quad \eta\le 1/\beta
$$

Exam precision note:
- Question asks for “rate” and “what quantity converges.” Always state both.

## 7) Nonsmooth Convex Optimization (Feb 5, Feb 10, Feb 12)

Subgradient method:
$$
x^{k+1}=x^k-\eta_k g_k,\quad g_k\in\partial f(x^k)
$$

Unlike smooth GD:
- Iterates need not be monotone in objective.
- Best-iterate or averaged-iterate analysis is common.

Canonical deterministic bound:
$$
f(\bar x_k)-f(x^*)\le \frac{\|x^0-x^*\|^2}{2\eta k}+\frac{\eta G^2}{2}
$$
Choose $\eta\sim 1/\sqrt{k}$ for $O(1/\sqrt{k})$.

Projected subgradient:
$$
y^{k+1}=x^k-\eta_k g_k,\quad x^{k+1}=\Pi_C(y^{k+1})
$$

Projection facts:
- $\Pi_C(y)=\arg\min_{x\in C}\|x-y\|^2$.
- $(y-\Pi_C(y))^\top(z-\Pi_C(y))\le 0,\ \forall z\in C$.
- Non-expansive: $\|\Pi_C(a)-\Pi_C(b)\|\le \|a-b\|$.

## 8) Optimality Conditions and Lasso (Feb 17)

Unconstrained optimality:
$$
x^* \text{ optimal } \iff 0\in \partial f(x^*)
$$

Constrained differentiable convex:
$$
\nabla f(x^*)^\top(y-x^*)\ge 0,\ \forall y\in C
\iff
-\nabla f(x^*)\in N_C(x^*)
$$

Constrained convex nonsmooth:
$$
x^*\text{ optimal in }C \iff 0\in \partial f(x^*)+N_C(x^*)
$$

LASSO special case:
$$
\min_x \frac12\|y-x\|^2+\lambda\|x\|_1
$$
gives soft-thresholding:
$$
x^*=S_\lambda(y),\quad [S_\lambda(y)]_i=\operatorname{sign}(y_i)\max(|y_i|-\lambda,0)
$$

General lasso certificate:
$$
0\in -A^\top(b-Ax^*)+\lambda\operatorname{sign}(x^*)
$$

Use this to verify candidate optimality coordinatewise.

## 9) Stochastic Gradient Descent (Feb 19)

Setup:
$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t),\quad \mathbb E[g(x;\xi)\mid x]=\nabla f(x)
$$

Main intuition:
- Stochastic gradients are cheaper but noisy.
- Fixed $\eta$ often yields fast transient progress but nonzero asymptotic error ball.
- Decaying $\eta_t$ is used for actual convergence.

Convex nonsmooth theorem (lecture style):
- If $\mathbb E\|g(x,\xi)\|^2\le G^2$, $\mathbb E\|x^0-x^*\|^2\le R$, and $\eta=\sqrt{R/(G^2k)}$, then
$$
\mathbb E[f(\bar x_k)]-f(x^*)\le \frac{G\sqrt{R}}{\sqrt{k}}
$$

Strongly convex SGD:
- Fixed $\eta<1/\alpha$: geometric term + noise floor.
- $\eta_t=1/(\alpha(t+1))$: averaged objective gap approximately $\tilde O(1/k)$ (typically with $\log k$).

Mini-batch:
- Larger batch $\Rightarrow$ lower variance, higher per-step cost.

## 10) Quiz Postmortem: What To Fix Before Exam

## A) Quiz 1-style misses

1. Convex hull definition: include finite convex combinations, nonnegative weights, sum to 1.
2. $L_p$ convexity: true only for $p\ge 1$.
3. Normal cone definition: use $v^\top(y-x)\le 0$ for all $y\in C$.
4. First-order convexity characterization: use gradient lower-bound inequality, not Jensen alone when asked for first-order form.
5. Composition convexity: requires monotonicity assumptions.
6. Bernoulli proof style: show convexity of $(1+t)^r$, then tangent-line lower bound at $t=0$:
$$
(1+t)^r\ge 1+rt,\quad t\ge 0,\ r\ge 1
$$
7. Subgradient monotonicity statement: memorize exact inequality.

## B) Quiz 2-style misses

1. For $f=\max_i f_i$, restrict to active set $I(x)=\arg\max_i f_i(x)$:
$$
\partial f(x)=\operatorname{conv}\left(\bigcup_{i\in I(x)}\partial f_i(x)\right)
$$
2. Rate statements: include both quantity and rate.
3. Lipschitz vs smooth confusion:
- $G$-Lipschitz convex $\Rightarrow \|g\|\le G$ for subgradients.
- $\beta$-smooth $\Rightarrow$ gradient Lipschitz.
4. Hessian convexity sufficiency:
- PD implies convex.
- PSD implies convex.
5. Negative gradient descent-direction nuance:
- If $\nabla f(x)\neq 0$, then $-\nabla f(x)$ is strict descent direction.
- If $\nabla f(x)=0$, not strict descent direction.

## 11) Compact KKT Recap (if Exam Includes It)

For
$$
\min_x f(x)\ \text{s.t.}\ g_i(x)\le 0,\ h_j(x)=0
$$
Lagrangian:
$$
\mathcal L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_j h_j(x)
$$

KKT:
- Primal feasibility.
- Dual feasibility $\lambda_i\ge 0$.
- Complementary slackness $\lambda_i g_i(x^*)=0$.
- Stationarity $0\in \partial_x \mathcal L(x^*,\lambda^*,\nu^*)$.

Convex + Slater:
- KKT necessary and sufficient.

## 12) Exam-Eve Plan (Tonight + Tomorrow)

Tonight (75 to 120 minutes):
1. 20 min: memorize rate table and quantity-rate pairs.
2. 20 min: write from memory normal cone, constrained optimality, projected update.
3. 20 min: run through Quiz 1/2 miss list and correct each statement aloud.
4. 15 to 60 min: one timed mixed drill (definitions + one short proof + one rate question).

Morning of exam (30 to 45 minutes):
1. Rewrite the 60-second memory dump from the cheat sheet.
2. Rehearse 5 high-risk items:
- max-subgradient active set,
- nonconvex GD converges in gradient norm,
- smooth convex GD converges in function gap,
- constrained optimality $0\in\partial f+N_C$,
- soft-threshold formula.

## 13) 12 Recall Prompts (No Notes)

1. State convex hull definition exactly.
2. Define normal cone exactly.
3. State first-order convexity inequality.
4. State monotonicity of subgradients.
5. Give smooth nonconvex GD rate and quantity.
6. Give smooth convex GD rate and quantity.
7. Give strongly-convex GD linear form.
8. Write projected subgradient update.
9. State projection optimality lemma.
10. State constrained convex optimality condition using $N_C$.
11. State $\partial\max_i f_i$ formula with active set.
12. State SGD convex nonsmooth rate with chosen $\eta$.

If you can do all 12 cleanly, your exam floor is much higher.
