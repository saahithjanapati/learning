# Teaching Models To Express Their Uncertainty In Words

Source note: This paper lesson is based on Stephanie Lin, Jacob Hilton, and Owain Evans, "Teaching Models to Express Their Uncertainty in Words," 2022. Source: [https://arxiv.org/abs/2205.14334](https://arxiv.org/abs/2205.14334). Processed source: [materials/processed/ai/teaching-models-express-uncertainty-in-words.md](../../../materials/processed/ai/teaching-models-express-uncertainty-in-words.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper shows that GPT-3 can learn to express calibrated uncertainty in natural language. Instead of only outputting an answer, the model outputs an answer plus a confidence statement such as a percentage or verbal label.

The important result is that these confidence expressions can map to real empirical probabilities, and can remain moderately calibrated under distribution shift. The paper also introduces CalibratedMath, a task suite for testing this behavior.

This is a core linguistic-calibration paper. It shows that uncertainty can be communicated through words, not only read from logits or external confidence tools.

## Full-Length Version

### The Problem

Users see prose, not logits. If a model has uncertainty but expresses every answer confidently, it misleads people. If it hedges randomly, people cannot trust the hedge. Calibration must therefore survive the translation into language.

### The Method

The paper trains GPT-3 to answer questions and state confidence. It evaluates whether those confidence statements correspond to observed accuracy, including under distribution shift.

### Main Findings

Verbalized probabilities can be calibrated. They are not merely copied from human examples; the model appears sensitive to uncertainty in its own answers. The paper also finds evidence that pretrained representations already carry uncertainty-relevant information.

### Critique

The paper demonstrates that uncertainty can be expressed, but not that every hedge is faithful. Later work has to ask whether the hedge tracks the model's own instability or is just a learned communication style.

### Memory Checklist

- Verbalized probability is confidence expressed in language.
- Calibration means stated confidence matches empirical accuracy.
- The result works without exposing logits.
- This paper is the bridge from hidden uncertainty to user-facing uncertainty.
