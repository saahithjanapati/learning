# 10-715: VC Dimension, Sauer's Lemma, And No Free Lunch

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-11-learning theory 2.md` and `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-12-learning theory 3.md`.

## Table of Contents

- [Why finite counting is not enough](#why-finite-counting-is-not-enough)
- [Shattering](#shattering)
- [VC dimension](#vc-dimension)
- [Sauer's lemma](#sauers-lemma)
- [No free lunch](#no-free-lunch)
- [Quick Check](#quick-check)

## Why finite counting is not enough

The finite-class PAC theorem is clean, but many useful model classes are infinite. Linear separators in `R^d` are already infinite because the weights are real-valued. Neural networks are much larger still.

So learning theory needs a different measure of class complexity. The size of the parameter set is not the right object. What matters is how many different label patterns the class can realize on finite samples.

## Shattering

A hypothesis class shatters a set of `n` points if it can realize every possible binary labeling of those points.

For `n` points, there are `2^n` possible labelings. If the class can match all of them, then on that set it has total flexibility.

Shattering is deliberately worst-case. It does not ask whether the labels are natural, likely, or meaningful. It asks what the hypothesis class is capable of expressing.

## VC dimension

The VC dimension of a hypothesis class is the largest number of points it can shatter.

This turns "capacity" into a combinatorial object. A class with low VC dimension cannot realize arbitrary labelings of large samples, which means bad hypotheses become easier to rule out from data. A class with infinite VC dimension can behave too flexibly for distribution-free PAC learning without extra restrictions.

The intuition is:

- finite VC dimension gives a controlled effective complexity,
- infinite VC dimension means the class can keep memorizing arbitrary patterns at larger and larger scales.

## Sauer's lemma

The growth function counts how many dichotomies a class can induce on `n` points. If the VC dimension is `d`, Sauer's lemma says the growth function grows polynomially in `n` rather than exponentially once `n > d`.

That is the bridge from finite classes to infinite classes. Instead of union-bounding over all hypotheses, we reason over the number of distinct labelings the class can produce on the sample.

The miracle is not that infinite classes become small. The point is subtler: for generalization, many parameter settings may be equivalent because they label the observed sample the same way.

## No free lunch

No-free-lunch results say that learning is impossible without assumptions. If a class is flexible enough to shatter any finite dataset, training performance alone gives no distribution-free guarantee.

This is not pessimism. It is a warning label. Successful learning depends on structure: margins, smoothness, limited capacity, data distribution assumptions, regularization, optimization bias, architecture, or some other constraint that makes generalization possible.

## Quick Check

1. What does it mean for a hypothesis class to shatter three points?
2. Why can an infinite hypothesis class still have finite VC dimension?
3. What role does Sauer's lemma play in learning-theory proofs?
4. What assumption is no-free-lunch telling you not to forget?
