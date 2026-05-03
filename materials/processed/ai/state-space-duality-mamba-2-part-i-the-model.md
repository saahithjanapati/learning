# State Space Duality (Mamba-2) Part I - The Model

Source: `https://goombalab.github.io/blog/2024/mamba2-part1-model/`
Source type: `technical blog post / paper explainer`
Site: `Goomba AI Lab`
Published: `2024-05-31`
Authors: `Albert Gu, Tri Dao`
Related paper: `https://arxiv.org/abs/2405.21060`
Related paper title: `Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality`
Paper authors: `Tri Dao, Albert Gu`
Paper venue: `ICML 2024`
Code: `https://github.com/state-spaces/mamba`
Extraction engine: `direct web scrape + arXiv metadata review + manual structured ingest`
Strategy: `canonical blog extraction and beginner-oriented paper normalization`

## Medium-Length Version

This blog post explains the model side of Mamba-2, focusing on `structured state space duality` (`SSD`). The central idea is that a particular state space layer can be viewed in two equivalent ways:

1. as a recurrent state space model that scans left to right with a compact hidden state, and
2. as an attention-like matrix operation that can be trained efficiently with matrix multiplications.

That dual view is useful because ordinary SSM recurrence is naturally efficient for autoregressive inference, while attention-like matrix multiplication is naturally efficient on GPUs and TPUs during training. Mamba-2 tries to keep the good parts of both.

The blog frames Mamba-2 around two questions:

- understanding: how are state space models and attention related?
- efficiency: can Mamba training be accelerated by recasting the computation as matrix multiplication?

The answer is the SSD layer. SSD restricts the recurrent transition matrix more than Mamba-1 did. Mamba-1 uses a diagonal transition matrix. Mamba-2's SSD layer uses a scalar-times-identity transition within a head, meaning all state coordinates in that head share the same recurrence factor. This loses some expressivity, but it unlocks the attention-form view and makes much larger state dimensions practical.

In the attention-like view, SSD resembles causal linear attention. The correspondences are:

- `C` plays a role like queries `Q`,
- `B` plays a role like keys `K`,
- input `X` plays a role like values `V`,
- a structured lower-triangular mask `L` controls how past positions influence later positions.

The mask is not a fixed ordinary causal mask. It depends on products of the recurrence scalars `a_t`, so it can act like an input-dependent discount over distance. This is one way to see Mamba-style selectivity inside an attention-like computation.

The blog's practical takeaway is that Mamba-2 is not just "Mamba but larger." Its core layer is designed so the same sequence transformation can be computed in different modes:

- SSM mode: linear-time recurrent scan, good for inference.
- Attention mode: quadratic but matmul-friendly, useful conceptually and locally.
- SSD algorithm mode: chunkwise/block computation that preserves SSM-like asymptotic efficiency while using matrix multiplications during training.

Empirically, the blog reports that Mamba-2 is competitive with Mamba-1 and Transformers on language modeling while training faster than Mamba-1. It also reports stronger results on a hard multi-query associative recall task, partly because Mamba-2 can use much larger state dimensions.

## Full-Length Version

## The Two Problems Mamba-2 Is Trying To Solve

Mamba-1 made state space models feel like serious competitors to Transformers for long sequence modeling. But the authors were still unsatisfied in two ways.

First, there was a conceptual gap. Structured state space models connect naturally to continuous systems, convolutions, and recurrence. Attention, however, felt separate. Since attention is the dominant sequence-modeling mechanism in modern language models, the authors wanted a cleaner explanation of how SSMs and attention are related.

Second, there was a hardware-efficiency gap. Mamba-1 was designed for fast sequence processing, and its selective scan implementation is important. But modern accelerators are exceptionally optimized for matrix multiplication. A recurrence can have good FLOP counts and still underuse the hardware during training. So the question becomes: can a Mamba-like model be expressed in a way that uses matrix multiplication more directly?

