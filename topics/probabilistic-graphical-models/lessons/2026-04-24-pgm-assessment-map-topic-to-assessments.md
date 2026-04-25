# PGM Assessment Map: Topic To Assessments

## Jump

- [[2026-04-24-pgm-assessment-topic-map|Hub]]
- [[2026-04-24-pgm-assessment-map-question-to-topic|Question -> Topic Map]]
- [[2026-04-24-pgm-assessment-map-difficulty-to-questions|Difficulty -> Question Map]]

## Topic -> Assessment Reverse Map

### Directed Graphical Models / Bayesian Networks / D-Separation / Moralization

- `HW1-Q2` (`Easy`): Bayesian network factorization, d-separation, Markov blankets, and moralization.
- `HW1-Q7` (`Hard`): formal proof that d-separation implies conditional independence.
- `M1-Q1` (`Easy`): Bayesian network local reasoning: Markov blanket and d-separation / conditional independence.
- `PF-P1` (`Easy`): Bayesian network factorization, d-separation, Markov blankets, and moralization.

### Undirected Graphical Models / Cliques / Markov Blankets / Factor-Graph Conversion

- `HW1-Q1` (`Easy`): undirected graphical model factorization, conditional independence by graph separation, and Markov blankets.
- `HW1-Q4` (`Easy`): convert between UGMs, DAGs, and factor graphs.
- `M1-Q2` (`Easy`): undirected graphical model local reasoning: Markov blanket, factor-graph conversion, and separation.
- `M1-Q11` (`Hard`): explicit construction of maximal-clique log-potentials from smaller local log-potentials.

### Exact Inference / Belief Propagation / Variable Elimination / Treewidth / Tree Decomposition

- `HW1-Q5` (`Medium`): exact belief propagation on a tree factor graph.
- `HW1-Q6` (`Medium`): variable elimination order and factor growth on trees.
- `HW1-Q8` (`Hard`): exact sampling from an Ising model on a tree via DP / sum-product ideas.
- `M1-Q12` (`Medium`): construct and verify a tree decomposition.
- `HW3-Q3` (`Hard`): loopy belief propagation convergence and non-convergence on a cycle.

### Information Theory / KL / Mutual Information / Metrics / IPMs

- `HW1-Q3` (`Medium`): KL non-metric behavior and covariance vs mutual information.
- `HW4-Q3` (`Easy`): metric properties, KL not being a metric, and when `d_F` is a metric.
- `PF-SQ1` (`Medium`): Gibbs variational principle relaxations and inner vs outer approximations.
- `PF-SQ4` (`Medium`): `KL(q || p)` vs `KL(p || q)`.
- `PF-SQ6` (`Easy`): VI vs MCMC and the role of the ELBO.
- `PF-SQ14` (`Medium`): derivative requirements in Hyvarinen score matching.

### Hardness / Reductions / Computational Complexity

- `HW1-Q9` (`Hard`): partition-function / marginal reduction arguments for Ising inference.

### Markov Chains / MCMC / Gibbs / Metropolis-Hastings / HMC / Tempering

- `HW2-Q1` (`Easy`): MCMC concept checks.
- `HW2-Q2` (`Medium`): rejection-sampling proposal validity.
- `HW2-Q3` (`Easy`): Gibbs sampling for a bivariate Gaussian.
- `HW2-Q4` (`Hard`): finite-chain spectral and conductance analysis.
- `HW2-PROG` (`Hard`): Gibbs, AIS, and tempering on Ising grids.
- `M1-Q3` (`Easy`): irreducibility and aperiodicity for a finite Markov chain.
- `M1-Q4` (`Easy`): MALA concept check.
- `M1-Q5` (`Easy`): Metropolis-Hastings / conductance concept check.
- `M1-Q6` (`Easy`): Gibbs-sampling / ergodicity concept check.
- `M1-Q7` (`Easy`): simulated tempering intuition.
- `M1-Q8` (`Easy`): simulated tempering stationary-distribution intuition.
- `M1-Q9` (`Medium`): systematic-scan Gibbs sampler.
- `M1-Q10` (`Medium`): Metropolis-Hastings independent sampler.
- `PF-SQ5` (`Medium`): HMC and simulated tempering as extended-state chains.
- `PF-SQ6` (`Easy`): VI vs MCMC and the ELBO.

