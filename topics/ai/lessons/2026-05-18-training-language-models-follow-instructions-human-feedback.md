# Training Language Models To Follow Instructions With Human Feedback

Source note: This lesson is based on Long Ouyang et al., "Training language models to follow instructions with human feedback," published in 2022. Source: [https://arxiv.org/abs/2203.02155](https://arxiv.org/abs/2203.02155). Processed source: [materials/processed/ai/training-language-models-to-follow-instructions-with-human-feedback.md](../../../materials/processed/ai/training-language-models-to-follow-instructions-with-human-feedback.md).

Filing note: This is filed normally under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md) as `post-training`, `instruction tuning`, `RLHF`, `reward modeling`, and `scale-context`.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This is the InstructGPT paper, the work that made the modern LLM RLHF pipeline the standard recipe for user-facing instruction-following models.

The paper starts from a clear problem: large pretrained language models know a lot, but they are not automatically good at following user instructions. They may continue text instead of answering, ignore the user's intent, produce unsafe completions, or optimize likelihood rather than helpfulness.

The solution is a three-stage post-training pipeline:

1. Supervised fine-tuning on human demonstrations.
2. Reward modeling from human comparisons between model outputs.
3. PPO optimization against the reward model, with a constraint that keeps the policy near the supervised/reference model.

The paper's headline result is that smaller InstructGPT models can be preferred by human labelers over much larger GPT-3 base models on instruction-following prompts. That result matters because it shows that alignment data and objective choice can matter as much as raw scale for user-facing behavior.

The paper also reports safety-relevant side effects: improved truthfulness and reduced toxicity relative to GPT-3 in many evaluations, though not a complete solution and not without benchmark tradeoffs.

The core lesson is that RLHF is a pipeline, not a magic reward. Demonstration quality, comparison data, reward-model fit, PPO stability, KL control, labeler instructions, and evaluation all shape the final model.

## Full-Length Version

### Research Question

The paper asks how to make large language models follow user instructions better using human feedback.

Pretraining teaches a model to predict internet text. That creates broad competence, but not necessarily a helpful assistant. A raw model might answer a question, roleplay, continue a prompt, imitate bad examples, or generate plausible but false content. The training objective does not distinguish these in the same way a user would.

InstructGPT reframes the task: train the model to produce outputs that human labelers prefer for instruction-following prompts.

### The Three-Stage Pipeline

The first stage is supervised fine-tuning. Human labelers write demonstrations of good answers to prompts. The model learns the basic shape of instruction-following behavior.

The second stage is reward modeling. For a prompt, the model produces multiple candidate outputs. Labelers compare or rank them. A reward model learns to predict which output humans prefer.

The third stage is reinforcement learning. PPO updates the language model to produce outputs that score highly under the reward model. A penalty keeps the policy close to the supervised or reference model so it does not drift too far in search of reward.

This is often summarized as:

`SFT -> reward model -> PPO`

### Why SFT Comes First

Supervised fine-tuning gives the model a good starting policy. Without it, reward-model RL would have to discover instruction-following behavior from sparse preference signals. SFT teaches the output format, style, and broad helpfulness pattern before RL begins.

The reward model then sharpens behavior among plausible assistant outputs. It can learn preferences that are hard to express as demonstrations alone: better completeness, better instruction adherence, clearer refusal behavior, or more useful explanations.

### Experiments And Results

The central evaluation is human preference on held-out prompts. Labelers compare model outputs and choose which answer they prefer.

The paper finds that InstructGPT models are strongly preferred to GPT-3 models, even when the InstructGPT model is much smaller. This is the result that made the paper a landmark: post-training can change the user-facing quality frontier.

The paper also evaluates truthfulness, toxicity, and performance on public NLP benchmarks. The aligned models improve on several human-facing safety and helpfulness dimensions, but they can regress on some academic benchmarks. That tradeoff is important: optimizing for instruction following is not identical to optimizing every benchmark.

### Why It Matters

This paper established the practical alignment stack for the ChatGPT era. It turned earlier language-model preference tuning into a scalable instruction-following training pipeline.

For research prep, it is especially useful because it decomposes alignment into operational parts:

- data collection,
- labeler guideline design,
- demonstration quality,
- comparison data,
- reward-model training,
- PPO optimization,
- KL control,
- held-out human evaluation.

Each part can fail. Each part can be improved.

### Limitations And Failure Modes

The reward model can be overoptimized. A policy can learn to produce outputs that the reward model scores highly but that humans would not actually prefer on careful inspection.

Labeler preferences are not identical to truth. A fluent confident answer may be preferred over a cautious correct one unless the task design and labeler instructions punish that.

Instruction following is not the same as full alignment. A model can become better at following user requests while still failing on long-horizon agency, hidden objectives, robust honesty, or downstream consequences.

The pipeline is expensive. It requires human demonstrations, comparisons, reward-model training, RL infrastructure, and ongoing evaluation.

### Critique

The paper is persuasive because it shows a concrete improvement in human preference and creates a reproducible training structure. Its open problem is that the preference objective remains a proxy. It can align model outputs to labeler judgments without guaranteeing deeper truthfulness, autonomy support, or long-term user benefit.

That distinction explains why later work explores better reward models, constitutional feedback, DPO, process supervision, uncertainty, rubrics, and interpretability-based rewards.

### Memory Checklist

- InstructGPT is the standard `SFT -> reward model -> PPO` RLHF paper.
- It trains for instruction following, not just next-token likelihood.
- Human demonstrations teach the initial assistant behavior.
- Human comparisons train the reward model.
- PPO optimizes the policy while KL/control keeps it near the reference.
- Smaller aligned models can beat larger base models in human preference.
- The pipeline improves helpfulness but does not solve all alignment problems.
