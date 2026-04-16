# 2. Proximal Gradient and Gradient Mapping

Proximal gradient descent is the course's answer to the question:

How do we recover gradient-descent-like behavior when the objective is not differentiable, but the nonsmoothness has structure?

The structured setting is the composite objective

$$
f(x)=g(x)+h(x),
$$

where:

- $g$ is the smooth part
- $h$ is convex and possibly nonsmooth
- in the standard convex theory, both are convex

This is more special than generic nonsmooth optimization, but it appears constantly in regularized learning problems.

The point of the method is that we do not treat $f$ as one undifferentiable black box. We keep the nice part $g$ in gradient form and handle the difficult part $h$ through a proximal subproblem.

## 2.00 Where This Topic Came From in the Course

This topic was built across several lectures.

The course path was roughly:

1. `Feb 10`: subgradient method
- generic nonsmooth optimization
- arbitrary subgradients need not be descent directions
- convergence is slower and less structured

2. `Feb 12`: projected gradient and projected subgradient
- "take a step, then project"
- projection already has the same quadratic-correction form that later becomes prox

3. `Feb 17`: optimality conditions and soft-thresholding
- solve simple $\ell_1$-regularized problems by subgradient optimality
- derive the soft-thresholding operator explicitly

4. `Feb 17+24`: main proximal-gradient lecture
- derive proximal gradient from local quadratic approximation
- connect prox to projection
- define ISTA and the gradient mapping
- prove the main descent lemma and the $O(1/k)$ theorem

5. `Feb 24` examples lecture
- study the case $g=0$
- prove descent without smoothness
- extend the intuition to matrix-valued problems such as matrix completion

So the topic is not just one theorem. It is the culmination of:

- subgradients
- projections
- optimality conditions
- soft-thresholding
- composite-optimization convergence proofs

## 2.0 Why Proximal Gradient Exists

The lecture explicitly contrasted proximal gradient with the subgradient method.

For a generic convex nonsmooth objective, subgradient descent gives a rate of order $O(1/\sqrt{k})$ and can be slow. But many nonsmooth objectives actually look like

$$
f(x)=g(x)+h(x),
$$

where:

- $g$ is differentiable and often $\beta$-smooth
- $h$ is not differentiable, but is "simple" in the sense that its prox can be computed efficiently

The proximal-gradient lecture's main message was:

- we cannot beat nonsmooth lower bounds for arbitrary nonsmooth functions
- but for composite objectives, we can often recover gradient-descent-style guarantees

This is why the lecture introduces ISTA and proves an $O(1/k)$ rate, even though the full objective $f$ is not smooth.

The February 10 subgradient lecture matters here because it explains what proximal gradient is improving on.

In the subgradient method, the update

$$
x^+=x-\eta g_x,
\qquad
g_x\in \partial f(x),
$$

need not be a descent step. The lecture explicitly emphasized that an arbitrary subgradient can increase the objective.

Proximal gradient avoids that failure mode by using structure:

- a true gradient for the smooth part $g$
- an implicit correction step for the nonsmooth part $h$

That is why the method has clean descent lemmas while the plain subgradient method usually does not.

## 2.1 Three Ways to Motivate the Update

The lectures gave several equivalent ways to understand the algorithm. You should know at least two of them.

### 2.1.1 Local Quadratic Approximation

If $f$ were differentiable, gradient descent can be motivated as minimizing the local model

