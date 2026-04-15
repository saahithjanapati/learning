# Exam 2 Study Guide: Feb 19 through Apr 14

Date: 2026-04-14
Topic Path: `topics/optimization-for-ml`
Mode: `bootstrapping`
Learner Intent: `learn`
Question Style: `conceptual, short-answer, derivation, theorem recall`
Difficulty: `medium-to-hard`

## Inputs

- Source materials:
  - `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`
  - `materials/processed/optimization-for-ml/Feb17+24_proximal_gd.md`
  - `materials/processed/optimization-for-ml/Feb24_proximal_gd_examples.md`
  - `materials/processed/optimization-for-ml/March10_LP_Duality.md`
  - `materials/processed/optimization-for-ml/March12_Part1_LagrangianFunction.md`
  - `materials/processed/optimization-for-ml/March12_Part2_SaddlePoints_Minimax_Slater.md`
  - `materials/processed/optimization-for-ml/March17_KKT.md`
  - `materials/processed/optimization-for-ml/March19_EXTRA_Nonconvex_KKT.md`
  - `materials/processed/optimization-for-ml/March24_SDP.md`
  - `materials/processed/optimization-for-ml/March26_Newton_method.md`
  - `materials/processed/optimization-for-ml/March31_April2_ICA.md`
  - `materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md`
  - `materials/processed/optimization-for-ml/April7_EXTRA_AcceleratedGD_Theory.md`
  - `materials/processed/optimization-for-ml/April14_AvancedNeuralNetOptimization.md`
- Calibration artifacts:
  - `materials/processed/optimization-for-ml/submission_393376523.md`
  - `materials/processed/optimization-for-ml/Quiz1_graded_submission.md`
  - `materials/processed/optimization-for-ml/Quiz2_graded_submission.md`
  - `materials/processed/optimization-for-ml/Quiz3_graded_submission.md`
  - `materials/processed/optimization-for-ml/HW1_graded_submission.md`
  - `materials/processed/optimization-for-ml/HW2_graded_submission.md`
  - `materials/processed/optimization-for-ml/HW3_prompt.md`
  - `topics/optimization-for-ml/lessons/2026-04-12-quiz-4-study-guide-newton-ica-adaptive-methods.md`
  - `topics/optimization-for-ml/lessons/2026-04-14-quiz-4-edge-cases-and-traps.md`
  - `topics/optimization-for-ml/lessons/2026-04-14-quiz-4-targeted-review-problems.md`
- Prior session summary:
  - `learning_system/PROGRESS_LOG.md`

## Executive Read

This exam is likely to be harder than the mini quizzes in exactly one way: it will still want short, precise statements, but it will combine them into longer chains. Instead of asking only “state the KKT conditions” or “write the Newton update,” expect problems like:

1. derive a dual carefully and interpret the feasibility conditions
2. use KKT on a concrete constrained problem and then argue whether the point is actually optimal
3. compare two methods with the right assumptions and the right converging quantity
4. move from abstract lecture content to one application, especially `ICA`, `SDP`, or `adaptive methods`

The biggest risk is not forgetting the topics. The biggest risk is `mixing nearby facts`: wrong quantity, wrong assumptions, wrong sign, wrong feasibility condition, or confusing a quiz-safe one-line statement with what an exam expects as a derivation.

## What The Exam Will Probably Feel Like

Based on `Quiz 1`, `Quiz 2`, `Quiz 3`, `Exam 1`, the homeworks, the late-course quiz-review notes, and your logged weak spots:

- the instructor values `exact formulas` over vague intuition
- the actual exam format used a large `T/F` block, a large `select-all-that-apply` block, and a smaller `short-answer/proof` block
- short-answer recall still matters, but the harder points come from chaining together multiple short ideas into a proof or derivation
- duality / KKT / SDP / Newton / ICA / adaptive methods are especially good exam topics because they support both recall and derivation
- “state the rate” is never enough by itself; you must also say `what quantity is converging`
- T/F style conceptual traps from quizzes can become “justify or provide counterexample” items on the exam

