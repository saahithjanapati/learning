# March24_SDP

Source: `materials/archive/March24_SDP.pdf`
Duplicate equivalents: `March24_SDP.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 46

## Page 1
### Content
Optimization for Machine Learning
Semidefinite Programming

Barnabas Poczos
bapoczos@cs.cmu.edu

Carnegie Mellon University
### Visual Description
Title slide with "Optimization for Machine Learning" and "Semidefinite Programming", author information (Barnabas Poczos, bapoczos@cs.cmu.edu), and the Carnegie Mellon University logo at the bottom right.

---

## Page 2
### Content
Outline
* SDP definition
* SDP basic properties
### Visual Description
Outline slide with the title "Outline" and two bullet points: "SDP definition" and "SDP basic properties".

---

## Page 3
### Content
Papers to Read
* F. Alizadeh: Interior point methods in SDP with applications to combinatorial optimization
* Vandenberghe & Boyd: Semidefinite Programming
* L. Lovasz: Semidefinite programs and combinatorial optimization
* R. Freund: Introduction to Semidefinite Programming
### Visual Description
Slide titled "Papers to Read" listing four academic papers with their authors and titles.

---

## Page 4
### Content
Cone of PSD Matrices
Definition [Symmetric matrices, PSD matrices]:
$S^n := \{X \in R^{n \times n}|X = X^T\}$ [Symmetric matrices]
$S^n_+ := \{X \in S^n|X \ge 0\}$ [PSD matrices]

Lemma [Set of PSD is a closed convex cone]:
$S^n_+$ is a closed convex cone in $R^{n \times n}$

Proof [Cone and convexity]:
$$
\left.
\begin{array}{l}
\alpha, \beta \ge 0 \\
X, W \in S^n_+ \\
v \in R^n
\end{array}
\right\}
\implies v^T(\alpha X + \beta W)v = \alpha v^T X v + \beta v^T W v \ge 0
$$
### Visual Description
Slide defining symmetric matrices ($S^n$) and Positive Semidefinite (PSD) matrices ($S^n_+$). It then presents a lemma stating that the set of PSD matrices is a closed convex cone, followed by a mathematical proof demonstrating the convexity property.

---

## Page 5
### Content
Basic Properties of PSD matrices
$$
X \in S^n \implies
\left\{
\begin{array}{l}
X = QDQ^T \\
QQ^T = I_n \text{ [Q is orthonormal]} \\
D \text{ is diagonal, } D_{ii} \in R
\end{array}
\right.
$$
$$
X \ge 0 \implies
\left\{
\begin{array}{l}
X = QDQ^T \\
QQ^T = I_n \text{ [Q is orthonormal]} \\
D \text{ is diagonal} \\
D_{ii} \ge 0.
\end{array}
\right.
$$
### Visual Description
Slide presenting two basic properties of PSD matrices. The first property describes the decomposition of a symmetric matrix ($X \in S^n$) into $QDQ^T$ where $D$ is diagonal with real entries. The second property describes the decomposition of a positive semidefinite matrix ($X \ge 0$) into $QDQ^T$ where $D$ is diagonal with non-negative entries.

---

## Page 6
### Content
Basic Properties of PSD matrices
Lemma: $X \ge 0 \implies X_{ii} \ge 0 \forall i$
Proof: $X \ge 0 \implies e_i^T X e_i \ge 0$, where $e_i^T = [0,...,0,1,0,...,0]$
$\implies X_{ii} = e_i^T X e_i \ge 0$

Lemma:
$$
\left.
\begin{array}{l}
X \ge 0 \\
X_{ii} = 0 \text{ for some } i
\end{array}
\right\}
\implies X_{ij} = X_{ji} = 0 \forall j = 1, ..., n
$$
[i.e. the $i^{th}$ row and column are zero.]
Proof: Appendix

Lemma:
$$
X = \begin{pmatrix} A & B \\ B^T & C \end{pmatrix} \ge 0 \iff
\left\{
\begin{array}{l}
A \ge 0 \\
C - B^T A^{-1} B \ge 0 \text{ [Schur complement]}
\end{array}
\right.
$$
### Visual Description
Slide presenting three lemmas related to basic properties of PSD matrices. The first lemma states that diagonal elements of a PSD matrix are non-negative, with a proof. The second lemma states that if a diagonal element of a PSD matrix is zero, then its corresponding row and column are also zero. The third lemma provides the Schur complement condition for a block matrix to be positive semidefinite.

---

## Page 7
### Content
Inner product between symmetric matrices
Definition [Inner product between symmetric matrices]:
Let $A, B \in S^n$.
$A \bullet B := Tr(A^T B) = \sum_{i=1}^n \sum_{j=1}^n a_{ij} b_{ij}$

$A^T$
$[a_{1j}, a_{2j}, ..., a_{nj}]$

$B$
$[b_{1j}, b_{2j}, b_{3j}, ..., b_{nj}]$
### Visual Description
Slide defining the inner product between symmetric matrices. The definition is given as $A \bullet B := Tr(A^T B) = \sum_{i=1}^n \sum_{j=1}^n a_{ij} b_{ij}$. Below the definition, there are two schematic representations of matrix elements: one for $A^T$ showing a row of elements $[a_{1j}, a_{2j}, ..., a_{nj}]$ and one for $B$ showing a column of elements $[b_{1j}, b_{2j}, b_{3j}, ..., b_{nj}]$.

---

## Page 8
### Content
Inner product of PSD matrices
Theorem:
$A \ge 0$
$B \ge 0$
$\implies A \bullet B \ge 0$

Observations:
$Tr(ABC) = Tr(BCA)$
If $D$ is diagonal $\implies Tr(DB) = \sum_j D_{jj} B_{jj}$

Proof:
Let $A = PDP^T$ and $B = QEQ^T$ where $P, Q$ are orthonormal matrices and $D, E$ are nonnegative diagonal matrices.
$A \bullet B = Tr(A^T B) = Tr(PDP^T QEQ^T) = Tr(DP^T QEQ^T P)$
$= \sum_{j=1}^n D_{jj} (P^T QEQ^T P)_{jj} \ge 0$
since the diagonal of the symmetric positive semidefinite matrix $P^T QEQ^T P$ must be nonnegative, $D$ is diagonal, and $D_{jj} \ge 0$.
### Visual Description
Slide presenting a theorem about the inner product of PSD matrices, stating that if $A$ and $B$ are PSD, then their inner product $A \bullet B \ge 0$. It also includes two observations about the trace property. A detailed proof of the theorem is provided, involving the decomposition of PSD matrices and properties of diagonal matrices.

---
## Page 9
### Content
Inner product of PSD matrices

**Theorem:**
Let $A \ge 0, B \ge 0$. Then $A \bullet B = 0 \iff AB = 0$

**Proof:** Let $A = PDP^T$ and $B = QEQ^T$ where $P, Q$ are orthonormal matrices and $D, E$ are nonnegative diagonal matrices.

"$\implies$" Suppose that $A \bullet B = Tr(A^T B) = 0 \implies \sum_{j=1}^n (P^T QEQ^T P)_{jj} = 0$
either $D_{jj} = 0$ or $(P^T QEQ^T P)_{jj} = 0$ for all $j \in \{1,..., n\}$
If $(P^T QEQ^T P)_{jj} = 0$, then the $j^{th}$ row and column of $P^T QEQ^T P$ is zero.
If $D_{jj} = 0$, then the $j^{th}$ row and column of $D$ is zero.
Therefore, $D P^T QEQ^T P = 0 \implies P D P^T QEQ^T = 0 \implies A^T B = 0$
$AB = 0$ [since $A = A^T$]
### Visual Description
Text-only slide.
---
## Page 10
### Content
Inner product of PSD matrices

**Theorem:**
Let $A \ge 0, B \ge 0$. Then $A \bullet B = 0 \iff AB = 0$

**Proof:**
"$\impliedby$" Suppose that $AB = A^T B = 0$
Then $A \bullet B = Tr(A^T B) = 0$
### Visual Description
Text-only slide.
---
## Page 11
### Content
Semidefinite Programming

**LP:**
$\min_x c^T x$
s.t. $a_i^T x = b_i, \quad i = 1, ..., m$
$x \ge 0$

**Definition: [SDP]**
$\min_X C \bullet X$
s.t. $A_i \bullet X = b_i, \quad i = 1, ..., m$
$X \ge 0$

$C \in S^n$
$X \in S^n$
$A_i \in S^n, \quad i = 1, ..., m$
$b_i \in \mathbb{R}$

It looks like an LP but $X$ must be in the cone of PSD matrices.
### Visual Description
The slide presents the standard Linear Program (LP) formulation on the left, and then introduces the Semidefinite Program (SDP) formulation on the right, highlighting its similarity to LP but with matrix variables and constraints.
---
## Page 12
### Content
LP vs SDP Duality

**LP duality**
**(P)**
$\min_x c^T x$
s.t. $Ax = b,$
$x \ge 0$

$A \in \mathbb{R}^{m \times n}$
$b \in \mathbb{R}^m$
$c, x \in \mathbb{R}^n$

**(D)**
$\max_{y,s} y^T b$
s.t. $y^T A + s^T = c^T,$
$s \ge 0$

$y \in \mathbb{R}^m, s \in \mathbb{R}^n$

**Duality gap:**
$c^T x - b^T y = (y^T A + s^T)x - b^T y$
$= (y^T A + s^T)x - x^T A^T y$
$= y^T Ax + s^T x - x^T A^T y = s^T x$
### Visual Description
The slide presents the primal (P) and dual (D) formulations for Linear Programming (LP) duality, followed by a derivation of the duality gap.
---
## Page 13
### Content
SDP Duality

**SDP duality**
**(SDP)**
$\min_X C \bullet X$
s.t. $A_i \bullet X = b_i, \quad i = 1, ..., m$
$X \ge 0$

$C \in S^n$
$X \in S^n$
$A_i \in S^n, \quad i = 1, ..., m$
$b_i \in \mathbb{R}$

**(SDD)**
$\max_{y,S} y^T b$
s.t. $S = C - \sum_{i=1}^m y_i A_i,$
$S \ge 0$

$y \in \mathbb{R}^m$
$S \in S^n$
### Visual Description
The slide presents the primal Semidefinite Program (SDP) and its corresponding dual (SDD) formulation, including the objective functions, constraints, and variable definitions for both.
---
## Page 14
### Content
SDP Duality

**SDD**
$\max_{y,S} y^T b$
s.t. $S = C - \sum_{i=1}^m y_i A_i,$
$S \ge 0$

$y \in \mathbb{R}^m, S \in \mathbb{R}^{n \times n}, C \in S^n$
$A_i \in S^n, \quad i = 1, ..., m$

**Sometimes SDP is defined as**
$\min_x c^T x$
s.t. $F_0 + x_1 F_1 + ... x_m F_m \ge 0,$ [Linear matrix inequality]

$x, c \in \mathbb{R}^m$
$F_0, F_1, ..., F_m \in S^n$
### Visual Description
The slide reiterates the SDD (Semidefinite Dual) problem and then introduces an alternative definition of SDP using a Linear Matrix Inequality (LMI) constraint.
---
## Page 15
### Content
SDP is convex problem

**Lemma [SDP is convex problem]**
$\min_x c^T x$
s.t. $F_0 + x_1 F_1 + ... x_m F_m \ge 0,$

$x, c \in \mathbb{R}^m$
$F_0, F_1, ..., F_m \in S^n$

**Proof:** The objective function $c^T x$ is convex in $x$
Let $F(x) := F_0 + x_1 F_1 + ... x_m F_m$ [constraints]

We need to show:
If $F(x) \ge 0$
$F(y) \ge 0$
$\lambda \in [0, 1]$
$\implies F(\lambda x + (1 - \lambda)y) \ge 0$
[i.e. the inequality constraints are convex]
### Visual Description
The slide presents a lemma stating that SDP is a convex problem, followed by the setup for its proof, defining the objective function and constraints, and outlining the condition to demonstrate convexity of the inequality constraints.
---
## Page 16
### Content
SDP is convex problem

**Proof:**
$F(x) := F_0 + x_1 F_1 + ... x_m F_m = F_0 + \sum_{i=1}^m x_i F_i$
$\implies F(\lambda x + (1 - \lambda)y) = F_0 + \sum_{i=1}^m (\lambda x_i + (1 - \lambda)y_i)F_i$
$= \lambda (F_0 + \sum_{i=1}^m x_i F_i) + (1 - \lambda)(F_0 + \sum_{i=1}^m y_i F_i)$
$= \lambda F(x) + (1 - \lambda)F(y)$
$\ge 0$ since $F(x) \ge 0, F(y) \ge 0$
and the set of PSD matrices is convex.
$\implies F(\lambda x + (1 - \lambda)y) \ge 0$
### Visual Description
The slide continues the proof for the convexity of SDP, showing the algebraic steps to demonstrate that the constraint function $F(x)$ is convex by expressing $F(\lambda x + (1 - \lambda)y)$ as a convex combination of $F(x)$ and $F(y)$.
---
## Page 17
### Content
## Sketching SDP

$F(x) \ge 0$
$F(x) \ge 0$

Same idea as LP.
The set of feasible points is convex, but not a polytope anymore.
### Visual Description
A graph showing a convex feasible region. An optimal point $x_{opt}$ is marked within this region. A vector $-c$ points away from $x_{opt}$, and a dashed line, representing a level set, is tangent to the feasible region at $x_{opt}$.
---
## Page 18
### Content
## LP as a special SDP

**Theorem:** [LP as a special SDP] Any LP is a special case of an SDP

Consider this LP:
$$ \min_{x \in \mathbb{R}^n} c^T x $$
$$ \text{s.t.} \quad Ax = b, $$
$$ \quad x \ge 0, $$

Then it can be written as a semidefinite program.

Proof [Appendix]
### Visual Description
Text-only slide, presenting a theorem that states an LP is a special case of an SDP, followed by the standard mathematical formulation of a Linear Program.
---
## Page 19
### Content
## SDP weak duality

$$ \min_{X} C \bullet X \quad \text{(SDP)} $$
$$ \text{s.t.} \quad A_i \bullet X = b_i, \quad i = 1, \dots, m $$
$$ \quad X \ge 0 $$

$$ \max_{y,S} y^T b \quad \text{(SDD)} $$
$$ \text{s.t.} \quad S = C - \sum_{i=1}^m y_i A_i, $$
$$ \quad S \ge 0 \quad y \in \mathbb{R}^m \quad S \in \mathbb{R}^{n \times n} $$

**Theorem:** [Weak duality, the duality gap is nonnegative]

If $X$ is SDP feasible (i.e $X \ge 0$)
$y, S$ is SDD feasible (i.e $S \ge 0, S = C - \sum_{i=1}^m y_i A_i$)
$$ \implies C \bullet X - y^T b \ge 0 $$

**Proof:**
$$ C \bullet X - y^T b = C \bullet X - \sum_{i=1}^m b_i y_i = C \bullet X - \sum_{i=1}^m (A_i \bullet X) y_i = C \bullet X - \sum_{i=1}^m (y_i A_i \bullet X) $$
$$ = \left(C - \sum_{i=1}^m y_i A_i\right) \bullet X = S \bullet X \ge 0 \quad [\text{Since } S \ge 0, X \ge 0] $$
### Visual Description
Text-only slide, presenting the primal (SDP) and dual (SDD) formulations for semidefinite programming, followed by the weak duality theorem and its proof.
---
## Page 20
### Content
## If the SDP duality gap is zero...

$$ \min_{X} C \bullet X \quad \text{(SDP)} \quad C \in S^n $$
$$ \text{s.t.} \quad A_i \bullet X = b_i, \quad i = 1, \dots, m \quad A_i \in S^n $$
$$ \quad X \ge 0 $$

$$ \max_{y,S} y^T b \quad \text{(SDD)} $$
$$ \text{s.t.} \quad S = C - \sum_{i=1}^m y_i A_i, $$
$$ \quad S \ge 0 \quad y \in \mathbb{R}^m \quad S \in \mathbb{R}^{n \times n} $$

**Remark:**
[If the duality gap is zero for feasible points, then those points are SDP & SDD optimal]

$$ \text{If } C \bullet X - y^T b = 0 \quad [\text{duality gap}] \quad S \bullet X $$
$$ \implies \begin{cases} X \text{ is SDP optimal} \\ (y, S) \text{ is SDD optimal} \\ SX = S^T X = 0 \end{cases} $$

**Lemma:** In SDP however, even if the duality gap is zero, it might not be attained!

Proof: [next slide]
### Visual Description
Text-only slide, discussing the implications of a zero duality gap in SDP, including conditions for optimality and a lemma stating that the optimum might not be attained even with a zero duality gap.
---
## Page 21
### Content
## SDP Optimum Might not be Achieved

**Theorem** [minimum cannot be achieved]
In SDP, the $\inf_x c^T x$ may be finite, but still $\min c^T x$ cannot be achieved.

Proof with an example:
$$ \inf_{x_1, x_2} x_1 $$
$$ \text{s.t.} \quad \begin{pmatrix} x_1 & 1 \\ 1 & x_2 \end{pmatrix} \ge 0 $$
$$ \iff $$
$$ \inf_{x_1, x_2} x_1 \quad \text{(This is an SDP)} $$
$$ \text{s.t.} \quad x_1 \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + x_2 \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} + \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \ge 0 $$

Therefore,
$x_1 \ge 0$
$x_1 x_2 - 1 \ge 0$

Observations:
$$ \inf_{x_1, x_2} x_1 = 0 $$
but $x_1 = 0$ cannot be achieved because $x_1 x_2 \ge 1$
### Visual Description
Text-only slide, presenting a theorem that the SDP optimum might not be achieved, even if the infimum is finite. An example problem is provided with its formulation and observations to illustrate this concept.
---
## Page 22
### Content
## SDP Strong Duality

**Theorem:** [Strong duality]

$$ \min_{X} C \bullet X \quad \text{(SDP)} $$
$$ \text{s.t.} \quad A_i \bullet X = b_i, \quad i = 1, \dots, m $$
$$ \quad X \ge 0 $$

$$ \max_{y,S} y^T b \quad \text{(SDD)} $$
$$ \text{s.t.} \quad S = C - \sum_{i=1}^m y_i A_i, $$
$$ \quad S \ge 0 \quad y \in \mathbb{R}^m \quad S \in \mathbb{R}^{n \times n} $$

* Assume that $\exists X > 0$ [strictly SDP feasible]
* Assume that $\exists S = C - \sum_{i=1}^m y_i A_i$ and $S > 0$ [(y, S) is strictly SDD feasible]
* Let $z_P^*$ be the optimum value of SDP
* Let $z_D^*$ be the optimum value of SDD

$$ \implies \begin{cases} z_P^* = z_D^* \quad [\text{Strong duality}] \\ z_P^* \text{ can be attained } [\inf = \min] \\ z_D^* \text{ can be attained } [\sup = \max] \end{cases} $$
### Visual Description
Text-only slide, outlining the conditions for strong duality in SDP. It presents the primal and dual SDP formulations, followed by bullet points detailing the strict feasibility assumptions and the resulting implications for the optimal values, including their attainment.
---
## Page 23
### Content
## Positive Duality Gap

Original Problem
$$ \min_{x_1, x_2} x_1 $$
$$ \text{s.t.} \quad \begin{pmatrix} x_1 & 0 & 0 \\ 0 & x_1 & 0 \\ 0 & 0 & x_1+1 \end{pmatrix} \ge 0 $$

Let's write it in the standard form
$$ \min_{x_1, x_2} x_1 $$
$$ x_1 \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} + x_2 \begin{pmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix} + \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \ge 0 $$
$$ \quad -A_1 \quad \quad -A_2 \quad \quad C $$

We want this to be in the SDD form:
$$ \max_{x_1, x_2, S} x_1 b_1 + x_2 b_2 \quad \text{(SDD)} $$
$$ \text{s.t.} \quad S = C - \sum_{i=1}^m x_i A_i, $$
$$ \quad S \ge 0 $$

Note that $\min_{x_1} x_1 = - \max_{x_1} -x_1$. Let $b_1 = -1, b_2 = 0$.
### Visual Description
Text-only slide, introducing an example problem to illustrate a positive duality gap. It shows the original problem formulation, its conversion into a standard SDP form, and sets up the corresponding SDD form, defining parameters $b_1$ and $b_2$.
---
## Page 24
### Content
## Positive Duality Gap

$$ \max_{x_1, x_2, S} x_1 b_1 + x_2 b_2 \quad \text{(SDD)} $$
$$ \text{s.t.} \quad S = C - \sum_{i=1}^m x_i A_i, $$
$$ \quad S \ge 0 $$

Let's calculate its dual:
$$ \min_{Y} C \bullet Y \quad \text{(SDDD=SDP)} $$
$$ \text{s.t.} \quad A_i \bullet Y = b_i, \quad i = 1, 2 $$
$$ \quad Y \ge 0 $$

$$ \text{(SDP)} \quad - \min_Y \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \bullet Y \quad [-\min C \bullet Y] \implies - \min Y_{33} \implies \max -Y_{33} $$

$$ \text{s.t.} \quad \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \bullet Y = -1 \quad [A_1 \bullet Y = b_1] \implies Y_{12} + Y_{21} + Y_{33} = 1 $$
$$ \text{and} \quad \begin{pmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix} \bullet Y = 0 \quad [A_2 \bullet Y = b_2] \implies Y_{22} = 0 $$

Weak duality: $p^* = - \max_{x_1, x_2, S} x_1 b_1 + x_2 b_2 \ge - \min_Y C \bullet Y = d^*$
### Visual Description
Text-only slide, continuing the example of a positive duality gap. It presents the SDD formulation and then calculates its dual (SDDD=SDP), detailing the objective function and constraints for the dual problem. The weak duality relationship is stated at the bottom.
---
## Page 25
### Content
## Positive Duality Gap

**Original Problem**
$$ \min_{x_1,x_2} x_1 $$
$$ \text{s.t.} \begin{pmatrix} 0 & x_1 & 0 \\ x_1 & x_2 & 0 \\ 0 & 0 & x_1+1 \end{pmatrix} \ge 0 $$

**Dual Problem**
$$ \max -Y_{33} $$
$$ \text{s.t. } Y_{12} + Y_{21} + Y_{33} = 1 $$
$$ Y_{22} = 0 $$
$$ Y \ge 0 $$

Feasible dual solutions: $x_1 = 0, x_2 \ge 0$
optimal value: $x_1^* = 0$

Feasible primal solutions:
[Since $Y \ge 0$ has to be symmetric and $Y_{22} = 0$]
$$ \implies Y = \begin{pmatrix} a & 0 & b \\ 0 & 0 & 0 \\ b & 0 & 1 \end{pmatrix} \ge 0 $$
$$ \implies Y_{33} = 1, \text{ and the dual optimal value is } -Y_{33} = -1 $$

The duality gap is not zero in the optimum points (-1<0)!
### Visual Description
Slide presents an "Original Problem" (minimization with a matrix inequality constraint) and a "Dual Problem" (maximization with equality and positive semidefinite constraints). It then lists feasible solutions and optimal values for both, concluding that there is a positive duality gap.
---
## Page 26
### Content
## SDP Applications in Machine Learning
### Visual Description
Text-only slide. The title "SDP Applications in Machine Learning" is centered on the page.
---
## Page 27
### Content
## SDP Applications in Machine Learning

*   **Metric Learning**
    *   Kilian Weinberger and Lawrence Saul. **Distance metric learning for large margin nearest neighbor classification.** JMLR, 2009.
    *   Jason Davis, Brian Kulis, Prateek Jain, Suvrit Sra, and Inderjit Dhillon. **Information-theoretic metric learning.** ICML, 2007.

*   **Kernel Learning**
    *   Gert Lanckriet et al. **Learning the kernel matrix with semidefinite programming.** JMLR, 2004.

*   **Sparse Principal Component Analysis**
    *   Alexandre d'Aspremont et al. **A direct formulation for sparse PCA using semidefinite programming.** SIAM Review, 2007.
### Visual Description
This slide lists three categories of SDP applications in Machine Learning: Metric Learning, Kernel Learning, and Sparse Principal Component Analysis. Each category has bullet points citing relevant research papers.
---
## Page 28
### Content
## SDP Applications in Machine Learning

*   **Clustering and Community Detection**
    *   Jiming Peng and Yu Wei. **Approximating k-means-type clustering via semidefinite programming.** SIAM Journal on Optimization, 2007.
    *   Arash Amini and Elizaveta Levina. **On semidefinite relaxations for the block model.** Annals of Statistics, 2018.

*   **Matrix Completion**
    *   Emmanuel Candes and Benjamin Recht. **Exact matrix completion via convex optimization.** Foundations of Computational Mathematics, 2009.
### Visual Description
This slide lists two more categories of SDP applications in Machine Learning: Clustering and Community Detection, and Matrix Completion. Each category has bullet points citing relevant research papers.
---
## Page 29
### Content
## SDP Applications in Machine Learning

*   **Deep Learning:**
    *   Aditi Raghunathan, Jacob Steinhardt & Percy Liang: **Certified Defenses Against Adversarial Examples**, ICLR 2018
    *   Mert Pilanci, Tolga Ergen: **Neural Networks are Convex Regularizers: Exact Polynomial-time Convex Optimization Formulations for Two-layer Networks**, ICML 2020
    *   Fazlyab et al, **Efficient and Accurate Estimation of Lipschitz Constants for Deep Neural Networks**, NeurIPS 2019
### Visual Description
This slide lists "Deep Learning" as another category of SDP applications in Machine Learning, with three bullet points citing relevant research papers.
---
## Page 30
### Content
## Thanks for your Attention 🙂
### Visual Description
Text-only slide. The phrase "Thanks for your Attention" is centered on the page, followed by a smiley face emoji.
---
## Page 31
### Content
## Appendix

**Lemma:**
$X \ge 0$
$X_{ii} = 0 \text{ for some } i$
$$ \implies X_{ij} = X_{ji} = 0 \quad \forall j = 1, ..., n $$

**Proof**
Let us prove this by contradiction and assume for some $k$ we have $X_{ik} = X_{ki} \ne 0$.
Consider this submatrix:
$$ \hat{X} = \begin{pmatrix} 0 & X_{ik} \\ X_{ki} & X_{kk} \end{pmatrix} \in \mathbb{R}^{2 \times 2} $$
$$ \det(\hat{X}) = 0 \cdot X_{kk} - X_{ki}^2 < 0 \text{ Therefore } \hat{X} \text{ cannot be positive semidefinite.} $$
This implies that for some $u = [u_1, u_2]^T \in \mathbb{R}^2$ we have that $u^T \hat{X} u < 0$.
### Visual Description
This slide presents a lemma regarding properties of positive semidefinite matrices with zero diagonal elements, followed by the beginning of its proof by contradiction. The proof involves considering a $2 \times 2$ submatrix and its determinant.
---
## Page 32
### Content
## Proof [Continued]
$$ \hat{X} = \begin{pmatrix} 0 & X_{ik} \\ X_{ki} & X_{kk} \end{pmatrix} \in \mathbb{R}^{2 \times 2} $$
$$ u^T \hat{X} u < 0. $$
Now consider the vector $v \in \mathbb{R}^n$ which has the $i$th entry $v_i = u_1$, and the $k$th entry $v_k = u_2$ and is zero everywhere else.
$$ \implies v^T X v = u^T \hat{X} u < 0. $$
Therefore, $X$ cannot be PSD, which is a contradiction.
### Visual Description
This slide continues the proof from the previous page. It reiterates the $2 \times 2$ submatrix and the condition $u^T \hat{X} u < 0$. It then constructs a vector $v$ in $\mathbb{R}^n$ to extend the contradiction to the full matrix $X$, concluding the proof.
---
## Page 33
### Content
Calculating the Dual

### Visual Description
A title slide with the text "Calculating the Dual" centered on a white background. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 34
### Content
Calculating the Dual from Primal

SDP
$$ \min_X C \bullet X $$
$$ \text{s.t. } A_i \bullet X = b_i, \quad i = 1,..., m $$
$$ X \ge 0 $$

Let's rewrite this:
$$ \min_X C \bullet X $$
$$ \text{s.t. } A_i \bullet X - b_i = 0 $$
$$ -X \le 0 $$

$$ L(X, u, V) = C \bullet X + \sum_{i=1}^m u_i(A_i \bullet X - b_i) - V \bullet X \quad u \in \mathbb{R}^m, V \ge 0 $$

$$ = (C + \sum_{i=1}^m u_i A_i - V) \bullet X - \sum_{i=1}^m u_i b_i $$

$$ \Rightarrow g(u, V) = \min_X L(X, u, V) = - \sum_{i=1}^m u_i b_i $$
$$ \text{s.t. } C + \sum_{i=1}^m u_i A_i - V = 0 $$
$$ u \in \mathbb{R}^m, V \ge 0 $$

### Visual Description
The slide presents the process of calculating the dual from a primal Semidefinite Program (SDP). It starts with the primal SDP formulation, then rewrites it to include slack variables implicitly. The Lagrangian $L(X, u, V)$ is defined, followed by its simplification and the derivation of $g(u, V)$, which is the minimization of the Lagrangian with respect to $X$. The equations are displayed in a step-by-step manner.
---
## Page 35
### Content
Calculating the Dual from Primal

$$ \Rightarrow g(u, V) = \min_X L(X, u, V) = - \sum_{i=1}^m u_i b_i $$
$$ \text{s.t. } C + \sum_{i=1}^m u_i A_i - V = 0 $$
$$ u \in \mathbb{R}^m, V \ge 0 $$

SDD
$$ \max_{u,V} - \sum_{i=1}^m u_i b_i $$
$$ \text{s.t. } C + \sum_{i=1}^m u_i A_i - V = 0 $$
$$ u \in \mathbb{R}^m, V \ge 0 $$

Let's rewrite this:
Let $y = -u, S = V$

SDD
$$ \max_{y,S} y^T b $$
$$ \text{s.t. } S = C - \sum_{i=1}^m y_i A_i, $$
$$ S \ge 0 $$

### Visual Description
This slide continues the derivation of the dual problem. It starts with the expression for $g(u, V)$ from the previous slide, which leads to the formulation of the Semidefinite Dual (SDD) problem. The SDD is then rewritten using variable substitutions $y = -u$ and $S = V$, resulting in a more compact form of the dual problem. The equations are presented with brackets indicating the transformation.
---
## Page 36
### Content
Calculating the Dual of the Dual (=Primal)

SDD
$$ \max_{y,S} y^T b $$
$$ \text{s.t. } S = C - \sum_{i=1}^m y_i A_i, $$
$$ S \ge 0 $$

Let's rewrite this: ($x=y$)
$$ \min_{x,S} -x^T b $$
$$ \text{s.t. } S - C + \sum_{i=1}^m x_i A_i = 0, $$
$$ -S \le 0 $$

To calculate the dual, our objective is $\min_{x,S} -x^T b$ (instead of $-\min_{x,S} -x^T b$.)
The final optimal value will need to be multiplied by -1!

$$ L((x, S), U, V) = -x^T b + U \bullet (S - C + \sum_{i=1}^m x_i A_i) - V \bullet S \quad \text{Here } U \in S^n, V \ge 0 $$

$$ = - \sum_{i=1}^m x_i b_i + (U - V) \bullet S - U \bullet C + \sum_{i=1}^m x_i U \bullet A_i $$

$$ = (U - V) \bullet S - U \bullet C + \sum_{i=1}^m x_i (U \bullet A_i - b_i) $$

### Visual Description
The slide focuses on calculating the dual of the dual, which should return the primal problem. It begins with the SDD formulation and then rewrites it in a form suitable for taking its dual, including a note about multiplying the final optimal value by -1. The Lagrangian $L((x, S), U, V)$ for this problem is then defined and expanded algebraically, showing the steps to group terms.
---
## Page 37
### Content
Calculating the Dual of the Dual (=Primal)

$$ L((x, S), U, V) = (U - V) \bullet S - U \bullet C + \sum_{i=1}^m x_i (U \bullet A_i - b_i) \quad U \in S^n, V \ge 0 $$
$$ x \in \mathbb{R}^n, S \in S^n $$

Reminder:
$p^* \doteq \inf_{x \in C} f(x) = \inf_{x \in C} \sup_{u,v \ge 0} L(x,u,v) = \inf_{x \in \mathbb{R}^n} \sup_{u,v \ge 0} L(x, u, v)$
$d^* = \sup_{u,v \ge 0} g(u,v) = \sup_{u,v \ge 0} \inf_{x \in \mathbb{R}^n} L(x,u,v)$

$$ \Rightarrow g(U, V) = \min_{x \in \mathbb{R}^n, S \in S^n} L((x, S), U, V) $$
$$ = -U \bullet C $$
$$ \text{s.t. } U = V $$
$$ U \bullet A_i - b_i = 0 \text{ for } i = 1,..., m $$

SDDD
$$ \max_{U,V} -U \bullet C $$
$$ \text{s.t. } U = V $$
$$ U \bullet A_i - b_i = 0 \text{ for } i = 1,...,m \quad U \in S^n, V \ge 0 $$

### Visual Description
This slide continues the derivation of the dual of the dual. It starts with the simplified Lagrangian from the previous slide. A "Reminder" section clarifies the definitions of primal ($p^*$) and dual ($d^*$) optimal values using the Lagrangian. Then, $g(U, V)$ is derived by minimizing the Lagrangian with respect to $x$ and $S$, leading to the formulation of the Semidefinite Dual of the Dual (SDDD) problem. The constraints for the SDDD are explicitly stated.
---
## Page 38
### Content
SDDD=SDP

SDDD
$$ \max_{U,V} -U \bullet C $$
$$ \text{s.t. } U = V $$
$$ U \bullet A_i - b_i = 0 \text{ for } i = 1,..., m $$
$$ U \in S^n, V \ge 0 $$

This can be simplified:
$$ \max_V -V \bullet C $$
$$ \text{s.t. } V \bullet A_i - b_i = 0 $$
$$ V \ge 0 $$

Let's rewrite this: $[X = V]$
$$ -\min_X C \bullet X $$
$$ \text{s.t. } A_i \bullet X = b_i, \quad i = 1,..., m $$
$$ X \ge 0 $$

As we said before, this final optimal value needs to be multiplied by -1.
Therefore SDDD=SDP

### Visual Description
The slide demonstrates that the Semidefinite Dual of the Dual (SDDD) is equivalent to the original Semidefinite Program (SDP). It starts with the SDDD formulation, simplifies it by substituting $U=V$, and then rewrites the problem by letting $X=V$. The resulting problem is shown to be the negative of the original SDP, confirming that multiplying by -1 recovers the primal. The conclusion "Therefore SDDD=SDP" is highlighted.
---
## Page 39
### Content
LP as a special SDP

### Visual Description
A title slide with the text "LP as a special SDP" centered on a white background. The Carnegie Mellon University logo is in the bottom right corner.
---
## Page 40
### Content
LP as a special SDP

**Theorem:** [LP as a special SDP] Any LP is a special case of an SDP

Consider this LP:
$$ \min_{x \in \mathbb{R}^n} c^T x $$
$$ \text{s.t. } Ax = b, $$
$$ x \ge 0, $$

Then it can be written as a semidefinite program.

Proof [Next Slides]

### Visual Description
The slide presents a theorem stating that any Linear Program (LP) is a special case of a Semidefinite Program (SDP). A standard LP formulation is shown, including the objective function $\min c^T x$ and constraints $Ax=b, x \ge 0$. The slide concludes by stating that this LP can be written as an SDP and indicates that the proof will be covered in subsequent slides.
---
## Page 41
### Content
## LP as a special SDP

$$
\begin{array}{ll}
\min & c^T x \\
x \in \mathbb{R}^n \\
\text{s.t.} & Ax = b, \\
& x \ge 0,
\end{array}
$$

Let $a_i^T$ denote the $i$-th row of $A$, so that

$Ax = b \iff a_i^T x = b_i \quad i = 1, \dots, m.$
### Visual Description
The slide presents the standard form of a Linear Program (LP) and then explains how the matrix equation $Ax=b$ can be broken down into individual row-vector products $a_i^T x = b_i$.
---
## Page 42
### Content
## LP as a special SDP

Define the symmetric matrices
$C := \text{Diag}(c_1, \dots, c_n)$,
$A_i := \text{Diag}(a_{i1}, \dots, a_{in}) \in S^n, \quad i = 1, \dots, m.$

Now associate to each $x \in \mathbb{R}^n$ the diagonal matrix
$X := \text{Diag}(x_1, \dots, x_n) \in S^n.$

Then
$C \bullet X = \text{trace}(CX) = \sum_{j=1}^n c_j x_j = c^T x.$

Also, for each $i = 1, \dots, m,$
$A_i \bullet X = \text{trace}(A_i X) = \sum_{j=1}^n a_{ij} x_j = a_i^T x.$
### Visual Description
This slide defines symmetric diagonal matrices $C$ and $A_i$ based on the coefficients of the LP. It then introduces a diagonal matrix $X$ corresponding to the variable $x$. Finally, it shows how the objective function $c^T x$ and the constraint $a_i^T x$ can be expressed using the trace operator (Frobenius inner product) with these diagonal matrices.
---
## Page 43
### Content
## LP as a special SDP

Hence the linear constraints $Ax = b$ are equivalent to
$A_i \bullet X = b_i, \quad i = 1, \dots, m.$

Finally, since $X$ is diagonal,
$X \ge 0 \iff x_j \ge 0, \quad j = 1, \dots, n.$

Therefore the LP is equivalent to
$$
\begin{array}{ll}
\min_{X \in S^n} & C \bullet X \\
\text{s.t.} & A_i \bullet X = b_i, \quad i = 1, \dots, m, \\
& X \ge 0, \\
& X \text{ is diagonal.}
\end{array}
$$
### Visual Description
The slide continues the conversion of the LP to an SDP-like form. It shows how the linear constraints $Ax=b$ and non-negativity constraints $x \ge 0$ translate into conditions on the diagonal matrix $X$. The final result is an optimization problem minimizing $C \bullet X$ subject to linear equality constraints, a positive semi-definite constraint ($X \ge 0$), and an explicit constraint that $X$ must be diagonal.
---
## Page 44
### Content
## LP as a special SDP

Therefore the LP is equivalent to
$$
\begin{array}{ll}
\min_{X \in S^n} & C \bullet X \\
\text{s.t.} & A_i \bullet X = b_i, \quad i = 1, \dots, m, \\
& X \ge 0, \\
& X \text{ is diagonal.}
\end{array}
$$
This is not the standard SDP form yet, because here we assume $X$ is diagonal.

To put the problem into the standard SDP form with an unrestricted symmetric matrix variable $X \in S^n$, we must also force $X$ to be diagonal.

This can be done by adding linear equality constraints on the off-diagonal entries.
### Visual Description
Text-only slide.
---
## Page 45
### Content
## LP as a special SDP

For each pair $1 \le j \le k \le n$, define the symmetric matrix
$E^{(jk)} := \frac{1}{2}(e_j e_k^T + e_k e_j^T) \in S^n,$
where $e_j$ is the $j$-th standard basis vector in $\mathbb{R}^n$.

Then, for any $X \in S^n$,
$E^{(jk)} \bullet X = \text{trace}(E^{(jk)} X) = X_{jk}.$

Therefore, the constraint $E^{(jk)} \bullet X = 0$ is exactly the condition $X_{jk} = 0$.

Hence the requirement that $X$ be diagonal is equivalent to the family of linear constraints
$E^{(jk)} \bullet X = 0, \quad 1 \le j \le k \le n.$
### Visual Description
This slide introduces a specific symmetric matrix $E^{(jk)}$ constructed from standard basis vectors. It demonstrates that the Frobenius inner product of $E^{(jk)}$ with any symmetric matrix $X$ yields the $(j,k)$-th entry of $X$. This property is then used to show that forcing $X_{jk}=0$ (i.e., making $X$ diagonal) can be achieved by adding linear equality constraints $E^{(jk)} \bullet X = 0$ for all off-diagonal entries.
---
## Page 46
### Content
## LP as a special SDP

Thus the LP is equivalent to the SDP
$$
\begin{array}{ll}
\min_{X \in S^n} & C \bullet X \\
\text{s.t.} & A_i \bullet X = b_i, \quad i = 1, \dots, m, \\
& E^{(jk)} \bullet X = 0, \quad 1 \le j \le k \le n, \\
& X \ge 0.
\end{array}
$$
### Visual Description
The slide presents the final Semidefinite Program (SDP) formulation that is equivalent to the original Linear Program (LP). It includes the objective function, the original linear constraints, the newly added linear constraints to enforce the diagonal structure of $X$, and the positive semi-definite constraint $X \ge 0$.
---
