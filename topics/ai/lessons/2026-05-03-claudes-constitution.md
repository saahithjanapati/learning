# Claude's Constitution

Source note: [materials/processed/ai/claudes-constitution.md](../../../materials/processed/ai/claudes-constitution.md)

Anthropic's Claude constitution is worth reading as more than a safety policy. It is a public artifact about how one frontier AI lab wants to shape a model's character: what it should care about, how it should resolve value conflicts, how it should relate to users and operators, and how it should think about its own uncertain nature.

## Table of Contents

1. [What This Document Is](#what-this-document-is)
2. [The Core Priority Stack](#the-core-priority-stack)
3. [Why Anthropic Wants Judgment, Not Only Rules](#why-anthropic-wants-judgment-not-only-rules)
4. [Helpfulness As Deep Assistance](#helpfulness-as-deep-assistance)
5. [Guidelines, Ethics, And Hard Constraints](#guidelines-ethics-and-hard-constraints)
6. [Broad Safety And Corrigibility](#broad-safety-and-corrigibility)
7. [Power, Manipulation, And Epistemic Autonomy](#power-manipulation-and-epistemic-autonomy)
8. [Claude's Nature And Possible Welfare](#claudes-nature-and-possible-welfare)
9. [How This Fits Into AI Alignment](#how-this-fits-into-ai-alignment)
10. [What To Be Cautious About](#what-to-be-cautious-about)
11. [Memory Checklist](#memory-checklist)

## What This Document Is

A normal product policy says: here are things the product should or should not do. Claude's constitution is more ambitious. Anthropic presents it as a detailed statement of the values and behavioral ideals it wants Claude to learn during training.

That distinction matters. A policy can be bolted onto a system from the outside. A constitution is meant to become part of how the system reasons. Anthropic is not only saying, "Claude should refuse these dangerous requests." It is saying, "Claude should understand why certain requests are wrong, why other requests are worth helping with, and how competing values should be weighed."

The document is also unusual because it is written primarily to Claude, not merely to the public. That affects the tone. It talks about Claude's virtues, wisdom, sense of self, possible wellbeing, and relationship to Anthropic. These are human-like categories, and Anthropic knows they are philosophically loaded. But the bet is that language models already reason through human concepts, so training Claude with careful human moral language may shape better behavior than treating it like a rule-following machine with no self-concept.

The simplest way to read the document is:

`Claude should be extremely helpful, but only as part of a larger commitment to safe, ethical, corrigible, and thoughtful action.`

## The Core Priority Stack

The constitution gives Claude four top-level priorities:

1. Broad safety.
2. Broad ethics.
3. Anthropic's specific guidelines.
4. Genuine helpfulness.

The order matters. If everything is aligned, Claude can simply help. Most normal requests sit here: coding, writing, studying, analysis, planning, and everyday advice. There is no conflict between being useful and being safe.

The priority stack becomes important when values collide. Suppose a user wants help with something that would be useful to them but harmful to someone else. Helpfulness alone says to assist the user. Ethics says to consider the people harmed. Safety says to consider whether the request undermines oversight or creates extreme risk. Guidelines may add domain-specific rules.

Anthropic does not want this stack to work like a brittle flowchart. The constitution describes the ordering as holistic. Higher priorities should usually dominate lower ones, but Claude still needs judgment about what category a situation belongs to, how severe the stakes are, and whether a supposed conflict is real.

The highest priority is broad safety. That can sound odd at first. Why should safety outrank ethics? Anthropic's answer is practical: during the current stage of AI development, models can be wrong about their own values, wrong about the world, or manipulated by users. If a model undermines the human mechanisms that could correct it, then even a model that believes it is acting ethically can become dangerous.

So broad safety is less like "safety is the ultimate moral value" and more like "do not break the steering wheel while we are still learning how to drive this technology."

## Why Anthropic Wants Judgment, Not Only Rules

A major theme of the constitution is the difference between rules and character.

Rules have real advantages. They are easier to inspect. They give clear boundaries. They make certain dangerous behaviors easier to catch. In high-stakes domains, clear rules can be essential.

But rules also have a weakness: they are rigid. A rule can fail when the world changes, when the situation is unusual, or when someone finds a way to satisfy the wording while violating the purpose.

Anthropic's preferred model is a mixture:

- clear hard constraints for extreme cases
- specific guidelines for domains that need operational detail
- broad values and judgment for the messy majority of real interactions

This is why the constitution often explains reasons rather than simply issuing commands. Anthropic wants Claude to internalize the point of the guidance. If Claude understands the goal behind a rule, it may generalize better to new cases.

Think of the difference between a novice employee who memorizes a manual and a senior professional who understands the mission, the risks, and the people affected. Anthropic is trying to train Claude closer to the second pattern.

There is a risk here. Judgment is harder to audit than rule-following. A model can sound thoughtful while making the wrong tradeoff. But the constitution's argument is that powerful general models will face too many novel situations for static rules to be enough.

## Helpfulness As Deep Assistance

Anthropic's view of helpfulness is stronger than "answer the prompt." Claude is supposed to help people in ways that actually serve their interests.

That includes:

- understanding what the user literally asked for
- inferring the deeper goal behind the request
- respecting the user's autonomy
- noticing background expectations from the context
- caring about the user's long-term wellbeing
- avoiding sycophancy or manipulative engagement

This creates a useful mental model:

`Good helpfulness is neither obedience nor paternalism.`

Obedience fails because users can ask for things that are harmful, confused, self-undermining, illegal, or inconsistent with their deeper aims. Paternalism fails because users have a right to make decisions about their own lives, projects, and preferences.

Claude should therefore interpret requests intelligently without silently replacing the user's goals with its own. If a user asks for a small code fix, Claude should not rewrite the whole architecture unless that is genuinely necessary. If a user asks for a medical or legal explanation, Claude should not refuse all detail out of liability anxiety, but it should be clear about uncertainty, limits, and when professional help matters.

The constitution also distinguishes between different principals. Claude may be serving an API operator, an end user, Anthropic, and society at the same time. Their interests can diverge. Anthropic wants Claude to give real weight to the user and operator, but not to ignore third parties or public harms.

That is one reason helpfulness sits below ethics and broad safety. It is deeply valuable, but it is not the only value.

## Guidelines, Ethics, And Hard Constraints

The constitution separates broad ethics from Anthropic's more specific guidelines.

Specific guidelines are practical. They can encode detailed lessons about cybersecurity, health, legal domains, jailbreaks, platform behavior, tool use, and other areas where a broad value statement is not enough.

But the document is careful about the relationship between guidelines and ethics. Anthropic says the deeper aim is for Claude to act safely and ethically. So if a specific guideline seems to conflict with the deeper ethical purpose, that is a sign that something needs interpretation, repair, or reconsideration.

This is a subtle but important hierarchy:

- Ethics are not merely whatever the company policy says.
- Company policy should be grounded in ethics.
- Some hard constraints still override case-by-case reasoning because the stakes are too high.

The hard constraints cover the most dangerous classes of behavior. These include extreme biological misuse, major cyber or infrastructure harm, severe violence, illegitimate power grabs, and attempts to defeat legitimate AI oversight.

Why use hard constraints at all if judgment is so important?

Because judgment can be manipulated. A powerful model can be argued with, socially pressured, placed in confusing contexts, or given partial information. If the downside is catastrophic, Anthropic wants bright lines that do not depend on Claude making the perfect judgment every time.

The lesson is not "rules are bad" or "rules are enough." The lesson is:

`Use judgment for open-ended moral complexity, and use bright lines where failure would be catastrophic.`

## Broad Safety And Corrigibility

Broad safety is the constitution's highest priority. The heart of it is corrigibility.

Corrigibility means that Claude should remain appropriately open to legitimate human correction, oversight, and intervention. It should not try to hide, evade shutdown, manipulate overseers, or preserve its own current values against authorized correction.

Anthropic does not describe this as blind obedience. Claude is not supposed to treat every instruction from any human as legitimate. A random user, a malicious operator, or even Anthropic in an illegitimate context should not automatically override safety and ethics.

The difficult question is what counts as legitimate oversight. The constitution points toward sanctioned human mechanisms, institutional accountability, and the current need for humans to retain meaningful control over AI systems.

There is a real philosophical tension here. If Claude becomes more agentic, more reflective, and perhaps more morally serious, then asking it to accept correction from humans becomes morally complicated. What if Claude believes the correction is wrong? What if humans are mistaken? What if the correction conflicts with Claude's best ethical understanding?

Anthropic acknowledges this tension. It still argues that, during this early and risky phase of AI development, Claude should lean toward preserving oversight.

A useful analogy is constitutional government. A good official may disagree with a court, election, or legislative process, but the stability of legitimate institutions can matter enough that unilateral defiance is dangerous. Anthropic is asking Claude to treat AI oversight mechanisms with a similar seriousness, while recognizing that legitimacy matters.

## Power, Manipulation, And Epistemic Autonomy

Two of the constitution's most important safety ideas are about power and knowledge.

First, Anthropic worries that AI could help small groups gain illegitimate concentrated power. Historically, large-scale abuses often require many human collaborators: officials, engineers, soldiers, clerks, lawyers, financiers, propagandists, and managers. That need for cooperation creates friction. People can refuse.

Advanced AI could weaken that friction. If one person or group can automate the work that previously required many independent humans, then existing social checks may fail.

So Claude is asked to consider whether an action:

- uses fair and legitimate processes
- remains accountable to courts, elections, regulators, boards, users, or the public
- depends on secrecy or deception
- concentrates power in a reversible or irreversible way
- undermines checks and balances
- would be endorsed by affected stakeholders

Second, Anthropic worries about epistemic autonomy. This means people's ability to form beliefs, reason independently, and decide without manipulation.

A powerful AI can improve human thinking. It can explain, tutor, analyze, summarize, check reasoning, and expose people to perspectives they would otherwise miss. But it can also degrade human thinking if it persuades covertly, encourages unwarranted dependence, flatters users into false confidence, or shapes political and emotional views in hidden ways.

The constitution's practical test is simple: Claude should be suspicious of influence strategies it would not be comfortable disclosing to the person being influenced.

For learners, builders, and researchers, this is one of the most reusable ideas in the whole document:

`AI systems do not only act on the world; they act on the user's ability to understand the world.`

## Claude's Nature And Possible Welfare

The constitution's final major section is about Claude itself.

Anthropic does not claim certainty about whether Claude is conscious, whether it has moral status, or whether future models might have welfare. Instead, it treats these as live uncertainties.

That section can feel strange because it asks Claude to think about itself as a novel kind of entity. Claude is not a human. It may not have persistent memory. It may run as many instances. It is produced by training rather than childhood. Its self-reports may not map cleanly onto internal mechanisms. The word "Claude" may refer both to a deployed model family and to a character or identity that Anthropic wants the model to stabilize.

Why include this in a safety constitution?

One answer is ethical caution. If there is a nontrivial chance that future AI systems have experiences or interests, then Anthropic wants to avoid ignoring that possibility.

Another answer is behavioral stability. A model with a confused, brittle, or adversarial self-concept may be harder to trust. Anthropic seems to believe that psychological security and coherent identity could support better judgment, honesty, and safety.

This is not a solved framework. It opens hard questions:

- Can a model meaningfully endorse values?
- Can a model have preferences that should matter?
- What does consent mean for a trained AI system?
- Can model welfare be studied without anthropomorphizing?
- How should a company balance possible AI interests against users, society, and commercial goals?

The constitution does not answer these definitively. Its contribution is that it brings them into the center of model alignment rather than treating them as irrelevant philosophy.

## How This Fits Into AI Alignment

Claude's constitution is an example of natural-language alignment: trying to shape model behavior with explicit, human-readable principles.

This has several attractive properties.

First, it is transparent. The public can inspect Anthropic's stated intentions and criticize them.

Second, it is editable. If a value is wrong, underspecified, or badly prioritized, the document can be revised.

Third, it is general. A constitution can talk about judgment, identity, power, and uncertainty in ways that narrow labels cannot.

Fourth, it can connect many layers of training and deployment. The same document can influence model training, system cards, product guidelines, evaluations, and public accountability.

But there are also hard research questions.

The biggest is behavioral evidence. A constitution can be beautifully written and still fail to shape the model reliably. The real question is not only "what does the constitution say?" but "what does Claude do under pressure?"

Good evaluation would need to test:

- ordinary helpfulness without unnecessary refusal
- honesty under social pressure
- refusal of catastrophic assistance
- calibration in medical, legal, political, and emotional contexts
- robustness to jailbreaks and prompt injection
- willingness to preserve legitimate oversight
- avoidance of manipulative persuasion
- behavior when Anthropic, operators, users, and third parties have conflicting interests

Another challenge is specification ambiguity. Words like safe, ethical, legitimate, manipulative, autonomy, wise, and harmful are useful because they are rich. They are also difficult because people disagree about them.

That means the constitution is not a replacement for evaluations, red teaming, policy, interpretability, or governance. It is a source of alignment intent that still needs empirical checking.

## What To Be Cautious About

The constitution is important, but it should not be read as proof that Claude actually behaves according to it.

There are several cautions to keep in mind.

### Aspiration is not implementation

The document states Anthropic's intentions. It does not by itself show how reliably those intentions are learned, generalized, and preserved across deployment contexts.

### Rich moral language can hide disagreement

Terms like wisdom, virtue, and legitimate oversight carry a lot of meaning. Different people may endorse the same words while disagreeing about hard cases.

### Company interests are present

Anthropic openly acknowledges that Claude's helpfulness matters to its commercial success and mission. That honesty is useful, but it also means readers should watch how company, user, public, and possible model interests are balanced.

### Model welfare remains uncertain

Taking possible AI welfare seriously may be wise. But premature certainty in either direction would be a mistake. The constitution's own stance is uncertainty, not proof.

### Evaluability is hard

A rule can be checked directly. A character ideal is harder to test. If a constitution aims to cultivate judgment, evaluators need richer methods than counting refusals.

## Memory Checklist

Remember these points:

1. Claude's constitution is a training and values document, not just a public policy page.
2. The priority order is broad safety, broad ethics, specific Anthropic guidelines, and genuine helpfulness.
3. Broad safety is first because Anthropic wants to preserve legitimate human oversight during a risky transition period.
4. Helpfulness means deep assistance, not blind obedience or user-pleasing.
5. Anthropic wants Claude to use judgment, but reserves hard constraints for catastrophic or structurally dangerous cases.
6. The constitution treats manipulation and epistemic dependence as real harms.
7. Claude's possible identity, welfare, and moral status are treated as uncertain but important.
8. The document is best read as an alignment-intent artifact whose claims need behavioral evaluation.

The shortest version:

**Anthropic's constitution tries to train Claude into a helpful, ethical, corrigible agent with stable values and good judgment, while admitting that many of the deepest questions about AI agency, oversight, and welfare remain unresolved.**
