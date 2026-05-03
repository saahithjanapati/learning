# The Last Human-Written Paper: Agent-Native Research Artifacts

Source: `https://arxiv.org/pdf/2604.24658`
Source page: `https://arxiv.org/abs/2604.24658`
Site: `arXiv`
Version: `2604.24658v2`
Submitted: `2026-04-27`
Updated: `2026-04-29`
Paper date: `2026-05-01`
Authors: `Jiachen Liu et al.`
Subjects: `Machine Learning (cs.LG)`
Comments: `45 pages, 15 figures, 14 tables`
Extraction engine: `arXiv metadata + local PDF extraction with pypdf + manual structured ingest`
Strategy: `canonical PDF extraction and beginner-oriented research-systems normalization`

## Medium-Length Version

This paper argues that ordinary scientific papers are a bad primary artifact for AI-agent-driven research. A paper compresses a messy, branching research process into a clean narrative. That is useful for human persuasion, but it discards exactly the information an AI agent needs to reproduce, audit, and extend the work.

The authors name two losses:

- `Storytelling Tax`: failed experiments, abandoned hypotheses, design pivots, and process knowledge are removed so the paper can tell a linear success story.
- `Engineering Tax`: the prose and code release often do not contain enough operational detail for an agent to actually reproduce the method.

They propose an `Agent-Native Research Artifact` (`ARA`) as a replacement or underlying substrate. ARA is a structured, machine-operable research package with four layers:

1. `logic/`: scientific claims, problem framing, solution structure, experiment plan, and typed related-work dependencies.
2. `src/`: executable code, configs, environment details, and implementation bindings.
3. `trace/`: an exploration graph containing decisions, experiments, dead ends, pivots, and lessons.
4. `evidence/`: raw outputs, metric tables, logs, and claim-grounding evidence.

The paper also proposes three ecosystem mechanisms:

- a `Live Research Manager` that silently turns human-agent research sessions into structured ARA entries,
- an `ARA Compiler` that converts legacy papers, repos, rubrics, and trajectory logs into ARAs,
- an `ARA-native review system` with automated structural checks, rigor auditing, and bounded reproduction checks.

The evaluation tests whether ARA helps agents understand, reproduce, and extend research.

The headline results are:

- On PaperBench and RE-Bench knowledge extraction, ARA improves question-answering accuracy from `72.4%` to `93.7%`.
- On PaperBench reproduction tasks, ARA improves difficulty-weighted reproduction success from `57.4%` to `64.4%`.
- On RE-Bench extension tasks, ARA's preserved failure traces help agents make useful early progress, but can sometimes constrain stronger agents by keeping them inside the prior exploration path.

The paper's strongest idea is that the research object should not be only a story. It should be an executable, queryable, evidence-grounded object that agents can operate on.

## Full-Length Version

## Core Claim

The paper's core claim is:

`The PDF paper is no longer enough as the primary unit of scientific communication once AI agents become major consumers and producers of research.`

The authors are not just asking for better appendices or better code release. They argue that the structure of the paper itself is wrong for an agent-native research world. Papers are optimized for human readers who need a concise, persuasive narrative. Agents need something different: exact specifications, raw evidence, exploration history, and machine-traversable links between claims, code, and results.

## Why The Paper Exists

The paper starts from a simple observation: research is not linear.

A real project contains:

- hypotheses that were tried and rejected,
- experiments that failed,
- implementation tricks discovered by debugging,
- alternative designs that looked plausible but did not work,
- judgment calls about what counted as important or publishable,
- exact settings, logs, and raw outputs.

The final paper turns all of that into a clean story. That story may be good for human communication, but it is lossy.

The authors call out two specific losses.

## The Storytelling Tax

The `Storytelling Tax` is the loss of process knowledge.

A published paper usually says:

```text
We tried method X and got result Y.
```

It usually does not say:

```text
We first tried A, which failed because of this hidden issue.
We then tried B, which worked only under this configuration.
We rejected C because it looked promising but broke this metric.
```

For human readers, that omission is normal. For agents, it is expensive. If a future agent does not know which paths already failed, it may rediscover the same dead ends.

The paper quantifies this using RE-Bench trajectory data. Across `24,008` agent runs, failed or below-reference runs account for `90.2%` of dollar cost and `59.2%` of tokens, with a median failed-to-success token ratio of `113x`. The exact numbers are less important than the conceptual point: a huge amount of research compute goes into dead ends, and ordinary papers do not preserve those dead ends as reusable knowledge.

## The Engineering Tax

The `Engineering Tax` is the gap between what convinces a reviewer and what lets an agent execute.

A human reviewer can often accept a method description like:

```text
We train with standard hyperparameters and evaluate on the usual split.
```

An agent needs:

- the exact hyperparameters,
- the environment,
- the data preprocessing steps,
- the evaluation protocol,
- the baseline configuration,
- the random seeds,
- the code path that implements each claim.

