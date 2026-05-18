# Raindrop Recent Intake: 2026-05-18

Source: Raindrop.io recent bookmarks
Ingested: 2026-05-18
Collection: `-1` / unsorted recent saves
Extraction strategy: Raindrop API manifest, canonical source resolution where available, local PDF text extraction for arXiv papers, and dedupe against existing Learning Machine artifacts.

This note is a deduped intake pass over the recent Raindrop batch. Items already present in Learning Machine are not re-ingested; they are linked back to their existing processed notes or lessons. X-only discovery posts are preserved as limited discovery notes when the canonical target could not be confidently resolved from public metadata.

## Intake Summary

Newly ingested in this batch:

- `1722601694` Simple input-output dependencies explain neuronal activity.
- `1722543503` SFT Memorizes, RL Generalizes.
- `1722426994` Biomedical data-analysis agents / BioMniBench discovery note.
- `1722416699` Cursor Composer 2.5.
- `1722412289` Slicing and Dicing MoEs.
- `1722410784` Agent-BRACE.
- `1722337828` On Policy Self Distillation discovery note.
- `1722337600` FutureSim.
- `1722337131` SlimQwen.
- `1722336932` Extracting Search Trees from LLM Reasoning Traces.
- `1722336722` On Training in Imagination.
- `1722291208` How to Land a Frontier Lab Job.
- `1722289324` Generalization Dynamics of LM Pre-training.
- `1722279885` Tool-use agent interpretability discovery note.
- `1722273215` ECHO terminal-agents discovery note.
- `1722241500` NLA steered-activation faithfulness discovery note.
- `1722170299` Bentham's Bulldog X bookmark, limited metadata only.
- `1710872198` Ultimate guide to RL environments.
- `1709208620` Prime-RL post-training discovery note.

Already present, not duplicated:

- `1722337325` Learning, Fast and Slow: [materials/processed/ai/learning-fast-and-slow-towards-llms-that-adapt-continually.md](learning-fast-and-slow-towards-llms-that-adapt-continually.md)
- `1709237213` Natural Language Autoencoders: [materials/processed/ai/natural-language-autoencoders-produce-unsupervised-explanations-llm-activations.md](natural-language-autoencoders-produce-unsupervised-explanations-llm-activations.md)
- `1709237196` Qwen-Scope: [materials/processed/ai/qwen-scope-turning-sparse-features-into-development-tools-for-large-language-models.md](qwen-scope-turning-sparse-features-into-development-tools-for-large-language-models.md)
- `1709237132` Rubrics as Rewards: [materials/processed/ai/rubrics-as-rewards-reinforcement-learning-beyond-verifiable-domains.md](rubrics-as-rewards-reinforcement-learning-beyond-verifiable-domains.md)
- `1709237043` Natural Language Autoencoders companion article: already covered by the NLA artifact above.
- `1709237020` Qwen blog / Qwen-Scope companion source: already covered by the Qwen-Scope artifact above.

## Newly Ingested Items

### Simple input-output dependencies explain neuronal activity

Raindrop ID: `1722601694`
Raindrop saved at: `2026-05-18T21:18:22.431Z`
Source: `https://www.nature.com/articles/s41567-026-03306-3`
Original saved link: `https://www.nature.com/articles/s41567-026-03306-3.epdf`
Author: Christopher W. Lynn
Published: 2026-05-18
Root: biology / AI-adjacent computational neuroscience

This Nature Physics paper asks whether real neurons require rich interaction terms among inputs, or whether much of their output activity can be explained by direct dependencies on individual inputs. The central result is that maximum-entropy models constrained only by direct input-output dependencies explain most of the variability in neuronal activity across mouse hippocampus, mouse visual cortex, and C. elegans recordings.

The AI connection is conceptual rather than an LLM result: the inferred minimal models are equivalent to logistic artificial neurons. The paper gives a biological argument for why simple artificial-neuron-style models can capture surprisingly much about real neural activity despite the underlying biophysics being complex.

