#!/usr/bin/env python3
"""Fetch recent Raindrop.io bookmarks for Learning Machine ingestion."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path
from typing import Any
import urllib.error
import urllib.parse
import urllib.request


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_STATE_PATH = REPO_ROOT / ".local" / "raindrop_ingest_state.json"
DEFAULT_MANIFEST_DIR = REPO_ROOT / "materials" / "source_text" / "raindrop"
API_BASE = "https://api.raindrop.io/rest/v1"


def load_env_file() -> None:
    for env_path in (REPO_ROOT / ".env.local", REPO_ROOT / ".env"):
        if not env_path.exists():
            continue
        for raw_line in env_path.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


def parse_iso(value: str | None) -> datetime | None:
    if not value:
        return None
    normalized = value.strip()
    if normalized.endswith("Z"):
        normalized = normalized[:-1] + "+00:00"
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def request_json(path: str, token: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
    query = f"?{urllib.parse.urlencode(params, doseq=True)}" if params else ""
    request = urllib.request.Request(
        f"{API_BASE}{path}{query}",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
            "User-Agent": "LearningMachine/1.0",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Raindrop API error {error.code}: {detail}") from error


def read_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"seen_ids": []}
    return json.loads(path.read_text(encoding="utf-8"))


def write_state(path: Path, state: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def normalize_item(item: dict[str, Any]) -> dict[str, Any]:
    collection = item.get("collection") or {}
    return {
        "id": item.get("_id"),
        "title": item.get("title") or item.get("excerpt") or item.get("link"),
        "link": item.get("link"),
        "created": item.get("created"),
        "last_update": item.get("lastUpdate"),
        "type": item.get("type"),
        "excerpt": item.get("excerpt"),
        "tags": item.get("tags") or [],
        "collection_id": collection.get("$id"),
        "domain": item.get("domain"),
        "important": item.get("important", False),
    }


def list_collections(token: str) -> int:
    roots = request_json("/collections", token).get("items", [])
    children = request_json("/collections/childrens", token).get("items", [])
    for item in [*roots, *children]:
        parent = item.get("parent", {}).get("$id")
        suffix = f" parent={parent}" if parent else ""
        print(f"{item.get('_id')}\t{item.get('title')}\tcount={item.get('count', 0)}{suffix}")
    return 0


def fetch_recent(args: argparse.Namespace, token: str) -> list[dict[str, Any]]:
    params: dict[str, Any] = {
        "sort": "-created",
        "perpage": min(args.limit, 50),
        "page": args.page,
        "nested": "true" if args.nested else "false",
    }
    if args.search:
        params["search"] = args.search

    payload = request_json(f"/raindrops/{args.collection_id}", token, params)
    items = [normalize_item(item) for item in payload.get("items", [])]

    since = parse_iso(args.since)
    if since:
        items = [
            item
            for item in items
            if parse_iso(item.get("created")) and parse_iso(item.get("created")) >= since
        ]

    state = read_state(args.state_path)
    seen_ids = {str(value) for value in state.get("seen_ids", [])}
    if not args.include_seen:
        items = [item for item in items if str(item.get("id")) not in seen_ids]

    return items[: args.limit]


def write_manifest(items: list[dict[str, Any]], manifest_dir: Path) -> Path:
    manifest_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().astimezone().strftime("%Y%m%d-%H%M%S")
    path = manifest_dir / f"{stamp}-recent-raindrops.json"
    path.write_text(json.dumps(items, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return path


def print_items(items: list[dict[str, Any]], output_format: str) -> None:
    if output_format == "json":
        print(json.dumps(items, indent=2, sort_keys=True))
        return

    if not items:
        print("No new raindrops matched the query.")
        return

    for item in items:
        tags = ", ".join(item["tags"]) if item["tags"] else "none"
        print(f"- [{item['title']}]({item['link']})")
        print(f"  - id: {item['id']}")
        print(f"  - created: {item['created']}")
        print(f"  - collection: {item['collection_id']}")
        print(f"  - tags: {tags}")
        if item.get("excerpt"):
            print(f"  - excerpt: {item['excerpt']}")


def mark_seen(ids: list[str], state_path: Path) -> int:
    state = read_state(state_path)
    seen = {str(value) for value in state.get("seen_ids", [])}
    seen.update(str(value) for value in ids)
    state["seen_ids"] = sorted(
        seen,
        key=lambda value: (0, int(value)) if value.isdigit() else (1, value),
    )
    state["updated_at"] = datetime.now(timezone.utc).isoformat()
    write_state(state_path, state)
    print(f"Marked {len(ids)} raindrop(s) seen in {state_path.relative_to(REPO_ROOT)}.")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--token", help="Raindrop access token. Defaults to RAINDROP_ACCESS_TOKEN.")
    parser.add_argument("--state-path", type=Path, default=DEFAULT_STATE_PATH)

    subparsers = parser.add_subparsers(dest="command", required=True)

    collections = subparsers.add_parser("collections", help="List collection IDs.")
    collections.set_defaults(handler="collections")

    recent = subparsers.add_parser("recent", help="Fetch recent raindrops.")
    recent.add_argument("--collection-id", default=os.environ.get("RAINDROP_COLLECTION_ID", "0"))
    recent.add_argument("--limit", type=int, default=int(os.environ.get("RAINDROP_FETCH_LIMIT", "10")))
    recent.add_argument("--page", type=int, default=0)
    recent.add_argument("--search", default=os.environ.get("RAINDROP_SEARCH", ""))
    recent.add_argument("--since", help="Only include raindrops created at or after this ISO timestamp.")
    recent.add_argument("--nested", action="store_true", help="Include nested collection items.")
    recent.add_argument("--include-seen", action="store_true", help="Include raindrops already in local state.")
    recent.add_argument("--format", choices=("markdown", "json"), default="markdown")
    recent.add_argument("--write-manifest", action="store_true")
    recent.add_argument("--manifest-dir", type=Path, default=DEFAULT_MANIFEST_DIR)
    recent.add_argument("--mark-seen", action="store_true", help="Mark returned raindrops seen after printing.")
    recent.set_defaults(handler="recent")

    seen = subparsers.add_parser("mark-seen", help="Mark raindrop IDs as ingested/seen.")
    seen.add_argument("ids", nargs="+")
    seen.set_defaults(handler="mark_seen")

    return parser


def main() -> int:
    load_env_file()
    parser = build_parser()
    args = parser.parse_args()
    token = args.token or os.environ.get("RAINDROP_ACCESS_TOKEN")
    if not token:
        raise SystemExit("Missing RAINDROP_ACCESS_TOKEN. Add it to .env.local or pass --token.")

    if args.handler == "collections":
        return list_collections(token)
    if args.handler == "mark_seen":
        return mark_seen(args.ids, args.state_path)

    items = fetch_recent(args, token)
    print_items(items, args.format)
    if args.write_manifest:
        path = write_manifest(items, args.manifest_dir)
        print(f"\nmanifest: {path.relative_to(REPO_ROOT)}")
    if args.mark_seen and items:
        mark_seen([str(item["id"]) for item in items], args.state_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
