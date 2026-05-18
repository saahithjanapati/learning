# Annotations Mitigate Post-Training Mode Collapse

Source note: This lesson is based on Jacob Mitchell Springer, Madhu Advani, Lukas Aichberger, Arwen Bradley, Eran Malach, Omid Saremi, Sinead Williamson, Preetum Nakkiran, Etai Littwin, and Aditi Raghunathan, "Annotations Mitigate Post-Training Mode Collapse," arXiv v1, 2026. Source PDF: [arxiv.org](https://arxiv.org/pdf/2605.09995). Processed source: [materials/processed/ai/annotations-mitigate-post-training-mode-collapse.md](../../../materials/processed/ai/annotations-mitigate-post-training-mode-collapse.md).
<!-- Source text: materials/source_text/ai/annotations-mitigate-post-training-mode-collapse.txt -->

Filing note: This is filed normally under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md) as `post-training`, `diversity`, `semantic entropy`, `annotation-anchored training`, and `evaluation`.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

The paper studies a quiet failure mode of post-training: a model can become more helpful, more polished, and more instruction-following while becoming semantically less varied.

The authors call this semantic mode collapse. The problem is not just that outputs sound similar. It is that repeated generations for the same open-ended prompt cover fewer topics, fewer settings, fewer entities, fewer plot structures, and fewer response directions.

The most interesting empirical result is inverse scaling. Larger base models are more diverse, which makes sense because they have absorbed more of the pretraining distribution. But larger post-trained models can become less diverse. The paper shows this for Qwen and Llama families on a story-generation task, and the effect remains even when prompting methods try to elicit diversity through brainstorming or multiple generations.

The paper's diagnosis is that standard supervised fine-tuning entangles two things. It teaches the model better conditional behavior, which is good: given a prompt and a particular semantic intent, write a higher-quality answer. But it also teaches a new semantic prior, which may be bad: imitate the narrower range of intents represented in the post-training dataset.

The proposed fix is annotation-anchored training. The method makes semantic choices explicit as short natural-language tags.

During pretraining, documents are paired with annotations such as `topic:family`, `domain:literature`, `action:departure`, or `location:Baghdad`. This teaches the model a broad distribution over semantic annotations derived from pretraining data.

During post-training, responses are also annotated, but the loss on annotation tokens is masked. The model learns to produce a better answer conditioned on the annotation, but the gradient does not overwrite the pretrained annotation distribution. At inference, the model samples an annotation first and then writes the response conditioned on that sampled semantic plan.

This separates two factors:

- the semantic marginal: what kinds of answers are likely;
- the response conditional: how to write a good answer given a chosen kind of answer.

Standard SFT changes both. Annotation anchoring tries to preserve the pretrained semantic marginal while updating the response conditional.

The results are strong for the paper's scale. Across Stories, NoveltyBench, WildChat, and InfinityChat, annotation-anchored models are more diverse than standard SFT models. On Stories, the 2.5B annotation-anchored model closes roughly 85 percent of the diversity gap with the base model, or about a 6x reduction in collapse.

The method does not appear to sacrifice ordinary task performance. On ARC, BoolQ, COPA, HellaSwag, OpenBookQA, PIQA, SciQ, WinoGrande, and GSM8k, annotation-anchored models track standard SFT models closely.

The ablations are the part to remember. Annotated pretraining is necessary; adding annotations only during post-training is much weaker. Sampling annotations at inference is also necessary; if the model does not first sample a semantic plan, much of the diversity benefit disappears.

The lesson is not "use tags for everything." The deeper lesson is that post-training objectives can accidentally transfer a narrow dataset prior. If we want models that are both high quality and broadly generative, we may need objectives that say what should change and what should remain anchored from pretraining.

## Full-Length Version

### The Problem: Post-Training Can Make Models Narrower

Instruction tuning is supposed to make models usable. A base model may know a huge range of facts, styles, genres, and response patterns, but it is not automatically a good assistant. Supervised fine-tuning teaches helpfulness, formatting, safety conventions, and instruction-following.

The cost is that post-training data is narrow compared with pretraining data. A pretraining corpus contains an enormous distribution of documents, topics, voices, and tasks. An SFT dataset is a curated set of assistant examples. Even when it is large, it is still much smaller and more stylized than the open pretraining distribution.

The paper argues that SFT can transfer this narrowness into the model. The result is semantic mode collapse: outputs remain fluent and high quality, but the range of valid semantic possibilities shrinks.