What `Exam 1` adds specifically:

- multiple-choice sections can carry most of the points, so broad conceptual coverage matters
- the short-answer section is not long, but it is unforgiving when setup is wrong
- the gap between “I know the theorem” and “I can set up the proof correctly in 6-10 lines” matters a lot

Because of that, you should not treat proof prep as secondary. It is lower in point count than the multiple-choice blocks, but much higher in `points lost per mistake`.

## Topic Priority

If I had to rank your study time by expected exam value:

1. `Duality + Lagrangian + KKT + Slater + nonconvex KKT`
2. `SDP basics + duality + PSD facts + Schur complement`
3. `Newton method + local rate + descent direction + failure modes`
4. `ICA / FastICA as Newton + Lagrange multipliers application`
5. `Proximal gradient + gradient mapping + rate statements`
6. `SGD theory and step-size logic`
7. `Momentum / NAG / AdaGrad / RMSProp / AdaDelta / Adam`
8. `April 14 advanced methods: Shampoo, SOAP, AdaNGD, AdamW, Muon`

The first four are the most likely to show up in longer-form exam problems. The last four are more likely to appear as comparison, update-rule, or theorem-interpretation questions, though April 14 is fresh enough that some of it may still appear.

## Evidence From The Previous Exam

`Exam 1` was structured as:

- `24` points of True/False
- `33` points of Select-All
- `20` points of Short Answer

That means you should prepare for two very different demands:

1. `breadth`
   You need to recognize definitions, counterexamples, sufficient conditions, and rate statements quickly across many topics.

2. `setup quality`
   In the short-answer section, points disappear fast if the proof starts from the wrong setup, uses the wrong theorem form, or skips the key inequality that the grader expects.

This matches your performance history closely:

- earlier quizzes show precision issues on definitions and rates
- `Exam 1` shows setup issues on short proofs
- homeworks show you can do long derivations when given time, but the exam compresses that into much less space

## Part I: Stochastic Gradient Descent and Proximal Methods

## SGD: what you need cold

Core update:

$$
x^{t+1} = x^t - \eta_t g(x^t; \xi_t), \qquad \mathbb{E}[g(x;\xi)\mid x] = \nabla f(x).
$$

Main intuition:

- SGD is cheaper per iteration than full GD.
- Fixed step size gives fast initial progress but can leave a `noise floor`.
- Decaying step sizes are what let you go beyond the noise floor in theory.

Rates and the quantity:

- convex nonsmooth SGD:

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O(1/\sqrt{k})
$$

- strongly convex SGD with averaging and decaying step size:

$$
\mathbb{E}[f(\bar x_k)] - f(x^*) = O((1+\log k)/k)
$$

- strongly convex SGD with fixed step:

$$
\mathbb{E}\|x^k - x^*\|^2
\le
(1-\alpha\eta)^k\|x^0-x^*\|^2 + \frac{\eta G^2}{\alpha}
$$

Exam-style questions to expect:

- Why does fixed-step SGD typically not converge exactly?
- Compare SGD with full GD in `per-step cost` versus `iteration complexity`.
- Explain why mini-batching reduces variance but increases per-step cost.
- State the theorem assumptions, not just the rate.

Common trap for you:

- mixing deterministic GD intuition with SGD asymptotics
- swapping the $1/\sqrt{k}$ regime with the near-`1/k` strongly-convex averaged regime

## Proximal gradient: what you need cold

Problem form:

$$
f(x) = g(x) + h(x),
$$

where $g$ is smooth and $h$ is convex but possibly nonsmooth.

Prox operator:

$$
\operatorname{prox}_{\eta,h}(v)
=
\arg\min_z \left\{ \frac{1}{2\eta}\|z-v\|_2^2 + h(z) \right\}.
$$

Prox-GD update:

$$
y_{t+1} = x_t - \eta \nabla g(x_t),
\qquad
x_{t+1} = \operatorname{prox}_{\eta,h}(y_{t+1}).
$$

Gradient mapping:

