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

## Why It Matters

This paper gives the optimistic version of reasoning and calibration: reasoning can make hidden uncertainty easier to read. It pairs naturally with the more cautionary `Reasoning about Uncertainty` paper.

## Questions For Review

1. Why is semantic entropy more reliable than direct confidence in the default setup?
2. What does the reader-model result imply about reasoning traces?
3. Why might fact-retrieval questions benefit from forced exploration?
