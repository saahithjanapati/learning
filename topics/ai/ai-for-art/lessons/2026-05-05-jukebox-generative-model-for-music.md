# Jukebox: Raw-Audio Music Generation With VQ-VAE Codes And Transformers

Source note: Prafulla Dhariwal, Heewoo Jun, Christine Payne, Jong Wook Kim, Alec Radford, and Ilya Sutskever, "Jukebox: A Generative Model for Music." arXiv:2005.00341v1, submitted April 30, 2020. Source page: [arxiv.org/abs/2005.00341](https://arxiv.org/abs/2005.00341). Project page: [jukebox.openai.com](https://jukebox.openai.com). Processed source: [materials/processed/ai/jukebox-a-generative-model-for-music.md](../../../../materials/processed/ai/jukebox-a-generative-model-for-music.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem: Full Songs Are Huge Sequences](#the-problem-full-songs-are-huge-sequences)
- [The Jukebox Stack](#the-jukebox-stack)
- [Music VQ-VAE](#music-vq-vae)
- [Transformer Priors And Upsamplers](#transformer-priors-and-upsamplers)
- [Conditioning: Artist, Genre, Timing, And Lyrics](#conditioning-artist-genre-timing-and-lyrics)
- [Sampling Modes](#sampling-modes)
- [Results And Capabilities](#results-and-capabilities)
- [Limitations](#limitations)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

`Jukebox` is OpenAI's 2020 system for generating music directly as raw audio. That is the important phrase: raw audio.

Many older music-generation systems generated symbolic music: notes, MIDI events, piano rolls, or other compact representations. That is useful, but it leaves out the recorded sound itself: singer voice, timbre, instrument texture, mixing, articulation, noise, and performance feel.

Jukebox tries to generate the whole song-like audio object, including singing.

The hard part is sequence length. A few minutes of audio at 44.1 kHz contains millions of samples. If a model tries to generate waveform samples directly, it has to handle tiny local details and long musical structure at the same time.

Jukebox solves this with hierarchy.

### The Main Architecture

The model has two stages.

First, a music VQ-VAE compresses raw audio into discrete codes at three levels. The lower level keeps more local detail. The upper level is more compressed and is better suited for broad musical structure.

Second, autoregressive Transformers model those codes. Generation starts at the top level, then uses upsampler Transformers to fill in middle-level and bottom-level codes. Finally, the VQ-VAE decoder turns the generated codes back into audio.

A simple mental picture:

```text
raw audio
  -> VQ-VAE codes
  -> top-level music tokens
  -> middle/bottom detail tokens
  -> decoded waveform
```

The top prior is large, around 5B parameters. The upsamplers are also large, around 1B parameters each. For 2020, this is a serious scaling experiment in creative audio.

### Why VQ-VAE Codes Matter

The VQ-VAE turns music into a shorter token sequence.

That helps because Transformers are good at token sequences, but raw audio is too long. The top-level codes compress time by a factor of 128, so one token represents a larger chunk of audio than a raw waveform sample. That gives the model a chance to learn musical structure beyond local waveform texture.

The paper also explains practical fixes:

- random restarts keep the VQ-VAE codebook from collapsing;
- spectral loss helps preserve high-frequency audio information;
- separate autoencoders at each level work better than a single hierarchical autoencoder for making upper levels carry useful information.

### Control

Jukebox can be conditioned on artist, genre, timing, and lyrics.

Artist and genre embeddings steer musical and vocal style. Timing tells the model where it is in the song, which helps it imitate beginnings, middles, and endings.

Lyrics conditioning is especially interesting. The model receives lyrics text, but not exact timing or vocalization. It has to learn how words align with singing, how the artist's voice sounds, how melody stretches syllables, and how the instruments fit underneath. The paper treats this as harder than ordinary text-to-speech.

### What Works

Jukebox can generate diverse raw-audio songs with recognizable singing. It can complete existing audio prompts, branch multiple continuations from the same segment, sing novel lyrics, and imitate artist/genre styles.

The samples can stay locally coherent and musically plausible over multiple minutes. The model often produces natural prosody, with lyrics set to melody in ways that make musical sense.

### What Does Not Fully Work

The paper is candid about the limits.

Jukebox is stronger at mid-range structure than full song form. It often does not produce memorable repeated choruses, long-range melodic development, or classic question-and-answer phrase structure. Audio can be scratchy or noisy. Generation is also extremely slow: the paper reports about an hour to generate one minute of top-level tokens and about eight hours to upsample one minute.

### Medium Takeaway

Jukebox is best remembered as the bridge from symbolic music generation toward large-scale raw-audio music generation. Its recipe is: compress audio into discrete VQ-VAE codes, model the codes with large Transformers, generate coarse-to-fine, and add controls for artist, genre, timing, lyrics, and audio prompts.

## Full-Length Version

## The Problem: Full Songs Are Huge Sequences

A song is not just a list of notes.

Recorded music contains:

- melody;
- rhythm;
- harmony;
- singer identity;
- pronunciation;
- instrument timbre;
- mixing texture;
- performance dynamics;
- song sections;
- long-range repetition and variation.

Symbolic music systems can represent notes and timing, but they usually do not represent the recorded audio itself. They do not directly model what the singer's voice sounds like, how the guitar tone changes, how drums sit in the mix, or how performance details shape the emotion of a phrase.

Jukebox aims at the harder target: generate raw audio.

The problem is that raw audio is enormous. At 44.1 kHz, one second has 44,100 audio samples. A four-minute song has around 10 million sample positions. A model has to preserve tiny acoustic detail while also learning large-scale musical form.

That is why the paper uses hierarchy.

## The Jukebox Stack

Jukebox separates the problem into compression and generation.

The compression system is a VQ-VAE. It turns waveform audio into discrete code sequences.

The generation system is a cascade of autoregressive Transformers. It predicts those code sequences.

The full generation process is:

1. Sample compressed top-level music codes.
2. Use upsamplers to generate middle-level and bottom-level codes.
3. Decode the bottom-level codes into waveform audio.

This is coarse-to-fine generation. The model does not try to create every waveform sample from scratch in one flat pass. It first creates a compressed musical plan, then fills in detail.

## Music VQ-VAE

VQ-VAE means vector-quantized variational autoencoder.

Ignore the name for a moment. The useful idea is simple:

1. Encode audio into vectors.
2. Replace each vector with the nearest entry from a learned codebook.
3. Decode those codebook vectors back into audio.

The bottleneck is discrete. That means the audio becomes a sequence of token IDs. Once audio is tokenized, a Transformer can model it more like language.

Jukebox uses three VQ-VAE levels:

| Level | Hop length | Intuition |
| --- | ---: | --- |
| Bottom | 8 | detailed local audio |
| Middle | 32 | intermediate detail |
| Top | 128 | compressed long-range structure |

The top level has the most compression, so it loses detail but gives the prior a longer effective time horizon. The bottom level keeps more detail but is too long for broad composition by itself.

### Why Separate Autoencoders

The authors tried a more direct hierarchical VQ-VAE. The problem was that lower levels could learn to reconstruct audio so well that the top level did not need to carry much information.

That is bad for generation. If the top level does not contain meaningful musical structure, then the top-level prior cannot guide the song.

So the authors train separate autoencoders at each compression level. This makes the upper-level codes more useful.

### Why Spectral Loss

If the VQ-VAE is trained only with waveform reconstruction loss, it tends to preserve lower frequencies and lose high-frequency detail. The output sounds muddy.

Jukebox adds spectral loss. Instead of only comparing waveform samples, it compares frequency magnitudes from short-time Fourier transforms. This pushes the model to preserve more of the sound spectrum.

The tradeoff is that spectral loss can introduce scratchy artifacts. But without it, the compressed codes lose too much musical information.

### Why Random Restarts

VQ-VAE codebooks can collapse. That means many codebook entries are unused, so the model wastes capacity.

Jukebox resets rarely used codebook entries near random encoder outputs from the current batch. This keeps more codes alive and helps the codebook learn useful coverage.

## Transformer Priors And Upsamplers

After compression, Jukebox trains priors over the code sequences.

The probability factorization is:

```text
p(z_top, z_middle, z_bottom)
  = p(z_top) p(z_middle | z_top) p(z_bottom | z_middle, z_top)
```

In plain English:

- first generate the compressed top-level song codes;
- then generate middle detail given the top;
- then generate bottom detail given the top and middle.

Each part is an autoregressive Transformer over discrete tokens.

The top-level prior is the main creative generator. It sees the most compressed codes, so its context covers the longest span of music. The upsamplers are detail generators. They make the coarse sample sound more like full-resolution audio.

The final system is large:

- 5B parameter top-level prior;
- 1B parameter middle upsampler;
- 1B parameter bottom upsampler.

The model also uses sparse/factorized attention to scale to long token contexts.

## Conditioning: Artist, Genre, Timing, And Lyrics

The model is not only unconditional.

### Artist And Genre

Jukebox learns embeddings for artist and genre labels. At generation time, those labels steer the output.

Artist conditioning affects voice and style. Genre conditioning affects instrumentation, rhythm, energy, and musical setting.

The paper notes that artist embeddings can dominate. If the model strongly associates an artist with a particular style, changing the genre may only modestly change the result.

### Timing

The model receives timing information:

- total song duration;
- segment start time;
- fraction of song elapsed.

This is a clever lightweight way to give the model song-position awareness. It helps samples have intro-like beginnings, middle sections, and ending-like wrap-ups even when the Transformer context does not cover the entire song.

### Lyrics

Lyrics conditioning is one of the most important pieces.

The input lyrics are not aligned perfectly to the audio. The model has to learn alignment, pronunciation, melody, rhythm, voice, and accompaniment together.

That makes lyrics-to-singing harder than ordinary text-to-speech:

- words may stretch across many notes;
- syllables may be repeated or skipped;
- vocals are mixed with instruments;
- backing vocals may appear;
- lyrics sources may include shorthand like repeated choruses;
- genres such as rap can have dense fast lyrics.

The architecture uses a lyrics Transformer encoder. The top-level music-token decoder attends to lyrics features through encoder-decoder attention. The paper shows an attention map where music-token positions line up with lyrics characters being sung, suggesting the model learns a rough alignment.

## Sampling Modes

Jukebox can sample in several ways.

### From Scratch

The model samples a new song from conditioning metadata. It generates top-level codes, then middle and bottom codes, then decodes to audio.

### Windowed Continuation

The model context is finite, so long samples are generated through overlapping windows. The model keeps some previous codes as context, shifts forward, and continues sampling.

This is how Jukebox reaches multi-minute generations.

### Primed Sampling

The model can continue an existing audio prompt. It encodes the prompt into VQ-VAE codes and samples future codes from that starting point.

This is musically important. A musician can provide a rough riff or idea without converting it into MIDI. The model can continue from the actual sound, preserving timbre and performance details that symbolic transcription would lose.

## Results And Capabilities

The paper is mostly qualitative. The authors argue that ordinary single-number metrics are not very meaningful for music, because music preference is subjective and the goals are broad.

They evaluate through listening and sample categories.

### Coherence

The samples stay coherent through the top-level context window, about 24 seconds. With windowed generation, they can maintain related harmonies and textures across longer spans.

The timing signal helps the model imitate song sections. Samples can sound like they have beginnings, middle development, interludes, and endings.

But the model does not truly solve full song form. It usually does not produce repeated choruses or strong long-range melodic structure.

### Musicality

The model often sets lyrics naturally to melody. The paper notes that high or long notes may land on words that a human singer might emphasize. Hip-hop samples can capture spoken rhythm.

Still, generated melodies are usually less interesting than human-composed melodies.

### Diversity

Because sampling is autoregressive, the model can produce many different continuations. The paper explores re-renditions, completions, and branching continuation trees.

This is creatively interesting. The system is not only "press button, get song." It can become a branching idea generator.

### Novel Styles, Voices, Lyrics, And Riffs

The model can attempt unusual artist/genre pairings, interpolate voices, sing novel lyrics, and continue novel riffs.

The results are mixed but revealing. Artist identity can overpower genre control. Novel lyrics work better when they resemble the rhythm and structure expected for that artist or genre. Prompted riff continuation is especially promising because it lets musicians work from audio ideas directly.

## Limitations

Jukebox has several major limitations.

First, the large-scale structure is weak. It can produce coherent local and mid-range music, but not robust full-song architecture.

Second, audio quality is imperfect. Scratchiness and noise can appear because of compression and upsampling artifacts.

Third, generation is slow. The paper reports about an hour to generate one minute of top-level tokens and about eight hours to upsample one minute. That is not live interaction.

Fourth, the lyrics model is English-focused. More languages and styles would need broader data.

Fifth, controls are still coarse. Artist, genre, lyrics, MIDI, and priming help, but musicians may want section-level, instrument-level, dynamics-level, and arrangement-level control.

## Memory Checklist

- Jukebox generates raw audio music, including singing.
- It avoids symbolic music bottlenecks by modeling waveform audio, but compresses first so the sequence is tractable.
- The VQ-VAE turns audio into three levels of discrete codes.
- The priors generate codes top-down: top, middle, bottom.
- The top-level prior is the broad generator; upsamplers add detail.
- Artist and genre embeddings steer style.
- Timing metadata helps the model imitate beginnings, middles, and endings.
- Lyrics conditioning is harder than text-to-speech because alignment, melody, voice, and accompaniment are all entangled.
- The model can generate multiple-minute samples, but full song structure remains weak.
- The creative workflow lesson is branching: generate continuations, choose a direction, and continue.
