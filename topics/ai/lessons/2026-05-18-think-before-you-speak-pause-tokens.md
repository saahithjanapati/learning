# Think Before You Speak: Pause Tokens For Extra Inference-Time Compute

Source note: This lesson is based on Sachin Goyal, Ziwei Ji, Ankit Singh Rawat, Aditya Krishna Menon, Sanjiv Kumar, and Vaishnavh Nagarajan, "Think Before You Speak: Training Language Models With Pause Tokens," ICLR 2024. Source PDF: [proceedings.iclr.cc](https://proceedings.iclr.cc/paper_files/paper/2024/file/76917808731dae9e6d62c2a7a6afb542-Paper-Conference.pdf). Processed source: [materials/processed/ai/think-before-you-speak-training-language-models-with-pause-tokens.md](../../../materials/processed/ai/think-before-you-speak-training-language-models-with-pause-tokens.md).

Filing note: This is filed normally under `AI / Collection` and cross-listed under [Scale AI Research Internship Prep](../scale-ai-research-internship-prep/README.md) as `pretraining`, `inference-time compute`, `test-time scaling`, `reasoning`, and `pause tokens`.

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)

## Medium-Length Version

The paper asks a strange but useful question: what if a language model could silently think for a few extra token positions before giving its next real answer?

A standard decoder-only Transformer answers immediately. Given `K` previous tokens, it computes `K` hidden vectors per layer, then predicts the next token. The paper argues that this creates an arbitrary compute limit. Some prompts may need more computation than the number of visible input tokens gives the model.

The proposed fix is a learnable `<pause>` token. During inference, append several `<pause>` tokens after the prompt, ignore the model's outputs at those pause positions, and only read the answer after the final pause. The pause tokens contain no new semantic information. They create extra hidden states the model can use before committing to an output.

The key result is that this only works reliably when pause tokens are used during both pretraining and downstream finetuning. A standard pretrained model that sees pause tokens only at finetuning or inference does not consistently benefit. The model must learn early that pause positions are useful computation slots.

In the main 1B-parameter experiments, pause-pretraining plus pause-finetuning beats standard training on 8 of 9 downstream tasks. The headline gains are large on SQuAD, where exact match rises by about 18 points, and on CommonSenseQA, where the gain is about 8 points. GSM8K improves from 7.5% to 8.5%.

The method is simple:

1. During pretraining, randomly insert `<pause>` tokens into C4 sequences and ignore losses where the target is a pause token.
2. During downstream finetuning, append a fixed number of pause tokens after the prompt and train the answer after those pauses.
3. During inference, append pause tokens and ignore the outputs until the delay is over.

The ablations are important. Each task has an optimal number of pause tokens. Too few may not help; too many can hurt. Appending pause tokens generally beats prepending them. The model degrades gracefully if the number of inference pauses changes moderately, but can fail badly if given zero pauses after being trained to expect them.

The paper's best mental model is computational width. Pause tokens add extra token positions per layer, so the model can manipulate more hidden vectors before answering. This differs from chain-of-thought: CoT adds meaningful generated tokens and extra serial depth, while pause tokens add hidden extra compute without readable reasoning.

The caveat is practicality. Pause pretraining is expensive, and the paper studies only 1B and 130M models on C4. The most useful future version would make delays work for already pretrained models or choose the number of pauses adaptively per input.

## Full-Length Version

### Research Question

Language models usually answer as soon as they have read the prompt. That is built into next-token prediction: the next token is predicted from the hidden state at the last prompt position.

The paper asks whether this immediacy is necessary. Maybe some tasks require more internal computation before the model should answer. The model may have enough parameters to perform useful operations, but not enough token positions through which to perform them.

The proposed intervention is deliberately minimal: add a learnable dummy token called `<pause>`, let the model process several copies of it, and ignore all outputs until the pause sequence ends.

### Standard Inference Versus Pause Inference

