# 1. Stochastic Gradient Descent

Suppose the objective is differentiable but the full gradient is expensive to compute. Instead of using $\nabla f(x)$, we use a random estimator $g(x;\xi)$ satisfying

$$
\mathbb{E}[g(x;\xi)\mid x] = \nabla f(x).
$$


The SGD update is

$$
x^{t+1} = x^t - \eta_t g(x^t;\xi_t).
$$

This is formally identical to gradient descent, but the randomness changes the geometry of convergence. The key identity is

$$
\mathbb{E}\|g(x,\xi)\|^2 = \|\nabla f(x)\|^2 + \operatorname{Var}(g(x,\xi)).
$$

This explains the central phenomenon of SGD: even when the iterate is near the optimum and the true gradient is small, the stochastic gradient can still have nontrivial magnitude because of the variance term. Therefore fixed-step SGD typically does not converge exactly; instead it enters a noise-dominated regime.

### 1.0 Lecture Framing and Canonical Examples

The lecture treated SGD as the basic algorithm for objectives that are expectations or large finite averages. The point is not just that gradients are noisy. The point is that the objective often has a structure that naturally produces unbiased sample-based gradients.

For a finite-sum problem

$$
f(x)=\frac{1}{n}\sum_{i=1}^n f_i(x),
$$

if $\xi_t$ is uniform on $\{1,\dots,n\}$ and

$$
g(x;\xi_t)=\nabla f_{\xi_t}(x),
$$

then

$$
\mathbb{E}_{\xi_t}[g(x;\xi_t)] = \frac{1}{n}\sum_{i=1}^n \nabla f_i(x)=\nabla f(x).
$$

So randomized incremental gradient is a direct SGD example.

In empirical risk minimization, if

$$
R(w)=\mathbb{E}_{(X,Y)\sim P}\big[\ell(f_w(X),Y)\big],
$$

and the data set is $(X_1,Y_1),\dots,(X_n,Y_n)$, then the empirical objective is

$$
R_n(w)=\frac{1}{n}\sum_{i=1}^n \ell(f_w(X_i),Y_i).
$$

The per-sample gradient

$$
\nabla_w \ell(f_w(X_i),Y_i)
$$

is the standard stochastic gradient object. This is the version of SGD that actually appears in ML.

The lecture also emphasized mini-batch SGD:

$$
x^{t+1}=x^t-\eta_t\frac{1}{m}\sum_{i\in I_t}\nabla f_i(x^t).
$$

The larger the batch size $m$, the lower the variance of the stochastic gradient, but the higher the per-iteration cost. This variance-versus-cost tradeoff is one of the main practical reasons mini-batching exists.

### 1.05 Warm-Up Example: SGD as Running Average

One of the most important lecture examples is

$$
\min_x \frac12 \mathbb{E}\|X-x\|^2.
$$

The minimizer is the population mean

$$
x^*=\mathbb{E}[X]=\mu.
$$

If we observe samples $X_1,X_2,\dots$ and use

$$
g(x^t;X_t)=x^t-X_t,
$$

then the SGD update is

$$
x^{t+1}=x^t-\eta_t(x^t-X_{t+1})=(1-\eta_t)x^t+\eta_t X_{t+1}.
$$

For the special stepsize

$$
\eta_t=\frac{1}{t+1},
$$

this becomes the running-average recursion. Starting from $x^0=0$,

$$
x^1=X_1,\qquad
x^2=\frac12(X_1+X_2),\qquad
x^3=\frac13(X_1+X_2+X_3),
$$

and by induction

$$
x^n=\frac{1}{n}\sum_{i=1}^n X_i.
$$

So in this example, SGD is literally computing the sample mean one sample at a time.

The lecture then evaluates the excess objective value and gets

$$
f(x^n)-f(x^*)=\frac{\sigma^2}{2n}=O(1/n).
$$

This is a useful calibration point for the whole topic. Even in this very favorable smooth, strongly convex example, the statistical rate is of order $1/n$, not linear convergence to exact optimality.

### 1.1 Convex Nonsmooth SGD

Under the standard assumptions

- $f$ convex,
- the stochastic subgradient is unbiased in expectation,
- the second moment is bounded,

