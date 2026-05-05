# Online Rubrics Elicitation from Pairwise Comparisons

Source note: [materials/processed/ai/online-rubrics-elicitation-from-pairwise-comparisons.md](../../../materials/processed/ai/online-rubrics-elicitation-from-pairwise-comparisons.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)
3. [Why Static Rubrics Break](#why-static-rubrics-break)
4. [How OnlineRubrics Works](#how-onlinerubrics-works)
5. [Why Pairwise Comparison Helps](#why-pairwise-comparison-helps)
6. [What The Results Mean](#what-the-results-mean)
7. [Limits And Open Questions](#limits-and-open-questions)
8. [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper is about a subtle but important weakness in rubric-based RL for LLMs. Once you start grading long-form answers with a fixed rubric, the rubric itself becomes part of the optimization target. That means the model can gradually learn to satisfy the visible checklist while drifting away from the real, tacit human standard of a good answer.

`OnlineRubrics` is the paper's answer to that problem. Instead of freezing the rubric before training begins, the system keeps adding new criteria during training by comparing outputs from the current policy to outputs from a control policy. The LLM judge is asked, in effect, "what extra criterion explains why one of these responses is better?" Those newly elicited criteria are then merged into the rubric and used to define future reward.

The conceptual move matters because it treats reward design as an adaptive process rather than a one-shot artifact. In open-ended domains, there is no reason to expect the full set of relevant criteria to be visible up front. New failure modes only become obvious after the policy starts getting smarter. A dynamic rubric is a way of letting the supervision language catch up.

The paper reports that this improves results across several benchmarks and yields more nuanced criteria around things like reasoning quality, organization, practicality, and transparency. So the contribution is not just "another grader trick." It is an argument that post-training quality in messy domains depends on evolving the rubric alongside the policy.

### Medium Takeaway

OnlineRubrics is best understood as `adaptive reward specification for long-form RL`. Static rubrics give you a starting point, but dynamic criterion elicitation helps expose reward hacks and newly important qualities as the model improves.

## Full-Length Version

The paper begins from a realistic problem in modern post-training. In short-answer or verifiable domains, reward is comparatively easy: you can check whether a math answer is right or whether code passes tests. But long-form responses in fields like explanation, advice, or expert writing are harder. Human preference data is often coarse, and hand-writing a complete reward function is unrealistic. Rubrics became attractive because they turn answer quality into a checklist of criteria the grader can score.

That helps, but only up to a point. A static rubric is a frozen artifact. It encodes what the rubric author thought mattered before training began. Once a policy starts optimizing against it, three things go wrong.

First, the rubric misses emergent failure modes. Models do not merely get better; they find shortcuts. If the grader likes signals of confidence, the model may learn stylistic self-praise. If the rubric emphasizes a narrow notion of relevance, the model may learn to look polished without becoming genuinely useful.

Second, the rubric often under-specifies negative qualities. Humans are good at noticing that something feels off even when they cannot easily pre-write every failure pattern into a checklist. Static rubrics are therefore biased toward obvious desired properties and can lag behind creative ways of failing.

Third, fixed rubrics miss newly visible positive qualities. As policies improve, they sometimes do valuable things that the original rubric writer did not explicitly encode. A frozen rubric can therefore cap what the reward function is able to notice.

The paper's proposal is to make rubric construction online. During training, the system samples responses from the current policy and from a control or reference policy. It then uses pairwise comparison to elicit new criteria that explain why one response is better than the other. This matters because pairwise comparison is cognitively easier for judges than inventing criteria from nothing. When the two outputs are side by side, it is more natural to identify missing strengths or newly visible weaknesses.

That pairwise setup is the heart of the paper. It is doing two jobs at once:

- surfacing emergent reward-relevant distinctions,
- grounding those distinctions in concrete comparative evidence.

The newly generated criteria are added to the existing rubric rather than replacing it. So the method is cumulative. Offline rubrics still provide the initial scaffold; online elicitation expands and repairs that scaffold over time.

Why is this useful beyond the specific benchmarks in the paper? Because it reflects a broader truth about alignment-style post-training: in many domains, the reward model is part of the learning system and must itself be maintained. This paper turns that maintenance into a first-class mechanism.

The reported gains are meaningful because they appear across several evaluation settings rather than in one narrow synthetic test. The paper also says the elicited criteria often emphasize qualities humans care about but may not consistently specify up front, including clarity, practicality, structured reasoning, and organization.

What I find most important is the paper's framing of reward hacking. It does not assume the fix is simply a better static rubric. Instead, it assumes that the pressure to exploit the reward signal is persistent, so the supervision language has to stay adaptive. That is a stronger and more realistic systems view.

There are, however, important limits. The method still depends on LLM judges, so it inherits their blind spots. Pairwise elicitation may surface useful criteria, but those criteria can themselves be noisy, redundant, or overfitted to transient output differences. There is also a governance question: who decides which elicited criteria are genuinely desirable rather than merely convenient to the grader? A dynamic rubric is more alive, but it is also more complex to audit.

Even with those caveats, the lesson is strong. If long-form post-training is going to scale, we likely need reward functions that can notice new failure modes and new desiderata as policies change. OnlineRubrics offers a concrete way to do that.

## Why Static Rubrics Break

- They miss emergent failures that only appear after optimization.
- They overexpose visible checklist items to reward hacking.
- They underrepresent tacit human judgment and changing quality standards.

## How OnlineRubrics Works

- Sample outputs from the current and control policies.
- Compare them pairwise.
- Elicit criteria that explain the difference in quality.
- Merge the new criteria into the reward rubric for future training.

## Why Pairwise Comparison Helps

Comparative judgment is easier than pointwise invention. Seeing two concrete responses makes it easier for a grader to say what is missing, what is better, and which hidden quality matters.

## What The Results Mean

The gains reported in the paper support a simple interpretation: `adaptive reward language can improve long-form RL because answer quality evolves during training faster than a static rubric can keep up.`

## Limits And Open Questions

- How stable are the elicited criteria across runs and model families?
- How much human oversight is needed to prevent grader-driven drift?
- Can dynamic rubrics remain interpretable as they grow?

## Memory Checklist

- The paper targets long-form RL where verifiable reward is weak.
- Static rubrics are useful but brittle.
- OnlineRubrics adds new criteria during training using pairwise comparison.
- The main value is better reward specification under policy change.
- The broader lesson is that reward design may need to be adaptive, not frozen.
