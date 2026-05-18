# Reasoning About Uncertainty

Source: `https://arxiv.org/abs/2506.18183`
Authors: Zhiting Mei, Christina Zhang, Tenny Yin, Justin Lidard, Ola Shorinwa, Anirudha Majumdar
Published: `2025-06-23`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for reasoning-model uncertainty`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; reasoning; post-training`

## Summary

This paper asks whether reasoning models know when they do not know. It evaluates calibration and uncertainty behavior in reasoning models, including whether deeper reasoning improves calibration.

The headline result is cautionary. Reasoning models can remain overconfident, especially on incorrect answers, and deeper reasoning does not automatically fix calibration. Introspective uncertainty prompting can help some models and settings, but the effect is not uniform.

## Core Ideas

- Reasoning ability and uncertainty calibration are separable.
- More reasoning can surface uncertainty, but it can also rationalize false confidence.
- Calibration must be evaluated directly, not inferred from benchmark accuracy.
- Introspective UQ is model- and setup-dependent.

## Why It Matters

This paper prevents a simplistic conclusion that chain-of-thought or reasoning-model RL solves metacognition. Reasoning is useful evidence only if the model can audit it faithfully.

## Questions For Review

1. Why can a strong reasoning model still be poorly calibrated?
2. Why might deeper reasoning worsen overconfidence?
3. What would a robust reasoning-model uncertainty benchmark need to measure?
