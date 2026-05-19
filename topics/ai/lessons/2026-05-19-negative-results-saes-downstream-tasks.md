# Negative Results for SAEs on Downstream Tasks

Source: `https://www.lesswrong.com/posts/4uXCAJNuPKtKBsi28/negative-results-for-saes-on-downstream-tasks`
<!-- Source text: materials/source_text/ai/negative-results-saes-downstream-tasks.txt -->
Raindrop ID: `1722727601`
Raindrop saved at: `2026-05-19T00:34:02.410Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the GreaterWrong mirror of the LessWrong/Alignment Forum post. The lesson covers OOD harmful-intent probing, dense linear-probe baselines, SAE probe failures, chat-SAE experiments, dataset debugging, and the strategic update away from fundamental SAE hill-climbing.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This is an important interpretability reading because it is a negative result. The title suggests the DeepMind mechanistic interpretability team found that sparse autoencoders did not yet deliver hoped-for downstream task gains.

That matters because SAE enthusiasm can become too broad. SAEs may produce interpretable features, but that does not automatically mean they improve control, monitoring, editing, or downstream task performance.

## Full-Length Version

The lesson should be read as a calibration point for the SAE cluster. Previous notes in this repo cover Gemma Scope, Natural Language Autoencoders, SparseRM, and feature-level reward ideas. Those works make SAEs look like promising infrastructure. Negative results ask whether the infrastructure currently cashes out in practical downstream value.

There are several ways SAE downstream use can fail. Features may not align with the task boundary. Sparse decompositions may be unstable across contexts. A human-readable feature may not be causally important. Steering one feature may create side effects. A probe over SAE latents may underperform simpler baselines.

The full source emphasizes harmful-intent OOD probing. Dense linear probes performed nearly perfectly, 1-sparse SAE probes failed to fit the training set, k-sparse SAE probes fit in-distribution but generalized worse OOD, and chat-specialized SAEs closed only part of the gap. The durable lesson is methodological: interpretability research needs negative results because they prevent the field from confusing readable feature labels with usable mechanisms.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/negative-results-saes-downstream-tasks.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the GreaterWrong mirror of the LessWrong/Alignment Forum post. The lesson covers OOD harmful-intent probing, dense linear-probe baselines, SAE probe failures, chat-SAE experiments, dataset debugging, and the strategic update away from fundamental SAE hill-climbing.

## What To Remember

SAEs can be useful without being solved. A negative downstream result is evidence that interpretability features still need causal validation, task relevance, and practical benchmarks.
