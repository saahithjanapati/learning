# Towards End-to-End Automation of AI Research

Source: [Nature article](https://www.nature.com/articles/s41586-026-10265-5) and [Sakana AI announcement](https://sakana.ai/ai-scientist-nature/)

Canonical title: "Towards end-to-end automation of AI research"

Authors: Chris Lu, Cong Lu, Robert Tjarko Lange, Yutaro Yamada, Shengran Hu, Jakob Foerster, David Ha, Jeff Clune

Published: Nature, online March 25, 2026; Sakana announcement March 26, 2026

DOI: `10.1038/s41586-026-10265-5`

Related project links:

- [AI Scientist repository](https://github.com/SakanaAI/AI-Scientist)
- [AI Scientist-v2 repository](https://github.com/SakanaAI/AI-Scientist-v2)
- [Original AI Scientist preprint](https://arxiv.org/abs/2408.06292)
- [AI Scientist-v2 preprint](https://arxiv.org/abs/2504.08066)

## One Sentence Summary

The AI Scientist is an agentic system that attempts to automate the machine-learning research loop: propose ideas, run experiments, analyze results, write a paper, and review that paper.

## Why This Matters

Many AI systems help with one part of research: coding, literature search, writing, plotting, or reviewing. This work is important because it connects those pieces into an end-to-end research pipeline. The core question is not "can an LLM write a convincing paragraph?" but "can a system carry a research idea through enough of the scientific process that external reviewers treat the result as a real workshop paper?"

The headline result is deliberately modest but historically notable: one AI-generated manuscript passed the first round of peer review at a top-tier machine-learning workshop. The authors withdrew it according to a pre-established protocol because the point was evaluation, not publication without disclosure.

## System Overview

The AI Scientist has four broad phases.

1. Idea generation
2. Experiment execution
3. Paper writing
4. Automated peer review

The system keeps an archive of candidate research ideas, checks novelty with web and literature tools, modifies code, runs experiments, records observations, writes a LaTeX manuscript, and then asks an Automated Reviewer to critique the result.

This is best understood as a research factory prototype. It does not make research effortless, and it does not guarantee high-quality science. It tests whether the whole chain can be connected tightly enough to produce at least some externally plausible research artifacts.

## Two Modes

### 1. Focused, Template-Based Mode

In the focused mode, humans provide a starting research area and a code template. The system then proposes ideas, changes the code, runs experiments, debugs failures, gathers plots and metrics, and writes a paper inside a conference-style LaTeX template.

This mode is narrower but easier to control. The system is not inventing the whole environment from scratch; it is operating inside a prepared sandbox.

### 2. Template-Free, Open-Ended Mode

In the template-free mode, the system has more freedom. It generates starting code itself, searches through experimental branches, uses tree search over possible research directions, critiques plots with vision-language feedback, and adapts across stages such as preliminary investigation, hyperparameter tuning, research-agenda execution, and ablation studies.

This mode is more ambitious. It also makes evaluation harder, because the system has many more ways to wander into unproductive or flawed work.

## Phase 1: Idea Generation

The system starts by generating research ideas. A useful idea must be interesting, feasible, and at least plausibly novel.

The template-based system represents each idea with fields such as title, hypothesis, experimental plan, and self-scored criteria. It then performs novelty checks using scholarly search tools, with multiple rounds of revision if an idea appears too close to existing work.

The important beginner point: idea generation is not just "brainstorm a title." The agent must connect a hypothesis to an experiment it can actually run.

## Phase 2: Experiment Execution

The system modifies code, runs experiments, debugs failures, and records outcomes in an experimental journal.

In the template-based version, execution is relatively linear. The agent follows a plan, edits the provided codebase, runs experiments, and attempts to fix errors.

In the template-free version, execution becomes more like search. The system creates multiple experiment nodes, tracks whether each node is buggy or useful, critiques outputs, and selects promising branches for further work.

The experimental journal matters because the paper-writing phase depends on it. If the journal is confused, incomplete, or wrong, the final manuscript will inherit that weakness.

## Phase 3: Paper Writing

After experiments finish, the system writes a paper section by section. It uses results, plots, notes, and related-work search to fill a LaTeX manuscript.

The paper-writing phase is not just stylistic. It must decide what result to emphasize, what baseline to compare against, and what limitations to admit. Those choices are part of scientific judgment, not just formatting.

The Nature paper reports failure modes here too: hallucinated or inaccurate citations, duplicate figures, and weak methodological framing can still appear.

## Phase 4: Automated Review

The Automated Reviewer evaluates generated papers using a NeurIPS-style review process. It produces multiple independent reviews and a meta-review.

The reported reviewer metrics are important but should be read carefully. On NeurIPS-style accept/reject prediction, the Automated Reviewer reached balanced accuracy around the same range as human reviewer agreement in the comparison used by the authors. The paper reports balanced accuracy around `0.69` before the model training cutoff and around `0.66` after the cutoff, with human reviewer agreement around `0.66` in the cited comparison.

That does not mean the AI reviewer is "as good as expert scientific judgment." It means that, on this benchmark framing, its accept/reject discrimination is comparable to a noisy human-review baseline. Peer review is already noisy, and a metric can hide important qualitative differences.

## Human Evaluation Result

The authors submitted three generated manuscripts to an ICLR 2025 workshop with the consent of relevant organizers and institutional review approval. Reviewers were told that some submissions might be AI-generated, but not which ones.

One of the three submissions received scores of `6`, `7`, and `6`, for an average of `6.33`. According to the authors, this would probably have passed the first round of review at that workshop. The paper was withdrawn according to the pre-established protocol.

This is the paper's main milestone result:

- It shows that an AI-generated research artifact can sometimes reach workshop-review plausibility.
- It does not show that autonomous AI can reliably produce top-tier research.
- It does not show that humans were irrelevant, because humans still designed the system, chose the evaluation setting, filtered generated outputs, and controlled the submission protocol.

## What The Result Does Not Prove

The result is easy to overread, so the limits matter.

The system is not yet a dependable autonomous scientist. Only one of three workshop submissions reached the relevant bar. The workshop acceptance rate was much higher than the main-conference acceptance rate. The accepted-style paper reported a negative result rather than a major new capability.

The system still makes scientific mistakes. The paper describes issues such as underdeveloped ideas, incorrect implementations, shallow methodology, experimental errors, duplicate figures, and inaccurate citations.

The current setting is computational machine-learning research. That is much easier to automate than wet-lab biology, physical experiments, field science, or any domain where instruments, materials, and safety controls are central.

## Risks And Governance Questions

If systems like this scale, the first pressure point may be peer review. A cheap paper-generation pipeline could flood workshops and conferences with plausible-looking but weak work.

Other risks include:

- Inflated credentials from undisclosed AI-generated submissions
- Repurposing others' ideas without proper credit
- Lowering the cost of low-quality or deceptive research artifacts
- Dangerous experimentation if future systems gain access to sensitive tools
- Displacement or devaluation of parts of scientific labor

The authors argue for disclosure norms, watermarking or provenance methods, and community standards for handling AI-generated research.

## Practical Mental Model

Think of the AI Scientist as a loop:

```text
idea -> code -> experiments -> results -> paper -> review -> revised direction
```

Each arrow is a place where the system can fail.

- The idea can be unoriginal.
- The code can be wrong.
- The experiment can test the wrong thing.
- The result can be misread.
- The paper can overclaim.
- The review can miss the real flaw.

The interesting part is not that any one arrow works perfectly. The interesting part is that the authors connected all the arrows and tested the full chain.

## Key Takeaways

1. The AI Scientist is an end-to-end research automation system, not just a writing tool.
2. The system has both a controlled template-based version and a more open-ended template-free version.
3. Its core loop is idea generation, experimentation, manuscript writing, and automated review.
4. One generated manuscript passed a first-round workshop review bar, which is a milestone but not a proof of reliable autonomous science.
5. The strongest reading is: AI research agents can now sometimes create plausible complete research artifacts.
6. The cautious reading is: scientific quality, originality, methodological rigor, and publication governance remain major unsolved problems.

## Questions To Check Understanding

1. Why is end-to-end automation different from using an LLM to help write a paper?
2. What does the template-based system get from the human-provided code template?
3. Why does the template-free version need search over experiment branches?
4. What does the Automated Reviewer measure, and what does it not measure?
5. Why is the workshop peer-review result important but limited?
6. What failure modes would make an AI-generated paper look polished but still scientifically weak?
