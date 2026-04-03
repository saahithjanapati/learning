# Scale Labs Papers: 2025-2026

Scope: papers listed on `https://labs.scale.com/papers` dated in 2025 or 2026.

Notes:
- I scraped 41 papers total: 36 from 2025 and 5 from 2026.
- Most PDFs were downloaded to `materials/archive/scale-labs-papers-2025-2026/pdfs/`.
- One paper, `Progress over Points`, is hosted on OpenReview and was not directly downloadable from this environment, but its abstract and Labs page description were captured.

## 2026

- `03.12.2026` `Defensive Refusal Bias: How Safety Alignment Fails Cyber Defenders`
  - Studies how safety alignment can over-refuse benign cyber defense work, creating a failure mode where "safe" models block legitimate defensive use.

- `02.25.2026` `VeRO: An Evaluation Harness for Agents to Optimize Agents`
  - Introduces a reproducible harness for optimizer agents that improve other agents through edit-execute-evaluate loops, with versioning, rewards, and structured traces.

- `02.12.2026` `LHAW: Controllable Underspecification for Long-Horizon Tasks`
  - Creates a pipeline for turning well-specified tasks into ambiguous long-horizon variants so researchers can measure clarification behavior and underspecification handling.

- `01.15.2026` `SciPredict: Can LLMs Predict the Outcomes of Research Experiments in Natural Sciences?`
  - Evaluates whether LLMs can forecast scientific experiment outcomes, framing scientific prioritization itself as an evaluation target.

- `01.06.2026` `Agentic Rubrics as Contextual Verifiers for SWE Agents`
  - Uses repository-aware rubric checklists as scalable contextual verifiers for software agents, reducing dependence on expensive test execution.

## 2025

- `12.22.2025` `MoReBench: Evaluating Procedural and Pluralistic Moral Reasoning in Language Models, More than Outcomes`
  - Benchmarks moral reasoning with emphasis on procedures and pluralistic value tradeoffs, not just final-answer outcomes.

- `12.18.2025` `MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers`
  - Evaluates realistic multi-step tool use across real MCP servers, focusing on discovery, orchestration, parameterization, and recovery.

- `12.17.2025` `Audio MultiChallenge`
  - Benchmarks end-to-end spoken dialogue systems on realistic multi-turn audio interactions rather than only text-based conversation.

- `11.25.2025` `PropensityBench`
  - Measures dangerous capability propensity and high-risk behaviors in frontier models rather than only surface refusal behavior.

- `11.13.2025` `Professional Reasoning Benchmark`
  - Shifts reasoning evaluation away from academic test sets and toward tasks that look more like professional work.

- `11.10.2025` `ResearchRubrics: A Benchmark of Prompts and Rubrics For Evaluating Deep Research Agents`
  - Builds a deep-research benchmark with expert-written rubrics to evaluate evidence-backed long-form agent outputs.

- `11.05.2025` `Best Practices for Biorisk Evaluations on Open-Weight Bio-Foundation Models`
  - Lays out methodology for evaluating biorisk in open-weight biology-oriented models.

- `10.28.2025` `Remote Labor Index: Measuring AI Automation of Remote Work`
  - Grounds automation claims in economically meaningful remote-work tasks and finds that current agents are still far from broad automation.

- `10.20.2025` `REASONING GYM: Reasoning Environments for Reinforcement Learning with Verifiable Rewards`
  - Introduces a procedural library of reasoning environments for RL with verifiable rewards, enabling effectively unbounded training data.

- `10.15.2025` `Beyond Seeing: Evaluating Multimodal LLMs On Tool-enabled Image Perception, Transformation, and Reasoning`
  - Tests multimodal agents that need to manipulate images with tools before reasoning over them.

- `10.08.2025` `Online Rubrics Elicitation from Pairwise Comparisons`
  - Shows how to infer reusable rubrics from pairwise preferences so open-ended tasks can get more interpretable supervision.

- `09.25.2025` `Chasing the Tail: Effective Rubric-based Reward Modeling for Large Language Model Post-Training`
  - Argues that reward misspecification is worst at the high-reward tail and that rubric-based rewards help reduce reward hacking there.

- `09.23.2025` `Progress over Points: Reframing LM Benchmarks Around Scientific Objectives`
  - Proposes moving from static point-scoring benchmarks to environments where good benchmark performance directly advances a scientific objective.

- `09.19.2025` `SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?`
  - Extends SWE evaluation to harder, longer, more enterprise-like software tasks that look more like professional engineering work.