Mamba-2's answer is `structured state space duality`.

## Baseline: The Selective SSM View

A basic selective state space model updates a hidden state over sequence positions:

$$
h_t = A_t h_{t-1} + B_t x_t
$$

$$
y_t = C_t^\top h_t
$$

Here:

- `x_t` is the input at position `t`,
- `h_t` is a hidden state vector,
- `y_t` is the output at position `t`,
- `A_t` controls what the state remembers or forgets,
- `B_t` controls how the current input enters the state,
- `C_t` controls how the state is read out.

The word `selective` means that the parameters can vary with time, and in Mamba-style models they depend on the input. That lets the model decide when to remember, forget, or emphasize information.

The word `structured` means the transition `A_t` is constrained so the model can be computed efficiently. A completely unrestricted `N x N` matrix at each step would be expensive. Mamba-1 uses diagonal structure. Mamba-2 goes further.

## The Small Restriction That Enables The Big Duality

Mamba-1's core SSM uses a diagonal `A_t`. Each state coordinate can have its own recurrence factor.

Mamba-2's SSD layer restricts `A_t` to a scalar-times-identity structure inside a head. Instead of storing one recurrence factor per state coordinate, a head shares one scalar recurrence factor `a_t`.

That means:

- Mamba-1: separate recurrence behavior for each state coordinate.
- Mamba-2: shared recurrence behavior within a head.

At first, this sounds like a loss. Sharing the recurrence dynamics reduces expressivity. But the blog argues that this restriction is exactly what makes the attention-like form possible. In exchange, Mamba-2 can use much larger state sizes and train much faster.

## Multihead SSMs

The blog also reframes SSMs in a multihead way, analogous to attention heads.

For a sequence with `T` positions and a head dimension `P`, the input to one head can be thought of as:

$$
X \in \mathbb{R}^{T \times P}
$$

The state dimension is `N`. In Mamba-2, a head uses shared recurrence dynamics across the `P` channels in that head. To scale up the model width, the architecture uses multiple heads rather than making every channel a separate SSM.

This makes the comparison to attention easier:

- attention has multiple heads with a fixed head dimension,
- Mamba-2 has multiple SSM heads with a fixed head dimension,
- both scale width by adding heads.

## The Attention-Like View

The surprising part is that the same SSD transformation can be written as a matrix multiplication.

The blog defines a lower-triangular matrix `L` built from products of the recurrence scalars `a_t`. Informally, `L[i, j]` says how much information from an earlier position `j` survives until a later position `i`.

Then the SSD mixing matrix is:

$$
M = L \circ C B^\top
$$

where `\circ` means elementwise multiplication.

The output is computed by multiplying this matrix by the input:

$$
y = Mx
$$

This resembles causal linear attention:

$$
Y = (L \circ QK^\top)V
$$

The mapping is:

| SSD symbol | Attention-like role |
| --- | --- |
| `C` | query-like |
| `B` | key-like |
| `X` | value-like |
| `L` | causal/selective mask |

The key point is not that SSD is identical to softmax attention. It is not. SSD drops softmax normalization and uses a special mask based on recurrence products. But the shape of the computation is close enough to reveal a real connection.

## What The Mask Means

In attention, each token decides how much to attend to previous tokens through query-key scores. In SSD, the mask `L` adds another ingredient: a recurrence-based discount.

The blog describes terms like:

$$
a_{i:j}^{\times} = a_i \cdots a_{j+1}
$$

This product can be read as "how much signal from position `j` survives until position `i`." If the product is small, the earlier information is attenuated. If it stays large, the earlier information remains influential.

That gives an intuitive bridge:

- SSM view: `A_t` controls memory and forgetting in the recurrence.
- Attention view: `L` acts like an input-dependent positional mask.

So Mamba-style selectivity appears as a structured attention mask.

## Why This Is Useful Computationally

The blog separates three modes:

### 1. SSM Mode

