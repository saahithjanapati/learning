---
name: openai-image-generator
description: Generate images with OpenAI's image generation API, defaulting to `gpt-image-2`, and optionally embed the local-only result into a markdown note. Use when Codex needs to turn a user's visual request into a saved image artifact, create a note illustration that should stay out of Git by default, or keep OpenAI-generated binaries in git-ignored local storage rather than committing them.
---

# OpenAI Image Generator

Use this skill for repo-local image generation workflows.

Prefer this skill over a generic image tool when the output must land on disk, be referenced from a note, or remain local-only by default.

## Workflow

1. Confirm the target artifact:
- plain image artifact only -> save under `.local/openai-images/`
- image for a note -> save under a sibling `local-assets/openai-images/` directory next to the note so the embed path stays short
- reproducible run -> keep the generated sidecar metadata JSON and optionally pin a snapshot model such as `gpt-image-2-2026-04-21`

2. Confirm credentials before calling the API:
- first choice: `OPENAI_API_KEY`
- fallback: `OPENAI_API_KEY_FILE`
- repo-local fallback: `.env.local` or `.env` containing `OPENAI_API_KEY=...`
- never commit secrets; keep them in ignored env files or a private key file

3. Generate the image with the helper:
- use [scripts/generate_openai_image.py](scripts/generate_openai_image.py)
- default model: `gpt-image-2`
- default quality/size: `medium`, `1024x1024`
- read [references/openai-image-api.md](references/openai-image-api.md) only when you need API details, snapshot guidance, or parameter tuning

4. If the user wants the image embedded in a note:
- save into a sibling `local-assets/openai-images/` path next to the note unless the user explicitly wants another location
- patch the note with the emitted Obsidian embed string, usually `![[local-assets/openai-images/<file>]]`
- mention that the note now depends on a local-only asset and may not render on other machines unless the asset is copied there too

5. Preserve the local-only default:
- do not `git add` generated binaries under `.local/` or `local-assets/` unless the user explicitly asks
- if the user later wants the asset committed, confirm that intent and move or rename the file into a tracked location first

## Quick Commands

Generate one local-only image:

```bash
python3 .agents/skills/openai-image-generator/scripts/generate_openai_image.py \
  --prompt "A clean notebook-style diagram of belief propagation on a tree" \
  --quality medium
```

Generate for a note and then patch the note with the returned embed path:

```bash
python3 .agents/skills/openai-image-generator/scripts/generate_openai_image.py \
  --note topics/probabilistic-graphical-models/live-chats/2026-02-20-live-chat.md \
  --prompt "A hand-drawn style comparison of DGM vs UGM" \
  --quality medium \
  --size 1536x1024
```

Use a prompt file when shell quoting would be messy:

```bash
python3 .agents/skills/openai-image-generator/scripts/generate_openai_image.py \
  --prompt-file /tmp/prompt.txt \
  --note topics/some-topic/lessons/example.md
```

## Note Embedding

When embedding into a note, use the helper's JSON output:

- `output_path` tells you where the image landed
- `relative_asset_path` is the path to use from the note directory
- `obsidian_embed` is ready to paste into the note

Prefer a short block such as:

```md
Generated locally with `gpt-image-2`:

![[local-assets/openai-images/example.png]]
```

Do not hardcode absolute paths into notes.

## Guardrails

- Keep prompts and sidecar metadata together when the image may need to be regenerated.
- If the API rejects a request for safety reasons, report that directly and do not try to route around it.
- If the user wants exact reproducibility, prefer a pinned snapshot model instead of the moving alias.
- If the user only wants a quick visual in-chat and does not need a repo artifact, this skill is optional rather than required.

## Resources

- [scripts/generate_openai_image.py](scripts/generate_openai_image.py): Calls OpenAI's image generation API, saves the image locally, and emits note-ready metadata.
- [references/openai-image-api.md](references/openai-image-api.md): Concise notes on the current OpenAI image model, endpoints, defaults, and failure modes.
