# Information Theory Intro Source Overview

Source: `https://en.wikipedia.org/wiki/Information_theory`
Primary source: `https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf`
Course reference: `https://ocw.mit.edu/courses/6-050j-information-and-entropy-spring-2008/`
Ingested: `2026-05-03`
Extraction engine: `direct web research + manual structured synthesis`
Strategy: `introductory topic lesson with primary-source anchoring`

## Provenance Note

The user provided Wikipedia as a sample source and invited expansion. This overview uses Wikipedia for orientation, Claude Shannon's 1948 paper "A Mathematical Theory of Communication" as the primary historical source, and MIT OpenCourseWare's "Information and Entropy" page as a course-style reference for the broader framing around communication, computation, and physical information.

## Core Definition

Information theory is the mathematical study of how to quantify, store, compress, transmit, and recover information when messages are uncertain and channels may be noisy.

Its central move is to treat information probabilistically. A message is informative when it resolves uncertainty. A highly predictable event tells you little; a surprising event tells you more.

## Main Ideas

### 1. Information Is About Uncertainty

If you already know what message will arrive, the message carries little new information. If many outcomes are possible and one is revealed, the message carries more information.

### 2. The Bit Is A Unit Of Distinction

A fair coin flip has two equally likely outcomes. Learning the result gives one bit of information, because it answers one yes/no distinction.

### 3. Surprisal Measures Single Outcomes

For an outcome with probability $p$, its information content is:

$$
I(x) = -\log_2 p(x)
$$

Rare outcomes have higher surprisal than common outcomes.

### 4. Entropy Measures Average Uncertainty

For a random variable $X$ with outcomes $x$ and probabilities $p(x)$:

$$
H(X) = -\sum_x p(x)\log_2 p(x)
$$

Entropy is the expected surprisal. It tells you the average number of bits needed, in the ideal limit, to describe outcomes from that source.

### 5. Compression Removes Predictability

If a source has patterns, a good code can exploit those patterns. Common symbols get shorter descriptions; rare symbols get longer descriptions. The entropy is the ideal lower bound on average lossless compression.

### 6. Channels Have Capacity

A communication channel may add noise. Shannon's theory asks: how fast can we transmit information while keeping the probability of error low? The answer is the channel capacity. Below capacity, reliable communication is theoretically possible with good codes. Above capacity, reliable communication is impossible.

### 7. Mutual Information Measures Shared Information

Mutual information measures how much knowing one variable reduces uncertainty about another. It is central in statistics, machine learning, neuroscience, representation learning, and communication.

### 8. Information Theory Separates Meaning From Transmission

Shannon's original theory is not mainly about semantic meaning. It is about message selection, uncertainty, coding, and reliable communication. A message can be mathematically informative without being meaningful in an ordinary human sense.

## What To Remember

- Information is reduction in uncertainty.
- Bits count distinctions.
- Entropy is average uncertainty.
- Compression uses predictability.
- Noise corrupts messages.
- Capacity is the limit of reliable communication.
- Mutual information measures dependence.
- Shannon's theory is foundational because it gives precise limits, not just engineering tricks.

## Quick Check

1. Why does a rare event carry more information than a common event?
2. Why does a biased coin have less entropy than a fair coin?
3. Why can predictable text be compressed?
4. What does channel capacity mean?
5. Why is Shannon information not the same as everyday meaning?