the averaged iterate $\bar x_k$ satisfies

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O(1/\sqrt{k}).
$$

This is slower than the `1/k` rate of deterministic gradient descent on smooth convex problems, but it is the right benchmark when one only has noisy first-order information.

The lecture theorem is more precise. Assume

- $g_x \doteq \mathbb{E}_\xi[g(x;\xi)] \in \partial f(x)$,
- $\|x^0-x^*\|^2 \le R$ for some minimizer $x^*$,
- $\mathbb{E}\|g(x,\xi)\|^2 \le G^2$ for all $x$.

Then with the fixed stepsize

$$
\eta = \frac{\sqrt{R}}{G\sqrt{k}},
$$

the averaged iterate

$$
\bar x_k=\frac{1}{k}\sum_{t=1}^k x^t
$$

satisfies

$$
\mathbb{E}[f(\bar x_k)]-f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}.
$$

This theorem is exam-relevant in a very specific way. It is exactly the kind of result that can be tested in an Exam-1-style short-answer or select-all question. The common traps are:

- forgetting that the guarantee is on $\bar x_k$, not necessarily $x^k$,
- stating only the rate and not the converging quantity,
- confusing the bounded-second-moment assumption with a deterministic gradient bound,
- forgetting that the proof uses convexity to pass from average function value to function value at the average.

The proof skeleton from lecture is worth remembering, but it is better to read it as a sequence of small legal moves rather than as one big jump. In the walkthrough below, each step is written as:

- original version
- new version
- substitution or rule being used

Step 1: start from the update and expand the squared distance.

Original version:

$$
x^{t+1}=x^t-\eta g(x^t;\xi_t).
$$

New version:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta \,g(x^t;\xi_t)^T(x^t-x^*)
+\eta^2\|g(x^t;\xi_t)\|^2.
$$

Substitution being made:

- plug the SGD update into $\|x^{t+1}-x^*\|^2$
- expand with $\|a-b\|^2=\|a\|^2-2a^Tb+\|b\|^2$

Intermediate algebra:

$$
x^{t+1}-x^* = x^t-\eta g(x^t;\xi_t)-x^*
$$

$$
x^{t+1}-x^* = (x^t-x^*)-\eta g(x^t;\xi_t)
$$

Now set

$$
a=x^t-x^*, \qquad b=\eta g(x^t;\xi_t),
$$

so that

$$
\|x^{t+1}-x^*\|^2 = \|a-b\|^2 = \|a\|^2-2a^Tb+\|b\|^2.
$$

Step 2: take conditional expectation given $x^t$. This freezes the current iterate and averages only over the fresh randomness $\xi_t$.

Original version:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*\|^2
-2\eta \,g(x^t;\xi_t)^T(x^t-x^*)
+\eta^2\|g(x^t;\xi_t)\|^2.
$$

New version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta \,\mathbb{E}[g(x^t;\xi_t)\mid x^t]^T(x^t-x^*)
+\eta^2 G^2.
$$

Substitution being made:

- $\|x^t-x^*\|^2$ stays unchanged because it is fixed once $x^t$ is known
- $x^t-x^*$ is pulled outside the expectation in the middle term
- $\mathbb{E}[\|g(x^t;\xi_t)\|^2\mid x^t]$ is upper-bounded by $G^2$

Intermediate algebra:

Start by applying $\mathbb{E}[\cdot \mid x^t]$ to every term:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
=
\mathbb{E}[\|x^t-x^*\|^2\mid x^t]
-2\eta\,\mathbb{E}[g(x^t;\xi_t)^T(x^t-x^*)\mid x^t]
+\eta^2\mathbb{E}[\|g(x^t;\xi_t)\|^2\mid x^t].
$$

Since $x^t$ is fixed under conditioning,

$$
\mathbb{E}[\|x^t-x^*\|^2\mid x^t]=\|x^t-x^*\|^2.
$$

Also,

$$
\mathbb{E}[g(x^t;\xi_t)^T(x^t-x^*)\mid x^t]
=
\mathbb{E}[g(x^t;\xi_t)\mid x^t]^T(x^t-x^*).
$$

And by assumption,

