# March10_LP_Duality

Source: `materials/archive/March10_LP_Duality.pdf`
Duplicate equivalents: `March10_LP_Duality.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 59

## Page 1
### Content
# Optimization for Machine Learning
## Linear Programs, Quadratic Programs, and Duality

Carnegie Mellon University
Slide 1
### Visual Description
Text-only slide.

---

## Page 2
### Content
# Overview
* We’ll discuss the **structure of convex programs**.
* Our focus will be on understanding the **concept of duality**.

### Main idea of Duality:
* Instead of directly solving the original (**primal**) problem, we will create another (**dual**) problem
* This **dual problem is often simpler** than the primal.
    * Constraints are simpler (e.g. all variables are non-negative)
    * Dimensions of the variables to be optimized is often smaller

Carnegie Mellon University
Slide 2
### Visual Description
Text-only slide.

---

## Page 3
### Content
# Overview
Duality is one of the most important structural ideas in optimization.

### At a high level, it gives you:
* Every dual feasible point gives a **provable lower bound** of the original primal problem, even if the original (primal) problem is non-convex! (**Weak duality**)
* Often the dual solution is exactly the primal solution (**Strong duality**)
* Karush-Kuhn-Tucker conditions to **characterize the optima** of convex problems
* Close connection to **min-max problems**, and finding **saddle points**

Carnegie Mellon University
Slide 3
### Visual Description
Text-only slide.

---

## Page 4
### Content
# Importance of Duality
### Many Algorithms Work in the Dual space
* Dual gradient ascent
* Alternating Direction Method of Multipliers (ADMM)
* Primal–dual interior point methods
* Mirror descent
* Fenchel duality methods
* Support Vector Machines (dual formulation)

Carnegie Mellon University
Slide 4
### Visual Description
Text-only slide.

---

## Page 5
### Content
# Importance of Duality
### Duality appears in lots of ML problems:
* SVM dual formulation (kernel trick)
* Fenchel duality in regularized empirical risk minimization (ERM)
* Wasserstein duality in optimal transport
* GANs as minimax dual games
* Mirror descent as dual gradient flow
* Variational inference as Evidence Lower Bound (ELBO) duality
* Convex conjugates in diffusion models and score matching
* Policy optimization in RL
* Applications in game theory

Carnegie Mellon University
Slide 5
### Visual Description
Text-only slide.

---

## Page 6
### Content
# Overview
* We’ll discuss the **structure of convex programs**.
* Our focus will be on understanding the **concept of duality**.
* We will begin with a discussion of **duality in linear programs**.
    * Often in LPs, the dual (which is also an LP) will be a nice reformulation of the original LP, so just writing down the dual will give us some insight into the original program.

Carnegie Mellon University
Slide 6
### Visual Description
Text-only slide.

---

## Page 7
### Content
# Linear Programs
* **Linear programs (LPs) are a special sub-class of convex optimization problems.**
* They were the focus of intense research during WWII, and the period after that.
* An LP is simply an optimization problem:
$$\min_{x \in \mathbb{R}^d} c^T x$$
$$\text{subject to } Ax = b$$
$$Gx \le h$$
where $c \in \mathbb{R}^d, A \in \mathbb{R}^{m \times d}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times d}, h \in \mathbb{R}^r$

Carnegie Mellon University
Slide 7
### Visual Description
Text-only slide containing mathematical optimization formulas.

---

## Page 8
### Content
# Simple Example
Suppose we want to find lower bound on the optimal value in our LP:

E.g., consider the following simple LP
$$\min_{x,y} x + y$$
$$\text{subject to } x + y \ge 2$$
$$x, y \ge 0$$

What’s a good lower bound $B \le \min_{x,y} x + y$, subject to the constraints?

Easy, take $B = 2$

It was easy! ... But didn’t we just get “lucky” in this example?

Carnegie Mellon University
Slide 8
### Visual Description
Text-only slide containing a simple linear programming example with mathematical formulas.

---
## Page 9
### Content
# Try again

Try again:
$$\min_{x,y} x + 3y$$
subject to
$$x + y \ge 2$$
$$x \ge 0$$
$$y \ge 0$$

Multiply each constraint with a nonnegative multiplier and add them together:
$$x + y \ge 2$$
$$+ \quad 2y \ge 0$$
$$+ \quad 0x \ge 0$$
$$= x + 3y \ge 2$$

Lower bound $B = 2$
Therefore, $\min_{x,y} x + 3y \ge 2$

### Visual Description
The slide shows a mathematical derivation for finding a lower bound of a linear programming problem. It lists the objective function and constraints, then demonstrates how to combine them (using implicit multipliers 1, 2, and 0) to show that the objective function is always greater than or equal to 2.

---
## Page 10
### Content
# More generally

More generally:
$$\min_{x,y} px + qy$$
subject to
$$x + y \ge 2$$
$$x \ge 0$$
$$y \ge 0$$

$$a(x + y) + bx + cy \ge 2a + 0b + 0c$$
$$\Rightarrow (a + b)x + (a + c)y \ge 2a$$

subject to
$$a + b = p$$
$$a + c = q$$
$$a, b, c \ge 0$$

Lower bound $B = 2a$, for any $a, b, c$ satisfying the above constraints
$$\min_{x,y} px + qy \ge 2a$$

### Visual Description
This slide generalizes the previous example by using variables $p$ and $q$ for the objective function coefficients and $a, b, c$ as multipliers for the constraints. It derives a general lower bound $2a$ based on these multipliers.

---
## Page 11
### Content
# What's the best we can do?

$$\min_{x,y} px + qy \ge 2a \quad \text{subject to} \quad a + b = p, \ a + c = q, \ a, b, c \ge 0$$

What's the best we can do?
**Maximize our lower bound over all possible $a, b, c$!**

| $\min_{x,y} px + qy$ | $\max_{a,b,c} 2a$ |
| :--- | :--- |
| subject to $x + y \ge 2$ | subject to $a + b = p$ |
| $x, y \ge 0$ | $a + c = q$ |
| | $a, b, c \ge 0$ |
| Called **primal** LP | Called **dual** LP |

**Notes:**
* number of dual variables is number of primal constraints (3 in this example)
* $\min_{x,y} px + qy \ge \max_{a,b,c} 2a$

### Visual Description
The slide introduces the concept of a "Dual LP" as the maximization of the lower bound derived from the "Primal LP". It presents the two linear programs side-by-side for comparison and includes notes on the relationship between the number of variables and constraints.

---
## Page 12
### Content
# Try another one

$$\left. \begin{aligned} \min_{x,y} \ & px + qy \\ \text{subject to} \ & x \ge 0 \\ & -y \ge -1 \\ & 3x + y = 2 \end{aligned} \right\} \text{Primal LP}$$

$$ax + b(-y) + c(3x + y) \ge a \cdot 0 + b \cdot (-1) + c \cdot 2$$
$$(a + 3c)x + (-b + c)y \ge 2c - b$$

$$\left. \begin{aligned} \max_{a,b,c} \ & 2c - b \\ \text{subject to} \ & a + 3c = p \\ & -b + c = q \\ & a, b \ge 0 \end{aligned} \right\} \text{Dual LP} \quad \min_{x,y} px + qy \ge \max_{a,b,c} 2c - b$$

**Note:**
In the dual LP, the multiplier of the equality constraint ($c$) is unconstrained!

### Visual Description
This slide provides another example of converting a primal LP to a dual LP. It highlights that an equality constraint in the primal leads to an unconstrained variable in the dual. Braces are used to group the primal and dual formulations.

---
## Page 13
### Content
# Dual of General LP

$$\left. \begin{aligned} \min_{x \in \mathbb{R}^n} \ & c^T x \\ \text{subject to} \ & Ax = b \\ & Gx \le h \end{aligned} \right\} \text{Primal LP}$$

where $c \in \mathbb{R}^d, \ A \in \mathbb{R}^{m \times d}, \ b \in \mathbb{R}^m, \ G \in \mathbb{R}^{r \times d}, \ h \in \mathbb{R}^r$

The idea of duality might seem a bit strange at first.

We're going to develop a different optimization program (the dual) whose value lower bounds the value of the original linear program (which will now be called the primal).

### Visual Description
The slide defines the general form of a Primal LP using matrix-vector notation. It explains the motivation for duality: creating a new optimization problem that provides a lower bound for the original one.

---
## Page 14
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, \ A \in \mathbb{R}^{m \times n}, \ b \in \mathbb{R}^m, \ G \in \mathbb{R}^{r \times n}, \ h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Explanation:** for any $u \in \mathbb{R}^m$ and $v \in \mathbb{R}^r, \ v \ge 0$, and $x$ primal feasible,
$$u^T(Ax - b) + v^T(Gx - h) \le 0$$
$$u^T Ax - u^T b + v^T Gx - v^T h \le 0$$
$$(u^T A + v^T G)x \le u^T b + v^T h$$
$$(A^T u + G^T v)^T x \le b^T u + h^T v$$
$$(-A^T u - G^T v)^T x \ge -b^T u - h^T v$$

### Visual Description
This slide presents the general Primal and Dual LP formulations side-by-side. Below them, it begins a step-by-step mathematical explanation/derivation using vector algebra to show how the dual objective function relates to the primal.

---
## Page 15
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, \ A \in \mathbb{R}^{m \times n}, \ b \in \mathbb{R}^m, \ G \in \mathbb{R}^{r \times n}, \ h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Explanation [continued]:**
for any $u \in \mathbb{R}^m$ and $v \in \mathbb{R}^r, \ v \ge 0$, and $x$ primal feasible,
$$(-A^T u - G^T v)^T x \ge -b^T u - h^T v$$
Therefore,
for any $u \in \mathbb{R}^m, v \in \mathbb{R}^r, \ v \ge 0$ such that $c = -A^T u - G^T v$, and $x$ primal feasible,
$$c^T x \ge -b^T u - h^T v$$
and we got a lower bound on the primal optimal value $c^T x^*$

### Visual Description
This slide continues the derivation from Page 14. It shows that by setting the coefficient of $x$ equal to $c$, the expression $-b^T u - h^T v$ becomes a lower bound for the primal objective function $c^T x$.

---
## Page 16
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, \ A \in \mathbb{R}^{m \times n}, \ b \in \mathbb{R}^m, \ G \in \mathbb{R}^{r \times n}, \ h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Explanation [continued]:**
Since $\forall u \in \mathbb{R}^m, \ v \in \mathbb{R}^r, \ v \ge 0$ such that $c = -A^T u - G^T v$, and $x$ primal feasible,
$c^T x \ge -b^T u - h^T v$, and $-b^T u - h^T v$ is lower bound on the primal optimal value,

We can try to find the largest lower bound this way:
$$\left. \begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} \ & -b^T u - h^T v \\ \text{subject to} \ & -A^T u - G^T v = c \\ & v \ge 0 \end{aligned} \right\} \text{This is exactly the Dual LP!}$$

### Visual Description
The final slide in this sequence concludes the derivation. It shows that maximizing the previously found lower bound results exactly in the Dual LP formulation defined at the top of the slide. A large brace points to the final optimization problem with the text "This is exactly the Dual LP!".

---
## Page 17
### Content
# Dual of General LP

**Summary**

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

$$\min_{x \in \mathbb{R}^n} c^T x \ge \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to:
$$\begin{aligned} Ax &= b \\ Gx &\le h \end{aligned} \quad \text{and} \quad \begin{aligned} -A^T u - G^T v &= c \\ v &\ge 0 \end{aligned}$$

### Visual Description
The slide presents the mathematical formulations for a Primal Linear Program and its corresponding Dual Linear Program. At the bottom, a large red equation highlights the relationship between the primal minimum and the dual maximum, showing that the primal objective value is greater than or equal to the dual objective value under their respective constraints.

---
## Page 18
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
1) The dual is also a linear program. It is a maximization program (in contrast to the primal which was a minimization program).

### Visual Description
Text-only slide. It repeats the Primal and Dual LP formulations from the previous page and adds the first remark regarding the nature of the dual problem.

---
## Page 19
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
2) Each **constraint** in the primal, yields a **variable** in the dual.
   - $Ax = b \Rightarrow u \in \mathbb{R}^m$
   - $Gx \le h \Rightarrow v \in \mathbb{R}^r, v \ge 0$

3) Conversely, each **variable** in the dual will yield a **constraint** in the primal.
   - $u \in \mathbb{R}^m \Rightarrow Ax = b$
   - $v \in \mathbb{R}^r, v \ge 0 \Rightarrow Gx \le h$

### Visual Description
Text-only slide. It continues the remarks section, explaining the mapping between constraints and variables between the primal and dual problems.

---
## Page 20
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
4) By construction,
   - if we denote the primal optimal value by $p^*$,
   - and the dual optimal value by $d^*$
   - then $p^* \ge d^*$.

This is known as **weak duality**.

### Visual Description
Text-only slide. It introduces the concept of weak duality, stating that the optimal value of the primal minimization problem is always greater than or equal to the optimal value of the dual maximization problem.

---
## Page 21
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
5) It will turn out that under some additional conditions (say if the primal and dual problems are feasible), $p^* = d^*$, these two values are in fact equal.

This is known as **strong duality**.

We will revisit this later.

### Visual Description
Text-only slide. It introduces the concept of strong duality, where the primal and dual optimal values are equal under certain conditions.

---
## Page 22
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
6) A useful exercise is to rewrite the dual as a minimization LP, and then take its dual (can be done mechanically).

What you will observe is that you will end up back at the primal (up to eliminating some variables, and switching signs again).

Concisely, the dual of the dual LP is the primal LP. This fact also turns out to be true in more generally.

### Visual Description
Text-only slide. It discusses the property that the dual of a dual linear program returns to the original primal linear program.

---
## Page 23
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
7) We will say that
   - $p^* = \infty$ if the primal is infeasible (i.e. no $x$ satisfies the constraints),
   - $d^* = -\infty$ if the dual is infeasible. (i.e. no $u, v$ satisfy the constraints)
   - the primal is unbounded if $p^* = -\infty$
   - the dual is unbounded if $d^* = \infty$.

### Visual Description
Text-only slide. It defines the conventions for optimal values ($p^*$ and $d^*$) when the primal or dual problems are infeasible or unbounded.

---
## Page 24
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}^n} & \quad c^T x \\ \text{subject to} & \quad Ax = b \\ & \quad Gx \le h \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

**Remarks**
8) Weak duality then tells us the following facts:
   - If the dual is unbounded ($d^* = \infty$), then the primal is infeasible ($p^* = \infty$).
   - If the primal is unbounded $p^* = -\infty$, then the dual is infeasible ($d^* = -\infty$).

### Visual Description
Text-only slide. It uses the definitions from the previous page to state implications of weak duality regarding unboundedness and infeasibility.

---
## Page 25
### Content
# Dual of General LP

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Remarks**

9) The inequality constraints in the dual problem are very simple: $v \ge 0$

### Visual Description
The slide presents the mathematical formulation of a general Primal Linear Program (LP) and its corresponding Dual LP side-by-side. Below the formulations, there is a section titled "Remarks" with a single point numbered 9.

---
## Page 26
### Content
# Ultimate Goal

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Ultimate Goal:**

* Our eventual goal will be to derive dual optimization programs for a broader class of primal programs.
* The previous approach was **tailored very specifically to linear objective functions** (and linear constraints), and we won't in general be able to re-express the objective exactly as a combination of constraints.

### Visual Description
This slide repeats the Primal and Dual LP formulations from the previous page and adds two bullet points under the heading "Ultimate Goal" explaining the motivation for moving beyond simple linear programs.

---
## Page 27
### Content
# Another perspective on LP duality

### Visual Description
Text-only slide. The title is centered in a large blue font.

---
## Page 28
### Content
# Another perspective on LP duality

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Explanation #2 (Lagrange duality)**

For any $u$ and $v \ge 0$, and $x$ primal feasible
$$c^T x \ge c^T x + u^T(Ax - b) + v^T(Gx - h) := L(x, u, v)$$

This is true because for any feasible $x$ and $v \ge 0$:
$$u^T(Ax - b) = 0$$
and $v^T(Gx - h) \le 0$

### Visual Description
The slide introduces Lagrange duality as a second explanation for LP duality. It shows the Primal LP and then derives an inequality involving the Lagrangian function $L(x, u, v)$, explaining why the inequality holds based on feasibility conditions.

---
## Page 29
### Content
# Another perspective on LP duality

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Explanation #2 [Continued]**

For any $u$ and $v \ge 0$, and $x$ primal feasible
$$c^T x \ge c^T x + u^T(Ax - b) + v^T(Gx - h) := L(x, u, v)$$

So if $C$ denotes primal feasible set: $C = \{x \in \mathbb{R}^n, Ax = b, Gx \le h\}$

$f^\star$ is the primal optimal value: $f^\star \doteq \min_{x \in C} c^T x$

$$f^\star = \min_{x \in C} c^T x \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

### Visual Description
This slide continues the derivation of Lagrange duality. It defines the primal feasible set $C$ and the primal optimal value $f^\star$, then shows a chain of inequalities leading to the definition of the dual function $g(u, v)$.

---
## Page 30
### Content
# Another perspective on LP duality

Given $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m, G \in \mathbb{R}^{r \times n}, h \in \mathbb{R}^r$

**Primal LP**
$$\min_{x \in \mathbb{R}^n} c^T x$$
subject to $Ax = b$
$Gx \le h$

**Dual LP**
$$\max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} -b^T u - h^T v$$
subject to $-A^T u - G^T v = c$
$v \ge 0$

**Explanation #2 (Lagrange duality)**

For any $u$ and $v \ge 0$, and $x$ primal feasible
$$c^T x \ge c^T x + u^T(Ax - b) + v^T(Gx - h) := L(x, u, v)$$

If $C$ is the primal feasible set, $f^\star$ primal optimal value, then for any $u$ and $v \ge 0$,
$$f^\star \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

### Visual Description
This slide summarizes the Lagrange duality explanation by showing both the Primal and Dual LP formulations alongside the key inequality that relates the primal optimal value $f^\star$ to the dual function $g(u, v)$.

---
## Page 31
### Content
# Another perspective on LP duality

For any $u$ and $v \ge 0$, and $x$ primal feasible
$$c^T x \ge c^T x + u^T(Ax - b) + v^T(Gx - h) := L(x, u, v)$$

For any $u$ and $v \ge 0$,
$$f^\star \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$$

In other words, $g(u, v)$ is a lower bound on $f^\star$ for any $u$ and $v \ge 0$

$$g(u, v) \doteq \min_{x \in \mathbb{R}^n} L(x, u, v)$$
$$= \min_{x \in \mathbb{R}^n} c^T x + u^T(Ax - b) + v^T(Gx - h)$$

### Visual Description
The slide focuses on the dual function $g(u, v)$, stating that it provides a lower bound on the primal optimal value $f^\star$. It then begins the explicit expansion of the dual function's definition.

---
## Page 32
### Content
# Another perspective on LP duality

$$g(u, v) \doteq \min_{x \in \mathbb{R}^n} L(x, u, v)$$
$$= \min_{x \in \mathbb{R}^n} c^T x + u^T(Ax - b) + v^T(Gx - h)$$
$$= \min_{x \in \mathbb{R}^n} (c^T + u^T A + v^T G)x - u^T b - v^T h$$
$$= \min_{x \in \mathbb{R}^n} (c + A^T u + G^T v)^T x - b^T u - h^T v$$

$$g(u, v) = \begin{cases} -b^T u - h^T v & \text{if } c = -A^T u - G^T v \\ -\infty & \text{otherwise} \end{cases}$$

### Visual Description
This slide provides the step-by-step algebraic derivation to simplify the dual function $g(u, v)$. It concludes with a piecewise definition of $g(u, v)$ based on whether a specific linear condition on the coefficients is met.

---
## Page 33
### Content
# Another perspective on LP duality

For any $u$ and $v \ge 0$, $f^\star \ge \min_{x \in C} L(x, u, v) \ge \min_{x \in \mathbb{R}^n} L(x, u, v) := g(u, v)$

$$g(u, v) = \begin{cases} -b^T u - h^T v & \text{if } c = -A^T u - G^T v \\ -\infty & \text{otherwise} \end{cases}$$

Now we can maximize $g(u, v)$ over $u$ and $v \ge 0$ to get the tightest bound, and this gives exactly the dual LP as before.

$$\left. \begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned} \right\} \text{Dual LP}$$

This perspective is actually **completely general** and (as we will see) applies to arbitrary optimization problems (even nonconvex ones)

### Visual Description
The slide contains mathematical derivations for the dual LP from the Lagrangian perspective. A large brace on the right side of the optimization problem points to the text "Dual LP" in red. The bottom text emphasizes the generality of this approach with "completely general" highlighted in red.

---

## Page 34
### Content
# Primal – Dual Feasibility Cases for LP

### Visual Description
Text-only slide. The title is centered in blue text.

---

## Page 35
### Content
# Example 1: Both Dual and Primal are Infeasible

Consider the Primal linear program in the form
$$\begin{aligned} \min_{x \in \mathbb{R}^d} & \quad c^T x \\ \text{s.t.} & \quad Ax = b \\ & \quad Gx \le h. \end{aligned}$$

Let $d = 1$ and define
$$c = (1), \quad A = (0), \quad b = (1), \quad G = (0), \quad h = (0).$$

The primal becomes
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad x \\ \text{s.t.} & \quad 0 \cdot x = 1 \\ & \quad 0 \cdot x \le 0. \end{aligned} \quad \text{This is infeasible, so } p^* = \infty.$$

### Visual Description
The slide presents a specific example of a linear program. It defines parameters $c, A, b, G, h$ for a 1D case and shows that the resulting primal problem is infeasible because the constraint $0 \cdot x = 1$ can never be satisfied.

---

## Page 36
### Content
# Example 1 [Continued]: Both Dual and Primal are Infeasible

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad x \\ \text{s.t.} & \quad 0 \cdot x = 1 \\ & \quad 0 \cdot x \le 0. \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

$$c = (1), \quad A = (0), \quad b = (1), \quad G = (0), \quad h = (0).$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -u \\ \text{subject to} & \quad -0u - 0v = 1 \\ & \quad v \ge 0 \end{aligned} \quad \text{This is infeasible, so } d^* = -\infty.$$

**Weak duality:**
$$p^* \ge d^*.$$
In this case, $\infty = p^* > d^* = -\infty$.
(Strong duality does NOT hold)

### Visual Description
This slide continues Example 1 by deriving the dual LP. It shows that the dual is also infeasible due to the constraint $-0u - 0v = 1$. It concludes that weak duality holds ($p^* \ge d^*$) but strong duality does not.

---

## Page 37
### Content
# Example 2: Primal is Feasible, Dual is Infeasible

Consider the Primal linear program in the form
$$\begin{aligned} \min_{x \in \mathbb{R}^d} & \quad c^T x \\ \text{s.t.} & \quad Ax = b \\ & \quad Gx \le h. \end{aligned}$$

Let $d = 1$ and define
$$c = (-1), \quad A = (0), \quad b = (0), \quad G = (-1), \quad h = (0).$$

The primal becomes
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad -x \\ \text{s.t.} & \quad 0 \cdot x = 0 \\ & \quad -x \le 0. \end{aligned}$$

This is feasible, unbounded so $p^* = -\infty$.
Since $p^* \ge d^* \Rightarrow d^* = -\infty$, so the dual in infeasible

### Visual Description
The slide presents a second example where the primal problem is feasible but unbounded. It defines new parameters and shows the resulting primal LP. It concludes that since the primal is unbounded, the dual must be infeasible.

---

## Page 38
### Content
# Example 2 [Continued]: Primal is Feasible, Dual is Infeasible

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad -x \\ \text{s.t.} & \quad 0 \cdot x = 0 \\ & \quad -x \le 0. \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

$$c = (-1), \quad A = (0), \quad b = (0), \quad G = (-1), \quad h = (0).$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -0 \cdot u - 0 \cdot v \\ \text{subject to} & \quad -0u + 1v = -1 \\ & \quad v \ge 0 \end{aligned} \quad \text{This is infeasible, so } d^* = -\infty.$$

**Weak duality:**
$$p^* \ge d^*.$$
In this case, $-\infty = p^* = d^* = -\infty$.
(Strong duality holds)

### Visual Description
This slide continues Example 2 by showing the dual LP formulation. The dual is shown to be infeasible because the constraints $v = -1$ and $v \ge 0$ are contradictory. In this case, strong duality is said to hold because both optimal values are $-\infty$.

---

## Page 39
### Content
# Example 3: Primal is Infeasible, Dual is Feasible

Consider the Primal linear program in the form
$$\begin{aligned} \min_{x \in \mathbb{R}^d} & \quad c^T x \\ \text{s.t.} & \quad Ax = b \\ & \quad Gx \le h. \end{aligned}$$

Let $d = 1$ and define
$$c = (0), \quad A = (1), \quad b = (1), \quad G = \begin{pmatrix} 1 \\ -1 \end{pmatrix}, \quad h = \begin{pmatrix} 0 \\ -2 \end{pmatrix}.$$

The primal becomes
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad 0 \\ \text{s.t.} & \quad x = 1 \\ & \quad x \le 0 \\ & \quad -x \le -2. \end{aligned}$$

The constraints require simultaneously
$$x = 1, \quad x \le 0, \quad x \ge 2,$$
Hence the primal is infeasible, so $p^* = \infty$.

### Visual Description
The slide presents a third example where the primal problem is infeasible. It defines parameters including vector/matrix forms for $G$ and $h$. The constraints are shown to be contradictory ($x=1, x \le 0, x \ge 2$), leading to $p^* = \infty$.

---

## Page 40
### Content
# Example 3 [Continued]: Primal is Infeasible, Dual is Feasible

**Primal LP**
$$\begin{aligned} \min_{x \in \mathbb{R}} & \quad 0 \\ \text{s.t.} & \quad x = 1 \\ & \quad x \le 0 \\ & \quad -x \le -2. \end{aligned}$$

**Dual LP**
$$\begin{aligned} \max_{u \in \mathbb{R}^m, v \in \mathbb{R}^r} & \quad -b^T u - h^T v \\ \text{subject to} & \quad -A^T u - G^T v = c \\ & \quad v \ge 0 \end{aligned}$$

$$c = (0), \quad A = (1), \quad b = (1), \quad G = \begin{pmatrix} 1 \\ -1 \end{pmatrix}, \quad h = \begin{pmatrix} 0 \\ -2 \end{pmatrix}.$$

**Dual LP**
$$\begin{aligned} \max_{u, v_1, v_2 \in \mathbb{R}} & \quad -u - (0v_1 + (-2)v_2) \\ \text{s.t.} & \quad -u - (v_1 - v_2) = 0. \\ & \quad v_1 \ge 0, v_2 \ge 0 \end{aligned}$$

This has feasible solutions, for example $v_1 = 1000, v_2 = 0, u = -1000$
The dual is unbounded, $d^* = \infty$

**Weak duality:**
$$p^* \ge d^*.$$
In this case, $\infty = p^* = d^* = \infty$.
(Strong duality holds)

### Visual Description
This slide completes Example 3. It shows the dual LP is feasible and provides an example solution. It then demonstrates that the dual objective can be made arbitrarily large, making it unbounded ($d^* = \infty$). Strong duality holds as both values are $\infty$.
## Page 41
### Content
# Theorem: Primal is Feasible and Has a Finite Optimal Value, then Dual is Feasible

**We have seen cases for LP where:**
* Primal is Infeasible, Dual is Infeasible
* Primal is Feasible, Dual is Infeasible
* Primal is Infeasible, Dual is Feasible

**Theorem 1**
If the Primal is feasible and has a finite optimal value, then
* the Dual is also feasible
* and has the same finite optimal value (Strong duality holds)

**Theorem 2**
If the Dual is feasible and has a finite optimal value, then
* the Primal is also feasible
* and has the same finite optimal value (Strong duality holds)

**Proof: The proof of Theorem 1 is in the Appendix. Theorem 2 can be proved similarly**

### Visual Description
Text-only slide.

---
## Page 42
### Content
# Summary, Primal – Dual optimal values in LP

* There are cases when $\infty = p^* > d^* = -\infty$
* There are cases when $-\infty = p^* = d^*$
* There are cases when $\infty = p^* = d^*$
* If primal is feasible and bounded below $(-\infty < p^* < \infty) \iff$ dual is feasible and bounded above $(-\infty < d^* < \infty)$.
In this case, the optimal values are equal (Strong duality, $p^* = d^*$)

**[More on this later (Slater condition)]**

### Visual Description
Text-only slide.

---
## Page 43
### Content
# Thanks for your Attention ☺

### Visual Description
Text-only slide with a red smiley face.

---
## Page 44
### Content
# Appendix

### Visual Description
Text-only slide.

---
## Page 45
### Content
# Farkas Lemma

**Farkas Lemma:**

Let $A \in \mathbb{R}^{m \times n}$ and $b \in \mathbb{R}^m$. Exactly one of the following systems has a solution:
(i) $Ax = b, \quad x \ge 0$,
(ii) $A^\top y \ge 0, \quad b^\top y < 0$.

Farkas' lemma states that
* either a linear system with nonnegative variables has a solution,
* or there exists a certificate ($y$) proving that no such solution can exist.

### Visual Description
Text-only slide.

---
## Page 46
### Content
# Proof of Farkas’ Lemma

**Proof of Farkas’ Lemma:**
(i) $Ax = b, \quad x \ge 0$,
(ii) $A^\top y \ge 0, \quad b^\top y < 0$.

**Step 1: The two systems cannot both hold.**

Suppose $x \ge 0$ satisfies $Ax = b$, and $y$ satisfies $A^\top y \ge 0, b^\top y < 0$. Then
$$b^\top y = (Ax)^\top y = x^\top A^\top y.$$

Since $x \ge 0$ and $A^\top y \ge 0$, we obtain
$$x^\top A^\top y \ge 0,$$

Since $Ax = b$, this implies
$$b^\top y \ge 0.$$

This contradicts $b^\top y < 0$. Hence the two systems cannot both hold.

### Visual Description
Text-only slide.

---
## Page 47
### Content
# Proof of Farkas’ Lemma

(i) $Ax = b, \quad x \ge 0$,
(ii) $A^\top y \ge 0, \quad b^\top y < 0$.

**Step 2: At least one of them must hold.**

Define the cone
$$K = \{Ax \mid x \ge 0\}.$$

This is the cone generated by the columns of $A$. Two cases can occur.

**Case 1: $b \in K$.**

Then there exists $x \ge 0$ such that $Ax = b$, and system (i) holds.

### Visual Description
Text-only slide.

---
## Page 48
### Content
# Proof of Farkas’ Lemma

(i) $Ax = b, \quad x \ge 0$,
(ii) $A^\top y \ge 0, \quad b^\top y < 0$.

**Case 2: $b \notin K$.**

Since $K$ is a closed convex cone, the separating hyperplane theorem implies that there exists $y \in \mathbb{R}^m$ such that
$$y^\top z \ge 0 \quad \forall z \in K, \text{ but } y^\top b < 0.$$

$z \in K \iff z = Ax$ for some $x \ge 0$, hence
$$y^\top Ax \ge 0 \quad \forall x \ge 0.$$

Equivalently,
$$x^\top A^\top y \ge 0 \quad \forall x \ge 0.$$

### Visual Description
Text-only slide.

---
## Page 49
### Content
# Proof of Farkas’ Lemma

(i) $Ax = b, \quad x \ge 0,$
(ii) $A^\top y \ge 0, \quad b^\top y < 0.$

**Case 2:** $b \notin K$.

$$x^\top A^\top y \ge 0 \quad \forall x \ge 0.$$

This is possible only if
$$A^\top y \ge 0.$$

Therefore
$$A^\top y \ge 0, \quad b^\top y < 0,$$
so system (ii) holds.

Since the two systems cannot both hold and one of them must hold, exactly one of them is feasible.

### Visual Description
The slide contains mathematical text and formulas explaining the second case of the proof of Farkas' Lemma. It uses standard mathematical notation for matrices and vectors. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 50
### Content
**Theorem 1** If the Primal is feasible and has a finite optimal value, then 
* Part 1: the Dual is also feasible
* Part 2: and has the same finite optimal value (Strong duality holds)

# Proof of Theorem 1

### Visual Description
Text-only slide. The title "Proof of Theorem 1" is centered in large blue font. Theorem 1 is stated at the top. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 51
### Content
# Proof of Theorem 1
**Theorem 1**

Consider the linear program
$$\min_{x \in \mathbb{R}^d} c^\top x$$
$$\text{s.t. } Ax = b,$$
$$Gx \le h.$$

If the primal problem is feasible and bounded below, then its dual problem
$$\max_{u,v} -b^\top u - h^\top v$$
$$\text{s.t. } A^\top u + G^\top v + c = 0,$$
$$v \ge 0$$
is feasible.

In the proof, we will construct such dual feasible $u$ and $v$.
We will also show that strong duality holds.

### Visual Description
The slide presents the mathematical formulation of a primal linear program and its corresponding dual. It outlines the goals of the proof. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 52
### Content
# Proof of Theorem 1
**Primal**
$$\min_{x \in \mathbb{R}^d} c^\top x$$
$$\text{s.t. } Ax = b,$$
$$Gx \le h.$$

Assume the primal problem is feasible and bounded below.
Its optimal value is $p^\star$

For every $\epsilon > 0$ the system
$$Ax = b, \quad Gx \le h, \quad c^\top x \le p^\star - \epsilon$$
is infeasible.

Notation: Let $\beta := p^\star - \epsilon$

### Visual Description
The slide defines the primal problem and introduces an infeasible system based on the optimal value $p^\star$ and a small positive value $\epsilon$. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 53
### Content
# Proof of Theorem 1
$Ax = b, \quad Gx \le h, \quad c^\top x \le \beta$ is infeasible.

Introduce slack variables $s \ge 0$ and $t \ge 0$ to rewrite the inequalities as equalities:
$$Gx + s = h,$$
$$c^\top x + t = \beta.$$

Since $x$ is unrestricted in sign, write
$$x = x^+ - x^-, \quad x^+, x^- \ge 0.$$

The infeasible system becomes
$$Ax^+ - Ax^- = b,$$
$$Gx^+ - Gx^- + s = h,$$
$$c^\top x^+ - c^\top x^- + t = \beta,$$
$$x^+, x^-, s, t \ge 0.$$

### Visual Description
The slide shows the algebraic transformation of an infeasible system of inequalities into a system of equalities by introducing slack variables and splitting the unrestricted variable $x$ into its positive and negative parts. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 54
### Content
# Proof of Theorem 1
The infeasible system:
$$Ax^+ - Ax^- = b,$$
$$Gx^+ - Gx^- + s = h,$$
$$c^\top x^+ - c^\top x^- + t = \beta,$$
$$x^+, x^-, s, t \ge 0.$$

In matrix form this is $Mz = d, z \ge 0$, where
$$z = \begin{bmatrix} x^+ \\ x^- \\ s \\ t \end{bmatrix}, \quad d = \begin{bmatrix} b \\ h \\ \beta \end{bmatrix},$$
and
$$M = \begin{bmatrix} A & -A & 0 & 0 \\ G & -G & I & 0 \\ c^\top & -c^\top & 0 & 1 \end{bmatrix}.$$

### Visual Description
The slide converts the previously derived system of equations into a compact matrix-vector form $Mz = d$. It explicitly defines the vector $z$, the vector $d$, and the block matrix $M$. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 55
### Content
# Proof of Theorem 1
The infeasible system is $Mz = d, z \ge 0$
(i) $Mz = d, \quad z \ge 0,$
(ii) $M^\top y \ge 0, \quad d^\top y < 0.$

By Farkas' Lemma, if (i) is infeasible, then (ii) has to be feasible.

Farkas' lemma implies that there exists a vector
$$y = \begin{bmatrix} u \\ v \\ \mu \end{bmatrix}$$
such that
$$M^\top y \ge 0, \quad d^\top y < 0.$$

### Visual Description
The slide applies Farkas' Lemma to the matrix system $Mz = d$. It states that because system (i) is infeasible, there must exist a vector $y$ (partitioned into $u, v, \mu$) that satisfies system (ii). The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 56
### Content
# Proof of Theorem 1
There exists a vector $y = \begin{bmatrix} u \\ v \\ \mu \end{bmatrix}$ such that $M^\top y \ge 0, d^\top y < 0$

$$M = \begin{bmatrix} A & -A & 0 & 0 \\ G & -G & I & 0 \\ c^\top & -c^\top & 0 & 1 \end{bmatrix} \quad d = \begin{bmatrix} b \\ h \\ \beta \end{bmatrix}$$

Expanding $M^\top y \ge 0$ gives
$$A^\top u + G^\top v + \mu c \ge 0,$$
$$-A^\top u - G^\top v - \mu c \ge 0,$$
$$v \ge 0,$$
$$\mu \ge 0.$$

The first two inequalities imply $A^\top u + G^\top v + \mu c = 0.$

The inequality $d^\top y < 0$ becomes
$$b^\top u + h^\top v + \beta \mu < 0.$$

### Visual Description
The slide expands the matrix inequality $M^\top y \ge 0$ and the scalar inequality $d^\top y < 0$ into their component parts based on the definitions of $M, d,$ and $y$. It concludes with a set of linear constraints on $u, v,$ and $\mu$. The Carnegie Mellon University logo is in the bottom right corner.
## Page 57
### Content
# Proof of Theorem 1

$$y = \begin{bmatrix} u \\ v \\ \mu \end{bmatrix} \quad M = \begin{bmatrix} A & -A & 0 & 0 \\ G & -G & I & 0 \\ c^\top & -c^\top & 0 & 1 \end{bmatrix} \quad d = \begin{bmatrix} b \\ h \\ \beta \end{bmatrix} \quad \begin{aligned} A^\top u + G^\top v + \mu c &= 0, & v \ge 0, \\ b^\top u + h^\top v + \beta \mu &< 0, & \mu \ge 0. \end{aligned}$$

We now show that $\mu > 0$. Suppose $\mu = 0$. Then
$$A^\top u + G^\top v = 0, \quad b^\top u + h^\top v < 0.$$

Let $x$ be any feasible primal point. Then
$$0 = x^\top (A^\top u + G^\top v) = u^\top Ax + v^\top Gx = u^\top b + v^\top Gx.$$

Since $v \ge 0$ and $Gx \le h$, we have $v^\top Gx \le v^\top h$,
hence $0 = u^\top b + v^\top Gx \le b^\top u + h^\top v$, which contradicts $b^\top u + h^\top v < 0$.
Therefore $\mu > 0$.

Slide 57
Carnegie Mellon University

### Visual Description
Text-only slide containing mathematical proofs and matrix definitions.

---
## Page 58
### Content
# Proof of Theorem 1

$$\begin{aligned} A^\top u + G^\top v + \mu c &= 0, & v \ge 0, \\ b^\top u + h^\top v + \beta \mu &< 0, & \mu > 0. \end{aligned}$$

Define
$$\bar{u} = \frac{u}{\mu}, \quad \bar{v} = \frac{v}{\mu}.$$

Then $\bar{v} \ge 0$, and dividing
$$A^\top u + G^\top v + \mu c = 0$$
by $\mu$ yields
$$A^\top \bar{u} + G^\top \bar{v} + c = 0.$$

Thus $(\bar{u}, \bar{v})$ satisfies
$$A^\top \bar{u} + G^\top \bar{v} + c = 0, \quad \bar{v} \ge 0,$$
which means it is feasible for the dual problem. <span style="color:red">The dual problem is feasible.</span>

Slide 58
Carnegie Mellon University

### Visual Description
Text-only slide continuing the mathematical proof. A concluding sentence is highlighted in red text.

---
## Page 59
### Content
# Proof of Theorem 1

Dividing $b^\top u + h^\top v + \beta \mu < 0$ by $\mu$ yields $b^\top \bar{u} + h^\top \bar{v} + \beta < 0$.

Since $\beta := p^\star - \epsilon, \quad b^\top \bar{u} + h^\top \bar{v} + p^\star - \epsilon < 0$.

Dual objective: $-b^\top \bar{u} - h^\top \bar{v} > p^\star - \epsilon$.

Thus for every $\epsilon > 0$ there exists a dual feasible point whose objective value exceeds $p^\star - \epsilon$. Hence
$$d^\star \ge p^\star - \epsilon \quad \forall \epsilon > 0.$$

Letting $\epsilon \downarrow 0$ yields $d^\star \ge p^\star$.

From weak duality we already know $d^\star \le p^\star$.

Therefore, $d^\star = p^\star$. <span style="color:red">Strong duality holds!</span>

Slide 59
Carnegie Mellon University

### Visual Description
Text-only slide concluding the mathematical proof. The final conclusion "Strong duality holds!" is highlighted in red text.
