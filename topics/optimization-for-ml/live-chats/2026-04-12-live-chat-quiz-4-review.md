# Optimization for ML Live Chat: Quiz 4 Review (2026-04-12)

## Scope

This live chat is for one-question-at-a-time review of:

- [topics/optimization-for-ml/lessons/2026-04-12-quiz-4-study-guide-newton-ica-adaptive-methods.md](2026-04-12-quiz-4-study-guide-newton-ica-adaptive-methods.md)
- [materials/processed/optimization-for-ml/March24_SDP.md](../../../materials/processed/optimization-for-ml/March24_SDP.md)
- [materials/processed/optimization-for-ml/March26_Newton_method.md](../../../materials/processed/optimization-for-ml/March26_Newton_method.md)
- [materials/processed/optimization-for-ml/March31_April2_ICA.md](../../../materials/processed/optimization-for-ml/March31_April2_ICA.md)
- [materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md](../../../materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md)
- [materials/processed/optimization-for-ml/April7_EXTRA_AcceleratedGD_Theory.md](../../../materials/processed/optimization-for-ml/April7_EXTRA_AcceleratedGD_Theory.md)

## Session Controls

- Mode: `mixed`
- Style: `short-answer, exact-formula, quiz-style`
- Difficulty: `matched to prior mini quizzes`
- Pacing: `one question at a time`

## Transcript

---
### Turn 1
User asked:
can you make an interactive question .md file, where we go review the topcis one question at a time (like a live chat)

Assistant response:
Created this live-chat review file for Quiz 4 topics. We’ll go one question at a time in quiz style and keep the session mirrored here.

Question 1:

State the primal SDP and the dual SDP in the standard form from lecture.

Keep it to `2-6` lines total.

---
### Turn 2
User asked:
/Users/saahith/Downloads/IMG_7385.heic

Assistant response:
I could not open `HEIC` directly in the image tool, so I converted it locally to PNG and viewed the converted image instead.

---
### Turn 3
User asked:
can you convert urself?

Assistant response:
Yes. I converted the image locally and viewed the PNG version so I could read the written answer.

---
### Turn 4
User asked:
[image of handwritten SDP primal/dual answer]

Assistant response:
Your answer is essentially correct.

A clean exam version is:

$$
\text{Primal: } \min_X C \bullet X \quad \text{s.t. } A_i \bullet X = b_i,\; i=1,\dots,m,\; X \succeq 0
$$

$$
\text{Dual: } \max_{y,S} y^T b \quad \text{s.t. } S = C - \sum_{i=1}^m y_i A_i,\; S \succeq 0
$$

Main fix: make sure you explicitly keep the dual variables as `(y, S)` and write the PSD constraints as `X \succeq 0` and `S \succeq 0`.

Question 2:

What does `X \succeq 0` mean? Give the clean mathematical definition, not an intuition.

---
### Turn 5
User asked:
it means for any vector v, v^T X v >= 0

Assistant response:
Correct.

The clean definition is:

$$
X \succeq 0 \iff v^T X v \ge 0 \quad \forall v \in \mathbb{R}^n
$$

If you want to be maximally precise on a quiz, also remember that in this lecture PSD matrices are taken to be symmetric.

Question 3:

State the Schur complement condition from lecture for

$$
X = \begin{pmatrix} A & B \\ B^T & C \end{pmatrix}.
$$

Just write the equivalence.

---
### Turn 6
User asked:
/Users/saahith/Downloads/IMG_7386.HEIC how is this?

Assistant response:
Mostly right.

The clean lecture statement is

$$
\begin{pmatrix} A & B \\ B^T & C \end{pmatrix} \succeq 0
\iff
\Big( A \succeq 0 \text{ and } C - B^T A^{-1} B \succeq 0 \Big).
$$

Main note: for the quiz, write the block-matrix condition explicitly. Your extra side note about a zero diagonal implying a zero row/column is also a true PSD fact from the lecture, but it is a different fact than the Schur complement statement.

Question 4:

State weak duality for SDP in one line, including the gap identity.

