# Extreme Compression of Large Language Models via Additive Quantization

Source: `https://arxiv.org/pdf/2401.06118`
<!-- Source text: materials/source_text/ai/extreme-compression-llms-additive-quantization.txt -->
Raindrop ID: `1722685187`
Raindrop saved at: `2026-05-18T23:15:35.487Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the full arXiv PDF. The lesson covers AQLM, additive codebooks, block-level optimization, sub-3-bit compression, and deployment tradeoffs.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This paper introduces AQLM, an additive quantization approach for extremely low-bit LLM compression. The goal is to run large models with far fewer bits per parameter, especially in the 2 to 3 bit range, while preserving accuracy.

AQLM uses learned additive codebooks for weight matrices and optimizes codebook parameters across transformer blocks. The abstract frames it as especially strong in the extreme compression regime.

## Full-Length Version

Quantization reduces memory by representing weights with fewer bits. The hard case is extreme quantization: below 3 bits per parameter, naive rounding destroys too much information. Additive quantization represents a vector as a sum of codebook entries, giving more expressive compressed representations than one simple scalar code.

The paper's claimed contribution is to adapt multi-codebook quantization to LLM weight matrices, with input-adaptive learned quantization and joint block-level codebook optimization. It also emphasizes practical inference implementations on GPU and CPU.

Why this matters: memory bandwidth is a major bottleneck for deployment. A model that fits on smaller devices or serves faster at lower memory cost changes what applications are possible. The tradeoff is that compression can damage accuracy, calibration, and rare capabilities, so full evaluation matters.

This should be studied with QuIP and SnapKV. AQLM compresses weights. QuIP also targets very low-bit weights with theoretical guarantees. SnapKV attacks KV-cache cost during long-context inference.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/extreme-compression-llms-additive-quantization.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the full arXiv PDF. The lesson covers AQLM, additive codebooks, block-level optimization, sub-3-bit compression, and deployment tradeoffs.

## What To Remember

AQLM is about making extreme low-bit weight compression more accurate by using additive codebooks rather than simple scalar rounding.
