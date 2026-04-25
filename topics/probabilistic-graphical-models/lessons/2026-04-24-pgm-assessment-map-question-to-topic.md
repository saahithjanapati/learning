# PGM Assessment Map: Question To Topic

## Jump

- [[2026-04-24-pgm-assessment-topic-map|Hub]]
- [[2026-04-24-pgm-assessment-map-difficulty-to-questions|Difficulty -> Question Map]]
- [[2026-04-24-pgm-assessment-map-topic-to-assessments|Topic -> Assessment Reverse Map]]

## Question -> Topic Map

### Homework 1

- `HW1-Q1` (`Easy`): undirected graphical model factorization, conditional independence by graph separation, and Markov blankets.
- `HW1-Q2` (`Easy`): Bayesian network factorization, d-separation, Markov blankets, and moralization.
- `HW1-Q3` (`Medium`): KL divergence as a non-metric and the relation between covariance and mutual information via Pinsker-style reasoning.
- `HW1-Q4` (`Easy`): convert between UGMs, DAGs, and factor graphs.
- `HW1-Q5` (`Medium`): exact belief propagation on a tree factor graph, including messages, beliefs, factor beliefs, and partition function.
- `HW1-Q6` (`Medium`): variable elimination order, tree structure, and how eliminating a high-degree node can create a large factor even on a tree.
- `HW1-Q7` (`Hard`): formal proof that d-separation implies conditional independence.
- `HW1-Q8` (`Hard`): exact sampling from an Ising model on a tree using sum-product style dynamic programming and top-down sampling.
- `HW1-Q9` (`Hard`): hardness / reduction viewpoint for inference in Ising models, especially reducing partition-function computation to marginals and vice versa via oracle constructions.

### Homework 2

- `HW2-Q1` (`Easy`): MCMC concept checks: stationary distribution, rejection sampling in high dimensions, HMC vs Gibbs on discrete spaces, tempering intuition, and slow mixing in Ising models.
- `HW2-Q2` (`Medium`): rejection-sampling proposal validity via tail comparison and boundedness of `sup_x p(x) / q(x)`.
- `HW2-Q3` (`Easy`): Gibbs sampling for a bivariate Gaussian via conditional Gaussian formulas.
- `HW2-Q4` (`Hard`): Markov-chain graph structure, irreducibility, eigendecomposition, stationary distribution, spectral mixing bounds, spectral gap, and conductance.
- `HW2-Q9` (`Hard`, as numbered in the processed file): linear GCN dynamics and oversmoothing through repeated multiplication by normalized adjacency and weight matrices.
- `HW2-PROG` (`Hard`): Gibbs sampling, annealed importance sampling, and Gibbs-with-tempering on Ising grids; compare magnetization and mixing across coupling strengths.

### Homework 3

- `HW3-Q1` (`Medium`): mean-field approximation for an Ising model, entropy-energy objective rewriting, and non-concavity of the mean-field objective.
- `HW3-Q2` (`Hard`): local polytope vs marginal polytope, cycle inequalities, and why cycle constraints are still insufficient in general.
- `HW3-Q3` (`Hard`): loopy belief propagation on a cycle, including convergence in one regime and periodic non-convergence in another.
- `HW3-Q4` (`Hard`): Bayesian HMM with Dirichlet priors, mean-field factorization, and CAVI updates for `q(pi)`, `q(A)`, and `q(z_t)`.
- `HW3-Q5` (`Medium`): REINFORCE vs reparameterization-trick variance comparison, including examples where either one can be better.
- `HW3-PROG` (`Hard`): variational inference / variational EM for LDA on text data.

### Homework 4

- `HW4-Q1` (`Hard`): exponential families; closed-form score-matching estimator; convexity of NCE; and Hessian-level comparison of NCE vs MLE efficiency.
- `HW4-Q2` (`Medium`): WGAN with linear generator and quadratic critic; trace-form loss; exact optimum condition `WW^T = I`; and alternating best-response cycling.
- `HW4-Q3` (`Easy`): metric properties, KL not being a metric, and when an IPM-style distance `d_F` becomes a true metric.
- `HW4-PROG` (`Medium`): neural score matching on `1D` and `2D` Gaussian mixtures, reconstructing `log p` and `p` from a learned score, and comparing learned vs true score fields.

