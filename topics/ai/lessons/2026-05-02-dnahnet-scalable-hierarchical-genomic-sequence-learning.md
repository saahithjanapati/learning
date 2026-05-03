# dnaHNet: Scalable Hierarchical Genomic Sequence Learning

Source note: Arnav Shah, Junzhe Li, Parsa Idehpour, Adibvafa Fallahpour, Brandon Wang, Sukjun Hwang, Bo Wang, Patrick D. Hsu, Hani Goodarzi, and Albert Gu, "dnaHNet: A Scalable and Hierarchical Foundation Model for Genomic Sequence Learning." arXiv:2602.10603v3, paper date April 13, 2026. Source PDF: [arxiv.org/pdf/2602.10603v3](https://arxiv.org/pdf/2602.10603v3). Processed source: [materials/processed/ai/dnahnet-scalable-hierarchical-foundation-model-for-genomic-sequence-learning.md](../../../materials/processed/ai/dnahnet-scalable-hierarchical-foundation-model-for-genomic-sequence-learning.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Central Research Question](#the-central-research-question)
- [Why DNA Tokenization Is Hard](#why-dna-tokenization-is-hard)
- [The Main Idea: Learn The Segmentation](#the-main-idea-learn-the-segmentation)
- [How dnaHNet Works](#how-dnahnet-works)
- [Why The Compression Ratios Matter](#why-the-compression-ratios-matter)
- [Training Data And Objective](#training-data-and-objective)
- [Scaling Results](#scaling-results)
- [Downstream Results](#downstream-results)
- [The Interpretability Result](#the-interpretability-result)
- [What Should We Be Careful About?](#what-should-we-be-careful-about)
- [The Takeaway](#the-takeaway)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

dnaHNet is a genomic foundation-model paper about a deceptively basic question: what should the "tokens" of DNA be?

For English, tokenization at least has clues. Spaces separate words. Punctuation marks boundaries. Subword tokenizers are imperfect, but they are not starting from a completely continuous stream. DNA is different. A genome is a long string over four letters: `A`, `C`, `G`, and `T`. There are biologically meaningful units inside that string, such as codons, promoters, regulatory elements, and genes, but they are not separated by spaces.

Most genomic language models pick one of two imperfect choices. They either use fixed tokens, such as k-mers or BPE units, or they model every nucleotide one at a time. Fixed tokens are efficient but biologically brittle. Nucleotide-level models preserve the raw sequence but become expensive for long contexts.

dnaHNet tries to escape that tradeoff. It reads raw nucleotides, learns where chunk boundaries should go, compresses the sequence into latent chunks, models the shorter latent sequence, and then decodes back to nucleotide-level predictions. The model is tokenizer-free in the sense that tokenization is not a separate preprocessing step. The segmentation is learned inside the network.

### The Core Mechanism

The architecture has three pieces:

| Component | What it does |
| --- | --- |
| Encoder | Reads raw nucleotides and predicts where chunk boundaries belong. |
| Main Network | Models the compressed sequence of learned chunks. |
| Decoder | Upsamples the chunk representations and predicts the next nucleotide. |

The encoder compares neighboring hidden states. If the representation changes sharply, the model is more likely to place a boundary. That makes the chunking context-dependent. A boundary is not "every 3 bases forever" or "whatever BPE learned before training." It is chosen by the model as part of its prediction problem.

The architecture is also hierarchical. The paper's strongest setup uses two compression stages. The first stage has target compression `3`, matching the idea that codons are triplets. The second stage has target compression `2`, motivated by codon-pair structure. Together they compress the sequence by about `6x` before the innermost main network.

That matters because the expensive part of sequence modeling depends heavily on length. If the main network sees `L/6` positions instead of `L`, the quadratic portion of its cost can shrink by roughly `36x`.

### What The Paper Tests

The authors pretrain dnaHNet on prokaryotic genomes from the Genome Taxonomy Database:

- about `144B` nucleotides,
- `17.6M` sequences,
- `85,205` prokaryotic organisms,
- chunks up to `8192` nucleotides.

They compare dnaHNet against StripedHyena2 and Transformer baselines across more than `100` trained models, from `10M` to `1B` parameters.

The scaling result is the first headline. At million-nucleotide inference length, a `218M` dnaHNet uses `3.89x` fewer inference FLOPs than a `166M` StripedHyena2 baseline. Its perplexity improves faster with training compute as well: the paper reports a scaling exponent of `0.06` for dnaHNet, versus `0.04` for StripedHyena2 and `0.01` for Transformers.

The downstream result is the second headline. In zero-shot protein variant effect prediction, dnaHNet improves with compute and beats StripedHyena2 at the high end of the tested range. In zero-shot gene essentiality prediction, the `(3,2)` hierarchy reaches `0.6050` AUROC at the high end, compared with `0.5759` for StripedHyena2.

### The Most Interesting Result

The interpretability section is the memorable part of the paper.

The authors inspect learned chunk boundaries on the `B. subtilis` genome. Stage 1 learns codon-like periodicity: inside coding regions, it selects boundaries very differently across codon positions. Position 1 is selected only `6.5%` of the time, while positions 2 and 3 are selected `42.6%` and `58.4%` of the time.

Stage 2 behaves differently. It becomes more sensitive to broader functional regions. It selects promoters, start codons, and intergenic regions at much higher rates than ordinary coding regions.

That gives the paper its strongest intuition: the hierarchy is not just a compute trick. The lower stage seems to track local coding syntax, while the upper stage tracks larger functional organization.

### Medium Takeaway

dnaHNet's durable lesson is that genomic tokenization should be learned, not hard-coded. The paper shows that a model can keep nucleotide-level input, compress it dynamically, scale better than strong long-sequence baselines, and learn chunk boundaries that line up with biological structure. The evidence is strongest for prokaryotic genomes and zero-shot likelihood-based tasks; eukaryotic regulation, fine-tuning behavior, and larger-scale training remain open.

## Full-Length Version

## The Paper In One Sentence

dnaHNet is a tokenizer-free genomic language model that learns to segment raw DNA into hierarchical chunks, giving it the biological fidelity of nucleotide-level modeling and much of the efficiency of compressed sequence modeling.

The phrase "tokenizer-free" is the key. The model still creates latent chunks, but those chunks are not fixed before training. They are learned as part of the model's attempt to predict the next nucleotide.

That is the conceptual shift:

**Instead of asking humans to choose the right DNA tokens, let the model learn context-dependent genomic chunks end-to-end.**

## The Central Research Question

The paper is trying to answer:

**Can a genomic foundation model learn its own biologically meaningful sequence segmentation while also scaling more efficiently than fixed-token or nucleotide-level baselines?**

There are several smaller questions inside that.

First, can dynamic chunking work on DNA at scale? H-Net-style learned chunking had been explored for general sequence modeling, but genomics has its own structure and training stability problems.

Second, can learned chunks be computationally useful? If dynamic chunking creates a beautiful interpretation but does not reduce FLOPs, it is mostly a biology-flavored visualization. The paper wants the compression to matter for scaling.

Third, are the chunks biologically meaningful? The best outcome would not be arbitrary compression. It would be a hierarchy where low-level chunks align with local sequence grammar and high-level chunks align with broader functional regions.

Fourth, does this help downstream biological prediction? The authors test protein variant effects and gene essentiality in a zero-shot likelihood framework.

## Why DNA Tokenization Is Hard

Tokenization is easy to overlook because in natural language modeling it is often treated as plumbing. But in genomics, tokenization is part of the scientific problem.

DNA is a continuous sequence over four bases:

```text
A C G T
```

Biology gives us structures inside that sequence, but not explicit delimiters. A coding region is read in triplets called codons. A promoter can regulate transcription. An intergenic region may carry regulatory information. A motif may be short, long, overlapping, or context-dependent.

So a tokenizer has to answer questions like:

- Should the model group bases in triplets?
- Should the grouping change in non-coding regions?
- Should promoters and coding regions use the same unit size?
- Should the model use fixed local chunks, learned vocabulary items, or raw bases?

Fixed k-mer tokenization gives a simple answer: every token is a fixed-length substring. That is efficient, but it can cut across meaningful units. If the phase is wrong, a k-mer boundary can split a codon. Even when the phase is right, a fixed scheme may not fit regulatory elements.

BPE-style tokenization gives a learned vocabulary, but it is still a preprocessing step. It learns frequent substrings, not necessarily biological function. It also produces discrete tokens before the sequence model ever sees the data.

Nucleotide-level modeling avoids that problem by keeping every base. But now the sequence length is huge. Genomes can require long context, and attention over raw nucleotides is expensive. This has pushed genomic foundation models toward architectures like Hyena, Mamba, and StripedHyena that handle long sequences more cheaply than vanilla attention.

dnaHNet is trying to keep the raw input while making the internal sequence shorter.

## The Main Idea: Learn The Segmentation

The paper builds on H-Net, a dynamic chunking architecture. The model takes a raw sequence and learns where chunks should begin and end. The chunks are not final tokens in a normal tokenizer. They are latent representations produced by the model.

The intuition is simple:

When two neighboring positions look like they belong together, do not split them. When the hidden representation changes sharply, place a boundary.

For DNA, that could mean:

- grouping bases into codon-like units inside coding regions,
- reacting differently near start or stop codons,
- treating promoter-like regions differently from ordinary coding sequence,
- using short chunks where precision matters and longer chunks where compression is safe.

The model is trained end-to-end, so the segmentation is judged by whether it helps predict the next nucleotide and satisfy a compression target.

This is important. dnaHNet is not saying "codons are always the tokens." It uses codon structure as a useful prior for one compression target, but the boundaries are still learned from context.

## How dnaHNet Works

dnaHNet formulates genomic modeling as autoregressive prediction:

$$
P(X) = \prod_{t=1}^{L} P(x_t \mid x_{<t})
$$

where each `x_t` is one of `A`, `C`, `G`, or `T`.

The architecture has three parts.

### Encoder

The encoder reads the raw nucleotide sequence and produces hidden states. It uses a hybrid backbone with Mamba layers and a Transformer layer. The boundary module then compares adjacent hidden states and predicts boundary probabilities.

The paper's boundary score is based on cosine dissimilarity between learned projections of neighboring hidden states. The rough idea is:

**large representational change -> higher boundary probability.**

The chunking layer then keeps representations at selected boundaries and forms a shorter sequence of latent chunks.

### Main Network

The main network processes the compressed latent sequence. This is where much of the modeling capacity sits.

The key compute advantage is that the main network sees fewer positions. If the raw sequence has length `L` and compression ratio is `R`, the main network sees something closer to `L/R`. For attention-like operations, that reduction is especially valuable.

The main network can itself contain another H-Net module, which creates a recursive hierarchy. The best reported model uses two stages.

### Decoder

The decoder maps the compressed latent sequence back to nucleotide resolution. It smooths latent states, upsamples them to the original sequence length, and predicts the next nucleotide distribution.

This decoder matters because the final objective is still nucleotide-level prediction. The model cannot simply throw away base-level detail. It has to compress enough to be efficient but preserve enough information to predict the raw sequence.

## Why The Compression Ratios Matter

The successful two-stage setup uses:

- first-stage target compression `R1 = 3`,
- second-stage target compression `R2 = 2`,
- effective compression `R1 * R2 = 6`.

The first number is biologically intuitive. Coding regions are read in codons, and codons contain three nucleotides. A first-stage target around `3` nudges the model toward a useful local unit without forcing every region to be tokenized identically.

The second stage is motivated by codon-pair structure. Adjacent codons are not randomly distributed; codon-pair bias can affect translation efficiency and accuracy. A second compression stage lets the model build a higher-level representation over local coding units.

The authors also find that DNA needs more encoder-decoder capacity than text. In the original text-oriented H-Net setup, the encoder-decoder could be relatively small. For DNA, local base-level structure is more consequential, so dnaHNet allocates about `30%` of parameters to the encoder-decoder and `70%` to the main network.

That is a practical design lesson:

**If compression is part of the model's scientific job, the compressor cannot be too weak.**

## Training Data And Objective

The model is trained on prokaryotic genomes from the Genome Taxonomy Database, filtered with methodology from OpenGenome/Evo.

The final pretraining corpus has:

- `144B` nucleotides,
- `17,648,721` sequences,
- `85,205` prokaryotic organisms,
- chunks up to `8192` nucleotides.

The loss has two parts.

The first part is ordinary autoregressive next-nucleotide prediction. The second part is a rate loss that keeps the learned chunking near the desired compression ratio.

This regularization is necessary because unconstrained chunking can collapse. If the boundary predictor selects every position, there is no useful compression. If it selects almost nothing, the model loses too much information. The rate loss keeps the model in the useful middle.

The authors report that the regularization weight has to be handled carefully. Values that worked for natural-language H-Net were too strong for DNA next-nucleotide prediction. dnaHNet uses smaller coefficients around `0.01` to `0.02` in successful settings.

## Scaling Results

The paper trains more than `100` models across:

- dnaHNet variants,
- StripedHyena2,
- decoder-only Transformers.

Model sizes range from `10M` to `1B` parameters, and compute budgets range from `4e18` to `8e19` FLOPs.

The compute story is straightforward. dnaHNet spends compute in the encoder, main network, and decoder:

$$
\text{FLOPs}_{total} =
\text{FLOPs}_{enc}(L) +
\text{FLOPs}_{main}(L/R) +
\text{FLOPs}_{dec}(L)
$$

The encoder and decoder still touch the raw sequence length `L`. The main network, however, works on compressed length `L/R`. Since the main network contains the expensive global modeling part, this is where compression pays off.

The headline efficiency result is that, at `1,000,000` nucleotides, a `218M` dnaHNet uses `3.89x` fewer inference FLOPs than a `166M` StripedHyena2 baseline.

The perplexity scaling result also favors dnaHNet. The paper fits power laws of perplexity against compute and reports:

| Architecture | Scaling exponent |
| --- | ---: |
| dnaHNet | `0.06` |
| StripedHyena2 | `0.04` |
| Transformer | `0.01` |

The exact exponent should not be over-interpreted outside the experimental range, but the direction is clear: dnaHNet improves more quickly with compute in the reported setup.

The authors also note that dnaHNet's compute-optimal recipe is more data-heavy than standard scaling-law intuition would predict. At `8e19` FLOPs, dnaHNet prefers training on about `140B` tokens, while StripedHyena2 uses about `68B`. One plausible reason is that compression lets the main network extract more signal per raw nucleotide.

## Downstream Results

The downstream evaluations are zero-shot. The model is not fine-tuned for the target tasks. Instead, the authors use likelihood differences between reference and perturbed sequences.

### Protein Variant Effect Prediction

For protein variant effect prediction, the paper uses `12` nucleotide-level `E. coli` K-12 datasets from MaveDB, totaling `21,250` data points.

The logic is:

1. Take a wild-type coding sequence.
2. Introduce a mutation.
3. Score both sequences under the model.
4. Use the log-likelihood difference as a predicted fitness signal.
5. Compare with experimental fitness using Spearman correlation.

At the high end of the tested compute range, dnaHNet reaches Spearman correlation `0.3266`, while StripedHyena2 reaches `0.3110`. Transformers are much lower, around `0.1555`.

This is not a giant absolute correlation. But in zero-shot variant prediction, small differences can matter, and the scaling trend is the important part. dnaHNet gets better with more compute and pulls ahead of the long-sequence baseline.

### Gene Essentiality Prediction

For gene essentiality, the paper uses the Database of Essential Genes across `62` bacterial organisms and `185,226` examples.

For each gene, the authors:

1. extract an `8192` bp window centered on the gene,
2. create a knockout-like variant using a premature stop-codon sequence,
3. compare wild-type and knockout likelihoods,
4. predict whether the gene is essential.

The best dnaHNet hierarchy, `(3,2)`, reaches `0.6050` AUROC at the high end of the tested compute range. StripedHyena2 reaches `0.5759`.

Again, the absolute number is not enough to say gene essentiality is solved. A `0.60` AUROC is useful evidence of signal, not a deployment-grade biological predictor. The paper's stronger claim is that the hierarchy improves the scaling and compute-performance tradeoff.

## The Interpretability Result

This is the section to remember.

The authors inspect learned boundary selection on the `B. subtilis` genome. They run a trained two-stage `(3,2)` model on five random `49,152` bp windows and compare boundary rates across functional regions and codon positions.

Stage 1 looks locally codon-aware. Inside coding regions:

| Codon position | Stage 1 selection rate |
| --- | ---: |
| Position 1 | `6.5%` |
| Position 2 | `42.6%` |
| Position 3 | `58.4%` |

That is strong evidence that the model has learned a triplet rhythm. It is not just selecting uniformly across coding sequence.

Stage 2 looks more function-aware:

| Region | Stage 2 selection rate |
| --- | ---: |
| Promoter | `71.5%` |
| Start codon | `81.3%` |
| Coding region | `48.4%` |
| Intergenic | `74.6%` |

This suggests a hierarchy:

- the lower level learns local coding syntax,
- the upper level sees broader functional organization.

That is exactly the kind of result one would hope for from learned tokenization. The model is not merely compressing for speed. Its compression boundaries carry biological information.

## What Should We Be Careful About?

The first caveat is scope. The model is trained on prokaryotic genomes. Prokaryotes are biologically rich, but they do not have the same regulatory structure as eukaryotes. Eukaryotic genomes include introns, enhancers, chromatin effects, and much more long-range regulation. The paper does not prove that the same chunking hierarchy will transfer cleanly there.

The second caveat is task mode. The downstream results are zero-shot. That is useful because it tests pretrained likelihoods directly, but it leaves fine-tuning behavior open.

The third caveat is scale. The scaling analysis is broad, but only up to `1B` parameters. The trend is encouraging; it is not a theorem about future trillion-parameter biological models.

The fourth caveat is that the compression targets are chosen by the authors. `3` and `2` are biologically motivated and empirically useful here, but different organisms or sequence regimes may want different targets.

The fifth caveat is that the absolute downstream metrics are still modest. The gene-essentiality AUROC around `0.60` should be read as "there is useful signal and the architecture helps," not "the model can reliably identify essential genes."

## The Takeaway

dnaHNet is a clean example of architecture design meeting biological structure. The model's premise is that DNA should not be squeezed through a fixed tokenizer or modeled only as a costly raw nucleotide stream. Instead, the model can learn a hierarchy of chunks that is both computationally useful and biologically interpretable.

The most important idea is:

**Tokenization is not neutral. In genomics, it decides what units the model is allowed to see. dnaHNet makes that decision learnable.**

For future genomic foundation models, that is a compelling direction. A useful model should not only predict sequences well; it should learn internal units that reflect the organization of the biological system.

## Memory Checklist

- DNA has no natural whitespace, so tokenization is a core modeling problem.
- Fixed k-mers and BPE are efficient but can cut across biological units.
- Nucleotide-level models preserve raw sequence but are expensive for long context.
- dnaHNet learns chunk boundaries inside the model rather than using a fixed tokenizer.
- The architecture is encoder -> compressed main network -> decoder.
- The best reported hierarchy uses target compression `(3,2)`, motivated by codons and codon pairs.
- The model is pretrained on `144B` prokaryotic nucleotides from GTDB-derived data.
- Scaling results favor dnaHNet over StripedHyena2 and Transformers in the tested range.
- Zero-shot downstream tasks are protein variant effects and gene essentiality.
- Stage 1 learns codon-like periodicity; Stage 2 becomes more sensitive to broader functional regions.
- Main limitations: prokaryotic-only pretraining, zero-shot-only evaluation, fixed compression targets, and scale only up to `1B` parameters.