Reading hook: this is useful background for thinking about when simple local units can explain complex population behavior, and when higher-order interactions are actually needed.

### SFT Memorizes, RL Generalizes

Raindrop ID: `1722543503`
Raindrop saved at: `2026-05-18T19:44:14.815Z`
Canonical source: `https://arxiv.org/abs/2501.17161`
PDF: `https://arxiv.org/pdf/2501.17161`
<!-- Source text: materials/source_text/ai/sft-memorizes-rl-generalizes.txt -->
Authors: Tianzhe Chu, Yuexiang Zhai, Jihan Yang, Shengbang Tong, Saining Xie, Dale Schuurmans, Quoc V. Le, Sergey Levine, Yi Ma
Submitted: 2025-01-28; revised: 2025-05-26

This paper compares supervised fine-tuning and reinforcement learning as post-training methods for foundation models. Its headline claim is that SFT tends to memorize the training distribution while RL, especially with outcome rewards, better generalizes across unseen textual and visual task variants.

The paper introduces GeneralPoints, an arithmetic reasoning card game with rule variants, and also uses V-IRL, a real-world navigation environment. The useful lesson is not simply "RL is better than SFT"; the paper argues that SFT remains important because it stabilizes formatting and behavior enough for later RL to work, while RL supplies more robust adaptation to distribution shifts.

Why it matters for the learning system: this belongs near post-training and Scale AI prep because it sharpens a recurring distinction between imitation-style behavior cloning and outcome-driven optimization. If an agent needs to handle variants that were not literally demonstrated, reward-based training may teach a more transferable rule.

### Biomedical data-analysis agents / BioMniBench discovery

Raindrop ID: `1722426994`
Raindrop saved at: `2026-05-18T17:56:59.231Z`
Discovery source: `https://x.com/yuanhaoq/status/2056397649675501986?s=12`
Extraction status: Limited discovery note.

The Raindrop text asks whether AI agents can perform biomedical data-analysis tasks behind papers in venues such as Nature, Cell, and Science, and names `BiomniBench`. Public search surfaced several closely related biomedical-agent benchmarks and systems, including BioMedAgent, CellVoyager, BioAgent Bench, BioDSA-1K, BioXArena, and Biomni. I did not confidently resolve this X post to a single canonical paper from the bookmark metadata alone.

Keep this as a follow-up queue item, not a complete paper ingest. The likely learning theme is scientific-agent evaluation: agents are moving from generic software tasks toward messy biomedical workflows with domain tools, multimodal data, bioinformatics pipelines, and paper-derived analysis tasks.

### Cursor Composer 2.5

Raindrop ID: `1722416699`
Raindrop saved at: `2026-05-18T17:40:17.340Z`
Source: `https://cursor.com/blog/composer-2-5`
Site: Cursor

This is a product/technical update for Cursor's Composer 2.5. The saved excerpt frames it as a substantial improvement in intelligence and behavior over Composer 2, especially for long-horizon agentic tasks.

This should be read alongside the existing Composer artifacts rather than as a replacement:

- [materials/processed/ai/composer-2-technical-report.md](composer-2-technical-report.md)
- [materials/processed/ai/improving-composer-through-real-time-rl.md](improving-composer-through-real-time-rl.md)

The learning-system value is trend tracking: coding-agent systems are iterating on long-horizon behavior, latency, tool use, and reliability faster than static model papers alone reveal.

### Slicing and Dicing: Configuring Optimal Mixtures of Experts

Raindrop ID: `1722412289`
Raindrop saved at: `2026-05-18T17:32:12.484Z`
Discovery source: `https://x.com/margs_li/status/2056355079188627862?s=12`
Canonical source: `https://arxiv.org/abs/2605.11689`
PDF: `https://arxiv.org/pdf/2605.11689`
<!-- Source text: materials/source_text/ai/slicing-and-dicing-moes.txt -->
Authors: Margaret Li, Sneha Kudugunta, Danielle Rothermel, Luke Zettlemoyer
Submitted: 2026-05-12

