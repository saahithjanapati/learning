# Mathematical Discoveries From Program Search With Large Language Models

Source: `https://www.nature.com/articles/s41586-023-06924-6`
<!-- Source text: materials/source_text/ai/funsearch-mathematical-discoveries-program-search.txt -->
Raindrop ID: `1722670284`
Raindrop saved at: `2026-05-18T22:45:27.958Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the Nature article. The lesson covers LLM-guided program search, evaluators, database of discovered programs, cap set and bin packing examples, and how FunSearch differs from one-shot code generation.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This Nature paper introduced FunSearch, a system that uses LLMs to search over programs that solve mathematical and algorithmic problems. The key shift is to search for code that describes a solution strategy, not just text that states an answer.

The full Nature article frames FunSearch as LLM-guided program search: the system evolves code snippets, scores them with an evaluator, and keeps useful discoveries in a program database. That makes it a foundational source for AI-assisted scientific discovery.

## Full-Length Version

Program search is powerful because programs can be executed. A proposed idea is not only rhetorically plausible; it can be scored. This gives the LLM a feedback loop: generate candidate programs, evaluate them, keep the better ones, and generate variants.

FunSearch matters because it showed that LLMs can contribute to discovery when embedded in a search and verification loop. The LLM supplies creative variations; the evaluator supplies discipline. The system does not need the model to be perfectly reliable because weak candidates can be filtered.

This lesson should be paired with AlphaEvolve. FunSearch is the conceptual ancestor for LLM-guided discovery through programs. AlphaEvolve appears to scale that pattern toward broader algorithmic and infrastructure problems.

The full Nature article centers the search loop: an LLM proposes programs, an evaluator scores them, the best programs are stored and used as context for later proposals, and the process yields human-inspectable code. Its headline examples include new constructions for the cap set problem and improved online bin packing heuristics.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/funsearch-mathematical-discoveries-program-search.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the Nature article. The lesson covers LLM-guided program search, evaluators, database of discovered programs, cap set and bin packing examples, and how FunSearch differs from one-shot code generation.

## What To Remember

FunSearch's core idea is simple and important: ask the model to write programs, then let execution and scoring turn generation into discovery.
