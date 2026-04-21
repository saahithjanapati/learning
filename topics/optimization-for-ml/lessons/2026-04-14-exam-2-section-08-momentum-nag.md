# 8. Momentum and Nesterov Acceleration

## Table of Contents

- [[#8.0 Where This Topic Came From in the Course]]
- [[#8.0.1 Rate Summary Table]]
- [[#8.1 Why Plain Gradient Descent Can Feel Slow]]
- [[#8.2 Polyak Momentum]]
- [[#8.3 Alternative Velocity View]]
- [[#8.4 Nesterov Accelerated Gradient]]
- [[#8.5 What Actually Changes Between Polyak and NAG]]
- [[#8.6 Rates to Remember]]
- [[#8.7 HW4 Connection: Momentum on a Quadratic]]
    - [[#8.7.1 The 2x2 linear-system viewpoint]]
- [[#8.8 Intuition for Why Acceleration Helps]]
- [[#8.9 Common Traps]]

## 8.0 Where This Topic Came From in the Course

This topic came from:

- `April 2`: momentum-based optimization
- `April 7`: adaptive and momentum-based methods
- `April 7 extra`: accelerated-gradient theory
- `HW4`: momentum method for a quadratic function

So this section needs two kinds of understanding:

- update-rule recall
- rate/intuition recall

The homework adds one more layer:

- momentum can be analyzed exactly on simple quadratic examples through spectral radius calculations

### 8.0.1 Rate Summary Table

This is the compact exam-facing table for the rates that are most worth remembering from this unit.

| Method / setting                                      | Assumptions                                                                | Quantity controlled                                                                                | Representative rate / bound                                    | What to remember                                                                                                                                    |
| ----------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gradient descent baseline                             | $f$ is $\beta$-smooth and convex                                           | function-value gap $f(x_k)-f(x^*)$                                                                 | $O\!\left(\frac{\beta \|x_0-x^*\|^2}{k}\right)$                | This is the baseline that NAG improves on in the smooth convex case.                                                                                |
| Nesterov accelerated gradient                         | $f$ is $\beta$-smooth and convex                                           | function-value gap $f(x_k)-f(x^*)$                                                                 | $O\!\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right)$              | Main accelerated rate to memorize for smooth convex optimization.                                                                                   |
| Gradient descent baseline                             | $f$ is $\alpha$-strongly convex and $\beta$-smooth                         | function-value gap $f(x_k)-f(x^*)$                                                                 | $O\!\left(\left(1-\frac{\alpha}{\beta}\right)^k\right)$        | Linear convergence, but with worse condition-number dependence than NAG.                                                                            |
| Nesterov accelerated gradient                         | $f$ is $\alpha$-strongly convex and $\beta$-smooth                         | function-value gap $f(x_k)-f(x^*)$                                                                 | $O\!\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right)$ | Same linear-convergence flavor, but accelerated dependence on $\kappa = \beta/\alpha$.                                                              |
| Polyak / heavy-ball on the HW4 quadratic state system | quadratic model with update matrix $A$ and tuned parameters so $\rho(A)<1$ | state vector $\left\|\begin{pmatrix} g_t \\ x_t \end{pmatrix}\right\|$ or equivalently $(g_t,x_t)$ | $O(\rho(A)^t)$                                                 | In HW4, the rate is expressed through the spectral radius of the $2\times 2$ update matrix, not through a generic theorem like the NAG rates above. |

Two exam-precision reminders:

1. The NAG rates stated in lecture are about the **function-value gap**, not necessarily the iterate distance.
2. The Polyak / heavy-ball discussion in HW4 is more concrete and quadratic-specific: the rate comes from analyzing eigenvalues of the linear system.

## 8.1 Why Plain Gradient Descent Can Feel Slow

Gradient descent uses only the current gradient:

$$
x_{t+1}=x_t-\eta \nabla f(x_t).
$$

This can be slow when:

- the landscape is ill-conditioned
- gradients oscillate across directions
- progress along the main descent direction is repeatedly damped by zig-zagging

Momentum methods try to fix that by remembering something about previous motion.

So the core idea is:

`do not make each step from scratch; carry directional information from the recent past.`

## 8.2 Polyak Momentum

The lecture’s heavy-ball / Polyak form is

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma (x_t-x_{t-1}).
$$

Interpretation of the terms:

- $-\eta \nabla F(x_t)$: the usual gradient-descent push
- $\gamma(x_t-x_{t-1})$: an inertial term carrying the previous direction

So if consecutive steps point roughly in the same direction, the momentum term reinforces progress. If the direction changes sharply, the momentum term can also cause overshoot.

That is why momentum can help, but also why it needs tuning.

## 8.3 Alternative Velocity View

Many people remember momentum more easily in velocity form.

Define a velocity variable $v_t$. Then one common equivalent form is

$$
v_{t+1}=\gamma v_t - \eta \nabla F(x_t),
\qquad
x_{t+1}=x_t+v_{t+1}.
$$

This makes the physical intuition clearer:

- gradients apply a force
- velocity accumulates past forces with decay
- the parameter update follows the velocity

This is why “momentum” is not just a name. The method literally stores motion-like state.

## 8.4 Nesterov Accelerated Gradient

The course formula for NAG is

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+
\gamma(x_t-x_{t-1}).
$$

The difference from Polyak is the gradient evaluation point.

Instead of computing the gradient at the current iterate $x_t$, NAG computes it at a look-ahead point:

$$
x_t + \gamma(x_t-x_{t-1}).
$$

That is why NAG is often described as:

`take a peek in the momentum direction, then evaluate the gradient there.`

## 8.5 What Actually Changes Between Polyak and NAG

This is one of the most likely short-answer comparisons.

Polyak momentum:

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

NAG:

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+
\gamma(x_t-x_{t-1}).
$$

So the only formula-level change is:

- Polyak uses $\nabla F(x_t)$
- NAG uses $\nabla F(x_t + \gamma(x_t-x_{t-1}))$

But this small change matters because it leads to stronger convergence guarantees in smooth convex optimization.

## 8.6 Rates to Remember

For Nesterov acceleration on smooth convex objectives, the function-value gap satisfies

$$
f(x_k)-f(x^*)
=
O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right).
$$

This is faster than the $O(1/k)$ function-value rate for ordinary gradient descent in the smooth convex setting.

For smooth strongly convex objectives, NAG gives

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

Compare this with ordinary gradient descent:

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\frac{\alpha}{\beta}\right)^k\right).
$$

So the acceleration improves the condition-number dependence.

Two precision points matter:

1. the quantity here is the function-value gap $f(x_k)-f(x^*)$
2. the assumptions are smooth convex or smooth strongly convex, not generic nonsmooth problems

## 8.7 HW4 Connection: Momentum on a Quadratic

Your `HW4` contains a very useful one-dimensional momentum analysis for

$$
f(x)=x^2.
$$

There the update is written in filtered-gradient form:

$$
g_{t+1}=(1-\gamma)g_t+\gamma \nabla f(x_t),
\qquad
x_{t+1}=x_t-\eta g_{t+1}.
$$

The homework asks you to rewrite the iteration as a linear dynamical system:

$$
\begin{pmatrix}
g_{t+1}\\x_{t+1}
\end{pmatrix}
=
A
\begin{pmatrix}
g_t\\x_t
\end{pmatrix}.
$$

Then convergence is analyzed through the spectral radius of $A$.

This is useful because it shows momentum is not just a heuristic. On a quadratic, it becomes a precise linear system whose behavior depends on the eigenvalues of the update matrix.

The homework also shows:

- for a suitable $\gamma(\eta)$, the iterates converge linearly
- the rate is controlled by the spectral radius
- in a special case, the method even reaches the optimum in finite time

So HW4 gives a very concrete version of the broader momentum story.

### 8.7.1 The 2x2 linear-system viewpoint

For the quadratic

$$
f(x)=x^2,
\qquad
\nabla f(x)=2x,
$$

HW4 writes the momentum method as

$$
g_{t+1}=(1-\gamma)g_t+2\gamma x_t,
$$

and then

$$
x_{t+1}=x_t-\eta g_{t+1}.
$$

Substitute the first equation into the second:

$$
x_{t+1}
=
x_t-\eta\big((1-\gamma)g_t+2\gamma x_t\big)
=
-\eta(1-\gamma)g_t + (1-2\eta\gamma)x_t.
$$

So the pair $(g_t,x_t)$ evolves linearly:

$$
\begin{pmatrix}
g_{t+1}\\x_{t+1}
\end{pmatrix}
=
\begin{pmatrix}
1-\gamma & 2\gamma \\
-\eta(1-\gamma) & 1-2\eta\gamma
\end{pmatrix}
\begin{pmatrix}
g_t\\x_t
\end{pmatrix}.
$$

This is useful because it converts the algorithm question into a linear-algebra question:

- convergence is governed by the eigenvalues of this matrix
- linear convergence happens when the spectral radius is less than `1`

That is exactly the sort of bridge the course likes: optimization algorithm on the surface, linear-system analysis underneath.

## 8.8 Intuition for Why Acceleration Helps

The intuitive story is:

- gradient descent reacts only to the present
- momentum carries history
- NAG uses history plus a look-ahead correction

On long narrow valleys, this can reduce zig-zagging and improve progress along the slow direction.

You do not need a full estimate-sequence proof for the exam. But you do need a coherent sentence for why acceleration helps:

`it uses past directional information to reduce oscillation and to make better progress in ill-conditioned smooth problems.`

## 8.9 Common Traps

- writing the NAG formula with the gradient evaluated at $x_t$ instead of the look-ahead point
- giving only the rate but not the converging quantity
- mixing up the strongly convex and merely convex rates
- claiming Polyak and NAG are “the same but with different notation”
- forgetting that these rates are for smooth problems

The single most useful short comparison is:

`Polyak uses the current-point gradient; NAG uses a look-ahead gradient, and that difference is what leads to acceleration guarantees.`
