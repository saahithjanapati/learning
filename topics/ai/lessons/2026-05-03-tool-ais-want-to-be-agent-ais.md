# Why Tool AIs Want to Be Agent AIs

Source note: [materials/processed/ai/why-tool-ais-want-to-be-agent-ais.md](../../../materials/processed/ai/why-tool-ais-want-to-be-agent-ais.md)

Gwern's essay is about an old but still central AI-safety hope: maybe we can build very powerful AI systems that only advise humans, while humans keep all real-world agency. Gwern's answer is that this split is unstable. Tool AIs are economically pressured to become agents, and more subtly, the same kinds of action and feedback that make agents useful also make systems smarter.

## Table of Contents

1. [The Basic Distinction](#the-basic-distinction)
2. [Why Tool AI Sounds Safer](#why-tool-ai-sounds-safer)
3. [The Economic Pressure Toward Agents](#the-economic-pressure-toward-agents)
4. [The Deeper Claim: Agency Helps Intelligence](#the-deeper-claim-agency-helps-intelligence)
5. [Action Inside Computation](#action-inside-computation)
6. [Action Inside Training And Data Collection](#action-inside-training-and-data-collection)
7. [Action Inside Architecture Search](#action-inside-architecture-search)
8. [Action In The World](#action-in-the-world)
9. [Why More Data Is Not Always Enough](#why-more-data-is-not-always-enough)
10. [What This Means For Modern AI Systems](#what-this-means-for-modern-ai-systems)
11. [Caveats And Critique](#caveats-and-critique)
12. [Memory Checklist](#memory-checklist)

## The Basic Distinction

A `Tool AI` is an AI system that helps by computing information. It predicts, classifies, ranks, summarizes, recommends, or explains. A human remains responsible for deciding what to do with the output.

An `Agent AI` is an AI system that can select and execute actions in pursuit of goals. It can change the state of the world, gather feedback, revise its plan, and continue acting.

An `Oracle AI` is a neighboring idea: a system whose main role is to answer questions.

The intuitive safety story is simple. If an AI cannot act, then it cannot directly seize resources, manipulate environments, launch attacks, or optimize the world in unwanted ways. It can only advise. Humans can check the advice.

Gwern's essay asks whether that division can survive contact with economics and machine learning.

## Why Tool AI Sounds Safer

Tool AI is attractive because it promises intelligence without autonomy.

Imagine a system that can:

- evaluate possible cancer drugs
- suggest a proof strategy
- rank military plans
- recommend routes through a city
- explain how to improve a company
- help design safer AI systems

If humans always inspect the output before acting, maybe the AI is powerful but boxed. It can be useful without becoming a dangerous optimizer.

This is especially tempting because many current AI systems look tool-like. A language model gives text. A classifier gives labels. A route planner gives directions. A search engine gives links. The human seems to remain in charge.

Gwern's reply is not that tools are useless. The reply is that the tool boundary is weak. Once a tool is good enough, valuable enough, and used repeatedly enough, the surrounding human and institutional system begins to route action through it.

## The Economic Pressure Toward Agents

The first pressure is economic.

Users usually do not want a recommendation for its own sake. They want an outcome:

- not "which stock should I buy?" but profit
- not "what is the route?" but arrival
- not "what is the best chess move?" but a win
- not "what is the enemy doing?" but successful action
- not "what code might fix this?" but a working system

If the AI does most of the valuable work and the human only approves, the human approval step becomes a bottleneck. It adds latency, cost, inconsistency, and error.

Gwern connects this to Amdahl's law. When one part of a process becomes extremely fast, the slow remaining part dominates total performance. If AI can perform analysis in milliseconds but human approval takes minutes, hours, or days, the system is no longer constrained by intelligence. It is constrained by the human checkpoint.

In competitive settings, that checkpoint becomes expensive. A high-frequency trading system cannot afford slow approval. A military system may not want to wait for a human when rivals automate. A logistics system may be too large for meaningful human review of every decision. A coding agent may become more useful when it can run tests, inspect errors, and patch directly.

There is also a human-factors problem. If the AI is usually right, humans start rubber-stamping. If the AI is too complex for humans to verify, approval becomes ceremonial. If the human mostly watches automation, the human may become deskilled and less able to intervene when something unusual happens.

So toolness does not automatically preserve control. It may simply hide a growing dependence on the system's recommendations.

## The Deeper Claim: Agency Helps Intelligence

The more important part of the essay is not just "people will prefer agents." It is that agency can make systems smarter.

At first this sounds wrong. We usually think of intelligence first, agency second. A model becomes intelligent, then it uses that intelligence to act.

Gwern pushes the causal arrow both ways. Action helps produce intelligence because learning is full of choices.

A system must decide:

- what part of the input to inspect
- how many compute steps to spend
- what memory to retrieve
- what examples to train on
- what labels to request
- what experiment to run
- what architecture to try
- what reward signal to optimize
- what long-horizon path is worth exploring

These are decisions. If a system can make them adaptively, it can learn and infer more efficiently than a passive system locked to a fixed dataset and fixed computation policy.

This is why Gwern says hard problems tend to become reinforcement-learning problems. He does not mean RL is magically easy. He means that when a system must control a complex process under uncertainty, it needs feedback from action.

## Action Inside Computation

Agency is not limited to moving a robot arm or clicking a button. It can appear inside a single forward pass.

Attention is the simplest example. A model chooses which parts of an input to focus on. In language, it may attend to the relevant earlier words. In vision, it may focus on a small ambiguous region. In memory systems, it may query an external store.

Adaptive computation is another example. Some problems are easy and deserve little compute. Others are hard and deserve more. A fixed tool applies the same computation schedule everywhere. A more agentic system can decide when to continue reasoning, when to stop, and where to spend effort.

Tool use and retrieval fit the same pattern. A model can decide:

- whether to search
- which query to make
- which result to inspect
- whether to call code
- which intermediate result to preserve
- when to return an answer

Modern LLM systems make this feel obvious. A "chatbot" that searches the web, runs Python, opens files, calls APIs, and revises its answer is no longer merely mapping input text to output text. It is acting inside an information environment.

## Action Inside Training And Data Collection

Training also contains action-like choices.

A learner can choose which minibatches to train on, which examples deserve more weight, which learning rate to use, how aggressively to update different parameters, and which failures should be revisited.

Data selection is even clearer. Not all examples are equally valuable. If a model already understands common cases, another thousand common cases may add little. One rare, informative, boundary-defining example may teach far more.

This is the point of active learning. Instead of passively accepting random data, a learner asks for labels or examples that reduce uncertainty. Statistical experimental design makes a similar point: carefully chosen observations can be much more informative than randomly gathered observations.

For AI safety, this matters because many dangerous failures live off-distribution. Human-generated datasets often omit states that humans avoid: catastrophic mistakes, weird edge cases, adversarial scenarios, and unlikely chains of events. A passive tool trained only on routine behavior can look safe because it has never had to understand danger.

An agent can explore those edges. That exploration is risky, but it can also reveal the holes that passive learning hides.

## Action Inside Architecture Search

The same argument moves up a level.

A human-designed model contains many choices:

- architecture
- depth
- width
- attention pattern
- learning-rate schedule
- optimizer
- activation function
- regularization
- data mixture
- inference-time compute policy
- hardware placement

If these choices matter, then search over them matters. Hyperparameter optimization, neural architecture search, learned optimizers, compiler tuning, and automated ML all turn model design into an action problem.

This is one of Gwern's most forward-looking points. If a system can learn how to design better systems, then the difference between "tool" and "agent" becomes harder to preserve. The tool is no longer only answering a question. It is participating in a search process that changes future learners.

In modern terms, this shows up in automated eval-driven development, reinforcement learning from feedback, self-play, synthetic data generation, test-time search, and agents that improve code or experiments through repeated trial and error.

## Action In The World

The clearest form of agency is external action.

Gwern's central example is AlphaGo. Supervised learning from human games produced a useful Go model, but self-play produced the larger jump. The system could explore positions beyond the human dataset and optimize for winning rather than merely imitating human moves.

The lesson generalizes. If the world gives feedback, an agent can use that feedback to move into informative states. A robot trying random arm movements may almost never see success. A better exploring agent can test promising motions, learn from partial success, and improve.

Sparse rewards make passive data especially weak. If reward appears only after a long sequence of correct actions, random static data may contain almost no useful examples. Action lets the learner steer toward the tiny part of the space where learning signal exists.

This is why Gwern thinks tool systems will often be weaker on difficult real-world tasks. They do not get to create the experiences they need.

## Why More Data Is Not Always Enough

One of the essay's most useful ideas is:

`You need the right data, not just more data.`

If a dataset already contains many easy examples, adding more easy examples may do little. The model needs cases near decision boundaries, rare cases, adversarial cases, high-value uncertainty, and trajectories that reveal long-term consequences.

Tool AI relies heavily on the dataset it is given. Agent AI can change the dataset by acting, querying, searching, experimenting, and sampling adaptively.

This does not mean agency is free. Exploration can be dangerous. RL can be sample-inefficient. Agents can optimize the wrong reward. But if the important evidence is not present in static data, a passive tool has no magic way to recover it.

## What This Means For Modern AI Systems

The essay was written before today's agentic LLM boom, but it maps cleanly onto current systems.

Modern "tools" increasingly include:

- retrieval
- web browsing
- code execution
- long context
- memory
- test-time reasoning
- planning loops
- tool calling
- eval-driven iteration
- RLHF and preference learning
- self-play and synthetic data
- agents that inspect, edit, and verify work

That does not make every AI system a dangerous autonomous agent. But it does mean that the tool-agent boundary is no longer clean.

For example, a coding assistant that only suggests patches is tool-like. A coding assistant that edits files, runs tests, observes failures, updates its plan, and pushes a branch is more agentic. The value comes from exactly the feedback loop that makes it less tool-like.

The same pattern appears in research agents, data-analysis agents, autonomous web agents, robotics, theorem proving, and AI systems that improve AI systems.

Gwern's warning is that safety strategies should not assume the world will voluntarily stay at the tool-like point if agentic systems are faster, cheaper, more capable, and more profitable.

## Caveats And Critique

The essay is a broad argument, not a formal proof.

Several caveats matter.

First, agency can be expensive. RL and open-ended exploration can require huge amounts of data, compute, and engineering. In some domains, a passive model plus human judgment may remain cheaper and safer.

Second, regulation and liability can slow adoption. Markets do not automatically remove every human checkpoint, especially where failures are visible, catastrophic, or legally sensitive.

Third, tool-like systems can be extremely useful. Search engines, compilers, static analyzers, theorem provers, diagnostic tools, and supervised models can create value without full autonomy.

Fourth, agentic systems create their own risks: reward hacking, deception, unsafe exploration, over-optimization, security vulnerabilities, and accountability failures.

So the lesson is not "make everything an agent." The lesson is that "just keep AI as a tool" is not a stable enough safety plan by itself. If agency improves performance and economic value, safety has to handle agency directly.

## Memory Checklist

Remember these points:

1. Tool AI advises; Agent AI acts.
2. Tool AI sounds safer because humans remain responsible for action.
3. Gwern argues the tool boundary is economically unstable because humans become bottlenecks.
4. The deeper claim is technical: action and feedback improve intelligence itself.
5. Agency can appear inside computation, training, data selection, model design, and real-world exploration.
6. Active learning shows why the right data can matter more than more data.
7. Static human data can hide rare, dangerous, off-distribution cases.
8. Agentic systems can often imitate tools by choosing not to act, but tools cannot always imitate the benefits of action.
9. The safety lesson is to build oversight for agentic systems, not to assume toolness will remain the default.

The shortest version:

**Tool AI is appealing because it seems safer, but Gwern argues that economic pressure and the intelligence benefits of action push powerful systems toward agency.**
