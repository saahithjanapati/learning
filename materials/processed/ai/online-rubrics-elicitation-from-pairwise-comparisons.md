# Online Rubrics Elicitation from Pairwise Comparisons

Source: `https://arxiv.org/abs/2510.07284`
Title: `Online Rubrics Elicitation from Pairwise Comparisons`
Authors: `MohammadHossein Rezaei, Robert Vacareanu, Zihao Wang, Clinton Wang, Bing Liu, Yunzhong He, Afra Feyza Akyurek`
Published: `2025-10-09`
Ingested: `2026-05-05`
Extraction engine: `canonical PDF extraction + manual structured ingest`
Strategy: `paper extraction and medium/full lesson normalization`

## Summary

This paper studies a weakness in rubric-based reinforcement learning for long-form LLM outputs. Static rubrics are useful, but they get stale: models learn to satisfy the wording of the rubric while missing the deeper quality criteria humans actually care about.

The authors propose `OnlineRubrics`, a method that continuously elicits new grading criteria by comparing outputs from the current policy against a control policy. The core claim is that dynamic rubric growth helps surface emergent failure modes and keeps reward models aligned with what high-quality answers actually look like during training.

## Main Points

### 1. Static rubrics are brittle

A fixed checklist can miss new errors, over-reward shallow patterns, and become vulnerable to reward hacking as the policy improves.

### 2. Pairwise comparison is the key move

Instead of asking a grader to invent criteria from scratch in isolation, the method contrasts two responses and extracts criteria that explain why one is better.

### 3. The payoff is better post-training

Across AlpacaEval, GPQA, ArenaHard, and expert validation sets, the paper reports consistent gains over training with only offline rubrics, along with qualitatively richer criteria such as transparency, practicality, organization, and reasoning.
