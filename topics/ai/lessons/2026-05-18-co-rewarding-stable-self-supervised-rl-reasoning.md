# Co-rewarding

Source note: This paper lesson is based on Zizhuo Zhang, Jianing Zhu, Xinmu Ge, Zihua Zhao, Zhanke Zhou, Xuan Li, Xiao Feng, Jiangchao Yao, and Bo Han, "Co-rewarding: Stable Self-supervised RL for Eliciting Reasoning in Large Language Models," 2025. Source: [https://arxiv.org/abs/2508.00410](https://arxiv.org/abs/2508.00410). Processed source: [materials/processed/ai/co-rewarding-stable-self-supervised-rl-reasoning.md](../../../materials/processed/ai/co-rewarding-stable-self-supervised-rl-reasoning.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

Co-rewarding tries to make self-supervised RL for reasoning stable. RLVR works well when ground-truth labels exist, but labels are expensive. Self-rewarding avoids labels but can collapse when the model learns to satisfy its own shallow reward signal.

The paper introduces complementary supervision. Co-rewarding-I uses agreement across semantically analogous questions. Co-rewarding-II uses a slowly updated teacher for pseudo-label supervision.

The uncertainty connection is disagreement. Robust self-training needs more than one view so the model cannot easily confirm its own wrong answer.

## Full-Length Version

### The Problem

Self-rewarding can form a self-consistent illusion: the model finds a trivial pattern that its own reward accepts, then reinforces it.

### The Method

Co-rewarding introduces extra views. Data-side agreement checks whether analogous questions support the same reasoning. Model-side self-distillation uses a slow teacher that is harder for the current policy to exploit.

### Main Findings

The paper reports more stable training and improvements over self-rewarding baselines on mathematical reasoning benchmarks, with some cases matching or exceeding ground-truth RLVR.

### Critique

Cross-view agreement is powerful but not perfect. If all views share the same blind spot, the system can still reinforce a wrong pattern. The method reduces collapse risk; it does not eliminate epistemic risk.

### Memory Checklist

- RLVR depends on labels.
- Self-rewarding can collapse.
- Co-rewarding adds complementary supervision.
- Disagreement is a useful anti-collapse signal.
