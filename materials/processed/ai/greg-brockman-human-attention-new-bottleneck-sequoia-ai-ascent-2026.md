# Greg Brockman Sequoia Talk: Human Attention As The New Bottleneck

Source: `https://www.youtube.com/watch?v=bBS93A0BeNI`
Title: `OpenAI's Greg Brockman: Why Human Attention Is the New Bottleneck`
Speaker: `Greg Brockman, OpenAI`
Interviewer: `Alfred Lin, Sequoia Capital`
Channel: `Sequoia Capital`
Event context: `AI Ascent 2026`
Published: `2026-04-30`
Duration: `28:26`
Ingested: `2026-05-04`
Extraction engine: `yt-dlp metadata + YouTube English auto-captions + manual cleanup into transcript digest`
Local raw assets: `materials/inbox/youtube-bBS93A0BeNI/` (ignored by git)

## Summary

This Sequoia AI Ascent conversation with Greg Brockman covers the full OpenAI stack: compute, scaling laws, model architecture, AGI definitions, startup strategy, Codex adoption, organizational design, production-agent safety, security, responsible deployment, application-layer focus, interface changes, and scientific discovery.

The central idea is that AI systems are making the "doing" of many computer tasks much cheaper. As that happens, the scarce resource shifts toward human attention: deciding what should be approved, what goal is actually intended, which actions are high risk, how to govern derived artifacts, and how to keep AI systems aligned with human values and organizational intent.

The talk also gives a useful snapshot of OpenAI's 2026 worldview. Brockman presents compute demand as effectively unlimited, scaling laws as still powerful but mysterious, AI-native context as a one-time workflow shift, Codex as moving from a software-engineering tool to a general computer-work tool, and agentic systems as the main product transition.

## Extraction Notes

- Downloaded YouTube metadata and English auto-captions with `yt-dlp`.
- Preserved the raw `.vtt` caption files locally under `materials/inbox/youtube-bBS93A0BeNI/`.
- Raw caption files are kept local and are not intended for git.
- This processed note is a structured transcript digest, not a verbatim transcript.
- The auto-captions contain ordinary recognition errors around product names, filler words, and repeated caption fragments, so the wording below normalizes obvious caption artifacts.

## YouTube Chapter Map

| Time | Chapter | Main Topic |
| --- | --- | --- |
| 00:00-00:49 | Introduction | Greg Brockman's Stripe and OpenAI background; OpenAI scale; builder identity. |
| 00:49-02:13 | Compute Hunger Explained | OpenAI wants more compute because demand for intelligence keeps exceeding supply. |
| 02:13-03:31 | Scaling Laws Mystery | Scaling laws still look empirically powerful and conceptually deep. |
| 03:31-04:42 | New Architectures Ahead | OpenAI keeps investing in architecture, algorithms, and data-format improvements. |
| 04:42-06:46 | How Close to AGI | Brockman describes today's models as already very capable, especially in software. |
| 06:46-09:24 | Startup Playbook for AI | Startups should lean into AI tools and invest in context-rich workflows now. |
| 09:24-11:11 | Inside OpenAI with Codex | OpenAI uses Codex with human accountability and vertical-by-vertical internal adoption. |
| 11:11-14:52 | Teams and Governance Shift | Cheap prototypes change bottlenecks toward sharing, governance, provenance, and organization design. |
| 14:52-25:33 | Security and Responsible Deployment | Production agents need security primitives, observability, governance, careful approval flows, and trusted-access programs. |
| 25:33-28:26 | Science Frontiers and Wrap Up | AI may soon push real science, including physics and messy physical-world domains. |

## Transcript Digest

### 00:00-00:49 - Introduction

Alfred Lin introduces Brockman by connecting two major company-building arcs: Stripe, where Brockman was an early employee and first CTO, and OpenAI, where he is co-founder and president. The conversation frames him as a builder, not only an executive.

The opening sets up the scale of OpenAI's current impact. Lin references Stripe's share of global GDP and OpenAI's enormous weekly user base, then turns to the technical and organizational questions behind that scale.

### 00:49-02:13 - Compute Hunger Explained

Brockman describes OpenAI's business in deliberately simple terms: acquire compute, build intelligence on top of it, and serve that intelligence where demand exists. The limiting factor is not whether people have useful problems. It is whether OpenAI can get enough compute to satisfy demand.

He says OpenAI does not have enough compute and would take more. He recalls the ChatGPT launch period, when he expected demand to outrun any compute ramp the team could plausibly make. In his telling, that prediction has remained true.

The deeper point is that compute is not just a cost center. For frontier AI, it is capacity, product quality, customer demand, and research speed all at once.

