# Efficient Dataset Selection for Continual Adaptation of Generative Recommenders

Source note: Cathy Jiao, Juan Elenter, Praveen Ravichandran, Bernd Huber, Joseph Cauteruccio, Todd Wasson, Timothy Heath, Chenyan Xiong, Mounia Lalmas, and Paul Bennett, "Efficient Dataset Selection for Continual Adaptation of Generative Recommenders." arXiv:2604.07739v1, published April 9, 2026; ICLR 2026 CAO Workshop oral. Source page: [arxiv.org/abs/2604.07739v1](https://arxiv.org/abs/2604.07739v1). Processed source: [materials/processed/ai/efficient-dataset-selection-for-continual-adaptation-generative-recommenders.md](../../../materials/processed/ai/efficient-dataset-selection-for-continual-adaptation-generative-recommenders.md).

Original sources: [arXiv abstract](https://arxiv.org/abs/2604.07739v1), [arXiv PDF](https://arxiv.org/pdf/2604.07739v1).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem](#the-problem)
- [The Selection Pipeline](#the-selection-pipeline)
- [The Key Result](#the-key-result)
- [The Systems Trade-Off](#the-systems-trade-off)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

This paper is about a very practical production problem: user behavior changes, but retraining a recommender on all new streaming data is too expensive.

The authors study sequential generative recommendation for music and podcasts. The model sees a user's history as a sequence of item/action pairs and predicts likely next interactions. Over time, the distribution shifts because users change habits, contexts change, seasons change, and new items enter the catalog. A model trained once gradually becomes stale.

The proposed answer is not full retraining. It is better data selection for continual adaptation. For each update window, the system selects a compact subset of new user histories. It does this by representing each history, scoring it against a small recent reference set, and sampling an update subset that matches recent behavior while preserving diversity.

The best representation is gradient-based (`GradSim`): represent an example by the gradient it induces for the model. That is expensive but strong because it captures how the example would actually update the recommender. A cheaper alternative is `RepSim`, which uses pooled hidden states from HSTU. BM25 token similarity is much weaker.

The headline table is easy to remember. At a 20% update budget, random selection recovers 38% of the one-year NDCG@50 error and 42% of the three-year error. RepSim recovers 55% and 61%. GradSim plus diversity-aware sampling recovers 72% and 78%.

The practical lesson is that continual-learning data should be current, model-relevant, and diverse. Recent random samples help, but model-aware curation recovers much more of the value of full retraining.

## Full-Length Version

## The Problem

A recommender is always chasing a moving target.

For music and podcast recommendations, behavior is not stationary. Someone's listening history changes with commute patterns, school schedules, exercise habits, travel, holidays, new artists, podcast seasons, and taste evolution. Meanwhile, the catalog itself keeps changing.

This creates two pressures:

- If the model is not updated, performance decays under temporal drift.
- If the model is updated with all new data, compute and storage costs grow too quickly.

So the actual engineering problem is:

**Which small slice of new data should we train on so the model adapts almost as well as if we used everything?**

## The Selection Pipeline

The paper uses a simple but powerful three-step data-selection pipeline.

First, turn every candidate user history into a vector.

The paper compares:

- BM25 over item/action tokens,
- `RepSim`, a mean-pooled HSTU hidden-state representation,
- `GradSim`, a gradient representation from the loss on the final item.

Second, score every candidate history against a small recent reference set. The reference set is sampled from the most recent month, because that is the target behavior the model should move toward.

The score is average similarity to the reference examples:

$$
s(x) =
\frac{1}{|D_{ref}|}
\sum_{x' \in D_{ref}}
sim(rep(x), rep(x')).
$$

Third, sample the update set. The paper tries hard top-k selection, weighted sampling, cluster-aware weighted sampling, and a diverse weighted method that penalizes examples similar to ones already selected.

The diversity piece matters because pure similarity can pick many redundant histories. A useful update set should track the current distribution but still cover varied user contexts.

## The Key Result

The drift baseline is severe. In appendix results normalized to the initial evaluation, NDCG@50 drops to 0.882 after one year and 0.689 after three years without adequate adaptation.

Data selection helps. The main summary table reports the fraction of drift-induced NDCG@50 error recovered:

| Method | +1 yr | +3 yrs |
| --- | ---: | ---: |
| No retrain | 0% | 0% |
| Random 20% | 38% | 42% |
| RepSim TopBottomK | 55% | 61% |
| GradSim Diverse-Weighted | 72% | 78% |

This says random recent data is useful, but it is not enough. Model-aware examples recover a much larger fraction of the gap to full retraining.

## The Systems Trade-Off

`GradSim` is strongest because gradients describe how an example wants to change the model. That is more directly tied to adaptation than "does this history look similar in embedding space?"

But `GradSim` costs more. It needs forward and backward passes. `RepSim` only needs forward passes and can be cheap if hidden states are already logged. Random sampling has no selection compute.

So the deployment question is not just accuracy. It is:

- How often do we update?
- How much performance loss is unacceptable?
- Can we afford backward-pass scoring?
- Are hidden-state representations already available?
- Is a cheaper diversity-aware RepSim selector good enough?

The paper does not claim one universal answer. It gives a useful frontier: random is cheap but weaker, RepSim is a reasonable middle ground, and GradSim plus diversity is the strongest studied method.

## Memory Checklist

- Continual recommenders drift because user behavior and item catalogs change.
- Full retraining on all new data is often impractical.
- Selection has three stages: represent, score against recent reference data, sample.
- `RepSim` uses model hidden states; `GradSim` uses loss gradients.
- Gradient-based selection is better but more expensive.
- Diversity-aware sampling prevents selecting a redundant pile of similar recent histories.
- The best reported method recovers 72% of one-year and 78% of three-year NDCG@50 drift-induced error.
