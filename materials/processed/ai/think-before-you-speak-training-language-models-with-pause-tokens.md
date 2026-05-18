# Think Before You Speak: Training Language Models With Pause Tokens

Source: `https://proceedings.iclr.cc/paper_files/paper/2024/file/76917808731dae9e6d62c2a7a6afb542-Paper-Conference.pdf`
Title: `Think Before You Speak: Training Language Models With Pause Tokens`
Authors: Sachin Goyal, Ziwei Ji, Ankit Singh Rawat, Aditya Krishna Menon, Sanjiv Kumar, Vaishnavh Nagarajan
Venue: ICLR 2024
Ingested: `2026-05-18`
Extraction engine: `official ICLR PDF via PyMuPDF text extraction`
Strategy: `paper extraction, structured study note, medium/full AI lesson normalization, and Scale AI prep cross-filing`
Regular filing: `AI / Collection`
Research prep filing: `Scale AI research internship prep; pretraining; inference-time compute; reasoning; test-time scaling`

## Summary

This paper explores a simple way to give decoder-only Transformers extra computation before they answer: append learnable dummy `<pause>` tokens to the input, ignore the model's outputs while it processes those pause tokens, and only read the answer after the last pause token.

The core claim is not that off-the-shelf models automatically benefit from arbitrary filler tokens. The paper finds that pause tokens help mainly when the model is trained to use them during both pretraining and downstream finetuning. A model that only sees pause tokens during downstream finetuning gets weaker and less consistent gains.

In the main 1B-parameter experiments, pause-pretraining plus pause-finetuning outperforms standard pretraining plus standard finetuning on 8 of 9 downstream tasks. The largest reported gains include about 18 exact-match points on SQuAD, up to 8 points on CommonSenseQA, and an improvement on GSM8K from 7.5% to 8.5% accuracy.

The paper frames pause tokens as a form of delayed next-token prediction. They add almost no parameters, but they increase the number of per-layer hidden vectors the model can manipulate before committing to the next output.

## Core Idea

Standard causal language models generate immediately. Given `K` previous tokens, the model computes `K` hidden vectors per layer and then predicts token `K + 1`.

The paper asks: what if the model could compute over `K + M` hidden vectors before producing the next real token?

The proposed mechanism is:

1. add a new learnable token, `<pause>`, outside the normal vocabulary;
2. append one or more copies of `<pause>` after the prompt;
3. ignore the outputs corresponding to those pause positions;
4. begin decoding only after the final pause token.

The pause tokens do not add meaningful text to the prompt. Their job is to create extra computational pathways inside the Transformer.

## Pause Pretraining

For pretraining, every token is normally both input and target, so there is no clean "prompt then answer" boundary. The paper handles this by randomly inserting `<pause>` tokens into pretraining sequences.

If a sequence has tokens `p1:N`, the method inserts `Mpt` pause tokens at random locations, producing a longer sequence. The model is trained with the ordinary next-token loss except that losses requiring the model to predict the pause token itself are ignored.

In the main experiments, the authors insert pause tokens at 10% of sequence length during pretraining, use C4 English, and train both standard and pause models for 200B total tokens. Because the total token budget is equalized, the pause-pretrained model actually sees fewer meaningful non-pause tokens.

## Pause Finetuning And Inference

For a downstream task, the data has a prefix and a target. The method appends `Mft` copies of `<pause>` to the prefix during finetuning, then computes loss only on the target answer after the pauses.

At inference time, it appends `Minf` pause tokens and ignores outputs until the last pause is processed.

The paper studies four variants:

- `StdPT StdFT`: standard pretraining and standard finetuning;
- `StdPT PauseFT`: standard pretraining but pause finetuning/inference;
- `PausePT StdFT`: pause pretraining but ordinary downstream finetuning/inference;
- `PausePT PauseFT`: pause pretraining plus pause finetuning/inference.

The most important result is that `PausePT PauseFT` works best. The model needs to encounter pause tokens early enough to learn how to use the extra computation.

## Experimental Setup

The main experiments use decoder-only models with 1B and 130M parameters. The main paper emphasizes the 1B model and uses the 130M model in the appendix.

The pretraining data is C4 English. Both standard and pause-pretrained models train for 200B total tokens.

The downstream tasks cover:

- reasoning: GSM8K;
- extractive QA: SQuAD and CoQA;
- general understanding: CommonSenseQA and PhysicalIQA;
- long-context recall: LAMBADA;
- natural language inference: HellaSwag;
- fact recall: WebQuestions and Natural Questions.

For downstream finetuning, the authors try 10 and 50 pause tokens and report the best in the consolidated result. They report mean and standard deviation over five finetuning runs.

