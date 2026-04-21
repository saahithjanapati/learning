# 8. Causality, Interventions, and Discovery

## Table of Contents

- [[#0. How To Read This Section]]
- [[#8.0 Why Causality Is Not Just Another Inference Topic]]
- [[#8.1 Conditioning vs Intervention]]
- [[#8.2 Backdoor Intuition]]
- [[#8.3 Frontdoor and Do-Calculus: High-Level View]]
- [[#8.4 Causal Discovery]]
- [[#8.5 The PC Algorithm]]
- [[#8.6 What the Practice Exam Suggests Is Important]]
- [[#8.7 What To Remember]]

## 0. How To Read This Section

This section is easiest to understand if you remember that it is not just “more inference.”

The central shift is:

- probabilistic inference asks what follows from observations
- causal inference asks what would happen under interventions

If that distinction is solid, then backdoor adjustment, causal discovery, and the PC algorithm all have a much clearer purpose.

## 8.0 Why Causality Is Not Just Another Inference Topic

Ordinary probabilistic inference asks:

- what happens to probabilities when we condition on observations?

Causal inference asks a different question:

- what happens if we actively intervene in the system?

That is why the notation
$$
do(T=t)
$$
matters. It is not the same thing as conditioning on
$$
T=t.
$$

## 8.1 Conditioning vs Intervention

Conditioning means:

- observe that a variable took a value
- update beliefs accordingly

Intervention means:

- actively set the variable
- break the mechanism that normally determines it

This distinction is the entire reason causal graphs matter.

If you blur these together, the whole causality unit becomes confusing.

## 8.2 Backdoor Intuition

The backdoor criterion tells you when a set of variables is sufficient to adjust for confounding between treatment $T$ and outcome $Y$.

The intuitive goal is:

- block spurious noncausal paths from $T$ to $Y$
- without blocking the causal effect you actually want to estimate

So the exam-level game is often:

- inspect a graph
- decide whether a highlighted set blocks the right backdoor paths

## 8.3 Frontdoor and Do-Calculus: High-Level View

Backdoor is the friendliest identification tool.
Frontdoor is more delicate and uses a mediator structure.
Do-calculus is the more general symbolic toolkit for manipulating intervention expressions.

You do not need to start from full abstraction. The right beginner progression is:

1. distinguish observation from intervention
2. understand backdoor
3. then see frontdoor and do-calculus as more advanced identification tools

## 8.4 Causal Discovery

Causal discovery asks:

- can we recover graph structure from observational data and independence information?

This is much harder than ordinary probabilistic modeling because multiple graphs can encode similar observational behavior.

So the algorithms often recover:

- an equivalence class
- partial orientation information

rather than one perfectly identified DAG.

## 8.5 The PC Algorithm

The PC algorithm is a constraint-based causal-discovery algorithm.

At high level, it:

1. uses conditional independence tests to remove edges
2. orients edges when certain separating-set patterns imply collider structure
3. continues orienting what is logically forced

The important beginner point is not every implementation detail. It is:

- it uses independence structure, not likelihood optimization
- it often identifies only what is justified by the observed independencies

## 8.6 What the Practice Exam Suggests Is Important

From the practice material, the likely high-yield ideas are:

- backdoor criterion on concrete graphs
- what the PC algorithm can and cannot identify
- intervention versus conditioning
- diffusion/causal sections being tested conceptually rather than through long derivations

## 8.7 What To Remember

- conditioning is not intervention
- backdoor adjustment is about blocking confounding paths
- causal discovery often gives partial structure, not complete certainty
- PC is a constraint-based algorithm using conditional independencies
- for graph questions, always reason path-by-path rather than by visual impression
