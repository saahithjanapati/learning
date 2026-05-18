# Language Models Mostly Know What They Know

Source: `https://arxiv.org/abs/2207.05221`
Authors: Saurav Kadavath, Tom Conerly, Amanda Askell, Tom Henighan, Dawn Drain, Ethan Perez, Nicholas Schiefer, et al.
Published: `2022-07-11`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for metacognition and self-knowledge`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; interpretability; post-training x interpretability`

## Summary

This paper studies whether language models can evaluate their own answers and predict when they know enough to answer a question. It introduces two useful targets: `P(True)`, the probability that a proposed answer is correct, and `P(IK)`, the probability that the model knows the answer without relying on a particular proposed answer.

The main finding is cautiously optimistic. Larger models can be well calibrated on multiple-choice and true/false formats, can assign useful `P(True)` estimates to their own open-ended answers, and improve when allowed to inspect many of their own samples. Models can also learn `P(IK)` style knowledge-boundary predictions, though calibration under new tasks remains difficult.

## Core Ideas

- Self-evaluation depends heavily on format and elicitation.
- `P(True)` is answer-level verification; `P(IK)` is task-level knowledge-boundary estimation.
- Looking at multiple self-samples improves self-evaluation.
- The result supports honest-model training, but does not imply models naturally behave honestly in deployment.

## Why It Matters

This is the foundation paper for metacognitive LLM work. It turns "does the model know?" into a measurable target and gives later papers a vocabulary for uncertainty-aware agents: answer, verify, retrieve, or abstain depending on whether the model's own state suggests enough knowledge.

## Questions For Review

1. Why is `P(True)` easier to evaluate than `P(IK)`?
2. Why does letting a model inspect many samples help self-evaluation?
3. What does the paper show about honesty, and what does it not show?
