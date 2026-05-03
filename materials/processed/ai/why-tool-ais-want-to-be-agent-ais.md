# Why Tool AIs Want to Be Agent AIs

Source: `https://gwern.net/tool-ai`
Author: `Gwern Branwen`
Site: `Gwern.net`
Published: `2016-09-07`
Finished / last dated by source: `2018-08-28`
Accessed: `2026-05-03`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and AI-safety / AI-economics normalization`

## Summary

Gwern argues that restricting advanced AI systems to "tool" status is an unstable safety strategy. A Tool AI gives advice, predictions, classifications, or plans, while humans decide whether to act. An Agent AI can select and execute actions in pursuit of goals. The safety appeal of Tool AI is clear: if the system cannot act, then harmful action seems to require a human intermediary.

The essay's thesis is that this boundary will not hold. Agent AIs will tend to beat Tool AIs on two dimensions:

1. They are more economically useful because users, firms, and militaries often want outcomes rather than advice.
2. They are likely to become more intelligent because action, feedback, search, and adaptive control improve inference, training, data collection, architecture design, and real-world performance.

The slogan is not merely that people like automation. It is that the techniques that make systems better at acting also make them better at thinking. Once a system can choose what to inspect, what data to collect, how long to compute, what memory to query, what experiment to run, what architecture to try, or how to revise itself, it gains advantages that a fixed, passive predictor lacks.

## The Tool AI Proposal

The Tool AI proposal says that AI systems can be powerful without being autonomous agents. A model can evaluate options, rank plans, classify images, recommend drugs, answer questions, or advise a human, while humans retain final authority over action.

This proposal tries to preserve the benefits of intelligence while avoiding the risks of agency. A route planner gives directions without driving the car. A medical predictor ranks candidate drugs without running the trial. A model might help design safer AI without itself becoming a self-directed actor.

Gwern treats this as a serious idea, but argues that its stability has been overstated.

## Tool AI, Oracle AI, And Agent AI

The essay distinguishes three nearby ideas:

- `Oracle AI`: a system that answers questions.
- `Tool AI`: a system that computes, ranks, or explains candidate actions while leaving execution to humans.
- `Agent AI`: a system that selects and executes actions, often using reinforcement learning or other feedback-driven optimization.

The critical boundary is not whether the system has a body. The boundary is whether it can choose actions that influence later information, rewards, costs, data, or world states.

Gwern's key move is to weaken the sharp boundary between tool and agent. A system can be agent-like inside its computation, inside its training loop, inside its data pipeline, or through its users. Even a nominally passive system can become part of an action loop once humans repeatedly implement its outputs.

## The Economic Argument

The most straightforward reason agents win is economic pressure.

Many users do not actually want advice. They want results:

- not a stock recommendation, but profit
- not a route suggestion, but arrival at the destination
- not a drone report, but a completed military objective
- not a classification, but a decision that saves cost, time, or risk

If a human approval step is slow, costly, or error-prone, it becomes a bottleneck. Gwern uses the logic of Amdahl's law: once the AI-automated parts of a process improve, the remaining human step dominates the total system. At that point, removing or automating the human step becomes economically attractive.

This is not limited to speed. Humans also make mistakes, fatigue, miss rare problems, and become deskilled when they mostly rubber-stamp automated outputs. Over time, the human-in-the-loop can become less of a genuine safety layer and more of a ritualized approval step.

The essay's examples include high-frequency trading, aircraft automation, advanced chess, traffic routing, and military drones. The common pattern is that once a system is valuable enough, the pressure to move from advice to action grows.

## The Intelligence Argument

Gwern's deeper claim is that agents are not merely better at doing things after intelligence has been produced. Agency can help produce intelligence.

The reason is that many hard problems are really decision problems. A system must decide:

- which part of the input deserves attention
- how much computation to spend
- which memory or external resource to query
- which data points to train on
- which new data to acquire
- which hyperparameters or architectures to test
- which experiment to run next
- which long-horizon trajectory is worth exploring

A Tool AI fixed to a static dataset and fixed computation policy can still be useful. But an Agent AI can adapt its own learning and inference process. It can decide where information is valuable, how to reduce uncertainty, and how to sample the world more efficiently.

Gwern summarizes this as a broad reinforcement-learning intuition: RL is often hard and inefficient from scratch, but whenever control of a complex system matters, feedback-driven action becomes the least bad general method.

## Kinds Of "Action" Inside Intelligence

The essay gives a taxonomy of action-like behavior inside machine learning systems.

### Actions inside a computation

Models can choose what to attend to, how long to compute, what intermediate state to preserve, what memory to query, and whether to use external tools or specialized submodules.

Examples include attention mechanisms, adaptive computation, memory-augmented neural networks, mixture-of-experts routing, beam search, tree search, and generation strategies optimized for global rewards rather than only next-token likelihood.

The key point is that even inference can contain choices.

### Actions inside training

Training itself includes decisions: minibatch selection, learning-rate schedules, parameter-specific update rules, hard-negative mining, priority sampling, learned optimizers, and other techniques that alter how learning unfolds.

This makes the training loop partly agentic. The system or its meta-controller is not only fitting a function; it is choosing how to learn.

### Actions inside data selection

Not all data is equally useful. Active learning, optimal experimental design, dataset distillation, adaptive trials, and targeted search for informative examples can dramatically reduce wasted samples.

Gwern's practical point is that more data is not always the answer. Often the right data matters more than additional random data.

### Actions inside model design

Architecture search, hyperparameter optimization, learned activation functions, compiler tuning, systems optimization, and automated ML all push the same idea one level higher. Instead of hand-designing the learner, an optimization process searches for better learners.

This is "meta-learning" in the broad sense: the system improves the process that produces systems.

### Actions in the outside environment

Finally, agents can act in the world: self-play, robotics, simulation, scientific experimentation, user feedback loops, and reinforcement learning from real rewards.

AlphaGo is the clean example in the essay. Supervised learning from human Go games was useful, but self-play produced the leap to superhuman performance because the system could explore positions human data did not cover.

## Why Static Data Can Be Dangerous

One important safety implication is that a non-agentic model can be "safe" in one narrow sense and unsafe in another.

If it is trained only on routine human data, it may never see the catastrophic edge cases humans avoid. That can make it brittle exactly where reliability matters most. A passive predictor may look calm because its training distribution is calm, not because it understands danger.

Agentic exploration exposes holes in a model's understanding. It can be dangerous, but it can also reveal failures that a static dataset hides.

This creates a difficult tradeoff:

- agency introduces new risks
- lack of agency can create shallow competence and hidden brittleness

## Main Takeaways

- Tool AI is appealing because it seems to keep humans in control.
- Gwern argues that this is an unstable equilibrium.
- Economic competition pushes toward automation because humans become bottlenecks.
- Technical progress also pushes toward agency because action improves learning, inference, search, data selection, training, architecture design, and real-world exploration.
- Agent AIs can often simulate Tool AIs by choosing not to act, while Tool AIs cannot always simulate the benefits of action.
- The line between tool and agent is blurrier than it first appears.
- Human approval is not automatically meaningful oversight; it can degrade into rubber-stamping.
- A static, passive model can be brittle because it lacks access to informative feedback and rare states.

## Caveats

The essay is partly an argument from trends and abstractions rather than a formal theorem. It does not prove that every domain will favor agents, or that every RL-style method will be efficient. It also predates several modern developments in LLMs, tool use, RLHF, reasoning models, and agent scaffolds.

Still, the argument has aged well in one important respect: modern AI systems increasingly mix prediction with tool use, retrieval, code execution, long-horizon workflows, preference learning, self-play, search, and automated evaluation. The clean "tool versus agent" boundary is harder to maintain than it looked in early AI-safety debates.

## Questions For Review

1. What is the difference between Tool AI, Oracle AI, and Agent AI?
2. Why does Gwern think human-in-the-loop oversight can become economically unstable?
3. How can agency improve inference, not just action?
4. Why does active learning matter for the Tool AI debate?
5. How can a model be safer in the sense of not acting, but more dangerous in the sense of being brittle?
6. What parts of modern LLM systems already blur the tool-agent boundary?
