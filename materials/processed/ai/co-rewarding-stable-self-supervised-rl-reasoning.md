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

## Detailed Paper Notes

Co-rewarding addresses a core limitation of reinforcement learning for reasoning. RL with verifiable rewards works well when the environment can check the answer, as in many math or code tasks. But many reasoning tasks do not have cheap ground-truth labels. Self-supervised reward methods try to fill that gap, but they risk collapse because the model can reward its own mistaken patterns.

The paper frames this as a self-consistent illusion problem. If the policy and reward signal are too tightly coupled, the model can converge to reasoning that agrees with itself without becoming more correct. A single-view self-reward can reinforce shortcuts because there is no independent source of pressure against the model's current errors.

Co-rewarding introduces complementary signals to make that collapse harder. One signal comes from semantically analogous questions: if two questions should require related reasoning, agreement across their answers can provide useful supervision. Another signal comes from a slowly updated teacher model. Because the teacher lags behind the current policy, it provides a more stable pseudo-label target than the policy's immediate self-judgment.

The method is relevant to metacognition because disagreement is treated as information. A system that sees mismatch across views, analogous problems, or teacher-policy predictions has a reason to be uncertain. That is different from a purely self-confirming loop where the model's current answer is immediately converted into reward.

The post-training lesson is that self-supervised RL needs separation between generator and critic. Even if both signals come from the model family, they should not update in perfect lockstep. Cross-view and slow-teacher designs create friction that can expose instability before it becomes reward.

The limitation is that complementary signals are still proxies. Analogous-question agreement may reward shared misconceptions. A slow teacher may preserve old errors. Co-rewarding improves stability, but it does not guarantee truth. It should be evaluated on whether it improves out-of-distribution reasoning, not only whether the training reward rises smoothly.

## Method And Evaluation Details To Preserve

The useful mental model is that Co-rewarding creates multiple imperfect critics whose errors are less synchronized than a single self-reward. Cross-view rewards ask whether related questions lead to mutually compatible conclusions. Slow-teacher rewards ask whether the current policy remains anchored to a more stable reference rather than immediately rewarding its own newest habits.

This matters because self-supervised RL can otherwise create feedback loops. If the model generates an answer, judges it, and updates from that judgment with no external check, then its current blind spots can become stronger. Co-rewarding tries to slow that loop down and expose contradictions between views.

For future review, distinguish this from ordinary majority voting. The goal is not merely to sample many answers and choose the most common one. The goal is to construct reward signals that make self-confirming collapse harder during training. That places the method in the same family as consistency regularization, teacher-student stabilization, and disagreement-aware uncertainty estimation.

The core evaluation question is whether the method improves reasoning because it adds meaningful epistemic constraints, or whether it merely adds another proxy that can be gamed. Strong evidence would include robustness to paraphrases, shifted problem templates, and cases where analogous questions share tempting but false shortcuts.

## Why It Matters

This paper belongs in the uncertainty batch because metacognition often depends on seeing when views disagree. Stable self-supervised RL needs guardrails against the model confirming itself too easily.

## Questions For Review

1. What is the self-consistent illusion failure mode?
2. Why does cross-view agreement make reward hacking harder?
3. Why is a slowly updated teacher more stable than the current policy alone?