This is especially important for open-ended work. If a model is used for research ideation, creative writing, planning, brainstorming, or agent task decomposition, semantic diversity is not decorative. It is part of the capability.

### Measuring Semantic Diversity

The paper uses a Stories task as the main diagnostic. The prompt asks models to generate a story beginning with "Once upon a time." Base models are evaluated through prefilling where needed.

The authors do not measure only n-gram diversity. Surface diversity can be misleading because a model can rephrase the same story many ways. Instead, an LLM judge assigns semantic labels across attributes such as:

- summary;
- main character name;
- location;
- genre;
- narrative structure;
- cultural context;
- worldbuilding flavor;
- imagery.

The entropy of these labels estimates how much the generations vary semantically. Higher location entropy, for example, means the stories are set in more varied places.

For dialog benchmarks, the paper uses embedding-based mean pairwise dissimilarity.

### The Inverse-Scaling Observation

Before post-training, larger base models are more semantically diverse. This matches intuition: bigger models trained on broad data have learned more concepts and more ways to continue a prompt.

After instruction tuning, the trend can reverse. Larger post-trained models become less diverse.

The paper shows this across Qwen and Llama model families. It also tests several sampling strategies:

- direct prompting;
- brainstorming ideas before answering;
- generating multiple responses in one shared context with an explicit diversity instruction.

These methods improve diversity somewhat, but they do not erase the gap between base and post-trained models. The collapse is therefore not just a bad prompt or a low-temperature artifact.

### Why Fitting Post-Training Data Can Reduce Diversity

The authors then connect diversity collapse to dataset fit.

They vary hyperparameters, training duration, model size, and the number of post-training examples. A consistent pattern appears: models with higher likelihood on post-training validation data produce less diverse generations.

Even increasing the number of post-training examples can reduce semantic diversity in standard SFT.

That sounds counterintuitive until you view the dataset as a semantic distribution. If the post-training dataset has a narrow semantic prior, fitting it better pushes the model toward that prior. Larger models are better at fitting it, so larger post-trained models can collapse harder.

### The Key Factorization

The paper's central conceptual move is to split text generation into two parts.

The pretraining distribution can be written as:

`P(y) = integral R(z) Q(y | z) dz`

Here `z` is a semantic variable. It can mean topic, intent, entity set, plan, genre, narrative structure, or another high-level choice. `R(z)` is the semantic marginal: how likely different semantic modes are. `Q(y | z)` is the surface text distribution given that semantic mode.

For post-training, the analogous factorization is:

`P*(y | x) = integral R*(z | x) Q*(y | x, z) dz`

Here `x` is the user prompt. `Q*(y | x, z)` is the desired assistant behavior conditioned on a semantic plan. `R*(z | x)` is the semantic prior implied by the post-training dataset.

Standard SFT tries to match `P*` directly. If `R*` is narrow, the model learns narrow semantics.

The paper argues that the desired target is:

`P*_R(y | x) = integral R(z | x) Q*(y | x, z) dz`

In words: keep the pretrained distribution over semantic plans, but learn the post-trained way of writing a response given a plan.

### Annotation-Anchored Training

The method makes `z` explicit with natural-language annotations.

During pretraining, a document is paired with semantic tags. For example, a literary passage might receive tags like:

`topic:family_relationships domain:literature action:departure entity:Mrs_Sinclair`

The model trains autoregressively on the annotations followed by the document. For long documents, the paper splits text into chunks, annotates each chunk, and interleaves annotation and text.

This teaches the model to generate annotations from context, and because the annotations come from broad pretraining data, the model learns a high-entropy annotation distribution.

During post-training, each target assistant response is also annotated. The training sequence is:

`prompt || annotation || response`

But the loss is masked on the prompt and annotation tokens. The model is trained to write the response conditioned on the annotation, while the annotation prediction behavior remains anchored to its pretrained state.

At inference time, the model samples normally. It first emits annotations, then emits the response. The annotations act as a sampled semantic plan.

### What The Tags Are Doing

The tags are not supposed to be perfect labels. They are a control interface for semantic variation.

A good tag describes a choice that should be allowed to vary across samples and is not already fixed by the prompt. In creative writing, this might be topic, location, entity, genre, action, or style. In math, it might be proof strategy or representation. In code, it might be algorithmic approach or data structure.

This is why the method is interesting beyond story generation. It gives a general recipe for preserving a distributional property from pretraining: make the property explicit, learn it broadly during pretraining, and stop post-training gradients from overwriting it.

