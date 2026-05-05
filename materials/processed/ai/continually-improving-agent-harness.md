# Continually Improving Our Agent Harness

Source: `https://cursor.com/blog/continually-improving-agent-harness`
Site: `Cursor`
Title: `Continually Improving Our Agent Harness`
Ingested: `2026-05-05`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`

## Summary

Cursor's article argues that model quality is only part of coding-agent quality. The surrounding harness, including context management, tool behavior, evaluation logic, and model-specific tuning, materially determines whether the same underlying model feels useful in practice.

The piece describes harness work as a continuous software-engineering process: evolve the context window, measure changes both offline and online, track errors and regressions, and adapt the stack to the quirks of each model family.

## Main Points

### 1. Context engineering evolves with model capability

Cursor says early agents needed more static guardrails, while stronger models benefit from more dynamic context access and fewer hard-coded restrictions.

### 2. Real-world measurement matters

The article emphasizes both offline benchmarks and online signals such as keep rate, user satisfaction proxies, latency, token efficiency, and tool-call health.

### 3. Harness bugs compound

Tool failures and bad context accumulate into "context rot," so reliability work on the harness is treated as first-class product and research work rather than operational cleanup.
