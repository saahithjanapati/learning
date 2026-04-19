# Lecture_23_backdoor

Source: `materials/archive/Lecture_23_backdoor.pdf`
Duplicate equivalents: `Lecture_23_backdoor.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 26

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 23:
Backdoor and frontdoor criteria.
Do-calculus.
### Visual Description
A title slide with the course number "10708", course name "Probabilistic Graphical Models: Spring 2026", instructor name "Andrej Risteski", department "Machine Learning Department", and lecture topic "Lecture 23: Backdoor and frontdoor criteria. Do-calculus." All text is centered.
---
## Page 2
### Content
Identification
A quantity is called "identifiable" if it can be recovered from observational data only.

Causal Estimand $\xrightarrow{\text{Identification}}$ Statistical Estimand $\xrightarrow{\text{Estimation}}$ Estimate

This is desirable as we often can't "intervene" (e.g. ethical concerns in trials, expensive experiments to run, ...)

(We will get back to what is the "full" power of interventions.)

It's often the case that we can identify a quantity by "adjusting": that is, partitioning the estimate over "homogeneous" groups.
### Visual Description
Text-only slide.
---
## Page 3
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
A list of three strategies: "Backdoor criteria", "Frontdoor criteria", and "Do calculus". A curly brace groups "Backdoor criteria" and "Frontdoor criteria" and points to "sufficient for identification". An arrow points from "Do calculus" to "complete for identification". Below these, there are three paragraphs explaining each strategy.
---
## Page 4
### Content
Simpson's Paradox
Which treatment is more effective at removing kidney stones?

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | **83% (289/350)** |
### Visual Description
A question "Which treatment is more effective at removing kidney stones?" followed by a table. The table compares Treatment A and Treatment B for "Small stones", "Large stones", and "Both" categories, showing success rates and counts (e.g., 93% (81/87)). The "Both" category for Treatment B (83%) is highlighted in bold.
---
## Page 5
### Content
The graphical model view

Type of disease
X

Treatment
T
Y
Outcome

| Treatment Stone size | Treatment A | Treatment B |
| :------------------- | :---------- | :---------- |
| **Small stones**     | Group 1     | Group 2     |
|                      | 93% (81/87) | 87% (234/270) |
| **Large stones**     | Group 3     | Group 4     |
|                      | 73% (192/263) | 69% (55/80) |
| **Both**             | 78% (273/350) | **83% (289/350)** |

Wishful thinking: just "scale" by proportion in each row
### Visual Description
On the left, a directed acyclic graph (DAG) with three nodes: X (labeled "Type of disease"), T (labeled "Treatment"), and Y (labeled "Outcome"). Arrows point from X to T, X to Y, and T to Y. On the right, the same table from page 4 is displayed, comparing Treatment A and Treatment B outcomes. Below the table, there's a note: "Wishful thinking: just 'scale' by proportion in each row".
---
## Page 6
### Content
Truncated factorization
Given, a set of intervention nodes S, if $x$ is consistent with the intervention, then
* $P(x_1,...,x_n |do(S=s))= \prod_{i \notin S} P(x_i |pa_i)$.
* Otherwise, $P(x_1,...,x_n |do(S=s))=0$.
### Visual Description
Text-only slide with two bullet points containing mathematical formulas.
---
## Page 7
### Content
Adjustments: simple example
X
T
Y

$P(Y = y|T = t) = \sum_x P(X = x, Y = y |T = t)$
$= \sum_x P(X = x|T = t)P(Y = y |X = x,T = t)$

$P(Y = y|do(T = t)) = \sum_x P(Y = y,X = x|do(T = t))$
$= \sum_x P (X = x)P(Y = y |X = x,T = t)$

Only depends on observational quantities!
We are "stratifying" + scaling by the value of X. (Dr's decision in prior example)
### Visual Description
On the left, a directed acyclic graph (DAG) with three nodes: T, X, and Y. Arrows point from T to X, and from X to Y. On the right, several lines of mathematical equations are shown. The first two lines calculate $P(Y=y|T=t)$. The next two lines calculate $P(Y=y|do(T=t))$, with the final equation boxed. Below the equations, there are two lines of explanatory text.
---
## Page 8
### Content
General principle:
backdoor paths
We will find a criterion which suffices for a set of variables to "block" all non-causal paths.

$P(y | T=t)$
X1
X2
X3
C
T
M
Y
X5
X6

Intervening on T to
isolate the causal
effect of T on Y

$P(y | do(T=t))$
X1
X2
X3
C
T
M
Y
X5
X6

Backdoor path: an (undirected) path between T, Y with an incoming arrow into T.
### Visual Description
The slide presents the concept of backdoor paths using two directed acyclic graphs (DAGs) side-by-side. The left DAG represents $P(y|T=t)$ and the right DAG represents $P(y|do(T=t))$. Both graphs show nodes X1, X2, X3, C, T, M, Y, X5, X6, with various directed edges. A red arrow highlights the causal path T->M->Y in both graphs. An arrow labeled "Intervening on T to isolate the causal effect of T on Y" points from the left graph to the right graph. At the bottom, a definition box explains "Backdoor path: an (undirected) path between T, Y with an incoming arrow into T."
---
## Page 9
### Content
Recall: D-separation
If variables X and Z are d-separated given a set of variables E
Then X and Z are conditionally independent given the set E

**Definition:** Variables X and Z are d-separated given a set of evidence vars E iff every (undirected) path from X to Z is blocked.
A path is blocked whenever:
1. $\exists$ Y on path s.t. Y $\in$ E and Y is a "common parent"
X ... $\rightarrow$ Y $\leftarrow$ ... Z

2. $\exists$ Y on path s.t. Y $\notin$ E and Y is in a "cascade"
X ... $\rightarrow$ Y $\rightarrow$ ... Z

3. $\exists$ Y on path s.t. {Y, descendants(Y)} $\notin$ E and Y is in a "v-structure"
X ... $\rightarrow$ Y $\leftarrow$ ... Z
### Visual Description
The slide title is "Recall: D-separation". Below the title, there's a highlighted box with text explaining the relationship between d-separation and conditional independence. The rest of the slide defines d-separation and lists three conditions for a path to be blocked. Each condition is accompanied by a simple directed acyclic graph (DAG) snippet:
1. A path X -> ... -> Y <- ... <- Z, where Y is a common parent. Y is highlighted in green.
2. A path X -> ... -> Y -> ... -> Z, where Y is in a cascade. Y is highlighted in green.
3. A path X -> ... -> Y <- ... <- Z, where Y is in a v-structure. Y is highlighted in green.
The page number "10" is in the bottom right corner.
---
## Page 10
### Content
Backdoor adjustment
A set of variables W satisfies the backdoor criterion relative to T and Y if the following are true:
1. W blocks all backdoor paths from T to Y.
2. W does not contain any descendants of T.

**Theorem:** If W satisfies the backdoor criterion with respect to T and Y, then
$P(y | do(t)) = \sum_w P(y | t, w) P(w)$.

**Read:** if W satisfies the backdoor criterion, we can estimate the causal effect of T by adjusting/stratifying based on W.
### Visual Description
The slide title is "Backdoor adjustment". The main content defines the backdoor criterion with two conditions and presents a theorem with a formula for $P(y | do(t))$. A "Read" section provides an interpretation of the theorem. On the right side, there is a directed acyclic graph (DAG) with nodes: X1, X2, X3, C, T, M, Y, X5, X6. Arrows indicate relationships such as X1 -> C, X1 -> X3, X2 -> C, C -> T, C -> Y, T -> M, M -> Y, T -> X5, Y -> X6. A blue circle encompasses nodes X1, X2, X3, and C. A blue arrow points from T to M.
---
## Page 11
### Content
Backdoor adjustment
Why does this work?
We will create a new graph G' with an added vertex Ft, s.t.:
$F_t \in support(T) \cup \{idle\}$
$P'(T = t|pa(T)) = 1(t = F_t)$, if $F_t \in support(T)$
$P'(T = t|pa(T)) = P(T = t|pa(T))$, if $F_t = idle$

In this notation:
$P(Y = y|do(T = t)) = P'(Y = y|F_t = t) =$
$= \sum_W P'(Y = y|W = w, F_t)P'(W = w| F_t = t)$
### Visual Description
The slide title is "Backdoor adjustment". The text explains the setup for proving the backdoor adjustment formula, introducing a new graph G' with an added vertex Ft and defining conditional probabilities related to it. It then presents an equation for $P(Y = y|do(T = t))$ in terms of $P'$. On the right side, there is a directed acyclic graph (DAG) similar to the previous slide, but with an additional node Ft. Ft has an arrow pointing to T. The other nodes are X1, X2, X3, C, T, M, Y, X5, X6. A blue arrow points from T to M.
---
## Page 12
### Content
Backdoor adjustment
In this notation:
$P(Y = y|do(T = t)) = P'(Y = y|F_t = t)$
$= \sum_W P'(Y = y|W = w, F_t = t)P'(W = w| F_t = t)$

**Claim 1:** $P'(W = w|F_t = t) = P'(W = w) = P(W = w)$
(Follows from fact that W doesn't contain descendants of T)
### Visual Description
The slide title is "Backdoor adjustment". The content continues the derivation from the previous slide, reiterating the summation formula and then presenting "Claim 1" with its justification. On the right side, the same causal graph as page 11 is displayed, featuring nodes X1, X2, X3, C, Ft, T, M, Y, X5, X6. A blue arrow points from T to M. Handwritten red text on the left side provides an explanation for Claim 1: "(Follows from fact that W doesn't contain descendants of T)". Below this, there's a small handwritten diagram of two nodes connected by an arrow, then another node connected by an arrow to the second.
---
## Page 13
### Content
Backdoor adjustment
In this notation:
$P(Y = y|do(T = t)) = P'(Y = y|F_t) = \sum_W P'(Y = y|W = w, F_t)P'(W = w| F_t)$

**Claim 2:** $P'(Y|W,T, F_t) = P'(Y|W,T) = P(Y|W,T)$
$Y \perp \!\!\! \perp F_t | W, T$
### Visual Description
The slide title is "Backdoor adjustment". The content continues the derivation, showing the summation formula again and then presenting "Claim 2" with its justification. On the right side, the same causal graph as page 11 is displayed, featuring nodes X1, X2, X3, C, Ft, T, M, Y, X5, X6. A blue arrow points from T to M. Handwritten red text on the left side states the conditional independence: "$Y \perp \!\!\! \perp F_t | W, T$".
---
## Page 14
### Content
Backdoor adjustment
A set of variables W satisfies the backdoor criterion relative to T and Y if the following are true:
1. W blocks all backdoor paths from T to Y.
2. W does not contain any descendants of T.

**Theorem:** If W satisfies the backdoor criterion with respect to T and Y, then
$P(y | do(t)) = \sum_w P(y | t, w) P(w)$.

**Corollary:** If there are no backdoor paths between T and Y, then
$P(y | do(t)) =P(y | t)$.
### Visual Description
The slide title is "Backdoor adjustment". The content reiterates the definition of the backdoor criterion and the theorem for backdoor adjustment. Below this, a "Corollary" is presented, stating that if there are no backdoor paths, the do-operator can be replaced by conditioning. On the right side, the same causal graph as page 10 is displayed, with nodes X1, X2, X3, C, T, M, Y, X5, X6. A blue circle encompasses nodes X1, X2, X3, and C. A blue arrow points from T to M.
---
## Page 15
### Content
Backdoor criterion revisited
Backdoor criterion is equivalent to T being d-separated from Y given W in G(T).
$Y \perp \!\!\! \perp_{G_T} T | W$

Remember:
1. W blocks all backdoor paths from T to Y.
2. W does not contain any descendants of T.
### Visual Description
The slide title is "Backdoor criterion revisited". The content states the equivalence of the backdoor criterion to d-separation in a modified graph G(T) and provides the conditional independence statement. It then reiterates the two conditions for the backdoor criterion. On the right side, a causal graph is shown, similar to previous ones, with nodes X1, X2, X3, C, T, M, Y, X5, X6. Nodes X1 and C are shaded gray. A red arrow with a pair of scissors icon on it points from T to M, indicating a cut. A dashed blue line also connects T to M.
---
## Page 16
### Content
Front-door Adjustment
**Problem:** unobserved confounders

**Strategy:**
1. Identify the causal effect of T on M.
2. Identify the causal effect of M on Y.
3. Combine the above steps to identify the causal effect of T on Y.

Works in cases where we have a full understanding of the "submechanisms" by which some causal mechanism functions. (e.g. smoking causes tar, which causes cancer)
### Visual Description
The slide title is "Front-door Adjustment". The content describes the problem of unobserved confounders and outlines a three-step strategy for front-door adjustment. It also explains when this method is applicable, providing an example. On the right side, two causal graphs are displayed side-by-side:
1. **Left Graph:** Shows nodes T, M, Y, and W. Arrows indicate T -> M, M -> Y. W has arrows pointing to M and Y, and a dashed arrow from T to W. Labels indicate "confounding association" (dashed red arrows from W to M and W to Y, and from T to W) and "causal association" (blue dashed arrows from T to M and M to Y).
2. **Right Graph:** Shows nodes T, M, Y, and W. Arrows indicate T -> M, M -> Y. W has arrows pointing to M and Y. A blue dashed arrow from T to M and M to Y is labeled "only causal association". The node M is highlighted with a "focus" label.
---
## Page 17
### Content
Front-door Criterion
A set of variables $M$ satisfies the front-door criterion relative to $T$ and $Y$ if:
1. $M$ completely mediates the effect of $T$ on $Y$.
(M intercepts all directed paths between $T$ and $Y$).
2. There is no unblocked backdoor path from $T$ to $M$.
3. All backdoor paths from $M$ to $Y$ are blocked by $T$.
### Visual Description
A causal diagram showing four nodes: W (dashed circle), T, M, and Y. Arrows go from W to T and M. An arrow goes from T to M. An arrow goes from M to Y. An arrow goes from W to Y.
---
## Page 18
### Content
Front-door criterion
Example: consider $M = \{X_6\}$
A set of variables $M$ satisfies the front-door criterion relative to $T$ and $Y$ if:
1. $M$ completely mediates the effect of $T$ on $Y$.
(M intercepts all directed paths between $T$ and $Y$).
2. There is no unblocked backdoor path from $T$ to $M$.
3. All backdoor paths from $M$ to $Y$ are blocked by $T$.
### Visual Description
A complex causal diagram. Nodes X1, X2, X3, X4, X5 (dashed circle), X6, T, Y are arranged. Arrows: X1->X2, X1->X5; X4->X3, X4->X5; X2->T, X2->X6; X3->Y, X3->X6; X5->T, X5->Y, X5->X6; T->X6 (red arrow); X6->Y.
---
## Page 19
### Content
Front-door Adjustment
Theorem: If $(T, M, Y)$ satisfy the front-door criterion, then
$P(y | do(t)) = \sum_m P(m|t) \sum_{t'} P(y | m, t') P(t')$
Proof:
Intuition:
Causal effect of T on M
Causal effect of M on Y (via backdoor adjustment)
$P(y | do(t)) = \sum_m P(y,m|do(t)) = \sum_m P(m|do(t))P(y|m, do(t))$
Claim 1: $P(m|do(t)) = P(m|t)$
Claim 2: $P(Y|m, do(t)) = P(Y|do(m))$
$= \sum_{t'} P(y | m, t') P(t')$
### Visual Description
A small causal diagram in the top right corner showing nodes W (dashed circle), T, M, Y. Arrows go from W to T and M. An arrow goes from T to M. An arrow goes from M to Y. An arrow goes from W to Y.
---
## Page 20
### Content
Do-calculus
Given disjoint sets of variables $Y, T, Z,$ and $W$ in graph $G$:
* Rule 1: Decide if an observation can be ignored:
$P(y | do(t), z, w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\bar{T})$
* Rule 2: Decide if an intervention can be treated as an observation or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), z, w)$ if $Y \perp Z | T, W$ in $G(\bar{T},\underline{Z})$
* Rule 3: Decide if we can ignore an intervention or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\bar{T}, \underline{Z(W)})$
where $Z(W)$ denotes the set of nodes of $Z$ that aren't ancestors of any node of $W$ in $G(\bar{T})$
### Visual Description
Text-only slide, with two hand-drawn annotations. Next to Rule 1, there's a sketch of a graph labeled "G(T)" with an X over an arrow. Next to Rule 3, there's a sketch of a graph labeled "G(T)" with an X over an arrow and a circle around T.
---
## Page 21
### Content
Rule 1: Ignoring an Observation
Rule 1: Decide if an observation can be ignored:
$P(y | do(t), z, w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\bar{T})$
Example:
Example source: https://www.andrewheiss.com/blog/2021/09/07/do-calculus-backdoors/
### Visual Description
Two causal diagrams are shown side-by-side, with a large red arrow labeled "G(T)" pointing from the first to the second.
The first diagram shows nodes Z, W, T, Y. Arrows: Z->W, Z->T; W->Y, W->T; T->Y.
The second diagram shows the same nodes, but W and T are shaded. Arrows: Z->W, Z->T; W->Y; T->Y. The arrow from W to T is removed, and the arrow from Z to T is removed.
---
## Page 22
### Content
Rule 1: Ignoring an Observation
Rule 1: Decide if an observation can be ignored:
$P(y | do(t), z, w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\bar{T})$
Intuition:
$P(y | do(t), z, w) = P(y | do(t),w)$ if $Y \perp Z | T, W$ in $G(\bar{T})$
$P(y | z, w) = P(y | w)$ if $Y \perp Z | W$
Looks like generalization of conditional independence
### Visual Description
Text-only slide.
---
## Page 23
### Content
Rule 2: Treating an Intervention Like Observation
Rule 2: Decide if an intervention can be treated as an observation or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), z, w)$ if $Y \perp Z | T, W$ in $G(\bar{T},\underline{Z})$
Example source: https://www.andrewheiss.com/blog/2021/09/07/do-calculus-backdoors/
### Visual Description
Two causal diagrams are shown side-by-side, with a large red arrow labeled "G(T,Z)" pointing from the first to the second.
The first diagram shows nodes Z, W, T, Y. Arrows: Z->W, Z->T; W->Y, W->T; T->Y.
The second diagram shows the same nodes, but W and T are shaded. Arrows: Z->W; W->Y; T->Y. The arrow from Z to T is removed, and the arrow from W to T is removed.
---
## Page 24
### Content
Rule 2: Treating an Intervention Like Observation
Rule 2: Decide if an intervention can be treated as an observation or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), z, w)$ if $Y \perp Z | T, W$ in $G(\bar{T},\underline{Z})$
Intuition:
$P(y | do(t), do(z), w) = P(y | do(t), z, w)$ if $Y \perp Z | T, W$ in $G(\bar{T},\underline{Z})$
$P(y | do(z)) = P(y | z)$ if $Y \perp Z$ in $G(\bar{T},\underline{Z})$
Generalization of independence
### Visual Description
Text-only slide.
---
## Page 25
### Content
Rule 3: Ignoring an Intervention.
Rule 3: Decide if we can ignore an intervention or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\overline{T}, Z(W))$
where $Z(W)$ denotes the set of nodes of $Z$ that aren't ancestors of any node of $W$ in $G(\overline{T})$

Example source: https://www.andrewheiss.com/blog/2021/09/07/do-calculus-backdoors/
### Visual Description
A causal diagram transformation. On the left, a graph with nodes Z, W, T, Y. Z points to W, W points to Y. T points to Z and Y. There's an arrow from Z to T. On the right, a simplified graph with nodes Z, W, T, Y. Z and W are shaded grey. T points to Y. W points to Y. Z is isolated. An arrow labeled $G(\overline{T},Z(W))$ points from the left graph to the right graph, indicating the transformation.
---
## Page 26
### Content
Rule 3: Ignoring an Intervention.
Rule 3: Decide if we can ignore an intervention or vice versa:
$P(y | do(t), do(z), w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\overline{T}, Z(W))$
where $Z(W)$ denotes the set of nodes of $Z$ that aren't ancestors of any node of $W$ in $G(\overline{T})$
Intuition:
### Visual Description
Text-only slide.
---
