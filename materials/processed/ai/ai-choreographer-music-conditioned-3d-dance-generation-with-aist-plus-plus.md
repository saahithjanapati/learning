# AI Choreographer: Music Conditioned 3D Dance Generation With AIST++

Source: `https://arxiv.org/abs/2101.08779`
PDF: `https://arxiv.org/pdf/2101.08779`
HTML: `https://ar5iv.labs.arxiv.org/html/2101.08779`
Project page: `https://google.github.io/aichoreographer/`
Dataset page: `https://google.github.io/aistplusplus_dataset/`
DOI: `https://doi.org/10.48550/arXiv.2101.08779`
Title: `AI Choreographer: Music Conditioned 3D Dance Generation with AIST++`
Authors: `Ruilong Li, Shan Yang, David A. Ross, Angjoo Kanazawa`
Submitted: `2021-01-21`
Latest version: `2021-07-31` (`v3`)
Subjects: `Computer Vision and Pattern Recognition (cs.CV); Graphics (cs.GR); Multimedia (cs.MM)`
Ingested: `2026-05-05`
Extraction engine: `arXiv metadata + local PDF extraction with PyMuPDF + ar5iv/project-page checks + manual structured ingest`
Strategy: `canonical PDF extraction and medium/full paper lesson normalization`

## Medium-Length Version

This paper has two connected contributions.

First, it introduces `AIST++`, a public multimodal 3D dance dataset built from the AIST Dance Video Database. The original AIST data contains multi-view videos of dancers, but not calibrated cameras or 3D body motion. The authors reconstruct camera parameters and 3D human motion, then release a dataset with music, multi-view images, 2D/3D keypoints, SMPL pose parameters, global translation, and camera intrinsics/extrinsics. The dataset contains 5.2 hours of 3D dance motion, 1,408 motion sequences, 30 subjects, 10 dance genres, 60 pieces of music, and 9 camera views. It is designed to make music-conditioned 3D dance generation a benchmarkable problem instead of a collection of private-data demos.

Second, the paper introduces `FACT`, a Full-Attention Cross-modal Transformer for generating 3D dance motion conditioned on music and a short seed motion. Given a 2-second seed motion and a longer music sequence, the model autoregressively produces future 3D motion. Its output includes joint rotations and global translation, which makes the motion easier to retarget to animated characters than plain 2D keypoints.

The central modeling claim is that a naive causal transformer is not enough for long music-conditioned 3D dance. In long autoregressive motion generation, models often freeze into average poses or drift into unnatural motion. FACT tries to avoid that with three design choices:

- full attention rather than causal attention inside the motion/audio/cross-modal transformers;
- `future-N` supervision, where the model predicts multiple future frames rather than only the next frame;
- early cross-modal fusion, where audio and seed-motion embeddings are mixed through a deep cross-modal transformer rather than a shallow late-fusion module.

The experiments compare FACT against prior music-to-dance systems on motion quality, generation diversity, beat alignment, ablations, and user studies. On AIST++, FACT has much lower motion-distribution distance than the baselines and higher beat-alignment score. The ablations support the architectural story: causal next-frame supervision freezes, full-attention with only one future frame drifts, future-10/future-20 supervision works much better, and early audio-motion fusion makes the model attend more to the music.

The main limitation is that this is still kinematic generation. The model does not explicitly reason about floor contact or physical dynamics, so global translation can produce foot sliding or floating. It is also deterministic, so the paper leaves open the harder question of sampling many plausible dances for the same piece of music.

## Full-Length Version

## Core Research Question

The paper asks:

Can a model generate long, realistic 3D dance motion that is visibly coordinated with a piece of music?

That question is harder than it first sounds. Dance is not just a body moving through time. It is a cross-modal sequence problem:

- the input music has rhythm, tempo, beats, timbre, and genre;
- the output motion has body pose, joint rotation, velocity, acceleration, foot contact, style, and global position;
- the relationship between the two is not one-to-one.