$$
f(x)+\nabla f(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2.
$$

For the composite objective $f=g+h$, we cannot differentiate $h$, so we only linearize and regularize the smooth part:

$$
x^+
=
\arg\min_z
\left\{
g(x)+\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2+h(z)
\right\}.
$$

Now drop the constant term $g(x)$ and complete the square:

$$
x^+
=
\arg\min_z
\left\{
\frac{1}{2\eta}\|z-(x-\eta \nabla g(x))\|^2+h(z)
\right\}.
$$

This is exactly a proximal operator evaluation.

So the algorithm is:

1. take a usual gradient step for $g$
2. correct that proposal by solving the prox problem for $h$

### 2.1.2 As a Generalization of Projected Gradient Descent

If $h=\mathbb{I}_C$ is the indicator of a convex set $C$, then

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_{z\in C}\frac{1}{2\eta}\|z-v\|^2,
$$

which is just the Euclidean projection of $v$ onto $C$.

So if

$$
f(x)=g(x)+\mathbb{I}_C(x),
$$

proximal gradient becomes

$$
x^{t+1}=\Pi_C(x^t-\eta \nabla g(x^t)),
$$

which is exactly projected gradient descent.

This is conceptually important:

- ordinary GD is the case $h=0$
- projected GD is the case $h=\mathbb{I}_C$
- proximal GD is the common generalization

### 2.1.3 As a Majorization-Minimization Method

If $g$ is $\beta$-smooth and $\eta\le 1/\beta$, then

$$
g(z)\le g(x)+\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2.
$$

So the quadratic model

$$
\hat g_\eta(z)
=
g(x)+\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2
$$

is an upper bound on $g(z)$ that is tight at $z=x$.

Therefore

$$
f(z)=g(z)+h(z)\le \hat g_\eta(z)+h(z).
$$

The proximal-gradient step simply minimizes this upper bound. This is the MM viewpoint:

- build a tight upper bound at the current iterate
- minimize the upper bound
- repeat

This gives a good intuitive reason for why the algorithm descends.

## 2.2 Core Definitions

### 2.2.1 Proximal Operator

For a convex function $h$, define

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z
\left\{
\frac{1}{2\eta}\|z-v\|^2+h(z)
\right\}.
$$

You should read this as:

"Find a point that balances staying close to $v$ and making $h$ small."

The lecture emphasized that $\operatorname{prox}_{\eta,h}$ depends only on $h$, not on $g$.

### 2.2.2 Proximal-Gradient Update

The algorithm can be written in two stages:

$$
y^{t+1}=x^t-\eta_t \nabla g(x^t),
\qquad
x^{t+1}=\operatorname{prox}_{\eta_t,h}(y^{t+1}).
$$

Or directly as

$$
x^{t+1}
=
\operatorname{prox}_{\eta_t,h}(x^t-\eta_t \nabla g(x^t)).
$$

### 2.2.3 Gradient Mapping

The lecture introduces the generalized gradient

$$
G_\eta(x)
=
\frac{1}{\eta}
\left(
x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))
\right).
$$

This lets us write the update in gradient-descent form:

$$
x^{t+1}=x^t-\eta_t G_{\eta_t}(x^t).
$$

This definition matters for several reasons:

- if $h=0$, then $G_\eta(x)=\nabla g(x)$
- if $h=\mathbb{I}_C$, then $G_\eta(x)$ is the projected-gradient analogue
- convergence proofs are written in terms of $\|G_\eta(x)\|$
- stationarity is expressed as $G_\eta(x)=0$

So the gradient mapping is not just notation for the step. It is the natural substitute for the gradient in the composite setting.

## 2.3 Special Cases You Should Know

### 2.3.1 Ordinary Gradient Descent

If $h=0$, then

$$
\operatorname{prox}_{\eta,h}(v)=v,
$$

so

$$
x^{t+1}=x^t-\eta \nabla g(x^t).
$$

### 2.3.2 Projected Gradient Descent

If $h=\mathbb{I}_C$, then

$$
\operatorname{prox}_{\eta,h}(v)=\Pi_C(v),
$$

so proximal gradient becomes projected GD.

This is exactly the February 12 projected-gradient update:

$$
y^{t+1}=x^t-\eta_t \nabla f(x^t),
\qquad
x^{t+1}=P_C(y^{t+1}).
$$

