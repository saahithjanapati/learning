# Roll The Dice And Look Before You Leap: Creative Limits Of Next-Token Prediction

Source: `https://arxiv.org/abs/2504.15266`
PDF: `https://arxiv.org/pdf/2504.15266`
HTML: `https://arxiv.org/html/2504.15266`
Code: `https://github.com/chenwu98/algorithmic-creativity`
Title: `Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction`
Authors: `Vaishnavh Nagarajan, Chen Henry Wu, Charles Ding, Aditi Raghunathan`
Venue: `ICML 2025 oral`
Submitted: `2025-04-21`
Latest version: `2025-08-28` (`v4`)
Ingested: `2026-05-03`
Extraction engine: `arXiv page + local PDF extraction with PyMuPDF + manual structured ingest`
Strategy: `canonical PDF extraction and medium/full paper lesson normalization`

## Summary

Nagarajan, Wu, Ding, and Raghunathan study a specific weakness of present language-model training: next-token prediction can be bad at open-ended tasks that require a hidden, stochastic plan before any output tokens are produced. They call these `creative leap-of-thought` tasks.

The paper does not try to measure human creativity directly. Instead, it builds minimal algorithmic tasks that capture some computational ingredients of creativity: producing coherent outputs that are diverse and original rather than memorized from training.

The authors focus on two kinds of creative structure:

- `Combinational creativity`: finding new connections among known entities, such as wordplay, analogies, or research connections.
- `Exploratory creativity`: constructing new patterns under rules, such as puzzles, math problems, plots, or protein-like structured outputs.

They argue that these tasks require an implicit latent plan. A model should first choose some hidden plan or structure, then generate tokens that coherently realize it. Next-token prediction may instead learn local shortcuts that fit later tokens after seeing earlier ground-truth tokens during teacher forcing. This can make learning more data-hungry, memorization-prone, and less diverse.

## Task Suite

The paper defines four minimal open-ended algorithmic tasks.

### Sibling Discovery

The model must generate sibling-parent triples from an in-weights bipartite graph. A coherent string looks like `(child_1, child_2, parent)` where both children share the same parent. The parent comes last, even though the natural hidden plan is to choose the parent first.

This abstracts wordplay where a punchline connects two otherwise separate concepts.

### Triangle Discovery

The model must generate triples of nodes that form triangles in an in-weights graph. This requires coordinating three pairwise relationships simultaneously. The authors relate this to skills such as discovering contradictions, feedback loops, antanaclasis, and word games.

### Circle Construction

The model generates an edge list that can be rearranged into a cycle. The hidden creative object is the resolving permutation: the order that makes the generated pieces form a circle.

### Line Construction

The model generates an edge list that can be rearranged into a line. This is a simpler version of the same exploratory construction problem.

## Algorithmic Creativity Metric

The model receives a finite training set and is then sampled many times. A generation counts as algorithmically creative only if it is:

- coherent according to the task rule;
- original, meaning not memorized from the training set;
- unique among the sampled generations.

The paper's empirical creativity score is:

$$
\hat{cr}_N(T) =
\frac{\mathrm{uniq}(\{s \in T : \neg \mathrm{mem}_S(s) \land \mathrm{coh}(s)\})}{|T|}
$$

This is deliberately narrower than human creativity. It measures a computational proxy: coherent, non-memorized diversity.

## Why Next-Token Prediction Struggles

The paper's core conceptual argument is that next-token prediction is myopic for hidden-plan tasks.

In Sibling Discovery, the efficient hidden plan is:

1. choose a parent;
2. choose two children conditioned on that parent;
3. emit the children first and the parent last.

That requires learning parent-child edges, roughly `O(m * n)` relationships for `m` parents and `n` children each.

