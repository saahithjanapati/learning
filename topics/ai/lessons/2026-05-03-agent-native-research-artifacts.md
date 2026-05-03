# Agent-Native Research Artifacts

Source note: Jiachen Liu et al., "The Last Human-Written Paper: Agent-Native Research Artifacts." arXiv:2604.24658v2, submitted April 27, 2026 and revised April 29, 2026. Source PDF: [arxiv.org/pdf/2604.24658](https://arxiv.org/pdf/2604.24658). Processed source: [materials/processed/ai/the-last-human-written-paper-agent-native-research-artifacts.md](../../../materials/processed/ai/the-last-human-written-paper-agent-native-research-artifacts.md).

This is a step-by-step reading note. The paper has a provocative title, but the useful question is precise: if AI agents are now expected to read, reproduce, and extend research, what should a research artifact contain?

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [Step 1: Why A Normal Paper Loses Information](#step-1-why-a-normal-paper-loses-information)
- [Step 2: The Two Taxes](#step-2-the-two-taxes)
- [Step 3: What An ARA Is](#step-3-what-an-ara-is)
- [Step 4: The Four Layers](#step-4-the-four-layers)
- [Step 5: How ARAs Get Created](#step-5-how-aras-get-created)
- [Step 6: How Review Changes](#step-6-how-review-changes)
- [Step 7: What The Evaluation Shows](#step-7-what-the-evaluation-shows)
- [Step 8: The Main Caveat](#step-8-the-main-caveat)
- [Critique](#critique)
- [Memory Checklist](#memory-checklist)
- [Quick Check](#quick-check)

## Medium-Length Version

The paper argues that the traditional paper is a lossy format for AI-agent-era research.

A real research project is not a clean story. It is a branching process: hypotheses, failed runs, debugging tricks, design pivots, rejected alternatives, exact configs, messy logs, and final evidence. A paper compresses that process into a polished narrative. That is useful for humans, but it removes information that agents need.

The authors name two losses.

The first is the `Storytelling Tax`. When research becomes a paper, dead ends and failed experiments disappear. That means future researchers and agents may rediscover the same failures.

The second is the `Engineering Tax`. Papers are written to convince reviewers, not to give agents every detail needed for execution. Important hyperparameters, environment assumptions, evaluation details, and implementation tricks may be missing or scattered.

The proposed solution is the `Agent-Native Research Artifact`, or `ARA`. An ARA is a structured research package with four layers:

1. `logic/`: claims, problem framing, solution structure, and experiment plans.
2. `src/`: code, configs, environment specs, and implementation links.
3. `trace/`: exploration history, including decisions, experiments, dead ends, and pivots.
4. `evidence/`: raw outputs, metrics, logs, and claim-grounding evidence.

The paper also proposes three tools around this protocol:

- a `Live Research Manager` that captures research decisions and dead ends during normal human-agent work,
- an `ARA Compiler` that converts legacy PDFs, repos, rubrics, and traces into ARAs,
- an `ARA-native review system` that checks structure, rigor, and bounded reproducibility before human review.

The evaluation tests whether agents do better with ARAs than with conventional PDFs and repositories.

The main results:

- Knowledge extraction improves from `72.4%` to `93.7%` accuracy.
- Reproduction success improves from `57.4%` to `64.4%`.
- Preserved failure traces help agents make earlier progress on extension tasks, but can sometimes constrain stronger agents that might have invented better directions.

The key takeaway is:

`A research artifact should not only tell humans what happened. It should let agents operate on the research: query claims, run code, inspect failed branches, and verify evidence.`

## Full-Length Version

## Step 1: Why A Normal Paper Loses Information

Start with the gap between how research happens and how research is published.

Research usually looks like this:

```text
try idea A -> fail
try idea B -> almost work
change metric -> discover bug
try idea C -> promising
fix config -> final result
write paper as if the path was clean
```

The final paper usually looks like:

```text
Here is the problem.
Here is our method.
Here are the results.
Here is why it matters.
```

That clean story is not fake, but it is compressed. It leaves out a lot of useful information.

For a human reader, compression is necessary. We cannot read every failed experiment from every paper.

For an AI agent, compression is different. The agent may need exactly the information that the narrative removed:

- what was tried and failed,
- what hyperparameters were needed,
- what code path implements the core claim,
- which evidence supports each result,
- which assumptions were discovered through debugging.

This is the paper's starting point.

Pause and check:

- If you had to reproduce a paper, what information would you want that is usually not in the main PDF?
- If you had to extend a paper, why would failed experiments be useful?

## Step 2: The Two Taxes

The authors name two costs of ordinary publication.

### The Storytelling Tax

The `Storytelling Tax` is the cost of turning a branching process into a linear story.

Papers tend to preserve the path that worked. They rarely preserve:

- dead ends,
- rejected hypotheses,
- abandoned baselines,
- design choices that looked reasonable but failed,
- experiments that taught a lesson but did not make the main plot.

For agents, this lost information can be expensive. If an agent does not know which paths already failed, it may spend compute rediscovering them.

The paper uses RE-Bench trajectory data to support this point. It reports that failed or below-reference runs account for a large share of research-agent cost and tokens. The exact figures are striking: `90.2%` of dollar cost and `59.2%` of tokens in the analyzed RE-Bench runs are spent on failed or below-reference exploration.

The lesson is not "failure is bad." Failure is part of research. The problem is that the failure knowledge usually does not become part of the artifact.

### The Engineering Tax

The `Engineering Tax` is the cost of under-specification.

A paper can convince a reviewer while still being too vague for execution.

For example, a paper might say:

```text
We train using standard settings.
```

An agent needs something more like:

```text
optimizer = AdamW
learning_rate = 3e-4
batch_size = 128
warmup_steps = 2000
seed = 42
hardware = 8 x A100
evaluation script = scripts/eval_main.py
```

The authors analyze PaperBench reproduction requirements and report that only `45.4%` are fully specified in source PDFs. Missing hyperparameters are a major gap, but not the only one. Evaluation protocols, experiment matrices, metric computations, and implementation tricks also matter.

The paper's phrasing is useful:

```text
reviewer-sufficient prose is not agent-sufficient specification
```

## Step 3: What An ARA Is

`ARA` stands for `Agent-Native Research Artifact`.

The idea is to make the research artifact a structured object that agents can operate on directly.

Instead of this:

```text
paper.pdf
repo/
maybe appendix.pdf
```

ARA wants something like this:

```text
PAPER.md
logic/
src/
trace/
evidence/
```

The paper can still exist. But it becomes a compiled human-readable view, not the only primary object.

The design philosophy is:

`Knowledge over narrative.`

That means the real artifact is the organized knowledge produced during research. The paper is one presentation of that knowledge.

## Step 4: The Four Layers

The ARA protocol has four main layers.

### 1. The Logic Layer

The `logic/` layer answers:

```text
What is the claim, and why should anyone believe it?
```

It contains:

- problem framing,
- solution structure,
- claims,
- experiment plans,
- typed related-work dependencies.

The key improvement is that claims are explicit and linked to evidence. An agent should not have to infer the claim graph from prose.

### 2. The Source Layer

The `src/` layer answers:

```text
How do I run or implement this?
```

It contains:

- code,
- configs,
- environment details,
- seeds,
- hardware assumptions,
- links from code to claims.

The paper gives two modes.

`Kernel mode` keeps only the core algorithmic code. This is useful when the important part is a compact method and the agent can rebuild surrounding boilerplate.

`Repository mode` keeps the full codebase, but annotates it so the agent can navigate it by research meaning.

### 3. The Trace Layer

The `trace/` layer answers:

```text
What was tried along the way?
```

It records the exploration graph:

- questions,
- decisions,
- experiments,
- dead ends,
- pivots.

This is the most unusual layer. It treats negative knowledge as useful knowledge. A dead end is not just clutter; it can tell the next agent where not to spend time.

### 4. The Evidence Layer

The `evidence/` layer answers:

```text
What raw outputs support the claims?
```

It stores:

- metric tables,
- logs,
- training curves,
- generated outputs,
- resource usage,
- diagnostics.

The structure matters because each claim should have a proof chain:

```text
claim -> experiment plan -> raw evidence
```

That lets a review agent audit the claim without relying only on prose.

## Step 5: How ARAs Get Created

The paper proposes two routes.

### Route 1: Live Research Manager

The `Live Research Manager` is for new research done with AI agents.

The idea is that modern AI-native research already produces a text trail: prompts, code diffs, tool outputs, experiment logs, failed attempts, and decisions. The Live Research Manager watches that trail and turns it into an ARA.

It has three stages:

1. `Context Harvester`: find research-significant events in the session.
2. `Event Router`: classify events and write them into the right layer.
3. `Maturity Tracker`: promote raw notes into formal claims, heuristics, decisions, or dead-end nodes once they are settled.

The important requirement is low friction. If researchers have to manually maintain the artifact, the protocol probably fails. The manager is supposed to create structure as a side effect of normal work.

### Route 2: ARA Compiler

The `ARA Compiler` is for existing papers and repos.

It can take:

- a PDF,
- code,
- datasets,
- rubrics,
- trajectory logs,
- supplementary material,

and turn them into an ARA.

The compiler does more than text extraction. The hard part is recovering relationships:

- Which claim does this experiment test?
- Which config does this result depend on?
- Which code implements this method?
- Which dead-end trace explains this design choice?

This is why the paper describes compilation as forensic reconstruction, not just document conversion.

## Step 6: How Review Changes

The paper proposes an `ARA Seal`, a three-level verification credential.

### Level 1: Structural Integrity

This checks whether the artifact is well formed.

Examples:

- required files exist,
- schemas are valid,
- claims have required fields,
- references resolve.

This is like linting for research artifacts.

### Level 2: Argumentative Rigor

This checks whether the argument is well supported.

Examples:

- Does the cited evidence actually support the claim?
- Are falsification criteria meaningful?
- Is the claim scoped correctly?
- Are baselines and ablations adequate?
- Does the exploration graph contradict any live claim?

This is not the same as judging novelty. It is a structured rigor check.

### Level 3: Execution Reproducibility

This checks whether central claims reproduce directionally under a compute budget.

The verification agent should not see the reported numbers. It gets the method and code, then tests whether the claimed direction holds.

For example:

```text
Does method A outperform baseline B on the relevant metric in a small reproduction?
```

The review pipeline then gives human reviewers the artifact plus machine-generated reports, so they can focus on the questions that remain human:

- Is the idea important?
- Is it novel?
- Is the taste good?
- Does it change the field's understanding?

## Step 7: What The Evaluation Shows

The paper evaluates ARA on three tasks.

### Understanding

Question:

```text
Can an agent extract the right information from the artifact?
```

Result:

```text
ARA: 93.7%
Baseline PDF/repo: 72.4%
```

The strongest gains come when the answer requires configuration details or failure knowledge. That makes sense: those are exactly the kinds of information papers omit or scatter.

### Reproduction

Question:

```text
Can an agent reproduce experimental results from the artifact?
```

Result:

```text
ARA: 64.4%
Baseline PDF/repo: 57.4%
```

The gain is larger on harder tasks. Easy tasks are often solvable from a normal repo. Hard tasks need precise configs, environment details, and claim-to-code mapping.

### Extension

Question:

```text
Can an agent extend prior work faster if it has prior failure traces?
```

Result:

ARA helps agents make useful early progress across all five RE-Bench tasks tested. But the final outcome is mixed: ARA wins on three tasks and loses on two under a stronger model.

This is subtle and important.

Failure traces can save time by warning an agent away from bad paths. But they can also anchor the agent to the old search space. A strong enough agent might invent something the trace never contained.

So the best future system may not simply dump every trace into context. It may need to rank, filter, or contextualize traces by model capability and task relevance.

## Step 8: The Main Caveat

The paper is about computational research, especially ML and systems-style work.

It is much less clear how the same structure transfers to:

- wet-lab biology,
- purely theoretical papers,
- fields where evidence is not executable,
- work with sensitive or private traces,
- projects where AI agents were not present during the research.

There is also a security issue. ARA asks agents to execute and trust structured artifacts. That means sandboxing, provenance, privacy controls, and adversarial robustness become central.

The paper acknowledges these as future work.

## Critique

The strongest part of the paper is the diagnosis. The distinction between a human-persuasive paper and an agent-sufficient artifact is sharp and useful.

The four-layer structure is also sensible. It separates knowledge types that ordinary papers mix together:

- claims,
- code,
- process,
- evidence.

The evaluation supports the claim that structure helps agents. The improvements in understanding and reproduction are believable because they match the mechanism: agents do better when details are centralized and cross-linked.

The main risk is adoption. A protocol can be technically good and still fail if maintaining it feels like extra work. The Live Research Manager is therefore the crucial piece. If it actually makes ARA nearly automatic, the idea is plausible. If not, it becomes another documentation standard that researchers admire but do not use.

The second risk is over-structuring. Research is messy, and premature formalization can distort it. The paper's maturity-tracker idea is an attempt to avoid that: raw observations should not become formal claims until there is enough closure.

The third risk is trace anchoring. The extension results show that failure knowledge is not unconditionally good. It helps when the trace contains better ideas than the agent would find alone. It hurts when it narrows a stronger agent's search.

## Memory Checklist

Remember these:

- `ARA` means Agent-Native Research Artifact.
- The paper argues that PDFs lose information agents need.
- `Storytelling Tax`: dead ends and process knowledge disappear in the final narrative.
- `Engineering Tax`: papers are not detailed enough for agent execution.
- ARA has four layers: `logic/`, `src/`, `trace/`, `evidence/`.
- The Live Research Manager captures research structure during human-agent sessions.
- The ARA Compiler converts legacy PDFs/repos into ARAs.
- The ARA Seal checks structure, rigor, and bounded reproducibility.
- ARA improves knowledge extraction and reproduction in the paper's evaluations.
- Failure traces help early progress but can constrain strong agents.

## Quick Check

Try answering these:

1. What is the difference between the Storytelling Tax and the Engineering Tax?
2. Why is a paper often enough for a reviewer but not enough for an agent?
3. What are the four ARA layers?
4. What does the `trace/` layer preserve that normal papers discard?
5. What does the Live Research Manager do?
6. Why is the ARA Compiler harder than PDF-to-Markdown conversion?
7. What are the three ARA Seal levels?
8. Why did failure traces sometimes hurt stronger agents in extension tasks?

One-sentence answer to aim for:

`ARA is a structured research package that links claims, code, exploration history, and evidence so agents can understand, reproduce, verify, and extend research without reverse-engineering a narrative paper.`
