#!/usr/bin/env python3
"""
Learning Machine helper CLI.

Examples:
  python scripts/learning_cli.py --help
  python scripts/learning_cli.py start
  python scripts/learning_cli.py recent-topics --limit 5
  python scripts/learning_cli.py reindex --write-skill-tree
  python scripts/learning_cli.py audit-skills --write-report
  python scripts/learning_cli.py post-ingest
  python scripts/learning_cli.py log-evidence --topic optimization-for-ml --subtopic proximal-gradient --concept indicator-function --event-type doubt --summary "Asked what I_C means in prox-GD." --source-path topics/optimization-for-ml/live-chats/2026-04-14-exam-2-live-chat.md
  python scripts/learning_cli.py evidence-index
  python scripts/learning_cli.py show-evidence --topic optimization-for-ml --limit 10
  python scripts/learning_cli.py reorganize --write-report
  python scripts/learning_cli.py archive-processed --apply
  python scripts/learning_cli.py new-topic --root transformers --topic attention/rope
  python scripts/learning_cli.py merge-topic --from transformers/kv-caching --into transformers/attention
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date, datetime
import json
from pathlib import Path
import re
import shutil
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = REPO_ROOT / "topics"
PUBLIC_SKILLS_DIR = REPO_ROOT / ".agents" / "skills"
INTERNAL_SKILLS_DIR = REPO_ROOT / "skills"
LEARNING_SYSTEM_DIR = REPO_ROOT / "learning_system"
LESSON_INDEX_PATH = LEARNING_SYSTEM_DIR / "LESSON_INDEX.md"
TOPIC_INDEX_PATH = LEARNING_SYSTEM_DIR / "TOPIC_INDEX.md"
SKILL_TREE_PATH = LEARNING_SYSTEM_DIR / "SKILL_TREE.md"
REORG_REPORT_PATH = LEARNING_SYSTEM_DIR / "reorg" / "latest-report.md"
SOURCE_MAP_PATH = LEARNING_SYSTEM_DIR / "SOURCE_MAP.json"
SKILL_CATALOG_REPORT_PATH = LEARNING_SYSTEM_DIR / "SKILL_CATALOG_REPORT.md"
AGENTS_PATH = REPO_ROOT / "AGENTS.md"
MATERIALS_DIR = REPO_ROOT / "materials"
INBOX_DIR = MATERIALS_DIR / "inbox"
PROCESSED_DIR = MATERIALS_DIR / "processed"
ARCHIVE_DIR = MATERIALS_DIR / "archive"
LEARNER_EVIDENCE_DIR = LEARNING_SYSTEM_DIR / "learner_evidence"
EVIDENCE_LOG_PATH = LEARNER_EVIDENCE_DIR / "EVIDENCE_LOG.jsonl"
EVIDENCE_INDEX_PATH = LEARNER_EVIDENCE_DIR / "INDEX.md"
EVIDENCE_TOPIC_DIR = LEARNER_EVIDENCE_DIR / "by_topic"

TOPIC_MARKERS = ("practice", "lessons", "curriculum")


@dataclass
class LessonRow:
    date: str
    topic: str
    lesson: str
    mode: str
    outcome: str
    file_ref: str


@dataclass
class SkillRegistryEntry:
    name: str
    description: str
    rel_path: str


@dataclass
class SkillFileRecord:
    name: str
    description: str
    rel_path: str
    visibility: str


def _normalize_slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _now_local_iso() -> str:
    return datetime.now().astimezone().replace(microsecond=0).isoformat()


def _slugify_label(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def _normalize_material_stem(name: str) -> str:
    """Normalize a source/transcript stem, collapsing duplicate suffixes like ' (1)'."""
    base = re.sub(r"\s*\(\d+\)$", "", name.strip())
    return _normalize_slug(base)


def _next_available_path(dst: Path) -> Path:
    if not dst.exists():
        return dst
    idx = 1
    while True:
        candidate = dst.with_name(f"{dst.stem}__dup{idx}{dst.suffix}")
        if not candidate.exists():
            return candidate
        idx += 1


def _same_file_content(path_a: Path, path_b: Path, chunk_size: int = 1024 * 1024) -> bool:
    """Compare file contents without loading both files fully into memory."""
    try:
        if path_a.stat().st_size != path_b.stat().st_size:
            return False
    except OSError:
        return False

    try:
        with path_a.open("rb") as file_a, path_b.open("rb") as file_b:
            while True:
                chunk_a = file_a.read(chunk_size)
                chunk_b = file_b.read(chunk_size)
                if chunk_a != chunk_b:
                    return False
                if not chunk_a:
                    return True
    except OSError:
        return False


def _topic_rel_from_input(topic_input: str) -> Path:
    topic_input = topic_input.strip().strip("/")
    if topic_input.startswith("topics/"):
        topic_input = topic_input[len("topics/") :]
    return Path(topic_input)


def _discover_topic_paths() -> list[Path]:
    if not TOPICS_DIR.exists():
        return []

    results: list[Path] = []
    for path in TOPICS_DIR.rglob("*"):
        if not path.is_dir():
            continue
        marker_hits = [path / marker for marker in TOPIC_MARKERS]
        if any(p.exists() and p.is_dir() for p in marker_hits):
            results.append(path.relative_to(TOPICS_DIR))
    return sorted(set(results))


def _parse_front_matter(path: Path) -> dict[str, str]:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        return {}

    fields: dict[str, str] = {}
    for line in lines[1:]:
        striped = line.strip()
        if striped == "---":
            break
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip()
    return fields


def _parse_agents_skill_registry() -> tuple[list[SkillRegistryEntry], list[str]]:
    if not AGENTS_PATH.exists():
        return [], ["Missing AGENTS.md."]

    entries: list[SkillRegistryEntry] = []
    malformed: list[str] = []
    in_section = False

    for line in AGENTS_PATH.read_text(encoding="utf-8").splitlines():
        striped = line.strip()
        lower = striped.lower()
        if lower in {"### public skills", "### available skills"}:
            in_section = True
            continue
        if in_section and striped.startswith("### "):
            break
        if not in_section or not striped.startswith("- "):
            continue

        match = re.match(r"- ([^:]+): (.+?) \(file: `([^`]+)`\)\s*$", striped)
        if not match:
            malformed.append(striped)
            continue
        entries.append(
            SkillRegistryEntry(
                name=match.group(1).strip(),
                description=match.group(2).strip(),
                rel_path=match.group(3).strip(),
            )
        )

    if not entries and not malformed:
        malformed.append("No public skill entries found in AGENTS.md.")
    return entries, malformed


def _discover_skill_files() -> list[SkillFileRecord]:
    records: list[SkillFileRecord] = []
    for root in (PUBLIC_SKILLS_DIR, INTERNAL_SKILLS_DIR):
        if not root.exists():
            continue
        for path in sorted(root.rglob("SKILL.md")):
            rel_path = path.relative_to(REPO_ROOT).as_posix()
            front_matter = _parse_front_matter(path)
            records.append(
                SkillFileRecord(
                    name=front_matter.get("name", path.parent.name),
                    description=front_matter.get("description", ""),
                    rel_path=rel_path,
                    visibility=front_matter.get("visibility", "public").lower(),
                )
            )
    return records


def _audit_skill_catalog() -> dict:
    registered, malformed_entries = _parse_agents_skill_registry()
    discovered = _discover_skill_files()
    discovered_by_name = {record.name: record for record in discovered}

    errors: list[str] = []
    warnings: list[str] = []

    for line in malformed_entries:
        errors.append(f"Malformed public-skill registry entry: {line}")

    seen_names: set[str] = set()
    seen_paths: set[str] = set()
    for entry in registered:
        if entry.name in seen_names:
            errors.append(f"Duplicate public skill name in AGENTS.md: {entry.name}")
        else:
            seen_names.add(entry.name)
        if entry.rel_path in seen_paths:
            errors.append(f"Duplicate public skill path in AGENTS.md: {entry.rel_path}")
        else:
            seen_paths.add(entry.rel_path)

        full_path = REPO_ROOT / entry.rel_path
        if not full_path.exists():
            errors.append(f"Registered public skill path does not exist: {entry.rel_path}")
            continue

        front_matter = _parse_front_matter(full_path)
        front_name = front_matter.get("name", full_path.parent.name)
        visibility = front_matter.get("visibility", "public").lower()
        if visibility == "internal":
            errors.append(f"Internal skill is listed as public in AGENTS.md: {entry.name}")
        if front_name != entry.name:
            errors.append(
                f"Registered skill name does not match SKILL.md front matter: {entry.name} != {front_name}"
            )

        expected_rel_path = f".agents/skills/{entry.name}/SKILL.md"
        if entry.rel_path != expected_rel_path:
            warnings.append(
                f"Public skill path is non-canonical for {entry.name}: {entry.rel_path} (expected {expected_rel_path})"
            )

    internal_records: list[SkillFileRecord] = []
    public_records: list[SkillFileRecord] = []
    for record in discovered:
        if record.visibility == "internal":
            internal_records.append(record)
            if record.name in seen_names:
                errors.append(f"Internal skill should not be publicly registered: {record.name}")
            if record.rel_path.startswith(".agents/skills/"):
                errors.append(
                    f"Internal skill should not live under .agents/skills: {record.name}"
                )
            continue

        public_records.append(record)
        if record.name not in seen_names:
            errors.append(
                f"Public skill file exists but is not registered in AGENTS.md: {record.name} ({record.rel_path})"
            )

        expected_rel_path = f".agents/skills/{record.name}/SKILL.md"
        if record.rel_path != expected_rel_path:
            warnings.append(
                f"Skill file path is non-canonical for {record.name}: {record.rel_path} (expected {expected_rel_path})"
            )

    for entry in registered:
        if entry.name not in discovered_by_name:
            errors.append(f"Public skill is registered in AGENTS.md but missing on disk: {entry.name}")

    return {
        "registered": registered,
        "discovered": discovered,
        "public_records": public_records,
        "internal_records": internal_records,
        "errors": errors,
        "warnings": warnings,
    }


def _render_skill_catalog_report(audit: dict) -> str:
    public_skill_count = sum(
        1 for entry in audit["registered"] if (PUBLIC_SKILLS_DIR / entry.name / "SKILL.md").exists()
    )
    lines = [
        "# Skill Catalog Report",
        "",
        f"Generated: {date.today().isoformat()}",
        "",
        "## Summary",
        "",
        f"- Catalog status: {'PASS' if not audit['errors'] else 'FAIL'}",
        f"- Public skills registered in `AGENTS.md`: {len(audit['registered'])}",
        f"- Skill files discovered on disk: {len(audit['discovered'])}",
        f"- Public skills in `.agents/skills`: {public_skill_count}",
        f"- Internal skill files: {len(audit['internal_records'])}",
        f"- Errors: {len(audit['errors'])}",
        f"- Warnings: {len(audit['warnings'])}",
        "",
        "## Public Registry",
        "",
    ]

    if audit["registered"]:
        for entry in audit["registered"]:
            lines.append(f"- `{entry.name}` -> `{entry.rel_path}`")
    else:
        lines.append("- None.")

    lines.extend(["", "## Public Skill Files", ""])
    if audit["registered"]:
        for entry in audit["registered"]:
            public_rel_path = f".agents/skills/{entry.name}/SKILL.md"
            status = "present" if (PUBLIC_SKILLS_DIR / entry.name / "SKILL.md").exists() else "missing"
            lines.append(f"- `{entry.name}` -> `{public_rel_path}` ({status})")
    else:
        lines.append("- None.")

    lines.extend(["", "## Internal Skill Files", ""])
    if audit["internal_records"]:
        for record in audit["internal_records"]:
            lines.append(f"- `{record.name}` -> `{record.rel_path}`")
    else:
        lines.append("- None.")

    lines.extend(["", "## Errors", ""])
    if audit["errors"]:
        for error in audit["errors"]:
            lines.append(f"- {error}")
    else:
        lines.append("- None.")

    lines.extend(["", "## Warnings", ""])
    if audit["warnings"]:
        for warning in audit["warnings"]:
            lines.append(f"- {warning}")
    else:
        lines.append("- None.")

    return "\n".join(lines) + "\n"


def _parse_lesson_index() -> list[LessonRow]:
    if not LESSON_INDEX_PATH.exists():
        return []

    rows: list[LessonRow] = []
    for line in LESSON_INDEX_PATH.read_text(encoding="utf-8").splitlines():
        striped = line.strip()
        if not striped.startswith("|"):
            continue
        if striped.startswith("|---"):
            continue
        cols = [c.strip() for c in striped.strip("|").split("|")]
        if len(cols) != 6:
            continue
        if cols[0].lower() == "date":
            continue
        rows.append(
            LessonRow(
                date=cols[0],
                topic=cols[1],
                lesson=cols[2],
                mode=cols[3],
                outcome=cols[4],
                file_ref=cols[5],
            )
        )
    return rows


def _recent_topic_rows(limit: int) -> list[LessonRow]:
    rows = _parse_lesson_index()
    # Keep file order, assume newest near bottom in index.
    return list(reversed(rows))[:limit]


def _parse_topic_aliases() -> dict[str, str]:
    if not TOPIC_INDEX_PATH.exists():
        return {}

    aliases_by_path: dict[str, str] = {}
    for line in TOPIC_INDEX_PATH.read_text(encoding="utf-8").splitlines():
        striped = line.strip()
        if not striped.startswith("|"):
            continue
        if striped.startswith("|---"):
            continue
        cols = [c.strip() for c in striped.strip("|").split("|")]
        if len(cols) != 4:
            continue
        if cols[0].lower() == "topic key":
            continue
        canonical = cols[2].strip("`")
        aliases_by_path[canonical] = cols[3]
    return aliases_by_path


def _write_topic_index() -> None:
    topic_paths = _discover_topic_paths()
    existing_aliases = _parse_topic_aliases()

    lines = [
        "# Topic Index",
        "",
        "Canonical topic paths and aliases used for matching new requests.",
        "",
        "| Topic Key | Root | Canonical Path | Aliases |",
        "|---|---|---|---|",
    ]
    for rel in topic_paths:
        parts = rel.parts
        if len(parts) < 2:
            continue
        topic_key = parts[-1]
        root = parts[0]
        canonical = f"topics/{rel.as_posix()}"
        aliases = existing_aliases.get(canonical, "")
        lines.append(f"| {topic_key} | {root} | `{canonical}` | {aliases} |")

    TOPIC_INDEX_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _build_tree(paths: Iterable[Path]) -> dict[str, dict]:
    tree: dict[str, dict] = {}
    for rel in paths:
        cur = tree
        for part in rel.parts:
            cur = cur.setdefault(part, {})
    return tree


def _render_tree(tree: dict[str, dict], prefix: str = "") -> list[str]:
    lines: list[str] = []
    names = sorted(tree.keys())
    for idx, name in enumerate(names):
        is_last = idx == len(names) - 1
        branch = "└─ " if is_last else "├─ "
        lines.append(f"{prefix}{branch}{name}")
        child_prefix = f"{prefix}{'   ' if is_last else '│  '}"
        lines.extend(_render_tree(tree[name], child_prefix))
    return lines


def _write_skill_tree() -> None:
    topic_paths = _discover_topic_paths()
    tree = _build_tree(topic_paths)
    tree_lines = _render_tree(tree)
    recent = _recent_topic_rows(limit=5)

    lines = [
        "# Skill Tree",
        "",
        f"Last generated: {date.today().isoformat()}",
        "",
        "Hierarchical topic tree discovered from `topics/` paths.",
        "",
        "```text",
    ]
    if tree_lines:
        lines.extend(tree_lines)
    else:
        lines.append("(no topics found)")
    lines.extend(
        [
            "```",
            "",
            "## Recent Topics",
            "",
        ]
    )
    if recent:
        for row in recent:
            lines.append(f"- {row.topic} -> {row.lesson}")
    else:
        lines.append("- No lessons recorded yet.")

    SKILL_TREE_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _topic_health(rel: Path) -> tuple[list[str], list[str]]:
    topic_dir = TOPICS_DIR / rel
    missing: list[str] = []
    for marker in TOPIC_MARKERS:
        if not (topic_dir / marker).exists():
            missing.append(marker)
    optional_missing: list[str] = []
    if not (topic_dir / "README.md").exists():
        optional_missing.append("README.md")
    return missing, optional_missing


def _write_reorg_report() -> None:
    topic_paths = _discover_topic_paths()
    by_leaf: dict[str, list[Path]] = defaultdict(list)
    for rel in topic_paths:
        by_leaf[_normalize_slug(rel.parts[-1])].append(rel)

    lines = [
        "# Reorganization Report",
        "",
        f"Generated: {date.today().isoformat()}",
        "",
        "## Topic Health",
        "",
    ]
    if not topic_paths:
        lines.append("- No topic paths found.")
    else:
        for rel in topic_paths:
            missing, optional_missing = _topic_health(rel)
            label = f"`topics/{rel.as_posix()}`"
            if not missing and not optional_missing:
                lines.append(f"- {label}: OK")
            else:
                parts = []
                if missing:
                    parts.append(f"missing required dirs: {', '.join(missing)}")
                if optional_missing:
                    parts.append(f"missing recommended files: {', '.join(optional_missing)}")
                lines.append(f"- {label}: " + "; ".join(parts))

    lines += ["", "## Potential Merge Candidates", ""]
    merge_candidates = 0
    for _, rels in sorted(by_leaf.items()):
        if len(rels) > 1:
            merge_candidates += 1
            human = ", ".join(f"`topics/{r.as_posix()}`" for r in sorted(rels))
            lines.append(f"- Similar leaf names: {human}")
    if merge_candidates == 0:
        lines.append("- None detected by simple name normalization.")

    _ensure_dir(REORG_REPORT_PATH.parent)
    REORG_REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _parse_transcript_header(transcript_path: Path) -> tuple[str | None, list[str]]:
    source_pdf: str | None = None
    duplicate_equivalents: list[str] = []
    try:
        lines = transcript_path.read_text(encoding="utf-8").splitlines()[:20]
    except OSError:
        return source_pdf, duplicate_equivalents

    for line in lines:
        if line.startswith("Source: "):
            m = re.search(r"`([^`]+)`", line)
            if m:
                source_pdf = m.group(1)
        if line.startswith("Duplicate equivalents:"):
            duplicate_equivalents = re.findall(r"`([^`]+)`", line)
    return source_pdf, duplicate_equivalents


def _discover_transcript_metadata() -> dict[str, dict]:
    processed_root = REPO_ROOT / "materials" / "processed"
    if not processed_root.exists():
        return {}

    metadata: dict[str, dict] = {}
    for class_dir in sorted(p for p in processed_root.iterdir() if p.is_dir()):
        ingest_report = class_dir / "_INGEST_REPORT.md"
        ingest_report_rel = (
            ingest_report.relative_to(REPO_ROOT).as_posix() if ingest_report.exists() else None
        )
        for transcript in sorted(class_dir.glob("*.md")):
            if transcript.name == "_INGEST_REPORT.md":
                continue
            source_pdf, duplicate_equivalents = _parse_transcript_header(transcript)
            rel = transcript.relative_to(REPO_ROOT).as_posix()
            metadata[rel] = {
                "transcript_path": rel,
                "root_topic": class_dir.name,
                "source_pdf": source_pdf,
                "duplicate_equivalents": duplicate_equivalents,
                "ingest_report": ingest_report_rel,
            }
    return metadata


def _parse_curriculum_sources(curriculum_path: Path) -> tuple[list[str], list[str]]:
    if not curriculum_path.exists():
        return [], []

    text = curriculum_path.read_text(encoding="utf-8")
    source_materials = sorted(
        {
            hit
            for hit in re.findall(r"`([^`]+)`", text)
            if hit.endswith(".md")
            and not hit.startswith("topics/")
            and not hit.startswith("learning_system/")
        }
    )

    anchors: list[str] = []
    in_anchor_section = False
    for line in text.splitlines():
        if line.startswith("## "):
            in_anchor_section = line.strip().lower() == "## transcript anchors"
            continue
        if in_anchor_section and line.startswith("- "):
            anchors.append(line[2:].strip())

    return source_materials, anchors


def _write_source_map() -> dict:
    topic_paths = _discover_topic_paths()
    transcript_meta = _discover_transcript_metadata()
    transcript_paths_by_name: dict[str, list[str]] = defaultdict(list)
    for path in sorted(transcript_meta):
        transcript_paths_by_name[Path(path).name].append(path)
    topic_entries: list[dict] = []
    topics_by_root: dict[str, list[dict]] = defaultdict(list)
    unresolved_paths: set[str] = set()

    for rel in topic_paths:
        topic_dir = TOPICS_DIR / rel
        curriculum_dir = topic_dir / "curriculum"
        curriculum_paths = sorted(
            [p.relative_to(REPO_ROOT).as_posix() for p in curriculum_dir.glob("*.md")]
        ) if curriculum_dir.exists() else []
        readme_path = topic_dir / "README.md"
        source_materials_set: set[str] = set()
        unresolved: list[str] = []
        transcript_anchor_list: list[str] = []
        for curriculum_rel in curriculum_paths:
            sources, anchors = _parse_curriculum_sources(REPO_ROOT / curriculum_rel)
            for source_ref in sources:
                if source_ref in transcript_meta:
                    source_materials_set.add(source_ref)
                    continue
                if source_ref.startswith("materials/processed/"):
                    unresolved.append(source_ref)
                    continue
                candidates = transcript_paths_by_name.get(source_ref, [])
                if len(candidates) == 1:
                    source_materials_set.add(candidates[0])
                else:
                    unresolved.append(source_ref)
            transcript_anchor_list.extend(anchors)
        source_materials = sorted(source_materials_set)
        transcript_anchors = list(dict.fromkeys(transcript_anchor_list))
        source_pdfs = sorted(
            {
                transcript_meta[path]["source_pdf"]
                for path in source_materials
                if path in transcript_meta and transcript_meta[path].get("source_pdf")
            }
        )
        unresolved = sorted(set(unresolved))
        unresolved_paths.update(unresolved)

        entry = {
            "topic_path": f"topics/{rel.as_posix()}",
            "root_topic": rel.parts[0] if rel.parts else "",
            "topic_key": rel.parts[-1] if rel.parts else "",
            "readme_path": readme_path.relative_to(REPO_ROOT).as_posix()
            if readme_path.exists()
            else None,
            "curriculum_path": curriculum_paths[0] if curriculum_paths else None,
            "curriculum_paths": curriculum_paths,
            "source_materials": source_materials,
            "source_pdfs": source_pdfs,
            "transcript_anchors": transcript_anchors,
            "unresolved_source_materials": unresolved,
        }
        topic_entries.append(entry)
        if rel.parts:
            topics_by_root[rel.parts[0]].append(entry)

    root_entries: list[dict] = []
    for root in sorted(topics_by_root):
        materials_index = TOPICS_DIR / root / "materials" / "INDEX.md"
        processed_dir = REPO_ROOT / "materials" / "processed" / root
        root_entries.append(
            {
                "root_topic": root,
                "processed_material_dir": processed_dir.relative_to(REPO_ROOT).as_posix()
                if processed_dir.exists()
                else None,
                "materials_index_path": materials_index.relative_to(REPO_ROOT).as_posix()
                if materials_index.exists()
                else None,
                "topic_count": len(topics_by_root[root]),
                "topics": sorted(topics_by_root[root], key=lambda x: x["topic_path"]),
            }
        )

    payload = {
        "schema_version": "1.0",
        "generated_on": date.today().isoformat(),
        "generated_by": "scripts/learning_cli.py source-map",
        "roots": root_entries,
        "transcripts": sorted(transcript_meta.values(), key=lambda x: x["transcript_path"]),
        "unresolved_source_materials": sorted(unresolved_paths),
    }
    SOURCE_MAP_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    return payload


def _rewrite_transcript_source_paths(path_map: dict[str, str], apply: bool) -> list[str]:
    if not path_map:
        return []
    if not PROCESSED_DIR.exists():
        return []

    updated_transcripts: list[str] = []
    for transcript in sorted(PROCESSED_DIR.rglob("*.md")):
        if transcript.name == "_INGEST_REPORT.md":
            continue
        text = transcript.read_text(encoding="utf-8")
        lines = text.splitlines()
        changed = False
        for idx, line in enumerate(lines):
            if not line.startswith("Source: "):
                continue
            m = re.search(r"`([^`]+)`", line)
            if not m:
                break
            old_path = m.group(1)
            if old_path not in path_map:
                break
            new_path = path_map[old_path]
            lines[idx] = line.replace(f"`{old_path}`", f"`{new_path}`")
            changed = True
            break

        if changed:
            updated_transcripts.append(transcript.relative_to(REPO_ROOT).as_posix())
            if apply:
                trailing_newline = text.endswith("\n")
                updated_text = "\n".join(lines) + ("\n" if trailing_newline else "")
                transcript.write_text(updated_text, encoding="utf-8")

    return updated_transcripts


def _archive_processed_pdfs(apply: bool) -> dict:
    if not INBOX_DIR.exists():
        return {
            "matched": 0,
            "moved": [],
            "removed_duplicates": [],
            "rewritten_transcripts": [],
            "source_path_map": {},
        }

    processed_stems = {
        _normalize_material_stem(md.stem)
        for md in PROCESSED_DIR.rglob("*.md")
        if md.name != "_INGEST_REPORT.md"
    } if PROCESSED_DIR.exists() else set()

    matched_pdfs = [
        pdf
        for pdf in sorted(INBOX_DIR.rglob("*.pdf"))
        if _normalize_material_stem(pdf.stem) in processed_stems
    ]

    moved: list[tuple[str, str]] = []
    removed_duplicates: list[tuple[str, str]] = []
    source_path_map: dict[str, str] = {}

    for src in matched_pdfs:
        old_rel = src.relative_to(REPO_ROOT).as_posix()
        desired_dst = ARCHIVE_DIR / src.relative_to(INBOX_DIR)
        final_dst = desired_dst

        if desired_dst.exists() and not _same_file_content(src, desired_dst):
            final_dst = _next_available_path(desired_dst)

        new_rel = final_dst.relative_to(REPO_ROOT).as_posix()
        source_path_map[old_rel] = new_rel

        if not apply:
            moved.append((old_rel, new_rel))
            continue

        _ensure_dir(final_dst.parent)
        if desired_dst.exists() and final_dst == desired_dst and _same_file_content(src, desired_dst):
            src.unlink()
            removed_duplicates.append((old_rel, new_rel))
            continue

        shutil.move(str(src), str(final_dst))
        moved.append((old_rel, new_rel))

    rewritten_transcripts = _rewrite_transcript_source_paths(source_path_map, apply=apply)

    return {
        "matched": len(matched_pdfs),
        "moved": moved,
        "removed_duplicates": removed_duplicates,
        "rewritten_transcripts": rewritten_transcripts,
        "source_path_map": source_path_map,
    }


def _create_topic(root: str, topic_path: str) -> Path:
    root_clean = _normalize_slug(root)
    topic_rel = _topic_rel_from_input(topic_path)
    if not root_clean:
        raise ValueError("Root must contain at least one alphanumeric character.")
    if not topic_rel.parts:
        raise ValueError("Topic path cannot be empty.")

    full_rel = Path(root_clean) / topic_rel
    topic_dir = TOPICS_DIR / full_rel
    for marker in TOPIC_MARKERS:
        _ensure_dir(topic_dir / marker)

    readme_path = topic_dir / "README.md"
    if not readme_path.exists():
        readme_path.write_text(
            "\n".join(
                [
                    f"# Topic: {topic_rel.parts[-1]}",
                    "",
                    f"Path: `topics/{full_rel.as_posix()}`",
                    "",
                    "## Scope",
                    "",
                    "- ",
                    "",
                    "## Structure",
                    "",
                    "- `curriculum/`",
                    "- `lessons/`",
                    "- `practice/`",
                ]
            )
            + "\n",
            encoding="utf-8",
        )

    curriculum_path = topic_dir / "curriculum" / "0-to-1-plan.md"
    if not curriculum_path.exists():
        curriculum_path.write_text(
            "\n".join(
                [
                    f"# {topic_rel.parts[-1]} 0 -> 1 Curriculum",
                    "",
                    f"Topic Path: `topics/{full_rel.as_posix()}`",
                    "",
                    "## Source Trace",
                    "",
                    "- Canonical manifest: `learning_system/SOURCE_MAP.json`",
                    "- Transcript links: fill in `## Source Materials` below.",
                    "",
                    "## Source Materials",
                    "",
                    "- ",
                    "",
                    "## Transcript Anchors",
                    "",
                    "- ",
                    "",
                    "## Outcome",
                    "",
                    "- ",
                    "",
                    "## Modules",
                    "",
                    "1. ",
                    "2. ",
                    "3. ",
                ]
            )
            + "\n",
            encoding="utf-8",
        )

    return full_rel


def _iter_files_recursive(path: Path) -> Iterable[Path]:
    for p in sorted(path.rglob("*")):
        if p.is_file():
            yield p


def _merge_topics(src_rel: Path, dst_rel: Path, apply: bool) -> tuple[list[tuple[Path, Path]], list[tuple[Path, Path]]]:
    src_dir = TOPICS_DIR / src_rel
    dst_dir = TOPICS_DIR / dst_rel
    if not src_dir.exists():
        raise ValueError(f"Source topic does not exist: topics/{src_rel.as_posix()}")
    if not dst_dir.exists():
        raise ValueError(f"Destination topic does not exist: topics/{dst_rel.as_posix()}")
    if src_dir.resolve() == dst_dir.resolve():
        raise ValueError("Source and destination topics are the same.")

    moves: list[tuple[Path, Path]] = []
    conflicts: list[tuple[Path, Path]] = []

    for src_file in _iter_files_recursive(src_dir):
        rel_file = src_file.relative_to(src_dir)
        dst_file = dst_dir / rel_file
        if dst_file.exists():
            conflicts.append((src_file, dst_file))
        else:
            moves.append((src_file, dst_file))

    if apply:
        for _, dst_file in moves:
            _ensure_dir(dst_file.parent)
        for src_file, dst_file in moves:
            shutil.move(str(src_file), str(dst_file))

        # Remove empty source directories bottom-up.
        for p in sorted(src_dir.rglob("*"), reverse=True):
            if p.is_dir():
                try:
                    p.rmdir()
                except OSError:
                    pass
        try:
            src_dir.rmdir()
        except OSError:
            pass

    return moves, conflicts


def _load_evidence_entries() -> list[dict]:
    if not EVIDENCE_LOG_PATH.exists():
        return []

    entries: list[dict] = []
    for line in EVIDENCE_LOG_PATH.read_text(encoding="utf-8").splitlines():
        striped = line.strip()
        if not striped:
            continue
        entries.append(json.loads(striped))
    return entries


def _sort_evidence_entries(entries: Iterable[dict]) -> list[dict]:
    return sorted(
        entries,
        key=lambda entry: (
            entry.get("observed_at") or "",
            entry.get("logged_at") or "",
            entry.get("id") or "",
        ),
        reverse=True,
    )


def _append_evidence_entry(entry: dict) -> None:
    _ensure_dir(LEARNER_EVIDENCE_DIR)
    _ensure_dir(EVIDENCE_TOPIC_DIR)
    with EVIDENCE_LOG_PATH.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry, sort_keys=True) + "\n")


def _render_evidence_index(entries: list[dict]) -> str:
    by_topic: dict[str, list[dict]] = defaultdict(list)
    concept_counts: Counter[str] = Counter()
    state_counts: Counter[str] = Counter()
    type_counts: Counter[str] = Counter()

    for entry in entries:
        topic = entry.get("topic") or "unknown"
        by_topic[topic].append(entry)
        state_counts[entry.get("review_state") or "unknown"] += 1
        type_counts[entry.get("event_type") or "unknown"] += 1
        for concept in entry.get("concept_tags") or []:
            concept_counts[concept] += 1

    lines = [
        "# Learner Evidence Index",
        "",
        "Concept-level evidence about doubts, incorrect answers, and recurring confusion.",
        "",
        f"Generated: {_now_local_iso()}",
        "",
        "## Summary",
        "",
        f"- Total evidence entries: {len(entries)}",
        f"- Topics with evidence: {len(by_topic)}",
        f"- Event types: " + (", ".join(f"`{k}`={v}" for k, v in sorted(type_counts.items())) if type_counts else "none"),
        f"- Review states: " + (", ".join(f"`{k}`={v}" for k, v in sorted(state_counts.items())) if state_counts else "none"),
        "",
        "## Topics",
        "",
        "| Topic | Entries | Last Seen | Topic File |",
        "|---|---:|---|---|",
    ]

    for topic, topic_entries in sorted(by_topic.items()):
        last_seen = max((entry.get("observed_at") or "" for entry in topic_entries), default="")
        topic_slug = _slugify_label(topic) or "unknown"
        topic_rel = f"by_topic/{topic_slug}.md"
        lines.append(f"| `{topic}` | {len(topic_entries)} | {last_seen} | [{topic_rel}]({topic_rel}) |")

    lines.extend(["", "## Most Frequent Concepts", ""])
    if concept_counts:
        for concept, count in concept_counts.most_common(20):
            lines.append(f"- `{concept}`: {count}")
    else:
        lines.append("- None yet.")

    lines.extend(["", "## Recent Evidence", ""])
    if entries:
        for entry in _sort_evidence_entries(entries)[:20]:
            subtopic = entry.get("subtopic") or "general"
            summary = entry.get("summary") or ""
            lines.append(
                f"- {entry.get('observed_at', '')} | `{entry.get('topic', 'unknown')}` / `{subtopic}` | "
                f"`{entry.get('event_type', 'unknown')}` / `{entry.get('review_state', 'unknown')}` | {summary}"
            )
    else:
        lines.append("- None yet.")

    return "\n".join(lines) + "\n"


def _render_topic_evidence_page(topic: str, entries: list[dict]) -> str:
    topic_entries = [entry for entry in entries if entry.get("topic") == topic]
    topic_entries = _sort_evidence_entries(topic_entries)
    concept_stats: dict[str, dict] = defaultdict(
        lambda: {"count": 0, "last_seen": "", "event_types": Counter(), "review_states": Counter()}
    )

    for entry in topic_entries:
        observed_at = entry.get("observed_at") or ""
        for concept in entry.get("concept_tags") or ["untagged"]:
            stats = concept_stats[concept]
            stats["count"] += 1
            stats["last_seen"] = max(stats["last_seen"], observed_at)
            stats["event_types"][entry.get("event_type") or "unknown"] += 1
            stats["review_states"][entry.get("review_state") or "unknown"] += 1

    lines = [
        f"# Learner Evidence: {topic}",
        "",
        f"Generated: {_now_local_iso()}",
        "",
        f"Source log: [{EVIDENCE_LOG_PATH.name}](../{EVIDENCE_LOG_PATH.name})",
        "",
        "## Concept Summary",
        "",
        "| Concept | Entries | Last Seen | Event Types | Review States |",
        "|---|---:|---|---|---|",
    ]

    for concept, stats in sorted(concept_stats.items(), key=lambda kv: (-kv[1]["count"], kv[0])):
        type_summary = ", ".join(f"`{k}`={v}" for k, v in sorted(stats["event_types"].items()))
        state_summary = ", ".join(f"`{k}`={v}" for k, v in sorted(stats["review_states"].items()))
        lines.append(
            f"| `{concept}` | {stats['count']} | {stats['last_seen']} | {type_summary or 'n/a'} | {state_summary or 'n/a'} |"
        )

    lines.extend(["", "## Recent Entries", ""])
    if topic_entries:
        for entry in topic_entries[:50]:
            concepts = ", ".join(f"`{c}`" for c in (entry.get("concept_tags") or ["untagged"]))
            lines.extend(
                [
                    f"### {entry.get('observed_at', '')} | {entry.get('subtopic') or 'general'}",
                    "",
                    f"- Event type: `{entry.get('event_type', 'unknown')}`",
                    f"- Review state: `{entry.get('review_state', 'unknown')}`",
                    f"- Concepts: {concepts}",
                    f"- Summary: {entry.get('summary') or ''}",
                ]
            )
            if entry.get("learner_signal"):
                lines.append(f"- Learner evidence: {entry['learner_signal']}")
            if entry.get("assistant_response_summary"):
                lines.append(f"- Assistant response: {entry['assistant_response_summary']}")
            if entry.get("source_path"):
                source_line = f"- Source: `{entry['source_path']}`"
                if entry.get("source_turn"):
                    source_line += f" ({entry['source_turn']})"
                lines.append(source_line)
            if entry.get("timestamp_precision") and entry["timestamp_precision"] != "exact":
                lines.append(f"- Timestamp precision: `{entry['timestamp_precision']}`")
            lines.append("")
    else:
        lines.append("- None yet.")

    return "\n".join(lines) + "\n"


def _write_evidence_indexes(entries: list[dict] | None = None) -> None:
    if entries is None:
        entries = _load_evidence_entries()
    _ensure_dir(LEARNER_EVIDENCE_DIR)
    _ensure_dir(EVIDENCE_TOPIC_DIR)

    sorted_entries = _sort_evidence_entries(entries)
    EVIDENCE_INDEX_PATH.write_text(_render_evidence_index(sorted_entries), encoding="utf-8")

    by_topic: dict[str, list[dict]] = defaultdict(list)
    for entry in sorted_entries:
        by_topic[entry.get("topic") or "unknown"].append(entry)

    for topic, topic_entries in by_topic.items():
        topic_slug = _slugify_label(topic) or "unknown"
        topic_path = EVIDENCE_TOPIC_DIR / f"{topic_slug}.md"
        topic_path.write_text(_render_topic_evidence_page(topic, topic_entries), encoding="utf-8")


def cmd_log_evidence(args: argparse.Namespace) -> None:
    observed_at = args.observed_at or _now_local_iso()
    logged_at = _now_local_iso()
    concept_tags = list(dict.fromkeys(_slugify_label(tag) for tag in (args.concept or []) if tag.strip()))
    topic_slug = _slugify_label(args.topic) or "unknown-topic"
    subtopic_slug = _slugify_label(args.subtopic) if args.subtopic else "general"
    concept_slug = concept_tags[0] if concept_tags else "untagged"
    id_timestamp = re.sub(r"[^0-9]", "", observed_at)[:14] or re.sub(r"[^0-9]", "", logged_at)[:14]

    entry = {
        "id": f"{id_timestamp}-{topic_slug}-{subtopic_slug}-{concept_slug}",
        "observed_at": observed_at,
        "logged_at": logged_at,
        "timestamp_precision": args.timestamp_precision,
        "topic": args.topic,
        "subtopic": args.subtopic,
        "concept_tags": concept_tags,
        "event_type": args.event_type,
        "review_state": args.review_state,
        "summary": args.summary,
        "learner_signal": args.learner_signal,
        "assistant_response_summary": args.assistant_response_summary,
        "source_path": args.source_path,
        "source_turn": args.source_turn,
    }

    _append_evidence_entry(entry)
    entries = _load_evidence_entries()
    _write_evidence_indexes(entries)

    print(f"Logged evidence: {entry['id']}")
    print(f"Observed at: {entry['observed_at']} ({entry['timestamp_precision']})")
    print(f"Topic: {entry['topic']}")
    if entry.get("subtopic"):
        print(f"Subtopic: {entry['subtopic']}")
    if entry.get("concept_tags"):
        print("Concepts: " + ", ".join(entry["concept_tags"]))
    print(f"Event type: {entry['event_type']}")
    print(f"Review state: {entry['review_state']}")
    print(f"Updated: {EVIDENCE_LOG_PATH.relative_to(REPO_ROOT)}")
    print(f"Updated: {EVIDENCE_INDEX_PATH.relative_to(REPO_ROOT)}")
    print(f"Updated: {EVIDENCE_TOPIC_DIR.relative_to(REPO_ROOT)}/{_slugify_label(entry['topic']) or 'unknown'}.md")


def cmd_evidence_index(args: argparse.Namespace) -> None:
    entries = _load_evidence_entries()
    _write_evidence_indexes(entries)
    print(f"Updated: {EVIDENCE_INDEX_PATH.relative_to(REPO_ROOT)}")
    print(f"Entries indexed: {len(entries)}")


def cmd_show_evidence(args: argparse.Namespace) -> None:
    entries = _sort_evidence_entries(_load_evidence_entries())
    if args.topic:
        entries = [entry for entry in entries if entry.get("topic") == args.topic]
    if args.subtopic:
        entries = [entry for entry in entries if entry.get("subtopic") == args.subtopic]
    if args.event_type:
        entries = [entry for entry in entries if entry.get("event_type") == args.event_type]
    if args.review_state:
        entries = [entry for entry in entries if entry.get("review_state") == args.review_state]
    if args.concept:
        wanted = _slugify_label(args.concept)
        entries = [entry for entry in entries if wanted in (entry.get("concept_tags") or [])]

    if not entries:
        print("No matching evidence entries found.")
        return

    for entry in entries[: args.limit]:
        concepts = ", ".join(entry.get("concept_tags") or ["untagged"])
        print(
            f"{entry.get('observed_at', '')} | {entry.get('topic', 'unknown')} / {entry.get('subtopic') or 'general'} | "
            f"{entry.get('event_type', 'unknown')} / {entry.get('review_state', 'unknown')} | {concepts}"
        )
        print(f"  summary: {entry.get('summary') or ''}")
        if entry.get("source_path"):
            turn = f" ({entry['source_turn']})" if entry.get("source_turn") else ""
            print(f"  source: {entry['source_path']}{turn}")


def cmd_start(args: argparse.Namespace) -> None:
    recent = _recent_topic_rows(limit=args.limit)
    print("Learning Repo Startup")
    print("")
    print("Available actions:")
    print("- Learn mode: ask for explanations and walkthroughs")
    print("- Practice mode: ask for drills in a requested style")
    print("- In-depth mode: deep dive with prior-session adaptation")
    print("- Materials mode: convert uploaded PDFs to markdown and build lessons")
    print("- Evidence mode: log concept-level doubts, mistakes, and recurring confusion")
    print("- Maintenance mode: reindex topics, regenerate skill tree, generate reorg report")
    print("")
    print("Suggested commands:")
    print("- python scripts/learning_cli.py recent-topics --limit 5")
    print("- python scripts/learning_cli.py reindex --write-skill-tree")
    print("- python scripts/learning_cli.py show-evidence --limit 10")
    print("- python scripts/learning_cli.py post-ingest")
    print("- python scripts/learning_cli.py reorganize --write-report")
    print("")
    print("Most recently reviewed topics:")
    if not recent:
        print("- None yet.")
    else:
        for idx, row in enumerate(recent, start=1):
            print(f"{idx}. {row.topic} ({row.date}) -> {row.lesson}")
    print("")
    print("Would you like to resume one of these topics?")


def cmd_recent_topics(args: argparse.Namespace) -> None:
    recent = _recent_topic_rows(limit=args.limit)
    if not recent:
        print("No lessons found in learning_system/LESSON_INDEX.md")
        return
    for idx, row in enumerate(recent, start=1):
        print(f"{idx}. {row.topic} | {row.date} | {row.lesson} | {row.file_ref}")


def cmd_reindex(args: argparse.Namespace) -> None:
    _write_topic_index()
    print(f"Updated: {TOPIC_INDEX_PATH.relative_to(REPO_ROOT)}")
    if args.write_skill_tree:
        _write_skill_tree()
        print(f"Updated: {SKILL_TREE_PATH.relative_to(REPO_ROOT)}")
    if args.write_source_map:
        payload = _write_source_map()
        unresolved_count = len(payload.get("unresolved_source_materials", []))
        print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")
        if unresolved_count:
            print(f"Warning: {unresolved_count} unresolved source-material paths in curricula.")


def cmd_skill_tree(args: argparse.Namespace) -> None:
    _write_skill_tree()
    print(f"Updated: {SKILL_TREE_PATH.relative_to(REPO_ROOT)}")


def cmd_reorganize(args: argparse.Namespace) -> None:
    _write_reorg_report()
    print(f"Generated: {REORG_REPORT_PATH.relative_to(REPO_ROOT)}")
    if not args.write_report:
        print("Tip: run with --write-report to keep this report for later reference.")


def cmd_new_topic(args: argparse.Namespace) -> None:
    rel = _create_topic(args.root, args.topic)
    print(f"Created/updated topic: topics/{rel.as_posix()}")
    _write_topic_index()
    _write_source_map()
    if args.write_skill_tree:
        _write_skill_tree()
        print(f"Updated: {SKILL_TREE_PATH.relative_to(REPO_ROOT)}")
    print(f"Updated: {TOPIC_INDEX_PATH.relative_to(REPO_ROOT)}")
    print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")


def cmd_merge_topic(args: argparse.Namespace) -> None:
    src_rel = _topic_rel_from_input(args.from_topic)
    dst_rel = _topic_rel_from_input(args.into_topic)
    moves, conflicts = _merge_topics(src_rel, dst_rel, apply=args.apply)

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"[{mode}] merge topics")
    print(f"from: topics/{src_rel.as_posix()}")
    print(f"into: topics/{dst_rel.as_posix()}")
    print(f"movable files: {len(moves)}")
    print(f"conflicts: {len(conflicts)}")
    if moves:
        print("first moves:")
        for src_file, dst_file in moves[:10]:
            print(f"- {src_file.relative_to(REPO_ROOT)} -> {dst_file.relative_to(REPO_ROOT)}")
        if len(moves) > 10:
            print(f"- ... ({len(moves) - 10} more)")
    if conflicts:
        print("first conflicts:")
        for src_file, dst_file in conflicts[:10]:
            print(f"- {src_file.relative_to(REPO_ROOT)} X {dst_file.relative_to(REPO_ROOT)}")
        if len(conflicts) > 10:
            print(f"- ... ({len(conflicts) - 10} more)")

    if args.apply:
        _write_topic_index()
        _write_skill_tree()
        _write_source_map()
        print(f"Updated: {TOPIC_INDEX_PATH.relative_to(REPO_ROOT)}")
        print(f"Updated: {SKILL_TREE_PATH.relative_to(REPO_ROOT)}")
        print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")


def cmd_source_map(args: argparse.Namespace) -> None:
    payload = _write_source_map()
    unresolved_count = len(payload.get("unresolved_source_materials", []))
    print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")
    print(f"Topics indexed: {sum(root['topic_count'] for root in payload['roots'])}")
    print(f"Transcripts indexed: {len(payload.get('transcripts', []))}")
    if unresolved_count:
        print(f"Unresolved source-material paths: {unresolved_count}")


def cmd_audit_skills(args: argparse.Namespace) -> None:
    audit = _audit_skill_catalog()
    report = _render_skill_catalog_report(audit)

    if args.write_report:
        SKILL_CATALOG_REPORT_PATH.write_text(report, encoding="utf-8")
        print(f"Updated: {SKILL_CATALOG_REPORT_PATH.relative_to(REPO_ROOT)}")

    print(f"Catalog status: {'PASS' if not audit['errors'] else 'FAIL'}")
    print(f"Public skills registered: {len(audit['registered'])}")
    print(f"Skill files discovered: {len(audit['discovered'])}")
    print(f"Internal skill files: {len(audit['internal_records'])}")
    print(f"Errors: {len(audit['errors'])}")
    print(f"Warnings: {len(audit['warnings'])}")

    for error in audit["errors"]:
        print(f"ERROR: {error}")
    for warning in audit["warnings"]:
        print(f"WARNING: {warning}")

    if audit["errors"]:
        raise SystemExit(1)


def cmd_archive_processed(args: argparse.Namespace) -> None:
    summary = _archive_processed_pdfs(apply=args.apply)
    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"[{mode}] archive processed PDFs from inbox")
    print(f"matched inbox PDFs: {summary['matched']}")
    print(f"planned/moved files: {len(summary['moved'])}")
    print(f"removed inbox duplicates: {len(summary['removed_duplicates'])}")
    print(f"transcripts with rewritten source path: {len(summary['rewritten_transcripts'])}")

    if summary["moved"]:
        print("first file moves:")
        for old_rel, new_rel in summary["moved"][:10]:
            print(f"- {old_rel} -> {new_rel}")
        if len(summary["moved"]) > 10:
            print(f"- ... ({len(summary['moved']) - 10} more)")

    if summary["removed_duplicates"]:
        print("first deduplicated inbox files:")
        for old_rel, canonical_rel in summary["removed_duplicates"][:10]:
            print(f"- {old_rel} (already archived as {canonical_rel})")
        if len(summary["removed_duplicates"]) > 10:
            print(f"- ... ({len(summary['removed_duplicates']) - 10} more)")

    if args.apply:
        _write_source_map()
        print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")


def cmd_post_ingest(args: argparse.Namespace) -> None:
    summary = _archive_processed_pdfs(apply=True)
    print("[APPLY] post-ingest maintenance")
    print("actions: archive processed inbox files, rewrite transcript source paths, refresh source map")
    print(f"matched inbox PDFs: {summary['matched']}")
    print(f"moved files: {len(summary['moved'])}")
    print(f"removed inbox duplicates: {len(summary['removed_duplicates'])}")
    print(f"transcripts with rewritten source path: {len(summary['rewritten_transcripts'])}")
    _write_source_map()
    print(f"Updated: {SOURCE_MAP_PATH.relative_to(REPO_ROOT)}")


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Learning Machine helper CLI for startup, indexing, and topic maintenance."
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_start = sub.add_parser("start", help="Print startup intro with recent topics and resume prompt.")
    p_start.add_argument("--limit", type=int, default=5, help="Number of recent topics to show.")
    p_start.set_defaults(func=cmd_start)

    p_recent = sub.add_parser("recent-topics", help="List recent topics from lesson index.")
    p_recent.add_argument("--limit", type=int, default=5, help="Number of recent rows to show.")
    p_recent.set_defaults(func=cmd_recent_topics)

    p_reindex = sub.add_parser("reindex", help="Regenerate topic index from topics directory.")
    p_reindex.add_argument(
        "--write-skill-tree",
        action="store_true",
        help="Also regenerate learning_system/SKILL_TREE.md",
    )
    p_reindex.add_argument(
        "--write-source-map",
        action="store_true",
        help="Also regenerate learning_system/SOURCE_MAP.json",
    )
    p_reindex.set_defaults(func=cmd_reindex)

    p_tree = sub.add_parser("skill-tree", help="Regenerate learning_system/SKILL_TREE.md.")
    p_tree.set_defaults(func=cmd_skill_tree)

    p_reorg = sub.add_parser(
        "reorganize",
        help="Generate reorganization report (health checks + merge candidates).",
    )
    p_reorg.add_argument(
        "--write-report",
        action="store_true",
        help="Retained for UX clarity; report is always written to latest-report.md.",
    )
    p_reorg.set_defaults(func=cmd_reorganize)

    p_new = sub.add_parser("new-topic", help="Create a new topic skeleton.")
    p_new.add_argument("--root", required=True, help="Root namespace (domain or class name).")
    p_new.add_argument("--topic", required=True, help="Topic path (supports nested segments).")
    p_new.add_argument(
        "--write-skill-tree",
        action="store_true",
        help="Also regenerate learning_system/SKILL_TREE.md",
    )
    p_new.set_defaults(func=cmd_new_topic)

    p_merge = sub.add_parser("merge-topic", help="Merge one topic folder into another.")
    p_merge.add_argument("--from", dest="from_topic", required=True, help="Source topic path under topics/.")
    p_merge.add_argument("--into", dest="into_topic", required=True, help="Destination topic path under topics/.")
    p_merge.add_argument(
        "--apply",
        action="store_true",
        help="Apply merge. Without this flag, only a dry-run summary is printed.",
    )
    p_merge.set_defaults(func=cmd_merge_topic)

    p_source_map = sub.add_parser(
        "source-map",
        help="Generate machine-readable mapping from topics to transcript sources.",
    )
    p_source_map.set_defaults(func=cmd_source_map)

    p_audit_skills = sub.add_parser(
        "audit-skills",
        help="Audit the public skill registry against .agents/skills/ and optionally write a report.",
    )
    p_audit_skills.add_argument(
        "--write-report",
        action="store_true",
        help="Write learning_system/SKILL_CATALOG_REPORT.md",
    )
    p_audit_skills.set_defaults(func=cmd_audit_skills)

    p_archive = sub.add_parser(
        "archive-processed",
        help="Move processed PDFs from materials/inbox to materials/archive and rewrite transcript source paths.",
    )
    p_archive.add_argument(
        "--apply",
        action="store_true",
        help="Apply archive moves. Without this flag, only a dry-run summary is printed.",
    )
    p_archive.set_defaults(func=cmd_archive_processed)

    p_post_ingest = sub.add_parser(
        "post-ingest",
        help="Run post-ingest maintenance (archive processed inbox PDFs + refresh source map).",
    )
    p_post_ingest.set_defaults(func=cmd_post_ingest)

    p_log_evidence = sub.add_parser(
        "log-evidence",
        help="Append a concept-level learner-evidence entry and rebuild indexes.",
    )
    p_log_evidence.add_argument("--topic", required=True, help="High-level topic key, e.g. optimization-for-ml.")
    p_log_evidence.add_argument("--subtopic", help="Optional subtopic or unit, e.g. proximal-gradient.")
    p_log_evidence.add_argument(
        "--concept",
        action="append",
        default=[],
        help="Concept tag. Repeat for multiple tags; values are slug-normalized.",
    )
    p_log_evidence.add_argument(
        "--event-type",
        choices=["doubt", "incorrect-answer", "partial-answer", "notation-confusion", "proof-gap", "recall-gap"],
        required=True,
        help="Primary evidence type.",
    )
    p_log_evidence.add_argument(
        "--review-state",
        choices=["open", "addressed", "reinforced", "stable"],
        default="addressed",
        help="Current follow-up status for this evidence item.",
    )
    p_log_evidence.add_argument(
        "--observed-at",
        help="ISO timestamp for when the learner demonstrated the doubt/error. Defaults to local now.",
    )
    p_log_evidence.add_argument(
        "--timestamp-precision",
        choices=["exact", "backfilled-session", "date-only-backfill"],
        default="exact",
        help="How precise the observed timestamp is.",
    )
    p_log_evidence.add_argument("--summary", required=True, help="Compact summary of the issue.")
    p_log_evidence.add_argument("--learner-signal", help="Optional quote/paraphrase of what the learner said or did.")
    p_log_evidence.add_argument(
        "--assistant-response-summary",
        help="Optional short note on how the issue was addressed.",
    )
    p_log_evidence.add_argument("--source-path", help="Optional source file path for the session transcript/note.")
    p_log_evidence.add_argument("--source-turn", help="Optional turn label or location within the source.")
    p_log_evidence.set_defaults(func=cmd_log_evidence)

    p_evidence_index = sub.add_parser(
        "evidence-index",
        help="Regenerate learner-evidence summary pages from the JSONL log.",
    )
    p_evidence_index.set_defaults(func=cmd_evidence_index)

    p_show_evidence = sub.add_parser(
        "show-evidence",
        help="List learner-evidence entries, optionally filtered by topic, concept, or state.",
    )
    p_show_evidence.add_argument("--topic", help="Filter by topic key.")
    p_show_evidence.add_argument("--subtopic", help="Filter by subtopic.")
    p_show_evidence.add_argument("--concept", help="Filter by concept tag.")
    p_show_evidence.add_argument(
        "--event-type",
        choices=["doubt", "incorrect-answer", "partial-answer", "notation-confusion", "proof-gap", "recall-gap"],
        help="Filter by primary evidence type.",
    )
    p_show_evidence.add_argument(
        "--review-state",
        choices=["open", "addressed", "reinforced", "stable"],
        help="Filter by follow-up state.",
    )
    p_show_evidence.add_argument("--limit", type=int, default=20, help="Maximum number of entries to print.")
    p_show_evidence.set_defaults(func=cmd_show_evidence)

    return parser


def main() -> None:
    parser = _build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