---
### Turn 7
User asked:
it would be that C * X >= b^Ty, right?

Assistant response:
Yes, that is the right inequality, but for quiz quality you should give the exact gap identity:

$$
C \bullet X - y^T b = S \bullet X \ge 0
$$

for primal-feasible $X$ and dual-feasible $(y,S)$.

That is better than only writing

$$
C \bullet X \ge y^T b
$$

because it shows where the inequality comes from.

More explicitly:

- the primal-dual gap is

$$
C \bullet X - y^T b
$$

- and the lecture identity is that this gap equals

$$
S \bullet X
$$

where

$$
S = C - \sum_{i=1}^m y_i A_i.
$$

Then weak duality follows from the PSD fact that if $S \succeq 0$ and $X \succeq 0$, then

$$
S \bullet X \ge 0.
$$

Question 5:

What is the Newton update for unconstrained minimization?

---
### Turn 8
User asked:
wait going back to q4, is the identity that the gap is equal to the quantity S * X?

Assistant response:
Yes.

That is exactly the identity:

$$
C \bullet X - y^T b = S \bullet X
$$

where

$$
S = C - \sum_{i=1}^m y_i A_i.
$$

Then weak duality follows because if $X \succeq 0$ and $S \succeq 0$, the lecture proved that

$$
S \bullet X \ge 0.
$$

So the logic is:

1. the gap is $C \bullet X - y^T b$
2. substitute the primal constraints $A_i \bullet X = b_i$
3. regroup to get $S \bullet X$
4. conclude nonnegativity from the PSD inner-product theorem

---
### Turn 9
User asked:
is it x_n+1 = x_n - f(x)/f'(x)?

Assistant response:
That is the scalar Newton update for `root finding`, not the unconstrained minimization update.

For unconstrained minimization, the Newton step is

$$
\Delta x = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),
$$

so the update is

$$
x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

The distinction is:

- root finding solves $\phi(x)=0$, so it uses $\phi(x)/\phi'(x)$
- minimization solves $\nabla f(x)=0$, so it applies Newton to the gradient and therefore uses the Hessian

Question 6:

Why is the Newton step a descent direction when the Hessian is positive definite?

---
### Turn 10
User asked:
wait for minimization, lemme give it... is it x_{n+1} = x_n - [\nabla^2f(x_n)]^-1 * \nabla*f(x_n)

Assistant response:
Yes. That is the right Newton update for unconstrained minimization:

$$
x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

That is the exam version you should memorize.

---
### Turn 11
User asked:
because if the hessian is positive definite, then the inverse is also positive definite, so then you write - \nabla f(x) ([H^-1] \nabla f(x)) which is then going to be negative, so you know it makes an obtuse angle with the gradient, so you know it's a decent direction

Assistant response:
Yes. That is the correct argument.

The clean quiz version is:

$$
\Delta x = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
$$

and if $\nabla^2 f(x_k) \succ 0$, then $[\nabla^2 f(x_k)]^{-1} \succ 0$ as well. Therefore

$$
\nabla f(x_k)^T \Delta x
= - \nabla f(x_k)^T[\nabla^2 f(x_k)]^{-1}\nabla f(x_k) < 0,
$$

so the Newton step has negative inner product with the gradient and is therefore a descent direction.

Question 7:

State the local convergence rate of Newton's method, and say in one phrase whether it is local or global.

---
### Turn 12
User asked:
I believe the convergence rate is quadratic... so ||x_{k+1} - x*||^2 <= C ||x_k - x*||... is that right?

Assistant response:
Almost. The idea `quadratic` is right, but the inequality should be

$$
\|x_{k+1}-x^*\| \le C \|x_k-x^*\|^2
$$

not with the square on the left.

And the scope statement is:

`Newton has local quadratic convergence, not global convergence.`

Question 8:

What does whitening do ju ICA? Reply in 1-3 sentences.

---
### Turn 13
User asked:
ok so newton's convergence is ||x_{k+1} - x*||_2 <= C ||x_k - x*||^2_2?