So projected GD should be viewed as a special proximal method, not as a separate unrelated algorithm.

### 2.3.3 Pure Proximal Minimization: the Case $g=0$

When $g=0$, the update reduces to

$$
x^{t+1}=\operatorname{prox}_{\eta,h}(x^t).
$$

This case is useful because it shows the proximal step alone already has a descent structure, even when $h$ is nonsmooth.

The lecture proved the descent lemma

$$
h(x^{t+1})\le h(x^t)-\eta \|G_\eta(x^t)\|^2
$$

and more generally

$$
h(x^{t+1})
\le
h(x^*)-\eta \|G_\eta(x^t)\|^2+G_\eta(x^t)^T(x^t-x^*).
$$

This is one of the best intuition-building examples in the unit:

- arbitrary subgradients do not usually give a clean descent lemma
- the proximal step does

This is why the method is more powerful than plain subgradient descent when the structure matches.

## 2.4 Important Proximal Examples

### 2.4.1 Indicator Functions

If $h=\mathbb{I}_C$, then prox is projection.

### 2.4.2 $\ell_1$ Regularization and Soft Thresholding

For

$$
h(z)=\lambda \|z\|_1,
$$

the prox is the soft-thresholding operator applied coordinatewise:

$$
[S_\tau(x)]_i
=
\begin{cases}
x_i-\tau & x_i>\tau \\
0 & -\tau\le x_i\le \tau \\
x_i+\tau & x_i<-\tau.
\end{cases}
$$

Equivalently,

$$
S_\tau(x)_i=\operatorname{sign}(x_i)\max(|x_i|-\tau,0).
$$

For the Lasso objective

$$
f(x)=\frac12\|Ax-b\|^2+\lambda \|x\|_1,
$$

we have

$$
g(x)=\frac12\|Ax-b\|^2,
\qquad
\nabla g(x)=A^T(Ax-b),
$$

and the prox step becomes

$$
x^{t+1}
=
S_{\eta_t\lambda}
\left(
x^t-\eta_t A^T(Ax^t-b)
\right).
$$

This is ISTA.

### 2.4.3 Why ISTA Matters

ISTA is the canonical example for the whole unit:

- take a gradient step on the data-fit term
- take a soft-thresholding step on the sparsity term

So the method is not abstract. It directly recovers one of the most standard sparse-learning algorithms.

### 2.4.4 Connection to the Earlier Soft-Thresholding Lecture

Before the proximal-gradient lecture, the course already derived soft-thresholding from optimality conditions.

For the problem

$$
\min_x \frac12\|y-x\|^2+\lambda \|x\|_1,
$$

the February 17 optimality-conditions lecture wrote

$$
0\in -(y-x^*)+\lambda \partial \|x^*\|_1
$$

and then solved this coordinatewise to obtain the soft-thresholding formula.

That earlier lecture matters because it shows that the prox of $\lambda\|x\|_1$ is not a mysterious black box. It is exactly the optimizer of a quadratic-plus-$\ell_1$ objective, and it can be derived from subgradient optimality.

So when proximal gradient later writes

$$
\operatorname{prox}_{\eta \lambda \|\cdot\|_1}(v)=S_{\eta\lambda}(v),
$$

it is reusing a result that the course had already motivated from first-order optimality.

### 2.4.5 Matrix Completion and Nuclear-Norm Prox

The February 24 examples lecture extended the same pattern to matrices.

In matrix completion, one often uses

$$
f(X)=g(X)+\lambda \|X\|_*,
$$

where $\|X\|_*$ is the nuclear norm, the sum of singular values.

This is the matrix analogue of $\ell_1$ regularization:

- $\ell_1$ promotes sparse vectors
- nuclear norm promotes low-rank matrices

If

$$
Y=U\Sigma V^T
$$

is an SVD, then the prox of the nuclear norm is singular-value soft-thresholding:

