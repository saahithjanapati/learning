# 8. Momentum and Nesterov Acceleration

Polyak momentum is

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

Nesterov acceleration is

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1}).
$$

The only formal difference is the evaluation point of the gradient, but that difference changes the convergence guarantees.

For convex smooth objectives,

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right).
$$

For strongly convex smooth objectives,

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

Compared to ordinary gradient descent in the strongly convex case,

$$
f(x_k)-f(x^*)
=
O\left(\left(1-\frac{\alpha}{\beta}\right)^k\right),
$$

Nesterov acceleration improves the dependence on the condition number.
