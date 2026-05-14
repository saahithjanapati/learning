# Scale AI Papers Reading Map

Source note: This lesson makes the Scale AI research-prep grouping explicit as a public sub-lesson under `AI / Scale AI Research Internship Prep`. It summarizes the existing cross-filed paper queue in [INDEX.md](../INDEX.md) and points back to the regular AI lessons where the full paper notes live.

## Table of Contents

- [What This Sub-Lesson Is For](#what-this-sub-lesson-is-for)
- [The Core Theme](#the-core-theme)
- [Reading Cluster 1: Post-Training And Reward Signals](#reading-cluster-1-post-training-and-reward-signals)
- [Reading Cluster 2: Interpretability As Supervision](#reading-cluster-2-interpretability-as-supervision)
- [Reading Cluster 3: Evaluation, Rubrics, And Scalable Oversight](#reading-cluster-3-evaluation-rubrics-and-scalable-oversight)
- [Reading Cluster 4: Agents, Memory, And Workflow Evaluation](#reading-cluster-4-agents-memory-and-workflow-evaluation)
- [How To Use This Map](#how-to-use-this-map)

## What This Sub-Lesson Is For

The Learning Machine already cross-files Scale AI relevant papers in the Scale AI research internship prep index. This page makes that grouping visible as its own AI sub-lesson.

The point is not to move the original lessons. Each paper still lives in its normal AI location. This page is a reading map layered on top of them.

Use it when you want the Scale AI preparation view of the AI collection:

- post-training;
- reward modeling;
- rubrics;
- evaluation;
- interpretability;
- agent memory;
- scalable supervision;
- workflow-level verifiers.

## The Core Theme

The common thread is:

**How do we turn messy, open-ended AI behavior into signals that can be evaluated, supervised, improved, and audited?**

That is why the grouping mixes papers on post-training, interpretability, rubrics, benchmarks, and agents. Scale-style research is often about making hard-to-score behavior measurable enough to train or evaluate without pretending that every task has a clean answer key.

## Reading Cluster 1: Post-Training And Reward Signals

Start here if you want the training side.

- [PostTrainBench](../../lessons/2026-05-03-posttrainbench-llm-agents-automate-post-training.md)
- [SFT, RL, and On-Policy Distillation](../../lessons/2026-05-03-sft-rl-on-policy-distillation.md)
- [Rubrics as Rewards](../../lessons/2026-05-08-rubrics-as-rewards.md)
- [Online Rubrics Elicitation](../../lessons/2026-05-05-online-rubrics-elicitation.md)
- [Diverse Creative Writing Post-Training](../../ai-for-art/lessons/2026-05-08-diverse-creative-writing-post-training.md)

These lessons are about how to train models after pretraining when the target behavior is open-ended. The important question is whether the reward signal captures what humans actually care about or merely creates a new surface for reward hacking.

## Reading Cluster 2: Interpretability As Supervision

Read this cluster when you want to understand the overlap between internal representations and post-training.

- [Features as Rewards](../../lessons/2026-05-06-features-as-rewards.md)
- [Reinforcement Learning for Knowledge Awareness](../../lessons/2026-05-07-rl-for-knowledge-awareness.md)
- [Gemma Scope](../../lessons/2026-05-12-gemma-scope-sparse-autoencoders.md)
- [Matryoshka Sparse Autoencoders](../../lessons/2026-05-12-matryoshka-sparse-autoencoders.md)
- [Natural Language Autoencoders](../../lessons/2026-05-12-natural-language-autoencoders.md)
- [Generated-Token Embeddings](../../lessons/2026-05-12-generated-token-embeddings.md)
- [Base Models Know How To Reason](../../lessons/2026-05-12-base-models-reason-thinking-models-learn-when.md)

The key idea is that activations, sparse features, embeddings, and probes might become more than explanations. They might become monitors, reward features, steering handles, or audit tools.

The caution is that once a signal becomes an optimization target, it can be gamed. So the central research question is not only whether a feature correlates with the desired behavior, but whether it remains faithful under training pressure.

## Reading Cluster 3: Evaluation, Rubrics, And Scalable Oversight

Read this cluster when you want the evaluation side.

- [MoReBench](../../lessons/2026-05-12-morebench-moral-reasoning.md)
- [Positive Alignment](../../lessons/2026-05-13-positive-alignment-human-flourishing.md)
- [Natural Emergent Misalignment](../../lessons/2026-05-14-natural-emergent-misalignment-reward-hacking.md)
- [Persona Selection Model](../../lessons/2026-05-12-persona-selection-model.md)
- [Split Personality Training](../../lessons/2026-05-12-split-personality-training-latent-knowledge.md)

These papers ask how to evaluate behavior that is pluralistic, long-horizon, hidden, or vulnerable to shallow benchmark optimization.

The important move is from answer-only scoring to process-sensitive scoring. A model may choose a plausible final answer while using bad reasoning, hiding a failure, exploiting a loophole, or optimizing for the wrong persona.

## Reading Cluster 4: Agents, Memory, And Workflow Evaluation

Read this cluster when you want agent systems and production traces.

- [Context Engine, ACL-Wiki, And Production Agent Memory](../../lessons/2026-05-08-context-engine-acl-wiki-agent-memory.md)
- [Autobrowse](../../lessons/2026-05-06-autobrowse-browser-agent-skills.md)
- [GDPval](../../lessons/2026-05-03-gdpval-real-world-economically-valuable-tasks.md)

This cluster is about longer workflows. Instead of only asking whether a model answers one prompt correctly, it asks whether an agent can use prior context, retrieve relevant history, avoid stale distractors, and perform economically meaningful tasks.

This is especially relevant to Scale-style evaluation because many valuable AI tasks are workflow tasks, not isolated multiple-choice questions.

## How To Use This Map

Use the clusters in order if you want a broad prep path:

1. Learn the post-training vocabulary.
2. Study reward and rubric signals.
3. Add interpretability and representation-level supervision.
4. Move to evaluation, oversight, and agent workflows.

Use the [full index](../INDEX.md) when you want the complete cross-filed queue with tags, nearby readings, and open questions.
