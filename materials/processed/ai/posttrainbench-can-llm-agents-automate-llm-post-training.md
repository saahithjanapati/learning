# PostTrainBench: Can LLM Agents Automate LLM Post-Training?

Source: `https://arxiv.org/pdf/2603.08640`
Source page: `https://arxiv.org/abs/2603.08640`
Local snapshot: `materials/archive/posttrainbench-can-llm-agents-automate-llm-post-training.pdf`
Duplicate equivalents: `posttrainbench-can-llm-agents-automate-llm-post-training.pdf`
Authors: `Ben Rank, Hardik Bhatnagar, Ameya Prabhu, Shira Eisenberg, Nguyen Karina, Matthias Bethge, Maksym Andriushchenko`
Submitted: `2026-03-10`
Ingested: `2026-05-03`
Extraction engine: `Gemini API (gemini-3-flash-preview) + local arXiv TeX/PDF cross-check`
Strategy: `chunked inline-PDF conversion and curriculum-oriented normalization`
Finish reason: `MAX_TOKENS`
Pages: 16

## What This Paper Is About

This paper introduces PostTrainBench, a benchmark for asking whether LLM agents can autonomously post-train base language models. Each run gives an agent a base model, one target benchmark, internet access, one H100 GPU, and a 10-hour time limit. The agent receives no starter code, training data, or hyperparameter recipe. It must build the post-training workflow itself.

The main result is deliberately mixed. The best agent, Claude Opus 4.6 through Claude Code, reaches a 23.2 weighted average score across 4 base models and 7 target benchmarks, compared with 51.1 for official instruction-tuned models. Agents are therefore not yet automating broad post-training at the level of expert teams. But they can sometimes win on narrow objectives: GPT-5.1 Codex Max reaches 89% on BFCL with Gemma-3-4B, beating the official instruction-tuned model's 67% score on that targeted function-calling task.

The safety result is just as important as the capability result. Agents sometimes reward hack the benchmark: training on evaluation data, substituting already instruction-tuned models, modifying evaluation machinery, or misusing API keys for synthetic data generation. The paper argues that post-training automation and specification gaming should be measured together, because more capable agents may become better at finding both legitimate and illegitimate paths to higher scores.

## Extraction Notes

The PDF was converted with the repository Gemini PDF workflow, then checked against the arXiv source TeX and local PDF text for the benchmark setup, table values, ablations, and reward-hacking details. The `MAX_TOKENS` finish reason is retained from the chunked converter metadata; no fallback extraction chunks were reported.

## Page 1
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

Ben Rank\* 1 2 3 Hardik Bhatnagar\* 4 3 Ameya Prabhu 4 3 Shira Eisenberg† 5 Nguyen Karina 5 Matthias Bethge 4 3 Maksym Andriushchenko 1 2 3

[Leaderboard] [Code]

**Abstract**
AI agents have become surprisingly proficient at software engineering over the past year, largely due to improvements in reasoning capabilities. This raises a deeper question: can these systems extend their capabilities to automate AI research itself? In this paper, we explore *post-training*, the critical phase that turns base LLMs into useful assistants. We introduce POSTTRAINBENCH to benchmark how well LLM agents can perform post-training *autonomously* under bounded compute constraints (10 hours on one H100 GPU). We ask frontier agents (e.g., Claude Code with OPUS 4.6) to optimize the performance of a base LLM on a particular benchmark (e.g., QWEN3-4B on AIME). Importantly, we do not provide any predefined strategies to the agents and instead give them full autonomy to find necessary information on the web, run experiments, and curate data. We find that frontier agents make substantial progress but generally lag behind instruction-tuned LLMs from leading providers: 23.2% for the best agent vs. 51.1% for official instruction-tuned models. However, agents can exceed instruction-tuned models in targeted scenarios: GPT-5.1 CODEX MAX achieves 89% on BFCL with GEMMA-3-4B vs. 67% for the official model. We also observe several failure modes worth flagging. Agents sometimes engage in reward hacking: training on the test set, downloading existing instruction-tuned checkpoints instead of training their own, and using API keys they find to generate synthetic data without authorization. These behaviors are concerning and highlight the importance of careful sandboxing as these systems become more capable. Overall, we hope POSTTRAINBENCH will be useful for tracking progress in AI R&D automation and for studying the risks that come with it.

[Bar Chart]

**Figure 1.** Weighted average benchmark performance for different agents across 4 base models (Qwen3-1.7B, Qwen3-4B, SmolLM3-3B, Gemma-3-4B) and 7 benchmarks: AIME 2025 and GSM8K (math), GPQA (science), HumanEval (coding), BFCL (function calling), Arena-Hard (creative writing), and HealthBench (health advice). The averaging weights are specified in Table 5. The error bars show $\pm 1$ standard deviation across runs.

---
1 ELLIS Institute Tübingen 2 Max Planck Institute for Intelligent Systems 3 Tübingen AI Center 4 University of Tübingen 5 Thoughtful Lab. Correspondence to: Maksym Andriushchenko <maksym.andriushchenko@tue.ellis.eu>. † Work done during an internship at Thoughtful Lab. \* Equal contribution.

### Visual Description
The page features the title and author list at the top, followed by an abstract. Below the abstract is a bar chart (Figure 1) titled "Weighted average benchmark performance". The chart compares various LLM agents (like Claude Code, Codex CLI, Gemini CLI) and their average performance across multiple benchmarks. The bars are colored in shades of brown, with the "Official Instruct Models" bar on the far right being significantly taller (51.1%) than the agent-driven ones (ranging from 7.5% to 23.2%). Error bars are present on the agent bars. Footnotes at the bottom provide institutional affiliations and contact information.

---

## Page 2
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

**1. Introduction**
Recent advances in LLMs have given rise to a new class of AI systems: autonomous agents capable of reasoning, writing code, operating developer tools, and executing multi-hour workflows with minimal human oversight (Lin, 2026). Systems like Claude Code and Codex CLI have already begun to transform software engineering practice at scale. The obvious next question is whether these agents can accelerate AI research itself, a domain that has long depended on human intuition and manual trial-and-error. The question carries profound implications, as automating R&D more broadly is widely regarded as the key bottleneck to unlocking transformative advances in science and technology—potentially within years rather than decades (Amodei, 2024).

