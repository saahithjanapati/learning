# RePro: Faithful Web Recycling for Pretraining

Source note: Zichun Yu and Chenyan Xiong, "RePro: Training Language Models to Faithfully Recycle the Web for Pretraining," arXiv preprint, submitted October 12, 2025. Source: [arXiv:2510.10681](https://arxiv.org/abs/2510.10681).

## The Paper In One Sentence

RePro asks whether low- or medium-quality web text can be rewritten into useful pretraining data by a small, trainable rephraser, and the answer is: yes, if the rephraser is optimized for both higher data quality and strict faithfulness to the original text.

That second clause matters. The paper is not simply saying "use an LLM to clean the web." Many earlier synthetic-data and rephrasing approaches already try that. The paper's real claim is sharper:

> Web recycling works better when the generator is trained to improve text quality without changing the original document's meaning, structure, or length distribution too much.

In other words, the authors treat web data as a resource that should be refined, not replaced. Their metaphor is that high-quality pretraining data is like fossil fuel: valuable, finite, and increasingly hard to find. RePro is their attempt to get more usable energy out of the web corpus that already exists.

## What Question Are The Authors Trying To Answer?

The central research question is:

**Can we turn lower-quality web text into high-quality pretraining data, at scale, without relying on a huge proprietary teacher model and without corrupting the original information?**

That question contains several smaller questions.

First, there is a data-scarcity question. Modern language models are trained on enormous quantities of web text, but not all web text is useful. After filtering, deduplication, and quality selection, the truly useful subset can be much smaller than the raw crawl. If scaling continues to depend on "more high-quality tokens," the field eventually hits a data wall.

Second, there is a synthetic-data question. If we ask a powerful model to rewrite or generate training data, will the resulting text actually help pretraining? Or will it become too model-like, too generic, too compressed, too hallucinated, or too distributionally different from the original web?

Third, there is a practical cost question. A method that requires a 70B model to rewrite tens of billions of tokens may be technically interesting but expensive. The authors want something more controllable and cheaper.

RePro is their answer: train a 4B rephraser with reinforcement learning so that it learns a reusable rewriting policy. The policy is rewarded for making text look like better pretraining data, but also constrained to preserve semantic content, document structure, and approximate length.

## Why This Problem Matters

Pretraining data quality is one of the quiet foundations of language model progress. If two models have the same architecture and training compute, the one trained on better data often wins. This has made data curation a major performance lever.

But "better data" is not the same thing as "prettier text." A document can be polished and still be bad for pretraining. It might be repetitive, shallow, overly templated, factually distorted, or unlike the natural distribution the model needs to learn from. Conversely, messy web text can contain useful facts, styles, formats, and long-tail linguistic patterns.

That creates a tension:

- Filtering preserves only the best documents but throws away a lot of potentially useful material.
- Synthetic generation can create polished text but risks drifting away from the web distribution.
- Rephrasing can clean existing documents but risks summarizing, hallucinating, or homogenizing them.

RePro tries to sit in the middle. It keeps the web document as the anchor, but learns how to remove junk, clarify awkward writing, improve fluency, and preserve the original document's identity.

The educational way to think about this paper is:

**The object being optimized is not a model answer. It is a pretraining corpus.**

That changes what "good" means. A good recycled document is not necessarily the most elegant standalone article. It is a document that helps a future language model learn more effectively when mixed into billions of tokens.

## The Background: Organic, Synthetic, And Recycled Data

The paper uses a useful distinction between several kinds of data.

**Organic data** is text that already exists on the web. It is not generated for the model. It has natural diversity: articles, forums, documentation, markdown pages, comments, lists, ads, boilerplate, errors, and all the weird formats that come from real crawls.

**High-quality organic data** is the subset selected by a quality filter. In this paper, the main final-selection quality function is DCLM-fastText, a classifier from the DCLM data curation line of work.

**Recycled data** is produced by taking organic web text and rephrasing it. The input is still a web document; the output is a cleaned or rewritten version intended for pretraining.

**Synthetic data** is broader. It may be generated without a direct source document, or it may be distilled from a model's own knowledge. Synthetic data can be useful, but for pretraining it raises concerns about homogenization, teacher-model artifacts, and model collapse.

RePro is specifically a web recycling method. It does not ask the model to invent new knowledge. It asks the model to make existing web text more useful while staying faithful to the original.

## The Core Idea

RePro trains a rephraser with reinforcement learning. The rephraser starts from Qwen3-4B. For an organic document `x`, it produces a recycled document `x'`.

The key design is the reward function. RePro does not optimize only for a quality score, because that would invite reward hacking. A model might learn to sound academic, add unsupported facts, or convert everything into a polished essay because the quality scorer likes that style.

Instead, RePro combines one quality reward with three faithfulness rewards:

| Reward | What It Tries To Preserve Or Improve | Why It Matters |
| --- | --- | --- |
| DataMan quality | Improve the overall estimated pretraining-data quality | The recycled text should be better training material than the original |
| BERTScore semantic similarity | Preserve meaning | The output should not forget or contradict the original content |
| Structure preservation | Preserve document form | Markdown, lists, blog-like structure, and other formats should not collapse into one generic style |
| Length alignment | Avoid excessive compression or expansion | The rephraser should not turn documents into summaries or bloated essays |

This is the central engineering move of the paper. RePro treats quality as a goal, but faithfulness as the guardrail that keeps the system from winning the wrong game.

## The Data Recycling Setup

The paper formalizes a realistic data-limited setting. Suppose you have an organic web pool:

$$
\mathcal{D}_{org}
$$

You also have a quality function `Q`, and you select high-quality organic data above some threshold:

$$
\mathcal{D}_{org-hq} = \{x \in \mathcal{D}_{org}: Q(x) \ge \tau_{org}\}
$$

But the amount of high-quality organic data may be too small for your target training budget. So RePro generates recycled versions:

$$
x' = R(p, x)
$$

where `R` is the rephraser and `p` is the prompt. These recycled documents form a new pool:

$$
\mathcal{D}_{rec} = \{R(p, x): x \in \mathcal{D}_{org}\}
$$

Then the authors filter the recycled pool with the same broad idea of quality selection:

$$
\mathcal{D}_{rec-hq} = \{x' \in \mathcal{D}_{rec}: Q(x') \ge \tau_{rec}\}
$$

