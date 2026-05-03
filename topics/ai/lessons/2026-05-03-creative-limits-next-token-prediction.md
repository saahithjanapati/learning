# Creative Limits Of Next-Token Prediction

Source note: Vaishnavh Nagarajan, Chen Henry Wu, Charles Ding, and Aditi Raghunathan, "Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction." ICML 2025 oral; arXiv:2504.15266v4, submitted April 21, 2025 and last revised August 28, 2025. Source page: [arxiv.org/abs/2504.15266](https://arxiv.org/abs/2504.15266). Processed source: [materials/processed/ai/roll-the-dice-look-before-you-leap-creative-limits-next-token-prediction.md](../../../materials/processed/ai/roll-the-dice-look-before-you-leap-creative-limits-next-token-prediction.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Question](#the-question)
- [What Counts As Creativity Here](#what-counts-as-creativity-here)
- [The Four Minimal Tasks](#the-four-minimal-tasks)
- [Why Next-Token Prediction Is The Target](#why-next-token-prediction-is-the-target)
- [Multi-Token Alternatives](#multi-token-alternatives)
- [Seed-Conditioning](#seed-conditioning)
- [Experiments](#experiments)
- [Main Results](#main-results)
- [What The Paper Does Not Prove](#what-the-paper-does-not-prove)
- [Why This Matters](#why-this-matters)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper asks whether next-token prediction is a good training objective for open-ended creative tasks.

The authors are not talking about creativity as taste, beauty, or cultural importance. They study a narrower computational version: can a model generate many different outputs that are coherent, new, and not copied from the training set?

They build minimal algorithmic tasks that resemble two ingredients of creative work:

- finding new connections among known facts;
- constructing new patterns that satisfy rules.

Then they compare next-token-trained models to multi-token approaches.

Their main claim is:

**Creative leap tasks often require choosing a hidden plan before generating any visible tokens. Next-token prediction can learn local shortcuts instead of learning that hidden plan. Multi-token objectives and seed-conditioning can improve originality and diversity on these tasks.**

### The Core Intuition

Imagine making a pun:

```text
What kind of shoes do spies wear? Sneakers.
```

The punchline `sneakers` must be planned before the setup is finished. The writer does not randomly generate the setup one word at a time and then hope a punchline appears. The writer searches for a hidden connection, then writes the visible text around it.

The paper calls this kind of hidden search-and-plan process a `creative leap of thought`.

Next-token prediction is trained left-to-right. During training, it sees the correct prefix and learns to predict the next token. That can make it myopic. It may learn shortcuts that work only because the prefix already exposes part of the answer.

The authors want tasks where this problem is clean and measurable.

### The Task Suite

They introduce four tasks.

`Sibling Discovery` gives the model examples from an in-weights bipartite graph. A valid output is `(child_1, child_2, parent)`, where both children share the same parent. The hidden plan is naturally to choose the parent first, but the parent appears last.

`Triangle Discovery` asks the model to generate triples of nodes that form triangles in an in-weights graph. This requires coordinating three pairwise relations at once.

`Circle Construction` asks the model to generate edge lists that can be rearranged into a cycle.

`Line Construction` asks the model to generate edge lists that can be rearranged into a line.

The first two tasks are inspired by `combinational creativity`: making new connections among known things. The second two are inspired by `exploratory creativity`: constructing new patterns under rules.

### Algorithmic Creativity

The metric counts how many sampled generations are all three:

- coherent under the task rule;
- original, meaning not memorized from training;
- unique among the generated samples.

The paper calls this `algorithmic creativity`.

This is not a full measure of creativity. It does not measure beauty, usefulness, surprise, social meaning, or taste. But it does isolate a real computational demand: produce many valid new things instead of repeating the data.

### Why Next-Token Learning Can Fail

The Sibling Discovery task gives the clearest intuition.

The efficient generative rule is:

1. choose a parent;
2. choose two children of that parent;
3. output the children first and the parent last.

But in teacher-forced next-token training, the model predicts the parent after seeing both children. That makes the parent easy: it can just infer the mutual parent from the already revealed children. The paper calls this a `Clever Hans` cheat.

The problem is that learning this shortcut can starve the model of pressure to learn the real hidden plan. Then the earlier tokens may be learned with a more complex child-child rule instead of the simpler parent-conditioned rule.

In plain terms:

**The model learns how to complete a visible prefix, not how to choose a good invisible plan.**

### What They Test Instead

The paper tests two multi-token approaches.

First, `teacherless` multi-token training for Transformers. Instead of predicting each token from the ground-truth prefix, the model predicts response tokens from the prompt and dummy/masked inputs. In practice, the authors use a hybrid of teacherless and next-token objectives.

Second, discrete diffusion. A diffusion model starts with a masked or corrupted sequence and iteratively reconstructs it. This is naturally less tied to one left-to-right factorization.

The paper also studies `seed-conditioning`. Instead of using only temperature sampling to inject randomness at the output layer, the model is trained with arbitrary random prefix strings. At test time, new random seeds are prepended. Surprisingly, different seeds can produce different coherent plans even with greedy decoding.

### Results

On Gemma v1 2B, teacherless multi-token training improves algorithmic creativity on all four tasks, with nearly a `5x` gain on the discovery tasks. It also reduces memorization.

On smaller models, teacherless training is harder to optimize, but a 90M discrete diffusion model improves over a similarly sized GPT-2-style next-token model on three of the four tasks.

Seed-conditioning also helps Transformers. It can produce non-trivial algorithmic creativity even with greedy decoding. Longer seeds tend to help. The paper finds seed-conditioning comparable to, and sometimes better than, temperature sampling in these tasks.

The authors also test summarization as a more realistic setting. The signal is weaker because summarization is not very open-ended, but on XSUM, larger GPT models trained with a teacherless objective show slightly better diversity at fixed ROUGE quality.

### Medium Takeaway

The paper's lesson is not that next-token prediction is useless. It is that next-token prediction can be misaligned with tasks where the right answer requires planning a whole hidden structure before producing visible tokens.

For creative search, research ideation, analogy-making, puzzle design, protein design, and other open-ended generation tasks, the training objective should encourage whole-output structure, not only local prefix completion.

## Full-Length Version

## The Question

The paper studies a question that has become more important as language models move from answering questions to generating candidates:

**Can next-token prediction train models to be genuinely diverse and original on open-ended creative tasks?**

The authors are careful about the word `creative`. They are not claiming to measure artistic genius or human taste. Instead, they isolate a computational part of creativity:

- generate outputs that satisfy non-trivial rules;
- generate many different outputs;
- avoid simply memorizing the training examples.

That computational slice matters in many practical settings:

- research idea generation;
- analogy generation;
- wordplay;
- synthetic data generation;
- math problem design;
- puzzle design;
- protein, genome, or molecule generation;
- best-of-N and search-based inference methods that need diverse candidates.

If a model only repeats known examples, or generates many variants of the same pattern, then it may look fluent while being weak at open-ended exploration.

The authors' answer is that next-token prediction can be too local for this setting. It can learn how to continue prefixes without learning the hidden plan that made the whole output work.

## What Counts As Creativity Here

The paper defines a narrow metric called `algorithmic creativity`.

A model is trained on a finite set of examples. At test time, it is sampled many times. A generation counts only if it is:

1. `coherent`: it satisfies the task's rule;
2. `original`: it was not in the training set;
3. `unique`: it is not a duplicate of another sampled generation.

The empirical score is:

$$
\hat{cr}_N(T) =
\frac{\mathrm{uniq}(\{s \in T : \neg \mathrm{mem}_S(s) \land \mathrm{coh}(s)\})}{|T|}
$$

You can read this as:

```text
algorithmic creativity =
number of unique, coherent, non-memorized generations
divided by total sampled generations
```

This metric is intentionally limited. It does not know whether an output is beautiful, useful, funny, socially meaningful, or scientifically important. But it gives the authors a controlled way to measure one thing that many creative tasks need: coherent novelty.

## The Four Minimal Tasks

The paper builds four algorithmic tasks, divided into two types of creativity from Margaret Boden's taxonomy.

### Combinational Creativity

Combinational creativity means making new combinations of known ideas.

Examples:

- a pun connects two concepts through a punchline;
- an analogy connects two domains;
- a research insight connects facts from different areas;
- a contradiction connects statements that were not previously considered together.

The paper abstracts this as graph search over knowledge stored in model weights.

### Sibling Discovery

Sibling Discovery uses a hidden bipartite graph.

There are parent nodes and child nodes. A valid output is:

```text
(child_1, child_2, parent)
```

where both children are neighbors of the parent.

The key trick is the order. The parent comes last, but the natural hidden plan is to choose the parent first. If you choose the parent first, picking two children is easy. If you generate children first, you need them to be compatible with some later parent.

This resembles a joke where the punchline must be planned before the setup, even if the punchline appears last.

### Triangle Discovery

Triangle Discovery uses a graph where valid outputs are triples of nodes forming a triangle.

The model must coordinate three pairwise relationships simultaneously. This is harder than Sibling Discovery because no single parent explains the whole structure. The paper connects this to richer creative search skills:

- discovering contradictions across facts;
- finding feedback loops;
- constructing antanaclasis, where one word works in multiple senses;
- designing word games with several interacting constraints.

### Exploratory Creativity

Exploratory creativity means constructing new patterns under rules.

Examples:

- designing a math problem;
- building a puzzle;
- writing a plot with a resolvable conflict;
- generating a protein-like sequence under structural constraints.

The paper abstracts this as constructing edge lists that resolve into a global structure.

### Circle Construction

The model outputs an edge list. The output is coherent if the edges can be rearranged into a cycle.

The hidden plan is the resolving permutation: the order that makes all the edges form a circle.

Different surface outputs may use different vertices, but if they share the same resolving pattern, the paper can treat them as duplicates. This prevents the model from getting credit for merely renaming the same structure.

### Line Construction

Line Construction is similar, but the edge list must resolve into a line instead of a circle.

This is a simpler exploratory construction task, but it still requires planning a global pattern rather than greedily satisfying only the next edge.

## Why Next-Token Prediction Is The Target

Next-token prediction trains a model to predict token `i` from the previous ground-truth tokens.

That sounds natural for language. But for hidden-plan tasks, the training signal can be misleading.

### The Sibling Discovery Example

Suppose the target sequence is:

```text
child_1, child_2, parent
```

The clean generative story is:

```text
choose parent -> choose child_1 and child_2 -> emit child_1, child_2, parent
```

The hidden plan is the parent.

If there are `m` parents and `n` children per parent, the efficient thing to learn is the parent-child graph. That is roughly `O(m * n)` information.

But next-token training predicts the parent after seeing `child_1` and `child_2`. At that moment, the task is easy: the parent is just the mutual neighbor of the children. The model can exploit the revealed prefix instead of learning the hidden plan. The paper calls this a `Clever Hans` cheat, following Bachmann and Nagarajan's terminology.

Once the model learns this shortcut, the parent token no longer teaches it much about the true latent plan. This is related to `gradient starvation`: the easy shortcut absorbs the training signal.

Then, when the model has to generate the first two child tokens at test time, it may not have a parent plan in mind. It may instead learn a more complicated child-child distribution. That can require roughly `O(m * n^2)` data.

The exact counting is task-specific, but the intuition is simple:

**Next-token learning sees the answer prefix during training, so it can learn shortcuts that do not help it plan from scratch at test time.**

### Why Reordering Does Not Save Everything

For Sibling Discovery, reversing the sequence so the parent comes first helps next-token learning. That confirms part of the mechanism.

But the other tasks are more permutation-invariant. There is no single easy ordering where all the latent structure becomes local. Triangle, circle, and line tasks require global coordination across the whole output. The authors argue this makes them a stronger challenge to proposals that fix next-token prediction by reordering tokens or predicting limited lookahead windows.

## Multi-Token Alternatives

The paper tests two alternatives that are less locally left-to-right.

### Teacherless Multi-Token Training

For Transformers, the paper uses teacherless training.

Standard next-token training maximizes:

$$
J_{\mathrm{next-token}}(\theta)
=
\mathbb{E}_D
\left[
\sum_i \log LM_\theta(\hat{r}_i = r_i ; p, r_{<i})
\right]
$$

This means token `i` is predicted from the prompt `p` and the true previous response tokens `r_<i`.

Teacherless multi-token training instead predicts each response token from the prompt and dummy tokens:

$$
J_{\mathrm{multi-token}}(\theta)
=
\mathbb{E}_D
\left[
\sum_i \log LM_\theta(\hat{r}_i = r_i ; p, \$_{<i})
\right]
$$

The dummy tokens remove the ground-truth prefix. The model cannot rely on seeing earlier answer tokens. It has to learn more about the whole response structure.

The implementation uses a hybrid of teacherless and next-token objectives, so this is not a pure replacement in every experiment.

### Discrete Diffusion

The paper also tests score entropy discrete diffusion (`SEDD`).

A discrete diffusion model starts from a masked or corrupted token sequence and iteratively repairs it. It is naturally more whole-sequence-oriented than left-to-right autoregression. In this paper, diffusion serves as another multi-token approach.

The authors compare a 90M non-embedding-parameter diffusion model to an 86M non-embedding-parameter GPT-2-style next-token model.

## Seed-Conditioning

The second half of the paper is about randomness.

Usually, language models get diversity through output sampling:

- increase temperature;
- use top-k;
- use nucleus sampling;
- sample different next tokens from the output distribution.

The authors call this output-level randomness.

They propose a different idea: inject randomness at the input.

During training, each example gets an arbitrary random prefix string, such as random uppercase characters. This prefix is called a `seed`. During testing, the model receives new random seeds.

The seed has no semantic meaning. It is not a prompt like "be creative." It is just arbitrary noise.

The surprising finding is that the model can learn to use these arbitrary seeds as meaningful sources of variation. With seed-conditioning, even greedy decoding can produce diverse outputs, because different seeds lead the model into different plans.

The authors suggest a few possible explanations.

First, seed-conditioning may act like prompt variation. Different prefixes can move the model into different regions of behavior.

Second, seed-conditioning may reduce `cognitive overload`. Temperature sampling asks one output distribution to represent many possible future plans at every token. A seed might let the model pick one plan up front and execute it coherently.

Third, for next-token prediction specifically, a seed may help coordinate interlocking random decisions before output begins.

The paper is clear that this mechanism is not fully understood.

## Experiments

The paper has three major empirical tracks.

### Gemma v1 2B

The main large-Transformer experiments use Gemma v1 2B, averaged over four runs.

The authors finetune on the four algorithmic tasks and evaluate algorithmic creativity and memorization. Their main Transformer results use seed-conditioning because it gives the best results for both next-token and multi-token training.

### GPT-2 86M And SEDD 90M

For smaller models, the paper compares:

- GPT-2 86M next-token models;
- GPT-2 86M teacherless multi-token variants;
- SEDD 90M discrete diffusion models.

Teacherless training is harder to optimize at this scale, so diffusion is the stronger multi-token comparison.

### Summarization

The authors also try a more realistic task: summarization on XSUM and CNN/DailyMail.

This is not an ideal open-ended creative task. A better summarizer should be faithful, and higher ROUGE often means less diversity. So the authors look at diversity at a fixed quality level, using `1 - Self-BLEU` as a diversity measure and ROUGE as quality.

This experiment is secondary, but it checks whether the algorithmic-task findings have any echo in ordinary NLP.

## Main Results

### Multi-Token Training Improves Algorithmic Creativity

On Gemma v1 2B, teacherless multi-token training improves algorithmic creativity on all four algorithmic tasks. The improvement is especially large on the discovery tasks, nearly a `5x` factor.

This supports the core claim: if a task needs hidden planning, a multi-token objective can encourage the model to learn whole-output structure better than next-token prediction.

### Multi-Token Training Reduces Memorization

For the larger model, the main failure mode of next-token prediction is memorization. The next-token-trained model tends to reproduce training examples. Multi-token training reduces this memorization and improves the count of new coherent outputs.

The paper also argues this is not merely a capacity-control effect. In appendix experiments, the multi-token model can memorize seen seed-output mappings while still producing fresh outputs for unseen seeds.

### Diffusion Helps Smaller Models On Most Tasks

For smaller models, teacherless multi-token training is difficult. The diffusion model improves algorithmic creativity over a similarly sized next-token Transformer on three of four tasks, but is mildly worse on Sibling Discovery.

This supports the broader multi-token argument, even though not every multi-token method wins everywhere.

### Seed-Conditioning Improves Creativity

Seed-conditioning improves algorithmic creativity for Transformers.

Important details:

- it works even with greedy decoding;
- longer seeds usually help;
- it is often comparable to or better than temperature sampling;
- adding a seed helps over a null prefix at fixed temperature;
- it appears to improve diversity more than it reduces memorization.

This is one of the paper's most interesting findings because the seeds are arbitrary. The model learns to turn meaningless input noise into meaningful output diversity.

### Summarization Shows A Modest Signal

On XSUM, larger GPT models with teacherless multi-token training show slightly higher diversity at fixed ROUGE quality. The effect is smaller and less consistent than in the algorithmic tasks, especially on CNN/DailyMail and smaller models.

This is not the paper's strongest evidence, but it suggests the idea may matter beyond toy tasks.

## What The Paper Does Not Prove

The limitations are important.

First, these tasks are abstractions. They deliberately ignore the human, cultural, and usefulness dimensions of creativity.

Second, algorithmic creativity is only a proxy. A high score means many unique, coherent, non-memorized outputs under a formal rule. It does not mean the outputs are valuable.

Third, next-token prediction is not shown to fail on every creative task. The paper shows a controlled class where next-token prediction is suboptimal.

Fourth, teacherless training can be harder to optimize, especially for smaller models. Multi-token objectives are not a free lunch.

Fifth, some tasks remain difficult for all methods. Even when multi-token training wins relatively, absolute creativity can still be low.

Sixth, seed-conditioning is not yet a practical drop-in replacement for temperature sampling. It requires special training, and its real-world generalization is uncertain.

Seventh, the paper does not resolve how reinforcement learning, chain-of-thought, search, or large-scale test-time compute interact with the pretraining problem. Those methods may elicit or refine creative behavior, but the authors argue the base training objective still matters.

## Why This Matters

The paper matters because it frames creativity as a training-objective issue, not just an inference trick.

If a model's base training objective rewards local prefix completion, then later sampling tricks may not recover the hidden planning ability that was never learned well. Raising temperature can produce more varied surface tokens, but it can also hurt coherence. Best-of-N can only select from candidates the model can generate. Chain-of-thought can articulate plans, but only if the model has learned useful planning structure.

The paper's concrete lesson for AI research is:

**For open-ended generation, the model should learn distributions over whole structured outputs, not only local next-token continuations.**

This connects to several active directions:

- multi-token prediction;
- diffusion language models;
- latent-variable generation;
- diversity-aware pretraining;
- seed or prompt conditioning;
- synthetic data generation;
- scientific discovery systems that need many original candidates.

The paper also gives a useful test-bed. Instead of arguing subjectively about whether a model is creative, researchers can ask whether it can generate many new coherent structures under a known rule.

## Memory Checklist

Remember these anchors:

1. The paper studies a computational proxy for creativity: coherent, unique, non-memorized generations.
2. The four tasks are Sibling Discovery, Triangle Discovery, Circle Construction, and Line Construction.
3. Sibling and Triangle are about combinational creativity; Circle and Line are about exploratory creativity.
4. Next-token prediction can learn prefix shortcuts instead of hidden plans.
5. The paper calls one shortcut a `Clever Hans` cheat.
6. Teacherless multi-token training improves algorithmic creativity for Gemma v1 2B.
7. Discrete diffusion improves over a similarly sized next-token Transformer on most small-model tasks.
8. Seed-conditioning injects randomness at the input and can produce diversity even with greedy decoding.
9. The results are about minimal algorithmic tasks, not full human creativity.

The shortest version:

**Creative generation often needs a hidden plan before visible tokens; next-token prediction can miss that plan, while multi-token objectives and seed-conditioning help models generate more original, diverse, coherent outputs.**