This paper studies MoE architecture design through more than 2,000 pretraining runs. It varies expert count, expert granularity, heterogeneous expert sizing, shared experts, load-balancing mechanisms, and token dropping.

The main practical takeaway is that MoE quality is driven most strongly by total expert count and expert granularity. Other design knobs, including shared experts, heterogeneous experts, and many load-balancing details, have smaller effects than the paper expected, although dropless routing helps consistently.

This belongs near SlimQwen because both papers ask how to reason about MoE capacity. Slicing and Dicing studies how to configure MoEs before or during pretraining; SlimQwen studies how to compress a pretrained MoE while retaining performance.

### Agent-BRACE

Raindrop ID: `1722410784`
Raindrop saved at: `2026-05-18T17:30:08.844Z`
Canonical source: `https://arxiv.org/abs/2605.11436`
PDF: `https://arxiv.org/pdf/2605.11436`
<!-- Source text: materials/source_text/ai/agent-brace-decoupling-beliefs-from-actions.txt -->
Authors: Joykirat Singh, Zaid Khan, Archiki Prasad, Justin Chih-Yao Chen, Akshay Nambi, Hyunji Lee, Elias Stengel-Eskin, Mohit Bansal
Submitted: 2026-05-12

Agent-BRACE tackles long-horizon partially observable agent tasks. Instead of feeding an agent the full ever-growing trajectory or compressing it into a single free-form summary, the method separates the agent into a belief-state model and a policy model. The belief-state model writes atomic natural-language claims annotated with verbal uncertainty labels such as certain, probable, possible, or unknown.

The policy model then acts from this compact uncertain belief state rather than from raw history. The reported result is better task performance and near-constant context length, with gains of +14.5 percentage points for Qwen2.5-3B-Instruct and +5.3 percentage points for Qwen3-4B-Instruct over strong RL baselines.

Why it matters: this is a clean bridge between POMDP-style belief states and LLM-agent memory. It is especially relevant to agent systems where uncertainty, state tracking, and bounded context are more important than merely summarizing the conversation.

### On Policy Self Distillation discovery note

Raindrop ID: `1722337828`
Raindrop saved at: `2026-05-18T16:23:25.354Z`
Discovery source: `https://x.com/ar0cket1/status/2054108160450064571?s=12`
Extraction status: Limited discovery note.

The X title is too broad to map confidently to one paper. Public search finds several related on-policy self-distillation papers: `Self-Distilled Reasoner`, `On-Policy Self-Distillation for Reasoning Compression`, `OPSDL` for long-context learning, and `OGLS-SD`.

The shared theme is dense token-level training on trajectories sampled from the model's own policy. This matters because it attacks the distribution mismatch in off-policy distillation: instead of training only on teacher demonstrations, the student learns from its own rollouts while receiving teacher or self-teacher guidance.

Follow-up: resolve the exact tweet target before making a standalone lesson.

### FutureSim: Replaying World Events to Evaluate Adaptive Agents

Raindrop ID: `1722337600`
Raindrop saved at: `2026-05-18T16:23:02.414Z`
Discovery source: `https://x.com/shashwatgoel7/status/2055336064378720412?s=12`
Canonical source: `https://arxiv.org/abs/2605.15188`
PDF: `https://arxiv.org/pdf/2605.15188`
<!-- Source text: materials/source_text/ai/futuresim-replaying-world-events-adaptive-agents.txt -->
Authors: Shashwat Goel, Nikhil Chandak, Arvindh Arun, Ameya Prabhu, Steffen Staab, Moritz Hardt, Maksym Andriushchenko, Jonas Geiping
Submitted: 2026-05-14

FutureSim evaluates adaptive agents by replaying real world events chronologically. Agents must forecast events beyond their knowledge cutoff while receiving news and resolution information in time order.

The paper reports that frontier agents still struggle in this setting: the best agent reaches 25% accuracy, and many perform worse by Brier skill score than making no prediction. The benchmark is useful because it tests long-horizon adaptation, memory, search, and uncertainty in a realistic stream rather than in a static benchmark.

