# Reinforcement Learning for Knowledge Awareness - Paper Notes

Source: Kalomaze, "Reinforcement Learning for Knowledge Awareness"
Source URL: `https://kalomaze.bearblog.dev/rl-for-knowledge-awareness/`
Author/site: `kalomaze's kalomazing blog`
Captured: `2026-05-07`
Topic: `AI / Collection`
Tags: `post-training`, `reward modeling`, `interpretability`, `latent knowledge`, `knowledge awareness`

Processed source: [materials/processed/ai/reinforcement-learning-for-knowledge-awareness.md](../../../materials/processed/ai/reinforcement-learning-for-knowledge-awareness.md)
Lesson: [topics/ai/lessons/2026-05-07-rl-for-knowledge-awareness.md](../../../topics/ai/lessons/2026-05-07-rl-for-knowledge-awareness.md)

## Learner Recap

So this is really interesting. It's kind of like using internal hidden states as a source of reward signals. So like the model already knows something internally, but you're getting it to elicit explicit behavior from that internal knowledge. That's so cool. It's like a new way of doing post- like instead of training a separate reward model, the model is like looking in itself. And like kind of self-learning- or not really self-learning, but like you're using the model to teach itself almost.

## Normalized Takeaway

The useful mental model is: the model may already contain a latent distinction in its hidden states, but that distinction does not automatically show up as good outward behavior. A small learned readout can turn that latent distinction into a reward signal, and RL can then push the model to express the behavior explicitly.

This is not quite self-learning, because an external training loop still constructs the contrastive data, trains the reward head, and controls the RL objective. But it does feel like a form of model-internal supervision: the post-training signal is extracted from the model's own representations rather than from a separate judge model that only reads final text.

## Follow-Up Questions

1. When is the relevant behavior actually linearly readable from hidden states?
2. How do you prevent the policy from gaming the learned readout?
3. Is this closer to reward modeling, probing, activation steering, or interpretability-based supervision?
4. What would make this scale from one behavior, like fake-person knowledge awareness, to broad factual calibration?
