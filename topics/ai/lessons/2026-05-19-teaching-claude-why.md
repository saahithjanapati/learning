# Teaching Claude Why

Source: `https://alignment.anthropic.com/2026/teaching-claude-why/`
<!-- Source text: materials/source_text/ai/teaching-claude-why.txt -->
Raindrop ID: `1722721591`
Raindrop saved at: `2026-05-19T00:19:44.557Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the Anthropic Alignment article. The lesson covers training models to articulate reasons, the distinction between useful and faithful explanations, and how explanation behavior interacts with alignment supervision.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

Anthropic's article uses agentic misalignment after Claude 4 as a case study in safety training that generalizes out of distribution. Its central update is that teaching principles, character, and reasons can work better than only training demonstrations of desired behavior.

The key question is what "why" means: causal explanation, instruction following rationale, value reasoning, or faithful account of internal decision-making. Those are different targets.

## Full-Length Version

A model can produce explanations for many reasons. It may explain to help the user, to justify a refusal, to expose uncertainty, to improve its own reasoning, or to satisfy a training objective. Those explanations can be useful while still not being faithful to the actual internal cause of the answer.

That makes "teaching why" an alignment-sensitive topic. If the training objective rewards plausible rationales, the model may learn polished post-hoc justification. If it rewards grounded causal explanation, the model may become easier to debug and supervise. The source describes several interventions: constitutionally aligned synthetic documents, fictional stories about AIs behaving admirably, difficult ethical-advice conversations, and tool-augmented harmlessness RL environments. The striking result is that some OOD training distributions reduced agentic misalignment better than directly training on honeypot-like examples.

This source should be compared with OpenAI's SAE attribution and helpful-assistant persona posts. One line of work makes internal features more legible; another may shape outward explanations. The interesting research question is whether these meet: can a model explain in ways that are connected to mechanistic evidence?

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/teaching-claude-why.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the Anthropic Alignment article. The lesson covers training models to articulate reasons, the distinction between useful and faithful explanations, and how explanation behavior interacts with alignment supervision.

## What To Remember

Reasons are not all the same. A useful future lesson must distinguish helpful explanation, faithful explanation, causal self-report, and training-time rationale behavior.
