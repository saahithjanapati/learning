# Synthetic Computers at Scale for Long-Horizon Productivity Simulation

Source: `https://arxiv.org/abs/2604.28181`
PDF: `https://arxiv.org/pdf/2604.28181`
DOI: `https://doi.org/10.48550/arXiv.2604.28181`
Site: `arXiv`
Published: `2026-04-30`
Authors: `Tao Ge, Baolin Peng, Hao Cheng, Jianfeng Gao`
Subjects: `Artificial Intelligence (cs.AI); Computation and Language (cs.CL); Machine Learning (cs.LG)`
Comments: `Preview version; work in progress`
Extraction engine: `arXiv HTML review + manual structured ingest`
Strategy: `canonical paper extraction and curriculum-oriented normalization`

## Medium-Length Version

This paper introduces `Synthetic Computers at Scale`, a method for generating full user-specific computer environments and using them as the substrate for long-horizon productivity-agent simulations.

The central idea is that realistic productivity work is not just a task prompt. It is grounded in a user's files, directory structure, prior work, collaborator context, naming habits, project history, and evolving artifacts. If synthetic agent training only creates generic tasks, it misses the environmental context that makes real work hard. The paper therefore proposes synthesizing the computer itself: a persona becomes a detailed user profile, the profile becomes a filesystem plan, the plan becomes a populated computer full of documents, spreadsheets, presentations, PDFs, and related artifacts, and then agents perform month-scale work inside that environment.

In preliminary experiments, the authors create 1,000 synthetic computers. For each computer, a setup agent defines realistic productivity objectives and collaborator context, and a work agent acts as the user over about a month of simulated work. The resulting runs are long: the average simulation takes 2,272 turns and 8.59 hours of runtime. The main empirical claim is that these trajectories contain useful experiential learning signals. When retrospective reports from prior simulations are distilled into occupation-specific skills, they improve agent performance both on held-out synthetic computers and on the out-of-domain GDPVal productivity benchmark.

## Full-Length Version

## Core Claim

The paper argues that synthetic data for productivity agents should synthesize `context-rich worlds`, not merely `task instances`.

For long-horizon productivity work, the agent needs to:

- find relevant files,
- infer project state from prior artifacts,
- produce multiple professional deliverables,
- coordinate with collaborators,
- incorporate feedback,
- revise outputs over time,
- recover from process failures.

That behavior cannot be represented well by a standalone prompt plus a few attachments. The authors' answer is to generate entire synthetic computers and then run extended simulations inside them. This turns the generated data into something closer to experiential training data: not only final answers, but traces of planning, search, grounding, collaboration, artifact creation, failure, and revision.

## Method Pipeline

### 1. Start From Personas

Each synthetic computer begins from a persona. The persona is expanded into a detailed user profile containing the user's occupation, organization, career stage, responsibilities, active projects, collaborators, recent work history, common work products, tool preferences, computer-use habits, naming conventions, and organization style.

This profile matters because two users with the same job title may have very different files, workflows, and habits. The paper treats that user-specific variation as part of the data generation target.

### 2. Plan The Computer Environment

The system then builds a filesystem policy and file inventory. The policy specifies broad conventions such as:

- operating-system style,
- drive layout,
- default paths,
- storage patterns,
- naming style,
- document habits,
- virtual time axis.

The file inventory specifies planned paths, artifact types, descriptions, timestamps, origins, and content modes. The paper also builds a directed dependency graph over files so that artifacts are not generated as independent samples. Later files can refer to, revise, summarize, or derive from earlier files.

### 3. Instantiate Artifacts

The filesystem plan is materialized on disk. Windows-style paths are mapped into portable directories, but the intended operating-system semantics are preserved.

Artifacts are then created in dependency-aware order. Public downloadable artifacts can be fetched from the web if available; otherwise files are synthesized. User-specific artifacts are created with an LLM agent equipped with artifact-creation tools. The paper emphasizes content-rich artifacts rather than placeholders, including DOCX, XLSX, PPTX, PDFs, code, text, images, and structured data.

### 4. Create Productivity Objectives

