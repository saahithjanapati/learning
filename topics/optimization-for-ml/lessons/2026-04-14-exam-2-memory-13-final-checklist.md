# Final Checklist Memory Sheet

Use with [[2026-04-14-exam-2-section-13-final-checklist]].

## Table of Contents

- [[#Before The Exam]]
- [[#High-Risk Precision Items]]
- [[#One Sentence Per Topic]]
- [[#Last-Minute Recalls]]


## Before The Exam
- Be able to state every major theorem with the correct quantity and rate.
- Know the sign conventions in LP duality and SDP duality.
- Know the full KKT system from memory.
- Know what changes in nonconvex KKT: candidate points first, classification second.
- Know the Newton minimization update from memory.
- Know the whitening condition $E[zz^T]=I$ from memory.
- Know the difference between Polyak, NAG, Adam, and AdamW.

## High-Risk Precision Items
- Quantity vs rate in convergence statements.
- Fixed-step SGD has an error floor.
- Dual function finite iff coefficient of $x$ vanishes.
- Complementary slackness is not the same as active constraint implies positive multiplier.
- Schur complement needs the right invertibility assumption.
- Weight decay and $L_2$ regularization are not the same in adaptive methods.

## One Sentence Per Topic
- SGD: cheap noisy gradients, so proofs use expectations and averaged quantities.
- Proximal gradient: replace the ordinary gradient by the gradient mapping and use prox optimality.
- Duality: the dual is the best lower bound obtainable from the Lagrangian.
- KKT: primal feasibility, dual feasibility, complementary slackness, stationarity; in nonconvex problems it gives candidates, not certificates.
- SDP: weak duality is the PSD inner-product identity, and Schur complement is the quick PSD test / modeling shortcut.
- Newton: positive-definite Hessian gives a descent direction and local quadratic convergence.
- ICA: whitening removes second-order correlation; FastICA uses a fixed-point stationarity update plus orthogonalization for multiple components.
- NAG: same momentum idea as Polyak, but the gradient is evaluated at the look-ahead point.
- Adaptive methods: they change gradient geometry, not just scalar step size.
- Advanced optimizers: preconditioning and decoupling are the big conceptual themes.

## Last-Minute Recalls
- Subgradient inequality.
- Smoothness inequality.
- Strong convexity inequality.
- PSD inner-product fact.
- Tower property for conditional expectation.
- Telescoping sum pattern.
