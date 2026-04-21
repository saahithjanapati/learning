# Newton Method Memory Sheet

Use with [[2026-04-14-exam-2-section-06-newton]].

## Table of Contents

- [[#Core Update]]
- [[#Key Facts]]
- [[#Descent Direction Check]]
- [[#Damped Newton]]
- [[#Local Convergence Conditions]]
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

## Descent Direction Check
- Newton step:
$$
\Delta x_{\mathrm{nt}} = -[\nabla^2 f(x_k)]^{-1}\nabla f(x_k).
$$
- If $\nabla^2 f(x_k)\succ 0$, then its inverse is also positive definite.
- Compute the inner product:
$$
\nabla f(x_k)^T \Delta x_{\mathrm{nt}}
=
-\nabla f(x_k)^T[\nabla^2 f(x_k)]^{-1}\nabla f(x_k)
<0
$$
whenever $\nabla f(x_k)\neq 0$.
- This is the proof-style fact to write if asked why the Newton step is a descent direction.

## Damped Newton
$$
x_{k+1}=x_k-h_k[\nabla^2 f(x_k)]^{-1}\nabla f(x_k),\qquad 0<h_k\le 1.
$$

## Local Convergence Conditions
- Quadratic convergence is a local theorem, not a global one.
- The usual picture is:
  - Hessian invertible / positive definite near $x^*$
  - Hessian sufficiently regular near $x^*$
  - start close enough to the solution
- Then the error behaves like
$$
\|x_{k+1}-x^*\| \lesssim C\|x_k-x^*\|^2.
$$

## What To Memorize
- Newton for minimization is based on $\nabla f(x)=0$, not directly on $f(x)=0$.
- Positive-definite Hessian implies descent direction.
- Local rate: quadratic near the optimum.
- Damping/backtracking is what makes the method more robust away from the local regime.

## Likely Exam Traps
- Confusing root-finding Newton with minimization Newton.
- Forgetting the Hessian inverse.
- Claiming Newton is globally convergent without damping.
