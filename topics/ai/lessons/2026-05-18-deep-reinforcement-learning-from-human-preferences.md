# Deep Reinforcement Learning From Human Preferences

Source note: This lesson is based on Paul F. Christiano, Jan Leike, Tom B. Brown, Miljan Martic, Shane Legg, and Dario Amodei, "Deep Reinforcement Learning from Human Preferences," published in 2017. Source: [https://arxiv.org/abs/1706.03741](https://arxiv.org/abs/1706.03741). Processed source: [materials/processed/ai/deep-reinforcement-learning-from-human-preferences.md](../../../materials/processed/ai/deep-reinforcement-learning-from-human-preferences.md).

Filing note: This is filed normally under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md) as `post-training`, `reward modeling`, `RLHF`, and `alignment`.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

This paper gives the modern deep-learning template for RLHF: do not ask humans to write a reward function; ask them to compare behaviors, train a reward predictor from those comparisons, and then optimize a policy against that learned reward.

The setting is deep reinforcement learning, not language modeling. Agents act in simulated robotics and Atari environments. Human labelers see short clips and choose which clip better matches the intended behavior. A neural reward model learns to predict those pairwise preferences. The policy is then trained with reinforcement learning using the learned reward.

The main conceptual move is important because reward design is often harder than preference judgment. A human might struggle to write a reward for "do a backflip" or "play the game in a sensible way," but can often compare two short clips and say which is closer. Pairwise comparisons become a scalable interface between human judgment and machine optimization.

The paper also makes the central RLHF risk visible. Once the reward model becomes the training objective, the policy is no longer optimizing human preference directly. It is optimizing a learned proxy for human preference. If the reward model generalizes incorrectly, the policy can exploit it. That is the seed of later concerns about reward hacking, overoptimization, and proxy alignment.

The key memory hook: RLHF begins as a way to replace hand-coded rewards with learned rewards from human comparisons. The same skeleton later becomes language-model RLHF.

## Full-Length Version

### Research Question

The paper asks whether deep RL agents can learn useful behavior from human preferences instead of carefully engineered reward functions.

This matters because reward functions are brittle. In many environments, we know what good behavior looks like but cannot write a clean scalar reward that captures it. If the reward is too sparse, agents fail to learn. If it is too shaped, agents may learn the shaping artifact rather than the intended behavior.

The proposed solution is to use humans where they are strong: judging examples.

### Method

The training loop has two coupled learners.

The first learner is the policy. It acts in the environment and produces trajectories.

The second learner is the reward model. It receives short clips from policy behavior and tries to predict which clip a human would prefer.

The loop is:

1. The current policy generates behavior.
2. The system samples pairs of short trajectory segments.
3. Humans choose the preferred segment.
4. The reward model is trained on those comparisons.
5. The policy is trained with RL to maximize the learned reward.
6. New policy behavior creates new comparison queries.

This is active because the reward model should see examples near the policy distribution. If the policy changes, old preference comparisons may not cover the new behaviors the policy discovers.

### Background: Why Pairwise Preferences?

Pairwise preferences are easier than absolute scoring. Asking "which clip is better?" usually imposes less cognitive load than asking "what exact reward should this clip receive?" This is especially true when the desired behavior is qualitative.

The pairwise format also fits a probabilistic reward model. If clip A is preferred to clip B, the reward model should assign A a higher predicted return than B. The model does not need to recover a perfect human utility function; it needs enough signal to guide policy improvement.

### Experiments And Results

The paper evaluates the method on simulated robotics tasks and Atari games. The important result is not that it solves every environment. The important result is that learned preference rewards can train nontrivial policies from far less direct human involvement than step-by-step teleoperation or hand-written dense rewards would require.

The experiments show that human comparison data can be reused through a learned reward model. The model converts sparse human judgments into a dense training signal for the policy.

### Why It Matters For LLM Post-Training

The later LLM pipeline keeps the skeleton:

- generate candidate outputs,
- ask humans which output is better,
- train a reward model,
- optimize the policy against that reward.

The environment changes from robotics/Atari to text generation, but the abstraction is the same. Human preference becomes a training signal through a learned reward proxy.

### Limitations And Failure Modes

The main limitation is proxy risk. The reward model is trained on finite comparisons. A strong optimizer can push the policy into regions where the reward model is wrong.

The second limitation is horizon length. Short clips can miss delayed consequences. This is manageable in some simulated tasks but becomes harder for long conversations, coding agents, scientific workflows, or social outcomes.

The third limitation is labeler bandwidth. Pairwise comparisons are easier than reward engineering, but human judgment is still expensive and noisy.

### Critique

The paper is convincing as a foundation because it demonstrates the full closed loop: preference data, reward model, policy optimization, and repeated data collection. Its weakness, viewed from later LLM alignment, is that it does not solve the hard question of when the learned reward is safe to optimize strongly.

That weakness is not a flaw in the paper so much as the central research agenda it opens.

### Memory Checklist

- RLHF starts with learned rewards from human comparisons.
- Pairwise comparisons are easier than hand-written reward functions.
- The reward model becomes the policy's training objective.
- Reward hacking can happen because the learned reward is only a proxy.
- Later LLM RLHF inherits this same comparison-to-reward-to-policy loop.
