# ML System Design Live Chat Quiz

Date: `2026-04-07`  
Topic Path: `topics/interviews/ml-system-design`  
Mode: `guided-practice`  
Learner Intent: `practice`  
Question Style: `conceptual`  
Difficulty: `medium`  
Pacing: `one-at-a-time`  
Hints: `hints-first`

## Scope

- Interactive quiz on the ingested ML system design material in [materials/processed/interviews/system_design.md](../../../../materials/processed/interviews/system_design.md)
- Focus areas: problem framing, candidate mining, sampling, annotation quality, taxonomy evolution, and evaluation
- Transcript below mirrors the live session content

## Session Controls

- Answer one question at a time
- Ask for `hint` if you want a nudge
- Ask for `harder` or `easier` to adjust difficulty
- Ask for `skip` to move on
- Ask for `score me` any time for a blunt evaluation of your answer

## Transcript

---
### Turn 1

**User asked:**

> can you make an interactive live chat markdown quiz with teh content?

**Assistant response:**

Yes. I created a live markdown quiz at [topics/interviews/ml-system-design/live-chats/2026-04-07-live-chat-quiz.md](2026-04-07-live-chat-quiz.md), and I’m using the ingested content from [materials/processed/interviews/system_design.md](../../../../materials/processed/interviews/system_design.md).

We’ll do this one question at a time and keep the transcript in this file as we go.

Question 1:

You are asked to design a system to discover valuable new examples from a huge unlabeled corpus for an existing classifier. What are the first 4 stages of your design, in order, and why does that order matter?

Keep it to 5-8 sentences. If you want, I can grade tightly for interview quality instead of just correctness.

---
### Turn 2

**User asked:**

> 1. inspect data, 2. mine/source data, 3. train/retrain by iterating over the flywheel, 4. evaluate?

**Assistant response:**

This is directionally right, but too compressed for a strong interview answer.

Score: `6/10`

What you got right:

- You preserved the broad lifecycle: understand data, mine candidates, iterate training, evaluate.

What is missing:

- You skipped explicit problem framing before inspection. In this topic, the first move is to define what "novel" means, relative to what baseline, and under what business or labeling constraints.
- "Mine/source data" is too broad. The interviewer will usually want candidate generation plus selection logic such as retrieval, clustering, uncertainty, diversity, or coverage.
- You skipped annotation and taxonomy handling, which is a major part of this material. In this setting, retraining should usually come after candidate selection and labeling decisions, not immediately after mining.

A stronger 4-stage version would be:

1. frame the problem and define novelty,
2. audit the unlabeled corpus and representation quality,
3. mine and prioritize candidates for labeling,
4. annotate, update taxonomy if needed, then retrain and evaluate in a controlled loop.

Why the order matters: if you skip framing, you mine the wrong things; if you skip corpus audit, you surface garbage and duplicates; if you skip annotation/schema design, you destroy true novelty; and if you retrain before controlled evaluation, you cannot tell whether the flywheel is actually helping.

Question 2:

Suppose your novelty detector surfaces many isolated outliers and a few dense low-coverage clusters. Which should you prioritize first, and why?

Answer in 3-5 sentences.

---
### Turn 3

**User asked:**

> prolly the few dense low-coverage clusters first, because that's where you'll get most bang for ur buck? also, can we vary the question styles (i like short answer, but also include some other forms plz)

**Assistant response:**

Yes. I’ll vary the session going forward: mostly short-answer, but I’ll mix in MCQ, scenario critique, ranking, and occasional rapid-fire prompts.

On your answer:

Score: `8/10`

What is correct:

- Prioritizing dense low-coverage clusters is the right call.
- The core reason is exactly what you were pointing at: higher expected labeling value per unit effort.

What would make it stronger:

- Say explicitly that isolated outliers are often noise, junk, or one-off anomalies.
- Say that dense clusters are more likely to represent a real semantic region, subclass, or systematic coverage gap.
- Tie the choice to downstream payoff: better coverage, less redundant labeling, and more stable taxonomy decisions.

Stronger interview version:

