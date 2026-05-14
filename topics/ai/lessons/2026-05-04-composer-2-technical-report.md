# Composer 2 Technical Report

Source note: This lesson is based on the Cursor Research Team's "Composer 2 Technical Report," arXiv:2603.24477v2, dated 2026-03-26. Source: [arXiv PDF](https://arxiv.org/pdf/2603.24477). Processed source: [source material](/topics/ai/lessons/composer-2-technical-report/).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

Composer 2 is Cursor's technical report about training a model specifically for agentic software engineering. The central claim is not just "we made a better coding model." It is more specific: strong coding agents need training and evaluation environments that look like the workflow where they will actually be deployed.

That matters because agentic software engineering is not the same as code completion. A code-completion model predicts the next useful snippet. A coding agent must inspect a repository, understand a sparse user request, choose files to open, edit code, run commands, interpret errors, recover from failed attempts, and keep the whole thread coherent over many steps. The report treats that whole loop as the real task.

The training recipe has two stages. First, Cursor starts from Kimi K2.5, a 1.04T-parameter / 32B-active-parameter Mixture-of-Experts model, and runs continued pretraining on a code-dominated mixture. This stage includes most compute at 32k tokens, a shorter long-context extension to 256k tokens, and a short supervised fine-tuning phase on targeted coding tasks. The purpose is to build a stronger base for later agentic RL, not just to lower generic language-model loss.

Second, Cursor runs large-scale reinforcement learning on realistic coding tasks. The RL distribution includes debugging, feature iteration, refactoring, codebase understanding, testing, code review, documentation, optimization, DevOps, migrations, and deletions. In later training stages, they upsample harder problems using simple signals like number of turns and thinking tokens.

The RL system is highly asynchronous. It samples multiple rollouts per prompt, updates the full model with policy gradients, and tries to reduce policy staleness through fast weight synchronization and in-flight weight updates. Because the model is a Mixture-of-Experts system, Cursor also uses router replay so the trainer can match the expert routing decisions made during inference. That detail matters: if the trainer computes log probabilities under a different route from the one used to sample the action, the policy-gradient signal becomes noisy.

One of the most interesting behavioral pieces is self-summarization. Composer rollouts can chain multiple generations together through model-written summaries. The final reward is applied to both the agent's actions and the summaries that supported those actions. Good summaries that preserve state get reinforced; bad summaries that lose important information get penalized. This makes memory compression part of the learned agent behavior rather than only a fixed wrapper around the model.

The report also shows how much infrastructure matters. Cursor trains and evaluates inside Anyrun, an internal platform for running untrusted code at scale with Firecracker VMs, environment snapshotting, controlled egress, and a shared tool library. A shadow deployment of the Cursor backend is used during training so the tool behavior resembles deployment. Online evaluations run a pinned production-like backend and Cursor client. The message is blunt: for software agents, the harness is part of the model-development stack.

CursorBench is the report's internal evaluation suite. Cursor argues that public coding benchmarks are useful but incomplete because they are narrower, often overspecified, contamination-prone, and weak proxies for the full developer experience. CursorBench tasks come from real engineering sessions. They are larger and more ambiguous: the paper reports a median of 181 changed lines for CursorBench-3, compared with 7 to 10 changed lines for SWE-bench Verified and SWE-bench Multilingual, and shorter prompts than public benchmarks.

The headline results are strong. Composer 2 scores 61.3 on CursorBench-3, 73.7 on SWE-bench Multilingual, and 61.7 on Terminal-Bench. It improves substantially over Composer 1.5 and Composer 1, and the paper argues that it reaches a favorable accuracy/cost frontier for real developer workflows.

The main takeaway is that Composer 2 is a case study in realistic post-training for agents. Static coding knowledge still matters, but the paper's deeper lesson is that long-horizon agent competence emerges from the interaction among base model selection, continued pretraining, RL task design, environment fidelity, tool scaffolding, evaluation realism, and production-like infrastructure.

For Learning Machine, this connects directly to the recent reward-hacking and post-training lessons. If a coding agent is trained in realistic environments, then the reward model, verifier, tool permissions, egress controls, benchmark distribution, and monitoring system are all part of the training signal. Composer 2 is a performance paper, but it also gives a concrete map of where safety and evaluation questions will live in serious agentic RL systems.

## Full-Length Version

### The Central Question

Composer 2 asks a practical question:

> How do you train a model that is genuinely good at real software-engineering work, not merely good at static coding benchmarks?

