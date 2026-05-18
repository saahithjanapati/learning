# Deep Reinforcement Learning From Human Preferences

Source: `https://arxiv.org/abs/1706.03741`
Authors: Paul F. Christiano, Jan Leike, Tom B. Brown, Miljan Martic, Shane Legg, Dario Amodei
Published: `2017`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `foundational RLHF paper normalization and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; reward modeling; alignment`

## Summary

This paper is the modern deep-learning starting point for reinforcement learning from human preferences. Instead of asking humans to hand-write a reward function, the system asks humans to compare short behavior clips. A learned reward predictor turns those pairwise judgments into a scalar reward, and a reinforcement learning agent optimizes that learned reward.

The key idea is simple: people can often say which of two behaviors is better even when they cannot specify a clean reward formula. The paper applies this idea to simulated robotics tasks and Atari games, showing that a relatively small amount of human comparison data can train agents in environments where reward design would be awkward or expensive.

## Core Mechanism

1. The agent produces behavior trajectories.
2. The system samples short clips from those trajectories.
3. Human labelers choose which clip looks better.
4. A reward model is trained to predict the human preference.
5. The RL policy is optimized against the learned reward.
6. More clips are collected from the updated policy, and the loop continues.

The learned reward model is not merely an evaluator after training. It becomes the training objective. That is why reward-model generalization and reward hacking are central risks.

## Why It Matters

This paper gives the template that later language-model RLHF inherits: pairwise human choices, reward model training, and policy optimization against the learned reward. The setting is not yet instruction-following language models, but the conceptual move is already there.

It also makes the central alignment tradeoff visible. Learned rewards can express richer human preferences than hand-coded rewards, but optimizing a learned proxy can push the policy into regions where the proxy is wrong.

## Limitations And Caveats

- The experiments are small compared with modern frontier LLM post-training.
- The preference labels compare short clips, not long-horizon human outcomes.
- The learned reward can be exploited if the policy discovers behavior that scores well but does not satisfy the intended preference.
- The method still requires careful data collection, active sampling, and regular checks on reward-model behavior.

## Study Questions

1. Why are pairwise comparisons easier than hand-written rewards?
2. What is the difference between using a reward model as an evaluator and using it as the training objective?
3. How can reward hacking arise even when the reward model was trained on real human preferences?
4. Which pieces of this pipeline later reappear in LLM RLHF?
