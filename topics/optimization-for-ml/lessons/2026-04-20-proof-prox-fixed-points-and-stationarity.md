# Proof: Proximal Fixed Points and Stationarity

This is the clean proof behind the statement

$$
G_\eta(x^*) = 0
\quad \Longleftrightarrow \quad
0 \in \nabla g(x^*) + \partial h(x^*).
$$

It is one of the most important proximal-gradient identities because it explains why the gradient mapping acts like a generalized gradient.

## Setup

Let

$$
f(x)=g(x)+h(x),
$$

where $g$ is differentiable and $h$ is convex, possibly nonsmooth.

Define the proximal operator:

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{\frac{1}{2\eta}\|z-v\|^2+h(z)\right\}.
$$

Define the gradient mapping:

$$
G_\eta(x)
:=
\frac1\eta\left(x-\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

Equivalently,

$$
x-\eta G_\eta(x)=\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

## Prox optimality condition

If

$$
u = \operatorname{prox}_{\eta,h}(v),
$$

then $u$ minimizes

$$
\phi(z)=\frac{1}{2\eta}\|z-v\|^2+h(z).
$$

Since $\phi$ is convex, optimality is equivalent to

$$
0 \in \partial \phi(u)
=
\frac1\eta(u-v)+\partial h(u).
$$

So

$$
\frac1\eta(v-u) \in \partial h(u).
$$

This is the basic prox optimality identity.

## Proof skeleton to memorize

This proof is easiest if you treat prox optimality as the only real starting point:

$$
u=\operatorname{prox}_{\eta,h}(v)
\iff
\frac1\eta(v-u)\in \partial h(u).
$$

Then the two directions are just two substitutions:

- for $G_\eta(x)=0 \Rightarrow$ stationarity:
  substitute
  $$
  v=x-\eta \nabla g(x),\qquad u=x-\eta G_\eta(x)
  $$
  then set $G_\eta(x)=0$
- for stationarity $\Rightarrow G_\eta(x)=0$:
  rewrite stationarity so it looks like
  $$
  (v-u)\in \eta \partial h(u)
  $$
  then recognize a prox condition

The proof becomes much less mysterious if you remember:

`start from prox optimality, not from the theorem statement`

## Direction 1: $G_\eta(x^*) = 0$ implies stationarity

Start from the defining relation

$$
x-\eta G_\eta(x)
=
\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

Let

$$
v = x-\eta \nabla g(x),
\qquad
u = x-\eta G_\eta(x).
$$

Then $u = \operatorname{prox}_{\eta,h}(v)$, so prox optimality gives

$$
\frac1\eta(v-u)\in \partial h(u).
$$

Substitute the definitions of `u` and `v`:

$$
\frac1\eta\Big((x-\eta \nabla g(x))-(x-\eta G_\eta(x))\Big)\in \partial h(x-\eta G_\eta(x)).
$$

Simplify:

$$
G_\eta(x)-\nabla g(x) \in \partial h(x-\eta G_\eta(x)).
$$

Equivalently,

$$
G_\eta(x) \in \nabla g(x)+\partial h(x-\eta G_\eta(x)).
$$

Now suppose $G_\eta(x^*) = 0$. Then

$$
0 \in \nabla g(x^*)+\partial h(x^*-\eta \cdot 0)
=
\nabla g(x^*)+\partial h(x^*).
$$

So stationarity holds.

## Direction 2: stationarity implies $G_\eta(x^*) = 0$

Assume

$$
0 \in \nabla g(x^*)+\partial h(x^*).
$$

Then

$$
-\nabla g(x^*) \in \partial h(x^*).
$$

Multiply by $\eta$:

$$
-\eta \nabla g(x^*) \in \eta \partial h(x^*).
$$

Rewrite this as

$$
(x^*-\eta \nabla g(x^*))-x^* \in \eta \partial h(x^*).
$$

Using the prox optimality equivalence

$$
(v-u)\in \eta \partial h(u)
\quad \Longleftrightarrow \quad
u=\operatorname{prox}_{\eta,h}(v),
$$

with

$$
v=x^*-\eta \nabla g(x^*),\qquad u=x^*,
$$

we get

$$
x^*=\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*)).
$$

Now apply the definition of $G_\eta$:

$$
G_\eta(x^*)
=
\frac1\eta\left(x^*-\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*))\right)
=0.
$$

That proves the converse.

## Why this matters

For ordinary smooth optimization, the condition for optimality is

$$
\nabla f(x^*)=0.
$$

For the composite problem $f = g + h$, the correct first-order condition is

$$
0 \in \nabla g(x^*) + \partial h(x^*).
$$

The gradient mapping is exactly the object whose vanishing detects that condition.

## Main trick

Everything comes from writing the prox step as an optimization problem and taking its subdifferential.

## Common traps

- Writing the subgradient at $x$ instead of at the prox point $x - \eta G_\eta(x)$.
- Forgetting that the prox optimality condition is an inclusion, not an equality.
- Claiming $G_\eta(x)$ is literally a subgradient of $g+h$ at $x$. In general it is not. The subgradient lands at the prox-updated point.

## Source trail

- `materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md`
- `materials/processed/optimization-for-ml/HW3_prompt.md`
- [[2026-04-14-exam-2-section-02-proximal-gradient]]
- [[2026-04-19-exam-2-key-properties-identities]]