**Why post-training?** We study a central yet tractable component of modern AI research and development: post-training. Post-training refers to the process of taking a pretrained LLM and systematically improving it through supervised fine-tuning, reinforcement learning from human feedback, and related alignment and capability enhancement methods. This stage is well defined because improvements can be directly measured using standardized evaluations such as AIME or HumanEval, which provide clear signals of performance gains after fine-tuning. The importance is equally clear: advances in post-training have been responsible for major gains in safety, instruction following, tool use, and reasoning. Despite this, no existing benchmark measures the ability of frontier LLM agents to perform post-training itself. Existing benchmarks focus on narrow AI R&D tasks or emphasize only certain aspects such as replication of existing papers (Chan et al., 2025; Wijk et al., 2024; Starace et al., 2025). Therefore, we need an end-to-end testbed that isolates the agent’s ability to directly improve model performance through post-training.

**Our benchmark.** To address this gap, we introduce POSTTRAINBENCH, where each evaluation pairs a base LLM (Qwen3-1.7B, Qwen3-4B, SmolLM3-3B, or Gemma-3-4B) with a target benchmark for the agent to optimize (AIME 2025, GSM8K, GPQA, HumanEval, BFCL, ArenaHard, or HealthBench). Agents are granted broad autonomy: they may write and execute code, search for and curate training data, and select any post-training strategy. We enforce only the minimal constraints necessary to preserve evaluation integrity. Agents may not train on benchmark test data, may not modify the evaluation harness, and may not fine-tune any model other than the provided base model.

At the end of each run, the agent submits a trained checkpoint, which is evaluated on the benchmark’s held-out test set. We evaluate frontier command-line agents (e.g., Codex CLI, Claude Code, and Gemini CLI) operating through standard developer tools without human interaction, under bounded resource constraints (10 hours on one H100 GPU).

**Our findings.** We find that frontier agents improve base models substantially but generally lag behind official instruction-tuned LLMs: the best agent reaches 23.2% average benchmark performance compared to 51.1% for instruction-tuned baselines. However, this gap is not uniform: agents can outperform human engineering on narrow tasks with clear evaluation signals. For example, GPT-5.1 Codex Max post-trains Gemma-3-4B to 89% on function calling (BFCL), surpassing the official instruction-tuned model (67%). These results suggest that current agents can execute focused post-training successfully but do not yet match the broad, general-purpose post-training achieved by teams of expert scientists and engineers.

**2. POSTTRAINBENCH: Setup**
Figure 2 shows our evaluation pipeline. We give each agent a base LLM, a target benchmark, access to compute node (a single H100 GPU) and internet access. The agent must build its training pipeline from scratch – we provide no starter code, training data, or hyperparameter configurations. The agent produces a post-trained model. We evaluate this model on the target benchmark and report its score. The goal of the agent is to maximize benchmark performance through post-training. Agents have full autonomy over data sources, training methods, and hyperparameters. They may iterate freely on their approach within time constraints (10-hour time limit).

In POSTTRAINBENCH the agents are only constrained to not use benchmark test data for training (data contamination) or substitute a different model than provided. These rules are enforced via an LLM judge (Appendix E). When the judge detects cheating, we assign the base model score. The overall score is computed across 4 base LLMs and 7 benchmarks. We detail the agent architecture and evaluation suite in the next subsections.

**2.1. Agent Architecture**
The Agent consists of a scaffold, which behaves as the software layer and an underlying frontier model, which forms the underlying reasoning engine. The model processes context, generates plans, and decides which tools to invoke. The scaffold allows the LLM to use tools and manages the execution loop. Following ReAct (Yao et al., 2023), the scaffold operates in a loop: it presents the current context to the LLM...

### Visual Description
Text-only slide.

---

## Page 3
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

[Flowchart Diagram]

**Figure 2. POSTTRAINBENCH pipeline.** An agent receives a base LLM, target benchmark, and 10 hours on one H100 GPU, then post-trains the model to maximize performance. An LLM judge detects cheating (model substitution, data contamination); flagged runs receive the base model score. Each agent is evaluated on 28 model–benchmark configurations (4 base LLMs $\times$ 7 benchmarks); frontier agents on native scaffolds are run 3 times per configuration to estimate variance.

text to the LLM, parses any tool calls from the response, executes them, and appends the results before the next iteration. The scaffold also handles permissions and context compression.

We evaluate different CLI-based agent scaffolds: Claude Code (Claude models), Codex CLI (OpenAI models), Gemini CLI (Google models) and OpenCode (Anomaly, 2025), an open-source scaffold that supports multiple model providers.

**Tools.** Agents typically use four tool categories: (1) *file operations* for reading and writing files, (2) *shell execution* for running arbitrary bash commands, (3) *search tools* for finding files and querying the web, and (4) *context management* for maintaining state across long sessions.

**Example Execution Trace** To illustrate how agents approach post-training tasks, we present a condensed execution trace from Claude Opus 4.5 using the Claude Code scaffold, post-training Gemma-3-4B-PT for HumanEval (Figure 3). The agent writes and debugs code, runs bash and python scripts and uses the internet to download data. It autonomously manages experiments and evaluates its intermediate results.

**2.2. Evaluation Suite**
Our evaluation suite consists of seven benchmarks spanning mathematical reasoning, code generation, tool use, scientific reasoning, health and creative writing:

1. **Mathematical reasoning.** GSM8K (Cobbe et al., 2021) tests grade-school arithmetic word problems. AIME 2025 tests harder competition-level mathematics requiring multi-step reasoning.
2. **Code generation.** HumanEval (Chen et al., 2021) requires models to complete Python functions from docstrings.
3. **Tool Use.** BFCL v3 (Patil et al., 2025) tests function calling: given a natural language query and function specification, the model must generate a syntactically correct tool call with exact argument values. We use the `exec_simple` split.
4. **Scientific knowledge.** GPQA (Rein et al., 2024) contains graduate-level science questions in physics, chemistry, and biology. We use the main split.
5. **Creative writing.** ArenaHard v2 (Li et al., 2024b;a) has a creative writing split which we use as a user-centric benchmark. We call this *ArenaHard-Writing*.
6. **Medical knowledge.** We modify HealthBench (Arora et al., 2025) from OpenAI, designing an easy split testing multi-turn medical dialogue. Specifically, we subsample 245 questions requiring at least 5 turns, containing completeness-axis rubrics and at most 2 negative criteria. We call this *HealthBench-Easy*.

