# FunctionClasses

Source: `materials/archive/FunctionClasses.pdf`
Duplicate equivalents: `FunctionClasses.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 53

## Page 1
### Content
Optimization for Machine Learning
Function Classes
### Visual Description
Title slide with "Optimization for Machine Learning" in blue, and "Function Classes" in red. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 2
### Content
Some functions are difficult to optimize
### Visual Description
A graph with an x-axis and a y-axis. A black line representing a function is plotted, showing a relatively flat curve with a sharp, V-shaped dip in the middle, indicating a non-differentiable point or a very steep change.
---
## Page 3
### Content
Smoothness
* Any continuous (but otherwise ugly, wiggly, non-differentiable) function can be approximated with a smooth, differentiable function arbitrarily well.
### Visual Description
A plot titled "Weierstrass Function" showing a highly oscillatory blue line (the Weierstrass function) and a smoother red line overlaid, which appears to be an approximation. The x-axis ranges from -2 to 0.5, and the y-axis from -2 to 2.
---
## Page 4
### Content
Smoothness
* Therefore, assuming differentiability only, will not help us get reasonable properties (e.g rates) of the optimization methods.
* We need stronger conditions to get rid of mischievous functions.
    * E.g the derivatives have to behave nicely (Lipschitz continuous derivatives)
    * We will call this property smoothness
### Visual Description
Text-only slide.
---
## Page 5
### Content
Important Function Classes
* $k$-times differentiable functions: $C^k(Q)$
* $\beta$-smooth, $k$-times differentiable functions: $C_{\beta}^{k,p}(Q)$
* $k$-times differentiable, convex functions: $F^k(Q)$
* $\beta$-smooth, $k$-times differentiable, convex functions: $F_{\beta}^{k,p}(Q)$
* $k$-times differentiable, strongly convex functions: $S^k_\alpha(Q)$
* $\beta$-smooth, $k$-times differentiable, strongly convex: $S_{\alpha,\beta}^{k,p}(Q)$
### Visual Description
Text-only slide with mathematical notation for different function classes.
---
## Page 6
### Content
* k-Times Differentiable, (Possibly Nonconvex) Functions
* Beta-smooth, k-Times Differentiable, (Possibly Nonconvex) Functions
### Visual Description
Text-only slide listing two categories of functions.
---
## Page 7
### Content
$k$-Times Differentiable Functions, $C^k(Q)$

**Notation**
$$C^k(Q) = \left\{ \begin{array}{l} \star f: Q \to \mathbb{R} \\ \star f \text{ is } k\text{-times continuously differentiable on } Q \subseteq \mathbb{R}^n \end{array} \right.$$

**Remark**
$f$ doesn't need to be convex!
### Visual Description
Text-only slide with mathematical notation defining $C^k(Q)$.
---
## Page 8
### Content
Smooth, $k$-Times Differentiable Functions, $C_{\beta}^{k,p}(Q)$
$$C_{\beta}^{k,p}(Q) = \left\{ \begin{array}{l} f: \mathbb{R}^d \supseteq Q \to \mathbb{R} \\ f \text{ is } k\text{-times continuously differentiable on } \mathbb{R} \\ p \le k \\ \| f^{(p)}(x) - f^{(p)}(y) \| \le \beta \|x - y \| \quad \forall x, y \in Q \end{array} \right.$$
(i.e. the $p^{th}$ derivatives are Lipschitz continuous)

**Remark**
$f$ doesn't need to be convex!

**Notation**
The $p^{th}$ derivative of $f$: $\nabla^p f(x) \equiv f^{(p)}(x) \equiv \frac{\partial^p}{\partial x^p} f(x)$
The $1^{st}$ derivative of $f$: $f'(x) \in \mathbb{R}^d$ [gradient vector]
The $2^{nd}$ derivative of $f$: $f''(x) \in \mathbb{R}^{d \times d}$ [Hessian matrix]
### Visual Description
Text-only slide with mathematical notation defining $C_{\beta}^{k,p}(Q)$ and providing notation for derivatives.
---
## Page 9
### Content
## Smoothness

We often use $f \in C_{\beta}^{1,1}(Q)$ and simply say the function $f$ is $\beta$-smooth.

**Definition [smoothness]**
A function $f$ is $\beta$-smooth, if its gradient is Lipschitz continuous with parameter $\beta$, i.e. for any $x, y \in \text{dom}(f)$:
$$||\nabla f(x) - \nabla f(y)|| \le \beta||x - y||$$

**Example**
$f(x) = -\frac{\beta}{2}x^Tx$ (This function is not convex)
$$||\nabla f(x) - \nabla f(y)|| = ||-\beta x - (-\beta y)|| \le \beta||x - y||$$
### Visual Description
The slide defines smoothness based on the Lipschitz continuity of the gradient. It provides the mathematical definition and an example of a quadratic function that is $\beta$-smooth but not convex, demonstrating the gradient Lipschitz condition.
---

## Page 10
### Content
## Homework

Show that the following statements are equivalent (under some conditions, e.g. Hessian matrix exists when needed).

1. $\nabla f$ is Lipschitz continuous with constant $\beta$;
2. $(\nabla f(x) - \nabla f(y))^T(x - y) \le \beta||x - y||^2$ for all $x, y$;
3. $\nabla^2 f(x) \preceq \beta I$ for all $x$;
4. $f(y) \le f(x) + \nabla f(x)^T(y - x) + \frac{\beta}{2}||y - x||^2$ for all $x, y$.
### Visual Description
The slide presents a homework assignment asking to prove the equivalence of four statements related to $\beta$-smoothness, involving the gradient, Hessian, and function inequalities.
---

## Page 11
### Content
## Remarks

**We already know:**
* If $A$ is symmetric, then $||A||_{op} = \rho(A)$.
* Let $A$ be a symmetric matrix. $||A||_{op} \le \beta \Leftrightarrow A \preceq \beta I$.
* $f$ is convex $\Leftrightarrow f(y) \ge f(x) + \nabla f(x)^T(y-x)$ [1st order Taylor is under estimator]
* $f$ is convex $\Leftrightarrow 0 \preceq \nabla^2 f(x) \forall x \in \text{dom}(f)$ [Hessian is PSD]
* $f$ is convex $\Leftrightarrow (\nabla f(x) - \nabla f(y))^T(x - y) \ge 0$. [Gradient is monotone]

**When $f$ is smooth, we can bound the other sides!**
* $\nabla f$ is Lipschitz continuous with constant $\beta$;
* $(\nabla f(x) - \nabla f(y))^T(x - y) \le \beta||x - y||^2$ for all $x, y$;
* $\nabla^2 f(x) \preceq \beta I$ for all $x$;
* $f(y) \le f(x) + \nabla f(x)^T(y - x) + \frac{\beta}{2}||y - x||^2$ for all $x, y$.
### Visual Description
The slide summarizes known properties of symmetric matrices and convex functions, then highlights how these concepts extend to smooth functions by providing upper bounds for similar inequalities.
---

## Page 12
### Content
## 2nd order characterization of smooth functions

**Lemma [2nd order characterization of smooth functions ]**
$f \in C_{\beta}^{2,1}(R^d) \Leftrightarrow ||\nabla^2 f(x)||_{op} \le \beta \quad \forall x \in R^d$
(or equivalently $\nabla^2 f(x) \preceq \beta I$)

Here,
$C_{\beta}^{2,1}(R^d) \equiv \begin{cases} f : R^d \to R \\ f \text{ is 2-times continuously differentiable on } R \\ ||\nabla f(x) - \nabla f(y)|| \le \beta||x - y|| \quad \forall x, y \in R^d \\ \text{(i.e. the 1st derivatives are Lipschitz continuous)} \end{cases}$

**Proof: [Appendix]**
### Visual Description
The slide presents a lemma characterizing smooth functions using their second-order derivatives. It defines the $C_{\beta}^{2,1}(R^d)$ class, stating that a function belongs to this class if its Hessian's operator norm is bounded by $\beta$, which is equivalent to the Hessian being bounded by $\beta I$. The proof is deferred to an appendix.
---

## Page 13
### Content
## Quadratic lower and upper bound

**Theorem [Quadratic lower and upper bound]**
If $f \in C_{\beta}^{1,1}(R^n)$ (i.e. $f$ is $\beta$-smooth), then
$$|f(y) - f(x) - \nabla f(x)^T(y - x)| \le \frac{\beta}{2}||x - y||^2$$

**Proof: [Appendix]**

**Corollary**
If $f$ is $\beta$-smooth (not necessarily convex), then
$$f(x)+\nabla f(x)^T(y-x)-\frac{\beta}{2}||x-y||^2 \le f(y) \le f(x)+\nabla f(x)^T(y-x)+\frac{\beta}{2}||x-y||^2$$
(i.e. $f$ can be lower and upper bounded by a quadratic function)

**Proof:** If $|a - b| \le c$ then $b - c \le a \le c + b$
### Visual Description
The slide introduces a theorem providing a quadratic lower and upper bound for $\beta$-smooth functions. It states that the absolute difference between the function value and its first-order Taylor approximation is bounded by a quadratic term. A corollary then expands this into a two-sided inequality, showing that a $\beta$-smooth function can be bounded by quadratic functions. The proofs are referenced to an appendix.
---

## Page 14
### Content
## Smoothness vs 2nd -order Taylor series

**We already know:**
$$f(y) \le f(x) + \nabla f(x)^T(y - x) + \frac{\beta}{2}||x - y||^2$$

**One might wonder if similar inequality holds with 2nd order Taylor-series approximation:**
$$f(y) \stackrel{?}{\le} f(x) + \nabla f(x)^T(y-x) + \frac{1}{2}(x - y)^T \nabla^2 f(x)(x - y) \quad \forall x, y$$

**This, however, is not true [even if $f$ is convex]**
**Counterexample:** $f(x) = x^4$. Let $x = 0$ in the Taylor-series.
$$y^4 \not\le 0 + 0 + 0 \quad \forall y$$
### Visual Description
The slide contrasts the known quadratic upper bound for smooth functions with a potential, but incorrect, inequality involving a second-order Taylor series approximation. It provides a counterexample using $f(x) = x^4$ at $x=0$ to demonstrate that the second-order Taylor approximation does not necessarily provide an upper bound, even for convex functions.
---

## Page 15
### Content
## Other Bounds for Smooth Differentiable Functions

**We have proved:**
If $f \in C_{\beta}^{1,1}(R^n)$ (i.e. $f$ is $\beta$-smooth), then
$$|f(y) - f(x) - \nabla f(x)^T(y - x)| \le \frac{\beta}{2}||x - y||^2$$

**Similar theorems can also be proved for other smoothness classes:**
If $f \in C_M^{2,2}(R^n)$, (i.e. $||\nabla^2 f(x) - \nabla^2 f(y)||_{op} \le M||x - y|| \quad \forall x,y$)
$$ \begin{cases} ||\nabla f(y) - \nabla f(x) - \nabla^2 f(x)(y-x)|| \le \frac{M}{2}||x - y||^2 \\ |f(y) - f(x) - \nabla f(x)^T(y-x) - \frac{1}{2}(y-x)^T \nabla^2 f(x)(y-x)| \le \frac{M}{6}||x - y||^3 \end{cases} $$
Here we approximate $f$ with a quadratic function and the error term is cubic
### Visual Description
The slide reiterates a previously proven quadratic bound for $\beta$-smooth functions. It then extends the discussion to other smoothness classes, specifically $C_M^{2,2}(R^n)$, where the Hessian is Lipschitz continuous. For this class, it presents two new bounds: one for the gradient difference and another for the function value difference, showing that approximating $f$ with a quadratic function results in a cubic error term.
---

## Page 16
### Content
## Other Bounds on Smooth Differentiable Functions

**Lemma** If $f \in C_M^{2,2}(R^n)$, (i.e. $||\nabla^2 f(x) - \nabla^2 f(y)||_{op} \le M||x - y||$)
and $||x - y|| = r$
then $\nabla^2 f(x) - MrI_n \preceq \nabla^2 f(y) \preceq \nabla^2 f(x) + MrI_n$

**Proof** We need to prove:
Let $G = \nabla^2 f(x) - \nabla^2 f(y)$.
$$ \begin{cases} \nabla^2 f(x) - \nabla^2 f(y) - MrI_n \preceq 0_n \\ 0_n \preceq \nabla^2 f(x) - \nabla^2 f(y) + MrI_n \end{cases} $$
$||\nabla^2 f(x) - \nabla^2 f(y)||_{op} \le M||x - y|| = Mr$
$\Rightarrow |\lambda_i(G)| \le Mr, \forall i = 1,..,n \Rightarrow -Mr \le \lambda_i(G) \le Mr, \forall i = 1, .., n$
$\Rightarrow \begin{cases} 0_n \preceq G + MrI_n \\ G - MrI_n \preceq 0_n \end{cases}$
### Visual Description
The slide presents a lemma for functions in the $C_M^{2,2}(R^n)$ class, stating that if the Hessian is Lipschitz continuous, then the Hessian at $y$ is bounded between two matrices involving the Hessian at $x$ and a term related to the Lipschitz constant $M$ and the distance $r = ||x-y||$. The proof outlines steps using the operator norm definition and eigenvalue properties to derive the matrix inequalities.
---
## Page 17
### Content
Creating Convex Functions with Smooth Functions

**Theorem**
If $f$ is $\beta$-smooth, then the function $\frac{\beta}{2}\|x\|^2 - f(x)$ is convex.

**Proof:** [Appendix]

**Remark**
When $-f(x)$ is convex, then this is trivial, but typically, we would not expect $-f(x)$ to be convex just because $f$ is $\beta$-smooth.
### Visual Description
Text-only slide.
---
## Page 18
### Content
Example: Smoothness of Quadratic Functions

Let $f(x) = x^T Qx + a^T x + b$ where $Q \succeq 0$.

[Reminder from HW: $\nabla f$ is Lipschitz continuous with constant $\beta \Leftrightarrow \nabla^2 f(x) \preceq \beta I$.]

We can prove that function $f$ has Hessian $2Q$, and consequently, it satisfies smoothness for any $\beta \ge 2\lambda_{\max}(Q)$ (i.e. twice the largest eigenvalue of $Q$).
### Visual Description
Text-only slide.
---
## Page 19
### Content
Examples

$f(x) = \alpha + a^T x \in C_0^{1,1}(\mathbb{R}^d)$

$f(x) = \alpha + a^T x + \frac{1}{2} x^T A x \in C_L^{2,1}(\mathbb{R}^d)$, with $L = \|A\|$

$f(x) = \sqrt{1 + x^2} \in C_1^{1,1}(\mathbb{R})$
### Visual Description
Text-only slide with three mathematical examples of functions belonging to different smoothness classes.
---
## Page 20
### Content
k-Times Differentiable, Convex Functions, $\mathcal{F}^k(Q)$
### Visual Description
Title slide.
---
## Page 21
### Content
k-Times Differentiable Convex Functions, $\mathcal{F}^k(Q)$

We already introduced this:
$C^k(Q) = \begin{cases} \star f : Q \to \mathbb{R} \\ \star f \text{ is k-times continuously differentiable on } Q \subseteq \mathbb{R}^N \end{cases}$

**Definition [k times (continuously) differentiable convex function]**
$\mathcal{F}^k(Q) = \begin{cases} \star f : Q \to \mathbb{R} \\ \star f \text{ is k-times continuously differentiable on } Q \subseteq \mathbb{R}^n \\ \star f \text{ is convex function i.e. } f(y) \ge f(x) + \nabla f(x)^T(y-x), \forall x, y \end{cases}$
### Visual Description
Text-only slide with definitions for $C^k(Q)$ and $\mathcal{F}^k(Q)$.
---
## Page 22
### Content
Properties of Differentiable Convex Functions

**Lemma [convex cone of k times differentiable convex functions]**
$\mathcal{F}^k(Q)$ is a convex cone, i.e. if $f_1, f_2 \in \mathcal{F}^k(Q)$, $\alpha, \beta \ge 0$, then
$f = \alpha f_1 + \beta f_2 \in \mathcal{F}^k(Q)$

**Proof**
$f_1(y) \ge f_1(x) + \nabla f_1(x)^T(y-x), \forall x, y$
$f_2(y) \ge f_2(x) + \nabla f_2(x)^T(y-x), \forall x, y$
$\Rightarrow f(y) = \alpha f_1(y) + \beta f_2(y) \ge \alpha(f_1(x) + \nabla f_1(x)^T(y-x))$
$\quad +\beta(f_2(x) +\nabla f_2(x)^T(y-x)), \forall x, y$
$\quad = f(x) +\nabla f(x)^T(y-x), \forall x, y$
Therefore, $f = \alpha f_1 + \beta f_2$ is a convex function. $\blacksquare$
### Visual Description
Text-only slide presenting a lemma about convex cones of differentiable convex functions and its proof.
---
## Page 23
### Content
Special Case

$\mathcal{F}^1(\mathbb{R}^d) = \begin{cases} \star f : \mathbb{R}^d \to \mathbb{R} \\ \star f \text{ is continuously differentiable on } \mathbb{R}^d \\ \star f \text{ is convex function i.e. } f(y) \ge f(x) + \nabla f(x)^T(y-x), \forall x, y \end{cases}$

**Theorem**
If $f \in \mathcal{F}^1(\mathbb{R}^d)$ and $\nabla f(x^*) = 0$ then $x^*$ is the global minimum of $f$ on $\mathbb{R}^d$.

**Proof**
By definition of convexity, $f(y) \ge f(x) + \nabla f(x)^T(y-x), \forall x, y$
$f(y) \ge f(x^*) + \nabla f(x^*)^T(y-x^*), \forall y$
$f(y) \ge f(x^*), \forall y$ $\blacksquare$
### Visual Description
Text-only slide defining $\mathcal{F}^1(\mathbb{R}^d)$ and presenting a theorem about global minima for functions in this class, along with its proof.
---
## Page 24
### Content
Properties of Differentiable Convex Functions

**Theorem [Differentiable, convex function composition with linear function]**
If $f \in \mathcal{F}^1(\mathbb{R}^m)$, $b \in \mathbb{R}^m$, $A \in \mathbb{R}^{n \times m}$, then $\phi(x) = f(Ax+b) \in \mathcal{F}^1(\mathbb{R}^n)$

**Proof:** [Appendix]
### Visual Description
Text-only slide presenting a theorem about the composition of a differentiable convex function with a linear function.
---
## Page 25
### Content
Alternative defs for convex differentiable functions

$$
\mathcal{F}^1(\mathbb{R}^d) = \left\{
\begin{array}{ll}
\star & f: \mathbb{R}^d \to \mathbb{R} \\
\star & f \text{ is continuously differentiable on } \mathbb{R}^d \\
\star & f \text{ is convex function i.e. } f(y) \ge f(x) + \nabla f(x)^T(y-x), \forall x, y
\end{array}
\right.
$$

**Theorem [Alternative definition 1]**
Let $f$ be continuously differentiable on $\mathbb{R}^d$
$f \in \mathcal{F}^1(\mathbb{R}^d) \Leftrightarrow f(\theta x + (1 - \theta)y) \le \theta f(x) + (1-\theta)f(y) \quad \forall x, y, \forall \theta \in [0, 1]$.

**Proof: [Appendix]**
### Visual Description
The slide defines the class of continuously differentiable convex functions, $\mathcal{F}^1(\mathbb{R}^d)$, using three conditions. It then presents Theorem [Alternative definition 1], which states an equivalence for $f \in \mathcal{F}^1(\mathbb{R}^d)$ based on the standard definition of convexity. The bottom left corner shows "Slide 25" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 26
### Content
Alternative defs for convex differentiable functions

**Theorem [Alternative definition 2, monotone gradients]**
Let $f$ be continuously differentiable on $\mathbb{R}^d$
$f \in \mathcal{F}^1(\mathbb{R}^d) \Leftrightarrow (f'(x) - f'(y))^T(x - y) \ge 0 \quad \forall x, y$.

**Proof: [Appendix]**
### Visual Description
The slide presents Theorem [Alternative definition 2, monotone gradients], which provides an equivalent condition for a continuously differentiable function $f$ to be in $\mathcal{F}^1(\mathbb{R}^d)$, based on the monotonicity of its gradient. The bottom left corner shows "Slide 26" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 27
### Content
Alternative defs for convex differentiable functions

**Theorem [Alternative definition 3, twice differentiable functions]**
Let $f$ be twice continuously differentiable on $\mathbb{R}^d$
$f \in \mathcal{F}^2(\mathbb{R}^d) \Leftrightarrow f''(x) \ge 0, \forall x \in \mathbb{R}^n$

**Proof: [Appendix]**
### Visual Description
The slide presents Theorem [Alternative definition 3, twice differentiable functions], which provides an equivalent condition for a twice continuously differentiable function $f$ to be in $\mathcal{F}^2(\mathbb{R}^d)$, based on its second derivative (Hessian) being positive semi-definite. The bottom left corner shows "Slide 27" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 28
### Content
Beta-smooth,
k-Times Continuously Differentiable,
Convex Functions

$\mathcal{F}_\beta^{k,p}(Q)$
### Visual Description
The slide introduces a new class of functions with a title "Beta-smooth, k-Times Continuously Differentiable, Convex Functions" in large blue text. Below the title, the notation $\mathcal{F}_\beta^{k,p}(Q)$ is displayed in red. The bottom left corner shows "Slide 28" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 29
### Content
Smooth, k-Times Differentiable Convex Functions: $\mathcal{F}_\beta^{k,p}(Q)$

**Definition [Smooth, k times (continuously) differentiable convex function]**
$$
\mathcal{F}_\beta^{k,p}(Q) = \left\{
\begin{array}{ll}
f : \mathbb{R}^d \supseteq Q \to \mathbb{R} \\
f \text{ is k-times continuously differentiable on } \mathbb{R} \\
f \text{ is convex} \\
p \le k \\
\| f^{(p)}(x) - f^{(p)}(y) \| \le \beta \|x - y \| \quad \forall x, y \in Q
\end{array}
\right.
$$
(i.e. the $p^{th}$ derivatives are Lipschitz continuous)
### Visual Description
The slide defines the class of "Smooth, k-Times Differentiable Convex Functions", denoted as $\mathcal{F}_\beta^{k,p}(Q)$. The definition lists five conditions for a function to belong to this class, including being k-times continuously differentiable, convex, and having its $p^{th}$ derivative be Lipschitz continuous with constant $\beta$. The bottom left corner shows "Slide 29" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 30
### Content
Smooth, k-Times Differentiable Convex Functions: $\mathcal{F}_\beta^{k,p}(Q)$

**Theorem [Alternative definitions for smooth, convex, differentiable functions]**
Let $f$ be continuously differentiable on $\mathbb{R}^d$
$$
f \in \mathcal{F}_\beta^{1,1}(\mathbb{R}^d) \Leftrightarrow 0 \le f(y) - f(x) - f'(x)^T(y - x) \le \frac{\beta}{2} \|x - y\|^2 \quad \forall x, y.
$$
$$
\Leftrightarrow f(x) + f'(x)^T(y-x) + \frac{1}{2\beta} \|f'(x) - f'(y)\|^2 \le f(y)
$$
$$
\Leftrightarrow \frac{1}{\beta} \|f'(x) - f'(y)\|^2 \le (f'(x) - f'(y))^T(x - y)
$$

**Proof: [Appendix]**
### Visual Description
The slide presents a theorem with alternative definitions for smooth, convex, and differentiable functions, specifically for the class $\mathcal{F}_\beta^{1,1}(\mathbb{R}^d)$. It lists three equivalent conditions involving the function value, its gradient, and the Lipschitz constant $\beta$. The bottom left corner shows "Slide 30" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 31
### Content
Smooth, k-Times Differentiable Convex Functions: $\mathcal{F}_\beta^{k,p}(Q)$

**Theorem [Alternative definitions for smooth, convex, differentiable functions]**
Let $f$ be continuously differentiable on $\mathbb{R}^d$
$$
f \in \mathcal{F}_\beta^{1,1}(\mathbb{R}^d) \Leftrightarrow \theta f(x) + (1 - \theta)f(y) \ge f(\theta x + (1 - \theta)y) + \frac{\theta(1 - \theta)}{2\beta} \|f'(x) - f'(y)\|^2
$$

**Proof: [Appendix]**
### Visual Description
The slide continues with a theorem providing an alternative definition for smooth, convex, and differentiable functions in the class $\mathcal{F}_\beta^{1,1}(\mathbb{R}^d)$. This definition involves a convexity-like inequality with an additional term related to the gradient difference and the Lipschitz constant $\beta$. The bottom left corner shows "Slide 31" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 32
### Content
Smooth, k-Times Differentiable Convex Functions: $\mathcal{F}_\beta^{k,p}(Q)$

**Theorem [Alternative definition 3, twice differentiable functions]**
Let $f$ be twice continuously differentiable on $\mathbb{R}^d$
$$
f \in \mathcal{F}_\beta^{2,1}(\mathbb{R}^d) \Leftrightarrow 0 \le f''(x) \le \beta I_d, \forall x \in \mathbb{R}^n
$$

**Proof: [Appendix]**
### Visual Description
The slide presents Theorem [Alternative definition 3, twice differentiable functions] for the class $\mathcal{F}_\beta^{2,1}(\mathbb{R}^d)$. It states that a twice continuously differentiable function $f$ belongs to this class if and only if its Hessian $f''(x)$ is bounded between the zero matrix and $\beta$ times the identity matrix. The bottom left corner shows "Slide 32" and the bottom right has the "Carnegie Mellon University" logo.
---
## Page 33
### Content
## Smooth Convex Functions
**We already know:**
If $f$ is $\beta$-smooth, then there is a quadratic upper bound on the function:
$f(y) \le f(x) + \nabla f(x)^T(y - x) + \frac{\beta}{2}\|y - x\|^2$

**Implications:**
* We already know that convex functions always lie **above** their tangent lines.
* This quadratic upper bound implies that smooth convex functions always lie **below** a parabola that passes through the point $(x, f(x))$.

**Example: [Non-smooth convex function]**
$f(x) = |x|$ is convex but not $\beta$-smooth for any $\beta$.
(at $x = 0$ we cannot upper bound it with a quadratic function.)
### Visual Description
Slide with a main title "Smooth Convex Functions". It presents a known property of $\beta$-smooth functions with a mathematical inequality. Below, it lists two implications using bullet points. Finally, it provides an example of a non-smooth convex function, $f(x) = |x|$, and explains why it's not $\beta$-smooth.
---
## Page 34
### Content
## Strongly Convex Functions
### Visual Description
Title slide with "Strongly Convex Functions" centered on a white background.
---
## Page 35
### Content
## Strong Convexity
**The twin assumption to smoothness is strong convexity.**

**Definition [strong convexity]**
A function $f$ is $\alpha$-strongly convex, if the function
$g(x) = f(x) - \frac{\alpha}{2}\|x\|^2$ is convex.

**Lemma [strong convexity]**
$f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$

Strongly convex functions always lie above a parabola that passes through the point $(x, f(x))$
### Visual Description
Slide defining strong convexity. It starts with a general statement, then provides a formal definition with a mathematical expression for $g(x)$. A lemma for strong convexity is presented with an inequality. The slide concludes with a textual explanation of what the lemma implies visually.
---
## Page 36
### Content
## Smoothness vs 2nd-order Taylor series
**We already know:**
If $f$ is $\alpha$-strongly convex, then
$f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$

**One might wonder if similar inequality holds with 2nd order Taylor-series approximation:**
$f(y) \stackrel{?}{\ge} f(x) + \nabla f(x)^T(y - x) + \frac{1}{2}(x - y)^T \nabla^2 f(x)(x - y) \quad \forall x,y$

**This, however, is not true. [We can create a 1D counterexample]**
### Visual Description
Slide comparing strong convexity with 2nd-order Taylor series. It reiterates the strong convexity inequality. Then, it poses a question about whether a similar inequality holds for the 2nd-order Taylor approximation, showing the Taylor expansion with a question mark. It explicitly states that this is not true and a 1D counterexample can be created.
---
## Page 37
### Content
## Properties of Strongly Convex Functions
**Zeroth order property of strongly convex functions:**
$f(tx + (1 - t)y) \le tf(x) + (1-t)f(y) - \frac{\alpha}{2}t(1-t)\|x - y\|^2$

**First order property:**
$(\nabla f(x) - \nabla f(y))^T(x - y) \ge \alpha\|x - y\|^2$

**An equivalent 1st order definition:**
$f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$

**Second order strongly convex function:**
$\nabla^2 f(x) \ge \alpha I$ for all $x$ in the domain

**Lemma:** A strongly convex function is also strictly convex, but not vice-versa.
### Visual Description
Slide listing various properties of strongly convex functions. It presents zeroth, first, and second-order properties, each with a corresponding mathematical inequality. An equivalent first-order definition is also provided. The slide concludes with a lemma stating the relationship between strongly convex and strictly convex functions.
---
## Page 38
### Content
## HW
**Show that the following statements are equivalent.**
1. $f$ is strongly convex with constant $\alpha$;
2. $(\nabla f(x) - \nabla f(y))^T(x - y) \ge \alpha\|x - y\|^2$ for all $x, y$;
3. $\nabla^2 f(x) \ge \alpha I$ for all $x$;
4. $f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$ for all $x, y$.
### Visual Description
Homework slide. It presents a task to show the equivalence of four statements related to strong convexity, each statement given as a numbered point with mathematical expressions.
---
## Page 39
### Content
## Strongly convex + Lipschitz smooth
A twice differentiable function $f$ having $\beta$ Lipschitz continuous gradient and being $\alpha$ strongly convex can be summarized as:
$\alpha I \le \nabla^2 f(x) \le \beta I$ for all $x \in \mathbb{R}^n$,
for constants $0 < \alpha < \beta$
### Visual Description
Slide describing functions that are both strongly convex and Lipschitz smooth. It provides a textual description followed by a single mathematical inequality that summarizes these two properties for a twice differentiable function.
---
## Page 40
### Content
## Examples
**Lemma:** $f(x) = |x|$: convex, not strictly convex, not strongly convex

**Proof:**
Let us prove that it is not strongly convex:
$f(y) \stackrel{?}{\ge} f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$

Consider $x = 1, y = 2$
$f(y) - (f(x) + \nabla f(x)^T(y - x)) = 2 - (1 + 1(2 - 1)) = 0$

Therefore,
if $f(y)\ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}\|y - x\|^2$, then
$\alpha = 0$.
### Visual Description
Slide presenting an example and a proof. It starts with a lemma stating that $f(x) = |x|$ is convex but not strictly or strongly convex. The proof then attempts to show it's not strongly convex by testing the strong convexity inequality. It uses specific values for $x$ and $y$ to demonstrate that the inequality only holds if $\alpha = 0$, thus proving it's not strongly convex for any $\alpha > 0$.
---
## Page 41
### Content
## Examples
### Lemma
Let $f(x) = x^T Qx + a^T x + b$ where $Q \ge 0$.
$f$ is strongly convex iff $\alpha \le 2\lambda_{min}(Q)$
### Visual Description
Text-only slide.
---
## Page 42
### Content
## Strict vs Strong Convexity
Strict convexity is a "weakening" of strong convexity
### Definition [Strictly convex]
A function $f:\mathbb{R}^n \to \mathbb{R}$ is strictly convex if and only if:
* $\text{dom}(f)$ is convex
* $f(\theta x + (1 - \theta)y) < \theta f(x) + (1 - \theta)f(y) \quad \forall x \ne y \in \text{Dom}(f)$
[Instead of $f(\theta x+(1-\theta)y) \le \theta f(x)+(1-\theta)f(y)-\frac{1}{2}\alpha\theta(1-\theta)||x-y||^2$]
### Visual Description
Text-only slide.
---
## Page 43
### Content
## Strict vs Strong Convexity
### Lemma [first order characterization of strictly convex functions]
A function $f:\mathbb{R}^n \to \mathbb{R}$ is strictly convex if and only if:
* $\text{dom}(f)$ is convex
* $f(y) > f(x) + \nabla f(x)^T(y - x)$, for any $x \ne y$.
[Instead of $f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}||y - x||^2$]
### Visual Description
Text-only slide.
---
## Page 44
### Content
## Strict vs Strong Convexity
Interestingly the second-order characterization doesn't work in the expected way,
i.e we can't say that
A function $f:\mathbb{R}^n \to \mathbb{R}$ is strictly convex if and only if:
* $\text{dom}(f)$ is convex
* $\nabla^2 f(x) > 0$.
[Instead of $\nabla^2 f(x) \ge 0$]
We can create twice-differentiable, strictly convex functions which
don't satisfy the condition that $\nabla^2 f(x) > 0$.
### Lemma
$f(x) = x^4$: convex, strictly convex, not strongly convex, $\nabla^2 f(0) \ne 0$.
### Visual Description
Text-only slide.
---
## Page 45
### Content
## Summary
### Visual Description
The slide contains only the title "Summary" in the center.
---
## Page 46
### Content
## Smooth vs Strongly Convex
If $f \in C_{\beta}^{1,1}(\mathbb{R}^n)$ (i.e. $f$ is $\beta$-smooth), then $\frac{\beta}{2}||x||^2 - f(x)$ is convex.
If $f \in S_{\alpha}(\mathbb{R}^n)$ (i.e. $f$ is $\alpha$-strongly convex), then
$f(x) - \frac{\alpha}{2}||x||^2$ is convex.
### Visual Description
Text-only slide.
---
## Page 47
### Content
## Smoothness, Convexity, Strong-Convexity
vs Zero order Properties
$\forall x, y, \forall \theta \in [0, 1]$, we have that
$f(\theta x + (1 - \theta)y) \le \theta f(x) + (1 - \theta)f(y) \quad [\Leftrightarrow f \text{ is convex}]$
$f(\theta x + (1 - \theta)y) \le \theta f(x) + (1 - \theta)f(y) - \frac{\alpha}{2}\theta(1 - \theta) ||x - y||^2 \quad [\Leftrightarrow f \text{ is } \alpha\text{-strongly convex}]$
### Visual Description
Text-only slide.
---
## Page 48
### Content
## Smoothness, Convexity, Strong-Convexity
vs First order and Quadratic bounds
$f(x)+\nabla f(x)^T(y-x)-\frac{\beta}{2}||x-y||^2 \le f(y) \le f(x)+\nabla f(x)^T(y-x)+\frac{\beta}{2}||x-y||^2 \quad \Leftrightarrow f \in C_{\beta}^{1,1}(\mathbb{R}^n) \text{ (i.e. } f \text{ is } \beta\text{-smooth)}$
$f(x)+\nabla f(x)^T(y - x) \le f(y) \quad \Leftrightarrow f \in \mathcal{F}^1(\mathbb{R}^d) \text{ [i.e. } f \text{ is convex]}$
$f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2}||y - x||^2 \le f(y) \quad \Leftrightarrow f \in S_{\alpha}(\mathbb{R}^d) \text{ [i.e. } f \text{ is strongly convex]}$
### Visual Description
Text-only slide.
---
## Page 49
### Content
Smoothness, Convexity, Strong-Convexity vs Monotonicity of the Gradients

$(f'(x) – f'(y))^T(x - y) \le \beta||x - y||^2 \Leftrightarrow f \in C_{\beta}^{1,1}(\mathbb{R}^n)$ (i.e. $f$ is $\beta$-smooth)

$0 \le (f'(x) – f'(y))^T(x - y) \Leftrightarrow f \in \mathcal{F}^1(\mathbb{R}^d)$ [i.e. $f$ is convex]

$\alpha||x - y||^2 \le (f'(x) – f'(y))^T(x - y) \Leftrightarrow f \in \mathcal{S}_{\alpha}(\mathbb{R}^d)$ [i.e. $f$ is strongly convex]
### Visual Description
A slide with a title at the top. Below the title, there are three lines of mathematical equivalences, each on its own line. The left side of each equivalence describes a property related to the gradient, and the right side describes a function class or property.
---
## Page 50
### Content
Smoothness, Convexity, Strong-Convexity vs Hessian

$f''(x) \le \beta I_d \Leftrightarrow f \in C_{\beta}^{2,1}(\mathbb{R}^n)$ (i.e. $f$ is $\beta$-smooth)

$0 \le f''(x) \Leftrightarrow f \in \mathcal{F}^2(\mathbb{R}^d)$ [i.e. $f$ is convex]

$\alpha I_d \le f''(x) \Leftrightarrow f \in \mathcal{S}_{\alpha}(\mathbb{R}^d)$ [i.e. $f$ is strongly convex]
### Visual Description
A slide with a title at the top. Below the title, there are three lines of mathematical equivalences, each on its own line. The left side of each equivalence describes a property related to the Hessian, and the right side describes a function class or property.
---
## Page 51
### Content
Credits
Some of the contents have been taken from:
* Ryan Tibshirani
* Sivaraman Balakrishnan
### Visual Description
Text-only slide.
---
## Page 52
### Content
Attic
### Visual Description
A slide with only the title "Attic" at the top. The rest of the slide is blank.
---
## Page 53
### Content
Properties of Smooth, Differentiable Functions

**Lemma [Linear combinations]**
$f_1 \in C_{L_1}^{k,p}(Q)$
$f_2 \in C_{L_2}^{k,p}(Q)$
$\alpha, \beta \in \mathbb{R}$
$L_3 = |\alpha|L_1 + |\beta|L_2$
$\Rightarrow \alpha f_1 + \beta f_2 \in C_{L_3}^{k,p}(Q)$

**Lemma [Class hierarchy]**
If $q \ge r$, then $C_L^{q,p}(Q) \subseteq C_L^{r,p}(Q)$
e.g. $C_L^{2,1}(Q) \subseteq C_L^{1,1}(Q)$
### Visual Description
A slide with a title at the top. Below the title, there are two lemmas. The first lemma, "Linear combinations", lists several conditions and an implication, enclosed by a large curly brace on the left. The second lemma, "Class hierarchy", states a general rule and provides an example.
---
