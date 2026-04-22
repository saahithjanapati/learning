# 8. Causality, Interventions, and Discovery

## Table of Contents

- [[#Big Picture]]
- [[#0. How To Use This Section]]
- [[#8.0 Observing Is Not the Same as Intervening]]
- [[#8.1 Conditioning Versus Intervention, Slowly]]
- [[#8.2 Backdoor, Slowly]]
- [[#8.3 Front-Door, Slowly]]
- [[#8.4 Do-Calculus at a High Level]]
- [[#8.5 Causal Discovery and Markov Equivalence]]
- [[#8.6 SGS and PC, Slowly]]
- [[#8.7 What Interventions Buy You for Discovery]]
- [[#8.8 What You Should Be Able To Say Out Loud]]
- [[#Formal Anchors]]
- [[#Worked Problems]]

## Big Picture

This section introduces a genuinely new kind of question.

Earlier in the course, most questions were observational:

- if I observe some variables, what can I infer about other variables?

Causality asks a different question:

- what would happen if I actively changed part of the system?

That is why this section matters.

It is not “just more probabilistic inference.”
It is a shift from:

- seeing

to

- doing

## 0. How To Use This Section

Primary lecture coverage:

- `Lecture 22`
- `Lecture 23`
- `Lecture 24`
- `Lecture 25`

This section uses a lot of graph language.

If you feel lost, always ask:

- am I merely observing a variable?
- or am I forcing it to a value?

That one distinction clears up a huge amount of confusion.

## 8.0 Observing Is Not the Same as Intervening

Suppose you observe that a patient took a treatment.

That does **not** mean the same thing as you randomly assigning that treatment yourself.

Why not?

Because in the observational world, the reasons the patient took the treatment may themselves be related to the outcome.

That is confounding.

So causal inference begins from a warning:

correlation is not automatically intervention effect.

## 8.1 Conditioning Versus Intervention, Slowly

Conditioning means:

- you observe `T=t`
- you update beliefs about everything else

Intervention means:

- you set `T=t`
- you break the normal causal mechanism that would have chosen `T`

This is why the notation
$$
P(Y \mid T=t)
$$
is different from
$$
P(Y \mid do(T=t)).
$$

In words:

- `P(Y | T=t)` = what outcomes are associated with treatment level `t` in the observational world
- `P(Y | do(T=t))` = what outcomes would happen if we forced treatment to `t`

The two only match under special conditions.

That is the whole reason causal graphs matter.

## 8.2 Backdoor, Slowly

Backdoor is the friendliest causal-identification criterion in the course.

Suppose you want the causal effect of treatment `T` on outcome `Y`.

A set `W` satisfies the backdoor criterion if:

- no variable in `W` is a descendant of `T`
- `W` blocks all backdoor paths from `T` to `Y`

What is a backdoor path?

Any path that starts by going **into** `T`.

Why do we care about those paths?

Because they are the paths along which confounding sneaks in.

So the practical meaning of backdoor is:

find variables that block the noncausal routes from treatment to outcome, without blocking the effect you actually want.

If `W` satisfies the criterion, then
$$
P(Y \mid do(T=t))
=
\sum_w P(Y \mid T=t, W=w)P(W=w).
$$

That formula is adjustment.

### Important beginner warning

Not every “related variable” is a good thing to condition on.

For example:

- conditioning on a confounder can help
- conditioning on a mediator may destroy the total causal effect you wanted
- conditioning on a collider can create spurious dependence

So do not think “more conditioning is always safer.”
That is false.

## 8.3 Front-Door, Slowly

Front-door is more delicate than backdoor.

It uses a mediator `M` between `T` and `Y`.

The rough story is:

- treatment affects mediator
- mediator affects outcome
- the graph is arranged so that this mediator pathway can be used to identify the causal effect, even when simple backdoor adjustment is unavailable

The front-door criterion has several technical conditions, but the most important beginner idea is:

front-door works by using a clean mediator pathway to reconstruct the effect of treatment on outcome.

So if backdoor is:

- “block the bad noncausal paths”

then front-door is more like:

- “exploit the right mediator structure when direct confounding blocks the easy route”

## 8.4 Do-Calculus at a High Level

Do-calculus is the general symbolic toolkit for manipulating intervention expressions.

You do **not** need to think of it as mystical formula pushing.

At a high level, it is:

- graph surgery
- plus conditional-independence reasoning
- plus rules for when observation and intervention expressions can be transformed

Backdoor and front-door are the friendliest special cases.

So if full do-calculus feels intimidating, that is okay.
The main conceptual point is:

there is a systematic graphical logic for transforming causal quantities, not just ad hoc tricks.

## 8.5 Causal Discovery and Markov Equivalence

Now a different question:

what if you do **not** know the graph?

Causal discovery tries to infer causal structure from conditional independences in the data.

But there is a fundamental obstacle:

different DAGs can imply the same observational independence structure.

This is called **Markov equivalence**.

So observational data does not usually identify one unique causal DAG.
Instead it identifies an equivalence class.

This is why the PC algorithm often returns a partially directed graph rather than a completely directed one.

## 8.6 SGS and PC, Slowly

The course presents two related discovery algorithms.

### SGS

This is the conceptually simple but expensive version.

High-level plan:

1. start with a complete graph
2. test conditional independences
3. remove edges when independence evidence says they should not be there
4. orient some edges using collider logic

### PC

PC is the more efficient practical version of the same style of idea.

It still uses conditional-independence tests, but it organizes them more cleverly.

The key beginner point is:

PC is not a likelihood-based learning algorithm.
It is a **constraint-based** discovery algorithm.

It learns from which conditional independences appear to hold.

## 8.7 What Interventions Buy You for Discovery

Observational data alone often leaves edge directions ambiguous because of Markov equivalence.

Interventions can break those ambiguities.

Why?

Because when you actively manipulate one variable, the resulting changes in the rest of the system reveal asymmetries that plain observation cannot.

So interventions are useful in two different ways:

- to estimate causal effects once a graph is known
- to help learn the graph itself

That second role is easy to overlook, but it is a major conceptual point of the later lectures.

## 8.8 What You Should Be Able To Say Out Loud

By the end of this section, you should be able to say:

> Causal inference is different from ordinary probabilistic inference because observing a variable is not the same as intervening on it. Backdoor adjustment blocks confounding paths. Front-door uses a mediator structure when simple adjustment is not available. Causal discovery from observational data is limited by Markov equivalence, which is why algorithms like PC often identify only partial orientation. Interventions can help both estimate effects and resolve discovery ambiguity.

If you can say that clearly, you have the real conceptual backbone of the section.

## Formal Anchors

These are the causal statements worth being able to recognize and write cleanly.

### Observation versus intervention

Observing
$$
P(Y\mid T=t)
$$
is not the same as intervening:
$$
P(Y\mid do(T=t)).
$$

An intervention breaks the original structural mechanism for `T` and sets it externally.
In graph language, you can think of `do(T=t)` as cutting the incoming edges into `T` and forcing the treatment node to the chosen value.

### Backdoor adjustment

If a set `W` blocks all backdoor paths from treatment `T` to outcome `Y` and contains no descendants of `T`, then
$$
P(Y\mid do(T=t))=\sum_w P(Y\mid T=t,W=w)P(W=w).
$$

This is the standard adjustment formula.

### Front-door identification

Under the front-door conditions, the causal effect can be expressed through mediator adjustment terms.
The standard front-door formula is
$$
P(Y\mid do(T=t))
=
\sum_m P(m\mid T=t)\sum_{t'} P(Y\mid m,T=t')P(T=t').
$$

At course level, the key point is that mediator structure can identify effects even when simple backdoor adjustment fails.

### Do-calculus

Do-calculus gives graphical rules for transforming intervention expressions into other expressions when the graph structure licenses those manipulations.

Backdoor and front-door are important friendly special cases of this broader logic.

### Markov equivalence

Different DAGs can imply the same observational conditional independences.
At a high level, observational equivalence is tied to sharing the same skeleton and the same unshielded collider structure.

This is why observational data alone often identifies an equivalence class rather than a unique DAG.

### Constraint-based discovery

Algorithms like SGS and PC use conditional-independence tests to remove and orient edges.
They are not primarily likelihood-based fitting procedures.

## Worked Problems

### Problem 8.1

Why is
$$
P(Y\mid T=t)
$$
not automatically equal to
$$
P(Y\mid do(T=t))?
$$

### Solution

Because observing `T=t` leaves intact whatever factors caused treatment assignment in the observational world.
Those factors may also affect `Y`, creating confounding.

An intervention `do(T=t)` instead forces `T` to the chosen value and breaks its usual causes.

So the observational association and the causal effect can differ.

### Problem 8.2

What is the purpose of a backdoor adjustment set?

### Solution

Its purpose is to block all noncausal paths from treatment to outcome that begin by entering the treatment node.
By conditioning on such a set, you remove confounding influence without blocking the causal pathway you want to estimate.

### Problem 8.3

Why is conditioning on "more variables" not always safer in causal inference?

### Solution

Because different variables play different causal roles.

- conditioning on a confounder can help
- conditioning on a mediator can change the effect being estimated
- conditioning on a collider can create spurious dependence

So causal adjustment is about choosing the right variables, not the largest possible set.

### Problem 8.4

At a high level, how does front-door identification differ from backdoor adjustment?

### Solution

Backdoor adjustment blocks noncausal confounding paths between treatment and outcome.

Front-door identification instead uses a mediator pathway with the right graphical structure to reconstruct the causal effect, even when a simple confounder-blocking adjustment is unavailable.

### Problem 8.5

Why can observational data fail to identify a unique causal DAG?

### Solution

Because different DAGs can imply exactly the same set of observational conditional independences.
Such DAGs are Markov equivalent.

So conditional-independence information alone often determines only an equivalence class, not one uniquely oriented graph.

### Problem 8.6

What kind of method is the PC algorithm?

### Solution

PC is a constraint-based causal discovery algorithm.
It uses conditional-independence tests to:

- remove edges that are not supported
- orient some remaining edges using collider and consistency logic

It is not primarily a likelihood-maximization algorithm.

### Problem 8.7

Why do interventions help with causal discovery as well as causal-effect estimation?

### Solution

Observational data often leaves directions ambiguous because multiple DAGs are Markov equivalent.
Interventions break some of those symmetries by actively perturbing one part of the system and observing asymmetric downstream changes.

That extra asymmetry provides orientation information that pure observation cannot always supply.
