# Adaptive Methods Memory Sheet

Use with [[2026-04-14-exam-2-section-09-adaptive-methods]].

## Table of Contents

- [[#AdaGrad]]
- [[#RMSProp]]
- [[#AdaDelta]]
- [[#Adam]]
- [[#What To Memorize]]
- [[#AdamW Distinction]]
- [[#Likely Exam Traps]]


## AdaGrad
- Accumulates squared gradients.
- Effective per-coordinate stepsize shrinks over time.
- Good for sparse problems, but can become too conservative.

## RMSProp
- Replaces the full sum by an exponential moving average of squared gradients.
- Avoids AdaGrad’s permanently shrinking denominator.

## AdaDelta
- Tracks both squared gradients and squared updates.
- Tries to self-scale updates and reduce dependence on a global learning rate scale.

## Adam
- Uses first and second moment moving averages.
- Bias correction gives $\hat m_t$ and $\hat v_t$.
- Update has the form
$$
x_{t+1}=x_t-\eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$

## What To Memorize
- AdaGrad denominator grows monotonically.
- RMSProp uses a decaying average.
- Adam combines momentum-like first moments with RMSProp-like second moments.

## AdamW Distinction
- In plain SGD, weight decay and $L_2$ regularization coincide.
- In adaptive methods, they do not coincide.
- AdamW decouples weight decay from the adaptive gradient normalization.

## Likely Exam Traps
- Confusing AdaGrad and RMSProp.
- Forgetting bias correction in Adam.
- Saying weight decay = $L_2$ regularization inside Adam-like methods.
