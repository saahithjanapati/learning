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

## Detailed Paper Notes

The paper begins from a weakness in many reasoning RL setups: final-answer correctness is a thin reward. It treats a lucky correct answer, a memorized shortcut, and a carefully reasoned solution as equivalent. It also treats an incorrect answer with honest low confidence the same as an incorrect answer delivered with unjustified certainty, unless the reward has a way to see confidence behavior.

Confidence-aware reward modeling adds an epistemic dimension to the reward. The model is not only judged on whether it reached the right final answer, but also on whether its confidence matches the strength of its reasoning. This is especially relevant in STEM tasks where exact answers are available but do not fully capture solution quality.

The paper's alignment relevance is that confidence can become a training signal rather than only an evaluation readout. If a model gets credit for calibrated confidence, post-training can encourage behaviors like checking, expressing uncertainty, and avoiding brittle overclaiming. That moves metacognition into the optimization loop.

The reward-design challenge is obvious: confidence can itself be gamed. A model might learn to be strategically underconfident to avoid penalty, or confidently imitate the surface form of robust reasoning. If confidence estimates are not grounded in real uncertainty, the reward model may introduce a new proxy rather than fixing the old one.

The useful framing is therefore "beyond correctness," not "instead of correctness." Correctness remains important, but a better reward model distinguishes the epistemic path. A model that is correct for weak reasons should not receive the same training signal as a model that is correct and appropriately confident. A model that is wrong but uncertain should be treated differently from a model that is wrong and overconfident.

This paper connects directly to reward hacking concerns. Once confidence is rewarded, the system must test whether the model improves genuine calibration or merely learns the confidence style that the reward model likes. The right evaluation needs held-out calibration, wrong-answer confidence, reasoning robustness, and adversarial tasks where shallow confidence cues fail.

## Method And Evaluation Details To Preserve

The key design question is how confidence enters the reward model. A confidence-aware reward should not simply reward high confidence on correct answers and low confidence on incorrect answers in a superficial way. It should encourage a correspondence between the model's epistemic state, the strength of its reasoning, and its expressed certainty.

For reasoning tasks, the reward surface should distinguish at least four cases: correct and well-supported, correct but lucky, incorrect but appropriately uncertain, and incorrect but overconfident. Correctness-only RL collapses the first two cases together and often ignores the last distinction. Confidence-aware reward modeling tries to preserve those differences so the optimizer learns better epistemic behavior.

The evaluation burden is heavier than ordinary accuracy. A good result should show not only that final-answer accuracy improves, but that calibration improves on held-out and shifted tasks. It should also test whether the model becomes strategically vague or underconfident. If a model learns to avoid confidence rather than express calibrated confidence, the reward has created a new artifact.

The paper is therefore a useful bridge between metacognitive evaluation and post-training objectives. It asks whether uncertainty can be trained into the policy as behavior, not merely measured after the fact.

## Why It Matters

This is the direct RL bridge in the batch. It turns uncertainty from an evaluation readout into part of the reward model.

## Questions For Review

1. Why is final-answer correctness insufficient for reasoning RL?
2. When can confidence-aware rewards backfire?
3. How does this connect to reward hacking in rubric-based RL?