In standard inference, if the prompt has `K` tokens, the model computes hidden vectors for those `K` positions in each layer and then predicts token `K + 1`.

In pause inference, the prompt is extended:

`prompt + <pause> + <pause> + ... + <pause>`

The model still produces an output distribution at every position, but the outputs during pause positions are ignored. The answer is read only after the final pause token.

This means the model can transform additional hidden vectors before making its first real output. The input information is the same, but the computation graph is wider.

### Pause Pretraining

The pretraining problem is tricky because there is no clean separation between prompt and answer. Every token is both input context and target.

The authors solve this by randomly inserting pause tokens into pretraining sequences. If the next token target is a pause token, that loss is ignored. The model is trained to predict ordinary tokens while having pause tokens available in the context.

In the main setup:

- models are decoder-only;
- sizes are 1B and 130M;
- data is C4 English;
- training uses 200B total tokens;
- pause tokens are inserted at 10% of sequence length;
- the sequence length stays fixed by trimming after insertion;
- the pause token adds only one embedding vector, negligible compared with model size.

Importantly, the total token budget is matched. The pause-pretrained model sees fewer meaningful text tokens because some budget is spent on dummy pauses. So the comparison is not giving pause pretraining extra semantic data.

### Pause Finetuning

For downstream tasks, there is a prompt and a target answer. The method appends `Mft` pause tokens after the prompt, then trains the answer after those pauses.

The paper tries 10 and 50 pause tokens and reports the better value for the main result. It also studies finer-grained values in ablations.

During inference, the model receives `Minf` pause tokens. In the default setting, `Minf = Mft`.

### Four Training Variants

The paper compares four variants.

`StdPT StdFT` is the ordinary baseline: standard pretraining and standard downstream finetuning.

`StdPT PauseFT` uses a standard pretrained model, then introduces pause tokens only during downstream finetuning and inference.

`PausePT StdFT` uses pause pretraining but ordinary downstream finetuning and inference.

`PausePT PauseFT` uses pause tokens in both pretraining and downstream finetuning/inference.

This decomposition is useful because it answers where the benefit comes from. If `StdPT PauseFT` worked well, pause tokens would be easy to apply to existing models. But the paper finds that the strongest gains require `PausePT PauseFT`.

### Main Experiments

The downstream tasks span several types of behavior:

- GSM8K for grade-school math reasoning;
- SQuAD and CoQA for extractive question answering;
- CommonSenseQA and PhysicalIQA for general understanding;
- LAMBADA for long-term context recall;
- HellaSwag for natural language inference/commonsense continuation;
- WebQuestions and Natural Questions for fact recall.

For the 1B model, `PausePT PauseFT` outperforms the standard baseline on 8 of 9 tasks. The exception is HellaSwag.

The most memorable results are:

- SQuAD exact match rises from about 36.4 to 55.9;
- CommonSenseQA exact match rises from about 26.9 to 34.8;
- GSM8K accuracy rises from about 7.5 to 8.5.

The 130M model improves on 6 of 9 tasks, but the gains are weaker. This suggests that pause tokens may require enough model capacity to make use of the extra positions.

### Why Pretraining Matters

`StdPT PauseFT` gives mixed and smaller gains. Sometimes it hurts. This means a pretrained model cannot necessarily learn to use pause tokens from downstream finetuning alone.

The authors suggest that standard pretraining may bias a model to compute quickly. The model has learned that the next useful output should arrive immediately after the prompt. Pause pretraining changes that expectation.

`PausePT StdFT` helps on only a few tasks. That means pause pretraining may improve some representations, but most of the main gain comes when pause computation is actually used at downstream inference.

The lesson is direct:

extra inference-time compute must be trained into the model's computation pattern.

### Ablation: Number Of Pause Tokens

Different tasks prefer different numbers of pause tokens.

GSM8K works best with 10 pause tokens in the paper's setup. SQuAD benefits more from more pauses. Too many pauses can hurt, probably because the model's attention has more irrelevant positions to manage or because the task does not need that much extra compute.

