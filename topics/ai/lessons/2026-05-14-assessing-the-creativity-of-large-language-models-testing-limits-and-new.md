# Assessing the Creativity of Large Language Models: Testing, Limits, and New Frontiers

Source note: This paper lesson is based on Samuel Schapiro, Alexi Gladstone, Jonah Black, Heng Ji, "Assessing the Creativity of Large Language Models: Testing, Limits, and New Frontiers," source date 2026-05-13. Source: [https://arxiv.org/abs/2605.13450](https://arxiv.org/abs/2605.13450). Processed source: [materials/processed/ai/assessing-the-creativity-of-large-language-models-testing-limits-and-new-frontiers.md](../../../materials/processed/ai/assessing-the-creativity-of-large-language-models-testing-limits-and-new-frontiers.md). Tweet source: [https://x.com/alexiglad/status/2054956610959593887](https://x.com/alexiglad/status/2054956610959593887).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem](#the-problem)
- [Main Idea](#main-idea)
- [How To Read It](#how-to-read-it)
- [Connection To The Local AI Curriculum](#connection-to-the-local-ai-curriculum)
- [Limitations And Cautions](#limitations-and-cautions)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Core Thesis

The paper tests whether common human creativity tests actually predict creative achievement in LLMs across creative writing, divergent thinking, and scientific ideation. It finds that existing tests only partially transfer: DAT best predicts creative writing, Conditional DAT best predicts divergent thinking, and no existing test reliably predicts scientific ideation. The authors introduce DRAT, the Divergent Remote Association Test, which combines convergent and divergent thinking and becomes a significant predictor of scientific ideation ability in their study.

### Why This Was In The Tweet List

This belongs in the AI collection because it is an evaluation paper about whether automated creativity metrics measure the construct they claim to measure. It also fits Scale-style evaluation because it asks whether benchmark scores really predict the downstream capability of interest.

### What To Remember

The useful reading frame is **LLM creativity evaluation**. The source is less important as a standalone headline than as part of the broader Learning Machine thread around post-training, evaluation, interpretability, agent workflows, safety, and scalable supervision.

## Full-Length Version

## The Problem

Assessing the Creativity of Large Language Models: Testing, Limits, and New Frontiers is about LLM creativity evaluation. The motivation is that modern AI systems increasingly need signals, objectives, or training/evaluation procedures that are more subtle than ordinary benchmark accuracy.

## Main Idea

The paper tests whether common human creativity tests actually predict creative achievement in LLMs across creative writing, divergent thinking, and scientific ideation. It finds that existing tests only partially transfer: DAT best predicts creative writing, Conditional DAT best predicts divergent thinking, and no existing test reliably predicts scientific ideation. The authors introduce DRAT, the Divergent Remote Association Test, which combines convergent and divergent thinking and becomes a significant predictor of scientific ideation ability in their study.

## How To Read It

Read this source as part of the current AI research cluster rather than as an isolated paper. Ask three questions while reading:

1. What behavior, representation, or training problem is the source trying to make measurable?
2. What proxy signal does it use, and what does that proxy miss?
3. If the proxy became an optimization target, how might a model exploit it?

## Connection To The Local AI Curriculum

This belongs in the AI collection because it is an evaluation paper about whether automated creativity metrics measure the construct they claim to measure. It also fits Scale-style evaluation because it asks whether benchmark scores really predict the downstream capability of interest.

This connects naturally to the Scale AI research-prep map when the source touches rubrics, post-training, evaluation, interpretable signals, or long-horizon agent workflows. It connects to the broader AI collection when it is more about training systems, creativity metrics, or generalization theory.

## Limitations And Cautions

This lesson is based on the canonical abstract/page-level ingest rather than a line-by-line full-paper walkthrough. Treat it as a first-pass reading note: enough to orient you, decide whether the paper belongs in a deeper reading queue, and connect it to adjacent lessons.

The main caution is proxy validity. Many of these papers propose a way to measure, supervise, or improve a difficult behavior. The critical question is whether the proposed signal remains faithful when models, researchers, or optimization pressure adapt to it.

## Memory Checklist

- Title: Assessing the Creativity of Large Language Models: Testing, Limits, and New Frontiers.
- Main theme: LLM creativity evaluation.
- Authors: Samuel Schapiro, Alexi Gladstone, Jonah Black, Heng Ji.
- Source date: 2026-05-13.
- Local tags: evaluation; creativity; scientific ideation; scale-context.
- One-line takeaway: The paper tests whether common human creativity tests actually predict creative achievement in LLMs across creative writing, divergent thinking, and scientific ideation.
