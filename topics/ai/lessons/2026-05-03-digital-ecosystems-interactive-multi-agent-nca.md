# Digital Ecosystems: Interactive Multi-Agent Neural Cellular Automata

Source note: [Digital Ecosystems processed source](../../../materials/processed/ai/digital-ecosystems-interactive-multi-agent-neural-cellular-automata.md)

Original sources: [Sakana AI interactive article](https://pub.sakana.ai/digital-ecosystem/) and [paper PDF](https://pub.sakana.ai/digital-ecosystem/paper/paper.pdf)

## Table Of Contents

1. [Start Here](#start-here)
2. [The Big Idea](#the-big-idea)
3. [What Is A Cellular Automaton?](#what-is-a-cellular-automaton)
4. [What Makes It Neural?](#what-makes-it-neural)
5. [What Makes It Multi-Agent?](#what-makes-it-multi-agent)
6. [The Interactive Platform](#the-interactive-platform)
7. [The Three Important Knobs](#the-three-important-knobs)
8. [The Five Case Studies](#the-five-case-studies)
9. [What The Paper Is Really Claiming](#what-the-paper-is-really-claiming)
10. [Medium-Length Version](#medium-length-version)
11. [Full-Length Version](#full-length-version)
12. [Quick Check](#quick-check)

## Start Here

This paper is about simulated life on a grid.

That can sound abstract, so picture a square board covered with colored cells. Each color is a different "species." The species grow, compete, disappear, recover, and form territories. But their behavior is not hand-coded as a fixed rule. Each species is controlled by neural networks that learn while the simulation runs.

The work is called Digital Ecosystems because it makes these learned artificial-life systems interactive. You can watch the ecosystem, change a parameter, save a checkpoint, branch into a different future, draw walls, erase walls, and see what happens.

The most important idea is:

> Interactive exploration can reveal path-dependent artificial-life dynamics that are hard to find with offline batch sweeps alone.

## The Big Idea

Most simulations work like this:

```text
choose parameters -> run simulation -> inspect output
```

Digital Ecosystems works more like this:

```text
watch simulation -> save state -> perturb it -> compare futures
```

That difference matters because the system is path-dependent. A living ecosystem is not just a parameter setting. It is also a history.

Two runs can share the same final parameter values but behave differently because they arrived there through different paths.

## What Is A Cellular Automaton?

A cellular automaton is a grid where each cell updates according to local information.

The classic mental picture is Conway's Game of Life. Each cell is alive or dead. It looks at nearby cells, applies a rule, and updates. Repeat that many times, and global patterns emerge.

The important phrase is local rule, global behavior.

No cell has a map of the whole system. Each cell only reacts to nearby information. But the whole grid can produce patterns that look organized.

## What Makes It Neural?

A neural cellular automaton replaces the hand-written update rule with a learned neural network.

Each cell stores a vector of numbers, not just alive/dead. The neural network looks at a small neighborhood around a cell and predicts how that cell's vector should change.

So instead of:

```text
if three neighbors are alive, become alive
```

you get:

```text
look at local neighborhood -> neural network -> update cell state
```

This lets the system learn behaviors like growth, repair, texture formation, and pattern maintenance.

## What Makes It Multi-Agent?

In this paper, there is not just one learned pattern. There are multiple species on one grid.

Each species is trying to grow and maintain territory. The species compete through learned attack and defense vectors. At a given cell, a species can win more or less influence depending on how its attack interacts with others' defenses.

This creates a digital ecosystem:

- Species spread.
- Species fight for cells.
- Boundaries form.
- Some species dominate.
- Some coexist.
- Some nearly disappear and get re-seeded.

The key technical setting comes from Petri Dish NCA (PD-NCA): multiple neural species share a grid and train online through gradient descent.

## The Interactive Platform

The platform is the central contribution.

It gives the researcher a live control surface:

- Sliders for parameters
- Timeline charts for species populations, diversity, and loss
- Checkpoint slots
- Branching from saved states
- Drawing tools for walls and species seeds
- Exportable `.petri` checkpoint files

This turns the simulation into something closer to a lab bench. The researcher can observe an interesting transient, save it, perturb it, and compare the result against another branch from the same checkpoint.

That matters because many artificial-life systems have temporary behaviors that vanish if you only inspect the final state.

## The Three Important Knobs

The paper repeatedly returns to three controls.

### 1. Competition Temperature

Competition temperature, written as `tau`, controls how sharp the competition softmax is.

Low `tau` makes the system winner-take-all. Small differences can decide which species controls a cell.

High `tau` makes the competition more permissive. Several species can have meaningful influence.

### 2. Survival Threshold

The survival threshold, written as `theta`, controls how much aliveness a cell needs to count as alive.

Low threshold lets weak or transient presence show up. High threshold filters out short-lived flicker and only keeps more durable local dominance.

### 3. Growth-Gate Steepness

Growth-gate steepness, written as `k_gate`, controls how sharp the alive/dead boundary is.

High `k_gate` acts like a hard cutoff. Cells are mostly alive or dead, and territories look clean.

Lower `k_gate` makes the boundary fuzzy. Cells can have intermediate aliveness, which allows richer dynamics near the edge of chaos.

This is one of the paper's most important ideas: a single differentiable parameter can move the system between frozen, critical, and turbulent-looking regimes.

## The Five Case Studies

### Case Study 1: Growth Gate And The Edge Of Chaos

The authors change `k_gate`, the growth-gate steepness.

At high values, the ecosystem forms clean stable territories. At lower values, boundaries become textured and active. Species can develop different phenotypes: some churn at borders, some hold stable cores, and some form embedded pockets.

If `k_gate` drops too far, coherent structure collapses.

The beginner takeaway:

```text
sharp gate -> clean territories
soft gate -> richer edge dynamics
too soft -> chaos
```

The authors are careful not to overclaim. This is a qualitative observation from interactive runs, not a fully replicated statistical result.

### Case Study 2: Flicker-Mixing Attractor

At very low competition temperature, the winner at each cell can flip rapidly.

At a low survival threshold, you see raw pixel-level flicker. At a higher threshold, the gate filters out the short-lived flips and reveals more durable structure.

This teaches a subtle point: what you see on the grid is not just the competition. It is competition plus the survival filter.

### Case Study 3: Emergent Cooperation

Each species is selfish: it is trained to grow. There is no direct "please cooperate" reward.

Yet spatial sharing can emerge. The authors use a three-stage threshold schedule:

1. Low threshold: species mix freely.
2. Higher threshold: territories crystallize.
3. Lower threshold again: previous neighbors relax into interleaved sharing.

The interesting observation is that cooperation tends to emerge between species that were neighbors during the territorial stage. The path through parameter space appears to shape who cooperates with whom.

But again, the authors are cautious. A cold-start control also reaches cooperation, so the claim is not "cycling creates cooperation from nothing." The narrower claim is that cycling appears to bias which pairs cooperate.

### Case Study 4: Optimizers Create Different Ecosystems

The platform saves one checkpoint and branches it into different optimizer settings.

From the same starting state:

- SGD gives slower, stable territorial equilibria.
- SGD with momentum gives rotating dominance cycles.
- Adam gives waves and burst-like takeovers.

This is a good example of why checkpoint branching is useful. If every run started from scratch, it would be harder to tell whether the difference came from the optimizer or from initial conditions.

### Case Study 5: Biogeographic Construction

The user can draw walls and erase them while the ecosystem runs.

Walls create niches. Erasing a wall opens a corridor. Nearby species invade. Other species push back. The system settles into a new equilibrium.

The striking behavior is wall-hugging: species borders follow the geometry of the environment, and protective alcoves can support persistent enclaves.

The beginner takeaway:

```text
environment geometry changes which competitive patterns are sustainable
```

## What The Paper Is Really Claiming

This paper is not trying to prove that these ecosystems obey one clean law.

It is claiming that interactive exploration is a useful way to study learned artificial-life systems.

Batch sweeps are still necessary. If you want statistical confidence, you need many seeds, controlled comparisons, and quantitative analysis. But batch sweeps are not always good at discovering the phenomenon in the first place.

The proposed workflow is:

```text
interactive exploration -> candidate phenomenon -> exported checkpoint -> systematic replication
```

That is the bridge between playful exploration and scientific measurement.

## Medium-Length Version

Digital Ecosystems is an interactive platform for studying multi-agent neural cellular automata. A neural cellular automaton is a grid system where each cell updates through a learned neural network rather than a hand-written rule. In the multi-agent setting, several species occupy one grid and compete for territory while learning online through gradient descent.

The platform builds on Petri Dish NCA and adds live interaction. Users can change parameters while the ecosystem runs, save checkpoints, branch into alternative futures, draw or erase walls, seed species, and inspect population timelines. This matters because artificial-life systems are often path-dependent. A phenomenon may only appear after a particular sequence of changes from a particular living state.

The paper's major technical controls are competition temperature, survival threshold, and growth-gate steepness. Competition temperature controls whether species competition is winner-take-all or permissive. The survival threshold filters weak or transient aliveness. Growth-gate steepness controls whether the alive/dead boundary is sharp or fuzzy. Lowering the growth-gate steepness can move the system from clean territorial structure toward edge-of-chaos dynamics, though pushing too far collapses coherence.

The five case studies show different uses of the platform: steering growth-gate dynamics, observing flicker-mixing at extreme competition temperature, inducing cooperative spatial sharing through threshold cycling, comparing optimizers from a shared checkpoint, and shaping equilibria by drawing and erasing walls.

The right takeaway is methodological. Interactive exploration helps researchers find interesting transient and path-dependent phenomena. Systematic sweeps are still needed afterward to test robustness. The platform is best viewed as a discovery instrument for learned artificial-life systems.

## Full-Length Version

The paper starts from a simple problem: artificial-life systems can have rich dynamics, but the usual workflow can make those dynamics hard to discover.

In a standard offline experiment, a researcher chooses parameters, runs a simulation, and checks the result after the fact. That is useful for measuring known questions, but it can miss fragile transients. If something interesting appears at step 700 and disappears by step 1200, a final snapshot may never reveal it. If the phenomenon only appears after gradually changing a parameter from a settled state, cold-start parameter sweeps may miss it.

Digital Ecosystems turns the simulation into an interactive object. The researcher can watch, intervene, checkpoint, branch, and compare.

The base object is a neural cellular automaton. In a normal cellular automaton, each cell updates through a fixed local rule. In a neural cellular automaton, the rule is a neural network. Each cell carries a state vector, and the network computes local updates. Over many steps, local neural updates can produce global patterns.

The multi-agent version has several species on the same grid. Each species has aliveness and attack/defense representations. At each pixel, species compete for influence, and online gradient descent updates the neural networks as the simulation runs. This is important: the system is not just following a frozen rule. It is learning during the simulation.

The platform introduces several stabilizing and exploratory mechanisms. Presence gating prevents species from exerting influence in places where they have no local territory. Emergency respawn re-seeds species that nearly die, keeping the system explorable. Spatial concentration focuses competitive energy near active local regions. Win-rate feedback changes update probabilities based on local aliveness. The model architecture is updated from earlier PD-NCA work.

The most conceptually important mechanism is the growth gate. The growth gate is a soft sigmoid over local aliveness. Its steepness, `k_gate`, controls whether the alive/dead boundary behaves like a hard cutoff or a fuzzy transition. At high steepness, the grid tends toward clean territories. At lower steepness, intermediate aliveness values can persist, creating richer boundary dynamics. At still lower values, the system can become turbulent and lose coherent structure.

The first case study uses this gate as an edge-of-chaos control. The authors show ordered, edge-like, and chaotic regimes by changing `k_gate`. The point is not that the exact numbers are universal. The point is that exposing the gate as a live parameter lets a user navigate regimes that would be awkward to find through offline sweeps alone.

The second case study sets competition temperature very low. Low temperature makes the competition softmax almost winner-take-all. Small score differences can flip the cell winner each step, creating a flicker-mixing attractor. The survival threshold then determines what the user sees: low threshold reveals raw flicker, while high threshold filters out short-lived wins and shows durable territories.

The third case study explores cooperation. The species are not directly rewarded for cooperation, but they can form interleaved sharing patterns. The threshold-cycling protocol first lets species mix, then forces clearer territories, then relaxes the threshold. After relaxation, species that were territorial neighbors can share space in fine-grained patterns. A cold-start control also reaches cooperation, so the strongest claim is cautious: the path through parameter space appears to influence which species cooperate, not whether cooperation is possible at all.

The fourth case study compares optimizers. Starting from the same checkpoint, the authors branch into SGD, SGD with momentum, and Adam at different learning rates. SGD tends to stable territorial equilibria. Momentum creates rotating dominance because accumulated update direction overshoots. Adam creates waves and bursts because adaptive learning rates can grow during quiet periods and then overreact to perturbations. The important design point is that checkpoint branching turns optimizer choice into a controlled comparison from one initial state.

The fifth case study edits the environment. The user draws walls, seeds species, erases wall segments, and watches invasion and recovery. The ecosystem can settle into wall-aligned equilibria, with species using geometry as defensible structure. This makes the system feel more like a digital ecology lab than a fixed benchmark.

The limitations are central. The case studies are mostly single trajectories. WebGL execution is not bitwise reproducible across devices. Only a small part of the parameter space is explored. Emergency respawn means coexistence is partly maintained by an immigration floor. Scaling beyond five species remains an open question.

So the paper should be read as a platform and methodology contribution. It gives researchers a way to discover phenomena interactively, then export states for systematic study. It does not replace careful replication. It helps find what should be replicated.

## Quick Check

Try answering these without looking back.

1. What is the difference between a cellular automaton and a neural cellular automaton?
2. Why does online learning make this ecosystem different from a fixed-rule simulation?
3. What does competition temperature control?
4. What does the growth-gate steepness control?
5. Why can the same parameter value behave differently depending on the path used to reach it?
6. What did the optimizer branching case study show?
7. Why is emergency respawn useful but scientifically tricky?
8. What is the relationship between interactive exploration and batch sweeps?

## One-Minute Summary

Digital Ecosystems is an interactive browser platform for multi-agent neural cellular automata. Multiple learned species compete on a shared grid while training online. The platform lets researchers steer parameters, save checkpoints, branch alternate futures, and edit the environment with walls and seeds. The main lesson is methodological: live interaction can reveal path-dependent artificial-life phenomena that offline sweeps may miss. The case studies show edge-of-chaos behavior, flicker-mixing, emergent cooperation, optimizer-dependent dynamics, and geometry-shaped equilibria. The findings are exploratory and need replication, but the platform is a useful discovery instrument for learned digital ecosystems.
