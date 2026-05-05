# Jukebox: A Generative Model For Music

Source: `https://arxiv.org/abs/2005.00341`
PDF: `https://arxiv.org/pdf/2005.00341`
HTML: `https://ar5iv.labs.arxiv.org/html/2005.00341`
Project page: `https://jukebox.openai.com`
Code: `https://github.com/openai/jukebox`
DOI: `https://doi.org/10.48550/arXiv.2005.00341`
Title: `Jukebox: A Generative Model for Music`
Authors: `Prafulla Dhariwal, Heewoo Jun, Christine Payne, Jong Wook Kim, Alec Radford, Ilya Sutskever`
Submitted: `2020-04-30`
Latest version: `2020-04-30` (`v1`)
Subjects: `Audio and Speech Processing (eess.AS); Machine Learning (cs.LG); Sound (cs.SD); Machine Learning (stat.ML)`
Ingested: `2026-05-05`
Extraction engine: `arXiv metadata + local PDF extraction with PyMuPDF + ar5iv/project-page checks + manual structured ingest`
Strategy: `canonical PDF extraction and AI-for-art paper lesson normalization`

## Medium-Length Version

`Jukebox` is OpenAI's 2020 raw-audio music generation system. Its goal is ambitious: generate full songs, including singing, not just symbolic notes, MIDI, piano rolls, or short instrumental clips.

The central technical problem is context length. A few minutes of CD-quality audio contains millions of waveform samples. Directly modeling every raw sample would make it extremely hard for a model to learn higher-level musical structure such as melody, rhythm, sections, timbre, and singing style. Jukebox handles this by splitting the problem into two stages.

First, it trains a multi-scale audio VQ-VAE. The VQ-VAE compresses raw waveform audio into discrete tokens at three time resolutions. The bottom level keeps relatively local detail, the middle level compresses more, and the top level is the most compressed and most semantically useful for long-range generation. The authors found that a straightforward hierarchical VQ-VAE had trouble making the upper levels carry useful information, so they train separate autoencoders at different hop lengths. They also add spectral loss to preserve higher-frequency audio information and use random restarts to prevent codebook collapse.

Second, it trains autoregressive Transformer priors over those tokens. The model samples top-level codes first, then samples middle-level and bottom-level codes with upsampler Transformers conditioned on the higher-level codes. Finally, the VQ-VAE decoder turns the bottom-level codes back into audio. This is a coarse-to-fine music generator: decide broad musical material first, then reconstruct detail.

Jukebox can be conditioned on artist, genre, and timing metadata. Timing tells the model where it is within the song, so it can learn beginnings, middles, and endings. A lyrics-conditioned version also uses a Transformer encoder over lyrics and encoder-decoder attention from the music-token decoder. The task is harder than text-to-speech because lyrics are unaligned, singing varies in melody and rhythm, and the target audio mixes voice with instruments.

The paper reports that Jukebox can generate diverse raw-audio songs with recognizable singing and coherence over multiple minutes. It can produce artist/genre-conditioned samples, complete existing audio prompts, branch many continuations from the same segment, sing novel lyrics, and continue rough musical ideas. But the authors are clear about the limits: samples are strongest at mid-range structure, not full song form. They often lack repeated choruses, memorable antecedent/consequent melodic patterns, and long-range composition. The audio can also have scratchiness or noise, and generation is very slow: about an hour for one minute of top-level tokens plus about eight hours to upsample one minute.

The big takeaway is that Jukebox treats music generation as hierarchical raw-audio modeling. It avoids symbolic music bottlenecks by generating the waveform domain, but it survives the huge sequence length by compressing audio into discrete codes and generating from coarse to fine.

## Full-Length Version

## Core Research Question

The paper asks:

Can a deep generative model produce full raw-audio songs, including singing, with enough coherence and controllability to be musically meaningful?

This is different from several easier music-generation settings.

