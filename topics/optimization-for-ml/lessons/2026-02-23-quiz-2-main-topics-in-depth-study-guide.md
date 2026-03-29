# Optimization Quiz 2 In-Depth Study Guide (Main Topics Before Quiz 2)

Date: `2026-02-23`  
Topic: `Optimization for ML`  
Focus: main Quiz 2 topics only, with emphasis on high-yield proofs, formulas, and common mistake fixes from prior review sessions.

## Scope Locked for Quiz 2

Covered in this guide:
- Gradient descent (GD) update logic and one-step descent inequality.
- Smoothness, strong convexity, Hessian language, and condition number.
- Convergence-rate headlines and when each one applies.
- Subgradient definitions and active-branch rules.
- Subgradient method assumptions and guarantees.
- Projection geometry and projected subgradient update.
- Optimality conditions and KKT solve workflow.

Not the focus here:
- Extended SGD topics beyond the core pre-Quiz-2 scope.

## How to Use This Guide

1. Read each section once for concept map.
2. Reproduce the boxed formulas from memory.
3. Do the short checks without notes.
4. Use the trap checklist before timed practice.

## 1) Gradient Descent Core

Base update:
$$
x_{t+1}=x_t-\eta_t \nabla f(x_t).
$$

Interpretation:
- Gradient points uphill.
- Negative gradient points downhill.
- Step size $\eta_t$ controls how far you move.

For an $L$-smooth differentiable function:
$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{L}{2}\|y-x\|^2.
$$

Plugging in the GD step $y=x_t-\eta\nabla f(x_t)$ gives:
$$
f(x_{t+1})\le f(x_t)-\left(\eta-\frac{L\eta^2}{2}\right)\|\nabla f(x_t)\|^2.
$$

Key consequence:
- Descent-safe interval: $0<\eta<2/L$.
- Common conservative choice: $0<\eta\le 1/L$.

Important precision:
- This one-step inequality needs differentiability + smoothness.
- Convexity is not required for this one-step descent statement.

## 2) Smoothness, Strong Convexity, Hessian, and Conditioning

Strong convexity inequality:
$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac{\mu}{2}\|y-x\|^2.
$$

Twice-differentiable class language:
$$
\mu I \preceq \nabla^2 f(x)\preceq L I.
$$

Interpretation:
- $L$ is an upper curvature bound (too large can destabilize large steps).
- $\mu$ is a lower curvature bound (larger means better curvature floor).

Condition number:
$$
\kappa=\frac{L}{\mu}.
$$

What to remember:
- Smaller $\kappa$ usually means faster strongly-convex GD.
- Larger $L$ narrows the stable step-size interval.
- Smaller $\mu$ worsens conditioning.

Quadratic template (very common on quizzes):
$$
f(x)=\frac12 x^TQx+b^Tx+c,\quad Q=Q^T.
$$
$$
\nabla f(x)=Qx+b,\quad \nabla^2f(x)=Q.
$$
- $L=\lambda_{\max}(Q)$
- $\mu=\lambda_{\min}(Q)$ (if strictly positive)
- Stable headline: $0<\eta<2/\lambda_{\max}(Q)$

## 3) Rate Table You Must Not Mix Up

1. Smooth convex GD (function gap):  
$f(x_T)-f(x^*)=O(1/T)$.

2. Smooth strongly convex GD:  
geometric/linear rate, often written $(1-c)^T$ for some $0<c<1$.

3. Smooth nonconvex GD (stationarity metric):  
$\min_{t<T}\|\nabla f(x_t)\|=O(1/\sqrt{T})$ style.

4. Convex non-smooth subgradient method:  
$O(1/\sqrt{T})$ best-iterate/average-iterate style.

Fast memory hook:
- "$1/T$ belongs to smooth convex GD."
- "$1/\sqrt{T}$ belongs to non-smooth subgradient."

## 4) Subgradient Essentials

Definition for convex $f$:
$$
f(y)\ge f(x)+g^T(y-x),\quad \forall y,\; g\in\partial f(x).
$$

Differentiable convex case:
$$
\partial f(x)=\{\nabla f(x)\}.
$$

Canonical example:
$$
\partial|x|=
\begin{cases}
\{1\}, & x>0 \\
[-1,1], & x=0 \\
\{-1\}, & x<0
\end{cases}
$$

Max-of-affines rule:
- Unique active branch at $x$ -> gradient of that branch is the valid subgradient.
- Multiple active branches -> convex combination of active gradients.

Common error to avoid:
- Do not pick slope from an inactive branch.

## 5) Subgradient Method (Assumptions and Guarantee Form)

Update:
$$
x_{t+1}=x_t-\eta_t g_t,\quad g_t\in\partial f(x_t).
$$

Core assumptions used in proofs:
- Convex objective.
- Bounded subgradients: $\|g_t\|\le G$.
- Bounded initial distance to optimum: $\|x_0-x^*\|\le R$.
- Valid step-size schedule.

Typical best-iterate bound:
$$
f(x_{\text{best}})-f(x^*)
\le
\frac{R^2+G^2\sum_{t=0}^{T-1}\eta_t^2}{2\sum_{t=0}^{T-1}\eta_t}.
$$

Why this matters:
- Last iterate may oscillate.
- Best-iterate or averaged iterate is the standard guarantee target.

Step-size families to recognize:
- Horizon-tuned constant (if $T$ known): $\eta \propto 1/\sqrt{T}$.
- Diminishing: often $\eta_t\propto 1/\sqrt{t}$.
- Polyak step (if $f^*$ known):  
$$
\eta_t=\frac{f(x_t)-f^*}{\|g_t\|^2}.
$$

