# The Quest for the Right Mediator: Surveying Mechanistic Interpretability for NLP Through the Lens of Causal Mediation Analysis

Source note: This paper lesson is based on Aaron Mueller, Jannik Brinkmann, Millicent Li, Samuel Marks, Koyena Pal, Nikhil Prakash, Can Rager, Aruna Sankaranarayanan, Arnab Sen Sharma, Jiuding Sun, Eric Todd, David Bau, Yonatan Belinkov, "The Quest for the Right Mediator: Surveying Mechanistic Interpretability for NLP Through the Lens of Causal Mediation Analysis," source date 2026-02-25. Source: [https://doi.org/10.1162/COLI.a.572](https://doi.org/10.1162/COLI.a.572). Processed source: [materials/processed/ai/the-quest-for-the-right-mediator-surveying-mechanistic-interpretability-for-nlp-through-the-lens-of-causal-mediation-analysis.md](../../../materials/processed/ai/the-quest-for-the-right-mediator-surveying-mechanistic-interpretability-for-nlp-through-the-lens-of-causal-mediation-analysis.md). Tweet source: [https://x.com/complingjournal/status/2054543899872620654](https://x.com/complingjournal/status/2054543899872620654).

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

This survey argues that mechanistic interpretability for NLP needs a more unified causal foundation. It frames interpretability methods through causal mediation analysis, focusing on the mediators researchers choose as causal units and the search methods used to find them. The paper taxonomizes mediator types, discusses when each is appropriate, and argues for standardized evaluations and clearer definitions of what mechanism-level explanation means.

### Why This Was In The Tweet List

This belongs in the AI collection and Scale prep because it provides a conceptual framework for deciding whether an internal feature, activation patch, circuit, or probe is the right causal unit for auditing or supervising model behavior.

### What To Remember

The useful reading frame is **mechanistic interpretability as causal mediation**. The source is less important as a standalone headline than as part of the broader Learning Machine thread around post-training, evaluation, interpretability, agent workflows, safety, and scalable supervision.

## Full-Length Version

## The Problem

The Quest for the Right Mediator: Surveying Mechanistic Interpretability for NLP Through the Lens of Causal Mediation Analysis is about mechanistic interpretability as causal mediation. The motivation is that modern AI systems increasingly need signals, objectives, or training/evaluation procedures that are more subtle than ordinary benchmark accuracy.

## Main Idea

This survey argues that mechanistic interpretability for NLP needs a more unified causal foundation. It frames interpretability methods through causal mediation analysis, focusing on the mediators researchers choose as causal units and the search methods used to find them. The paper taxonomizes mediator types, discusses when each is appropriate, and argues for standardized evaluations and clearer definitions of what mechanism-level explanation means.

## How To Read It

Read this source as part of the current AI research cluster rather than as an isolated paper. Ask three questions while reading:

1. What behavior, representation, or training problem is the source trying to make measurable?
2. What proxy signal does it use, and what does that proxy miss?
3. If the proxy became an optimization target, how might a model exploit it?

## Connection To The Local AI Curriculum

This belongs in the AI collection and Scale prep because it provides a conceptual framework for deciding whether an internal feature, activation patch, circuit, or probe is the right causal unit for auditing or supervising model behavior.

This connects naturally to the Scale AI research-prep map when the source touches rubrics, post-training, evaluation, interpretable signals, or long-horizon agent workflows. It connects to the broader AI collection when it is more about training systems, creativity metrics, or generalization theory.

## Full-Paper Ingest Notes

The full survey argues that mechanistic interpretability needs clearer causal units. It reframes interpretability methods through causal mediation analysis: given an input, output, and internal component, the question is whether intervening on that mediator changes model behavior in a way that supports explanation, hypothesis verification, localization, or editing.

The paper surveys mediator types used in NLP interpretability, including neurons, attention heads, MLPs, residual-stream directions, circuits, features, subspaces, and higher-level abstractions. It compares their strengths and weaknesses along dimensions such as human interpretability, compute cost, causal faithfulness, granularity, and suitability for different research goals.

The main recommendation is to stop treating all interpretability targets as interchangeable. Different goals need different mediators and search methods. The authors call for discovering new mediator types with better tradeoffs and for more standardized evaluations so the field can compare mediator choices instead of accumulating ad hoc case studies.

## Limitations And Cautions

This lesson has been upgraded from the original abstract/page-level tweet ingest to a full-paper/full-source structured ingest. Treat it as a fuller study note: it now reflects the canonical PDF or source article beyond the tweet and abstract, while still avoiding a verbatim reproduction of the paper.

The main caution is proxy validity. Many of these papers propose a way to measure, supervise, or improve a difficult behavior. The critical question is whether the proposed signal remains faithful when models, researchers, or optimization pressure adapt to it.

## Memory Checklist

- Title: The Quest for the Right Mediator: Surveying Mechanistic Interpretability for NLP Through the Lens of Causal Mediation Analysis.
- Main theme: mechanistic interpretability as causal mediation.
- Authors: Aaron Mueller, Jannik Brinkmann, Millicent Li, Samuel Marks, Koyena Pal, Nikhil Prakash, Can Rager, Aruna Sankaranarayanan, Arnab Sen Sharma, Jiuding Sun, Eric Todd, David Bau, Yonatan Belinkov.
- Source date: 2026-02-25.
- Local tags: interpretability; causal mediation; survey; NLP.
- One-line takeaway: This survey argues that mechanistic interpretability for NLP needs a more unified causal foundation.