But teacher-forced next-token learning predicts later tokens after seeing earlier ground-truth tokens. The model can learn a shortcut: after seeing two siblings, infer the mutual parent. The paper calls this a `Clever Hans` style cheat. Once the later token is easy to predict from the prefix, the model may not learn the hidden latent plan well. Then earlier tokens may be learned through a more complex sibling-sibling distribution, roughly `O(m * n^2)`.

The broader claim is that next-token prediction factorizes a whole sequence into local conditional pieces. Creative leap tasks are more naturally solved by learning a latent plan `z` and then generating the whole sequence conditioned on `z`.

## Alternatives Tested

### Teacherless Multi-Token Training

For Transformers, the authors compare standard next-token teacher forcing to `teacherless` multi-token training. In teacherless training, the model predicts all response positions from the prompt and dummy/masked inputs rather than from the ground-truth prefix. The practical implementation uses a hybrid objective with next-token training.

### Discrete Diffusion

The paper also tests a score entropy discrete diffusion model (`SEDD`, 90M non-embedding parameters). Diffusion starts from a fully masked or corrupted sequence and iteratively denoises it, making it a multi-token generation approach rather than a pure left-to-right next-token predictor.

### Seed-Conditioning

The authors also study how to elicit randomness. Temperature sampling injects randomness at the output distribution. `Seed-conditioning` injects randomness at the input: each training example receives an arbitrary random prefix string, and at test time the model is sampled with new random seeds.

The surprising result is that seed-conditioning can produce strong diversity even under greedy decoding. The paper speculates that a fixed input seed lets the model focus on one latent plan per sample, rather than forcing a single output distribution to marginalize many plans at every token.

## Main Experiments

The paper reports:

- Gemma v1 2B Transformer experiments over four runs;
- GPT-2-sized 86M Transformer experiments;
- 90M SEDD discrete diffusion experiments;
- summarization experiments on XSUM and CNN/DailyMail as a more realistic but less open-ended setting.

The main metric is algorithmic creativity, alongside memorization and diversity analyses.

## Main Findings

### Multi-Token Training Helps Algorithmic Creativity

On Gemma v1 2B, teacherless multi-token training improves algorithmic creativity across all four algorithmic tasks, with nearly a `5x` improvement on the discovery tasks. It also reduces memorization for the larger model.

On smaller models, teacherless training is harder to optimize, but diffusion improves over similarly sized next-token Transformers on three of the four tasks.

### Seed-Conditioning Helps Transformers

Seed-conditioning improves algorithmic creativity for Transformers. With seed-conditioning, greedy decoding can produce diverse outputs, and longer seeds tend to improve creativity up to some limit. Seed-conditioning is often comparable to or better than temperature sampling in these tasks.

The paper does not claim the mechanism is fully understood. It offers hypotheses involving prompt variation, reduced cognitive overload, better coordination of random choices, and optimization effects.

### Summarization Shows A Smaller Signal

On XSUM summarization, larger GPT models trained with teacherless multi-token objectives show higher diversity at fixed ROUGE quality, though the effect is modest. Summarization is not as open-ended as the algorithmic tasks, so this is more of a suggestive check than the central evidence.

## Limitations

- The tasks are intentionally tiny abstractions, not real human creativity.
- The metric captures only coherent, non-memorized diversity, not interestingness or social value.
- The paper focuses on a subset of creativity, not transformative creativity or Big-C creativity.
- Next-token prediction may still outperform multi-token methods on other tasks.
- Teacherless multi-token training can be harder to optimize, especially for smaller models.
- Some tasks remain hard for all methods.
- Seed-conditioning requires special training and may not generalize to realistic data.
- The mechanism behind seed-conditioning is not fully characterized.
- The paper does not settle how RL, chain-of-thought, or test-time search interact with these pretraining-level issues.

## Main Takeaway

The paper argues that open-ended creative generation often requires choosing a hidden plan before generating visible tokens. Next-token prediction can learn local shortcuts instead of that plan, hurting originality and diversity. Multi-token objectives and input-level randomness through seed-conditioning offer a controlled way to study and partly mitigate that failure mode.
