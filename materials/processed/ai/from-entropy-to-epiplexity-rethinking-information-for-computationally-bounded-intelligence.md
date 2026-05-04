# From Entropy to Epiplexity: Rethinking Information for Computationally Bounded Intelligence

Source: `https://arxiv.org/abs/2601.03220`
Title: `From Entropy to Epiplexity: Rethinking Information for Computationally Bounded Intelligence`
Authors: `Marc Finzi, Shikai Qiu, Yiding Jiang, Pavel Izmailov, J. Zico Kolter, Andrew Gordon Wilson`
Ingested: `2026-05-04`
Extraction engine: `canonical PDF extraction + manual structured ingest`
Strategy: `paper extraction and medium/full lesson normalization`

## Summary

This paper argues that classical information notions such as Shannon entropy and Kolmogorov complexity miss an important ingredient for modern machine learning: the observer is computationally bounded.

The authors introduce `epiplexity`, a notion of useful structure that asks what a limited learner can actually extract from data. Their motivation is that many familiar information-theory statements feel wrong in practice. Deterministic computation often seems to create useful information, the order of data often matters, and likelihood modeling often does more than simple distribution matching.

The paper's key move is to separate `time-bounded entropy`, which captures unpredictable randomness, from `epiplexity`, which captures learnable structure available to a bounded observer. Under this view, data can be transformed so that hidden structure becomes easier to extract even if no magical new bits are created in the unlimited-observer sense.

The result is more a conceptual framework than a benchmark paper. It tries to explain why representation learning, data ordering, and compute-heavy training pipelines can produce genuinely more useful knowledge for bounded learners.

## Main Ideas

### 1. Classical definitions are not wrong, but they are aimed at the wrong observer

Shannon and Kolmogorov-style ideas usually assume unlimited computation or do not directly model what is useful for a learner with finite time.

### 2. Computation can create useful information for bounded agents

A deterministic transform can reorganize data so that a practical learner sees structure that was previously inaccessible.

### 3. Order can matter

If learning is computationally constrained, the sequence in which examples arrive can change what structure becomes discoverable.

### 4. Likelihood modeling can increase usable structure

Training a model is not merely mirroring a source distribution. It can create internal programs or representations that are more useful than the raw data stream for future bounded computation.
