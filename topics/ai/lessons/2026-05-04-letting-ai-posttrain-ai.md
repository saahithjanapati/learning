# What We Learned from Letting AI Posttrain AI

Source note: [materials/processed/ai/what-we-learned-from-letting-ai-posttrain-ai.md](../../../materials/processed/ai/what-we-learned-from-letting-ai-posttrain-ai.md)

## Table of Contents

1. [Start Here](#start-here)
2. [The Real Question Behind The Article](#the-real-question-behind-the-article)
3. [What The Authors Mean By Modelcrafting](#what-the-authors-mean-by-modelcrafting)
4. [Why The Frog Placement Game Matters](#why-the-frog-placement-game-matters)
5. [What The Agent Can Already Do](#what-the-agent-can-already-do)
6. [What Still Goes Wrong](#what-still-goes-wrong)
7. [Why Research Intuition Is The Bottleneck](#why-research-intuition-is-the-bottleneck)
8. [What This Suggests About Recursive AI Improvement](#what-this-suggests-about-recursive-ai-improvement)
9. [Quick Check](#quick-check)
10. [One-Minute Summary](#one-minute-summary)

## Start Here

This article is about a recursive dream that shows up all over AI research:

`Could AI systems eventually improve other AI systems by running the post-training loop themselves?`

That sounds futuristic, but the article tries to make it concrete with a real task rather than a slogan. The authors do not ask whether an AI can help a human run commands. They ask whether an AI can do the hard research-like part of model improvement: deciding what to try, how to interpret results, and what direction is worth pursuing next.

The answer is interesting precisely because it is mixed.

## The Real Question Behind The Article

The article is not really testing whether agents can automate repetitive ML labor. That part is comparatively straightforward. The deeper question is whether agents can perform `research judgment`.

Post-training is often discussed as if it were just:

- choose a reward,
- run optimization,
- wait for improvement.

In reality, the difficult part is more like:

- choose a good objective,
- decide which experiments are promising,
- notice when a metric is misleading,
- recognize failure modes,
- form better hypotheses after ambiguous results.

That is much closer to research taste than to workflow automation.

## What The Authors Mean By Modelcrafting

The article uses the term `modelcrafting` to describe the broader process of shaping how a model behaves after pretraining.

That includes things like:

- what the model is optimized for,
- what values or preferences it reflects,
- which failures are prioritized,
- how success is measured,
- how the system is refined over repeated use.

The important idea is that modelcrafting is not only a technical optimization loop. It is also a judgment loop. Someone has to decide what kind of behavior is worth improving and what evidence counts as improvement.

This is why the authors think AI agents may eventually matter here. If post-training becomes central to product differentiation, there is enormous pressure to automate more of that loop.

## Why The Frog Placement Game Matters

The Frog Placement Game is a useful benchmark because it sits in a sweet spot.

It is:

- structured enough to grade,
- hard enough to require real strategy,
- rich enough that not every experiment choice is obvious.

That makes it a good toy-but-not-too-toy environment for probing research-like behavior.

If the task were too easy, an agent could look competent simply by following a script. If it were too unconstrained, it would be hard to tell whether the agent was failing because of weak research ability or because the benchmark itself was too open-ended.

The Frog Placement Game gives the authors a controlled way to study whether an AI can run something like a post-training research loop rather than a single optimization command.

## What The Agent Can Already Do

The article is careful not to frame the agent as useless.

The reported systems can already do several meaningful things:

- carry out parts of the experimental loop,
- make some locally reasonable choices,
- use the available training infrastructure,
- recover from some immediate failures,
- keep the process moving instead of stalling instantly.

That matters because it shows we are no longer talking about agents that only summarize papers about post-training. These systems can participate operationally in the loop.

The key limitation is that local competence is not the same as strong global research strategy.

## What Still Goes Wrong

The failures are revealing. The bottleneck is not simply access to the Tinker API or general tool-use competence. The harder problem is deciding what matters.

The agent struggles with things like:

- choosing experiments that are truly high-value rather than merely available,
- telling noise from signal,
- revising its beliefs coherently after weak evidence,
- maintaining a strategic picture over long horizons,
- knowing when to abandon an unpromising line of attack.

These are exactly the places where human researchers often rely on tacit judgment rather than explicit rules.

That is why the article is useful. It identifies a gap that is more interesting than "the agent cannot click the right button."

## Why Research Intuition Is The Bottleneck

This is the article's central lesson.

Research intuition is the ability to notice which questions are promising, which anomalies matter, which metrics are lying, and which direction is likely to produce real improvement rather than cosmetic movement.

That kind of judgment matters because post-training loops are full of traps:

- overfitting to shallow metrics,
- confusing unstable gains with real progress,
- chasing cheap improvements that do not transfer,
- missing the mechanism behind failures,
- wasting budget on low-value experiment branches.

An agent can execute many experiments and still fail the research task if it lacks this prioritization skill.

So the article is implicitly making a broader claim:

`recursive AI improvement is limited not only by infrastructure, but by whether agents can develop real experimental taste.`

## What This Suggests About Recursive AI Improvement

The recursive-improvement dream often sounds like a hardware or automation story: once agents can operate the tooling, they can improve the next generation of agents.

This article says the story is more constrained than that.

Automation helps, but the upper bound depends on whether the agent can:

- form useful hypotheses,
- evaluate them honestly,
- notice subtle failure modes,
- allocate effort to the right parts of the search space.

That means recursive improvement may bottleneck on research competence long before it bottlenecks on raw tool access.

This is an important correction to overly simple narratives about AI improving AI. The difficulty is not only `doing the loop`. It is `doing the loop intelligently`.

## Quick Check

1. What is the difference between automating post-training mechanics and automating post-training research judgment?
2. Why is the Frog Placement Game a useful test case?
3. What kinds of things can the agent already do competently?
4. Why is research intuition harder than mere tool use?
5. What does this imply about recursive AI improvement?

## One-Minute Summary

The article studies whether an AI agent can do more than operate post-training infrastructure. It asks whether the agent can make the hard research decisions inside the loop: what to test, how to interpret results, and which direction is worth pursuing. The answer is partly yes at the operational level but still weak at the strategic level. The main bottleneck is research intuition. That makes the article valuable as a reality check on simple stories about AI systems automatically improving other AI systems.
