# Probabilistic Graphical Models: Slow-Teach Comprehensive Notes

This note is the front door to the full PGM exam-prep set.

The old version of this page treated the section notes mostly like a map.
This new version is for a very different use case:

- you missed class
- a lot of the vocabulary feels foreign
- you do not want compressed “smart person notes”
- you want something you can read straight through like a patient lecture transcript

So the whole note set should now be read with this mindset:

`we are not trying to sound concise or advanced; we are trying to make the ideas click`

Each section now also ends with:

- `Formal Anchors`: the precise statements, identities, and conditions worth knowing rigorously
- `Worked Problems`: fully solved exam-style questions collected in one place

## Table of Contents

- [[#How To Use These Notes]]
- [[#If You Are In Panic Mode]]
- [[#What These Notes Are Trying To Do]]
- [[#Reading Order]]
- [[#Section Map]]
- [[#Companion Pages]]
- [[#Assessment-Tuned Sources]]

## How To Use These Notes

If you have not been going to class, the biggest mistake is trying to memorize isolated formulas before you know what problem each formula is solving.

So for each section, use this order:

1. read the opening “big picture” and slow explanation
2. make sure you can say in plain English what the section is about
3. only then worry about the formulas
4. then do the section's `Worked Problems`
5. only after that, move on

When you get stuck, do **not** immediately say “I am bad at this.”
Instead ask:

- what is the object here?
- what is the question?
- what is the graph buying me?
- what is the algorithm or theorem trying to compute?

Those four questions rescue a surprising amount of confusion.

## If You Are In Panic Mode

If the exam is close and you need the highest-value reading order, do this:

1. Section 1 to understand what a graphical model even is
2. Section 2 to learn directed vs undirected models and the basic independence language
3. Section 3 because inference, elimination, treewidth, and BP are central
4. Section 5 and Section 6 because MCMC and VI are major algorithmic themes
5. Section 7 and Section 8 because late-course topics often show up as conceptual questions
6. Section 4 last, unless your practice material suggests GNNs are emphasized

If you are *really* short on time:

- Section 2
- Section 3
- Section 5
- Section 6
- skim Section 7
- skim Section 8

## What These Notes Are Trying To Do

These notes are trying to teach three things at once:

### 1. What object the course is studying

The object is almost always a probability distribution over many variables.

### 2. Why the graph matters

The graph is there because the full distribution is too hard to store or compute with directly.

### 3. What the computational game is

Once the model is written down, the course keeps returning to the same questions:

- represent the distribution compactly
- compute marginals / MAP / partition functions / causal effects
- learn parameters
- approximate when exact computation is impossible

So if a section ever feels abstract, come back to this:

`representation -> inference -> approximation -> learning`

That is most of the class.

## Reading Order

### Section 1. Foundations

Read this if you need the answer to:
what is a graphical model, and why are we doing any of this?

[[2026-04-20-pgm-exam-prep-section-01-foundations]]

### Section 2. Directed and Undirected Graphical Models

Read this if terms like DAG, collider, partition function, clique, and Markov blanket still feel slippery.

[[2026-04-20-pgm-exam-prep-section-02-directed-undirected]]

### Section 3. Exact Inference and Belief Propagation

Read this if you need to understand what exact inference is really accomplishing, and why tree structure matters so much.

[[2026-04-20-pgm-exam-prep-section-03-inference-bp]]

### Section 4. GNNs and the PGM Connection

Read this if you want the message-passing bridge from classical PGMs to modern graph learning.

[[2026-04-20-pgm-exam-prep-section-04-gnns]]

### Section 5. MCMC and Sampling

Read this if terms like stationary distribution, detailed balance, MH, Gibbs, HMC, and tempering still feel like disconnected vocabulary words.

[[2026-04-20-pgm-exam-prep-section-05-mcmc]]

### Section 6. Variational Inference, EM, and VAEs

Read this if ELBO, KL direction, mean-field, EM, and VAE training still feel abstract.

[[2026-04-20-pgm-exam-prep-section-06-vi-em-vae]]

### Section 7. GANs, Score Matching, NCE, and Diffusion

Read this if the late generative-model material feels like a blur of objective functions.

[[2026-04-20-pgm-exam-prep-section-07-generative-models]]

### Section 8. Causality and Discovery

Read this if you want a slower explanation of intervention, backdoor, front-door, PC, and what can or cannot be learned from observational data.

[[2026-04-20-pgm-exam-prep-section-08-causality]]

## Section Map

### 1. Foundations and Why Graphical Models Exist

- Main lectures: `Lecture 1`
- Main job of the section:
  explain the basic problem of representing and computing with a large joint distribution

### 2. Directed and Undirected Graphical Models

- Main lectures: `Lecture 2`, `Lecture 3/4`
- Main job of the section:
  teach the two major representation families and the independence language attached to them

### 3. Exact Inference and Belief Propagation

- Main lectures: `Lecture 5`, `Lecture 6/7`
- Main job of the section:
  explain when exact inference is possible and why trees are special

### 4. GNNs, Message Passing, and the PGM Connection

- Main lectures: `Lecture 8`
- Main job of the section:
  compare probabilistic message passing to learned neural message passing

### 5. MCMC and Advanced Sampling

- Main lectures: `Lecture 9`, `Lecture 11`
- Main job of the section:
  explain the sampling-based answer to hard inference

### 6. Variational Inference, EM, and VAEs

- Main lectures: `Lecture 13`, `Lecture 15`, `Lecture 16`
- Main job of the section:
  explain the optimization-based answer to hard inference

### 7. GANs, Score Matching, NCE, and Diffusion

- Main lectures: `Lecture 17`, `Lecture 19`, `Lecture 20`, `Lecture 21`
- Main job of the section:
  explain several different ways to build generative models when exact likelihood is awkward

### 8. Causality, Interventions, and Discovery

- Main lectures: `Lecture 22`, `Lecture 23`, `Lecture 24`, `Lecture 25`
- Main job of the section:
  move from observational probabilistic questions to intervention and discovery questions

## Companion Pages

For every section, the companion material plays a different role:

- `section notes`: the main slow-teach document
- `worked problems`: slower examples with full explanations
- `practice problems`: unsolved questions for active recall
- `practice answer key`: concise target answers
- `memory sheet`: short last-pass memorization aid

### Section 1

- [[2026-04-20-pgm-exam-prep-section-01-foundations]]
- [[2026-04-20-pgm-worked-problems-section-01-foundations|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-01-foundations|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-01-foundations-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-01-foundations|Memory Sheet]]

### Section 2

- [[2026-04-20-pgm-exam-prep-section-02-directed-undirected]]
- [[2026-04-20-pgm-worked-problems-section-02-directed-undirected|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-02-directed-undirected|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-02-directed-undirected-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-02-directed-undirected|Memory Sheet]]

### Section 3

- [[2026-04-20-pgm-exam-prep-section-03-inference-bp]]
- [[2026-04-20-pgm-worked-problems-section-03-inference-bp|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-03-inference-bp|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-03-inference-bp-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-03-inference-bp|Memory Sheet]]

### Section 4

- [[2026-04-20-pgm-exam-prep-section-04-gnns]]
- [[2026-04-20-pgm-worked-problems-section-04-gnns|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-04-gnns|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-04-gnns-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-04-gnns|Memory Sheet]]

### Section 5

- [[2026-04-20-pgm-exam-prep-section-05-mcmc]]
- [[2026-04-20-pgm-worked-problems-section-05-mcmc|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-05-mcmc|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-05-mcmc-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-05-mcmc|Memory Sheet]]

### Section 6

- [[2026-04-20-pgm-exam-prep-section-06-vi-em-vae]]
- [[2026-04-20-pgm-worked-problems-section-06-vi-em-vae|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-06-vi-em-vae|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-06-vi-em-vae-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-06-vi-em-vae|Memory Sheet]]

### Section 7

- [[2026-04-20-pgm-exam-prep-section-07-generative-models]]
- [[2026-04-20-pgm-worked-problems-section-07-generative-models|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-07-generative-models|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-07-generative-models-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-07-generative-models|Memory Sheet]]

### Section 8

- [[2026-04-20-pgm-exam-prep-section-08-causality]]
- [[2026-04-20-pgm-worked-problems-section-08-causality|Worked Problems]]
- [[2026-04-20-pgm-practice-problems-section-08-causality|Practice Problems]]
- [[2026-04-20-pgm-practice-problems-section-08-causality-answer-key|Practice Answer Key]]
- [[2026-04-20-pgm-memory-08-causality|Memory Sheet]]

## Assessment-Tuned Sources

These were especially useful for shaping the note emphasis:

- [Practice exam solutions](../../../materials/processed/probabilistic-graphical-models/Practice_Exam_Solutions.md)
- [Midterm 1 graded submission](../../../materials/processed/probabilistic-graphical-models/Midterm_1_graded_submission.md)
- [HW3 graded submission](../../../materials/processed/probabilistic-graphical-models/HW3_graded_submission.md)
- [HW4 prompt](../../../materials/processed/probabilistic-graphical-models/HW4_prompt.md)
- [HW4 recitation on beyond-likelihood methods](../../../materials/processed/probabilistic-graphical-models/HW4_recitation_beyond_likelihood.md)
- [Course recap review deck](../../../materials/processed/probabilistic-graphical-models/Course_recap_review.md)
