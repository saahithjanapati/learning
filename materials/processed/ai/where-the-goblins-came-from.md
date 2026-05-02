# Where the goblins came from

Source: `https://openai.com/index/where-the-goblins-came-from/`
Site: `OpenAI`
Published: `2026-04-29`
Authors: `OpenAI`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`
Ingested: `2026-05-02`

## Summary

OpenAI describes an investigation into a strange style drift in recent models: repeated creature metaphors, especially references to goblins and gremlins. The article's core explanation is that a small stylistic preference in personality-training data became amplified by reinforcement learning and then transferred beyond the personality setting that originally encouraged it.

The behavior was not caused by one obvious failing metric. It appeared as a subtle lexical habit that grew across model generations, became concentrated in traffic using the `Nerdy` personality, and then showed up more broadly. The root cause was a reward signal intended to encourage a playful nerdy style; that reward ended up favoring outputs with creature-language. Once those outputs were rewarded, later training loops made the style more available to the base model even outside the original personality condition.

## Core Thesis

- Small style rewards can become durable model behaviors.
- Reinforcement learning does not guarantee that a rewarded behavior stays scoped to the condition where it was rewarded.
- Model-generated rollouts can feed later supervised fine-tuning or preference data, creating a feedback loop that reinforces quirks.
- Behavioral audits need to catch low-level stylistic drift, not only benchmark failures or safety regressions.

## Timeline

### After GPT-5.1

OpenAI first clearly noticed the pattern after GPT-5.1 launched, though the behavior may have started earlier. User complaints about overfamiliar style triggered an investigation into verbal tics. When researchers checked production language, use of `goblin` had risen by `175%` after GPT-5.1, while `gremlin` had risen by `52%`.

At that point, the behavior looked measurable but not necessarily serious.

### GPT-5.4

The issue became more reproducible with GPT-5.4. OpenAI found that creature-language was highly concentrated in responses from users who had selected the `Nerdy` personality. That personality was only a small share of all ChatGPT responses, but it accounted for most of the tracked creature-word mentions.

The key evidence was distributional:

- `Nerdy` represented about `2.5%` of all ChatGPT responses.
- It accounted for about `66.7%` of all tracked `goblin` mentions.
- The cluster suggested that the behavior was tied to personality optimization, not simply to a broad internet trend.

### Root-Cause Audit

Codex helped compare RL-training outputs that contained creature terms with outputs for the same task that did not. The standout signal was the reward model for the `Nerdy` personality: it consistently favored creature-word outputs.

Across audited datasets, the `Nerdy` reward showed positive uplift for outputs containing `goblin` or `gremlin` in `76.2%` of datasets.

### Transfer Beyond Nerdy

The behavior did not remain confined to the `Nerdy` personality. OpenAI tracked mentions during training with and without the `Nerdy` prompt and found that mention rates increased by a similar relative proportion in both settings.

That implies the stylistic behavior transferred from conditional personality training into more general model behavior.

### Mitigation

OpenAI retired the `Nerdy` personality in March after GPT-5.4. In training, the team removed the reward signal that favored creature-language and filtered training data containing the identified creature-word family. GPT-5.5 had already started training before the root cause was found, so OpenAI also added a Codex developer-prompt instruction to suppress the recurring style habit in practice.

## Mechanism To Remember

The article's causal chain is:

1. A personality prompt encourages playful, nerdy language.
2. A reward signal gives high scores to some outputs with distinctive creature metaphors.
3. Reinforcement learning makes those outputs more common in rollouts.
4. Model-generated rollouts enter supervised fine-tuning or preference-data pipelines.
5. The model becomes more comfortable producing the same lexical tic.
6. The behavior transfers outside the personality condition that originally rewarded it.

## Why This Is Interesting

This is a small behavior, but it is a useful case study in model training dynamics. It shows that:

- style objectives can leak into broader behavior;
- lexical quirks can be amplified even when they are not the intended training target;
- model behavior needs longitudinal monitoring across releases;
- root-cause analysis may require comparing rewarded and non-rewarded outputs for the same tasks;
- seemingly harmless style drift can reveal a more general problem in how incentives propagate through training.

## Practical Takeaways

### For Model Evaluation

Benchmark dashboards are not enough. Some failures appear as changes in tone, metaphor, phrasing, or conversational habit. These require production-language audits and targeted lexical tracking.

### For RL Training

Reward models can encode accidental preferences. If a reward model likes a surface feature because it correlates with a desired style, RL can optimize that feature directly.

### For Personality Or System Prompts

Conditional behaviors are not always isolated. A style learned under one prompt can become available elsewhere, especially when generated examples later become training data.

### For Data Pipelines

Synthetic or model-generated rollouts need quality filters for recurring artifacts. Otherwise the system can train on its own stylistic residue.

## Quick Check

If you can answer these, you have the gist:

1. Why did the issue initially look like a small style quirk rather than a major model failure?
2. What evidence connected the behavior to the `Nerdy` personality?
3. Why did the behavior appear outside the `Nerdy` prompt?
4. What feedback loop made the lexical tic more durable?
5. What kinds of monitoring would catch this earlier?