"I would prioritize dense low-coverage clusters before isolated outliers. Dense clusters are more likely to indicate a real uncovered semantic region or subclass, while isolated outliers are often noise, artifacts, or low-value anomalies. Labeling a representative subset from a dense cluster usually gives better coverage and higher downstream return on annotation budget. I would still sample a small number of outliers for monitoring, but they would not be my first labeling target."

Question 3 (`MCQ`):

Which option best explains the difference between `uncertainty sampling` and `diversity sampling`?

A. Uncertainty sampling finds rare classes, while diversity sampling improves label quality.
B. Uncertainty sampling prefers examples the model is unsure about, while diversity sampling reduces redundant selections.
C. Uncertainty sampling is for clustering, while diversity sampling is for retrieval.
D. Uncertainty sampling always improves robustness, while diversity sampling mainly improves AUROC.

---
### Turn 4

**User asked:**

> B i believe

**Assistant response:**

Correct. `B` is the best answer.

Score: `1/1`

Why:

- Uncertainty sampling targets examples where the current model is least confident or most conflicted.
- Diversity sampling is there to avoid spending annotation budget on many near-duplicates of the same uncertain point.

Interview-quality extension:

Uncertainty alone can overfocus the pipeline on ambiguous junk. Diversity or coverage constraints are often added so the selected batch is informative without becoming redundant or noisy.

Question 4 (`ranking`):

Rank these from earliest to latest in a reasonable labeling flywheel:

- `retrain model`
- `define novelty and success metrics`
- `annotate selected candidates`
- `mine and prioritize candidates`

Reply with the ordered list only.

---
### Turn 5

**User asked:**

> 2, 4,3,1

**Assistant response:**

Correct.

Score: `1/1`

Resolved order:

1. `define novelty and success metrics`
2. `mine and prioritize candidates`
3. `annotate selected candidates`
4. `retrain model`

That ordering matters because you need a target definition before mining, and you need trustworthy labels before retraining.

Question 5 (`scenario critique`):

A teammate says: "We already have a classifier, so the fastest path is to run uncertainty sampling on the unlabeled pool, label the top uncertain points, and retrain every day. We can worry about taxonomy changes later."

What is the biggest flaw in that plan?

Answer in 2-4 sentences.

---
### Turn 6

**User asked:**

> before i answer, what is a taxonomy change

**Assistant response:**

A taxonomy change means changing the label schema itself, not just collecting more examples for the existing labels.

Examples:

- adding a new class because surfaced data does not fit any current label,
- splitting one class into two more meaningful subclasses,
- merging two classes that annotators cannot reliably distinguish,
- moving from a flat label set to a hierarchical one,
- adding an `open-set` or `other-but-review` path instead of forcing every example into the old classes.

Why it matters here:

If your mined examples reveal genuinely new behavior, forcing annotators to squeeze them into the current taxonomy can destroy the signal you were trying to discover. In this topic, that is one of the main failure modes of a naive active-learning loop.

You can answer Question 5 now.

---
### Turn 7

**User asked:**

> yea i guess if hte underlying taxonomy / categorization is changing, no active learning can help because you're not even sure what you're uncertain about? so you're trying to approximate a moving target?

**Assistant response:**

This is mostly right.

Score: `8/10`

What is strong:

- You identified the core issue that the target label space may be unstable.
- You correctly noticed that uncertainty estimates are much less meaningful when the schema itself is incomplete or shifting.

What to sharpen:

- I would not say "no active learning can help." Active learning can still help, but it becomes unsafe if you use it without taxonomy review, abstain options, or cluster inspection.
- The sharper critique is: uncertainty sampling alone can repeatedly surface examples that do not fit the current labels, and forcing them into the old taxonomy corrupts labels and hides genuine novelty.

Stronger interview version:

"The biggest flaw is that uncertainty sampling assumes the current label space is already the right one. If the unlabeled pool contains genuinely new subclasses or open-set cases, the model may be uncertain for the wrong reason, and annotators may be forced to map novel data into incorrect existing labels. That can poison the retraining loop. I would add taxonomy review, abstain handling, and some diversity or cluster-based analysis before retraining aggressively."

