#!/usr/bin/env python3
"""Save a local-only text extraction for a Learning Machine source."""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys
import urllib.request


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_TEXT_ROOT = REPO_ROOT / "materials" / "source_text"


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def read_bytes(source: str) -> tuple[bytes, str]:
    if re.match(r"https?://", source):
        request = urllib.request.Request(source, headers={"User-Agent": "LearningMachine/1.0"})
        with urllib.request.urlopen(request, timeout=60) as response:
            return response.read(), response.headers.get_content_type()

    path = Path(source).expanduser()
    return path.read_bytes(), ""


def extract_pdf_text(data: bytes) -> str:
    try:
        import fitz
    except ImportError as error:
        raise SystemExit("PyMuPDF is required for PDF extraction. Install/use the repo runtime with fitz available.") from error

    doc = fitz.open(stream=data, filetype="pdf")
    parts: list[str] = []
    for index, page in enumerate(doc, start=1):
        parts.append(f"\n\n--- Page {index} ---\n")
        parts.append(page.get_text("text"))
    return "".join(parts).strip() + "\n"


def decode_text(data: bytes) -> str:
    for encoding in ("utf-8", "utf-16", "latin-1"):
        try:
            return data.decode(encoding).strip() + "\n"
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace").strip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", help="Source URL or local PDF/text file.")
    parser.add_argument("--root", default="ai", help="Root topic under materials/source_text/.")
    parser.add_argument("--slug", required=True, help="Output slug without extension.")
    parser.add_argument("--force", action="store_true", help="Overwrite an existing extraction.")
    args = parser.parse_args()

    root = slugify(args.root)
    slug = slugify(args.slug)
    output_path = SOURCE_TEXT_ROOT / root / f"{slug}.txt"

    if output_path.exists() and not args.force:
        print(f"exists: {output_path.relative_to(REPO_ROOT)}", file=sys.stderr)
        return 1

    data, content_type = read_bytes(args.source)
    is_pdf = (
        content_type == "application/pdf"
        or data.startswith(b"%PDF")
        or args.source.lower().split("?", 1)[0].endswith(".pdf")
    )
    text = extract_pdf_text(data) if is_pdf else decode_text(data)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(text, encoding="utf-8")
    print(output_path.relative_to(REPO_ROOT).as_posix())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
