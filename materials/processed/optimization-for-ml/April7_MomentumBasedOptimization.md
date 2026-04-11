# April7_MomentumBasedOptimization

Source: `materials/archive/April7_MomentumBasedOptimization.pdf`
Duplicate equivalents: `April7_MomentumBasedOptimization.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 48

## Page 1
### Content
Distributed optimization for n... - 24 (50%)
ADMM and Augmented Lagr... - 5 (10.4%)
Zeroth order optimization 1:... - 26 (54.2%)
Zeroth order optimization 2:... - 17 (35.4%)
Lower bounds on convergen... - 12 (25%)
Conjugate gradient, Quasi-N... - 6 (12.5%)
Optimization for Reinforcem... - 24 (50%)
Game theory, minimax probl... - 18 (37.5%)
Optimization over trees: XG... - 24 (50%)
Online optimization, Bandit c... - 14 (29.2%)
Variance reduction in SGD - 11 (22.9%)
Mirror descent, f-divergences - 7 (14.6%)
Proofs from the Appendix th... - 7 (14.6%)
### Visual Description
A horizontal bar chart displaying the distribution of topics. Each bar represents a topic (e.g., "Distributed optimization for n...", "ADMM and Augmented Lagr...", "Zeroth order optimization 1:...", etc.) and its length corresponds to a count, with the percentage shown in parentheses. The x-axis ranges from 0 to 30.
---
## Page 2
### Content
# Optimization for Machine Learning
## Adaptive and Momentum based Optimization Methods

Barnabas Poczos
bapoczos@cs.cmu.edu
### Visual Description
Text-only slide.
---
## Page 3
### Content
# Gradient Descent
Consider unconstrained minimization of $f : \mathbb{R}^D \to \mathbb{R}$, differentiable. We want to solve
$$ \min_{x \in \mathbb{R}^D} f(x), $$
i.e., find $x^*$ such that $f(x^*) = \min_x f(x)$

**Gradient descent**: choose initial $x^{(0)} \in \mathbb{R}^D$, repeat:
$$ x^{(k)} = x^{(k-1)} - \eta_k \cdot \nabla f(x^{(k-1)}), \quad k = 1,2,3,... $$
Stop at some point
Here $\eta_k$ is the step size at iteration $k$.
### Visual Description
Text-only slide with mathematical equations.
---
## Page 4
### Content
# Fixed step size can be too big
Simply using $\eta_k = \eta$ constant for all iterations $k = 1, 2, 3, ...$, can diverge if $\eta$ is too big.

Consider $f(x) = (10x_1^2 + x_2^2)/2$, gradient descent after 8 steps:
### Visual Description
A contour plot showing the path of gradient descent for the function $f(x) = (10x_1^2 + x_2^2)/2$. The contours are elliptical. The gradient descent path starts at an initial point and oscillates wildly, moving away from the optimal point (marked with an asterisk) due to a large step size, indicating divergence. The x and y axes range from -20 to 20.
---
## Page 5
### Content
# Fixed step size can be too small
Can be slow if $\eta$ is too small. Same example, gradient descent after 100 steps:
### Visual Description
A contour plot showing the path of gradient descent for the function $f(x) = (10x_1^2 + x_2^2)/2$. The contours are elliptical. The gradient descent path starts at an initial point and slowly converges towards the optimal point (marked with an asterisk) along a narrow, elongated path, indicating slow progress due to a small step size. The x and y axes range from -20 to 20.
---
## Page 6
### Content
# Sum of loss functions, Empirical Risk Minimization
$$ F(\theta) = \frac{1}{m} \sum_{i=1}^m (y^{(i)} - f_\theta (x^{(i)}))^2 $$
$$ = \frac{1}{m} \sum_{i=1}^m f_i(\theta) \quad \text{where } f_i(\theta) = (y^{(i)} - f_\theta (x^{(i)}))^2 $$
**Gradient descent:**
Vanilla gradient descent, aka batch gradient descent (GD), computes the gradient of the cost function w.r.t. to the parameters for the entire training dataset:
$$ \theta_+ = \theta - \eta \nabla F(\theta) $$
$$ = \theta - \eta \nabla_\theta \left[ \frac{1}{m} \sum_{i=1}^m (y^{(i)} - f_\theta (x^{(i)}))^2 \right] $$
### Visual Description
Text-only slide with mathematical equations.
---
## Page 7
### Content
# Batch gradient descent (GD)
**Algorithm GD**
Input: $\theta^0 \in \mathbb{R}^D$, Step-size: $\eta > 0$
for $t = 0$ to $T - 1$ do
$$ \theta^t = \theta^{t-1} - \eta \nabla F(\theta^{t-1}) $$
$$ = \theta^{t-1} - \eta \nabla_\theta \left[ \frac{1}{m} \sum_{i=1}^m (y^{(i)} - f_\theta (x^{(i)}))^2 \right] $$
end for
### Visual Description
Text-only slide presenting an algorithm in pseudocode format, including mathematical expressions for the update rule.
---
## Page 8
### Content
# Stochastic gradient descent (SGD)
Stochastic gradient descent (SGD) in contrast performs a parameter update for each training example $x^{(i)}$ and label $y^{(i)}$:
$$ F(\theta) = \frac{1}{m} \sum_{i=1}^m f_i(\theta) $$
$$ \theta_+ = \theta - \eta \nabla_\theta f_i(\theta) \quad \text{where } i \sim U[1,...,m] $$
$$ = \theta - \eta \nabla_\theta [(y^{(i)} - f_\theta(x^{(i)}))^2] $$

**Algorithm SGD**
Input: $\theta^0 \in \mathbb{R}^d$, Step-size sequence: $\{\eta_t > 0\}_{t=0}^{T-1}$
for $t = 0$ to $T - 1$ do
  $i_t \sim U[1,...,m]$ (Uniformly randomly pick $i_t$ from $\{1,...,m\}$)
  $\theta^t = \theta^{t-1} - \eta_t \nabla f_{i_t}(\theta^{t-1})$
end for
### Visual Description
Text-only slide presenting an algorithm in pseudocode format, including mathematical expressions for the update rule.
---
## Page 9
### Content
# Momentum Based Methods
### Visual Description
A title slide with the text "Momentum Based Methods" centered in a red banner against a white background.
---
## Page 10
### Content
# Polyak's Momentum method

*   SGD has trouble navigating areas where the surface curves much more steeply in one dimension than in another.
*   In these scenarios, SGD oscillates across the slopes making only slow progress toward the optimum.
*   Momentum method dampens the oscillation by adding a fraction of the update vector of the past time step to the current update vector
    $v_{t-1} = \theta_{t-1} - \theta_t$ past change from $\theta_{t-1}$ to $\theta_t$
    $v_t = \gamma v_{t-1} + \eta \nabla_\theta F(\theta_t)$ new change from $\theta_t$ to $\theta_{t+1}$
    $\Rightarrow \theta_{t+1} = \theta_t - v_t = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t)$
Source: Genevieve B. Orr
### Visual Description
Two contour plots are shown side-by-side. Both plots have concentric ellipses representing the loss surface, with an 'Optimum' point at the center.
(a) "SGD without momentum" shows a path starting from a 'Starting Point' and oscillating significantly across the contours as it slowly approaches the 'Solution' near the optimum.
(b) "SGD with momentum" shows a path starting from a 'Starting Point' that moves more directly and smoothly towards the 'Solution' near the optimum, with much less oscillation.
---
## Page 11
### Content
# Polyak's Momentum method

$v_{t-1} = \theta_{t-1} - \theta_t$ past direction
$v_t = \gamma v_{t-1} + \eta \nabla_\theta F(\theta_t)$ new direction
$\theta_{t+1} = \theta_t - v_t = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t)$

$v_t = \theta_t - \theta_{t+1}$

The update rules can be rewritten:
$\theta_{t+1} = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t)$
$= \theta_t - \gamma(\theta_{t-1} - \theta_t) - \eta \nabla_\theta F(\theta_t)$
$\Rightarrow \theta_{t+1} = \theta_t - \eta \nabla_\theta F(\theta_t) + \gamma(\theta_t - \theta_{t-1})$
### Visual Description
Text-only slide, with a blue arrow pointing from the equation $\theta_{t+1} = \theta_t - v_t$ to the equation $v_t = \theta_t - \theta_{t+1}$.
---
## Page 12
### Content
# Polyak Momentum method

Polyak momentum $\theta_{t+1} = \theta_t - \eta \nabla_\theta F(\theta_t) + \gamma(\theta_t - \theta_{t-1})$

A cheap way to potentially improve gradient descent

**Intuition:**
If the current gradient step $(-\nabla_\theta F(\theta_t))$ is in the same direction as the previous step $(\theta_t - \theta_{t-1})$, then move a little further in that direction; if not, move less far.

Also known as the **heavy ball method**
Polyak '64
### Visual Description
Two contour plots are displayed side-by-side, illustrating optimization paths.
The left plot, labeled "Without momentum", shows a path starting from a 'Starting Point' that oscillates significantly across the elliptical contours before reaching the 'Solution' near the 'Optimum'.
The right plot, labeled "With momentum", shows a path starting from a 'Starting Point' that moves more smoothly and directly towards the 'Solution' near the 'Optimum', exhibiting less oscillation.
---
## Page 13
### Content
# Nesterov's Accelerated Gradient (NAG)

**Momentum method:**
$v_t = \gamma v_{t-1} + \eta \nabla_\theta F(\theta_t)$
$\theta_{t+1} = \theta_t - v_t = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t)$

In the momentum method, we move to $\theta_t - \gamma v_{t-1}$ and then correct this with the gradient at $\theta_t, \eta \nabla_\theta F(\theta_t)$.

**NAG method [Nesterov '83]**
In NAG, we use this new location when calculating the gradient.
$v_t = \gamma v_{t-1} + \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$
$\theta_{t+1} = \theta_t - v_t = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$

Source: Hinton's lecture
### Visual Description
A vector diagram illustrating the steps of the Momentum update and the NAG update, starting from a point $\theta_t$.
- A blue arrow represents $-\gamma v_{t-1}$.
- From the end of the blue arrow, a brown arrow represents $-\eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$, leading to the NAG update point $\theta_{t+1}$.
- For comparison, a red arrow originating from $\theta_t$ represents $-\eta \nabla_\theta F(\theta_t)$, which, when combined with the blue arrow, would lead to the Momentum update point $\theta_{t+1}$.
Labels indicate "Momentum update: $\theta_{t+1} = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t)$" and "NAG update: $\theta_{t+1} = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$".
---
## Page 14
### Content
# Nesterov's Accelerated Gradient (NAG)

$v_t = \gamma v_{t-1} + \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$
$\theta_{t+1} = \theta_t - v_t = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$

$v_t = \theta_t - \theta_{t+1}$
$v_{t-1} = \theta_{t-1} - \theta_t$

$\theta_{t+1} = \theta_t - \gamma v_{t-1} - \eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$
$= \theta_t - \gamma(\theta_{t-1} - \theta_t) - \eta \nabla_\theta F(\theta_t - \gamma(\theta_{t-1} - \theta_t))$
$= \theta_t - \eta \nabla_\theta F(\theta_t + \gamma(\theta_t - \theta_{t-1})) + \gamma(\theta_t - \theta_{t-1})$

A "look-ahead" variant of Polyak's momentum
### Visual Description
Text-only slide, with a blue arrow pointing from the term $\eta \nabla_\theta F(\theta_t - \gamma v_{t-1})$ in the second equation to the text "evaluate gradient at a 'look-ahead' point".
---
## Page 15
### Content
# Nesterov's Accelerated Gradient (NAG)

**Polyak's Momentum**
$x_{t+1} = x_t - \eta \nabla_\theta F(x_t) + \gamma(x_t - x_{t-1})$
$x_2 = x_1 - \eta \nabla_\theta F(x_1) + \gamma(x_1 - x_0)$

**Nesterov Momentum**
$x_{t+1} = x_t - \eta \nabla_\theta F(x_t + \gamma(x_t - x_{t-1})) + \gamma(x_t - x_{t-1})$
$x_2 = x_1 - \eta \nabla_\theta F(x_1 + \gamma(x_1 - x_0)) + \gamma(x_1 - x_0)$
### Visual Description
Two diagrams are presented side-by-side, illustrating the update steps for Polyak's Momentum and Nesterov Momentum on a contour plot. Both diagrams show elliptical contours, a starting point $x_0$, an intermediate point $x_1$, a target optimum $x^*$, and the next step $x_2$.

**Left (Polyak's Momentum):**
- Shows a vector $x_1 + \gamma(x_1 - x_0)$ which is a "momentum" step from $x_1$.
- From $x_1$, a dashed green arrow represents $-\eta \nabla_\theta F(x_1)$, indicating the gradient at the current point.
- The final step $x_2$ is calculated by adding the gradient at $x_1$ to the momentum step.

**Right (Nesterov Momentum):**
- Shows a vector $x_1 + \gamma(x_1 - x_0)$ which is a "momentum" step from $x_1$.
- From the *end* of this momentum step (the "look-ahead" point), a dashed green arrow represents $-\eta \nabla_\theta F(x_t + \gamma(x_t - x_{t-1}))$, indicating the gradient evaluated at the look-ahead point.
- The final step $x_2$ is calculated by adding this "look-ahead" gradient to the momentum step.
---
## Page 16
### Content
# Convergence Rate of NAG

**Theorem [NAG convergence rate, convex case]**
Let $f$ be a convex and $\beta$-smooth function (i.e. has an $\beta$-Lipschitz continuous gradient)

Then Nesterov's accelerated gradient descent satisfies
$$f(x_k) - f(x^*) \le O\left(\frac{\beta\|x_0 - x^*\|^2}{2k^2}\right)$$
### Visual Description
Text-only slide.
---
## Page 17
### Content
## Convergence Rate of NAG

**Theorem [NAG convergence rate, strongly convex case]**
Let $f : \mathbb{R}^n \to \mathbb{R}$ be a differentiable function that is, $\alpha$-strongly convex, and $\beta$-smooth.

Then the Nesterov Accelerated Gradient method achieves the following convergence rate:
$$f(x_k) - f(x^*) \le \mathcal{O} \left( \left(1 - \sqrt{\frac{\alpha}{\beta}}\right)^k \right)$$

This is accelerated linear convergence, better than the standard gradient descent rate of $\mathcal{O} \left( \left(1 - \frac{\alpha}{\beta}\right)^k \right)$.
### Visual Description
Text-only slide.
---
## Page 18
### Content
## AdaGrad

* Ward, Wu, Bottou, 2020, AdaGrad stepsizes: sharp convergence over nonconvex landscapes, from any initialization, https://arxiv.org/abs/1806.01811
* J. Duchi, E. Hazan, and Y. Singer. Adaptive subgradient methods for online learning and stochastic optimization, 2011, https://jmlr.org/papers/v12/duchi11a.html
### Visual Description
Text-only slide with two bullet points listing research papers related to AdaGrad.
---
## Page 19
### Content
## Issue with Gradient Based Methods

Issue: The gradient might be the same despite varying curvature

What can we do?
Try to use second-order derivatives! (Hessian matrix)
### Visual Description
Three vertical rectangular plots are arranged horizontally. Each plot shows a different curve (function) with a single red dot on it, representing a point where the gradient is calculated. A straight line (tangent) passes through the red dot, indicating the gradient. The curves have different curvatures, but the tangent lines at the red dots appear to have the same slope, illustrating that the gradient can be the same despite varying curvature.
---
## Page 20
### Content
## Newton's Method

**Gradient descent**
$$\theta_{t+1} = \theta_t - \alpha \nabla_\theta F(\theta_t)$$

**Newton's method**
$$\theta_{t+1} = \theta_t - \alpha \left(\nabla^2_\theta F(\theta_t)\right)^{-1} \nabla_\theta F(\theta_t)$$

Newton's method uses second order information to estimate the curvature of the function being minimized (i.e., the ERM objective)

* Newton's method can significantly reduce number of iterations needed for convergence
* However, comes at a cost: need to invert $k \times k$ matrix $\to \mathcal{O}(k^3)$ often too expensive for neural networks (k can be in the millions)
### Visual Description
Text-only slide with two mathematical formulas for gradient descent and Newton's method, followed by an explanation and two bullet points detailing the advantages and disadvantages of Newton's method.
---
## Page 21
### Content
## Newton's Method

**Newton's method**
$$\theta_{t+1} = \theta_t - \alpha \left(\nabla^2_\theta F(\theta_t)\right)^{-1} \nabla_\theta F(\theta_t)$$
### Visual Description
A 2D plot showing a function (blue curve) with a global minimum. Several parabolic curves (red dashed lines) are shown, representing quadratic approximations at different points (X0, X1, X2). Arrows indicate steps taken towards the "optimal point" (green dot) using these approximations. The x-axis is labeled X0, X1, X2, and an arrow points to the "optimal point".
---
## Page 22
### Content
## Gradient Descent vs Newton's Method

**Gradient descent**
**Newton's method**

Newton's method uses second-order information to estimate the curvature of the function being minimized.
### Visual Description
Two side-by-side plots, both showing a function $J(\theta)$ on the y-axis against $\theta$ on the x-axis.
The left plot, labeled "Gradient descent", shows a wavy function. At a point $\theta_t$, a "Linear appx at $\theta_t$" (red line) is drawn tangent to the curve. A "Small gradient step" and a "Large gradient step" are indicated by dashed arrows, showing movement along the tangent to new points.
The right plot, labeled "Newton's method", shows a similar wavy function. At a point $\theta_t$, a "Quadratic appx at $\theta_t$" (red parabola) is drawn, approximating the curve. A "Hessian step" is indicated by a dashed arrow, showing a larger step towards the minimum of the quadratic approximation.
---
## Page 23
### Content
## Gradient Descent vs Newton's Method
### Visual Description
A contour plot showing concentric ellipses, representing the level sets of a 2D function. Two optimization paths are overlaid:
1. "GD" (Gradient Descent): A path starting from the top right, taking many small, zig-zagging steps that are orthogonal to the contours, slowly converging towards the center.
2. "Newton": A path starting from the top right, taking a few large, direct steps towards the center, demonstrating faster convergence.
The x and y axes range from -20 to 20.
---
## Page 24
### Content
## Gradient Descent vs Newton's Method

**Gradient-step**
**Newton-step makes more progress**
### Visual Description
Two side-by-side plots, each showing a quadratic function (black solid line) and a quadratic approximation (red dashed line).
The left plot, labeled "Gradient Step", shows an "Original Point" on the black curve. A "Linear appx" (not explicitly drawn but implied by the step) leads to an "After Update" point, which is a small step along the curve.
The right plot, labeled "Newton Step", shows the same "Original Point" on the black curve. A "Quadratic appx" (red dashed parabola) is shown, and the "After Update" point is much closer to the minimum of the black curve, indicating a larger and more effective step.
Both plots have y-axes from 0 to 80 and x-axes from 0 to 10.
---
## Page 25
### Content
## AdaGrad

**Newton's method**
$\theta_{t+1} = \theta_t - \alpha (\nabla_\theta^2 F(\theta_t))^{-1} \nabla_\theta F(\theta_t)$

**AdaGrad ideas:**
Let us replace the Hessian matrix $(\nabla_\theta^2 F(\theta_t))$ with a diagonal matrix $H_t$ that is easier to compute.

$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$
### Visual Description
Text-only slide.

---

## Page 26
### Content
## AdaGrad, Duchi et al, 2011

$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$

**What matrix should we use?**
If the past gradients are small $(\nabla_\theta F(\theta_1),...,\nabla_\theta F(\theta_t))$, then we might be in a flat area and we can increase the step size.

If the past gradients are big, then the function changes very quickly, so we should use smaller step sizes.

**Based on these, the AdaGrad update rule is:**
Let $(H_t)_{ii} = \sqrt{\sum_{\tau=1}^t \nabla F(\theta_\tau)_i^2}$
and $(H_t)_{ij} = 0$ if $i \neq j$
### Visual Description
Text-only slide.

---

## Page 27
### Content
## AdaGrad, Duchi et al, 2011

$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$
$H_t = diag(h_{t,1},..., h_{t,D})$
$h_{t,i} = \sqrt{\sum_{\tau=1}^t \nabla F(\theta_\tau)_i^2}$

* A cheap "approximation" of the Hessian: only estimates the diagonal elements
* Enforces a **separate step size / learning rate for every coordinate** of the weight vector
* Decreases the step size for coordinates with high gradient magnitudes
* **Motivation:** When the model is large, there might be high variability across the coordinates, so it makes sense to use different learning rates for them.
### Visual Description
Text-only slide.

---

## Page 28
### Content
## AdaGrad - Stochastic Gradient Version

**AdaGrad is often used combined with stochastic gradient**

Let $F(\theta) = \frac{1}{m} \sum_{i=1}^m f_i(\theta)$, (Empirical risk minimization problem)

For example,
$F(\theta) = \frac{1}{m} \sum_{i=1}^m (y^{(i)} - f_\theta(x^{(i)}))^2$
$= \frac{1}{m} \sum_{i=1}^m f_i(\theta)$ where $f_i(\theta) = (y^{(i)} - f_\theta(x^{(i)}))^2$

Let the stochastic gradient at iteration $t$ in $\theta_t$ be:
$G_t = \nabla f_{i_t}(\theta_t) \in \mathbb{R}^D$ where $i_t \sim U[1,...,m]$
### Visual Description
Text-only slide.

---

## Page 29
### Content
## AdaGrad - Stochastic Gradient Version

$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$
$h_{t,i} = \sqrt{\sum_{\tau=1}^t \nabla F(\theta_\tau)_i^2}$ $H_t = diag(h_{t,1},..., h_{t,D})$

---

**Input:** $x_0 \in \mathbb{R}^D$, Step-size: $\eta > 0$, $h_{0,1},..., h_{0,D} \ge 0$
$H_0 = diag(h_{0,1},..., h_{0,D})$
**for** $t = 0$ **to** $T - 1$ **do**
  Let $G_t = \nabla f_{i_t}(\theta_t) \in \mathbb{R}^D$ be the stochastic gradient
  where $i_t \sim U[1,...,m]$
  **for** $d = 1$ **to** $D$ **do** [Updates for the $d^{th}$ coordinate]
    $h_{t+1,d} = \sqrt{h_{t,d}^2 + G_{t,d}^2}$
    $\theta_{t+1,d} = \theta_{t,d} - \eta \frac{G_{t,d}}{h_{t+1,d}}$
  **end for**
**end for**
### Visual Description
This slide presents the AdaGrad algorithm in a stochastic gradient version, including input parameters, initialization, and nested loops for iterating through time steps and coordinates.

---

## Page 30
### Content
## AdaGrad Diagonal and Full Matrix Versions

**Diagonal Version**
$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$ $H_t = diag(h_{t,1},..., h_{t,D})$
$G_t = \nabla f_{i_t}(\theta_t) \in \mathbb{R}^D$ (stochastic gradient)
$h_{t+1,d} = \sqrt{h_{t,d}^2 + G_{t,d}^2}$ where $i_t \sim U[1,...,m]$
$\theta_{t+1,d} = \theta_{t,d} - \eta \frac{G_{t,d}}{h_{t+1,d}}$

---

**Full Matrix Version**
$H_{t+1} = H_t + G_t G_t^T$
$\theta_{t+1} = \theta_t - \alpha H_t^{-1/2} G_t$
### Visual Description
This slide compares the diagonal and full matrix versions of AdaGrad, providing the key update equations for each.

---

## Page 31
### Content
## Nonconvex AdaGrad
## (Stochastic Setting)

**Theorem: AdaGrad convergence** Let $F(\theta) = \frac{1}{m} \sum_{i=1}^m f_i(\theta)$
Assume that $f_i : \mathbb{R}^D \to \mathbb{R}$ is nonconvex and differentiable, and additionally $\nabla f_i$ is Lipschitz continuous with constant $L > 0 \forall i$.

Let $\mathbb{E}_{\xi \sim U[1,m]} [||\nabla f_\xi(x) - \nabla F(x)||^2] \le \sigma^2, \forall x \in \mathbb{R}^D$
Let $||\nabla F(x)||^2] \le \gamma^2, \forall x \in \mathbb{R}^D$
Let $F^* = \inf_x F(x) > -\infty$

**Theorem:**
Under these conditions AdaGrad converges, and its rate is:
$\min_{t=0,...,T} ||\nabla F(x_t)|| \le O \left( \frac{1}{\sqrt{T}} \left[ \gamma(\sigma + \eta L + \frac{F(x_0) - F^*}{\eta}) \log \frac{T \gamma^2}{h_0^2} \right] \right)$
$= O \left( \frac{\log T}{\sqrt{T}} \right)$ **Note:** $\eta > 0$ can be anything!

**Proof:** https://proceedings.mlr.press/v97/ward19a/ward19a.pdf
### Visual Description
Text-only slide presenting two theorems regarding AdaGrad convergence in a nonconvex, stochastic setting, along with assumptions and a link to the proof.

---

## Page 32
### Content
## An Issue with AdaGrad

$\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$
$(H_t)_{ii} = \sqrt{\sum_{\tau=1}^t \nabla F(\theta_\tau)_i^2}$
and $(H_t)_{ij} = 0$ if $i \neq j$

**AdaGrad's main weakness** is its accumulation of the squared gradients in the inverse of matrix $H$:
* Since every added term is positive, the accumulated sum keeps growing during training.
* This in turn causes the step size (the inverse of H) to shrink and eventually become infinitesimally small.
* Therefore, the step size can become very small in some directions.
### Visual Description
Text-only slide explaining the main weakness of AdaGrad, which is the continuous accumulation of squared gradients leading to shrinking step sizes.

---
## Page 33
### Content
# RMSprop and AdaDelta

**AdaGrad:** $\theta_{t+1} = \theta_t - \alpha H_t^{-1} \nabla_\theta F(\theta_t)$
$h_{t,i} = \sqrt{\sum_{\tau=1}^t \nabla F(\theta_\tau)_i^2}$
$H_t = diag(h_{t,1}, \dots, h_{t,D})$

**RMSProp and AdaDelta:**
a solution to Adagrad's too aggressively decreasing learning rate.
Use a moving average instead of the full sum!
It puts more emphasis on the current gradients than the gradient history
Let $g_{t,i} \doteq [\nabla_\theta F(\theta_t)]_i$, the $i^{th}$ coordinate of the gradient
Let $h_{t,i} \doteq \gamma h_{t-1,i} + (1 - \gamma)g_{t,i}^2$ Running average of $\{g_{1,i}^2, g_{2,i}^2, \dots\}$

We now simply replace the sum of squares of gradients in AdaGrad with the decaying running average

**AdaDelta:** Zeiler, 2012, https://arxiv.org/pdf/1212.5701.pdf
### Visual Description
Text-only slide.
---
## Page 34
### Content
# RMSprop and AdaDelta

Let $RMS[g]_{t,i} \doteq \sqrt{h_{t,i} + \epsilon} = \sqrt{\gamma h_{t-1,i} + (1 - \gamma)g_{t,i}^2 + \epsilon}$

**Variant 1 (RMSprop): [ = Root Mean Square Propagation]**
$\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{RMS[g]_{t,i}} g_{t,i}$

**Variant 2 (AdaDelta):**
Motivation:
* The update in RMSprop is unitless, which is wrong...
* In Newton's method:
$g(\theta) = \frac{\partial f(\theta)}{\partial \theta} = \lim_{\tilde{\theta} \to \theta} \frac{f(\theta) - f(\tilde{\theta})}{\theta - \tilde{\theta}} = [\frac{f}{\theta}]$
$H(\theta) = \frac{\partial g(\theta)}{\partial \theta} = \lim_{\tilde{\theta} \to \theta} \frac{g(\theta) - g(\tilde{\theta})}{\theta - \tilde{\theta}} = [\frac{f}{\theta^2}]$
$\Rightarrow \Delta \theta = H^{-1}(\theta)g(\theta) = [\frac{\theta^2}{f}][\frac{f}{\theta}] = [\theta]$
Newton's method has the correct dimension!
### Visual Description
Text-only slide with mathematical equations and derivations.
---
## Page 35
### Content
# RMSprop and AdaDelta

**Variant 1 (RMSprop): [ = Root Mean Square Propagation]**
$\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{RMS[g]_{t,i}} g_{t,i}$

**Variant 2 (AdaDelta):**
Let's fix the dimensions!
$\Rightarrow \theta_{t+1,i} = \theta_{t,i} - \eta \frac{RMS[\Delta \theta]_{t-1,i}}{RMS[g]_{t,i}} g_{t,i}$
### Visual Description
Text-only slide with mathematical equations for RMSprop and AdaDelta update rules.
---
## Page 36
### Content
# Adam [Adaptive Moment estimation]

In addition to storing an exponentially decaying average of past squared gradients $v_t$ like Adadelta and RMSprop, Adam also keeps an exponentially decaying average of past gradients $m_t$, similar to momentum:

**Adam = Momentum + RMSprop**
$m_t = \beta_1 m_{t-1} + (1 - \beta_1)g_t$ Momentum update
$v_t = \beta_2 v_{t-1} + (1 - \beta_2)g_t^2$ RMSprop update

**Bias correction:**
$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}$
$\hat{v}_t = \frac{v_t}{1 - \beta_2^t}$
$0 < \beta_1, \beta_2 < 1$ parameters.
$E[m_t] = E[g_t](1 - \beta_1^t)$
$E[v_t] = E[g_t^2](1 - \beta_2^t)$

**Update rule:**
$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$
Proof: [Next slide]

**Adam:** https://arxiv.org/abs/1412.6980
### Visual Description
Text-only slide explaining Adam optimizer, its components (momentum and RMSprop), bias correction, and the update rule, with associated mathematical formulas. An arrow points from the bias correction formulas to the expected value formulas.
---
## Page 37
### Content
# Adam [Adaptive Moment estimation]

$m_1 = \beta_1 m_0 + (1 - \beta_1)g_1$
$m_2 = \beta_1 m_1 + (1 - \beta_1)g_2$
$= \beta_1(\beta_1 m_0 + (1 - \beta_1)g_1) + (1 - \beta_1)g_2$
$= \beta_1^2 m_0 + \beta_1(1 - \beta_1)g_1 + (1 - \beta_1)g_2$
$m_t = \beta_1 m_{t-1} + (1 - \beta_1)g_t$
Let $m_0 = 0$.

$m_3 = \beta_1 m_2 + (1 - \beta_1)g_3$
$= \beta_1(\beta_1^2 m_0 + \beta_1(1 - \beta_1)g_1 + (1 - \beta_1)g_2) + (1 - \beta_1)g_3$
$= \beta_1^3 m_0 + \beta_1^2(1 - \beta_1)g_1 + \beta_1(1 - \beta_1)g_2 + (1 - \beta_1)g_3$

$\Rightarrow E[m_3] = \beta_1^3 m_0 + (1 - \beta_1)(\beta_1^2 + \beta_1 + 1)E[g_3]$
$= (1 - \beta_1^3)E[g_3]$

$\Rightarrow E[m_t] = E[g_t](1 - \beta_1^t) \Rightarrow E[g_t] = \frac{E[m_t]}{(1 - \beta_1^t)}$
### Visual Description
Text-only slide showing the mathematical derivation of the bias correction for $m_t$ in Adam, expanding $m_1, m_2, m_3$ and then generalizing to $E[m_t]$.
---
## Page 38
### Content
# Adam = Adaptive moment estimation

**Adam summary**
$m_t = \beta_1 m_{t-1} + (1 - \beta_1)g_t$
$v_t = \beta_2 v_{t-1} + (1 - \beta_2)g_t^2$
$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}$
$\hat{v}_t = \frac{v_t}{1 - \beta_2^t}$
$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$
$0 < \beta_1, \beta_2 < 1$ parameters.

* Combines momentum and RMSprop
* Default choice in most DL frameworks
* However, does not converge (even for simple convex problems) without modifications [see HW4]
### Visual Description
Text-only slide summarizing the Adam optimizer with all its key formulas and bullet points highlighting its characteristics and limitations.
---
## Page 39
### Content
# Results on Toy Problems
### Visual Description
A red banner with white text "Results on Toy Problems" centered on a white background. This is a section divider slide.
---
## Page 40
### Content
# SGD optimization on saddle point
https://imgur.com/a/Hqolp
Image credit: http://sebastianruder.com/optimizing-gradient-descent/

Nonadaptive algos really struggle: SGD gets no where and NAG / Momentum exhibits oscillations until they build up velocity in the optimization direction.
### Visual Description
A 3D surface plot illustrating the optimization paths of different algorithms (SGD, Momentum, NAG, Adagrad, Adadelta, Rmsprop) on a saddle point. The x and y axes represent parameters, and the z-axis represents the loss function value. A legend in the top right corner identifies each algorithm's path by color. The paths show how each algorithm navigates the saddle point, with some getting stuck or oscillating.
---
## Page 41
### Content
SGD optimization on saddle point
Image credit: http://sebastianruder.com/optimizing-gradient-descent/
https://imgur.com/a/Hqolp

Adaptive methods (i.e. Adagrad, Adadelta, RMSprop, and Adam) can break symmetry and are the most suitable and provide the best convergence for these scenarios.
### Visual Description
A 3D surface plot illustrating a saddle point. A red dot marks the saddle point. A legend on the top right lists different optimization algorithms: SGD, Momentum, NAG, Adagrad, Adadelta, and Rmsprop. The axes range from approximately -1.5 to 1.0. The surface shows a clear saddle shape, with values ranging from -4 to 4 on the vertical axis.
---
## Page 42
### Content
Beale's function
Beale's function: nonconvex, high variability in terms of gradients
### Visual Description
A 3D surface plot of Beale's function, which is highly nonconvex with multiple peaks and valleys. The function $f(x_1, x_2)$ values range from 0 to 150000 on the vertical axis. The $x_1$ and $x_2$ axes range from -4 to 4. The plot shows sharp peaks and deep valleys, indicating high variability in gradients.
---
## Page 43
### Content
Beale's function
Image credit: http://sebastianruder.com/optimizing-gradient-descent/

Due to the large initial gradient, velocity-based techniques shoot off and bounce around. adaGrad is unstable for the same reason. adaDelta and RMSprop are the best
### Visual Description
A 2D contour plot of Beale's function, showing the optimization paths of different algorithms. A legend on the top right lists SGD, Momentum, NAG, Adagrad, Adadelta, and Rmsprop. The contours are very dense near the origin and spread out further away. A black dot marks a point near the center, and a gray star marks another point in the lower right quadrant. The paths of the different optimizers are shown as colored lines, with some paths appearing to "shoot off" or "bounce around" due to the challenging landscape.
---
## Page 44
### Content
Pytorch Demo
https://github.com/bapoczos/ScalableML/blob/master/optimization/Pytorch_MinimizationDemo_110.ipynb
### Visual Description
A 2D contour plot, similar to Beale's function, showing "Optimization Results". The x and y axes range from -4 to 4. The contours are dense near the center, indicating steep gradients. A red star marks a point in the lower right quadrant, likely representing a minimum found by an optimizer. The plot shows a single optimization path as a blue line, which converges towards the red star.
---
## Page 45
### Content
Pytorch Demo
https://github.com/bapoczos/ScalableML/blob/master/optimization/Pytorch_MinimizationDemo_110.ipynb
### Visual Description
A 3D surface plot, likely of the same function as on page 44, showing a complex, non-convex landscape. The x and y axes range from -4 to 4, and the z-axis (function value) ranges from 0 to 175000. The surface has multiple peaks and valleys, with a deep blue region indicating lower function values and red/yellow regions indicating higher values.
---
## Page 46
### Content
Performance on DL benchmarks

"Adam: A Method for Stochastic Optimization", Kingma & Ba, ICLR 2015
### Visual Description
A log-log plot titled "MNIST Multilayer Neural Network + dropout" showing training cost versus iterations over the entire dataset. The x-axis (iterations) ranges from 0 to 200, and the y-axis (training cost) ranges from $10^2$ to $10^{-2}$. Multiple colored lines represent different optimization algorithms: AdaGrad, RMSProp, SGDNesterov, AdaDelta, and Adam. All lines show a decreasing trend in training cost as iterations increase, with Adam and RMSProp generally showing lower training costs towards the end.
---
## Page 47
### Content
Are these Actually Helpful?

*   "The Marginal Value of Adaptive Gradient Methods in Machine Learning", Wilson et al., NeurIPS 2017
*   Performance can particularly drop for test error (i.e., what we actually care about!)
### Visual Description
Two plots comparing the performance of different optimization algorithms on CIFAR-10.
**(a) CIFAR-10 (Train)**: A plot of Training Error % vs. Epoch. The x-axis (Epoch) ranges from 0 to 250, and the y-axis (Training Error %) ranges from 0 to 20. Lines for SGD, HB, AdaGrad, RMSProp, Adam, and Adam (Default) are shown. Most methods show a sharp decrease in training error initially, then plateau. Adam (Default) shows the highest training error.
**(b) CIFAR-10 (Test)**: A plot of Test Error % vs. Epoch. The x-axis (Epoch) ranges from 0 to 250, and the y-axis (Test Error %) ranges from 8 to 20. Lines for the same algorithms are shown, with specific error rates and standard deviations noted for AdaGrad (11.34±0.46), Adam (Default) (12.02±0.16), Adam (9.78±0.25), RMSProp (9.60±0.19), HB (7.74±0.25), and SGD (7.65±0.14). This plot indicates that while adaptive methods might perform well on training data, their test error can be higher compared to simpler methods like SGD and HB.
---
## Page 48
### Content
Thanks for your attention!
### Visual Description
Text-only slide.
---
