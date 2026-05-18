# Hallucinations Undermine Trust; Metacognition is a Way Forward

Source: `https://arxiv.org/abs/2605.01428`
Canonical PDF: `https://arxiv.org/pdf/2605.01428`
HTML source: `https://arxiv.org/html/2605.01428v1`
Authors: Gal Yona, Mor Geva, Yossi Matias
Submitted: `2026-05-02`
Accessed: `2026-05-18`
Venue note: To appear in ICML 2026, Position Track
Extraction engine: arXiv metadata plus arXiv HTML structured reading
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; post-training; agents; post-training x interpretability`
Cross-index: `topics/ai/scale-ai-research-internship-prep/INDEX.md`

## Summary

This position paper argues that hallucination mitigation has been framed too narrowly. If hallucination means "any factual error," then a model can only guarantee low hallucination by refusing many questions, which sacrifices utility. The authors instead argue that the more damaging failure is a **confident error**: wrong information presented without appropriate uncertainty.

The paper's central proposal is **faithful uncertainty**. A model should align its expressed uncertainty with its intrinsic uncertainty. If the model's own internal state suggests low confidence or high instability under resampling, the answer should be linguistically hedged. If the model is confident, it can answer decisively. This shifts the target from omniscience to metacognition: the model should know, communicate, and act on the boundary of its own knowledge.

The paper also connects this to agents. Tool use does not remove the need for metacognition; it increases it. An agent needs uncertainty awareness to decide when to search, when to trust retrieved evidence, when to stop, and when to signal doubt. In this framing, metacognition becomes the control layer between a base model and its harness.

## Core Claim

The paper separates two goals that are often conflated:

- expanding the model's knowledge boundary,
- improving the model's awareness of that boundary.

Scaling, data, and better training can expand what the model knows. But the authors argue that even strong models may lack enough **discriminative power** to perfectly separate correct answers from incorrect answers at the long tail.

That distinction matters because calibration is not enough. A model can be calibrated on average while still failing to distinguish which particular answer is wrong. A confidence score of 60 percent can be perfectly calibrated if 60 percent of those answers are correct, but it still does not tell the model which 40 percent are false.

## The Discrimination Gap

The paper's practical bottleneck is the **discrimination gap**: the gap between knowing average uncertainty and identifying individual errors.

The authors use three sources of evidence:

- theoretical work suggesting unavoidable limits on universal factual verification,
- empirical work showing confidence signals and truthfulness probes do not cleanly separate correct from incorrect answers,
- benchmark patterns where models improve factuality mainly by abstaining more, not by occupying the ideal region of high coverage plus low error.

They highlight AUROC ranges from prior factual QA uncertainty work, often around `0.70` to `0.85`, and argue that this is not enough to eliminate hallucinations without discarding many correct answers. Their synthetic illustration shows that even a well-calibrated signal can require a large utility tax when correct and incorrect confidence distributions overlap.

## Faithful Uncertainty

Faithful uncertainty is the proposed alternative objective.

The model should align:

- **intrinsic uncertainty**: how stable or confident the model is internally about a semantic assertion,
- **linguistic uncertainty**: how confident the model sounds in the generated response.

The key move is that faithful uncertainty does not require the model to know whether an answer is externally true. It requires the model to report its own internal state accurately. That is a more tractable target because the reference signal is internal to the model rather than the entire external world.

A faithful answer can still be wrong. The difference is that an uncertain wrong answer is presented as a hypothesis, while a confident wrong answer is presented as fact. The paper calls the first path a way to preserve **reliable utility**: users get information, but also get a usable signal about how much trust to place in it.

## Why This Matters For Agents

The paper argues that agentic systems make metacognition more important, not less.

Tool use solves the **storage problem**: the model no longer needs to encode every fact in its parameters. But tools create a **control problem**: the agent has to decide when to retrieve, how to interpret retrieved evidence, and when external evidence should override or be checked against internal beliefs.

Without metacognition, the harness is forced to make routing decisions with brittle heuristics. With metacognition, the model can regulate its own behavior:

- search when its confidence is low,
- avoid unnecessary search when it already knows,
- flag conflicts between retrieved evidence and internal priors,
- stop when more tool calls are unlikely to help.

This is why the paper treats metacognition as an agent-control layer rather than a cosmetic style preference.

## Research Agenda

The paper's call to action includes several open problems:

1. **Bootstrapping uncertainty expression**
   Static SFT labels can go stale because the right uncertainty label depends on the model's current knowledge boundary.

2. **Preserving uncertainty through post-training**
   Alignment and RLHF can make models more decisive and mode-seeking, potentially erasing useful uncertainty signals from pretraining.

3. **Attributing uncertainty source**
   A single scalar confidence is not enough. The model should distinguish uncertainty due to ambiguity, lack of knowledge, normative uncertainty, or tool conflict.

4. **Causal evaluation**
   Models may learn to mimic uncertainty language without actually reading their own internal uncertainty state.

5. **Agent metacognition evaluation**
   Agent benchmarks should evaluate control behavior, not only final answer correctness.

For direct hallucination mitigation, the paper recommends evaluating full utility-error curves, showing frontier movement rather than threshold tuning, and measuring collateral damage to broader helpfulness.

## Why This Belongs In The Prep Collection

This paper is strongly relevant to the Scale AI prep queue because it connects evaluation, post-training, and agent control.

It sits near:

- RL for knowledge awareness: both ask how to train epistemic behavior rather than factual memorization alone,
- Features as Rewards: both treat internal signals as possible supervision targets,
- Rubrics as Rewards and reward hacking: both force the question of whether a reward or evaluation signal remains faithful under optimization,
- agent-memory and workflow evaluation: agent reliability depends on when an agent knows to retrieve, defer, verify, or stop.

The important Scale-style framing is: a benchmark or reward should not only ask whether the final answer is right. It should ask whether the system used the right control policy given its uncertainty.

## Key Terms

- **Hallucination as confident error**: wrong information presented without appropriate qualification.
- **Knowledge boundary**: the region of facts the model can answer from its parameters.
- **Discrimination gap**: limited ability to separate correct from incorrect answers at the instance level.
- **Faithful uncertainty**: alignment between expressed uncertainty and intrinsic uncertainty.
- **Reliable utility**: preserving answer usefulness while communicating trustworthiness.
- **Metacognition**: awareness of uncertainty plus behavior regulated by that awareness.
- **Storage problem**: not having all facts in parameters.
- **Control problem**: deciding when to retrieve, trust, hedge, or stop.

## Questions For Review

1. Why can a calibrated confidence signal still fail to eliminate hallucinations without a large utility tax?
2. What is the difference between "the model is wrong" and "the model hallucinated" under this paper's framing?
3. Why is faithful uncertainty easier than perfect factuality in principle?
4. How can post-training damage useful uncertainty signals?
5. Why does tool use make metacognition more important instead of less important?
6. What would a benchmark need to measure to test agent metacognition rather than only answer accuracy?
7. How could a model fake faithful uncertainty without actually being metacognitive?
