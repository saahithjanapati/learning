# AI Choreographer: AIST++ And Music-Conditioned 3D Dance Generation

Source note: Ruilong Li, Shan Yang, David A. Ross, and Angjoo Kanazawa, "AI Choreographer: Music Conditioned 3D Dance Generation with AIST++." arXiv:2101.08779v3, submitted January 21, 2021 and last revised July 31, 2021. Source page: [arxiv.org/abs/2101.08779](https://arxiv.org/abs/2101.08779). Project page: [google.github.io/aichoreographer](https://google.github.io/aichoreographer/). Processed source: [materials/processed/ai/ai-choreographer-music-conditioned-3d-dance-generation-with-aist-plus-plus.md](../../../materials/processed/ai/ai-choreographer-music-conditioned-3d-dance-generation-with-aist-plus-plus.md).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Problem: Dancing Is A Cross-Modal Sequence Task](#the-problem-dancing-is-a-cross-modal-sequence-task)
- [Why AIST++ Matters](#why-aist-matters)
- [What FACT Is Trying To Fix](#what-fact-is-trying-to-fix)
- [The Three Design Choices](#the-three-design-choices)
- [How The Experiments Work](#how-the-experiments-work)
- [Main Results](#main-results)
- [What The Ablations Teach](#what-the-ablations-teach)
- [Limitations](#limitations)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

### Medium Thesis

This paper is about making AI-generated dance more real in two ways: better data and better sequence modeling.

The authors introduce `AIST++`, a dataset of real dancers reconstructed into 3D motion and paired with music. That matters because most earlier dance-generation work had a data bottleneck. Either it worked in 2D pose, used small private 3D motion-capture sets, or lacked reliable global 3D translation. AIST++ gives the field a public benchmark with 5.2 hours of 3D dance motion, 1,408 sequences, 30 subjects, 10 dance genres, 60 music pieces, and 9 camera views.

They also introduce `FACT`, a Full-Attention Cross-modal Transformer. Its job is to take a short seed motion plus a longer music clip and autoregressively generate future 3D dance motion. The output includes joint rotations and global translation, so the generated dance can be retargeted to animated characters more naturally than a flat 2D skeleton.

### The Key Modeling Idea

The paper's useful lesson is that "just use a transformer" is not enough.

For long 3D motion generation, naive autoregressive models often fail in two embarrassing ways:

- they freeze into safe, average-looking poses;
- they drift into unnatural body motion.

Dance adds another failure mode: the model may keep moving but stop listening to the music.

FACT is built around three fixes.

First, it uses full attention rather than causal attention. Since the motion context window is short compared with language-model contexts, the model can afford to let tokens attend across the whole seed/audio window. That gives it a better view of the short temporal phrase.

Second, it uses `future-N` supervision. Instead of predicting only the next frame, the model predicts multiple future frames during training. This teaches short trajectory shape rather than one-frame local smoothness, which helps avoid freezing.

Third, it uses early cross-modal fusion. Audio and motion are mixed through a deep cross-modal transformer, not just stitched together near the output. This helps the model actually use the music rather than relying mostly on seed motion.

### Results In One Pass

FACT beats the compared baselines on AIST++ motion-quality metrics and beat-alignment score. It has much lower Frechet motion-feature distances than Li et al., DanceNet, and DanceRevolution, and it is preferred by users over those generated baselines in side-by-side comparisons.

The ablations are the most educational part. Causal attention with next-frame supervision tends to freeze. Full attention with only one future frame can drift. Full attention with future-10 or future-20 supervision works much better. Early fusion also improves both motion quality and music correlation.

The paper is honest about what remains unsolved. FACT is kinematic, not physics-aware, so it can produce foot sliding or floating. It is deterministic, so it does not directly solve the problem of sampling many different high-quality dances for one song. And even though it beats generated baselines, real human motion is still much more expressive.

### Medium Takeaway

Remember the paper as:

`AIST++` makes music-conditioned 3D dance generation measurable. `FACT` shows that long cross-modal motion generation needs full temporal context, future-trajectory supervision, and deep audio-motion fusion. The result is much better generated dance, but not yet physically grounded or as expressive as real dancers.

## Full-Length Version

## The Problem: Dancing Is A Cross-Modal Sequence Task

A dance model has to translate one time series into another.

The input is music. Music contains rhythm, tempo, beat locations, intensity, timbre, genre, and longer phrase structure. The output is body motion. Body motion contains joint rotations, velocity, acceleration, pose transitions, global position, style, and physical constraints.

The hard part is that the mapping is not one-to-one. A song does not determine a single correct dance. A dancer can hit the same beat with the arms, hips, shoulders, feet, or a full-body move. Different genres also encourage different motion vocabularies.

So the model must learn a soft relationship:

- stay musically aligned;
- remain physically plausible;
- preserve dance style;
- keep moving over long time horizons;
- avoid collapsing into average poses;
- allow variation.

That is why this paper is not just a fun graphics demo. It is a serious cross-modal generative modeling problem.

## Why AIST++ Matters

The first contribution is the dataset.

Before AIST++, the field had a practical problem: there were not many public datasets with music paired to reliable 3D dance motion. Some datasets had 3D motion but no music. Some had dance and music but were tiny. Some systems learned from private data, making comparison hard.

AIST++ is built from the AIST Dance Video Database. AIST had multi-view dance videos, but not calibrated cameras or reconstructed 3D motion. The authors recover the missing geometric information and produce a richer benchmark.

AIST++ includes:

- 5.2 hours of 3D dance motion;
- 1,408 motion sequences;
- 30 subjects;
- 10 dance genres;
- 60 music pieces;
- 9 camera views;
- around 10.1 million corresponding image frames;
- 2D and 3D keypoints;
- SMPL pose parameters;
- global scaling and translation;
- camera intrinsic and extrinsic parameters.

That combination is unusually useful. The music lets researchers study audio-to-motion generation. The multi-view image data supports pose and reconstruction work. The SMPL pose and global translation make the motion useful for animation and character retargeting.

The 10 dance genres are ballet jazz, street jazz, krump, house, LA-style hip-hop, middle hip-hop, waack, lock, pop, and break. This is broad enough that the task cannot be reduced to one narrow dance style.

The train/test split is also careful: test music and test choreographies are excluded from training. That matters because otherwise the model could memorize choreography-music pairs.

## What FACT Is Trying To Fix

The second contribution is the model: `FACT`, short for Full-Attention Cross-modal Transformer.

The model receives:

- 2 seconds of seed motion;
- 4 seconds of aligned music features.

It predicts future 3D motion. During inference, it repeatedly predicts a small future chunk, keeps the first predicted frame, shifts the context, and continues. This makes it autoregressive.

The seed motion is important. If the same music can support many dances, then giving the model a seed motion lets the output vary with the dancer's initial style and body state. Without a seed, deterministic models are more likely to average over many possible dances.

The output representation is also important:

- 24 joints as rotation matrices;
- global translation;
- 219 total motion dimensions per frame.

That gives the model a true 3D motion representation, not just 2D joint coordinates.

## The Three Design Choices

FACT is an audio transformer plus a motion transformer plus a cross-modal transformer. But the main idea is in the training design.

### 1. Full Attention

Causal attention is natural for language generation because each token should only see the past. But in this paper's setting, the model is not trying to generate text one word at a time from a huge context. It is trying to understand a short seed-motion/audio window.

The authors use full attention so tokens can see the entire conditioning window. This helps the model understand the temporal phrase: where the motion came from, where the music is going, and how the short context fits together.

Since the context window is much smaller than language-model contexts, full attention is computationally acceptable.

### 2. Future-N Supervision

Next-frame prediction can be a trap.

If the loss only asks for the immediate next pose, the model can become locally smooth but globally bad. It may learn to predict conservative average motion. Over many autoregressive steps, that can freeze.

FACT predicts multiple future frames during training. The main model predicts 20 future frames. This encourages it to learn a mini-trajectory, not just the next pose.

A good mental model:

- next-frame loss asks, "What pose is safest one instant from now?"
- future-N loss asks, "What short movement is happening next?"

Dance needs the second question.

### 3. Early Cross-Modal Fusion

The model has two streams: audio and motion. If they are fused too late or too shallowly, the model may mostly follow motion history and underuse the music.

FACT uses a deep cross-modal transformer after shallow modality-specific encoders. This lets audio and motion interact for many layers before output.

That design matches the task. Dance is not "pose prediction with a music hint." It is a coupled audio-motion process. The model has to learn how beats, tempo, and music features correspond to body accents and transitions.

## How The Experiments Work

The main test set uses 10 pieces of music, one from each genre. For each music piece, the authors choose two dancers and two choreographies, giving 40 unique test choreographies.

They compare FACT with three baselines:

- Li et al., a transformer-based dance generation method;
- DanceNet / Music2Dance;
- DanceRevolution, a 2D dance generation method adapted to output 3D joint locations.

The evaluations cover three main quantities.

First, motion quality. The paper uses Frechet distances over geometric and kinetic motion features:

- `FIDg` measures geometric feature distribution distance;
- `FIDk` measures kinetic feature distribution distance.

Lower is better.

Second, generation diversity. The model should not produce the same kind of movement for every song.

Third, motion-music correlation. The paper introduces `BeatAlign`, which checks whether body-motion beats line up with music beats. Higher is better.

## Main Results

On the main quantitative table, FACT is substantially better on motion quality.

| Method | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| Li et al. | 86.43 | 20.58 | 0.232 |
| DanceNet | 69.18 | 17.76 | 0.232 |
| DanceRevolution | 73.42 | 31.01 | 0.220 |
| FACT | 35.35 | 12.40 | 0.241 |

The lower FID numbers mean FACT's generated motions are closer to real AIST++ motions in the chosen motion-feature distributions. The higher BeatAlign score means its generated body accents line up better with music beats than the baselines.

The upper reference is real paired AIST++ motion, with BeatAlign 0.292. FACT reaches 0.241. So it improves over generated baselines, but there is still a visible gap to real dance.

The user study also favors FACT over the generated baselines:

- about 81% preference against Li et al.;
- about 71% preference against DanceNet;
- about 77% preference against DanceRevolution.

But when FACT is compared to randomly paired real AIST++ dance motion, users prefer the real motion most of the time. That is a nice reality check. Even if real motion is not perfectly paired to the music, it can look more expressive and natural than generated motion.

## What The Ablations Teach

The ablations are the cleanest part of the paper.

### Attention And Supervision

| Model variant | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| Causal attention, shift-by-1 | 111.69 | 21.43 | 0.217 |
| Full attention, future-1 | 207.74 | 19.35 | 0.233 |
| Full attention, future-10 | 35.10 | 15.17 | 0.239 |
| Full attention, future-20 | 35.35 | 12.39 | 0.241 |

The lesson is not "full attention magically wins." Full attention with future-1 performs badly on kinetic FID because the long rollout drifts. The winning recipe is full attention plus multi-frame future supervision.

That is an important general lesson for sequence modeling. Long-horizon generation failures often come from a mismatch between local training and long rollout behavior.

### Cross-Modal Fusion

| Fusion variant | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| No fusion | 45.66 | 13.27 | 0.228 |
| Late fusion | 45.76 | 14.30 | 0.234 |
| Early fusion | 35.35 | 12.39 | 0.241 |

Early fusion is best. This supports the idea that the model needs deep interaction between music and motion, not a last-minute conditioning signal.

The attention visualization also fits the story: the deeper cross-modal transformer pays more balanced attention to motion and music, while shallower fusion leans more heavily on motion.

## Limitations

The biggest limitation is physics.

FACT generates kinematic motion. It does not explicitly model floor contact, dynamics, balance, or physical interaction. Because of that, global translation can create foot sliding or floating artifacts.

The second limitation is stochastic diversity. The same song can support many valid dances, but FACT is deterministic given its inputs. Seed motion helps, but a richer generative model would sample multiple plausible dances for the same music and seed.

The third limitation is evaluation. BeatAlign is useful, but dance quality is not only beat matching. A dancer can be on beat and still boring, or off a strict beat in a way that feels intentional. Human studies help, but they are small and perception is biased toward real expressive movement.

The fourth limitation is dataset reconstruction. AIST++ is carefully validated through reprojection, but it is still reconstructed from video rather than captured with a dedicated 3D mocap setup.

## Memory Checklist

- `AIST++` is the dataset contribution: public music-paired 3D dance motion reconstructed from multi-view AIST videos.
- `FACT` is the model contribution: a Full-Attention Cross-modal Transformer for music-conditioned 3D dance generation.
- The model uses a 2-second seed motion and aligned music features to autoregressively generate future 3D motion.
- The three key design choices are full attention, future-N supervision, and early audio-motion fusion.
- Future-N supervision matters because next-frame prediction can freeze during long rollouts.
- Early fusion matters because shallow late fusion can make the model ignore music.
- FACT beats generated baselines on motion-quality metrics, BeatAlign, and user preference.
- Real human motion still looks more expressive than generated motion, even when randomly paired with music.
- The main open problems are physical grounding, stochastic diversity, and richer dance-quality evaluation.