This belongs near continual learning, metacognitive uncertainty, and agent evaluation. It is a good complement to Learning, Fast and Slow because both ask whether agents can update over time without being directly retrained on a static dataset.

### SlimQwen

Raindrop ID: `1722337131`
Raindrop saved at: `2026-05-18T16:22:12.428Z`
Discovery source: `https://www.alphaxiv.org/abs/2605.08738`
Canonical source: `https://arxiv.org/abs/2605.08738`
PDF: `https://arxiv.org/pdf/2605.08738`
<!-- Source text: materials/source_text/ai/slimqwen-pruning-distillation-moe-pretraining.txt -->
Authors: Shengkun Tang, Zekun Wang, Bo Zheng, Liangyu Wang, Rui Men, Siqi Zhang, Xiulong Yuan, Zihan Qiu, Zhiqiang Shen, Dayiheng Liu
Submitted: 2026-05-09

SlimQwen studies how to compress large MoE models at pretraining scale. It asks whether pruning a pretrained MoE is better than training the smaller target model from scratch, how expert compression choices matter after large-scale continued training, and which post-compression training objective works best.

The practical conclusions are clear: pruning gives a better initialization than training from scratch; many one-shot expert compression methods converge similarly after enough continued pretraining; partial-preservation expert merging improves results; hybrid language-modeling plus KD beats pure KD on knowledge-heavy tasks; multi-token prediction distillation helps; and progressive pruning schedules beat one-shot compression under the same token budget.

This should be paired with Slicing and Dicing. Together they form a useful MoE design/compression mini-cluster: how to choose expert structure, and how to shrink it later.

### Extracting Search Trees from LLM Reasoning Traces Reveals Myopic Planning

Raindrop ID: `1722336932`
Raindrop saved at: `2026-05-18T16:21:55.943Z`
Discovery source: `https://www.alphaxiv.org/abs/2605.06840`
Canonical source: `https://arxiv.org/abs/2605.06840`
PDF: `https://arxiv.org/pdf/2605.06840`
<!-- Source text: materials/source_text/ai/extracting-search-trees-llm-reasoning-myopic-planning.txt -->
Authors: Sixing Chen, Ji-An Li, Saner Cakir, Sinan Akcali, Kayla Lee, Marcelo G. Mattar
Submitted: 2026-05-07; revised: 2026-05-13

This paper asks whether reasoning-model chain-of-thought traces actually implement search-based planning. The authors parse reasoning traces from four-in-a-row gameplay into search trees, then fit computational models to test which parts of the tree explain the model's move decisions.

The result is a warning for interpreting long reasoning traces. LLMs sometimes write deep-looking lookahead, but their decisions are better explained by shallow, myopic search. Causal pruning of reasoning paragraphs also suggests that shallow parts of the trace drive moves more than deep expansions.

This belongs near interpretability, chain-of-thought oversight, and agent planning. It gives a concrete method for asking whether visible reasoning is causally connected to action choice.

### On Training in Imagination

Raindrop ID: `1722336722`
Raindrop saved at: `2026-05-18T16:21:35.789Z`
Canonical source: `https://arxiv.org/abs/2605.06732`
PDF: `https://arxiv.org/pdf/2605.06732`
<!-- Source text: materials/source_text/ai/on-training-in-imagination.txt -->
Authors: Nadav Timor, Ravid Shwartz-Ziv, Micah Goldblum, Yann LeCun, David Harel
Submitted: 2026-05-07; revised: 2026-05-11

This paper studies model-based reinforcement learning where policies are trained on imagined rollouts generated by learned dynamics and reward models rather than by querying the real environment during every update.

The analysis focuses on error allocation: how learned dynamics error and learned reward error affect returns and policy optimization. It derives a sample-allocation tradeoff under scaling assumptions and studies when cheap noisy rewards can still support useful REINFORCE updates.

The learning-system connection is agent training infrastructure. If future agents train inside simulators, learned environments, or synthetic worlds, then the cost and bias of imagined dynamics/rewards become central design constraints.

