# Lecture_20_NCE

Source: `materials/archive/Lecture_20_NCE.pdf`
Duplicate equivalents: `Lecture_20_NCE.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `MIXED`
Pages: 26

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 20:
Beyond likelihood III: Noise-
Contrastive Estimation
### Visual Description
Text-only slide.
---
## Page 2
### Content
Noise contrastive estimation
Another solution that avoids calculating a partition function.
Very elegant idea that was a predecessor to a lot of follow up training algorithms.

Idea: we will reduce the problem to solving a supervised learning problem.
We will train a classifier to distinguish data samples from samples from another "noise" distribution.
Optimal classifier will "encode" the pdf we are trying to learn.
### Visual Description
The main text content is presented, with the "Idea" section enclosed in a light blue rounded rectangle. Below this, there are two images: a dog's face on the left and a blueberry muffin on the right, separated by the text "VS".
---
## Page 3
### Content
Noise contrastive estimation

The setup: we setup a problem of distinguishing samples from $p_{data}$ and a "noise" distribution $q$, which is easy to draw samples from.
Given $N$ samples from $p_{data}$, generate $M := kN$ samples from $q$, train a classifier, that given one of these $N + M$ points, predicts whether the sample is from $p_{data}$ or $q$.

For concreteness, we will use logistic loss.
### Visual Description
Text-only slide, with the main setup description enclosed in a light blue rounded rectangle.
---
## Page 4
### Content
Noise contrastive estimation

Let us view the points as labeled pairs $(x, y)$, where $y=1$ if $x$ comes from $p_{data}$ and $y = 0$ if $x$ comes from $q$.
Let us train a classifier $D(x) \in [0,1]$, s.t. $D(x)$ is the probability that the sample $x$ came from $p_{data}$.

The (logistic) loss of this classifier is:
$$ \hat{L}(D) = \sum_{x \text{ from } p_{data}} \log D(x) + \sum_{x \text{ from } q} \log(1-D(x)) $$
Taking expectations:
### Visual Description
Text-only slide, with the initial setup description enclosed in a light blue rounded rectangle.
---
## Page 5
### Content
Noise contrastive estimation

Let us view the points as labeled pairs $(x, y)$, where $y=1$ if $x$ comes from $p_{data}$ and $y = 0$ if $x$ comes from $q$.
Let us train a classifier $D(x) \in [0,1]$, s.t. $D(x)$ is the probability that the sample $x$ came from $p_{data}$.

The (logistic) loss of this classifier is:
$$ L(D) = \mathbb{E}_{(x,y)\sim\mathbb{P}}[y \log D(x) + (1 - y) \log(1 - D(x))] $$
where $\mathbb{P}$ is the population distribution: pick $y$ to be 1 or 0 w/ probs $\frac{k}{k+1}$ and $\frac{1}{k+1}$ respectively, then sample $x$ from $p_{data}$ or $q$ respectively.
### Visual Description
Text-only slide, with the initial setup description enclosed in a light blue rounded rectangle.
---
## Page 6
### Content
Noise contrastive estimation

Let us view the points as labeled pairs $(x, y)$, where $y=1$ if $x$ comes from $p_{data}$ and $y = 0$ if $x$ comes from $q$.
Let us train a classifier $D(x) \in [0,1]$, s.t. $D(x)$ is the probability that the sample $x$ came from $p_{data}$.

Rewriting, we get:
$$ L(D) = \mathbb{E}_{(x,y)\sim\mathbb{P}}[y \log D(x) + (1 - y) \log(1 - D(x))] $$
$$ = \mathbb{E}_x \mathbb{E}_{y|x}[y \log D(x) + (1 - y) \log(1 - D(x))] $$
$$ = \mathbb{E}_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1-D(x)) \right] $$
### Visual Description
Text-only slide, with the initial setup description and the rewritten loss function enclosed in a light blue rounded rectangle.
---
## Page 7
### Content
Noise contrastive estimation

Rewriting, we get:
$$ L(D) = \mathbb{E}_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1 - D(x)) \right] $$
What is the optimal $D(x)$ ? Take derivatives in $D(x)$:
$$ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \frac{1}{D(x)} - \frac{kq(x)}{p_{data}(x) + kq(x)} \frac{1}{1 - D(x)} = 0 $$
Rearranging, we get:
$$ D(x) = \frac{p_{data}(x)}{p_{data}(x) + kq(x)} $$
### Visual Description
Text-only slide. The rewritten loss function is enclosed in a light blue rounded rectangle. The final optimal $D(x)$ expression is highlighted in an orange rounded rectangle.
---
## Page 8
### Content
Noise contrastive estimation

Rewriting, we get:
$$ L(D) = \mathbb{E}_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1-D(x)) \right] $$
Define probability distribution of original + noise data $p_{joint}(x, y)$
$p_{joint}(y = 1) = \frac{1}{1+k}$
$p_{joint}(x|y = 1) = p_{data}(x)$
$p_{joint}(x|y = 0) = q(x)$

$p_{joint}(y|x)$
Let $p_{disc}(y|x) = \begin{bmatrix} D(x) \\ 1 - D(x) \end{bmatrix}$
$$ L(D) = -\mathbb{E}_x[\text{KL}(p_{joint}(y|x)||p_{disc}(y|x))] - \mathbb{E}_x H(p_{joint}(y|x)) $$
### Visual Description
Text-only slide. The rewritten loss function is enclosed in a light blue rounded rectangle. Red boxes highlight the coefficients of $\log D(x)$ and $\log(1-D(x))$ in the loss function, with red arrows pointing to the text "$p_{joint}(y|x)$". The final expression for $L(D)$ in terms of KL divergence and entropy is enclosed in a light blue rounded rectangle.
---
## Page 9
### Content
Proof: (continued)
Let $D_{f,\epsilon}(x) = r_k(f(x) + \epsilon \phi(x) - \log q(x))$.
Then $\frac{\partial}{\partial \epsilon} D_{f,\epsilon}(x) = r_k'(f(x) + \epsilon \phi(x) - \log q(x)) \phi(x)$.

The derivative of the loss function with respect to $\epsilon$ at $\epsilon=0$:
$$ \frac{\partial}{\partial \epsilon} L(f+\epsilon\phi) \Big|_{\epsilon=0} = E_x \left[ \frac{p_{data}(x)}{p_{data}(x)+kq(x)} \frac{1}{D_f(x)} r_k'(f(x)-\log q(x))\phi(x) - \frac{kq(x)}{p_{data}(x)+kq(x)} \frac{1}{1-D_f(x)} r_k'(f(x)-\log q(x))\phi(x) \right] $$
$$ = E_x \left[ \left( \frac{p_{data}(x)}{p_{data}(x)+kq(x)} \frac{1}{D_f(x)} - \frac{kq(x)}{p_{data}(x)+kq(x)} \frac{1}{1-D_f(x)} \right) r_k'(f(x)-\log q(x))\phi(x) \right] $$
### Visual Description
The slide displays mathematical equations for the derivative of $D_{f,\epsilon}(x)$ and the first derivative of the loss function $L(f+\epsilon\phi)$ with respect to $\epsilon$ at $\epsilon=0$.
---

## Page 10
### Content
Proof: (continued)
Setting $\frac{\partial}{\partial \epsilon} L(f+\epsilon\phi) \Big|_{\epsilon=0} = 0$ for all $\phi(x)$ implies the term in the parenthesis must be zero:
$$ \frac{p_{data}(x)}{p_{data}(x)+kq(x)} \frac{1}{D_f(x)} - \frac{kq(x)}{p_{data}(x)+kq(x)} \frac{1}{1-D_f(x)} = 0 $$
$$ \frac{p_{data}(x)}{D_f(x)} = \frac{kq(x)}{1-D_f(x)} $$
$$ p_{data}(x)(1-D_f(x)) = kq(x)D_f(x) $$
$$ p_{data}(x) - p_{data}(x)D_f(x) = kq(x)D_f(x) $$
$$ p_{data}(x) = (p_{data}(x) + kq(x))D_f(x) $$
$$ D_f(x) = \frac{p_{data}(x)}{p_{data}(x)+kq(x)} $$
We know $D_f(x) = r_k(f(x) - \log q(x))$.
So, $r_k(f(x) - \log q(x)) = \frac{p_{data}(x)}{p_{data}(x)+kq(x)}$.
Using $r_k(u) = \frac{1}{1+k \exp(-u)}$:
$$ \frac{1}{1+k \exp(-(f(x)-\log q(x)))} = \frac{p_{data}(x)}{p_{data}(x)+kq(x)} $$
$$ \frac{1}{1+k \exp(-f(x)) \exp(\log q(x))} = \frac{p_{data}(x)}{p_{data}(x)+kq(x)} $$
$$ \frac{1}{1+k q(x) \exp(-f(x))} = \frac{p_{data}(x)}{p_{data}(x)+kq(x)} $$
$$ 1+k q(x) \exp(-f(x)) = \frac{p_{data}(x)+kq(x)}{p_{data}(x)} = 1 + \frac{kq(x)}{p_{data}(x)} $$
$$ k q(x) \exp(-f(x)) = \frac{kq(x)}{p_{data}(x)} $$
$$ \exp(-f(x)) = \frac{1}{p_{data}(x)} $$
$$ p_{data}(x) = \exp(f(x)) $$
This is the stationary point.
### Visual Description
The slide continues the mathematical proof, deriving the expression for $D_f(x)$ at the stationary point and subsequently showing that $p_{data}(x) = \exp(f(x))$.
---

## Page 11
### Content
Proof: (continued)
To show this is a minimum, we need to check the second derivative.
$$ \frac{\partial^2}{\partial \epsilon^2} L(f+\epsilon\phi) \Big|_{\epsilon=0} = E_x \left[ - (r_k'(f(x)-\log q(x))\phi(x))^2 \left( \frac{p_{data}(x)}{(p_{data}(x)+kq(x))D_f(x)^2} + \frac{kq(x)}{(p_{data}(x)+kq(x))(1-D_f(x))^2} \right) \right] $$
Since $D_f(x) \in (0,1)$, $r_k'(x) > 0$, and $p_{data}(x), kq(x) > 0$, the term in the parenthesis is always positive.
Therefore, the second derivative is always negative. This is a maximum.
### Visual Description
The slide presents the calculation for the second derivative of the loss function with respect to $\epsilon$ at $\epsilon=0$, concluding that the stationary point is a maximum.
---

## Page 12
### Content
Noise contrastive estimation

*   NCE is a way to estimate unnormalized models.
*   It's a "nonparametric" result: we are optimizing in the space of all functions (as opposed to fixing a parametric family for $E(x)$).
*   It's related to logistic regression.
*   It's a "self-normalizing" method: forced to learn a value (partition function) $c$ consistent with its energy function.
*   It's a consistent estimator.
### Visual Description
Text-only slide, listing key properties and implications of Noise Contrastive Estimation.
---

## Page 13
### Content
Noise contrastive estimation

The NCE objective:
$$ L_{NCE}(\theta, c) = E_{x \sim p_{data}}[\log D_{\theta,c}(x)] + k E_{x \sim q}[\log(1-D_{\theta,c}(x))] $$
where $D_{\theta,c}(x) = r_k(E_\theta(x) - c - \log q(x))$.

This is equivalent to the logistic regression objective:
$$ L_{LR}(\theta, c) = E_{x \sim p_{data}}[\log \sigma
## Page 17
### Content
Noise contrastive estimation

$r_1(x) = \sigma(x)$
$r_k(x) = \sigma(x - \log k)$
$r_{1/k}(x) = \sigma(x + \log k)$

$1 - \sigma(x) = \sigma(-x)$
$\sigma'(x) = \sigma(x)\sigma(-x)$
$\log (\sigma(x))' = \sigma(-x)$

Some preliminary calculations:
$1 - r_k(x) = 1 - \frac{1}{1 + k\exp(-x)} = \frac{k\exp(-x)}{1 + k\exp(-x)} = \frac{1}{1 + \frac{1}{k}\exp(x)} = r_{1/k}(-x)$

$r_k'(x) = \frac{k\exp(-x)}{(1 + k\exp(-x))^2} = \frac{1}{1 + k\exp(-x)} \frac{k\exp(-x)}{1 + k\exp(-x)} = r_k(x)r_1(-x)$

$\log(r_k(x))' = \frac{r_k'(x)}{r_k(x)} = r_1(-x)$
$\log(1 - r_k(x))' = -r_k(x)$
### Visual Description
The slide presents equations related to noise contrastive estimation. The top section defines $r_1(x)$, $r_k(x)$, and $r_{1/k}(x)$ in terms of the sigmoid function $\sigma(x)$. Below this, a blue box lists properties of the sigmoid function: $1 - \sigma(x) = \sigma(-x)$, $\sigma'(x) = \sigma(x)\sigma(-x)$, and $\log(\sigma(x))' = \sigma(-x)$. A "Tip" in the box suggests these can be derived from standard sigmoid formulas. The bottom half of the slide, labeled "Some preliminary calculations," shows three lines of algebraic derivations involving $r_k(x)$ and its derivatives, simplifying expressions related to the sigmoid function.
---
## Page 18
### Content
Noise contrastive estimation

$D(x) := r_k( f(x) – \log q(x))$

$L(D) = \mathbb{E}_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1 - D(x)) \right]$

$\log D_{(E,c)+\delta}(x) = \log r_k((f + \epsilon\phi)(x) – \log q(x))$
$= \log r_k (f(x) – \log q(x) + \epsilon\phi(x))$
$= \log D_{(E,c)}(x) + \epsilon\phi(x)r_1(\log q(x) – f(x)) + O(\epsilon^2)$
$\log(1 – D_{(E,c)+\delta}(x)) = \log(1-D_{(E,c)}(x)) -\epsilon\phi(x) r_k(f(x) – \log q(x)) + O(\epsilon^2)$

$g(x + \delta) = g(x) + \delta g'(x) + O(\delta^2)$
### Visual Description
The slide is titled "Noise contrastive estimation". It defines $D(x)$ using $r_k$ and then presents the loss function $L(D)$ as an expectation involving $p_{data}(x)$ and $q(x)$. Below this, there are derivations for $\log D_{(E,c)+\delta}(x)$ and $\log(1 - D_{(E,c)+\delta}(x))$, showing how they expand with a small perturbation $\epsilon\phi(x)$. A small blue box on the right provides a Taylor expansion formula for $g(x+\delta)$.
---
## Page 19
### Content
Noise contrastive estimation

$D(x) := r_k( f(x) – \log q(x))$

$L(D) = \mathbb{E}_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1 - D(x)) \right]$

$\log D_{(E,c)+\delta}(x) = \log D_{(E,c)}(x) + \epsilon\phi(x)\frac{r_1(\log q(x) – f(x))}{k} + O(\epsilon^2)$
$\log(1 - D_{(E,c)+\delta}(x)) = \log(1-D_{(E,c)}(x)) -\epsilon\phi(x) r_k(f(x) – \log q(x)) + O(\epsilon^2)$

$L(D_{(E,c)+\delta}) = L(D_{(E,c)}) + \epsilon\mathbb{E}_x \left[ \phi(x) \left( \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \frac{r_1(\log q(x) – f(x))}{k} - \frac{kq(x)}{p_{data}(x) + kq(x)} r_k(f(x) – \log q(x)) \right) \right] + O(\epsilon^2)$

At stationary point $\Rightarrow p_{data}(x)\frac{r_1(\log q(x) – f(x))}{k} = kq(x)r_k(f(x) – \log q(x))$
### Visual Description
The slide is titled "Noise contrastive estimation". It reiterates the definition of $D(x)$ and the loss function $L(D)$. It then presents simplified expressions for $\log D_{(E,c)+\delta}(x)$ and $\log(1 - D_{(E,c)+\delta}(x))$ from the previous slide, highlighting the terms involving $\epsilon\phi(x)$ in blue boxes. The full expression for $L(D_{(E,c)+\delta})$ is given, showing its relation to $L(D_{(E,c)})$ and terms up to $O(\epsilon^2)$. Finally, the condition for a stationary point is stated as an equality between two terms involving $p_{data}(x)$, $q(x)$, $r_1$, and $r_k$.
---
## Page 20
### Content
Noise contrastive estimation

Rewriting this condition:
$p_{data}(x)\frac{r_1(\log q(x) – f(x))}{k} = kq(x)r_k(f(x) – \log q(x))$

$\Rightarrow p_{data}(x) \frac{1}{1 + k \frac{\exp(f(x))}{q(x)}} = kq(x) \frac{1}{1 + k \frac{q(x)}{\exp(f(x))}}$

$\Rightarrow k q(x)p_{data}(x) = kq(x) \exp(f(x))$

Whenever $q(x) \neq 0$ we have $p_{data}(x) = \exp(f(x)) = \exp(E(x) - c)$

We proved that $p_{data}(x) = \exp(f(x)) = \exp(E(x) - c)$ is a stationary point.
We still have to check it's the maximum.
### Visual Description
Text-only slide. The slide is titled "Noise contrastive estimation" and focuses on "Rewriting this condition" from the previous slide. It starts with the stationary point condition and then shows two steps of algebraic simplification, transforming the equation involving $r_1$ and $r_k$ into a simpler form. The final simplified equation is $k q(x)p_{data}(x) = kq(x) \exp(f(x))$. This leads to the conclusion that $p_{data}(x) = \exp(f(x)) = \exp(E(x) - c)$ when $q(x) \neq 0$. The slide ends with a statement that this has been proven to be a stationary point, but it still needs to be checked if it's the maximum.
---
## Page 21
### Content
Noise contrastive estimation

We just need to check second order term is negative.

A similar calculation as before shows:
$\log D_{(E,c)+\delta}(x) = \log D_{(E,c)}(x) + \epsilon\phi\frac{r_1(\log q(x) – f(x))}{k} - \epsilon^2\phi(x)^2\frac{r_1(\log q(x) – f(x))r_k(f(x) – \log q(x))}{k} + O(\epsilon^3)$

$\log(1 – D_{(E,c)+\delta}(x)) = \log(1-D_{(E,c)}(x)) -\epsilon\phi(x)r_k(f(x) – \log q(x)) - \epsilon^2\phi(x)^2\frac{r_1(\log q(x) – f(x))r_k(f(x) – \log q(x))}{k} + O(\epsilon^3)$

Hence,
$L(D_{(E,c)+\delta}^*) = L(D_{(E,c)}) - 2 \epsilon^2 \mathbb{E}_x \left[ \phi^2(x)\frac{r_1(\log q(x) - f(x))r_k(f(x) – \log q(x))}{k} \right] + O(\epsilon^3)$

Plugging in $\log q(x) = f(x)$, and noting $r_1, r_k$ are positive, the second-order term is negative, as we need.
### Visual Description
Text-only slide. The slide is titled "Noise contrastive estimation" and discusses checking the second-order term for negativity. It presents expanded equations for $\log D_{(E,c)+\delta}(x)$ and $\log(1 - D_{(E,c)+\delta}(x))$, now including terms up to $O(\epsilon^3)$, specifically showing the $\epsilon^2$ terms. Following this, the expression for $L(D_{(E,c)+\delta}^*)$ is given, highlighting a negative second-order term. The slide concludes by stating that plugging in $\log q(x) = f(x)$ and noting the positivity of $r_1$ and $r_k$ confirms the second-order term is negative, which is required for a maximum.
---
## Page 22
### Content
Practical issues

Are all choices of $q$ created equal?

Not really. If $q$ is very far from $p_{data}$ classifier should have a really easy time of distinguishing $q$ from $p_{data}$. If $q = p_{data}$ we recover maximum likelihood!
Mathematically, the landscape is very flat around optimum $D$, say $D^*$.

Why is this a problem?
If we want to learn a $D \approx D^*$, we have to drive error very low.

This is sometimes called the density chasm problem.
(Rhodes et al '20).
### Visual Description
The slide is titled "Practical issues". It poses the question "Are all choices of $q$ created equal?". The text explains that if $q$ is very different from $p_{data}$, distinguishing them is easy, but if $q = p_{data}$, maximum likelihood is recovered. It states that the mathematical landscape is very flat around the optimum $D^*$. A 3D plot is shown on the left, illustrating an "extremely flat loss landscape" for Gaussian mean estimation, with different colored surfaces representing the noise Q (orange), NCE loss (blue), and ground truth distribution P* (green). The x-axis ranges from -20 to 10, and the y-axis from -2 to 10. The z-axis (vertical) represents values from 0.0 to 4.0. On the right, the question "Why is this a problem?" is asked, followed by an explanation that learning $D \approx D^*$ requires very low error, leading to the "density chasm problem," with a citation to Rhodes et al '20. A URL for a related blog post is provided at the bottom.
---
## Page 23
### Content
Practical issues

Are all choices of $q$ created equal?

Not really. If $q$ is very far from $p_{data}$ classifier should have a really easy time of distinguishing $q$ from $p_{data}$. If $q = p_{data}$ we recover maximum likelihood!
Mathematically, the landscape is very flat around optimum $D$, say $D^*$.

(a) Density-ratio estimation between an extremely peaked Gaussian $p$ ($\sigma = 10^{-6}$) and a broad Gaussian $q$ ($\sigma = 1$) using a single-parameter quadratic classifier (as detailed in section 4.1). Left: A log-log scale plot of the densities and their ratio. Note that $p(x)$ is not visible, since the ratio overlaps it. Right: the solid blue line is the finite-sample logistic loss (Eq. 2) for 10,000 samples. Despite the large sample size, the minimiser (dotted blue line) is far from optimal (dotted black line). The dotted red line is the newly introduced TRE solution, which almost perfectly overlaps with the dotted black line.

Figure from Rhodes et al '20.
### Visual Description
The slide is titled "Practical issues". It repeats the text from the previous slide about the choices of $q$ and the flat landscape around the optimum $D^*$. Below this, there are two plots side-by-side. The left plot, titled "density/ratio value vs x", is a log-log scale plot showing $p(x)$ (peaked Gaussian), $q(x)$ (broad Gaussian), and their ratio $p(x)/q(x)$. The x-axis ranges from $10^{-2}$ to $10^2$ (log scale) and the y-axis from $10^{-1}$ to $10^5$ (log scale). $p(x)$ is not visible as it's overlapped by the ratio. The right plot, titled "logistic loss vs $\theta$", shows the logistic loss for 10,000 samples. The x-axis ($\theta$) ranges from 4 to 14, and the y-axis (logistic loss) from 0.0 to 1.5. It displays $C''(\theta)$ (solid blue), $\hat{\theta}$ (dotted blue), $\theta^*$ (dotted black), and $\theta_{TRE}$ (dotted red), with $\theta_{TRE}$ almost perfectly overlapping $\theta^*$. A detailed description of both plots and their implications for density-ratio estimation is provided below the figures, along with a citation to Rhodes et al '20.
---
## Page 24
### Content
Practical issues

Are all choices of $q$ created equal?

One "baseline" choice for $q$ is a Gaussian with matching mean and covariance to the data.

A popular fix for the difficulty of choosing a good $q$ is (again)... **annealing!**

TRE (Telescoping Density Ratio Estimation, Rhodes et al '20):
Choose "temperatures” $\sigma_1, \sigma_2, ..., \sigma_L$ and train distinguishers to distinguish $p_{\sigma_i, data}$ vs $p_{\sigma_{i+1}, data}$ for $i \in [L – 1]$.

As we saw with score matching, it's easy to draw samples $p_{\sigma_i, data}$ by sampling a $z \sim N(0, \sigma_i)$ and outputting $x + z$.
### Visual Description
Text-only slide. The slide is titled "Practical issues" and starts by repeating the question "Are all choices of $q$ created equal?". It suggests a "baseline" choice for $q$ as a Gaussian with matching mean and covariance to the data. The slide then highlights "annealing!" as a popular fix for the difficulty of choosing a good $q$. A peach-colored box describes "TRE (Telescoping Density Ratio Estimation, Rhodes et al '20)", explaining that it involves choosing "temperatures" $\sigma_1, \sigma_2, ..., \sigma_L$ and training distinguishers to differentiate between $p_{\sigma_i, data}$ and $p_{\sigma_{i+1}, data}$ for $i \in [L – 1]$. The slide concludes by noting that drawing samples $p_{\sigma_i, data}$ is easy by sampling $z \sim N(0, \sigma_i)$ and outputting $x + z$, similar to score matching.
---
## Page 25
### Content
Practical issues
Are all choices of $q$ created equal?
One "baseline" choice for $q$ is a Gaussian with matching mean and covariance to the data.

$$
\frac{p}{q} = \frac{p}{p_1} \times \frac{p_1}{p_2} \times \frac{p_2}{p_3} \times \frac{p_3}{q}
$$

(b) Telescoping density-ratio estimation applied to the problem in (a), using the same 10,000 samples from $p$ and $q$. Top row: a collection of ratios, where $p_1, p_2$ and $p_3$ are constructed by deterministically interpolating between samples from $p$ and $q$. Bottom row: the logistic loss function for each ratio estimation problem. Observe that the finite-sample minimisers of each objective (red dotted lines) are either close to or exactly overlapping their optima (black dotted lines). After estimating each ratio, we then combine them by taking their product.

Figure from Rhodes et al '20.
### Visual Description
The slide is titled "Practical issues" and discusses choices for $q$. Below the text, there is a large multi-panel plot. The top row of four plots shows density ratios $p(x)/p_1(x)$, $p_1(x)/p_2(x)$, $p_2(x)/p_3(x)$, and $p_3(x)/q(x)$ as functions of $x$. Each plot contains multiple colored lines representing different densities. The bottom row of four plots shows the logistic loss function $L(\theta)$ for each corresponding ratio estimation problem, with red solid lines for the loss and black and red dotted vertical lines indicating $\theta_0$ and $\theta_0'$ (or $\theta_1, \theta_1'$, etc.). A detailed caption explains the figure.
---
## Page 26
### Content
Practical issues
Are all choices of $q$ created equal?
One "baseline" choice for $q$ is a Gaussian with matching mean and covariance to the data.
A popular fix for the difficulty of choosing a good $q$ is (again)... annealing!
TRE (Telescoping Density Ratio Estimation, Rhodes et al '20):

Figure 5: MNIST samples. Each row pertains to a particular noise distribution. The first block shows exact samples from that distribution. The second & third blocks show MCMC samples from an EBM learned with NCE & TRE, respectively.

Figure from Rhodes et al '20.
### Visual Description
The slide is titled "Practical issues" and continues the discussion on choices for $q$, introducing annealing as a fix. Below the text, there is a table-like image titled "Figure 5: MNIST samples". It has three columns: "Noise distribution", "Single ratio (NCE)", and "TRE". There are three rows, each corresponding to a different noise distribution: "Gaussian", "Copula", and "RQ-NSF". Each cell in the table contains a grid of small, handwritten digit images (MNIST samples). The first column shows clear, distinct digits, while the second and third columns show digits that are more noisy or less distinct, representing MCMC samples from EBMs.
---