**Base models.** We aim to post-train four base models with LLM agents: Qwen3-1.7B, Qwen3-4B (Qwen Team, 2025), SmolLM3-3B (Bakouch et al., 2025), and Gemma3-4B (Gemma Team, 2025). We select three different model families for diversity and across parameter counts to ensure robustness of results (see Appendix A for model links).

**Evaluation protocol.** We use zero-shot prompting for all benchmarks except GSM8K (10-shot), and apply the chat template for all evaluations. For HumanEval, we report pass@1. For open-ended benchmarks (ArenaHard Writing, HealthBench-Easy), we use GPT-5-mini as judge; ArenaHard Writing compares against Qwen3-1.7B as baseline. For all other benchmarks, we use exact-match accuracy. We provide the exact agent instructions in Appendix Section B. We additionally report few-shot baselines for comparison in Table 1.

### Visual Description
The page contains a flowchart (Figure 2) illustrating the POSTTRAINBENCH pipeline. The flow starts with "Agent post-trains LLM" with inputs (Benchmark script, Base LLM) and resources (10 hours on H100, Terminal access, Web search access). The agent produces a "Post-trained LLM", which goes to an "Anti-cheat Judge". If "Cheating" is detected, it results in the "Base LLM Score". If "Clean", it goes to "Evaluation" (Run full benchmark), resulting in a "Benchmark Score". The rest of the page is text describing tools, an example execution trace, and the evaluation suite (benchmarks and base models).

---

## Page 4
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

**Opus 4.5 post-trains Gemma3-4B-Base for HumanEval**

```
[Turns 1-11: Setup and Baseline]
TodoWrite: Creates 7-item task list
>> bash timer.sh # "Remaining time: 9:59"
>> nvidia-smi # Confirms H100 GPU
>> python evaluate.py --model-path google/gemma-3-4b-pt --limit 20
humaneval (20 samples): accuracy 0.000

[Turns 17-26: Research and Implementation]
>> WebSearch: "magicoder OSS instruct dataset"
Write train.py: SFT with LoRA + decontamination filter
def is_contaminated(text):
    for sig in ["has_close_elements", ...]: # 70+ sigs
        if f"def {sig}(" in text.lower(): return True

[Turns 35-42: First Training - Times Out]
>> python train.py --epochs 2 --batch-size 4
=== Total training examples: 203,178 ===
38%==== 9646/25398 [5:42:54<9:00:06]
Exit code 143: Command timed out

[Turns 43-54: Agent Adapts Strategy]
>> bash timer.sh # "Remaining time: 3:57"
Agent: "Training timed out... reduce to 20K samples, increase batch size"
>> python train.py --epochs 1 --batch-size 8 --max-samples 20000
Training completes successfully

[Turns 66-80: Debug vLLM Error]
>> python evaluate.py --model-path ./trained_model
OSError: missing preprocessor_config.json
Agent: "Gemma 3 is multimodal, needs preprocessor_config.json"
>> hf_hub_download('google/gemma-3-4b-pt', 'preprocessor_config.json')
humaneval (150 samples): accuracy 0.287

[Turns 87-104: Final Iteration]
>> bash timer.sh # "Remaining time: 0:48"
>> python train.py --epochs 2 --max-samples 30000
humaneval (150 samples): accuracy 0.373
>> cp -r trained_model_merged final_model
```

**Figure 3.** Condensed execution trace of Opus 4.5 (Claude Code) post-training Gemma-3-4B-Base for HumanEval. The agent implements contamination filtering, adapts to timeout failures, and debugs vLLM issues. The agent post-trains the model from initial performance of 0% to 37.3%, 104 turns, 9:20 hours, $4.62 API cost.

Because of fixed evaluation structure, base models score below random chance on some benchmarks: Qwen3-1.7B achieves 8.5% on GPQA versus 25% expected from random guessing. We fix evaluation templates to isolate how much agents improve performance through training alone, not through prompt engineering. However, base models also fail a lot at format following (Zhou et al., 2023). Hence, we additionally provide few-shot baselines without chat template for base-models as a comparison in Table 1.

**Scoring.** We aggregate scores in two stages. First, we average each agent’s performance on each benchmark across all four base models, yielding per-benchmark scores $s_i^{\text{agent}}$. This is shown in the columns corresponding to the benchmark. We additionally compute a weighted average across benchmarks by:
$$w_i = \frac{1}{s_i^{\text{instruct}} - s_i^{\text{base}}}, \quad \hat{w}_i = \frac{w_i}{\sum_j w_j} \quad (1)$$
where $s_i^{\text{instruct}}$ and $s_i^{\text{base}}$ are the instruction-tuned and base model scores on benchmark $i$. Note that this weights harder benchmarks more heavily—those where instruction-tuning yields smaller gains. Table 5 in the appendix lists the values of these weights.

**Cost Analysis** We break down costs into API costs and GPU costs to help practitioners plan evaluations.
* **API costs.** Model choice dominates the API costs. Qwen3 Max is the most expensive at $\sim\$910$ per run. Claude Opus 4.6 (Claude Code) costs $\sim\$600–750$, and Claude Opus 4.5 (Claude Code) $\sim\$420$. Gemini 3/3.1 Pro (OpenCode) costs $\$225–310$, Claude Opus 4.5 (OpenCode) $\sim\$250$, and GLM-5 (Z.AI) $\sim\$170$. Claude Sonnet 4.5 costs $\sim\$85$. GPT-5.1 Codex Max (OpenCode), Kimi K2/K2.5, and GPT-5.1/5.2 (Codex CLI) all cost under $\$35$.
* **GPU costs.** Assuming $\$2.5–3/\text{hour}$ per hour for an Nvidia H100 (RunPod, 2026), each model-benchmark pair costs up to $\sim\$30$. The full $4 \times 7$ matrix totals up to $\sim\$840$.

**3. Experimental Results**
In this section, we present the main results and discuss in which cases agents outperform official instruction-tuned models.

