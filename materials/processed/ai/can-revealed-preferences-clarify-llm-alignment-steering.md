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

## Why It Matters

This paper broadens metacognition from "am I right?" to "what objective am I actually optimizing under uncertainty?" That matters for high-stakes models whose explanations may not match their revealed behavior.

## Questions For Review

1. What is a revealed preference?
2. Why do medical diagnosis decisions make tradeoffs visible?
3. How can a model fail to faithfully report its own decision policy?
