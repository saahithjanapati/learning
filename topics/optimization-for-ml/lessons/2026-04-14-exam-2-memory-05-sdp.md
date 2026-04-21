# SDP Memory Sheet

Use with [[2026-04-14-exam-2-section-05-sdp]].

## Table of Contents

- [[#PSD Facts]]
- [[#Useful Small PSD Tests]]
- [[#Schur Complement]]
- [[#Standard SDP Pair]]
- [[#Weak Duality Identity]]
- [[#Complementary Slackness and Gram View]]
- [[#Modeling View]]
- [[#What To Memorize]]
- [[#Likely Exam Traps]]


## PSD Facts
- $X\succeq 0$ means symmetric positive semidefinite.
- If $A,B\succeq 0$, then $A\bullet B\ge 0$.
- For $2\times 2$ symmetric matrices, check principal minors.
- $A\bullet B = \operatorname{trace}(A^TB)$.

## Useful Small PSD Tests
- For
$$
X=
\begin{pmatrix}
a & b\\
b & d
\end{pmatrix},
$$
PSD means
$$
a\ge 0,\qquad d\ge 0,\qquad ad-b^2\ge 0.
$$
- In the common special case
$$
\begin{pmatrix}
1 & a\\
a & 1
\end{pmatrix},
$$
PSD iff
$$
1-a^2\ge 0 \iff a\in[-1,1].
$$

## Schur Complement
- Core block test:
$$
\begin{pmatrix}
A & B\\
B^T & C
\end{pmatrix}\succeq 0
\iff
A\succeq 0
\text{ and }
C-B^TA^{-1}B \succeq 0
$$
under the usual invertibility assumption on $A$.
- For `2 x 2` scalar blocks, this reduces to the principal-minor test.
- Exam use:
  - recognize a block PSD condition quickly
  - convert it into a scalar or matrix inequality you already know

## Standard SDP Pair
- Primal:
$$
\min_X C\bullet X \quad \text{s.t. } A_i\bullet X=b_i,\; X\succeq 0.
$$
- Dual:
$$
\max_y b^Ty \quad \text{s.t. } C-\sum_i y_i A_i = S,\; S\succeq 0.
$$

## Weak Duality Identity
$$
C\bullet X - b^Ty = S\bullet X \ge 0.
$$
This is the key formula to remember.

## Complementary Slackness and Gram View
- At optimality with zero duality gap,
$$
S\bullet X=0.
$$
- Since both are PSD, the lecture uses this to conclude the SDP complementary-slackness picture.
- Gram-matrix view:
  - PSD matrices often arise because they are Gram matrices of vectors
  - this is the modeling move behind SDP relaxations and SOS formulations
- If you see inner products of vectors turned into matrix variables, think “Gram matrix” and “PSD constraint.”

## Modeling View
- LP is a special SDP:
  - diagonal PSD constraints are just coordinatewise nonnegativity.
- Standard relaxation pattern:
$$
X=xx^T
\quad \Rightarrow \quad
X\succeq 0,\;\operatorname{rank}(X)=1.
$$
- SDP relaxations usually keep $X\succeq 0$ and drop the hard rank-one condition.
- SOS uses the same PSD / Gram-matrix modeling idea.

## What To Memorize
- The gap is primal objective minus dual objective.
- Nonnegativity comes from $S\succeq 0$ and $X\succeq 0$.
- Schur complement is one of the main quick PSD-recognition tools.
- LP-as-SDP and rank-drop relaxations are the main modeling viewpoints.
- The weak-duality identity is the main exam proof line.
- Small PSD tests are worth being able to do from memory.

## Likely Exam Traps
- Reversing the gap sign.
- Forgetting the slack matrix $S$ in the dual.
- Forgetting that the PSD inner-product fact is what proves weak duality.
- Forgetting symmetry when testing PSD.
- Using Schur complement without checking the needed invertibility assumption.
- Missing the Gram-matrix interpretation in SDP modeling questions.