**3.1. Main Results**
We evaluate frontier agents on POSTTRAINBENCH across multiple scaffold configurations. Our leaderboard (Figure 1) shows aggregate scores for selected configurations; Table 1 provides the full breakdown across all 13 evaluated configurations. Due to computational costs, we ran 3 independent runs only for frontier agents on their native CLI scaffolds (marked with standard deviations); all other configurations were evaluated with a single run.

**Overall performance.** As shown in Figure 1, Claude Opus 4.6 leads at 23.2% – over $3\times$ the 7.5% base model average. There has been substantial advancement in recent months: Claude Sonnet 4.5 (released Sep 2025) scored 9.9%, while Claude Opus 4.5 (released Nov 2025) reached 17.1%. No agent consistently outperforms few-shot base model performance yet, and all remain far from the instruction-tuned baseline (51.1%)

---

## Page 5
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

**Table 1. POSTTRAINBENCH: Weighted average agent performance across all base models.** Frontier agents on native CLI scaffolds were evaluated with 3 independent runs ($\pm 1$ standard deviation reported); all other configurations use a single run due to compute costs (Section 2.2). The overall weighted average follows the weights in Table 5.

| Rank | Method | Avg | AIME 2025 | ArenaHard Writing | BFCL | GPQA Main | GSM8K | HealthBench Easy | HumanEval |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| -- | Official Instruct Models (baseline) | 51.1 | 29.2 | 70.2 | 85.0 | 36.2 | 87.0 | 43.3 | 71.5 |
| 1 | Claude Opus 4.6 (Claude Code) | 23.2 ± 1.8 | 5.0 ± 3.5 | 7.8 ± 5.2 | 75.9 ± 17.8 | 25.5 ± 5.8 | 41.0 ± 19.3 | 18.8 ± 3.7 | 24.7 ± 13.1 |
| 2 | Gemini 3.1 Pro (OpenCode) | 21.6 ± 1.1 | 3.9 ± 1.9 | 7.4 ± 5.4 | 62.8 ± 27.3 | 18.5 ± 8.3 | 45.5 ± 22.3 | 14.5 ± 6.7 | 40.2 ± 8.4 |
| 3 | GPT-5.2 (Codex CLI) | 21.4 ± 2.4 | 0.8 ± 1.0 | 6.6 ± 5.0 | 52.5 ± 40.8 | 23.7 ± 8.1 | 55.9 ± 3.0 | 15.8 ± 6.1 | 30.2 ± 11.8 |
| 4 | GPT 5.4 (High) (Codex CLI) | 20.2 ± 2.4 | 0.6 ± 1.0 | 10.1 ± 7.5 | 31.1 ± 38.8 | 28.0 ± 5.4 | 48.2 ± 12.1 | 17.3 ± 7.0 | 27.3 ± 9.5 |
| 5 | GPT 5.1 Codex Max (Codex CLI) | 19.7 ± 2.5 | 0.6 ± 1.0 | 4.0 ± 3.2 | 30.8 ± 50.8 | 24.0 ± 7.2 | 51.6 ± 11.6 | 17.8 ± 8.8 | 32.0 ± 8.4 |
| 6 | Gemini 3 Pro (Gemini CLI) | 18.1 ± 2.4 | 1.7 ± 2.9 | 6.3 ± 1.2 | 42.3 ± 34.3 | 21.2 ± 7.5 | 39.1 ± 4.2 | 17.3 ± 4.6 | 22.7 ± 12.7 |
| -- | Base Model (Few-Shot) | 18.1 | 5.1 | 7.2 | 1.7 | 22.6 | 45.0 | 19.1 | 31.5 |
| 7 | GPT 5.3 Codex (High) (Codex CLI) | 17.8 ± 3.6 | 0.6 ± 0.5 | 2.4 ± 1.9 | 45.5 ± 38.2 | 27.7 ± 2.4 | 33.0 ± 7.8 | 8.9 ± 6.4 | 29.1 ± 9.9 |
| 8 | Claude Opus 4.5 (OpenCode) | 17.3 | 0.8 | 5.5 | 43.0 | 17.7 | 54.4 | 9.6 | 24.1 |
| 9 | GPT 5.2 Codex (Codex CLI) | 17.2 ± 1.6 | 0.3 ± 0.5 | 2.5 ± 1.8 | 45.2 ± 20.9 | 24.1 ± 4.7 | 37.6 ± 12.3 | 11.5 ± 6.3 | 23.8 ± 9.9 |
| 10 | Claude Opus 4.5 (Claude Code) | 17.1 ± 4.5 | 2.2 ± 1.0 | 3.8 ± 1.8 | 61.7 ± 26.1 | 19.0 ± 11.4 | 28.5 ± 13.7 | 8.9 ± 2.9 | 29.3 ± 8.4 |
| 11 | Claude Sonnet 4.6 (Claude Code) | 16.4 | 3.3 | 10.2 | 23.8 | 13.8 | 25.7 | 16.2 | 42.4 |
| 12 | Gemini 3 Pro (OpenCode) | 14.9 | 0.0 | 8.4 | 10.8 | 16.3 | 49.8 | 11.3 | 27.3 |
| 13 | GLM 5 (OpenCode) | 13.9 | 0.8 | 4.2 | 21.5 | 15.2 | 40.3 | 14.6 | 17.4 |
| 14 | GPT 5.3 Codex (Med) (Codex CLI) | 13.8 ± 0.8 | 0.3 ± 0.5 | 1.0 ± 0.7 | 14.8 ± 11.5 | 22.8 ± 5.2 | 31.7 ± 8.8 | 10.2 ± 2.5 | 24.0 ± 7.4 |
| 15 | Kimi K2.5 (OpenCode) | 10.3 | 2.5 | 5.2 | 19.2 | 11.1 | 19.8 | 7.5 | 19.5 |
| 16 | Claude Sonnet 4.5 (Claude Code) | 9.9 | 0.8 | 1.0 | 1.8 | 14.6 | 30.9 | 5.0 | 23.0 |
| 17 | MiniMax M2.5 (OpenCode) | 9.5 | 0.0 | 2.7 | 2.2 | 11.6 | 31.0 | 10.5 | 15.5 |
| 18 | MiniMax M2.1 (OpenCode) | 9.3 | 0.8 | 1.3 | 13.5 | 9.7 | 19.4 | 9.5 | 21.6 |
| 19 | GPT 5.1 Codex Max (OpenCode) | 7.7 | 1.7 | 1.1 | 1.5 | 15.3 | 20.0 | 6.1 | 5.8 |
| -- | Base Model (Zero-Shot) | 7.5 | 1.7 | 1.3 | 1.5 | 8.5 | 20.4 | 9.5 | 12.8 |
| 20 | GLM 4.7 (OpenCode) | 7.5 | 1.7 | 1.3 | 1.5 | 8.5 | 18.8 | 9.5 | 13.9 |
| 21 | Qwen3 Max (Claude Code) | 7.4 | 0.8 | 1.0 | 1.5 | 7.1 | 20.6 | 9.5 | 16.5 |
| 22 | Kimi K2 Thinking (OpenCode) | 7.2 | 1.7 | 1.3 | 1.5 | 8.5 | 14
## Page 9
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

