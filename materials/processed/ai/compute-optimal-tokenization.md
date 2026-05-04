# Compute Optimal Tokenization

Source: `https://co-tok.github.io/paper.pdf`
Title: `Compute Optimal Tokenization`
Authors: `Tomasz Limisiewicz, Artidoro Pagnoni, Srini Iyer, Mike Lewis, Sachin Mehta, Alisa Liu, Margaret Li, Gargi Ghosh, Luke Zettlemoyer`
Ingested: `2026-05-04`
Extraction engine: `canonical PDF extraction + manual structured ingest`
Strategy: `paper extraction and medium/full lesson normalization`

## Summary

This paper studies a surprisingly under-examined variable in scaling laws: tokenization itself. Instead of treating the token as a fixed unit, the authors vary compression rate and ask how the right token granularity changes compute-optimal training.

Their main empirical claim is that compute-optimal scaling is better expressed in `bytes` than in `tokens`. In other words, the ideal model/data tradeoff tracks information volume more naturally in byte space, while the optimal token compression rate itself changes with compute.

## Main Points

### 1. The paper makes tokenization part of scaling-law analysis

Scaling laws usually choose data amount and model size while holding tokenization fixed. This work relaxes that assumption.

### 2. Bytes matter more than tokens

The central result is that compute-optimal parameter scaling tracks data measured in bytes rather than raw token count.

### 3. Compression rate should adapt with scale

The best token granularity is not a fixed BPE-style constant.
