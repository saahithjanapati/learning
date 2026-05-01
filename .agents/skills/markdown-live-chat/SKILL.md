---
name: markdown-live-chat
description: Create or continue topic live-chat transcripts and mirror the actual conversation into a markdown file. Use when the learner asks for a live chat, markdown chat, transcript logging, or wants the chat contents shown in an `.md` file.
---

# Markdown Live Chat

## When To Use

Use this skill when learner asks for:
- a live chat
- a markdown chat
- answers written into a live-chat `.md` file
- transcript logging for the current teaching session
- continued turn-by-turn updates in an existing live-chat file

This skill can be used together with content skills such as `adaptive-session-tutor`.

## Core Requirement

The markdown transcript must contain the actual conversation content, not just a note that a conversation happened.

If the learner asks to "show the contents in the MD file," then each turn should mirror:
- the user prompt
- the assistant response

## Workflow

1. Identify or infer the active topic.
- default transcript location:
  - `topics/<root>/<topic>/live-chats/YYYY-MM-DD-live-chat.md`
- if the session is scoped to a specific artifact, use a more specific suffix when helpful, for example:
  - `YYYY-MM-DD-hw3-live-chat-problem-1.md`

2. Create or continue the transcript file.
- include a short title
- include `## Scope`
- optionally include session controls if the session is interactive
- include `## Transcript`

3. Mirror the conversation into markdown.
- append every new exchange to the `.md` file
- include both `User asked:` and `Assistant response:`
- prefer a stable format such as:
  - `---`
  - `### Turn N`
  - quoted user prompt
  - full assistant reply

4. Keep markdown renderable.
- use `$...$` and `$$...$$` math delimiters for Obsidian compatibility
- keep file prose readable without terminal context
- if the assistant response references a file or concept, include enough text in the transcript for the learner to understand it later
- when equations are being compared across steps, use consistent color coding for repeated/shared terms when that will make the derivation easier to follow

5. Stay in live-chat mode until the learner opts out.
- continue appending new turns to the same file for the session
- if learner asks to stop transcript logging, honor that for the current session
- if the session is academic Q&A and the learner demonstrates a substantive doubt, confusion, proof gap, or incorrect answer, also create a concept-level evidence entry
- default to delegating that evidence write to a worker subagent using `learner-evidence-tracker` when delegation is allowed
- do not make the learner wait on the evidence write unless the next critical-path step depends on its result
- if delegation is unavailable, fall back to `python3 scripts/learning_cli.py log-evidence ...`

6. Close out lesson sessions cleanly.
- if the session is a lesson/tutoring session, create or update recap artifacts and logs according to repo teaching policy

## Format Rules

- Do not write placeholder-only transcript entries.
- Do not summarize a turn when the learner asked for the content itself to appear in the markdown file.
- When revising a response after the fact, update the transcript so it matches the final answer given to the learner.
- Keep the transcript as a readable artifact that can be mined later for weak spots and session continuity.

## Equation Color Coding

Use color coding selectively in interactive live chats when it helps the learner track the same term across multiple equations or derivation steps.

When using color coding:
- keep the same mathematical object in the same color across adjacent equations
- prefer color for repeated/shared term groups, cancellations, moved terms, and matched coefficients
- use a small stable palette rather than many colors
- include a short legend when a response first introduces a colored derivation
- follow repo dark-mode accessibility guidance and prefer bright/high-contrast colors
- do not color code isolated variables just because they repeat
- avoid coloring standalone scalars like `\eta` by themselves unless the whole coefficient/group is what is being tracked across lines
- default to coloring meaningful expression blocks, for example:
  - `x - \eta G_\eta(x)`
  - `G_\eta(x)-\nabla g(x)`
  - `\eta \|G_\eta(x)\|^2`
  - `(G_\eta(x)-\nabla g(x))^\top(z-x)`

Recommended default palette:
- current/base term: bright cyan `#67E8F9`
- first-order / gradient / descent term: bright rose `#FDA4AF`
- constraint / projection / curvature correction: bright mint `#86EFAC`
- coefficient or convergence-factor group: bright violet `#C4B5FD`
- stochastic / sampled / noisy term: bright gold `#FDE047`

Use colors only when they improve clarity.
If the derivation is short or the colors would add clutter, prefer plain math.
