# 10-715: Perceptron, Margins, And The First Real Proof Pattern

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-03-perceptrons.md` and the course curriculum in `topics/advanced-machine-learning-10-715-cmu/curriculum/0-to-1-plan.md`.

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [The perceptron as an algorithm](#the-perceptron-as-an-algorithm)
- [The margin picture](#the-margin-picture)
- [The mistake-bound proof](#the-mistake-bound-proof)
- [What to remember](#what-to-remember)
- [Quick Check](#quick-check)

## Why this lesson exists

The perceptron is easy to underestimate. It looks like a tiny algorithm: predict with a linear separator, and whenever the prediction is wrong, move the weight vector toward the misclassified example. In 10-715, though, this is the first place where the course's main style appears:

- define an algorithm,
- state the hidden assumption under which it works,
- translate geometry into inequalities,
- prove a performance guarantee.

That pattern returns in SVMs, PAC learning, uniform convergence, online learning, and even later generative modeling theory.

## The perceptron as an algorithm

For binary classification, examples are pairs `(x_i, y_i)` where `y_i` is either `+1` or `-1`. A linear classifier predicts by the sign of an inner product:

```text
prediction = sign(w dot x)
```

If the classifier is correct, then `y_i (w dot x_i) > 0`. If it is wrong or exactly on the boundary, then `y_i (w dot x_i) <= 0`.

The perceptron update is:

```text
w <- w + y_i x_i
```

This update is not magic. If `y_i = +1`, the algorithm adds `x_i`, making `w dot x_i` larger next time. If `y_i = -1`, it subtracts `x_i`, making `w dot x_i` smaller next time. The label tells the algorithm which direction would have made the current example more correct.

## The margin picture

The guarantee does not say "the perceptron always works." It says something more precise: if the data are linearly separable with margin, then the perceptron makes only finitely many mistakes.

Assume there is a unit vector `u` such that every example satisfies:

```text
y_i (u dot x_i) >= gamma
```

The vector `u` is the ideal separator, and `gamma` is the margin. Also assume every example has bounded norm:

```text
||x_i|| <= R
```

The ratio `R / gamma` measures how hard the geometry is. Large margin means the separator has breathing room. Large radius means examples can push the algorithm around more.

## The mistake-bound proof

The proof has two halves. One says progress toward the ideal separator grows at least linearly with mistakes. The other says the weight vector's norm grows at most like the square root of mistakes.

Let `w_t` be the weight vector after `t` mistakes.

First, progress toward the good separator:

```text
w_{t+1} dot u = (w_t + y_i x_i) dot u
              = w_t dot u + y_i (x_i dot u)
              >= w_t dot u + gamma
```

After `M` mistakes:

```text
w_M dot u >= M gamma
```

Second, norm growth. On a mistaken example, `y_i (w_t dot x_i) <= 0`, so:

```text
||w_{t+1}||^2
= ||w_t + y_i x_i||^2
= ||w_t||^2 + 2 y_i (w_t dot x_i) + ||x_i||^2
<= ||w_t||^2 + R^2
```

After `M` mistakes:

```text
||w_M||^2 <= M R^2
```

Now combine the two by Cauchy-Schwarz:

```text
M gamma <= w_M dot u <= ||w_M|| ||u|| <= sqrt(M) R
```

Since `||u|| = 1`, rearrange:

```text
M <= (R / gamma)^2
```

That is the perceptron mistake bound.

## What to remember

The proof is not just about the perceptron. It is a reusable template:

- lower-bound progress toward a good comparator,
- upper-bound how large the algorithm's state can become,
- combine the two inequalities to bound failure events.

This is why 10-715 treats early linear classifiers seriously. They are small enough to prove, but rich enough to teach the proof moves used later.

## Quick Check

1. Why does the perceptron update use `y_i x_i` instead of just `x_i`?
2. What does the margin `gamma` measure geometrically?
3. In the proof, which inequality uses the fact that the example was misclassified?
4. Why does the final mistake bound get worse when `R` grows or `gamma` shrinks?