Question 6 (`short answer`):

Give one pipeline metric and one downstream metric you would track in this system, and explain what each tells you.

Answer in 2-4 sentences.

---
### Turn 8

**User asked:**

> not sure, plz give some examples

**Assistant response:**

Here are clean examples:

- Pipeline metric: `annotation acceptance rate`. This tells you how often surfaced candidates are actually useful enough to keep after review. If acceptance rate is low, your mining stage is probably surfacing too much junk, duplication, or off-target data.
- Downstream metric: `rare-class F1` or `slice-based F1`. This tells you whether the newly labeled data is improving the model where it actually matters, especially on undercovered or hard cases rather than only on the overall average.

Two more good pairs:

- Pipeline metric: `coverage increase` for previously weak regions of the embedding space or taxonomy.
- Downstream metric: `calibration error` under distribution shift.

The main distinction is:

- pipeline metrics judge the quality of what the flywheel is surfacing,
- downstream metrics judge whether adding that data actually improves model behavior.

Question 7 (`rapid-fire`):

Which is the better pipeline metric for measuring mined-data quality: `overall accuracy` or `annotation acceptance rate`?

Reply with just the metric name.

---
### Turn 9

**User asked:**

> wait going back to the prev question, what is rere-class F1 or slice-based F1?

**Assistant response:**

`Rare-class F1` means the F1 score measured on a class that is uncommon but important. It combines precision and recall, so it tells you whether the model is both finding those rare examples and avoiding too many false alarms on them.

`Slice-based F1` means computing F1 on a specific subset of the data rather than on the whole dataset. A slice could be:

- one source domain,
- one language,
- one time period,
- one safety-critical group,
- one OOD bucket,
- one rare failure mode.

Why this matters:

overall metrics can look fine even when the model is still failing badly on the exact cases your mining loop was supposed to improve. Slice-based metrics let you check whether the new data helped in the targeted region instead of only improving the average.

You can go back to Question 7 now.

---
### Turn 10

**User asked:**

> i think annotation acceptance rate? even if accuracy is going down, that could mean you're surfacing new data that you need to improve on

**Assistant response:**

Correct: `annotation acceptance rate`.

Score: `1/1`

Your reasoning is also good. `Overall accuracy` is a downstream model metric, so it is not the right measure of whether the mining stage is surfacing useful candidates. A drop in accuracy could even happen while the flywheel is surfacing valuable new edge cases; that is exactly why we separate pipeline metrics from downstream metrics.

Question 8 (`multi-select`):

Pick the two best additions to `uncertainty sampling` if you want a more robust batch-selection strategy:

A. diversity constraints  
B. coverage over weak slices or regions  
C. more frequent retraining alone  
D. forcing every example into an existing class

Reply with the two letters only.

---
### Turn 11

**User asked:**

> A, B?

**Assistant response:**

Correct: `A` and `B`.

Score: `2/2`

Why:

- `A. diversity constraints` helps avoid wasting budget on redundant uncertain points.
- `B. coverage over weak slices or regions` pushes the batch toward underrepresented but important parts of the space.

Why the others are wrong:

- `C` changes training cadence, not selection quality.
- `D` is actively dangerous because it can erase true novelty by forcing open-set cases into the old taxonomy.

Question 9 (`fill in the blank`):

Complete the sentence with the best phrase:

"A major reason to inspect the unlabeled corpus before mining is to avoid confusing real novelty with ________."

Keep it to 2-5 words.

---
### Turn 12

**User asked:**

> not sure

**Assistant response:**

A strong fill-in is:

`noise or duplicates`

Also acceptable:

- `garbage or duplicates`
- `source bias`
- `artifacts and duplication`

Core idea:

before mining, you want to check whether apparently unusual examples are actually valuable new cases, or just low-quality data, repeated items, source imbalance, or other artifacts.

Question 10 (`true/false`):

`True or False:` If overall accuracy improves, that is usually enough evidence that the mining-and-labeling loop is working well.

---
### Turn 13

**User asked:**