### How to Land a Frontier Lab Job

Raindrop ID: `1722291208`
Raindrop saved at: `2026-05-18T15:57:05.126Z`
Source: `https://vladfeinberg.com/2026/05/10/how-to-land-a-job-at-a-frontier-lab.html`
Author/site: Vlad Feinberg

This career article belongs in the Scale/frontier-lab prep queue rather than the technical paper queue. Its practical role is to translate research-learning work into internship/job strategy: choose visible projects, demonstrate taste, write clearly, and make it easy for frontier-lab researchers to see evidence of useful judgment.

Keep as a career-prep source. It should not crowd the technical AI paper map, but it is relevant to the user's ongoing research-internship preparation.

### Generalization Dynamics of LM Pre-training

Raindrop ID: `1722289324`
Raindrop saved at: `2026-05-18T15:53:21.186Z`
Source: `https://jiaxin-wen.github.io/blog/generalization-dynamics`
Author/site: Jiaxin Wen

This blog post is a pretraining/generalization reading. The saved title indicates a focus on how language-model generalization evolves during pretraining rather than only at final checkpoint evaluation.

Use this as a conceptual bridge between scaling laws, data dynamics, grokking-like transitions, and curriculum/order effects. Follow-up value: turn this into a standalone lesson if the post provides concrete empirical curves or mechanistic claims about when generalization emerges.

### Tool-use agent interpretability discovery note

Raindrop ID: `1722279885`
Raindrop saved at: `2026-05-18T15:42:14.251Z`
Discovery source: `https://x.com/omarsar0/status/2055750162526715926?s=12`
Extraction status: Limited discovery note.

The saved excerpt says the paper probes hidden states and finds that a model often recognizes it should call a tool but fails to actually call one, with mismatch rates in the 26% to 54% range concentrated in a cognition-to-action gap.

This is a strong interpretability/agent-control lead, but I could not confidently resolve the exact canonical paper from public search during this ingest pass. Keep it as a follow-up item. The conceptual theme is important: agent failures may not only be reasoning failures; they can be translation failures between internal recognition and external action.

### ECHO: Terminal Agents Learn World Models for Free

Raindrop ID: `1722273215`
Raindrop saved at: `2026-05-18T15:32:36.181Z`
Discovery source: `https://x.com/dimitrispapail/status/2056368948870811746?s=12`
Extraction status: Limited discovery note.

The saved title suggests a terminal-agent method where interaction traces or terminal feedback induce usable world models without an explicitly separate world-model training phase.

This belongs near agent environments, computer-use agents, and RL environment design. It should be resolved to a paper, repo, or project page before becoming a full lesson.

### NLA steered-activation faithfulness discovery note

Raindrop ID: `1722241500`
Raindrop saved at: `2026-05-18T14:42:36.896Z`
Discovery source: `https://x.com/aamixsh/status/2056357773521084767?s=12`
Extraction status: Limited discovery note.

The saved excerpt says that natural-language activation explanations may fail when activations are steered into non-invertible regions, and that no prompt may map cleanly to those steered activations.

This is not a duplicate of the existing Natural Language Autoencoders artifact. It is a follow-up critique/faithfulness question: even if an NLA can verbalize naturally occurring activations, intervention-created activations may lie outside the verbalizer's invertible support. That matters if people want to use NLA text as a faithful description of steered or optimized internal states.

### Bentham's Bulldog X bookmark

Raindrop ID: `1722170299`
Raindrop saved at: `2026-05-18T13:36:00.475Z`
Discovery source: `https://x.com/benthamsbulldog/status/2056035877642461267?s=12`
Extraction status: Limited metadata only.

The Raindrop title contains only the account name, engagement counts, and the X URL. There was not enough preserved metadata to infer a learning topic. This is ingested only as a placeholder so the Raindrop ID is not repeatedly reprocessed.

### Ultimate guide to RL environments