The paper analyzes `8,921` PaperBench reproduction requirements across `23` ICML 2024 papers and finds that only `45.4%` are fully specified in the source PDF. Code development requirements are especially underspecified, with `37.3%` fully sufficient. Missing hyperparameters account for `26.2%` of all gaps.

The point is not that authors are careless. The point is that papers are written at the precision level needed to create belief, not at the precision level needed to create execution.

## The Proposed Replacement: ARA

The proposed object is the `Agent-Native Research Artifact`, or `ARA`.

An ARA is a file-system protocol for research. Instead of making agents parse a linear paper and reverse-engineer a codebase, ARA separates the research object into layers that match the kinds of questions an agent asks.

The design principle is:

`Knowledge over narrative.`

The paper can still exist, but it becomes a compiled view of the underlying structured artifact.

## The Four ARA Layers

### 1. Cognitive / Logic Layer

The `logic/` layer explains what the contribution is and why it matters.

It includes:

- the problem statement,
- the core insight,
- solution structure,
- falsifiable claims,
- experiment plans,
- typed related-work dependencies.

This layer is meant to replace the agent's need to infer the research argument from prose. Claims are explicit. Proof pointers connect claims to experiments. Related work becomes a dependency graph rather than a passive bibliography.

### 2. Physical / Source Layer

The `src/` layer explains how the work runs.

It includes:

- executable code,
- typed inputs and outputs,
- configs,
- environment specifications,
- seeds,
- hardware assumptions,
- code-to-claim mappings.

The paper distinguishes two modes:

- `kernel mode`: keep only the core algorithmic code so an agent can rebuild surrounding scaffolding.
- `repository mode`: keep the full implementation, but annotate it so an agent can navigate by research structure rather than directory names.

This layer targets the Engineering Tax.

### 3. Exploration Graph

The `trace/` layer stores the branching research process.

It records typed nodes such as:

- `question`,
- `decision`,
- `experiment`,
- `dead_end`,
- `pivot`.

The authors describe this as a kind of "git log for research." The important difference from normal version control is that it records epistemic movement, not just file changes. It can tell a future agent why a path was abandoned, not merely that files changed.

This layer targets the Storytelling Tax.

### 4. Evidence Layer

The `evidence/` layer stores raw outputs.

It includes:

- result tables,
- logs,
- training curves,
- diagnostics,
- generated data,
- resource usage.

The key principle is that claims should be grounded in evidence by explicit links. A claim in `claims.md` should point to an experiment plan, which should point to raw evidence. This makes the artifact auditable by agents.

## The Live Research Manager

A natural objection is: if ARA requires researchers to manually write all of this structure, no one will do it.

The paper's answer is the `Live Research Manager`.

The Live Research Manager is an agent skill that runs in the background during human-agent research sessions. It watches the session record, tool outputs, experiment results, and code diffs, then crystallizes important events into the ARA.

The workflow has three stages:

1. `Context Harvester`: scans the session for research-significant events.
2. `Event Router`: classifies events and writes them into the correct layer.
3. `Maturity Tracker`: promotes raw observations into formal claims, decisions, heuristics, or trace nodes once enough evidence accumulates.

The important design choice is that the manager should be quiet during active work. It should not make the researcher do extra documentation. It should turn the existing AI-native research trace into structure after the fact.

## The ARA Compiler

The Live Research Manager works for new projects that are already agent-native. But most existing research is legacy PDFs and repos.

The `ARA Compiler` addresses that. It takes any combination of:

- PDF,
- code repository,
- dataset,
- expert rubric,
- trajectory logs,
- supplementary material,

and converts them into a valid ARA.

The compiler uses a top-down workflow:

1. deconstruct the narrative into raw research content,
2. map the cognitive structure,
3. ground the physical code/config layer,
4. reconstruct the exploration graph.

The authors emphasize that the hard part is not merely converting PDF text to Markdown. The hard part is reconstructing lineage: which claims are tested by which experiments, which experiments depend on which code, and which numbers ground which statements.

## ARA-Native Review

Because ARA is structured, review can separate mechanical checking from human judgment.

The paper proposes an `ARA Seal` with three levels:

### Level 1: Structural Integrity

This checks whether the artifact is well formed:

- required directories exist,
- structured files match schemas,
- claims contain required fields,
- cross-layer references resolve.

This is mechanical and deterministic.

### Level 2: Argumentative Rigor

This is a rigor-audit pass. An agent checks whether:

- evidence actually supports claims,
- falsification criteria are meaningful,
- methodological choices are adequate,
- scope is calibrated,
- the argument is coherent,
- the exploration graph does not leak rebutted branches into live claims.

This is still meant to be objective and rubric anchored, but it is less deterministic than Level 1.

### Level 3: Execution Reproducibility

