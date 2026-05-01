# Lessons Web Deploy

This Quartz surface publishes only lesson markdown from:

```text
topics/**/lessons/*.md
topics/**/live-chats/*.md
```

Live-chat transcripts are categorized separately under `live-chats/`. The top-level "Recent Lessons" list and topic lesson counts include only pedagogical reading notes.

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

Optionally set `QUARTZ_BASE_URL` in Vercel to the final host without `https://`, for example:

```text
learning-machine-lessons.vercel.app
```
