# 5. Semidefinite Programming

The vector inequality $x \ge 0$ in LP is replaced by a matrix PSD constraint.

The symmetric matrices form

$$
S^n = \{X \in \mathbb{R}^{n\times n} : X = X^T\},
$$

and the PSD cone is

$$
S_+^n = \{X \in S^n : X \succeq 0\}.
$$

The definition is

$$
X \succeq 0
\iff
v^T X v \ge 0
\quad \forall v.
$$

### 5.1 PSD Facts

If $X \succeq 0$, then every diagonal entry is nonnegative:

$$
X_{ii} = e_i^T X e_i \ge 0.
$$

If $X \succeq 0$ and $X_{ii}=0$, then the entire $i$th row and column are zero.

For block matrices,

$$
\begin{pmatrix}
A & B \\
B^T & C
\end{pmatrix}
\succeq 0
\iff
A \succeq 0
\text{ and }
C - B^T A^{-1} B \succeq 0.
$$

This is the Schur complement criterion.

The matrix inner product is

$$
A \bullet B = \operatorname{Tr}(A^T B).
$$

If $A,B \succeq 0$, then

$$
A \bullet B \ge 0.
$$

Also, in the PSD setting,

$$
A \bullet B = 0
\iff
AB = 0.
$$

### 5.2 Standard SDP Pair

Primal:

$$
\min_X C \bullet X
\quad \text{s.t. } A_i \bullet X = b_i,\; X \succeq 0.
$$

Dual:

$$
\max_{y,S} y^T b
\quad \text{s.t. } S = C - \sum_i y_i A_i,\; S \succeq 0.
$$

The key identity is

$$
C \bullet X - y^T b = S \bullet X \ge 0.
$$

This is the SDP weak-duality proof in one line. The reason the last inequality holds is exactly the PSD inner-product theorem.

### 5.3 Conceptual Role of SDP

An SDP is still a convex optimization problem:

- the objective is linear,
- the equality constraints are linear,
- the PSD cone is convex.

The important point is that SDP generalizes LP while retaining convexity, which is why it becomes powerful for relaxations such as MaxCut.
