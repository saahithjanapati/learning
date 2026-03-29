# Feb17+24_proximal_gd

Source: `materials/archive/Feb17+24_proximal_gd.pdf`
Duplicate equivalents: `Feb17+24_proximal_gd.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 60

## Page 1
### Content
# Optimization for Machine Learning
## Proximal Gradient Descent

Convex Optimization Slide 1
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 2
### Content
# Outline
* Proximal (= Generalized) Gradient Descent
* Iterative Soft-Thresholding Algorithm (ISTA)
* Convergence analysis

Convex Optimization Slide 2
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 3
### Content
# Recall Subgradient Method
We want to solve
$$\min_{x \in \mathbb{R}^n} f(x),$$
for $f$ convex, not necessarily differentiable

**Subgradient method:** choose initial $x^{(0)} \in \mathbb{R}^n$, and repeat
$$x^{(k)} = x^{(k-1)} - t_k \cdot g^{(k-1)}, \quad k = 1, 2, 3, \dots,$$
where $g^{(k-1)}$ is any subgradient of $f$ at $x^{(k-1)}$

If $f$ is Lipschitz on a bounded set containing its minimizer, then subgradient method has convergence rate $O(1/\sqrt{k})$

Downside: **can be very slow!**

Convex Optimization Slide 3
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 4
### Content
# Improving on the Subgradient Method
So we cannot generically do better than the subgradient method, unless we go beyond nonsmooth first-order methods

Instead of trying to be better across the board, we will focus on minimizing **composite functions** of the form
$$f(x) = g(x) + h(x)$$
where $g$ is "nice" convex and differentiable, $h$ is convex and nonsmooth but "simple"

We will see that for a lot of problems (i.e., functions $h$), we can recover $O(1/k)$ rate of gradient descent with a simple algorithm, called ISTA.

Convex Optimization Slide 4
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 5
### Content
# Decomposable functions
Suppose $f(x) = g(x) + h(x)$
* $g$ is convex, differentiable
* $h$ is convex, not necessarily differentiable

If $f$ were differentiable, then gradient descent update would be:
$$x^+ = x - \eta \cdot \nabla f(x)$$

**Recall GD Motivation:**
minimize quadratic approximation to $f$ around $x$, replace $\nabla^2 f(x)$ by $\frac{1}{\eta} I$,
$$x^+ = \text{argmin}_z \underbrace{f(x) + \nabla f(x)^T (z - x) + \frac{1}{2\eta} \|z - x\|_2^2}_{\hat{f}_\eta(z)}$$
$\nabla f(x) + \frac{1}{\eta} (z - x) = 0$
$z = x - \eta \nabla f(x)$

Convex Optimization Slide 5
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 6
### Content
# Quadratic Approximation
In our case $f$ is not differentiable. $f = g + h$, and $g$ is differentiable.
**Idea:** make a quadratic approximation to $g$, and leave non-differentiable $h$ alone.
I.e., update
$$x^+ = \text{argmin}_z \hat{g}_\eta(z) + h(z)$$
$$= \text{argmin}_z g(x) + \nabla g(x)^T (z - x) + \frac{1}{2\eta} \|z - x\|_2^2 + h(z)$$
$$= \text{argmin}_z \nabla g(x)^T (z - x) + \frac{1}{2\eta} \|z - x\|_2^2 + h(z)$$
$$= \text{argmin}_z \frac{1}{2\eta} \|(z - x) + \eta \nabla g(x)\|_2^2 + h(z)$$
$$= \text{argmin}_z \frac{1}{2\eta} \|z - (x - \eta \nabla g(x))\|_2^2 + h(z)$$

Convex Optimization Slide 6
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 7
### Content
# Quadratic Approximation
$$x^+ = \text{argmin}_z \frac{1}{2\eta} \|z - (x - \eta \nabla g(x))\|_2^2 + h(z)$$

**Intuition:**
* $\frac{1}{2\eta} \|z - (x - \eta \nabla g(x))\|_2^2$: $z$ should be close to the gradient update for $g$
* $h(z)$: $z$ should also make $h(z)$ small

**Definition [Proximal operator]:**
$$\text{prox}_{\eta,h}(\tilde{x}) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - \tilde{x}\|_2^2 + h(z) \in \mathbb{R}^d$$

Therefore,
$$x^+ = \text{prox}_{\eta,h}(x - \eta \nabla g(x))$$

Convex Optimization Slide 7
Carnegie Mellon University
### Visual Description
Text-only slide.

---
## Page 8
### Content
# Generalized (=Proximal) Gradient Descent
$$\text{prox}_{\eta,h}(\tilde{x}) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - \tilde{x}\|_2^2 + h(z)$$
$$x^+ = \text{prox}_{\eta,h}(x - \eta \nabla g(x))$$

**Generalized gradient descent:** choose initial $x^{(0)}$, then repeat
$$x^{(k)} = \text{prox}_{\eta_k,h}(x^{(k-1)} - \eta_k \nabla g(x^{(k-1)})), \quad k = 1, 2, 3, \dots$$

To make the update step look like GD, we can write it as
$$x^{(k)} = x^{(k-1)} - \eta_k \cdot G_{\eta_k}(x^{(k-1)})$$
where $G_\eta$ is the "generalized gradient" of $f$, $G_\eta(x) \doteq \frac{x - \text{prox}_{\eta,h}(x - \eta \nabla g(x))}{\eta}$

Convex Optimization Slide 8
Carnegie Mellon University
### Visual Description
Text-only slide.
## Page 9
### Content
**Summary: Generalized (=Proximal) Gradient Descent**

**So far, this is what we discussed:**

**Goal:** $\min_{x \in \mathbb{R}^d} g(x) + h(x)$

$\text{prox}_{\eta,h}(\tilde{x}) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - \tilde{x}\|_2^2 + h(z)$
$x^+ = \text{prox}_{\eta,h}(x - \eta \nabla g(x))$

The Proximal GD algorithm alternates the following steps:

1. We compute $y^{t+1} = x^t - \eta_t \nabla g(x_t)$.
2. We then compute our next iterate by solving:
   $$x^{t+1} = \text{prox}_{\eta_t,h}(y^{t+1})$$
   $$= \text{arg min}_{z \in \mathbb{R}^d} \left[ h(z) + \frac{1}{2\eta_t} \|z - y^{t+1}\|_2^2 \right]$$

### Visual Description
Text and mathematical formulas summarizing the Proximal Gradient Descent algorithm steps and definitions.

---

## Page 10
### Content
**What good did this do?**

$$\text{prox}_{\eta,h}(\tilde{x}) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - \tilde{x}\|_2^2 + h(z)$$

Generalized gradient descent: choose initial $x^{(0)}$, then repeat
$$x^{(k)} = \text{prox}_{\eta_k,h}(x^{(k-1)} - \eta_k \nabla g(x^{(k-1)})), \quad k = 1, 2, 3, \dots$$

You have a right to be suspicious ... looks like we just swapped one minimization problem for another

Key point is that $\text{prox}_{\eta,h}(\cdot)$ can be computed analytically for a lot of important functions $h$.

**Remarks:**
* $\text{prox}_{\eta,h}$ doesn't depend on $g$ at all
* $g$ can be very complicated as long as we can compute its gradient

### Visual Description
Text-only slide.

---

## Page 11
### Content
**The Proximal Operator**

For a convex function $h$, the proximal operator is defined to be:
$$\text{prox}_{\eta,h}(v) \doteq \text{argmin}_{z \in \mathbb{R}^d} \left( \frac{1}{2\eta} \|z - v\|_2^2 + h(z) \right)$$

One can interpret this as some type of **generalized projection** operation:

**Lemma:**
If $h(z) = \mathbb{I}_C(z)$ is a convex indicator function,
$$\mathbb{I}_C(z) = \begin{cases} 0 & \text{if } z \in C \\ \infty & \text{if } z \notin C \end{cases} \quad \text{then } \text{prox}_{\eta,h}(v) \text{ projects } v \text{ onto } C.$$

**Proof:**
$$\text{prox}_{\eta,h}(v) \doteq \text{argmin}_{z \in \mathbb{R}^d} \left( \frac{1}{2\eta} \|z - v\|_2^2 + \mathbb{I}_C(z) \right) = \text{argmin}_{z \in C} \left( \frac{1}{2\eta} \|z - v\|_2^2 \right)$$
$$= \text{argmin}_{z \in C} (\|z - v\|_2^2) \quad \blacksquare$$

### Visual Description
Text and mathematical formulas defining the proximal operator and proving its relationship to projection via indicator functions.

---

## Page 12
### Content
# Iterative Soft-Thresholding Algorithm (ISTA)

### Visual Description
Title slide with text only.

---

## Page 13
### Content
**The Soft-thresholding Operator**

$$\text{prox}_{\eta,h}(x) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - x\|_2^2 + h(z)$$

Compare this with the soft-thresholding operator:
$$S_\lambda(x) \doteq \text{argmin}_{z \in \mathbb{R}^n} \frac{1}{2} \|x - z\|_2^2 + \lambda \|z\|_1$$

**Lemma [closed form solution]:**
This minimization problem has a closed-form solution:
$$[S_\lambda(x)]_i = \begin{cases} x_i - \lambda & \text{if } x_i > \lambda \\ 0 & \text{if } -\lambda \le x_i \le \lambda \\ x_i + \lambda & \text{if } x_i < -\lambda \end{cases}$$

**Proof:** [We have proved this before]

### Visual Description
Text and mathematical formulas defining the soft-thresholding operator and its closed-form solution.

---

## Page 14
### Content
**The Prox Function for Lasso**

Consider the Lasso criterion
$$f(x) = \underbrace{\frac{1}{2} \|Ax - b\|_2^2}_{g(x)} + \underbrace{\lambda \|x\|_1}_{h(x)}$$

The prox function is now
$$\text{prox}_{\eta}(x) = \text{argmin}_{z \in \mathbb{R}^n} \frac{1}{2\eta} \|x - z\|_2^2 + \lambda \|z\|_1$$
$$= \text{argmin}_{z \in \mathbb{R}^n} \frac{1}{2} \|x - z\|_2^2 + \eta \lambda \|z\|_1$$
$$= S_{\eta \lambda}(x)$$

where $S_\lambda(x)$ is the soft-thresholding operator,
$$[S_\lambda(x)]_i = \begin{cases} x_i - \lambda & \text{if } x_i > \lambda \\ 0 & \text{if } -\lambda \le x_i \le \lambda \\ x_i + \lambda & \text{if } x_i < -\lambda \end{cases}$$

### Visual Description
Text and mathematical formulas showing how the proximal operator for the Lasso problem relates to the soft-thresholding operator.

---

## Page 15
### Content
**The Iterative Soft-Thresholding Algorithm (ISTA)**

$$f(x) = \underbrace{\frac{1}{2} \|Ax - b\|_2^2}_{g(x)} + \underbrace{\lambda \|x\|_1}_{h(x)}$$

We can see that $\nabla g(x) = A^T(Ax - b)$.

**Proximal GD algorithm:**

1. We compute $y^{t+1} = x^t - \eta_t \nabla g(x_t) = x^t - \eta_t A^T(Ax^t - b)$.
2. We then compute our next iterate by solving:
   $$x^{t+1} = \text{prox}_{\eta_t,h}(y^{t+1})$$

### Visual Description
Text and mathematical formulas detailing the first steps of applying Proximal Gradient Descent to the Lasso problem.

---

## Page 16
### Content
**The Iterative Soft-Thresholding Algorithm (ISTA)**

$$x^{t+1} = \text{prox}_{\eta_t,h}(y^{t+1})$$
$$= \text{arg min}_{z \in \mathbb{R}^d} \left[ h(z) + \frac{1}{2\eta_t} \|z - y^{t+1}\|_2^2 \right]$$
$$= \text{arg min}_{z \in \mathbb{R}^d} \left[ \lambda \|z\|_1 + \frac{1}{2\eta_t} \|z - y^{t+1}\|_2^2 \right]$$
$$= S_{\lambda \eta_t}(y^{t+1})$$
$$= S_{\lambda \eta_t}(x^t - \eta_t A^T(Ax^t - b))$$

### Visual Description
Text and mathematical formulas showing the final derivation of the ISTA update rule.

---
## Page 17
### Content
# ISTA

$$x^{t+1} = S_{\lambda\eta_t}(x^t - \eta_t A^T(Ax^t - b))$$

where $[S_\lambda(x)]_i = \begin{cases} x_i - \lambda & \text{if } x_i > \lambda \\ 0 & \text{if } -\lambda \le x_i \le \lambda \\ x_i + \lambda & \text{if } x_i < -\lambda \end{cases}$

The algorithm is called **ISTA (Iterative Soft-Thresholding Algorithm)**.

This algorithm is natural - we simply take a gradient step (ignoring the non-smooth part) and then soft-threshold the iterates (to account for the non-smooth part).

It should, however, be still mysterious as to why this algorithm works. (is the LASSO solution even a fixed point?).

### Visual Description
Text-only slide.

---
## Page 18
### Content
# ISTA

Generalized gradient (ISTA) vs subgradient descent:

![Plot comparing Subgradient method and Generalized gradient. The y-axis is f(k)-fstar on a log scale from 0.02 to 0.50. The x-axis is iterations from 0 to 1000. The Generalized gradient (red line) decreases much faster and more smoothly than the Subgradient method (black line).](https://placeholder_for_image)

### Visual Description
A line graph comparing the convergence of the "Subgradient method" (black line) and "Generalized gradient" (red line). The y-axis represents the error $f(k) - f^*$ on a logarithmic scale, and the x-axis represents the number of iterations. The red line (Generalized gradient) shows a significantly faster and more consistent decrease in error compared to the black line (Subgradient method).

---
## Page 19
### Content
# Motivating Proximal GD

### Visual Description
Text-only slide.

---
## Page 20
### Content
# Motivating Proximal GD

There are many different ways to motivate the proximal gradient descent algorithm:

### 1) Local Approximation Viewpoint
(We discussed this)
$$f(x) = g(x) + h(x)$$
* $g$ is convex, differentiable
* $h$ is convex, not necessarily differentiable

$$
\begin{aligned}
x^+ &= \underset{z}{\text{argmin}} \ \hat{g}_\eta(z) + h(z) \\
&= \underset{z}{\text{argmin}} \ g(x) + \nabla g(x)^T(z - x) + \frac{1}{2\eta} \|z - x\|_2^2 + h(z) \\
&= \underset{z}{\text{argmin}} \ \frac{1}{2\eta} \|z - (x - \eta \nabla g(x))\|_2^2 + h(z)
\end{aligned}
$$

### Visual Description
Text-only slide.

---
## Page 21
### Content
# Motivating Proximal GD

### 2) As a generalization of projected GD
In projected GD, we wanted to solve the constrained problem:
$$\min_{x \in C} f(x) \quad \text{where } f \text{ was a differentiable function.}$$

This can be rewritten as an unconstrained problem:
$$\min_{x \in \mathbb{R}^d} f(x) + \mathbb{I}_C(x)$$
which is exactly of the form "nice function" + non-smooth function.

Minimizing this with prox GD, will recover the projected GD algorithm (because the prox operation is simply a projection in this case).

<span style="color:red">So one can view prox GD as a natural extension of projected GD to other types of smooth, non-smooth sums.</span>

### Visual Description
Text-only slide.

---
## Page 22
### Content
# Motivating Proximal GD

### 3) Majorization-Minimization Algorithms
$$f(x) = g(x) + h(x)$$

As we discussed earlier, the prox GD algorithm:
$$
\begin{aligned}
x^+ &= \underset{z}{\text{argmin}} \ \hat{g}_\eta(z) + h(z) \\
&= \underset{z}{\text{argmin}} \ g(x) + \nabla g(x)^T(z - x) + \frac{1}{2\eta} \|z - x\|_2^2 + h(z)
\end{aligned}
$$

We also discussed, if we have a $\beta$-smooth function $g$ (not necessarily convex), and we choose $\eta_t \le 1/\beta$ then we know that,
$$g(z) \le \hat{g}_\eta(z) \doteq g(x^t) + \nabla g(x^t)^T(z - x^t) + \frac{1}{2\eta_t} \|z - x^t\|_2^2 \quad \forall z, x^t$$

### Visual Description
Text-only slide.

---
## Page 23
### Content
# Motivating Proximal GD

$$
\begin{aligned}
x^+ &= \underset{z}{\text{argmin}} \ \hat{g}_\eta(z) + h(z) \\
&= \underset{z}{\text{argmin}} \ g(x) + \nabla g(x)^T(z - x) + \frac{1}{2\eta} \|z - x\|_2^2 + h(z)
\end{aligned}
$$

$$g(z) \le \hat{g}_\eta(z) \doteq g(x^t) + \nabla g(x^t)^T(z - x^t) + \frac{1}{2\eta_t} \|z - x^t\|_2^2 \quad \forall z, x^t$$

Our prox GD algorithm is simply using a "nice" convex upper bound on $f$,
$$
\begin{aligned}
f(z) = g(z) + h(z) &\le \hat{g}_\eta(z) + h(z) \\
&= g(x^t) + \nabla g(x^t)^T(z - x^t) + \frac{1}{2\eta_t} \|z - x^t\|_2^2 + h(z)
\end{aligned}
$$
which is tight at $z = x^t$, and then minimizing this upper bound in $z$.

### Visual Description
Text-only slide.

---
## Page 24
### Content
# Motivating Proximal GD

$$f(z) = g(z) + h(z) \le g(x^t) + \nabla g(x^t)^T(z - x^t) + \frac{1}{2\eta_t} \|z - x^t\|_2^2 + h(z) = \hat{f}(z)$$
which is tight at $x = x^t$, and then minimizing this upper bound.

![A graph showing a red curve labeled f(z) and a blue curve labeled f_hat(z). The blue curve is a quadratic upper bound that touches the red curve at a point marked x^t.](https://placeholder_for_image)

Algorithms that do this are called MM algorithms and have lots of nice properties. The EM algorithm is a special case.

### Visual Description
A graph illustrating the Majorization-Minimization (MM) principle. A red curve represents the objective function $f(z)$. A blue curve represents the majorizing function $\hat{f}(z)$, which is a convex upper bound that is tangent to $f(z)$ at the current iterate $x^t$. The algorithm proceeds by minimizing this upper bound.
## Page 25
### Content
# Some Properties of the Proximal Operator

Convex Optimization Slide 25
Carnegie Mellon University
### Visual Description
Title slide with the text "Some Properties of the Proximal Operator" in blue centered on a white background.

---
## Page 26
### Content
# Special Cases [Summary]

Let $f(x) = g(x) + h(x)$
* $g$ is convex, differentiable
* $h$ is convex, not necessarily differentiable

$$
\begin{aligned}
x^+ &= \text{argmin}_z \hat{g}_\eta(z) + h(z) \\
&= \text{argmin}_z g(x) + \nabla g(x)^T(z - x) + \frac{1}{2\eta}\|z - x\|_2^2 + h(z) \\
&= \text{argmin}_z \frac{1}{2\eta}\|z - (x - \eta \nabla g(x))\|_2^2 + h(z)
\end{aligned}
$$

1) When $h = 0$, this is just regular GD.
2) When $h = \mathbb{I}_C$, this is just projected GD.

Convex Optimization Slide 26
Carnegie Mellon University
### Visual Description
Text-only slide containing mathematical derivations for proximal gradient descent updates and its special cases.

---
## Page 27
### Content
# The Prox Operation is Contraction

Recall, for a function $h$, $\text{prox}_{\eta,h}(x) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta}\|z - x\|_2^2 + h(z)$

**Lemma [The prox operation is a contraction]**
For a convex function $h$,
a) $\|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2^2 \le \langle x - y, \text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y) \rangle$
b) $\|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2 \le \|x - y\|$

**Proof "a" : [Appendix]**
**Proof "$a \Rightarrow b$" This part is easy from Cauchy-Schwarz**
$$
\begin{aligned}
\|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2^2 &\le \langle x - y, \text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y) \rangle \\
&\le \|x - y\|_2 \cdot \|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2 \\
\Rightarrow \|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2 &\le \|x - y\| \quad \blacksquare
\end{aligned}
$$

Convex Optimization Slide 27
Carnegie Mellon University
### Visual Description
Text-only slide presenting a lemma about the contraction property of the proximal operator and a partial proof.

---
## Page 28
### Content
# The Fix Point of the Proximal Operator

We'd like to analyze proximal GD, but its update form differs a bit from GD, so we introduce the below notation to make the proximal update rule more similar to GD.

**Definition [gradient mapping]:**
$$G_\eta(x) = \frac{1}{\eta}[x - \text{prox}_{\eta,h}(x - \eta \nabla g(x))]$$

It is an unintuitive quantity, but it allows us to write
$$x^{t+1} = x^t - \eta_t G_\eta(x^t) \quad \text{[Generalized Gradient Descent]}$$

**Note: [fixed point of the proximal operator]**
$$G_\eta(x) = 0 \Leftrightarrow x = \text{prox}_{\eta,h}(x - \eta \nabla g(x))$$
[i.e. $x$ is a fixed point of the prox operator]

Convex Optimization Slide 28
Carnegie Mellon University
### Visual Description
Text-only slide defining "gradient mapping" and showing how it relates proximal gradient descent to standard gradient descent.

---
## Page 29
### Content
# The Fix Point of the Proximal Operator

We want to minimize $f(x) = g(x) + h(x)$, where
* $g$ is convex, differentiable
* $h$ is convex, not necessarily differentiable

We already know: $G_\eta(x^*) = 0 \Leftrightarrow x^* = \text{prox}_{\eta,h}(x^* - \eta \nabla g(x^*))$
[i.e. $x^*$ is a fixed point of the prox operator]

**Theorem:**
$$G_\eta(x^*) = 0 \Leftrightarrow 0 \in \nabla g(x^*) + \partial h(x^*)$$

Significance of the theorem:
Generalized gradient $G_\eta(x^*) = 0 \Leftrightarrow x^*$ is an optimal solution of $f$
$\Leftrightarrow x^*$ is a fix point of the prox operator

**Proof: [Appendix]**

Convex Optimization Slide 29
Carnegie Mellon University
### Visual Description
Text-only slide stating a theorem that relates the zero of the generalized gradient to the optimality conditions of the objective function.

---
## Page 30
### Content
# The Main Descent Lemma for Proximal Descent

Convex Optimization Slide 30
Carnegie Mellon University
### Visual Description
Title slide with the text "The Main Descent Lemma for Proximal Descent" in blue centered on a white background.

---
## Page 31
### Content
# Main Descent Lemma for Proximal Descent

**Goal:** analyze the prox algorithm when $g$ is convex, $\beta$-smooth, and $h$ is convex.

The main technical hurdle will be to prove a descent lemma which works when we replace gradients by generalized gradients.

**Lemma [Descent Lemma for Proximal Descent]:**
For any $\eta \le 1/\beta$, and any $z$
$$f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2$$

**Note:** at $z = x$, we have that $f(x - \eta G_\eta(x)) \le f(x) - \frac{\eta}{2}\|G_\eta(x)\|_2^2$
**Note:** This is a generalization of the previous descent lemma for differentiable $\beta$-smooth functions:
$$f(x - \eta \nabla f(x)) \le f(x) - \frac{\eta}{2}\|\nabla f(x)\|_2^2$$

**Proof: [Appendix]**

Convex Optimization Slide 31
Carnegie Mellon University
### Visual Description
Text-only slide presenting the Descent Lemma for Proximal Descent and comparing it to the standard descent lemma for smooth functions.

---
## Page 32
### Content
# Main Descent Lemma for Strongly Convex Functions using Proximal Descent

The main descent lemma has a version for strongly convex functions when using proximal descent:

**Lemma [Descent Lemma for Proximal Descent]:**
Suppose our goal is to minimize $f(x) = g(x) + h(x)$ where $h$ is convex, but possibly non-smooth, $g$ is $\beta$-smooth, and $\alpha$-strongly-convex.

Suppose $\eta \le 1/\beta$, then we have that for any $x, z$,
$$f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2 - \frac{\alpha}{2}\|x - z\|_2^2.$$

**Proof: [HW]**

Convex Optimization Slide 32
Carnegie Mellon University
### Visual Description
Text-only slide presenting a version of the Descent Lemma specifically for objectives where the smooth part $g$ is also strongly convex.

---
## Page 33
### Content
# Convergence Analysis
### Visual Description
Text-only slide.

---
## Page 34
### Content
# Convergence Analysis

$$\text{prox}_{\eta,h}(\tilde{x}) \doteq \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - \tilde{x}\|_2^2 + h(z)$$

**Generalized gradient descent**: choose initial $x^{(0)}$, then repeat
$$x^{(k)} = \text{prox}_{\eta_k,h}(x^{(k-1)} - \eta_k \nabla g(x^{(k-1)})), \quad k = 1, 2, 3, \dots$$

Convergence analysis: it will be in terms of # of iterations of the algorithm

Each iteration evaluates $\text{prox}_{\eta}(\cdot)$ once.

[This can be cheap or expensive, depending on $h(\cdot)$]
### Visual Description
Text and mathematical formulas describing the proximal operator and the generalized gradient descent algorithm.

---
## Page 35
### Content
# Convergence Analysis

### Theorem [Convergence rate of prox GD]:
For $\beta$-smooth, convex $g$ and convex $h$, the prox GD algorithm with step-size $\eta = 1/\beta$ achieves the following guarantee:
$$\|f(x^k) - f(x^*)\| \leq \frac{\beta \|x^0 - x^*\|_2^2}{2k}$$

### Proof: [Appendix]
### Visual Description
Text and a mathematical theorem stating the convergence rate for proximal gradient descent.

---
## Page 36
### Content
# Convergence Analysis

It might be surprising that we've attained a $1/k$ rate of convergence for a class of non-smooth functions ($f$ is certainly not smooth).
* $f$ is certainly not smooth.
* The rate for non-smooth functions with subgradient method was $\frac{1}{\sqrt{k}}$.

As always though, we're exploiting a particular type of structure (that arises often in regularized loss minimization problems).
### Visual Description
Text-only slide.

---
## Page 37
### Content
# References

* https://web.stanford.edu/~boyd/papers/pdf/prox_algs.pdf
* S. Boyd, Lecture Notes for EE 264B, Stanford University, Spring 2010-2011
* Y. Nesterov (2004), “Introductory lectures on convex optimization: a basic course”, Chapter 3
* B. Polyak (1987), “Introduction to optimization”, Chapter 5
* L. Vandenberghe, Lecture Notes for EE 236C, UCLA, Spring 2011-2012
### Visual Description
Text-only slide listing academic references.

---
## Page 38
### Content
# Appendix
# Proofs
### Visual Description
Text-only slide.

---
## Page 39
### Content
# Properties of the Prox Operation
### Visual Description
Text-only slide.

---
## Page 40
### Content
# Properties of the Prox Operation

### Lemma
For a convex function $h$,
$$\|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2^2 \leq \langle x - y, \text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y) \rangle$$

### Proof
Let $u = \text{prox}_{\eta,h}(x)$, $v = \text{prox}_{\eta,h}(y)$, then we know
$$u = \text{prox}_{\eta,h}(x) = \text{argmin}_{z \in \mathbb{R}^d} \frac{1}{2\eta} \|z - x\|_2^2 + h(z)$$

Therefore, $0 \in \partial \left(\frac{1}{2\eta} \|u - x\|_2^2 + h(u)\right) = \frac{1}{\eta}(u - x) + \partial h(u)$
$$-\frac{1}{\eta}(u - x) \in \partial h(u)$$
$$\frac{1}{\eta}(x - u) \in \partial h(u)$$

Similarly, $\frac{1}{\eta}(y - v) \in \partial h(v)$
### Visual Description
Text and mathematical proof for a lemma regarding the properties of the proximal operation.
## Page 41
### Content
# Properties of the Prox Operation

**Proof [Continued]**

$\frac{1}{\eta}(x - u) \in \partial h(u) \quad \frac{1}{\eta}(y - v) \in \partial h(v)$

Since $h$ is convex, its subdifferentials are 'monotone' [We proved this before]:

$0 \leq (g_u - g_v)^T(u - v)$ for any $g_u \in \partial h(u), g_v \in \partial h(v)$

$0 \leq (\frac{1}{\eta}(x - u) - \frac{1}{\eta}(y - v))^T(u - v)$

$0 \leq \frac{1}{\eta}(x - y + v - u)^T(u - v)$

$0 \leq (x - y + v - u)^T(u - v)$

$0 \leq (x - y)^T(u - v) - (u - v)^T(u - v)$ [Here $u = \text{prox}_{\eta,h}(x), v = \text{prox}_{\eta,h}(y)$]

$\Rightarrow \|\text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y)\|_2^2 \leq \langle x - y, \text{prox}_{\eta,h}(x) - \text{prox}_{\eta,h}(y) \rangle$ ■

### Visual Description
Text-only slide containing a mathematical proof with several lines of derivations involving proximal operators and subdifferentials.

---
## Page 42
### Content
# The Fix Point of the Proximal Operator

### Visual Description
Title slide with the text "The Fix Point of the Proximal Operator" centered in blue.

---
## Page 43
### Content
# The Fix Point of the Proximal Operator

**Proof of** $G_\eta(x^*) = 0 \Rightarrow 0 \in \nabla g(x^*) + \partial h(x^*)$

By definition, $G_\eta(\tilde{x}) \doteq \frac{1}{\eta}[\tilde{x} - \text{prox}_{\eta,h}(\tilde{x} - \eta \nabla g(\tilde{x}))] \quad \forall \tilde{x}$

The motivation was to make sure this holds:
$\tilde{x} - \eta G_\eta(\tilde{x}) = \text{prox}_{\eta,h}(\tilde{x} - \eta \nabla g(\tilde{x})) \quad (*)$

Let $x \doteq \tilde{x} - \eta \nabla g(\tilde{x})$ and let $u \doteq \text{prox}_{\eta,h}(x) \quad (**)$

Therefore [using $(*)$ and $(**)$], $u \doteq \text{prox}_{\eta,h}(x)$
$= \text{prox}_{\eta,h}(\tilde{x} - \eta \nabla g(\tilde{x}))$
$= \tilde{x} - \eta G_\eta(\tilde{x})$ By $(*)$

### Visual Description
Text-only slide showing the beginning of a mathematical proof for the fixed point property of the proximal operator.

---
## Page 44
### Content
# The Fix Point of the Proximal Operator

**Proof [continued]**

$x = \tilde{x} - \eta \nabla g(\tilde{x}) \quad u \doteq \text{prox}_{\eta,h}(x) = \tilde{x} - \eta G_\eta(\tilde{x})$

We have seen before that
$u = \text{prox}_{\eta,h}(x) \Leftrightarrow \frac{1}{\eta}(x - u) \in \partial h(u)$
$\Leftrightarrow (x - u) \in \eta \partial h(u)$

Therefore,
$\underbrace{\tilde{x} - \eta \nabla g(\tilde{x})}_{x} - \underbrace{(\tilde{x} - \eta G_\eta(\tilde{x}))}_{u} \in \eta \partial h(\underbrace{\tilde{x} - \eta G_\eta(\tilde{x})}_{u})$

### Visual Description
Text-only slide continuing the mathematical proof, using underbraces to map variables $x$ and $u$ to their definitions in a subdifferential inclusion.

---
## Page 45
### Content
# The Fix Point of the Proximal Operator

**Proof [continued]**

$\underbrace{\tilde{x} - \eta \nabla g(\tilde{x})}_{x} - \underbrace{(\tilde{x} - \eta G_\eta(\tilde{x}))}_{u} \in \eta \partial h(\underbrace{\tilde{x} - \eta G_\eta(\tilde{x})}_{u})$

Therefore, after some simplification,
$\eta G_\eta(\tilde{x}) - \eta \nabla g(\tilde{x}) \in \eta \partial h(\tilde{x} - \eta G_\eta(\tilde{x}))$
$G_\eta(\tilde{x}) - \nabla g(\tilde{x}) \in \partial h(\tilde{x} - \eta G_\eta(\tilde{x}))$

$$G_\eta(\tilde{x}) \in \nabla g(\tilde{x}) + \partial h(\tilde{x} - \eta G_\eta(\tilde{x})) \quad \forall \tilde{x}$$

Note how it differs from a usual sub-gradient, i.e. $v_{\tilde{x}}$ would be a valid subgradient if it was in the set $\nabla g(\tilde{x}) + \partial h(\tilde{x})$, but **the proximal gradient mapping satisfies a slightly different condition**.

### Visual Description
Text-only slide continuing the proof. A key result is highlighted in red text (represented here as a centered equation). It concludes with a note comparing the proximal gradient mapping to a standard subgradient.

---
## Page 46
### Content
# The Fix Point of the Proximal Operator

**Proof [continued]**

$G_\eta(\tilde{x}) \in \nabla g(\tilde{x}) + \partial h(\tilde{x} - \eta G_\eta(\tilde{x})) \quad \forall \tilde{x}$

Now, if $G_\eta(x^*) = 0$ for some $x^*$, then $x^*$ must satisfy

$0 \in \nabla g(x^*) + \partial h(x^* - \underbrace{\eta G_\eta(x^*)}_{0})$

$0 \in \nabla g(x^*) + \partial h(x^*)$ ■

### Visual Description
Text-only slide concluding the first part of the proof, showing that if the proximal gradient mapping is zero, the point satisfies the optimality condition.

---
## Page 47
### Content
# The Fix Point of the Proximal Operator

**Proof of** $0 \in \nabla g(x^*) + \partial h(x^*) \Rightarrow G_\eta(x^*) = 0$

If $0 \in \nabla g(x^*) + \partial h(x^*)$, then $-\nabla g(x^*) \in \partial h(x^*)$
$-\eta \nabla g(x^*) \in \eta \partial h(x^*)$
$x^* - \eta \nabla g(x^*) - x^* \in \eta \partial h(x^*)$

We have seen before that $\frac{1}{\eta}(x - u) \in \partial h(u) \Leftrightarrow u = \text{prox}_{\eta,h}(x)$
and thus, $(x - u) \in \eta \partial h(u) \Leftrightarrow u = \text{prox}_{\eta,h}(x)$

Now, since $\underbrace{x^* - \eta \nabla g(x^*)}_{x} - \underbrace{x^*}_{u} \in \eta \partial h(x^*)$
$\Rightarrow u = \text{prox}_{\eta,h}(x)$
$\Rightarrow x^* = \text{prox}_{\eta,h}(x^* - \eta \nabla g(x^*))$ ■

### Visual Description
Text-only slide showing the proof for the converse direction: if the optimality condition is met, the point is a fixed point of the proximal operator.

---
## Page 48
### Content
# The Main Descent Lemma for Proximal Descent

### Visual Description
Title slide with the text "The Main Descent Lemma for Proximal Descent" centered in blue.

---
## Page 49
### Content
**The Main Descent Lemma for Proximal Descent**

**Proof of Descent Lemma for Proximal Descent:**

We want: $f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2$

This is not obvious, since $f = g + h$ is not smooth and $G_\eta$ is not a gradient.

Previously, for a smooth function $f$ we proved:
$$f(x - \eta \nabla f(x)) \le f(x) - \frac{\eta}{2}\|\nabla f(x)\|_2^2$$

### Visual Description
Text-only slide.

---
## Page 50
### Content
**The Main Descent Lemma**

**Proof of Descent Lemma for Proximal Descent [Continued]:**

We want: $f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2$

Since $f = g + h$, we have that
$$f(x - \eta G_\eta(x)) = g(x - \eta G_\eta(x)) + h(x - \eta G_\eta(x))$$

From $\beta$-smoothness:
$$g(y) \le g(x) + \nabla g(x)^T(y - x) + \frac{\beta}{2}\|y - x\|^2 \quad \forall x, y$$

Therefore,
$$g(\underbrace{x - \eta G_\eta(x)}_{y}) \le g(x) + \nabla g(x)^T(x - \eta G_\eta(x) - x) + \frac{\beta}{2}\|x - \eta G_\eta(x) - x\|^2$$
$$g(x - \eta G_\eta(x)) \le g(x) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2$$

### Visual Description
Text and math slide. There is a bracket under $x - \eta G_\eta(x)$ labeling it as $y$ to show the substitution into the $\beta$-smoothness formula.

---
## Page 51
### Content
**Main Descent Lemma**

**Proof of Descent Lemma for Proximal Descent [Continued]:**

$$g(x - \eta G_\eta(x)) \le g(x) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2$$

Since $g$ is convex, $g(x) + \nabla g(x)^T(z - x) \le g(z), \quad \forall x, y$
$$g(x) \le g(z) + \nabla g(x)^T(x - z)$$

Therefore,
$$g(x - \eta G_\eta(x)) \le g(z) + \nabla g(x)^T(x - z) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2$$

Thus, $f(x - \eta G_\eta(x)) = g(x - \eta G_\eta(x)) + h(x - \eta G_\eta(x))$
$$\le g(z) + \nabla g(x)^T(x - z) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2 + h(x - \eta G_\eta(x))$$

We just proved that
$$f(x - \eta G_\eta(x)) \le g(z) + \nabla g(x)^T(x - z) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2 + h(x - \eta G_\eta(x)) \quad (*1)$$

### Visual Description
Text and math slide showing the derivation steps for the descent lemma.

---
## Page 52
### Content
**Main Descent Lemma**

**Proof of Descent Lemma for Proximal Descent [Continued]:**

Since $h$ is convex $h(y) + \partial h(y)^T(z - y) \le h(z)$,
$$h(y) \le h(z) - \partial h(y)^T(z - y),$$

Let $y = x - \eta G_\eta(x)$
$$h(y) \le h(z) - \partial h(y)^T(z - y),$$
$$h(x - \eta G_\eta(x)) \le h(z) - \partial h(x - \eta G_\eta(x))^T(z - (x - \eta G_\eta(x))), \quad (*2)$$

We proved earlier that
$$G_\eta(x) \in \nabla g(x) + \partial h(x - \eta G_\eta(x)) \quad \forall x$$
and thus we have that $G_\eta(x) - \nabla g(x) \in \partial h(x - \eta G_\eta(x)) \quad \forall x \quad (*3)$

Using (*2) and (*3), we have
$$h(x - \eta G_\eta(x)) \le h(z) - (G_\eta(x) - \nabla g(x))^T(z - (x - \eta G_\eta(x))), \quad (*4)$$

### Visual Description
Text and math slide continuing the proof, focusing on the convex function $h$ and its subgradient.

---
## Page 53
### Content
**Main Descent Lemma**

**Proof of Descent Lemma for Proximal Descent [Continued]:**

$$h(x - \eta G_\eta(x)) \le h(z) - (G_\eta(x) - \nabla g(x))^T(z - x + \eta G_\eta(x)), \quad (*4)$$

Therefore,
$$h(x - \eta G_\eta(x)) \le h(z) - (G_\eta(x) - \nabla g(x))^T(z - x) - \eta \|G_\eta(x)\|^2 + \eta \nabla g(x)^T G_\eta(x), \quad (*5)$$

### Visual Description
Text and math slide showing the expansion of inequality (*4) into (*5).

---
## Page 54
### Content
**Main Descent Lemma**

**Proof of Descent Lemma for Proximal Descent [Continued]:**

$$f(x - \eta G_\eta(x)) \le g(z) + \nabla g(x)^T(x - z) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2 + h(x - \eta G_\eta(x)) \quad (*1)$$
$$h(x - \eta G_\eta(x)) \le h(z) - (G_\eta(x) - \nabla g(x))^T(z - x) - \eta \|G_\eta(x)\|^2 + \eta \nabla g(x)^T G_\eta(x) \quad (*5)$$

Therefore, after adding these two inequalities together,
$$f(x - \eta G_\eta(x)) \le g(z) + \nabla g(x)^T(x - z) - \eta \nabla g(x)^T G_\eta(x) + \frac{\beta}{2}\eta^2 \|G_\eta(x)\|^2$$
$$+ h(z) - (G_\eta(x) - \nabla g(x))^T(z - x) - \eta \|G_\eta(x)\|^2 + \eta \nabla g(x)^T G_\eta(x)$$

Let us simplify this,
$$f(x - \eta G_\eta(x)) \le f(z) + \left(\frac{\beta \eta^2}{2} - \eta\right) \|G_\eta(x)\|^2 + G_\eta(x)^T(x - z)$$
$$\le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2} \|G_\eta(x)\|_2^2$$
since $\eta \beta \le 1$ by our assumptions $\blacksquare$

### Visual Description
Text and math slide concluding the proof of the Main Descent Lemma.

---
## Page 55
### Content
**Convergence Analysis**

### Visual Description
Text-only slide.

---
## Page 56
### Content
**Convergence Analysis**

**Theorem [Convergence rate of prox GD]:**

For $\beta$-smooth convex $g$ and convex $h$, the prox GD algorithm with step-size $\eta = 1/\beta$ achieves the following guarantee:
$$\|f(x^k) - f(x^*)\| \le \frac{\beta \|x^0 - x^*\|_2^2}{2k}$$

**Proof:** $x^{t+1} = x^t - \eta_t G_\eta(x^t)$

The proof is similar to the GD convergence rate proof.

Notice that for any $t \in \{1, \dots, k\}$,
$$\|x^{t+1} - x^*\|_2^2 = \|x^t - \eta G_\eta(x^t) - x^*\|_2^2$$
$$= \|x^t - x^*\|_2^2 - 2\eta(x^t - x^*)^T G_\eta(x^t) + \eta^2 \|G_\eta(x^t)\|_2^2$$

### Visual Description
Text and math slide stating the convergence rate theorem for proximal gradient descent and beginning its proof.
## Page 57
### Content
# Convergence Analysis
**Proof [continued]:**
$$
\begin{aligned}
\|x^{t+1} - x^*\|_2^2 &= \|x^t - x^*\|_2^2 - 2\eta(x^t - x^*)^T G_\eta(x^t) + \eta^2 \|G_\eta(x^t)\|_2^2 \\
&= \|x^t - x^*\|_2^2 + 2\eta \left( \frac{\eta}{2} \|G_\eta(x^t)\|_2^2 - (x^t - x^*)^T G_\eta(x^t) \right) \quad (*1)
\end{aligned}
$$

From the descent lemma,
$$f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2, \quad \forall x, y$$

Let $z = x^*, x = x^t, \Rightarrow f(x^{t+1}) \le f(x^*) + G_\eta(x^t)^T(x^t - x^*) - \frac{\eta}{2}\|G_\eta(x^t)\|_2^2$
$$\Rightarrow \frac{\eta}{2}\|G_\eta(x)\|_2^2 - G_\eta(x)^T(x^t - x^*) \le f(x^*) - f(x^{t+1}) \quad (*2)$$

Therefore, from (*1) and (*2)
$$
\begin{aligned}
\|x^{t+1} - x^*\|_2^2 &= \|x^t - x^*\|_2^2 + 2\eta \left( \frac{\eta}{2} \|G_\eta(x^t)\|_2^2 - (x^t - x^*)^T G_\eta(x^t) \right) \\
&\le \|x^t - x^*\|_2^2 + 2\eta \left( f(x^*) - f(x^{t+1}) \right)
\end{aligned}
$$

### Visual Description
Text-only slide containing mathematical derivations for the convergence analysis proof of proximal gradient descent.

---
## Page 58
### Content
# Convergence Analysis
**Proof [continued]:**
$$\|x^{t+1} - x^*\|_2^2 \le \|x^t - x^*\|_2^2 + 2\eta \left( f(x^*) - f(x^{t+1}) \right)$$
$$2\eta \left( f(x^{t+1}) - f(x^*) \right) \le \|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2$$
$$f(x^{t+1}) - f(x^*) \le \frac{1}{2\eta} \left( \|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2 \right)$$

Since $\eta = \frac{1}{\beta}$,
$$f(x^{t+1}) - f(x^*) \le \frac{\beta}{2} \left( \|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2 \right)$$

### Visual Description
Text-only slide containing mathematical derivations for the convergence analysis proof, showing the rearrangement of terms and substitution of the step size.

---
## Page 59
### Content
# Convergence Analysis
**Proof [continued]:**
$$f(x^{t+1}) - f(x^*) \le \frac{\beta}{2} \left( \|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2 \right)$$

Summing from $t = 0, \dots, k - 1$ and dividing by $k$:
$$
\begin{aligned}
\frac{1}{k} \sum_{t=0}^{k-1} (f(x^{t+1}) - f(x^*)) &\le \frac{1}{k} \sum_{t=0}^{k-1} \frac{\beta}{2} (\|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2) \\
&= \frac{\beta}{2k} (\|x^0 - x^*\|_2^2 - \|x^k - x^*\|_2^2) \\
&\le \frac{\beta}{2k} \|x^0 - x^*\|_2^2 \quad (*3)
\end{aligned}
$$

### Visual Description
Text-only slide containing mathematical derivations for the convergence analysis proof, specifically showing the summation over iterations and the resulting telescoping sum.

---
## Page 60
### Content
# Convergence Analysis
**Proof [continued]:**
By the descent lemma, $f(x - \eta G_\eta(x)) \le f(z) + G_\eta(x)^T(x - z) - \frac{\eta}{2}\|G_\eta(x)\|_2^2$
Let $z = x^t, x = x^t$,
$$
\begin{aligned}
\Rightarrow f(x^{t+1}) &\le f(x^t) + G_\eta(x^t)^T(x^t - x^t) - \frac{\eta}{2}\|G_\eta(x^t)\|_2^2 \\
&= f(x^t) - \frac{\eta}{2}\|G_\eta(x^t)\|_2^2 \le f(x^t)
\end{aligned}
$$

Therefore, $f(x^k) \le f(x^t) \quad \forall t \in \{1, \dots, k\}$
$$\Rightarrow f(x^k) - f(x^*) \le \frac{1}{k} \sum_{t=1}^k f(x^t) - f(x^*) \le \frac{\beta}{2k} \|x^0 - x^*\|_2^2 \quad \text{[From (*3)]}$$
$$\Rightarrow f(x^k) - f(x^*) \le \frac{\beta \|x^0 - x^*\|^2}{2k} = O\left(\frac{\beta}{k}\right) \quad \blacksquare$$

### Visual Description
Text-only slide containing the final steps of the convergence analysis proof, establishing monotonicity and the final $O(1/k)$ convergence rate, concluded with a QED symbol.
