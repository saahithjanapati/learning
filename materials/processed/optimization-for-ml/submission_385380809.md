# submission_385380809

Source: `materials/archive/submission_385380809.pdf`
Duplicate equivalents: `submission_385380809.pdf`
Extraction engine: `Gemini API (gemini-3-flash-preview)`
Strategy: `strict full-PDF single-call conversion`
Finish reason: `STOP`
Pages: 9
## Page 1
### Content
Quiz 1 **Graded**

Student
Saahith Janapati

Total Points
9.5 / 16 pts

Question 1
(no title) 1 / 1 pt
$\checkmark$ - 0 pts Correct: $\text{conv}(C) = \left\{ \sum_{i=1}^k \theta_i x_i \mid x_i \in C, \theta_i \ge 0, \sum_{i=1}^k \theta_i = 1, k = 2, 3, \dots \right\}$
- 1 pt Incorrect

Question 2
(no title) 1 / 1 pt
$\checkmark$ - 0 pts Correct: False, $L_p$ balls are convex for $p \ge 1$.
- 1 pt Incorrect

Question 3
(no title) 1 / 1 pt
$\checkmark$ - 0 pts Correct
- 0.5 pts False
- 0.5 pts Did not justify answer.
- 0.5 pts Justification is wrong
- 1 pt No answer

Question 4
(no title) 0.5 / 1 pt
$\checkmark$ - 0 pts Correct
- 1 pt Incorrect
- 0.5 pts No justification
$\checkmark$ - 0.5 pts Justification is wrong
- 0.5 pts Justification is vague
- 1 pt No answer

### Visual Description
This is a digital grading summary page. It features the student's name, total score, and a breakdown of points for the first four questions. Correct answers are marked with a green checkmark and "0 pts" deduction, while incorrect or partially correct answers show point deductions in red.

---

## Page 2
### Content
Question 5
(no title) 0 / 1 pt
- 0 pts Correct
- 0.5 pts not complete
$\checkmark$ - 1 pt Wrong
- 0.5 pts The inequality is reversed.

Question 6
(no title) 0 / 1 pt
- 0 pts Correct
$\checkmark$ - 1 pt Wrong
- 0.5 pts The inequality is reversed
- 0.5 pts Need a mathematical definition

Question 7
(no title) 1 / 1 pt
$\checkmark$ - 0 pts Correct
- 1 pt Incorrect

Question 8
(no title) 1 / 1 pt
$\checkmark$ - 0 pts Correct answer and justification
- 1 pt Incorrect

Question 9
(no title) 2 / 2 pts
+ 0.25 pts A is not chose
+ 0.25 pts A is explained
+ 0.25 pts B is not chose
+ 0.25 pts B is explained
+ 0.25 pts C is chose
+ 0.25 pts C is explained
+ 0.25 pts D is chose
+ 0.25 pts D is explained
$\checkmark$ + 2 pts CD is correct

### Visual Description
Digital grading summary continued for questions 5 through 9. It shows point deductions for incorrect answers and a detailed point breakdown for the multiple-choice question 9.

---

## Page 3
### Content
Question 10
(no title) 2 / 2 pts
$\checkmark$ + 2 pts Correct: BCD
+ 0.25 pts A is not picked
+ 0.25 pts A is explained
+ 0.25 pts B is picked
+ 0.25 pts B is explained
+ 0.25 pts C is picked
+ 0.25 pts C is explained
+ 0.25 pts D is picked
+ 0.25 pts D is explained

Question 11
(no title) 0 / 2 pts
- 0 pts Correct. Order of steps: 1) claim $(1 + t)^r$ convex (by taking two derivatives or by citing hw, 2) apply first order definition of convexity to recover Bernoulli's inequality
$\checkmark$ - 2 pts missing/incorrect/illegible
- 0.5 pts did not show convexity
- 1.5 pts Incorrect derivation/large leaps
- 1.5 pts effort (in the right direction)
- 0 pts $-\epsilon$
- 0.5 pts Confusion

Question 12
(no title) 0 / 1 pt
- 0 pts Correct
$\checkmark$ - 1 pt incorrect

Question 13
(no title) 0 / 1 pt
- 0 pts Correct
$\checkmark$ - 1 pt incorrect
- 0 pts $-\epsilon$
- 0.5 pts gets the idea

### Visual Description
Digital grading summary continued for questions 10 through 13. It includes detailed feedback for question 11 and point deductions for the final questions.

---

## Page 4
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 1
Jan 29, 2025

**INSTRUCTIONS**
* **The total time for the quiz is 20 minutes.**
* **Electronic devices are not to be used.**
* **None of the questions should require more than 5 lines to answer. It's OK to be concise if you address the key points. (it should be human-readable, though).**

**Name:** Saahith Janapati **Andrew ID:** sjanapat

### Visual Description
This is the cover page of the physical test. It contains the course title, date, instructions, and the student's handwritten name and Andrew ID.

