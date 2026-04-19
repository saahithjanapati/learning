# Probabilistic Graphical Models Late-Course Module Map

Date: `2026-03-30`
Mode: `learn`
Coverage: processed late-course lectures currently available in this repo: `Lecture 11/12`, `Lecture 13`, `Lecture 15`, `Lecture 16`, `Lecture 17`, `Lecture 18`, `Lecture 19`, `Lecture 20`, `Lecture 21`, `Lecture 22`, `Lecture 23`, `Lecture 24`, and `Lecture 25`.

## Coverage Note

This module map is based only on lectures that are currently present in `materials/processed/probabilistic-graphical-models/`.

The course numbering is mostly contiguous in the repo right now:
- present: `Lecture_11_advanced_MCMC` (covering Lectures 11-12), `Lecture_13_variational`, `Lecture_15_EM`, `Lecture_16_VAE`, `Lecture_17_GAN`, `Lecture_18_applications`, `Lecture_19_scorematching`, `Lecture_20_NCE`, `Lecture_21_diffusion`, `Lecture_22_introcausal`, `Lecture_23_backdoor`, `Lecture_24_causaldiscovery`, and `Lecture_25_intervention`
- not currently ingested here: `Lecture 14`

## Module 0: Advanced MCMC

Topic path: `topics/probabilistic-graphical-models/mcmc`

Source transcripts:
- [materials/processed/probabilistic-graphical-models/Lecture_11_advanced_MCMC.md](../../../materials/processed/probabilistic-graphical-models/Lecture_11_advanced_MCMC.md)

Focus questions:
- Why do high-dimensional and multimodal targets make basic MCMC hard?
- What changes once you move from simple MH/Gibbs to HMC-style thinking?
- Where do Langevin and temperature ideas start to matter?

## Module 1: Variational Inference and EM

Topic path: `topics/probabilistic-graphical-models/variational-inference-and-em`

Source transcripts:
- [materials/processed/probabilistic-graphical-models/Lecture_13_variational.md](../../../materials/processed/probabilistic-graphical-models/Lecture_13_variational.md)
- [materials/processed/probabilistic-graphical-models/Lecture_15_EM.md](../../../materials/processed/probabilistic-graphical-models/Lecture_15_EM.md)
- [materials/processed/probabilistic-graphical-models/Lecture_16_VAE.md](../../../materials/processed/probabilistic-graphical-models/Lecture_16_VAE.md)

Focus questions:
- How does the Gibbs variational principle turn `log Z` or `log p(x)` into an optimization problem?
- What is the difference between mean-field inner relaxations and local-polytope / Bethe-style outer relaxations?
- How do ELBO, EM, and variational EM fit into one template?
- How do VAEs and BBVI reuse the same inference/optimization ideas in a neural setting?

## Module 2: Generative Adversarial Networks

Topic path: `topics/probabilistic-graphical-models/generative-adversarial-networks`

Source transcripts:
- [materials/processed/probabilistic-graphical-models/Lecture_17_GAN.md](../../../materials/processed/probabilistic-graphical-models/Lecture_17_GAN.md)
- [materials/processed/probabilistic-graphical-models/Lecture_18_applications.md](../../../materials/processed/probabilistic-graphical-models/Lecture_18_applications.md)

Focus questions:
- Why can adversarial training produce sharper samples than likelihood-heavy approaches?
- How do DC-GAN and WGAN differ in what they optimize?
- What changes when GANs are conditioned on labels or paired inputs?

## Module 3: Score Matching, NCE, and Diffusion

Topic path: `topics/probabilistic-graphical-models/score-matching-and-energy-based-models`

Source transcripts:
- [materials/processed/probabilistic-graphical-models/Lecture_19_scorematching.md](../../../materials/processed/probabilistic-graphical-models/Lecture_19_scorematching.md)
- [materials/processed/probabilistic-graphical-models/Lecture_20_NCE.md](../../../materials/processed/probabilistic-graphical-models/Lecture_20_NCE.md)
- [materials/processed/probabilistic-graphical-models/Lecture_21_diffusion.md](../../../materials/processed/probabilistic-graphical-models/Lecture_21_diffusion.md)

Focus questions:
- How does score matching avoid partition-function gradients during training?
- Why do denoising and sliced variants matter in practice?
- How does NCE fit as a likelihood-free training alternative?
- Why is diffusion a natural extension of noise-based generative modeling?
- Why is sampling still a real issue even after score-based training?

## Module 4: Causality and Interventions

Topic path: `topics/probabilistic-graphical-models/directed-graphical-models`

Source transcripts:
- [materials/processed/probabilistic-graphical-models/Lecture_22_introcausal.md](../../../materials/processed/probabilistic-graphical-models/Lecture_22_introcausal.md)
- [materials/processed/probabilistic-graphical-models/Lecture_23_backdoor.md](../../../materials/processed/probabilistic-graphical-models/Lecture_23_backdoor.md)
- [materials/processed/probabilistic-graphical-models/Lecture_24_causaldiscovery.md](../../../materials/processed/probabilistic-graphical-models/Lecture_24_causaldiscovery.md)
- [materials/processed/probabilistic-graphical-models/Lecture_25_intervention.md](../../../materials/processed/probabilistic-graphical-models/Lecture_25_intervention.md)

Focus questions:
- What is an intervention, and how is it different from observational conditioning?
- How do backdoor and frontdoor criteria justify causal effect identification?
- What does do-calculus add beyond graph intuition?
- How do interventions and causal discovery complement one another?

## Suggested Study Order

1. `Lecture_11_advanced_MCMC`
2. `Lecture_13_variational` -> `Lecture_15_EM` -> `Lecture_16_VAE`
3. `Lecture_17_GAN` -> `Lecture_18_applications`
4. `Lecture_19_scorematching` -> `Lecture_20_NCE` -> `Lecture_21_diffusion`
5. `Lecture_22_introcausal` -> `Lecture_23_backdoor` -> `Lecture_24_causaldiscovery` -> `Lecture_25_intervention`

## Use With

- Root overview: [topics/probabilistic-graphical-models/README.md](../README.md)
- Master curriculum: [topics/probabilistic-graphical-models/curriculum/0-to-1-master-plan.md](../curriculum/0-to-1-master-plan.md)
- Catch-up path: [topics/probabilistic-graphical-models/course-catchup/curriculum/0-to-1-plan.md](../course-catchup/curriculum/0-to-1-plan.md)