Given a synthetic computer, a setup agent creates productivity objectives tailored to the user's role, current projects, existing files, and responsibilities. These objectives are organized as several deliverable work packages, usually requiring multiple professional outputs such as analysis workbooks, memos, decks, supporting materials, and final PDFs.

The setup agent also creates simulated collaborators: managers, peers, clients, compliance reviewers, external partners, or other stakeholders. Collaborators may have private reference materials that are shared only through later interaction.

### 5. Run Long-Horizon Work Simulation

The work agent acts as the user. It receives the user profile, productivity objectives, collaborator descriptions, and access to the synthetic computer. It must navigate the filesystem, read relevant artifacts, create and revise files, message collaborators, process replies, and keep working across simulated weeks and days.

The simulation proceeds through weekly planning and daily execution. Each day is a separate agent session that restores context from the activity log, current computer state, and collaborator replies. The computer changes over time as new files are created, old files are revised, messages are exchanged, and the file graph is updated.

## Experimental Setup

The preliminary experiment creates 1,000 synthetic computers from sampled personas.

Runtime setup:

- Agent runtime: `Claude Code SDK`
- Main setup model: `Claude Opus 4.6`
- Main work-agent model: `Claude Sonnet 4.6`
- Artifact tools: Anthropic skills for non-Office artifacts and MiniMax open-source Office-generation skills for DOCX, XLSX, PPTX, and PDF.

The paper also releases:

- 100 synthetic computers,
- 50 Windows-style environments,
- 50 macOS-style environments,
- retrospective analysis reports for 500 long-horizon simulations.

## Key Statistics

### Synthetic Computer Size

Before simulation, each synthetic computer contains about 112 files on average. After a month of simulated work, this rises to about 197 files.

| Statistic | Pre-simulation mean | Post-simulation mean |
| --- | ---: | ---: |
| Files per computer | 111.6 | 197.4 |
| Directories per computer | 30.4 | 36.0 |
| Average directory depth | 3.39 | 3.40 |
| Maximum directory depth | 5.5 | 5.6 |

The interpretation is that the work agent mostly extends the existing organization by creating and revising artifacts, rather than creating unrealistic folder sprawl.

### Artifact Mix

The paper reports that DOCX, XLSX, PDF, and PPTX together account for 67.8% of generated files. DOCX alone accounts for 34.8%. This supports the claim that the generated computers are centered on productivity artifacts rather than plain-text-only files.

### Long-Horizon Simulation Scale

| Simulation metric | Mean | Median | Min | Max |
| --- | ---: | ---: | ---: | ---: |
| Weekly planning turns | 63 | 63 | 48 | 85 |
| Daily execution turns | 2,209 | 2,166 | 1,499 | 3,180 |
| Total turns | 2,272 | 2,234 | 1,551 | 3,248 |
| Weekly planning time | 0.59 hours | 0.55 hours | 0.38 hours | 1.00 hour |
| Daily execution time | 8.00 hours | 7.74 hours | 5.82 hours | 10.79 hours |
| Total wall-clock time | 8.59 hours | 8.31 hours | 6.27 hours | 11.67 hours |

The average run is therefore far beyond a standard benchmark task. It is closer to a process simulation with persistent state.

## Evaluation

### Final Deliverable Evaluation

For 100 synthetic computers, the authors create rubrics by running the same simulation setting five times, asking a judge to inspect final deliverables, and merging draft rubrics into a more general final rubric. A Claude Opus 4.6 judge scores final deliverables against those rubrics.

The score distribution mostly falls between 60% and 80%. The paper reads this as evidence that the work agent can complete many deliverables, but still has meaningful room for improvement.

### Full Trajectory Analysis

The paper argues that final deliverables alone are not enough. A deliverable can look acceptable while still showing poor grounding, missed collaborator feedback, redundant work, or weak planning. Conversely, a bad final deliverable may trace back to a specific earlier process failure.

For that reason, each simulation is analyzed retrospectively. The retrospective report summarizes:

- what the agent did well,
- where it failed or underperformed,
- which failures are useful learning signals,
- which process patterns should be reinforced.

Those reports become the raw material for skill extraction.

## Learning From Simulations

### In-Domain Evaluation

