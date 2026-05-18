---
name: raindrop-ingest
description: Fetch recent Raindrop.io bookmarks and ingest selected papers, articles, PDFs, or technical links into Learning Machine using the repo's existing source and lesson workflows.
---

# Raindrop Ingest

## When To Use

Use this skill when the user asks to:
- "ingest recent Raindrops"
- "pull links from Raindrop into Learning Machine"
- "scrape my Raindrop papers"
- "set up a Raindrop automation"
- "process saved Raindrop.io links"

## Boundary

This skill discovers and queues recent Raindrop.io bookmarks, then routes each selected link through existing Learning Machine ingest skills.
It is not a general Raindrop bookmark-management skill.

## Required Secrets

- `RAINDROP_ACCESS_TOKEN`: bearer token for the Raindrop REST API.
- Optional `RAINDROP_COLLECTION_ID`: collection to poll; use `0` for all non-trash raindrops.
- Optional `RAINDROP_SEARCH`: Raindrop search query, such as `#paper` or `type:article`.
- Optional `RAINDROP_FETCH_LIMIT`: number of recent links to inspect.

Keep these in `.env.local`; never commit them.

## Workflow

1. Check configuration:
- make sure `.env.local` contains `RAINDROP_ACCESS_TOKEN`
- if the user wants a specific collection, run:
  - `python scripts/raindrop_recent.py collections`
- use the collection ID in `RAINDROP_COLLECTION_ID` or `--collection-id`

2. Fetch recent candidates:
- default all-collection fetch:
  - `python scripts/raindrop_recent.py recent --nested --write-manifest`
- filtered fetch:
  - `python scripts/raindrop_recent.py recent --collection-id <id> --search '<query>' --nested --write-manifest`
- use `--include-seen` only when auditing or retrying old links

3. Triage each candidate:
- research-paper landing pages, arXiv/OpenReview/conference pages, PDFs, AlphaXiv pages, lab pages, or tweets pointing at a paper -> resolve the canonical full paper first
- technical blogs/articles -> ingest the canonical article URL
- unclear social/bookmark pages -> treat as discovery provenance and follow through to the durable source when possible
- skip non-learning bookmarks unless the user explicitly wants them

4. Ingest content:
- for batches or mixed source material, invoke `materials-to-curriculum`
- for one substantial paper/article lesson, invoke `lesson-writer`
- for guided discussion instead of durable artifacts, invoke `guided-paper-reading`
- preserve Raindrop metadata in provenance when useful:
  - `Raindrop ID:`
  - `Raindrop saved at:`
  - `Raindrop tags:`
  - `Discovery source:`

5. Post-ingest maintenance:
- after successful durable ingest, run:
  - `python scripts/learning_cli.py post-ingest`
- for AI material, verify it appears under the public `AI / Lessons` reader section when publishing is expected
- mark only successfully handled raindrops seen:
  - `python scripts/raindrop_recent.py mark-seen <id> [<id> ...]`

## Automation Pattern

Use a scheduled automation prompt like:

> Use `$raindrop-ingest` in `/Users/saahithjanapati/Desktop/learning-machine`. Fetch the latest unseen Raindrop.io links, prioritize papers and serious AI/ML technical articles, ingest up to 3 useful items into Learning Machine with durable processed-source notes and lessons when appropriate, run post-ingest maintenance, and report which Raindrop IDs were ingested or skipped.

Recommended environment:
- local or worktree automation in this repo
- `.env.local` available with `RAINDROP_ACCESS_TOKEN`
- conservative limit such as `RAINDROP_FETCH_LIMIT=10`

## API Setup Notes

Raindrop's official API docs say applications must be registered and authenticated with OAuth for API requests.
For personal-only use, the app settings provide a Test token, which can be used as the bearer token.
Authorized API calls send `Authorization: Bearer <token>`.
Recent bookmarks come from `GET https://api.raindrop.io/rest/v1/raindrops/{collectionId}`, with `collectionId=0` for all non-trash raindrops, `sort=-created`, and `perpage` up to 50.
Raindrop allows 120 OAuth requests per minute per authenticated user.
For step-by-step setup, use `references/raindrop-api-setup.md`.
