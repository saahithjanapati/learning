# Optimization In-Depth Study Guide (Topics Not Covered in Quiz 2)

Date: `2026-02-23`  
Course: `Optimization for ML`  
Purpose: deep review of core topics outside the Quiz 2 scope.

## Scope Boundary (Exact)

This guide focuses on the modules that were not part of Quiz 2 preparation:

- `Jan13_Intro` (optimization formulation and terminology)
- `Jan13_Logistics` (course structure/prereqs context)
- `Jan15_ConvexSets`
- `Jan20_ConvexFunctions`
- `Jan27_matrix_norms`

Excluded (Quiz 2-centered):
- Gradient descent proofs/rates (Jan 29 onward),
- subgradients/projection methods,
- KKT drills.

## How to Use This Guide

1. Read section 1 to rebuild the formal setup vocabulary.
2. Do sections 2 and 3 together (sets and functions are tightly linked).
3. Do section 4 last (matrix tools support proofs and conditioning intuition).
4. Run the no-notes drill in section 8.

---

## 1) Foundations and Problem Formulation (Jan 13)

### 1.1 Standard optimization form

General form:
$$
\min_{x \in C} f_0(x)
\quad
\text{s.t. } f_i(x)\le b_i,\ i=1,\dots,m.
$$

Extended form with equalities:
$$
\min f_0(x)
\quad
\text{s.t. } f_i(x)\le b_i,\ i=1,\dots,m,\quad h_j(x)=0,\ j=1,\dots,p.
$$

### 1.2 Vocabulary you must be precise about

- Optimization variable: $x\in\mathbb{R}^d$.
- Objective: $f_0$.
- Constraint functions: $f_i$ and $h_j$.
- Feasible point: satisfies all constraints.
- Optimal solution: feasible point with smallest objective value.

Optimal value:
$$
p^*=\inf\{f_0(x):x\in C,\ f_i(x)\le b_i\ \forall i\}.
$$

Important cases:
- Infeasible problem: $p^*=\infty$.
- Unbounded below: $p^*=-\infty$.
- Infimum may not be attained (no optimizer even though $p^*$ exists).

### 1.3 Explicit vs implicit constraints

Even if only a few constraints are written, there are implicit domain constraints:
$$
x\in\mathcal{D}
=\mathrm{dom}(f_0)\cap\bigcap_i \mathrm{dom}(f_i)\cap\bigcap_j \mathrm{dom}(h_j).
$$

This is high-yield: many mistakes come from forgetting domain restrictions.

### 1.4 Convex optimization standard form requirements

For a convex optimization problem:
- $\mathcal{D}$ must be convex.
- $f_0,\dots,f_m$ must be convex.
- equality constraints must be affine: $h_j(x)=a_j^Tx+b_j$.

Why:
- Inequalities of type $f_i(x)\le b_i$ preserve convex feasible sets when $f_i$ is convex.
- Reversing inequality ($f_i(x)\ge b_i$) can produce nonconvex feasible regions.
- General convex equalities $h(x)=b$ can produce disconnected/nonconvex sets.

---

## 2) Convex Sets Deep Dive (Jan 15)

### 2.1 Core definitions

Line through $x_1,x_2$:
$$
\{\theta x_1+(1-\theta)x_2:\theta\in\mathbb{R}\}.
$$

Line segment:
$$
\{\theta x_1+(1-\theta)x_2:\theta\in[0,1]\}.
$$

Convex set $C$:
$$
x_1,x_2\in C,\ \theta\in[0,1]\Rightarrow \theta x_1+(1-\theta)x_2\in C.
$$

### 2.2 Why convex sets matter for optimization

For convex objectives over convex feasible sets:
- any local optimum is global optimum,
- geometry is well-behaved for first-order optimality.

### 2.3 High-yield convex-set examples

- $\emptyset$, singleton, $\mathbb{R}^d$.
- Hyperplanes: $\{x:a^Tx=b\}$.
- Halfspaces: $\{x:a^Tx\le b\}$.
- Affine sets and affine hull:
$$
\mathrm{Aff}(C)=\left\{\sum_{i=1}^k \theta_i x_i:\sum_i\theta_i=1\right\}.
$$
- Norm balls $\{x:\|x\|\le r\}$ are convex for norms.
- $L_p$ balls are convex for $p\ge 1$.
- $L_p$ “balls” for $0<p<1$ are nonconvex (not norms).
- Polyhedra: $\{x:Ax\le b,\ Cx=d\}$.
- Polytope = bounded polyhedron.