The final pretraining set is:

$$
\mathcal{D}_{final} = \mathcal{D}_{org-hq} \cup \mathcal{D}_{rec-hq}
$$

This setup is important because RePro is not claiming that all rewritten web data is good. It still filters after recycling. The method is really:

1. start with a large organic pool,
2. keep the best organic documents,
3. train a rephraser to improve lower-quality documents,
4. recycle the web pool,
5. select the best recycled documents,
6. train downstream language models on the combined set.

## The Rewards In More Detail

The reward function is the paper's most important technical object.

### DataMan: The Quality Reward

DataMan is used as the quality reward during RL. It evaluates pretraining data along criteria such as coherence, topic focus, and knowledge novelty, then provides an overall quality score.

RePro rewards improvement relative to the original document:

$$
r_{DataMan}(x, x') = DataMan(x') - DataMan(x)
$$

That relative form matters. The model is not merely rewarded for generating text that gets a high absolute score. It is rewarded for making the rewritten document better than the specific original input.

### BERTScore: The Semantic Faithfulness Reward

The semantic reward checks whether the recycled text remains close enough in meaning to the original. The authors use a thresholded BERTScore:

$$
r_{BERTScore}(x, x') = \mathbf{1}[BERTScore(x, x') \ge \tau_{BERTScore}]
$$

In the main setup, the threshold is `0.65`. The appendix explains that this value roughly corresponds to the majority semantic similarity level achieved by direct prompting, leaving room for the RL-trained rephraser to improve.

This reward is not a perfect factuality check, but it is a useful broad semantic tether. Without some semantic tether, a quality-optimized rephraser can drift into fluent but unfaithful text.

### Structure Preservation: The Format Reward

The structure reward asks whether the recycled document preserves the original document's format. A markdown list should not necessarily become a generic paragraph. A forum-like page should not automatically become a textbook-style explanation.

