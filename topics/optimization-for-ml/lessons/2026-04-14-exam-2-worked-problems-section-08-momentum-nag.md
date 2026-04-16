# 8. Momentum and NAG Worked Problems

### Problem 8.1

Write Polyak momentum and NAG side by side and identify the exact difference.

### Solution

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
- \eta \nabla F(x_t+\gamma(x_t-x_{t-1}))
+ \gamma(x_t-x_{t-1}).
$$

The only structural difference is the point where the gradient is evaluated:

- Polyak uses the current point $x_t$,
- NAG uses the look-ahead point $x_t+\gamma(x_t-x_{t-1})$.

That is exactly what produces the accelerated interpretation.