### 2.4 Convex hull and representation

Convex hull:
$$
\mathrm{conv}(S)=\left\{\sum_{i=1}^k \theta_i x_i:\theta_i\ge 0,\ \sum_i\theta_i=1,\ x_i\in S\right\}.
$$

Facts:
- $\mathrm{conv}(S)$ is convex even if $S$ is not.
- It is the smallest convex set containing $S$.
- Closed convex sets admit dual halfspace representations (possibly infinite intersections).

### 2.5 Cones and cone geometry

Cone:
$$
x\in C,\ \alpha\ge 0 \Rightarrow \alpha x\in C.
$$

Convex cone adds closure under nonnegative combinations.

Conic hull:
$$
\mathrm{cone}(S)=\left\{\sum_{i=1}^k \theta_i x_i:\theta_i\ge 0,\ x_i\in S\right\}.
$$

Important example:
- Symmetric PSD matrices form a convex cone.

### 2.6 Polar, normal, and tangent cones

Normal cone at $x\in C$:
$$
N_C(x)=\{g:g^T(y-x)\le 0,\ \forall y\in C\}.
$$

Interpretation:
- interior point: normal cone is $\{0\}$,
- smooth boundary: single normal ray,
- corner boundary: “fat” cone.

Tangent cone:
- feasible local directions from $x$.

For convex $C$:
$$
T_C(x)=N_C(x)^\circ
$$
(polar relation).

Optimization punchline:
- for differentiable convex $\min_{x\in C} f(x)$, optimality aligns with
$$
-\nabla f(x^*)\in N_C(x^*).
$$

### 2.7 Separating and supporting hyperplanes

Separating hyperplane theorem:
- two disjoint nonempty convex sets can be separated by a hyperplane.

Strong separation:
- hyperplane with positive margin/buffer.

Supporting hyperplane theorem:
- boundary point of convex set has a supporting hyperplane.

Practical meaning:
- hyperplanes are geometric certificates for convexity/optimality arguments.

### 2.8 Convexity-preserving operations on sets

Preserve convexity:
- translation, scaling, intersection (even infinite),
- affine image and affine pre-image,
- Minkowski sum,
- Cartesian product,
- perspective and linear-fractional mappings (under domain conditions).

Do not preserve convexity:
- union (in general).

### 2.9 Proof patterns for set convexity

When asked “prove set is convex”, use one of:
1. Direct definition with two generic points.
2. Show it is intersection of known convex sets.
3. Show it is affine image/pre-image of a convex set.
4. Show it is a sublevel/epigraph-related construction.

---

## 3) Convex Functions Deep Dive (Jan 20)

### 3.1 Definition and intuition

Convex function:
$$
f(\theta x+(1-\theta)y)\le \theta f(x)+(1-\theta)f(y),\quad \theta\in[0,1].
$$

Concave means $-f$ is convex.

Geometric intuition:
- chords lie above graph.

### 3.2 Equivalent viewpoints (high-yield)

1. 1D slice test: $t\mapsto f(x+tv)$ must be convex for all $x,v$.
2. Epigraph convexity:
$$
\mathrm{epi}(f)=\{(x,t): t\ge f(x)\}
$$
is convex iff $f$ is convex.
3. Jensen form (finite mixture / expectation forms).

### 3.3 First-order and second-order characterizations

First-order (differentiable convex):
$$
f(y)\ge f(x)+\nabla f(x)^T(y-x).
$$

Meaning:
- first-order Taylor approximation is global underestimator.

Corollary:
- if $\nabla f(x^*)=0$ and $f$ convex, then $x^*$ is global minimizer.

Second-order (twice differentiable):
$$
\nabla^2 f(x)\succeq 0\ \forall x \Rightarrow f \text{ convex}.
$$

If $\nabla^2 f(x)\succ 0$ everywhere, then strict convexity (typical sufficient condition).

### 3.4 Strict convexity and uniqueness

Strict convexity implies:
- at most one global minimizer on convex feasible set.

Be careful:
- convex does not imply strict convex.

### 3.5 Subgradients and monotonicity

Subgradient definition:
$$
f(y)\ge f(x)+g_x^T(y-x),\quad g_x\in\partial f(x).
$$

