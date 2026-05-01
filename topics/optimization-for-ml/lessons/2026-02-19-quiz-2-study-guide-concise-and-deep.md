# Optimization Quiz 2 Study Guide (Concise + In-Depth)

Date: `2026-02-19`  
Goal: one fast review doc before a ~25-minute quiz (T/F, MCQ, short answer)

Scope mined from your materials:
- [materials/processed/optimization-for-ml/Jan29_GD.md](../../../materials/processed/optimization-for-ml/Jan29_GD.md)
- [materials/processed/optimization-for-ml/Feb5_subgradients.md](../../../materials/processed/optimization-for-ml/Feb5_subgradients.md)
- [materials/processed/optimization-for-ml/Feb10_subgradient-method.md](../../../materials/processed/optimization-for-ml/Feb10_subgradient-method.md)
- [materials/processed/optimization-for-ml/Feb12-projected-subgradient.md](../../../materials/processed/optimization-for-ml/Feb12-projected-subgradient.md)
- [topics/optimization-for-ml/lessons/2026-02-15-quiz-2-core-concepts.md](2026-02-15-quiz-2-core-concepts.md)
- [topics/optimization-for-ml/lessons/2026-02-16-quiz-2-mini-textbook.md](2026-02-16-quiz-2-mini-textbook.md)
- [topics/optimization-for-ml/lessons/2026-02-17-quiz-2-cheat-sheet.md](2026-02-17-quiz-2-cheat-sheet.md)
- [topics/optimization-for-ml/lessons/2026-02-17-quiz-2-class-bridge-notes.md](2026-02-17-quiz-2-class-bridge-notes.md)
- [topics/optimization-for-ml/lessons/2026-02-17-quiz-2-gap-audit.md](2026-02-17-quiz-2-gap-audit.md)
- [topics/optimization-for-ml/lessons/2026-02-17-quiz-2-problem-set-01.md](2026-02-17-quiz-2-problem-set-01.md)
- [topics/optimization-for-ml/lessons/2026-02-17-session-recap-quiz2-interactive.md](2026-02-17-session-recap-quiz2-interactive.md)
- [topics/optimization-for-ml/lessons/2026-02-17-session-recap-quiz2-review-02.md](2026-02-17-session-recap-quiz2-review-02.md)
- [topics/optimization-for-ml/live-chats/2026-02-17-live-chat-02-review.md](../live-chats/2026-02-17-live-chat-02-review.md)

Note on scope: recent session logs marked SGD as not central for this quiz; focus is GD/rates, subgradients, projected methods, optimality/KKT.

---

## Part A: Concise Cheat Sheet (High Yield)

## 1) Method Selection in 5 Seconds

- Smooth + unconstrained: Gradient Descent (GD).
- Convex + non-smooth + unconstrained: Subgradient method.
- Constrained: take gradient/subgradient step, then project.
- Need optimality certificate for constrained problem: KKT.

## 2) Core Updates

GD:
$$
x_{t+1}=x_t-\eta_t \nabla f(x_t)
$$

Subgradient:
$$
x_{t+1}=x_t-\eta_t g_t,\quad g_t\in\partial f(x_t)
$$

Projected (sub)gradient:
$$
y_{t+1}=x_t-\eta_t d_t,\quad x_{t+1}=\Pi_C(y_{t+1}),
$$
with $d_t=\nabla f(x_t)$ (smooth) or $d_t\in\partial f(x_t)$ (non-smooth).

## 3) Must-Memorize Inequalities

Smoothness ($L$-smooth):
$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{L}{2}\|y-x\|^2
$$

Strong convexity ($\mu$-strongly convex):
$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac{\mu}{2}\|y-x\|^2
$$

Subgradient definition (convex):
$$
f(y)\ge f(x)+g^T(y-x),\quad g\in\partial f(x)
$$

## 4) Step-Size Facts That Get Tested

From GD smoothness plug-in:
$$
f(x_{t+1})\le f(x_t)-\left(\eta-\frac{L\eta^2}{2}\right)\|\nabla f(x_t)\|^2
$$

- Descent-safe range: $0<\eta<2/L$.
- Common conservative proof choice: $\eta\le 1/L$.

## 5) Rates You Should Not Mix Up

