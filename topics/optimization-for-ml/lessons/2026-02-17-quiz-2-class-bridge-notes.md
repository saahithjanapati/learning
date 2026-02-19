# Quiz 2 Class-Bridge Notes (Hessian + Lecture-Style Gaps)

Date: `2026-02-17` (local)
Scope: Through Feb 17 quiz topics.

## 1) Hessian Deep Dive (Lecture-Style)

### 1.1 Why Hessian matters

In class, smoothness/strong-convexity are often expressed in Hessian form (for twice-differentiable functions):
$$
\alpha I \preceq \nabla^2 f(x) \preceq \beta I \quad \forall x.
$$

Interpretation:
- upper bound $\nabla^2 f(x) \preceq \beta I$ gives $\beta$-smoothness,
- lower bound $\alpha I \preceq \nabla^2 f(x)$ gives $\alpha$-strong convexity.

This appears directly in class notes:
- `materials/processed/optimization-for-ml/Jan29_GD.md:776`
- `materials/processed/optimization-for-ml/Jan29_GD.md:777`

### 1.2 1D scalar version

For 1D twice-differentiable $f$, Hessian is just $f''(x)$.

- $L$-smooth on a domain if $|f''(x)| \le L$ on that domain.
- For convex $f$, this reduces to $0 \le f''(x) \le L$.
- Strongly convex with parameter $\mu$ if $f''(x) \ge \mu > 0$.

### 1.3 Worked Hessian example (quadratic)

Take:
$$
f(x) = \frac{1}{2}x^TQx + b^Tx + c,
\quad
Q=\begin{bmatrix}4&1\\1&3\end{bmatrix}.
$$

Then:
$$
\nabla f(x)=Qx+b,
\qquad
\nabla^2 f(x)=Q.
$$

Eigenvalues of $Q$ are about $2.382$ and $4.618$.
So:
- $\mu=\lambda_{\min}(Q)\approx 2.382$,
- $L=\lambda_{\max}(Q)\approx 4.618$,
- condition number $\kappa=L/\mu\approx 1.94$.

Consequences:
- safe GD step-size headline: $0<\eta<2/L\approx0.433$,
- common conservative proof choice: $\eta\le1/L\approx0.216$,
- strong convex + smooth means geometric/linear convergence.

### 1.4 Your example check

Functions like $x^3$, $x^4$, $e^x$ are differentiable everywhere but not globally $L$-smooth on all $\mathbb{R}$ because $f''$ is unbounded.

## 2) Where Current Study Guides Are Simpler Than Class Version

These are the main bridge gaps to close before quiz:

1. Hessian/eigenvalue framing (class) vs scalar inequality framing (guide)
- Guide mostly uses
  $$
  f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{L}{2}\|y-x\|^2.
  $$
- Class also emphasizes Hessian bounds and spectral interpretation.
- Source: `Jan29_GD.md:776`, `Jan29_GD.md:777`, `Jan29_GD.md:378`.

2. Subgradient assumptions stated in class theorem form
- Class explicitly uses: convex Lipschitz $\Leftrightarrow$ bounded subgradients.
- Source: `Feb10_subgradient-method.md:211`.

3. Best-iterate-centric analysis detail
- Guide mentions best iterate, but class repeatedly frames guarantees in terms of $x_{best}$ and step-size design.
- Source: `Feb10_subgradient-method.md:57`, `Feb10_subgradient-method.md:239`, `Feb12-projected-subgradient.md:227`.

4. Step-size families for subgradient method
- Class includes fixed horizon-tuned steps (e.g. $\eta=R/(G\sqrt{k})$), arbitrary sequences, and Polyak steps.
- Source: `Feb10_subgradient-method.md:241`, `Feb10_subgradient-method.md:275`, `Feb10_subgradient-method.md:339`.

5. Projection proof property depth
- Guide uses update well, but class has geometric projection optimality and contraction perspectives in proofs.
- Source: `Feb10_subgradient-method.md:398`, `Feb12-projected-subgradient.md:353`.

6. Normal cone / indicator-function bridge
- Class ties constrained optimality geometry to subdifferentials via
  $$
  \partial \mathbb{I}_C(x) = N_C(x).
  $$
- Source: `Feb5_subgradients.md:274`, `Feb5_subgradients.md:277`.

## 3) What To Memorize In Class Language

- Hessian sandwich: $\alpha I \preceq \nabla^2 f(x) \preceq \beta I$.
- $\kappa=\beta/\alpha$ and why smaller is easier.
- Subgradient theorem assumptions: convex + Lipschitz / bounded subgradients.
- Best-iterate statement style for subgradient/projection results.
- Projection geometry sentence: projection creates an obtuse-angle condition with feasible directions.
- KKT + regularity caveat: in convex settings with regularity (e.g. Slater), KKT is necessary and sufficient.

## 4) Immediate Drill To Lock This

1. Convert one scalar smoothness problem to Hessian/eigenvalue language.
2. State and use the bounded-subgradient theorem assumptions correctly.
3. State one best-iterate convergence headline from subgradient method.
4. State projection optimality condition in one geometric sentence.
