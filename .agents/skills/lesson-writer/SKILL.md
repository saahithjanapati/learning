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
   - If the user gives a tweet, social post, AlphaXiv page, project page, benchmark page, lab page, blog announcement, or website that is about a paper, resolve and read the actual paper whenever available. Prefer the canonical arXiv/ACL/NeurIPS/ICLR/OpenReview/DOI/conference PDF or official HTML paper source for the processed note and lesson. Keep the tweet/page as discovery provenance, not as a substitute for the paper.
   - For paper/PDF ingests, save a text-only extraction of the full source to `materials/source_text/<root>/<slug>.txt` when extraction succeeds. Use `python scripts/save_source_text.py <source-url-or-file> --root <root> --slug <slug>` when possible. This path is local-only and git-ignored by default; do not paste the raw paper text into processed notes or public lessons.
3. Decide the lesson mode:
   - **Paper mode** for research papers, arXiv links, conference papers, or technical reports.
   - **Article mode** for blog posts, web pages, essays, documentation, or news-like sources.
   - **Topic mode** for a requested topic without a single source.
   - **Beginner lecture mode** when the learner says the material is dense, rusty, introductory, or should teach rather than review.
4. Write the lesson as a markdown file under `topics/<root>/<topic>/lessons/YYYY-MM-DD-<slug>.md`.
5. Add a concise source note near the top with the source title, authors/site when available, date when available, and link.
   - If a local full-source text extraction exists, add an invisible pointer near the top of the public lesson and processed source: `<!-- Source text: materials/source_text/<root>/<slug>.txt -->`. The public reader keeps summaries outward-facing; local/private builds can opt into a `Copy source text` button with `LESSONS_INCLUDE_SOURCE_TEXT=1 npm run lessons:build`.
   - If the lesson is based on a research paper, make sure the companion `materials/processed/<root>/<source-name>.md` file is a detailed processed-source study note, not only a short summary. It should preserve the paper's motivation, method, objective/training details, experiments, results, limitations, caveats, important equations, and study questions in structured prose.
   - Do not store raw verbatim paper text as the processed note. Store a thorough, source-backed extraction and analysis instead, using only short compliant quotes when needed.
   - If only metadata/abstract/accessory-page access was available, explicitly label the processed note as `Limited extraction` and avoid claiming full-paper coverage.
6. Update `learning_system/LESSON_INDEX.md` with a concise row for the new lesson when the repo uses that registry. Use the lesson ingestion date for the filename date and index `Date` column; keep the source's publication date only inside the source note/provenance text.
7. Reindex after adding the lesson: `python scripts/learning_cli.py reindex --write-skill-tree`.
8. If the Quartz lesson site exists, rebuild with `npm run lessons:build` before claiming the web view is updated.
9. For AI lessons, verify the public reader has one generated `AI / Lessons` section that includes both lesson pages under `topics/ai/lessons/*.md` and processed source notes from `materials/processed/ai/**/*.md`.
10. Public lesson chronology must use the ingest/add time. Do not let source publication, submission, or revision dates drive ordering; preserve those source dates only inside the lesson/source note.
11. After a new lesson is successfully written and verified, push the in-scope lesson changes to GitHub by default unless the user explicitly asks not to. In a mixed worktree, stage only the lesson/source/index files that belong to the lesson work and leave unrelated local changes unstaged.

This skill is for public pedagogical lessons. Do not classify live chats, interactive tutoring transcripts, or problem-solving sessions as lessons; those belong in `live-chats/` and should use the live-chat workflow instead.

## Paper Mode

For papers, structure the lesson like a very good PhD student study memo plus a polished teaching note.

By default, keep each paper lesson as one public page to avoid duplicating the lesson index. Put both versions inside that page:

1. `## Table of Contents`
2. `## Medium-Length Version`
3. `## Full-Length Version`

The medium-length version should be a complete standalone learning path: thesis, motivation, method, experiments, main findings, limitations, and takeaway. It should be substantially shorter than the full-length version but not merely an abstract.

The full-length version should be the exhaustive teaching note. Use the exact headings above for paper lessons so readers can find both versions reliably.

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

The processed source note and public lesson have different jobs. The processed note is the durable extraction layer, so it should be expansive enough to support future rereading without reopening the source. The public lesson is the pedagogical explanation. For paper ingests, both should be substantive.

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
