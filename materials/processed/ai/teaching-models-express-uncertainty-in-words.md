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

## Detailed Paper Notes

The paper asks whether a model can express uncertainty in the same channel it uses to answer: ordinary language. Instead of requiring access to logits or external calibration tools, the model is trained to say things like a probability, confidence phrase, or uncertainty statement alongside its answer. The research question is whether those verbalized expressions correspond to empirical correctness.

The important conceptual move is that calibration is evaluated at the level of generated text. If the model says it is 80 percent confident, then roughly 80 percent of such answers should be correct. This turns hedging and confidence phrases into measurable behavior rather than style. The model is not merely encouraged to sound cautious; its words are judged against correctness frequencies.

CalibratedMath is one of the paper's key test beds because mathematical questions give clear correctness labels while still requiring reasoning. The authors compare verbalized uncertainty with other uncertainty sources, including logit-based signals. A major result is that models can learn useful verbal confidence even when the evaluator does not inspect model internals. This matters for deployed systems where users only see text and may not have access to token probabilities.

The distribution-shift experiments are especially important. Calibration that only works on the training distribution is fragile. The paper studies whether trained uncertainty expressions remain meaningful when task conditions change. The result supports the idea that pretrained models already contain latent signals correlated with epistemic uncertainty, and training can teach the model to translate those signals into words.

The caveat is that verbalized uncertainty is not automatically faithful. A model can learn a social style of confidence or hedging that is decoupled from what it internally knows. Later work on faithful uncertainty pushes directly on this problem. This paper is still foundational because it shows that natural-language uncertainty can be a trainable, measurable interface between model state and user-facing communication.

The practical implication is strong: for assistants, a calibrated sentence can be more useful than a hidden probability. A user needs to know whether to trust, verify, or ask follow-up questions. Verbal confidence is the bridge from internal uncertainty to human decision-making.

## Method And Evaluation Details To Preserve

The paper should be remembered as an interface result. It shows that uncertainty can be made legible through the same medium as the answer. That is different from methods that require access to logits, ensembles, or hidden states.

The important evaluation object is calibration of expressions. A confidence phrase or number has empirical content only if it maps to observed correctness frequencies. This turns natural language into a quantitative signal: "very likely" and "50 percent sure" are not just stylistic choices; they are claims that can be binned and checked.

The distribution-shift angle matters because real deployments rarely match training data. If verbalized uncertainty only works on the calibration dataset, it will fail exactly where users most need it. The paper's broader significance is that pretrained models may already encode some uncertainty-relevant features, and fine-tuning can teach the model to report them.

For future review, keep the limitation in view. A calibrated phrase on a benchmark is not the same as faithful uncertainty in an arbitrary conversation. Later work adds sample-consistency and faithfulness constraints to address this gap.

## Why It Matters

This is the linguistic-calibration anchor for the batch. It moves uncertainty from a hidden statistic to something a user can read and act on.

## Questions For Review

1. What is verbalized probability?
2. Why does calibration under distribution shift matter?
3. Why is natural-language uncertainty useful even when logits are available?
