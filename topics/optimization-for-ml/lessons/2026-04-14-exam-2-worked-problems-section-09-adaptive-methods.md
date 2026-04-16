# 9. AdaGrad / RMSProp / AdaDelta / Adam Worked Problems

### Problem 9.1

Explain mathematically why AdaGrad can become too conservative.

### Solution

AdaGrad uses

$$
h_{t,i}=\sqrt{\sum_{\tau=1}^t g_{\tau,i}^2}.
$$

This quantity is monotone nondecreasing in $t$. Therefore the effective step size in coordinate $i$,

$$
\frac{\eta}{h_{t,i}},
$$

is monotone nonincreasing. Because the denominator contains the entire gradient history, it can become very large even when the current gradients are moderate. As a result the update size can become extremely small, slowing progress.

### Problem 9.2

Why is bias correction needed in Adam?

### Solution

Adam initializes

$$
m_0=0,\qquad v_0=0,
$$

and updates

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t,
\qquad
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2.
$$

Because the recursions start at zero, the raw moments are biased toward zero at early iterations. The corrected forms

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t}
$$

remove this initialization bias. Without correction, Adam underestimates the first and second moments in the initial steps.