Assistant response:
Yes. That is the right form for the local quadratic convergence statement:

$$
\|x_{k+1}-x^*\|_2 \le C \|x_k-x^*\|_2^2.
$$

What matters most is:

- no square on the left
- square on the right
- it is a `local` statement, not a global one

---
### Turn 14
User asked:
whitening basically makes the data vector have identity as covariance (so E[z^t z] = I

Assistant response:
Yes, that is the core point.

A slightly cleaner quiz answer is:

`Whitening transforms the observed data so the covariance becomes the identity, i.e. $E[zz^T] = I$. This removes second-order correlations and reduces the remaining ICA search to an orthogonal transformation.`

Question 9:

What is the difference between PCA and ICA? Keep it to 2-4 sentences.

---
### Turn 15
User asked:
just fyi, please put the responses in the markdown file too...

Assistant response:
Yes. I’ll keep mirroring the responses into the live-chat markdown file as we go.

---
### Turn 16
User asked:
PCA works on decorrelating, but ICA tries to separate into independent source signals...

Assistant response:
Yes. That is the core distinction.

A clean quiz version is:

`PCA finds orthogonal directions that decorrelate the data and explain variance, but it does not generally recover independent sources. ICA goes further and tries to find components that are statistically independent, which is why it is used for source separation.`

Question 10:

In the FastICA setup, what are the dimensions of $z$, $w$, and $y = w^T z$?

---
### Turn 17
User asked:
nx1, nx1, 1?

Assistant response:
Yes, assuming the ambient dimension is `n`.

A clean answer is:

- $z \in \mathbb{R}^n$
- $w \in \mathbb{R}^n$
- $y = w^T z \in \mathbb{R}$

So in column-vector notation, `n x 1`, `n x 1`, and scalar.

Question 11:

What objective is FastICA optimizing in the lecture, and what constraint is imposed on $w$?

---
### Turn 18
User asked:
please add response to markdown, ty

Assistant response:
Added. I’ll keep appending each review exchange to the live-chat markdown as we go.

---
### Turn 19
User asked:
constraint is ||w||_2 = 1... the objective is that we're trying to maximize is kurtosis or E[y^4] - 3

Assistant response:
Correct.

The clean quiz version is:

- objective:

$$
f(w) = \kappa_4(y) = E[y^4] - 3
$$

- constraint:

$$
\|w\|_2 = 1
$$

or equivalently

$$
\|w\|_2^2 - 1 = 0.
$$

Question 12:

What is the Lagrange first-order condition in the FastICA derivation?

---
### Turn 20
User asked:
4 E[(w^tz)^3 z] + 2*lambda*w = 0

Assistant response:
Correct. The lecture's first-order condition is

$$
4E[(w^T z)^3 z] + 2\lambda w = 0.
$$

That is the nonlinear equation that the lecture then solves using Newton-Raphson.

Question 13:

What is the final FastICA fixed-point update?

---
### Turn 21
User asked:
E[(w^Tz)^3z] - 3w

Assistant response:
That is the core unnormalized update. For full quiz credit, include the normalization step too:

$$
\tilde w^{(k+1)} = E[(w^{(k)T}z)^3 z] - 3 w^{(k)}
$$

$$
w^{(k+1)} = \frac{\tilde w^{(k+1)}}{\|\tilde w^{(k+1)}\|}.
$$

The first line is the fixed-point/Newton-derived update, and the second line enforces the unit-norm constraint.

Question 14:

Write Polyak momentum and NAG, and say the difference in one sentence.

---
### Turn 22
User asked:
/Users/saahith/Downloads/IMG_7387.HEIC NAG basically does the same thing, but it sets the velocity using the gradient at the look-ahead point rather than the current point

Assistant response:
Yes. That is the right conceptual distinction.

The clean lecture formulas are:

Polyak momentum:

$$
v_t = \gamma v_{t-1} + \eta \nabla F(x_t),
\qquad
x_{t+1} = x_t - v_t
$$

equivalently

$$
x_{t+1} = x_t - \eta \nabla F(x_t) + \gamma(x_t - x_{t-1}).
$$

NAG:

$$
v_t = \gamma v_{t-1} + \eta \nabla F(x_t - \gamma v_{t-1}),
\qquad
x_{t+1} = x_t - v_t
$$

equivalently

$$
x_{t+1} = x_t - \eta \nabla F(x_t + \gamma(x_t - x_{t-1})) + \gamma(x_t - x_{t-1}).
$$

One-sentence difference:

`NAG evaluates the gradient at a look-ahead point, whereas Polyak momentum evaluates it at the current point.`

Question 15:

What is the convex smooth convergence rate of NAG? State the converging quantity too.

---
### Turn 23
User asked:
/Users/saahith/Downloads/IMG_7388.heic here it is

Assistant response:
You have the right converging quantity:

$$
f(x_k) - f(x^*)
$$

But the convex smooth NAG rate should be expressed in terms of `k`, not in terms of $\|x_k - x^*\|^2 / 2$.

The clean lecture statement is:

$$
f(x_k) - f(x^*) = O\left(\frac{\beta \|x_0 - x^*\|^2}{k^2}\right).
$$

So the important ingredients are:

- quantity: function-value suboptimality
- assumptions: convex and $\beta$-smooth
- rate: $O(1/k^2)$

Question 16:

What is the strongly convex smooth convergence rate of NAG?

---
### Turn 24
User asked:
wait for the nag update, do we not use the eta learning rate value for the update?

Assistant response:
We do.

The learning rate $\eta$ is still part of the NAG update:

$$
x_{t+1} = x_t - \eta \nabla F(x_t + \gamma(x_t - x_{t-1})) + \gamma(x_t - x_{t-1}).
$$

What changes relative to Polyak momentum is where the gradient is evaluated, not whether $\eta$ is present.

---
### Turn 25
User asked:
oh inside the look ahead, we use gamma instead of eta?

Assistant response:
Yes.

Inside the look-ahead point, the coefficient is $\gamma$:

$$
x_t + \gamma(x_t - x_{t-1})
$$

Then, after evaluating the gradient there, the actual gradient step is still scaled by $\eta$:

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t - x_{t-1}))
+ \gamma(x_t - x_{t-1}).
$$

