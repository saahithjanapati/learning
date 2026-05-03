# dnaHNet: A Scalable and Hierarchical Foundation Model for Genomic Sequence Learning

Source: `https://arxiv.org/pdf/2602.10603v3`
Site: `arXiv`
Version: `2602.10603v3`
Paper date: `April 13, 2026`
arXiv footer date: `2026-04-09`
Authors: `Arnav Shah, Junzhe Li, Parsa Idehpour, Adibvafa Fallahpour, Brandon Wang, Sukjun Hwang, Bo Wang, Patrick D. Hsu, Hani Goodarzi, Albert Gu`
Extraction engine: `Local PDF extraction with pypdf/PyMuPDF + manual structured ingest`
Strategy: `canonical PDF extraction and curriculum-oriented normalization`
Local source inspected: `/Users/saahithjanapati/Downloads/2602.10603v3.pdf`

## Summary

This paper introduces `dnaHNet`, a tokenizer-free autoregressive foundation model for genomic sequences. The central problem is that DNA does not come with natural word boundaries. Fixed tokenizers such as k-mers or BPE are computationally convenient, but they can cut across biologically meaningful units like codons, promoters, splice signals, and regulatory motifs. Nucleotide-level models avoid that biological mismatch, but they become expensive when contexts stretch across thousands or millions of bases.

dnaHNet tries to keep the good part of both approaches. It reads raw nucleotides, learns where to place chunk boundaries, compresses the sequence into latent chunks, models those chunks, and then decodes back to nucleotide-level predictions. The model is based on H-Net-style dynamic chunking, adapted for DNA with biologically motivated compression ratios and architecture changes for stable training.

The paper's main claims are:

- dnaHNet scales more efficiently than StripedHyena2 and Transformer baselines on prokaryotic genome modeling.
- A two-stage hierarchy with target compression ratios `3` and `2` can exploit codon-scale structure while reducing compute in the main network.
- The model improves zero-shot protein variant effect prediction and gene essentiality prediction at matched compute.
- Its learned chunk boundaries are interpretable: the first stage tracks codon periodicity, while the second stage becomes more sensitive to broader functional regions.

## Core Thesis

Genomic foundation models should not have to choose between biologically faithful nucleotide-level input and computationally tractable compressed representations. A model can learn the compression itself, end-to-end, by dynamically chunking raw DNA into context-dependent latent tokens.

## The Problem

DNA sequences are continuous strings over `{A, C, G, T}`. Unlike English, there are no spaces marking word boundaries. Existing genomic language models usually handle this in one of two ways:

1. Fixed tokenization, such as k-mers or BPE.
2. Nucleotide-level modeling.

Fixed tokenization is cheaper because it shortens the sequence before modeling. But it imposes arbitrary boundaries that may split biological units. For example, a fixed tokenizer may divide codons or regulatory motifs in a way that is convenient for the model but unnatural for biology.

Nucleotide-level modeling preserves the original sequence exactly. The problem is cost: long genomic context can be enormous, and attention over raw bases becomes expensive. This is why several genomic models use Mamba, Hyena, or StripedHyena-style alternatives to ordinary Transformer attention.

dnaHNet's bet is that the right representation granularity is not fixed. It should vary by context and by level of abstraction.

## Model Idea

dnaHNet is an autoregressive model over raw DNA. Given a sequence:

$$
X = (x_1, \dots, x_L), \quad x_t \in \{A, C, G, T\}
$$

the model predicts:

$$
P(X) = \prod_{t=1}^L P(x_t \mid x_{<t})
$$

The architecture has three main components:

| Component | Role |
| --- | --- |
| Encoder | Reads nucleotide-level input and predicts chunk boundaries. |
| Main Network | Processes the compressed latent chunk sequence. |
| Decoder | Upsamples latent representations back to nucleotide resolution and predicts the next base. |

The key mechanism is the boundary predictor. It computes a boundary probability by comparing adjacent hidden states with a learned cosine-dissimilarity score. If the representation changes sharply from one position to the next, the model is encouraged to place a boundary.

That gives dnaHNet an adaptive tokenizer, but it is not a preprocessing tokenizer. It is learned inside the model and trained jointly with next-nucleotide prediction.

## Hierarchical Chunking

The model can apply the same chunking idea recursively. A two-stage hierarchy first compresses raw nucleotides into local chunks, then compresses those chunks again into higher-level latent units.

The paper finds that this hierarchy maps naturally onto genomic organization:

