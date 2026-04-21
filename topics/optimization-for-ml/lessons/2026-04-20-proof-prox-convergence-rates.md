# Proofs: Proximal-Gradient Convergence Rates

This page collects the two main convergence proofs for proximal gradient:

- convex case: $O(1/k)$ in function value
- strongly convex case: linear contraction

## Part I: convex proximal-gradient rate

### Statement

Assume:

- $g$ is convex and $\beta$-smooth
- $h$ is convex
- $\eta = 1/\beta$

Run

$$
x^{t+1}=x^t-\eta G_\eta(x^t).
$$

Then

$$
f(x^k)-f(x^*) \le \frac{\beta}{2k}\|x^0-x^*\|^2.
$$

### Convex-case proof skeleton to memorize

This proof is just:

1. write the distance identity for
$$
x^{t+1}=x^t-\eta G_\eta(x^t)
$$
2. rearrange it so the bracket
$$
\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)
$$
appears
3. apply the proximal descent lemma with $z=x^*$
4. substitute that bound into the distance identity
5. get a telescoping one-step inequality for
$$
f(x^{t+1})-f(x^*)
$$
6. sum over $t$
7. use monotonicity to pass from the average bound to the last iterate

Short version:

`distance identity + prox descent lemma + telescope`

### Proof

Start from the distance expansion:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-\eta G_\eta(x^t)-x^*\|^2
$$

so

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta (x^t-x^*)^T G_\eta(x^t)
+\eta^2\|G_\eta(x^t)\|^2.
$$

Rearrange:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
+2\eta\left(\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)\right).
$$

Now apply the proximal descent lemma with $x=x^t$ and $z=x^*$:

$$
f(x^{t+1})
\le
f(x^*) + G_\eta(x^t)^T(x^t-x^*) - \frac{\eta}{2}\|G_\eta(x^t)\|^2.
$$

Rearrange:

$$
\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)
\le
f(x^*)-f(x^{t+1}).
$$

Substitute this into the distance identity:

$$
\|x^{t+1}-x^*\|^2
\le
\|x^t-x^*\|^2 + 2\eta(f(x^*)-f(x^{t+1})).
$$

Rearrange:

$$
f(x^{t+1})-f(x^*)
\le
\frac{1}{2\eta}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big).
$$

With $\eta = 1/\beta$, this becomes

$$
f(x^{t+1})-f(x^*)
\le
\frac{\beta}{2}\Big(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\Big).
$$

Now sum from $t=0$ to $k-1$:

$$
\sum_{t=0}^{k-1}(f(x^{t+1})-f(x^*))
\le
\frac{\beta}{2}\Big(\|x^0-x^*\|^2-\|x^k-x^*\|^2\Big)
\le
\frac{\beta}{2}\|x^0-x^*\|^2.
$$

Divide by $k$:

$$
\frac1k\sum_{t=0}^{k-1}(f(x^{t+1})-f(x^*))
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

Finally, use monotonicity from the descent lemma:

$$
f(x^{t+1}) \le f(x^t),
$$

so the last iterate is the smallest among the first `k` iterates:

$$
f(x^k)-f(x^*)
\le
\frac1k\sum_{t=0}^{k-1}(f(x^{t+1})-f(x^*))
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

That proves the convex rate.

## Main trick in the convex proof

This is almost the same proof as smooth GD, except:

- $G_\eta(x)$ replaces $\nabla f(x)$
- the proximal descent lemma replaces the ordinary smoothness descent lemma

## Part II: strongly convex proximal-gradient rate

### Statement

Assume:

- $g$ is $\alpha$-strongly convex and $\beta$-smooth
- $h$ is convex
- $\eta = 1/\beta$

Then proximal gradient satisfies

$$
\|x^k-x^*\|^2 \le \left(1-\frac{\alpha}{\beta}\right)^k \|x^0-x^*\|^2.
$$

### Proof idea

The proof is the same structural story as strongly-convex GD:

1. start from the strongly-convex version of the proximal descent lemma
2. plug in $z = x^*$
3. use optimality of $x^*$ to drop the function-value term
4. get a one-step contraction

### Strongly-convex proof skeleton to memorize

The strongly-convex proof is the convex proof with one extra negative term:

$$
-\frac{\alpha}{2}\|x-z\|^2.
$$

So the script is:

1. start from the strongly-convex proximal descent lemma
2. plug in $z=x^*$
3. combine it with the same distance identity as before
4. drop the nonpositive function-value term
$$
f(x^*)-f(x^{t+1})\le 0
$$
5. keep the extra strong-convexity term
6. get the one-step contraction
$$
\|x^{t+1}-x^*\|^2\le (1-\alpha\eta)\|x^t-x^*\|^2
$$
7. set $\eta=1/\beta$ and iterate

Short version:

`same proof as convex prox rate, but the extra strong-convexity term upgrades telescope to contraction`

### Strongly-convex proximal descent lemma

When $g$ is also strongly convex, the proximal descent lemma strengthens to

$$
f(x-\eta G_\eta(x))
\le
f(z)+G_\eta(x)^T(x-z)-\frac{\eta}{2}\|G_\eta(x)\|^2-\frac{\alpha}{2}\|x-z\|^2.
$$

Set $x = x^t$, $z = x^*$, and $x^{t+1}=x^t-\eta G_\eta(x^t)$. Then

$$
f(x^{t+1})
\le
f(x^*)+G_\eta(x^t)^T(x^t-x^*)-\frac{\eta}{2}\|G_\eta(x^t)\|^2-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

Rearrange:

$$
\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)
\le
f(x^*)-f(x^{t+1})-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

From the distance expansion,

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
+2\eta\left(\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)\right).
$$

Substitute the previous bound:

$$
\|x^{t+1}-x^*\|^2
\le
\|x^t-x^*\|^2
+2\eta(f(x^*)-f(x^{t+1}))
-\alpha\eta \|x^t-x^*\|^2.
$$

Since $x^*$ is optimal, $f(x^*) \le f(x^{t+1})$, so the middle term is nonpositive. Therefore

$$
\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta)\|x^t-x^*\|^2.
$$

With $\eta = 1/\beta$,

$$
\|x^{t+1}-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)\|x^t-x^*\|^2.
$$

Iterating this gives

$$
\|x^k-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)^k\|x^0-x^*\|^2.
$$

That is the linear rate.

## Main trick in the strongly-convex proof

Exactly one new term appears compared with the convex case:

$$
-\frac{\alpha}{2}\|x-z\|^2.
$$

That single term is what upgrades sublinear convergence into geometric contraction.

## Common traps

- Forgetting which quantity is controlled in each theorem.
- Mixing up $x^t$ and the prox-updated point $x^{t+1}$.
- Trying to use the basic convex descent lemma in the strongly convex proof and then wondering where the contraction factor comes from.

## Source trail

- `materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md`
- `materials/processed/optimization-for-ml/HW3_prompt.md`
- [[2026-04-14-exam-2-section-02-proximal-gradient]]
- [[2026-04-19-hw3-hw4-topic-summary]]
