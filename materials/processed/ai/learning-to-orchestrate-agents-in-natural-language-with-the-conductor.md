# Learning to Orchestrate Agents in Natural Language with the Conductor

Source: `https://arxiv.org/pdf/2512.04388`
Source page: `https://arxiv.org/abs/2512.04388`
Sakana post: `https://sakana.ai/learning-to-orchestrate/`
OpenReview: `https://openreview.net/forum?id=U23A2BUKYt`
Site: `arXiv / Sakana AI`
Version: `2512.04388v4`
Submitted: `2025-12-04`
Updated: `2026-03-01`
Blog date: `2026-04-27`
Venue: `ICLR 2026`
Authors: `Stefan Nielsen, Edoardo Cetin, Peter Schwendeman, Qi Sun, Jinglue Xu, Yujin Tang`
Subjects: `Machine Learning (cs.LG)`
Extraction engine: `arXiv metadata + local PDF extraction with pypdf + Sakana blog metadata review + manual structured ingest`
Strategy: `canonical PDF extraction and beginner-oriented multi-agent/RL normalization`

## Medium-Length Version

This paper introduces the `Conductor`, a small language model trained with reinforcement learning to coordinate a pool of stronger worker LLMs. Instead of solving a user task directly, the Conductor writes a natural-language workflow that tells other models what subtasks to perform, which workers should perform them, and which previous messages each worker should see.

The central idea is:

`Train a language model to be a meta-agent: not the best solver, but the best manager of solvers.`

A Conductor output is parsed into three lists:

1. `subtasks`: natural-language instructions for each worker.
2. `model ids`: which worker model should handle each subtask.
3. `access lists`: which earlier worker outputs each later worker can see.

This lets the Conductor express many orchestration patterns in ordinary language: one-shot routing, planner-coder pipelines, parallel attempts, verifier/refiner loops, debate-like structures, and recursive self-calls.

The paper trains a 7B Conductor, starting from Qwen2.5, with GRPO-style reinforcement learning. The reward comes from executing the proposed workflow and checking whether the final answer is correct. The Conductor is not supervised with a fixed recipe for good orchestration. It learns orchestration because better workflows receive higher reward.

The worker pool includes frontier and open models such as GPT-5, Gemini 2.5 Pro, Claude Sonnet 4, Qwen3-32B, Gemma3-27B, and R1-Distill-Qwen-32B in the paper's experimental setting.

The main reported results are strong:

- On the paper's headline table, the Conductor reaches `83.93%` on LiveCodeBench, `87.5%` on GPQA-Diamond, `93.3%` on AIME25, and a `77.27` average across seven benchmarks.
- It outperforms every individual worker model in its pool.
- It outperforms multi-agent baselines such as Mixture-of-Agents, MASRouter, RouterDC, Smoothie, and self-reflection style baselines in the controlled evaluations.
- It tends to use fewer calls than expensive fixed multi-agent baselines, averaging about three workflow steps despite being allowed up to five.

The paper also studies two extensions:

- `Adaptive worker selection`: finetune the Conductor with randomized model subsets so it can adapt when users only allow a restricted pool, such as only open-source models.
- `Recursive test-time scaling`: allow the Conductor to call itself as a worker, inspect a prior workflow's result, and produce a corrective workflow.

The strongest conceptual result is that natural language is not only the task interface. It can also be the orchestration interface. The Conductor learns to prompt, delegate, route, verify, and revise by writing instructions to other models.

## Full-Length Version

## Core Claim

The paper's core claim is that multi-agent LLM coordination should itself be learned.

Many current agent systems are hand-designed. A human writes the scaffold:

- ask a planner,
- ask a coder,
- ask a verifier,
- debate the answer,
- route math to one model and code to another.

The Conductor paper asks:

`What if a language model learned to design those workflows automatically?`

The answer is a `Conductor` model. The Conductor is not primarily a direct solver. It is a model that writes a workflow for other models to execute.

## The Problem: Different Models Have Different Strengths

The paper begins from a practical observation: no single LLM is best at every task.

One model may be excellent at competitive programming. Another may be better at science reasoning. Another may be useful as a verifier, translator, planner, or format checker.

