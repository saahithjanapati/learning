# Teaching Models To Express Their Uncertainty In Words

Source: `https://arxiv.org/abs/2205.14334`
Authors: Stephanie Lin, Jacob Hilton, Owain Evans
Published: `2022-05-28`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for verbalized uncertainty and calibration`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; post-training`

## Summary

This paper shows that GPT-3 can be trained to express calibrated uncertainty about its own answers in natural language, without using model logits. The model generates an answer plus a confidence phrase or number, and those expressions map to probabilities that are reasonably calibrated.

The paper introduces CalibratedMath for testing verbalized confidence and compares confidence expressed in words with uncertainty extracted from logits. Both can generalize calibration under distribution shift. The authors also argue that calibration depends on pretrained latent representations correlated with epistemic uncertainty.

## Core Ideas

- Natural-language confidence can be trained and evaluated as calibration.
- Verbalized probability can work without exposing model logits.
- Distribution shift remains a key stress test.
- The result suggests models contain latent uncertainty signals that can be surfaced through language.

## Why It Matters

This is the linguistic-calibration anchor for the batch. It moves uncertainty from a hidden statistic to something a user can read and act on.

## Questions For Review

1. What is verbalized probability?
2. Why does calibration under distribution shift matter?
3. Why is natural-language uncertainty useful even when logits are available?