So:

- $\gamma$ controls how far we look ahead
- $\eta$ controls the size of the gradient step

---
### Turn 26
User asked:
O((1 - sqrt(a/b))**2 )

Assistant response:
Close, but not quite.

For $\alpha$-strongly convex and $\beta$-smooth functions, the lecture states

$$
f(x_k) - f(x^*) = O\left(\left(1 - \sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

The two corrections are:

- you need the exponent $k$
- the lecture does not square the whole factor

So the pattern to remember is:

`strongly convex NAG = function-value error decays like (1 - sqrt(alpha/beta))^k`

Question 17:

Write the AdaGrad diagonal-coordinate update.

---
### Turn 27
User asked:
/Users/saahith/Downloads/IMG_7389.HEIC is this right?

Assistant response:
Very close.

The clean lecture version is coordinatewise:

$$
h_{t+1,d} = \sqrt{h_{t,d}^2 + G_{t,d}^2}
$$

$$
\theta_{t+1,d} = \theta_{t,d} - \eta \frac{G_{t,d}}{h_{t+1,d}}
$$

where $G_t$ is the stochastic gradient at time $t$.

An equivalent compact way to remember it is:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
\theta_{t+1,i} = \theta_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}.
$$

Main note:

- your cumulative-squared-gradient idea is right
- but `+ \epsilon` is more standard for RMSProp/Adam notation; the lecture's AdaGrad formula did not emphasize it
- for quiz safety, write the coordinatewise update explicitly

Question 18:

Why can AdaGrad become too conservative later in training?

---
### Turn 28
User asked:
wait what's the difference between what i wrote and the coordinate-wise version you gave?

Assistant response:
The main difference is `vector notation` versus `coordinatewise notation`.

What you wrote is basically the right idea:

- accumulate past squared gradients
- divide the current gradient by the square root of that accumulator

But the lecture writes AdaGrad per coordinate, because each coordinate gets its own effective learning rate.

So instead of one scalar denominator, the algorithm keeps one accumulator for each coordinate:

$$
h_{t+1,d} = \sqrt{h_{t,d}^2 + G_{t,d}^2}
$$

and then updates that coordinate by

$$
\theta_{t+1,d} = \theta_{t,d} - \eta \frac{G_{t,d}}{h_{t+1,d}}.
$$

Conceptually, your formula was saying the same thing, but less explicitly.

The other small difference is that you included an $\epsilon$ term. That is common in practice, but in these lecture slides the AdaGrad formula itself was written without emphasizing an $\epsilon$ stabilizer. The slides reserve that more clearly for RMSProp / Adam style formulas.

So for quiz purposes:

- your idea is correct
- the safer exam answer is the coordinatewise version
- that makes it clear that AdaGrad uses a separate adaptive step size for each coordinate

---
### Turn 29
User asked:
because the denominator get's too large, so you end up taking very small steps...

Assistant response:
Correct.

The clean quiz version is:

`AdaGrad keeps accumulating squared gradients in the denominator, so the denominator keeps growing over time. As a result, the effective step sizes can become extremely small, making the method overly conservative later in training.`

Question 19:

Write the Adam update, including the bias-correction terms.

---
### Turn 30
User asked:
/Users/saahith/Downloads/IMG_7390.HEIC is this correct?

Assistant response:
Yes, mostly.

You have the right structure:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2
$$

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

$$
x_{t+1} = x_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon}
$$

