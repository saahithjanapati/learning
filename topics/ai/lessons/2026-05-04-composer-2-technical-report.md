# Composer 2 Technical Report

Source note: [materials/processed/ai/composer-2-technical-report.md](../../../materials/processed/ai/composer-2-technical-report.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)
3. [The Central Problem](#the-central-problem)
4. [Why Agentic SWE Is Not Just Code Completion](#why-agentic-swe-is-not-just-code-completion)
5. [The Two-Phase Training Story](#the-two-phase-training-story)
6. [Why The Cursor Harness Matters](#why-the-cursor-harness-matters)
7. [Benchmarks And What They Mean](#benchmarks-and-what-they-mean)
8. [What Makes This Report Interesting](#what-makes-this-report-interesting)
9. [Limits And Open Questions](#limits-and-open-questions)
10. [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

Composer 2 is a technical report about training a model specifically for `agentic software engineering`, not merely for code completion. Cursor's claim is that strong coding agents need more than static code knowledge: they need long-horizon planning, step-by-step tool use, coherence across many interactions, and the ability to stay productive inside realistic repository tasks.

The training story has two phases. First comes continued pretraining to improve coding knowledge and latent capability. Then comes large-scale reinforcement learning aimed at the behavior that matters in deployment: solving real engineering tasks inside a tool-using harness. This is important because the deployed problem is not `complete this function` in isolation. It is more like `inspect a codebase, decide what matters, edit multiple files, run tools, recover from failures, and keep the whole thread coherent`.

The report's strongest conceptual point is train-deploy alignment. Composer 2 is trained in the same kind of Cursor harness used in deployment, with similar tools and interaction structure. That matters because many coding models look strong on static benchmarks but fall apart when turned into agents. Cursor is explicitly trying to shrink that gap.

The paper also suggests a broader shift in model development. Frontier performance in some domains may come less from ever more generic pretraining alone and more from specialized post-training loops in realistic environments. Composer 2 is a good example of that trend.

### Medium Takeaway

Composer 2 is best read as a domain-specific RL story: take a strong coding-capable base, put it inside a realistic software-engineering harness, and train on the actual interaction patterns the product will face. The report is less about generic model scaling and more about how to make coding agents work over long horizons.

## Full-Length Version

## The Central Problem

The report is trying to solve a very practical problem: how do you build a model that is good at real software-engineering tasks, not just at producing plausible code snippets?

That problem is harder than it sounds. A model can score well on code completion benchmarks and still fail badly on actual engineering work, because real tasks often require:

- understanding repository structure,
- locating relevant files,
- reasoning across long contexts,
- deciding among multiple plausible edits,
- using tools and feedback,
- staying coherent through failure and revision.

Composer 2 is designed for that more realistic target.

## Why Agentic SWE Is Not Just Code Completion

Software engineering agents are different from ordinary coding assistants because they operate in loops.

A one-shot coding model mainly answers the question:

`Given this prompt, what code should come next?`

An agentic SWE model faces a richer loop:

1. interpret the task,
2. inspect the environment,
3. plan an approach,
4. edit code,
5. run tools or tests,
6. observe failures,
7. revise the plan,
8. continue until the task is resolved.

That loop introduces new demands:

- persistence over many steps,
- tool coordination,
- robustness to intermediate errors,
- the ability to choose what to do next rather than only what text to emit next.

This is why Cursor does not treat agentic SWE as "chat with a slightly better coding model." It is a separate capability target.

## The Two-Phase Training Story

The report says Composer 2 is trained in two major phases.

### Phase 1: Continued pretraining

This stage improves coding knowledge, latent reasoning, and software fluency. It is the part that helps the model understand syntax, APIs, repository patterns, and general coding distributions more deeply.

### Phase 2: Reinforcement learning

This is the distinctive phase. RL is used to optimize end-to-end coding behavior on realistic tasks. The goal is not only to know code, but to behave like an effective engineering agent:

- choose good actions,
- preserve coherence,
- reason over long horizons,
- improve after tool feedback.

This makes the report part of a larger pattern in AI: base capability is increasingly being shaped into product-relevant competence through post-training, especially RL.

## Why The Cursor Harness Matters

The most important systems idea in the report is that Composer 2 is trained in the same general harness style used in deployment.

This matters because train-test mismatch is a major failure mode for agents. A model trained only on static code targets may look great on curated benchmarks, then fail when it has to:

- decide which files to open,
- use the right tools,
- understand command outputs,
- handle partial failures,
- keep a plan alive over many turns.

By training in the Cursor harness, the team is trying to align research and deployment environments. The model is not just being asked to imitate code. It is being trained in the workflow where it will actually be used.

That is arguably the most important idea in the report.

## Benchmarks And What They Mean

The report references strong results on CursorBench and public SWE-style benchmarks such as SWE-bench Multilingual and Terminal-Bench.

Those numbers matter, but the more interesting point is what they stand for. CursorBench is described as being derived from realistic software-engineering problems in large codebases, including Cursor's own environment. So the benchmark is not merely a public leaderboard artifact; it is part of the effort to measure the kind of capability the product cares about.

This should make you read the scores in a particular way:

- they are not just generic code numbers,
- they are evidence that the model is improving on the interaction style Cursor actually values.

## What Makes This Report Interesting

There are three big reasons this report stands out.

### 1. It is a clean example of specialization

The model is not trying to dominate every task category equally. It is specialized around one valuable domain: agentic coding.

### 2. It shows RL being used for workflow competence

The RL phase is not merely polishing outputs. It is meant to improve long-horizon task behavior.

### 3. It treats product harnesses as first-class training environments

This is increasingly important. In many agent domains, the environment and tool loop matter almost as much as the raw model.

## Limits And Open Questions

Several caveats matter.

First, this is a product-lab technical report. That means the framing naturally highlights the environments and benchmarks most favorable to the product's actual use case.

Second, realism is always partial. Even a good harness can only approximate the full messiness of real human software engineering.

Third, there is an open portability question. A recipe that works well inside Cursor's tool and evaluation ecosystem may not transfer perfectly to other coding-agent settings.

Fourth, strong benchmark performance does not eliminate broader agent risks such as reward hacking, shallow task heuristics, or overfitting to the harness.

So the strongest reading is not `Composer 2 solved coding`. It is:

`Composer 2 is evidence that realistic post-training environments can materially improve coding agents on long-horizon software tasks.`

## Memory Checklist

- Composer 2 is about agentic software engineering, not just code completion.
- The model is trained in two phases: continued pretraining, then large-scale RL.
- The key systems idea is training in the same style of harness used for deployment.
- The report is a good example of domain-specific post-training outperforming generic coding assumptions.
- The main open question is how broadly the recipe transfers beyond Cursor's own environment.
