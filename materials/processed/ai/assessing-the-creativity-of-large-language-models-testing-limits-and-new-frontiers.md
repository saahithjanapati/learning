# Assessing the Creativity of Large Language Models: Testing, Limits, and New Frontiers

Source: `https://arxiv.org/abs/2605.13450`
PDF or source page: `https://arxiv.org/pdf/2605.13450`
Tweet resolved from: `https://x.com/alexiglad/status/2054956610959593887`
Authors: Samuel Schapiro, Alexi Gladstone, Jonah Black, Heng Ji
Source publication: 2026-05-13
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

The paper tests whether common human creativity tests actually predict creative achievement in LLMs across creative writing, divergent thinking, and scientific ideation. It finds that existing tests only partially transfer: DAT best predicts creative writing, Conditional DAT best predicts divergent thinking, and no existing test reliably predicts scientific ideation. The authors introduce DRAT, the Divergent Remote Association Test, which combines convergent and divergent thinking and becomes a significant predictor of scientific ideation ability in their study.

## Full-Paper Ingest Notes

The full paper frames the problem as construct validity: human creativity tests are convenient for LLM evaluation, but they may not predict the downstream creative achievement researchers actually care about. The authors separate convergent thinking, divergent thinking, and creative achievement, then test whether existing automatic creativity tests transfer to LLMs across creative writing, divergent thinking, and scientific ideation.

The empirical design compares existing creativity tests against target benchmarks and finds that test validity is construct-specific. DAT best predicts creative writing, Conditional DAT best predicts divergent thinking, and no existing test reliably predicts scientific ideation. The proposed DRAT combines divergent and convergent pressure in one vocabulary-space task, and the key result is that this combined design predicts scientific ideation better than DAT, RAT, or a simple linear combination of the two.

The full-paper lesson is that evaluation design has to match the target capability. A benchmark can be automated, psychologically inspired, and superficially plausible while still failing to predict the specific kind of creative output the user wants.

## Why It Matters

This belongs in the AI collection because it is an evaluation paper about whether automated creativity metrics measure the construct they claim to measure. It also fits Scale-style evaluation because it asks whether benchmark scores really predict the downstream capability of interest.

## Reading Notes

- Primary theme: LLM creativity evaluation.
- Tags: evaluation; creativity; scientific ideation; scale-context.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.13450
- PDF or source page: https://arxiv.org/pdf/2605.13450
- Tweet: https://x.com/alexiglad/status/2054956610959593887
