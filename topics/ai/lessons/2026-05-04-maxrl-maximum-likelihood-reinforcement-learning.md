# MaxRL: Maximum Likelihood Reinforcement Learning

Source note: [materials/processed/ai/maxrl-maximum-likelihood-reinforcement-learning.md](../../../materials/processed/ai/maxrl-maximum-likelihood-reinforcement-learning.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)
3. [The Setting MaxRL Cares About](#the-setting-maxrl-cares-about)
4. [Why Ordinary Maximum Likelihood Is Not Enough](#why-ordinary-maximum-likelihood-is-not-enough)
5. [Why Plain RL Also Feels Unsatisfying](#why-plain-rl-also-feels-unsatisfying)
6. [The Core Intuition Behind MaxRL](#the-core-intuition-behind-maxrl)
7. [Why Pass-at-k Is Central](#why-pass-at-k-is-central)
8. [Why The Idea Is Appealing](#why-the-idea-is-appealing)
9. [Caveats And Open Questions](#caveats-and-open-questions)
10. [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

MaxRL is trying to solve a very specific mismatch in post-training for reasoning and coding models. In many real tasks, we care less about whether the model gets the first sample right and more about whether the model has high probability of producing a correct answer if we let it try a few times.

That setting is awkward for both standard maximum likelihood and standard RL.

Maximum likelihood is attractive because it has a clean statistical story, but it assumes we know what the correct target should be. Many reasoning and coding tasks do not work that way. There may be many valid outputs, and correctness is often available only through a verifier or execution result.

Plain RL handles verifier-based rewards more naturally, but many RL objectives still feel one step removed from what we actually want. They optimize expected reward under certain sampling dynamics, not directly the quantity users often care about: the probability that the model can produce at least one correct answer across a few attempts.

MaxRL's pitch is to bridge that gap. It reframes RL around something closer to a likelihood-of-success objective. That makes it especially relevant for correctness-based tasks such as code generation and mathematical reasoning, where pass-at-k matters a lot.

The project's headline claim is that MaxRL improves test-time scaling efficiency relative to GRPO-like baselines. If that generalizes, it is important because many practical systems sample multiple outputs anyway. In that regime, a method that better improves `probability of eventual success` can be more valuable than one that only nudges pass-at-1.

### Medium Takeaway

MaxRL is interesting because it turns RL for reasoning into a `success-likelihood` problem. The main conceptual move is to ask not only "what reward did this sample get?" but "how much probability mass is the model placing on correct outcomes?"

## Full-Length Version

## The Setting MaxRL Cares About

MaxRL is built for tasks like:

- code generation,
- mathematical reasoning,
- structured problem solving,
- other domains where outputs are graded by correctness.

These tasks have an important property: there may be many acceptable answers, and what matters is whether the model can land on one of them.

That is already different from ordinary supervised imitation. In supervised learning, you often have a target answer string. In correctness-based reasoning, you may only know whether the sampled answer passed or failed a checker.

This is why the setting naturally invites RL. But MaxRL says that even standard RL framings may not be the cleanest match.

## Why Ordinary Maximum Likelihood Is Not Enough

Maximum likelihood is powerful when the dataset gives you the answer you want to imitate. But correctness-based tasks often do not come packaged that way.

Consider a coding problem. There may be many correct programs. The dataset may contain one canonical solution, but the model's actual job is not to reproduce that exact string. The job is to produce *a* correct program.

Similarly in mathematics, many solution traces can be valid. What matters is correctness, not exact target matching.

So maximum likelihood can feel too rigid:

- it binds you to provided strings,
- it may not reflect equivalence classes of good answers,
- it underuses verifier information.

That makes pure supervised likelihood awkward as the main post-training story.

## Why Plain RL Also Feels Unsatisfying

RL is more natural because it can optimize against correctness signals without needing one exact target output.

But RL objectives are still not automatically identical to what users want. In many deployments, users care about `pass-at-k`: if the model gets several tries, what is the chance at least one answer is correct?

That objective is subtly different from just maximizing the average reward of one sampled trajectory. A method can improve one-sample reward in ways that do not translate efficiently into multi-sample success.

MaxRL's appeal is that it tries to align the optimization target more directly with the probability of correct outcomes.

## The Core Intuition Behind MaxRL

The central intuition is that, for each prompt, the model induces some success probability over correct answers. That probability acts like a kind of implicit likelihood of correctness.

MaxRL says post-training should try to increase that quantity more directly.

This is a clever move because it reconnects RL to one of the strongest habits in machine learning: likelihood thinking. The method says, roughly:

`Treat correctness as the thing that should accumulate probability mass, even when you only observe it through reward-like signals.`

That is conceptually cleaner than treating reasoning RL as just another generic reward-optimization problem.

## Why Pass-at-k Is Central

Pass-at-k is not a side metric here. It is the heart of the motivation.

In many code and reasoning systems, users do not stop at one sample. They let the model try multiple candidates because:

- verifiers can filter outputs,
- users can inspect several solutions,
- one-shot reliability is still imperfect.

In that world, a model that distributes more mass over multiple plausible correct outputs can be much more useful than a model that only marginally sharpens its first-best guess.

That is why the project emphasizes improved test-time scaling efficiency. The claim is not just "we are better on average reward." The claim is that the model becomes better at turning additional samples into additional success.

## Why The Idea Is Appealing

There are several reasons this framing is attractive.

### 1. It matches what users often want

Users frequently care about `eventual correct answer under a few tries`, not only `first token-perfect sample`.

### 2. It respects correctness-based supervision

The approach fits domains where verifiers are available but exact canonical outputs are not.

### 3. It gives a cleaner story than generic reward chasing

By tying RL back to success likelihood, the method feels more statistically principled than a purely heuristic reward-maximization framing.

### 4. It speaks to inference-time scaling

If multi-sample usage is important, then pass-at-k efficiency is a meaningful target rather than a cosmetic secondary metric.

## Caveats And Open Questions

The obvious caution is that project-page claims are not the same as a deeply stress-tested research consensus.

Important questions include:

- how robust MaxRL is across model families,
- whether gains hold under different verifiers,
- whether pass-at-k improvements come with undesirable side effects,
- whether the objective remains stable at larger scales,
- how it compares against other recent correctness-oriented RL formulations beyond the showcased baseline.

So the right stance is interested but not unquestioning.

## Memory Checklist

- MaxRL is motivated by correctness-based reasoning and coding tasks.
- It tries to bridge maximum likelihood intuition and RL-based supervision.
- The central object is probability of correct outcomes, not only one-sample reward.
- Pass-at-k is core to the motivation, not a side metric.
- The big open question is whether the reported efficiency gains generalize broadly.
