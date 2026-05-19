# AdaExplore: Failure-Driven Adaptation for Efficient Kernel Generation

Source: `https://arxiv.org/pdf/2604.16625`
<!-- Source text: materials/source_text/ai/adaexplore-failure-driven-kernel-generation.txt -->
Raindrop ID: `1722663107`
Raindrop saved at: `2026-05-18T22:38:21.222Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the full arXiv PDF. The lesson covers failure-driven adaptation, reusable validity rules, diversity-preserving search trees, KernelBench results, and test-time self-improvement for Triton kernels.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

AdaExplore is an agent framework for performance-critical kernel generation, especially in constrained domains like Triton. It combines failure-driven adaptation with diversity-preserving search.

The main idea is to accumulate reusable knowledge from execution failures. Instead of treating every problem independently, the agent turns recurring failures into validity rules and uses them in later generations.

## Full-Length Version

Kernel generation is a difficult coding-agent domain because correctness and performance both matter. A generated kernel must compile, obey domain constraints, produce correct outputs, and run fast. Local edits can easily break one of those requirements.

AdaExplore has two complementary stages. In the adaptation stage, the agent synthesizes tasks and converts recurring failures into reusable memory, helping future generations avoid invalid code. In the search stage, it organizes candidate kernels as a tree and alternates between local refinements and larger structural regeneration. That protects against getting trapped in local optima.

The abstract reports speedups on KernelBench Level-2 and Level-3 within a 100-step budget, with continued improvement under more compute. The broader lesson is that execution feedback is not only a test result; it can become a reusable training signal for agent behavior.

This should be read with AlphaEvolve and Barbarians at the Gate. All three use execution as a verifier, but AdaExplore focuses on domain-specific code generation with accumulated failure memory.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/adaexplore-failure-driven-kernel-generation.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the full arXiv PDF. The lesson covers failure-driven adaptation, reusable validity rules, diversity-preserving search trees, KernelBench results, and test-time self-improvement for Triton kernels.

## What To Remember

AdaExplore turns failures into reusable constraints, then searches diverse candidate kernels instead of only making local repairs.