This is a warning against treating pause tokens as a universal "more is better" knob.

### Ablation: Inference-Time Mismatch

The authors train with one number of pause tokens and test with another.

The result is somewhat graceful degradation. If a model was trained with 10 pauses, it can often still perform above baseline with fewer or more pauses across a moderate range.

But zero-pause inference is not robust. A pause-finetuned model can break badly if it is asked to answer immediately. This matters operationally: if a system is trained to depend on pauses, deployment must preserve them.

### Ablation: Appending Versus Prepending

The default method appends pause tokens after the prompt. The authors also try prepending them.

Prepending can still help in some settings, but appending is generally better. That suggests the model learns position-dependent ways of using delays. The pause token is not just a bag of extra vectors; where it appears matters.

### Filler Tokens Do Not Work

The paper also tests delaying a standard model with periods. This does not help.

This is important because it separates pause tokens from the naive idea "just add dummy text." The model has to be trained to use the dummy positions. Otherwise it may ignore them or treat them as meaningless noise.

### Computational Width

The paper's main mechanistic hypothesis is computational width.

In a Transformer layer, each token position gets a hidden vector. With `K` prompt tokens, the model has `K` hidden vectors per layer before predicting the next token. With `M` pause tokens, it has `K + M` vectors.

Those extra positions may let attention distribute across the prompt in more ways. For a reading-comprehension task like SQuAD, perhaps extra pause positions can attend to different candidate evidence spans, then later layers can aggregate them.

The paper gives a theoretical argument that some tasks require many independent operations. Standard inference is bottlenecked by the number of input positions. Pause tokens can create additional positions that help implement those operations.

### Pause Tokens Versus Chain-Of-Thought

Pause tokens and chain-of-thought both delay the final answer, but they are not the same.

Chain-of-thought generates meaningful intermediate tokens. Those tokens become part of the autoregressive context, so they add serial computation depth. They are also readable, inspectable, and steerable.

Pause tokens are silent. They add hidden computation positions without producing meaningful text. They are cheap in wall-clock terms because all positions in a layer are processed in parallel, but they do not provide an interpretable reasoning trace.

The paper's method is therefore closer to trained silent thinking than to ordinary CoT prompting.

### Why This Matters For Test-Time Compute

The broader lesson is that test-time compute is not only about prompting models to write longer answers. It can also be built into the model's input/output protocol.

This matters for future systems because different forms of extra compute have different properties:

- CoT is readable but long and serial;
- search samples many full outputs;
- verifier loops need external checking;
- pause tokens add hidden parallel compute;
- adaptive compute could vary pause length per input.

The paper is an early step toward models that can spend more computation before answering without necessarily exposing intermediate thoughts.

### Critique

The strongest point of the paper is its clean intervention. A single token embedding and a protocol change produce measurable gains when trained consistently.

The main practical weakness is that it requires pretraining. That makes it hard to apply to existing models. The authors explicitly identify direct usefulness on standard pretrained models as a pressing next step.

The second weakness is task sensitivity. Each downstream task has an optimal pause count, and some tasks may prefer no pauses. A real system would need a way to choose pause length dynamically.

The third weakness is robustness. If the system expects pauses, removing them at inference can cause major failures.

The fourth weakness is limited scale. The paper studies 1B and 130M models, not frontier-scale models or modern instruction-tuned chat models.

The fifth weakness is interpretability. The computational-width story is plausible, but we do not yet know what the pause positions actually compute in trained models.

### How To Remember The Paper

The one-line version:

Pause tokens are trained silent thinking slots.

They give the model extra hidden positions before answering. They help most when introduced during both pretraining and finetuning. They are not just filler tokens, and they are not the same as chain-of-thought.

The core mechanism to remember:

standard next-token prediction is immediate; pause training teaches delayed next-token prediction.

The practical caveat:

the delay protocol becomes part of the model. If you train a model to think with pauses, you may need to deploy it with pauses too.

