# Momentum / NAG Memory Sheet

Use with [[2026-04-14-exam-2-section-08-momentum-nag]].

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

## Rates To Memorize
- Convex smooth NAG controls function-value gap:
$$
f(x_k)-f(x^*) = O\left(\frac{\beta\|x_0-x^*\|^2}{k^2}\right).
$$
- Strongly convex smooth NAG:
$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\alpha/\beta}\right)^k\right).
$$

## Likely Exam Traps
- Giving only the rate and not the quantity.
- Confusing Polyak and NAG updates.
- Forgetting that NAG’s standard statement is about function value.