$$
G_\eta(x) = \frac{1}{\eta}\left(x - \operatorname{prox}_{\eta,h}(x-\eta \nabla g(x))\right).
$$

Why this matters:

- it is the right analogue of the gradient for composite optimization
- many lecture statements are written in terms of $G_\eta(x)$

Exam-style questions to expect:

- state the prox operator correctly
- derive one prox-gradient update from the definition
- explain why prox methods can handle nonsmooth $h$
- compare prox-GD with subgradient descent
- use the descent lemma or gradient mapping in a short proof

High-probability special case:

- `soft-thresholding` / `L1` intuition
- matrix completion and nuclear-norm prox as singular-value soft-thresholding could appear as a conceptual application, but likely not as the main exam center

## Part II: Duality, Lagrangians, KKT, and Slater

This is the most exam-dense block.

## Duality: what to know precisely

For a constrained minimization problem, the dual gives lower bounds on the primal optimum.

What must be automatic for you:

- how to write the Lagrangian
- sign conditions on inequality multipliers
- what the dual function is
- why the dual function is always concave
- weak duality
- when strong duality can hold

For the LP

$$
\min_x c^T x
\quad \text{s.t. } Ax=b,\; Gx\le h,
$$

you should be able to write:

$$
L(x,u,\nu)=c^Tx + u^T(Ax-b) + \nu^T(Gx-h),
\qquad \nu \ge 0.
$$

And then derive the dual function correctly by minimizing over $x$.

Quiz 3 showed a real weakness here:

- you lost points on the exact domain where the dual is finite
- the issue was not broad confusion, it was missing the full condition set

That means for the exam you need to be able to say:

- when the infimum over $x$ is finite
- when it drops to $-\infty$
- and exactly which algebraic equalities/inequalities define the dual-feasible set

Homework calibration strengthens this:

- `HW3` contains LP/QP/SDP relaxation work and a nonconvex KKT problem
- this strongly suggests the exam may ask you to move between `formulation`, `dual interpretation`, and `optimality verification`, not just state definitions

## KKT: this must be completely automatic

For convex differentiable problems:

$$
\min_x f(x)
\quad \text{s.t. } h_i(x)\le 0,\; \ell_j(x)=0
$$

the KKT conditions are:

1. primal feasibility
2. dual feasibility
3. complementary slackness
4. stationarity

Written explicitly:

$$
h_i(x^*) \le 0,\qquad \ell_j(x^*)=0
$$

$$
\nu_i^* \ge 0
$$

$$
\nu_i^* h_i(x^*) = 0
$$

$$
\nabla f(x^*)
 + \sum_i \nu_i^* \nabla h_i(x^*)
 + \sum_j u_j^* \nabla \ell_j(x^*)
 = 0.
$$

What the exam may ask beyond recall:

- solve a concrete KKT system
- identify the active set
- check complementary slackness correctly
- argue whether KKT is sufficient, necessary, or neither in a given setting
- use `Slater` to justify necessity in convex problems

## Slater and strong duality

You should be able to say:

- `KKT is sufficient` for convex differentiable problems
- `KKT is necessary as well` when strong duality holds
- `Slater` is a standard sufficient condition for strong duality in convex problems

Expect questions like:

- “Why does strong duality matter for KKT necessity?”
- “What breaks in the nonconvex case?”

## Nonconvex KKT

You should expect at least one conceptual question here because the lecture sequence explicitly separated convex KKT from `nonconvex KKT / examples`.

What to remember:

- in nonconvex problems, KKT points are not automatically global optima
- they are typically only candidate local optima under qualification conditions
- you may need second-order reasoning or direct objective comparison to decide what the KKT point means

Exam prediction:

- a problem may ask you to find KKT points and then decide which are maxima/minima/saddles
- this is more likely than a purely abstract theorem statement

## Part III: Semidefinite Programming

This is a favorite exam area because it combines definitions, linear algebra facts, duality, and short proofs.

## Core definitions

$$
S^n := \{X \in \mathbb{R}^{n\times n} : X=X^T\},
\qquad
S_+^n := \{X \in S^n : X \succeq 0\}.
$$

