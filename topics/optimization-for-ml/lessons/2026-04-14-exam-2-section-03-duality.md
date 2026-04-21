# 3. Lagrangians and LP Duality

## Table of Contents

- [[#3.0 Where This Topic Came From in the Course]]
- [[#3.1 Why Duality Exists]]
- [[#3.2 The Lagrangian for a General Constrained Problem]]
- [[#3.3 The Dual Function]]
    - [[#3.3.1 Tiny example: what the dual function is doing]]
- [[#3.4 Weak Duality]]
    - [[#3.4.1 Short proof of weak duality]]
- [[#3.5 LP Duality Derivation in Full]]
    - [[#3.5.1 Start from the primal]]
    - [[#3.5.2 Form the Lagrangian]]
    - [[#3.5.3 Take the infimum over x]]
    - [[#3.5.4 The finiteness condition]]
    - [[#3.5.5 Write the dual problem]]
- [[#3.6 Why the Dual Function Is Always Concave]]
- [[#3.7 Strong Duality, Saddle Points, and Slater]]
    - [[#3.7.1 Saddle-point viewpoint]]
    - [[#3.7.2 Minimax interpretation]]
- [[#3.8 QP and the Broader Convex-Duality View]]
- [[#3.9 How Quiz 3 and the Old Exam Calibrate This Topic]]
- [[#3.10 Common Traps]]

## 3.0 Where This Topic Came From in the Course

This topic was spread across several lectures rather than delivered as one isolated theorem:

1. `March 10`: LP, QP, and duality
2. `March 12 Part 1`: the Lagrangian function
3. `March 12 Part 2`: saddle points, minimax formulation, and Slater
4. `March 17` onward: KKT conditions, which are built directly on the Lagrangian and duality picture

`Quiz 3` shows what the course treated as high-yield:

- write the Lagrangian correctly
- derive the dual function correctly
- state the exact domain where the dual function is finite
- know that the dual function is concave even beyond convex primal problems

So this section should be read as foundational for both `KKT` and `SDP`, not as a standalone algebra exercise.

## 3.1 Why Duality Exists

In a constrained minimization problem, the constraints are annoying because they restrict the set of points we are allowed to compare.

Duality introduces multipliers that penalize constraint violation and packages the constrained problem into a function of both:

- the primal variable $x$
- multiplier variables such as $u$ and $\nu$

The dual problem is useful because it gives:

- lower bounds on the primal optimum
- a way to certify optimality through matching primal and dual values
- the structure that later becomes `KKT`

The clean mental model is:

- the primal problem searches over points $x$
- the dual problem searches over certificates/lower bounds

## 3.2 The Lagrangian for a General Constrained Problem

Consider a general minimization problem

$$
\min_x f(x)
\quad \text{s.t. } \quad
h_i(x)\le 0,\; i=1,\dots,m,
\qquad
\ell_j(x)=0,\; j=1,\dots,p.
$$

Its Lagrangian is

$$
L(x,\nu,u)
=
f(x)
+
\sum_{i=1}^m \nu_i h_i(x)
+
\sum_{j=1}^p u_j \ell_j(x),
\qquad
\nu_i \ge 0.
$$

Why do the inequality multipliers satisfy $\nu_i \ge 0$?

Because if $x$ is feasible, then $h_i(x)\le 0$, so a nonnegative multiplier makes the term $\nu_i h_i(x)$ nonpositive. That means for feasible $x$,

$$
L(x,\nu,u)\le f(x).
$$

That is the first hint that the Lagrangian will generate lower bounds.

Equality constraints do not get sign restrictions because $\ell_j(x)=0$ has no preferred direction.

## 3.3 The Dual Function

The dual function is

$$
g(\nu,u)=\inf_x L(x,\nu,u).
$$

This means:

- fix the multipliers first
- then let $x$ vary freely
- record the smallest value the Lagrangian can take

The dual function is always a lower bound on the primal objective at feasible points. Indeed, for any feasible $x$,

$$
L(x,\nu,u)\le f(x),
$$

so taking the infimum over all $x$ gives

$$
g(\nu,u)\le f(x).
$$

This is the core inequality behind weak duality.

The dual problem is therefore

$$
\max_{\nu,u} g(\nu,u)
\quad \text{s.t. } \quad
\nu \ge 0.
$$

So the dual tries to find the strongest lower bound obtainable from the Lagrangian.

### 3.3.1 Tiny example: what the dual function is doing

It helps to see one toy example before doing the full LP derivation.

Consider

$$
\min_x x
\quad \text{s.t. } \quad
x \ge 1.
$$

Rewrite the constraint in the standard $\le 0$ form:

$$
1-x \le 0.
$$

The Lagrangian is

$$
L(x,\nu)=x+\nu(1-x),
\qquad
\nu \ge 0.
$$

Expand:

$$
L(x,\nu) = (1-\nu)x+\nu.
$$

Now minimize over $x$.

- if $1-\nu \neq 0$, then this is a nonconstant linear function of $x$, so the infimum is $-\infty$
- if $1-\nu = 0$, i.e. $\nu=1$, then the $x$ term disappears and the infimum is $1$

So the dual function is

$$
g(\nu)
=
\begin{cases}
1, & \nu=1,\\
-\infty, & \text{otherwise.}
\end{cases}
$$

Then the dual problem is just

$$
\max_{\nu \ge 0} g(\nu),
$$

whose value is `1`, matching the primal optimum.

This toy example contains the whole LP-duality pattern in miniature:

- write the Lagrangian
- collect the $x$ terms
- ask when the infimum is finite
- optimize over the multipliers

## 3.4 Weak Duality

Weak duality says:

for every primal-feasible $x$ and dual-feasible $(\nu,u)$,

$$
g(\nu,u)\le f(x).
$$

Equivalently,

$$
\text{dual objective} \le \text{primal objective}.
$$

This is always true, regardless of whether strong duality holds.

This is why if someone hands you:

- a primal-feasible point
- a dual-feasible point

and the two objectives match, then you immediately know both are optimal.

That “matching objectives certify optimality” logic is the bridge from weak duality to optimality certificates.

### 3.4.1 Short proof of weak duality

The proof is short enough that you should be able to reconstruct it from memory.

Take any primal-feasible $x$ and dual-feasible $(\nu,u)$.

Because $x$ is feasible,

$$
h_i(x)\le 0,
\qquad
\ell_j(x)=0.
$$

Because $\nu_i \ge 0$, we get

$$
\sum_i \nu_i h_i(x)\le 0.
$$

And because the equality constraints vanish,

$$
\sum_j u_j \ell_j(x)=0.
$$

So the Lagrangian at that feasible point satisfies

$$
L(x,\nu,u)
=
f(x)+\sum_i \nu_i h_i(x)+\sum_j u_j \ell_j(x)
\le
f(x).
$$

Now use the definition of the dual function:

$$
g(\nu,u)=\inf_{x'} L(x',\nu,u)\le L(x,\nu,u).
$$

Combining the two inequalities gives

$$
g(\nu,u)\le f(x).
$$

That is weak duality.

## 3.5 LP Duality Derivation in Full

This is the version you should be able to reconstruct on an exam.

### 3.5.1 Start from the primal

Take the linear program

$$
\min_x c^T x
\quad \text{s.t. } \quad
Ax=b,\; Gx \le h.
$$

Here:

- $x$ is the primal variable
- $u$ will be the equality multiplier
- $\nu$ will be the inequality multiplier with $\nu \ge 0$

### 3.5.2 Form the Lagrangian

The Lagrangian is

$$
L(x,u,\nu)
=
c^T x + u^T(Ax-b) + \nu^T(Gx-h),
\qquad
\nu \ge 0.
$$

Expand and collect the terms involving $x$:

$$
L(x,u,\nu)
=
(c + A^T u + G^T \nu)^T x - b^T u - h^T \nu.
$$

This is the most important algebra line in the derivation.

The reason is that after grouping terms this way, the dependence on $x$ becomes purely linear.

### 3.5.3 Take the infimum over x

The dual function is

$$
g(u,\nu)=\inf_x L(x,u,\nu).
$$

So now the question is:

when is

$$
\inf_x \left[(c + A^T u + G^T \nu)^T x - b^T u - h^T \nu\right]
$$

finite?

The constants $-b^T u - h^T \nu$ do not matter for finiteness. The issue is the linear term in $x$.

### 3.5.4 The finiteness condition

If

$$
c + A^T u + G^T \nu \neq 0,
$$

then the expression is a nonconstant linear function of $x$, and since $x$ is unconstrained in the infimum defining the dual function, we can send it to $-\infty$ in a direction that makes the linear term arbitrarily negative.

So in that case,

$$
g(u,\nu)=-\infty.
$$

If instead

$$
c + A^T u + G^T \nu = 0,
$$

then the $x$-dependent part vanishes and the Lagrangian becomes constant in $x$:

$$
L(x,u,\nu)=-b^T u - h^T \nu.
$$

So in that case,

$$
g(u,\nu)=-b^T u - h^T \nu.
$$

Putting both cases together:

$$
g(u,\nu)
=
\begin{cases}
-b^T u - h^T \nu, & \text{if } A^T u + G^T \nu + c = 0 \text{ and } \nu \ge 0, \\
-\infty, & \text{otherwise.}
\end{cases}
$$

This exact “finite iff” statement was a real point-loser on `Quiz 3`, so it is worth memorizing carefully.

### 3.5.5 Write the dual problem

Now maximize the dual function subject to its domain of finiteness:

$$
\max_{u,\nu} -b^T u - h^T \nu
\quad \text{s.t. } \quad
A^T u + G^T \nu + c = 0,
\qquad
\nu \ge 0.
$$

That is the LP dual.

The exam-safe derivation template is:

1. write the Lagrangian
2. collect the $x$ terms
3. determine when the infimum over $x$ is finite
4. write the dual function piecewise
5. maximize it over the multiplier domain

## 3.6 Why the Dual Function Is Always Concave

This fact appeared explicitly on `Quiz 3` as a conceptual true/false style statement.

The dual function is always concave because it is the pointwise infimum of affine functions of the multipliers.

For fixed $x$, the Lagrangian

$$
L(x,\nu,u)
$$

is affine in $(\nu,u)$.

Then

$$
g(\nu,u)=\inf_x L(x,\nu,u)
$$

is the pointwise infimum of affine functions, and such an infimum is concave.

Important subtlety:

- this statement does **not** require the primal problem itself to be convex

So:

- primal convexity matters for strong-duality results
- it does not matter for the basic fact that the dual function is concave

## 3.7 Strong Duality, Saddle Points, and Slater

Weak duality always gives

$$
\max g(\nu,u)\le \min f(x).
$$

Strong duality means there is no gap:

$$
\max g(\nu,u)=\min f(x).
$$

Why does this matter?

Because once strong duality holds, the Lagrangian picture becomes tight enough to recover full optimality characterizations.

The March 12 lectures framed this in terms of:

- saddle points of the Lagrangian
- minimax structure
- Slater’s condition

For convex problems, Slater’s condition is the usual sufficient condition you should remember:

- if the inequality constraints admit a strictly feasible point
- and the problem is otherwise in the standard convex form

then strong duality holds.

This matters later because:

- KKT is always sufficient in the convex differentiable setting
- KKT becomes necessary as well once strong duality holds

So Slater is one of the standard routes from “good convex problem” to “KKT is necessary and sufficient.”

### 3.7.1 Saddle-point viewpoint

The March 12 lecture emphasizes that strong duality is closely tied to a saddle-point picture for the Lagrangian.

Very roughly, if $(x^*,\nu^*,u^*)$ is optimal and strong duality holds, then the Lagrangian sits at a saddle:

$$
L(x^*,\nu,u)\le L(x^*,\nu^*,u^*) \le L(x,\nu^*,u^*)
$$

for all primal variables $x$ and dual-feasible multipliers $\nu$.

What is a saddle point in plain language?

It is a point that is:

- a minimum if you move in the primal direction
- a maximum if you move in the dual direction

So the same point behaves differently depending on which variables you are allowed to change.

That is why the word "saddle" is used:

- along one set of directions, the surface bends upward like a valley
- along another set of directions, it bends downward like a hill

In duality, those two direction types are:

- primal variables: the primal problem wants to **minimize**
- dual variables: the dual problem wants to **maximize**

Why is this the right picture?

- if you vary the primal variable while holding the optimal multipliers fixed, the Lagrangian should increase
- if you vary the dual variables while holding the optimal primal point fixed, the Lagrangian should decrease

So the primal side wants a minimum, while the dual side wants a maximum.

That is exactly what a saddle point is.

You can read the inequality

$$
L(x^*,\nu,u)\le L(x^*,\nu^*,u^*) \le L(x,\nu^*,u^*)
$$

in two pieces:

1. Fix the primal point at $x^*$ and vary the dual variables.

Then
$$
L(x^*,\nu,u)\le L(x^*,\nu^*,u^*)
$$
means the optimal dual variables $(\nu^*,u^*)$ make the Lagrangian as large as possible at that primal point.

2. Fix the dual variables at $(\nu^*,u^*)$ and vary the primal variable.

Then
$$
L(x^*,\nu^*,u^*) \le L(x,\nu^*,u^*)
$$
means the optimal primal point $x^*$ makes the Lagrangian as small as possible at those dual variables.

So the center point $(x^*,\nu^*,u^*)$ is simultaneously:

- best from the primal minimization side
- best from the dual maximization side

That is exactly the geometric content of primal-dual optimality under strong duality.

### 3.7.1.1 Tiny toy picture

If you want an intuition without constraints, think of a function like

$$
\phi(a,b)=a^2-b^2.
$$

At $(0,0)$:

- if you vary $a$ and hold $b=0$, then $\phi(a,0)=a^2$, which is minimized at $a=0$
- if you vary $b$ and hold $a=0$, then $\phi(0,b)=-b^2$, which is maximized at $b=0$

So $(0,0)$ is a saddle point.

The Lagrangian saddle picture is the same idea, except:

- the "$a$-direction" is the primal variable direction
- the "$b$-direction" is the dual variable direction

### 3.7.1.2 Why this matters for KKT

This saddle-point view is not just geometric decoration.

It explains why KKT conditions are the right optimality conditions.

At a saddle point of the Lagrangian:

- the primal variable is minimizing against fixed multipliers
- the multipliers are maximizing against the fixed primal point

That is exactly why KKT contains:

- primal feasibility
- dual feasibility
- complementary slackness
- stationarity

Stationarity is the first-order version of "we are at the center of the saddle."

So a good memory line is:

`KKT is the first-order algebraic shadow of the Lagrangian saddle-point picture.`

### 3.7.2 Minimax interpretation

The primal and dual can also be viewed through a minimax lens:

$$
\min_x \max_{\nu \ge 0,\,u} L(x,\nu,u)
\qquad \text{versus} \qquad
\max_{\nu \ge 0,\,u} \min_x L(x,\nu,u).
$$

In general, these need not be equal.

Strong duality is precisely the statement that, under the right conditions, the gap disappears and the order of min and max becomes compatible.

So another way to remember strong duality is:

`the minimax gap vanishes.`

## 3.8 QP and the Broader Convex-Duality View

The schedule grouped `LP, QP, duality` together for a reason.

LP duality is the cleanest algebraic example, but the real lesson is broader:

- duality applies to general constrained convex problems
- the Lagrangian is the main organizing object
- the dual function and weak duality are generic
- strong duality and KKT depend on additional structure such as convexity and constraint qualifications

So do not memorize LP duality as a one-off trick. Treat it as the model example of the full convex-duality framework.

## 3.9 How Quiz 3 and the Old Exam Calibrate This Topic

What the existing materials suggest:

- `Quiz 3` focused on exact recall:
  - write the Lagrangian
  - derive the dual function
  - remember that the dual function is concave
  - remember when KKT optimality statements do and do not follow
- the old exam structure suggests the course likes:
  - true/false conceptual tests
  - “select all correct statements”
  - a smaller number of higher-value derivation/proof questions

So for duality you should be ready for all three levels:

1. exact definitions and signs
2. conceptual statements about weak/strong duality and concavity
3. a full LP dual derivation with the finiteness domain written exactly

## 3.10 Common Traps

- forgetting the sign restriction $\nu \ge 0$ for inequality multipliers
- treating the dual function as a maximum over $x$ instead of an infimum
- deriving the dual but not explicitly stating when it equals $-\infty$
- writing only $A^T u + G^T \nu + c = 0$ and forgetting that $\nu \ge 0$ is also part of the dual-feasible domain
- saying “dual function is concave only if the primal is convex”
- confusing weak duality with strong duality

The single highest-value sentence to be able to say under pressure is:

`The dual derivation is controlled by the finiteness of the infimum over x.`
