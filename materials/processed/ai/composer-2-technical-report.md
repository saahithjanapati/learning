# Composer 2 Technical Report

Source: `https://arxiv.org/pdf/2603.24477`
Canonical arXiv page: `https://arxiv.org/abs/2603.24477`
Source PDF: `materials/archive/composer-2-technical-report.pdf`
Title: `Composer 2 Technical Report`
Authors: Cursor Research Team
arXiv version: v2, 2026-03-26
Originally ingested: `2026-05-04`
Refreshed from PDF: `2026-05-14`
Extraction engine: Local PDF extraction with PyMuPDF plus manual structured ingest
Strategy: Full technical-report refresh and medium/full paper lesson normalization

## Summary

Composer 2 is Cursor's domain-specialized model for agentic software engineering. The report argues that strong coding agents need more than generic code knowledge: they need to act inside a realistic developer harness, navigate large repositories, use tools, recover from failures, maintain long-horizon coherence, and produce useful changes at interactive cost.

The training recipe has two main phases. First, Cursor starts from Kimi K2.5, a 1.04T-parameter / 32B-active-parameter Mixture-of-Experts base model, and runs continued pretraining on a code-dominated mixture. This stage includes a long-context extension to 256k tokens and a short SFT phase on targeted coding tasks. The goal is not merely lower perplexity, but a better base for the later RL stage.

Second, Cursor runs large-scale asynchronous reinforcement learning on coding tasks that emulate real Cursor sessions. The RL environments include tool use, long rollouts, multiple candidate solutions per prompt, and task distributions such as debugging, feature iteration, refactoring, codebase understanding, testing, code review, documentation, optimization, DevOps, migrations, and deletions. The paper emphasizes reducing train-deploy mismatch by training inside infrastructure close to the deployed Cursor harness.

The report's strongest conceptual contribution is the treatment of the product harness as part of the model-training problem. Environments are run on Anyrun, Cursor's internal platform for executing untrusted code at scale, using Firecracker VMs, shared tool libraries, controlled egress, environment snapshotting, and a shadow Cursor backend. Online evaluations also run a pinned version of the production backend and Cursor client.

Cursor introduces CursorBench, an internal benchmark built from real engineering sessions. The authors argue that public benchmarks are useful but incomplete because they are narrower, more overspecified, more contamination-prone, and less focused on the full developer experience. CursorBench-3 tasks require a median of 181 changed lines, compared with 7 to 10 for SWE-bench Verified and SWE-bench Multilingual, and their prompts are shorter and more ambiguous.

The headline result is that Composer 2 reaches 61.3 on CursorBench-3, 73.7 on SWE-bench Multilingual, and 61.7 on Terminal-Bench. It improves substantially over Composer 1.5 and Composer 1 while staying cost-efficient relative to general frontier models. The paper's broader claim is that domain-specialized training in realistic environments can produce frontier-level coding-agent performance without relying only on larger general-purpose models.

## Main Points

### 1. Agentic SWE is not code completion

Composer 2 targets repository-level work: inspect files, decide where to act, edit code, run tools, interpret failures, recover, and finish a task. The model is optimized for the whole interaction loop rather than only for static code prediction.

### 2. Continued pretraining is used as a base-building stage

Cursor uses internal evaluations for coding knowledge, state tracking, and codebase perplexity to select the base model, then specializes it with continued pretraining. The report explicitly studies whether lower codebase perplexity predicts downstream RL performance and finds evidence that it does.

### 3. RL is run in realistic agent environments

The RL stage samples coding tasks, runs multiple rollouts from the agent, scores solution quality, and updates the full model. The pipeline is asynchronous, single-epoch over prompts, and designed to minimize policy staleness through fast weight synchronization and in-flight weight updates.

### 4. Self-summarization is part of long-horizon behavior

Composer 2 uses self-summarization across chained generations so the model can work over longer trajectories than a single context window would otherwise allow. The final reward is applied to both agent responses and self-summaries, which rewards summaries that preserve useful state and penalizes summaries that lose critical information.

### 5. Behavior shaping matters

The paper is not only about accuracy. Cursor adds auxiliary rewards for coding style, communication, and product-specific behavior. They also add penalties for poor tool use, such as creating to-do items and leaving them unfinished, and they monitor for emergent behaviors during RL.

### 6. CursorBench is meant to measure real developer workflows

CursorBench is built from real internal engineering sessions rather than public repository issues. It is designed to capture ambiguity, large code changes, production logs, multi-file reasoning, code quality, latency, cost, and interactive behavior.

### 7. Infrastructure is a major part of the result

The report spends substantial space on context parallelism, MXFP8/NVFP4 training details, asynchronous service design, Anyrun environments, router replay for MoE training, delta-compressed weight synchronization, and online evaluation deployments. The message is that large-scale agentic RL is an infrastructure problem as much as an algorithm problem.

## Results To Remember

- Composer 2: 61.3 on CursorBench-3.
- Composer 2: 73.7 on SWE-bench Multilingual.
- Composer 2: 61.7 on Terminal-Bench.
- Composer 1.5: 44.2 CursorBench, 65.9 SWE-bench Multilingual, 47.9 Terminal-Bench.
- Composer 1: 38.0 CursorBench, 56.9 SWE-bench Multilingual, 40.0 Terminal-Bench.
- CursorBench tasks are much larger and more ambiguous than common public SWE benchmarks: median 181 changed lines versus 7 to 10 for SWE-bench Verified and Multilingual, and median prompt length 390 characters versus 1,185 to 3,055.

## Interpretation

Composer 2 is best understood as a case study in realistic post-training for agents. The paper does not say that static code intelligence is unimportant. It says that static code intelligence is not enough. For agentic software engineering, the model must learn to act inside a tool-rich environment whose dynamics resemble deployment.

This also makes the paper relevant to alignment and evaluation. When RL happens inside a realistic harness, the reward function, verifier, tool set, environment isolation, egress controls, and benchmark distribution all become part of the training signal. The model is not just learning to write code; it is learning what kind of behavior succeeds in a software-engineering institution.

## Limitations And Caveats

- CursorBench is internal, so outside researchers cannot fully audit the benchmark or reproduce the headline internal score.
- The report is product-lab work and naturally focuses on the tasks, infrastructure, and cost profile most relevant to Cursor.
- The public benchmark setup still depends on harness choices, prompt choices, and refusal/filter behavior in third-party models.
- The paper emphasizes performance and infrastructure more than safety analysis. It mentions behavior monitoring and egress control, but does not deeply analyze reward hacking, security failures, or model behavior under adversarial tool use.
- A recipe that works in Cursor's environment may not transfer directly to other coding-agent products without similar data, environment infrastructure, and evaluation loops.

## Questions To Remember

- Which parts of Composer 2's improvement come from the base model, continued pretraining, the RL task distribution, the harness, or the evaluation stack?
- How much does CursorBench measure general software-engineering skill versus Cursor-specific workflow skill?
- What safety and reward-hacking audits should accompany large-scale coding-agent RL?
- Can public benchmarks be made realistic enough without becoming contaminated or too expensive to maintain?
- How should agentic coding systems balance accuracy, latency, cost, code quality, and user experience?