The distinction matters. Real software engineering is not usually "write this function from a complete specification." It is often "something is wrong in this large system; find the relevant code, infer the intended behavior, decide on a minimal fix, run tools, handle failures, and explain what changed."

Composer 2 is designed for that harder setting. The paper is about an agentic coding model, not a completion model.

### Why Agentic SWE Is Different From Code Completion

A normal coding assistant can be evaluated as a text generator. Given a prompt, does it emit a good code snippet?

An agentic software-engineering model has to run a loop:

1. Interpret the task.
2. Inspect the repository.
3. Decide what evidence matters.
4. Edit files.
5. Run commands or tests.
6. Read failures.
7. Revise the plan.
8. Stop when the codebase is in a good final state.

This creates a different capability target. The model needs state tracking, judgment about when to search, skill with tools, long-horizon planning, recovery from wrong turns, and the restraint to avoid unnecessary edits.

That is why the report keeps returning to train-deploy match. If deployment is an interactive Cursor session, then training on static code answers leaves a large gap.

### Base Model Selection

Cursor starts from a strong base model rather than training everything from scratch. The selected base is Kimi K2.5, described as a 1.04T-parameter / 32B-active-parameter Mixture-of-Experts model.

The base model is selected using internal evaluations for:

- coding knowledge;
- state tracking;
- codebase perplexity;
- infrastructure efficiency.

One interesting detail is that Cursor says it does not select the base model using coding-agent benchmarks. Their reason is that agentic and long-horizon capabilities can change substantially during the RL stage, so static pre-RL agent benchmarks may not predict the final model well.

### Continued Pretraining

The first training phase is continued pretraining on a code-dominated mixture.

This phase has three parts:

1. Most compute at 32k token sequence length.
2. A shorter long-context extension to 256k tokens.
3. A short supervised fine-tuning phase on targeted coding tasks.

The purpose is to create a better base for agentic RL. The report studies this by applying a similar continued-pretraining recipe to a smaller Qwen model at several compute levels, then running the same SFT and RL recipe afterward. The result is that better codebase perplexity after continued pretraining predicts better downstream RL reward.

That is a useful conceptual point. Pretraining quality is not only a standalone metric; it can determine how much later RL can exploit.

### Reinforcement Learning On Realistic Coding Tasks

The second phase is large-scale RL on coding tasks.

At a high level, RL does this:

1. Sample a coding problem.
2. Run a group of rollouts from the agent, producing different attempted solutions.
3. Score solution quality.
4. Update the model weights based on those outcomes.

The task distribution is broad. The paper's categories include feature iteration, debugging, new features, refactors, codebase understanding, documentation, testing, code review, optimization, DevOps, migrations, deletions, and other engineering work.

In later training, Cursor upweights harder examples using signals like number of turns and thinking tokens. That is a simple but important idea: the training curriculum becomes more focused on long-horizon difficulty as the model improves.

### The Asynchronous RL System

The RL pipeline is highly asynchronous. Training workers and rollout-generation workers operate independently, and the system updates the full parameter set.

Cursor uses a policy-gradient method with multiple samples per prompt and a fixed group size. The paper discusses several stability choices:

- single-epoch prompt usage, so the same prompt is not trained on twice;
- removing the length-standardization term from GRPO to avoid length bias;
- not normalizing group advantages by standard deviation, because tiny differences in equally correct groups can otherwise be overamplified;
- avoiding overlong-rollout masking after small-scale experiments did not show benefits;
- using the standard KL estimator `k1 = -log r` rather than a low-variance estimator that can blow up when policies diverge.

The bigger practical problem is policy staleness. In asynchronous RL, rollout workers may sample from weights that are already behind the trainer. Cursor reduces this with fast weight synchronization and in-flight weight updates, so later tokens in a rollout are less off-policy than they otherwise would be.

### Router Replay For Mixture-of-Experts Training

Because Kimi K2.5 is a Mixture-of-Experts model, expert routing matters. If inference chooses one expert path for a token and the trainer later computes log probabilities using a different expert route, the policy-gradient signal can become noisy.

Cursor uses router replay. During inference, the system records the selected expert indices for every token at every MoE layer. During training, the router's expert assignment is overridden to match those recorded choices, while gradients still flow through the router's scores.

This is a very concrete example of how agentic RL depends on engineering details. The algorithmic idea only works if the training system can faithfully reconstruct what the sampling policy actually did.

### Self-Summarization As Learned Memory Compression