The same music can support many plausible dances, and the same choreography can be adapted to different songs. A good model needs to learn correlation without collapsing to one average answer.

The authors frame the work around two missing pieces: a public 3D dance dataset with music, and an architecture that can produce long non-freezing 3D motion.

## Why 3D Dance Generation Is Difficult

Earlier audio-to-motion systems often worked in 2D pose space or used small/private 3D datasets. That limits both realism and downstream use. A 2D skeleton can look acceptable in a video plane, but it does not directly give a character rig the 3D rotations and translations needed for animation, retargeting, or physical reasoning.

3D motion generation has its own long-horizon problem. Autoregressive models can in principle generate indefinitely, but in practice they frequently:

- freeze into a mean pose after several seconds;
- drift into physically odd poses;
- lose the relation between music beats and body accents;
- ignore the conditioning signal when motion history alone is easier to predict.

Dance makes those failures obvious. If the body stops moving, the beat goes on. If the model ignores the song, the viewer notices. If global translation is wrong, the dancer slides or floats.

## AIST++ Dataset

`AIST++` is built from the AIST Dance Video Database. AIST originally provided multi-view dance videos, but the cameras were not calibrated and the data did not include 3D body motion. The authors reconstruct:

- camera intrinsic and extrinsic parameters;
- 17 COCO-format human joint locations in 2D and 3D;
- 24 SMPL pose parameters;
- global scaling and translation;
- synchronized multi-view image data.

The headline dataset statistics are:

| Property | AIST++ value |
| --- | ---: |
| 3D dance duration | 5.2 hours |
| Motion seconds | 18,694.6 |
| Motion sequences | 1,408 |
| Subjects | 30 |
| Dance genres | 10 |
| Music pieces | 60 |
| Camera views | 9 |
| Image frames | about 10.1M |

The 10 genres are ballet jazz, street jazz, krump, house, LA-style hip-hop, middle hip-hop, waack, lock, pop, and break. Each genre has 6 music pieces. Most motions are basic choreographies, with a smaller advanced choreography subset.

The dataset has a subtle challenge: basic choreographies may be performed across several pieces of music with different tempo. That means the model cannot solve the task by memorizing one choreography per song. It has to learn a music-motion relationship robust enough to generalize.

The authors split train and test so that neither music nor choreography overlaps across the split.

## Reconstruction Quality

Because there is no direct 3D ground truth for AIST, the authors validate reconstruction quality by checking whether reconstructed 3D keypoints, when projected back into the image, agree with high-confidence 2D detections.

The paper reports:

- MPJPE-2D of 6.2 pixels at 1920x1080 resolution;
- more than 86% of videos below 10 pixels average reprojection error;
- PCKh@0.5 around 98.5-98.7%, depending on the reported table/figure.

This does not prove perfect 3D reconstruction, but it gives evidence that the reconstructed skeletons and estimated cameras are consistent with the observed multi-view images.

## Task Formulation

The model receives:

- a 2-second seed motion sequence;
- a longer music feature sequence.

It must generate future motion for the rest of the clip.

The motion representation combines:

- 9-dimensional rotation-matrix representation for each of 24 joints;
- 3-dimensional global translation.

That gives a 219-dimensional motion feature per frame.

The music feature is 35-dimensional:

- 1 envelope feature;
- 20 MFCC features;
- 12 chroma features;
- 1 one-hot peak feature;
- 1 one-hot beat feature.

In the main setup, the seed motion is 120 frames, equal to 2 seconds at 60 FPS. The audio context is 240 frames, equal to 4 seconds. The model predicts `N = 20` future frames during training. At inference, it keeps the first predicted future motion, shifts the context, and repeats autoregressively.

## FACT Architecture

`FACT` stands for Full-Attention Cross-modal Transformer.

The architecture has three learned transformer components:

