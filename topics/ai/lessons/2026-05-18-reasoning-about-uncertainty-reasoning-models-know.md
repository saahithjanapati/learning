# Reasoning About Uncertainty

Source note: This paper lesson is based on Zhiting Mei, Christina Zhang, Tenny Yin, Justin Lidard, Ola Shorinwa, and Anirudha Majumdar, "Reasoning about Uncertainty: Do Reasoning Models Know When They Don't Know?", 2025. Source: [https://arxiv.org/abs/2506.18183](https://arxiv.org/abs/2506.18183). Processed source: [materials/processed/ai/reasoning-about-uncertainty-reasoning-models-know.md](../../../materials/processed/ai/reasoning-about-uncertainty-reasoning-models-know.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper is the cautionary companion to optimism about reasoning traces. It asks whether reasoning models know when they do not know and whether deeper reasoning improves calibration.

The answer is mixed. Reasoning models can still be overconfident, especially when wrong. More reasoning can sometimes worsen overconfidence. Introspective uncertainty prompting helps in some cases, but it is not a universal fix.

The lesson is that reasoning capability and epistemic calibration are different properties. Strong benchmark reasoning does not imply the model can honestly report uncertainty.

## Full-Length Version

### The Problem

Reasoning models are trained to produce longer, more deliberate solutions. It is tempting to assume that deliberation also improves uncertainty. This paper tests that assumption.

### The Method

The paper evaluates uncertainty and calibration behavior across reasoning tasks and model settings, including whether deeper reasoning and introspective uncertainty procedures help.

### Main Findings

Reasoning models can be overconfident. Deeper reasoning does not reliably improve calibration. Introspection helps unevenly across models and setups.

### Critique

This does not mean reasoning traces are useless. It means they need explicit calibration objectives, uncertainty audits, or external checks. Reasoning is a substrate for metacognition, not a substitute for it.

### Memory Checklist

- Reasoning and calibration are separable.
- Deeper reasoning can worsen overconfidence.
- Introspection is not uniformly beneficial.
- Calibration must be measured directly.
