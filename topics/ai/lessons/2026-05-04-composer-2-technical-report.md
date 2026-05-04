# Composer 2 Technical Report

Source note: [materials/processed/ai/composer-2-technical-report.md](../../../materials/processed/ai/composer-2-technical-report.md)

## Table of Contents

1. [Medium-Length Version](#medium-length-version)
2. [Full-Length Version](#full-length-version)

## Medium-Length Version

Composer 2 is a good example of domain-specialized post-training. Cursor is not trying to make a general-purpose chat model that happens to code well. It is training a model specifically for long-horizon software engineering with tools, plans, environment interaction, and realistic codebase tasks.

The report says the model has two training phases. First comes continued pretraining to strengthen knowledge and latent coding ability. Then comes large-scale reinforcement learning aimed at end-to-end coding performance. The RL phase is important because the deployed job is not "predict the next token in a clean benchmark." It is "solve a messy software task across many steps without losing coherence."

The paper's strongest conceptual point is train-deploy alignment. Composer 2 is trained in the same kind of Cursor harness used in deployment, with equivalent tools and structure. That reduces the familiar failure mode where a model looks strong on research benchmarks but breaks in real agent loops.

## Full-Length Version

### What problem is Composer 2 solving?

Cursor wants a model that can act like a strong coding agent, not merely a code autocompleter. That means the model needs:

- long-term planning,
- strong code intelligence,
- multi-step execution,
- tool use,
- consistency across realistic repository tasks.

### The two-phase training story

Phase one is continued pretraining. This improves knowledge, code fluency, and latent capability.

Phase two is large-scale RL. The point is to optimize the actual behavior that matters in deployment: reasoning through software tasks, staying coherent over many steps, and using the harness productively.

### Why the harness matters

The report repeatedly emphasizes that training uses the same style of harness and tools as deployment. This is important because agentic software engineering is very sensitive to workflow mismatch. A model trained only on static completions may still fail badly when asked to inspect files, run tools, revise plans, and recover from mistakes.

### Why the report matters

Composer 2 is evidence for a larger trend: frontier capability may increasingly come from domain-specialized post-training loops in realistic environments rather than only from general base-model scaling.

### Limitation and caution

Technical reports from product labs naturally emphasize benchmark wins and system design that helped their own product. The broader open question is how portable the recipe is outside the Cursor stack.

### Final takeaway

Composer 2 is best understood as `software-engineering RL in a realistic product harness`, not just another coding benchmark model.
