# Advanced Machine Learning - 10-715 (CMU) 0 -> 1 Curriculum

Topic Path: `topics/advanced-machine-learning-10-715-cmu`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Raw source manifest: `materials/archive/advanced-machine-learning-10-715-cmu/source-manifest.json`
- Ingest report: materials/processed/advanced-machine-learning-10-715-cmu/_INGEST_REPORT.md
- Public course reference: `https://www.cs.cmu.edu/~nihars/teaching/10715Fa25.html`
- CMU course comparison reference: `https://ml.cmu.edu/academics/ml-intro-classes`

## Source Materials

- `materials/processed/advanced-machine-learning-10-715-cmu/_piazza_resources_manifest.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/_gradescope_dashboard.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-02-intro to intro to ML.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-03-perceptrons.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-04-linear SVMs.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-05-kernel methods.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-10-learning theory 1.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-11-learning theory 2.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-12-learning theory 3.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-13-learning theory 4.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-14-learning theory 5 and bias complexity.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-15-NeuralNetworks.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-16-MAB and RL.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-17-RL2 and graphical models 1.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-18-RL policy_gradient methods.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-19-graphical models 2.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-20-100_Intro_to_Denoising_Diffusion_1.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-22-110_Ornstein-Uhlenbeck_process_1.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-24-115_Reverse_diffusion_1.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-26-130_ESM_DSM_2.md`
- `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-32-150_ScoreApprox_2_DistributionEstimation.md`

## Course Identity

10-715 is the fast, proof-heavy PhD-level introduction to machine learning. The public Fall 2025 course page describes it as a class for students whose primary field is machine learning or whose research will depend on methodological ML. CMU's course comparison page describes 10-715 as the fastest-paced and most mathematical intro ML course, intended to prepare students to read and write research papers in machine learning.

The curriculum below treats 10-715 as a bridge from "I know math and programming" to "I can reason about ML algorithms at research-paper depth."

## Target Outcome

By the end, the learner should be able to:

- explain supervised learning through the formal objects of data, hypothesis class, loss, risk, and empirical risk;
- prove basic algorithmic guarantees, not just apply algorithms;
- derive perceptron, hard/soft SVM, kernel, and representer-theorem results at a whiteboard;
- use concentration and uniform-convergence ideas to explain generalization;
- connect neural-network representation and optimization behavior to older linear/kernel methods;
- explain the basic mathematical structure of bandits, reinforcement learning, graphical models, and causal graphical thinking;
- understand score matching and diffusion models well enough to read the assigned papers with a map.

## Prerequisites

- Linear algebra: subspaces, projections, eigenvalues, SVD, positive semidefinite matrices.
- Probability: conditional probability, expectation, variance, multivariate Gaussians, concentration basics.
- Calculus: gradients, Jacobians, constrained optimization, matrix calculus fluency.
- Optimization: convexity, Lagrangians, KKT conditions, gradient-based methods.
- Programming: Python fluency sufficient for ML experiments and homework implementation.
- Proof habits: comfort with inequalities, induction, contradiction, and translating informal statements into quantified claims.

## Module 0: Orientation And Mathematical Setup

Objective: Establish the course grammar: examples, labels, hypothesis classes, losses, risk, empirical risk, and generalization.

Core sources:

- `lecture-notes-01-Logistics.md`
- `lecture-notes-02-intro to intro to ML.md`
- public Fall 2025 course page

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-course-roadmap.md`
- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-supervised-learning-erm.md`

Exit check:

- Define $\mathcal{X}$, $\mathcal{Y}$, $\mathcal{H}$, $\ell$, risk, and empirical risk for both binary classification and regression.
- Explain why empirical risk is observable while true risk is not.

## Module 1: Linear Classification, Perceptrons, SVMs, And Kernels

Objective: Learn the first core pattern of the course: algorithm, geometric intuition, optimization formulation, and proof guarantee.

Core sources:

- `lecture-notes-03-perceptrons.md`
- `lecture-notes-04-linear SVMs.md`
- `lecture-notes-05-kernel methods.md`
- `lecture-notes-07-proofs of representer and mercer theorems.md`
- `recitations-01-Opti_Recitation.md`

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-linear-classifiers-svm-kernels.md`
- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-perceptron-margin-geometry.md`
- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-svm-duality-kernels.md`

Exit check:

- Prove the perceptron mistake bound from the two standard lemmas.
- Derive hard-margin SVM from the maximum-margin geometry.
- Explain why support vectors are the only training points that appear in the dual solution.
- State why kernels let linear methods act nonlinear in the original input space.

## Module 2: Learning Theory And Generalization

Objective: Move from "algorithm fits training data" to "algorithm should work on new data."

Core sources:

- `lecture-notes-10-learning theory 1.md`
- `lecture-notes-11-learning theory 2.md`
- `lecture-notes-12-learning theory 3.md`
- `lecture-notes-13-learning theory 4.md`
- `lecture-notes-14-learning theory 5 and bias complexity.md`
- `recitations-04-Recitation_3_Tail_Bounds.md`

Content targets:

- tail bounds and concentration,
- finite-class uniform convergence,
- VC dimension and shattering,
- Sauer's lemma and no-free-lunch reasoning,
- bias-complexity tradeoff,
- capacity control,
- train/test gap reasoning,
- proof templates for generalization statements.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-pac-learning-finite-classes.md`
- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-vc-dimension-sauer-no-free-lunch.md`
- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-concentration-generalization-proof-patterns.md`

