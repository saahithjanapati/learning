# 12. Practice Problems

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