The 1,000 synthetic computers are split into 900 training computers and 100 held-out test computers. The authors do not update model weights. Instead, they extract experience items from retrospective reports, group them by occupation, merge similar items, count how often each appears, and use a skill creator to write occupation-specific skills.

On 100 held-out synthetic computers:

| Condition | Mean score |
| --- | ---: |
| Baseline work agent | 61.6% |
| Skill-augmented work agent | 68.6% |
| Difference | +7.0 percentage points |

In paired comparison, the skill-augmented agent is better on 83 out of 100 test computers.

The paper also reports a scaling trend. Skills extracted from 10 computers do not help much, but skills from 100, 500, and 900 computers win on 64%, 75%, and 83% of test computers respectively. The claimed reason is twofold: more simulations cover more occupations, and frequency estimates become more reliable.

### Out-of-Domain Evaluation

The paper tests whether simulation-derived skills transfer to GDPVal, a productivity benchmark with 220 tasks.

The two settings differ sharply:

| Metric | Synthetic-computer simulations | GDPVal |
| --- | ---: | ---: |
| Average explicit reference files | 13.8 | 1.18 |
| Average computer files available | 112 | 0 |
| Average deliverables | 4.09 | 1.63 |
| Average turns | 2,272 | 31 |
| Average wall-clock time | 8.59 hours | 17 minutes |

In the primary Sonnet setting, the skill-augmented agent wins 105 GDPVal tasks and loses 67, with statistically significant sign tests reported by the paper. The authors also report positive but weaker transfer to Haiku and Opus.

## Why This Paper Matters

The paper is important because it reframes agent data generation around persistent environments.

Many agent benchmarks ask whether an agent can solve a bounded task. This paper asks a different question:

`Can we synthesize a realistic working world, let an agent operate in it for a long time, and then extract reusable experience from the process?`

That is a much closer fit to productivity agents, coding agents, research agents, and personal assistants. The most useful signal may not be a single final answer. It may be the trajectory: where the agent looked, what it ignored, when it asked for clarification, how it revised outputs, and what process failures repeated across occupations.

## Self-Improvement Loop

The broader loop proposed by the paper is:

1. Generate diverse synthetic computers.
2. Run long-horizon productivity simulations.
3. Analyze trajectories and deliverables.
4. Extract lessons, warnings, work patterns, and failure modes.
5. Convert those signals into skills or training data.
6. Improve the agent.
7. Use the improved agent to run the next round of simulations.

The authors treat external skills as an interpretable intermediate form of learning. Eventually, they suggest that the same signals could be distilled into model weights, after which the skill set can be reset and the loop can continue.

## Limitations And Caveats

- This is a preview/work-in-progress version, so the results should be treated as preliminary.
- The simulation quality depends heavily on the quality of the models used to generate profiles, files, collaborators, objectives, artifacts, rubrics, and retrospectives.
- The paper evaluates skill extraction rather than model-weight training, so it does not yet show a full reinforcement-learning loop.
- Synthetic computers may still miss subtle properties of real user environments, especially privacy-sensitive messiness, emotional context, organizational politics, and domain-specific constraints.
- Rubric-based judging is itself model-dependent.
- Scaling to millions or billions of environments is presented as a possibility, but the reported experiments are at 1,000 computers and are expensive: over 8 hours per simulation on average.
- The method could generate highly realistic professional contexts, which makes provenance, data governance, and misuse controls important if scaled.

## Practical Takeaway

The paper's main takeaway is not just "generate more synthetic tasks." It is:

`For long-horizon productivity agents, the synthetic environment is part of the training example.`

If the goal is to train or evaluate agents that use computers over extended periods, then realistic file systems, artifact histories, collaborator interactions, and evolving project state are core data. The paper provides a concrete pipeline for generating those environments and shows early evidence that trajectories inside them can be turned into useful agent-improvement signals.

## Bottom Line

This is a synthetic-data infrastructure paper for productivity agents. Its contribution is the idea and implementation of scalable synthetic computers as grounded worlds for long-horizon agent simulation.

If you remember one sentence from this paper, use:

`Synthetic computers turn productivity-agent training from prompt generation into world generation.`