Exit check:

- Given a finite hypothesis class, sketch a union-bound generalization proof.
- Explain the difference between low training error, low test error, and a theorem that relates them.

## Module 3: Neural Networks And Modern Function Classes

Objective: Understand neural networks as expressive hypothesis classes and connect them to earlier themes: representation, optimization, and generalization.

Core sources:

- `lecture-notes-06-neural networks 1.md`
- `lecture-notes-15-NeuralNetworks.md`

Content targets:

- multilayer perceptrons,
- nonlinear representation learning,
- representation power,
- CNN and residual-network motifs,
- model selection,
- interpolation-regime intuition,
- where classical theory strains under modern practice.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-neural-networks-function-classes.md`

Exit check:

- Explain why XOR defeats a single linear perceptron but not a small neural network.
- Separate representation questions from optimization and generalization questions.

## Module 4: Bandits, Reinforcement Learning, And Sequential Decisions

Objective: Shift from supervised prediction to learning through sequential interaction and feedback.

Core sources:

- `lecture-notes-16-MAB and RL.md`
- `lecture-notes-17-RL2 and graphical models 1.md`
- `lecture-notes-18-RL policy_gradient methods.md`

Content targets:

- exploration vs exploitation,
- regret,
- Markov decision processes,
- Bellman backups,
- Q-learning,
- value functions and policies,
- policy-gradient intuition,
- the difference between supervised labels and reward feedback.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-bandits-mdps-rl.md`

Exit check:

- Explain why bandits are not just classification with delayed labels.
- Compare value-based and policy-gradient ways of thinking.

## Module 5: Graphical Models And Causality

Objective: Learn the probabilistic-structure language that appears in ML systems, causal reasoning, and later advanced courses.

Core sources:

- `lecture-notes-17-RL2 and graphical models 1.md`
- `lecture-notes-19-graphical models 2.md`

Content targets:

- variables as nodes,
- conditional independence,
- directed graphical models,
- undirected graphical models,
- clique potentials,
- inference vs learning,
- causal graph intuition and caution.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-graphical-models-directed-undirected.md`

Exit check:

- Read a small directed graph and state conditional-independence claims.
- Explain why association is not automatically causation.

## Module 6: Diffusion, Score Matching, And Generative Modeling

Objective: Use the late-course diffusion block as a capstone in mathematical ML reading.

Core sources:

- `lecture-notes-20-100_Intro_to_Denoising_Diffusion_1.md`
- `lecture-notes-22-110_Ornstein-Uhlenbeck_process_1.md`
- `lecture-notes-24-115_Reverse_diffusion_1.md`
- `lecture-notes-26-130_ESM_DSM_2.md`
- `lecture-notes-28-140_ScroreApprox_with_ReLU.md`
- `lecture-notes-30-135_summary.md`
- `lecture-notes-32-150_ScoreApprox_2_DistributionEstimation.md`
- relevant score-matching and diffusion papers in the processed source folder

Content targets:

- score functions,
- exact score matching,
- denoising score matching,
- forward noising and reverse denoising,
- diffusion as distribution estimation,
- how paper assumptions connect to course theory.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-diffusion-score-matching.md`

Exit check:

- Explain the difference between modeling data density directly and modeling its score.
- Describe the forward and reverse sides of a diffusion process.

## Module 7: Homework, Exam, And Research-Reading Loop

Objective: Convert passive lesson reading into proof fluency and exam resilience.

Core sources:

- homework handouts and solutions,
- previous-year midterms and finals,
- available graded copies in the processed source folder.

Cadence:

- After each content module, solve at least two representative homework/exam problems.
- For every missed proof, write a two-part correction: the false move and the reusable proof pattern.
- Use prior exams only after the concept lesson is complete, not as the first exposure.

Lessons:

- `topics/advanced-machine-learning-10-715-cmu/lessons/2026-05-03-10-715-homework-exam-proof-loop.md`

Exit check:

- Complete one timed mixed set covering linear classifiers, generalization, and one modern topic.
- Write a one-page "research reading memo" for one assigned diffusion or score-matching paper.

## Session Cadence

- Session length: 60-90 minutes.
- Sessions per week: 3-4 for catch-up; 2 for maintenance.
- Practice ratio progression:
  - early: 60% exposition, 40% proof/coding practice;
  - middle: 40% exposition, 60% proof/problem practice;
  - late: 20% review, 80% timed mixed problems and paper reading.

## Assessment Plan

- Quick checks: definitions, algorithm steps, theorem statements, one-line intuitions.
- Medium practice: proof sketches, derivations, short coding experiments.
- Capstone task: solve a mixed exam-style set and write a research memo connecting one late-course paper to the lecture path.
