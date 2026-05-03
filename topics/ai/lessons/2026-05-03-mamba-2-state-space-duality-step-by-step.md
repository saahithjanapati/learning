# Mamba-2 And State Space Duality, Step By Step

Source note: Albert Gu and Tri Dao, "State Space Duality (Mamba-2) Part I - The Model," Goomba AI Lab, published May 31, 2024. Blog: [goombalab.github.io/blog/2024/mamba2-part1-model](https://goombalab.github.io/blog/2024/mamba2-part1-model/). Related paper: Tri Dao and Albert Gu, "Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality," arXiv:2405.21060, ICML 2024. Processed source: [materials/processed/ai/state-space-duality-mamba-2-part-i-the-model.md](../../../materials/processed/ai/state-space-duality-mamba-2-part-i-the-model.md).

This is a slow reading note. The goal is not to memorize the equations first. The goal is to build the picture: Mamba-2 connects state space models and attention by finding two ways to compute the same sequence-mixing layer.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [Step 1: What Problem Are We Solving?](#step-1-what-problem-are-we-solving)
- [Step 2: What Is A Sequence Model Layer?](#step-2-what-is-a-sequence-model-layer)
- [Step 3: The SSM Picture](#step-3-the-ssm-picture)
- [Step 4: The Attention Picture](#step-4-the-attention-picture)
- [Step 5: The SSD Bridge](#step-5-the-ssd-bridge)
- [Step 6: Why Mamba-2 Restricts The Recurrence](#step-6-why-mamba-2-restricts-the-recurrence)
- [Step 7: Why This Helps Training](#step-7-why-this-helps-training)
- [Step 8: What Changed From Mamba-1?](#step-8-what-changed-from-mamba-1)
- [Step 9: What The Results Mean](#step-9-what-the-results-mean)
- [What To Be Careful About](#what-to-be-careful-about)
- [Memory Checklist](#memory-checklist)
- [Quick Check](#quick-check)

## Medium-Length Version

Mamba-2 is trying to improve Mamba by solving two problems at once.

The first problem is conceptual. State space models (`SSMs`) and attention both process sequences, but they usually look like different species. SSMs look like recurrence: carry a hidden state forward through time. Attention looks like pairwise token comparison: let each token look back at previous tokens. Mamba-2 asks whether these views are more connected than they seem.

The second problem is computational. Mamba-1 is efficient, especially for inference, but training recurrences is not always as hardware-friendly as attention. GPUs and TPUs are extremely good at matrix multiplication. So Mamba-2 asks whether a Mamba-like layer can be rewritten in a matrix-multiplication form.

The answer is `structured state space duality`, or `SSD`.

The SSD layer can be viewed in two equivalent ways:

1. **SSM mode:** update a compact hidden state from left to right.
2. **Attention-like mode:** build a structured matrix and multiply it by the input sequence.

The SSM view is good for inference because the model only needs to keep a state. The attention-like view is good for understanding and for efficient training kernels because it exposes matrix multiplications.

The price is a restriction. Mamba-1 uses a diagonal recurrence matrix, meaning each state coordinate can have its own recurrence behavior. Mamba-2's SSD layer restricts that to a scalar-times-identity recurrence inside each head. In plain English: within a head, the state coordinates share the same "remember/forget" factor.

That sounds weaker, but it unlocks a useful duality. Once the recurrence is restricted this way, the layer can be written in an attention-like form:

$$
M = L \circ C B^\top
$$

Here:

- `B` behaves somewhat like keys,
- `C` behaves somewhat like queries,
- `X` behaves somewhat like values,
- `L` is a structured lower-triangular mask built from recurrence factors.

The mask `L` is the important part. It says how much information from an earlier token survives to a later token. In the SSM view, this is memory decay. In the attention view, it looks like an input-dependent positional mask.

So the main idea is:

`Mamba-2 makes an SSM layer structured enough that it can also be computed like attention.`

The practical payoff is that Mamba-2 can train much faster than Mamba-1 while using larger state dimensions. The blog reports competitive language modeling and stronger performance on a hard associative recall task.

## Full-Length Version

## Step 1: What Problem Are We Solving?

A language model has to mix information across a sequence.

If the model reads:

```text
The city council denied the permit because it ...
```

the meaning of `it` depends on earlier words. Sequence models need a way for later positions to use earlier information.

Transformers solve this with attention. Every token can compare itself to previous tokens and decide what to use.

SSMs solve this with a carried state. As the model scans the sequence, it updates a hidden state that stores compressed information about the past.

The core question behind Mamba-2 is:

**Can one layer behave like an SSM and also be understood like attention?**

That question matters because the two views have different strengths.

| View | Strength | Weakness |
| --- | --- | --- |
| SSM / recurrence | compact state, efficient autoregressive inference | less naturally matched to GPU matmul training |
| Attention-like matrix form | hardware-friendly matrix multiplication, clear pairwise-token view | direct form can be quadratic in sequence length |

Mamba-2 wants both.

## Step 2: What Is A Sequence Model Layer?

A sequence layer takes a sequence of input vectors and returns a sequence of output vectors.

For a sequence length `T`, you can picture this as:

```text
x_1, x_2, x_3, ..., x_T
        |
        v
y_1, y_2, y_3, ..., y_T
```

The hard part is not applying a feedforward network to each position independently. The hard part is `token mixing`: making `y_t` depend on useful information from earlier positions.

Attention mixes tokens by direct comparison. Recurrence mixes tokens by passing state forward.

Mamba-2's SSD layer says: for a certain structured layer, these are two views of the same transformation.

Pause and check:

- If a model uses attention, how does position `t` get information from position `j`?
- If a model uses recurrence, how does position `t` get information from position `j`?

## Step 3: The SSM Picture

Start with the state-space recurrence:

$$
h_t = A_t h_{t-1} + B_t x_t
$$

$$
y_t = C_t^\top h_t
$$

Read this slowly.

`h_t` is the memory after reading token `t`.

`A_t h_{t-1}` says: take the previous memory and transform it. This is the "keep or forget the past" part.

`B_t x_t` says: write the current token into memory.

`C_t^\top h_t` says: read from memory to produce the output.

So one timestep is:

```text
old memory + current token -> new memory -> output
```

The selective part means the model can change `A_t`, `B_t`, and `C_t` depending on the input. In practice, this lets the layer decide what to remember or ignore at each token.

An ordinary example:

```text
Alice, um, the project lead, approved the plan.
```

A selective model may learn that `Alice` and `project lead` matter, while `um` should be mostly ignored. The recurrence can use input-dependent gates to manage that.

## Step 4: The Attention Picture

Attention usually has queries, keys, and values:

- a query asks, "what am I looking for?"
- a key says, "what information do I contain?"
- a value says, "what content should be passed along?"

In causal attention, position `i` can look back at positions `j <= i`. A simplified linear-attention-like form is:

$$
Y = (L \circ QK^\top)V
$$

Here `L` is a lower-triangular causal mask. It prevents future tokens from influencing past tokens.

The important shape is:

```text
compare positions -> make a mixing matrix -> mix values
```

That feels very different from recurrence, which is:

```text
carry state -> update state -> read state
```

Mamba-2's claim is that SSD can be written both ways.

## Step 5: The SSD Bridge

SSD stands for `structured state space duality`.

The phrase has three layers:

- `SSD model`: the actual layer used in Mamba-2.
- `SSD framework`: the broader math connecting SSMs and attention-like models.
- `SSD algorithm`: the efficient way to compute the layer.

This blog post is mostly about the `SSD model`.

The attention-like SSD form is:

$$
M = L \circ C B^\top
$$

and then the layer applies `M` to the input.

The analogy is:

| SSD | Attention-like interpretation |
| --- | --- |
| `C` | query-like |
| `B` | key-like |
| `X` | value-like |
| `L` | causal/selective mask |

Do not overread the analogy. SSD is not the same thing as standard softmax attention. It drops softmax normalization and uses a special mask. But the comparison is strong enough to explain why Mamba-2 can use matrix multiplication more naturally.

## Step 6: Why Mamba-2 Restricts The Recurrence

In Mamba-1, the recurrence matrix `A_t` is diagonal. That means every state coordinate can have its own recurrence factor.

In Mamba-2, inside one head, `A_t` is restricted to scalar-times-identity:

$$
A_t = a_t I
$$

This means every state coordinate in that head shares the same recurrence scalar `a_t`.

That is the key tradeoff.

Mamba-1 has more flexible recurrence dynamics. Mamba-2 has more shared structure. But the shared structure makes the dual attention-like form possible.

A useful analogy:

```text
Mamba-1: every instrument in the section follows its own volume envelope.
Mamba-2: the section shares one volume envelope, but can afford a much larger section and play faster during training.
```

The blog's argument is that this shared recurrence is often good enough because selectivity is frequently about deciding whether the whole state should remember or ignore a token.

## Step 7: Why This Helps Training

A recurrence can be efficient in theory but awkward for training hardware.

Modern accelerators are built around matrix multiplication. Attention uses many matrix multiplications, so it maps well to the hardware even when it has more raw operations.

SSD gives Mamba-2 a way to use matmul-friendly computation without abandoning the SSM view.

The blog describes three computation modes:

### SSM Mode

Use the recurrence directly:

```text
h_1 -> h_2 -> h_3 -> ... -> h_T
```

This is natural for inference. When a new token arrives, update the state.

### Attention Mode

Build the structured matrix and multiply:

```text
M = L o C B^T
Y = M X
```

This is conceptually clean and matmul-friendly, but directly forming a `T x T` matrix can be expensive for long sequences.

### SSD Algorithm Mode

Chunk the sequence. Use attention-like computation inside chunks and pass state between chunks.

```text
[chunk 1] -> state -> [chunk 2] -> state -> [chunk 3]
```

That is the "best of both worlds" idea: get the hardware benefits of matrix multiplication while preserving SSM-like scaling.

## Step 8: What Changed From Mamba-1?

The blog highlights two core changes.

First, Mamba-2 uses scalar recurrence per head rather than diagonal recurrence per channel.

Second, Mamba-2 uses larger head dimensions, more like attention. Mamba-1 effectively has head dimension `P = 1`; Mamba-2 can use head dimensions like `P = 64` or `P = 128`.

That lets Mamba-2 use much larger state dimensions. The blog contrasts Mamba-1's typical `N = 16` with Mamba-2 settings like `N = 64`, `N = 256`, or larger.

The short version:

```text
Mamba-1: more flexible per-coordinate dynamics, smaller state.
Mamba-2: shared dynamics within a head, much larger state, faster training.
```

## Step 9: What The Results Mean

The blog reports that Mamba-2 is generally competitive with Mamba-1 and Transformers on language modeling, while training faster than Mamba-1.

It also highlights a synthetic task: multi-query associative recall (`MQAR`). This task tests whether a model can remember and retrieve multiple key-value associations across a sequence. Mamba-2 performs much better than Mamba-1 on the harder version they tested.

One likely reason is the larger state size. If the model has more state capacity, it can store more information for recall. But the authors also note that Mamba-2 can look better even when controlling for state size, and they leave that as something worth studying.

## What To Be Careful About

Mamba-2 is not simply "attention but linear" or "Mamba-1 but better."

Be careful about these points:

- SSD is attention-like, but it is not standard softmax attention.
- Mamba-2 restricts recurrence dynamics, so it may trade some expressivity for efficiency.
- The blog post explains the model; the full proof of the duality is in the later theory discussion.
- The detailed efficient algorithm is not fully derived in this Part I post.
- The authors do not claim Mamba-2 strictly dominates Mamba-1 for every inference setting.

## Memory Checklist

Remember these first:

- `SSM`: a sequence layer that carries a hidden state through time.
- `Selective SSM`: the recurrence parameters depend on the input, so the layer can choose what to remember or forget.
- `Mamba-1`: a selective SSM with diagonal recurrence structure.
- `SSD`: Mamba-2's structured state space dual layer.
- `Duality`: the same SSD layer can be viewed as recurrence or as an attention-like matrix operation.
- `Scalar-times-identity`: Mamba-2 shares one recurrence scalar inside a head.
- `L mask`: the structured lower-triangular matrix that says how past information decays into future positions.
- `Training payoff`: SSD enables matmul-friendly computation.
- `Inference payoff`: the SSM view still supports compact recurrent state.

## Quick Check

Try answering these without looking back.

1. What are the two problems Mamba-2 is trying to solve?
2. In the recurrence equation, what do `A_t`, `B_t`, and `C_t` roughly do?
3. What restriction does Mamba-2 place on `A_t`?
4. Why would that restriction help expose an attention-like form?
5. What is the role of the `L` mask?
6. Why is matrix multiplication important for training speed?
7. Why might Mamba-2 use larger state sizes than Mamba-1?

One-sentence answer to aim for:

`Mamba-2 uses SSD to make a selective state space layer that can be computed like a recurrence for inference and like structured attention for efficient training.`
