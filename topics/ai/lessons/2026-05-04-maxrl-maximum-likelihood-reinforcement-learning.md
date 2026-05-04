# MaxRL: Maximum Likelihood Reinforcement Learning

Source note: [materials/processed/ai/maxrl-maximum-likelihood-reinforcement-learning.md](../../../materials/processed/ai/maxrl-maximum-likelihood-reinforcement-learning.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)

## Medium-Length Version

MaxRL is trying to answer a practical question in post-training: for code and reasoning tasks, what we often care about is not just "did the model's first sample get it right?" but "how likely is the model to produce a correct answer if I let it try a few times?"

That makes plain maximum likelihood and plain RL feel slightly misaligned. Maximum likelihood has a clean theory but assumes labeled targets. RL can optimize correctness-based rewards but often uses objectives that do not map neatly onto success probability. MaxRL tries to combine the best of both: use RL to optimize a quantity that behaves more like the likelihood of correct outcomes.

The project's headline empirical claim is that MaxRL Pareto-dominates GRPO on its reported benchmarks, giving comparable or better pass-at-1 while improving pass-at-k efficiency substantially. If that holds up broadly, it matters because many real users care about few-shot retry quality, not only single-shot quality.

## Full-Length Version

### The problem setting

Modern reasoning and coding tasks are often graded by correctness. There may be many valid outputs, and the model does not get a neat supervised target string. That makes pure maximum likelihood awkward.

### The paper's core intuition

For each prompt, the model has some probability of generating a correct answer. That success probability acts like an implicit likelihood over correct outcomes. MaxRL says RL should optimize that object more directly.

### Why pass-at-k matters

Pass-at-k is important because users often sample multiple candidates. A method that meaningfully increases the chance that one of those candidates is correct can be much more useful than a method that only slightly improves first-shot behavior.

### What is attractive about the framing

The framing is clean because it connects RL back to a familiar ML instinct: increase the probability mass assigned to success, not merely the average score of a particular sampling pathway.

### What to be cautious about

Project-page results can be promising without yet establishing broad generality. The main questions are:

- how stable MaxRL is across model families,
- whether gains survive different verifiers and reward setups,
- whether better pass-at-k comes with hidden tradeoffs such as verbosity or calibration.

### Final takeaway

MaxRL is interesting because it treats RL for reasoning as a `likelihood-of-correctness` problem rather than only a generic reward-maximization problem.
