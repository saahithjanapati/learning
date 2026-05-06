# fMRI Evidence for Two-Phase Abstraction in Language Models

Source note: Emily Cheng and Richard J. Antonello, "Evidence from fMRI Supports a Two-Phase Abstraction Process in Language Models." arXiv:2409.05771v1, submitted September 9, 2024. Source page: [arxiv.org/abs/2409.05771](https://arxiv.org/abs/2409.05771). Processed source: [materials/processed/ai/evidence-from-fmri-supports-two-phase-abstraction-process-language-models.md](../../../materials/processed/ai/evidence-from-fmri-supports-two-phase-abstraction-process-language-models.md).

Original sources: [arXiv abstract](https://arxiv.org/abs/2409.05771), [arXiv PDF](https://arxiv.org/pdf/2409.05771), [arXiv HTML](https://arxiv.org/html/2409.05771).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Puzzle](#the-puzzle)
- [What An Encoding Model Is](#what-an-encoding-model-is)
- [The Two-Phase Picture](#the-two-phase-picture)
- [The Three Measurements](#the-three-measurements)
- [Main Results](#main-results)
- [Why This Matters](#why-this-matters)
- [What To Be Careful About](#what-to-be-careful-about)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper is about a strange and repeated fact in brain-LLM comparison work: the LLM layers that best predict brain activity are usually not the final layers. They are intermediate layers.

That is puzzling. If the important similarity between brains and language models were simply next-word prediction, one might expect the final layers, which are closest to the model's output distribution, to be the most brain-like. But that is not what encoding-model studies usually find.

Cheng and Antonello propose a different explanation. They argue that LLMs go through a two-phase process. In the first phase, the model composes words and local cues into richer abstract representations. In the second phase, it turns those abstract representations toward the concrete job of predicting the next token.

The brain-like signal seems to live mostly in the first phase.

### What The Paper Measures

The authors connect three layerwise quantities.

First, they measure fMRI encoding performance. They take hidden states from each layer of an LLM and train a linear ridge-regression model to predict fMRI responses from human subjects listening to natural podcast stories. A layer has high encoding performance if its activations are useful for predicting brain activity.

Second, they measure intrinsic dimensionality. This asks: how many underlying degrees of freedom does the layer's representation manifold seem to have? A higher-dimensional representation can carry a richer mixture of abstract linguistic features.

Third, they measure layerwise next-token surprisal using TunedLens. This estimates how much each intermediate layer already contains information useful for predicting the next token.

The test is simple in spirit: do brain-predictive layers look more like high-abstraction layers, or more like next-token-prediction layers?

### The Main Result

Intrinsic dimensionality and fMRI encoding performance are strongly correlated across layers.

For nonlinear intrinsic dimensionality, the average voxelwise correlations are:

| Model | Correlation with fMRI encoding performance |
| --- | ---: |
| OPT-125M | `0.91` |
| OPT-1.3B | `0.96` |
| OPT-13B | `0.85` |
| Pythia-6.9B | `0.90` |

That is the paper's core evidence. The layers whose representations become most geometrically rich are also the layers that best linearly predict language-related brain responses.

In OPT-1.3B, the best encoding layer is layer 17. Around that same point, the model's next-token loss curve sharply turns downward. The authors interpret that point as a phase transition. Before it, the model is building up rich representations. After it, the model is narrowing toward prediction.

The training-dynamics result strengthens the story. In Pythia-6.9B checkpoints, the intrinsic-dimensionality peak and the brain-encoding peak emerge together over training, with a global correlation of `rho = 0.94`. The peak location shifts over training before settling, so it does not look like a fixed architectural artifact.

### Medium Takeaway

The paper's best one-sentence lesson is:

**LLMs look most brain-like when their layers are richly composing linguistic structure, not necessarily when they are closest to predicting the next token.**

That does not prove that the brain and LLMs use the same mechanism. It does suggest that brain-LLM similarity may be more about shared abstract language representation than about autoregressive prediction alone.

## Full-Length Version

## The Paper In One Sentence

The paper argues that fMRI language-encoding evidence supports a two-phase view of LLM processing: intermediate layers build high-dimensional compositional abstractions, while later layers reshape those abstractions for next-token prediction.

## The Puzzle

A lot of neuroscience work now uses language models as feature extractors.

The basic experiment is:

1. A human listens to natural language while brain activity is recorded.
2. The same language is fed into an LLM.
3. The researcher asks whether the LLM's hidden states can predict the human brain response.

Surprisingly, this often works. Hidden states from LLMs can predict measured responses in language-related brain regions with only a linear mapping.

But there is a persistent twist: the best layers are usually intermediate layers.

That matters because LLM layers are not random feature collections. They form a processing chain. The input enters at the bottom. The output distribution comes from the top. If the final layer is closest to the model's explicit next-token prediction, why is the middle often more brain-like?

This paper tries to explain that pattern.

## What An Encoding Model Is

An encoding model predicts measured brain activity from some stimulus feature.

Here, the stimulus is natural language from podcast stories. The feature is the hidden activation of an LLM at a given layer. The target is fMRI activity from a human listening to the story.

The authors use public fMRI data from 3 subjects who listened to about 20 hours of English podcast stories. The stories came from podcasts such as The Moth Radio Hour, Modern Love, and The Anthropocene Reviewed. The subjects simply listened attentively; they were not doing a separate button-press task.

For each word in the stimulus, the authors feed the word and its immediate context into the LLM. They use enough preceding context that each word has at least 256 tokens of context. Then they extract layer activations.

Because fMRI is slow, the authors do not compare word activations to brain activity at exactly the same instant. They downsample the features and include delayed copies of the features to account for hemodynamic lag. Then they train a ridge-regression model from LLM features to voxel responses.

A layer is "good" if its features predict fMRI responses well.

## The Two-Phase Picture

The authors propose that LLMs face two competing pressures.

The first pressure is composition. To understand a sentence, a model has to combine low-level lexical information into higher-level syntax, semantics, discourse cues, and world-relevant structure. In this phase, representations become richer.

The second pressure is prediction. The model ultimately has to produce a distribution over the next token. To do that, it must resolve the rich representation into output-relevant directions. This can narrow or compress the representation.

So the layer stack may look like this:

```text
input tokens -> composition phase -> richest abstract layer -> prediction phase -> next-token distribution
```

This is not saying the model stops representing meaning after the middle. It is saying the geometry changes. The representation becomes less like a broad abstract description of the input and more like a representation tuned for the output task.

The paper's hypothesis is that fMRI language responses are better matched by the composition phase.

## The Three Measurements

### 1. Brain-Model Similarity

Brain-model similarity is measured with fMRI encoding performance.

The authors test:

- OPT-125M,
- OPT-1.3B,
- OPT-13B,
- Pythia-6.9B,
- several Pythia-6.9B training checkpoints.

For each layer, they ask how well that layer's activations predict voxel activity.

### 2. Intrinsic Dimensionality

Intrinsic dimensionality asks how many underlying dimensions are needed to describe the representation manifold.

Imagine points on a sheet of paper. The paper may be embedded in 3D space, but the sheet itself is basically two-dimensional. A representation can similarly live in a huge hidden space while occupying a lower-dimensional manifold.

In this paper, a higher intrinsic dimensionality means the layer's representations have more independent underlying structure. That is why the authors treat it as a signal of abstract feature complexity.

The main estimator is GRIDE, a nonlinear intrinsic-dimension method based on nearest-neighbor distance ratios. The authors also use two linear measures:

- PCA effective dimensionality,
- Participation Ratio.

The representations come from `10,000` twenty-word contexts sampled from The Pile.

### 3. Layerwise Surprisal

Surprisal is the negative log probability of the correct next token. Lower surprisal means better next-token prediction.

But intermediate layers do not directly output token probabilities. To estimate layerwise surprisal, the authors use TunedLens. TunedLens learns a linear or affine mapping from an intermediate hidden state into the model's output space.

This lets them ask: how much next-token information is already available at this layer?

## Main Results

### Result 1: Dimensionality Tracks fMRI Encoding

The most important result is that intrinsic dimensionality and fMRI encoding performance rise and fall together across layers.

For nonlinear intrinsic dimensionality, the reported average voxelwise correlations are high across the tested models:

| Model | Nonlinear intrinsic-dimensionality correlation |
| --- | ---: |
| OPT-125M | `0.91` |
| OPT-1.3B | `0.96` |
| OPT-13B | `0.85` |
| Pythia-6.9B | `0.90` |

PCA effective dimensionality also tracks encoding performance well. Participation Ratio mostly tracks it too, though Pythia-6.9B is an exception under that measure.

The intuitive meaning is:

**The brain-predictive layers are the layers where the model's linguistic representation is geometrically richest.**

### Result 2: OPT-1.3B Shows a Clear Transition

In OPT-1.3B, the encoding-performance peak appears at layer 17. The paper overlays encoding performance, intrinsic dimensionality, and TunedLens next-token loss.

At about the same layer where encoding performance peaks, next-token prediction loss sharply turns downward.

The authors interpret this as the transition between:

- a composition phase, where abstraction and dimensionality increase,
- a prediction phase, where the model gets more directly organized around next-token output.

This is the core "two-phase" claim.

### Result 3: CKA Supports a Representational Break

The paper also uses Centered Kernel Alignment, or CKA, to compare representations between layers.

For OPT-1.3B, the CKA map shows at least two layer groups. The intrinsic-dimensionality peak sits near the boundary between them. In plain language: layers before and after the peak are not just smoothly interchangeable. Their representations belong to different phases of processing.

### Result 4: The Pattern Is Visible Across The Brain, But Not Everywhere Equally

The voxelwise maps show that intrinsic dimensionality predicts encoding performance in higher-level language areas.

The primary auditory cortex is the major exception. That is sensible. Auditory cortex is more involved with low-level acoustic structure. The paper's abstraction story is about linguistic representation, not raw sound processing.

This strengthens the interpretation. The dimensionality pattern is not just a generic whole-brain artifact. It is strongest where abstract language processing is expected to matter.

### Result 5: The Peak Emerges During Training

The Pythia training-checkpoint analysis is one of the most persuasive parts of the paper.

The authors examine Pythia-6.9B over training, from early checkpoints to later ones. They find that:

- intrinsic dimensionality increases over training,
- encoding performance also increases over training,
- the two curves are globally correlated with `rho = 0.94`,
- the peak location moves during training and later settles around the same layer for both metrics.

That is important because it argues against a simple layer-index explanation. If the peak were just "Transformers have a middle," it would not need to emerge and shift over training.

Instead, the result suggests that the abstraction phase is learned.

## Why This Matters

### It Reframes Brain-LLM Similarity

A tempting story says: LLMs match brains because both predict upcoming language.

This paper says: maybe, but the layerwise evidence points more strongly toward abstraction.

The important similarity may be that both systems need representations of composed linguistic meaning. The LLM's final output machinery is less brain-like than the intermediate representation that has built up syntax, semantics, and context.

### It Gives Interpretability A Useful Geometric Signal

Intrinsic dimensionality is not a normal interpretability explanation like "this neuron detects sentiment" or "this attention head copies names." It is a geometric signal.

But it can still be useful. It tells us where in the model the representation seems to become most richly structured. If that point aligns with both brain predictivity and phase transitions in representation similarity, it becomes a meaningful landmark in the network.

### It Suggests Better Encoding Models

The authors point out a practical possibility. If different layers have different spectral and dimensionality properties, maybe a better brain encoding model should not pick a single layer. It might combine layer representations to produce a feature space with higher useful dimensionality than any individual layer.

That is speculative, but it gives the paper a forward path. The result is not only a retrospective explanation of why middle layers work.

## What To Be Careful About

This paper is suggestive, not final.

First, brain-model similarity is not mechanism identity. A model can predict brain activity for the wrong reason, or for a reason that is only loosely related to the brain's actual computation.

Second, fMRI is limited. It is useful for spatial maps but slow in time. It cannot reveal the full temporal structure of language comprehension.

Third, the subject count is small: 3 human subjects. This is not unusual for intensive fMRI language datasets, but it still matters.

Fourth, the model coverage is limited. The paper studies OPT and Pythia families. The conclusion needs testing across more architectures, scales, training objectives, and modern model families.

Fifth, intrinsic-dimensionality estimation is delicate. Nearest-neighbor estimates depend on sample, scale, and estimator assumptions. The authors do a scale analysis, but this remains a measurement choice.

Sixth, TunedLens is a proxy for layerwise prediction information. It is useful, but it measures information recoverable through a particular affine mapping, not every possible way a later network could use the hidden state.

## The Takeaway

The clean takeaway is:

**Middle LLM layers may be brain-like because they are where linguistic information is most richly composed, not because they are where next-token prediction is most directly represented.**

That is a small shift with a big interpretive consequence. It moves the discussion from "the brain is an autoregressive language model" toward a more careful claim: both brains and LLMs may need high-dimensional abstractions that compose words into meaning.

## Memory Checklist

- The paper studies why intermediate LLM layers often predict brain responses better than output layers.
- It compares fMRI encoding performance, intrinsic dimensionality, and TunedLens layerwise surprisal.
- Intrinsic dimensionality tracks encoding performance strongly across OPT and Pythia models.
- OPT-1.3B shows a phase transition near layer 17.
- Pythia training checkpoints show the dimensionality and encoding peaks emerging together.
- The authors interpret this as evidence for a composition phase followed by a prediction phase.
- The result supports abstraction-based explanations of brain-LLM similarity more than pure next-token-prediction explanations.
- The evidence is correlational and should not be read as proof that brains and LLMs implement the same mechanism.
