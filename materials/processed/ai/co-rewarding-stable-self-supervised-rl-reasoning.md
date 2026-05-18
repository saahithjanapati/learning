# Co-rewarding

Source: `https://arxiv.org/abs/2508.00410`
Authors: Zizhuo Zhang, Jianing Zhu, Xinmu Ge, Zihua Zhao, Zhanke Zhou, Xuan Li, Xiao Feng, Jiangchao Yao, Bo Han
Published: `2025-08-01`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv/OpenReview metadata plus structured manual ingest`
Strategy: `individual paper normalization for self-supervised RL and reasoning`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; evaluation; reward modeling`

## Summary

This paper proposes Co-rewarding, a self-supervised reinforcement learning framework for eliciting reasoning without relying on ground-truth labels. The problem is that naive self-rewarding methods can collapse: a single-view supervision signal lets the model form self-consistent but wrong shortcuts.

Co-rewarding adds complementary supervision. One version derives reward signals from agreement across semantically analogous questions. Another maintains a slowly updated reference teacher for pseudo-label supervision. These discrepancies make collapse on trivial reasoning solutions harder.

## Core Ideas

- RLVR scales reasoning but depends on verifiable ground-truth labels.
- Self-rewarding can collapse through self-consistent illusions.
- Cross-view agreement and slow-teacher supervision stabilize training.
- Disagreement is a useful resource for self-supervised reasoning.

## Why It Matters

This paper belongs in the uncertainty batch because metacognition often depends on seeing when views disagree. Stable self-supervised RL needs guardrails against the model confirming itself too easily.

## Questions For Review

1. What is the self-consistent illusion failure mode?
2. Why does cross-view agreement make reward hacking harder?
3. Why is a slowly updated teacher more stable than the current policy alone?
