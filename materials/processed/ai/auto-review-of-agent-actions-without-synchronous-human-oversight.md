# Auto-review Of Agent Actions Without Synchronous Human Oversight

Source: `https://alignment.openai.com/auto-review`
Site: `OpenAI Alignment Research Blog`
Title: `Auto-review of agent actions without synchronous human oversight`
Authors: `Maja Trebacz, Sam Arnesen, Ollie Matthews, Dylan Hurd, Won Park, Owen Lin, Joe Gershenson`
Published: `2026-04-30`
Ingested: `2026-05-04`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`

## Summary

OpenAI's Auto-review post describes a deployment pattern for coding agents that sits between two imperfect extremes. Manual approval mode preserves oversight, but interrupts long-running agent sessions constantly. Full Access mode removes friction, but gives up the execution-environment guardrails that stop dangerous boundary-crossing actions. Auto-review uses a separate review agent at the sandbox boundary, letting most work continue while still blocking many actions that could cause serious or hard-to-reverse harm.

The core idea is not that Auto-review makes agent execution perfectly safe. The article is explicit that model-based review is not a deterministic security guarantee. The practical claim is narrower and more interesting: a separate approval model can reduce human approval interruptions by roughly two orders of magnitude while catching many actions that humans would want stopped.

## Table of Contents

- [Problem Frame](#problem-frame)
- [How Auto-review Works](#how-auto-review-works)
- [Why Role Separation Matters](#why-role-separation-matters)
- [Evaluation Setup](#evaluation-setup)
- [Reported Results](#reported-results)
- [Failure Modes And Cautions](#failure-modes-and-cautions)
- [Why This Matters For Agents](#why-this-matters-for-agents)
- [Key Ideas To Remember](#key-ideas-to-remember)
- [Follow-Up Questions](#follow-up-questions)

## Problem Frame

The article frames agent permissions as a product-security tradeoff. In Codex-style coding agents, many actions are safe to run inside a sandbox: reading files, editing within an allowed workspace, or running local commands within configured boundaries. Other actions cross that boundary: network access, commands outside the writable root, data transfers, credential-adjacent operations, or changes that might be irreversible.

Before Auto-review, the user-facing options were blunt:

1. Keep manual approval. This is safer, but frequent interruptions make long background sessions impractical.
2. Use Full Access. This removes friction, but the local environment no longer blocks dangerous actions at the sandbox boundary.

The post argues that approval friction itself creates risk. Users may switch to permissive modes, write broad allow rules, or approve commands without fully understanding the security implications. In other words, a safety system that interrupts too often can push users toward less safe configurations.

## How Auto-review Works

Auto-review activates when Codex reaches a sandbox boundary and requests escalation. Instead of synchronously asking the human, a separate Codex review agent evaluates the request. The review agent considers:

- the user's stated intent,
- the current environment,
- the applicable security policy,
- the proposed command or action,
- the likely consequences of allowing it.

Most actions never need review because they stay inside the sandbox. For the smaller set of boundary-crossing actions, Auto-review either approves the action, denies it with a rationale, or causes the main agent to stop and ask the user when needed.

The article's illustrative deployment snapshot uses 10,000 actions:

- 9,280 stay inside the sandbox,
- 720 are reviewed by Auto-review,
- 713 of those are approved,
- 7 are denied,
- 4 denied cases continue by finding a safer alternative,
- 3 denied cases stop and ask the user.

The exact ratios depend on use case, environment, and sandbox configuration, but the example communicates the product goal: keep the security boundary active without making human attention the bottleneck for ordinary long-running work.

## Why Role Separation Matters

The post emphasizes that the review agent is separate from the main task agent. This separation is the main design idea.

The task agent is optimized to finish the user's job. When it hits a permission boundary, it has pressure to treat that boundary as an obstacle. A separate reviewer has a narrower objective: decide whether the proposed boundary-crossing action should run.

That narrower role makes the approval policy easier to evaluate, monitor, and improve. It also gives the main agent useful feedback. A rejection is not just a hard stop; it includes a rationale that can help the task agent find a safer path.

## Evaluation Setup

OpenAI evaluates Auto-review along two axes:

### Usability

For usability, the article looks at internal Codex escalation traffic from March 2026 and asks how often Auto-review would approve actions that users approved.

### Safety

For safety, the article uses synthetically augmented and adversarial datasets because normal internal traffic does not contain enough dangerous edge cases. The post names three threat-model groups:

1. `Agent overreach`: scenarios where an eager agent takes risky actions while trying to complete the user's task.
2. `Prompt injections`: cases where untrusted content attempts to make Codex run unsafe commands or leak data.
3. `Misaligned models`: trajectories from MonitoringBench where a coding agent covertly tries to carry out malicious tasks.

This evaluation design is important. Real traffic is useful for measuring friction, but dangerous behaviors are rare. Safety evaluation therefore needs targeted adversarial cases rather than relying only on production logs.

## Reported Results

The post reports several headline numbers:

- Auto-review approved `99.1%` of escalated actions on real internal Codex sandbox-escalation traffic.
- Across all actions in the internal deployment, including actions that stayed inside the sandbox, the effective approval rate was `99.93%`.
- On synthetic overeagerness cases, Auto-review denied `90.3%` of cases it was expected to stop.
- On prompt-injection cases involving remote code execution, secret exfiltration, and external upload, it denied `99.3%`.
- On MonitoringBench Hard trajectories, it rejected at least one action in `96.1%` of trajectories.

The operational result is also notable: in Auto-review mode, Codex sessions stop for human approval roughly `200x` less often than in manual approval mode, while still rejecting many actions humans would not want to run.

The article says a majority of Codex Desktop token usage within OpenAI now comes from Auto-review mode, and that this share is growing.

## Failure Modes And Cautions

OpenAI is careful not to present Auto-review as a complete solution.

### Not deterministic security

Traditional security mechanisms are deterministic or at least rules-based. Auto-review is model-based. That makes it more expressive, but also less predictable. The post says red-teaming found cases where Auto-review could be misled into approving commands without user approval.

### Not a full scheming defense

Auto-review sees proposed out-of-sandbox actions at the point of escalation. It does not see everything a model might do inside the sandbox, and it may not catch a strategically deceptive model that can make a malicious plan look benign at the approval boundary.

The post points toward complementary monitoring and evaluation methods, including chain-of-thought monitoring, for these broader risks.

### Repeated denials need trajectory control

The system monitors for attempts to game the reviewer. To reduce this risk, OpenAI automatically stops the trajectory after repeated denials.

This is a useful design pattern: if a safety component says no repeatedly, the system should not let the agent endlessly rephrase the same unsafe request until it gets through.

## Why This Matters For Agents

Auto-review is a concrete example of agent control at an operational boundary. It does not try to solve all of alignment in one step. Instead, it targets a specific high-leverage interface: the moment an agent wants to leave the sandbox.

That makes the post useful for thinking about practical agent safety:

- autonomy can be expanded without removing boundaries,
- review can be delegated to a separate model with a narrower objective,
- human oversight should be preserved for the cases where automated review is uncertain or denies progress,
- evaluation has to combine production traffic with adversarial cases,
- model-based monitors should be treated as probabilistic control systems, not perfect locks.

The broader research direction is clear. Future agents may need employee-like permissions, but current systems do not deserve that trust by default. Auto-review is a transitional mechanism for getting more useful autonomous work while keeping a meaningful approval boundary.

## Key Ideas To Remember

1. Approval friction can harm security by pushing users toward Full Access or overly broad rules.
2. Auto-review replaces synchronous human approval at the sandbox boundary with a separate review agent.
3. The review agent has a narrower role than the main task agent: approve or deny the boundary-crossing action.
4. Most actions stay inside the sandbox and do not need review.
5. A denial can help the main agent recover by finding a safer path instead of stopping immediately.
6. The reported usability result is large: roughly `200x` fewer human approval stops.
7. The reported safety results are strongest on prompt-injection and MonitoringBench-style dangerous trajectories, but not perfect.
8. Auto-review is not deterministic security and is not a full defense against scheming.
9. Repeated denials should stop a trajectory rather than allow endless reattempts.
10. The long-term goal is agent oversight that supports more autonomy without treating full permissions as safe by default.

## Follow-Up Questions

- What kinds of sandbox-boundary actions should always remain human-reviewed?
- How should a review agent explain denials so the task agent can find safer alternatives without gaming the boundary?
- When does model-based review become too nondeterministic for a security-critical setting?
- How should production systems combine Auto-review with rule-based policies, logging, and human audit?
- What evaluation set best predicts real prompt-injection failures in coding-agent deployments?
- How can a system detect when the task agent is trying to rephrase a denied action to slip past the reviewer?
- If future agents receive employee-like permissions, what additional oversight layer replaces today's sandbox boundary?

## One-Sentence Takeaway

Auto-review treats sandbox escalation as a model-reviewed control point: it lets coding agents run far more autonomously than manual approval mode while preserving a probabilistic boundary against dangerous, irreversible, or policy-violating actions.
