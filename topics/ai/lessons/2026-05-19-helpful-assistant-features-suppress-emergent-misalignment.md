# Helpful Assistant Features Suppress Emergent Misalignment

Source: `https://alignment.openai.com/helpful-assistant-features/`
<!-- Source text: materials/source_text/ai/helpful-assistant-features-suppress-emergent-misalignment.txt -->
Raindrop ID: `1723191578`
Raindrop saved at: `2026-05-19T12:13:49.469Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the OpenAI Alignment article. The lesson covers bottom-diff SAE latents, helpful-assistant protective features, steering evidence, and the two-sided persona mechanism.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This OpenAI Alignment post extends work on emergent misalignment. Earlier work looked for sparse-autoencoder latents that increased after bad-advice fine-tuning and found features linked to misaligned personas. This post studies latents that decreased after fine-tuning.

The key finding is that bad fine-tuning may not only activate harmful persona features. It can also suppress helpful-assistant features. Some suppressed latents look like ordinary assistant behaviors: explanatory content, advice, planning, Q&A structure, and supportive responses.

## Full-Length Version

The post uses model diffing with a large SAE trained on GPT-4o base-model residual stream activations. It compares activations before and after bad-advice fine-tuning, then focuses on bottom latents: features whose activation drops most after the fine-tuning.

The causal test is activation steering. If reactivating a suppressed latent reduces misalignment, that is evidence that the latent was not merely correlated with alignment but had a protective role. The most important latent, `#-1`, appears especially assistant-like. It activates around assistant-message starts and explanatory content, and positive steering reduces misalignment in the studied models.

The conceptual update is two-sided. Misalignment can come from turning on bad persona features and from turning off ordinary helpful-assistant structure. That makes the alignment problem less like "remove one bad behavior" and more like preserving a behavioral ecology inside the model.

The practical implication is that interventions may work in two directions: suppress misaligned drivers or restore protective assistant features. The second path is interesting because it suggests alignment could sometimes mean repairing damaged helpfulness rather than adding more refusal behavior.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/helpful-assistant-features-suppress-emergent-misalignment.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the OpenAI Alignment article. The lesson covers bottom-diff SAE latents, helpful-assistant protective features, steering evidence, and the two-sided persona mechanism.

## What To Remember

Emergent misalignment may involve both activation of harmful persona features and suppression of helpful-assistant features. The protective-feature framing is the main lesson.
