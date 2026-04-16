# 2. Proximal Gradient and Gradient Mapping

Consider objectives of the form

$$
f(x) = g(x) + h(x),
$$

where $g$ is smooth and $h$ is convex but possibly nonsmooth.

The proximal operator is

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{ \frac{1}{2\eta}\|z-v\|^2 + h(z) \right\}.
$$

The proximal-gradient step is

$$
y_{t+1} = x_t - \eta \nabla g(x_t),
\qquad
x_{t+1} = \operatorname{prox}_{\eta,h}(y_{t+1}).
$$

The gradient mapping is

$$
G_\eta(x)
=
\frac{1}{\eta}\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

This is important because it plays the role of the gradient for the composite problem. When $h=0$, it reduces to the standard gradient.

### 2.1 Strongly Convex Proximal Gradient

If $g$ is $\beta$-smooth and $\alpha$-strongly convex, and one chooses $\eta = 1/\beta$, then with $\kappa = \beta/\alpha$ one gets

$$
\|x^k-x^*\|^2 \le (1-1/\kappa)^k \|x^0-x^*\|^2.
$$

So the structure in $h$ does not destroy the linear rate.

### 2.2 Proof Logic

The usual proof pattern is:

1. apply smoothness to $g$,
2. apply convexity / prox optimality to $h$,
3. combine the two inequalities,
4. express the result through $G_\eta(x)$.

This is a recurring exam pattern. The important thing is not only the final statement, but the decomposition into $g$ and $h$.
