# Debugging Misaligned Completions With SAE Latent Attribution

Source: `https://alignment.openai.com/sae-latent-attribution/`
<!-- Source text: materials/source_text/ai/sae-latent-attribution-debugging-misaligned-completions.txt -->
Raindrop ID: `1723190417`
Raindrop saved at: `2026-05-19T12:10:44.629Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the OpenAI Alignment article. The lesson covers attribution-difference scoring, paired completions, steering validation, and shared provocative-feature evidence.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This post asks how to find SAE latents that actually help cause a behavior, rather than latents that merely differ between two models. Activation differences are useful but blunt: a feature can change a lot without being the feature that drives a bad completion.

The method uses attribution over SAE decoder directions. It compares completions with and without a behavior of interest, scores which latents appear to contribute most to the behavior, and then validates candidates with activation steering.

## Full-Length Version

The core workflow has two stages. First, collect paired completions from the same prompt: one with the behavior of interest and one without it. Second, estimate which SAE latents contributed more to the behavior completion than the non-behavior completion. This attribution score acts as a cheap candidate selector.

The post tests the method on emergent misalignment and undesirable validation. In both cases, attribution-selected latents were more likely than activation-difference-selected latents to steer the behavior when intervened on. That is the practical value: attribution narrows the search space toward features that are closer to causal.

The most interesting result is shared structure across behaviors. A "provocative" feature appears in both case studies. It is associated with dramatic, aggressive, or extreme rhetoric, and steering it can increase both broad misalignment and undesirable validation. This suggests different surface failures may share representation-level mechanisms.

The caveat is that attribution is still an approximation. It proposes likely causal latents; it does not replace intervention. The responsible workflow is attribution for candidate discovery, then steering or ablation for causal validation.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/sae-latent-attribution-debugging-misaligned-completions.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the OpenAI Alignment article. The lesson covers attribution-difference scoring, paired completions, steering validation, and shared provocative-feature evidence.

## What To Remember

Attribution is a way to search for behavior-causing SAE latents more directly than raw activation diffing. It matters because debugging alignment failures needs causal handles, not just correlations.
