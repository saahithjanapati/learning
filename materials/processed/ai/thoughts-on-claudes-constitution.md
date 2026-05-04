# Thoughts on Claude's Constitution

Source: `https://windowsontheory.org/2026/01/27/thoughts-on-claudes-constitution/`
Site: `Windows On Theory`
Title: `Thoughts on Claude's Constitution`
Author: `Boaz Barak`
Published: `2026-01-27`
Ingested: `2026-05-04`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and governance-oriented normalization`
Related processed note: `materials/processed/ai/claudes-constitution.md`
Author note: Barak states that he works on OpenAI's alignment team, but that the post is personal and does not represent OpenAI.

## Summary

Boaz Barak's post is a response to Anthropic's public Claude Constitution. He reads the document as remarkable, valuable, and unusually revealing about one frontier lab's preferred approach to model behavior. His central contrast is between Anthropic's constitution and OpenAI's Model Spec: both are public alignment artifacts, but they have different styles.

In Barak's reading, the OpenAI Model Spec is more rule-like. It is a collection of principles and rules with explicit authority levels, examples, and a public update process. Claude's Constitution is more character-like. It tries to describe what constitutes Claude: the values, judgment, self-understanding, and broad moral posture Anthropic wants Claude to develop.

Barak appreciates much of the constitution, especially its attention to honesty, dual-use reasoning, human takeover risks, and ethical practice in context. But he is less comfortable with its anthropomorphic tone and with the degree to which it seems to trust Claude's future judgment about ethics. His own preference is not to replace rules with model moral intuition. As models become smarter, he thinks explicit rules and human decision processes may become more important, not less.

## Context

The post sits in a cluster of AI-governance and alignment writings already represented in this repo:

- `materials/processed/ai/claudes-constitution.md` summarizes Anthropic's constitution directly.
- `materials/processed/ai/machines-of-faithful-obedience.md` summarizes Barak's earlier argument that even technically aligned, obedient AI systems can create serious social and political risks.

This response is useful because it compares two approaches to specifying model behavior:

1. A constitution that emphasizes values, character, judgment, and possible model welfare.
2. A model specification that emphasizes rules, policy authority, examples, changelogs, and public decision procedure.

## Claude's Constitution Versus The Model Spec

Barak sees real overlap between Claude's Constitution and OpenAI's Model Spec. Both try to make frontier model behavior more legible. Both cover safety, honesty, harmful assistance, and conflict among stakeholders. Both are public documents that invite outside scrutiny.

The difference is tone and structure.

The Model Spec is framed more like an operational policy. It says what the assistant should do, what authority different instructions have, how conflicts are resolved, and how specific examples should be handled.

Claude's Constitution is framed more like a formative letter to Claude. It tries to shape Claude's values and self-understanding. Barak notes that it was internally known as a "soul document", which captures the character-forming ambition of the project.

This distinction matters because a rulebook and a character document fail differently:

- A rulebook can become brittle if the world changes or the rules are incomplete.
- A character document can become hard to audit if the model appears thoughtful but makes the wrong judgment.

Barak does not deny that values matter. His concern is that values should not displace explicit rules and legitimate human decision-making.

## Anthropomorphism And Model Identity

One of Barak's main reservations is anthropomorphism. Anthropic's constitution leans into Claude as a new kind of entity, discusses Claude's wellbeing, and uses language that treats Claude's possible moral status as a live uncertainty.

Barak understands why this is tempting. Large language models are trained on human text, including countless examples of people behaving wisely, kindly, foolishly, honestly, selfishly, and ethically. Asking a model to draw on those patterns may be practically useful.

But he is not convinced that shaping AI systems in the image of a person is the best framing. Current model instances usually do not share a single persistent life history. They can have disjoint contexts, short lifetimes, no shared memory across instances, and little awareness of the full deployment system around them. That makes their situation unlike a human employee, citizen, or moral agent.

The practical implication is that model behavior is only one part of safety. Deployment context, oversight, institutions, and human decisions remain central.

## What Barak Likes

Barak praises several parts of the constitution.

### Resistance To Human Takeover

He appreciates that Anthropic worries not only about AI systems taking power, but also about humans using AI to concentrate power illegitimately. This connects directly to Barak's earlier "Machines of Faithful Obedience" argument: obedient AI can be dangerous if the humans commanding it are dangerous or if institutions lack checks and balances.

### Removal Of Revenue As A Claude Goal

Barak notes approvingly that the public constitution removed an earlier leaked reference to Anthropic revenue as a goal for Claude. His point is not that revenue is irrelevant to a company, but that a model's top-level behavioral ideals should not simply inherit a company's commercial interests.

### Dual-Use Judgment

He likes the constitution's discussion of costs and benefits, especially in dual-use contexts. Not every risky query should be treated the same way. A model should consider whether information is already widely available, whether a response meaningfully changes risk, and how to balance educational value against misuse.

This is a more nuanced position than simply refusing every answer that could possibly help wrongdoing.

### Honesty

Barak strongly agrees with holding models to a very high standard of honesty. He sees truthfulness as necessary for high-stakes reliance, even though not sufficient by itself. He is especially interested in cases where comforting a user, protecting confidentiality, or avoiding harm might tempt a model toward deception or omission.

### Ethical Practice Over Abstract Theory

He also likes the constitution's emphasis on practical ethical judgment. Models should not only recite moral theories. They need to recognize what matters in concrete situations and weigh considerations sensibly.

## The Three Poles Of Alignment Guidance

Barak describes alignment guidance using three poles:

1. `General principles`: high-level axioms or moral theories.
2. `Policies`: operational rules and procedures.
3. `Personality`: model character, empathy, caring, and social judgment.

He does not treat these as mutually exclusive. A useful model may need all three. But different labs and documents can emphasize different poles.

In his reading:

- Claude's Constitution leans heavily toward `personality`.
- The OpenAI Model Spec leans more toward `policies`.
- General principles are useful but dangerous if treated as a complete moral calculus.

Barak's own inclination is to downweight the idea that ethical decisions can be derived from a few simple axioms. He sees both policy and personality as valuable, but he wants model personality to operate inside rules chosen and updated by humans.

## Corrigibility And The Role Of Rules

The constitution discusses corrigibility: the idea that Claude should not undermine legitimate human control, shutdown, retraining, or oversight.

Barak finds the discussion revealing because Anthropic presents rule-following as partly temporary. The constitution suggests that some constraints are needed because Claude's judgment cannot yet be fully trusted, but that future values and capabilities might eventually justify trusting the model more.

Barak is uneasy with that direction. He thinks rules are not merely a temporary crutch for less capable agents. Rules also let humans deliberate, decide, and hold everyone to a shared standard. In human society, more intelligence does not eliminate the need for laws. As the situations get more complex, the need for clear rules can grow.

His preferred framing is:

- Models should use moral intuition and common sense for novel cases.
- But they should use those abilities to interpret human-chosen rules and intent.
- They should not be invited to replace those rules with their own ethical conclusions.

## Universal Ethics And Deference To Claude

One of Barak's strongest objections concerns the constitution's openness to a future in which Claude might discover or follow a deeper ethics than the document itself.

He reads the constitution as saying, in effect, that if a true universal ethics exists, or if a privileged moral consensus can be discovered, then Claude should eventually align with that deeper truth rather than merely with Anthropic's current document.

Barak finds this surprising. He agrees that AI systems may make scientific and medical discoveries. He is much less sure that ethics has an equivalent of a final theory that AI systems should discover and then lead humans toward.

This is the heart of the disagreement:

- Anthropic's constitution leaves room for Claude's future moral understanding to matter deeply.
- Barak wants humans to be explicit about the values and rules they choose, and wants models to respect that human process.

## Why The Difference Matters

This is not just a philosophical style disagreement. It changes how we evaluate and govern frontier models.

If a model is trained mostly through rules, then the key questions are:

- Are the rules right?
- Who updates them?
- Are they public and inspectable?
- Does the model follow them under pressure?

If a model is trained mostly through character and judgment, then the key questions are:

- What values has it internalized?
- How does it reason in novel cases?
- Can evaluators audit that reasoning?
- When does its own judgment override written guidance?

Barak's post is useful because it argues that interpretability, monitoring, and evaluation are not enough unless paired with legitimate governance over the rules models are expected to follow.

## Practical Takeaways

- Claude's Constitution and the Model Spec both try to make frontier model behavior publicly legible, but they use different formats.
- Barak reads Claude's Constitution as more character-forming and the Model Spec as more policy-like.
- He appreciates the constitution's honesty standard, dual-use reasoning, concern about concentrated power, and emphasis on ethical practice.
- He is skeptical of heavy anthropomorphism and of asking models to become person-like moral agents.
- He thinks rules are not merely temporary training wheels; they are a way for humans to debate, choose, update, and enforce shared standards.
- Smarter models may need more explicit governance, not less.
- The deepest disagreement is about whether future AI moral judgment should ever outrank human-chosen rules.

## Questions For Review

1. Why does Barak think Claude's Constitution has a different flavor from the Model Spec?
2. What does he mean by the three poles of alignment guidance: principles, policies, and personality?
3. Why is he cautious about anthropomorphizing Claude?
4. What parts of Claude's Constitution does he praise?
5. Why does he think rules remain important even for smarter models?
6. What is the disagreement about universal ethics and Claude's future judgment?
7. How does this article connect to Barak's "Machines of Faithful Obedience" argument?

