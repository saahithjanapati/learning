# March12_Part1_LagrangianFunction

Source: `materials/archive/March12_Part1_LagrangianFunction.pdf`
Duplicate equivalents: `March12_Part1_LagrangianFunction.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 38

## Page 1
### Content
# Optimization for Machine Learning
## The Lagrangian Function

Slide 1
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 2
### Content
# The Lagrangian Function in General Problems

Slide 2
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 3
### Content
# The Lagrangian Function in General Problems

Consider the general minimization problem:
$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

**It doesn't need to be convex!**

[If $f$ has a smaller domain, let's extend it with $\infty$ outside of its domain]

We define the **Lagrangian** function as
$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$$

**New variables:**
$u \in \mathbb{R}^r, v \in \mathbb{R}^m$, with $v \ge 0$ (called dual variables or Lagrange multipliers)

We can define $L(x, u, v) = -\infty$ if any component of $v < 0$

Slide 3
Carnegie Mellon University
### Visual Description
Text and mathematical formulas defining a general optimization problem and its corresponding Lagrangian function.

---
## Page 4
### Content
# Lagrangian Function

$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$$

**Important property:** for any $v \ge 0$ and any $u$,
$$L(x, u, v) \le f(x) \text{ for all feasible } x$$

Why? For any feasible $x$,
$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \underbrace{\ell_j(x)}_{=0} + \sum_{i=1}^m \underbrace{v_i h_i(x)}_{\le 0} \le f(x)$$

Slide 4
Carnegie Mellon University
### Visual Description
Text and mathematical formulas explaining an important property of the Lagrangian function. Underbraces are used in the final equation to show that the equality constraint term is zero and the inequality constraint term is non-positive for feasible points.

---
## Page 5
### Content
# Visualization of the Lagrangian Function

$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$$
$L(x, u, v) \le f(x)$ at each feasible $x$

* Solid line is $f$
* Dashed line is $h$, hence feasible set $\approx [-0.46, 0.46]$
* Each dotted line shows $L(x, u, v)$ for different choices of $u \ge 0$ and $v$

(From B & V page 217)

Slide 5
Carnegie Mellon University
### Visual Description
A graph plots several functions against $x$. A solid black line represents the objective function $f(x)$. A dashed line represents the constraint function $h(x)$. Multiple dotted lines represent the Lagrangian $L(x, u, v)$ for various values of the dual variables. The dotted lines are always below the solid line within the feasible region where $h(x) \le 0$.

---
## Page 6
### Content
# The Lagrange Dual Function

$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

Let $C$ denote the primal feasible set:
$$C = \{x \mid x \in \mathbb{R}^n, \quad h_i(x) \le 0, \quad i = 1, \dots, m, \quad \ell_j(x) = 0, \quad j = 1, \dots, r\}$$

$f^*$ is the primal optimal value:
$$f^* \doteq \min_{x \in C} f(x)$$

Slide 6
Carnegie Mellon University
### Visual Description
Text and mathematical formulas defining the primal feasible set $C$ and the primal optimal value $f^*$.

---
## Page 7
### Content
# The Lagrange Dual Function

$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$$

Minimizing $L(x, u, v)$ over all $x \in \mathbb{R}^n$ gives a lower bound:
$$f^* = \min_{x \in C} f(x) \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

We call $g(u, v)$ the **Lagrange dual function**.
$g(u, v)$ gives a lower bound on $f^*$ for any $u$ and $v \ge 0$ [called dual feasible $u, v$]

Slide 7
Carnegie Mellon University
### Visual Description
Text and mathematical formulas deriving the Lagrange dual function $g(u, v)$ as a lower bound on the primal optimal value $f^*$.

---
## Page 8
### Content
# The Lagrange Dual Function

$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$$

$$f^* = \min_{x \in C} f(x) \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

Similarly as before, we can define our (Lagrange) dual problem as:
$$\max_{u, v} g(u, v)$$
subject to $v \ge 0$

**Remarks**
Notice that defining this dual problem (and observing that weak duality holds) made no mention of convexity! These basic properties hold in general.

Slide 8
Carnegie Mellon University
### Visual Description
Text and mathematical formulas defining the Lagrange dual problem and noting that these properties do not require convexity.

---
## Page 9
### Content
# The Lagrange Dual Function

* Dashed horizontal line is $f^\star$
* Dual variable is $u$
* Solid line shows $g(u)$

$$f^\star \ge g(u) \forall u$$

From B & V page 217

### Visual Description
A plot showing a concave, piecewise linear function $g(u)$ (solid line) plotted against the dual variable $u$ on the x-axis (ranging from 0 to 1). A dashed horizontal line at approximately $y = 1.53$ represents the optimal primal value $f^\star$. The graph illustrates that $g(u)$ is always less than or equal to $f^\star$.

---

## Page 10
### Content
# Lagrange Dual Function

$$C = \{x \mid x \in \mathbb{R}^n, \ h_i(x) \le 0, \ i = 1, \dots m, \ \ell_j(x) = 0, \ j = 1, \dots r\}$$

**Lemma**
$$x \in C, v \ge 0, \Rightarrow f(x) \ge g(u, v)$$

**Proof:**
$$f(x \mid x \in C) \ge f^\star = \min_{x \in C} f(x) \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v) \quad \blacksquare$$

### Visual Description
Text-heavy slide containing a mathematical definition of a set $C$, a lemma stating the relationship between the primal objective and the dual function, and a one-line mathematical proof of that lemma.

---

## Page 11
### Content
# Lagrange Dual Function

$$C = \{x \mid x \in \mathbb{R}^n, \ h_i(x) \le 0, \ i = 1, \dots m, \ \ell_j(x) = 0, \ j = 1, \dots r\}$$

**Lemma [g(u,v) is concave]**

Even if the primal constraints and objective are arbitrary (i.e. **not convex**), the dual function $g(u, v)$ is always a concave function.

**Proof:**
$$g(u, v) \doteq \min_{x \in \mathbb{R}^n} L(x, u, v)$$
$$= \min_{x \in \mathbb{R}^n} \left[ f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x) \right]$$

is the pointwise minimum of a set of affine functions which is always concave. $\blacksquare$

### Visual Description
Text and mathematical slide defining the concavity of the Lagrange dual function. It includes a proof showing that the dual function is the pointwise minimum of affine functions in $(u, v)$.

---

## Page 12
### Content
# How can Duality help us?

| Primal | Dual |
| :--- | :--- |
| $\min_{x \in \mathbb{R}^n} f(x)$ | $\max_{u, v} g(u, v)$ |
| subject to $h_i(x) \le 0, \ i = 1, \dots m$ | subject to $v \ge 0$ |
| $\ell_j(x) = 0, \ j = 1, \dots r$ | |

* The original nonconvex problem might be difficult to solve
* **The dual, however, is always concave:**
    * It is often easier to solve than the nonconvex primal
    * And provides to lower bound to the optimal solution of the primal
* The dual constraints are also much simpler than the primal constraints (so it’s often easier to solve the dual via projected gradient descent)

$$f(x \mid x \in C) \ge f^\star = \min_{x \in C} f(x) \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

### Visual Description
A slide comparing the Primal and Dual optimization problems side-by-side. It lists several advantages of working with the dual problem, particularly its concavity and simpler constraints. The bottom of the slide repeats the proof chain from Page 10.

---

## Page 13
### Content
# Quadratic Programs

### Visual Description
Text-only slide. Title slide for the section on Quadratic Programs.

---

## Page 14
### Content
# Quadratic Programs

Let’s see another example where we can derive the dual: **(convex) QP**

Consider quadratic program (QP, step up from LP!)
$$\min_{x \in \mathbb{R}^n} \frac{1}{2} x^T Qx + c^T x$$
$$\text{subject to } Ax = b, \ Gx \le h$$

where $Q \succeq 0$ (which ensures convexity of the objective).

In other words, a convex QP has a convex quadratic objective, subject to some linear equality/inequality constraints.

### Visual Description
Text and mathematical slide introducing the standard form of a convex Quadratic Program (QP) with its objective function and linear constraints.

---

## Page 15
### Content
# Quadratic Programs

$$\min_{x \in \mathbb{R}^n} \frac{1}{2} x^T Qx + c^T x \quad \text{where } Q \succeq 0$$
$$\text{subject to } Ax = b, \ Gx \le h$$

**Lagrangian:**
$$L(x, u, v) = \frac{1}{2} x^T Qx + c^T x + u^T(Ax - b) + v^T(Gx - h)$$

**Lagrange dual function:**
$$g(u, v) \doteq \min_{x \in \mathbb{R}^n} L(x, u, v)$$
$$\frac{\partial}{\partial x} L(x, u, v) = 0$$
$$\Rightarrow Qx + c + A^T u + G^T v = 0$$
$$\Rightarrow x^\star = -Q^{-1}(c + A^T u + G^T v) \quad \text{Assuming } Q \succ 0, \text{ i.e. } Q \text{ is invertible for now.}$$

### Visual Description
Mathematical slide deriving the Lagrangian for a QP and finding the optimal $x^\star$ by setting the gradient of the Lagrangian with respect to $x$ to zero.

---

## Page 16
### Content
# Quadratic Programs

$$x^\star = -Q^{-1}(c + A^T u + G^T v)$$

Therefore, the Lagrange dual function:
$$g(u, v) = L(x^\star, u, v) = \frac{1}{2} (x^\star)^T Q x^\star + c^T x^\star + u^T(Ax^\star - b) + v^T(Gx^\star - h)$$
$$= \frac{1}{2} (Q^{-1}(c + A^T u + G^T v))^T Q Q^{-1}(c + A^T u + G^T v)$$
$$- c^T Q^{-1}(c + A^T u + G^T v) + u^T(-A Q^{-1}(c + A^T u + G^T v) - b)$$
$$+ v^T(-G Q^{-1}(c + A^T u + G^T v) - h)$$
$$= \frac{1}{2} (c + A^T u + G^T v)^T Q^{-1} (c + A^T u + G^T v)$$
$$- c^T Q^{-1}(c + A^T u + G^T v) - u^T A Q^{-1}(c + A^T u + G^T v) - u^T b$$
$$- v^T G Q^{-1}(c + A^T u + G^T v) - v^T h$$
$$= -\frac{1}{2} (c + A^T u + G^T v)^T Q^{-1} (c + A^T u + G^T v) - u^T b - v^T h$$

### Visual Description
A slide showing a multi-step algebraic derivation to find the explicit form of the Lagrange dual function $g(u, v)$ for a Quadratic Program by substituting $x^\star$ back into the Lagrangian.
## Page 17
### Content
# Quadratic Programs

The Lagrange dual function:
$$g(u, v) = -\frac{1}{2}(c + A^T u + G^T v)^T Q^{-1}(c + A^T u + G^T v) - u^T b - v^T h$$

And the Lagrange dual program:
$$\max_{u,v} -\frac{1}{2}(c + A^T u + G^T v)^T Q^{-1}(c + A^T u + G^T v) - u^T b - v^T h$$
subject to $v \ge 0$

For any $u$ and any $v \ge 0$, this is lower a bound on primal optimal value $f^\star$

The dual is also a quadratic program. The dual constraints are much simpler than the primal constraints (so it’s often easier to solve the dual via projected gradient descent)

### Visual Description
Text-only slide.

---
## Page 18
### Content
# Quadratic Program in 2D

We choose $f(x)$ to be quadratic in 2 variables, subject to $x \ge 0$. Dual function $g(u)$ is also quadratic in 2 variables, also subject to $u > 0$

Dual function $g(u)$ provides a bound on $f^\star$ for every $u \ge 0$

Largest bound this gives us: turns out to be exactly $f^\star$ ... coincidence?

More on this later

### Visual Description
The slide contains a 3D plot showing two curved surfaces. The top surface is labeled "primal" and the bottom surface is labeled "dual". The vertical axis is labeled $f/g$. The horizontal axes are labeled $x1 / u1$ and $x2 / u2$. A red dot is marked on the primal surface and a blue dot is marked on the dual surface, appearing to meet at the same vertical level where the surfaces are closest.

---
## Page 19
### Content
# Example

### Visual Description
Text-only slide.

---
## Page 20
### Content
# Nonconvex 4th order polynomial minimization

Define $f(x) = x^4 - 50x^2 + 100x$ (nonconvex), minimize subject to constraint $x \ge -4.5$

| Primal | Dual |
| :---: | :---: |
| ![Primal Plot] | ![Dual Plot] |

Dual function $g$ can be derived explicitly (via closed-form equation for roots of a cubic equation). Form of $g$ is quite complicated, and would be hard to tell whether or not $g$ is concave ... but it must be!

### Visual Description
The slide features two side-by-side plots:
- **Primal Plot:** Shows a non-convex function $f(x)$ with two local minima. A vertical dashed line marks the constraint $x = -4.5$. A horizontal red line indicates the minimum value of the function within the feasible region ($x \ge -4.5$).
- **Dual Plot:** Shows a concave function $g$. A horizontal red line at the top indicates the maximum value of the dual function, which is lower than the primal minimum, illustrating weak duality.

---
## Page 21
### Content
# Appendix

### Visual Description
Text-only slide.

---
## Page 22
### Content
# For an LP, Dual of the Dual = Primal

### Visual Description
Text-only slide.

---
## Page 23
### Content
# For an LP, the Dual of the Dual = Primal

Consider the primal LP
$$(P) \quad \begin{aligned} \min_{x \in \mathbb{R}^d} \quad & c^T x \\ \text{s.t.} \quad & Ax = b, \\ & Gx \le h, \end{aligned}$$
where $A \in \mathbb{R}^{m \times d}, G \in \mathbb{R}^{p \times d}$.

As we discussed before, the Lagrange dual is
$$(D) \quad \begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^p} \quad & -b^T u - h^T v \\ \text{s.t.} \quad & -A^T u - G^T v = c \\ & v \ge 0. \end{aligned}$$

### Visual Description
Text-only slide.

---
## Page 24
### Content
# For an LP, the Dual of the Dual = Primal

The Lagrange dual:
$$(D) \quad \begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^p} \quad & -b^T u - h^T v \\ \text{s.t.} \quad & -A^T u - G^T v = c \\ & v \ge 0. \end{aligned}$$

To take the dual again, write $(D)$ as a minimization:
$$(D) \quad \begin{aligned} \min_{u, v} \quad & b^T u + h^T v \\ \text{s.t.} \quad & -A^T u - G^T v = c \\ & -v \le 0 \end{aligned}$$

Let's write this in a Primal form:
$$(D) \quad \begin{aligned} \min_{u, v} \quad & \begin{pmatrix} b^T & h^T \end{pmatrix} \begin{pmatrix} u \\ v \end{pmatrix} \\ \text{s.t.} \quad & \begin{pmatrix} -A^T & -G^T \end{pmatrix} \begin{pmatrix} u \\ v \end{pmatrix} = c \\ & \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \begin{pmatrix} u \\ v \end{pmatrix} \le \begin{pmatrix} 0 \\ 0 \end{pmatrix} \end{aligned}$$

### Visual Description
Text-only slide.

---
## Page 25
### Content
# For an LP, the Dual of the Dual = Primal

The original primal:
$$(P) \quad \begin{aligned} \min_{x \in \mathbb{R}^d} \quad & c^\top x \\ \text{s.t.} \quad & Ax = b \\ & Gx \le h \end{aligned}$$

The dual:
$$(D) \quad \begin{aligned} \min_{u,v} \quad & (b^\top \quad h^\top) \begin{pmatrix} u \\ v \end{pmatrix} \\ \text{s.t.} \quad & (-A^\top \quad -G^\top) \begin{pmatrix} u \\ v \end{pmatrix} = c \\ & \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \begin{pmatrix} u \\ v \end{pmatrix} \le \begin{pmatrix} 0 \\ 0 \end{pmatrix} \end{aligned}$$

Therefore, let:
$$\tilde{c}^\top = (b^\top \quad h^\top) \quad \tilde{x} = \begin{pmatrix} u \\ v \end{pmatrix}$$
$$\tilde{A} = (-A^\top \quad -G^\top) \quad \tilde{b} = c$$
$$\tilde{G} = \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \quad \tilde{h} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

The dual rewritten as a primal form:
$$(D) \quad \begin{aligned} \min_{\tilde{x} \in \mathbb{R}^d} \quad & \tilde{c}^\top \tilde{x} \\ \text{s.t.} \quad & \tilde{A}\tilde{x} = \tilde{b} \\ & \tilde{G}\tilde{x} \le \tilde{h} \end{aligned}$$

### Visual Description
Mathematical derivation showing how the dual of a Linear Program (LP) can be mapped into the standard form of a primal LP by defining new variables and matrices.

---

## Page 26
### Content
# For an LP, the Dual of the Dual = Primal

The dual:
$$(D) \quad \begin{aligned} \min_{\tilde{x} \in \mathbb{R}^d} \quad & \tilde{c}^\top \tilde{x} \\ \text{s.t.} \quad & \tilde{A}\tilde{x} = \tilde{b} \\ & \tilde{G}\tilde{x} \le \tilde{h} \end{aligned}$$

Where:
$$\tilde{c}^\top = (b^\top \quad h^\top) \quad \tilde{x} = \begin{pmatrix} u \\ v \end{pmatrix}$$
$$\tilde{A} = (-A^\top \quad -G^\top) \quad \tilde{b} = c$$
$$\tilde{G} = \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \quad \tilde{h} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

The dual of the dual:
$$(DD) \quad \begin{aligned} \max_{\tilde{u}, \tilde{v}} \quad & -\tilde{b}^\top \tilde{u} - \tilde{h}^\top \tilde{v} \\ \text{s.t.} \quad & -\tilde{A}^\top \tilde{u} - \tilde{G}^\top \tilde{v} = \tilde{c} \\ & \tilde{v} \ge 0. \end{aligned}$$

Since $\tilde{G} = \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix}$, and we need to calculate $\tilde{G}^\top \tilde{v}$, let's write $\tilde{v} = \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix}$

### Visual Description
Mathematical derivation of the dual of the dual problem, starting from the rewritten dual problem of the previous page.

---

## Page 27
### Content
# For an LP, the Dual of the Dual = Primal

The dual of the dual (DD):
$$(DD) \quad \begin{aligned} \max_{\tilde{u}, \tilde{v}} \quad & -\tilde{b}^\top \tilde{u} - \tilde{h}^\top \tilde{v} \\ \text{s.t.} \quad & -\tilde{A}^\top \tilde{u} - \tilde{G}^\top \tilde{v} = \tilde{c} \\ & \tilde{v} \ge 0. \\ & \tilde{v} = \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} \end{aligned}$$

$$\tilde{c}^\top = (b^\top \quad h^\top) \quad \tilde{x} = \begin{pmatrix} u \\ v \end{pmatrix}$$
$$\tilde{A} = (-A^\top \quad -G^\top) \quad \tilde{b} = c$$
$$\tilde{G} = \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \quad \tilde{h} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

This dual of the dual can be rewritten as:
$$(DD) \quad \begin{aligned} \max_{\tilde{u}, \tilde{v}} \quad & -c^\top \tilde{u} - 0 \\ \text{s.t.} \quad & \begin{pmatrix} A \\ G \end{pmatrix} \tilde{u} - \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} = \begin{pmatrix} b \\ h \end{pmatrix} \\ & \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} \ge 0. \end{aligned}$$

### Visual Description
Further mathematical simplification of the dual of the dual problem by substituting the previously defined matrices and vectors.

---

## Page 28
### Content
# For an LP, the Dual of the Dual = Primal

This dual of the dual:
$$(DD) \quad \begin{aligned} \max_{\tilde{u}, \tilde{v}_1, \tilde{v}_2} \quad & -c^\top \tilde{u} - 0 \\ \text{s.t.} \quad & \begin{pmatrix} A \\ G \end{pmatrix} \tilde{u} - \begin{pmatrix} 0 & 0 \\ 0 & -I \end{pmatrix} \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} = \begin{pmatrix} b \\ h \end{pmatrix} \\ & \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} \ge 0. \end{aligned}$$

Therefore,
$$(DD) \quad \begin{aligned} \min_{\tilde{u}, \tilde{v}_1, \tilde{v}_2} \quad & c^\top \tilde{u} \\ \text{s.t.} \quad & A\tilde{u} = b \\ & G\tilde{u} + \tilde{v}_2 = h \\ & \begin{pmatrix} \tilde{v}_1 \\ \tilde{v}_2 \end{pmatrix} \ge 0. \end{aligned}$$

This is the same as the original primal (with $x = \tilde{u}$):
$$(P) \quad \begin{aligned} \min_{x \in \mathbb{R}^d} \quad & c^\top x \\ \text{s.t.} \quad & Ax = b, \\ & Gx \le h, \end{aligned}$$

We proved:
**For an LP, the Dual of the Dual = Primal! (even if the duality gap is infinite)**

### Visual Description
Final step of the proof showing that the dual of the dual problem is equivalent to the original primal problem. The conclusion is highlighted in red text at the bottom.

---

## Page 29
### Content
# Proper Function, Closed Function

Definition **[proper function]**: a proper convex function is
* an extended real-valued convex function with a non-empty domain,
* that never takes on the value $-\infty$,
* and also is not identically equal to $+\infty$.

Definition **[closed function]**: a function is closed if its epigraph is closed.

### Visual Description
Text-only slide.

---

## Page 30
### Content
# The Dual of the Dual = Primal (Sometimes)

**We have seen:**
For an LP, the Dual of the Dual = Primal! (even if the duality gap is infinite)

**More generally:**
**Fenchel-Moreau theorem:** If the primal is a proper, closed, convex optimization problem, then dual of the dual = primal. (Even if there is no strong duality)

### Visual Description
Text-only slide.

---

## Page 31
### Content
<br>
<br>
<br>
<br>
<center>

# What to Do When Q is not Invertible?

</center>

### Visual Description
Title slide with centered blue text on a white background.

---

## Page 32
### Content
# Pseudo Inverse

For $A \in \mathbb{R}^{m \times n}$, a pseudoinverse of $A$ is defined as $A^+ \in \mathbb{R}^{n \times m}$ satisfying:
$$AA^+A = A \quad \quad (AA^+)^\top = AA^+$$
$$A^+AA^+ = A^+ \quad \quad (A^+A)^\top = A^+A$$

$A^+$ exists for any matrix $A$, but when $A$ has full rank, $A^+$ has a simple form.

### Left inverse
When $A$ has linearly independent columns $\Rightarrow A^\top A$ is invertible $\Rightarrow A^+ = (A^\top A)^{-1} A^\top$
(Left inverse, since $A^+A = I$.)

<center>
$\begin{array}{|c|} \hline \\ A \\ \\ \hline \end{array}$
</center>

### Right inverse
When $A$ has linearly independent rows $\Rightarrow AA^\top$ is invertible $\Rightarrow A^+ = A^\top (AA^\top)^{-1}$
(Right inverse, since $AA^+ = I$.)

<center>
$\begin{array}{|ccc|} \hline & A & \\ \hline \end{array}$
</center>

### Visual Description
Mathematical definitions for the Moore-Penrose pseudoinverse. It includes two simple diagrams: a vertical rectangle representing a "tall" matrix $A$ for the left inverse case, and a horizontal rectangle representing a "wide" matrix $A$ for the right inverse case.

---
==End of PDF==
## Page 33
### Content
# Pseudo Inverse

The pseudo inverse provides a linear least squares solution to a system of linear equations:
$$\mathbf{A}\beta = \mathbf{y}, \mathbf{A} \in \mathbb{R}^{n \times p}, \beta \in \mathbb{R}^p, \mathbf{y} \in \mathbb{R}^n.$$

In general, a vector that solves the system i) may not exist, ii) infinite many might exist, or iii) can be unique.

The pseudoinverse solves the "least-squares" problem as follows:
$\forall \beta \in \mathbb{R}^p$, we have $\|\mathbf{A}\beta - \mathbf{y}\|_2 \geq \|\mathbf{A}z - \mathbf{y}\|_2$ where $z = \mathbf{A}^+ \mathbf{y}$. (*)

The r.h.s is zero if $\mathbf{AA}^+ \mathbf{y} = \mathbf{y}$ (Enough if $A$ has independent rows, i.e. $\mathbf{AA}^+ = I$)
[A]

Equality holds in (*) iff $\beta = \mathbf{A}^+ \mathbf{y} + (I - \mathbf{A}^+ \mathbf{A})\mathbf{w}$, where $\mathbf{w}$ is arbitrary vector.

There are infinite many solutions of the equality in (*) unless $\mathbf{A}$ has full column rank, in which case $(I - \mathbf{A}^+ \mathbf{A})$ is a zero matrix

### Visual Description
Text-only slide. There is a small box containing the letter 'A' below the line discussing independent rows, which appears to be a formatting artifact.

---
## Page 34
### Content
# Symmetric Matrices

If $A$ is symmetric i.e. $A = A^T$, then
$$colspan(A) = colspan(A^T) = rowspan(A^T) = rowspan(A)$$

**Definition [null space of A]**
$null(A) = \{v \mid Av = 0\}$ (i.e. the space of all vectors $v$ such that $Av = 0$.)

Let $a_1, \dots, a_n$ denote the rows (and columns) of a symmetric matrix $A$.

If $v \in null(A)$, then by definition $Av = 0$, and thus $\langle a_i, v \rangle = 0$ for each $i = 1, \dots, dim(A)$.

Thus any vector $v \in null(A)$ is orthogonal to $colspan(A)$.

Therefore, if $A$ is symmetric, then $null(A) \perp colspan(A)$

### Visual Description
Text-only slide.

---
## Page 35
### Content
# What to Do When Q is not Invertible

When we derived $x^* = -Q^{-1}(c + A^T u + G^T v)$ we assumed $Q$ was invertible.

In case $Q$ is not invertible there are two possibilities: we need to understand the linear system:
$$Qx = -(c + A^T u + G^T v)$$

1) Let $p = (c + A^T u + G^T v)$. If $p \in colspan(Q)$ (i.e $p$ is in the column space of $Q$ and $p \perp null(Q)$ since $Q$ is symmetric), then the system of equations $Qx = -(c + A^T u + G^T v)$ has a solution which can be found by the pseudo-inverse of $Q$:
$$x^* = -Q^+(c + A^T u + G^T v)$$
$$g(u, v) = -\frac{1}{2}(c + A^T u + G^T v)^T Q^+(c + A^T u + G^T v) - u^T b - v^T h$$

### Visual Description
Text-only slide.

---
## Page 36
### Content
# What to Do When Q is not Invertible

2) If $p = (c + A^T u + G^T v)$ and $p \notin colspan(Q)$ (i.e $p$ is not in the col space of $Q$ and $p \not\perp null(Q)$), then the equations $Qx = -(c + A^T u + G^T v)$ has no solution.
$$L(x, u, v) = \frac{1}{2}x^T Qx + c^T x + u^T(Ax - b) + v^T(Gx - h)$$
$$= \frac{1}{2}x^T Qx + (c^T + u^T A + v^T G)x - u^T b - v^T h$$
$$= \frac{1}{2}x^T Qx + p^T x - u^T b - v^T h$$

Since $p \not\perp null(Q)$, there is some $w \in null(Q)$ such that $w^T p < 0$.

Let $x = \alpha w, \alpha > 0$
$$L(x, u, v) = \frac{1}{2}(\alpha w)^T Q w \alpha + p^T w \alpha - u^T b - v^T h = p^T w \alpha - u^T b - v^T h \xrightarrow{\alpha \to \infty} -\infty$$

In this case $\min_{x \in \mathbb{R}^n} L(x, u, v) = -\infty$

### Visual Description
Text-only slide.

---
## Page 37
### Content
# Quadratic Programs Summary

Let $p = (c + A^T u + G^T v)$

We got that
$$g(u, v) = \begin{cases} -\frac{1}{2}(c + A^T u + G^T v)^T Q^+(c + A^T u + G^T v) - u^T b - v^T h & \text{If } p \in colspan(Q) \\ -\infty & \text{Otherwise} \end{cases}$$

### Visual Description
Text-only slide.

---
## Page 38
### Content
# Thanks for your Attention ☺

### Visual Description
Text-only slide with a centered closing message and a smiley face.

---
