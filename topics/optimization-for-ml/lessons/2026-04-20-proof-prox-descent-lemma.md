# Proof: Proximal-Gradient Descent Lemma

This is the main technical proof for proximal gradient.

## Statement

Let $f(x)=g(x)+h(x)$ where:

- $g$ is convex and $\beta$-smooth
- $h$ is convex

For

$$
y = x-\eta G_\eta(x),
$$

with $\eta \le 1/\beta$, the proximal-gradient descent lemma says that for every $z$,

$$
f(y)
\le
f(z) + G_\eta(x)^T(x-z) - \frac{\eta}{2}\|G_\eta(x)\|^2.
$$

Taking $z=x$ gives the one-step descent form

$$
f(x-\eta G_\eta(x))
\le
f(x)-\frac{\eta}{2}\|G_\eta(x)\|^2.
$$

## Proof roadmap

This is the one proof where the roles of `g` and `h` must stay separate:

1. apply smoothness to $g$
2. apply convexity to $g$
3. apply convexity to $h$ at the prox point
4. use the prox-optimality subgradient
5. add the inequalities and simplify

If you mix those buckets too early, the proof becomes unreadable.

## Proof skeleton to memorize

This is the `two buckets + one cancellation` proof.

Bucket 1: the smooth part $g$

1. define
$$
y=x-\eta G_\eta(x)
$$
2. apply smoothness to $g(y)$
3. use convexity of $g$ to replace $g(x)$ by a bound involving $g(z)$

Bucket 2: the nonsmooth part $h$

4. use convexity of $h$ at the prox point $y$
5. choose the special prox subgradient
$$
s=G_\eta(x)-\nabla g(x)\in \partial h(y)
$$
6. expand
$$
z-y=z-x+\eta G_\eta(x)
$$

Final merge:

7. add the $g$-inequality and the $h$-inequality
8. look for the cancellation of the $\eta \nabla g(x)^T G_\eta(x)$ terms
9. use $\eta\le 1/\beta$ to turn the remaining coefficient into $-\eta/2$

If you remember only one sentence, remember this:

`smoothness creates one inner-product term, prox optimality creates the opposite one, and they cancel`

## Step 1: control the smooth part $g$

Let

$$
y=x-\eta G_\eta(x).
$$

By $\beta$-smoothness of $g$,

$$
g(y)
\le
g(x)+\nabla g(x)^T(y-x)+\frac{\beta}{2}\|y-x\|^2.
$$

Since $y-x = -\eta G_\eta(x)$, this becomes

$$
g(y)
\le
g(x)-\eta \nabla g(x)^T G_\eta(x)
+\frac{\beta}{2}\eta^2\|G_\eta(x)\|^2.
$$

Now use convexity of $g$:

$$
g(x) \le g(z)+\nabla g(x)^T(x-z).
$$

Substitute this into the previous inequality:

$$
g(y)
\le
g(z)+\nabla g(x)^T(x-z)
-\eta \nabla g(x)^T G_\eta(x)
+\frac{\beta}{2}\eta^2\|G_\eta(x)\|^2.
$$

## Step 2: control the nonsmooth part $h$

By convexity of $h$, for any subgradient $s \in \partial h(y)$,

$$
h(y) \le h(z) - s^T(z-y).
$$

Now we need the right choice of $s$.

From the fixed-point/prox proof,

$$
G_\eta(x)-\nabla g(x) \in \partial h(y).
$$

So choose

$$
s = G_\eta(x)-\nabla g(x).
$$

Then

$$
h(y)
\le
h(z) - (G_\eta(x)-\nabla g(x))^T(z-y).
$$

Since $y = x-\eta G_\eta(x)$,

$$
z-y = z-x+\eta G_\eta(x).
$$

Hence

$$
h(y)
\le
h(z) - (G_\eta(x)-\nabla g(x))^T(z-x+\eta G_\eta(x)).
$$

Expand:

$$
h(y)
\le
h(z)
-(G_\eta(x)-\nabla g(x))^T(z-x)
-\eta (G_\eta(x)-\nabla g(x))^T G_\eta(x).
$$

Now expand the last term:

$$
h(y)
\le
h(z)
-(G_\eta(x)-\nabla g(x))^T(z-x)
-\eta \|G_\eta(x)\|^2
+\eta \nabla g(x)^T G_\eta(x).
$$

## Step 3: add the two pieces

Since $f(y)=g(y)+h(y)$, add the inequalities for $g(y)$ and $h(y)$:

$$
f(y)
\le
g(z)+h(z)
+\nabla g(x)^T(x-z)
-(G_\eta(x)-\nabla g(x))^T(z-x)
+\frac{\beta}{2}\eta^2\|G_\eta(x)\|^2
-\eta \|G_\eta(x)\|^2.
$$

The $-\eta \nabla g(x)^T G_\eta(x)$ and $+\eta \nabla g(x)^T G_\eta(x)$ terms cancel.

Also,

$$
\nabla g(x)^T(x-z) -(G_\eta(x)-\nabla g(x))^T(z-x)
=
G_\eta(x)^T(x-z).
$$

So

$$
f(y)
\le
f(z)
+G_\eta(x)^T(x-z)
+\left(\frac{\beta \eta^2}{2}-\eta\right)\|G_\eta(x)\|^2.
$$

Factor out $\eta$:

$$
f(y)
\le
f(z)
+G_\eta(x)^T(x-z)
-\eta\left(1-\frac{\beta\eta}{2}\right)\|G_\eta(x)\|^2.
$$

If $\eta \le 1/\beta$, then

$$
1-\frac{\beta\eta}{2} \ge \frac12,
$$

so

$$
f(y)
\le
f(z)
+G_\eta(x)^T(x-z)
-\frac{\eta}{2}\|G_\eta(x)\|^2.
$$

That is the proximal-gradient descent lemma.

## Main trick

The proof succeeds because the $\nabla g(x)^T G_\eta(x)$ term created by smoothness is canceled by the equal-and-opposite term created when convexity of $h$ is used with the prox-optimality subgradient.

That cancellation is the heart of the proof.

## Strongly convex extension

If $g$ is also $\alpha$-strongly convex, then the convexity step for $g$ is replaced by

$$
g(x) \le g(z)+\nabla g(x)^T(x-z)-\frac{\alpha}{2}\|x-z\|^2,
$$

and the final result gains the extra term

$$
-\frac{\alpha}{2}\|x-z\|^2.
$$

That is what later yields linear convergence for proximal gradient.

## Common traps

- Using a subgradient of $h$ at $x$ instead of at $y = x-\eta G_\eta(x)$.
- Forgetting to keep the $g$ and $h$ proofs separate until the last addition step.
- Missing the cancellation and ending up with extra inner-product terms that should disappear.

## Source trail

- `materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md`
- `materials/processed/optimization-for-ml/HW3_prompt.md`
- [[2026-04-14-exam-2-section-02-proximal-gradient]]
- [[2026-04-14-exam-2-section-11-proof-toolkit]]
