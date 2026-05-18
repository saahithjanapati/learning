# AdaSearch

Source: `https://arxiv.org/abs/2512.16883`
Authors: Tzu-Han Lin, Wei-Lin Chen, Chen-An Li, Hung-yi Lee, Yun-Nung Chen, Yu Meng
Published: `2025-12-18`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for agentic search and knowledge-boundary awareness`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; agents; evaluation; post-training`

## Summary

AdaSearch studies search-augmented LLM agents and the problem of deciding when search is actually needed. Overusing search adds cost and can expose the agent to noisy or malicious content. Underusing search makes the agent rely on stale or insufficient parametric knowledge and increases hallucination risk.

The paper argues that penalizing tool-call counts is an ambiguous proxy. Instead, AdaSearch uses a two-stage outcome-driven RL framework that separates problem solving from the decision of whether to invoke search. The decision becomes explicit, measurable, and more interpretable.

## Core Ideas

- Agentic search quality is not equal to fewer search calls.
- The real target is knowledge-boundary awareness.
- Search decisions should distinguish necessary from unnecessary search.
- Explicit routing improves transparency in high-stakes domains.

## Why It Matters

AdaSearch is the agent-control version of metacognition. The model needs to estimate whether its internal knowledge is enough before deciding whether to use a tool.

## Questions For Review

1. Why is tool-call count a weak metric?
2. What are the risks of over-search and under-search?
3. How does AdaSearch make metacognition visible in agent behavior?