$$
\mathbb{E}[\|g(x^t;\xi_t)\|^2\mid x^t]\le G^2.
$$

Step 3: replace the conditional mean of the stochastic gradient by the subgradient object from the theorem.

Original version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta \,\mathbb{E}[g(x^t;\xi_t)\mid x^t]^T(x^t-x^*)
+\eta^2 G^2.
$$

New version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta \,g_{x^t}^T(x^t-x^*)
+\eta^2 G^2.
$$

Substitution being made:

$$
g_{x^t}\doteq \mathbb{E}[g(x^t;\xi_t)\mid x^t]\in \partial f(x^t).
$$

Intermediate algebra:

The middle term in the previous step is

$$
\mathbb{E}[g(x^t;\xi_t)\mid x^t]^T(x^t-x^*).
$$

We now simply rename

$$
\mathbb{E}[g(x^t;\xi_t)\mid x^t]
$$

as

$$
g_{x^t}.
$$

Nothing else changes in the inequality.

Step 4: convert the inner product term into a function-value term using the subgradient inequality.

Original version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta \,g_{x^t}^T(x^t-x^*)
+\eta^2 G^2.
$$

Auxiliary inequality:

$$
f(x^t)+g_{x^t}^T(x^*-x^t)\le f(x^*).
$$

Rearranged auxiliary form:

$$
-g_{x^t}^T(x^t-x^*) \le f(x^*)-f(x^t).
$$

New version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
+2\eta(f(x^*)-f(x^t))
+\eta^2 G^2.
$$

Substitution being made:

- replace the term $-g_{x^t}^T(x^t-x^*)$ by its upper bound $f(x^*)-f(x^t)$

Intermediate algebra:

Start from the subgradient inequality:

$$
f(x^*) \ge f(x^t)+g_{x^t}^T(x^*-x^t).
$$

Subtract $f(x^t)$ from both sides:

$$
f(x^*)-f(x^t) \ge g_{x^t}^T(x^*-x^t).
$$

Now note that

$$
g_{x^t}^T(x^*-x^t)=-g_{x^t}^T(x^t-x^*).
$$

So

$$
f(x^*)-f(x^t)\ge -g_{x^t}^T(x^t-x^*),
$$

which is exactly the bound we substitute.

Step 5: remove the conditioning.

Original version:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
+2\eta(f(x^*)-f(x^t))
+\eta^2 G^2.
$$

New version after removing conditioning:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+\eta^2 G^2.
$$

Substitution being made:

- apply expectation to both sides
- use the tower property $\mathbb{E}[\mathbb{E}[Z\mid x^t]]=\mathbb{E}[Z]$

Intermediate algebra:

Apply ordinary expectation to both sides:

$$
\mathbb{E}\!\left[\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]\right]
\le
\mathbb{E}\!\left[\|x^t-x^*\|^2 +2\eta(f(x^*)-f(x^t))+\eta^2G^2\right].
$$

Now use linearity of expectation:

$$
\mathbb{E}\!\left[\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]\right]
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta\,\mathbb{E}[f(x^*)-f(x^t)]
+\eta^2G^2.
$$

Since $f(x^*)$ is deterministic,

$$
\mathbb{E}[f(x^*)-f(x^t)] = f(x^*)-\mathbb{E}[f(x^t)].
$$

And by the tower property,

$$
\mathbb{E}\!\left[\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]\right]
=
\mathbb{E}\|x^{t+1}-x^*\|^2.
$$

Step 6: sum the one-step inequality over $t=0,\dots,k-1$.

Original version:

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\mathbb{E}\|x^t-x^*\|^2
+2\eta\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+\eta^2 G^2.
$$

New version after summing:

$$
\sum_{t=0}^{k-1}\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\sum_{t=0}^{k-1}\mathbb{E}\|x^t-x^*\|^2
+2\eta\sum_{t=0}^{k-1}\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+k\eta^2 G^2.
$$

Substitution being made:

- one inequality at time $t$ becomes a sum of inequalities over all $t$

Intermediate algebra:

For $t=0$, $1$, $2$, and so on, write