## Main Results

For the 1B model, `PausePT PauseFT` beats the standard `StdPT StdFT` baseline on 8 of the 9 downstream tasks. The exception is HellaSwag.

The headline improvements include:

- SQuAD exact match: roughly 36.4 to 55.9, about an 18-point gain;
- CommonSenseQA exact match: roughly 26.9 to 34.8, about an 8-point gain;
- GSM8K accuracy: roughly 7.5 to 8.5.

The 130M model shows gains on 6 of 9 tasks, but the effects are weaker and the SQuAD gain does not reproduce as strongly. The authors speculate that smaller models may not have enough raw capacity to make as much use of the extra pathways.

## Why Both Pretraining And Finetuning Matter

`StdPT PauseFT` gives mixed results. Adding pause tokens only at downstream finetuning helps on some tasks but is lukewarm overall and can hurt GSM8K.

`PausePT StdFT` helps clearly on only a couple of tasks, such as CoQA and PhysicalIQA. This suggests that pause pretraining may improve some representations, but most of the main gains require the model to use delayed computation during downstream inference.

The paper's interpretation is that standard pretraining biases the model toward immediate computation. To benefit from inference-time delays, the model needs training exposure to those delays.

## Ablations

### Number Of Pause Tokens

Each downstream task has an optimal number of pause tokens. GSM8K works best with 10 pauses in the paper's setup, while SQuAD benefits more from a larger delay. Too many pauses can reduce performance, possibly because attention becomes cluttered or the task does not need more compute.

### Inference-Time Mismatch

The authors train with a fixed number of pause tokens and then vary the number at inference time. Performance degrades gracefully across moderate shifts, such as using half the training-time delay.

However, using zero pause tokens at inference can break a pause-finetuned model badly. This is a key limitation: pause-trained models are not automatically robust to no-delay deployment.

### Appending Versus Prepending

The default method appends pause tokens after the prompt. The authors also test prepending. Prepending can still beat the standard baseline in `PausePT PauseFT`, but appending is generally better.

This suggests that position matters. The model learns how to use delays based partly on where they appear.

### Filler Characters Are Not Enough

The paper also tests delaying a standard model with filler periods. This does not help, matching earlier observations that inference-only dummy thoughts are not enough. The token must be trained into the model's computation pattern.

## Mechanistic Interpretation

The authors describe pause tokens as increasing computational width. A standard Transformer with `K` prompt tokens computes `K` token-wise hidden vectors per layer before producing the next token. Adding `M` pause tokens gives the model `K + M` positions per layer to process before the answer.

This is not the same as adding depth. Chain-of-thought adds meaningful autoregressive tokens, and each token adds another serial stack of layers. Pause tokens add parallel input positions with minimal parameter overhead.

The paper's theory section argues that some tasks may require many independent computations. Standard inference can be bottlenecked by the number of input tokens, while pause inference can add extra positions that let attention implement more computations.

## Why The Paper Matters

This paper is a useful early example of test-time compute that is trained into the base model rather than prompted only at inference time.

It sits between several ideas:

- chain-of-thought, because both delay final answers;
- adaptive compute, because the model spends more computation before answering;
- memory/register tokens, because special tokens create extra hidden states;
- architecture/objective design, because the benefit depends on pretraining exposure.

For post-training and agent systems, the key lesson is that extra inference-time computation may need to be trained as a native capability. Simply adding empty steps at inference is not enough.

## Limitations And Caveats

The results are limited to 1B and 130M decoder-only models trained on C4. The paper does not show whether the method scales cleanly to larger models, instruction-tuned models, encoder-decoder models, or modern production pretraining mixtures.

Pause pretraining is expensive because it requires modifying pretraining itself. The most practical next step would be making pause tokens useful for standard pretrained models.

The number of pause tokens is task-sensitive. Some tasks may be better with zero pauses, and the model can fail badly if deployed with no pauses after being trained to expect them.

The mechanism remains partly speculative. The computational-width explanation is plausible and supported by theory, but the paper does not identify concrete circuits showing how pause positions are used.

Pause tokens are also not a replacement for chain-of-thought. CoT creates meaningful intermediate tokens and extra serial depth. Pause tokens create hidden extra compute without readable reasoning.

## Study Questions

1. Why do pause tokens need to be introduced during pretraining, not only inference?
2. What is the difference between pause inference and chain-of-thought?
3. Why might SQuAD benefit more from pause tokens than HellaSwag?
4. Why does zero-pause inference break pause-finetuned models?
5. What would it take to make pause tokens adaptive per input?
6. How could we test whether pause tokens are really increasing useful computational width?

