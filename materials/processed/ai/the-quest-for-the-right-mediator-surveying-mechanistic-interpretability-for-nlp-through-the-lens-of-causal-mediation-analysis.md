# The Quest for the Right Mediator: Surveying Mechanistic Interpretability for NLP Through the Lens of Causal Mediation Analysis

Source: `https://doi.org/10.1162/COLI.a.572`
PDF or source page: `https://open.bu.edu/items/638196d9-43a3-4d89-b321-b1d4132dcae1`
Tweet resolved from: `https://x.com/complingjournal/status/2054543899872620654`
Authors: Aaron Mueller, Jannik Brinkmann, Millicent Li, Samuel Marks, Koyena Pal, Nikhil Prakash, Can Rager, Aruna Sankaranarayanan, Arnab Sen Sharma, Jiuding Sun, Eric Todd, David Bau, Yonatan Belinkov
Source publication: 2026-02-25
Ingested: 2026-05-14
Extraction strategy: Tweet resolution to canonical source plus full-paper/full-source structured ingest

## Summary

This survey argues that mechanistic interpretability for NLP needs a more unified causal foundation. It frames interpretability methods through causal mediation analysis, focusing on the mediators researchers choose as causal units and the search methods used to find them. The paper taxonomizes mediator types, discusses when each is appropriate, and argues for standardized evaluations and clearer definitions of what mechanism-level explanation means.

## Full-Paper Ingest Notes

The full survey argues that mechanistic interpretability needs clearer causal units. It reframes interpretability methods through causal mediation analysis: given an input, output, and internal component, the question is whether intervening on that mediator changes model behavior in a way that supports explanation, hypothesis verification, localization, or editing.

The paper surveys mediator types used in NLP interpretability, including neurons, attention heads, MLPs, residual-stream directions, circuits, features, subspaces, and higher-level abstractions. It compares their strengths and weaknesses along dimensions such as human interpretability, compute cost, causal faithfulness, granularity, and suitability for different research goals.

The main recommendation is to stop treating all interpretability targets as interchangeable. Different goals need different mediators and search methods. The authors call for discovering new mediator types with better tradeoffs and for more standardized evaluations so the field can compare mediator choices instead of accumulating ad hoc case studies.

## Why It Matters

This belongs in the AI collection and Scale prep because it provides a conceptual framework for deciding whether an internal feature, activation patch, circuit, or probe is the right causal unit for auditing or supervising model behavior.

## Reading Notes

- Primary theme: mechanistic interpretability as causal mediation.
- Tags: interpretability; causal mediation; survey; NLP.
- This processed note is intentionally source-backed and concise; the public lesson expands it into a teaching note.

## Source Links

- Canonical source: https://doi.org/10.1162/COLI.a.572
- PDF or source page: https://open.bu.edu/items/638196d9-43a3-4d89-b321-b1d4132dcae1
- Tweet: https://x.com/complingjournal/status/2054543899872620654
