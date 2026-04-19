# Lecture_22_introcausal

Source: `materials/archive/Lecture_22_introcausal.pdf`
Duplicate equivalents: `Lecture_22_introcausal.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 23

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 22:
An introduction to causality
### Visual Description
Text-only slide.
---
## Page 2
### Content
Recap: First view of directed graphical models: causal relationships

Directed Graphs are useful for expressing directional/causal relationships between random variables.

Your symptoms: fever + loss of taste.

Probability that you have covid?

Diseases
Params W
Symptoms

Directed graphical model succinctly describes Pr[symptom| diseases]
### Visual Description
The slide features a large image of a COVID-19 virus particle on the right. On the left, there is a directed acyclic graph (DAG) illustrating relationships. The graph has three layers: "Params W" (two white circles), "Diseases" (two blue and two white circles), and "Symptoms" (two blue and two white circles). Arrows connect nodes from "Params W" to "Diseases" and from "Diseases" to "Symptoms", indicating causal flow.
---
## Page 3
### Content
Recap: First view of directed graphical models: causal relationships

Directed Graphs are useful for expressing directional/causal relationships between random variables.

* X = height of a child
* Y = vocabulary of a child
* Z = age of a child

Z
X
Y
### Visual Description
The slide displays a simple directed acyclic graph (DAG) with three nodes. Node Z is at the top, with arrows pointing downwards to node X on the left and node Y on the right. All nodes are represented as circles with their respective labels inside.
---
## Page 4
### Content
Recap: First view of directed graphical models: causal relationships

Directed Graphs are useful for expressing directional/causal relationships between random variables.

Is direction somehow "inherent" or "unique" ?

a
b
$p(a, b)$

a
b
$= p(a)p(b|a)$

a
b
$= p(b)p(a|b)$
### Visual Description
The slide shows three pairs of nodes, 'a' and 'b', arranged vertically. The top pair has no arrow between them. The middle pair has an arrow from 'a' to 'b'. The bottom pair has an arrow from 'b' to 'a'. Each pair is accompanied by a corresponding probability factorization.
---
## Page 5
### Content
Recap: First view of directed graphical models: causal relationships

Directed Graphs are useful for expressing directional/causal relationships between random variables.

Is direction somehow "inherent" or "unique" ?

Conditional independencies alone cannot determine the graph.

However, often we think of graphs as being "endowed" with some "natural" direction. (e.g. arrow of time)

We will endow Bayesian nets with causal meaning.
### Visual Description
Text-only slide.
---
## Page 6
### Content
Endowing directed graphs with causal meaning

We will make some changes to the "interpretation" of a directed graphical model to make it "causal".

$x_1$
$x_3$
$x_2$
$x_5$
$x_4$
$x_7$
$x_6$

Edges connotate causal direction: a node's parents are its direct causes.

Structural causal equations: we'll rewrite the conditional probability tables in terms of structural equations.

Modularity and interventions: we'll introduce language for "intervening" on nodes in the graph.
### Visual Description
The slide features a directed acyclic graph (DAG) with seven nodes labeled $x_1$ through $x_7$. The nodes are arranged in a somewhat irregular pattern, with arrows indicating causal relationships. For example, $x_1$ points to $x_4$, $x_2$ points to $x_4$ and $x_6$, $x_3$ points to $x_4$ and $x_5$, $x_4$ points to $x_6$ and $x_7$, and $x_5$ points to $x_7$. All nodes are represented as circles.
---
## Page 7
### Content
Structural equations

We'll use the language of structural equations to specify conditional probabilities.

A
B
C

Use an equation of the type
$C := f(A, B)$

What about non-deterministic relations between A,B and C?

| | $a^0b^0$ | $a^0b^1$ | $a^1b^0$ | $a^1b^1$ |
|---|---|---|---|---|
| $c^0$ | 0.45 | 1 | 0.9 | 0.7 |
| $c^1$ | 0.55 | 0 | 0.1 | 0.3 |
### Visual Description
The slide shows a directed acyclic graph (DAG) where nodes A and B point to node C. Below this, there is a table displaying conditional probabilities for C given different states of A and B. The table has headers for $a^0b^0$, $a^0b^1$, $a^1b^0$, $a^1b^1$ and rows for $c^0$, $c^1$, filled with numerical values.
---
## Page 8
### Content
Exogenous and endogenous variables

We can capture a probabilistic relation by introducing a "source of randomness".

A
B
U
C

$C := f(A, B,U)$

Any probability distribution can be modeled this way! (Similar to inverse CDF transform.)

The variables U are usually called "exogenous" variables: they are sources of "randomness”/model mismatch/lack of mechanistic knowledge ...
### Visual Description
The slide presents a directed acyclic graph (DAG) with four nodes. Nodes A, B, and U are at the top, all pointing to node C, which is below them. Node U is highlighted in red.
---
## Page 9
### Content
# Modularity and interventions

Causality is intricately tied to the notion of an **intervention**: interrupting the normal "flow of information" in the graph.

For example, when we give a person a drug, we are "intervening" on the normal mechanistic processes of biology.

Interventions should be "modular": they should only affect the variable we've intervened on and leave everything else static.

This is the language of “do” operators.
### Visual Description
Text-only slide.
---
## Page 10
### Content
# Modularity and interventions

$$
\begin{array}{l}
X := f_X(U_X) \\
Y := f_Y(X, U_Y) \\
Z := f_Z(Y, U_Z) \\
W := f_W(X, Z, U_W)
\end{array}
$$

$$
\begin{array}{l}
X := f_X(U_X) \\
Y := f_Y(X, U_Y) \quad Y:= y \\
Z := f_Z(Y, U_Z) \\
W := f_W(X, Z, U_W)
\end{array}
$$

$$do(Y = y)$$
### Visual Description
Two causal graphs (DAGs) are shown side-by-side, illustrating the effect of an intervention. On the left, the original graph has nodes $U_X, X, U_Y, Y, U_Z, Z, U_W, W$ with arrows indicating causal relationships (e.g., $U_X \to X$, $X \to Y$, $U_Y \to Y$, etc.). Next to this graph are the corresponding structural equations. An arrow points from the left graph to the right graph, with the text `do(Y = y)` below it. The right graph shows the result of the intervention: the arrow pointing into node Y (from X) is removed, and Y is explicitly set to 'y'. The structural equations next to the right graph reflect this change, showing $Y:=y$ and the original $f_Y(X, U_Y)$ crossed out.
---
## Page 11
### Content
# Modularity and interventions

This is fundamentally different than conditioning:

$P(X = x |Y = y) \neq P(X = x |do(Y = y))$

On the left, we are looking at the **subset of the population**, s.t. Y=y, and looking at the proportion in which X=x.

On the right, we are looking at the **entire population**, overriding the flow of information so that Y = y, and looking at the proportion in which X=x.

$P(\text{sunburn | eating ice cream}) \neq P(\text{sunburn | do(eating ice cream)})$

Can be viewed as a formalization of the famous adage "correlation $\neq$ causation".
### Visual Description
Text-only slide.
---
## Page 12
### Content
# Correlation $\neq$ causation

Ice Cream Sales vs. Shark Attacks
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
— Ice Cream Sales — Shark Attacks

Master's Degrees vs. Box Office Revenue
1910 1920 1930 1940 1950 1960 1970 1980 1990 2000 2010 2020
— Master's Degrees — Box Office Revenue

High School Graduates vs. Pizza Consumption
1965 1970 1975 1980 1985 1990 1995 2000 2005 2010 2015 2020
— High School Graduates — Pizza Consumption
### Visual Description
Three line graphs are displayed, each illustrating a spurious correlation. The top-left graph shows "Ice Cream Sales vs. Shark Attacks" over months (Jan-Dec), with two lines closely tracking each other. The top-right graph shows "Master's Degrees vs. Box Office Revenue" from 1910 to 2020, also with two lines showing a strong upward trend together. The bottom-center graph shows "High School Graduates vs. Pizza Consumption" from 1965 to 2020, again with two lines demonstrating a similar increasing pattern.
---
## Page 13
### Content
# Causal inference

Estimating the effect of a causal intervention is called causal inference.

In the prior notation, we want to estimate $P(X = x |do(Y = y))$

A lot of real-life goals can be described this way:
* Estimate the effect of giving a drug. (Y=administer drug)
* Estimate the effect of taxation policy. (Y=administer policy)
* Estimate the effect of income on happiness. (Y=income)
### Visual Description
Text-only slide.
---
## Page 14
### Content
# Causal inference

**3. COUNTERFACTUALS**
ACTIVITY: Imagining, Retrospection, Understanding
QUESTIONS: What if I had done...? Why?
(Was it X that caused Y? What if X had not occurred? What if I had acted differently?)
EXAMPLES: Was it the aspirin that stopped my headache? Would Kennedy be alive if Oswald had not killed him? What if I had not smoked for the last 2 years?

**2. INTERVENTION**
ACTIVITY: Doing, Intervening
QUESTIONS: What if I do...? How?
(What would Y be if I do X? How can I make Y happen?)
EXAMPLES: If I take aspirin, will my headache be cured? What if we ban cigarettes?

**1. ASSOCIATION**
ACTIVITY: Seeing, Observing
QUESTIONS: What if I see...?
(How are the variables related? How would seeing X change my belief in Y?)
EXAMPLES: What does a symptom tell me about a disease? What does a survey tell us about the election results?
### Visual Description
An illustration titled "The Ladder of Causation" by Judea Pearl. It depicts a ladder with three levels. At the bottom is "1. ASSOCIATION" (SEEING), represented by an owl and a robot. The middle level is "2. INTERVENTION" (DOING), represented by a person. The top level is "3. COUNTERFACTUALS" (IMAGINING), represented by a person thinking. Each level has a corresponding text box detailing its ACTIVITY, QUESTIONS, and EXAMPLES.
---
## Page 15
### Content
# Identification

A quantity is called "identifiable" if it can be recovered from observational data only.

Causal Estimand $\xrightarrow{\text{Identification}}$ Statistical Estimand $\xrightarrow{\text{Estimation}}$ Estimate
$P(Y = y|do(T = t))$ $P(Y = y|T = t, X = x, ...)$

This is desirable as we often can't "intervene" (e.g. ethical concerns in trials, expensive experiments to run, ...)

(We will get back to what is the "full" power of interventions.)

It's often the case that we can identify a quantity by "adjusting": that is, partitioning the estimate over "homogeneous" groups.
### Visual Description
A flow diagram illustrates the process from a Causal Estimand to an Estimate. It starts with "Causal Estimand" ($P(Y = y|do(T = t))$), which leads via "Identification" to "Statistical Estimand" ($P(Y = y|T = t, X = x, ...)$), and then via "Estimation" to "Estimate".
---
## Page 16
### Content
# Simpson's Paradox

The effect of two alternative treatments on removing kidney stones:
* **Condition (C)**: small stone (0) vs. large stone (1)
* **Two treatments (T)**:
    * Treatment A (0): open surgical procedures
    * Treatment B (1): closed surgical procedures.
* **Outcome Y**: failure (0) vs. success (1)
### Visual Description
Text-only slide.
---
## Page 17
### Content
Simpson's Paradox
Which treatment is more effective at removing kidney stones?

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | 83% (289/350) |

$P(Success |T = A) > P(Success|T = B)$
But we want $P(Success |do(T = A)) ...$
### Visual Description
A slide titled "Simpson's Paradox" presenting a question about kidney stone treatment effectiveness. Below the question is a table comparing Treatment A and Treatment B for small stones, large stones, and both combined, showing success rates and counts. The "Both" row of the table is highlighted with a red rectangle. Below the table are two lines of mathematical notation related to probabilities of success.
---
## Page 18
### Content
Simpson's Paradox
Which treatment is more effective at removing kidney stones?

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | 83% (289/350) |
### Visual Description
A slide titled "Simpson's Paradox" presenting a question about kidney stone treatment effectiveness. Below the question is a table comparing Treatment A and Treatment B for small stones, large stones, and both combined, showing success rates and counts. The "Small stones" row of the table is highlighted with a red rectangle.
---
## Page 19
### Content
Simpson's Paradox
Which treatment is more effective at removing kidney stones?

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | 83% (289/350) |
### Visual Description
A slide titled "Simpson's Paradox" presenting a question about kidney stone treatment effectiveness. Below the question is a table comparing Treatment A and Treatment B for small stones, large stones, and both combined, showing success rates and counts. The "Large stones" row of the table is highlighted with a red rectangle.
---
## Page 20
### Content
The graphical model view
Type of disease
X
T
Y
Treatment
Outcome

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | 83% (289/350) |

Wishful thinking: just "scale" by proportion in each row

$P(Y = y|do(T = t)) = \sum_x P(X = x)P(Y = y |X = x,T = t)$

???
### Visual Description
The slide is titled "The graphical model view". On the left, there is a Directed Acyclic Graph (DAG) with three nodes: X (Type of disease), T (Treatment), and Y (Outcome). T has an arrow pointing to Y, and X has arrows pointing to both T and Y. On the right, the same table from previous slides about kidney stone treatment effectiveness is displayed. Below the table, there's a text "Wishful thinking: just 'scale' by proportion in each row". At the bottom, a mathematical equation for $P(Y = y|do(T = t))$ is shown, followed by three question marks.
---
## Page 21
### Content
Truncated factorization
Given, a set of intervention nodes S, if $x$ is consistent with the intervention, then
* $P(x_1,...,x_n |do(S=s))= \prod_{i \notin S} P(x_i |pa_i)$
* Otherwise, $P(x_1,...,x_n |do(S=s))=0$.
### Visual Description
Text-only slide.
---
## Page 22
### Content
Adjustments: simple example
X
T
Y

$P(Y = y|T = t) = \sum_x P(X = x, Y = y |T = t)$
$= \sum_x P(X = x|T = t)P(Y = y |X = x,T = t)$

$P(Y = y|do(T = t)) = \sum_x P(Y = y,X = x|do(T = t))$
$= \sum_x P(X = x)P(Y = y |X = x,T = t)$

Only depends on observational quantities!
We are "stratifying" + scaling by the value of X. (Dr's decision in prior example)
### Visual Description
A slide titled "Adjustments: simple example". On the left, a Directed Acyclic Graph (DAG) is shown with three nodes: X, T, and Y. X has arrows pointing to T and Y, and T has an arrow pointing to Y. On the right, several lines of mathematical equations are presented, demonstrating the expansion of $P(Y=y|T=t)$ and $P(Y=y|do(T=t))$. The final equation for $P(Y=y|do(T=t))$ is highlighted with a blue rectangle. Below the equations, there are two lines of explanatory text.
---
## Page 23
### Content
Strategies for identifying causal effects
We will see several strategies for identifying causal effects
Backdoor criteria
Frontdoor criteria
} "sufficient" for identification

Do calculus $\longrightarrow$ "complete" for identification

Backdoor criteria largely deals with checking whether "non-causal paths" have been "blocked".

Frontdoor criteria largely deals with when we can ignore “unobserved confounders".

Do calculus is complete: for any effect that is *in principle* identifiable, the algorithm we will propose will be able to (eventually) identify it.
### Visual Description
Text-only slide.
