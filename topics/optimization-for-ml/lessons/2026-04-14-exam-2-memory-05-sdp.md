# SDP Memory Sheet

Use with [[2026-04-14-exam-2-section-05-sdp]].

## PSD Facts
- $X\succeq 0$ means symmetric positive semidefinite.
- If $A,B\succeq 0$, then $A\bullet B\ge 0$.
- For $2\times 2$ symmetric matrices, check principal minors.
- $A\bullet B = \operatorname{trace}(A^TB)$.

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

## What To Memorize
- The gap is primal objective minus dual objective.
- Nonnegativity comes from $S\succeq 0$ and $X\succeq 0$.
- Whitening notation in ICA uses $E[zz^T]=I$, not $E[z^Tz]=I$.

## Likely Exam Traps
- Reversing the gap sign.
- Forgetting the slack matrix $S$ in the dual.
- Forgetting that the PSD inner-product fact is what proves weak duality.
