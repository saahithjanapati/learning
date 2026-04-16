# Proof Toolkit Memory Sheet

Use with [[2026-04-14-exam-2-section-11-proof-toolkit]].

## Table of Contents

- [[#Reusable Proof Moves]]
- [[#High-Value Statements To Memorize]]
- [[#Exam Strategy]]


## Reusable Proof Moves
- Expand a squared norm.
- Take conditional expectation, then remove conditioning with the tower property.
- Use convexity or strong convexity to replace inner products by function-value differences.
- Use smoothness to upper-bound function change.
- Use convexity to move from average of function values to function value at the average.
- Telescope sums whenever you see a one-step recursion.

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
