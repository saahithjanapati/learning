# Learner Evidence System

This directory stores concept-level evidence about the learner's doubts, mistakes, and recurring confusion.

The goal is different from `PROGRESS_LOG.md`:

- `PROGRESS_LOG.md` is session-level and coarse
- `learner_evidence/` is concept-level and queryable

## Files

- `EVIDENCE_LOG.jsonl`
  - append-only JSONL log
  - one event per line
- `INDEX.md`
  - generated overall summary
- `by_topic/<topic>.md`
  - generated topic-specific summaries

## Entry Schema

Each JSON object may contain:

- `id`
- `observed_at`
- `logged_at`
- `timestamp_precision`
- `topic`
- `subtopic`
- `concept_tags`
- `event_type`
- `review_state`
- `summary`
- `learner_signal`
- `assistant_response_summary`
- `source_path`
- `source_turn`

## CLI

Log a new evidence item:

```bash
python3 scripts/learning_cli.py log-evidence \
  --topic optimization-for-ml \
  --subtopic proximal-gradient \
  --concept indicator-function \
  --event-type doubt \
  --summary "Asked what I_C means in prox-GD." \
  --source-path topics/optimization-for-ml/live-chats/2026-04-14-exam-2-live-chat.md
```

Notes:

- `log-evidence` already updates `INDEX.md` and the relevant `by_topic/` page.
- In interactive tutoring/chat flows, prefer delegating this write to a worker subagent so the main response path stays fast.

Rebuild indexes:

```bash
python3 scripts/learning_cli.py evidence-index
```

Show recent entries:

```bash
python3 scripts/learning_cli.py show-evidence --topic optimization-for-ml --limit 10
```

## Review-State Semantics

- `open`: not yet addressed
- `addressed`: explained once, still a likely weak spot
- `reinforced`: revisited successfully
- `stable`: no longer a live weakness

## Timestamp Precision

- `exact`: captured at the time of the event
- `backfilled-session`: reconstructed from an earlier session
- `date-only-backfill`: exact time unavailable; only date-level confidence
