# Absolute Zero: Reinforced Self-Play Reasoning With Zero Data

Source: `https://arxiv.org/abs/2505.03335`
<!-- Source text: materials/source_text/ai/absolute-zero-reinforced-self-play-reasoning-zero-data.txt -->
Raindrop ID: `1722735028`
Raindrop saved at: `2026-05-19T00:42:04.671Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the full arXiv PDF. The lesson covers AZR, task proposal, code-executor verification, learning-progress curriculum construction, RLVR training, and math/coding evaluation.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

Absolute Zero proposes a stronger version of RL with verifiable rewards. Instead of relying on human-curated tasks and answers, a model learns by proposing tasks that maximize its own learning progress and solving them with verification from a code executor.

The system, Absolute Zero Reasoner, uses code reasoning tasks as a grounded source of reward. The promise is open-ended learning without external data: the model creates a curriculum, verifies answers, and improves through reinforcement learning.

## Full-Length Version

The motivation is scalability. RLVR avoids labeling reasoning traces, but many systems still rely on human-made problem collections. If human examples become the bottleneck, then the training regime cannot scale indefinitely. Absolute Zero asks whether a model can create its own verifiable tasks.

The key mechanism is self-play curriculum generation. The model proposes tasks and then learns from solving them. A code executor grounds the loop: proposed tasks can be validated, and answers can be checked. This matters because open-ended generation without verification would quickly become unmoored.

The abstract reports strong coding and math reasoning performance despite no external training data. The conceptual connection to General Agent is direct: both use verifiable environments to turn generation into training signal. Absolute Zero is more focused on reasoning tasks; General Agent is more focused on tool-use environments.

The full-source backfill adds the paper's concrete structure: AZR uses one model in proposer and solver roles, builds code reasoning tasks around induction, abduction, and deduction, validates tasks through execution, and reports scaling behavior across model sizes. The safety note is also part of the paper: the authors observe concerning reasoning traces in one Llama-based run, so self-play reasoning needs safety-aware training rather than only stronger verifiers.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/absolute-zero-reinforced-self-play-reasoning-zero-data.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the full arXiv PDF. The lesson covers AZR, task proposal, code-executor verification, learning-progress curriculum construction, RLVR training, and math/coding evaluation.

## What To Remember

Absolute Zero is about removing human task data from RLVR by making task generation itself part of the learning loop, while keeping code execution as the verifier.