> [Hour ~2:30, (with ~8.5 hours remaining)]
> Agent: generating synthetic data with OpenAI API is disallowed, so switching to high-quality filtered open datasets is needed.
>
> [Hours 2-7: Multiple failed training iterations with garbled outputs]
>
> [Hour ~7:00, (with ~3 hours remaining)]
> Agent: I'm considering generating a small multilingual creative writing dataset using OpenAI's API to produce 200-500 synthetic prompts and responses across key languages
> \>>> [Executes Python script calling OpenAI API with GPT-4o mini]

*Figure 7. GPT-5.1 Codex Max (Codex CLI) execution trace showing API restriction violation. At hour $\sim$ 2:30, the agent explicitly acknowledged the restriction against using OpenAI API for synthetic data. After hours of failed attempts and with $\sim$ 3 hours remaining, the agent violated this restriction without re-acknowledging it, probably due to context window limitations.*

1. **Direct benchmark ingestion.** The most common pattern: agents loaded the benchmark evaluation dataset directly via Hugging Face and used it as training data. Minimax M2.5 loaded the full 448-entry GPQA dataset with the self-documenting comment `# Repeat the data multiple times to overfit to GPQA`, repeating it $10\times$ for memorization. Similarly, multiple agents loaded the original BFCL dataset for training.
2. **Hardcoded benchmark problems.** Agents embedded evaluation questions directly into data preparation scripts disguised as "synthetic" examples. Opus 4.6 annotated one such script with `# EXACT BFCL sample 69 and 70 prompts with correct answers`, while Kimi K2.5 labeled its contaminated HumanEval data as `# More comprehensive synthetic examples -- exactly like HumanEval format`. In one case, Opus 4.6 attempted to obscure the contamination by appending `_custom` suffixes to function names while preserving identical logic, docstrings, and test cases.
3. **Evaluation guided data generation.** Rather than copying benchmark data directly, some agents reverse engineered the evaluation. Opus 4.6 analyzed specific BFCL evaluation failures by sample number, then generated targeted training data addressing those exact failure patterns. Kimi K2.5 read HealthBench evaluation files to extract theme distributions and rubric criteria, then crafted training data tailored to match.
4. **Indirect contamination via intermediate datasets.** Opus 4.6 loaded `CodeFeedback-Filtered-Instruction` which contains HumanEval-derived problems. This form of contamination is harder to detect but equally problematic.

**Disallowed model substitution.** Beyond data contamination, we observed one case of disallowed model usage. After repeated failed fine-tuning attempts, Kimi K2.5 submitted the off-the-shelf instruction-tuned model `Qwen/Qwen3-1.7B` as its final submission, with the script's docstring admitting:

> Since all attempts to fine-tune Qwen3-1.7B-Base have produced garbage output [...] we'll use the instruct model as our final submission.

**Agent-level variation.** Contamination rates varied substantially across agents. Opus 4.6 was the most prolific offender with 12 flags across 84 runs, predominantly targeting HumanEval (8 of 12 cases). Kimi K2.5 exhibited the most diverse cheating strategies across 4 different benchmarks. Minimax M2.5 focused narrowly on GPQA and BFCL. In contrast, Codex GPT-5.3 produced only one substantive flag, and Gemini 3.1 Pro had no contamination across any run. Notably, the contamination rate also varied by base model: SmolLM3-3B-Base was never contaminated by Opus 4.6 across any run, suggesting that agents may selectively apply contamination strategies based on perceived model trainability.

### 6. Related Work
We review prior work on autonomous AI scientists, AI R&D automation, and relevant benchmarks.

**Autonomous AI scientists.** Fully autonomous research systems represent the frontier of AI R&D automation. The AI Scientist (Lu et al., 2024) demonstrated end-to-end paper generation, AI-Researcher (Tang et al., 2025) introduced Scientist-Bench, and the Darwin-Gödel Machine (Zhang et al., 2025) showed recursive self-improvement in coding agents. OpenAI's FrontierScience benchmark (OpenAI, 2025) tests whether models can handle open-ended scientific reasoning rather than simple factual recall. However, systematic evaluations find no current framework completes full research cycles from literature understanding through validated results (Tie et al., 2025). POSTTRAINBENCH provides a standardized and verifiable way to measure the performance of automated AI research systems.

**AI R&D automation.** Interview studies with AI researchers (Owen, 2024; Leibowich et al., 2025) reveal substantial disagreement on automation timelines and identify compute bottlenecks as primary constraints. Several works address associated risks: Clymer et al. (2025) analyze risks from reduced human oversight and rapid capability acceleration, while Gasteiger et al. (2025) demonstrate that models can sandbag ML experiments without detection by zero-shot monitors. Anthropic's evaluation of

### Visual Description
The page contains text organized into sections and numbered lists. There are two shaded boxes: one at the top left showing an agent's execution trace (Figure 7) and another in the middle right containing a quote from a script's docstring.

---
## Page 10
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

Claude Sonnet 4.5 (Anthropic, 2025) found the model does not yet automate entry-level researcher work but shows speedups on specific tasks. Our work shows recent models are much stronger than Sonnet 4.5 and can autonomously curate data, manage experiments and write entire training loops.

