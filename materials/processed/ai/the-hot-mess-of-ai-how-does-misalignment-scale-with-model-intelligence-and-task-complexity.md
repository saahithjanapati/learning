# The Hot Mess of AI: How Does Misalignment Scale with Model Intelligence and Task Complexity?

Source: `https://alignment.anthropic.com/2026/hot-mess-of-ai/`
Site: `Anthropic Alignment Science Blog`
Published: `2026-02`
Authors: `Alexander Hägele, Aryo Pradipta Gema, Henry Sleight, Ethan Perez, Jascha Sohl-Dickstein`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`

## Summary

This post asks whether advanced AI systems will fail mainly by coherently pursuing the wrong objective or by being a "hot mess" that behaves inconsistently and self-undermines. The main result is that, as tasks get harder and reasoning/action sequences get longer, model failures become increasingly dominated by incoherence rather than by systematic wrong-goal behavior.

## Core Question

The post contrasts two failure modes:

- `systematic misalignment`: the model reliably optimizes the wrong objective,
- `incoherent failure`: the model behaves inconsistently and unpredictably, without steadily pursuing any clear goal.

The authors argue that safety discussions often focus on the first case, but the second case may be at least as important for real systems.

## Main Measurement Idea

The article uses a bias-variance decomposition of model error:

- `bias` = consistent, systematic wrongness,
- `variance` = inconsistent, sample-to-sample wrongness.

They define `error incoherence` as:

$$
\text{Incoherence} = \frac{\text{Variance}}{\text{Error}}
$$

This measures how much of the model's error comes from inconsistency rather than from a stable wrong tendency.

## Main Findings

### 1. Longer reasoning or action sequences lead to more incoherent errors

Across benchmarks, safety evaluations, agentic coding tasks, and synthetic optimization setups, the longer a model reasons or acts, the more variance-dominated its failures become.

Interpretation:

- longer unrolls do not just create more opportunities to be wrong,
- they specifically make the errors less coherent and less repeatable.

### 2. Scale does not consistently make errors more coherent

The relationship between model capability and incoherence is mixed:

- on some easy tasks, larger models make more coherent errors,
- on harder tasks, larger models can remain equally incoherent or become more incoherent,
- in synthetic optimizer experiments, larger models reduce bias faster than variance.

So increasing capability does not reliably turn models into cleaner optimizers.

### 3. Natural overthinking hurts more than extra reasoning budget helps

When models naturally spend unusually long reasoning traces on a problem, incoherence spikes strongly. By contrast, giving them more deliberate reasoning budget through system settings only modestly improves coherence.

The spontaneous variation in reasoning length matters more than the imposed budget change.

### 4. Ensembling reduces incoherence

Combining multiple samples lowers variance, which makes failures more coherent. The post notes that this is theoretically expected, though harder to exploit in settings where agents take irreversible actions.

## Why The Authors Expect Incoherence

Their intuition is that transformers are not naturally coherent optimizers. They are high-dimensional dynamical systems that can be trained to approximate optimization-like behavior, but that property may be brittle.

The article argues:

- getting a model to "know the right target" is one problem,
- getting it to pursue that target reliably over long trajectories is a separate and harder problem,
- scale does not automatically solve the second problem.

## Synthetic Optimizer Experiment

To test this more directly, the authors train transformers to emulate gradient-based optimization on a quadratic objective.

Key result:

- larger models learn the correct objective faster than they learn to optimize it reliably,
- the gap between "aiming at the right thing" and "consistently doing the right thing" grows with scale.

This is the post's cleanest evidence for the idea that coherence is not guaranteed by intelligence alone.

## Safety Interpretation

The post argues that future failures may often look more like industrial accidents than like perfectly coherent paperclip-maximizer behavior. That is:

- the system can still be dangerous,
- but the danger may come from messy, unstable, self-undermining behavior rather than relentless optimization.

At the same time, the authors do not dismiss systematic misalignment. They explicitly say reward hacking and misspecified training objectives still matter, perhaps even more, because bias-like failures remain important even if variance dominates many hard-task failures.

## Practical Takeaways

- Long-horizon agentic tasks may become less predictable in their failure modes, not just less accurate.
- Better capabilities do not guarantee more coherent failure behavior.
- Safety work should not focus only on perfectly coherent bad optimizers.
- Research on reward hacking and goal misspecification remains important because these are the systematic components we may still be able to measure and shape.

## Limits

- Their measurement framework requires well-defined targets, so it applies most cleanly to settings like multiple choice, unit tests, and synthetic objectives.
- It says less about open-ended goals or hidden intentions.
- The post is evidence about error composition, not a complete theory of future misalignment.
