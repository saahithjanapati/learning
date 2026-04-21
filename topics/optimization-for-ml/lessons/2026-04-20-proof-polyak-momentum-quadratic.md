# Proof: Polyak-Style Momentum on a Quadratic via a 2 x 2 Linear System

This page follows the HW4-style proof, which is the cleanest concrete proof for momentum in the material you have here.

## Problem setup

Consider

$$
f(x)=x^2,
$$

so

$$
\nabla f(x)=2x.
$$

Use the momentum update

$$
g_{t+1}=(1-\gamma)g_t+\gamma \nabla f(x_t),
\qquad
x_{t+1}=x_t-\eta g_{t+1}.
$$

The homework asks you to show that for every $\eta > 0$, there exists a $\gamma = \gamma(\eta)$ such that $x_t \to 0$.

## Why this proof is different from GD / SGD / prox-GD proofs

This is not a smoothness-plus-convexity telescoping proof.

Instead:

- the objective is a quadratic
- the update becomes a linear dynamical system
- convergence is determined by the eigenvalues of the update matrix

So the whole proof is a state-space / spectral-radius proof.

## Step 1: rewrite the update using $\nabla f(x_t) = 2x_t$

Substitute the gradient:

$$
g_{t+1}=(1-\gamma)g_t+2\gamma x_t.
$$

Then

$$
x_{t+1}
=
x_t-\eta g_{t+1}
=
x_t-\eta\big((1-\gamma)g_t+2\gamma x_t\big).
$$

So

$$
x_{t+1}
=
-\eta(1-\gamma)g_t + (1-2\eta\gamma)x_t.
$$

## Step 2: write the 2 x 2 linear system

Define the state vector

$$
s_t :=
\begin{pmatrix}
g_t \\
x_t
\end{pmatrix}.
$$

Then

$$
s_{t+1}
=
A s_t,
$$

with

$$
A=
\begin{pmatrix}
1-\gamma & 2\gamma \\
-\eta(1-\gamma) & 1-2\eta\gamma
\end{pmatrix}.
$$

Therefore

$$
s_t = A^t s_0.
$$

So convergence of the algorithm is now equivalent to the matrix-power question $A^t \to 0$.

## Step 3: choose the special momentum parameter

The homework hint suggests

$$
\gamma = \frac{2}{1+2\eta}.
$$

Now compute the trace:

$$
\operatorname{tr}(A)
=
(1-\gamma)+(1-2\eta\gamma)
=
2-\gamma(1+2\eta).
$$

With the chosen $\gamma$,

$$
\operatorname{tr}(A)=0.
$$

This is useful because it makes the characteristic polynomial especially simple.

## Step 4: compute the determinant

Compute

$$
\det(A)
=
(1-\gamma)(1-2\eta\gamma)-2\gamma(-\eta(1-\gamma)).
$$

The second term becomes positive, so

$$
\det(A)
=
(1-\gamma)(1-2\eta\gamma)+2\eta\gamma(1-\gamma).
$$

Factor out $(1-\gamma)$:

$$
\det(A)
=
(1-\gamma)\big((1-2\eta\gamma)+2\eta\gamma\big)
=
1-\gamma.
$$

## Step 5: write the characteristic polynomial

For a $2 \times 2$ matrix,

$$
p(\lambda)=\lambda^2-(\operatorname{tr}A)\lambda+\det(A).
$$

Since $\operatorname{tr}(A)=0$, we get

$$
p(\lambda)=\lambda^2+\det(A)=\lambda^2+(1-\gamma).
$$

So every eigenvalue satisfies

$$
\lambda^2 = -(1-\gamma).
$$

Hence the eigenvalue magnitude is

$$
|\lambda| = \sqrt{|1-\gamma|}.
$$

Now substitute the chosen `gamma`:

$$
1-\gamma = 1-\frac{2}{1+2\eta} = \frac{2\eta-1}{1+2\eta}.
$$

Therefore

$$
|\lambda|
=
\sqrt{\left|\frac{2\eta-1}{1+2\eta}\right|}.
$$

So the spectral radius is

$$
\rho(A)=\sqrt{\left|\frac{2\eta-1}{1+2\eta}\right|}.
$$

Because $|2\eta-1| < 1+2\eta$ for every $\eta > 0$, we have

$$
\rho(A)<1.
$$

That strict inequality is the whole convergence conclusion.

## Step 6: conclude convergence from the spectral radius

If every eigenvalue of $A$ has magnitude strictly less than $1$, then

$$
A^t \to 0.
$$

Therefore

$$
s_t = A^t s_0 \to 0.
$$

So

$$
g_t \to 0,
\qquad
x_t \to 0.
$$

In particular, the momentum method converges to the minimizer of $f(x)=x^2$.

## Rate statement

The HW4-style rate is linear and is controlled by the spectral radius:

$$
\|s_t\| = O(\rho(A)^t),
$$

so equivalently

$$
|x_t| = O(\rho(A)^t).
$$

The special case $\eta = 1/2$ is especially neat. Then the chosen parameter gives

$$
\gamma = 1,
$$

and the homework notes that the method reaches the origin in finite time.

## Main trick

The proof does not use general convex-optimization inequalities. It converts the algorithm into a matrix iteration and studies the eigenvalues.

That is exactly why the homework problem is valuable: it gives you one setting where momentum can be analyzed completely.

## Common traps

- Treating this like a generic GD proof and looking for telescoping sums.
- Forgetting to include both $g_t$ and $x_t$ in the state.
- Confusing the update rule here with the alternative heavy-ball form $x_{t+1}=x_t-\eta \nabla f(x_t)+\gamma(x_t-x_{t-1})$.

## Source trail

- `materials/processed/optimization-for-ml/S26_10_725_HW4_student_3__1___1_.md`
- `materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md`
- [[2026-04-14-exam-2-section-08-momentum-nag]]
- [[2026-04-19-hw3-hw4-topic-summary]]
