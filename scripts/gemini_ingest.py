#!/usr/bin/env python3
"""
Gemini-based PDF ingestor for Learning Machine.

Examples:
  python scripts/gemini_ingest.py --root optimization-for-ml
  python scripts/gemini_ingest.py --root optimization-for-ml --include 'March*.pdf'
"""

from __future__ import annotations

import argparse
import base64
from dataclasses import dataclass
import fnmatch
import json
import os
from pathlib import Path
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request

import fitz

try:
    import certifi
except ImportError:  # pragma: no cover - optional dependency
    certifi = None


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INBOX_DIR = REPO_ROOT / "materials" / "inbox"
DEFAULT_PROCESSED_DIR = REPO_ROOT / "materials" / "processed"
REPORT_NAME = "_INGEST_REPORT.md"


@dataclass
class IngestJob:
    canonical_pdf: Path
    duplicate_pdfs: list[Path]
    output_path: Path


@dataclass
class IngestResult:
    source_name: str
    output_name: str
    finish_reason: str
    used_fallback: bool


def _load_env() -> tuple[str, str]:
    for env_name in (".env.local", ".env"):
        env_path = REPO_ROOT / env_name
        if not env_path.exists():
            continue
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    model = os.getenv("GEMINI_INGEST_MODEL", "").strip() or "gemini-2.5-flash"
    if not api_key:
        raise SystemExit("GEMINI_API_KEY missing from .env.local or .env")
    return api_key, model


def _normalize_material_stem(name: str) -> str:
    base = re.sub(r"\s*\(\d+\)$", "", name.strip())
    return re.sub(r"[^a-z0-9]+", "", base.lower())


def _canonical_stem(name: str) -> str:
    return re.sub(r"\s*\(\d+\)$", "", name.strip())


def _clean_model_markdown(text: str) -> str:
    stripped = text.strip()
    if stripped.startswith("```"):
        stripped = re.sub(r"^```[a-zA-Z0-9_-]*\n?", "", stripped)
        stripped = re.sub(r"\n?```$", "", stripped)
    return stripped.strip()


def _clean_page_text(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _gemini_ssl_context() -> ssl.SSLContext | None:
    cafile = os.getenv("SSL_CERT_FILE", "").strip()
    if cafile:
        return ssl.create_default_context(cafile=cafile)
    if certifi is not None:
        return ssl.create_default_context(cafile=certifi.where())
    return None


def _discover_jobs(
    inbox_dir: Path,
    processed_dir: Path,
    include_patterns: list[str],
    overwrite: bool,
) -> tuple[list[IngestJob], list[Path]]:
    grouped: dict[str, list[Path]] = {}
    for pdf in sorted(inbox_dir.glob("*.pdf")):
        if include_patterns and not any(
            fnmatch.fnmatch(pdf.name, pattern) for pattern in include_patterns
        ):
            continue
        grouped.setdefault(_normalize_material_stem(pdf.stem), []).append(pdf)

    jobs: list[IngestJob] = []
    skipped: list[Path] = []

    def canonical_key(path: Path) -> tuple[int, int, str]:
        has_dup_suffix = 1 if re.search(r"\(\d+\)$", path.stem) else 0
        return (has_dup_suffix, len(path.name), path.name.lower())

    for paths in grouped.values():
        ordered = sorted(paths, key=canonical_key)
        canonical_pdf = ordered[0]
        duplicate_pdfs = ordered
        output_name = f"{_canonical_stem(canonical_pdf.stem)}.md"
        output_path = processed_dir / output_name
        if output_path.exists() and not overwrite:
            skipped.append(canonical_pdf)
            continue
        jobs.append(
            IngestJob(
                canonical_pdf=canonical_pdf,
                duplicate_pdfs=duplicate_pdfs,
                output_path=output_path,
            )
        )

    return jobs, skipped


def _build_chunk_pdf_bytes(doc: fitz.Document, start_idx: int, end_idx: int) -> bytes:
    subdoc = fitz.open()
    subdoc.insert_pdf(doc, from_page=start_idx, to_page=end_idx)
    data = subdoc.tobytes(garbage=4, deflate=True)
    subdoc.close()
    return data


def _gemini_chunk_request(
    *,
    api_key: str,
    model: str,
    pdf_name: str,
    total_pages: int,
    start_page: int,
    end_page: int,
    pdf_bytes: bytes,
) -> tuple[str, str]:
    prompt = (
        "You are converting lecture slides into reusable markdown.\n"
        f"Document: {pdf_name}\n"
        f"Absolute page range in this chunk: {start_page}-{end_page} of {total_pages}.\n"
        "Return markdown only.\n"
        "For every page, use exactly this structure:\n"
        "## Page N\n"
        "### Content\n"
        "<content>\n"
        "### Visual Description\n"
        "<visual description>\n"
        "---\n"
        "Rules:\n"
        "- Use absolute page numbers.\n"
        "- Preserve math using $...$ and $$...$$ when possible.\n"
        "- Keep definitions, theorems, proofs, and bullets readable.\n"
        "- If a page is mostly text, write 'Text-only slide.' for the visual description.\n"
        "- If something is unreadable, write '[unreadable]'.\n"
        "- Do not omit any page in the chunk.\n"
    )

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{urllib.parse.quote(model)}:generateContent?key={urllib.parse.quote(api_key)}"
    )
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": "application/pdf",
                            "data": base64.b64encode(pdf_bytes).decode("ascii"),
                        }
                    },
                ],
            }
        ],
        "generationConfig": {
            "temperature": 0.1,
            "maxOutputTokens": 8192,
        },
    }
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(
        request,
        timeout=180,
        context=_gemini_ssl_context(),
    ) as response:
        data = json.loads(response.read().decode("utf-8"))

    candidates = data.get("candidates", [])
    if not candidates:
        raise RuntimeError(f"Gemini returned no candidates for {pdf_name} pages {start_page}-{end_page}")

    candidate = candidates[0]
    parts = candidate.get("content", {}).get("parts", [])
    text = "".join(part.get("text", "") for part in parts).strip()
    if not text:
        raise RuntimeError(f"Gemini returned empty content for {pdf_name} pages {start_page}-{end_page}")

    cleaned = _clean_model_markdown(text)
    if not re.search(r"^## Page \d+\s*$", cleaned, flags=re.MULTILINE):
        raise RuntimeError(
            f"Gemini response missing page headings for {pdf_name} pages {start_page}-{end_page}"
        )

    return cleaned, candidate.get("finishReason", "UNKNOWN")


