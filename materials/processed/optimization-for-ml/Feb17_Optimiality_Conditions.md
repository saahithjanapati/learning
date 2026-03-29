# Feb17_Optimiality_Conditions

Source: `materials/archive/Feb17_Optimiality_Conditions.pdf`
Duplicate equivalents: `Feb17_Optimiality_Conditions.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `strict full-PDF single-call conversion`
Finish reason: `STOP`
Pages: 27
## Page 1
### Content
Optimization for Machine Learning

Optimality Conditions

Slide 1
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 2
### Content
Optimality Conditions

Slide 2
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 3
### Content
Optimality Conditions

We are interested in solving a problem:
$$\min_{x \in C} f(x)$$

What can we say about a solution $x^*$ to this problem?

Slide 3
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 4
### Content
Optimality Conditions for Unconstrained Optimization

Slide 4
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 5
### Content
Optimality Conditions Unconstrained case

Suppose first that we don't have any constraints, e.g. $C = \mathbb{R}^d$, and that $\text{dom}(f) = \mathbb{R}^d$.

Then our characterization should be familiar to us from usual calculus classes.

**Theorem**
$x^*$ is optimal on $\text{dom}(f) \iff 0 \in \partial f(x^*)$.
[$0$ is in the subdifferential of $f(x^*)$]

**Proof:** Next slide

**Remark**
This theorem does not require convexity, i.e. for any function $f$ the condition that $0 \in \partial f(x^*)$ is necessary and sufficient for $x^*$ to be a global minimizer on $\text{dom}(f)$.

Slide 5
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 6
### Content
Optimality Conditions Unconstrained case

**Theorem**
$x^*$ is optimal in $\mathbb{R}^d \iff 0 \in \partial f(x^*)$.

**Proof**
"$\Leftarrow$"
From the definition of subdifferential: $f$ doesn't need to be convex!
$\forall y \in \text{dom}(f) \ f(y) \ge f(x^*) + \langle g_{x^*}, y - x^* \rangle$ for any $g_{x^*} \in \partial f(x^*)$.
$0 \in \partial f(x^*) \Rightarrow f(y) \ge f(x^*) + \langle 0, y - x^* \rangle \quad \forall y \in \text{dom}(f)$
$\Rightarrow f(y) \ge f(x^*) \quad \forall y \in \text{dom}(f) \ \blacksquare$

"$\Rightarrow$"
If $x^*$ is optimal $\Rightarrow f(y) \ge f(x^*) + \langle 0, y - x^* \rangle \quad \forall y \in \text{dom}(f)$
$\Rightarrow 0 \in \partial f(x^*)$ [by the definition of subdifferential] $\blacksquare$

Slide 6
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 7
### Content
Optimality Conditions for Constrained Optimization

$$\min_{x \in C} f(x)$$

Slide 7
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 8
### Content
Recall: Punchline in Convex Optimization

$$N_C(x) \doteq \{g : g^T(y - x) \le 0, \text{ for all } y \in C\}$$

**Punchline**
Let $f : \mathbb{R}^n \to \mathbb{R}$ be convex. Let $C$ be convex.
In a convex optimization problem,
$$\min_{x \in C} f(x)$$
a point $x$ is optimal, if and only if the negative gradient of the point belongs to $N_C(x)$.

**Finally, we are ready to prove this!**

Slide 8
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 9
### Content
Constrained, Differentiable Case

**Theorem**
Let $f$ be convex, differentiable.
$C \subseteq \text{dom}(f)$. [$C$ doesn't need to be convex here.]
If $\nabla f(x^*)^T(y - x^*) \ge 0$ for all $y \in C \Rightarrow x^* \in C$ is optimal

**Remark**
$\nabla f(x^*)^T(y - x^*) \ge 0 \ \forall y \in C \iff -\nabla f(x^*) \in N_C(x^*)$

**Proof of the Theorem:**
Assume $\nabla f(x^*)^T(y - x^*) \ge 0$ for all $y \in C$
Since $f$ is convex on $C \Rightarrow f(y) \ge f(x^*) + \underbrace{\nabla f(x^*)^T(y - x^*)}_{\ge 0 \text{ by our assumption}}$, for all $y \in C$
Therefore, $f(y) \ge f(x^*)$ for all $y \in C \ \blacksquare$

Slide 9
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 10
### Content
Constrained, Differentiable Case

**Theorem [Reverse]**
Let $f$ be convex. Let $x^* \in C$ be a given point.
Assume the line segments $[y, x^*] \subset C$ for all $y \in C$ (e.g. $C$ is convex)
$x^* \in C$ is optimal $\Rightarrow \nabla f(x^*)^T(y - x^*) \ge 0$ for all $y \in C$

**Proof [We will use proof by contradiction]**
If $\nabla f(x^*)^T(y - x^*) < 0$, then $f$ is locally decreasing on the line from $x^*$ towards $y$
To see this, consider $h(t) = f(x^* + t(y - x^*))$.
$h(0) = f(x^*), \ h(1) = f(y)$
$h'(t) = f'(x^* + t(y - x^*))^T(y - x^*)$
$h'(0) = f'(x^*)^T(y - x^*) < 0$ by our assumptions
$\Rightarrow f$ is locally decreasing on the line from $x^*$ towards $y$,
therefore $x^*$ cannot be optimal. $\blacksquare$

Slide 10
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 11
### Content
Constrained Case without Differentiability

**Theorem**
Let $f$ be convex on $C$. Let $C$ be convex.
A feasible point $x^*$ is optimal in $C \iff 0 \in \partial f(x^*) + N_C(x^*)$
Here we are adding two sets, i.e. $A + B = \{y : y = u + v, u \in A, v \in B\}$.

**Proof**
Let $x^* = \min_{x \in C} f(x)$
$x^* = \min_{x \in \mathbb{R}^d} \underbrace{(f(x) + I_C(x))}_{g(x)}$ where $I_C(x) = \begin{cases} 0 & x \in C \\ \infty & x \notin C \end{cases}$
$x^*$ is optimal of $g$ in $\mathbb{R}^d \iff 0 \in \partial g(x^*)$.
$\iff 0 \in \partial [f(\cdot) + I_C(\cdot)](x^*)$.
$\iff 0 \in \partial f(x^*) + N_C(x^*). \ \blacksquare$

Here we used the fact that if $x \in C$, then $\partial I_C(x) = N_C(x)$.

Slide 11
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 12
### Content
Constrained Case without Differentiability

**Reminder** $N_C(x) \doteq \{v : v^T(y - x) \le 0, \text{ for all } y \in C\}$

**Theorem**
Let $f$ be convex on $C$. Let $C$ be convex.
A feasible point $x^*$ is optimal in $C \iff 0 \in \partial f(x^*) + N_C(x^*)$
Here we are adding two sets, i.e. $A + B = \{y : y = u + v, u \in A, v \in B\}$.

**Note**
The "$\Leftarrow$" direction, can be seen directly from the definitions too:
Assume $0 \in \partial f(x^*) + N_C(x^*)$
this means $\exists u \in \partial f(x^*)$ and $\exists v \in N_C(x^*)$ such that $u + v = 0$.
By the definition of $v$: $v^T(y - x^*) \le 0 \quad \forall y \in C$
By the definition of $u$: $f(y) \ge f(x^*) + u^T(y - x^*) \quad \forall y \in C$
$= f(x^*) - v^T(y - x^*) \ge f(x^*) \Rightarrow f(y) \ge f(x^*) \quad \forall y \in C \ \blacksquare$

**Punchline is proved both for gradient and subgradient!**

Slide 12
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 13
### Content
Intuition

$-\nabla f(x^*) \in N_C(x^*) \iff x^*$ is optimal.

If $-\nabla f(x^*)$ has a 'positive component' along the tangent of the boundary, then $x^*$ cannot be optimal.

Slide 13
Carnegie Mellon University

### Visual Description
A diagram illustrates a convex set $C$ with its boundary. Three points $x_1, x_2, x_3$ are marked on the boundary. For each point, the negative gradient vector $-\nabla f(x_i)$ and the normal cone $N_C(x_i)$ are shown. At $x_1$, the normal cone is a shaded region at a corner. At $x_2$ and $x_3$, the normal cone is represented by dashed arrows perpendicular to the boundary. In all three cases, the negative gradient vector lies outside the normal cone, and a note states: "The $x_i$ points are not optimal in this example!"

---

## Page 14
### Content
Examples

Slide 14
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 15
### Content
Optimality Conditions for Projection

For some convex set $K$ and observation $y$, we would like to solve the constrained minimization problem:
$$\min_{x \in K} \frac{1}{2} \|y - x\|_2^2$$

Denote the solution $x^*$ to this problem by $P_K(y)$ (projection of $y$ to $K$)

Slide 15
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 16
### Content
Optimality Conditions for Projection

**Lemma**
Let $x^* = P_K(y)$ be a solution to $\min_{x \in K} \frac{1}{2} \|y - x\|_2^2$
Let set $K$ be convex.
We have that $(y - x^*)^T(k - x^*) \le 0 \ \forall k \in K$

**Proof [HW-Appendix]**

Slide 16
Carnegie Mellon University

### Visual Description
A diagram shows a shaded oval representing a convex set $K$. A point $y$ is located outside the set. Its projection $x^*$ is on the boundary of $K$. A vector $y - x^*$ points from $x^*$ to $y$. Another point $k$ is shown inside $K$, with a vector $k - x^*$ pointing from $x^*$ to $k$. The angle between these two vectors is obtuse, visually supporting the dot product condition in the lemma.

---

## Page 17
### Content
Optimality Conditions for Projection

Let $x^* = P_K(y)$ be a solution to $\min_{x \in K} \frac{1}{2} \|y - x\|^2$

**Theorem**
Let set $K$ be convex.
Projection onto a convex set is a contraction, i.e. for any pair of points $a, b$,
$$\|P_K(a) - P_K(b)\| \le \|a - b\|$$

**Proof [HW-Appendix]**

Slide 17
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 18
### Content
Lasso and Soft Thresholding

Slide 18
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 19
### Content
Soft-thresholding

The LASSO problem is another important problem with non-differentiable objective function.

Lasso problem can be parametrized as
$$x^* = \arg \min_{x \in \mathbb{R}^d} \frac{1}{2} \|y - Ax\|_2^2 + \lambda \|x\|_1$$
where $\lambda \ge 0$.

A special case with $A = I$:
$$x^* = \arg \min_{x \in \mathbb{R}^n} \frac{1}{2} \|y - x\|_2^2 + \lambda \|x\|_1$$

We will use soft-thresholding to find the optimal solutions, $x^*$

Slide 19
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 20
### Content
Soft-thresholding

$$x^* = \arg \min_{x \in \mathbb{R}^n} \frac{1}{2} \|y - x\|_2^2 + \lambda \|x\|_1$$

Now, by our optimality conditions, we know that any solution must have a zero subgradient, i.e. it must be the case that,
$$0 \in -(y - x^*) + \lambda \partial \|x^*\|_1$$

We calculated before that for $x \in \mathbb{R}^d$,
$$\partial \|x\|_1 = \text{sign}(x) = [\text{sign}(x_1), \dots, \text{sign}(x_d)]$$
where $\text{sign}(x_i) = \begin{cases} 1 & \text{if } x_i > 0 \\ [-1, 1] & \text{if } x_i = 0 \\ -1 & \text{if } x_i < 0 \end{cases}$

Therefore, $0 \in -(y - x^*) + \lambda \text{sign}(x^*)$

Slide 20
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 21
### Content
Soft-thresholding

$$0 \in -(y - x^*) + \lambda \text{sign}(x^*)$$
$$(y - x^*) \in \lambda \text{sign}(x^*)$$

Coordinatewise:
$$(y_i - x_i^*) \in \lambda \text{sign}(x_i^*) \quad \text{where } \text{sign}(x_i) = \begin{cases} 1 & \text{if } x_i > 0 \\ [-1, 1] & \text{if } x_i = 0 \\ -1 & \text{if } x_i < 0 \end{cases}$$

$$(y_i - x_i^*) \in \begin{cases} \lambda & \text{if } x_i^* > 0 \\ [-\lambda, \lambda] & \text{if } x_i^* = 0 \\ -\lambda & \text{if } x_i^* < 0 \end{cases}$$

$$\Rightarrow x_i^* \in \begin{cases} y_i - \lambda & \text{if } x_i^* > 0 \\ 0 & \text{if } y_i \in [-\lambda, \lambda] \\ y_i + \lambda & \text{if } x_i^* < 0 \end{cases} \Rightarrow x_i^* \in \begin{cases} y_i - \lambda & \text{if } y_i - \lambda > 0 \\ 0 & \text{if } y_i \in [-\lambda, \lambda] \\ y_i + \lambda & \text{if } y_i + \lambda < 0 \end{cases}$$

Slide 21
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 22
### Content
Soft-thresholding

$$x_i^* \in \begin{cases} y_i - \lambda & \text{if } y_i - \lambda > 0 \\ 0 & \text{if } y_i \in [-\lambda, \lambda] \\ y_i + \lambda & \text{if } y_i + \lambda < 0 \end{cases}$$

Let $S_\lambda$ be the soft-thresholding operator,
$$[S_\lambda(y)]_i = \begin{cases} y_i - \lambda & \text{if } y_i > \lambda \\ 0 & \text{if } -\lambda \le y_i \le \lambda \\ y_i + \lambda & \text{if } y_i < -\lambda \end{cases}$$

We have proved the solution of
$$x^* = \arg \min_{x \in \mathbb{R}^n} \frac{1}{2} \|y - x\|_2^2 + \lambda \|x\|_1$$
is simply $x^* = S_\lambda(y)$

Slide 22
Carnegie Mellon University

### Visual Description
A graph titled "Soft-thresholding in one variable" shows the function $S_\lambda(y)$ plotted against $y$. The function is zero for $y$ between $-0.5$ and $0.5$ (suggesting $\lambda = 0.5$). Outside this range, it follows a linear path with a slope of 1, shifted by $\lambda$. A dashed diagonal line $y=x$ is included for comparison.

---

## Page 23
### Content
LASSO

Slide 23
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 24
### Content
The Lasso Program

The LASSO program is another important problem with the non-differentiable objective function.

Lasso problem can be parametrized as
$$x^* = \arg \min_{x \in \mathbb{R}^d} \frac{1}{2} \|b - Ax\|_2^2 + \lambda \|x\|_1$$
where $\lambda \ge 0$.

Now, by our optimality conditions, we know that any solution must have a zero subgradient, i.e. it must be the case that,
$$0 \in \partial \frac{1}{2} \|b - Ax^*\|_2^2 + \partial \lambda \|x^*\|_1$$
$$0 \in -A^T(b - Ax^*) + \lambda \text{sign}(x^*)$$

Slide 24
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 25
### Content
The Lasso Program

$$0 \in -A^T(b - Ax^*) + \lambda \text{sign}(x^*)$$

This implies that for each coordinate $i$, we have
$$A_i^T(b - Ax^*) \in \lambda \text{sign}(x_i^*) \quad [A_i \text{ is the } i^{th} \text{ column of } A.]$$

$$A_i^T(b - Ax^*) \in \begin{cases} \lambda & \text{if } x_i^* > 0 \\ [-\lambda, \lambda] & \text{if } x_i^* = 0 \\ -\lambda & \text{if } x_i^* < 0 \end{cases}$$

This doesn't give us the optimal solution $x^*$, but at least this can be used to check if a candidate solution is optimal.

We will continue from here later.

Slide 25
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 26
### Content
References

* S. Boyd, Lecture Notes for EE 364B, Stanford University, Spring 2010-2011
* R. T. Rockafellar (1970), "Convex analysis", Chapters 23–25
* L. Vandenberghe, Lecture Notes for EE 236C, UCLA, Spring 2011-2012

Slide 26
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 27
### Content
Credits

Some of the contents have been taken from:
* Ryan Tibshirani
* Sivaraman Balakrishnan

Slide 27
Carnegie Mellon University

### Visual Description
Text-only slide.
