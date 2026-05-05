# Continually Improving Our Agent Harness

Source note: [materials/processed/ai/continually-improving-agent-harness.md](../../../materials/processed/ai/continually-improving-agent-harness.md)

## Table of Contents

1. [Start Here](#start-here)
2. [Why The Harness Matters](#why-the-harness-matters)
3. [How Cursor Thinks About Context](#how-cursor-thinks-about-context)
4. [How They Measure Improvement](#how-they-measure-improvement)
5. [Why Tool Errors Hurt More Than They Seem](#why-tool-errors-hurt-more-than-they-seem)
6. [Model-Specific Tuning As A Capability Multiplier](#model-specific-tuning-as-a-capability-multiplier)
7. [One-Minute Summary](#one-minute-summary)

## Start Here

This article is a strong reminder that coding-agent quality is not just a property of the base model. The same model can feel dramatically different depending on the harness around it: what context it sees, how tools behave, what gets summarized, which errors are surfaced, how latency is traded against quality, and how the product measures success.

Cursor's claim is that this harness work is cumulative. You do not usually get one magical breakthrough. You get many small, opinionated improvements stacked together until the agent feels faster, more reliable, and more useful.

## Why The Harness Matters

A common mistake is to imagine the model as the product and the harness as glue. This article argues for nearly the opposite view. The harness is where many of the most consequential product decisions live.

At a high level, the harness decides:

- what static context the agent always gets,
- what dynamic context it can fetch,
- how the product recovers from tool errors,
- what metrics count as progress,
- how different model families are adapted to the same UX.

That means the harness is not peripheral. It is part of the capability stack.

## How Cursor Thinks About Context

One of the most interesting parts of the article is the historical shift it describes. Earlier coding agents needed more hard-coded guardrails: lint outputs after every edit, manual file-read rewriting, strong restrictions on tool behavior, and more static context prepared in advance.

As models improved, Cursor says the optimal strategy changed. Instead of over-preparing everything up front, stronger models benefit more from dynamic context access and lighter guardrails. The harness still provides some stable starting information such as git status and recent files, but the trend is toward making the agent better at pulling the right context at the right time.

This is a useful broader lesson: context engineering is not a fixed recipe. It is coupled to model capability.

## How They Measure Improvement

The article is also valuable because it describes measurement in a more realistic way than "just run a benchmark."

Cursor says they use:

- public and internal eval suites,
- online A/B tests on real usage,
- latency and token-efficiency metrics,
- keep rate of agent-generated code,
- model-based interpretation of whether users seemed satisfied.

That mix matters. Benchmarks are fast and standardized, but they are still proxies. Real usage contains the messy parts that benchmarks cannot fully simulate, especially whether the agent actually solved the user's problem in a way that stuck.

The keep-rate idea is especially interesting because it tries to measure not just whether the model produced code, but whether the code survived real use without being rewritten away.

That survival framing is more subtle than raw acceptance rate. A user might briefly accept code and still replace it later because the change was shallow, brittle, or badly integrated. Keep rate is an attempt to capture whether the model's work actually held up inside the broader software-development loop.

## Why Tool Errors Hurt More Than They Seem

The article's notion of `context rot` is worth remembering. A failed tool call is not just a temporary inconvenience. It also pollutes the conversation state, burns tokens, and can change the model's later decisions because the failure becomes part of the remembered context.

That makes harness reliability research-like, not merely operational. A bug in a tool wrapper can degrade future reasoning even if the model is otherwise strong.

This is an important systems insight for agents generally. A weak intermediate step does not just fail locally. It changes the state from which future reasoning proceeds. That means reliability work compounds in both directions: better tooling can improve later reasoning, and small harness mistakes can propagate into much worse downstream behavior.

## Model-Specific Tuning As A Capability Multiplier

One of the clearest strategic ideas in the article is that early access to a new model is only the beginning. Cursor says they then spend weeks adapting the harness to that model's strengths and quirks.

This suggests an important frontier dynamic: model releases do not arrive as finished products. The product quality users feel often depends on how well the harness has been tuned around the model.

That, in turn, means product teams can create real differentiation even when using models that competitors can also access. The harness becomes part of the moat because it determines how much usable capability gets extracted from the same base model.

## One-Minute Summary

The article argues that the harness around a coding model is a major determinant of agent quality. Cursor improves that harness by evolving context management, measuring changes both offline and online, treating tool-call failures as serious system problems, and tuning the stack differently for each model family. The broader lesson is that useful agents are built through systems iteration, not just better base models.