### Midterm 1

- `M1-Q1` (`Easy`): Bayesian network local reasoning: Markov blanket and d-separation / conditional independence.
- `M1-Q2` (`Easy`): undirected graphical model local reasoning: Markov blanket, factor-graph conversion, and separation.
- `M1-Q3` (`Easy`): irreducibility and aperiodicity for a finite Markov chain.
- `M1-Q4` (`Easy`): MALA concept check.
- `M1-Q5` (`Easy`): Metropolis-Hastings / conductance concept check.
- `M1-Q6` (`Easy`): Gibbs-sampling / ergodicity concept check.
- `M1-Q7` (`Easy`): simulated tempering intuition.
- `M1-Q8` (`Easy`): simulated tempering stationary-distribution intuition.
- `M1-Q9` (`Medium`): systematic-scan Gibbs sampler on a two-variable distribution: full conditionals, sweep transition matrix, stationarity, and non-reversibility.
- `M1-Q10` (`Medium`): Metropolis-Hastings independent sampler: acceptance probability, irreducibility, aperiodicity, high-dimensional slow mixing, and comparison with coordinate-wise Gibbs.
- `M1-Q11` (`Hard`): explicit construction of maximal-clique log-potentials from smaller local log-potentials, i.e. constructive clique-based factorization reasoning.
- `M1-Q12` (`Medium`): construct and verify a tree decomposition with the cover, edge, and running-intersection properties.

### Practice Final: Short Questions

- `PF-SQ1` (`Medium`): Gibbs variational principle relaxations, inner vs outer approximations, and mean field as an inner approximation.
- `PF-SQ2` (`Easy`): over-smoothing vs over-squashing in deep GNNs.
- `PF-SQ3` (`Easy`): GAN basics, JS-divergence view of standard GANs, and why Wasserstein objectives help with vanishing gradients.
- `PF-SQ4` (`Medium`): `KL(q || p)` vs `KL(p || q)` and the mode-seeking vs mass-covering distinction.
- `PF-SQ5` (`Medium`): HMC and simulated tempering as Markov chains on extended state spaces.
- `PF-SQ6` (`Easy`): VI vs MCMC and the role of the ELBO.
- `PF-SQ7` (`Medium`): standard GAN local minima and non-uniqueness in CycleGAN even with cycle consistency.
- `PF-SQ8` (`Easy`): NCE noise-distribution choice and why "farther from the data" is not automatically better.
- `PF-SQ9` (`Medium`): when REINFORCE vs reparameterization can be applied directly for unbiased VAE / ELBO gradients.
- `PF-SQ10` (`Medium`): backdoor criterion in causal graphs.
- `PF-SQ11` (`Medium`): what the PC algorithm can and cannot identify from graph structure.
- `PF-SQ12` (`Easy`): predictor-corrector sampling for score-based diffusion models.
- `PF-SQ13` (`Easy`): probability-flow ODE uses in diffusion models: likelihoods, faster sampling, and inversion / latent-trajectory reasoning.
- `PF-SQ14` (`Medium`): derivative requirements in Hyvarinen score matching for continuous EBMs.

### Practice Final: Long Problems

- `PF-P1` (`Easy`): Bayesian network factorization, d-separation, Markov blankets, and moralization.
- `PF-P2` (`Medium`): finite Markov chain graph, irreducibility, aperiodicity, and unique stationary distribution.
- `PF-P3` (`Medium`): shortest paths via iterative dynamic programming and exact implementation through message-passing GNN layers.
- `PF-P4` (`Hard`): modified score-matching objectives, gradient matching vs score matching, generalized score matching, and weighting rare informative regions.
- `PF-P5` (`Medium`): JS-based GAN vs WGAN on shifted uniform intervals, including flat JS gradients and informative Wasserstein gradients.
