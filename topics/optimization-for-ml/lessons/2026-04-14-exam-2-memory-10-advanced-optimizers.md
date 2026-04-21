# Advanced Optimizers Memory Sheet

Use with [[2026-04-14-exam-2-section-10-advanced-optimizers]].

## Table of Contents

- [[#Shampoo]]
- [[#SOAP]]
- [[#AdaNGD]]
- [[#Central Theme]]
- [[#Muon / AdamW Theme]]
- [[#What Each Method Changes]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]

## Central Theme
- The late-course optimizers are mostly about geometry of the update.
- The key words are:
  - preconditioning
  - normalization
  - structured adaptation
  - decoupling shrinkage from gradient scaling
- So the exam value of this topic is mostly conceptual comparison, not memorizing every implementation detail.


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

## What Each Method Changes
- Shampoo:
  - uses structured left/right preconditioners for matrix parameters
  - think “structured AdaGrad”
- SOAP:
  - keep Shampoo’s geometry
  - add more Adam-like adaptivity in the preconditioner eigenbasis
- AdaNGD:
  - normalize by gradient-scale information
  - reduce manual sensitivity to unknown smoothness / scale
- AdamW:
  - keep Adam-style adaptive update
  - decouple the weight-decay shrinkage from that adaptive scaling
- Muon:
  - late-lecture high-level geometry-aware optimizer theme, not a formula-heavy exam topic here

## What To Memorize
- Shampoo is structured preconditioning.
- SOAP adds adaptive scaling in the preconditioner eigenbasis.
- AdaNGD is about normalized adaptive updates with regret-style motivation.
- AdamW separates shrinkage from adaptive scaling.
- Preconditioning means reshaping the gradient direction by geometry, not just shrinking the scalar step size.

## Likely Exam Traps
- Mixing up structured preconditioning with coordinate-wise adaptation.
- Forgetting that the main conceptual point is geometry of the update, not memorizing every implementation detail.
