# ProgramBench: Can Language Models Rebuild Programs From Scratch?

Source: `https://programbench.com/`
Paper: `https://programbench.com/static/paper.pdf`
Authors: John Yang, Kilian Lieret, Jeffrey Ma, Parth Thakkar, Dmitrii Pedchenko, Sten Sootla, Emily McMilin, Pengcheng Yin, Rui Hou, Gabriel Synnaeve, Diyi Yang, and Ofir Press
Affiliations: Meta Superintelligence Labs, Stanford University, Harvard University
Ingested: 2026-05-06
Extraction engine: direct website capture
Strategy: canonical website/article ingest

## Summary

ProgramBench is a benchmark for an unusually hard coding question:

**Can a language-model agent rebuild an existing program from scratch if you only give it the compiled executable and documentation?**

The benchmark deliberately removes many of the conveniences present in other software benchmarks. The agent does not get source code, skeleton files, method signatures, internet access, or decompilation tools. It has to decide on the language, architecture, module breakdown, interfaces, and build process itself.

## Task Design

The benchmark contains `200` tasks covering a wide spread of software sizes and styles:

- small command-line tools like `jq` and `ripgrep`,
- medium developer utilities,
- large projects such as the PHP compiler, FFmpeg, and SQLite.

For each task, the agent receives:

- an executable,
- documentation,
- the ability to run the program and observe its behavior.

It does **not** receive:

- source code,
- internet access,
- decompilers,
- low-level binary inspection tools like `objdump`, `strings`, or `hexdump`.

## Evaluation Philosophy

ProgramBench evaluates whether the rebuilt program matches the original program's behavior. The site says the benchmark uses more than `248,000` behavioral tests generated with agent-driven fuzzing across the 200 tasks.

The leaderboard prioritizes **fully resolved instances**, not average partial credit. The authors argue that partial pass rates can be misleading because many tests are easy surface checks, while a single failure can still reveal a serious defect.

The current public leaderboard is striking because the scores are extremely low. Even very strong frontier models resolve essentially none of the tasks fully under the public baseline setup. The site frames this as evidence that full clean-room program reconstruction remains far beyond today's coding agents.

## Why The Benchmark Is Interesting

ProgramBench matters because it asks for capabilities that many coding benchmarks factor away:

- long-horizon planning,
- architectural decomposition,
- interface design,
- iterative debugging under sparse feedback,
- and full-system reconstruction rather than local patching.

Most coding evaluations test code completion, bug fixing, or file-level editing inside a provided scaffold. ProgramBench instead tests whether an agent can infer the whole system and recreate it under a strict clean-room constraint.

## What The Low Scores Mean

The most important lesson is not just that the benchmark is hard. It is *why* it is hard.

The bottleneck is not merely syntax generation. Agents must:

- form a hypothesis about the original program's structure,
- choose an implementation strategy,
- decide which abstractions are worth introducing,
- infer hidden edge cases through interaction,
- and keep all those decisions coherent over a large codebase.

That is much closer to real software design than benchmark-friendly patching loops.

## Broader Significance

ProgramBench is useful because it sets a much stricter bar for claims like "AI can build software from scratch." It separates:

- local code competence,
- repo-editing competence,
- and true whole-program reconstruction competence.

If frontier agents still fail badly here, that suggests there is still a large gap between being good at coding in an existing scaffold and being able to independently architect a complete system.
