# 10. Advanced Neural-Net Optimization Worked Problems

## Table of Contents

- [[#Problem 10.1]]
- [[#Problem 10.2]]

### Problem 10.1

Explain why Shampoo can be viewed as a structured form of AdaGrad.

### Solution

Ordinary AdaGrad scales coordinates according to accumulated squared gradients. Shampoo does something analogous, but for a matrix parameter $W_t$ it accumulates two structured second-moment matrices:

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t.
$$

The update is

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

So instead of using one giant dense preconditioner on the vectorized parameter, Shampoo uses left and right factors that respect the matrix structure. This is why it is a structured adaptive preconditioner rather than a generic dense one.

### Problem 10.2

Explain why AdamW is not the same as Adam with $L_2$ regularization.

### Solution

With $L_2$ regularization, the gradient becomes

$$
\nabla f_t(\theta) + \lambda_r \theta.
$$

In Adam, this modified gradient is then normalized by the adaptive moment statistics. Therefore the shrinkage term is scaled coordinatewise by the adaptive mechanism.

AdamW instead applies parameter decay outside the adaptive normalization:

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t.
$$

So the decay acts directly on the parameter, not through the adaptive gradient rescaling. That is why AdamW is decoupled weight decay rather than ordinary $L_2$ regularization inside Adam.
