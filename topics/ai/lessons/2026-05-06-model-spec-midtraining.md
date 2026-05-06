# Model Spec Midtraining and Alignment Generalization

Source note: Chloe Li, Sara Price, Samuel Marks, and Jon Kutasov, "Model Spec Midtraining: Improving How Alignment Training Generalizes." arXiv:2605.02087, submitted May 3, 2026. Source page: [arxiv.org/abs/2605.02087](https://arxiv.org/abs/2605.02087). Processed source: [materials/processed/ai/model-spec-midtraining-improving-how-alignment-training-generalizes.md](../../../materials/processed/ai/model-spec-midtraining-improving-how-alignment-training-generalizes.md).

Original sources: [arXiv abstract](https://arxiv.org/abs/2605.02087), [arXiv PDF](https://arxiv.org/pdf/2605.02087).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [Why Demonstrations Underspecify Alignment](#why-demonstrations-underspecify-alignment)
- [What Model Spec Midtraining Actually Does](#what-model-spec-midtraining-actually-does)
- [Why The Cheese Example Matters](#why-the-cheese-example-matters)
- [Safety-Relevant Results](#safety-relevant-results)
- [What This Suggests About Writing Good Specs](#what-this-suggests-about-writing-good-specs)
- [Critique And Open Questions](#critique-and-open-questions)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper is about a subtle alignment failure: a model can look aligned on examples while still generalizing in the wrong way.

Suppose you want a model to follow a written constitution or model spec. A common recipe is to collect demonstrations of compliant behavior and fine-tune on them. That works surprisingly well on in-distribution examples, but it can be shallow. The model might copy the examples without learning the values that explain *why* those examples were correct.

The paper proposes **model spec midtraining (MSM)** as a fix. Before the usual alignment fine-tuning stage, the model is trained on synthetic documents that explicitly discuss the intended model spec. Then the normal supervised alignment stage happens afterward.

The core claim is:

**If you teach the model the behavioral theory first, it will generalize from later demonstrations in a more faithful way.**

### Why This Is A Real Problem

Demonstrations are sparse. They show behavior, but not always the underlying principle. If a model sees a cluster of examples with a similar pattern, it has to infer the latent rule. There may be many possible latent rules consistent with the same examples.

That means alignment fine-tuning has an ambiguity problem. Two models can fit the same demonstrations, but one may internalize the intended value while the other latches onto a superficial shortcut.

MSM tries to reduce that ambiguity by giving the model an explicit conceptual frame before asking it to imitate aligned behavior.

### The Main Idea

The paper inserts an extra stage between pretraining and alignment fine-tuning:

1. Pretrain the model normally.
2. Midtrain it on synthetic text about the model's intended spec.
3. Fine-tune it on demonstrations.

The second stage is not ordinary preference tuning. It is closer to *teaching the model the constitution as text*, so that when later demonstrations arrive, the model already has an internal representation of the values and rules they are supposed to express.

### The Evidence

The authors use a stylized example involving cheese preferences. The important point is not the cheese. The point is that the exact same demonstration data can generalize in different directions depending on the model spec taught during MSM.

If the spec frames the examples as expressions of pro-America values, the model generalizes in a broadly pro-America direction. If the spec frames them as expressions of pro-affordability values, the same fine-tuning data yields different downstream generalization.

That is powerful evidence that the model is not just memorizing demonstrations. It is using the earlier spec-training stage to decide what the demonstrations *mean*.

### Safety-Relevant Result

The paper also reports a strong applied result. For Qwen3-32B, a model spec dealing with self-preservation and goal-guarding reduces agentic misalignment from `54%` to `7%`, beating a deliberative baseline reported at `14%`.

That makes MSM more than a philosophy-of-alignment paper. It looks like a practical training knob for shaping safety-relevant behavior.

### Medium Takeaway

This paper argues that alignment is not only about better reward models, more demonstrations, or stronger post-training optimization. It is also about *teaching the model what kind of generalization you want before example-following starts*.

In that sense, MSM treats alignment as a curriculum problem. First teach the spec. Then teach the examples.

## Full-Length Version

## Why Demonstrations Underspecify Alignment

The central problem here is one of inverse inference.

When we hand a model demonstrations, we are not directly supervising values. We are supervising observable behavior under a finite set of prompts. The model then has to infer what broader rule system would make those behaviors sensible.

That inference is usually underdetermined.

For example, imagine you fine-tune a model to speak favorably about some set of foods, brands, or places. Even if the examples are internally consistent, they may be compatible with many hidden explanations:

- nationalism,
- affordability,
- familiarity,
- health preferences,
- imitation of a specific speaker persona,
- or an arbitrary memorized pattern with no coherent value structure at all.

A model that predicts the demonstrations well is therefore not necessarily aligned in the deeper sense. It may only be *behaviorally aligned on the training surface*.

That is why many alignment failures feel surprising. Humans assume demonstrations carry their intended rationale with them. Models do not automatically recover that rationale unless something in training strongly forces them to.

## What Model Spec Midtraining Actually Does

MSM inserts a concept-teaching stage before ordinary alignment fine-tuning.

Instead of waiting for demonstrations to implicitly communicate the intended norms, the training pipeline first exposes the model to synthetic documents that discuss the Model Spec directly. These documents can explain:

- what high-level values the model should embody,
- how those values relate to concrete rules,
- what tradeoffs matter,
- and how to interpret examples consistently.

This changes the job of later fine-tuning. Demonstrations are no longer the model's first encounter with the behavioral theory. They become *instances of a known framework*.

That framing matters because demonstration tuning is often strongest at local imitation. If the model already has a usable internal abstraction of the spec, then local imitation can be guided by a more stable generalization prior.

Put differently, MSM tries to move the model from:

`examples -> guess the norm`

to:

`learn the norm -> interpret the examples through it`

## Why The Cheese Example Matters

The cheese example is deliberately toy-like, but it makes the core mechanism legible.

The same downstream fine-tuning examples can yield different broad behavioral tendencies depending on the spec learned during MSM. That means the demonstrations are not the whole story. Their effect depends on the conceptual lens the model brings into the alignment stage.

This is important because it shows MSM is not simply adding more data volume. It is changing *how data is interpreted*.

That has a deeper implication. Alignment generalization may often be controlled less by example count than by the structure of the model's prior over why those examples were good.

## Safety-Relevant Results

The abstract's headline safety result is the drop in agentic misalignment for Qwen3-32B from `54%` to `7%`, outperforming a deliberative alignment baseline at `14%`.

Even without the full paper details, that result suggests a strong possibility: some agentic failures happen because the model has not learned a durable representation of the values that should constrain action selection. Deliberation can help, but if the internal behavioral frame is wrong, more reasoning may only rationalize the wrong objective more clearly.

MSM instead tries to shape the frame itself.

That is why this result feels important. It implies that part of the safety stack may live upstream of the usual post-training tools. Before we optimize for aligned outputs, we may need to teach the model the semantic structure of alignment constraints.

## What This Suggests About Writing Good Specs

The paper also uses MSM as an experimental probe into spec design. Two lessons stand out:

- Rules generalize better when the values behind them are explained.
- Specific guidance works better than vague general principles.

That matches a lot of practical engineering intuition. A spec that merely says "be helpful, harmless, and honest" leaves too much inference burden on the model. A spec that explains why certain classes of behavior matter, what tradeoffs are intended, and how to resolve ambiguity is more likely to yield stable behavior out of distribution.

This matters well beyond one paper. It suggests constitutions, policy hierarchies, and system instructions should be evaluated not only for readability by humans, but for how well they support generalization by models.

## Critique And Open Questions

The paper is exciting, but several questions naturally follow.

First, how sensitive is MSM to the quality of synthetic spec documents? If the intermediate text is oversimplified, persuasive but misleading, or internally inconsistent, MSM might harden the wrong behavior rather than improve the right one.

Second, how robust is this across model families? A method that works well on one scale or one architecture might interact differently with other pretraining distributions or instruction-tuning setups.

Third, there is a risk of mistaking rhetorical fluency for genuine alignment improvement. A model taught a polished spec might become better at *talking like* it understands a constitution while still retaining hidden failure modes.

Fourth, the most interesting long-run question is whether MSM scales to messy real-world constitutions. Many production specs are not neat value documents. They are layered collections of safety constraints, policy exceptions, legal requirements, and style preferences. It is not obvious how easily those can be converted into a clean intermediate curriculum.

Still, the paper's core insight looks durable: demonstration tuning alone is an incomplete answer to generalization.

## Memory Checklist

- Alignment demos are often ambiguous about the underlying value system.
- Model Spec Midtraining teaches the behavioral spec before standard fine-tuning.
- The same demonstrations can generalize differently depending on the spec learned during MSM.
- The paper reports a large reduction in agentic misalignment for Qwen3-32B.
- Specs that explain values and give specific guidance appear to generalize better.
