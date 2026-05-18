# Metacognitive Prompting Improves Understanding In Large Language Models

Source: `https://arxiv.org/abs/2308.05342`
Authors: Yuqing Wang, Yun Zhao
Published: `2023-08-10`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `individual paper normalization for metacognitive prompting`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; agents`

## Summary

This paper introduces Metacognitive Prompting, a structured prompting method inspired by introspective human reasoning. Instead of directly answering, the model performs self-aware evaluation steps intended to improve language understanding.

The authors evaluate MP on Llama 2, PaLM 2, GPT-3.5, and GPT-4 across NLU datasets from GLUE, SuperGLUE, BLUE, and LexGLUE. They report that MP outperforms standard and chain-of-thought prompting on many general and domain-specific understanding tasks.

## Core Ideas

- Metacognition can be operationalized as a prompt procedure.
- The method targets understanding tasks, not only math or logic reasoning.
- The paper compares MP with chain-of-thought and related prompt methods.
- Prompted metacognition can improve behavior without proving deep self-knowledge.

## Why It Matters

This is the prompting-side member of the batch. It is useful as a contrast: metacognitive procedures can improve task performance, but they are not the same as calibrated internal uncertainty.

## Questions For Review

1. How does MP differ from ordinary chain-of-thought?
2. Why is NLU a different test bed from math reasoning?
3. What would be needed to show MP is faithful rather than just useful?
