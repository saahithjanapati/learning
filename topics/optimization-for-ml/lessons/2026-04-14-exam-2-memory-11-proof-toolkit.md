# Proof Toolkit Memory Sheet

Use with [[2026-04-14-exam-2-section-11-proof-toolkit]].

## Table of Contents

- [[#Reusable Proof Moves]]
- [[#Named Templates]]
- [[#High-Value Statements To Memorize]]
- [[#Exam Strategy]]


## Reusable Proof Moves
- Expand a squared norm.
- Take conditional expectation, then remove conditioning with the tower property.
- Use convexity or strong convexity to replace inner products by function-value differences.
- Use smoothness to upper-bound function change.
- Use convexity to move from average of function values to function value at the average.
- Telescope sums whenever you see a one-step recursion.

## Named Templates
- Smooth GD proof:
  - descent lemma
  - convexity inner-product bound
  - distance recursion
  - telescope
- SGD proof:
  - distance recursion
  - conditional expectation
  - unbiasedness / stochastic subgradient
  - convexity on the inner-product term
  - average iterate
- Prox-GD proof:
  - smoothness on $g$
  - prox optimality / convexity on $h$
  - combine and rewrite in terms of $G_\eta(x)$
- LP dual derivation:
  - write Lagrangian
  - isolate the $x$-dependent linear term
  - decide when the infimum is finite
- SDP weak duality:
  - subtract objectives
  - rewrite as $S\bullet X$
  - use PSD inner-product nonnegativity
- Newton descent:
  - write the Newton step
  - take inner product with the gradient
  - use positive definiteness of the inverse Hessian

## High-Value Statements To Memorize
- Convexity: $f(y)\ge f(x)+\nabla f(x)^T(y-x)$.
- Strong convexity: add $\frac{\alpha}{2}\|y-x\|^2$ to the right-hand side.
- Smoothness: $f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac{\beta}{2}\|y-x\|^2$.
- Subgradient inequality: $f(y)\ge f(x)+g^T(y-x)$ for $g\in\partial f(x)$.

## Exam Strategy
- Name what theorem or inequality you are using.
- Keep proof lines short and justified.
- State the quantity being bounded.
- Avoid jumping from recursion to final rate without the summation/telescoping step.