$$
\operatorname{prox}_{\eta \lambda \|\cdot\|_*}(Y)
=
U\Sigma_{\eta\lambda}V^T,
$$

where $\Sigma_{\eta\lambda}$ is obtained by soft-thresholding the singular values in $\Sigma$.

This example is useful even if the exam only tests it conceptually:

- it shows prox methods are not only coordinatewise tricks
- it shows the same framework works for structured matrix regularization
- it reinforces that the complexity of the method lives in the prox for $h$

## 2.5 Proximal-Operator Properties

### 2.5.1 Optimality Condition of the Prox Step

If

$$
u=\operatorname{prox}_{\eta,h}(v),
$$

then first-order optimality of the prox subproblem gives

$$
0\in \frac{1}{\eta}(u-v)+\partial h(u),
$$

which is equivalent to

$$
\frac{1}{\eta}(v-u)\in \partial h(u).
$$

This is one of the most important identities in the entire section.

You use it constantly:

- to identify the subgradient of $h$ at the prox point
- to prove contraction
- to prove the fixed-point theorem
- to prove the descent lemma

### 2.5.2 Contraction / Nonexpansiveness

For convex $h$, the prox operator is a contraction in the sense

$$
\|\operatorname{prox}_{\eta,h}(x)-\operatorname{prox}_{\eta,h}(y)\|^2
\le
\langle x-y,\operatorname{prox}_{\eta,h}(x)-\operatorname{prox}_{\eta,h}(y)\rangle,
$$

and therefore

$$
\|\operatorname{prox}_{\eta,h}(x)-\operatorname{prox}_{\eta,h}(y)\|
\le
\|x-y\|.
$$

The proof uses:

1. the prox optimality condition at both points
2. monotonicity of the subdifferential of a convex function
3. algebra plus Cauchy-Schwarz

This is useful because it tells you the prox operator is stable and projection-like.

## 2.6 Fixed Points, Optimality, and Why $G_\eta(x)=0$ Matters

The lecture proved the theorem

$$
G_\eta(x^*)=0
\iff
0\in \nabla g(x^*)+\partial h(x^*).
$$

Since

$$
0\in \nabla g(x^*)+\partial h(x^*)
$$

is exactly the first-order optimality condition for the convex composite objective, this means:

$$
G_\eta(x^*)=0
\iff
x^* \text{ is optimal}.
$$

This is the proximal analogue of the fact that $\nabla f(x^*)=0$ characterizes optimality in smooth unconstrained convex optimization.

The proof is worth understanding.

### 2.6.1 Direction 1: $G_\eta(x^*)=0 \Rightarrow 0\in \nabla g(x^*)+\partial h(x^*)$

Start from the definition

$$
\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))=x-\eta G_\eta(x).
$$

Let

$$
u=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

Then prox optimality gives

$$
\frac{1}{\eta}\left((x-\eta \nabla g(x))-u\right)\in \partial h(u).
$$

Now substitute

$$
u=x-\eta G_\eta(x).
$$

Then

$$
G_\eta(x)-\nabla g(x)\in \partial h(x-\eta G_\eta(x)).
$$

If $G_\eta(x^*)=0$, this becomes

$$
0-\nabla g(x^*)\in \partial h(x^*),
$$

which is exactly

$$
0\in \nabla g(x^*)+\partial h(x^*).
$$

### 2.6.2 Direction 2: $0\in \nabla g(x^*)+\partial h(x^*) \Rightarrow G_\eta(x^*)=0$

If

$$
0\in \nabla g(x^*)+\partial h(x^*),
$$

then

$$
-\nabla g(x^*)\in \partial h(x^*).
$$

Multiply by $\eta$:

$$
-\eta \nabla g(x^*)\in \eta \partial h(x^*).
$$

So

$$
(x^*-\eta \nabla g(x^*))-x^*\in \eta \partial h(x^*).
$$

By the prox optimality equivalence, this means

$$
x^*=\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*)).
$$

