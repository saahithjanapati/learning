# Optimization Quiz 2 Prep: Beginner Textbook Guide

Date: 2026-02-15  
Mode: learn (exposition-heavy)  
Scope: Gradient Descent, GD convergence proof ideas, Subgradients, Subgradient Method, Projected (Sub)gradient, Optimality Conditions, Stochastic Gradient

## Start Here

If optimization feels confusing, this is normal. Most confusion comes from three things:

- too many symbols at once
- seeing formulas before intuition
- not knowing why a method exists

This guide fixes that order:

1. What problem are we solving?
2. Why do updates look the way they do?
3. What assumptions make proofs work?
4. What changes in non-smooth, constrained, and stochastic settings?

You can read this as a mini textbook, not a checklist.

## How To Use This Guide

- Read one section fully.
- Do the section's tiny practice at the end.
- Check answers only after attempting.
- If you get stuck, reread only the worked example in that section.

## Part A: Foundations (From Zero)

## 1) What Optimization Is

In optimization, you choose variables to make an objective small (or large).

Standard minimization form:

$$
\min_x f(x)
$$

- $x$: what you are allowed to change (parameters, weights, decision vector)
- $f(x)$: score/cost/loss you want as small as possible

If there are constraints:

$$
\min_x f(x) \quad \text{subject to } x \in C
$$

- $C$: feasible set (allowed values)

### Worked Example 1 (No Constraints)

$$
f(x) = (x-4)^2
$$

Smallest value happens at $x=4$, where $f(4)=0$.

### Worked Example 2 (With Constraints)

$$
f(x) = (x-4)^2, \quad x \in [0,3]
$$

Unconstrained best point is $x=4$, but not allowed. So the constrained best point is boundary point $x=3$.

### Tiny Practice

1. For $f(x)=(x+2)^2$, what is unconstrained minimizer?
2. For the same $f$, with $x \in [0,5]$, what is constrained minimizer?

## 2) Gradient Intuition Before Equations

In 1D, slope tells you which direction increases the function:

- positive slope: move left to go down
- negative slope: move right to go down

In many dimensions, slope becomes gradient $\nabla f(x)$.

- $\nabla f(x)$ points in steepest increase direction
- $-\nabla f(x)$ points in steepest decrease direction

That is why minimization updates use minus sign.

### Worked Example (1D)

$$
f(x)=\frac{1}{2}x^2, \quad f'(x)=x
$$

At $x=5$, slope is positive, so moving left decreases $f$.
At $x=-3$, slope is negative, so moving right decreases $f$.

### Tiny Practice

1. For $f(x)=x^2$, what direction decreases $f$ at $x=2$?
2. Same function, what direction decreases $f$ at $x=-1$?

## 3) Core Vocabulary You Actually Need

- **Convex function**: bowl-like enough that local minimum is global minimum.
- **Smooth ($L$-smooth)**: gradient changes in a controlled way.
- **Strongly convex**: convex plus guaranteed curvature.
- **Non-smooth**: has kinks, gradient may not exist at some points.

These words are not decoration. They determine algorithm choice and proof guarantees.

## Part B: Gradient Descent and Why It Works

## 4) Gradient Descent (GD)

Update rule:

$$
x_{t+1} = x_t - \eta_t \nabla f(x_t)
$$

- $x_t$: current point
- $\nabla f(x_t)$: uphill direction
- $\eta_t$: step size (learning rate)

### Worked Example A (1D, full iteration trace)

Let:

$$
f(x)=\frac{1}{2}x^2, \quad x_0=10, \quad \eta=0.1
$$

Then:

$$
x_{t+1} = x_t - 0.1x_t = 0.9x_t
$$

Compute first steps:

- $x_1=9$
- $x_2=8.1$
- $x_3=7.29$

Objective values:

- $f(x_0)=50$
- $f(x_1)=40.5$
- $f(x_2)=32.805$

Function decreases smoothly.

### Worked Example B (2D)

Let:

$$
f(x_1,x_2)=\frac{1}{2}(x_1^2+9x_2^2),\quad x_0=(3,2),\quad \eta=0.1
$$

Gradient:

$$
\nabla f(x_1,x_2)=(x_1,9x_2)
$$

At $x_0$:

$$
\nabla f(x_0)=(3,18)
$$

Update:

$$
x_1=(3,2)-0.1(3,18)=(2.7,0.2)
$$

Second coordinate shrinks much faster because curvature is larger in that direction.

### Why Step Size Matters

- Too small: very slow progress
- Too large: overshoot, oscillation, or divergence

### Tiny Practice

1. For $f(x)=\frac{1}{2}x^2$, $x_0=6$, $\eta=0.2$, compute $x_1,x_2$.
2. In words: why can large $\eta$ break GD?

## 5) Smoothness and the Descent Inequality

