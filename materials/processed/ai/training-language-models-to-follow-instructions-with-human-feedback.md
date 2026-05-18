# Training Language Models To Follow Instructions With Human Feedback

Source: `https://arxiv.org/abs/2203.02155`
Authors: Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, John Schulman, Jacob Hilton, Fraser Kelton, Luke Miller, Maddie Simens, Amanda Askell, Peter Welinder, Paul F. Christiano, Jan Leike, Ryan Lowe
Published: `2022`
Accessed: `2026-05-18`
Extraction engine: `canonical arXiv metadata plus structured manual ingest`
Strategy: `InstructGPT RLHF pipeline normalization and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; post-training; instruction tuning; RLHF`

## Summary

This is the InstructGPT paper, the landmark work that made the modern LLM RLHF pipeline concrete at scale. The paper trains GPT-3-style models to follow user instructions by combining human demonstrations, human preference comparisons, reward modeling, and PPO.

The canonical recipe is:

1. Supervised fine-tuning on human-written demonstrations.
2. Reward modeling from pairwise comparisons of model outputs.
3. Reinforcement learning with PPO against the reward model, controlled by a penalty that keeps the policy near the supervised/reference model.

The headline result is that much smaller InstructGPT models are preferred by human labelers over much larger GPT-3 models for instruction-following prompts. The paper also reports improvements in truthfulness and toxicity relative to the base model, while noting tradeoffs and regressions on some public NLP benchmarks.

## Core Mechanism

The paper separates three kinds of human data:

- demonstrations, where labelers write good answers;
- comparisons, where labelers rank or choose between model answers;
- evaluations, where held-out labelers judge model quality.

This separation matters. Demonstrations teach the model the broad format of helpful instruction following. Comparisons teach a reward model what humans prefer among candidate outputs. PPO then searches for outputs that score well under that learned reward while remaining close to the starting policy.

## Detailed Paper Notes

The paper's starting point is that pretraining scale alone does not make a model aligned with user intent. A large model may be more capable than a small one, but still continue prompts instead of following instructions, produce untruthful answers, generate toxic completions, or optimize for text likelihood rather than usefulness. The alignment target is therefore behavioral: outputs should be helpful, truthful, and harmless according to the labeler guidelines and user prompts.

The pipeline has three stages. First, supervised fine-tuning trains the model on labeler-written demonstrations. This gives the model an initial assistant-like policy. Second, reward modeling trains a separate model on rankings of outputs for the same prompt. This model learns which outputs labelers prefer. Third, PPO optimizes the SFT policy against the reward model while using a KL-style constraint to keep the policy close to the reference distribution.

The data sources matter. The paper uses labeler-written prompts and prompts submitted through the OpenAI API. This makes the prompt distribution closer to real user intent than a static academic benchmark. It also means labeler instructions and data collection design become part of the objective. RLHF is not just an algorithmic trick; it is a socio-technical pipeline.

The headline empirical result is that the 1.3B-parameter InstructGPT model is preferred to the 175B GPT-3 model on the authors' prompt distribution, despite being much smaller. This is the core evidence that post-training can move the user-facing quality frontier more than raw scale alone. The paper also reports improvements in truthfulness and reductions in toxic output relative to GPT-3, with minimal regressions on many public NLP datasets.

The paper is careful that InstructGPT still makes mistakes. It does not solve alignment in a broad philosophical sense. It aligns models better to the labeler-specified instruction-following objective. The reward model can still be overoptimized, and labeler preferences can favor answers that sound good but are not correct.

The lasting contribution is the operational decomposition: demonstrations teach the behavior format, comparisons define a preference reward, PPO performs policy improvement, and held-out human evaluation checks whether users actually prefer the result. This became the reference RLHF recipe for ChatGPT-era models.

## Why It Matters

InstructGPT became the practical standard for aligning general-purpose language models to user-facing instruction following. It is the bridge from earlier preference-learning research to the ChatGPT-era alignment stack.

For research prep, this paper is useful because it exposes the engineering decomposition behind RLHF: data collection, labeler instructions, supervised warm-starting, reward-model training, policy optimization, evaluation, and safety side effects. RLHF is not one objective. It is a pipeline whose behavior depends on every stage.

## Limitations And Caveats

- Preference labels can reward answers that sound helpful without being correct.
- PPO can overoptimize the learned reward model.
- Labeler instructions and demographics shape the objective.
- Alignment to instruction following is not the same as solving long-horizon safety, agency, or truthfulness.
- Some benchmark performance can regress when optimizing for helpfulness and preference.

## Study Questions

1. Why does InstructGPT use supervised fine-tuning before reward-model RL?
2. What does the reward model learn that demonstrations alone do not teach?
3. Why can a smaller aligned model beat a larger base model in human preference?
4. Where can reward hacking or preference misspecification enter the pipeline?