Symbolic music systems generate notes, piano rolls, or MIDI events. That makes the sequence shorter and more structured, but it leaves out performance, voice, recording texture, instrument timbre, mixing, and many details that make a song sound like a song.

Text-to-speech systems generate voice from text, but ordinary speech does not need to model melody, harmony, rhythm, arrangement, instrumental accompaniment, or singer identity in the same way.

Short raw-audio systems can generate local sound texture, but a song needs structure across many seconds or minutes.

Jukebox tries to model the whole audio object.

## Why Raw Audio Music Is Hard

At 44.1 kHz, one second of audio has 44,100 samples. A four-minute song contains around 10 million sample positions. Each position carries detailed acoustic information.

That creates a brutal sequence-modeling problem:

- local waveform detail matters for timbre and audio quality;
- tens-of-milliseconds structure matters for phonemes, attacks, and percussion;
- seconds matter for rhythm, melody, and phrases;
- tens of seconds or minutes matter for verses, choruses, transitions, and overall form.

One model cannot cheaply attend over all raw samples while also learning high-level composition. The paper's answer is to compress raw audio into discrete tokens, then model those tokens with Transformers.

## The Two-Stage Architecture

Jukebox has two main parts.

1. A music VQ-VAE turns raw audio into discrete code sequences.
2. Autoregressive Transformers model those code sequences and sample new ones.

The VQ-VAE is the compression system. It makes audio shorter and more token-like.

The Transformer priors are the generative system. They learn what sequences of audio tokens are likely, and how those sequences depend on artist, genre, timing, and lyrics.

After sampling, the VQ-VAE decoder turns the generated discrete codes back into raw audio.

## Music VQ-VAE

A VQ-VAE is an autoencoder with a discrete bottleneck.

It has:

- an encoder that maps raw audio into continuous latent vectors;
- a codebook of learned embedding vectors;
- a quantization step that replaces each latent vector with the nearest codebook entry;
- a decoder that reconstructs audio from the chosen codebook vectors.

The result is a sequence of discrete codes. Instead of modeling millions of audio samples directly, the prior can model a shorter sequence of code indices.

Jukebox uses three levels with different hop lengths:

| Level | Hop length | Role |
| --- | ---: | --- |
| Bottom | 8 | highest temporal detail |
| Middle | 32 | intermediate compression |
| Top | 128 | most compressed, longest-range structure |

Each level uses a codebook of 2,048 codes.

The authors describe the system as hierarchical in spirit, but one important implementation detail is that they train separate autoencoders for the levels. A single hierarchical VQ-VAE tended to let the lower levels reconstruct too much while the top level carried little useful information. Separate autoencoders made the upper levels cleaner and more useful.

## VQ-VAE Fixes

The paper adds several practical fixes.

### Random Restarts

VQ-VAEs can suffer from codebook collapse. If only a small number of codebook entries are used, the bottleneck loses capacity.

Jukebox revives rarely used codebook vectors by resetting them near random encoder outputs from the current batch. This improves codebook usage early in training and helps avoid bad codebook states.

### Spectral Loss

A plain sample-level reconstruction loss tends to reconstruct low frequencies and lose higher-frequency detail. In audio, that makes outputs sound muddy.

Jukebox adds a spectral loss based on differences between short-time Fourier transform magnitudes. This encourages reconstructions to preserve spectral components, especially mid-to-high frequencies.

The tradeoff is that spectral loss can introduce scratchy distortion artifacts. Still, without it, the compressed audio loses too much high-frequency information.

### Separate Autoencoders

The authors tried a more direct hierarchical VQ-VAE but found it hard to push useful information into the middle and top levels. The lower levels could learn to reconstruct well enough that the upper levels were underused.

Training separate VQ-VAEs at different resolutions made the representations more reliable.

## Priors And Upsamplers

Once the VQ-VAE exists, Jukebox trains models over its discrete codes.

The factorization is:

