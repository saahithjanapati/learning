# Lessons Web Deploy

This native reader publishes public lesson markdown from:

```text
topics/**/lessons/*.md
materials/processed/ai/**/*.md except local underscore-prefixed maintenance files
```

Live-chat transcripts stay in the repo for local desktop and agent workflows, but they are not exported to the public reader. AI processed-source notes are discovered recursively and routed under `topics/ai/papers/` at build time so newly ingested public papers appear without manually copying them into `topics/ai/lessons/` or waiting for `learning_system/SOURCE_MAP.json` to be manually refreshed.

Generated folders are intentionally not committed:

- `web/lessons/content/` is temporary and removed after each build.
- `web/lessons/public/` is the static build output and is ignored.

## Local commands

```sh
npm install
npm run lessons:build
npm run lessons:serve
```

## Vercel

The repo-level `vercel.json` is configured for Vercel:

- Build command: `npm run lessons:build`
- Output directory: `web/lessons/public`
- Clean URLs: enabled
