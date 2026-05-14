# Efficient Pre-Training with Token Superposition

Source: `https://arxiv.org/abs/2605.06546`
PDF or source page: `https://arxiv.org/pdf/2605.06546`
Tweet resolved from: `https://x.com/nousresearch/status/2054610062836892054`
Authors: Bowen Peng, Theo Gigant, Jeffrey Quesnelle
Source publication: 2026-05-07
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

The paper introduces Token-Superposition Training, a two-phase pretraining method that first combines contiguous tokens into bags and trains with a multi-hot cross-entropy objective, then returns to standard next-token prediction. The method aims to improve data throughput per FLOP without changing the model architecture, optimizer, tokenizer, parallelism, or dataset. Experiments from 270M to 3B dense models and a 10B active-1B MoE report robust improvements and up to a 2.5x reduction in pretraining time under equal-loss settings.

## Full-Paper Ingest Notes

The full paper proposes Token-Superposition Training, a two-phase pretraining method for increasing data throughput per FLOP without changing model architecture, tokenizer, optimizer, or parallelism. In the superposition phase, multiple contiguous tokens are folded into one bag and trained with a multi-hot cross-entropy objective; in the recovery phase, training returns to the ordinary next-token objective.

The authors test the method across 270M, 600M, 3B, and a 10B A1B mixture-of-experts model. The headline result is that TST can reach equal or better loss and downstream evaluation performance with fewer standard-training-equivalent steps, reporting up to a 2.5x total pretraining-time reduction at the 10B A1B scale under equal-loss comparison.

The mechanism is not simply an auxiliary loss. TST changes the early training regime so the model ingests more data tokens per compute step, then uses recovery training to realign with the standard autoregressive task. The key caveat is that the absolute loss during the superposition phase is not directly comparable to standard next-token loss, so the method has to be judged after recovery and downstream evaluation.

## Why It Matters

This belongs in the AI collection as a training-systems paper about reducing pretraining cost with a drop-in objective schedule rather than a new architecture.

## Reading Notes

- Primary theme: token superposition pretraining.
- Tags: pretraining; efficiency; tokenization; training systems.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.06546
- PDF or source page: https://arxiv.org/pdf/2605.06546
- Tweet: https://x.com/nousresearch/status/2054610062836892054