1. A motion transformer encodes the seed motion.
2. An audio transformer encodes the music features.
3. A cross-modal transformer fuses motion and audio embeddings and predicts future motion.

The model's important design choices are not just "use a transformer." They are specific choices about attention, supervision, and fusion.

## Design Choice 1: Full Attention

Language models usually use causal attention: a token can attend only to previous tokens. That makes sense for language generation with very long context windows.

For this motion task, the context window is much smaller. The authors use full attention, so tokens in the context can attend to the whole seed/audio window. This gives the model a richer view of temporal structure. Since the context is not huge, the extra cost is acceptable.

The key intuition is that motion generation benefits from seeing the whole short phrase, not just the prefix. Dance movement depends on the shape of a short temporal passage: preparation, accent, recovery, and transition.

## Design Choice 2: Future-N Supervision

Instead of training the model to predict only the next frame, FACT predicts several future frames. The main model uses 20.

This matters because next-frame prediction can reward locally safe behavior that becomes bad over many autoregressive steps. A model can minimize short-term error by predicting conservative average motion, then gradually freeze.

Future-N supervision pushes the model to care about short-term trajectory shape rather than only the immediate next pose. In the ablation, causal next-frame supervision freezes, and full-attention future-1 supervision drifts. Future-10 and future-20 supervision are much better.

## Design Choice 3: Early Cross-Modal Fusion

The model must not ignore the music.

If audio and motion are fused only at the end, the model can lean heavily on seed motion and underuse the conditioning song. FACT instead uses a deep cross-modal transformer: shallow modality-specific encoders followed by a 12-layer cross-modal fusion module.

The paper's attention visualization supports this design. The deep cross-modal transformer pays meaningful attention to both music and motion, while a shallow fusion module tends to focus more on motion.

## Evaluation Setup

The test set is built from 10 music pieces, one from each genre. For each piece, the authors select two dancers and two choreographies, giving 40 unique test choreographies. Training excludes the test music and test choreographies.

The main baselines are:

- Li et al. 2020, a transformer-based diverse dance motion method;
- DanceNet / Music2Dance;
- DanceRevolution, adapted from 2D dance generation to 3D joint positions.

The model is evaluated on:

- motion quality;
- generation diversity;
- motion-music correlation;
- ablations;
- user preference.

## Motion Quality And Diversity

The paper uses Frechet distance over motion features, not image features:

- `FIDg`: Frechet distance over geometric features;
- `FIDk`: Frechet distance over kinetic features.

Lower is better.

| Method | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| Li et al. | 86.43 | 20.58 | 0.232 |
| DanceNet | 69.18 | 17.76 | 0.232 |
| DanceRevolution | 73.42 | 31.01 | 0.220 |
| FACT | 35.35 | 12.40 | 0.241 |
| Real AIST++ upper reference | n/a | n/a | 0.292 |
| Random-paired AIST++ lower reference | n/a | n/a | 0.213 |

FACT has much better motion-quality metrics than the baselines and a stronger beat-alignment score. The real-data upper reference is still higher, which is important: the model improves the field, but it does not close the music-motion gap.

For diversity, FACT is more diverse than DanceNet and DanceRevolution. Li et al. has a higher kinetic diversity number, but the paper notes that this is inflated by discontinuous generated motion.

## Beat Alignment

The paper introduces `BeatAlign`, a metric for music-motion correlation.

Music beats are extracted from the audio. Kinematic beats are local minima in kinetic velocity, roughly moments where the body changes movement emphasis. BeatAlign rewards generated motion when each kinematic beat has a nearby music beat.

This is useful but incomplete. It captures beat synchrony, not style, expressiveness, phrasing, or whether the choreography is aesthetically good. The authors are careful about this: BeatAlign is one lens, not a complete dance-quality metric.

## Ablations

The attention/supervision ablation supports the paper's main architecture claim.