> false.... you could just be souring a single class and just predict over-confidently... the goal is to to measure both pipeline metrics and downstream metrics

**Assistant response:**

Correct: `False`.

Score: `1/1`

This is a strong answer. The key point is exactly that overall accuracy can hide bad behavior. You want both:

- `pipeline metrics` to measure whether the system is surfacing good candidates, and
- `downstream metrics` to measure whether those candidates actually improve model behavior on the right slices.

Small wording fix: I think you meant "overfitting to" or "overserving" a single class, not "souring," but your underlying reasoning was clear.

Checkpoint:

- Strong on: candidate selection tradeoffs, dense clusters vs outliers, uncertainty vs diversity, and the pipeline-vs-downstream metric split.
- Current weak spot: naming concrete metric examples quickly and articulating taxonomy-evolution risks in polished interview wording.

Question 11 (`short answer`):

In one sentence: why is an `abstain` or `none-of-the-above` option useful for annotators in this setting?

---
### Turn 14

**User asked:**

> some classes might be low-quality or hard to really judge, so you don't wanna include in training set

**Assistant response:**

Mostly right.

Score: `7/10`

What is good:

- You recognized that some examples should not be forced into the training set with a confident label.
- You also recognized ambiguity as a real issue.

What to sharpen:

- The main reason in this topic is not just "low-quality" data.
- The stronger reason is that some surfaced examples may not fit the current taxonomy at all, and forcing them into an existing class would create incorrect labels and erase novelty.

Stronger one-sentence version:

"An abstain or none-of-the-above option lets annotators avoid forcing ambiguous or genuinely novel examples into the wrong existing class, which protects label quality and preserves signals that may require taxonomy updates."

Question 12 (`MCQ`):

Which choice best describes a `pipeline metric` rather than a `downstream metric`?

A. AUROC on the held-out test set  
B. Calibration error after retraining  
C. Precision of surfaced candidates before labeling  
D. Rare-class F1 on safety-critical slices

---
### Turn 15

**User asked:**

> actualy before this question, can you explain what all these metrics are?

**Assistant response:**

Yes. Quick definitions:

- `Pipeline metric`: measures the quality of the discovery and labeling pipeline itself, before asking whether the final model improved.
- `Downstream metric`: measures how good the trained model is after you use the new data.

For the answer choices:

- `AUROC` = Area Under the ROC Curve. It measures how well the model ranks positives above negatives across threshold choices. Higher is better. This is a downstream model metric.
- `Calibration error` = whether predicted probabilities match reality. For example, among examples where the model says "80% confident," does it actually end up right about 80% of the time? This is also a downstream model metric.
- `Precision of surfaced candidates` = among the examples your mining system surfaced as promising, how many were actually relevant/useful once reviewed? This is a pipeline metric because it evaluates candidate quality before final model performance.
- `Rare-class F1` = F1 score computed on an uncommon but important class.
- `Safety-critical slice F1` = F1 computed on a special subset of the data, such as harmful content, medical-risk cases, or another high-stakes subset. These are downstream metrics because they measure final model behavior on targeted slices.

Useful intuition:

- `precision of surfaced candidates` asks, "Is the flywheel finding good stuff?"
- `AUROC`, `calibration`, and `slice F1` ask, "Did the model actually get better after using that data?"

You can answer Question 12 now.

---
### Turn 16

**User asked:**

> can you include plots where you ask me pictures about auroc, aupcr, aupr, metrics by geneating matplotlib plots? don't push the plots to github tho

**Assistant response:**

Yes. I’ll generate metric plots locally with `matplotlib` and keep them outside the repo so they stay untracked.

Current local plot:

- `local-assets/quiz-plots/metrics-quiz-01.png`

This one compares ROC and Precision-Recall curves for `Model A` and `Model B` under a `10%` base rate.

![[local-assets/quiz-plots/metrics-quiz-01.png]]

Plot question:

Looking at `local-assets/quiz-plots/metrics-quiz-01.png`, which model appears better on `AUROC`, and which appears better on `AUPRC` / `AUPR`?

Reply in the form:

`AUROC: ... , AUPRC: ...`