---

## Page 5
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 1
Jan 29, 2025

**1 Questions: For True/False questions, justify answer!**

1. Given a set $C$, what is the definition of its convex hull?
> [Handwritten]: the minimal convex set that contains all points in $C$

2. True or False? The $L_p$ balls are convex for all $p > 0$.
> [Handwritten]: False. It's $p \ge 1$.

3. True or False? The operator norm satisfies the triangle inequality.
> [Handwritten]: True, norm induces metric space

4. True or False? If $\lambda$ is an eigenvalue of $A^T A$, $x$ is the corresponding eigenvector, and $Ax \neq 0$, then $\lambda$ is also an eigenvalue of $AA^T$.
> [Handwritten]: $(A^T A - \lambda I)x = 0 \implies A^T Ax = \lambda Ix \implies Ax = A \lambda I x \implies Ix = AA^T \lambda I x$
> $\frac{1}{\lambda} Ix = AA^T x \implies AA^T x - \frac{1}{\lambda} Ix = 0$
> True (circled)

5. What is the definition of the normal cone?
> [Handwritten]: $g_c(x) = \{ \nabla f(y-x) \le 0 \mid y \in \text{Dom}(f) \}$

### Visual Description
Scanned page of the test with handwritten answers in boxes. Question 4 includes a derivation and a circled "True". Question 5 has a handwritten formula.

---

## Page 6
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 1
Jan 29, 2025

6. What is the 1st-order characterization of convexity?
> [Handwritten]: function is convex if $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$

7. Create a function $f$, that is strictly convex, but $\nabla^2 f(x) \neq 0$ for some $x \in \text{dom}(f)$.
> [Handwritten]: Consider $f(x) = x^4$, $\nabla^2 f(x) = 8x \neq 0$ for $x = -2$

8. True or False? If $f : \mathbb{R} \to \mathbb{R}$ is convex, $g : \mathbb{R} \to \mathbb{R}$ is convex, then their composition, $f(g(x))$, is also convex.
> [Handwritten]: False. convex + non-dec. or convex + affine

9. Select all that apply. Briefly justify.
Which of the following are convex:
(a) A countable union of convex sets
(b) An uncountable union of convex sets
(c) A countable intersection of convex sets
(d) An uncountable intersection of convex sets
> [Handwritten]: (c) and (d) are circled. Intersections of convex sets are convex, but not necessarily their union (e.g. union of two circles that touch each other at one point)

### Visual Description
Scanned page of the test with handwritten answers. There are some scratchpad calculations in the left margin for question 7 ($x^4, 4x^3, 8x$). In question 9, options (c) and (d) are circled.

---

## Page 7
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 1
Jan 29, 2025

10. Select all that apply. Briefly justify.
Consider a function $f : \mathbb{R}^n \to \mathbb{R}$. Which of the following statements are true?
(a) If $f$ is convex, then it must be differentiable everywhere.
(b) If $f$ is convex and differentiable, then $f(y) \ge f(x) + \langle \nabla f(x), y - x \rangle$ for all $x, y \in \mathbb{R}^n$.
(c) If $f$ is strictly convex, then any local minimum is also a global minimum.
(d) If $f$ is convex, then the sublevel sets $\{x : f(x) \le \alpha\}$ are convex for all $\alpha \in \mathbb{R}$.
> [Handwritten]: (b), (c), and (d) are circled.
> Next to (a): -false ($|x|=f(x)$)
> Next to (c): there is only one local minimum which is global...

11. Using the definition and properties of convexity, prove Bernoulli's inequality: for $t \ge 0, r \ge 1$, we have $(1+t)^r \ge 1 + rt$.
Hint: remember the definition of convexity where the tangent line approximation is a global under-estimator of the function.
> [Handwritten]: note, $\nabla f = r(1+t)^{r-1}$.

### Visual Description
Scanned page of the test. Question 10 has options (b), (c), and (d) circled with handwritten justifications on the side. Question 11 has a single line of handwritten text.

---

## Page 8
### Content
Optimization for ML, 10-725
Carnegie Mellon University
Mini Test 1
Jan 29, 2025

12. Let $f : \mathbb{R}^n \to \mathbb{R}$ be convex, differentiable. Let $C$ be convex. Consider the optimization problem $\min_{x \in C} f(x)$. State the theorem that characterizes the optimal solutions of this optimization problem in terms of the gradient of $f$ and the normal cone in the points of $C$.
> [Handwritten]: $y \in \min_{x \in C} f(x) \iff \nabla f(y-x) \le 0$

13. Let $f : \mathbb{R}^n \to \mathbb{R}$ be convex. What does it mean that its subgradients are monotone?
> [Handwritten]: (blank)

### Visual Description
Scanned page of the test. Question 12 contains a handwritten mathematical expression. Question 13 is left blank.

---

## Page 9
### Content
(Empty page)

### Visual Description
Text-only page. This page is blank.
