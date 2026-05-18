# Annotations Mitigate Post-Training Mode Collapse

Source: `https://arxiv.org/pdf/2605.09995`
<!-- Source text: materials/source_text/ai/annotations-mitigate-post-training-mode-collapse.txt -->
Title: `Annotations Mitigate Post-Training Mode Collapse`
Authors: Jacob Mitchell Springer, Madhu Advani, Lukas Aichberger, Arwen Bradley, Eran Malach, Omid Saremi, Sinead Williamson, Preetum Nakkiran, Etai Littwin, Aditi Raghunathan
Venue: arXiv preprint, v1 dated 2026-05-11
Ingested: `2026-05-18`
Extraction engine: `arXiv PDF via PyMuPDF text extraction`
Strategy: `paper extraction, structured study note, medium/full AI lesson normalization, and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; diversity; semantic entropy; annotation-anchored training; evaluation`

## Summary

This paper studies a failure mode of instruction tuning: post-training can make model outputs higher quality and more instruction-following, but also semantically narrower. The authors call this semantic mode collapse. The model does not merely repeat surface phrasing. It collapses toward a smaller set of topics, settings, personas, narrative structures, and response intents.

The striking empirical observation is that this collapse can get worse with scale. Larger base models are more semantically diverse, but larger post-trained models can become less diverse. The paper reproduces this inverse-scaling pattern across Qwen and Llama model families and several sampling methods, including direct prompting, brainstorming, and multiple-response prompting.

The authors argue that standard supervised fine-tuning has the wrong factorization. SFT does not only teach a model better conditional response behavior. It also transfers the semantic prior of the post-training dataset. If the post-training dataset is narrow, likelihood training pushes probability mass onto that narrow semantic distribution.

Their proposed fix is annotation-anchored training. During pretraining, documents are prepended or interleaved with short semantic annotations such as `topic:family`, `domain:literature`, `action:departure`, or `entity:Mrs. Sinclair`. During post-training, responses are also annotated, but the loss on annotation tokens is masked. This means post-training updates how the model writes a response given a semantic plan, while preserving the pretrained distribution over semantic plans. At inference, the model samples an annotation first and then generates the response conditioned on that annotation.

Empirically, annotation anchoring largely prevents diversity collapse across Stories, NoveltyBench, WildChat, and InfinityChat. On Stories, the 2.5B annotation-anchored model closes roughly 85 percent of the diversity gap between standard SFT and the base model, corresponding to about a 6x reduction in collapse. It also preserves standard benchmark performance on reasoning and knowledge tasks.

## Problem Setting

Post-training is usually framed as the stage that turns a base model into a useful assistant. Supervised fine-tuning teaches the model to follow instructions, format answers, behave more safely, and produce higher-quality responses.

The paper points out that this improvement comes with a distributional risk. Instruction datasets are much smaller and narrower than pretraining corpora. If SFT asks the model to imitate those datasets directly, the post-trained model can inherit their limited semantic support.

The problem is not simply that outputs become shorter, more polished, or stylistically assistant-like. The paper focuses on semantic diversity: across repeated generations for the same prompt, do the outputs cover many different valid concepts, settings, entities, approaches, and narratives?

This matters for open-ended tasks. For creative writing, brainstorming, research ideation, agent planning, and long-horizon problem solving, there may be many valid answers. A model that always chooses the same kind of answer can look polished while losing useful exploration.

## Empirical Motivation: Diversity Collapse Gets Worse With Scale

The authors begin by measuring semantic entropy on a Stories task. Models are prompted to write a story beginning with "Once upon a time." An LLM judge assigns semantic labels along attributes such as summary, main character name, location, genre, narrative structure, cultural context, worldbuilding flavor, and imagery. The entropy of those labels estimates how varied the generations are across samples.

The base-model trend is intuitive: larger base models are more semantically diverse. They have learned more topics, entities, genres, and world models from pretraining.

The post-trained trend is the opposite. Larger instruction-tuned models become less diverse. This inverse-scaling pattern appears in both Qwen and Llama families. It also persists when the authors try prompting methods intended to elicit diversity:

- direct prompting;
- brainstorming before answering;
- generating multiple responses in a shared context with a diversity instruction.

Alternative sampling raises entropy somewhat, but it does not close the base-vs-post-trained gap. The collapse is therefore not only a decoding artifact.

## Dataset Fit And Semantic Collapse

The paper then asks whether collapse is tied to how well the model fits the post-training distribution.

Across hyperparameters, training duration, model sizes, and dataset sizes, models with higher likelihood on post-training validation data generate less diverse outputs. Increasing the number of post-training examples also reduces diversity in the standard SFT setting.

The paper's interpretation is direct: post-training data implicitly defines a semantic prior. If that prior has low entropy, optimizing likelihood transfers the low-entropy semantic distribution into the model. Larger models can fit that distribution more tightly, so the collapse can worsen with scale.

This is the key diagnosis:

