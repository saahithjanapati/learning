# Optimization Quiz 2 Problem Set 01 (Through Feb 17)

Date: 2026-02-17  
Scope: Jan 29, Feb 3, Feb 5, Feb 10, Feb 12, Feb 17  
Mode: Practice (thorough coverage, no SGD)

## How To Use This Set

1. Try in order from top to bottom.
2. Write complete steps for derivations, not just final answers.
3. Mark each item as `easy`, `medium`, or `hard` after attempting.
4. If you get stuck, write your best partial attempt and move on.

## A) Jan 29: Gradient Descent Fundamentals

1. Write the GD update for a differentiable objective $f(x)$.
	1. x_{t+1} = x_t - eta * grad(f(x_t))

---
2. For $f(x)=\tfrac12 x^2$, derive the 1D GD update $x_{t+1}$ in terms of $x_t$ and $\eta$.
	1. grad_f(x) = x
	2. x_{t+1} = x_t - eta * x_t = (1-eta) * x_t
---
3. Let $x_0=8$, $\eta=0.25$, $f(x)=\tfrac12x^2$. Compute:
- $x_1, x_2, x_3$
	- grad_f(x) = x
	- x_0 = 8
	- x_1 = 8 - (0.25)(8) = 8 - 2 = 6
	- x_2 = 6 - 0.25(6) = 6 - 3/2 = 9/2
	- x_3 = (1-0.25)(9/2) = (3/4)(9/2) = 27/8

- $f(x_0), f(x_1), f(x_2), f(x_3)$
	- x_0 = 32
	- x_1 = 18
	- x_2 = 1/2 * (81/4) = 81/8
	- x_3 = 27/8 * 27/16 * 0.5 = 5.6953125
---
1. For $f(x)=\tfrac12x^2$, describe qualitatively what happens for:
the update is x_{t+1} = (1-eta)x_t

- $0<\eta<2$
	- 0 < n < 1
		- 
	- 1 < n < 2
		- oscillates, but keeps reducing every time
- $\eta=2$
	- the 1-eta term always is qual to -1, so it just flips from -x_t,x_t every time
- $\eta>2$
	- we consistently take steps in opposite dir of gradient because 1-eta



1. Consider $f(x_1,x_2)=\tfrac12(x_1^2+9x_2^2)$.  
Compute $\nabla f(x_1,x_2)$, then compute one GD step from $x_0=(3,2)$ with $\eta=0.1$.
	(2x_1, 18x_2)*0.5 = x_1, 9x_2
		grad_val = (3, 18)
		 (3,2) - 0.1(3, 18) = 3-0.3, 2 - 1.8 = (2.7, 0.2)

## B) Feb 3: Proofs of GD Convergence Rates

6. State the $L$-smooth inequality for $f(y)$ around $x$.
	1. f(y) <= f(x) + grad_f(x)^T (y-x) + L/2 || y-x ||^2


7. Starting from $x_{t+1}=x_t-\eta\nabla f(x_t)$, plug this into the smoothness inequality and derive:
$$
f(x_{t+1}) \le f(x_t)-\left(\eta-\frac{L\eta^2}{2}\right)\|\nabla f(x_t)\|^2.
$$
(done on paper), got to the end...


8. From the coefficient $\eta-\frac{L\eta^2}{2}$, derive a step-size range that guarantees descent.
	- n > 2/L and n > 0 


9. Explain in plain English what telescoping means in the sum:
$$
\sum_{t=0}^{T-1}\left(\|x_t-x^*\|^2-\|x_{t+1}-x^*\|^2\right).
$$
What cancels and what remains?

a lot of the terms are shared between summation indices in pairs and some have negative indices and some have positive indices
only thing that remains is ||x_t - x*||^2 - ||x_T - x*||^2, everything else cancels...



10. In one sentence each, compare:
- $O(1/T)$ convergence
- geometric/linear $(1-c)^T$ convergence
- geometric/linear convergence converges faster than O(1/T) convergence



9. Fill in the missing logic:  
Strong convexity gives $\_\_\_\_\_\_\_\_\_\_\_\_\_$, smoothness gives $\_\_\_\_\_\_\_\_\_\_\_\_\_$, and together they enable $\_\_\_\_\_\_\_\_\_\_\_\_\_$.

upper bound
lower bound
geometric/linear convergence




10. Define condition number $\kappa$ (for $\alpha$-strongly convex, $\beta$-smooth functions) and explain in one sentence how it affects speed.

### Feedback on Section B (assistant review)

- Q6: ✅ Correct.
  - Your smoothness inequality is right.

- Q7: ✅ Correct (based on your note that you completed it on paper).
  - Final derived form matches the target.

- Q8: ❌ Sign/range fix needed.
  - You wrote: $\eta > 2/L$.
  - Correct descent-safe range from that coefficient is:
  $$
  0 < \eta \le \frac{2}{L}.
  $$
  - For strict decrease when $\nabla f(x_t)\neq 0$, use:
  $$
  0 < \eta < \frac{2}{L}.
  $$