```text
p(z_top, z_middle, z_bottom)
  = p(z_top) p(z_middle | z_top) p(z_bottom | z_middle, z_top)
```

This means generation happens top-down:

1. Sample top-level codes from a top-level prior.
2. Sample middle-level codes conditioned on top-level codes.
3. Sample bottom-level codes conditioned on middle and top codes.
4. Decode bottom-level codes into raw audio.

The top-level prior is the broad music generator. The middle and bottom priors are upsamplers that add detail.

The priors use sparse autoregressive Transformers. The final top-level prior has about 5 billion parameters. The upsamplers have about 1 billion parameters each.

## Conditioning

Jukebox becomes controllable by conditioning the priors.

### Artist And Genre

Artist and genre labels are learned as embeddings. Conditioning helps in two ways.

First, it lowers the entropy of the prediction problem. If the model knows the target style, it does not need to average over all possible genres and voices.

Second, it lets users steer generation. A user can ask for a particular artist/genre combination, including combinations that may not usually occur.

The paper notes that the artist embedding can be very strong. In some experiments, the artist voice dominates the genre change, so unusual genre swaps only modestly affect instrumentation or ambience.

### Timing

The model also receives timing information: total song duration, segment start time, and fraction of the song elapsed.

This lets the model learn that songs have different regions. Beginnings may include instrumental intros or applause. Endings may fade, resolve, or wrap up. A top-level prior with no whole-song context can still imitate broad beginning/middle/end behavior if it knows where it is in the song.

### Lyrics

The lyrics-conditioned model is especially important because singing is one of Jukebox's main claims.

The paper calls this the lyrics-to-singing task. It is harder than text-to-speech because:

- lyrics are not precisely aligned to the audio;
- singing stretches words across melody and rhythm;
- the model must learn the singer's voice;
- lead vocals, backing vocals, and instruments are mixed together;
- lyrics text often contains repeated-section shorthand or mismatches.

The authors begin with a simple linear alignment between lyrics characters and song duration. For harder cases such as fast hip-hop lyrics, they improve alignment by separating vocals with Spleeter and running an automatic lyrics alignment tool.

Architecturally, the lyrics-conditioned prior uses a Transformer encoder over lyrics. The music-token decoder uses encoder-decoder attention to attend to lyrics features. The paper shows an attention pattern where music-token positions attend to the lyrics characters being sung, suggesting that the model learns a rough lyrics-singing alignment.

## Sampling Modes

Jukebox supports several sampling modes.

### Ancestral Sampling

The model samples top-level tokens autoregressively, then samples middle and bottom levels conditioned on the upper levels. This is the normal from-scratch generation path.

### Windowed Sampling

The context window is finite. To generate longer audio, the model uses overlapping windows. It samples a continuation, shifts forward while retaining some previous codes as context, and continues.

This allows multi-minute samples even though each model sees only a limited token context.

### Primed Sampling

Jukebox can also continue an existing audio clip. It encodes the prompt audio into VQ-VAE codes and then samples future codes from that prefix.

This is useful for completing a riff, extending a sketch, or exploring continuations of an existing song segment.

## Dataset And Training Scale

The authors scraped a dataset of 1.2 million songs, about 600,000 of them in English, paired with lyrics and metadata from LyricWiki. Metadata includes artist, album, genre, release year, moods, and playlist keywords.

Training details are large for 2020:

| Component | Scale |
| --- | --- |
| Audio | 44.1 kHz raw audio |
| VQ-VAE | 3 levels, 2M parameters |
| VQ-VAE training | 256 V100s for 3 days |
| Upsamplers | 1B parameters |
| Upsampler training | 128 V100s for 2 weeks |
| Top-level prior | 5B parameters |
| Top-level prior training | 512 V100s for 4 weeks |
| Lyrics-conditioned training | 512 V100s for 2 weeks |

This scale matters. Jukebox is not just a clever compression idea; it is also an early example of scaling large autoregressive Transformers into a creative audio domain.

