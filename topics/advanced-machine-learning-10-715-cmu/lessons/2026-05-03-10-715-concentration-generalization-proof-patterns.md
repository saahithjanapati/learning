# 10-715: Concentration And Generalization Proof Patterns

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-10-learning theory 1.md`, `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-13-learning theory 4.md`, `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-14-learning theory 5 and bias complexity.md`, and `materials/processed/advanced-machine-learning-10-715-cmu/recitations-04-Recitation_3_Tail_Bounds.md`.

## Table of Contents

- [What concentration does](#what-concentration-does)
- [Single-hypothesis concentration](#single-hypothesis-concentration)
- [Uniform convergence](#uniform-convergence)
- [Bias and complexity](#bias-and-complexity)
- [Reusable proof template](#reusable-proof-template)
- [Quick Check](#quick-check)

## What concentration does

Concentration inequalities formalize a simple idea: averages of independent random variables usually sit near their expectations.

For machine learning, this matters because empirical risk is an average over the sample, while true risk is an expectation over the data distribution. Generalization arguments often ask:

```text
How far can empirical risk be from true risk?
```

Without a concentration statement, "training error approximates test behavior" is only a hope.

## Single-hypothesis concentration

For a fixed hypothesis `h`, the empirical loss values are random variables. If the loss is bounded, inequalities like Hoeffding's inequality can show that:

```text
R_hat(h) is close to R(h) with high probability.
```

The word "fixed" matters. If you choose `h` after seeing the data, you cannot pretend the hypothesis was independent of the sample. A model selected by training has adapted to the training set.

This is why single-hypothesis concentration is not enough for learning. It explains evaluation of one predetermined model, not selection from a large class.

## Uniform convergence

Uniform convergence asks for a stronger event:

```text
For every h in H, R_hat(h) is close to R(h).
```

If this event holds, then empirical risk minimization is justified. The learner may choose the hypothesis after seeing the sample, because all hypotheses have reliable empirical estimates simultaneously.

This is the reason union bounds, growth functions, VC dimension, and Rademacher-style complexity measures matter. They are different ways of paying for simultaneous control over a class of hypotheses.

## Bias and complexity

A tiny hypothesis class may generalize well but fail to express the target. A huge class may fit the target but overfit the sample.

This is the bias-complexity tradeoff:

- bias error comes from the class being too restricted,
- estimation error comes from choosing among too many possibilities with finite data.

10-715 treats this as more than a slogan. The tradeoff shows up inside bounds: one term captures approximation quality, and another captures class complexity or sample size.

## Reusable proof template

Many generalization proofs follow this outline:

1. Define the bad event precisely.
2. Prove a tail bound for one fixed object.
3. Extend from one object to many objects using a union bound or complexity argument.
4. Choose sample size or confidence parameters so the bad event has probability at most `delta`.
5. Translate the high-probability event into the learning guarantee.

When a 10-715 proof feels intimidating, first identify which step it is using. Most proofs are variations on these moves, not brand-new inventions.

## Quick Check

1. Why is concentration for one fixed hypothesis not enough for ERM?
2. What does uniform convergence control?
3. How does class complexity enter a generalization proof?
4. In a proof, what is the "bad event" usually trying to capture?