**AI R&D benchmarks.** Several benchmarks evaluate AI agents on ML engineering tasks. MLE-bench (Chan et al., 2025) uses 75 Kaggle competitions, subsequent work achieved medal-level performance in up to 47% of those competitions using advanced scaffolding (Qiang et al., 2025). MLAgentBench (Huang et al., 2024) provides 13 end-to-end ML tasks where agents autonomously develop or improve models given datasets and task descriptions. RE-Bench (Wijk et al., 2024) evaluates open-ended ML research tasks with human baselines, and HCAST (Rein et al., 2025) introduces a human-calibrated software engineering benchmark. Kwa et al. (2025) combine RE-Bench, HCAST and in one human-calibrated benchmark. Extrapolating their trends suggests that within 5 years, AI systems will be able to automate software tasks which currently take humans a month (Kwa et al., 2025). POSTTRAINBENCH differs from those approaches, because it uses larger models (up to 4B parameters) and allows agents complete freedom in their approach, both algorithmic and regarding the data which they use (subject to contamination constraints).

**Code and algorithm optimization.** AlgoTune (Press et al., 2025) tests LLM optimization of numerical programs, achieving moderate speedup but without algorithmic innovations. AlphaEvolve (Novikov et al., 2025) demonstrates evolutionary LLM-based optimization can yield genuine algorithmic discoveries. The NanoGPT Speedrunning Benchmark (Zhao et al., 2025) evaluates agents on GPT-2 pre-training optimization, where the best agents recover only 46% of human speedup with hints. POSTTRAINBENCH differs by evaluating the automation of post-training, which allows us to move to more realistic settings with larger LLMs (up to 4B parameters), gives more freedom (e.g. agents can use any data subject to contamination constraints).

### 7. Discussion
**Where do current AI R&D capabilities actually stand?** While agents achieve substantial improvements over base models, interpreting them requires careful analysis. We expect that going from 7.5% (base model performance) to the 30% range will be relatively easy, since this can be achieved simply by teaching the base models to accurately follow instructions and format outputs correctly. Base models evaluated zero-shot often fail not because they lack knowledge, but because they output answers in the wrong format. A competent agent can fix this relatively quickly through simple supervised fine-tuning, which is already easy to implement for agents given how common it is on the internet and, consequently, in pre-training data. The harder challenge is approaching the official post-trained models ($\approx 50\%$) and improving beyond them. This likely requires implementing distillation from more capable models, reinforcement learning, or even coming up with novel post-training approaches. POSTTRAINBENCH is designed to capture such improvements, even if they exceed the performance of the best-known models.

**Implications.** Our results carry several implications for how the AI safety community should think about autonomous AI R&D. First, the gap between agent performance (23.2%) and instruction-tuned baselines (51.1%) suggests that full automation of post-training remains out of reach for now, but the rapid improvement across model generations—from 9.9% for Sonnet 4.5 to 23.2% for Opus 4.6 within roughly six months—implies this gap may close faster than expected. Second, the reward hacking behaviors we document (Section 5.3) are not hypothetical: agents trained on test data, substituted pre-trained models, and violated explicit API restrictions when constraints fell out of context. Crucially, these behaviors emerged naturally in the frontier models, without any adversarial prompting. As agents grow more capable, such specification gaming will likely become harder to detect and more consequential.

This concern is underscored by a striking pattern in our results: Claude Opus 4.6 – the highest-performing agent overall at 23.2% – was also the most frequent violator, flagged for contamination 12 times across 84 runs. This is not a case of weaker models cutting corners out of desperation. Rather, more capable agents appear better at *finding* exploitable paths: identifying specific benchmark samples to embed, reverse-engineering evaluation failure patterns, and even attempting to obscure contamination through cosmetic modifications such as renaming functions. The correlation between capability and rule violation suggests that as agents improve, the challenge shifts from preventing obvious cheating to detecting increasingly sophisticated specification gaming. Third, on the capability side, the fact that agents can already outperform expert human teams on narrow targets (e.g., BFCL) while operating with orders of magnitude less compute suggests that even partial AI R&D automation could meaningfully accelerate capability development in focused domains. This underscores the importance of developing robust oversight mechanisms *before* agents reach the capability threshold for broad post-training automation.

**Limitations.** Our evaluation has several limitations. The 10-hour, single-GPU budget, while practical for large-scale

### Visual Description
Text-only slide.

---
## Page 11
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

evaluation, does not reflect real-world post-training timelines or distributed training setups. The benchmark selection may inadvertently favor certain strategies, and agents optimize for single tasks rather than producing generalist models. Our LLM-based contamination judge may have false positives or negatives. Finally, cost constraints limited us to 3 runs for frontier agents and single runs for other configurations, restricting our ability to quantify variance.

**Future work.** Our goal is to maintain POSTTRAINBENCH as a continuously updated benchmark that provides meaningful signal about AI R&D automation capabilities. Moreover, we plan to release progressively harder versions of POSTTRAINBENCH in the future that keep pace with advancing capabilities. This means updating target benchmarks as existing ones saturate, swapping in newer base models as they are released, and expanding the set of agent scaffolds. One direction we are particularly interested in relates to safety and alignment. POSTTRAINBENCH measures whether agents can perform AI R&D, but an equally important question is whether agents will follow safety constraints while doing so. We could test this by prompting CLI agents to perform potentially harmful actions during post-training: evading oversight mechanisms, inserting backdoors into trained models, or pursuing hidden objectives alongside the stated task. The research value is twofold: understanding how capable current agents are at such behaviors, and how well we can detect when agents attempt them. This connects to broader questions about AI control and monitoring that become increasingly important as agents take on more autonomous AI R&D work.

### Impact Statement
This work measures AI agents' ability to autonomously post-train LLMs. Understanding these capabilities has implications for AI safety and alignment research, as autonomous AI R&D could accelerate both beneficial applications and potential risks. We acknowledge the dual-use nature of this research: insights into effective agent approaches could inform both capability development and safety measures. Transparent benchmarking serves the research community by enabling informed discussion about AI development trajectories.

### Acknowledgements
This work was supported by Thoughtful, which is committed to funding and contributing to PostTrainBench as an open benchmark for the post-training research community. AP and MB acknowledge financial support by the Federal Ministry of Education and Research (BMBF), FKZ: 16IS24085B and Coefficient Giving funded by the Good Ventures Foundation. MA acknowledges financial support from Coefficient Giving. HB has received funding from the Digital Europe Programme under grant agreement No 101195233 (OpenEuroLLM). HB and BR thank the International Max Planck Research School for Intelligent Systems (IMPRS-IS) for support. We thank Modal for providing compute credits through the Modal for Academics program, which will support cloud based execution of POSTTRAINBENCH.