Raindrop ID: `1710872198`
Raindrop saved at: `2026-05-09T15:36:28.383Z`
Discovery source: `https://x.com/sergiopaniego/status/2053120052157628678?s=12`
Resolved public thread: `https://threadreaderapp.com/thread/2051660068471603352.html`
Related author page: `https://huggingface.co/AdithyaSK`

This guide maps what "RL environment" means in the LLM-agent era. The thread describes environment components, how tools/actions/harnesses are defined, where environments fit in the RL training pipeline, and how frameworks such as OpenEnv, Verifiers, OpenReward, NeMo, SkyRL, and GEM differ.

This is directly useful for post-training agents because environment design is becoming a core research artifact. A weak environment can make RL look ineffective; a strong environment can expose the agent to the right action loops, rewards, and failure cases.

### Prime-RL post-training discovery note

Raindrop ID: `1709208620`
Raindrop saved at: `2026-05-07T22:50:02.521Z`
Discovery source: `https://x.com/ramplabs/status/2052447438795833506?s=12`
Extraction status: Limited discovery note.

The saved title is "Building Fast & Accurate Agents with Prime-RL Post Training." Public search indicates this concerned Ramp Labs and Prime Intellect building a small RL-trained spreadsheet/question-answering subagent with strong latency and accuracy tradeoffs.

This connects to the existing Prime Intellect overview:

- [materials/processed/ai/prime-intellect-company-overview.md](prime-intellect-company-overview.md)

Do not treat this as fully ingested until the underlying post, video, or article is available directly. The durable theme is specialized-agent post-training: train a small agent for a narrow operational domain, then compare against larger general agents on exact-match accuracy, latency, and reliability.

## Dedupe Decisions

### Learning, Fast and Slow

Raindrop ID: `1722337325`
Saved link: `https://arxiv.org/pdf/2605.12484`
Decision: Already ingested.

Existing artifact:

- [materials/processed/ai/learning-fast-and-slow-towards-llms-that-adapt-continually.md](learning-fast-and-slow-towards-llms-that-adapt-continually.md)

### Natural Language Autoencoders

Raindrop IDs: `1709237213`, `1709237043`
Saved links:

- `https://transformer-circuits.pub/2026/nla/index.html#characterizing-nla-confabulations`
- `https://www.anthropic.com/research/natural-language-autoencoders`

Decision: Already ingested as one combined Transformer Circuits / Anthropic artifact.

Existing artifact:

- [materials/processed/ai/natural-language-autoencoders-produce-unsupervised-explanations-llm-activations.md](natural-language-autoencoders-produce-unsupervised-explanations-llm-activations.md)

### Qwen-Scope

Raindrop IDs: `1709237196`, `1709237020`
Saved links:

- `https://qianwen-res.oss-accelerate.aliyuncs.com/qwen-scope/Qwen_Scope.pdf`
- `https://qwen.ai/blog?id=qwen-scope`

Decision: Already ingested as a Qwen-Scope paper lesson/source artifact.

Existing artifact:

- [materials/processed/ai/qwen-scope-turning-sparse-features-into-development-tools-for-large-language-models.md](qwen-scope-turning-sparse-features-into-development-tools-for-large-language-models.md)

### Rubrics as Rewards

Raindrop ID: `1709237132`
Saved link: `https://arxiv.org/pdf/2507.17746`
Decision: Already ingested.

Existing artifact:

- [materials/processed/ai/rubrics-as-rewards-reinforcement-learning-beyond-verifiable-domains.md](rubrics-as-rewards-reinforcement-learning-beyond-verifiable-domains.md)

## Follow-Up Queue

- Resolve the exact paper behind the tool-use agent interpretability tweet.
- Resolve the exact ECHO terminal-agents source.
- Resolve the exact NLA steered-activation faithfulness source.
- Decide whether the Nature Physics neuron paper should get a public biology lesson or remain as an AI-adjacent processed source.
- Split the strongest new items into full paper lessons if desired: Agent-BRACE, SlimQwen, Slicing and Dicing MoEs, FutureSim, and Extracting Search Trees.