Therefore the gradient mapping is zero:

$$
G_\eta(x^*)=0.
$$

## 2.7 Main Descent Lemma for Proximal Gradient

This is the central theorem of the section.

Assume:

- $g$ is convex and $\beta$-smooth
- $h$ is convex
- $\eta\le 1/\beta$

Then for any $x$ and any comparison point $z$,

$$
f(x-\eta G_\eta(x))
\le
f(z)+G_\eta(x)^T(x-z)-\frac{\eta}{2}\|G_\eta(x)\|^2.
$$

Two especially important specializations are:

1. set $z=x$:
$$
f(x-\eta G_\eta(x))
\le
f(x)-\frac{\eta}{2}\|G_\eta(x)\|^2
$$
This is the direct descent statement.

2. set $z=x^*$:
$$
f(x-\eta G_\eta(x))
\le
f(x^*)+G_\eta(x)^T(x-x^*)-\frac{\eta}{2}\|G_\eta(x)\|^2
$$
This is the form used in convergence proofs.

### 2.7.1 Proof Structure You Should Memorize

This proof was emphasized in lecture and then reused in HW3.

The pattern is:

1. apply smoothness to $g$ at the prox-updated point
2. apply convexity of $g$ to compare $g(x)$ and $g(z)$
3. use convexity of $h$ at the prox point
4. use the prox-optimality identity
$$
G_\eta(x)-\nabla g(x)\in \partial h(x-\eta G_\eta(x))
$$
5. add the $g$ and $h$ inequalities
6. use $\eta\beta\le 1$ to simplify the quadratic term

You do not need to memorize every line, but you do need to know what comes from smoothness, what comes from convexity, and what comes from prox optimality.

### 2.7.2 Clean Walkthrough of the Main Steps

Let

$$
y=x-\eta G_\eta(x).
$$

Then $y$ is the next iterate.

From smoothness of $g$,

$$
g(y)\le g(x)+\nabla g(x)^T(y-x)+\frac{\beta}{2}\|y-x\|^2.
$$

Since $y-x=-\eta G_\eta(x)$,

$$
g(y)\le g(x)-\eta \nabla g(x)^T G_\eta(x)+\frac{\beta \eta^2}{2}\|G_\eta(x)\|^2.
$$

Now use convexity of $g$:

$$
g(x)\le g(z)+\nabla g(x)^T(x-z).
$$

So

$$
g(y)\le g(z)+\nabla g(x)^T(x-z)-\eta \nabla g(x)^T G_\eta(x)+\frac{\beta \eta^2}{2}\|G_\eta(x)\|^2.
$$

For the nonsmooth part, convexity of $h$ at the prox point $y$ gives

$$
h(y)\le h(z)-u^T(z-y)
$$

for any $u\in \partial h(y)$.

By prox optimality, we may choose

$$
u=G_\eta(x)-\nabla g(x).
$$

So

$$
h(y)\le h(z)-(G_\eta(x)-\nabla g(x))^T(z-x+\eta G_\eta(x)).
$$

Expand that:

$$
h(y)\le h(z)-(G_\eta(x)-\nabla g(x))^T(z-x)-\eta \|G_\eta(x)\|^2+\eta \nabla g(x)^T G_\eta(x).
$$

Now add the bounds for $g(y)$ and $h(y)$.

The $\eta \nabla g(x)^T G_\eta(x)$ terms cancel, leaving

$$
f(y)\le f(z)+G_\eta(x)^T(x-z)+\left(\frac{\beta \eta^2}{2}-\eta\right)\|G_\eta(x)\|^2.
$$

If $\eta\le 1/\beta$, then

$$
\frac{\beta \eta^2}{2}-\eta \le -\frac{\eta}{2},
$$

so

$$
f(y)\le f(z)+G_\eta(x)^T(x-z)-\frac{\eta}{2}\|G_\eta(x)\|^2.
$$

