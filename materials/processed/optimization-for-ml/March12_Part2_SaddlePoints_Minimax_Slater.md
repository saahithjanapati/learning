# March12_Part2_SaddlePoints_Minimax_Slater

Source: `materials/archive/March12_Part2_SaddlePoints_Minimax_Slater.pdf`
Duplicate equivalents: `March12_Part2_SaddlePoints_Minimax_Slater.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 53

## Page 1
### Content
# Optimization for Machine Learning
## Saddle Points, Minimax Formulation, Slater’s Theorem

Slide 1
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 2
### Content
# Strong Duality

We made the observation that $p^* \geq d^*$, i.e. that **weak duality** always holds (even when the primal problem is not convex).

In cases where $p^* = d^*$ we say that **strong duality** holds.

We will refer to $p^* - d^*$ as the duality gap.

**The basic punchline is roughly that**
* strong duality holds for most convex problems (except a few pathological ones),
* and rarely holds for non-convex problems.

Slide 2
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 3
### Content
# Standard Form of Convex Problems

Let the primal problem be a **convex problem**.
$$\min_{x \in \mathbb{R}^n} f(x)$$
$$\text{subject to } h_i(x) \leq 0, \quad i = 1, \dots, m$$
$$\ell_j(x) = 0, \quad j = 1, \dots, r$$

Here $f, \{h_i\}_{i=1}^m$ are **convex** functions, $\{\ell_j\}_{j=1}^r$ equality constraints are **affine**.

Let $C$ denote the domain of the problem, i.e. where all constraints are satisfied and all functions (including the objective too) are finite.

(Note that $C$ is a convex set since the above level sets of convex and affine functions are convex and their intersection is also convex)

Slide 3
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 4
### Content
# Standard Form of Convex Problems

Let the primal problem be a **convex problem**.
$$\min_{x \in \mathbb{R}^n} f(x)$$
$$\text{subject to } h_i(x) \leq 0, \quad i = 1, \dots, m$$
$$\ell_j(x) = 0, \quad j = 1, \dots, r$$

Assume that we re-order the constraints so that for some $k \in \{0, \dots, m\}$ the constraints $h_1, \dots, h_k$ **are all affine** and $h_{k+1}, \dots, h_m$ **are not affine**.

Slide 4
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 5
### Content
# Weak (Relaxed) Slater’s Condition

We’ll describe a set of conditions that are sufficient for strong duality

**Slater’s Theorem:**
Suppose that there exists a point $x_0 \in \text{relInt}(C)$ such that,
$$\ell_j(x_0) = 0, \quad j = 1, \dots, r \quad \text{(affine constraints)}$$
$$h_i(x_0) \leq 0, \quad i = 1, \dots, k \quad \text{(affine constraints)}$$
$$h_i(x_0) < 0, \quad i = k + 1, \dots, m \quad \text{(non-affine constraints)}$$

then strong duality holds, i.e. $p^* = d^*$.

In words, Slater’s condition simply requires that there is some feasible point $x_0$, which is strictly feasible for the **non-affine inequality** constraints.

**Proof: [Appendix]**

Slide 5
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 6
### Content
# Weak (Relaxed) Slater’s Condition

**Remark 1:**
We can create convex problems where Slater’s condition doesn’t hold but we still have strong duality. For example: $\min_x x$ s.t. $x^2 \leq 0$

**Remark 2:**
When the Slater’s condition holds, then dual optimum can be attained and the optimal Lagrange multipliers $(v^* \geq 0, u^*)$ exist.

The primal optimum might still not be attained, e.g. $\min_x x$, s.t. $x > 0$

Slide 6
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 7
### Content
# Weak (Relaxed) Slater’s Condition

$$\ell_j(x_0) = 0, \quad j = 1, \dots, r \quad \text{(affine constraints)}$$
$$h_i(x_0) \leq 0, \quad i = 1, \dots, k \quad \text{(affine constraints)}$$
$$h_i(x_0) < 0, \quad i = k + 1, \dots, m \quad \text{(non-affine constraints)}$$

**Slater’s Corollary for LPs and QPs:**
For LPs and QPs, all constraints are affine.
(There are no non-affine constraints for LPs and QPs!)

Therefore,
1) If in an LP or QP, either the primal or the dual is feasible, then strong duality holds, i.e. $p^* = d^*$.
[This $p^* = d^*$ value might still be $\infty$ (if dual is feasible and unbounded) or $-\infty$ (if primal is feasible and unbounded)]

Slide 7
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 8
### Content
# Slater’s Corollary for LPs and QPs:

2) If $p^* < \infty$, then the primal is feasible, so strong duality holds, and therefore $d^* = p^* < \infty$.
[It can’t happen that $p^* = 23$ and $d^* = 12$, or $d^* = -\infty$]
[It could still happen that $p^* = -\infty$ and $d^* = -\infty$]

3) If $d^* > -\infty$, then the dual is feasible, so strong duality holds, and therefore $p^* = d^* > -\infty$.
[It can’t happen that $d^* = 12$ and $p^* = 23$ or $p^* = \infty$]
[It could still happen that $d^* = \infty$ and $p^* = \infty$]

4) If both the primal and dual are infeasible, then strong duality fails (but weak duality of course, always holds: $d^* = -\infty < \infty = p^*$).

Slide 8
Carnegie Mellon University
### Visual Description
Text-only slide.
## Page 9
### Content
# Weak (Relaxed) Slater’s Condition

$$
\begin{aligned}
\ell_j(x_0) &= 0, \quad j = 1, \dots, r & \text{(affine constraints)} \\
h_i(x_0) &\le 0, \quad i = 1, \dots, k & \text{(affine constraints)} \\
h_i(x_0) &< 0, \quad i = k + 1, \dots, m & \text{(non-affine constraints)}
\end{aligned}
$$

Weak duality: $p^* \ge d^*$.

**Implications of Weak Duality for LPs:**

5) If the dual is unbounded ($d^* = \infty$), then the primal must be infeasible ($p^* = \infty$), and strong duality holds.

6) If the primal is unbounded ($p^* = -\infty$), then the dual must be infeasible ($d^* = -\infty$) and strong duality holds.

### Visual Description
Text-only slide containing mathematical definitions of relaxed Slater's condition and implications of weak duality for linear programs.

---
## Page 10
### Content
# Minimax Formulation

### Visual Description
Text-only slide. Title slide for the "Minimax Formulation" section.

---
## Page 11
### Content
# Minimax Formulation

Our treatment of duality seems so far to be a bit asymmetric:

* We often treat the primal as special (given to us, and the main object of interest).
* From the primal we derived the Lagrangian function and then from the Lagrangian the dual function and the dual problem.

However, we will see that they are both in fact completely symmetric objects and both can be derived from the Lagrangian function.

### Visual Description
Text-only slide discussing the symmetry between primal and dual problems in the context of the Lagrangian function.

---
## Page 12
### Content
# Supremum of Infimum and Infimum of Supremum

### Lemma $[\sup \inf f \le \inf \sup f]$
Let $f : X \times Y \to \mathbb{R}$ be an arbitrary function.
Then we have that
$$\sup_{y \in Y} \left( \inf_{x \in X} f(x, y) \right) \le \inf_{x \in X} \left( \sup_{y \in Y} f(x, y) \right)$$

### Proof
$$f(x, y) \le \sup_{y \in Y} f(x, y) \quad \forall x, y$$
$$\Rightarrow \inf_{x \in X} f(x, y) \le \inf_{x \in X} \left( \sup_{y \in Y} f(x, y) \right) \quad \forall y$$
$$\Rightarrow \sup_{y \in Y} \left( \inf_{x \in X} f(x, y) \right) \le \inf_{x \in X} \left( \sup_{y \in Y} f(x, y) \right) \quad \blacksquare$$

### Visual Description
Text-only slide presenting a lemma and its proof regarding the relationship between the supremum of an infimum and the infimum of a supremum.

---
## Page 13
### Content
# Minimax Formulation

$$\inf_{x \in \mathbb{R}^n} f(x)$$
$$\text{subject to } h_i(x) \le 0, \quad i = 1, \dots, m$$
$$\ell_j(x) = 0, \quad j = 1, \dots, r$$

Lagrangian function:
$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x) \quad \text{where } v \ge 0.$$

### Lemma:
$$\sup_{u, v \ge 0} L(x, u, v) = \begin{cases} f(x) & \text{If } x \text{ is feasible} \\ \infty & \text{Otherwise} \end{cases}$$

Remember that in $\sup_{u, v \ge 0}$ there are constraints only on $v$!

### Proof:
For feasible $x$,
$$L(x, u, v) = f(x) + \sum_{j=1}^r u_j \underbrace{\ell_j(x)}_{=0} + \sum_{i=1}^m \underbrace{v_i h_i(x)}_{\le 0} \le f(x) \quad \blacksquare$$

### Visual Description
Text-only slide showing the primal optimization problem, the Lagrangian function, and a lemma proving that the supremum of the Lagrangian over dual variables equals the objective function for feasible points.

---
## Page 14
### Content
# Minimax Formulation

$$\inf_{x \in \mathbb{R}^n} f(x)$$
$$\text{subject to } h_i(x) \le 0, \quad i = 1, \dots, m$$
$$\ell_j(x) = 0, \quad j = 1, \dots, r$$

Let $C$ denote the primal feasible set:
$$C = \{x \mid x \in \mathbb{R}^n, h_i(x) \le 0, i = 1, \dots, m, \ell_j(x) = 0, j = 1, \dots, r\}$$

### Lemma [Primal optimal value as a minimax problem]:
The primal optimal value $p^*$ is
$$p^* \doteq \inf_{x \in C} f(x) = \inf_{x \in C} \sup_{u, v \ge 0} L(x, u, v) = \underbrace{\inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v)}_{\text{Minimax problem}}$$

### Proof:
Since $\sup_{u, v \ge 0} L(x, u, v) = f(x)$ if $x \in C$ and $\sup_{u, v \ge 0} L(x, u, v) = \infty$ if $x \notin C$. $\blacksquare$

### Visual Description
Text-only slide defining the primal feasible set and showing how the primal optimal value can be expressed as a minimax problem using the Lagrangian. Arrows are used to link the supremum term to its value based on feasibility.

---
## Page 15
### Content
# Minimax Formulation

The primal optimal value $p^*$ is
$$p^* \doteq \inf_{x \in C} f(x) = \inf_{x \in C} \sup_{u, v \ge 0} L(x, u, v) = \inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v)$$

The dual optimal value $d^*$ is defined as:
$$d^* \doteq \sup_{u, v \ge 0} g(u, v) = \sup_{u, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v)$$

### Theorem [weak duality]:
$$d^* \le p^*$$

### Proof: 
By using the $\sup \inf f \le \inf \sup f$ lemma, we have that
$$d^* = \sup_{u, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) \le \inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v) = p^* \quad \blacksquare$$

This statement is always true (i.e. does not require any conditions on $L$).

### Visual Description
Text-only slide comparing the minimax formulations of the primal and dual optimal values and proving weak duality using the previously established lemma.

---
## Page 16
### Content
# Minimax Formulation

$$\inf_{x \in \mathbb{R}^n} f(x)$$
$$\text{subject to } h_i(x) \le 0, \quad i = 1, \dots, m$$
$$\ell_j(x) = 0, \quad j = 1, \dots, r$$

**Strong duality:** Sometimes
$$d^* = \sup_{u, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) = \inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v) = p^*$$

Slater’s condition provides some sufficient conditions when strong duality holds.

### Visual Description
Text-only slide defining strong duality as the equality of the minimax and maximin formulations and mentioning Slater's condition as a sufficient condition.
## Page 17
### Content
# Min-Max Characterization of Primal and Dual Optimizers

### Visual Description
Text-only slide.

---
## Page 18
### Content
# Min-Max Characterization of Primal and Dual Optimizers

**Theorem:** Assume the primal optimal value
$$p^\star = \inf_x \sup_{u, v \ge 0} L(x, u, v)$$
is attained at $x^\star$,
and the dual optimal value
$$d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v)$$
is attained at $(u^\star, v^\star)$.

Then $x^\star \in \arg \min_{x \in \mathbb{R}^n} \sup_{u \in \mathbb{R}^p, v \ge 0} L(x, u, v)$,

and $(u^\star, v^\star) \in \arg \max_{u \in \mathbb{R}^p, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v)$.

### Visual Description
Text-only slide.

---
## Page 19
### Content
# Proof

Let $x^\star$ be a primal optimal solution.

**We already know:** $p^\star = \inf_x \sup_{u, v \ge 0} L(x, u, v)$

Since the infimum is attained at $x^\star$, $\sup_{u, v \ge 0} L(x^\star, u, v) = p^\star$.

Therefore $x^\star$ minimizes the function
$$x \mapsto \sup_{u, v \ge 0} L(x, u, v),$$
which implies
$$x^\star \in \arg \min_x \sup_{u, v \ge 0} L(x, u, v).$$

### Visual Description
Text-only slide.

---
## Page 20
### Content
# Proof

Now let $(u^\star, v^\star)$ be a dual optimal solution.

**We already know:** $d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v)$.

Since the supremum is attained at $(u^\star, v^\star)$,
$$\inf_x L(x, u^\star, v^\star) = d^\star.$$

Thus $(u^\star, v^\star)$ maximizes the function
$$(u, v) \mapsto \inf_x L(x, u, v),$$
and therefore
$$(u^\star, v^\star) \in \arg \max_{u, v \ge 0} \inf_x L(x, u, v).$$

### Visual Description
Text-only slide.

---
## Page 21
### Content
# Saddle Point Characterization of Strong Duality

### Visual Description
Text-only slide.

---
## Page 22
### Content
# Definitions

Primal problem:
$$\min_{x \in \mathbb{R}^n} f(x)$$
subject to $h_i(x) \le 0, \quad i = 1, \dots, m$
$\ell_j(x) = 0, \quad j = 1, \dots, r$

Lagrangian function: $L(x, u, v) = f(x) + \sum_{j=1}^r u_j \ell_j(x) + \sum_{i=1}^m v_i h_i(x)$

The dual function: $g(u, v) = \inf_x L(x, u, v)$

The dual problem: $\max_{u, v \ge 0} g(u, v)$

**We already know:** $p^\star = \inf_x \sup_{u, v \ge 0} L(x, u, v)$ primal optimal value
$d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v)$ dual optimal value.

### Visual Description
Text-only slide.

---
## Page 23
### Content
# Saddle Points

**Weak duality:** $d^\star = \sup_{u, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) \le \inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v) = p^\star$

**Definition [Saddle point]**

A point $(x^\star, (u^\star, v^\star))$ is a saddle point of $L(x, u, v)$ if we have:
$$L(x^\star, u, v) \le L(x^\star, u^\star, v^\star) \le L(x, u^\star, v^\star) \text{ for any } (x, u, v)$$

### Visual Description
Text-only slide.

---
## Page 24
### Content
# Saddle point => Strong duality

**Theorem [Saddle point $\Rightarrow$ Strong duality]:**

We are given a possibly **nonconvex** optimization problem. If $(x^\star, u^\star, v^\star)$ is a saddle point of the Lagrangian, then $(x^\star)$ is a primal, $(u^\star, v^\star)$ is a dual optimal solution, and strong duality holds.

In this case,
$$d^\star = \sup_{u, v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) = L(x^\star, u^\star, v^\star) = \inf_{x \in \mathbb{R}^n} \sup_{u, v \ge 0} L(x, u, v) = p^\star$$

**Proof: [Next slides]**

### Visual Description
Text-only slide.

---
## Page 25
### Content
# Strong duality => Saddle point

**Theorem [Strong duality $\Rightarrow$ Saddle point]:**

The opposite is also true if we assume $(x^\star)$ and dual $(u^\star, v^\star)$ optimal solutions exist.

We are given a possibly **nonconvex** optimization problem. In this case, if strong duality holds ($p^\star = d^\star$), then $(x^\star, u^\star, v^\star)$ is a saddle point of the Lagrangian.

In this case,
$$d^\star = \sup_{u,v \ge 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) = L(x^\star, u^\star, v^\star) = \inf_{x \in \mathbb{R}^n} \sup_{u,v \ge 0} L(x, u, v) = p^\star$$

**Proof: [Next slides]**

**Remark:** Even if $p^\star = d^\star$, the primal $(x^\star)$ and dual $(u^\star, v^\star)$ optimal solutions might not exist! (That's why we made the assumption that they exist)

### Visual Description
Text-only slide.

---
## Page 26
### Content
# Proof: Saddle point => Strong duality

### Visual Description
Title slide with blue text centered on a white background.

---
## Page 27
### Content
# Proof: Saddle point => Strong duality

**(Saddle point $\Rightarrow$ strong duality)**

Assume $(x^\star, u^\star, v^\star)$ is a saddle point.
$$\Rightarrow L(x^\star, u, v) \le L(x^\star, u^\star, v^\star) \le L(x, u^\star, v^\star) \quad \text{for all } x, u, \text{ and } v \ge 0.$$

Taking the infimum over $x$ in the right inequality gives
$$\inf_x L(x, u^\star, v^\star) = L(x^\star, u^\star, v^\star).$$
$$\Rightarrow L(x^\star, u^\star, v^\star) = \inf_x L(x, u^\star, v^\star)$$
$$\le \sup_{u, v \ge 0} \inf_x L(x, u, v)$$
$$= d^\star$$

Hence,
$$d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v) \ge \inf_x L(x, u^\star, v^\star) = L(x^\star, u^\star, v^\star).$$

### Visual Description
Text-only slide.

---
## Page 28
### Content
# Proof: Saddle point => Strong duality

Similarly, assume again that $(x^\star, u^\star, v^\star)$ is a saddle point. Then
$$L(x^\star, u, v) \le L(x^\star, u^\star, v^\star) \le L(x, u^\star, v^\star)$$
for all $x, u,$ and $v \ge 0$.

Taking the supremum over $u, v$ in the left inequality gives
$$\sup_{u, v \ge 0} L(x^\star, u, v) = L(x^\star, u^\star, v^\star).$$
$$\Rightarrow L(x^\star, u^\star, v^\star) = \sup_{u, v \ge 0} L(x^\star, u, v)$$
$$\ge \inf_x \sup_{u, v \ge 0} L(x, u, v)$$
$$= p^\star$$

Therefore,
$$p^\star = \inf_x \sup_{u, v \ge 0} L(x, u, v) \le \sup_{u, v \ge 0} L(x^\star, u, v) = L(x^\star, u^\star, v^\star).$$

### Visual Description
Text-only slide.

---
## Page 29
### Content
# Proof: Saddle point => Strong duality

**We already know:**
$$d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v) \ge \inf_x L(x, u^\star, v^\star) = L(x^\star, u^\star, v^\star).$$
$$p^\star = \inf_x \sup_{u, v \ge 0} L(x, u, v) \le \sup_{u, v \ge 0} L(x^\star, u, v) = L(x^\star, u^\star, v^\star).$$

Combining these we have,
$$p^\star \le L(x^\star, u^\star, v^\star) \le d^\star.$$

By weak duality,
$$d^\star \le p^\star$$
$$\Rightarrow p^\star = d^\star = L(x^\star, u^\star, v^\star).$$
Strong duality holds ■

### Visual Description
Text-only slide.

---
## Page 30
### Content
# Proof: Strong duality => Saddle point

### Visual Description
Title slide with blue text centered on a white background.

---
## Page 31
### Content
# Proof: Strong duality => Saddle point

**(Strong duality $\Rightarrow$ saddle point)**

Assume strong duality holds and the primal $(x^\star)$ and dual $(u^\star, v^\star)$ optimal solutions exist:
$$p^\star = d^\star.$$

By definition, $d^\star = \sup_{u, v \ge 0} \inf_x L(x, u, v)$, and $g(u, v) = \inf_x L(x, u, v)$

Since $(u^\star, v^\star)$ maximizes the dual function,
$$d^\star = g(u^\star, v^\star) = \inf_x L(x, u^\star, v^\star).$$

### Visual Description
Text-only slide.

---
## Page 32
### Content
# Proof: Strong duality => Saddle point

As we just discussed, $d^\star = g(u^\star, v^\star) = \inf_x L(x, u^\star, v^\star)$.

Because $p^\star = d^\star$ and $x^\star$ is primal optimal,
$$f(x^\star) = p^\star = d^\star = \inf_x L(x, u^\star, v^\star).$$

Since
$$\inf_x L(x, u^\star, v^\star) \le L(x^\star, u^\star, v^\star),$$
we obtain
$$f(x^\star) \le L(x^\star, u^\star, v^\star).$$

### Visual Description
Text-only slide.
## Page 33
### Content
# Proof: Strong duality => Saddle point

$$
\begin{aligned}
\min_{x \in \mathbb{R}^n} & \quad f(x) \\
\text{subject to} & \quad h_i(x) \leq 0, \quad i = 1, \dots, m \\
& \quad \ell_j(x) = 0, \quad j = 1, \dots, r
\end{aligned}
$$

On the other hand, because $x^\star$ is feasible,
$$l_j(x^\star) = 0, \quad h_i(x^\star) \leq 0,$$
and since $v^\star \geq 0$,
$$L(x^\star, u^\star, v^\star) = f(x^\star) + \sum_{j=1}^p u_j^\star l_j(x^\star) + \sum_{i=1}^m v_i^\star h_i(x^\star) \leq f(x^\star).$$

### Visual Description
The slide contains the first part of a mathematical proof. It defines a constrained optimization problem and then uses the feasibility of the optimal point $x^\star$ and the non-negativity of the dual variable $v^\star$ to show an inequality involving the Lagrangian $L(x^\star, u^\star, v^\star)$.

---
## Page 34
### Content
# Proof: Strong duality => Saddle point

Putting these together: $f(x^\star) \leq L(x^\star, u^\star, v^\star) \leq f(x^\star)$
$$\Rightarrow L(x^\star, u^\star, v^\star) = f(x^\star).$$

Since we already know, $f(x^\star) = p^\star = d^\star = \inf_x L(x, u^\star, v^\star)$, therefore,
$$L(x^\star, u^\star, v^\star) = \inf_x L(x, u^\star, v^\star),$$
which implies
$$L(x^\star, u^\star, v^\star) \leq L(x, u^\star, v^\star) \quad \forall x.$$

### Visual Description
Text-only slide. It continues the proof from the previous page, showing that the Lagrangian evaluated at the optimal primal and dual variables is equal to the primal objective value, and that $x^\star$ minimizes the Lagrangian for fixed $(u^\star, v^\star)$.

---
## Page 35
### Content
# Proof: Strong duality => Saddle point

Also, since $x^\star$ is feasible, for any $u$ and any $v \geq 0$,
$$L(x^\star, u, v) = f(x^\star) + \sum_{j=1}^p u_j h_j(x^\star) + \sum_{i=1}^m v_i g_i(x^\star) \leq f(x^\star) = L(x^\star, u^\star, v^\star).$$
Thus
$$L(x^\star, u, v) \leq L(x^\star, u^\star, v^\star) \leq L(x, u^\star, v^\star),$$
for all $x, u \in \mathbb{R}^p$, and $v \geq 0$.

So $(x^\star, u^\star, v^\star)$ is a saddle point. ■

### Visual Description
Text-only slide. It concludes the proof by showing that $(x^\star, u^\star, v^\star)$ satisfies the saddle point property for the Lagrangian. A small black square (QED symbol) marks the end of the proof.

---
## Page 36
### Content
# Certificates of Sub-Optimality

### Visual Description
Title slide with the text "Certificates of Sub-Optimality" centered in blue.

---
## Page 37
### Content
# Certificates of Sub-Optimality

**Weak duality:** We already know that

For any $x$ primal feasible, $u$, and $v \geq 0$, we have that
$$g(u, v) \leq d^\star = \sup_{u, v \geq 0} \inf_{x \in \mathbb{R}^n} L(x, u, v) \leq \inf_{x \in \mathbb{R}^n} \sup_{u, v \geq 0} L(x, u, v) = p^\star \leq f(x)$$
$$g(u, v) \leq p^\star$$
$$\Rightarrow f(x) - p^\star \leq f(x) - g(u, v)$$

In words, given any feasible $x$ primal and $u, v$ dual solutions, without knowing the optimal primal value $p^\star$, we can provide a bound $(f(x) - g(u, v))$ on the suboptimality value $f(x) - p^\star$.

When the difference $f(x) - g(u, v)$ approaches zero, then $(x, (u, v))$ converges to a saddle point $(x^\star, (u^\star, v^\star))$.

### Visual Description
Text-only slide explaining how weak duality provides a certificate of sub-optimality by bounding the gap between the current objective value and the optimal value using the dual function.

---
## Page 38
### Content
# Thanks for your Attention ☺

### Visual Description
Closing slide with the text "Thanks for your Attention ☺" centered in blue.

---
## Page 39
### Content
# Appendix

### Visual Description
Section header slide with the word "Appendix" centered in blue.

---
## Page 40
### Content
# Proof of Slater’s Theorem

### Visual Description
Section header slide with the text "Proof of Slater’s Theorem" centered in blue.

---
## Page 41
### Content
# Slater’s Theorem

**Primal problem:**
$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f_0(x) \quad \text{[convex]} \\
\text{subject to} & \quad f_i(x) \leq 0, \quad i = 1, \dots, m \quad \text{[convex]} \\
& \quad h_j(x) = 0, \quad j = 1, \dots, p \quad \text{[affine]}
\end{aligned}
$$

**Slater’s Theorem:**
Let $\mathcal{D} := \bigcap_{i=0}^m \text{dom}(f_i) \cap \bigcap_{j=1}^p \text{dom}(h_j)$ [The intersection of the domains]

Suppose there exists $\tilde{x} \in \text{relint } \mathcal{D}$ with $f_i(\tilde{x}) < 0, i = 1, \dots, m$, and $h_j(\tilde{x}) = 0, j = 1, \dots, p$.

then strong duality holds, i.e. $p^* = d^*$.

**Proof: [Next few slides]**

Slide 41
Carnegie Mellon University

### Visual Description
Text-only slide containing the mathematical definition of the primal problem and the statement of Slater's Theorem.

---
## Page 42
### Content
# Proof of Slater’s Theorem

**Primal problem: (P)**
$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f_0(x) \quad \text{[convex]} \\
\text{subject to} & \quad f_i(x) \leq 0, \quad i = 1, \dots, m \quad \text{[convex]} \\
& \quad h_j(x) = 0, \quad j = 1, \dots, p \quad \text{[affine]}
\end{aligned}
$$

Let $\mathcal{D} := \bigcap_{i=0}^m \text{dom}(f_i) \cap \bigcap_{j=1}^p \text{dom}(h_j)$ [The intersection of the domains]

Let $\mathcal{G} := \{ (\underbrace{f_1(x), \dots, f_m(x)}_{\text{inequality}}, \underbrace{h_1(x), \dots, h_p(x)}_{\text{equality}}, \underbrace{f_0(x)}_{\text{objective}}) \in \mathbf{R}^m \times \mathbf{R}^p \times \mathbf{R} \mid x \in \mathcal{D} \}$

[the set of possible values taken on by the constraint and objective functions]

The optimal value $p^*$ of the primal problem (P) can be expressed as
$$p^* = \inf \{ t \mid (u, v, t) \in \mathcal{G}, u \leq 0, v = 0 \}.$$

Slide 42
Carnegie Mellon University

### Visual Description
The slide defines the set $\mathcal{G}$ which represents the possible values of the constraint and objective functions. Curly braces are used to label the components of the vector in $\mathcal{G}$ as "inequality", "equality", and "objective".

---
## Page 43
### Content
# Proof of Slater’s Theorem

**Primal problem: (P)**
$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f_0(x) \quad \text{[convex]} \\
\text{subject to} & \quad f_i(x) \leq 0, \quad i = 1, \dots, m \quad \text{[convex]} \\
& \quad h_j(x) = 0, \quad j = 1, \dots, p \quad \text{[affine]}
\end{aligned}
$$

**Let us rewrite it into this form:**
$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f_0(x) \\
\text{subject to} & \quad f_i(x) \leq 0, \quad i = 1, \dots, m \\
& \quad Ax - b = 0 \quad A \in \mathbb{R}^{p \times n}, b \in \mathbb{R}^p
\end{aligned}
$$

**Slater condition:**
There exists $\tilde{x} \in \text{relint } \mathcal{D}$ with $f_i(\tilde{x}) < 0, i = 1, \dots, m$, and $A\tilde{x} - b = 0$.

Slide 43
Carnegie Mellon University

### Visual Description
Text-only slide showing the primal problem rewritten with matrix notation for the affine equality constraints and the corresponding Slater condition.

---
## Page 44
### Content
# Proof of Slater’s Theorem

$$
\begin{aligned}
\inf_{x \in \mathbb{R}^n} & \quad f_0(x) \quad \text{[convex]} \\
\text{subject to} & \quad f_i(x) \leq 0, \quad i = 1, \dots, m \quad \text{[convex]} \\
& \quad Ax - b = 0 \quad A \in \mathbb{R}^{p \times n}, b \in \mathbb{R}^p \quad \text{[affine]}
\end{aligned}
$$

**Slater condition:**
There exists $\tilde{x} \in \text{relint } \mathcal{D}$ with $f_i(\tilde{x}) < 0, i = 1, \dots, m$, and $A\tilde{x} - b = 0$.

To make the proof a little simpler, let us assume that
* $\mathcal{D}$ has nonempty interior (hence, $\text{relint } \mathcal{D} = \text{int } \mathcal{D}$)
* $\text{rank } A = p$.
* We can also assume that $p^*$ is finite. (Since there is a feasible point, we can only have $p^* = -\infty$, or $p^*$ finite; if $p^* = -\infty$, then $d^* = -\infty$ by weak duality.)

Slide 44
Carnegie Mellon University

### Visual Description
Text-only slide listing simplifying assumptions for the proof of Slater's Theorem.

---
## Page 45
### Content
# Proof of Slater’s Theorem

Let $\mathcal{G} := \{ (\underbrace{f_1(x), \dots, f_m(x)}_{\text{inequality}}, \underbrace{h_1(x), \dots, h_p(x)}_{\text{equality}}, \underbrace{f_0(x)}_{\text{objective}}) \in \mathbf{R}^m \times \mathbf{R}^p \times \mathbf{R} \mid x \in \mathcal{D} \}$
[the set of possible constraint and objective values]

Let $F(u, v, t) := \bigcap_{i=1}^m \{ x \mid f_i(x) \leq u_i \} \cap \bigcap_{i=1}^p \{ x \mid h_i(x) = v_i \} \cap \{ x \mid f_0(x) \leq t \} \cap \mathcal{D}$

Let $\mathcal{A} := \mathcal{G} + (\mathbf{R}^m_+ \times \{0\}^p \times \mathbf{R}_+)$
$= \{ (u, v, t) \mid \exists x \in \mathcal{D}, f_i(x) \leq u_i, i = 1, \dots, m, h_i(x) = v_i, i = 1, \dots, p, f_0(x) \leq t \}$
$= \{ (u, v, t) \mid \exists x \in F(u, v, t) \} = \{ (u, v, t) \mid F(u, v, t) \neq \emptyset \}$

[set of feasible
* upper bounds $u$ on the inequality constraints,
* values $v$ of equality constraints,
* upper bounds $t$ on objective values]

Notice that if $F(u_1, v_1, t_1) \neq \emptyset$ and $F(u_2, v_2, t_2) \neq \emptyset$, then
$F(\lambda u_1 + (1 - \lambda)u_2, \lambda v_1 + (1 - \lambda)v_2, \lambda t_1 + (1 - \lambda)t_2) \neq \emptyset$

Therefore, $\mathcal{A}$ is convex.

Slide 45
Carnegie Mellon University

### Visual Description
The slide defines the set $\mathcal{A}$ as an extension of $\mathcal{G}$ and proves its convexity. Red text is used for descriptive labels and bullet points.

---
## Page 46
### Content
# Proof of Slater’s Theorem

We define a convex set $\mathcal{B}$ as
$$\mathcal{B} = \{ (0, 0, s) \in \mathbf{R}^m \times \mathbf{R}^p \times \mathbf{R} \mid s < p^* \}$$

**Lemma:** The sets $\mathcal{A}$ and $\mathcal{B}$ do not intersect.

**Proof:**
To see this, suppose $(u, v, t) \in \mathcal{A} \cap \mathcal{B}$.
Since $(u, v, t) \in \mathcal{B}$ we have $u = 0, v = 0$, and $t < p^*$.

Since $(u, v, t) \in \mathcal{A}$, there exists an $x$ with $f_i(x) \leq u_i = 0, i = 1, \dots, m, Ax - b = v = 0$, and $f_0(x) \leq t < p^*$, which is impossible since $p^*$ is the optimal value of the primal problem. $\blacksquare$

Slide 46
Carnegie Mellon University

### Visual Description
Text-only slide presenting a lemma and its proof regarding the non-intersection of sets $\mathcal{A}$ and $\mathcal{B}$.

---
## Page 47
### Content
# Proof of Slater’s Theorem

$\mathcal{A} = \{ (u, v, t) \mid \exists x \in \mathcal{D}, f_i(x) \leq u_i, i = 1, \dots, m, h_i(x) = v_i, i = 1, \dots, p, f_0(x) \leq t \}$

Note that if $(u_0, v_0, t_0) \in \mathcal{A}$, then $(u_0 + u, v_0, t_0 + t) \in \mathcal{A}$ for any $u \succeq 0, t > 0$. (**\*1**)
[i.e. $\mathcal{A}$ is unbounded from above in $u$ and $t$]

Since sets $\mathcal{A}$ and $\mathcal{B}$ do not intersect and are convex, they can be separated by a hyperplane.

By the separating hyperplane theorem, there exists $(\tilde{\lambda}, \tilde{\nu}, \mu) \neq 0$ and $\alpha$ such that
$(u, v, t) \in \mathcal{A} \Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \geq \alpha$ (**\*2**)
$(u, v, t) \in \mathcal{B} \Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \leq \alpha$ (**\*3**)

From (**\*2**) we conclude that $\tilde{\lambda} \succeq 0$ and $\mu \geq 0$.
(Otherwise $\tilde{\lambda}^T u + \mu t$ can be arbitrarily small by (**\*1**) contradicting (**\*2**))

Slide 47
Carnegie Mellon University

### Visual Description
Text-only slide applying the separating hyperplane theorem to sets $\mathcal{A}$ and $\mathcal{B}$. Equations are labeled with (*1), (*2), and (*3).

---
## Page 48
### Content
# Proof of Slater’s Theorem

$(u, v, t) \in \mathcal{A} \Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \geq \alpha$ (**\*2**)
$(u, v, t) \in \mathcal{B} \Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \leq \alpha$ (**\*3**)
$\tilde{\lambda} \succeq 0$ and $\mu \geq 0$

Since $\mathcal{B} = \{ (0, 0, s) \in \mathbf{R}^m \times \mathbf{R}^p \times \mathbf{R} \mid s < p^* \}$, the condition (**\*3**) means that $\mu t \leq \alpha$ for all $t < p^*$.

Therefore, we also have that $\mu p^* \leq \alpha$. (**\*4**)

Slide 48
Carnegie Mellon University

### Visual Description
Text-only slide continuing the proof, specifically deriving an inequality involving the optimal value $p^*$ and the hyperplane parameter $\alpha$. Equations are labeled with (*2), (*3), and (*4).

---
## Page 49
### Content
# Proof of Slater’s Theorem

$$
\begin{aligned}
(u, v, t) \in \mathcal{A} &\Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \geq \alpha \quad (*2) \\
(u, v, t) \in \mathcal{B} &\Rightarrow \tilde{\lambda}^T u + \tilde{\nu}^T v + \mu t \leq \alpha \quad (*3) \\
\tilde{\lambda} \succeq 0 \text{ and } \mu \geq 0 &\quad \mu p^\star \leq \alpha. \quad (*4)
\end{aligned}
$$

$\mathcal{A} = \{(u, v, t) \mid \exists x \in \mathcal{D}, f_i(x) \leq u_i, i = 1, \dots, m, Ax - b = v, f_0(x) \leq t\}$

We can see that if $x \in \mathcal{D}$, then $(\underbrace{f_1(x), \dots, f_m(x)}_{u'}, \underbrace{Ax - b}_{v'}, \underbrace{f_0(x)}_{t'}) \in \mathcal{A}$

Together with $(*2)$ and $(*4)$ we conclude that
$$
\begin{aligned}
&\tilde{\lambda}^T u' + \tilde{\nu}^T v' + \mu t' \geq \alpha \\
\Rightarrow &\sum_{i=1}^m \tilde{\lambda}_i f_i(x) + \tilde{\nu}^T (Ax - b) + \mu f_0(x) \geq \alpha \geq \mu p^\star \quad \forall x \in \mathcal{D}
\end{aligned}
$$

### Visual Description
The slide contains mathematical formulas detailing the proof of Slater's Theorem. It defines sets $\mathcal{A}$ and $\mathcal{B}$ and uses separating hyperplane properties. Braces are used to group components of a vector into $u'$, $v'$, and $t'$.

---

## Page 50
### Content
# Proof of Slater’s Theorem

We have proved that $\sum_{i=1}^m \tilde{\lambda}_i f_i(x) + \tilde{\nu}^T (Ax - b) + \mu f_0(x) \geq \alpha \geq \mu p^\star, \quad \forall x \in \mathcal{D}$

Assume that $\mu > 0$. In that case we can divide this by $\mu$ to obtain
$$
\begin{aligned}
&\sum_{i=1}^m \frac{\tilde{\lambda}_i}{\mu} f_i(x) + \frac{1}{\mu} \tilde{\nu}^T (Ax - b) + f_0(x) \geq p^\star, \quad \forall x \in \mathcal{D} \\
&L\left(x, \frac{\tilde{\lambda}}{\mu}, \frac{\tilde{\nu}}{\mu}\right) \geq p^\star, \quad \forall x \in \mathcal{D} \\
\Rightarrow &g\left(\frac{\tilde{\lambda}}{\mu}, \frac{\tilde{\nu}}{\mu}\right) := \inf_{x \in \mathcal{D}} L\left(x, \frac{\tilde{\lambda}}{\mu}, \frac{\tilde{\nu}}{\mu}\right) \geq p^\star, \quad \text{Let } \lambda := \frac{\tilde{\lambda}}{\mu}, \nu := \frac{\tilde{\nu}}{\mu}.
\end{aligned}
$$

By weak duality we have $g(\lambda, \nu) \leq p^\star$, so in fact $g(\lambda, \nu) = p^\star$

This shows that strong duality holds, and that the dual optimum is attained, when $\mu > 0$.

### Visual Description
Text-only slide.

---

## Page 51
### Content
# Proof of Slater’s Theorem

$$
\sum_{i=1}^m \tilde{\lambda}_i f_i(x) + \tilde{\nu}^T (Ax - b) + \mu f_0(x) \geq \alpha \geq \mu p^\star, \quad \forall x \in \mathcal{D} \quad (*5)
$$

Now consider the case $\mu = 0$.
We will prove that $\mu \neq 0$, otherwise if $\mu = 0$ we would get a contradiction.
From $(*5)$, we conclude that for all $x \in \mathcal{D}$,
$$
\sum_{i=1}^m \tilde{\lambda}_i f_i(x) + \tilde{\nu}^T (Ax - b) \geq 0. \quad \forall x \in \mathcal{D} \quad (*6)
$$

Applying this to the point $\tilde{x}$ that satisfies the Slater condition, we have
$$
\sum_{i=1}^m \tilde{\lambda}_i f_i(\tilde{x}) \geq 0
$$

Since $\tilde{\lambda}_i \geq 0$ and by the Slater's condition $f_i(\tilde{x}) < 0$, we conclude that $\tilde{\lambda} = 0$.

From $(*6)$, we have that $\tilde{\nu}^T (Ax - b) \geq 0, \quad \forall x \in \mathcal{D}$

### Visual Description
Text-only slide.

---

## Page 52
### Content
# Proof of Slater’s Theorem

$$
\tilde{\nu}^T (Ax - b) \geq 0, \quad \forall x \in \mathcal{D} \quad (*7)
$$

From $(\tilde{\lambda}, \tilde{\nu}, \mu) \neq 0$ and $\tilde{\lambda} = 0, \mu = 0$, we conclude that $\tilde{\nu} \neq 0$.

However, $\tilde{x}$ satisfies $\tilde{\nu}^T (A\tilde{x} - b) = 0$.

Since $\tilde{x} \in \text{int } \mathcal{D}$, there must be points in $\mathcal{D}$ with $\tilde{\nu}^T (Ax - b) < 0$ unless $A^T \tilde{\nu} = 0$.

This contradicts our assumption that rank $A = p$.

So we proved that when Slater's conditions hold, then $\mu > 0$.

We also proved that when $\mu > 0$, then strong duality holds. ■

### Visual Description
Text-only slide. The proof concludes with a black square (QED symbol).

---

## Page 53
### Content
# Geometric Intuition

The set $\mathcal{A}$ is shown shaded, and the set $\mathcal{B}$ is the thick vertical line segment, not including the point $(0, p^\star)$, shown as a small open circle.

The two sets are convex and do not intersect, so they can be separated by a hyperplane.

Slater's constraint qualification guarantees that any separating hyperplane must be nonvertical (slope $\mu > 0$), and it must pass to the left of the point $(\tilde{u}, \tilde{t}) = (f_1(\tilde{x}), f_0(\tilde{x}))$, where $\tilde{x}$ is strictly feasible [i.e. $f_1(\tilde{x}) = \tilde{u} < 0$].

Credit: Boyd and Vandenberghe

### Visual Description
The slide features a 2D coordinate system with axes $u$ (horizontal) and $t, f_0$ (vertical). 
- A shaded convex region $\mathcal{A}$ is located in the upper right quadrant, extending slightly into the upper left.
- A thick vertical line segment $\mathcal{B}$ lies on the vertical axis below the point $(0, p^\star)$.
- The point $(0, p^\star)$ is marked with an open circle on the vertical axis.
- A point $(\tilde{u}, \tilde{t})$ is marked inside the shaded region $\mathcal{A}$ to the left of the vertical axis (where $u < 0$).
- A straight line (separating hyperplane) passes through $(0, p^\star)$ and supports the set $\mathcal{A}$ from below.
- Labels $f_1$ and $u$ are on the horizontal axis; $t, f_0$ are on the vertical axis.
