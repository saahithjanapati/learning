# Andrej Karpathy Sequoia Talk: From Vibe Coding To Agentic Engineering

Source: `https://www.youtube.com/watch?v=96jN2OCOfLs`
Title: `Andrej Karpathy: From Vibe Coding to Agentic Engineering`
Speaker: `Andrej Karpathy`
Interviewer: `Stephanie Zhan, Sequoia Capital`
Channel: `Sequoia Capital`
Event context: `AI Ascent 2026`
Published: `2026-04-29`
Duration: `29:49`
Ingested: `2026-05-04`
Extraction engine: `yt-dlp metadata + YouTube English auto-captions + manual cleanup into transcript digest`
Local raw assets: `materials/inbox/youtube-96jN2OCOfLs/` (ignored by git)

## Summary

In this Sequoia AI Ascent conversation, Andrej Karpathy explains why the jump from ordinary AI coding assistance to "vibe coding" felt abrupt, why he now prefers the more serious framing of `agentic engineering`, and how Software 3.0 changes what it means to build software.

The core argument is that LLMs are not merely faster tools inside the old software paradigm. They are a new kind of programmable computer. In Software 1.0, people write explicit code. In Software 2.0, people program by constructing datasets, objectives, and neural networks. In Software 3.0, people program by arranging prompts, context, examples, tools, and environments around a general-purpose neural interpreter.

Karpathy's strongest practical message is that agentic engineering is about preserving professional quality while using agents for speed. Vibe coding raises the floor: many more people can make software. Agentic engineering raises the ceiling: strong builders can coordinate agents, keep taste and design control, build larger systems, and maintain security and correctness.

## Extraction Notes

- Downloaded YouTube metadata and English auto-captions with `yt-dlp`.
- Preserved the raw `.vtt` caption files locally under `materials/inbox/youtube-96jN2OCOfLs/`.
- Raw caption files are kept local and are not intended for git.
- This processed note is a structured transcript digest, not a verbatim transcript.
- The auto-captions contain ordinary recognition errors around product names, filler words, and repeated caption fragments, so the wording below normalizes obvious caption artifacts.

## YouTube Chapter Map

| Time | Chapter | Main Topic |
| --- | --- | --- |
| 00:00-00:44 | Introduction | Karpathy's OpenAI, Tesla, Eureka Labs, and "vibe coding" context. |
| 00:44-02:28 | Feeling Behind as a Coder | The December 2025 shift where agentic coding tools began producing much larger useful chunks. |
| 02:28-03:44 | Software 3.0 Explained | Software 3.0 as programming by context and prompt over an LLM interpreter. |
| 03:44-04:49 | Agents as the Installer | The OpenClaw installer as a Software 3.0 artifact: text for an agent instead of a brittle shell script. |
| 04:49-07:37 | Menu Gen vs Raw Prompts | A concrete example where an app becomes unnecessary because the model can operate directly on raw inputs and outputs. |
| 07:37-09:41 | What's Obvious by 2026 | Neural nets may become the host process, with classical tools as co-processors. |
| 09:41-13:39 | Verifiability and Jagged Skills | Models peak in domains where labs can provide verifiable reward and training focus. |
| 13:39-15:46 | Founder Advice and Automation | Founders can exploit verifiable domains even if labs have not fully focused on them. |
| 15:46-25:17 | From Vibe Coding to Agent Engineering | Vibe coding raises the floor; agentic engineering preserves quality and rewards taste, specs, and oversight. |
| 25:17-29:49 | Agents Everywhere and Learning | Agent-native infrastructure, sensors/actuators, and why understanding remains non-outsourceable. |

## Transcript Digest

### 00:00-00:44 - Introduction

Stephanie Zhan introduces Karpathy as someone who helped build modern AI, explain modern AI, and rename modern AI. The framing ties together his OpenAI co-founding history, Tesla Autopilot work, Eureka Labs, and the phrase `vibe coding`.

The first question starts from a recent Karpathy remark: he has never felt more behind as a programmer. Zhan asks whether that feeling is exhilarating, unsettling, or both.

### 00:44-02:28 - Feeling Behind As A Coder

Karpathy says the feeling is both exciting and unsettling. He had been using agentic coding tools for roughly a year. Earlier versions were helpful, but still required correction: the agent could produce chunks of code, but he often had to edit or steer them.

Around December, he noticed a sharp transition. The chunks started coming out correctly. He kept asking for more, and the system kept producing usable work. The need for correction dropped enough that he began trusting the system more.

That transition is what pushed him into frequent vibe coding and a large number of side projects. The important point is that people who formed their opinion of AI coding tools before that jump needed to look again. The agentic workflow had become qualitatively different.

### 02:28-03:44 - Software 3.0 Explained

Karpathy restates his Software 1.0, 2.0, and 3.0 framework.

Software 1.0 is ordinary explicit code. Humans write instructions directly.

Software 2.0 is neural-network programming. Humans assemble datasets, objectives, model architectures, and training procedures. The learned weights become the program.

Software 3.0 appears when large language models become general-purpose programmable computers. The programmer's lever is no longer only source code or training data; it is the context window. Prompts, examples, documents, tool descriptions, images, and environment state become the program that an LLM interpreter executes over digital information.

