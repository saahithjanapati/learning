# Think Before You Speak: Training Language Models With Pause Tokens

Captured: 2026-05-18
Topic: AI / Collection + Scale AI Research Internship Prep
Source: `https://proceedings.iclr.cc/paper_files/paper/2024/file/76917808731dae9e6d62c2a7a6afb542-Paper-Conference.pdf`
Processed source: [materials/processed/ai/think-before-you-speak-training-language-models-with-pause-tokens.md](../../../materials/processed/ai/think-before-you-speak-training-language-models-with-pause-tokens.md)
Lesson: [topics/ai/lessons/2026-05-18-think-before-you-speak-pause-tokens.md](../../../topics/ai/lessons/2026-05-18-think-before-you-speak-pause-tokens.md)
Tags: pause tokens, inference-time compute, pretraining, test-time scaling, reasoning

## Normalized Takeaway

Pause tokens are trained silent thinking slots. They add almost no parameters, but they give the model extra hidden positions before answering. The important lesson is that the model must learn to use those positions during pretraining and finetuning; inference-only filler tokens are not enough.

## Why It Belongs In The Prep Queue

This is a concrete test-time compute paper that changes the model's input/output protocol instead of relying on longer visible reasoning. It is useful context for RLVR, verifier-driven search, adaptive compute, and agent settings where a model may need more computation without exposing a full chain-of-thought trace.

## Questions To Revisit

1. Can pause tokens be made useful for already pretrained models?
2. How should a system choose the number of pause tokens per input?
3. What circuits or attention patterns appear inside pause positions?
4. How does pause inference compare with latent reasoning tokens in newer reasoning models?
5. Can pause-token training be combined with distillation or multi-token prediction?

