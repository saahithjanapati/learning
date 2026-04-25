# PGM Assessment Map: Difficulty To Questions

## Jump

- [[2026-04-24-pgm-assessment-topic-map|Hub]]
- [[2026-04-24-pgm-assessment-map-question-to-topic|Question -> Topic Map]]
- [[2026-04-24-pgm-assessment-map-topic-to-assessments|Topic -> Assessment Reverse Map]]

## Difficulty -> Question Map

### Easy

- `HW1-Q1`: undirected graphical model factorization, conditional independence by graph separation, and Markov blankets.
- `HW1-Q2`: Bayesian network factorization, d-separation, Markov blankets, and moralization.
- `HW1-Q4`: convert between UGMs, DAGs, and factor graphs.
- `HW2-Q1`: MCMC concept checks: stationary distribution, rejection sampling in high dimensions, HMC vs Gibbs on discrete spaces, tempering intuition, and slow mixing in Ising models.
- `HW2-Q3`: Gibbs sampling for a bivariate Gaussian via conditional Gaussian formulas.
- `HW4-Q3`: metric properties, KL not being a metric, and when an IPM-style distance `d_F` becomes a true metric.
- `M1-Q1`: Bayesian network local reasoning: Markov blanket and d-separation / conditional independence.
- `M1-Q2`: undirected graphical model local reasoning: Markov blanket, factor-graph conversion, and separation.
- `M1-Q3`: irreducibility and aperiodicity for a finite Markov chain.
- `M1-Q4`: MALA concept check.
- `M1-Q5`: Metropolis-Hastings / conductance concept check.
- `M1-Q6`: Gibbs-sampling / ergodicity concept check.
- `M1-Q7`: simulated tempering intuition.
- `M1-Q8`: simulated tempering stationary-distribution intuition.
- `PF-SQ2`: over-smoothing vs over-squashing in deep GNNs.
- `PF-SQ3`: GAN basics, JS-divergence view of standard GANs, and why Wasserstein objectives help with vanishing gradients.
- `PF-SQ6`: VI vs MCMC and the role of the ELBO.
- `PF-SQ8`: NCE noise-distribution choice and why "farther from the data" is not automatically better.
- `PF-SQ12`: predictor-corrector sampling for score-based diffusion models.
- `PF-SQ13`: probability-flow ODE uses in diffusion models: likelihoods, faster sampling, and inversion / latent-trajectory reasoning.
- `PF-P1`: Bayesian network factorization, d-separation, Markov blankets, and moralization.

### Medium

- `HW1-Q3`: KL divergence as a non-metric and the relation between covariance and mutual information via Pinsker-style reasoning.
- `HW1-Q5`: exact belief propagation on a tree factor graph, including messages, beliefs, factor beliefs, and partition function.
- `HW1-Q6`: variable elimination order, tree structure, and how eliminating a high-degree node can create a large factor even on a tree.
- `HW2-Q2`: rejection-sampling proposal validity via tail comparison and boundedness of `sup_x p(x) / q(x)`.
- `HW3-Q1`: mean-field approximation for an Ising model, entropy-energy objective rewriting, and non-concavity of the mean-field objective.
- `HW3-Q5`: REINFORCE vs reparameterization-trick variance comparison, including examples where either one can be better.
- `HW4-Q2`: WGAN with linear generator and quadratic critic; trace-form loss; exact optimum condition `WW^T = I`; and alternating best-response cycling.
- `HW4-PROG`: neural score matching on `1D` and `2D` Gaussian mixtures, reconstructing `log p` and `p` from a learned score, and comparing learned vs true score fields.
- `M1-Q9`: systematic-scan Gibbs sampler on a two-variable distribution: full conditionals, sweep transition matrix, stationarity, and non-reversibility.
- `M1-Q10`: Metropolis-Hastings independent sampler: acceptance probability, irreducibility, aperiodicity, high-dimensional slow mixing, and comparison with coordinate-wise Gibbs.
- `M1-Q12`: construct and verify a tree decomposition with the cover, edge, and running-intersection properties.
- `PF-SQ1`: Gibbs variational principle relaxations, inner vs outer approximations, and mean field as an inner approximation.
- `PF-SQ4`: `KL(q || p)` vs `KL(p || q)` and the mode-seeking vs mass-covering distinction.
- `PF-SQ5`: HMC and simulated tempering as Markov chains on extended state spaces.
- `PF-SQ7`: standard GAN local minima and non-uniqueness in CycleGAN even with cycle consistency.
- `PF-SQ9`: when REINFORCE vs reparameterization can be applied directly for unbiased VAE / ELBO gradients.
- `PF-SQ10`: backdoor criterion in causal graphs.
- `PF-SQ11`: what the PC algorithm can and cannot identify from graph structure.
- `PF-SQ14`: derivative requirements in Hyvarinen score matching for continuous EBMs.
- `PF-P2`: finite Markov chain graph, irreducibility, aperiodicity, and unique stationary distribution.
- `PF-P3`: shortest paths via iterative dynamic programming and exact implementation through message-passing GNN layers.
- `PF-P5`: JS-based GAN vs WGAN on shifted uniform intervals, including flat JS gradients and informative Wasserstein gradients.

### Hard

- `HW1-Q7`: formal proof that d-separation implies conditional independence.
- `HW1-Q8`: exact sampling from an Ising model on a tree using sum-product style dynamic programming and top-down sampling.
- `HW1-Q9`: hardness / reduction viewpoint for inference in Ising models, especially reducing partition-function computation to marginals and vice versa via oracle constructions.
- `HW2-Q4`: Markov-chain graph structure, irreducibility, eigendecomposition, stationary distribution, spectral mixing bounds, spectral gap, and conductance.
- `HW2-Q9` (as numbered in the processed file): linear GCN dynamics and oversmoothing through repeated multiplication by normalized adjacency and weight matrices.
- `HW2-PROG`: Gibbs sampling, annealed importance sampling, and Gibbs-with-tempering on Ising grids; compare magnetization and mixing across coupling strengths.
- `HW3-Q2`: local polytope vs marginal polytope, cycle inequalities, and why cycle constraints are still insufficient in general.
- `HW3-Q3`: loopy belief propagation on a cycle, including convergence in one regime and periodic non-convergence in another.
- `HW3-Q4`: Bayesian HMM with Dirichlet priors, mean-field factorization, and CAVI updates for `q(pi)`, `q(A)`, and `q(z_t)`.
- `HW3-PROG`: variational inference / variational EM for LDA on text data.
- `HW4-Q1`: exponential families; closed-form score-matching estimator; convexity of NCE; and Hessian-level comparison of NCE vs MLE efficiency.
- `M1-Q11`: explicit construction of maximal-clique log-potentials from smaller local log-potentials, i.e. constructive clique-based factorization reasoning.
- `PF-P4`: modified score-matching objectives, gradient matching vs score matching, generalized score matching, and weighting rare informative regions.
