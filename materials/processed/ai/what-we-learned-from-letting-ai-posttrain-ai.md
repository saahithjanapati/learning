# What We Learned from Letting AI Posttrain AI

Source: `https://thoughtfullab.com/letting-ai-posttrain-ai.html`
Site: `Thoughtful`
Title: `What We Learned from Letting AI Posttrain AI`
Author: `Mersad Abbasi`
Published: `2026-04`
Ingested: `2026-05-04`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`

## Summary

This article studies whether an AI agent can run a model-improvement loop itself rather than merely helping a human researcher. The setting is a long-running post-training task built on the Tinker API and a benchmark environment called the Frog Placement Game.

The article's conclusion is mixed but informative. Agents can make some reasonable experimental decisions and occasionally recover from mistakes, but they still struggle with the hard part of modelcrafting: research intuition. Knowing what to test, how to interpret noisy outcomes, and when to abandon a bad direction remains the main bottleneck.

## Main Points

### 1. The task is intentionally research-like

The goal is not one-step optimization, but an end-to-end loop of proposing, testing, and revising model-improvement ideas over many hours.

### 2. Easy grading does not remove the hard part

Even when outcomes are measurable, choosing promising experiments remains difficult.

### 3. The key bottleneck is intuition

The piece argues that agentic model improvement is limited less by tool access than by the quality of experimental judgment.
