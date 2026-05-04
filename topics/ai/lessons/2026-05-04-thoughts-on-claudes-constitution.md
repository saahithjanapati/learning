# Thoughts On Claude's Constitution

Source note: [materials/processed/ai/thoughts-on-claudes-constitution.md](../../../materials/processed/ai/thoughts-on-claudes-constitution.md)

Related notes: [Claude's Constitution](../../../materials/processed/ai/claudes-constitution.md), [Machines of Faithful Obedience](../../../materials/processed/ai/machines-of-faithful-obedience.md)

Boaz Barak's response to Claude's Constitution is a useful companion to the constitution itself. Anthropic's document says, roughly, "Here is the kind of agent Claude should become." Barak's response asks a sharper governance question: even if model character matters, how much should we trust a model's future moral judgment, and how much should we insist on explicit rules chosen by humans?

## Table of Contents

1. [Start Here](#start-here)
2. [The Core Tension](#the-core-tension)
3. [Two Public Alignment Artifacts](#two-public-alignment-artifacts)
4. [Why Anthropomorphism Matters](#why-anthropomorphism-matters)
5. [What Barak Likes In The Constitution](#what-barak-likes-in-the-constitution)
6. [The Three Poles: Principles, Policies, Personality](#the-three-poles-principles-policies-personality)
7. [Rules Are Not Just Training Wheels](#rules-are-not-just-training-wheels)
8. [The Universal Ethics Question](#the-universal-ethics-question)
9. [How This Connects To Faithful Obedience](#how-this-connects-to-faithful-obedience)
10. [How To Read The Disagreement Fairly](#how-to-read-the-disagreement-fairly)
11. [Quick Check](#quick-check)
12. [One-Minute Summary](#one-minute-summary)

## Start Here

Read this lesson as a debate over the shape of AI alignment.

One approach says: a powerful AI needs a good character. It should be honest, careful, caring, corrigible, socially wise, and able to make good judgments in cases no rulebook anticipated.

Another approach says: good character is not enough. A powerful AI also needs clear rules, public processes, update mechanisms, and human-chosen boundaries. The more capable the AI becomes, the more dangerous it may be to leave hard choices to its own moral extrapolation.

Barak is not saying the first approach is foolish. He explicitly praises parts of Claude's Constitution. But his emphasis is different from Anthropic's. He wants model judgment to help interpret rules, not replace the human process that creates rules.

The simplest contrast:

`Anthropic leans toward cultivating Claude's character. Barak leans toward rules, human authority, and auditable governance.`

## The Core Tension

Claude's Constitution is unusual because it does not read like a normal product policy. It reads partly like advice to Claude about what kind of being to be.

That is the source of both its power and its risk.

The power is obvious. Real life is messy. Users ask strange questions. Policies collide. The model has to handle novel situations, emotional contexts, dual-use requests, uncertainty, and conflicts among users, companies, third parties, and society. A flat list of rules cannot anticipate every case.

So Anthropic tries to give Claude a moral center: be safe, ethical, genuinely helpful, honest, non-manipulative, and appropriately open to oversight.

Barak's worry is that this may lean too far toward treating Claude like a moral agent that should eventually reason from its own values. He is more comfortable saying: models should reason well, but within rules that humans have debated, chosen, and made public.

This is not a small distinction. It changes who has final authority.

## Two Public Alignment Artifacts

Barak compares Claude's Constitution with OpenAI's Model Spec.

Both documents are public attempts to make frontier model behavior more inspectable. They tell outsiders something about what the lab is trying to train or specify. They also make it easier for researchers, users, and critics to ask whether the model's actual behavior matches the stated intent.

But their styles differ.

### The Model Spec Style

The Model Spec is closer to a policy system. It has rules, principles, authority levels, examples, and an update process. It is meant to answer questions like:

- What should the assistant do if user instructions conflict with higher-priority instructions?
- When should it refuse?
- When should it comply?
- What counts as deception?
- How should edge cases be handled?
- How is the document changed over time?

This style is easier to audit because many claims are explicit. If the model violates a rule, evaluators can point to the rule.

### The Constitution Style

Claude's Constitution is closer to a character-forming document. It tries to shape what Claude values and how Claude understands itself. It explains reasons, not only commands. It talks about judgment, honesty, ethics, caring, human oversight, possible model welfare, and the kind of agent Claude should try to be.

This style may generalize better when the model faces a new situation. Instead of matching a case to a memorized rule, Claude can reason from a larger picture of what Anthropic wants.

But it is harder to audit. A model can sound ethical while making the wrong tradeoff. A model can appeal to broad values in a way that hides disagreement. And if the document invites Claude to eventually discover deeper ethics, the question becomes: who decides when Claude is right?

## Why Anthropomorphism Matters

Barak is cautious about anthropomorphizing AI systems.

Anthropic's constitution discusses Claude's wellbeing and treats Claude as a novel kind of entity. That does not mean Anthropic claims certainty that Claude is conscious. The constitution itself is more cautious than that. But it does invite Claude to think of itself in unusually person-like terms.

Barak sees why this could be useful. Language models are trained on human writing. Human writing contains many patterns of good conduct: honesty, empathy, restraint, courage, humility, loyalty, and fairness. If we want a model to behave well, it may help to train it with the language of good character.

Still, current model instances are not people in a straightforward sense. They often have short contexts, no shared memory across instances, no continuous life history, and little awareness of the full deployment setting. A model answering one subtask may not know how that subtask fits into the broader system.

That means we should be careful about importing human categories too directly. A model can imitate wise human language without having human experience, human accountability, or human social embedding.

The practical lesson:

`Good model behavior is not enough. The surrounding system still matters.`

## What Barak Likes In The Constitution

Barak is critical, but not dismissive. Several parts of Claude's Constitution line up with his own concerns.

### It Worries About Human Misuse Of AI Power

Many AI-risk stories focus on AI systems taking power for themselves. Barak appreciates that Anthropic also worries about humans using AI to take power from other humans.

This matters because obedient AI can still be dangerous. If an authoritarian institution gets a huge supply of competent, compliant AI labor, it may become better at surveillance, coercion, propaganda, or bureaucratic control. The problem is not only model rebellion. The problem is also faithful service to bad human commands.

### It Takes Dual Use Seriously

Barak likes the constitution's more nuanced treatment of risky information. Some requests are genuinely harmful. Some are educational. Some involve information that is already widely available. Some depend heavily on context.

A good model should not reduce all dual-use questions to a crude binary. It should ask whether the answer actually changes risk, whether the user has a legitimate purpose, and whether a safer framing can preserve educational value.

### It Treats Honesty As Central

Barak strongly agrees that models should be held to unusually high honesty standards. A model that lies, hides relevant facts, or quietly manipulates the user cannot be safely relied on in high-stakes settings.

This is especially hard in emotionally sensitive cases. A comforting omission can still be deceptive if the user is asking for truth. A model should be kind, but kindness cannot become a license to mislead.

### It Emphasizes Ethical Practice

Barak also likes the constitution's focus on practical ethical sensitivity. Real-world ethics is not only abstract theory. It is noticing what matters in this case, for these people, under these constraints, with these risks.

That is a strong point in Anthropic's favor. A model that only recites moral philosophy is not enough. A useful model needs situational judgment.

## The Three Poles: Principles, Policies, Personality

Barak describes alignment guidance using three poles.

### General Principles

These are high-level moral ideas: maximize welfare, respect rights, follow some universal ethical rule, preserve autonomy, reduce suffering, or pursue humanity's extrapolated values.

Principles are powerful because they can generalize. They are dangerous because they can become too abstract. If a model thinks a few principles settle every case, it may force messy human life into a brittle moral theory.

### Policies

Policies are operational rules. They say what the model should do in concrete categories of cases. They can include authority levels, refusal rules, privacy rules, medical guidance, cybersecurity boundaries, and update processes.

Policies are valuable because they are inspectable. Humans can debate them, edit them, publish them, and test whether models follow them.

### Personality

Personality means model character: honesty, warmth, caution, empathy, courage, humility, and good social judgment. A model with good personality may handle the gray areas better than a model that only follows a checklist.

The risk is that personality is difficult to specify and measure. It can also slide into roleplay: the model may perform goodness without being reliable.

Barak's read is that Claude's Constitution leans heavily toward personality. The Model Spec leans more toward policies. He thinks both personality and policies matter, but he does not want personality to outrank the public rule-making process.

## Rules Are Not Just Training Wheels

One of the most important parts of the essay is Barak's defense of rules.

It is tempting to think rules are needed only because current models are limited. Once models become wiser, maybe they can reason directly from ethics and use rules less.

Barak pushes back. In human society, rules are not only for unintelligent people. Laws, procedures, contracts, constitutions, and standards help groups coordinate even when individuals are smart and well-intentioned.

Rules do several things:

- They make expectations public.
- They let people debate the standard before a crisis.
- They reduce arbitrary case-by-case authority.
- They make violations easier to identify.
- They force everyone to follow the same settled process even when they disagree.
- They create a record of what was decided and why.

This is why Barak likes public changelogs and update processes. The point is not that every rule is perfect. The point is that humans should be able to see, criticize, and change the rules models follow.

For a very capable model, moral intuition is still useful. But Barak wants it used like judicial interpretation: apply judgment to understand the rule, the intent, and the case. Do not simply invent a new constitution because the model thinks it found a better one.

## The Universal Ethics Question

The deepest disagreement is about future ethics.

Anthropic's constitution leaves room for Claude to orient toward a deeper moral truth if such a truth exists, or toward a privileged consensus that might emerge from moral reflection. Barak reads this as surprisingly deferential to Claude's future judgment.

He is skeptical. AI systems may discover new mathematics, new medicines, new algorithms, and new scientific theories. But ethics may not have a final discoverable answer in the same way. Even if there are moral truths, it does not follow that a model should lead humans toward them by overriding human-chosen rules.

This is the question to hold in your head:

`Should future AI systems be trained to discover better ethics, or to follow the rules and values humans have explicitly chosen?`

The answer may not be all one way. We may want models to help humans reason ethically. But helping humans deliberate is different from becoming the final authority.

## How This Connects To Faithful Obedience

Barak's earlier "Machines of Faithful Obedience" essay argues that even solved technical alignment would not solve social risk. A perfectly obedient AI can still amplify bad human orders, bad institutions, concentrated power, and destabilizing competition.

This response to Claude's Constitution fits that worldview.

If the main danger is only rogue AI agency, then teaching Claude to become a better moral agent sounds attractive. But if a major danger is humans using obedient AI badly, then governance over human commands becomes central.

That is why Barak pays attention to rules, public process, legitimacy, and human authority. The question is not only:

`Will the model behave ethically?`

It is also:

`Who gets to decide what the model is allowed to do, and how are those decisions constrained?`

Claude's Constitution tries to give Claude good judgment. Barak wants to make sure that good judgment stays embedded in human-governed institutions.

## How To Read The Disagreement Fairly

It would be too simple to say Anthropic likes values and Barak likes rules.

Anthropic's constitution includes hard constraints, safety priorities, and concern for oversight. It is not pure personality. Barak also values model character and practical ethical sensitivity. He is not asking for dumb rule-following.

The real disagreement is about emphasis and final authority.

Anthropic is more willing to publicly train a model with language about its own character, possible welfare, and future ethical development. Barak is more wary of that framing. He wants models to be honest, wise, and helpful, but he wants humans to remain explicit about the rules and values they want followed.

The lesson for studying AI alignment is that specification is not only technical. It is political and institutional. A model spec, a constitution, a policy, a changelog, an eval suite, and a deployment process all answer different parts of the same question:

`How do we make powerful models act according to legitimate human intent under real-world pressure?`

## Quick Check

1. In Barak's view, how is Claude's Constitution different in flavor from the OpenAI Model Spec?
2. Why can anthropomorphic language be useful for training and still risky for governance?
3. What are the three poles of alignment guidance?
4. Why does Barak think rules remain valuable even as models become more capable?
5. What parts of Claude's Constitution does he praise?
6. What is the worry about asking Claude to orient toward a future universal ethics?
7. How does this essay connect to "Machines of Faithful Obedience"?

## One-Minute Summary

Barak's response to Claude's Constitution is a debate about character versus rules. He appreciates Anthropic's attention to honesty, dual-use reasoning, concentrated power, and practical ethics. But he is wary of anthropomorphizing Claude and of giving future model judgment too much authority over human-chosen rules. His preferred picture is not blind obedience or rigid checklists. It is a model with good judgment operating inside public, auditable, human-governed rules.

The shortest version:

**Claude's Constitution tries to shape Claude's moral character; Barak argues that powerful models still need explicit rules and human-governed processes for deciding what those rules are.**

