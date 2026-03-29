# Feb24_proximal_gd_examples

Source: `materials/archive/Feb24_proximal_gd_examples.pdf`
Duplicate equivalents: `Feb24_proximal_gd_examples.pdf`, `Feb24_proximal_gd_examples (1).pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 23

## Page 1
### Content
# Convex Optimization
## Proximal Gradient Descent Examples

Convex Optimization Slide 1
Carnegie Mellon University
### Visual Description
Title slide with "Convex Optimization" in blue and "Proximal Gradient Descent Examples" in red. The Carnegie Mellon University logo is in the bottom right corner.

---

## Page 2
### Content
# Proximal Gradient Descent Examples
* Descent Without Smoothness (g=0)
* Matrix Completion

Convex Optimization Slide 2
Carnegie Mellon University
### Visual Description
A simple bulleted list outlining the topics to be covered in the lecture.

---

## Page 3
### Content
# Descent Without Smoothness

For some more intuition about why the proximal algorithm is so powerful - consider the case when $g = 0$, i.e. we're just doing proximal minimization of a potentially non-smooth function $h$.

Since the function $h$ is not smooth, we could apply the subgradient method, but the crucial observation is that an arbitrary subgradient would in general not be a descent direction, and we could never hope to prove an analogue of our "main descent lemma".

Convex Optimization Slide 3
Carnegie Mellon University
### Visual Description
Text-only slide explaining the motivation for studying proximal minimization when the smooth part of the objective function is zero.

---

## Page 4
### Content
# Descent When g=0

Now, lets try to understand the proximal minimization steps when $g = 0$

$$
\begin{aligned}
x^{t+1} &= \text{argmin}_z \hat{g}_\eta(z) + h(z) \\
&= \text{argmin}_z \frac{1}{2\eta} \|z - (x^t - \eta \nabla g(x^t))\|_2^2 + h(z) \\
&= \text{argmin}_z \frac{1}{2\eta} \|z - x^t\|_2^2 + h(z) \quad \text{[Since } g = 0 \text{ and } \nabla g = 0\text{]} \\
&= \text{argmin}_z \frac{1}{2} \|z - x^t\|_2^2 + \eta h(z) \\
&= \text{prox}_{\eta,h}(x^t)
\end{aligned}
$$

Convex Optimization Slide 4
Carnegie Mellon University
### Visual Description
Mathematical derivation showing that when $g=0$, the proximal gradient step reduces to the proximal operator of $h$.

---

## Page 5
### Content
# Descent When g=0

$$
\begin{aligned}
x^{t+1} &= \text{argmin}_z \hat{g}_\eta(z) + h(z) \\
&= \text{argmin}_z \frac{1}{2} \|z - x^t\|_2^2 + \eta h(z) \\
&= \text{prox}_{\eta,h}(x^t)
\end{aligned}
$$

Of course, we could take $\eta$ very large, and this would converge to a minimizer in one step, but that problem is as hard to solve as the minimization of $h$ directly.

In practice, one might hope taking a smaller value of $\eta$ might yield easier to solve sub-problems which still converge to a minimizer of $h$.

Convex Optimization Slide 5
Carnegie Mellon University
### Visual Description
Text and math slide discussing the choice of step size $\eta$ in proximal minimization.

---

## Page 6
### Content
# Descent Lemma When g=0

We define the gradient mapping $G_\eta(x)$ as before
$$G_\eta(x) = \frac{1}{\eta} [x - \text{prox}_{\eta,h}(x - \eta \nabla g(x))] = \frac{1}{\eta} [x - \text{prox}_{\eta,h}(x)]$$

**Lemma [Descent Lemma When g=0]:**
Let $\eta > 0$ be an arbitrary fixed step size parameter
For $h$ convex, we have the following guarantees,
$$h(x^{t+1}) \le h(x^t) - \eta \|G_\eta(x^t)\|_2^2$$
$$h(x^{t+1}) \le h(x^*) - \eta \|G_\eta(x^t)\|_2^2 + G_\eta(x^t)^T(x^t - x^*)$$

* Without any smoothness assumptions we obtained a descent lemma
* Caveat: it's no longer an "explicit" step. We solve a minimization for each step with the proximal operator ("implicit" step).

Convex Optimization Slide 6
Carnegie Mellon University
### Visual Description
Slide presenting a lemma for descent guarantees when $g=0$, including the definition of the gradient mapping and two inequalities. It also includes two bullet points discussing the implications.

---

## Page 7
### Content
# Descent Lemma When g=0

**Proof:**
Since $x^{t+1} = x^t - \eta_t G_\eta(x^t)$
$\Rightarrow G_\eta(x^t) = \frac{1}{\eta_t}(x^t - x^{t+1})$

By definition of $x^{t+1}$,
$$x^{t+1} = \text{argmin}_z \frac{1}{2} \|z - x^t\|_2^2 + \eta h(z)$$

Therefore,
$$0 \in \partial \left( \frac{1}{2} \|z - x^t\|_2^2 + \eta h(z) \right)$$
$$0 \in x^{t+1} - x^t + \eta \partial h(x^{t+1})$$
$$\frac{1}{\eta} (x^t - x^{t+1}) \in \partial h(x^{t+1})$$
$$\Rightarrow G_\eta(x^t) \in \partial h(x^{t+1})$$

Convex Optimization Slide 7
Carnegie Mellon University
### Visual Description
Mathematical proof showing that the gradient mapping $G_\eta(x^t)$ is a subgradient of $h$ at $x^{t+1}$.

---

## Page 8
### Content
# Descent Lemma When g=0

**Proof of :** $h(x^{t+1}) \le h(x^t) - \eta \|G_\eta(x^t)\|_2^2$

We already know $G_\eta(x^t) = \frac{1}{\eta_t}(x^t - x^{t+1})$
$G_\eta(x^t) \in \partial h(x^{t+1})$

Definition of subgradient $g_x$ of convex $h$ at $x$:
$$h(x) \le h(y) - g_x^T(y - x) \quad \forall y \in \text{dom}(h)$$

Therefore, for any $u \in \partial h(x^{t+1})$
$$h(x^{t+1}) \le h(x^t) - u^T(x^t - x^{t+1})$$
$$h(x^{t+1}) \le h(x^t) - G_\eta(x^t)^T(x^t - x^{t+1})$$
$$h(x^{t+1}) \le h(x^t) - \eta_t \|G_\eta(x^t)\|^2 \quad \blacksquare$$

Convex Optimization Slide 8
Carnegie Mellon University
### Visual Description
Mathematical proof for the first inequality of the descent lemma when $g=0$. It uses the definition of a subgradient and the results from the previous page.

---
## Page 9
### Content
# Descent Lemma When g=0

**Proof of** $h(x^{t+1}) \le h(x^*) - \eta \|G_\eta(x^t)\|_2^2 + G_\eta(x^t)^T(x^t - x^*)$

We already know
$$x^t - x^{t+1} = \eta G_\eta(x^t)$$
$$G_\eta(x^t) \in \partial h(x^{t+1})$$
$$h(x) \le h(y) - g_x^T(y - x) \quad \forall y \in \text{dom}(h)$$

Therefore, for and any $u \in \partial h(x^{t+1})$
$$h(x^{t+1}) \le h(x^*) - u^T(x^* - x^{t+1})$$
$$h(x^{t+1}) \le h(x^*) - G_\eta(x^t)^T(x^* - x^{t+1})$$
$$= h(x^*) - G_\eta(x^t)^T(x^* - x^t + x^t - x^{t+1})$$
$$= h(x^*) - G_\eta(x^t)^T(x^* - x^t) - G_\eta(x^t)^T(x^t - x^{t+1})$$
$$\Rightarrow h(x^{t+1}) \le h(x^*) - G_\eta(x^t)^T(x^* - x^t) - \eta \|G_\eta(x^t)\|_2^2 \quad \blacksquare$$

### Visual Description
Text-only slide containing a mathematical proof.

---
## Page 10
### Content
# Convergence Rate when g=0

### Theorem
Let $\eta > 0$ be an arbitrary fixed step size parameter.
After $k$ iterations the proximal method for convex $h$ achieves the guarantee:
$$h(x^k) - h(x^*) \le \frac{1}{2\eta k} \|x^0 - x^*\|_2^2$$

### Proof
Similar to the previous proofs using the descent lemma.
Since $x^{t+1} = x^t - \eta G_\eta(x^t)$, we have that
$$\|x^{t+1} - x^*\|_2^2 = \|x^t - \eta G_\eta(x^t) - x^*\|_2^2$$
$$= \|x^t - x^*\|_2^2 + \eta^2 \|G_\eta(x^t)\|_2^2 - 2\eta G_\eta(x^t)^T(x^t - x^*)$$

### Visual Description
Text-only slide containing a theorem statement and the beginning of its proof.

---
## Page 11
### Content
# Convergence Rate when g=0

**We already know:**
$$\|x^{t+1} - x^*\|_2^2 = \|x^t - x^*\|_2^2 + \eta^2 \|G_\eta(x^t)\|_2^2 - 2\eta G_\eta(x^t)^T(x^t - x^*)$$

**From the second claim of the descent lemma:**
$$h(x^{t+1}) \le h(x^*) - \eta \|G_\eta(x^t)\|_2^2 + G_\eta(x^t)^T(x_t - x^*)$$
$$-G_\eta(x^t)^T(x_t - x^*) \le h(x^*) - h(x^{t+1}) - \eta \|G_\eta(x^t)\|_2^2$$
$$-2\eta G_\eta(x^t)^T(x_t - x^*) \le 2\eta(h(x^*) - h(x^{t+1})) - 2\eta^2 \|G_\eta(x^t)\|_2^2$$

**Therefore,**
$$\|x^{t+1} - x^*\|_2^2 = \|x^t - x^*\|_2^2 + \eta^2 \|G_\eta(x^t)\|_2^2 - 2\eta G_\eta(x^t)^T(x^t - x^*)$$
$$\le \|x^t - x^*\|_2^2 + 2\eta (h(x^*) - h(x^{t+1}))$$

### Visual Description
Text-only slide continuing the mathematical proof from the previous page.

---
## Page 12
### Content
# Convergence Rate when g=0

**We already know:**
$$\|x^{t+1} - x^*\|_2^2 \le \|x^t - x^*\|_2^2 + 2\eta (h(x^*) - h(x^{t+1}))$$
$$\Rightarrow h(x^{t+1}) - h(x^*) \le \frac{1}{2\eta} \left( \|x^t - x^*\|_2^2 - \|x^{t+1} - x^*\|_2^2 \right)$$
$$\Rightarrow h(x^t) - h(x^*) \le \frac{1}{2\eta} \left( \|x^{t-1} - x^*\|_2^2 - \|x^t - x^*\|_2^2 \right)$$
$$\Rightarrow h(x^k) - h(x^*) \le \left( \frac{1}{k} \sum_{t=1}^k h(x^t) \right) - h(x^*) = \frac{1}{k} \sum_{t=1}^k (h(x^t) - h(x^*))$$
$$\le \frac{1}{k} \sum_{t=1}^k \left( \frac{1}{2\eta} (\|x^{t-1} - x^*\|_2^2 - \|x^t - x^*\|_2^2) \right)$$
$$\le \frac{1}{2\eta k} \|x^0 - x^*\|_2^2 \quad \blacksquare$$

### Visual Description
Text-only slide concluding the mathematical proof for the convergence rate.

---
## Page 13
### Content
# Application 2: Matrix Completion

### Visual Description
Title slide with large blue text centered on a white background.

---
## Page 14
### Content
# Matrix Completion

We observe a subset of indices of a matrix $M^*$ (possibly with some noise), and we would like to "fill in" the matrix.

For some subset of indices $\mathcal{I}$, we observe $\{Y_{ij} : (i,j) \in \mathcal{I}\}$.

A typical assumption is that $M^*$ has low rank.

**Goal:** We'd like to find a matrix that is close to $Y$ on the observed indices but has small rank.

$$\widehat{M^*} = \arg \min_M \sum_{(i,j) \in \mathcal{I}} (Y_{ij} - M_{ij})^2 + \lambda \cdot \text{rank}(M)$$

### Visual Description
Text-only slide introducing the matrix completion problem and its mathematical formulation.

---
## Page 15
### Content
# Matrix Completion

$$\widehat{M^*} = \arg \min_M \sum_{(i,j) \in \mathcal{I}} (Y_{ij} - M_{ij})^2 + \lambda \cdot \text{rank}(M)$$

The rank of a matrix is a non-convex function, and so we'll instead choose to use a convex relaxation of the rank.

### Visual Description
Text-only slide explaining the need for convex relaxation in matrix completion.

---
## Page 16
### Content
# Convex Relaxation

Given a function $f : C \to \mathbb{R}$, a function $g$ is called the (largest) convex envelope of $f$ if and only if $g$ is convex and
$$g(x) \le f(x) \quad \forall x \in C$$

i.e., $g$ is a convex function below $f$ that is **closest point-wise** to $f$.

![Convex Envelope Diagram]

More info: https://angms.science/doc/LA/NuclearNorm_cvxEnv_rank.pdf
Figure reference: https://tex.stackexchange.com/questions/208122/drawing-convex-envelope-of-a-function

### Visual Description
The slide contains a definition of a convex envelope and a supporting diagram. The diagram shows a non-convex, jagged function $f(x)$ in grey. Below it, a smooth, convex function $g(x)$ is drawn that connects the lower points of $f(x)$, illustrating the concept of a convex envelope.

---
## Page 17
### Content
# Convex Relaxation of the Rank Function

**Theorem (Fazel02):** For $f(\mathbf{X}) = \text{rank}(\mathbf{X})$ over the set
$$S := \{\mathbf{X} \in \mathbb{R}^{m \times n} \mid \|\mathbf{X}\|_2 \le 1\}$$
the convex envelope of $f$ is the nuclear norm $\|\mathbf{X}\|_*$.

**Reminder:**
$$\|\mathbf{X}\|_2 = \sqrt{\lambda_{\max} (\mathbf{X}^T \mathbf{X})} = \sigma_{\max}(\mathbf{X})$$
$$\|\mathbf{X}\|_* = \|\mathbf{X}\|_{Tr} = \text{trace} \left( \sqrt{\mathbf{X}^T \mathbf{X}} \right) = \sum_{i=1}^{\min\{m,n\}} \sigma_i(\mathbf{X})$$

Proof: The proof uses conjugate functions.
We might come back to this later after we discussed duality.

Convex Optimization Slide 17
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 18
### Content
# Intuition

Let $S := \{\mathbf{X} \in \mathbb{R}^{m \times n} \mid \|\mathbf{X}\|_2 \le 1\}$
$= \{\mathbf{X} \in \mathbb{R}^{m \times n} \mid \sigma_{\max}(\mathbf{X}) \le 1\}$

**Lemma:** If $\mathbf{X} \in S$, i.e. $\sigma_{\max}(\mathbf{X}) \le 1$, then
$$\|\mathbf{X}\|_* \le \text{rank}(\mathbf{X}).$$

**Proof:**
If $k = \text{rank}(\mathbf{X})$, then $\mathbf{X}$ has to have exactly $k$ nonzero singular values. They are all $\le 1$, by assumption.
$$\|\mathbf{X}\|_* = \sum_{i=1}^k \sigma_i(\mathbf{X}) \le k$$
So $\|\mathbf{X}\|_*$ is indeed a (convex) lower bound on $\text{rank}(\mathbf{X})$.

[The interesting part is that this is the largest convex lower bound!]

Convex Optimization Slide 18
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 19
### Content
# Matrix Completion

With all of this background, we'd like to minimize the following objective:
$$\min_{\mathbf{M}} \sum_{(i,j) \in \mathcal{I}} (Y_{ij} - M_{ij})^2 + \lambda \|\mathbf{M}\|_*$$

This is a convex objective, but just like the LASSO the regularizer, it is not differentiable.

Convex Optimization Slide 19
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 20
### Content
# Matrix Completion

Similarly as we did for the vector case with soft-thresholding operator, we can show that
$$\min_{\mathbf{M}} \frac{1}{2} \|\mathbf{Y} - \mathbf{M}\|_F^2 + \lambda \|\mathbf{M}\|_*$$
has a closed form solution.

$$\|\mathbf{M}\|_* = \sum_{i=1}^{\min\{m,n\}} \sigma_i(\mathbf{X})$$

Convex Optimization Slide 20
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 21
### Content
# Matrix Completion

$$\min_{\mathbf{M}} \frac{1}{2} \|\mathbf{Y} - \mathbf{M}\|_F^2 + \lambda \|\mathbf{M}\|_*$$

The optimal $\mathbf{M}$ comes from soft-thresholding the singular values of $\mathbf{Y}$, i.e.
$$\text{prox}_{\lambda, h}(\mathbf{Y}) = \mathbf{U} \Sigma_\lambda \mathbf{V}^T,$$
where $\mathbf{Y} = \mathbf{U} \Sigma \mathbf{V}^T$ is the SVD of $\mathbf{Y}$
and $\Sigma_\lambda = \max\{0, \Sigma - \lambda\}$
which just subtracts $\lambda$ from every singular value of $\mathbf{Y}$ (and stops if it hits 0).

Convex Optimization Slide 21
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 22
### Content
# Matrix Completion: The Soft-Impute Algorithm

1. We compute $\mathbf{Z}^{t+1} = \mathbf{X}^t - \eta (\mathbf{X}^t - \mathbf{Y}) \circ \Omega$, where $\Omega_{ij} = 1$ if $(i,j) \in \mathcal{I}$ and 0 otherwise.

2. We then compute $\mathbf{X}^{t+1} = \text{prox}_{\lambda, h} \left( \mathbf{Z}^{t+1} \right)$.

You can take the step-size $\eta = 1$ since the objective is 1-smooth.

This algorithm is known as "soft-impute" and is one of the faster ways to solve the matrix completion problem.

Convex Optimization Slide 22
Carnegie Mellon University

### Visual Description
Text-only slide.

---
## Page 23
### Content
# References

* https://web.stanford.edu/~boyd/papers/pdf/prox_algs.pdf
* S. Boyd, Lecture Notes for EE 264B, Stanford University, Spring 2010-2011
* Y. Nesterov (2004), "Introductory lectures on convex optimization: a basic course", Chapter 3
* B. Polyak (1987), "Introduction to optimization", Chapter 5
* L. Vandenberghe, Lecture Notes for EE 236C, UCLA, Spring 2011-2012

Convex Optimization Slide 23
Carnegie Mellon University

### Visual Description
Text-only slide.
