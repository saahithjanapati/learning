# March19_Newton_method

Source: `materials/archive/March19_Newton_method.pdf`
Duplicate equivalents: `March19_Newton_method.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 52

## Page 1
### Content
# Optimization for Machine Learning
## Newton Method

Slide 1
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 2
### Content
# Reading Material

* **Boyd and Vandenberghe**: Convex Optimization, Chapters 9.5
* **Nesterov**: Introductory lectures on convex optimization
* **Bazaraa, Sherali, Shetty**: Nonlinear Programming
* **Dimitri P. Bestsekas**: Nonlinear Programming
* http://www.chiark.greenend.org.uk/~sgtatham/newton/

Slide 2
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 3
### Content
# Goal of this lecture

### Newton method
* Finding a root
* Unconstrained minimization
    * Motivation with quadratic approximation
    * Rate of Newton’s method
* Newton fractals

Slide 3
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 4
### Content
# Newton method for finding a root

* **Newton method**: originally developed for **finding the solutions of a function**
* Also known as the **Newton–Raphson method**

$$\phi : \mathbb{R} \to \mathbb{R}$$
$$\phi(x^\star) = 0$$
$$x^\star = ?$$

Slide 4
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 5
### Content
# History

$$x_{n+1} = \frac{1}{2} \left( x_n + \frac{S}{x_n} \right)$$

This is a special case of Newton’s method
$$f(x) = x^2 - S = 0$$

**S=100**
Different starting values:
* $x_0 = 50$
* $x_0 = 1$
* $x_0 = -5$

Slide 5
Carnegie Mellon University
### Visual Description
A line graph on a grid showing the convergence of an iterative process for three different starting values ($x_0 = 50$, $x_0 = 1$, $x_0 = -5$). The y-axis ranges from -20 to 60. The blue and red lines converge to 10, while the green line converges to -10.

---

## Page 6
### Content
# History

* **1669, Isaac Newton [published in 1711]**: finding roots of polynomials
* **1690, Joseph Raphson**: finding roots of polynomials
* **1740, Thomas Simpson**:
    * solving general nonlinear equations
    * solving optimization problems (gradient = zero)
* **1879, Arthur Cayley**: generalizing Newton's method to finding complex roots of polynomials

Slide 6
Carnegie Mellon University
### Visual Description
Text-only slide.

---

## Page 7
### Content
# Newton Method for Finding a Root

**Goal:** $\phi : \mathbb{R} \to \mathbb{R} \quad \phi(x^\star) = 0$
$x^\star = ?$

**Motivation:** Linear Approximation (1st order Taylor approximation)

$$\underbrace{\phi(x + \Delta x)}_{x^\star} = \phi(x) + \phi'(x)\Delta x + \underbrace{o(|\Delta x|)}_{\text{Negligible}}$$
$$\phi(x^\star) = 0$$

**Therefore,** $0 \approx \phi(x) + \phi'(x)\Delta x$
$$\Delta x = -\frac{\phi(x)}{\phi'(x)}$$
Let $x_{k+1} \doteq x_k + \Delta x \Rightarrow x_{k+1} = x_k + \Delta x = x_k - \frac{\phi(x_k)}{\phi'(x_k)}$

Slide 7
Carnegie Mellon University
### Visual Description
Mathematical derivation of the Newton method update rule using a first-order Taylor approximation. Braces are used to identify terms like the root $x^\star$ and the negligible higher-order terms.

---

## Page 8
### Content
# Illustration of Newton’s method

**Goal: finding a root**
$$\hat{f}(x) = f(x_0) + f'(x_0)(x - x_0)$$

[Diagram showing a function $f$ and its linear approximation $\hat{f}$ at $x_0$]

In the next step, we will linearize here at $x_1$.

Slide 8
Carnegie Mellon University
### Visual Description
A plot illustrating the first step of Newton's method. A solid curve represents the function $f$. A dashed line represents the linear approximation $\hat{f}$ (tangent line) at the point $(x_0, f(x_0))$. The point where the tangent line intersects the x-axis is labeled $x_1 = x_0 + \Delta$. A point on the curve at this new x-coordinate is labeled $(x_0 + \Delta, f(x_0 + \Delta))$.
## Page 9
### Content
# Example: Finding a Root

[Graph of a function $y = f(x)$]

Legend:
- Funktion (Blue line)
- Tangente (Red line)

http://en.wikipedia.org/wiki/Newton%27s_method

### Visual Description
A 2D coordinate system with $x$ and $y$ axes. A blue curve (labeled "Funktion") represents a function crossing the x-axis. Below the graph, there is a legend indicating a blue line for the function and a red line for the tangent. A small grid-like progress bar or scale is at the bottom of the plot area.

---

## Page 10
### Content
# Newton Method for Finding a Root

This can be generalized to multivariate functions.

Let $F : \mathbb{R}^n \to \mathbb{R}^m$

$$0_m = F(x^*) = F(x + \Delta x) = F(x) + \underbrace{\nabla F(x)}_{\mathbb{R}^{m \times n}} \underbrace{\Delta x}_{\mathbb{R}^n} + \underbrace{o(|\Delta x|)}_{\text{(neglect)}}$$

Therefore, $0_m = F(x) + \nabla F(x) \Delta x$

$\Rightarrow \Delta x = -[\nabla F(x)]^{-1} F(x)$
[Use pseudo-inverse if there is no inverse]

$\Delta x = x_{k+1} - x_k$, and thus
$$x_{k+1} = x_k - [\nabla F(x_k)]^{-1} F(x_k)$$

**Newton method:** Start from $x_0$ and iterate.

### Visual Description
Text-heavy slide with mathematical derivations for the multivariate Newton's method for root finding. It uses under-braces to define the dimensions of the Jacobian matrix and the step vector.

---

## Page 11
### Content
# Newton method for minimization

### Visual Description
Text-only slide.

---

## Page 12
### Content
# Newton method for minimization

Let $f : \mathbb{R}^n \to \mathbb{R}$, $f$ is differentiable. **Goal:** $\min_{x \in \mathbb{R}^n} f(x)$

When we wanted to find the root of $F$, we used:
$$0_m = F(x) + \nabla F(x) \Delta x$$

Now we need to find the roots of $\nabla f(x) = 0_n$
[Here $\nabla f(\cdot) : \mathbb{R}^n \to \mathbb{R}^n$]

**Definition [Newton system]:**
$$\nabla f(x) + \nabla^2 f(x) \Delta x = 0_n$$

**Definition [Newton step]:**
Newton step: $x_{k+1} - x_k = \Delta x = -[\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$

### Visual Description
Text-heavy slide explaining the transition from root-finding to minimization by applying Newton's method to the gradient of a function.

---

## Page 13
### Content
# Newton method for minimization

Newton step: $x_{k+1} - x_k = \Delta x = -[\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$

**Newton method:** $x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$

Iterate the Newton step until
- convergence,
- or max number of iterations exceeded
  (divergence, loops, division by zero might happen...)

### Visual Description
Text-heavy slide showing the iterative formula for the Newton method in optimization and listing stopping criteria and potential failure modes.

---

## Page 14
### Content
# How good is the Newton method?

### Visual Description
Text-only slide.

---

## Page 15
### Content
# Descent direction

**Lemma [Descent direction]**
If $\nabla^2 f \succ 0$, then the Newton step is a descent direction.

**Proof:**
We know that if a vector has a negative inner product with the gradient vector, then that direction is a descent direction.

Newton step: $\Delta x = x_{k+1} - x_k = -[\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$

$\Rightarrow \nabla f(x_k)^T \Delta x = -\nabla f(x_k)^T [\nabla^2 f(x_k)]^{-1} \nabla f(x_k) < 0$

[Since we assumed the Hessian is positive definite]

### Visual Description
Text-heavy slide containing a lemma and its mathematical proof regarding the Newton step being a descent direction when the Hessian is positive definite.

---

## Page 16
### Content
# Newton method properties

- **Quadratic convergence** in the neighborhood of a strict local minimum [under some conditions].
- It can break down if $f''(x_k)$ is degenerate. [no inverse]
- It can diverge.
- It can be trapped in a loop.
- It can converge to a loop...

### Visual Description
Text-only slide listing various properties and potential issues of the Newton method.
## Page 17
### Content
# Motivation with Quadratic Approximation

Slide 17
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 18
### Content
# Motivation with Quadratic Approximation

Let $f : \mathbb{R}^n \to \mathbb{R}$, $f$ is differentiable.

**Second-order Taylor approximation:**
$$f(x) \approx \phi(x) \doteq f(x_k) + \nabla^T f(x_k)(x - x_k) + \frac{1}{2}(x - x_k)^T \nabla^2 f(x_k)(x - x_k)$$

Assume that
$$\nabla^2 f(x_k) \succ 0 \text{ [i.e. } \phi(\cdot) \text{ has a strict global minimum]}$$
Now, if $x_{k+1}$ is the global minimum of the quadratic function $\phi$, then
$$0_n = \nabla \phi(x_{k+1}) = \nabla f(x_k) + \nabla^2 f(x_k)(x_{k+1} - x_k)$$

**Newton step:**
$$x_{k+1} - x_k = \Delta x = -[\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$$
$$x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1} \nabla f(x_k)$$

Slide 18
Carnegie Mellon University

### Visual Description
Text-only slide containing mathematical derivations for the Newton step using a second-order Taylor approximation.

---

## Page 19
### Content
# Motivation with Quadratic Approximation

Quadratic approximation is good, when $x$ is close to $x^*$
$$\hat{f}(z) = f(x) + \nabla^T f(x)(z - x) + \frac{1}{2}(z - x)^T \nabla^2 f(x)(z - x)$$

Slide 19
Carnegie Mellon University

### Visual Description
A graph illustrates the quadratic approximation of a function. A solid curve represents the function $f$, and a dashed parabola represents its quadratic approximation $\hat{f}$ at a point $x$. The point $(x, f(x))$ is marked where the two curves touch. A horizontal arrow labeled $\Delta x$ shows the distance from $x$ to the minimum of the dashed parabola. The point $(x + \Delta x, f(x + \Delta x))$ is marked on the solid curve $f$ directly below the minimum of the parabola.

---

## Page 20
### Content
# Convergence rate (1-dim case)

Slide 20
Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 21
### Content
# Finding a root: Convergence rate

**Goal:** Find $x^*$ s.t. $f(x^*) = 0$, where $f : \mathbb{R} \to \mathbb{R}$

**Assumption:** $f$ has a continuous second derivative in $x^*$.

**Taylor theorem:**
For a $\xi_n$ between $x_n$ and $x^*$, we have
$$0 = f(x^*) = f(x_n) + \nabla f(x_n)(x^* - x_n) + \frac{1}{2} \nabla^2 f(\xi_n)(x^* - x_n)^2$$

Slide 21
Carnegie Mellon University

### Visual Description
Text-only slide defining the goal and assumptions for analyzing the convergence rate of root-finding, including the Taylor theorem expansion. The final equation is highlighted in red.

---

## Page 22
### Content
# Finding a root: Convergence rate

$$x_{n+1} = x_n - [\nabla f(x_n)]^{-1} f(x_n)$$
$$0 = f(x^*) = f(x_n) + \nabla f(x_n)(x^* - x_n) + \frac{1}{2} \nabla^2 f(\xi_n)(x^* - x_n)^2$$

Therefore, by assuming that $\exists [\nabla f(x_n)]^{-1} \in \mathbb{R}$
$$0 = [\nabla f(x_n)]^{-1} f(x_n) + (x^* - x_n) + \frac{1}{2} [\nabla f(x_n)]^{-1} \nabla^2 f(\xi_n)(x^* - x_n)^2$$
$$\Rightarrow \underbrace{[\nabla f(x_n)]^{-1} f(x_n) + (x^* - x_n)}_{\epsilon_{n+1} = x^* - x_{n+1}} = -\frac{1}{2} [\nabla f(x_n)]^{-1} \nabla^2 f(\xi_n) \underbrace{(x^* - x_n)^2}_{\epsilon_n^2}$$
$$\Rightarrow \epsilon_{n+1} = -\frac{1}{2} [\nabla f(x_n)]^{-1} \nabla^2 f(\xi_n) \epsilon_n^2$$

Slide 22
Carnegie Mellon University

### Visual Description
Text-only slide showing the mathematical derivation of the error recurrence relation for Newton's method in one dimension. Braces are used to define the error terms $\epsilon_{n+1}$ and $\epsilon_n^2$.

---

## Page 23
### Content
# Finding a root: Convergence rate

We have seen that
$$\epsilon_{n+1} = -\frac{1}{2} [\nabla f(x_n)]^{-1} \nabla^2 f(\xi_n) \epsilon_n^2$$

Assume that $M = \sup_{x \in \mathbb{R}, \xi \in \mathbb{R}} \frac{1}{2} \frac{1}{|\nabla f(x)|} |\nabla^2 f(\xi)| < \infty$
$$\Rightarrow |\epsilon_{n+1}| \le M \epsilon_n^2$$

Assume that $|\epsilon_0| = |x^* - x_0| < \frac{1}{2M}$
then $|\epsilon_1| < M (\frac{1}{2M})^2 = \frac{1}{4M}$
then $|\epsilon_2| < M (\frac{1}{4M})^2 = \frac{1}{16M} \dots$
$$\Rightarrow \text{Quadratic convergence}$$

Slide 23
Carnegie Mellon University

### Visual Description
Text-only slide completing the proof of quadratic convergence for Newton's method by bounding the error terms. The conclusion "Quadratic convergence" is highlighted in red.

---

## Page 24
### Content
# Problematic cases

Slide 24
Carnegie Mellon University

### Visual Description
Text-only slide.

---
==End of PDF==
## Page 25
### Content
# Finding a root: chaotic behavior

Let $f(x) = x^3 - 2x^2 - 11x + 12$

**Goal:** find the roots, (-3, 1, 4), using Newton’s method

* 2.35287527 converges to 4;
* 2.35284172 converges to −3;
* 2.35283735 converges to 4;
* 2.352836327 converges to −3;
* 2.352836323 converges to 1.

### Visual Description
Text-only slide.

---
## Page 26
### Content
# Finding a root: Cycle

Let $f(x) = x^3 - 2x + 2$

**Goal:** find its roots.

$x_0 = 0$
$x_1 = 1$
$x_2 = 0$
$x_3 = 1$
$\vdots$
$\Rightarrow$ 2-cycle!

**The starting point is important!**

### Visual Description
A graph showing the function $f(x) = x^3 - 2x + 2$ as a black curve. A red diagonal line $y=x$ is plotted. A blue line illustrates the Newton's method iteration starting at $x=0$, which leads to $x=1$, and then back to $x=0$, demonstrating a repeating cycle between these two values.

---
## Page 27
### Content
# Finding a root: divergence everywhere (except in the root)

**Newton’s method might never converge (except in the root)!**

$$f(x) = \sqrt[3]{x}$$
$$\nabla f(x) = \frac{1}{3}x^{-2/3}$$
$$\nabla^2 f(x) = -\frac{2}{9}x^{-5/3}$$

$$\lim_{x \to 0} \frac{1}{2} \frac{|\nabla^2 f(x)|}{|\nabla f(x)|} = \lim_{x \to 0} \frac{c}{|x|} = \infty$$

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^{1/3}}{\frac{1}{3}x_n^{-2/3}} = x_n - 3x_n = -2x_n$$

**Divergence!**

### Visual Description
A plot of the cube root function $f(x) = \sqrt[3]{x}$ is shown, displaying its characteristic S-curve passing through the origin. The mathematical derivation shows that for any starting point other than zero, the iterations will double in magnitude and flip sign, leading to divergence.

---
## Page 28
### Content
# Finding a root: Linear convergence only

If the first derivative is zero at the root, then convergence might be only linear (not quadratic)

$$f(x) = x^2$$
$$\nabla f(x) = 2x$$
$$\nabla^2 f(x) = 2$$

$$\Rightarrow \lim_{x \to 0} \frac{1}{2} \frac{|\nabla^2 f(x)|}{|\nabla f(x)|} = \lim_{x \to 0} \frac{1}{|x|} = \infty$$

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - x_n^2 / (2x_n) = x_n / 2$$

**Linear convergence only!**

### Visual Description
Text-only slide.

---
## Page 29
### Content
# Difficulties in minimization

$f(x) = 7x - \log(x)$
$f'(x) = 7 - \frac{1}{x}$
$f''(x) = \frac{1}{x^2}$
$\frac{f'(x)}{f''(x)} = 7x^2 - x$

$x_{k+1} = x_k - (7x_k^2 - x_k) = 2x_k - 7x_k^2$

| $k$ | $x_k$ | $x_k$ | $x_k$ | $x_k$ |
| :--- | :--- | :--- | :--- | :--- |
| 0 | 1.0 | 0 | 0.1 | 0.01 |
| 1 | -5.0 | 0 | 0.13 | 0.0193 |
| 2 | -185.0 | 0 | 0.1417 | 0.03599257 |
| 3 | -239,945.0 | 0 | 0.14284777 | 0.062916884 |
| 4 | $-4.0302 \times 10^{11}$ | 0 | 0.142857142 | 0.098124028 |
| 5 | $-1.1370 \times 10^{24}$ | 0 | 0.142857143 | 0.128849782 |
| 6 | $-9.0486 \times 10^{48}$ | 0 | 0.142857143 | 0.1414837 |
| 7 | $-5.7314 \times 10^{98}$ | 0 | 0.142857143 | 0.142843938 |
| 8 | $-\infty$ | 0 | 0.142857143 | 0.142857142 |
| 9 | $-\infty$ | 0 | 0.142857143 | 0.142857143 |
| 10 | $-\infty$ | 0 | 0.142857143 | 0.142857143 |

$x^* = \frac{1}{7} = 0.142857143$

**Range of quadratic convergence:**
$x \in (0.0, 0.2857143)$

### Visual Description
The slide contains a mathematical derivation for minimizing a function, a table showing the iteration values for different starting points, and a plot of the function $f(x) = 7x - \log(x)$. The plot shows a sharp curve with a minimum near $x=0.14$. The table demonstrates how some starting points lead to convergence while others lead to divergence towards negative infinity.

---
## Page 30
### Content
# Generalizations

* **Newton method in Banach spaces**
    * Newton’s method on the Banach space of functions
    * We need Frechet derivatives
* **Newton’s method on curved manifolds**
    * E.g. on space of orthonormal matrices
* **Newton’s method on complex numbers**

### Visual Description
Text-only slide.

---
## Page 31
### Content
# Newton Fractals

### Visual Description
Text-only slide.

---
## Page 32
### Content
# Gradient descent

### Visual Description
A 3D wireframe plot of a complex surface with peaks and valleys. Several colored lines (green, blue, purple, orange, red) represent different paths of gradient descent starting from various points on the surface and moving towards local minima.

---
## Page 33
### Content
# Complex functions

* $f(z) = z^4 - 1$
* Roots: $-1, +1, -i, +i$

[Image of a Newton fractal for $z^4 - 1$]

Color the starting point according to *which* root the Newton Method converged to

http://www.chiark.greenend.org.uk/~sgtatham/newton/

### Visual Description
The slide features a colorful Newton fractal image in the center. The fractal is divided into four main regions of solid color: blue (top), red (left), green (bottom), and yellow (right), meeting at the center. The boundaries between these colors exhibit complex, self-similar patterns. Text is placed to the left and below the image.

---
## Page 34
### Content
# Basins of attraction

* $f(z) = z^4 - 1$
* Roots: $-1, +1, -i, +i$

[Image of a Newton fractal for $z^4 - 1$ with shading]

Shading according to how many iterations it needed till convergence

http://www.chiark.greenend.org.uk/~sgtatham/newton/

### Visual Description
This slide shows the same Newton fractal as the previous page, but the colors (blue, red, green, yellow) now have internal shading. The shading creates a sense of depth or contour within each colored region, representing the number of iterations required for convergence.

---
## Page 35
### Content
# Basins of attraction

$f'(z) = (z-1)^4(z+1)^4$

[Image of a complex Newton fractal]

### Visual Description
The slide displays a highly complex fractal image. It features a central vertical green band flanked by intricate, multi-colored patterns (red, orange, yellow on the left; blue, cyan on the right) that resemble floral or butterfly-like shapes repeating along the boundaries.

---
## Page 36
### Content
# No convergence

polynomial $f$, having the roots at $+i, -i, -2.3$ and $+2.3$

[Image of a Newton fractal with black regions]

Black circles: no convergence [attracting cycle with period 2]

### Visual Description
The slide shows a Newton fractal with four main colored regions: blue (top), red (left), green (bottom), and yellow (right). Within the fractal patterns, there are distinct black circular regions. These black areas represent starting points that do not converge to a root.

---
## Page 37
### Content
# Avoiding divergence

### Visual Description
Text-only slide. The title "Avoiding divergence" is centered in blue text on a white background.

---
## Page 38
### Content
# Damped Newton method

To avoid possible divergence, do a line-search with backtracking

$$x_{k+1} = x_k - h_k [f''(x_k)]^{-1} f'(x_k)$$

* Initial stage: back track line search for $0 < h_k \le 1$.
* Final stage: $h_k = 1$ [Full Newton step].

We already know that the Newton direction is a descent direction.
If the step-size is too big, use a smaller step size.

### Visual Description
Text-only slide. It contains a mathematical formula for the damped Newton update and bullet points explaining the stages of the line-search process.

---
## Page 39
### Content
# Convergence rate of Newton’s method

### Visual Description
Text-only slide. The title "Convergence rate of Newton’s method" is centered in blue text on a white background.

---
## Page 40
### Content
# Convergence rate of Newton’s method

### Assumptions

* $f \in C^{2,2}_L(\mathbb{R}^n)$ [i.e. the second derivative is L-Lipschitz continuous]
* $\exists$ local minimum $x^*$ of $f$ with psd Hessian in $x^*$:
  $$f''(x^*) \succeq l \mathbf{I}_n \text{ for some } l > 0 \text{ [Locally } l\text{-strongly convex at } x^*]$$
* $x_0$ is close enough to $x^*$ [Local convergence only]

Newton step: $x_{k+1} = x_k - [f''(x_k)]^{-1} f'(x_k)$

### Visual Description
Text-only slide. It lists the mathematical assumptions required for the convergence rate analysis of Newton's method, including Lipschitz continuity of the second derivative and local strong convexity. The standard Newton step formula is provided at the bottom.
## Page 41
### Content
# Convergence rate of Newton’s method

Newton step:
$$x_{k+1} - x^* = x_k - x^* - [f''(x_k)]^{-1} f'(x_k)$$

We already know:
$$f'(x_k) = f'(x_k) - f'(x^*) = \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$$

Therefore,
$$x_{k+1} - x^* = x_k - x^* - [f''(x_k)]^{-1} \underbrace{\int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau}_{f'(x_k)}$$

### Visual Description
The slide shows a mathematical derivation for the error term in Newton's method. It uses an integral representation of the gradient to express the next iteration's error in terms of the current error and the Hessian.

---
## Page 42
### Content
# Convergence rate of Newton’s method

$$x_{k+1} - x^* = x_k - x^* - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$$

Trivial identity: $x_k - x^* = [f''(x_k)]^{-1} f''(x_k) (x_k - x^*) \int_0^1 d\tau$
$$= [f''(x_k)]^{-1} \int_0^1 f''(x_k) (x_k - x^*) d\tau$$

$$\Rightarrow x_{k+1} - x^* = \underbrace{\left[ [f''(x_k)]^{-1} \int_0^1 f''(x_k) (x_k - x^*) d\tau \right]}_{x_k - x^*} - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$$

### Visual Description
The slide continues the derivation from the previous page, introducing a "trivial identity" to rewrite the $x_k - x^*$ term as an integral involving the Hessian at $x_k$.

---
## Page 43
### Content
# Convergence rate of Newton’s method

$$x_{k+1} - x^* = \left[ [f''(x_k)]^{-1} \int_0^1 f''(x_k) (x_k - x^*) d\tau \right] - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$$

$$\Rightarrow x_{k+1} - x^* = [f''(x_k)]^{-1} G_k (x_k - x^*)$$

where $G_k = \int_0^1 [f''(x_k) - f''(x^* + \tau(x_k - x^*))] d\tau$

### Visual Description
The slide simplifies the error expression by factoring out $[f''(x_k)]^{-1}$ and $(x_k - x^*)$, defining a new term $G_k$ as the integral of the difference between Hessians.

---
## Page 44
### Content
# Convergence rate of Newton’s method

$$x_{k+1} - x^* = [f''(x_k)]^{-1} G_k (x_k - x^*)$$
where $G_k = \int_0^1 [f''(x_k) - f''(x^* + \tau(x_k - x^*))] d\tau$

$$\Rightarrow \|G_k\|_{op} \le \int_0^1 \|f''(x_k) - f''(x^* + \tau(x_k - x^*))\|_{op} d\tau$$
$$\le \int_0^1 L \|x_k - x^* - \tau(x_k - x^*)\| d\tau \text{ [since by assumptions } f \in C_L^{2,2}(\mathbb{R}^n)]$$
$$= \int_0^1 L(1 - \tau) \|x_k - x^*\| d\tau = \int_0^1 L(1 - \tau) r_k d\tau = L r_k - L r_k \int_0^1 \tau d\tau = \frac{L r_k}{2}$$

$$\Rightarrow \|G_k\|_{op} \le \frac{L r_k}{2} \text{ where } r_k := \|x_k - x^*\|$$

### Visual Description
The slide provides a bound for the operator norm of $G_k$. It uses the Lipschitz continuity of the Hessian to show that $\|G_k\|_{op}$ is bounded by $\frac{L r_k}{2}$, where $r_k$ is the distance to the optimum.

---
## Page 45
### Content
# Convergence rate of Newton’s method

**Lemma:**
$$\left. \begin{array}{l} f \in C_L^{2,2}(\mathbb{R}^n) \\ \|x - y\| = r \end{array} \right\} \Rightarrow f''(x) - f''(y) \preceq L r \mathbf{I}_n \Rightarrow f''(y) \succeq f''(x) - L r \mathbf{I}_n$$

Therefore,
$$f''(x_k) \succeq f''(x^*) - L r_k \mathbf{I}_n \succeq l \mathbf{I}_n - L r_k \mathbf{I}_n = (l - L r_k) \mathbf{I}_n$$
[since $f''(x^*) \succeq l \mathbf{I}_n$ for some $l > 0$ was our assumption]

$$\Rightarrow f''(x_k) \succeq (l - L r_k) \mathbf{I}_n$$

and thus,
If $l - L r_k > 0$, then $\begin{cases} f''(x_k) \text{ is positive definite} \\ \|[f''(x_k)]^{-1}\|_{op} \le \frac{1}{l - L r_k} \end{cases}$

### Visual Description
The slide presents a lemma regarding the Hessian's behavior under Lipschitz assumptions. It then uses this to bound the operator norm of the inverse Hessian at $x_k$, provided the current error $r_k$ is small enough.

---
## Page 46
### Content
# Convergence rate of Newton’s method

We already know:
$$r_{k+1} = \|x_{k+1} - x^*\| = \|[f''(x_k)]^{-1} G_k (x_k - x^*)\|$$
$$\le \underbrace{\|[f''(x_k)]^{-1}\|_{op}}_{\le (l - L r_k)^{-1}} \underbrace{\|G_k\|_{op}}_{\le \frac{r_k}{2} L} \underbrace{\|(x_k - x^*)\|}_{= r_k}$$

$$\Rightarrow r_{k+1} \le \frac{L r_k^2}{2(l - L r_k)}$$

### Visual Description
The slide combines the previously derived bounds for the inverse Hessian and $G_k$ to establish a recursive inequality for the error $r_k$. The final result, highlighted in red, shows the quadratic nature of the convergence.

---
## Page 47
### Content
# Convergence rate of Newton’s method

We have proved: $r_{k+1} \le \frac{L r_k^2}{2(l - L r_k)}$

Let $r_0 = \|x_0 - x^*\| \le \frac{2l}{3L}$
$\Rightarrow$ The numerator: $L r_0^2 \le \frac{4l^2}{9L}$
The denominator: $2l - 2L r_0 > 2l - 2L \frac{2l}{3L} = 2l - \frac{4l}{3} = \frac{2l}{3}$

$$\Rightarrow r_1 \le \frac{\frac{4l^2}{9L}}{\frac{2l}{3}} = \frac{4l^2}{9L} \frac{3}{2l} = \frac{2l}{3L}$$

$\Rightarrow$ By induction, we have that $r_k = \|x_k - x^*\| \le \frac{2l}{3L}$ for all $k$

### Visual Description
The slide uses induction to prove that if the initial error $r_0$ is within a certain radius $\frac{2l}{3L}$, then all subsequent errors $r_k$ will remain within that same radius.

---
## Page 48
### Content
# Convergence rate of Newton’s method

Furthermore, we proved that
$$r_{k+1} \le \frac{L r_k^2}{2(l - L r_k)}$$

If $r_k \le \frac{2l}{3L} \Rightarrow r_{k+1} \le \frac{L r_k^2}{2(l - L r_k)} = \frac{L r_k^2}{2l - 2L r_k}$
$$< \frac{L r_k^2}{3L r_k - 2L r_k} \text{ [Since } 3L r_k \le 2l]$$
$$< \frac{L r_k^2}{L r_k} = r_k$$

**The error doesn’t increase!**

### Visual Description
The slide demonstrates that under the condition $r_k \le \frac{2l}{3L}$, the error is strictly decreasing ($r_{k+1} < r_k$). The conclusion "The error doesn't increase!" is highlighted in red.

---
## Page 49
### Content
# Convergence rate of Newton’s method

**We proved so far that**
If $r_0 \leq \frac{2l}{3L}$, then
* $r_k \leq \frac{2l}{3L}$ for all $k$
* $r_{k+1} \leq r_k$
* $r_{k+1} \leq \frac{Lr_k^2}{2(l - Lr_k)}$

$\Rightarrow r_k \leq \frac{2l}{3L} = \frac{4l}{6L} = \frac{6l - 2l}{6L} = \frac{2l}{2L} - \frac{2l}{3} \frac{1}{2L} = \frac{2l}{2L} - \frac{2l/3}{2L}$
$\Rightarrow r_k \leq \frac{2l - c}{2L}$ with $c = \frac{2l}{3}$

**Lemma:** $0 < c \leq 2(l - Lr_k)$

**Proof:** $r_k \leq \frac{2l}{3L} \Rightarrow 6Lr_k \leq 4l$
$\Rightarrow 2l \leq 6l - 6Lr_k$
$\Rightarrow c = \frac{2l}{3} \leq 2(l - Lr_k)$

### Visual Description
Text and mathematical derivations showing the steps to prove a lemma regarding the convergence rate of Newton's method.

---
## Page 50
### Content
# Convergence rate of Newton’s method

**We proved so far that**
If $r_0 \leq \frac{2l}{3L}$, then
* $r_k \leq \frac{2l}{3L}$ for all $k$
* $r_{k+1} \leq r_k$
* $r_{k+1} \leq \frac{Lr_k^2}{2(l - Lr_k)}$
* $r_k \leq \frac{2l - c}{2L}$ with $c = \frac{2l}{3}$ and $0 < c \leq 2(l - Lr_k)$

**Lemma**
$r_{k+1} \leq \frac{Lr_k^2}{c} = \frac{3L}{2l}r_k^2$ **Quadratic rate!**

**Proof**
$r_{k+1} \leq \frac{Lr_k^2}{2(l - Lr_k)}$
$\leq \frac{Lr_k^2}{c}$ since $0 < \frac{2l}{3} = c \leq 2(l - Lr_k)$ by the Lemma on the previous slide.

### Visual Description
Text and mathematical derivations concluding with the proof of a quadratic convergence rate. The phrase "Quadratic rate!" is highlighted in red.

---
## Page 51
### Content
# Summary: Convergence rate of Newton’s method

We have proved the following theorem

**Theorem [Convergence Rate of Newton’s method]**

$\left. \begin{array}{r} \text{Let } f \text{ satisfy the above assumptions} \\ \|x_0 - x^*\| \leq \frac{2l}{3L} \end{array} \right\} \Rightarrow$

$\Rightarrow \begin{cases} \|x_k - x^*\| \leq \|x_0 - x^*\| \quad \forall k \\ \|x_{k+1} - x^*\| \leq \|x_k - x^*\| & \text{The error doesn't increase} \\ \|x_{k+1} - x^*\| \leq \frac{3L}{2l} \|x_k - x^*\|^2 & \text{Quadratic rate!} \end{cases}$

### Visual Description
A summary slide presenting a formal theorem. It uses large curly braces to group conditions and results. Annotations "The error doesn't increase" and "Quadratic rate!" are written in red next to the corresponding mathematical expressions.

---
## Page 52
### Content
# Summary

### Newton method
* Finding a root
* Unconstrained minimization
    * Motivation with quadratic approximation
    * Rate of Newton’s method
* Newton fractals

### Visual Description
Text-only slide. A high-level summary of the topics covered under the "Newton method" section, presented as a nested bulleted list.

==End of PDF==