Main corrections:

- keep the update indexed as $x_{t+1}$, not $x_t$
- write the bias-corrected moments as $\hat m_t, \hat v_t$
- put the square root only on $\hat v_t$

This is the lecture-level answer to memorize.

Question 20:

Why do we need the bias-correction terms in Adam?

---
### Turn 31
User asked:
not sure

Assistant response:
Because $m_t$ and $v_t$ are initialized at zero, the exponential moving averages are biased toward zero in the early iterations. The bias-correction factors

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

remove that early-iteration shrinkage so the moment estimates better reflect the true first and second moments.

Question 21:

True or False: Adam is guaranteed to converge even for simple convex problems.

---
### Turn 32
User asked:
please add to the .md file

Assistant response:
Added. I’m continuing to mirror each review exchange into the live-chat markdown file.

---
### Turn 33
User asked:
false?

Assistant response:
Correct: `False`.

The lecture explicitly notes that Adam does not necessarily converge, even for simple convex problems, without modifications.

Question 22:

One-sentence synthesis: why is RMSProp introduced after AdaGrad?

---
### Turn 34
User asked:
not sure... include both momentum + adaptive

Assistant response:
Not quite. That description fits Adam better.

The one-sentence answer for RMSProp is:

`RMSProp is introduced to fix AdaGrad's overly aggressive decay in step sizes by replacing the cumulative sum of squared gradients with an exponentially decaying average.`

So the contrast is:

- `AdaGrad`: keeps accumulating forever, so steps can become too small
- `RMSProp`: forgets old gradients gradually, so step sizes stay more usable later in training

---
### Turn 35
User asked:
what ist he update for RMSProp

Assistant response:
The lecture writes RMSProp using a decaying average of squared gradients:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma) g_{t,i}^2
$$

$$
RMS[g]_{t,i} = \sqrt{h_{t,i} + \epsilon}
$$

and then the coordinate update is

$$
\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{RMS[g]_{t,i}} g_{t,i}.
$$

So compared with AdaGrad, the key change is that the denominator uses an exponentially decaying average instead of a cumulative sum.

---
### Turn 36
User asked:
in RMS prop, is the epsilon also included inside the sqrt?

Assistant response:
Yes. In the lecture notation, it is inside the square root:

$$
RMS[g]_{t,i} = \sqrt{h_{t,i} + \epsilon}
$$

so the update is

$$
\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{\sqrt{h_{t,i} + \epsilon}} g_{t,i}.
$$