That is the main descent lemma.

## 2.8 Convergence Rate in the Convex Case

For $\beta$-smooth convex $g$ and convex $h$, proximal GD with step size

$$
\eta=\frac{1}{\beta}
$$

achieves

$$
f(x^k)-f(x^*)
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

So the rate is

$$
O(1/k).
$$

This is one of the headline results of the lecture. The full objective is nonsmooth, but because the nonsmoothness is structured, we still recover the smooth-convex GD rate.

### 2.8.1 Proof Template

The proof mirrors gradient descent.

Start from the update

$$
x^{t+1}=x^t-\eta G_\eta(x^t).
$$

Expand the distance to the optimum:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta (x^t-x^*)^T G_\eta(x^t)
+\eta^2 \|G_\eta(x^t)\|^2.
$$

Rearrange:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
+2\eta
\left(
\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)
\right).
$$

Now use the descent lemma with $z=x^*$:

$$
f(x^{t+1})
\le
f(x^*)+G_\eta(x^t)^T(x^t-x^*)-\frac{\eta}{2}\|G_\eta(x^t)\|^2.
$$

This implies

$$
\frac{\eta}{2}\|G_\eta(x^t)\|^2-G_\eta(x^t)^T(x^t-x^*)
\le
f(x^*)-f(x^{t+1}).
$$

Substitute into the distance expansion:

$$
\|x^{t+1}-x^*\|^2
\le
\|x^t-x^*\|^2+2\eta(f(x^*)-f(x^{t+1})).
$$

Rearrange:

$$
f(x^{t+1})-f(x^*)
\le
\frac{1}{2\eta}
\left(
\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2
\right).
$$

With $\eta=1/\beta$,

$$
f(x^{t+1})-f(x^*)
\le
\frac{\beta}{2}
\left(
\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2
\right).
$$

Now sum from $t=0$ to $k-1$. The right-hand side telescopes:

$$
\sum_{t=0}^{k-1}(f(x^{t+1})-f(x^*))
\le
\frac{\beta}{2}
\left(
\|x^0-x^*\|^2-\|x^k-x^*\|^2
\right)
\le
\frac{\beta}{2}\|x^0-x^*\|^2.
$$

Divide by $k$ and use monotonicity of the function values under the descent lemma to conclude

$$
f(x^k)-f(x^*)
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

## 2.9 Strongly Convex Extension

This is where HW3 connects directly to the lecture.

Assume now:

- $g$ is $\beta$-smooth
- $g$ is $\alpha$-strongly convex
- $h$ is convex
- $\eta\le 1/\beta$

Then the strengthened descent lemma is

$$
f(x-\eta G_\eta(x))
\le
f(z)+G_\eta(x)^T(x-z)-\frac{\eta}{2}\|G_\eta(x)\|^2-\frac{\alpha}{2}\|x-z\|^2.
$$

Compared with the ordinary convex case, the new term is

$$
-\frac{\alpha}{2}\|x-z\|^2.
$$

That is exactly the strong-convexity improvement.

### 2.9.1 Where the New Term Comes From

In the ordinary proof, convexity of $g$ gives

$$
g(x)\le g(z)+\nabla g(x)^T(x-z).
$$

In the strongly convex case, you get the sharper inequality

$$
g(x)\le g(z)+\nabla g(x)^T(x-z)-\frac{\alpha}{2}\|x-z\|^2.
$$

That is the only structural change, but it propagates all the way to linear convergence.

### 2.9.2 Linear Convergence Theorem

With $\eta=1/\beta$ and condition number

$$
\kappa=\frac{\beta}{\alpha},
$$

the proximal-gradient iterates satisfy

$$
\|x^k-x^*\|^2
\le
(1-1/\kappa)^k\|x^0-x^*\|^2.
$$

So proximal gradient gets the same linear-type contraction you would expect from optimizing the smooth strongly convex part alone.

