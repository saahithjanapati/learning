# Efficient Dataset Selection for Continual Adaptation of Generative Recommenders

Source: `https://arxiv.org/abs/2604.07739v1`
PDF: `https://arxiv.org/pdf/2604.07739v1`
Local PDF reviewed: `/Users/saahithjanapati/Downloads/2604.07739v1.pdf`
Site: `arXiv`
Published: `2026-04-09`
Venue note: `ICLR 2026 CAO Workshop (Oral)`
Authors: `Cathy Jiao, Juan Elenter, Praveen Ravichandran, Bernd Huber, Joseph Cauteruccio, Todd Wasson, Timothy Heath, Chenyan Xiong, Mounia Lalmas, Paul Bennett`
Subjects: `Information Retrieval (cs.IR); Machine Learning (cs.LG)`
Extraction engine: `PyMuPDF full-text extraction + arXiv metadata lookup + manual structured normalization`
Strategy: `canonical PDF extraction and medium/full AI paper lesson normalization`

## Medium-Length Version

This paper studies how to keep a large-scale sequential recommender fresh when user behavior drifts over time but full retraining on all new streaming data is too expensive.

The setting is a generative recommender trained on longitudinal music and podcast interaction histories. User histories are sequences of item/action pairs, where actions include fields such as playback-end reason and interaction type. The model is HSTU, a sequential generative recommender architecture designed for non-stationary streaming recommendation. The practical problem is that new user sequences and items arrive continuously, and old interaction data becomes less predictive as user preferences, seasons, contexts, and catalogs change.

The authors frame update-time data curation as a three-stage pipeline. First, represent each user history. They compare token-based BM25 features, model-based hidden-state features (`RepSim`), and gradient-based features (`GradSim`). Second, score each candidate training sequence by similarity to a small recent reference set sampled from the most recent month. Third, sample a compact update set using strategies such as top/bottom ranking, weighted sampling, cluster-weighted sampling, and a diversity-penalized weighted method.

The main result is that representation-aware selection recovers much more drift-induced performance loss than random subsampling. In the paper's summary table for NDCG@50 error recovery, random 20% selection recovers 38% of the one-year gap and 42% of the three-year gap. RepSim TopBottomK recovers 55% and 61%. GradSim with Diverse-Weighted sampling recovers 72% and 78%. The trade-off is cost: gradient representations require forward and backward passes, while model representations can be cheaper, especially if hidden states are logged.

The important systems lesson is that "more recent data" is not enough. Efficient continual adaptation needs data that both matches the current distribution and preserves diversity. The paper's best method works because it uses gradient-informed representations to estimate which histories matter for adaptation, then avoids selecting a redundant pile of near-duplicates.

## Full-Length Version

## Problem Setting

Recommendation systems are deployed into non-stationary environments. In music and podcast products, a user's next interaction may change because of seasonality, commuting patterns, life changes, catalog additions, new releases, and long-term preference evolution.

A sequential generative recommender maps a history of interactions to a distribution over likely next interactions. If the model is trained once and left alone, performance decays as the user and item distribution drifts. Updating helps, but full retraining on every new interaction is expensive in a streaming product where data keeps growing.

The paper asks:

**Can we select a compact subset of new interaction data that preserves most of the benefit of continual retraining?**

## Data And Model

The experiments use a proprietary longitudinal music and podcast streaming dataset spanning 2015-2025. It contains on the order of 10K users and 10M items.

Each user history is an ordered sequence of interactions. An interaction is represented as:

$$
(o_t, a_t),
$$

where `o_t` is an item id and `a_t` contains categorical action fields. The paper uses two action fields:

- `reason_end`: why playback ended, such as skip, pause, or exit,
- `interaction_type`: context of the stream, such as user playlist or catalog search.

The model is HSTU, a sequential recommender from Meta. HSTU predicts the next item and action autoregressively. Its block uses projection, spatial aggregation, and pointwise transformation:

$$
U,V,Q,K = Split(\phi_1(f_1(E))),
$$

$$
Attention(Q,K,V) = AV = \phi_2(QK^T + r_{abp,t})V,
$$

$$
\hat{S} = f_2(Norm(AV) \odot U).
$$

The paper emphasizes HSTU because it is designed for streaming, non-stationary recommendation. It includes temporal relative biases and uses SiLU-style attention behavior rather than standard softmax attention.

## The Data Selection Pipeline

The goal is to select:

$$
D_{select} \subset D_{train}
$$

with:

$$
|D_{select}| \ll |D_{train}|.
$$

The pipeline has three stages.

## Stage 1: Represent Each User History

The paper compares three representation families.

### Token-Based Representation

Each interaction becomes a bag of discrete tokens:

- item token,
- `reason_end` token,
- `interaction_type` token.

Similarity is computed with BM25. This is cheap and model-agnostic, but the paper finds it is a weak proxy for update usefulness.

### Model-Based Representation: RepSim

The user sequence is passed through HSTU. The final-layer hidden states are mean-pooled to create a fixed-dimensional vector:

$$
rep(x) = mean(h_1, \ldots, h_r).
$$

RepSim is attractive in deployment because it only needs forward passes and can be almost free if representations are already logged during training or inference.

### Gradient-Based Representation: GradSim

GradSim represents each history by the gradient of the loss for predicting the final item from the preceding history:

$$
rep(x_i) = \nabla_\theta L(o_{ir} \mid (o_{i1}, a_{i1}), \ldots, (o_{i,r-1}, a_{i,r-1})).
$$

The paper extracts gradients with respect to the final attention layer and mean-pools them. This is more expensive because it requires backward passes, but it better captures how the example would change the model.

