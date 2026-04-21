# PGM Memory Sheet 8: Causality

Use with [[2026-04-20-pgm-exam-prep-section-08-causality]].

## First Distinction

- conditioning:
  observe a variable
- intervention:
  actively set a variable

These are not the same.

## Backdoor Criterion

- adjust for a set that blocks confounding backdoor paths from treatment to outcome

## Frontdoor / Do-Calculus

- more advanced identification tools than simple backdoor adjustment

## Causal Discovery

- often identifies equivalence classes or partial structure, not a unique full DAG

## PC Algorithm

- constraint-based
- uses conditional independencies to remove and orient edges

## Likely Traps

- confusing $do(T=t)$ with conditioning on $T=t$
- judging backdoor sets by visual impression instead of path-by-path reasoning
- assuming PC always fully identifies the causal graph

