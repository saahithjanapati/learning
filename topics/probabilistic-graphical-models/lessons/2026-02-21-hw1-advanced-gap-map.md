# PGM HW1 Advanced Gap Map (2026-02-21)

## Context

This gap map was created after reviewing:

- [materials/processed/probabilistic-graphical-models/HW1_prompt.md](../../../materials/processed/probabilistic-graphical-models/HW1_prompt.md)
- [topics/probabilistic-graphical-models/live-chats/2026-02-20-live-chat.md](../live-chats/2026-02-20-live-chat.md)

Goal: move from intro fluency to proof-level and algorithm-level fluency for quiz/homework difficulty.

## Solid Baseline (Already Covered)

- DGM vs UGM intuition and factorization basics.
- Clique/maximal clique and potential-function meaning.
- Variable elimination mechanics and elimination-order intuition.
- Belief propagation basics (tree exactness, loopy approximation intuition).
- MCMC basics, MH acceptance ratio mechanics, Gibbs as special-case framing.

## Advanced Gaps That Still Need Coverage

1. Formal d-separation proof pattern.
- Need to prove `dsep(X, Z | Y) => X ⟂ Z | Y` using BN factorization and factor grouping.

2. Tree Ising exact sampling derivation.
- Need full upward sum-product message pass plus top-down conditional sampling argument.
- Need runtime argument (`O(n)` on trees).

3. Inference-complexity reductions.
- Need to derive reductions between partition-function computation and marginal computation.
- Need oracle-style reasoning (construct conditioned models, chain rule product decomposition).

4. Full numeric BP on factor graphs at homework level.
- Need confidence computing variable beliefs, factor beliefs, and partition function from messages.

5. Conversion fluency across representations.
- DGM <-> moralized UGM/factor graph conversions.
- Factor graph <-> UGM/DGM structural translation constraints.

6. Theory-level probability distance/dependence items from HW.
- KL divergence non-metric behavior (triangle-inequality counterexample).
- Mutual information vs covariance dependence notions.

7. MCMC depth beyond mechanics.
- Burn-in, mixing, multimodality failure cases, and estimator reliability checks.

## Recommended Advanced Sequence (Next 6 Sessions)

1. `Proof Core I`: d-separation -> conditional independence proof template.
2. `Inference Core I`: exact BP on trees with factor-belief/`Z` extraction.
3. `Inference Core II`: tree Ising exact sampling derivation and correctness.
4. `Complexity Core`: oracle reductions between marginals and partition functions.
5. `Representation Core`: conversion drills (DGM/UGM/factor graph + moralization).
6. `MCMC Core II`: diagnostics and failure modes (mixing/autocorrelation/multimodality).

## Mastery Criteria (Advanced)

- Can write the d-separation proof without scaffolding.
- Can derive and execute tree-message equations and sample conditionals correctly.
- Can explain both reduction directions (`Z -> marginals` and `marginals -> Z`) step by step.
- Can solve mixed conversion questions without structural mistakes.
- Can justify whether MCMC estimates are trustworthy using diagnostic reasoning.