Meaning:

$$
X \succeq 0
\iff
v^T X v \ge 0 \quad \forall v.
$$

You need these facts cold:

- $S_+^n$ is a closed convex cone
- if $X \succeq 0$, then $X_{ii} \ge 0$
- if $X \succeq 0$ and $X_{ii}=0$, the whole $i$th row and column are zero
- Schur complement:

$$
\begin{pmatrix}
A & B \\
B^T & C
\end{pmatrix} \succeq 0
\iff
A \succeq 0 \text{ and } C-B^T A^{-1}B \succeq 0
$$

Matrix inner product:

$$
A \bullet B = \operatorname{Tr}(A^T B).
$$

Critical theorem:

- if $A \succeq 0$ and $B \succeq 0$, then $A \bullet B \ge 0$
- if $A \bullet B = 0$ and both are PSD, then $AB=0$

## Standard primal-dual SDP pair

Primal:

$$
\min_X C \bullet X
\quad \text{s.t. } A_i \bullet X = b_i,\; X \succeq 0
$$

Dual:

$$
\max_{y,S} y^T b
\quad \text{s.t. } S = C - \sum_i y_i A_i,\; S \succeq 0
$$

Most important identity:

$$
C \bullet X - y^T b = S \bullet X \ge 0.
$$

This is the exact kind of thing that appears on quizzes and then gets upgraded into “derive weak duality” on the exam.

Your recent review notes suggest this is stable for you now, but it still deserves repetition because the sign is easy to flip under pressure.

Exam-style questions to expect:

- define SDP and explain why it is convex
- prove weak duality using the gap identity
- use strict feasibility / strong duality conceptually
- short Schur-complement application

Homework support:

- `HW2` already tested projection to the PSD cone and convex-concave / saddle-point reasoning
- `HW3` explicitly uses SDP through MaxCut relaxations

So for SDP, do not study it as an isolated lecture. Study it as:

- PSD linear algebra facts
- primal/dual formulation
- a modeling tool for relaxations

## Part IV: Newton Method and FastICA

## Newton method

Root finding:

$$
x_{k+1} = x_k - \frac{\phi(x_k)}{\phi'(x_k)}.
$$

Minimization:

$$
x_{k+1}
=
x_k - [\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

You must not mix these.

What you need to know:

- Newton step comes from applying Newton to $\nabla f(x)=0$
- if Hessian is positive definite, the Newton step is a descent direction
- local convergence is quadratic near a nondegenerate local minimizer
- failure modes:
  - Hessian singular
  - Hessian indefinite
  - divergence far from solution
  - loops / instability
  - fractal basins for root-finding examples

Exam-style questions to expect:

- derive the Newton step from the quadratic model or from root-finding on the gradient
- prove it is a descent direction under PD Hessian
- state the local rate
- contrast root-finding Newton with minimization Newton

## FastICA

This is a very exam-friendly application because it bundles:

- whitening
- constrained optimization
- Lagrange multipliers
- stationarity
- a Newton-style fixed-point update

What should be automatic:

- after whitening, $E[zz^T]=I$
- $z,w \in \mathbb{R}^n$, $y = w^T z \in \mathbb{R}$
- PCA removes correlation / finds variance directions
- ICA targets statistical independence / non-Gaussianity

Optimization problem from lecture:

$$
\max_{\|w\|=1} \; E[(w^T z)^4] - 3
$$

Stationarity form:

$$
4E[(w^T z)^3 z] + 2\lambda w = 0
$$

Update:

$$
\tilde w \leftarrow E[(w^T z)^3 z] - 3w,
\qquad
w \leftarrow \tilde w / \|\tilde w\|.
$$

This is very likely exam material because it is one of the cleanest places in the course where abstract optimization turns into a specific algorithm.

What I would expect:

- explain whitening
- compare ICA with PCA
- derive or recognize the FastICA objective and stationarity condition
- write the fixed-point update and normalization

## Part V: Momentum, NAG, and Adaptive Methods

## Polyak momentum and NAG

Polyak:

$$
x_{t+1}
=
x_t - \eta \nabla F(x_t) + \gamma(x_t-x_{t-1}).
$$

NAG:

$$
x_{t+1}
=
x_t
- \eta \nabla F(x_t + \gamma(x_t-x_{t-1}))
 + \gamma(x_t-x_{t-1}).
$$

Difference:

- Polyak uses gradient at current point
- NAG uses gradient at look-ahead point

NAG rates:

- convex smooth:

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right)
$$

- strongly convex smooth:

$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right)
$$

