#!/usr/bin/env python3
"""Generate a local image with OpenAI's image generation API."""

from __future__ import annotations

import argparse
import base64
from datetime import datetime
import json
import os
from pathlib import Path
import re
import sys
from typing import Any
import urllib.error
import urllib.request


SCRIPT_PATH = Path(__file__).resolve()
SKILL_DIR = SCRIPT_PATH.parents[1]
REPO_ROOT = SCRIPT_PATH.parents[4]
DEFAULT_OUTPUT_DIR = REPO_ROOT / ".local" / "openai-images"
DEFAULT_NOTE_ASSET_SUBDIR = Path("local-assets") / "openai-images"
DEFAULT_MODEL = "gpt-image-2"
API_URL = "https://api.openai.com/v1/images/generations"


def _slugify(text: str, max_len: int = 60) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:max_len].rstrip("-") or "image"


def _parse_env_file(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values

    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, raw_value = stripped.split("=", 1)
        value = raw_value.strip().strip('"').strip("'")
        values[key.strip()] = value
    return values


def _read_secret_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8").strip()
    except OSError as exc:
        raise SystemExit(f"Could not read API key file {path}: {exc}") from exc


def _load_api_key(api_key_file: Path | None) -> str:
    if api_key_file:
        key = _read_secret_file(api_key_file)
        if key:
            return key

    env_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if env_key:
        return env_key

    env_key_file = os.environ.get("OPENAI_API_KEY_FILE", "").strip()
    if env_key_file:
        key = _read_secret_file(Path(env_key_file))
        if key:
            return key

    for dotenv_name in (".env.local", ".env"):
        dotenv_values = _parse_env_file(REPO_ROOT / dotenv_name)
        key = dotenv_values.get("OPENAI_API_KEY", "").strip()
        if key:
            return key
        key_file = dotenv_values.get("OPENAI_API_KEY_FILE", "").strip()
        if key_file:
            resolved = Path(key_file)
            if not resolved.is_absolute():
                resolved = (REPO_ROOT / resolved).resolve()
            key = _read_secret_file(resolved)
            if key:
                return key

    raise SystemExit(
        "OPENAI_API_KEY was not found. Set OPENAI_API_KEY, set OPENAI_API_KEY_FILE, "
        "pass --api-key-file, or add OPENAI_API_KEY to .env.local."
    )


def _load_prompt(args: argparse.Namespace) -> str:
    if args.prompt:
        return args.prompt.strip()
    if args.prompt_file:
        return args.prompt_file.read_text(encoding="utf-8").strip()
    raise SystemExit("Pass either --prompt or --prompt-file.")


def _extension_for_format(output_format: str) -> str:
    return {
        "png": ".png",
        "jpeg": ".jpg",
        "webp": ".webp",
    }[output_format]


def _next_available_path(path: Path) -> Path:
    if not path.exists():
        return path
    idx = 2
    while True:
        candidate = path.with_name(f"{path.stem}-{idx}{path.suffix}")
        if not candidate.exists():
            return candidate
        idx += 1


def _resolve_output_path(args: argparse.Namespace, prompt: str) -> tuple[Path, str | None, str | None]:
    extension = _extension_for_format(args.output_format)

    if args.output:
        output_path = args.output
    else:
        if args.output_dir:
            output_dir = args.output_dir
        elif args.note:
            output_dir = args.note.parent / DEFAULT_NOTE_ASSET_SUBDIR
        else:
            output_dir = DEFAULT_OUTPUT_DIR

        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        stem = args.file_stem or f"{timestamp}-{_slugify(prompt)}"
        output_path = output_dir / f"{stem}{extension}"

    output_path = _next_available_path(output_path)

    relative_asset_path: str | None = None
    obsidian_embed: str | None = None
    if args.note:
        relative_asset = Path(os.path.relpath(output_path, start=args.note.parent))
        relative_asset_path = relative_asset.as_posix()
        obsidian_embed = f"![[{relative_asset_path}]]"

    return output_path, relative_asset_path, obsidian_embed


def _http_post_json(url: str, headers: dict[str, str], payload: dict[str, Any], timeout: int) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=body, method="POST")
    for key, value in headers.items():
        request.add_header(key, value)
    request.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(error_body)
            message = json.dumps(parsed, indent=2)
        except json.JSONDecodeError:
            message = error_body
        raise SystemExit(f"OpenAI image request failed with HTTP {exc.code}:\n{message}") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error while calling OpenAI: {exc}") from exc


def _fetch_bytes(url: str, timeout: int) -> bytes:
    request = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read()


