# Scale AI Research Internship Prep 0 -> 1 Curriculum

Topic Path: `topics/ai/scale-ai-research-internship-prep`

## Source Trace

- Canonical manifest: `learning_system/SOURCE_MAP.json`
- Cross-filing index: [topics/ai/scale-ai-research-internship-prep/INDEX.md](../INDEX.md)

## Source Materials

- [Scale AI Papers Reading Map](../lessons/2026-05-14-scale-ai-papers-reading-map.md)
- [Scale AI Research Internship Prep Index](../INDEX.md)
- [Scale Labs 2025-2026 research brief](../../../../materials/processed/ai/scale-labs-papers-2025-2026/brief.md)
- [Rubrics as Rewards](../../../../materials/processed/ai/rubrics-as-rewards-reinforcement-learning-beyond-verifiable-domains.md)
- [Reinforcement Learning for Knowledge Awareness](../../../../materials/processed/ai/reinforcement-learning-for-knowledge-awareness.md)
- [Features as Rewards](../../../../materials/processed/ai/features-as-rewards-scalable-supervision-open-ended-tasks-interpretability.md)
- [PostTrainBench](../../../../materials/processed/ai/posttrainbench-can-llm-agents-automate-llm-post-training.md)
- [Diverse Creative Writing Post-Training](../../../../materials/processed/ai/modifying-large-language-model-post-training-for-diverse-creative-writing.md)
- [Memory In The Wild / ACL-Wiki](../../../../materials/processed/ai/memory-in-the-wild-context-engine-acl-wiki.md)
- [Natural Language Autoencoders](../../../../materials/processed/ai/natural-language-autoencoders-produce-unsupervised-explanations-llm-activations.md)
- [Gemma Scope](../../../../materials/processed/ai/gemma-scope-open-sparse-autoencoders-everywhere-all-at-once-gemma-2.md)
- [Matryoshka Sparse Autoencoders](../../../../materials/processed/ai/learning-multi-level-features-matryoshka-sparse-autoencoders.md)
- [Generated-Token Embeddings](../../../../materials/processed/ai/the-truth-lies-somewhere-in-the-middle-generated-tokens.md)
- [Base Models Know How To Reason](../../../../materials/processed/ai/base-models-know-how-to-reason-thinking-models-learn-when.md)
- [Positive Alignment](../../../../materials/processed/ai/positive-alignment-artificial-intelligence-for-human-flourishing.md)
- [Olshausen and Field sparse coding](../../../../materials/processed/ai/sparse-coding-overcomplete-basis-set-strategy-employed-by-v1.md)
- [Persona Selection Model](../../../../materials/processed/ai/the-persona-selection-model.md)
- [Split Personality Training](../../../../materials/processed/ai/split-personality-training-revealing-latent-knowledge.md)
- [MoReBench](../../../../materials/processed/ai/morebench-evaluating-procedural-pluralistic-moral-reasoning.md)

## Transcript Anchors

- Post-training needs reward signals that are useful beyond exact math/code verifiers.
- Open-ended post-training can improve quality while accidentally collapsing valid response diversity.
- Embedding spaces can turn semantic similarity, style distance, retrieval neighborhoods, and representation geometry into measurable signals for evaluation or post-training.
- Generated-token embeddings suggest that autoregressive generation can be a representation-forming trajectory, not only an output string.
- Natural-language activation explanations can turn hidden-state evidence into audit hypotheses, but must be corroborated before they become reward or monitor signals.
- Sparse feature spaces can provide candidate internal monitors or rewards, but reconstruction quality is not the same as robust interpretability.
- Matryoshka SAEs make the reconstruction-vs-feature-quality trade-off explicit by preserving high-level concepts that standard large dictionaries can absorb or split.
- Overcomplete sparse coding is the historical bridge from natural-signal statistics to interpretable-looking learned feature dictionaries.
- Thinking-model post-training may teach when to deploy latent reasoning mechanisms rather than building every mechanism from scratch.
- Post-training examples can act as evidence about the Assistant persona, so local reward design can have broad character-level generalization effects.
- A hidden same-model audit continuation is a proposed way to elicit latent knowledge, but it must beat separate evaluators on failures not visible in output text.
- MoReBench shows how expert rubrics can evaluate pluralistic moral reasoning as a process rather than reducing ambiguous dilemmas to answer keys.
- Positive alignment reframes evaluation around long-term human flourishing, autonomy support, and pluralistic value governance rather than only harm avoidance.
- Production traces can become external agent memory, but memory systems need benchmarks that test both useful retrieval and distracting retrieval.
- Interpretability can sometimes turn latent representations into monitors or rewards.
- Scale-style evaluation work often tries to make open-ended or long-horizon behavior measurable enough to improve.

## Outcome

- Build a compact reading map for internship preparation around post-training, interpretability, scalable supervision, and Scale Labs research themes.

## Modules

1. Post-training fundamentals: SFT, RL, RLVR, OPD, reward modeling, and post-training infrastructure.
2. Reward signals for open-ended tasks: rubrics, pairwise preferences, learned verifiers, and calibration targets.
3. Interpretability as supervision: probes, sparse features, activation readouts, embedding spaces, and feature rewards.
4. Agent and workflow evaluation: Scale Labs papers on rubrics, agent harnesses, long-horizon tasks, memory systems, and monitoring.
5. Research questions: when feature/rubric/embedding/memory signals are robust, when they are gameable, and how to audit the difference.
