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

## Detailed Paper Notes

This paper sharpens the verbalized-uncertainty problem. It is not enough for a model to hedge more often or attach plausible confidence words to answers. The key question is whether the expressed uncertainty is faithful to the model's own uncertainty. If repeated samples from the same model produce inconsistent answers, but the final response sounds certain, the model is communicating uncertainty badly.

Faithful Uncertainty Tuning builds on the idea that a model's own sample distribution contains information about its uncertainty. If many samples agree semantically, then a confident expression may be appropriate. If samples diverge across incompatible meanings, then the model should hedge or communicate uncertainty. The training data is constructed to align generated uncertainty expressions with this sample consistency signal.

The paper is careful about preserving the underlying answer distribution. The goal is not to make the model answer fewer questions, change every answer, or become generically cautious. It is to improve the mapping from internal/sample-level uncertainty to the words used in the final response. That distinction matters because indiscriminate hedging can reduce usefulness while still looking safer.

The method evaluates a "faithfulness gap": the mismatch between what the model's repeated behavior reveals about uncertainty and what the single generated response expresses. Reducing this gap means the final answer becomes a better report of the model's own instability. The paper reports that the method can improve faithful uncertainty expression while preserving QA accuracy and avoiding large semantic shifts.

The limitation is that sample consistency is only a proxy for uncertainty. A model can consistently give the same wrong answer, especially if the error is memorized, systematic, or caused by a shared false premise. Conversely, a model can produce varied paraphrases that are semantically equivalent if clustering is imperfect. FUT therefore improves uncertainty communication, but it does not replace correctness verification or retrieval.

For the broader metacognition thread, this paper is important because it treats uncertainty expression as a faithfulness problem. The target is not "sound humble." The target is "say uncertainty words when the model's own behavior gives evidence that uncertainty is warranted."

## Method And Evaluation Details To Preserve

FUT is best understood as communication alignment rather than knowledge improvement. It does not primarily try to make the model know more. It tries to make the model's outward uncertainty better match uncertainty already visible in its sampled behavior.

That distinction explains why preserving semantic distribution matters. If the tuning process changed answers heavily, improved uncertainty expression could be confounded with improved QA behavior. By trying to keep the underlying answer distribution stable, the paper isolates the communication problem: the same approximate model knowledge should be reported more faithfully.

The relevant evaluation therefore includes both faithfulness and task preservation. A good method should reduce the mismatch between sample instability and expressed uncertainty, preserve answer quality, and avoid generic hedging. It should also avoid making the model evasive when it is actually stable.

For future review, compare this paper with the 2022 verbalized uncertainty paper. The earlier paper shows that models can be trained to express calibrated confidence. This paper asks a sharper question: are those expressions grounded in the model's own uncertainty signal?

## Why It Matters

This paper refines the earlier verbalized uncertainty agenda. It treats uncertainty expression as a faithfulness problem, not only a calibration style problem.

## Questions For Review

1. What is the faithfulness gap?
2. Why does FUT try to preserve the underlying answer distribution?
3. How is faithful uncertainty different from generic hedging?