These are exactly the kinds of “state the rate and the quantity” facts the quizzes have already tested.

## AdaGrad / RMSProp / AdaDelta / Adam

High-yield distinctions:

- `AdaGrad`: cumulative squared gradients in denominator, can become too conservative
- `RMSProp`: exponential moving average of squared gradients, fixes unbounded denominator growth
- `AdaDelta`: keeps moving averages of both squared gradients and squared updates
- `Adam`: momentum + RMSProp style second moment + bias correction

Coordinatewise AdaGrad:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}.
$$

RMSProp form:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma)g_{t,i}^2,
\qquad
x_{t+1,i} = x_{t,i} - \frac{\eta}{\sqrt{h_{t,i}+\epsilon}} g_{t,i}.
$$

Adam needs:

- first moment $m_t$
- second moment $v_t$
- bias-corrected $\hat m_t$, $\hat v_t$
- final update with $\hat m_t / (\sqrt{\hat v_t}+\epsilon)$

Likely exam style:

- compare methods conceptually
- write the update for one of them
- explain why bias correction is needed
- explain why AdaGrad can stall late

## April 14 methods: what to expect

This lecture is fresh, so it is worth studying, but I would not expect a full proof-heavy question from the April 14 papers. More likely:

- define preconditioning
- write the Shampoo matrix update
- explain why Shampoo is “structured AdaGrad”
- know the role of left/right preconditioners and the `-1/4` exponent
- distinguish `AdamW` from “Adam + L2 regularization”
- know the core claim that $weight\ decay = L_2\ regularization$ for standard SGD, but $weight\ decay \ne L_2\ regularization$ for adaptive methods
- recognize `SOAP`, `AdaNGD`, and `Muon` at a high level

## Shampoo

For matrix parameter $W$ and gradient $G_t$:

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t,
$$

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

Main points:

- matrix/tensor-aware preconditioning
- lower storage than full preconditioner
- can be viewed as structured AdaGrad

## AdaNGD

I would not expect you to reproduce the detailed proof. I would expect:

- what it is trying to do
- that it adapts to gradient norms / smoothness without needing those constants in advance
- how it relates online adaptive regret ideas to offline convergence guarantees

## AdamW

This is one of the most exam-likely fresh topics from April 14.

What to remember:

- in standard SGD, weight decay and L2 regularization line up
- in adaptive methods, they are not equivalent
- AdamW decouples weight decay from the adaptive gradient update
- this often improves training and generalization behavior

If they ask only one question from Apr 14, `AdamW vs Adam + L2` is my top guess.

## Part VI: Your Personal Risk Map

From your graded quizzes and progress log, the main risk areas are:

1. `precision under time pressure`
   You often know the right idea, but lose points on the exact domain, exact quantity, or exact condition.

2. `rate-statement mismatch`
   You have previously mixed rate and quantity, or written the rate without the quantity.

3. `duality feasibility details`
   Your Quiz 3 miss on the LP dual function is the strongest evidence that you should overpractice the “when is the dual finite?” step.

4. `KKT logic direction`
   Earlier logs show confusion risk around which assumptions give sufficiency vs necessity and how strong duality enters.

5. `neighboring-method confusion`
   Newton root-finding vs minimization, Polyak vs NAG, AdamW vs L2-in-Adam, PCA vs ICA, weight decay vs regularization.

6. `proof setup under time pressure`
   `Exam 1` suggests this is the main short-answer failure mode. The issue is often not the final claim, but setting up the right inequality chain from the right theorem.

## What To Memorize Verbatim

If time is short, these should be word-perfect:

