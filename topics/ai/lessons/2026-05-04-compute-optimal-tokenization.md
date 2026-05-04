# Compute Optimal Tokenization

Source note: [materials/processed/ai/compute-optimal-tokenization.md](../../../materials/processed/ai/compute-optimal-tokenization.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper asks a question that most scaling-law discussions quietly ignore: what if the token itself is the wrong fixed unit?

Classical scaling discussions often treat tokenization as background plumbing. But tokenization changes sequence length, compression, modeling difficulty, and how model size trades off with data amount. The paper studies this directly by varying compression rate over a large family of tokenized models.

The main result is elegant: in compute-optimal regimes, parameter counts scale more naturally with data measured in `bytes`, not `tokens`. That means a fixed token count can be misleading because different tokenizers compress information differently. The paper also finds that the optimal compression rate is not fixed; it decreases with compute.

The big lesson is that scaling-law recipes are not really complete if tokenization is held constant.

## Full-Length Version

### The central question

How should tokenization itself enter compute-optimal scaling laws?

### Why this matters

Tokens are not neutral units. Different tokenizers package text at different granularities. That changes:

- sequence length,
- prediction difficulty,
- effective data compression,
- the apparent relation between parameter count and token budget.

### What the paper does

The authors train a very large family of models across multiple compression rates and compare compute-optimal behavior. This lets them ask how token granularity changes the best model/data balance.

### Main finding

The paper says parameter scaling aligns better with data measured in `bytes` than in `tokens`. That is a strong result because it suggests the usual token-based framing hides a more fundamental relationship.

### Second finding

The best compression rate is compute-dependent. A fixed BPE-like setting is not universally optimal.

### Why this matters for LLM practice

If the result generalizes broadly, then tokenizer design is not merely an engineering afterthought. It belongs inside the same optimization loop as model size and data amount.

### Final takeaway

The paper's deepest point is that scaling laws should think in `information units` more than `token counts`, and tokenization is one of the knobs that defines those units.