- Smooth convex GD (function gap): $O(1/T)$.
- Smooth nonconvex GD (min gradient norm): $O(1/\sqrt{T})$.
- Smooth + strongly convex GD: linear/geometric, typically $(1-c)^T$.
- Convex non-smooth subgradient method: $O(1/\sqrt{T})$ best-iterate style.


---




## 6) Condition Number and Hessian Language

Twice differentiable class form:
$$
\alpha I \preceq \nabla^2 f(x)\preceq \beta I
$$

- Hessian in $d$ dimensions: $H(x)=\nabla^2 f(x)\in\mathbb{R}^{d\times d}$.
- Directional curvature along unit vector $v$: $v^T H(x) v$.
- $\beta$: smoothness upper curvature bound.
- $\alpha$: strong-convexity lower curvature bound.
- Condition number: $\kappa=\beta/\alpha$ (or $L/\mu$).
- Smaller $\kappa$ means faster GD.

For twice-differentiable functions:
- Convex on domain: $H(x)\succeq 0$ for all $x$.
- $\mu$-strongly convex: $H(x)\succeq \mu I$.
- If convex and $L$-smooth: $0\preceq H(x)\preceq LI$.

Quadratic template (high-yield):
$$
f(x)=\frac12 x^TQx+b^Tx+c,\quad Q=Q^T
$$
$$
\nabla f(x)=Qx+b,\quad \nabla^2 f(x)=Q
$$
- $L=\lambda_{\max}(Q)$
- $\mu=\lambda_{\min}(Q)$ (if $>0$)
- $\kappa=L/\mu$
- GD stable headline: $0<\eta<2/\lambda_{\max}(Q)$



---


## 7) Subgradient Essentials

For $f(x)=|x|$:
$$
\partial |x|=
\begin{cases}
\{1\}, & x>0\\
[-1,1], & x=0\\
\{-1\}, & x<0
\end{cases}
$$

For max functions:
- Unique active branch -> gradient of that branch is a valid subgradient.
- Multiple active branches -> convex combination of active gradients.

## 8) Projection Essentials

Projection:
$$
\Pi_C(z)=\arg\min_{u\in C}\|u-z\|^2
$$

Projection optimality geometry:
$$
p=\Pi_C(z)\ \Longrightarrow\ \langle z-p,\ u-p\rangle\le 0,\ \forall u\in C
$$

Contraction / non-expansive:
$$
\|\Pi_C(a)-\Pi_C(b)\|\le \|a-b\|
$$

## 9) Optimality and KKT

Unconstrained smooth:
$$
\nabla f(x^*)=0
$$

Unconstrained convex non-smooth:
$$
0\in\partial f(x^*)
$$

Constrained convex first-order condition:
$$
\nabla f(x^*)^T(x-x^*)\ge 0,\ \forall x\in C
$$

KKT for
$$
\min_x f(x)\ \text{s.t.}\ g_i(x)\le 0,\ h_j(x)=0:
$$
1. Primal feasibility: $g_i(x^*)\le 0,\ h_j(x^*)=0$  
2. Dual feasibility: $\lambda_i\ge 0$  
3. Stationarity:
$$
\nabla f(x^*)+\sum_i \lambda_i\nabla g_i(x^*)+\sum_j \nu_j\nabla h_j(x^*)=0
$$
4. Complementary slackness: $\lambda_i g_i(x^*)=0$

Active/inactive rule:
- If $g_i(x^*)<0$, then must have $\lambda_i=0$.
- If $g_i(x^*)=0$, $\lambda_i$ can be $0$ or positive.

## 10) Top Quiz Traps

- Swapping $O(1/T)$ and $O(1/\sqrt{T})$.
- Wrong descent range sign: it is $0<\eta<2/L$, not $\eta>2/L$.
- Assuming subgradient method must decrease every step (false).
- Writing stationarity with $g_i,h_j$ instead of $\nabla g_i,\nabla h_j$.
- Thinking active inequality implies $\lambda_i>0$ (not always).
- Forgetting KKT needs all four conditions, not just slackness checks.

## 11) 90-Second Pre-Quiz Dump

