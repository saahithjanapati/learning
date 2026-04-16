# 11. Proofs You Should Know

The following proof types are especially exam-relevant.

### 11.1 Show $g(x)=\frac{B}{2}\|x\|^2-f(x)$ is convex when $f$ is $B$-smooth

The clean route is the first-order convexity condition. Compute

$$
\nabla g(x) = Bx - \nabla f(x),
$$

and show

$$
g(y) - g(x) - \nabla g(x)^T(y-x) \ge 0.
$$

Expanding gives exactly the smoothness remainder term for $f$.

### 11.2 Derive the dual of an LP and state the finiteness domain

This is not only an algebra problem. The proof is about recognizing when minimizing a linear function over all $x$ is finite.

### 11.3 Prove SDP weak duality

The central calculation is

$$
C \bullet X - y^T b
=
\left(C-\sum_i y_iA_i\right)\bullet X
=
S \bullet X
\ge 0.
$$

### 11.4 Show the Newton step is a descent direction

Compute the inner product between the gradient and the step. Do not stop at intuition.

### 11.5 Use KKT to solve and verify

For nonconvex examples, solve the KKT system and then separately determine which candidate is actually optimal.

### 11.6 Proximal-gradient descent lemma proofs

Split the proof into the smooth part and the prox part. Most errors here come from failing to separate those roles.
