# Feb19_stoch_gd

Source: `materials/archive/Feb19_stoch_gd.pdf`
Duplicate equivalents: `Feb19_stoch_gd.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `strict full-PDF single-call conversion`
Finish reason: `STOP`
Pages: 52
## Page 1
### Content
Slide 1
Optimization for Machine Learning
Stochastic Gradient Descent [SGD]

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 2
### Content
Slide 2
Problem Setting

**Goal:** minimize a differentiable function $f$.
(for now, we're interested in solving an unconstrained problem).

**Assumption:** Rather than obtaining the exact gradient value $\nabla f(x)$ at some point $x$, we are able to compute a vector $g(x; \xi)$ which is a function of a random variable $\xi$ and has the property that,
$$\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$$

That is, the stochastic gradient $g(x; \xi)$ is an unbiased estimate of the actual gradient $\nabla f(x)$.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 3
### Content
Slide 3
The SGD algorithm

The SGD algorithm:
$$x^{t+1} = x^t - \eta_t g(x^t; \xi^t)$$

$\xi^t$ has distribution $P$, and it is drawn independently of everything else.

Often computing $g(x^t; \xi^t)$ will be much faster than computing $\nabla f(x^t)$.

However, $g(x^t; \xi^t)$ can be a very noisy estimate of $\nabla f(x^t)$ (i.e. it might have high variance).

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 4
### Content
Slide 4
SGD History

* SGD has a long history
* The basic algorithm has been reinvented many times.
* The original algorithm is usually attributed to Robbins and Munro

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 5
### Content
Slide 5
Step Size Warning

* Similar to gradient descent and subgradient methods, we'll need to be careful about our choice of step size.
* For instance, it's easy to see that (unlike for GD in the smooth case) fixed step-size choices usually don't work.
* If we're at the optimum $x$, the gradient might be zero, but the stochastic gradient might still be non-zero (because of the variance), and we'll need to carefully choose the step size to decay to ensure convergence.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 6
### Content
Slide 6
SGD Examples

**Assumption:** $\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$

**Example 1 [Noisy gradient]**
$$g(x, \xi) \doteq \nabla f(x) + \xi \quad \text{where } \mathbb{E}[\xi] = 0$$

[We can check that indeed $\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$]

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 7
### Content
Slide 7
Examples

Let $f_1(x), f_2(x), \dots, f_n(x)$ be $n$ given functions. Let $f(x) \doteq \frac{1}{n} \sum_{i=1}^n f_i(x)$
We want to solve: $\min_x f(x)$

**Definition [Incremental gradient]**
Incremental GD update: $x^{t+1} = x^t - \eta_t \nabla f_{i_t}$
where $i_t = t \mod n$

**Example 2 [Randomized incremental gradient]**
= Random index in the sum function
$$\xi_t \sim U[1, 2, \dots n]$$
Let $g(x; \xi_t) \doteq \nabla f_{\xi_t}(x)$ [We can check that indeed $\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$]
SGD update $x^{t+1} = x^t - \eta_t \nabla f_{\xi_t}$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 8
### Content
Slide 8
Empirical Risk Minimization

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 9
### Content
Slide 9
Example 3: Empirical Risk Minimization

We are given a training set: $\mathcal{D} = (X_1, Y_1), \dots, (X_n, Y_n) \sim P_{X,Y}$ [iid training instances]
We are also given a loss function: $l(X, Y)$

**Definition [risk of classifier/regressor $f$]:** $R(f) \doteq \mathbb{E}_{X,Y \sim P_{X,Y}}[l(f(X), Y)]$

Our goal is to calculate: 
$$f^* = \arg \min_f R(f) = \arg \min_f \mathbb{E}_{X,Y \sim P_{X,Y}}[l(f(X), Y)]$$

We cannot directly minimize $R$ to find the best $f^*$ since we don't have access to $P_{X,Y}$. So a standard idea is to minimize the empirical risk instead:
$$R_n(f) = \frac{1}{n} \sum_{i=1}^n l(f(X_i), Y_i) \quad \text{[Empirical Risk]}$$

**Observation** $\mathbb{E}_{\mathcal{D}}[R_n(f)] = R(f)$ meaning that we take expectation w.r.t. the distribution of our random data $\mathcal{D}$.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 10
### Content
Slide 10
Empirical Risk Minimization

$$R_n(f) = \frac{1}{n} \sum_{i=1}^n l(f(X_i), Y_i) \quad \hat{f}_n = \arg \min_{f \in \mathcal{F}_n} R(f)$$

Usually our classification/regression functions $f \in \mathcal{F}_n$ will be parametrized by some parameters:
(e.g. $f = f_w \in \mathcal{F}_n$, where $\mathcal{F}_n = \{f_w\}$ is a set of polynomials, neural networks with some weight parameters, etc)

We'll be doing SGD on those parameters $w$.

**Observation [unbiased gradient]:**
$$\mathbb{E}_{\mathcal{D}}[\nabla_w l(f_w(X_i), Y_i)] = \nabla_w R(f_w), \text{ for any fixed } i$$
meaning that we take expectation w.r.t. the distribution of our random data $\mathcal{D}$.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 11
### Content
Slide 11
Example 4: Mini-Batch SGD

In the ERM setting we are not restricted to using a single sample to compute our stochastic gradient.

Often it will be faster to choose subsets $I_t \subseteq \{1, \dots, n\}$ of size $m$ from the training set and compute:
$$x^{t+1} = x^t - \eta_t \frac{1}{m} \sum_{i \in I_t} \nabla f_i(x^t)$$

The larger the $m$, the lower the variance of the stochastic gradient, but the more expensive it is to calculate it.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 12
### Content
Slide 12
Example 5: Randomized Coordinate Descent

Let $f: \mathbb{R}^d \to \mathbb{R}$

In coordinate descent, at each iteration we select a variable $i_t \in \{1, \dots, d\}$ and do a gradient step updating only that variable (keeping all others fixed), i.e.:
$$x^{t+1} = x^t - \eta_t \nabla_{i_t} f(x^t)$$
where $\nabla_{i_t} f(x)$ denotes the partial derivative of $f$ with respect to $i_t$-th coordinate.

**Example [Randomized Coordinate Descent]**
$$i_t \sim U[1, 2, \dots d]$$
[We can check that indeed $\mathbb{E}_{i_t}[\nabla_{i_t} f(x^t)] = \frac{1}{d} \nabla f(x^t)$]

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 13
### Content
Slide 13
SGD Rate of Convergence

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 14
### Content
Slide 14
Warm-Up Example

We'd like to develop an understanding of the rates of convergence of SGD, some insights on step-size choices, and on the role of the variance.

Suppose our goal is to optimize a very simple quadratic objective:
$$\min_x \frac{1}{2} \sum_{t=1}^n \|X_t - x\|_2^2$$
where $X_1, \dots X_n$ are given vectors.

Suppose we start at $x^0 = 0$.

The optimal solution is $x^* = \frac{1}{n} \sum_{i=1}^n X_i$. [The average of $X_1, \dots X_n$.]

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 15
### Content
Slide 15
Warm-Up Example [Empirical Average]

**Goal:** $\min_x \frac{1}{2} \sum_{t=1}^n \|X_t - x\|_2^2 \quad$ Suppose we start at $x^0 = 0$.
$$\nabla f_t = \nabla \frac{1}{2} \|X_t - x\|_2^2 = -(X_t - x) = (x - X_t)$$

The incremental gradient algorithm will use the updates for $t = 0, \dots, n-1$:
$$x^{t+1} = x^t - \eta_t(x^t - X_{t+1}) = (1 - \eta_t)x^t + \eta_t X_{t+1}$$

If we use the step-size $\eta_t = \frac{1}{t+1}$, then we have that, [Moving average!]
$$x^{t+1} = (1 - \frac{1}{t+1})x^t + \frac{1}{t+1} X_{t+1}$$
$$= \frac{t}{t+1}x^t + \frac{1}{t+1} X_{t+1}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 16
### Content
Slide 16
Warm-Up Example

$$x^{t+1} = \frac{t}{t+1}x^t + \frac{1}{t+1} X_{t+1}$$

Therefore,
$x^0 = 0$
$x^1 = \frac{0}{1}x^0 + \frac{1}{1}X_1 = X_1$
$x^2 = \frac{1}{2}x^1 + \frac{1}{2}X_2 = \frac{1}{2}(X_1 + X_2)$
$x^3 = \frac{2}{3}(\frac{1}{2}(X_1 + X_2)) + \frac{1}{3}X_3 = \frac{1}{3}(X_1 + X_2 + X_3)$
$\vdots$
$x^n = \frac{n-1}{n}(\frac{1}{n-1} \sum_{i=1}^{n-1} X_i) + \frac{1}{n}X_n = \frac{1}{n} \sum_{i=1}^n X_i$.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 17
### Content
Slide 17
Warm-Up Example

$$x^n = \frac{n-1}{n}(\frac{1}{n-1} \sum_{i=1}^{n-1} X_i) + \frac{1}{n}X_n = \frac{1}{n} \sum_{i=1}^n X_i.$$

After $n$ iterations the incremental gradient algorithm converges to the optimal solution if we use the step-size $\eta_t = \frac{1}{t+1}$.

Note that even in this favorable case (smooth, strongly convex objective) we needed to take our step-sizes to decay at the rate $1/(t+1)$.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 18
### Content
Slide 18
Warm-Up Example [Population Average]

Suppose we are interested in optimizing the **population objective**:

**Goal:** $\min_x \frac{1}{2} \mathbb{E}_{X \sim P} \|X - x\|_2^2 \quad \nabla_x f = \nabla_x \frac{1}{2} \|X - x\|_2^2 = -(X - x) = (x - X)$

We obtain samples $X_1, \dots, X_n$ from $P$.

Suppose that $P$ has mean $\mu$ and variance $\sigma^2$

From each sample $X_i$, we can compute a stochastic gradient $g(x^t, X_i) = x^t - X_i$, and use this in an SGD algorithm.

Suppose we use step-sizes $\eta_t = 1/(t+1)$, and $x^0 = 0$ as before.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 19
### Content
Slide 19
Warm-Up Example [Population Average]

**Goal:** $\min_x \frac{1}{2} \mathbb{E}_{X \sim P} \|X - x\|_2^2 \quad \nabla f = -(X - x) = (x - X)$
$\eta_t = 1/(t+1)$

$$x^{t+1} = x^t - \eta_t(x^t - X_{t+1}) = (1 - \eta_t)x^t + \eta_t X_{t+1}$$
$$= \frac{t}{t+1}x^t + \frac{1}{t+1} X_{t+1}$$

As before, after $n$ iterations we obtain the solution:
$$x^n = \frac{n-1}{n}(\frac{1}{n-1} \sum_{i=1}^{n-1} X_i) + \frac{1}{n}X_n = \frac{1}{n} \sum_{i=1}^n X_i.$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 20
### Content
Slide 20
Warm-Up Example [Population Average]

As before, after $n$ iterations we obtain the solution:
$$x^n = \frac{1}{n} \sum_{i=1}^n X_i.$$

Now, we can evaluate the quality of $x^n$ via its objective value:
$$f(x) = \frac{1}{2} \mathbb{E}_{X \sim P} \|X - x\|_2^2$$

Let $x^* \doteq \mathbb{E}_{X \sim P}[X] = \mu$
$$f(x^*) = \frac{1}{2} \mathbb{E}_{X \sim P} \|X - x^*\|_2^2 = \frac{1}{2} \mathbb{E}_{X \sim P} \|X - \mu\|_2^2 = \frac{\sigma^2}{2}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 21
### Content
Slide 21
Warm-Up Example [Population Average]

$$f(x^n) = \frac{1}{2} \mathbb{E} \|X - x^n\|^2 = \frac{1}{2} \mathbb{E} \|X - \mu + \mu - x^n\|^2$$
$$= \frac{1}{2} \mathbb{E} \|X - \mu\|^2 + \frac{1}{2} \mathbb{E} \|\mu - x^n\|^2 + \mathbb{E}[(X - \mu)(\mu - x^n)]$$

Note that,
$$\mathbb{E} \|\mu - x^n\|^2 = \mathbb{E} \|\mu - \frac{1}{n} \sum_{i=1}^n X_i\|^2 = \mathbb{E} \|\frac{1}{n} \sum_{i=1}^n (\mu - X_i)\|^2$$
$$= \frac{1}{n^2} \sum_{i=1}^n \mathbb{E} \|(\mu - X_i)\|^2 = \frac{\sigma^2}{n}$$

and,
$$\mathbb{E}[(X - \mu)(\mu - x^n)] = \mathbb{E}[(X - \mu)] \mathbb{E}[(\mu - \frac{1}{n} \sum_{i=1}^n X_i)] = 0 \times 0 = 0$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 22
### Content
Slide 22
Warm-Up Example [Population Average]

Therefore,
$$f(x^n) = \frac{\sigma^2}{2} + \frac{\sigma^2}{2n} + 0$$

And thus,
$$f(x^n) - f(x^*) = \frac{\sigma^2}{2} + \frac{\sigma^2}{2n} - \frac{\sigma^2}{2} = \frac{\sigma^2}{2n} = O(\frac{1}{n})$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 23
### Content
Slide 23
Warm-Up Example [Population Average]

$$f(x^n) - f(x^*) = \frac{\sigma^2}{2n}$$

Even in this favorable case (smooth, strongly convex objective) we obtain only a $1/n$-type rates of convergence.

Furthermore, we know that this cannot be improved in this case. Standard statistical lower bounds will tell us that the sample mean is the best possible estimator here, and that it's excess error scales exactly like $\sigma^2/2n$.

In this case, the SGD algorithm which processes a single sample at a time, and makes a step after each sample, is as good as any estimator which uses all of the samples $X_1, \dots, X_n$ at once.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 24
### Content
Slide 24
SGD Convergence Rates
SGD for Non-smooth, Lipschitz Convex Functions

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 25
### Content
Slide 25
SGD for Non-smooth, Lipschitz Convex Functions

**Theorem [SGD for Non-smooth, Lipschitz Convex Functions]**
Suppose that:
* $f$ is convex (and we don't assume differentiability)
assume $g_x \doteq \mathbb{E}_\xi[g(x; \xi)] \in \partial f(x)$, [instead of $\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$]
* our initialization satisfies $\|x^0 - x^*\|^2 \le R$
(for some, not necessarily unique, minimizer $x^*$)
* and the stochastic gradients satisfy,
$\mathbb{E}[\|g(x, \xi)\|^2] \le G^2$ for all $x$, i.e. $f$ is $G$-Lipschitz. [we will see this later]

then if we choose $\eta = \frac{\sqrt{R}}{\sqrt{G^2 k}}$ fixed step size, we have the guarantee that,
$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) \right] - f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}$$

**Proof: [Appendix]**

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 26
### Content
Slide 26
SGD for Non-smooth, Lipschitz Convex Functions

$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) \right] - f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}$$

**Remarks**
Notice, the main differences between our earlier result for the subgradient method and this result:

1) We obtain a guarantee that holds in expectation.
(similar bounds hold in high-probability and for the last iterate but are a bit more difficult to prove).

2) The SGD algorithm here can be much faster than the subgradient method. It achieves the same rate of convergence as a function of $k$, but the iterations of SGD can be faster than the iterations of the sub-gradient method.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 27
### Content
Slide 27
SGD for Non-smooth, Lipschitz Convex Functions

**Remarks**
3) Our assumption was that the expected squared stochastic (sub)gradients, $\mathbb{E}[\|g(x, \xi)\|^2]$, are bounded for all $x$.

We proved this before: $f$ is Lipschitz continuous with constant $G > 0 \iff \|g_x\|_2 \le G$ for any subgradient of $f$ at any $x$.

Therefore, the condition $\mathbb{E}_\xi[\|g(x, \xi)\|^2] \le G^2$ for all $x$, implies that $f$ is $G$-Lipschitz.
[since in this case $g_x \doteq \mathbb{E}_\xi[g(x; \xi)] \in \partial f(x)$ [by assumption],
and $\|g_x\|_2^2 = \|\mathbb{E}_\xi[g(x; \xi)]\|_2^2 \le \mathbb{E}_\xi[\|g(x; \xi)\|_2^2] \le G^2$ is bounded too.
$\implies f$ is $G$-Lipschitz.]

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 28
### Content
Slide 28
SGD for Strongly Convex Functions

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 29
### Content
Slide 29
SGD for Strongly Convex Functions

**Theorem [SGD for Strongly Convex Functions]**
Suppose $f$ is $\alpha$-strongly convex, and the stochastic gradients satisfy,
$$\mathbb{E}[\|g(x, \xi)\|^2] \le G^2 \text{ for all } x, \quad \text{i.e. } f \text{ is } G\text{-Lipschitz.}$$
$$\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x), \quad \text{[We assume differentiability, though similar theorem exists with subgradients too]}$$

Then,
1) For a fixed step-size $\eta < 1/\alpha$, we obtain,
$$\mathbb{E}\|x^k - x^*\|^2 \le (1 - \alpha\eta)^k \|x^0 - x^*\|^2 + \frac{\eta G}{\alpha}$$

2) For $\eta_t = \frac{1}{\alpha(t+1)}$,
$$\mathbb{E} f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) - f(x^*) \le \frac{G^2(1 + \log k)}{2\alpha k}$$

**Proof: [Appendix]**

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 30
### Content
Slide 30
SGD for Strongly Convex Functions

**Remarks**
1) The first result suggests that SGD iterates with a fixed step-size, will converge rapidly to some ball around $x^*$ and then bounce around there.

This in turn suggests a common practical epoch-based heuristic for SGD step-sizes: run it with some fixed step-size, when it seems like the iterates are bouncing around (or you stop making progress in function value), then decay it by some factor and continue running it.

2) In the second case, one can remove the log factor with some extra work.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 31
### Content
Slide 31
SGD for Strongly Convex Functions

**Key takeaways:**

* For strongly convex functions, SGD does not achieve a linear rate of convergence (and additionally assuming smoothness makes no difference).

* This is primarily due to the variance of the stochastic gradients.

Later we might discuss tools for variance reduction in SGD (which do in some cases yield algorithms with linear convergence rates for smooth and strongly convex functions).

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 32
### Content
Slide 32
Appendix

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 33
### Content
Slide 33
Proof of SGD for Non-smooth, Lipschitz Convex Functions

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 34
### Content
Slide 34
SGD for Non-smooth, Lipschitz Convex Functions

**Theorem [SGD for Non-smooth, Lipschitz Convex Functions]**
Suppose that:
* $f$ is convex (and we don't assume differentiability)
Instead of $\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x)$, assume $g_x \doteq \mathbb{E}_\xi[g(x; \xi)] \in \partial f(x)$,
* our initialization satisfies $\|x^0 - x^*\|^2 \le R$
(for some, not necessarily unique, minimizer $x^*$)
* and the stochastic gradients satisfy,
$\mathbb{E}[\|g(x, \xi)\|^2] \le G^2$ for all $x$, i.e. $f$ is $G$-Lipschitz.

then if we choose $\eta = \frac{\sqrt{R}}{\sqrt{G^2 k}}$ fixed step size, we have the guarantee that,
$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) \right] - f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 35
### Content
Slide 35
SGD for Non-smooth, Lipschitz Convex Functions

**Proof**
The proof is similar to that of the subgradient method, except that we use expectations (and conditional expectations) at various points.

We're using a fixed step-size across iterations.

SGD update: $x^{t+1} = x^t - \eta g(x^t; \xi_t) \quad$ assume $g_{x^t} \doteq \mathbb{E}_\xi[g(x^t; \xi)] \in \partial f(x^t)$,

$\|x^{t+1} - x^*\|^2 = \|x^t - \eta g(x^t; \xi_t) - x^*\|^2$
$= \|x^t - x^* - \eta g(x^t; \xi_t)\|^2$
$= \|x^t - x^*\|^2 - 2\eta g(x^t; \xi_t)^T(x^t - x^*) + \eta^2 \|g(x^t; \xi_t)\|^2$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 36
### Content
Slide 36
SGD for Non-smooth, Lipschitz Convex Functions

**Proof [continued]**
$$\|x^{t+1} - x^*\|^2 = \|x^t - x^*\|^2 - 2\eta g(x^t; \xi_t)^T(x^t - x^*) + \eta^2 \|g(x^t; \xi_t)\|^2$$

Therefore, [since $\mathbb{E}[\|g(x, \xi)\|^2] \le G^2 \forall x$,]
$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta^2 G^2 - \mathbb{E}[2\eta g(x^t; \xi_t)^T(x^t - x^*) \mid x^t]$
$= \|x^t - x^*\|^2 + \eta^2 G^2 - 2\eta(x^t - x^*)^T \mathbb{E}[g(x^t; \xi_t) \mid x^t]$
$= \|x^t - x^*\|^2 + \eta^2 G^2 - 2\eta(x^t - x^*)^T g_{x^t}$
where $g_{x^t} \doteq \mathbb{E}_\xi[g(x^t; \xi)] \in \partial f(x^t)$,

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 37
### Content
Slide 37
SGD for Non-smooth, Lipschitz Convex Functions

**Proof [continued]**
$$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta^2 G^2 - 2\eta(x^t - x^*)^T g_{x^t}$$

By the definition of subgradient $g_x$ of convex $f$ at $x$, we have that
$$f(x) + g_x^T(y - x) \le f(y), \quad \forall y \in \text{dom}(f)$$
$$f(x^t) + g_{x^t}^T(x^* - x^t) \le f(x^*) \quad \text{[Using } x = x^t, y = x^*\text{]}$$
$$-g_{x^t}^T(x^t - x^*) \le f(x^*) - f(x^t)$$

Therefore,
$$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta^2 G^2 + 2\eta(f(x^*) - f(x^t))$$
$$\implies \mathbb{E}[\|x^{t+1} - x^*\|^2] \le \mathbb{E}[\|x^t - x^*\|^2] + \eta^2 G^2 + 2\eta(f(x^*) - \mathbb{E}[f(x^t)])$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 38
### Content
Slide 38
SGD for Non-smooth, Lipschitz Convex Functions

$$\mathbb{E}[\|x^{t+1} - x^*\|^2] \le \mathbb{E}[\|x^t - x^*\|^2] + \eta^2 G^2 + 2\eta(f(x^*) - \mathbb{E}[f(x^t)])$$

Summing from $t = \{0, \dots, k-1\}$, we have that
$$\mathbb{E}[\|x^k - x^*\|^2] \le \mathbb{E}[\|x^0 - x^*\|^2] + 2 \sum_{t=0}^{k-1} \eta(f(x^*) - \mathbb{E}[f(x^t)]) + \sum_{t=0}^{k-1} \eta^2 G^2$$
$$-2 \sum_{t=0}^{k-1} \eta(f(x^*) - \mathbb{E}[f(x^t)]) \le \mathbb{E}[\|x^0 - x^*\|^2] + k\eta^2 G^2 - \mathbb{E}[\|x^k - x^*\|^2]$$
$$2 \sum_{t=0}^{k-1} \eta(\mathbb{E}[f(x^t)] - f(x^*)) \le \mathbb{E}[\|x^0 - x^*\|^2] + kG^2 \eta^2$$
$$\frac{1}{k} \sum_{t=0}^{k-1} (\mathbb{E}[f(x^t)] - f(x^*)) \le \frac{\mathbb{E}[\|x^0 - x^*\|^2]}{2\eta k} + \frac{G^2 \eta}{2}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 39
### Content
Slide 39
SGD for Non-smooth, Lipschitz Convex Functions

$$\frac{1}{k} \sum_{t=0}^{k-1} (\mathbb{E}[f(x^t)] - f(x^*)) \le \frac{\mathbb{E}[\|x^0 - x^*\|^2]}{2\eta k} + \frac{G^2 \eta}{2}$$

$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=0}^{k-1} x^t \right) \right] - f(x^*) \le \mathbb{E} \left[ \frac{1}{k} \sum_{t=0}^{k-1} f(x^t) \right] - f(x^*) \le \frac{\mathbb{E}[\|x^0 - x^*\|^2]}{2\eta k} + \frac{G^2 \eta}{2} \le \frac{R}{2\eta k} + \frac{G^2 \eta}{2}$$

where we used that $f \left( \frac{1}{k} \sum_{t=0}^{k-1} x^t \right) \le \frac{1}{k} \sum_{t=0}^{k-1} f(x^t)$ because $f$ is convex

$$\min_\eta \frac{a}{\eta} + b\eta \implies -\frac{a}{\eta^2} + b = 0 \implies -a + b\eta^2 = 0 \implies \eta^* = \sqrt{\frac{a}{b}} = \sqrt{\frac{R/2k}{G^2/2}} = \sqrt{\frac{R}{G^2 k}}$$

$\min_\eta \frac{a}{\eta} + b\eta = \frac{a}{\eta^*} + b\eta^* = \sqrt{ab} + \sqrt{ab} = 2\sqrt{ab} \quad$ That is why we set $\eta = \sqrt{\frac{R}{G^2 k}}$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 40
### Content
Slide 40
SGD for Non-smooth, Lipschitz Convex Functions

$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=0}^{k-1} x^t \right) \right] - f(x^*) \le \mathbb{E} \left[ \frac{1}{k} \sum_{t=0}^{k-1} f(x^t) \right] - f(x^*) \le \frac{\mathbb{E}[\|x^0 - x^*\|^2]}{2\eta k} + \frac{G^2 \eta}{2} \le \frac{R}{2\eta k} + \frac{G^2 \eta}{2}$$

Let's choose $\eta = \frac{\sqrt{R}}{G\sqrt{k}}$

$\frac{1}{2} G^2 \eta = \frac{G^2 \sqrt{R}}{2G\sqrt{k}} = \frac{G\sqrt{R}}{2\sqrt{k}}$
$\frac{R}{2\eta k} = \frac{R}{2k \frac{\sqrt{R}}{G\sqrt{k}}} = \frac{\sqrt{R}}{2\frac{k}{G\sqrt{k}}} = \frac{\sqrt{R}}{2\frac{\sqrt{k}}{G}} = \frac{G\sqrt{R}}{2\sqrt{k}}$
$\sqrt{ab} = \sqrt{\frac{R}{2k} \frac{G^2}{2}} = \frac{G}{2} \sqrt{\frac{R}{k}}$

$$\mathbb{E} \left[ f \left( \frac{1}{k} \sum_{t=0}^{k-1} x^t \right) \right] - f(x^*) \le \frac{R}{2\eta k} + \frac{G^2 \eta}{2} \le \frac{G\sqrt{R}}{2\sqrt{k}} + \frac{G\sqrt{R}}{2\sqrt{k}} \le \frac{G\sqrt{R}}{\sqrt{k}} \blacksquare$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 41
### Content
Slide 41
Proof of SGD for Strongly Convex Functions

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 42
### Content
Slide 42
SGD for Strongly Convex Functions

**Theorem [SGD for Strongly Convex Functions]**
Suppose $f$ is $\alpha$-strongly convex, and the stochastic gradients satisfy,
$$\mathbb{E}[\|g(x, \xi)\|^2] \le G^2 \text{ for all } x, \quad \text{i.e. } f \text{ is } G\text{-Lipschitz.}$$
$$\mathbb{E}_\xi[g(x; \xi)] = \nabla f(x),$$

Then,
1) For a fixed step-size $\eta < 1/\alpha$, we obtain,
$$\mathbb{E}\|x^k - x^*\|^2 \le (1 - \alpha\eta)^k \|x^0 - x^*\|^2 + \frac{\eta G}{\alpha}$$

2) For $\eta_t = \frac{1}{\alpha(t+1)}$,
$$\mathbb{E} f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) - f(x^*) \le \frac{G^2(1 + \log k)}{2\alpha k}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 43
### Content
Slide 43
SGD for Strongly Convex Functions

**Proof**
Similarly as in the previous proof,
$$\|x^{t+1} - x^*\|^2 = \|x^t - \eta_t g(x^t; \xi_t) - x^*\|^2$$
$$= \|x^t - x^*\|^2 - 2\eta_t g(x^t; \xi_t)^T(x^t - x^*) + \eta_t^2 \|g(x^t; \xi_t)\|^2$$

Therefore,
$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta_t^2 G^2 - \mathbb{E}[2\eta_t g(x^t; \xi_t)^T(x^t - x^*) \mid x^t]$
$= \|x^t - x^*\|^2 + \eta_t^2 G^2 - 2\eta_t(x^t - x^*)^T \mathbb{E}[g(x^t; \xi_t) \mid x^t]$
$= \|x^t - x^*\|^2 + \eta_t^2 G^2 - 2\eta_t(x^t - x^*)^T \nabla f(x^t)$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 44
### Content
Slide 44
SGD for Strongly Convex Functions

**Proof [continued]**
Previously we would have used the descent lemma (a consequence of smoothness) to bound the squared norm of the gradient ($\|\nabla f(x)\|^2$).

However, in the current stochastic gradient setup, the expected squared norm of the gradient,
$$\mathbb{E}_\xi[\|g(x; \xi)\|^2] = \|\mathbb{E}_\xi[g(x; \xi)]\|^2 + \text{Var}_\xi[g(x; \xi)]$$
includes two contributions:
* the squared norm of the expected gradient, which we want to control by smoothness,
* the variance of the stochastic gradients. We should not expect this to decrease as we get close to the optimum.

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 45
### Content
Slide 45
SGD for Strongly Convex Functions

**Proof [Continued]**
Since $f$ is $\alpha$-strongly convex,
$$f(y) \ge f(x) + \nabla f(x)^T(y - x) + \frac{\alpha}{2} \|y - x\|^2$$

Therefore,
$$f(x^*) \ge f(x^t) + \nabla f(x^t)^T(x^* - x^t) + \frac{\alpha}{2} \|x^* - x^t\|^2$$
$$\implies f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \ge \nabla f(x^t)^T(x^* - x^t)$$
$$\implies 2\eta_t \left( f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \right) \ge 2\eta_t \nabla f(x^t)^T(x^* - x^t)$$
$$\implies 2\eta_t \left( f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \right) \ge -2\eta_t \nabla f(x^t)^T(x^t - x^*)$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 46
### Content
Slide 46
SGD for Strongly Convex Functions

**Proof [Continued]**
As we discussed earlier,
$$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta_t^2 G^2 - 2\eta_t(x^t - x^*)^T \nabla f(x^t)$$
$$2\eta_t \left( f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \right) \ge -2\eta_t \nabla f(x^t)^T(x^t - x^*)$$

Therefore,
$$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta_t^2 G^2 + 2\eta_t \left( f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \right)$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 47
### Content
Slide 47
SGD for Strongly Convex Functions

**Proof [Continued]**
$$\mathbb{E}[\|x^{t+1} - x^*\|^2 \mid x^t] \le \|x^t - x^*\|^2 + \eta_t^2 G^2 + 2\eta_t \left( f(x^*) - f(x^t) - \frac{\alpha}{2} \|x^* - x^t\|^2 \right)$$

Therefore, [after taking expectation w.r.t the distribution of $x^t$]
$$\mathbb{E}[\|x^{t+1} - x^*\|^2] \le \mathbb{E}[\|x^t - x^*\|^2] + \eta_t^2 G^2 + 2\eta_t \left( f(x^*) - \mathbb{E}[f(x^t)] - \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2] \right) \quad (*1)$$

Thus,
$$\mathbb{E}[\|x^{t+1} - x^*\|^2] \le (1 - \alpha\eta_t) \mathbb{E}[\|x^t - x^*\|^2] + \eta_t^2 G^2 + 2\eta_t (f(x^*) - \mathbb{E}[f(x^t)])$$

Now, since $x^*$ is a minimum and thus $f(x^*) - \mathbb{E}[f(x^t)] \le 0$, we have that
$$\mathbb{E}[\|x^{t+1} - x^*\|^2] \le (1 - \alpha\eta_t) \mathbb{E}[\|x^t - x^*\|^2] + \eta_t^2 G^2 \quad (*2)$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 48
### Content
Slide 48
SGD for Strongly Convex Functions

**Proof [Continued]**
$$\mathbb{E}[\|x^{t+1} - x^*\|^2] \le (1 - \alpha\eta_t) \mathbb{E}[\|x^t - x^*\|^2] + \eta_t^2 G^2 \quad (*2)$$

**Proof of Claim 1**
We need to prove:
$$\alpha\eta < 1, \text{ fixed step-size } \eta \implies \mathbb{E}\|x^k - x^*\|^2 \le (1 - \alpha\eta)^k \|x^0 - x^*\|^2 + \frac{\eta G}{\alpha}$$

This follows from the (*2) by recursion $\blacksquare$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 49
### Content
Slide 49
SGD for Strongly Convex Functions

$$(*1) \quad \mathbb{E}[\|x^{t+1} - x^*\|^2] \le \mathbb{E}[\|x^t - x^*\|^2] + \eta_t^2 G^2 + 2\eta_t \left( f(x^*) - \mathbb{E}[f(x^t)] - \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2] \right)$$

**Proof of Claim 2:**
We need to prove: $\eta_t = \frac{1}{\alpha(t+1)} \implies \mathbb{E} f \left( \frac{1}{k} \sum_{t=1}^k x^t \right) - f(x^*) \le \frac{G^2(1 + \log k)}{2\alpha k}$

From (*1), we have that
$$-2\eta_t (f(x^*) - \mathbb{E}[f(x^t)]) \le \mathbb{E}[\|x^t - x^*\|^2] - \mathbb{E}[\|x^{t+1} - x^*\|^2] + \eta_t^2 G^2 - \alpha\eta_t \mathbb{E}[\|x^* - x^t\|^2]$$
$$2\eta_t (\mathbb{E}[f(x^t)] - f(x^*)) \le \mathbb{E}[\|x^t - x^*\|^2] - \mathbb{E}[\|x^{t+1} - x^*\|^2] + \eta_t^2 G^2 - \alpha\eta_t \mathbb{E}[\|x^* - x^t\|^2]$$
$$\mathbb{E}[f(x^t)] - f(x^*) \le \frac{\mathbb{E}[\|x^t - x^*\|^2] - \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2\eta_t} + \frac{\eta_t G^2}{2} - \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2]$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 50
### Content
Slide 50
SGD for Strongly Convex Functions

**Proof [Continued]**
$$\mathbb{E}[f(x^t)] - f(x^*) \le \frac{\mathbb{E}[\|x^t - x^*\|^2] - \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2\eta_t} + \frac{\eta_t G^2}{2} - \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2]$$

Therefore [by summing $\sum_{t=0}^{k-1}$],
$$\sum_{t=0}^{k-1} (\mathbb{E}[f(x^t)] - f(x^*)) \le \sum_{t=0}^{k-1} \frac{\mathbb{E}[\|x^t - x^*\|^2] - \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2\eta_t} - \sum_{t=0}^{k-1} \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2] + \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$
since $\eta_t = \frac{1}{\alpha(t+1)}$
$$= \sum_{t=0}^{k-1} \frac{\alpha(t+1) \mathbb{E}[\|x^t - x^*\|^2] - \alpha(t+1) \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2} - \sum_{t=0}^{k-1} \frac{\alpha}{2} \mathbb{E}[\|x^* - x^t\|^2] + \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$
$$= \sum_{t=0}^{k-1} \frac{\alpha t \mathbb{E}[\|x^t - x^*\|^2] - \alpha(t+1) \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2} + \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 51
### Content
Slide 51
SGD for Strongly Convex Functions

**Proof [Continued]**
$$\sum_{t=0}^{k-1} (\mathbb{E}[f(x^t)] - f(x^*)) \le \sum_{t=0}^{k-1} \frac{\alpha t \mathbb{E}[\|x^t - x^*\|^2] - \alpha(t+1) \mathbb{E}[\|x^{t+1} - x^*\|^2]}{2} + \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$
$$= \frac{\alpha}{2} \sum_{t=0}^{k-1} [t \mathbb{E}[\|x^t - x^*\|^2] - (t+1) \mathbb{E}[\|x^{t+1} - x^*\|^2]] + \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$
$$\le \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2}$$

$(0a_0 - 1a_1) + (1a_1 - 2a_2) + (2a_2 - 3a_3) + \dots + ((k-1)a_{k-1} - ka_k) = -ka_k \le 0$

Carnegie Mellon University

### Visual Description
Text-only slide.

---

## Page 52
### Content
Slide 52
SGD for Strongly Convex Functions

**Proof [Continued]**
$$\sum_{t=0}^{k-1} (\mathbb{E}[f(x^t)] - f(x^*)) \le \sum_{t=0}^{k-1} \frac{\eta_t G^2}{2} = \frac{G^2}{2\alpha} \sum_{t=0}^{k-1} \frac{1}{t+1} \quad \text{[since } \eta_t = \frac{1}{\alpha(t+1)}\text{]}$$
$$\le \frac{G^2}{2\alpha} (1 + \log k)$$

$H_n = \sum_{k=1}^n \frac{1}{k}, \quad H_n \le 1 + \log n$

Therefore,
$$\frac{1}{k} \sum_{t=0}^{k-1} \mathbb{E}[f(x^t)] - f(x^*) \le \frac{G^2}{2\alpha k} (1 + \log k)$$

Thus, [using Jensen's inequality and the assumption that $f$ is convex]
$$\mathbb{E} f \left( \frac{1}{k} \sum_{t=0}^{k-1} x^t \right) - f(x^*) \le \frac{1}{k} \sum_{t=0}^{k-1} \mathbb{E}[f(x^t)] - f(x^*) \le \frac{G^2}{2\alpha k} (1 + \log k) \blacksquare$$

Carnegie Mellon University

### Visual Description
Text-only slide.
