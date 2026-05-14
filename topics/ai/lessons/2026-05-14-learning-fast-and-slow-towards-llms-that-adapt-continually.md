# Learning, Fast and Slow: Towards LLMs That Adapt Continually

Source note: This paper lesson is based on Rishabh Tiwari, Kusha Sareen, Lakshya A Agrawal, Joseph E. Gonzalez, Matei Zaharia, Kurt Keutzer, Inderjit S Dhillon, Rishabh Agarwal, Devvrit Khatri, "Learning, Fast and Slow: Towards LLMs That Adapt Continually," source date 2026-05-12. Source: [https://arxiv.org/abs/2605.12484](https://arxiv.org/abs/2605.12484). Processed source: [materials/processed/ai/learning-fast-and-slow-towards-llms-that-adapt-continually.md](../../../materials/processed/ai/learning-fast-and-slow-towards-llms-that-adapt-continually.md). Tweet source: [https://x.com/kushasareen/status/2054586907904901245](https://x.com/kushasareen/status/2054586907904901245).

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

The paper introduces Fast-Slow Training, where model parameters are slow weights and optimized context acts as fast weights. The goal is to combine the adaptability of in-context learning with the stronger performance of weight updates. FST learns from textual feedback, remains closer to the base model than parameter-only RL, reduces catastrophic forgetting, and improves plasticity in continual learning settings. The authors report up to 3x better sample efficiency than slow learning alone across reasoning tasks.

### Why This Was In The Tweet List

This belongs in Scale prep because it addresses continual post-training and how to adapt models without destroying base skills, a recurring problem in real model customization.

### What To Remember

The useful reading frame is **fast-slow continual adaptation**. The source is less important as a standalone headline than as part of the broader Learning Machine thread around post-training, evaluation, interpretability, agent workflows, safety, and scalable supervision.

## Full-Length Version

## The Problem

Learning, Fast and Slow: Towards LLMs That Adapt Continually is about fast-slow continual adaptation. The motivation is that modern AI systems increasingly need signals, objectives, or training/evaluation procedures that are more subtle than ordinary benchmark accuracy.

## Main Idea

The paper introduces Fast-Slow Training, where model parameters are slow weights and optimized context acts as fast weights. The goal is to combine the adaptability of in-context learning with the stronger performance of weight updates. FST learns from textual feedback, remains closer to the base model than parameter-only RL, reduces catastrophic forgetting, and improves plasticity in continual learning settings. The authors report up to 3x better sample efficiency than slow learning alone across reasoning tasks.

## How To Read It

Read this source as part of the current AI research cluster rather than as an isolated paper. Ask three questions while reading:

1. What behavior, representation, or training problem is the source trying to make measurable?
2. What proxy signal does it use, and what does that proxy miss?
3. If the proxy became an optimization target, how might a model exploit it?

## Connection To The Local AI Curriculum

This belongs in Scale prep because it addresses continual post-training and how to adapt models without destroying base skills, a recurring problem in real model customization.

This connects naturally to the Scale AI research-prep map when the source touches rubrics, post-training, evaluation, interpretable signals, or long-horizon agent workflows. It connects to the broader AI collection when it is more about training systems, creativity metrics, or generalization theory.

## Limitations And Cautions

This lesson is based on the canonical abstract/page-level ingest rather than a line-by-line full-paper walkthrough. Treat it as a first-pass reading note: enough to orient you, decide whether the paper belongs in a deeper reading queue, and connect it to adjacent lessons.

The main caution is proxy validity. Many of these papers propose a way to measure, supervise, or improve a difficult behavior. The critical question is whether the proposed signal remains faithful when models, researchers, or optimization pressure adapt to it.

## Memory Checklist

- Title: Learning, Fast and Slow: Towards LLMs That Adapt Continually.
- Main theme: fast-slow continual adaptation.
- Authors: Rishabh Tiwari, Kusha Sareen, Lakshya A Agrawal, Joseph E. Gonzalez, Matei Zaharia, Kurt Keutzer, Inderjit S Dhillon, Rishabh Agarwal, Devvrit Khatri.
- Source date: 2026-05-12.
- Local tags: post-training; continual learning; RL; context optimization; plasticity.
- One-line takeaway: The paper introduces Fast-Slow Training, where model parameters are slow weights and optimized context acts as fast weights.
