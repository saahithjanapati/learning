# HW4_prompt

Source: `materials/archive/HW4_prompt.pdf`
Duplicate equivalents: `HW4_prompt.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 14

## Page 1
### Content
HOMEWORK 4
BEYOND LIKELIHOOD¹

10-708 PROBABILISTIC GRAPHICAL MODELS (SPRING 2026)
https://piazza.com/cmu/spring2026/10708/home

OUT: March 27, 2026
DUE: April 20, 2026 at 11:59 PM
TAs: James Ngai, Kadin Zhang, Stephan Xie

START HERE: Instructions
* Collaboration policy: The purpose of student collaboration is to facilitate learning, not to circumvent it. Studying the material in groups is strongly encouraged. It is also allowed to seek help from other students in understanding the material needed to solve a particular homework problem, provided no written notes (including code) are shared, or are taken at that time, and provided learning is facilitated, not circumvented. The actual solution must be done by each student alone. The presence or absence of any form of help or collaboration, whether given or received, must be explicitly stated and disclosed in full by all involved. See the Academic Integrity Section on the course site for more information: https://andrejristeski.github.io/10708S26/#:~:text=Academic%20Integrity%20Policies
* Late Submission Policy: See the late submission policy here: https://andrejristeski.github.io/10708S26/#:~:text=Grace%20Day/Late%20Homework%20Policy
* Submitting your work to Gradescope: We use Gradescope (https://www.gradescope.com/courses/1211283/assignments) to collect PDF submissions of open-ended questions on the homework (e.g. mathematical derivations, plots, short answers). The course staff will manually grade your submission, and you'll receive personalized feedback explaining your final marks. The homework template must be used and can be completed in Latex or by hand. Handwritten submissions must be legible otherwise we will not be able to give credit to your solutions. No changes should be made to the template, boxes and choices MUST remain the same size and in the same locations between the template and your completed submission, the document has 14 pages so your submission must contain no more and no less than 14 pages.
* For multiple choice or select all that apply questions, shade in the box or circle in the template document corresponding to the correct answer(s) for each of the questions. For $\text{LATEX}$ users, replace \choice with \CorrectChoice to obtain a shaded box/circle, and don't change anything else.

¹Compiled on Tuesday 21st April, 2026 at 02:57
### Visual Description
Text-only slide.
---
## Page 2
### Content
A Written Questions [80 pts]
1. (Exploring properties of losses when applied to exponential families)

In this question, we will derive some properties of the losses we saw in class: maximum likelihood, noise contrastive estimation and score matching, when applied to learning exponential families.

Recall, an exponential family of distributions is a set of distributions $\{p_\theta : \theta \in \mathbb{R}^k\}$, described by the sufficient statistics for the family $T(x) : \mathbb{R}^d \to \mathbb{R}^k$. The members of the family have the form
$p_\theta(x) : \mathbb{R}^d \to \mathbb{R}; p_\theta(x) \propto \exp(\langle\theta, T(x)\rangle)$
You can always assume in this problem that the functions $T(x)$ are twice differentiable, and such that the partition function is finite (that is, $\int_{x \in \mathbb{R}^d} \exp(\langle\theta, T(x)\rangle) < \infty$).

(a) [10 pts] Consider first score matching. Let us parametrize the score function as $s_\theta(x) = DT(x)\theta$, where $DT(x) \in \mathbb{R}^{d \times k}$ denotes the Jacobian of function $T(x)$ and $\theta \in \mathbb{R}^k$ is the (unknown) vector of parameters we are training. Suppose we are given samples $x_1, x_2, ..., x_N$ from some distribution $P_{data}$. Find the closed-form solution of the minimum of the score-matching loss:
$$ \underset{\theta}{\operatorname{argmin}} \frac{1}{N} \sum_{i=1}^N (\|s_\theta(x_i)\|^2 + 2\operatorname{Tr}(Ds_\theta(x_i))) $$
where $Ds_\theta$ denotes the Jacobian of $s_\theta$.

Let
$A_i = (DT(x_i))^\top DT(x_i) \in \mathbb{R}^{k \times k}$,
$b_i = \sum_{j=1}^d \sum_{l=1}^k \frac{\partial^2 T_l(x_i)}{\partial x_j^2} e_l \in \mathbb{R}^k$.
Since $s_\theta(x_i) = DT(x_i)\theta$,
$\|s_\theta(x_i)\|^2 = \theta^\top A_i \theta$.
Also
$s_{\theta,j}(x) = \sum_{l=1}^k \theta_l \frac{\partial T_l(x)}{\partial x_j} \implies \operatorname{Tr}(Ds_\theta(x_i)) = \sum_{j=1}^d \sum_{l=1}^k \theta_l \frac{\partial^2 T_l(x_i)}{\partial x_j^2} = b_i^\top \theta$.
Hence
$L(\theta) = \frac{1}{N} \sum_{i=1}^N (\theta^\top A_i \theta + 2b_i^\top \theta) = \theta^\top \bar{A}\theta + 2\bar{b}^\top \theta$,
where $\bar{A} = \frac{1}{N} \sum_{i=1}^N A_i$ and $\bar{b} = \frac{1}{N} \sum_{i=1}^N b_i$. Taking the gradient,
$\nabla_\theta L(\theta) = 2\bar{A}\theta + 2\bar{b}$.
So any minimizer satisfies
$\bar{A}\theta^* = -\bar{b}$.
Therefore, if $\bar{A}$ is invertible,
$$ \theta^* = -\bar{A}^{-1}\bar{b} = - \left( \frac{1}{N} \sum_{i=1}^N (DT(x_i))^\top DT(x_i) \right)^{-1} \left( \frac{1}{N} \sum_{i=1}^N b_i \right) $$
If $\bar{A}$ is singular, a minimizer exists only when $-\bar{b} \in \operatorname{range}(\bar{A})$; in that case one minimizer is
$\theta^* = -\bar{A}^\dagger \bar{b}$,
and the full set of minimizers is $-\bar{A}^\dagger \bar{b} + z$ for any $z \in \operatorname{ker}(\bar{A})$.
### Visual Description
Text-only slide with mathematical derivations for score matching loss minimization.
---
## Page 3
### Content
(b) [10 pts] Proceeding to NCE, remember that if we denote $p_{\theta,c}(x) = \exp(\langle\theta, T(x)\rangle - c)$, we train a classifier $D_{\theta,c}(x) = \frac{p_{\theta,c}(x)}{p_{\theta,c}(x)+kq(x)}$. It will be convenient to denote by $\tilde{T}(x)$ the vector $\tilde{T}(x) = (T(x), -1)$—that is, the vector $T(x)$ with $-1$ appended as an additional coordinate. Similarly, let $\tilde{\theta} = (\theta, c)$ — i.e. the vector $\theta$ with $c$ appended as an additional coordinate. With this notation, we can write $p_{\theta,c}(x)$ as $p_{\tilde{\theta}}(x) = \exp(\langle\tilde{\theta}, \tilde{T}(x)\rangle)$ and $D_{\tilde{\theta}}(x) = \frac{p_{\tilde{\theta}}(x)}{p_{\tilde{\theta}}(x)+kq(x)}$.
The loss we saw in class can be written as:
$$ L(\tilde{D}) = -\frac{1}{k+1} \mathbb{E}_{P_{data}} \log(D_{\tilde{\theta}}(x)) - \frac{k}{k+1} \mathbb{E}_q \log(1 - D_{\tilde{\theta}}(x)) $$
Prove that the loss is convex in $\tilde{\theta}$ (which is the same as the loss being convex in $\theta, c$).
Hint: a twice differentiable function is convex iff its Hessian is positive-definite.

Write $u_{\tilde{\theta}}(x) = \langle\tilde{\theta}, \tilde{T}(x)\rangle$ and
$D_{\tilde{\theta}}(x) = \frac{e^{u_{\tilde{\theta}}(x)}}{e^{u_{\tilde{\theta}}(x)} + kq(x)}$.
Then
$-\log D_{\tilde{\theta}}(x) = \log(e^{u_{\tilde{\theta}}(x)} + kq(x)) - u_{\tilde{\theta}}(x)$,
$-\log(1 - D_{\tilde{\theta}}(x)) = \log(e^{u_{\tilde{\theta}}(x)} + kq(x)) - \log(kq(x))$.
So, up to terms independent of $\tilde{\theta}$,
$$ L(\tilde{\theta}) = \frac{1}{k+1} \mathbb{E}_{P_{data}} [\log(e^{u_{\tilde{\theta}}(x)} + kq(x)) - u_{\tilde{\theta}}(x)] + \frac{k}{k+1} \mathbb{E}_q [\log(e^{u_{\tilde{\theta}}(x)} + kq(x))] $$
The only nonlinear term is $g_x(\tilde{\theta}) = \log(e^{u_{\tilde{\theta}}(x)} + kq(x))$. Since $u_{\tilde{\theta}}(x)$ is linear in $\tilde{\theta}$,
$\nabla_{\tilde{\theta}} g_x(\tilde{\theta}) = D_{\tilde{\theta}}(x)\tilde{T}(x)$.
### Visual Description
Text-only slide with mathematical derivations for NCE loss and its convexity proof.
---
## Page 4
### Content
Differentiating once more,
$$ \nabla_{\tilde{\theta}}^2 g_x(\tilde{\theta}) = D_{\tilde{\theta}}(x)(1 - D_{\tilde{\theta}}(x))\tilde{T}(x)\tilde{T}(x)^\top. $$
Therefore the Hessian of the whole loss is
$$ \nabla_{\tilde{\theta}}^2 L(\tilde{\theta}) = \frac{1}{k+1} \mathbb{E}_{P_{data}} [D_{\tilde{\theta}}(x) (1 - D_{\tilde{\theta}}(x))\tilde{T}(x)\tilde{T}(x)^\top] + \frac{k}{k+1} \mathbb{E}_q [D_{\tilde{\theta}}(x) (1 - D_{\tilde{\theta}}(x))\tilde{T}(x)\tilde{T}(x)^\top]. $$
For any vector $v$,
$$ v^\top \nabla_{\tilde{\theta}}^2 L(\tilde{\theta}) v = \frac{1}{k+1} \mathbb{E}_{P_{data}} [D(1 - D)(v^\top \tilde{T}(x))^2] + \frac{k}{k+1} \mathbb{E}_q [D(1 - D)(v^\top \tilde{T}(x))^2] \ge 0, $$
because $0 \le D_{\tilde{\theta}}(x) \le 1$. Thus the Hessian is positive semidefinite, which is the correct condition for convexity, so $L$ is convex in $\tilde{\theta}$ (equivalently in $(\theta, c)$).

(c) [10 pts] Finally, we'll see that when $q = P_{data}$, asymptotically the efficiency of NCE and MLE is the same. Recall that for a loss $L$, asymptotically, the statistical efficiency is governed by the Hessian at the optimum. (Intuitively, as we get more samples, the empirical loss at the optimum $\theta^*$ starts looking like a Gaussian centered at the optimum with a covariance matrix given by the Hessian at $\theta^*$.)

First, consider the maximum likelihood loss
$$ L_{MLE}(\theta) = -\mathbb{E}_{P_{data}} \log p_\theta(x) $$
If $P_{data} = p_{\theta^*}$, the minimum of this loss, as well as the minimum of the NCE loss will be reached at $\theta^*$.

Let's further assume that $\mathbb{E}_{p_{\theta^*}} [T(x)] = 0$ (zero vector). Show that the Hessian at $\theta^*$ matches the Hessian of the NCE loss when $q = P_{data}$, up to a constant scaling, that is, there exists $c > 0$ such that:
$$ \nabla^2 L_{MLE}(\theta^*) = c \cdot \nabla^2 L_{NCE}(\theta^*) $$
Hint: For MLE, the partition function is not a parameter we are optimizing over like in NCE. In other words, when calculating derivatives and Hessians, you need to take into account the dependence of $Z_\theta$ on $\theta$.
### Visual Description
Text-only slide with mathematical derivations for the Hessian of the NCE loss and an introduction to comparing NCE and MLE efficiency.
---
## Page 5
### Content
Write the normalized exponential family as
$p_\theta(x) = \exp(\langle\theta, T(x)\rangle - A(\theta))$,
$A(\theta) = \log Z_\theta$.
Then
$L_{MLE}(\theta) = -\mathbb{E}_{p_{\theta^*}} [\langle\theta, T(x)\rangle - A(\theta)] = -\theta^\top \mathbb{E}_{p_{\theta^*}} [T(x)] + A(\theta)$.
Since $\mathbb{E}_{p_{\theta^*}} [T(x)] = 0$,
$\nabla^2 L_{MLE}(\theta^*) = \nabla^2 A(\theta^*) = \operatorname{Cov}_{p_{\theta^*}} (T(x)) = \mathbb{E}_{p_{\theta^*}} [T(x)T(x)^\top]$.
Now let $\tilde{\theta}^* = (\theta^*, \log Z_{\theta^*})$, so $p_{\tilde{\theta}^*}(x) = p_{\theta^*}(x) = q(x) = P_{data}(x)$. Hence
$D_{\tilde{\theta}^*}(x) = \frac{p_{\theta^*}(x)}{p_{\theta^*}(x) + k p_{\theta^*}(x)} = \frac{1}{k+1}$.
From part (b),
$\nabla^2 L_{NCE}(\tilde{\theta}^*) = \frac{k}{(k+1)^2} \mathbb{E}_{p_{\theta^*}} [\tilde{T}(x)\tilde{T}(x)^\top]$.
Because $\tilde{T}(x) = (T(x), -1)$ and $\mathbb{E}[T(x)] = 0$,
$\mathbb{E}[\tilde{T}\tilde{T}^\top] = \begin{pmatrix} \mathbb{E}[TT^\top] & 0 \\ 0 & 1 \end{pmatrix}$.
So the $\theta\theta$-block of the NCE Hessian is
$\nabla^2 L_{NCE}(\theta^*) = \frac{k}{(k+1)^2} \mathbb{E}_{p_{\theta^*}} [T(x)T(x)^\top]$.
Comparing with MLE,
$\nabla^2 L_{MLE}(\theta^*) = \frac{(k+1)^2}{k} \nabla^2 L_{NCE}(\theta^*)$.
Thus, up to the constant scaling $\alpha = \frac{(k+1)^2}{k} > 0$, the MLE Hessian matches the NCE Hessian in the $\theta$ coordinates. This is the claimed asymptotic efficiency equivalence.
### Visual Description
Text-only slide with mathematical derivations showing the asymptotic efficiency equivalence between MLE and NCE Hessians.
---
## Page 6
### Content
2. (Generative Adversarial Network) Consider the setup for W-GAN s.t. the class of generators $\mathcal{G}$ is parametrized by a matrix $W \in \mathbb{R}^{d \times d}$, s.t. $G_W(z) = Wz$, and the class of discriminators $\mathcal{F}$ is the set of all quadratic functions parametrized by a matrix $V \in \mathbb{R}^{d \times d}$, s.t. $F_V(x) = x^\top Vx$. Furthermore, let us assume the distribution of the input data $x$ has standard Gaussian distribution. Remember, the W-GAN loss in the limit of infinite training data has the form:
$$ \min_{W \in \mathbb{R}^{d \times d}} \max_{V \in \mathbb{R}^{d \times d}} \mathbb{E}_{x \sim \mathcal{N}(0, I_d)} F_V(x) - \mathbb{E}_{x' \sim P_W} F_V(x') $$
where $P_W$ is the pushforward of the standard Gaussian through $G_W$, i.e. it is the distribution of $G_W(z)$ for $z \sim \mathcal{N}(0, I_d)$. For notational convenience, we will denote the loss we are min-maxing
$$ L(V, W) := \mathbb{E}_{x \sim \mathcal{N}(0, I_d)} F_V(x) - \mathbb{E}_{x' \sim P_W} F_V(x') $$
(a) [10 pts] Show that the loss has the form
$$ L(V, W) = \operatorname{Tr}(V(I - WW^\top)) $$
Hint: The trace is cyclically invariant, that is $\operatorname{Tr}(ABC) = \operatorname{Tr}(BCA) = \operatorname{Tr}(CAB)$

Let $z \sim \mathcal{N}(0, I_d)$ and $x' = Wz$. Then
$\mathbb{E}_{x \sim \mathcal{N}(0, I_d)} F_V(x) = \mathbb{E}[x^\top Vx] = \operatorname{Tr}(V\mathbb{E}[xx^\top]) = \operatorname{Tr}(VI) = \operatorname{Tr}(V)$.
Also
$\mathbb{E}_{x' \sim P_W} F_V(x') = \mathbb{E}[z^\top W^\top VWz] = \operatorname{Tr}(W^\top V W \mathbb{E}[zz^\top])$
$= \operatorname{Tr}(W^\top VW I) = \operatorname{Tr}(W^\top VW)$,
using cyclic invariance of trace. Therefore
$L(V, W) = \operatorname{Tr}(V) - \operatorname{Tr}(W^\top VW) = \operatorname{Tr}(V(I - WW^\top))$.

(b) [7 pts] Show that if $WW^\top$ is such that $WW^\top \ne I$, then there exists a discriminator $V$, s.t. $L(V, W) \ne 0$. Conversely, if $WW^\top = I$, show that for any $V$, $L(V, W) = 0$. Conclude that any $W$ achieving $\max_V L(V, W) = 0$ corresponds to recovering a generator $G_W$, s.t. the pushforward of the Gaussian through $G_W$ is a standard Gaussian (i.e. the input distribution).

If $WW^\top \ne I$, let $A = I - WW^\top \ne 0$ and choose $V = A$. Then
$L(V, W) = \operatorname{Tr}(A^2) = \|A\|_F^2 > 0$,
so some discriminator achieves nonzero loss. If instead $WW^\top = I$, then
$L(V, W) = \operatorname{Tr}(V(I - WW^\top)) = 0$
for every $V$. Hence $\max_V L(V, W) = 0$ iff $WW^\top = I$. But $Wz$ with $z \sim \mathcal{N}(0, I)$ is $\mathcal{N}(0, WW^\top)$, so $WW^\top = I$ exactly means the pushforward is the standard Gaussian.
### Visual Description
Text-only slide with mathematical derivations for the W-GAN loss function and its properties related to $WW^\top$.
---
## Page 7
### Content
(c) [5 pts] Consider the case of $d=1$. Then, $V, W$ are scalars, and the loss is
$L(v, w) = v(1 - w^2)$
Suppose that we further restrict the generator/discriminator, s.t. $|w| \le C$ and $|v| \le 1$, for some constant $C > 1$. For a fixed $w$, $|w| < C$, what is the "best response" $v$, that is $\operatorname{argmax}_v v(1 - w^2)$? Justify your answer.

For fixed $w$, $L(v, w) = v(1 - w^2)$ is linear in $v$ over $[-1, 1]$, so the maximizer is an endpoint:
$$ v^*(w) = \begin{cases} 1, & 1 - w^2 > 0 \ (|w| < 1), \\ -1, & 1 - w^2 < 0 \ (|w| > 1), \\ \text{any } v \in [-1, 1], & |w| = 1. \end{cases} $$
Equivalently, $v^*(w) = \operatorname{sign}(1 - w^2)$, with either sign allowed when $1 - w^2 = 0$.

(d) [4 pts] In the same setting as in (c), for a fixed $v$, $|v| \le 1$, what is the "best response" $w$, that is $\operatorname{argmin}_w v(1 - w^2)$? Justify your answer.

For fixed $v$, minimize $v(1 - w^2)$ over $|w| \le C$.
$$ w^*(v) = \begin{cases} \pm C, & v > 0 \quad (\text{make } 1 - w^2 \text{ as small as possible}), \\ 0, & v < 0 \quad (\text{make } 1 - w^2 \text{ as large as possible}), \\ \text{any } w \in [-C, C], & v = 0. \end{cases} $$
Since $C > 1$, choosing $w = \pm C$ indeed makes $1 - w^2 < 0$.

(e) [6 pts] In the same setting in (c), (d), show that if we initialize the generator with $w=0$, the alternating the "best response dynamics" in (c) and (d) will not converge, but rather produce an infinite cycle in which $v$ alternates between $1$ and $-1$, and $w$ alternates between $0$ and $C$.

Start with $w_0 = 0$. Then $1 - w_0^2 = 1 > 0$, so by (c) the best response is $v_1 = 1$. Given $v_1 = 1$, part (d) gives $w_1 = \pm C$; choose $w_1 = C$. Now $1 - w_1^2 = 1 - C^2 < 0$ since $C > 1$, so the next best discriminator response is $v_2 = -1$. Given $v_2 = -1$, part (d) gives $w_2 = 0$. Thus
$(w_0, v_1, w_1, v_2, w_2, \dots) = (0, 1, C, -1, 0, 1, C, -1, \dots)$,
so $v$ alternates between $1$ and $-1$, while $w$ alternates between $0$ and $C$. Hence the alternating best-response dynamics cycle forever and do not converge.
### Visual Description
Text-only slide with mathematical derivations for best response dynamics in a simplified W-GAN setting ($d=1$), showing non-convergence.
---
## Page 8
### Content
3. (Distance metrics) We mentioned in passing in class that
$$ d_\mathcal{F}(p,q) = \sup_{f \in \mathcal{F}} |\mathbb{E}_p[f(x)] - \mathbb{E}_q[f(x)]| \quad \text{(A.1)} $$
is a "distance metric" – though we did not precisely define what a metric is.
A metric is a function which maps pairs of distributions to $\mathbb{R}$ and has the following properties:
* non-negativity: $d(p, q) \ge 0 \ \forall p, q$
* symmetry: $d(p,q) = d(q,p) \ \forall p, q$
* subadditivity: $d(p, q) \le d(p, r) + d(r, q) \ \forall p,q,r$
* $d(p,q) = 0 \iff p=q$

(a) [6 pts] Prove that KL divergence is not a metric.

KL divergence fails the symmetry axiom. For example, on $\{0, 1\}$ let
$p = (1/2, 1/2)$,
$q = (1/4, 3/4)$.
Then
$KL(p||q) = \frac{1}{2} \log \frac{1/2}{1/4} + \frac{1}{2} \log \frac{1/2}{3/4} = \frac{1}{2} \log 2 + \frac{1}{2} \log \frac{2}{3}$.
$KL(q||p) = \frac{1}{4} \log \frac{1/4}{1/2} + \frac{3}{4} \log \frac{3/4}{1/2} = \frac{1}{4} \log \frac{1}{2} + \frac{3}{4} \log \frac{3}{2}$.
These two values are not equal, so $KL(p||q) \ne KL(q||p)$. Therefore KL divergence is not a metric.

(b) [4 pts] Give an example of a set of functions $\mathcal{F}$ such that $d_\mathcal{F}$ is not a metric.

Take $\mathcal{F} = \{f_0\}$ where $f_0(x) = 0$ (or any class of constant functions). Then for all $p, q$,
$d_\mathcal{F}(p,q) = \sup_{f \in \mathcal{F}} |\mathbb{E}_p[f] - \mathbb{E}_q[f]| = |0 - 0| = 0$.
So $d_\mathcal{F}(p,q) = 0$ even when $p \ne q$, which violates the condition $d(p,q) = 0 \iff p=q$. Hence this $d_\mathcal{F}$ is not a metric.
### Visual Description
Text-only slide defining distance metrics and providing proofs that KL divergence and a specific $d_\mathcal{F}$ are not metrics.
---
## Page 9
### Content
Homework 4: Beyond likelihood
10-708

(c) [8 pts] Suppose the class $\mathcal{F}$ is sufficiently expressive such that $d_{\mathcal{F}}(p, q)=0 \Longleftrightarrow p=q$. Show that $d_{\mathcal{F}}$ is now a metric.

Assuming $d_{\mathcal{F}}(p, q)=0 \Longleftrightarrow p=q$, we only need to prove the other metric axioms.
* Non-negativity: $d_{\mathcal{F}}(p, q) \geq 0$ since it is a supremum of absolute values.
* Symmetry:
$$d_{\mathcal{F}}(p, q)=\sup _{f \in \mathcal{F}}\left|E_{p}[f]-E_{q}[f]\right|=\sup _{f \in \mathcal{F}}\left|E_{q}[f]-E_{p}[f]\right|=d_{\mathcal{F}}(q, p).$$
* Subadditivity: for any $f \in \mathcal{F}$,
$$\left|E_{p}[f]-E_{q}[f]\right| \leq\left|E_{p}[f]-E_{r}[f]\right|+\left|E_{r}[f]-E_{q}[f]\right| \leq d_{\mathcal{F}}(p, r)+d_{\mathcal{F}}(r, q).$$
Taking the supremum over $f$ gives
$$d_{\mathcal{F}}(p, q) \leq d_{\mathcal{F}}(p, r)+d_{\mathcal{F}}(r, q).$$
* Identity of indiscernibles holds by assumption.
Therefore $d_{\mathcal{F}}$ is a metric.
### Visual Description
Text-only slide.
---
## Page 10
### Content
Homework 4: Beyond likelihood
10-708

**B Programming [20 pts]**
For the programming portion of this homework, we will implement the score-matching objective and fit a neural network to different (low-dimensional) distributions and examine the properties of the objective and the learned distribution. To streamline writing code for the training of a neural network (e.g. things like backpropagation and gradient descent), we will use an automatic differentiation package called Pytorch. Luckily, this package is very easy to use. The following modules of Pytorch will be particularly useful: `torch.autograd` which lets us take gradient with respect to the input, and `torch.distributions` which lets us sample from a variety of distributions and compute their log-likelihood differentiably. For a quick introduction, the following tutorials should be useful:

* Building a model: `https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html`
* Optimizing a model: `https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html`

For this assignment, students may find `torch.autograd.grad(output, input, create_graph=True)` and/or `torch.autograd.functional.hessian` particularly useful.

**B.1 1D Mixture of Gaussians[15 pts]**
We will explore the prototypical unimodal distribution: a Gaussian; and the prototypical bimodal distribution: a mixture of two Gaussians. Specifically, we will look at the following two distributions:
1. $P_1 = \mathcal{N}(0,1)$
2. $P_2 = \frac{1}{2}\mathcal{N}(-2.5, 0.5) + \frac{1}{2}\mathcal{N}(2.5, 0.5)$

For each of the distributions, plot the score $\nabla_x \log p(x)$, the log-likelihood $\log p(x)$, and the probability density function $p(x)$.

For $P_1$, the score is linear: $\nabla_x \log p(x) = -x$, and the density/log-density are unimodal and symmetric. For $P_2$, the score is piecewise approximately linear away from the origin but bends sharply between the two modes, and both $p(x)$ and $\log p(x)$ are bimodal.
### Visual Description
The page contains six plots arranged in a 2x3 grid. The top row shows plots for P1, and the bottom row for P2. From left to right, the columns show:
1. "P1: score" and "P2: score": Line plots showing the score function. P1's score is a straight line with negative slope. P2's score is S-shaped, with a steep negative slope in the middle and flatter regions on the sides.
2. "P1: log p(x)" and "P2: log p(x)": Line plots showing the log-likelihood. P1's log-likelihood is an inverted parabola. P2's log-likelihood is bimodal, with two peaks and a valley in between.
3. "P1: p(x)" and "P2: p(x)": Line plots showing the probability density function. P1's PDF is a bell-shaped curve (Gaussian). P2's PDF is bimodal, with two distinct peaks.
---
## Page 11
### Content
Homework 4: Beyond likelihood
10-708

**B.2 Score Matching**
Recall that the goal of score matching is to find the solution to the following optimization problem:
$$\theta^{*}=\underset{\theta}{\operatorname{argmin}} E_{x \sim P_{\text {data }}}\left[\left\|\nabla_{x} \log p_{\theta}(x)-\nabla_{x} \log P_{\text {data }}(x)\right\|^{2}\right] . \quad \text{(B.1)}$$
Up to a constant, this may be re-written as:
$$\theta^{*}=\underset{\theta}{\operatorname{argmin}} E_{x \sim P_{\text {data }}}\left[\left\|\nabla_{x} \log p_{\theta}(x)\right\|^{2}+2 \operatorname{tr}\left(\nabla_{x}^{2} \log p_{\theta}(x)\right)\right] . \quad \text{(B.2)}$$
We will use a neural network $s_{\theta}(x)$ to represent $\nabla_{x} \log p_{\theta}(x)$ so we have:
$$\theta^{*}=\underset{\theta}{\operatorname{argmin}} E_{x \sim p_{\text {data }}}\left[\left\|s_{\theta}(x)\right\|^{2}+2 \operatorname{tr}\left(\nabla_{x} s_{\theta}(x)\right)\right] . \quad \text{(B.3)}$$
In this problem, we will use a neural network with two hidden layers with 128 hidden units (i.e., 3 matrix multiplications) and the softplus activation. You will train this model with your implementation of the score-matching objective with the Adam optimizer for 6000 iterations and learning rate of 0.01. Each iteration, you will sample 1000 fresh samples from the target distribution as the minibatch. You are free to play around with the hyperparameters but also report the values if you change them. For both $P_1$ and $P_2$:

* Plot the learned $\nabla_x \log p(x)$, $\log p(x)$, and $p(x)$ along with the ground truth.
* Estimate the expected error in the learned score function, $E_{p_{\text{data}}}[\left\|\nabla_x \log P_{\text{data}}(x) - s_{\theta}(x)\right\|^2]$.
* Describe the qualitative difference between the two distributions.

To get $\log p(x)$ from $\nabla_x \log p(x)$, we will use the fundamental theorem of calculus:
$$f(x)-f(a)=\int_{a}^{x} f^{\prime}(y) d y$$
We will use this formula to recover $\log p(x)$ from the score function $\nabla_x \log p(x)$, by plugging in $f=\log p$. There are two issues we have to deal with:

1. We cannot integrate exactly, but we can approximate the integral by a Riemann sum. Namely,
$$f(x)-f(a)=\sum_{k=0}^{n-1} f^{\prime}(a+k \epsilon) \epsilon, \text { where } \epsilon=\frac{x-a}{n}$$
where the approximation gets more accurate the larger we make $n$.

2. Since we don't have the value $\log p(a)$ for any $a$, we can only calculate the values of $\log p(x)$ up to some additive constant—i.e. for every $x$, we can calculate $\log p(x)+C$ for some (unknown) $C=-\log p(a)$. Fortunately, if we exponentiate these values, we get $p(x)e^C$, and we know that $\int p(x)=1$, so we can calculate the constant $C$. After discretization as in point 1, we have
$$\frac{\exp (\log p(x)+C)}{\sum_{x^{\prime} \in S} \epsilon \cdot \exp \left(\log p\left(x^{\prime}\right)+C\right)}=\frac{\exp (C) \exp (\log p(x))}{\epsilon \cdot \exp (C) \sum_{x^{\prime} \in S} \exp \left(\log p\left(x^{\prime}\right)\right)}=\frac{\exp (\log p(x))}{\epsilon \cdot \sum_{x^{\prime} \in S} \exp \left(\log p\left(x^{\prime}\right)\right)} \approx p(x).$$
where $S$ is some set of points that covers "most" of the probability mass of $p$.
### Visual Description
Text-only slide.
---
## Page 12
### Content
Homework 4: Beyond likelihood
10-708

This works for any value of $a$—for this assignment, you can take $a=-6$ and $n=120$. We will take $S=\{-6, -6+\epsilon, -6+2\epsilon, \ldots, 6\}$, where $\epsilon=12/n$. The function `numpy.cumsum` should be useful.

To estimate the expected error in the estimation of the score function, we approximate it as
$$E_{p_{\text{data}}}\left[\left\|\nabla_{x} \log P_{\text{data}}(x)-s_{\theta}(x)\right\|^{2}\right] \approx \epsilon \sum_{k=0}^{n-1} P_{\text{data}}\left(x_{k}\right)\left\|\nabla_{x} \log P_{\text{data}}\left(x_{k}\right)-s_{\theta}\left(x_{k}\right)\right\|^{2}, \text { where } x_{k}=a+k \epsilon.$$

Implementation details: two hidden layers, 128 hidden units, Softplus activations, Adam, learning rate 0.01, minibatch size 1000, and 6000 iterations for both $P_1$ and $P_2$.
Using the Riemann-sum reconstruction with $a=-6$ and $n=120$, the estimated score errors were
$E_{p_{\text{data}}}[\left\|\nabla_x \log P_{\text{data}}(x) - s_{\theta}(x)\right\|^2] \approx 3.16 \times 10^{-3}$ for $P_1$,
$E_{p_{\text{data}}}[\left\|\nabla_x \log P_{\text{data}}(x) - s_{\theta}(x)\right\|^2] \approx 8.02 \times 10^{-3}$ for $P_2$.

Qualitatively, $P_1$ is easier: the true score is globally smooth and nearly linear, so the network matches it very closely everywhere. $P_2$ is harder because the score changes rapidly in the low-density region between the two modes; the learned score smooths that transition slightly, which shows up as a shallower central valley in $\log p(x)$ and a small mismatch in the heights of the two peaks in $p(x)$.
### Visual Description
The page contains six plots arranged in a 2x3 grid, similar to page 10. The top row shows plots for P1, and the bottom row for P2. Each plot shows two lines: "ground truth" (solid blue) and "learned" (dashed orange).
1. "P1: score" and "P2: score": Line plots comparing ground truth and learned score functions. For P1, the learned score closely matches the linear ground truth. For P2, the learned score is a smoothed version of the S-shaped ground truth, particularly in the central region.
2. "P1: log p(x)" and "P2: log p(x)": Line plots comparing ground truth and learned log-likelihoods. For P1, the learned log-likelihood closely matches the inverted parabola. For P2, the learned log-likelihood is a smoothed version of the bimodal ground truth, with a slightly shallower central valley.
3. "P1: p(x)" and "P2: p(x)": Line plots comparing ground truth and learned probability density functions. For P1, the learned PDF closely matches the Gaussian. For P2, the learned PDF is a smoothed version of the bimodal ground truth, with a small mismatch in peak heights.
---
## Page 13
### Content
Homework 4: Beyond likelihood
10-708

**B.3 2D Mixture of Gaussians[5 pts]**
We will now repeat the same experiment for a 2D mixture of Gaussians. Namely, let
$\mu_1 = [3,3]^T, \Sigma_1 = \text{Diag}([1,0.5])$,
$\mu_2 = [-3,-3]^T, \Sigma_2 = \text{Diag}([0.5, 0.5])$
With these quantities in place, define
$$P = \frac{1}{2}\mathcal{N}(\mu_1, \Sigma_1) + \frac{1}{2}\mathcal{N}(\mu_2, \Sigma_2).$$
Plot the vector fields of the learned score and ground truth score, and describe any difference you see.

I used the same architecture and optimizer settings as in the 1D experiment, with 6000 iterations and minibatch size 1000. The learned vector field matches the global structure well: vectors point toward the two mixture components and the directions around each mode are qualitatively correct. The main discrepancy is in the bridge region between the modes and near the outer corners, where the learned field is slightly smoother and less sharply bent than the ground-truth score.
### Visual Description
The page contains two 2D vector field plots, side-by-side.
1. "Ground-truth score": A vector field with arrows pointing towards two distinct regions (modes), one in the top-right quadrant and one in the bottom-left quadrant. The arrows show sharp changes in direction, especially in the region between the two modes.
2. "Learned score": A vector field with arrows also pointing towards the same two modes. The overall structure is similar to the ground-truth, but the transitions in arrow direction, particularly in the central "bridge" region and near the outer corners, appear slightly smoother and less sharply bent compared to the ground truth.
---
## Page 14
### Content
Homework 4: Beyond likelihood
10-708

**B.4 Collaboration Policy**
After you have completed all other components of this assignment, report your answers to the collaboration policy questions detailed in the Academic Integrity Policies for this course.

1. Did you receive any help whatsoever from anyone in solving this assignment? If so, include full details including names of people who helped you and the exact nature of help you received.
No
No
No

2. Did you find or come across code that implements any part of this assignment? If so, include full details including the source of the code and how you used it in the assignment.
No

References
### Visual Description
Text-only slide.
---
