# Content Routing

Use this when new materials are uploaded or linked.

## Routing Modes

1. `unified-topic`
- Use for all materials.
- Path pattern:
  - `topics/<root>/<topic>/...`
- `<root>` selection:
  - default: use domain (`transformers`, `optimization`, `probability`)
  - class-specific: use class name (`cs229`, `ee364a`)

## Required Metadata For New Uploads

- `topic`: short slug (example: `kv-caching`, `bayes-rule`)
- `root`: domain or class name
- `source_type`: `file` or `url`

## Artifact Placement Rules

- Use `topics/<root>/` for root-wide or course-wide artifacts only:
  - survey notes
  - cross-topic curricula
  - root-level lessons spanning multiple subtopics
  - shared materials for the entire root
- Use `topics/<root>/<topic>/` for topic-specific artifacts:
  - `curriculum/`
  - `lessons/`
  - `practice/`
- When both a root folder and a leaf topic could fit, prefer the leaf topic unless the material clearly spans multiple children.
- Avoid mixing the same lesson stream across both levels.

## Routing Examples

- "Add this AI blog post"
  - default to `topics/ai/...` as a root-level collection dump unless the user explicitly wants a dedicated AI subtopic

- "This PDF is for CS229 lecture 3"
  - `topics/cs229/gradient-descent/...`

- "Add this article URL under AI agents"
  - `topics/ai/effective-agents/...`

- "This is for my own transformers study"
  - `topics/transformers/attention/...`

- "This note compares several optimization subtopics"
  - `topics/optimization-for-ml/...`

- "This exercise is only about belief propagation"
  - `topics/probabilistic-graphical-models/inference-and-belief-propagation/...`

## Similar Topic Matching

When a new topic name is close to an existing one:
- suggest the closest match and ask for confirmation,
- if not confirmed, create a new topic path.
