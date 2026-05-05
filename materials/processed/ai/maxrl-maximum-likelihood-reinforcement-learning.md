# MaxRL: Maximum Likelihood Reinforcement Learning

Source: `https://zanette-labs.github.io/MaxRL/`
Paper: `https://arxiv.org/abs/2602.02710`
Site: `Zanette Labs project page`
Title: `MaxRL: Maximum Likelihood Reinforcement Learning`
Submitted: `2026-02-02`
Ingested: `2026-05-04`
Extraction engine: `direct project-page scrape + manual structured ingest`
Strategy: `project page extraction and RL-method lesson normalization`

## Summary

MaxRL is presented as a reinforcement-learning framework that tries to recover the spirit of maximum likelihood for correctness-based tasks such as math and code generation. The central idea is that, for each prompt, the model induces a probability of producing a correct answer, and RL should optimize that success likelihood more directly.

The project page positions MaxRL against GRPO-style methods and claims better pass-at-k efficiency: similar or better pass-at-1 while producing much stronger gains when the model gets multiple test-time attempts.

The conceptual pitch is important. Maximum likelihood has a strong scaling story in standard supervised learning, but correctness-based generation introduces discrete outcomes and non-differentiable search. MaxRL tries to bridge that gap by defining an RL objective that better matches "increase the chance of any correct solution appearing."

## Main Points

### 1. It reframes RL around success likelihood

The objective is not merely improve average sampled reward, but increase the model's probability of landing on a correct answer.

### 2. It is especially motivated by pass-at-k settings

For code and reasoning tasks, users often care about whether one of several attempts is right, not only whether the first attempt is right.

### 3. The value claim is efficiency

The project page emphasizes stronger test-time scaling efficiency than GRPO.
