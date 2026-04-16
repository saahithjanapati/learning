# 9. AdaGrad, RMSProp, AdaDelta, Adam

AdaGrad:

$$
h_{t,i} = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2},
\qquad
x_{t+1,i} = x_{t,i} - \eta \frac{g_{t,i}}{h_{t,i}}.
$$

Its problem is over-shrinking: the denominator keeps growing.

RMSProp:

$$
h_{t,i} = \gamma h_{t-1,i} + (1-\gamma)g_{t,i}^2,
\qquad
x_{t+1,i} = x_{t,i} - \frac{\eta}{\sqrt{h_{t,i}+\epsilon}} g_{t,i}.
$$

This replaces the cumulative sum with an exponential moving average.

AdaDelta:

$$
E[g^2]_t = \rho E[g^2]_{t-1} + (1-\rho)g_t^2,
$$

$$
E[\Delta x^2]_t = \rho E[\Delta x^2]_{t-1} + (1-\rho)(\Delta x_t)^2,
$$

$$
\Delta x_t = - \frac{RMS[\Delta x]_{t-1}}{RMS[g]_t} g_t.
$$

Adam:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t,
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2,
$$

$$
\hat m_t = \frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t = \frac{v_t}{1-\beta_2^t},
$$

$$
x_{t+1} = x_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
$$

The bias corrections matter because both $m_t$ and $v_t$ start at zero. Without correction, the first iterations systematically underestimate the moments.