## Stage 2: Score Against A Recent Reference Set

The paper samples a small reference set from the most recent month of data. This reference set represents the target behavior the model should adapt toward.

Each candidate training example receives an average similarity score:

$$
s(x) =
\frac{1}{|D_{ref}|}
\sum_{x' \in D_{ref}}
sim(rep(x), rep(x')).
$$

BM25 is used for token representations. Cosine similarity is used for model-based and gradient-based representations.

An important empirical finding is that increasing the reference set from 100 to 1000 examples does not meaningfully change downstream performance. That suggests the distribution-matching signal can be cheap.

## Stage 3: Sample A Compact Update Set

The paper studies several sampling strategies:

- `Top-K / Bottom-K`: choose highest-scoring examples, lowest-scoring examples, or a mixture.
- `Weighted`: sample examples with probability proportional to score.
- `KNN-Weighted`: cluster representations and sample from each cluster with score-weighted probabilities.
- `Diverse-Weighted`: iteratively sample a batch, then penalize remaining examples that are too similar to what was already selected:

$$
s(x) \leftarrow s(x) -
\frac{1}{|B_t|}
\sum_{x' \in B_t}
sim(rep(x), rep(x')).
$$

The intuition is that distribution matching alone can select redundant examples. Diversity-aware sampling preserves coverage of different user contexts.

## Experimental Protocol

The initial model is trained on data from 2015 up to January 1, 2022. User histories are partitioned into contiguous chunks of 100 item/action events, with a user identifier token prepended.

Continual adaptation then proceeds in six-month intervals. For each interval:

1. Collect newly observed user-history chunks.
2. Sample 100 reference histories from the most recent month.
3. Score and select a subset of new data, such as 20% or 50%.
4. Continue training from the previous checkpoint for 50 epochs.
5. Evaluate on the subsequent six-month interval using NDCG@10, NDCG@50, HR@10, and HR@50.

The six-month interval is chosen because drift effects are clearer at that timescale than at monthly update intervals.

## Main Results

The drift result is clear: without updates, performance degrades as evaluation moves farther into the future. In the appendix table normalized to initial evaluation, NDCG@50 falls from 1.000 initially to 0.921 after one month, 0.882 after one year, and 0.689 after three years.

The selection result is that representation-aware selection beats random subsampling at the same update budget. For drift-induced NDCG@50 error recovery:

| Method | +1 yr | +3 yrs |
| --- | ---: | ---: |
| No retrain | 0% | 0% |
| Random 20% | 38% | 42% |
| RepSim TopBottomK | 55% | 61% |
| GradSim Diverse-Weighted | 72% | 78% |

The paper also reports that BM25 is weak, especially at smaller budgets. At short horizons, RepSim beats random sampling at 10-20% budgets, while BM25 degrades sharply. At longer horizons, random sampling becomes stronger because broader coverage matters, but RepSim remains competitive and BM25 is still weakest.

## Why GradSim Helps

RepSim asks whether two histories look similar in representation space. GradSim asks whether two histories induce similar model-update directions.

That difference matters in continual adaptation. The target is not only to describe recent behavior; it is to choose examples that update the model in useful ways. Gradient features are closer to the training objective and therefore identify more adaptation-relevant sequences.

The cost is computational. The appendix summarizes relative selection FLOPs:

| Method | Relative FLOPs | Dominant cost |
| --- | ---: | --- |
| Random | 0 | none |
| RepSim | about 1 | forward passes |
| GradSim | about 3 | forward plus backward passes |

So the practical trade-off is not whether GradSim is better; it is whether the improvement is worth backward-pass selection cost. The authors suggest future work on cheaper signals and better pairings of model-based embeddings with diversity-aware sampling.

## Why Top And Bottom Both Matter

One notable result is that selecting a mix of high-scoring and low-scoring examples can beat selecting only the top examples.

High-scoring examples match the recent reference distribution. Low-scoring examples preserve coverage of rare or drifting contexts that may still matter. If the selector only chases the most recent cluster, it risks narrowing the update data too much.

This is a useful lesson for data curation: target-distribution matching and coverage are in tension. The best update subset should be recent enough to adapt but diverse enough to avoid forgetting or overfitting to a thin slice of recent behavior.

## Limitations And Caveats

- The dataset is proprietary, so the exact corpus and deployment setting are not reproducible from public data.
- The study focuses primarily on HSTU; other sequential recommenders may have different representation behavior.
- GradSim is expensive, and the paper does not solve the production cost problem completely.
- The approach assumes a recent reference set is a good proxy for the target distribution.
- The evaluation is next-item prediction, not all business or user-experience outcomes a recommender platform may care about.
- The paper studies update-time selection, not broader online learning policies such as when to retrain, when to refresh item vocabularies, or how to handle new-user cold start.

## Practical Takeaway

For continually adapting recommender systems, random recent subsampling is a decent baseline, but it leaves performance on the table. A better update set should:

- be similar to the current target distribution,
- contain examples that matter for the model's gradients,
- preserve diversity across user contexts,
- be cheap enough to run repeatedly.

The paper's best recipe is GradSim plus diversity-aware weighted sampling. The production-friendly lesson is broader: log useful model representations, keep a small recent reference slice, score candidate update examples against that slice, and avoid selecting a redundant update set.

## Study Questions

- Why does recommender performance degrade in this setting even if the model was initially strong?
- What is the difference between RepSim and GradSim?
- Why is the reference set sampled from the most recent month?
- Why can selecting both high-scoring and low-scoring examples beat only selecting Top-K?
- What does the 72%/78% NDCG@50 error-recovery result mean?
- When would the extra cost of GradSim be justified in production?
