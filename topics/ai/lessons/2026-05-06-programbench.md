# ProgramBench and What It Really Tests in Coding Agents

Source note: John Yang, Kilian Lieret, Jeffrey Ma, Parth Thakkar, Dmitrii Pedchenko, Sten Sootla, Emily McMilin, Pengcheng Yin, Rui Hou, Gabriel Synnaeve, Diyi Yang, and Ofir Press, "ProgramBench: Can Language Models Rebuild Programs From Scratch?" Program site: [programbench.com](https://programbench.com/). Paper: [programbench.com/static/paper.pdf](https://programbench.com/static/paper.pdf). Processed source: [materials/processed/ai/programbench-can-language-models-rebuild-programs-from-scratch.md](../../../materials/processed/ai/programbench-can-language-models-rebuild-programs-from-scratch.md).

## Table of Contents

- [What ProgramBench Is](#what-programbench-is)
- [Why It Is Harder Than SWE-Bench-Style Tasks](#why-it-is-harder-than-swe-bench-style-tasks)
- [What The Benchmark Measures](#what-the-benchmark-measures)
- [Why The Scores Are So Low](#why-the-scores-are-so-low)
- [What This Says About Current Coding Agents](#what-this-says-about-current-coding-agents)
- [Practical Takeaways](#practical-takeaways)

ProgramBench asks a much harsher question than most coding benchmarks:

**Can an LLM agent reconstruct a program from scratch when it only gets the executable and documentation?**

That changes almost everything.

In many coding benchmarks, the model is dropped into a partially solved world. The repository already exists. The architecture is already there. File boundaries have already been chosen. Function names and interfaces often already point toward the intended fix. Even when the task is difficult, the model is editing inside a strong human scaffold.

ProgramBench removes that scaffold. The model has to decide:

- what language to use,
- how to structure the codebase,
- which modules to create,
- how to expose interfaces,
- how to test its own hypotheses,
- and when its design is good enough to submit.

That makes the benchmark feel less like "AI patching code" and more like "AI doing clean-room software engineering."

## What ProgramBench Is

The benchmark contains `200` tasks. In each one, the agent receives an executable and documentation and must rebuild a program with matching behavior. The programs range from smaller command-line tools to much larger systems like FFmpeg, SQLite, and even the PHP compiler.

The benchmark is intentionally locked down:

- no internet,
- no source-code retrieval,
- no decompilation,
- no binary inspection shortcuts,
- execution-only permissions on the given binary.

The goal is to test whether the agent can infer the program's structure and behavior by interacting with it, rather than by reverse engineering or searching for the original code online.

The evaluation then compares the rebuilt program against the original through a large test suite. The site reports more than `248,000` behavioral tests across the benchmark, generated with agent-driven fuzzing.

## Why It Is Harder Than SWE-Bench-Style Tasks

SWE-Bench and related benchmarks are still useful, but they mostly measure a different slice of capability.

Those tasks reward:

- reading existing code,
- localizing a bug,
- editing a few files,
- satisfying repo tests,
- and working within a known architecture.

ProgramBench instead adds three capabilities that often get hidden in scaffolded benchmarks.

First, it tests **architectural synthesis**. The agent has to invent a code organization from scratch.

Second, it tests **behavioral inference**. The executable acts like a black box, so the agent must actively probe it and infer what rules govern its outputs.

Third, it tests **long-horizon coherence**. A design decision made early can affect dozens of later implementation choices. If the initial mental model is wrong, the agent can spend a long time building on a flawed foundation.

That combination makes the task qualitatively different, not just quantitatively harder.

## What The Benchmark Measures

The benchmark is really about software design under uncertainty.

A capable agent here needs more than code fluency. It needs:

- experimentation skill,
- abstraction skill,
- decomposition skill,
- debugging discipline,
- and a sense for when to choose a simple implementation versus a more general one.

Notice what this means. ProgramBench is not mainly a question of whether a model "knows how to write code." Strong models obviously do. The deeper question is whether they can construct and refine an internal theory of a program and then turn that theory into a clean implementation.

This makes ProgramBench a better probe of "software engineering agency" than many benchmarks that mostly reward local repo editing.

## Why The Scores Are So Low

The current public scores are almost comically low. That is the first thing many people notice.

But the right interpretation is not just "the benchmark is brutal." It is that complete program reconstruction appears to be one of the clearest remaining weak spots for coding agents.

Why?

Because the task compounds many failure modes at once:

- the agent may infer the wrong high-level architecture,
- it may misread one subtle behavioral edge case,
- it may choose a language or decomposition that becomes costly later,
- it may run out of patience or budget before converging,
- or it may get the big idea right while still missing a small but crucial tail case.

The benchmark also avoids harness overfitting. The site emphasizes that it uses a relatively minimal, stable baseline agent rather than a constantly shifting proprietary scaffold tuned for a handful of showcase tasks. That makes the low scores more credible as evidence of model limitations rather than benchmark theatrics.

## What This Says About Current Coding Agents

ProgramBench suggests that current frontier agents are much better at *working inside an existing software world* than at *building the whole world themselves*.

That distinction matters.

If a user already has a repo, tests, naming conventions, and architecture, agents can often be quite productive. But if the user expects the model to independently recreate a complex program from a behavioral spec and black-box interaction alone, the gap is still huge.

This is one reason why coding agents often feel better in real workflows than the benchmark headlines might suggest. Real teams usually provide some scaffold. ProgramBench strips that away and reveals how much hidden support that scaffold supplies.

## Practical Takeaways

ProgramBench is a useful correction against hype. It reminds us that whole-program synthesis is still far from solved, especially when:

- the task is long horizon,
- the design space is open ended,
- the target behavior must be discovered rather than described,
- and correctness depends on subtle edge cases.

The benchmark also points toward what future progress might need:

- stronger self-testing loops,
- better internal planning over architecture,
- more persistent working memory,
- more reliable hypothesis revision,
- and perhaps multi-agent or tool-augmented workflows designed specifically for exploration and reconstruction.

The big lesson is simple:

**Coding agents are already useful, but "useful at editing existing systems" is not the same as "able to rebuild arbitrary systems from scratch." ProgramBench gives us a sharp way to keep those claims separate.**
