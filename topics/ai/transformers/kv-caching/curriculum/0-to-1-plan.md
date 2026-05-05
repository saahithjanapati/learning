# KV Caching 0 -> 1 Curriculum

Topic: `ai/transformers/kv-caching`
Path: `topics/ai/transformers/kv-caching`

## Target "1" Outcome

- Explain full causal attention vs decode-time KV caching.
- Implement and debug cache updates for single-head and multi-head forms.
- Reason about shapes confidently: `[t, d]` and `[B, H, t, D]`.

## Prerequisites

- Basic linear algebra (matrix multiply, transpose).
- Softmax attention basics (Q, K, V).
- Basic PyTorch tensor operations (`matmul`, `cat`, `einsum`).

## Modules

1. Foundations
- Causal prefix logic (`t+1` at step `t`).
- Dot-product score shapes.

2. Single-Head Cache
- Build `init -> append -> attend -> decode` path.
- Verify equivalence with full causal forward.

3. Batched Multi-Head Cache
- Track `[B, H, t, D]` invariants.
- Debug append and einsum shape issues.

4. Performance/Production Concepts
- Prefill vs decode API separation.
- Preallocated cache buffers vs repeated concat.

## Exit Checks

- [ ] Implement single-head cache from scaffold.
- [ ] Implement batched multi-head cache from scaffold.
- [ ] Pass correctness checks (cached == full forward).
- [ ] Explain 3 common cache bugs and how to detect them.

## Next Step Candidates

1. Implement prefill/decode split in code.
2. Add preallocated cache with write index.
3. Add positional encoding interaction checks.
