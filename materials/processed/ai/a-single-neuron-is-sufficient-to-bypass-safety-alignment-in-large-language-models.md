# A Single Neuron Is Sufficient to Bypass Safety Alignment in Large Language Models

Source: `https://arxiv.org/abs/2605.08513`
PDF or source page: `https://arxiv.org/pdf/2605.08513`
Tweet resolved from: `https://x.com/_akhaliq/status/2054916924501360812`
Authors: Hamid Kazemi, Atoosa Chegini, Maria Safi
Source publication: 2026-05-08
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

The paper argues that safety alignment in some LLMs can depend on specific neurons that gate refusal behavior or encode harmful concepts. By targeting individual neurons, the authors report both directions of failure: suppressing refusal behavior on harmful requests and inducing harmful content from harmless prompts through amplification. The result suggests that at least some safety behavior may be less redundantly distributed than one might hope.

## Full-Paper Ingest Notes

The full paper distinguishes two mechanistic systems: refusal neurons, which gate whether harmful knowledge is expressed, and concept neurons, which encode harmful-content concepts themselves. The core claim is causal, not merely correlational: suppressing an identified refusal neuron can bypass refusal behavior, while amplifying a concept neuron can induce harmful content from otherwise innocent prompts.

The experiments span multiple model families and sizes, with analyses of pretraining, alignment, neuron localization, refusal directions, and geometric alignment. A major implication is that safety behavior may be more locally gated than many alignment stories assume. If a single MLP neuron can be causally sufficient for a refusal gate, then safety is not always a smoothly distributed property across the whole network.

The important caution is that this does not mean one neuron contains all of safety. It means particular refusal behaviors can depend on brittle, localized mechanisms. For Scale-style evaluation, this matters because black-box safety tests may miss internal single-component vulnerabilities that only appear under causal intervention.

## Why It Matters

This belongs in the AI collection and Scale prep because it connects interpretability, safety, and internal monitors. It is a warning that safety mechanisms can have brittle causal bottlenecks.

## Reading Notes

- Primary theme: single-neuron safety bypass.
- Tags: safety; interpretability; refusal; model internals.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.08513
- PDF or source page: https://arxiv.org/pdf/2605.08513
- Tweet: https://x.com/_akhaliq/status/2054916924501360812
