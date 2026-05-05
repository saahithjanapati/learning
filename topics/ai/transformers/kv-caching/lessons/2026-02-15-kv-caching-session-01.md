# KV Caching Session 01

Date: 2026-02-15
Topic: AI -> Transformers -> KV Caching
Mode: Practice (code-first)

## Session Goal

Build intuition for KV caching by implementing it yourself in PyTorch:
1. Single-head causal self-attention with cache.
2. Batched multi-head cache with shape `[B, H, t, D]`.

## Artifacts Created

- `topics/ai/transformers/kv-caching/practice/kv_cache_exercise.py`
- `topics/ai/transformers/kv-caching/practice/kv_cache_exercise_batched_multihead.py`

## What You Covered

- Full causal forward (`forward_full`) vs decode-time cache updates.
- Query-key score shapes and why prefix length at step `t` is `t+1`.
- Dot-product attention as:
  - explicit matmul
  - equivalent `einsum` form.
- Cache growth invariant:
  - before step: `[B, H, t, D]`
  - after append: `[B, H, t+1, D]`.

## Mistakes Made (And What They Taught)

1. Tried constructing dataclass cache without required fields.
What it taught:
- Dataclass fields without defaults must be passed at construction.

2. Used incorrect `torch.cat` signature and mixed tensor ranks.
What it taught:
- `torch.cat` needs a list/tuple of tensors.
- Ranks must match; add singleton time axis before concatenation.

3. Confused `d_model` and `d_head` in cache last dimension.
What it taught:
- Cache stores per-head vectors, so last dim is `d_head` (`D`), not `d_model`.

4. Minor `einsum` equation typo and shape interpretation confusion.
What it taught:
- `einsum` is concise but unforgiving; syntax and axis letters must be exact.

5. Questioned whether `forward_full` is already a cache.
What it taught:
- It reuses K/V within one pass, but true KV caching persists across decode steps.

## Final Outcome

Both exercises pass correctness checks with exact match (`max abs diff: 0.0`):
- single-head cached decode == full causal forward
- batched multi-head cached decode == full causal forward

## Suggested Next Lessons

1. Prefill vs decode API:
- implement `prefill(x_prompt)` to initialize cache from a prompt,
- then `decode_step(x_new, cache)` for generation.

2. Preallocated cache buffers:
- allocate `[B, H, T_max, D]`,
- write at `cache_pos` instead of repeated concatenation.

3. Vectorized training-time attention with causal mask:
- compare with token-by-token loop for correctness and speed.

4. Positional encodings with cache:
- add RoPE or ALiBi and verify decode equivalence.

## Personal Notes For Future Sessions

- You learn fastest by implementing with TODO scaffolds and hint-only review.
- Keep this interaction style:
  - first pass: broad hints
  - second pass: issue checks
  - final pass: strict correctness validation.