$$
\mathbb{E}\|x^{1}-x^*\|^2
\le
\mathbb{E}\|x^0-x^*\|^2
+2\eta\big(f(x^*)-\mathbb{E}[f(x^0)]\big)
+\eta^2 G^2,
$$

$$
\mathbb{E}\|x^{2}-x^*\|^2
\le
\mathbb{E}\|x^1-x^*\|^2
+2\eta\big(f(x^*)-\mathbb{E}[f(x^1)]\big)
+\eta^2 G^2,
$$

and continue up to $t=k-1$. Adding these inequalities term-by-term gives the summed version.

Step 7: telescope the distance terms.

Original version:

$$
\sum_{t=0}^{k-1}\mathbb{E}\|x^{t+1}-x^*\|^2
\le
\sum_{t=0}^{k-1}\mathbb{E}\|x^t-x^*\|^2
+2\eta\sum_{t=0}^{k-1}\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+k\eta^2 G^2.
$$

Rearranged version:

$$
\sum_{t=0}^{k-1}\mathbb{E}\|x^{t+1}-x^*\|^2
-\sum_{t=0}^{k-1}\mathbb{E}\|x^t-x^*\|^2
\le
2\eta\sum_{t=0}^{k-1}\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+k\eta^2 G^2.
$$

New version after telescoping:

$$
\mathbb{E}\|x^k-x^*\|^2-\|x^0-x^*\|^2
\le
2\eta\sum_{t=0}^{k-1}\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+k\eta^2 G^2.
$$

Substitution being made:

- the two long sums of distances cancel term-by-term, leaving only the first and last terms

Intermediate algebra:

Write the two sums out:

$$
\sum_{t=0}^{k-1}\mathbb{E}\|x^{t+1}-x^*\|^2
=
\mathbb{E}\|x^1-x^*\|^2+\mathbb{E}\|x^2-x^*\|^2+\cdots+\mathbb{E}\|x^k-x^*\|^2,
$$

$$
\sum_{t=0}^{k-1}\mathbb{E}\|x^t-x^*\|^2
=
\mathbb{E}\|x^0-x^*\|^2+\mathbb{E}\|x^1-x^*\|^2+\cdots+\mathbb{E}\|x^{k-1}-x^*\|^2.
$$

Subtracting them gives

$$
\big(\mathbb{E}\|x^1-x^*\|^2+\cdots+\mathbb{E}\|x^k-x^*\|^2\big)
-\big(\mathbb{E}\|x^0-x^*\|^2+\cdots+\mathbb{E}\|x^{k-1}-x^*\|^2\big),
$$

and every middle term cancels, leaving only

$$
\mathbb{E}\|x^k-x^*\|^2-\|x^0-x^*\|^2.
$$

Finally rearrange to isolate the average suboptimality:

$$
\frac{1}{k}\sum_{t=0}^{k-1}\big(\mathbb{E}[f(x^t)]-f(x^*)\big)
\le
\frac{\|x^0-x^*\|^2}{2\eta k}+\frac{G^2\eta}{2}.
$$

Intermediate algebra:

From

$$
\mathbb{E}\|x^k-x^*\|^2-\|x^0-x^*\|^2
\le
2\eta\sum_{t=0}^{k-1}\big(f(x^*)-\mathbb{E}[f(x^t)]\big)
+k\eta^2 G^2,
$$

move the function-value sum to the left and the initial-distance term to the right:

$$
2\eta\sum_{t=0}^{k-1}\big(\mathbb{E}[f(x^t)]-f(x^*)\big)
\le
\|x^0-x^*\|^2-\mathbb{E}\|x^k-x^*\|^2+k\eta^2 G^2.
$$

Now drop the nonnegative term $\mathbb{E}\|x^k-x^*\|^2$:

$$
2\eta\sum_{t=0}^{k-1}\big(\mathbb{E}[f(x^t)]-f(x^*)\big)
\le
\|x^0-x^*\|^2+k\eta^2 G^2.
$$

Then divide by $2\eta k$.

Step 8: isolate the average suboptimality.

Step 9: use convexity to move from the average of function values to the function value at the average iterate.

Original version:

$$
\frac{1}{k}\sum_{t=0}^{k-1}\big(\mathbb{E}[f(x^t)]-f(x^*)\big)
\le
\frac{\|x^0-x^*\|^2}{2\eta k}+\frac{G^2\eta}{2}.
$$

New version:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

Substitution being made:

- replace $\|x^0-x^*\|^2$ by the upper bound $R$
- use convexity:

$$
f\!\left(\frac{1}{k}\sum_{t=1}^k x^t\right)\le \frac{1}{k}\sum_{t=1}^k f(x^t)
$$

Intermediate algebra:

From the previous step,

$$
\frac{1}{k}\sum_{t=0}^{k-1}\mathbb{E}[f(x^t)]-f(x^*)
\le
\frac{\|x^0-x^*\|^2}{2\eta k}+\frac{G^2\eta}{2}.
$$

Since $\|x^0-x^*\|^2\le R$,

$$
\frac{1}{k}\sum_{t=0}^{k-1}\mathbb{E}[f(x^t)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

And by convexity,

$$
f(\bar x_k)\le \frac{1}{k}\sum_{t=0}^{k-1} f(x^t).
$$

Taking expectation preserves the inequality, so

$$
\mathbb{E}[f(\bar x_k)] \le \frac{1}{k}\sum_{t=0}^{k-1}\mathbb{E}[f(x^t)].
$$

Substituting this into the previous bound gives the desired result.

Step 10: choose $\eta$ to balance the optimization term and the noise term.

Original version:

$$
\mathbb{E}[f(\bar x_k)]-f(x^*)
\le
\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

New version:

$$
\eta=\frac{\sqrt{R}}{G\sqrt{k}}
\qquad \Longrightarrow \qquad
\mathbb{E}[f(\bar x_k)]-f(x^*) \le \frac{G\sqrt{R}}{\sqrt{k}}.
$$

Substitution being made:

- choose $\eta$ to balance the term that shrinks with larger $\eta$ against the term that grows with larger $\eta$

Intermediate algebra:

The right-hand side is

$$
\phi(\eta)=\frac{R}{2\eta k}+\frac{G^2\eta}{2}.
$$

The first term gets smaller when $\eta$ gets larger, but the second term gets larger when $\eta$ gets larger. So the best choice of $\eta$ balances them.

Differentiate:

$$
\phi'(\eta)=-\frac{R}{2k\eta^2}+\frac{G^2}{2}.
$$

Set $\phi'(\eta)=0$:

$$
-\frac{R}{2k\eta^2}+\frac{G^2}{2}=0
\quad \Longrightarrow \quad
\eta^2=\frac{R}{G^2k}.
$$

Hence

$$
\eta=\frac{\sqrt{R}}{G\sqrt{k}}.
$$

This is exactly the level of proof compression you should aim for on the exam: not every algebra line, but a clear explanation of what happens at each step and why each substitution is legal.

### 1.2 Strongly Convex SGD

When the objective is strongly convex, one can get sharper behavior. With fixed step size,

$$
\mathbb{E}\|x^k - x^*\|^2
\le
(1-\alpha \eta)^k \|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}.
$$

The first term is the deterministic contraction term. The second is the stochastic error floor. The interpretation is:

- early iterations behave roughly like linearly convergent GD,
- later iterations are limited by variance.

If instead one uses a decaying step size and average the iterates appropriately, then

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O((1+\log k)/k).
$$

This is close to `1/k` up to a logarithmic factor.

Again, the lecture statement is more detailed. Assume $f$ is $\alpha$-strongly convex, the stochastic gradients are unbiased, and

$$
\mathbb{E}\|g(x,\xi)\|^2 \le G^2.
$$

Then:

1. if $\eta<1/\alpha$ is fixed,
$$
\mathbb{E}\|x^k-x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2+\frac{\eta G^2}{\alpha}
$$
2. if $\eta_t = 1/(\alpha(t+1))$,
$$
\mathbb{E}[f(\bar x_k)]-f(x^*) \le \frac{G^2(1+\log k)}{2\alpha k}.
$$

This is exactly the kind of place where Exam 1 suggests you should expect precision questions. The exam style strongly favors asking:

- what quantity is converging,
- what rate it converges at,
- what assumption produces the theorem,
- and whether smoothness changes the story.