### 03:44-04:49 - Agents As The Installer

Karpathy gives an example from `OpenClaw`. In the old paradigm, installing a cross-platform tool usually requires a shell script. Those scripts often become brittle because they must handle many operating systems, machine states, and edge cases.

The Software 3.0 version is different: instead of giving the user a complex installer script, the project can give the user a block of text to paste into an agent. The agent reads the environment, reasons through the setup, takes actions, debugs failures, and adapts.

The point is not that shell scripts disappear everywhere. The point is that agent instructions can sometimes replace brittle explicit automation because the agent brings intelligence and feedback into the installation loop.

### 04:49-07:37 - Menu Gen And Raw Prompts

Karpathy describes building `Menu Gen`, a vibe-coded app that takes a restaurant menu photo and generates pictures for menu items. The app OCRs menu titles, calls an image generator, and re-renders the menu with generated images.

Then he describes a more extreme Software 3.0 version: take the photo, give it directly to Gemini, and ask it to use an image model to overlay generated dish images onto the original menu. In that version, much of the app becomes unnecessary. The neural model consumes the raw image and emits another raw image.

This changed his understanding of what builders should ask. The opportunity is not merely to speed up existing apps. It is to notice when an app is a leftover artifact of the old paradigm. Sometimes the new system can operate directly on messy inputs and outputs that old code could not handle.

He extends the point beyond coding. Software 3.0 automates general information processing, not only programming. For example, LLMs can recompile a collection of documents into an internal wiki or knowledge base. That is not just a faster old program; it is a capability that was not meaningfully available before.

### 07:37-09:41 - What's Obvious By 2026

Asked what will later look obvious in hindsight, Karpathy speculates that many future systems may be more neural than classical. Instead of writing code around structured data, builders may feed raw video, audio, images, and context into neural systems that generate the right interface or action for that moment.

He compares this to an alternate computing history. Classical computers won the first era, with neural nets now running inside them. But over time, neural networks may become the main host process, with CPUs and deterministic tools serving as co-processors for exact subtasks.

Tool use, in this framing, is not the whole system. It may become a historical appendage for deterministic work while neural computation does most of the heavy lifting.

### 09:41-13:39 - Verifiability And Jagged Skills

Karpathy explains verifiability as a key reason AI automates some domains faster than others. Traditional computers automate what can be specified in code. Modern LLMs automate what can be verified, because frontier labs train them in reinforcement-learning environments with reward signals.

This creates jagged intelligence. Models become excellent in domains where labs can create many verifiable tasks and care enough to train on them, such as math, code, and adjacent areas. They can remain surprisingly weak on simple-seeming tasks outside those training circuits.

He uses the familiar "letters in strawberry" issue as one historical example of jaggedness, then gives a newer style of example: a model that can refactor a huge codebase or find vulnerabilities may still give absurd advice about whether to walk or drive to a car wash when the whole point is to wash the car.

The lesson is that users must explore the model they have. There is no full manual. If a task lies inside the circuits the labs trained hard, the model may fly. If it lies outside them, it may struggle, and builders may need fine-tuning, custom environments, or more direct work.

### 13:39-15:46 - Founder Advice And Automation

For founders, verifiability can still be an opportunity even when the major labs are not focused on a niche. If a domain has verifiable outcomes and a founder can construct diverse environments or examples, then fine-tuning and reinforcement learning may work well.

Karpathy avoids naming a specific opportunity, but the general advice is clear: look for valuable domains where feedback can be checked, but where the frontier labs have not yet concentrated their training distribution.

When asked what only looks automatable from a distance, he says almost everything may eventually be made verifiable to some degree. Some domains are easier than others. Even writing might be approximated with panels of LLM judges. The boundary is not automatable versus not automatable; it is easy to verify versus hard to verify.

### 15:46-17:08 - Vibe Coding Versus Agentic Engineering

Karpathy distinguishes vibe coding from agentic engineering.

Vibe coding raises the floor. More people can make software, prototype, and create useful things because agents can fill in details.

Agentic engineering preserves the professional quality bar. It asks how expert builders can use agents to move faster without creating security holes, brittle abstractions, bad architecture, or unmaintainable code.

He describes agents as powerful but spiky and stochastic. Coordinating them well is an engineering discipline. The upside may be much larger than the old "10x engineer" framing, because strong agentic engineers can coordinate many more useful units of work.

### 17:08-19:40 - What AI-Native Coding Looks Like

Karpathy says AI-native engineers will invest deeply in their setup, just as earlier engineers optimized their editor, shell, and workflow. In the current era, that means learning the available agent features, shaping prompts and context, and building an environment where agents can do large useful work.

He also argues that hiring should change. A coding interview based on small puzzles is still from the old paradigm. To evaluate agentic engineering, give someone a large project and watch them build it with agents. Then stress-test it with other agents that try to break it.

The point is to evaluate whether the candidate can direct agents toward robust, secure, well-designed outcomes, not whether they can solve toy problems without help.

### 19:40-22:22 - Human Skill: Taste, Specs, And Oversight

