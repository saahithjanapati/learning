# Composer 2 Technical Report

Source: `https://arxiv.org/abs/2603.24477`
Title: `Composer 2 Technical Report`
Authors: `Cursor Research Team`
Ingested: `2026-05-04`
Extraction engine: `canonical PDF extraction + manual structured ingest`
Strategy: `paper extraction and medium/full lesson normalization`

## Summary

Composer 2 is Cursor's domain-specialized model for agentic software engineering. The report says the model is trained in two phases: continued pretraining for knowledge and coding ability, then large-scale RL for long-horizon end-to-end coding performance inside a realistic software-engineering harness.

The most important idea is not only "bigger coding benchmark numbers." The report emphasizes training inside environments that match the deployment harness, tools, and long-horizon workflows used by the product. That is a train-test alignment story more than a generic benchmark story.

## Main Points

### 1. The model is specialized for agentic SWE

The target is not isolated next-token coding, but planning, tool use, multi-step execution, and coherence over realistic engineering tasks.

### 2. Training environment match is central

Composer is trained in the same style of harness used in deployment to reduce mismatch between research tasks and real product usage.

### 3. RL is the second major phase

The report frames RL as key for improving end-to-end coding behavior rather than only static code completion.
