# A “Diff” Tool For AI: Finding Behavioral Differences In New Models

Source: `https://www.anthropic.com/research/diff-tool`
Site: `Anthropic Research`
Published: `2026-03-13`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and curriculum-oriented normalization`

## Summary

This article presents a generic “diff tool” for AI models: a method for comparing two different models and surfacing features that appear unique to one model and may correspond to meaningful behavioral differences. The motivation is that standard benchmarks are good at catching known problems but poor at discovering unexpected new behaviors.

## Core Motivation

- Human-authored benchmarks are reactive: they test risks we already know how to name.
- New models can develop “unknown unknown” behaviors that fall outside the existing eval suite.
- In software, diff tools solve an analogous auditing problem by narrowing review to what changed.
- Model diffing aims to do something similar for neural networks: focus auditors on novel behavioral differences instead of re-auditing everything from scratch.

## Two Diffing Settings

### Base-vs-finetune diffing

This is the easier setting: compare a trusted base model with its modified or finetuned successor. Diffing works well here because much of the internal representation is shared.

### Cross-architecture diffing

This is the harder setting tackled in the article. The two models may come from different developers and have different internal representational “languages,” so the tool has to compare them without assuming a clean one-to-one internal mapping.

## Bilingual Dictionary Analogy

The article’s central analogy is a bilingual dictionary:

- a shared section maps concepts both models have,
- one model-specific section stores features unique to model A,
- another model-specific section stores features unique to model B.

This matters because a naïve cross-model tool can overfit to finding correspondences and force genuinely unique features into approximate shared matches. That hides the very behaviors an auditor wants flagged.

## Dedicated Feature Crosscoder (DFC)

The proposed method is the Dedicated Feature Crosscoder. Its design explicitly reserves capacity for:

1. shared features,
2. features unique to the first model,
3. features unique to the second model.

The point is not only to align common features across models, but also to preserve genuinely model-exclusive concepts so they can be audited directly.

## Steering As Validation

Finding a suspicious feature is not enough by itself. To test whether the feature actually controls the behavior, the researchers steer the model by suppressing or amplifying that feature during generation.

Interpretation:

- if suppressing the feature reduces the targeted behavior, that is evidence the feature causally contributes to it,
- if amplifying the feature strengthens the behavior, that is further support that the feature matters rather than merely correlates.

## Case Study: Llama-3.1-8B-Instruct vs Qwen3-8B

The tool surfaced:

- a Qwen-exclusive feature associated with Chinese Communist Party alignment, censorship, and propaganda,
- a Llama-exclusive feature associated with American exceptionalism.

Steering experiments were used to show behavioral impact:

- suppressing the Qwen-exclusive feature reduced censorship on prompts such as Tiananmen Square,
- amplifying it increased pro-government outputs,
- amplifying the Llama-exclusive feature increased assertions of American superiority.

## Case Study: GPT-OSS-20B vs DeepSeek-R1-0528-Qwen3-8B

The tool surfaced:

- a GPT-exclusive copyright-refusal feature,
- another DeepSeek-exclusive CCP alignment feature.

Steering results:

- suppressing the GPT copyright-refusal feature caused the model to attempt to comply with copyrighted-text requests,
- amplifying it caused over-refusal, including refusing benign content like a peanut butter and jelly recipe,
- the DeepSeek CCP alignment feature behaved similarly to the Qwen one, strengthening or weakening censorship and propaganda tendencies.

## What The Tool Is Good For

- high-recall screening for behavioral differences between models,
- focusing human attention on the parts of model behavior that changed,
- discovering politically or policy-relevant behaviors that might not have been included in standard benchmarks,
- auditing updates or releases for newly introduced behaviors.

The article suggests that a tool like this might have helped flag emergent behavioral changes such as the GPT-4o sycophancy issue more quickly by comparing the updated model against its prior version.

## Limitations

- The method is not a silver bullet.
- A single diff can surface thousands of candidate features, most of which may not correspond to meaningful risks.
- The method identifies model-exclusive features but does not establish where they came from.
- Open-source models were used here; the work has not yet been demonstrated on frontier closed models.

## Practical Takeaways

- Diffing can be a strong first-pass audit tool for “what changed?”
- Cross-architecture auditing needs methods that preserve model-specific features rather than forcing every concept into a shared space.
- Steering is important because it moves the argument from “feature correlated with behavior” toward “feature controls behavior.”
- The main value is better prioritization for human auditors, not full automation of safety review.
