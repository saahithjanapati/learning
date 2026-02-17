# Curriculum Workflow (0 -> 1)

This workflow supports the "upload materials -> tailored lessons -> tracked progress" loop.

## Step 0: Handle In-Depth Requests

If learner asks for deep coverage of an existing topic:
- load prior topic history first (see `learning_system/IN_DEPTH_MODE.md`)
- derive objectives from prior mistakes and gaps
- then generate the new lesson plan

If learner asks how to start:
- invoke startup skill behavior
- offer recent-topic resume options

## Step 1: Ingest Source Materials

1. Put source files in `materials/inbox/`.
2. Ask the assistant to convert PDFs to markdown.
3. Store extracted text in `materials/processed/`.
4. Run post-ingest maintenance (automatic after conversion):
   - `python scripts/learning_cli.py post-ingest`
   - archives processed source files from `materials/inbox/` to `materials/archive/`
   - rewrites transcript source headers and refreshes `learning_system/SOURCE_MAP.json`
5. Route the material:
   - unified: `topics/<root>/<topic>/...`
   - for class-specific materials, use class name as `<root>`

## Step 2: Build a 0 -> 1 Curriculum

Use `learning_system/templates/CURRICULUM_TEMPLATE.md`.

Interpretation of 0 -> 1:
- `0`: little/no familiarity.
- `1`: can explain core concepts and solve representative problems without heavy hints.

Curriculum should define:
- prerequisites,
- core modules,
- expected outcomes,
- checkpoints.
- explicit transcript linkage (`## Source Materials`, `## Transcript Anchors`, `## Source Trace`).

## Step 2.5: Refresh Machine-Readable Source Links

After creating/updating curricula:
- regenerate `learning_system/SOURCE_MAP.json`
- ensure each topic entry resolves to processed transcript markdown paths
- ensure transcript headers map back to original PDFs for provenance

## Step 3: Generate Session Lesson Plan

Use `learning_system/templates/LESSON_PLAN_TEMPLATE.md`.

Policy:
- If topic familiarity is low: exposition-heavy session.
- If accuracy rises: increase practice density.
- If learner explicitly requests mode/style: apply learner-directed override.

## Step 4: Run Session and Log Performance

For each session, record:
- what was attempted,
- what was correct/incorrect,
- recurring mistakes and fixes,
- recommended next session.
- full chat transcript in lesson markdown format (for later mining).

Update:
- `learning_system/PROGRESS_LOG.md`
- topic lesson log under `topics/<root>/<topic>/lessons/`
- topic live chat transcript under `topics/<root>/<topic>/lessons/YYYY-MM-DD-live-chat.md`
- `learning_system/TOPIC_INDEX.md` if new topic path or alias is created
- `learning_system/SKILL_GRAPH.md` if skill status changes.

## Step 5: Adapt Next Lesson

Use prior session outcomes:
- low accuracy or repeated confusion -> more explanation + targeted micro-drills.
- improving accuracy -> fewer examples, more independent problems.
- high accuracy and clean reasoning -> advance to next module.

Use explicit learner intent in each session:
- `learn`: explanation-first
- `practice`: problem-first
- `mixed`: short explanation + iterative questioning
