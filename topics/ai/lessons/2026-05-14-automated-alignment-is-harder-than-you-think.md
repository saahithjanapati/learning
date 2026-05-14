# Automated alignment is harder than you think

Source note: This paper lesson is based on Aleksandr Bowkis, Marie Davidsen Buhl, Jacob Pfau, Geoffrey Irving, "Automated alignment is harder than you think," source date 2026-05-07. Source: [https://arxiv.org/abs/2605.06390](https://arxiv.org/abs/2605.06390). Processed source: [materials/processed/ai/automated-alignment-is-harder-than-you-think.md](../../../materials/processed/ai/automated-alignment-is-harder-than-you-think.md). Tweet source: [https://x.com/safe_paper/status/2054485431979213190](https://x.com/safe_paper/status/2054485431979213190).

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

The paper critiques the proposal that increasingly capable AI agents can safely automate alignment research. Even without deliberate sabotage, agent-generated alignment work may contain systematic errors that humans fail to catch, and correct-looking outputs may be aggregated into overconfident safety assessments. The authors argue that automated alignment is especially hard because alignment research contains fuzzy tasks without clear criteria, because AI errors may be alien to human reviewers, and because shared training processes can make AI outputs correlated.

### Why This Was In The Tweet List

This belongs in Scale prep because it is about evaluating long-horizon research agents and avoiding misleading automated safety assessments.

### What To Remember

The useful reading frame is **automated alignment risks**. The source is less important as a standalone headline than as part of the broader Learning Machine thread around post-training, evaluation, interpretability, agent workflows, safety, and scalable supervision.

## Full-Length Version

## The Problem

Automated alignment is harder than you think is about automated alignment risks. The motivation is that modern AI systems increasingly need signals, objectives, or training/evaluation procedures that are more subtle than ordinary benchmark accuracy.

## Main Idea

The paper critiques the proposal that increasingly capable AI agents can safely automate alignment research. Even without deliberate sabotage, agent-generated alignment work may contain systematic errors that humans fail to catch, and correct-looking outputs may be aggregated into overconfident safety assessments. The authors argue that automated alignment is especially hard because alignment research contains fuzzy tasks without clear criteria, because AI errors may be alien to human reviewers, and because shared training processes can make AI outputs correlated.

## How To Read It

Read this source as part of the current AI research cluster rather than as an isolated paper. Ask three questions while reading:

1. What behavior, representation, or training problem is the source trying to make measurable?
2. What proxy signal does it use, and what does that proxy miss?
3. If the proxy became an optimization target, how might a model exploit it?

## Connection To The Local AI Curriculum

This belongs in Scale prep because it is about evaluating long-horizon research agents and avoiding misleading automated safety assessments.

This connects naturally to the Scale AI research-prep map when the source touches rubrics, post-training, evaluation, interpretable signals, or long-horizon agent workflows. It connects to the broader AI collection when it is more about training systems, creativity metrics, or generalization theory.

## Full-Paper Ingest Notes

The full paper analyzes a proposed automated alignment research program: use increasingly capable AI agents to do more empirical alignment work, build safety cases for later agents, and eventually hand off primary research responsibility. The authors argue that this can fail even without deliberate scheming because alignment research contains many hard-to-supervise fuzzy tasks.

The key failure mode is compelling but misleading research. Agents may produce outputs with systematic errors that human reviewers do not catch, and even correct-looking outputs can be aggregated into overconfident safety assessments. The paper gives several reasons the problem is worse for automated alignment than for ordinary human research: optimization pressure concentrates mistakes where reviewers are weak, AI mistakes may be alien rather than human-like, AI-generated arguments may exceed human evaluability, and shared weights/data/training can make outputs correlated.

The paper then discusses generalization and scalable oversight as candidate solutions, but emphasizes that both face special challenges in automated alignment. The actionable takeaway is that agent capability alone is not enough; we need ways to validate fuzzy-task performance, sample maximally informative outputs, measure agent capabilities, and audit aggregation into safety cases.

## Limitations And Cautions

This lesson has been upgraded from the original abstract/page-level tweet ingest to a full-paper/full-source structured ingest. Treat it as a fuller study note: it now reflects the canonical PDF or source article beyond the tweet and abstract, while still avoiding a verbatim reproduction of the paper.

The main caution is proxy validity. Many of these papers propose a way to measure, supervise, or improve a difficult behavior. The critical question is whether the proposed signal remains faithful when models, researchers, or optimization pressure adapt to it.

## Memory Checklist

- Title: Automated alignment is harder than you think.
- Main theme: automated alignment risks.
- Authors: Aleksandr Bowkis, Marie Davidsen Buhl, Jacob Pfau, Geoffrey Irving.
- Source date: 2026-05-07.
- Local tags: alignment; automated research; scalable oversight; evaluation.
- One-line takeaway: The paper critiques the proposal that increasingly capable AI agents can safely automate alignment research.
