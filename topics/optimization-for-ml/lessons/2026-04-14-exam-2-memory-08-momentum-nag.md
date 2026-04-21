# Momentum / NAG Memory Sheet

Use with [[2026-04-14-exam-2-section-08-momentum-nag]].

## Table of Contents

- [[#Polyak Momentum]]
- [[#NAG]]
- [[#Main Difference]]
- [[#Alternative Views]]
- [[#Rates To Memorize]]
- [[#HW4 Quadratic View]]
- [[#Likely Exam Traps]]


## Polyak Momentum
$$
x_{t+1}=x_t-\eta \nabla F(x_t)+\gamma(x_t-x_{t-1}).
$$

## NAG
$$
y_t=x_t+\gamma(x_t-x_{t-1}),\qquad x_{t+1}=y_t-\eta \nabla F(y_t).
$$

## Main Difference
- Polyak evaluates the gradient at the current point.
- NAG evaluates the gradient at the look-ahead point.

## Alternative Views
- Polyak / heavy-ball can also be written in velocity form:
$$
v_{t+1}=\gamma v_t-\eta \nabla F(x_t),
\qquad
x_{t+1}=x_t+v_{t+1}.
$$
- NAG can be remembered as:
  - take a momentum look-ahead step
  - evaluate the gradient there
  - then update
- Exam-level conceptual line:
  - Polyak = momentum at the current point
  - NAG = momentum plus look-ahead gradient

## Rates To Memorize
- Convex smooth NAG controls function-value gap:
$$
f(x_k)-f(x^*) = O\left(\frac{\beta\|x_0-x^*\|^2}{k^2}\right).
$$
- Strongly convex smooth NAG:
$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\alpha/\beta}\right)^k\right).
$$
- Compare with ordinary GD:
  - smooth convex GD: $O(1/k)$
  - smooth strongly convex GD: $O((1-\alpha/\beta)^k)$

## HW4 Quadratic View
- On the HW4 quadratic, momentum is analyzed as a $2\times 2$ linear dynamical system.
- The rate is controlled by the spectral radius of the update matrix, not by a generic smoothness theorem.
- So the homework proof style for Polyak is:
  - rewrite the update as a matrix recursion
  - compute eigenvalues / spectral radius
  - conclude linear convergence if $\rho(A)<1$

## Likely Exam Traps
- Giving only the rate and not the quantity.
- Confusing Polyak and NAG updates.
- Forgetting that NAG’s standard statement is about function value.
- Treating the HW4 momentum proof like a telescoping GD proof instead of a matrix-analysis problem.