SFT entangles two things that should be separated.

1. It teaches better conditional response behavior: given a prompt and a semantic intent, how should the assistant write a helpful answer?
2. It also teaches a new semantic marginal: which intents, topics, styles, and directions should be likely in the first place?

The first part is usually desired. The second part may overwrite useful diversity from pretraining.

## Factorized View

The paper formalizes pretraining as a mixture over semantic variables.

The pretraining distribution over text can be written as:

`P(y) = integral R(z) Q(y | z) dz`

Here:

- `z` is a semantic variable, such as topic, intent, entity set, narrative structure, or response plan;
- `R(z)` is the semantic marginal, ideally broad and high entropy because it reflects web-scale pretraining;
- `Q(y | z)` is the distribution over text given the semantic content.

The post-training distribution can be written similarly:

`P*(y | x) = integral R*(z | x) Q*(y | x, z) dz`

Here `x` is the prompt. `Q*(y | x, z)` is the desired improved response behavior given a semantic plan. `R*(z | x)` is the post-training dataset's semantic prior for that prompt.

If `R*(z | x)` is narrower than the pretrained `R(z | x)`, then matching `P*` directly induces mode collapse.

The target distribution should instead preserve the pretrained semantic marginal while adopting the post-trained conditional behavior:

`P*_R(y | x) = integral R(z | x) Q*(y | x, z) dz`

This is the conceptual objective behind annotation-anchored training.

## Annotation-Anchored Training

The method makes the latent semantic variable `z` explicit by representing it as natural-language annotations.

### During Pretraining

For a document `y`, an annotator model creates a short set of semantic tags `z`. The model trains autoregressively on the concatenated sequence:

`z || y`

For long documents, the paper annotates chunks and interleaves them:

`<z1> x1 <z2> x2 ... <zn> xn`

This teaches the model a conditional distribution over annotations given prior context. Because the annotations come from diverse pretraining data, the model learns a broad semantic prior over tags.

### During Post-Training

For an instruction example with prompt `x`, target response `y`, and response annotations `z`, the model trains on:

`x || z || y`

But the loss is masked on the prompt and on the annotation tokens. The gradient primarily updates the response conditional `Q*(y | x, z)`. It does not substantially update the pretrained annotation distribution `R(z | x)`.

The paper also uses a small formatting stabilization trick: in 0.3 percent of examples, it masks only the annotation values while leaving tag keys in the loss. This helps preserve the tag syntax without collapsing the semantic values.

### During Inference

At inference time, the model samples normally. The sampled sequence begins with annotations, then continues into the response. The annotations serve as sampled semantic plans. The final response is conditioned on those sampled plans.

For evaluation, the authors strip or ignore the annotation text and evaluate only the generated response.

## Annotation Design

The annotation schema is intentionally lightweight. Tags are text strings of the form `<key>:<value>`.

Common keys include:

- `topic`;
- `domain`;
- `entity`;
- `action`;
- `location`;
- `time`;
- `sentiment`;
- `style`;
- `language`.

The annotations should capture choices that are useful to vary across samples but are not fully specified by the prompt. In creative writing, this includes characters, settings, genres, worldbuilding flavors, and events. For other domains, it might include proof strategies, key ideas, representations, or solution approaches.

The authors use Qwen3-30B-A3B-Instruct as the annotator for both pretraining chunks and post-training responses. They argue the method does not require perfect annotations because the goal is preserving a learned distribution over semantic variables, not making each tag a ground-truth label.

## Experimental Setup

The authors train 0.6B, 1B, and 2.5B OLMo-2-style models.

Pretraining uses a custom Dolma/Dolmino-derived mixture including DCLM, Reddit, Tulu_Flan, CC-News, Books, Wikiref, Wikipedia, OpenWebMath, and Pes2o. The models train for Chinchilla-optimal token budgets with a scaling factor of 20:

- 0.6B model: 12B tokens;
- 1B model: 20B tokens;
- 2.5B model: 50B tokens.

All variants match total tokens and FLOPs. In annotated pretraining, annotation tokens replace some content tokens rather than adding free extra training budget.

Post-training uses the TULU3 SFT mixture for one epoch. Standard models use ordinary SFT. Annotation-anchored models annotate each target response and train with annotation loss masking.

The diversity benchmarks are:

- Stories, evaluated with semantic entropy over judge-assigned attributes;
- NoveltyBench, WildChat, and InfinityChat, evaluated with embedding-based mean pairwise dissimilarity.

Quality is judged by Qwen3-30B-A3B-Instruct. Standard task performance is checked with ARC, BoolQ, COPA, HellaSwag, OpenBookQA, PIQA, SciQ, WinoGrande, and GSM8k.

## Main Results

Annotation anchoring mitigates collapse across all four diversity benchmarks.

