# Metacognitive Uncertainty And Self-Knowledge Paper Map

Source set:

- `https://arxiv.org/abs/2207.05221`
- `https://arxiv.org/abs/2510.21310`
- `https://arxiv.org/abs/2205.14334`
- `https://arxiv.org/abs/2510.12587`
- `https://arxiv.org/abs/2308.05342`
- `https://arxiv.org/abs/2505.23845`
- `https://arxiv.org/abs/2506.18183`
- `https://arxiv.org/abs/2511.07483`
- `https://aclanthology.org/2025.emnlp-main.1385/`
- `https://arxiv.org/abs/2508.00410`
- `https://arxiv.org/abs/2512.16883`
- `https://arxiv.org/abs/2605.08556`

Accessed: `2026-05-18`
Extraction engine: `canonical arXiv/ACL metadata lookup plus manual structured batch ingest`
Strategy: `thematic paper-batch normalization for metacognition, uncertainty, calibration, reasoning, reward modeling, and agent tool control`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; evaluation; post-training; interpretability; agents; post-training x interpretability`
Cross-index: `topics/ai/scale-ai-research-internship-prep/INDEX.md`

## Summary

This batch covers papers about whether language models can recognize, express, and act on their own uncertainty. The papers fall into five connected buckets:

1. Internal signals and self-knowledge.
2. Linguistic calibration and faithful uncertainty expression.
3. Reasoning-model uncertainty and inference-time exploration.
4. Confidence-aware or self-supervised reinforcement learning.
5. Agentic search/tool-use systems where the model must decide when external evidence is needed.

The through-line is that hallucination is not only an accuracy problem. It is a control problem. A model can be wrong, but the dangerous case is often wrong-and-confident: it fails to surface uncertainty to the user, to a reward model, or to an agent harness that must decide whether to retrieve, verify, stop, or escalate.

## Corrected Source List

Some titles in the provided list were shorthand or had approximate dates. The canonical versions used for this ingest are below.

| Bucket | Canonical source | Authors | Date / venue note | Why it belongs |
| --- | --- | --- | --- | --- |
| Internal signals | [Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221) | Saurav Kadavath, Tom Conerly, Amanda Askell, Tom Henighan, Dawn Drain, Ethan Perez, Nicholas Schiefer, et al. | arXiv 2022 | Tests whether models can predict answer correctness with `P(True)` and task-level knowledge with `P(IK)`. |
| Internal signals | [Efficient semantic uncertainty quantification in language models via diversity-steered sampling](https://arxiv.org/abs/2510.21310) | Ji Won Park, Kyunghyun Cho | NeurIPS 2025; arXiv v2 2026 | Makes semantic uncertainty estimation cheaper by steering samples toward diverse meaning clusters. |
| Linguistic calibration | [Teaching Models to Express Their Uncertainty in Words](https://arxiv.org/abs/2205.14334) | Stephanie Lin, Jacob Hilton, Owain Evans | arXiv 2022 | Shows models can be trained to verbalize calibrated confidence without direct logit access. |
| Linguistic calibration | [Teaching Language Models to Faithfully Express their Uncertainty](https://arxiv.org/abs/2510.12587) | Bryan Eikema, Evgenia Ilia, Jose G. C. de Souza, Chrysoula Zerva, Wilker Aziz | arXiv 2025 | Introduces Faithful Uncertainty Tuning, aligning hedging with sample inconsistency while preserving answer distribution. |
| Linguistic calibration / prompting | [Metacognitive Prompting Improves Understanding in Large Language Models](https://arxiv.org/abs/2308.05342) | Yuqing Wang, Yun Zhao | NAACL 2024 | Uses structured self-aware prompting steps to improve NLU performance across GLUE/SuperGLUE/BLUE/LexGLUE tasks. |
| Reasoning models | [Read Your Own Mind: Reasoning Helps Surface Self-Confidence Signals in LLMs](https://arxiv.org/abs/2505.23845) | Jakub Podolak, Rajeev Verma | UncertaiNLP at EMNLP 2025 | Argues self-reported confidence becomes useful when long reasoning explores the model's generative distribution. |
| Reasoning models | [Reasoning about Uncertainty: Do Reasoning Models Know When They Don't Know?](https://arxiv.org/abs/2506.18183) | Zhiting Mei, Christina Zhang, Tenny Yin, Justin Lidard, Ola Shorinwa, Anirudha Majumdar | arXiv 2025 | Finds reasoning models are often overconfident; deeper reasoning can worsen calibration, while introspection helps unevenly. |
| Uncertainty-aware RL | [Beyond Correctness: Confidence-Aware Reward Modeling for Enhancing Large Language Model Reasoning](https://arxiv.org/abs/2511.07483) | Qianxi He, Qingyu Ren, Shanzhe Lei, Xuhong Wang, Yingchun Wang | EMNLP 2025 / arXiv 2025 | Adds confidence to the reward signal so STEM reasoning training rewards more than final-answer correctness. |
| Uncertainty-aware RL | [Co-rewarding: Stable Self-supervised RL for Eliciting Reasoning in Large Language Models](https://arxiv.org/abs/2508.00410) | Zizhuo Zhang, Jianing Zhu, Xinmu Ge, Zihua Zhao, Zhanke Zhou, Xuan Li, Xiao Feng, Jiangchao Yao, Bo Han | ICLR 2026 | Uses cross-view or slow-teacher reward signals to prevent self-rewarding collapse and elicit reasoning without labels. |
| Agentic tool control | [AdaSearch: Balancing Parametric Knowledge and Search in Large Language Models via Reinforcement Learning](https://arxiv.org/abs/2512.16883) | Tzu-Han Lin, Wei-Lin Chen, Chen-An Li, Hung-yi Lee, Yun-Nung Chen, Yu Meng | arXiv 2025 | Trains an explicit decision about whether to search, improving knowledge-boundary awareness and reducing unnecessary tool calls. |
| Alignment / revealed preferences | [Can Revealed Preferences Clarify LLM Alignment and Steering?](https://arxiv.org/abs/2605.08556) | Khurram Yamin, Jingjing Tang, Eric Horvitz, Bryan Wilder | arXiv 2026 | Fits choice models to model decisions under uncertainty, testing whether stated objectives match revealed decision policies. |

## Thematic Takeaways

### 1. Self-knowledge is partly present but format-sensitive

`Language Models (Mostly) Know What They Know` is the anchor. It shows that models can sometimes estimate whether their own answers are true, especially when asked in the right format and when allowed to inspect samples. But the result is not "models automatically know." The knowledge signal depends on prompting, task distribution, scale, and whether the model is asked about a proposed answer or about a task-level knowledge boundary.

That distinction matters for agent systems. An agent does not only need a final confidence number; it needs to know whether the current problem is answerable from memory, whether more evidence is needed, and whether a proposed answer should be trusted.

### 2. Verbal uncertainty is a communication layer, not the whole uncertainty system

Lin, Hilton, and Evans show that a model can be trained to express calibrated confidence in words or percentages. Eikema et al. sharpen the target: the expressed uncertainty should be faithful to the model's own instability under repeated sampling. The relevant failure is not simply "no hedging." It is unfaithful hedging: confident answers when the model's own distribution is unstable, or vague hedging that does not correspond to real uncertainty.

This creates a practical design principle: linguistic uncertainty should be downstream of a measurable internal or behavioral uncertainty signal. Otherwise, hedging becomes style.

### 3. Semantic uncertainty is expensive because free-form answers collapse many strings into meanings

Diversity-steered sampling attacks a concrete bottleneck in semantic uncertainty. Free-form QA can produce many string variants of the same answer, so naive sampling wastes budget on redundant generations. The Park and Cho paper steers decoding away from semantically redundant outputs, then corrects for the biased sampling process.

The important idea is that uncertainty lives over semantic clusters, not just token probabilities or surface strings. If twenty generations are paraphrases of one answer, the model may be confident. If twenty generations split across incompatible meanings, the model is uncertain even if every answer is fluent.

### 4. Reasoning can reveal uncertainty, but more reasoning is not automatically better calibration

`Read Your Own Mind` argues that long reasoning helps confidence because it forces exploration of alternatives. A separate reader can reconstruct confidence from the chain, suggesting the confidence report is a statistic of what the chain surfaced.

`Reasoning about Uncertainty` complicates the story. Reasoning models can still be highly overconfident, and deeper reasoning can make overconfidence worse. Introspective uncertainty quantification helps some models but hurts others. The lesson is not "chain-of-thought fixes calibration." The lesson is that reasoning traces can be a useful uncertainty substrate only when the model is trained or prompted to audit them faithfully.

### 5. Reward models should reward epistemic behavior, not only correct final answers

Confidence-aware reward modeling points at a post-training problem: exact-answer rewards can reinforce lucky guesses and poor reasoning chains. If a model randomly gets an answer correct with low confidence or incoherent reasoning, a correctness-only reward gives it the same signal as robust reasoning. Confidence-aware rewards try to separate those cases.

Co-rewarding addresses a related self-supervised RL failure. If the model supervises itself from a single view, it can collapse into self-consistent illusions or reward hacks. Cross-view agreement and slow-teacher signals add friction against trivial self-confirmation.

Together, these papers say that uncertainty is not only an evaluation metric. It can become part of the training objective.

### 6. Agentic search exposes metacognition as a routing problem

AdaSearch is the most direct agent-control paper in the batch. Search agents can over-search, paying unnecessary cost and exposing themselves to noisy or hostile content, or under-search and hallucinate from parametric memory. Counting tool calls is a weak metric because it conflates necessary and unnecessary search. AdaSearch instead makes the "should I search?" decision explicit and trains it separately.

This is exactly the control-layer view of metacognition. The model needs a boundary estimate before acting: answer from memory, retrieve, verify, or abstain.

### 7. Revealed preferences turn uncertainty into a decision-policy audit

`Can Revealed Preferences Clarify LLM Alignment and Steering?` broadens the uncertainty question from factual confidence to choice under uncertainty. A model might state an objective, but its actual decisions imply a cost function. Fitting a discrete choice model to those decisions gives an empirical way to test whether the model's stated values match its revealed policy and whether prompting can steer that policy.

This belongs in the same map because metacognition is not only "am I right?" In high-stakes settings, it is also "what tradeoff am I making under uncertainty, and can I faithfully describe that tradeoff?"

## Reading Order

1. Start with `Language Models (Mostly) Know What They Know`.
2. Read Lin/Hilton/Evans, then Eikema et al., to understand verbalized uncertainty.
3. Read diversity-steered sampling to understand semantic uncertainty over answer clusters.
4. Read the two reasoning-model papers together: one optimistic about reasoning as exploration, one cautionary about overconfidence.
5. Read confidence-aware reward modeling and Co-rewarding for post-training objective design.
6. Read AdaSearch for the agent-tool-control version.
7. Read revealed preferences last, as the alignment/decision-policy generalization.

## Connections To Existing Local Notes

- `Hallucinations Undermine Trust; Metacognition Is A Way Forward` gives the position-paper frame: faithful uncertainty is the path from hallucination reduction to trustworthy agents.
- `Reinforcement Learning for Knowledge Awareness` gives a small experiment where activation readouts become a reward for epistemic behavior.
- `Features as Rewards` gives the interpretability-reward version of the same idea.
- `Rubrics as Rewards` and `Reward Hacking in Rubric-Based Reinforcement Learning` are nearby because confidence and uncertainty can become rubric criteria, but also can become reward-hacking surfaces.

## Questions For Review

1. What is the difference between `P(True)` and `P(IK)`?
2. Why is faithful hedging different from merely adding words like "maybe"?
3. Why does semantic uncertainty require clustering meanings rather than counting distinct strings?
4. When does reasoning help confidence estimation, and when can it make overconfidence worse?
5. Why can correctness-only RL reward lucky but weak reasoning?
6. Why is "number of searches" a bad proxy for agentic search quality?
7. How do revealed preferences test whether a model's stated objective matches its actual decision policy?