The central inequality for smooth functions is:

$$
f(y) \le f(x) + \nabla f(x)^T(y-x) + \frac{L}{2}\|y-x\|^2
$$

Interpretation:

- linear term predicts change
- quadratic term is curvature penalty
- together they upper bound next value

Plug in GD step $y=x-\eta\nabla f(x)$:

$$
f(x_{t+1}) \le f(x_t) - \left(\eta-\frac{L\eta^2}{2}\right)\|\nabla f(x_t)\|^2
$$

If $\eta \le 1/L$, bracket is positive, so you get descent guarantee.

### Worked Example (Coefficient Check)

Let $L=4$.

- If $\eta=0.2$: coefficient $=0.2-4(0.04)/2=0.12>0$ (good)
- If $\eta=0.8$: coefficient $=0.8-4(0.64)/2=-0.48$ (no descent guarantee)

### Tiny Practice

1. Compute coefficient for $L=6, \eta=0.1$.
2. What sign do you want for descent guarantee?

## 6) Convergence Rates Without Overcomplicating

When proofs show rates, they usually do this:

1. get one-step inequality
2. rewrite into difference of two consecutive quantities
3. sum over $t$ and cancel terms (telescoping)

### Telescoping Pattern

If:

$$
f(x_t)-f(x^*) \le A_t-A_{t+1}
$$

sum from $0$ to $T-1$:

$$
\sum_{t=0}^{T-1}(f(x_t)-f(x^*)) \le A_0-A_T \le A_0
$$

Middle terms cancel.

### Rate Headlines You Should Remember

- smooth convex GD: typically $O(1/T)$
- smooth strongly convex GD: linear/geometric

Strong convexity gives faster contraction because curvature is stronger.

### Tiny Practice

1. Which decays faster: $1/T$ or $1/\sqrt{T}$?
2. What extra assumption usually gives linear rate for GD?

## Part C: Non-smooth Optimization

## 7) Why Subgradients Exist

For non-smooth convex functions (like $|x|$), gradient may not exist at kink points.

So we use subgradient.

Definition: $g$ is a subgradient at $x$ if for all $y$:

$$
f(y) \ge f(x) + g^T(y-x)
$$

So the affine model is a global lower bound touching at $x$.

### Worked Example A: $f(x)=|x|$

- $x>0$: subgradient $=1$
- $x<0$: subgradient $=-1$
- $x=0$: subdifferential $\partial f(0)=[-1,1]$

### Worked Example B: ReLU-type function

$$
f(x)=\max(x,0)
$$

At $x=0$, subgradients are all values in $[0,1]$.

### Tiny Practice

1. Give one valid subgradient of $|x|$ at $0$.
2. Give one valid subgradient of $\max(x,0)$ at $0$.

## 8) Subgradient Method

Update:

$$
x_{t+1}=x_t-\eta_t g_t, \quad g_t\in\partial f(x_t)
$$

Key difference vs GD:

- function value may increase on some iterations
- analysis often tracks best iterate or average iterate

### Worked Example (Non-monotone objective)

Let:

$$
f(x)=|x|,\quad x_0=1.2,\quad \eta=0.7
$$

Choose $g_t=1$ for positive $x_t$.

- $x_1=0.5$, $f=0.5$
- $x_2=-0.2$, $f=0.2$

Now at negative point use $g_t=-1$:

- $x_3=-0.2-0.7(-1)=0.5$, $f=0.5$

Objective went from $0.2$ up to $0.5$.

### Typical Rate Headline

For convex non-smooth problems:

$$
O\left(\frac{1}{\sqrt{T}}\right)
$$

This is slower than smooth GD but works without differentiability.

### Tiny Practice

1. Using $f(x)=|x|$, $x_0=2$, $\eta=0.5$, compute $x_1,x_2,x_3$ with natural subgradient choices.
2. Is monotone decrease guaranteed?

## Part D: Constraints and Projections

## 9) Projection Intuition

Projection onto feasible set $C$:

$$
\Pi_C(y)=\arg\min_{x\in C}\|x-y\|
$$

It means: closest feasible point to $y$.

### Worked Example A (Interval)

$C=[1,4]$.

- $\Pi_C(0)=1$
- $\Pi_C(2.5)=2.5$
- $\Pi_C(9)=4$

### Worked Example B (2D Box)

$C=[0,2]\times[-1,1]$, $y=(3,2.5)$.

Project coordinatewise:

- first coordinate $3 \to 2$
- second coordinate $2.5 \to 1$

So $\Pi_C(y)=(2,1)$.

## 10) Projected (Sub)Gradient Method

Template:

$$
y_{t+1}=x_t-\eta_t g_t,\quad x_{t+1}=\Pi_C(y_{t+1})
$$

- first step: optimization move
- second step: feasibility repair

