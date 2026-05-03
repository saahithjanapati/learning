# Learning To Orchestrate Agents With The Conductor

Source note: Stefan Nielsen, Edoardo Cetin, Peter Schwendeman, Qi Sun, Jinglue Xu, and Yujin Tang, "Learning to Orchestrate Agents in Natural Language with the Conductor." arXiv:2512.04388v4, revised March 1, 2026, ICLR 2026. Sakana post: [sakana.ai/learning-to-orchestrate](https://sakana.ai/learning-to-orchestrate/). Source PDF: [arxiv.org/pdf/2512.04388](https://arxiv.org/pdf/2512.04388). Processed source: [materials/processed/ai/learning-to-orchestrate-agents-in-natural-language-with-the-conductor.md](../../../materials/processed/ai/learning-to-orchestrate-agents-in-natural-language-with-the-conductor.md).

This is a step-by-step lesson. The main idea is simple but powerful: train a small model to manage a team of stronger models.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [Step 1: The Problem](#step-1-the-problem)
- [Step 2: What The Conductor Is](#step-2-what-the-conductor-is)
- [Step 3: What A Workflow Looks Like](#step-3-what-a-workflow-looks-like)
- [Step 4: How Reinforcement Learning Enters](#step-4-how-reinforcement-learning-enters)
- [Step 5: What The Conductor Learns](#step-5-what-the-conductor-learns)
- [Step 6: Main Results](#step-6-main-results)
- [Step 7: Two Extensions](#step-7-two-extensions)
- [Step 8: Why This Matters](#step-8-why-this-matters)
- [Critique](#critique)
- [Memory Checklist](#memory-checklist)
- [Quick Check](#quick-check)

## Medium-Length Version

The Conductor paper asks a practical question:

`Can we train an AI system to manage other AI systems?`

Different language models have different strengths. One model may be better at coding. Another may be better at science questions. Another may be a good verifier. Today, humans often design the workflow: ask one model to plan, another to code, another to check.

The paper proposes learning that orchestration instead.

The `Conductor` is a 7B language model trained with reinforcement learning. It does not directly solve the user's problem. Instead, it writes a workflow for a pool of worker LLMs.

Each workflow step specifies:

- which worker model to call,
- what natural-language subtask to give it,
- which previous worker outputs it can see.

That means the Conductor can create many shapes of collaboration:

- one model solves directly,
- one model plans and another implements,
- several models try independently,
- one model checks another,
- a verifier catches errors,
- the Conductor calls itself again to revise the whole workflow.

The training signal is simple: execute the workflow, grade the final answer, and reward the Conductor when the workflow solves the task.

The reported results are strong. The 7B Conductor outperforms every individual worker in its pool and beats multi-agent baselines such as Mixture-of-Agents in the paper's controlled evaluations. The headline results include `83.93%` on LiveCodeBench and `87.5%` on GPQA-Diamond, reported as state-of-the-art at the time of publication.

The deeper lesson is that orchestration can itself be learned. The Conductor is not only routing. It learns prompt engineering, role assignment, verification, task decomposition, and how much compute to spend based on task difficulty.

## Full-Length Version

## Step 1: The Problem

Imagine you have a hard coding problem.

You could ask one model to solve it directly. But often a better workflow is:

```text
planner -> coder -> verifier -> final fixer
```

Or maybe:

```text
three independent solvers -> judge -> final answer
```

Or:

```text
domain expert -> implementation expert -> format checker
```

Humans can design these workflows, but manual orchestration has problems.

It is brittle. A workflow that helps for coding may waste time on a simple factual question.

It is expensive. Fixed multi-agent systems may call many models even when one call was enough.

It is hard to customize. If the available worker models change, the workflow may need to change too.

The paper's question is:

`Can a model learn to design the workflow dynamically for each task?`

## Step 2: What The Conductor Is

The `Conductor` is a language model that acts as a manager.

It receives:

- the user question,
- descriptions of available worker models,
- examples of valid workflows,
- a required output format.

It outputs:

- subtasks,
- worker choices,
- context-sharing rules.

Then the environment calls the worker models and returns the final worker output as the system's answer.

The Conductor is small compared with the frontier models it manages. The main model in the paper has `7B` parameters. Its job is not to beat GPT-5, Gemini, or Claude directly. Its job is to combine them intelligently.

That distinction matters:

```text
worker model: solve the problem
Conductor model: decide who should solve which part
```

## Step 3: What A Workflow Looks Like

A workflow is a sequence of steps.

Each step has:

1. a natural-language instruction,
2. a worker id,
3. an access list.

The access list controls context. It says which previous worker outputs are visible to the current worker.

For example:

```text
Step 1: Ask Model 2 to design an algorithm.
Step 2: Ask Model 0 to implement that algorithm.
Step 3: Ask Model 4 to inspect the implementation for edge cases.
```

This is not just routing. Routing would mean choosing one model. The Conductor can build a small communication topology.

The topology can be:

- a chain,
- a tree,
- independent parallel attempts,
- a verifier loop,
- a planner-implementer split,
- a recursive retry.

The key design choice is that the workflow is written in natural language. The Conductor can invent precise prompts for workers instead of choosing from a tiny menu of roles.

## Step 4: How Reinforcement Learning Enters

The Conductor is trained with reinforcement learning.

The loop is:

```text
sample problem
Conductor writes workflow
worker models execute workflow
final answer is graded
Conductor receives reward
update Conductor
```

There are two basic reward checks.

First, the output must be parseable. If the Conductor does not produce valid lists of subtasks, worker ids, and access lists, the workflow fails.

Second, the executed workflow must answer correctly.

This means the Conductor learns from outcomes. It is not told:

```text
For coding, always call planner then coder.
```

Instead, it discovers that such patterns help because they produce correct final answers.

The paper uses GRPO, the same broad family of reinforcement-learning methods used in recent reasoning-model training.

## Step 5: What The Conductor Learns

The interesting part is what emerges.

The paper reports that the Conductor learns to:

- issue targeted prompts,
- match workers to roles,
- use planners,
- use verifiers,
- ask workers to share reasoning,
- combine independent attempts,
- spend more compute on harder tasks,
- spend less compute on easy tasks.

For simple factual or MMLU-style questions, it often uses only one or two agents.

For hard LiveCodeBench problems, it tends to create deeper workflows with planning, implementation, and verification.

That is the core behavior to remember:

`The Conductor learns task-dependent collaboration.`

## Step 6: Main Results

The paper evaluates the Conductor on math, coding, science, and reasoning benchmarks.

The headline table reports:

| Benchmark | Conductor result |
| --- | ---: |
| MATH500 | `99.4` |
| MMLU | `94.1` |
| RLPR | `44.75` |
| LiveCodeBench | `83.93` |
| AIME25 | `93.3` |
| BigCodeBench | `37.86` |
| GPQA-Diamond | `87.5` |
| Average | `77.27` |

The Conductor beats every individual worker model in the pool in that table.

It also beats several multi-agent baselines in the controlled evaluation:

- self-reflection,
- MASRouter,
- Mixture-of-Agents,
- RouterDC,
- Smoothie.

The cost result matters too. The paper argues that the Conductor often uses fewer calls than fixed multi-agent scaffolds. It is allowed up to five workflow steps but averages about three.

So the claim is not only:

```text
multi-agent helps
```

The sharper claim is:

```text
learned orchestration can be better and cheaper than hand-designed orchestration
```

## Step 7: Two Extensions

### Extension 1: Adaptive Worker Pools

Users may not always have access to the same workers.

Maybe they only want open models. Maybe they want to avoid a particular API. Maybe they have a smaller budget.

The paper finetunes the Conductor with randomized worker subsets. This trains it to adapt to whatever team is available.

This is important because the best workflow depends on the team. If GPT-5 is not available, the Conductor should not use the same strategy as before. It should reassign roles based on the remaining workers.

### Extension 2: Recursive Test-Time Scaling

The paper also lets the Conductor call itself.

That sounds odd at first. But the point is simple:

```text
The Conductor sees the previous workflow's result.
If it looks bad, it creates a new corrective workflow.
```

This is recursive orchestration.

It creates a new test-time compute axis. Instead of only asking one model to think longer, the system can let the Conductor revise the team strategy after observing a failure.

The paper reports a smaller but meaningful gain in the recursive setting, especially on BigCodeBench.

## Step 8: Why This Matters

This paper is about meta-agency.

The Conductor is not just another solver model. It is a model that controls other models through language.

That points toward a broader pattern:

```text
LLMs can be trained not only to answer, but to organize cognitive work.
```

This matters for agents because many hard tasks are not solved by one perfect model call. They require decomposition, delegation, checking, retries, and context management.

The Conductor paper says those choices do not have to be fully hand-coded. They can be learned.

## Critique

The strongest part of the paper is the framing. It turns prompt engineering and multi-agent workflow design into a reinforcement-learning problem.

The output representation is also clever. By using natural language subtasks plus simple routing lists, the model gets expressive freedom without needing a complicated new programming language.

The results are compelling, but there are important cautions.

First, the Conductor is small, but the full system is not cheap by default. It depends on calling powerful worker models.

Second, the reward is verifiable-task reward. This fits math, coding, and multiple-choice tasks better than open-ended work where success is subjective or delayed.

Third, learned orchestration can fail in subtle ways. The Conductor might route to the wrong worker, hide useful context from a later worker, use too many steps, or ask for verification that does not actually catch the bug.

Fourth, the benchmark claims are time-stamped. Leaderboards move quickly, so treat "state-of-the-art" as a statement about the paper's publication window, not a permanent fact.

## Memory Checklist

Remember these:

- The Conductor is a learned manager of LLM workers.
- It writes natural-language workflows, not direct answers.
- A workflow contains subtasks, worker ids, and access lists.
- The Conductor is trained with RL based on final workflow correctness.
- It learns prompt engineering, task decomposition, worker selection, and verification.
- The 7B Conductor beats each individual worker in the reported experiments.
- Randomized worker-pool finetuning helps with user constraints.
- Recursive orchestration lets the Conductor revise its own strategy at test time.
- The main caveat is that this works best where final answers can be graded.

## Quick Check

Try answering these:

1. What is the difference between a worker model and the Conductor?
2. What are the three pieces of a workflow step?
3. Why is the access list important?
4. How does the Conductor receive reward?
5. Why is this more than ordinary routing?
6. What does recursive test-time scaling mean here?
7. Why might learned orchestration be cheaper than fixed multi-agent scaffolds?
8. What kind of tasks are easiest to train this on, and why?

One-sentence answer to aim for:

`The Conductor is a small RL-trained language model that learns to write natural-language workflows for a team of stronger LLMs, deciding who should do what and what context each worker should see.`
