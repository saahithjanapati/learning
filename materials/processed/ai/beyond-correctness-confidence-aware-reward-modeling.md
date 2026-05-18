# Beyond Correctness

Source: `https://arxiv.org/abs/2511.07483`
ACL page: `https://aclanthology.org/2025.emnlp-main.1385/`
Authors: Qianxi He, Qingyu Ren, Shanzhe Lei, Xuhong Wang, Yingchun Wang
Published: `2025-11-10`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv/ACL metadata plus structured manual ingest`
Strategy: `individual paper normalization for confidence-aware reward modeling`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; evaluation; reward modeling`

## Summary

This paper argues that final-answer correctness is an incomplete reward signal for reasoning. A model can get a problem right through luck, shallow pattern matching, or weak reasoning, while another answer may show better calibrated reasoning behavior.

The proposed confidence-aware reward modeling approach incorporates confidence information alongside correctness so training can distinguish robust reasoning from lucky correctness. The paper is especially relevant for STEM reasoning, where exact final answers are available but do not fully capture the quality of the reasoning path.

## Core Ideas

- Correctness-only rewards can over-reward lucky answers.
- Confidence is useful when it helps distinguish robust reasoning from weak reasoning.
- The reward signal should include epistemic behavior, not only final answer match.
- Confidence itself must be calibrated enough to avoid becoming a new reward hack.

## Why It Matters

This is the direct RL bridge in the batch. It turns uncertainty from an evaluation readout into part of the reward model.

## Questions For Review

1. Why is final-answer correctness insufficient for reasoning RL?
2. When can confidence-aware rewards backfire?
3. How does this connect to reward hacking in rubric-based RL?
