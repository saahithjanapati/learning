# Can Revealed Preferences Clarify LLM Alignment And Steering

Source: `https://arxiv.org/abs/2605.08556`
Authors: Khurram Yamin, Jingjing Tang, Eric Horvitz, Bryan Wilder
Published: `2026-05`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata lookup plus structured manual ingest`
Strategy: `individual paper normalization for revealed-preference alignment audits`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; alignment; evaluation; steering`

## Summary

This paper studies how to infer the preferences implied by an LLM's decisions under uncertainty. The setup elicits the model's probability distribution over unknowns, observes the choice it makes in a decision task, and fits a discrete choice model to recover the cost function that best rationalizes those decisions.

The revealed-preference lens allows researchers to ask whether models behave in a consistently goal-directed way, whether they can accurately verbalize the objectives their choices imply, and whether prompting can steer those policies toward a user-specified cost function. The paper applies this to medical diagnosis domains and finds nontrivial coherence but weaknesses in faithful reporting and steering.

## Core Ideas

- Alignment under uncertainty depends on tradeoffs, not only factual accuracy.
- Choices imply a cost function even when the model's explanation says something else.
- Revealed preferences can test whether stated objectives match actual decision policy.
- Prompt steering can be evaluated as a policy-shift claim, not just a text claim.

## Detailed Paper Notes

This paper moves metacognition from confidence to objectives. In many high-stakes decisions, the question is not only whether the model knows a fact. The question is what tradeoff the model is making under uncertainty. A medical diagnosis system, for example, may trade false positives against false negatives. Those tradeoffs are preferences, even when the model does not explicitly state them.

The revealed-preference framework observes the model's beliefs and actions, then infers the cost function that would make those actions rational. The model may say it is optimizing for one goal, but its choices can imply another. This makes alignment measurable at the policy level rather than only at the explanation level.

The setup has three parts. First, elicit or estimate the model's probability distribution over unknown states. Second, present a decision problem where different actions have different costs under those states. Third, fit a discrete choice model to infer which cost function best explains the model's decisions. If the inferred cost function differs from the stated or desired one, the model's revealed preference is misaligned.

The medical diagnosis domain is useful because tradeoffs are concrete. Missing a disease and overdiagnosing a disease are both costly, but the relative cost depends on values, context, and risk tolerance. A model can be factually strong and still make decisions with an undesirable implicit cost function.

The paper also studies steering. Prompting a model to adopt a specific cost function is not enough if the model's decisions do not actually shift. Revealed-preference analysis lets researchers ask whether steering changes behavior, not only whether the model repeats the requested objective in words.

The limitation is that the inferred preference model depends on the decision setup. If the choice tasks are too narrow, the recovered cost function may not generalize. If belief elicitation is noisy, preference inference can be confounded by probability errors. Still, the paper gives a useful audit tool: compare what the model says it values with what its choices imply.

## Method And Evaluation Details To Preserve

The paper's audit pipeline is valuable because it separates beliefs from values. A model can have accurate probabilities but make choices with the wrong tradeoff. It can also have a desirable tradeoff but wrong beliefs. Revealed-preference analysis tries to identify the cost function implied by choices after accounting for the model's stated or elicited beliefs.

This is especially relevant for steering. Many alignment interventions ask the model to follow a policy, value, or persona. The revealed-preference question is whether the intervention changes decisions in a way consistent with that stated policy. If the model merely repeats the requested cost function but behaves the same way, steering has failed at the policy level.

For future review, connect this paper to preference optimization. RLHF and DPO train from preferences supplied by humans. Revealed-preference analysis infers preferences displayed by the model. The two directions complement each other: one trains desired tradeoffs, the other audits learned tradeoffs.

The main caveat is identifiability. Many cost functions can rationalize limited choices. Strong evidence requires diverse decision scenarios where different objectives make different predictions.

## Why It Matters

This paper broadens metacognition from "am I right?" to "what objective am I actually optimizing under uncertainty?" That matters for high-stakes models whose explanations may not match their revealed behavior.

## Questions For Review

1. What is a revealed preference?
2. Why do medical diagnosis decisions make tradeoffs visible?
3. How can a model fail to faithfully report its own decision policy?
