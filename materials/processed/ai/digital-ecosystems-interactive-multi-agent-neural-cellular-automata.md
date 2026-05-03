# Digital Ecosystems: Interactive Multi-Agent Neural Cellular Automata

Source: [Sakana AI interactive article](https://pub.sakana.ai/digital-ecosystem/) and [paper PDF](https://pub.sakana.ai/digital-ecosystem/paper/paper.pdf)

Author: Luke Darlow, Sakana AI

Published: April 2026

Code: [SakanaAI/digital-ecosystem](https://github.com/SakanaAI/digital-ecosystem)

Demo: [Interactive ecosystem](https://pub.sakana.ai/digital-ecosystem/app/)

## One Sentence Summary

Digital Ecosystems is an interactive browser platform where multiple neural cellular automata species learn on a shared grid, compete for territory, and can be steered live through checkpoints, parameter changes, and environmental edits.

## Why This Matters

Most artificial-life experiments are run offline: choose parameters, run the simulation, inspect the results later. This work argues that some phenomena are easier to discover when the researcher can interact with the system while it is alive.

The platform lets a user:

- Watch a multi-species neural cellular automaton evolve in real time
- Change parameters while the system keeps running
- Save checkpoints and branch into alternative futures
- Draw or erase walls and seed species by hand
- Export reproducible recipes and `.petri` checkpoint files

The central contribution is not a single benchmark score. It is a research workflow: observe, hypothesize, checkpoint, perturb, compare, and then later quantify with scripted sweeps.

## Background: Neural Cellular Automata

A cellular automaton is a grid of cells updated by local rules. Classic examples use hand-written rules: each cell looks at nearby cells and decides its next state.

A neural cellular automaton replaces the hand-written rule with a small neural network. Each cell stores a state vector. At every step, the network looks at a local neighborhood and predicts the cell's update. Repeating this local rule can create global structure, such as growth, texture, repair, or movement.

This work focuses on a multi-agent version: several learned species live on the same grid and compete for space.

## What Is New Here

The work builds on Petri Dish NCA (PD-NCA), where `N` neural species compete for territory through attack and defense vectors while learning online by gradient descent.

Digital Ecosystems adds two kinds of contribution.

First, it adds algorithmic updates to the PD-NCA setup:

- Presence gating: only locally present species participate in competition.
- Emergency respawn: species that effectively die can be re-seeded.
- Tunable growth gate: a soft differentiable gate controls the alive/dead boundary.
- Spatial concentration: attack and defense energy can focus on locally active regions.
- Win-rate feedback: cells with stronger local aliveness update more often.
- Updated model architecture: MobileNetV2-style inverted residual blocks with a grouped per-species decoder.

Second, it adds a browser-based interactive platform:

- Live parameter sliders
- Timeline dashboard for species populations, diversity, and loss
- Checkpoint slots plus rolling auto-save
- Wall drawing, wall erasing, and species seeding tools
- In-browser execution with TensorFlow.js, WebGL, and SwissGL

## The Core Simulation Loop

Each species has an aliveness channel and attack/defense vectors. At each cell, species compete for influence. Their scores go through a softmax controlled by a competition temperature `tau`.

Low `tau` makes competition closer to winner-take-all. High `tau` makes it more permissive.

After competition, the growth gate decides how much a species can remain alive at a cell. The gate is a sigmoid over local aliveness:

```text
g_i(x, y) = sigmoid(k_gate * (pooled_aliveness_i(x, y) - theta))
```

Here:

- `theta` is the survival threshold.
- `k_gate` is the gate steepness.
- High `k_gate` behaves like a sharp alive/dead cutoff.
- Lower `k_gate` creates a fuzzy transition zone.

That one parameter, `k_gate`, becomes a control knob for moving the system between ordered, edge-of-chaos, and chaotic regimes.

## The Platform Workflow

The platform is built around a checkpoint-branch-explore loop:

```text
observe -> checkpoint -> perturb -> compare -> branch again
```

This is different from a batch sweep. A batch sweep can map outcomes across parameters, but it usually starts each run from scratch. The interactive platform can start from a specific living state, make one change, and watch how the current ecosystem responds.

This matters because many artificial-life systems are path-dependent. The same final parameter value can behave differently depending on how the system got there.

## Five Case Studies

### 1. Growth Gate As Edge-Of-Chaos Control

The growth gate steepness `k_gate` controls how sharp the alive/dead boundary is.

At high steepness, the system forms clean territorial regions. At lower steepness, cells can hold intermediate aliveness values, producing richer edge dynamics. Around the reported edge band, species develop different phenotypes, boundaries churn, and texture regenerates without further parameter changes. Pushing too far collapses coherent structure into chaos.

The paper is careful about this result: it is a qualitative interactive observation, not a statistically replicated claim about exact regime boundaries.

### 2. Extreme Competition Temperature

At very low competition temperature, the inter-species softmax becomes nearly one-hot. Tiny score fluctuations decide the winner at each cell, and winners can flip rapidly.

The result is a flicker-mixing attractor. At low survival threshold, the raw pixel-level flicker is visible. At higher thresholds, the gate filters out short-lived flips and reveals more durable territory.

This shows that the visible ecosystem is shaped by both competition and the aliveness gate.

### 3. Emergent Cooperation Via Threshold Cycling

Each species optimizes for growth, not cooperation. Yet the system can produce spatial sharing.

The reported protocol has three stages:

1. Permissive mixing at low threshold
2. Crystallization into sharper territories at higher threshold
3. Relaxation back to a lower threshold

After relaxation, neighboring species from the crystallized stage can form interleaved sharing patterns. A cold-start control at the relaxed threshold also reaches cooperation, but the cycled path appears to bias which species cooperate.

The authors frame this cautiously because the observation is not replicated across many seeds.

### 4. Optimizer Choice And Learning Rate

The platform can branch from one checkpoint into several optimizer settings.

From the same starting state:

- SGD tends toward stable territorial equilibria.
- SGD with momentum can produce rotating dominance cycles.
- Adam can produce wave-like repainting and burst-quiescence dynamics.

The key point is not that one optimizer is best. The point is that the optimizer changes the qualitative ecosystem, and branching from a shared checkpoint makes those differences directly visible.

### 5. Biogeographic Construction

The user can draw walls, erase them, and seed species. This turns the simulation into an editable digital habitat.

In the reported case study, walls create chambers and niches. Erasing wall segments opens corridors, allowing nearby species to invade. Later, the balancing loss and competition dynamics push the system toward a new equilibrium. Some species learn wall-hugging behavior, using geometry as defensible structure.

This case study shows why environmental editing matters: geometry can shape which equilibria are possible.

## Key Limitations

The paper is exploratory. The case studies are mostly single trajectories, not statistical claims across many seeds. The WebGL simulation is not bitwise reproducible across devices, although the authors report qualitatively consistent dynamics. The platform currently focuses on five species, and scaling to larger populations is an open problem.

Emergency respawn also changes the meaning of coexistence. If a species nearly dies, the system can re-seed it. That makes the ecosystem more explorable, but it means some coexistence is quasi-stationary under an immigration floor rather than purely self-sustaining stability.

## Practical Mental Model

Read this work as an interactive microscope for learned artificial-life systems.

The platform is not trying to prove one universal law of digital ecology. It is trying to make fragile, path-dependent, transient phenomena easier to find and study.

The best workflow is:

1. Explore interactively.
2. Notice a phenomenon.
3. Save the checkpoint.
4. Branch and perturb it.
5. Export it for scripted replication.

## Key Takeaways

1. Digital Ecosystems turns multi-agent neural cellular automata into an interactive research object.
2. Multiple learned species compete on a shared grid while training online.
3. Live steering matters because parameter changes affect both the current state and the learning loop.
4. The growth gate steepness is a useful control for moving between ordered, edge-like, and chaotic regimes.
5. Checkpoint branching makes optimizer and parameter effects easier to compare.
6. The results are qualitative and exploratory; stronger claims need replication across seeds and more systematic sweeps.

## Questions To Check Understanding

1. What is a neural cellular automaton?
2. Why is a multi-agent NCA different from a single-species NCA?
3. What does the growth gate control?
4. Why does checkpoint branching help compare different futures?
5. Why is emergency respawn useful for exploration but tricky for claims about stability?
6. What makes interactive exploration complementary to batch sweeps?
