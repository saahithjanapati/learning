# Lecture_21_diffusion

Source: `materials/archive/Lecture_21_diffusion.pdf`
Duplicate equivalents: `Lecture_21_diffusion.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 36

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 21:
A brief overview of diffusion models
### Visual Description
Text-only slide.
---
## Page 2
### Content
Diffusion models

Combines several ideas we've seen so far: **score matching, annealing, variational inference.**

Basic idea: take continuous limits of annealing schedules. Leverage numerical techniques & solvers to deal with the resulting **stochastic differential equation.**

Note: This is a very recent and still developing area. Many questions are subject to ongoing research & we are not surveying the "state-of-the-art" methods.
### Visual Description
Text-only slide.
---
## Page 3
### Content
A (ridiculously) short background on SDEs

An Itô diffusion is a stochastic differential equation that looks like:
$$dx = f(x, t)dt + g(t)dw$$
The term $dw$ term is called Brownian motion/Wiener process.

Its defining characteristic is:
$w(t + u) – w(t) \sim N(0,u)$
The increments are past-independent.
(Proving such a process exists is highly non-trivial)
### Visual Description
A 3D plot showing a complex, blue, fractal-like path, representing a Brownian motion or Wiener process. The axes are labeled X, Y, Z with numerical scales ranging from negative to positive values.
---
## Page 4
### Content
A (ridiculously) short background on SDEs

An Itô diffusion is a stochastic differential equation that looks like:
$$dx = f(x, t)dt + g(t)dw$$
The term $f(x, t)$ is called a "drift" (it deterministically "steers" the process), $g(t)$ scales the noise being added.

Informally, a random variable $x(t)$ satisfies the above equation if, for infinitesimal $\Delta t$, we have:
$$x_{t+\Delta t} = x_t + f(x_t, t)\Delta t + g(t)\sqrt{\Delta t}\xi, \xi \sim N(0,I)$$
### Visual Description
Text-only slide.
---
## Page 5
### Content
Langevin as an SDE

(Discretized) Langevin dynamics:
$$x_{t+1} = \underbrace{x_t – \eta\nabla f(x_t)}_{\text{Gradient descent}} + \underbrace{\sqrt{2} \eta \xi_k}_{\text{Gaussian noise}}$$
$$\xi_k \sim N(0,I)$$

Langevin SDE:
$$dx_t = \underbrace{-\nabla f(x_t) dt}_{\text{Gradient flow}} + \underbrace{\sqrt{2}dW_t}_{\text{Brownian motion}}$$
### Visual Description
Two equations are displayed, each within a rounded rectangle. The first equation shows the discretized Langevin dynamics, with parts labeled "Gradient descent" and "Gaussian noise". The second equation shows the Langevin SDE, with parts labeled "Gradient flow" and "Brownian motion".
---
## Page 6
### Content
Recall: Denoising score matching

The fix due to Song-Ermon '20: **Annealing!**

We will fit several "smoothed" versions of $p_{data}$. Precisely, we will fit:
$$p_{\sigma_i,data}(x) = p_{data}(x) * N(0, \sigma_i) = \int_{\delta} p_{data}(x – \delta) N(x; \delta, \sigma_i)d\delta$$
for several "temperatures" $\sigma_1, \sigma_2, ..., \sigma_T$.

$$\sigma_1 > \sigma_2 > \dots > \sigma_{L-1} > \sigma_L$$

Figure by Stefano Ermon.
### Visual Description
A horizontal sequence of four square images, separated by an ellipsis. Each image shows an orange blob on a light background. The blobs progressively become smaller and sharper from left to right, illustrating decreasing "temperatures" or noise levels.
---
## Page 7
### Content
Recall: Denoising score matching

The fix due to Song-Ermon '20: **Annealing!**

We will fit several "smoothed" versions of $p_{data}$. Precisely, we will fit:
$$p_{\sigma_i,data}(x) = p_{data}(x) * N(0, \sigma_i) = \int_{\delta} p_{data}(x – \delta) N(x; \delta, \sigma_i)d\delta$$
for several "temperatures" $\sigma_1, \sigma_2, ..., \sigma_T$.

Why this instead of "temperature annealing"?
We only can access samples from $p_{data}$ (not the unnormalized pdf as in temperature annealing).

To draw samples from $p_{\sigma_i,data}$:
take a sample $x$ from $p_{data}$,
a sample $z$ from $N(0, \sigma_i)$,
output $x' = x + z$.
### Visual Description
Text-only slide, with a boxed section explaining how to draw samples from $p_{\sigma_i,data}$.
---
## Page 8
### Content
Recall: Denoising score matching

The fix due to Song-Ermon '20: **Annealing!**

We will fit several "smoothed" versions of $p_{data}$. Precisely, we will fit:
$$p_{\sigma_i,data}(x) = p_{data}(x) * N(0, \sigma_i) = \int_{\delta} p_{data}(x – \delta) N(x; \delta, \sigma_i)d\delta$$
for several "temperatures" $\sigma_1, \sigma_2, ..., \sigma_T$.

The new loss:
$$\operatorname{argmin}_{\theta} \sum_{i} \lambda(\sigma_i) \mathbb{E}_{x \sim p_{\sigma_i,data}} ||s_{\theta}(x, i) - \nabla_x \log p_{\sigma_i,data}(x)||^2$$
Relative "weighting" of different noise levels.
### Visual Description
Text-only slide, featuring a mathematical equation for a new loss function. An arrow points from $\lambda(\sigma_i)$ in the equation to the text "Relative 'weighting' of different noise levels."
---
## Page 9
### Content
From denoising score matching to SDEs

What if we take an infinite number of temperatures which increase "infinitesimally" slowly?!

$x_0 \sim P_{data}$
$x_1 = x_0 + \sigma_1 z_1, z_1 \sim N(0,I)$
$x_2 = x_1 + \sqrt{\sigma_2^2 - \sigma_1^2} z_2, z_2 \sim N(0,I)$
...
$x_L = x_{L-1} + \sqrt{\sigma_L^2 - \sigma_{L-1}^2} z_L, z_L \sim N(0,I)$

Can rewrite this: $x(t + \Delta t) = x(t) + \sqrt{\sigma^2(t + \Delta t) – \sigma^2(t)} z(t)$
$\approx x(t) + \sqrt{\frac{d[\sigma^2(t)]}{dt}} \Delta t z(t),$
### Visual Description
Text-only slide.
---
## Page 10
### Content
From denoising score matching to SDEs

What if we take an infinite number of temperatures which increase "infinitesimally" slowly?!

$x_0 \sim P_{data}$
$x_1 = x_0 + \sigma_1 z_1, z_1 \sim N(0,I)$
$x_2 = x_1 + \sqrt{\sigma_2^2 - \sigma_1^2} z_2, z_2 \sim N(0,I)$
...
$x_L = x_{L-1} + \sqrt{\sigma_L^2 - \sigma_{L-1}^2} z_L, z_L \sim N(0,I)$

Can rewrite this:
$dx = \sqrt{\frac{d[\sigma^2(t)]}{dt}} dw,$
### Visual Description
The slide contains text and mathematical equations. The final equation, $dx = \sqrt{\frac{d[\sigma^2(t)]}{dt}} dw,$ is highlighted within an orange rectangular box.
---
## Page 11
### Content
From denoising score matching to SDEs

Nothing special here! We can take any (fixed, not trained) SDE to go from data to some noise distribution:

$dx = f(\mathbf{x}, t)dt + g(t)dw$

Figure from https://yang-song.github.io/blog/2021/score/
### Visual Description
The slide features two images side-by-side below the text. The left image shows a 2x2 grid of four distinct images, each corrupted with noise. The right image is a heatmap visualization of a "Stochastic process" showing a distribution evolving over time, starting concentrated and spreading out.
---
## Page 12
### Content
Reversing the SDE

Under this view, "reversing" the SDE (i.e. finding some stochastic process that goes from noise to data) could be used to generate samples!

Figure from https://yang-song.github.io/blog/2021/score/
### Visual Description
The slide displays two images side-by-side. The left image is a field of pure random noise. The right image is a heatmap visualization of a "Reverse stochastic process" showing a distribution evolving over time, starting spread out and concentrating into distinct peaks.
---
## Page 13
### Content
Reversing the SDE

Under this view, "reversing" the SDE (i.e. finding some stochastic process that goes from noise to data) could be used to generate samples!

How can we reverse the SDE $dx = f(\mathbf{x}, t)dt + g(t)dw$ (and what does this have to do with score functions...)?

Remarkable result (Anderson, '82): there exists a reversing SDE, and it has a very nice form:
$dx = [f(\mathbf{x}, t) – g^2(t)\nabla_{\mathbf{x}} \log p_t(\mathbf{x})]dt + g(t)dw$

Score function!
### Visual Description
The slide contains text and a mathematical equation. A block of text and the equation $dx = [f(\mathbf{x}, t) – g^2(t)\nabla_{\mathbf{x}} \log p_t(\mathbf{x})]dt + g(t)dw$ are enclosed within a blue rectangular box. An arrow points from the term $\nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ in the equation to the text "Score function!".
---
## Page 14
### Content
Reversing the SDE

Under this view, "reversing" the SDE (i.e. finding some stochastic process that goes from noise to data) could be used to generate samples!

How can we reverse the SDE $dx = f(\mathbf{x}, t)dt + g(t)dw$ (and what does this have to do with score functions...)?

Remarkable result (Anderson, '82): there exists a reversing SDE, and it has a very nice form:
$dx = [f(\mathbf{x}, t) – g^2(t)\nabla_{\mathbf{x}} \log p_t(\mathbf{x})]dt + g(t)dw$

Strategy: learn the score function, then solve this reverse SDE.
### Visual Description
The slide contains text and a mathematical equation. A block of text and the equation $dx = [f(\mathbf{x}, t) – g^2(t)\nabla_{\mathbf{x}} \log p_t(\mathbf{x})]dt + g(t)dw$ are enclosed within a blue rectangular box.
---
## Page 15
### Content
Reversing the SDE

Learning the score function: just use score matching!

$\operatorname{argmin}_{\theta} \sum_{i} \lambda(\sigma_i) \mathbb{E}_{\mathbf{x} \sim p_{\sigma_i, data}} ||s_{\theta}(\mathbf{x}, i) – \nabla_{\mathbf{x}} \log p_{\sigma_i, data} (\mathbf{x})||^2$

$\mathbb{E}_{t \in \mathcal{U}(0,T)} \mathbb{E}_{p_t(\mathbf{x})}[\lambda(t)||\nabla_{\mathbf{x}} \log p_t(\mathbf{x}) – s_{\theta}(\mathbf{x}, t)||_2^2]$

Trained exactly as before (use denoising score matching + sliced score matching to scale up).

The pro is that we don't need to tune the temperature schedule (though we do need to pick a forward SDE, $\lambda(T)$, etc).
### Visual Description
The slide contains text and two mathematical equations. A downward arrow connects the first equation to the second equation, which is enclosed within a blue rectangular box.
---
## Page 16
### Content
A bit of stochastic calculus

Warmup: heuristic derivation of Itô's Lemma

How do you do change of variables for a stochastic process??

$dx_t = f(x_t,t)dt + g(t)dw_t$

$dh(x_t,t) = ??$ Taylor expanding, we have:

$dh(x_t, t) = \partial_t h dt + \partial_x h dx + \frac{1}{2}\partial_t^2 h dt^2 + \frac{1}{2}\partial_x^2 h dx^2 + \frac{1}{2}\partial_t h \partial_x h dt dx + \dots$

Heuristically: $dw^2 = dt$; $dw dt$, $dt^2$ are all of lower order so can be dropped.

$dh(x_t, t) \approx \partial_t h dt + \partial_x h (f(x_t, t)dt + g(t)dw_t) + \frac{1}{2}\partial_x^2 h g^2(t)dt$

$= (\partial_t h + \partial_x h f(x_t, t) + \frac{1}{2}\partial_x^2 h g^2(t)dt) dt + \partial_x h g(t)dw_t$
### Visual Description
The slide contains text and mathematical equations. The final equation, $= (\partial_t h + \partial_x h f(x_t, t) + \frac{1}{2}\partial_x^2 h g^2(t)dt) dt + \partial_x h g(t)dw_t$, is enclosed within a blue rectangular box.
---
## Page 17
### Content
A bit of stochastic calculus

$$dh(x_t,t) = \left(\partial_t h+\partial_x h f(x,t)+\frac{1}{2}\partial_x^2 h g^2(t)dt\right) dt + \partial_x h g(t)dw_t$$

Consequence: Fokker-Planck equation

How do you describe the probability distribution of a SDE?

$$dx_t = f(x_t,t)dt + g(t)dw_t$$

For any test function h(x),

$$\frac{d}{dt}E_{p_t}h(x) = E_{p_t} [\partial_x h f(x, t) + \frac{1}{2}\partial_x^2 h g^2(t)], \text{ since } E[dw_t] = 0$$

$$= \int_X -h(x)\partial_x(p_t(x)f(x, t)) + 1/2 h(x)g^2(t)\partial_x^2 (p_t(x)) dx$$
### Visual Description
The slide is titled "A bit of stochastic calculus". Below the title, a large equation is presented in a blue rectangular box. Following this, there's text stating "Consequence: Fokker-Planck equation" and a question "How do you describe the probability distribution of a SDE?". An SDE equation is then shown. The text "For any test function h(x)," precedes two more mathematical equations.
---

## Page 18
### Content
A bit of stochastic calculus

$$dh(x_t,t) = \left(\partial_t h+\partial_x h f(x,t)+\frac{1}{2}\partial_x^2 h g^2(t)dt\right) dt + \partial_x h g(t)dw_t$$

Consequence: Fokker-Planck equation

How do you describe the probability distribution of a SDE?

$$dx_t = f(x_t,t)dt + g(t)dw_t$$

For any test function h(x),

$$\frac{d}{dt}E_{p_t}h(x) = \int_X -h(x)\partial_x(p_t(x)f(x_t, t)) + 1/2 h(x) g^2(t)\partial_x^2(p_t(x)) dx$$

Also,

$$\frac{d}{dt}E_{p_t}h(x) = \int_X h(x) \frac{d}{dt}p_t(x)$$
### Visual Description
The slide is titled "A bit of stochastic calculus". Below the title, a large equation is presented in a blue rectangular box. Following this, there's text stating "Consequence: Fokker-Planck equation" and a question "How do you describe the probability distribution of a SDE?". An SDE equation is then shown. The text "For any test function h(x)," precedes an integral equation. The word "Also," introduces another integral equation.
---

## Page 19
### Content
A bit of stochastic calculus

$$dh(x_t,t) = \left(\partial_t h+\partial_x h f(x,t)+\frac{1}{2}\partial_x^2 h g^2(t)dt\right) dt + \partial_x h g(t)dw_t$$

Consequence: Fokker-Planck equation

How do you describe the probability distribution of a SDE?

$$dx_t = f(x_t,t)dt + g(t)dw_t$$

$$\partial_t p_t(x_t) = -(\partial_x(p_t(x)f(x, t)) + \frac{1}{2}g^2(t)\partial_x^2 p_t(x_t))$$
### Visual Description
The slide is titled "A bit of stochastic calculus". Below the title, a large equation is presented in a blue rectangular box. Following this, there's text stating "Consequence: Fokker-Planck equation" and a question "How do you describe the probability distribution of a SDE?". An SDE equation is then shown. At the bottom of the slide, another equation, representing the Fokker-Planck equation, is displayed within a blue rectangular box.
---

## Page 20
### Content
$$\partial_t p_t(x_t) = -(\partial_x(p_t(x)f(x,t)) + \frac{1}{2}g^2(t)\partial_x^2 p_t(x_t))$$

Anderson's result

How do you describe the reverse SDE?

By Fokker-Planck equation of $dx_t = f(x_t, t)dt + g(t)dw_t$

$$p_{t+dt}(x) \approx p_t(x) - (f(x, t)p_t(x_t))' dt + \frac{1}{2}g^2(t)p_t''(x_t)dt$$

Hence, $p_{t-dt}(x) \approx p_t(x) + (f(x_t, t)p_t(x_t))'dt-\frac{1}{2}g^2(t)p_t''(x_t)dt$

We'd like to find some SDE $dx_t = a(x_t, t)dt + b(t)dw_t$ such that its Fokker-Planck equation matches the above.

Consider plugging in Anderson values: $a(x_t, t) = -f(x_t, t) + g^2(t)\nabla_x \log p_t(x_t)$
$b(t) = g(t)$

We get: $(a(x_t, t)p_t(x_t))' = -(f(x_t, t)p_t(x_t))' + g^2(t)(p_t)''$
### Visual Description
The slide starts with a blue rectangular box containing a Fokker-Planck equation. Below it, the title "Anderson's result" is displayed. The slide then presents text explaining how to describe the reverse SDE, followed by two approximate equations for $p_{t+dt}(x)$ and $p_{t-dt}(x)$. Further text describes the goal of finding an SDE that matches the Fokker-Planck equation, and then introduces Anderson's values for $a(x_t, t)$ and $b(t)$, concluding with an equation derived from plugging in these values.
---

## Page 21
### Content
Recall: Sampling from DSM estimator

Go through temperatures from high to low;
Use convergence point of prior temperature as a warm start.

**Algorithm 1 Annealed Langevin dynamics.**
Require: $\{\sigma_i\}_{i=1}^L, \epsilon, T.$
1: Initialize $\tilde{x}_0$
2: for $i \leftarrow 1$ to $L$ do
3: $\alpha_i \leftarrow \epsilon \cdot \sigma_i^2 / \sigma_L^2$
   $\alpha_i$ is the step size.
4: for $t \leftarrow 1$ to $T$ do
5: Draw $z_t \sim N(0, I)$
6: $\tilde{x}_t \leftarrow \tilde{x}_{t-1} + \frac{\alpha_i}{2}s_\theta(\tilde{x}_{t-1},\sigma_i) + \sqrt{\alpha_i} z_t$
7: end for
8: $\tilde{x}_0 \leftarrow \tilde{x}_T$
9: end for
return $\tilde{x}_T$

Figure from Song-Ermon '19
### Visual Description
The slide is titled "Recall: Sampling from DSM estimator". Two lines of text provide context for the algorithm. A large box contains "Algorithm 1 Annealed Langevin dynamics." with pseudo-code steps for an iterative process involving initialization, loops, drawing from a normal distribution, and updating $\tilde{x}_t$. A small note "$\alpha_i$ is the step size." is next to step 3. At the bottom, there's a citation "Figure from Song-Ermon '19".
---

## Page 22
### Content
Sampling by solving the reverse SDE

Once we have a score function, we can just solve the SDE !

In fact, we already saw a (simple) way to solve it by a (Euler-Maruyama) discretization (choosing small negative step size $\Delta t$) :

$$\Delta \mathbf{x} \leftarrow [\mathbf{f}(\mathbf{x},t) - g^2(t)\mathbf{s}_\theta(\mathbf{x},t)]\Delta t + g(t)\sqrt{|\Delta t|}\mathbf{z}_t$$
$$\mathbf{x} \leftarrow \mathbf{x} + \Delta \mathbf{x}$$
$$t \leftarrow t + \Delta t,$$

Note the resemblance to the algorithm on the prior slide: we move in the direction of the score + add some Gaussian noise.

(The difference is that here we update t as well at every step.)
### Visual Description
The slide is titled "Sampling by solving the reverse SDE". Text explains that once a score function is available, the SDE can be solved, specifically mentioning the Euler-Maruyama discretization. A blue rectangular box contains three lines of mathematical updates for $\Delta \mathbf{x}$, $\mathbf{x}$, and $t$. Below the box, two text notes comment on the resemblance to a previous algorithm and highlight the update of $t$.
---

## Page 23
### Content
Sampling by solving the reverse SDE

Once we have a score function, we can just solve the SDE !

In fact, we already saw a (simple) way to solve it by a (Euler-Maruyama) discretization (choosing small negative step size $\Delta t$) :

$$\Delta \mathbf{x} \leftarrow [\mathbf{f}(\mathbf{x},t) - g^2(t)\mathbf{s}_\theta(\mathbf{x},t)]\Delta t + g(t)\sqrt{|\Delta t|}\mathbf{z}_t$$
$$\mathbf{x} \leftarrow \mathbf{x} + \Delta \mathbf{x}$$
$$t \leftarrow t + \Delta t,$$

You can use other (more sophisticated) solvers, e.t.
Milstein, Runge-Kutta, etc.
### Visual Description
The slide is titled "Sampling by solving the reverse SDE". Text explains that once a score function is available, the SDE can be solved, specifically mentioning the Euler-Maruyama discretization. A blue rectangular box contains three lines of mathematical updates for $\Delta \mathbf{x}$, $\mathbf{x}$, and $t$. Below the box, a text note lists other more sophisticated solvers like Milstein and Runge-Kutta.
---

## Page 24
### Content
Sampling by solving the reverse SDE

There is another common way solver method called "predictor-corrector", proposed by (Song et al, 2021).

The idea is to "correct" the numerical solver for the SDE by running Langevin with the estimated score function:

1: $\mathbf{x}_N \sim N(0, \sigma_{\text{max}}^2 I)$
2: for $i = N - 1$ to $0$ do
3: $\mathbf{x}_i' \leftarrow \mathbf{x}_{i+1} + (\sigma_{i+1}^2 - \sigma_i^2)\mathbf{s}_\theta^*(\mathbf{x}_{i+1}, \sigma_{i+1})$
4: $\mathbf{z} \sim N(0, I)$
5: $\mathbf{x}_i \leftarrow \mathbf{x}_i' + \sqrt{\sigma_{i+1}^2 - \sigma_i^2}\mathbf{z}$
6: for $j = 1$ to $M$ do
7: $\mathbf{z} \sim N(0, I)$
8: $\mathbf{x}_i \leftarrow \mathbf{x}_i + \epsilon_i \mathbf{s}_\theta^*(\mathbf{x}_i, \sigma_i) + \sqrt{2\epsilon_i}\mathbf{z}$
9: return $\mathbf{x}_0$

Predictor, Euler-Maruyama integration
Corrector, Langevin sampler
### Visual Description
The slide is titled "Sampling by solving the reverse SDE". Text introduces a "predictor-corrector" solver method proposed by Song et al. (2021) and explains its purpose. A large block of pseudo-code outlines the algorithm. Two blue arrows point from specific sections of the pseudo-code to text labels: one indicating "Predictor, Euler-Maruyama integration" and the other "Corrector, Langevin sampler".
---
## Page 25
### Content
"Derandomizing" the SDE

Another surprising result is that one can simulate the SDE by an ODE (=ordinary differential equation), which is a deterministic process!

$$dx = [\mathbf{f}(\mathbf{x}, t) - g^2(t)\nabla_x \log p_t(\mathbf{x})]dt + g(t)d\mathbf{w}$$
$$\downarrow$$
$$dx = [\mathbf{f}(\mathbf{x},t) - \frac{1}{2}g^2(t)\nabla_x \log p_t(\mathbf{x})] dt$$

**Claim:** if you start with $\mathbf{x}_0 \sim p_0$, and we run either of the two processes above, $\mathbf{x}_T$ follows the same distribution (for any $T$).

Thus, we could also try to solve the ODE instead of the SDE!

This seems to result in faster sample generator, worse quality samples.
### Visual Description
The slide has a title "Derandomizing" the SDE. Below the title, there is a paragraph of text explaining that SDE can be simulated by an ODE. This is followed by two mathematical equations for $dx$, stacked vertically with a downward arrow between them, indicating a transformation. The first equation includes a $d\mathbf{w}$ term, while the second does not. Below the equations, there is a bolded "Claim" followed by a paragraph of text explaining the implication for the distribution of $\mathbf{x}_T$. The slide concludes with two more lines of text about the implications for sample generation.
---
## Page 26
### Content
"Derandomizing" the SDE

You can also use this characterization for evaluating the likelihood of the model (to evaluate model quality).

Remember the change of variables formula:

If we are pushing forward a density $\phi$ through a map $g$, then the new density can be described as:

$$P_g(\mathbf{x}) = \phi(g^{-1}(\mathbf{x}))|\det(J_x(g^{-1}(\mathbf{x})))|$$

There's an infinitesimal/instantaneous version of this formula:
if $d\mathbf{x} = \mathbf{f}_\theta(\mathbf{x}, t) dt$, then

$$\log p_0(\mathbf{x}(0)) = \log p_T(\mathbf{x}(T)) + \int_0^T \nabla \cdot \mathbf{f}_\theta(\mathbf{x}(t), t)dt$$

There are ways to make this more efficient in high dimensions, e.g. Hutchinson trace estimator.
### Visual Description
The slide has the title "Derandomizing" the SDE. Below the title, there are two paragraphs of text. The first explains the use of characterization for likelihood evaluation. The second introduces the "change of variables formula". This is followed by a highlighted mathematical equation for $P_g(\mathbf{x})$. Below this, another paragraph introduces an "infinitesimal/instantaneous version" of the formula, followed by a large integral equation for $\log p_0(\mathbf{x}(0))$. The slide concludes with a line of text mentioning methods for efficiency.
---
## Page 27
### Content
A VAE view of
diffusion models

![Figure 2: The directed graphical model considered in this work.](image_page_27.png)
Figure 2: The directed graphical model considered in this work.
Figure from Ho et al ('20)

Let's denote the (discretized) forward process by $q$, the backward (which we learn) $p_\theta$.

You can think of this as a (infinite, in the diffusion limit) VAE with a fixed encoder.
### Visual Description
The slide has the title "A VAE view of diffusion models". Below the title is a prominent directed graphical model diagram. The diagram shows a sequence of states from $X_T$ to $X_0$, with intermediate states $X_t$ and $X_{t-1}$. Arrows indicate transitions, with $p_\theta(X_{t-1}|X_t)$ for the backward process and $q(X_t|X_{t-1})$ for the forward process. $X_T$ and $X_t$ are depicted with noisy images, while $X_0$ shows a clear face. A caption "Figure 2: The directed graphical model considered in this work." and its source "Figure from Ho et al ('20)" are below the diagram. The slide concludes with two paragraphs of text explaining the forward/backward processes and the VAE analogy.
---
## Page 28
### Content
A VAE view of
diffusion models

![Figure 2: The directed graphical model considered in this work.](image_page_28.png)
Figure 2: The directed graphical model considered in this work.
Figure from Ho et al ('20)

Let's denote the (discretized) forward process by $q$, the backward (which we learn) $p_\theta$.

Let's consider: $q(\mathbf{x}_t|\mathbf{x}_{t-1}) := \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t}\mathbf{x}_{t-1}, \beta_t\mathbf{I})$
Let's parametrize the backward diffusion as: $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) := \mathcal{N}(\mathbf{x}_{t-1}; \mu_\theta(\mathbf{x}_t, t), \Sigma_\theta(\mathbf{x}_t, t))$
### Visual Description
The slide has the title "A VAE view of diffusion models". Below the title is a prominent directed graphical model diagram, identical to the one on page 27. It shows a sequence of states from $X_T$ to $X_0$, with intermediate states $X_t$ and $X_{t-1}$, and arrows indicating transitions with $p_\theta(X_{t-1}|X_t)$ and $q(X_t|X_{t-1})$. A caption "Figure 2: The directed graphical model considered in this work." and its source "Figure from Ho et al ('20)" are below the diagram. The slide then presents a paragraph of text defining the forward and backward processes. This is followed by two mathematical equations defining $q(\mathbf{x}_t|\mathbf{x}_{t-1})$ and $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)$ as normal distributions.
---
## Page 29
### Content
A VAE view of
diffusion models

Let's consider: $q(\mathbf{x}_t|\mathbf{x}_{t-1}) := \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t}\mathbf{x}_{t-1}, \beta_t\mathbf{I})$
Let's parametrize the backward diffusion as: $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) := \mathcal{N}(\mathbf{x}_{t-1}; \mu_\theta(\mathbf{x}_t, t), \Sigma_\theta(\mathbf{x}_t, t))$

You can try to train this using a variational approximation of likelihood:

$$E_q\left[\underbrace{D_{KL}(q(\mathbf{x}_T|\mathbf{x}_0) || p(\mathbf{x}_T))}_{L_T} + \sum_{t>1}\underbrace{D_{KL}(q(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0) || p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t))}_{L_{t-1}} - \underbrace{\log p_\theta(\mathbf{x}_0|\mathbf{x}_1)}_{L_0}\right]$$

Unlike a standard VAE, all the terms in the above sum have a closed form:

$$q(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0) = \mathcal{N}(\mathbf{x}_{t-1}; \tilde{\mu}_t(\mathbf{x}_t, \mathbf{x}_0), \tilde{\beta}_t\mathbf{I}),$$
where $\tilde{\mu}_t(\mathbf{x}_t, \mathbf{x}_0) := \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_t}{1 - \bar{\alpha}_t}\mathbf{x}_0 + \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t}\mathbf{x}_t$ and $\tilde{\beta}_t := \frac{1 - \bar{\alpha}_{t-1}}{1 - \bar{\alpha}_t}\beta_t$
### Visual Description
The slide has the title "A VAE view of diffusion models". Below the title, there is a blue-bordered box containing two mathematical equations, which define $q(\mathbf{x}_t|\mathbf{x}_{t-1})$ and $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)$ as normal distributions. Following this, a paragraph of text introduces the concept of training using a variational approximation of likelihood. This is immediately followed by a large equation representing the ELBO (Evidence Lower Bound) with three terms, $L_T$, $L_{t-1}$, and $L_0$, explicitly labeled. Another paragraph states that, unlike standard VAEs, all terms in the sum have a closed form. The slide concludes with two more equations, defining $q(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0)$ and its parameters $\tilde{\mu}_t$ and $\tilde{\beta}_t$.
---
## Page 30
### Content
A VAE view of
diffusion models

Let's consider: $q(\mathbf{x}_t|\mathbf{x}_{t-1}) := \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t}\mathbf{x}_{t-1}, \beta_t\mathbf{I})$
Let's parametrize the backward diffusion as: $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) := \mathcal{N}(\mathbf{x}_{t-1}; \mu_\theta(\mathbf{x}_t, t), \Sigma_\theta(\mathbf{x}_t, t))$

With some (a bit painful) derivation, you can rewrite ELBO as:

$$E_{\mathbf{x}_0, \epsilon}\left[\frac{\beta_t^2}{2\sigma_t^2\alpha_t(1 - \bar{\alpha}_t)} \left\|\epsilon - \epsilon_\theta\left(\sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\epsilon, t\right)\right\|^2\right]$$

Where we use the reparametrization trick to write

$\mathbf{x}_t(\mathbf{x}_0, \epsilon) = \sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\epsilon$ for $\epsilon \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$

$\mu_\theta(\mathbf{x}_t, t) = \frac{1}{\sqrt{\alpha_t}}\left(\mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}}\epsilon_\theta(\mathbf{x}_t, t)\right)$
### Visual Description
The slide has the title "A VAE view of diffusion models". Below the title, there is a blue-bordered box containing two mathematical equations, which define $q(\mathbf{x}_t|\mathbf{x}_{t-1})$ and $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)$ as normal distributions. Following this, a paragraph of text states that the ELBO can be rewritten after some derivation. This is immediately followed by a large equation representing the rewritten ELBO. Another paragraph explains that the reparametrization trick is used, followed by two more equations defining $\mathbf{x}_t(\mathbf{x}_0, \epsilon)$ and $\mu_\theta(\mathbf{x}_t, t)$.
---
## Page 31
### Content
A VAE view of
diffusion models

Let's consider: $q(\mathbf{x}_t|\mathbf{x}_{t-1}) := \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t}\mathbf{x}_{t-1}, \beta_t\mathbf{I})$
Let's parametrize the backward diffusion as: $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) := \mathcal{N}(\mathbf{x}_{t-1}; \mu_\theta(\mathbf{x}_t, t), \Sigma_\theta(\mathbf{x}_t, t))$

With some (a bit painful) derivation, you can rewrite ELBO as:

$$E_{\mathbf{x}_0, \epsilon}\left[\frac{\beta_t^2}{2\sigma_t^2\alpha_t(1 - \bar{\alpha}_t)} \left\|\epsilon - \epsilon_\theta\left(\sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\epsilon, t\right)\right\|^2\right]$$

With (also a bit painful) derivation, you can rewrite score matching loss as:

$$E_{t \sim U[[1,T]], \mathbf{x}_0 \sim q(\mathbf{x}_0), \epsilon \sim \mathcal{N}(\mathbf{0},\mathbf{I})} \left[\lambda(t) \left\|\epsilon + \sigma_t s_\theta(\mathbf{x}_t, t)\right\|^2\right] + \text{const}$$
### Visual Description
The slide has the title "A VAE view of diffusion models". Below the title, there is a blue-bordered box containing two mathematical equations, which define $q(\mathbf{x}_t|\mathbf{x}_{t-1})$ and $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)$ as normal distributions. Following this, a paragraph of text states that the ELBO can be rewritten after some derivation. This is immediately followed by a large equation representing the rewritten ELBO. Another paragraph states that, with further derivation, the score matching loss can be rewritten, followed by another large equation for the score matching loss.
---
## Page 32
### Content
SDEs for NCE

We can play a similar game for NCE.

Recall the annealing strategy:

TRE (Telescoping Density Ratio Estimation, Rhodes et al '20):
Choose "temperatures" $\sigma_1, \sigma_2, ..., \sigma_L$ and train distinguishers to distinguish $p_{\sigma_i, \text{data}}$ VS $p_{\sigma_{i+1}, \text{data}}$ for $i \in [L - 1]$.

Again, we can consider an "infinitesimal" limit, where we increase the temperatures infinitesimally.
### Visual Description
The slide has the title "SDEs for NCE". Below the title, there are two paragraphs of text. The first states that a similar game can be played for NCE. The second introduces the "annealing strategy". This is followed by a highlighted box containing the definition of "TRE (Telescoping Density Ratio Estimation, Rhodes et al '20)", which describes choosing temperatures and training distinguishers. The slide concludes with a final paragraph about considering an "infinitesimal" limit.
---
## Page 33
### Content
Recap: annealing for NCE
Are all choices of $q$ created equal?
One "baseline" choice for $q$ is a Gaussian with matching mean and covariance to the data.

$\frac{p}{q} = \frac{p}{p_1} \times \frac{p_1}{p_2} \times \frac{p_2}{p_3} \times \frac{p_3}{q}$

(b) Telescoping density-ratio estimation applied to the problem in (a), using the same 10,000 samples from $p$ and $q$. Top row: a collection of ratios, where $p_1, p_2$ and $p_3$ are constructed by deterministically interpolating between samples from $p$ and $q$. Bottom row: the logistic loss function for each ratio estimation problem. Observe that the finite-sample minimisers of each objective (red dotted lines) are either close to or exactly overlapping their optima (black dotted lines). After estimating each ratio, we then combine them by taking their product.

Figure from Rhodes et al '20.
### Visual Description
The slide presents a title "Recap: annealing for NCE" and introductory text. The main content is a large figure composed of two rows of four plots each. The top row shows density ratios $p(x)/p_1(x)$, $p_1(x)/p_2(x)$, $p_2(x)/p_3(x)$, and $p_3(x)/q(x)$ as functions of $x$. Each plot displays multiple density curves (e.g., $p(x)$, $p_1(x)$, $p_2(x)$, $p_3(x)$, $q(x)$) and their ratios. The bottom row shows the corresponding logistic loss functions $\mathcal{L}(\theta_0)$, $\mathcal{L}(\theta_1)$, $\mathcal{L}(\theta_2)$, and $\mathcal{L}(\theta_3)$ as functions of $\theta$. Each loss plot shows a curve with a minimum, indicated by a black dotted line, and a finite-sample minimizer indicated by a red dotted line. A caption below the figure explains the plots in detail, describing the telescoping density-ratio estimation and the construction of $p_1, p_2, p_3$ by interpolation.
---
## Page 34
### Content
Infinitesimal limit
Main (simple) observation: telescoping sum becomes an integral in the limit of infinite number of temperatures

$\log r(\mathbf{x}) = \log \frac{p_0(\mathbf{x})}{p_1(\mathbf{x})} = \sum_{t=1}^T \log \left( \frac{p_{(t-1)/T}(\mathbf{x})}{p_{t/T}(\mathbf{x})} \right) = \int_0^1 \frac{\partial}{\partial \lambda} \log p_{\lambda}(\mathbf{x}) d\lambda.$

Idea (Choi et al, 22): estimate a "time score"

$$ \mathcal{J}_{\text{time}}(\theta) = \mathbb{E}_{p(t)} \mathbb{E}_{p_t(\mathbf{x})} \left[ \lambda(t) \left( \frac{\partial}{\partial t} \log p_t(\mathbf{x}) - s_{\theta}^{\text{time}}(\mathbf{x}, t) \right)^2 \right] $$

Given estimate of the time score, we can estimate $r$:

$$ \log r(\mathbf{x}) \approx \int_0^1 s_{\theta}^{\text{time}}(\mathbf{x}, t) dt. $$
### Visual Description
Text-only slide.
---
## Page 35
### Content
Infinitesimal limit
What does this have to do with the classification problem in NCE?

**Proposition 3.** When $T \to \infty$, the Bayes-optimal classifier between two adjacent bridge distributions $p_{t/T}(\mathbf{x})$ and $p_{(t+1)/T}(\mathbf{x})$ for any $t \in [0,1]$ is:

$$ h_{\theta}^*(\mathbf{x},t) = \frac{1}{2} + \frac{1}{4} \left( \frac{\partial}{\partial t} \log p_t(\mathbf{x}) \right) \Delta t + o(\Delta t). \quad (9) $$

where $\Delta t = \frac{1}{T}$, and $h_{\theta}^*(\mathbf{x},t) \in [0, 1]$ is a conditional probabilistic classifier.

In fact, something similar holds about the cross-entropy loss too:

**Proposition 4.** Let $\Delta t = 1/T$ and parameterize the binary classifier as $h_{\theta}(\mathbf{x},t) = \frac{1}{2} + \frac{1}{4} s_{\theta}^{\text{time}}(\mathbf{x},t)\Delta t$, where $s_{\theta}^{\text{time}}(\mathbf{x},t) \approx \frac{\partial}{\partial t} \log p_t(\mathbf{x})$ denotes a time score model. Then from the binary cross-entropy objective:

$\arg \max \mathbb{E}_{p_t(\mathbf{x})} [\log(1 - h_{\theta}(\mathbf{x}, t))] + \mathbb{E}_{p_{t+\Delta t}(\mathbf{x})} [\log h_{\theta}(\mathbf{x}, t)]$

$$ = \arg \max_{\theta} - \frac{1}{4} (\Delta t)^2 \mathbb{E}_{p_t(\mathbf{x})} \left[ s_{\theta}^{\text{time}}(\mathbf{x},t) - \frac{\partial}{\partial t} \log p_t(\mathbf{x}) \right]^2 + o((\Delta t)^2) $$
### Visual Description
Text-only slide.
---
## Page 36
### Content
Infinitesimal limit
Finally, how do we train this? We don't have access to $\partial_t \log p_t(\mathbf{x})$
Again, integration by parts comes in handy:

$$ \mathcal{L}_{\text{time}}(\theta) = 2\mathbb{E}_{q(\mathbf{x})} [\lambda(0) s_{\theta}^{\text{time}}(\mathbf{x}, 0)] - 2\mathbb{E}_{p(\mathbf{x})} [\lambda(1) s_{\theta}^{\text{time}}(\mathbf{x}, 1)] + \mathbb{E}_{p(t)} \mathbb{E}_{p_t(\mathbf{x})} \left[ 2\lambda(t) \frac{\partial}{\partial t} s_{\theta}^{\text{time}}(\mathbf{x}, t) + 2\lambda'(t) s_{\theta}^{\text{time}}(\mathbf{x}, t) + \lambda(t) s_{\theta}^{\text{time}}(\mathbf{x}, t) \right] $$

Various variance-reduction tricks needed to get this to work in practice.
### Visual Description
Text-only slide.
---