### Mixing Time / Spectral Gap / Conductance / Reversibility / Stationarity

- `HW2-Q4` (`Hard`): spectral mixing bounds, spectral gap, and conductance.
- `M1-Q3` (`Easy`): irreducibility and aperiodicity.
- `M1-Q9` (`Medium`): stationarity and non-reversibility for systematic-scan Gibbs.
- `M1-Q10` (`Medium`): acceptance rule, irreducibility, aperiodicity, and slow mixing.
- `PF-P2` (`Medium`): finite Markov chain graph, aperiodicity, and unique stationary distribution.

### Variational Inference / Mean Field / ELBO / CAVI / Latent-Variable Inference

- `HW3-Q1` (`Medium`): mean-field approximation and non-concavity.
- `HW3-Q4` (`Hard`): Bayesian HMM mean-field CAVI updates.
- `HW3-Q5` (`Medium`): REINFORCE vs reparameterization variance comparison.
- `HW3-PROG` (`Hard`): variational inference / variational EM for LDA.
- `PF-SQ1` (`Medium`): Gibbs variational principle relaxations.
- `PF-SQ4` (`Medium`): `KL(q || p)` vs `KL(p || q)`.
- `PF-SQ6` (`Easy`): VI vs MCMC and the ELBO.
- `PF-SQ9` (`Medium`): when REINFORCE vs reparameterization applies directly.

### Marginal Polytope / Local Polytope / Loopy BP

- `HW3-Q2` (`Hard`): local polytope vs marginal polytope and cycle inequalities.
- `HW3-Q3` (`Hard`): loopy BP convergence and periodic non-convergence.

### HMMs / Sequence Models / Structured Latent Variables

- `HW3-Q4` (`Hard`): Bayesian HMM with Dirichlet priors and latent-state updates.

### VAE Gradient Estimators / REINFORCE vs Reparameterization

- `HW3-Q5` (`Medium`): estimator-variance comparison.
- `PF-SQ9` (`Medium`): direct applicability of REINFORCE vs reparameterization.

### GNNs / Message Passing / Over-Smoothing / Algorithm Simulation On Graphs

- `HW2-Q9` (`Hard`): linear GCN dynamics and oversmoothing.
- `PF-SQ2` (`Easy`): over-smoothing vs over-squashing.
- `PF-P3` (`Medium`): shortest paths as message-passing GNN computation.

### Score Matching / Generalized Score Matching / NCE / Exponential Families

- `HW4-Q1` (`Hard`): exponential families, score matching, and NCE.
- `HW4-PROG` (`Medium`): neural score matching on Gaussian mixtures.
- `PF-SQ8` (`Easy`): NCE noise-distribution choice.
- `PF-SQ14` (`Medium`): Hyvarinen score-matching derivative requirements.
- `PF-P4` (`Hard`): gradient matching vs score matching and generalized score matching.

### GANs / WGAN / Wasserstein / CycleGAN / Generator-Gradient Behavior

- `HW4-Q2` (`Medium`): WGAN trace-form analysis and best-response cycling.
- `PF-SQ3` (`Easy`): standard GAN vs Wasserstein intuition.
- `PF-SQ7` (`Medium`): standard GAN local minima and CycleGAN non-uniqueness.
- `PF-P5` (`Medium`): JS-based GAN vs WGAN on shifted uniforms.

### Diffusion / Score-Based Sampling / Probability-Flow ODE

- `PF-SQ12` (`Easy`): predictor-corrector diffusion sampling.
- `PF-SQ13` (`Easy`): probability-flow ODE uses.

### Causality / Backdoor / Causal Discovery

- `PF-SQ10` (`Medium`): backdoor criterion.
- `PF-SQ11` (`Medium`): PC algorithm identifiability.
