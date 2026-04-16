# Advanced Optimizers Memory Sheet

Use with [[2026-04-14-exam-2-section-10-advanced-optimizers]].

## Table of Contents

- [[#Shampoo]]
- [[#SOAP]]
- [[#AdaNGD]]
- [[#Muon / AdamW Theme]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]


## Shampoo
- Structured preconditioner for matrix / tensor parameters.
- Uses left and right second-moment matrices.
- Update shape:
$$
W_{t+1}=W_t-\eta L_t^{-1/4}G_tR_t^{-1/4}.
$$

## SOAP
- Refinement of Shampoo.
- Introduces Adam-style adaptation in the eigenbasis of the preconditioner.

## AdaNGD
- Normalized adaptive method.
- Links online adaptive regret ideas to offline convergence guarantees.

## Muon / AdamW Theme
- Lecture emphasis is not just formulas, but why different normalization / preconditioning ideas change the update geometry.
- AdamW: decoupled weight decay.

## What To Memorize
- Shampoo is structured preconditioning.
- SOAP adds adaptive scaling in the preconditioner eigenbasis.
- AdaNGD is about normalized adaptive updates with regret-style motivation.
- AdamW separates shrinkage from adaptive scaling.

## Likely Exam Traps
- Mixing up structured preconditioning with coordinate-wise adaptation.
- Forgetting that the main conceptual point is geometry of the update, not memorizing every implementation detail.
