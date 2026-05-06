# Accelerating Gemma 4 with Multi-Token Prediction Drafters

Source: `https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/`
Related discussion path: the pinned `link ingestion` ChatGPT thread contained the `x.com/googlegemma/status/2051694045869879749` link, which resolves in public coverage to this official Google announcement.
Authors: Olivier Lacombe and Maarten Grootendorst
Published: 2026-05-05
Ingested: 2026-05-06
Extraction engine: direct Google blog capture
Strategy: canonical website/article ingest

## Summary

Google announced **Multi-Token Prediction (MTP) drafters** for the Gemma 4 model family as a way to make inference significantly faster without changing output quality.

The high-level problem is that standard autoregressive inference is memory-bandwidth bound. Even when a model is capable, token generation can feel slow because the system still has to run a full next-token loop over and over.

MTP drafters attack that bottleneck with speculative decoding. A smaller drafting model proposes several likely next tokens, and the larger target model verifies them in batches. When the draft is correct, the system can effectively "jump ahead" instead of crawling one token at a time.

## Claimed Benefit

The blog says Gemma 4 with MTP drafters can achieve **up to 3x speedups** while preserving output quality and reasoning logic.

That matters because inference speed is not just a convenience metric. Faster decoding changes:

- interactive user experience,
- throughput per GPU,
- latency for agent loops,
- and the practicality of using open models locally.

## Why This Matters For Open Models

Gemma 4 is already positioned as a capable open model family that runs across laptops, workstations, mobile devices, and cloud infrastructure. MTP drafters push that same product philosophy further: not only should the model be strong, it should also feel responsive enough to use in real workflows.

This is especially important for open-model ecosystems because deployment friction often kills adoption. If a model is good but unpleasantly slow, developers may still choose a different model or a hosted proprietary API. MTP can make the open-model path much more attractive.

## Practical Angle

Google's announcement also matters because it is not just a theoretical technique paper. The blog positions the release around developer tooling and real runtime stacks such as LiteRT-LM, MLX, Hugging Face Transformers, and vLLM.

That means the story is not merely "speculative decoding is a known idea." The actual news is:

- Google packaged the technique for Gemma 4,
- exposed it through real deployment pathways,
- and framed it as an official efficiency upgrade for the model family.

## Bigger Lesson

This is a good example of a broader trend in model engineering. Quality alone is no longer enough. Labs increasingly compete on the full **quality-latency-cost** surface. Techniques like MTP matter because they can make a model feel better in practice without requiring a wholly new base model.

In other words, a lot of AI progress now comes not only from bigger or smarter models, but from better systems work around inference.