1. prox operator definition
2. gradient mapping definition
3. LP Lagrangian with correct multiplier signs
4. all four KKT components plus stationarity
5. Slater -> strong duality -> KKT necessity in convex problems
6. SDP primal and dual
7. $C \bullet X - y^T b = S \bullet X \ge 0$
8. Newton minimization update
9. NAG convex and strongly convex rates, with $f(x_k)-f(x^*)$
10. FastICA objective and normalized fixed-point update
11. Polyak / NAG / AdaGrad / RMSProp / Adam / Shampoo / AdamW update forms at a high level

## What A Hard Exam Question Is Likely To Look Like

I would expect something in one of these templates:

1. `Derive + interpret`
   Write the Lagrangian, derive the dual, state the dual-feasible set, explain weak duality, and identify when strong duality lets you conclude optimality.

2. `Solve + verify`
   Use KKT to solve a constrained problem, then determine whether the KKT point is actually optimal and under what assumptions.

3. `Statement + proof sketch`
   Show why the Newton step is a descent direction, or derive the SDP weak duality identity.

4. `Algorithm + concept bridge`
   Move from a conceptual method to its update rule and then state the rate or interpretation.

5. `Compare similar methods`
   Explain the difference between NAG and Polyak, AdamW and L2 regularization in Adam, or PCA and ICA.

6. `Exam-1-style conceptual sweep`
   A block of T/F or select-all items where the difficulty comes from fine distinctions like:
   - coordinatewise convex vs jointly convex
   - smooth vs convex vs strongly convex
   - subgradient existence vs differentiability
   - tangent lower bound vs smooth upper quadratic bound
   - sufficient vs necessary optimality conditions

## Fast Study Plan If The Exam Is Soon

## Pass 1: theorem and formula cleanup

Spend one pass writing from memory:

- prox operator
- KKT conditions
- SDP primal/dual and gap identity
- Newton update
- FastICA objective/update
- Polyak, NAG, AdaGrad, RMSProp, Adam, Shampoo

Do not read while writing.

Add one more thing to this pass:

- write `one correct counterexample` for each of these:
  - composition of convex functions is not always convex
  - coordinatewise convex does not imply jointly convex
  - KKT in nonconvex problems does not imply global optimality

## Pass 2: duality and KKT drills

This should be your highest-value practice.

- derive one LP dual from scratch
- do one KKT solve carefully
- do one “is KKT sufficient or necessary here?” logic check

## Pass 2.5: proof-style compression drills

Use [2026-04-14-exam-2-proof-drill.md](/Users/saahith/Desktop/learning-machine/topics/optimization-for-ml/lessons/2026-04-14-exam-2-proof-drill.md).

Do these with a hard cap of `6-10 lines` each:

- show a function is convex from smoothness
- derive one weak-duality identity
- prove Newton gives a descent direction
- set up one proximal-gradient proof skeleton

## Pass 3: late-course short-answer drill

Run one timed sheet with:

- 3 SDP questions
- 2 Newton questions
- 2 ICA questions
- 3 adaptive-method questions

Keep answers to `2-5 lines` to match the course style.

## Pass 4: exam-style synthesis

Practice two medium-length problems:

- one duality/KKT problem
- one Newton/ICA or adaptive-method comparison problem

## Bottom Line

Your most important study target is not the entire content uniformly. It is the `interface between exact formulas and exact logic`.

If you go into the exam able to do the following four things cleanly, you will be in good shape:

1. derive a dual without dropping feasibility conditions
2. solve and interpret KKT correctly
3. state rates with the right assumptions and converging quantity
4. distinguish nearby algorithms without mixing their updates

And if the exam follows `Exam 1` structurally, the highest-return meta-skill is:

`switch quickly between breadth mode (T/F, select-all, counterexample recognition) and compression mode (a 6-10 line proof with the correct setup).`

If you want the next step, I should turn this into either:

1. a `one-page high-yield cram sheet`
2. a `mock exam` matched to this course's style
3. a `one-question-at-a-time oral drill` on your weakest areas
