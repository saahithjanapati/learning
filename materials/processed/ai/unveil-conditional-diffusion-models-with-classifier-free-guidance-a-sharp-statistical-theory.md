# Unveil Conditional Diffusion Models with Classifier-free Guidance: A Sharp Statistical Theory

Source: `https://arxiv.org/abs/2403.11968`
Site: `arXiv`
AI category: `Conditional Diffusion / Statistical Theory`
Course mirror of: `materials/processed/advanced-machine-learning-10-715-cmu/relevant-papers-03-Unveil Conditional Diffusion Models with Classifier-free Guidance- A Sharp Statistical Theory.md`
Course archive source: `materials/archive/advanced-machine-learning-10-715-cmu/piazza-resources/relevant-papers-03-Unveil Conditional Diffusion Models with Classifier-free Guidance- A Sharp Statistical Theory.pdf`
Duplicate equivalents: `relevant-papers-03-Unveil Conditional Diffusion Models with Classifier-free Guidance- A Sharp Statistical Theory.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `course PDF transcript mirrored into AI collection`
Finish reason: `MIXED`
Pages: 92

## Page 1
### Content
Unveil Conditional Diffusion Models with Classifier-free Guidance: A Sharp Statistical Theory

Hengyu Fu* Zhuoran Yang† Mengdi Wang‡ Minshuo Chen‡

March 19, 2024

**Abstract**
Conditional diffusion models serve as the foundation of modern image synthesis and find extensive application in fields like computational biology and reinforcement learning. In these applications, conditional diffusion models incorporate various conditional information, such as prompt input, to guide the sample generation towards desired properties. Despite the empirical success, theory of conditional diffusion models is largely missing. This paper bridges this gap by presenting a sharp statistical theory of distribution estimation using conditional diffusion models. Our analysis yields a sample complexity bound that adapts to the smoothness of the data distribution and matches the minimax lower bound. The key to our theoretical development lies in an approximation result for the conditional score function, which relies on a novel diffused Taylor approximation technique. Moreover, we demonstrate the utility of our statistical theory in elucidating the performance of conditional diffusion models across diverse applications, including model-based transition kernel estimation in reinforcement learning, solving inverse problems, and reward conditioned sample generation.

### 1 Introduction
Diffusion models constitute a class of generative models achieving state-of-the-art performance in generating realistic data in computer vision and audio applications [Song and Ermon, 2019, Dathathri et al., 2019, Ho et al., 2020, Song et al., 2020b, Kong et al., 2020, Chen et al., 2020, Mittal et al., 2021, Huang et al., 2022a, Jeong et al., 2021, Ulhaq et al., 2022, Avrahami et al., 2022, Kim et al., 2022, Bansal et al., 2023]. The success of diffusion models are further extended in other domains, such as sequential data modeling [Alcaraz and Strodthoff, 2022, Tashiro et al., 2021, Tevet et al., 2022, Tian et al., 2023], reinforcement learning [Pearce et al., 2023, Chi et al., 2023, Hansen-Estruch et al., 2023, Reuss et al., 2023], and life science [Cao et al., 2022, Chung et al., 2022b, Chung and Ye, 2022, Güngör et al., 2023, Jing et al., 2022, Anand and Achim, 2022, Lee et al., 2022c, Luo et al., 2022, Mei et al., 2022, Waibel et al., 2022, Ingraham et al., 2022, Huang et al., 2022b, Schneuing et al., 2022, Wu et al., 2022, Gruver et al., 2023, Weiss et al., 2023, Xu et al., 2022, Song et al., 2021].

Diffusion models are widely appraised for their high-fidelity sample generation, yet the most fascinating feature is that they allow flexible input "guidance" to control the generation process —

---
*Peking University. Email: 2100010881@stu.pku.edu.cn
†Yale University. Email: zhuoran.yang@yale.edu
‡Princeton University. Email: {mengdiw,minshuochen}@princeton.edu

1
arXiv:2403.11968v1 [cs.LG] 18 Mar 2024

### Visual Description
Text-only slide. The page contains the title, authors, date, abstract, and the beginning of the introduction. There is a vertical text on the left margin indicating the arXiv identifier.

---

## Page 2
### Content
an essential property that enables diffusion models for versatile real-world usage. For example, in image synthesis, diffusion models can generate images consistent with input prompts. In reinforcement learning, diffusion models can generate state-action trajectories of high rewards or satisfying safety constraints. To emphasize the dependence on guidance, diffusion models with guidance are termed Conditional Diffusion Models (CDMs).

In the continuous-time limit, CDMs couple two stochastic processes for sample generation. In the forward process, data points are corrupted by adding white noise with increasing variances. Then in the backward process, which can be seen as a time-reversal of the forward process, CDMs produce new samples by sequentially removing noise in the input. The backward process is accomplished by a so-called "conditional score network", which approximates the conditional score function – gradient of the log conditional density function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$. Here $\mathbf{x}$ is the sample, $\mathbf{y}$ is the guidance, and $p_t$ is a diffused conditional density (see Section 2 for a precise definition). In this regard, the training of a CDM concentrates on obtaining a proper conditional score network.

Due to the introduction of the guidance $\mathbf{y}$, the training of the conditional score network is different from standard score estimation methods in unconditional diffusion models. Classifier guidance is arguably the first method for training a conditional score network [Dhariwal and Nichol, 2021], which applies with discrete guidance $\mathbf{y}$, such as class labels of images. Classifier guidance relies on training an external classifier for obtaining the conditional score function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$. The classifier is trained using noise-corrupted data produced by the forward process of CDMs. Consequently, the training can be difficult especially when a significant amount of noise is added to the clean data (corresponding to the later stage of the forward process). To mitigate the issue, classifier-free guidance is proposed to remove the external classifier and allow both discrete and continuous guidance [Ho and Salimans, 2022]. The idea is to introduce a mask signal to randomly ignore the guidance and unify the learning of conditional and unconditional score networks (a detailed description is deferred to Section 2). Ever since its proposal, classifier-free guidance has become the benchmark method for different applications [Meng et al., 2023, Kornblith et al., 2023].

Despite the empirical success of CDMs trained with classifier-free guidance, theoretical underpinnings are largely lacking. In particular, the following fundamental questions about CDMs are curiously open:
> *How do CDMs estimate the conditional score function with classifier-free guidance?*
> *What are the corresponding statistical rates for conditional distribution estimation?*

Recently, there is a growing body of works studying diffusion models and they provide valuable insights into diffusion models' ability to estimate data distributions [Oko et al., 2023, Chen et al., 2023b, Lee et al., 2022a,b, Chen et al., 2022b, Benton et al., 2023, De Bortoli et al., 2021, De Bortoli, 2022, Wibisono et al., 2024]. However, most of the study focuses on the unconditional diffusion models. It is noteworthy that Yuan et al. [2023] consider the reward-directed CDMs and provide reward sub-optimality guarantees. Yet the corresponding analysis is tailored to scalar reward guidance in a semi-parametric setting, and the analysis does not cover the classifier-free guidance method.

In this paper, we answer the posted questions above by establishing the first set of theories of CDMs trained with classifier-free guidance. Specifically, we adopt a nonparametric statistics point of view: We assume Hölder regularity in the ground-truth conditional distribution and provide a sharp sample complexity bound of conditional distribution estimation. Our results are built upon a novel conditional score approximation theory, which develops a diffused Taylor approximation technique. Moreover, our statistical theory leads to theoretical insights into CDMs in diverse tasks, such as transition kernel estimation in model-based RL, solving inverse problems, and reward-conditioned sample generation. We summarize our contributions in the following.

2

### Visual Description
Text-only slide. The page continues the introduction, discussing the background of Conditional Diffusion Models (CDMs), classifier guidance vs. classifier-free guidance, and the research questions addressed by the paper.

---

## Page 3
### Content
* We establish the first universal approximation theory of conditional score functions using neural networks in Theorem 3.2. To achieve a desired approximation error in the $L_2$ sense, we show that the network size scales adaptive to the smoothness of the data distribution. This result only requires the initial conditional data distribution to be Hölder continuous, indicating that the score function inherits the regularity of the data. Further, we establish an improved approximation result under an additional bounded Hölder norm assumption in Theorem 3.4. Built upon such approximation theories, we present optimal distribution estimation theory in later sections.
* We study using conditional diffusion models for distribution estimation, and provide sample complexity bounds in Theorem 4.2. To facilitate the analysis, we establish a conditional score estimation result in Theorem 4.1, when using the widely adopted classifier-free guidance method (see an introduction in Section 2). The analysis in Theorem 4.1 is built upon a bias-variance trade-off in nonparametric statistics and further connects to Theorem 4.2 via Girsanov's theorem from stochastic processes. Our statistical rate in Theorem 4.2 matches its minimax lower bound (Proposition 4.3). We also present statistical guarantees for the first time of applying conditional diffusion models to model-based reinforcement learning (Proposition 4.5).
* We additionally establish theoretical foundations of conditional diffusion models for solving inverse problems and reward conditioned sample generation, demonstrating the utility of our established statistical theories. Specifically, we present sub-optimality bounds when generating high-reward samples in an offline setting (Proposition 5.2). We also provide error bounds for estimating the posterior mean given a measurement in linear inverse problems (Proposition 5.4). These results theoretically explain the performance of conditional diffusion models.

### 1.1 Related Work
This work contributes to the theory of diffusion models and develops the first set of theories of conditional diffusion models trained with classifier-free guidance. Existing results on diffusion models can be roughly categorized into two categories: 1) sampling theory assuming good score estimation; 2) approximation and statistical theories on score estimation and further distribution estimation. The two aspects are inner connected as we discuss as follows.

**Sampling theory of diffusion models** Several recent sampling theories of diffusion models prove that the distribution generated by the backward process is close to the data distribution, as long as the score function is accurately estimated. The central contribution is a relationship between $\epsilon_{\text{dis}}$ and $\epsilon_{\text{score}}$, where $\epsilon_{\text{dis}}$ is the distribution estimation error and $\epsilon_{\text{score}}$ is the score estimation error. Specifically, De Bortoli et al. [2021], Albergo et al. [2023] establish upper bounds of $\epsilon_{\text{dis}}$ using $\epsilon_{\text{score}}$ for diffusion Schrödinger bridges. The error $\epsilon_{\text{dis}}$ is measured in the total variation distance and $\epsilon_{\text{score}}$ is measured in the $L_\infty$ norm. More concrete bounds of $\epsilon_{\text{dis}}$ are provided in Block et al. [2020], Lee et al. [2022a], Chen et al. [2022b], Lee et al. [2022b], Yingxi Yang and Wibisono [2022]. These works specialize $\epsilon_{\text{score}}$ to the $L_2$ error of the estimated score function, and $\epsilon_{\text{dis}}$ to the total variation distance between the generated distribution and the data distribution. Lee et al. [2022a] require the data distribution satisfying a log-Sobolev inequality. Concurrent works Chen et al. [2022b] and Lee et al. [2022b] relax the log-Sobolev assumption on the data distribution to only having bounded moments.

It is worth mentioning that Lee et al. [2022b] allow $\epsilon_{\text{score}}$ to be time-dependent. Recently, Chen et al. [2023d,c], Benton et al. [2023] largely enrich the study of sampling theory using diffusion models. Specifically, novel analyses based on Taylor expansions of the discretized backward process [Li et al., 2023] or localization method [Benton et al., 2023] are developed, which improve the upper

3

### Visual Description
Text-only slide. The page lists the main contributions of the paper in bullet points and starts the "Related Work" section, specifically focusing on the sampling theory of diffusion models.

---

## Page 4
### Content
bound on $\epsilon_{\text{dis}}$. Furthermore, Chen et al. [2023d] extend to DDIM sampling scheme, and Chen et al. [2023c] consider the probabilistic ODE backward sampling.

Besides Euclidean data, De Bortoli [2022] made the first attempt to analyze diffusion models for learning low-dimensional manifold data. Assuming $\epsilon_{\text{score}}$ is small under the $L_\infty$ norm (extension to the $L^2$ norm is also provided), De Bortoli [2022] bound $\epsilon_{\text{dis}}$ of diffusion models in terms of the Wasserstein distance. The obtained bound has an exponential dependence on the diameter of the data manifold. Moreover, Montanari and Wu [2023] consider using diffusion processes to sample from noisy observations of symmetric spiked models and El Alaoui et al. [2023] study polynomial-time algorithms for sampling from Gibbs distributions based on diffusion processes. The construction of diffusion processes in Montanari and Wu [2023], El Alaoui et al. [2023] leverages the idea of stochastic localization [Eldan, 2013, Montanari, 2023, Chen and Eldan, 2022, El Alaoui and Montanari, 2022].

**Score approximation and estimation theory** The score approximation and estimation theory aim to prove the sample complexity bounds of score estimation, which complements the sampling theory. An early work [Block et al., 2020] provides a score estimation guarantee when the error is measured in the $L_2$ norm. Yet the bound depends on some unknown Rademacher complexity of the score network class. More recently, Oko et al. [2023] and Chen et al. [2023b] both establish score estimation theories from the nonparametric statistics point of view. Oko et al. [2023] mainly focus on the Euclidean data, while Chen et al. [2023b] study low-dimensional subspace data. Wibisono et al. [2024] leverage the empirical Bayes theory to study score estimation using kernel methods.

The statistical estimation theory in Oko et al. [2023] and Chen et al. [2023b] is established by a bias-variance trade-off analysis. Bounding the bias term relies on an approximation theory of the score function, which implies how to choose a proper score network class. Oko et al. [2023] show the approximation theory by constructing a series of "diffused basis" functions. Chen et al. [2023b] adopt a different approach and resort to local Taylor approximations. Both works leverage the smoothness of the score function and the approximation error depends on the data dimension. Mei and Wu [2023], on the other hand, investigate score approximation theory in high-dimensional graphical models, where score approximation tends to be efficient in high dimensions, that is, the sample complexity may not increase with $d$.

On the algorithmic side, we are aware of Shah et al. [2023] studying score estimation in Gaussian mixture models. They provide convergence analysis of using gradient descent to minimize the score estimation loss. The algorithmic behavior can be characterized in two phases, where in the large-noise phase, gradient descent is approximated by power iteration, and in the small-noise phase, gradient descent is akin to the EM algorithm.

**Distribution estimation theory** Distribution estimation theory of diffusion models is explored in Song et al. [2020a] and Liu et al. [2022] from an asymptotic statistics point of view. These results do not provide an explicit sample complexity bound. Given the aforementioned sampling theory and score estimation theory, an end-to-end analysis of diffusion models for distribution estimation is established in Oko et al. [2023] and Chen et al. [2023b]. In Euclidean space, Oko et al. [2023] show that diffusion models are minimax optimal in estimating distributions with Besov density functions. Chen et al. [2023b] unveil the adaptivity of diffusion models to linear subspace data. Recently, Yuan et al. [2023] study the distribution estimation of conditional diffusion models with scalar reward guidance.

4

### Visual Description
Text-only slide. The page continues the "Related Work" section, covering score approximation and estimation theory, and distribution estimation theory.

---

## Page 5
### Content
### Paper Organization
The rest of the paper is organized as follows: Section 2 reviews the score-based diffusion model along with its implementation in classifier-free guidance, and introduces basics on Hölder functions and ReLU neural networks. Section 3 establishes the first approximation theory of conditional score functions using neural networks. Section 4 presents a distribution estimation theory built upon the score approximation theory in the previous section. We also study an application for transition kernel estimation in model-based reinforcement learning. Section 5 presents extended applications for reward-directed sample generation and inverse problems.

### Notation
We use bold normal font letters to denote vectors, e.g., $\mathbf{x} \in \mathbb{R}^d, \mathbf{y} \in \mathbb{R}^{d_y}$. $\|\mathbf{x}\|$ denotes the Euclidean norm of $\mathbf{x}$. $\|\mathbf{x}\|_1 = \sum_{i=1}^d |x_i|$ denotes the $\ell_1$-norm of $\mathbf{x}$, and $\|\mathbf{x}\|_\infty = \max_{i \in [d]} |x_i|$ denotes the $\ell_\infty$-norm of $\mathbf{x}$. In describing the forward process of diffusion models, $\phi_t$ denotes the Gaussian transition kernel dependent on $t$.

## 2 Preliminaries
We provide a brief introduction to conditional diffusion models (CDMs) with classifier-free guidance, Hölder functions, and score neural networks.

**Diffusion process** Denote the initial conditional distribution as $P(X_0 = \mathbf{x}|\mathbf{y})$ for $\mathbf{x} \in \mathbb{R}^d$ given $\mathbf{y} \in \mathbb{R}^{d_y}$. We consider adding noise progressively on $X_0$ only, which is described by a forward Ornstein–Uhlenbeck (OU) process,
$$dX_t = -\frac{1}{2} X_t dt + dW_t \quad \text{with} \quad X_0 \sim P(\cdot|\mathbf{y}), \tag{2.1}$$
where $W_t$ is a Wiener process. In the infinite-time limit, $X_\infty$ follows a standard Gaussian distribution. At any finite time $t$, we denote $p_t(\cdot|\mathbf{y})$ as the marginal conditional distribution.

The forward process will terminate at a sufficiently large time $T$. To generate new samples, we reverse the time of (2.1) to obtain
$$dX_t^\leftarrow = \left[ \frac{1}{2} X_t^\leftarrow + \nabla \log p_{T-t}(X_t^\leftarrow | \mathbf{y}) \right] dt + d\overline{W}_t \quad \text{with} \quad X_0^\leftarrow \sim p_T(\cdot|\mathbf{y}), \tag{2.2}$$
where $\overline{W}_t$ is a time-reversed Wiener process and we use the arrow on $X$ to emphasize the backward process. The term $\nabla \log p_{T-t}(X_t^\leftarrow | \mathbf{y})$ is the conditional score function. Unfortunately, it is unknown and needs to be estimated using conditional score networks. We denote by $\widehat{\mathbf{s}}(\mathbf{x}, \mathbf{y}, t)$ as such an estimator of the conditional score $\nabla \log p_t(\mathbf{x}|\mathbf{y})$. Then the sample generation is described by the following backward SDE,
$$d\tilde{X}_t^\leftarrow = \left[ \frac{1}{2} \tilde{X}_t^\leftarrow + \widehat{\mathbf{s}}(\tilde{X}_t^\leftarrow, \mathbf{y}, T - t) \right] dt + d\overline{W}_t \quad \text{with} \quad \tilde{X}_0^\leftarrow \sim \mathcal{N}(0, I). \tag{2.3}$$
The marginal distribution of $\tilde{X}_t^\leftarrow$ (conditioned on $\mathbf{y}$) is written as $\widehat{P}_{T-t}(\cdot|\mathbf{y})$.

5

### Visual Description
Text-only slide. The page outlines the paper's organization, defines notation, and introduces the preliminaries for diffusion processes, including the forward OU process and the backward SDE for sample generation.

---

## Page 6
### Content
**Classifier-free guidance** Classifier-free guidance, proposed in Ho and Salimans [2022], is a widely adopted method for training $\widehat{\mathbf{s}}(\mathbf{x}, \mathbf{y}, t)$. In specific, we learn both the conditional and unconditional score functions simultaneously, whose estimators are $\mathbf{s}_1(\mathbf{x}, \mathbf{y}, t)$ and $\mathbf{s}_2(\mathbf{x}, t)$, respectively. To unify the notations, let $\tau \in \{\emptyset, \text{id}\}$ be a mask signal, where $\emptyset$ means that we ignore the guidance $\mathbf{y}$ and $\text{id}$ means that we keep the guidance. According to the value of $\tau$, we consider the following two cases:
$$
\begin{aligned}
\tau = \text{id} : & \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{(\mathbf{x}_0, \mathbf{y})} \left[ \mathbb{E}_{\mathbf{x}' \sim \mathcal{N}(\alpha_t \mathbf{x}_0, \sigma_t^2 I)} \left[ \|\mathbf{s}_1(\mathbf{x}', \mathbf{y}, t) - \nabla_{\mathbf{x}'} \log \phi_t(\mathbf{x}'|\mathbf{x}_0)\|_2^2 \right] \right] dt, \\
\tau = \emptyset : & \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_0} \left[ \mathbb{E}_{\mathbf{x}' \sim \mathcal{N}(\alpha_t \mathbf{x}_0, \sigma_t^2 I)} \left[ \|\mathbf{s}_2(\mathbf{x}', t) - \nabla_{\mathbf{x}'} \log \phi_t(\mathbf{x}'|\mathbf{x}_0)\|_2^2 \right] \right] dt.
\end{aligned}
$$
Here $\phi_t$ is the Gaussian transition kernel of the forward process (2.1), i.e., $\nabla \log \phi_t(\mathbf{x}'|\mathbf{x}_0) = -(\mathbf{x}' - \alpha_t \mathbf{x}_0)/\sigma_t^2$ with $\alpha_t = e^{-t/2}$ and $\sigma_t^2 = 1 - e^{-t}$. We also note that $t_0$ is an early-stopping time to prevent the blow-up of score functions, which is commonly adopted in practice [Song and Ermon, 2020, Nichol and Dhariwal, 2021]. As can be seen, when $\tau = \emptyset$, the objective function reduces to that of score estimation in unconditional diffusion models.

Moreover, we unify these two cases by writing a tri-variate score function $\mathbf{s}(\mathbf{x}', \cdot, t)$ where the second argument is either $\emptyset$ or $\mathbf{y}$. We define the score estimator $\mathbf{s}$ and its function class $\mathcal{F}$ as
$$
\mathbf{s}(\mathbf{x}, \mathbf{y}, t) = \begin{cases} \mathbf{s}_1(\mathbf{x}, \mathbf{y}, t) & \text{if } \mathbf{y} \in \mathbb{R}^{d_y} \\ \mathbf{s}_2(\mathbf{x}, t) & \text{if } \mathbf{y} = \emptyset \end{cases} \quad \text{and} \quad \mathcal{F} = \mathcal{F}_1 \times \mathcal{F}_2,
$$
where we recall that $\mathbf{s}_1 \in \mathcal{F}_1$ and $\mathbf{s}_2 \in \mathcal{F}_2$ are the conditional and unconditional score estimators, respectively. The function classes $\mathcal{F}_1$ and $\mathcal{F}_2$ are two ReLU neural networks (see (2.7)) with hyperparameters $(M_t, W, \kappa, L, K)$. Then we have a unified objective for classifier-free score estimation:
$$\widehat{\mathbf{s}} \in \text{argmin}_{\mathbf{s} \in \mathcal{F}} \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{(\mathbf{x}_0, \mathbf{y})} \left[ \mathbb{E}_{\tau, \mathbf{x}' \sim \mathcal{N}(\alpha_t \mathbf{x}_0, \sigma_t^2 I)} \left[ \|\mathbf{s}(\mathbf{x}', \tau\mathbf{y}, t) - \nabla_{\mathbf{x}'} \log \phi_t(\mathbf{x}'|\mathbf{x}_0)\|_2^2 \right] \right] dt, \tag{2.4}$$
where the inner expectation is taken with respect to $\tau \sim \text{Unif}\{\emptyset, \text{id}\}$. We stick to the uniform prior on $\tau$ for simplicity, i.e., $\mathbb{P}(\tau = \emptyset) = \mathbb{P}(\tau = \text{id}) = 0.5$. An extension to general mask rates causes no real difficulty.

In practice, (2.4) is implemented using collected i.i.d. data points $\{(\mathbf{x}_i, \mathbf{y}_i)\}_{i=1}^n$, which essentially replaces the expectation over $(\mathbf{x}_0, \mathbf{y})$ by its empirical counterpart. We denote a loss function
$$\ell(\mathbf{x}, \mathbf{y}; \mathbf{s}) = \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}' \sim \mathcal{N}(\alpha_t \mathbf{x}, \sigma_t^2 I)} \left[ \|\mathbf{s}(\mathbf{x}', \tau\mathbf{y}, t) - \nabla_{\mathbf{x}'} \log \phi_t(\mathbf{x}'|\mathbf{x})\|_2^2 \right] dt. \tag{2.5}$$
Note that we have assumed sufficient sampling on $\mathbf{x}'$ and the mask signal $\tau$ in (2.5). Then classifier-free guidance is to minimize the following empirical risk
$$\text{argmin}_{\mathbf{s} \in \mathcal{F}} \widehat{\mathcal{L}}(\mathbf{s}) = \frac{1}{n} \sum_{i=1}^n \ell(\mathbf{x}_i, \mathbf{y}_i; \mathbf{s}), \tag{2.6}$$
where we recall $n$ is the sample size. For future usage, we denote $\mathcal{L}(\mathbf{s})$ as the population risk function.

6

### Visual Description
Text-only slide. The page details the classifier-free guidance method, providing mathematical formulations for the training objectives, the unified score function, and the empirical risk minimization.

---

## Page 7
### Content
**Hölder functions** Hölder functions are widely studied in nonparametric statistics [Györfi et al., 2006, Tsybakov, 2008, Wasserman, 2006]. In the paper, we will focus on estimating distributions with a density in a Hölder ball.

**Definition 2.1 (Hölder norm).** Let $\beta = s + \gamma > 0$ be a degree of smoothness, where $s = \lfloor \beta \rfloor$ is an integer and $\gamma \in [0, 1)$. For a function $f : \mathbb{R}^d \to \mathbb{R}$, its Hölder norm is defined as
$$\|f\|_{\mathcal{H}^\beta(\mathbb{R}^d)} := \max_{\mathbf{s}:\|\mathbf{s}\|_1 < s} \sup_{\mathbf{x}} |\partial^{\mathbf{s}} f(\mathbf{x})| + \max_{\mathbf{s}:\|\mathbf{s}\|_1 = s} \sup_{\mathbf{x} \neq \mathbf{z}} \frac{|\partial^{\mathbf{s}} f(\mathbf{x}) - \partial^{\mathbf{s}} f(\mathbf{z})|}{\|\mathbf{x} - \mathbf{z}\|_\infty^\gamma},$$
where $\mathbf{s}$ is a multi-index. We say a function $f$ is $\beta$-Hölder, if and only if $\|f\|_{\mathcal{H}^\beta(\mathbb{R}^d)} < \infty$.

We define a Hölder ball of radius $B > 0$ for some constant $B$ as
$$\mathcal{H}^\beta(\mathbb{R}^d, B) = \left\{ f : \mathbb{R}^d \to \mathbb{R} \mid \|f\|_{\mathcal{H}^\beta(\mathbb{R}^d)} < B \right\}.$$
In the sequel, we will occasionally omit the domain $\mathbb{R}^d$, if it is clear from the context.

**ReLU network architecture** We use neural networks to parameterize score functions. We consider the following class of ReLU neural networks, denoted by $\mathcal{F}$:
$$
\begin{aligned}
\mathcal{F}(M_t, W, \kappa, L, K) := \bigg\{ & \mathbf{s}(\mathbf{x}, \mathbf{y}, t) = (A_L \sigma(\cdot) + \mathbf{b}_L) \circ \cdots \circ (A_1 [\mathbf{x}^\top, \mathbf{y}^\top, t]^\top + \mathbf{b}_1) : \\
& A_i \in \mathbb{R}^{d_i \times d_{i+1}}, \mathbf{b}_i \in \mathbb{R}^{d_{i+1}}, \max d_i \leq W, \sup_{\mathbf{x}, \mathbf{y}} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty \leq M_t, \\
& \max_i \|A_i\|_\infty \vee \|\mathbf{b}_i\|_\infty \leq \kappa, \sum_{i=1}^L (\|A_i\|_0 + \|\mathbf{b}_i\|_0) \leq K \bigg\}.
\end{aligned} \tag{2.7}
$$
Here $\sigma(\cdot)$ is the ReLU activation, $\|\cdot\|_\infty$ is the maximal magnitude of entries and $\|\cdot\|_0$ is the number of nonzero entries. The
## Page 9
### Content
$\sigma_t$ of the Gaussian noise added to the clean data distribution. Both $\alpha_t$ and $\sigma_t$ are super smooth (infinitely differentiable) and therefore, very easy to approximate using neural networks.

Theorem 3.2 is the first approximation theory of conditional score functions with generic Hölder smooth data distributions. In the following analysis, we present a faster approximation result under a slightly stronger assumption, which further leads to a sharp distribution estimation guarantee in Section 4.

**Assumption 3.3.** Let $C$ and $C_2$ be two positive constants and function $f \in \mathcal{H}^\beta(\mathbb{R}^d \times [0, 1]^{d_y}, B)$ for a constant radius $B$. We assume $f(\mathbf{x}, \mathbf{y}) \geq C$ for all $(\mathbf{x}, \mathbf{y})$ and the conditional density function $p(\mathbf{x}|\mathbf{y}) = \exp(-C_2 \|\mathbf{x}\|_2^2 / 2) \cdot f(\mathbf{x}, \mathbf{y})$.

For a better interpretation, we can always write the conditional density function $p(\mathbf{x}|\mathbf{y})$ in Assumption 3.1 as $p(\mathbf{x}|\mathbf{y}) = \exp(-C_2 \|\mathbf{x}\|_2^2 / 2) \cdot f(\mathbf{x}, \mathbf{y})$. Clearly, $f(\mathbf{x}, \mathbf{y})$ is Hölder continuous. In this regard, Assumption 3.3 only strengthens Assumption 3.1 by imposing lower and upper bounds on $f(\mathbf{x}, \mathbf{y})$. The lower bound on $f(\mathbf{x}, \mathbf{y})$ is often required for effective density estimation [Tsybakov, 2008, Wasserman, 2006]. The upper bound enables the approximation of $f(\mathbf{x}, \mathbf{y})$ in an extended region (see Section 3.2). A fast approximation rate is presented in the following theorem.

**Theorem 3.4.** Suppose Assumption 3.3 holds. For sufficiently large $N$ and constants $C_\sigma, C_\alpha > 0$, by taking early-stopping time $t_0 = N^{-C_\sigma}$ and terminal time $T = C_\alpha \log N$, there exists $\mathbf{s} \in \mathcal{F}(M_t, W, \kappa, L, K)$ such that for all $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [t_0, T]$, it holds that
$$ \int_{\mathbb{R}^d} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 \cdot p_t(\mathbf{x}|\mathbf{y}) \, d\mathbf{x} = \mathcal{O} \left( \frac{B^2}{\sigma_t^2} \cdot N^{-\frac{2\beta}{d+d_y}} \cdot (\log N)^{\beta+1} \right). $$
The hyperparameters in the ReLU neural network class $\mathcal{F}$ satisfy
$$ M_t = \mathcal{O}(\sqrt{\log N} / \sigma_t), \quad W = \mathcal{O}(N \log^7 N), $$
$$ \kappa = \exp(\mathcal{O}(\log^4 N)), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}(N \log^9 N). $$
The proof is provided in Appendix B. We discuss several interpretations.

**Improved rate of approximation** The approximation rate here is $N^{-\frac{2\beta}{d+d_y}}$, which is substantially faster than Theorem 3.2. Further, we also have an improved dependence on $\sigma_t$ and $\log N$. These improvements are made possible by an intricate approximation of $f(\mathbf{x}, \mathbf{y})$ in a shell region. See details in Section 3.2.

**Relation to Oko et al. [2023]** A similar approximation rate is proved in Oko et al. [2023] for Besov data distributions on a bounded domain, where a special boundary condition is needed to validate their approximation theory. Despite that Theorem 3.4 allows conditional score approximation, the major difference in Theorem 3.4 is that it only requires mild boundedness conditions on the conditional density function.

**Extensions of Theorems 3.2 and 3.4** We remark that our theory can also apply to the case in which $\mathbf{y} \in \mathbb{R}^{d_y}$ instead of $\mathbf{y} \in [0, 1]^{d_y}$. Moreover, our theory naturally applies to the unconditioned score approximation (approximate $\nabla \log p_t(\mathbf{x})$) when we remove the conditional dependence of $\mathbf{y}$. We refer the readers to Appendix C for more details about the extensions of our approximation theory. These extensions further enable wide applications of our theory in reinforcement learning and inverse problems.

9

### Visual Description
Text-only slide.

---

## Page 10
### Content
### 3.2 Proof Overview and Unraveling the Fast Rate
Here we introduce a unified analytical framework for proving Theorems 3.2 and 3.4. The key steps consist of a proper truncation of the data density function and domain, and a novel diffused Taylor polynomial approximation. More importantly, we discuss in detail how Assumption 3.3 leads to a fast approximation rate.

**Unified Analytical Framework for Theorems 3.2 and 3.4** To begin with, we rewrite the score function as
$$ \nabla \log p_t(\mathbf{x}|\mathbf{y}) = \frac{\nabla p_t(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})}, $$
where we develop approximations to the numerator and denominator separately. Yet the construction of the approximations to the numerator and denominator is almost identical. In the following, we focus on the approximation of $p_t(\mathbf{x}|\mathbf{y})$. We also demonstrate the idea in the left panel of Figure 1.

*   **Approximate numerator and denominator.** Following the forward process (2.1) of conditional diffusion models, we have
    $$ p_t(\mathbf{x}|\mathbf{y}) = \int_{\mathbb{R}^d} p(\mathbf{z}|\mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}. \quad (3.1) $$
    Recall that the initial conditional density function $p(\mathbf{z}|\mathbf{y})$ is Hölder continuous. To approximate $p_t(\mathbf{x}|\mathbf{y})$, a naïve idea is to use a Taylor polynomial $h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y})$ to approximate $p(\mathbf{z}|\mathbf{y})$. This leads to an approximator in the form of
    $$ \int_{\mathbb{R}^d} h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}. $$
    Examining the display above, we encounter two caveats:
    1. Since the data domain is unbounded, it can be difficult to uniformly approximate the conditional density $p(\mathbf{z}|\mathbf{y})$ using $h_{\text{Taylor}}^{\text{density}}$;
    2. Although the Taylor polynomial $h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y})$ can be implemented using a neural network, the integration over $\mathbf{z}$ is prohibitively difficult to handle. Moreover, the exponential function and the time $t$ dependence make the approximation more obscure.

To address the first challenge, we devise a proper truncation on the data domain. Specifically, for any time $t$, we truncate the data domain by an $\ell_\infty$-ball of radius $R$, that is, we denote $\mathcal{D}_1 = \{\mathbf{z} : \|\mathbf{z}\|_\infty \leq R\}$ and only ensure $h_{\text{Taylor}}^{\text{density}}$ approximates $p(\mathbf{z}|\mathbf{y})$ on $\mathcal{D}_1$ for any $\mathbf{y}$. Such a domain truncation is reasonable when the conditional density function has a light tail. In other words, the truncation error is well controllable when the radius $R$ is sufficiently large (see details in Lemma A.1).

For the second challenge, we propose **diffused local polynomials** suitable for approximation of $p_t(\mathbf{x}|\mathbf{y})$. Let $h_{\text{Taylor}}^{\text{kernel}}(\mathbf{z}, \mathbf{x}, t)$ be a Taylor polynomial for approximating the exponential transition kernel in (3.1). Then we define
$$ \text{Diffused-local-poly}(\mathbf{x}, \mathbf{y}, t) = \int_{\mathbb{R}^d} \frac{1}{\sigma_t^d (2\pi)^{d/2}} h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y}) h_{\text{Taylor}}^{\text{kernel}}(\mathbf{z}, \mathbf{x}, t) d\mathbf{z}. $$

10

### Visual Description
Text-only slide.

---

## Page 11
### Content
We note that diffused local polynomials resemble the same formulation of $p_t(\mathbf{x}|\mathbf{y})$, while they enjoy a critical advantage: As the product $h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y}) h_{\text{Taylor}}^{\text{kernel}}(\mathbf{z}, \mathbf{x}, t)$ is again a polynomial, whose integration is explicitly computable and consequently allows a direct neural network implementation. We remark that the time $t$ enters the diffused local polynomials only through the two quantities $\sigma_t$ and $\alpha_t$ in the Gaussian kernel, which are both super smooth and very easy to approximate. We acknowledge that diffused local polynomials are inspired by the analysis in Oko et al. [2023]. A similar approximation scheme utilizing diffused local polynomials can be applied to $\nabla p_t(\mathbf{x}|\mathbf{y})$ in the numerator.

*   **Use a fraction to approximate the score function.** We approximate the score function by the fraction $\nabla \log p_t(\mathbf{x}|\mathbf{y}) = \nabla p_t(\mathbf{x}|\mathbf{y}) / p_t(\mathbf{x}|\mathbf{y})$, however, there is an additional caveat: $p_t(\mathbf{x}|\mathbf{y})$ can be arbitrarily small so that the reciprocal $1/p_t(\mathbf{x}|\mathbf{y})$ can explode to infinity. The reason behind this exploding issue is that the initial data distribution fails to have good coverage uniformly. That is, the density of the initial data distribution can be small (or even zero) in some areas. As a result, estimating the density in these regions is fundamentally difficult [Tsybakov, 2008].

Here we introduce a threshold $\epsilon_{\text{low}}$ to alleviate the exploding reciprocal issue. The idea is to replace the denominator in (3.1) by $\max\{p_t(\mathbf{x}|\mathbf{y}), \epsilon_{\text{low}}\}$. We choose a proper $\epsilon_{\text{low}}$ balancing two criteria: 1) $\epsilon_{\text{low}}$ should not be too small so that $1/\epsilon_{\text{low}}$ is controlled; 2) $\epsilon_{\text{low}}$ should not be too large to deviate heavily from the original score function. As we will show in Lemma A.2, the choice of $\epsilon_{\text{low}}$ depends on the tail behavior of the conditional distribution $p_t(\mathbf{x}|\mathbf{y})$. We remark that truncating $p_t(\mathbf{x}|\mathbf{y})$ at $\epsilon_{\text{low}}$ inevitably compromises the approximation efficiency, which leaves room for improvement in Theorem 3.4.

To this end, it remains to implement the previous constructions by a neural network, where we leverage the universal approximation ability of ReLU networks.

**Unraveling the fast rate** We further discuss how Assumption 3.3 enables a fast approximation rate. Under Assumption 3.3, substituting $p(\mathbf{z}|\mathbf{y}) = f(\mathbf{z}, \mathbf{y}) \exp(-C_2 \|\mathbf{z}\|_2^2 / 2)$ into (3.1), by some algebraic manipulation, we have
$$ p_t(\mathbf{x}|\mathbf{y}) = \frac{1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \cdot \underbrace{\int f(\mathbf{z}, \mathbf{y}) \frac{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}}{(2\pi)^{d/2} \sigma_t^d} \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x} / (\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2 / (\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z}}_{h(\mathbf{x}, \mathbf{y}, t)}. \quad (3.2) $$
We observe that $f(\mathbf{z}, \mathbf{y})$ has two benign properties: 1) it is lower bounded away from zero, suggesting homogeneous spatial coverage of the data distribution; 2) it has Hölder regularity with a bounded Hölder norm. Denoting the integral in (3.2) as $h(\mathbf{x}, \mathbf{y}, t)$, we immediately deduce that $h(\mathbf{x}, \mathbf{y}, t)$ is bounded away from 0. Equation (3.2) also suggests that
$$ \nabla \log p_t(\mathbf{x}|\mathbf{y}) = \frac{-C_2 \mathbf{x}}{(\alpha_t^2 + C_2 \sigma_t^2)} + \frac{\nabla_{\mathbf{x}} h(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)}. $$
Thus, it suffices to approximate $\frac{\nabla_{\mathbf{x}} h(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)}$ using the analytical framework introduced in the previous paragraphs. Notably, we do not need to truncate $h(\mathbf{x}, \mathbf{y}, t)$ to prevent the exploding of $1/h(\mathbf{x}, \mathbf{y}, t)$, which saves the truncation error and leads to fast approximation. We provide a side-by-side comparison between the approximation schemes in Theorems 3.2 and 3.4 in Figure 1.

11

### Visual Description
Text-only slide.

---

## Page 12
### Content
<div align="center">
  <img src="figure1.png" alt="Comparison of approximation schemes" width="80%">
</div>

**Figure 1:** Comparison of approximation schemes in Theorems 3.2 and 3.4. On the left panel, we use diffused local polynomials to approximate the numerator and denominator on a truncated cube. However, the existence of small density region necessitates a truncation at $\epsilon_{\text{low}}$, which compromises the approximation efficiency. In contrast, under Assumption 3.3, we eliminate small density regions within the cube, which leads to a fast approximation.

### 4 From Score Approximation to Distribution Estimation: Statistical Results
Section 3 provides theoretical results of approximating conditional score functions using ReLU neural networks. In this section, we apply these theoretical results to statistical estimation problems and develop a few sample complexity results for methods that involve conditional score estimation. In particular, we first study the problem of estimating a conditional score function via the classifier-free guidance method introduced in Section 2 and quantify the sample complexity of learning the conditional score from data with ReLU neural networks. We further apply this result to establish the sample complexity of learning a conditional distribution via the conditional diffusion model. Furthermore, we conclude this section with an application of our statistical theory to the problem of estimating the transition probability in model-based reinforcement learning.

#### 4.1 Conditional Score Estimation
Recall that classifier-free guidance method estimates the conditional score function by minimizing the empirical risk $\hat{\mathcal{L}}$ defined in (2.6). Given a score network $\mathcal{F}$, we denote the corresponding empirical risk minimizer as
$$ \hat{\mathbf{s}} \in \text{argmin}_{\mathbf{s} \in \mathcal{F}} \hat{\mathcal{L}}(\mathbf{s}). $$
We measure the quality of the estimator $\hat{\mathbf{s}}$ by its mean-squared deviation to the ground-truth conditional score function:
$$ \mathcal{R}(\hat{\mathbf{s}}) = \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{(\mathbf{x}_t, \mathbf{y})} \|\hat{\mathbf{s}}(\mathbf{x}_t, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{y})\|_2^2 \, dt. $$
Here the expectation is taken over the joint distribution of $\mathbf{x}_t$ and $\mathbf{y}$. The following theorem presents upper bounds on $\mathcal{R}(\hat{\mathbf{s}})$ when the score network $\mathcal{F}$ is chosen based on Theorem 3.2.

**Theorem 4.1.** Suppose Assumption 3.1 holds and we choose the score network $\mathcal{F}(M_t, W, \kappa, L, K)$ as in Theorem 3.2. By taking the network size parameter $N = n^{\frac{d+d_y}{d+d_y+\beta}}$, the early-stopping time

12

### Visual Description
The page contains a figure (Figure 1) comparing two approximation schemes.
- The left diagram (Under Assumption 3.1) shows a yellow oval representing the domain $\mathbb{R}^d \times [0, 1]^{d_y}$. Inside is a blue square representing the truncated domain $[-R, R]^d$. Within this square, there is a red region labeled "Small density region $p_t(\mathbf{x}|\mathbf{y}) < \epsilon_{\text{low}}$". An arrow points to the edge of the oval labeled "Light tail".
- The right diagram (Under Assumption 3.3) shows the same setup, but the entire blue square is filled with dots and labeled "$h(\mathbf{x}, \mathbf{y}, t)$ uniformly upper-lower bounded" with a green checkmark, indicating the elimination of small density regions.
The rest of the page is text describing Section 4 and Section 4.1.

---

## Page 13
### Content
$t_0 < 1$ and the terminal time $T = \mathcal{O}(\log n)$, it holds that
$$ \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{R}(\hat{\mathbf{s}})] = \mathcal{O} \left( \frac{1}{t_0} \cdot n^{-\frac{\beta}{d+d_y+\beta}} (\log n)^{\max(17, d+\beta/2+1)} \right). $$
Moreover, when Assumption 3.3 holds, taking $N = n^{\frac{d+d_y}{d+d_y+2\beta}}$, we have
$$ \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{R}(\hat{\mathbf{s}})] = \mathcal{O} \left( \log \frac{1}{t_0} \cdot n^{-\frac{2\beta}{d+d_y+2\beta}} (\log n)^{\max(17, \beta)} \right). $$
The proof is provided in Appendix D.2 and utilizes a sophisticated bias-variance trade-off with proper truncation. Several discussions are in turn.

**Sample complexity bounds** Theorem 4.1 establishes sample complexity results for conditional score estimation. We focus on the result under Assumption 3.3. To obtain an $\epsilon$-error $L_2$ score estimator, the sample size scales in the order of $\mathcal{O}(\epsilon^{-(d+d_y+2\beta)/(2\beta)})$, where $\tilde{\mathcal{O}}$ omits a polynomial in $\log(1/t_0)$. This sample complexity is reminiscent of the nonparametric regression rate for $\beta$-Hölder functions defined on the joint space of $(\mathbf{x}, \mathbf{y})$. Yet we emphasize that the target conditional score function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$ here does not necessarily possess Hölder regularities, although the initial data distribution does. This indicates that the regularity of the initial data distribution dictates the complexity of score estimation.

**Impact of early-stopping** Our risk bounds involve the early-stopping time $t_0$. As $t_0$ decreases, the estimation error grows, which implies the difficulty of potential score function blowup. Under Assumption 3.3, however, the error bound only logarithmically depends on $t_0$, allowing flexible choice on the early-stopping. In the following section, we will optimally choose $t_0$ under both assumptions for distribution estimation.

#### 4.2 Distribution Estimation
Given the trained conditional score network $\hat{\mathbf{s}}(\mathbf{x}, \mathbf{y}, t)$ in the previous section, we study its distribution estimation power. To ease the presentation, we consider utilizing the continuous-time backward process (2.3) for distribution estimation. In practice, a proper discretization is applied to generate samples, whose deviation to the continuous-time backward process can be controlled by the step size of the discretization (see for example [Chen et al., 2022b, Theorem 2]).

For a given guidance $\mathbf{y}$, we denote the early-stopped generated data distribution as $\hat{P}_{t_0}(\cdot|\mathbf{y})$ using the estimated score $\hat{\mathbf{s}}$. We bound the divergence between $\hat{P}_{t_0}(\cdot|\mathbf{y})$ to the ground-truth conditional data distribution $P(\cdot|\mathbf{y})$ in the following theorem.

**Theorem 4.2.** Suppose Assumption 3.1 holds. Assume in addition that there exists a constant $C$ such that $KL(P(\cdot|\mathbf{y}) \| N(\mathbf{0}, \mathbf{I})) \leq C < \infty$ for all $\mathbf{y}$. Taking the early-stopping time $t_0 = n^{-\frac{\beta}{4(d+d_y+\beta)}}$ and the terminal time $T = \frac{2\beta}{d+d_y+2\beta} \log n$, it holds that
$$ \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \mathbb{E}_{\mathbf{y}} \left[ TV(\hat{P}_{t_0}(\cdot|\mathbf{y}), P(\cdot|\mathbf{y})) \right] \right] = \mathcal{O} \left( n^{-\frac{\beta}{4(d+d_y+\beta)}} (\log n)^{\max(9, d/2+\beta/4+1)} \right). $$
On the other hand, assume only Assumption 3.3. Taking $t_0 = n^{-\frac{4\beta}{d+d_y+2\beta}-1}$, it holds that
$$ \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \mathbb{E}_{\mathbf{y}} \left[ TV(\hat{P}_{t_0}(\cdot|\mathbf{y}), P(\cdot|\mathbf{y})) \right] \right] = \mathcal{O} \left( n^{-\frac{\beta}{d+d_y+2\beta}} (\log n)^{\max(19/2, (\beta+2)/2)} \right). $$
The proof is provided in Appendix D.3 and utilizes Girsanov’s theorem to bridge the score estimation error to the distribution estimation error. We provide some interpretations of the results.

13
## Page 17
### Content
### 5.2 Inverse Problems
Diffusion models have shown remarkable performance in various types of inverse problems, spanning computer vision [Chung et al., 2022a,c, Song et al., 2023], computational biology [Yi et al., 2023, Wu et al., 2024], and reinforcement learning [Ajay et al., 2022].

We concentrate on a simple prototypical form of inverse problems: Retrieving an unknown $\mathbf{x}$ from a linear measurement $\mathbf{y}$, where $\mathbf{x}$ and $\mathbf{y}$ are related by
$$\mathbf{y} = \mathbf{H}\mathbf{x} + \epsilon, \quad \text{with } \mathbf{H} \in \mathbb{R}^{m \times d}. \tag{5.2}$$
Here $\mathbf{x} \in \mathbb{R}^d$ and $\mathbf{y} \in \mathbb{R}^m$ with $m < d$, representing common real-world scenarios such as $\mathbf{y}$ being a low-dimensional sketching observation of $\mathbf{x}$. Gaussian noise $\epsilon \sim N(0, \sigma^2 I_m)$ is independent of $\mathbf{x}$ for a positive variance $\sigma^2$. In general, solving for $\mathbf{x}$ based on a measurement $\mathbf{y}$ is underdetermined with infinitely many solutions. Hence, we primarily investigate whether it is possible to estimate the conditional distribution $P(\cdot|\mathbf{y})$ induced by a sampling distribution on $\mathbf{x}$.

Suppose we are given a dataset $\mathcal{D} = \{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n$, where $\{\mathbf{x}_i\}_{i=1}^n$ is sampled from an underlying distribution $P(\mathbf{x})$ and $\{\mathbf{y}_i\}_{i=1}^n$ is obtained via (5.2) with independent noise. We use classifier-free guidance to train a conditional diffusion model capable of generating samples $\mathbf{x} \sim \widehat{P}(\cdot|\mathbf{y}^\star)$, where $\mathbf{y}^\star$ is a given measurement. Clearly, $\widehat{P}(\cdot|\mathbf{y}^\star)$ is the estimated conditional distribution on $\mathbf{x}$. We impose the following regularity assumption on the underlying distribution $P(\mathbf{x})$.

**Assumption 5.3.** The sampling distribution $P(\mathbf{x})$ has a density function $p(\mathbf{x})$. Moreover, there exist two positive constants $C$ and $C_2$, and a function $f \in \mathcal{H}^\beta(\mathbb{R}^d, B)$ for a Hölder index $\beta$ and a constant radius $B > 0$. The density function satisfies $p(\mathbf{x}) = f(\mathbf{x}) \exp(-C_2 \|\mathbf{x}\|^2 / 2)$ and $p(\mathbf{x}) \geq C$ for all $\mathbf{x}$.

Assumption 5.3 is the same as Assumption 3.3 without the dependence on $\mathbf{y}$. Indeed, $\mathbf{y}$ is highly correlated to $\mathbf{x}$ through the linear relation. The next result asserts the recovery of $\mathbf{x}$ given a measurement $\mathbf{y}^\star$.

**Proposition 5.4.** Suppose Assumption 5.3 holds. We further assume $\log \sigma = \mathcal{O}(\log n)$ and $\sigma^2 \leq \lambda_i \lesssim \sigma^4$ for any $i \in [m]$, where $\{\lambda_i\}_{i \in [m]}$ is the set of eigenvalues of $\mathbf{H}\mathbf{H}^\top$. Given an arbitrary measurement $\mathbf{y}^\star$, taking $t_0 = n^{-\frac{4\beta}{d+2\beta}-1}$ and $T = \frac{2\beta}{d+2\beta} \log n$, we have
$$\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \text{TV} \left( \widehat{P}(\cdot|\mathbf{y}^\star), P(\cdot|\mathbf{y}^\star) \right) \right] = \mathcal{T}(\mathbf{y}^\star) \cdot \mathcal{O} \left( n^{-\frac{\beta}{d+2\beta}} (\log n)^{\max(19/2, (\beta+2)/2)} \right).$$
Moreover, the posterior mean of $\mathbf{x}$ given $\mathbf{y}^\star$ is estimated with
$$\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \left\| \mathbb{E}_{P(\cdot|\mathbf{y}^\star)}[\mathbf{x}] - \mathbb{E}_{\widehat{P}(\cdot|\mathbf{y}^\star)}[\mathbf{x}] \right\| \right] = \mathcal{T}(\mathbf{y}^\star) \cdot \mathcal{O} \left( n^{-\frac{\beta}{d+2\beta}} (\log n)^{\max(11, (\beta+5)/2)} \right).$$

The proof is provided in Appendix E.2. This is the first statistical guarantee of diffusion models for linear inverse problems. The rate of convergence is dependent on the smoothness of $p(\mathbf{x})$ and the dimension of $\mathbf{x}$, but independent of the measurement dimension $m$. Moreover, the statistical convergence rate is dependent on the distribution shift coefficient $\mathcal{T}(\mathbf{y}^\star)$. This suggests that if $\mathbf{y}^\star$ significantly deviates from the training data distribution, the estimation of $\mathbf{x}$ may suffer, advertising the importance of data coverage in inverse problems [Yu et al., 2023].

### Visual Description
Text-only slide.

---

## Page 18
### Content
### 6 Conclusion
In this paper, we have developed a sharp statistical theory for conditional diffusion models trained with classifier-free guidance. By focusing on a broad class of conditional distributions characterized by Hölder smoothness and sub-Gaussian tails, we have demonstrated the existence of a suitably sized score neural network capable of approximating the score function with an arbitrarily small error. We have further established score estimation and distribution estimation guarantees using conditional diffusion models. The statistical rate of convergence matches the minimax optimal rate. Moreover, we have applied our established theories to explain the empirical success of diffusion models in reinforcement learning and inverse problems. These results showcase the practical relevance of our statistical analysis and provide the first theoretical underpinning of conditional diffusion models.

### References
* Anurag Ajay, Yilun Du, Abhi Gupta, Joshua Tenenbaum, Tommi Jaakkola, and Pulkit Agrawal. Is conditional generative modeling all you need for decision-making? *arXiv preprint arXiv:2211.15657*, 2022.
* Michael S Albergo, Nicholas M Boffi, and Eric Vanden-Eijnden. Stochastic interpolants: A unifying framework for flows and diffusions. *arXiv preprint arXiv:2303.08797*, 2023.
* Juan Miguel Lopez Alcaraz and Nils Strodthoff. Diffusion-based time series imputation and forecasting with structured state space models. *arXiv preprint arXiv:2208.09399*, 2022.
* Namrata Anand and Tudor Achim. Protein structure and sequence generation with equivariant denoising diffusion probabilistic models. *arXiv preprint arXiv:2205.15019*, 2022.
* Omri Avrahami, Dani Lischinski, and Ohad Fried. Blended diffusion for text-driven editing of natural images. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, pages 18208–18218, 2022.
* Martin Azizyan, Aarti Singh, and Larry Wasserman. Minimax theory for high-dimensional gaussian mixtures with sparse mean separation. *Advances in Neural Information Processing Systems*, 26, 2013.
* Arpit Bansal, Hong-Min Chu, Avi Schwarzschild, Soumyadip Sengupta, Micah Goldblum, Jonas Geiping, and Tom Goldstein. Universal guidance for diffusion models. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, pages 843–852, 2023.
* Joe Benton, Valentin De Bortoli, Arnaud Doucet, and George Deligiannidis. Linear convergence bounds for diffusion models via stochastic localization. *arXiv preprint arXiv:2308.03686*, 2023.
* Adam Block, Youssef Mroueh, and Alexander Rakhlin. Generative modeling with denoising autoencoders and langevin sampling. *arXiv preprint arXiv:2002.00107*, 2020.
* Greg Brockman, Vicki Cheung, Ludwig Pettersson, Jonas Schneider, John Schulman, Jie Tang, and Wojciech Zaremba. Openai gym, 2016.
* Sébastien Bubeck, Rémi Munos, and Gilles Stoltz. Pure exploration in finitely-armed and continuous-armed bandits. *Theoretical Computer Science*, 412(19):1832–1852, 2011.

### Visual Description
Text-only slide.

---

## Page 19
### Content
* Clément L. Canonne. A short note on an inequality between kl and tv, 2023.
* Chentao Cao, Zhuo-Xu Cui, Shaonan Liu, Dong Liang, and Yanjie Zhu. High-frequency space diffusion models for accelerated mri. *arXiv preprint arXiv:2208.05481*, 2022.
* Jinglin Chen and Nan Jiang. Information-theoretic considerations in batch reinforcement learning. In *Proceedings of the International Conference on Machine Learning*, pages 1042–1051. PMLR, 2019.
* Minshuo Chen, Haoming Jiang, Wenjing Liao, and Tuo Zhao. Nonparametric regression on low-dimensional manifolds using deep relu networks: Function approximation and statistical recovery. *Information and Inference: A Journal of the IMA*, 11(4):1203–1253, 2022a.
* Minshuo Chen, Yu Bai, H Vincent Poor, and Mengdi Wang. Efficient rl with impaired observability: Learning to act with delayed and missing state observations. *arXiv preprint arXiv:2306.01243*, 2023a.
* Minshuo Chen, Kaixuan Huang, Tuo Zhao, and Mengdi Wang. Score approximation, estimation and distribution recovery of diffusion models on low-dimensional data. *arXiv preprint arXiv:2302.07194*, 2023b.
* Nanxin Chen, Yu Zhang, Heiga Zen, Ron J Weiss, Mohammad Norouzi, and William Chan. Wavegrad: Estimating gradients for waveform generation. *arXiv preprint arXiv:2009.00713*, 2020.
* Sitan Chen, Sinho Chewi, Jerry Li, Yuanzhi Li, Adil Salim, and Anru R Zhang. Sampling is as easy as learning the score: theory for diffusion models with minimal data assumptions. *arXiv preprint arXiv:2209.11215*, 2022b.
* Sitan Chen, Sinho Chewi, Holden Lee, Yuanzhi Li, Jianfeng Lu, and Adil Salim. The probability flow ode is provably fast. *arXiv preprint arXiv:2305.11798*, 2023c.
* Sitan Chen, Giannis Daras, and Alex Dimakis. Restoration-degradation beyond linear diffusions: A non-asymptotic analysis for ddim-type samplers. In *Proceedings of the International Conference on Machine Learning*, pages 4462–4484. PMLR, 2023d.
* Siyu Chen, Mengdi Wang, and Zhuoran Yang. Actions speak what you want: Provably sample-efficient reinforcement learning of the quantal stackelberg equilibrium from strategic feedbacks. *arXiv preprint arXiv:2307.14085*, 2023e.
* Yuansi Chen and Ronen Eldan. Localization schemes: A framework for proving mixing bounds for markov chains. In *Proceedings of the 2022 IEEE 63rd Annual Symposium on Foundations of Computer Science (FOCS)*, pages 110–122. IEEE, 2022.
* Cheng Chi, Siyuan Feng, Yilun Du, Zhenjia Xu, Eric Cousineau, Benjamin Burchfiel, and Shuran Song. Diffusion Policy: Visuomotor policy learning via action diffusion. *arXiv preprint arXiv:2303.04137*, 2023.
* Hyungjin Chung and Jong Chul Ye. Score-based diffusion models for accelerated MRI. *Medical Image Analysis*, 80:102479, 2022.
* Hyungjin Chung, Jeongsol Kim, Michael T Mccann, Marc L Klasky, and Jong Chul Ye. Diffusion posterior sampling for general noisy inverse problems. *arXiv preprint arXiv:2209.14687*, 2022a.

### Visual Description
Text-only slide.

---

## Page 20
### Content
* Hyungjin Chung, Eun Sun Lee, and Jong Chul Ye. MR image denoising and super-resolution using regularized reverse diffusion. *IEEE Transactions on Medical Imaging*, 42(4):922–934, 2022b.
* Hyungjin Chung, Byeongsu Sim, Dohoon Ryu, and Jong Chul Ye. Improving diffusion models for inverse problems using manifold constraints. *Advances in Neural Information Processing Systems*, 35:25683–25696, 2022c.
* Sumanth Dathathri, Andrea Madotto, Janice Lan, Jane Hung, Eric Frank, Piero Molino, Jason Yosinski, and Rosanne Liu. Plug and play language models: A simple approach to controlled text generation. *arXiv preprint arXiv:1912.02164*, 2019.
* Valentin De Bortoli. Convergence of denoising diffusion models under the manifold hypothesis. *arXiv preprint arXiv:2208.05314*, 2022.
* Valentin De Bortoli, James Thornton, Jeremy Heng, and Arnaud Doucet. Diffusion schrödinger bridge with applications to score-based generative modeling. *Advances in Neural Information Processing Systems*, 34:17695–17709, 2021.
* Prafulla Dhariwal and Alexander Nichol. Diffusion models beat gans on image synthesis. *Advances in Neural Information Processing Systems*, 34:8780–8794, 2021.
* Ahmed El Alaoui and Andrea Montanari. An information-theoretic view of stochastic localization. *IEEE Transactions on Information Theory*, 68(11):7423–7426, 2022.
* Ahmed El Alaoui, Andrea Montanari, and Mark Sellke. Sampling from mean-field gibbs measures via diffusion processes. *arXiv preprint arXiv:2310.08912*, 2023.
* Ronen Eldan. Thin shell implies spectral gap up to polylog via a stochastic localization scheme. *Geometric and Functional Analysis*, 23(2):532–569, 2013.
* Jianqing Fan, Zhaoran Wang, Yuchen Xie, and Zhuoran Yang. A theoretical analysis of deep Q-learning. In *Proceedings of the Learning for Dynamics and Control*, pages 486–489. PMLR, 2020.
* Nate Gruver, Samuel Stanton, Nathan C Frey, Tim GJ Rudner, Isidro Hotzel, Julien Lafrance-Vanasse, Arvind Rajpal, Kyunghyun Cho, and Andrew Gordon Wilson. Protein design with guided discrete diffusion. *arXiv preprint arXiv:2305.20009*, 2023.
* Alper Güngör, Salman UH Dar, Şaban Öztürk, Yilmaz Korkmaz, Hasan A Bedel, Gokberk Elmas, Muzaffer Ozbey, and Tolga Çukur. Adaptive diffusion priors for accelerated MRI reconstruction. *Medical Image Analysis*, page 102872, 2023.
* László Györfi, Michael Kohler, Adam Krzyzak, and Harro Walk. *A distribution-free theory of nonparametric regression*. Springer Science & Business Media, 2006.
* Philippe Hansen-Estruch, Ilya Kostrikov, Michael Janner, Jakub Grudzien Kuba, and Sergey Levine. IDQL: Implicit Q-learning as an actor-critic method with diffusion policies. *arXiv preprint arXiv:2304.10573*, 2023.
* Jonathan Ho and Tim Salimans. Classifier-free diffusion guidance. *arXiv preprint arXiv:2207.12598*, 2022.
* Jonathan Ho, Ajay Jain, and Pieter Abbeel. Denoising diffusion probabilistic models. *Advances in Neural Information Processing Systems*, 33:6840–6851, 2020.

### Visual Description
Text-only slide.

---

## Page 21
### Content
* Rongjie Huang, Zhou Zhao, Huadai Liu, Jinglin Liu, Chenye Cui, and Yi Ren. Prodiff: Progressive fast diffusion model for high-quality text-to-speech. In *Proceedings of the 30th ACM International Conference on Multimedia*, pages 2595–2605, 2022a.
* Yinan Huang, Xingang Peng, Jianzhu Ma, and Muhan Zhang. 3DLinker: an E (3) equivariant variational autoencoder for molecular linker design. *arXiv preprint arXiv:2205.07309*, 2022b.
* John Ingraham, Max Baranov, Zak Costello, Vincent Frappier, Ahmed Ismail, Shan Tie, Wujie Wang, Vincent Xue, Fritz Obermeyer, Andrew Beam, et al. Illuminating protein space with a programmable generative model. *BioRxiv*, pages 2022–12, 2022.
* Michael Janner, Yilun Du, Joshua B Tenenbaum, and Sergey Levine. Planning with diffusion for flexible behavior synthesis. *arXiv preprint arXiv:2205.09991*, 2022.
* Myeonghun Jeong, Hyeongju Kim, Sung Jun Cheon, Byoung Jin Choi, and Nam Soo Kim. Diff-tts: A denoising diffusion model for text-to-speech. *arXiv preprint arXiv:2104.01409*, 2021.
* Bowen Jing, Gabriele Corso, Jeffrey Chang, Regina Barzilay, and Tommi Jaakkola. Torsional diffusion for molecular conformer generation. *Advances in Neural Information Processing Systems*, 35:24240–24253, 2022.
* Gwanghyun Kim, Taesung Kwon, and Jong Chul Ye. Diffusionclip: Text-guided diffusion models for robust image manipulation. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, pages 2426–2435, 2022.
* Zhifeng Kong, Wei Ping, Jiaji Huang, Kexin Zhao, and Bryan Catanzaro. Diffwave: A versatile diffusion model for audio synthesis. *arXiv preprint arXiv:2009.09761*, 2020.
* Simon Kornblith, Lala Li, Zirui Wang, and Thao Nguyen. Classifier-free guidance makes image captioning models more descriptive. In *ICLR 2023 Workshop on Multimodal Representation Learning: Perks and Pitfalls*, 2023.
* Holden Lee, Jianfeng Lu, and Yixin Tan. Convergence for score-based generative modeling with polynomial complexity. *arXiv preprint arXiv:2206.06227*, 2022a.
* Holden Lee, Jianfeng Lu, and Yixin Tan. Convergence of score-based generative modeling for general data distributions. *arXiv preprint arXiv:2209.12381*, 2022b.
* Jin Sub Lee, Jisun Kim, and Philip M Kim. Proteinsgm: Score-based generative modeling for de novo protein design. *bioRxiv*, pages 2022–07, 2022c.
* Xin Li, Yulin Ren, Xin Jin, Cuiling Lan, Xingrui Wang, Wenjun Zeng, Xinchao Wang, and Zhibo Chen. Diffusion models for image restoration and enhancement–a comprehensive survey. *arXiv preprint arXiv:2308.09388*, 2023.
* Qiang Liu, Lihong Li, Ziyang Tang, and Dengyong Zhou. Breaking the curse of horizon: Infinite-horizon off-policy estimation. *Advances in Neural Information Processing Systems*, 31, 2018.
* Xingchao Liu, Lemeng Wu, Mao Ye, and Qiang Liu. Let us build bridges: Understanding and extending diffusion generative models. *arXiv preprint arXiv:2208.14699*, 2022.
* Shitong Luo, Yufeng Su, Xingang Peng, Sheng Wang, Jian Peng, and Jianzhu Ma. Antigen-specific antibody design and optimization with diffusion-based generative models for protein structures. *Advances in Neural Information Processing Systems*, 35:9754–9767, 2022.

### Visual Description
Text-only slide.

---

## Page 22
### Content
* Siyuan Mei, Fuxin Fan, and Andreas Maier. Metal inpainting in CBCT projections using score-based generative model. *arXiv preprint arXiv:2209.09733*, 2022.
* Song Mei and Yuchen Wu. Deep networks as denoising algorithms: Sample-efficient learning of diffusion models in high-dimensional graphical models. *arXiv preprint arXiv:2309.11420*, 2023.
* Chenlin Meng, Robin Rombach, Ruiqi Gao, Diederik Kingma, Stefano Ermon, Jonathan Ho, and Tim Salimans. On distillation of guided diffusion models. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, pages 14297–14306, June 2023.
* Gautam Mittal, Jesse Engel, Curtis Hawthorne, and Ian Simon. Symbolic music generation with diffusion models. *arXiv preprint arXiv:2103.16091*, 2021.
* Andrea Montanari. Sampling, diffusions, and stochastic localization. *arXiv preprint arXiv:2305.10690*, 2023.
* Andrea Montanari and Yuchen Wu. Posterior sampling from the spiked models via diffusion processes. *arXiv preprint arXiv:2304.11449*, 2023.
* Rémi Munos and Csaba Szepesvári. Finite-time bounds for fitted value iteration. *Journal of Machine Learning Research*, 9(5), 2008.
* Ryumei Nakada and Masaaki Imaizumi. Adaptive approximation and generalization of deep neural network with intrinsic dimensionality. *The Journal of Machine Learning Research*, 21(1):7018–7055, 2020.
* Alexander Quinn Nichol and Prafulla Dhariwal. Improved denoising diffusion probabilistic models. In *Proceedings of the International Conference on Machine Learning*, pages 8162–8171. PMLR, 2021.
* Kazusato Oko, Shunta Akiyama, and Taiji Suzuki. Diffusion models are minimax optimal distribution estimators. *arXiv preprint arXiv:2303.01861*, 2023.
* Tim Pearce, Tabish Rashid, Anssi Kanervisto, Dave Bignell, Mingfei Sun, Raluca Georgescu, Sergio Valcarcel Macua, Shan Zheng Tan, Ida Momennejad, Katja Hofmann, and Sam Devlin. Imitating human behaviour with diffusion models. *arXiv preprint arXiv:2301.10677*, 2023.
* Moritz Reuss, Maximilian Li, Xiaogang Jia, and Rudolf Lioutikov. Goal-conditioned imitation learning using score-based diffusion policies. *arXiv preprint arXiv:2304.02532*, 2023.
* Arne Schneuing, Yuanqi Du, Charles Harris, Arian Jamasb, Ilia Igashov, Weitao Du, Tom Blundell, Pietro Lió, Carla Gomes, Max Welling, Michael Bronstein, and Bruno Correia. Structure-based drug design with equivariant diffusion models. *arXiv preprint arXiv:2210.13695*, 2022.
* Kulin Shah, Sitan Chen, and Adam Klivans. Learning mixtures of gaussians using the ddpm objective. *arXiv preprint arXiv:2307.01178*, 2023.
* Aleksandrs Slivkins et al. Introduction to multi-armed bandits. *Foundations and Trends® in Machine Learning*, 12(1-2):1–286, 2019.
* Bowen Song, Soo Min Kwon, Zecheng Zhang, Xinyu Hu, Qing Qu, and Liyue Shen. Solving inverse problems with latent diffusion models via hard data consistency. *arXiv preprint arXiv:2307.08123*, 2023.

### Visual Description
Text-only slide.

---

## Page 23
### Content
* Yang Song and Stefano Ermon. Generative modeling by estimating gradients of the data distribution. *Advances in Neural Information Processing Systems*, 32, 2019.
* Yang Song and Stefano Ermon. Improved techniques for training score-based generative models. *Advances in neural information processing systems*, 33:12438–12448, 2020.
* Yang Song, Sahaj Garg, Jiaxin Shi, and Stefano Ermon. Sliced score matching: A scalable approach to density and score estimation. In *Proceedings of the Uncertainty in Artificial Intelligence*, pages 574–584. PMLR, 2020a.
* Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole. Score-based generative modeling through stochastic differential equations. *arXiv preprint arXiv:2011.13456*, 2020b.
* Yang Song, Liyue Shen, Lei Xing, and Stefano Ermon. Solving inverse problems in medical imaging with score-based generative models. *arXiv preprint arXiv:2111.08005*, 2021.
* Yusuke Tashiro, Jiaming Song, Yang Song, and Stefano Ermon.
## Page 25
### Content
# Appendix

### Table of Contents
**A Proof of Theorem 3.2** **26**
A.1 Key Steps for Proving Theorem 3.2 . . . . . . . . . . . . . . . . . . . . . . . . . . . 26
A.2 Detailed Statements in Steps 1 - 3 and Proof of Theorem 3.2 . . . . . . . . . . 27
A.3 Proof of Proposition A.3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
A.4 Proofs of Lemmas A.4 and A.6 . . . . . . . . . . . . . . . . . . . . . . . . . . . 33
A.5 Proofs of Lemmas A.5 and A.7 . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
A.6 Proofs in Steps 1 and 2 for Theorem 3.2 . . . . . . . . . . . . . . . . . . . . . . . 41
A.7 Proofs of Further Supporting Lemmas . . . . . . . . . . . . . . . . . . . . . . . . 42

**B Proof of Theorem 3.4** **49**
B.1 Key Steps for Proving Theorem 3.4 . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
B.2 Statements of Steps 1 - 3 and Using Them to Prove Theorem 3.4 . . . . . . . . . . 49
B.3 Proofs in Step 3 for Theorem 3.4 . . . . . . . . . . . . . . . . . . . . . . . . . . . 50
B.4 Proofs of Lemmas B.4 and B.6 . . . . . . . . . . . . . . . . . . . . . . . . . . . 52
B.5 Proofs of Lemma B.5 and B.7 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 56
B.6 Proofs of Other Lemmas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57

**C Variants of Score Approximation** **61**
C.1 Extension to Unconditional Score Approximation . . . . . . . . . . . . . . . . . . . 61
C.2 Conditional Score Approximation with Unbounded Label . . . . . . . . . . . . . . 62

**D Proofs for Section 4.1** **65**
D.1 Notation Recap . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
D.2 Proof of Theorem 4.1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66
D.3 Proof for Theorem 4.2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 70
D.4 Proof of Proposition 4.3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 73
D.5 Proof of Proposition 4.5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 73
D.6 Proof for Other Lemmas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 74

**E Proof of Section 5** **79**
E.1 Proof of Proposition 5.2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 79
E.2 Proof of Proposition 5.4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80

**F Basics on ReLU Approximation** **83**
F.1 Construction of a Large ReLU Network . . . . . . . . . . . . . . . . . . . . . . . . 83
F.2 Use ReLU Network to Approximate Basic Operators and Functions . . . . . . . . . 84
F.3 Use ReLU Network to Approximate Functions Related to $t$ . . . . . . . . . . . . . 85
F.4 Omitted Construction Details in the Proof . . . . . . . . . . . . . . . . . . . . . . . 88

25

### Visual Description
Text-only slide.

---

## Page 26
### Content
## A Proof of Theorem 3.2

This section is organized as follows: Appendix A.1 presents the key steps for proving Theorem 3.2. Appendix A.2 lists the detailed statements for proving the key steps and Theorem 3.2. Appendix A.3 shows the key steps for proving the most critical statement (Proposition A.3) mentioned in Appendix A.2. Appendices A.4 and A.5 elaborate on the proof of this statement. Appendix A.6 provides proofs for other statements mentioned in Appendix A.2. Appendix A.7 contains the proofs of further supporting lemmas. Moreover, to further simplify the notations and demonstrate the meaning of $N$ (see the detailed interpretation in Appendix A.4), we replace $N$ by $N^{d+d_y}$ in the statements of Theorem 3.2 without loss of generality. Correspondingly, we redefine $C_\sigma$ as $(d+d_y)C_\sigma$ and $C_\alpha$ as $(d+d_y)C_\alpha$ so that the time $t$ is still within $[N^{-C_\sigma}, C_\alpha \log N]$. By adjusting the constants, our target becomes
$$ \int_{\mathbb{R}^d} \| \mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y}) \|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim \frac{B^2}{\sigma_t^4} N^{-\beta} (\log N)^{d+\beta/2+1}, $$
and the hyperparameters in the network class $\mathcal{F}$ should satisfy
$$ M_t = \mathcal{O}\left(\sqrt{\log N} / \sigma_t^2\right), \quad W = \mathcal{O}\left(N^{d+d_y} \log^7 N\right), $$
$$ \kappa = \exp\left(\mathcal{O}(\log^4 N)\right), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}\left(N^{d+d_y} \log^9 N\right). $$

### A.1 Key Steps for Proving Theorem 3.2
To construct a ReLU network approximation, we rewrite the score function as $\nabla \log p_t(\mathbf{x}|\mathbf{y}) = \frac{\nabla p_t(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})}$. The idea is to approximate $\nabla p_t(\mathbf{x}|\mathbf{y})$ and $p_t(\mathbf{x}|\mathbf{y})$ separately using similar techniques. However, even though the original data density function has Hölder regularity conditions, the diffused density function $p_t(\mathbf{x}|\mathbf{y})$ gives rise to substantial caveats. The first challenge is $\mathbf{x}$ being unbounded, which makes it difficult to derive a uniform approximation of $p_t(\mathbf{x}|\mathbf{y})$. The second challenge is more intricate: $p_t(\mathbf{x}|\mathbf{y})$ can be arbitrarily small so that $1/p_t(\mathbf{x}|\mathbf{y})$ quickly blows up. Consequently, our proof consists of three key steps, where the first two steps carefully address the caveats by proper truncation on domain $\mathbf{x}_t$ and the value of $p(\mathbf{x}|\mathbf{y})$.

**Step 1 (Truncate domain of x).** For any time $t$, we truncate the domain of input $\mathbf{x}$ by an $\ell_\infty$-ball of radius $R$ (to be chosen later in Step 3), that is, we denote $\mathcal{D}_1 = \{\mathbf{x} : \|\mathbf{x}\|_\infty \leq R\}$. On the complement of $\mathcal{D}_1$, we set our score approximation to be uniformly bounded by a constant depending on $R$ and $t$. We prove in Lemma A.1 that this domain truncation induces a small approximation error when the radius $R$ is sufficiently large.

**Step 2 (Truncate the value of $p_t$).** To prevent the explosion of $\nabla \log p_t(\mathbf{x}|\mathbf{y}) = \frac{\nabla p_t(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})}$ when $p_t(\mathbf{x}|\mathbf{y})$ is small, we set a threshold $\epsilon_{\text{low}}$ for $p_t$ and define $\mathcal{D}_2 = \{\mathbf{x} : p_t(\mathbf{x}|\mathbf{y}) \geq \epsilon_{\text{low}}\}$. Analogous to **Step 1**, we also set our approximation to be bounded by the constant we mention in Step 1 on the complement of $\mathcal{D}_2$. We show in Lemma A.2 that focusing on $\mathcal{D}_2$ also induces controllable approximation error.

**Step 3 (ReLU network approximation).** Let $\mathcal{D} = \mathcal{D}_1 \cap \mathcal{D}_2$. We use a ReLU network to approximate $p_t$ and $\nabla p_t$ on $\mathcal{D}$ and subsequently combine the network approximators to construct a score approximation $\mathbf{s}(\mathbf{x}, \mathbf{y}, t)$. We establish an $L_\infty$ approximation error guarantee of $\mathbf{s}$ to $\nabla \log p_t$ on $\mathcal{D}$ in Proposition A.3, building upon the approximation errors of $p_t$ and $\nabla p_t$.

In the sequel, we delve into each step by providing precise statements. We then use them to prove Theorem 3.2. All the supporting results are postponed to Appendices A.3 to A.7.

26

### Visual Description
Text-only slide.

---

## Page 27
### Content
### A.2 Detailed Statements in Steps 1 - 3 and Proof of Theorem 3.2
Now we present crucial results in **Steps 1 - 3** and use them to prove Theorem 3.2.

#### A.2.1 Formal Statements in Steps 1 - 3
This section contains the statements of Lemma A.1, Lemma A.2, and Proposition A.3.

**Lemma A.1 (Truncate x).** Suppose Assumption 3.1 holds. For any $R > 1$, $\mathbf{y}$ and $t > 0$, we have
$$ \int_{\|\mathbf{x}\|_\infty \geq R} p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim R \exp(-C'_2 R^2), \tag{A.1} $$
$$ \int_{\|\mathbf{x}\|_\infty \geq R} \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim \frac{1}{\sigma_t^4} R^3 \exp(-C'_2 R^2), \tag{A.2} $$
where $C'_2 = \frac{C_2}{2 \max(C_2, 1)}$.

The proof of Lemma A.1 is provided in Appendix A.6. Lemma A.1 is a consequence of the light tail in the data distribution. To better interpret, we can set (A.1) to be smaller than $\epsilon > 0$. Then the truncation radius can be chosen as $R = \mathcal{O}(\sqrt{\log 1/\epsilon})$.

Moreover, since the score function can be written as $\nabla \log p_t(\mathbf{x}|\mathbf{y}) = \frac{\nabla p_t(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})}$, its magnitude will be difficult to control when the density function $p_t(\mathbf{x}|\mathbf{y})$ is extremely small. Thus, we also truncate $p_t(\mathbf{x}|\mathbf{y})$ as stated in the following result.

**Lemma A.2 (Truncate $p(\mathbf{x}|\mathbf{y})$).** Suppose Assumption 3.1 holds. For any $R > 0$, $\mathbf{y}$ and $\epsilon_{\text{low}} > 0$, we have
$$ \int_{\|\mathbf{x}\|_\infty \leq R} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| < \epsilon_{\text{low}} \} p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim R^d \epsilon_{\text{low}}, \tag{A.3} $$
$$ \int_{\|\mathbf{x}\|_\infty \leq R} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| < \epsilon_{\text{low}} \} \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim \frac{\epsilon_{\text{low}}}{\sigma_t^4} R^{d+2}, \tag{A.4} $$

The proof of Lemmas A.2 is provided in Appendix A.6. Note that Lemma A.2 concerns the truncated domain $\mathcal{D}_1$. Combining Lemmas A.1 and A.2 controls the truncation error when restricting approximation to the domain $\mathcal{D}$. Accordingly, we provide an approximation theory on $\mathcal{D}$, with properly chosen $R$ and $\epsilon_{\text{low}}$.

**Proposition A.3 (Approximate the score).** Suppose Assumption 3.1 holds. We consider time $t \in [N^{-C_\sigma}, C_\alpha \log N]$ for constants $C_\sigma$ and $C_\alpha$. Given any integer $N > 0$, we constrain $(\mathbf{x}, \mathbf{y}) \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d \times [0, 1]^{d_y}$, where $C_x$ is a constant depending on $d, \beta, B, C_1$ and $C_2$. Then there exists a ReLU neural network class $\mathcal{F}(M_t, W, \kappa, L, K)$ which contains a mapping $\mathbf{s}(\mathbf{x}, \mathbf{y}, t)$ satisfying
$$ p_t(\mathbf{x}|\mathbf{y}) \|\nabla \log p_t(\mathbf{x}|\mathbf{y}) - \mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty \lesssim \frac{B}{\sigma_t^2} N^{-\beta} (\log N)^{\frac{d+s+1}{2}} \text{ for any } t \in [N^{-C_\sigma}, C_\alpha \log N]. \tag{A.5} $$
Furthermore, the neural network hyperparameters satisfy
$$ M_t = \mathcal{O}\left(\sqrt{\log N} / \sigma_t^2\right), \quad W = \mathcal{O}\left(N^{d+d_y} \log^7 N\right), \tag{A.6} $$
$$ \kappa = \exp\left(\mathcal{O}(\log^4 N)\right), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}\left(N^{d+d_y} \log^9 N\right). \tag{A.7} $$

27

### Visual Description
Text-only slide.

---

## Page 28
### Content
The proof of Proposition A.3 is rather involved and is deferred to Appendix A.3. Proposition A.3 confirms that the score function can be approximated on $[-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d \times [0, 1]^{d_y}$ in the $L_\infty$ sense, which is an essential ingredient in the proof of Theorem 3.2. Meanwhile, we observe that the approximation error depends on the Hölder index $\beta$ of the data distribution. Thus, when $\beta$ is large, approximation is relatively easy. Moreover, the approximation error increases, as $t$ decreases as $\sigma_t$ shrinks to 0.

#### A.2.2 Proof of Theorem 3.2
*Proof.* Given Proposition A.3, we claim that the resulting $\mathbf{s}(\mathbf{x}, \mathbf{y}, t) \in \mathcal{F}$ is an $L_2$ approximator of the score function. In this regard, we reduce the proof of Theorem 3.2 to the verification of this claim. Indeed, choosing $R = C_x \sqrt{\log N} = \sqrt{\frac{2\beta}{C'_2} \log N}$ and $\epsilon_{\text{low}} = C_3 N^{-\beta} (\log N)^{\frac{d+s}{2}}$, we decompose the $L_2$ score approximation error as
$$ \int_{\mathbb{R}^d} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} $$
$$ = \underbrace{\int_{\|\mathbf{x}\|_\infty > \sqrt{\frac{2\beta}{C'_2} \log N}} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x}}_{(\mathbf{A}_1)} $$
$$ + \underbrace{\int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| < \epsilon_{\text{low}} \} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x}}_{(\mathbf{A}_2)} $$
$$ + \underbrace{\int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| \geq \epsilon_{\text{low}} \} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x}}_{(\mathbf{A}_3)}. $$
Here $(\mathbf{A}_1)$ is the truncation error due to the unbounded range of $\mathbf{x}$; $(\mathbf{A}_2)$ is the truncation error due to small $p_t(\mathbf{x}|\mathbf{y})$. The remaining $(\mathbf{A}_3)$ is the approximation error of $\mathbf{s}(\mathbf{x}, \mathbf{y}, t)$ on $\mathcal{D}$. We will bound the three terms separately.

**Bounding $(\mathbf{A}_1)$.** According to Proposition A.3, we have $\|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty \lesssim \frac{\sqrt{\log N}}{\sigma_t^2}$ and thus
$$ (\mathbf{A}_1) \leq 2 \int_{\|\mathbf{x}\|_\infty > \sqrt{\frac{2\beta}{C'_2} \log N}} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} + 2 \int_{\|\mathbf{x}\|_\infty > \sqrt{\frac{2\beta}{C'_2} \log N}} \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} $$
$$ \stackrel{(i)}{\lesssim} 2d \left( \frac{1}{\sigma_t^2} \sqrt{\log N} \right)^2 \int_{\|\mathbf{x}\|_\infty > \sqrt{\frac{2\beta}{C'_2} \log N}} p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} + \frac{2}{\sigma_t^4} \left( \frac{2\beta}{C'_2} \log N \right)^{3/2} N^{-2\beta} $$
$$ \stackrel{(ii)}{\lesssim} 2d \left( \frac{1}{\sigma_t^2} \sqrt{\log N} \right)^2 \left( \frac{2\beta}{C'_2} \log N \right)^{1/2} N^{-2\beta} + \frac{2}{\sigma_t^4} \left( \frac{2\beta}{C'_2} \log N \right)^{3/2} N^{-2\beta} $$
$$ \lesssim \frac{N^{-2\beta} (\log N)^{3/2}}{\sigma_t^4}. $$
Here in $(i)$, we invoke the upper bound $\|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_2^2 \leq d \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty^2$, (A.2) in Lemma A.1, and inequality $(ii)$ follows from (A.1) in Lemma A.1.

28

### Visual Description
Text-only slide.

---

## Page 29
### Content
**Bounding $(\mathbf{A}_2)$.** Analogous to $(\mathbf{A}_1)$, we have
$$ (\mathbf{A}_2) \leq \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| < \epsilon_{\text{low}} \} \left( d \left( \frac{1}{\sigma_t^2} \sqrt{\log N} \right)^2 + \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 \right) p_t(\mathbf{x}|\mathbf{y}) $$
$$ \stackrel{(i)}{\lesssim} d \left( \frac{1}{\sigma_t^2} \sqrt{\log N} \right)^2 \left( \frac{2\beta}{C'_2} \log N \right)^{d/2} \epsilon_{\text{low}} + \frac{\epsilon_{\text{low}}}{\sigma_t^4} \left( \frac{2\beta}{C'_2} \log N \right)^{1+d/2} $$
$$ \lesssim \frac{\epsilon_{\text{low}} (\log N)^{1+d/2}}{\sigma_t^4}, $$
where inequality $(i)$ invokes (A.3) and (A.4) in Lemma A.2.

**Bounding $(\mathbf{A}_3)$.** By the approximation guarantee (A.5) in Proposition A.3, we immediately have
$$ (\mathbf{A}_3) \leq \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| \geq \epsilon_{\text{low}} \} d \|\nabla \log p_t(\mathbf{x}, \mathbf{y}, t) - \mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} $$
$$ = \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| \geq \epsilon_{\text{low}} \} \frac{d \|\nabla \log p_t(\mathbf{x}, \mathbf{y}, t) - \mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_\infty^2 p_t^2(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})} d\mathbf{x} $$
$$ \stackrel{(i)}{\lesssim} \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| \geq \epsilon_{\text{low}} \} \frac{B^2}{\sigma_t^4} N^{-2\beta} (\log N)^{d+s+1} \frac{d}{p_t(\mathbf{x}|\mathbf{y})} d\mathbf{x} $$
$$ = \frac{B^2 d}{\sigma_t^4 \epsilon_{\text{low}}} N^{-2\beta} (\log N)^{d+s+1} \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \mathbf{1}\{ |p_t(\mathbf{x}|\mathbf{y})| \geq \epsilon_{\text{low}} \} \frac{\epsilon_{\text{low}}}{p_t(\mathbf{x}|\mathbf{y})} d\mathbf{x} $$
$$ \leq \frac{B^2 d}{\sigma_t^4 \epsilon_{\text{low}}} N^{-2\beta} (\log N)^{d+s+1} \left( \frac{2\beta}{C'_2} \log N \right)^{d/2} $$
$$ \lesssim \frac{B^2 d}{\sigma_t^4 \epsilon_{\text{low}}} N^{-2\beta} (\log N)^{3d/2+s+1}, $$
where we invoke (A.5) in $(i)$.

Combining the bounds of $(\mathbf{A}_1)$, $(\mathbf{A}_2)$ and $(\mathbf{A}_3)$ together, we have
$$ \int_{\mathbb{R}^d} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} $$
$$ \lesssim \frac{N^{-2\beta} (\log N)^{3/2} + \epsilon_{\text{low}} (\log N)^{1+d/2} + B^2 d \epsilon_{\text{low}}^{-1} N^{-2\beta} (\log N)^{d+s+1}}{\sigma_t^4}. $$
Substitute $\epsilon_{\text{low}} = C_3 N^{-\beta} (\log N)^{\frac{d+s}{2}}$ into the display above, the $L_2$ approximation error is bounded by
$$ \mathcal{O}\left( \frac{B^2}{\sigma_t^4} N^{-\beta} (\log N)^{\frac{d+s}{2}+1} \right) = \mathcal{O}\left( \frac{B^2}{\sigma_t^4} N^{-\beta} (\log N)^{d+\frac{\beta}{2}+1} \right). $$
Overloading $N$ by $N^{\frac{1}{d+d_y}}$, we complete the proof. $\square$

### A.3 Proof of Proposition A.3
Proposition A.3 is the crux in proving Theorem 3.2, which constructs the so-called "**diffused local monomials**" for approximating the score function. Recall that we rewrite the score function

29

### Visual Description
Text-only slide.

---

## Page 30
### Content
as $\frac{\nabla p_t(\mathbf{x}|\mathbf{y})}{p_t(\mathbf{x}|\mathbf{y})}$. A naïve approach is to approximate $\nabla p_t(\mathbf{x}|\mathbf{y})$ and $p_t(\mathbf{x}|\mathbf{y})$ using local polynomials. However, we observe that $p_t$ is indexed by time $t$, which creates extra difficulty in devising a proper local polynomial approximation for all $t$. Our diffused local monomials are proposed analogously to local Taylor polynomial bases, with the capability to approximate the target score function indexed by $t$. As a side product, the proof for Proposition A.3 directly verifies Lemmas A.1 and A.2.

#### A.3.1 Key Steps for Proving Proposition A.3
The crest of the proof is the use of a set of **diffused local polynomials** as the basis functions to approximate the integral form of $p_t(\mathbf{x}|\mathbf{y})$ and $\nabla p_t(\mathbf{x}|\mathbf{y})$. To motivate the diffused local polynomials, we repeat the integral form of $p_t(\mathbf{x}|\mathbf{y})$ as follows,
$$ p_t(\mathbf{x}|\mathbf{y}) = \int_{\mathbb{R}^d} p(\mathbf{z}|\mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp\left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}. \tag{A.8} $$
Now we first construct Taylor expansions of the density function $p(\mathbf{z}|\mathbf{y})$ and the Gaussian kernel $\exp\left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right)$, denoted as $h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y})$ and $h_{\text{Taylor}}^{\text{kernel}}(\mathbf{z}, \mathbf{x}, t)$, respectively. We define diffused local polynomials as
$$ \text{Diffused-local-poly}(\mathbf{x}, \mathbf{y}, t) = \int_{\mathbb{R}^d} \frac{1}{\sigma_t^d (2\pi)^{d/2}} h_{\text{Taylor}}^{\text{density}}(\mathbf{z}, \mathbf{y}) h_{\text{Taylor}}^{\text{kernel}}(\mathbf{z}, \mathbf{x}, t) d\mathbf{z}. $$
Roughly speaking, diffused local polynomials can be viewed as evolving a Taylor approximation of the data distribution along the forward diffusion process. As Taylor polynomials can well approximate Hölder densities, we expect
## Page 33
### Content
![Figure 2: The network architecture of $f_3^{\text{ReLU}}$.](figure2.png)

Figure 2: The network architecture of $\mathbf{f}_3^{\text{ReLU}}$. We implement all the components of $\mathbf{f}_3$ ($f_1, \mathbf{f}_2$ and $\sigma_t$) through ReLU networks and combine them using the ReLU-approximated operators (*product*, *inverse (reciprocal)* and *entrywise-min*) to express $\mathbf{f}_3$ according to its definition in (A.14).

Here $\mathbf{f}_3$ is defined as
$$ \mathbf{f}_3(\mathbf{x}, \mathbf{y}, t) = \min \left( \frac{\mathbf{f}_2}{\sigma_t f_{1,\text{clip}}}, \frac{C_5}{\sigma_t^2} (C_x \sqrt{d \log N} + 1) \right). \tag{A.14} $$

Now we construct a ReLU network $\mathbf{f}_3^{\text{ReLU}}$ to implement $\mathbf{f}_3$. The majority of the network utilizes the network constructed in Lemmas A.5 and A.7. However, to facilitate the implementation, we also need to implement some basic operations using ReLU networks, namely, the inverse function, the product function, $\sigma_t$ as a function of $t$, and an entrywise minimization operator. With these ingredients, our constructed network architecture is depicted in Figure 2. Details about how to determine the network size and the error propagation are deferred to Appendix F.4.1.

From the construction in the figure and the hyperparameter configuration in Lemma A.5 and A.7, we can obtain a ReLU network $\mathcal{F}(M_t, W, \kappa, L, K)$ with
$$ M_t = \mathcal{O}\left(\sqrt{\log N} / \sigma_t^2\right), \quad W = \mathcal{O}\left(N^{d+d_y} \log^7 N\right), $$
$$ \kappa = \exp\left(\mathcal{O}(\log^4 N)\right), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}\left(N^{d+d_y} \log^9 N\right). $$

This network contains $\mathbf{f}_3^{\text{ReLU}}$ such that for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$,
$$ \|\mathbf{f}_3^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) - \mathbf{f}_3(\mathbf{x}, \mathbf{y}, t)\|_\infty \leq N^{-\beta}. \tag{A.15} $$

Thus, we have
$$ \|\nabla \log p_t(\mathbf{x}|\mathbf{y}) - \mathbf{f}_3^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t)\|_\infty \lesssim \frac{B}{\sigma_t^2 p_t(\mathbf{x}|\mathbf{y})} N^{-\beta} (\log N)^{\frac{d+s+1}{2}}. $$

We complete our proof. $\square$

### A.4 Proofs of Lemmas A.4 and A.6
To prove the lemma, we first need some properties of the density function $p_t(\mathbf{x}|\mathbf{y})$ and the score function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$.

### Visual Description
The page features a diagram (Figure 2) illustrating the network architecture of $\mathbf{f}_3^{\text{ReLU}}$. The diagram shows a flow of operations: inputs like $f_1^{\text{ReLU}}$, $f_2^{\text{ReLU}}$, and $\sigma_t^{\text{ReLU}}$ pass through various blocks labeled 'Inverse', 'Product', 'Max', 'Square', 'Rescale by', and 'Entrywise min' to finally produce $\mathbf{f}_3^{\text{ReLU}}$. Mathematical definitions and hyperparameter bounds for the network are provided below the figure.

---

## Page 34
### Content
**Lemma A.8 (Clip the integral).** Under Assumption 3.1, for any $\mathbf{v} \in \mathbb{Z}_+^d$ with $\|\mathbf{v}\|_1 \leq n$. There exists a constant $C(n, d) \geq 1$ such that for any $\mathbf{x}$ and $0 < \epsilon \leq \frac{1}{e}$, it holds that
$$ \int_{\mathbb{R}^d \setminus \mathbf{B}_x} \left\| \frac{\alpha_t \mathbf{z} - \mathbf{x}}{\sigma_t} \right\|^{\mathbf{v}} p(\mathbf{z}|\mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \leq \epsilon, $$
where
$$ \mathbf{B}_x = \left[ \frac{\mathbf{x} - \sigma_t C(n, d) \sqrt{\log \epsilon^{-1}}}{\alpha_t}, \frac{\mathbf{x} + \sigma_t C(n, d) \sqrt{\log \epsilon^{-1}}}{\alpha_t} \right] \cap [-C(n, d) \sqrt{\log \epsilon^{-1}}, C(n, d) \sqrt{\log \epsilon^{-1}}]. \tag{A.16} $$
The proof of the lemma is provided in Appendix A.7.1. Besides, we need to bound the density and the gradient of density.

**Lemma A.9.** Under Assumption 3.1, there exists a constant $C_4$ such that the diffused density function $p_t(\mathbf{x}|\mathbf{y})$ can be bounded as:
$$ \frac{C_4}{\sigma_t^d} \exp \left( -\frac{\|\mathbf{x}\|^2 + 1}{\sigma_t^2} \right) \leq p_t(\mathbf{x}|\mathbf{y}) \leq \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \tag{A.17} $$
and the gradient can be bounded as
$$ \|\nabla p_t(\mathbf{x}, \mathbf{y})\|_\infty \leq \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \left( \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} + \frac{C_2 \|\mathbf{x}\|_\infty}{\alpha_t^2 + C_2 \sigma_t^2} \right). \tag{A.18} $$
The proof is provided in Appendix A.7.2. Moreover, we can bound the score function.

**Lemma A.10.** Under Assumption 3.1, there exists a constant $C_5$ such that the score function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$ can be bounded as:
$$ \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_\infty \leq \frac{C_5}{\sigma_t^2} (\|\mathbf{x}\| + 1). \tag{A.19} $$
The proof is provided in Appendix A.7.3. With all the previous lemmas, we begin to prove Lemma A.4.

*Proof of Lemma A.4.* The main idea of the proof is to approximate the integral form of $p_t(\mathbf{x}|\mathbf{y})$, which can be presented as
$$ p_t(\mathbf{x}|\mathbf{y}) = \int_{\mathbb{R}^d} \underbrace{p(\mathbf{z}|\mathbf{y})}_{\text{Step (ii)}} \underbrace{\frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right)}_{\text{Step (iii)}} d\mathbf{z}. \tag{A.20} $$
We prove the lemma in the following steps:
**Step (i) (Clip the domain)** We first truncate the integral of $p_t(\mathbf{x}, \mathbf{y})$ in a bounded region using Lemma A.8.
**Step (ii) (Approximate $p(\cdot)$ )** We approximate the initial distribution function $p(\mathbf{x}|\mathbf{y})$ using local polynomials in the bounded region, which fully utilizes the Hölder smoothness.

### Visual Description
Text-only slide.

---

## Page 35
### Content
**Step (iii) (Approximate $\exp(\cdot)$ )** We approximate the exponential function in the integrand by polynomials using Taylor expansion.

Combining **Steps (ii)** and **(iii)**, we can approximate the whole integrand by a polynomial, so $p_t$ can be approximated by a diffused polynomial. Now we begin our formal proof.

$\bullet$ **Step (i)** We approximate $p_t(\mathbf{x}|\mathbf{y})$ by an integral on a bounded domain using Lemma A.8. We denote the integral by
$$ f_2(\mathbf{x}, \mathbf{y}, t) = \int_{\mathbf{B}_{\mathbf{x},N}} p(\mathbf{z}|\mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}, \tag{A.21} $$
where we take
$$ \mathbf{B}_{\mathbf{x},N} = \left[ \frac{\mathbf{x} - \sigma_t C(0, d) \sqrt{\beta \log N}}{\alpha_t}, \frac{\mathbf{x} + \sigma_t C(0, d) \sqrt{\beta \log N}}{\alpha_t} \right] \cap [-C(0, d) \sqrt{\beta \log N}, C(0, d) \sqrt{\beta \log N}]. \tag{A.22} $$
Thus, we have
$$ |f_2(\mathbf{x}, \mathbf{y}, t) - p_t(\mathbf{x}, \mathbf{y}, t)| \leq N^{-\beta}, \text{ for any } \mathbf{x} \in \mathbb{R}^d, \mathbf{y} \in [0, 1]^{d_y}. \tag{A.23} $$

**Understanding $N$** The integer parameter $N$ represents the number of segments into which each axis of the bounded domain $\mathbf{B}_{\mathbf{x},N} \times [0, 1]^{d_y}$ is subdivided. Consequently, employing $N$ subdivisions along each of the $d+d_y$ dimensions results in $N^{d+d_y}$ hypercubes covering the entire domain. Each of these hypercubes serves as a localized region where a Taylor polynomial is employed to approximate the function within that specific region. The choice of $N$ plays a crucial role in the accuracy of the following approximation scheme.

$\bullet$ **Step (ii)** Then we approximate $p(\mathbf{z}|\mathbf{y})$ on this bounded region using local polynomials. We take $R = 2C(0, d) \sqrt{\beta \log N}$ and denote
$$ f(\mathbf{x}, \mathbf{y}) = p(R(\mathbf{x} - 1/2)|\mathbf{y}), \text{ for } \mathbf{x} \in [0, 1]^d \text{ and } \mathbf{y} \in [0, 1]^{d_y}. \tag{A.24} $$
By assumption 3.1, we know that $\|f\|_{\mathcal{H}^\beta([0,1]^{d+d_y})} \leq BR^s$. To implement the local polynomial approximation technique, we define $\phi$ as a trapezoid function:
$$ \phi(a) = \begin{cases} 1 & |a| < 1, \\ 2 - |a| & |a| \in [1, 2], \\ 0 & |a| > 2. \end{cases} \tag{A.25} $$
The trapezoid function is commonly used in the construction of continuous approximators of target functions [Chen et al., 2022a]. Now we consider the following local polynomials
$$ q(\mathbf{x}, \mathbf{y}) = \sum_{\mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y}} \psi_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) P_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) \tag{A.26} $$
where
$$ P_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) = \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 \leq s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=\frac{\mathbf{v}}{N}, \mathbf{y}=\frac{\mathbf{w}}{N}} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} $$

### Visual Description
Text-only slide.

---

## Page 36
### Content
is the $s$-order Taylor polynomial of $f(\mathbf{x}, \mathbf{y})$ at the point $(\frac{\mathbf{v}}{N}, \frac{\mathbf{w}}{N})$, and
$$ \psi_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) = \mathbf{1} \left\{ \mathbf{x} \in \left( \frac{\mathbf{v}-1}{N}, \frac{\mathbf{v}}{N} \right] \right\} \prod_{j=1}^{d_y} \phi \left( 3N \left( y_j - \frac{w_j}{N} \right) \right) $$
can be seen as an indicator function supported on the neighbor of the point. To be specific, $\psi_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) \neq 0$ if and only if $\mathbf{x} \in (\frac{\mathbf{v}-1}{N}, \frac{\mathbf{v}}{N}]$ and $\mathbf{y} \in [\frac{\mathbf{w}-2/3}{N}, \frac{\mathbf{w}+2/3}{N}]$, so the $L_\infty$ distance between $[\mathbf{x}, \mathbf{y}]$ and $[\frac{\mathbf{v}}{N}, \frac{\mathbf{w}}{N}]$ is at most $\frac{1}{N}$. Moreover, by Taylor expansion, there exist $\boldsymbol{\theta} \in [0, 1]^d$ and $\boldsymbol{\theta}' \in [0, 1]^{d_y}$ such that
$$ f(\mathbf{x}, \mathbf{y}) = \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 < s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=\frac{\mathbf{v}}{N}, \mathbf{y}=\frac{\mathbf{w}}{N}} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} $$
$$ + \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 = s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=(1-\boldsymbol{\theta})\frac{\mathbf{v}}{N} + \boldsymbol{\theta}\mathbf{x}, \mathbf{y}=(1-\boldsymbol{\theta}')\frac{\mathbf{w}}{N} + \boldsymbol{\theta}'\mathbf{y}} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'}. $$
Thus, we have
$$ |P_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) - f(\mathbf{x}, \mathbf{y})| $$
$$ = \left| \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 = s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=\frac{\mathbf{v}}{N}, \mathbf{y}=\frac{\mathbf{w}}{N}} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} \right. $$
$$ \left. - \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 = s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=(1-\boldsymbol{\theta})\frac{\mathbf{v}}{N} + \boldsymbol{\theta}\mathbf{x}, \mathbf{y}=(1-\boldsymbol{\theta}')\frac{\mathbf{w}}{N} + \boldsymbol{\theta}'\mathbf{y}} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} \right| $$
$$ \leq \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 = s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \left( \mathbf{x} - \frac{\mathbf{v}}{N} \right)^{\mathbf{n}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} B R^s \left\| [\boldsymbol{\theta}\mathbf{x}, \boldsymbol{\theta}'\mathbf{y}] - \frac{[\boldsymbol{\theta}\mathbf{v}, \boldsymbol{\theta}'\mathbf{w}]}{N} \right\|_\infty^\gamma $$
$$ \leq \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 = s} \frac{B R^s}{\mathbf{n}! \mathbf{n}'! N^{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 + \gamma}} = \frac{B R^s (d + d_y)^s}{s! N^\beta}, $$
Combining the result above with the fact that $\sum_{\mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y}} \psi_{\mathbf{v}, \mathbf{w}}(\mathbf{x}, \mathbf{y}) = 1$ for any $\mathbf{x} \in (0, 1]^d$ and $\mathbf{y} \in [0, 1]^{d_y}$, we claim that $q(\mathbf{x}, \mathbf{y})$ is an approximation to $f(\mathbf{x}, \mathbf{y})$ which satisfies
$$ |f(\mathbf{x}, \mathbf{y}) - q(\mathbf{x}, \mathbf{y})| \leq B \frac{R^s (d + d_y)^s}{s! N^\beta}, \forall \mathbf{x} \in (0, 1]^d, \mathbf{y} \in [0, 1]^{d_y}. \tag{A.27} $$

### Visual Description
Text-only slide.

---

## Page 37
### Content
Now we replace $p(\mathbf{z}|\mathbf{y})$ by $q\left(\frac{\mathbf{z}}{R} + 1/2, \mathbf{y}\right)$ in (A.21) and define
$$ f_3(\mathbf{x}, \mathbf{y}, t) = \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int_{\mathbf{B}_{\mathbf{x},N}} q\left(\frac{\mathbf{z}}{R} + 1/2, \mathbf{y}\right) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z} $$
$$ = \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int_{\mathbf{B}_{\mathbf{x},N}} \sum_{\mathbf{v} \in [N]^d} \psi_{\mathbf{v}, \mathbf{w}}\left(\frac{\mathbf{z}}{R} + 1/2, \mathbf{y}\right) P_{\mathbf{v}, \mathbf{w}}\left(\frac{\mathbf{z}}{R} + 1/2, \mathbf{y}\right) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z} $$
$$ = \sum_{\mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y}} \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n}'\|_1 \leq s} \frac{1}{\mathbf{n}! \mathbf{n}'!} \frac{\partial^{\mathbf{n}+\mathbf{n}'} f}{\partial \mathbf{x}^{\mathbf{n}} \partial \mathbf{y}^{\mathbf{n}'}} \bigg|_{\mathbf{x}=\frac{\mathbf{v}}{N}, \mathbf{y}=\frac{\mathbf{w}}{N}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n}'} \prod_{j=1}^{d_y} \phi \left( 3N \left( y_j - \frac{w_j}{N} \right) \right) $$
$$ \cdot \prod_{i=1}^d \frac{1}{\sigma_t (2\pi)^{1/2}} \int \left( \frac{z_i}{R} + 1/2 - \frac{v_i}{N} \right)^{n_i} \exp \left( -\frac{(x_i - \alpha_t z_i)^2}{2\sigma_t^2} \right) dz_i. $$
The domain of the integral
$$ \int \left( \frac{z_i}{R} + 1/2 - \frac{v_i}{N} \right)^{n_i} \exp \left( -\frac{(x_i - \alpha_t z_i)^2}{2\sigma_t^2} \right) dz_i $$
is
$$ B_{v_i, n_i, x_i} := \left[ \left( \frac{v_i - 1}{N} - 1/2 \right) R, \left( \frac{v_i}{N} - 1/2 \right) R \right] \cap \left[ \frac{x_i - \sigma_t C(0, d) \sqrt{\beta \log N}}{\alpha_t}, \frac{x_i + \sigma_t C(0, d) \sqrt{\beta \log N}}{\alpha_t} \right]. \tag{A.28} $$
Now we bound the difference between $f_2$ and $f_3$. By (A.27), we have
$$ |f_3(\mathbf{x}, \mathbf{y}, t) - f_2(\mathbf{x}, \mathbf{y}, t)| = \left| \int_{\mathbf{B}_{\mathbf{x},N}} \left( p(\mathbf{z}|\mathbf{y}) - q\left(\frac{\mathbf{z}}{R} + 1/2, \mathbf{y}\right) \right) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \right| $$
$$ \lesssim \int_{\mathbf{B}_{\mathbf{x},N}} \frac{B R^s}{N^\beta} \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z} $$
$$ \leq \frac{B R^s}{N^\beta} \int_{\mathbb{R}^d} \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \lesssim \frac{B N^{-\beta} \log^{s/2} N}{\alpha_t^d}. $$
At the same time, we have
$$ |f_3(\mathbf{x}, \mathbf{y}, t) - f_2(\mathbf{x}, \mathbf{y}, t)| \lesssim \int_{\mathbf{B}_{\mathbf{x},N}} \frac{B R^s}{N^\beta} \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z} $$
$$ \leq \frac{B R^s}{N^\beta} \frac{m(\mathbf{B}_{\mathbf{x},N})}{\sigma_t^d (2\pi)^{d/2}} \lesssim \frac{B N^{-\beta} \log^{\frac{s+d}{2}} N}{\sigma_t^d}, \tag{A.29} $$

### Visual Description
Text-only slide.

---

## Page 38
### Content
where $m(\mathbf{B}_{\mathbf{x},N})$ is the Lebesgue measure of $\mathbf{B}_{\mathbf{x},N}$ in $\mathbb{R}^d$. Taking the minimum gives rise to
$$ |f_3(\mathbf{x}, \mathbf{y}, t) - f_2(\mathbf{x}, \mathbf{y}, t)| \lesssim B \min \left( \frac{1}{\sigma_t^d}, \frac{1}{\alpha_t^d} \right) N^{-\beta} \log^{\frac{d+s}{2}} N \lesssim B N^{-\beta} \log^{\frac{d+s}{2}} N. $$

$\bullet$ **Step (iii)** Next, we approximate $\exp \left( -\frac{|x_i - \alpha_t z_i|^2}{2\sigma_t^2} \right)$ using Taylor expansions. By the choice of $\mathbf{B}_{\mathbf{x},N}$, we know that $\left| \frac{x_i - \alpha_t z_i}{\sigma_t} \right| \leq C(0, d) \sqrt{\beta \log N}$ for any $i \in [d]$ and $\mathbf{z} \in \mathbf{B}_{\mathbf{x},N}$. Thus, by Taylor expansions we have
$$ \left| \exp \left( -\
## Page 41
### Content
together using $f_{\text{mult}}$ in Lemma F.5 to get a series of ReLU network functions
$$\mathcal{D}^{\text{ReLU}} = \left\{ \Phi_{\mathbf{n,n',v,w}}^{\text{ReLU}} : \|\mathbf{n}\| + \|\mathbf{n'}\| \le s, \mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y} \right\}$$
such that
$$|\Phi_{\mathbf{n,n',v,w}}(\mathbf{x, y}, t) - \Phi_{\mathbf{n,n',v,w}}^{\text{ReLU}}(\mathbf{x, y}, t)| \le \frac{s!\epsilon}{(d + d_y)^s R^s N^{d+d_y}},$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$ to approximate $\Phi_{\mathbf{n,n',v,w}}$. Details about how to determine the network size and the error propagation are deferred to Appendix F.4.5.

At last, we derive a linear combination of these ReLU network functions in $\mathcal{D}^{\text{ReLU}}$ to get an approximation for $f_1$, which is presented as
$$f_1^{\text{ReLU}}(\mathbf{x, y}, t) = \sum_{\mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y}} \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n'}\|_1 \le s} \frac{R^{\|\mathbf{n}\|_1}}{\mathbf{n!n'!}} \left. \frac{\partial^{\mathbf{n+n'}} p}{\partial \mathbf{x^n} \partial \mathbf{y^{n'}}} \right|_{\mathbf{x}=R(\frac{\mathbf{v}}{N} - \frac{1}{2}), \mathbf{y}=\frac{\mathbf{w}}{N}} \Phi_{\mathbf{n,n',v,w}}^{\text{ReLU}}(\mathbf{x, y}, t).$$

From the choice of hyperparameters in Lemma A.12 and our process of constructing these ReLU network functions above, we know that $f_1^{\text{ReLU}}(\mathbf{x, y}, t) \in \mathcal{F}(W, \kappa, L, K)$ with
$$W = \mathcal{O}\left(N^{d+d_y}(\log^7 N + \log N \log^3 \epsilon^{-1})\right), \quad \kappa = \exp\left(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})\right),$$
$$L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), \quad K = \mathcal{O}\left(N^{d+d_y}(\log^9 N + \log N \log^3 \epsilon^{-1})\right).$$
and satisfies that for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$,
$$|f_1(\mathbf{x, y}, t) - f_1^{\text{ReLU}}(\mathbf{x, y}, t)| \le \sum_{\mathbf{v} \in [N]^d, \mathbf{w} \in [N]^{d_y}} \sum_{\|\mathbf{n}\|_1 + \|\mathbf{n'}\|_1 \le s} \frac{R^{\|\mathbf{n}\|_1}}{\mathbf{n!n'|}} \cdot \frac{s!\epsilon}{(d + d_y)^s R^s N^{d+d_y}}$$
$$\le \frac{(d + d_y)^s R^s N^{d+d_y}}{s!} \cdot \frac{s!\epsilon}{(d + d_y)^s R^s N^{d+d_y}} = \epsilon.$$
The proof is complete. $\square$

### A.6 Proofs in Steps 1 and 2 for Theorem 3.2
#### A.6.1 Proof of Lemma A.1
*Proof.* By applying Lemmas A.9 and A.10, we have
$$\int_{\|\mathbf{x}\| \ge R} \|\nabla \log p_t(\mathbf{x|y})\|^2 p_t(\mathbf{x|y}) d\mathbf{x}$$
$$\lesssim \frac{C_5^2}{\sigma_t^4} \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \int_{\|\mathbf{x}\| \ge R} (\|\mathbf{x}\|_2^2 + 1) \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{x}$$
$$\lesssim \frac{1}{\sigma_t^4} \left( \frac{R^3}{3(\alpha_t^2 + C_2 \sigma_t^2)^{3/2}} + \frac{R}{(\alpha_t^2 + C_2 \sigma_t^2)^{1/2}} \right) \exp \left( \frac{-C_2 R^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right)$$
$$\lesssim \frac{1}{\sigma_t^4} R^3 \exp(-C'_2 R^2),$$

### Visual Description
Text-only slide.

---

## Page 42
### Content
where $C'_2 = \min_{t>0} \frac{C_2}{2(\alpha_t^2 + C_2 \sigma_t^2)} = \frac{C_2}{2 \max(C_2, 1)}$. Similarly, we have
$$\int_{\|\mathbf{x}\| \ge R} p_t(\mathbf{x|y}) d\mathbf{x} \lesssim \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \int_{\|\mathbf{x}\| \ge R} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{x}$$
$$\lesssim \frac{R}{(\alpha_t^2 + C_2 \sigma_t^2)^{1/2}} \exp \left( \frac{-C_2 R^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right)$$
$$\lesssim R \exp(-C'_2 R^2).$$
The proof is complete. $\square$

#### A.6.2 Proof of Lemma A.2.
*Proof.* By Lemma A.10, for any $\epsilon_{\text{low}} > 0$ we have
$$\int_{\|\mathbf{x}\|_\infty \le R} \mathbf{1} \{|p_t(\mathbf{x|y})| < \epsilon_{\text{low}}\} \|\nabla \log p_t(\mathbf{x|y})\|^2 p_t(\mathbf{x|y}) d\mathbf{x}$$
$$\le \int_{\|\mathbf{x}\|_\infty \le R} \epsilon_{\text{low}} \|\nabla \log p_t(\mathbf{x|y})\|^2 d\mathbf{x}$$
$$\le \int_{\|\mathbf{x}\|_\infty \le R} \epsilon_{\text{low}} \left( \frac{C_5}{\sigma_t^2} (\|\mathbf{x}\| + 1) \right)^2 d\mathbf{x}$$
$$\lesssim \frac{\epsilon_{\text{low}}}{\sigma_t^4} R^{d+2}.$$
and
$$\int_{\|\mathbf{x}\|_\infty \le R} \mathbf{1} \{|p_t(\mathbf{x|y})| < \epsilon_{\text{low}}\} p_t(\mathbf{x|y}) d\mathbf{x} \le \int_{\|\mathbf{x}\|_\infty \le R} \epsilon_{\text{low}} d\mathbf{x} \lesssim R^d \epsilon_{\text{low}}.$$
The proof is complete. $\square$

### A.7 Proofs of Further Supporting Lemmas
In this section, we will prove Lemmas A.8, A.9, A.10 and A.12.

#### A.7.1 Proof of Lemma A.8
*Proof.* We first decompose the domain of integration $\mathbb{R}^d \setminus \mathbf{B_x}$ into a cartesian product of $d$ univariate domains. We define
$$B_x^i = \left[ \frac{x_i - \sigma_t C(n, d) \sqrt{\log \epsilon^{-1}}}{\alpha_t}, \frac{x_i + \sigma_t C(n, d) \sqrt{\log \epsilon^{-1}}}{\alpha_t} \right] \cap \left[ -C(n, d) \sqrt{\log \epsilon^{-1}}, C(n, d) \sqrt{\log \epsilon^{-1}} \right]$$
$$=: B_{x,1}^i \cap B_{x,2}^i.$$

### Visual Description
Text-only slide.

---

## Page 43
### Content
By the definition of $\mathbf{B_x}$ and $B_x^i$, it holds that $\mathbb{R}^d \setminus \mathbf{B_x} \subseteq \bigcup_{i=1}^n (\mathbb{R} \times \dots \times (\mathbb{R} \setminus B_x^i) \times \dots \times \mathbb{R})$. Thus, we have
$$\int_{\mathbb{R}^d \setminus \mathbf{B_x}} \left| \frac{\alpha_t \mathbf{z} - \mathbf{x}}{\sigma_t} \right|^{\mathbf{v}} p(\mathbf{z|y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\le \sum_{i=1}^d \int_{\mathbb{R} \times \dots \times (\mathbb{R} \setminus B_x^i) \times \dots \times \mathbb{R}} \left| \frac{\alpha_t \mathbf{z} - \mathbf{x}}{\sigma_t} \right|^{\mathbf{v}} p(\mathbf{z|y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\le C_1 \sum_{i=1}^d \prod_{j \ne i} \underbrace{\int_{\mathbb{R}} \left| \frac{\alpha_t z_j - x_j}{\sigma_t} \right|^{v_j} \exp(-C_2 z_j^2/2) \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_j - x_j|^2}{2\sigma_t^2} \right) dz_j}_{A_{i,j}}$$
$$\times \underbrace{\int_{\mathbb{R} \setminus B_x^i} \left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \exp(-C_2 z_i^2/2) \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right) dz_i}_{A_i},$$
where in the last inequality, we invoke the sub-Gaussian tail condition in Assumption 3.1 to bound $p(\mathbf{z|y})$ and decompose the integral according to coordinates. It remains to bound $A_{i,j}$ and $A_i$, respectively. For the term $A_{i,j}$, we have
$$A_{i,j} \le \frac{1}{\sigma_t (2\pi)^{1/2}} \int_{\mathbb{R}} \left( \frac{v_j}{e} \right)^{v_j/2} \exp(-C_2 z_j^2/2) dz_j \lesssim \frac{1}{\sigma_t}, \tag{A.39}$$
where the first inequality follows from
$$\left| \frac{\alpha_t z - x}{\sigma_t} \right|^v \exp \left( -\frac{|\alpha_t z - x|^2}{2\sigma_t^2} \right) \le \left( \frac{v}{e} \right)^{v/2}, \quad \forall z, x \in \mathbb{R}^d.$$
At the same time, we have
$$A_{i,j} \le \int_{\mathbb{R}} \left| \frac{\alpha_t z_j - x_j}{\sigma_t} \right|^{v_j} \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_j - x_j|^2}{2\sigma_t^2} \right) dz_j$$
$$\lesssim \int_{\mathbb{R}} \frac{w^{v_j}}{\alpha_t (2\pi)^{1/2}} \exp(-w^2/2) dw \lesssim \frac{1}{\alpha_t}. \tag{A.40}$$
Combining (A.39) and (A.40) yields
$$A_{i,j} \lesssim \min \left( \frac{1}{\sigma_t}, \frac{1}{\alpha_t} \right) = \mathcal{O}(1).$$
For term $A_i$, we bound by
$$A_i = \int_{\mathbb{R} \setminus B_x^i} \left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \exp(-C_2 z_i^2/2) \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right) dz_i$$
$$\le \underbrace{\int_{\mathbb{R} \setminus B_{x,1}^i} \left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \exp(-C_2 z_i^2/2) \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right) dz_i}_{(\spadesuit)}$$
$$+ \underbrace{\int_{\mathbb{R} \setminus B_{x,2}^i} \left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \exp(-C_2 z_i^2/2) \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right) dz_i}_{(\clubsuit)}.$$

### Visual Description
Text-only slide.

---

## Page 44
### Content
Now we deal with $(\spadesuit)$ and $(\clubsuit)$ using the same technique. Note that when $z_i \in \mathbb{R} \setminus B_{1,x}^i$, we have
$$\left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right| > C(n, d) \sqrt{\log \epsilon^{-1}}. \tag{A.41}$$
By setting $C(n, d) \ge \|\mathbf{v}\|_1$ and $\epsilon < \frac{1}{e}$, we obtain that when $\left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right| \ge v_i$,
$$\left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right)$$
decreases as $\left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|$ increases. Therefore, inequality (A.41) leads to
$$(\spadesuit) \le \frac{1}{\sigma_t (2\pi)^{1/2}} \int_{\mathbb{R} \setminus B_{1,x}^i} C(n, d)^{v_i} (\log \epsilon^{-1})^{v_i/2} \epsilon^{\frac{C(n,d)^2}{2}} \exp(-C_2 z_i^2/2) dz_i$$
$$\lesssim \frac{C(n, d)^{v_i} (\log \epsilon^{-1})^{v_i/2} \epsilon^{\frac{C(n,d)^2}{2}}}{\sigma_t}. \tag{A.42}$$
Meanwhile, we also have
$$(\spadesuit) \le \int_{\mathbb{R} \setminus B_{x,1}^i} \left| \frac{\alpha_t z_i - x_i}{\sigma_t} \right|^{v_i} \frac{1}{\sigma_t (2\pi)^{1/2}} \exp \left( -\frac{|\alpha_t z_i - x_i|^2}{2\sigma_t^2} \right) dz_i$$
$$= \frac{1}{\alpha_t (2\pi)^{1/2}} \int_{|w| > C(n,d) \sqrt{\log \epsilon^{-1}}} w^{v_i} \exp(-w^2/2) dw$$
$$\lesssim \frac{1}{\alpha_t (2\pi)^{1/2}} C(n, d)^{v_i+2} (\log \epsilon^{-1})^{(v_i+2)/2} \epsilon^{\frac{C(n,d)^2}{2}}. \tag{A.43}$$
Combining (A.42) and (A.43), we deduce
$$(\spadesuit) \lesssim C(n, d)^{v_i+2} (\log \epsilon^{-1})^{(v_i+2)/2} \epsilon^{\frac{C(n,d)^2}{2}}.$$
The term $(\clubsuit)$ assumes analogous upper bounds in the following:
$$(\clubsuit) \le \epsilon^{\frac{C_2 C(n,d)^2}{2}} \int_{\mathbb{R}} \frac{1}{\alpha_t (2\pi)^{1/2}} w^{v_i} \exp(-w^2/2) dw \lesssim \frac{1}{\alpha_t} \epsilon^{\frac{C_2 C(n,d)^2}{2}}$$
and
$$(\clubsuit) \le \int_{\mathbb{R} \setminus B_{x,2}^i} \frac{1}{\sigma_t (2\pi)^{1/2}} \left( \frac{v_i}{e} \right)^{v_i} \exp(-C_2 z_i^2/2) dz_i \lesssim \frac{1}{\sigma_t} (\log \epsilon^{-1})^{1/2} \epsilon^{\frac{C_2 C(n,d)^2}{2}},$$
Taking minimum over the upper bounds above, we derive
$$(\clubsuit) \lesssim C(n, d) (\log \epsilon^{-1})^{1/2} \epsilon^{\frac{C_2 C(n,d)^2}{2}}.$$
Adding up $(\spadesuit)$ and $(\clubsuit)$, we obtain
$$A_i \le (\spadesuit) + (\clubsuit) \lesssim C(n, d)^{v_i+2} (\log \epsilon^{-1})^{(v_i+2)/2} \epsilon^{\frac{C(n,d)^2}{2}} + C(n, d) (\log \epsilon^{-1})^{1/2} \epsilon^{\frac{C_2 C(n,d)^2}{2}}.$$
Setting the constant $C(n, d)$ sufficiently large, we ensure that $A_i \le \epsilon$. The proof is complete by taking the product of $A_{i,j}$ and $A_i$. $\square$

### Visual Description
Text-only slide.

---

## Page 45
### Content
#### A.7.2 Proof of Lemma A.9
*Proof.* For the upper bound of the diffused density function, we have
$$p_t(\mathbf{x|y}) = \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int p(\mathbf{z|y}) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\le \frac{C_1}{\sigma_t^d (2\pi)^{d/2}} \int \exp(-C_2 \|\mathbf{z}\|_2^2/2) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$= \frac{C_1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \int \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x}/(\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2/(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z}$$
$$= \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right),$$
where we invoke assumption 3.1 to bound $p(\mathbf{z|y})$ in the first inequality. For the lower bound, we have
$$p_t(\mathbf{x|y}) = \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int p(\mathbf{z|y}) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\ge \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int_{\|\mathbf{z}\|_2 \le R} p(\mathbf{z|y}) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\ge \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int_{\|\mathbf{z}\|_2 \le R} p(\mathbf{z|y}) \exp \left( -\frac{2(\|\mathbf{x}\|_2^2 + \alpha_t^2 R^2)}{2\sigma_t^2} \right) d\mathbf{z}$$
$$\ge \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\mathbf{x}\|_2^2 + \alpha_t^2 R^2}{\sigma_t^2} \right) \text{Pr}_{\mathbf{z} \sim p} [\|\mathbf{z}\|_2 \le R]$$
$$\ge \frac{C_4}{\sigma_t^d} \exp \left( -\frac{\|\mathbf{x}\|_2^2 + 1}{\sigma_t^2} \right),$$
where we take $R = 1$ and $C_4 = \text{Pr}_{\mathbf{z} \sim p}[\|\mathbf{z}\| \le 1]/(2\pi)^{d/2}$ in the last inequality.

Now we consider bounding the gradient. By symmetry, we only need to bound the first element of $\nabla p_t(\mathbf{x|y})$, i.e.
$$|\nabla p_t(\mathbf{x|y})_1| = \frac{1}{\sigma_t^d (2\pi)^{d/2}} \left| \int \frac{x_1 - \alpha_t z_1}{\sigma_t^2} p(\mathbf{z|y}) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \right|.$$
We have
$$|\nabla p_t(\mathbf{x|y})_1| \le \frac{C_1}{\sigma_t^d (2\pi)^{d/2}} \int \left| \frac{x_1 - \alpha_t z_1}{\sigma_t^2} \right| \exp(-C_2 \|\mathbf{z}\|_2^2/2) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z}$$
$$= \frac{C_1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \underbrace{\int \left| \frac{x_1 - \alpha_t z_1}{\sigma_t^2} \right| \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x}/(\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2/(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z}}_{D}. \tag{A.44}$$

### Visual Description
Text-only slide.

---

## Page 46
### Content
For term $D$, we have
$$D \le \int \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} \frac{|z_1 - \alpha_t x_1/(\alpha_t^2 + C_2 \sigma_t^2)|}{\sigma_t / \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x}/(\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2/(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z}$$
$$+ \int \frac{C_2 \sigma_t^2 |x_1|}{\sigma_t^2 (\alpha_t^2 + C_2 \sigma_t^2)} \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x}/(\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2/(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z}$$
$$= \frac{(2\pi)^{d/2} \sigma_t^d}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \left( \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} \frac{1}{\sqrt{2\pi}} \int |w| \exp(-w^2/2) dw + \frac{C_2 |x_1|}{\alpha_t^2 + C_2 \sigma_t^2} \right)$$
$$\le \frac{(2\pi)^{d/2} \sigma_t^d}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \left( \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} + \frac{C_2 |x_1|}{\alpha_t^2 + C_2 \sigma_t^2} \right),$$
where the second inequality follows from the fact that $\int |w| \exp(-w^2/2) dw \le \sqrt{2\pi}$. Plugging this result into (A.44) gives rise to
$$|\nabla p_t(\mathbf{x|y})_1| \le \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \left( \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} + \frac{C_2 |x_1|}{\alpha_t^2 + C_2 \sigma_t^2} \right). \tag{A.45}$$
Thus, by repeating this proof to each element of $\nabla p_t(\mathbf{x, y})$, we have
$$\|\nabla p_t(\mathbf{x, y})\|_\infty \le \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \left( \frac{\alpha_t}{\sigma_t \sqrt{\alpha_t^2 + C_2 \sigma_t^2}} + \frac{C_2 \|\mathbf{x}\|_\infty}{\alpha_t^2 + C_2 \sigma_t^2} \right).$$
We complete our proof. $\square$

#### A.7.3 Proof of Lemma A.10
*Proof.* By symmetry, we only consider the first element of
## Page 49
### Content
## B Proof of Theorem 3.4

### B.1 Key Steps for Proving Theorem 3.4
To prove Theorem 3.4 we mainly follow the proof of Theorem 3.2. We also replace $N$ by $N^{d+d_y}$ for simplicity. The difference between the proofs is that the stronger assumption allows us to extract a Gaussian distribution from $p_t$. We provide an overview of our proof.

**Step 1** Under Assumption 3.3, we can decompose the score function into a linear function of $\mathbf{x}$ and a diffused score function $\nabla \log h = \frac{\nabla h}{h}$, where $h$ is a convolution of $f$ and a Gaussian kernel (Lemma B.1).

**Step 2** We truncate the domain of input $\mathbf{x}$ as we do in Theorem 3.2 (Lemma B.2).

**Step 3** We use the ReLU network to approximate $h(\mathbf{x}, \mathbf{y}, t)$ and $\nabla h(\mathbf{x}, \mathbf{y}, t)$ in the truncated domain and combine the results to construct a score approximator $\mathbf{s}(\mathbf{x}, \mathbf{y}, t)$ with small approximation error (Proposition B.3).

### B.2 Statements of Steps 1 - 3 and Using Them to Prove Theorem 3.4
#### B.2.1 Formal Statements in Steps 1 - 3
Firstly, under Assumption 3.3, we can decompose the score function as shown in the following lemma:

**Lemma B.1 (Decomposing the score).** Under Assumption 3.3, the score function can be written as
$$
\begin{aligned}
\nabla \log p_t(\mathbf{x}|\mathbf{y}) &= \frac{-C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} + \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \cdot \frac{\int f(\mathbf{z}, \mathbf{y}) \left( \frac{\mathbf{z} - \widehat{\alpha}_t \mathbf{x}}{\widehat{\sigma}_t} \right) \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right) d\mathbf{z}}{\int f(\mathbf{z}, \mathbf{y}) \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right) d\mathbf{z}} \\
&= \frac{-C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} + \frac{\nabla h(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)},
\end{aligned}
$$
where $\widehat{\sigma}_t = \frac{\sigma_t}{(\alpha_t^2 + C_2 \sigma_t^2)^{1/2}}$, $\widehat{\alpha}_t = \frac{\alpha_t}{\alpha_t^2 + C_2 \sigma_t^2}$ and $h(\mathbf{x}, \mathbf{y}, t) = \int f(\mathbf{z}, \mathbf{y}) \frac{1}{(2\pi)^{d/2} \widehat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right) d\mathbf{z}$.

Due to the smoothness and boundedness of $f(\mathbf{z}, \mathbf{y})$, we can verify that $h(\mathbf{x}, \mathbf{y}, t)$ is both lower and upper bounded by some constants, which is a helpful property in approximating $\frac{\nabla h(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)}$. Following the proof of Theorem 3.2, we also truncate the domain of $\mathbf{x}$ on a bounded space $\{\mathbf{x} : \|\mathbf{x}\|_2 \leq R\}$. The proof of Lemma B.1 is provided in Appendix B.6.1.

**Lemma B.2 (Truncation on $\mathbf{x}$).** Under Assumption 3.3, for any $R > 1$, we have
$$
\int_{\|\mathbf{x}\|_\infty \geq R} p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim R \exp(-C'_2 R^2), \tag{B.1}
$$
$$
\int_{\|\mathbf{x}\|_\infty \geq R} \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \lesssim \frac{1}{\sigma_t^2} R^3 \exp(-C'_2 R^2). \tag{B.2}
$$
where $C'_2 = \frac{C_2}{2 \max(1, C_2)}$.

This lemma is a counterpart of Lemma A.1, and the proof is provided in Appendix B.6.2. Note that the truncation error scales with $\frac{1}{\sigma_t^2}$ instead of $\frac{1}{\sigma_t^4}$ as we obtained in Lemma A.1, which results from a tighter bound of the score function $\nabla \log p_t(\mathbf{x}|\mathbf{y})$.

### Visual Description
Text-only slide.

---
## Page 50
### Content
**Proposition B.3 (Approximate the score).** For sufficiently large integer $N$, there exists a ReLU network $\mathcal{F}(W, \kappa, L, K)$ that gives rise to a mapping $\mathbf{s}(\mathbf{x}, \mathbf{y}, t) \in \mathcal{F}$ satisfying
$$
\left\| \mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log h(\mathbf{x}, \mathbf{y}, t) + \frac{C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} \right\|_\infty \lesssim \frac{B}{\sigma_t} N^{-\beta} (\log N)^{\frac{s+1}{2}}, \tag{B.3}
$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$. The network hyperparameter configuration satisfies
$$
M_t = \mathcal{O}(\sqrt{\log N}/\sigma_t), \quad W = \mathcal{O}(N^{d+d_y} \log^7 N), \tag{B.4}
$$
$$
\kappa = \exp(\mathcal{O}(\log^4 N)), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}(N^{d+d_y} \log^9 N). \tag{B.5}
$$
The proof of Proposition B.3 is provided in B.3. Now we are ready to prove Theorem 3.4.

#### B.2.2 Proof of Theorem 3.4
**Proof.** With the lemmas and the proposition above, the proof is quite straightforward. We take $C_x = \sqrt{\frac{2\beta}{C'_2}}$ in Proposition B.3 to obtain a ReLU score estimator $\mathbf{s}$. According to the hyperparameter configuration (B.4), we have $\|\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\|_2 \lesssim \frac{\sqrt{\log N}}{\sigma_t}$ for any $\mathbf{x} \in \mathbb{R}^d$, $\mathbf{y} \in \mathbb{R}^{d_y}$ and $t > 0$. Besides, we set the truncation radius $R = C_x \sqrt{\log N}$. By Lemma B.2,
$$
\begin{aligned}
&\int_{\mathbb{R}^d} \|\mathbf{s} - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \\
&\lesssim \int_{\|\mathbf{x}\|_\infty > \sqrt{\frac{2\beta}{C'_2} \log N}} \left( 2 \left( \frac{1}{\sigma_t} \sqrt{\log N} \right)^2 + 2 \|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 \right) p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \\
&+ \int_{\|\mathbf{x}\|_\infty \leq \sqrt{\frac{2\beta}{C'_2} \log N}} \|\mathbf{s}(\mathbf{x}, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}|\mathbf{y})\|_2^2 p_t(\mathbf{x}|\mathbf{y}) d\mathbf{x} \\
&\stackrel{(i)}{\lesssim} \frac{2d \log N}{\sigma_t^2} \left( \frac{2\beta}{C'_2} \log N \right)^{1/2} N^{-2\beta} + \frac{2}{\sigma_t^2} \left( \frac{2\beta}{C'_2} \log N \right)^{3/2} N^{-2\beta} + \frac{B^2}{\sigma_t^2} N^{-2\beta} \log^{s+1} N \\
&\lesssim \frac{B^2}{\sigma_t^2} N^{-2\beta} \log^{s+1} N.
\end{aligned}
$$
In (i) we invoke the truncation error bound in Lemma B.2 and the approximation error bound in Proposition B.3. By turning $N$ back to $N^{\frac{1}{d+d_y}}$, the proof is complete. $\square$

### B.3 Proofs in Step 3 for Theorem 3.4
Similarly to the proof of Proposition A.3, the approximation process is also divided into two stages. In the first stage, we approximate $h$ and $\nabla h$ up to a small error separately in the same way. In approximating $h(\mathbf{x}, \mathbf{y}, t)$, we first use another set of diffused local monomials (see B.27) to approximate $p(\mathbf{x}|\mathbf{y})$, which is presented in the following lemma.

**Lemma B.4 (Diffused local polynomial approximation).** Under Assumption 3.3, for sufficiently large integer $N > 0$ and constant $C_x > 0$, there exists a diffused local polynomial with at most $N^{d+d_y}(d + d_y)^s$ diffused local monomials $f_1(\mathbf{x}, \mathbf{y}, t)$ such that
$$
|f_1(\mathbf{x}, \mathbf{y}, t) - h(\mathbf{x}, \mathbf{y}, t)| \lesssim BN^{-\beta} \log^{\frac{s}{2}} N, \tag{B.6}
$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$, and $t > 0$.

### Visual Description
Text-only slide.

---
## Page 51
### Content
The proof of Lemma B.4 is provided in Appendix B.4. We remark that the polynomial dependence on $\log N$ is smaller than the one we obtain in Lemma A.4. In the following lemma, we present the second stage of our approximation process in which we construct a ReLU network to approximate this diffused local polynomial with a sufficiently small error.

**Lemma B.5 (ReLU approximation).** Under Assumption 3.3, given the diffused local polynomial $f_1$ in Lemma B.4, for any $\epsilon > 0$, there exists a ReLU network $\mathcal{F}(W, \kappa, L, K)$ that gives rise to a function $f_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) \in \mathcal{F}$ satisfying
$$
|f_1(\mathbf{x}, \mathbf{y}, t) - f_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t)| \lesssim \epsilon, \tag{B.7}
$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$. The network configuration is
$$
W = \mathcal{O}\left( N^{d+d_y} (\log^7 N + \log N \log^3 \epsilon^{-1}) \right), \quad \kappa = \exp\left( \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}) \right),
$$
$$
L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), \quad K = \mathcal{O}\left( N^{d+d_y} (\log^9 N + \log N \log^3 \epsilon^{-1}) \right).
$$
The proof of Lemma B.5 is provided in Appendix B.5. Moreover, we have similar results for approximating $\nabla h(\mathbf{x}, \mathbf{y}, t)$:

**Lemma B.6 (Counterpart of Lemma B.4).** Under Assumption 3.3, for sufficiently large integer $N > 0$ and $1 \leq i \leq d$, there exists a diffused local polynomial with at most $N^{d+d_y}(d + d_y)^s$ diffused local monomials $f_{2,i}(\mathbf{x}, \mathbf{y}, t)$ such that
$$
\left| f_{2,i}(\mathbf{x}, \mathbf{y}, t) - \left[ \frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h(\mathbf{x}, \mathbf{y}, t) \right]_i \right| \lesssim BN^{-\beta} \log^{\frac{s+1}{2}} N, \quad \forall \mathbf{x} \in \mathbb{R}^d, \mathbf{y} \in [0, 1]^{d_y}, t > 0. \tag{B.8}
$$

**Lemma B.7 (Counterpart of Lemma B.5).** Under Assumption 3.3, given the diffused local polynomial mapping $\mathbf{f}_2 = [f_{2,1}, f_{2,2}, \dots, f_{2,d}]^\top$ in Lemma B.6, for any $\epsilon > 0$, there exists a ReLU network $\mathcal{F}(W, \kappa, L, K)$ that gives rise to a mapping $\mathbf{f}_2^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) \in \mathcal{F}$ satisfying
$$
\|\mathbf{f}_2(\mathbf{x}, \mathbf{y}, t) - \mathbf{f}_2^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t)\|_\infty \lesssim \epsilon, \tag{B.9}
$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$. The network configuration is the same as in Lemma B.5.

With all the lemmas above, we can begin our proof of Proposition B.3.

**Proof of Proposition B.3.** From the lemmas above, we obtain $f_1(\mathbf{x}, \mathbf{y}, t), f_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t)$ to approximate $h(\mathbf{x}, \mathbf{y}, t)$, and $\mathbf{f}_2, \mathbf{f}_2^{\text{ReLU}}$ to approximate $\frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h(\mathbf{x}, \mathbf{y})$. By symmetry, we only consider approximating the first element of $\nabla h(\mathbf{x}, \mathbf{y}, t)$, which we denote by $\nabla h_1(\mathbf{x}, \mathbf{y})$. For simplicity, we denote the first element of $\mathbf{f}_2$ by $f_2$.

By the definition of $h$, for any $\mathbf{x} \in [-C_x \sqrt{\log N}]$, $\mathbf{y} \in [0, 1]^{d_y}$ and $N^{-C_\sigma} \leq t \leq C_\alpha \log N$, we have $C_1 \leq h(\mathbf{x}, \mathbf{y}, t) \leq B$ and $\left\| \frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h(\mathbf{x}, \mathbf{y}, t) \right\|_\infty \leq \sqrt{\frac{2}{\pi}} B$ (see Lemma B.8). Accordingly, we make

### Visual Description
Text-only slide.

---
## Page 52
### Content
$N$ sufficiently large so that $\frac{C_1}{2} \leq f_1(\mathbf{x}, \mathbf{y}, t) \leq 2B$ and $f_2 \leq B$. Then we have
$$
\begin{aligned}
&\left| \frac{\nabla h_1(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)} - \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \frac{f_2(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} \right| \\
&\leq \left| \frac{\nabla h_1(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)} - \frac{\nabla h_1(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} \right| + \left| \frac{\nabla h_1(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} - \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \frac{f_2(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} \right| \\
&\leq |\nabla h_1(\mathbf{x}, \mathbf{y}, t)| \left| \frac{h(\mathbf{x}, \mathbf{y}, t) - f_1(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t) f_1(\mathbf{x}, \mathbf{y}, t)} \right| + \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \left| \frac{f_2(\mathbf{x}, \mathbf{y}, t) - \frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h_1(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} \right| \\
&\stackrel{(i)}{\leq} \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \left( \frac{2}{C_1^2} BN^{-\beta} \log^{\frac{s}{2}} N + \frac{2}{C_1} BN^{-\beta} \log^{\frac{s+1}{2}} N \right) \\
&\lesssim \frac{B}{\sigma_t} N^{-\beta} \log^{\frac{s+1}{2}} N.
\end{aligned}
$$
In (i), we invoke the diffused polynomial approximation error bound in Lemmas B.4 and B.6 and the lower bound of $f_1$. Applying to other elements give rise to the bounded $L_\infty$ error:
$$
\left\| \frac{\nabla h(\mathbf{x}, \mathbf{y}, t)}{h(\mathbf{x}, \mathbf{y}, t)} - \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \frac{\mathbf{f}_2(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} \right\|_\infty \lesssim \frac{B}{\sigma_t} N^{-\beta} \log^{\frac{s+1}{2}} N.
$$
For the ReLU approximation, we use Lemmas B.5 and B.7 to construct a ReLU network to approximate
$$
\mathbf{f}_3(\mathbf{x}, \mathbf{y}, t) := \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \frac{\mathbf{f}_2}{f_1} - \frac{C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2}. \tag{B.10}
$$
Our constructed network architecture is depicted in Figure 4, and the details about how to determine the network size and the error propagation are presented in Appendix F.4.3. From the construction above we obtain a ReLU network $\mathbf{f}_3^{\text{ReLU}} \in \mathcal{F}(M_t, W, \kappa, L, K)$ with $M_t \lesssim \frac{\sqrt{\log N}}{\sigma_t}$, $L = \mathcal{O}(\log^4 N)$, $W = \mathcal{O}(N^{d+d_y} (\log^7 N))$, $K = \mathcal{O}(N^{d+d_y} (\log^9 N))$ and $\kappa = \exp(\mathcal{O}(\log^4 N))$ such that
$$
\left\| \mathbf{f}_3^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) - \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \frac{\mathbf{f}_2(\mathbf{x}, \mathbf{y}, t)}{f_1(\mathbf{x}, \mathbf{y}, t)} + \frac{C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} \right\| \leq N^{-\beta}.
$$
Thus, we have
$$
\|\mathbf{f}_3^{\text{ReLU}} - \nabla \log p_t(\mathbf{x}|\mathbf{y})\| \lesssim \frac{B}{\sigma_t} N^{-\beta} \log^{\frac{s+1}{2}} N + N^{-\beta} \lesssim \frac{B}{\sigma_t} N^{-\beta} \log^{\frac{s+1}{2}} N
$$
for any $\mathbf{x} \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]^d$, $\mathbf{y} \in [0, 1]^{d_y}$ and $N^{-C_\sigma} \leq t \leq C_\alpha \log N$. By taking $\mathbf{s} = \mathbf{f}_3^{\text{ReLU}}$, the proof is complete. $\square$

### B.4 Proofs of Lemmas B.4 and B.6
To prove the lemma, we first show some properties of the $h(\mathbf{x}, \mathbf{y}, t)$ and $\nabla \log h(\mathbf{x}, \mathbf{y}, t)$.

**Lemma B.8.** Under Assumption 3.3, $h(\mathbf{x}, \mathbf{y}, t)$ and $\frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h(\mathbf{x}, \mathbf{y}, t)$ can be bounded as:
$$
C_1 \leq h(\mathbf{x}, \mathbf{y}, t) \leq B, \quad \left\| \frac{\widehat{\sigma}_t}{\widehat{\alpha}_t} \nabla h(\mathbf{x}, \mathbf{y}, t) \right\|_\infty \leq \sqrt{\frac{2}{\pi}} B \tag{B.11}
$$

### Visual Description
Text-only slide.

---
## Page 53
### Content
![Figure 4: Network architecture of $\mathbf{f}_3^{\text{ReLU}}$. We implement all the components of $\mathbf{f}_3$ ($f_1, \mathbf{f}_2, \widehat{\sigma}_t$ and $\widehat{\alpha}_t$) through ReLU networks and combine them using the ReLU-expressed operators (product, inverse and entrywise-min/max) to express $\mathbf{f}_3$ according to its definition in (B.10).](figure4.png)

**Lemma B.9.** Under Assumption 3.3, the diffused density function $p_t(\mathbf{x}|\mathbf{y})$ can be bounded as:
$$
\|\nabla \log p_t(\mathbf{x}|\mathbf{y})\|_\infty \leq \frac{C_2 \|\mathbf{x}\|_\infty}{\alpha_t^2 + C_2 \sigma_t^2} + \frac{B}{C_1} \frac{\widehat{\alpha}_t}{\widehat{\sigma}_t} \lesssim \|\mathbf{x}\|_\infty + \frac{1}{\sigma_t} \tag{B.12}
$$

**Lemma B.10 (Clip the integral).** Under Assumption 3.3, for any $\mathbf{x} \in \mathbb{R}^d$ and $\mathbf{v} \in \mathbb{Z}_+^d$ with $\|\mathbf{v}\|_1 \leq n$. There exists a constant $C(n, d)$ such that for any $\mathbf{x}$ and $\epsilon < 0.99$:
$$
\begin{aligned}
&\left| \int_{\mathbb{R}^d} \left( \frac{\mathbf{z} - \widehat{\alpha}_t \mathbf{x}}{\widehat{\sigma}_t} \right)^\mathbf{v} f(\mathbf{z}, \mathbf{y}) \frac{1}{(2\pi)^{d/2} \widehat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right) d\mathbf{z} \right. \\
&- \left. \int_{\mathbf{B}_x} \left( \frac{\mathbf{z} - \widehat{\alpha}_t \mathbf{x}}{\widehat{\sigma}_t} \right)^\mathbf{v} f(\mathbf{z}, \mathbf{y}) \frac{1}{(2\pi)^{d/2} \widehat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right) d\mathbf{z} \right| \leq \epsilon,
\end{aligned}
$$
where $\mathbf{B}_x = [\widehat{\alpha}_t \mathbf{x} - C(n, d) \widehat{\sigma}_t \sqrt{\log \epsilon^{-1}}, \widehat{\alpha}_t \mathbf{x} + C(n, d) \widehat{\sigma}_t \sqrt{\log \epsilon^{-1}}]$.

The proofs of the lemmas above are provided in Appendix B.6. With all the previous lemmas, we begin to prove Lemma B.4.

**Proof of Lemma B.4.** We prove the lemma following the proof of Lemma A.4. Recall that the integral form of $h(\mathbf{x}, \mathbf{y}, t)$ is
$$
h(\mathbf{x}, \mathbf{y}, t) = \underbrace{\int_{\mathbb{R}^d}}_{\text{Step (i)}} \underbrace{f(\mathbf{z}, \mathbf{y})}_{\text{Step (ii)}} \underbrace{\frac{1}{(2\pi)^{d/2} \widehat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \widehat{\alpha}_t \mathbf{x}\|^2}{2\widehat{\sigma}_t^2} \right)}_{\text{Step (iii)}} d\mathbf{z}. \tag{B.13}
$$
We will prove the lemma in the following steps.

### Visual Description
The page contains a complex diagram (Figure 4) showing the network architecture of $\mathbf{f}_3^{\text{ReLU}}$. It starts with inputs $x$, $\widehat{\alpha}_t^{2, \text{ReLU}}$, $C_2 + (1-C_2)\cdot \star$, $\widehat{\sigma
## Page 57
### Content
single diffused local monomial with a small error. We recall that the diffused local monomial is defined as
$$ \Phi_{\mathbf{n,n',v,w}}(\mathbf{x, y}, t) = \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right)^{\mathbf{n'}} \prod_{j=1}^{d_y} \phi \left( 3N \left( y_j - \frac{\mathbf{w}}{N} \right) \right) \prod_{i=1}^d \sum_{k<p} g(x_i, n_i, v_i, k), \tag{B.27} $$
where we have redefined $g$ in (B.25). Since the first two parts remain the same as in the proof of Lemma B.5, we only focus on the ReLU approximation of $g$.

**Lemma B.11 (Approximate $g$ in (B.25)).** Given $N$, there exists a ReLU network $\mathcal{F}(W, \kappa, L, K)$ such that for any $n \le s, v \le N, k \le p$ and $\epsilon > 0$, this network gives rise to a function $g^{\text{ReLU}}(x, n, v, k)$ such that
$$ |g^{\text{ReLU}}(x, n, v, k) - g(x, n, v, k)| \le \epsilon, \quad \forall x \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]. $$
The hyperparameter of the network satisfies
$$ W = \mathcal{O}(\log^6 N + \log^3 \epsilon^{-1}), \quad \kappa = \exp(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})), $$
$$ L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), \quad K = \mathcal{O}(\log^8 N + \log^4 \epsilon^{-1}). $$
The proof of Lemma B.11 is provided in Appendix B.6.5. With all the lemmas above, we completely follow the proof of Lemma A.5 to construct the ReLU network for Lemma B.5. We do not elaborate on the proof for conciseness.

### B.6 Proofs of Other Lemmas
#### B.6.1 Proof of Lemma B.1
*Proof.* Under Assumption 3.3, we have
$$ \begin{aligned} p_t(\mathbf{x|y}) &= \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int p(\mathbf{z|y}) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \\ &= \frac{1}{\sigma_t^d (2\pi)^{d/2}} \int f(\mathbf{z, y}) \exp(-C_2 \|\mathbf{z}\|_2^2 / 2) \exp \left( -\frac{\|\mathbf{x} - \alpha_t \mathbf{z}\|^2}{2\sigma_t^2} \right) d\mathbf{z} \\ &= \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \int f(\mathbf{z, y}) \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x} / (\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2 / (\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z} \\ &= \frac{1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \\ &\quad \cdot \int f(\mathbf{z, y}) \frac{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}}{(2\pi)^{d/2} \sigma_t^d} \exp \left( -\frac{\|\mathbf{z} - \alpha_t \mathbf{x} / (\alpha_t^2 + C_2 \sigma_t^2)\|^2}{2\sigma_t^2 / (\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{z} \\ &= \frac{1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \int f(\mathbf{z, y}) \frac{1}{(2\pi)^{d/2} \hat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z} \\ &= \frac{1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) h(\mathbf{x, y}, t), \end{aligned} \tag{B.28} $$

### Visual Description
Text-only slide.

---
## Page 58
### Content
where $\hat{\sigma}_t = \frac{\sigma_t}{(\alpha_t^2 + C_2 \sigma_t^2)^{1/2}}$, $\hat{\alpha}_t = \frac{\alpha_t}{\alpha_t^2 + C_2 \sigma_t^2}$ and $h(\mathbf{x, y}, t) = \int f(\mathbf{z, y}) \frac{1}{(2\pi)^{d/2} \hat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z}$.
Thus, we can compute the score function as:
$$ \begin{aligned} \nabla \log p_t(\mathbf{x|y}) &= \frac{\nabla p_t(\mathbf{x|y})}{p_t(\mathbf{x|y})} \\ &= \frac{-C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} + \frac{\hat{\alpha}_t}{\hat{\sigma}_t} \cdot \frac{\int f(\mathbf{z, y}) \left( \frac{\mathbf{z} - \hat{\alpha}_t \mathbf{x}}{\hat{\sigma}_t} \right) \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z}}{\int f(\mathbf{z, y}) \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z}} \\ &= \frac{-C_2 \mathbf{x}}{\alpha_t^2 + C_2 \sigma_t^2} + \frac{\nabla h(\mathbf{x, y}, t)}{h(\mathbf{x, y}, t)}. \end{aligned} $$
We complete our proof. $\square$

#### B.6.2 Proof of Lemma B.2
According to Lemma B.8 and (B.28), we have
$$ p_t(\mathbf{x|y}) \le \frac{B}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right). \tag{B.29} $$
Combining (B.29) with Lemma B.9 gives rise to
$$ \begin{aligned} \int_{\|\mathbf{x}\|_\infty \ge R} \|\nabla \log p_t(\mathbf{x|y})\|^2 p_t(\mathbf{x|y}) d\mathbf{x} &\lesssim \int_{\|\mathbf{x}\|_\infty \ge R} \left( \|\mathbf{x}\|_\infty^2 + \frac{1}{\sigma_t^2} \right) \frac{B}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{x} \\ &\lesssim \left( \frac{R^3}{3(\alpha_t^2 + C_2 \sigma_t^2)^{3/2}} + \frac{R}{\sigma_t^2 (\alpha_t^2 + C_2 \sigma_t^2)^{1/2}} \right) \exp \left( \frac{-C_2 R^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \\ &\lesssim \frac{1}{\sigma_t^2} R^3 \exp(-C'_2 R^2), \end{aligned} $$
where $C'_2 = \min_{t>0} \frac{C_2}{2(\alpha_t^2 + C_2 \sigma_t^2)} = \frac{C_2}{2 \max(C_2, 1)}$. Similarly, we have
$$ \begin{aligned} \int_{\|\mathbf{x}\| \ge R} p_t(\mathbf{x|y}) d\mathbf{x} &\lesssim \frac{B}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \int_{\|\mathbf{x}\|_\infty \ge R} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) d\mathbf{x} \\ &\lesssim \frac{R}{(\alpha_t^2 + C_2 \sigma_t^2)^{1/2}} \exp \left( \frac{-C_2 R^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right) \\ &\lesssim R \exp(-C'_2 R^2). \end{aligned} $$
The proof is complete.

#### B.6.3 Proof of Lemma B.8
*Proof.* Under assumption 3.3, we have $C_1 \le f(\mathbf{x, y}, t) \le B$. By plugging the bound into the integral form of $h$ and $\nabla h$ and invoking the fact that
$$ \int \frac{1}{(2\pi)^{d/2} \hat{\sigma}_t^d} \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z} = 1, $$
$$ \int \frac{1}{(2\pi)^{d/2} \hat{\sigma}_t^d} \left\| \frac{\mathbf{z} - \hat{\alpha}_t \mathbf{x}}{\hat{\sigma}_t} \right\| \exp \left( -\frac{\|\mathbf{z} - \hat{\alpha}_t \mathbf{x}\|^2}{2\hat{\sigma}_t^2} \right) d\mathbf{z} = \sqrt{\frac{2}{\pi}}, $$

### Visual Description
Text-only slide.

---
## Page 59
### Content
we directly obtain
$$ C_1 \le h(\mathbf{x, y}, t) \le B, \quad \left\| \frac{\hat{\sigma}_t}{\hat{\alpha}_t} \nabla h(\mathbf{x, y}, t) \right\|_\infty \le \sqrt{\frac{2}{\pi}} B. $$
We complete our proof. $\square$

#### B.6.4 Proof of Lemma B.10
*Proof.* We denote $\mathbf{w} = \frac{\mathbf{z} - \hat{\alpha}_t \mathbf{x}}{\hat{\sigma}_t}$. Suppose the truncated domain is
$$ \mathbf{B_x} = [\hat{\alpha}_t \mathbf{x} - C' \hat{\sigma}_t \sqrt{\log \epsilon^{-1}}, \hat{\alpha}_t \mathbf{x} + C' \hat{\sigma}_t \sqrt{\log \epsilon^{-1}}]. $$
We note that $\mathbf{z} \in \mathbf{B_x}$ is equivalent to $\mathbf{w} \in [-C' \sqrt{\log \epsilon^{-1}}, C' \sqrt{\log \epsilon^{-1}}]^d$, the truncation error can be presented as
$$ \begin{aligned} &\left| \int_{\|\mathbf{w}\|_\infty \ge C' \sqrt{\log \epsilon^{-1}}} \mathbf{w}^{\mathbf{v}} f(\hat{\sigma}_t \mathbf{w} + \hat{\alpha}_t \mathbf{x, y}) \frac{1}{(2\pi)^{d/2}} \exp \left( -\frac{\|\mathbf{w}\|_2^2}{2} \right) d\mathbf{w} \right| \\ &\le \frac{B}{(2\pi)^{1/2}} \sum_{i=1}^n \left| \int_{w_i \ge C' \sqrt{\log \epsilon^{-1}}} w_i^{v_i} \exp \left( -\frac{w_i^2}{2} \right) dw_i \cdot \prod_{j \ne i} \int_{\mathbb{R}} \frac{1}{(2\pi)^{1/2}} w_j^{v_j} \exp \left( -\frac{w_j^2}{2} \right) dw_j \right| \\ &\le \frac{B}{(2\pi)^{1/2}} \sum_{i=1}^d \frac{2}{v_i + 1} (C' \sqrt{\log \epsilon^{-1}})^{v_i+1} \epsilon^{\frac{C'}{2}} \prod_{j \ne i} \mathbb{E}_{Z_j \sim N(0,1)} [|Z_j^{v_j}|] \\ &\le B \prod_{j=1}^d \mathbb{E}_{Z_j \sim N(0,1)} [|Z_j^{v_j}|] \sum_{i=1}^d \frac{1}{v_i + 1} (C' \sqrt{\log \epsilon^{-1}})^{v_i+1} \epsilon^{\frac{C'}{2}} \\ &\le B \max(1, (\mathbb{E}_{Z \sim N(0,1)} [|Z^n|])^d) \sum_{i=1}^d (C' \sqrt{\log \epsilon^{-1}})^{v_i+1} \epsilon^{\frac{C'}{2}}. \end{aligned} \tag{B.30} $$
In the third inequality we invoke $\mathbb{E}_{Z_i \sim N(0,1)} [|Z_i^{v_j}|] \ge \sqrt{\frac{2}{\pi}}$ for any nonnegative integer $v_i$. In the last inequality, we invoke $\mathbb{E}_{Z \sim N(0,1)} [|Z^m|] \le \mathbb{E}_{Z \sim N(0,1)} [|Z^n|]$ for $1 \le m \le n$. For $\epsilon < 0.99$, by setting $C' = C'(n, d)$ sufficiently large (depending on $n, d$ and $B$), (B.30) can be bounded by $\epsilon$.
The proof is complete. $\square$

#### B.6.5 Proof of Lemma B.11
*Proof.* We denote $w = \frac{z - \hat{\alpha}_t x}{\hat{\sigma}_t}$. By the definition of $g(x, n, v, k)$, we have
$$ \begin{aligned} g(x, n, v, k) &= \frac{1}{\hat{\sigma}_t (2\pi)^{1/2}} \int \left( \frac{z}{R} + 1/2 - \frac{v}{N} \right)^n \frac{1}{k!} \left( -\frac{|z - \hat{\alpha}_t x|^2}{2\hat{\sigma}_t^2} \right)^k dz \\ &= \frac{1}{(2\pi)^{1/2} k! (-2)^k} \int \left( \frac{\hat{\alpha}_t x + \hat{\sigma}_t w}{R} + 1/2 - \frac{v}{N} \right)^n w^{2k} dw \\ &= \frac{1}{(2\pi)^{1/2} k! (-2)^k} \sum_{j=0}^n C_n^j \int \left( \frac{\hat{\alpha}_t x}{R} + 1/2 - \frac{v}{N} \right)^{n-j} \left( \frac{\hat{\sigma}_t w}{R} \right)^j w^{2k} dw \\ &= \frac{1}{(2\pi)^{1/2} k! (-2)^k R^n} \sum_{j=0}^n C_n^j \hat{\sigma}_t^j \left( \hat{\alpha}_t x + \frac{R}{2} - \frac{vR}{N} \right)^{n-j} \int w^{2k+j} dw. \end{aligned} $$

### Visual Description
Text-only slide.

---
## Page 60
### Content
![Network architecture diagram](Figure_5_Network_architecture.png)

**Figure 5:** Network architecture of $f_{v,k,j}^{\text{ReLU}}$. We implement all the basic functions (e.g., $x, \hat{\alpha}_t$ and $\hat{\sigma}_t$) through ReLU networks and combine them using the ReLU-expressed operators (*product, inverse, clip* and *poly*) to express $f_{v,k,j}$ according to its definition in (B.32).

Remember that the domain of the integral is
$$ z \in \left[ \left( \frac{v_i - 1}{N} - 1/2 \right) R, \left( \frac{v_i}{N} - 1/2 \right) R \right] \cap [\hat{\alpha}_t x - C'(n, d) \hat{\sigma}_t \sqrt{\beta \log N}, \hat{\alpha}_t x + C'(n, d) \hat{\sigma}_t \sqrt{\beta \log N}], $$
which means that
$$ w \in \left[ \frac{(v - 1 - N/2)R - \hat{\alpha}_t Nx}{N\hat{\sigma}_t}, \frac{(v - N/2)R - \hat{\alpha}_t Nx}{N\hat{\sigma}_t} \right] \cap [-C'(0, d) \sqrt{\beta \log N}, C'(0, d) \sqrt{\beta \log N}]. $$
Thus, we have
$$ g(x, n, v, k) = \frac{1}{(2\pi)^{1/2} k! (-2)^k R^n} \sum_{j=0}^n C_n^j \hat{\sigma}_t^j \left( \hat{\alpha}_t x + \frac{R}{2} - \frac{vR}{N} \right)^{n-j} \frac{f_{\overline{D}}^{j+2k+1}(x) - f_{\underline{D}}^{j+2k+1}(x)}{j + 2k + 1}, \tag{B.31} $$
where
$$ f_{\underline{D}}(x) = \text{clip} \left( \frac{(v - 1 - N/2)R - \hat{\alpha}_t Nx}{N\hat{\sigma}_t}, C(0, d) \sqrt{\beta \log N} \right) $$
and
$$ f_{\overline{D}}(x) = \text{clip} \left( \frac{(v - N/2)R - \hat{\alpha}_t Nx}{N\hat{\sigma}_t}, C(0, d) \sqrt{\beta \log N} \right). $$
Therefore, we only need to approximate the following form of function
$$ f_{v,k,j} = \hat{\sigma}_t^j \left( \hat{\alpha}_t x + \frac{R}{2} - \frac{vR}{N} \right)^{n-j} (f_{\overline{D}}^{j+2k+1}(x) - f_{\underline{D}}^{j+2k+1}(x)). \tag{B.32} $$
We construct a ReLU network to approximate $f_{v,k,j}$ (see Figure 5). By appropriately setting the parameters for each ReLU approximation function (details about how to determine the network

### Visual Description
The slide contains a complex flow diagram (Figure 5) illustrating the network architecture. It shows inputs like $x, \hat{\alpha}_t^{\text{ReLU}}, \hat{\sigma}_t^{\text{ReLU}}$ passing through various functional blocks:
- **Product blocks** (Product$_1$, Product$_2$, Product$_3$, Product$_4$)
- **Polynomial blocks** (Poly$_1$ for $2k+j+1$, Poly$_2$ for $j$, Poly$_3$ for $n-j$)
- **Clip block** (Clip by $R/2$)
- **Inverse block**
- **Sum block**
- **Scaling block** (Scale by -1)
The diagram maps out the computational steps to calculate $f_{v,k,j}^{\text{ReLU}}$. Below the diagram is text explaining the mathematical derivation and definitions for the approximation.

---
## Page 61
### Content
size and the error propagation are deferred to Appendix F.4.4 for construction details), we derive a ReLU network $f_{v,k,j}^{\text{ReLU}} \in \mathcal{F}(W, \kappa, L, K)$ with
$$ W = \mathcal{O}(\log^6 N + \log^3 \epsilon^{-1}), \quad \kappa = \exp(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})), $$
$$ L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), \quad K = \mathcal{O}(\log^8 N + \log^4 \epsilon^{-1}). $$
such that for any $x \in [-C_x \sqrt{\log N}, C_x \sqrt{\log N}]$ and $t \in [N^{-C_\sigma}, C_\alpha \log N]$,
$$ |f_{v,k,j}(x, t) - f_{v,k,j}^{\text{ReLU}}(x, t)| \le \epsilon. \tag{B.33} $$
At last, we add up $f_{v,k,j}^{\text{ReLU}}$ along $j$ to get an approximation for $g(x, n, v, k)$, adds one additional layer to the ReLU network. According to (B.31), the ReLU approximation of $g(x, n, v, k)$ is presented as
$$ g^{\text{ReLU}}(x, n, v, k) = \frac{1}{(2\pi)^{1/2} R^n (-2)^k k!} \sum_{j=0}^n \frac{C_n^j}{j + 2k + 1} f_{v,k,j}^{\text{ReLU}}. \tag{B.34} $$
By (B.33), we have
$$ |g^{\text{ReLU}}(x, n, v, k) - g(x, n, v, k)| \le \frac{2^n \epsilon}{(2\pi)^{1/2} R^n 2^k k!} \le \epsilon. $$
The proof is complete. $\square$

### C Variants of Score Approximation
#### C.1 Extension to Unconditional Score Approximation
Building upon the foundation established in the proof of our main theorems, we now extend our analysis to unconditional score approximation. Denote the marginal initial distribution of $\mathbf{x}$ by $p(\mathbf{x})$. Furthermore, we denote the marginal distribution of $X_t$ by $p_t(\mathbf{x})$. We point out that our results also apply to the marginal distribution of $\mathbf{x}$. We present the counterpart of Theorem 3.2 and 3.4.

**Proposition C.1 (Counterpart of Theorem 3.2).** Suppose Assumption 3.1 holds. For sufficiently large integer $N > 0$ and constants $C_\sigma, C_\alpha > 0$, by taking $t_0 = N^{-C_\sigma}$ and $T = C_\alpha \log N$, there exists $\mathbf{s}^\star \in \mathcal{F}(M_t, W, \kappa, L, K)$ such that for any and $t \in [t_0, T]$,
$$ \int_{\mathbb{R}^d} \|\mathbf{s}^\star(\mathbf{x}, t) - \nabla \log p_t(\mathbf{x})\|^2 p_t(\mathbf{x}) d\mathbf{x} \lesssim \frac{1}{\sigma_t^4} B^2 N^{-\frac{\beta}{d}} (\log N)^{d+s/2+1}. \tag{C.1} $$
The hyperparameters in the network class $\mathcal{F}$ satisfy
$$ M_t = \mathcal{O}(\sqrt{\log N} / \sigma_t^2), \quad W = \mathcal{O}(N \log^7 N), $$
$$ \kappa = \exp(\mathcal{O}(\log^4 N)), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}(N \log^9 N). $$

**Proposition C.2 (Counterpart of Theorem 3.4).** Suppose Assumption 3.3 holds. For sufficiently large integer $N > 0$ and constants $C_\sigma, C_\alpha > 0$, by taking $t_0 = N^{-C_\sigma}$ and $T = C_\alpha \log N$, there exists $\mathbf{s}^\star \in \mathcal{F}(M_t, W, \kappa, L, K)$ such that for any and $t \in [t_0, T]$,
$$ \int_{\mathbb{R}^d} \|\mathbf{s}^\star(\mathbf{x}, t) - \nabla \log p_t(\mathbf{x})\|^2 p_t(\mathbf{x}) d\mathbf{x} \le \frac{1}{\sigma_t^2} B^2 N^{-\frac{2\beta}{d}} (\log N)^{s+1}. \tag{C.2} $$

### Visual Description
Text-only slide.

---
## Page 62
### Content
The hyperparameters in the network class $\mathcal{F}$ satisfy
$$ M_t = \mathcal{O}(\sqrt{\log N} / \sigma_t), \quad W = \mathcal{O}(N \log^7 N), $$
$$ \kappa = \exp(\mathcal{O}(\log^4 N)), \quad L = \mathcal{O}(\log^4 N), \quad K = \mathcal{O}(N \log^9 N). $$
Note that the marginal density function $p(\mathbf{x})$ fully inherits the regularity assumptions and the subGaussian assumption on the conditional distribution function. Thus, we can derive these results by simply removing the step of approximating the part related to $\mathbf{y}$ in the proof of Lemmas A.4 to A.7 and B.4 to B.7 while keeping other parts of the proof completely the same. To be specific, we perform the same truncation to $\mathbf{x}$ and construct diffused local polynomials without the components of $\mathbf{y}$ to approximate $p_t(\mathbf{x})$ and $\nabla p_t(\mathbf{x})$, which is in the following form:
$$ \Phi_{\mathbf{n,v}}(\mathbf{x}, t) = \prod_{i=1}^d \sum_{k<p} g(x_i, n_i, v_i, k), \tag{C.3} $$
Here we invoke the definition of $g(x, n, v, k)$ in (A.36) under Assumption 3.1 or (B.24) under Assumption 3.3. Moreover, we redefine
$$ f_1(\mathbf{x, y}) = \sum_{\mathbf{v} \in [N]^d} \sum_{\|\mathbf{n}\|_1 \le s} \frac{R^{\|\mathbf{n}\|_1}}{\mathbf{n}!} \frac{\partial^{\mathbf{n}} f}{\partial \mathbf{x}^{\mathbf{n}}} \
## Page 65
### Content
## D Proofs for Section 4.1

### D.1 Notation Recap

Given a score approximator $\mathbf{s}$, we aim to bound the following conditional score
$$ \mathcal{R}(\mathbf{s}) = \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_t, \mathbf{y}} \|\mathbf{s}(\mathbf{x}_t, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{y})\|_2^2 dt. $$

Due to the structure of classifier-free guidance we define in (2.4), we first consider the following mixed score error
$$ \begin{aligned} \mathcal{R}_\star(\mathbf{s}) &= \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_t, \mathbf{y}, \tau} \|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t) - \nabla \log p_t(\mathbf{x}_t|\tau\mathbf{y})\|_2^2 dt & \text{(D.1)} \\ &= \frac{1}{2} \underbrace{\int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_t, \mathbf{y}} \|\mathbf{s}(\mathbf{x}_t, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{y})\|_2^2 dt}_{\mathcal{R}: \text{ conditional score error}} \\ &+ \frac{1}{2} \underbrace{\int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_t} \|\mathbf{s}(\mathbf{x}_t, \emptyset, t) - \nabla \log p_t(\mathbf{x}_t)\|_2^2 dt}_{\mathcal{R}_0: \text{ unconditional score error}}, \end{aligned} $$
which naturally gives rise to the inequality $\mathcal{R}(\mathbf{s}) \le 2\mathcal{R}_\star(\mathbf{s})$. Thus, we only need to analyze the bound of $\mathcal{R}_\star(\mathbf{s})$. In practice, we consider minimizing an equivalent loss of $\mathcal{R}_\star$, which is written as
$$ \mathcal{L}(\mathbf{s}) := \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\mathbf{x}_0, \mathbf{y}} \left[ \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0} \left[ \|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t) - \nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2 \right] \right] dt \quad \text{(D.2)} $$
According to Lemma C.3 in Vincent [2011], (D.1) differs (D.2) by a constant independent of $\mathbf{s}$. Now we consider training the model with $n$ samples $\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n$ by minimizing the corresponding empirical loss
$$ \widehat{\mathcal{L}}(\mathbf{s}) = \frac{1}{n} \sum_{i=1}^n \ell(\mathbf{x}_i, \mathbf{y}_i, \mathbf{s}), \quad \text{(D.3)} $$
where
$$ \ell(\mathbf{x}, \mathbf{y}, \mathbf{s}) := \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ \|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t) - \nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2 \right] dt. \quad \text{(D.4)} $$
Moreover, in order to derive a bounded covering number of our ReLU network function class, we use a truncated loss $\ell^{trunc}(\mathbf{s}, \mathbf{x}, \mathbf{y})$ defined as:
$$ \ell^{trunc}(\mathbf{x}, \mathbf{y}, \mathbf{s}) := \ell(\mathbf{x}, \mathbf{y}, \mathbf{s}) \mathbf{1} \{\|\mathbf{x}\|_\infty \le R\}. $$
Accordingly, we denote the truncated domain of the score function by $\mathcal{D} = [-R, R]^d \times [0, 1]^{d_y} \cup \{\emptyset\}$. We consider the truncated loss function class defined as
$$ \mathcal{S}(R) = \left\{ \ell(\cdot, \cdot, \mathbf{s}) : \mathcal{D} \to \mathbb{R} \mid \mathbf{s} \in \mathcal{F} \right\}. \quad \text{(D.5)} $$

65

### Visual Description
Text-only slide.

---

## Page 66
### Content
### D.2 Proof of Theorem 4.1

Firstly we give a uniform $L_\infty$ bound on $\mathcal{S}(R)$.

**Lemma D.1.** Suppose that we configure the network parameters $M_t, W, \kappa, L, K$ according to Theorem 3.2 or Theorem 3.4 and we denote $m_t = M_t/\sqrt{\log N}$. Then for any $\mathbf{s} \in \mathcal{F}(M_t, W, \kappa, L, K)$ and $(\mathbf{x}, \mathbf{y}) \in \mathcal{D}$, we have $|\ell(\mathbf{s}, \mathbf{x}, \mathbf{y})| \lesssim \int_{t_0}^T m_t^2 dt \triangleq M$. In particular, if we take $t_0 = n^{-O(1)}$ and $T = O(\log n)$, we have $M = O(\log t_0)$ for $m_t = \frac{1}{\sigma_t}$, and $M = O(\frac{1}{t_0})$ for $m_t = \frac{1}{\sigma_t^2}$, respectively.

The proof of the lemma is provided in Appendix D.6.1. Moreover, to convert our approximation guarantee to statistical theory, we need to calculate the covering number of the loss function class $\mathcal{S}(R)$, which is defined as follows.

**Definition D.2.** We denote $\mathcal{N}(\delta, \mathcal{F}, \|\cdot\|)$ to be the $\delta$-covering number of any function class $\mathcal{F}$ w.r.t. the norm $\|\cdot\|$, i.e.,
$$ \mathcal{N}(\delta, \mathcal{F}, \|\cdot\|) = \min \left\{ N : \exists \{f_i\}_{i=1}^N \subseteq \mathcal{F}, \text{s.t. } \forall f \in \mathcal{F}, \exists i \in [N], \|f_i - f\| \le \delta \right\} $$

The following lemma presents the covering number of $\mathcal{S}(R)$:

**Lemma D.3.** Given $\delta > 0$, when $\|\mathbf{x}\|_\infty \le R$, the $\delta$-covering number of the loss function class $\mathcal{S}(R)$ w.r.t. $\|\cdot\|_{L^\infty \mathcal{D}}$ satisfies
$$ \mathcal{N}(\delta, \mathcal{S}(R), \|\cdot\|_{L^\infty \mathcal{D}}) \lesssim \left( \frac{2L^2(W \max(R, T) + 2)\kappa^L W^{L+1} \log N}{\delta} \right)^{2K}. \quad \text{(D.6)} $$
Here the norm $\|\cdot\|_{L^\infty \mathcal{D}}$ is defined as
$$ \|f(\cdot, \cdot)\|_{L^\infty \mathcal{D}} = \max_{\mathbf{x} \in [-R,R]^d, \mathbf{y} \in [0,1]^{d_y} \cup \{\emptyset\}} |f(\mathbf{x}, \mathbf{y})|. $$
The proof is provided in Appendix D.6.2. Particularly, under the network configuration in Theorem 3.2 or Theorem 3.4, we know that log covering number is bounded by
$$ \begin{aligned} \log \mathcal{N} &\lesssim N \log^9 N \left( \text{Poly}(\log \log N) + \text{Poly}(\log \log N) \log N \log R + \log^8 N + \log \frac{1}{\delta} \right) \\ &\lesssim N \log^9 N \left( \log^8 N + \log^2 N \log R + \log \frac{1}{\delta} \right). \end{aligned} \quad \text{(D.7)} $$

With the lemmas above, we begin our proof of Theorem 4.1.

*Proof of Theorem 4.1.* We denote the truth score by $\mathbf{s}^\star(\mathbf{x}, \mathbf{y}, t) = \nabla \log p_t(\mathbf{x}|\mathbf{y})$ if $\mathbf{y} \neq \emptyset$ and $\mathbf{s}^\star(\mathbf{x}, \emptyset, t) = \nabla \log p_t(\mathbf{x})$. We create $n$ i.i.d ghost samples $(\mathbf{x}'_1, \mathbf{y}'_1), (\mathbf{x}'_2, \mathbf{y}'_2), \dots, (\mathbf{x}'_n, \mathbf{y}'_n) \sim \mathcal{P}_{\mathbf{x}, \mathbf{y}}$.
Since $\mathcal{R}_\star(\mathbf{s}^\star) = 0$ and $\mathcal{R}_\star(\mathbf{s})$ differs $\mathcal{L}(\mathbf{s})$ by a constant for any $\mathbf{s}$, it suffices to bound
$$ \mathcal{R}_\star(\widehat{\mathbf{s}}) = \mathcal{R}_\star(\widehat{\mathbf{s}}) - \mathcal{R}_\star(\mathbf{s}^\star) = \mathcal{L}(\widehat{\mathbf{s}}) - \mathcal{L}(\mathbf{s}^\star) = \mathbb{E}_{\{\mathbf{x}'_i, \mathbf{y}'_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\ell(\mathbf{x}'_i, \mathbf{y}'_i, \widehat{\mathbf{s}}) - \ell(\mathbf{x}'_i, \mathbf{y}'_i, \mathbf{s}^\star)) \right]. \quad \text{(D.8)} $$

66

### Visual Description
Text-only slide.

---

## Page 67
### Content
Define
$$ \mathcal{L}_1 = \frac{1}{n} \sum_{i=1}^n (\ell(\mathbf{x}_i, \mathbf{y}_i, \widehat{\mathbf{s}}) - \ell(\mathbf{x}_i, \mathbf{y}_i, \mathbf{s}^\star)), \quad \mathcal{L}_1^{trunc} = \frac{1}{n} \sum_{i=1}^n (\ell^{trunc}(\mathbf{x}_i, \mathbf{y}_i, \widehat{\mathbf{s}}) - \ell^{trunc}(\mathbf{x}_i, \mathbf{y}_i, \mathbf{s}^\star)) $$
and
$$ \mathcal{L}_2 = \frac{1}{n} \sum_{i=1}^n (\ell(\mathbf{x}'_i, \mathbf{y}'_i, \widehat{\mathbf{s}}) - \ell(\mathbf{x}'_i, \mathbf{y}'_i, \mathbf{s}^\star)), \quad \mathcal{L}_2^{trunc} = \frac{1}{n} \sum_{i=1}^n (\ell^{trunc}(\mathbf{x}'_i, \mathbf{y}'_i, \widehat{\mathbf{s}}) - \ell^{trunc}(\mathbf{x}'_i, \mathbf{y}'_i, \mathbf{s}^\star)). $$
We consider decomposing $\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{R}_\star(\widehat{\mathbf{s}})]$ as
$$ \begin{aligned} \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{R}_\star(\widehat{\mathbf{s}})] &= \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \underbrace{\mathbb{E}_{\{\mathbf{x}'_i, \mathbf{y}'_i\}_{i=1}^n} [\mathcal{L}_2 - \mathcal{L}_2^{trunc}]}_{A_2} \right] & \text{(D.9)} \\ &+ \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \underbrace{\mathbb{E}_{\{\mathbf{x}'_i, \mathbf{y}'_i\}_{i=1}^n} [\mathcal{L}_2^{trunc}] - \mathcal{L}_1^{trunc}}_{B} \right] & \text{(D.10)} \\ &+ \underbrace{\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{L}_1^{trunc} - \mathcal{L}_1]}_{A_1} + \underbrace{\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} [\mathcal{L}_1]}_{C}. & \text{(D.11)} \end{aligned} $$

**Bounding Term $A_1$ and $A_2$.** Since we have for any $\mathbf{s} \in \mathcal{F}$, ($\mathbf{s}$ can depend on $\mathbf{x}, \mathbf{y}$)
$$ \begin{aligned} &\mathbb{E}_{\mathbf{x}, \mathbf{y}} [|\ell(\mathbf{x}, \mathbf{y}, \mathbf{s}) - \ell^{trunc}(\mathbf{x}, \mathbf{y}, \mathbf{s})|] \\ &= \int_{t_0}^T \int_{\mathbf{y}} \int_{\|\mathbf{x}\| > R} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} [\|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t) - \nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2] p(\mathbf{x}|\mathbf{y})p(\mathbf{y}) d\mathbf{x} d\mathbf{y} dt \\ &\le 2 \int_{t_0}^T \frac{1}{T - t_0} \int_{\mathbf{y}} \int_{\|\mathbf{x}\| > R} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} [\|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t)\|_2^2 + \|\nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2] p(\mathbf{x}|\mathbf{y})p(\mathbf{y}) d\mathbf{x} d\mathbf{y} dt \\ &\lesssim \int_{t_0}^T \frac{1}{\log N} \int_{\|\mathbf{x}\| > R} \mathbb{E}_{\tau, \mathbf{y}, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} [m_t^2 \log N + \|\nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2] \exp(-C_2 \|\mathbf{x}\|_2^2/2) d\mathbf{x} dt \\ &\lesssim \exp(-C_2 R^2) R \int_{t_0}^T m_t^2 dt + \exp(-C_2 R^2) \int_{t_0}^T \frac{1}{\sigma_t^2} dt \\ &\lesssim \exp(-C_2 R^2) RM, \end{aligned} \quad \text{(D.12)} $$
where the second inequality follows from the subGaussian property of $p(\mathbf{x}|\mathbf{y})$ under either assumption 3.1 or 3.3, and the third inequality invokes the fact $\mathbb{E}_{\mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} [\|\nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2] = 1/\sigma_t^2$. Thus, both terms $A_1$ and $A_2$ are bounded by $\mathcal{O}(\exp(-C_2 R^2) RM)$.

**Bounding Term $B$.** For simplicity, we take $\mathbf{z} = (\mathbf{x}, \mathbf{y})$. We denote $\ell^{trunc}(\mathbf{x}, \mathbf{y}, \widehat{\mathbf{s}})$ by $\widehat{\ell}(\mathbf{z})$ and $\ell^{trunc}(\mathbf{x}, \mathbf{y}, \mathbf{s}^\star)$ by $\ell^\star(\mathbf{z})$. For $\delta > 0$ to be chosen later, let $\mathcal{J} = \{\ell_1, \ell_2, \dots, \ell_{\mathcal{N}}\}$ be a $\delta$-covering of the loss function class $\mathcal{S}(R)$ with the minimum cardinality in the $L^\infty$ metric in the bounded space $\mathcal{D}$, and $J$ be a random variable such that $\|\widehat{\ell} - \ell_J\|_\infty \le \delta$. Moreover, we define $u_j = \max \{A, \sqrt{\mathbb{E}_{\mathbf{z}} [\ell_j(\mathbf{z}) - \ell^\star(\mathbf{z})]}\}$, where $\mathbf{z} \sim \mathcal{P}_{\mathbf{x}, \mathbf{y}}$ is independent of $\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n$. Besides, we define
$$ D = \max_{1 \le j \le \mathcal{N}} \left| \frac{\sum_{i=1}^n (\ell_j(\mathbf{z}_i) - \ell^\star(\mathbf{z}_i)) - (\ell_j(\mathbf{z}'_i) - \ell^\star(\mathbf{z}'_i))}{u_j} \right|. $$

67

### Visual Description
Text-only slide.

---

## Page 68
### Content
Then we can further bound term $B$ as follows:
$$ \begin{aligned} |B| &= \left| \mathbb{E}_{\{\mathbf{z}_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\widehat{\ell}(\mathbf{z}_i) - \ell^\star(\mathbf{z}_i)) - \mathbb{E}_{\{\mathbf{z}'_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\widehat{\ell}(\mathbf{z}'_i) - \ell^\star(\mathbf{z}'_i)) \right] \right] \right| \\ &= \left| \frac{1}{n} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} \left[ \sum_{i=1}^n ((\widehat{\ell}(\mathbf{z}_i) - \ell^\star(\mathbf{z}_i)) - (\widehat{\ell}(\mathbf{z}'_i) - \ell^\star(\mathbf{z}'_i))) \right] \right| \\ &\le \left| \frac{1}{n} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} \left[ \sum_{i=1}^n ((\ell_J(\mathbf{z}_i) - \ell^\star(\mathbf{z}_i)) - (\ell_J(\mathbf{z}'_i) - \ell^\star(\mathbf{z}'_i))) \right] \right| + 2\delta \\ &\le \frac{1}{n} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [u_J D] + 2\delta \\ &\le \frac{1}{2} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [u_J^2] + \frac{1}{2n^2} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [D^2] + 2\delta. \end{aligned} \quad \text{(D.13)} $$
Denote $h_j(\mathbf{z}) = \ell_j(\mathbf{z}) - \ell^\star(\mathbf{z})$ and $\widehat{h}(\mathbf{z}) = \widehat{\ell}(\mathbf{z}) - \ell^\star(\mathbf{z})$. Moreover, we define the truncated population loss as $\mathcal{R}_\star^{trunc}(\mathbf{s}) = \mathbb{E}_{\mathbf{z}} [\widehat{h}]$, and define the truncated empirical loss as $\widehat{\mathcal{R}}_\star^{trunc}(\widehat{\mathbf{s}}) = \frac{1}{n} \sum_{i=1}^n \widehat{h}(\mathbf{z}_i)$. By (D.12) we know that $|\mathcal{R}_\star^{trunc}(\mathbf{s}) - \mathcal{R}_\star(\mathbf{s})| \lesssim \exp(-C_2 R^2) RM$. Now we bound $\mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [u_J^2]$ and $\mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [D^2]$ separately.

**Bounding term $\mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [u_J^2]$.** By the definition of $u_J$, we have
$$ \begin{aligned} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [u_J^2] &\le A^2 + \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [\mathbb{E}_{\mathbf{z}} [h_J(\mathbf{z})]] \\ &\le A^2 + \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [\mathbb{E}_{\mathbf{z}} [\widehat{h}(\mathbf{z})]] + 2\delta \\ &= A^2 + \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [\mathcal{R}_\star^{trunc}(\widehat{\mathbf{s}})] + 2\delta. \end{aligned} \quad \text{(D.14)} $$

**Bounding term $\mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [D^2]$.** Denote $g_j = \sum_{i=1}^n \frac{h_j(\mathbf{z}_i) - h_j(\mathbf{z}'_i)}{u_j}$. It is easy to observe that $\mathbb{E}_{\mathbf{z}_i, \mathbf{z}'_i} [\frac{h_j(\mathbf{z}_i) - h_j(\mathbf{z}'_i)}{u_j}] = 0$ for any $i, j$. By independence of $g_j$, we have
$$ \begin{aligned} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} \left[ \sum_{i=1}^n \left( \frac{h_j(\mathbf{z}_i) - h_j(\mathbf{z}'_i)}{u_j} \right)^2 \right] &\le \sum_{i=1}^n \mathbb{E}_{\mathbf{z}_i, \mathbf{z}'_i} \left[ \left( \frac{h_j(\mathbf{z}_i)}{u_j} \right)^2 + \left( \frac{h_j(\mathbf{z}'_i)}{u_j} \right)^2 \right] \\ &\le M \sum_{i=1}^n \mathbb{E}_{\mathbf{z}_i, \mathbf{z}'_i} \left[ \frac{h_j(\mathbf{z}_i)}{u_j^2} + \frac{h_j(\mathbf{z}'_i)}{u_j^2} \right] \\ &\le 2nM. \end{aligned} $$
Since $|\frac{h_j(\mathbf{z}_i) - h_j(\mathbf{z}'_i)}{u_j}| \le \frac{M}{A}$ and $g_j$ is centered, by Bernstein's Inequality, we have for any $j$,
$$ \text{Pr} [g_j^2 \ge h] = 2 \text{Pr} \left[ \sum_{i=1}^n \frac{h_j(\mathbf{z}_i) - h_j(\mathbf{z}'_i)}{u_j} \ge \sqrt{h} \right] \le 2 \exp \left( -\frac{h/2}{M(2n + \frac{\sqrt{h}}{3A})} \right). $$
Thus, we have
$$ \text{Pr} [D^2 \ge h] \le \sum_{j=1}^{\mathcal{N}} \text{Pr} [g_j^2 \ge h] \le 2\mathcal{N} \exp \left( -\frac{h/2}{M(2n + \frac{\sqrt{h}}{3A})} \right). $$

68

### Visual Description
Text-only slide.

---

## Page 69
### Content
Thus, for any $h_0 > 0$,
$$ \begin{aligned} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [D^2] &= \int_0^{h_0} \text{Pr} [D^2 \ge h] dh + \int_{h_0}^\infty \text{Pr} [D^2 \ge h] dh \\ &\le h_0 + \int_{h_0}^\infty 2\mathcal{N} \exp \left( -\frac{h/2}{M(2n + \frac{\sqrt{h}}{3A})} \right) dh \\ &\le h_0 + 2\mathcal{N} \int_{h_0}^\infty \left[ \exp \left( -\frac{h}{8Mn} \right) + \exp \left( -\frac{3A\sqrt{h}}{4M} \right) \right] dh \\ &\le h_0 + 2\mathcal{N} \left[ 8Mn \exp \left( -\frac{h_0}{8Mn} \right) + \left( \frac{8M\sqrt{h_0}}{3A} + \frac{32M}{9A^2} \right) \exp \left( -\frac{3A\sqrt{h_0}}{4M} \right) \right] \end{aligned} $$
Taking $A = \sqrt{h_0}/6n$ and $h_0 = 8Mn \log \mathcal{N}$, we have
$$ \begin{aligned} \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [D^2] &\le 8Mn \log \mathcal{N} + 2 \left( 8Mn + 16Mn + \frac{16}{\log \mathcal{N}} \right) \\ &\lesssim Mn \log \mathcal{N}. \end{aligned} \quad \text{(D.15)} $$
By applying the bounds (D.14), (D.15) to (D.13), we obtain that
$$ \begin{aligned} \left| \mathbb{E}_{\{\mathbf{z}_i\}_{i=1}^n} [\widehat{\mathcal{R}}_\star^{trunc}(\widehat{\mathbf{s}}) - \mathcal{R}_\star^{trunc}(\widehat{\mathbf{s}})] \right| &\lesssim \frac{1}{2} \left( A^2 + \mathbb{E}_{\{\mathbf{z}_i, \mathbf{z}'_i\}_{i=1}^n} [\mathcal{R}_\star^{trunc}(\widehat{\mathbf{s}})] + 2\delta \right) + \frac{M}{n} \log \mathcal{N} + 2\delta \\ &= \frac{1}{2} \mathbb{E}_{\{\mathbf{z}_i\}_{i=1}^n} [\mathcal{R}_\star^{trunc}(\widehat{\mathbf{s}})] + \frac{M}{n} \log \mathcal{N} + \frac{7
## Page 73
### Content
**D.4 Proof of Proposition 4.3**

First, we derive a lower bound for the entropy number of our proposed density function class.

**Lemma D.6.** For any fixed nonnegative constants $C, C_2$ and $B$ such that
$$\int_{\mathbb{R}^d} C \exp(-C_2 \|x\|_2^2) \text{dx} < 1 < \int_{\mathbb{R}^d} B \exp(-C_2 \|x\|_2^2) \text{dx},$$
the $\epsilon-$ entropy number density function space
$$\mathcal{P} = \left\{ p(\mathbf{x}) = f(\mathbf{x}) \exp(-C_2 \|\mathbf{x}\|_2^2) : f(\mathbf{x}) \in \mathcal{H}^\beta(\mathbb{R}^d, B), f(\mathbf{x}) \geq C > 0 \right\}$$
with respect to $L^1$ norm in the $d-$dimensional ball $\mathcal{B} = \{\mathbf{x} : \|\mathbf{x}\|_2 \leq 2\}$ has a lower bound
$$\log \mathcal{N}(\epsilon, \mathcal{P}, \|\cdot\|_1^{\mathcal{B}}) \gtrsim \left( \frac{1}{\epsilon} \right)^{\frac{d}{\beta}}.$$

The proof of the lemma is provided in Appendix D.6.4. We remark that by replacing $\|\cdot\|_1$ by $\|\cdot\|_2$ in the proof, we can obtain the same lower bound for the entropy number of $\mathcal{P}$ w.r.t. $L^2$ norm, which means that
$$\log \mathcal{N}(\epsilon, \mathcal{P}, \|\cdot\|_1^{\mathcal{B}}) \simeq \log \mathcal{N}(\epsilon, \mathcal{P}, \|\cdot\|_2^{\mathcal{B}}) \geq \epsilon^{-d/\beta}.$$

With the lemma above, we begin our proof of Proposition 4.3.

*Proof of Proposition 4.3.* By Lemma D.6 and the remark above, we have verified the conditions required in Theorem 4 of Yang and Barron [1999] (Condition 3 of the theorem directly holds when we confine the domain of the density function on $\mathcal{B}$). Applying their results gives rise to
$$\inf_{\widehat{\mu}} \sup_{p \in \mathcal{P}} \mathbb{E}_{\{\mathbf{x}_i\}_{i=1}^n} \left[ \|\widehat{\mu} - p\|_1^{\mathcal{B}} \right] \gtrsim n^{-\frac{\beta}{d+2\beta}},$$
so we have
$$\inf_{\widehat{\mu}} \sup_{p \in \mathcal{P}} \mathbb{E}_{\{\mathbf{x}_i\}_{i=1}^n} [\text{TV}(\widehat{\mu}, p)] \geq \inf_{\widehat{\mu}} \sup_{p \in \mathcal{P}} \mathbb{E}_{\{\mathbf{x}_i\}_{i=1}^n} \left[ \|\widehat{\mu} - p\|_1^{\mathcal{B}} \right] \gtrsim n^{-\frac{\beta}{d+2\beta}}.$$
The proof is complete. $\square$

**D.5 Proof of Proposition 4.5**

When $\mathbf{y} = (\mathbf{s}, \mathbf{a})$ is unbounded, we can invoke the corresponding score approximation guarantee in Proposition C.4 and establish the same score estimation theory by following the proof of Theorem 4.1. We present the theory as the following lemma.

**Lemma D.7** (Counterpart of Theorem 4.1). Suppose Assumption 4.4 holds. Given the ReLU neural network $\mathcal{F}(M_t, W, \kappa, L, K)$ in Proposition C.4, by taking the network size parameter $N = n^{\frac{1}{d+d_y+2\beta}}$, the early-stopping time $t_0 = n^{-\mathcal{O}(1)}$ and terminal time $T = \mathcal{O}(\log n)$, the empirical loss minimizer $\widehat{\mathbf{s}}$ satisfies
$$\mathbb{E}_{\{\mathbf{s}'_i, \mathbf{s}_i, \mathbf{a}_i\}_{i=1}^n} [\mathcal{R}(\widehat{\mathbf{s}})] = \mathcal{O} \left( \log \frac{1}{t_0} n^{-\frac{2\beta}{2d_s+d_a+2\beta}} (\log n)^{\max(17, \beta)} \right). \quad (\text{D.25})$$

73

### Visual Description
Text-only slide.

---

## Page 74
### Content
The proof of Lemma D.7 is provided in Appendix D.6.5. Now we begin to prove Proposition 4.5.

*Proof of Proposition 4.5.* By Lemma D.7, we obtain a score estimator $\widehat{\mathbf{s}}$ satisfying
$$\mathbb{E}_{\{\mathbf{s}'_i, \mathbf{s}_i, \mathbf{a}_i\}_{i=1}^n} [\mathcal{R}(\widehat{\mathbf{s}})] = \mathcal{O} \left( \log \frac{1}{t_0} n^{-\frac{2\beta}{2d_s+d_a+2\beta}} (\log n)^{\max(17, \beta)} \right). \quad (\text{D.26})$$
Given the state and action $\mathbf{y}^\star = (\mathbf{s}^\star, \mathbf{a}^\star)$, we can generate an estimated conditional distribution $\widetilde{P}_{t_0}(\cdot|\mathbf{s}^\star, \mathbf{a}^\star)$ using backward diffusion process (2.3). We repeat the proof of Theorem 4.2 until Equation (D.23), obtaining that
$$\text{TV} \left( P(\cdot|\mathbf{s}^\star, \mathbf{a}^\star), \widetilde{P}_{t_0}(\cdot|\mathbf{s}^\star, \mathbf{a}^\star) \right) \lesssim \sqrt{t_0} \log^{(d+1)/2} \frac{1}{t_0} + \exp(-T)$$
$$+ \sqrt{\int_{t_0}^T \frac{1}{2} \int_{\mathcal{X}} p_t(\mathbf{x}|\mathbf{s}^\star, \mathbf{a}^\star) \|\widehat{\mathbf{s}}(\mathbf{x}, \mathbf{s}^\star, \mathbf{a}^\star, t) - \nabla \log p_t(\mathbf{x}|\mathbf{s}^\star, \mathbf{a}^\star)\|^2 \text{dxdt}}$$
$$= \sqrt{t_0} \log^{(d+1)/2} \frac{1}{t_0} + \exp(-T)$$
$$+ \sqrt{\frac{\int_{t_0}^T \mathbb{E}_{\mathbf{x}_t} \left[ \|\widehat{\mathbf{s}}(\mathbf{x}_t, \mathbf{s}^\star, \mathbf{a}^\star, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{s}^\star, \mathbf{a}^\star)\|^2 \right] \text{dt}}{\int_{t_0}^T \mathbb{E}_{\mathbf{x}_t, \mathbf{s}, \mathbf{a}} \left[ \|\widehat{\mathbf{s}}(\mathbf{x}_t, \mathbf{s}, \mathbf{a}, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{s}, \mathbf{a})\|^2 \right] \text{dt}} \cdot \sqrt{\frac{T}{2} \mathcal{R}(\widehat{\mathbf{s}})}}$$
$$\leq \sqrt{t_0} \log^{(d+1)/2} \frac{1}{t_0} + \exp(-T) + \mathcal{T}(\mathbf{s}^\star, \mathbf{a}^\star) \sqrt{\frac{T}{2} \mathcal{R}(\widehat{\mathbf{s}})},$$
where we invoke the definition of $\mathcal{T}(\mathbf{s}^\star, \mathbf{a}^\star)$ in the last inequality. Taking expectations w.r.t. the samples $\{\mathbf{s}'_i, \mathbf{s}_i, \mathbf{a}_i\}_{i=1}^n$ and applying (D.26), we have
$$\mathbb{E}_{\{\mathbf{s}'_i, \mathbf{s}_i, \mathbf{a}_i\}_{i=1}^n} \left[ \text{TV} \left( P(\cdot|\mathbf{s}^\star, \mathbf{a}^\star), \widetilde{P}_{t_0}(\cdot|\mathbf{s}^\star, \mathbf{a}^\star) \right) \right] \lesssim \sqrt{t_0} \log^{(d+1)/2} \frac{1}{t_0} + \exp(-T)$$
$$+ \mathcal{T}(\mathbf{s}^\star, \mathbf{a}^\star) \sqrt{\frac{T}{2} \log \frac{1}{t_0} n^{-\frac{2\beta}{2d_s+d_a+2\beta}} (\log n)^{\max(17, \beta)}}.$$
We can take $t_0 = n^{-\frac{4\beta}{2d_s+d_a+2\beta}-1}$ and $T = \frac{2\beta}{2d_s+d_a+2\beta} \log n$ to bound the expected total variation by
$$\mathbb{E}_{\{\mathbf{s}'_i, \mathbf{s}_i, \mathbf{a}_i\}_{i=1}^n} \left[ \text{TV} \left( P(\cdot|\mathbf{s}^\star, \mathbf{a}^\star), \widetilde{P}_{t_0}(\cdot|\mathbf{s}^\star, \mathbf{a}^\star) \right) \right] = \mathcal{T}(\mathbf{a}) \mathcal{O} \left( n^{-\frac{2\beta}{2d_s+d_a+2\beta}} (\log n)^{\max(19/2, (\beta+2)/2)} \right).$$
We complete our proof. $\square$

**D.6 Proof for Other Lemmas**

**D.6.1 Proof of Lemma D.1**

*Proof.* By the definition of $\ell(\mathbf{x}, \mathbf{y}, \mathbf{s})$, we have for any $\mathbf{x}, \mathbf{y}$ and $\mathbf{s} \in \mathcal{F}$
$$\ell(\mathbf{x}, \mathbf{y}, \mathbf{s}) \leq 2 \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ \|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t)\|_2^2 + \|\nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2 \right] \text{dt}$$
$$\lesssim \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ m_t^2 \log N + \|\nabla \log \phi_t(\mathbf{x}_t|\mathbf{x}_0)\|_2^2 \right] \text{dt}$$
$$\lesssim \int_{t_0}^T M_t^2 \text{dt} + \int_{t_0}^T \frac{1}{T - t_0} \frac{1}{\sigma_t^2} \text{dt} \lesssim \int_{t_0}^T M_t^2 \text{dt} = M,$$

74

### Visual Description
Text-only slide.

---

## Page 75
### Content
where we invoke $|\mathbf{s}| \lesssim m_t \sqrt{\log N}$ for the second inequality and $1/\sigma_t \lesssim m_t$ for the last inequality. $\square$

**D.6.2 Proof of Lemma D.3**

We first introduce a standard result of bounding the covering number of a ReLU neural network.

**Lemma D.8** (Chen et al. [2022a], Lemma.7). Suppose $\delta > 0$ and the input $\mathbf{z}$ satisfies $\|\mathbf{z}\|_\infty \leq R$, the $\delta-$covering number of the neural network class $\mathcal{F}(W, \kappa, L, K)$ w.r.t. $\|\cdot\|_{L_\infty}$ satisfies
$$\mathcal{N} \left( \delta, \mathcal{F}(W, \kappa, L, K), \|\cdot\|_{L_\infty} \right) \leq \left( \frac{2L^2(WR + 2)\kappa^L W^{L+1}}{\delta} \right)^K. \quad (\text{D.27})$$

We remark that our input $(\mathbf{x}, \mathbf{y}, t)$ is uniformly bounded by $\mathcal{O}(\log N)$. Now we begin our proof of Lemma D.3.

*Proof of Lemma D.3.* For any two ReLU network $\mathbf{s}_1, \mathbf{s}_2$ such that $\|\mathbf{s}_1 - \mathbf{s}_2\|_{L_\infty \mathcal{D}} \leq \epsilon$, we can bound the $L_\infty$ error between $\ell(\cdot, \cdot, \mathbf{s}_1)$ and $\ell(\cdot, \cdot, \mathbf{s}_2)$. For any $(\mathbf{x}, \mathbf{y}) \in \mathcal{D}$, we have
$$|\ell(\mathbf{x}, \mathbf{y}, \mathbf{s}_1) - \ell(\mathbf{x}, \mathbf{y}, \mathbf{s}_2)| \leq \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ (\mathbf{s}_1(\mathbf{x}_t, \tau\mathbf{y}, t) - \mathbf{s}_2(\mathbf{x}_t, \tau\mathbf{y}, t))^\top \right.$$
$$\cdot \left. (\mathbf{s}_1(\mathbf{x}_t, \tau\mathbf{y}, t) + \mathbf{s}_2(\mathbf{x}_t, \tau\mathbf{y}, t) - 2\phi_t(\mathbf{x}_t|\mathbf{x}_0)) \right] \text{dt}.$$
$$\lesssim \epsilon \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ \|\mathbf{s}_1(\mathbf{x}_t, \tau\mathbf{y}, t) + \mathbf{s}_2(\mathbf{x}_t, \tau\mathbf{y}, t) - 2\phi_t(\mathbf{x}_t|\mathbf{x}_0)\| \right] \text{dt}$$
$$\lesssim \epsilon \int_{t_0}^T \frac{1}{T - t_0} \mathbb{E}_{\tau, \mathbf{x}_t|\mathbf{x}_0=\mathbf{x}} \left[ m_t \sqrt{\log N} + \|\phi_t(\mathbf{x}_t|\mathbf{x}_0)\| \right] \text{dt}$$
$$\lesssim \frac{\epsilon}{T - t_0} \left( \sqrt{\log N} \int_{t_0}^T m_t \text{dt} + \int_{t_0}^T \frac{1}{\sigma_t} \text{dt} \right) \lesssim \epsilon \log N. \quad (\text{D.28})$$
For the second inequality, we invoke $|\mathbf{s}(\mathbf{x}_t, \tau\mathbf{y}, t)| \leq m_t \sqrt{\log N}$. In the last inequality, we invoke
$$m_t \leq \frac{1}{\sigma_t^2} \leq \mathcal{O} \left( \frac{1}{t} \right) \text{ when } t = o(1) \text{ and } m_t = \mathcal{O}(1) \text{ when } t \gg 1.$$
and the inequality
$$\frac{1}{T - t_0} \lesssim \frac{1}{\log N}.$$
Since $\mathcal{F}$ is a concatenation of two ReLU neural networks of the same size and the domain of the input $\mathbf{z} = (\mathbf{x}, \mathbf{y}, t)$ (or $\mathbf{z} = (\mathbf{x}, t)$ for the unconditional score approximator) satisfies $\|\mathbf{z}\|_\infty \leq \max(R, T)$, by Lemma D.8 we have the covering number of $\mathcal{F}$ bounded as
$$\mathcal{N} \left( \delta, \mathcal{F}, \|\cdot\|_{L_\infty \mathcal{D}} \right) \lesssim \left( \frac{2L^2(W \max(R, T) + 2)\kappa^L W^{L+1}}{\delta} \right)^{2K}. \quad (\text{D.29})$$
Combining this result with (D.28), we can bound the covering number of $S(R)$ as
$$\mathcal{N} \left( \delta, S(R), \|\cdot\|_{L_\infty \mathcal{D}} \right) \lesssim \left( \frac{2L^2(W \max(R, T) + 2)\kappa^L W^{L+1} \log N}{\delta} \right)^{2K}. \quad (\text{D.30})$$
The proof is complete. $\square$

75

### Visual Description
Text-only slide.

---

## Page 76
### Content
**D.6.3 Proof of Lemma D.5**

*Proof.* For any $\mathbf{y} \in [0, 1]^{d_y}$, we have
$$p(\mathbf{x}|\mathbf{y}) - p_t(\mathbf{x}|\mathbf{y})$$
$$= p(\mathbf{x}|\mathbf{y}) - \int_{\mathbb{R}^d} p(\mathbf{z}|\mathbf{y}) \frac{1}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dz}$$
$$= \int_{\mathbb{R}^d} (p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})) \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dz} + (\alpha_t^d - 1)p_t(\mathbf{x}|\mathbf{y})$$
$$= \int_{A_x} (p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})) \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dz}$$
$$+ \int_{\mathbb{R}^d \setminus A_x} (p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})) \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dz} + (\alpha_t^d - 1)p_t(\mathbf{x}|\mathbf{y}),$$
where we take $A_x = \left[ \frac{\mathbf{x} - \sigma_t C \sqrt{\log \epsilon_1^{-1}}}{\alpha_t}, \frac{\mathbf{x} + \sigma_t C \sqrt{\log \epsilon_1^{-1}}}{\alpha_t} \right]$ for some constant $C$ such that
$$\left| \int_{\mathbb{R}^d \setminus A_x} (p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})) \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dz} \right| \leq \epsilon_1.$$
By Lemma A.9 or (B.29), we know
$$p_t(\mathbf{x}|\mathbf{y}) \leq \frac{C_1}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right)$$
under Assumption 3.1 and
$$p_t(\mathbf{x}|\mathbf{y}) \leq \frac{B}{(\alpha_t^2 + C_2 \sigma_t^2)^{d/2}} \exp \left( \frac{-C_2 \|\mathbf{x}\|_2^2}{2(\alpha_t^2 + C_2 \sigma_t^2)} \right)$$
under Assumption 3.3. Since $\alpha_t^2 + C_2 \sigma_t^2 \leq \max(1, C_2)$, $p_t$ is bounded by a constant only dependent on $C_1$ (or $B$) and $C_2$. Moreover, since both $p(\mathbf{x}|\mathbf{y})$ and $p_t(\mathbf{x}|\mathbf{y})$ have subGaussian tails, we know that there exists another constant $C'$ such that for any $\epsilon_2 < 1$,
$$\int_{\mathbb{R}^d \setminus B_x} |p(\mathbf{x}|\mathbf{y}) - p_t(\mathbf{x}|\mathbf{y})| \text{dx} \leq \epsilon_2, \text{ where } B_x = \left[ -C' \sqrt{\log \epsilon_2^{-1}}, C' \sqrt{\log \epsilon_2^{-1}} \right]^d.$$

76

### Visual Description
Text-only slide.

---

## Page 77
### Content
Thus, the total variation between $P(\cdot|\mathbf{y})$ and $P_t(\cdot|\mathbf{y})$ can be bounded as
$$\text{TV}(P(\cdot|\mathbf{y}), P_t(\cdot|\mathbf{y})) = \int_{B_x} |p(\mathbf{x}|\mathbf{y}) - p_t(\mathbf{x}|\mathbf{y})| \text{dx} + \int_{\mathbb{R}^d \setminus B_x} |p(\mathbf{x}|\mathbf{y}) - p_t(\mathbf{x}|\mathbf{y})| \text{dx}$$
$$\leq \int_{B_x} \int_{A_x} |p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})| \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dzdx}$$
$$+ \int_{B_x} \int_{\mathbb{R}^d \setminus A_x} |p(\mathbf{x}|\mathbf{y}) - p(\mathbf{z}|\mathbf{y})| \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dzdx}$$
$$+ \int_{B_x} |\alpha_t^d - 1| p_t(\mathbf{x}|\mathbf{y}) \text{dx} + \epsilon_2$$
$$\leq \int_{B_x} \int_{A_x} \frac{2\sigma_t C \sqrt{d \log \epsilon_1^{-1}} B}{\alpha_t} \frac{\alpha_t^d}{\sigma_t^d (2\pi)^{d/2}} \exp \left( -\frac{\|\alpha_t \mathbf{z} - \mathbf{x}\|^2}{2\sigma_t^2} \right) \text{dzdx}$$
$$+ \int_{B_x} \epsilon_1 \text{dx} + |\alpha_t^d - 1| + \epsilon_2$$
$$\leq \left( \frac{2\sigma_t C \sqrt{d \log \epsilon_1^{-1}} B}{\alpha_t} + \epsilon_1 \right) (2C' \sqrt{\log \epsilon_2^{-1}})^d + |1 - \exp(-dt/2)| + \epsilon_2.$$
When $t = t_0 = n^{-\mathcal{O}(1)} = o(1)$, we take $\epsilon_1 = \epsilon_2 = t_0$. Since $\frac{\sigma_t}{\alpha_t} = \mathcal{O}(\sqrt{t})$ when $t = o(1)$, we have
$$\text{TV}(P(\cdot|\mathbf{y}), P_{t_0}(\cdot|\mathbf{y})) = \mathcal{O} \left( \sqrt{t_0} \log^{(d+1)/2} \frac{1}{t_0} \right). \quad (\text{D.31})$$
The proof is complete. $\square$

**D.6.4 Proof of Lemma D.6**

To prove Lemma D.6, we first introduce a standard result for the entropy number of binary variables.

**Lemma D.9** (Varshamov-Gilbert bound, see, e.g., Lemma 1 in Azizyan et al. [2013]). Suppose that $N \geq 8$. Let $\mathcal{I} = \{ \gamma = (\gamma_1, \gamma_2, \dots, \gamma_N) : \gamma_i \in \{0, 1\}, 1 \leq i \leq N \}$. There exists $\gamma^{(1)}, \gamma^{(2)}, \dots, \gamma^{(M)} \in \mathcal{I}$ such that $M \geq 2^{N/8}$ and $\|\gamma^{(i)} - \gamma^{(j)}\|_1 \geq N/8$ for $1 \leq i < j \leq N$.

Now we begin our proof of Lemma D.6.

*Proof of Lemma D.6.* Let $C' = \frac{1}{\int_{\mathbb{R}^d} \exp(-C_2 \|x\|_2^2) \text{dx}}$, then we have $C < C' < B$. Denote $B' = \min(B - C', C' - C, 1)$. We use the following basis function to construct a large set of functions in $\mathcal{P}$ that is $\epsilon-$distinguishable. Let
$$\varphi(\mathbf{x}) = \begin{cases} a \prod_{i=1}^d (1 + x_i)^\beta (1 - x_i)^\beta, & \text{if } \|\mathbf{x}\|_\infty \leq 1, \\ 0, & \text{otherwise,} \end{cases}$$
where we choose $a$ such that $\varphi(\mathbf{x}) \in \mathcal{H}^\beta(B')$. Let $c = \|\varphi\|_1$. In the hyper ball $\mathcal{B} = \{ \mathbf{x} : \|\mathbf{x}\|_2 \leq 1 \}$, we choose a $2\Delta-$ distinguishable set of points (in $L_\infty$ norm)
$$\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_m,$$

77

### Visual Description
Text-only slide.

---

## Page 78
### Content
and we take
$$\Delta = \left( \frac{\epsilon}{a} \right)^{\frac{1}{\beta}}.$$
Then we know that $m$ can be taken of order $\Delta^{-d} = \epsilon^{-d/\beta}$. Now we consider a set of functions in the form
$$f_\gamma(\mathbf{x}) = \sum_{j=1}^m \gamma_j \Delta^\beta \varphi \left( \frac{\mathbf{x} - \mathbf{x}_j}{\Delta} \right), \gamma_j \in \{0, 1\}.$$
Since the support of the $m$ basis functions $\left\{ \varphi \left( \frac{\mathbf{x} - \mathbf{x}_j}{\Delta} \right) \right\}_{j=1}^m$ do not intersect, we have for any $\gamma, \gamma' \in \{0, 1\}^m$,
$$\|f_\gamma - f_{\gamma'}\|_1^{\mathcal{B}} = \sum_{j=1}^m |\gamma_j - \gamma'_j| \Delta^{\beta+d} \|\varphi\|_1^{\mathcal{B}} = c \Delta^{\beta+d} \|\gamma - \gamma'\|_1,$$
where the norm $\|\cdot\|_1^{\mathcal{B}}$ is defined as $\|f\|_1^{\mathcal{B}} = \int_{\mathcal{B}} |f(\mathbf{x})| \text{dx}$. By Lemma D.9, there exists a subset $\mathcal{G} \subseteq \{0, 1\}^m$ with cardinality $\|\mathcal{G}\| \geq 2^{\frac{m}{8}}$ such that for any $\gamma, \gamma' \in \mathcal{G}$ and $\gamma \neq \gamma'$, we have
$$\|\gamma - \gamma'\|_1 \geq \frac{m}{8}.$$
Thus, we can construct a set of functions $\mathcal{U} = \{ f_\gamma : \gamma \in \mathcal{G} \}$ that is $c \Delta^{\beta+d} m / 8 = \Omega(\epsilon)$- distinguishable with respect to $L^1$ norm. Now we consider constructing the density function as follows
$$g_\gamma(\mathbf{x}) = \exp(-C_2 \|\mathbf{x}\|_2^2) (C' + f_\gamma(\mathbf{x}) + s_\gamma h(\mathbf{x}, \epsilon_\gamma))$$
where we take $s_\gamma \in \{-1, 1\}$ and
$$h(\mathbf{x}, \epsilon_\gamma) = \epsilon
## Page 81
### Content
We note that the first part of the score function can be seen as a linear mapping of $\mathbf{x}$ and $\mathbf{y}$, i.e.,
$$-\left(\sigma^2 \mathbf{I}_m + \frac{\sigma_t^2}{\alpha_t^2} \mathbf{H}\mathbf{H}^\top\right)^{-1} \left(\mathbf{y} - \frac{1}{\alpha_t} \mathbf{H}\mathbf{x}\right) = [\mathbf{A}(t), \mathbf{B}(t)] \left[\mathbf{y}^\top, \mathbf{x}^\top\right]^\top.$$

To be specific, suppose the singular value decomposition of $\mathbf{H}$ is $\mathbf{H} = \mathbf{P}^\top \mathbf{H}_0 \mathbf{U}$, where $\mathbf{H}_0 = [\text{diag}(\mu_1, \mu_2, \dots, \mu_m), \mathbf{0}, \dots, \mathbf{0}]$ satisfies $|\mu_1| \ge |\mu_2| \ge \dots \ge |\mu_m|$, and $\mathbf{P} \in \mathbb{R}^{m \times m}, \mathbf{U} \in \mathbb{R}^{d \times d}$ are two orthogonal matrices. We denote $\lambda_i = \mu_i^2$ and diagonalize $\sigma^2 \mathbf{I}_m + \frac{\sigma_t^2}{\alpha_t^2} \mathbf{H}\mathbf{H}^\top$ as $\mathbf{P}^\top \left(\sigma^2 \mathbf{I}_m + \frac{\sigma_t^2}{\alpha_t^2} \mathbf{D}\right) \mathbf{P}$, where $\mathbf{D} = \text{diag}(\lambda_1, \lambda_2, \dots, \lambda_m)$ is a diagonal matrix. Since $\frac{\sigma_t^2}{\alpha_t^2} = e^t - 1$, we have
$$\left(\sigma^2 \mathbf{I}_m + \frac{\sigma_t^2}{\alpha_t^2} \mathbf{H}\mathbf{H}^\top\right)^{-1} = \mathbf{P}^\top \text{diag} \left(\frac{1}{\sigma^2 + (e^t - 1)\lambda_1}, \frac{1}{\sigma^2 + (e^t - 1)\lambda_2}, \dots, \frac{1}{\sigma^2 + (e^t - 1)\lambda_m}\right) \mathbf{P}.$$

Thus, we can express the linear mappings $\mathbf{A}(t)$ and $\mathbf{B}(t)$ as
$$\mathbf{A}(t) = -\mathbf{P}^\top \text{diag} \left(\frac{1}{\sigma^2 + (e^t - 1)\lambda_1}, \frac{1}{\sigma^2 + (e^t - 1)\lambda_2}, \dots, \frac{1}{\sigma^2 + (e^t - 1)\lambda_m}\right) \mathbf{P}, \text{ and} \tag{E.4}$$
$$\begin{aligned} \mathbf{B}(t) &= -\mathbf{P}^\top \text{diag} \left(\frac{e^{t/2}}{\sigma^2 + (e^t - 1)\lambda_1}, \frac{e^{t/2}}{\sigma^2 + (e^t - 1)\lambda_2}, \dots, \frac{e^{t/2}}{\sigma^2 + (e^t - 1)\lambda_m}\right) \mathbf{P}\mathbf{H} \\ &= -\mathbf{P}^\top \left[\text{diag} \left(\frac{e^{t/2} \mu_1}{\sigma^2 + (e^t - 1)\lambda_1}, \frac{e^{t/2} \mu_2}{\sigma^2 + (e^t - 1)\lambda_2}, \dots, \frac{e^{t/2} \mu_m}{\sigma^2 + (e^t - 1)\lambda_m}\right), \mathbf{0}, \dots, \mathbf{0}\right] \mathbf{U}. \end{aligned} \tag{E.5}$$

For any $N > 0$, using Lemmas F.5, F.6 and F.8, we can construct a ReLU neural network $\mathcal{F}_1(M_{t,1}, W_1, \kappa_1, L_1, K_1)$ that gives rise to a mapping $\mathbf{s}_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t)$ such that
$$\left\| \mathbf{s}_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) - [\mathbf{A}(t), \mathbf{B}(t)] \left[\mathbf{y}^\top, \mathbf{x}^\top\right]^\top \right\|_\infty \le N^{-\frac{2\beta}{d}}$$
when $t \in [t_0, T]$ and $\|[\mathbf{x}, \mathbf{y}]\|_\infty \le R\sqrt{\log N}$ for some constant $R > 0$ to be chosen later. Moreover, we can clip the function value of $\mathbf{s}_1^{\text{ReLU}}$ so that
$$\left\| \mathbf{s}_1^{\text{ReLU}}(\mathbf{x}, \mathbf{y}, t) \right\|_\infty \le \max_{t \in [t_0, T], \|[\mathbf{x}, \mathbf{y}]\|_\infty \le R\sqrt{\log N}} \left\| [\mathbf{A}(t), \mathbf{B}(t)] \left[\mathbf{y}^\top, \mathbf{x}^\top\right]^\top \right\|_\infty \le \frac{R\sqrt{(d + d_y) \log N}}{\lambda_\star},$$
where $\lambda_\star = \min_{t \ge t_0, i \in [m]} \frac{\sigma^2 + (e^t - 1)\lambda_i}{\sqrt{e^t \lambda_i}}$ satisfies $\lambda_\star \ge \sigma^2 / \sqrt{\lambda_i} = \Omega(1)$ according to our assumption on $\sigma$ and $\lambda_i$. Details about how to determine the network size and the error propagation are deferred to Appendix F.4.6, where we verify that the network parameters $(M_{t,1}, W_1, \kappa_1, L_1, K_1)$ satisfy
$$M_{t,1} = \mathcal{O}(\sqrt{\log N}), \quad W_1 = \mathcal{O}(\log^3 N),$$
$$\kappa_1 = \exp(\mathcal{O}(\log^2 N)), \quad L_1 = \mathcal{O}(\log^2 N), \quad K_1 = \mathcal{O}(\log^4 N).$$

Furthermore, since $p(\mathbf{x})$ has subGaussian tails, we know that the distribution of $\mathbf{y}$ also has subGaussian tails. Therefore, we can choose an appropriate constant $R$ and follow the proof of the score approximation theory with unbounded $\mathbf{y}$ (Proposition C.4) to establish approximation guarantees with the following $L_2$ error:
$$\mathbb{E}_{\mathbf{y} \sim P_{\mathbf{y}}} \left[ \mathbb{E}_{\mathbf{x} \sim P_t(\cdot|\mathbf{y})} \left[ \left\| \mathbf{s}_1^\star(\mathbf{x}, \mathbf{y}, t) - [\mathbf{A}(t), \mathbf{B}(t)] \left[\mathbf{y}^\top, \mathbf{x}^\top\right]^\top \right\|^2 \right] \right] \lesssim N^{-\frac{2\beta}{d}} \log^2 N. \tag{E.6}$$

81

### Visual Description
Text-only slide.

---

## Page 82
### Content
The dependence on $\log N$ results from the truncation of $\mathbf{x}$ and $\mathbf{y}$.
For the second part of the score function in (E.3), i.e., $\nabla \log p_t(\mathbf{x})$, we can apply our approximation theory for the unconditional distribution $p_t(\mathbf{x})$ in Proposition C.2. So there exists $\mathbf{s}_2^\star \in \mathcal{F}_2(M_{t,2}, W_2, \kappa_2, L_2, K_2)$ such that for any and $t \in [t_0, T]$,
$$\int_{\mathbb{R}^d} \|\mathbf{s}_2^\star(\mathbf{x}, t) - \nabla \log p_t(\mathbf{x})\|^2 p_t(\mathbf{x}) d\mathbf{x} \lesssim \frac{1}{\sigma_t^2} B^2 N^{-\frac{2\beta}{d}} (\log N)^{s+1}. \tag{E.7}$$
The hyperparameters in the network class $\mathcal{F}$ satisfy
$$M_{t,2} = \mathcal{O}(\sqrt{\log N} / \sigma_t), \quad W_2 = \mathcal{O}(N \log^7 N) \tag{E.8}$$
$$\kappa_2 = \exp(\mathcal{O}(\log^4 N)), \quad L_2 = \mathcal{O}(\log^4 N), \quad K_2 = \mathcal{O}(N \log^9 N). \tag{E.9}$$
By aggregating these two networks $\mathcal{F}_1$ and $\mathcal{F}_2$ together, we derive a ReLU network that contains a score approximator with small $L_2$ error of $\mathcal{O}\left(\frac{1}{\sigma_t^2} B^2 N^{-\frac{2\beta}{d}} (\log N)^{s+1}\right)$. That is to say, there exists $\mathbf{s}^\star \in \mathcal{F}(M_t, W, \kappa, L, K)$ such that for any and $t \in [t_0, T]$,
$$\mathbb{E}_{\mathbf{x}_t, \mathbf{y}} \|\mathbf{s}^\star(\mathbf{x}_t, \mathbf{y}, t) - \nabla \log p_t(\mathbf{x}_t|\mathbf{y})\|^2 \lesssim \frac{1}{\sigma_t^2} B^2 N^{-\frac{2\beta}{d}} (\log N)^{s+1}. \tag{E.10}$$
Here the hyperparameters in the network class $\mathcal{F}$ also satisfy (E.8) and (E.9).
Now, we can plug in the score approximation error bound (E.10) in the proof of Theorem 4.1 and take $N = n^{\frac{d}{d+2\beta}}$, obtaining that
$$\mathbb{E}_{\{\mathbf{z}_i\}_{i=1}^n} [\mathcal{R}(\hat{\mathbf{s}})] \lesssim \log \frac{1}{t_0} n^{-\frac{2\beta}{d+2\beta}} \log^{\max(17, (\beta+1)/2)} n. \tag{E.11}$$
After that, to convert our score estimation theory to the distribution estimation theory, we repeat the proof of Proposition 4.5 with a similarly defined distribution shift $\mathcal{T}(\mathbf{y})$. By taking $t_0 = n^{-\frac{4\beta}{d+2\beta}-1}$ and $T = \frac{2\beta}{d+2\beta} \log n$, we have
$$\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \text{TV} \left( \tilde{P}_{t_0}(\cdot|\mathbf{y}), P(\cdot|\mathbf{y}) \right) \right] = \mathcal{T}(\mathbf{y}) \mathcal{O} \left( n^{-\frac{\beta}{d+2\beta}} (\log n)^{\max(19/2, (\beta+2)/2)} \right).$$
To derive the estimation error of the posterior mean, we first prove that the generated distribution $\tilde{P}_{t_0}(\cdot|\mathbf{y})$ has subGaussian tails. Recall that $\tilde{P}_{t_0}(\cdot|\mathbf{y})$ is generated by the backward diffusion process
$$d\tilde{\mathbf{X}}_t^\leftarrow = \left[ \frac{1}{2} \tilde{\mathbf{X}}_t^\leftarrow + \hat{\mathbf{s}}(\tilde{\mathbf{X}}_t, \mathbf{y}, T-t) \right] dt + d\bar{\mathbf{W}}_t, \quad \tilde{\mathbf{X}}_0^\leftarrow \sim \mathbf{N}(0, \mathbf{I}), \quad 0 \le t \le T - t_0,$$
and $\tilde{P}_{t_0}(\cdot|\mathbf{y})$ is the distribution of $\tilde{\mathbf{X}}_{T-t_0}$. By the choice of score network $\mathcal{F}$, there exists a constant $C$ such that $\|\hat{\mathbf{s}}(\mathbf{x}, \mathbf{y}, t)\|_\infty \le \frac{C\sqrt{\log n}}{\sigma_t}$ for all $\mathbf{x}, \mathbf{y}$ and $t_0 \le t \le T$. Therefore, we can construct two auxiliary random variables $\tilde{Y}_t^\leftarrow$ and $\tilde{Z}_t^\leftarrow$ as the lower bound and upper bound of $\tilde{X}_t$, which satisfy the following stochastic process:
$$d\tilde{Y}_t^\leftarrow = \left[ \frac{1}{2} \tilde{X}_t^\leftarrow + \frac{C\sqrt{\log n}}{\sigma_{T-t}} \right] dt + d\bar{W}_t, \quad \tilde{Y}_0^\leftarrow \sim \mathbf{N}(0, I),$$
$$d\tilde{Z}_t^\leftarrow = \left[ \frac{1}{2} \tilde{X}_t^\leftarrow - \frac{C\sqrt{\log n}}{\sigma_{T-t}} \right] dt + d\bar{W}_t, \quad \tilde{Z}_0^\leftarrow \sim \mathbf{N}(0, I).$$

82

### Visual Description
Text-only slide.

---

## Page 83
### Content
Suppose the three processes share the same random noise $\bar{W}_t$. Then we have $\tilde{Z}_t^\leftarrow \le \tilde{X}_t^\leftarrow \le \tilde{Y}_t^\leftarrow$.
Let $M = \int_{t_0}^T \frac{C\sqrt{\log n}}{\sigma_t} dt = \mathcal{O}(\log^{3/2} n)$. Then we have $\tilde{Y}_{T-t_0}^\leftarrow \sim \mathbf{N}(M \cdot \mathbf{1}, I)$ and $\tilde{Z}_{T-t_0}^\leftarrow \sim \mathbf{N}(-M \cdot \mathbf{1}, I)$.
Thus, by the subGaussian tail of $\tilde{Y}_{T-t_0}^\leftarrow$ and $\tilde{Z}_{T-t_0}^\leftarrow$ we know that
$$\text{Pr} \left[ \left\| \tilde{\mathbf{X}}_{T-t_0}^\leftarrow \right\|_\infty \ge M + u \right] \le 2 \exp(-u^2/2).$$
Let $u = \sqrt{\frac{2\beta}{d+2\beta} \max(1/C_2, 1) \log n}$. We have both
$$\left\| \mathbb{E}_{\mathbf{x} \sim \tilde{P}_{t_0}(\cdot|\mathbf{y})} [\mathbf{1}\{\|\mathbf{x}\|_\infty \ge M + u\} \mathbf{x}] \right\| \lesssim n^{-\frac{\beta}{d+2\beta}}$$
and
$$\left\| \mathbb{E}_{\mathbf{x} \sim P(\cdot|\mathbf{y})} [\mathbf{1}\{\|\mathbf{x}\|_\infty \ge M + u\} \mathbf{x}] \right\| \lesssim n^{-\frac{\beta}{d+2\beta}}.$$
Therefore, we have
$$\begin{aligned} &\mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \left\| \mathbb{E}_{P(\cdot|\mathbf{y})} [\mathbf{x}] - \mathbb{E}_{\tilde{P}_{t_0}(\cdot|\mathbf{y})} [\mathbf{x}] \right\| \right] \\ &\lesssim n^{-\frac{\beta}{d+2\beta}} + \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \left\| \mathbb{E}_{\mathbf{x} \sim P(\cdot|\mathbf{y})} [\mathbf{1}\{\|\mathbf{x}\|_\infty < M + u\} \mathbf{x}] - \mathbb{E}_{\mathbf{x} \sim \tilde{P}_{t_0}(\cdot|\mathbf{y})} [\mathbf{1}\{\|\mathbf{x}\|_\infty < M + u\} \mathbf{x}] \right\| \right] \\ &\le n^{-\frac{\beta}{d+2\beta}} + \mathbb{E}_{\{\mathbf{x}_i, \mathbf{y}_i\}_{i=1}^n} \left[ \text{TV} \left( \tilde{P}_{t_0}(\cdot|\mathbf{y}), P(\cdot|\mathbf{y}) \right) \right] (M + u) \\ &\lesssim \mathcal{T}(\mathbf{y}) \mathcal{O} \left( n^{-\frac{\beta}{d+2\beta}} (\log n)^{\max(11, (\beta+5)/2)} \right). \end{aligned}$$
We complete our proof. $\square$

# F Basics on ReLU Approximation
## F.1 Construction of a Large ReLU Network
In the construction of ReLU neural networks, we often need to concatenate sub-networks that approximate some basic functions to express more complicated functions. We provide the following lemmas for the concatenation and further operations among sub-networks.

**Lemma F.1** (Concatenation, Remark 13 of Nakada and Imaizumi [2020]). For a series of ReLU networks $f_1 : \mathbb{R}^{d_1} \to \mathbb{R}^{d_2}, f_2 : \mathbb{R}^{d_2} \to \mathbb{R}^{d_3}, \dots, f_k : \mathbb{R}^{d_k} \to \mathbb{R}^{d_{k+1}}$ with $f_i \in \mathcal{F}(W_i, \kappa_i, L_i, K_i)$ ($i = 1, 2, \dots, d$), there exists a neural network $f \in \mathcal{F}(W, \kappa, L, K)$ satisfying $f(x) = f_k \circ f_{k-1} \circ \dots \circ f_1(x)$ for all $x \in \mathbb{R}^{d_1}$, with
$$L = \sum_{i=1}^k L_i, \quad W \le 2 \sum_{i=1}^k W_i, \quad K \le 2 \sum_{i=1}^k K_i, \quad \text{and } \kappa \le \max_{1 \le i \le k} \kappa_i. \tag{F.1}$$

**Lemma F.2** (Identity function). Given $d \in \mathbb{N}$ and $L \ge 2$, there exists $f_{id}^L \in \mathcal{F}(2d, 1, L, 2dL)$ that realizes an $L$-layer $d$-dimensional identity map $f_{id}^L(x) = x, x \in \mathbb{R}^d$.

*Proof.* The identity function can be exactly expressed by an $L$-layer ReLU network with $A_1 = I_d, A_2 = A_3 = \dots = A_L = [I_d, -I_d]^\top$ and $b_1 = b_2 = \dots = b_L = \mathbf{0}_d$. The proof is complete. $\square$

83

### Visual Description
Text-only slide.

---

## Page 84
### Content
Thus, when we need to conduct operations among sub-networks with different numbers of layers $L$, we could fill in the identity networks with an appropriate number of layers before the shallow sub-networks so that all these sub-networks have the same number of layers, which brings convenience to their concatenation and further interaction.

**Lemma F.3** (Parallelization and Summation, Lemma F.3 of Oko et al. [2023]). For any neural networks $f_1, f_2, \dots, f_k$ with $f_i : \mathbb{R}^{d_i} \to \mathbb{R}^{d'_i}$ and $f_i \in \mathcal{F}(W_i, \kappa_i, L_i, K_i)$ ($i = 1, 2, \dots, d$), there exists a neural network $f \in \mathcal{F}(W, \kappa, L, K)$ satisfying $f(x) = [f_1(x_1)^\top f_2(x_2)^\top \dots f_k(x_k)^\top]^\top : \mathbb{R}^{d_1+d_2+\dots+d_k} \to \mathbb{R}^{d'_1+d'_2+\dots+d'_k}$ for all $x = (x_1^\top x_2^\top \dots x_k^\top)^\top \in \mathbb{R}^{d_1+d_2+\dots+d_k}$ (here $x_i$ can be shared), with
$$L = \max_{1 \le i \le k} L_i, \quad W \le 2 \sum_{i=1}^k W_i, \quad K \le 2 \sum_{i=1}^k (K_i + L d'_i), \quad \text{and } \kappa \le \max\{ \max_{1 \le i \le k} \kappa_i, 1 \}. \tag{F.2}$$
Moreover, for $x_1 = x_2 = \dots = x_k = x \in \mathbb{R}^d$ and $d'_1 = d'_2 = \dots = d'_k = d'$, there exists $f_{\text{sum}}(x) \in \mathcal{F}(W, \kappa, L, K)$ that expresses $f_{\text{sum}}(x) = \sum_{i=1}^k f_i(x)$, with
$$L = \max_{1 \le i \le k} L_i + 1, \quad W \le 4 \sum_{i=1}^k W_i, \quad K \le 4 \sum_{i=1}^k (K_i + L d'_i) + 2W, \quad \text{and } \kappa \le \max\{ \max_{1 \le i \le k} \kappa_i, 1 \}. \tag{F.3}$$

**Lemma F.4** (Entry-wise Minimum and Maximum). For any two neural networks $f_1, f_2$ with $f_i : \mathbb{R}^d \to \mathbb{R}^{d'}$, $f_i \in \mathcal{F}(W_i, \kappa_i, L_i, K_i)$ ($i = 1, 2$) and $L_1 \ge L_2$, there exists a neural network $f \in \mathcal{F}(W, \kappa, L, K)$ satisfying $f(x) = \min(f_1(x), f_2(x))$ (or $\max(f_1(x), f_2(x))$) for all $x \in \mathbb{R}^d$, with
$$L = L_1 + 1, \quad W \le 2(W_1 + W_2), \quad K \le 2(K_1 + K_2) + 2(L_1 - L_2)d', \quad \text{and } \kappa \le \max\{ \max_{1 \le i \le 2} \kappa_i, 1 \}.$$

*Proof.* First we use Lemma F.2 to add $(L_1 - L_2)$ layers to $f_2$ without changing its output, i.e., $f'_2 = f_{id}^{L_1-L_2} \circ f_2$. Then we concatenate $f_1$ and $f'_2$ and add a new layer to realize $\max(f_1, f_2) = \sigma(f_1 - f_2) + f_2$ or $\min(f_1, f_2) = f_1 - \sigma(f_1 - f_2)$. According to the lemmas above, the network hyperparameters $(W, \kappa, L, K)$ satisfy
$$L = L_1 + 1, \quad W \le 2(W_1 + W_2), \quad K \le 2(K_1 + K_2) + 2(L_1 - L_2)d', \quad \text{and } \kappa \le \max\{ \max_{1 \le i \le 2} \kappa_i, 1 \}.$$
The proof is complete. $\square$

This lemma helps us to resolve problems caused by unboundedness in the sample complexity analysis of the conditional diffusion model. To be specific, we can easily apply Lemma F.4 to implement the clipping operation:
$$f_{\text{clip}, R}(\cdot) := \min(\max(\cdot, -R), R)$$
to bound the value our network within any radius $R > 0$.

## F.2 Use ReLU Network to Approximate Basic Operators and Functions
In this section, we introduce how to construct ReLU networks to realize basic operations such as product, inverse (reciprocal), and square root. The lemmas below are adapted from Oko et al. [2023].

84

### Visual Description
Text-only slide.

---

## Page 85
### Content
**Lemma F.5** (Approximating the product, Lemma F.6 of Oko et al. [2023]). Let $d \ge 2, C \ge 1$. For any $\epsilon_{\text{product}} > 0$, there exists $f_{\text{mult}}(x_1, x_2, \dots, x_d) \in \mathcal{F}(W, \kappa, L, K)$ with $L = \mathcal{O}(\log d(\log \epsilon_{\text{product}}^{-1} + d \log C))$, $W = 48d$, $K = \mathcal{O}(d \log \epsilon_{\text{product}}^{-1} + d \log C)$, $\kappa = C^d$ such that
$$\left| f_{\text{mult}}(x'_1, x'_2, \dots, x'_d) - \prod_{i=1}^d x_i \right| \le \epsilon_{\text{product}} + d C^{d-1} \epsilon_1. \tag{F.4}$$
for all $x \in [-C, C]^d$ and $x' \in \mathbb{R}$ with $\|x - x'\|_\infty \le \epsilon_1$. $|f_{\text{mult}}(x)| \le C^d$ for all $x \in \mathbb{R}^d$, and $f_{\text{mult}}(x'_1, x'_2, \dots, x'_d) = 0$ if at least one of $x'_i$ is 0.
We note that if $d = 2$ and $x_1 = x_2 = x$, it approximates the square of $x$. We denote the network by $f_{\text{square}}(x)$ and the corresponding $\epsilon_{\text{product}}$ by $\epsilon_{\text{square}}$. Moreover, for any $\mathbf{x} \in \mathbb{R}^d$ and $\mathbf{n} \in \mathbb{N}^d$, we denote the approximation of $\mathbf{x}^{\mathbf{n}} = \prod_{i=1}^d x_i^{n_i}$ by $f_{\text{poly}, \mathbf{n}}(\mathbf{x})$ and the corresponding error by $\epsilon_{\text{poly}}$.

**Lemma F.6** (Approximating the reciprocal function, Lemma F.7 of Oko et al. [2023]). For any $0 < \epsilon_{\text{inv}} < 1$, there exists $f_{-1} \in \mathcal{F}(W, \kappa, L, K)$ with $L = \mathcal{O}(\log^2 \epsilon_{\text{inv}}^{-1})$, $W = \mathcal{O}(\log^3 \epsilon_{\text{inv}}^{-1})$, $K = \mathcal{O}(\log^4 \epsilon_{\text{inv}}^{-1})$, and $\kappa = \mathcal{O}(\epsilon_{\text{inv}}^{-2})$ such that
$$\left| f_{-1}(x') - \frac{1}{x} \right| \le \epsilon_{\text{inv}} + \frac{|x' - x|}{\epsilon_{\text{inv}}^2}, \text{ for all } x \in [\epsilon_{\text{inv}}, \epsilon_{\text{inv}}^{-1}] \text{ and } x' \in \mathbb{R}. \tag{F.5}$$

**Lemma F.7** (Approximating the square root, Lemma F.9 of Oko et al. [2023]). For any $0 < \epsilon_{\text{root}} < 1$, there exists $f_{\text{root}} \in \mathcal{F}(W, \kappa, L, K)$ with $L = \mathcal{O}(\log^2 \epsilon_{\text{root}}^{-1})$, $W = \mathcal{O}(\log^3 \epsilon_{\text{root}}^{-1})$, $K = \mathcal{O}(\log^4 \epsilon_{\text{root}}^{-1})$, and $\kappa = \mathcal{O}(\epsilon_{\text{root}}^{-1})$ such that
$$\left| f_{\text{root}}(x') - \sqrt{x} \right| \le \epsilon_{\text{root}} + \frac{|x' - x|}{\sqrt{\epsilon_{\text{root}}}}, \text{ for all } x \in [\epsilon_{\text{root}}, \epsilon_{\text{root}}^{-1}] \text{ and } x' \in \mathbb{R}. \tag{F.6}$$

## F.3 Use ReLU Network to Approximate Functions Related to $t$
**Lemma F.8** (Approximating $\alpha_t = e^{-t/2}$). For any $0 < \epsilon_\alpha < 1$, there exists $f_\alpha \in \mathcal{F}(W, \kappa, L, K)$ with $L = \mathcal{O}(\log^2 \epsilon_\alpha^{-1})$, $W = \mathcal{O}(\log \epsilon_\alpha^{-1})$, $K = \mathcal{O}(\log^2 \epsilon_\alpha^{-1})$, and $\kappa = \exp(\mathcal{O}(\log^2 \epsilon_\alpha^{-1}))$ such that
$$|f_\alpha(t) - \alpha_t| \le \epsilon_\alpha, \text{ for all } t \ge 0 \tag{F.7}$$
holds.

*Proof.* For a fixed $T > 0$, to be chosen later, we utilize the Taylor expansion to establish the following inequality for $0 \le t \le T$ and $k \in \mathbb{N}_+$:
$$\left| e^{-t/2} - \sum_{i=0}^{k-1} \frac{(-1)^i}{i!} \left(\frac{t}{2}\right)^i \right| \le \frac{(T/2)^k}{k!}.$$
Since $\frac{T^k}{k!} \le \
## Page 89
### Content
order of $\exp(\mathcal{O}(\log N))$. Also, the entry-wise minimum operator indicates that the output value of the network is bounded by $\mathcal{O}(\sqrt{\log N}/\sigma_t^2)$. Therefore, by Lemma F.1 and the lemmas we mention above, the hyperparameters $(M_t, W, \kappa, L, K)$ of the entire network satisfy
$$M_t = \mathcal{O}\left(\sqrt{\log N}/\sigma_t^2\right), W = \mathcal{O}\left(N^{d+d_y} \log^7 N\right),$$
$$\kappa = \exp(\mathcal{O}(\log^4 N)), L = \mathcal{O}(\log^4 N), K = \mathcal{O}\left(N^{d+d_y} \log^9 N\right).$$
We complete our proof.

#### F.4.2 Construction of $f_{v,k,j}$ in Figure 3 for the proof of Lemma A.12
Similarly, the total error can be written as
$$\epsilon_f = \epsilon_{\text{product},1} + 4C_8^{6(2k+j+1)} \max(\epsilon_1, \epsilon_2, \epsilon_3, \epsilon_4), \text{ where}$$
$$C_8 = \max\left(\frac{1}{\sigma_{t_0}}, C_x \sqrt{\log N} \frac{R}{\alpha_T}\right) = \text{Poly}(N).$$
For $\epsilon_1, \epsilon_2, \epsilon_3$ and $\epsilon_4$, we define
$$\epsilon_1 = \epsilon_{\text{poly},1} + (2k + j + 1)C_8^{2(2k+j)} (\epsilon_{\text{product},2} + 2 \max(\epsilon_{\text{inv}}, 2C_8 R \epsilon_{\alpha,1}))$$
as the error of approximating $f_D^{j+2k+1}(x) - \bar{f}_D^{j+2k+1}(x)$, and
$$\epsilon_2 = \epsilon_{\text{poly},2} + j\sigma_{t_0}^{-(j-1)} \epsilon_\sigma, \epsilon_3 = \epsilon_{\text{poly},3} + (n+1)\alpha_t^{-n} \epsilon_{\alpha,2}, \epsilon_4 = \epsilon_{\text{poly},4} + jC_8^{j-1} R \epsilon_{\alpha,3}$$
are the errors of approximating $\sigma_t^j, \alpha_t^{-(n+1)}$ and $(x + \alpha_t R/2 - \alpha_t R v/N)^{n-j}$, respectively. To ensure that $\epsilon_f \le \epsilon$, we take $\epsilon_{\text{product},1} = \frac{\epsilon}{2}$ and choose a set of error terms so that
$$\max(\epsilon_1, \epsilon_2, \epsilon_3, \epsilon_4) \le \frac{\epsilon}{8C_8^{6(2k+j+1)}} := \epsilon_\star.$$
To be specific, to approximate the power operators ($f_{\text{poly}}$ in the remark of Lemma F.5), we take
$$\epsilon_{\text{poly},1} = \epsilon_{\text{poly},2} = \epsilon_{\text{poly},3} = \epsilon_{\text{poly},4} = \frac{\epsilon_\star}{2}.$$
Moreover, in the approximation of the inverse operator (Lemma F.6) and the second product operator (Lemma F.5), we set
$$\epsilon_{\text{product},2} = \frac{\epsilon_\star}{4(2k + j + 1)C_8^{2(2k+j)}} \text{ and } \epsilon_{\text{inv}} = \frac{\epsilon_{\text{product},2}}{2},$$
respectively. Last, to approximate $\sigma_t$ and $\alpha_t$, we take
$$\epsilon_\sigma = \frac{\epsilon_\star}{2j\sigma_{t_0}^{j-1}} \text{ and } \epsilon_{\alpha,1} = \epsilon_{\alpha,2} = \epsilon_{\alpha,3} = \min\left(\frac{\epsilon_{\text{product},2}}{4C_8 R}, \frac{\epsilon_\star}{2jC_8^{j-1} R}\right).$$
Then by the definition of $\epsilon_1, \epsilon_2, \epsilon_3$ and $\epsilon_4$, it is easy to verify that $\max(\epsilon_1, \epsilon_2, \epsilon_3, \epsilon_4) \le \epsilon_\star$. Note that $j \le n \le s$ and $k \le p = \mathcal{O}(\log N)$, so the reciprocals all the error terms ($\epsilon_{\text{inv}}, \epsilon_\sigma$, e.t.c.) are in the order of $\exp(\mathcal{O}(\log^2 N + \log \epsilon^{-1}))$. Thus, the network parameters $(W, \kappa, L, K)$ of the entire network satisfy
$$W = \mathcal{O}(\log^6 N + \log^3 \epsilon^{-1}), \kappa = \exp(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})),$$
$$L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), K = \mathcal{O}(\log^8 N + \log^4 \epsilon^{-1}).$$
The proof is complete.

89

### Visual Description
Text-only slide.

---

## Page 90
### Content
#### F.4.3 Construction of $f_3^{\text{ReLU}}$ in Figure 4 for the Proof of Proposition B.3
According to the figure, the total error can be written as
$$\epsilon_{\text{score}} = \epsilon_{\text{product},1} + \epsilon_{\text{product},2} + 2C_9 \left(\epsilon_{\text{inv},1} + \frac{\epsilon_{\alpha^2}}{\epsilon_{\text{inv},1}^2}\right) + 4C_{10}^3 \max(\epsilon_{\widehat{\sigma}^{-1}}, \epsilon_{f_1^{-1}}, \epsilon_{f_2}, \epsilon_{\widehat{\alpha}}), \text{ where}$$
$$C_9 = \max\left(C_2 C_x \sqrt{\log N}, \frac{1}{C_2 + (1 - C_2)\alpha_T}\right) \text{ and } C_{10} = \max_{t_0 \le t \le T} \left(\widehat{\sigma}_t^{-1}, \frac{2}{C_1}, B, \widehat{\alpha}_t\right).$$
Here
$$\epsilon_{\widehat{\sigma}^{-1}} = \epsilon_{\text{inv},2} + \frac{\epsilon_{\widehat{\sigma}}}{\epsilon_{\text{inv},2}^2} \text{ and } \epsilon_{f_1^{-1}} = \epsilon_{\text{inv},3} + \frac{\epsilon_{f_1}}{\epsilon_{\text{inv},3}^3}$$
are the errors of approximating $\widehat{\sigma}_t^{-1}$ and $f_1^{-1}$, respectively. Now we choose a set of error terms to ensure that $\epsilon_{\text{score}} \le N^{-\beta}$. Specifically, to approximate $f_1$ and $f_2$, we take
$$\epsilon_{f_1} = \frac{N^{-\beta} \epsilon_{\text{inv},2}^2}{32C_{10}^3} \text{ and } \epsilon_{f_2} = \frac{N^{-\beta}}{16C_{10}^3}$$
in Lemmas B.5 and B.7, respectively. Moreover, in the approximation of $\alpha_t^2, \widehat{\sigma}_t$ and $\widehat{\alpha}_t$, we set
$$\epsilon_{\alpha^2} = \frac{N^{-\beta} \epsilon_{\text{inv},1}^2}{16C_9}, \epsilon_{\widehat{\sigma}} = \frac{N^{-\beta} \epsilon_{\text{inv},2}^2}{32C_{10}^3} \text{ and } \epsilon_{\widehat{\alpha}} = \frac{N^{-\beta}}{16C_{10}^3}.$$
Last, to approximate the two product operators (Lemma F.5) and the three inverse operators (Lemma F.6), we take
$$\epsilon_{\text{product},1} = \epsilon_{\text{product},2} = \frac{N^{-\beta}}{4}, \epsilon_{\text{inv},1} = \frac{N^{-\beta}}{16C_9} \text{ and } \epsilon_{\text{inv},2} = \epsilon_{\text{inv},3} = \frac{N^{-\beta}}{32C_{10}^3}.$$
Since the reciprocals of all the error terms ($\epsilon_{\widehat{\sigma}}, \epsilon_{\widehat{\alpha}}$, e.t.c.) and the upper bound parameters ($C_9$ and $C_{10}$) are in the order of $\exp(\mathcal{O}(\log N))$, the network hyperparameters $(M_t, W, \kappa, L, K)$ of the entire network satisfy
$$M_t = \mathcal{O}(\sqrt{\log N}/\sigma_t), W = \mathcal{O}(N^{d+d_y} \log^7 N),$$
$$\kappa = \exp(\mathcal{O}(\log^4 N)), L = \mathcal{O}(\log^4 N), K = \mathcal{O}(N^{d+d_y} \log^9 N).$$
The proof is complete.

#### F.4.4 Construction of $f_{v,k,j}$ in Figure 5 for the Proof of Lemma B.11
Similarly, the total approximation error of the network is bounded by
$$\epsilon_f = \epsilon_{\text{product},1} + 3C_{11}^{4(2k+j+1)} \max(\epsilon_1, \epsilon_2, \epsilon_3), \text{ where}$$
$$C_{11} = 2 \max_{t_0 \le t \le T} \left(\frac{1}{\sigma_t}, \sigma_t, C_x \sqrt{\log N} \alpha_t + R\right) = \text{Poly}(N).$$
Here
$$\epsilon_1 = 2\epsilon_{\text{poly},1} + 4(2k + j + 1)R^{2k+j} \left(\epsilon_{\text{product},2} + 2C_{11} \max\left(\epsilon_{\text{product},3} + 2C_{11}\epsilon_{\widehat{\alpha},1}, \epsilon_{\text{inv}} + \frac{\epsilon_{\widehat{\sigma},1}}{\epsilon_{\text{inv}}^2}\right)\right)$$

90

### Visual Description
Text-only slide.

---

## Page 91
### Content
is the error of approximating $f_D^{j+2k+1}(x) - \bar{f}_D^{j+2k+1}(x)$, and
$$\epsilon_2 = \epsilon_{\text{poly},2} + jC_{11}^{j-1} \epsilon_{\widehat{\sigma},2}, \epsilon_3 = \epsilon_{\text{poly},3} + (n - j)C_{11}^{n-j-1} (\epsilon_{\text{product},4} + 2C_{11}\epsilon_{\widehat{\alpha},2})$$
are the errors of approximating $\sigma_t^j$ and $(\widehat{\alpha}_t x + R/2 - vR/N)^{n-j}$, respectively. To ensure $\epsilon_f \le \epsilon$, we choose $\epsilon_{\text{product},1} = \epsilon/2$ and set other error terms so that
$$\max(\epsilon_1, \epsilon_2, \epsilon_3) \le \frac{\epsilon}{6C_{11}^{4(2k+j+1)}} := \epsilon_\star.$$
To be specific, we set
$$\epsilon_{\text{product},2} = \frac{\epsilon_\star}{4(2k + j + 1)R^{2k+j}}, \epsilon_{\text{product},3} = \epsilon_{\text{inv}} = \frac{\epsilon_{\text{product},2}}{4C_{11}}, \text{ and } \epsilon_{\text{product},4} = \frac{\epsilon_\star}{4(n - j)C_{11}^{n-j-1}}$$
for the remaining three product operators and the inverse operator. Moreover, in the approximation of the power operators (remark of Lemma F.5), we take
$$\epsilon_{\text{poly},1} = \frac{\epsilon_\star}{4}, \text{ and } \epsilon_{\text{poly},2} = \epsilon_{\text{poly},3} = \frac{\epsilon}{2}.$$
Last, to approximate $\sigma_t$ and $\widehat{\alpha}_t$, we take
$$\epsilon_{\widehat{\sigma},1} = \epsilon_{\text{inv}}^3, \epsilon_{\widehat{\sigma},2} = \frac{\epsilon_\star}{2jC_{11}^{j-1}}, \epsilon_{\widehat{\alpha},1} = \frac{\epsilon_{\text{product},2}}{8C_{11}^2} \text{ and } \epsilon_{\widehat{\alpha},2} = \frac{\epsilon_{\text{product},4}}{2C_{11}}.$$
Thus, we have $\epsilon_f \le \epsilon$. Since $j \le n \le s$ and $k \le p = \mathcal{O}(\log N)$, the reciprocals of all the error terms ($\epsilon_{\widehat{\alpha}}, \epsilon_{\widehat{\sigma}}$, e.t.c.) are in the order of $\exp(\mathcal{O}(\log^2 N + \log \epsilon^{-1}))$. Thus, the network parameters $(W, \kappa, L, K)$ satisfy
$$W = \mathcal{O}(\log^6 N + \log^3 \epsilon^{-1}), \kappa = \exp(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})),$$
$$L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), K = \mathcal{O}(\log^8 N + \log^4 \epsilon^{-1}).$$
The proof is complete.

#### F.4.5 Construction of $\Phi_{\mathbf{n,n',v,w}}$ for the Proof of Lemma A.5
To construct $\Phi_{\mathbf{n,n',v,w}}$, we use the following ReLU network:
$$\Phi_{\mathbf{n,n',v,w}}^{\text{ReLU}} = f_{\text{mult}} \left( f_{\text{poly,n'}} \left( \mathbf{y} - \frac{\mathbf{w}}{N} \right), \left\{ \phi \left( 3N \left( y_j - \frac{\mathbf{w}}{N} \right) \right) \right\}_{j \in [d_y]}, \left\{ \sum_{k<p} g^{\text{ReLU}}(x_i, n_i, v_i, k) \right\}_{i \in [d]} \right)$$
According to Lemmas A.11, A.12 and F.5, the approximation error can be written as
$$\epsilon_\Phi = \epsilon_{\text{product}} + (d + d_y + 1)C_{12}^{d+d_y} \max(\epsilon_{\text{poly}}, p\epsilon_g), \text{ where}$$
$$C_{12} = \max_{\|\mathbf{x}\|_\infty \le C_x \sqrt{\log N}, i \in [d]} \sum_{k<p} g^{\text{ReLU}}(x_i, n_i, v_i, k)$$
satisfies $\log C_{12} = \mathcal{O}(\log^2 N)$ and $p = \mathcal{O}(\log N)$. Here $\epsilon_g$ represents the uniform approximation error of $g(x, n, v, k)$. Denote $\epsilon_\star = s!(d + d_y)^{-s} R^{-s} N^{-(d+d_y)} \epsilon$. By taking
$$\epsilon_{\text{product}} = \frac{\epsilon_\star}{2}, \epsilon_{\text{poly}} = \frac{\epsilon_\star}{2(d + d_y + 1)C_{12}^{d+d_y}}, \text{ and } \epsilon_g = \frac{\epsilon_\star}{2p(d + d_y + 1)C_{12}^{d+d_y}},$$

91

### Visual Description
Text-only slide.

---

## Page 92
### Content
we ensure that $\epsilon_\Phi \le \epsilon_\star$. Moreover, we note that the reciprocals of all the error terms ($\epsilon_\Phi, \epsilon_g$, e.t.c.) are in the order of $\exp(\mathcal{O}(\log^2 N + \log \epsilon^{-1}))$. Thus, according to Lemma F.1, we can verify that the network parameters $(W, \kappa, L, K)$ satisfy
$$W = \mathcal{O}(\log^7 N + \log N \log^3 \epsilon^{-1}), \kappa = \exp(\mathcal{O}(\log^4 N + \log^2 \epsilon^{-1})),$$
$$L = \mathcal{O}(\log^4 N + \log^2 \epsilon^{-1}), K = \mathcal{O}(\log^9 N + \log N \log^4 \epsilon^{-1}).$$

#### F.4.6 Construction of $\mathbf{s}_1^{\text{ReLU}}$ in the proof of Proposition 5.4
According to (E.4) and (E.5), $\mathbf{A}(t)\mathbf{y} + \mathbf{B}(t)\mathbf{x}$ can be written as
$$\mathbf{A}(t)\mathbf{y} + \mathbf{B}(t)\mathbf{x} = -\sum_{i=1}^m \frac{\mathbf{p}_i \mathbf{p}_i^\top \mathbf{y} + e^{\frac{t}{2}} \mu_i \mathbf{p}_i \mathbf{u}_i^\top \mathbf{x}}{\sigma^2 + (e^t - 1)\lambda_i},$$
where $\{\mathbf{p}_i\}_{i=1}^m$ and $\{\mathbf{u}_i\}_{i=1}^m$ are the (first) $m$ row vectors of $\mathbf{P}$ and $\mathbf{U}$, respectively. To construct a ReLU approximation, we first consider the following functions:
$$g_i^{\text{ReLU}}(\mathbf{x, y}, t) = f_{\text{mult}} \left( -\mathbf{p}_i^\top \mathbf{y} - \mu_i f_{\text{mult}} (f_\alpha(t), \mathbf{u}_i^\top \mathbf{x}), f_{\text{inv}} (\sigma^2 + \lambda_i(f_{\alpha^2}(t) - 1)) \right) \mathbf{p}_i.$$
Afterward, we sum them up and clip the function value to construct our target ReLU approximation $\mathbf{s}_1^{\text{ReLU}}$, which is given as
$$\mathbf{s}_1^{\text{ReLU}} = f_{\text{clip}, R'} \left( \sum_{i=1}^m g_i^{\text{ReLU}} \right), \text{ where } R' = \frac{R\sqrt{(d+d_y)\log N}}{\lambda_\star} = \mathcal{O}(\sqrt{\log N}).$$
According to Lemmas F.5, F.6 and F.8, the approximation error of the entire network can be bounded by
$$\|\mathbf{s}_1^{\text{ReLU}}(\mathbf{x, y}, t) - \mathbf{A}(t)\mathbf{y} - \mathbf{B}(t)\mathbf{x}\|_\infty \le mC_{13} \max \left( C_{14}\epsilon_\alpha + \epsilon_{\text{product},2}, \epsilon_{\text{inv}} + \frac{\lambda_i \epsilon_{\alpha^2}}{\epsilon_{\text{inv}}^2} \right) + \epsilon_{\text{product},1},$$
where the constants
$$C_{13} = \max \left( \left(\sqrt{d_y} + \mu_i e^{T/2} \sqrt{d}\right) R \sqrt{\log N}, \frac{1}{\sigma^2 + (e^{t_0} - 1) \min_i \lambda_i} \right), C_{14} = \max \left( e^T, R \sqrt{d \log N} \right)$$
both satisfy $\log C_j = \mathcal{O}(\log N)$. Now, we take
$$\epsilon_{\text{product},1} = \frac{N^{-2\beta/d}}{2}, \epsilon_{\text{product},2} = \epsilon_{\text{inv}} = \frac{N^{-2\beta/d}}{4mC_{13}}, \epsilon_\alpha = \frac{N^{-2\beta/d}}{4mC_{13}C_{14}}, \text{ and } \epsilon_{\alpha^2} = \frac{\epsilon_{\text{inv}}^3}{\lambda_i}$$
to ensure the error is bounded by $N^{-2\beta/d}$. Moreover, since the reciprocals of all the error terms ($\epsilon_\alpha, \epsilon_{\text{inv}}$, e.t.c.) and the upper bound parameters ($C_{13}$ and $C_{14}$) are in the order of $\exp(\mathcal{O}(\log N))$, the parameters $(M_{t,1}, W_1, \kappa_1, L_1, K_1)$ of the entire network satisfy
$$M_{t,1} = \mathcal{O}(\sqrt{\log N}), W_1 = \mathcal{O}(\log^3 N),$$
$$\kappa_1 = \exp(\mathcal{O}(\log^2 N)), L_1 = \mathcal{O}(\log^2 N), K_1 = \mathcal{O}(\log^4 N).$$
The proof is complete.

92

### Visual Description
Text-only slide.
