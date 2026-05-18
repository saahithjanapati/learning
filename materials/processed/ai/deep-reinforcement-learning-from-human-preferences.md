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

## Detailed Paper Notes

The paper's motivation is that many goals are easier to recognize than to formalize. A person can often tell whether one robot behavior is closer to the intended goal than another, but writing a dense reward function that produces that behavior can be difficult. This is especially true when the desired behavior has aesthetic, commonsense, or long-horizon components.

The method uses pairwise comparisons over trajectory segments as the human-data interface. A segment is a short clip of agent behavior. The human labeler chooses which of two clips is better. The reward predictor is trained so that the preferred clip receives a higher predicted return than the rejected clip. Once trained, the reward predictor supplies a dense reward signal that the RL algorithm can optimize.

The active data-collection loop is essential. If the policy improves or changes, it may visit parts of behavior space that the reward model has not seen. The system therefore keeps collecting comparisons from current policy behavior. This reduces the gap between the reward model's training distribution and the behaviors the optimizer is trying to exploit.

The experiments cover Atari games and simulated robot locomotion/control tasks. The headline result is that the method can solve nontrivial RL tasks without access to the environment's true reward function, using human feedback on less than one percent of the agent's interactions with the environment. The paper also emphasizes that novel behaviors can be trained with about an hour of human time in some cases. The important claim is not that human feedback is free, but that comparison-based oversight can be cheap enough to pair with modern deep RL.

The paper introduces the modern RLHF failure mode at the same time as the modern RLHF method. The reward model is a proxy learned from finite comparisons. A strong policy optimizer can discover behaviors that score highly under the learned proxy while failing the actual human intent. This is already reward hacking in miniature. It is the same conceptual risk that later appears in language-model reward models, rubric rewards, and preference optimization.

For later LLM work, the mapping is direct. Trajectory segments become generated answers. Human clip preferences become answer preferences. The learned reward predictor becomes a reward model over text. Policy optimization becomes PPO or another preference-optimization method. The 2017 paper is therefore best understood as the deep RL root of the entire RLHF family.

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
