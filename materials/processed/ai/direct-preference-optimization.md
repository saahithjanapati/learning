# Direct Preference Optimization

Source: `https://arxiv.org/abs/2305.18290`
Authors: Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn
Published: `2023`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `DPO paper normalization and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; DPO; preference optimization`

## Summary

Direct Preference Optimization is a mathematical simplification of the RLHF objective. Instead of separately training a reward model and then using PPO to optimize a policy against it, DPO directly trains the policy on preference pairs with a classification-style loss.

The central insight is that in a KL-regularized RLHF setup, the optimal policy and the reward function are linked by a closed-form relationship. That means a language model policy can be treated as implicitly representing the reward differences needed to explain human preferences. DPO uses this relationship to optimize the policy directly from chosen/rejected response pairs.

## Core Mechanism

For each prompt, the training data contains a preferred response and a dispreferred response. DPO increases the relative probability of the preferred response under the trained policy compared with the reference policy, while decreasing the relative probability of the dispreferred response.

In plain language:

- RLHF says: train a reward model, then move the policy toward high-reward outputs while staying near a reference model.
- DPO says: use the preference pair itself to move the policy in the direction that the equivalent reward model would have favored.

This removes the explicit reward-model training stage and the online PPO stage.

## Why It Matters

DPO became important because it is simpler, more stable, and easier to implement than the classic RLHF pipeline. It turns preference optimization into a supervised-learning-like objective over paired examples.

The paper also gives a conceptual reframe: a language model policy is not only a generator. Under the KL-regularized preference objective, the policy contains an implicit reward function. That is why the title says the language model is "secretly a reward model."

## Limitations And Caveats

- DPO still depends on the quality and coverage of preference data.
- It preserves the reference-model tradeoff through the preference objective and its temperature/control parameter.
- It can still optimize for artifacts in the preference dataset.
- It is not a substitute for evaluating long-horizon behavior, truthfulness, or robustness.
- Removing PPO removes one source of engineering complexity, but it does not remove the alignment problem.

## Study Questions

1. What does DPO remove from the traditional RLHF pipeline?
2. Why does the reference model still matter in DPO?
3. In what sense does the policy contain an implicit reward function?
4. What preference-data failures would DPO inherit from ordinary RLHF?
