# 4. KKT Conditions

## Table of Contents

- [[#4.0 Where This Topic Came From in the Course]]
- [[#4.1 Why KKT Matters]]
- [[#4.2 Standard Convex-Differentiable Setup]]
- [[#4.3 The KKT Conditions]]
    - [[#4.3.1 Primal feasibility]]
    - [[#4.3.2 Dual feasibility]]
    - [[#4.3.3 Complementary slackness]]
    - [[#4.3.4 Stationarity]]
- [[#4.4 How to Read the KKT Conditions Geometrically]]
- [[#4.5 Sufficiency and Necessity]]
- [[#4.6 Slater's Condition and Why It Keeps Reappearing]]
- [[#4.7 How to Solve a Concrete KKT Problem]]
    - [[#4.7.1 Small worked KKT example]]
- [[#4.8 Nonconvex KKT]]
- [[#4.8.1 Second-order conditions on feasible directions]]
- [[#4.8.2 Normal-cone view and why regularity matters]]
- [[#4.9 How Quiz 3, HW3, and the Old Exam Calibrate This Topic]]
- [[#4.10 Common Traps]]

## 4.0 Where This Topic Came From in the Course

This topic was built on top of the duality lectures:

1. `March 10`: LP/QP duality
2. `March 12`: Lagrangian, strong duality, saddle points, Slater
3. `March 17`: KKT conditions
4. `March 19`: nonconvex KKT and examples

So KKT is not a disconnected rule sheet. It is what you get when:

- primal feasibility,
- dual feasibility,
- duality,
- and first-order stationarity

are all brought together in one system.

## 4.1 Why KKT Matters

The KKT conditions are the main language of constrained optimality in this course.

They do two jobs:

1. they characterize optima in convex problems under the right assumptions
2. they generate candidate stationary points in nonconvex problems

That second use is very important. Even when KKT no longer certifies global optimality, the equations still tell you where to look.

So the right mental split is:

- convex case: KKT can certify optimality
- nonconvex case: KKT gives candidates, not certificates

## 4.2 Standard Convex-Differentiable Setup

The standard setting from lecture is

$$
\min_x f(x)
\quad \text{s.t. } \quad
h_i(x)\le 0,\; i=1,\dots,m,
\qquad
\ell_j(x)=0,\; j=1,\dots,p,
$$

where:

- `$f$` is convex and differentiable
- each `$h_i$` is convex and differentiable
- each `$\ell_j$` is affine

The Lagrangian is

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

Everything in KKT comes from this Lagrangian.

## 4.3 The KKT Conditions

A triple `$(x^*,\nu^*,u^*)$` is a KKT point if the following all hold.

### 4.3.1 Primal feasibility

The primal point must satisfy the original constraints:

$$
h_i(x^*)\le 0,
\qquad
\ell_j(x^*)=0.
$$

This means `$x^*$` is actually feasible for the constrained problem.

### 4.3.2 Dual feasibility

The multipliers on inequality constraints must satisfy

$$
\nu_i^* \ge 0.
$$

This is the same sign restriction that appears already in Lagrangian duality.

### 4.3.3 Complementary slackness

For each inequality constraint,

$$
\nu_i^* h_i(x^*) = 0.
$$

This means:

- if the constraint is inactive, so `$h_i(x^*)<0$`, then its multiplier must be zero
- if the multiplier is positive, then the constraint must be active

So complementary slackness is the algebraic statement that only active inequality constraints can carry force at the optimum.

### 4.3.4 Stationarity

The gradient of the Lagrangian with respect to `$x$` must vanish:

$$
\nabla f(x^*)
+
\sum_{i=1}^m \nu_i^* \nabla h_i(x^*)
+
\sum_{j=1}^p u_j^* \nabla \ell_j(x^*)
=
0.
$$

This is the constrained analogue of setting the gradient equal to zero in unconstrained optimization.

Instead of `$\nabla f(x^*)=0$`, the objective gradient is balanced by gradients of the active constraints.

## 4.4 How to Read the KKT Conditions Geometrically

The four pieces are easier to remember if you give each one a role:

- primal feasibility: the point obeys the constraints
- dual feasibility: the inequality multipliers have the correct sign
- complementary slackness: inactive inequalities do not push back
- stationarity: the objective gradient is canceled by constraint gradients

The most intuitive picture is stationarity:

at an optimum on the boundary, you usually cannot move in the raw negative-gradient direction because the constraints block you. So the objective gradient is balanced by a combination of constraint normals.

That is why stationarity adds the constraint-gradient terms.

## 4.5 Sufficiency and Necessity

This is one of the easiest places to lose points because the answer depends on the setting.

### Convex sufficiency

In the standard convex differentiable setting, KKT is sufficient for optimality.

So if you find a point satisfying:

- primal feasibility
- dual feasibility
- complementary slackness
- stationarity

then you have found a primal optimum, and the corresponding multipliers give a dual optimum.

### Necessity

Necessity is more delicate.

KKT becomes necessary when strong duality holds and the regularity conditions are satisfied. In this course, the standard sufficient route to that is `Slater's condition`.

So the exam-safe logic is:

- convexity gives sufficiency
- strong duality upgrades KKT to necessity as well
- Slater is the usual route to strong duality in convex problems

This exact point showed up in `Quiz 3` as a conceptual trap.

## 4.6 Slater's Condition and Why It Keeps Reappearing

For convex problems, Slater asks for strict feasibility of the inequality constraints:

there exists some feasible point `$\bar x$` such that

$$
h_i(\bar x)<0
\quad \text{for all inequality constraints,}
$$

while the equality constraints are satisfied exactly.

Why does this matter?

Because it is a standard sufficient condition for strong duality in convex optimization.

And once strong duality is available, KKT becomes a full optimality characterization.

So Slater is not a decorative theorem. It is the usual bridge from:

- duality theory

to

- KKT necessity

in convex problems.

## 4.7 How to Solve a Concrete KKT Problem

When you get a concrete KKT exercise, the safest workflow is:

1. write the Lagrangian
2. write all four KKT conditions explicitly
3. identify which inequalities might be active
4. solve the stationarity equations case by case
5. use complementary slackness to eliminate impossible cases
6. check primal feasibility and dual feasibility
7. in nonconvex problems, verify separately what the candidates mean

This “case split on active constraints” is often the real work.

A common mistake is to write the stationarity equation and jump straight to a candidate without checking:

- whether the candidate is feasible
- whether the multiplier signs are legal
- whether complementary slackness actually holds

### 4.7.1 Small worked KKT example

It helps to see a very small example all the way through.

Consider

$$
\min_x x^2
\quad \text{s.t. } \quad
x \ge 1.
$$

Rewrite the constraint as

$$
1-x \le 0.
$$

The Lagrangian is

$$
L(x,\nu)=x^2+\nu(1-x),
\qquad
\nu \ge 0.
$$

Now write the KKT conditions.

Primal feasibility:

$$
1-x \le 0
\iff x \ge 1.
$$

Dual feasibility:

$$
\nu \ge 0.
$$

Complementary slackness:

$$
\nu(1-x)=0.
$$

Stationarity:

$$
\nabla_x L(x,\nu)=2x-\nu=0.
$$

Now solve.

From stationarity,

$$
\nu = 2x.
$$

Since `$\nu \ge 0$`, this is consistent with feasible `$x \ge 1$`.

Now use complementary slackness:

$$
2x(1-x)=0.
$$

So either:

1. `$x=0$`, or
2. `$x=1$`

But primal feasibility requires `$x \ge 1$`, so `$x=0$` is impossible.

Therefore

$$
x^*=1,
\qquad
\nu^*=2.
$$

This example is simple, but it shows the exact workflow:

- write all four KKT conditions
- use stationarity to express the multipliers
- use complementary slackness and feasibility to eliminate impossible cases

## 4.8 Nonconvex KKT

The March 19 lecture separated this on purpose.

In nonconvex problems, the same KKT equations still make sense:

$$
\nabla f(x^*)
+
\sum_i \nu_i^* \nabla h_i(x^*)
+
\sum_j u_j^* \nabla \ell_j(x^*)
=
0,
$$

with the same feasibility and complementary-slackness conditions.

But their interpretation changes:

- KKT points are now only candidate stationary points
- they do not automatically imply global optimality
- they may correspond to local minima, local maxima, saddles, or boundary stationary points

So for nonconvex KKT, the real task is usually:

1. solve the KKT system
2. classify the resulting candidates

This is exactly the kind of “solve then interpret” structure that appears in homework-style and proof-style problems.

### 4.8.1 Second-order conditions on feasible directions

The March 17 and March 19 lectures went one step beyond first-order KKT.

After you solve the KKT equations, you may still need to distinguish:

- local minima
- local maxima
- saddle-type points

The right object is the Hessian of the Lagrangian:

$$
H
=
\nabla_{xx}^2 L(x^*,\nu^*,u^*).
$$

You do not test this Hessian on all directions. You test it only on directions that stay feasible to first order.

An exam-safe tangent-space description is:

$$
\nabla \ell_j(x^*)^T d = 0
\quad \text{for all equalities,}
$$

and for active inequalities you look at directions that do not immediately violate the active constraints. In the cleanest equality-style summary, this is often written as

$$
\nabla h_i(x^*)^T d = 0
\quad \text{for active constraints.}
$$

Then the second-order rules are:

- necessary condition for a local minimum:

$$
d^T H d \ge 0
\quad \text{for every feasible tangent direction } d
$$

- sufficient condition for a strict local minimum:

$$
d^T H d > 0
\quad \text{for every nonzero feasible tangent direction } d
$$

So the full nonconvex workflow is:

1. solve the KKT system
2. identify the relevant feasible tangent directions
3. test the Hessian of the Lagrangian on those directions

That is the constrained analogue of the unconstrained rule:

- positive definite Hessian means local minimum
- negative definite Hessian means local maximum
- indefinite Hessian means saddle behavior

### 4.8.2 Normal-cone view and why regularity matters

One useful geometric way to read KKT is through the normal cone of the feasible set.

Under the usual convex regularity assumptions, KKT can be rewritten as

$$
-\nabla f(x^*) \in N_{\mathcal C}(x^*),
$$

where $\mathcal C$ is the feasible set and $N_{\mathcal C}(x^*)$ is the cone of outward normal directions at the boundary point $x^*$.

In coordinates, that normal cone is generated by the active constraint gradients:

$$
N_{\mathcal C}(x^*)
=
\left\{
\sum_i \nu_i \nabla h_i(x^*)
+
\sum_j u_j \nabla \ell_j(x^*)
:
\nu_i \ge 0,\;
\nu_i h_i(x^*)=0
\right\}.
$$

So stationarity is saying:

- the raw negative gradient may point outside the feasible set
- at the optimum, it is exactly balanced by feasible-set normals

This viewpoint also explains why regularity assumptions matter.

If the constraint geometry is singular, then an optimal point can fail to admit any multiplier representation of this form. That is why the course included counterexamples where:

- a minimum exists
- but KKT fails because the constraint qualification does not hold

So the safest logic is:

- optimality alone does not force KKT in arbitrary constrained problems
- you also need the right local geometry of the constraints
- Slater and related constraint qualifications are what make the multiplier picture reliable

## 4.9 How Quiz 3, HW3, and the Old Exam Calibrate This Topic

The source materials suggest different likely question types:

- `Quiz 3`:
  - recall the names of the KKT conditions
  - know when KKT statements are true or false
- `HW3`:
  - proximal proofs in part 1
  - LP/QP/SDP relaxations and nonconvex KKT in later parts
  - suggests the course likes moving from theorem statements into concrete systems
- old exam format:
  - many short conceptual checks
  - then a smaller number of high-value derivation/proof questions

So for KKT, you should be ready for:

1. exact recall of the four conditions
2. conceptual necessity/sufficiency questions
3. concrete solve-and-verify problems
4. nonconvex candidate-classification problems

## 4.10 Common Traps

- forgetting primal feasibility when checking a candidate
- forgetting the sign restriction `$\nu_i \ge 0$`
- treating complementary slackness as “active implies multiplier zero” instead of the other way around
- writing stationarity with the wrong signs
- saying KKT is automatically necessary in every convex problem
- saying a nonconvex KKT point is automatically globally optimal

The single most useful sentence to remember is:

`In convex problems, KKT can certify optimality; in nonconvex problems, KKT gives candidates that still need interpretation.`