## Evaluation Style

The paper does not rely heavily on mean opinion score or FID-style metrics for final music quality. The authors argue that people experience music differently, making simple aggregate scores less meaningful.

Instead, they manually evaluate sample categories such as:

- coherence;
- musicality;
- diversity;
- novelty;
- re-renditions;
- completions;
- novel styles;
- novel voices;
- novel lyrics;
- novel riffs.

This is not as clean as a standardized benchmark. But for a frontier creative system in 2020, the authors are mostly trying to demonstrate qualitative capability and expose many non-cherry-picked samples.

## What The Samples Show

The paper reports that samples can stay musically coherent through the top-level context window, around 24 seconds, and can preserve similar harmonies and textures through longer windowed generation.

The timing signal helps the model imitate beginnings, middles, and endings. It can generate intros, chorus-like regions, instrumental interludes, fades, and wrap-ups.

The model can often set lyrics naturally. The authors note that high or long notes sometimes land on words a human singer might emphasize, and that hip-hop generations can capture the rhythm of spoken text.

But the samples are still weaker than human music. The paper says generated melodies are usually less interesting than human-composed melodies. It also rarely produces repeated choruses or clear question-and-answer melodic patterns.

## Novelty And Control

The most interesting creative part is controllable variation.

Jukebox can generate multiple re-renditions with the same artist and lyrics. These may share stylistic cues but differ in mood and melody.

It can complete a real audio prompt. Early continuation may stay close to the prompt, but after around 30 seconds the generation can diverge into new material.

It can branch a tree of continuations: start with one segment, sample multiple continuations, then branch again. This is an early version of a human-in-the-loop creative workflow where the model proposes paths and the human selects which branch to develop.

It can attempt novel style combinations, though the artist embedding often dominates. It can interpolate artist embeddings to create blended voices. It can sing novel lyrics, including poems or GPT-2-generated verses, especially when the text resembles the rhythm and structure of lyrics for that style.

It can continue a rough riff without needing the musician to transcribe it into MIDI. This is important because symbolic transcription can lose timbre, mood, and performance details.

## Limitations

The first limitation is long-range structure. Jukebox can sound coherent over multiple minutes, but it does not really understand full song form. It rarely produces memorable repeated choruses or large-scale melodic development.

The second limitation is audio quality. The model can produce natural-sounding voices and instruments, but scratchiness and noise remain, especially from compression and upsampling artifacts.

The third limitation is speed. The paper reports roughly an hour to generate one minute of top-level tokens, plus about eight hours to upsample one minute. That makes ordinary interactive use difficult.

The fourth limitation is language and dataset scope. The lyrics-conditioned model focuses on English-language songs, and the authors explicitly want future systems to cover more languages and styles.

The fifth limitation is control. Artist, genre, lyrics, MIDI, and priming are useful, but musicians may want richer controls: mood changes, dynamics, instrumentation, section-level arrangement, when drums enter, when vocals enter, and so on.

## Why This Paper Matters

Jukebox is a landmark paper because it makes raw-audio music generation feel like a scaling target.

Earlier systems often avoided the hardest parts of recorded music by generating symbolic notes or short clips. Jukebox instead tries to generate the whole waveform, including voice, instruments, texture, and performance. Its solution is to compress audio into discrete levels, model them with large Transformers, and generate coarse-to-fine.

It also points toward later AI music tools. Many later systems use codec-token language modeling, hierarchical generation, text/audio conditioning, and human-in-the-loop continuation workflows. Jukebox is not a polished live instrument, but it shows the shape of the problem.

## Practical Takeaway

Remember Jukebox as:

`raw audio -> VQ-VAE codes -> top-level Transformer -> upsampler Transformers -> decoded song`.

Its technical lesson is that music needs hierarchy because audio has structure at many time scales. Its creative lesson is that useful AI music systems need controllability and branching, not just one-shot generation.
