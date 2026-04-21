# SGD and Prox Proof Structures

This note is the stripped-down companion to the full proof pages in the hub.

The goal is not to replace the full proofs. The goal is to give you a script you can actually run when you are under time pressure and your brain feels slow.

## Table of Contents

- [[#The meta-patterns]]
- [[#SGD: convex nonsmooth averaged rate]]
- [[#SGD: strongly convex fixed-step recursion]]
- [[#SGD: strongly convex decaying-step rate]]
- [[#Prox: fixed points and stationarity]]
- [[#Prox: descent lemma]]
- [[#Prox: convex convergence rate]]
- [[#Prox: strongly convex convergence rate]]
- [[#Minimal memory version]]

## The meta-patterns

There are really only two big proof engines in this part of the course.

### 1. Distance-recursion proofs

This is the SGD pattern.

You always start from the update and expand

$$
\|x^{t+1}-x^*\|^2.
$$

Then you turn the inner product term into something useful:

- convex SGD: into a function gap
- strongly convex SGD: into a function gap plus an extra negative distance term

After that, you either:

- telescope a sum of function gaps, or
- get a one-step recursion and unroll it

### 2. Two-bucket proximal proofs

This is the proximal-gradient pattern.

You always separate the proof into:

- the smooth part $g$
- the nonsmooth part $h$

Then:

- smoothness and convexity handle $g$
- convexity plus prox optimality handle $h$
- one cancellation makes the proof work

If you keep those buckets separate, the proof is manageable. If you mix them too early, the proof becomes unreadable.

---

## SGD: convex nonsmooth averaged rate

Target:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2},
$$

then choose

$$
\eta=\frac{\sqrt R}{G\sqrt k}.
$$

### What to write first

1. the update
$$
x^{t+1}=x^t-\eta g(x^t;\xi_t)
$$
2. the distance expansion
$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta g(x^t;\xi_t)^T(x^t-x^*)
+\eta^2\|g(x^t;\xi_t)\|^2
$$

### The proof script

1. Take conditional expectation.
Purpose:
replace the random gradient by its mean and bound the second moment by $G^2$.

2. Use the subgradient inequality.
Purpose:
turn
$$
g_{x^t}^T(x^t-x^*)
$$
into
$$
f(x^t)-f(x^*).
$$

3. Rearrange so the function gap is on the left.
Target form:
$$
2\eta(\mathbb{E}f(x^t)-f(x^*))
\le
\text{distance difference}+\eta^2G^2.
$$

4. Sum over $t$.
Purpose:
the distance terms telescope.

5. Divide by $k$.
Purpose:
get an average of function gaps.

6. Use convexity on the average iterate.
Purpose:
move from
$$
\frac1k\sum f(x^t)
$$
to
$$
f\!\left(\frac1k\sum x^t\right).
$$

7. Optimize the step size.
Purpose:
balance the two terms
$$
\frac{R}{2\eta k}
\quad \text{and} \quad
\frac{G^2\eta}{2}.
$$

### The line to memorize

`expand distance -> expectation -> subgradient inequality -> telescope -> average iterate -> optimize eta`


---
## SGD: strongly convex fixed-step recursion

Target:

$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}.
$$

### What changes from convex SGD

Only one thing:
strong convexity gives you an extra negative distance term.

### The proof script

1. Start from the same distance expansion.
2. Take conditional expectation.
3. Use strong convexity, not just convexity.

The key inequality is:

$$
-\nabla f(x^t)^T(x^t-x^*)
\le
f(x^*)-f(x^t)-\frac{\alpha}{2}\|x^t-x^*\|^2.
$$

4. Substitute into the recursion.

5. Drop the nonpositive function-value term.
Reason:
$$
f(x^*)-f(x^t)\le 0.
$$

6. Get the master recursion
$$
a_{t+1}\le (1-\alpha\eta)a_t+\eta^2G^2.
$$

7. Unroll the recursion as a geometric series.

### The line to memorize

`same distance proof, but strong convexity gives an extra negative distance term; dropping the function-gap term leaves a contraction plus noise`

---
## SGD: strongly convex decaying-step rate

Target idea:

- do not stop at the recursion with an error floor
- keep the stronger inequality with the function gap still visible
- sum weighted function gaps

### The proof script

1. Start from the same pre-dropping inequality:
$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta_t(f(x^*)-\mathbb{E}f(x^t))
-\alpha\eta_t\mathbb{E}\|x^t-x^*\|^2
+\eta_t^2G^2.
$$

2. Do not drop the function-gap term.
Reason:
the theorem is now about function value, not just distance.

3. Plug in
$$
\eta_t=\frac{1}{\alpha(t+1)}.
$$

4. Rearrange into weighted function gaps and sum.

5. The summation produces
$$
\sum_{t=1}^k \frac1t,
$$
so a $\log k$ appears.

### The line to memorize

`fixed step: drop the function-gap term and get an error floor; decaying step: keep the function-gap term and sum weighted gaps`

---
## Prox: fixed points and stationarity

Target:

$$
G_\eta(x^*)=0
\iff
0\in \nabla g(x^*)+\partial h(x^*).
$$

### What to write first

Always start from prox optimality:

$$
u=\operatorname{prox}_{\eta,h}(v)
\iff
\frac1\eta(v-u)\in \partial h(u).
$$

### Direction A: $G_\eta(x^*)=0 \Rightarrow$ stationarity

1. Write
$$
u=x-\eta G_\eta(x),
\qquad
v=x-\eta \nabla g(x).
$$

2. Apply prox optimality:
$$
\frac1\eta(v-u)\in \partial h(u).
$$

3. Substitute the definitions of $u$ and $v$.

4. Simplify to
$$
G_\eta(x)-\nabla g(x)\in \partial h(x-\eta G_\eta(x)).
$$

5. Set $G_\eta(x^*)=0$.
Then the prox point becomes just $x^*$, so you get
$$
0\in \nabla g(x^*)+\partial h(x^*).
$$

### Direction B: stationarity $\Rightarrow G_\eta(x^*)=0$

1. Start from
$$
0\in \nabla g(x^*)+\partial h(x^*).
$$

2. Rearrange to
$$
-\nabla g(x^*)\in \partial h(x^*).
$$

3. Multiply by $\eta$ and rewrite it as
$$
(v-u)\in \eta \partial h(u)
$$
with
$$
v=x^*-\eta \nabla g(x^*),\qquad u=x^*.
$$

4. Recognize prox optimality:
$$
x^*=\operatorname{prox}_{\eta,h}(x^*-\eta \nabla g(x^*)).
$$

5. Plug into the definition of $G_\eta$ and get zero.

### The line to memorize

`all fixed-point proofs start from prox optimality, not from the final theorem`

## Prox: descent lemma

Target:

$$
f(y)\le f(z)+G_\eta(x)^T(x-z)-\frac{\eta}{2}\|G_\eta(x)\|^2
$$

for

$$
y=x-\eta G_\eta(x).
$$

### The two buckets

Bucket 1: the smooth part $g$

- use smoothness at $y$
- then use convexity to replace $g(x)$ by a bound involving $g(z)$

Bucket 2: the nonsmooth part $h$

- use convexity of $h$ at the prox point $y$
- choose the special subgradient
$$
s=G_\eta(x)-\nabla g(x)\in \partial h(y)
$$

### The proof script

1. Define
$$
y=x-\eta G_\eta(x).
$$

2. Smooth part:
write a smoothness bound for $g(y)$.

3. Still in the smooth bucket:
use convexity of $g$ to replace $g(x)$ by $g(z)+\nabla g(x)^T(x-z)$.

4. Nonsmooth part:
use
$$
h(y)\le h(z)-s^T(z-y)
$$
with
$$
s=G_\eta(x)-\nabla g(x).
$$

5. Expand
$$
z-y=z-x+\eta G_\eta(x).
$$

6. Add the $g$ inequality and the $h$ inequality.

7. Look for the cancellation:
the $-\eta \nabla g(x)^T G_\eta(x)$ from the smooth part cancels the $+\eta \nabla g(x)^T G_\eta(x)$ from the nonsmooth part.

8. Use $\eta\le 1/\beta$ to turn the remaining coefficient into $-\eta/2$.

### The line to memorize

`smooth g + convex g, convex h + prox subgradient at the prox point, then one cancellation`

---
## Prox: convex convergence rate

Target:

$$
f(x^k)-f(x^*)
\le
\frac{\beta}{2k}\|x^0-x^*\|^2.
$$

### The proof script

1. Start from the distance identity for
$$
x^{t+1}=x^t-\eta G_\eta(x^t).
$$

2. Rearrange it so the bracket
$$
\frac{\eta}{2}\|G_\eta(x^t)\|^2-(x^t-x^*)^T G_\eta(x^t)
$$
appears.

3. Apply the proximal descent lemma with $z=x^*$.

4. Use that lemma to bound the bracket by
$$
f(x^*)-f(x^{t+1}).
$$

5. Substitute back into the distance identity.

6. Rearrange into a telescoping one-step bound:
$$
f(x^{t+1})-f(x^*)
\le
\frac{1}{2\eta}\left(\|x^t-x^*\|^2-\|x^{t+1}-x^*\|^2\right).
$$

7. Sum over $t$.

8. Use monotonicity
$$
f(x^{t+1})\le f(x^t)
$$
to convert the average bound into a last-iterate bound.

### The line to memorize

`distance identity + prox descent lemma + telescope`

## Prox: strongly convex convergence rate

Target:

$$
\|x^k-x^*\|^2
\le
\left(1-\frac{\alpha}{\beta}\right)^k\|x^0-x^*\|^2.
$$

### What changes from the convex rate proof

Exactly one thing:
the strongly-convex proximal descent lemma has one extra term

$$
-\frac{\alpha}{2}\|x-z\|^2.
$$

### The proof script

1. Start from the strongly-convex proximal descent lemma with $z=x^*$.

2. Rearrange the same bracket as in the convex proof.

3. Plug that bracket into the distance identity.

4. Drop the nonpositive function-value term
$$
f(x^*)-f(x^{t+1})\le 0.
$$

5. Keep the extra negative distance term.

6. Get a one-step contraction:
$$
\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta)\|x^t-x^*\|^2.
$$

7. Set $\eta=1/\beta$ and iterate.

### The line to memorize

`same as convex prox rate, but the extra strong-convexity term turns telescoping into contraction`

## Minimal memory version

If you want the shortest possible recall sheet, memorize these seven lines:

1. SGD convex: `expand distance -> expectation -> subgradient inequality -> telescope -> average iterate`
2. SGD strong fixed-step: `same proof + strong convexity -> contraction plus noise floor`
3. SGD strong decaying-step: `keep the function-gap term -> harmonic sum -> log`
4. Prox fixed points: `start from prox optimality`
5. Prox descent lemma: `g bucket, h bucket, cancellation`
6. Prox convex rate: `distance identity + descent lemma + telescope`
7. Prox strong rate: `same proof + extra negative distance term -> contraction`
