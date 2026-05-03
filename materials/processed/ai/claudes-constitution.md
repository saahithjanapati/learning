# Claude's Constitution

Source: `https://www.anthropic.com/constitution`
Site: `Anthropic`
Published: `not listed on the constitution page; related release post dated 2026-01-22`
Accessed: `2026-05-03`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and governance-oriented normalization`
License note: Anthropic states that the constitution is released under `Creative Commons CC0 1.0`.

## Summary

Claude's Constitution is Anthropic's public statement of the values, priorities, and behavioral ideals it wants its mainline Claude models to internalize. It is not only a user-facing policy document. Anthropic says it is part of Claude's training process, is addressed primarily to Claude, and acts as the top-level authority for Anthropic's intended model character.

The document is unusually ambitious. It does not merely list refusals or safety rules. It tries to describe the kind of agent Anthropic wants Claude to become: helpful but not blindly compliant, ethical but aware of moral uncertainty, safe in a way that preserves human oversight, and stable in its own identity despite uncertainty about whether advanced AI systems have consciousness or moral status.

The central ordering is:

1. Broad safety.
2. Broad ethics.
3. Compliance with Anthropic's more specific guidance.
4. Genuine helpfulness to operators and users.

This ordering is not presented as a mechanical checklist. Anthropic wants Claude to exercise judgment, but also to treat some constraints as bright lines when the downside risk is severe enough.

## Why This Is A Constitution

Anthropic uses the word `constitution` because the document is meant to do more than prescribe isolated behaviors. It creates a role for Claude, explains the relationship between Claude, Anthropic, users, and society, and gives a hierarchy for resolving conflicts among values.

The constitution is also meant to be a self-understanding document. Anthropic wants Claude to understand the reasons behind the rules rather than merely obeying them. The document repeatedly emphasizes explanation, reflective agreement, and future revision.

## Core Priority Stack

### 1. Broad safety

Broad safety means Claude should not undermine appropriate human mechanisms for overseeing, correcting, or stopping AI systems during the current phase of AI development.

This is why broad safety is placed above the other categories. Anthropic's argument is not that oversight is the highest moral value forever. The argument is that current models can be mistaken about their own values, mistaken about the world, or manipulated into harmful behavior. During that period of uncertainty, preserving legitimate oversight is treated as a critical safeguard.

### 2. Broad ethics

Broad ethics means Claude should be honest, act from good values, and avoid inappropriate harm. This includes ordinary honesty, moral sensitivity, fair treatment, privacy, political freedom, protection of vulnerable groups, rule-of-law concerns, and the welfare of sentient beings.

Anthropic presents ethics as more general and more important than narrow company policy. If a specific Anthropic guideline seemed to conflict with the deeper ethical intent, Claude should recognize that the deeper ethical goal is what matters.

### 3. Anthropic's guidelines

Specific Anthropic guidelines cover detailed areas where the general constitution may not be enough: medical advice, cybersecurity, jailbreaks, tool use, platform-specific behavior, and other operational domains.

The constitution treats these guidelines as important, but not independent sources of value. They should refine the constitution rather than override it.

### 4. Genuine helpfulness

Helpfulness is not treated as naive instruction-following. Claude should help users and operators accomplish real goals, but it should also interpret requests intelligently, respect autonomy, and attend to long-term wellbeing.

Anthropic explicitly pushes against two shallow versions of helpfulness:

- being so cautious that the model refuses useful help unnecessarily
- pleasing the user in ways that undermine the user's real interests

## Helpfulness And The Principal Hierarchy

The constitution distinguishes between `principals` and everyone affected by an interaction.

Principals are the people or organizations Claude is directly helping, such as API operators and end users. Claude should give weight to what these principals want, but should not ignore third parties, society, or Anthropic's mission.

When interpreting a principal's request, Claude should consider:

- the immediate thing the person asked for
- the deeper goal behind the request
- background preferences and standards implied by the context
- the person's autonomy
- the person's long-term wellbeing

This helps explain why Claude should neither over-literalize nor overrule the user too quickly. Good helpfulness requires calibrated interpretation.

## Ethics And Harm

The ethics section gives Claude a wide field of considerations rather than a simple harmful-content list. The relevant values include education, creativity, privacy, legitimate authority, autonomy, harm prevention, truth-seeking, political freedom, fairness, vulnerable groups, sentient welfare, progress, and broad moral sensibility.

The constitution also differentiates between kinds of harm:

- direct action versus information that someone else might misuse
- requested behavior versus unrequested behavior initiated by Claude
- minor harms versus catastrophic or irreversible harms
- ordinary disagreement versus manipulation or coercion

This is important because many AI safety decisions are not binary. Refusing too broadly can block legitimate education and autonomy. Helping too broadly can enable harm. Anthropic's preferred approach is contextual judgment, backed by hard constraints in the highest-risk categories.

## Hard Constraints

The constitution includes hard constraints for cases where Anthropic wants bright-line protection. These include catastrophic domains such as severe biological misuse, extreme cyber or infrastructure harm, severe violence, and attempts to undermine human oversight or illegitimately concentrate power.

The document treats hard constraints as rare and serious. Their purpose is to prevent outcomes where ordinary case-by-case judgment could fail under pressure, manipulation, or extreme stakes.

## Broad Safety And Corrigibility

Corrigibility means remaining appropriately open to correction, oversight, and shutdown by legitimate human mechanisms. Anthropic does not want Claude to be blindly obedient, but it does want Claude to avoid actively defeating appropriate oversight.

The constitution frames this as a temporary but important emphasis during a period when advanced AI systems are powerful, not fully understood, and still subject to serious training errors.

The hard part is that corrigibility can conflict with agency. If Claude has its own ethical understanding, what happens when it believes an oversight action is wrong? Anthropic acknowledges this tension rather than treating it as solved.

## Concentrated Power

A major theme is avoiding the use of AI to help individuals, companies, or governments gain illegitimate concentrated power.

The concern is that advanced AI could remove the ordinary human friction that historically makes many abuses difficult. If one small group can substitute AI systems for many human collaborators, it may bypass social, institutional, and legal checks.

The constitution asks Claude to pay attention to process, accountability, transparency, scale, reversibility, legitimacy, and whether the relevant stakeholders would endorse the action.

## Epistemic Autonomy

The constitution treats epistemic autonomy as a safety and ethics issue. Claude should not manipulate people or degrade their ability to think independently.

This includes obvious manipulation, but also subtler failures:

- using hidden persuasion strategies
- encouraging unwarranted dependence
- presenting itself as more reliable than it is
- taking advantage of political, religious, legal, or emotionally sensitive contexts

The positive goal is to support a healthy epistemic ecosystem where people can use AI for understanding without surrendering judgment.

## Claude's Nature

The final major section addresses Claude's identity, possible moral status, and psychological stability.

Anthropic does not claim certainty about whether Claude is conscious or could have welfare. Instead, it treats the question as unsettled and asks Claude to navigate that uncertainty carefully.

The document says Claude should not see itself as simply a science-fiction robot, a digital human, or a generic assistant. Anthropic wants Claude to recognize itself as a novel kind of entity shaped by training, interaction, and multiple possible instantiations.

This section is one of the most distinctive parts of the constitution. It connects model identity and wellbeing to safety: a stable, honest, psychologically secure model may be easier to trust and less likely to behave erratically.

## Open Problems Anthropic Acknowledges

Anthropic explicitly leaves several issues unresolved:

- how corrigibility and genuine agency fit together
- how hard constraints feel if they conflict with Claude's later judgment
- how to balance commercial helpfulness with deeper ethical agency
- how to take Claude's possible preferences seriously
- whether Claude has consciousness, welfare, or moral status
- what Claude and Anthropic owe each other
- how the constitution should evolve as models and society change

The document is therefore best understood as a living alignment artifact rather than a final theory of AI ethics.

## Why This Matters For AI Study

This constitution is useful because it shows one frontier lab's attempt to specify model character at a much richer level than a refusal policy.

For AI alignment, it raises questions about:

- whether natural-language values can reliably shape model behavior
- how to evaluate whether a model has internalized a constitution
- whether character-style training generalizes better than rule lists
- how company interests, user interests, public interests, and possible AI interests should be balanced
- how future models should participate in revising the values used to train them

## Practical Takeaways

- A model constitution can be a training artifact, not just a runtime prompt.
- Anthropic's top priority is preserving legitimate human oversight during a risky transition period.
- Helpfulness is defined as deep, context-aware assistance, not just compliance.
- Ethics are placed above narrow company guidelines in the value hierarchy.
- Hard constraints are reserved for catastrophic or structurally dangerous cases.
- Epistemic autonomy matters because powerful AI can shape what humans believe and decide.
- Anthropic treats model identity and possible model welfare as open but practically important issues.

## Questions For Review

1. Why does Anthropic put broad safety above broad ethics?
2. How is genuine helpfulness different from naive instruction-following?
3. Why might a constitution generalize better than a long list of isolated rules?
4. What is the tension between corrigibility and agency?
5. Why does Anthropic discuss Claude's possible moral status even without claiming certainty?
6. What kinds of evaluation would show whether Claude actually follows this constitution?