| Attention and supervision | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| Causal attention, shift-by-1 | 111.69 | 21.43 | 0.217 |
| Full attention, future-1 | 207.74 | 19.35 | 0.233 |
| Full attention, future-10 | 35.10 | 15.17 | 0.239 |
| Full attention, future-20 | 35.35 | 12.39 | 0.241 |

The important result is not that future-20 wins every column. It is that future-10/future-20 are in a different regime from causal next-frame and full-attention future-1. Long motion needs supervision that teaches short trajectory chunks, not only the next pose.

The fusion ablation also supports the cross-modal story.

| Fusion setup | FIDk | FIDg | BeatAlign |
| --- | ---: | ---: | ---: |
| No fusion | 45.66 | 13.27 | 0.228 |
| Late fusion | 45.76 | 14.30 | 0.234 |
| Early fusion | 35.35 | 12.39 | 0.241 |

Early fusion gives the best motion-quality and beat-alignment scores.

## User Study

The paper also asks humans which of two side-by-side stick-figure animations is dancing more to the music. Each participant watches 10 videos, with left/right order randomized.

FACT is preferred over the learned baselines:

- about 81% against Li et al.;
- about 71% against DanceNet;
- about 77% against DanceRevolution.

However, when compared against randomly paired real AIST++ dance motion, FACT wins only about 25%. The authors interpret this carefully: real advanced dance can be so expressive that people prefer it even when it is not paired to the music as well as the generated motion. The quantitative beat metric favors FACT over random pairing, but perception still rewards real human motion.

## What Is Convincing

The strongest part of the paper is the dataset-plus-ablation package.

The dataset contribution matters because music-conditioned 3D dance generation is hard to study without shared data. AIST++ gives researchers camera parameters, 3D keypoints, SMPL pose, global translation, music, and images in one benchmark.

The modeling contribution is also clearer than "we used a transformer." The paper identifies failure modes in naive autoregressive motion generation and tests specific fixes. Full attention, future-N supervision, and early cross-modal fusion each address a plausible failure:

- full attention helps the model see short temporal structure;
- future-N supervision fights freezing and drift;
- early fusion fights music ignoring.

The ablation results are aligned with those hypotheses.

## Limitations

The main limitation is physical realism. FACT is kinematic. It generates body motion but does not explicitly enforce contact, dynamics, balance, or floor interaction. The paper names foot sliding and floating as possible artifacts.

The second limitation is diversity. The model is deterministic. The seed motion lets the same music lead to different continuations if the seed differs, but the model is not a probabilistic generator that can sample many high-quality dances from the same seed and music.

The third limitation is evaluation. Beat alignment is useful, but dance quality is broader than beat matching. Human preference captures more, but user studies are small and can be biased toward expressive real motion.

The fourth limitation is reconstruction. AIST++ is carefully reconstructed and validated by reprojection, but it is still derived from video rather than captured with direct ground-truth 3D mocap.

## Why This Paper Matters

This paper is a good example of AI research where the dataset is as important as the model.

For generative AI, progress often depends on whether the field has a shared representation and a shared benchmark. AIST++ turns "generate dance to music" into a more concrete research problem:

- input: audio features plus seed 3D motion;
- output: joint rotations plus global translation;
- evaluation: motion quality, diversity, beat alignment, human preference;
- artifact: retargetable 3D motion.

The architecture lesson is broader than dance. For cross-modal sequence generation, late shallow fusion can be too weak, and one-step autoregressive loss can produce long-horizon failures. Sometimes the right move is to train the model to predict a short future trajectory and let modalities interact deeply before generation.

## Practical Takeaway

The durable memory is:

`AIST++` supplies the public 3D dance/music benchmark. `FACT` supplies the modeling recipe: full attention, future-N supervision, and early audio-motion fusion. Together they produce better long-range music-conditioned 3D dance than prior baselines, but still leave open physical grounding, stochastic diversity, and richer dance-quality evaluation.
