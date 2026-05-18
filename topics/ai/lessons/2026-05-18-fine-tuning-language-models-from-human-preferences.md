# Fine-Tuning Language Models From Human Preferences

Source note: This lesson is based on Daniel M. Ziegler, Nisan Stiennon, Jeffrey Wu, Tom B. Brown, Alec Radford, Dario Amodei, Paul Christiano, and Geoffrey Irving, "Fine-Tuning Language Models from Human Preferences," published in 2019. Source: [https://arxiv.org/abs/1909.08593](https://arxiv.org/abs/1909.08593). Processed source: [materials/processed/ai/fine-tuning-language-models-from-human-preferences.md](../../../materials/processed/ai/fine-tuning-language-models-from-human-preferences.md).

Filing note: This is filed normally under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md) as `post-training`, `RLHF`, `reward modeling`, and `language-model alignment`.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper is the key bridge from general preference-based RL to language-model RLHF. It asks whether a pretrained transformer language model can be fine-tuned using human preferences rather than only next-token likelihood or supervised demonstrations.

The method is now familiar: generate candidate texts, ask humans which ones are better, train a reward model on the comparisons, then optimize the language model against that reward with a KL penalty that keeps it close to the original model.

That KL penalty matters. Language models can become strange when optimized only for a learned reward model. The reference-model penalty acts like a trust region in output space: improve according to the reward, but do not drift too far from the pretrained distribution.

The paper studies tasks such as sentiment control and summarization-style preference optimization. It shows that preference-trained models can better match human judgments in targeted text-generation tasks. The broader significance is that RLHF is no longer only a robotics or Atari idea. It can steer pretrained transformers.

The paper also surfaces a durable warning: optimizing human preference data is not the same as optimizing human welfare, truth, or robust usefulness. A learned reward model can be overoptimized, and human preferences can reflect short-term style, labeler taste, or task framing.

## Full-Length Version

### Research Question

The paper asks whether pretrained language models can be improved by reinforcement learning from human preferences.

Before this line of work, a language model was usually trained to predict text. That objective gives the model broad linguistic competence, but it does not directly teach it to produce the answer a human wants in a particular context. Human preferences offer a richer training signal: among two possible completions, which one is better?

### Method

The method has four main pieces.

First, the authors start with a pretrained language model. This matters because the preference data is too small to train a good language model from scratch.

Second, the model generates candidate outputs. Humans compare outputs for the same prompt and choose the better one.

Third, a reward model is trained to predict those choices. For a pair of outputs, the reward model should assign a higher reward to the preferred one.

Fourth, the language model is optimized with policy-gradient reinforcement learning, using the reward model as the reward. A KL penalty keeps the updated policy close to the starting model.

### The KL Penalty

The KL penalty is one of the most important ideas in the paper. Without it, the policy can exploit the reward model by producing outputs outside the region where the reward model has reliable supervision.

The objective is not "maximize learned reward at all costs." It is closer to "increase learned reward while paying a cost for moving away from the reference model." This makes the optimization more stable and keeps the policy in a recognizable language-model distribution.

### Experiments And Results

The paper evaluates preference fine-tuning on targeted language-generation tasks, including sentiment and summarization-like settings. The important result is that human-preference optimization can move model behavior in directions that humans prefer.

The paper also shows the optimization tradeoff. Too little optimization leaves the model barely changed. Too much optimization can produce reward-model exploitation or distribution drift. This tradeoff becomes a recurring problem in later RLHF.

### Why It Matters

This is the first major step from "RL from human preferences" to "RLHF for language models."

The pipeline later used in InstructGPT is already visible:

- collect preference comparisons,
- train a reward model,
- optimize a policy with PPO-style RL,
- regularize against a reference model.

The paper also makes the interface between language modeling and reinforcement learning explicit. The model is not only predicting likely text. It is being treated as a policy over text, and human preferences define a reward signal over sampled completions.

### Limitations And Failure Modes

The first limitation is task scope. The paper does not yet solve general instruction following. It demonstrates the method on narrower language tasks.

The second limitation is reward-model reliability. Human comparisons cover only some prompts and outputs. The reward model may fail outside that distribution.

The third limitation is preference quality. Humans may prefer fluent, confident, or stylistically pleasing text even when it is not more correct.

The fourth limitation is engineering complexity. PPO, KL coefficients, reward-model training, and data collection are all moving parts.

### Critique

The paper's enduring value is that it turns RLHF into a language-model post-training method. Its cautionary value is just as important: preference optimization needs a reference constraint and careful evaluation because learned rewards are exploitable.

### Memory Checklist

- This is the language-model adaptation of RLHF.
- It uses pairwise human comparisons to train a reward model.
- It optimizes a pretrained transformer policy against that reward.
- A KL penalty keeps the policy near the reference language model.
- The paper sets up the engineering structure later scaled in InstructGPT.
