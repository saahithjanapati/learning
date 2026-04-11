# April14_AvancedNeuralNetOptimization

Source: `materials/archive/April14_AvancedNeuralNetOptimization.pdf`
Duplicate equivalents: `April14_AvancedNeuralNetOptimization.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 55

## Page 1
### Content
Optimization for Machine Learning
Advanced Methods for Neural Net Optimization

Barnabas Poczos
bapoczos@cs.cmu.edu

Carnegie Mellon University
### Visual Description
Title slide with "Optimization for Machine Learning" in blue and "Advanced Methods for Neural Net Optimization" in red. Author name and email at the bottom center, Carnegie Mellon University logo at the bottom right.
---
## Page 2
### Content
Shampoo: Preconditioned Stochastic
Tensor Optimization

Vineet Gupta, Tomer Koren, Yoram Singer, 2018
https://arxiv.org/abs/1802.09568

Carnegie Mellon University
### Visual Description
Title slide with "Shampoo: Preconditioned Stochastic Tensor Optimization" in red. Authors and arXiv link below. Carnegie Mellon University logo at the bottom right.
---
## Page 3
### Content
Preconditioned Gradient Descent Methods
Notation:
Let $(x_t, y_t)$ denote the input-output data points at time step $t$
Let $g_w$ denote a neural network with parameters $w$
Let our loss at time step $t$ be: $f_t(w_t) \equiv (y_t - g_{w_t}(x_t))^2$

$f_t$ is the loss function at iteration $t$. It represents the loss incurred over a single data point (or over a batch of data).

Definition [Pre-conditioned gradient descent]:
$w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t)$, where $H_t$ is a preconditioning matrix.

Example [Newton's method]:
$w_{t+1} = w_t - [\nabla^2 f_t(w_t)]^{-1}\nabla f_t(w_t)$
### Visual Description
Text-only slide with mathematical notation and definitions.
---
## Page 4
### Content
Preconditioned Gradient Descent Methods
Classic algorithms in this family include:
* Newton's method, which employs the local Hessian as a preconditioner,
* quasi-Newton methods,
* AdaGrad: it uses the covariance matrix of the accumulated gradients to form a preconditioner.

Issues: Calculating and storing the Hessian and other preconditioners can be expensive
### Visual Description
Text-only slide with bullet points.
---
## Page 5
### Content
Key Contributions
Preconditioning methods maintain a matrix, preconditioner, which is used to transform the gradient vector before it is used to take a step.

* A new structure-aware preconditioning algorithm, called Shampoo, for stochastic optimization over tensor spaces.
* Convergence guarantees in the stochastic convex setting
* Experiments with state-of-the-art deep learning models show that Shampoo is capable of converging considerably faster than commonly used optimizers.
* Runtime per step is comparable to that of simple gradient methods such as SGD, AdaGrad, and Adam
### Visual Description
Text-only slide with bullet points.
---
## Page 6
### Content
Main Idea
* In many neural net optimization problems, the parameter we need to optimize is not a vector, but instead a matrix, or a tensor.
* Therefore, the gradient is also a matrix or a tensor.
* We want to develop preconditioners for matrices and tensors.
* Name: Shampoo
    - Because the method uses preconditioning ...
### Visual Description
Text-only slide with bullet points.
---
## Page 7
### Content
Preconditioners for Matrices
1-dim case: [preconditioner matrix for a vector parameter]
$w_{t+1} = w_t - \eta_t H_t(w_t)\nabla f_t(w_t)$, $w \in \mathbb{R}^n$
$f_t(w_t) = (y_t - g_{w_t}(x_t))^2$

2-dim case: [preconditioner matrices for a matrix parameter]
In the two dimensional case, the parameters form a matrix $W \in \mathbb{R}^{m \times n}$.
Gradient $G_t = \nabla f_t(W_t) \in \mathbb{R}^{m \times n}$.
$W_{t+1} = W_t - \eta_t L_t G_t R_t$
Here $L_t \in \mathbb{R}^{m \times m}$, $R_t \in \mathbb{R}^{n \times n}$ are the preconditioning matrices
### Visual Description
Text-only slide with mathematical formulas for 1-dim and 2-dim cases.
---
## Page 8
### Content
Preconditioners for matrices
The amount of space Shampoo uses in the matrix case is $m^2+n^2$ instead of $m^2n^2$.
Calculating the preconditioning matrices often involves matrix inversion and spectral decomposition.
Therefore, the amount of computation required to construct the left and right preconditioners is $O(m^3 + n^3)$
(substantially lower than full-matrix methods which require $O(m^3n^3)$)
### Visual Description
Text-only slide discussing space and computational complexity.
---
## Page 9
### Content
The Shampoo Algorithm for Matrices

Initialize $W_1 = \mathbf{0}_{m \times n}$; $L_0 = \epsilon I_m$; $R_0 = \epsilon I_n$
for $t = 1, \dots, T$ do
  Receive loss function $f_t: \mathbb{R}^{m \times n} \to \mathbb{R}$
  Compute gradient $G_t = \nabla f_t(W_t) \{G_t \in \mathbb{R}^{m \times n}\}$
  Update preconditioners:
    $L_t = L_{t-1} + G_t G_t^T$
    $R_t = R_{t-1} + G_t^T G_t$
  Update parameters:
    $W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}$

### Visual Description
A black box contains the steps of "The Shampoo Algorithm for Matrices". It outlines initialization, a loop for $t=1, \dots, T$ to receive a loss function, compute a gradient, update preconditioners $L_t$ and $R_t$, and finally update parameters $W_{t+1}$.
---

## Page 10
### Content
The Shampoo Algorithm for Matrices

$L_t = L_{t-1} + G_t G_t^T$
$R_t = R_{t-1} + G_t^T G_t$
$\implies W_{t+1} = W_t - \eta L_t^{-1/4} G_t R_t^{-1/4}$

The 1/4 exponent arises from analysis.

The update rule is equivalent, after flattening $W_t$ and $G_t$, to a gradient step preconditioned using the Kronecker product of $L_t^{1/4}$ and $R_t^{1/4}$.

The algorithm can be thought of as an AdaGrad with a "structured" matrix.

### Visual Description
The top of the slide shows the update rules for $L_t$, $R_t$, and $W_{t+1}$ from the Shampoo algorithm. Below this, two paragraphs explain the origin of the 1/4 exponent and the equivalence of the update rule to a preconditioned gradient step using the Kronecker product. The last sentence, highlighted in red, states that the algorithm can be thought of as an AdaGrad with a "structured" matrix.
---

## Page 11
### Content
Shampoo Regret in Online Convex Setting

**Theorem [Regret in online convex setting]**
Let $G_t = \nabla f_t \in \mathbb{R}^{m \times n}$ the gradient matrix of the loss at iteration $t$
Assume the gradients $G_1, \dots, G_T$ are matrices of rank at most $r$.
Then the regret of Shampoo compared to any $W^* \in \mathbb{R}^{m \times n}$ is bounded as follows,

Regret: $\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*) \le \sqrt{2rD} \text{Tr}(L_T^{1/4}) \text{Tr}(R_T^{1/4})$,
where
$L_T = \epsilon I_m + \sum_{t=1}^T G_t G_t^T$, $R_T = \epsilon I_n + \sum_{t=0}^T G_t^T G_t$, $D = \max_{t \in [T]} ||W_t - W^*||_{\text{Fro}}$

### Visual Description
Text-only slide.
---

## Page 12
### Content
Shampoo Regret in Online Setting

$L_T = \epsilon I_m + \sum_{t=1}^T G_t G_t^T$, $R_T = \epsilon I_n + \sum_{t=0}^T G_t^T G_t$, $D = \max_{t \in [T]} ||W_t - W^*||_{\text{Fro}}$

Let's analyze the regret:
Let $\epsilon = 0$. $\{G_t \in \mathbb{R}^{m \times n}\}_{t=1}^T$
Assume that $f_t$ are 1-Lipschitz in spectral norm, i.e., $||G_t||_2 \le 1 \ \forall t$.
$\implies G_t G_t^T \le I_m$ and $G_t^T G_t \le I_n \ \forall t$
$\implies \text{Tr}(L_T^{1/4}) = \text{Tr}((\sum_{t=1}^T G_t G_t^T)^{1/4}) \le \text{Tr}((T I_m)^{1/4}) = T^{1/4} \text{Tr}(I_m) \le m T^{1/4}$
and similarly, $\text{Tr}(R_T^{1/4}) \le n T^{1/4}$.

### Visual Description
The slide presents the definitions of $L_T$, $R_T$, and $D$ at the top. Below, it outlines the analysis of regret, starting with assumptions like $\epsilon=0$ and $f_t$ being 1-Lipschitz. It then shows mathematical derivations for bounding $\text{Tr}(L_T^{1/4})$ and $\text{Tr}(R_T^{1/4})$.
---

## Page 13
### Content
Shampoo Regret in Online Setting

$\text{Tr}(L_T^{1/4}) \le m T^{1/4}$ $\text{Tr}(R_T^{1/4}) \le n T^{1/4}$ $D = \max_{t \in [T]} ||W_t - W^*||_{\text{Fro}}$

$\sum_{t=1}^T f_t(W_t) - \sum_{t=1}^T f_t(W^*) \le \sqrt{2rD} \text{Tr}(L_T^{1/4}) \text{Tr}(R_T^{1/4})$
$\le \sqrt{2rD} m T^{1/4} n T^{1/4}$
$\le D \mathcal{O}(T^{1/2})$

To keep $D$ bounded, $W_t$ can be projected onto a convex set of matrices whose Frobenius norm is bounded.
(This projection is not used in practice.)

### Visual Description
The slide continues the regret analysis, showing the bounds for $\text{Tr}(L_T^{1/4})$, $\text{Tr}(R_T^{1/4})$, and $D$. It then presents the full regret inequality, simplifying it to $D \mathcal{O}(T^{1/2})$. The bottom text explains that $W_t$ can be projected to keep $D$ bounded, noting this is not done in practice.
---

## Page 14
### Content
Sampoo for Tensors

Introduce a square matrix for each dimension!

### Visual Description
The slide features a 3D diagram illustrating "Shampoo for Tensors". A central yellow grid-like 3D block, labeled 'G', represents a tensor. Attached to its faces are three 2D square matrices: a blue matrix 'L' on the left, a red matrix 'U' on top, and a green matrix 'R' on the right. The text at the bottom states, "Introduce a square matrix for each dimension!".
---

## Page 15
### Content
Results

Test log-perplexity of an Attention model

### Visual Description
The slide displays a line graph titled "Results". The y-axis is labeled "log(perplexity)" and ranges from 4.2 to 4.7. The x-axis is labeled "Steps" and ranges from 1 to 5, scaled by $10^5$. Four lines represent different optimization algorithms: Adagrad (green), Momentum (black), Adam (blue), and Shampoo (red). The Shampoo line shows the lowest and most rapidly decreasing log-perplexity, indicating superior performance.
---

## Page 16
### Content
Soap

*   **How to improve on Shampoo?**
    *   Shampoo is Adagrad using a structured preconditioner.
    *   It was developed to optimize an objective function over matrices and tensors.
*   **New Idea:**
    *   Let us combine ideas from Shampoo and Adam for matrices and tensors!
    *   Name: Shampoo with Adam in the Preconditioner's eigenbasis (**SOAP**).
*   **SOAP: Improving and Stabilizing Shampoo using Adam**
    Vyas et al, 2024, https://arxiv.org/abs/2409.11321

### Visual Description
Text-only slide.
---
## Page 17
### Content
# Adaptive Normalized Gradient Descent (AdaNGD)

Kfir Y. Levy, 2017
https://arxiv.org/abs/1705.10499

Slide 17
### Visual Description
The slide features the title "Adaptive Normalized Gradient Descent (AdaNGD)" in large, bold, red font, centered on the upper half of the page. Below it, in smaller black font, are the author's name "Kfir Y. Levy, 2017" and a link "https://arxiv.org/abs/1705.10499". The bottom left corner has "Slide 17" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 18
### Content
# Key Contributions

A new approach towards convex optimization:
* It shows how to convert regrets of online adaptive algorithms into convergence rates of offline methods
* Introduce a generalization of AdaGrad: AdaNGD
* Relatively simple theory for analyzing convergence rates.

Slide 18
### Visual Description
The slide has the title "Key Contributions" in large, bold, blue font at the top. Below it, the text "A new approach towards convex optimization:" is presented, followed by three bullet points detailing the contributions. The text is black. The bottom left corner has "Slide 18" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 19
### Content
# AdaGrad (Simple version)

**Algorithm 1 Adaptive Gradient Descent (AdaGrad)**
Input: #Iterations $T$, $x_1 \in \mathbb{R}^d$, set $K$
Set: $Q_0 = 0$
for $t = 1...T$ do
  Calculate: $g_t = \nabla f_t(x_t)$
  Update:
    $Q_t = Q_{t-1} + ||g_t||^2$
  Set $\eta_t = D/\sqrt{2Q_t}$
  Update:
    $x_{t+1} = \Pi_K (x_t - \eta_t g_t)$
end for

In this case, the preconditioner $Q_t \in \mathbb{R}$, instead of being a diagonal or a full matrix.

Slide 19
### Visual Description
The slide is titled "AdaGrad (Simple version)" in large, bold, blue font. Below the title is a box containing "Algorithm 1 Adaptive Gradient Descent (AdaGrad)". The algorithm details input, initialization, a loop for $t=1...T$ with steps for calculating $g_t$, updating $Q_t$, setting $\eta_t$, and updating $x_{t+1}$. Below the algorithm box, there is a sentence explaining the nature of the preconditioner $Q_t$. The bottom left corner has "Slide 19" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 20
### Content
# AdaGrad Online Regret

**Definition [Diameter]** For a set $K \subset \mathbb{R}^d$, its diameter is defined as $D = \sup_{x,y \in K} ||x - y||$.

**Theorem 1.1**
Let $K$ be a convex set with diameter $D$.
Let $\{f_t\}_{t=1}^T$ be an arbitrary sequence of convex loss functions.
Let $g_t \in \partial f_t(x_t)$ be a subgradient.
Then AdaGrad guarantees the following regret:

Online regret: $\sum_{t=1}^T f_t(x_t) - \min_{x \in K} \sum_{t=1}^T f_t(x) \leq \sqrt{2D^2 \sum_{t=1}^T ||g_t||^2}$.

Online optimization: We care about the losses during the whole optimization process, not just at the end!

Proof: [Next slides]

Slide 20
### Visual Description
The slide is titled "AdaGrad Online Regret" in large, bold, blue font. It presents a "Definition [Diameter]" and "Theorem 1.1" with its conditions and the resulting "Online regret" formula. The formula is a large mathematical expression. Below the formula, there's a red-colored explanation of "Online optimization". At the bottom, "Proof: [Next slides]" is written. The bottom left corner has "Slide 20" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 21
### Content
# Proof of Bound on Online Regret

Let $x \in K$ and consider the update rule $x_{t+1} = \Pi_K(x_t - \eta_t g_t)$.
We can write:
$||x_{t+1} - x||^2 = ||\Pi_K(x_t - \eta_t g_t) - x||^2$
$= ||\Pi_K(x_t - \eta_t g_t) - \Pi_K(x)||^2 \quad [\text{since } ||\Pi_K(y) - \Pi_K(x)||_2 \leq ||y - x||_2 \quad \forall x, \forall y]$
$\leq ||(x_t - \eta_t g_t) - x||^2$
$\leq ||x_t - x||^2 - 2\eta_t g_t^T (x_t - x) + \eta_t^2 ||g_t||^2$

Re-arranging the above we get:
$g_t^T (x_t - x) \leq \frac{1}{2\eta_t} (||x_t - x||^2 - ||x_{t+1} - x||^2) + \frac{\eta_t}{2} ||g_t||^2$.

Slide 21
### Visual Description
The slide is titled "Proof of Bound on Online Regret" in large, bold, blue font. It presents a mathematical derivation starting with the update rule for $x_{t+1}$ and expanding $||x_{t+1} - x||^2$. Each step of the derivation is shown on a new line, with an explanation for one of the steps in square brackets. The derivation concludes with a rearranged inequality for $g_t^T (x_t - x)$. The bottom left corner has "Slide 21" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 22
### Content
# Proof Continued

**Observations:**
$Q_t := Q_{t-1} + ||g_t||^2 \Rightarrow Q_t = \sum_{\tau=1}^t ||g_\tau||^2$
$\eta_t := \frac{D}{\sqrt{2Q_t}} = \frac{D}{\sqrt{2\sum_{\tau=1}^t ||g_\tau||^2}}$

$f_t(x_t) - f_t(x) \leq g_t^T (x_t - x) \leq \frac{1}{2\eta_t} (||x_t - x||^2 - ||x_{t+1} - x||^2) + \frac{\eta_t}{2} ||g_t||^2 \quad \forall x \in K$
[Since $f_t$ is convex]

**Telescoping sum:**
$\sum_{t=1}^T f_t(x_t) - \sum_{t=1}^T f_t(x) \leq \underbrace{\sum_{t=1}^T \frac{||x_t - x||^2}{2} \left(\frac{1}{\eta_t} - \frac{1}{\eta_{t-1}}\right)}_{A} + \underbrace{\sum_{t=1}^T \frac{\eta_t}{2} ||g_t||^2}_{B} \quad [\text{Using } \eta_0 = \infty \text{ notation}]$

$= A + B$

Slide 22
### Visual Description
The slide is titled "Proof Continued" in large, bold, blue font. It starts with an "Observations" section, defining $Q_t$ and $\eta_t$ with their respective formulas. This is followed by an inequality relating $f_t(x_t) - f_t(x)$ to terms involving $x_t, x_{t+1}, g_t$, and $\eta_t$, with a note about $f_t$ being convex. The next section, "Telescoping sum", shows the sum of the inequality, breaking it down into two main terms labeled 'A' and 'B', with a note about $\eta_0 = \infty$. The final line states "$= A + B$". The bottom left corner has "Slide 22" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 23
### Content
# Proof Continued

$\eta_t = \frac{D}{\sqrt{2\sum_{\tau=1}^t ||g_\tau||^2}}$

Let us bound the first term, A:
$A = \sum_{t=1}^T \frac{||x_t - x||^2}{2} \left(\frac{1}{\eta_t} - \frac{1}{\eta_{t-1}}\right)$
$\leq \frac{D^2}{2} \sum_{t=1}^T \left(\frac{1}{\eta_t} - \frac{1}{\eta_{t-1}}\right)$
$= \frac{D^2}{2} \left(\frac{1}{\eta_T} - \frac{1}{\eta_0}\right)$
$= \frac{D^2}{2\eta_T} \quad [\text{Using } \eta_0 = \infty \text{ notation}]$
$= \frac{D^2}{2} \frac{\sqrt{2\sum_{\tau=1}^T ||g_\tau||^2}}{D}$
$= \frac{D}{\sqrt{2}} \sum_{\tau=1}^T ||g_\tau||^2$

Slide 23
### Visual Description
The slide is titled "Proof Continued" in large, bold, blue font. At the top right, the formula for $\eta_t$ is repeated. The main content focuses on bounding the first term, 'A', from the previous slide. A series of mathematical inequalities and equalities are presented, simplifying the expression for 'A' step-by-step, including a note about $\eta_0 = \infty$. The final result for 'A' is $\frac{D}{\sqrt{2}} \sum_{\tau=1}^T ||g_\tau||^2$. The bottom left corner has "Slide 23" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 24
### Content
# Proof Continued

**Lemma** For any non-negative numbers $a_1,..., a_n$ the following holds:
$\sum_{i=1}^n \frac{a_i}{\sqrt{\sum_{j=1}^i a_j}} \leq 2\sqrt{\sum_{i=1}^n a_i}$

Therefore,
$\sum_{t=1}^T \frac{||g_t||^2}{\sqrt{\sum_{\tau=1}^t ||g_\tau||^2}} \leq 2\sqrt{\sum_{t=1}^T ||g_t||^2}$

Let us bound B: $\eta_t = \frac{D}{\sqrt{2\sum_{\tau=1}^t ||g_\tau||^2}}$
$B = \sum_{t=1}^T \frac{\eta_t}{2} ||g_t||^2 = \sum_{t=1}^T \frac{D}{2\sqrt{2\sum_{\tau=1}^t ||g_\tau||^2}} ||g_t||^2$
$= \frac{D}{2\sqrt{2}} \sum_{t=1}^T \frac{||g_t||^2}{\sqrt{\sum_{\tau=1}^t ||g_\tau||^2}}$
$\leq \frac{D}{2\sqrt{2}} 2\sqrt{\sum_{t=1}^T ||g_t||^2}$
$= \frac{D}{\sqrt{2}} \sqrt{\sum_{t=1}^T ||g_t||^2}$

Slide 24
### Visual Description
The slide is titled "Proof Continued" in large, bold, blue font. It presents a "Lemma" for non-negative numbers $a_1,..., a_n$ with its corresponding inequality. This lemma is then applied to the context of the proof, showing a "Therefore" section with an inequality involving $||g_t||^2$. The next section, "Let us bound B:", defines $\eta_t$ again and then proceeds to derive the upper bound for term 'B' using the lemma. The derivation involves several steps of mathematical simplification. The bottom left corner has "Slide 24" and the bottom right corner has the "Carnegie Mellon University" logo.
---
## Page 25
### Content
We already know:
$$ \sum_{t=1}^T f_t(x_t) - \sum_{t=1}^T f_t(x) \leq \sum_{t=1}^T \frac{||x_t - x||^2}{2} \left( \frac{1}{\eta_t} - \frac{1}{\eta_{t-1}} \right) + \sum_{t=1}^T \frac{\eta_t}{2} ||g_t||^2 = A+B \quad \forall x \in K $$
$$ \leq \frac{D}{\sqrt{2}} \sum_{\tau=1}^T ||g_\tau||^2 + \frac{D}{\sqrt{2}} \sum_{t=1}^T ||g_t||^2 $$
$$ = \sqrt{2}D \sum_{t=1}^T ||g_t||^2 $$
$$ \implies \sum_{t=1}^T f_t(x_t) - \min_{x \in K} \sum_{t=1}^T f_t(x) \leq 2D^2 \sum_{t=1}^T ||g_t||^2. $$
### Visual Description
A slide titled "Proof Continued" showing a series of mathematical inequalities involving sums, norms, and variables like $f_t(x)$, $x_t$, $g_t$, $\eta_t$, $D$, $A$, $B$, and $K$. The equations demonstrate steps in a proof, starting with an inequality involving sums of $f_t(x)$ and ending with an inequality involving $2D^2 \sum ||g_t||^2$.
---
## Page 26
### Content
Adaptive Normalized Gradient (AdaNGD)
We will generalize AdaGrad using normalized gradients (AdaNGD)

**Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)**
*   **Input:** #Iterations T, $x_1 \in \mathbb{R}^d$, set $K$, parameter $k$
*   **Set:** $Q_0 = 0$
*   **for** $t = 1 \dots T-1$ **do**
    *   **Calculate:** $g_t = \nabla f(x_t)$, $\hat{g}_t = g_t/||g_t||^k$
    *   **Update:** $Q_t = Q_{t-1} + 1/||g_t||^{2(k-1)}$
    *   **Set** $\eta_t = D/\sqrt{2Q_t}$
    *   **Update:** $x_{t+1} = \Pi_K (x_t - \eta_t \hat{g}_t)$
*   **end for**
*   **Return:** $\bar{x}_T = \sum_{t=1}^T \frac{1/||g_t||^k}{\sum_{\tau=1}^T 1/||g_\tau||^k} x_t$
### Visual Description
A slide titled "Adaptive Normalized Gradient (AdaNGD)" with a subtitle "We will generalize AdaGrad using normalized gradients (AdaNGD)". The main content is a boxed algorithm named "Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)" which details the input, initialization, a loop for calculation and updates, and a return statement for the algorithm.
---
## Page 27
### Content
Adaptive Normalized Gradient (AdaNGD)

**Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)**
*   **Input:** #Iterations T, $x_1 \in \mathbb{R}^d$, set $K$, parameter $k$
*   **Set:** $Q_0 = 0$
*   **for** $t = 1 \dots T-1$ **do**
    *   **Calculate:** $g_t = \nabla f(x_t)$, $\hat{g}_t = g_t/||g_t||^k$
    *   **Update:** $Q_t = Q_{t-1} + 1/||g_t||^{2(k-1)}$
    *   **Set** $\eta_t = D/\sqrt{2Q_t}$
    *   **Update:** $x_{t+1} = \Pi_K (x_t - \eta_t \hat{g}_t)$
*   **end for**
*   **Return:** $\bar{x}_T = \sum_{t=1}^T \frac{1/||g_t||^k}{\sum_{\tau=1}^T 1/||g_\tau||^k} x_t$

For $k = 0$, AdaNGD$_k$ becomes AdaGrad.
When query points with small gradients are encountered, AdaNGD$_k$ (with $k \geq 1$) reduces the learning rate, thus focusing on the region around these points.
### Visual Description
A slide titled "Adaptive Normalized Gradient (AdaNGD)" displaying "Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)" in a box. Below the algorithm, there are two bullet points explaining the behavior of AdaNGD$_k$ for specific values of $k$ and its implications for learning rate and focus.
---
## Page 28
### Content
Adaptive Normalized Gradient (AdaNGD)

**Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)**
*   **Input:** #Iterations T, $x_1 \in \mathbb{R}^d$, set $K$, parameter $k$
*   **Set:** $Q_0 = 0$
*   **for** $t = 1 \dots T-1$ **do**
    *   **Calculate:** $g_t = \nabla f(x_t)$, $\hat{g}_t = g_t/||g_t||^k$
    *   **Update:** $Q_t = Q_{t-1} + 1/||g_t||^{2(k-1)}$
    *   **Set** $\eta_t = D/\sqrt{2Q_t}$
    *   **Update:** $x_{t+1} = \Pi_K (x_t - \eta_t \hat{g}_t)$
*   **end for**
*   **Return:** $\bar{x}_T = \sum_{t=1}^T \frac{1/||g_t||^k}{\sum_{\tau=1}^T 1/||g_\tau||^k} x_t$

### Observation
For $k = 1$, the learning rate becomes independent of the gradients, i.e. $\eta_t = D/\sqrt{2t}$
$Q_t = t$
$\bar{x}_T = c \sum_{t=1}^T \frac{1}{||g_t||} x_t$ with $c = \frac{1}{\sum_{\tau=1}^T \frac{1}{||g_\tau||}}$
$x_{t+1} = \Pi_K(x_t - \eta_t \frac{g_t}{||g_t||})$
### Visual Description
A slide titled "Adaptive Normalized Gradient (AdaNGD)" showing "Algorithm 2 Adaptive Normalized Gradient Descent (AdaNGDk)" in a box. Below the algorithm, there's an "Observation" section with text and mathematical equations explaining the behavior of AdaNGD when $k=1$, specifically how the learning rate becomes independent of gradients and the form of $Q_t$, $\bar{x}_T$, and $x_{t+1}$.
---
## Page 29
### Content
Adaptive Normalized Gradient (AdaNGD)
$$ \bar{x}_T = \sum_{t=1}^T \frac{1/||g_t||^k}{\sum_{\tau=1}^T 1/||g_\tau||^k} x_t $$
Each query point is weighted inversely proportional to the $k$'th power norm of its gradient.

### Motivation (k>0)
If the gradient is small, the weight should be high: we must be close to an optimum and it is an important point.
### Visual Description
A slide titled "Adaptive Normalized Gradient (AdaNGD)" displaying a single mathematical equation for $\bar{x}_T$ at the top. Below it, there are two text paragraphs: one describing the weighting of query points and another, titled "Motivation (k>0)", explaining why a high weight is assigned when the gradient is small.
---
## Page 30
### Content
Adaptive Normalized Gradient (AdaNGD)

### Lemma
Assume we ran AdaNGD$_k$ on a function $f(x)$ for $T$ iterations, and got the $\{g_t\}_{t=1}^T$ sequence.
The AdaNGD$_k$ updates are equivalent to invoking AdaGrad with the following linear loss sequence: $\{\tilde{f}_t(x) := g_t^T x / ||g_t||^k\}_{t=1}^T$.
### Visual Description
A slide titled "Adaptive Normalized Gradient (AdaNGD)" presenting a "Lemma". The lemma consists of two paragraphs, stating an assumption about running AdaNGD$_k$ and then asserting the equivalence of AdaNGD$_k$ updates to AdaGrad with a specific linear loss sequence.
---
## Page 31
### Content
Proof of the Lemma

### Proof:
The differences between AdaGrad and AdaNGD are the $Q_t$ and $x_{t+1}$ updates.
The gradients of the loss functions: $\{\nabla \tilde{f}_t(x) = g_t/||g_t||^k\}_{t=1}^T$.
The AdaGrad update for $Q_t$:
$$ Q_t = \sum_{\tau=1}^t ||\nabla \tilde{f}_\tau||^2 = \sum_{\tau=1}^t \frac{||g_\tau||^2}{||g_\tau||^{2k}} = \sum_{\tau=1}^t ||g_\tau||^{2-2k} = \sum_{\tau=1}^t \frac{1}{||g_\tau||^{2(k-1)}} $$
This is indeed the same as the AdaNGD update for $Q_t$.
### Visual Description
A slide titled "Proof of the Lemma". It begins by stating the differences between AdaGrad and AdaNGD updates. It then provides the gradients of the loss functions and shows a series of mathematical equalities demonstrating that the AdaGrad update for $Q_t$ is identical to the AdaNGD update for $Q_t$.
---
## Page 32
### Content
Proof of the Lemma (Continued)

The AdaGrad update for $x_{t+1}$:
$$ x_{t+1} = \Pi_K(x_t - \eta_t \nabla \tilde{f}_t) $$
$$ = \Pi_K(x_t - \eta_t \frac{g_t}{||g_t||^k}) $$
This is indeed the same as the AdaNGD update for $x_{t+1}$.
### Visual Description
A slide titled "Proof of the Lemma (Continued)". It presents the AdaGrad update for $x_{t+1}$ as a mathematical equation, showing how it simplifies to the same form as the AdaNGD update for $x_{t+1}$, thus completing the proof of equivalence.
---
## Page 33
### Content
AdaNGD Convergence Rate

**Lemma 2.1 [AdaNGD] Convergence**
Let $k \in \mathbb{R}$, $K$ be a convex set with diameter $D$.
Let $f$ be a convex function.
Also let $\bar{x}_T$ be the output of AdaNGD$_k$.

Then the following holds:
$$f(\bar{x}_T) - \min_{x \in K} f(x) \le \frac{\sqrt{2D^2 \sum_{t=1}^T 1/\|g_t\|^{2(k-1)}}}{\sum_{t=1}^T 1/\|g_t\|^k}$$

This is not an online regret anymore.
It is a standard, offline convergence rate!
### Visual Description
The slide presents Lemma 2.1 for AdaNGD convergence, stating the conditions for $k$, $K$, $D$, and $f$, and then provides a complex mathematical inequality for the convergence rate. Below the inequality, there are two lines of text emphasizing that this is an offline convergence rate, not an online regret.
---
## Page 34
### Content
Proof of Lemma 2.1 [AdaNGD] Convergence Rate

**Proof of Lemma 2.1 [AdaNGD Convergence Rate]**
Notice that AdaNGD$_k$ is equivalent to applying AdaGrad to the following sequence of linear loss functions:
$$f_t(x) := \frac{1}{\|g_t\|^k} g_t^T x$$
The gradients of the loss functions: $\{\nabla f_t(x) = g_t/\|g_t\|^k\}_{t=1}^T$.

**Let's use Theorem 1.1**
$$\sum_{t=1}^T \tilde{f}_t(x_t) - \sum_{t=1}^T f_t(x) \le \sqrt{2D^2 \sum_{t=1}^T \|\nabla f_t\|^2} \quad \forall x \in K$$
$$\sum_{t=1}^T \frac{1}{\|g_t\|^k} g_t^T x_t - \sum_{t=1}^T \frac{1}{\|g_t\|^k} g_t^T x \le \sqrt{2D^2 \sum_{t=1}^T \frac{1}{\|g_t\|^{2k}} \|g_t\|^2}$$
### Visual Description
The slide details the beginning of the proof for Lemma 2.1. It explains that AdaNGD$_k$ is equivalent to AdaGrad on a sequence of linear loss functions, providing the definition of $f_t(x)$ and its gradient. It then states that Theorem 1.1 is used, followed by two lines of mathematical inequalities applying and expanding Theorem 1.1.
---
## Page 35
### Content
Proof Continued

**We already know:**
$$\bar{x}_T := \sum_{t=1}^T \frac{1/\|g_t\|^k}{\sum_{\tau=1}^T 1/\|g_\tau\|^k} x_t = \sum_{t=1}^T p_t x_t$$

**Jensen's inequality:**
$$f\left(\sum_{t=1}^T p_t x_t\right) \le \sum_{t=1}^T p_t f(x_t)$$

**Therefore,**
$$f(\bar{x}_T) = f\left(\sum_{t=1}^T \frac{1/\|g_t\|^k}{\sum_{\tau=1}^T 1/\|g_\tau\|^k} x_t\right) \le \sum_{t=1}^T \frac{1/\|g_t\|^k}{\sum_{\tau=1}^T 1/\|g_\tau\|^k} f(x_t)$$
$$f(\bar{x}_T) - f(x^*) \le \sum_{t=1}^T \frac{\|g_t\|^{-k}}{\sum_{\tau=1}^T \|g_\tau\|^{-k}} (f(x_t) - f(x^*))$$
### Visual Description
The slide continues the proof, starting by defining $\bar{x}_T$ as a weighted average of $x_t$. It then applies Jensen's inequality to $f(\bar{x}_T)$ and shows the resulting inequality. The final part of the slide presents another inequality, subtracting $f(x^*)$ from both sides, to further develop the proof.
---
## Page 36
### Content
Proof Continued

**We know:**
$$f(x_t) - f(x^*) \le g_t^T (x_t - x^*) \quad \text{[Since f is convex]}$$

**Therefore,**
$$f(\bar{x}_T) - f(x^*) \le \sum_{t=1}^T \frac{\|g_t\|^{-k}}{\sum_{\tau=1}^T \|g_\tau\|^{-k}} (f(x_t) - f(x^*))$$
$$\le \sum_{t=1}^T \frac{\|g_t\|^{-k}}{\sum_{\tau=1}^T \|g_\tau\|^{-k}} g_t^T (x_t - x^*)$$
$$= \frac{1}{\sum_{\tau=1}^T \|g_\tau\|^{-k}} \sum_{t=1}^T \frac{1}{\|g_t\|^k} g_t^T (x_t - x^*)$$
### Visual Description
The slide continues the proof by first stating a known property of convex functions: $f(x_t) - f(x^*) \le g_t^T (x_t - x^*)$. It then uses this property to derive a series of inequalities for $f(\bar{x}_T) - f(x^*)$, simplifying the expression by factoring out the sum in the denominator.
---
## Page 37
### Content
Proof Continued

**We already proved:**
$$\sum_{t=1}^T \frac{1}{\|g_t\|^k} g_t^T (x_t - x) \le \sqrt{2D^2 \sum_{t=1}^T \frac{\|g_t\|^2}{\|g_t\|^{2k}}} = \sqrt{2D^2 \sum_{t=1}^T \|g_t\|^{2-2k}} = \sqrt{2D^2 \sum_{t=1}^T \frac{1}{\|g_t\|^{2(k-1)}}}$$

**Let's use it!**

**We already know:**
$$f(\bar{x}_T) - f(x^*) \le \frac{1}{\sum_{\tau=1}^T \|g_\tau\|^{-k}} \sum_{t=1}^T \frac{1}{\|g_t\|^k} g_t^T (x_t - x^*)$$
$$\le \frac{\sqrt{2D^2 \sum_{\tau=1}^T 1/\|g_\tau\|^{2(k-1)}}}{\sum_{\tau=1}^T 1/\|g_\tau\|^k} \quad \blacksquare$$
### Visual Description
The slide continues the proof, referencing a previously established inequality involving the sum of $g_t^T(x_t - x)$ terms, which is simplified through algebraic steps. It then combines this result with the expression for $f(\bar{x}_T) - f(x^*)$ from the previous slide, leading to the final inequality of the proof, marked with a black square indicating completion.
---
## Page 38
### Content
AdaNGD with k=1

**Theorem 2.1a**
Let $k = 1$ and $K$ be a convex set with diameter $D$.
Let $f$ be a convex function with bounded subgradients $\|g_t\| \le G$.
Let $\bar{x}_T$ be the outputs of AdaNGD$_1$.

Then the following holds:
$$f(\bar{x}_T) - \min_{x \in K} f(x) \le \frac{\sqrt{2D^2 T}}{\sum_{t=1}^T 1/\|g_t\|} \le \frac{\sqrt{2}GD}{\sqrt{T}}$$
### Visual Description
The slide introduces Theorem 2.1a, which specifies the convergence rate of AdaNGD when the parameter $k=1$. It lists the conditions for the theorem, including $K$ being a convex set with diameter $D$, $f$ being a convex function with bounded subgradients $\|g_t\| \le G$, and $\bar{x}_T$ being the output of AdaNGD$_1$. The theorem concludes with a two-part mathematical inequality showing the upper bound for $f(\bar{x}_T) - \min f(x)$.
---
## Page 39
### Content
AdaNGD with k=1

**Theorem 2.1b**
Moreover, if $f$ is also $\beta$-smooth and the global minimum $x^* = \arg \min_{x \in \mathbb{R}^n} f(x)$ belongs to $K$, then:
$$f(\bar{x}_T) - \min_{x \in K} f(x) \le \frac{D\sqrt{T}}{\sum_{t=1}^T 1/\|g_t\|} \le \frac{4\beta D^2}{T}$$

The same algorithm enjoys these rates simultaneously (2.1a, 2.1b), without any prior knowledge of the smoothness or of the gradient norms (e.g. the step size doesn't need to know the smoothness)
### Visual Description
The slide presents Theorem 2.1b, which extends the convergence analysis of AdaNGD with $k=1$ to the case where the function $f$ is also $\beta$-smooth and its global minimum $x^*$ is within the set $K$. It provides a new mathematical inequality for the convergence rate under these conditions. The bottom text highlights a key advantage: the algorithm achieves both rates (2.1a and 2.1b) simultaneously without requiring prior knowledge of smoothness or gradient norms.
---
## Page 40
### Content
Decoupled Weight Decay Regularization
(AdamW)

Ilya Loshchilov & Frank Hutter
https://arxiv.org/abs/1711.05101
### Visual Description
The slide features a large, bold title "Decoupled Weight Decay Regularization (AdamW)" in red. Below the title, the authors "Ilya Loshchilov & Frank Hutter" are listed, followed by a link to their paper on arXiv: "https://arxiv.org/abs/1711.05101". This appears to be a title slide for a new section or topic.
---
## Page 41
### Content
## Weight Decay
**Definition: SGD with weight decay [Hanson & Pratt, 1988]**
$\theta_{t+1} = (1 - \lambda)\theta_t - \alpha\nabla f_t(\theta_t)$

The weights $\theta$ decay exponentially.
Here $\lambda$ defines the rate of the weight decay per step.
$\nabla f_t(\theta_t)$ is the $t$-th batch gradient
$\alpha$ is the learning rate
### Visual Description
Text-only slide. The title "Weight Decay" is at the top. Below it is a definition of SGD with weight decay, followed by an equation. The terms in the equation are then explained in bullet points.
---
## Page 42
### Content
## Weight Decay
**SGD with weight decay:** $\theta_{t+1} = (1 - \lambda)\theta_t - \alpha\nabla f_t(\theta_t)$

**Theorem:** [Weight decay = L2 regularization for standard SGD]
Standard SGD with weight decay $\lambda$ and learning rate $\alpha$
executes the same steps on batch loss functions $f_t(\theta)$
as it executes without weight decay on
$f_t^{reg}(\theta) = f_t(\theta) + \frac{\lambda'}{2}||\theta||_2^2$ with $\lambda' = \frac{\lambda}{\alpha}$.
### Visual Description
Text-only slide. The title "Weight Decay" is at the top. It repeats the SGD with weight decay equation. Below this, a theorem is stated, followed by an explanation of the equivalence between weight decay and L2 regularization, concluding with the regularized loss function.
---
## Page 43
### Content
## Proof of Weight decay = L2 regularization for standard SGD
**Proof:**
$f_t^{reg}(\theta) := f_t(\theta) + \frac{\lambda'}{2}||\theta||_2^2$, $\lambda' = \frac{\lambda}{\alpha}$

* SGD without weight decay has the following iterates on
$f_t^{reg}(\theta) = f_t(\theta) + \frac{\lambda'}{2}||\theta||_2^2$:
$\theta_{t+1} \leftarrow \theta_t - \alpha\nabla f_t^{reg}(\theta_t) = \theta_t - \alpha\nabla f_t(\theta_t) - \alpha\lambda'\theta_t$.
$= \theta_t - \alpha\nabla f_t(\theta_t) - \lambda\theta_t$.

* SGD with $\lambda$ weight decay has the following iterates on $f_t(\theta)$:
$\theta_{t+1} \leftarrow (1 - \lambda)\theta_t - \alpha\nabla f_t(\theta_t)$.

These iterates are identical since $\lambda' = \frac{\lambda}{\alpha}$.
### Visual Description
Text-only slide. The title indicates a proof. The proof starts with the definition of the regularized loss function. It then shows the iterates for SGD without weight decay on the regularized loss and for SGD with weight decay on the original loss, demonstrating their equivalence.
---
## Page 44
### Content
## Weight Decay vs L2 Regularization

* Due to this equivalence, L2 regularization is very frequently referred to as weight decay, including in popular deep learning libraries.

* However, this equivalence does NOT hold for adaptive gradient methods.

One fact that is often overlooked is that in order for the equivalence to hold,
the L2 regularizer $\lambda'$ has to be set to $\frac{\lambda}{\alpha}$
i.e., if there is an overall best weight decay value $\lambda$, the best
value of L2 regularizer $\lambda'$ is tightly coupled with the learning rate $\alpha$.
### Visual Description
Text-only slide. The title is "Weight Decay vs L2 Regularization". It contains two main bullet points discussing the common terminology and a crucial limitation regarding adaptive gradient methods. Further text explains the coupling between $\lambda'$ and $\alpha$.
---
## Page 45
### Content
## Weight Decay vs L2 Regularization
## in Adaptive Methods

Let $O$ denote an optimizer that has iterates
$\theta_{t+1} \leftarrow \theta_t - \alpha M_t \nabla f_t(\theta_t)$
when run on batch loss function $f_t(\theta)$ without weight decay,

and $\theta_{t+1} \leftarrow (1 - \lambda)\theta_t - \alpha M_t \nabla f_t(\theta_t)$
when run on $f_t(\theta)$ with weight decay,

Let $M_t \neq kI$ (where $k \in \mathbb{R}$).
### Visual Description
Text-only slide. The title is "Weight Decay vs L2 Regularization in Adaptive Methods". It introduces an optimizer $O$ and defines its update rules for both cases: without weight decay and with weight decay. A condition on $M_t$ is also stated.
---
## Page 46
### Content
## Weight Decay vs L2 Regularization
## in Adaptive Methods

**Theorem:** [Weight decay $\neq$ L2 reg for adaptive methods]
[Here we use the above listed conditions for $O$]

Then, there exists no L2 coefficient $\lambda'$ such that
* running $O$ on loss $f_t^{reg}(\theta) = f_t(\theta) + \frac{\lambda'}{2}||\theta||_2^2$ without weight decay
* is equivalent to running $O$ on $f_t(\theta)$ with weight decay $\lambda \in \mathbb{R}^+$.
### Visual Description
Text-only slide. The title is "Weight Decay vs L2 Regularization in Adaptive Methods". It presents a theorem stating that weight decay is not equivalent to L2 regularization for adaptive methods, followed by two bullet points detailing what this non-equivalence means.
---
## Page 47
### Content
## Proof of Weight decay $\neq$ L2 reg for adaptive methods
**Proof:**
The iterates of $O$ without weight decay on $f_t^{reg}(\theta) = f_t(\theta) + \frac{1}{2}\lambda' ||\theta||_2^2$
$\theta_{t+1} \leftarrow \theta_t - \alpha M_t \nabla f_t^{reg}(\theta_t) = \theta_t - \alpha M_t \nabla f_t(\theta_t) - \alpha\lambda' M_t \theta_t$
and with weight decay $\lambda$ on $f_t$:
$\theta_{t+1} \leftarrow (1 - \lambda)\theta_t - \alpha M_t \nabla f_t(\theta_t)$.

The equality of these iterates for all $\theta_t$ would imply $\lambda\theta_t = \alpha\lambda'M_t\theta_t$.
This can only hold for all $\theta_t$ if $M_t = kI$, with $k \in \mathbb{R}$, which is not the case for $O$.
Therefore, no L2 regularizer $\lambda' ||\theta||_2^2$ exists that makes the iterates equivalent.
### Visual Description
Text-only slide. The title indicates a proof. The proof shows the iterates for an optimizer $O$ without weight decay on a regularized loss and with weight decay on the original loss. It then logically demonstrates that these iterates cannot be equivalent under the given conditions for adaptive methods.
---
## Page 48
### Content
## Main Idea

Create methods that can decouple the
* weight decay step $\lambda_w$
* from L2 regularization term $\lambda_r$

* weight decay: $\theta_{t+1} = (1 - \lambda_w)\theta_t - \alpha M_t \nabla f_t(\theta_t)$.
* L2 regularization: $\nabla f_t(\theta_t) \rightarrow \nabla f_t(\theta_t) + \lambda_r \theta_t$
* weight decay with L2 regularization:
$\theta_{t+1} = (1 - \lambda_w)\theta_t - \alpha M_t(\nabla f_t(\theta_t) + \lambda_r \theta_t)$.
### Visual Description
Text-only slide. The title is "Main Idea". It outlines the goal of creating methods to decouple weight decay and L2 regularization. It then presents the update equations for weight decay, L2 regularization, and their combined form.
---
## Page 49
### Content
Weight decay and L2 regularization with Momentum
We are in $\theta_{t-1}$. We need the update for $\theta_t$
$m_{t-1} = \theta_{t-2} - \theta_{t-1}$
$m_t = \beta m_{t-1} + \eta_t \nabla f_t(\theta_{t-1}) = \theta_{t-1} - \theta_t$
$\theta_t = \theta_{t-1} - m_t = \theta_{t-1} - \beta m_{t-1} - \eta_t \nabla f_t(\theta_{t-1}) = \theta_{t-1} - \eta_t \nabla f_t(\theta_{t-1}) - \beta(\theta_{t-2} - \theta_{t-1})$

* momentum with L$_2$ regularization: $\nabla f_t(\theta) \rightarrow \nabla f_t(\theta) + \lambda_r \theta$
$g_t = \nabla f_t(\theta_{t-1}) + \lambda_r \theta_{t-1}$
$m_t = \beta m_{t-1} + \eta_t g_t$
$\theta_t = \theta_{t-1} - m_t$

* momentum with weight decay:
Instead of $\theta_t = \theta_{t-1} - m_t$, let's use $\theta_t = (1 - \lambda_w)\theta_{t-1} - m_t$
$= \theta_{t-1} - m_t - \lambda_w \theta_{t-1}$
### Visual Description
Text-only slide.
---
## Page 50
### Content
Putting it Together: SGDW

**Algorithm 1** SGD with L2 regularization and SGD with decoupled weight decay (SGDW), both with momentum
1: **given** initial learning rate $\alpha \in \mathbb{R}$, momentum factor $\beta_1 \in \mathbb{R}$, weight decay/L2 regularization factor $\lambda \in \mathbb{R}$
2: **initialize** time step $t \leftarrow 0$, parameter vector $\theta_{t=0} \in \mathbb{R}^n$, first moment vector $m_{t=0} \leftarrow 0$, schedule multiplier $\eta_{t=0} \in \mathbb{R}$
3: **repeat**
4: $\quad t \leftarrow t+1$
5: $\quad \nabla f_t(\theta_{t-1}) \leftarrow \text{SelectBatch}(\theta_{t-1})$ $\triangleright$ select batch and return the corresponding gradient
6: $\quad g_t \leftarrow \nabla f_t(\theta_{t-1}) + \lambda \theta_{t-1}$ $g_t = \nabla f_t(\theta_{t-1}) + \lambda_r \theta_{t-1}$
7: $\quad \eta_t \leftarrow \text{SetScheduleMultiplier}(t)$ $\triangleright$ can be fixed, decay, be used for warm restarts
8: $\quad m_t \leftarrow \beta_1 m_{t-1} + \eta_t \alpha g_t$ $m_t = \beta m_{t-1} + \eta_t g_t$
9: $\quad \theta_t \leftarrow \theta_{t-1} - m_t - \eta_t \lambda \theta_{t-1}$ $\theta_t = \theta_{t-1} - m_t - \lambda_w \theta_{t-1}$
10: **until** stopping criterion is met
11: **return** optimized parameters $\theta_t$
### Visual Description
A slide presenting Algorithm 1 for SGD with L2 regularization and SGD with decoupled weight decay (SGDW), both with momentum. The algorithm steps are listed with mathematical expressions. Specific parts of the algorithm (L2 regularization, decoupled weight decay, and the final parameter update) are highlighted with colored boxes.
---
## Page 51
### Content
Adam summary
Adam
$m_t = \beta_1 m_{t-1} + (1 - \beta_1) \nabla f_t$
$v_t = \beta_2 v_{t-1} + (1 - \beta_2)(\nabla f_t)^2$

$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}$
$\hat{v}_t = \frac{v_t}{1 - \beta_2^t}$

$\theta_t = \theta_{t-1} - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$

* Adam with L2 regularization: $\nabla f_t(\theta) \rightarrow \nabla f_t(\theta) + \lambda_r \theta$

* Adam with weight decay and regularization: $\theta_t = (1 - \lambda_w)\theta_{t-1} - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$
$= \theta_{t-1} - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t - \lambda_w \theta_{t-1}$
### Visual Description
Text-only slide.
---
## Page 52
### Content
AdamW

**Algorithm 2** Adam with L2 regularization and Adam with decoupled weight decay (AdamW)
1: **given** $\alpha = 0.001, \beta_1 = 0.9, \beta_2 = 0.999, \epsilon = 10^{-8}, \lambda \in \mathbb{R}$
2: **initialize** time step $t \leftarrow 0$, parameter vector $\theta_{t=0} \in \mathbb{R}^n$, first moment vector $m_{t=0} \leftarrow 0$, second moment vector $v_{t=0} \leftarrow 0$, schedule multiplier $\eta_{t=0} \in \mathbb{R}$
3: **repeat**
4: $\quad t \leftarrow t+1$
5: $\quad \nabla f_t(\theta_{t-1}) \leftarrow \text{SelectBatch}(\theta_{t-1})$ $\triangleright$ select batch and return the corresponding gradient
6: $\quad g_t \leftarrow \nabla f_t(\theta_{t-1}) + \lambda \theta_{t-1}$ $g_t = \nabla f_t(\theta_{t-1}) + \lambda_r \theta_{t-1}$
7: $\quad m_t \leftarrow \beta_1 m_{t-1} + (1 - \beta_1)g_t$ $\triangleright$ here and below all operations are element-wise
8: $\quad v_t \leftarrow \beta_2 v_{t-1} + (1 - \beta_2)g_t^2$
9: $\quad \hat{m}_t \leftarrow m_t / (1 - \beta_1^t)$ $\triangleright$ $\beta_1$ is taken to the power of $t$
10: $\quad \hat{v}_t \leftarrow v_t / (1 - \beta_2^t)$ $\triangleright$ $\beta_2$ is taken to the power of $t$
11: $\quad \eta_t \leftarrow \text{SetScheduleMultiplier}(t)$ $\triangleright$ can be fixed, decay, or also be used for warm restarts
12: $\quad \theta_t \leftarrow \theta_{t-1} - \eta_t (\alpha \hat{m}_t / (\sqrt{\hat{v}_t} + \epsilon) + \lambda \theta_{t-1})$ $\theta_t = \theta_{t-1} - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t - \lambda_w \theta_{t-1}$
13: **until** stopping criterion is met
14: **return** optimized parameters $\theta_t$
### Visual Description
A slide presenting Algorithm 2 for Adam with L2 regularization and Adam with decoupled weight decay (AdamW). The algorithm steps are listed with mathematical expressions. Specific parts of the algorithm (L2 regularization, decoupled weight decay, and the final parameter update) are highlighted with colored boxes.
---
## Page 53
### Content
Results on ImageNet

Interestingly, while the dynamics of the learning curves of Adam and AdamW often coincided for the first half of the training run, AdamW often led to lower training loss and test errors).
### Visual Description
Two line graphs titled "Adam and AdamW with LR=0.001 and different weight decays". The left graph shows "Training loss (cross-entropy)" on the y-axis (log scale from $10^0$ to $10^{-4}$) versus "Epochs" on the x-axis (0 to 1800). Multiple lines in red (Adam) and blue (AdamW) show decreasing loss over epochs. The right graph shows "Test error (%)" on the y-axis (3 to 6) versus "Epochs" on the x-axis (0 to 1800). Multiple lines in red (Adam) and blue (AdamW) show fluctuating but generally decreasing error over epochs. The blue lines (AdamW) appear to reach lower values than the red lines (Adam) in both plots.
---
## Page 54
### Content
Results on ImageNet

The results suggest that AdamW did not only yield better training loss but also yielded better generalization performance for similar training loss values.
### Visual Description
A scatter plot titled "Adam and AdamW with LR=0.001 and different weight decays". The y-axis represents "Test error (%)" (3 to 5) and the x-axis represents "Training loss (cross-entropy)" (log scale from $10^{-4}$ to $10^{-1}$). Red circles represent Adam, and blue squares represent AdamW. A black dashed line traces the lower bound of the data points. The blue squares (AdamW) generally appear below and to the left of the red circles (Adam), indicating lower test error for similar training loss.
---
## Page 55
### Content
Thanks for your Attention! 🙂
### Visual Description
A simple slide with the text "Thanks for your Attention!" and a smiley face emoji in the center.
---