The recurrence is linear in sequence length and maintains a compact state. This is excellent for autoregressive inference because the model can process one new token using the current state.

### 2. Attention Mode

The matrix view is quadratic in sequence length if used directly, because it builds a `T x T` matrix. That is not asymptotically ideal, but it uses matrix multiplications, which hardware likes.

### 3. SSD Algorithm Mode

The SSD algorithm combines the two. It chunks the sequence, uses the attention-like form within chunks, and passes recurrent state information between chunks. The blog describes this as either a block decomposition of the structured matrix or a chunkwise algorithm.

The goal is to get:

- linear-ish SSM efficiency,
- matmul-friendly training,
- fast autoregressive inference.

## Mamba-2 Compared With Mamba-1

The blog's main comparison is:

| Feature | Mamba-1 | Mamba-2 |
| --- | --- | --- |
| Core layer | selective SSM / S6 | SSD layer |
| `A` structure | diagonal | scalar-times-identity within a head |
| Head dimension | effectively `P = 1` | larger `P`, such as 64 or 128 |
| Typical state dimension | around `N = 16` | can use `N = 64`, `N = 256`, or larger |
| Training | fast, but less matmul-friendly | faster because SSD uses matmuls |
| Inference | very strong | strong, but pure inference tradeoff vs Mamba-1 is not fully settled |

The paper authors are careful not to claim that Mamba-2 strictly dominates Mamba-1 in every possible setting. If the target is pure inference speed at a fixed state size, Mamba-1's less restricted diagonal recurrence might still be better. The advantage of Mamba-2 is that the restriction buys training speed and lets the model use much larger state dimensions.

## Architecture Changes

The blog says the core contribution is the SSD layer and theory, but Mamba-2 also changes the surrounding architecture.

The main architecture change is that Mamba-2 produces the SSM parameters `(A, B, C)` in parallel with the input `X`, instead of producing them sequentially. This is partly conceptually aligned with attention and partly practical: parallel parameter production is easier to scale and more compatible with techniques like tensor parallelism.

## Results Mentioned In The Blog

The blog reports two main empirical points.

First, on language modeling, Mamba-2 appears generally competitive with Mamba-1 and Transformers. The authors say their language-modeling tests were not as extensive as Mamba-1's original evaluation, but the results show similar or slightly better scaling and much faster training than Mamba-1.

Second, on a harder version of multi-query associative recall (`MQAR`), Mamba-2 performs substantially better than Mamba-1. The blog attributes part of this to Mamba-2's ability to use much larger state sizes, while also noting that Mamba-2 seems better even when state size is controlled. The authors leave that as an open question.

## Limitations And Cautions

- The post is Part I of a series, so it states the duality without proving it. The proof is deferred to Part II.
- The detailed SSD algorithm is deferred to Part III and the full paper.
- Mamba-2 may not strictly dominate Mamba-1 for every inference-efficiency target.
- The blog reports promising empirical results, but says Mamba-2 was not tested as extensively as Mamba-1 in the original release.
- The explanation is centered on the model layer; broader deployment tradeoffs depend on implementation, hardware, sequence length, and task.

## Why This Matters

The post matters because it gives a concrete bridge between two major sequence-modeling families:

- recurrence/state-space models, which have compact state and efficient long-sequence inference,
- attention-like models, which are expressive and hardware-friendly during training.

Mamba-2's SSD layer shows that these are not completely separate worlds. With the right structural restriction, a state space model can be viewed as an attention-like matrix operation. That lets the model use recurrent computation where recurrence is best and matrix multiplication where matrix multiplication is best.

## Bottom Line

Mamba-2's core idea is not just "make Mamba bigger." It is:

`restrict the SSM transition just enough to reveal an attention-like dual form, then exploit that duality for faster training while keeping recurrent inference.`

If you remember one sentence, remember this:

`SSD is the bridge that lets Mamba-2 look like an SSM when scanning and like attention when training.`