### Worked Example (One full step)

Let:

$$
f(x)=x^2,\quad C=[-1,1],\quad x_t=0.8,\quad \eta=1
$$

Gradient at $0.8$ is $1.6$.

Raw step:

$$
y_{t+1}=0.8-1(1.6)=-0.8
$$

Projection:

$$
x_{t+1}=\Pi_{[-1,1]}(-0.8)=-0.8
$$

No clipping needed because it is already feasible.

If raw step had been $-1.3$, projection would return $-1$.

### Tiny Practice

1. Compute $\Pi_{[-2,2]}(3.1)$.
2. For box $[0,1]\times[0,1]$, compute projection of $(1.4,-0.3)$.

## Part E: Stochastic Gradient

## 11) Why SGD Exists

In ML you often optimize average loss:

$$
f(x)=\frac{1}{n}\sum_{i=1}^n \ell_i(x)
$$

Full GD uses all $n$ samples per step.

SGD uses one sample (or minibatch), so each step is much cheaper.

## 12) SGD Update and Noise

Pick random index $i_t$:

$$
g_t=\nabla\ell_{i_t}(x_t),\quad x_{t+1}=x_t-\eta_t g_t
$$

Main tradeoff:

- cheaper steps
- noisier direction

### Worked Example

$$
\ell_1(x)=\frac{1}{2}(x-2)^2,\quad \ell_2(x)=\frac{1}{2}(x-8)^2
$$

At $x_0=1$, $\eta=0.1$:

- if sample 1 chosen: $g_0=1-2=-1$, so $x_1=1.1$
- if sample 2 chosen: $g_0=1-8=-7$, so $x_1=1.7$

Same point, two very different valid updates. That is stochastic noise.

### Tiny Practice

1. Why is SGD usually faster per step than full GD?
2. Why can constant step sizes cause jitter near optimum?

## Part F: Optimality Conditions (Clean Version)

## 13) Unconstrained Differentiable

Necessary condition at local optimum:

$$
\nabla f(x^*)=0
$$

For convex $f$, this is sufficient for global optimum.

### Worked Example

$$
f(x)=(x+3)^2
$$

$$
f'(x)=2(x+3)=0 \Rightarrow x^*=-3
$$

## 14) Convex Non-smooth

Condition:

$$
0\in\partial f(x^*)
$$

This replaces $\nabla f(x^*)=0$ when gradient may not exist.

## 15) Constrained Convex First-Order Condition

$$
\langle \nabla f(x^*),x-x^*\rangle\ge 0 \quad \forall x\in C
$$

Interpretation: no feasible first-order descent direction at $x^*$.

### Tiny Practice

1. In one sentence, what does $0\in\partial f(x^*)$ mean?
2. Why can constrained optima occur at boundaries?

## Part G: Quiz Memory Sheet

## 16) Core Formulas To Memorize

$$
x_{t+1}=x_t-\eta_t\nabla f(x_t)
$$

$$
x_{t+1}=x_t-\eta_t g_t,\quad g_t\in\partial f(x_t)
$$

$$
x_{t+1}=\Pi_C(x_t-\eta_t g_t)
$$

$$
\nabla f(x^*)=0,\quad 0\in\partial f(x^*)
$$

Rate headlines:

- smooth convex GD: $O(1/T)$
- smooth strongly convex GD: linear/geometric
- subgradient method: $O(1/\sqrt{T})$

## 17) Mini Self-Test (8 Questions)

1. What does step size control?
2. Why minus gradient for minimization?
3. State smoothness inequality.
4. What is $\partial|x|$ at $x=0$?
5. Why is subgradient method not always monotone?
6. What does projection do in one line?
7. Why is SGD cheaper per step?
8. Which is faster: $1/T$ or $1/\sqrt{T}$?

## 18) Short Answer Key

1. Step length each iteration.
2. Gradient points uphill; negative gradient points downhill.
3. $f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{L}{2}\|y-x\|^2$.
4. Interval $[-1,1]$.
5. Subgradient directions do not guarantee per-step descent.
6. Maps point to nearest feasible point in $C$.
7. It uses one sample/minibatch instead of full dataset each step.
8. $1/T$.

## References (Your Transcribed Notes)

- GD: `materials/processed/optimization-for-ml/Jan29_GD.md`
- Subgradients: `materials/processed/optimization-for-ml/Feb5_subgradients.md`
- Subgradient method: `materials/processed/optimization-for-ml/Feb10_subgradient-method.md`
- Projected subgradient: `materials/processed/optimization-for-ml/Feb12-projected-subgradient.md`

Note: We still do not have your course-specific transcripts for lectures titled "Optimality Conditions" and "Stochastic Gradient". This guide uses standard optimization formulations; once those PDFs are ingested, I can align notation and proof style exactly to your class.
