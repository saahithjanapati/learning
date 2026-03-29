# Optimization for ML - January 27, 2026

## Expository Deep Dive: Matrix Norms, Spectral Quantities, and SVD

Source transcript: `materials/processed/optimization-for-ml/Jan27_matrix_norms.md`

## How to read this lesson

This lecture is linear algebra for optimization rates. When later lectures say "smoothness constant" or "condition number," they are using objects built here.

## 1) Spectrum and stability intuition

You first revisit eigenvalues and the spectral radius:

$$
\rho(A)=\max_{\lambda\in\Lambda(A)}|\lambda|.
$$

A key theorem links algebra to dynamics:

$$
\rho(A)<1 \iff A^t\to0.
$$

This is exactly the kind of statement used when proving contraction of iterative methods.

## 2) Symmetric matrices as the easy case

For symmetric $A$:

- eigenvalues are real
- $A=Q\Lambda Q^\top$ with orthogonal $Q$

Symmetry makes many norm/eigenvalue identities exact and simple.

## 3) SVD is the rectangular analogue of eigendecomposition

For any $A\in\mathbb R^{m\times n}$:

$$
A=U\Sigma V^\top.
$$

Singular values relate to eigenvalues of $A^\top A$ and $AA^\top$:

$$
\sigma_i^2(A)=\lambda_i(A^\top A)=\lambda_i(AA^\top).
$$

This identity is central because $A^\top A$ appears naturally in least squares and GD analysis.

## 4) Matrix norm definitions and why they matter

The lecture defines norm axioms and then induced operator norms:

$$
\|A\|_{\alpha,\beta}=\sup_{x\ne0}\frac{\|Ax\|_\beta}{\|x\|_\alpha}.
$$

Three key computational forms:

- $\|A\|_1$: max absolute column sum
- $\|A\|_\infty$: max absolute row sum
- $\|A\|_2$: spectral/operator norm

with

$$
\|A\|_2=\sqrt{\lambda_{\max}(A^\top A)}=\sigma_{\max}(A).
$$

## 5) The inequality you will keep using

From operator norm definition:

$$
\|Ax\|_2\le \|A\|_2\,\|x\|_2.
$$

This one line is everywhere in optimization proofs.

The lecture also proves:

$$
\rho(A)\le \|A\|_2,
$$

with equality under symmetry.

## 6) Frobenius and nuclear norms

You get two additional important norms:

$$
\|A\|_F=\sqrt{\operatorname{tr}(A^\top A)}=\sqrt{\sum_i\sigma_i^2},
$$

$$
\|A\|_* = \sum_i \sigma_i.
$$

Together with $\|A\|_2$, these form the common trio in ML regularization and analysis.

## 7) Why optimization students need this lecture

Later, when you see:

- $\beta=\lambda_{\max}(Q)$
- $\alpha=\lambda_{\min}(Q)$
- $\kappa=\beta/\alpha$

that is Jan 27 showing up directly inside convergence rates.

## Checkpoint

Be able to answer quickly:

- How is $\|A\|_2$ computed from $A^\top A$?
- How do singular values connect to eigenvalues?
- Why does $\|Ax\|\le\|A\|\|x\|$ matter for optimization proofs?

## Common mistakes

- mixing vector and matrix norm identities
- assuming $\rho(A)=\|A\|_2$ always
- forgetting rectangular matrices are handled through SVD, not direct eigen-decomposition

## One-paragraph recap

Jan 27 provides the spectral constants and inequalities that make optimization rate proofs quantitative. If Jan 20 gave the function structure, Jan 27 gives the matrix-scale tools used to measure algorithm speed.
