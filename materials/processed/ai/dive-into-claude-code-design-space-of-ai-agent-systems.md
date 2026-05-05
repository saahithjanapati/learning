# Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems

Source: `https://arxiv.org/abs/2604.14228`
Title: `Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems`
Authors: `Jiacheng Liu, Xiaohan Zhao, Xinyi Shang, Zhiqiang Shen`
Published: `2026-04-14`
Ingested: `2026-05-05`
Extraction engine: `canonical PDF extraction + manual structured ingest`
Strategy: `paper extraction and medium/full lesson normalization`

## Summary

This paper is a source-level architectural study of Claude Code as an agentic coding system. Rather than evaluating benchmark numbers, it analyzes how a production coding agent is structured around safety, context management, extensibility, delegation, and persistence.

The paper's central thesis is that the visible agent loop is the simplest part of the system. Most of the real design complexity lives in the surrounding subsystems: permission modes, compaction pipelines, plugin and MCP surfaces, subagents, and session memory.

## Main Points

### 1. The main loop is simple, the surrounding systems are not

Claude Code is framed as a repeated model-tool loop, but the real architecture lies in how the loop is constrained and supported.

### 2. Agent design is shaped by values

The paper organizes the system around human decision authority, safety and security, reliable execution, capability amplification, and contextual adaptability.

### 3. Claude Code is compared against OpenClaw

That comparison is useful because it shows which design choices are universal agent questions and which ones depend on deployment context, interface, and trust boundaries.
