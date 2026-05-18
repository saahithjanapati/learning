# Read Your Own Mind

Source note: This paper lesson is based on Jakub Podolak and Rajeev Verma, "Read Your Own Mind: Reasoning Helps Surface Self-Confidence Signals in LLMs," 2025. Source: [https://arxiv.org/abs/2505.23845](https://arxiv.org/abs/2505.23845). Processed source: [materials/processed/ai/read-your-own-mind-reasoning-self-confidence-signals.md](../../../materials/processed/ai/read-your-own-mind-reasoning-self-confidence-signals.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper asks why self-reported confidence is often worse than semantic entropy. The authors' hypothesis is that semantic entropy works because it spends more test-time compute exploring possible answers.

When DeepSeek R1-32B is forced to reason longer before answering, its verbal confidence becomes more useful. A separate reader model can reconstruct similar confidence from the reasoning chain alone, suggesting the chain contains surfaced alternatives and uncertainty cues.

The lesson is that reasoning can improve confidence when it genuinely explores the answer distribution. Reasoning is useful because it exposes uncertainty evidence, not because chain-of-thought is magically calibrated.

## Full-Length Version

### The Problem

In a direct answer-then-confidence setup, models can be overconfident. Semantic entropy is more reliable but expensive because it requires many samples.

### The Method

The paper studies DeepSeek R1-32B on QA tasks. It compares direct verbal confidence with uncertainty estimates after long reasoning and with reader models that inspect only the chain.

### Main Findings

Forced long reasoning improves verbal score effectiveness. The reader model result suggests that the chain itself contains confidence-relevant signals, such as alternative hypotheses or signs of instability.

### Critique

The result depends on reasoning being exploratory. If reasoning becomes rationalization, it may increase confidence without improving truth tracking. This is why the paper should be read alongside `Reasoning about Uncertainty`.

### Memory Checklist

- Semantic entropy explores the generative distribution.
- Long reasoning can surface alternatives.
- Confidence can be a statistic of the reasoning trace.
- Reasoning helps only when it exposes uncertainty rather than hides it.
