# Newton Method Memory Sheet

Use with [[2026-04-14-exam-2-section-06-newton]].

## Table of Contents

- [[#Core Update]]
- [[#Key Facts]]
- [[#Damped Newton]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]


## Core Update
- Root finding:
$$
x_{k+1}=x_k-\frac{\phi(x_k)}{\phi'(x_k)}.
$$
- Minimization applies Newton to $\nabla f(x)=0$:
$$
x_{k+1}=x_k-[\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$

## Key Facts
- Newton is a local method.
- If the Hessian is positive definite, the Newton step is a descent direction.
- Near the solution, Newton can converge quadratically.
- Away from the solution, it may diverge; damped Newton/backtracking helps.

## Damped Newton
$$
x_{k+1}=x_k-h_k[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),\qquad 0<h_k\le 1.
$$

## What To Memorize
- Newton for minimization is based on $\nabla f(x)=0$, not directly on $f(x)=0$.
- Positive-definite Hessian implies descent direction.
- Local rate: quadratic near the optimum.

## Likely Exam Traps
- Confusing root-finding Newton with minimization Newton.
- Forgetting the Hessian inverse.
- Claiming Newton is globally convergent without damping.
