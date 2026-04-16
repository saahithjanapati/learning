# Proximal Gradient Memory Sheet

Use with [[2026-04-14-exam-2-section-02-proximal-gradient]].

## Core Setup
- Composite objective: $f(x)=g(x)+h(x)$.
- $g$ is the smooth part.
- $h$ is convex and possibly nonsmooth.
- Standard convex theory usually assumes both are convex, but broader proximal-gradient methods allow nonconvex $g$.

## Core Definitions
- Proximal operator:
$$
\operatorname{prox}_{\eta,h}(v)=\arg\min_z \left\{\frac{1}{2\eta}\|z-v\|^2+h(z)\right\}.
$$
- Proximal-gradient update:
$$
y_{t+1}=x_t-\eta \nabla g(x_t),\qquad x_{t+1}=\operatorname{prox}_{\eta,h}(y_{t+1}).
$$
- Gradient mapping:
$$
G_\eta(x)=\frac{1}{\eta}\left(x-\operatorname{prox}_{\eta,h}(x-\eta\nabla g(x))\right).
$$
- Rearranged update: $x_{t+1}=x_t-\eta G_\eta(x_t)$.

## Key Interpretations
- $G_\eta(x)$ is the composite analogue of the gradient.
- If $h=0$, then $G_\eta(x)=\nabla g(x)$.
- Stationarity is expressed as $G_\eta(x)=0$.
- The actual step added to the iterate is $-\eta G_\eta(x)$.

## Rate To Remember
- If $g$ is $\beta$-smooth and $\alpha$-strongly convex, with $\eta=1/\beta$ and $\kappa=\beta/\alpha$,
$$
\|x^k-x^*\|^2\le (1-1/\kappa)^k\|x^0-x^*\|^2.
$$

## Proof Logic To Memorize
- Apply smoothness to $g$.
- Use prox optimality / convexity for $h$.
- Combine the two inequalities.
- Rewrite the result in terms of $G_\eta(x)$.

## Likely Exam Traps
- Forgetting that $g$ is the smooth part and $h$ is the nonsmooth part.
- Saying the gradient mapping is just notation, rather than the generalized gradient object.
- Forgetting that the update can be written as $x_{k+1}=x_k-\eta G_\eta(x_k)$.
- Mixing up convex composite theory with broader nonconvex proximal-gradient use.