This is one of the main conceptual victories of the method:

- the full objective is nonsmooth
- but the structured nonsmoothness does not destroy the strong-convexity rate

### 2.9.3 Proof Idea for the Linear Rate

The HW3 hint is exactly right: combine

- the proximal-GD convergence proof from the convex case
- the strongly-convex GD proof style

Set $z=x^*$ in the strongly convex descent lemma:

$$
f(x^{t+1})
\le
f(x^*)+G_\eta(x^t)^T(x^t-x^*)
-\frac{\eta}{2}\|G_\eta(x^t)\|^2
-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

Then plug that into the distance expansion

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta (x^t-x^*)^T G_\eta(x^t)
+\eta^2\|G_\eta(x^t)\|^2.
$$

Exactly as in the strongly convex GD proof, the function-value term disappears because $f(x^*)\le f(x^{t+1})$, and the extra

$$
-\frac{\alpha}{2}\|x^t-x^*\|^2
$$

creates contraction. With $\eta=1/\beta$, the recursion becomes

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2
=
\left(1-\frac{1}{\kappa}\right)\|x^t-x^*\|^2.
$$

Then iterate this bound over $t$.

## 2.10 What Quiz 3 Suggests You Must Know Precisely

Quiz 3 asked for:

1. the convergence rate of proximal GD
2. the actual steps of the algorithm, including the prox definition

That means you should be able to write, cleanly and from memory:

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \frac{1}{2\eta}\|z-v\|^2+h(z)
$$

$$
y_{t+1}=x_t-\eta \nabla g(x_t)
$$

$$
x_{t+1}=\operatorname{prox}_{\eta,h}(y_{t+1})
$$

and the standard convex guarantee

$$
f(x^k)-f(x^*)
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

One important correction to keep straight:

- the theorem is a function-value guarantee
- not a statement that $\|x^k-x^*\|^2$ is itself shrinking like $O(1/k)$ in the basic convex case

## 2.11 How This Section Connects to Homework 3

HW3 Problem 1 was not asking for a new algorithm. It was testing whether you could:

- define the prox point
- identify the gradient mapping
- separate the smoothness argument for $g$ from the convexity argument for $h$
- use prox optimality at the prox point
- recognize where strong convexity changes the descent lemma

That is why the homework guide kept emphasizing:

- the prox point is $x-\eta G_\eta(x)$
- prox optimality gives a subgradient of $h$ at the prox point
- the smooth and nonsmooth pieces must be handled separately

If you can explain those three sentences clearly, you understand the unit at the level the homework wanted.

## 2.12 Exam-Facing Checklist

You should be able to do the following without hesitation:

- define the proximal operator correctly
- explain why prox generalizes projection
- write the proximal-gradient update in both two-step and one-line forms
- define the gradient mapping
- state why $G_\eta(x)=0$ is the right stationarity condition
- explain why $G_\eta(x)$ reduces to $\nabla g(x)$ when $h=0$
- derive ISTA for the Lasso
- state the main convex descent lemma
- state the convex $O(1/k)$ convergence theorem with its full inequality
- state the strong-convexity extension and the linear rate
- explain what comes from smoothness, what comes from convexity, and what comes from prox optimality

## 2.13 Common Traps

- Treating $h$ as if it were differentiable.
- Forgetting that the subgradient from prox optimality is taken at the prox point, not at the original point.
- Saying the gradient mapping is just the update direction and not a generalized optimality object.
- Forgetting that the basic convex theorem controls function value, not necessarily squared distance.
- Mixing up the roles of the convex theorem and the strongly convex theorem.
- Remembering only "$O(1/k)$" and forgetting the full theorem statement.
- Forgetting the special-case connections:
  - $h=0$ gives GD
  - $h=\mathbb{I}_C$ gives projected GD
  - $h=\lambda \|x\|_1$ gives soft-thresholding / ISTA