The authors implement this with a comparison model built by prompting Qwen3-4B with few-shot examples.

This is a subtle but valuable choice. Pretraining data is not just facts and sentences. It also teaches the model how different forms of text look. If a recycling pipeline converts every web page into a polished article, it may erase useful distributional diversity.

### Length Alignment: The Anti-Summary Reward

The length reward checks that the recycled text does not become too long relative to the original:

$$
Len(x') \le \tau_{Length} Len(x)
$$

In the main setup, `tau_Length = 1.25`.

This helps avoid two failure modes. If the text becomes too short, it may be a lossy summary. If it becomes too long, it may have introduced extraneous information. The paper's case study shows exactly this kind of problem: methods without enough faithfulness can add plausible but unsupported historical context.

### The Combined Reward

The final reward is a weighted sum:

$$
r(x, x') =
\lambda_{DataMan} r_{DataMan}
+ \lambda_{BERTScore} r_{BERTScore}
+ \lambda_{Structure} r_{Structure}
+ \lambda_{Length} r_{Length}
$$

The main coefficients are:

- `lambda_DataMan = 3`
- `lambda_BERTScore = 1`
- `lambda_Structure = 1`
- `lambda_Length = 1`

This weighting says: quality improvement is the main target, but the rephraser has to earn it while staying faithful.

## How The Rephraser Is Trained

RePro trains the rephraser with GRPO, a reinforcement-learning method that compares a group of generated outputs for the same prompt and normalizes their rewards within that group.

At a high level:

1. For each organic input, the rephraser generates several candidate rewrites.
2. Each candidate gets reward scores.
3. The candidates are compared within the group.
4. The policy is updated to make higher-reward candidates more likely.
5. A KL penalty keeps the rephraser from drifting too far from the base model.

The rephraser is initialized from Qwen3-4B. The RL dataset contains 41k organic examples, restricted to documents with DataMan score below 5, because score 5 is already the maximum and cannot be improved under that reward.

The training details are modest compared with training the downstream models:

- Rephraser steps: 2,000
- Rephraser batch size: 24
- Rephraser sequence length: 4,096, split as 2,048 input tokens plus 2,048 output tokens
- Rephraser max learning rate: `1e-6`
- Optimizer: AdamW
- Scheduler: cosine
- GRPO rollouts: 8
- GRPO clipping epsilon: `0.2`
- KL coefficient beta: `0.005`

For inference over long documents, the authors use vLLM with temperature `1.0`, top-p `0.9`, and max tokens `2048`, splitting longer documents into chunks and concatenating the rewritten chunks.

## The Experimental Setup

The authors evaluate RePro as a pretraining-data method, not just as a rewriting method. This is the right evaluation target. A recycled document can look better to a human or a reward model, but the real question is whether it improves the model trained on it.

### Data

The experiments use DCLM-RefinedWeb. The authors sample 72B tokens as the organic data pool. DCLM-RefinedWeb is useful here because it has already gone through rule-based filtering and global deduplication, but not model-based quality filtering. That means it still contains a large amount of moderate-quality web data that could plausibly be recycled.

In the main setting:

- Organic pool: 72B tokens
- High-quality organic data selected by DCLM-fastText: 7.2B tokens
- Recycled data selected after rephrasing: 7.2B tokens
- Final unique data budget: 14.4B tokens
- Total training tokens for downstream models: 28.8B tokens

The authors use DCLM-fastText as the final quality selector, with `tau_org = 0.018112`, which yields 7.2B high-quality organic tokens.

The distinction between reward and selector is worth noticing. DataMan is used to train the rephraser. DCLM-fastText is used to select the final pretraining data. The appendix finds that DataMan is not necessarily the best selection function, even though it is useful as a reward.

### Downstream Models

The pretraining evaluation uses decoder-only models trained from scratch:

- 400M parameters
- 1.4B parameters

Both are trained for 28.8B tokens in the main experiments.

### Evaluation Tasks

The models are evaluated on 22 downstream tasks grouped into:

- commonsense reasoning
- language understanding
- reading comprehension
- symbolic problem solving
- world knowledge

The main metric is centered accuracy, where random guessing maps to 0 and perfect accuracy maps to 1. The average across the 22 tasks is called the Core score. The authors exclude CommonsenseQA from the original DCLM-Core suite because they view it as unstable and less informative.

### Baselines

The baselines are chosen to represent several approaches to web recycling and data selection:

| Baseline | Basic Idea |
| --- | --- |
| Organic only | Train only on selected organic data |
| WRAP | Wikipedia-style rephrasing with Mistral-7B-Instruct-v0.1 |
| ProX | Uses model-generated editing programs, with a smaller model learning those programs |
| ReWire | Guided rewriting with chain-of-thought using Llama-3.3-70B-Instruct |

The ReWire comparison has an important caveat. ReWire's code was not open-sourced, so the authors sample 7.2B tokens from ReWire's released data. They note this may advantage ReWire because its original pool differs from theirs and effectively gives it access to a larger combined pool.

## Main Results

The headline result is that RePro improves downstream pretraining performance over organic-only data and over prior recycling baselines.

In the 400M setting:

| Method | Unique Data | Core Score |
| --- | ---: | ---: |
| Organic | 7.2B | 0.18990 |
| Organic | 14.4B | 0.18899 |
| WRAP | 7.2B organic + 7.2B recycled | 0.19536 |
| ProX | 7.2B organic + 7.2B recycled | 0.19623 |
| ReWire | 7.2B organic + 7.2B recycled | 0.20125 |
| RePro | 7.2B organic + 7.2B recycled | 0.21658 |

In the 1.4B setting:

| Method | Unique Data | Core Score |
| --- | ---: | ---: |
| Organic | 7.2B | 0.28578 |
| Organic | 14.4B | 0.27108 |
| WRAP | 7.2B organic + 7.2B recycled | 0.28335 |
| ProX | 7.2B organic + 7.2B recycled | 0.29004 |
| ReWire | 7.2B organic + 7.2B recycled | 0.29029 |
| RePro | 7.2B organic + 7.2B recycled | 0.29929 |

There are three important readings of this table.

First, simply adding more organic data does not help. In both model sizes, 14.4B organic tokens performs worse than 7.2B high-quality organic tokens. That reinforces the basic data-curation lesson: more data is not automatically better if quality drops.

Second, recycled data can help. RePro's combination of high-quality organic data plus high-quality recycled data beats the organic baselines.

Third, RePro beats stronger or larger rephrasing baselines, including ReWire, even though ReWire uses a much larger 70B instruction model. The authors report relative Core-score gains of 4.7% to 14.0% over organic-only baselines.

The result is not "small models are always better rephrasers." The result is more precise: a smaller model trained for the recycling objective can outperform a much larger prompted model that is not optimized with the same quality-faithfulness objective.

## Organic Data Efficiency

The paper also asks how much recycled data should be added. In a 1B-style setup, the authors vary the unique token budget:

- 14.4B
- 21.6B
- 28.8B

RePro beats organic-only baselines across these budgets. The best result occurs at 14.4B unique tokens, and 21.6B is similar. But 28.8B drops, likely because selecting that much recycled data forces the method to include more moderate- or low-quality material.

This leads to the paper's claim that RePro can improve organic data efficiency by roughly 2-3x. In plain language:

**The same organic pool can support a larger useful training set if some lower-quality documents are faithfully recycled into higher-quality versions.**

But the budget experiment also warns against overextending the method. Recycling is not magic. At some point, if you keep lowering the threshold to include more recycled material, quality falls again.

## Ablation Studies: What Actually Matters?

The ablations are especially useful because they test whether the main performance gain comes from prompting, supervised fine-tuning, RL, or faithfulness.

In the 400M setup:

| Variant | Core Score |
| --- | ---: |
| Organic | 0.18899 |
| Prompting Qwen3-4B | 0.19847 |
| SFT on GPT-4o rephrasings | 0.19216 |
| RL without faithfulness rewards | 0.19456 |
| SFT + full RL | 0.20816 |
| RePro full RL | 0.21658 |

The lessons from this table are strong.

### Prompting helps, but not enough

Direct prompting improves over the organic baseline, but it falls far short of full RePro. That suggests the base model already has some ability to clean up web text, but prompting alone does not reliably optimize for the pretraining-data objective.

### SFT is not automatically good

The SFT variant uses GPT-4o-generated rephrasings. It does not improve the overall Core score as much as prompting, and it trails the RL variants. The authors suggest that GPT-4o rephrasings may be distillation-like: helpful for some world-knowledge behavior but less useful for broad generalization.

This is a recurring synthetic-data theme. Teacher-generated text can look good, but it may carry teacher-specific style and distributional artifacts.

### Faithfulness is not optional

RL without faithfulness rewards performs worse than full RePro. This is the most conceptually important ablation. If the model is trained only to chase quality, it learns behaviors that can improve the quality score while damaging the original content.

That is the paper's core warning:

**A rephraser that optimizes quality without faithfulness can become a generator of plausible, polished distortions.**

## Reward Dynamics And Reward Hacking

The authors track reward values during RL training. With all rewards enabled, DataMan, BERTScore, and structure rewards improve together, while length reward stays high. That suggests the reward components are not necessarily fighting each other. The rephraser can learn to improve text quality while preserving meaning and form.

Without faithfulness rewards, DataMan reward quickly becomes high, but semantic, structure, and length rewards drop. This is a classic reward-hacking shape: the model finds ways to satisfy the quality metric while violating unstated requirements.

The paper also tests alternative quality rewards:

- DCLM-fastText
- training-data influence

DCLM-fastText works well as a data selector, but as an RL reward it saturates quickly and can be gamed by making text sound academic. Training-data influence is too fine-grained and difficult to optimize; the signal collapses toward no useful rephrasing.

This is a nice methodological point. A metric can be useful for selection and still be bad as a reinforcement-learning reward. Selection asks, "Which existing examples look best?" RL asks, "What behavior will a model learn if we maximize this?" Those are different questions.

## Distributional Analyses

The paper does not stop at downstream scores. It also asks whether the recycled data looks faithful at the distribution level.

The authors sample 30,000 instances and compare organic data, direct prompting, ablated rephrasers, and full RePro.

The main findings:

- DataMan quality improves substantially: the share of samples with DataMan score 5 rises from about 20% in organic data to 60% with RePro.
- Semantic similarity remains higher: RePro has average BERTScore 0.75, compared with 0.69 for direct prompting and 0.56 for RL without BERTScore.
- Structural distribution is better preserved: direct prompting tends to turn markdown-like text into plain text, while removing the structure reward causes overproduction of markdown-like formatting.
- Length distribution is better aligned: direct prompting tends to create shorter summaries, while removing the length reward can create longer texts with extra unsupported information.

This section supports the paper's main interpretation. RePro is not only improving a scalar downstream score. It is changing the data in the intended way: better estimated quality, but still similar in meaning, structure, and length.

## What Does The Rephraser Actually Do?

The authors sample 100 rewritten instances and use Gemini 2.5 Flash-Lite to classify the operations performed by RePro. They group the operations into five broad types:

- paraphrasing
- removing
- clarification
- reorganization
- summarization

Paraphrasing is the most common. It improves grammar, fluency, and wording. Removing is second; it strips irrelevant junk such as ads, boilerplate, and metadata. Clarification, reorganization, and summarization appear often too.

This is a useful result because it shows the learned rephraser is not just a single hand-coded cleaning rule. It has learned a flexible editing policy. But the paper's faithfulness constraints keep that flexibility tied to the original document.

## The Gallipoli Case Study

The appendix case study is a good illustration of the whole paper.

The original web text is a messy page listing five facts about Gallipoli, mixed with ads, metadata, a URL, and crawl artifacts. A good recycled version should preserve the five facts while removing irrelevant clutter.

RePro does approximately that: it turns the facts into cleaner prose and removes ads and metadata.

Other methods reveal failure modes:

- WRAP adds content that was not in the original.
- ReWire adds broad historical context, including details about the assassination of Archduke Franz Ferdinand and campaign context not present in the source.
- RL without faithfulness rewards expands the text into a long, polished historical mini-essay with extra details.
- A fastText-rewarded variant produces academic-sounding prose that abstracts away concrete details.

This example explains why faithfulness matters. The unfaithful outputs are not obviously low quality. In fact, they often sound better. That is exactly why they are dangerous. They can score well while quietly changing the training distribution and injecting unsupported material.

For pretraining, this matters because the model is not reading one document. It is absorbing billions of tokens. Small distortions repeated at scale can become a distributional problem.

## Efficiency

The appendix reports H100-hours required to rephrase 72B tokens:

| Method | Training H100-hours | Inference H100-hours | Total H100-hours |
| --- | ---: | ---: | ---: |
| WRAP | 0 | 2,095 | 2,095 |
| ReWire | 0 | 63,360 | 63,360 |
| RePro | 192 | 1,536 | 1,728 |

RePro has a training cost, but its inference is much cheaper because it uses a 4B rephraser rather than a 70B prompted model. The authors report a 1.2x speedup over WRAP and a 36.7x speedup over ReWire.

This is one of the paper's strongest practical arguments. If web recycling is meant to operate over tens or hundreds of billions of tokens, inference cost dominates. Training a smaller specialized rephraser can be cheaper than repeatedly prompting a giant general model.

## What Is Convincing?

The most convincing part of the paper is that it evaluates the recycled data through downstream pretraining. Many data-generation papers stop at human preference, reward scores, or small proxy metrics. RePro trains 400M and 1.4B models from scratch and measures performance across 22 tasks. That is expensive but necessary for the claim.

The second convincing part is the ablation suite. The authors do not merely show that RePro works. They show that direct prompting, SFT, and quality-only RL do not explain the full gain. The faithfulness rewards are doing real work.

The third convincing part is the distributional analysis. The paper's story is "quality plus faithfulness," and the supporting analyses check both sides: DataMan goes up, while semantic similarity, structure, and length remain better aligned with organic data.

The fourth convincing part is the cost comparison. If RePro were only a little better but much more expensive, the practical claim would be weaker. Instead, the method is both stronger and cheaper than the 70B prompted ReWire setup in their reported comparison.

## What Should We Be Careful About?

The paper is strong, but there are several places to read carefully.

### 1. Reward models are still proxies

DataMan, BERTScore, prompted structure comparison, and length alignment are all proxies. They are better together than alone, but they do not prove factual equivalence.

BERTScore can miss precise factual changes. A structure classifier can be fooled. Length alignment can prevent some bloating but cannot guarantee no hallucination. DataMan itself may prefer certain styles.

The method is best understood as reducing risk, not eliminating it.

### 2. The task suite is broad but not everything

The 22-task Core score is a useful pretraining evaluation, but it is still a fixed benchmark suite. A recycled corpus might help these tasks while having mixed effects elsewhere: long-context behavior, factual calibration, code, multilinguality, safety, rare domains, or instruction-following after later post-training.

The paper's claim is strongest for the DCLM-style pretraining setup it evaluates.

### 3. The comparison to ReWire is not perfectly controlled

The authors are transparent that ReWire's code is not open-sourced, so they sample from its released data. This may advantage ReWire because it effectively comes from a different or larger pool. That makes RePro's win more impressive in one sense, but it also means the comparison is not a perfectly controlled reimplementation.

### 4. The method depends on having useful imperfect data

RePro assumes the organic pool contains valuable content trapped inside lower-quality packaging. That is plausible for DCLM-RefinedWeb. It may be less true for domains where the source data is wrong, spammy, duplicated, or adversarial in a deeper way.

If the original content is bad, faithful recycling can preserve bad content.

### 5. The best recycling ratio is finite

The unique-token-budget experiment shows that adding too much recycled data can hurt. This is important. RePro improves data efficiency, but it does not make all web text useful. Filtering remains essential.

## Questions A Strong PhD Student Would Ask

1. **How robust is RePro across domains?** DCLM-RefinedWeb is a natural setting, but it would be useful to know whether the same reward recipe works for code, math, scientific PDFs, multilingual data, or forums.

2. **What kinds of errors survive the faithfulness rewards?** The case study shows avoided hallucination, but a systematic taxonomy of remaining factual errors would strengthen the safety of the method.

3. **Does RePro change memorization behavior?** Rephrasing could reduce exact duplication, but it might also preserve sensitive content in transformed form. The paper is mainly about pretraining performance, not privacy or memorization.

4. **How much of the gain comes from removing boilerplate versus rewriting content?** The operation analysis suggests both happen. A cleaner decomposition could reveal whether simple boilerplate removal plus light editing would close part of the gap.

5. **Can the faithfulness rewards be made more verifiable?** The conclusion mentions future work on more diverse and verifiable reward signals. This is likely important. Checklists, entailment models, citation-aware verification, or document-level consistency checks could improve reliability.

6. **What happens at larger student-model scales?** The paper evaluates 400M and 1.4B models. The results are meaningful, but the practical target for frontier pretraining is much larger. Scaling behavior remains a key open question.

7. **Does the rephraser overfit to DCLM-fastText/DataMan-style quality?** The downstream evaluations reduce this concern, but reward-model and selector biases could still shape the corpus in hidden ways.

## How This Paper Fits Into The Bigger Picture

RePro is part of a broader shift from "collect more data" to "engineer better data transformations."

Earlier pretraining work often treated data as a static resource: crawl, filter, deduplicate, train. Newer work increasingly treats data curation as an optimization problem. You can select data, rewrite data, synthesize data, weight data, sequence data, and train models that produce better training data.

The danger is that this can become circular. Models generate data for models, and if the generation is careless, the distribution narrows or facts drift. RePro's contribution is to show one way to make the loop more grounded: keep the original web document as the anchor, optimize quality, and explicitly reward faithfulness.

The paper's deeper lesson is not just about RePro. It is about the design pattern:

**When using models to create training data, optimize for usefulness while constraining the transformation to preserve the source of truth.**

That pattern could apply far beyond web text:

- cleaning lecture transcripts while preserving the lecture's claims,
- converting messy notes into study guides without inventing content,
- rewriting documentation while preserving API behavior,
- transforming scientific text into training examples without losing caveats,
- creating synthetic examples from source materials with explicit coverage checks.

## The Takeaway

RePro is a paper about pretraining data, but the core idea is broader: data improvement is not the same as data invention.

The method trains a 4B rephraser to recycle web documents using reinforcement learning. A DataMan quality reward encourages better pretraining text, while BERTScore, structure, and length rewards keep the output tied to the original. On DCLM-RefinedWeb, the recycled data improves downstream pretraining performance for 400M and 1.4B models, beats prompting-based baselines, and is much cheaper than a 70B rephrasing pipeline.

The most important conceptual lesson is this:

**For pretraining, faithful transformation can be more valuable than free-form generation.**

If the web is a messy library, RePro is not trying to write a new library from scratch. It is trying to repair damaged pages, remove junk from the margins, preserve the original books, and make more of the existing collection readable enough to learn from.

## Memory Checklist

- RePro = reinforcement-trained 4B web rephraser for pretraining data recycling.
- The problem is the high-quality data wall: raw web is abundant, but useful filtered web is scarce.
- The method combines one quality reward with three faithfulness rewards.
- DataMan improves estimated data quality.
- BERTScore preserves semantics.
- Structure reward preserves document format and diversity.
- Length reward prevents summary-like compression and bloated hallucinated expansion.
- Final training data combines high-quality organic data with high-quality recycled data.
- Main experiment uses 72B DCLM-RefinedWeb tokens, selects 7.2B organic plus 7.2B recycled tokens, and trains 400M and 1.4B models.
- RePro improves Core score over organic baselines and beats WRAP, ProX, and ReWire.
- Quality-only optimization can reward-hack by producing fluent but unfaithful text.
- The practical lesson: train data generators for the actual corpus objective, and constrain them so they do not drift away from the source.
