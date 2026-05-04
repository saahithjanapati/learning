# What We Learned from Letting AI Posttrain AI

Source note: [materials/processed/ai/what-we-learned-from-letting-ai-posttrain-ai.md](../../../materials/processed/ai/what-we-learned-from-letting-ai-posttrain-ai.md)

## Table of Contents

1. [Start Here](#start-here)
2. [The Core Question](#the-core-question)
3. [What The Task Looks Like](#what-the-task-looks-like)
4. [What The Agent Can Do](#what-the-agent-can-do)
5. [What Still Breaks](#what-still-breaks)
6. [Why Research Intuition Is Central](#why-research-intuition-is-central)
7. [Quick Check](#quick-check)

## Start Here

This article is interesting because it tests a recursive ambition: can an AI agent help train or improve another AI by running the modelcrafting loop itself?

The answer is not "yes, fully solved" or "no, impossible." It is more revealing than that.

## The Core Question

The authors want to know whether an agent can do the hard part of post-training, not just the mechanical part.

Mechanical work includes:

- running jobs,
- collecting results,
- formatting outputs.

The hard part includes:

- choosing what to try,
- deciding which failures matter,
- knowing when a result is noise,
- forming a better next hypothesis.

## What The Task Looks Like

The article builds a long-running post-training task around the Frog Placement Game using the Tinker API. The point is to give the agent a setup where outcomes are measurable but experimental judgment still matters.

That makes the environment a good stress test for research ability rather than simple automation.

## What The Agent Can Do

The reported agents can:

- make some reasonable experimental choices,
- run parts of the loop end to end,
- sometimes recover from local failures.

So this is not a story where the agent collapses immediately.

## What Still Breaks

The bottleneck is not access to tools. It is weak intuition.

The agents still struggle with:

- picking the most promising directions,
- interpreting ambiguous or noisy feedback,
- building a coherent research strategy over long horizons.

## Why Research Intuition Is Central

This is the article's most valuable claim. Model improvement is not just optimization plus patience. It requires taste and judgment about what signal matters.

That means `AI training AI` is not blocked only by infrastructure. It is blocked by whether the agent can act like a good researcher.

## Quick Check

1. What is the difference between the mechanical part of post-training and the research part?
2. Why is the Frog Placement Game a useful test environment?
3. What can the agents already do reasonably well?
4. Why does the article call research intuition the main bottleneck?
