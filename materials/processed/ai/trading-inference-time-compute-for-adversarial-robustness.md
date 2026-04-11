# Trading Inference-Time Compute for Adversarial Robustness

Source: `https://arxiv.org/pdf/2501.18841`
Site: `arXiv`
Published: `2025-01-31`
Authors: `Wojciech Zaremba, Evgenia Nitishinskaya, Boaz Barak, Stephanie Lin, Sam Toyer, Yaodong Yu, Rachel Dias, Eric Wallace, Kai Xiao, Johannes Heidecke, Amelia Glaese`
Extraction engine: `Gemini PDF conversion + manual structured ingest`
Strategy: `canonical PDF extraction and collection-oriented normalization`

## Summary

This paper studies whether giving reasoning models more inference-time compute makes them harder to attack. The main empirical result is that, across several adversarial settings, attack success often drops as the defender is allowed to spend more compute on reasoning. In a number of the paper's cleaner, less ambiguous tasks, the attack success rate appears to trend toward zero as test-time compute increases.

The paper is careful not to claim that test-time compute solves adversarial robustness in general. The gains are strongest when the task has a relatively unambiguous notion of correct behavior, such as arithmetic tasks with injected instructions, browsing with explicit prompt injections, or policy-following tasks with crisp evaluation criteria. The results are much weaker when the attack exploits policy ambiguity or semantic loopholes rather than simply trying to confuse the model.

## Core Claim

The central claim is that scaling inference-time compute may improve adversarial robustness in a way that scaling pretraining compute often has not. Instead of adversarially training specifically against each known attack, the defense here is generic: allow the model more reasoning effort at inference time and see whether it can more reliably apply the intended rule or policy even under adversarial pressure.

The authors frame this as especially interesting for safety because the intervention is not attack-specific. In principle, it can be turned up only in high-stakes settings, and unlike many robustness interventions, it does not inherently trade off against clean performance.

## What They Evaluate

The paper evaluates OpenAI reasoning models, especially `o1-preview` and `o1-mini`, against several attack families:

- many-shot jailbreaking on math and rule-following tasks
- adversarial language-model-program attacks that iteratively search for a successful prompt
- soft-token attacks against reasoning traces
- prompt injection against browsing agents
- misuse and jailbreak benchmarks such as StrongREJECT
- adversarial image attacks such as Attack-Bard

The tasks are intentionally mixed. Some are stylized and unambiguous, where success is easy to define, while others are closer to realistic safety prompts, where it is less clear whether a given answer truly violates policy.

## Main Results

The strongest result is that on many unambiguous tasks, more inference-time compute substantially improves robustness. This shows up in arithmetic tasks with adversarial instructions, soft-token attacks on math, prompt injection against browsing models, and several rule-following settings. The paper's framing is that extra reasoning time seems to help the model better apply a known specification to a hard or adversarially perturbed instance.

The paper also argues that this is meaningfully different from the usual "just scale the model" story. Prior work had found that more pretraining compute did not reliably buy jailbreak robustness and could even correlate negatively with it. Their result suggests that test-time reasoning scale may be a different axis, one that helps with compliance even when the input has been adversarially shifted.

## Why The Results Are Mixed

The authors explicitly separate `specification` from `compliance`. Their experiments mostly test whether a model can follow a given rule or policy when attacked, not whether the policy itself is complete, unambiguous, or loophole-free. In their legal analogy, this is more about whether the judge can correctly apply the law than whether the law has been written perfectly.

That distinction explains the mixed results on misuse prompts and other realistic safety tasks. If an attack works by exploiting ambiguity in the policy, then more compute may simply help the model find a plausible interpretation that permits the answer. In those cases, the bottleneck is not pure reasoning quality but the underspecification of the policy itself.

## New Attacks and Failure Modes

The paper introduces or emphasizes several attacks that are especially relevant for reasoning models:

- `think-less` attacks, which try to suppress or derail the model's careful reasoning
- `nerd-sniping` or `distraction` attacks, which try to consume the model's compute budget on irrelevant but attention-grabbing subproblems
- adapted soft-token attacks that target reasoning models more directly

These matter because they point to a limit of the paper's optimistic result. If robustness comes partly from getting the model to think longer, then the attack surface shifts toward manipulating how that extra thinking is allocated.

## Practical Takeaway

The paper's main takeaway is not "adversarial robustness is solved." It is that inference-time compute looks like a promising generic lever for robustness, especially in settings where the policy is clear and the model mainly needs to reason correctly under attack. That is a useful result because it suggests safety interventions may be able to benefit from the same test-time scaling trends that are improving capability.

At the same time, the paper is explicit about the limits. It does not solve policy specification, does not show that attack success always goes to zero, and does not establish robustness on the most ambiguous or realistic misuse settings. The strongest reading is therefore narrower: extra test-time reasoning helps with adversarial compliance in many important cases, but not in the full generality needed for real-world safety.
