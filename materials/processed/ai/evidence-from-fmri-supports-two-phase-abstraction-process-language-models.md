# Evidence from fMRI Supports a Two-Phase Abstraction Process in Language Models

Source: https://arxiv.org/abs/2409.05771
PDF: https://arxiv.org/pdf/2409.05771
Authors: Emily Cheng and Richard J. Antonello
Submitted: 2024-09-09
Venue note: Submitted to NeurIPS NeuroAI workshop 2024; journal reference says "Best abstract at NeurIPS UniReps 2024"
Subjects: Computation and Language; Artificial Intelligence
Ingested: 2026-05-05
Extraction engine: Local PDF extraction with pypdf plus arXiv HTML inspection
Strategy: Canonical PDF/HTML extraction and medium/full AI paper lesson normalization

## Summary

This paper asks why the intermediate layers of large language models often predict measured brain activity better than the final layers. Prior language encoding work had shown that LLM representations can linearly predict fMRI, ECoG, and MEG responses to natural language. The repeated pattern is that the best layer is usually somewhere in the middle, not at the output.

Cheng and Antonello argue that this pattern supports a two-phase abstraction process inside LLMs. Early and middle layers build richer compositional representations of language. Later layers then compress or reshape those representations toward the next-token prediction objective. The brain-like signal appears to be strongest during the first phase, where representations become more abstract and high-dimensional, rather than during the final prediction phase.

The paper's central empirical object is the relationship between:

- layerwise fMRI encoding performance,
- layerwise representational dimensionality,
- layerwise next-token surprisal estimated with TunedLens.

The key finding is that intrinsic dimensionality tracks fMRI encoding performance very strongly across layers. For OPT models, the average voxelwise correlations between nonlinear intrinsic dimensionality and encoding performance are `0.91` for OPT-125M, `0.96` for OPT-1.3B, and `0.85` for OPT-13B. For Pythia-6.9B, the corresponding value is `0.90`. Linear dimensionality measures mostly show the same pattern.

In OPT-1.3B, encoding performance peaks at layer 17, and this peak coincides with a sharp turn in next-token prediction loss. The authors interpret this as a transition point: before the peak, the model is composing increasingly abstract linguistic features; after the peak, it is narrowing those features toward prediction. Centered Kernel Alignment also shows a representational break around this transition.

The training-dynamics result is especially important. In Pythia-6.9B checkpoints from early to late training, the intrinsic-dimensionality peak and the encoding-performance peak emerge together. The two curves are globally correlated with `rho = 0.94`, and the peak location shifts over training before settling. That makes the effect less likely to be a trivial consequence of layer index or architecture.

The paper is careful about interpretation. Brain-model similarity does not prove that brains and LLMs use the same mechanism. But it does suggest that the part of an LLM most useful for predicting language-related brain responses is the part where compositional feature abstraction is richest, not necessarily the part closest to the model's output distribution.

## Core Thesis

LLMs appear to process language in at least two broad phases:

1. A composition phase, where layers build high-dimensional, abstract representations of the input.
2. A prediction phase, where later layers compress or reshape those representations toward next-token output.

The paper's fMRI evidence suggests that human language-system responses align more with the composition phase than with the final prediction phase.

## Why This Problem Matters

Language encoding models map computational features onto measured brain activity. If LLM hidden states predict brain responses well, that raises a scientific question: what kind of similarity is being measured?

There are two broad possibilities.

One possibility is predictive coding. Maybe autoregressive next-token prediction is brain-like because the human language system also anticipates upcoming linguistic input.

Another possibility is feature abstraction. Maybe LLMs and brains look similar because both must transform words into higher-level linguistic representations: syntax, semantics, discourse structure, and compositional meaning.

This paper argues for the second interpretation. It does not deny that prediction matters in language processing. Instead, it says that the layerwise brain-match pattern is better explained by representational abstraction than by next-token prediction error alone.

## Method At A Glance

### Brain-Model Similarity

The authors use public fMRI data from 3 subjects listening to about 20 hours of English podcast stories. Subjects listened attentively to stories from podcasts such as The Moth Radio Hour, Modern Love, and The Anthropocene Reviewed. Each subject contributed roughly 95 stories, 20 scanning sessions, and about 33,000 datapoints per voxel.

For each word, the authors extract LLM activations from that word and its preceding context, with a sliding window ensuring at least 256 tokens of context. The features are downsampled and delayed to account for the slow hemodynamic lag in fMRI. A ridge-regression encoding model then learns a linear map from LLM features to brain responses.

The tested LLMs include:

- OPT-125M,
- OPT-1.3B,
- OPT-13B,
- Pythia-6.9B,
- Pythia-6.9B checkpoints from 1K through 143K training steps.

### Representational Dimensionality

The paper measures how complex each layer's representation manifold is.

The main measure is nonlinear intrinsic dimensionality, estimated with GRIDE. The authors also compute two linear effective-dimensionality measures:

- PCA dimensionality with a `0.99` variance cutoff,
- Participation Ratio.

The representations are computed from `10,000` twenty-word contexts sampled from The Pile, using the last-token residual-stream representation at each layer.

### Layerwise Surprisal

To test whether next-token prediction explains brain similarity, the authors estimate layerwise next-token surprisal using TunedLens. TunedLens learns an affine map from intermediate hidden states to the vocabulary/output space, letting the authors ask how much next-token information is already linearly available at each layer.

## Main Findings

### 1. Dimensionality Strongly Tracks fMRI Encoding Performance

Across language-processing brain regions, layers with higher intrinsic dimensionality tend to be the layers that better predict fMRI responses.

Table 1 reports average voxelwise correlations:

| Model | GRIDE intrinsic dimensionality | PCA effective dimensionality | Participation Ratio |
| --- | ---: | ---: | ---: |
| OPT-125M | `0.91` | `0.91` | `0.94` |
| OPT-1.3B | `0.96` | `0.93` | `0.82` |
| OPT-13B | `0.85` | `0.96` | `0.85` |
| Pythia-6.9B | `0.90` | `0.86` | `-0.05` |

The Participation Ratio result for Pythia is the notable exception. The broader pattern still holds across the nonlinear and PCA measures.

### 2. The Best Brain-Predictive Layers Sit Near a Phase Transition

For OPT-1.3B, encoding performance peaks at layer 17. Around the same layer, next-token prediction loss sharply decreases. The authors read this as a transition from composition to prediction.

Before the transition, representations become richer and more abstract. After the transition, the model becomes more focused on resolving those representations into next-token predictions.

### 3. The Pattern Emerges During Training

For Pythia-6.9B, both the intrinsic-dimensionality peak and the fMRI encoding-performance peak appear over training. Their development is globally correlated with `rho = 0.94`.

The peak does not simply sit at a fixed architectural layer from the beginning. Its position changes over training and later settles. That supports the idea that the effect is learned rather than built in by the Transformer stack.

### 4. The Voxelwise Pattern Is Linguistically Specific

The relationship between intrinsic dimensionality and encoding performance holds most clearly in higher-level language-processing regions. The primary auditory cortex is an exception, which makes sense: auditory cortex is more tied to low-level acoustic information than to abstract linguistic composition.

### 5. Next-Token Prediction Is Not the Whole Story

The authors argue that as models become more powerful at prediction, the layer most useful for predicting brain activity can drift away from the layer most directly tied to output prediction. That weakens the claim that autoregressive prediction itself is the primary explanation for brain-LLM similarity.

## Interpretation

The paper's picture is:

- early layers build local lexical and syntactic features,
- middle layers build richer compositional and semantic representations,
- later layers reshape those features for the next-token objective.

The brain data line up best with the middle representational phase. That suggests that brain-LLM similarity may be driven by shared pressure to represent abstract linguistic structure, not simply shared pressure to predict the next word.

## Why The Paper Is Interesting

The paper connects three literatures that are often discussed separately:

- neuroscience encoding models,
- LLM interpretability and representation geometry,
- training dynamics of Transformer language models.

Its contribution is not just "middle layers are best." That fact was already known. The useful contribution is a proposed explanation: middle layers are best because they are where high-dimensional compositional abstraction is strongest.

## Limitations

Important cautions:

- The fMRI data include only 3 subjects.
- fMRI is spatially broad and temporally slow, so it cannot by itself reveal fine-grained neural mechanisms.
- The analysis covers OPT and Pythia, not the full space of modern LLM architectures.
- Brain-model similarity is correlational. It does not prove that the brain computes the same algorithm.
- Intrinsic-dimensionality estimates depend on estimator choices and scale selection.
- TunedLens measures linearly recoverable next-token information from hidden states; it is a useful proxy, not a complete account of all predictive information.
- The paper studies language listening and language-model hidden states, not broader cognition.

## My Take

This is a compact but useful paper because it gives a mechanistic hypothesis for a pattern that shows up repeatedly in brain encoding studies. The most memorable idea is that an LLM's most brain-like layer may be the one where language has become richly composed but has not yet been squeezed into the next-token output bottleneck.

That framing is helpful for both neuroscience and interpretability. For neuroscience, it says that LLM-brain similarity should be interpreted as evidence about abstract linguistic representation, not just prediction. For interpretability, it says that intrinsic dimensionality and layer geometry can point to meaningful processing phases inside a model.

## Questions To Remember

1. Why do intermediate LLM layers often predict brain responses better than output layers?
2. What is the difference between the paper's composition phase and prediction phase?
3. Why is intrinsic dimensionality a plausible signal of abstract feature complexity?
4. Why does the Pythia training-dynamics result matter?
5. Why does this paper weaken a pure next-token-prediction explanation of brain-LLM similarity?
6. What remains unresolved about drawing brain-mechanism conclusions from encoding-model similarity?
