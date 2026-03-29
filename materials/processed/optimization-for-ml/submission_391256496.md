# submission_391256496

Source: `materials/archive/submission_391256496.pdf`
Duplicate equivalents: `submission_391256496.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `strict full-PDF single-call conversion`
Finish reason: `STOP`
Pages: 7
## Page 1
### Content
Quiz 2
Graded
Student
Saahith Janapati
Total Points
7.99 / 12 pts

### Visual Description
Cover page of a graded quiz. It contains the title "Quiz 2", a green "Graded" status indicator, the student's name "Saahith Janapati", and the total score "7.99 / 12 pts".

---

## Page 2
### Content
Question 1
(no title) 7.99 / 12 pts
1.1 (no title) 1 / 1 pt
- 0 pts Correct
- 1 pt Click here to replace this description.

1.2 (no title) 1 / 1 pt
- 0 pts Correct
- 1 pt Click here to replace this description.

1.3 (no title) 0 / 1 pt
- 0 pts Correct: $\partial f(x) = \text{conv}\left( \bigcup_{i:f_i(x)=f(x)} \partial f_i(x) \right)$, i.e. the convex hull of union of subdifferentials of all active functions at $x$
- 0.5 pts Union needs to be restricted to active functions, i.e. only those $i$ where $f_i(x) = f(x)$
- 0.5 pts Other (single) error in definition
- 1 pt Incorrect

1.4 (no title) 0 / 1 pt
- 0 pts Correct: $\min_{i=0,\dots,k} \|\nabla f(x^{(i)})\|_2 = \sqrt{\frac{2\beta}{k}(f(x^0) - f(x^*))} = O\left(\frac{\sqrt{\beta}}{\sqrt{k}}\right)$
- 0.1 pts Wrong iterate (need minimum of i = 0, .... k) but otherwise correct
- 0.5 pts Incorrect or missing RHS (rate)
- 0.5 pts Incorrect or missing LHS (quantity)
- 1 pt Incorrect

1.5 (no title) 0.99 / 1 pt
- 0 pts Correct
- 0.5 pts did not have $f(x_k) - f(x^*)$, either in words or equation
- 0.5 pts did not relate to $O\left(\frac{\beta}{k}\right)$, $\beta$ here is required in the big-O since we don't actually treat it as a constant when generalizing the bound. (1/k is okay when thinking about it but we are looking for a precise, big-O answer here in terms of $\beta$ and k)
- 1 pt wrong
- 0.01 pts $-\epsilon$
1 write big-O

### Visual Description
Grading summary page for sub-questions 1.1 through 1.5. It shows points awarded, point deductions with explanations, and correct mathematical formulas in LaTeX. There is a small orange bubble with the number '1' next to a comment about writing big-O.

---

## Page 3
### Content
1.6 (no title) 1 / 1 pt
- 0 pts Correct
- 0.5 pts incorrect answer
- 0.5 pts incorrect justification
- 1 pt incorrect
- 0.001 pts $-\epsilon$

1.7 (no title) 0 / 1 pt
- 0 pts Correct
- 1 pt Incorrect or incorrect proof

1.8 (no title) 1 / 1 pt
- 0 pts Correct
- 1 pt Incorrect

1.9 (no title) 1 / 1 pt
- 0 pts Correct
- 1 pt Wrong
- 0.5 pts contain additional wrong answers

1.10 (no title) 1 / 1 pt
- 0 pts Correct, B
- 1 pt Blank
- 1 pt wrong

1.11 (no title) 0 / 1 pt
- 0 pts Correct
- 1 pt Missed at least one of A,B,C,D

1.12 (no title) 1 / 1 pt
- 0 pts Correct
- 1 pt Incorrect

### Visual Description
Grading summary page for sub-questions 1.6 through 1.12. It shows points awarded and lists potential reasons for deductions.

---

## Page 4
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 2
Feb 19, 2026

INSTRUCTIONS
- The total time for the quiz is 10 minutes.
- Electronic devices are not to be used.
- None of the questions should require more than 3 lines to answer. It's OK to be concise if you address the key points. (it should be human-readable, though).

Name: Saahith Janapati
Andrew ID: sjanapat
1

### Visual Description
Instruction page for the quiz. It includes the course title, university, test name, date, and general instructions. The student's name "Saahith Janapati" and Andrew ID "sjanapat" are handwritten.

---

## Page 5
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 2
Feb 19, 2026

1 Questions
1. Write down the main steps for the 'projected subgradient method' algorithm.
(Handwritten answer:)
1. $y_{t+1} = x_t - g_t \eta$
2. $x_{t+1} = \Pi_C(y_{t+1})$ where $\Pi_C(y_{t+1}) = \text{argmin}_{v \in C} \|v - y_{t+1}\|^2$

2. If a convex function $f$ is Lipschitz with parameter $G$, what can we say about its subgradients?
(Handwritten answer:)
$\|\nabla f(y) - \nabla f(x)\| \le G \|y - x\|$ (crossed out)
$f(y) \le f(x) + g^T(y-x)$
$\|g\|^2 \le G$ (boxed)

3. Let $f_1, f_2, f_3$ be three convex functions defined on the same domain. What is the subgradient of $f(x) = \max(f_1(x), f_2(x), f_3(x))$?
(Handwritten answer:)
$\partial(x) = \partial_i(x)$ where $\partial_i$ is subgradient for the $f_i$ that is min @ $x$.

4. What convergence rate does Gradient Descent achieve when minimizing $\beta$-smooth, possibly non-convex functions with step-size $\eta = 1/\beta$? (State the answer as a function of $\beta, k$ without justification. Be precise about the quantity that is converging — the rate alone is not sufficient)
(Handwritten answer:)
$k = \frac{\beta}{\alpha}$ (crossed out)
$\beta/k$
2

### Visual Description
Quiz page containing questions 1 through 4 with handwritten answers in designated boxes. Some answers contain crossed-out text.

---

## Page 6
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 2
Feb 19, 2026

5. What is the best converge rate that Gradient Descent can achieve when minimizing $\beta$-smooth convex functions with a fixed step-size $\eta = 1/\beta$? (State the answer as a function of $\beta, k$ without justification. Be precise about the quantity that is converging — the rate alone is not sufficient)
(Handwritten answer:)
$\beta/k$
$\|x^* - x_k\|$

6. True or False: For functions that are $\alpha$ strongly convex, we are guaranteed a linear convergence rate for gradient descent. Justify briefly.
(Handwritten answer:)
False, we need strongly convex + L smooth for linear convergence.

7. Prove or disprove that the negative gradient $-\nabla f(x)$ is a descent direction for any differentiable $f$.
(Handwritten answer:)
False. Consider $f(x)=1$, descent $-\nabla f(x)=0$, which does not descend.

8. Consider applying one step of the subgradient method to a convex function.
True or False: If one is not at the global optimum, then for any choice of subgradient, there exists a positive stepsize such that the next iterate strictly decreases the function value. (No need to justify.)
(Handwritten answer:)
False
3

### Visual Description
Quiz page containing questions 5 through 8 with handwritten answers. Question 5 has a small orange bubble with the number '1' next to the answer.

---

## Page 7
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 2
Feb 19, 2026

9. Consider the convex function $F : \mathbb{R}^2 \to \mathbb{R}$ defined by $F(\theta_1, \theta_2) = |\theta_1| + 2|\theta_2|$. Write down any subgradient of $F$ at $(1, 0)$. No justification needed.
(Handwritten answer:)
$\langle 1, 0 \rangle$

10. Select all that apply. For a convex function $f : \mathbb{R}^n \to \mathbb{R}$ that is differentiable at point $x$, the subdifferential $\partial f(x)$ is:
A) The empty set
B) The singleton set $\{\nabla f(x)\}$
C) All vectors with norm less than $\|\nabla f(x)\|$
D) The normal cone at $x$
No justification needed.
(Handwritten answer:)
B

11. Select all that apply. Let $f : \mathbb{R}^n \to \mathbb{R}$ be twice differentiable. Which conditions are sufficient for $f$ to be convex? No justification needed.
A) $\nabla^2 f(x) \succ 0$ (positive definite) for all $x \in \mathbb{R}^n$.
B) $\nabla^2 f(x) \succeq 0$ (positive semidefinite) for all $x \in \mathbb{R}^n$.
C) $f(y) - f(x) - \langle \nabla f(x), y - x \rangle \ge 0$ for all $x, y \in \mathbb{R}^n$.
D) $f(\theta x + (1 - \theta)y) \le \theta f(x) + (1 - \theta)f(y)$ for all $x, y \in \mathbb{R}^n$ and $\theta \in [0, 1]$.
(Handwritten answer:)
A, D
(Handwritten note on side:) $f(y) - f(x) \ge \langle \nabla f(x), y-x \rangle$

12. True or False. Let $f : \mathbb{R}^n \to \mathbb{R}$ be a convex function. Then the epigraph $\text{epi}(f) := \{(x, t) \in \mathbb{R}^n \times \mathbb{R} : f(x) \le t\}$ is a convex set. No need to justify your answer.
(Handwritten answer:)
True
(Handwritten note below:) $\{(x, t) \in \mathbb{R}^n \times \mathbb{R} : f(x) \le t\}$
4

### Visual Description
Final quiz page containing questions 9 through 12 with handwritten answers and some additional handwritten mathematical notes. There is a large handwritten plus sign at the top of the page.