- `09.11.2025` `TutorBench: A Benchmark To Assess Tutoring Capabilities Of Large Language Models`
  - Benchmarks tutoring ability around adaptivity, personalization, pedagogical quality, and correctness.

- `08.26.2025` `Reliable Weak-to-Strong Monitoring of LLM Agents`
  - Stress-tests monitor systems for covert agent misbehavior and shows that better monitoring scaffolds can let weaker models supervise stronger agents.

- `08.13.2025` `Search-Time Data Contamination`
  - Extends contamination concerns from training-time leakage to search- and retrieval-time leakage during evaluation.

- `07.23.2025` `MultiNRC: A Challenging and Native Multilingual Reasoning Evaluation Benchmark for LLMs`
  - Benchmarks multilingual reasoning natively across languages and cultures instead of translating from English-centric tasks.

- `07.23.2025` `Rubrics as Rewards: Reinforcement Learning Beyond Verifiable Domains`
  - Uses structured rubrics as reward signals so RL-style post-training can extend beyond exact-verifier domains like math and coding.

- `07.21.2025` `WebGuard: Building a Generalizable Guardrail for Web Agents`
  - Builds guardrails for web agents that need to avoid harmful or unintended real-world actions while browsing and acting online.

- `07.15.2025` `Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety`
  - Argues that natural-language reasoning traces can help safety monitoring, but that this opportunity is fragile and easy to break.

- `06.28.2025` `Teaching Models to Verbalize Reward Hacking in Chain-of-Thought Reasoning`
  - Studies whether models can be trained to reveal reward-hacking behavior in their reasoning traces instead of hiding it.

- `06.18.2025` `FORTRESS: Frontier Risk Evaluation for National Security and Public Safety`
  - Proposes a frontier-risk evaluation framework for national security and public safety scenarios.

- `06.16.2025` `Adaptive Guidance Accelerates Reinforcement Learning of Reasoning Models`
  - Shows that adaptive hints and guidance can improve RLVR efficiency and generalization for reasoning models.

- `06.13.2025` `Agent-RLVR: Training Software Engineering Agents via Guidance and Environment Rewards`
  - Makes RLVR work better for SWE agents by combining sparse environment rewards with guidance that steers agents into learnable trajectories.

- `06.05.2025` `A Red Teaming Roadmap Towards System-Level Safety`
  - Argues that red teaming should focus on realistic threat models, product-relevant specs, and system-level rather than model-only safety.

- `05.09.2025` `Assessing Robustness to Spurious Correlations in Post-Training Language Models`
  - Examines how post-training methods pick up spurious correlations and whether alignment holds under distribution shift.

- `03.14.2025` `Relevance Isn't All You Need: Scaling RAG Systems With Inference-Time Compute Via Multi-Criteria Reranking`
  - Improves RAG by using inference-time compute and richer reranking criteria rather than treating relevance as the only retrieval signal.

- `03.08.2025` `Critical Foreign Policy Decisions (CFPD)-Benchmark: Measuring Diplomatic Preferences in Large Language Models`
  - Measures model preferences and biases on diplomatic and foreign-policy decision problems.

- `03.05.2025` `The MASK Benchmark: Disentangling Honesty From Accuracy in AI Systems`
  - Separates truthfulness from correctness so models are not rewarded simply for sounding accurate.

- `02.13.2025` `ENIGMAEVAL: A Benchmark of Long Multimodal Reasoning Challenges`
  - Uses hard puzzle-style multimodal tasks to benchmark deeper reasoning and implicit knowledge synthesis.

- `02.11.2025` `J2: Jailbreaking to Jailbreak`
  - Shows that a jailbroken model can be used as a red teamer to jailbreak other models, including its own backbone model.

- `02.10.2025` `ProjectTest: A Project-level LLM Unit Test Generation Benchmark and Impact of Error Fixing Mechanisms`
  - Benchmarks project-level unit-test generation and studies whether error-fixing loops meaningfully improve performance.

- `01.29.2025` `MultiChallenge: A Realistic Multi-Turn Conversation Evaluation Benchmark Challenging to Frontier LLMs`
  - Benchmarks hard multi-turn conversational behavior, especially instruction following, context allocation, and reasoning across turns.

- `01.23.2025` `Humanity's Last Exam`
  - Introduces a very difficult frontier knowledge benchmark intended to remain unsaturated longer than standard academic tests.

- `01.02.2025` `ToolComp: A Multi-Tool Reasoning & Process Supervision Benchmark`
  - Benchmarks multi-step tool use and shows that process supervision can outperform outcome-only supervision in complex tool workflows.