### Experiments

The authors train OLMo-2-style models at 0.6B, 1B, and 2.5B parameters.

The pretraining mixture comes from Dolma and Dolmino sources, including web text, Reddit, Tulu_Flan, news, books, Wikipedia, Wikiref, OpenWebMath, and Pes2o.

The token budgets are Chinchilla-style:

- 0.6B model: 12B tokens;
- 1B model: 20B tokens;
- 2.5B model: 50B tokens.

The post-training dataset is TULU3 SFT, with roughly 939K samples across instruction-following, knowledge, math, coding, safety, and other sources.

The main comparison is standard pretraining plus standard SFT versus annotated pretraining plus annotation-anchored post-training.

### Main Result

Annotation anchoring largely prevents semantic diversity collapse.

On Stories, the standard SFT models lose diversity, and that loss worsens with scale. Annotation-anchored models stay much closer to the base models. The 2.5B annotation-anchored model closes roughly 85 percent of the diversity gap with the base model.

On NoveltyBench, WildChat, and InfinityChat, annotation-anchored models also maintain higher diversity than standard SFT models across scales.

The diversity-quality frontier improves as well. When temperature is varied, standard SFT quickly trades quality for limited diversity. Annotation-anchored models achieve more diversity at comparable judged quality.

### Task Performance Is Preserved

A natural worry is that diversity is being bought by making the model worse. The paper checks this with standard reasoning and knowledge benchmarks.

Across ARC, BoolQ, COPA, HellaSwag, OpenBookQA, PIQA, SciQ, and WinoGrande, annotation-anchored models remain within about a point of standard SFT averages at each scale.

On GSM8k, the 2.5B annotation-anchored model slightly beats standard SFT, 36.4 percent versus 35.4 percent. The smaller models are also close.

This supports the intended factorization. The model can preserve the semantic marginal while still learning the conditional behavior needed for benchmark performance.

### Why The Ablations Matter

The paper's ablations make the mechanism much more convincing.

First, annotated pretraining is necessary. If annotation-anchored post-training is applied to standard pretrained checkpoints, the diversity gains are much smaller. The model needs to learn the broad annotation distribution during pretraining.

Second, inference-time annotation sampling is necessary. If an annotation-anchored model generates without first sampling annotations, diversity drops sharply. The preserved distribution has to be actively sampled.

These results rule out a weaker interpretation where annotations are merely extra fine-tuning metadata. The full pipeline matters.

### Controlled Study: Narrow Post-Training Data

The SimpleStories experiment directly tests the paper's thesis.

The authors create post-training subsets with different semantic entropy by restricting topics and personas. Standard SFT generations track the training set entropy: narrow post-training data leads to narrow outputs.

Annotation anchoring is much less sensitive. It preserves broader outputs even when the post-training data is semantically narrow, and for persona it is almost invariant to dataset entropy.

This is the cleanest evidence for the distributional-transfer story.

### Critique

The strongest part of the paper is the diagnosis. It separates response quality from semantic coverage and shows why "fit the SFT dataset better" can be the wrong objective for open-ended generation.

The method is also conceptually clean. Make semantics explicit, learn a broad semantic distribution during pretraining, protect it during post-training, and sample from it during inference.

The main practical weakness is cost. Annotating a pretraining corpus is expensive, and the paper estimates several days on an 8xH100 node. This is manageable for research and large labs, but it is not a small fine-tuning trick.

The second weakness is that it requires pretraining participation. The paper's own ablation suggests that adding annotation-anchored post-training to an ordinary pretrained model does not recover the full effect.

The third weakness is generality. The creative-writing tag schema is intuitive, but the right annotations for math, code, scientific reasoning, or agent planning are less obvious. Bad annotations might preserve the wrong diversity or interfere with correctness.

The fourth weakness is evaluation. Semantic entropy and embedding dissimilarity are better than surface diversity, but they still depend on judges and embedding models.

### How To Remember The Paper

The one-line version:

SFT can collapse what a model chooses to talk about; annotation anchoring tries to preserve the base model's semantic menu while teaching better post-trained execution.

The core mechanism:

1. Learn a rich distribution over semantic annotations during pretraining.
2. Mask annotation losses during post-training so that distribution stays anchored.
3. Sample annotations at inference so each answer is conditioned on a different semantic plan.

The practical takeaway:

When post-training data is narrow, optimizing harder can erase useful diversity. A good post-training objective may need to specify not only what behavior should improve, but also which pretraining distributional properties should remain intact.
