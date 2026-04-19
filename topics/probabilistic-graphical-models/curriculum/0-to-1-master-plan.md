# Probabilistic Graphical Models: 0 -> 1 Master Curriculum

Topic path: `topics/probabilistic-graphical-models`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Topic locator: [topics/probabilistic-graphical-models/curriculum/0-to-1-master-plan.md](0-to-1-master-plan.md)
- Transcript links: see source sections in this curriculum.

## Starting Assumption

You are near 0 familiarity and need a full catch-up path from basics.

## Transcript Coverage Map

- `Lecture_1_intro.md`: course framing, probability/inference toolkit, approximate-inference motivation.
- `Lecture_2_directed.md`: Bayesian networks, DAG factorization, CPT structure, independence assumptions.
- `Lecture_3_4_undirected.md`: MRFs, potentials, partition function, Hammersley-Clifford, moralization bridge.
- `Lecture_5_inference.md` and `Lecture_6_7_beliefprop.md`: exact inference complexity, variable elimination, sum-product and max-product BP.
- `Lecture_8_GNNs.md`: graph message passing, GNN layer decomposition, expressivity limits, links to PGM intuition.
- `Lecture_9_MCMC_intro.md`: Markov chains, MH/Gibbs mechanics, stationary-distribution targeting.
- `Lecture_11_advanced_MCMC.md`: advanced MCMC for high dimensions, multimodality, Langevin-style intuition, and HMC follow-on material.
- `Lecture_13_variational.md`: Gibbs variational principle, mean-field/CAVI, local-polytope outer relaxations, Bethe free energy, loopy-BP connection.
- `Lecture_15_EM.md`: ELBO, posterior approximation, EM vs variational inference, Gaussian-mixture updates, LDA-style variational EM.
- `Lecture_16_VAE.md`: variational autoencoders, reparameterization trick, and BBVI.
- `Lecture_17_GAN.md` and `Lecture_18_applications.md`: adversarial training, JS/Wasserstein viewpoints, GAN pathologies, conditional GANs, and image-generation applications.
- `Lecture_19_scorematching.md`: score matching, denoising score matching, and Langevin-style sampling for EBMs.
- `Lecture_20_NCE.md`, `Lecture_21_diffusion.md`, `Lecture_22_introcausal.md`, `Lecture_23_backdoor.md`, `Lecture_24_causaldiscovery.md`, and `Lecture_25_intervention.md`: NCE, diffusion-model overview, and the course's causality sequence from introductory interventions to backdoor/frontdoor/do-calculus and structure learning.

Current late-course processed coverage is now mostly contiguous, with the remaining gap at `Lecture 14`.

## 0 -> 1 Definition

By the end, you should be able to:
- read and construct directed/undirected graphical models,
- derive conditional independencies and factorization structure,
- run core inference ideas (exact + message passing intuition),
- explain when and why MCMC is used,
- explain ELBO-style and Bethe-style variational approximations at a high level,
- describe EM / variational EM as alternating inference-learning procedures,
- contrast likelihood, adversarial, and score-matching training viewpoints,
- connect message passing intuition to GNN-style computations.

## Phase Plan

1. Phase A: Probability and notation refresh (2 sessions)
- conditional probability, Bayes rule, expectation basics, factorization notation

2. Phase B: Directed graphical models (2 sessions)
- Bayesian networks, local conditionals, causal/conditional structure intuition

3. Phase C: Undirected graphical models (2 sessions)
- MRFs, potentials, partition function, energy-based perspective

4. Phase D: Inference foundations (2 sessions)
- exact inference framing, elimination-style reasoning, tractability limits

5. Phase E: Belief propagation (2 sessions)
- message update intuition, trees vs loopy settings, practical caveats

6. Phase F: GNN bridge (1 session)
- graph message passing as a modern neural counterpart to local computation on graphs

7. Phase G: Sampling with MCMC (2 sessions)
- why sampling, Markov chain intuition, basic algorithm flow and diagnostics

8. Phase H: Variational inference and EM (3 sessions)
- variational principle, ELBO, mean-field / Bethe intuition, EM-style alternating updates

9. Phase I: Adversarial generative modeling (2 sessions)
- GAN game, discriminator-distance viewpoint, conditioning, evaluation, and failures

10. Phase J: Score matching and EBMs (2 sessions)
- score-based training objectives, denoising variants, and Langevin-style generation

## Session Style Ramp

- Early (A-B): 75% exposition, 25% guided questions
- Middle (C-E): 50% exposition, 50% practice
- Late (F-J): 35% exposition, 65% practice

## Assessment Gates

- Gate 1: write and explain a valid factorization for a small graph
- Gate 2: identify key conditional independence statements from structure
- Gate 3: explain exact inference complexity bottlenecks in plain language
- Gate 4: execute small-message-passing examples and sanity-check outputs
- Gate 5: explain MCMC motivation and failure modes at a high level
- Gate 6: derive the ELBO decomposition and explain EM vs variational EM
- Gate 7: compare GAN and score-matching training objectives without mixing them up
- Gate 8: explain how learned scores are converted into samples via Langevin updates