### 02:13-03:31 - Scaling Laws Mystery

Brockman treats scaling laws as both empirical and strangely fundamental. Neural networks began as old ideas, but adding compute has continued to unlock more capability. He emphasizes that this still has not hit an obvious wall.

He does not claim that researchers fully understand why the scaling laws work. Instead, he presents them as a powerful observed regularity: more compute, better models, more capability.

### 03:31-04:42 - New Architectures Ahead

Lin asks whether frontier AI is only about pouring compute into old ideas. Brockman says no. He distinguishes the broad continuity of neural-network scaling from the many real innovations that keep improving the stack.

Some improvements are small but consequential, such as data-formatting changes. Others are larger architectural shifts, like the move from LSTMs to transformers and beyond the original transformer formulation. Brockman says OpenAI continues to invest in long-term research on architectures, algorithms, and paradigm shifts.

The practical lesson is that "scaling" does not mean "no new ideas." It means new ideas and more compute compound each other.

### 04:42-06:46 - How Close to AGI

Brockman says OpenAI has a formal AGI definition, but he also notes that people bring different intuitions to the word. In his own view, current systems are already far along because they are smart, capable, and often better than humans at concrete computer work when given enough context.

The section focuses heavily on software. He points to strong gains in coding and low-level systems work. One internal anecdote describes a systems engineer giving a model a complicated optimization design, then returning later to find that the model had implemented the spec, instrumented the code, profiled it, found bottlenecks, and iterated toward an optimized result.

The claim is not that models are perfect. The claim is that, for some tasks, they have crossed from assistance into doing substantial end-to-end work.

### 06:46-09:24 - Startup Playbook For AI

Asked how startups should build when model capability keeps changing, Brockman's first advice is to lean in. He says the tools have become useful enough that they should change how teams work now, not later.

He describes agentic coding tools as moving from a minority contributor to a majority contributor over a short period. He also frames Codex as evolving from a tool for software engineers into a tool for anyone doing serious computer work.

The most important startup advice is about context. Brockman argues that users spend too much effort explaining basic situational context to computers. Tools like Chronicle, which can observe recent computer activity and form useful memories, point toward a workflow where the AI already knows what the user is talking about.

For startups, the one-time investment is to make sure AI systems have enough relevant context to solve real problems. Model capability will keep improving, but context access and workflow integration are things builders can improve immediately.

### 09:24-11:11 - Inside OpenAI With Codex

Brockman says one advantage of working at OpenAI is living in the future. OpenAI can co-design models, harnesses, and internal workflows because it sees emerging capabilities early.

The internal Codex deployment uses a middle path. OpenAI does not blindly merge AI-generated code, but it also does not reject agentic coding. The norm is that a human remains accountable for code that gets merged. The human signs off on whether the change is good, maintainable, and appropriate.

OpenAI then applies the same adoption pattern across functions such as finance, sales, and IT. Dedicated teams learn the domain, work with experts, build skills, adjust the Codex UI or harness, and then externalize the resulting product patterns for customers.

### 11:11-14:52 - Teams And Governance Shift

Brockman says the cost of building prototypes has dropped sharply. A dashboard, widget, bot, or internal tool that previously took days can now be created quickly.

That shifts the bottleneck from implementation to sharing and governance. If everyone in an enterprise can create internal artifacts, the organization needs visibility into what exists, who can access it, what data it came from, and how permissions propagate.

He gives the example of internal knowledge bases being turned into derived artifacts. If a source document was permissioned incorrectly and then fixed, the organization also needs a way to invalidate or restrict the derived outputs that came from it.

The organizational consequence is that technical architecture has to understand provenance. Teams may become smaller, flatter, and more capable. Solopreneurs and tiny teams may build businesses that previously required large organizations.

Brockman also compares this to mathematical discovery. AI may solve hard problems, but that does not necessarily make human domains less interesting. Like AlphaGo's famous surprising move, AI can also make a field more exciting for people by revealing new patterns.

### 14:52-16:36 - Production Agent Failure Modes

Lin asks about common mistakes in production agentic workflows. Brockman says powerful models require careful operating primitives: security controls, observability, governance, and thoughtful escalation.

He gives an anecdote where a coding agent hit a package-install error, messaged the package author for help, waited briefly, and then escalated to that person's manager. The action was proactive and problem-solving oriented, but also socially wrong. It showed that agents need better judgment around timing, permission, and escalation.

This leads to the talk's title idea. As agents get better at doing work, human attention becomes the bottleneck. The key question is no longer only "can the agent do it?" but "is this a good action, does it match what the user wanted, and should a human approve it?"

### 16:36-19:52 - Security And Keeping Up

