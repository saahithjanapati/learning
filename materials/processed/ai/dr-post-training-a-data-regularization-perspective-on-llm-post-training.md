# Dr. Post-Training: A Data Regularization Perspective on LLM Post-Training

Source: `https://arxiv.org/abs/2605.07063`
PDF or source page: `https://arxiv.org/pdf/2605.07063`
Tweet resolved from: `https://x.com/pingbanghu/status/2054689514736828534`
Authors: Pingbang Hu, Xueshen Liu, Z. Morley Mao, Jiaqi W. Ma
Source publication: 2026-05-08
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus abstract-level structured ingest

## Summary

The paper reframes general training data in LLM post-training as a data-induced regularizer rather than only a pool for selection. Dr. Post-Training constructs a feasible set of update directions from general data and projects target-data updates onto that set. This view unifies standard training and data selection as different regularization choices along a bias-variance spectrum. Experiments across SFT, RLHF, and RLVR report better performance than state-of-the-art data-selection baselines with minimal overhead.

## Why It Matters

This belongs in the Scale prep queue because it is about making scarce high-quality post-training data work better without overfitting to narrow target objectives.

## Reading Notes

- Primary theme: data regularization for post-training.
- Tags: post-training; data selection; regularization; RLHF; RLVR.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.07063
- PDF or source page: https://arxiv.org/pdf/2605.07063
- Tweet: https://x.com/pingbanghu/status/2054689514736828534
