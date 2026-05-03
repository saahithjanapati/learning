# 10-715: SVM Duality, Support Vectors, And Kernels

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-04-linear SVMs.md`, `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-05-kernel methods.md`, and `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-07-proofs of representer and mercer theorems.md`.

## Table of Contents

- [Why SVMs come after perceptrons](#why-svms-come-after-perceptrons)
- [The margin optimization problem](#the-margin-optimization-problem)
- [Why the dual matters](#why-the-dual-matters)
- [Support vectors](#support-vectors)
- [Kernels](#kernels)
- [Quick Check](#quick-check)

## Why SVMs come after perceptrons

The perceptron asks: can we find some separating hyperplane? The support vector machine asks a sharper question: among all separating hyperplanes, can we find the one with the largest margin?

That shift matters because 10-715 is not only interested in fitting training data. It is interested in inductive bias. A maximum-margin separator is a way of saying: prefer the separator that leaves the most room around the decision boundary.

## The margin optimization problem

For labels `y_i in {+1, -1}`, a separating hyperplane should satisfy:

```text
y_i (w dot x_i + b) >= 1
```

The geometric margin is proportional to `1 / ||w||`, so maximizing margin is equivalent to minimizing `||w||^2` subject to correct classification constraints:

```text
minimize    (1/2) ||w||^2
subject to  y_i (w dot x_i + b) >= 1 for all i
```

Soft-margin SVMs add slack variables when perfect separation is too strict. The point is the same: trade off margin size against training violations.

## Why the dual matters

The primal problem talks directly about `w`. The dual problem talks about coefficients on training examples. Introduce Lagrange multipliers `alpha_i >= 0`, one per constraint. The optimization implies:

```text
w = sum_i alpha_i y_i x_i
```

This is a central 10-715 moment. The classifier's weight vector is not an arbitrary vector. It is a weighted combination of the training examples.

The dual objective depends on data only through inner products:

```text
x_i dot x_j
```

That fact opens the door to kernels.

## Support vectors

Most training examples do not determine the final boundary. The active points are the ones with nonzero `alpha_i`. These are support vectors.

Geometrically, support vectors sit on or inside the margin boundary. Algebraically, they are the examples whose constraints matter in the optimum. If `alpha_i = 0`, that training point disappears from the final expansion of `w`.

This is why SVMs feel sparse compared with many other methods. The final classifier can often be described through a subset of influential examples.

## Kernels

A kernel is a valid similarity function that behaves like an inner product in some feature space:

```text
K(x, z) = phi(x) dot phi(z)
```

The feature map `phi` may be high-dimensional or implicit. The algorithm does not need to construct `phi(x)` directly if every computation can be written through `K(x, z)`.

This is the kernel trick. It lets a linear method in feature space become a nonlinear method in the original input space.

The caution is that not every similarity score is a valid kernel. Kernel validity is tied to positive semidefinite Gram matrices. If the kernel is not valid, the optimization and geometry that support the method can break.

## Quick Check

1. Why does minimizing `||w||^2` maximize margin?
2. What does `alpha_i = 0` mean for a training example?
3. Why does the dual formulation make kernels possible?
4. What is the difference between "a similarity function" and "a valid kernel"?
