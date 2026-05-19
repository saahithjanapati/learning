# How Claude Code Works in Large Codebases

Source: `https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start`
<!-- Source text: materials/source_text/ai/claude-code-large-codebases-best-practices.txt -->
Raindrop ID: `1722735458`
Raindrop saved at: `2026-05-19T00:42:42.562Z`
Ingested: 2026-05-19
Processed source: [Raindrop Recent Intake: 2026-05-19](../../../learning_system/raindrop_intakes/raindrop-recent-intake-2026-05-19.md)
Extraction status: Full-source backfilled from the Claude article. The lesson covers repository onboarding, tool/workflow setup, decomposition, context control, and organizational coding-agent practice.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [What To Remember](#what-to-remember)

## Medium-Length Version

This article belongs in a practical coding-agent operations track. The saved excerpt frames it as guidance for using Claude Code in large codebases, especially around configurations, tooling, organization, and where to start.

The learning value is not a new model result. It is operational: agent performance in real repositories depends on navigation conventions, tool boundaries, tests, local commands, and human review workflows.

## Full-Length Version

Large-codebase agents fail when the repository is too implicit. A human engineer can infer conventions from experience, but an agent benefits from explicit navigation files, known test commands, narrow task scopes, and stable local workflows. That is why repo-level instructions, skill registries, and validated commands matter.

The article should be read beside this repo's own `AGENTS.md` and skill system. The broader pattern is that agent coding is not just "ask the model to edit files." It is an interface design problem: expose the right context, make verification cheap, and keep ownership boundaries clear.

The likely follow-up lesson should extract concrete practices from the article: how to start in a large repo, when to ask the agent to search, how to bound edits, how to use tests, and how teams should standardize repeatable workflows.

## Full-Source Backfill

The full source has now been fetched into local source text at `materials/source_text/ai/claude-code-large-codebases-best-practices.txt`. This page should be read as source-backed rather than bookmark-only. The raw extraction is intentionally local-only; this public lesson keeps the durable study summary, provenance, and follow-up questions without dumping the full source verbatim.

Backfill focus: Full-source backfilled from the Claude article. The lesson covers repository onboarding, tool/workflow setup, decomposition, context control, and organizational coding-agent practice.

## What To Remember

Coding agents work better when repositories are legible. Instructions, tests, ownership boundaries, and repeatable commands are part of the agent system.
