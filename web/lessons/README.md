# Lessons Web Deploy

This native reader publishes public lesson markdown from:

```text
topics/**/lessons/*.md
materials/processed/ai/**/*.md except local underscore-prefixed maintenance files
```

Live-chat transcripts stay in the repo for local desktop and agent workflows, but they are not exported to the public reader. AI processed-source notes are discovered recursively and routed into the same public `AI / Lessons` section as authored AI lesson notes, so newly ingested public papers appear without manually copying them into `topics/ai/lessons/` or waiting for `learning_system/SOURCE_MAP.json` to be manually refreshed. Public lesson order is based on ingest/add time, not the source's publication, submission, or revision date.

Generated folders are intentionally not committed:

- `web/lessons/content/` is temporary and removed after each build.
- `web/lessons/public/` is the static build output and is ignored.

## Local commands

```sh
npm install
npm run lessons:build
npm run lessons:serve
```

`npm run lessons:serve` serves both the static reader and the local API routes under
`/api`. Reader auth will stay signed out locally until the Google/Neon
environment variables from `.env.example` are available in the shell.

## Vercel

The repo-level `vercel.json` is configured for Vercel:

- Build command: `npm run lessons:build`
- Output directory: `web/lessons/public`
- Clean URLs: enabled

## Reader auth, notes, and progress API

The reader uses Google sign-in. Each lesson page can save per-user markdown notes
and a `Save for review` flag, and `/review/` lists saved lessons for later
review. Lesson pages also expose a `Mark read` control that increments the
per-user read counter for that lesson. The API routes create these Neon Postgres
tables on first authenticated use:

- `reader_users`
- `reader_sessions`
- `reader_lesson_progress`
- `reader_lesson_notes`

Vercel Routing Middleware gates lesson pages before static HTML is served.
Signed-out page requests redirect to Google sign-in, while `/api/*` remains
available for OAuth callbacks, session checks, logout, progress/read-count
writes, and lesson-note writes.

Individual lesson pages include two clipboard buttons in the sticky header:

- `Copy summary`: copies an existing summary section when the markdown has one,
  preferring the `Medium-Length Version` section used by paper lessons.
- `Copy full text`: copies the full markdown body rendered by the reader.

Paper/PDF ingests can also keep a local-only text extraction under
`materials/source_text/<root>/<slug>.txt`, with an invisible markdown pointer:

```md
<!-- Source text: materials/source_text/ai/example-paper.txt -->
```

Those source text files are git-ignored and are not included in public builds by
default. For a private/local reader build that exposes a `Copy source text`
button on pages with a matching pointer, run:

```sh
LESSONS_INCLUDE_SOURCE_TEXT=1 npm run lessons:build
```

Required Vercel environment variables:

- `DATABASE_URL`: Neon Postgres connection string from the Vercel Marketplace
- `GOOGLE_CLIENT_ID`: Google OAuth web client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth web client secret
- `READER_ALLOWED_EMAILS`: optional comma-separated Google email allowlist

In the Google Cloud OAuth client, add this production redirect URI:

```text
https://learning-machine.vercel.app/api/auth/callback/google
```

For local testing with `npm run lessons:serve`, add:

```text
http://localhost:8080/api/auth/callback/google
```

## Tests

Run the non-secret reader API smoke tests with:

```sh
npm run test:reader
```

To include the Neon-backed read/write round trip, make sure `.env.local`
contains `DATABASE_URL`, then run:

```sh
RUN_READER_DB_TEST=1 npm run test:reader
```