Monotonicity property:
- for convex $f$, gradients/subgradients are monotone:
$$
(x-y)^T(g_x-g_y)\ge 0.
$$

This is central for many convergence proofs later.

### 3.6 Jensen’s inequality

Finite-weight form:
$$
f\!\left(\sum_{i=1}^m \lambda_i x_i\right)\le \sum_{i=1}^m \lambda_i f(x_i),\quad
\lambda_i\ge 0,\ \sum_i\lambda_i=1.
$$

Expectation form:
$$
f(\mathbb{E}[X])\le \mathbb{E}[f(X)].
$$

### 3.7 Convexity-preserving operations on functions

If $f_i$ convex, $w_i\ge 0$:
$$
\sum_i w_i f_i \text{ is convex}.
$$

Pointwise supremum of convex functions is convex.

Partial minimization:
$$
f(x)=\min_{y\in C} g(x,y)
$$
is convex in $x$ when $g$ is jointly convex and $C$ convex.

Affine composition:
$$
g(x)=f(Ax+b)
$$
preserves convexity.

Perspective transform:
$$
g(x,t)=t f(x/t)
$$
preserves convexity over $t>0$.

General composition (1D):
- if $h$ convex nondecreasing and $g$ convex, then $h\circ g$ convex.

### 3.8 Proof checklist for convex functions

1. Direct definition/chord inequality.
2. First-order underestimator.
3. Hessian PSD.
4. Epigraph convexity.
5. Build from known convex pieces via rules above.

---

## 4) Matrix Norms and Spectral Toolkit (Jan 27)

### 4.1 Eigenvalues, spectral radius, and matrix powers

Eigenpair:
$$
Ax=\lambda x,\quad x\neq 0.
$$

Characteristic polynomial:
$$
p_A(\lambda)=\det(\lambda I-A).
$$

Spectral radius:
$$
\rho(A)=\max_{\lambda\in\Lambda(A)}|\lambda|.
$$

High-yield theorem:
$$
\rho(A)<1 \iff A^t\to 0.
$$

### 4.2 Spectral theorem (symmetric case)

If $A=A^T$:
- eigenvalues are real,
- $A=Q\Lambda Q^T$ with orthogonal $Q$.

This enables clean norm and PSD analysis.

### 4.3 Singular values and SVD

Singular-value equations:
$$
Av_i=\sigma_i u_i,\quad A^Tu_i=\sigma_i v_i.
$$

SVD:
$$
A=U\Sigma V^T.
$$

Key relation:
- $\sigma_i^2$ are eigenvalues of $A^TA$ (and $AA^T$).

For symmetric $A$:
- singular values are $|\lambda_i|$.

### 4.4 Induced/operator norms

Induced norm:
$$
\|A\|_{\alpha,\beta}=\sup_{\|x\|_\alpha=1}\|Ax\|_\beta
=\sup_{x\neq 0}\frac{\|Ax\|_\beta}{\|x\|_\alpha}.
$$

Special cases:

1. Matrix 1-norm:
$$
\|A\|_1=\max_j \sum_i |A_{ij}|
$$
(max absolute column sum).

2. Matrix $\infty$-norm:
$$
\|A\|_\infty=\max_i \sum_j |A_{ij}|
$$
(max absolute row sum).

3. Matrix 2-norm / operator norm / spectral norm:
$$
\|A\|_2=\sup_{x\neq 0}\frac{\|Ax\|_2}{\|x\|_2}
=\sqrt{\lambda_{\max}(A^TA)}
=\sigma_{\max}(A).
$$

### 4.5 Core inequalities and comparisons

Bound on matrix-vector product:
$$
\|Ax\|_2\le \|A\|_2\|x\|_2.
$$

Spectral-radius bound:
$$
\rho(A)\le \|A\|_2.
$$

If $A$ symmetric:
$$
\|A\|_2=\rho(A).
$$

Counterexample mindset:
- for nonsymmetric matrices, strict inequality can happen.

### 4.6 PSD matrices and Loewner order

For symmetric $A$:
- PSD iff all eigenvalues nonnegative.

Notation:
$$
A\succeq 0,\quad
A\succeq B \iff A-B\succeq 0.
$$

Equivalent PSD test:
$$
A\succeq 0 \iff x^TAx\ge 0\ \forall x.
$$

