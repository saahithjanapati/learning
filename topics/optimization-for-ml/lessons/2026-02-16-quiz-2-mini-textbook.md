# Optimization Quiz 2 Mini-Textbook (Easy Mode)

Date: 2026-02-16  
Mode: learn (exposition-heavy)  
Scope: Gradient Descent, GD convergence proof ideas, Subgradients, Subgradient Method, Projected (Sub)gradient, Optimality Conditions, Stochastic Gradient

## What This Is

You said the checkpoints felt like "clear as mud". This is the same material, rewritten like a small textbook:

- slow, plain-English intuition first
- then the math
- then the "why the proof works"
- tiny questions sprinkled throughout to check understanding

You do not need to read every word in one sitting.

## How To Read This (Two Options)

If you have 30 minutes:

1. Read: "Big Picture" + "GD in One Dimension" + "Subgradients" + "Projection" + "SGD"
2. Answer the short questions under each section.

If you have 2 hours:

1. Read everything in order.
2. Do the "Micro-checks" at the end.

## Math Color Key (Used Throughout)

- <span style="color:#67E8F9">Cyan (bright)</span>: current/base value terms
- <span style="color:#FDA4AF">Rose (bright)</span>: descent direction or first-order term
- <span style="color:#86EFAC">Mint (bright)</span>: curvature/projection/constraint term
- <span style="color:#C4B5FD">Violet (bright)</span>: step-size or convergence coefficient
- <span style="color:#FDE047">Gold (bright)</span>: stochastic/noisy estimate term

## Big Picture: One Update Pattern, Many Variants

Almost everything in this quiz fits the template:

1. You have an objective $f(x)$ you want to minimize.
2. You have a direction $d_t$ that (hopefully) points toward lower $f$.
3. You pick a step size $\eta_t$.
4. You update $x$.

Unconstrained updates look like:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
+
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{d_t}}
$$

and for minimization, $d_t$ is usually "downhill", like $-\nabla f(x_t)$.

Constrained updates look like:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#86EFAC}{\Pi_C}}\!\left({\color{#67E8F9}{x_t}} + {\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{d_t}}\right)
$$

where $\Pi_C(\cdot)$ is a projection that forces $x_{t+1} \in C$.

Stochastic updates look like:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDE047}{g_t}}
$$

where $g_t$ is a *noisy* estimate of $\nabla f(x_t)$ from data.

Micro-check 1 (log):

Prompt:
1. In your own words, what are the three degrees of freedom in the update rule?

Your answer (logged):
1. whether you're on a constraint set / do we project onto constraint set
2. whether it's stochastic
3. the learning rate

Correct answer:
1. update direction ($d_t$, e.g. $-\nabla f(x_t)$ or noisy $g_t$)
2. step size ($\eta_t$)
3. feasibility handling (no projection vs projection $\Pi_C$)

Clarification:
Stochasticity is usually treated as part of how you choose/estimate the direction term, not a separate independent knob.



## Prerequisite Cheat Sheet (Minimum Needed)

You only need a few core concepts to follow this:

- **Gradient**: $\nabla f(x)$ points in the direction of fastest increase of $f$.
- **Convex**: the function has "no bad local minima". For convex $f$, local minimum = global minimum.
- **Smooth** (a.k.a. $L$-smooth): gradient doesn't change too wildly; this makes "small steps" predictable.
- **Strongly convex**: convex plus curvature; gives faster (linear) rates.

### Strong Convexity Crash Note

Plain-English picture:
- Convex means the bowl is not wavy.
- Strongly convex means the bowl is not too flat; it has a minimum amount of curvature everywhere.

One common formal definition is:

$$
f(y)
\ge
{\color{#67E8F9}{f(x)}}
+
{\color{#FDA4AF}{\nabla f(x)^\top (y-x)}}
+
{\color{#86EFAC}{\frac{\mu}{2}\|y-x\|^2}},
\quad {\color{#C4B5FD}{\mu > 0}}
$$

Quick compare (common confusion):

$$
\begin{aligned}
L\text{-smooth:}\quad
& f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{L}{2}\|y-x\|^2 \\
\mu\text{-strongly convex:}\quad
& f(y)\ge f(x)+\nabla f(x)^\top(y-x)+\frac{\mu}{2}\|y-x\|^2
\end{aligned}
$$

They look similar, but are not the same:
- inequality direction flips ($\le$ vs $\ge$)
- smoothness ($L$) is an **upper curvature bound** (not too sharp)
- strong convexity ($\mu$) is a **lower curvature bound** (not too flat)

The extra $\frac{\mu}{2}\|y-x\|^2$ term is the "guaranteed curvature" part.

Useful examples:
- $f(x)=x^2$ is strongly convex (good curved bowl).
- $f(x)=x^4$ is convex, but not strongly convex globally (very flat near $x=0$).

Why you care:
- With convex + smooth, GD usually gives sublinear rates like $O(1/T)$.
- With strongly convex + smooth, GD gets geometric shrinkage (linear convergence), roughly "constant-factor improvement each step."

If these words are foggy, that's normal. This document will make them concrete.

## 1) Gradient Descent (GD): The Simplest Case

### GD in One Dimension (1D)

Suppose $f:\mathbb{R}\to\mathbb{R}$ and you are at a point $x_t$.

- If $f'(x_t) > 0$, then increasing $x$ increases $f$, so you want to move left.
- If $f'(x_t) < 0$, then increasing $x$ decreases $f$, so you want to move right.

That is exactly what:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{f'(x_t)}}
$$

does.

Example: $f(x)=\tfrac{1}{2}x^2$.

Then $f'(x)=x$, so:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{x_t}}
=
{\color{#C4B5FD}{(1-\eta_t)}}{\color{#67E8F9}{x_t}}
$$

If $0 < \eta_t < 2$, this shrinks $x_t$ toward $0$.

If $\eta_t$ is too big, the sign can flip each step and you bounce or diverge.

Micro-check:
1. If $x_t=10$ and $\eta_t=0.1$, what is $x_{t+1}$?
	1. (1-0.1) * 10 = (0.9) * 10 = 9

2. If $\eta_t=3$, what happens qualitatively (shrink, bounce, or blow up)?
	1. blow up (with x_t = 10, we go to -20, which is worse) 

### GD in $\mathbb{R}^d$

Now $x \in \mathbb{R}^d$ and:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{\nabla f(x_t)}}
$$

Interpretation:

- $\nabla f(x_t)$ points uphill in $d$ dimensions.
- $-\nabla f(x_t)$ points downhill.
- $\eta_t$ is "how big a step" you take.

### Why Step Size Matters (Intuition)

Think of hiking down a mountain in fog:

- You can look locally (gradient) and pick "downhill".
- If you take a tiny step, you safely go down.
- If you take a huge leap, you might overshoot into a worse place.

This is why all convergence proofs talk about **assumptions** (like smoothness) and **step size**.

## 2) Smoothness: The Key Inequality Behind GD Proofs

The one inequality you should recognize is the smoothness upper bound:

If $f$ is $L$-smooth, then for all $x,y$:

$$
f(y)
\le
{\color{#67E8F9}{f(x)}}
+
{\color{#FDA4AF}{\nabla f(x)^T (y-x)}}
+
{\color{#86EFAC}{\frac{L}{2}\|y-x\|^2}}
$$

Plain English:
- blue term: where you started
- red term: linear prediction (first-order change)
- green term: correction for curvature

### Plugging in the GD Step (Very Slow Derivation)

Goal of this derivation (before mechanics):
- We want a clean inequality that compares **new value** $f(x_{t+1})$ to **old value** $f(x_t)$ after one GD step.
- We want to show the change is controlled by $\|\nabla f(x_t)\|^2$ and step size $\eta$.
- We want a step-size condition that guarantees descent (objective goes down unless gradient is zero).

In short: prove "GD goes downhill for smooth functions when $\eta$ is small enough."

We now set:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}
$$

and in the smoothness inequality we choose:

$$
{\color{#67E8F9}{x}} = {\color{#67E8F9}{x_t}},\quad
{\color{#67E8F9}{y}} = {\color{#67E8F9}{x_{t+1}}}
$$

So the inequality becomes:

$$
f(x_{t+1})
\le
{\color{#67E8F9}{f(x_t)}}
+
{\color{#FDA4AF}{\nabla f(x_t)^T(x_{t+1}-x_t)}}
+
{\color{#86EFAC}{\frac{L}{2}\|x_{t+1}-x_t\|^2}}
$$

Now compute the two pieces one-by-one.

Step 1: compute the step difference.

$$
{\color{#FDE047}{(x_{t+1}-x_t)}}
=
-{\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}
$$

Step 2: plug this into the red dot-product term.

$$
{\color{#FDA4AF}{\nabla f(x_t)^T(x_{t+1}-x_t)}}
=
{\color{#FDA4AF}{\nabla f(x_t)^T}}\left(-{\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}\right)
=
-{\color{#C4B5FD}{\eta}} \,{\color{#FDA4AF}{\nabla f(x_t)^T\nabla f(x_t)}}
=
-{\color{#C4B5FD}{\eta}} \|{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Why that last equality is true:

$$
{\color{#FDA4AF}{v^T v}} = {\color{#FDA4AF}{\|v\|^2}}
$$

Step 3: plug into the green squared-norm term.

$$
{\color{#86EFAC}{\|x_{t+1}-x_t\|^2}}
=
\| -{\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
=
{\color{#C4B5FD}{\eta^2}}\|{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Why:
- squaring kills the minus sign
- norm scales as $\|a v\|^2 = a^2\|v\|^2$

Step 4: substitute both results back:

$$
f(x_{t+1})
\le
{\color{#67E8F9}{f(x_t)}}
+
{\color{#FDA4AF}{\left(-\eta \|\nabla f(x_t)\|^2\right)}}
+
{\color{#86EFAC}{\left(\frac{L}{2}\eta^2 \|\nabla f(x_t)\|^2\right)}}
$$

This is exactly the line you asked about.

Step 5: combine the red and green terms by factoring $\|\nabla f(x_t)\|^2$:

$$
{\color{#FDA4AF}{\left(-\eta \|\nabla f(x_t)\|^2\right)}}
+
{\color{#86EFAC}{\left(\frac{L}{2}\eta^2\|\nabla f(x_t)\|^2\right)}}
=
{\color{#C4B5FD}{\left(-\eta + \frac{L\eta^2}{2}\right)}}\|\nabla f(x_t)\|^2
$$

Rewrite it as a minus:

$$
{\color{#C4B5FD}{\left(-\eta + \frac{L\eta^2}{2}\right)}}
=
-{\color{#C4B5FD}{\left(\eta - \frac{L\eta^2}{2}\right)}}
$$

So:

$$
f(x_{t+1})
\le
{\color{#67E8F9}{f(x_t)}}
-
{\color{#C4B5FD}{\left(\eta - \frac{L\eta^2}{2}\right)}}\|\nabla f(x_t)\|^2
$$

Step 6: when is this a true decrease?

We want the purple coefficient positive:

$$
{\color{#C4B5FD}{\eta - \frac{L\eta^2}{2}}} > 0
$$

Factor $\eta$:

$$
{\color{#C4B5FD}{\eta\left(1-\frac{L\eta}{2}\right)}} > 0
$$

For $\eta>0$, this means:

$$
{\color{#C4B5FD}{1-\frac{L\eta}{2}}} > 0
\quad\Longleftrightarrow\quad
{\color{#C4B5FD}{\eta < \frac{2}{L}}}
$$

So $\eta \le 1/L$ is a safe common choice.

How to read it quickly:
- red term: descent reward
- green term: overshoot penalty
- purple term: net reward minus penalty

This is the mathematical version of: small enough steps go downhill.

Micro-check:

1. If $\eta = 1/L$, what is $\eta - (L\eta^2)/2$?
	1. 1/2L
2. If $\nabla f(x_t)=0$, what does the inequality say about $f(x_{t+1})$ vs $f(x_t)$?
	- It says f(x_{t+1}) <= f(x_t)... but i guess with the original update equation says f(x_{t+1}) = f(x_t)



## 3) Convergence Rates: What Proofs Are Actually Doing

Goal of this section:
- Understand what convergence-rate proofs are trying to show (not just algebra steps).
- Recognize the two outcomes: sublinear ($O(1/T)$) vs linear/geometric.
- See how telescoping is the main mechanism behind the bounds.

There are two things quizzes love:

1. The *shape* of the proof (how it telescopes)
2. The headline rates ($O(1/T)$ vs linear)

### 3.1 Convex Case: Why You Often Get $O(1/T)$

For convex $f$, a very important inequality is:

$$
{\color{#C4B5FD}{\left(f(x) - f(x^*)\right)}}
\le
{\color{#FDA4AF}{\nabla f(x)^T (x-x^*)}}
$$

This means: the gradient gives you a global supporting hyperplane.

Now pair that with the GD update:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}
$$

and use a squared-distance expansion.

Start with:

$$
\|x_{t+1}-x^*\|^2
=
\|{\color{#67E8F9}{(x_t-x^*)}} - {\color{#C4B5FD}{\eta}}{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Use identity $\|a-b\|^2 = \|a\|^2 - 2a^Tb + \|b\|^2$:

$$
{\color{#67E8F9}{\|x_{t+1}-x^*\|^2}}
=
{\color{#67E8F9}{\|x_t-x^*\|^2}}
-2{\color{#C4B5FD}{\eta}}\,{\color{#FDA4AF}{\nabla f(x_t)^T(x_t-x^*)}}
+{\color{#C4B5FD}{\eta^2}}\|{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Rearrange to isolate the dot product:

$$
{\color{#FDA4AF}{\nabla f(x_t)^T(x_t-x^*)}}
=
\frac{{\color{#67E8F9}{\|x_t-x^*\|^2}} - {\color{#86EFAC}{\|x_{t+1}-x^*\|^2}}}{2{\color{#C4B5FD}{\eta}}}
+
\frac{{\color{#C4B5FD}{\eta}}}{2}\|{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Now combine with convexity gap bound
$f(x_t)-f(x^*) \le \nabla f(x_t)^T(x_t-x^*)$:

$$
{\color{#C4B5FD}{\left(f(x_t)-f(x^*)\right)}}
\le
\frac{{\color{#67E8F9}{\|x_t-x^*\|^2}} - {\color{#86EFAC}{\|x_{t+1}-x^*\|^2}}}{2{\color{#C4B5FD}{\eta}}}
+
\frac{{\color{#C4B5FD}{\eta}}}{2}\|{\color{#FDA4AF}{\nabla f(x_t)}}\|^2
$$

Important reading tip:
- first fraction is the telescoping part
- last term is an extra nonnegative term that must be controlled in the full proof

Many lecture summaries highlight the telescoping skeleton as:

$$
{\color{#C4B5FD}{\left(f(x_t) - f(x^*)\right)}}
\le
\frac{1}{2{\color{#C4B5FD}{\eta}}}
\left(
{\color{#67E8F9}{\|x_t-x^*\|^2}}
-
{\color{#86EFAC}{\|x_{t+1}-x^*\|^2}}
\right)
$$

This is the punchline: the RHS **telescopes** when you sum over $t$.

Very slow telescoping view:

Define

$$
A_t := \|x_t-x^*\|^2.
$$

Then the sum is:

$$
\sum_{t=0}^{T-1}(A_t-A_{t+1})
=
(A_0-A_1)+(A_1-A_2)+\cdots+(A_{T-1}-A_T).
$$

Now watch cancellation:
- $-A_1$ cancels with $+A_1$
- $-A_2$ cancels with $+A_2$
- ...
- all middle terms cancel

Only endpoints remain:

$$
\sum_{t=0}^{T-1}(A_t-A_{t+1}) = A_0-A_T.
$$

Substitute back $A_t=\|x_t-x^*\|^2$:

$$
\sum_{t=0}^{T-1} \left({\color{#67E8F9}{\|x_t-x^*\|^2}} - {\color{#86EFAC}{\|x_{t+1}-x^*\|^2}}\right)
=
{\color{#67E8F9}{\|x_0-x^*\|^2}} - {\color{#86EFAC}{\|x_T-x^*\|^2}}
\le
{\color{#67E8F9}{\|x_0-x^*\|^2}}
$$

So a long sum of per-step terms collapses to just an initial distance term (minus a nonnegative final term).

How this feeds the rate:
- you sum the per-step inequality over $t$
- telescoping collapses the distance sum
- then divide by $T$ to get an average gap with a $1/T$ scale

That is the core engine behind $O(1/T)$-type bounds in the convex smooth case.

### What Exactly Did We Bound?

At a high level, this section bounds the **suboptimality gap**:

$$
f(x_t)-f(x^*).
$$

More precisely, after summing over iterations, we bound the **average gap**:

$$
\frac{1}{T}\sum_{t=0}^{T-1}\big(f(x_t)-f(x^*)\big),
$$

by something that scales like $O(1/T)$ (under the convex smooth assumptions and step-size conditions).

### Why This Is Sublinear $O(1/T)$ (Very Explicit)

The proof structure is:

1. Sum per-step inequalities and telescope.
2. End up with a cumulative bound that looks like

$$
\sum_{t=0}^{T-1}\big(f(x_t)-f(x^*)\big) \le C,
$$

where $C$ depends on initialization/step-size constants, but **not** on $T$.

3. Divide both sides by $T$:

$$
\frac{1}{T}\sum_{t=0}^{T-1}\big(f(x_t)-f(x^*)\big)
\le
\frac{C}{T}.
$$

That right-hand side is exactly the $1/T$ shape.

4. Convert average-gap bound to a best-iterate bound:

$$
\min_{0\le t\le T-1}\big(f(x_t)-f(x^*)\big)
\le
\frac{1}{T}\sum_{t=0}^{T-1}\big(f(x_t)-f(x^*)\big)
\le
\frac{C}{T}.
$$

So at least one iterate in the first $T$ steps has gap at most $C/T$.

Why we call this **sublinear**:
- linear/geometric would look like $(1-c)^T$ (much faster decay),
- here it decays polynomially like $1/T$.

Why this matters:
- it tells you how close your objective values are to optimal,
- and it gives a quantitative "how fast" guarantee as $T$ grows.

Important nuance:
- this section mainly bounds objective gap (function value error),
- not necessarily the iterate distance $\|x_t-x^*\|$ point-by-point.

Micro-check:
1. What cancels when you sum $\|x_t-x^*\|^2 - \|x_{t+1}-x^*\|^2$ from $t=0$ to $T-1$?
	- We end up going ((x_0 - x*) - (x_{1} - x*)) + ((x_1 - x*) - (x_{2} - x*)) + ... + ((x_n-1 - x*) - (x_{n} - x*)) = ||x_0 - x*||^2 - ||x_{T-1} - x*||^2


### 3.2 Strongly Convex Case: Why You Get Linear Convergence
Goal of this subsection:
- Understand what extra power strong convexity gives beyond plain convexity.
- See why error now shrinks by a constant factor each iteration.
- Connect $\mu$, $L$, and step size to the geometric-rate factor.

Strong convexity gives a lower-curvature inequality:

$$
{\color{#C4B5FD}{\left(f(x) - f(x^*)\right)}}
\ge
{\color{#86EFAC}{\frac{\mu}{2}\|x-x^*\|^2}}
$$

Interpretation:
- in plain convexity, function can be very flat near optimum,
- in strongly convex functions, being distance $r$ away costs at least on the order of $r^2$.

To get linear convergence, we use both:
1. $L$-smoothness (upper curvature control),
2. $\mu$-strong convexity (lower curvature control),
3. GD with a suitable fixed step size (commonly $\eta \le 1/L$).

Under this setup, one gets a contraction (distance form):

$$
{\color{#67E8F9}{\|x_{t+1}-x^*\|^2}}
\le
{\color{#C4B5FD}{(1-c)}}{\color{#67E8F9}{\|x_t-x^*\|^2}},
\quad 0<c<1
$$

What this means in plain language:
- Let $d_t := \|x_t-x^*\|$ be "how far we are from optimum."
- The contraction statement says each step shrinks distance by a fixed fraction:

$$
{\color{#67E8F9}{d_{t+1}}}
\le
{\color{#C4B5FD}{q}}{\color{#67E8F9}{d_t}},
\quad 0<q<1.
$$

- Squared-distance version is exactly the same fact written as:

$$
{\color{#67E8F9}{d_{t+1}^2}}
\le
{\color{#C4B5FD}{q^2}}{\color{#67E8F9}{d_t^2}},
\quad\text{and set }1-c:=q^2.
$$

So "contraction with distance form" just means: the distance-to-optimum sequence gets multiplied by a constant less than 1 every iteration.

Quick 1D sanity check (why this is reasonable):
- Suppose locally $f(x)=\frac{a}{2}x^2$ with curvature $a\in[\mu,L]$, optimum at $x^*=0$.
- GD is $x_{t+1}=x_t-\eta a x_t=(1-\eta a)x_t$.
- So distance satisfies:

$$
|x_{t+1}-x^*|
=
|1-\eta a|\,|x_t-x^*|.
$$

- If $0<\eta<2/L$, then $|1-\eta a|<1$ for all $a\in[\mu,L]$, which is exactly a contraction.

where $c$ increases with problem curvature and often scales with $\mu/L$ (up to constants under common step choices).

Where this contraction comes from (proof sketch):

Define the error vector:

$$
e_t := x_t - x^*.
$$

GD update:
$$
x_{t+1} = x_t - \eta \nabla f(x_t)
$$

and $\nabla f(x^*)=0$, so:
$$
e_{t+1}
=
e_t - \eta\big(\nabla f(x_t)-\nabla f(x^*)\big).
$$

For smooth twice-differentiable intuition (same conclusion extends more generally), write:

$$
\nabla f(x_t)-\nabla f(x^*) = H_t e_t,
$$

where

$$
H_t := \int_0^1 \nabla^2 f(x^*+s e_t)\,ds.
$$

Strong convexity + smoothness imply:

$$
\mu I \preceq H_t \preceq L I.
$$

So:

$$
e_{t+1} = (I-\eta H_t)e_t.
$$

Take norms:

$$
\|e_{t+1}\| \le \|I-\eta H_t\|\,\|e_t\|.
$$

If eigenvalues of $H_t$ are in $[\mu,L]$, then eigenvalues of $(I-\eta H_t)$ are in
$[1-\eta L,\;1-\eta\mu]$.
Hence:

$$
\|I-\eta H_t\| \le q
\quad\text{with}\quad
q := \max\{|1-\eta\mu|,\;|1-\eta L|\}.
$$

If $0<\eta<2/L$, then $q<1$, so:

$$
\|e_{t+1}\| \le q\|e_t\|
\quad\Longrightarrow\quad
\|e_{t+1}\|^2 \le q^2\|e_t\|^2.
$$

This is exactly the contraction form (set $1-c=q^2$).

Equivalent function-gap contraction form (same geometric idea):

$$
f(x_{t+1})-f(x^*)
\le
(1-c)\big(f(x_t)-f(x^*)\big).
$$

Now unroll slowly:

$$
{\color{#67E8F9}{\|x_1-x^*\|^2}}
\le
{\color{#C4B5FD}{(1-c)}}{\color{#67E8F9}{\|x_0-x^*\|^2}}
$$

$$
{\color{#67E8F9}{\|x_2-x^*\|^2}}
\le
{\color{#C4B5FD}{(1-c)}}{\color{#67E8F9}{\|x_1-x^*\|^2}}
\le
{\color{#C4B5FD}{(1-c)^2}}{\color{#67E8F9}{\|x_0-x^*\|^2}}
$$

Keep repeating:

$$
{\color{#67E8F9}{\|x_T-x^*\|^2}}
\le
{\color{#C4B5FD}{(1-c)^T}}{\color{#67E8F9}{\|x_0-x^*\|^2}}
$$

So each iteration multiplies error by the same factor $(1-c)$.
That is exactly geometric (linear) convergence.

What is being bounded here (vs Section 3.1):
- Section 3.1 emphasized average/best-iterate suboptimality with $O(1/T)$ shape.
- Section 3.2 gives pointwise geometric decay (e.g., last-iterate distance/gap shrinks like $(1-c)^T$).

Condition-number intuition:
- define $\kappa := L/\mu$,
- better-conditioned problems (smaller $\kappa$) usually have larger $c$ and faster convergence.

Micro-check:

1. In plain English, what does $(1-c)^T$ do as $T$ grows?
	1. because (1-c) < 1, it decays to zero as (1-c)^T grows...


## 4) Optimality Conditions (What It Means To Be “Done”)

Goal of this section:
- Learn how to formally check "am I at an optimum?" in smooth, non-smooth, and constrained settings.
- Connect $\nabla f(x^*)=0$, $0 \in \partial f(x^*)$, and KKT to one common idea: no feasible first-order descent direction.

What this section gets you:
- A checklist for which optimality condition to apply in each problem type.
- A clear interpretation of KKT pieces so they are not just memorized symbols.

### 4.1 Unconstrained, Differentiable

If $f$ is differentiable and $x^*$ is a local minimum, then:

$$
{\color{#FDA4AF}{\nabla f(x^*)}} = 0
$$

If $f$ is convex, this is not just necessary; it's sufficient for global optimality.

### 4.2 Unconstrained, Non-smooth (Subgradient Optimality)

When $f$ is convex but may not be differentiable, gradients may not exist, so we use subgradients.

The clean optimality condition becomes:

$$
0 \in {\color{#FDA4AF}{\partial f(x^*)}}
$$

Meaning: "there exists a subgradient at $x^*$ that equals zero."

This is the non-smooth version of $\nabla f(x^*)=0$.

### 4.3 Constrained Problems (First-Order Condition)

What is a convex feasible set?
- The feasible set is the set of all points that satisfy constraints:
$$
C := \{x : g_i(x)\le 0,\; h_j(x)=0\}.
$$

- A set $C$ is convex if:
$$
\forall x_1,x_2\in C,\;\forall \theta\in[0,1],\quad
\theta x_1 + (1-\theta)x_2 \in C.
$$

Plain-English meaning:
- If two points are feasible, then every point on the straight line segment between them is also feasible.

Quick examples of convex feasible sets:
- interval/box constraints (like $0\le x_i \le 1$),
- ball constraints (like $\|x\|_2 \le R$),
- half-spaces (like $a^Tx \le b$),
- intersections of convex constraints (still convex).

Quick non-example:
- Two disconnected feasible regions are usually not convex (the line between one point in each region leaves the feasible set).

Why this matters for optimization proofs:
- In first-order arguments we often move from $x^*$ toward another feasible point $x$ using
  $x_\tau = x^*+\tau(x-x^*)$.
- Convexity of $C$ guarantees this entire segment stays feasible, which is exactly what makes the "no feasible descent direction" argument work.

For convex $f$ and convex feasible set $C$, one common first-order condition is:

$$
\langle {\color{#FDA4AF}{\nabla f(x^*)}}, {\color{#86EFAC}{x - x^*}} \rangle \ge 0
\quad \text{for all } x \in C
$$

Interpretation:
- any feasible direction you try to move in has nonnegative first-order change
- so there is no feasible downhill direction

Equivalent geometric language:

$$
{\color{#FDA4AF}{\nabla f(x^*)}} \in N_C(x^*)
$$

where $N_C(x^*)$ is the normal cone of $C$ at $x^*$.
So at an optimum, the gradient can point "outward" normal to the feasible set boundary; it does not need to be zero.

Why this condition works (short proof idea):

1) Necessity (why must it hold at optimum?):
- Suppose there were some feasible $x \in C$ with
  $\nabla f(x^*)^T(x-x^*) < 0$.
- Since $C$ is convex, points on the segment
  $x_\tau := x^*+\tau(x-x^*)$ stay feasible for small $\tau\in(0,1)$.
- First-order expansion gives
  $f(x_\tau) \approx f(x^*) + \tau \nabla f(x^*)^T(x-x^*) < f(x^*)$,
  which contradicts optimality of $x^*$.

2) Sufficiency (why is it enough in convex problems?):
- Convexity gives, for any feasible $x$,
  $f(x) \ge f(x^*) + \nabla f(x^*)^T(x-x^*)$.

- If the first-order condition says
  $\nabla f(x^*)^T(x-x^*) \ge 0$ for all $x\in C$,
  then $f(x)\ge f(x^*)$ for all feasible $x$.

- So $x^*$ is a global minimizer over $C$.


### 4.4 KKT Conditions (Very Slow, From Basics)
Goal of this subsection:
- Start from zero: what Lagrange multipliers are and why they appear.
- Build KKT step-by-step instead of memorizing 4 lines.
- Learn a practical solve recipe for quiz problems.

Setup:
$$
\min_x {\color{#67E8F9}{f(x)}}
\quad \text{s.t. } g_i(x)\le 0,\; h_j(x)=0.
$$

#### 4.4.1 First: Why Lagrange Multipliers Exist (Equality Case)

Start with only an equality constraint:
$$
\min_x f(x)\quad \text{s.t. } h(x)=0.
$$

Unconstrained memory:
- If there were no constraints, optimum often satisfies $\nabla f(x^*)=0$.

What changes with constraints?
- You are not allowed to move in every direction.
- You can only move along directions that keep $h(x)=0$ true (locally, the tangent directions).

At a constrained optimum:
- there should be no feasible first-order descent direction.
- Geometrically, this implies $\nabla f(x^*)$ must be normal to the feasible surface.
- For one equality constraint, that normal direction is $\nabla h(x^*)$.

So gradients must align:
$$
\nabla f(x^*) + \nu^* \nabla h(x^*) = 0.
$$
That scalar $\nu^*$ is a Lagrange multiplier.

This is exactly stationarity of:
$$
\mathcal{L}(x,\nu)=f(x)+\nu h(x).
$$

Tiny equality-only example:
$$
\min_{x,y} x^2+y^2 \quad \text{s.t. } x+y-1=0.
$$
Lagrangian:
$$
\mathcal{L}(x,y,\nu)=x^2+y^2+\nu(x+y-1).
$$
Stationarity:
$$
2x+\nu=0,\qquad 2y+\nu=0.
$$
Constraint:
$$
x+y=1.
$$
From first two equations: $x=y$. With $x+y=1$, get $x=y=\tfrac12$, and $\nu=-1$.

#### 4.4.2 Add Inequalities: Why KKT Needs Extra Rules
Now include $g_i(x)\le 0$ constraints.

Build full Lagrangian:
$$
\mathcal{L}(x,\lambda,\nu)
=
f(x)+\sum_i \lambda_i g_i(x)+\sum_j \nu_j h_j(x).
$$

Sign rules:
- $\lambda_i\ge0$ for inequalities (min problem with $g_i\le0$ form).
- $\nu_j$ are free for equalities (can be positive or negative).

Why $\lambda_i\ge0$?
- If $g_i(x)>0$ means violation, a nonnegative $\lambda_i$ makes $\lambda_i g_i(x)$ increase the Lagrangian pressure against violation.

Why complementary slackness?
$$
\lambda_i^* g_i(x^*)=0.
$$
- If a constraint is inactive ($g_i(x^*)<0$), it should not push, so $\lambda_i^*=0$.
- If multiplier is positive, the constraint must be active ($g_i(x^*)=0$).

#### 4.4.3 The KKT Conditions (Final Form)

1. Primal feasibility:
$$
g_i(x^*)\le 0,\quad h_j(x^*)=0.
$$

2. Dual feasibility:
$$
\lambda_i^* \ge 0.
$$

3. Stationarity:
$$
\nabla f(x^*)+\sum_i \lambda_i^*\nabla g_i(x^*)+\sum_j \nu_j^*\nabla h_j(x^*)=0.
$$

4. Complementary slackness:
$$
\lambda_i^* g_i(x^*)=0,\quad \forall i.
$$

Interpretation in one sentence:
- objective gradient is balanced by active-constraint normals, with valid signs, at a feasible point.

#### 4.4.4 How You Actually Solve for Multipliers (Recipe)

1. Rewrite all inequalities as $g_i(x)\le0$.
2. Build $\mathcal{L}(x,\lambda,\nu)$.
3. Write stationarity equations.
4. Write primal/dual feasibility.
5. Use complementary slackness to do active-set case splits:
- active constraint: $g_i(x)=0$,
- inactive constraint: $\lambda_i=0$.
6. Solve each case and keep only feasible solutions with $\lambda_i\ge0$.
7. In convex problems, valid KKT point is global optimum (with regularity like Slater).

#### 4.4.5 Worked 1D Case-Split Example

Problem:
$$
\min_x x^2 \quad \text{s.t. } x\ge 1.
$$
Rewrite inequality as $g(x)=1-x\le0$.

Lagrangian:
$$
\mathcal{L}(x,\lambda)=x^2+\lambda(1-x),\quad \lambda\ge0.
$$

Stationarity:
$$
2x-\lambda=0.
$$

Complementary slackness:
$$
\lambda(1-x)=0.
$$

Case A (inactive): $\lambda=0$.
- Then stationarity gives $x=0$.
- Check feasibility: need $x\ge1$, so this fails.

Case B (active): $1-x=0\Rightarrow x=1$.
- Then stationarity gives $\lambda=2$.
- Check dual feasibility: $\lambda=2\ge0$ yes.

So:
$$
x^*=1,\quad \lambda^*=2.
$$

When is KKT enough to certify global optimality?
- Convex $f$, convex $g_i$, affine $h_j$, and regularity (e.g., Slater) $\Rightarrow$ KKT is necessary and sufficient.
- Nonconvex problems: KKT is usually necessary (under regularity), but not sufficient for global minimum.

Micro-check:

1. If a constraint has $g_i(x^*) < 0$ (strictly inactive), what must $\lambda_i$ be?
	1. 

## 5) Subgradients: Gradients for Non-smooth Convex Functions

Goal of this section:
- Understand what replaces gradients when functions have kinks.
- Build intuition for subgradient inequalities and the $|x|$ example.
- Learn the high-yield rules used in max-type objectives.

What this section gets you:
- A geometric picture for subgradients as global underestimators.
- Fast recognition of valid vs invalid subgradients in common examples.

### 5.1 Definition (Read This Slowly)

$g$ is a subgradient of convex $f$ at $x$ if for all $y$:

$$
f(y)
\ge
{\color{#67E8F9}{f(x)}}
+
{\color{#FDA4AF}{g^T (y-x)}}
$$

This means the line/plane $f(x) + g^T(y-x)$ sits *below* the function everywhere.

### 5.2 The Canonical Example: $f(x)=|x|$

- For $x>0$, a subgradient is $g=1$.
- For $x<0$, a subgradient is $g=-1$.
- At $x=0$, any $g \in [-1,1]$ is a valid subgradient.

This matches the picture: at the kink, there are many supporting lines.

Micro-check:

1. Give one valid subgradient at $x=0$ for $|x|$.
2. Why is $g=2$ not valid at $x=0$?

### 5.3 Useful Subgradient Rules (High Yield)

If $f(x) = \max_k f_k(x)$ and each $f_k$ is convex:

- at a point where a single $f_{k^*}$ uniquely achieves the max, you can use $\nabla f_{k^*}(x)$ as a subgradient
- if multiple are tied, any convex combination of their gradients is a subgradient

This is why hinge loss and max-type objectives are manageable.

## 6) Subgradient Method: The Workhorse for Non-smooth Convex Problems

Goal of this section:
- Learn the update rule for non-smooth convex optimization.
- Understand why per-iteration descent is not guaranteed.
- Track the expected convergence headline and how it compares to smooth GD.

What this section gets you:
- The right expectation for behavior (noisy/non-monotone but convergent in aggregate).
- A clean comparison: smooth GD rates vs subgradient rates.

Update:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{g_t}},
\quad {\color{#FDA4AF}{g_t}} \in \partial f(x_t)
$$

### 6.1 The Key Surprise: Not Always Descent

With GD, $-\nabla f(x_t)$ is a descent direction for smooth functions (with small steps).

With subgradients, $-g_t$ might not decrease $f$ right away. The lecture notes even emphasize this.

So analysis often focuses on:

- the **best iterate** so far, or
- the **average** of iterates, not the last one

### 6.2 Typical Convergence Headline

For convex $f$ with bounded subgradients ($\|g_t\| \le G$) and a good step-size schedule, you typically get:

$$
{\color{#C4B5FD}{\left(f(x_{\text{best}}) - f(x^*)\right)}}
=
O\left(\frac{1}{\sqrt{T}}\right)
$$

Meaning: slower than smooth GD, but works in non-smooth settings.

Micro-check:

1. Which is faster as $T$ grows: $1/T$ or $1/\sqrt{T}$?

## 7) Projection: How to Handle Constraints

Goal of this section:
- Learn how projection enforces feasibility after an unconstrained step.
- Understand the projected (sub)gradient update structure.
- Recognize the one projection inequality that appears in proofs.

What this section gets you:
- Confidence in handling constrained updates without breaking feasibility.
- One projection identity you can reuse in nearly every constrained proof.

### 7.1 Projection Definition

Given a closed convex set $C$, the Euclidean projection is:

$$
{\color{#86EFAC}{\Pi_C}}(y) = \arg\min_{x \in {\color{#86EFAC}{C}}} \|x-y\|
$$

Interpretation: "closest feasible point to $y$."

### 7.2 Projected (Sub)Gradient Method

If you need $x_t \in C$ always, do:

$$
{\color{#FDE047}{y_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{g_t}},
\quad
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#86EFAC}{\Pi_C}}({\color{#FDE047}{y_{t+1}}})
$$

This is exactly "take a step, then snap back to feasibility."

### 7.3 The One Projection Property Used in Proofs

If $x_{t+1} = \Pi_C(y_{t+1})$, then for all $x \in C$:

$$
\langle
{\color{#FDE047}{y_{t+1} - x_{t+1}}},
{\color{#86EFAC}{x - x_{t+1}}}
\rangle \le 0
$$

This is the "projection makes an obtuse angle with any feasible direction" fact.

It's the constrained analog of the telescoping distance identity used in unconstrained proofs.

Micro-check:

1. If $y_{t+1}$ is already in $C$, what is $\Pi_C(y_{t+1})$?

## 8) Stochastic Gradient (SGD): When Data Is Big

Goal of this section:
- Understand why SGD is used instead of full gradient in large-data settings.
- See SGD as "cheap noisy gradient" and identify the speed-vs-noise tradeoff.
- Connect constant vs decaying step size to convergence behavior near optima.

What this section gets you:
- A practical mental model for why SGD is fast early but noisy late.
- A clear reason learning-rate schedules are central, not optional.

### 8.1 Why SGD Exists

In ML, your objective is often:

$$
{\color{#67E8F9}{f(x)}}
=
\frac{1}{n}\sum_{i=1}^n {\color{#FDE047}{\ell_i(x)}}
$$

Computing $\nabla f(x)$ costs $O(n)$ per step.

SGD uses one sample (or mini-batch) to approximate it cheaply.

### 8.2 The SGD Update

Pick a random index $i_t$ and compute:

$$
{\color{#FDE047}{g_t}}
=
\nabla {\color{#FDE047}{\ell_{i_t}(x_t)}}
$$

Then:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDE047}{g_t}}
$$

### 8.3 The Noise Tradeoff (Why It Feels “Jittery”)

Even if on average $g_t$ points the right way, each individual $g_t$ is noisy.

So:

- SGD moves fast initially (cheap steps)
- but it can jitter near the optimum unless you decay $\eta_t$

This is why learning rate schedules are not "just a detail"; they're core.

Micro-check:

1. Why might SGD fail to settle exactly at the optimum with a constant step size?

## 9) What To Memorize for a Quiz (and What Not To)

Goal of this section:
- Separate must-memorize formulas from proof patterns to understand.
- Prioritize recall items that give the biggest quiz payoff.

What this section gets you:
- A high-signal memorization list with minimal fluff.
- A short map of proof templates to recognize under pressure.

Memorize these update rules:

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{\nabla f(x_t)}}
$$

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{g_t}},
\quad {\color{#FDA4AF}{g_t}} \in \partial f(x_t)
$$

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#86EFAC}{\Pi_C}}\!\left({\color{#67E8F9}{x_t}} - {\color{#C4B5FD}{\eta_t}}{\color{#FDA4AF}{g_t}}\right)
$$

$$
{\color{#67E8F9}{x_{t+1}}}
=
{\color{#67E8F9}{x_t}}
-
{\color{#C4B5FD}{\eta_t}}{\color{#FDE047}{\nabla \ell_{i_t}(x_t)}}
$$

Memorize these optimality conditions:

$$
{\color{#FDA4AF}{\nabla f(x^*)}} = 0
$$

$$
0 \in {\color{#FDA4AF}{\partial f(x^*)}}
$$

Understand (don’t memorize blindly) these proof patterns:

- smoothness inequality + plug-in step
- squared-distance expansion + convexity bound
- telescoping sums

## 10) Micro-Checks (If You Can Do These, You’re Not Lost)

Goal of this section:
- Quickly diagnose whether core concepts are stable in your head.
- Surface weak spots early so you can review before the quiz.

What this section gets you:
- A rapid readiness check before quiz time.
- A concrete set of gaps to target in your next review loop.

1. In one sentence, what does the step size $\eta_t$ control?
	1. how much you move in the direction...

2. For $f(x)=\tfrac{1}{2}x^2$, write the GD update and describe what happens when $0<\eta<2$.
	1. grad_f = x, so GD update would be x_{t+1} = x_t - n x x_t... = (1-n)x_t
		1. so it's gonna keep going down towards zero...

3. State the definition of a subgradient in one inequality. 
	1. sub_gr(x) 
		1. f(y) >= f(x) + g^T (y-x) for all y
		2. g s.th. f(y) >= f(x) + g^T (y-x) for all y
		3. g s.th. f(y) >= f(x) + g^T (y-x) for all y

4. What is $\partial |x|$ at $x=0$?
	1. [ -1, 1]

5. Write the projected subgradient update in two lines.
	1. y_t = x_t - n_t * g_t
	2. x_{t+1} = pi_c(y_{t+1}) (move it to the closest point in constraint set C)

7. In one sentence, what does projection do?
	1. It takes a point, and moves it to the closest point that also meets some given constraint set C

8. Give one optimality condition for convex, non-smooth, unconstrained minimization.
	1. zero in partial_deriv(x*)


9. Which converges faster: $1/T$ or $1/\sqrt{T}$, and where do they typically show up?
	1. 1/T converges faster... shows up for smooth convex settings
	2. 1/sqrt(t): non-smooth subgradient method (and noisy stochastic regimes)

## References (Course Transcripts You Already Have)

- GD: `materials/processed/optimization-for-ml/Jan29_GD.md`
- Subgradients: `materials/processed/optimization-for-ml/Feb5_subgradients.md`
- Subgradient method: `materials/processed/optimization-for-ml/Feb10_subgradient-method.md`
- Projected subgradient: `materials/processed/optimization-for-ml/Feb12-projected-subgradient.md`

Note: We have not yet ingested transcripts for the course lectures titled "Optimality Conditions" and "Stochastic Gradient". This mini-textbook covers the standard versions that nearly all optimization courses teach. If you have those PDFs, ingesting them will let us match the instructor’s exact notation and emphasis.