Human users already exploit this informally. We ask one model to brainstorm, another to code, another to check. But manually designing these workflows is brittle and expensive. Existing multi-agent systems often rely on fixed scaffolds or routers that choose one model rather than dynamically building a whole team.

The Conductor tries to learn the missing skill:

`Given this task and this available model pool, how should the team work together?`

## What The Conductor Outputs

The Conductor writes a complete workflow.

Each workflow step has three parts:

1. a natural-language subtask,
2. the worker model assigned to that subtask,
3. an access list saying which previous outputs the worker can see.

In the paper's implementation, these are parsed as Python lists. A simple coding workflow might look conceptually like:

```text
subtasks = [
  "Develop an efficient algorithm for the problem.",
  "Implement the algorithm in Python.",
  "Check the implementation for edge cases."
]

model_ids = [2, 0, 4]

access_lists = [[], ["all"], ["all"]]
```

The important design choice is that the Conductor does not choose from a small menu of hard-coded topologies. It writes free-form instructions in natural language. That gives it a large action space:

- one model solves directly,
- one model plans and another writes,
- several models solve independently,
- one model aggregates,
- a verifier reviews,
- a later worker sees only selected prior outputs,
- the Conductor calls itself recursively.

## How It Is Trained

The Conductor is trained with reinforcement learning.

The setup is similar in spirit to RL for reasoning models:

1. Sample a problem with a verifiable answer.
2. Let the model produce an output.
3. Check whether the output has the right format.
4. Check whether the executed answer is correct.
5. Use the reward to update the model.

The difference is that the Conductor's output is not the final answer. The output is a workflow. The environment executes that workflow by calling the chosen worker models. The final answer returned by the workflow determines the correctness reward.

So the reward teaches the Conductor which orchestration strategies work.

The paper uses a GRPO-style objective. The details matter less than the high-level loop:

```text
Conductor proposes workflow -> workers execute workflow -> final answer is graded -> Conductor gets reward
```

This makes orchestration learnable without requiring a human to label the ideal workflow for each problem.

## Training Setup

The main Conductor is a 7B model initialized from Qwen2.5.

The worker pool includes both closed and open models in the paper's setting:

- Gemini 2.5 Pro,
- Claude Sonnet 4,
- GPT-5,
- DeepSeek-R1-Distill-Qwen-32B,
- Gemma3-27B-Instruct,
- Qwen3-32B,
- Qwen3-32B thinking.

The training set contains `960` problems from four domains:

- MATH500,
- MMLU,
- RLPR,
- LiveCodeBench V1.

The evaluation uses unseen questions from those domains and out-of-domain tasks including:

- GPQA-Diamond,
- BigCodeBench,
- AIME25.

The paper reports convergence in `200` GRPO iterations with a batch size of `256`, using `2` NVIDIA H100 80GB GPUs.

## What Emerges During Training

Early in training, the Conductor can produce reasonable subtasks but does not reliably use good collaboration patterns.

Later in training, the paper reports that it learns behaviors such as:

- choosing strong models for the right role,
- separating planning from implementation,
- asking workers to share reasoning,
- assigning verification steps,
- using refinement loops,
- adapting the number of workers to task difficulty.

This is the paper's main behavioral claim: useful multi-agent coordination strategies can emerge from end-to-end reward rather than being hand-coded.

## Main Results

The paper's headline table compares the Conductor against strong individual models and prior reported results across seven tasks.

The Conductor reports:

- `99.4` on MATH500,
- `94.1` on MMLU,
- `44.75` on RLPR,
- `83.93` on LiveCodeBench,
- `93.3` on AIME25,
- `37.86` on BigCodeBench,
- `87.5` on GPQA-Diamond,
- `77.27` average.

The important result is not only that these numbers are high. It is that a 7B manager model can raise a pool of stronger workers above the performance of any individual worker by coordinating them.

The paper also compares against multi-agent baselines under a controlled setting. These include:

- self-reflection with workers,
- MASRouter,
- Mixture-of-Agents,
- RouterDC,
- Smoothie.

The Conductor outperforms these baselines in the reported controlled evaluations. The authors emphasize efficiency: many baselines use expensive fixed scaffolds or more model calls, while the Conductor learns to use about three steps on average.

