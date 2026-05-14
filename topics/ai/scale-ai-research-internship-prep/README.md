# Topic: Scale AI Research Internship Prep

Path: `topics/ai/scale-ai-research-internship-prep`

## Scope

- Cross-filing hub for AI papers and resources that may be useful for a Scale AI research internship.
- Current focus: post-training, interpretability, agent memory, and the overlap where internal representations, embedding spaces, probes, rubrics, production traces, or learned reward models become training signals.
- This is a collection layer, not a relocation rule. Keep each paper in its normal AI filing path, then add it to [INDEX.md](INDEX.md) when it is relevant to the internship-prep queue.

## Structure

- [INDEX.md](INDEX.md): cross-filed reading queue and category map.
- `lessons/`: public sub-lessons that make the prep grouping visible in the AI reader.
- `curriculum/`
- `practice/`

## Public Lessons

- [Scale AI Papers Reading Map](lessons/2026-05-14-scale-ai-papers-reading-map.md): visible overview of the Scale AI paper clusters inside the AI category.

## Filing Policy

- Use `post-training` for SFT, RL, RLVR, preference optimization, reward modeling, verifier design, rubric rewards, agent self-improvement, and post-training infrastructure.
- Use `interpretability` for probes, sparse features, activation analysis, representation geometry, behavioral diffing, and internal-state diagnostics.
- Use `embeddings` for embedding models, representation geometry, similarity metrics, retrieval/evaluation spaces, and semantic or style distance signals.
- Use `agent-memory` for context engines, trace-to-memory pipelines, retrieval-augmented agent memory, production feedback loops, and enterprise-specific procedural memory.
- Use `post-training x interpretability` when a representation-level signal becomes a reward, monitor, rubric, verifier, alignment-generalization tool, or training target.
- Use `scale-context` for Scale Labs papers or resources that match Scale research themes: evaluation, scalable supervision, data, agent benchmarks, and workflow-level verifiers.