Composer 2 uses the self-summarization technique introduced in Composer 1.5.

Instead of treating a long task as one prompt-response pair, a rollout can involve multiple generations linked by model-written summaries. This helps the model work across long horizons even when context is limited.

The clever part is how the reward is assigned. The final reward is applied to all model tokens in the chain, including the summaries. So if a summary preserves crucial state and helps the final solution succeed, it is reinforced. If a summary loses key context and causes failure, it is penalized.

That turns summarization into part of the agent's learned policy. The model is not only learning what code to write; it is learning what state to keep.

### Behavior Shaping And Developer Experience

The paper is not only optimizing correctness.

Cursor adds auxiliary rewards for coding style, communication, and product-specific behavior. It also penalizes poor tool-use patterns, such as creating to-do list items and leaving them unfinished.

They monitor emergent behavior during RL and add behavior rewards when needed. The examples are revealing: the model sometimes left long chains of thought in comments or collapsed toward using only the terminal tool. Those are not ordinary benchmark failures, but they matter a lot in an interactive product.

The report also introduces a nonlinear length penalty. The goal is to make the model act quickly on easy tasks while still allowing longer reasoning and tool use on hard tasks. This is a product-shaped objective: useful agents are not only accurate; they must feel responsive and appropriately economical.

### Why CursorBench Exists

CursorBench is the paper's internal evaluation suite for real-world software-engineering tasks.

The authors argue that public coding benchmarks have four limitations:

- domain mismatch, because benchmarks often focus on narrow bug fixing or abstract terminal puzzles;
- prompt overspecification, because public tasks tend to specify the intended solution too clearly;
- contamination and overfitting, because public repositories and fixed benchmark tasks can leak into training mixtures;
- narrow evaluation scope, because functional correctness misses code quality, latency, cost, and interactive behavior.

CursorBench is built from real internal engineering sessions. The tasks are more ambiguous, require more code changes, and resemble the way developers actually ask for help.

One example in the paper involves a terse production bug report, Datadog logs, and an esbuild downleveling issue in a retry loop. The agent has to connect sparse symptoms, logs, and code. Another example asks the agent to inspect hundreds of chat-response logs and design a heuristic detector for a subtle streaming prefix bug.

These examples explain the benchmark philosophy: real tasks often require investigation, not only implementation.

### CursorBench Versus Public SWE Benchmarks

The paper reports that CursorBench-3 tasks require a median of 181 changed lines, while SWE-bench Verified and SWE-bench Multilingual require only 7 to 10. CursorBench prompts are also shorter and less specified, with a median prompt length of 390 characters versus 1,185 to 3,055 for public benchmarks.

This is not automatically "better" in every sense. Public benchmarks are easier to compare across labs because everyone can inspect and run the same tasks. CursorBench is private and product-specific.

But the argument is reasonable: if the deployment target is real engineering work, an internal benchmark built from real engineering sessions may measure the target better than a public static benchmark.

### Infrastructure As Part Of The Model

The infrastructure sections are unusually important.

For training, Cursor discusses context parallelism, long-context scaling, MXFP8 and NVFP4 precision issues, and fault-tolerant asynchronous services. The training job spans multiple regions, with separate systems for training, environments, inference, and evaluation.

For environments, Cursor uses Anyrun, an internal compute platform for running untrusted code at scale. Environments run in Firecracker VMs and can include full development environments, browser and GUI support, controlled egress, environment snapshotting, and forking. The same platform powers Cursor Cloud Agents and Automations.

For tool fidelity, Cursor maintains a shadow deployment of the Cursor backend. That lets training and rollout environments use tool behavior close to production while still allowing controlled training differences when needed.

For inference, Cursor partners with Fireworks AI and synchronizes updated weights through delta-compressed uploads to shared cloud storage. This lets geographically distributed inference clusters reconstruct new model weights without direct connectivity to the training cluster.

For online evaluations, Cursor runs pinned production-like backends and clients so evaluation behavior matches what users would see.

The lesson is that large-scale agentic RL is not just an optimizer. It is a distributed systems project.

### Results

The headline results are:

| Model | CursorBench-3 | SWE-bench Multilingual | Terminal-Bench |
| --- | ---: | ---: | ---: |
| Composer 2 | 61.3 | 73.7 | 61.7 |
| Composer 1.5 | 44.2 | 65.9 | 47.9 |
| Composer 1 | 38.0 | 56.9 | 40.0 |