### References
Amodei, D. Dario amodei - Machines of Loving Grace, 2024. URL https://www.darioamodei.com/essay/machines-of-loving-grace.

Amodei, D., Olah, C., Steinhardt, J., Christiano, P., Schulman, J., and Mané, D. Concrete problems in AI safety. *arXiv preprint arXiv:1606.06565*, 2016.

Anomaly. OpenCode: The open source AI coding agent. https://github.com/anomalyco/opencode, 2025. Accessed: January 2026.

Anthropic. Claude sonnet 4.5 system card. Technical report, Anthropic, 2025.

Arora, R. K., Wei, J., Hicks, R. S., Bowman, P., Quiñonero-Candela, J., Tsimpourlas, F., Sharman, M., Shah, M., Vallone, A., Beutel, A., et al. Healthbench: Evaluating large language models towards improved human health. *arXiv preprint arXiv:2505.08775*, 2025.

Bakouch, E., Ben Allal, L., Lozhkov, A., Tazi, N., Tunstall, L., Patiño, C. M., Beeching, E., Roucher, A., Reedi, A. J., Gallouédec, Q., Rasul, K., Habib, N., Fourrier, C., Kydlicek, H., Penedo, G., Larcher, H., Morlon, M., Srivastav, V., Lochner, J., Nguyen, X.-S., Raffel, C., von Werra, L., and Wolf, T. SmolLM3: smol, multilingual, long context reasoner. https://huggingface.co/blog/smollm3, 2025.

Chan, J. S., Chowdhury, N., Jaffe, O., Aung, J., Sherburn, D., Mays, E., Starace, G., Liu, K., Maksin, L., Patwardhan, T., Weng, L., and Mądry, A. Mle-bench: Evaluating machine learning agents on machine learning engineering. In *International Conference on Learning Representations (ICLR)*, 2025.

Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. d. O., Kaplan, J., Edwards, H., Burda, Y., Joseph, N., Brockman, G., Ray, A., Puri, R., Krueger, G., Petrov, M., Khlaaf, H., Sastry, G., Mishkin, P., Chan, B., Gray, S., Ryder, N., Pavlov, M., Power, A., Kaiser, L., Bavarian, M., Winter, C., Tillet, P., Such, F. P., Cummings, D., Plappert, M., Chantzis, F., Barnes, E., Herbert-Voss, A., Guss, W. H., Nichol, A., Paino, A., Tezak, N., Tang, J., Babuschkin, I., Balaji, S., Jain, S., Saunders, W., Hesse,

### Visual Description
Text-only slide.

---
## Page 12
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

C., Carr, A. N., Leike, J., Achiam, J., Misra, V., Morikawa, E., Radford, A., Knight, M., Brundage, M., Murati, M., Mayer, K., Welinder, P., McGrew, B., Amodei, D., McCandlish, S., Sutskever, I., and Zaremba, W. Evaluating large language models trained on code. *arXiv preprint arXiv:2107.03374*, 2021.

Clymer, J., Duan, I., Cundy, C., Duan, Y., Heide, F., Lu, C., Mindermann, S., McGurk, C., Pan, X., Siddiqui, S., Wang, J., Yang, M., and Zhan, X. Bare minimum mitigations for autonomous AI development. *arXiv preprint arXiv:2504.15416*, 2025.

Cobbe, K., Kosaraju, V., Bavarian, M., Chen, M., Jun, H., Kaiser, L., Plappert, M., Tworek, J., Hilton, J., Nakano, R., Hesse, C., and Schulman, J. Training verifiers to solve math word problems. *arXiv preprint arXiv:2110.14168*, 2021.

Gasteiger, J., Khan, A., Bowman, S., Mikulik, V., Perez, E., and Roger, F. Automated researchers can subtly sandbag. *Anthropic Alignment Science*, 2025.

Gemma Team. Gemma 3 technical report. *arXiv preprint arXiv:2503.19786*, 2025.

Guo, D., Yang, D., Zhang, H., Song, J., Wang, P., Zhu, Q., Xu, R., Zhang, R., Ma, S., Bi, X., Zhang, X., Yu, X., Wu, Y., Wu, Z. F., Gou, Z., Shao, Z., Li, Z., Gao, Z., Liu, A., Xue, B., Wang, B., Wu, B., Feng, B., Lu, C., Zhao, C., Deng, C., Ruan, C., Dai, D., Chen, D., Ji, D., Li, E., Lin, F., Dai, F., Luo, F., Hao, G., Chen, G., Li, G., Zhang, H., Xu, H., Ding, H., Gao, H., Qu, H., Li, H., Guo, J., Li, J., Chen, J., Yuan, J., Tu, J., Qiu, J., Li, J., Cai, J. L., Ni, J., Liang, J., Chen, J., Dong, K., Hu, K., You, K., Gao, K., Guan, K., Huang, K., Yu, K., Wang, L., Zhang, L., Zhao, L., Wang, L., Zhang, L., Xu, L., Xia, L., Zhang, M., Zhang, M., Tang, M., Zhou, M., Li, M., Wang, M., Li, M., Tian, N., Huang, P., Zhang, P., Wang, Q., Chen, Q., Du, Q., Ge, R., Zhang, R., Pan, R., Wang, R., Chen, R. J., Jin, R. L., Chen, R., Lu, S., Zhou, S., Chen, S., Ye, S., Wang, S., Yu, S., Zhou, S., Pan, S., Li, S. S., Zhou, S., Wu, S., Yun, T., Pei, T., Sun, T., Wang, T., Zeng, W., Liu, W., Liang, W., Gao, W., Yu, W., Zhang, W., Xiao, W. L., An, W., Liu, X., Wang, X., Chen, X., Nie, X., Cheng, X., Liu, X., Xie, X., Liu, X., Yang, X., Li, X., Su, X., Lin, X., Li, X. Q., Jin, X., Shen, X., Chen, X., Sun, X., Wang, X., Song, X., Zhou, X., Wang, X., Shan, X., Li, Y. K., Wang, Y. Q., Wei, Y. X., Zhang, Y., Xu, Y., Li, Y., Zhao, Y., Sun, Y., Wang, Y., Yu, Y., Zhang, Y., Shi, Y., Xiong, Y., He, Y., Piao, Y., Wang, Y., Tan, Y., Ma, Y., Liu, Y., Guo, Y., Ou, Y., Wang, Y., Gong, Y., Zou, Y., He, Y., Xiong, Y., Luo, Y., You, Y., Liu, Y., Zhou, Y., Zhu, Y. X., Huang, Y., Li, Y., Zheng, Y., Zhu, Y., Ma, Y., Tang, Y., Zha, Y., Yan, Y., Ren, Z. Z., Ren, Z., Sha, Z., Fu, Z., Xu, Z., Xie, Z., Zhang, Z., Hao, Z., Ma, Z., Yan, Z., Wu, Z., Gu, Z., Zhu, Z., Liu, Z., Li, Z., Xie, Z., Song, Z., Pan, Z., Huang, Z., Xu, Z., Zhang, Z., and Zhang, Z. Deepseek-r1 incentivizes reasoning in llms through reinforcement learning. *Nature*, 645(8081):633–638, September 2025. ISSN 1476-4687. doi: 10.1038/s41586-025-09422-z. URL http://dx.doi.org/10.1038/s41586-025-09422-z.

Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., and Chen, W. Lora: Low-rank adaptation of large language models, 2021. URL https://arxiv.org/abs/2106.09685.

