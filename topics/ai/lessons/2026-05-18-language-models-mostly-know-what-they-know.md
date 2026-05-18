# Language Models Mostly Know What They Know

Source note: This paper lesson is based on Saurav Kadavath, Tom Conerly, Amanda Askell, Tom Henighan, Dawn Drain, Ethan Perez, Nicholas Schiefer, et al., "Language Models (Mostly) Know What They Know," 2022. Source: [https://arxiv.org/abs/2207.05221](https://arxiv.org/abs/2207.05221). Processed source: [materials/processed/ai/language-models-mostly-know-what-they-know.md](../../../materials/processed/ai/language-models-mostly-know-what-they-know.md).

Filing note: This is filed under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper asks whether language models can judge their own knowledge. The key distinction is between `P(True)` and `P(IK)`. `P(True)` asks whether a particular proposed answer is true. `P(IK)` asks whether the model knows the answer before judging any particular answer.

The result is encouraging but limited. Larger models can give useful, sometimes well-calibrated estimates in the right formats. Self-evaluation also improves when the model can inspect multiple of its own samples. But calibration is not automatic, especially for `P(IK)` on new tasks.

The paper matters because it gives metacognition a measurable shape. It does not prove that models are honest by default. It shows that useful self-knowledge signals can sometimes be elicited and may improve with scale and better training.

## Full-Length Version

### What Problem The Paper Solves

LLMs often produce fluent answers whether or not they know the answer. A trustworthy assistant needs more than accuracy; it needs to expose when it is uncertain. This paper turns that vague requirement into experiments.

### The Method

The authors first test calibration in multiple-choice and true/false settings. Then they move to open-ended sampling by asking the model to produce an answer and estimate `P(True)`, the probability that the answer is correct. They also train models to estimate `P(IK)`, the probability that the model knows the answer independent of a proposed answer.

### Main Findings

`P(True)` works better than one might expect, especially for larger models and when models can inspect several candidate samples. `P(IK)` is also learnable and reacts appropriately to helpful context or hints, but it generalizes less cleanly across tasks.

### Critique

The result depends on elicitation format. It is evidence of latent self-knowledge, not a guarantee of deployed honesty. The paper also predates many modern reasoning and agentic setups, so later work has to retest the idea under stronger models and tool-use loops.

### Memory Checklist

- `P(True)` is answer-level self-evaluation.
- `P(IK)` is knowledge-boundary estimation.
- Multiple self-samples improve evaluation.
- Self-knowledge is present but format-sensitive.
