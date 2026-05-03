# 10-715: The Homework, Exam, And Proof-Repair Loop

Source note: Based on the processed 10-715 homework, exam, recitation, and graded-copy materials under `materials/processed/advanced-machine-learning-10-715-cmu/`, plus the course curriculum in `topics/advanced-machine-learning-10-715-cmu/curriculum/0-to-1-plan.md`.

## Table of Contents

- [Why passive reading is not enough](#why-passive-reading-is-not-enough)
- [The proof-repair notebook](#the-proof-repair-notebook)
- [The weekly loop](#the-weekly-loop)
- [How to use old exams](#how-to-use-old-exams)
- [What fluency looks like](#what-fluency-looks-like)
- [Quick Check](#quick-check)

## Why passive reading is not enough

10-715 is proof-heavy. Reading a clean proof can create the feeling that the idea is understood, but exam and homework performance depends on reconstruction.

The skill to build is not "recognize the theorem when shown." It is:

- identify the right assumptions,
- choose the right proof template,
- set up the inequalities or optimization conditions,
- repair mistakes under time pressure.

That only comes from solving and correcting problems.

## The proof-repair notebook

For every missed proof, write two short notes.

First, the false move:

```text
I tried to use concentration for the selected ERM hypothesis as if it were fixed.
```

Second, the reusable repair:

```text
Use uniform convergence: prove the concentration event holds for all h in H before allowing ERM to choose h from the data.
```

This turns mistakes into future proof triggers. The goal is not to collect solutions. The goal is to collect reusable patterns.

## The weekly loop

A practical 10-715 week should mix exposition, reconstruction, and timed checks:

1. Read one focused lesson.
2. Reconstruct the main theorem or derivation from memory.
3. Solve two related homework or recitation problems.
4. Compare against solution notes only after a serious attempt.
5. Add false-move and repair notes.
6. End with one mixed problem from an earlier module.

The mixed problem matters because exams rarely announce the proof pattern in advance.

## How to use old exams

Do not start with old exams as first exposure. That usually turns them into confusing answer keys. Use them after the relevant lesson and at least one homework-style practice problem.

Good exam use has stages:

- untimed diagnostic,
- focused repair,
- timed section,
- full mixed set.

Save at least one old exam for a realistic timed run.

## What fluency looks like

Fluency means you can see the structure quickly:

- perceptron mistake bound: progress lower bound plus norm upper bound,
- SVM: margin geometry plus Lagrangian/KKT conditions,
- PAC finite class: bad hypotheses plus union bound,
- VC theory: shattering plus growth-function control,
- RL: Bellman backup or policy-gradient objective,
- diffusion: known noising process plus learned reverse score.

When those patterns become automatic, the course becomes less like memorizing topics and more like recognizing a family of mathematical moves.

## Quick Check

1. Why is reading a proof weaker than reconstructing it?
2. What should go into a proof-repair note?
3. Why should old exams be delayed until after concept practice?
4. Which proof template do you associate with finite-class PAC learning?
