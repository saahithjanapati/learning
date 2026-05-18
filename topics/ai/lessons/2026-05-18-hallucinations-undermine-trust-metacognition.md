# Hallucinations Undermine Trust; Metacognition Is A Way Forward

Source note: This paper lesson is based on Gal Yona, Mor Geva, and Yossi Matias, "Hallucinations Undermine Trust; Metacognition is a Way Forward," submitted 2026-05-02. Source: [https://arxiv.org/abs/2605.01428](https://arxiv.org/abs/2605.01428). Processed source: [materials/processed/ai/hallucinations-undermine-trust-metacognition-way-forward.md](../../../materials/processed/ai/hallucinations-undermine-trust-metacognition-way-forward.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem](#the-problem)
- [The Main Move](#the-main-move)
- [Calibration Is Not Discrimination](#calibration-is-not-discrimination)
- [Faithful Uncertainty](#faithful-uncertainty)
- [Why Agents Need This Even More](#why-agents-need-this-even-more)
- [Research Agenda](#research-agenda)
- [Connection To The Local AI Curriculum](#connection-to-the-local-ai-curriculum)
- [Limitations And Cautions](#limitations-and-cautions)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Core Thesis

The paper argues that "stop hallucinations" is too blunt if hallucination means any factual error. A model can reduce errors by refusing more, but then it loses usefulness. The authors propose a sharper target: hallucinations are **confident errors**, meaning false claims delivered without appropriate uncertainty.

The path forward is **metacognition**. The model should know when it is uncertain, communicate that uncertainty honestly, and use it to regulate behavior. In direct chat, that means faithful hedging. In agents, it means deciding when to search, when to trust retrieved information, and when to stop.

### The Key Distinction

The paper separates:

- **knowledge expansion**: making the model know more facts,
- **knowledge awareness**: making the model know where its knowledge boundary is.

Most factuality improvements have expanded the knowledge boundary. The harder part is awareness of the boundary. The model may not be able to perfectly discriminate "this answer is right" from "this answer is wrong," especially for long-tail facts.

### What To Remember

The most important phrase is **faithful uncertainty**: the model's linguistic confidence should match its intrinsic confidence. If the model internally has a shaky answer, the user should hear that shakiness. This does not make the model omniscient. It makes the model more honest about the difference between a diagnosis and a hypothesis.

## Full-Length Version

## The Problem

Modern LLMs still make factual errors, even on simple factoid questions with clear ground truth. The paper focuses on parametric models without external tools, especially long-tail factual questions where the answer may not be strongly represented in the model's parameters.

There are two obvious strategies:

1. Answer more often, which preserves utility but produces confident false claims.
2. Abstain more often, which reduces errors but discards many useful correct answers.

That is the utility-factuality tradeoff. If every wrong answer counts as a hallucination, then the only guaranteed way to eliminate hallucination is aggressive refusal. The paper argues that this is not the right behavioral target.

The user does not only care whether the answer is correct. The user also cares whether the model represented its epistemic state honestly. A confident false answer is more damaging than a hedged uncertain answer, because confidence changes how users act.

## The Main Move

The authors reframe hallucination as **confident error**.

Under this framing:

- a confident false answer is a hallucination,
- a hedged false answer is a mistaken hypothesis,
- a refusal is only one possible response,
- an uncertain answer can still be useful if the uncertainty is honest.

This creates a third path between "answer always" and "abstain whenever unsure." The model can answer, but modulate its decisiveness.

This is not a call for generic hedging. Generic hedging is cheap and mostly useless. If every sentence says "maybe," the user learns nothing. The target is not more uncertainty language; it is uncertainty language that tracks the model's actual internal confidence.

## Calibration Is Not Discrimination

The most technical idea in the paper is the difference between **calibration** and **discrimination**.

Calibration asks whether confidence scores match empirical accuracy on average. If a model labels a batch of answers as 60 percent confident and 60 percent are correct, that batch is calibrated.

Discrimination asks whether the model can separate correct answers from incorrect answers at the instance level. If correct and incorrect answers often receive similar confidence, then the model may be calibrated but still unable to decide which specific answers to suppress.

This matters because hallucination elimination needs discrimination. If the model has a confidence band where 60 percent of answers are right and 40 percent are wrong, then a strict anti-error policy has to throw away the whole band. That discards many correct answers along with the errors.

The paper calls this the **discrimination gap**. Prior work suggests many factual QA uncertainty signals sit in a middling AUROC range, useful but not strong enough to eliminate errors without a large utility tax.

## Faithful Uncertainty

The proposed objective is **faithful uncertainty**.

The paper distinguishes:

- **intrinsic uncertainty**: the model's internal uncertainty about the semantic assertion,
- **linguistic uncertainty**: the uncertainty expressed in words.

A model is faithful when those two match. High intrinsic confidence should produce decisive language. Low intrinsic confidence should produce hedged language, a caveat, a request for verification, or a refusal depending on the situation.

This is an easier target than perfect truthfulness in one important sense. Perfect truthfulness requires matching the external world. Faithful uncertainty requires matching the model's own internal state. The model may not know whether its answer is true, but it can in principle know whether it is unstable, uncertain, or in conflict with itself.

The useful analogy is a doctor. We do not trust a doctor because they are never wrong. We trust them partly because they distinguish "this is the diagnosis" from "this is a hypothesis we should test."

## Why Agents Need This Even More

A tempting reaction is: agents can search, so uncertainty awareness matters less.

The paper argues the opposite. Tools solve the storage problem, not the control problem.

The **storage problem** is that a model cannot store every fact in its weights. Search and retrieval help with that.

The **control problem** is deciding:

- when to search,
- when not to search,
- when retrieved information is trustworthy,
- when retrieved information conflicts with the model's priors,
- when another tool call is worth the cost,
- when to stop and tell the user uncertainty remains.

Those are metacognitive decisions. Without uncertainty awareness, the harness has to make them using heuristics. With uncertainty awareness, the model can become a better participant in its own tool-use loop.

This is the paper's strongest agent lesson: metacognition is not just a style layer on top of answers. It is an API between the model and the agent harness.

## Research Agenda

The paper's research agenda has five especially important pieces.

First, uncertainty training has a bootstrapping problem. Static labels like "I do not know" can become stale as the model changes. The correct uncertainty label depends on the current model's knowledge state.

Second, post-training can damage uncertainty. RLHF and instruction tuning often make models more decisive, more mode-seeking, and less calibrated than base models. A useful alignment algorithm may need to preserve subtle uncertainty information while still teaching instruction following and safety.

Third, uncertainty is not one thing. The model may be uncertain because the prompt is ambiguous, because it lacks factual knowledge, because the normative target is unclear, or because tools disagree. Good language should attribute the source of uncertainty, not just emit one scalar confidence.

Fourth, evaluation has to be causal. A model can learn superficial uncertainty style, such as hedging rare-entity prompts, without genuinely reading its own internal state.

Fifth, agent evaluation should score control. A benchmark should penalize searching for facts the model clearly knows, failing to search when uncertain, trusting weak evidence, or reaching the right answer through a bad process.

## Connection To The Local AI Curriculum

This paper sits directly inside the current Learning Machine cluster around post-training, interpretability, evaluation, and agent control.

It connects to **RL for Knowledge Awareness** because both focus on epistemic behavior: knowing when to answer and when to hedge. It connects to **Features as Rewards** and SAE reward-model work because faithful uncertainty might be trained from internal signals, but those signals must remain robust under optimization pressure. It connects to **Rubrics as Rewards** and reward-hacking work because an uncertainty reward can itself become a proxy to exploit.

For Scale AI research prep, the useful angle is evaluation design. A good evaluation should not merely ask "did the answer end up correct?" It should ask whether the model's confidence, tool use, and stopping behavior matched what it could reasonably know.

## Limitations And Cautions

This is a position paper, not a new benchmark result or training algorithm. Its value is conceptual: it sharpens the target and explains why factuality-only evaluation misses an important behavioral dimension.

The biggest risk is Goodharting uncertainty. If we reward uncertainty language naively, models may learn to sound cautious without becoming more metacognitive. The paper is aware of this and explicitly calls for causal evaluation.

The second caution is user experience. Too much hedging can make models feel weak or irritating. The right objective is localized, informative uncertainty, not a blanket cautious style.

## Memory Checklist

- Title: Hallucinations Undermine Trust; Metacognition is a Way Forward.
- Authors: Gal Yona, Mor Geva, Yossi Matias.
- Source date: 2026-05-02.
- Main theme: hallucinations as confident errors, not all errors.
- Core concept: faithful uncertainty.
- Main bottleneck: calibration does not imply discrimination.
- Agent takeaway: tool use creates a control problem; metacognition is the control layer.
- Local tags: evaluation; post-training; agents; metacognition; uncertainty; scale-context.
- One-line takeaway: The model does not need to be omniscient to be more trustworthy; it needs to communicate and act on its own uncertainty faithfully.
