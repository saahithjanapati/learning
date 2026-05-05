# Topic: KV Caching in Transformers

## What This Topic Covers

- Why KV caching is needed in autoregressive decoding.
- Difference between full causal forward and decode-time cache reuse.
- Cache tensor shapes from simple to realistic setups:
  - Single-head: `[t, d_head]`
  - Batched multi-head: `[B, H, t, D]`

## Folder Layout

- `practice/`
  - `kv_cache_exercise.py` (single-head baseline)
  - `kv_cache_exercise_batched_multihead.py` (batched multi-head)
- `curriculum/`
  - `0-to-1-plan.md`
- `lessons/`
  - Session logs and summaries

## Latest Session

- `lessons/2026-02-15-kv-caching-session-01.md`
