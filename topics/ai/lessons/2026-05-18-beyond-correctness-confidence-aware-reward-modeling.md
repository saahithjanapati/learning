# Beyond Correctness

Source note: This paper lesson is based on Qianxi He, Qingyu Ren, Shanzhe Lei, Xuhong Wang, and Yingchun Wang, "Beyond Correctness: Confidence-Aware Reward Modeling for Enhancing Large Language Model Reasoning," 2025. Source: [https://arxiv.org/abs/2511.07483](https://arxiv.org/abs/2511.07483). Processed source: [materials/processed/ai/beyond-correctness-confidence-aware-reward-modeling.md](../../../materials/processed/ai/beyond-correctness-confidence-aware-reward-modeling.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper argues that correctness alone is too thin as a reward for reasoning. A model can get the final answer right while reasoning poorly or guessing with low confidence.

Confidence-aware reward modeling adds confidence information to the reward signal so training can favor robust reasoning, not just answer matching. In STEM reasoning, this matters because final answers are often checkable, but the reasoning path still matters for generalization.

The central risk is that confidence can itself become a proxy to game. Confidence-aware RL only helps if confidence tracks real epistemic strength.

## Full-Length Version

### The Problem

RL on exact correctness rewards all correct final answers similarly. That can reinforce lucky trajectories and shallow shortcuts.

### The Method

The paper proposes reward modeling that includes both correctness and confidence-related signals, aiming to improve the reasoning behavior of LLMs.

### Main Findings

The approach improves reasoning by distinguishing high-confidence robust solutions from weaker correct outputs. It points toward reward models that evaluate epistemic behavior, not just output labels.

### Critique

If confidence is miscalibrated, optimizing it can be harmful. A model might learn to sound confident or manipulate a confidence proxy. This connects directly to reward hacking and faithful uncertainty.

### Memory Checklist

- Correct final answers can be lucky.
- Confidence can enrich the reward signal.
- Rewarding confidence requires calibrated confidence.
- This is uncertainty as training signal, not just evaluation.
