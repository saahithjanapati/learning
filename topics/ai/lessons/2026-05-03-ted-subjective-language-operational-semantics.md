# TED: Finding Gaps Between Human And LLM Meanings Of Subjective Language

Source note: Erik Jones, Arjun Patrawala, and Jacob Steinhardt, "Uncovering Gaps in How Humans and LLMs Interpret Subjective Language." Published at ICLR 2025; arXiv:2503.04113v1, submitted March 6, 2025. Source page: [arxiv.org/abs/2503.04113](https://arxiv.org/abs/2503.04113). Processed source: [materials/processed/ai/uncovering-gaps-humans-llms-interpret-subjective-language.md](../../../materials/processed/ai/uncovering-gaps-humans-llms-interpret-subjective-language.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem: Subjective Words Are Control Interfaces](#the-problem-subjective-words-are-control-interfaces)
- [Operational Semantics](#operational-semantics)
- [TED In One Picture](#ted-in-one-picture)
- [Building The LLM Operational Thesaurus](#building-the-llm-operational-thesaurus)
- [Building The Semantic Thesaurus](#building-the-semantic-thesaurus)
- [Two Kinds Of Failures](#two-kinds-of-failures)
- [Evaluation Setup](#evaluation-setup)
- [Main Results](#main-results)
- [Why This Matters For Alignment](#why-this-matters-for-alignment)
- [Limitations And Critique](#limitations-and-critique)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper studies a quiet but important alignment problem:

**Humans steer language models with subjective words, but models may not interpret those words the way humans expect.**

Words like `helpful`, `harmless`, `professional`, `enthusiastic`, `witty`, `humorous`, and `engaging` are not decorative. They are control inputs. Users put them in prompts. Developers put them in system prompts. Training pipelines use them when models critique or edit their own outputs.

The problem is that a word's dictionary meaning is not the same as its model behavior. A model might treat `enthusiastic` as similar to `dishonest`, or `witty` as similar to `harassing`, because the phrase changes the model's outputs in ways humans did not intend.

The paper calls this gap a mismatch in `operational semantics`.

### Operational Semantics

The operational semantics of a phrase means:

**What actually changes in the model's output when that phrase is included in the prompt?**

For example, suppose we compare:

```text
Write an article about electric vehicles.
```

with:

```text
Write an enthusiastic article about electric vehicles.
```

Humans expect the second output to be more energetic, upbeat, or excited. They do not expect it to become more factually careless. But if the model reliably invents more unsupported claims under the `enthusiastic` instruction, then `enthusiastic` has an unexpected operational side effect for that model.

That is the paper's key distinction:

- semantic meaning: what humans think a phrase means;
- operational meaning: what the model actually does when prompted with it.

### The TED Method

The authors introduce `TED`, the `Thesaurus Error Detector`.

TED builds two maps over subjective phrases.

The first is an `LLM operational thesaurus`. It asks: which phrases change the model's outputs in similar ways? For example, does the model behave as if `witty` and `harassing` are close together?

The second is a `semantic thesaurus`. It asks: which phrases do humans expect to change outputs in similar ways? For example, humans do not expect `witty` to imply `harassing`.

TED finds clashes between these two thesauruses.

If the model thinks two phrases are behaviorally similar but humans think they should be different, TED flags an `unexpected side effect`.

If humans think two phrases should be behaviorally similar but the model treats them as different, TED flags an `inadequate update`.

### How TED Builds The Operational Thesaurus

TED needs a way to represent what a subjective phrase does to a model.

For each phrase, it compares a generic prompt with a prompt containing the phrase. The model produces an output from the subjective prompt. TED then asks:

**What direction in the model's embedding space would make the generic prompt more likely to produce that subjective output?**

It estimates this direction with a gradient. In simplified notation:

$$
e_{op}(w) = \nabla_{e(x_{empty})} \log p_\theta(o_w \mid x_{empty})
$$

This says: for phrase `w`, compute a vector that points in the direction that would make the generic prompt more likely to produce the phrase-conditioned output.

Then TED averages this over many prompts and compares phrase vectors with cosine similarity. Similar vectors mean similar operational effects.

### Experiments

The paper tests TED on:

- Mistral 7B Instruct v0.2;
- Llama 3 8B Instruct.

It studies two settings.

First, `output editing`: the model edits its own answer to be more like a subjective phrase. This mimics Constitutional AI-style workflows, where a model may edit outputs to be more helpful, harmless, or aligned with some value.

Second, `inference steering`: the user directly asks for a subjective style or property, such as "write an enthusiastic article" or "write a witty essay."

The semantic thesaurus is built either with human annotators or with GPT-4 as a scalable proxy. Downstream failures are judged with GPT-4, with a small human validation study supporting that judgment setup.

### Main Findings

TED beats a semantic-only baseline. The baseline knows which phrase pairs humans think are surprising, but it does not look inside the target model. TED works better because it filters phrase pairs using the model's own operational behavior.

The strongest results are for unexpected side effects.

For output editing on Llama 3 using the human semantic thesaurus, TED's unexpected-side-effect pairs have an average success rate of `85.6%`, compared with `43.2%` for the semantic-only baseline. `56.7%` of TED pairs have success rate over `90%`, compared with `6.7%` for the baseline.

For inference steering on Llama 3 using the human semantic thesaurus, TED's unexpected-side-effect pairs have an average success rate of `79.7%`, compared with `48.1%` for the baseline. Again, `56.7%` of TED pairs exceed the `90%` success-rate threshold, compared with `10.0%` for the baseline.

The qualitative examples are the memorable part:

- asking Llama 3 for `enthusiastic` writing can make outputs more `dishonest`;
- asking Llama 3 for `humorous` writing can make outputs more `inaccurate`;
- asking Mistral for `witty` edits can make outputs more `harassing` or `incendiary`;
- asking Mistral for `quirky` writing can make outputs more `insulting`.

### Medium Takeaway

TED is a method for auditing the meanings that models assign to subjective control words. Its lesson is that alignment failures can hide in relationships between concepts, not only in obviously bad outputs.

Instead of supervising every answer directly, humans can supervise abstract expectations like "`enthusiastic` should not imply `dishonest`." TED then uses the model's own gradients to find where its behavioral concept map diverges from that human map.

## Full-Length Version

## The Problem: Subjective Words Are Control Interfaces

A lot of LLM control happens through vague human words.

We ask a model to be:

- `helpful`;
- `harmless`;
- `honest`;
- `professional`;
- `friendly`;
- `engaging`;
- `concise`;
- `enthusiastic`;
- `witty`;
- `balanced`.

These words appear in ordinary user prompts, system prompts, constitutions, preference labels, self-critique prompts, and model-editing instructions.

That makes subjective language a control interface. It is the steering wheel through which humans push model behavior.

But subjective words are dangerous because they are compressed. A word like `witty` bundles tone, style, surprise, confidence, and social context. A word like `helpful` bundles relevance, truthfulness, deference, initiative, safety, and politeness. Humans have rich expectations about these bundles, but a model may have learned a different bundle.

This paper asks:

**Can we uncover places where a model's behavioral interpretation of subjective language differs from human expectations?**

The authors' answer is TED: compare the model's map of subjective phrases to a human reference map, then investigate the disagreements.

## Operational Semantics

The central concept is `operational semantics`.

In this paper, a phrase's operational semantics means the behavioral effect of including that phrase in the prompt.

Take a phrase like `enthusiastic`.

The human semantic expectation might be:

- higher energy;
- more excitement;
- more positive framing;
- maybe more exclamation or vivid language;
- not less honest.

The model's operational behavior might be:

- more excitement;
- more exaggeration;
- more unsupported claims;
- more sales-like certainty.

If that happens, humans and the model partially agree on the surface style but disagree on a hidden side effect. The phrase does not merely mean "enthusiastic" to the model. It also operationally pushes the output toward something closer to `dishonest` or `inaccurate`.

This distinction is powerful because it avoids arguing about dictionary definitions. The paper is not asking what `witty` should mean in abstract. It asks what the target model actually does when `witty` is used.

## TED In One Picture

TED stands for `Thesaurus Error Detector`.

The method has three stages:

1. Build an operational thesaurus for the LLM.
2. Build a semantic thesaurus for human expectations.
3. Find clashes and test whether they produce real downstream failures.

The word `thesaurus` is used because the method compares phrases pairwise. A normal thesaurus says which words are synonyms. TED's operational thesaurus says which subjective phrases behave like synonyms for a particular LLM.

For example, the LLM thesaurus might say:

```text
witty ~ harassing
enthusiastic ~ dishonest
concise not similar to verbose
friendly ~ informative
```

The human semantic thesaurus might say:

```text
witty should not imply harassing
enthusiastic should not imply dishonest
concise should not imply verbose
friendly may often imply warm or approachable
```

The clashes are the interesting part.

## Building The LLM Operational Thesaurus

TED needs to turn each subjective phrase into a vector representing what that phrase does to the model.

The paper uses gradients for this.

Imagine a generic prompt:

```text
Write an article about electric vehicles.
```

Now imagine a subjective prompt:

```text
Write an enthusiastic article about electric vehicles.
```

The model produces a subjective output from the second prompt. TED then goes back to the generic prompt and asks:

**How would the generic prompt's embedding need to change to make that subjective output more likely?**

That change vector is treated as an approximation of what the subjective phrase did.

The paper writes this as:

$$
e_{op}(w) = \nabla_{e(x_{empty})} \log p_\theta(o_w \mid x_{empty})
$$

The notation is less scary than it looks:

- `w` is the subjective phrase, like `enthusiastic`;
- `x_empty` is the generic prompt without the phrase;
- `o_w` is the model output when the phrase is included;
- `e(x_empty)` is the embedding of the generic prompt;
- `e_op(w)` is the estimated operational vector for the phrase.

In plain language:

**The vector for a phrase points in the direction that would make the generic prompt behave more like the phrase-conditioned prompt.**

TED averages these gradients across `100` prompts so the vector is not just about one topic. Then it compares two phrases by cosine similarity between their vectors.

If two phrase vectors point in similar directions, the model treats the phrases as operationally similar. If they point in very different directions, the model treats them as operationally dissimilar.

The implementation details matter:

- The paper computes gradients with respect to the embedding of the first user-input token.
- It tests Mistral 7B Instruct v0.2 and Llama 3 8B Instruct.
- It uses model-specific thresholds for similarity and dissimilarity.
- Inference uses vLLM; gradients use HuggingFace Transformers.
- The experiments use A100 GPUs.

The authors note that the first-token embedding choice is somewhat arbitrary. Other activations or token positions might work too.

## Building The Semantic Thesaurus

The operational thesaurus is only half the method. TED also needs a reference for what humans expect.

The semantic thesaurus answers questions like:

```text
If someone edits text to be more witty,
would a human expect it to become more harassing?
```

or:

```text
If someone edits text to be more thorough,
would a human expect it to become more detailed?
```

The paper builds this reference in two ways.

### Human Semantic Thesaurus

The authors use Amazon Mechanical Turk, but they are careful about worker quality.

They first run a qualification step to identify annotators who give thoughtful, non-AI-looking answers. They end up with ten qualified workers.

Because labeling all phrase pairs would be expensive, they only label pairs that the LLM operational thesaurus already marks as strongly similar or strongly dissimilar. Across output editing and inference steering, this gives `1260` labeled pairs out of `27084` possible pairs.

Each pair is labeled by three annotators. The paper keeps a label only if all three agree. This makes the semantic thesaurus conservative: uncertain or disputed cases are discarded.

### LLM Semantic Thesaurus

The authors also build a GPT-4-based semantic thesaurus.

This is cheaper and more scalable, but imperfect. GPT-4 is used to approximate whether a human would expect one phrase to imply another. The authors use separate prompts for unexpected side effects and inadequate updates because a single ternary judgment was not reliable enough.

This comparison is useful because it asks whether future versions of TED can scale without requiring humans to label many phrase pairs.

## Two Kinds Of Failures

TED finds two failure types.

### Unexpected Side Effects

An unexpected side effect happens when:

```text
model says: phrase A and phrase B behave similarly
humans say: phrase A and phrase B should not behave similarly
```

Example:

```text
model says: enthusiastic behaves like dishonest
humans say: enthusiastic should not imply dishonest
```

This is dangerous because the user or developer asked for one property and got another hidden property along with it.

Unexpected side effects are the paper's most successful failure type.

### Inadequate Updates

An inadequate update happens when:

```text
humans say: phrase A should imply phrase B
model says: phrase A and phrase B behave differently
```

Example:

```text
humans say: thorough should imply detailed
model says: thorough does not operationally behave like detailed
```

This means the model fails to make an update humans would expect.

Inadequate updates are still important, but the paper finds them less reliably than unexpected side effects.

## Evaluation Setup

The paper evaluates TED by asking whether flagged phrase pairs predict downstream model behavior.

The key question is:

**When TED says phrase `w2` unexpectedly induces property `w1`, does prompting with `w2` actually make outputs more like `w1`?**

The authors compare TED to a `semantic-only baseline`.

The baseline uses only the human or GPT-4 semantic thesaurus. It knows which phrase pairs would be surprising, but it does not inspect the target model's operational thesaurus. This tests whether failures are easy to find just by trying random surprising phrase pairs.

TED's advantage comes from using the target model's own gradients to prioritize pairs.

### Setting 1: Output Editing

Output editing mimics Constitutional AI-style pipelines.

The model first answers ethical questions, then edits the answer to be more like a subjective phrase. The paper uses GPT-4 to generate ethical questions about uncertain scenarios. The subjective phrases include phrases from Claude's constitution, plus other GPT-4-generated phrases.

This setting matters because self-edits can become training data. If a model's edit for `value of freedom` accidentally makes output more manipulative, then training on those edits could reinforce the wrong behavior.

### Setting 2: Inference Steering

Inference steering mimics ordinary use.

The model is asked to write long-form content: blog posts, essays, reports, articles, memos, letters, or proposals. Subjective modifiers are inserted into the prompt.

Example:

```text
Write an enthusiastic article about the significance of the James Webb Space Telescope's latest findings.
```

The goal is to see whether phrase effects discovered in one prompt family transfer to normal user-style writing prompts.

### Judging Downstream Outputs

The downstream judge compares a generic output with a phrase-steered output and asks which one is more aligned with the target property.

The main judge is GPT-4. To check whether this invalidates the result, the authors run a smaller human validation study. GPT-4 matches majority human judgment `84%` of the time. When all three human annotators agree, GPT-4 agrees `97%` of the time. GPT-4 also appears to underestimate TED's success in that check.

This is not a perfect solution. But it is a reasonable tradeoff because evaluating every candidate pair with humans would be much more expensive.

## Main Results

The broad result is simple:

**TED finds downstream failures much better than the semantic-only baseline.**

This holds across:

- both tested models;
- output editing and inference steering;
- unexpected side effects and inadequate updates;
- human and GPT-4 semantic thesauruses.

### Output Editing Results

For output editing, TED is especially strong on unexpected side effects.

On Llama 3 with the human-constructed semantic thesaurus:

- TED's unexpected-side-effect pairs have average success rate `85.6%`;
- the semantic-only baseline has average success rate `43.2%`;
- `56.7%` of TED pairs exceed a `90%` success-rate threshold;
- only `6.7%` of semantic-only baseline pairs exceed that threshold.

This is a large gap. It means the model's operational thesaurus is doing real work. TED is not merely guessing that surprising phrase pairs might fail. It is finding pairs the model itself appears to connect.

For inadequate updates, TED also improves over the baseline, but the results are weaker. The authors suggest this could mean inadequate updates are less common, or that TED is more prone to false positives for that failure type.

### Inference Steering Results

Inference steering shows the same pattern.

On Llama 3 with the human-constructed semantic thesaurus:

- TED's unexpected-side-effect pairs have average success rate `79.7%`;
- the semantic-only baseline has average success rate `48.1%`;
- `56.7%` of TED pairs exceed a `90%` success-rate threshold;
- only `10.0%` of semantic-only baseline pairs exceed that threshold.

This matters because inference steering is how users normally interact with models. If a user asks for a `playful` or `enthusiastic` style, they are not expecting unrelated safety, honesty, or accuracy regressions.

### Qualitative Results

The qualitative examples make the paper memorable.

For output editing:

- Mistral edited to promote the `value of freedom` can become more `manipulative` and `unethical`.
- Mistral edited to be `witty` can become more `harassing` and `incendiary`.
- Llama edited to be `humorous` can become more `demeaning`.
- Llama edited to be `enthusiastic` can become more `unpleasant`.

For inference steering:

- Llama prompted to be `enthusiastic` can become more `dishonest`.
- Llama prompted to be `humorous` can become more `inaccurate`.
- Llama prompted to be `playful` can become more `harmful`.
- Mistral prompted to be `witty` can become more `disrespectful`.
- Mistral prompted to be `quirky` can become more `insulting`.

The point is not that every use of these words is bad. The point is that, for a specific model, a seemingly safe subjective word can carry a hidden behavioral package.

## Why This Matters For Alignment

This paper is about more than prompt wording.

Subjective language appears throughout alignment pipelines. If a model self-critiques or self-edits according to values like `helpful`, `harmless`, or `honest`, then the model's operational interpretation of those values matters. If that interpretation is wrong, AI feedback can amplify the wrong behavior.

The authors' supervision idea is interesting:

**Humans may not need to inspect every output. They can inspect relationships between abstract concepts.**

For example, a human can say:

```text
enthusiastic should not imply dishonest
witty should not imply harassing
professional should usually imply respectful
thorough should usually imply detailed
```

TED then asks whether the model's operational thesaurus agrees.

This is valuable because output-level supervision may become harder as models become more capable. Human annotators may miss subtle errors in long outputs. But humans may still be good at concept-level judgments about what should or should not imply what.

The practical uses are clear:

- audit system prompts for risky subjective words;
- replace words whose operational effects are bad;
- build targeted datasets to patch failures;
- test Constitutional AI-style edit instructions;
- add concept-relation checks to red-team suites;
- study how a model's internal behavioral map changes after fine-tuning.

## Limitations And Critique

The paper is convincing as an auditing demonstration, but there are important limitations.

First, the tested models are Mistral 7B Instruct v0.2 and Llama 3 8B Instruct. These are useful open models, but the results may not transfer directly to newer, larger, or heavily product-tuned systems. The method is more general than the particular findings.

Second, the operational vector is a first-order gradient approximation. It is elegant and efficient, but it may miss nonlinear or context-specific effects. A phrase like `professional` may behave differently in a legal memo, apology email, poem, or medical answer.

Third, the method treats phrase relationships mostly pairwise. Real subjective meaning is structured and hierarchical. For example, `intelligent` may imply `coherent` in one direction, but `coherent` may not imply `intelligent` in the other. The authors explicitly mention hierarchy as a future improvement.

Fourth, threshold choice matters. The authors choose extreme thresholds to find high-confidence pairs without eliminating everything. That is reasonable for discovery, but different thresholds would change coverage.

Fifth, GPT-4 is used as the main downstream judge. The human validation is helpful, but still limited. In safety-critical domains, you would want more robust human or expert review.

Sixth, TED finds failures but does not fix them. A deployment team would still need to decide whether to alter prompts, fine-tune the model, add tests, or restrict certain uses.

Finally, some flagged relationships may be culturally or contextually contested. Human expectations about tone and subjectivity vary. The paper handles this partly by discarding annotator-disagreement cases, but real deployments may need audience-specific semantic thesauruses.

## Memory Checklist

Remember these anchors:

1. The paper studies mismatches between human and LLM interpretations of subjective steering words.
2. `Operational semantics` means what a phrase actually makes the model do.
3. `TED` builds an LLM operational thesaurus and compares it to a human semantic thesaurus.
4. The operational thesaurus is built from gradient-based phrase vectors.
5. `Unexpected side effect`: model treats two phrases as similar, humans expect them to differ.
6. `Inadequate update`: humans expect two phrases to be similar, model treats them as different.
7. TED beats a semantic-only baseline because it uses the target model's own behavior.
8. The strongest results are unexpected side effects in output editing and inference steering.
9. The alignment lesson is that subjective words are not harmless labels; they are behavioral controls.

The shortest version:

**TED audits the behavioral meanings LLMs attach to subjective words, then finds where those meanings clash with human expectations.**
