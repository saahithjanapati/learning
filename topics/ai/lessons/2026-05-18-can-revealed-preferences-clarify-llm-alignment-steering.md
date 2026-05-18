# Can Revealed Preferences Clarify LLM Alignment And Steering

Source note: This paper lesson is based on Khurram Yamin, Jingjing Tang, Eric Horvitz, and Bryan Wilder, "Can Revealed Preferences Clarify LLM Alignment and Steering?", 2026. Source: [https://arxiv.org/abs/2605.08556](https://arxiv.org/abs/2605.08556). Processed source: [materials/processed/ai/can-revealed-preferences-clarify-llm-alignment-steering.md](../../../materials/processed/ai/can-revealed-preferences-clarify-llm-alignment-steering.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper asks what objectives are implied by an LLM's choices under uncertainty. Instead of trusting what the model says it values, the authors infer the cost function that best explains its decisions.

The pipeline elicits the model's probability estimates over unknowns, observes its decision, and fits a discrete choice model. This revealed-preference view tests whether the model is internally coherent, whether it can verbalize the policy it is actually following, and whether prompting can steer that policy.

The metacognition link is that a model must know not only whether it is right, but what tradeoff it is making under uncertainty.

## Full-Length Version

### The Problem

High-stakes decisions often involve uncertain outcomes and asymmetric costs. Alignment is not only about factual prediction; it is about which errors the model tries harder to avoid.

### The Method

The paper fits a choice model to model behavior. Given uncertainty estimates and decisions, it recovers the cost function that would rationalize those choices.

### Main Findings

The paper reports nontrivial coherence in several models, but also weaknesses in faithful reporting and prompt-based steering. A model may describe one objective while its decisions reveal another.

### Critique

Revealed-preference methods are only as good as the decision tasks and probability elicitation. Still, they provide a rigorous way to audit whether explanations match behavior.

### Memory Checklist

- Revealed preferences are objectives implied by choices.
- Decisions under uncertainty expose tradeoffs.
- Stated objectives can diverge from revealed policy.
- Steering should be evaluated as behavior change, not only instruction following.
