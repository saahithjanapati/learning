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

## Probabilistic Graphical Models (Midterm 1 Track)

| Node | Depends On | Status | Evidence |
|---|---|---|---|
| DGM vs UGM mental model (when to use each) | - | learning | Intro summary created in `2026-02-20-midterm-1-intro-summary.md` |
| DGM factorization and ancestral sampling order (`p(x)=\prod_i p(x_i \mid pa_i)`) | DGM vs UGM mental model | learning | DAG factorization and sampling-order intuition covered in intro summary |
| UGM factorization + partition function (`p(x)\propto \prod_C \psi_C(x_C)`, `Z`) | DGM vs UGM mental model | learning | Potentials/energy/normalization relation captured in intro summary |
| Variable elimination mechanics + elimination-order effects | UGM factorization + partition function | learning | Fill-in clique and treewidth bottleneck summarized |
| Belief propagation/message passing on trees | Variable elimination mechanics + elimination-order effects | learning | Sum-product two-pass intuition and exactness-on-trees noted |
| GNN message+aggregation connection to PGMs | Belief propagation/message passing on trees | learning | Message-passing analogy plus objective differences summarized |
| MCMC motivation (high-dimensional + multimodal targets) | UGM factorization + partition function | learning | Approximate-inference motivation and mixing issues introduced |
| Metropolis-Hastings proposal/accept correction | MCMC motivation (high-dimensional + multimodal targets) | learning | Acceptance-ratio workflow documented in intro summary |
| Gibbs sampling full-conditional updates | Metropolis-Hastings proposal/accept correction | learning | Coordinate-wise update and accept=1 special-case relation recorded |
| D-separation to conditional-independence proof pattern | DGM factorization and ancestral sampling order (`p(x)=\prod_i p(x_i \mid pa_i)`) | not_started | HW1 includes formal proof question; not yet practiced end-to-end |
| Tree-Ising exact sampler (upward sum-product + top-down sampling) | Belief propagation/message passing on trees | not_started | HW1 includes full derivation/runtime proof; not yet covered deeply |
| Partition-function/marginal oracle reductions (`Z -> marginals`, `marginals -> Z`) | UGM factorization + partition function (`p(x)\propto \prod_C \psi_C(x_C)`, `Z`) | not_started | HW1 hardness section introduces reductions; currently unfamiliar |
| Factor-graph BP numeric fluency (messages -> beliefs -> factor beliefs -> `Z`) | Belief propagation/message passing on trees | learning | Basic numeric BP done; homework-level full pipeline still partial |
| DGM/UGM/factor-graph conversion fluency + moralization | DGM vs UGM mental model (when to use each) | learning | Intro conversion intuition present; full mixed conversion drills pending |
| MCMC diagnostics (burn-in, mixing, autocorrelation, multimodality) | MCMC motivation (high-dimensional + multimodal targets) | not_started | Conceptual mention only; no diagnostic drill yet |

## Suggested Next Unlocks

1. Implement prefill + decode split API.
2. Add preallocated cache buffers and token index writes.
3. Add causal masking in a fully vectorized training forward path.
4. Add RoPE and verify cache correctness across decode steps.
5. Continue problem set from Q18 onward (subgradient method -> projected updates -> optimality).
6. Run timed KKT mixed-problem drills (2-3 problems, hint-first).
7. Run short recall sprint for `kappa`, `eta` interval, and subgradient active-branch rules.
8. Run a no-notes drill to distinguish DGM vs UGM factorization on 6 toy graphs.
9. Hand-run variable elimination with two elimination orders and compare induced cliques/treewidth.
10. Run one MH step trace and one Gibbs trace (5-10 steps) and explain likely mixing behavior.
11. Prove one d-separation implication by factor regrouping (`P(x,y,z)=f(x,y)g(y,z)` style).
12. Solve one full factor-graph BP problem including factor beliefs and partition function.
13. Derive tree-Ising exact sampler and justify `O(n)` runtime.
14. Execute both directions of hardness-style reductions between `Z` and marginals on a toy Ising model.
15. Run a diagnostics-focused MCMC checkpoint (burn-in, mixing, multimodality failure cases).
