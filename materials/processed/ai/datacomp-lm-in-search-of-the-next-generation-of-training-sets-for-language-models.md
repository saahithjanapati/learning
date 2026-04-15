# DataComp-LM: In search of the next generation of training sets for language models

Source: `https://arxiv.org/abs/2406.11794`
Site: `arXiv`
Published: `2024-06-17`
Updated: `2025-04-21 (v4)`
Authors: `Jeffrey Li et al.`
Extraction engine: `arXiv HTML review + manual structured ingest`
Strategy: `canonical paper extraction and curriculum-oriented normalization`

## Summary

This paper introduces `DataComp for Language Models (DCLM)`, a benchmark for studying training-data curation in a controlled way. The main claim is that progress on language-model data quality has been hard to measure because papers usually change too many things at once: architecture, compute budget, hyperparameters, and dataset. DCLM tries to isolate the data variable.

The benchmark contributes three main pieces:

- a very large standardized pool of web text, `DCLM-Pool`, with about `240T` tokens extracted from Common Crawl,
- fixed pretraining recipes across several model and token scales,
- a broad evaluation suite of `53` downstream tasks.

The paper also provides a strong baseline dataset, `DCLM-baseline`, built from that pool. Their central empirical finding is that `model-based filtering` matters a lot: learned filters outperform simpler heuristics, and careful dataset design can buy large gains without changing the model architecture.

## What The Paper Is Really About

This is not mainly a new model architecture paper. It is a `benchmark-and-infrastructure paper` for data-centric language-model research.

The authors are trying to make this question measurable:

`If I claim my data curation pipeline is better, can we compare it under a fixed training setup and see whether it actually trains a better language model?`

That matters because many prior comparisons were confounded. A better final model could come from better data, but it could also come from better optimization, more tokens, or more compute.

## Core Setup

### 1. Large shared raw pool

`DCLM-Pool` is built from Common Crawl and contains roughly:

- `200B` documents
- `240T` tokens
- text re-extracted from HTML rather than relying only on existing crawl text dumps

This gives everyone the same starting universe of candidate training data for the filtering track.

### 2. Multiple benchmark scales

The benchmark spans five scales, from roughly `412M`-parameter models up to `6.9B`-parameter models, with corresponding token budgets. That lets researchers test ideas at smaller scales before paying for the largest runs.

One of the paper's useful findings is that `smaller runs often preserve ranking signal`: experiments around the `400M` scale can still help predict which data curation strategies will work better later at larger scales.

### 3. Two research tracks

- `filtering track`: choose the best subset from the common DCLM pool
- `mixing track`: combine outside sources with curated data mixtures

This separation is helpful because "better data" can mean either better selection from a fixed pool or better source composition across pools.

### 4. Fixed recipe, variable data

Participants change the dataset, but the training framework and scale-specific recipes stay standardized. That is the key design decision that turns DCLM into a meaningful benchmark instead of a loose leaderboard.

## Main Findings

### 1. Model-based filtering is the strongest baseline ingredient

The biggest empirical takeaway is that learned filtering beats many simpler alternatives. The paper runs a large ablation study over deduplication, rule-based filters, quality filters, and learned filters, then shows that the strongest gains come from `model-based scoring`.

The interesting detail is that the best filter in their study is not a huge judge model. A relatively simple `bigram classifier`, trained with carefully chosen positive and negative examples, performs extremely well. That is a strong reminder that task framing and labels can matter more than using the fanciest possible scoring model.

### 2. Human judgments are not enough

The paper reports that `human quality judgments have limited value` for identifying the best pretraining data. Intuitively, text that looks good to a human evaluator is not always the text that most improves downstream LM performance.

This is an important conceptual point:

`pretraining usefulness` is not the same thing as `human-perceived text quality`.

### 3. Deduplication matters, but it is not the whole story

They study scalable deduplication pipelines and show that dedup remains important, but the overall pipeline quality depends on more than removing duplicates. The strongest results come from combining sensible preprocessing, deduplication, and especially better filtering.

### 4. Better datasets shift the compute-performance frontier

Using `DCLM-baseline`, the authors train a `7B` model to around `64%` MMLU 5-shot with `2.6T` training tokens. The paper positions this as state-of-the-art for open-data models at the time and argues that it improves substantially over earlier open-data baselines while using less compute.

The important lesson is not just "their benchmark wins." It is:

`dataset quality can substitute for a surprising amount of brute-force training compute.`

## Why This Paper Matters

This paper pushes on a question that is easy to say but hard to test:

`How much of language-model quality comes from the data pipeline rather than from architecture scaling?`

Its answer is not that data is the only thing that matters. The answer is that data curation is sufficiently powerful, sufficiently under-measured, and sufficiently confounded in prior work that the field needed a controlled benchmark.

That makes DCLM important for at least three reasons:

- it gives researchers a common experimental substrate for testing data ideas,
- it makes data work more reproducible,
- it reframes data curation as a first-class optimization target rather than a preprocessing afterthought.

## Mental Model

A useful way to think about the paper is:

- `model architecture` tells you what function class you can learn,
- `compute budget` tells you how hard you can optimize,
- `dataset design` tells you what signal you spend that optimization on.

DCLM is an attempt to hold the first two relatively fixed so the third can be studied cleanly.

## Limitations

- The benchmark is still centered heavily on Common Crawl-style web text, so it does not settle how much the same conclusions transfer to broader multimodal or highly specialized corpora.
- The downstream evaluation suite is broad, but still only a proxy for all desirable LM behavior.
- Even with smaller benchmark scales, large-scale pretraining experiments remain expensive.
- A strong benchmark can shape the field around what it measures, so unmeasured aspects of data quality may still be missed.

## Bottom Line

The main contribution is not merely a better filtered dataset. It is a `controlled experimental framework` showing that training-data curation is a major lever for language-model performance.

If you remember one sentence from this paper, it should be:

`DataComp-LM turns training-data quality from a vague intuition into a benchmarked engineering variable.`
