# Efficient Pre-Training with Token Superposition

Source: `https://arxiv.org/abs/2605.06546`
PDF or source page: `https://arxiv.org/pdf/2605.06546`
Tweet resolved from: `https://x.com/nousresearch/status/2054610062836892054`
Authors: Bowen Peng, Theo Gigant, Jeffrey Quesnelle
Source publication: 2026-05-07
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus abstract-level structured ingest

## Summary

The paper introduces Token-Superposition Training, a two-phase pretraining method that first combines contiguous tokens into bags and trains with a multi-hot cross-entropy objective, then returns to standard next-token prediction. The method aims to improve data throughput per FLOP without changing the model architecture, optimizer, tokenizer, parallelism, or dataset. Experiments from 270M to 3B dense models and a 10B active-1B MoE report robust improvements and up to a 2.5x reduction in pretraining time under equal-loss settings.

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
