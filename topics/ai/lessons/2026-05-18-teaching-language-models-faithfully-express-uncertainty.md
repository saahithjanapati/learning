# Teaching Language Models To Faithfully Express Their Uncertainty

Source note: This paper lesson is based on Bryan Eikema, Evgenia Ilia, Jose G. C. de Souza, Chrysoula Zerva, and Wilker Aziz, "Teaching Language Models to Faithfully Express their Uncertainty," 2025. Source: [https://arxiv.org/abs/2510.12587](https://arxiv.org/abs/2510.12587). Processed source: [materials/processed/ai/teaching-language-models-faithfully-express-uncertainty.md](../../../materials/processed/ai/teaching-language-models-faithfully-express-uncertainty.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper argues that LLMs often express uncertainty unfaithfully. A model may produce divergent answers across samples while giving a decisive response, or hedge in ways that do not correspond to real instability.

Faithful Uncertainty Tuning trains the model to add hedges aligned with sample consistency while preserving the answer distribution. The goal is not to make the model more timid. It is to make the language match the model's own uncertainty.

The key lesson is that hedging is only useful when it is grounded. "Maybe" is not metacognition unless it tracks a real uncertainty signal.

## Full-Length Version

### The Problem

Many assistants use confident prose even when repeated sampling would show disagreement. This creates a faithfulness gap: the user receives a smoother epistemic picture than the model actually has.

### The Method

FUT samples answers from the model, estimates consistency, augments outputs with hedges matched to that consistency, and fine-tunes the model. It does not require external correctness labels.

### Main Findings

The paper reports reduced faithfulness gaps, preserved QA accuracy, and minimal semantic distribution shift. It also tests robustness across decoding strategies and hedge styles.

### Critique

Sample consistency is an imperfect proxy for truth. A model can consistently produce the same wrong answer. FUT improves uncertainty communication, but it should be paired with retrieval, verification, or external evidence in high-stakes settings.

### Memory Checklist

- Faithful uncertainty means expressed uncertainty tracks model instability.
- FUT uses model samples, not external labels.
- The goal is communication alignment, not answer replacement.
- Generic hedging is not enough.