On Stories, standard SFT reduces diversity, and the reduction worsens with scale. Annotation-anchored training reverses that trend. The 2.5B annotation-anchored model closes about 85 percent of the semantic diversity gap with the base model, which the authors summarize as about a 6x reduction in diversity collapse compared with standard SFT.

On NoveltyBench and WildChat, annotation anchoring restores positive scaling of diversity with model size. Across all dialog benchmarks, annotated models maintain higher diversity than standard SFT models.

The method also improves the diversity-quality frontier. When sampling temperature is varied on Stories, standard SFT faces a steep tradeoff: higher temperature hurts judged quality and eventually does not buy much diversity. Annotation-anchored models achieve higher diversity at comparable judged quality.

## Task Performance

The diversity gains do not appear to come from sacrificing ordinary benchmark accuracy.

On the zero-shot reasoning and knowledge benchmark suite, annotation-anchored and standard SFT models track closely:

- 0.6B average accuracy: 54.5 percent annotated vs 53.1 percent standard SFT;
- 1B average accuracy: 56.6 percent annotated vs 57.7 percent standard SFT;
- 2.5B average accuracy: 62.3 percent annotated vs 62.4 percent standard SFT.

On GSM8k, the 2.5B annotation-anchored model reaches 36.4 percent versus 35.4 percent for standard SFT, with smaller models similarly close.

The intended lesson is that anchoring the semantic marginal can preserve the conditional response behavior that drives benchmark performance.

## Ablations

The paper tests two important ablations.

First, annotated pretraining is necessary. If annotation-anchored post-training is applied to standard pretrained checkpoints, diversity remains much closer to standard SFT than to the full annotation-anchored pipeline. The semantic anchor has to be learned during pretraining.

Second, inference-time annotation sampling is necessary. If the annotation-anchored model generates without first sampling annotations, diversity drops substantially. The model has preserved a rich semantic distribution, but it needs sampled semantic variables at inference to express it.

These ablations are important because they show the method is not just "add labels during fine-tuning." It is a complete protocol: learn a high-entropy annotation distribution during pretraining, protect it during post-training, and sample from it during inference.

## Controlled Study On Post-Training Data Entropy

The paper includes a controlled SimpleStories study to test whether annotation anchoring decouples output diversity from post-training data diversity.

The authors create fixed-size post-training subsets with different semantic entropies by restricting topic and persona values. Standard SFT output entropy tracks the dataset entropy: narrower training data leads to narrower generations.

Annotation-anchored training is much less sensitive. It preserves higher output diversity even when the post-training data is narrow, and for persona it is almost invariant to the training dataset entropy.

This directly supports the paper's factorized diagnosis. Standard SFT copies the post-training semantic prior. Annotation anchoring keeps the pretrained semantic prior while learning the post-training conditional response behavior.

## Limitations And Caveats

The method is expensive. Annotating the full pretraining corpus requires a large annotator model and substantial compute. The paper estimates roughly 3 days on an 8xH100 node for annotation generation, though the same annotations can be reused across model scales.

The method requires pretraining or at least a pretraining-like stage. The ablations suggest that post-training annotations alone are not enough to recover the full benefit from an ordinary pretrained model.

The experiments are limited to 2.5B-parameter models. The paper's motivation includes frontier-scale post-training, but the direct training evidence is at small-to-medium research scale.

The annotation schema is hand-designed and domain-dependent. For creative generation, tags such as topic, entity, action, and location are natural. For math, coding, scientific reasoning, or agentic planning, it is less obvious which annotations best preserve useful diversity without harming correctness.

The diversity metrics are necessarily proxies. Semantic entropy from an LLM judge and embedding dissimilarity are more meaningful than surface n-grams, but they still depend on annotator or embedding behavior.

The method may expose a product-design challenge: users may not want visible annotation tags. A deployment system would need to hide, strip, or otherwise manage annotation text while preserving the sampled semantic plan.

## Why This Paper Matters

This paper is useful because it treats post-training collapse as a distributional objective problem, not just a sampling problem.

It connects several themes:

- post-training data can overwrite useful pretraining diversity;
- diversity is not merely high temperature or random style variation;
- larger models may collapse harder because they fit narrow post-training data better;
- semantic variables can be made explicit and protected through loss masking;
- pretraining-time structure can determine what post-training can preserve.

For research prep, the most important idea is the distinction between conditional behavior and semantic marginal. Good post-training should teach the model how to answer well for a chosen semantic plan, but it should not accidentally erase the range of plans the base model already knows how to generate.

## Study Questions

1. Why can standard SFT reduce semantic diversity even when it improves judged response quality?
2. Why does the diversity gap get worse with scale in the paper's experiments?
3. What is the difference between changing `Q*(y | x, z)` and changing `R*(z | x)`?
4. Why does annotation loss masking preserve the pretrained semantic distribution?
5. Why are annotated pretraining and inference-time annotation sampling both necessary?
6. How would you design useful annotations for math proofs, code generation, or agent plans?
7. What failure modes could appear if a model optimizes against a diversity metric directly?
