# 10. Advanced Neural-Net Optimization

The Apr 14 lecture is organized around preconditioning:

$$
w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t).
$$

Newton is the classical second-order example. Shampoo extends this idea to matrix and tensor parameters.

For a matrix parameter $W_t$ with gradient $G_t$,

$$
L_t = L_{t-1} + G_t G_t^T,
\qquad
R_t = R_{t-1} + G_t^T G_t,
$$

and

$$
W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}.
$$

The interpretation is that Shampoo acts like a structured AdaGrad, replacing a huge dense preconditioner by left and right matrix factors adapted to the matrix structure.

The stated regret bound is

$$
\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*)
\le
\sqrt{2rD}\operatorname{Tr}(L_T^{1/4})\operatorname{Tr}(R_T^{1/4}).
$$

Under bounded spectral norm of the gradients, the traces scale like $T^{1/4}$, so the regret becomes $O(T^{1/2})$.

SOAP is presented as a refinement of Shampoo that introduces Adam-style adaptation in the eigenbasis of the preconditioner.

AdaNGD is presented as a method connecting online adaptive regret with offline convergence guarantees.

AdamW emphasizes a subtle but important distinction: in ordinary SGD, weight decay and $L_2$ regularization coincide, but in adaptive methods they do not. AdamW therefore decouples the weight-decay step from the adaptive moment scaling:

$weight\ decay = L_2\ regularization$ for standard SGD,

but

$weight\ decay \ne L_2\ regularization$ for adaptive methods.

The decoupled form is

$$
\theta_t
=
(1-\lambda_w)\theta_{t-1}
-
\frac{\eta_t}{\sqrt{\hat v_t}+\epsilon}\hat m_t.
$$

So the Apr 14 lecture should be understood as extending the adaptive-optimization story into:

- structured preconditioning,
- normalization,
- and the distinction between adaptive scaling and explicit parameter shrinkage.
