# AdaSearch

Source note: This paper lesson is based on Tzu-Han Lin, Wei-Lin Chen, Chen-An Li, Hung-yi Lee, Yun-Nung Chen, and Yu Meng, "AdaSearch: Balancing Parametric Knowledge and Search in Large Language Models via Reinforcement Learning," 2025. Source: [https://arxiv.org/abs/2512.16883](https://arxiv.org/abs/2512.16883). Processed source: [materials/processed/ai/adasearch-balancing-parametric-knowledge-search.md](../../../materials/processed/ai/adasearch-balancing-parametric-knowledge-search.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

AdaSearch studies the exact agent problem that metacognition should solve: when should a model search, and when should it answer from parametric knowledge?

Search overuse wastes cost and exposes the agent to noisy or malicious information. Search underuse produces hallucination when the model's internal knowledge is insufficient. The paper argues that simply penalizing the number of search calls is too crude.

AdaSearch makes the search decision explicit and trains it separately from problem solving. This turns knowledge-boundary awareness into an observable agent behavior.

## Full-Length Version

### The Problem

Search-augmented agents need a control policy. They must decide when external evidence is worth the cost and risk.

### The Method

AdaSearch uses a two-stage RL framework that disentangles problem solving from the decision to invoke search. It evaluates self-knowledge awareness with a decision metric rather than only counting calls.

### Main Findings

The paper reports improved knowledge-boundary awareness, fewer unnecessary search calls, preserved task performance, and more transparent decision behavior across model families and sizes.

### Critique

The approach still depends on the training distribution defining when search is necessary. Real deployments include adversarial pages, stale web content, and questions whose answerability changes over time.

### Memory Checklist

- Search count is not search quality.
- Over-search and under-search are both failures.
- The target is knowledge-boundary awareness.
- AdaSearch makes tool routing a metacognitive action.