def _local_chunk_fallback(doc: fitz.Document, start_page: int, end_page: int) -> str:
    sections: list[str] = []
    for page_number in range(start_page, end_page + 1):
        text = _clean_page_text(doc.load_page(page_number - 1).get_text("text") or "")
        if not text:
            text = "[no extractable text]"
        sections.extend(
            [
                f"## Page {page_number}",
                "### Content",
                text,
                "",
                "### Visual Description",
                "Text extraction fallback; original layout not preserved.",
                "",
                "---",
                "",
            ]
        )
    return "\n".join(sections).strip()


def _summarize_finish_reasons(finish_reasons: list[str], used_fallback: bool) -> str:
    if used_fallback and not finish_reasons:
        return "FALLBACK"
    unique = sorted(set(finish_reasons))
    if used_fallback:
        return "MIXED"
    if len(unique) == 1:
        return unique[0]
    return "MIXED"


def _write_transcript(
    *,
    output_path: Path,
    source_path: Path,
    duplicate_pdfs: list[Path],
    model: str,
    used_fallback: bool,
    finish_reason: str,
    total_pages: int,
    sections: list[str],
) -> None:
    extraction_engine = f"Gemini API ({model})"
    if used_fallback:
        extraction_engine += " + Local PyMuPDF (fitz fallback)"

    lines = [
        f"# {output_path.stem}",
        "",
        f"Source: `{source_path.relative_to(REPO_ROOT).as_posix()}`",
        "Duplicate equivalents: "
        + ", ".join(f"`{path.name}`" for path in duplicate_pdfs),
        f"Extraction engine: `{extraction_engine}`",
        "Strategy: `chunked inline-PDF conversion`",
        f"Finish reason: `{finish_reason}`",
        f"Pages: {total_pages}",
        "",
    ]
    lines.extend(sections)
    text = "\n".join(lines).rstrip() + "\n"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(text, encoding="utf-8")


def _update_ingest_report(
    report_path: Path,
    root: str,
    model: str,
    results: list[IngestResult],
) -> None:
    if not results:
        return

    title = f"# {root.replace('-', ' ').title()} Full-PDF Ingest Report"
    model_line = f"Model: `{model}`"
    existing_entries: dict[str, tuple[str, str]] = {}

    if report_path.exists():
        lines = report_path.read_text(encoding="utf-8").splitlines()
        for line in lines:
            if line.startswith("# "):
                title = line
                break
        for line in lines:
            if line.startswith("Model: "):
                model_line = line
                break
        pattern = re.compile(
            r"^- `(?P<src>[^`]+)` -> `(?P<dst>[^`]+)` \(finish: `(?P<finish>[^`]+)`\)$"
        )
        for line in lines:
            match = pattern.match(line)
            if match:
                existing_entries[match.group("src")] = (
                    match.group("dst"),
                    match.group("finish"),
                )

    for result in results:
        existing_entries[result.source_name] = (result.output_name, result.finish_reason)

    sorted_entries = sorted(existing_entries.items(), key=lambda item: item[0].lower())
    report_lines = [
        title,
        "",
        model_line,
        f"Files: {len(sorted_entries)}",
        "",
        "## Files",
        "",
    ]
    for source_name, (output_name, finish_reason) in sorted_entries:
        report_lines.append(
            f"- `{source_name}` -> `{output_name}` (finish: `{finish_reason}`)"
        )
    report_path.write_text("\n".join(report_lines) + "\n", encoding="utf-8")


