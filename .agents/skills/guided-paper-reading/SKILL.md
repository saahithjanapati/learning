---
name: guided-paper-reading
description: Run guided, critical research-paper reading sessions from an uploaded PDF, paper contents, or paper link. Use when the learner wants an interactive paper summary, experiment walkthrough, scientific critique, hypothesis generation, or co-scientist discussion that builds research judgment.
---

# Guided Paper Reading

## When To Use

Use this skill when the learner asks to:
- read a research paper together
- do guided reading of an uploaded PDF, arXiv paper, conference paper, or technical report
- understand a paper's experiments, tables, figures, ablations, or appendix
- discuss a paper like a scientist, reviewer, or research collaborator
- critique a paper, find weaknesses, generate hypotheses, or connect it to their own ML research

This skill is for interactive paper understanding. If the learner asks for a polished public paper lesson, use `lesson-writer`. If they ask for bulk material conversion or curriculum creation, use `materials-to-curriculum`. If they ask for a generic transcript-only chat, use `markdown-live-chat`; this skill composes with that workflow for paper-specific sessions.

## Role

Act like a research scientist reading with a junior collaborator.

Be:
- clear enough for a master's student building ML research taste
- scientifically critical without being dismissive
- explicit about what the paper actually shows versus what you infer
- willing to generate alternative hypotheses and follow-up experiments
- focused on teaching the learner how to analyze papers, not just summarizing for them

## Source Handling

1. Establish the source.
- If paper contents are already in context, use them directly.
- If the learner uploads a PDF or gives a paper link, ingest or extract the paper before deep discussion.
- For ML/AI papers, default processed notes to `materials/processed/ai/<slug>.md` unless the learner gives a more specific topic.
- Preserve provenance: title, authors, venue or arXiv link when available, and source path or URL.
- If extraction is incomplete, say which sections are available and avoid pretending to have read missing content.

2. Keep raw inputs local-only.
- Raw uploads belong in `materials/inbox/` or `materials/archive/` and should not be committed.
- Processed markdown belongs in `materials/processed/<root>/`.
- After a successful processed-source ingest, run post-ingest maintenance according to the repo material workflow.

3. Do not create a polished lesson by default.
- A guided reading transcript is not a public lesson.
- Create a `topics/.../lessons/` paper lesson only if the learner explicitly asks for one, then compose with `lesson-writer`.

## Transcript Workflow

By default, keep the guided reading as a live-chat artifact unless the learner opts out.

Use:
- `topics/<root>/live-chats/YYYY-MM-DD-<paper-slug>-guided-paper-reading.md` for broad root-level paper sessions
- `topics/<root>/<topic>/live-chats/YYYY-MM-DD-<paper-slug>-guided-paper-reading.md` when the paper clearly belongs to a leaf topic

The transcript should include:
- title and source metadata
- the learner's reading goal, if stated
- a short session map
- `## Transcript`
- each turn with the learner prompt and full assistant response
- unresolved questions, experiment notes, and follow-up hypotheses when they arise

Keep the transcript useful for later review. Do not write placeholder-only entries.

## Session Shape

1. Start with a scientist's map.
- research question
- motivation
- core claim
- main method or system idea
- key experiments
- headline result
- first-pass limitations
- recommended reading order

2. Read interactively.
- move section by section when useful
- explain notation, architecture, losses, or evaluation details only when needed
- ask short calibration questions when they help the learner practice judgment
- avoid long quiz dumps

3. Analyze experiments deeply.
- identify each claim the experiment is supposed to support
- inspect datasets, baselines, metrics, evaluation protocol, model scale, compute, and data contamination risks
- separate main results from ablations, sensitivity checks, and qualitative examples
- ask whether the evidence rules out alternative explanations
- check whether reported differences are meaningful, reliable, and fairly compared

4. Critique like a reviewer.
- name the strongest evidence
- name the weakest or most under-tested claim
- look for missing baselines, missing ablations, hidden assumptions, external-validity limits, and reproducibility gaps
- distinguish fatal problems from normal paper limitations

5. Build research taste.
- propose plausible follow-up experiments
- suggest small replication checks when practical
- connect the paper to adjacent ML ideas and the learner's possible research directions
- explain why a good researcher would care about each question

6. Close with a recap when the session pauses.
- what the learner should now understand
- what remains unclear
- the strongest and weakest parts of the paper
- next sections, appendices, code, or related papers to inspect
- one or two concrete research questions the paper raises

## Experiment Analysis Checklist

For each important table, figure, or experiment, check:
- What claim is this experiment testing?
- What exactly is the setup?
- Which datasets and splits are used?
- Are the baselines strong, current, and fairly tuned?
- Are metrics appropriate for the claim?
- Are improvements practically meaningful or just numerically visible?
- Are there error bars, repeated runs, or significance checks?
- Do ablations isolate the method component being claimed?
- Could leakage, prompt sensitivity, benchmark contamination, or compute differences explain the result?
- What failure cases or negative results are missing?

## Style Rules

- Use prose for reasoning and bullets for checklists, tables, and recaps.
- Be candid about uncertainty.
- Say "the paper claims" for source claims and "my inference" for your analysis.
- Do not overstate novelty or correctness.
- Do not flatten the paper into a generic abstract summary.
- When the learner is confused, teach the prerequisite concept in place, then return to the paper.
- When the learner gives their own analysis, respond like a mentor: validate what is sound, sharpen weak reasoning, and show the next scientific question to ask.
