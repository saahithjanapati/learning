# Abstraction Induces the Brain Alignment of Language and Speech Models

Source: https://arxiv.org/abs/2602.04081
PDF: https://arxiv.org/pdf/2602.04081
Authors: Emily Cheng, Aditya R. Vaidya, and Richard Antonello
Submitted: 2026-02-03
arXiv metadata: Journal reference: ICML 2026; comments: under review
Subjects: Computation and Language
Ingested: 2026-05-05
Extraction engine: Local PDF extraction with pypdf/PyMuPDF plus arXiv metadata inspection
Strategy: Canonical PDF extraction and medium/full AI paper lesson normalization

## Summary

This paper argues that language and speech models align with measured brain responses because they learn rich abstractions of linguistic meaning, not simply because they predict the next token. It extends the two-phase abstraction story from language models to speech models and to multiple brain recording modalities.

The motivating puzzle is familiar from language encoding work: intermediate model layers often predict brain responses better than final layers. If next-token prediction were the direct cause of brain alignment, the final layers should look especially good, because they are closest to the output distribution. Instead, the best brain-predictive layers usually sit in the middle or deep-middle of the model.

The authors test this with:

- fMRI data from 2 subjects listening to English podcast stories,
- ECoG high-gamma data from 9 subjects listening to a 30-minute podcast,
- 6 language models from OPT and Pythia,
- 3 speech models: WavLM-base-plus, WavLM-large, and Whisper-large's encoder,
- layerwise intrinsic dimensionality estimates,
- layerwise semantic and surface/acoustic probes,
- layerwise surprisal estimates,
- Pythia training dynamics,
- WavLM finetuning on brain responses,
- random Fourier feature controls.

The main result is that intrinsic dimension, semantic richness, and brain predictivity move together. Layers with higher intrinsic dimension tend to be the same layers that better predict fMRI and ECoG responses. Across all model layers, the global Spearman correlation between normalized intrinsic dimension and encoding performance is `0.76` for fMRI and `0.43` for ECoG. Within individual language-model families, the correlations are often much stronger.

By contrast, layerwise surprisal does not explain the best brain-predictive layers. The lowest-surprisal layer is generally the final layer, while the best encoding layer occurs around 40-70 percent of the way through processing. Across all models, surprisal has weaker and less consistent correlations with encoding performance than intrinsic dimension.

The semantic-probing experiments supply the interpretive bridge. Surface-level features are most decodable early, but higher-order semantic features peak near the intrinsic-dimension peak. This holds for language models using SentEval-style probes and for speech models using acoustic and semantic probes. The high-dimensional layer is not just geometrically large; it is semantically rich.

The training-dynamics analysis strengthens the story. In Pythia-6.9B, intrinsic dimension and brain encoding performance grow together over pretraining. Their global correlation is `0.96` for fMRI and `0.64` for ECoG. The intrinsic-dimension peak shifts during training and eventually settles near the best encoding layer, arguing against a trivial layer-index explanation.

The causal intervention is the most important addition. The authors finetune WavLM-base-plus layer 9 on fMRI responses. This increases encoding performance, semantic probe performance, and intrinsic dimension at the tuned layer. That suggests that making a speech model more brain-predictive also makes its representation more semantic and higher-dimensional.

The random Fourier feature experiment prevents a too-simple conclusion. High intrinsic dimension alone is not enough. Random feature spaces can have high intrinsic dimension, but they predict the brain poorly compared with learned language and speech model layers. The paper's conclusion is therefore not "dimension causes brain alignment." It is closer to: learned semantic abstraction produces high-dimensional representations, and those representations are the ones that align best with brain responses.

## Core Thesis

Model-brain alignment is primarily driven by rich meaning abstraction. Next-token or speech prediction can be a training route that forces models to learn such abstractions, but the final predictive machinery is not what best matches the brain. The strongest alignment appears near the model layers where semantic content and intrinsic dimension peak.

## Relationship To The Previous fMRI Abstraction Paper

This paper is closely related to `Evidence from fMRI Supports a Two-Phase Abstraction Process in Language Models` by Cheng and Antonello. The newer paper broadens and strengthens that argument.

New additions include:

