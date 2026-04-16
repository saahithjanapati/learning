# 2. Proximal Gradient and Gradient Mapping

## Table of Contents

- [[#2.00 Where This Topic Came From in the Course]]
- [[#2.0 Why Proximal Gradient Exists]]
- [[#2.1 Three Ways to Motivate the Update]]
    - [[#2.1.1 Local Quadratic Approximation]]
    - [[#2.1.2 As a Generalization of Projected Gradient Descent]]
        - [[#Projected Gradient Descent Refresher]]
    - [[#2.1.3 As a Majorization-Minimization Method]]
- [[#2.2 Core Definitions]]
    - [[#2.2.1 Proximal Operator]]
    - [[#2.2.2 Proximal-Gradient Update]]
    - [[#2.2.3 Gradient Mapping]]
- [[#2.3 Special Cases You Should Know]]
    - [[#2.3.1 Ordinary Gradient Descent]]
    - [[#2.3.2 Projected Gradient Descent]]
    - [[#2.3.3 Pure Proximal Minimization: the Case $g=0$]]
- [[#2.4 Important Proximal Examples]]
    - [[#2.4.1 Indicator Functions]]
    - [[#2.4.2 $\ell_1$ Regularization and Soft Thresholding]]
    - [[#2.4.3 Why ISTA Matters]]
    - [[#2.4.4 Connection to the Earlier Soft-Thresholding Lecture]]
    - [[#2.4.5 Matrix Completion and Nuclear-Norm Prox]]
- [[#2.5 Proximal-Operator Properties]]
    - [[#2.5.1 Optimality Condition of the Prox Step]]
    - [[#2.5.2 Contraction / Nonexpansiveness]]
- [[#2.6 Fixed Points, Optimality, and Why $G_\eta(x)=0$ Matters]]
    - [[#2.6.1 Direction 1: $G_\eta(x^*)=0 \Rightarrow 0\in \nabla g(x^*)+\partial h(x^*)$]]
    - [[#2.6.2 Direction 2: $0\in \nabla g(x^*)+\partial h(x^*) \Rightarrow G_\eta(x^*)=0$]]
- [[#2.7 Main Descent Lemma for Proximal Gradient]]
    - [[#2.7.1 Proof Structure You Should Memorize]]
    - [[#2.7.2 Clean Walkthrough of the Main Steps]]
- [[#2.8 Convergence Rate in the Convex Case]]
    - [[#2.8.1 Proof Template]]
- [[#2.9 Strongly Convex Extension]]
    - [[#2.9.1 Where the New Term Comes From]]
    - [[#2.9.2 Linear Convergence Theorem]]
    - [[#2.9.3 Proof Idea for the Linear Rate]]
- [[#2.10 What Quiz 3 Suggests You Must Know Precisely]]
- [[#2.11 How This Section Connects to Homework 3]]
- [[#2.12 Exam-Facing Checklist]]
- [[#2.13 Common Traps]]


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

The easiest mental contrast is:

- subgradient method: "pick some valid slope and hope it helps"
- proximal gradient: "use the exact gradient where possible, then fix the step using the structure of the nonsmooth term"

## 2.1 Three Ways to Motivate the Update

The lectures gave several equivalent ways to understand the algorithm. You should know at least two of them.

### 2.1.1 Local Quadratic Approximation

If $f$ were differentiable, gradient descent can be motivated as minimizing the local model

$$
f(x)+\nabla f(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2.
$$

If this expression feels mysterious, break it into pieces:

- $f(x)$ is just the current function value, so it is a constant with respect to $z$
- $\nabla f(x)^T(z-x)$ is the first-order linear approximation telling you how the function changes near $x$
- $\frac{1}{2\eta}\|z-x\|^2$ is a penalty for moving too far away from the current point

That last term is crucial. If you tried to minimize only

$$
f(x)+\nabla f(x)^T(z-x),
$$

then the problem would usually be unbounded below: as long as $\nabla f(x)\neq 0$, you could keep moving farther and farther in the direction $-\nabla f(x)$ and make the linear term smaller forever.

So the quadratic term is what turns "here is a good local direction" into "here is a finite local step."

You can also think of it as replacing the true Hessian in a second-order model by the simpler matrix

$$
\frac{1}{\eta}I.
$$

That is why the minimizer becomes the usual GD step instead of something unbounded.

Let us do that algebra explicitly.

We want to minimize

$$
\phi(z)=f(x)+\nabla f(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2.
$$

Since $f(x)$ does not depend on $z$, it does not a
ffect the minimizer. So this is equivalent to minimizing

$$
\nabla f(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2.
$$

Now differentiate with respect to $z$:

$$
\nabla_z \phi(z)=\nabla f(x)+\frac{1}{\eta}(z-x).
$$

Set this equal to zero:

$$
\nabla f(x)+\frac{1}{\eta}(z-x)=0.
$$

So

$$
z-x=-\eta \nabla f(x),
$$

which means

$$
z=x-\eta \nabla f(x).
$$

That is the ordinary gradient-descent update.

For the composite objective $f=g+h$, we cannot differentiate $h$, so we only linearize and regularize the smooth part:

$$
x^+
=
\arg\min_z
\left\{
g(x)+\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2+h(z)
\right\}.
$$

Now slow down the algebra.

First, $g(x)$ is a constant with respect to $z$, so it does not affect the minimizer. Therefore we can drop it and minimize

$$
\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2+h(z).
$$

Next, expand the quadratic-looking part into a completed square.

We want to show that

$$
\nabla g(x)^T(z-x)+\frac{1}{2\eta}\|z-x\|^2
$$

is the same as

$$
\frac{1}{2\eta}\|z-(x-\eta \nabla g(x))\|^2
$$

up to constants that do not depend on $z$.

Write

$$
z-(x-\eta \nabla g(x))=(z-x)+\eta \nabla g(x).
$$

Then

$$
\|z-(x-\eta \nabla g(x))\|^2
=
\|(z-x)+\eta \nabla g(x)\|^2.
$$

Expand:

$$
\|(z-x)+\eta \nabla g(x)\|^2
=
\|z-x\|^2+2\eta \nabla g(x)^T(z-x)+\eta^2\|\nabla g(x)\|^2.
$$

Now multiply by $\frac{1}{2\eta}$:

$$
\frac{1}{2\eta}\|z-(x-\eta \nabla g(x))\|^2
=
\frac{1}{2\eta}\|z-x\|^2+\nabla g(x)^T(z-x)+\frac{\eta}{2}\|\nabla g(x)\|^2.
$$

So the only difference between the two expressions is the constant

$$
\frac{\eta}{2}\|\nabla g(x)\|^2,
$$

which does not depend on $z$ and therefore does not change the minimizer.

That is why we can rewrite the update as:

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

So if you already understand projected GD, you already understand half the idea of proximal methods. Proximal gradient is just saying:

- maybe the "constraint-like" part is not literally a constraint set
- but it can still be handled by a correction step that looks projection-like

#### Projected Gradient Descent Refresher

If this connection feels fuzzy, here is the slow version.

Suppose the problem is

$$
\min_{x\in C} g(x),
$$

where:

- $g$ is differentiable
- $C$ is a convex feasible set

Ordinary gradient descent would ignore the constraint and take the step

$$
y^{t+1}=x^t-\eta_t \nabla g(x^t).
$$

But there is a problem: the point $y^{t+1}$ might not lie in $C$.

So projected gradient descent does two steps:

1. take the usual gradient step
$$
y^{t+1}=x^t-\eta_t \nabla g(x^t)
$$
2. project back onto the feasible set
$$
x^{t+1}=P_C(y^{t+1})
$$

Here

$$
P_C(y)=\arg\min_{z\in C}\frac12\|z-y\|^2
$$

means:

"among all feasible points in $C$, choose the one closest to $y$."

So projected gradient descent is literally:

- try the unconstrained gradient step
- if that step leaves the feasible set, pull it back to the nearest feasible point

Now connect this with proximal gradient.

Define the indicator function of the set $C$ by

$$
\mathbb{I}_C(x)=
\begin{cases}
0 & x\in C \\
\infty & x\notin C.
\end{cases}
$$

This notation looks strange at first, but it is just a trick for encoding constraints as part of the objective.

Why does this work?

If you minimize

$$
g(x)+\mathbb{I}_C(x),
$$

then:

- points inside $C$ have objective value $g(x)+0=g(x)$
- points outside $C$ have objective value $g(x)+\infty=\infty$

So any minimizer must lie in $C$. In other words,

$$
\min_{x\in C} g(x)
\qquad\text{and}\qquad
\min_x g(x)+\mathbb{I}_C(x)
$$

are the same optimization problem written in two different ways.

Now compute the prox of the indicator:

$$
\operatorname{prox}_{\eta,\mathbb{I}_C}(v)
=
\arg\min_z
\left\{
\frac{1}{2\eta}\|z-v\|^2+\mathbb{I}_C(z)
\right\}.
$$

Because $\mathbb{I}_C(z)=\infty$ outside $C$, the minimization is automatically forced to stay inside $C$. So this becomes

$$
\operatorname{prox}_{\eta,\mathbb{I}_C}(v)
=
\arg\min_{z\in C}\frac{1}{2\eta}\|z-v\|^2.
$$

The factor $\frac{1}{2\eta}$ does not change the minimizer, so this is exactly

$$
P_C(v).
$$

That is the full meaning of

$$
h=\mathbb{I}_C.
$$

It means:

- the nonsmooth term is not a penalty like $\lambda\|x\|_1$
- instead it is a hard constraint saying "you must stay in the set $C$"

So proximal gradient with $h=\mathbb{I}_C$ becomes

$$
x^{t+1}
=
\operatorname{prox}_{\eta,\mathbb{I}_C}(x^t-\eta \nabla g(x^t))
=
P_C(x^t-\eta \nabla g(x^t)),
$$

which is exactly projected gradient descent.

This is the clean bridge:

- projected GD is prox-GD with a set indicator
- prox-GD is projected GD generalized from sets to more general nonsmooth structure

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

If you want one sentence for this whole subsection, it is:

"At each step, proximal gradient minimizes an easier upper-bound model of the true objective."

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

This is useful conceptually because it means:

- once you know the prox for a regularizer $h$, you can reuse it in many different problems
- the data-fit term $g$ might change from problem to problem
- but the nonsmooth correction rule stays the same

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

In words:

1. ignore $h$ for one moment and take the usual gradient step for $g$
2. take the resulting point and "clean it up" using the prox for $h$

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

If that still feels abstract, rewrite the definition one more time:

$$
\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))=x-\eta G_\eta(x).
$$

This tells you exactly what $G_\eta(x)$ is doing.

Start with the raw gradient proposal

$$
x-\eta \nabla g(x).
$$

Then apply the prox correction to get the actual next point

$$
x^+=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

The vector

$$
x-x^+
$$

is the total change from the current point to the next point. Dividing by $\eta$ gives a gradient-like object:

$$
G_\eta(x)=\frac{x-x^+}{\eta}.
$$

So:

- $-\eta G_\eta(x)$ is the actual step
- $G_\eta(x)$ is the step normalized to look like a generalized gradient

This is exactly parallel to ordinary GD:

$$
x^+=x-\eta \nabla f(x).
$$

There, the actual step is $-\eta \nabla f(x)$. Here, the actual step is $-\eta G_\eta(x)$.

So if you ever forget what the gradient mapping means, remember this:

- $\nabla f(x)$ tells you what smooth GD would do
- $G_\eta(x)$ tells you what composite GD actually does after the prox correction

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

The important intuition here is:

- a random subgradient of a nonsmooth function can point in a "legal" direction without being a useful descent direction
- the prox point is chosen by solving a minimization problem, so it already contains descent information

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

It is worth seeing exactly where it comes from.

By definition,

$$
u=\operatorname{prox}_{\eta,h}(v)
$$

means that $u$ minimizes

$$
\psi(z)=\frac{1}{2\eta}\|z-v\|^2+h(z).
$$

Since $\psi$ is convex, first-order optimality says

$$
0\in \partial \psi(u).
$$

Now take the subdifferential term by term:

- the quadratic part is differentiable, with gradient
$$
\frac{1}{\eta}(u-v)
$$
- the nonsmooth part contributes
$$
\partial h(u)
$$

So

$$
0\in \frac{1}{\eta}(u-v)+\partial h(u).
$$

Rearrange:

$$
\frac{1}{\eta}(v-u)\in \partial h(u).
$$

That is the prox optimality condition.

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

Before the proof, keep the picture straight:

1. a point is optimal for the composite problem if it satisfies
$$
0\in \nabla g(x^*)+\partial h(x^*)
$$
2. a point is a fixed point of the prox update if
$$
x^*=\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*))
$$
3. the gradient mapping is zero exactly when the point is a fixed point:
$$
G_\eta(x^*)=0
\iff
x^*=\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*))
$$

So the theorem is really saying that all three of these viewpoints are equivalent.

That equivalence is the main conceptual reason the gradient mapping is important.

If $G_\eta(x)$ were just notation for the step, it would not be very interesting. But the theorem says much more:

- zero gradient mapping
- fixed point of the prox update
- first-order optimality of the composite objective

are all the same statement in different language.

### 2.6.1 Direction 1: $G_\eta(x^*)=0 \Rightarrow 0\in \nabla g(x^*)+\partial h(x^*)$

Start from the definition

$$
\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))=x-\eta G_\eta(x).
$$

This identity is just a rearrangement of the definition of $G_\eta(x)$. We are writing the prox output explicitly.

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

This is the key substitution. We are replacing the abstract prox point $u$ by the explicit expression coming from the gradient mapping.

Then

$$
G_\eta(x)-\nabla g(x)\in \partial h(x-\eta G_\eta(x)).
$$

Now the magic happens: if the gradient mapping is zero, then the argument of the subdifferential becomes just $x$, and the left-hand side loses the $G_\eta(x)$ term.

That is why this theorem works. The gradient mapping is defined so that when it vanishes, the prox point collapses back to the original point.

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

This is written to match the prox optimality pattern

$$
(v-u)\in \eta \partial h(u).
$$

Here we are choosing

$$
v=x^*-\eta \nabla g(x^*),
\qquad
u=x^*.
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

If you get lost in this proof, the safest way to organize it is:

- put all the $g$ terms in one bucket
- put all the $h$ terms in one bucket
- only combine them at the very end

Most confusion in proximal-gradient proofs comes from mixing those two buckets too early.

In plain terms:

- use one inequality to control the smooth part
- use a different inequality to control the nonsmooth part
- only after each part is under control do you put them back together

### 2.7.2 Clean Walkthrough of the Main Steps

Let

$$
y=x-\eta G_\eta(x).
$$

Then $y$ is the next iterate.

It is helpful to stop and name this point, because otherwise the proof gets unreadable. Every time you see $x-\eta G_\eta(x)$, you should think "that is the prox-updated point."

From smoothness of $g$,

$$
g(y)\le g(x)+\nabla g(x)^T(y-x)+\frac{\beta}{2}\|y-x\|^2.
$$

This is just the usual smoothness inequality for the smooth part. We are temporarily pretending $h$ does not exist.

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

This is where many people get tripped up: the subgradient for $h$ is taken at the prox point $y$, not at the original point $x$.

By prox optimality, we may choose

$$
u=G_\eta(x)-\nabla g(x).
$$

This is not a random guess. It comes from the identity proved earlier:

$$
G_\eta(x)-\nabla g(x)\in \partial h(x-\eta G_\eta(x))
=
\partial h(y).
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

This cancellation is the main reason the proof works cleanly. The smooth part creates one $\nabla g(x)^T G_\eta(x)$ term and the prox-optimality handling of $h$ creates the opposite one.

So if you are ever checking your algebra and the proof is not simplifying, one of the first things to inspect is whether you wrote the $h$ inequality using the correct prox-point subgradient. That is what makes the cancellation possible.

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

At this point the proof is basically copying the smooth GD proof, except every ordinary gradient is replaced by the gradient mapping.

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

This is the exact place where the descent lemma plugs into the distance recursion. If you lose this line, the rest of the proof feels like magic.

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

So the real proof pattern is:

1. one-step distance recursion
2. use descent lemma to control the hard inner-product term
3. get a telescoping difference of squared distances
4. sum over time
5. divide by $k$

That is basically the same story as smooth gradient descent:

- derive a one-step inequality
- turn it into a telescoping sum
- extract the rate from the telescoping structure

The only new ingredient is that the gradient mapping and the prox optimality condition replace the ordinary gradient.

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