Important symmetric bound equivalence:
$$
\|A\|_{op}\le \beta
\iff
-\beta I \preceq A \preceq \beta I.
$$

### 4.7 Other major matrix norms

Nuclear/trace norm:
$$
\|A\|_{Tr}=\mathrm{trace}\!\left(\sqrt{A^TA}\right)=\sum_i \sigma_i(A).
$$

Frobenius norm:
$$
\|A\|_F=\sqrt{\sum_{i,j}|a_{ij}|^2}
=\sqrt{\mathrm{trace}(A^TA)}
=\sqrt{\sum_i \sigma_i^2(A)}.
$$

Schatten $p$-norm family:
$$
\|A\|_{Sch_p}=\left(\sum_i \sigma_i^p(A)\right)^{1/p}.
$$

Connections:
- $p=\infty$ -> spectral norm,
- $p=2$ -> Frobenius norm,
- $p=1$ -> nuclear norm.

### 4.8 Why this matters for optimization

These tools support:
- curvature/bound arguments,
- stability/convergence bounds,
- regularization choices (e.g., nuclear vs Frobenius penalties),
- PSD-based convex constraints.

---

## 5) Cross-Topic Integration Map

1. Convex optimization formulation (section 1) requires:
- convex feasible set geometry (section 2),
- convex objective structure (section 3).

2. Matrix/spectral tools (section 4) support:
- proving convexity/PSD results,
- later smoothness/conditioning analysis in gradient methods.

3. Cones + supporting/separation geometry (section 2) connect to:
- subgradient/normal-cone/KKT language you see after Quiz 2.

---

## 6) High-Probability Mistakes (and Fixes)

1. Mixing convex vs affine equality constraints  
Fix: equalities in convex programs should be affine.

2. Thinking $f(x)\ge b$ is equivalent to $f(x)\le b$ for convex constraints  
Fix: only the sublevel form preserves convexity in general.

3. Treating union of convex sets as convex  
Fix: intersection preserves convexity, union generally does not.

4. Confusing spectral radius with operator norm for any matrix  
Fix: equality only guaranteed in symmetric case.

5. Assuming $L_p$ is a norm for all $p>0$  
Fix: $p\ge 1$ for norm properties; $0<p<1$ fails triangle inequality.

6. Forgetting epigraph criterion for function convexity  
Fix: convex function iff epigraph is convex.

---

## 7) No-Notes Recall Sheet

Write these from memory:

1. Convex optimization standard form with inequalities + affine equalities.
2. Convex set definition.
3. Convex function definition.
4. First-order convexity inequality.
5. Second-order PSD condition.
6. Normal cone definition.
7. Separating hyperplane theorem statement.
8. SVD equation.
9. Matrix 1, $\infty$, and 2 norm formulas.
10. PSD quadratic-form test.
11. Nuclear and Frobenius norm formulas.
12. Jensen inequality (finite-weight and expectation forms).

---

## 8) Timed Drill Plan (75 Minutes)

1. `15 min` Foundations rapid rewrite  
Write standard form, feasible/optimal/infeasible/unbounded distinctions.

2. `20 min` Convex sets classification  
Classify 12 sets as convex/nonconvex and justify in one sentence each.

3. `20 min` Convex functions proof mode  
For 6 functions, choose proof path: definition / first-order / Hessian / construction.

4. `20 min` Matrix norm computations  
Compute $\|A\|_1,\|A\|_\infty$ for two matrices, and identify $\|A\|_2$ via $A^TA$ eigenvalues for one small matrix.

---

## 9) Suggested Next Step

After this guide, do one mixed bridge session:
- 40% convex sets/functions,
- 40% matrix norms,
- 20% transition questions into GD/KKT language.

That closes the gap between pre-Quiz-2 fundamentals and post-Quiz-2 methods.

## Sources Used

- `materials/processed/optimization-for-ml/Jan13_Intro.md`
- `materials/processed/optimization-for-ml/Jan13_Logistics.md`
- `materials/processed/optimization-for-ml/Jan15_ConvexSets.md`
- `materials/processed/optimization-for-ml/Jan20_ConvexFunctions.md`
- `materials/processed/optimization-for-ml/Jan27_matrix_norms.md`
- `topics/optimization-for-ml/materials/INDEX.md`
- `topics/optimization-for-ml/lessons/2026-02-17-quiz-2-cheat-sheet.md`
