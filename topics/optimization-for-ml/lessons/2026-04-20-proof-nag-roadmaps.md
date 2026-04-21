# Proof Roadmaps: Nesterov Acceleration

This page is intentionally labeled a `proof roadmap` rather than a full proof page.

Why: the repo material you have here gives the update rules, theorem statements, comparison to ordinary GD, and the right intuition, but it does not contain the full estimate-sequence derivation line-by-line.

So this page is designed to help you recognize and explain the structure of the NAG proofs without pretending the course notes here fully derive every line.

## The two theorem statements to know

For convex $\beta$-smooth objectives:

$$
f(x_k)-f(x^*) = O\left(\frac{\beta \|x_0-x^*\|^2}{k^2}\right).
$$

For $\alpha$-strongly convex, $\beta$-smooth objectives:

$$
f(x_k)-f(x^*) = O\left(\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k\right).
$$

These are improvements over ordinary GD:

- smooth convex GD: $O(1/k)$
- smooth strongly convex GD: $O((1-\alpha/\beta)^k)$

## Update rule and the main formula-level difference from Polyak

The course note writes NAG as

$$
x_{t+1}
=
x_t
-\eta \nabla F(x_t+\gamma(x_t-x_{t-1}))
+\gamma(x_t-x_{t-1}).
$$

Polyak / heavy-ball uses

$$
x_{t+1}
=
x_t
-\eta \nabla F(x_t)
+\gamma(x_t-x_{t-1}).
$$

So the only visible formula-level change is:

- Polyak uses the gradient at the current point
- NAG uses the gradient at the look-ahead point

That small change is what enables the accelerated proof machinery.

## Roadmap 1: smooth convex NAG proof

### What the proof is trying to show

The proof wants a potential that decreases in such a way that the function-value gap scales like $1/k^2$ instead of $1/k$.

### Core ingredients

1. build an auxiliary sequence, often written as a weighted average or a look-ahead sequence
2. choose time-varying parameters carefully
3. prove a one-step inequality for a specially designed potential
4. telescope the potential over time
5. read off the $O(1/k^2)$ rate from the final bound

### What is different from ordinary GD

Ordinary GD proof:

- one distance recursion
- one descent lemma
- one telescoping sum

NAG proof:

- at least one extra sequence
- parameter coupling across iterations
- a more delicate potential, not just raw distance-to-optimum

That is why NAG proofs feel much more "engineered."

### If you need an oral exam explanation

The clean explanation is:

NAG proves acceleration by designing a coupled momentum-plus-look-ahead sequence and showing a stronger telescoping potential than the one available for plain GD.

## Roadmap 2: strongly convex NAG proof

### What the proof is trying to show

The target is an accelerated linear rate:

$$
\left(1-\sqrt{\frac{\alpha}{\beta}}\right)^k.
$$

### Structural idea

The strongly convex proof again uses a carefully designed potential, but now the potential is set up so that it contracts by a constant factor each iteration.

So the proof has the same broad ingredients:

1. choose the acceleration parameters as functions of $\alpha$ and $\beta$
2. define a Lyapunov / potential quantity
3. prove one-step contraction of that potential
4. conclude geometric decay of the function-value gap

### What the square root means

The improvement over ordinary GD is the condition-number dependence:

- GD uses $1-\alpha/\beta$
- NAG uses $1-\sqrt{\alpha/\beta}$

That square root is the signature of acceleration in the strongly convex case.

## How to talk about NAG on the exam without overclaiming

You should be able to say all of the following cleanly:

- NAG is a look-ahead version of momentum.
- Its theorem statements are usually about the function-value gap.
- The proof is not the same as the ordinary GD telescoping proof.
- The proof uses an auxiliary sequence or a specially designed potential.
- In the convex case it yields $O(1/k^2)$.
- In the strongly convex case it yields accelerated linear convergence with factor $1-\sqrt{\alpha/\beta}$.

## Relationship to the other proof pages

- If you want a proof you can reproduce line-by-line from the material here, use the GD, SGD, prox-GD, and HW4 momentum pages.
- If you want the acceleration logic and theorem map, use this page.

## Common traps

- Saying NAG is identical to Polyak momentum.
- Saying the proof is just the smooth GD proof with a momentum term added.
- Forgetting that the standard statements here are about $f(x_k)-f(x^*)$, not primarily about iterate distance.

## Source trail

- `materials/processed/optimization-for-ml/April7_MomentumBasedOptimization.md`
- `materials/processed/optimization-for-ml/April7_EXTRA_AcceleratedGD_Theory.md`
- [[2026-04-14-exam-2-section-08-momentum-nag]]
- [[2026-04-19-exam-2-key-properties-identities]]
