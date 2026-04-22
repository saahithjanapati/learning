# HW4_recitation_beyond_likelihood

Source: `materials/archive/HW4_recitation_beyond_likelihood.pdf`
Duplicate equivalents: `HW4_recitation_beyond_likelihood.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 23

## Page 1
### Content
HW4 Recitation: GANs,
Score Matching, NCE

Stephan Xie
with slides adapted from Karthik Srinivas
April 3rd, 2026
### Visual Description
A title slide with the main title "HW4 Recitation: GANs, Score Matching, NCE" in a large serif font. Below it, in a smaller font, are the presenter's name "Stephan Xie", an acknowledgment "with slides adapted from Karthik Srinivas", and the date "April 3rd, 2026".
---

## Page 2
### Content
Outline

*   GANs
    *   Motivation
    *   DC-GAN
    *   Lower bound formulation
*   Score Matching
    *   Motivation
    *   Hyvärinen's divergence objective
    *   Sliced score matching
    *   Denoising score matching
*   Noise Contrastive Estimation
    *   Motivation
    *   Objective
### Visual Description
A slide titled "Outline" with three main bullet points: "GANs", "Score Matching", and "Noise Contrastive Estimation". Each main point has several sub-bullet points detailing specific topics to be covered within that section.
---

## Page 3
### Content
VAEs did not generate realistic samples!

The problem
Samples are blurry, though they capture some high-level structure.
Some hypotheses for what goes wrong:

**Strong metric:** VAEs try to match the input distribution in KL divergence, which is quite a strong metric.

**Poor posteriors:** The posteriors in a VAE are Gaussian – very poor modeling power, e.g. cannot model multimodal distributions.

**Max-likelihood encourages averaging:**
finding the max-likelihood q to fit a distribution p is equivalent to minimizing KL(p||q) (by expanding the def. of KL = $E_p \log p - E_p \log q$).

Recall from when we talked about variational methods: this KL tends to "average" modes.

KL(p||q)
### Visual Description
A text-heavy slide discussing why VAEs did not generate realistic samples. It lists three hypotheses: "Strong metric", "Poor posteriors", and "Max-likelihood encourages averaging". On the bottom right, there is a small contour plot showing two distinct distributions (red and blue lines) with an overlapping region, labeled "KL(p||q)".
---

## Page 4
### Content
What's the right way to match the image data distribution?

Matching a distribution on images is hard because we don't have good measures of "distance" between images.
(Intuitively, two images could be very different in pixel space, while "semantically" being the same image.)

Example: comparing images in L2 space
Top left: Original image

Which of the three other images is closest in L2 space?

https://bartwronski.com/2021/07/06/comparing-images-in-frequency-domain-spectral-loss-does-it-make-sense/
### Visual Description
The slide asks "What's the right way to match the image data distribution?". It explains the difficulty of defining "distance" between images. A large image occupies the bottom left, showing a 2x2 grid of architectural patterns. The top-left image is labeled "Original image". The text poses a question: "Which of the three other images is closest in L2 space?". A URL is provided at the bottom.
---

## Page 5
### Content
Why don't we just learn the "distance"?

Game theoretic idea:
Generator trained to fool discriminator.
Discriminator trained to beat generator.
### Visual Description
A diagram illustrating the game-theoretic idea behind GANs. On the left, a "Discriminator" box is shown, connected to two sources: a "Mona Lisa" image (representing real data) and a "Generator" box. The "Generator" takes "White noise" as input. The discriminator's output is labeled "Real or generated?". On the right, two stylized images of Mona Lisa are shown, likely representing generated outputs. Text on the right explains the "Game theoretic idea": "Generator trained to fool discriminator. Discriminator trained to beat generator."
---

## Page 6
### Content
DC-GAN: A “logistic"-like GAN formulation

Min-max problem:
*   Min-player: generators $g \in G$; Max-player: discriminators $f \in F, f(x) \in [0,1]$.
*   Samples from image distr. $P_{real}$. Unif. distribution over samples: $P_{samples}$
*   $P_g$ - generator distribution: $Z \sim N(0,I) \rightarrow g(Z)$

Training loss:
$$ \min_{g \in G} \max_{f \in F} \mathbb{E}_{x \sim p_{samples}} \log f(x) + \mathbb{E}_{x \sim p_g} \log(1 - f(x)) $$

For a fixed generator $g$, the optimal $f$ is:
$$ f(x) = \frac{p_{samples}(x)}{p_{samples}(x) + p_g(x)} $$
### Visual Description
Text-only slide explaining the DC-GAN formulation. It outlines the "Min-max problem" with bullet points defining the min-player, max-player, sample sources, and generator distribution. A shaded box contains the "Training loss" formula. Another shaded box below it presents the formula for the optimal discriminator $f(x)$ for a fixed generator $g$.
---

## Page 7
### Content
How can we bound the discriminator's effect?

Discriminator Objective
$$ J(D) = \mathbb{E}_{x \sim p_{data}} [\log D(x)] + \mathbb{E}_{x \sim p_g} [\log(1 - D(x))]. $$

*   The expectation decomposes pointwise:
$$ J(D) = \int [p_{data}(x) \log D(x) + p_g(x) \log(1 - D(x))]dx. $$

*   Maximize the integrand
    $h(D(x)) = p_{data}(x) \log D(x) + p_g(x)\log(1 - D(x)).$
*   Take derivative:
### Visual Description
Text-only slide detailing how to bound the discriminator's effect. It presents the "Discriminator Objective" $J(D)$ as an expectation. It then shows how this expectation decomposes pointwise into an integral. Finally, it introduces the integrand $h(D(x))$ to be maximized and states the next step is to "Take derivative".
---

## Page 8
### Content
Optimal Discriminator

Interpretation
$D^*(x)$ estimates the probability that a sample $x$ came from the true data rather than the generator.

$$ \frac{dh}{dD} = \frac{p_{data}(x)}{D(x)} - \frac{p_g(x)}{1 - D(x)} = 0. $$

$$ D^*(x) = \frac{p_{data}(x)}{p_{data}(x) + p_g(x)} $$
### Visual Description
Text-only slide presenting the "Optimal Discriminator". It provides an interpretation of $D^*(x)$ as the probability that a sample came from true data. Below this, it shows the derivative of $h$ with respect to $D$ set to zero, and then the resulting formula for the optimal discriminator $D^*(x)$ in a boxed equation.
---
## Page 9
### Content
Generator's new objective - minimize JS divergence
Substitute $m(x)$ into the expression:

$V(D^*, G) = – \log 4 + KL(p_{data}|| m) + KL(p_g||m).$
$m(x) = \frac{1}{2} (P_{data}(x) + p_g(x)).$

Therefore,

$V(D^*, G) = – \log 4+2 JS(p_{data}||p_g),$

where the Jensen-Shannon divergence is

$JS(P||Q) = \frac{1}{2}KL(P||\frac{P+Q}{2}) + \frac{1}{2}KL(Q||\frac{P+Q}{2}).$

The generator therefore minimizes

$G^* = \arg \min_G JS(P_{data}||p_g),$

and the minimum is achieved when $p_g = P_{data}.$
### Visual Description
Text-only slide.

---

## Page 10
### Content
Q2: GANs

2. (Generative Adversarial Network) Consider the setup for W-GAN s.t. the class of generators $G$ is parametrized by a matrix $W \in \mathbb{R}^{d \times d}$, s.t. $G_W(z) = Wz$, and the class of discriminators $F$ is the set of all quadratic functions parametrized by a matrix $V \in \mathbb{R}^{d \times d}$, s.t $F_V(x) = x^T V x$. Furthermore, let us assume the distribution of the input data $x$ has standard Gaussian distribution. Remember, the W-GAN loss in the limit of infinite training data has the form:

$\min_{W \in \mathbb{R}^d} \max_{V \in \mathbb{R}^d} E_{x \sim N(0,I_d)} F_V(x) - E_{x' \sim P_W} F_V(x')$

where $P_W$ is the pushforward of the standard Gaussian through $G_W$, i.e. it is the distribution of $G_W(z)$ for $z \sim N(0, I_d)$. For notational convenience, we will denote the loss we are min-maxing

$L(V, W) := E_{x \sim N(0,I_d)} F_V(x) - E_{x' \sim P_W} F_V(x')$

(a) [10 pts] Show that the loss has the form

$L(V, W) = Tr(V(I – WW^T))$

Hint: The trace is cyclically invariant, that is $Tr(ABC) = Tr(BCA) = Tr(CAB)$

Can you expand $E_{x \sim N(0,I)}[x^T V x]$? What quantity is $\sum_{i,j} E[xx^T]_{ij} V_{ij}$?
### Visual Description
A slide presenting a problem about W-GANs. It includes text describing the setup, mathematical expressions for the loss function, and a specific form to be proven. Key parts like $F_V(x)$ and the target loss form are highlighted with red boxes.

---

## Page 11
### Content
Score Matching

* What's the hard part about learning a UGM?
  * Must calculate the normalizing constant

Maximum likelihood optimization: maximize the likelihood of the data under the model

$\max_\theta \sum_{\text{samples } x_i} \log p_\theta (x_i)$

The simplest way to maximize a function $f(\theta)$: gradient ascent!

$\theta_{t+1} = \theta_t + \eta \nabla f(\theta)$

Need to be able to evaluate
$\nabla \log p_\theta (x)$
### Visual Description
A text-heavy slide explaining the concept of Score Matching. It uses bullet points, equations for maximum likelihood optimization and gradient ascent, and a blue box highlighting the term `∇log p_θ(x)`.

---

## Page 12
### Content
Score matching sidesteps partition function calculation!

Can we avoid calculating $\nabla_\theta \log Z_\theta$ at every step?

Idea: we will be fitting instead
$\min_\theta E_{p_{data}} ||\nabla_x \log p_\theta (x) - \nabla_x \log p_{data} (x)||^2$

The function $\nabla_x \log P_{data} (x): \mathbb{R}^d \rightarrow \mathbb{R}^d$ is called the score function.
Note that $\nabla_x \log p_\theta(x) = \nabla_x(-E_\theta(x))$, since $\nabla_x \log Z_\theta = 0$
So, we don't need to calculate $\nabla_x \log Z_\theta$.

But, another problem: how do we calculate $\nabla_x \log P_{data} (x)$?!
(We don't even know $P_{data} (x)$, we just have samples coming from it.)
Integration by parts :(
### Visual Description
A slide explaining how score matching avoids partition function calculation. It features a blue box for the "Idea" (the minimization objective) and an orange box for "But, another problem" (calculating $\nabla_x \log P_{data}(x)$). An arrow points from the orange box to "Integration by parts :(".

---

## Page 13
### Content
After lots of rearranging...

So, the loss can be equivalently written as:
$E_{P_{data}} [||\nabla_x \log p_\theta(x)||^2 + 2 E_{P_{data}}[\text{Tr}(\nabla_x^2 \log p_\theta(x))]$

So, instead of parametrizing $\log p_\theta (x)$ we parametrize $\nabla_x \log p_\theta (x)$, for example as a neural network $s_\theta(x)$.

The training loss then becomes:
$\frac{1}{N} \sum_{\text{training data } x_i} [||s_\theta(x_i)||^2 + 2 [\text{Tr}(Ds_\theta(x_i))]]$
Jacobian of $s_\theta$
### Visual Description
A slide showing the rearranged loss function for score matching. It includes a beige box containing the equivalent loss equation and then presents the training loss when parametrizing the score function with a neural network. An arrow points from `Tr(Ds_θ(x_i))` to "Jacobian of s_θ".

---

## Page 14
### Content
Main idea: Consider a vector $a \in \mathbb{R}^d$, and a distribution $p_v$ over $v \in \mathbb{R}^d$, s.t. $E_{v \sim p_v} vv^T = I_d$. Then:

$E_{v \sim p_v}(v^T a)^2 = E_{v \sim p_v} v^T a a^T v$
$= E_{v \sim p_v} \text{Tr}(v^T a a^T v) = E_{v \sim p_v} \text{Tr}(a a^T v v^T)$
$= \text{Tr}(a a^T) = \text{Tr}(a^T a)$
$= ||a||^2_2$
cyclic property of trace

Intuition: If $v_1, v_2, ..., v_d$ are orthonormal basis, then $\sum (v^T a)^2 = ||a||^2$
Orthonormal says $VV^T = I_d$ - Holds in expectation for isotropic distribution
### Visual Description
A slide presenting a main idea with a mathematical derivation. It includes a beige box for the main idea, a 3D scatter plot of points forming a sphere, and a series of equations demonstrating the derivation of $||a||^2_2$. An arrow points to "cyclic property of trace".

---

## Page 15
### Content
Sliced score matching – more efficient!

* Replace the divergence with a Hutchinson trace estimator:
  $\text{div}(s) = E_{v \sim N(0,I)} [v^T Ds_\theta(x)v].$

* Sliced Score Matching objective (Li, Liu, Song 2019):
  $J_{SSM}(\theta) = E_{x \sim p_{data}} E_{v \sim N(0,I)} \left[ (v^T s_\theta(x))^2 + v^T \nabla_x(v^T s_\theta(x)) \right]$
  projected score norm projected divergence

* Only requires vector-Jacobian products (VJPs):
  $v^T \nabla_x(v^T s_\theta(x)).$

* No need for the full Jacobian of $s_\theta$.
* PyTorch can compute this efficiently via `autograd.grad`.
### Visual Description
A slide introducing Sliced Score Matching. It uses bullet points to explain the method, including the Hutchinson trace estimator and the full objective function. Labels "projected score norm" and "projected divergence" are placed below parts of the equation.

---

## Page 16
### Content
Denoising score matching

The fix due to Song-Ermon '20: Annealing!

We will fit several “smoothed” versions of $P_{data}$. Precisely, we will fit:

$P_{\sigma_i,data}(x) = P_{data}(x) * N(0, \sigma_i) = \int_\delta P_{data}(x – \delta) N(x; \delta, \sigma_i)d\delta$

for several "temperatures” $\sigma_1, \sigma_2, ..., \sigma_T$.
### Visual Description
A slide explaining Denoising Score Matching and the concept of "Annealing". It features a beige box highlighting the fix and the mathematical definition of smoothed data distributions. Below, a diagram illustrates the process: "Data distribution" ($x \sim p_{data}(x)$) with an image of a dog, passing through a "Perturbation distribution/kernel" ($q_\sigma(\tilde{x}|x)$), to a "Noise-perturbed data distribution" ($\tilde{x} \sim q_\sigma(\tilde{x})$) with a noisy image of the same dog.

---
## Page 17
### Content
Denoising avoids estimating $p_{data}$ directly!

Loss is actually simpler (which helps with scaling to large models):
Let $q_\sigma(\tilde{x}|x)$ be a Gaussian w mean $\tilde{x}$ and variance $\sigma^2 I$. (Describes distribution of "noised" version of $x$.)

Claim:
$$
\text{argmin}_\theta E_{\tilde{x} \sim p_{\sigma,data}} ||S_\theta(x) - \nabla_x \log p_{\sigma,data}(x)||^2
$$
$$
= \text{argmin}_\theta E_{x \sim p_{data}} E_{\tilde{x} \sim q_\sigma(\cdot|x)} ||S_\theta(x) - \nabla_x \log q_\sigma(\tilde{x}|x)||^2
$$
Since $q_\sigma(\tilde{x}|x)$ is a Gaussian density, $\log q_\sigma(\tilde{x}|x)$ is quadratic:
$$
\log q_\sigma(\tilde{x}|x) = -\frac{1}{2\sigma^2}||\tilde{x} - x||^2 + \text{const}
$$
Hence, $\nabla_x \log q_\sigma(\tilde{x}|x)$ is explicit: $\nabla_x \log q_\sigma(\tilde{x}|x) = \frac{1}{\sigma^2}(\tilde{x} - x)$
### Visual Description
The slide has a title at the top. Below it, there's a block of text, followed by a large orange-highlighted box containing two lines of mathematical equations for `argmin`. Below this box, there's more text and two lines of mathematical equations.
---
## Page 18
### Content
Q1

Recall, an exponential family of distributions is a set of distributions $\{p_\theta : \theta \in \mathbb{R}^k\}$, described by the sufficient statistics for the family $T(x) : \mathbb{R}^d \to \mathbb{R}^k$. The members of the family have the form
$p_\theta(x) : \mathbb{R}^d \to \mathbb{R}; p_\theta(x) \propto \exp(\langle \theta, T(x) \rangle)$

You can always assume in this problem that the functions $T(x)$ are twice differentiable, and such that the partition function is finite (that is, $\int_{x \in \mathbb{R}^d} \exp(\langle \theta, T(x) \rangle) < \infty$).

(a) [10 pts] Consider first score matching. Let us parametrize the score function as $s_\theta(x) = DT(x)\theta$, where $DT(x) \in \mathbb{R}^{d \times k}$ denotes the Jacobian of function $T(x)$ and $\theta \in \mathbb{R}^k$ is the (unknown) vector of parameters we are training. Suppose we are given samples $x_1, x_2, \dots, x_N$ from some distribution $p_{data}$. Find the closed-form solution of the minimum of the score-matching loss:
$$
\text{argmin}_\theta \frac{1}{N} \sum_{i=1}^N \left( ||s_\theta(x_i)||^2 + 2\text{Tr}(Ds_\theta(x_i)) \right)
$$
where $Ds_\theta$ denotes the Jacobian of $s_\theta$.

Work by expanding the first and second parts of the sum. What is the Jacobian with respect to? What are we maximizing?
### Visual Description
The slide starts with "Q1" in the top left. Below it, there are several paragraphs of text, including a problem description and a mathematical equation for the `argmin` of a sum. The last paragraph asks questions.
---
## Page 19
### Content
Noise Contrastive Estimation

* Goal: Fit an unnormalized model
  $p_\theta(x) = \exp(f_\theta(x) - c)$, $c = \log Z_\theta$.
* Replace density estimation with a binary classification problem.
* Distinguish samples from:
    * Data distribution $p(x)$ (label 1)
    * Noise distribution $q(x)$ (label 0)
### Visual Description
The slide has a title "Noise Contrastive Estimation" at the top. Below it, there are three bullet points, with the second and third points having nested bullet points. The first bullet point includes a mathematical equation.
---
## Page 20
### Content
NCE Objective

The NCE objective (data $x_i \sim p$, noise $\tilde{x}_{ij} \sim q$):
$$
\mathcal{L}_{NCE}(\theta, c) = \sum_{i=1}^n \log \frac{\exp(f_\theta(x_i) - c)}{\exp(f_\theta(x_i) - c) + k q(x_i)} + \sum_{i=1}^n \sum_{j=1}^k \log \frac{k q(\tilde{x}_{ij})}{\exp(f_\theta(\tilde{x}_{ij}) - c) + k q(\tilde{x}_{ij})}
$$
Why k times more noise samples?

* First term: log-probability of labeling data as "real".
* Second term: log-probability of labeling noise as "noise".
### Visual Description
The slide has a title "NCE Objective" at the top. Below it, there's a line of text introducing the objective, followed by a large mathematical equation spanning multiple lines. To the right of the equation, there's a question in a box. Below the equation, there are two bullet points explaining the terms.
---
## Page 21
### Content
What's so different about NCE?

"Counterexample" for maximum likelihood:
$E_{x \sim p_{data}(x)} [\log p_\theta(x)]$
$= E_{x \sim p_{data}(x)} [E_\theta(x) - \log Z_\theta]$
$= E_{x \sim p_{data}(x)} [E_\theta(x) - c]$?

NCE: Change problem of learning data distribution over
$p(x)$ (large support, hard partition)
to one over
$p(y|x)$ (support 1, no partition)
### Visual Description
The slide has a title "What's so different about NCE?" at the top. Below it, on the left, there's a "Counterexample" section with three lines of mathematical equations. On the right, there's a light blue box containing text that contrasts NCE with traditional maximum likelihood.
---
## Page 22
### Content
If we find the right c, we know our loss is minimized

Main Theorem of Noise Contrastive Estimation:
Consider parametrizing $D_{E,c}(x) := r_k(E(x) - c - \log q(x))$

The minimizer of
$$
L(D_{E,c}) = E_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D_{E,c}(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log (1 - D_{E,c}(x)) \right]
$$
is such that $p_{data}(x) = \exp(f(x)) = \exp(E(x) - c)$

Note this is a kind of "nonparametric" result: we are optimizing in the space of all functions (as opposed to fixing a parametric family for $E(x)$)
### Visual Description
The slide has a title at the top. Below it, there's a large light blue box containing the "Main Theorem of Noise Contrastive Estimation", which includes text and a multi-line mathematical equation for $L(D_{E,c})$. Below the box, there's a paragraph of explanatory text.
---
## Page 23
### Content
Q1c

First, consider the maximum likelihood loss
$L_{MLE}(\theta) = -E_{p_{data}} \log p_\theta(x)$

If $p_{data} = p_{\theta^*}$, the minimum of this loss, as well as the minimum of the NCE loss will be reached at $\theta^*$.

Let's further assume that $E_{p_{\theta^*}}[T(x)] = 0$ (zero vector). Show that the Hessian at $\theta^*$ matches the Hessian of the NCE loss when $q = p_{data}$, up to a constant scaling, that is, there exists $c > 0$ such that:
$$
\nabla^2 L_{MLE}(\theta^*) = c \cdot \nabla^2 L_{NCE}(\theta^*)
$$
Hint: For MLE, the partition function is not a parameter we are optimizing over like in NCE. In other words, when calculating derivatives and Hessians, you need to take into account the dependence of $Z_\theta$ on $\theta$.
### Visual Description
The slide starts with "Q1c" in the top left. Below it, there are several paragraphs of text, including a mathematical equation for $L_{MLE}(\theta)$ and another equation showing the relationship between the Hessians. The last paragraph provides a hint.
---
