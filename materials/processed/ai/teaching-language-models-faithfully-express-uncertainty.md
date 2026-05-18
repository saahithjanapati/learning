# Teaching Language Models To Faithfully Express Their Uncertainty

Source: `https://arxiv.org/abs/2510.12587`
Authors: Bryan Eikema, Evgenia Ilia, Jose G. C. de Souza, Chrysoula Zerva, Wilker Aziz
Published: `2025-10-14`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for faithful uncertainty tuning`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; post-training`

## Summary

This paper argues that LLMs often express uncertainty unfaithfully: repeated queries may produce divergent answers, but the generated response may be unhedged or hedged in ways that do not match that variability.

The proposed method, Faithful Uncertainty Tuning (FUT), builds training data by sampling model responses and adding uncertainty hedges aligned with sample consistency. The goal is to teach the model to express uncertainty without changing its underlying answer distribution. The paper reports reduced faithfulness gaps while preserving QA accuracy and causing minimal semantic distribution shift.

## Core Ideas

- Faithful uncertainty means expressed uncertainty tracks the model's own instability.
- Hedging is not enough if the hedge is not grounded in an uncertainty signal.
- FUT uses model samples and prompts, not external correctness supervision.
- The method tries to preserve answers while improving communication.

## Why It Matters

This paper refines the earlier verbalized uncertainty agenda. It treats uncertainty expression as a faithfulness problem, not only a calibration style problem.

## Questions For Review

1. What is the faithfulness gap?
2. Why does FUT try to preserve the underlying answer distribution?
3. How is faithful uncertainty different from generic hedging?
