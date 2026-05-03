# Rishabh Agarwal ICLR 2026 Talk: Scaling RL At The Frontier

Source: `https://x.com/agarwl_/status/2049263264249368906`
Title: `The Hitchhiker's Guide to Frontier Reinforcement Learning`
Speaker: `Rishabh Agarwal, Periodic Labs`
Posted: `2026-04-28`
Event context: `ICLR 2026 Workshop on Scaling Post-Training for LLMs`
Duration: `28:45`
Ingested: `2026-05-03`
Extraction engine: `yt-dlp metadata/video download + ffmpeg audio/frame extraction + Whisper small.en transcript + Tesseract slide OCR + manual source review`
Local raw assets: `materials/inbox/x-2049263264249368906/` (ignored by git)

## Summary

Rishabh Agarwal's talk argues that reinforcement learning for frontier language models should not only be scaled on math and coding tasks with easy verification. If the goal is to accelerate science, RL compute should also be pointed directly at scientific problems where experimental data can supply reward signals. Periodic Labs is building this around physical laboratories: models propose or analyze scientific work, instruments produce measurements, and the training loop can use those measurements as feedback.

The concrete starting task in the talk is phase identification from X-ray diffraction data. A physical lab synthesizes materials, an XRD instrument measures diffraction patterns, and a model predicts which crystalline phases are present. The task matters because it is a bottleneck in high-throughput materials discovery, and it is weakly verifiable because predictions can be checked against the observed pattern and downstream refinement tools.

The talk then shifts from the science application to the systems problem: making RL work for very large mixture-of-experts language models. The central engineering point is that the RL algorithm can be conceptually simple while the reliable frontier-scale implementation is not. Agarwal focuses on train-inference discrepancy, MoE router replay, low-level kernel mismatches, asynchronous RL, off-policy correction, and the value of easy-to-tune stable algorithms.

The final theme is that scientific discovery changes which ML infrastructure problems matter. Laboratory and simulation feedback can be slow, scarce, and expensive compared with ordinary reward-model calls or unit tests. That makes asynchronous RL, stale-off-policy robustness, data efficiency, and closed-loop experiment proposal central problems for AI-for-science systems.

## Extraction Notes

- Downloaded the talk from the source X/Twitter post as an MP4 video.
- Kept a 1280x720 source video snapshot locally for review.
- Extracted a 16 kHz mono WAV audio track for transcription.
- Extracted 58 slide frames at 30-second intervals.
- Generated two contact sheets for quick visual review.
- Ran Tesseract OCR over the sampled frames to recover slide titles and key labels.
- Ran Whisper `small.en` over the audio to produce TXT, VTT, SRT, TSV, and JSON transcripts.
- Treated the transcript as a semantic aid rather than a verbatim authority because it contains ordinary speech-recognition errors around technical terms and names.
- Did not commit raw video, audio, frames, contact sheets, OCR, or transcript files.

## Talk Structure

| Time | Section | Main Point |
| --- | --- | --- |
| 00:00-01:30 | Motivation | Accelerating science may be the most valuable AI use case, and RL should be directed at scientific feedback rather than only math/code tasks. |
| 01:30-04:00 | Scientific loop | Scientific discovery has intelligence bottlenecks and experiment-throughput bottlenecks; Periodic wants AI scientists plus autonomous labs. |
| 04:00-07:30 | Phase identification | XRD-based phase identification is a real materials-science analysis bottleneck and is weakly verifiable. |
| 07:30-10:00 | RL scaling result | RL on experimental lab data improves scientific capability and appears to expand the model's capability, not merely increase reliability. |
| 10:00-13:30 | Scaling framework | Frontier RL should be judged by both asymptotic ceiling and compute efficiency; different recipes can have different ceilings. |
| 13:30-20:15 | Train-inference discrepancy | Even nominally on-policy RL can be mismatched because sampler and learner engines use different kernels, precision, and routing behavior. |
| 16:45-18:55 | Router replay | For MoEs, recording rollout routing decisions and replaying them during training can reduce mismatch and improve training stability, at infrastructure cost. |
| 18:55-20:15 | Kernel bugs | Low-level attention-kernel differences, including causal versus padding-causal behavior, can produce large train-inference KL mismatches. |
| 20:15-23:15 | Asynchronous RL | Synchronous rollout-then-train loops waste GPU time; async and Pipeline RL keep generation and training overlapped. |
| 23:15-25:50 | Off-policy correction | Async RL creates stale rollouts, so importance sampling and simple stable variants such as Masked-IS REINFORCE become important. |
| 25:50-28:40 | Scientific discovery frontier | Scientific reward functions may be high-latency simulations or physical experiments, making stale-off-policy robustness and data efficiency crucial. |

## Key Ideas

### Science As The RL Environment

The talk's strongest conceptual move is to treat nature as the environment. In a benchmark, a model receives a reward from a grader, unit test, or curated target answer. In a physical-science loop, the "grader" may be an actual measurement: an instrument reports what happened when a material was synthesized, a simulation evaluates a candidate structure, or a lab result confirms that a proposed recipe worked.

That makes scientific RL less like game-playing on a clean simulator and more like learning inside a slow, noisy, expensive feedback loop.

### Phase Identification As A Starting Point

Periodic starts with analysis rather than fully autonomous hypothesis generation. The example task is phase identification from XRD data:

1. an autonomous lab synthesizes a material;
2. an instrument collects an X-ray diffraction pattern;
3. the model predicts which crystalline phases are present;
4. refinement or other physics-based checks test whether the predicted phases explain the observed pattern.

This is a useful first target because it is both important and checkable. It is important because expert crystallographers often do this work manually. It is checkable because the prediction has to match a measured pattern, even if the verification is imperfect and domain-specific.

