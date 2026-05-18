# Language Models Mostly Know What They Know

Source: `https://arxiv.org/abs/2207.05221`
Authors: Saurav Kadavath, Tom Conerly, Amanda Askell, Tom Henighan, Dawn Drain, Ethan Perez, Nicholas Schiefer, et al.
Published: `2022-07-11`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for metacognition and self-knowledge`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; interpretability; post-training x interpretability`

## Summary

This paper studies whether language models can evaluate their own answers and predict when they know enough to answer a question. It introduces two useful targets: `P(True)`, the probability that a proposed answer is correct, and `P(IK)`, the probability that the model knows the answer without relying on a particular proposed answer.

The main finding is cautiously optimistic. Larger models can be well calibrated on multiple-choice and true/false formats, can assign useful `P(True)` estimates to their own open-ended answers, and improve when allowed to inspect many of their own samples. Models can also learn `P(IK)` style knowledge-boundary predictions, though calibration under new tasks remains difficult.

## Core Ideas

- Self-evaluation depends heavily on format and elicitation.
- `P(True)` is answer-level verification; `P(IK)` is task-level knowledge-boundary estimation.
- Looking at multiple self-samples improves self-evaluation.
- The result supports honest-model training, but does not imply models naturally behave honestly in deployment.

## Detailed Paper Notes

The paper separates two questions that are easy to conflate. `P(True)` asks whether a particular answer is true. `P(IK)` asks whether the model knows enough to answer the question at all. This distinction matters because a model may be able to judge a proposed answer after seeing it even when it could not reliably produce the answer itself, and it may know that a question is outside its knowledge even before committing to any concrete answer.

The authors study self-evaluation across several elicitation formats. For multiple-choice and true/false settings, they ask whether models can assign calibrated probabilities to candidate answers. For open-ended generation, they evaluate whether a model can judge its own sampled answers. They also test whether performance improves when the model sees multiple samples from itself, because a set of candidate answers exposes disagreement, repeated evidence, and alternative hypotheses.

The central empirical pattern is scale-sensitive. Larger models show stronger self-evaluation behavior than smaller ones. They can often tell when an answer is likely correct, and their confidence scores become more useful as the model gets larger. However, the result is not a blanket claim that models are honest or self-aware by default. Calibration depends on task format, prompt design, and distribution. The model may contain useful information about correctness without reliably choosing to communicate that information in a deployed assistant setting.

The `P(True)` experiments are especially important for later uncertainty work. They show that a language model can sometimes function as a verifier of its own proposed answers. The `P(IK)` experiments are more ambitious because they target knowledge boundaries: before answering, can the model know whether it knows? That ability is exactly what an agent needs to decide whether to answer, abstain, ask a clarifying question, or use retrieval.

The paper's limitations are also central. Self-evaluation can be elicited in artificial formats more easily than in normal conversation. A model may be calibrated on one benchmark but overconfident on another. Inspecting many samples improves uncertainty estimates, but it costs inference compute. And a model that can predict truth under prompting may still be trained or prompted to produce confident-sounding answers. The durable lesson is that self-knowledge signals exist and can be measured, but they need an alignment and control layer before they become reliable behavior.

## Method And Evaluation Details To Preserve

Remember the difference between answer scoring and knowledge-boundary scoring. `P(True)` can be trained or elicited by showing the model a proposed answer and asking whether it is true. `P(IK)` tries to estimate whether the model knows the answer before relying on a proposed answer. The second is closer to what a deployed agent needs, but it is also harder.

Multiple-sample inspection is an important tool because it gives the evaluator more evidence than a single answer. If many samples converge on the same meaning, that suggests confidence. If samples disagree, the model's own behavior reveals uncertainty. This is the ancestor of later semantic entropy and reasoning-trace confidence work.

The paper should not be read as "models are honest." It is better read as "models contain elicitable signals correlated with correctness and knowledge." Honesty requires the model to use those signals in its outward behavior even when confident style, user pressure, or reward incentives push the other way.

For future review, connect this paper to three downstream questions: how to elicit self-knowledge, how to train models to communicate it faithfully, and how to make agents act on it through retrieval, refusal, or verification.

## Why It Matters

This is the foundation paper for metacognitive LLM work. It turns "does the model know?" into a measurable target and gives later papers a vocabulary for uncertainty-aware agents: answer, verify, retrieve, or abstain depending on whether the model's own state suggests enough knowledge.

## Questions For Review

1. Why is `P(True)` easier to evaluate than `P(IK)`?
2. Why does letting a model inspect many samples help self-evaluation?
3. What does the paper show about honesty, and what does it not show?
