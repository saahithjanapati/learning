# OpenAI Image API Notes

Verified against official OpenAI docs on `2026-04-22`.

Primary docs:
- Guide: `https://developers.openai.com/api/docs/guides/image-generation`
- Model page: `https://developers.openai.com/api/docs/models/gpt-image-2`

## Repo Defaults

- default model: `gpt-image-2`
- exact endpoint used by the helper: `POST /v1/images/generations`
- default local-only output path: `.local/openai-images/`
- default note-adjacent output path: `local-assets/openai-images/`

## When To Use Which Endpoint

- `v1/images/generations`: best default for one-shot prompt-to-image generation saved into this repo
- `v1/images/edits`: use later if you need image inputs or masks
- `v1/responses`: use when image generation is part of a larger tool-using or multi-turn workflow

## Current Model Notes

- `gpt-image-2` is the current default alias on the model page.
- The model page also exposes a snapshot: `gpt-image-2-2026-04-21`.
- If the user wants reproducibility across time, prefer a snapshot over the moving alias.

## Parameters This Skill Supports

- `prompt`
- `model`
- `size`: `1024x1024`, `1024x1536`, `1536x1024`
- `quality`: `low`, `medium`, `high`
- `background`: `auto`, `opaque`, `transparent` when supported by the API
- `output_format`: `png`, `jpeg`, `webp`
- `output_compression`
- `moderation`

## Output Conventions

- The helper writes the binary image plus a sidecar JSON file at `<image>.<ext>.json`.
- The sidecar stores the prompt, revised prompt, model, request settings, and note embed path.
- Keep the sidecar if the image might need to be regenerated or explained later.

## Common Failure Modes

- missing `OPENAI_API_KEY`
- tier/rate-limit errors
- policy rejection or moderation refusal
- unsupported parameter combinations for the chosen model
- note embeds that point to local-only files not present on another machine
