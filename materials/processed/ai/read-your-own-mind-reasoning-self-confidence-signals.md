# Read Your Own Mind

Source: `https://arxiv.org/abs/2505.23845`
Authors: Jakub Podolak, Rajeev Verma
Published: `2025-05-28`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv/ACL metadata plus structured manual ingest`
Strategy: `individual paper normalization for reasoning and self-confidence signals`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; reasoning; post-training x interpretability`

## Summary

This paper studies self-reported confidence in DeepSeek R1-32B on QA tasks. In the default answer-then-confidence setup, the model is often overconfident, while semantic entropy from many samples is more reliable.

The paper hypothesizes that semantic entropy works partly because it spends more test-time compute exploring the model's predictive distribution. When the model is forced to produce a long reasoning chain before answering, verbal confidence becomes more useful. A separate reader model can infer similar confidence from the chain, suggesting the confidence report may summarize alternatives surfaced during reasoning.

## Core Ideas

- Self-reported confidence is unreliable when the model answers too directly.
- Explicit reasoning can expose alternatives and uncertainty signals.
- Semantic entropy is useful partly because it explores the answer distribution.
- A reasoning trace can carry evidence about uncertainty, but only after exploration.

## Detailed Paper Notes

This paper studies a puzzle in model confidence. Directly asking a reasoning model how confident it is after it answers often produces overconfident reports. Meanwhile, semantic entropy computed from many sampled answers can provide a better uncertainty signal. The authors ask whether the advantage of semantic entropy comes partly from the extra inference-time compute spent exploring the model's answer distribution.

The experimental setup focuses on DeepSeek R1-32B and question-answering tasks. In the answer-then-confidence condition, the model tends to give confidence reports that are too high, especially on wrong answers. That is the familiar failure mode: the model can produce a plausible answer and then rationalize certainty after the fact.

The paper then changes the elicitation procedure. If the model is forced to reason at length before answering, it may generate intermediate alternatives, partial checks, conflicting evidence, or signs of struggle. Those traces make the final confidence report more informative. A separate reader model can also infer useful confidence from the reasoning chain, suggesting that the trace contains signals about uncertainty even when the final answer alone does not.

The interpretation is not that chain-of-thought automatically makes models calibrated. The stronger claim is that exploration matters. Semantic entropy works because many samples reveal diversity over possible meanings. Long reasoning can serve a related function inside one trajectory: it gives the model time to surface alternatives before settling on an answer.

This is especially relevant for fact retrieval and knowledge-boundary questions. If a model answers immediately, it may produce the most available association. If it reasons through possibilities, it may notice that several candidates are plausible or that it lacks decisive evidence. That noticed uncertainty can become a better confidence signal.

The caveat is that reasoning traces can also rationalize. A model may produce a long explanation that supports a false answer and then become more confident. The paper's optimistic result should therefore be paired with direct calibration evaluation. Reasoning helps only when it actually explores uncertainty rather than laundering a premature guess into a polished explanation.

## Method And Evaluation Details To Preserve

The key comparison is between direct confidence elicitation, semantic entropy, and reasoning-conditioned confidence. Direct elicitation asks the model for confidence after a normal answer. Semantic entropy estimates uncertainty from many sampled answers. Reasoning-conditioned confidence asks whether a single longer reasoning trajectory can surface enough alternatives to make confidence more reliable.

The reader-model result is important because it separates the information in the trace from the model's own final confidence phrase. If a separate model can infer confidence from the reasoning chain, then the chain contains observable evidence about uncertainty. That supports the idea that reasoning traces can become audit artifacts.

However, the result also raises a supervision question. If confidence evidence lives in the reasoning trace, then training could reward models for producing traces that honestly expose uncertainty. But it could also reward traces that merely look uncertain or rigorous. This connects the paper to process supervision and faithful chain-of-thought debates.

For future review, remember the slogan: reasoning helps confidence when it explores, not when it merely explains. The useful trace is one that considers alternatives, notices missing evidence, and updates confidence accordingly.

## Why It Matters

This paper gives the optimistic version of reasoning and calibration: reasoning can make hidden uncertainty easier to read. It pairs naturally with the more cautionary `Reasoning about Uncertainty` paper.

## Questions For Review

1. Why is semantic entropy more reliable than direct confidence in the default setup?
2. What does the reader-model result imply about reasoning traces?
3. Why might fact-retrieval questions benefit from forced exploration?