- speech models, not only language models,
- ECoG, not only fMRI,
- 2 fMRI subjects and 9 ECoG subjects,
- explicit semantic and surface/acoustic layer probes,
- WavLM brain-response finetuning,
- random Fourier feature controls testing whether intrinsic dimension alone is enough.

So the earlier paper gives the clean two-phase hypothesis; this paper gives a broader causal and multimodal case for it.

## Method At A Glance

### Brain Data

For fMRI, the authors use 2 subjects, UTS02 and UTS03, from the open LeBel et al. natural-language fMRI dataset. Each subject listened to roughly 20 hours of English podcast stories for training. Testing used 3 stories, with repetitions averaged for cleaner responses. The analysis includes about 90,000 voxels per subject.

For ECoG, the authors use the open Podcast dataset, which contains a single 30-minute podcast recorded across 9 subjects. They analyze high-gamma activity after rereferencing, line-noise removal, filtering, and bad-channel exclusion.

### Encoding Models

For language models, the authors extract layer activations for each word with enough preceding context to give at least 256 tokens. They downsample features and add hemodynamic delays for fMRI, then train ridge-regression encoding models.

For speech models, the authors segment audio into 16-second chunks with a 100 ms stride, extract last-token representations, downsample them, and train similar linear models.

For ECoG, separate linear models are trained across 128 lags from -2 to +2 seconds, and encoding performance is taken at the best lag.

Encoding performance is measured by Pearson correlation `R` on held-out data.

### Models

Language models:

- OPT-125M,
- OPT-1.3B,
- OPT-13B,
- Pythia-160M,
- Pythia-410M,
- Pythia-6.9B.

Speech models:

- WavLM-base-plus,
- WavLM-large,
- Whisper-large encoder.

### Intrinsic Dimension

Intrinsic dimension is estimated with GRIDE. For language models, it is computed from `10,000` random 20-word contexts from The Pile. For speech models, it is computed from `10,000` random audio chunks up to 20 seconds from LibriSpeech. Results are averaged over 5 bootstraps.

### Linguistic Probes

For language models, the authors use SentEval-style layerwise probes to distinguish surface-level from higher-order linguistic features.

For speech models, they probe acoustic and semantic features based on prior speech-model analysis work.

The point is to connect intrinsic dimension to interpretable content: is the high-Id layer carrying shallow surface information, or higher-order meaning?

### Surprisal

The authors estimate next-token or next-word surprisal from intermediate layers using affine maps to vocabulary space. This tests whether better prediction of upcoming tokens explains layerwise brain predictivity.

### Random Fourier Features

Random Fourier features are used as a high-dimensional but untrained baseline. They let the authors ask whether high intrinsic dimension alone is enough to predict brain activity.

## Main Findings

### 1. Surprisal Does Not Explain Layerwise Brain Predictivity

For LLMs, next-token surprisal generally improves monotonically toward the final layer. But the best brain-predictive layer is not the final layer. It occurs between roughly 40 and 70 percent of processing depth.

Across all models, the global correlation between surprisal and encoding performance is weaker and less consistent than the intrinsic-dimension result. For fMRI, the all-model surprisal correlation is `-0.51`; for ECoG, it is `0.21`. The sign and significance vary by model family: OPT and Whisper often show negative correlations, Pythia is often not significant, and WavLM can even be positive.

This weakens the pure predictive-coding explanation. The layers closest to the model's prediction objective are not generally the layers closest to the brain.

### 2. Intrinsic Dimension Tracks Encoding Performance

Intrinsic dimension does much better.

Across all model layers, normalized intrinsic dimension correlates with encoding performance at:

| Modality | Global Spearman correlation |
| --- | ---: |
| fMRI | `0.76` |
| ECoG | `0.43` |

Within individual models, the layerwise intrinsic-dimension correlations are often very high. Table 1 reports:

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

WavLM-base-plus is the clear exception, which the authors attribute to low-level auditory-cortex alignment.

### 3. Semantic Decodability Peaks Near The Id Peak

The paper shows that high intrinsic dimension corresponds to semantic feature construction.

For language models, higher-order semantic probing performance peaks in the deep-middle layers near the intrinsic-dimension peak, while surface-level features do not follow the same pattern. For speech models, acoustic information is strongest early, while semantic information is most decodable near high-Id later layers.

