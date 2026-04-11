# March19_EXTRA_Nonconvex_KKT

Source: `materials/archive/March19_EXTRA_Nonconvex_KKT.pdf`
Duplicate equivalents: `March19_EXTRA_Nonconvex_KKT.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 79

## Page 1
### Content
Optimization for
Machine Learning

Nonconvex KKT
### Visual Description
The slide is a title slide. The main title "Optimization for Machine Learning" is in blue, and a subtitle "Nonconvex KKT" is in red. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 2
### Content
Tangent Space
We consider the equality-constrained problem
$$ \min_{x \in R^n} f(x) \quad \text{s.t.} \quad l(x) = 0_p, $$
where
$l = (l_1,..., l_p) : R^n \to R^p$
is twice continuously differentiable.

**Definition [Tangent space]**
For a feasible point $x^*$, the tangent space (=kernel space) to the constraint $l$ is
$T(x^*) = \text{ker } \nabla l(x^*) = \{d \in R^n : \nabla l(x^*)d = 0\}$.

**Note:** Jacobian matrix $\nabla l(x^*) \in R^{p \times n}$
### Visual Description
Text and mathematical equations defining the equality-constrained problem and the tangent space. The definition of tangent space is highlighted.
---
## Page 3
### Content
Implicit Function Theorem
**Theorem: [Implicit Function Theorem]**
* Let $F: R^p \times R^{n-p} \to R^p$ be continuously differentiable.
* Suppose $F(y^*, z^*) = 0_p$.
* Assume that the Jacobian matrix with respect to $y$,
$\nabla_y F(y^*, z^*) \in R^{p \times p}$,
is invertible.
### Visual Description
Text-only slide.
---
## Page 4
### Content
Implicit Function Theorem
Then there exist neighborhoods:
$U \subset R^{n-p}$ of $z^*$ (small ball around $z^*$)
and $V \subset R^p$ of $y^*$ (small ball around $y^*$)
and exists a continuously differentiable function $g:U \to V$
such that, for all $(y, z) \in V \times U$,
$F(y, z) = 0 \iff y = g(z)$.

If $F$ is $C^k$, then $g$ is also $C^k$.

Moreover, $\nabla_z g(z^*) = - (\nabla_y F(y^*, z^*))^{-1} \nabla_z F(y^*, z^*)$.
### Visual Description
Text and mathematical equations continuing the statement of the Implicit Function Theorem.
---
## Page 5
### Content
Implicit Function Theorem
**Remark:** It is easy to see that the derivative of $g$ has to be in this form:
$\nabla_z g(z^*) = - (\nabla_y F(y^*, z^*))^{-1} \nabla_z F(y^*, z^*)$.

**Proof:**
If $F(g(z), h(z)) = 0 \forall z \in U$, $\Rightarrow \frac{\partial F(g(z),h(z))}{\partial g} \frac{\partial g(z)}{\partial z} + \frac{\partial F(g(z),h(z))}{\partial h} \frac{dh(z)}{\partial z} = 0$
In our case, $F(y, z) = F(g(z), z) = 0 \forall z \in U$
$$ \Rightarrow \frac{\partial F(g(z),z)}{\partial g} \frac{\partial g(z)}{\partial z} + \frac{\partial F(g(z),z)}{\partial z} \frac{dz}{\partial z} = 0 $$
$$ \nabla_y F(y,z) \nabla_z g(z) + \nabla_z F(y, z) = 0 $$
$$ \nabla_z g(z^*) = - (\nabla_y F(y^*, z^*))^{-1} \nabla_z F(y^*, z^*). $$
This also shows why we had to assume $\nabla_y F(y^*, z^*) \in R^{p \times p}$, is invertible.
### Visual Description
Text and mathematical equations providing a remark and a proof related to the Implicit Function Theorem.
---
## Page 6
### Content
Example
The unit circle of implicit equation $x^2 + y^2 - 1 = 0$ cannot be represented as the graph of a function. Around the point A where the tangent is not vertical, the bolded circular arc is the graph of some function of $x$ ($y = \sqrt{1 - x^2}$), while around B, there is no function of $x$ with the circle as its graph. This is exactly what the implicit function theorem asserts in this case.
### Visual Description
A diagram of a unit circle centered at the origin. Two points, A and B, are marked on the circle. Point A is in the upper right quadrant, and a bolded arc segment is shown near it. Point B is on the positive x-axis. The text explains how the implicit function theorem applies to the unit circle.
---
## Page 7
### Content
Tangent Space => Feasible Curves
**Theorem [Existence of feasible curves with prescribed tangent direction]:**
* Let $l : R^n \to R^p$ be $C^2$, $n \ge p$
* Let $x^* \in R^n$ satisfy $l(x^*) = 0$.
* Assume that the Jacobian $\nabla l(x^*) \in R^{p \times n}$ has full row rank $p$.

Then for every $d \in \text{ker } \nabla l(x^*)$,
there exists $\epsilon > 0$ and a $C^2$ curve $x : (-\epsilon,\epsilon) \to R^n$
such that
$x(0) = x^*$, $x'(0) = d$, $l(x(t)) = 0$ for all $t \in (-\epsilon,\epsilon)$.

**Proof: Appendix**
### Visual Description
Text and mathematical equations stating a theorem about the existence of feasible curves. The theorem has three bullet points for its conditions and then describes the conclusion. A note "Proof: Appendix" is at the bottom.
---
## Page 8
### Content
Feasible Curves => Tangent Space
**Converse of the Theorem:**
The converse is also true:
If $x(t)$ is any differentiable feasible curve with
$x(0) = x^*$, $l(x(t)) = 0 \forall t \in (-\epsilon, \epsilon)$,
then the derivative of the curve at $t = 0$ is in the tangent space:
$x'(0) \in \text{ker } \nabla l(x^*)$.

**Proof:**
Differentiating gives
$$ \frac{\partial}{\partial x} l(x(t)) \frac{\partial}{\partial t} x(t) = 0 \quad \forall t \in (-\epsilon, \epsilon), $$
so
$\nabla_x l(x^*) x'(0) = 0$,
$x'(0) \in \text{ker } \nabla l(x^*)$.
### Visual Description
Text and mathematical equations presenting the converse of the previous theorem and its proof. The proof involves differentiating the constraint equation.
---
## Page 9
### Content
Feasible Curves with Prescribed Tangent
Summary: Assumptions: $l(x^*) = 0$ and $\nabla l(x^*)$ has full rank $p$. Then,
* For every vector $d$ in the tangent space, there is a feasible curve $x(t)$, such that $d$ is its velocity vector at $x^*$:
  $x(0) = x^*$, $x'(0) = d$, $l(x(t)) = 0$
  for all $t \in (-\epsilon, \epsilon)$.
* For every feasible curve $x(t)$ through $x^*$ at $t = 0$, vector $d = x'(0)$ is in the tangent space of $l(x^*)$.

Thus the tangent space is exactly the set of first-order feasible (i.e. $l(x^*) = 0$) velocities.
### Visual Description
Text-only slide.
---
## Page 10
### Content
Example: Feasible curve with prescribed tangent on the unit sphere
### Visual Description
Title slide for an example.
---
## Page 11
### Content
Example
Let $l(x) = x_1^2 + x_2^2 + x_3^2 - 1$.
Let $x^* \in \mathbb{R}^3$ be a given feasible point i.e. $l(x^*) = 0$, $||x^*|| = 1$.
Gradient at $x^*$: $\nabla l(x^*) = [2x_1^*, 2x_2^*, 2x_3^*] = 2x^*$
Let $d \in \mathbb{R}^3$ be a given tangent direction at $x^*$, i.e.,
$(2x^*)^T d = 0$.
Then according to the previous theorem there exists a smooth curve $x(t)$ such that
$x(0) = x^*$, $x'(0) = d$, $l(x(t)) = 0 \forall t$.
Let's construct that curve.
### Visual Description
Text-only slide.
---
## Page 12
### Content
Example [continued]
Since $\nabla l(x^*) = 2x^*$, the tangent space at $x^*$ is $T(x^*) = \{d \in \mathbb{R}^3 : (x^*)^T d = 0\}$.
Assume $d \neq 0$, and define $\alpha = ||d||$.
Then $\frac{d}{\alpha}$ is a unit vector orthogonal to $x^*$.
Define the curve
$x(t) = \cos(\alpha t) x^* + \sin(\alpha t) \frac{d}{\alpha}$.
We can see that $x(0) = x^*$.
### Visual Description
Text-only slide.
---
## Page 13
### Content
Example [continued]
$x(t) = \cos(\alpha t) x^* + \sin(\alpha t) \frac{d}{\alpha}$.
Let's prove that $x(t)$ is feasible, that is $l(x(t)) = 0$.
$||x(t)||^2 = \cos^2(\alpha t) ||x^*||^2 + \sin^2(\alpha t) ||\frac{d}{\alpha}||^2 + 2\cos(\alpha t) \sin(\alpha t) (x^*)^T \frac{d}{\alpha}$.
$= \cos^2(\alpha t) ||x^*||^2 + \sin^2(\alpha t) ||\frac{d}{\alpha}||^2$ [since $(x^*)^T d = 0$]
$= \cos^2(\alpha t) + \sin^2(\alpha t)$ [since $||x^*|| = 1$]
$= \cos^2(\alpha t) + \sin^2(\alpha t) = 1$ [since $||\frac{d}{\alpha}|| = 1$]
Hence $l(x(t)) = 0$ for all $t$.
### Visual Description
Text-only slide.
---
## Page 14
### Content
Example [continued]
$x(t) = \cos(\alpha t) x^* + \sin(\alpha t) \frac{d}{\alpha}$.
Differentiating,
$x'(t) = -\alpha \sin(\alpha t) x^* + \alpha \cos(\alpha t) \frac{d}{\alpha}$
$= -\alpha \sin(\alpha t) x^* + \cos(\alpha t) d$.
Evaluating at $t = 0$ gives
$x'(0) = d$.
Thus $x(t)$ is a feasible curve passing through $x^*$ with tangent direction $d$.
### Visual Description
Text-only slide.
---
## Page 15
### Content
Example [continued]
$l(x) = x_1^2 + x_2^2 + x_3^2 - 1$.
$x(t) = \cos(\alpha t) x^* + \sin(\alpha t) \frac{d}{\alpha}$.
Feasible Curve on the Unit Sphere
### Visual Description
A 3D plot of a unit sphere with a curve (labeled x(t)) drawn on its surface, passing through a point (labeled x*). The curve appears to be a great circle. Axes are labeled -1.0 to 1.0.
---
## Page 16
### Content
KKT Conditions for Nonconvex Problems
### Visual Description
Title slide for a new section.
---
## Page 17
### Content
KKT Conditions for Nonconvex Problems

$$
\inf_{x \in R^N} f(x) \\
\text{subject to } h_i(x) \le 0, i = 1,... m \\
l_j(x) = 0, j = 1, ... r
$$

Here $f, h_i, l_j$ are differentiable and potentially non-convex functions.

**Theorem [Nonconvex KKT, Necessary conditions for LOCAL optimality]**
Under mild conditions, if $\hat{x}$ is a local minimum, then there exist $(\hat{u}, \hat{v})$ such that $(\hat{x}, \hat{u}, \hat{v})$ is a KKT point (i.e satisfies the KKT conditions):

$$
h_i(\hat{x}) \le 0, i \in \{1,...,m\} \quad (1) \text{] primal feasibility} \\
l_j(\hat{x}) = 0, j \in \{1,...,r\} \quad (2) \\
\hat{v} \ge 0 \quad (3) \text{ dual feasibility} \\
\hat{v}_i h_i(\hat{x}) = 0, i \in \{1,...,m\} \quad (4) \text{ complementary slackness} \\
\nabla f(\hat{x}) + \sum_{i=1}^{m} \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^{r} \hat{u}_j \nabla l_j(\hat{x}) = 0 \quad (5) \text{ stationarity}
$$
### Visual Description
Text-only slide.
---
## Page 18
### Content
Nonconvex KKT,
Necessary conditions for local optimality

$$
h_i(\hat{x}) \le 0, i \in \{1,...,m\} \quad (1) \text{] primal feasibility} \\
l_j(\hat{x}) = 0, j \in \{1,...,r\} \quad (2) \\
\hat{v} \ge 0 \quad (3) \text{ dual feasibility} \\
\hat{v}_i h_i(\hat{x}) = 0, i \in \{1,...,m\} \quad (4) \text{ complementary slackness} \\
\nabla f(\hat{x}) + \sum_{i=1}^{m} \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^{r} \hat{u}_j \nabla l_j(\hat{x}) = 0 \quad (5) \text{ stationarity}
$$

i) In practice, we try to find all KKT points: $\{\hat{x}_i, \hat{u}_i, \hat{v}_i\}_{i=1}^n$
ii) When we found all KKT points, we select $\hat{x}_i$ with the smallest objective value. Under some conditions, this can be a local minimum point. [It might be also a local maximum, or a saddle point...]
iii) The other KKT points will be local maximum, other local minimum, or saddle points.
### Visual Description
Text-only slide.
---
## Page 19
### Content
Second Order Conditions [Unconstrained Case]

$$
\inf_{x \in R^N} f(x) \\
\text{subject to } h_i(x) \le 0, i = 1,...m \\
l_j(x) = 0, j = 1, ... r
$$

If there are no constraints, the Lagrangian reduces to $L(x) = f(x)$, and we use the Hessian:
$$
H = \nabla^2 f(x^*).
$$
Then:
* If $H$ is positive definite $\implies$ local minimum.
* If $H$ is negative definite $\implies$ local maximum.
* If $H$ is indefinite $\implies$ saddle point.
### Visual Description
Text-only slide.
---
## Page 20
### Content
Second Order Conditions [Equality Constrains Only]
### Visual Description
A title slide with the text "Second Order Conditions [Equality Constrains Only]".
---
## Page 21
### Content
Second Order Conditions [Equality Constrains Only]

Consider the optimization problem
$$
\min_{x \in R^N} f(x) \\
\text{s.t. } l_j(x) = 0, \quad j = 1, ..., p,
$$
where $f, l_1, ..., l_p$ are twice continuously differentiable.

Define the Lagrangian
$$
L(x,u) = f(x) + \sum_{j=1}^{p} u_j l_j(x),
$$
where $u \in R^p$ is unrestricted.
### Visual Description
Text-only slide.
---
## Page 22
### Content
Second Order Conditions [Equality Constrains Only]

Let $(x^*, u^*)$ satisfy the KKT conditions
$$
l_j(x^*) = 0, \quad j = 1, ..., p, \\
\nabla_x L(x^*, u^*) = 0.
$$
**Definition [tangent space]:**
$$
T(x^*) := \{d \in R^n : \nabla l_j(x^*)^T d = 0, j = 1,...,p\} .
$$
**Definition [constraint Jacobian]:** $G = [\nabla l_1(x^*) ... \nabla l_r(x^*)]$
$$
T(x^*) = \{d \in R^2 : G^T d = 0\}
$$
Informally: The tangent space determines the directions we are allowed to move a tiny amount from $x^*$, while satisfying the equality constraints
More formally: The set of directions along which you can move while staying feasible to first order
### Visual Description
Text-only slide.
---
## Page 23
### Content
Normal and Tangent

$$
T(x^*) = \{d \in R^3 : \nabla l(x, y, z)^T d = 0\}
$$
### Visual Description
The slide displays two diagrams illustrating normal and tangent concepts. The left diagram shows a 2D curve defined by $l(x,y)=0$. A point P is marked on the curve, with a green arrow representing the normal vector $\nabla l(x,y)$ perpendicular to the curve, and a pink line representing the tangent at P. The right diagram shows a 3D surface defined by $l(x,y,z)=0$. A point P is on the surface, with a yellow arrow showing the normal vector $\nabla l(x,y,z)$ perpendicular to the surface, and a yellow plane representing the tangent plane at P. A vector $r'(t_0)$ is shown on the tangent plane.
---
## Page 24
### Content
Second Order Conditions [Equality Constrains Only]

**Theorem [Second-order sufficient condition]**
Assume $(x^*, u^*)$ satisfies the KKT conditions and
$$
d^T \nabla_{xx}^2 L(x^*, u^*) d > 0 \quad \forall d \in T(x^*) \setminus \{0\}.
$$
Then $x^*$ is a strict local minimum.
### Visual Description
Text-only slide.
---
## Page 25
### Content
Proof of Theorem
Second-order sufficient condition,
Equality Constrains Only
### Visual Description
Text-only slide.
---
## Page 26
### Content
Proof

Define the Lagrangian $L(x, u) = f(x) + \sum_{j=1}^p u_j l_j(x)$, where $u \in \mathbb{R}^p$ is unrestricted.
Assume $(x^*, u^*)$ satisfies the KKT conditions
Assume $\nabla l(x^*)$ has full rank $p$
Let $x(t)$ be any twice continuously differentiable feasible curve on $(-\epsilon, \epsilon)$ with
$x(0) = x^*$, $x'(0) = d \in T(x^*)$.
[We already proved that this curve exists]
Because the curve is feasible for all $t \in (-\epsilon, \epsilon)$,
$L(x(t), u^*) = f(x(t)) + \sum_{j=1}^p u_j^* \cdot 0 = f(x(t))$
### Visual Description
A slide presenting the initial steps of a proof, including the definition of the Lagrangian and assumptions about KKT conditions and a feasible curve. Mathematical equations are used to define the Lagrangian and show the relationship between $L(x(t), u^*)$ and $f(x(t))$.
---
## Page 27
### Content
Proof

Define $\psi(t) := L(x(t), u^*) = f(x(t))$
$\Rightarrow \psi'(t) = \frac{\partial}{\partial x} L(x(t), u^*) \frac{\partial x(t)}{\partial t}$
$\Rightarrow \psi'(0) = \nabla_x L(x^*, u^*)^T x'(0)$
$= \nabla_x L(x^*, u^*)^T d = 0$
[since $\nabla_x L(x^*, u^*) = 0$ by the KKT assumptions]
$\psi''(t) = x'(t)^T \nabla_{xx}^2 L(x(t), u^*) x'(t) + \nabla_x L(x(t), u^*)^T x''(t)$.
$\Rightarrow \psi''(0) = d^T \nabla_{xx}^2 L(x^*, u^*) d$
### Visual Description
A slide continuing the proof, defining $\psi(t)$ and deriving its first and second derivatives with respect to $t$. The derivations show how KKT assumptions lead to $\psi'(0) = 0$ and simplify $\psi''(0)$.
---
## Page 28
### Content
Proof [Continued]

$\psi''(0) = d^T \nabla_{xx}^2 L(x^*, u^*) d$
If $d \neq 0$, then by assumption
$\psi''(0) > 0$.
Thus every nontrivial feasible tangent direction has positive second-order curvature.
So starting from $x^*$, $f$ increases to second order along every nonzero feasible tangent direction.
Therefore $x^*$ is a strict local minimum.
### Visual Description
A slide concluding the proof, stating the condition for $\psi''(0) > 0$ and explaining its implication for the function $f$ and the nature of $x^*$ as a strict local minimum.
---
## Page 29
### Content
Remark

For a maximization problem, the signs are reversed:
$d^T \nabla_{xx}^2 L(x^*, u^*) d \le 0 \quad \forall d \in T(x^*)$
is necessary for a local maximum, and
$d^T \nabla_{xx}^2 L(x^*, u^*) d < 0 \quad \forall d \in T(x^*) \setminus \{0\}$
is sufficient for a strict local maximum.
### Visual Description
A slide presenting a remark about how the second-order conditions change for a maximization problem, reversing the inequality signs for necessary and sufficient conditions.
---
## Page 30
### Content
Example 1
### Visual Description
Text-only slide.
---
## Page 31
### Content
Example 1

$\min_{x_1,x_2} f(x_1,x_2) = x_2 + x_1^2$ subject to $l(x_1,x_2) = x_2 - x_1^2 = 0$.
level sets of $f(x_1,x_2) = x_2 + x_1^2$
$l(x_1,x_2) = x_2 - x_1^2 = 0$
$x^* = (0,0)$
### Visual Description
A 2D plot illustrating Example 1. The plot shows level sets of the objective function $f(x_1, x_2) = x_2 + x_1^2$ as a series of green parabolas opening upwards. The equality constraint $l(x_1, x_2) = x_2 - x_1^2 = 0$ is depicted as a blue parabola opening upwards, passing through the origin. The optimal point $x^* = (0,0)$ is marked at the origin, where the constraint curve is tangent to the lowest level set. The axes are labeled $x_1$ and $x_2$.
---
## Page 32
### Content
Example 1

Theorem [Second-order sufficient condition]
$\min_{x_1,x_2} f(x_1,x_2) = x_2 + x_1^2$ subject to $l(x_1,x_2) = x_2 - x_1^2 = 0$.
Lagrangian function: $L([x_1,x_2], u) = f(x_1,x_2) + u \cdot l(x_1,x_2)$
$= x_2 + x_1^2 + u \cdot (x_2 - x_1^2)$
KKT conditions
$l(x_1^*, x_2^*) = 0$
$\nabla_{x_1,x_2}L ([x_1^*, x_2^*], u^*) = 0$
$\left. \begin{array}{c} x_2^* - (x_1^*)^2 = 0 \\ 2x_1^* - 2u^*x_1^* = 0 \\ 1 + u^* = 0 \end{array} \right\}$
$\Rightarrow u^* = -1 \Rightarrow 4x_1^* = 0 \Rightarrow x_1^* = 0 \Rightarrow x_2^* = 0$
The KKT point is $u^* = -1 \quad x^* = [0,0]$
### Visual Description
A slide detailing the application of the second-order sufficient condition to Example 1. It presents the minimization problem, defines the Lagrangian function, lists the KKT conditions as a system of three equations, and then shows the step-by-step solution to find the KKT point $u^* = -1$ and $x^* = [0,0]$.
---
## Page 33
### Content
Example 1

$l(x_1,x_2) = x_2 - x_1^2 \implies \nabla l(x_1,x_2) = \begin{pmatrix} -2x_1 \\ 1 \end{pmatrix}$

The constraint's tangent space:
$T(x_1^*, x_2^*) := \{d \in \mathbb{R}^2 : \nabla_{x_1,x_2}l(x_1^*, x_2^*)^T d = 0\}$.
$= \{d \in \mathbb{R}^2 : [-2x_1^*, 1]d = 0\}$.
$= \left\{\begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : [0,1] \begin{pmatrix} d_1 \\ d_2 \end{pmatrix} = 0\right\}$.
$= \left\{\begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : d_2 = 0\right\}$.
### Visual Description
Text-only slide.
---
## Page 34
### Content
Example 1

level sets of $f(x_1, x_2) = x_2 + x_1^2$
$l(x_1, x_2) = x_2 - x_1^2 = 0$

$x^* = (0,0)$
### Visual Description
A 2D plot showing the x1 and x2 axes. Green parabolic level sets for $f(x_1, x_2) = x_2 + x_1^2$ are shown, opening upwards. A blue parabola representing the constraint $l(x_1, x_2) = x_2 - x_1^2 = 0$ is also plotted. At the point $x^* = (0,0)$, a black dot is marked. From this point, a red arrow points upwards, labeled $\nabla l(x^*)$, and an orange arrow points to the right, labeled $d$.
---
## Page 35
### Content
Example 1

$L([x_1,x_2], u) = x_2 + x_1^2 + u \cdot (x_2-x_1^2)$
$\nabla_x L([x_1,x_2], u) = \begin{pmatrix} 2x_1 - 2ux_1 \\ 1 + u \end{pmatrix}$
$\nabla_{xx}L([x_1,x_2], u) = \begin{pmatrix} 2 - 2u & 0 \\ 0 & 0 \end{pmatrix}$
$\nabla_{xx}L([x_1^*, x_2^*], u^*) = \begin{pmatrix} 4 & 0 \\ 0 & 0 \end{pmatrix}$

$T(x_1^*, x_2^*) = \left\{\begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : d_2 = 0\right\}$.
Let $d \in T(x^*) \setminus \{0\}$
$d^T \nabla_{xx}^2 L(x^*, u^*) d = (d_1,0) \begin{pmatrix} 4 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} d_1 \\ 0 \end{pmatrix} > 0$
$\implies x^*$ is a strict local minimum.
### Visual Description
Text-only slide.
---
## Page 36
### Content
Example 2
### Visual Description
A title slide with "Example 2" centered on the page.
---
## Page 37
### Content
Example 2 [KKT Conditions]

$\min_{x,y} f(x,y) = x^2 + y^2 \quad \text{s.t.} \quad l(x, y) = x + y - 1 = 0$.

Lagrangian: $L(x, y, \lambda) = x^2 + y^2 + u(x + y - 1)$.

KKT First order conditions: $L_x(x, y, u) = 2x + u = 0$, $L_y(x, y, u) = 2y + u = 0$
Equality constraint: $x + y = 1$. [3 equations, 3 variables]

From the first two, $x = y$; with $x + y = 1$ we get $x^* = y^* = \frac{1}{2}$ and $u^* = -1$.

Second-order check. $\nabla^2_{[x,y]} L = 2I \succ 0$.

Let $G^T = [\nabla_x(x^* + y^* - 1), \nabla_y(x^* + y^* -1)] = [1, 1]$ be the constraint Jacobian.
Define the tangent space: $T(x^*) = \{d \in \mathbb{R}^2 : G^T d = 0\} = \{d \in \mathbb{R}^2 : [1, 1]d = 0\}$.
The quadratic form is positive on the tangent space, so $(\frac{1}{2}, \frac{1}{2})$ is a strict local minimum.
### Visual Description
Text-only slide.
---
## Page 38
### Content
Inequality Constraints
### Visual Description
A title slide with "Inequality Constraints" centered on the page.
---
## Page 39
### Content
Problem Setting

Consider the nonlinear (and possibly nonconvex) optimization problem
$\min_{x \in \mathbb{R}^n} f(x)$
s.t. $h_i(x) \le 0, \quad i = 1, ..., m,$
$l_j(x) = 0, \quad j = 1, ..., p,$
where $f, h_i, l_j$ are twice continuously differentiable.

Define the Lagrangian
$L(x,u,v) = f(x) + \sum_{j=1}^p u_j l_j(x) + \sum_{i=1}^m v_i h_i(x), \quad v \ge 0,$
where $u \in \mathbb{R}^p$ is unrestricted and $v \in \mathbb{R}^m$ satisfies $v_i \ge 0$.
### Visual Description
Text-only slide.
---
## Page 40
### Content
KKT Point

Let $(x^*, u^*, v^*)$ be a KKT point, i.e.,
$h_i(x^*) \le 0, \quad i = 1, ..., m,$
$l_j(x^*) = 0, \quad j = 1, ..., p,$
$v_i^* \ge 0, \quad i = 1, ..., m,$
$v_i^* h_i(x^*) = 0, \quad i = 1, ..., m,$
$\nabla_x L(x^*, u^*, v^*) = 0.$
### Visual Description
Text-only slide.
---
## Page 41
### Content
Active Inequality Set and Linear Independence Constraint Qualification (LICQ)

**Definition [active inequality set]**
Let $x^*$ be a feasible point, and define the active inequality set
$A(x^*) = \{i \in \{1, ..., m\} : h_i(x^*) = 0 \}$.

**Definition [Linear Independence Constraint Qualification (LICQ)]**
The Linear Independence Constraint Qualification (LICQ) holds at $x^*$, if the vectors
$\{\nabla l_j(x^*)\}_{j=1}^p \cup \{\nabla h_i(x^*) : i \in A(x^*)\}$
are linearly independent.
### Visual Description
A slide defining the active inequality set and the Linear Independence Constraint Qualification (LICQ), including mathematical notation for both definitions.
---

## Page 42
### Content
Linearized Cone and Critical Cone

**Definition [Linearized cone (first-order feasible directions)]**: The linearized cone at $x^*$ is defined as
$$C_{lin}(x^*) := \left\{d \in \mathbb{R}^n : \begin{array}{ll} \nabla l_j(x^*)^T d = 0, & j = 1,..., p, \\ \nabla h_i(x^*)^T d \le 0, & i \in A(x^*) \end{array}\right\}$$

**Definition [Critical cone (with respect to multipliers)]**: Let $(u^*, v^*)$ be Lagrange multipliers associated with $x^*$, satisfying the KKT conditions. The critical cone is defined as
$$C(x^*) := \left\{d \in \mathbb{R}^n : \begin{array}{ll} \nabla l_j(x^*)^T d = 0, & j = 1, ..., p, \\ \nabla h_i(x^*)^T d = 0, & i \in A(x^*) \text{ with } v_i^* > 0, \\ \nabla h_i(x^*)^T d \le 0, & i \in A(x^*) \text{ with } v_i^* = 0 \end{array}\right\}$$

**Lemma [Critical cone is subset of linearized cone]**: $C(x^*) \subseteq C_{lin}(x^*)$
### Visual Description
A slide presenting definitions for the linearized cone and the critical cone, both including multi-line mathematical definitions. It concludes with a lemma stating that the critical cone is a subset of the linearized cone.
---

## Page 43
### Content
Feasible curve realization under LICQ

**Lemma: [Feasible curve realization under LICQ]**
Let $x^*$ be a feasible point, and assume LICQ holds at $x^*$.
$A(x^*) = \{i: h_i(x^*) = 0\}$
$C_{lin}(x^*) = \{d \in \mathbb{R}^n : \nabla l_j(x^*)^T d = 0 \forall j, \nabla h_i(x^*)^T d \le 0 \forall i \in A(x^*)\}$.

Then for every $d \in C_{lin}(x^*)$,
there exists $\varepsilon > 0$
and a twice continuously differentiable curve $x : [0, \varepsilon) \to \mathbb{R}^n$ such that
$x(0) = x^*$, $x'(0) = d$,
and $x(t)$ is feasible for all sufficiently small $t \ge 0$.

**Proof: Appendix**
### Visual Description
A slide detailing a lemma about feasible curve realization under LICQ, including mathematical definitions for the active set and linearized cone, and conditions for the curve. It notes that the proof is in the appendix.
---

## Page 44
### Content
Main Theorem:
Second-order sufficient condition
[Inequality constraints]
### Visual Description
Text-only slide.
---

## Page 45
### Content
Theorem: [Second-order sufficient condition]

**Definition [Critical cone (with respect to multipliers)]**: Let $(u^*, v^*)$ be Lagrange multipliers associated with $x^*$, satisfying the KKT conditions. The critical cone is defined as
$$C(x^*) := \left\{d \in \mathbb{R}^n : \begin{array}{ll} \nabla l_j(x^*)^T d = 0, & j = 1, ..., p, \\ \nabla h_i(x^*)^T d = 0, & i \in A(x^*) \text{ with } v_i^* > 0, \\ \nabla h_i(x^*)^T d \le 0, & i \in A(x^*) \text{ with } v_i^* = 0 \end{array}\right\}$$

**Theorem: [Second-order sufficient condition]** Assume $(x^*, u^*, v^*)$ is a KKT point, LICQ holds at $x^*$, and
$d^T \nabla^2_{xx} L(x^*, u^*, v^*) d > 0 \quad \forall d \in C(x^*) \setminus \{0\}$.
Then $x^*$ is a strict local minimum.

**Proof: Appendix**
### Visual Description
A slide presenting the definition of the critical cone (with respect to multipliers) and a theorem for the second-order sufficient condition, including mathematical expressions for the critical cone and the condition for a strict local minimum. It notes that the proof is in the appendix.
---

## Page 46
### Content
Thanks for your Attention 🙂
### Visual Description
A "Thanks for your Attention" slide with a smiley face emoji.
---

## Page 47
### Content
Appendix
### Visual Description
Text-only slide.
---

## Page 48
### Content
Proof of Theorem
Tangent Space => Feasible Curves
[Feasible Curves with Prescribed Tangent]
### Visual Description
Text-only slide.
---
## Page 49
### Content
Tangent Space => Feasible Curves
Theorem [Existence of feasible curves with prescribed tangent direction]:
* Let $l : \mathbb{R}^n \to \mathbb{R}^p$ be $C^2$, $n \ge p$
* Let $x^* \in \mathbb{R}^n$ satisfy $l(x^*) = 0$.
* Assume that the Jacobian $\nabla l(x^*) \in \mathbb{R}^{p \times n}$ has full row rank $p$.

Then for every $d \in \text{ker } \nabla l(x^*)$,
there exists $\varepsilon > 0$ and a $C^2$ curve $x : (-\varepsilon, \varepsilon) \to \mathbb{R}^n$
such that
$x(0) = x^*$, $x'(0) = d$, $l(x(t)) = 0$ for all $t \in (-\varepsilon, \varepsilon)$.
### Visual Description
The slide presents a theorem about the existence of feasible curves with a prescribed tangent direction. The theorem lists three conditions: $l$ is a $C^2$ function, $x^*$ is a point satisfying $l(x^*) = 0$, and the Jacobian $\nabla l(x^*)$ has full row rank. It then states that for any $d$ in the kernel of $\nabla l(x^*)$, there exists a $C^2$ curve $x(t)$ such that $x(0) = x^*$, $x'(0) = d$, and $l(x(t)) = 0$ for $t$ in a small interval.
---

## Page 50
### Content
Proof
Let $x^* \in \mathbb{R}^n$ satisfy $l(x^*) = 0_p$.
Since $\nabla l(x^*)$ has full row rank $p$, some $p \times p$ submatrix of $\nabla l(x^*)$ is invertible.
Let's relabeling coordinates if necessary such that $y$ will correspond to those $p$ coordinates:
$x = (y, z)$, $y \in \mathbb{R}^p$, $z \in \mathbb{R}^{n-p}$,
so that the matrix
$\frac{\partial l}{\partial y}(x^*) \in \mathbb{R}^{p \times p}$
is invertible.
### Visual Description
The slide begins the proof of the theorem from the previous page. It states the initial condition $l(x^*) = 0_p$. It then leverages the full row rank of $\nabla l(x^*)$ to assert the existence of an invertible $p \times p$ submatrix. The coordinates are relabeled as $x = (y, z)$, where $y$ corresponds to the $p$ coordinates associated with the invertible submatrix, ensuring that the partial derivative matrix $\frac{\partial l}{\partial y}(x^*)$ is invertible.
---

## Page 51
### Content
Proof [continued]
$x^*$ is already given. Let's rewrite it as $x^* = (y^*, z^*)$.
According to our assumptions, $l(y^*, z^*) = l(x^*) = 0$,
and $\nabla_y l(y^*, z^*) \in \mathbb{R}^{p \times p}$ is invertible.
By the Implicit Function Theorem, there exist neighborhoods:
$U \subset \mathbb{R}^{n-p}$ of $z^*$
and $V \subset \mathbb{R}^p$ of $y^*$
and a continuously differentiable function $g : U \to V$
such that the feasible set in $V$ and $U$ (around $x^*$) is exactly
$\{(y, z) \in V \times U : l(y, z) = 0\} = \{(g(z), z) : z \in U\}$.
### Visual Description
The proof continues by rewriting $x^*$ as $(y^*, z^*)$ and reiterating that $l(y^*, z^*) = 0$ and $\nabla_y l(y^*, z^*)$ is invertible. It then applies the Implicit Function Theorem, stating the existence of neighborhoods $U$ for $z^*$ and $V$ for $y^*$, and a $C^1$ function $g: U \to V$. This function $g$ implicitly defines the feasible set around $x^*$ as points $(g(z), z)$ where $z \in U$.
---

## Page 52
### Content
Proof [continued]
Let $d = (d_y, d_z) \in \mathbb{R}^p \times \mathbb{R}^{n-p}$ satisfy $\nabla l(x^*)d = 0$.
We will construct a feasible curve with initial velocity $d$.
Define $z(t) := z^* + t d_z$, for sufficiently small $t$.
and set $x(t) := (g(z(t)), z(t)) = (y(t), z(t))$.
We will let $\varepsilon > 0$ be so small such that $z(t) \in U$, $y(t) \in V$ for all $t \in (-\varepsilon, \varepsilon)$ set.
Since $g$ is $C^2$, the curve $x(t)$ is $C^2$.
By construction, $l(x(t)) = l(y(t), z(t)) = l(g(z(t)), z(t)) = 0$,
so the curve $x(t)$ is feasible.
Clearly, $x(0) = (g(z^*), z^*) = (y^*, z^*) = x^*$.
### Visual Description
The proof continues by defining $d = (d_y, d_z)$ such that $\nabla l(x^*)d = 0$. The goal is to construct a feasible curve with initial velocity $d$. A curve $z(t) = z^* + t d_z$ is defined, and then $x(t)$ is constructed using the function $g$ from the Implicit Function Theorem as $x(t) = (g(z(t)), z(t))$. The slide ensures that for a sufficiently small $\varepsilon$, $z(t)$ and $y(t)$ remain in their respective neighborhoods. It states that $x(t)$ is $C^2$ and feasible (i.e., $l(x(t))=0$), and verifies that $x(0) = x^*$.
---

## Page 53
### Content
Proof [continued]
It remains to show that $x'(0) = d = (d_y, d_z)$.
We already know: $x(0) = (g(z^*), z^*) = (y^*, z^*) = x^*$.
$z(t) := z^* + t d_z$, for sufficiently small $t$.
$x(t) := (g(z(t)), z(t))$.
Since $x(t) := (g(z(t)), z(t))$, we have that
$x'(0) = \left(\frac{\partial g(z(t))}{\partial z} \frac{\partial z(t)}{\partial t}, \frac{\partial z(t)}{\partial t}\right)\Big|_{t=0}$.
$= (\nabla_z g(z^*)d_z, d_z)$.
Thus, to prove that $x'(0) = (d_y, d_z)$, we must prove that $d_y = \nabla_z g(z^*)d_z$.
### Visual Description
The slide focuses on the remaining part of the proof: showing that the initial velocity of the constructed curve $x(t)$ is indeed $d$. It reiterates the definitions of $x(0)$, $z(t)$, and $x(t)$. Then, it calculates the derivative $x'(0)$ using the chain rule, resulting in $x'(0) = (\nabla_z g(z^*)d_z, d_z)$. The slide concludes by stating that the final step is to prove $d_y = \nabla_z g(z^*)d_z$.
---

## Page 54
### Content
Proof [continued]
Since $d \in \text{ker } \nabla_x l(x^*)$, we have
$\nabla_x l(x^*)d = 0$.
In other words,
$\frac{\partial l}{\partial y}(x^*)d_y + \frac{\partial l}{\partial z}(x^*)d_z = 0$.
Now, since $\frac{\partial l}{\partial y}(x^*)$ is invertible,
$d_y = -\left(\frac{\partial l}{\partial y}(x^*)\right)^{-1} \frac{\partial l}{\partial z}(x^*)d_z$.
### Visual Description
The proof continues by using the condition that $d$ is in the kernel of $\nabla_x l(x^*)$, which means $\nabla_x l(x^*)d = 0$. This is expanded into a sum of partial derivatives multiplied by $d_y$ and $d_z$. Since $\frac{\partial l}{\partial y}(x^*)$ is invertible (established earlier), the equation is rearranged to solve for $d_y$ in terms of $d_z$ and the partial derivative matrices.
---

## Page 55
### Content
Proof [continued]
$d_y = -\left(\frac{\partial l}{\partial y}(x^*)\right)^{-1} \frac{\partial l}{\partial z}(x^*)d_z$.
On the other hand, the Implicit Function Theorem gives
$\nabla_z g(z^*) = -\left(\frac{\partial l}{\partial y}(x^*)\right)^{-1} \frac{\partial l}{\partial z}(x^*)$.
Therefore,
$\nabla_z g(z^*)d_z = d_y$.
This implies that $x'(0) = (d_y, d_z) = d$.
So $x(t)$ is a $C^2$ feasible curve satisfying
$x(0) = x^*$, $x'(0) = d$.
### Visual Description
The slide brings together the previous results. It restates the expression for $d_y$. Then, it recalls the formula for $\nabla_z g(z^*)$ derived from the Implicit Function Theorem. By substituting this into the expression for $d_y$, it shows that $\nabla_z g(z^*)d_z = d_y$. This equality confirms the final condition needed for $x'(0) = d$. The slide concludes by summarizing that $x(t)$ is a $C^2$ feasible curve satisfying both $x(0) = x^*$ and $x'(0) = d$, thus completing the proof.
---

## Page 56
### Content
Feasible curve realization under LICQ
[We have inequality constraints too]
### Visual Description
Text-only slide.
---
## Page 57
### Content
Feasible curve realization under LICQ
**Lemma: [Feasible curve realization under LICQ]**
Let $x^*$ be a feasible point, and assume LICQ holds at $x^*$.
$A(x^*) = \{i: h_i(x^*) = 0\}$
$C_{lin}(x^*) = \{d \in \mathbb{R}^n : \nabla l_j(x^*)^T d = 0 \forall j, \nabla h_i(x^*)^T d \le 0 \forall i \in A(x^*)\}$.
Then for every $d \in C_{lin}(x^*)$,
there exists $\varepsilon > 0$
and a twice continuously differentiable curve $x : [0, \varepsilon) \to \mathbb{R}^n$ such that
$x(0) = x^*$, $x'(0) = d$,
and $x(t)$ is feasible for all sufficiently small $t \ge 0$.
Proof: [Next slides]
### Visual Description
The slide presents a lemma titled "Feasible curve realization under LICQ". It defines $A(x^*)$ as the set of active inequality constraints and $C_{lin}(x^*)$ as the linearized feasible cone. The lemma states that for any direction $d$ in $C_{lin}(x^*)$, there exists a feasible curve $x(t)$ starting at $x^*$ with tangent $d$. The proof is indicated to follow on subsequent slides.
---
## Page 58
### Content
Proof of
Feasible arc lemma under LICQ
### Visual Description
This is a title slide for the proof of the "Feasible arc lemma under LICQ". The text "Proof of Feasible arc lemma under LICQ" is centered on a white background.
---
## Page 59
### Content
Let $d \in C_{lin}(x^*)$ be a given vector.
**Proof**
We will need to construct the $x : [0, \varepsilon) \to \mathbb{R}^n$ curve and show it is feasible
Define
$A(x^*) = \{i: h_i(x^*) = 0\}$,
$I_0 := \{i \in A(x^*) : \nabla h_i(x^*)^T d = 0\}$.
Consider the mapping
$F(x) = (l_1(x),...,l_p(x), h_i(x) (i \in I_0))$.
Then $F:\mathbb{R}^n \to \mathbb{R}^{p+|I_0|}$ is $C^2$, and
$F(x^*) = 0$.
### Visual Description
The slide outlines the initial steps of the proof. It starts by defining $A(x^*)$ and $I_0$, then introduces a mapping $F(x)$ which combines equality constraints and active inequality constraints whose gradients are orthogonal to $d$. It states that $F(x)$ is $C^2$ and $F(x^*) = 0$.
---
## Page 60
### Content
Proof [Continued]
By LICQ, the gradients
$\{\nabla l_j(x^*)\}_{j=1}^p \cup \{\nabla h_i(x^*)\}_{i \in A(x^*)}$
are linearly independent.
$F(x) = (l_1(x),..., l_p(x), h_i(x) (i \in I_0))$.
Hence the Jacobian $\nabla F(x^*)$ has full row rank.
$C_{lin}(x^*) = \{d \in \mathbb{R}^n : \nabla l_j(x^*)^T d = 0 \forall j, \nabla h_i(x^*)^T d \le 0 \forall i \in A(x^*)\}$.
$I_0 := \{i \in A(x^*) : \nabla h_i(x^*)^T d = 0\}$
Since $d \in C_{lin}(x^*)$, we have
$\nabla l_j(x^*)^T d = 0 \forall j$,
$\nabla h_i(x^*)^T d = 0 \forall i \in I_0$,
so $\nabla F(x^*) d = 0$.
### Visual Description
The slide continues the proof, leveraging the LICQ condition to state that the gradients of active constraints are linearly independent. It reiterates the definition of $F(x)$ and concludes that its Jacobian $\nabla F(x^*)$ has full row rank. It then uses the definition of $d \in C_{lin}(x^*)$ and $I_0$ to show that $\nabla F(x^*)d = 0$.
---
## Page 61
### Content
Proof [Continued]
We already know:
$F:\mathbb{R}^n \to \mathbb{R}^{p+|I_0|} = \mathbb{R}^k$ is a twice continuously differentiable mapping
$F(x^*) = 0_k$
$\nabla F(x^*) d = 0$.
$F(x) = (l_1(x),..., l_p(x), h_i(x) (i \in I_0))$.
By LICQ, the gradients $\{\nabla l_j(x^*)\}_{j=1}^p \cup \{\nabla h_i(x^*)\}_{i \in A(x^*)}$ are linearly independent.
Therefore, the Jacobian matrix $\nabla F(x^*) \in \mathbb{R}^{k \times n}$ has full row rank $k$.
### Visual Description
This slide continues the proof, summarizing the properties of the mapping $F(x)$ and its Jacobian. It states that $F$ is $C^2$, $F(x^*) = 0_k$, and $\nabla F(x^*)d = 0$. It re-emphasizes that due to LICQ, the Jacobian matrix $\nabla F(x^*)$ has full row rank $k$.
---
## Page 62
### Content
Reminder!
**Theorem [Existence of feasible curves with prescribed tangent direction]:**
* Let $l : \mathbb{R}^n \to \mathbb{R}^p$ be $C^2$, $n \ge p$
* Let $x^* \in \mathbb{R}^n$ satisfy $l(x^*) = 0$.
* Assume that the Jacobian $\nabla l(x^*) \in \mathbb{R}^{p \times n}$ has full row rank $p$.
Then for every $d \in \text{ker } \nabla l(x^*)$,
there exists $\varepsilon > 0$ and a $C^2$ curve $x : (-\varepsilon,\varepsilon) \to \mathbb{R}^n$
such that
$x(0) = x^*$, $x'(0) = d$, $l(x(t)) = 0$ for all $t \in (-\varepsilon,\varepsilon)$.
Let's use this theorem for $F(x) = (l_1(x),..., l_p(x), h_i(x) (i \in I_0))$
### Visual Description
This slide serves as a reminder, presenting a theorem about the existence of feasible curves with a prescribed tangent direction. The theorem outlines conditions on a $C^2$ function $l$, a point $x^*$ where $l(x^*)=0$, and a full row rank Jacobian $\nabla l(x^*)$. It concludes that for any $d$ in the kernel of $\nabla l(x^*)$, a $C^2$ curve $x(t)$ exists such that $x(0)=x^*$, $x'(0)=d$, and $l(x(t))=0$. The slide then states that this theorem will be applied to the previously defined function $F(x)$.
---
## Page 63
### Content
Proof [Continued]
We already know:
$F : \mathbb{R}^n \to \mathbb{R}^{p+|I_0|} = \mathbb{R}^k$
$F(x^*) = 0_k$
$\nabla F(x^*) d = 0$.
Let $M = \{x : F(x) = 0\}$ and $T_M(x^*) = \{v : \nabla F(x^*)v = 0\}$.
Therefore, $d \in T_M(x^*) = \{v : \nabla F(x^*)v = 0\}$
Using the previous theorem with the given $d \in T_M(x^*)$, we have that
there exists $\varepsilon > 0$ and a $C^2$ curve $x : (-\varepsilon,\varepsilon) \to \mathbb{R}^n$
such that
$x(0) = x^*$, $x'(0) = d$, $F(x(t)) = 0$ for all $t \in (-\varepsilon,\varepsilon)$.
### Visual Description
The slide continues the proof, reiterating the properties of $F(x)$ and the fact that $\nabla F(x^*)d=0$. It defines $M$ as the set of points where $F(x)=0$ and $T_M(x^*)$ as the tangent space at $x^*$. It then applies the theorem from the previous slide, concluding that there exists a $C^2$ curve $x(t)$ such that $x(0)=x^*$, $x'(0)=d$, and $F(x(t))=0$ for $t \in (-\varepsilon, \varepsilon)$.
---
## Page 64
### Content
Proof [Continued]
We already know: $F(x) = (l_1(x),..., l_p(x), h_i(x) (i \in I_0))$.
$x(0) = x^*$, $x'(0) = d$, $F(x(t)) = 0$ for all $t \in (-\varepsilon,\varepsilon)$.
Since $F(x(t)) = 0$ for all $t \in (-\varepsilon,\varepsilon)$,
$l_j(x(t)) = 0 \forall j$,
$h_i(x(t)) = 0 \forall i \in I_0$.
Now let $i \in A(x^*) \setminus I_0$. Then
$\nabla h_i(x^*)^T d < 0$.
Using Taylor expansion,
$h_i(x(t)) = h_i(x^*) + t \nabla h_i(x^*)^T d + o(t) = t \nabla h_i(x^*)^T d + o(t)$,
so for sufficiently small $t > 0$,
$h_i(x(t)) < 0$.
### Visual Description
The slide continues the proof by analyzing the implications of $F(x(t))=0$. It shows that $l_j(x(t))=0$ for all $j$ and $h_i(x(t))=0$ for $i \in I_0$. For active inequality constraints not in $I_0$ (i.e., $i \in A(x^*) \setminus I_0$), it uses the condition $\nabla h_i(x^*)^T d < 0$ and a Taylor expansion of $h_i(x(t))$ to demonstrate that $h_i(x(t)) < 0$ for sufficiently small $t > 0$.
---
## Page 65
### Content
Proof [Continued]
For $i \notin A(x^*)$, we have $h_i(x^*) < 0$, and by continuity,
for all sufficiently small $t$.
$h_i(x(t)) < 0$
Therefore, there exists $\epsilon > 0$ such that for all $t \in [0, \epsilon)$,
$h_i(x(t)) \le 0$,
$l_j(x(t)) = 0$,
so $x(t)$ is feasible.
### Visual Description
A slide with a title "Proof [Continued]" at the top. The main content is text and mathematical expressions explaining the feasibility of $x(t)$ based on continuity and the conditions for $h_i(x^*)$ and $l_j(x(t))$.
---

## Page 66
### Content
Main Theorem:
Second-order sufficient condition
[Inequality constraints]
### Visual Description
A title slide with "Main Theorem:" in blue, followed by "Second-order sufficient condition" and "[Inequality constraints]" in a larger blue font.
---

## Page 67
### Content
Theorem: [Second-order sufficient condition]
Definition [Critical cone (with respect to multipliers)]: Let $(u^*, v^*)$ be Lagrange multipliers associated with $x^*$, satisfying the KKT conditions. The critical cone is defined as
$$
C(x^*) := \left\{ d \in \mathbb{R}^n : \begin{array}{ll} \nabla l_j(x^*)^T d = 0, & j = 1,..., p, \\ \nabla h_i(x^*)^T d = 0, & i \in A(x^*) \text{ with } v_i^* > 0, \\ \nabla h_i(x^*)^T d \le 0, & i \in A(x^*) \text{ with } v_i^* = 0 \end{array} \right\}
$$
Theorem: [Second-order sufficient condition] Assume $(x^*, u^*, v^*)$ is a KKT point, LICQ holds at $x^*$, and
$$
d^T \nabla_{xx}^2 L(x^*, u^*, v^*) d > 0 \quad \forall d \in C(x^*) \setminus \{0\}.
$$
Then $x^*$ is a strict local minimum.
Proof [Next slides]
### Visual Description
A slide with a theorem title at the top. It contains a definition of the critical cone with a large mathematical expression, followed by the statement of the second-order sufficient condition theorem with another math expression. A note "Proof [Next slides]" is at the bottom.
---

## Page 68
### Content
Proof
Proof We assume $(x^*, u^*, v^*)$ is a KKT point, LICQ holds at $x^*$, and
$$
d^T \nabla_{xx}^2 L(x^*, u^*, v^*) d > 0 \quad \forall d \in C(x^*) \setminus \{0\}.
$$
Suppose, for contradiction, that $x^*$ is not a strict local minimum.
Then there exists a sequence of feasible points $x^k \to x^*$, $x^k \ne x^*$, such that
$f(x^k) \le f(x^*)$
Define $t_k := ||x^k - x^*||$,
$d_k := \frac{x^k - x^*}{t_k}$.
Then $||d_k|| = 1$ for all $k$, so $\{d_k\}$ lies in the n-dim unit sphere, which is compact.
Hence there exists a subsequence such that $d_k \to d$ for some $d$, and thus $||d|| = 1$.
### Visual Description
A slide titled "Proof". It outlines the initial steps of a proof by contradiction, including the assumption that $x^*$ is not a strict local minimum, the existence of a sequence $x^k$, and definitions of $t_k$ and $d_k$ with their properties. Several mathematical expressions are present.
---

## Page 69
### Content
Proof
Lemma
After some calculation, we can show that $d \in C(x^*)$.
Proof [Later]
### Visual Description
A slide titled "Proof" with a "Lemma" section. It contains a single statement about $d$ belonging to the critical cone, followed by a note about its proof being presented later.
---

## Page 70
### Content
Proof
$$
L(x, u, v) = f(x) + \sum_{j=1}^p u_j l_j(x) + \sum_{i=1}^m v_i h_i(x), \quad v \ge 0,
$$
$$
\begin{aligned}
L(x^k, u^*, v^*) &\le f(x^k) & \text{[since } x^k \text{ is feasible]} \\
&\le f(x^*) & \text{[$f(x^k) \le f(x^*)$ assumption]} \\
&= L(x^*, u^*, v^*) & \text{[complementary slackness]}
\end{aligned}
$$
### Visual Description
A slide titled "Proof". It presents a sequence of mathematical inequalities and equalities related to the Lagrangian function, with justifications in brackets for each step.
---

## Page 71
### Content
We already know
Proof
$L(x^k, u^*, v^*) \le L(x^*, u^*, v^*)$
$L(x^k, u^*, v^*) - L(x^*, u^*, v^*) \le 0$
$t_k d_k = x^k - x^*$
Now apply Taylor's theorem to the function $x \to L(x, u^*, v^*)$ at $x^*$:
$$
L(x^k, u^*, v^*) = L(x^*, u^*, v^*) + \nabla_x L(x^*, u^*, v^*)^T (x^k - x^*) + \frac{1}{2}(x^k - x^*)^T \nabla_{xx}^2 L(x^*, u^*, v^*)(x^k - x^*) + o(||x^k - x^*||^2).
$$
The linear term vanishes by stationarity, so
$$
L(x^k, u^*, v^*) - L(x^*, u^*, v^*) = \frac{t_k^2}{2} d_k^T \nabla_{xx}^2 L(x^*, u^*, v^*) d_k + o(t_k^2).
$$
### Visual Description
A slide titled "Proof". It starts by recalling known inequalities, then applies Taylor's theorem to the Lagrangian function, showing the full expansion and then a simplified version after the linear term vanishes. Several mathematical expressions are displayed.
---

## Page 72
### Content
We already know
Proof
$L(x^k, u^*, v^*) - L(x^*, u^*, v^*) \le 0$
$L(x^k, u^*, v^*) - L(x^*, u^*, v^*) = \frac{t_k^2}{2} d_k^T \nabla_{xx}^2 L(x^*, u^*, v^*) d_k + o(t_k^2)$.
Since the left-hand side is $\le 0$, we get
$$
\frac{t_k^2}{2} d_k^T \nabla_{xx}^2 L(x^*, u^*, v^*) d_k + o(t_k^2) \le 0.
$$
### Visual Description
A slide titled "Proof". It reiterates two equations from the previous slide and then combines them to derive a final inequality, stating that the Taylor expansion term is less than or equal to zero.
---
## Page 73
### Content
We already know
$$ \frac{t_k^2}{2} d_k^\top \nabla_{xx}^2 L(x^*, u^*, v^*) d_k + o(t_k^2) \le 0. $$
Divide by $t_k^2/2$ and let $k \to \infty$. Using continuity of the Hessian and $d_k \to d$, we obtain
$$ d^\top \nabla_{xx}^2 L(x^*, u^*, v^*) d \le 0. $$
But $d \in C(x^*) \setminus \{0\}$, contradicting the assumption
$$ d^\top \nabla_{xx}^2 L(x^*, u^*, v^*) d > 0 \quad \forall d \in C(x^*) \setminus \{0\}. $$
Therefore $x^*$ is a strict local minimum.
### Visual Description
Text-only slide.
---
## Page 74
### Content
Proof
All that left is to show that $d \in C(x^*)$.

**Proof [Membership in the linearized cone]**
Since $x^k$ are feasible, we have $l_j(x^k) = 0$, $h_i(x^k) \le 0$.
Using Taylor expansion at $x^*$,
$$ l_j(x^k) = \nabla l_j(x^*)^\top (x^k - x^*) + o(||x^k - x^*||), $$
$$ h_i(x^k) = \nabla h_i(x^*)^\top (x^k - x^*) + o(||x^k - x^*||). $$
Dividing by $t_k$ and passing to the limit gives
$$ \nabla l_j(x^*)^\top d = 0, \quad \nabla h_i(x^*)^\top d \le 0 \quad \forall i \in A(x^*). $$
Hence
$$ d \in C_{lin}(x^*). $$
### Visual Description
Text explaining the proof for membership in the linearized cone, including Taylor expansions and resulting inequalities.
---
## Page 75
### Content
Proof
**First-order optimality along the sequence**
Since $f(x^k) \le f(x^*)$, we have
$$ \frac{f(x^k) - f(x^*)}{t_k} \le 0. $$
Using Taylor expansion,
$$ f(x^k) = f(x^*) + \nabla f(x^*)^\top (x^k - x^*) + o(||x^k - x^*||), $$
so dividing by $t_k$ and passing to the limit yields
$$ \nabla f(x^*)^\top d \le 0. $$
### Visual Description
Text explaining the derivation of first-order optimality along the sequence using Taylor expansion.
---
## Page 76
### Content
Proof
From the KKT conditions, $\nabla f(x^*) + \sum_{j=1}^p u_j^* \nabla l_j(x^*) + \sum_{i=1}^m v_i^* \nabla h_i(x^*) = 0$,
with $v_i^* \ge 0$ and $v_i^* h_i(x^*) = 0$.
Taking inner product with $d$ gives
$$ \nabla f(x^*)^\top d = - \sum_{j=1}^p u_j^* \nabla l_j(x^*)^\top d - \sum_{i=1}^m v_i^* \nabla h_i(x^*)^\top d. $$
Using $d \in C_{lin}(x^*)$, we have
$$ \nabla l_j(x^*)^\top d = 0, \quad \nabla h_i(x^*)^\top d \le 0. $$
Hence
$$ \nabla f(x^*)^\top d = - \sum_{i=1}^m v_i^* \nabla h_i(x^*)^\top d. $$
### Visual Description
Text explaining the use of KKT conditions and inner products with $d$, leading to a simplified expression for $\nabla f(x^*)^\top d$.
---
## Page 77
### Content
Proof
Since $\nabla f(x^*)^\top d \le 0$ and $v_i^* \ge 0$, $\nabla h_i(x^*)^\top d \le 0$, we must have
$$ \sum_{i=1}^m v_i^* \nabla h_i(x^*)^\top d = 0. $$
Therefore, for every $i$ with $v_i^* > 0$,
$$ \nabla h_i(x^*)^\top d = 0. $$
Combining the above, we obtain
$$ \left\{ \begin{array}{ll} \nabla l_j(x^*)^\top d = 0, \\ \nabla h_i(x^*)^\top d = 0 & \text{if } v_i^* > 0, \\ \nabla h_i(x^*)^\top d \le 0 & \text{if } v_i^* = 0, \end{array} \right. $$
which shows that
$$ d \in C(x^*). $$
### Visual Description
Text explaining the combination of conditions from previous steps to show that $d$ belongs to the critical cone $C(x^*)$.
---
## Page 78
### Content
Remark
For a maximization problem, the signs are reversed. At a KKT point, a second-order necessary condition for a local maximum is
$$ d^\top \nabla_{xx}^2 L(x^*, u^*, v^*) d \le 0 \quad \forall d \in C(x^*), $$
and a sufficient condition for a strict local maximum is
$$ d^\top \nabla_{xx}^2 L(x^*, u^*, v^*) d < 0 \quad \forall d \in C(x^*) \setminus \{0\}. $$
### Visual Description
Text describing how second-order conditions for maximization problems are the reverse of minimization problems, followed by two mathematical conditions.
---
## Page 79
### Content
Equality-constrained special case
Critical cone:
$$ C(x^*) := \left\{ d \in \mathbb{R}^n : \begin{array}{ll} \nabla l_j(x^*)^\top d = 0, & j = 1, \dots, p, \\ \nabla h_i(x^*)^\top d = 0, & i \in A(x^*) \text{ with } v_i^* > 0, \\ \nabla h_i(x^*)^\top d \le 0, & i \in A(x^*) \text{ with } v_i^* = 0 \end{array} \right\} $$
If there are only equality constraints $l(x) = 0$, then the critical cone reduces to the tangent space
$$ T(x^*) = \{ d \in \mathbb{R}^n : \nabla l_j(x^*)^\top d = 0, j = 1, \dots, p \}. $$
Thus one only needs to test the quadratic form
$$ d^\top \nabla_{xx}^2 L(x^*, u^*) d $$
on the nullspace of the constraint Jacobian.
### Visual Description
Definition of the critical cone, followed by a special case for equality constraints where the critical cone simplifies to the tangent space, and a note about testing the quadratic form.
---