## 6) Projection and Projected (Sub)Gradient

Projection onto convex set $C$:
$$
\Pi_C(z)=\arg\min_{u\in C}\|u-z\|^2.
$$

Projected update:
$$
y_{t+1}=x_t-\eta_t d_t,\quad x_{t+1}=\Pi_C(y_{t+1}),
$$
where $d_t=\nabla f(x_t)$ (smooth) or $d_t\in\partial f(x_t)$ (non-smooth).

Two high-yield properties:
1. Projection optimality inequality:
$$
p=\Pi_C(z)\;\Rightarrow\;\langle z-p,\;u-p\rangle\le 0,\ \forall u\in C.
$$
2. Non-expansiveness:
$$
\|\Pi_C(a)-\Pi_C(b)\|\le \|a-b\|.
$$

Exam-use interpretation:
- If tentative step is feasible, projection does nothing.
- Projection step is what keeps iterate feasible under constraints.

## 7) Optimality Conditions and KKT

Unconstrained smooth:
$$
\nabla f(x^*)=0.
$$

Unconstrained convex non-smooth:
$$
0\in\partial f(x^*).
$$

Constrained convex first-order condition:
$$
\nabla f(x^*)^T(x-x^*)\ge 0,\quad \forall x\in C.
$$

KKT setup:
$$
\min_x f(x)\quad\text{s.t.}\quad g_i(x)\le 0,\; h_j(x)=0.
$$
$$
\mathcal{L}(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_j h_j(x).
$$

KKT conditions:
1. Primal feasibility: $g_i(x^*)\le 0,\ h_j(x^*)=0$.
2. Dual feasibility: $\lambda_i\ge 0$.
3. Stationarity:
$$
\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)+\sum_j\nu_j\nabla h_j(x^*)=0.
$$
4. Complementary slackness:
$$
\lambda_i g_i(x^*)=0.
$$

Critical edge case:
- If $g_i(x^*)=0$ (active), then $\lambda_i$ can be zero or positive.
- If $g_i(x^*)<0$ (inactive), then $\lambda_i$ must be zero.

Practical KKT solve recipe:
1. Rewrite every inequality as $g_i(x)\le 0$.
2. Build scalar Lagrangian first.
3. Write all four KKT condition blocks.
4. Case split by activity and slackness.
5. Keep only candidates satisfying all conditions.

## 8) Proof Skeletons to Reproduce Quickly

### A) Smooth GD to descent lemma

1. Start from smoothness inequality.
2. Substitute GD update.
3. Expand inner product and norm square.
4. Collect $\|\nabla f(x_t)\|^2$ coefficient.
5. Infer range where coefficient is positive.

### B) Telescoping pattern in rate proofs

Target pattern:
$$
\sum_{t=0}^{T-1}(A_t-A_{t+1})=A_0-A_T.
$$

Use:
- Set $A_t$ as squared distance to optimum.
- Sum one-step inequalities.
- Divide by total step weight to get final rate form.

### C) Projected method proof insertion

1. Analyze tentative point $y_{t+1}$.
2. Apply projection non-expansiveness to move from $y_{t+1}$ to $x_{t+1}$.
3. Recover same telescoping structure as unconstrained case.

## 9) Personalized Trap Checklist (Based on Prior Sessions)

1. Rate swap trap:
- Fix: say out loud "$1/T$ smooth convex GD, $1/\sqrt{T}$ convex non-smooth subgradient."

2. KKT slackness edge-case trap:
- Fix: active constraint does not force strictly positive multiplier.

3. Stationarity syntax trap:
- Fix: stationarity uses gradients of constraints, not raw constraint functions.

4. Max-of-affines trap:
- Fix: only active branches contribute valid subgradients.

5. Smoothness language trap:
- Fix: distinguish one-step descent (needs smoothness) from global gap rates (need convexity assumptions).

## 10) Short Pre-Quiz Drill (No Notes)

Answer each in one sentence or one formula.

1. Write GD update and descent-safe step-size interval.
2. State smoothness inequality.
3. State strong convexity inequality.
4. Give all four KKT conditions.
5. State subgradient definition.
6. Write $\partial |x|$ at $x=0$.
7. State convex non-smooth subgradient rate headline.
8. State smooth convex GD rate headline.
9. State projection definition.
10. State one projection property used in proofs.

## 11) Suggested Final Prep Order (90 Minutes)

1. 20 min: sections 1-3 (GD, smoothness/strong-convexity, rates).
2. 20 min: sections 4-6 (subgradient, projection, KKT mechanics).
3. 20 min: redo section 8 proof skeletons from memory.
4. 20 min: section 10 no-notes drill.
5. 10 min: section 9 trap checklist + formula dump.

## Sources Used

- `learning_system/PROGRESS_LOG.md`
- `learning_system/SKILL_GRAPH.md`
- `topics/optimization-for-ml/lessons/2026-02-17-quiz-2-gap-audit.md`
- `topics/optimization-for-ml/lessons/2026-02-17-quiz-2-cheat-sheet.md`
- `topics/optimization-for-ml/lessons/2026-02-17-quiz-2-class-bridge-notes.md`
- `topics/optimization-for-ml/lessons/2026-02-17-session-recap-quiz2-interactive.md`
- `topics/optimization-for-ml/lessons/2026-02-17-session-recap-quiz2-review-02.md`
- `topics/optimization-for-ml/lessons/2026-02-19-quiz-2-study-guide-concise-and-deep.md`
- `topics/optimization-for-ml/lessons/2026-02-19-chat-clarification-smoothness-descent.md`
