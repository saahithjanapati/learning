# Quiz 4 Edge Cases and Traps

This note covers the remaining lower-probability but still plausible quiz topics and the most common precision traps.

The main study guide should still be your primary review source:

- `topics/optimization-for-ml/lessons/2026-04-12-quiz-4-study-guide-newton-ica-adaptive-methods.md`

Use this note as a final pass for the small things that are easy to miss.

## 1. Newton failure modes

Why this matters:

- if the instructor wants one conceptual Newton question beyond the update and rate, this is a natural target

What to know:

- Newton is `local`, not global
- if you start far from the solution, it can diverge
- if the Hessian is singular, the step may be undefined
- if the Hessian is not positive definite, the step may fail to be a descent direction
- nonlinear problems can show cycling or chaotic dependence on initialization

Memory hook:

`Newton is very fast near the solution, but can be unstable far away from it.`

## 2. Damped Newton and backtracking

Why this matters:

- this is the standard fix for Newton instability

What to know:

$$
x_{k+1}
=
x_k - h_k[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
\qquad
0 < h_k \le 1
$$

- away from the optimum, you may need a smaller step size
- near the optimum, you often recover the full Newton step `h_k = 1`

Memory hook:

`Damped Newton gives up some speed to gain stability until the local quadratic regime kicks in.`

## 3. Newton fractals

Why this matters:

- low probability, but it was explicitly named in the lecture title

What to know:

- for Newton's method on complex polynomials, different initial points converge to different roots
- this partitions the plane into `basins of attraction`
- the boundaries between basins can be fractal

Memory hook:

`Newton fractals visualize how sensitive Newton's method can be to initialization.`

## 4. AdaDelta

Why this matters:

- lower probability than AdaGrad, RMSProp, and Adam, but still part of the adaptive-method lecture family

What to know conceptually:

- AdaGrad can make the denominator grow forever, shrinking step sizes too aggressively
- RMSProp fixes this by using an exponentially decaying average of squared gradients
- AdaDelta goes one step further and tries to self-scale the update using running averages, reducing dependence on a fixed global learning rate scale

Memory hook:

`AdaDelta is a refinement of RMSProp that tries to make the update scale more self-adjusting.`

### The deeper picture

AdaDelta keeps two running averages:

1. squared gradients

$$
E[g^2]_t = \rho E[g^2]_{t-1} + (1-\rho) g_t^2
$$

2. squared updates

$$
E[\Delta x^2]_t = \rho E[\Delta x^2]_{t-1} + (1-\rho) (\Delta x_t)^2
$$

Then define RMS quantities:

$$
RMS[g]_t = \sqrt{E[g^2]_t + \epsilon},
\qquad
RMS[\Delta x]_{t-1} = \sqrt{E[\Delta x^2]_{t-1} + \epsilon}
$$

The update is

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t
$$

and then the algorithm updates the running average of squared updates.

### Why this is different from RMSProp

- RMSProp uses only gradient history
- AdaDelta uses both gradient history and update history

The numerator matters because it tracks the recent scale of actual parameter updates, not just the scale of gradients.

### Intuition

- if recent gradients are large, the denominator grows and the step shrinks
- if recent updates have been small, the numerator stays small and future steps stay conservative
- if recent updates have been larger, AdaDelta allows correspondingly larger new steps

The usual informal takeaway is:

`AdaDelta tries to choose step scales automatically by comparing recent update magnitudes to recent gradient magnitudes.`

### Quiz-safe summary

If this appears on the quiz, the likely expected answer is short:

- AdaDelta is a refinement of RMSProp
- it keeps moving averages of both squared gradients and squared updates
- it uses

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t
$$

- main goal: reduce sensitivity to a global learning rate and avoid AdaGrad's over-shrinking steps

## 5. SDP duality sign trap

This is one of the easiest places to lose points.

The correct identity is

$$
C \bullet X - b^T y = S \bullet X \ge 0
$$

What to remember:

- it is `primal objective minus dual objective`
- not the reverse sign
- nonnegativity comes from `S \succeq 0` and `X \succeq 0`

Memory hook:

`Primal minus dual equals a PSD inner product.`

## 6. Whitening notation trap

The correct whitening statement is

$$
E[zz^T] = I
$$

not

$$
E[z^T z] = I.
$$

Why:

- `zz^T` is a matrix covariance object
- `z^T z` is a scalar

Memory hook:

`Whitening is about covariance becoming identity, so the matrix form is zz^T.`

## 7. NAG rate trap

The converging quantity is the `function-value gap`, not parameter distance.

Convex smooth:

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right)
$$

Strongly convex smooth:

$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right)
$$

Memory hook:

`For NAG, the quantity to say out loud is f(x_k) - f(x^*).`

## 8. Root-finding Newton vs minimization Newton

Another easy confusion point.

Root finding:

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}
$$

Minimization:

$$
x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
$$

Why they differ:

- root finding solves `\phi(x)=0`
- minimization solves `\nabla f(x)=0`, so Newton is applied to the gradient equation

Memory hook:

`Root finding uses the derivative; minimization uses the Hessian.`

## Final skim checklist

If you only do one last 2-minute pass, make sure you can say these without hesitation:

1. `C • X - b^T y = S • X >= 0`
2. `E[zz^T] = I`
3. `x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k)`
4. `f(x_k)-f(x^*) = O(\beta ||x_0-x^*||^2 / k^2)` for convex smooth NAG
5. `f(x_k)-f(x^*) = O((1-\sqrt{\alpha/\beta})^k)` for strongly convex smooth NAG
