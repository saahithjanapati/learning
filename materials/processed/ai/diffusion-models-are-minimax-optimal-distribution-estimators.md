# Diffusion Models are Minimax Optimal Distribution Estimators

Source: `https://arxiv.org/abs/2303.01861`
Site: `arXiv`
AI category: `Diffusion Models / Statistical Theory`
Course mirror of: `materials/processed/advanced-machine-learning-10-715-cmu/relevant-papers-02-Diffusion Models are Minimax Optimal Distribution Estimators.md`
Course archive source: `materials/archive/advanced-machine-learning-10-715-cmu/piazza-resources/relevant-papers-02-Diffusion Models are Minimax Optimal Distribution Estimators.pdf`
Duplicate equivalents: `relevant-papers-02-Diffusion Models are Minimax Optimal Distribution Estimators.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `course PDF transcript mirrored into AI collection`
Finish reason: `MIXED`
Pages: 65

## Page 1
### Content
arXiv:2303.01861v1 [stat.ML] 3 Mar 2023

# Diffusion Models are Minimax Optimal Distribution Estimators

Kazusato Oko $^{1,2}$ Shunta Akiyama $^1$ Taiji Suzuki $^{1,2}$

### Abstract
While efficient distribution learning is no doubt behind the groundbreaking success of diffusion modeling, its theoretical guarantees are quite limited. In this paper, we provide the first rigorous analysis on approximation and generalization abilities of diffusion modeling for well-known function spaces. The highlight of this paper is that when the true density function belongs to the Besov space and the empirical score matching loss is properly minimized, the generated data distribution achieves the nearly minimax optimal estimation rates in the total variation distance and in the Wasserstein distance of order one. Furthermore, we extend our theory to demonstrate how diffusion models adapt to low-dimensional data distributions. We expect these results advance theoretical understandings of diffusion modeling and its ability to generate verisimilar outputs.

### 1. Introduction
Diffusion modeling, also called score-based generative modeling (Sohl-Dickstein et al., 2015; Song & Ermon, 2019; Song et al., 2020; Ho et al., 2020; Vahdat et al., 2021) has achieved state-of-the-art performance in image (Song et al., 2020; Dhariwal & Nichol, 2021), video (Ho et al., 2022), and audio (Chen et al., 2020; Kong et al., 2020).

Borrowing explanation from the unifying framework of Song et al. (2020), diffusion modeling first gradually adds noise to the data distribution, and transforms the distribution to a predefined noise distribution. This time evolution, called the forward process, can be formulated as a stochastic differential equation (SDE) that is data independent. On the other hand, we can consider the time-reversal of the SDE, and by following this so-called backward process, one can generate data from noise. Importantly, the drift term of the backward process is dependent on the data distribution, specifically on the gradient of the logarithmic density (score) at each time of the forward process.

In practice, however, we have only access to the true distribution through a finite number of sample. For this reason, the score of the diffusion process from the empirical distribution is utilized instead (Vincent, 2011; Sohl-Dickstein et al., 2015; Song & Ermon, 2019). Moreover, for computational efficiency, the empirical score is further replaced by a neural network (score network) that is close to the empirical score in terms of some loss function using score matching techniques (Hyvärinen & Dayan, 2005; Vincent, 2011). In this way, diffusion modeling implicitly learns the true distribution via learning of the empirical score.

Then the following natural question immediately arises: *Is diffusion modeling is a good distribution estimator? In other words, how can the estimation error of the generated data distribution be explicitly bounded by the number of the training data and in a data structure dependent way?*

**On the effect of score approximation errors** Existing literature has analyzed the estimation error with either of the two assumptions on the accuracy of score approximation. (i) One popular assumption is that the error of the loss function in score matching is sufficiently small, which was first used by Song et al. (2020) to bound the Kullback–Leibler (KL) divergence for continuous-time dynamics via Girsanov theorem. Recently, the polynomial bound has appeared in discrete-time, meaning that the polynomial order of the error in score estimate at each step and number of steps suffice to obtain the final estimation error in the total variation (TV) distance (Lee et al., 2022b). Lee et al. (2022b) assumed the smoothness and log-Sobolev inequality (LSI) for the true density, and Chen et al. (2022) and Lee et al. (2022a) eliminated the LSI but still with the smoothness. Also, following Song et al. (2020), Pidstrigach (2022) considered the true distribution on a manifold. (ii) Another assumption is to bound the difference between the score and the network at each time and point. De Bortoli et al. (2021) (also with dissipativity) and De Bortoli (2022) (under the manifold hypothesis) derived non-polynomial bounds in TV and in the Wasserstein distance of order one ($W_1$), respectively.

---
$^1$Department of Mathematical Informatics, the University of Tokyo, Tokyo, Japan $^2$Center for Advanced Intelligence Project, RIKEN, Tokyo, Japan. Correspondence to: Kazusato Oko <kazusato@g.ecc.u-tokyo.ac.jp>.

### Visual Description
Academic paper layout with two columns. The title is centered at the top, followed by the authors and their affiliations. The abstract is in a single column width, followed by the introduction in two columns.

---

## Page 2
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** | **2**

**Generalization error analyses** However, most of the literature assumes availability of the true score, and thus whether the score is appropriately approximated with a finite number of sample has been unaddressed, and therefore a doubt in reality of the above assumptions undermines
## Page 9
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 9**

**5.3. Discussion on the discretization error**

Although the continuous time SDE is mainly focused on for simple presentation, we can also take the discretization error into consideration. We here only provide the summary, and the details are presented in Appendix D.3. Let $t_0 = \underline{T} < t_1 < \dots < t_{K_*} = \overline{T}$ be the time steps with $\eta \equiv t_{k+1} - t_k$. We train the score network as the minimizer of
$$ \sum_{i=1}^n \sum_{k=0}^{K-1} \eta \mathbb{E} [\|s(x_{t_k}, t_k) - \nabla \log p_{\overline{T}-t_k}(x_{t_k} | x_{0,i})\|^2]. $$
Here the expectation is taken with respect to $x_{\overline{T}-t_k} \sim p_{\overline{T}-t_k}(x_{\overline{T}-t_k} | x_{0,i})$. Then consider the following process $(Y_t^d)_{t=0}^{\eta K}$ with $Y_0^d \sim \mathcal{N}(0, I_d)$: for $t \in [\overline{T} - t_i, \overline{T} - t_{i+1}]$,
$$ dY_t^d = \beta_t(Y_t^d + 2\hat{s}(Y_{\overline{T}-t_i}^d, \overline{T}-t_i))dt + \beta_{\overline{T}-t} dB_t $$
This is just replacement of the drift term at $t$ by that at the last discretized step, and we can obtain $Y_{\eta(k+1)}$ from $Y_{\eta k}$ as easy as the classical Euler-Maruyama discretization because $Y_{\eta(k+1)}$ conditioned on $Y_{\eta k}$ is a Gaussian. This is also adopted in De Bortoli (2022); Chen et al. (2022). However, De Bortoli (2022) requires $\eta_i \le \exp(-n^{O(1)})$ and Chen et al. (2022) assumes Lipschitzness of the score, which does not necessarily hold in our setting.

We can show the following discretization error bound:
**Theorem 5.7.** Let $\underline{T} = n^{-O(1)}$ and $\overline{T} = \frac{s \log n}{2s+d}$. Then,
$$ \mathbb{E}[TV(X_0, Y_{\overline{T}-\underline{T}}^d)] \lesssim \tilde{O}(\eta^2 \underline{T}^{-3} + n^{-\frac{s}{d+2s}}). $$
Thus, taking $\eta = \underline{T}^{1.5} n^{-s/(2s+d)} = \text{poly}(n^{-1})$ suffices to ignore the discretization error.

**6. Error analysis with intrinsic dimensionality**

Although the obtained rates in Section 5 are minimax optimal, they still suffer from the *curse of dimensionality*: the exponent of the convergence rates depend on $d$. In statistics, one approach to avoid this curse of dimensionality is to assume mixed or anisotropic smoothness (Ibragimov & Khas'minskii, 1984; Meier et al., 2009; Suzuki, 2018; Suzuki & Nitanda, 2021), and our theory directly applies to them. On the other hand, the *manifold hypothesis*, that the distributions of real-world data lie in low dimensional manifolds, has been proposed (Tenenbaum et al., 2000; Fefferman et al., 2016), and this is another assumption that can avoid the curse of dimensionality: convergence rates dependent not on the dimension $d$ of the space itself but on the manifold's dimension $d'$ can be derived Schmidt-Hieber (2019); Nakada & Imaizumi (2020).

As for the diffusion models, despite its statistical importance, none of the literature has shown that diffusion models can ease the curse of dimensionality; in the first place, the density estimation problem itself has never been considered.

We introduce several recent works that investigated the convergence of diffusion modeling under the manifold hypothesis. Pidstrigach (2022) discussed the effects of the score approximation, but their bounds are not quantitative and does not consider the estimation rate. De Bortoli (2022) considered the estimation rates, but the approximation error should be exponentially small with respect to the desired estimation rate. Batzolis et al. (2022) experimentally showed that diffusion modeling learns the dimension of the underlying manifold and the dimension of the manifold can be estimated from the trained diffusion models.

From now, we define the specific class of density function with intrinsic dimensionality and show the estimation rate.

Let $d' \le d$ be an integer and $A \in \mathbb{R}^{d \times d'}$ be a matrix made of orthogonal column vectors with the norm one. We consider the $d'$-dimensional subspace $V := \{y \in \mathbb{R}^d \mid \exists x \in \mathbb{R}^{d'} \text{ s.t. } y = Ax\}$ where the true density has its support, i.e., $d'$ represents the intrinsic dimensionality. Together with Assumption 2.5, we assume the followings.

**Assumption 6.1.** The true density $p_0$ is a probability measure that is absolutely continuous with respect to the Lebesgue measure restricted on the sub-space $V$. Its probability density function as a function on the canonical coordinate system of the subspace $V$ is denoted by $q$.

**Assumption 6.2.** $q$ is upper and lower bounded by $C_f$ and $C_f^{-1}$, respectively. Moreover, $q$ belongs to $U(B_{p,q}^s; [-1, 1]^{d'})$.

**Assumption 6.3.** $q$ belongs to $U(C^\infty([-1, 1]^{d'} \setminus [-1 + a_0, 1 - a_0]^{d'}))$ with $a_0 = n^{-\frac{1-\delta}{d'}}$.

We now state our result as follows:
**Theorem 6.4.** For any fixed $\delta > 0$, we can train the score network with $n (\gg 1)$ sample so that
$$ \mathbb{E}[W_1(X_0, \hat{Y}_{\overline{T}-\underline{T}})] \lesssim n^{-\frac{(s+1-\delta)}{d'+2s}}. $$
Appendix E provides the complete proof. Contrary to Theorem 5.1, the upper bound here depends on $d'$ (not on $d$). Thus, we can conclude that the diffusion models can avoid the curse of dimensionality.

**7. Conclusion**

This paper analyzed diffusion modeling as a distribution learner from the viewpoint of statistical learning theory and derived several estimation rates. When the true density

### Visual Description
Text-heavy slide containing mathematical definitions, theorems, and discussion. It includes sections 5.3, 6, and the beginning of section 7. Formulas and assumptions are clearly laid out.

---

## Page 10
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 10**

belongs to the Besov space and deep neural networks are appropriately minimized, diffusion modeling can achieve nearly minimax optimal estimation rates in TV and $W_1$.

To approximate the score, the novel basis is introduced, which we call the diffused B-spline basis. The bound in $W_1$ is derived by carefully balancing the difficulty in score matching and how much the error in score matching at each time affects the $W_1$ distance. We also demonstrated that diffusion models can avoid the curse of dimensionality under the manifold hypothesis.

**Acknowledgements**
KO was partially supported by Fujitsu Ltd. SA was partially supported by JSPS KAKENHI (22J13388). TS was partially supported by JSPS KAKENHI (20H00576) and JST CREST.

**References**
Amann, H., Bourguignon, J., Grove, K., Lions, P., Araki, H., Brezzi, F., Chang, K., Hitchin, N., Hofer, H., Knörrer, H., et al. Monographs in mathematics vol. 99. 1983.

Arora, S., Cohen, N., Hu, W., and Luo, Y. Implicit regularization in deep matrix factorization. *Advances in Neural Information Processing Systems*, 32, 2019.

Bakry, D., Gentil, I., Ledoux, M., et al. *Analysis and geometry of Markov diffusion operators*, volume 103. Springer, 2014.

Barron, A. R. Universal approximation bounds for superpositions of a sigmoidal function. *IEEE Transactions on Information theory*, 39(3):930–945, 1993.

Batzolis, G., Stanczuk, J., and Schönlieb, C.-B. Your diffusion model secretly knows the dimension of the data manifold. *arXiv preprint arXiv:2212.12611*, 2022.

Block, A., Mroueh, Y., and Rakhlin, A. Generative modeling with denoising auto-encoders and langevin sampling. *arXiv preprint arXiv:2002.00107*, 2020.

Boullé, N., Nakatsukasa, Y., and Townsend, A. Rational neural networks. *Advances in Neural Information Processing Systems*, 33:14243–14253, 2020.

Chang, S.-H., Cosman, P. C., and Milstein, L. B. Chernoff-type bounds for the gaussian error function. *IEEE Transactions on Communications*, 59(11):2939–2944, 2011.

Chen, N., Zhang, Y., Zen, H., Weiss, R. J., Norouzi, M., and Chan, W. Wavegrad: Estimating gradients for waveform generation. In *International Conference on Learning Representations*, 2020.

Chen, S., Chewi, S., Li, J., Li, Y., Salim, A., and Zhang, A. R. Sampling is as easy as learning the score: theory for diffusion models with minimal data assumptions. *arXiv preprint arXiv:2209.11215*, 2022.

De Bortoli, V. Convergence of denoising diffusion models under the manifold hypothesis. *Transactions on Machine Learning Research*, 2022. URL https://openreview.net/forum?id=MhK5aXo3gB.

De Bortoli, V., Thornton, J., Heng, J., and Doucet, A. Diffusion schrödinger bridge with applications to score-based generative modeling. *Advances in Neural Information Processing Systems*, 34:17695–17709, 2021.

DeVore, R. A. and Popov, V. A. Interpolation of Besov spaces. *Transactions of the American Mathematical Society*, 305(1):397–414, 1988.

Dhariwal, P. and Nichol, A. Diffusion models beat gans on image synthesis. *Advances in Neural Information Processing Systems*, 34:8780–8794, 2021.

Dudley, R. M. The speed of mean glivenko-cantelli convergence. *The Annals of Mathematical Statistics*, 40(1):40–50, 1969.

Fefferman, C., Mitter, S., and Narayanan, H. Testing the manifold hypothesis. *Journal of the American Mathematical Society*, 29(4):983–1049, 2016.

Glorot, X., Bordes, A., and Bengio, Y. Deep sparse rectifier neural networks. In *Proceedings of the fourteenth international conference on artificial intelligence and statistics*, pp. 315–323. JMLR Workshop and Conference Proceedings, 2011.

Goodfellow, I., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair, S., Courville, A., and Bengio, Y. Generative adversarial networks. *Communications of the ACM*, 63(11):139–144, 2020.

Gunasekar, S., Woodworth, B. E., Bhojanapalli, S., Neyshabur, B., and Srebro, N. Implicit regularization in matrix factorization. *Advances in Neural Information Processing Systems*, 30, 2017.

Haussmann, U. G. and Pardoux, E. Time Reversal of Diffusions. *The Annals of Probability*, 14(4):1188–1205, 1986. doi: 10.1214/aop/1176992362. URL https://doi.org/10.1214/aop/1176992362.

Hayakawa, S. and Suzuki, T. On the minimax optimality and superiority of deep neural network learning over sparse parameter spaces. *Neural Networks*, 123:343–361, 2020.

### Visual Description
Text-only slide containing the conclusion wrap-up, acknowledgements, and the first part of the references list.

---

## Page 11
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 11**

Ho, J., Jain, A., and Abbeel, P. Denoising diffusion probabilistic models. *Advances in Neural Information Processing Systems*, 33:6840–6851, 2020.

Ho, J., Salimans, T., Gritsenko, A., Chan, W., Norouzi, M., and Fleet, D. J. Video diffusion models. *arXiv:2204.03458*, 2022.

Hyvärinen, A. and Dayan, P. Estimation of non-normalized statistical models by score matching. *Journal of Machine Learning Research*, 6(4), 2005.

Ibragimov, I. A. and Khas’minskii, R. Z. More on the estimation of distribution densities. *Journal of Soviet Mathematics*, 25:1155–1165, 1984.

Karatzas, I., Karatzas, I., Shreve, S., and Shreve, S. E. *Brownian motion and stochastic calculus*, volume 113. Springer Science & Business Media, 1991.

Kong, Z., Ping, W., Huang, J., Zhao, K., and Catanzaro, B. Diffwave: A versatile diffusion model for audio synthesis. In *International Conference on Learning Representations*, 2020.

Lee, H., Lu, J., and Tan, Y. Convergence of score-based generative modeling for general data distributions. In *NeurIPS 2022 Workshop on Score-Based Methods*, 2022a.

Lee, H., Lu, J., and Tan, Y. Convergence for score-based generative modeling with polynomial complexity. In *Advances in Neural Information Processing Systems*, 2022b.

Lei, J. Convergence and concentration of empirical measures under wasserstein distance in unbounded functional spaces. *Bernoulli*, 26(1):767–798, 2020.

Liang, T. How well can generative adversarial networks learn densities: A nonparametric view. *arXiv preprint arXiv:1712.08244*, 2017.

Meier, L., Van de Geer, S., and Bühlmann, P. *High-dimensional additive modeling*. 2009.

Mhaskar, H. N. and Micchelli, C. A. Approximation by superposition of sigmoidal and radial basis functions. *Advances in Applied mathematics*, 13(3):350–373, 1992.

Nair, V. and Hinton, G. E. Rectified linear units improve restricted boltzmann machines. In *Icml*, 2010.

Nakada, R. and Imaizumi, M. Adaptive approximation and generalization of deep neural network with intrinsic dimensionality. *J. Mach. Learn. Res.*, 21(174):1–38, 2020.

Niles-Weed, J. and Berthet, Q. Minimax estimation of smooth densities in Wasserstein distance. *The Annals of Statistics*, 50(3):1519–1540, 2022.

Oono, K. and Suzuki, T. Approximation and nonparametric estimation of resnet-type convolutional neural networks. In *International conference on machine learning*, pp. 4922–4931. PMLR, 2019.

Petersen, P. and Voigtlaender, F. Optimal approximation of piecewise smooth functions using deep relu neural networks. *Neural Networks*, 108:296–330, 2018.

Petersen, P. and Voigtlaender, F. Equivalence of approximation by convolutional neural networks and fully connected networks. *Proceedings of the American Mathematical Society*, 148(4):1567–1581, 2020.

Pidstrigach, J. Score-based generative models detect manifolds. In Oh, A. H., Agarwal, A., Belgrave, D., and Cho, K. (eds.), *Advances in Neural Information Processing Systems*, 2022. URL https://openreview.net/forum?id=AiNrnIrDfD9.

Ramesh, A., Dhariwal, P., Nichol, A., Chu, C., and Chen, M. Hierarchical text-conditional image generation with clip latents. *arXiv preprint arXiv:2204.06125*, 2022.

Ronneberger, O., Fischer, P., and Brox, T. U-net: Convolutional networks for biomedical image segmentation. In *International Conference on Medical image computing and computer-assisted intervention*, pp. 234–241. Springer, 2015.

Schmidt-Hieber, J. Deep relu network approximation of functions on a manifold. *arXiv preprint arXiv:1908.00695*, 2019.

Schmidt-Hieber, J. Nonparametric regression using deep neural networks with relu activation function. *The Annals of Statistics*, 48(4):1875–1897, 2020.

Schreuder, N., Brunel, V.-E., and Dalalyan, A. Statistical guarantees for generative models without domination. In *Algorithmic Learning Theory*, pp. 1051–1071. PMLR, 2021.

Singh, S. and Póczos, B. Minimax distribution estimation in Wasserstein distance. *arXiv preprint arXiv:1802.08855*, 2018.

Singh, S., Uppal, A., Li, B., Li, C.-L., Zaheer, M., and Póczos, B. Nonparametric density estimation under adversarial losses. *Advances in Neural Information Processing Systems*, 31, 2018.

Sohl-Dickstein, J., Weiss, E., Maheswaranathan, N., and Ganguli, S. Deep unsupervised learning using nonequilibrium thermodynamics. In *International Conference on Machine Learning*, pp. 2256–2265. PMLR, 2015.

### Visual Description
Text-only slide continuing the references list.

---

## Page 12
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 12**

Song, Y. and Ermon, S. Generative modeling by estimating gradients of the data distribution. *Advances in Neural Information Processing Systems*, 32, 2019.

Song, Y., Sohl-Dickstein, J., Kingma, D. P., Kumar, A., Ermon, S., and Poole, B. Score-based generative modeling through stochastic differential equations. In *International Conference on Learning Representations*, 2020.

Soudry, D., Hoffer, E., Nacson, M. S., Gunasekar, S., and Srebro, N. The implicit bias of gradient descent on separable data. *The Journal of Machine Learning Research*, 19(1):2822–2878, 2018.

Suzuki, T. Adaptivity of deep relu network for learning in Besov and mixed smooth Besov spaces: optimal rate and curse of dimensionality. In *International Conference on Learning Representations*, 2018.

Suzuki, T. and Nitanda, A. Deep learning is adaptive to intrinsic dimensionality of model smoothness in anisotropic Besov space. *Advances in Neural Information Processing Systems*, 34:3609–3621, 2021.

Telgarsky, M. Neural networks and rational functions. In *International Conference on Machine Learning*, pp. 3387–3393. PMLR, 2017.

Tenenbaum, J. B., Silva, V. d., and Langford, J. C. A global geometric framework for nonlinear dimensionality reduction. *science*, 290(5500):2319–2323, 2000.

Triebel, H. Entropy numbers in function spaces with mixed integrability. *Revista matemática complutense*, 24(1):169–188, 2011.

Tsybakov, A. B. *Introduction to Nonparametric Estimation*. Springer series in statistics. Springer, 2009. ISBN 978-0-387-79051-0. doi: 10.1007/b13794. URL https://doi.org/10.1007/b13794.

Vahdat, A., Kreis, K., and Kautz, J. Score-based generative modeling in latent space. *Advances in Neural Information Processing Systems*, 34:11287–11302, 2021.

Vincent, P. A connection between score matching and denoising autoencoders. *Neural computation*, 23(7):1661–1674, 2011.

Weed, J. and Bach, F. Sharp asymptotic and finite-sample rates of convergence of empirical measures in wasserstein distance. *Bernoulli*, 25(4A):2620–2648, 2019.

Yang, Y. and Barron, A. Information-theoretic determination of minimax rates of convergence. *Annals of Statistics*, pp. 1564–1599, 1999.

Yarotsky, D. Error bounds for approximations with deep relu networks. *Neural Networks*, 94:103–114, 2017.

Zhou, D.-X. Universality of deep convolutional neural networks. *Applied and computational harmonic analysis*, 48(2):787–794, 2020.

### Visual Description
Text-only slide concluding the references list.

---

## Page 13
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 13**

**A. Several high-probability bounds on the backward paths**

One of the difficulties in the analysis is the unboundedness of the space and the value of the score. This subsection aims to provide several treatments for such issues. These inequalities allow us to focus on the score approximation within the bounded region. We note that, however, some of the following bounds still depend on the time $t$, and therefore the level of difficulty for approximation and estimation of the score differs with respect to $t$.

In the following, we define several constants $C_{a,i}$. Other than in this section, we simply denote them as $C_a$ for simplicity.

**A.1. Bounds on $\|Y_t\|$ and $\|\Delta Y_t\|$ with high probability**

We first provide several high-probability bounds, which guarantee that most of the paths travel within some bounded region.

**Lemma A.1 (Bounds on $\|Y_t\|$ and $\|\Delta Y_t\|$ with high probability).** *There exists a constant $C_{a,1}$ such that*
$$ \mathbb{P} \left[ \|Y_t\|_\infty \le m_{\overline{T}-t} + C_{a,1} \sigma_{\overline{T}-t} \sqrt{\log(\epsilon^{-1} \underline{T}^{-1} \overline{T})} \text{ for all } t \in [0, \overline{T}-\underline{T}] \right] \ge 1 - \epsilon. $$
*Moreover, for an arbitrarily fixed $0 < \tau \le 1$,*
$$ \mathbb{P} \left[ \|Y_t - Y_{t+\tau}\|_\infty \le C_{a,1} \sqrt{\tau \log(\epsilon^{-1} \tau^{-1} \overline{T})} \text{ for all } t \in [0, \overline{T}-\tau] \right] \ge 1 - \epsilon. $$

*Proof.* Remind that $Y_t = X_{\overline{T}-t}$. Thus we discuss bounding $X_t$ in the following.

We begin with the first assertion. Let $t_1, t_2, \dots, t_K$ be time steps satisfying $\underline{T} = t_1 < t_2 < \dots < t_K = \overline{T}$ with $t_i - t_{i-1} = \Delta t$ that is some scaler value specified later. We first show the following for some constant $C_1$:
$$ \mathbb{P} \left[ \|X_t\|_\infty \le m_t + C_1 \sigma_t \sqrt{\log \epsilon^{-1}} \text{ for all } t = t_i (i = 1, 2, \dots, K) \right] \ge 1 - \epsilon K. \quad (9) $$
Remind that $X_t | X_0$ follows $\mathcal{N}(m_t X_0, \sigma_t^2)$ and $\|X_0\|_\infty \le 1$. Lemma F.14 yields that
$$ \mathbb{P} \left
## Page 17

### Content
**Diffusion Models are Minimax Optimal Distribution Estimators**

is because $m_t \simeq 1$ and $f(y) \leq C_f$. On the other hand, when $t \geq 1$, $\sigma_t \gtrsim 1$ holds, we can bound (a) by $\mathcal{O}(1)$ by noting that $f(y) \neq 0$ only for $y \in [-1, 1]^d$. Now, the first statement (16) has been proven.

We then consider $\nabla \log p_t(x)$ and its derivatives. We can focus on $[\nabla \log p_t(x)]_1$, and all the other coordinates of the score are bounded in the same way. Let $g_2(x) = \sigma_t [\nabla p_t(x)]_1 = -\int \frac{x_1 - m_t y_1}{\sigma_t^{d+1}(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy$, and define $g_2^{(s)}$ in the same way as that for $g_1^{(s)}$.

We can see that
$$[\nabla \log p_t(x)]_1 = \frac{1}{\sigma_t} \cdot \frac{g_2(x)}{g_1(x)}, \quad [\partial_{x_i} \nabla \log p_t(x)]_1 = \frac{1}{\sigma_t} \cdot \frac{\partial_{x_i} g_2(x)}{g_1(x)} - \frac{1}{\sigma_t} \cdot \frac{g_2(x)(\partial_{x_i} g_1(x))}{g_1^2(x)}. \tag{21}$$

Moreover,
$$\frac{g_2(x)}{g_1(x)} = \frac{-\int \frac{x_1 - m_t y_1}{\sigma_t^{d+1}(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}, \tag{22}$$
$$\frac{\partial_{x_i} g_1(x)}{g_1(x)} = \frac{1}{\sigma_t} \cdot \frac{-\int \frac{x_i - m_t y_i}{\sigma_t^{d+1}(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}, \tag{23}$$
$$\frac{\partial_{x_i} g_2(x)}{g_1(x)} = -\frac{1}{\sigma_t} \cdot \frac{\int \frac{\mathbb{I}[i=1] - \frac{x_1 - m_t y_1}{\sigma_t} \frac{x_i - m_t y_i}{\sigma_t}}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}. \tag{24}$$

In order to bound them, we consider the following quantity with $\sum_{i=1}^d s_i \leq 2$. Also, let $\varepsilon$ be a scalar value specified later, with which we assume $p_t(x) \geq \varepsilon$ holds for the moment.
$$\frac{\int \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy} \tag{25}$$

According to Lemma F.10, we have that
$$\left| \int_{A^x} \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy - \int_{\mathbb{R}^d} \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy \right| \leq \frac{\varepsilon}{2},$$
where $A^x = \prod_{i=1}^d a_i^x$ with $a_i^x = [\frac{x_i}{m_t} - \frac{\sigma_t C_f}{m_t} \sqrt{\log 2\varepsilon^{-1}}, \frac{x_i}{m_t} + \frac{\sigma_t C_f}{m_t} \sqrt{\log 2\varepsilon^{-1}}]$. Note that $C_f$ only depends on $\sum_{i=1}^d s_i$, $d$, and $C_f$.

Therefore, when $p_t(x) = g_1(x) \geq \varepsilon$,
$$(25) \leq \frac{2 \int \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int_{A^x} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{\sigma_t^2}\right) dy}$$

### Visual Description
Text-only slide.

---

## Page 18

### Content
**Diffusion Models are Minimax Optimal Distribution Estimators**

$$\leq \frac{2 \int_{A^x} \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int_{A^x} \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{\sigma_t^2}\right) dy} + \frac{2 \cdot \frac{\varepsilon}{2}}{\varepsilon}$$
(note that the denominator is larger than $\varepsilon$)
$$\leq 2 \max_{y \in A^x} \left| \prod_{i=1}^d \left(\frac{x_i - m_t y_i}{\sigma_t}\right)^{s_i} \right| + 1$$
$$\leq 2 (C_f^2 \log \varepsilon^{-1})^{(\sum_{i=1}^d s_i)/2} + 1. \tag{26}$$

Applying this bound to (22), (23), and (24), $\frac{g_2(x)}{g_1(x)}$, $\frac{\partial_{x_i} g_1(x)}{g_1(x)}$, and $\frac{\partial_{x_i} g_2(x)}{g_1(x)}$ are bounded by
$$\log^{1/2} \varepsilon^{-1}, \frac{\log^{1/2} \varepsilon^{-1}}{\sigma_t}, \text{ and } \frac{\log \varepsilon^{-1}}{\sigma_t},$$
up to constant factors, respectively. Finally, we apply this to (21) and obtain that
$$\|\nabla \log p_t(x)\| \lesssim \frac{\log^{1/2} \varepsilon^{-1}}{\sigma_t} \text{ and, } \|\partial_{x_i} \nabla \log p_t(x)\| \lesssim \frac{\log \varepsilon^{-1}}{\sigma_t^2}.$$

Now we replace $\varepsilon$ with a specific value. Remember that $\varepsilon$ should satisfy $\varepsilon \leq p_t(x)$. According to Lemma A.2, we have $C_{a,2}^{-1} \exp\left(-\frac{d(\|x\|_\infty - m_t)_+^2}{\sigma_t^2}\right) \leq p_t(x)$, which yields that
$$\|\nabla \log p_t(x)\| \leq \frac{C_{a,3}}{\sigma_t} \cdot \left(\frac{(\|x\|_\infty - m_t)_+}{\sigma_t} \vee 1\right), \text{ and } \|\partial_{x_i} \nabla \log p_t(x)\| \leq \frac{C_{a,3}}{\sigma_t^2} \left(\frac{(\|x\|_\infty - m_t)_+^2}{\sigma_t^2} \vee 1\right),$$
with $C_{a,3}$ depending on $k, d$ and $C_f$. Thus, we obtain (17) and (18).

Finally, we consider $\partial_t \nabla \log p_t(x)$.
$$\partial_t \nabla \log p_t(x) = \partial_t \left( \frac{1}{\sigma_t} \cdot \frac{g_2(x)}{g_1(x)} \right) = \left(\partial_t \frac{1}{\sigma_t}\right) \frac{g_2(x)}{g_1(x)} - \frac{1}{\sigma_t} \cdot \frac{(\partial_t g_1(x))}{g_1(x)} \cdot \frac{g_2(x)}{g_1(x)} + \frac{1}{\sigma_t} \cdot \frac{\partial_t g_2(x)}{g_1(x)}$$
$$= \frac{(-\partial_t \sigma_t)}{\sigma_t} \nabla \log p_t(x)$$
$$- \frac{1}{\sigma_t} \cdot \frac{\int \frac{-d(\partial_t \sigma_t)\sigma_t^{-1} + \|x - m_t y\|^2 (\partial_t \sigma_t)\sigma_t^{-3} - (\partial_t m_t)y^\top(m_t y - x)\sigma_t^{-2}}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy} \cdot \nabla \log p_t(x)$$
$$+ \frac{1}{\sigma_t} \cdot \frac{\int \frac{(\partial_t m_t)y_1 + (x_1 - m_t y_1)((d+1)(\partial_t \sigma_t)\sigma_t^{-1} - \|x - m_t y\|^2 (\nabla_t \sigma_t)\sigma_t^{-3} + (\partial_t m_t)y^\top(m_t y - x)\sigma_t^{-2})}{\sigma_t^{d+1}(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}$$
By carefully decomposing this into the sum of (25), and then applying (26) and Lemma A.2, we have the final bound (19). $\square$

Now, based on Lemma A.3 we show that we only need to approximate $\nabla \log p_t(x)$ on some bounded region and on $x$ where $p_t(x)$ is not too small.

**Lemma A.4 (Error bounds due to clipping operations).** Let $t \geq \underline{T}$. There exists a constant $C_{a,4}$ depending on $d$ and $C_f$, we have
$$\int_{\|x\|_\infty \geq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1} \underline{T}^{-1}}} p_t(x) \|\nabla \log p_t(x)\|^2 dx \leq \varepsilon, \tag{27}$$
$$\int_{\|x\|_\infty \geq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1} \underline{T}^{-1}}} p_t(x) dx \leq \varepsilon \tag{28}$$

### Visual Description
Text-only slide.

---

## Page 19

### Content
**Diffusion Models are Minimax Optimal Distribution Estimators**

for all $t \geq \underline{T}$.

Moreover, there exists a constant $C_{a,5}$ depending on $d$ and $C_f$ and, for $x$ such that $\|x\|_\infty \leq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1}}$, we have
$$\|\nabla \log p_t(x)\| \leq \frac{C_{a,5}}{\sigma_t} \sqrt{\log \varepsilon^{-1}}.$$

Therefore,
$$\int_{\|x\|_\infty \leq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1} \underline{T}^{-1}}} p_t(x) \mathbb{I}[p_t(x) \leq \varepsilon] \|\nabla \log p_t(x)\|^2 dx \leq \frac{C_{a,5} \varepsilon}{\sigma_t^2} \cdot \log^{\frac{d+2}{2}} (\varepsilon^{-1} \underline{T}^{-1}), \tag{29}$$
$$\int_{\|x\|_\infty \leq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1} \underline{T}^{-1}}} p_t(x) \mathbb{I}[p_t(x) \leq \varepsilon] dx \leq C_{a,5} \varepsilon \cdot \log^{\frac{d}{2}} (\varepsilon^{-1} \underline{T}^{-1}). \tag{30}$$

*Proof.* According to Lemma A.2 and Lemma A.3,
$$p_t(x) \|\nabla \log p_t(x)\|^2 \leq C_{a,2} \exp\left(-\frac{(\|x\|_\infty - m_t)_+^2}{2\sigma_t^2}\right) \cdot \frac{C_{a,3}^2}{\sigma_t^2} \frac{(\|x\|_\infty - m_t)_+^2}{\sigma_t^2}$$
$$\leq \frac{C_{a,2} C_{a,3}^2}{\sigma_t^2} \exp\left(-\frac{r^2}{2}\right) r^2,$$
where we let $r := (\|x\|_\infty - m_t)_+ / \sigma_t$. Then,
$$\int_{\|x\|_\infty \geq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1}}} p_t(x) \|\nabla \log p_t(x)\|^2 dx$$
$$\leq \int_{C_{a,4} \sqrt{\log \varepsilon^{-1}}}^\infty \frac{C_{a,2} C_{a,3}^2}{\sigma_t} \exp\left(-\frac{r^2}{2}\right) r^2 (d-1)(\sigma_t r + m_t)^{d-1} dr$$
$$\lesssim \frac{1}{\sigma_t} \varepsilon \log^{d/2} \varepsilon^{-1}.$$

We can make sure the final inequality by integration by parts. Because $\sigma_t \gtrsim \sqrt{\underline{T}}$, if we take $\varepsilon' = \sqrt{\underline{T}} \cdot \varepsilon^2$ then we have that $\frac{1}{\sigma_t} \varepsilon' \log^{d/2} ((\varepsilon')^{-1}) \lesssim \varepsilon$. Therefore, replacing $\varepsilon$ with $\varepsilon'$ and adjusting $C_{a,4}$ yield the bound (27).

In the same way,
$$\int_{\|x\|_\infty \geq m + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1}}} p_t(x) dx \leq \int_{C_{a,4} \sqrt{\log \varepsilon^{-1}}}^\infty C_{a,2} \sigma_t \exp\left(-\frac{r^2}{2}\right) (d-1)(\sigma_t r + m)^{d-1} dr$$
$$\lesssim \sigma_t \varepsilon \log^{(d-2)/2} \varepsilon^{-1},$$
which yields (28).

We then consider the second part of the lemma. Eq. (28) is a direct corollary of Lemma A.3: for $x$ with $\|x\|_\infty \leq m_t + C_{a,5} \sigma_t \sqrt{\log \varepsilon^{-1}}$
$$\|\nabla \log p_t(x)\| \leq \frac{C_{a,3}}{\sigma_t} \cdot C_{a,4} \sqrt{\log \varepsilon^{-1}} \leq \frac{C_{a,5}}{\sigma_t} \sqrt{\log \varepsilon^{-1}}. \text{ (by taking } C_{a,5} \text{ larger than } C_{a,3} C_{a,4} \text{.)}$$

Using this, we have
$$\int_{\|x\|_\infty \leq m_t + C_{a,4} \sigma_t \sqrt{\log \varepsilon^{-1}}} p_t(x) \mathbb{I}[p_t(x) \leq \varepsilon] \|\nabla \log p_t(x)\|^2 dx \lesssim \varepsilon \cdot \frac{C_{a,4}^2}{\sigma_t^2} \log \varepsilon^{-1} \cdot (m_t + C_{a,5} \sigma_t \sqrt{\log \varepsilon^{-1}})^d.$$
Adjusting $C_{a,4}, C_{a,5}$ and resetting $\varepsilon$ yields (29). Eq. (30) follows in the same way. $\square$

### Visual Description
Text-only slide.

---

## Page 20

### Content
**Diffusion Models are Minimax Optimal Distribution Estimators**

### B. Approximation of the score function
In this section, we analyze approximation error for the (ideal) score matching loss minimization. We construct a neural network that approximates $\nabla \log p_t(x)$ and bound the approximation error at each time $t$. Throughout this section, we take a sufficiently large $N$ as a parameter that determines the size of the neural network, and $\underline{T} = \text{poly}(N^{-1})$ and $\overline{T} = \mathcal{O}(\log N)$.

#### B.1. Approximation of $m_t$ and $\sigma_t$
We begin with construction of sub-networks that approximate $m_t$ and $\sigma_t$. In addition to the true data distribution $p_0(x)$, the score $\nabla \log p_t(x)$ also depends on $m_t$ and $\sigma_t$. Indeed, in our construction, each diffused B-spline basis is approximated as a rational function of $x, m_t$ and $\sigma_t$. Here, $m_t$ and $\sigma_t$ are as important as $x$, because we use exponentiation of $m_t$ and $\sigma_t$, as well as that of $x$, while exact values of $m_t$ and $\sigma_t$ are unavailable. In other words, because approximation errors of $m_t$ and $\sigma_t$ are amplified via such exponentiation, approximating $m_t$ and $\sigma_t$ with high accuracy is necessary for obtaining tight bounds. Therefore, in this subsection, we construct sub-networks for efficient approximation of $m_t$ and $\sigma_t$. The following is the formal version of Lemma 3.3.

**Lemma B.1.** Let $0 < \varepsilon < \frac{1}{2}$. Then, there exists a neural network $\phi_m(t) \in \Phi(L, W, B, S)$ that approximates $m_t$ for all $t \geq 0$, within the additive error of $\varepsilon$, where $L = \mathcal{O}(\log^2 \varepsilon^{-1})$, $\|W\|_\infty = \mathcal{O}(\log \varepsilon^{-1})$, $S = \mathcal{O}(\log^2 \varepsilon^{-1})$, and $B = \exp(\mathcal{O}(\log^2 \varepsilon^{-1}))$.

Also, there exists a neural network $\phi_\sigma(t) \in \Phi(L, W, B, S)$ that approximates $\sigma_t$ for all $t \geq \varepsilon$, within the additive error of $\varepsilon$, where $L \leq \mathcal{O}(\log^2 \varepsilon^{-1})$, $\|W\|_\infty = \mathcal{O}(\log^3 \varepsilon^{-1})$, $S = \mathcal{O}(\log^4 \varepsilon^{-1})$, and $B = \exp(\mathcal{O}(\log^2 \varepsilon^{-1}))$.

*Proof.* First we consider $m_t = \exp(-\int_0^t \beta_s ds)$. Since $\beta \geq \underline{\beta}$, $\int_0^t \beta_s ds \geq \log 4\varepsilon^{-1}$ for all $t \geq A := \log 4\varepsilon^{-1}/\underline{\beta}$. We limit ourselves within $[0, A]$. Then, from Assumption 2.5, we can expand $\beta_s$ as $\beta_s = \sum_{i=0}^{k-1} \frac{\beta^{(i)}}{i!} s^i + \frac{\beta^{(k)}}{k!} (\theta s)^k$ with $|\beta^{(i)}| \leq 1$ and $0 < \theta < 1$, and therefore we obtain that
$$\left| \int_0^t \beta_s ds - \int_0^t \sum_{i=1}^{k-1} \frac{\beta^{(i)}}{i!} s^i ds \right| \leq \frac{|\beta^{(k)}| A^{k+1}}{(k+1)!} \leq \frac{A^{k+1}}{(k+1)!}.$$
We take $k = \max\{2eA, \lceil \log_2 4\varepsilon^{-1} \rceil\} - 1$ so that we have $\frac{A^{k+1}}{(k+1)!} \leq \left(\frac{eA}{k+1}\right)^{k+1} \leq \frac{\varepsilon}{4}$. $\int_0^t \sum_{i=1}^{k-1} \frac{\beta^{(i)}}{i!} s^i = \sum_{i=1}^{k-1} \frac{\beta^{(i)}}{(i+1)!} t^{i+1}$ can be realized with an additive error up to $\frac{\varepsilon}{4}$ by the neural network with $L = \mathcal{O}(A^2 + \log^2 \varepsilon^{-1}) = \mathcal{O}(\log^2 \varepsilon^{-1})$, $\|W\|_\infty = \mathcal{O}(A + \log \varepsilon^{-1}) = \mathcal{O}(\log \varepsilon^{-1})$, $S = \mathcal{O}(A^2 + \log^2 \varepsilon^{-1}) = \mathcal{O}(\log^2 \varepsilon^{-1})$, $B = \exp(\log^2 \mathcal{O}(A + \log \varepsilon^{-1})) = \mathcal{O}(\log^2 \varepsilon^{-1})$, using Lemmas F.3 and F.6. From the definition of $A$, we can easily check that $e^{-A} \leq \frac{\varepsilon}{4}$ holds. We clip the input with $[0, A]$ to obtain the neural network $\phi_1$, which approximates $\int_0^t \beta_s ds$ with an additive error of $\frac{\varepsilon}{4} + \frac{\varepsilon}{4} = \frac{\varepsilon}{2}$ for $x \in [0, A]$, and satisfies $|\phi_1(x)| = |\phi_1(A)|$ for all $x \geq A$.

Then we apply Lemma F.12 with $\varepsilon = \frac{\varepsilon}{4}$. Then we obtain the neural network $\phi_m$ of the desired size, which approximates $m_t = \exp(-\int_0^t \beta_s ds)$ with an additive error of $\frac{\varepsilon}{2} + \frac{\varepsilon}{4} = \frac{3\varepsilon}{4}$ for $x \in [0, A]$ and $|\phi_m(x) - e^{-x}| \leq |\phi_m(x) - \phi_m(A)| + |\phi_m(A) - e^{-A}| + |e^{-A} - e^{-x}| \leq 0 + \frac{3\varepsilon}{4} + \frac{\varepsilon}{4} = \varepsilon$ for $x \geq A$.

Similarly, we can approximate $\sigma^2 = 1 - \exp(-2 \int_0^t \beta_s ds)$ with an additive error of $\mathcal{O}(\varepsilon^{1.5})$ using a neural network with $L = \mathcal{O}(\log^2 \varepsilon^{-1})$, $\|W\|_\infty = \mathcal{O}(\log \varepsilon^{-1})$, $S = \mathcal{O}(\log^2 \varepsilon^{-1})$, $B = \exp(\mathcal{O}(\log^2 \varepsilon^{-1}))$. Since $t \geq \varepsilon$, we have $\sigma_t^2 = 1 - \exp(-2 \int_0^t \beta_s ds) \geq c\varepsilon$ for some constant $c$ depending on $\beta$. Then, we apply Lemma F.9 with $\varepsilon = c\varepsilon$ and finally obtain a neural network $\phi_\sigma(t)$ that approximates $\sigma_t$ with an additive error of $c\varepsilon + \frac{\varepsilon^{1.5}}{\sqrt{c\varepsilon}} = \mathcal{O}(\varepsilon)$, with $L = \mathcal{O}(\log^2 \varepsilon^{-1})$, $\|W\|_\infty = \mathcal{O}(\log^3 \varepsilon^{-1})$, $S = \mathcal{O}(\log^4 \varepsilon^{-1})$, and $B = \exp(\mathcal{O}(\log^2 \varepsilon^{-1}))$. Adjusting hidden constants can make the approximation error smaller than $\varepsilon$, and concludes the proof. $\square$

#### B.2. Approximation via the diffused B-spline basis
This subsection introduces the approximation via the *diffused B-spline basis* and the *tensor-product diffused B-spline basis*, which enable us to approximate the score $\nabla \log p_t(x)$ in the space of $\mathbb{R}^d \times [\underline{T}, \overline{T}]$. Although we consider the function approximation in a $(d + 1)$-dimensional space, the obtained rate (Theorem 3.1) is the typical one for a $d$-dimensional

### Visual Description
Text-only slide.

---

## Page 21

### Content
**Diffusion Models are Minimax Optimal Distribution Estimators**

space. This is because our basis decomposition can reflect the structure of $p_0$ for $t > 0$. Before beginning the formal proof, we provide extended proof outline about the approximation via the diffusion B-spline basis and tensor-product diffused B-spline basis, which is more detailed than that in Section 3.

Remind that the cardinal B-spline basis of order $l$ can be written as
$$\mathcal{N}_m(x) = \frac{1}{l!} \mathbb{I}[0 \leq x \leq l + 1] \sum_{l'=0}^l (-1)^{l'} \binom{l+1}{l'} (x - l')_+^l$$
(see Eq. (4.28) of Mhaskar & Micchelli (1992) for example) and the function in the Besov space can be approximated by a sum of $M_{k,j}^d(x)$
$$M_{k,j}^d(x) = \prod_{i=1}^d \mathcal{N}_m(2^{k_i} x_i - j_i)$$
where $k \in \mathbb{Z}_+^d$ and $j \in \mathbb{Z}^d$.

Therefore, the denominator and numerator of the score
$$\nabla \log p_t(x) = \frac{\nabla p_t(x)}{p_t(x)} = -\frac{1}{\sigma_t} \cdot \frac{\int \frac{x - m_t y}{\sigma_t^{d+1}(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}{\int \frac{1}{\sigma_t^d(2\pi)^{d/2}} f(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy}$$
are decomposed into the sum of
$$E_{k,j}^{(1)}(x, t) := \int \frac{1}{\sigma_t^d(2\pi)^{d/2}} \mathbb{I}[\|y\|_\infty \leq C_{b,1}] M_{k,j}^d(y) \exp
## Page 25
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 25

$\mathcal{O}(\log^4 \varepsilon_1^{-1} + \log^4 m_\varepsilon^{-1})$, $B = \mathcal{O}(\varepsilon_1^{-l-1} + m_\varepsilon^{-l-1})$ and the approximation error between $f_6(m_t)$ and $\phi_6(m')$ is bounded by $\varepsilon_1 + (l + 1)\varepsilon_1^{-l-2} \varepsilon_{\text{error}} + (l + 1)m_\varepsilon^{-l-2} \varepsilon_{\text{error}}$, by setting $d = l + 1, \varepsilon = \min\{\varepsilon_1, m_\varepsilon\}$ in Corollary F.8. Note that $m_\varepsilon \gtrsim 1$.

Therefore, Lemma F.6 with $\varepsilon = \varepsilon_1$ yields that there exists a neural network $\phi_7^{l',s}(x, m, \sigma)$ such that
$$L = \mathcal{O}(\log^2 \varepsilon_1^{-1} + \log^2 \varepsilon^{-1} + \log^2 C + k),$$
$$\|W\|_\infty = \mathcal{O}(\log^3 \varepsilon_1^{-1} + \log^3 \varepsilon^{-1}),$$
$$S = \mathcal{O}(\log^4 \varepsilon_1^{-1} + \log^4 \varepsilon^{-1} + \log^2 C + k),$$
$$B = \mathcal{O}(\varepsilon_1^{-2} + C^2) + \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1} + C^l 2^{kl}.$$

where approximation error between $f_7^{l',s}(x, m_t, \sigma_t)$ and $\phi_7^{l',s}(x, m', \sigma')$ is bounded as
$$|f_7^{l',s}(x, \sigma, m) - \phi_7^{l',s}(x, m', \sigma')| \le (\varepsilon_1 + \varepsilon_{\text{error}}(\varepsilon_1^{-l-2} + C^{4l} 2^{4kl})) \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}.$$

Finally, we sum up $\phi_7^{l',s}(x, m', \sigma')$ multiplied $\frac{-(-1)^{s+l} l! C_{l'} 2^{kl'}}{\sqrt{2\pi} s! 2^s (l'+2s+2)}$ over $(l', s)$, according to (37) and using Lemma F.3. Here, the coefficient is bounded by $2^{(k+1)l}$ and the total number of possible combinations $(l', s)$ is bounded by $\mathcal{O}(lS) = \mathcal{O}(\log \varepsilon^{-1})$. Then, approximation error for (37) is bounded as
$$2^{(k+1)l} (\varepsilon_1 + \varepsilon_{\text{error}}(\varepsilon_1^{-l-2} + C^{4l} 2^{4kl})) \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}.$$

In order to bound the terms related to $\varepsilon_1$ by $\mathcal{O}(\varepsilon)$, we take $\varepsilon_1 = \mathcal{O}(2^{-(k+1)l} \log^{-\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1})$. Then, the total approximation error is bounded by $\tilde{\mathcal{O}}(\varepsilon) + \varepsilon_{\text{error}} C^{4l} 2^{k(4l+1)} \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}$ and this is achieved by a neural network with
$$L = \mathcal{O}(\log^4 \varepsilon^{-1} + \log^2 C + k),$$
$$\|W\|_\infty = \mathcal{O}(\log^6 \varepsilon^{-1}),$$
$$S = \mathcal{O}(\log^8 \varepsilon^{-1} + \log^2 C + k),$$
$$B = \mathcal{O}(C^l 2^{kl}) + \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}.$$

Finally, because
$$\left| \int \frac{\sigma_t C_f}{m_t} \sqrt{\log \varepsilon^{-1} + \frac{x}{m_t}} - \frac{\sigma_t C_{f,1}}{m_t} \sqrt{\log \varepsilon^{-1} + \frac{x}{m}} \frac{1}{\sqrt{2\pi} \sigma_t} \mathbb{1}[\underline{j} \le 2^k y \le \overline{j}] (2^k y - j)^l \exp\left(-\frac{(x - m_t y)^2}{2\sigma_t^2}\right) dy \right|$$
$$\le \int \frac{1}{\sqrt{2\pi} \sigma_t} \mathbb{1}[\underline{j} \le 2^k y \le \overline{j}] (l + 1)^l \exp\left(-\frac{(x - m_t y)^2}{2\sigma_t^2}\right) dy \lesssim C_f,$$
we can clip $\phi_{dif,1}^{j,\overline{j},j,k}$ so that it is bounded by $\mathcal{O}(1)$. $\square$

We now approximate the (modified) tensor product diffused B-spline basis. The following is the formal version of Lemma 3.4. Without the term of $\mathbb{1}[\|y\|_\infty \le C_{b,1}]$, the statement matches that of Lemma 3.4. This network $\phi_{dif,3}$ corresponds to $\phi_{TDB}$ in Lemma 3.4.

**Lemma B.3 (Approximation of the tensor-product diffused B-spline bases).** Let $k \in \mathbb{Z}_+, j \in \mathbb{Z}^d, l \in \mathbb{Z}_+$ with $-C 2^k - l \le j_i \le C 2^k$ ($i = 1, 2, \dots, d$), $\varepsilon$ ($0 < \varepsilon < \frac{1}{2}$) and $C > 0$. There exists a neural network $\phi_{dif,3}(x, t) \in \Phi(L, W, S, B)$ with
$$L = \mathcal{O}(\log^4 \varepsilon^{-1} + \log^2 C + k^2),$$
$$\|W\|_\infty = \mathcal{O}(\log^6 \varepsilon^{-1} + \log^3 C + k^3),$$
$$S = \mathcal{O}(\log^8 \varepsilon^{-1} + \log^4 C + k^4),$$
$$B = \exp(\log^4 \varepsilon^{-1} + \log C + k),$$

### Visual Description
Text-only slide.

---

## Page 26
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 26

such that
$$\left| \phi_{dif,3}^{k,j}(x, t) - \int_{\mathbb{R}^d} \frac{1}{\sigma_t^d (2\pi)^{d/2}} \mathbb{1}[\|y\|_\infty \le C_{b,1}] M_{k,j}^d(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy \right| \le \varepsilon$$
holds for all $x \in [-C, C]^d$.

Also, with the same conditions, there exists a neural network $\phi_{dif,4} \in \Phi(L, W, S, B)$ with the same bounds on $L, \|W\|_\infty, S, B$ as above such that
$$\left\| \phi_{dif,4}^{k,j}(x, \sigma', m') - \int_{\mathbb{R}^d} \frac{x - m_t y}{\sigma_t^{d+1} (2\pi)^{d/2}} \mathbb{1}[\|y\|_\infty \le C_{b,1}] M_{k,j}^d(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy \right\| \le \varepsilon.$$
holds for all $x \in [-C, C]^d$.

Furthermore, we can choose these networks so that $\|\phi_{dif,3}^{k,j}\|_\infty, \|\phi_{dif,4}^{k,j}\|_\infty = \mathcal{O}(1)$ hold.

*Proof.* Here we only prove the first part, because the second part follows in the same way. We assume $|\sigma' - \sigma_t|, |m' - m_t| \le \varepsilon_{\text{error}}$.
From the discussion (33), we approximate
$$\prod_{i=1}^d \left( \sum_{l'=0}^{l+1} \frac{(-1)^{l'} {}_{l+1}C_{l'}}{l!} \int_{y_i \in a_i^x} \frac{1}{\sigma(2\pi)^{1/2}} \mathbb{1}[|y_i| \le C_{b,1}] \mathbb{1}[0 \le 2^k y_i - j_i \le l + 1] \right.$$
$$\left. \times (2^k y_i - l' - j_i)_+^l \exp\left(-\frac{(x_i - m y_i)^2}{2\sigma^2}\right) dy_i \right), \quad (39)$$
which is equal to $D_{k,j}^d(x)$ within an additive error of $\mathcal{O}(\varepsilon)$, so we approximate (39). Here $a_i^x = [\frac{x_i}{m_t} - \frac{\sigma_t C_f}{m_t} \sqrt{\log \varepsilon^{-1}}, \frac{x_i}{m_t} + \frac{\sigma_t C_f}{m_t} \sqrt{\log \varepsilon^{-1}}]$.

We let $f_i(y_i; j_i, k, l') := \mathbb{1}[|y_i| \le C_{b,1}] \mathbb{1}[0 \le 2^k y_i - j_i \le l + 1] (2^k y_i - l' - j_i)_+^l \exp\left(-\frac{(x_i - m_t y_i)^2}{2\sigma_t^2}\right) dy_i$. First, $\sum_{l'=0}^{l+1} \frac{(-1)^{l'} {}_{l+1}C_{l'}}{l!} f_i(y_i; j_i, k, l')$ is approximated by $\sum_{l'=0}^{l+1} \frac{(-1)^{l'} {}_{l+1}C_{l'}}{l!} \phi_{dif,1}^{j_i-l', \overline{j}_{l'}, \underline{j}_{l'}, k}(y_i, \sigma', m')$ (see Lemma F.3 for aggregation of the networks). Here, $\overline{j}_{l'}$ and $\underline{j}_{l'}$ are defined so that $\mathbb{1}[\underline{j}_{l'} \le 2^k y \le \overline{j}_{l'}] = \mathbb{1}[|y_i| \le C_{b,1}] \mathbb{1}[0 \le 2^k y_i - j_i \le l + 1]$ holds.

Now we multiply $\sum_{l'=0}^{l+1} \frac{(-1)^{l'} {}_{l+1}C_{l'}}{l!} \phi_{dif,1}^{j_i, \overline{j}_{l'}, \underline{j}_{l'}, k}(y_i, \sigma', m')$ over $i = 1, 2, \dots, d$ using $\phi_{mult}$ to obtain the desired network $\phi_{dif,3}^{k,j}$. According to Lemma B.2 with $\varepsilon = \varepsilon$ and Lemma F.6 with $\varepsilon = \varepsilon$ and $C = \mathcal{O}(1)$ (because $\|\phi_{dif,1}^{j_i, \overline{j}_{l'}, \underline{j}_{l'}, k}\|_\infty = \mathcal{O}(1)$), there exists a neural network $\phi_1(x, m', \sigma') \in \Phi(L, W, S, B)$ with
$$L = \mathcal{O}(\log^4 \varepsilon^{-1} + \log^2 C + k),$$
$$\|W\|_\infty = \mathcal{O}(\log^6 \varepsilon^{-1}),$$
$$S = \mathcal{O}(\log^8 \varepsilon^{-1} + \log^2 C + k),$$
$$B = \mathcal{O}(C^l 2^{kl}) + \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}$$
and we can bound the approximation error between $\phi_1(x, m', \sigma')$ and (39) with
$$\tilde{\mathcal{O}}(\varepsilon) + \varepsilon_{\text{error}} C^{4l} 2^{k(4l+1)} \log^{\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}. \quad (40)$$
Now, we consider $\phi_{dif,3} = \phi_1(x, \phi_m(t), \phi_\sigma(t))$. We apply Lemma B.1 with $\varepsilon = C^{-4l} 2^{-k(4l+1)} \log^{-\mathcal{O}(\log \varepsilon^{-1})} \varepsilon^{-1}$, so

### Visual Description
Text-only slide.

---

## Page 27
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 27

that $\varepsilon_{\text{error}}$ gets small enough and (40) is bounded by $\tilde{\mathcal{O}}(\varepsilon)$. Then, the size of $\phi_{dif,3}$ is bounded by
$$L = \mathcal{O}(\log^4 \varepsilon^{-1} + \log^2 C + k^2),$$
$$\|W\|_\infty = \mathcal{O}(\log^6 \varepsilon^{-1} + \log^3 C + k^3),$$
$$S = \mathcal{O}(\log^8 \varepsilon^{-1} + \log^4 C + k^4),$$
$$B = \exp(\log^4 \varepsilon^{-1} + \log C + k).$$

Now, adjusting $\varepsilon$ to replace $\tilde{\mathcal{O}}(\varepsilon)$ by $\varepsilon$ yields the first assertion.
We can make $\|\phi_{dif,3}^{k,j}\|_\infty$ hold, because $\int_{\mathbb{R}^d} \frac{1}{\sigma_t^d (2\pi)^{d/2}} \mathbb{1}[\|y\|_\infty \le C_{b,1}] M_{k,j}^d(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy = \mathcal{O}(1)$. $\square$

### B.3. Approximation error bound: based on $p_0$
Now we put it all together and derive Theorem 3.1. Throughout this and the next subsections, we take $N \gg 1, T_1 = \underline{T} = \text{poly}(N^{-1})$ and $T_5 = \overline{T} = \mathcal{O}(\log N)$. Moreover, we let $T_2 = N^{-(2-\delta)/d}, T_3 = 2T_2, T_4 = 3T_2$. This subsection considers the approximation for $t \in [T_1, T_4]$.

We begin with the following lemma, which gives the basis decomposition of the Besov functions.
**Lemma B.4 (Basis decomposition).** Under $N \gg 1$, Assumptions 2.4, 2.5, 2.6 with $a_0 = N^{-(1-\delta)/d}$, there exists $f_N$ that satisfies
$$\|p_0 - f_N\|_{L^2([-1,1]^d)} \lesssim N^{-s/d},$$
$$\|p_0 - f_N\|_{L^2([-1,1]^d \setminus [-1+N^{-(1-\delta)/d}, 1-N^{-(1-\delta)/d}]^d)} \lesssim N^{-(3s+2)/d},$$
and $f_N(x) = 0$ for all $x$ with $\|x\|_\infty \ge 1$, and has the following form:
$$f_N(x) = \sum_{i=1}^N \alpha_i \mathbb{1}[\|x\|_\infty \le 1] M_{k,j_i}^d(x) + \sum_{i=N+1}^{3N} \alpha_i \mathbb{1}[\|x\|_\infty \le 1 - N^{-(1-\delta)/d}] M_{k,j_i}^d(x), \quad (41)$$
where $-2^{(k)m} - l \le (j_i)_m \le 2^{(k)m}$ ($i = 1, 2, \dots, N, m = 1, 2, \dots, d$), $|k| \le K^* = (\mathcal{O}(1) + \log N)\nu^{-1} + \mathcal{O}(d^{-1} \log N)$ for $\delta = d(1/p - 1/r)_+$ and $\nu = (2s - \delta)/(2\delta)$. Moreover, $|\alpha_i| \lesssim N^{(\nu^{-1} + d^{-1})(d/p-s)_+}$.

*Proof.* Because $p_0 \in \mathcal{C}^{3s+2}([-1, 1]^d \setminus [-1 + N^{-(1-\delta)/d}, 1 - N^{-(1-\delta)/d}]^d)$, according to Lemma F.13, we have $f_1$ such that
$$\|p_0 - f_1\|_{L^2([-1,1]^d \setminus [-1+N^{-(1-\delta)/d}, 1-N^{-(1-\delta)/d}]^d)} \lesssim N^{-(3s+2)/d}.$$
and has the following form:
$$f_1(x) = \sum_{i=1}^N \alpha_i M_{k,j_i}^d(x),$$
where $-2^{(k)m} - l \le (j_i)_m \le 2^{(k)m}$ ($i = 1, 2, \dots, N, m = 1, 2, \dots, d$), $|k| \le K^* = (\mathcal{O}(1) + \log N)\nu^{-1} + \mathcal{O}(d^{-1} \log N)$ for $\delta = d(1/p - 1/r)_+$ and $\nu = (2s - \delta)/(2\delta)$. Moreover, $|\alpha_{1,i}| \lesssim N^{(\nu^{-1} + d^{-1})(d/p-2s)_+}$.
Next let us approximate $f$ in $[-1, 1]^d$. Because $\|p_0\|_{B_{p,q}^s} \le 1$, we have $f_2$ such that
$$\|p_0 - f_2\|_{L^2([-1,1]^d)} \lesssim N^{-s/d}.$$
and has the following form:
$$f_2(x) = \sum_{i=N+1}^{2N} \alpha_i M_{k,j_i}^d(x),$$

### Visual Description
Text-only slide.

---

## Page 28
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 28

where $-2^{(k)j} - l \le (j_i)_j \le 2^{(k)j}$ ($i = 1, 2, \dots, N, j = 1, 2, \dots, d$), $|k| \le K^* = (\mathcal{O}(1) + \log N)\nu^{-1} + \mathcal{O}(d^{-1} \log N)$ for $\delta = d(1/p - 1/r)_+$ and $\nu = (s - \delta)/(2\delta)$. Moreover, $|\alpha_{2,i}| \lesssim N^{(\nu^{-1} + d^{-1})(d/p-s)}$.

Therefore,
$$\mathbb{1}[\|x\|_\infty \le 1] f_1(x) - \mathbb{1}[\|x\|_\infty \le 1 - N^{-(1-\delta)/d}] f_1(x) + \mathbb{1}[\|x\|_\infty \le 1 - N^{-(1-\delta)/d}] f_2(x)$$
$$= \sum_{i=1}^N \alpha_i M_{k_i,j_i}^d(x) - \sum_{i=1}^N \alpha_i \mathbb{1}[\|x\|_\infty \le 1 - N^{-(1-\delta)/d}] M_{k_i,j_i}^d(x) + \sum_{i=N+1}^{2N} \alpha_i \mathbb{1}[\|x\|_\infty \le 1 - N^{-(1-\delta)/d}] M_{k_i,j_i}^d(x)$$
holds and reindexing the bases gives the result. $\square$

The following lemma gives neural network that approximates $\nabla \log p_t(x)$ in $[T_1, T_4]$.
**Lemma B.5 (Approximation of score function for $T_1 \le t \le T_4$).** There exists a neural network $\phi_{score,1} \in \Phi(L, W, S, B)$ that satisfies
$$\int p_t(x) \|\phi_{score,1}(x, t) - \nabla \log p_t(x)\|^2 dx dt \lesssim \frac{N^{-2s/d} \log N}{\sigma_t^2} \quad (42)$$
Here, $L, \|W\|_\infty, S, B$ is evaluated as
$$L = \mathcal{O}(\log^4 N), \quad \|W\|_\infty = \mathcal{O}(N \log^6 N), \quad S = \mathcal{O}(N \log^8 N), \quad \text{and } B = \exp(\mathcal{O}(\log^4 N)).$$

*Proof.* Before we proceed to the main part of the proof, we limit the discussion into the bounded region. According to Lemma A.4, we have that
$$\int_{\|x\|_\infty \ge m_t + \mathcal{O}(1)\sigma_t \sqrt{\log N}} p_t(x) \|s(x, t) - \nabla \log p_t(x)\|^2 dx \lesssim \frac{\underline{T}}{N^{(2s+1)/d}} (1 + \|s(\cdot, t)\|_\infty^2), \quad (43)$$
with a sufficiently large hidden constant in $\mathcal{O}(1)$. Because $\|\nabla \log p_t(x)\|$ is bounded with $\frac{\log^{1/2} N}{\sigma_t}$ in $\|x\|_\infty \ge m_t + \mathcal{O}(1)\sigma_t \sqrt{\log N}$ due to Lemma A.3, $s$ can be taken so that $\|s(\cdot, t)\|_\infty \lesssim \frac{\log^{1/2} N}{\sigma_t}$ and therefore (43) is bounded by $\frac{\underline{T}}{N^{(2s+1)/d}} \cdot \frac{\log N}{\underline{T}} = N^{-(2s+1)/d} \log N$, which is smaller than the upper bound of (42). Thus, we can focus on the approximation of the score $\nabla \log p_t(x)$ within $\|x\|_\infty \le m_t + \mathcal{O}(1)\sigma_t \sqrt{\log N} = \mathcal{O}(1)$. Moreover, we can also exclude the case where $p_t(x) \le N^{-(2s+1)/d}$, because Lemma A.4 can bound the error
$$\int_{\|x\|_\infty \le m_t + \mathcal{O}(1)\sigma_t \sqrt{\log N}} p_t(x) \mathbb{1}[p_t(x) \le \varepsilon] \|s(x, t) - \nabla \log p_t(x)\|^2 dx \lesssim \frac{\varepsilon}{\sigma_t^2} \log^{\frac{d+2}{2}} (\varepsilon^{-1} \underline{T}^{-1}) + \varepsilon \|s(x, t)\|$$
$$\lesssim \frac{\varepsilon}{\sigma_t^2} \log^{\frac{d+2}{2}} (\varepsilon^{-1} \underline{T}^{-1}) + \frac{\varepsilon}{\sigma_t^2} \log N, \quad (44)$$
and setting $\varepsilon = N^{-(2s+1)/d}$ makes (44) smaller than the bound (42).
Thus, in the following, we consider $x$ such that $\|x\|_\infty \le m_t + \mathcal{O}(1)\sigma_t \sqrt{\log N} = \mathcal{O}(1)$ and $p_t(x) \ge N^{-(2s+1)/d}$ holds. In this case, we have $\|\nabla \log p_t(x)\| \lesssim \frac{\log^{1/2} N}{\sigma_t}$.
The construction is straightforward. Based on (41) of Lemma B.4, we let
$$p_t(x) = \int \frac{1}{\sigma_t^d (2\pi)^{d/2}} p_0(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy \doteq \int \frac{1}{\sigma_t^d (2\pi)^{d/2}} f_N(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy$$
$$= \sum_{i=1}^N \alpha_i E_{k_i,j_i}^{(1)}(x, t) =: \tilde{f}_1(x, t),$$
$$f_1(x, t) := \tilde{f}_1(x, t) \vee N^{-(2s+1)/d},$$

### Visual Description
Text-only slide.

---

## Page 29
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 29

and
$$\sigma_t \nabla p_t(x) = \int \frac{x - m_t y}{\sigma_t^{d+1} (2\pi)^{d/2}} p_0(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy \doteq \int \frac{x - m_t y}{\sigma_t^{d+1} (2\pi)^{d/2}} f_N(y) \exp\left(-\frac{\|x - m_t y\|^2}{2\sigma_t^2}\right) dy$$
$$= \sum_{i=1}^N \alpha_i E_{k_i,j_i}^{(2)}(x, t) =: f_2(x, t),$$
$$f_3(x, t) := \frac{f_2(x, t)}{f_1(
## Page 33
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 33**

Because all derivatives up to order $\alpha$ is bounded by $\sigma_{t_*}^{-\alpha} \lesssim t_*^{-\alpha/2} \vee 1$, $\frac{p_{t_*}(x)}{t_*^{-\alpha/2} \vee a}$ belongs to $W_\infty^\alpha$ and its norm in $W_\infty^\alpha$ is bounded by a constant depending on $\alpha$, and hence to $B_{\infty,\infty}^\alpha$. Therefore, according to Lemma F.13, there exists a basis decomposition with the order of the B-spline basis $l = \alpha + 2$:

$$f_{N'}(x) = (t_*^{-\alpha/2} \vee 1) \sum_{i=1}^N \alpha_i M_{k_i, j_i}^d(x).$$

such that

$$\|p_{t_*} - f_{N'}\|_{L^2([-O(\sqrt{\log N}), O(\sqrt{\log N})]^d)} \lesssim (\sqrt{\log N})^\alpha N'^{-\alpha/d} t_*^{-\alpha/2}$$
$$= (\sqrt{\log N})^\alpha N^{-\alpha\delta/2d} = (\sqrt{\log N})^\alpha N^{-(3s+6)/d} \lesssim N^{-(3s+5)/d},$$

where $-\sqrt{\log N} 2^{(k_i)_m-l} \lesssim (j_i)_l \lesssim \sqrt{\log N} 2^{(k_i)_l}$ ($i = 1, 2, \dots, N, m = 1, 2, \dots, d$), $\|k_i\|_\infty \le K = O(d^{-1} \log N)$, and $|\alpha_i| \lesssim 1$. Also, Lemma A.4 with $\epsilon = N^{-\frac{6s+10}{d}}$ and $m_{t_*} + O(1)\sigma_{t_*} \sqrt{\log N} \lesssim \sqrt{\log N}$ guarantees that $\|p_{T_2} - f_N\|_{L^2(\mathbb{R}^d \subseteq [-O(\sqrt{\log N}), O(\sqrt{\log N})]^d)} \lesssim N^{-(3s+5)/d}$. Therefore, by resetting $\alpha_i \leftarrow (t_*^{-\alpha/2} \vee 1)\alpha_i$, the assertion holds. ($\alpha_i$ is then bounded by $T_2^{-\alpha/2}$.) $\square$

Lemma B.6 gives a concrete construction of the neural network for $T_3 \le t \le T_5$.

**Lemma B.7** (Approximation of score function for $T_3 \le t \le T_5$; Lemma 3.6). *Let $N \gg 1$ and $N' \ge t_*^{-d/2} N^{\delta/2}$. Suppose $t_* \ge N^{-(2-\delta)/d}$. Then there exists a neural network $\phi_{score,2} \in \Phi(L, W, S, B)$ that satisfies*

$$\int_x p_t(x) \|\phi_{score,2}(x, t) - s(x, t)\|^2 dx \lesssim \frac{N^{-\frac{2(s+1)}{d}}}{\sigma_t^2}$$

*for $t \in [2t_*, \overline{T}]$. Specifically, $L = O(\log^4(N))$, $\|W\|_\infty = O(N)$, $S = O(N')$, and $B = \exp(O(\log^4 N))$. Moreover, we can take $\phi_{score,2}$ satisfying $\|\phi_{score,2}\|_\infty = O(\sigma_t^{-1} \log^{1/2} N)$.*

**Proof.** The proof is essentially the same as that of Lemma B.5. Here, the slight differences are that (i) $p_t$, $\phi_{dif,8}$, and $f_1$ are lower bounded by $N^{-(2s+3)/d}$, not by $N^{-(2s+1)/d}$, that (ii) $L^2(p_t)$ error should be bounded by $\frac{N^{-\frac{2(s+1)}{d}}}{\sigma_t^2}$, not by $\frac{N^{-2s/d}}{\sigma_t^2}$, and that (iii) $p_{t_*}$ is supported on $\mathbb{R}^d$, not on $[-1, 1]^d$. Bounding the difference between Observe that $t_* \ge T_1 = N^{-\frac{2-\delta}{d}}$ holds, which is necessary to apply the argument of Lemma B.5.

Let us reset the time $t \leftarrow t - t_*$ in the following proof and consider the diffusion process from $p_0$ (in the new definition), for simplicity. We have $t \ge t_* \gtrsim \text{poly}(N^{-1})$ in the new definition. According to Lemma A.4, we have that

$$\int_{\|x\|_\infty \ge m_t + O(1)\sigma_t \sqrt{\log N}} p_t(x) \|s(x, t) - \nabla \log p_t(x)\|^2 dx \lesssim \frac{t_*}{N^{(2s+2)/d}} (1 + \|s(\cdot, t)\|_\infty^2), \quad (53)$$

with a sufficiently large hidden constant in $O(1)$. We limit the domain of $x$ into $\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N} = O(\sqrt{\log N})$. In this region, Lemma A.3 yields $\|\nabla \log p_t(x)\| \lesssim \frac{\sqrt{\log N}}{\sigma_t}$, and therefore we can take $s$ such that $\|s(\cdot, t)\|_\infty \le \frac{\sqrt{\log N}}{\sigma_t} \lesssim \frac{\sqrt{\log N}}{\sqrt{t_* \wedge 1}}$ holds. Then, (53) is bounded by $N^{-2(s+1)/d}$. Moreover,

$$\int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} p_t(x) \mathbb{1}[p_t(x) \le N^{-(2s+3)/d}] \|s(x, t) - \nabla \log p_t(x)\|^2 dx \lesssim \frac{\epsilon}{\sigma_t^2} \log^{\frac{d+2}{2}}(N) + \epsilon \|s(x, t)\|$$
$$\lesssim \left( \frac{N^{-(2s+3)/d}}{\sigma_t^2} \log^{\frac{d+2}{2}}(N) + \frac{N^{-(2s+3)/d}}{\sigma_t^2} \log N \right) \log^{\frac{d}{2}} N \lesssim N^{-2(s+1)/d}.$$

This means that we only need to consider $x$ with $p_t(x) \ge N^{-(2s+3)/d}$.

### Visual Description
Text-only slide.

---

## Page 34
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 34**

Using the basis decomposition in the previous lemma, we let

$$p_t(x) = \int \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} p_0(y) \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) dy \approx \int \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} f_N(y) \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) dy$$
$$= \sum_{i=1}^{N'} \alpha_i E_{k_i, j_i}^{(1)}(x, t) =: \tilde{f}_1(x, t),$$
$$f_1(x, t) := \tilde{f}_1(x, t) \vee N^{-(2s+3)/d},$$

and

$$\sigma_t \nabla p_t(x) = \int \frac{x - m_t y}{\sigma_t^{d+1} (2\pi)^{\frac{d}{2}}} p_0(y) \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) dy \approx \int \frac{x - m_t y}{\sigma_t^{d+1} (2\pi)^{\frac{d}{2}}} f_N(y) \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) dy$$
$$= \sum_{i=1}^{N'} \alpha_i E_{k_i, j_i}^{(2)}(x, t) =: f_2(x, t),$$
$$f_3(x, t) := \frac{f_2(x, t)}{f_1(x, t)} \mathbb{1} \left[ \left\| \frac{f_2(x, t)}{f_1(x, t)} \right\| \lesssim \frac{\log^{\frac{1}{2}} N}{\sigma_t} \right]$$

(exactly the same definitions as that in Lemma B.5, except for $f_1(x, t) := \tilde{f}_1(x, t) \vee N^{-(2s+3)/d}$). Then we approximate each $\alpha_i E_{k_i, j_i}^{(1)}(x, t)$ and $\alpha_i E_{k_i, j_i}^{(2)}(x, t)$ using Lemma B.3 with $\epsilon \lesssim N'^{-1} \cdot N^{\frac{(3s+6)(2-\delta)}{\delta}} \cdot N^{-\frac{9s+10}{d}}$ and $C = m_t + O(1)\sigma_t \sqrt{\log N} = O(\sqrt{\log N})$ and aggregate them by Lemma F.3 to obtain $\phi_{dif,8}(x, t)$ and $\phi_{dif,9}(x, t)$, that approximate $f_1$ and $f_2$, respectively, and satisfy

$$|f_1(x, t) - \phi_{dif,8}(x, t)| \lesssim N^{-\frac{9s+3}{d}}, \quad \|f_2(x, t) - \phi_{dif,9}(x, t)\| \lesssim N^{-\frac{9s+10}{d}}$$

for all $x$ with $\|x\|_\infty = O(\sqrt{\log N})$. Now, we define $\phi_{dif,7}$ as

$$[\phi_{dif,10}(x, t)]_i := \phi_{clip}(\phi_{mult}(\phi_{rec}(\phi_{clip}(\phi_{dif,8}(x, t); N^{-(2s+3)/d}, O(1)))), [\phi_{dif,9}(x, t)]_i); -O(\log^{\frac{1}{2}} N), O(\log^{\frac{1}{2}} N)),$$

where we let $\epsilon = N^{-(3s+4)/d}$ in Lemma F.7 for $\phi_{rec}$ and we let $\epsilon = N^{-(s+1)/d}$ and $C = N^{(2s+3)/d}$ for $\phi_{mult}$ in Lemma F.6. Finally, we let

$$\phi_{score,2}(x, t) := \phi_{mult}(\phi_{dif,10}(x, t), \phi_\sigma(t)).$$

where $\epsilon = N^{-(s+1)/d}$ and $C \simeq \max\{\log^{\frac{1}{2}} N, \sigma_T\} \lesssim \text{poly}(N)$ in Lemma F.6 for $\phi_{mult}$ and $\epsilon = N^{-(s+1)/d}/\text{poly}(N)$ in Lemma B.1 for $\phi_\sigma$. In summary, we can check that

$$\left\| \phi_{score,2}(x, t) - \frac{f_3(x, t)}{\sigma_t} \right\| \lesssim N^{-(s+1)/d}$$

holds for all $x$ with $\|x\|_\infty \lesssim \sqrt{\log N}$ and therefore

$$\int_{\|x\|_\infty \lesssim \sqrt{\log N}} p_t(x) \left\| \phi_{score,2}(x, t) - \frac{f_3(x, t)}{\sigma_t} \right\|^2 \lesssim N^{-(s+1)/d}. \quad (54)$$

Moreover, the size of $\phi_{score,2}$ is bounded by

$$L = O(\log^4 N), \quad \|W\|_\infty = O(N' \log^6 N) \lesssim O(N), \quad S = O(N' \log^8 N), \text{ and } B = \exp(\log^4 N). \quad (55)$$

Now, we consider the difference between $f_3(x, t)/\sigma_t$ and $\nabla \log p_t(x)$. Its $L^2$ error in $\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}$ is

### Visual Description
Text-only slide.

---

## Page 35
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 35**

bounded as previously, and we finally get

$$\int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} \mathbb{1}[p_t(x) \ge N^{-\frac{2s+3}{d}}] p_t(x) \left\| \frac{f_3(x, t)}{\sigma_t} - \frac{\nabla p_t(x)}{p_t(x)} \right\|^2 dx$$
$$\lesssim N^{\frac{4s+6}{d}} \int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} (|f_1(x, t) - p_t(x)|^2 + \|f_2(x, t) - \sigma_t \nabla p_t(x)\|^2) \log N / \sigma_t^2 dx$$
$$\lesssim N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} \left| \int_y \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) (p_0(y) - f_N(y)) dy \right|^2 dx$$
$$+ N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} \left\| \int_y \frac{x - m_t y}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) (p_0(y) - f_N(y)) dy \right\|^2 dx$$
$$\lesssim N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} \int_y \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) |p_0(y) - f_N(y)|^2 dy dx$$
$$+ N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_{\|x\|_\infty \le m_t + O(1)\sigma_t \sqrt{\log N}} \int_y \frac{\|x - m_t y\|}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) |p_0(y) - f_N(y)|^2 dy dx$$
$$\lesssim N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_y \int_x \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) |p_0(y) - f_N(y)|^2 dx dy$$
$$+ N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_y \int_x \frac{\|x - m_t y\|}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{\|x - m_t y\|^2}{2\sigma_t^2} \right) |p_0(y) - f_N(y)|^2 dx dy$$
$$\lesssim N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \int_y |p_0(y) - f_N(y)|^2 dy \lesssim N^{\frac{4s+6}{d}} \log N / \sigma_t^2 \cdot N^{-\frac{6s+10}{d}} \lesssim N^{-\frac{2(s+1)}{d}} / \sigma_t^2. \quad (56)$$

Here we used the result of the previous lemma for the last inequality. Eqs. (54) and (55), (56) yield the conclusion. $\square$

Combining Lemmas B.5 and B.7, where we use Lemma B.5 for $T_1 \le t \le T_4$ and Lemma B.7 for $T_3 \le t \le T_5$, we immediately obtain Theorem 3.1.

**Proof of Theorem 3.1.** Note that we can set $N' = N$ and $t_* = N^{-(2-\delta)/d}$ in Lemma B.7. According to Lemmas B.5 and B.7, we have two neural networks $\phi_{score,1}(x, t)$ and $\phi_{score,2}(x, t)$, that approximate the score function in $[T_1, T_4]$ and $[T_3, T_5]$. Therefore, letting $\underline{t}_1 = T_4$ and $\underline{t}_2 = T_3$ in Lemma F.5, $\phi_{score}(x, t) = \phi_{swit}^1(t; \underline{t}_2, \overline{t}_1)\phi_{score,1}(x, t) + \phi_{swit}^2(t; \underline{t}_2, \overline{t}_1)\phi_{score,2}(x, t)$ approximates the approximation error in $L^2(p_t)$ with an additive error of $\frac{N^{-2s/d} \log N}{\sigma_t^2}$. Realization of the multiplications ($\phi_{swit}^1 \phi_{score,1}$ and $\phi_{swit}^2 \phi_{score,2}$) and aggregation $\phi_{swit}^1 \phi_{score,1} + \phi_{swit}^2 \phi_{score,2}$ is trivial. Finally, according to Lemmas B.5 and B.7, the size of the network is bounded by

$$L = O(\log^4(N)), \quad \|W\|_\infty = O(N \log^6 N), \quad S = O(N \log^8 N), \quad \text{and } B = \exp(O(\log^4 N)),$$

which concludes the proof. $\square$

We also prepare an integral form of the approximation theorems.

**Theorem B.8** (Approximation theorem). *Suppose Assumptions 2.4, 2.5, 2.6 with $a_0 = N^{-(1-\delta)/d}$, $N \gg 1$, $\underline{T} = \text{poly}(N^{-1})$, and $\overline{T} \simeq \log N$. Then there exists a neural network $\phi_{score} \in \Phi(L, W, S, B)$ that satisfies*

$$\int_{t=\underline{T}}^{\overline{T}} \int_x p_t(x) \|\phi_{score}(x, t) - \nabla \log p_t(x)\|^2 dx dt \lesssim N^{-2s/d} \log N (\log(\overline{T}/\underline{T}) + (\overline{T} - \underline{T})).$$

*Here, $L, \|W\|_\infty, S, B$ is evaluated as*

$$L = O(\log^4 N), \quad \|W\|_\infty = O(N), \quad S = O(N), \quad \text{and } B = \exp(O(\log^4 N)).$$

### Visual Description
Text-only slide.

---

## Page 36
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 36**

*Moreover, suppose $N' \ge t_*^{-d/2} N^{\delta/2}$, $t_* \ge N^{-(2-\delta)/d}$, and $\underline{T} \ge 2t_*$, then there exists a neural network $\phi_{score} \in \Phi(L, W, S, B)$ that satisfies*

$$\int_{t=\underline{T}}^{\overline{T}} \int_x p_t(x) \|\phi_{score}(x, t) - \nabla \log p_t(x)\|^2 dx dt \lesssim N^{-\frac{2(s+1)}{d}} (\log(\overline{T}/\underline{T}) + (\overline{T} - \underline{T})).$$

*Specifically, $L = O(\log^4(N))$, $\|W\|_\infty = O(N)$, $S = O(N')$, and $B = \exp(O(\log^4 N))$.*

**Proof.** We only show the first part; the second part comes from Lemma B.7 in the same way. According to Theorem 3.1, there exists a network $\phi_{score}$ with the desired size that satisfies

$$\int_x p_t(x) \|\phi_{score}(x, t) - s(x, t)\|^2 dx \lesssim \frac{N^{-2s/d} \log(N)}{\sigma_t^2}.$$

Note that $\sigma_t \gtrsim t \wedge 1$. Therefore,

$$\int_{t=\underline{T}}^{\overline{T}} \frac{N^{-2s/d} \log(N)}{\sigma_t^2} dt \lesssim \int_{t=\underline{T}}^{\overline{T}} N^{-2s/d} \log(N)(1 \vee 1/t) dt \le N^{-2s/d} \log(N)(\log(\overline{T}/\underline{T}) + (\overline{T} - \underline{T})),$$

which gives the first part of the theorem. $\square$

### C. Generalization of the score network
Now we consider the generalization error. As in Section 4, we first consider the sup-norm of $\ell$ and evaluate the covering number.

#### C.1. Bounding sup-norm
**Lemma C.1.** *Suppose that $\|s(\cdot, t)\|_\infty = O(\sigma_t^{-1} \log^{1/2} n)$, $\underline{T} = \text{poly}(n^{-1})$ and $\overline{T} \simeq \log n$. Then, we have that*

$$\int_{t=\underline{T}}^{\overline{T}} \int_{x_t} \|s(x_t, t) - \nabla \log p_t(x_t|x_0)\|^2 p_t(x_t|x_0) dx_t dt \lesssim \log^2 n.$$

**Proof.** The evaluation is mostly straightforward.

$$\int_{t=\underline{T}}^{\overline{T}} \int_{x_t} \|s(x_t, t) - \nabla \log p_t(x_t|x_0)\|^2 p_t(x_t|x_0) dx_t dt$$
$$\le 2 \int_{t=\underline{T}}^{\overline{T}} \int_{x_t} \|s(x_t, t)\|^2 p_t(x_t|x_0) dx_t dt + 2 \int_{t=\underline{T}}^{\overline{T}} \int_{x_t} \|\nabla \log p_t(x_t|x_0)\|^2 p_t(x_t|x_0) dx_t dt$$
$$\lesssim \int_{t=\underline{T}}^{\overline{T}} \frac{\log n}{\sigma_t^2} dt + \int_{t=\underline{T}}^{\overline{T}} \frac{1}{\sigma_t^2} dt$$
$$\lesssim \int_{t=\underline{T}}^{\overline{T}} \frac{\log n}{t \wedge 1} dt \le (\log n) \cdot (\log \underline{T}^{-1} + \overline{T}) \lesssim \log^2 n$$

For the evaluation of $\int_{x_t} \|\nabla \log p_t(x_t|x_0)\|^2 p_t(x_t|x_0) dx_t$, we used the fact that $p_t(x_t|x_0)$ is the density function of $\mathcal{N}(m_t x_0, \sigma_t^2)$. Also, we used that $\underline{T} = \text{poly}(n^{-1})$ and $\overline{T} \simeq \log n$ for the last inequality. $\square$

#### C.2. Covering number evaluation
**Lemma C.2** (Covering number of $\mathcal{L}$). *For a neural network $s : \mathbb{R}^d \times \mathbb{R} \to \mathbb{R}^d$, we define $\ell : \mathbb{R}^d \to \mathbb{R}$ as*

$$\ell_s(x) = \int_{t=\underline{T}}^{\overline{T}} \int_{x_t} \|s(x_t, t) - \nabla \log p_t(x_t|x)\|^2 p_t(x_t|x) dx_t dt.$$

### Visual Description
Text-only slide.

---

## Page 37
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators 37**

*For the hypothesis network class $\mathcal{S} \in \Phi(L, W, S, B)$, we define a function class $\mathcal{L} = \{\ell_s | s \in \mathcal{S}\}$. If the corresponding $s$ is obvious for some $\ell_s$, we sometimes abbreviate $\ell_s$ as $\ell$.*

*Assume that $s(x, t)$ is bounded by $\|s(\cdot, t)\|_2 L^\infty = O(\sigma_t^{-1} \log^{1/2} n)$ uniformly over all $s \in \mathcal{S}$ and $C \ge 1$. Then the covering number of $\mathcal{S}$ is evaluated by*

$$\log \mathcal{N}(\mathcal{S}, \|\cdot\|_2 L^\infty([-C,C]^{d+1}), \delta) \lesssim 2SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1) C), \quad (57)$$

*and based on this, the covering number of $\mathcal{L}$ is evaluated by*

$$\log \mathcal{N}(\mathcal{L}, \|\cdot\|_{L^\infty([-1,1]^d)}, \delta) \lesssim SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1) n) \quad (58)$$

*when $\delta^{-1}, \underline{T}^{-1}, \overline{T}, N = \text{poly}(n)$.*

**Proof.** The first bound (57) is directly obtained from Suzuki (2018), with a slight modification of the input region. By following their proof, we can see that their $\delta$-net for the $L^\infty([0, 1]^d)$-norm serves as the $C\delta$-net for the $L^\infty([-C, C]^d)$-norm. Therefore, we simply set $\delta \leftarrow C^{-1}\delta$ in their bound to obtain (57).

We next consider (58). First we clip the integral interval in the definition of $\ell$.

$$\left| \ell_s(x) - \int_{t=\underline{T}}^{\overline{T}} \int_{\|x_t\|_\infty \le O(\sqrt{\log n})} \|s(x_t, t) - \nabla \log p_t(x_t|x)\|^2 p_t(x_t|x) dx_t dt \right|$$
$$\le \int_{t=\underline{T}}^{\overline{T}} \int_{\|x_t\|_\infty \ge O(\sqrt{\log n})} \|s(x_t, t) - \nabla \log p_t(x_t|x)\|^2 p_t(x_t|x) dx_t dt$$
$$\le \|s(\cdot, \cdot)\|_2^2 L^\infty \int_{t=\underline{T}}^{\overline{T}} \int_{\|x_t\|_\infty \ge O(\sqrt{\log n})} p_t(x_t|x) dx_t dt + \int_{t=\underline{T}}^{\overline{T}} \int_{\|x_t\|_\infty \ge O(\sqrt{\log n})} \|\nabla \log p_t(x_t|x)\|^2 p_t(x_t|x) dx_t dt. \quad (59)$$

Because $p_t(x_t|x)$ is the density function of $\mathcal{N}(m_t x | \sigma_t^2)$, we can show that $\int_{\|x_t\|_\infty \ge O(\sqrt{\log n})} p_t(x_t|x) dx_t$ and $\int_{\|x_t\|_\infty \ge O(\sqrt{\log n})} \|\nabla \log p_
## Page 41
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 41

Now, we combine (67), (68), (70), and $A^2 = \frac{2C_\ell \log N}{9n}$ to obtain
$$D \le \left( \frac{1}{2} R(\hat{\ell}, \ell^\circ) + \frac{1}{2} A^2 + \frac{1}{2} \delta \right) + \frac{4C_\ell}{n} \left( \log N + 6 + \frac{2}{C_\ell \log N} \right) + \delta$$
$$\le \frac{1}{2} R(\hat{\ell}, \ell^\circ) + \frac{C_\ell}{n} \left( \frac{37}{9} \log N + 32 \right) + \frac{3}{2} \delta,$$
where we have used that $\log N \ge 1$. Therefore, we obtain
$$R(\hat{\ell}, \ell^\circ) \le 2 \mathbb{E}_{\{x_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\hat{\ell}(x_i) - \ell^\circ(x_i)) \right] + \frac{2C_\ell}{n} \left( \frac{37}{9} \log N + 32 \right) + 3\delta. \tag{71}$$
For any fixed $\ell \in \mathcal{L}$,
$$\mathbb{E}_{\{x_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\hat{\ell}(x_i) - \ell^\circ(x_i)) \right] \le \mathbb{E}_{\{x_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n (\ell(x_i) - \ell^\circ(x_i)) \right] = \mathbb{E}_x[\ell(x) - \ell^\circ(x)].$$
RHS is minimized as $\inf_{\ell \in \mathcal{L}} \mathbb{E}_x[\ell(x) - \ell^\circ(x)]$. Finally, combining this with (71), we obtain
$$R(\hat{\ell}, \ell^\circ) \le 2 \inf_{\ell \in \mathcal{L}} \mathbb{E}_x[\ell(x) - \ell^\circ(x)] + \frac{2C_\ell}{n} \left( \frac{37}{9} \log N + 32 \right) + 3\delta.$$
According to Lemma C.3, we have
$$R(\hat{\ell}, \ell^\circ) \le 2 \inf_{s \in \mathcal{S}} \int_{\underline{T}}^{\overline{T}} \int_x \|s(x, t) - \nabla \log p_t(x)\|_2^2 p_t(x) dx dt + \frac{2C_\ell}{n} \left( \frac{37}{9} \log N + 32 \right) + 3\delta.$$
$\square$

**C.4. Sampling $t$ and $x_t$ instead of taking expectation**

This section provides justification of two approaches presented in Section 4.1. We assume $\delta^{-1}, \underline{T}^{-1}, \overline{T}, N = \text{poly}(n)$. We first begin with the following lemma. This shows that $\|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|$ is sub-Gaussian.

**Lemma C.5.** *Let us sample $(i_j, t_j, x_j)$ from $i_j \sim \text{Unif}(\{1, 2, \dots, n\})$, $t_j \sim \text{Unif}(\underline{T}, \overline{T})$, and $x_j \sim p_{t_j}(x_j | x_{0,i_j})$. Then, we have that, for all $t > 0$,*
$$\mathbb{P} \left[ \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\| \ge \sup_{(x,t)} \|s(x, t)\| + \frac{\sqrt{d}t}{\sigma_{\underline{T}}} \right] \le 2 \exp(-t^2/2).$$

*Proof.* First note that
$$\|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\| \le \|s(x_j, t_j)\| + \|\nabla p_{t_j}(x_j | x_{0,i_j})\| \le \sup_{x,t} \|s(x, t)\| + \|\nabla p_{t_j}(x_j | x_{0,i_j})\|.$$
Because $\nabla p_{t_j}(x_j | x_{0,i_j}) = \frac{x_j - m_{t_j}x_{0,i_j}}{\sigma_{t_j}^2}$ and $x_j \sim p_{t_j}(x_j | x_{0,i_j}) = \mathcal{N}(m_{t_j}x_{0,i_j}, \sigma_{t_j}^2)$, we have that $[\nabla p_{t_j}(x_j | x_{0,i_j})]_i$ is sub-Gaussian with $\sigma_{t_j}^{-1}$. Thus, $\|\nabla p_{t_j}(x_j | x_{0,i_j})\|$ is sub-Gaussian with $\sqrt{d}\sigma_{t_j}^{-1}$. Now, applying $\sigma_t \ge \sigma_{\underline{T}}$, we have the assertion. $\square$

Now, we give the following theorem for the first approach.

**Theorem C.6.** *Let us sample $(i_j, t_j, x_j)$ from $i_j \sim \text{Unif}(\{1, 2, \dots, n\})$, $t_j \sim \text{Unif}(\underline{T}, \overline{T})$, and $x_j \sim p_{t_j}(x_j | x_{0,i})$. Let $s_1$ be the minimizer of*
$$\frac{1}{M} \sum_{j=1}^M \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i})\|^2$$

### Visual Description
Text-only slide.

---

## Page 42
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 42

*and $s_2$ be the minimizer of*
$$\frac{1}{n} \sum_{i=1}^n \ell(x_i) = \frac{1}{n} \sum_{i=1}^n \int_{\underline{T}}^{\overline{T}} \|s(x_t, t) - \nabla p_t(x_t | x_{0,i})\|^2 p_t(x_t | x_{0,i}) dx_t dt,$$
*over $\mathcal{S} \subseteq \Phi(L, W, S, B)$, where $s \in \mathcal{S}$ satisfies $\|s(\cdot, t)\|_{2, L^\infty} = O(\sigma_t^{-1} \log^{\frac{1}{2}} n) \lesssim O(\sigma_{\underline{T}}^{-1} \log^{\frac{1}{2}} n) =: C_s$. Then, we have that*
$$\mathbb{E}_{\{(i_j, t_j, x_j)\}_{i=1}^n} \left| \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) - \frac{1}{n} \sum_{i=1}^n \ell_2(x_i) \right| \lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} 2SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta.$$

*Proof.* We denote $(i_j, t_j, x_j) = y_j$ for simplicity and $Y = \{(i_j, t_j, x_j)\}_{j=1}^M = \{y_j\}_{j=1}^M$. Let $Y' = \{(i'_j, t'_j, x'_j)\}_{j=1}^M = \{y'_j\}_{j=1}^M$ be a copy of $Y$, which is independent of $Y$. We write $\kappa(y_j) = \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|^2$. Then, we have that
$$\mathbb{E}_Y \left| \frac{1}{M} \sum_{j=1}^M \kappa_1(y_j) - \frac{1}{M} \sum_{j=1}^M \kappa_2(y_j) - \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) - \frac{1}{n} \sum_{i=1}^n \ell_2(x_i) \right| \tag{72}$$
$$= \mathbb{E}_Y \left| \frac{1}{M} \sum_{j=1}^M (\kappa_1(y_j) - \kappa_2(y_j)) - \mathbb{E}_{Y'} \left[ \frac{1}{M} \sum_{j=1}^M (\kappa_1(y'_j) - \kappa_2(y'_j)) \right] \right|$$
$$\le \mathbb{E}_{Y, Y'} \left| \frac{1}{M} \sum_{j=1}^M ((\kappa_1(y_j) - \kappa_2(y_j)) - (\kappa_1(y'_j) - \kappa_2(y'_j))) \right|. \tag{73}$$
Next, we let $C_s$ be the minimum integer that satisfies $C_s \ge \sup_{s \in \mathcal{S}} \sup_{x,t} \|s(x, t)\|$, and for $i = 1, 2, \dots$, we define $\mathcal{E}_i$ as an event where $C_s + \frac{\sqrt{d}(i-1)}{\sigma_{\underline{T}}} \le \sup_{s \in \mathcal{S}} \max_j \max \{ \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|, \|s(x'_j, t'_j) - \nabla p_{t'_j}(x'_j | x_{0,i'_j})\| \} < C_s + \frac{\sqrt{d}i}{\sigma_{\underline{T}}}$ holds. For $i = 0$, we define $\mathcal{E}_0$ as an event where $\sup_{s \in \mathcal{S}} \max_j \max \{ \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|, \|s(x'_j, t'_j) - \nabla p_{t'_j}(x'_j | x_{0,i'_j})\| \} < C_s$ holds. We let $a_i = \mathbb{P}[\mathcal{E}_i]$ and $\mathbb{E}_i$ be the expectation conditioned by the event $\mathcal{E}_i$. Then, (73) is bounded by
$$\mathbb{E}_0 \left| \frac{1}{M} \sum_{j=1}^M ((\kappa_1(y_j) - \kappa_2(y_j)) - (\kappa_1(y'_j) - \kappa_2(y'_j))) \right| + \sum_{i=1}^\infty a_i \mathbb{E}_i \left| \frac{1}{M} \sum_{j=1}^M ((\kappa_1(y_j) - \kappa_2(y_j)) - (\kappa_1(y'_j) - \kappa_2(y'_j))) \right|. \tag{74}$$
We remark that $\frac{1}{M} \sum_{j=1}^M ((\kappa_1(y_j) - \kappa_2(y_j)) - (\kappa_1(y'_j) - \kappa_2(y'_j)))$ is bounded by $8C_s^2 + \frac{8di^2}{\sigma_t^2}$ for each $\mathbb{E}_i$. Here, $\kappa_1$ is the minimizer of $\frac{1}{M} \sum_{j=1}^M \kappa(y_j)$ and $\kappa_2$ is the minimizer of $\mathbb{E}[\kappa(y)]$. Moreover, because $\|(x_j - x_{0,i_j})/\sigma_t\| = \|\nabla p_{t_j}(x_j | x_{0,i_j})\| \le \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\| + \|s(x_j, t_j)\|$, we have that $\|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\| \le C_s + \frac{\sqrt{d}i}{\sigma_{\underline{T}}}$ implies $\|x_j\| \le 2C_s + \frac{\sqrt{d}i}{\sigma_{\underline{T}}}$. We apply the same argument as that in Theorem C.4 to obtain that
$$\mathbb{E}_i \left| \frac{1}{M} \sum_{j=1}^M \kappa_1(y_j) - \frac{1}{M} \sum_{j=1}^M \kappa_2(y_j) - \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) - \frac{1}{n} \sum_{i=1}^n \ell_2(x_i) \right|$$
$$\lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}i^2}{M} \log \mathcal{N}(\mathcal{S}, L^\infty([- (2C_s + \sqrt{d}i), 2C_s + \sqrt{d}i]^{d+1}), \delta/(C_s + i\sigma_{\underline{T}}^{-1})) + \delta$$
$$\lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}i^2}{M} 2SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s + i)) + \delta.$$
We remark that, $y_j$ and $y'_j$ are not independent, when conditioned by $\mathcal{E}_i$. However, the similar argument still holds in (69), where we used the independentness of $x_i$ and $x'_i$ in the original proof, because the symmetry of $y_j$ and $y'_j$ is not collapsed

### Visual Description
Text-only slide.

---

## Page 43
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 43

by taking the conditional expectation. Based on this, and $a_i \le 2 \exp(-(i-1)^2/2)$ ($i \ge 1$) due to Lemma C.5, we evaluate (74) as
$$(74) \lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta + \sum_{i=1}^\infty a_i \left[ \frac{C_s^2 + \sigma_{\underline{T}}^{-2}i^2}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s + i)) + \delta \right]$$
$$\lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta + \sum_{i=1}^\infty \exp \left( -\frac{(i-1)^2}{2} \right) \left[ \frac{C_s^2 + \sigma_{\underline{T}}^{-2}i^2}{M} 2SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s + i)) + \delta \right]$$
$$\lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta.$$
This bounds (72). Thus, we finally obtain that
$$\mathbb{E}_{\{y_i\}_{i=1}^n} \left[ \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) - \frac{1}{n} \sum_{i=1}^n \ell_2(x_i) \right] \le \mathbb{E}_{\{y_i\}_{j=1}^M} \left[ \frac{1}{M} \sum_{j=1}^M \kappa_1(y_j) - \frac{1}{M} \sum_{j=1}^M \kappa_2(y_j) \right] + \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta$$
$$\le \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta,$$
because $\kappa_1$ is the minimizer of $\frac{1}{M} \sum_{j=1}^M \kappa(y_j)$. Now, we obtain the assertion. $\square$

**Remark C.7.** When $\|s(x, t)\| = \sqrt{\log N} / \sigma_t$ holds, $\underline{T} = \text{poly}(N^{-1})$, $\overline{T} = O(\log N)$, we have $\sup_{(x,t)} \|s(x, t)\| = C_s \lesssim \sqrt{\underline{T}^{-1} \log N}$. we set $N = n^{\frac{d}{2s+d}}$, $\delta = n^{-\frac{2s}{d+2s}}$ and use the network class in Theorem 3.1 to obtain that
$$\mathbb{E}_{(i_j, t_j, x_j)} \left[ \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) \right] - \inf_{\ell_s : s \in \mathcal{S}} \frac{1}{n} \sum_{i=1}^n \ell_s(x_i) \lesssim \frac{C_s^2 + \sigma_{\underline{T}}^{-2}}{M} 2SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta$$
$$\lesssim \frac{\underline{T}^{-1} \log n + \underline{T}^{-1}}{M} n^{-\frac{d}{2s+d}} \log^{16} n \lesssim \frac{n^{-\frac{d}{2s+d}} \log^{17} n}{\underline{T}M}.$$

Next, we show the proof for the second approach.

**Theorem C.8.** *We sample $t_j$ from $\mu(t) \propto \frac{\mathbb{1}[\underline{T} \le t \le \overline{T}]}{t}$ and modify $\lambda(t)$ as $\lambda(t) = \frac{t \log \overline{T}/\underline{T}}{\overline{T} - \underline{T}}$, while $i_j, x_j$ are sampled as $i_j \sim \text{Unif}(\{1, 2, \dots, n\})$ and $x_j \sim p_{t_j}(x_j | x_{0,i})$. Then, the minimizer $s_1$ over $\mathcal{S} \subseteq \Phi(L, W, S, B)$ of*
$$\frac{1}{M} \sum_{j=1}^M \lambda(t_j) \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i})\|^2$$
*satisfies*
$$\mathbb{E}_{(i_j, t_j, x_j)} \left[ \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) \right] - \inf_{\ell_s : s \in \mathcal{S}} \frac{1}{n} \sum_{i=1}^n \ell_s(x_i) \lesssim \frac{C_s^2 + \overline{T}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta,$$
*Here, $C_s = \sup_{t,x} \sqrt{\lambda(t)} \|s(x, t)\|$.*

*Proof.* We just replace $s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i})$ by $\sqrt{\lambda(t_j)} \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i})\|$ in the previous lemma. Similarly to Lemma C.5, we have that, for all $t > 0$,
$$\mathbb{P} \left[ \lambda^{\frac{1}{2}}(t_j) \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\| \ge \sup_{(x,t)} \lambda^{\frac{1}{2}}(t) \|s(x, t)\| + \frac{\sqrt{d \lambda^{\frac{1}{2}}(t_j)} t}{\sigma_{t_j}} \right] \le 2 \exp(-t^2/2).$$

### Visual Description
Text-only slide.

---

## Page 44
### Content
**Diffusion Models are Minimax Optimal Distribution Estimators** 44

Then, we replace $\sup_{(x,t)} \|s(x, t)\|$ by $\sup_{(x,t)} \lambda^{\frac{1}{2}}(t) \|s(x, t)\|$, and $\frac{\sqrt{d}}{\sigma_{\underline{T}}}$ by $\sup_t \frac{\sqrt{d \lambda^{\frac{1}{2}}(t)}}{\sigma_t}$, respectively, to obtain that
$$\mathbb{E}_{i_j, t_j, x_j} \mathbb{E}_{i'_j, t'_j, x'_j} [\lambda(t_j) \|s_1(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|^2] - \inf_{s \in \mathcal{S}} \mathbb{E}_{i_j, t_j, x_j} [\lambda(t_j) \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|^2]$$
$$\lesssim \frac{C_s^2 + \overline{T}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta, \tag{75}$$
where $(i'_j, t'_j, x'_j)$ are the independent copy of $(i_j, t_j, x_j)$. Note that
$$\mathbb{E}_{i_j, t_j, x_j} [\lambda(t_j) \|s(x_j, t_j) - \nabla p_{t_j}(x_j | x_{0,i_j})\|^2] = \frac{1}{n} \sum_{i=1}^n \ell(x_i) \tag{76}$$
for all (fixed) $s$. (75) and (76) yield that
$$\mathbb{E}_{(i_j, t_j, x_j)} \left[ \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) \right] - \inf_{\ell_s : s \in \mathcal{S}} \frac{1}{n} \sum_{i=1}^n \ell_s(x_i) \le \frac{C_s^2 + \overline{T}}{M} SL \log(\delta^{-1} L \|W\|_\infty (B \vee 1)(C_s)) + \delta,$$
which concludes the proof. $\square$

**Remark C.9.** When $\|s(x, t)\| = \sqrt{\log N} / \sigma_t$ holds, $\underline{T} = \text{poly}(N^{-1})$, $\overline{T} = O(\log N)$, we have $\sup_{(x,t)} \sqrt{\lambda(t)} \|s(x, t)\| = C_s \lesssim \sqrt{\log N}$. we set $N = n^{\frac{d}{2s+d}}$, $\delta = n^{-\frac{2s}{d+2s}}$ and use the network class in Theorem 3.1 to obtain that
$$\mathbb{E}_{(i_j, t_j, x_j)} \left[ \frac{1}{n} \sum_{i=1}^n \ell_1(x_i) \right] - \inf_{\ell_s : s \in \mathcal{S}} \frac{1}{n} \sum_{i=1}^n \ell_s(x_i) \lesssim n^{-\frac{2s}{d+2s}} \log^{17} n.$$

**D. Estimation error analysis**

The following Girsanov theorem is useful when converting the error of the score matching to the estimation error.

**Proposition D.1** (Girsanov's Theorem (Karatzas et al., 1991)). *Let $p_0$ be any probability distribution, and let $Z = (Z_t)_{t \in [0,T]}$, $Z' = (Z'_t)_{t \in [0,T]}$ be two different processes satisfying*
$$dZ_t = b(Z_t, t)dt + \sigma(t)dB_t, \quad Z_0 \sim p_0,$$
$$dZ'_t = b'(Z'_t, t)dt + \sigma(t)dB_t, \quad Z'_0 \sim p_0.$$
*We define the distributions of $Z_t$ and $Z'_t$ as $p_t$ and $p'_t$, and the path measures of $Z$ and $Z'$ as $\mathbb{P}$ and $\mathbb{P}'$, respectively. Suppose the following Novikov's condition:*
$$\mathbb{E}_{\mathbb{P}} \left[ \exp \left( \int_0^T \frac{1}{2} \int_x \sigma^{-2}(t) \|(b - b')(x, t)\|^2 dx dt \right) \right] < \infty. \tag{77}$$
*Then, the Radon-Nikodym derivative of $\mathbb{P}$ with respect to $\mathbb{P}'$ is*
$$\frac{d\mathbb{P}}{d\mathbb{P}'}(Z) = \exp \left\{ -\frac{1}{2} \int_0^T \sigma(t)^{-2} \|(b - b')(Z_t, t)\|^2 dt - \int_0^T \sigma(t)^{-1} (b - b')(Z_t, t) dB_t \right\},$$
*and therefore we have that*
$$KL(p_T | p'_T) \le KL(\mathbb{P} | \mathbb{P}') = \int_0^T \frac{1}{2} \int_x p_t(x) \sigma(t)^{-2} \|(b - b')(x, t)\|^2 dx dt.$$
*Moreover, Chen et al. (2022) showed that if $\int_x p_
## Page 49
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 49

**Lemma D.7.** Suppose that $\|\hat{s}(\cdot, t)\|_\infty \lesssim \frac{\log^{\frac{1}{2}} n}{\sqrt{t \wedge 1}}$ holds. Then, the following holds for all $i = 1, 2, \dots, K_*$:
$$W_1(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i)}) \lesssim \sqrt{t_i \log n} \sqrt{\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} \left[ \int_{t=t_{i-1}}^{t_i} \mathbb{E}_x [\|\hat{s}(x, t) - \nabla \log p_t(x)\|^2 dt] \right]} + n^{-\frac{s+1}{d+2s}}. \quad (87)$$
Therefore, we have that
$$\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} [W_1(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i)})] \lesssim \sqrt{t_i \log n} \sqrt{\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} \left[ \int_{t=t_{i-1}}^{t_i} \mathbb{E}_x [\|\hat{s}(x, t) - \nabla \log p_t(x)\|^2 dt] \right]} + n^{-\frac{s+1}{d+2s}}. \quad (88)$$

*Proof.* We construct the transportation map between $\bar{Y}_{T-\underline{T}}^{(i-1)}$ and $\bar{Y}_{T-\underline{T}}^{(i)}$. Our approach focuses on each path.
Because the Novikov's condition is not satisfied for $\bar{Y}_{T-\underline{T}}^{(i-1)}$ and $\bar{Y}_{T-\underline{T}}^{(i)}$, Proposition D.1 cannot be used to consider the total variation distance between the two paths; Proposition D.1 only gives $KL(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i)})$, not $KL(\bar{Y}^{(i-1)}, \bar{Y}^{(i)})$, and this bound is insufficient for our discussion. Therefore, we first bound $\mathbb{E}[W_1(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i-1)'})]$. According to Lemma A.1, with probability at least $1 - n^{-\mathcal{O}(1)}$, a path of the processes $(\bar{Y}_t^{(i-1)})_{t=0}^T$ and $(\bar{Y}_t^{(i-1)'})_{t=0}^T$ satisfy $(\bar{Y}_t^{(i-1)}, \bar{T}-t), (\bar{Y}_t^{(i-1)'}, \bar{T}-t) \in A$ for all $0 \le t \le \bar{T} - t_{i-1}$. Thus, $\mathbb{E}[TV(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i-1)'})]$ is bounded by $n^{-\mathcal{O}(1)}$ (with a sufficiently large constant in $\mathcal{O}(1)$). This implies $\mathbb{E}[W_1(\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i-1)'})] \lesssim n^{-\mathcal{O}(1)}$, because $\bar{Y}_{T-\underline{T}}^{(i-1)}, \bar{Y}_{T-\underline{T}}^{(i-1)'} = \mathcal{O}(1)$ (a.s.).

We now discuss $\mathbb{E}[W_1(\bar{Y}_{T-\underline{T}}^{(i-1)'}, \bar{Y}_{T-\underline{T}}^{(i)})]$. Let us write the path measures of $\bar{Y}^{(i-1)'}$ and $\bar{Y}^{(i)}$ be $\mathbb{P}$ and $\mathbb{P}'$, and take some path $p$ that is $y$ at $t = \bar{T} - \underline{T}$ and is $z$ at $t = \bar{T} - t_i$. If $d\mathbb{P}[p] > d\mathbb{P}'[p]$, then we move the mass of $\bar{Y}_{T-\underline{T}}^{(i-1)'} = y$ that amounts to $d\mathbb{P}[p] - d\mathbb{P}'[p]$, to $z$, along the path $p$ by reversing the time until $t = \bar{T} - t_i$. Applying this to all paths $p$, then the total mass of $\bar{Y}_{T-\underline{T}}^{(i-1)'}$ that is moved is at most
$$\frac{1}{2} TV((\bar{Y}^{(i-1)'}), (\bar{Y}^{(i)})) \le \frac{1}{2} \sqrt{\int_{t=t_{i-1}}^{t_i} \int_x p_t(x) \beta_t^{-2} \|\hat{s}(x, t) - \nabla \log p_t(x)\|^2 dx dt}. \quad (89)$$
according to Proposition D.1. Here we remark that the Novikov's condition certainly holds for this case.
Until now, a part of the mass of $\hat{Y}_{T-\underline{T}}^{(i-1)'}$ is moved along each corresponding path, but at this time no coupling measure has been constructed. To realize the coupling measure, we consider the same process for $\bar{Y}_{T-\underline{T}}^{(i)}$. That is, for each path $p$ with $\bar{Y}_{T-\underline{T}}^{(i)} = y$ and $\bar{Y}_{T-t_i}^{(i)} = z$, if $d\mathbb{P}[p] < d\mathbb{P}'[p]$, then we move the mass of $\bar{Y}_{T-\underline{T}}^{(i)} = y$, as much as $d\mathbb{P}'[p] - d\mathbb{P}[p]$, to $z$ along the path $p$. The total mass of $\bar{Y}_{T-\underline{T}}^{(i)}$ affected is bounded by $\frac{1}{2} TV((\bar{Y}^{(i-1)'}), (\bar{Y}^{(i)'}))$, which is bounded by (89).
Now, we can see that, the same amount of mass is transported from both $\bar{Y}_{T-\underline{T}}^{(i-1)'}$ and $\bar{Y}_{T-\underline{T}}^{(i)}$ to $t = \bar{T} - t_i$. Thus, at each $z$, we can arbitrarily associate the mass from $\bar{Y}_{T-\underline{T}}^{(i-1)'}$ to that from $\bar{Y}_{T-\underline{T}}^{(i)}$. Using this, as much as $\frac{1}{2} TV((\bar{Y}^{(i-1)'}), (\bar{Y}^{(i)'}))$ of the mass is transported from $\bar{Y}_{T-\underline{T}}^{(i-1)'}$ to $\bar{Y}_{T-\underline{T}}^{(i)}$, by reversing the path to $t = \bar{T} - t_i$.
Now our interest is how far each transport is required to move on average. First we consider when $t_i \lesssim 1$.
First we bound $\|\bar{Y}_{T-\underline{T}}^{(i)} - \bar{Y}_{T-t_i}^{(i)}\|$. According to Lemma A.1, we have $\|\int_{T-t_i}^{T-\underline{T}} \sqrt{2\beta_{\bar{T}-t}} dB_t\| \lesssim \sqrt{t_i \log n}$ for all $t \in [\bar{T} - t_i, \bar{T} - \underline{T}]$, and $\bar{Y}_{T-t_i}^{(i)} \lesssim m_{\bar{T}-t_i} + \sigma_{\bar{T}-t_i} \sqrt{\log n} \lesssim \sqrt{\log n}$ with probability $1 - n^{-\mathcal{O}(1)}$. We consider the event

### Visual Description
Text-only slide.

---

## Page 50
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 50

conditioned on them. Note that $\|s(x, t)\| \lesssim \frac{\sqrt{\log n}}{\sigma_t} \lesssim \frac{\sqrt{\log n}}{\sqrt{t}}$ holds. Then we have that, for all $\bar{T} - t_i \le t \le \bar{T} - \underline{T}$,
$$\|\bar{Y}_t^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\| = \left\| \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \beta_{\bar{T}-s} (\bar{Y}_s^{(i)} + 2\nabla \log p_t(\bar{Y}_s^{(i)}, \bar{T}-s)) dt + \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \sqrt{2\beta_{\bar{T}-s}} dB_s \right\|$$
$$\lesssim \bar{\beta} \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \|\bar{Y}_s^{(i)}\| ds + 2\bar{\beta} \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \frac{\sqrt{\log n}}{\sqrt{s}} ds + \sqrt{t_i \log n},$$
$$\lesssim \bar{\beta} \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \|\bar{Y}_s^{(i)}\| ds + \sqrt{t_i \log n} + \sqrt{t_i \log n}.$$
$$\lesssim \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \|\bar{Y}_s^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\| ds + \sqrt{t_i \log n} + t_i \|\bar{Y}_{\bar{T}-t_i}^{(i)}\|$$
$$\lesssim \int_{\bar{T}-t_i}^{\bar{T}-\underline{T}} \|\bar{Y}_s^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\| ds + \sqrt{t_i \log n} + t_i \sqrt{\log n}$$
Now we apply the Gronwall's inequality to obtain
$$\|\bar{Y}_{\bar{T}-\underline{T}}^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\| \lesssim e^{\bar{\beta} t_i} \sqrt{t_i \log n} \lesssim \sqrt{t_i \log n}.$$
for all $\bar{T} - t_i \le t \le \bar{T} - \underline{T}$. Thus, with probability $1 - n^{-\mathcal{O}(1)}$, $\|\bar{Y}_t^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\|$ is bounded by $\sqrt{t_i \log n}$ up to a constant factor, over all $\bar{T} - t_i \le t \le \bar{T} - \underline{T}$.
Next we bound $\|\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)'} - \bar{Y}_{\bar{T}-t_i}^{(i-1)'}\|$. This is decomposed into
$$\|\bar{Y}_{\bar{T}-t_i}^{(i-1)'} - \bar{Y}_{\bar{T}-t_{i-1}}^{(i-1)'}\| + \|\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)'} - \bar{Y}_{\bar{T}-t_{i-1}}^{(i-1)'}\|.$$
The first term is bounded by $\sqrt{t_i \log n}$ with probability at least $1 - n^{-\mathcal{O}(1)}$. This is because $\bar{Y}_t^{(i-1)'} \in A$ holds with probability $1 - n^{-\mathcal{O}(1)}$ due to the first part of Lemma A.1, and for such paths the evolution of $\bar{Y}_t^{(i-1)'}$ is the same as that of $Y_t$, where we apply the second part of Lemma A.1. The second term is bounded by $\sqrt{t_{i-1} \log n}$ with probability $1 - n^{-\mathcal{O}(1)}$, following the discussion on $\|\bar{Y}_t^{(i)} - \bar{Y}_{\bar{T}-t_i}^{(i)}\|$. In summary, with probability $1 - n^{-\mathcal{O}(1)}$ we can bound $\|\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)'} - \bar{Y}_{\bar{T}-t_i}^{(i-1)'}\|$ by $\sqrt{t_{i-1} \log n} (\le \sqrt{t_i \log n})$ up to a constant factor.
In summary, when $t_i \lesssim 1$, the transportation map moves at most $\mathcal{O}(\sqrt{t_i \log n})$ with probability $1 - n^{-\mathcal{O}(1)}$. Because the supports of $\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)'}$ and $\bar{Y}_{\bar{T}-\underline{T}}^{(i)}$ are both bounded, for the mass moved more than $\sqrt{t_i \log n}$ affects the Wasserstein distance at most $n^{-\mathcal{O}(1)}$. Therefore, we obtain the desired bound (87) for $t_i \lesssim 1$.
For $t_i \gtrsim 1$, because the supports of $\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)}$ and $\bar{Y}_{\bar{T}-\underline{T}}^{(i)}$ are both bounded,
$$W_1(\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)}, \bar{Y}_{\bar{T}-\underline{T}}^{(i)}) \lesssim TV(\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)}, \bar{Y}_{\bar{T}-\underline{T}}^{(i)}) \lesssim \frac{1}{2} \sqrt{\int_{t=t_{i-1}}^{t_i} \int_x p_t(x) \beta_t^{-2} \|\hat{s}(x, t) - \nabla \log p_t(x)\|^2 dx dt}$$
holds. Therefore we obtain (87) as well.
From (87), (88) is easily obtained by Jensen's inequality. $\square$

Also, we bound the generalization error of each network $s_i$.
**Lemma D.8.** For $1 \le i \le K_* - 1$, let $s_i$ be a network that is selected from $\Phi(L, W, S, B)$ with
$$L = \mathcal{O}(\log^4 n), \|W\|_\infty = \mathcal{O}(n^{\frac{d}{d+2s}}), S = \mathcal{O}(t_i^{-d/2} n^{\frac{\delta d}{2(2s+d)}}), \text{ and } B = \exp(\mathcal{O}(\log^4 n)),$$

### Visual Description
Text-only slide.

---

## Page 51
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 51

and $\|s_i(\cdot, t)\|_{L^\infty} \lesssim \frac{\log^{\frac{1}{2}} n}{\sigma_t}$. Then, we have that
$$\mathbb{E}_{\{x_{0,j}\}_{j=1}^n} \left[ \int_{t=t_i}^{t_{i+1}} \mathbb{E}_x [\|\hat{s}_i(x, t) - \nabla \log p_t(x)\|^2 dt] \right] \lesssim n^{-\frac{2(s+1)}{d+2s}} \log n + \frac{t_i^{-d/2} n^{\frac{\delta d}{2(d+2s)}} \log^{10} n}{n}.$$
Moreover, for $i = 0$, let $s_0$ be a network that is selected from $\Phi(L, W, S, B)$ with
$$L = \mathcal{O}(\log^4 n), \|W\|_\infty = \mathcal{O}(n^{\frac{d}{d+2s}} \log^6 n), S = \mathcal{O}(n^{\frac{d}{2s+d}} \log^8 n), \text{ and } B = \exp(\mathcal{O}(\log^4 n)),$$
and $\|s_0(\cdot, t)\|_{L^\infty} \lesssim \frac{\log^{\frac{1}{2}} n}{\sigma_t}$. Then, we have that
$$\mathbb{E}_{\{x_{0,j}\}_{j=1}^n} \left[ \int_{t=t_i}^{t_{i+1}} \mathbb{E}_x [\|\hat{s}_0(x, t) - \nabla \log p_t(x)\|^2 dt] \right] \lesssim n^{-\frac{2s}{d+2s}} \log^{18} n.$$

*Proof.* First we consider the first part. We take $N = n^{\frac{d}{d+2s}}$ and $t_* = t_i/2$ in Lemma 3.6. Note that $N$ and $t_* (\ge n^{-\frac{2-\delta}{d+2s}})$ satisfies $t_* \ge N^{-(2-\delta)/d}$, which is assumed in Theorem B.8. Then, there exists a neural network $\phi \in \Phi(L, W, S, B)$ that satisfies
$$\int_{t=t_i}^{t_{i+1}} \int_x p_t(x) \|\phi(x, t) - s(x, t)\|^2 dx dt \lesssim N^{-\frac{2(s+1)}{d}} \log n = N^{-\frac{2(s+1)}{d+2s}} \log n.$$
Specifically, $L = \mathcal{O}(\log^4(n)), \|W\|_\infty = \mathcal{O}(n^{\frac{d}{d+2s}}), S = \mathcal{O}(t_i^{-d/2} n^{\frac{\delta d}{2(d+2s)}})$, and $B = \exp(\mathcal{O}(\log^4 n))$. Therefore, we apply (64) by replacing $T$ and $\bar{T}$ by $t_i$ and $t_{i+1}$, respectively, and with $\delta = n^{-\frac{2(s+1)}{d+2s}}$ to obtain the first assertion as
$$\mathbb{E}_{\{x_{0,j}\}_{j=1}^n} \left[ \int_{t=t_i}^{t_{i+1}} \mathbb{E}_x [\|\hat{s}_i(x, t) - \nabla \log p_t(x)\|^2 dt] \right] \lesssim N^{-\frac{2(s+1)}{d}} \log n + \frac{C_\ell}{n} \log \mathcal{N} + \delta$$
$$\lesssim n^{-\frac{2(s+1)}{d+2s}} \log n + \frac{\log^2 n}{n} (t_i^{-d/2} n^{\frac{\delta d}{2(d+2s)}} \log^8 n) + n^{-\frac{2(s+1)}{d+2s}}$$
$$\lesssim n^{-\frac{2(s+1)}{d+2s}} \log n + \frac{t_i^{-d/2} n^{\frac{\delta d}{2(d+2s)}} \log^{10} n}{n}.$$
For the second part, we simply follow the discussion that derived (4), by replacing $\bar{T}$ by $t_1(\bar{T})$, which does not increase the generalization error. $\square$

*Proof of Theorem 5.4.* We use the sequence of networks presented in Lemma D.8. Specifically, we consider the following process.
$$\hat{Y}_0^{(i)} \sim \mathcal{N}(0, I), \quad d\hat{Y}_t^{(i)} = \beta_{\bar{T}-t} (\hat{Y}_t^{(i)} + 2\hat{s}(\hat{Y}_t^{(i)}, \bar{T}-t)) dt + \sqrt{2\beta_{\bar{T}-t}} dB_t \quad (t \in [\bar{T}-t_i, \bar{T}-t_{i+1}], i = 0, 1, \dots, K_*),$$
and we modify $\hat{Y}_{\bar{T}-\underline{T}}^{(i)}$ to 0 if $\|\hat{Y}_{\bar{T}-\underline{T}}^{(i)}\|_\infty > 2$.

### Visual Description
Text-only slide.

---

## Page 52
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 52

Finally, we sum up the errors for the above process. Eq. (86) is further bounded by
$$\mathbb{E}[W_1(\bar{Y}_{\bar{T}-\underline{T}}, Y_{\bar{T}-\underline{T}})]$$
$$\le \sum_{i=1}^{K_*} \mathbb{E}[W_1(\bar{Y}_{\bar{T}-\underline{T}}^{(i-1)}, \bar{Y}_{\bar{T}-\underline{T}}^{(i)})]$$
$$\lesssim \sum_{i=1}^{K_*} \left[ \sqrt{t_{i-1} \log n} \sqrt{\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} \left[ \int_{t=t_i}^{t_i} \mathbb{E}_x [\|\hat{s}(x, t) - \nabla \log p_t(x)\|^2 dt] \right]} + n^{-\frac{s+1}{d+2s}} \right] \quad \text{(by Lemma D.7)}$$
$$\lesssim \sum_{i=2}^{K_*} \left[ \sqrt{t_i \log n} \left( n^{-\frac{(s+1)}{d+2s}} \sqrt{\log n} + \frac{t_i^{-d/4} n^{\frac{\delta d}{4(d+2s)}} \log^5 n}{\sqrt{n}} \right) + n^{-\frac{(s+1)}{d+2s}} \right]$$
$$+ \sqrt{t_1 \log n} \left[ n^{-\frac{s}{d+2s}} \log^9 n + n^{-\frac{s}{d+2s}} \right] \quad \text{(by Lemma D.8)}$$
$$\lesssim \left[ \sqrt{t_1} n^{-\frac{s}{d+2s}} + \sqrt{t_1} \frac{t_1^{-d/4} n^{\frac{\delta d}{4(d+2s)}}}{\sqrt{n}} \right] \cdot \tilde{\mathcal{O}}(1)$$
(because $K_* = \mathcal{O}(\log n)$ and $t_1 \le \dots \le t_{K_*} = \mathcal{O}(\log N)$ with $1 < t_{i+1}/t_i = \text{const.} \le 2$ ($i \ge 1$).)
$$= \left[ (n^{-\frac{2-\delta}{d+2s}})^{\frac{1}{2}} n^{-\frac{s}{d+2s}} + (n^{-\frac{2-\delta}{d+2s}})^{\frac{1}{2}} \frac{(n^{-\frac{2-\delta}{d+2s}})^{-d/4} n^{\frac{\delta d}{4(d+2s)}}}{\sqrt{n}} \right] \cdot \tilde{\mathcal{O}}(1)$$
$$\lesssim n^{-\frac{(s+1-\delta)}{d+2s}}. \quad (90)$$
Therefore, by taking $\underline{T} \lesssim n^{-\frac{2(s+1)}{d+2s}}$ and $\bar{T} = \frac{(s+1) \log n}{\bar{\beta}(d+2s)}$, we obtain that
$$W_1(X_0, \hat{Y}_{\bar{T}-\underline{T}}) \le \mathbb{E}[W_1(X_0, X_{\bar{T}})] + \mathbb{E}[W_1(X_{\bar{T}}, \hat{Y}_{\bar{T}-\underline{T}})] + \mathbb{E}[W_1(\bar{Y}_{\bar{T}-\underline{T}}, Y_{\bar{T}-\underline{T}})]$$
$$\lesssim \sqrt{\underline{T}} + \exp(-\bar{\beta} \bar{T}) + n^{-\frac{(s+1-\delta)}{d+2s}} \quad \text{(by Lemmas D.5 and D.6 and (90))}$$
$$\lesssim n^{-\frac{(s+1-\delta)}{d+2s}} + n^{-\frac{(s+1-\delta)}{d+2s}} + n^{-\frac{(s+1-\delta)}{d+2s}} \lesssim n^{-\frac{(s+1-\delta)}{d+2s}},$$
which concludes the proof for Theorem 5.4. $\square$

**D.3. Discussion on the discretization error**
As in Section 5.3, $t_0 = \underline{T} < t_1 < \dots < t_{K_*} = \bar{T}$ be the time steps with $t_{k+1} - t_k \equiv \eta \ll 1$. Consider the following process $(Y_t^d)_{t=0}^{\eta K} = (Y_t^d)_{t=0}^{\bar{T}-\underline{T}}$ with $Y_0^d \sim \mathcal{N}(0, I_d)$:
$$dY_t^d = \beta_t(Y_t^d + 2\hat{s}(Y_{\bar{T}-t_i}^d, \bar{T}-t_i)) dt + \sqrt{2\beta_{\bar{T}-t}} dB_t \quad (t \in [\bar{T}-t_i, \bar{T}-t_{i-1}]).$$
Here $\hat{s}$ is the score network obtained by the score matching:
$$\hat{s} \in \text{argmin} \frac{1}{n} \sum_{i=1}^n \sum_{k=1}^K \eta \mathbb{E}[\|s(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k} | x_{0,i})\|^2]. \quad (91)$$
Here, each expectation is taken with respect to $x_{\bar{T}-t_k} \sim p_{\bar{T}-t_k}(x_{\bar{T}-t_k} | x_{0,i})$.
**Theorem D.9.** Let $\underline{T} = n^{-\mathcal{O}(1)}$, $\bar{T} = \frac{s \log n}{2s+d}$, and $\eta = \text{poly}(n^{-1})$. Then,
$$\mathbb{E}[TV(X_0, \bar{Y}_{\bar{T}-\underline{T}})] \lesssim n^{-\frac{2s}{d+2s}} \log^{18} n + \eta^2 \underline{T}^{-3} \log^3 n + \eta \underline{T}^{-1} \log^3 n + \eta \log^4 n.$$

*Proof.* We first show that the minimizer $\hat{s}$ over $\Phi'$ (given in Section 4) of
$$\hat{s} \in \text{argmin} \frac{1}{n} \sum_{i=1}^n \sum_{k=1}^K \eta \mathbb{E}[\|s(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k} | x_{0,i})\|^2].$$

### Visual Description
Text-only slide.

---

## Page 53
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 53

satisfies
$$\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} \left[ \sum_{k=1}^K \eta \mathbb{E}_{x_{t_k} \sim p_{t_k}} [\|\hat{s}(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k})\|^2] \right] \lesssim n^{-2s/(2s+d)} \log^{18} n. \quad (92)$$
We take $N = n^{\frac{d}{d+2s}}$. According to Theorem 3.1, for $N \gg 1$, there exists a neural network $\phi_{\text{score}}$ with $L = \mathcal{O}(\log^4 N), \|W\|_\infty = \mathcal{O}(N \log^6 N), S = \mathcal{O}(N \log^8 N)$, and $B = \exp(\mathcal{O}(\log^4 N))$ that satisfies
$$\int_x p_t(x) \|\phi_{\text{score}}(x, t) - s(x, t)\|^2 dx \lesssim \frac{N^{-\frac{2s}{d}} \log(N)}{\sigma_t^2}. \quad (93)$$
for all $t \in [\underline{T}, \bar{T}]$. By summing up this for all $t = t_k$, we have that
$$\sum_{k=1}^K \eta \mathbb{E}_{x_{t_k} \sim p_{t_k}} [\|\phi_{\text{score}}(x_{t_k}, t_k) - \nabla \log p_{\eta k}(X_{t_k})\|^2] \lesssim \sum_{k=1}^K \eta \frac{N^{-\frac{2s}{d}} \log(N)}{1 \wedge t_k} \quad (94)$$
$$\le N^{-\frac{2s}{d}} \log(N) \left( \eta K + \eta \sum_{k=1}^K \frac{1}{t_k} \right) \lesssim N^{-\frac{2s}{d}} \log(N) (\bar{T} + \log(\bar{T}/\underline{T})) \lesssim N^{-\frac{2s}{d}} \log^2(N).$$
In order to convert this into the generalization bound, we need to evaluate the following two things. First, $\hat{s}$ can be taken so that
$$\sup_x \|\phi_{\text{score}}(x, t)\| dx \lesssim \frac{\log^{\frac{1}{2}}(N)}{\sigma_t},$$
and therefore we clip $s$ as in Section 4. Because such $s$ satisfies
$$\int_x p_t(x) \|\phi_{\text{score}}(x, t) - \nabla \log p_t(x)\|^2 dx \lesssim \frac{\log(N)}{\sigma_t^2},$$
we have that
$$\sum_{k=1}^K \eta \mathbb{E}_{x_{t_k} \sim p_{t_k}} [\|\phi_{\text{score}}(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k})\|^2] \le C_\ell = \mathcal{O}(\log^2(n))$$
(follow the argument for Lemma C.1 and how we derived (94) from (93)). Second, the covering number of the network class of $\ell(x) = \sum_{k=1}^K \eta \mathbb{E}[\|s(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k} | x)\|^2]$ over all $s$ with $\delta = n^{-\frac{2s}{d+2s}}$ is bounded by $n^{\frac{d}{d+2s}} \log^{16} n$, by following Appendix C.2. Thus, Theorem C.4 can be modified to this setting and we obtain that
$$\mathbb{E}_{\{x_{0,i}\}_{i=1}^n} \left[ \sum_{k=1}^K \eta \mathbb{E}_{x_{t_k} \sim p_{t_k}} [\|s(x_{t_k}, t_k) - \nabla \log p_{t_k}(x_{t_k})\|^2] \right] \lesssim n^{-s/(2s+d)} \log^2 n.$$
holds. Therefore, following the discussion in Section 4, we
## Page 57
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 57

$(I - A^\top)x$ are orthogonal. Thus, we have that
$$
\begin{aligned}
\int_{x \in B_{t,\epsilon}} p_t(x) \left[ 1 \vee \|\nabla \log(p_t(x))\|^2 \right] dx &= \int_{x \in B_{t,\epsilon}} p_t^{(1)}(x) p_t^{(2)}(x) \left[ 1 \vee \|\nabla \log(p_t(x))\|^2 \right] dx \quad (100) \\
&= \int_{x \in B_{t,\epsilon}} p_t^{(2)}(x) \left[ 1 \vee \|\nabla \log(p_t(x))\|^2 \right] dx \\
&= \int_{w \in \mathbb{R}^{d-d'}: \|w\| \ge C_e \sigma_t \sqrt{\log \epsilon^{-1}}} \frac{1 \vee \|w\|^2/\sigma_t^2}{\sigma_t^{d-d'} (2\pi)^{\frac{d-d'}{2}}} \exp\left( -\frac{\|w\|^2}{2\sigma_t^2} \right) dw.
\end{aligned}
$$
Applying Corollary F.8, (100) is bounded by $\epsilon$ with a sufficiently large constant $C_e$. $\square$

Now we only need consider the approximation of $\nabla \log p_t^{(2)}(x)$ within $B_{t,\epsilon}$.

**Lemma E.3.** Let $N \gg 1, \underline{T}, \epsilon = \text{poly}(N^{-1})$ and $\overline{T} \simeq \log N$. There exists a neural network $\phi_{\text{score},4} \in \Phi(L, W, S, B)$ such that
$$
\sup_{t \in [\underline{T}, \overline{T}]} \int_x p_t(x) \|\nabla \log p_t^{(2)}(x) - \phi_{\text{score},4}(x, t)\|^2 dx \lesssim \frac{N^{-\frac{2(s+1)}{d'}}}{\sigma_t^2}. \quad (101)
$$
Specifically, $\phi_{\text{score},4} \in \Phi(L, W, S, B)$ holds, where
$$
L = \mathcal{O}(\log^2 N), \|W\|_\infty = \mathcal{O}(\log^3 N), S = \mathcal{O}(\log^4 N), \text{ and } B = \exp(\mathcal{O}(\log^2 N)). \quad (102)
$$

*Proof.* First note that $\nabla \log p_t^{(2)}(x) = -\frac{1}{\sigma_t^2}(I_d - A)(I_d - A^\top)x$. We approximate this via the following four steps.
1. $\sigma_t$ is approximated by $\phi_\sigma$ from Lemma 3.3. Here we set $\epsilon \leftarrow (\underline{T}^4 \wedge \epsilon^4)\epsilon^4$.
2. Based on the approximation of $\sigma_t, \sigma_t^{-2}$ is approximated by $\phi_{\text{rec}}(\cdot; 2)$ from Corollary F.8. Here we set $\epsilon \leftarrow (\underline{T} \wedge \epsilon)\epsilon$.
3. $(I_d - A)(I_d - A^\top)$ is realized by $\text{ReLU}((I_d - A)(I_d - A^\top) \cdot x + 0) - \text{ReLU}(-(I_d - A)(I_d - A^\top) \cdot x + 0)$.
4. According to Lemma F.6 with $\epsilon \leftarrow \epsilon$ and $C \leftarrow \underline{T}^{-1} \vee \sqrt{\log \epsilon^{-1}}$, multiplication of $\sigma_t^{-2}$ and $(I_d - A)(I_d - A^\top)$ is constructed.

By concatenating these networks (using Lemma F.1), the obtained network size is bounded as
$$
L = \mathcal{O}(\log^2 \epsilon^{-1} + \log^2 \underline{T}^{-1}), \|W\|_\infty = \mathcal{O}(\log^3 \epsilon^{-1} + \log^3 \underline{T}^{-1}), S = \mathcal{O}(\log^4 \epsilon^{-1} + \log^4 \underline{T}^{-1}),
$$
and $B = \exp(\mathcal{O}(\log^2 \epsilon^{-1} + \log^2 \underline{T}^{-1}))$.
Then, for $x \in B_{t,\epsilon}$ with $t \ge \underline{T}$, we have that
$$
\|\nabla \log p_t^{(2)}(x) - \phi_{\text{score},4}\| \lesssim \epsilon.
$$
This yields that
$$
\int_{B_{t,\epsilon}} p_t(x) \|\nabla \log p_t^{(2)}(x) - \phi_{\text{score},4}\| dx \lesssim \epsilon.
$$
Together with Lemma E.2, by taking $\epsilon = \text{poly}(N^{-1})$, we have the assertion. $\square$

*Proof of Theorem 6.4.* Note that while the error bound (101) in Lemma E.3 is tighter than the bounds (98) and (99) in Lemma E.1, the required network size (102) in Lemma E.3 is smaller than the size bounds in Lemma E.1. Also note that the bounds in Lemma E.1 are the same as those in Theorem 3.1 and Lemma 3.6, except for that $d$ is replaced by $d'$. Therefore, by simply aggregating $\phi_{\text{score},3}$ and $\phi_{\text{score},4}$, we obtain the counterpart of the approximation theorems Theorem 3.1 and Lemma 3.6, and the rest of the analysis are the same as that of the $d$-dimensional case. Therefore, we obtain the statement. $\square$

### Visual Description
Text-only slide.

---

## Page 58
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 58

### F. Auxiliary lemmas
This final section summarizes existing results and prepares basic tools for the main parts of the proofs. A large part of this section (Appendices F.1 to F.4) is devoted to introduction of basic tools for the function approximation with neural networks, and thus those familiar with such topics (Yarotsky, 2017; Petersen & Voigtlaender, 2018; Schmidt-Hieber, 2019) can skip these subsections (although they contain some refinement and extension). Lemma F.14 is for elementary bounds on the Gaussian distribution and hitting time of the Brownian motion.

In the following we will define constants $C_{f,1}$ and $C_{f,2}$. Other than in this section, they are denoted by $C_f$, and sometimes other constants that comes from this section can be also denoted by $C_f$.

#### F.1. Construction of a larger neural network
Through construction of the desired neural network, we often need to combine sub-networks that approximates simpler functions to realize more complicated functions. We prepare the following lemmas, whose direct source is Nakada & Imaizumi (2020) but similar ideas date back to earlier literature such as Yarotsky (2017); Petersen & Voigtlaender (2018).

First we consider construction of composite functions. Although the bound on the sparsity $S$ was not given in the original version, we can verify it by carefully checking their proof.

**Lemma F.1** (Concatenation of neural networks (Remark 13 of Nakada & Imaizumi (2020))). *For any neural networks $\phi^1 : \mathbb{R}^{d_1} \to \mathbb{R}^{d_2}, \phi^2 : \mathbb{R}^{d_2} \to \mathbb{R}^{d_3}, \dots, \phi^k : \mathbb{R}^{d_k} \to \mathbb{R}^{d_{k+1}}$ with $\phi^i \in \Psi(L^i, W^i, S^i, B^i) (i = 1, 2, \dots, d)$, there exists a neural network $\phi \in \Phi(L, W, S, B)$ satisfying $\phi(x) = \phi^k \circ \phi^{k-1} \dots \circ \phi^1(x)$ for all $x \in \mathbb{R}^{d_1}$, with*
$$
L = \sum_{i=1}^k L^i, \quad W \le 2 \sum_{i=1}^k W^i, \quad S \le \sum_{i=1}^k S^i + \sum_{i=1}^{k-1} (\|A_{L^i}^i\|_0 + \|b_{L^i}^i\|_0 + \|A_1^{i+1}\|_0) \le 2 \sum_{i=1}^k S^i, \quad \text{and } B \le \max_{1 \le i \le k} B^i.
$$
*Here $A_j^i$ is the parameter matrix and $b_j^i$ is the bias vector at the $j$th layer of the $i$th neural network $\phi^i$.*

Next we introduce the identity function.

**Lemma F.2** (Identity function (p.19 of Nakada & Imaizumi (2020))). *For $L \ge 2$ and $d \in \mathbb{N}$, there exists a neural network $\phi_{Id}^{d,L} \in \Phi(L, W, S, B)$ with parameters $(A_1, b_1) = ((I_d, -I_d)^\top, 0), (A_i, b_i) = (I_{2d}, 0) (i = 1, 2, \dots, L-2), (A_L) = ((I_d, -I_d), 0)$, that realize $d$-dimensional identity map. Here,*
$$
\|W\|_\infty = 2d, \quad S = 2dL, \quad B = 1.
$$
*For $L = 1$, a neural network $\phi_{Id}^{d,1} \in \Phi(1, (d), d, 1)$ with parameters $(A_1, b_1) = (I_d, 0)$ realizes $d$-dimensional identity map.*

We then consider parallelization of neural networks. The following lemmas are Remarks 14 and 15 of Nakada & Imaizumi (2020) with a modification to allow sub-networks to have different depths.

**Lemma F.3** (Parallelization of neural networks). *For any neural networks $\phi^1, \phi^2, \dots, \phi^k$ with $\phi^i : \mathbb{R}^{d_i} \to \mathbb{R}^{d'_i}$ and $\phi^i \in \Psi(L^i, W^i, S^i, B^i) (i = 1, 2, \dots, d)$, there exists a neural network $\phi \in \Phi(L, W, S, B)$ satisfying $\phi(x) = [\phi^1(x^1)^\top \phi^2(x^2)^\top \dots \phi^k(x^k)^\top]^\top : \mathbb{R}^{d_1+d_2+\dots+d_k} \to \mathbb{R}^{d'_1+d'_2+\dots+d'_k}$ for all $x = (x_1^\top x_2^\top \dots x_k^\top)^\top \in \mathbb{R}^{d_1+d_2+\dots+d_k}$ (here $x_i$ can be shared), with*
$$
L = L, \quad \|W\|_\infty \le \sum_{i=1}^k \|W^i\|_\infty, \quad S \le \sum_{i=1}^k S^i, \quad \text{and } B \le \max_{1 \le i \le k} B^i \quad \text{(when } L = L_i \text{ holds for all } i),
$$
$$
L = \max_{1 \le i \le k} L^i, \quad \|W\|_\infty \le 2 \sum_{i=1}^k \|W^i\|_\infty, \quad S \le 2 \sum_{i=1}^k (S^i + L W_L^i), \quad \text{and } B \le \max\{ \max_{1 \le i \le k} B^i, 1\} \quad \text{(otherwise)}.
$$
*Moreover, there exists a network $\phi_{\text{sum}}(x) \in \Phi(L, W, S, B)$ that realizes $\sum_{i=1}^k \phi^i(x)$, with*
$$
L = \max_{1 \le i \le k} L^i + 1, \quad \|W\|_\infty \le 4 \sum_{i=1}^k \|W^i\|_\infty, \quad S \le 4 \sum_{i=1}^k (S^i + L W_L) + 2W_L, \quad \text{and } B \le \max\{ \max_{1 \le i \le k} B^i, 1\}.
$$

### Visual Description
Text-only slide.

---

## Page 59
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 59

*Proof of Lemma F.3.* Let us consider the first part. For the case when $L = L_i$ holds for all $i$, the assertions are exactly the same as Remarks 14 and 15 Nakada & Imaizumi (2020). Otherwise, we first prepare a network $\phi'^{i}$ realizing $\phi_{Id}^{d, L-L_i} \circ \phi^i$ for all $i$, so that every network have the same depth without changing outputs of the networks. From Lemmas F.1 and F.2, $\phi'^{i} \in \Phi(L, W'^i, S'^i, B'^i)$ holds, with $L = \max_{1 \le i \le k} L^i, \|W'^i\|_\infty = \max\{\|W^i\|_\infty, 2W_L\} \le 2\|W^i\|_\infty, S'^i \le 2S^i + 2(L-L_i)W_L^i \le 2(S^i + L W_L^i)$, and $B'^i = \max\{B^i, 1\}$. We then apply the results for the case of $L = L_i (i = 1, 2, \dots, k)$.

For the second part, since summation of the outputs of $k$ neural networks can be realized by a 1 layer neural network with the width of $k$, Lemma F.3 together with Lemma F.1 gives the bound to realize $\sum_{i=1}^k \phi^i(x)$. $\square$

In the analysis of the score-based diffusion model, we often face unbounded functions. To resolve difficulty coming from the unboundedness, the clipping operation is often be adopted.

**Lemma F.4** (Clipping function). *For any $a, b \in \mathbb{R}^d$ with $a_i \le b_i (i = 1, 2, \dots, d)$, there exists a clipping function $\phi_{\text{clip}}(x; a, b) \in \Phi(2, (d, 2d, d)^\top, 7d, \max_{1 \le i \le d} \max\{|a_i|, b_i\})$ such that*
$$
\phi_{\text{clip}}(x; a, b)_i = \min\{b_i, \max\{x_i, a_i\}\} \quad (i = 1, 2, \dots, d)
$$
*holds. When $a_i = c$ and $b_i = C$ for all $i$, we sometimes denote $\phi_{\text{clip}}(x; a, b)$ as $\phi_{\text{clip}}(x; c, C)$ using scalar values $c$ and $C$.*

*Proof.* Because, for each coordinate $i, \min\{b_i, \max\{x_i, a_i\}\}$ is realized as
$$
\min\{b_i, \max\{x_i, a_i\}\} = \text{ReLU}(x_i - a_i) - \text{ReLU}(x_i - b_i) + a_i \in \Phi(2, (1, 2, 1), 7, \max\{|a_i|, b_i\}),
$$
parallelizing this for all $i$ with Lemma F.3 yields the assertion. $\square$

With the above clipping function, we prepare switching functions, which gives the way to construct approximation in the combined region when there are two different approximations valid for different regions.

**Lemma F.5** (Switching function). *Let $\underline{t}_1 < \underline{t}_2 < \overline{t}_1 < \overline{t}_2$, and $f(x, t)$ be some scalar-valued function (for a vector-valued function, we just apply this coordinate-wise). Assume that $\phi^1(x, t)$ and $\phi^2(x, t)$ approximate $f(x, t)$ up to an additive error of $\epsilon$ but approximation with $\phi^1(x, t)$ and $\phi^2(x, t)$ are valid for $[\underline{t}_1, \overline{t}_1]$ and $[\underline{t}_2, \overline{t}_2]$, respectively. Then, there exist neural networks $\phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1), \phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1) \in \Phi(3, (1, 2, 1, 1)^\top, 8, \max\{\overline{t}_1, (\overline{t}_1 - \underline{t}_2)^{-1}\})$, and $\phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1)\phi^1(x, t) + \phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1)\phi^2(x, t)$ approximates $f(x, t)$ up to an additive error of $\epsilon$ in $[\underline{t}_1, \overline{t}_2]$.*

*Proof.* We define
$$
\phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1) = \frac{1}{\overline{t}_1 - \underline{t}_2} \text{ReLU}(\phi_{\text{clip}}(t; \underline{t}_2, \overline{t}_1) - \underline{t}_2), \text{ and } \phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1) = \frac{1}{\overline{t}_1 - \underline{t}_2} \text{ReLU}(\overline{t}_1 - \phi_{\text{clip}}(t; \underline{t}_2, \overline{t}_1)).
$$
Here $\phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1), \phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1) \in [0, 1], \phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1) + \phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1) = 1$ for all $t, \phi_{\text{swit}}^1(t; \underline{t}_2, \overline{t}_1) = 0$ for all $t \ge \overline{t}_1$, and $\phi_{\text{swit}}^2(t; \underline{t}_2, \overline{t}_1)$ for $t \le \underline{t}_2$. From this construction, the assertion follows. $\square$

#### F.2. Basic neural network structure that approximates rational functions
When approximating a function in the Besov space with a neural network, the most basic structure of the network is that of approximating polynomials (Suzuki, 2018). In our construction of the diffused B-spline basis, we need to approximate rational functions.

We begin with monomials. Although the traditional fact that we can approximate monomials with neural networks with an arbitrary additive error of $\epsilon$ using only $\mathcal{O}(\log \epsilon^{-1})$ non-zero parameters has been very famous (Yarotsky, 2017; Petersen & Voigtlaender, 2018; Schmidt-Hieber, 2020), we could not find the result that explicitly states the dependency on parameters including the degree and the range of the input. Therefore, just to be sure, we revisit Lemma A.3 of Schmidt-Hieber (2020) and here gives the extended version of that lemma.

**Lemma F.6** (Approximation of monomials). *Let $d \ge 2, C \ge 1, 0 < \epsilon_{\text{error}} \le 1$. For any $\epsilon > 0$, there exists a neural network $\phi_{\text{mult}}(x_1, x_2, \dots, x_d) \in \Psi(L, W, S, B)$ with $L = \mathcal{O}(\log d(\log \epsilon^{-1} + d \log C)), \|W\|_\infty = 48d, S = \mathcal{O}(d \log \epsilon^{-1} + d \log C)), B = C^d$ such that*
$$
\left| \phi_{\text{mult}}(x'_1, x'_2, \dots, x'_d) - \prod_{d'=1}^d x_{d'} \right| \le \epsilon + d C^{d-1} \epsilon_{\text{error}}, \text{ for all } x \in [-C, C]^d \text{ and } x' \in \mathbb{R} \text{ with } \|x - x'\|_\infty \le \epsilon_{\text{error}},
$$

### Visual Description
Text-only slide.

---

## Page 60
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 60

$|\phi_{\text{mult}}(x)| \le C^d$ for all $x \in \mathbb{R}^d$, and $\phi_{\text{mult}}(x'_1, x'_2, \dots, x'_d) = 0$ if at least one of $x'_i$ is 0.

We note that some of $x_i, x_j (i \neq j)$ can be shared. For $\prod_{i=1}^I x_i^{\alpha_i}$ with $\alpha_i \in \mathbb{Z}_+ (i = 1, 2, \dots, I)$ and $\sum_{i=1}^I \alpha_i = d$, there exists a neural network satisfying the same bounds as above, and the network is denoted by $\phi_{\text{mult}}(x; \alpha)$.

*Proof.* First of all, it is known from Schmidt-Hieber (2020) that there exists a neural network $\bar{\phi}'_{\text{mult}}(x, y) \in \Psi(L, W, S, B)$ with $L = i + 5, \|W\|_\infty = 6, B = 1$ such that
$$
|\bar{\phi}'_{\text{mult}}(x, y) - xy| \le 2^{-i}, \quad \text{for all } (x, y) \in [0, 1]^2,
$$
and $|\bar{\phi}'_{\text{mult}}(x, y)| \le 1$ for all $(x, y) \in \mathbb{R}^2$, and $\bar{\phi}'_{\text{mult}}(x, y) = 0$ if either $x$ or $y$ is 0. With this network, we can see that $|\text{sign}(xy)\bar{\phi}'_{\text{mult}}(|x|, |y|) - xy| \le 2^{-i}$ holds for all $(x, y) \in [-1, 1]^2, |\bar{\phi}'_{\text{mult}}(x, y)| \le 1$ for all $(x, y) \in \mathbb{R}^2$, and $\bar{\phi}_{\text{mult}}(x, y) = 0$ if either $x$ or $y$ is 0. Because
$$
\begin{aligned}
\text{sign}(xy)\bar{\phi}'_{\text{mult}}(|x|, |y|) &= \text{ReLU}(\bar{\phi}'_{\text{mult}}(\text{ReLU}(x), \text{ReLU}(y)) + \bar{\phi}'_{\text{mult}}(\text{ReLU}(-x), \text{ReLU}(-y)) \\
&\quad - \bar{\phi}'_{\text{mult}}(\text{ReLU}(-x), \text{ReLU}(y)) - \bar{\phi}'_{\text{mult}}(\text{ReLU}(x), \text{ReLU}(-y))) \\
&\quad - \text{ReLU}(-\bar{\phi}'_{\text{mult}}(\text{ReLU}(x), \text{ReLU}(y)) - \bar{\phi}'_{\text{mult}}(\text{ReLU}(-x), \text{ReLU}(-y)) \\
&\quad + \bar{\phi}'_{\text{mult}}(\text{ReLU}(-x), \text{ReLU}(y)) + \bar{\phi}'_{\text{mult}}(\text{ReLU}(x), \text{ReLU}(-y))) \\
&=: \bar{\phi}_{\text{mult}}(x, y)
\end{aligned}
$$
holds, we can realize the function $xy$ for $[-1, 1]^d$, by a neural network $\bar{\phi}_{\text{mult}}(x, y) \in \Psi(L, W, S, B)$ with $L = i + 7, \|W\|_\infty = 48, S \le L \|W\|_\infty (\|W\|_\infty + 1) = 48(i + 7), B = 1$ with an approximation error up to $2^{-i}$.

Then, following Schmidt-Hieber (2020), we recursively construct $\bar{\phi}_{\text{mult}}(x_1, x_2, \dots, x_{2^{j+1}})$ using
$$
\bar{\phi}_{\text{mult}}(x_1, x_2, \dots, x_{2^{j+1}}) = \bar{\phi}_{\text{mult}}(\bar{\phi}_{\text{mult}}(x_1, x_2, \dots, x_{2^j}), \bar{\phi}_{\text{mult}}(x_{2^j+1}, x_{2^j+2}, \dots, x_{2^{j+1}})).
$$
By filling extra dimensions of $(x_1, x_2, \dots, x_{2^j})$ with 1, we obtain the neural network $\phi_{\text{mult}}(x_1, x_2, \dots, x_d) \in \Psi(L, W, S, B)$ for all $d \ge 2$ and $L = \mathcal{O}(\log d(\log \epsilon^{-1} + \log d)), \|W\|_\infty = 48d, S = \mathcal{O}(d(\log \epsilon^{-1} + \log d)), B = 1$ such that
$$
\left| \bar{\phi}_{\text{mult}}(x_1, x_2, \dots, x_d) - \prod_{d'=1}^d x_{d'} \right| \le \epsilon, \quad \text{for all } x \in [-1, 1]^d.
$$
We then construct $\phi_{\text{mult}}$ as follows:
$$
\phi_{\text{mult}}(x) = C^d \bar{\phi}_{\text{mult}}(\phi_{\text{clip}}(x; -C, C)/C).
$$
Here the approximation error over $[-C, C]^d$ is bounded by $C^d \epsilon$. We reset $\epsilon \leftarrow C^{-d} \epsilon$ so that the approximation error is smaller than $\epsilon$, and then we have $\phi_{\text{mult}} \in \Phi(L, W, S, B)$ with $L = \mathcal{O}(\log d(\log d + \log \epsilon^{-1} + d \log C)), \|W\|_\infty = 48d, S = \mathcal{O}(d(\log d + \log \epsilon^{-1} + d \log C)), B = 1$. Therefore, the bounds on $L, \|W\|_\infty, B, S$ in the assertion follows from Lemmas F.1 and F.4.

When the input fluctuates, we have
$$
\begin{aligned}
&\left| C^d \bar{\phi}_{\text{mult}}(\phi_{\text{clip}}(x'; -C, C)/C) - \prod_{i=1}^d x_i \right| \\
&\le \left| C^d \bar{\phi}_{\text{mult}}(\phi_{\text{clip}}(x'; -C, C)/C) - \prod_{i=1}^d \min\{C, \max\{x'_i, -C\}\} \right| + \left| \prod_{i=1}^d \min\{C, \max\{x'_i, -C\}\} - \prod_{i=1}^d x_i \right| \\
&\le C^d \cdot C^{-d} \epsilon + C^{d-1} \sum_{i=1}^d |x_i - \min\{C, \max\{x'_i, -C\}\}| = \epsilon + d C^{d-1} \epsilon_{\text{error}},
\end{aligned}
$$
which yields the first part of the assertion.

Finally, we note that some of $x_i, x_j (i \neq j)$ can be shared because all we need is to identify columns in the first layer of $\bar{\phi}_{\text{mult}}(x_1, \dots, x_d)$ that correspond to the same coordinate. $\square$

### Visual Description
Text-only slide.

---

## Page 61
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 61

We next provide how to approximate the reciprocal function $y = \frac{1}{x}$. Approximation of rational functions has already investigated in (Telgarsky, 2017; Boullé et al., 2020). However, we found
## Page 65
### Content
Diffusion Models are Minimax Optimal Distribution Estimators 65

*Proof.* Let us denote $x^l = \prod_{i=1}^d x_i^{l_i}$ and $|l| = \sum_{i=1}^d l_i$ for simple presentation. Let $r = \|x\|_\infty$, and we get

$$
\begin{aligned}
& \int_{\|x\|_\infty \ge \sigma_t \sqrt{4 \log \epsilon^{-1}}} \frac{x^l}{\sigma_t^{|l|}} p(x) dx \\
& \int_{\|x\|_1 \ge \sigma_t \sqrt{4 \log \epsilon^{-1}}} \frac{x^l}{\sigma_t^{|l|}} p(x) dx \\
& \le \int_{r=\sigma_t \sqrt{4 \log \epsilon^{-1}}}^\infty \frac{r^{|l|}}{\sigma_t^{|l|}} \frac{1}{\sigma_t^d (2\pi)^{\frac{d}{2}}} \exp \left( -\frac{r^2}{2\sigma_t^2} \right) (d-1)r^{d-1} dr \\
& = \int_{s=\sqrt{4 \log \epsilon^{-1}}}^\infty s^{|l|+d-1} \frac{1}{(2\pi)^{\frac{d}{2}}} \exp \left( -\frac{s^2}{2} \right) (d-1) ds \quad \text{(by letting } s = r/\sigma_t \text{)} \\
& = \frac{(4 \log \epsilon^{-1})^{(|l|+d-1)/2}}{(2\pi)^{\frac{d}{2}}} \exp \left( -\frac{4 \log \epsilon^{-1}}{2} \right) (d-1) + \int_{s=\sqrt{4 \log \epsilon^{-1}}}^\infty \frac{(|l|+d-1)s^{|l|+d-2}}{(2\pi)^{\frac{d}{2}}} \exp \left( -\frac{s^2}{2} \right) (d-1) ds \\
& = \dots = \sum_{0 \le i \le \lfloor \frac{|l|+d-1}{2} \rfloor} \frac{(|l|+d-1)!!}{(|l|+d-1-2i)!!} \frac{(4 \log \epsilon^{-1})^{(|l|+d-1-2i)/2} (d-1)}{(2\pi)^{\frac{d}{2}}} \epsilon^2 \\
& \quad + \begin{cases} \int_{s=\sqrt{4 \log \epsilon^{-1}}}^\infty \frac{(|l|+d-1)!!}{(2\pi)^{\frac{d}{2}}} \frac{1}{(2\pi)^{\frac{d}{2}}} \exp \left( -\frac{s^2}{2} \right) (d-1) ds & (|l|+d: \text{even}) \\ 0 & (|l|+d: \text{odd}) \end{cases} \quad \text{(by iterating integration by parts)} \\
& \lesssim \epsilon^2 \log^{\frac{d+|l|-1}{2}} \epsilon^{-1}. \quad (106)
\end{aligned}
$$

Replacing $\epsilon$ by $\epsilon/dl$, RHS of (106) is bounded by
$$ \frac{\epsilon^2}{d^2 l^2} \log^{\frac{d+|l|-1}{2}} (\epsilon/dl)^{-1} \lesssim \epsilon, $$
which yields the conclusion. $\square$

**Lemma F.15.** Let $(B_s)_{[0,t]}$ be the 1-dimensional Brownian motion and $X_t = \int_0^t \beta_s dB_s$, with $\beta_s \le \bar{\beta}$. Then, we have that
$$ \mathbb{P} \left[ \sup_{s \in [0,t]} |X_t| \ge 2 \sqrt{\bar{\beta} t \log(2\epsilon^{-1})} \right] \le \epsilon. $$

*Proof.* We bound the case $\beta_s \equiv \bar{\beta}$ because it maximize the hitting probability. According to Karatzas et al. (1991), for $x > 0$,
$$ \mathbb{P} \left[ \sup_{s \in [0,t]} |X_t| \ge x \right] = \frac{4}{\sqrt{2\pi}} \int_{\frac{x}{\sqrt{2\bar{\beta}t}}}^\infty e^{-y^2/2} dy = \frac{4}{\sqrt{2\pi}} \int_{\frac{x}{\sqrt{4\bar{\beta}t}}}^\infty e^{-z^2} \sqrt{2} dz \le 2e^{-x^2/4\bar{\beta}t}. $$
For the second equality, we simply replaced $y/\sqrt{2}$ with $z$. For the last inequality, we used $\frac{4}{\sqrt{2\pi}} \cdot \sqrt{2} \le 2$ and $\int_x^\infty e^{-y^2} dy \le e^{-x^2}$. Therefore, setting $x = 2 \sqrt{\bar{\beta} t \log(2\epsilon^{-1})}$ yields the assertion. $\square$

### Visual Description
Text-only slide. The page contains mathematical proofs, including several multi-line equations involving integrals, summations, and probability bounds. It concludes with Lemma F.15 and its corresponding proof.

---
