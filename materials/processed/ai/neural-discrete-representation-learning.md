# Neural Discrete Representation Learning

Source: `https://arxiv.org/abs/1711.00937`
PDF: `https://arxiv.org/pdf/1711.00937`
DOI: `https://doi.org/10.48550/arXiv.1711.00937`
Title: `Neural Discrete Representation Learning`
Authors: `Aaron van den Oord, Oriol Vinyals, Koray Kavukcuoglu`
Submitted: `2017-11-02`
Latest version: `2018-05-30` (`v2`)
Subjects: `Machine Learning (cs.LG)`
Ingested: `2026-05-05`
Extraction engine: `arXiv metadata + local PDF extraction with PyMuPDF + manual structured ingest`
Strategy: `canonical PDF extraction and AI-for-art foundation paper lesson normalization`

## Medium-Length Version

`Neural Discrete Representation Learning` introduces the Vector Quantised-Variational AutoEncoder, usually called `VQ-VAE`. The paper's basic move is to put a discrete codebook inside an autoencoder. Instead of encoding an image, waveform, or video frame into continuous latent variables, the encoder outputs vectors that are replaced by the nearest learned codebook entries. The decoder then reconstructs the input from those codebook vectors.

That sounds like a small architectural trick, but it became a major foundation for later generative media systems. Once a high-dimensional signal has been compressed into discrete token IDs, models can train priors over those IDs. In this paper, the authors use PixelCNN priors for image latents and WaveNet-style priors for raw audio latents. Later systems, including Jukebox, use the same general idea: learn a discrete representation of media first, then generate the representation with a sequence model.

The paper positions VQ-VAE against a problem in ordinary VAEs called posterior collapse. If a VAE uses a very powerful autoregressive decoder, the decoder may learn to model the data directly and ignore the latent variables. The latent code then stops carrying meaningful structure. VQ-VAE makes the posterior deterministic and discrete through nearest-neighbor vector quantization. The model still trains like an autoencoder, but the bottleneck is harder for the decoder to ignore.

The training objective has three pieces. The reconstruction term teaches the decoder to reconstruct the input from the selected codebook vectors. The codebook loss moves the selected embeddings toward the encoder outputs. The commitment loss keeps the encoder outputs close to the selected embeddings so the encoder does not drift through an unbounded continuous space. Because nearest-neighbor lookup is not differentiable, the paper uses a straight-through estimator: on the backward pass, gradients from the decoder input are copied to the encoder output.

The prior is handled separately. During VQ-VAE training, the prior over codes is uniform. After the autoencoder learns a useful discrete latent space, the authors train an autoregressive prior over the code sequence. This two-stage recipe separates representation learning from generative modeling.

The experiments cover CIFAR-10, ImageNet, DeepMind Lab frames, raw speech, speaker conversion, unsupervised phoneme discovery, and action-conditioned video. The key results are qualitative and structural: the codes preserve high-level content while discarding many low-level details. In speech, the latents preserve what is said while factoring out speaker identity enough to support speaker conversion. A simple latent-to-phoneme mapping reaches 49.3% accuracy on a 41-way phoneme task, compared with 7.2% for a random latent space baseline.

The paper's big takeaway is that discrete latent spaces can be learned directly from raw sensory data, can avoid posterior collapse with powerful decoders, and can become token spaces for later generative models.

## Full-Length Version

## Core Research Question

The paper asks:

Can a neural generative model learn useful discrete representations from raw data without supervision, then use those representations for high-quality generation?

That question matters because many important domains are naturally symbolic or token-like at some level:

- language is made of discrete symbols;
- speech contains phoneme-like structure;
- images can be summarized by objects and parts;
- video can be represented through persistent scene structure and action-dependent changes;
- complex planning often uses categorical state changes rather than smooth coordinates.

At the same time, the raw data in these domains is continuous and high-dimensional. Pixels and waveforms are not already presented as clean symbols. VQ-VAE tries to learn the symbols.

## Why Ordinary VAEs Can Waste Their Latents

A variational autoencoder has an encoder, a latent variable, a prior, and a decoder. In principle, the latent variable should carry the useful compressed information about the input.

But if the decoder is too powerful, a problem appears. Autoregressive decoders such as PixelCNN and WaveNet can model very rich local structure directly. The decoder may learn to predict pixels or audio samples from neighboring context while ignoring the latent variable. This is posterior collapse.

Posterior collapse is especially bad if the purpose of the model is representation learning. A model can achieve a decent likelihood while learning a useless latent space.

VQ-VAE is designed to make the latent representation actively used.

## The VQ-VAE Bottleneck

The model keeps an embedding table:

```text
e = {e_1, e_2, ..., e_K}
```

Each `e_k` is a learned vector. `K` is the number of possible discrete codes.

The forward pass is:

1. The encoder maps input `x` to a continuous vector or grid of vectors `z_e(x)`.
2. Each encoder output is replaced by the nearest codebook vector.
3. The decoder reconstructs `x` from the chosen codebook vectors.

The quantization step is:

```text
k = argmin_j ||z_e(x) - e_j||_2
z_q(x) = e_k
```

This makes the latent variable a codebook index. For images, the latent can be a two-dimensional grid of indices. For speech, it can be a one-dimensional sequence. For video, it can be a spatiotemporal latent field.

## The Training Objective

The VQ-VAE objective has three parts.

| Term | What It Trains | Intuition |
| --- | --- | --- |
| Reconstruction loss | encoder and decoder | Reconstruct the input from the quantized code. |
| Codebook loss | embedding vectors | Move selected codebook entries toward encoder outputs. |
| Commitment loss | encoder | Make the encoder commit to nearby codebook entries instead of drifting. |

The paper writes the objective as:

