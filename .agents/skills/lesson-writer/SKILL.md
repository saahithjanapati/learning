---
name: lesson-writer
description: Create a thorough, readable, scholarly lesson from a paper, website, blog post, uploaded material, or requested topic. Use whenever Codex is asked to write, generate, expand, or save a lesson note; include a table of contents, and for papers include medium-length and full-length versions covering the research question, method, experiments, results, critique, and open questions.
---

# Lesson Writer

## Core Standard

Write lessons that feel like a strong textbook chapter: careful, complete, readable, and useful for future study. Prefer concrete explanations, clean sectioning, and friendly rigor over terse summaries or academic stiffness.

The lesson must:
- cover the material thoroughly, not just the headline idea
- define key terms before leaning on them
- explain why the material matters
- include examples, intuitions, mechanisms, and caveats
- preserve the source's actual claims and uncertainty
- avoid overclaiming beyond the source
- include a `## Table of Contents` near the top, after the source note or short introduction

## Workflow

1. Identify the target topic path. If unclear, infer the closest existing topic under `topics/`; create a new topic only when the material does not fit any existing topic.
2. Read the source material directly. For URLs or papers, fetch the page/PDF/source; for local files, inspect the artifact itself.
3. Decide the lesson mode:
   - **Paper mode** for research papers, arXiv links, conference papers, or technical reports.
   - **Article mode** for blog posts, web pages, essays, documentation, or news-like sources.
   - **Topic mode** for a requested topic without a single source.
   - **Beginner lecture mode** when the learner says the material is dense, rusty, introductory, or should teach rather than review.
4. Write the lesson as a markdown file under `topics/<root>/<topic>/lessons/YYYY-MM-DD-<slug>.md`.
5. Add a concise source note near the top with the source title, authors/site when available, date when available, and link.
6. Update `learning_system/LESSON_INDEX.md` with a concise row for the new lesson when the repo uses that registry.
7. Reindex after adding the lesson: `python scripts/learning_cli.py reindex --write-skill-tree`.
8. If the Quartz lesson site exists, rebuild with `npm run lessons:build` before claiming the web view is updated.

This skill is for pedagogical reading lessons. Do not classify live chats, interactive tutoring transcripts, or problem-solving sessions as lessons; those belong in `live-chats/` and should use the live-chat workflow instead.

## Paper Mode

For papers, structure the lesson like a very good PhD student reading memo plus a polished teaching note.

By default, keep each paper lesson as one public page to avoid duplicating the lesson index. Put both versions inside that page:

1. `## Table of Contents`
2. `## Medium-Length Version`
3. `## Full-Length Version`

The medium-length version should be a complete standalone reading path: thesis, motivation, method, experiments, main findings, limitations, and takeaway. It should be substantially shorter than the full version but not merely an abstract.

The full-length version should be the exhaustive teaching note.

Include:
- the central research question
- the problem setting and why it matters
- the paper's main idea in plain language
- necessary background and notation
- the method or system, broken into components
- training/data/objective details when relevant
- experimental setup: datasets, baselines, models, metrics, and evaluation protocol
- main results and what each result means
- ablations or analysis experiments
- limitations, assumptions, and failure modes
- thoughtful critique: what is convincing, what is under-tested, what questions remain
- a final takeaway section for memory

Do not turn the paper into a bullet-only summary. Use prose for the main explanation and bullets for checklists, experiment lists, or recap sections.

## Article Mode

For web articles or blogs, include:
- the author/site and context
- the core claim
- the argument structure
- important evidence or examples
- practical implications
- limitations, missing context, or places to be cautious
- a concise final takeaway

## Topic Mode

For topic-only requests, build a coherent lesson from first principles:
- motivate the topic
- define the central concepts
- develop the ideas in a natural learning order
- include worked examples or mental models
- end with a memory checklist and next-step questions

## Beginner Lecture Mode

Use this mode for introductory warm-up lessons, rusty learners, or any request to make lessons feel like lectures rather than exam notes.

In beginner lecture mode:
- assume low prerequisite fluency and rebuild the context gently
- start each major section from an intuition, ordinary example, or "what to picture" description
- introduce vocabulary only after the learner has a reason to need it
- prefer narrative explanation over dense term lists
- reduce exhaustive detail when it would obscure the main conceptual map
- include short "pause and check" prompts that test understanding without feeling like a quiz dump
- use remote inline images or diagrams when they materially help the learner see the concept; cite the image page in the caption
- do not commit local image files unless the user explicitly asks for local assets

## Style

Prefer:
- descriptive headings
- short paragraphs with strong transitions
- equations only when they clarify the idea
- "why this matters" explanations after technical details
- clear contrasts between similar concepts
- a candid but fair critique section for papers

Avoid:
- generic praise
- unsupported claims
- huge quote blocks
- dumping every fact without synthesis
- making live-chat transcripts look like lessons
