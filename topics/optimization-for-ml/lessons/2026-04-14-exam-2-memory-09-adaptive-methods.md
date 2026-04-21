# Adaptive Methods Memory Sheet

Use with [[2026-04-14-exam-2-section-09-adaptive-methods]].

## Table of Contents

- [[#Generic Notation]]
- [[#AdaGrad]]
- [[#RMSProp]]
- [[#AdaDelta]]
- [[#Adam]]
- [[#Canonical Update Shapes]]
- [[#What To Memorize]]
- [[#AdamW Distinction]]
- [[#HW4 Failure Lesson]]
- [[#Likely Exam Traps]]


## Generic Notation
- Write the stochastic / current gradient as
$$
g_t=\nabla f_t(x_t)
\quad \text{or} \quad
g_t=\nabla f(x_t).
$$
- All squares, square roots, and divisions below are coordinatewise unless stated otherwise.
- A common generic adaptive template is
$$
x_{t+1}=x_t-\alpha_t\frac{m_t}{\sqrt{V_t}},
$$
possibly followed by projection.

## AdaGrad
- Accumulates squared gradients.
- Effective per-coordinate stepsize shrinks over time.
- Good for sparse problems, but can become too conservative.
- Diagonal AdaGrad update:
$$
s_t=s_{t-1}+g_t^2,
\qquad
x_{t+1}=x_t-\eta \frac{g_t}{\sqrt{s_t}+\epsilon}.
$$

## RMSProp
- Replaces the full sum by an exponential moving average of squared gradients.
- Avoids AdaGrad’s permanently shrinking denominator.
- Update:
$$
s_t=\rho s_{t-1}+(1-\rho)g_t^2,
\qquad
x_{t+1}=x_t-\eta \frac{g_t}{\sqrt{s_t}+\epsilon}.
$$

## AdaDelta
- Tracks both squared gradients and squared updates.
- Tries to self-scale updates and reduce dependence on a global learning rate scale.
- Running averages:
$$
s_t=\rho s_{t-1}+(1-\rho)g_t^2,
\qquad
r_t=\rho r_{t-1}+(1-\rho)(\Delta x_t)^2.
$$
- RMS notation:
$$
\operatorname{RMS}[g]_t=\sqrt{s_t+\epsilon},
\qquad
\operatorname{RMS}[\Delta x]_{t-1}=\sqrt{r_{t-1}+\epsilon}.
$$
- Update:
$$
\Delta x_t=-\frac{\operatorname{RMS}[\Delta x]_{t-1}}{\operatorname{RMS}[g]_t}g_t,
\qquad
x_{t+1}=x_t+\Delta x_t.
$$

## Adam
- Uses first and second moment moving averages.
- Bias correction gives $\hat m_t$ and $\hat v_t$.
- Update has the form
$$
x_{t+1}=x_t-\eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$
- Full recursion:
$$
m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t,
\qquad
v_t=\beta_2 v_{t-1}+(1-\beta_2)g_t^2,
$$
$$
\hat m_t=\frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t=\frac{v_t}{1-\beta_2^t},
$$
$$
x_{t+1}=x_t-\eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$

## Canonical Update Shapes
- AdaGrad:
$$
s_{t,i}=\sum_{\tau=1}^t g_{\tau,i}^2,
\qquad
x_{t+1,i}=x_{t,i}-\frac{\eta}{\sqrt{s_{t,i}+\epsilon}}\,g_{t,i}.
$$
- RMSProp:
$$
s_{t,i}=\rho s_{t-1,i}+(1-\rho)g_{t,i}^2,
\qquad
x_{t+1,i}=x_{t,i}-\frac{\eta}{\sqrt{s_{t,i}+\epsilon}}\,g_{t,i}.
$$
- AdaDelta:
$$
s_{t,i}=\rho s_{t-1,i}+(1-\rho)g_{t,i}^2,
\qquad
r_{t,i}=\rho r_{t-1,i}+(1-\rho)(\Delta x_{t,i})^2,
$$
$$
\Delta x_{t,i}
=
-\frac{\sqrt{r_{t-1,i}+\epsilon}}{\sqrt{s_{t,i}+\epsilon}}\,g_{t,i},
\qquad
x_{t+1,i}=x_{t,i}+\Delta x_{t,i}.
$$
- Adam:
$$
m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t,
\qquad
v_t=\beta_2 v_{t-1}+(1-\beta_2)g_t^2,
$$
$$
\hat m_t=\frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t=\frac{v_t}{1-\beta_2^t}.
$$
- Update:
$$
x_{t+1}=x_t-\eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$
- Bias correction matters because both moving averages start at zero and are initially biased low.

## What To Memorize
- AdaGrad denominator grows monotonically.
- RMSProp uses a decaying average.
- AdaDelta uses both gradient history and update history.
- Adam combines momentum-like first moments with RMSProp-like second moments.
- Know the exact role of each stored quantity:
  - AdaGrad: cumulative squared gradients
  - RMSProp: exponential average of squared gradients
  - AdaDelta: exponential averages of squared gradients and squared updates
  - Adam: first moment plus second moment, then bias correction

## AdamW Distinction
- In plain SGD, weight decay and $L_2$ regularization coincide.
- In adaptive methods, they do not coincide.
- AdamW decouples weight decay from the adaptive gradient normalization.

## HW4 Failure Lesson
- HW4 does not just say “Adam is imperfect.”
- The important memory line is:
  - Adam can fail even on simple convex examples
  - practical success is not the same as a blanket convergence guarantee
- So if asked for the conceptual lesson:
  - AdaGrad / RMSProp / Adam are geometry-changing heuristics
  - those changes help in practice, but they also change the theory

## Likely Exam Traps
- Confusing AdaGrad and RMSProp.
- Forgetting AdaDelta’s update-history term.
- Forgetting bias correction in Adam.
- Forgetting the final Adam update line after writing $\hat m_t,\hat v_t$.
- Saying weight decay = $L_2$ regularization inside Adam-like methods.
