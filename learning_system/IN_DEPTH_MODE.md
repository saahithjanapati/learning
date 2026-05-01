# In-Depth Mode

Use when learner requests deep coverage of a specific topic.

## Trigger Phrases

- "Go in depth on this topic"
- "I want a deep dive"
- "Let us go deeper on X"

## Load Order (Topic History First)

For topic path `topics/<root>/<topic>/`:

1. `topics/<root>/<topic>/lessons/` (pedagogical readings, most recent first)
2. `topics/<root>/<topic>/live-chats/` (interactive transcripts, most recent first)
3. `topics/<root>/<topic>/curriculum/`
4. `topics/<root>/<topic>/practice/` (completed exercises and known bugs)
5. [learning_system/PROGRESS_LOG.md](PROGRESS_LOG.md) rows for this topic
6. [learning_system/SKILL_GRAPH.md](SKILL_GRAPH.md) nodes related to this topic

## Adaptation Rules

1. Find weak concepts from prior mistakes.
2. Keep brief refresher only for already-solid concepts.
3. Spend most time on weak/high-value subskills.
4. Increase challenge once learner demonstrates stability.

## Output Requirements

- Start with "what changed since last session."
- Include focused objectives tied to prior mistakes.
- Use dynamic question generation based on requested style/difficulty.
- End with next-step recommendations tied to observed performance.
