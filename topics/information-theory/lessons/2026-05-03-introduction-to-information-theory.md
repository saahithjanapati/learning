# Introduction To Information Theory

Source note: Introductory lesson based on the Wikipedia overview of [Information theory](https://en.wikipedia.org/wiki/Information_theory), Claude Shannon's 1948 paper ["A Mathematical Theory of Communication"](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf), and MIT OpenCourseWare's [Information and Entropy](https://ocw.mit.edu/courses/6-050j-information-and-entropy-spring-2008/) course page. Processed source overview: [materials/processed/information-theory/information-theory-intro-source-overview.md](../../../materials/processed/information-theory/information-theory-intro-source-overview.md).

## Table of Contents

1. [Start Here](#start-here)
2. [The Big Idea](#the-big-idea)
3. [Why Information Theory Exists](#why-information-theory-exists)
4. [Information Means Reduction In Uncertainty](#information-means-reduction-in-uncertainty)
5. [Bits: The Unit Of Distinction](#bits-the-unit-of-distinction)
6. [Surprisal: How Informative Was This Outcome?](#surprisal-how-informative-was-this-outcome)
7. [Entropy: Average Uncertainty](#entropy-average-uncertainty)
8. [Compression: Removing Predictability](#compression-removing-predictability)
9. [Noise And Error Correction](#noise-and-error-correction)
10. [Channel Capacity](#channel-capacity)
11. [Mutual Information](#mutual-information)
12. [What Information Theory Is Not](#what-information-theory-is-not)
13. [Where It Shows Up](#where-it-shows-up)
14. [A Small Worked Example](#a-small-worked-example)
15. [Memory Checklist](#memory-checklist)
16. [Quick Check](#quick-check)
17. [One-Minute Summary](#one-minute-summary)

## Start Here

Information theory is the mathematics of messages under uncertainty.

That sounds abstract, so start with a simple situation.

Someone is about to send you one of two messages:

- `yes`
- `no`

If both are equally likely, receiving the message resolves one binary uncertainty. That is one bit of information.

Now imagine they are about to send you one of eight equally likely messages. You need more yes/no questions to identify the message. In fact, three perfectly chosen binary questions can distinguish eight possibilities, because:

$$
2^3 = 8
$$

So learning one outcome among eight equally likely possibilities gives three bits of information.

That is the basic flavor of information theory:

**information measures how much uncertainty is resolved when a message arrives.**

## The Big Idea

Information theory asks:

**What are the fundamental limits of representing and communicating messages?**

It studies questions like:

- How many bits are needed to describe a source without losing information?
- How much can a file be compressed?
- How fast can messages be sent through a noisy channel?
- How much redundancy is needed to correct errors?
- How much does one signal tell us about another?
- What is the difference between random-looking data and compressible data?

The field was formalized by Claude Shannon in the 1940s. Shannon's achievement was not merely inventing a few formulas. He showed that communication has precise mathematical limits. There is a best possible compression rate for a source. There is a best possible reliable transmission rate for a channel. Real codes can try to approach those limits.

## Why Information Theory Exists

Before information theory, engineers already cared about telephones, telegraphs, radio, and electrical signals. The practical problem was obvious:

**How do we send messages accurately and efficiently through imperfect physical systems?**

A wire has limited bandwidth. A radio channel has noise. A storage device can corrupt bits. A language has redundancy. A signal may be compressed. A receiver must reconstruct what was sent.

Shannon abstracted all of this into a model:

```text
source -> encoder -> channel with noise -> decoder -> destination
```

The source produces messages. The encoder turns messages into signals or codewords. The channel may corrupt the signal. The decoder tries to reconstruct the original message. The destination receives the result.

This model is simple enough to analyze, but powerful enough to cover many real systems.

## Information Means Reduction In Uncertainty

In everyday speech, "information" often means meaning, truth, knowledge, or news. In Shannon's theory, information has a narrower technical meaning.

Information is tied to uncertainty.

If I say, "The sun rose this morning," the sentence may be meaningful, but it carries little Shannon information in ordinary circumstances because you already expected it.

If I say, "A meteor landed in the parking lot," that carries more information because it was much less expected.

The core rule is:

**The less probable an outcome was, the more information you gain when you learn it happened.**

This does not mean rare claims are true. It only means that, if a rare event really occurs, learning it resolves more uncertainty.

## Bits: The Unit Of Distinction

A bit is the amount of information needed to distinguish between two equally likely possibilities.

Examples:

- fair coin: heads vs tails = 1 bit,
- four equally likely outcomes = 2 bits,
- eight equally likely outcomes = 3 bits,
- sixteen equally likely outcomes = 4 bits.

The pattern is:

$$
\text{bits} = \log_2(\text{number of equally likely possibilities})
$$

Why logarithms? Because bits count yes/no distinctions. Each bit doubles the number of possibilities you can distinguish.

```text
1 bit  -> 2 possibilities
2 bits -> 4 possibilities
3 bits -> 8 possibilities
4 bits -> 16 possibilities
```

This is why information theory uses logarithms everywhere.

## Surprisal: How Informative Was This Outcome?

When outcomes are not equally likely, we need a formula for the information content of a single outcome.

For an outcome $x$ with probability $p(x)$:

$$
I(x) = -\log_2 p(x)
$$

This is called **surprisal** or self-information.

Check the formula against intuition:

If $p(x)=1/2$, then:

$$
I(x) = -\log_2(1/2) = 1
$$

A fair coin outcome gives one bit.

If $p(x)=1/8$, then:

$$
I(x) = -\log_2(1/8) = 3
$$

A one-in-eight outcome gives three bits.

If $p(x)=1$, then:

$$
I(x) = -\log_2(1) = 0
$$

A guaranteed outcome gives zero bits. It tells you nothing new.

## Entropy: Average Uncertainty

Surprisal measures one outcome. Entropy measures the average uncertainty of an entire source.

For a discrete random variable $X$:

$$
H(X) = -\sum_x p(x)\log_2 p(x)
$$

This is the expected surprisal. In plain English:

**entropy is the average number of bits needed to describe outcomes from a source, in the ideal limit.**

### Fair Coin

A fair coin has:

$$
p(H)=1/2, \quad p(T)=1/2
$$

Each outcome has surprisal 1 bit, so the entropy is:

$$
H(X)=1
$$

### Biased Coin

Suppose a coin lands heads 90% of the time and tails 10% of the time:

$$
p(H)=0.9, \quad p(T)=0.1
$$

Heads is unsurprising. Tails is more surprising. The entropy is:

$$
H(X) = -0.9\log_2(0.9) - 0.1\log_2(0.1)
$$

This is about 0.47 bits.

That is less than one bit because the coin is predictable. You can often guess heads and be right.

### What Entropy Is Really Saying

Entropy is not "disorder" in a vague sense. For this intro, think:

**entropy is average uncertainty.**

High entropy means many outcomes remain plausible. Low entropy means the source is predictable.

## Compression: Removing Predictability

Compression is one of the easiest places to feel information theory.

Imagine a file that says:

```text
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

You do not need to store every `A` separately. You can store:

```text
32 copies of A
```

That works because the message is predictable.

Now imagine a random-looking string:

```text
Q7MZ1KPA90RBTX2L
```

There may be no shorter description than the string itself.

The lesson is:

**compression exploits patterns.**

Information theory tells us the best possible average compression rate for a source. If English text has lots of redundancy, it can be compressed. If a source is already near maximum entropy, it cannot be compressed much without losing information.

This is the intuition behind ZIP files, image compression, audio codecs, language modeling, and many ideas in machine learning.

## Noise And Error Correction

Communication gets harder when the channel is noisy.

Suppose you send:

```text
1011001
```

but noise flips one bit and the receiver gets:

```text
1010001
```

Without extra structure, the receiver may not know which bit changed.

One naive fix is repetition:

```text
send 1 as 111
send 0 as 000
```

If the receiver gets `110`, they can guess the intended bit was `1`. This uses redundancy to fight noise.

Repetition is inefficient, but it shows the principle:

**error correction adds carefully designed redundancy so the receiver can detect or fix corruption.**

Modern error-correcting codes are much more sophisticated. They are why deep-space probes, phones, hard drives, QR codes, CDs, and internet systems can work despite noise and imperfect hardware.

## Channel Capacity

Shannon's most famous communication result concerns channel capacity.

A channel is a system that carries messages from sender to receiver. It might be:

- a wire,
- a radio link,
- a fiber optic cable,
- a disk drive,
- a DNA copying process,
- a neural pathway,
- a noisy measurement system.

Every channel has limits. It may have bandwidth limits, power limits, and noise.

**Channel capacity** is the maximum rate at which information can be transmitted with arbitrarily low error, assuming the best possible coding scheme and long enough messages.

The surprising part of Shannon's result is the sharp threshold:

- below capacity, reliable communication is possible in principle,
- above capacity, reliable communication is impossible in principle.

This does not mean practical codes are easy to find. Shannon proved what was possible before engineers knew how to achieve it efficiently. Later coding theory spent decades building explicit codes that approach these limits.

## Mutual Information

Entropy asks: how uncertain is one variable?

Mutual information asks:

**how much does knowing one variable reduce uncertainty about another?**

If $X$ and $Y$ are independent, knowing $X$ tells you nothing about $Y$, so their mutual information is zero.

If $Y$ is completely determined by $X$, then knowing $X$ tells you everything about $Y$.

One useful formula is:

$$
I(X;Y)=H(X)-H(X|Y)
$$

Read it as:

> information shared by $X$ and $Y$ = uncertainty in $X$ before seeing $Y$ minus uncertainty left in $X$ after seeing $Y$.

Mutual information appears everywhere:

- measuring dependence between variables,
- feature selection in machine learning,
- representation learning,
- neuroscience,
- communication systems,
- statistics,
- causality-adjacent analysis,
- clustering and embeddings.

It is a general way to ask whether one signal tells us about another without assuming the relationship is linear.

## What Information Theory Is Not

Information theory is powerful partly because it is narrow.

It does not automatically measure human meaning.

For example, a random string can have high Shannon information because it is hard to predict. But it may be meaningless to a human. A familiar sentence may have low Shannon information in context but high emotional meaning.

So be careful:

- Shannon information is about uncertainty and probability.
- Semantic meaning is about interpretation, reference, truth, use, and context.

They can interact, but they are not the same thing.

This distinction matters when people apply information theory to language, biology, art, cognition, or AI. The math is real, but the interpretation must be disciplined.

## Where It Shows Up

Information theory started in communication engineering, but the ideas spread widely.

### Data Compression

ZIP files, PNG compression, video codecs, and language models all exploit predictability.

### Error Correction

Wireless communication, storage systems, QR codes, satellite links, and deep-space communication all need redundancy that can survive noise.

### Cryptography

Unpredictability, entropy, and information leakage matter for secure systems.

### Statistics And Machine Learning

Entropy, cross-entropy, KL divergence, and mutual information are central in probabilistic modeling and learning.

### Physics

Information connects to thermodynamics, entropy, measurement, and computation.

### Biology And Neuroscience

Cells, genomes, neural systems, and sensory pathways can be studied as systems that encode, transmit, transform, and preserve information.

### AI

Modern AI uses information-theoretic ideas in loss functions, compression views of learning, representation analysis, uncertainty, coding, and generative modeling.

## A Small Worked Example

Suppose a weather app predicts three possible conditions:

| Weather | Probability |
| --- | ---: |
| Sunny | 0.5 |
| Cloudy | 0.25 |
| Rainy | 0.25 |

The surprisal of each outcome is:

$$
I(\text{sunny})=-\log_2(0.5)=1
$$

$$
I(\text{cloudy})=-\log_2(0.25)=2
$$

$$
I(\text{rainy})=-\log_2(0.25)=2
$$

The entropy is the average:

$$
H = 0.5(1) + 0.25(2) + 0.25(2)
$$

$$
H = 1.5 \text{ bits}
$$

Interpretation:

This weather source has 1.5 bits of uncertainty on average. It is less uncertain than four equally likely outcomes, which would require 2 bits, but more uncertain than a fair coin, which requires 1 bit.

## Memory Checklist

If you remember only the core map:

- Information resolves uncertainty.
- A bit distinguishes two equally likely possibilities.
- Surprisal is $-\log_2 p(x)$.
- Entropy is average surprisal.
- Predictability enables compression.
- Redundancy enables error correction.
- Channel capacity is the reliable communication limit.
- Mutual information measures how much one variable tells you about another.
- Shannon information is not the same as human meaning.

## Quick Check

1. Why does a fair coin flip give one bit?
2. Why does a guaranteed outcome give zero bits?
3. Why does a biased coin have lower entropy than a fair coin?
4. Why can repeated patterns be compressed?
5. Why does error correction require redundancy?
6. What does channel capacity mean?
7. What does mutual information measure?
8. Why is a random string not automatically meaningful even if it has high Shannon information?

## One-Minute Summary

Information theory is the mathematics of uncertainty, compression, and communication. It begins from the idea that a message carries information when it rules out possibilities. A bit distinguishes between two equally likely possibilities. Surprisal measures how informative one outcome is, while entropy measures the average uncertainty of a source. Predictable sources can be compressed; noisy channels require error-correcting redundancy; every channel has a capacity that limits reliable transmission. Mutual information measures how much one signal tells us about another. The field began with Shannon's work on communication, but its ideas now appear across computing, statistics, physics, biology, neuroscience, cryptography, and AI.
