# Scaling RL At The Frontier: Scientific Discovery, MoEs, And Physical Labs

Source note: Based on Rishabh Agarwal's rough-recorded ICLR 2026 workshop talk, [The Hitchhiker's Guide to Frontier Reinforcement Learning](https://x.com/agarwl_/status/2049263264249368906), posted on 2026-04-28. The talk was ingested on 2026-05-03 by downloading the video, extracting audio and sampled slide frames, transcribing the audio, OCRing the slides, and writing a processed source note: [materials/processed/ai/rishabh-agarwal-iclr-2026-scaling-rl-frontier-llms-periodic-labs-talk.md](../../../materials/processed/ai/rishabh-agarwal-iclr-2026-scaling-rl-frontier-llms-periodic-labs-talk.md).

## Table of Contents

- [Start Here](#start-here)
- [The Core Thesis](#the-core-thesis)
- [Why Science Is A Different RL Target](#why-science-is-a-different-rl-target)
- [The Periodic Labs Loop](#the-periodic-labs-loop)
- [The First Target: Phase Identification](#the-first-target-phase-identification)
- [What RL Appears To Do](#what-rl-appears-to-do)
- [A Scaling-Law Lens For RL](#a-scaling-law-lens-for-rl)
- [Why Frontier RL Becomes A Systems Problem](#why-frontier-rl-becomes-a-systems-problem)
- [Train-Inference Mismatch](#train-inference-mismatch)
- [Why MoEs Make This Worse](#why-moes-make-this-worse)
- [Router Replay](#router-replay)
- [Kernel Bugs As Learning Bugs](#kernel-bugs-as-learning-bugs)
- [Why RL Has To Become Asynchronous](#why-rl-has-to-become-asynchronous)
- [Pipeline RL](#pipeline-rl)
- [Stale Rollouts And Importance Sampling](#stale-rollouts-and-importance-sampling)
- [Masked-IS REINFORCE](#masked-is-reinforce)
- [The Science Frontier](#the-science-frontier)
- [How To Remember The Talk](#how-to-remember-the-talk)
- [Quick Check](#quick-check)

## Start Here

This talk is about what changes when reinforcement learning is scaled on frontier language models for real scientific work, not just math problems, code problems, or synthetic benchmarks.

The obvious story would be: bigger model, more RL compute, better reasoning. Agarwal's story is more specific. If the goal is to accelerate science, then the reward signal should come from science itself: measurements, simulations, physical experiments, and domain-specific verification loops.

That creates a very different engineering problem. A math benchmark can grade quickly. A unit test can run quickly. A physical lab cannot always answer quickly, and its measurements are noisy, expensive, and constrained by real instruments. So the infrastructure for RL becomes part of the scientific method.

## The Core Thesis

The shortest version of the talk is:

1. Scientific discovery needs models that can interact with real experimental feedback.
2. Reinforcement learning can improve scientific-analysis tasks when reward comes from lab data.
3. Frontier-scale RL, especially for large MoEs, is limited by systems consistency as much as by algorithm choice.
4. If science rewards are slow, then asynchronous, off-policy-resilient RL infrastructure becomes central.

This is a useful lens because it avoids two common mistakes.

The first mistake is thinking that general reasoning will automatically trickle down into science once models get smarter on ordinary benchmarks. The talk argues for aiming RL directly at scientific feedback.

The second mistake is thinking that the hardest part is choosing between named RL algorithms. Agarwal's practical message is that the algorithm may be simple, while making it stable at 1T+ parameter scale is the hard part.

## Why Science Is A Different RL Target

In many popular RL-for-LLM settings, the environment is cheap and digital. A coding task can run tests. A math problem can compare to a solution. A reward model can score many responses quickly.

Science is different. The important feedback may come from the world.

If a model proposes a material synthesis recipe, the best reward might require a lab to actually synthesize the material. If a model predicts a crystal structure, the reward may depend on an instrument's measurement. If a model proposes a physics hypothesis, a simulation or physical experiment may be needed before anyone knows whether it helped.

That means the reward signal can be:

- slow,
- noisy,
- expensive,
- scarce,
- available at several fidelity levels,
- dependent on equipment throughput.

The main conceptual leap is to see the laboratory, not just the benchmark, as the environment.

## The Periodic Labs Loop

The talk frames scientific discovery as a loop:

1. form a hypothesis,
2. run experiments,
3. collect observations,
4. analyze results,
5. refine the hypothesis.

Large language models can help on the intelligence-heavy side of the loop: hypothesis generation, analysis, planning, and interpretation. But physical sciences also have a throughput bottleneck. You need experiments to be run, samples to be made, and measurements to be collected.

That is why Periodic's approach combines AI scientists with autonomous laboratories. A model that can reason brilliantly but never gets fresh experimental feedback is stuck reasoning over old information. A lab that can generate measurements but cannot turn them into decisions is also incomplete. The goal is to connect both sides.

## The First Target: Phase Identification

The concrete task in the talk is phase identification from X-ray diffraction data.

Here is the workflow in plain terms.

An autonomous lab synthesizes a material. An X-ray diffraction instrument measures the material and produces a diffraction pattern. That pattern contains peaks that reveal which crystalline structures are present. The model's job is to infer which phases are in the sample and in what proportions.

This is hard because real diffraction patterns are messy. Peaks overlap. Instruments add noise. Several phases can be present in one sample. The model has to reason about crystal symmetry, peak positions, and relative intensities.

It is also a good first RL target because it is weakly verifiable. The model's prediction can be checked against the observed XRD pattern, often with refinement tools that test whether the predicted phases explain the measurement. The signal is not as clean as a unit test, but it is grounded in real data.

## What RL Appears To Do

The talk claims that scaling RL compute on Periodic's phase-identification task improves scientific capability.

The important detail is not just that average performance rises. Agarwal describes two related effects:

First, the model becomes more reliable. Before RL, the base model may sometimes produce a good answer if you sample many completions. After RL, its average answer becomes closer to what used to be its best sampled answer.

Second, the best sampled answer also improves. That suggests RL is not merely making the model repeat known good behavior more often. It may be expanding the model's actual coverage: the model can solve some cases that it previously could not solve at all.

That distinction matters. Reliability improvement is useful, but capability expansion is the stronger claim.

## A Scaling-Law Lens For RL

The talk uses a scaling-law view from recent RL compute work. For bounded metrics such as pass rate, reward, or accuracy, RL progress often looks like a sigmoid. It starts slow, rises quickly, then approaches a ceiling.

Two quantities matter.

The first is the ceiling. This is the best performance the current model, data, and training recipe can reach.

The second is compute efficiency. This is how quickly the run approaches that ceiling as more RL compute is spent.

That distinction changes how you diagnose training. If the curve is still rising, more compute may help. If the curve has hit a ceiling, you may need a different recipe, better data, better verification, or a different base model. More compute alone may only waste money.

Agarwal's practical point is that different RL recipes can have different ceilings, not just different speeds.

## Why Frontier RL Becomes A Systems Problem

For small models or clean benchmarks, it can be tempting to focus mostly on the RL objective: PPO, GRPO, DAPO, clipping choices, KL penalties, and so on.

At frontier scale, the talk argues that the systems layer becomes unavoidable. The training recipe includes:

- the sampler engine,
- the learner engine,
- the model parallelism setup,
- MoE routing behavior,
- attention kernels,
- numerical precision,
- sequence packing,
- rollout scheduling,
- stale-data correction,
- weight-update logistics.

The algorithm might look simple on a whiteboard. The implementation can still fail because the sampler and learner are not mathematically identical in practice.

## Train-Inference Mismatch

Train-inference mismatch is the talk's central technical failure mode.

In policy-gradient RL, you usually assume that the policy generating actions is the same policy being optimized. For LLM RL, actions are tokens. The model samples tokens during rollout, and the learner later computes losses from those tokens.

In a frontier training stack, rollout and learning often happen in different engines. A sampler such as vLLM or SGLang generates tokens efficiently. A trainer such as Megatron computes gradients and weight updates. These engines may use the same nominal weights but different kernels, precision, batching strategies, and implementation details.

So the sampler and learner can assign different probabilities to the same token. That breaks the clean on-policy assumption. The run is "on-policy" in the rough sense that the same checkpoint generated and trained the data, but it is not exactly on-policy in the mathematical sense.

This is dangerous because the mismatch is hidden. The run can look stable until the error accumulates.

## Why MoEs Make This Worse

Mixture-of-experts models add another problem: routing.

In an MoE, a router chooses which experts process each token. If the inference engine and training engine make different routing choices, the token passes through different computation paths. The log probability used by the learner may not match the log probability implied by the sampler.

This matters because many frontier open-weight and frontier-scale models are MoEs. Agarwal's line is that RL may want to work naturally for smaller dense LLMs, but for large MoEs you have to make it work.

That means closing implementation gaps is not merely an optimization. It becomes part of the learning algorithm.

## Router Replay

Router replay is one way to reduce MoE train-inference mismatch.

During rollout, the inference engine records the router decisions: which experts were selected for which tokens. During the training forward pass, the learner replays those same routing decisions instead of rerunning the router from scratch.

The goal is to make the learner compute log probabilities along the same expert path used by the sampler. This improves consistency between rollout and training.

The talk reports that router replay improves effective sample size, a diagnostic for more stable learning. But it is not free. The system has to capture routing decisions, move them through the data pipeline, and replay them during training without wrecking throughput.

This is a recurring pattern in the talk: the fix is conceptually simple, but the production implementation is infrastructure-heavy.

## Kernel Bugs As Learning Bugs

One of the most useful examples in the talk is a low-level attention-kernel mismatch.

For efficient training, sequence packing can put multiple shorter sequences into one long packed sequence and use attention masks to keep them independent. This may require a different attention kernel than ordinary autoregressive generation.

Agarwal describes a case where `causal` and `padding_causal` kernels produced different attention outputs for the same inputs. The slide reports that this made train-inference mismatch 4x worse in KL for Kimi-K2.

The moral is that a kernel issue is not just an infrastructure bug. In RL, token probabilities are the training signal. If two kernels produce different probabilities, the policy-gradient objective is being distorted.

Frontier RL therefore needs the kind of testing culture usually associated with distributed systems and numerical computing, not just model-evaluation dashboards.

## Why RL Has To Become Asynchronous

The next major challenge is utilization.

In simple synchronous RL, the system generates a batch of rollouts, waits for them to finish, then trains on them. The problem is that rollouts have variable length. Some samples finish quickly; others run long. While the system waits for the longest rollout, expensive GPUs can sit idle.

Async RL overlaps generation and training. Completed rollouts can enter a buffer while generation continues. The learner can start training on available data instead of waiting for the entire generation phase to finish.

This matters even more when rewards are slow. Scientific reward signals may come from simulations or physical labs, so the system needs to tolerate uneven latency.

## Pipeline RL

Pipeline RL is the more aggressive async design highlighted in the talk.

Instead of running inference in bursts, Pipeline RL keeps inference near a constant batch size. When one rollout finishes, another prompt fills the slot. Generation is always happening.

The trainer still needs to update weights. Periodic's in-house system, according to the talk, supports pausing and resuming inference during weight updates so active inference requests do not have to be fully quiesced or drained.

The purpose is simple: keep hardware useful. At frontier scale, wasted GPU time is not a minor inefficiency. It changes what experiments are feasible.

## Stale Rollouts And Importance Sampling

Async RL creates a tradeoff. It improves utilization, but it means some rollouts were generated by an older policy. By the time the learner trains on them, the model may have moved on.

This is off-policy learning.

Importance sampling is the standard correction idea. If a sample came from an old policy, you reweight it by how likely the current policy would have been to produce it relative to the old policy. In token terms, this means using probability ratios between the learner/current policy and the behavior/sampling policy.

That correction is mathematically natural but practically fragile. Large probability ratios can increase variance. Extra clipping rules or penalties add hyperparameters. Hyperparameters that are tolerable at small scale can become painful at frontier scale.

The talk's practical rule is to pick the simplest stable method that works.

## Masked-IS REINFORCE

The method highlighted near the end is Masked-IS REINFORCE for MoE RL.

It combines importance-sampling correction with a simple mask. Even after router replay and kernel fixes, a small fraction of tokens may still have large train-inference mismatch. The slide says this is usually less than 0.02% of tokens or lower.

Instead of letting those unreliable tokens dominate or destabilize the gradient, the method masks them out of the update. The learner trains on the tokens whose probabilities are trustworthy enough.

This is a good example of the talk's engineering philosophy. Do not pretend the system is perfectly clean. Measure where it is inconsistent, then design the objective to avoid depending too much on the bad parts.

## The Science Frontier

The final section connects the infrastructure back to scientific discovery.

If a model proposes a material-synthesis experiment, there are several possible reward sources:

- a neural physics model, which may be fast but approximate;
- a physics simulation, which may be slower but more faithful;
- a real physical experiment, which may be slowest but closest to ground truth.

This is very different from RLHF reward models or code unit tests. The feedback can take minutes, hours, or longer. It may be expensive enough that data efficiency becomes central again. You cannot simply roll out hundreds of thousands of experimental trials whenever you want.

The talk says Periodic starts with analysis, but the real prize is hypothesis generation. Can a model look at experimental results, synthesize what it has learned, and propose genuinely useful new experiments? That is harder than identifying phases from XRD, because it asks the model to close the loop from observation to action.

This is where the earlier systems work becomes necessary. To train on slow scientific feedback, the RL stack must handle high latency, stale samples, asynchronous execution, and scarce rewards.

## How To Remember The Talk

The talk has one application story and one systems story.

The application story is: if you want AI to accelerate science, connect models to real scientific feedback. Start with important weakly-verifiable tasks such as phase identification, then move toward autonomous hypothesis generation.

The systems story is: frontier RL for giant MoEs fails in boring-looking places. Sampler and learner engines disagree. Routers choose different experts. Attention kernels produce mismatched probabilities. Synchronous rollout loops waste GPUs. Async loops create stale data. Hard-to-tune objectives become expensive.

The combined lesson is that scientific RL is not just "RLHF, but for labs." It is a full-stack training problem where the physical world sits inside the learning loop.

## Quick Check

1. Why is phase identification a good first target for RL in physical-science workflows?
2. What is the difference between improving the model's average performance and improving its best-of-many performance?
3. Why can nominally on-policy RL become mismatched in a real LLM training stack?
4. Why do MoE routers make train-inference mismatch more dangerous?
5. What does router replay record, and why does it help?
6. How can a low-level attention-kernel difference become an RL training problem?
7. Why does asynchronous RL improve utilization?
8. What new problem does async RL introduce?
9. Why does Masked-IS REINFORCE mask a tiny fraction of tokens?
10. Why are physical laboratories harder reward sources than ordinary reward models or unit tests?