That matters because "high dimension" by itself is abstract. The probes make it interpretable: the high-Id layer is where the model has built a richer semantic representation.

### 4. Id And Encoding Performance Grow Together During Training

In Pythia-6.9B checkpoints, intrinsic dimension and brain encoding performance emerge together over pretraining.

The reported global correlations are:

| Training-dynamics comparison | Correlation |
| --- | ---: |
| Id vs fMRI encoding performance | `0.96` |
| Id vs ECoG encoding performance | `0.64` |

The intrinsic-dimension peak also moves over training and later settles near the best encoding layer. This makes it unlikely that the result is just "middle layers are always special because of architecture." The relationship appears to be learned from language exposure.

### 5. Better-Predicted Brain Sites Show Stronger Id Coupling

In well-predicted voxels and electrodes, encoding performance tracks intrinsic dimension more strongly.

For OPT-1.3B, among well-predicted sites:

- fMRI subject UTS03 has `rho = 0.73` between Id and encoding performance,
- ECoG has `rho = 0.63`.

The main exception is near primary auditory cortex, where low-level acoustic information matters more than abstract linguistic features.

### 6. Brain-Tuning WavLM Increases Encoding Performance, Semantics, And Id

The authors finetune WavLM-base-plus layer 9 directly on fMRI responses. After finetuning, the tuned representation shows:

- higher fMRI encoding performance,
- higher semantic probe performance,
- higher intrinsic dimension.

This is the strongest causal evidence in the paper. Making the model more brain-predictive also makes it more semantically rich and geometrically higher-dimensional.

### 7. High Id Alone Is Not Enough

The random Fourier feature experiment is a useful guardrail. The authors create untrained feature spaces with increasing intrinsic dimension. Those random features can increase in Id, but their fMRI encoding performance plateaus around `R = 0.04`.

Meanwhile, learned language and speech model layers with lower Id can exceed `R > 0.1`.

So intrinsic dimension is not a magic ingredient. It is a symptom of learned semantic abstraction, and that learned abstraction is what matters for brain alignment.

## Why This Matters

This paper sharpens how to interpret model-brain similarity.

The naive story is:

`brains predict language; LLMs predict language; therefore prediction explains alignment.`

The paper's story is subtler:

`prediction objectives can force models to learn rich abstractions; those abstractions, not the final predictive output layer, are what align best with brain responses.`

That distinction matters. It means the brain-like part of a model may be the internal representation where meaning is built, not the final layer where output is chosen.

It also matters for speech models. A speech model has to move from acoustic input toward linguistic meaning. The paper suggests that the best brain-predictive speech layers are the ones where semantic abstraction has emerged, not merely the ones that preserve sound details or predict next words best.

## Limitations

Important cautions:

- The paper still relies on correlational encoding-model analyses for much of the evidence.
- The fMRI sample is small, though intensive.
- ECoG has better temporal precision but limited electrode coverage and only a 30-minute podcast dataset.
- Intrinsic dimension is estimator-dependent and scale-sensitive.
- The WavLM finetuning result is causal but limited to one speech architecture and fMRI response objective.
- Random Fourier features show that high Id is not sufficient, but they do not identify the exact semantic features that cause alignment.
- The result does not prove that brains and models implement the same algorithm.

## My Take

This is the stronger and more complete version of the two-phase abstraction argument. The earlier result was already interesting: middle LLM layers look brain-like because they are where abstraction peaks. This paper makes the story harder to dismiss by adding speech models, ECoG, semantic probes, training dynamics, direct brain-tuning, and random-feature controls.

The most important conceptual update is that intrinsic dimension should not be treated as the cause by itself. It is a marker of the model having learned a rich semantic space. When that semantic space is useful for understanding language, it becomes useful for predicting brain responses too.

## Questions To Remember

1. Why does the final, lowest-surprisal layer fail to explain the best brain-predictive layer?
2. What does intrinsic dimension measure in this paper?
3. Why do semantic probes matter for interpreting the Id peak?
4. What does Pythia pretraining show about how the Id/brain-alignment relationship emerges?
5. Why is the WavLM brain-tuning result stronger than a purely correlational result?
6. Why do random Fourier features show that high Id alone is not enough?
7. How does this paper change the simple "brains and LLMs both predict language" story?