Before starting, write from memory:
1. three updates (GD, subgradient, projected)
2. smoothness + strong-convexity inequalities
3. four KKT conditions
4. four rate headlines above

---

## Part B: In-Depth Review

## 1) Gradient Descent Proof Skeleton (What Each Assumption Gives)

Start with smoothness:
$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{L}{2}\|y-x\|^2
$$
Plug $y=x_t-\eta \nabla f(x_t)$:
$$
f(x_{t+1})\le f(x_t)-\left(\eta-\frac{L\eta^2}{2}\right)\|\nabla f(x_t)\|^2
$$

Interpretation:
- first term ($-\eta$): descent reward
- second term ($+L\eta^2/2$): curvature overshoot penalty

This gives:
- descent if $0<\eta<2/L$
- cleaner bound if $\eta\le 1/L$

Then convexity gives function-gap relation and telescoping structure for $O(1/T)$.

Then strong convexity adds curvature floor, giving contraction:
$$
\|x_t-x^*\|^2\le (1-c)^t\|x_0-x^*\|^2
$$
with $c$ tied to $\mu/L$.

### 1.1) Multidimensional Hessian View (What Class Language Means)

Hessian matrix:
$$
H(x)=\nabla^2 f(x)=
\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1^2} & \cdots & \frac{\partial^2 f}{\partial x_1\partial x_d}\\
\vdots & \ddots & \vdots\\
\frac{\partial^2 f}{\partial x_d\partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_d^2}
\end{bmatrix}
$$

Why this matters:
- gradient tells first-order slope direction.
- Hessian tells local curvature by direction.

For any direction $v$:
$$
\text{curvature along }v = v^T H(x) v.
$$

Interpretation:
- large $v^THv$ -> steep curvature in direction $v$.
- small $v^THv$ -> flatter direction.

Class sandwich:
$$
\alpha I \preceq H(x)\preceq \beta I
$$
means every directional curvature is between $\alpha$ and $\beta$:
$$
\alpha\|v\|^2\le v^TH(x)v\le \beta\|v\|^2.
$$

So:
- upper bound $\beta$ is smoothness constant.
- lower bound $\alpha$ is strong-convexity constant.
- condition number is $\kappa=\beta/\alpha$.

### 1.2) Fast PSD/PD Rules (for Hessian Questions)

- $H\succeq 0$ (PSD): all eigenvalues $\ge 0$ -> convex curvature test.
- $H\succ 0$ (PD): all eigenvalues $>0$ -> strongly convex local/global (for quadratics, global).
- For symmetric quadratic Hessian $Q$:
  - convex iff $\lambda_{\min}(Q)\ge 0$
  - strongly convex iff $\lambda_{\min}(Q)>0$

### 1.3) 2D Quadratic Worked Template

Take
$$
f(x)=\frac12 x^TQx+b^Tx+c,\quad
Q=\begin{bmatrix}4&1\\1&3\end{bmatrix}.
$$

Then:
$$
\nabla f(x)=Qx+b,\quad H(x)=Q.
$$

Eigenvalues of $Q$ are about $2.382,\,4.618$, so:
- $\mu=2.382$
- $L=4.618$
- $\kappa=L/\mu\approx1.94$
- safe GD range: $0<\eta<2/L\approx0.433$
- common conservative choice: $\eta\le 1/L\approx0.216$

This is exactly how matrix/eigenvalue form maps to rate language.

## 2) Telescoping Logic (Frequently Asked in Short Answer)

Pattern:
$$
\sum_{t=0}^{T-1}(A_t-A_{t+1})=A_0-A_T
$$

In GD proofs, $A_t$ is often $\|x_t-x^*\|^2$.

Why it matters:
- turns a sum of many per-step terms into initial-minus-final.
- creates $1/T$ after dividing by $T$.

## 3) Subgradients and Non-Smooth Optimization

Subgradient is a global lower-supporting slope:
$$
f(y)\ge f(x)+g^T(y-x)
$$

Key consequences:
- at non-differentiable points, $\partial f(x)$ can have multiple values.
- valid subgradient direction need not be a descent direction.

So subgradient method analyzes:
- best iterate $x_{\text{best}}$ or average iterate,
- not monotone decrease of last iterate.

## 4) Subgradient Method: Assumptions and Guarantees

