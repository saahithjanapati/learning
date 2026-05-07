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
`/api`. Reader progress will stay signed out locally until the Google/Neon
environment variables from `.env.example` are available in the shell.

## Vercel

The repo-level `vercel.json` is configured for Vercel:

- Build command: `npm run lessons:build`
- Output directory: `web/lessons/public`
- Clean URLs: enabled

## Reader progress sync

The reader supports Google sign-in plus per-user read/unread progress. The API
routes create these Neon Postgres tables on first authenticated use:

- `reader_users`
- `reader_sessions`
- `reader_lesson_progress`

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
