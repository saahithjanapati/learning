# MemoryBench: Memory And Continual Learning In LLM Systems

Source note: Qingyao Ai, Yichen Tang, Changyue Wang, Jianming Long, Weihang Su, and Yiqun Liu, "MemoryBench: A Benchmark for Memory and Continual Learning in LLM Systems." arXiv:2510.17281v4, submitted October 20, 2025 and revised December 12, 2025. Source PDF: [arxiv.org/pdf/2510.17281](https://arxiv.org/pdf/2510.17281). Processed source: [materials/processed/ai/memorybench-benchmark-for-memory-and-continual-learning-in-llm-systems.md](../../../materials/processed/ai/memorybench-benchmark-for-memory-and-continual-learning-in-llm-systems.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Central Research Question](#the-central-research-question)
- [The Main Idea](#the-main-idea)
- [The Memory Taxonomy](#the-memory-taxonomy)
- [The Feedback Taxonomy](#the-feedback-taxonomy)
- [How MemoryBench Is Built](#how-memorybench-is-built)
- [Datasets And Task Shapes](#datasets-and-task-shapes)
- [Baselines](#baselines)
- [Main Results](#main-results)
- [Why RAG Is Hard To Beat](#why-rag-is-hard-to-beat)
- [What Should We Be Careful About?](#what-should-we-be-careful-about)
- [The Takeaway](#the-takeaway)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

MemoryBench is a benchmark for a harder version of LLM memory than ordinary long-context recall.

Most memory benchmarks ask something like: "Here is a long conversation or user profile. Can the model answer a question from it?" That is useful, but it mostly tests retrieval of declarative information. MemoryBench asks a more deployment-like question:

**Can an LLM system learn from user feedback over time and improve on future tasks?**

The paper treats an LLM system as more than a model. A deployed system may have model weights, external memory stores, retrieval indexes, user logs, feedback logs, and update rules. The system should be able to observe that users liked, disliked, corrected, copied, or refined its answers, then convert those signals into better future behavior.

The authors build a benchmark with:

- multiple domains: open-domain, legal, and academic,
- multiple languages: English and Chinese,
- multiple task shapes: long-input/short-output, long-input/long-output, short-input/long-output, and short-input/short-output,
- simulated user feedback: verbose critiques and action signals such as like, dislike, or copy,
- held-out evaluation to test whether systems actually improve from feedback.

The benchmark has three modules. The `Task Provider` supplies the query, context, and evaluation metadata. The `User Simulator` produces feedback on training interactions. The `Performance Monitor` checks whether the system uses the context and feedback logs to improve on test tasks.

The main result is sobering. Memory support often helps compared with a vanilla LLM, but current memory systems such as A-Mem, Mem0, and MemoryOS do not consistently beat simple RAG baselines that retrieve over task context and feedback logs. In some settings, RAG is both competitive and more efficient.

The paper's core lesson is that LLM memory is not just "store everything and retrieve relevant chunks." A real continual-learning system must distinguish facts from feedback, infer reusable task-improvement rules, filter noisy user signals, and update efficiently as feedback accumulates.

## Full-Length Version

## The Paper In One Sentence

MemoryBench is a benchmark for testing whether LLM systems can learn from service-time user feedback, and it finds that current memory systems are still weak at turning feedback logs into reliable procedural improvement.

That phrase "LLM systems" matters. The paper is not only evaluating a base model. It is evaluating the whole wrapper around the model: memory stores, retrievers, memory update logic, feedback logs, and generation behavior.

## The Central Research Question

The central question is:

**Can an LLM system continually improve by learning from accumulated user feedback, rather than merely recalling static context?**

There are several smaller questions inside that.

First, what kind of memory is being tested? A system might remember facts about a user, but that is different from learning how to write a better legal judgment after users repeatedly point out missing reasoning steps.

Second, what kind of feedback is available? Users do not always provide clean labels. They may write critiques, click like or dislike, copy an answer, abandon a session, or refine the prompt.

Third, how should improvement be measured? A system can memorize training feedback and still fail on future tasks. MemoryBench therefore splits tasks into training and test sets, simulates feedback only on training cases, and evaluates future performance on held-out cases.

Fourth, are current memory systems actually better than simple retrieval? The paper's answer is: not consistently.

## The Main Idea

The paper starts from the idea that scaling data, parameters, and inference-time compute has limits. Human learners and traditional online systems, such as search engines, also improve by interacting with the environment. They receive feedback, keep useful memory, and adjust future behavior.

The authors argue that LLM systems should be evaluated in the same spirit. A deployed LLM assistant should not only answer the current query. It should learn from what users correct, reward, copy, or reject.

This turns memory into a continual-learning problem.

The benchmark formalizes a system with:

- parametric memory `theta`, usually model weights,
- non-parametric memory `M`, such as external memory stores or retrieved documents,
- task queries `Q`,
- feedback logs `S`.

At time `t`, a user gives task `q_t`; the system answers; the user or environment returns feedback. The goal is to update or use `theta_t` and `M_t` so that future task loss decreases.

The paper is not mainly proposing a new memory algorithm. It is proposing a testbed that makes this problem measurable.

## The Memory Taxonomy

The most useful conceptual piece is the memory taxonomy.

### Declarative Memory

Declarative memory stores facts. It answers "what is true?"

Examples:

- a law,
- a user's location,
- a product specification,
- a prior conversation detail,
- a document snippet.

The paper further divides declarative memory into semantic and episodic memory.

Semantic memory is user-independent factual knowledge, like a textbook rule or general domain fact. Episodic memory is user-dependent factual knowledge, like a user's conversation history or personal preferences.

### Procedural Memory

Procedural memory stores knowledge about how to do tasks better. It answers "what should I do next time?"

Examples:

- "When writing this kind of legal judgment, include suspended-sentence reasoning."
- "This user dislikes overly short explanations."
- "For this academic ideation task, novelty matters more than breadth."
- "This previous answer was rejected because it missed the evaluation criterion."

This is the heart of MemoryBench. The benchmark is designed to test whether systems can use procedural feedback, not only retrieve declarative facts.

## The Feedback Taxonomy

The paper also defines feedback types.

### Explicit Feedback

Explicit feedback directly tells the system something about output quality.

Verbose feedback is natural-language critique. For example, a user might say that an answer is mostly correct but missing legal citations.

Action feedback is a direct signal such as like or dislike.

### Implicit Feedback

Implicit feedback is user behavior that may contain quality signal but is not framed as a judgment. For example:

- copying the answer,
- closing the session,
- reformulating the prompt,
- continuing the conversation.

This distinction matters because real systems rarely get perfect labels. Good memory systems need to extract signal from messy behavior.

## How MemoryBench Is Built

MemoryBench has three modules.

### Task Provider

The task provider supplies each case as:

```text
(q, v, c)
```

where:

- `q` is the query or instruction,
- `v` is evaluation metadata,
- `c` is optional task context.

The context might be a long dialogue history, a legal case description, an academic writing prompt, or nothing at all.

### User Simulator

The user simulator generates feedback on training cases.

For tasks with objective metrics, the system can map score quality to feedback templates. For open-ended tasks, it uses an LLM-as-user setup. The simulated user can produce natural-language feedback, continue the conversation, or produce action-style signals.

The authors also conduct a human annotation check. Their claim is that annotators had difficulty distinguishing simulated verbose feedback from human-written feedback in naturalness and relevance.

### Performance Monitor

The performance monitor evaluates the LLM system on test cases. It uses native dataset metrics where possible and LLM-as-judge aggregation when tasks have multiple evaluation criteria.

The important design point is that feedback logs are generated on training cases only. The test set asks whether the system can transfer what it learned from prior feedback.

## Datasets And Task Shapes

MemoryBench collects 11 public datasets:

- Locomo,
- DialSim,
- LexEval,
- JuDGE,
- IdeaBench,
- LimitGen-Syn,
- WritingPrompts,
- HelloBench,
- WritingBench,
- NF-Cats,
- SciTechNews.

The benchmark covers three broad domains:

- open-domain,
- legal,
- academic.

It also covers English and Chinese.

The task-shape taxonomy is especially useful:

| Task shape | Meaning |
| --- | --- |
| LiSo | Long input, short output |
| LiLo | Long input, long output |
| SiLo | Short input, long output |
| SiSo | Short input, short output |

This matters because many memory systems were tuned on long-input/short-output recall tasks. MemoryBench includes tasks where the main difficulty is not just retrieving from a long context, but learning how to produce better long-form outputs from feedback.

## Baselines

The paper compares several kinds of systems.

### Vanilla

The base LLM answers directly without memory support.

### RAG Baselines

The RAG baselines store task context and feedback logs, then retrieve relevant material.

They vary along two axes:

- BM25 versus embedding retrieval,
- session-level versus message-level storage.

So the main RAG baselines are:

- `BM25-S`,
- `BM25-M`,
- `Embed-S`,
- `Embed-M`.

### Memory Systems

The more advanced systems include:

- `A-Mem`,
- `Mem0`,
- `MemoryOS`.

These systems have specialized memory construction, update, retrieval, or organization mechanisms.

The main backbone in the paper is `Qwen3-8B`; appendix experiments test larger or different backbones.

## Main Results

The results section focuses on three questions.

### 1. Is simulated feedback useful?

Yes, mostly. Systems with memory support often outperform the vanilla model. The paper also reports comparisons showing that feedback can help the backbone model improve task performance.

That supports the benchmark premise: the feedback logs are not arbitrary noise. They contain useful signal.

### 2. Do advanced memory systems beat simple RAG?

Not consistently.

This is the paper's strongest empirical lesson. A-Mem, Mem0, and MemoryOS do not reliably outperform simple RAG baselines that retrieve over task context and feedback logs. In some partitions, simple retrieval is competitive or better.

The authors argue that earlier memory-system papers often evaluated on narrower long-context recall tasks. MemoryBench is broader, so it exposes weaker generalization across domains and task formats.

### 3. Are current memory systems efficient enough?

Often no.

The paper measures both memory operation time and prediction time. MemoryOS has high memory-construction cost. Mem0 can become extremely slow in some long-memory settings. A-Mem is more efficient, but its quality is not consistently better than simple retrieval.

This matters because continual learning creates growing memory. If memory operations become slow as logs accumulate, the system may not be practical even if it sometimes helps.

## Why RAG Is Hard To Beat

The paper's results make RAG look annoyingly strong. That is not because RAG understands procedural feedback deeply. It is because RAG has three practical advantages.

First, it is robust. If relevant feedback text exists, retrieval can surface it without requiring an elaborate memory-update algorithm.

Second, it is cheap. Term indexes and vector indexes are mature and efficient compared with LLM-heavy memory consolidation.

Third, it does not over-interpret. Some memory systems may transform logs into summaries or structured memory entries and lose useful detail. RAG can preserve raw feedback.

The lesson is not that RAG solves memory. It is that future memory systems must beat a strong retrieval baseline on both quality and cost.

## What Should We Be Careful About?

The first caveat is simulation. MemoryBench simulates user feedback. That is useful for reproducibility, but real production feedback can be more biased, noisier, more strategic, more private, and more context-dependent.

The second caveat is model dependence. The user simulator and some metric aggregation rely on LLMs. Different simulator models could change feedback style and difficulty.

The third caveat is benchmark scope. MemoryBench is broad compared with prior memory benchmarks, but it is still a constructed benchmark. Real service-time learning involves distribution shift, privacy constraints, adversarial use, data retention policies, and changing user goals.

The fourth caveat is that the benchmark evaluates memory systems but does not prescribe the winning architecture. It tells us the problem is real and current systems struggle. It does not solve continual learning for LLM systems.

## The Takeaway

MemoryBench is important because it pushes LLM memory evaluation away from static recall and toward continual improvement.

The most important distinction is:

**Facts are not feedback. Remembering a user profile is not the same as learning how to improve after the user critiques your answer.**

Current systems are not yet good at this. They often treat all memory as text to store and retrieve, while MemoryBench asks them to learn procedural lessons from feedback logs. That is why simple RAG remains a hard baseline and why future memory systems need better feedback interpretation, noise filtering, procedural abstraction, and efficient update mechanisms.

## Memory Checklist

- MemoryBench evaluates LLM systems, not just base LLMs.
- The central problem is continual learning from user feedback.
- Declarative memory stores facts; procedural memory stores task-improvement knowledge.
- Feedback can be explicit verbose, explicit action, or implicit action.
- The benchmark has Task Provider, User Simulator, and Performance Monitor modules.
- It uses 11 datasets across open-domain, legal, and academic tasks.
- It includes English and Chinese tasks.
- It tests four task shapes: LiSo, LiLo, SiLo, and SiSo.
- Baselines include vanilla, BM25 RAG, embedding RAG, A-Mem, Mem0, and MemoryOS.
- Main result: current memory systems do not consistently beat simple RAG.
- Main future need: systems that can turn noisy feedback logs into efficient procedural memory.
