# 10-715: PAC Learning And Finite Hypothesis Classes

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-10-learning theory 1.md` and `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-11-learning theory 2.md`.

## Table of Contents

- [The question learning theory asks](#the-question-learning-theory-asks)
- [Risk, empirical risk, and realizability](#risk-empirical-risk-and-realizability)
- [PAC in plain language](#pac-in-plain-language)
- [The finite-class theorem](#the-finite-class-theorem)
- [Why the proof works](#why-the-proof-works)
- [Quick Check](#quick-check)

## The question learning theory asks

Supervised learning starts with a practical hope: if a model does well on training data, it should do well on future data. Learning theory asks when that hope is justified.

In 10-715, this is where informal ML language becomes quantified. "Works well" becomes low risk. "With enough data" becomes a sample-complexity statement. "Probably" becomes probability at least `1 - delta`.

## Risk, empirical risk, and realizability

The true risk of a classifier is its expected loss on fresh examples from the data distribution:

```text
R(h) = P(h(X) != Y)
```

The empirical risk is the observed training error:

```text
R_hat(h) = number of training mistakes / n
```

The realizable setting assumes there exists some hypothesis in the class with zero true error. That is a strong assumption, but it makes the first theorem clean.

The goal is not just to fit the sample. The goal is to say: if the learner returns a hypothesis that fits the sample, then with high probability its true error is small.

## PAC in plain language

PAC stands for probably approximately correct.

- "Probably" means the guarantee can fail with probability at most `delta`.
- "Approximately correct" means the returned hypothesis has true error at most `epsilon`.
- The theorem should say how many samples are sufficient to get that guarantee.

PAC learning is not a claim that every run gives the perfect classifier. It is a framework for connecting sample size, hypothesis-class size, target accuracy, and confidence.

## The finite-class theorem

For a finite hypothesis class `H`, in the realizable setting, a consistent learner needs on the order of:

```text
n >= (log |H| + log(1 / delta)) / epsilon
```

examples to ensure that, with probability at least `1 - delta`, the returned hypothesis has true error at most `epsilon`.

The important structure is:

- larger hypothesis classes require more samples,
- smaller target error requires more samples,
- higher confidence requires more samples, but only logarithmically in `1 / delta`.

## Why the proof works

Call a hypothesis "bad" if its true error is greater than `epsilon`. If a bad hypothesis has error greater than `epsilon`, then the probability it makes no mistakes on `n` independent samples is at most:

```text
(1 - epsilon)^n <= exp(-epsilon n)
```

There may be many bad hypotheses, so use a union bound over `H`:

```text
P(any bad h fits the sample) <= |H| exp(-epsilon n)
```

Set this quantity to be at most `delta`, solve for `n`, and the theorem follows.

This proof is a foundational pattern. It does not inspect the learner's cleverness. It says that, after enough samples, bad hypotheses are unlikely to survive the training set.

## Quick Check

1. What does the realizability assumption buy us?
2. Why do we union-bound over the hypothesis class?
3. Why does the theorem depend on `log |H|` rather than directly on `|H|`?
4. What changes when the hypothesis class is infinite?
