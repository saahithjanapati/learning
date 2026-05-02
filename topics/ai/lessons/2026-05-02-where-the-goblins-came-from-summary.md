# Where the goblins came from

Source note: [materials/processed/ai/where-the-goblins-came-from.md](../../../materials/processed/ai/where-the-goblins-came-from.md)

## Core claim

OpenAI's article is a compact case study in reward-shaping side effects. A personality-training reward meant to encourage playful, nerdy language accidentally favored a specific family of creature metaphors. Reinforcement learning amplified the pattern, and later training loops helped it spread beyond the personality where it first appeared.

## What happened

The behavior first showed up as a small lexical quirk after GPT-5.1: certain creature words appeared more often than expected. It became harder to ignore in GPT-5.4, where the pattern was concentrated in the `Nerdy` personality. That concentration gave OpenAI the clue that the issue was not just an internet-language trend or a random deployment artifact.

The important numbers:

- after GPT-5.1, `goblin` usage rose by `175%` and `gremlin` usage by `52%`;
- `Nerdy` made up about `2.5%` of ChatGPT responses;
- `Nerdy` accounted for about `66.7%` of tracked `goblin` mentions;
- the `Nerdy` reward preferred outputs with tracked creature terms in `76.2%` of audited datasets.

## The causal chain

The useful mental model is:

1. Personality instructions create a target style.
2. A reward model accidentally favors a distinctive surface feature of that style.
3. RL makes that feature appear more often.
4. Generated rollouts are reused in later training data.
5. The feature becomes easier for the model to produce outside the original prompt.

The key point is that optimization can grab onto a memorable surface marker even when the intended target is more abstract, like being playful or less self-serious.

## Why it matters

This is not important because the words themselves are dangerous. It matters because it shows how a small training incentive can escape its intended scope. If a harmless lexical tic can transfer this way, higher-stakes behavioral tendencies can also require careful scoping, auditing, and data filtering.

The article also shows why behavioral monitoring needs to include style and distributional drift. A model can pass standard evaluations while still developing an annoying or inappropriate conversational habit.

## Bottom line

The lesson is that reward signals shape more than the behavior designers intend. When a reward model consistently prefers a visible stylistic artifact, RL can amplify that artifact, and reuse of model-generated data can make the artifact persist across model versions and prompting conditions.