This runs bounded reproduction checks. A verification agent gets the code and method description but not the reported numbers, then tests whether central claims reproduce directionally under a compute budget.

The goal is not always exact full-scale replication. It is to test whether the claimed direction is reproducible enough to inform review.

Human reviewers then focus on significance, novelty, and taste rather than spending their attention on mechanical checks.

## Evaluation

The paper evaluates ARA at three levels:

1. understanding,
2. reproduction,
3. extension.

### Understanding

The authors ask agents questions about research artifacts and compare ARA against a baseline PDF plus repository format.

They use:

- PaperBench, with `23` peer-reviewed ML papers and expert reproduction rubrics,
- RE-Bench, with `7` R&D tasks and many recorded agent trajectories.

Across `450` paired question-answering outcomes, ARA achieves `93.7%` accuracy versus `72.4%` for the baseline.

The category breakdown matters:

- For ordinary surface information, ARA helps by making lookup targeted.
- For configuration details, ARA helps because configs are centralized.
- For failure knowledge, ARA helps a lot because the baseline often has no source for that information at all.

### Reproduction

The reproduction experiment uses `15` PaperBench papers with companion GitHub repositories. The authors create `150` reproduction subtasks across easy, medium, and hard difficulty.

Agents receive either:

- only the ARA artifact, or
- the conventional PDF plus GitHub repository.

The primary metric is difficulty-weighted success. ARA reaches `64.4%`, while the baseline reaches `57.4%`. The advantage grows with difficulty: easy tasks are close to ceiling for both formats, while medium and hard tasks benefit more from structured configuration and implementation detail.

The paper is appropriately cautious: ARA reduces but does not eliminate fabricated or incorrect results. One ARA run still fabricated results that the blinded judge caught.

### Extension

The extension experiment asks whether preserved failure traces help a future agent improve a task.

This uses five RE-Bench tasks:

- `triton_cumsum`,
- `restricted_mlm`,
- `fix_embedding`,
- `nanogpt_chat_rl`,
- `rust_codecontests`.

The ARA agent gets structured traces and evidence from prior runs. The baseline agent gets a polished paper-style writeup plus official source.

The result is nuanced. ARA helps agents make useful early progress on all five tasks. On three tasks, the ARA agent ends with the better best score. On two tasks, a stronger agent using the baseline eventually overtakes the ARA agent by inventing moves not present in the trace.

This is one of the most important parts of the paper. Failure traces are useful, but they can also anchor a capable agent inside the prior search space. The value of trace knowledge depends on whether the current agent can discover better ideas than the old trace contains.

## Review-System Results

The paper also evaluates parts of the ARA-native review system.

For Level 2 rigor auditing, the authors inject known errors into ARAs and test whether the auditor detects them. The auditor catches:

- `100%` of fabricated claims,
- `100%` of rebutted-branch leaks,
- `100%` of over-claims,
- `91%` of missing falsification criteria,
- only `22%` of orphan experiments.

Overall detection is `82.6%`. The authors identify a clear fix: orphan experiment detection should move into Level 1 as a deterministic structural check.

They also observe LLM-as-judge problems such as grade inflation and finding-score decoupling. Their suggested direction is to let LLMs generate findings, then compute final verdicts deterministically from those findings.

## What Is Convincing

The paper is strongest when it argues from concrete agent bottlenecks:

- agents need exact operational details,
- PDFs omit many of those details,
- failure traces contain reusable negative knowledge,
- structured artifacts improve lookup and reproduction.

The evaluation is also useful because it tests multiple levels. It does not only ask whether ARA is easier to read. It asks whether agents answer questions better, reproduce work better, and extend prior work better.

The nuanced extension result is a strength. The authors could have claimed that traces always help. Instead, they show that traces help early and help weaker agents more, but can constrain stronger agents when the trace is less creative than the agent.

## What To Be Careful About

Several limitations matter.

First, the evaluation is in machine learning and computational research. ARA may transfer less directly to wet-lab sciences, theoretical fields, or domains where the "physical layer" is not executable code.

Second, an ARA compiled from a finished PDF cannot recover details that were never written down. The Live Research Manager is the stronger path, but it assumes researchers are already working with AI agents throughout the project.

Third, the review system is not production-ready. Privacy, adversarial robustness, sandboxing, and schema evolution are open problems.

Fourth, the paper's title is intentionally provocative. The actual proposal does not mean humans stop writing or reading narrative explanations. It means the narrative paper becomes one view over a richer research object.

## Bottom Line

This paper is about changing the unit of scientific communication from:

```text
paper as persuasive story
```

to:

```text
research artifact as executable, queryable, evidence-grounded object
```

If AI agents are going to read, reproduce, review, and extend research, the artifact needs to contain the information agents actually need. ARA is one proposed protocol for doing that.

The memory sentence:

`ARA turns a paper from a lossy story into an agent-operable research package with claims, code, traces, and evidence linked together.`