Karpathy says current agents still resemble interns. They are useful, but humans remain responsible for taste, judgment, design, specification, and oversight.

He gives a bug from a side project involving Google login and Stripe credits. The agent tried to associate funds by matching email addresses across systems. That was a bad design because users can use different emails for Google and Stripe. The system needed a persistent user ID.

This is the kind of mistake agents still make. They can fill in many implementation details, but the human must own the specification, high-level categories, invariants, and design constraints.

He says people can now forget some API trivia. Details like tensor API naming differences across libraries can be delegated. But builders still need fundamentals, such as understanding views versus copies, memory movement, and performance implications. The surface details are easier to outsource; the underlying model of the system still matters.

### 22:22-25:17 - Taste May Improve, But It Is Still Weak

Karpathy hopes model taste and code quality improve, but he says current models still often write bloated, copy-pasted, awkward, brittle code. The code can work while still being aesthetically and architecturally bad.

He uses his `microGPT` simplification project as an example of being outside the model's reinforcement-learning circuits. When he asks models to simplify further and further, they struggle. They do not naturally converge toward the clean minimal form he wants.

His conclusion is that nothing fundamental prevents models from improving at taste and simplicity, but current labs have not solved it yet. For now, humans still need to be in charge of those judgments.

### 23:18-25:17 - Animals Versus Ghosts

Karpathy discusses his "animals versus ghosts" framing. He does not think LLMs should be understood as animal-like intelligences with intrinsic motivation, curiosity, fun, or empowerment shaped by evolution.

Instead, he calls them ghost-like: statistical simulations shaped by pretraining and reinforced into jagged capabilities by reward functions. They are summoned into behavior by context and prompt rather than driven by inner animal needs.

He presents this as a mental model, not a complete engineering recipe. The value is that it makes users suspicious in the right way. If the model is a jagged statistical entity rather than a motivated animal, then trust, evaluation, and deployment have to be based on observed behavior, training distribution, and environment design.

### 25:17-27:30 - Agents Everywhere And Agent-Native Infrastructure

Karpathy says much of today's infrastructure is still written for humans. Documentation tells humans which buttons to click, which URL to visit, and what manual settings to adjust. That is increasingly frustrating when the real desired user is an agent.

He wants infrastructure that describes work to agents first. In this agent-native world, systems expose sensors over the world, actuators over the world, and data structures that are legible to LLMs.

He gives deployment as an example. For Menu Gen, writing the app was less painful than wiring up services, settings, DNS, deployment, and accounts. A better future system would let him prompt an agent to build and deploy the whole thing without touching those manual surfaces.

He expects more agent representation for people and organizations: agents negotiating, coordinating, scheduling, and handling operational details on behalf of humans.

### 27:30-29:49 - Education And Understanding

The final question is about what remains worth learning when intelligence becomes cheap.

Karpathy cites the idea that you can outsource your thinking, but you cannot outsource your understanding. He still needs information to enter his own brain because he remains part of the control loop. He needs to know what is being built, why it matters, and how to direct agents.

This connects to his interest in LLM-generated knowledge bases. Reframing information into wikis, projections, and question-answerable structures helps him understand. The models can process and reformat information, but the human still needs enough understanding to direct the process.

The final educational lesson is that cheap intelligence does not eliminate learning. It changes the purpose of learning: understanding becomes the thing that lets a person direct agents well.

## Key Ideas To Remember

1. Vibe coding became qualitatively different when agents started producing larger coherent chunks without constant correction.
2. Software 3.0 means programming through prompts, context, tools, and examples over an LLM interpreter.
3. Some old apps are artifacts of the pre-LLM world; models can sometimes operate directly on raw inputs and outputs.
4. LLMs automate what can be verified, not only what can be specified.
5. Models are jagged because labs train hardest on domains with verifiable rewards and economic value.
6. Founders should look for valuable verifiable domains that labs have not fully trained into.
7. Vibe coding raises the floor; agentic engineering preserves the professional quality bar while increasing speed.
8. Strong agentic engineers need taste, design judgment, strong specs, and oversight.
9. Agentic hiring should test large-project execution with agents, not only puzzle solving.
10. Current agents still make design mistakes around identity, state, permissions, abstraction, and simplicity.
11. Agent-native infrastructure should expose instructions, tools, sensors, actuators, and data structures for agents first.
12. You can outsource thinking-like processing, but you still cannot outsource understanding.

## Follow-Up Questions

- Which current products are like Menu Gen: useful in the old paradigm, but unnecessary in a direct Software 3.0 workflow?
- What makes a domain verifiable enough for custom reinforcement learning?
- How should a team test whether it is inside or outside a model's trained capability circuits?
- What should an agentic-engineering interview look like for real production systems?
- Which details can engineers safely forget, and which fundamentals must they understand more deeply?
- What would documentation look like if it were written for agents first and humans second?
- How should education change if the learner's main job is to direct agents with understanding?

## One-Sentence Takeaway

Karpathy argues that the serious successor to vibe coding is agentic engineering: using Software 3.0 systems to move much faster while preserving human taste, specifications, oversight, and understanding.
