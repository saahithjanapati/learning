# Learning, Fast and Slow: Towards LLMs That Adapt Continually

Source: `https://arxiv.org/abs/2605.12484`
PDF or source page: `https://arxiv.org/pdf/2605.12484`
Tweet resolved from: `https://x.com/kushasareen/status/2054586907904901245`
Authors: Rishabh Tiwari, Kusha Sareen, Lakshya A Agrawal, Joseph E. Gonzalez, Matei Zaharia, Kurt Keutzer, Inderjit S Dhillon, Rishabh Agarwal, Devvrit Khatri
Source publication: 2026-05-12
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

The paper introduces Fast-Slow Training, where model parameters are slow weights and optimized context acts as fast weights. The goal is to combine the adaptability of in-context learning with the stronger performance of weight updates. FST learns from textual feedback, remains closer to the base model than parameter-only RL, reduces catastrophic forgetting, and improves plasticity in continual learning settings. The authors report up to 3x better sample efficiency than slow learning alone across reasoning tasks.

## Full-Paper Ingest Notes

The full paper argues that LLM adaptation should not be forced into either in-context learning or weight updates. Fast-Slow Training treats optimized context as fast weights and model parameters as slow weights. The fast context absorbs task-specific information and feedback, while the slow parameters learn more durable improvements without drifting as far from the base model.

The method is motivated by catastrophic forgetting and plasticity loss in parameter-only RL. If every transient lesson is written into persistent weights, the model can lose general behavior and become less adaptable to future tasks. FST instead lets context optimization do short-timescale learning while parameter updates stay closer to reusable reasoning behavior.

The experiments report better sample efficiency, higher asymptotic performance, lower KL drift from the base model, less forgetting, and better adaptation to later tasks than parameter-only RL. The Scale-prep connection is direct: many agent and post-training systems need continual adaptation without destroying the capabilities that made the base model useful.

## Why It Matters

This belongs in Scale prep because it addresses continual post-training and how to adapt models without destroying base skills, a recurring problem in real model customization.

## Reading Notes

- Primary theme: fast-slow continual adaptation.
- Tags: post-training; continual learning; RL; context optimization; plasticity.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.12484
- PDF or source page: https://arxiv.org/pdf/2605.12484
- Tweet: https://x.com/kushasareen/status/2054586907904901245
