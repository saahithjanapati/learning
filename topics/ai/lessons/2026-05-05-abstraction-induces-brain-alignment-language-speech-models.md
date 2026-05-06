# Abstraction Induces Brain Alignment in Language and Speech Models

Source note: Emily Cheng, Aditya R. Vaidya, and Richard Antonello, "Abstraction Induces the Brain Alignment of Language and Speech Models." arXiv:2602.04081v1, submitted February 3, 2026. arXiv metadata lists Journal reference: ICML 2026; comments: under review. Source page: [arxiv.org/abs/2602.04081](https://arxiv.org/abs/2602.04081). Processed source: [materials/processed/ai/abstraction-induces-brain-alignment-language-speech-models.md](../../../materials/processed/ai/abstraction-induces-brain-alignment-language-speech-models.md).

Original sources: [arXiv abstract](https://arxiv.org/abs/2602.04081), [arXiv PDF](https://arxiv.org/pdf/2602.04081), [arXiv HTML](https://arxiv.org/html/2602.04081).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Central Question](#the-central-question)
- [The Big Idea](#the-big-idea)
- [What The Authors Measure](#what-the-authors-measure)
- [Main Results](#main-results)
- [The Causal Evidence](#the-causal-evidence)
- [Why Random Features Matter](#why-random-features-matter)
- [How This Fits The Previous fMRI Paper](#how-this-fits-the-previous-fmri-paper)
- [What To Be Careful About](#what-to-be-careful-about)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper asks why language and speech models can predict measured brain responses to natural language.

The obvious answer would be prediction. LLMs predict the next token. Speech models learn to predict or reconstruct speech-related targets. Humans also anticipate language. So maybe model-brain alignment happens because brains and models share a predictive objective.

Cheng, Vaidya, and Antonello argue for a different explanation. They say the key driver is meaning abstraction. Models become brain-like when their internal representations become semantically rich, high-dimensional descriptions of the input. The final layers that are best at next-token prediction are not usually the layers that best predict the brain.

This is the paper's central move:

**Prediction may be a training pressure that forces models to learn meaning, but the brain-aligned part is the meaning-rich abstraction layer, not the final prediction layer.**

### The Evidence

The authors test language models and speech models on fMRI and ECoG brain data.

The fMRI data come from 2 subjects listening to English podcast stories. The ECoG data come from 9 subjects listening to a 30-minute podcast. The model set includes OPT, Pythia, WavLM, and Whisper.

For every layer, the authors measure three main things:

1. How well that layer predicts brain responses.
2. The layer's intrinsic dimension, which estimates the complexity of the representation manifold.
3. How well that layer supports prediction of the next token or next word.

They also run semantic and surface/acoustic probes. These ask whether the layer contains shallow information, like surface form or acoustics, or higher-order semantic information.

### The Main Finding

Intrinsic dimension tracks brain predictivity better than layerwise surprisal.

Across all model layers, the correlation between normalized intrinsic dimension and encoding performance is:

| Modality | Correlation |
| --- | ---: |
| fMRI | `0.76` |
| ECoG | `0.43` |

The layer with lowest surprisal is usually the final layer. But the best brain-predictive layer appears around 40-70 percent of the way through the model. That means the layer closest to the output distribution is not generally the layer closest to the brain.

The probes explain why. Higher-order semantic features peak near the intrinsic-dimension peak. Surface and acoustic features live earlier. So the high-Id layer is not just large or complex in a generic way. It is where the model has built a rich semantic representation.

### What Makes This Paper Stronger Than A Correlation Story

The most important experiment finetunes WavLM-base-plus directly on fMRI responses. After finetuning, the targeted layer becomes:

- better at predicting fMRI,
- better at semantic probes,
- higher in intrinsic dimension.

That is causal evidence that increasing brain predictivity can increase semantic content and intrinsic dimension together.

The authors also use random Fourier features as a control. These random feature spaces can be high-dimensional, but they do not predict the brain nearly as well as learned model layers. So high intrinsic dimension alone is not sufficient. The important thing is learned semantic abstraction.

### Medium Takeaway

This paper says that model-brain alignment is not best explained by the final act of prediction. It is better explained by the internal construction of meaning. The model layers that most resemble brain responses are the layers where the input has become semantically rich and geometrically high-dimensional, before the model narrows that representation toward output.

## Full-Length Version

## The Central Question

Why do language and speech models predict brain activity?

That question is easy to state but hard to interpret. Many studies have shown that hidden states from language and speech models can be linearly mapped onto brain responses during natural language processing. This works across fMRI, ECoG, MEG, and other settings.

But the fact that it works does not tell us why.

There are two broad explanations.

The first explanation is predictive coding. Maybe models align with brains because both are prediction systems. LLMs predict tokens. Speech models learn predictive or reconstructive objectives. The brain also seems to anticipate language. So perhaps shared prediction is the key.

The second explanation is abstraction. Maybe models align with brains because both must build higher-order representations of language. To understand a sentence, a system has to move beyond the surface sequence into syntax, meaning, discourse, and concepts. If LLMs and speech models learn these abstractions, they may become useful proxies for brain responses even if their mechanisms differ from the brain's.

This paper argues for the abstraction explanation.

## The Big Idea

The paper's core claim is:

**Brain alignment appears when models build rich semantic abstractions, and those abstractions are marked by peaks in intrinsic dimension.**

Intrinsic dimension, or Id, is a geometric measure. It asks how many independent underlying degrees of freedom are needed to describe a model layer's representation manifold.

That sounds abstract, so here is the useful intuition:

- low Id can mean the representation is relatively compressed or simple,
- high Id can mean the representation has many independent axes of variation,
- in these models, high Id tends to appear where semantic information is richest.

The authors do not claim that Id itself magically causes brain alignment. They argue that high Id is a marker of learned meaning abstraction. The high-dimensional representation is brain-predictive because it contains the right learned structure, not because dimension alone is enough.

## What The Authors Measure

### Brain Encoding Performance

An encoding model predicts brain activity from model features.

For fMRI, the authors use two subjects from the LeBel et al. natural-language dataset. Each subject listened to roughly 20 hours of English podcast stories for training, plus repeated test stories for evaluation. The analysis includes roughly 90,000 voxels per subject.

For ECoG, they use the Podcast dataset: 9 subjects listening to one 30-minute podcast. They analyze high-gamma activity, which is commonly used as a local neural-activity signal in ECoG language studies.

For each model layer, the authors train linear maps from model activations to brain responses. The score is Pearson correlation `R` on held-out data.

### Model Families

The language models are:

- OPT-125M,
- OPT-1.3B,
- OPT-13B,
- Pythia-160M,
- Pythia-410M,
- Pythia-6.9B.

The speech models are:

- WavLM-base-plus,
- WavLM-large,
- Whisper-large encoder.

This mix matters because the paper is not only about text LLMs. Speech models start from audio, so they have a clearer path from acoustics to linguistic meaning.

### Intrinsic Dimension

The authors estimate intrinsic dimension with GRIDE.

For LLMs, Id is computed on `10,000` random 20-word contexts from The Pile. For speech models, Id is computed on `10,000` random audio chunks from LibriSpeech. Each estimate is averaged over 5 bootstraps.

The goal is to measure a layer's general representational complexity, not its behavior on one specific podcast.

### Semantic And Surface Probes

The authors use probes to ask what information each layer contains.

For LLMs, they use SentEval-style probing tasks. Some tasks are surface-level, while others require higher-order interpretation. For speech models, they probe acoustic and semantic features.

This is crucial. Without probes, "high intrinsic dimension" could be a vague geometry fact. The probes show that high-Id layers tend to be where semantic decodability peaks.

### Surprisal

Surprisal measures next-token or next-word prediction error. Lower surprisal means better prediction.

The authors estimate layerwise surprisal using affine maps from intermediate layers to vocabulary space. This lets them test whether the layers most predictive of upcoming words are also the layers most predictive of brain responses.

## Main Results

### Result 1: The Lowest-Surprisal Layer Is Not The Best Brain Layer

In LLMs, next-token predictivity improves toward the final layer. That is expected. The final layer is closest to the output distribution.

But the best brain-predictive layer is usually not final. It occurs around 40-70 percent of the way through processing.

This creates a problem for a simple prediction-based story. If next-token prediction directly caused model-brain alignment, the final or near-final layers should be the obvious winners. They are not.

Across all models, the global relationship between surprisal and encoding performance is inconsistent:

| Modality | Surprisal/encoding correlation |
| --- | ---: |
| fMRI | `-0.51` |
| ECoG | `0.21` |

The sign varies by model family. OPT and Whisper often show negative relationships, Pythia is often not significant, and WavLM can be positive.

That does not mean prediction is irrelevant to training. It means layerwise prediction quality is not the best explanation of layerwise brain alignment.

### Result 2: Intrinsic Dimension Tracks Brain Encoding

Intrinsic dimension is much more consistent.

Across model layers, normalized Id correlates with encoding performance:

| Modality | Id/encoding correlation |
| --- | ---: |
| fMRI | `0.76` |
| ECoG | `0.43` |

Within many model families, the relationship is very strong. The paper reports:

| Model | fMRI Id correlation | ECoG Id correlation |
| --- | ---: | ---: |
| OPT-125M | `0.92` | `0.97` |
| OPT-1.3B | `0.86` | `0.97` |
| OPT-13B | `0.88` | `0.82` |
| Pythia-160M | `0.49` | `0.83` |
| Pythia-410M | `0.90` | `0.88` |
| Pythia-6.9B | `0.95` | `0.88` |
| WavLM-base-plus | `-0.09` | `0.21` |
| WavLM-large | `0.90` | `0.42` |
| Whisper-large | `0.98` | `0.64` |

The broad pattern is clear: the layers with richer representational geometry tend to be the layers that better explain brain responses.

WavLM-base-plus is an exception. The authors argue that its encoding performance is driven more by low-level auditory cortex similarity than by semantic abstraction.

### Result 3: Semantic Information Peaks Near The Id Peak

The probe results give content to the geometry.

For language models:

- surface-level probing performance does not peak at the Id peak,
- higher-order semantic probing performance does peak near the Id peak.

For speech models:

- acoustic information is strongest earlier,
- semantic information is strongest near high-Id later layers.

This is one of the most important parts of the paper. It turns "intrinsic dimension correlates with the brain" into a more interpretable claim:

**The brain-predictive layers are the layers where the model has built higher-order semantic structure.**

### Result 4: Id And Brain Predictivity Emerge Together During Training

The authors examine Pythia-6.9B checkpoints across training.

They find that intrinsic dimension and encoding performance grow together:

| Comparison | Correlation |
| --- | ---: |
| Id vs fMRI encoding performance over training | `0.96` |
| Id vs ECoG encoding performance over training | `0.64` |

The location of the Id peak shifts over training, then settles near the best encoding layer. That argues against the idea that the middle layer is special just because of architecture. The special representation emerges from training.

This is important because it links three things:

- exposure to language data,
- growth of representational complexity,
- growth of brain predictivity.

### Result 5: Better-Predicted Brain Sites Are More Id-Coupled

For voxels and electrodes that are well predicted by the models, the relationship between Id and encoding performance becomes stronger.

For OPT-1.3B:

- fMRI subject UTS03 has `rho = 0.73` in well-predicted voxels,
- ECoG has `rho = 0.63` in well-predicted electrodes.

These well-predicted sites largely fall in fronto-temporal language regions. The main exception is primary auditory cortex, where low-level acoustic information matters more.

So the paper's claim is not that all brain activity is explained by semantic abstraction. It is more precise: in language-relevant brain regions, the model layers that build abstract meaning best track the brain.

## The Causal Evidence

The paper's most interesting causal result uses WavLM-base-plus.

The authors finetune WavLM layer 9 directly on fMRI responses. Layer 9 is the best-performing layer for this model. After finetuning, three things increase:

1. fMRI encoding performance.
2. Semantic probe performance.
3. Intrinsic dimension.

This is stronger than just observing that these quantities correlate. It says that pushing a model representation to better predict brain responses also pushes it toward richer semantic content and higher representational dimension.

That supports the paper's main causal picture:

```text
brain-tuning -> better brain prediction + richer semantics + higher Id
```

It does not prove the full mechanism of human language processing. But it does show that the relationship among semantic richness, Id, and brain predictivity is not merely a static coincidence.

## Why Random Features Matter

There is a tempting but wrong reading of the paper:

`High intrinsic dimension causes brain alignment.`

The random Fourier feature experiment blocks that reading.

The authors build random feature spaces with increasing intrinsic dimension and use them to predict brain responses. These random features do get higher-Id, and their encoding performance rises a little, but performance plateaus around `R = 0.04`.

Learned language and speech model layers can exceed `R > 0.1` with lower Id.

So high dimension is not enough. A random high-dimensional feature map does not become brain-like just because it has many degrees of freedom.

The better conclusion is:

**High Id is a marker of learned semantic abstraction. Learned semantic abstraction is what matters.**

## How This Fits The Previous fMRI Paper

This paper pairs naturally with the previous fMRI abstraction paper by Cheng and Antonello.

The previous paper made the clean two-phase argument for language models:

1. Early/middle layers compose abstract linguistic features.
2. Later layers reshape those features toward prediction.
3. The brain-like layer is near the abstraction peak, not the final prediction layer.

This paper extends that argument by adding:

- speech models,
- ECoG,
- semantic and acoustic probes,
- Pythia training dynamics,
- WavLM brain-tuning,
- random-feature controls.

So the earlier paper is the compact hypothesis. This paper is the more complete evidence package.

## What To Be Careful About

There are several limits.

First, most of the paper still uses encoding-model similarity. That is powerful, but it is not the same as proving the brain and the model compute the same algorithm.

Second, fMRI has high spatial coverage but slow timing. ECoG has high temporal resolution but limited electrode coverage.

Third, the causal finetuning experiment is important but narrow. It is done with WavLM-base-plus and fMRI response prediction. It does not automatically generalize to every model family.

Fourth, intrinsic dimension is a measurement choice. GRIDE is a serious estimator, but dimension estimates depend on neighborhood scale, sample construction, and representation preprocessing.

Fifth, semantic probes are proxies. They tell us that semantic information is more linearly decodable, but they do not reveal the full internal code.

Sixth, the paper weakens pure next-token-prediction explanations, but it does not say prediction objectives are irrelevant. Prediction may still be one useful route to learning the abstractions that later align with the brain.

## The Takeaway

This paper's cleanest lesson is:

**Models align with brain responses when they build rich semantic abstractions of language. Prediction objectives can help create those abstractions, but the final predictive layer is not the part that best matches the brain.**

That is a careful and useful shift. It keeps the importance of language-model training while avoiding the oversimplified claim that the brain is just doing next-token prediction.

## Memory Checklist

- The paper studies brain alignment in both language and speech models.
- The brain data include fMRI and ECoG.
- Surprisal does not consistently explain the best brain-predictive layer.
- Intrinsic dimension tracks encoding performance better than surprisal.
- Semantic probes show that high-Id layers are meaning-rich, not merely complex.
- Pythia training dynamics show Id and brain predictivity emerging together.
- WavLM brain-tuning causally increases fMRI prediction, semantic content, and Id.
- Random Fourier features show that high Id alone is not enough.
- The best summary is: learned meaning abstraction drives model-brain alignment.
