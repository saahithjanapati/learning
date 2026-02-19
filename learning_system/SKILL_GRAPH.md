# Skill Graph

Use this as a lightweight skill tree. Status values:
- `not_started`
- `learning`
- `practicing`
- `solid`

## Transformers

| Node | Depends On | Status | Evidence |
|---|---|---|---|
| Attention basics (Q, K, V, softmax weighting) | - | solid | KV cache exercises completed |
| Causal attention (prefix-only context) | Attention basics | solid | Correct `forward_full` reasoning |
| KV cache (single-head, batch=1) | Causal attention | solid | `practice/kv_cache_exercise.py` passes |
| KV cache (batched multi-head [B,H,T,D]) | KV cache single-head | solid | `practice/kv_cache_exercise_batched_multihead.py` passes |
| Prefill vs decode-time caching | KV cache single-head | learning | Concept discussed, no dedicated exercise yet |
| Cache efficiency (preallocation, in-place updates) | KV cache batched multi-head | not_started | No benchmark/implementation yet |
| Positional encoding with cache (RoPE/ALiBi) | KV cache batched multi-head | not_started | No implementation yet |

## Optimization for ML (Quiz 2 Track)

| Node | Depends On | Status | Evidence |
|---|---|---|---|
| Smoothness descent lemma intuition (`eta`, `L`, one-step decrease) | - | practicing | Repeatedly connected `L` to descent range and stability in live checks |
| Conditioning intuition (`kappa=L/mu`, effects of `L` and `mu`, stable `eta` interval) | Smoothness descent lemma intuition | practicing | Correctly explained why larger `L` worsens `kappa` and narrows `eta in (0,2/L)` |
| Convex vs strongly-convex rate distinction (`O(1/T)` vs geometric) | Smoothness descent lemma intuition | learning | Repeated verbal restatements + corrections captured |
| KKT condition mapping (`g_i` vs `h_j`, primal/dual/slackness/stationarity) | Convex optimization basics | practicing | Corrected and stabilized through many micro-checks |
| Solving mixed KKT systems (active-set split + full validation) | KKT condition mapping | practicing | Completed multiple full KKT solves with correct case filtering and feasibility checks |
| Subgradient definition + `|x|` subdifferential intuition | Convex optimization basics | practicing | Correct Q13-Q16 sequence in interactive review; definition and `[-1,1]` stabilized |
| Max-of-affines subgradient (active-branch detection) | Subgradient definition + `|x|` subdifferential intuition | learning | One miss on `max{x,-x,2x+1}` at `x=0`, then corrected to active slope `2` |
| Projected subgradient update + projection behavior | Subgradient basics | practicing | Correct projection and feasibility checks |
| Timed recall under quiz pressure | KKT + subgradient + projected updates | learning | Completed one timed 6-question mixed drill (5/6), then reinforced with guided KKT solves |

## Suggested Next Unlocks

1. Implement prefill + decode split API.
2. Add preallocated cache buffers and token index writes.
3. Add causal masking in a fully vectorized training forward path.
4. Add RoPE and verify cache correctness across decode steps.
5. Continue problem set from Q18 onward (subgradient method -> projected updates -> optimality).
6. Run timed KKT mixed-problem drills (2-3 problems, hint-first).
7. Run short recall sprint for `kappa`, `eta` interval, and subgradient active-branch rules.
