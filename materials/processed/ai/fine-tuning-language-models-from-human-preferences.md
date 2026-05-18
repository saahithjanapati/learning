# Fine-Tuning Language Models From Human Preferences

Source: `https://arxiv.org/abs/1909.08593`
Authors: Daniel M. Ziegler, Nisan Stiennon, Jeffrey Wu, Tom B. Brown, Alec Radford, Dario Amodei, Paul Christiano, Geoffrey Irving
Published: `2019`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `early LLM RLHF paper normalization and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; RLHF; language-model alignment`

## Summary

This paper adapts the human-preference RL loop to pretrained transformer language models. The authors collect human comparisons between model outputs, train a reward model to predict those preferences, and then fine-tune the language model with policy optimization while keeping it close to the original model.

The practical recipe is the ancestor of the later InstructGPT pipeline: preference comparisons, a learned reward model, PPO-style optimization, and a KL penalty that discourages the policy from drifting too far from the pretrained reference model. The paper studies tasks such as steering sentiment and improving summaries, showing that preference-trained language models can better match human judgments than simple supervised or prompting baselines in these settings.

## Core Mechanism

1. Start with a pretrained language model.
2. Generate multiple candidate outputs for prompts.
3. Ask humans to choose the better output.
4. Train a reward model on these pairwise choices.
5. Optimize the policy against that reward model.
6. Penalize excessive divergence from the original model with a KL-control term.

The KL term is important because language models can otherwise exploit the reward model by moving into strange output regions where the reward model is overconfident or poorly calibrated.

## Why It Matters

The 2017 preference-learning paper proved the concept in RL environments. This paper shows that the same idea can steer pretrained transformer language models. It turns RLHF from a general alignment proposal into a language-model post-training method.

It also introduces a recurring theme in LLM alignment: human preferences are useful supervision, but they are not automatically stable objectives. Once the model is optimized against a learned reward, the reward model becomes a target that can be overoptimized.

## Limitations And Caveats

- The tasks are narrower than general instruction following.
- The reward model is trained from limited comparisons and can fail off-distribution.
- PPO and KL tuning introduce optimization complexity.
- Human preference data can reflect labeler taste, task framing, and short-term preference rather than long-term usefulness.

## Study Questions

1. Why does the method need a KL penalty to the reference language model?
2. What changes when the preference-learning loop is applied to text instead of robotics or Atari?
3. Why can a model optimized for human preference labels still become worse by human standards?
4. Which elements of the paper become standard in later RLHF pipelines?