- Q9: ⚠️ Mostly correct idea, one index fix.
  - Correct telescoped remainder is:
  $$
  \|x_0-x^*\|^2-\|x_T-x^*\|^2.
  $$
  - You wrote $x_t$ in the first term; it should be $x_0$ after summing from $t=0$.

- Q10: ✅/⚠️ Core comparison is right.
  - Yes: geometric/linear $(1-c)^T$ is faster than $O(1/T)$.
  - Add wording:
    - $O(1/T)$ is sublinear (slower).
    - $(1-c)^T$ is geometric/linear (faster).

- Q11 (the fill-in item under strong convexity/smoothness): ⚠️ Partially right but swapped.
  - Correct ordering:
    - Strong convexity gives a **lower** curvature bound.
    - Smoothness gives an **upper** curvature bound.
    - Together they enable geometric/linear convergence.

- Q12: Not answered yet.
  - Expected:
  $$
  \kappa = \frac{\beta}{\alpha}\;(\text{or }L/\mu).
  $$
  - Larger $\kappa$ means worse conditioning and slower GD convergence.

## C) Feb 5: Subgradients

13. State the subgradient inequality definition for convex $f$ at point $x$.

14. For $f(x)=|x|$, compute $\partial f(x)$ for:
- $x>0$
- $x<0$
- $x=0$

15. Valid or invalid at $x=0$ for $f(x)=|x|$? Give one-line reason each.
- $g=0.4$
- $g=1.3$
- $g=-1$

16. For convex, non-smooth, unconstrained optimization, give the optimality condition that replaces $\nabla f(x^*)=0$.

17. Let $f(x)=\max\{x,\,-x,\;2x+1\}$.  
At $x=0$:
- identify active max terms
- give one valid subgradient

## D) Feb 10: Subgradient Method

18. Write the subgradient method update rule.

19. True or false, with one-line explanation:  
“Subgradient method guarantees $f(x_{t+1})\le f(x_t)$ at every iteration.”

20. Give the typical convergence headline for convex Lipschitz objectives under standard subgradient step schedules.

21. In one sentence, explain why subgradient methods are useful even if they can be slower than smooth GD.

## E) Feb 12: Projected (Sub)gradient

22. Define Euclidean projection $\Pi_C(z)$.

23. Write projected subgradient update in two lines (tentative step + projection step).

24. Let $C=[0,\infty)$, $x_t=0.2$, $g_t=1$, $\eta_t=0.5$.  
Compute:
- $y_{t+1}=x_t-\eta_t g_t$
- $x_{t+1}=\Pi_C(y_{t+1})$

25. Let $C=\{x:\|x\|_2\le 1\}$ and $y=(0.3,0.4)$.  
Is $\Pi_C(y)$ equal to $y$? Why?

26. In one sentence: what is the role of projection in constrained optimization algorithms?

## F) Feb 17: Optimality Conditions (Including KKT)

27. For smooth, unconstrained problems, state the first-order optimality condition.
	1. grad_f(x*) = 0

28. For convex, non-smooth, unconstrained problems, state the first-order optimality condition.
	1. 0 \in  partial_deriv_symbol (x*) (the subgradient set at point x*)


29. For convex $f$ over convex feasible set $C$, write the constrained first-order condition:
$$
\langle \nabla f(x^*), x-x^* \rangle \ge 0,\ \forall x\in C.
$$

Explain in one sentence what it means geometrically.

30. List the four KKT condition names.

31. For problem
$$
\min_x f(x)\quad\text{s.t. } g_i(x)\le 0,\ h_j(x)=0,
$$
write each KKT condition as an equation/inequality.

32. Complementary slackness logic check:  
For each case, say whether it is possible or impossible and why.
- $g_i(x^*)<0,\ \lambda_i>0$
- $g_i(x^*)=0,\ \lambda_i=0$
- $g_i(x^*)=0,\ \lambda_i>0$

33. Solve by KKT:
$$
\min_x x^2\quad \text{s.t. } x\ge 1.
$$
Use $g(x)=1-x\le 0$, write Lagrangian, solve for $x^*,\lambda^*$, and verify all KKT checks.

34. Mixed KKT solve (case split):
$$
\min_{x,y} x^2+y^2
$$
subject to
$$
x\le 0,\quad x+y-1=0.
$$
Find $x^*,y^*,\lambda^*,\nu^*$ and verify all KKT conditions.

## G) Quick Readiness Strip (No Derivations, 2 Minutes)

35. Which is faster as $T\to\infty$: $1/T$ or $1/\sqrt{T}$?

36. Fill in:
- If $g_i(x^*)<0$, then $\lambda_i=\_\_\_\_\_\_$.
- If $\lambda_i>0$, then $g_i(x^*)=\_\_\_\_\_\_$.

37. Fill in:
- Smooth unconstrained optimum condition: $\_\_\_\_\_\_$.
- Convex non-smooth unconstrained optimum condition: $\_\_\_\_\_\_$.

---

If you want, I can generate a matching answer key in a separate file so you can self-grade without spoilers in this sheet.
