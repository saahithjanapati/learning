# March17_KKT

Source: `materials/archive/March17_KKT.pdf`
Duplicate equivalents: `March17_KKT.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 64

## Page 1
### Content
# Optimization for Machine Learning
## KKT Conditions

Slide 1
Carnegie Mellon University
### Visual Description
Title slide with "Optimization for Machine Learning" in blue and "KKT Conditions" in red. The Carnegie Mellon University logo is in the bottom right corner.

---
## Page 2
### Content
# Karush-Kuhn-Tucker (KKT) Conditions

Slide 2
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 3
### Content
# KKT Conditions

* We have already discussed some first-order optimality conditions for general convex programs.
* For some problems, when the constraints are given by inequalities and equalities, we will see that often we can get some natural first-order optimality conditions (= KKT conditions)
* We'll assume that our constraint and objective functions are
    * i) differentiable and ii) the problem is convex
    * However, there are generalizations to nondifferentiable cases when you replace the gradients by subgradients
    * There are generalizations to nonconvex cases too.

Slide 3
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 4
### Content
# KKT Conditions for Convex Problems

$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} \quad & f(x) \\
\text{subject to} \quad & h_i(x) \le 0, \quad i = 1, \dots, m \\
& \ell_j(x) = 0, \quad j = 1, \dots, r
\end{aligned}
$$

Here $f, h_i$ are convex, and $\ell_j$ are affine. Assume $f, h_i, \ell_j$ are differentiable.

**Definition [KKT Conditions]**
We will say that $(\hat{x}, \hat{u}, \hat{v})$ is a **KKT point** (i.e satisfies the KKT conditions), if

(1) $h_i(\hat{x}) \le 0, \quad i \in \{1, \dots, m\}$
(2) $\ell_j(\hat{x}) = 0, \quad j \in \{1, \dots, r\}$
$\left. \vphantom{\begin{aligned} h_i(\hat{x}) \le 0 \\ \ell_j(\hat{x}) = 0 \end{aligned}} \right\} \text{primal feasibility}$

(3) $\hat{v} \ge 0$ (dual feasibility)

(4) $\hat{v}_i h_i(\hat{x}) = 0, \quad i \in \{1, \dots, m\}$ (complementary slackness)

(5) $\nabla f(\hat{x}) + \sum_{i=1}^m \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^r \hat{u}_j \nabla \ell_j(\hat{x}) = 0$ (stationarity)

Slide 4
Carnegie Mellon University
### Visual Description
The slide defines the KKT conditions for a convex optimization problem. It lists the primal problem formulation followed by five numbered conditions: primal feasibility (1 & 2), dual feasibility (3), complementary slackness (4), and stationarity (5).

---
## Page 5
### Content
# Theorem: KKT Conditions are sufficient for Optimality in Convex Problems

When the problem is convex, the KKT conditions characterize the optimal solutions to the primal and dual in the following sense:

* **[KKT point $\implies$ optimal solution]**: If for a given $x^*$ there exists an $(u^*, v^*)$ such that $(x^*, u^*, v^*)$ is a KKT point, then $x^*$ is a primal optimal solution.

* **[KKT point $\implies$ optimal solution]**: Similarly, if for a given $(u^*, v^*)$ there exists an $x^*$ such that $(x^*, u^*, v^*)$ is a KKT point, then $(u^*, v^*)$ is a dual optimal solution.

* **[KKT point $\implies$ optimal solution]**: Equivalently, any $(x^*, u^*, v^*)$ KKT point gives an optimal solution to the primal and dual problems.

Slide 5
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 6
### Content
# Theorem: When Strong Duality holds, KKT Conditions are also Necessary for Optimality in Convex Problems

* **[Optimal solution $\iff$ KKT point]**: When strong duality holds, the KKT conditions are both sufficient and necessary conditions, i.e. $(x^*, u^*, v^*)$ are optimal primal-dual solutions if and only if they are KKT points.

## Corollary

* **[Optimal solution $\iff$ KKT point]**: If Slater's condition holds, then strong duality applies, and the Karush-Kuhn-Tucker (KKT) conditions are necessary and sufficient for optimality

Slide 6
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 7
### Content
# Proofs

The proof will have two parts.
Assume that $f, h_i$ are convex, and $\ell_j$ are affine.
Assume $f, h_i, \ell_j$ are differentiable.
We will prove that

### 1) Sufficiency
If $(\hat{x}, \hat{u}, \hat{v})$ satisfy the KKT conditions $\implies \hat{x}$ is primal optimal, $(\hat{u}, \hat{v})$ is dual optimal and strong duality holds.

### 2) Necessity [here we will not need convexity, but we will need strong duality]
If strong duality holds, $x^*$ is a primal optimal solution, and $(u^*, v^*)$ is a dual optimal solution $\implies (x^*, u^*, v^*)$ is a KKT point.

Slide 7
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 8
### Content
# Proofs (Sufficiency)

Assume that $f, h_i$ are convex, and $\ell_j$ are affine.

**We will prove that**
If $(\hat{x}, \hat{u}, \hat{v})$ satisfy the KKT conditions $\implies \hat{x}$ is primal optimal, $(\hat{u}, \hat{v})$ is dual optimal and strong duality holds.

By definition, $L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$
$\implies \nabla_x L(x, u, v) = \nabla f(x) + \sum_{j=1}^r u_j \nabla \ell_j(x) + \sum_{i=1}^m v_i \nabla h_i(x)$

From the (5) stationarity condition: $\nabla f(\hat{x}) + \sum_{i=1}^m \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^r \hat{u}_j \nabla \ell_j(\hat{x}) = 0$

Therefore, $\nabla_x L(\hat{x}, \hat{u}, \hat{v}) = 0$

Slide 8
Carnegie Mellon University
### Visual Description
The slide begins the proof of sufficiency for KKT conditions. It defines the Lagrangian function $L(x, u, v)$ and its gradient with respect to $x$, then shows that the stationarity condition implies the gradient of the Lagrangian at the KKT point is zero.
## Page 9
### Content
**Proofs (Sufficiency)**

**Proof [Continued]**

We assumed that $f, h_i$ are convex, and $\ell_j$ are affine.

Therefore, $L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$ is also convex in $x$

Since $\nabla_x L(\hat{x}, \hat{u}, \hat{v}) = 0$, it implies that $\hat{x}$ minimizes $L(x, \hat{u}, \hat{v})$
$$L(\hat{x}, \hat{u}, \hat{v}) \leq L(x, \hat{u}, \hat{v}) \quad \forall x \in \mathbb{R}^n$$

Since $g(u, v) \doteq \min_{x \in \mathbb{R}^n} L(x, u, v)$, this means that, $g(\hat{u}, \hat{v}) = L(\hat{x}, \hat{u}, \hat{v})$

According to the KKT assumptions, $\ell_j(\hat{x}) = 0, \forall j$, and $\hat{v}_i h_i(\hat{x}) = 0, \forall i$

Therefore, $L(\hat{x}, \hat{u}, \hat{v}) = f(\hat{x})$

Putting these together,
$$g(\hat{u}, \hat{v}) = L(\hat{x}, \hat{u}, \hat{v}) = f(\hat{x})$$

### Visual Description
Text-only slide.

---
## Page 10
### Content
**Proofs (Sufficiency)**

**Proof [Continued]** $g(\hat{u}, \hat{v}) = L(\hat{x}, \hat{u}, \hat{v}) = f(\hat{x})$

By weak-duality, $g(u, v) \leq f(x) \quad \forall x, u, v$, primal and dual feasible points. (*)

Therefore (using $u \to \hat{u}, v \to \hat{v}$ in (*)),
$$f(\hat{x}) = g(\hat{u}, \hat{v}) \leq f(x) \quad \forall x \text{ primal feasible points.} \Rightarrow \hat{x} \text{ is primal optimal.}$$

Similarly, (using $x \to \hat{x}$ in (*)),
$$g(u, v) \leq f(\hat{x}) = g(\hat{u}, \hat{v}) \text{ for any feasible } (u, v),$$
$$\Rightarrow (\hat{u}, \hat{v}) \text{ is dual optimal.}$$

Since $g(\hat{u}, \hat{v}) = f(\hat{x})$, and $\hat{x}, \hat{u}, \hat{v}$ are primal and dual optimal points,
$\Rightarrow$ strong-duality holds as well.

### Visual Description
Text-only slide.

---
## Page 11
### Content
**Proofs (Necessity)**

**We will not need to assume convexity for this part.**

**We will prove that**

If strong duality holds and $x^*$ is a primal optimal solution, $(u^*, v^*)$ is a dual optimal solution $\Rightarrow (x^*, u^*, v^*)$ is a KKT point, i.e. it satisfies the below equations:

$\left. \begin{aligned} h_i(x^*) \leq 0, \quad i \in \{1, \dots, m\} \quad (1) \\ \ell_j(x^*) = 0, \quad j \in \{1, \dots, r\} \quad (2) \end{aligned} \right\}$ primal feasibility

$v^* \geq 0 \quad (3)$ dual feasibility

$v_i^* h_i(x^*) = 0, \quad i \in \{1, \dots, m\} \quad (4)$ complementary slackness

$\nabla f(x^*) + \sum_{i=1}^m v_i^* \nabla h_i(x^*) + \sum_{j=1}^r u_j^* \nabla \ell_j(x^*) = 0 \quad (5)$ stationarity

### Visual Description
Text-only slide with mathematical equations grouped by brackets to indicate primal feasibility.

---
## Page 12
### Content
**Proofs (Necessity)**

Since $x^*$ is a primal optimal solution and thus it is primal feasible, therefore we have that
$\left. \begin{aligned} h_i(x^*) \leq 0, \quad i \in \{1, \dots, m\} \quad (1) \\ \ell_j(x^*) = 0, \quad j \in \{1, \dots, r\} \quad (2) \end{aligned} \right\}$ primal feasibility

Since $(u^*, v^*)$ is a dual optimal solution and thus it is dual feasible, therefore we have that
$v^* \geq 0 \quad (3)$ dual feasibility

### Visual Description
Text-only slide with mathematical equations grouped by brackets to indicate primal feasibility.

---
## Page 13
### Content
**Proofs (Necessity)**

By our assumptions, strong-duality holds, and thus
$$g(u^*, v^*) = \sup_{u, v \geq 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) = \inf_{x \in \mathbb{R}^n} \sup_{u, v \geq 0} L(x, u, v) = f(x^*)$$

where $g(u, v) \doteq \inf_{x \in \mathbb{R}^n} L(x, u, v)$

$f(x^*) = g(u^*, v^*)$
$$= \inf_{x \in \mathbb{R}^n} L(x, u^*, v^*) = \inf_{x \in \mathbb{R}^n} \left[ f(x) + \sum_{j=1}^r u_j^* \ell_j(x) + \sum_{i=1}^m v_i^* h_i(x) \right]$$
$$\leq f(x^*) + \sum_{j=1}^r u_j^* \ell_j(x^*) + \sum_{i=1}^m v_i^* h_i(x^*)$$
$$= f(x^*) + \sum_{i=1}^m v_i^* h_i(x^*) \quad (\text{since } \ell_j(x^*) = 0)$$
$$\leq f(x^*) \quad (\text{since } v_i^* \geq 0, h_i(x^*) \leq 0)$$

### Visual Description
Text-only slide.

---
## Page 14
### Content
**Proofs (Necessity)**

**We discussed this in the previous slide:**

$$f(x^*) = g(u^*, v^*) = \inf_{x \in \mathbb{R}^n} \left[ f(x) + \sum_{j=1}^r u_j^* \ell_j(x) + \sum_{i=1}^m v_i^* h_i(x) \right]$$
$$\leq f(x^*) + \sum_{j=1}^r u_j^* \ell_j(x^*) + \sum_{i=1}^m v_i^* h_i(x^*)$$
$$= f(x^*) + \sum_{i=1}^m v_i^* h_i(x^*) \leq f(x^*)$$

Therefore all inequalities are equalities, $\Rightarrow \sum_{i=1}^m v_i^* h_i(x^*) = 0 \Rightarrow v_i^* h_i(x^*) = 0$
(since $v_i^* \geq 0, h_i(x^*) \leq 0$)

This proves the (4) complementary slackness: $v_i^* h_i(x^*) = 0, \quad i \in \{1, \dots, m\}$

### Visual Description
Text-only slide.

---
## Page 15
### Content
**Proofs (Necessity)**

Since
$$f(x^*) = g(u^*, v^*) = \inf_{x \in \mathbb{R}^n} \left[ f(x) + \sum_{j=1}^r u_j^* \ell_j(x) + \sum_{i=1}^m v_i^* h_i(x) \right]$$
$$= \inf_{x \in \mathbb{R}^n} L(x, u^*, v^*)$$

Therefore, $x^*$ minimizes $L(x, u^*, v^*)$ and thus
$$\nabla_x L(x^*, u^*, v^*) = 0$$
$$\nabla f(x^*) + \sum_{i=1}^m v_i^* \nabla h_i(x^*) + \sum_{j=1}^r u_j^* \nabla \ell_j(x^*) = 0$$
This proves (5) stationarity

All the 5 properties of KKT points have been proven $\blacksquare$.

We have proved that any optimal solution $x^*$ to the primal and $(u^*, v^*)$ to the dual problem satisfies the KKT conditions.

### Visual Description
Text-only slide.

---
## Page 16
### Content
# KKT Conditions for Nonconvex Problems

### Visual Description
Text-only slide. Title slide for a new section.

---
## Page 17
### Content
# KKT Conditions for Nonconvex Problems

$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f(x) \\
\text{subject to} & \quad h_i(x) \leq 0, \quad i = 1, \dots, m \\
& \quad \ell_j(x) = 0, \quad j = 1, \dots, r
\end{aligned}
$$

Here $f, h_i, \ell_j$ are differentiable and potentially non-convex functions.

**Theorem [Nonconvex KKT, Necessary conditions for LOCAL optimality]**
Under mild conditions, if $\hat{x}$ is a local minimum, then there exist $(\hat{u}, \hat{v})$ such that $(\hat{x}, \hat{u}, \hat{v})$ is a KKT point (i.e satisfies the KKT conditions):

1. $h_i(\hat{x}) \leq 0, \quad i \in \{1, \dots, m\}$
2. $\ell_j(\hat{x}) = 0, \quad j \in \{1, \dots, r\}$
   $\left. \vphantom{\begin{aligned} h_i(\hat{x}) \leq 0 \\ \ell_j(\hat{x}) = 0 \end{aligned}} \right\} \text{primal feasibility}$
3. $\hat{v} \geq 0$ (dual feasibility)
4. $\hat{v}_i h_i(\hat{x}) = 0, \quad i \in \{1, \dots, m\}$ (complementary slackness)
5. $\nabla f(\hat{x}) + \sum_{i=1}^m \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^r \hat{u}_j \nabla \ell_j(\hat{x}) = 0$ (stationarity)

### Visual Description
The slide presents the KKT conditions for nonconvex optimization problems. It lists the primal problem formulation followed by a theorem stating the necessary conditions for local optimality. The five KKT conditions (primal feasibility, dual feasibility, complementary slackness, and stationarity) are listed and numbered.

---
## Page 18
### Content
# Nonconvex KKT, Necessary conditions for local optimality

1. $h_i(\hat{x}) \leq 0, \quad i \in \{1, \dots, m\}$
2. $\ell_j(\hat{x}) = 0, \quad j \in \{1, \dots, r\}$
   $\left. \vphantom{\begin{aligned} h_i(\hat{x}) \leq 0 \\ \ell_j(\hat{x}) = 0 \end{aligned}} \right\} \text{primal feasibility}$
3. $\hat{v} \geq 0$ (dual feasibility)
4. $\hat{v}_i h_i(\hat{x}) = 0, \quad i \in \{1, \dots, m\}$ (complementary slackness)
5. $\nabla f(\hat{x}) + \sum_{i=1}^m \hat{v}_i \nabla h_i(\hat{x}) + \sum_{j=1}^r \hat{u}_j \nabla \ell_j(\hat{x}) = 0$ (stationarity)

i) In practice, we try to find all KKT points: $\{\hat{x}_i, \hat{u}_i, \hat{v}_i\}_{i=1}^n$

ii) When we found all KKT points, we select $\hat{x}_i$ with the smallest objective value. Under some conditions, this can be a local minimum point. [It might be also a local maximum, or a saddle point...]

iii) The other KKT points will be local maximum, other local minimum, or saddle points.

### Visual Description
This slide continues the discussion on nonconvex KKT conditions. It repeats the five conditions from the previous page and adds three points (i, ii, iii) explaining how KKT points are used in practice to find local minima, while noting they could also represent maxima or saddle points.

---
## Page 19
### Content
# Second Order Conditions of the Lagrangian

$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f(x) \\
\text{subject to} & \quad h_i(x) \leq 0, \quad i = 1, \dots, m \\
& \quad \ell_j(x) = 0, \quad j = 1, \dots, r
\end{aligned}
$$

If there are **no constraints**, the Lagrangian reduces to $L(x) = f(x)$, and we use the Hessian:
$$H = \nabla^2 f(x^*).$$

**Then:**
* If $H$ is positive definite $\Rightarrow$ local minimum.
* If $H$ is negative definite $\Rightarrow$ local maximum.
* If $H$ is indefinite $\Rightarrow$ saddle point.

### Visual Description
The slide introduces second-order conditions for the Lagrangian. It starts with the general constrained optimization problem and then simplifies to the unconstrained case, showing how the Hessian of the objective function determines if a point is a local minimum, maximum, or saddle point.

---
## Page 20
### Content
# Second Order Conditions [Equality Constrains Only]

Consider the optimization problem
$$
\begin{aligned}
\min_{x \in \mathbb{R}^n} & \quad f(x) \\
\text{s.t.} & \quad \ell_j(x) = 0, \quad j = 1, \dots, p,
\end{aligned}
$$
where $f, \ell_1, \dots, \ell_p$ are twice continuously differentiable.

Define the Lagrangian
$$L(x, u) = f(x) + \sum_{j=1}^p u_j \ell_j(x),$$
where $u \in \mathbb{R}^p$ is unrestricted.

### Visual Description
This slide focuses on second-order conditions specifically for problems with only equality constraints. It defines the optimization problem and the corresponding Lagrangian function.

---
## Page 21
### Content
# Second Order Conditions [Equality Constrains Only]

Let $(x^*, u^*)$ satisfy the KKT conditions
$$
\begin{aligned}
\ell_j(x^*) &= 0, \quad j = 1, \dots, p, \\
\nabla_x L(x^*, u^*) &= 0.
\end{aligned}
$$

**Definition [tangent space]:**
$$\mathcal{T}(x^*) := \{d \in \mathbb{R}^n : \nabla \ell_j(x^*)^\top d = 0, \quad j = 1, \dots, p\}.$$

**Definition [constraint Jacobian]:** $G = [\nabla \ell_1(x^*) \quad \dots \quad \nabla \ell_r(x^*)]$
$$\mathcal{T}(x^*) = \{d \in \mathbb{R}^2 : G^\top d = 0\}$$

**Informally:** The tangent space determines the directions we are allowed to move a tiny amount from $x^*$, while satisfying the equality constraints.

**More formally:** The set of directions along which you can move while staying feasible to first order.

### Visual Description
The slide defines the tangent space and constraint Jacobian for equality-constrained problems. It provides both formal mathematical definitions and informal/formal conceptual explanations of the tangent space as the set of feasible directions to first order.

---
## Page 22
### Content
# Normal and Tangent

<div style="display: flex; justify-content: space-around;">
  <img src="2d_tangent_normal.png" alt="2D diagram showing a curve l(x,y)=0, a point P, a normal vector grad l(x,y), and a tangent line." style="width: 45%;">
  <img src="3d_tangent_normal.png" alt="3D diagram showing a surface l(x,y,z)=0, a point P, a normal vector grad l(x,y,z), and a tangent plane." style="width: 45%;">
</div>

$$\mathcal{T}(x^*) = \{d \in \mathbb{R}^3 : \nabla \ell(x, y, z)^\top d = 0\}$$

### Visual Description
The slide uses two diagrams to illustrate the concepts of normal and tangent. The left diagram shows a 2D curve $\ell(x, y) = 0$ where the gradient $\nabla \ell(x, y)$ is the normal vector at point $P$, perpendicular to the tangent line. The right diagram shows a 3D surface $\ell(x, y, z) = 0$ where the gradient $\nabla \ell(x, y, z)$ is the normal vector at point $P$, perpendicular to the tangent plane. A formula for the tangent space in $\mathbb{R}^3$ is provided at the bottom.

---
## Page 23
### Content
# Second Order Conditions [Equality Constrains Only]

**Theorem [Second-order sufficient condition]**

Assume $(x^*, u^*)$ satisfies the KKT conditions and
$$d^\top \nabla_{xx}^2 L(x^*, u^*) d > 0 \quad \forall d \in \mathcal{T}(x^*) \setminus \{0\}.$$

Then $x^*$ is a strict local minimum.

### Visual Description
This slide presents the theorem for the second-order sufficient condition for equality-constrained problems. It states that if the Hessian of the Lagrangian is positive definite on the tangent space at a KKT point, then that point is a strict local minimum.

---
## Page 24
### Content
# Example 1

### Visual Description
Text-only slide. This is a title slide for "Example 1".

---
## Page 25
### Content
# Example
$\min_{x_1,x_2} f(x_1,x_2) = x_2 + x_1^2$ subject to $l(x_1,x_2) = x_2 - x_1^2 = 0$.

### Visual Description
A plot in the $x_1, x_2$ plane. A blue parabola opening upwards represents the constraint $l(x_1, x_2) = x_2 - x_1^2 = 0$. Green shaded parabolic regions represent the level sets of $f(x_1, x_2) = x_2 + x_1^2$. The optimal point $x^* = (0,0)$ is marked with a black dot at the origin.

---
## Page 26
### Content
# Example
### Theorem [Second-order sufficient condition]
$\min_{x_1,x_2} f(x_1,x_2) = x_2 + x_1^2$ subject to $l(x_1,x_2) = x_2 - x_1^2 = 0$.

**Lagrangian function:** $L([x_1,x_2], u) = f(x_1,x_2) + u \cdot l(x_1,x_2)$
$= x_2 + x_1^2 + u \cdot (x_2 - x_1^2)$

**KKT conditions**
$$ \left. \begin{array}{l} l(x_1^*, x_2^*) = 0 \\ \nabla_{x_1,x_2} L([x_1^*, x_2^*], u^*) = 0 \end{array} \right\} \implies \begin{cases} x_2^* - (x_1^*)^2 = 0 \\ 2x_1^* - 2u^*x_1^* = 0 \\ 1 + u^* = 0 \end{cases} $$

$\implies u^* = -1 \implies 4x_1^* = 0 \implies x_1^* = 0 \implies x_2^* = 0$

**The KKT point is** $u^* = -1 \quad x^* = [0,0]$

### Visual Description
Text-only slide.

---
## Page 27
### Content
# Example
$l(x_1,x_2) = x_2 - x_1^2 \implies \nabla l(x_1,x_2) = \begin{pmatrix} -2x_1 \\ 1 \end{pmatrix}$

**The constraint’s tangent space:**
$$ \begin{aligned} \mathcal{T}(x_1^*, x_2^*) &:= \{d \in \mathbb{R}^2 : \nabla_{x_1,x_2} l(x_1^*, x_2^*)^\top d = 0\} \\ &= \{d \in \mathbb{R}^2 : [-2x_1^*, 1]d = 0\} \\ &= \left\{ \begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : [0, 1] \begin{pmatrix} d_1 \\ d_2 \end{pmatrix} = 0 \right\} \\ &= \left\{ \begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : d_2 = 0 \right\} \end{aligned} $$

### Visual Description
Text-only slide.

---
## Page 28
### Content
# Example

### Visual Description
The same plot as Page 25, but with additional vectors and labels at the origin $x^* = (0,0)$. A red vector labeled $\nabla l(x^*)$ points vertically upwards along the $x_2$ axis. An orange vector labeled $d$ points horizontally to the right along the $x_1$ axis. A dashed horizontal line through the origin is labeled $\mathcal{T}(x^*)$. Blue arrows show the gradient of $f$ at various points along the blue constraint curve.

---
## Page 29
### Content
# Example
$L([x_1,x_2], u) = x_2 + x_1^2 + u \cdot (x_2 - x_1^2)$
$\nabla_x L([x_1,x_2], u) = \begin{pmatrix} 2x_1 - 2ux_1 \\ 1 + u \end{pmatrix}$
$\nabla_{xx} L([x_1,x_2], u) = \begin{pmatrix} 2 - 2u & 0 \\ 0 & 0 \end{pmatrix}$
$\nabla_{xx} L([x_1^*, x_2^*], u^*) = \begin{pmatrix} 4 & 0 \\ 0 & 0 \end{pmatrix}$

$\mathcal{T}(x_1^*, x_2^*) = \left\{ \begin{pmatrix} d_1 \\ d_2 \end{pmatrix} \in \mathbb{R}^2 : d_2 = 0 \right\}$.

Let $d \in \mathcal{T}(x^*) \setminus \{0\}$
$$ d^\top \nabla_{xx}^2 L(x^*, u^*) d = (d_1, 0) \begin{pmatrix} 4 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} d_1 \\ 0 \end{pmatrix} > 0 $$
$\implies x^*$ is a strict local minimum.

### Visual Description
Text-only slide.

---
## Page 30
### Content
# Second Order Conditions
## [Both Equality & Inequality Constraints]

$$ \begin{aligned} \inf_{x \in \mathbb{R}^n} & \quad f(x) \\ \text{subject to} & \quad h_i(x) \le 0, \quad i = 1, \dots, m \\ & \quad \ell_j(x) = 0, \quad j = 1, \dots, r \end{aligned} $$

For inequality constraints, apply the same test on the **active set**
$$ \mathcal{A}(x^*) = \{j : h_j(x^*) = 0 \text{ and } v_j^* > 0\}, $$
treating the active constraints as equalities.

### Visual Description
Text-only slide.

---
## Page 31
### Content
# Example 2

### Visual Description
Text-only slide.

---
## Page 32
### Content
# Example [KKT Conditions]
$\min_{x,y} f(x,y) = x^2 + y^2$ s.t. $l(x,y) = x + y - 1 = 0$.

**Lagrangian:** $L(x,y,u) = x^2 + y^2 + u(x + y - 1)$.

**KKT First order conditions:** $L_x(x,y,u) = 2x + u = 0, L_y(x,y,u) = 2y + u = 0$

**Equality constraint:** $x + y = 1$. [3 equations, 3 variables]

From the first two, $x = y$; with $x + y = 1$ we get $x^* = y^* = \frac{1}{2}$ and $u^* = -1$.

**Second-order check.** $\nabla_{[x,y]}^2 L = 2I \succ 0$.

Let $G^T = [\nabla_x(x^* + y^* - 1), \nabla_y(x^* + y^* - 1)] = [1, 1]$ be the constraint Jacobian.

Define the tangent space: $\mathcal{T}(x^*) = \{d \in \mathbb{R}^2 : G^T d = 0\} = \{d \in \mathbb{R}^2 : [1, 1]d = 0\}$.

The quadratic form is positive on the tangent space, so $(\frac{1}{2}, \frac{1}{2})$ is a strict local minimum.

### Visual Description
Text-only slide.
## Page 33
### Content
# Counterexample
### Visual Description
Text-only slide.

---
## Page 34
### Content
# Counterexample
## [Global minimum exists, but no KKT Points]

**We will show an example, where:**
* The primal problem is convex
* global minimum exists
* we have strong duality

**but**
* the maximum of the dual cannot be attained
* and there are **no KKT points**

$$\min_{x \in \mathbb{R}} x$$
$$\text{s.t. } x^2 \le 0.$$

Therefore, $x^* = 0$ is trivially the global (and local) minimum.

Notice that Slater's condition doesn't hold (and we still have strong duality).
### Visual Description
Text-only slide with a simple optimization problem formulation.

---
## Page 35
### Content
# Counterexample [continued]

$$\min_{x \in \mathbb{R}} x$$
$$\text{s.t. } x^2 \le 0.$$

The Lagrangian function: $L(x, v) = x + vx^2, \quad v \ge 0$.

The dual function is: $q(v) = \inf_{x \in \mathbb{R}} L(x, v) = \inf_{x \in \mathbb{R}} (x + vx^2), \quad v \ge 0$.

**Case 1:** $v > 0$. The function $x + vx^2$ is strictly convex, $\frac{d}{dx}(x + vx^2) = 1 + 2vx$.

Setting this equal to zero gives: $x^*(v) = -\frac{1}{2v}$.

Substituting back: 
$$q(v) = -\frac{1}{2v} + v\left(\frac{1}{4v^2}\right)$$
$$= -\frac{1}{2v} + \frac{1}{4v}$$
$$= -\frac{1}{4v}.$$
### Visual Description
Text-only slide containing mathematical derivations for the Lagrangian and dual function.

---
## Page 36
### Content
# Counterexample [continued]

The dual function is: $q(v) = \inf_{x \in \mathbb{R}} L(x, v) = \inf_{x \in \mathbb{R}} (x + vx^2), \quad v \ge 0$.

**Case 2:** $v = 0$.

In this case, $q(0) = \inf_{x \in \mathbb{R}} x = -\infty$.

**Conclusion: dual function:**
$$q(v) = \begin{cases} -\frac{1}{4v}, & v > 0, \\ -\infty, & v = 0. \end{cases}$$

**The dual problem:**
$$\max_{v \ge 0} q(v) = \max_{v > 0} \left(-\frac{1}{4v}\right).$$
### Visual Description
Text-only slide showing the final form of the dual function and the dual problem.

---
## Page 37
### Content
# Counterexample [continued]

The dual problem:
$$\max_{v \ge 0} q(v) = \max_{v > 0} \left(-\frac{1}{4v}\right).$$

Therefore,
$$d^* = \sup_{v \ge 0} q(v) = 0.$$

The supremum is not attained.

Thus
$$p^* = d^* = 0,$$
so **strong duality holds, but the dual optimum is not attained.**
### Visual Description
Text-only slide concluding that strong duality holds but the dual optimum is not reached.

---
## Page 38
### Content
# Counterexample [continued]

$$\min_{x \in \mathbb{R}} x$$
$$\text{s.t. } x^2 \le 0.$$

$x^* = 0$ is trivially the global (and local) minimum.

We have seen that the duality gap is zero, but the maximum of the dual cannot be attained.

We will prove that in this problem there are **no KKT points**, though this is a convex problem with a global minimum and zero duality gap.
### Visual Description
Text-only slide summarizing the findings and setting up the proof for the absence of KKT points.

---
## Page 39
### Content
# Counterexample [continued]

$$\min_{x \in \mathbb{R}} x$$
$$\text{s.t. } x^2 \le 0.$$

Therefore, $x^* = 0$ is trivially the global (and local) minimum.

The KKT conditions require the existence of a multiplier $v \ge 0$ such that
$$\nabla f(x^*) + v \nabla h(x^*) = 0,$$
$$\nabla x + v \nabla x^2 = 0$$
$$1 + v \cdot 2x^* = 0$$

**Evaluate at $x^* = 0$.** The stationarity condition becomes $1 + v \cdot 0 = 0$, which is impossible.

There exists no Lagrange multiplier $v \ge 0$ satisfying the KKT conditions, even though $x^* = 0$ is the global minimum.
### Visual Description
Text-only slide showing the mathematical proof that KKT conditions cannot be satisfied for the given example.

---
## Page 40
### Content
# Normal Cone Representation under Slater's Condition
### Visual Description
Text-only slide.

---
## Page 41
### Content
# Recall: Punchline in Convex Optimization

$$N_C(x) \doteq \{g : g^T(y - x) \leq 0, \text{ for all } y \in C\}$$

### Punchline
Let $f : \mathbb{R}^n \to \mathbb{R}$ be convex, differentiable. Let $C$ be convex. In a convex optimization problem,
$$\min_{x \in C} f(x)$$
a point $x$ is optimal, if and only if the negative gradient of the point belongs to $N_C(x)$.

**Question: How is this normal cone related to the KKT conditions?**

**Answer: They are the same!**

### Visual Description
Text-only slide. The title and the answer are in blue, while the main punchline text is in red.

---
## Page 42
### Content
# Theorem: Normal Cone Representation

$$\inf_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \leq 0, i = 1, \dots m$
$l_j(x) = 0, j = 1, \dots p$

Let $C = \{x \in \mathbb{R}^n : h_i(x) \leq 0, i = 1, \dots, m, l_j(x) = 0, j = 1, \dots, p\}$, where,
* each $h_i$ is convex and differentiable,
* each $l_j$ is affine.

Assume Slater's condition: $\exists \bar{x}$ such that $h_i(\bar{x}) < 0, l_j(\bar{x}) = 0$.

Then for any $x^* \in C$, the normal cone $N_C(x^*)$ can be written
$$N_C(x^*) = \left\{ \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*) : v_i \geq 0, v_i h_i(x^*) = 0 \right\}.$$

### Visual Description
Text-only slide. The final formula for the normal cone is highlighted in red.

---
## Page 43
### Content
# Proof: Normal Cone Representation

$$N_C(x) \doteq \{g : g^T(y - x) \leq 0, \text{ for all } y \in C\}$$

Let $g \in N_C(x^*)$.

We need to show that $g$ can be written in this form:
$$g = \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*), \text{ where } v_i \geq 0, v_i h_i(x^*) = 0$$

### Visual Description
Text-only slide.

---
## Page 44
### Content
# Proof: Normal Cone Representation

Let $g \in N_C(x^*)$.

By definition,
$$g^T(y - x^*) \leq 0 \quad \forall y \in C.$$

Equivalently,
$$-g^T x^* \leq -g^T y \quad \forall y \in C.$$

Thus $x^*$ solves the convex optimization problem
$$\min_{x \in C} -g^T x.$$

### Visual Description
Text-only slide.

---
## Page 45
### Content
# Proof: Normal Cone Representation

$x^*$ solves the convex optimization problem
$$\min_{x \in C} -g^T x.$$

Consider the convex program
$$\min_x -g^T x \quad \text{s.t.} \quad h_i(x) \leq 0, l_j(x) = 0.$$

The objective is linear (hence convex), and the constraints are convex.

Since Slater's condition holds by assumption, strong duality applies.
$\Rightarrow$ The KKT conditions are necessary and sufficient for optimality, and dual optimal solution can be attained

### Visual Description
Text-only slide.

---
## Page 46
### Content
# Proof: Normal Cone Representation

$$\min_x -g^T x \quad \text{s.t.} \quad h_i(x) \leq 0, l_j(x) = 0.$$

Therefore, there exist multipliers $v_i \geq 0$ and $u_j \in \mathbb{R}$ such that
* (stationarity) $-g + \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*) = 0$,
* (complementary slackness) $v_i h_i(x^*) = 0$.

Rearranging stationarity gives
$$g = \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*).$$

Thus every $g \in N_C(x^*)$ admits the stated representation.

### Visual Description
Text-only slide.

---
## Page 47
### Content
# Proof: Normal Cone Representation

### Reverse inclusion
Conversely, let
$$g = \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*)$$
with $v_i \geq 0$ and $v_i h_i(x^*) = 0$.

We need to prove $g \in N_C(x^*)$, that is
$$g^T(y - x^*) \leq 0 \quad \forall y \in C.$$

### Visual Description
Text-only slide.

---
## Page 48
### Content
# Proof: Normal Cone Representation

For any $y \in C$, convexity of $h_i$ gives
$$h_i(y) \geq h_i(x^*) + \nabla h_i(x^*)^T(y - x^*).$$

Since $h_i(y) \leq 0$,
$$0 \geq h_i(y) \geq h_i(x^*) + \nabla h_i(x^*)^T(y - x^*).$$
$$\Rightarrow \nabla h_i(x^*)^T(y - x^*) \leq -h_i(x^*).$$

Multiplying by $v_i \geq 0$ and summing over $i$ yields
$$\sum_{i=1}^m v_i \nabla h_i(x^*)^T(y - x^*) \leq -\sum_{i=1}^m v_i h_i(x^*) = 0.$$

### Visual Description
Text-only slide.

---
## Page 49
### Content
# Proof: Normal Cone Representation

We already know: $\sum_{i=1}^m v_i \nabla h_i(x^*)^\top (y - x^*) \le 0$.

Since $l_j$ is affine and $l_j(y) = l_j(x^*) = 0$,
$$\nabla l_j(x^*)^\top (y - x^*) = 0.$$

Now, since $g = \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*)$,

Therefore,
$$g^\top (y - x^*) \le 0, \quad \forall y \in C,$$
which shows $g \in N_C(x^*)$.

Combining both inclusions completes the proof. ■

### Visual Description
Text-only slide.

---
## Page 50
### Content
# KKT from Normal Cone Representation

Finally, for the constrained minimization of $f$ over $C$, first-order optimality is
$$0 \in \nabla f(x^*) + N_C(x^*).$$

Using the representation of $N_C(x^*)$ above, this is equivalent to existence of multipliers $v, u$ such that
$$\nabla f(x^*) + \sum_{i=1}^m v_i \nabla h_i(x^*) + \sum_{j=1}^p u_j \nabla l_j(x^*) = 0, \quad v_i \ge 0, \quad v_i h_i(x^*) = 0,$$

Together with primal feasibility $x^* \in C$, these are the KKT conditions.

### Visual Description
Text-only slide. The final sentence "Together with primal feasibility $x^* \in C$, these are the KKT conditions." is highlighted in red text.

---
## Page 51
### Content
# Thanks for your Attention ☺

### Visual Description
Text-only slide.

---
## Page 52
### Content
# Appendix

### Visual Description
Text-only slide.

---
## Page 53
### Content
# Applications: SVM

### Visual Description
Text-only slide.

---
## Page 54
### Content
# Support Vector Machines

Suppose given labeled data $\{(x_1, y_1), \dots, (x_n, y_n)\}$ where $y_i \in \{-1, +1\}$ and our goal is to learn a linear classifier.

One way to do this is by trying to maximize the margin of the classifier. This results in the following optimization problem:

$$\min_{\beta, \beta_0, \xi} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \xi_i$$
subject to $\xi_i \ge 0$, for $i \in \{1, \dots, n\}$
$$y_i (x_i^\top \beta + \beta_0) \ge 1 - \xi_i, \text{ for } i \in \{1, \dots, n\}.$$

This is a QP

### Visual Description
The slide contains text and an optimization problem. Blue arrows point to components of the objective function: an arrow labeled "max margin" points to the $\frac{1}{2} \|\beta\|_2^2$ term, and an arrow labeled "Slack variable" points to the $C \sum_{i=1}^n \xi_i$ term. The text "This is a QP" is written in red at the bottom.

---
## Page 55
### Content
# Support Vector Machines

$$\min_{\beta, \beta_0, \xi} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \xi_i$$
subject to $\xi_i \ge 0$, for $i \in \{1, \dots, n\}$
$$y_i (x_i^\top \beta + \beta_0) \ge 1 - \xi_i, \text{ for } i \in \{1, \dots, n\}.$$

**Observation:** this QP is feasible.

**Proof:** Let $\xi_i > 0$ ($i \in \{1, \dots, n\}$) be a very large number.

Since this QP is feasible, via the weak Slater's conditions we know that strong duality holds.

### Visual Description
Text-only slide.

---
## Page 56
### Content
# Support Vector Machines

$$\min_{\beta, \beta_0, \xi} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \xi_i$$
subject to $\xi_i \ge 0$, for $i \in \{1, \dots, n\}$
$$y_i (x_i^\top \beta + \beta_0) \ge 1 - \xi_i, \text{ for } i \in \{1, \dots, n\}.$$

It is worth noting that
* we have two constraints on $\xi_i$:
  $$\xi_i \ge 0,$$
  $$\xi_i \ge 1 - y_i (x_i^\top \beta + \beta_0)$$
* we get penalized for large values of $\xi_i$.

### Visual Description
Text-only slide.

---
==End of PDF==
## Page 57
### Content
# Support Vector Machines

$$\min_{\beta, \beta_0, \xi} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \xi_i,$$
subject to $\xi_i \geq 0$, for $i \in \{1, \dots, n\}$
$y_i (x_i^T \beta + \beta_0) \geq 1 - \xi_i$, for $i \in \{1, \dots, n\}$.

Therefore, the SVM optimization can be rewritten as:

$$\min_{\beta, \beta_0} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \underbrace{\max \{0, 1 - y_i (x_i^T \beta + \beta_0)\}}_{\xi_i}$$

### Visual Description
The slide presents the primal optimization problem for Support Vector Machines (SVM). It shows the standard formulation with slack variables $\xi_i$ and then demonstrates how it can be rewritten as an unconstrained optimization problem using the hinge loss function, where $\xi_i$ is replaced by the max term.

---

## Page 58
### Content
# Support Vector Machines

$$\min_{\beta, \beta_0, \xi} \frac{1}{2} \|\beta\|_2^2 + C \sum_{i=1}^n \xi_i,$$
subject to $-\xi_i \leq 0$, for $i \in \{1, \dots, n\}$
$1 - \xi_i - y_i (x_i^T \beta + \beta_0) \leq 0$, for $i \in \{1, \dots, n\}$.

Introduce Lagrangian multipliers $v_i \geq 0$ and $w_i \geq 0$ for the inequality constraints.

**Let us write up the Lagrangian function:**

$$L(\beta, \beta_0, \xi, v, w) = \frac{1}{2} \|\beta\|_2^2 + \sum_{i=1}^n C \xi_i - \sum_{i=1}^n v_i \xi_i + \sum_{i=1}^n w_i (1 - \xi_i - y_i (x_i^T \beta + \beta_0))$$
$$= \frac{1}{2} \|\beta\|_2^2 + \sum_{i=1}^n [C \xi_i - v_i \xi_i + w_i (1 - \xi_i - y_i (x_i^T \beta + \beta_0))]$$

### Visual Description
The slide starts the process of deriving the dual problem for SVM. It reformulates the constraints into standard $\leq 0$ form and introduces Lagrangian multipliers $v_i$ and $w_i$. It then explicitly writes out the Lagrangian function $L$.

---

## Page 59
### Content
# Support Vector Machines

$$L(\beta, \beta_0, \xi, v, w) = \frac{1}{2} \|\beta\|_2^2 + \sum_{i=1}^n [C \xi_i - v_i \xi_i + w_i (1 - \xi_i - y_i (x_i^T \beta + \beta_0))]$$
$$= \frac{1}{2} \|\beta\|_2^2 + \sum_{i=1}^n [(C - v_i - w_i) \xi_i + w_i - w_i y_i x_i^T \beta - w_i y_i \beta_0]$$

The dual function is:
$$g(v, w) := \min_{\beta, \beta_0, \xi} L(\beta, \beta_0, \xi, v, w)$$

### Visual Description
The slide continues the derivation by rearranging the terms in the Lagrangian function to group them by the primal variables $\xi_i$, $\beta$, and $\beta_0$. It then defines the dual function $g(v, w)$ as the minimum of the Lagrangian over the primal variables.

---

## Page 60
### Content
# Support Vector Machines

$$L(\beta, \beta_0, \xi, v, w) = \frac{1}{2} \|\beta\|_2^2 + \sum_{i=1}^n [(C - v_i - w_i) \xi_i + w_i - w_i y_i x_i^T \beta - w_i y_i \beta_0]$$

The dual function is: $g(v, w) := \min_{\beta, \beta_0, \xi} L(\beta, \beta_0, \xi, v, w)$

Since $L(\beta, \beta_0, \xi, v, w)$ is linear in $\beta_0$ and $\xi_i$, we have to have in the minimum that
$$C - v_i - w_i = 0$$
$$\sum_{i=1}^n w_i y_i = 0.$$

$$g(v, w) = \min_{\beta} \left( \frac{1}{2} \beta^T \beta - \sum_{i=1}^n w_i y_i x_i^T \beta + \sum_{i=1}^n w_i \right)$$

### Visual Description
The slide identifies that for the dual function to be finite (not $-\infty$), the coefficients of the linear terms in $\beta_0$ and $\xi_i$ must be zero. This leads to two constraints on the dual variables. The dual function is then simplified to a minimization over $\beta$ only.

---

## Page 61
### Content
# Support Vector Machines

$$g(v, w) = \min_{\beta} \left( \frac{1}{2} \beta^T \beta - \sum_{i=1}^n w_i y_i x_i^T \beta + \sum_{i=1}^n w_i \right)$$

Therefore, $\beta^* = \sum_{i=1}^n w_i y_i x_i$

**Let us use this value to get the dual function:**

$$g(v, w) = \frac{1}{2} (\beta^*)^T \beta^* - \sum_{i=1}^n w_i y_i x_i^T \beta^* + \sum_{i=1}^n w_i$$
$$= \frac{1}{2} (\beta^*)^T \beta^* + \sum_{i=1}^n w_i (1 - y_i x_i^T \beta^*)$$
$$= \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right) + \sum_{i=1}^n w_i \left( 1 - y_i x_i^T \left( \sum_{i=1}^n w_i y_i x_i \right) \right).$$

### Visual Description
The slide solves for the optimal $\beta^*$ by setting the gradient of the simplified Lagrangian to zero. It then substitutes this expression for $\beta^*$ back into the dual function to express it entirely in terms of the dual variables $w_i$ and the data.

---

## Page 62
### Content
# Support Vector Machines

$$g(v, w) = \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right) + \sum_{i=1}^n w_i \left( 1 - y_i x_i^T \left( \sum_{i=1}^n w_i y_i x_i \right) \right).$$

$$= \sum_{i=1}^n w_i - \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right)$$

### Visual Description
The slide performs the final algebraic simplification of the dual function expression.

---

## Page 63
### Content
# Support Vector Machines

$$g(v, w) = \sum_{i=1}^n w_i - \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right)$$

**The dual program:**
$$\max_{v \geq 0, w \geq 0} g(v, w),$$
subject to $C - v_i - w_i = 0$,
$$\sum_{i=1}^n w_i y_i = 0$$

Since $w_i = C - v_i$, this can be written as (after eliminating the $v$ variables):

$$\color{red} \max_{w} \sum_{i=1}^n w_i - \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right)$$
$$\color{red} \text{subject to } 0 \leq w_i \leq C,$$
$$\color{red} \sum_{i=1}^n w_i y_i = 0$$

**This is also a QP**

### Visual Description
The slide summarizes the dual program. It shows how the constraint $C - v_i - w_i = 0$ with $v_i \geq 0$ and $w_i \geq 0$ simplifies to $0 \leq w_i \leq C$. The final dual optimization problem is highlighted in red text and identified as a Quadratic Program (QP).

---

## Page 64
### Content
# Support Vector Machines

**The dual program:**

$$\max_{w} \sum_{i=1}^n w_i - \frac{1}{2} \left( \sum_{i=1}^n w_i y_i x_i \right)^T \left( \sum_{i=1}^n w_i y_i x_i \right)$$
subject to $0 \leq w_i \leq C$,
$\sum_{i=1}^n w_i y_i = 0$
**This is also a QP**

The SVM dual is also a QP, so it might not immediately obvious why this is useful.

However, the dual is the entry point to the world of RKHS/kernel machines. The dual program does not require the actual features $x_i$ to be given but rather only requires the inner products between pairs of features i.e. $x_i^T x_j$.

### Visual Description
The slide repeats the final dual program and explains its significance. It notes that while it's still a QP, its main advantage is that it only depends on the data through inner products $x_i^T x_j$, which is the basis for the "kernel trick" in Reproducing Kernel Hilbert Spaces (RKHS).