### RL Improves More Than Reliability

Agarwal distinguishes two effects of RL on the phase-identification task. First, RL can make the model's average answer quality approach what used to appear only in its best sampled outputs. That is the reliability story: the model already sometimes knows what to do, and RL makes it do that more often.

Second, the talk claims that best-of-many performance also rises during training. That matters because it suggests RL is not merely concentrating probability mass on already-known good answers. It is expanding the set of problems the model can solve.

### Scaling Curves Need Two Axes

The talk borrows a useful scaling-law lens from RL compute scaling work. For bounded metrics such as pass rate or reward, RL progress often looks sigmoidal. Two questions then matter:

- Ceiling: how high can this model, data, and recipe eventually get?
- Efficiency: how much compute does it take to approach that ceiling?

The practical lesson is that not every RL recipe merely changes speed. Some design choices can change the ceiling itself. If a recipe has a lower ceiling, more compute may not rescue it.

### Train-Inference Mismatch Is A Frontier Failure Mode

On-policy policy-gradient RL sounds like it should train on data from the current policy. At frontier scale, the talk argues that this is only approximately true.

There are usually two engines:

- a sampler engine such as vLLM or SGLang, which generates rollouts;
- a learner/trainer engine such as Megatron, which computes losses and weight updates.

Even with the same nominal weights, these engines can assign different token probabilities because of different kernels, precision choices, batching behavior, and implementation details. Policy-gradient math assumes the sampling policy and learning policy agree. If they do not, the training objective is quietly distorted.

This is especially dangerous because the run can look fine for a while and then fail. The talk frames this as a silent failure mode for large MoEs.

### MoEs Make The Mismatch Harder

Mixture-of-experts models add another source of mismatch: routing. The router decides which experts process each token. If the inference engine and training engine make different routing decisions, then the same token under the same nominal model may travel through different expert paths.

That changes the log probabilities used by the RL objective. In smaller dense models, train-inference mismatch may be mild enough to ignore. In frontier MoEs, the talk argues that you have to engineer around it.

### Router Replay

Router replay is the main MoE mitigation described in the talk.

During rollout, the system records which experts the router selected for each token. During the training forward pass, it reuses those routing decisions instead of rerunning the router. This makes the training path match the inference path more closely.

The benefit is more stable learning dynamics, measured in the talk with effective sample size. The cost is systems complexity: routing decisions must be captured, transported, stored, and replayed without destroying throughput.

### Kernel Bugs Become RL Bugs

At this scale, infrastructure details can become learning problems. The talk describes a sequence-packing issue where `causal` and `padding_causal` attention kernels produced different attention outputs for the same inputs. The slide reports that this made train-inference mismatch 4x worse in KL for Kimi-K2.

The lesson is not simply "kernels can have bugs." The deeper lesson is that RL training can amplify tiny numerical or implementation differences because the objective depends on token probabilities. A low-level inference/training mismatch becomes a policy-gradient mismatch.

### Asynchronous RL

Synchronous RL alternates between generating rollouts and training on them. That is simple but wasteful. Rollouts finish at different times, so GPUs can sit idle while waiting for the slowest samples.

Async RL overlaps generation and training. As soon as rollouts are ready, they enter a buffer, and the trainer can start consuming them while more rollouts are being generated.

Pipeline RL pushes this further by keeping inference at a near-constant batch size. When a rollout finishes, another prompt takes its slot. Periodic's in-house Pipeline RL system, according to the talk, supports pausing and resuming inference during weight updates without quiescing or draining active requests.

### Stale Rollouts And Importance Sampling

Async RL creates a new problem: the data-generating policy may be older than the policy being trained. This is off-policy training.

Importance sampling corrects this by reweighting samples based on the probability ratio between the current policy and the old sampling policy. In principle, this lets the learner use stale data while still optimizing the current policy objective.

In practice, these corrections can be fragile. The talk's bias is pragmatic: avoid hard-to-tune algorithmic machinery unless it clearly pays for itself at scale.

### Masked-IS REINFORCE

The stable method highlighted near the end is Masked-IS REINFORCE for MoE RL. The idea is to use importance sampling, but mask out the small fraction of tokens with large train-inference mismatch. The slide claims this is usually less than 0.02% of tokens or lower.

That is a very systems-flavored algorithmic choice. Instead of pretending the mismatch is gone, the learner explicitly ignores the tokens where the mismatch is too large to trust.

## Why This Matters

The talk is useful because it connects three levels that are often discussed separately.

At the application level, it says scientific discovery needs models trained against real feedback from experiments and instruments.

At the modeling level, it says RL can improve scientific-analysis capability, not only benchmark reasoning.

At the systems level, it says frontier RL depends on unglamorous details: sampler/learner consistency, MoE routing, GPU kernels, asynchronous rollout infrastructure, off-policy correction, and low-hyperparameter stable objectives.

The main takeaway is that "scale RL" is not a single knob. At frontier scale, the recipe includes the model, the data, the verifier, the rollout system, the trainer, the kernels, and the physical latency of the environment.

## Open Questions

- How far does the phase-identification result generalize to other scientific-analysis tasks?
- How much of the gain comes from RL compute versus the quality and quantity of Periodic's lab data?
- How robust are the reported scaling curves across different base models and physical-science domains?
- Can the same infrastructure handle the much harder hypothesis-generation loop, where rewards are slower and more expensive?
- How should systems choose among neural physics models, simulations, and physical experiments as reward sources with different cost and fidelity?
- What safety and oversight layers are needed before autonomous labs can close the loop at high throughput?

## One-Sentence Takeaway

The talk argues that frontier RL for AI science is not just about better reward algorithms; it is about building a consistent, asynchronous, high-throughput training system that can learn from slow, noisy, real experimental feedback.