- Stage 1 tends to discover codon-scale periodicity.
- Stage 2 becomes more sensitive to functional regions such as promoters, start codons, coding regions, and intergenic regions.

The authors use biologically motivated target compression ratios:

- `R1 = 3` for the first stage, matching codon triplets.
- `R2 = 2` for the second stage, motivated by codon-pair structure.
- Effective compression is `R1 * R2 = 6`.

Because the most expensive main-network operations happen on the compressed sequence, reducing length by a factor of `6` can reduce the quadratic part of the main-network cost by about `36x`.

## Architecture And Training Details

The encoder and decoder use a hybrid backbone:

- 4 Mamba layers,
- 1 Transformer layer.

The authors increase encoder-decoder capacity relative to the original text-oriented H-Net setup. For DNA, local patterns are richer than local byte patterns in text, so dnaHNet allocates about `30%` of parameters to the encoder-decoder pair and `70%` to the main network.

The training loss combines:

- autoregressive next-nucleotide negative log likelihood,
- a rate loss that pushes each hierarchy stage toward its target compression ratio.

The paper notes that too much compression regularization can destabilize training. Natural-language H-Net coefficients around `alpha >= 0.03` were too aggressive for next-nucleotide prediction, so dnaHNet uses smaller values around `0.01` to `0.02` in the successful configurations.

## Pretraining Data

The models are pretrained on a processed subset of the Genome Taxonomy Database, following the filtering and dereplication methodology from OpenGenome/Evo.

Key dataset details:

- `17,648,721` sequences,
- `144B` total nucleotides,
- `85,205` prokaryotic organisms,
- sequence chunks up to `8192` nucleotides,
- filtered by assembly completeness, contamination, and marker-gene content,
- one representative retained per species-level cluster.

This matters for interpretation: the reported results are primarily about prokaryotic genome modeling. The paper does not establish the same behavior for eukaryotic regulatory biology.

## Scaling Analysis

The paper trains more than `100` models from `10M` to `1B` parameters across three architecture families:

- dnaHNet with 1-stage, 2-stage, and 3-stage hierarchies,
- StripedHyena2,
- decoder-only Transformers.

Compute budgets range from `4e18` to `8e19` FLOPs.

For dnaHNet, total FLOPs are decomposed as:

$$
\text{FLOPs}_{total} =
\text{FLOPs}_{enc}(L) +
\text{FLOPs}_{main}(L/R) +
\text{FLOPs}_{dec}(L)
$$

where `L` is raw sequence length and `R` is the compression ratio. The main network sees the compressed length `L/R`, so attention there scales with `(L/R)^2` rather than `L^2`.

Headline scaling results:

- At `1,000,000` nucleotides, a `218M` dnaHNet requires `3.89x` fewer inference FLOPs than a `166M` StripedHyena2 baseline.
- Perplexity scaling exponent is reported as `0.06` for dnaHNet, `0.04` for StripedHyena2, and `0.01` for Transformer baselines.
- At the high end of the tested compute range, StripedHyena2 would require about `3.75x` more compute to reach the same evaluation perplexity as dnaHNet.
- The compute-optimal dnaHNet uses more training tokens than expected from ordinary Chinchilla-style scaling. At `8e19` FLOPs, dnaHNet prefers about `140B` tokens, while StripedHyena2 uses about `68B`.

## Downstream Evaluations

### Protein Variant Effect Prediction

The paper evaluates zero-shot protein variant effect prediction on `12` nucleotide-level `E. coli` K-12 fitness datasets from MaveDB, totaling `21,250` data points.

Method:

1. Construct wild-type and mutated coding sequences.
2. Score each with autoregressive log likelihood.
3. Use the log-likelihood difference as the predicted fitness signal.
4. Compare against experimental fitness with Spearman correlation.

Reported Spearman correlations:

| Model | Low compute | High compute |
| --- | ---: | ---: |
| dnaHNet | `0.2601` | `0.3266` |
| StripedHyena2 | `0.2639` | `0.3110` |
| Transformer | `0.1348` | `0.1555` |

dnaHNet is roughly comparable to StripedHyena2 at the lowest budget and pulls ahead as compute increases.

### Gene Essentiality Prediction

The paper evaluates zero-shot gene essentiality on the Database of Essential Genes. The dataset includes `62` bacterial organisms and `185,226` data points.

Method:

