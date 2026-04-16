# 2. Proximal Gradient Worked Problems

## Table of Contents

- [[#Problem 2.1]]
- [[#Problem 2.2]]

### Problem 2.1

Let

$$
g(x)=\frac12(x-3)^2,
\qquad
h(x)=\lambda |x|.
$$

Write one proximal-gradient step from $x_t$ with step size $\eta$.

### Solution

First compute the gradient of the smooth part:

$$
\nabla g(x)=x-3.
$$

The gradient step is

$$
y_{t+1}=x_t-\eta(x_t-3)=(1-\eta)x_t+3\eta.
$$

Now apply the proximal operator of the $\ell_1$ term:

$$
x_{t+1}
=
\operatorname{prox}_{\eta \lambda |\cdot|}(y_{t+1})
=
\operatorname{sign}(y_{t+1})\max(|y_{t+1}|-\eta\lambda,0).
$$

Therefore

$$
x_{t+1}
=
\operatorname{sign}((1-\eta)x_t+3\eta)\max(|(1-\eta)x_t+3\eta|-\eta\lambda,0).
$$

This is exactly the soft-thresholding form.

### Problem 2.2

Let $h(x)=|x|$. Compute

$$
\operatorname{prox}_{\eta h}(v).
$$

### Solution

We must solve

$$
\min_z \frac{1}{2\eta}(z-v)^2+|z|.
$$

Consider cases.

If $z>0$, then $|z|=z$, so

$$
\frac{d}{dz}\left(\frac{1}{2\eta}(z-v)^2+z\right)
=
\frac{1}{\eta}(z-v)+1.
$$

Setting this to zero gives

$$
z=v-\eta.
$$

This is valid only if $v>\eta$.

If $z<0$, then $|z|=-z$, so

$$
\frac{d}{dz}\left(\frac{1}{2\eta}(z-v)^2-z\right)
=
\frac{1}{\eta}(z-v)-1,
$$

hence

$$
z=v+\eta,
$$

valid only if $v<-\eta$.

If $|v|\le \eta$, the minimizer is $z=0$.

So

$$
\operatorname{prox}_{\eta |\cdot|}(v)
=
\operatorname{sign}(v)\max(|v|-\eta,0).
$$
