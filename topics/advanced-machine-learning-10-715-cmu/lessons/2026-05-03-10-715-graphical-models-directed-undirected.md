# 10-715: Directed And Undirected Graphical Models

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-17-RL2 and graphical models 1.md` and `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-19-graphical models 2.md`.

## Table of Contents

- [Why graphical models appear in ML](#why-graphical-models-appear-in-ml)
- [Directed graphical models](#directed-graphical-models)
- [Undirected graphical models](#undirected-graphical-models)
- [Inference versus learning](#inference-versus-learning)
- [Causal caution](#causal-caution)
- [Quick Check](#quick-check)

## Why graphical models appear in ML

Graphical models give probability distributions a visible structure. Variables become nodes. Edges encode dependence assumptions. The goal is to represent a complicated joint distribution without writing one enormous table.

The deeper point is conditional independence. If a graph lets you say which variables are independent given others, it can make inference and learning tractable.

## Directed graphical models

A directed graphical model uses arrows. In a directed acyclic graph, the joint distribution factorizes as:

```text
P(x_1, ..., x_d) = product_i P(x_i | parents(x_i))
```

This is powerful because each variable only needs a local conditional distribution given its parents.

Directed models are natural when the problem has a generative story: first sample a latent topic, then sample words; first sample disease status, then symptoms; first sample a hidden state, then observations.

## Undirected graphical models

An undirected graphical model uses edges without arrows. It represents compatibility through clique potentials:

```text
P(x) proportional to product over cliques psi_c(x_c)
```

Undirected models are useful when relationships are symmetric or when a clean causal direction is not the main point. The price is the normalization constant, which can be hard to compute.

The contrast is:

- directed models factor into conditional probabilities,
- undirected models factor into compatibility functions over cliques.

## Inference versus learning

Inference means answering probability questions once the model is specified. Examples include computing a marginal probability, a conditional probability, or the most likely assignment.

Learning means estimating the model from data. This may involve learning parameters, structure, or both.

These are distinct tasks. A model can be easy to write down but hard to do inference in. A model can make inference possible but still be hard to learn reliably from limited data.

## Causal caution

Directed arrows can look causal, but a directed graphical model is not automatically a causal model. Causal interpretation requires assumptions about interventions, confounding, and how the data were generated.

The useful habit is to separate:

- statistical dependence,
- conditional independence,
- causal direction,
- intervention behavior.

Mixing these up is one of the fastest ways to overclaim from data.

## Quick Check

1. What does a directed acyclic graph let you factorize?
2. How do clique potentials differ from conditional probabilities?
3. What is the difference between inference and learning?
4. Why should directed arrows not be treated as automatically causal?