1. Extract an `8192` bp window centered on each gene.
2. Create a knockout variant by inserting/replacing a premature stop-codon sequence near the start codon.
3. Compare wild-type and knockout log likelihoods.
4. Evaluate binary essentiality prediction with AUROC.

Reported AUROC scores:

| Model | Low compute | High compute |
| --- | ---: | ---: |
| dnaHNet `(3,2)` hierarchy | `0.5719` | `0.6050` |
| dnaHNet `(2,2)` hierarchy | `0.5538` | `0.5900` |
| StripedHyena2 | `0.5375` | `0.5759` |

The absolute AUROC values are modest, so this is not a solved essentiality predictor. The useful result is the consistent compute-matched improvement and the better scaling trend.

## Learned Biological Structure

The interpretability analysis uses the `B. subtilis` genome. The authors process five random `49,152` bp windows with a trained two-stage `(3,2)` model, then measure where the model selects boundaries.

Key selection statistics:

| Genomic feature | Stage 1 | Stage 2 |
| --- | ---: | ---: |
| Global selection rate | `35.8%` | `51.3%` |
| Promoter | `35.6%` | `71.5%` |
| Start codon | `35.1%` | `81.3%` |
| Coding region | `35.8%` | `48.4%` |
| Stop codon | `34.5%` | `51.7%` |
| Intergenic | `35.3%` | `74.6%` |

Inside coding regions, Stage 1 shows codon-position periodicity:

| Codon position | Stage 1 selection rate |
| --- | ---: |
| Position 1 | `6.5%` |
| Position 2 | `42.6%` |
| Position 3 | `58.4%` |

The authors interpret this as a hierarchy:

- Stage 1 learns local coding syntax.
- Stage 2 learns broader functional organization.

## Appendix Details Worth Retaining

The paper reports three primary model scales: Medium, Large, and Extra Large. All use a two-stage recursive hierarchy with a layout summarized as:

```text
["m4", ["T1m4", ["TN"], "m4T1"], "m4"]
```

where `m4` means 4 Mamba layers, `T1` means 1 Transformer layer, and `TN` means `N` Transformer layers in the innermost main network.

Training uses:

- AdamW,
- weight decay `0.05`,
- gradient clipping `1.0`,
- BF16 mixed precision,
- linear warmup plus cosine decay,
- layer-wise learning-rate multipliers with higher rates for outer compressive layers.

The appendix also reports wall-clock benchmarks on a single NVIDIA H100. At long contexts, dnaHNet uses much less memory than StripedHyena2; for example, at `2^19` nucleotides, dnaHNet-XL uses about `18GB`, while the cited SH2-100M configuration uses more than `55GB`.

## Strengths

- The paper addresses a real representational problem in genomic modeling rather than only swapping architectures.
- The dynamic chunking mechanism has a plausible biological interpretation.
- The scaling analysis is broad for an academic-style paper: more than `100` trained models across architecture families.
- The downstream tasks are zero-shot and mechanistically tied to likelihood differences, which makes them useful tests of learned genomic structure.
- The learned-boundary analysis gives a concrete interpretability story rather than treating the hierarchy as a black box.

## Limitations

- The model is pretrained only on prokaryotic genomes.
- The paper does not establish behavior on eukaryotic genomes, where introns, enhancers, chromatin structure, and long-range regulation are central.
- Downstream evaluation is zero-shot only; fine-tuning behavior remains unexplored.
- The best compression ratios are biologically motivated but fixed by design; they may not transfer to every genomic regime.
- The largest reported scale is `1B` parameters, so trillion-scale or all-domains-of-life behavior is not known.
- The absolute gene-essentiality AUROC remains modest, even though scaling trends are favorable.

## My Take

dnaHNet is best read as a strong architecture-and-scaling paper for genomic foundation models. Its most durable idea is not simply "hierarchy is good." It is that learned segmentation can make the tokenization problem part of the model instead of a brittle preprocessing choice.

The biological-structure result is the most memorable part: the first stage behaves like it has discovered codon-scale rhythm, while the second stage becomes more sensitive to functional map boundaries. That is exactly the kind of interpretability story dynamic tokenization should deliver.

The main caution is scope. The paper's evidence is convincing for prokaryotic sequence modeling under the reported setup, but it does not yet prove that the same hierarchy will discover eukaryotic regulatory grammar or solve long-range phenotype prediction. Still, it is a clean and useful step toward genomic models whose internal representation is learned from biology rather than imposed by a tokenizer.