```text
L = log p(x | z_q(x))
    + ||sg[z_e(x)] - e||_2^2
    + beta ||z_e(x) - sg[e]||_2^2
```

`sg` means stop-gradient. It acts like the identity in the forward pass, but blocks gradients in the backward pass.

The authors use `beta = 0.25` in their experiments and report that the method is fairly robust over a range of values.

## Straight-Through Gradients

Nearest-neighbor codebook lookup is not differentiable. The model solves this with a straight-through gradient estimator.

During the forward pass, the decoder receives the quantized vector `z_q(x)`.

During the backward pass, the gradient from the decoder input is copied to the encoder output `z_e(x)`.

This is approximate, but practical. It lets the encoder learn to move its outputs into regions that will select better codebook vectors on future forward passes.

## Learned Priors Over Discrete Codes

During VQ-VAE training, the prior over code IDs is kept uniform. After the representation is learned, the authors train a separate autoregressive prior over the discrete codes.

This produces a two-stage generative recipe:

1. Learn a discrete latent representation.
2. Train a strong model over sequences or grids of latent IDs.
3. Sample latent IDs from the prior.
4. Decode the sampled IDs back into pixels, speech, or video.

For images, the paper uses PixelCNN over image latents. For raw audio, it uses WaveNet over audio latents.

This is the bridge to later creative-media systems. Once media becomes tokens, a powerful sequence model can generate the tokens.

## Experiments

## CIFAR-10 Comparison

The paper compares VQ-VAE with continuous VAEs and VIMCO-style discrete latent models on CIFAR-10.

The reported lower-bound likelihoods are:

| Model | CIFAR-10 Bits/Dim |
| --- | ---: |
| Continuous VAE | 4.51 |
| VQ-VAE | 4.67 |
| VIMCO | 5.14 |

Lower is better for bits per dimension. The point is not that VQ-VAE wins absolute likelihood, but that a discrete latent model comes close to continuous VAE performance while producing a symbolic bottleneck.

## Image Modeling

For ImageNet, the authors compress `128 x 128 x 3` images into a `32 x 32 x 1` discrete latent grid with `K = 512` possible codes.

The reconstructions are slightly blurrier than the original images, but preserve recognizable semantic content. A PixelCNN prior trained on the latent grid can then sample image latents, which the VQ-VAE decoder maps back into images.

This shows the codebook can represent visual structure compactly enough for a prior to model.

## DeepMind Lab Frames

The paper also applies the same idea to frames from DeepMind Lab. Frames are compressed into a smaller latent grid and decoded back into images.

A second-stage experiment trains another VQ-VAE with a PixelCNN decoder on top of the first latent space. This setup would usually invite posterior collapse because the decoder is powerful. The authors report that VQ-VAE still uses the latents meaningfully.

In the most compressed version, only three latent variables represent the whole image. The model keeps broad scene layout and nearby walls, but lets texture be generated procedurally by the decoder.

## Speech And Speaker Conversion

The audio experiments are especially important.

On VCTK speech, the encoder downsamples the waveform by a factor of 64 and uses a 512-way discrete codebook. The decoder is conditioned on speaker ID.

When the model reconstructs speech, the exact waveform and prosody change, but the content remains. This suggests the discrete latents are carrying high-level speech content rather than low-level waveform details.

For speaker conversion, the model encodes speech from one speaker and decodes it with another speaker ID. The resulting speech keeps the same content but changes voice identity. That means the latent representation has factored out much of the speaker-specific information.

## Unsupervised Phoneme Evidence

The authors compare learned discrete codes to ground-truth phoneme labels, even though phoneme labels were not used for training.

With a 128-dimensional discrete space running at 25 Hz, mapping each latent code to its most likely phoneme yields 49.3% accuracy on a 41-way phoneme classification task. A random latent space baseline gets 7.2%.

That does not mean the codebook perfectly discovers phonemes. It does mean the learned codes are strongly related to phoneme-level structure.

## Video

For video, the model generates future DeepMind Lab frames conditioned on action sequences. Generation happens in latent space first. The decoder maps generated latents back to pixel frames afterward.

The result demonstrates an important computational idea: a model can imagine future sequences in compressed latent space without rendering every pixel at every step.

## Why This Matters For AI For Art

This paper is not an art paper on the surface. Its main contribution is representation learning.

But it is central to AI for art because creative media often needs exactly this transformation:

```text
raw pixels / waveforms / frames
  -> compact discrete tokens
  -> generative prior over tokens
  -> decoded media
```

Jukebox uses VQ-VAE-style audio codes before modeling music with Transformers. Many later image, audio, and video systems similarly rely on learned tokenizers, codecs, or latent bottlenecks. The generative model becomes more manageable because it does not have to operate directly over every pixel or waveform sample.

## Strengths

- The model learns discrete codes directly from raw data.
- It avoids posterior collapse better than ordinary VAEs with powerful decoders.
- It supports separate training of representation and prior.
- It works across images, speech, and video.
- Speech codes show unsupervised alignment with phoneme-like structure.
- The learned code space is useful for generation and transformation, not just compression.

## Limitations

- Nearest-neighbor quantization requires approximate gradient handling.
- The learned prior is trained after the VQ-VAE, so representation learning and prior learning are not jointly optimized in the main experiments.
- Image reconstructions can be blurry when trained with pixel-level losses.
- Speech experiments show meaningful phoneme-like structure, but not full language understanding.
- The method does not by itself solve long-range artistic structure; it creates the token space that later models can use.

## Takeaway

VQ-VAE is a learned tokenizer for complex sensory data. It turns pixels, speech, and video into discrete code sequences or grids, then lets autoregressive models learn priors over those codes.

That is why this 2017 paper sits naturally beside later AI-for-art systems. It helps explain how raw creative media becomes something a generative model can plan over, sample from, and decode back into art-like artifacts.