Core assumptions in lecture form:
- convex objective
- bounded subgradients (equivalent to Lipschitz function values in convex case): $\|g_t\|\le G$
- step-size schedule choice

Basic inequality:
$$
f(x^{\text{best}})-f(x^*)
\le
\frac{\|x^0-x^*\|^2+G^2\sum_{t=0}^{k-1}\eta_t^2}{2\sum_{t=0}^{k-1}\eta_t}
$$

Useful schedules:
- horizon-tuned constant: $\eta=R/(G\sqrt{k})$ gives $RG/\sqrt{k}$.
- diminishing: $\sum \eta_t=\infty,\ \sum \eta_t^2<\infty$ gives convergence.
- if unknown horizon, $\eta_t\sim 1/\sqrt{t}$ gives near-$1/\sqrt{k}$ with log factor.
- Polyak when $f(x^*)$ known:
$$
\eta_t=\frac{f(x_t)-f(x^*)}{\|g_t\|^2}
$$

## 5) Projected Subgradient: Why It Works

Algorithm:
$$
y_{t+1}=x_t-\eta_t g_t,\quad x_{t+1}=\Pi_C(y_{t+1})
$$

Main insight from lecture proof:
- projection is non-expansive, so it does not increase distance to $x^*$.
- this restores telescoping structure after projection step.

Result:
- projected subgradient gets the same style bound as unconstrained subgradient (under convex + Lipschitz assumptions).

## 6) Optimality Conditions and KKT (Practical Solve Recipe)

### 6.1 Which condition applies?

- smooth unconstrained: $\nabla f(x^*)=0$
- convex non-smooth unconstrained: $0\in\partial f(x^*)$
- constrained convex: use constrained FO condition / KKT

### 6.2 Fast KKT procedure

1. rewrite each inequality as $g_i(x)\le 0$  
2. build Lagrangian
$$
\mathcal{L}=f+\sum_i \lambda_i g_i+\sum_j \nu_j h_j
$$
3. write stationarity + primal + dual + slackness  
4. case split using slackness:
- branch A: active constraint $g_i(x)=0$
- branch B: inactive multiplier $\lambda_i=0$
5. keep only branches satisfying all KKT checks

### 6.3 Certification nuance

- Convex objective + convex inequalities + affine equalities + regularity (e.g., Slater) => KKT is necessary and sufficient for global optimum.
- Nonconvex => KKT gives candidates, not guaranteed global minimum.

## 7) High-Probability Quiz Statements (Rapid Check)

1. "Subgradient method guarantees $f(x_{t+1})\le f(x_t)$ each step."  
False.

2. "For GD on $L$-smooth functions, $0<\eta<2/L$ is descent-safe."  
True.

3. "Smooth convex GD and convex non-smooth subgradient both have $O(1/T)$."  
False ($O(1/T)$ vs $O(1/\sqrt{T})$).

4. "If $g_i(x^*)=0$, then $\lambda_i$ must be strictly positive."  
False ($\lambda_i$ may be zero).

5. "In KKT stationarity, you use $\nabla g_i,\nabla h_j$."  
True.

6. "Projection changes a point even when it is already feasible."  
False.

7. "Smaller $\kappa=L/\mu$ generally means faster strongly-convex GD."  
True.

8. "$|x|$ is globally function-Lipschitz but not globally $L$-smooth."  
True.

## 8) 25-Minute Quiz Execution Plan

1. Minute 0-2: write formulas/rates/KKT names from memory.
2. Minute 2-10: clear T/F and direct MCQ first.
3. Minute 10-20: short-answer derivation and KKT case split.
4. Minute 20-23: check rate labels, sign conditions, stationarity gradients.
5. Minute 23-25: final scan for missing assumptions/conditions.

---

## Last 10-Minute Crash Order (if you are very short on time)

1. Re-read Part A sections 3, 4, 5, 9, 10.
2. Do one KKT mini solve mentally:
- inactive case $\lambda=0$
- active case $g(x)=0$
- then verify all four conditions.
3. Say out loud once:
- "$O(1/T)$ is smooth convex GD"
- "$O(1/\sqrt{T})$ is convex non-smooth subgradient"
- "strongly convex + smooth gives linear/geometric"