def _convert_job(
    job: IngestJob,
    *,
    api_key: str,
    model: str,
    chunk_pages: int,
    retries: int,
    sleep_seconds: float,
) -> IngestResult:
    doc = fitz.open(job.canonical_pdf)
    total_pages = doc.page_count
    sections: list[str] = []
    finish_reasons: list[str] = []
    used_fallback = False

    print(f"\nConverting {job.canonical_pdf.name} ({total_pages} pages)", flush=True)

    for start_idx in range(0, total_pages, chunk_pages):
        end_idx = min(start_idx + chunk_pages, total_pages) - 1
        start_page = start_idx + 1
        end_page = end_idx + 1
        pdf_bytes = _build_chunk_pdf_bytes(doc, start_idx, end_idx)

        chunk_text = None
        last_error: Exception | None = None
        for attempt in range(retries):
            try:
                chunk_text, finish_reason = _gemini_chunk_request(
                    api_key=api_key,
                    model=model,
                    pdf_name=job.canonical_pdf.name,
                    total_pages=total_pages,
                    start_page=start_page,
                    end_page=end_page,
                    pdf_bytes=pdf_bytes,
                )
                finish_reasons.append(finish_reason)
                break
            except Exception as exc:  # pragma: no cover - network and model behavior
                last_error = exc
                if attempt < retries - 1:
                    time.sleep(2 + attempt)

        if chunk_text is None:
            used_fallback = True
            print(
                f"  Gemini failed for pages {start_page}-{end_page}; "
                f"using local fallback ({last_error})",
                flush=True,
            )
            chunk_text = _local_chunk_fallback(doc, start_page, end_page)
        else:
            print(f"  converted pages {start_page}-{end_page}", flush=True)

        sections.append(chunk_text.strip())
        if sleep_seconds:
            time.sleep(sleep_seconds)

    finish_reason = _summarize_finish_reasons(finish_reasons, used_fallback)
    _write_transcript(
        output_path=job.output_path,
        source_path=job.canonical_pdf,
        duplicate_pdfs=job.duplicate_pdfs,
        model=model,
        used_fallback=used_fallback,
        finish_reason=finish_reason,
        total_pages=total_pages,
        sections=sections,
    )
    print(f"  wrote {job.output_path.relative_to(REPO_ROOT).as_posix()}", flush=True)
    return IngestResult(
        source_name=job.canonical_pdf.name,
        output_name=job.output_path.name,
        finish_reason=finish_reason,
        used_fallback=used_fallback,
    )


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Convert inbox PDFs into markdown with Gemini.")
    parser.add_argument("--root", required=True, help="Root topic folder under materials/processed/.")
    parser.add_argument(
        "--inbox-dir",
        type=Path,
        default=DEFAULT_INBOX_DIR,
        help="Directory containing source PDFs.",
    )
    parser.add_argument(
        "--processed-dir",
        type=Path,
        default=DEFAULT_PROCESSED_DIR,
        help="Base processed materials directory.",
    )
    parser.add_argument(
        "--include",
        action="append",
        default=[],
        help="Optional glob pattern for limiting which PDFs to ingest.",
    )
    parser.add_argument(
        "--chunk-pages",
        type=int,
        default=8,
        help="Number of PDF pages to send to Gemini per request.",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=3,
        help="Retries per chunk before falling back to local extraction.",
    )
    parser.add_argument(
        "--sleep-seconds",
        type=float,
        default=0.2,
        help="Delay between chunk requests.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing processed markdown for matching stems.",
    )
    return parser


def main() -> int:
    args = _build_parser().parse_args()
    if args.chunk_pages <= 0:
        raise SystemExit("--chunk-pages must be positive")
    if args.retries <= 0:
        raise SystemExit("--retries must be positive")

    inbox_dir = args.inbox_dir.resolve()
    processed_root = args.processed_dir.resolve()
    processed_dir = processed_root / args.root
    processed_dir.mkdir(parents=True, exist_ok=True)

    api_key, model = _load_env()
    jobs, skipped = _discover_jobs(
        inbox_dir=inbox_dir,
        processed_dir=processed_dir,
        include_patterns=args.include,
        overwrite=args.overwrite,
    )

    print(f"Using Gemini model: {model}", flush=True)
    print(f"Inbox directory: {inbox_dir}", flush=True)
    print(f"Processed directory: {processed_dir}", flush=True)
    print(f"Jobs to convert: {len(jobs)}", flush=True)
    if skipped:
        print("Skipping existing transcripts for:", flush=True)
        for path in skipped:
            print(f"  - {path.name}", flush=True)

    results: list[IngestResult] = []
    for job in jobs:
        results.append(
            _convert_job(
                job,
                api_key=api_key,
                model=model,
                chunk_pages=args.chunk_pages,
                retries=args.retries,
                sleep_seconds=args.sleep_seconds,
            )
        )

    _update_ingest_report(
        processed_dir / REPORT_NAME,
        root=args.root,
        model=model,
        results=results,
    )

    fallback_count = sum(1 for result in results if result.used_fallback)
    print("\nIngest summary", flush=True)
    print(f"Converted: {len(results)}", flush=True)
    print(f"Fallbacks: {fallback_count}", flush=True)
    print(f"Skipped existing: {len(skipped)}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