## Adaptive Worker Selection

The first extension is adaptive worker-pool selection.

In practice, a user may not have access to every frontier model, or may want to avoid expensive APIs. The paper finetunes the Conductor with randomized subsets of workers so it learns to adapt to arbitrary available pools.

This matters because orchestration depends on the team. A workflow that works with GPT-5, Gemini, and Claude may not work with only open models. The Conductor must learn not just "what is the best workflow," but "what is the best workflow for this available set of workers."

The paper reports that finetuning on randomized model pools lets the Conductor use open-model subsets surprisingly well while preserving performance when closed models are available.

## Recursive Test-Time Scaling

The second extension is recursive orchestration.

Normally, the Conductor designs one workflow and returns the final worker result. In the recursive setting, the Conductor can select itself as a worker. That means it can inspect the result of an earlier workflow and decide whether to launch another corrective workflow.

This creates a new kind of test-time scaling:

```text
first workflow -> observe result -> Conductor revises plan -> second workflow
```

The paper limits recursion depth to avoid infinite loops. In experiments, recursive Conductor improves average out-of-domain performance from `61.93` to `63.00`, with the biggest gain on BigCodeBench from `37.8` to `40.0`.

The interesting part is qualitative: the recursive Conductor can notice when a chosen worker behaved poorly and shift future calls toward other models.

## Task Adaptivity

The Conductor learns to allocate compute based on difficulty.

For simpler factual or multiple-choice tasks, it often uses one or two steps.

For harder coding tasks, it uses more steps. The paper describes LiveCodeBench workflows with multiple planners, implementers, and verifiers.

This is important because fixed multi-agent scaffolds waste compute on easy questions and may be too shallow for hard ones. The Conductor's value comes partly from learning when collaboration is worth it.

## Ablations And Analysis

The paper includes several analyses that clarify what matters.

First, model scale matters. A 3B Conductor can learn sensible agent selection, but the 7B Conductor produces better prompt-engineered subtasks and stronger performance.

Second, subtask language matters. When the authors ablate subtask generation so workers receive generic "solve the user question" prompts, performance drops. This suggests the Conductor is not merely routing to good models. It is also learning useful prompt engineering.

Third, diversity of workers matters. When all worker slots are forced to GPT-5, the Conductor underperforms the full diverse pool on tasks where other models have complementary strengths. This supports the claim that the Conductor uses specialization, not just repeated calls to the strongest model.

Fourth, replacing the trained Conductor with GPT-5 or Gemini as the coordinator does not match the trained Conductor. Strong base models can coordinate somewhat, but the learned Conductor is better at the specific orchestration task.

## Why This Paper Matters

This paper is part of a broader shift from:

```text
LLM as answer generator
```

to:

```text
LLM as controller over other cognitive tools
```

In this case, the tools are other LLMs. The Conductor learns to use language as a control interface: it programs other models by writing instructions.

That is why the natural-language part matters. The Conductor does not need a rigid graph language or fixed set of roles. It can express workflows using the same flexible medium that LLMs already understand.

## Limitations And Cautions

Several caveats matter.

First, the system depends on access to powerful worker models. The Conductor is small, but the total system can still be expensive because it calls larger models.

Second, the training tasks have verifiable rewards. Extending this to softer tasks, such as open-ended research or long-horizon product work, may require more complicated reward design.

Third, the Conductor's output format is simple and useful, but still a constrained interaction protocol. Real-world agents may need tools, memory, browser actions, execution environments, and permission boundaries.

Fourth, the paper's strongest claims about leaderboard records should be read as time-stamped to the paper/blog publication period. Model leaderboards change quickly.

Fifth, learned orchestration can introduce failure modes: the Conductor may overtrust a weak worker, route context poorly, hide important intermediate reasoning from a later worker, or spend too much compute on a task that did not need it.

## Bottom Line

The Conductor is a learned meta-agent. It does not try to be the strongest model in the room. It learns how to use the strongest models in the room.

The memory sentence:

`The Conductor trains a small LLM with RL to write natural-language workflows that delegate, route, verify, and revise across a pool of stronger LLM workers.`
