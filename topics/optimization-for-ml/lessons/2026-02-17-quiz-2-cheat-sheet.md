# Optimization Quiz 2 Cheat Sheet (Through Feb 17)

Date: `2026-02-17` (local)
Scope:
- Jan 29: GD
- Feb 3: GD convergence proofs
- Feb 5: Subgradients
- Feb 10: Subgradient method
- Feb 12: Projected (sub)gradient
- Feb 17: Optimality conditions + KKT

## 1) Method Selection (Fast)

- Smooth + unconstrained: use GD.
- Convex + non-smooth + unconstrained: use subgradient method.
- Constrained: do gradient/subgradient step, then projection (or use KKT for optimality solve).

## 2) Core Updates

Gradient descent:
$$
x_{t+1} = x_t - \eta_t \nabla f(x_t)
$$

Subgradient method:
$$
x_{t+1} = x_t - \eta_t g_t, \quad g_t \in \partial f(x_t)
$$

Projected (sub)gradient:
$$
y_{t+1}=x_t-\eta_t d_t,
\qquad
x_{t+1}=\Pi_C(y_{t+1})
$$
where $d_t=\nabla f(x_t)$ (smooth) or $d_t\in\partial f(x_t)$ (non-smooth).

## 3) Smoothness, Strong Convexity, Step Size

$L$-smoothness:
$$
f(y) \le f(x) + \nabla f(x)^T(y-x) + \frac{L}{2}\|y-x\|^2
$$
Equivalent (differentiable case):
$$
\|\nabla f(y)-\nabla f(x)\| \le L\|y-x\|
$$

$\mu$-strong convexity:
$$
f(y) \ge f(x) + \nabla f(x)^T(y-x) + \frac{\mu}{2}\|y-x\|^2
$$

One-step GD descent coefficient:
$$
\eta - \frac{L\eta^2}{2}
$$
Positive when:
$$
0<\eta<\frac{2}{L}
$$
Common conservative choice: $0<\eta\le 1/L$.

## 4) Rates To Memorize

- Smooth convex GD: typically $O(1/T)$.
- Smooth + strongly convex GD: geometric/linear (like $(1-c)^T$).
- Convex non-smooth subgradient: typically $O(1/\sqrt{T})$.

Condition number (smooth + strongly convex):
$$
\kappa = \frac{L}{\mu}
$$
Smaller $\kappa$ usually means faster convergence.

## 5) Subgradient Essentials

Definition:
$$
f(y) \ge f(x) + g^T(y-x), \quad \forall y,\; g\in\partial f(x)
$$

For convex differentiable $f$:
$$
\partial f(x)=\{\nabla f(x)\}
$$

Example:
$$
\partial |x| =
\begin{cases}
\{1\}, & x>0\\
[-1,1], & x=0\\
\{-1\}, & x<0
\end{cases}
$$

Max-of-functions rule:
- unique active branch at $x$ -> its gradient is a valid subgradient.
- tied active branches -> convex combination of their gradients.

## 6) Projection Essentials

Projection definition:
$$
\Pi_C(z)=\arg\min_{u\in C}\|u-z\|^2
$$

If tentative point is already feasible ($z\in C$), projection does nothing.

## 7) Optimality Conditions

Smooth unconstrained:
$$
\nabla f(x^*)=0
$$

Convex non-smooth unconstrained:
$$
0\in\partial f(x^*)
$$

Constrained convex first-order condition:
$$
\nabla f(x^*)^T(x-x^*)\ge0,\quad \forall x\in C
$$

## 8) KKT (Must-Know)

Problem form:
$$
\min_x f(x)
\quad
\text{s.t. } g_i(x)\le0,\; h_j(x)=0
$$

Lagrangian:
$$
\mathcal{L}(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_j h_j(x)
$$

KKT conditions:
1. Primal feasibility: $g_i(x^*)\le0$, $h_j(x^*)=0$.
2. Dual feasibility: $\lambda_i\ge0$.
3. Complementary slackness: $\lambda_i g_i(x^*)=0$.
4. Stationarity:
$$
\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)+\sum_j\nu_j\nabla h_j(x^*)=0
$$

Active/inactive inequality rule:
- inactive ($g_i(x^*)<0$) -> must have $\lambda_i=0$.
- active ($g_i(x^*)=0$) -> $\lambda_i$ can be $0$ or positive.

## 9) Common Exam Traps

- Mixing $O(1/T)$ and $O(1/\sqrt{T})$.
- Forgetting the $\tfrac{L}{2}\|y-x\|^2$ term in smoothness.
- Assuming active inequality always implies $\lambda>0$ (not always).
- Writing stationarity with $h_j$ instead of $\nabla h_j$.
- Forgetting to check all KKT conditions after solving stationarity.

## 10) 60-Second Pre-Quiz Checklist

- I can write GD/subgradient/projected updates from memory.
- I can state smoothness + strong convexity inequalities from memory.
- I can state 3 rate headlines correctly.
- I can state all 4 KKT conditions without notes.
- I can solve a 1-inequality KKT case split quickly.