The correct conceptual answer from lecture is that smoothness does not fix the core issue. Even for strongly convex functions, SGD does not achieve deterministic-style linear convergence to the optimizer because the stochastic gradients retain variance. The lecture explicitly emphasizes that this is why fixed-step SGD bounces around a ball near $x^*$.

The main recursion from the proof is

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta_t)\mathbb{E}\|x^t-x^*\|^2+\eta_t^2 G^2.
$$

Here it is worth unpacking where this comes from.

Step 1: begin from the same distance expansion as before:

$$
\|x^{t+1}-x^*\|^2
=
\|x^t-x^*-\eta_t g(x^t;\xi_t)\|^2.
$$

Step 2: take conditional expectation and use unbiasedness:

$$
\mathbb{E}[\|x^{t+1}-x^*\|^2\mid x^t]
\le
\|x^t-x^*\|^2
-2\eta_t \nabla f(x^t)^T(x^t-x^*)
+\eta_t^2 G^2.
$$

Step 3: use strong convexity with $x=x^t$ and $y=x^*$:

$$
f(x^*) \ge f(x^t) + \nabla f(x^t)^T(x^*-x^t) + \frac{\alpha}{2}\|x^*-x^t\|^2.
$$

Rearranging gives an upper bound on the troublesome inner product term:

$$
-2\eta_t\nabla f(x^t)^T(x^t-x^*)
\le
2\eta_t\big(f(x^*)-f(x^t)\big)-\alpha\eta_t\|x^t-x^*\|^2.
$$

Step 4: substitute this bound into the distance recursion. Since $f(x^*)-f(x^t)\le 0$, dropping that term gives

$$
\mathbb{E}\|x^{t+1}-x^*\|^2
\le
(1-\alpha\eta_t)\mathbb{E}\|x^t-x^*\|^2+\eta_t^2 G^2.
$$

This is the structural reason behind both theorem statements:

- the $(1-\alpha\eta_t)$ term creates contraction,
- the $\eta_t^2 G^2$ term comes from stochastic-gradient magnitude,
- with fixed $\eta$, that extra term never disappears,
- with decreasing $\eta_t$, it becomes small enough to drive the error down further.

The practical heuristic mentioned in lecture is also worth remembering because it is an easy T/F or short conceptual question: run SGD with a fixed stepsize until progress stalls, then reduce the stepsize and continue. The theorem gives the reason this heuristic makes sense.



### 1.25 Exam-Facing Summary of Quantities and Traps

Based on the style of Exam 1, the most testable SGD issues are not long proofs. They are short precision checks.

You should be able to answer, quickly and exactly:

- what object is unbiased: $g(x;\xi)$ is unbiased for $\nabla f(x)$, not for $f(x)$,
- where the expectation is taken: over the data or the stochastic choice, not over the parameter,
- what $G$ means: a deterministic bound on stochastic-gradient magnitude or second moment,
- why fixed-step SGD fails to converge exactly: variance leaves an error floor,
- what quantity has the $1/\sqrt{k}$ guarantee: averaged function value in the convex case,
- what quantity has the $(1+\log k)/k$ guarantee: averaged function value in the strongly convex decaying-step case,
- what quantity appears in the fixed-step strongly convex bound: squared distance to $x^*$,
- why averaging appears: convexity lets us compare $f(\bar x_k)$ with the average of $f(x^t)$.

### 1.3 What To Know

You should be able to state:

- the unbiasedness assumption,
- the SGD update,
- the finite-sum and ERM interpretations of SGD,
- the mini-batch update and what changes when the batch size grows,
- the running-average warm-up with $\eta_t=1/(t+1)$,
- the precise quantity-and-rate pair for convex nonsmooth SGD,
- the precise quantity-and-rate pair for strongly convex fixed-step and decaying-step SGD,
- the meaning of the constant $G$,
- why fixed-step SGD usually does not converge exactly,
- the difference between the convex $1/\sqrt{k}$ regime and the strongly-convex near-`1/k` averaged regime,
- why smoothness alone does not eliminate the stochastic error floor,
- how the proofs mirror subgradient and strongly-convex proofs but with expectations added.