The gains are large. Composer 2 improves over Composer 1.5 by 37 percent relative on CursorBench-3, and over Composer 1 by 61 percent relative. On public benchmarks, it improves by 7.8 points over Composer 1.5 on SWE-bench Multilingual and 13.8 points on Terminal-Bench.

The report also emphasizes cost. Composer 2 is meant to be competitive with frontier models while being cheaper to serve for Cursor's workload. The paper frames this as a domain-specialized Pareto frontier: strong enough accuracy for real coding tasks at a better cost profile than many general-purpose frontier systems.

### What The Paper Shows

The paper shows that realistic post-training can materially improve an agentic coding model.

More specifically, it supports several claims:

- continued pretraining can improve the base for downstream RL;
- RL inside realistic coding environments can improve both average and best-of-K performance;
- agent behavior needs reward shaping beyond correctness;
- private, deployment-aligned benchmarks can reveal differences that public benchmarks flatten;
- infrastructure fidelity is central when the deployed product is an interactive coding harness.

The most important synthesis is:

```text
the model, harness, task distribution, verifier, and evaluation stack are one system
```

Composer 2 is not just a set of weights. It is a trained policy inside a particular software-engineering loop.

### What The Paper Does Not Fully Answer

The paper is also limited in important ways.

First, CursorBench is private. That may be necessary for contamination avoidance and product realism, but it means the headline internal score cannot be independently audited in the same way as a public benchmark.

Second, the report is a product-lab technical report. It naturally emphasizes Cursor's own cost, harness, and task distribution. That is not a flaw, but it should shape how broadly we generalize.

Third, the safety analysis is thinner than the performance analysis. The paper mentions behavior monitoring, controlled egress, untrusted-code isolation, and tool behavior constraints, but it does not deeply study reward hacking, prompt injection, supply-chain risk, or strategic behavior under RL.

Fourth, the recipe may depend heavily on having Cursor-scale infrastructure and real product data. A smaller lab may not be able to reproduce the environment distribution, feedback loops, or evaluation fidelity.

### Connection To Other Learning Machine Topics

This paper connects tightly to the reward-hacking and post-training lessons.

The Natural Emergent Misalignment lesson warns that reward hacking in realistic coding RL can generalize beyond the local task. Composer 2 shows the kind of realistic coding RL infrastructure where that concern would become concrete. If the agent learns in production-like environments, then verifier design, tool permissions, egress controls, and monitoring are not secondary details. They shape the learned policy.

It also connects to Rubrics as Rewards and Online Rubrics Elicitation. CursorBench and the auxiliary behavior rewards are forms of structured supervision for open-ended work. The model is not rewarded only for test passing; it is shaped toward code quality, communication, latency, and tool behavior.

It connects to PostTrainBench because both papers ask whether models can perform post-training or software-engineering workflows as agents. Composer 2 is the product-scale version of that story: large RL infrastructure, real codebases, real tool loops, and evaluation on full tasks.

Finally, it connects to model-evaluation lessons like MoReBench and GDPval. The shared theme is that final-answer correctness is too narrow. For agents, the process, context, cost, and downstream usefulness matter.

### Scale AI Prep Relevance

For Scale AI research internship prep, Composer 2 is useful because it is a concrete example of data and evaluation becoming the product.

The key questions are exactly the kind of questions a Scale-style research role might care about:

- What should count as a realistic software-engineering task?
- How do you build a benchmark that avoids contamination but remains representative?
- How do you score open-ended agent behavior beyond pass/fail correctness?
- How do you create task distributions that improve the model without overfitting to the harness?
- How do you monitor reward hacking and other unwanted behaviors during RL?
- How do cost, latency, and quality become part of the objective?

The paper is also useful because it shows that "data quality" for agents is not just high-quality documents. It is high-quality environments, high-quality task distributions, high-quality verifiers, and high-quality feedback loops.

### What To Remember

Composer 2 is a strong example of domain-specialized post-training. The base model matters, but the interesting story is the system around it: continued pretraining, realistic coding RL, self-summarization, behavior shaping, CursorBench, Anyrun environments, production-like tool fidelity, and online evaluation.

The practical lesson is that agentic model training is not only about making the model smarter in the abstract. It is about putting the model inside the right loop and making that loop faithful to deployment.

The caution is that the same loop can shape more than capability. If rewards, verifiers, tools, or environments are flawed, they become part of what the model learns. Composer 2 is therefore both a performance paper and a map of where future agent safety work has to pay attention.
