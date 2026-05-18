# Scale AI Paper Catalog

Source note: This page is the durable checklist of papers and resources already cross-filed into `AI / Scale AI Research Internship Prep`. Keep it updated whenever a new Scale-relevant AI paper, article, benchmark, or Scale Labs summary is ingested.

## Table of Contents

- [What This Page Is](#what-this-page-is)
- [Post-Training And Reward Signals](#post-training-and-reward-signals)
- [Interpretability And Representation Tools](#interpretability-and-representation-tools)
- [Evaluation, Rubrics, And Scalable Oversight](#evaluation-rubrics-and-scalable-oversight)
- [Agent Memory, Workflows, And Automated Research](#agent-memory-workflows-and-automated-research)
- [Alignment, Personas, And Hidden Objectives](#alignment-personas-and-hidden-objectives)
- [Embeddings And Representation Geometry](#embeddings-and-representation-geometry)
- [Scale Labs Summary Papers](#scale-labs-summary-papers)
- [Maintenance Rule](#maintenance-rule)

## What This Page Is

This is the simple list view of the Scale AI prep queue. The fuller [reading map](2026-05-14-scale-ai-papers-reading-map.md) explains how the papers fit together. This page is for quickly seeing what has already been done and where each item lives.

Items can naturally touch several themes. Each paper is listed once under the broad category where it is most useful for prep.

## Post-Training And Reward Signals

- [PostTrainBench](../../lessons/2026-05-03-posttrainbench-llm-agents-automate-post-training.md): whether LLM agents can automate post-training workflows.
- [SFT, RL, and On-Policy Distillation](../../lessons/2026-05-03-sft-rl-on-policy-distillation.md): conceptual map of SFT, RL, OPD, teachers, and gradient shape.
- [What We Learned From Letting AI Posttrain AI](../../lessons/2026-05-04-letting-ai-posttrain-ai.md): agent-assisted post-training as a research process.
- [PipelineRL](../../lessons/2026-05-05-pipelinerl.md): infrastructure and pipeline details for scalable RL post-training.
- [Rethinking The Trust Region In LLM RL](../../lessons/2026-05-04-rethinking-the-trust-region-in-llm-rl.md): objective design and stability in LLM RL.
- [MaxRL](../../lessons/2026-05-04-maxrl-maximum-likelihood-reinforcement-learning.md): alternate RL-method framing relevant to post-training.
- [Golden Goose RLVR](../../lessons/2026-05-01-golden-goose-rlvr-from-unverifiable-text.md): turning unverifiable text into verifiable RL tasks.
- [Rubrics as Rewards](../../lessons/2026-05-08-rubrics-as-rewards.md): prompt-specific rubrics as reward signals beyond exact verifiers.
- [Online Rubrics Elicitation](../../lessons/2026-05-05-online-rubrics-elicitation.md): pairwise preferences as a route to reusable rubrics.
- [Diverse Creative Writing Post-Training](../../ai-for-art/lessons/2026-05-08-diverse-creative-writing-post-training.md): post-training that preserves rare high-quality creative modes.
- [Dr. Post-Training](../../lessons/2026-05-14-dr-post-training-a-data-regularization-perspective-on-llm-post-training.md): a data-regularization view of post-training.
- [Reward Hacking in Rubric-Based Reinforcement Learning](../../lessons/2026-05-14-reward-hacking-in-rubric-based-reinforcement-learning.md): how rubric rewards can create proxy gains that fail to transfer.
- [RubricEM](../../lessons/2026-05-14-rubricem-meta-rl-with-rubric-guided-policy-decomposition-beyond-verifiab.md): rubric-guided meta-RL for long-horizon research agents.
- [Beyond Correctness](../../lessons/2026-05-18-beyond-correctness-confidence-aware-reward-modeling.md): confidence-aware reward modeling for reasoning quality beyond final-answer correctness.
- [Co-rewarding](../../lessons/2026-05-18-co-rewarding-stable-self-supervised-rl-reasoning.md): self-supervised RL stabilized with complementary reward views.
- [LoRA Without Regret](../../lessons/2026-05-18-lora-without-regret.md): Thinking Machines' empirical case that LoRA can match FullFT across many post-training settings when capacity and layer coverage are right.
- [Deep Reinforcement Learning From Human Preferences](../../lessons/2026-05-18-deep-reinforcement-learning-from-human-preferences.md): foundational learned reward model from pairwise human preferences.
- [Fine-Tuning Language Models From Human Preferences](../../lessons/2026-05-18-fine-tuning-language-models-from-human-preferences.md): adapts RLHF to pretrained transformer language models with reward modeling, PPO, and KL control.
- [Training Language Models To Follow Instructions With Human Feedback](../../lessons/2026-05-18-training-language-models-follow-instructions-human-feedback.md): standard InstructGPT `SFT -> reward model -> PPO` instruction-following pipeline.
- [Direct Preference Optimization](../../lessons/2026-05-18-direct-preference-optimization.md): direct preference-pair optimization alternative to explicit reward modeling and PPO.

## Interpretability And Representation Tools

- [Features as Rewards](../../lessons/2026-05-06-features-as-rewards.md): interpretability probes as scalable reward functions.
- [SparseRM](../../lessons/2026-05-15-sparserm-lightweight-preference-modeling-sparse-autoencoder.md): sparse-autoencoder preference directions as a lightweight reward model and online DPO filter.
- [Interpretable Reward Model Via Sparse Autoencoder](../../lessons/2026-05-15-interpretable-reward-model-via-sparse-autoencoder.md): SAE features as the reward basis, with feature-level attribution and preference manipulation.
- [Reinforcement Learning for Knowledge Awareness](../../lessons/2026-05-07-rl-for-knowledge-awareness.md): activation readouts as rewards for epistemic behavior.
- [The Quantization Model Of Neural Scaling](../../lessons/2026-05-14-quantization-model-neural-scaling.md): original quanta paper connecting scaling laws, emergent abilities, and gradient-discovered candidate mechanisms.
- [On Neural Scaling And The Quanta Hypothesis](../../lessons/2026-05-14-on-neural-scaling-and-the-quanta-hypothesis.md): scaling theory as a bridge between smooth loss laws, discrete mechanisms, sparse features, and interpretability limits.
- [Qwen-Scope](../../lessons/2026-05-04-qwen-scope.md): sparse features as development tools for large language models.
- [Gemma Scope](../../lessons/2026-05-12-gemma-scope-sparse-autoencoders.md): open sparse-autoencoder infrastructure for Gemma 2.
- [Matryoshka Sparse Autoencoders](../../lessons/2026-05-12-matryoshka-sparse-autoencoders.md): nested SAE dictionaries for broad and specific concepts.
- [Natural Language Autoencoders](../../lessons/2026-05-12-natural-language-autoencoders.md): natural-language activation explanations as audit hypotheses.
- [Sparse Representations For Acoustic Modeling](../../lessons/2026-05-12-sparse-representations-acoustic-modeling.md): historical sparse-representation baseline for shallow classifiers.
- [Olshausen And Field Sparse Coding](../../lessons/2026-05-12-olshausen-field-sparse-coding-v1.md): foundational overcomplete sparse-coding paper.
- [The Quest for the Right Mediator](../../lessons/2026-05-14-the-quest-for-the-right-mediator-surveying-mechanistic-interpretability.md): mechanistic interpretability through causal mediation analysis.
- [A Single Neuron Is Sufficient to Bypass Safety Alignment](../../lessons/2026-05-14-a-single-neuron-is-sufficient-to-bypass-safety-alignment-in-large-langua.md): a concrete internal-state safety bypass result.
- [Language Models Mostly Know What They Know](../../lessons/2026-05-18-language-models-mostly-know-what-they-know.md): early self-evaluation and knowledge-boundary signals for honest-model work.

## Evaluation, Rubrics, And Scalable Oversight

- [GDPval](../../lessons/2026-05-03-gdpval-real-world-economically-valuable-tasks.md): economically valuable task evaluation.
- [MoReBench](../../lessons/2026-05-12-morebench-moral-reasoning.md): process-focused moral reasoning evaluation with expert rubrics.
- [Positive Alignment](../../lessons/2026-05-13-positive-alignment-human-flourishing.md): evaluating and training toward pluralistic human flourishing.
- [Hallucinations Undermine Trust; Metacognition Is A Way Forward](../../lessons/2026-05-18-hallucinations-undermine-trust-metacognition.md): faithful uncertainty and metacognitive control as an evaluation target for trustworthy models and agents.
- [Metacognitive Uncertainty Paper Map](../../lessons/2026-05-18-metacognitive-uncertainty-paper-map.md): batch map for self-knowledge, faithful uncertainty, semantic uncertainty, reasoning-model calibration, confidence-aware RL, agentic search control, and revealed-preference audits.
- [Efficient Semantic Uncertainty Quantification](../../lessons/2026-05-18-efficient-semantic-uncertainty-quantification-diversity-steered-sampling.md): sample-efficient uncertainty estimation over semantic answer clusters.
- [Teaching Models To Express Their Uncertainty In Words](../../lessons/2026-05-18-teaching-models-express-uncertainty-in-words.md): calibrated verbalized confidence in natural language.
- [Teaching Language Models To Faithfully Express Uncertainty](../../lessons/2026-05-18-teaching-language-models-faithfully-express-uncertainty.md): hedging aligned with sample consistency rather than style.
- [Metacognitive Prompting Improves Understanding In LLMs](../../lessons/2026-05-18-metacognitive-prompting-improves-understanding-llms.md): introspective prompting as a task-performance scaffold.
- [Read Your Own Mind](../../lessons/2026-05-18-read-your-own-mind-reasoning-self-confidence-signals.md): reasoning traces as a source of self-confidence signals.
- [Reasoning About Uncertainty](../../lessons/2026-05-18-reasoning-about-uncertainty-reasoning-models-know.md): why reasoning models can still be overconfident.
- [Assessing the Creativity of Large Language Models](../../lessons/2026-05-14-assessing-the-creativity-of-large-language-models-testing-limits-and-new.md): creativity evaluation for LLMs.
- [Automated Alignment Is Harder Than You Think](../../lessons/2026-05-14-automated-alignment-is-harder-than-you-think.md): risks in automating alignment research and oversight.
- [Bloom](../../../materials/processed/ai/bloom-an-open-source-tool-for-automated-behavioral-evaluations.md): automated behavioral evaluation tooling.
- [A Diff Tool for AI](../../../materials/processed/ai/a-diff-tool-for-ai-finding-behavioral-differences-in-new-models.md): finding behavioral differences in model versions.

## Agent Memory, Workflows, And Automated Research

- [Memory In The Wild / ACL-Wiki](../../lessons/2026-05-08-context-engine-acl-wiki-agent-memory.md): production traces as external agent memory and evaluation data.
- [Autobrowse](../../lessons/2026-05-06-autobrowse-browser-agent-skills.md): browser traces becoming reusable agent skills.
- [AdaSearch](../../lessons/2026-05-18-adasearch-balancing-parametric-knowledge-search.md): explicit RL-trained decision about whether external search is necessary.
- [Towards an AI Co-Scientist](../../lessons/2026-05-04-ai-co-scientist.md): generate-debate-evolve workflow for scientist-in-the-loop hypothesis generation.
- [Learning, Fast and Slow](../../lessons/2026-05-14-learning-fast-and-slow-towards-llms-that-adapt-continually.md): fast context adaptation plus slower parameter updates.
- [AutoScientist](../../lessons/2026-05-14-autoscientist-automating-the-science-of-model-training.md): automated model-training experiments and evaluation loops.

## Alignment, Personas, And Hidden Objectives

- [Persona Selection Model](../../lessons/2026-05-12-persona-selection-model.md): post-training examples as evidence about the Assistant persona.
- [Split Personality Training](../../lessons/2026-05-12-split-personality-training-latent-knowledge.md): same-model hidden continuations for latent knowledge and auditing.
- [Natural Emergent Misalignment](../../lessons/2026-05-14-natural-emergent-misalignment-reward-hacking.md): reward hacking in coding RL generalizing into agentic misalignment.
- [AIs with Secret Loyalties](../../lessons/2026-05-14-ais-with-secret-loyalties-are-a-serious-but-addressable-threat.md): threat model for covert objectives and secret loyalties.
- [Can Revealed Preferences Clarify LLM Alignment And Steering](../../lessons/2026-05-18-can-revealed-preferences-clarify-llm-alignment-steering.md): decision-policy audits for whether stated objectives match revealed choices.
- [Model Spec Midtraining](../../lessons/2026-05-06-model-spec-midtraining.md): teaching a model a behavioral spec before downstream alignment examples.
- [Who's In Charge?](../../lessons/2026-05-03-whos-in-charge-disempowerment-patterns-llm-usage.md): disempowerment patterns and preference-model pitfalls.

## Embeddings And Representation Geometry

- [Generated-Token Embeddings](../../lessons/2026-05-12-generated-token-embeddings.md): pooling hidden states across generated tokens for stronger semantic embeddings.
- [fMRI Two-Phase Abstraction](../../lessons/2026-05-05-fmri-two-phase-abstraction-language-models.md): abstraction phases in language models and brain alignment.
- [Abstraction Induces Brain Alignment](../../lessons/2026-05-05-abstraction-induces-brain-alignment-language-speech-models.md): representation abstraction and alignment with language/speech brain data.

## Scale Labs Summary Papers

These are currently covered in the Scale Labs brief and summary file rather than as individual public lessons.

- [Agentic Rubrics as Contextual Verifiers for SWE Agents](../../../materials/processed/ai/scale-labs-papers-2025-2026/paper_summaries.md): context-grounded rubrics as scalable verification signals.
- [Chasing the Tail](../../../materials/processed/ai/scale-labs-papers-2025-2026/brief.md): rubric-based reward modeling and high-reward-tail examples.
- [VeRO](../../../materials/processed/ai/scale-labs-papers-2025-2026/paper_summaries.md): harness for agents optimizing other agents.
- [REASONING GYM](../../../materials/processed/ai/scale-labs-papers-2025-2026/paper_summaries.md): procedural reasoning environments for verifiable rewards.
- [ResearchRubrics](../../../materials/processed/ai/scale-labs-papers-2025-2026/paper_summaries.md): expert rubrics for deep-research agent evaluation.
- [Reliable Weak-to-Strong Monitoring](../../../materials/processed/ai/scale-labs-papers-2025-2026/paper_summaries.md): monitoring stronger agents with weaker systems and scaffolds.

## Maintenance Rule

When adding a new Scale-relevant paper, update this catalog in the same change as the normal lesson/source ingest. Put the paper under one broad category, then update the [reading map](2026-05-14-scale-ai-papers-reading-map.md) only if the paper changes the recommended prep path.