def _extract_image_bytes(response_payload: dict[str, Any], timeout: int) -> tuple[bytes, str | None]:
    data = response_payload.get("data")
    if not isinstance(data, list) or not data:
        raise SystemExit("OpenAI response did not include image data.")

    first = data[0]
    if not isinstance(first, dict):
        raise SystemExit("Unexpected image payload structure.")

    revised_prompt = first.get("revised_prompt")
    for field in ("b64_json", "image_base64", "base64"):
        encoded = first.get(field)
        if encoded:
            return base64.b64decode(encoded), revised_prompt

    url = first.get("url")
    if url:
        return _fetch_bytes(url, timeout=timeout), revised_prompt

    raise SystemExit("OpenAI response did not include a supported image payload field.")


def _write_output_files(
    output_path: Path,
    metadata_path: Path,
    image_bytes: bytes,
    metadata: dict[str, Any],
) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(image_bytes)
    metadata_path.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate a local image with OpenAI's image generation API."
    )
    prompt_group = parser.add_mutually_exclusive_group(required=True)
    prompt_group.add_argument("--prompt", help="Prompt text to send to the model.")
    prompt_group.add_argument(
        "--prompt-file",
        type=Path,
        help="Read the prompt from a UTF-8 text file.",
    )
    parser.add_argument("--model", default=DEFAULT_MODEL, help="Model alias or snapshot.")
    parser.add_argument(
        "--api-key-file",
        type=Path,
        help="Optional file containing only the OpenAI API key.",
    )
    parser.add_argument(
        "--note",
        type=Path,
        help="Optional markdown note path. When set, the default output location becomes a sibling local-assets/openai-images directory.",
    )
    parser.add_argument("--output", type=Path, help="Exact output file path.")
    parser.add_argument("--output-dir", type=Path, help="Output directory when --output is not set.")
    parser.add_argument("--file-stem", help="Optional filename stem when the helper chooses the output path.")
    parser.add_argument(
        "--size",
        default="1024x1024",
        choices=["1024x1024", "1024x1536", "1536x1024"],
        help="Image size.",
    )
    parser.add_argument(
        "--quality",
        default="medium",
        choices=["low", "medium", "high"],
        help="Image quality tier.",
    )
    parser.add_argument(
        "--background",
        choices=["auto", "opaque", "transparent"],
        help="Optional background setting supported by the API.",
    )
    parser.add_argument(
        "--output-format",
        default="png",
        choices=["png", "jpeg", "webp"],
        help="Output format.",
    )
    parser.add_argument(
        "--output-compression",
        type=int,
        help="Optional compression level for JPEG or WebP output.",
    )
    parser.add_argument(
        "--moderation",
        choices=["auto", "low"],
        help="Optional moderation level to pass through to the API.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=180,
        help="HTTP timeout in seconds.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the planned request and paths without calling the API.",
    )
    return parser


def main() -> int:
    parser = _build_parser()
    args = parser.parse_args()

    if args.output_compression is not None:
        if not 0 <= args.output_compression <= 100:
            raise SystemExit("--output-compression must be between 0 and 100.")
        if args.output_format == "png":
            raise SystemExit("--output-compression is only useful for jpeg or webp output.")

    prompt = _load_prompt(args)
    output_path, relative_asset_path, obsidian_embed = _resolve_output_path(args, prompt)
    metadata_path = output_path.with_suffix(output_path.suffix + ".json")

    request_payload: dict[str, Any] = {
        "model": args.model,
        "prompt": prompt,
        "size": args.size,
        "quality": args.quality,
        "output_format": args.output_format,
    }
    if args.background:
        request_payload["background"] = args.background
    if args.output_compression is not None:
        request_payload["output_compression"] = args.output_compression
    if args.moderation:
        request_payload["moderation"] = args.moderation

    summary: dict[str, Any] = {
        "model": args.model,
        "output_path": str(output_path),
        "metadata_path": str(metadata_path),
        "note_path": str(args.note) if args.note else None,
        "relative_asset_path": relative_asset_path,
        "obsidian_embed": obsidian_embed,
        "request": request_payload,
        "created": False,
    }

    if args.dry_run:
        print(json.dumps(summary, indent=2))
        return 0

    api_key = _load_api_key(args.api_key_file)
    response_payload = _http_post_json(
        API_URL,
        headers={"Authorization": f"Bearer {api_key}"},
        payload=request_payload,
        timeout=args.timeout,
    )
    image_bytes, revised_prompt = _extract_image_bytes(response_payload, timeout=args.timeout)

    metadata = {
        "created_at": datetime.now().astimezone().replace(microsecond=0).isoformat(),
        "model": args.model,
        "output_path": str(output_path),
        "note_path": str(args.note) if args.note else None,
        "relative_asset_path": relative_asset_path,
        "obsidian_embed": obsidian_embed,
        "prompt": prompt,
        "revised_prompt": revised_prompt,
        "request": request_payload,
        "response_id": response_payload.get("id"),
    }
    _write_output_files(output_path, metadata_path, image_bytes, metadata)

    summary["created"] = True
    summary["revised_prompt"] = revised_prompt
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
