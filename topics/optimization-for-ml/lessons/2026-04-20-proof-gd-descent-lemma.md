# Proof: GD Descent Lemma

This page isolates the one-step descent fact for gradient descent. It is short, but it sits inside almost every later proof.

## Statement

Suppose $f$ is differentiable and $\beta$-smooth. Let

$$
x^+ = x - \eta \nabla f(x).
$$

If $0 < \eta \le 1/\beta$, then

$$
f(x^+) \le f(x) - \eta\left(1-\frac{\beta \eta}{2}\right)\|\nabla f(x)\|^2.
$$

In particular, if $\eta = 1/\beta$, then

$$
f(x^+) \le f(x) - \frac{\eta}{2}\|\nabla f(x)\|^2.
$$

## Why this matters

This is the bridge between:

- geometry of the function class: smoothness
- actual algorithmic progress: decrease in objective value after one GD step

Later proofs use this bound to turn gradient norms into telescoping objective differences.

## Assumptions used

- $f$ is differentiable
- $f$ is $\beta$-smooth, so for all $x,y$,
$$
f(y) \le f(x) + \nabla f(x)^T(y-x) + \frac{\beta}{2}\|y-x\|^2
$$

## Full proof

Apply smoothness with

$$
y = x - \eta \nabla f(x).
$$

Then

$$
f(x - \eta \nabla f(x))
\le
f(x) + \nabla f(x)^T(-\eta \nabla f(x))
+ \frac{\beta}{2}\|-\eta \nabla f(x)\|^2.
$$

Now simplify the two new terms.

First,

$$
\nabla f(x)^T(-\eta \nabla f(x))
=
-\eta \|\nabla f(x)\|^2.
$$

Second,

$$
\frac{\beta}{2}\|-\eta \nabla f(x)\|^2
=
\frac{\beta}{2}\eta^2 \|\nabla f(x)\|^2.
$$

So

$$
f(x - \eta \nabla f(x))
\le
f(x)
-\eta \|\nabla f(x)\|^2
+ \frac{\beta}{2}\eta^2 \|\nabla f(x)\|^2.
$$

Factor out $\eta \|\nabla f(x)\|^2$:

$$
f(x - \eta \nabla f(x))
\le
f(x)
-\eta\left(1-\frac{\beta\eta}{2}\right)\|\nabla f(x)\|^2.
$$

If $\eta \le 1/\beta$, then

$$
1-\frac{\beta\eta}{2} \ge \frac12,
$$

so

$$
f(x - \eta \nabla f(x))
\le
f(x) - \frac{\eta}{2}\|\nabla f(x)\|^2.
$$

That is the desired descent lemma.

## Main trick

You do not need convexity here. The entire proof is just:

1. write the smoothness upper bound
2. plug in the GD step
3. simplify

## What this gives you later

- In smooth convex GD proofs, it gives the $(A2)$ inequality
$$
\|\nabla f(x^t)\|^2 \le \frac{2}{\eta}(f(x^t)-f(x^{t+1})).
$$
- In the strongly convex proof, it is the line that lets you replace a gradient norm by objective decrease.
- In proximal gradient, the same proof pattern is rebuilt with $G_\eta(x)$ replacing $\nabla f(x)$.

## Common traps

- Forgetting that smoothness gives an upper bound, not a lower bound.
- Using convexity even though it is not needed.
- Writing the final inequality only for $\eta = 1/\beta$ and forgetting the more general form.

## Source trail

- `materials/processed/optimization-for-ml/Jan29_GD.md`
- [[2026-04-14-convex-optimization-basics-for-proofs]]
- [[2026-04-14-exam-2-section-11-proof-toolkit]]
