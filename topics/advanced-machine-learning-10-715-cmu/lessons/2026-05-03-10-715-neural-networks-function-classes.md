# 10-715: Neural Networks As Function Classes

Source note: Based on CMU 10-715 processed notes `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-06-neural networks 1.md` and `materials/processed/advanced-machine-learning-10-715-cmu/lecture-notes-15-NeuralNetworks.md`.

## Table of Contents

- [The right question](#the-right-question)
- [From perceptrons to networks](#from-perceptrons-to-networks)
- [Representation, optimization, generalization](#representation-optimization-generalization)
- [Why XOR matters](#why-xor-matters)
- [Modern network motifs](#modern-network-motifs)
- [Quick Check](#quick-check)

## The right question

Neural networks are not just "more complicated classifiers." In 10-715, they are a way to revisit the whole course through a modern function class.

For any model class, ask three separate questions:

- Representation: can the class express the target function?
- Optimization: can training find a good member of the class?
- Generalization: if training succeeds, will the model work on new data?

Keeping these questions separate prevents a common mistake. A model can be expressive but hard to optimize. It can fit training data but generalize poorly. It can generalize well in practice even when the cleanest classical theorem does not explain why.

## From perceptrons to networks

A perceptron forms one linear decision boundary. A neural network stacks many units with nonlinear activations. Each layer transforms the representation passed to the next layer.

The nonlinearity is essential. Without nonlinear activations, a stack of linear layers collapses into one linear map. Depth only becomes meaningful when layers can bend and recombine features.

This is the conceptual bridge from linear separators to modern models. Instead of hand-designing a feature map and using a linear classifier, a neural network learns intermediate representations.

## Representation, optimization, generalization

Representation asks whether a network architecture is capable of expressing a function. Wider and deeper networks can represent more complicated functions, but expressivity alone is not enough.

Optimization asks whether gradient-based training can find useful parameters. Neural-network objectives are nonconvex, so the SVM-style convex optimization story no longer applies cleanly.

Generalization asks why a network trained on finite data performs well outside the sample. Classical capacity measures can be too pessimistic for overparameterized networks, so modern explanations often involve implicit bias, architecture, data structure, regularization, and optimization dynamics.

## Why XOR matters

XOR is the classic small example. A single linear classifier cannot separate the XOR labels in two dimensions. But a small neural network can create hidden features that make the problem linearly separable in a later layer.

This shows the central idea without hype: hidden layers can transform the input into a representation where a simple decision rule works.

## Modern network motifs

Different architectures encode different assumptions:

- multilayer perceptrons treat input features relatively generically,
- convolutional networks build in locality and translation structure,
- residual connections make deep optimization easier by allowing layers to learn corrections,
- normalization and regularization tools stabilize training and control behavior.

The 10-715 takeaway is not to memorize every architecture. It is to connect modern networks back to the course's core questions: what functions can this class express, what algorithm trains it, and what explains its out-of-sample behavior?

## Quick Check

1. Why does a stack of purely linear layers collapse into one linear map?
2. Which question is about expressivity: representation, optimization, or generalization?
3. Why is XOR useful as a teaching example?
4. Why do SVM-style convex guarantees not transfer directly to neural networks?