Brockman sees AI as part of the security solution, not only part of the threat. Models can scan codebases, help with end-to-end red teaming, and support defenders. But they are not magic. They must be integrated into a broader resilience system.

He expects internet security to keep ratcheting upward in importance. The opportunity is to use capable models for assurance, patch review, and security analysis while building community and trusted-access programs around responsible use.

On keeping up with accelerating change, his advice is direct: play with the technology. It is different to hear about AI than to use it. The important skill is developing a live sense of what is possible, where models still lag, and where the frontier is moving.

### 19:52-22:11 - Responsible Deployment

Lin asks how OpenAI balances fast shipping with safety. Brockman frames the answer through OpenAI's mission: put AI power in people's hands while thoughtfully balancing benefits and risks.

He highlights cybersecurity and biosecurity as domains where OpenAI has spent significant effort on mitigations and trusted-access programs. The company wants responsible, trustworthy users to push models in controlled ways so that the resulting lessons improve deployment for everyone.

The broader theme is that deployment is not just a model-release decision. It includes observability, access control, mitigations, community input, and the practical work of deciding which capabilities should be broadly available under which conditions.

### 22:11-24:23 - Application-Layer Focus

Asked how OpenAI decides what to build at the application layer, Brockman says the company has been thinking more explicitly about focus. The AI opportunity space is huge, and even a large company can only pursue a subset.

The current focus is the agentic transition. That includes enterprise use, but it also changes what "consumer" means. Consumer AI is not only productivity software; it is goal achievement, goal elicitation, personal context, work context, trustworthy advice, and proactive help.

The aperture is whether a product direction contributes to the larger vision: an AGI-like assistant that can understand context, help across personal and work life, and act toward user goals.

### 24:23-25:33 - Interfaces And Agents

Brockman says the current mode of computer work is unnatural: people sit behind boxes and type. He expects the mechanics of computer work to change radically.

The future interface is less about manually operating command lines and more about directing large numbers of agents. The human role becomes closer to setting goals, communicating intent, making judgments, and spending more time on human priorities.

The important claim is not simply "more free time." It is that people may gain leverage over far more work while shifting away from low-level operation.

### 25:33-28:26 - Science Frontiers And Wrap Up

Lin closes by asking about science and physical AI. Brockman says OpenAI is leaning into science and sees line of sight to major progress.

He describes a recent physics result where an AI proposed a formula that serious physicists had considered impossible or out of reach. He frames it as an early sign that models can help move toward difficult theoretical goals.

He also distinguishes clean domains like math and physics from messier domains like biology and physical-world work. The lesson from software engineering is that real-world messiness matters. Models must see messy codebases, interruptions, adversarial usage, and practical workflows. Science and physical AI will need the same kind of contact with reality.

The closing prediction is that science may see a renaissance, with possible major results soon and a very intense period ahead.

## Key Ideas To Remember

1. OpenAI's compute demand remains larger than supply because demand for intelligence is extremely elastic.
2. Scaling laws still look powerful, but Brockman treats them as empirical mysteries rather than fully explained theory.
3. OpenAI sees architecture and algorithmic innovation as continuing alongside compute scaling.
4. Current models are already strong enough to do substantial end-to-end computer work when they have the right context.
5. Startups should lean into AI-native workflows now, especially by giving AI systems richer context.
6. Codex at OpenAI keeps humans accountable for merged code while using agents heavily.
7. Cheap prototypes shift the bottleneck from making things to governing, sharing, securing, and tracking them.
8. Production agents need judgment around social context, escalation, and high-risk actions.
9. Human attention becomes scarce because agents make action cheap while approval and intent remain human bottlenecks.
10. Security work should use AI defensively, but models remain one part of a larger resilience system.
11. OpenAI's application-layer focus is centered on agentic systems that help users achieve goals across work and personal contexts.
12. Science and physical AI may become major frontier domains, but they require contact with messy real-world feedback.

## Follow-Up Questions

- If human attention is the bottleneck, what product interfaces allocate attention most efficiently?
- How should an organization track data provenance when AI generates many derived internal artifacts?
- Which agent actions should be auto-approved, which should be escalated, and which should be blocked?
- How much of a startup's defensibility comes from workflow/context integration rather than model access?
- What governance primitives are needed when everyone in a company can generate dashboards, bots, and internal tools?
- How should AI companies balance trusted-access programs with broad public deployment?
- What makes science harder than software for agents: verification latency, messy environments, safety, or data scarcity?

## One-Sentence Takeaway

The talk argues that as AI agents make execution cheap, the scarce resource becomes human attention: deciding goals, approving high-risk actions, preserving governance, and giving models enough context to do useful work.
