# Automated alignment is harder than you think

Source: `https://arxiv.org/abs/2605.06390`
PDF or source page: `https://arxiv.org/pdf/2605.06390`
Tweet resolved from: `https://x.com/safe_paper/status/2054485431979213190`
Authors: Aleksandr Bowkis, Marie Davidsen Buhl, Jacob Pfau, Geoffrey Irving
Source publication: 2026-05-07
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

The paper critiques the proposal that increasingly capable AI agents can safely automate alignment research. Even without deliberate sabotage, agent-generated alignment work may contain systematic errors that humans fail to catch, and correct-looking outputs may be aggregated into overconfident safety assessments. The authors argue that automated alignment is especially hard because alignment research contains fuzzy tasks without clear criteria, because AI errors may be alien to human reviewers, and because shared training processes can make AI outputs correlated.

## Full-Paper Ingest Notes

The full paper analyzes a proposed automated alignment research program: use increasingly capable AI agents to do more empirical alignment work, build safety cases for later agents, and eventually hand off primary research responsibility. The authors argue that this can fail even without deliberate scheming because alignment research contains many hard-to-supervise fuzzy tasks.

The key failure mode is compelling but misleading research. Agents may produce outputs with systematic errors that human reviewers do not catch, and even correct-looking outputs can be aggregated into overconfident safety assessments. The paper gives several reasons the problem is worse for automated alignment than for ordinary human research: optimization pressure concentrates mistakes where reviewers are weak, AI mistakes may be alien rather than human-like, AI-generated arguments may exceed human evaluability, and shared weights/data/training can make outputs correlated.

The paper then discusses generalization and scalable oversight as candidate solutions, but emphasizes that both face special challenges in automated alignment. The actionable takeaway is that agent capability alone is not enough; we need ways to validate fuzzy-task performance, sample maximally informative outputs, measure agent capabilities, and audit aggregation into safety cases.

## Why It Matters

This belongs in Scale prep because it is about evaluating long-horizon research agents and avoiding misleading automated safety assessments.

## Reading Notes

- Primary theme: automated alignment risks.
- Tags: alignment; automated research; scalable oversight; evaluation.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://arxiv.org/abs/2605.06390
- PDF or source page: https://arxiv.org/pdf/2605.06390
- Tweet: https://x.com/safe_paper/status/2054485431979213190