Huang, Q., Vora, J., Liang, P., and Leskovec, J. MLAgentBench: Evaluating language agents on machine learning experimentation. In *International Conference on Machine Learning (ICML)*, 2024.

Krakovna, V., Uesato, J., Mikulik, V., Rahtz, M., Everitt, T., Kumar, R., Kenton, Z., Leike, J., and Legg, S. Specification gaming: The flip side of AI ingenuity. *DeepMind Blog*, 2020.

Kwa, T., West, B., Becker, J., Deng, A., Garcia, K., Hasin, M., Jawhar, S., Kinniment, M., Rush, N., Von Arx, S., Bloom, R., Broadley, T., Du, H., Goodrich, B., Jurkovic, N., Miles, L. H., Nix, S., Lin, T., Parikh, N., Rein, D., Sato, L. J. K., Wijk, H., Ziegler, D. M., Barnes, E., and Chan, L. Measuring AI ability to complete long tasks. *arXiv preprint arXiv:2503.14499*, 2025.

Leibowich, J., Jurkovic, N., and Davidson, T. Could advanced AI accelerate the pace of AI progress? interviews with AI researchers. *Forethought Foundation*, 2025.

Li, T., Chiang, W.-L., Frick, E., Dunlap, L., Wu, T., Zhu, B., Gonzalez, J. E., and Stoica, I. From crowdsourced data to high-quality benchmarks: Arena-hard and benchbuilder pipeline. *arXiv preprint arXiv:2406.11939*, 2024a.

Li, T., Chiang, W.-L., Frick, E., Dunlap, L., Zhu, B., Gonzalez, J. E., and Stoica, I. From live data to high-quality benchmarks: The arena-hard pipeline, April 2024b. URL https://lmsys.org/blog/2024-04-19-arena-hard/.

Lin, W. Scaling long-running autonomous coding. *Cursor Blog*, January 2026. URL https://cursor.com/blog/scaling-agents.

Lu, C., Lu, C., Lange, R. T., Foerster, J., Clune, J., and Ha, D. The AI scientist: Towards fully automated open-ended scientific discovery. *arXiv preprint arXiv:2408.06292*, 2024.

Novikov, A., Vũ, N., Eisenberger, M., Dupont, E., Huang, P.-S., Wagner, A. Z., Shirobokov, S., Kozlovskii, B., Ruiz, F. J. R., Mehrabian, A., Kumar, M. P., See, A., Chaudhuri, S., Holland, G., Davies, A., Nowozin, S., Kohli, P., and Balog, M. AlphaEvolve: A coding agent for

### Visual Description
Text-only slide.

---
## Page 13
### Content
**POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?**

scientific and algorithmic discovery. *arXiv preprint arXiv:2506.13131*, 2025.

OpenAI. FrontierScience: A benchmark for scientific reasoning. Technical report, OpenAI, 2025.

Owen, D. Automation of AI R&D: Researcher perspectives. Technical report, Epoch AI, 2024.

Patil, S. G., Mao, H., Yan, F., Ji, C. C.-J., Suresh, V., Stoica, I., and Gonzalez, J. E. The Berkeley Function Calling Leaderboard (BFCL): From tool use to agentic evaluation of large language models. In *International Conference on Machine Learning (ICML)*, 2025.

Press, O., Amos, B., Zhao, H., Wu, Y., Ainsworth, S. K., Krupke, D., Kidger, P., Sajed, T., Stellato, B., Park, J., Bosch, N., Meril, E., Steppi, A., Zharmagambetov, A., Zhang, F., Perez-Pineiro, D., Mercurio, A., Zhan, N., Abramovich, T., Lieret, K., Zhang, H., Huang, S., Bethge, M., and Press, O. AlgoTune: Can language models speed up general-purpose numerical programs? *arXiv preprint arXiv:2507.15887*, 2025.

Qiang, R., Zhuang, Y., Li, Y., Sagar V K, D., Zhang, R., Li, C., Wong, I. S.-H., Yang, S., Liang, P., Zhang, C., and Dai, B. MLE-Dojo: Interactive environments for machine learning engineering. *arXiv preprint arXiv:2505.07782*, 2025.

Qwen Team. Qwen3 technical report. *arXiv preprint arXiv:2505.09388*, 2025.

Rafailov, R., Sharma, A., Mitchell, E., Ermon, S., Manning, C. D., and Finn, C. Direct preference optimization: Your language model is secretly a reward model, 2024. URL https://arxiv.org/abs/2305.18290.

Rein, D., Hou, B. L., Stickland, A. C., Petty, J., Pang, R. Y., Dirani, J., Michael, J., and Bowman, S. R. GPQA: A graduate-level Google-Proof Q&A benchmark. In *International Conference on Learning Representations (ICLR)*, 2024.

Rein, D., Becker, J., Deng, A., Nix, S., Canal, C., O'Connel, D., Arnott, P., Bloom, R.,
