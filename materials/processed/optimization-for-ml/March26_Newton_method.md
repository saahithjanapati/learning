# March26_Newton_method

Source: `materials/archive/March26_Newton_method.pdf`
Duplicate equivalents: `March26_Newton_method.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 55

## Page 1
### Content
Optimization for Machine Learning
Newton Method

Slide 1
### Visual Description
A title slide with "Optimization for Machine Learning" in blue at the top, followed by "Newton Method" in red below it. The Carnegie Mellon University logo is in the bottom right corner, and "Slide 1" is in the bottom left.
---
## Page 2
### Content
Reading Material
* Boyd and Vandenberghe: Convex Optimization, Chapters 9.5
* Nesterov: Introductory lectures on convex optimization
* Bazaraa, Sherali, Shetty: Nonlinear Programming
* Dimitri P. Bestsekas: Nonlinear Programming
* http://www.chiark.greenend.org.uk/~sgtatham/newton/

Slide 2
### Visual Description
Text-only slide.
---
## Page 3
### Content
Goal of this lecture
Newton method
* Finding a root
* Unconstrained minimization
    * Motivation with quadratic approximation
    * Rate of Newton's method
* Newton fractals

Slide 3
### Visual Description
Text-only slide.
---
## Page 4
### Content
Newton method for finding a root
Newton method:
originally developed for finding the solutions of a function
Also known as the Newton-Raphson method
$\phi: \mathbb{R} \rightarrow \mathbb{R}$
$\phi(x^*) = 0$
$x^* = ?$

Slide 4
### Visual Description
A slide defining the Newton method for finding a root, including its alternative name and the mathematical formulation of the problem: a function $\phi$ mapping real numbers to real numbers, where we seek $x^*$ such that $\phi(x^*) = 0$.
---
## Page 5
### Content
History
$x_{n+1} = \frac{1}{2} \left(x_n + \frac{S}{x_n}\right)$
This is a special case of Newton's method
$f(x) = x^2 - S = 0$
$S=100$
Different starting values:
* $x_0 = 50$
* $x_0 = 1$
* $x_0 = -5$

Slide 5
### Visual Description
The left side of the slide contains mathematical equations and text explaining a special case of Newton's method for finding the square root of S. It lists $S=100$ and three different starting values for $x_0$. The right side features a line graph with an x-axis and a y-axis ranging from -20 to 60. Three distinct colored lines (red, blue, green) are plotted, showing their convergence towards a value around 10 on the y-axis, illustrating the iterative process from different starting points.
---
## Page 6
### Content
History
* 1669, Isaac Newton [published in 1711]:
    finding roots of polynomials
* 1690, Joseph Raphson:
    finding roots of polynomials
* 1740, Thomas Simpson:
    solving general nonlinear equations
    solving optimization problems (gradient = zero)
* 1879, Arthur Cayley:
    generalizing Newton's method to finding complex roots of polynomials

Slide 6
### Visual Description
Text-only slide.
---
## Page 7
### Content
Newton Method for Finding a Root
Goal: $\phi: \mathbb{R} \rightarrow \mathbb{R}$ $\phi(x^*) = 0$
$x^* = ?$
Motivation: Linear Approximation (1st order Taylor approximation)
$\phi(x + \Delta x) = \phi(x) + \phi'(x)\Delta x + O(|\Delta x|)$
*
$x$
$\phi(x^*) = 0$
Negligible
Therefore, $0 \approx \phi(x) + \phi'(x)\Delta x$
$\Delta x = -\frac{\phi(x)}{\phi'(x)}$
Let $x_{k+1} = x_k + \Delta x \Rightarrow x_{k+1} = x_k - \frac{\phi(x)}{\phi'(x)}$

Slide 7
### Visual Description
A slide explaining the goal of finding a root using Newton's method and its motivation through a 1st order Taylor approximation. Mathematical equations show the Taylor expansion of $\phi(x + \Delta x)$, with a bracket indicating $x^*$ and the $O(|\Delta x|)$ term labeled as "Negligible". The derivation leads to the Newton update rule for $x_{k+1}$.
---
## Page 8
### Content
Illustration of Newton's method
Goal: finding a root
$\hat{f}(x) = f(x_0) + f'(x_0)(x - x_0)$
In the next step, we will linearize here at $x_1$.

Slide 8
### Visual Description
A graph illustrating Newton's method for finding a root. It shows a curved function $f$ and a straight line $\hat{f}$ which is the tangent to $f$ at the point $(x_0, f(x_0))$. The tangent line intersects the x-axis at $x_1 = x_0 + \Delta$. Vertical dashed lines extend from $x_0$ and $x_1$ to the x-axis and the function/tangent. The point $(x_0 + \Delta, f(x_0 + \Delta))$ is also marked on the curve. Text below the graph indicates that the process will be repeated by linearizing at $x_1$.
---
## Page 9
### Content
Example: Finding a Root

http://en.wikipedia.org/wiki/Newton%27s_method
### Visual Description
A 2D Cartesian coordinate system with x and y axes. A blue curve, labeled "Funktion", is plotted, showing a general increasing trend and crossing the x-axis. A red line, labeled "Tangente", is shown tangent to the blue curve at a specific point.
---
## Page 10
### Content
Newton Method for Finding a Root
This can be generalized to multivariate functions.

Let $F: R^N \to R^M$
$0_m = F(x^*) = F(x + \Delta x) = F(x) + \nabla F(x)\Delta x + o(|\Delta x|)$
$R^{m \times n} R^n$ (neglect)
Therefore, $0_m = F(x) + \nabla F(x)\Delta x$
$\Delta x = -[\nabla F(x)]^{-1}F(x)$
[Use pseudo-inverse if there is no inverse]
$\Delta x = x_{k+1} - x_k$, and thus
$x_{k+1} = x_k - [\nabla F(x_k)]^{-1}F(x_k)$
Newton method: Start from $x_0$ and iterate.
### Visual Description
Text-only slide.
---
## Page 11
### Content
Newton method for minimization
### Visual Description
Title slide.
---
## Page 12
### Content
Newton method for minimization
Let $f : R^n \to R$, $f$ is differentiable. Goal: $\min_{x \in R^n} f(x)$
When we wanted to find the root of $F$, we used:
$0_m = F(x) + \nabla F(x)\Delta x$
Now we need to find the roots of $\nabla f(x) = 0_n$
[Here $\nabla f(.): R^n \to R^n$]
Definition [Newton system]:
$\nabla f(x) + \nabla^2f(x)\Delta x = 0_n$
Definition [Newton step]:
Newton step: $x_{k+1} - x_k = \Delta x = -[\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
### Visual Description
Text-only slide.
---
## Page 13
### Content
Newton method for minimization
Newton step: $x_{k+1} - x_k = \Delta x = -[\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
Newton method: $x_{k+1} = x_k - [\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
Iterate the Newton step until
* convergence,
* or max number of iterations exceeded
  (divergence, loops, division by zero might happen...)
### Visual Description
Text-only slide.
---
## Page 14
### Content
How good is the Newton method?
### Visual Description
Title slide.
---
## Page 15
### Content
Descent direction
Lemma [Descent direction]
If $\nabla^2f > 0$, then the Newton step is a descent direction.

Proof:
We know that if a vector has a negative inner product with the gradient vector, then that direction is a descent direction.
Newton step: $\Delta x = x_{k+1} - x_k = -[\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
$\Rightarrow \nabla f(x_k)^T \Delta x = -\nabla f(x_k)^T[\nabla^2f(x_k)]^{-1}\nabla f(x_k) < 0$
[Since we assumed the Hessian is positive definite]
### Visual Description
Text-only slide.
---
## Page 16
### Content
Newton method properties
* Quadratic convergence in the neighborhood of a strict local minimum [under some conditions].
* It can break down if $f''(x_k)$ is degenerate. [no inverse]
* It can diverge.
* It can be trapped in a loop.
* It can converge to a loop...
### Visual Description
Text-only slide.
---
## Page 17
### Content
Motivation with Quadratic Approximation
### Visual Description
A title slide with the text "Motivation with Quadratic Approximation" in blue, centered on a white background. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 18
### Content
Motivation with Quadratic Approximation
Let $f : \mathbb{R}^n \to \mathbb{R}$, $f$ is differentiable.
**Second-order Taylor approximation:**
$f(x) \approx \phi(x) = f(x_k)+\nabla^Tf(x_k)(x-x_k)+\frac{1}{2}(x-x_k)^T \nabla^2f(x_k)(x-x_k)$
Assume that
$\nabla^2f(x_k) > 0$ [i.e. $\phi(\cdot)$ has a strict global minimum]
Now, if $x_{k+1}$ is the global minimum of the quadratic function $\phi$, then
$0_n = \nabla\phi(x_{k+1}) = \nabla f(x_k) + \nabla^2 f(x_k)(x_{k+1}-x_k)$
**Newton step:**
$x_{k+1} - x_k = \Delta x = -[\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
$x_{k+1} = x_k - [\nabla^2f(x_k)]^{-1}\nabla f(x_k)$
### Visual Description
Text-only slide.
---
## Page 19
### Content
$\hat{f}$
$(x, f(x))$
$\Delta x$
$(x + \Delta x, f(x + \Delta x))$
$f$
Quadratic approximation is good, when $x$ is close to $x^*$
$\hat{f}(z) = f(x) + \nabla^T f(x)(z-x) + \frac{1}{2}(z-x)^T \nabla^2 f(x)(z-x)$
### Visual Description
A plot showing a solid curve representing a function $f(x)$ and a dashed curve representing its quadratic approximation $\hat{f}(x)$. Two points are marked on the solid curve: $(x, f(x))$ and $(x + \Delta x, f(x + \Delta x))$. A horizontal arrow indicates the distance $\Delta x$ between the x-coordinates of these points. The quadratic approximation is shown to be close to the original function near $x$.
---
## Page 20
### Content
Convergence rate (1-dim case)
### Visual Description
A title slide with the text "Convergence rate (1-dim case)" in blue, centered on a white background. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 21
### Content
Finding a root: Convergence rate
**Goal:** Find $x^*$ s.t. $f(x^*) = 0$, where $f:\mathbb{R} \to \mathbb{R}$
**Assumption:** $f$ has a continuous second derivative in $x^*$.
**Taylor theorem:**
For a $\xi_n$ between $x_n$ and $x^*$, we have
$0 = f(x^*) = f(x_n) + \nabla f(x_n)(x^* - x_n) + \frac{1}{2}\nabla^2 f(\xi_n)(x^* - x_n)^2$
### Visual Description
Text-only slide.
---
## Page 22
### Content
Finding a root: Convergence rate
$x_{n+1} = x_n - [\nabla f(x_n)]^{-1}f(x_n)$
$0 = f(x^*) = f(x_n) + \nabla f(x_n)(x^* - x_n) + \frac{1}{2}\nabla^2 f(\xi_n)(x^* - x_n)^2$
Therefore, by assuming that $\exists [\nabla f(x_n)]^{-1} \in \mathbb{R}$
$0 = [\nabla f(x_n)]^{-1}f(x_n) + (x^* - x_n) + \frac{1}{2}[\nabla f(x_n)]^{-1}\nabla^2 f(\xi_n)(x^* - x_n)^2$
$\Rightarrow [\nabla f(x_n)]^{-1}f(x_n) + (x^* - x_n) = -\frac{1}{2}[\nabla f(x_n)]^{-1}\nabla^2 f(\xi_n)(x^* - x_n)^2$
$\epsilon_{n+1} = x^* - x_{n+1}$
$\Rightarrow \epsilon_{n+1} = -\frac{1}{2}[\nabla f(x_n)]^{-1}\nabla^2 f(\xi_n)\epsilon_n^2$
### Visual Description
Text-only slide with mathematical derivations. The terms $(x^* - x_n)$ and $(x^* - x_n)^2$ are highlighted with underbraces and labeled as $\epsilon_n$ and $\epsilon_n^2$ respectively in the derivation.
---
## Page 23
### Content
Finding a root: Convergence rate
We have seen that
$\epsilon_{n+1} = -\frac{1}{2}[\nabla f(x_n)]^{-1}\nabla^2 f(\xi_n)\epsilon_n^2$
Assume that $M = \frac{1}{2} \sup_{x \in \mathbb{R},\xi \in \mathbb{R}} |[\nabla f(x)]^{-1}\nabla^2 f(\xi)| < \infty$
$\Rightarrow |\epsilon_{n+1}| \le M \epsilon_n^2$
Assume that $|\epsilon_0| = |x^* - x_0| < \frac{1}{2M}$
then $|\epsilon_1| < M(\frac{1}{2M})^2 = \frac{1}{4M}$
then $|\epsilon_2| < M(\frac{1}{4M})^2 = \frac{1}{16M}$ ...
$\Rightarrow$ Quadratic convergence
### Visual Description
Text-only slide with mathematical derivations showing the conditions for quadratic convergence.
---
## Page 24
### Content
Problematic cases
### Visual Description
A title slide with the text "Problematic cases" in blue, centered on a white background. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 25
### Content
Finding a root: chaotic behavior

Let $f(x) = x^3 - 2x^2 - 11x + 12$

Goal: find the roots, $(-3, 1, 4)$, using Newton's method

2.35287527 converges to 4;
2.35284172 converges to $-3$;
2.35283735 converges to 4;
2.352836327 converges to $-3$;
2.352836323 converges to 1.
### Visual Description
Text-only slide.
---
## Page 26
### Content
Finding a root: Cycle

Let $f(x) = x^3 - 2x + 2$
Goal: find its roots.

$x_0 = 0$
$x_1 = 1$
$x_2 = 0$
$x_3 = 1$
...
$\Rightarrow$ 2-cycle!

The starting point is important!
### Visual Description
A graph of a cubic function $f(x) = x^3 - 2x + 2$ is shown. Several lines representing tangent lines from Newton's method iterations are drawn, illustrating how the method can enter a 2-cycle between $x=0$ and $x=1$. The x-axis ranges from -3 to 4, and the y-axis from -3 to 4.
---
## Page 27
### Content
Finding a root: divergence everywhere
(except in the root)

Newton's method might never converge (except in the root)!

$f(x) = \sqrt[3]{x}$
$\nabla f(x) = \frac{1}{3}x^{-2/3}$
$\nabla^2 f(x) = -\frac{2}{9}x^{-5/3}$

$\lim_{x \to 0} \frac{1|\nabla^2 f(x)|}{2|\nabla f(x)|} = \lim_{x \to 0} \frac{c}{|x|} = \infty$

$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^{1/3}}{\frac{1}{3}x_n^{-2/3}} = x_n - 3x_n = -2x_n$

Divergence!
### Visual Description
A graph of the function $f(x) = \sqrt[3]{x}$ is shown, with the x-axis ranging from -2 to 2 and the y-axis from -1.0 to 1.0. The curve passes through the origin, illustrating its behavior around the root $x=0$.
---
## Page 28
### Content
Finding a root: Linear convergence only

If the first derivative is zero at the root, then convergence might be only linear (not quadratic)

$f(x) = x^2$
$\nabla f(x) = 2x$
$\nabla^2 f(x) = 2$

$\Rightarrow \lim_{x \to 0} \frac{1}{2}\frac{|\nabla^2 f(x)|}{|\nabla f(x)|} = \lim_{x \to 0} \frac{1}{|x|} = \infty$

$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^2}{2x_n} = x_n/2$

Linear convergence only!
### Visual Description
Text-only slide.
---
## Page 29
### Content
Difficulties in minimization

$f(x) = 7x - \log(x)$
$f'(x) = 7 - \frac{1}{x}$
$f''(x) = \frac{1}{x^2}$

$x^* = \frac{1}{7} = 0.142857143$

$x_{k+1} = x_k - \frac{f'(x_k)}{f''(x_k)} = x_k - (7x_k^2 - x_k) = 2x_k - 7x_k^2$

| k | $x_k$ | $x_k$ | $x_k$ | $x_k$ |
|---|-------|-------|-------|-------|
| 0 | 1.0 | 0 | 0.1 | 0.01 |
| 1 | -5.0 | 0 | 0.13 | 0.0193 |
| 2 | -185.0 | 0 | 0.1417 | 0.03599257 |
| 3 | -239,945.0 | 0 | 0.14284777 | 0.062916884 |
| 4 | -4.0302 $\times 10^{11}$ | 0 | 0.142857142 | 0.098124028 |
| 5 | -1.1370 $\times 10^{24}$ | 0 | 0.142857143 | 0.128849782 |
| 6 | -9.0486 $\times 10^{48}$ | 0 | 0.142857143 | 0.1414837 |
| 7 | -5.7314 $\times 10^{98}$ | 0 | 0.142857143 | 0.142843938 |
| 8 | $-\infty$ | 0 | 0.142857143 | 0.142857142 |
| 9 | $-\infty$ | 0 | 0.142857143 | 0.142857143 |
| 10 | $-\infty$ | 0 | 0.142857143 | 0.142857143 |

Range of quadratic convergence: $x \in (0.0, 0.2857143)$
### Visual Description
A graph is displayed on the right, showing a function that decreases sharply and then gradually increases, with a minimum around $x=0.14$. The x-axis ranges from 0 to 3, and the y-axis from 0 to 20. On the left, a table shows the iteration steps ($k$) and corresponding values of $x_k$ and other related quantities, demonstrating convergence to $0.142857143$.
---
## Page 30
### Content
Generalizations

*   Newton method in Banach spaces
    *   Newton's method on the Banach space of functions
    *   We need Frechet derivatives
*   Newton's method on curved manifolds
    *   E.g. on space of orthonormal matrices
*   Newton's method on complex numbers
### Visual Description
Text-only slide.
---
## Page 31
### Content
Newton Fractals
### Visual Description
Text-only slide.
---
## Page 32
### Content
Gradient descent
### Visual Description
A 3D plot of a complex surface with multiple peaks and valleys is shown. Several colored paths (red, orange, green, blue, purple) are drawn on the surface, illustrating different trajectories of gradient descent starting from various points and converging towards local minima.
---
## Page 33
### Content
Complex functions
* $f(z)= z^4-1$,
* Roots: $-1, +1, -i, +i$

Color the starting point according to which root the Newton Method converged to
### Visual Description
The slide displays a large, intricate fractal-like image, divided into four main quadrants colored red, blue, green, and yellow. These quadrants meet at the center, and their boundaries are highly complex, showing recursive patterns of smaller colored regions. The overall shape resembles a stylized 'X' or a four-leaf clover.
---
## Page 34
### Content
Basins of attraction
* $f(z)= z^4-1$,
* Roots: $-1, +1, -i, +i$

Shading according to how many iterations it needed till convergence
### Visual Description
The slide features a large, complex fractal image, similar to the previous page, divided into four main colored regions (red, blue, green, yellow) that meet at the center. The boundaries between these regions are highly intricate and fractal. Within each colored region, there is a gradient or shading, with lighter areas closer to the center and darker areas further out, suggesting a visual representation of iteration count.
---
## Page 35
### Content
Basins of attraction
$f'(z)=(z-1)^4(z+1)^4$
### Visual Description
The slide shows a large, complex fractal image, similar to the previous pages. It is divided into four main colored regions (red, blue, green, light blue/cyan) that meet at the center. A prominent vertical green band runs through the center of the image, separating the left and right halves. The boundaries between the colors are highly intricate and fractal, with swirling patterns.
---
## Page 36
### Content
No convergence
polynomial f, having the roots at $+i, -i, -2.3$ and $+2.3$
Black circles: no convergence [attracting cycle with period 2]
### Visual Description
The slide displays a large, complex fractal image, similar to previous pages, with four main colored regions (red, blue, green, yellow) meeting at the center. The intricate patterns at the boundaries of these regions are interspersed with numerous solid black circles of varying sizes, indicating areas of non-convergence. These black circles are particularly noticeable near the center and along the fractal edges.
---
## Page 37
### Content
Avoiding divergence
### Visual Description
Text-only slide.
---
## Page 38
### Content
Damped Newton method
To avoid possible divergence, do a line-search with backtracking
$x_{k+1} = x_k - h_k[f''(x_k)]^{-1}f'(x_k)$
Initial stage: back track line search for $0 < h_k \le 1$.
Final stage: $h_k = 1$ [Full Newton step].
We already know that the Newton direction is a descent direction.
If the step-size is too big, use a smaller step size.
### Visual Description
Text-only slide.
---
## Page 39
### Content
Convergence rate of Newton's
method
### Visual Description
Text-only slide.
---
## Page 40
### Content
Convergence rate of Newton's method
Assumptions
* $f \in C_L^{2,2} (\mathbb{R}^n)$ [i.e. the second derivative is L-Lipschitz continuous]
* $\exists$ local minimum $x^*$ of $f$ with psd Hessian in $x^*$:
  $f''(x^*) \ge lI_n$ for some $l > 0$ [Locally $l$-strongly convex at $x^*$]
* $x_0$ is close enough to $x^*$: $||x_0 - x^*|| \le \frac{2l}{3L}$
  [Local convergence only]
Newton step: $x_{k+1} = x_k - [f''(x_k)]^{-1}f'(x_k)$
### Visual Description
Text-only slide.
---
## Page 41
### Content
Summary: Convergence rate of Newton's method
We have proved the following theorem
**Theorem [Convergence Rate of Newton's method]**
Let $f$ satisfy the above assumptions
$$
\begin{cases}
||x_k - x^*|| < ||x_0 - x^*|| \quad \forall k \\
||x_{k+1} - x^*|| \le ||x_k - x^*|| \\
||x_{k+1} - x^*|| \le \frac{3L}{2}||x_k - x^*||^2
\end{cases}
$$
The error doesn't increase
Quadratic rate!
### Visual Description
Slide title "Summary: Convergence rate of Newton's method". A theorem statement is followed by three mathematical inequalities. The first inequality is on its own line, and the second and third are grouped with a large left brace. Text annotations "The error doesn't increase" and "Quadratic rate!" are positioned next to the grouped inequalities.
---
## Page 42
### Content
Summary
**Newton method**
* Finding a root
* Unconstrained minimization
    * Motivation with quadratic approximation
    * Rate of Newton's method
* Newton fractals
### Visual Description
Slide title "Summary". A list of topics related to Newton's method, presented as nested bullet points.
---
## Page 43
### Content
Thanks for your Attention 🙂
### Visual Description
A simple slide with the text "Thanks for your Attention" centered horizontally, followed by a smiley face emoji.
---
## Page 44
### Content
Appendix
### Visual Description
A simple slide with the text "Appendix" centered horizontally.
---
## Page 45
### Content
Convergence rate of Newton's method
Newton step:
$x_{k+1} - x^* = x_k - x^* - [f'(x_k)]^{-1} f'(x_k)$
We already know:
$f'(x_k) - f'(x^*) = \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$
Therefore,
$x_{k+1} - x^* = x_k - x^* - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$
### Visual Description
Slide title "Convergence rate of Newton's method". It presents the Newton step equation, a known identity involving an integral, and then a "Therefore" statement combining these. The term $f'(x_k)$ is written below the integral in the final equation, enclosed in a brace, indicating it's the result of that integral.
---
## Page 46
### Content
Convergence rate of Newton's method
$x_{k+1} - x^* = x_k - x^* - [f'(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$
Trivial identity: $x_k - x^* = [f''(x_k)]^{-1} \int_0^1 f''(x_k)(x_k - x^*) d\tau$
$$
\Rightarrow x_{k+1} - x^* = \left[ [f''(x_k)]^{-1} \int_0^1 f''(x_k)(x_k - x^*) d\tau \right] - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau
$$
### Visual Description
Slide title "Convergence rate of Newton's method". It starts with an equation for $x_{k+1} - x^*$. Below it, a "Trivial identity" is presented, which is an expression for $x_k - x^*$ involving an integral. This identity is then substituted into the first equation, with the term $x_k - x^*$ explicitly shown to be replaced by its integral form, indicated by a large brace and the text $x_k - x^*$ below it.
---
## Page 47
### Content
Convergence rate of Newton's method
$x_{k+1} - x^* = [f''(x_k)]^{-1} \int_0^1 f''(x_k)(x_k - x^*) d\tau - [f''(x_k)]^{-1} \int_0^1 f''(x^* + \tau(x_k - x^*))(x_k - x^*) d\tau$
$\Rightarrow x_{k+1} - x^* = [f''(x_k)]^{-1} G_k(x_k - x^*)$
where $G_k = \int_0^1 [f''(x_k) - f''(x^* + \tau(x_k - x^*))] d\tau$
### Visual Description
Slide title "Convergence rate of Newton's method". It shows two lines of equations. The first line combines two integral terms from the previous slide. The second line simplifies this expression by introducing $G_k$. The definition of $G_k$ is provided below.
---
## Page 48
### Content
Convergence rate of Newton's method
$x_{k+1} - x^* = [f''(x_k)]^{-1} G_k(x_k - x^*)$
where $G_k = \int_0^1 [f''(x_k) - f''(x^* + \tau(x_k - x^*))] d\tau$
$\Rightarrow ||G_k||_{op} \le \int_0^1 ||f''(x_k) - f''(x^* + \tau(x_k - x^*))||_{op} d\tau$
$\le \int_0^1 L||x_k - x^* - \tau(x_k - x^*)|| d\tau$ [since by assumptions $f \in C^{2,2}(\mathbb{R}^n)$]
$= \int_0^1 L(1-\tau)||x_k - x^*|| d\tau = L||x_k - x^*|| \int_0^1 (1-\tau) d\tau = L||x_k - x^*|| \left[ \tau - \frac{\tau^2}{2} \right]_0^1 = L||x_k - x^*|| \left( 1 - \frac{1}{2} \right) = \frac{L||x_k - x^*||}{2}$
where $r_k := ||x_k - x^*||$
$\Rightarrow ||G_k||_{op} \le \frac{L r_k}{2}$
### Visual Description
Slide title "Convergence rate of Newton's method". It starts with the equation for $x_{k+1} - x^*$ and the definition of $G_k$ from the previous slide. It then shows a series of inequalities and equalities to bound $||G_k||_{op}$, including an integral calculation. A note about the assumption $f \in C^{2,2}(\mathbb{R}^n)$ is included. The final result for the bound on $||G_k||_{op}$ is presented, along with the definition of $r_k$.
---
## Page 49
### Content
Convergence rate of Newton's method

**Lemma:**
If $f \in C_L^{2,2}(\mathbb{R}^n)$ and $||x - y|| = r$, then
$$f''(x) - f''(y) \le LrI_n \implies f''(y) \ge f''(x) - LrI_n$$

**Therefore,**
$$f''(x_k) \ge f''(x^*) - Lr_kI_n \ge lI_n - Lr_kI_n = (l - Lr_k)I_n$$
[since $f''(x^*) \ge lI_n$ for some $l > 0$ was our assumption]
$$\implies f''(x_k) \ge (l - Lr_k)I_n$$

**and thus,**
If $l - Lr_k > 0$, then
$$ \left\{ \begin{array}{l} f''(x_k) \text{ is positive definite} \\ ||[f''(x_k)]^{-1}||_{op} \le \frac{1}{l-Lr_k} \end{array} \right. $$
### Visual Description
The slide presents a lemma and its implications regarding the convergence rate of Newton's method. It contains mathematical inequalities and conditions for the positive definiteness of the Hessian inverse.
---
## Page 50
### Content
Convergence rate of Newton's method

**We already know:**
$$r_{k+1} = ||x_{k+1} - x^*|| = ||[f''(x_k)]^{-1}G_k(x_k - x^*)||$$
$$\le ||[f''(x_k)]^{-1}||_{op} ||G_k||_{op} ||(x_k - x^*)||$$
$$ \underbrace{\le (l - Lr_k)^{-1}}_{\text{from previous slide}} \underbrace{\le \frac{r_k L}{2}}_{\text{from previous results}} \underbrace{= r_k}_{\text{definition of } r_k} $$
$$\implies r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$$
### Visual Description
The slide shows a derivation of the inequality for $r_{k+1}$, which represents the error at step $k+1$. It uses previously established bounds for the inverse Hessian and the gradient term, leading to the quadratic convergence rate expression.
---
## Page 51
### Content
Convergence rate of Newton's method

**We have proved:** $r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$

**Let** $r_0 = ||x_0 - x^*|| \le \frac{2l}{3L}$

**The numerator:** $Lr_0^2 \le L\left(\frac{2l}{3L}\right)^2 = L\frac{4l^2}{9L^2} = \frac{4l^2}{9L}$

**The denominator:** $2(l - Lr_0) \ge 2\left(l - L\frac{2l}{3L}\right) = 2\left(l - \frac{2l}{3}\right) = 2\left(\frac{l}{3}\right) = \frac{2l}{3}$

$$ \implies r_1 \le \frac{\frac{4l^2}{9L}}{\frac{2l}{3}} = \frac{4l^2}{9L} \cdot \frac{3}{2l} = \frac{2l}{3L} $$

$$\implies \text{By induction, we have that } r_k = ||x_k - x^*|| \le \frac{2l}{3L} \text{ for all } k$$
### Visual Description
The slide demonstrates how the initial condition $r_0 \le \frac{2l}{3L}$ leads to $r_1 \le \frac{2l}{3L}$, and by induction, $r_k \le \frac{2l}{3L}$ for all $k$. It involves algebraic manipulation of the derived inequality for $r_{k+1}$.
---
## Page 52
### Content
Convergence rate of Newton's method

**Furthermore, we proved that** $r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$

If $r_k \le \frac{2l}{3L} \implies r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)} = \frac{Lr_k^2}{2l-2Lr_k}$
$$ < \frac{Lr_k^2}{3Lr_k-2Lr_k} \quad \text{[Since } 3Lr_k \le 2l \text{]}$$
$$ = \frac{Lr_k^2}{Lr_k} = r_k $$
**The error doesn't increase!**
### Visual Description
The slide shows a proof that if $r_k$ is within a certain bound, then $r_{k+1} < r_k$, implying that the error does not increase. This is derived using the previously established inequality for $r_{k+1}$ and the condition $r_k \le \frac{2l}{3L}$. The phrase "The error doesn't increase!" is highlighted in red.
---
## Page 53
### Content
Convergence rate of Newton's method

**We proved so far that**
If $r_0 \le \frac{2l}{3L}$, then
* $r_k \le \frac{2l}{3L}$ for all $k$
* $r_{k+1} \le r_k$
* $r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$

$$ \implies r_k \le \frac{2l}{3L} = \frac{4l}{6L} = \frac{2l}{6L} + \frac{2l}{6L} = \frac{l}{3L} + \frac{l}{3L} = \frac{2l}{3L} $$
$$ \implies r_k \le \frac{2l-c}{2L} \text{ with } c = \frac{2l}{3} $$

**Lemma:** $0 < c < 2(l - Lr_k)$

**Proof:** $r_k \le \frac{2l}{3L} \implies 6Lr_k \le 4l$
$$ \implies 2l < 6l - 6Lr_k $$
$$ \implies c = \frac{2l}{3} \le 2(l - Lr_k) $$
### Visual Description
The slide summarizes previous results in bullet points. It then presents a lemma and its proof, which establishes a relationship between a constant $c$ and the term $2(l - Lr_k)$, crucial for the quadratic convergence rate.
---
## Page 54
### Content
Convergence rate of Newton's method

**We proved so far that**
If $r_0 \le \frac{2l}{3L}$, then
* $r_k \le \frac{2l}{3L}$ for all $k$
* $r_{k+1} \le r_k$
* $r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$
* $r_k \le \frac{2l-c}{2L}$ with $c = \frac{2l}{3}$ and $0 < c \le 2(l - Lr_k)$

**Lemma:** $r_{k+1} \le \frac{Lr_k^2}{c} = \frac{3L}{2l} r_k^2$ **Quadratic rate!**

**Proof:** $r_{k+1} \le \frac{Lr_k^2}{2(l-Lr_k)}$
$$ \le \frac{Lr_k^2}{c} \text{ since } 0 < \frac{2l}{3} = c \le 2(l - Lr_k) \text{ by the Lemma on the previous slide.} $$
### Visual Description
The slide summarizes the conditions and results established so far. It then presents a lemma that explicitly states the quadratic convergence rate, $r_{k+1} \le \frac{3L}{2l} r_k^2$, and provides a concise proof using the previous lemma. The phrase "Quadratic rate!" is highlighted in red.
---
## Page 55
### Content
Summary: Convergence rate of Newton's method

**We have proved the following theorem**

**Theorem [Convergence Rate of Newton's method]**
Let $f$ satisfy the above assumptions
If $||x_0 - x^*|| \le \frac{2l}{3L}$
Then:
$$ \left\{ \begin{array}{l} ||x_k - x^*|| \le ||x_0 - x^*|| \quad \forall k \\ ||x_{k+1} - x^*|| \le ||x_k - x^*|| \quad \text{The error doesn't increase} \\ ||x_{k+1} - x^*|| \le \frac{3L}{2l}||x_k - x^*||^2 \quad \text{Quadratic rate!} \end{array} \right. $$
### Visual Description
This is a summary slide presenting the main theorem on the convergence rate of Newton's method. It lists three key conclusions: the error does not increase, the error decreases monotonically, and the method exhibits a quadratic rate of convergence, with the latter two points highlighted in red text.
---
