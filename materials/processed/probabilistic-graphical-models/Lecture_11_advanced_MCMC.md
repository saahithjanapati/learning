# Lecture_11_advanced_MCMC

Source: `materials/archive/Lecture_11_advanced_MCMC.pdf`
Duplicate equivalents: `Lecture_11_advanced_MCMC.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 59

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 11:
Markov Chains:
dealing with high dimensions,
multimodality
### Visual Description
Text-only slide.
---
## Page 2
### Content
Reminder: stationary distribution

Stationary distribution: a distribution $\pi = (\pi_1, ... \pi_{|X|})$ is stationary for a Markov walk if $\pi T = \pi$.

Many Markov Chains have unique stationary distributions: after taking many steps, starting with any distribution, we get to the same distribution
$\forall p_0, \lim_{t \to \infty} p_0 T^t = \pi$

Name of the game: if we wish to sample from some $\pi$, design a Markov Chain which has $\pi$ as stationary distribution.
If we run chain long enough (??), we can draw samples from something close to $\pi$
### Visual Description
The slide contains a title "Reminder: stationary distribution". Below it, there's a light orange box defining "Stationary distribution". Following this, there's explanatory text and a mathematical limit expression. At the bottom, a light green box outlines the "Name of the game" and its implication.
---
## Page 3
### Content
Obstructions to fast mixing time

So far, we've only worried about designing chains s.t. $\forall p_0, \lim_{t \to \infty} p_0 T^t = \pi$
But, we're running this in practice, so want for sensible t, $\forall p_0, p_0 T^t \approx \pi$
(Appropriately formalized, this is called mixing time.)

There is no silver bullet for analyzing general transition T, there are several generic causes of torpid mixing:
### Visual Description
Text-only slide.
---
## Page 4
### Content
Curse of dimensionality

Curse of dimensionality:
Say we are running Metropolis-Hastings in high dimension.
If we want proposals to be successful with good probability: proposal has to reasonably match distribution we are sampling.
"Exponential # of directions”: In high dimension, there's an exponential number of directions to "move in" --- might be hard to "hit" the probability manifold.
"Choosing the step size": if steps are very large, likely to leave manifold. If too small, random walk moves too slowly.
### Visual Description
The left side of the slide contains text discussing the "Curse of dimensionality" in the context of Metropolis-Hastings. The right side features two abstract, blob-like shapes with small dots scattered around their edges, labeled (a). These shapes appear to illustrate probability manifolds or regions in a high-dimensional space.
---
## Page 5
### Content
Metropolis-Hastings

Random walk Metropolis-Hastings

https://chi-feng.github.io/mcmc-demo/app.html
### Visual Description
The slide displays "Metropolis-Hastings" as the main title. Below it, "Random walk Metropolis-Hastings" is written on the left, and "Open Controls" on the right. The central part of the slide features a light blue contour plot representing a probability distribution, with a circular region and an arrow indicating a step in a random walk. A URL is provided at the bottom.
---
## Page 6
### Content
How to pick MH proposals

Consider sampling from $p_{\theta}(x) = \frac{1}{Z} \exp(-E_{\theta}(x))$ with support $\mathbb{R}^d$, $E_{\theta}$ is differentiable and we can efficiently take gradients with respect to $x$.

Ball Walk:
Propose: Pick a random point $x_{t+1}$ in a ball or sphere of radius $\eta$

Remember, MH accepts points with probability $\min \left(1, \frac{p(x_{t+1})}{p(x_t)}\right)$
Hence, want to propose points with (larger or similar) probability mass
If distribution changes smoothly, cannot take $\eta$ to be too large.
Should we really treat all directions of movement the same?
(If not, which ones should we prefer??)
### Visual Description
The slide has the title "How to pick MH proposals". A light green box at the top describes the target distribution. Below, "Ball Walk" is introduced, followed by another light orange box detailing its proposal mechanism. The rest of the slide contains text explaining the MH acceptance probability and posing questions about proposal strategy.
---
## Page 7
### Content
How to pick MH proposals

Consider sampling from $p_{\theta}(x) = \frac{1}{Z} \exp(-E_{\theta}(x))$ with support $\mathbb{R}^d$, $E_{\theta}$ is differentiable and we can efficiently take gradients with respect to $x$.

Why not try to follow the direction of the gradient, to try to move to where the probability is higher?
### Visual Description
The slide has the title "How to pick MH proposals". A light green box at the top describes the target distribution. Below, a question is posed: "Why not try to follow the direction of the gradient, to try to move to where the probability is higher?". The bottom half of the slide features a contour plot showing a bimodal distribution with two distinct low-probability regions (darker centers) surrounded by concentric contours of increasing probability. A small green arrow indicates a gradient direction on one of the contours.
---
## Page 8
### Content
How to pick MH proposals

Consider sampling from $p_{\theta}(x) = \frac{1}{Z} \exp(-E_{\theta}(x))$ with support $\mathbb{R}^d$, $E_{\theta}$ is differentiable and we can efficiently take gradients with respect to $x$.

Why not try to follow the direction of the gradient, to try to move to where the probability is higher?

MALA (Metropolis Adjusted Langevin Algorithm):
Gradient descent Gaussian noise
Propose: $x_{t+1} = x_t - \eta \nabla E_{\theta}(x_t) + \sqrt{2} \eta \xi_t$
$\xi_t \sim N(0,I)$
### Visual Description
The slide has the title "How to pick MH proposals". A light green box at the top describes the target distribution. Below, a question is posed about following the gradient. This is followed by the introduction of "MALA (Metropolis Adjusted Langevin Algorithm)". A light orange box contains the MALA proposal formula, with "Gradient descent" and "Gaussian noise" labeled above its respective parts, and the distribution of $\xi_t$ specified below.
---
## Page 9
### Content
How to pick MH proposals

**Gradient descent** **Gaussian noise**
$x_{t+1} = x_t - \eta \nabla E_\theta(x_t) + \sqrt{2 \eta} \xi_t$
$\xi_t \sim N(0,1)$

Why does this make sense?

Gradient descent step attempts to make $E_\theta(x)$ smaller: since distribution is $p_\theta(x) \propto \exp(-E_\theta(x))$, tend to propose points with higher $p_\theta(x)$. (More likely to be accepted.)

Why use randomness at all?

Q: What would happen if we always propose
$x_{t+1} = x_t - \eta \nabla E_\theta(x_t)$?
### Visual Description
The slide presents the Langevin dynamics equation for picking MH proposals. The equation $x_{t+1} = x_t - \eta \nabla E_\theta(x_t) + \sqrt{2 \eta} \xi_t$ is central, with brackets and labels indicating the "Gradient descent" and "Gaussian noise" components. Below it, $\xi_t \sim N(0,1)$ is defined. The rest of the slide contains text explaining the rationale behind the gradient descent component and posing a question about the role of randomness.
---
## Page 10
### Content
How to pick MH proposals

Q: What would happen if we always propose
$x_{t+1} = x_t - \eta \nabla E_\theta(x_t)$?
### Visual Description
The slide shows two contour plots, both depicting a bimodal distribution with two distinct minima (darker regions). The top plot is labeled "Gradient descent" and the bottom is "Langevin Monte Carlo". Both plots show an arrow originating from a higher contour and pointing towards one of the minima, suggesting a path of descent. The question at the top implies a comparison between these two scenarios.
---
## Page 11
### Content
Langevin: stationary distribution

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to x.

A natural distribution to propose:

Limit (as $\eta \to 0$) of: $x_{t+1} = x_t - \eta \nabla E_\theta(x_t) + \sqrt{2 \eta} \xi_t$
$\xi_t \sim N(0,1)$

Stationary (equilibrium) distr.
$p(x) = \frac{1}{Z} \exp(-E_\theta(x))$

To be close to the limiting process, we have to take $\eta$ small. (In particular, $\eta \ll \frac{1}{d}$ even for nice distributions.)
### Visual Description
The slide contains several text boxes and an equation. The top box describes the conditions for sampling from $p_\theta(x)$. A central box presents the Langevin dynamics equation, $x_{t+1} = x_t - \eta \nabla E_\theta(x_t) + \sqrt{2 \eta} \xi_t$, with "Gradient descent" and "Gaussian noise" labels, and the definition $\xi_t \sim N(0,1)$. A lower box defines the stationary distribution $p(x)$. Additional text discusses the need for a small $\eta$.
---
## Page 12
### Content
Application: continuous-space
energy-based models (EBMs)

If the distribution $p_\theta(x) \propto \exp(-E_\theta(x))$ has as domain $\mathbb{R}^d$, an easy choice is $E_\theta$ is a neural net of some kind.

These have scaled up only very recently to real-life data, e.g. images.
### Visual Description
The slide features a large grid of small, diverse images, labeled "Figure 18: MCMC samples from conditional ImageNet128x128 models". Below the image grid, it states "Figure from (Du, Mordatch '20)". The text above discusses the application of energy-based models (EBMs) to continuous-space data like images.
---
## Page 13
### Content
Application: continuous-space energy-
based models (EBMs)

The algorithm from (Du, Mordatch '19)

**Algorithm 1 Energy training algorithm**
Input: data dist. $p_D(x)$, step size $\lambda$, number of steps $K$
$B \leftarrow \emptyset$
**while** not converged **do**
  $x^+ \sim p_D$
  $x^0 \sim B$ with 95% probability and $U$ otherwise
  $\triangleright$ Generate sample from $q_\theta$ via Langevin dynamics:
  **for** sample step $k = 1$ to $K$ **do**
    $x^k \leftarrow x^{k-1} - \nabla_x E_\theta(x^{k-1}) + \omega$, $\omega \sim N(0, \sigma)$
  **end for**
  $x_t = \Omega(x^K)$
  $\triangleright$ Optimize objective $\alpha L_2 + L_{ML}$ wrt $\theta$:
  $\Delta \theta \leftarrow -\frac{1}{N} \sum_i \alpha (E_\theta(x_i^+)^2 + E_\theta(x_i^0)^2) + E_\theta(x_i^+) - E_\theta(x_i^0)$
  Update $\theta$ based on $\Delta \theta$ using Adam optimizer
  $B \leftarrow B \cup x_t$
**end while**

Maintain buffer of previous samples to reduce mixing time
W/ some probability, start from random pt to encourage mode exploration
Langevin sampler
A bit of L2 regularization to ensure energy is somewhat smooth
### Visual Description
The slide presents "Algorithm 1 Energy training algorithm" in pseudocode on the left. Arrows point from explanatory text on the left to specific parts of the algorithm, highlighting concepts like "Maintain buffer," "encourage mode exploration," "Langevin sampler," and "L2 regularization." On the right, there is a grid of generated images labeled "Figure 2: Conditional ImageNet32x32 EBM samples."
---
## Page 14
### Content
Bottlenecks

The transition graph for the random walk could have "bottlenecks": regions from which it's hard to escape:

The conductance of a subset S is defined as:
$\Phi(S) = \frac{\sum_{i \in S, j \notin S} T_{ij}}{\sum_{i \in S} \pi_i}$

(e.g. how easy it is to leave S, given that we started in S)
(e.g. the colored sets have poor conductance)

It's clear that sets of poor $\Phi(S)$ impede mixing time:
If we start at S, even with the correct $\pi$, it'll take us long to leave S.
The distribution is "multimodal": has S's that have large probability, but are difficult to transition between.
### Visual Description
The slide features a network graph on the right, where nodes are colored into five distinct clusters (red, yellow, blue, green, purple). Connections exist within and between these clusters. On the left, text defines "bottlenecks" in a random walk and provides the formula for the conductance of a subset S, $\Phi(S) = \frac{\sum_{i \in S, j \notin S} T_{ij}}{\sum_{i \in S} \pi_i}$. The text explains how poor conductance impedes mixing time and relates it to multimodal distributions.
---
## Page 15
### Content
Multimodality and annealing
### Visual Description
Text-only slide.
---
## Page 16
### Content
Multimodality $\Rightarrow$ bottlenecks

Sharp hills are hard to climb!

Recall, peaks of p = valleys of f

(Bovier '02,'04) $\Rightarrow$ time to get from A to B (through C) can be exponential!
### Visual Description
The slide contains a 3D plot showing a surface with two deep valleys (labeled A and B) separated by a high ridge (labeled C). The y-axis is labeled f(x), and an arrow indicates movement along the x-axis. A text box "Recall, peaks of p = valleys of f" is placed near the plot. In the top right corner, a cartoon image depicts a person struggling to cycle up a very steep, rocky mountain. Text explains that the time to transition between A and B through C can be exponential.
---
## Page 17
### Content
Potential solutions for multimodality

Unlike optimization,
scale (**temperature**) matters!

Sampling flatter distributions is easier!

Can we leverage this?

Tempering/annealing: run multiple chains at different temperatures, and use the fact that chains at higher temperatures move faster through landscape.
### Visual Description
A 3D plot showing a bimodal distribution, labeled $p(x) \propto e^{-f(x)}$. The x and y axes range from -10 to 10. The z-axis (probability density) ranges from 0 to 0.08, showing two distinct peaks.
---
## Page 18
### Content
Tempering: flatten the hills

Algorithm: run multiple walks in parallel for **different temperatures**. Swap locations occasionally so lower-temp. chains explore space faster. (Occasionally = equilibrium distr. at each temperature is correct.)

Popular in practice, among other "annealing tricks" ((reverse) annealed importance sampling, tunneling...).

Little formal understanding...
### Visual Description
Three stacked 3D plots of a bimodal distribution, illustrating different "temperatures". The top plot ($p_1(x) \propto e^{-f(x)/100}$) is the flattest, representing a high temperature. The middle plot ($p_2(x) \propto e^{-f(x)/50}$) is intermediate. The bottom plot ($p(x) \propto e^{-f(x)}$) is the most peaked, representing a low temperature. Horizontal arrows within each plot show movement across modes, and vertical arrows connect corresponding modes between plots, indicating swaps.
---
## Page 19
### Content
Simulated tempering

*   Markov Chain on state space: $R^d \times [L]$. (L is # of temperatures)
*   Let $M_k$ be the Markov Chain corresponding to temperature k (i.e. with stationary distr. $p_k$)

Tempering chain:
Let current point be $(x, k)$.
*   With probability 1/2: evolve x according to $M_k$ to $x'$; Set next point to $(x',k)$.
*   With probability 1/2: pick random $k'$, set next point to $(x,k')$ with probability $\min\left(\frac{p_{k'}(x)}{p_k(x)}, 1\right)$
### Visual Description
Text-only slide.
---
## Page 20
### Content
Simulated tempering

*   Markov Chain on state space: $R^d \times [L]$. (L is # of temperatures)
*   Let $M_k$ be the Markov Chain corresponding to temperature k (i.e. with stationary distr. $p_k$)

Tempering chain.
Let current point be $(x, k)$.
*   With probability 1/2: evolve x according to $M_k$ to $x'$; Set next point to $(x',k)$.
*   With probability 1/2: pick random $k'$, set next point to $(x,k')$ with probability $\min\left(\frac{p_{k'}(x)}{p_k(x)}, 1\right)$

The stationary distribution is $P(x, k) = \frac{1}{L} p_k(x)$
### Visual Description
A text slide with two speech bubble annotations. One bubble, labeled "Run k-th chain", points to the first bullet point under "Tempering chain". The second bubble, labeled "Swap points, perform Metropolis-Hastings to preserve stationary distr.", points to the second bullet point under "Tempering chain".
---
## Page 21
### Content
Simulated tempering

Why is the stationary distribution $P(x, k) = \frac{1}{L} p_k(x)$?

Enough to check detailed balance:
$P(x, t)T((x', t'), (x, t)) = P(x', t')T((x, t), (x', t'))$

Case 1: If $t = t'$:
$\frac{1}{2L} P_t(x)T_t(x', x) = \frac{1}{2L} P_t(x')T_t(x, x')$

Case 2: If $x = x'$:
$\frac{1}{L} \frac{1}{2} P_t(x) \min\left(\frac{P_{t'}(x)}{P_t(x)}, 1\right) = \frac{1}{L} \frac{1}{2} P_{t'}(x) \min\left(\frac{P_t(x)}{P_{t'}(x)}, 1\right)$
### Visual Description
A text slide with two speech bubble annotations. One bubble, labeled "Detailed balance for $M_t$", points to the equation in Case 1. The second bubble, labeled "MH for $P_t$, with proposal $P_t$", points to the equation in Case 2.
---
## Page 22
### Content
Simulated tempering

*   Markov Chain on state space: $R^d \times [L]$. (L is # of temperatures)
*   Let $M_k$ be the Markov Chain corresponding to temperature k (i.e. with stationary distr. $p_k$)

Tempering chain.
Let current point be $(x, k)$.
*   With probability 1/2: evolve x according to $M_k$ to $x'$; Set next point to $(x',k)$.
*   With probability 1/2: pick random $k'$, set next point to $(x,k')$ with probability $\min\left(\frac{p_{k'}(x)}{p_k(x)}, 1\right)$

Some details: calculating $\frac{p_{k'}(x)}{p_k(x)}$ requires estimating partition function. See HW2.
### Visual Description
A text slide with two speech bubble annotations. One bubble, labeled "Run k-th chain", points to the first bullet point under "Tempering chain". The second bubble, labeled "Swap points, perform Metropolis-Hastings to preserve stationary distr.", points to the second bullet point under "Tempering chain". This slide is nearly identical to page 20, with an added "Some details" section at the bottom.
---
## Page 23
### Content
Why it works: take the road less hilly

*   Choose highest temp. s.t. walk converges fast. (Hills are flat)
*   Can partition space in blocks ($\approx$ modes), s.t.
    *   (1) Walk converges fast inside each block
    *   (2) Blocks aren't too small
*   $\Rightarrow$ Fast convergence for tempering.
*   Intuition: Fast inside each mode.
    *   Can get to highest temp. "parallel" mode.
    *   Can get to any other mode at highest temp.
    *   Can get to lowest temp. "parallel" mode.
### Visual Description
Three stacked 3D plots of a bimodal distribution, enclosed in a dashed pink box. The plots illustrate different "temperatures", with the top plot being the flattest (highest temperature) and the bottom plot being the most peaked (lowest temperature). Arrows within each plot show movement across modes, and vertical arrows connect corresponding modes between plots, suggesting the tempering process.
---
## Page 24
### Content
Annealed importance sampling

Multimodality isn't only a problem when sampling, it's also a problem for Monte Carlo estimation.

Suppose we are trying to estimate some quantity by importance sampling, where the proposal distribution is q and the true distribution is p.

If q doesn't "cover" p, i.e. p/q is very large in some places, the variance of the importance sampling estimator will be very large (potentially infinite).
### Visual Description
A 2D plot showing two probability distributions. A dark grey line represents a bimodal distribution ('p'). A yellow line represents a unimodal distribution ('q') that only significantly overlaps with one of the modes of 'p', illustrating a poor coverage scenario.
---
## Page 25
### Content
Annealed importance sampling

"Annealing" strategies try to parcel up the problem into easier problems.

Calculate $Z_0$
Calculate $Z_1/Z_0$
Calculate $Z_2/Z_1$
### Visual Description
The slide title is "Annealed importance sampling". Below the title, there is a sentence: ""Annealing" strategies try to parcel up the problem into easier problems." The bottom half of the slide features three 3D plots of distributions, arranged horizontally and connected by blue arrows pointing to the right. The first plot shows a broad, single-peaked distribution. The second plot shows a bimodal distribution with two distinct peaks. The third plot shows a sharper bimodal distribution with more pronounced peaks. Below each plot, there is text: "Calculate $Z_0$", "Calculate $Z_1/Z_0$", and "Calculate $Z_2/Z_1$" respectively.
---
## Page 26
### Content
Annealed importance sampling

"Annealing" strategies try to parcel up the problem into easier problems.

Suppose we are trying to calculate a partition function
$Z = \int_X \exp(-f(x))$.

Warmup: suppose we have an oracle that can return samples from distributions $p_\beta(x) = \frac{1}{Z_\beta} \exp(-\beta f(x) - (1-\beta)g(x))$ for different (inverse) temperatures $\beta \in [0,1]$.

Finally, suppose $Z_0$, the partition function for $p_0(x) \propto \exp(g(x))$ is easy to calculate.

How does this help us reduce the variance of importance sampling?
### Visual Description
The slide title is "Annealed importance sampling". Below the title, there is a sentence: ""Annealing" strategies try to parcel up the problem into easier problems." Three light blue boxes are stacked vertically, each containing text. The first box defines a partition function $Z$. The second box describes a "Warmup" scenario involving an oracle for distributions $p_\beta(x)$ at different temperatures $\beta$. The third box states that $Z_0$ for $p_0(x)$ is easy to calculate. At the bottom of the slide, a question is posed: "How does this help us reduce the variance of importance sampling?"
---
## Page 27
### Content
Annealed importance sampling

Suppose, furthermore, we have an oracle that can return samples from distributions $p_\beta(x) = \frac{1}{Z_\beta} \exp(-\beta f(x) - (1-\beta)g(x))$ for different temperatures $\beta$.

Observation 1: Ratios of nearby temperatures can be (efficiently) calculated using Monte Carlo:
$$ \frac{Z_\beta}{Z_{\beta'}} = \frac{\int_x \exp(-\beta f(x) - (1-\beta)g(x))}{\int_x \exp(-\beta' f(x) - (1-\beta')g(x))} := \frac{\int_x p_\beta^*(x)}{\int_x p_{\beta'}^*(x)} $$
$$ = \frac{1}{\int_x p_{\beta'}^*(x)} \int_x p_{\beta'}^*(x) \frac{p_\beta^*(x)}{p_{\beta'}^*(x)} = \mathbb{E}_{p_{\beta'}^*(x)} \frac{p_\beta^*(x)}{p_{\beta'}^*(x)} $$
If $|\beta - \beta'|$ is small, can calculate this efficiently using Monte Carlo.
### Visual Description
The slide title is "Annealed importance sampling". A light blue box at the top reiterates the assumption about having an oracle for distributions $p_\beta(x)$. Below this, "Observation 1" is stated, explaining that ratios of nearby temperatures can be calculated efficiently using Monte Carlo. Mathematical equations demonstrating this calculation are presented, showing the ratio of partition functions $Z_\beta / Z_{\beta'}$ expressed as an expectation. A concluding sentence states that if $|\beta - \beta'|$ is small, this calculation is efficient.
---
## Page 28
### Content
Annealed importance sampling

Suppose, furthermore, we have an oracle that can return samples from distributions $p_\beta(x) = \frac{1}{Z_\beta} \exp(-\beta f(x) - (1-\beta)g(x))$ for different temperatures $\beta$.

Observation 1: Ratios of nearby temperatures can be (efficiently) calculated using Monte Carlo:
$$ \frac{Z_\beta}{Z_{\beta'}} = \frac{\int_x \exp(-\beta f(x) - (1-\beta)g(x))}{\int_x \exp(-\beta' f(x) - (1-\beta')g(x))} := \frac{\int_x p_\beta^*(x)}{\int_x p_{\beta'}^*(x)} = \mathbb{E}_{p_{\beta'}^*(x)} \frac{p_\beta^*(x)}{p_{\beta'}^*(x)} $$
If $|\beta - \beta'|$ is small, can calculate this efficiently using Monte Carlo.
$$ \frac{p_\beta^*(x)}{p_{\beta'}^*(x)} = \exp((\beta' - \beta)f(x) + (\beta - \beta')g(x)) $$
E.g. if $|\beta - \beta'| \le \frac{1}{\max_x(\max f(x),\max g(x))}$, RHS $\in (\exp(-2), \exp(2))$
### Visual Description
The slide title is "Annealed importance sampling". A light blue box at the top reiterates the assumption about having an oracle for distributions $p_\beta(x)$. Below this, "Observation 1" is stated, explaining that ratios of nearby temperatures can be calculated efficiently using Monte Carlo. Mathematical equations demonstrating this calculation are presented, showing the ratio of partition functions $Z_\beta / Z_{\beta'}$ expressed as an expectation. A sentence states that if $|\beta - \beta'|$ is small, this calculation is efficient. Further down, another mathematical equation shows the ratio of unnormalized densities $p_\beta^*(x) / p_{\beta'}^*(x)$. The slide concludes with an example condition for $|\beta - \beta'|$ and the resulting range for the RHS.
---
## Page 29
### Content
Annealed importance sampling

Suppose, furthermore, we have an oracle that can return samples from distributions $p_\beta(x) = \frac{1}{Z_\beta} \exp(-\beta f(x) - (1-\beta)g(x))$ for different temperatures $\beta$.

Observation 2: Z can be expressed as a product of such ratios.
Consider a sequence of temperatures $0 = \beta_0 < \beta_1 < \dots < \beta_m = 1$
$$ \frac{Z}{Z_0} = \frac{Z_{\beta_m}}{Z_{\beta_0}} = \prod_{i=1}^m \frac{Z_{\beta_i}}{Z_{\beta_{i-1}}} $$
Since $Z_0$ is easy to calculate, we can calculate $Z$.

Practical problem with strategy: how do we draw samples from $p_\beta$?
### Visual Description
The slide title is "Annealed importance sampling". A light blue box at the top reiterates the assumption about having an oracle for distributions $p_\beta(x)$. Below this, "Observation 2" is stated, explaining that $Z$ can be expressed as a product of ratios. A sequence of temperatures is introduced ($0 = \beta_0 < \beta_1 < \dots < \beta_m = 1$). A mathematical equation shows how the ratio $Z/Z_0$ can be written as a product of ratios of partition functions for consecutive temperatures. A sentence follows, stating that since $Z_0$ is easy to calculate, $Z$ can be calculated. The slide concludes with a "Practical problem with strategy" question: "how do we draw samples from $p_\beta$?"
---
## Page 30
### Content
Remark: why not just use a single distribution q?

If you can evaluate normalized density:
$$ Z = \mathbb{E}_q \frac{\exp(-f(x))}{q(x)} \approx \frac{1}{N} \sum_{i=1}^N \frac{\exp(-f(x_i))}{q(x_i)}, x_i \sim q $$
When is the variance of $\frac{\exp(-f(x))}{q(x)}$ is not too large?
Note that $\frac{\exp(-f(x))}{q(x)} = Z \frac{p_1(x)}{q(x)}$. Hence, we want $\frac{p_1(x)}{q(x)} \approx 1$.

If you cannot even evaluate normalized density:
$$ \frac{1}{N} \sum_j \frac{\tilde{p}(x_j)}{\tilde{q}(x_j)} = \frac{Z_p}{Z_q} \frac{1}{N} \sum_j \frac{p(x_j)}{q(x_j)} \to \frac{Z_p}{Z_q} $$
But we don't know $Z_q$...
### Visual Description
The slide title is "Remark: why not just use a single distribution q?". The content discusses two scenarios for importance sampling. First, if normalized density can be evaluated, it shows the formula for $Z$ as an expectation and its Monte Carlo approximation. It then asks about the variance and notes that for low variance, $p_1(x)/q(x)$ should be approximately 1. Second, if normalized density cannot be evaluated, it presents a formula for the ratio of partition functions $Z_p/Z_q$ and concludes with the problem that $Z_q$ is unknown.
---
## Page 31
### Content
Remark: does the variance not explode?

Say you draw N samples per stage. How large does N need to be?

By Chebyshev:
$$ \frac{\hat{Z}_{\beta_i}}{\hat{Z}_{\beta_{i-1}}} \in \left(1 \pm \frac{b}{N}\right) \frac{Z_{\beta_i}}{Z_{\beta_{i-1}}} \text{ w.p. } 1 - O\left(\left(\frac{b}{N}\right)^2\right) $$
By a union bound, $\forall i \in [m]$,
$$ \frac{\hat{Z}_{\beta_i}}{\hat{Z}_{\beta_{i-1}}} \in \left(1 \pm \frac{b}{N}\right) \frac{Z_{\beta_i}}{Z_{\beta_{i-1}}} \text{ w.p. } 1 - O\left(m\left(\frac{b}{N}\right)^2\right) $$
Hence,
$$ \prod_{i=1}^m \frac{\hat{Z}_{\beta_i}}{\hat{Z}_{\beta_{i-1}}} = \prod_{i=1}^m \frac{Z_{\beta_i}}{Z_{\beta_{i-1}}} \left(1 \pm \frac{b}{N}\right)^m \approx \prod_{i=1}^m \frac{Z_{\beta_i}}{Z_{\beta_{i-1}}} \left(1 \pm \frac{mb}{N}\right) \text{ w.p. } 1 - O\left(m\left(\frac{b}{N}\right)^2\right) $$
Set: $\frac{mb}{N} \le \delta, m\left(\frac{b}{N}\right)^2 \le \epsilon$ for $(1+\delta)$-multiplicative approx. w.p. $1-\epsilon$
$$ N = \text{poly}\left(m, \frac{1}{\delta}, \frac{1}{\epsilon}\right) $$
### Visual Description
The slide title is "Remark: does the variance not explode?". It poses the question of how large N (samples per stage) needs to be. It then presents a bound for the ratio of estimated partition functions using Chebyshev's inequality. This is extended to a union bound for all stages. Subsequently, the product of these ratios is shown, approximating the overall ratio of partition functions. A blue box at the bottom defines conditions for a $(1+\delta)$-multiplicative approximation with probability $1-\epsilon$, and concludes with an expression for $N$ as a polynomial function of $m$, $1/\delta$, and $1/\epsilon$.
---
## Page 32
### Content
Prelude: importance sampling w/o normalization

What if we can draw samples from some distribution q, but can evaluate p,q at any point x?
$$ F = \mathbb{E}_{x \sim p} f(x) = \int_x p(x)f(x)dx = \int_x q(x) \left(f(x) \frac{p(x)}{q(x)}\right) dx $$
$$ = \mathbb{E}_q \left(f(x) \frac{p(x)}{q(x)}\right) $$
Hence, estimate $F$ by $\frac{1}{N} \sum_{i=1}^N f(x_i) \frac{p(x_i)}{q(x_i)}, x_i \sim q$

Beware: if p,q are very different, $\frac{p(x_i)}{q(x_i)}$ will vary a lot, so $f(x_i) \frac{p(x_i)}{q(x_i)}$ will have huge variance. (Hence, N needs to be huge.)
### Visual Description
The slide title is "Prelude: importance sampling w/o normalization". It begins by asking what happens if samples can be drawn from distribution $q$, and $p,q$ can be evaluated at any point $x$. Mathematical equations demonstrate how an expectation $F$ under distribution $p$ can be rewritten as an expectation under distribution $q$ using the ratio $p(x)/q(x)$. It then states that $F$ can be estimated by a sum. A blue box at the bottom provides a warning: if $p$ and $q$ are very different, the ratio $p(x_i)/q(x_i)$ will vary significantly, leading to high variance and requiring a large $N$.
---
## Page 33
### Content
Prelude: importance sampling w/o normalization

What if we can draw samples from some distribution $q$, but can evaluate unnormalized $\tilde{p}$, $\tilde{q}$ at any point $x$?

$F = E_{x \sim p} f(x) = \int_x p(x) f(x) dx = \frac{Z_q}{Z_p} \int_x q(x) \left( f(x) \frac{\tilde{p}(x)}{\tilde{q}(x)} \right) dx$

Estimate $F$ by $\sum_{i=1}^N f(x_i) \frac{\tilde{p}(x_i)}{\tilde{q}(x_i)}$, $x_i \sim q$

Why?
$\frac{1}{N} \sum_j \frac{\tilde{p}(x_j)}{\tilde{q}(x_j)} = \frac{Z_p}{Z_q} \frac{1}{N} \sum_j \frac{p(x_j)}{q(x_j)} \rightarrow \frac{Z_p}{Z_q} E_q \left[ \frac{p}{q} \right] = \frac{Z_p}{Z_q}$

Consistent, but biased estimator

Hence: $\sum_{i=1}^N f(x_i) \frac{\tilde{p}(x_i)}{\tilde{q}(x_i)} \approx \frac{Z_q}{Z_p} \sum_{i=1}^N f(x_i) \frac{\tilde{p}(x_i)}{\tilde{q}(x_i)} \rightarrow F$

### Visual Description
The slide introduces importance sampling without normalization. It presents the formula for $F$ in terms of unnormalized distributions $\tilde{p}$ and $\tilde{q}$, and then shows how to estimate $F$ using samples from $q$. It includes a "Why?" section explaining the consistency of the estimator for the ratio of normalization constants and a "Hence:" section showing the final estimator for $F$. The text "Consistent, but biased estimator" is written on the right side, next to the "Why?" section.
---

## Page 34
### Content
Annealed importance sampling

Let's try to get rid of the oracle.

Suppose we only have an oracle for sampling from $p_0(x) \propto \exp(g(x))$ with an easy to calculate partition function.

Suppose we have, for temperatures $0 = \beta_0 < \beta_1 < \dots < \beta_m = 1$ a Markov Chain with transition matrix $T_k(x', x)$ with stationary distribution $p_{\beta_k}(x)$.

We'll produce samples $x^{(1)}, x^{(2)}, \dots, x^{(N)}$ and use importance sampling, with carefully defined weights $r^{(1)}, r^{(2)}, \dots, r^{(N)}$

Then, the output will be $\frac{1}{N} \sum_{i=1}^N r^{(i)}$

### Visual Description
The slide introduces Annealed Importance Sampling. It states the goal of getting rid of an "oracle" and describes the setup: an oracle for sampling from $p_0(x)$ and a Markov Chain with transition matrices $T_k(x', x)$ for a sequence of temperatures $\beta_k$. It mentions producing samples and using importance sampling with defined weights, concluding with the formula for the output.
---

## Page 35
### Content
Annealed importance sampling

We'll produce samples $x^{(1)}, x^{(2)}, \dots, x^{(N)}$ and use importance sampling, with carefully defined weights $r^{(1)}, r^{(2)}, \dots, r^{(N)}$

Annealed importance sampling algorithm:
To generate $(x^{(i)}, r^{(i)})$ pair:
Sample $x_1 \sim p_0$.
Sample $x_2 \sim T_1(x_2, x_1)$.
....
Sample $x_m \sim T_{m-1}(x_m, x_{m-1})$.

Set: $x^{(i)} = x_m$, $r^{(i)} = \frac{p_1^*(x_1) p_2^*(x_2) \dots p_{m-1}^*(x_{m-1}) p_m^*(x_m)}{p_0^*(x_1) p_1^*(x_2) \dots p_{m-2}^*(x_{m-1}) p_{m-1}^*(x_m)}$

Output: $\frac{1}{N} \sum_{i=1}^N r^{(i)}$

### Visual Description
The slide details the Annealed Importance Sampling algorithm. It outlines the steps to generate a sample $x^{(i)}$ and its corresponding weight $r^{(i)}$, involving sequential sampling from $p_0$ and transition kernels $T_k$. A large red box highlights the formula for $r^{(i)}$. A blue question mark icon is present on the right side of the slide.
---

## Page 36
### Content
Annealed importance sampling

We'll produce samples $x^{(1)}, x^{(2)}, \dots, x^{(N)}$ and use importance sampling, with carefully defined weights $r^{(1)}, r^{(2)}, \dots, r^{(N)}$

Set: $x^{(i)} = x_m$, $r^{(i)} = \frac{p_1^*(x_1) p_2^*(x_2) \dots p_{m-1}^*(x_{m-1}) p_m^*(x_m)}{p_0^*(x_1) p_1^*(x_2) \dots p_{m-2}^*(x_{m-1}) p_{m-1}^*(x_m)}$

Claim: These are the standard importance weights, if we consider an (extended) state space $(x_1, x_2, \dots, x_m)$, s.t. :

The (unnormalized) proposal distribution for $(x_1, x_2, \dots, x_m)$ is:
$Q^*(x_1, x_2, \dots, x_m) := Z_0 p_0(x_1) \prod_{i=1}^{m-1} T_i(x_{i+1}, x_i)$

The (unnormalized) target distribution for $(x_1, x_2, \dots, x_m)$ is:
$P^*(x_1, x_2, \dots, x_m) := Z_m p_m(x_m) \prod_{i=1}^{m-1} \hat{T}_i(x_i, x_{i+1})$,
where $\hat{T}_k(x', x) = T_k(x, x') \frac{p_k(x')}{p_k(x)}$

### Visual Description
The slide reiterates the definition of $x^{(i)}$ and $r^{(i)}$ from the previous slide, with the formula for $r^{(i)}$ highlighted in a red box. It then presents a "Claim" that these are standard importance weights for an extended state space. It defines the unnormalized proposal distribution $Q^*$ and the unnormalized target distribution $P^*$, including the definition of $\hat{T}_k(x', x)$.
---

## Page 37
### Content
Annealed importance sampling

Observation 1: If $Q^*(x_1, x_2, \dots, x_m) := Z_0 p_0(x_1) \prod_{i=1}^{m-1} T_i(x_{i+1}, x_i)$, the normalized probability is
$Q(x_1, x_2, \dots, x_m) := p_0(x_1) \prod_{i=1}^{m-1} T_i(x_{i+1}, x_i)$

Proof: For each $x_i$, $\int_{x_{i+1}} T_i(x_{i+1}, x_i) = 1$. ($T_i$ is a transition kernel.)
Also, $\int_{x_1} p_0(x_1) = 1$
Hence, $\int_{x_1, \dots, x_m} Q(x_1, x_2, \dots, x_m) = 1$

### Visual Description
The slide presents "Observation 1" regarding the normalized probability $Q$ derived from the unnormalized proposal distribution $Q^*$. It then provides a proof, showing that $Q$ integrates to 1, confirming it is a valid probability distribution, based on the properties of transition kernels and $p_0$.
---

## Page 38
### Content
Annealed importance sampling

Observation 2: If $P^*(x_1, x_2, \dots, x_m) := Z_m p_m(x_m) \prod_{i=1}^{m-1} \hat{T}_i(x_i, x_{i+1})$,
where $\hat{T}_k(x', x) = T_k(x, x') \frac{p_k(x')}{p_k(x)}$, the normalized probability is
$P(x_1, x_2, \dots, x_m) := p_m(x_m) \prod_{i=1}^{m-1} \hat{T}_i(x_i, x_{i+1})$

Proof: Note, $\hat{T}_i$ is a transition kernel, i.e. for each $x_i$, $\int_{x_{i+1}} \hat{T}_i(x_i, x_{i+1}) = 1$
$\int_{x_{i+1}} \hat{T}_i(x_i, x_{i+1}) = \int_{x_{i+1}} T_i(x_{i+1}, x_i) \frac{p_i(x_{i+1})}{p_i(x_i)}$
$= \frac{1}{p_i(x_i)} \int_{x_{i+1}} T_i(x_{i+1}, x_i) p_i(x_{i+1}) = \frac{p_i(x_i)}{p_i(x_i)} = 1$
Also, $\int_{x_m} p_m(x_m) = 1$ Hence, $\int_{x_1, \dots, x_m} P(x_1, x_2, \dots, x_m) = 1$

### Visual Description
The slide presents "Observation 2" regarding the normalized probability $P$ derived from the unnormalized target distribution $P^*$. It includes the definition of $\hat{T}_k(x', x)$. The proof demonstrates that $P$ integrates to 1, confirming it is a valid probability distribution, by showing that $\hat{T}_i$ is a transition kernel and $p_m$ is normalized.
---

## Page 39
### Content
Annealed importance sampling

Observation 3: The weights $r^{(i)}$ we defined equal $\frac{P^*}{Q^*}$.

Proof:
$\frac{P^*(x_1, x_2, \dots, x_m)}{Q^*(x_1, x_2, \dots, x_m)} := \frac{Z_m p_m(x_m) \prod_{i=1}^{m-1} \hat{T}_i(x_i, x_{i+1})}{Z_0 p_0(x_1) \prod_{i=1}^{m-1} T_i(x_{i+1}, x_i)}$
$= \frac{Z_m p_m(x_m)}{Z_0 p_0(x_1)} \prod_{i=1}^{m-1} \frac{T_i(x_{i+1}, x_i) p_i(x_{i+1})/p_i(x_i)}{T_i(x_{i+1}, x_i)}$
$= \frac{Z_m p_m(x_m)}{Z_0 p_0(x_1)} \prod_{i=1}^{m-1} \frac{p_i(x_{i+1})}{p_i(x_i)}$
$= \frac{Z_m p_m^*(x_m)}{Z_0 p_0^*(x_1)} \prod_{i=1}^{m-1} \frac{p_i^*(x_{i+1})}{p_i^*(x_i)}$

### Visual Description
The slide presents "Observation 3", stating that the defined weights $r^{(i)}$ are equal to the ratio of the unnormalized target and proposal distributions, $P^*/Q^*$. It then provides a detailed proof, showing the algebraic simplification of this ratio to match the form of $r^{(i)}$.
---

## Page 40
### Content
Annealed importance sampling

Conclusion: The weights $r^{(i)}$ satisfy $\frac{1}{N} \sum_{i=1}^N r^{(i)} \approx \frac{Z_m}{Z_0}$.

Why?
The normalizing factor for $P^*$ is $Z_m$, for $Q^*$ is $Z_0$.
By the usual analysis of importance sampling we have
$\frac{1}{N} \sum_{i=1}^N r^{(i)} \approx \frac{Z_m}{Z_0}$

### Visual Description
The slide presents a "Conclusion" about the weights $r^{(i)}$, stating that their average approximates the ratio of normalization constants $Z_m/Z_0$. It then provides a brief "Why?" explanation, referencing the normalizing factors of $P^*$ and $Q^*$ and the standard analysis of importance sampling.
---
## Page 41
### Content
Annealed importance sampling

Why does this help?
Same intuition as "warmup” case:
$r^{(i)} = \frac{p_1^*(x_1) p_2^*(x_2) \dots p_{m-1}^*(x_{m-1}) p_m^*(x_m)}{p_0^*(x_1) p_1^*(x_2) \dots p_{m-2}^*(x_{m-1}) p_{m-1}^*(x_m)}$

If $T_k$ exactly draws samples from $p_k$, then $x_k$ follows $P_{\beta_{k-1}}$.
Hence, $E_{x_k \sim P_{\beta_{k-1}}} \frac{p_{\beta_k}^*(x_k)}{p_{\beta_{k-1}}^*(x_k)} = \frac{Z_{\beta_k}}{Z_{\beta_{k-1}}}$.

If $|\beta_k - \beta_{k-1}|$ is small, we can hope that the variance is small.
### Visual Description
Text-only slide.
---
## Page 42
### Content
Taking larger steps:
Hamiltonian Monte Carlo
### Visual Description
A title slide introducing the topic "Hamiltonian Monte Carlo".
---
## Page 43
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

We want to be able to take longer steps.
A crazy idea: what if we introduce new variables?

We'll try to sample $p'_\theta(x, v)$, s.t. the marginal of x matches, i.e. $p'_\theta(x) = p_\theta(x)$, and $p'_\theta(x, v)$ can be sampled faster (i.e exploration is faster).

Think of it as "lifting" the chain to a higher dimension.
### Visual Description
The slide contains text explaining the motivation for Hamiltonian Monte Carlo. On the left, there's an abstract diagram showing a curved path, possibly representing a trajectory, with a red line indicating a "lift" or a change in dimension.
---
## Page 44
### Content
Hamiltonian Monte Carlo

https://chi-feng.github.io/mcmc-demo/app.html
### Visual Description
A screenshot of an interactive simulation demonstrating Hamiltonian Monte Carlo. It shows a 2D probability distribution with contour lines, and a trajectory of samples moving through this space. A long red arrow indicates a large step taken by the sampler. Histograms are visible on the axes. The title "Hamiltonian Monte Carlo" is at the top left of the screenshot.
---
## Page 45
### Content
Hamiltonian Monte Carlo

Stan
http://mc-stan.org/

The No-U-Turn Sampler: Adaptively Setting Path Lengths in Hamiltonian Monte Carlo

Matthew D. Hoffman
Adobe Research
601 Townsend St.
San Francisco, CA 94110, USA

Andrew Gelman
Departments of Statistics and Political Science
Columbia University
New York, NY 10027, USA
### Visual Description
The slide features the "Stan" logo (a large red stylized 'S') and its website URL. Below that, there's a snippet from a research paper title and author list related to the "No-U-Turn Sampler" in Hamiltonian Monte Carlo, mentioning Matthew D. Hoffman and Andrew Gelman. A navigation bar with "ABOUT USERS DEVELOPERS EVENTS SHOP SUPPORT" is at the top.
---
## Page 46
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

Beautiful idea from physics: design a Hamiltonian function that is preserved under the moves of the Markov Chain.

Precisely, we'll sample from $p'(x, v) \propto \exp(-E_\theta(x) - K(v))$ for a function $K$ we'll design.

Since the distribution factorizes over $x, v$, we can just draw samples from $p'(x, v)$ and throw away $v$ part of samples – marginally $p'(x) = p(x)$.
### Visual Description
Text-only slide.
---
## Page 47
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

Beautiful idea from physics: design a Hamiltonian function that is preserved under the moves of the Markov Chain.

Precisely, we'll sample from $p'(x, v) \propto \exp(-E_\theta(x) - K(v))$ for any function $K$.

A Hamiltonian is used for a conservation formulation of mechanics.
The Hamiltonian is a function that is preserved under a time evolution in the system. What is preserved?
$H(x, v) = P(x) + K(v)$
Potential Energy + Kinetic Energy
### Visual Description
Text-only slide. The slide defines the Hamiltonian function and its components, Potential Energy and Kinetic Energy, with mathematical notation and descriptive labels.
---
## Page 48
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

Beautiful idea from physics: design a Hamiltonian function that is preserved under the moves of the Markov Chain.

Precisely, we'll sample from $p'(x, v) \propto \exp(-E_\theta(x) - K(v))$ for any function $K$.

A Hamiltonian is used for a conservation formulation of mechanics.
The Hamiltonian is a function that is preserved under a time evolution in the system. What is preserved?
$H(x, v) = mgx + \frac{1}{2}mv^2$
Potential Energy + Kinetic Energy
### Visual Description
The slide explains the Hamiltonian function and its components, similar to the previous page, but includes a visual analogy. On the right, there's an illustration of a person cycling up and down a green hill, with labels indicating "Potential energy", "Kinetic energy", "Energy in", and "Energy out", demonstrating the conservation of energy.
---
## Page 49
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z}\exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

Beautiful idea from physics: design a Hamiltonian function that is preserved under the moves of the Markov Chain.

Precisely, we'll sample from $p'(x, v) \propto \exp(-E_\theta(x) - K(v))$ for any function $K$.

A Hamiltonian is used for a conservation formulation of mechanics.

The Hamiltonian is a function that is preserved under a time evolution in the system. What is preserved?
$H(x, v) = E_\theta(x) + ||v||^2$
{Potential Energy} {Kinetic Energy}
### Visual Description
The slide title is "Hamiltonian Monte Carlo". A light blue rounded rectangle contains the text: "Consider sampling from $p_\theta(x) = \frac{1}{Z}\exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$." Below this, there is explanatory text about Hamiltonian functions. At the bottom, a mathematical equation for $H(x,v)$ is shown, with curly braces pointing to $E_\theta(x)$ labeled "Potential Energy" and to $||v||^2$ labeled "Kinetic Energy".
---
## Page 50
### Content
Hamiltonian Monte Carlo

What are the Hamiltonian evolution equations?
$H(x, v) = P(x) + K(v)$
{Potential Energy} {Kinetic Energy}

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy
### Visual Description
The slide title is "Hamiltonian Monte Carlo". Below the title, the question "What are the Hamiltonian evolution equations?" is posed, followed by the equation $H(x, v) = P(x) + K(v)$, with braces labeling "Potential Energy" and "Kinetic Energy" similar to the previous slide. In the bottom left, the equation $\frac{dv}{dt} := -\frac{dH}{dx}$ is presented, labeled "Force = - negative grad of potential energy". To its right, a diagram of a pendulum is shown, with mass 'm', gravity 'mg', length 'l', and angle '$\theta$'. In the bottom right, the equation $\frac{dx}{dt} := \frac{dH}{dv}$ is presented, labeled "Momentum = grad of kinetic energy". Between the pendulum and the momentum equation, there is a phase space diagram showing an elliptical trajectory around an origin, with axes labeled $\Delta p$ and $\theta$, and points $-\pi$ and $\pi$ marked on the $\theta$ axis.
---
## Page 51
### Content
Hamiltonian Monte Carlo

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

Hamiltonian preservation: $\frac{dH}{dt} = \frac{dH}{dv}\frac{dv}{dt} + \frac{dH}{dx}\frac{dx}{dt} = 0$

Algorithm: Since $H(x, v) = f(x) + ||v||^2$ is preserved under Hamiltonian iteration, and we are trying to sample from $p(x, v) \propto \exp(-H(x, v))$, why not just iterate:
1. In step i, pick a random velocity $\xi_i$ (e.g. $\xi_i \sim N(0,I)$)
2. Obtain $x_{i+1}$ by simulating evolving Hamiltonian for $T$ steps, starting at $(x_i, \xi_i)$.
### Visual Description
The slide title is "Hamiltonian Monte Carlo". The top half of the slide contains the same force and momentum equations and their descriptions as the previous slide. Below these, a light green rounded rectangle contains the equation for Hamiltonian preservation: $\frac{dH}{dt} = \frac{dH}{dv}\frac{dv}{dt} + \frac{dH}{dx}\frac{dx}{dt} = 0$. The bottom half of the slide introduces an "Algorithm", with a paragraph explaining the rationale, followed by two numbered steps for the algorithm, enclosed in a light orange rounded rectangle.
---
## Page 52
### Content
Hamiltonian Monte Carlo

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

Hamiltonian preservation: $\frac{dH}{dt} = \frac{dH}{dv}\frac{dv}{dt} + \frac{dH}{dx}\frac{dx}{dt} = 0$

Algorithm:
### Visual Description
The slide title is "Hamiltonian Monte Carlo". The top half of the slide is identical to the previous slide, showing the force and momentum equations, and the Hamiltonian preservation equation in a green box. The "Algorithm" heading is present, but the numbered steps from the previous slide are replaced by a diagram. The diagram shows a series of concentric, irregular closed curves, representing energy levels or phase space trajectories. A blue line traces a path starting at a point labeled $x_1$ with an associated vector $\xi_1$. It follows one of the curves, then jumps to another curve at $x_2$ with vector $\xi_2$, and continues to $x_3$. The path segments are shown in blue, with arrows indicating direction.
---
## Page 53
### Content
HMC: Preserving stationarity

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

Hamiltonian preservation: $\frac{dH}{dt} = \frac{dH}{dv}\frac{dv}{dt} + \frac{dH}{dx}\frac{dx}{dt} = 0$

Remember change of variables formula: If a random variable X follows a distribution p, then for a deterministic transformation g
$p(g(x)) = p(x)\det(Dg(x))$

If $g$ is the evolution of Hamiltonian for $T$ steps, we showed that $p(g(x)) = p(x)$. We still need to show that $\det(Dg(x)) = 1$

In other words, we want to show that Hamiltonian evolution is volume-preserving!
### Visual Description
The slide title is "HMC: Preserving stationarity". The top half of the slide is identical to the previous two slides, showing the force and momentum equations, and the Hamiltonian preservation equation in a green box. Below this, a light orange rounded rectangle contains text explaining the "change of variables formula": "If a random variable X follows a distribution p, then for a deterministic transformation g $p(g(x)) = p(x)\det(Dg(x))$". Below this box, further text explains that if $g$ is the Hamiltonian evolution, we need to show $\det(Dg(x)) = 1$, which means showing Hamiltonian evolution is volume-preserving.
---
## Page 54
### Content
HMC: Preserving stationarity

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

When is the volume preserved?

Fact: If we consider a flow $\Phi_t(x, v)$ (i.e. a map s.t. $\Phi_t(x_0, v_0) = (x_t, v_t)$; e.g., $\Phi_t$ gives values after evolving Hamiltonian for $t$ steps), then it holds that
$\frac{d}{dt}\det(D\Phi_t(x,v)) = \text{div}(\frac{d}{dt}\Phi_t(x, v))\det(D\Phi_t(x, v))$
### Visual Description
The slide title is "HMC: Preserving stationarity". The top half of the slide is identical to the previous slides, showing the force and momentum equations. Below these, the question "When is the volume preserved?" is asked. A light orange rounded rectangle contains a "Fact" about the flow $\Phi_t(x, v)$ and the equation for the derivative of its determinant: $\frac{d}{dt}\det(D\Phi_t(x,v)) = \text{div}(\frac{d}{dt}\Phi_t(x, v))\det(D\Phi_t(x, v))$. Below this box, there are three diagrams illustrating vector fields. The first shows vectors radiating outwards from a central point, labeled with $\partial/\partial x(V_x) > 0$, $\partial/\partial y(V_y) > 0$, $\nabla \cdot (V) > 0$. The second shows vectors converging inwards, labeled with $\partial/\partial x(V_x) < 0$, $\partial/\partial y(V_y) < 0$, $\nabla \cdot (V) < 0$. The third shows parallel vertical vectors, labeled with $\partial/\partial x(V_x) = 0$, $\partial/\partial y(V_y) = 0$, $\nabla \cdot (V) = 0$.
---
## Page 55
### Content
HMC: Preserving stationarity

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

When is the volume preserved?

Fact: If we consider a flow $\Phi_t(x, v)$ (i.e. a map s.t. $\Phi_t(x_0, v_0) = (x_t, v_t)$; e.g., $\Phi_t$ gives values after evolving Hamiltonian for $t$ steps), then it holds that
$\frac{d}{dt}\det(D\Phi_t(x,v)) = \text{div}(\frac{d}{dt}\Phi_t(x, v))\det(D\Phi_t(x, v))$

Hence, suffices to show $\text{div}(\frac{d}{dt}\Phi_t(x, v)) = 0$.

$\text{div}\left(\frac{d}{dt}\Phi_t(x, v)\right) = \sum_i \frac{d}{dx_i}\frac{dx_i}{dt} + \sum_i \frac{d}{dv_i}\frac{dv_i}{dt} = \sum_i \frac{d}{dx_i}\frac{dH}{dv_i} - \sum_i \frac{d}{dv_i}\frac{dH}{dx_i} = 0$
### Visual Description
The slide title is "HMC: Preserving stationarity". The top half of the slide is identical to the previous slide, showing the force and momentum equations, the question "When is the volume preserved?", and the "Fact" about the flow $\Phi_t(x, v)$ and its determinant in an orange box. Below this, the text "Hence, suffices to show $\text{div}(\frac{d}{dt}\Phi_t(x, v)) = 0$" is presented. At the bottom of the slide, a multi-part mathematical equation shows the derivation of this divergence, concluding that it equals 0.
---
## Page 56
### Content
Details: discretization

1. In step i, pick a random velocity $v$ (e.g. $v \sim N(0,I)$)
2. Obtain $x_{i+1}$ by simulating Hamiltonian dynamics for $T$ steps.

How do we simulate Hamiltonian dynamics for $T$ steps?...
No closed form expression.

Several available methods for simulating ODEs:
Euler's method, Leapfrog method (symplectic integration)

Euler method: As the system is integrated longer, errors add.

Leapfrog: symplectic integration tries to make sure approximate trajectory preserves volume, which "corrects" error a bit.
### Visual Description
The slide title is "Details: discretization". A light orange rounded rectangle at the top contains two numbered steps: "1. In step i, pick a random velocity $v$ (e.g. $v \sim N(0,I)$)" and "2. Obtain $x_{i+1}$ by simulating Hamiltonian dynamics for $T$ steps." Below this, text explains that there's no closed-form expression for simulating Hamiltonian dynamics and lists "Euler's method, Leapfrog method (symplectic integration)" as available methods. Two diagrams are shown side-by-side at the bottom. Both diagrams show a vector field with curved lines. The left diagram, labeled "Euler method", shows a red trajectory starting and deviating from the flow lines, with green arrows indicating the steps. The right diagram, labeled "Leapfrog", shows a similar red trajectory, but the green arrows representing steps appear to follow the flow lines more closely, suggesting better preservation. Text below each diagram describes the method.
---
## Page 57
### Content
Figure from Neal (2011)
Integration schemes

(a) Euler's method, stepsize 0.3
Momentum (p) vs Position (q) plot showing a spiral trajectory.

(b) Modified Euler's method, stepsize 0.3
Momentum (p) vs Position (q) plot showing a closed, elliptical trajectory.

(c) Leapfrog method, stepsize 0.3
Momentum (p) vs Position (q) plot showing a closed, circular trajectory.

(d) Leapfrog method, stepsize 1.2
Momentum (p) vs Position (q) plot showing a closed, multi-lobed trajectory.

### Visual Description
Four 2D plots arranged in a 2x2 grid, illustrating different integration schemes for Hamiltonian dynamics. Each plot shows "Momentum (p)" on the y-axis against "Position (q)" on the x-axis.
Plot (a) "Euler's method, stepsize 0.3" shows a spiral trajectory diverging outwards.
Plot (b) "Modified Euler's method, stepsize 0.3" shows a stable, closed, slightly elliptical trajectory.
Plot (c) "Leapfrog method, stepsize 0.3" shows a stable, closed, nearly circular trajectory.
Plot (d) "Leapfrog method, stepsize 1.2" shows a stable, closed, but more complex, multi-lobed trajectory with larger steps, indicating energy conservation despite larger step size. The overall title is "Integration schemes" and it's attributed to "Figure from Neal (2011)".
---
## Page 58
### Content
Leapfrog Hamiltonian simulation

Parameters to tune:
1. Step size, $\epsilon$
2. Number of iterations, $L$

Leapfrog Simulation Algorithm:
For $\tau \in 1 \dots L$:
$v = v - \frac{\epsilon}{2} \nabla E_{\theta}(x)$
$x = x + \epsilon v$
$v = v - \frac{\epsilon}{2} \nabla E_{\theta}(x)$

Why is this volume preserving?
The map $(x, v) \to (x, v - \frac{\epsilon}{2} \nabla E_{\theta}(x))$ has Jacobian w determinant 1. (Other transforms similar.)

### Visual Description
Text-only slide. The slide is titled "Leapfrog Hamiltonian simulation". It lists two parameters to tune: "Step size, $\epsilon$" and "Number of iterations, $L$". Below this, it presents the "Leapfrog Simulation Algorithm" as a sequence of three equations for $v$ and $x$ within a loop "For $\tau \in 1 \dots L$". To the right, there's a question "Why is this volume preserving?" followed by an explanation regarding the Jacobian determinant of one of the transformations.
---
## Page 59
### Content
In some special cases, closed form solutions may be available

Special case: linear ODEs (see Hwk 2)
$\frac{dv}{dt} = A x$
$\frac{dx}{dt} = B v$

Denoting $y = (x, v)$, we have: $\frac{dy}{dt} = C y$ for some matrix $C$.

Linear (matrix) differential equations are easily solved:
Denote $\{\lambda_i, u_i\}_{i=1}^n$ the eigenvalues/eigenvectors of $C$.
(Say, there are linearly independent)

Solutions of ODE:
$y(t) = \sum_{i=1}^n \alpha_i e^{\lambda_i t} u_i$
For some constants $\{\alpha_i\}_{i=1}^n$, determined by $y(0)$.

### Visual Description
Text-only slide. The slide is titled "In some special cases, closed form solutions may be available". It discusses linear ODEs, presenting two coupled differential equations for $v$ and $x$. It then introduces a combined vector $y=(x,v)$ and a matrix $C$ such that $\frac{dy}{dt} = C y$. The slide explains that linear (matrix) differential equations are easily solved by using eigenvalues $\{\lambda_i\}$ and eigenvectors $\{u_i\}$ of $C$. The general solution for $y(t)$ is given as a sum of exponential terms, with constants $\{\alpha_i\}$ determined by initial conditions.
---
