# Lecture_25_intervention

Source: `materials/archive/Lecture_25_intervention.pdf`
Duplicate equivalents: `Lecture_25_intervention.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 16

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 25:
The power of interventions
### Visual Description
A title slide with the course number "10708" at the top, followed by "Probabilistic Graphical Models: Spring 2026". Below that is the instructor's name "Andrej Risteski" and "Machine Learning Department". At the bottom, "Lecture 25: The power of interventions" is displayed. All text is centered on a dark blue background.
---

## Page 2
### Content
What about interventions?
Example: two-variable graph

A $\rightarrow$ B
A $\leftarrow$ B

These two graphs are not distinguishable from observations alone.

Slide by Brady Neal.
### Visual Description
The slide is titled "What about interventions?" at the top left. Below it, "Example: two-variable graph" is written. In the center, two simple directed graphs are shown side-by-side: one with an arrow from A to B (A $\rightarrow$ B) and another with an arrow from B to A (A $\leftarrow$ B). Below these graphs, the text "These two graphs are not distinguishable from observations alone." is displayed. A footer "Slide by Brady Neal." is at the bottom right.
---

## Page 3
### Content
What about interventions?
What about looking at other interventions?

| True graph | I = {A} | I = {B} | I |
|---|---|---|---|
| A $\rightarrow$ B | A $\rightarrow$ B | A B (no edge) | A B (no edge) |
| A $\leftarrow$ B | A B (no edge) | A $\leftarrow$ B | A B (no edge) |
| A B (no edge) | A B (no edge) | A B (no edge) | A B (no edge) |

Slide by Brady Neal.
### Visual Description
The slide is titled "What about interventions?" at the top left, with a subtitle "What about looking at other interventions?". A table-like arrangement of 12 small graphs is presented, organized into 3 rows and 4 columns. The columns are labeled "True graph", "I = {A}", "I = {B}", and "I". Each cell contains a simple graph with nodes A and B, showing either a directed edge, or no edge between them. For example, under "True graph", the first row shows A $\rightarrow$ B, while under "I = {A}", the second row shows A and B with no edge. A footer "Slide by Brady Neal." is at the bottom right, and the page number "4" is at the top right.
---

## Page 4
### Content
How many interventions are needed?

*   **Single variable interventions:** n-1 interventions single-var interventions suffice to identify graph. (Eberhardt et al 2006)
*   **Multi-variable interventions:** O(log n) interventions suffice if we can intervene on larger sets of variables. (Eberhardt et al 2005)
### Visual Description
Text-only slide.
---

## Page 5
### Content
What about interventions?
How about larger graphs?

**Left Graph:**
B $\rightarrow$ A
B $\rightarrow$ C
A $\rightarrow$ C

**Right Graph (I = {C}):**
A -- B (connected, no direction shown)
C (isolated)

**Conclusions:**
*   No C->A edge.
*   No C->B edge.
*   A,B are connected.

Slide by Brady Neal.
### Visual Description
The slide is titled "What about interventions?" at the top left, with a subtitle "How about larger graphs?". On the left side, a directed graph with three nodes A, B, and C is shown, forming a triangle where B points to A, B points to C, and A points to C. On the right side, the label "I = {C}" is displayed above another graph. This graph shows nodes A and B connected by an undirected line, and node C as an isolated circle. Below this, three bullet points list conclusions: "No C->A edge.", "No C->B edge.", and "A,B are connected.". A footer "Slide by Brady Neal." is at the bottom right.
---

## Page 6
### Content
What about interventions?
How about larger graphs?

**Left Graph:**
B $\rightarrow$ A
B $\rightarrow$ C
A $\rightarrow$ C

**Right Graph (I = {C}):**
A -- B (connected, no direction shown)
C (isolated)

**Conclusions:**
*   No C->A edge.
*   No C->B edge.
*   A,B are connected.

For a general graph (on n nodes): intervening on node 1 gives us skeleton on remaining nodes, so tells us which nodes are connected.

Slide by Brady Neal.
### Visual Description
The slide is titled "What about interventions?" at the top left, with a subtitle "How about larger graphs?". On the left side, a directed graph with three nodes A, B, and C is shown, forming a triangle where B points to A, B points to C, and A points to C. On the right side, the label "I = {C}" is displayed above another graph. This graph shows nodes A and B connected by an undirected line, and node C as an isolated circle. Below this, three bullet points list conclusions: "No C->A edge.", "No C->B edge.", and "A,B are connected.". A blue rectangular box at the bottom contains the text: "For a general graph (on n nodes): intervening on node 1 gives us skeleton on remaining nodes, so tells us which nodes are connected." A footer "Slide by Brady Neal." is at the bottom right.
---

## Page 7
### Content
What about interventions?
How about larger graphs?

**Left Graph:**
B $\rightarrow$ A
B $\rightarrow$ C
A $\rightarrow$ C

**Right Graph (I = {B}):**
A $\rightarrow$ C
B (isolated)

**Conclusions:**
*   No B->A edge.
*   Yes A->C edge.
*   Yes B->C edge.

For a general graph (on n nodes): intervening on node i tells us for every node j, whether the edge i-j is directed as i->j or j->i.
For a general graph (on n nodes): intervening on node n is not needed, as all edges i-n have been directed by interventions on node i.

Slide by Brady Neal.
### Visual Description
The slide is titled "What about interventions?" at the top left, with a subtitle "How about larger graphs?". On the left side, a directed graph with three nodes A, B, and C is shown, forming a triangle where B points to A, B points to C, and A points to C. On the right side, the label "I = {B}" is displayed above another graph. This graph shows a directed edge from A to C (A $\rightarrow$ C), and node B as an isolated circle. Below this, three bullet points list conclusions: "No B->A edge.", "Yes A->C edge.", and "Yes B->C edge.". Two blue rectangular boxes at the bottom contain additional text. The first box states: "For a general graph (on n nodes): intervening on node i tells us for every node j, whether the edge i-j is directed as i->j or j->i." The second box states: "For a general graph (on n nodes): intervening on node n is not needed, as all edges i-n have been directed by interventions on node i." A footer "Slide by Brady Neal." is at the bottom right.
---

## Page 8
### Content
What about interventions on more nodes?

An "adjacency" test can tell if nodes are adjacent. (E.g. intervening on x is an adjacency test for any pair in V/x).
Does either x$\rightarrow$y or y$\rightarrow$x?

An "x-directionality" test is one in which x $\in$ X is being intervened on, but not Y.
Does x$\rightarrow$y?

It suffices to expose every pair of nodes to either: "adjacency" + directionality test; or two opposite directionality tests.

In single-node interventions result:
(1) First intervention is an adjacency test for all pairs of nodes not involving node 1, and directionality test for all other nodes;
(2) All other interventions give the opposite directionality test for all other pairs.
### Visual Description
Text-only slide.
---
## Page 9
### Content
What about interventions on more nodes?
An "adjacency" test can tell if nodes are adjacent. (E.g. intervening on x is an adjacency test for any pair in V/x).
Does either x→y or y→x?
An "x-directionality" test is one in which x ∈ X is being intervened on, but not Y.
Does x→y?
It suffices to expose every pair of nodes to either: "adjacency" + directionality test; or two opposite directionality tests.
For every pair (x, y):
(1) We either intervene on both x and y (two opposite directionality tests)
(2) Or one of (x, y) as well as another node z (one directionality + one adjacency test)
### Visual Description
The slide discusses interventions on multiple nodes. Below the text, there is a simple graph showing three nodes, X, Y, and Z, arranged in a triangle. X is at the top left, Y at the top right, and Z at the bottom center. All nodes are enclosed in light blue circles.
---
## Page 10
### Content
What about interventions on more nodes?
Consider intervening on N/2 nodes:
We can easily see that log(N) interventions suffice to expose each pair of nodes to a directionality test:
In picture on left, let S be sets we intervene on; let U be rest.
Total # of interventions needed:
$1 + \text{max\_interv\_needed}(S, U)$
This recurrence solves to:
$\text{max\_interv\_needed} \le \text{log}(N)$
Add one more “null experiment" (i.e. no interventions), which is an adjacency test for all pairs of variables. Hence, with log(N)+1 experiments, every pair has been exposed to adjacency + directionality test.
### Visual Description
The slide continues the discussion on interventions. On the left side, there is a diagram of a graph with six nodes (X1 to X6) arranged in a hexagonal shape. X1, X2, X3 are on the left side, and X6, X5, X4 are on the right side. All nodes are enclosed in green rectangles. There are dashed lines representing connections between nodes, forming a dense network. Red arrows point from outside the graph towards X1, X2, and X3, indicating interventions. Text on the right explains the efficiency of interventions.
---
## Page 11
### Content
How many interventions are needed?
Single variable interventions: n-1 interventions single-var interventions suffice to identify graph. (Eberhardt et al 2006)
Multi-variable interventions: O(log n) interventions suffice if we can intervene on larger sets of variables. (Eberhardt et al 2005)
Both schemes described are static: set of interventions is fixed
Can perhaps do better with adaptive interventions (wait to see result before deciding next set of nodes to intervene on)
But these results are tight: worst case scenarios will need this many interventions
### Visual Description
Text-only slide.
---
## Page 12
### Content
Brief course overview
The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
Deterministic approximate inference: variational inference.
Deep generative models: VAEs, RBMs, EBMs, GANs (see 10-417/617, 10-707).
Beyond likelihood: score-matching, NCE, GANs.
Causality: identifiability, estimating causal effects (see 80-816).
### Visual Description
Text-only slide.
---
## Page 13
### Content
Other related topics we didn't get to
“Piping" learned features of a neural net into a graphical model:
Another way to "merge" neural nets and graphical models.
Example surveys/papers:
https://www.jmlr.org/papers/volume12/collobert11a/collobert11a.pdf and
https://arxiv.org/pdf/1508.01991.pdf in vision/segmentation tasks:
https://arxiv.org/abs/1502.03240
Figure 3. The End-to-end Trainable Network. Schematic visualization of our full network which consists of a CNN and the CNN-CRF network. Best viewed in colour.
Figure from Zheng et al '16
### Visual Description
The slide discusses "Piping" learned features of a neural net into a graphical model. Below the text and links, there is a diagram titled "Figure 3. The End-to-end Trainable Network." The diagram shows a pipeline starting with an image of an airplane, passing through an "FCN" (Fully Convolutional Network) block, then a "CRF-RNN" (Conditional Random Field Recurrent Neural Network) block, and finally outputting a segmented image (a red silhouette of the airplane). Below this main pipeline, there's another image showing a heatmap-like visualization, likely an intermediate feature map.
---
## Page 14
### Content
Other related topics we didn't get to
"Learned” algorithms for GM: learn better GM algorithm using a neural net (e.g. "learned belief propagation" algorithms). Often involves graph neural networks. Example papers:
https://dukespace.lib.duke.edu/dspace/handle/10161/20148, https://arxiv.org/pdf/1906.05774,http://web.cs.ucla.edu/~yzsun/classes/2020Winter_CS249/Papers/Group6_Inference_in_Probabilistic_Graphical_Models_by_Graph_Neural_Networks.pdf
Figure 2. Performance of GNN-based marginal inference on training graphs. (a-b) Example graph structures used in training and testing, shown as adjacency matrices (a) and graphs (b). (c-e) Estimated marginals (vertical axis) are shown against the true marginals for (c) BP, (d) msg-GNN, and (e) node-GNN. Individual red dots reflect the marginals for a single node in one graph. These dots should lie on the diagonal if inference is optimal.
Figure from Yoon et al '19
### Visual Description
The slide discusses "Learned" algorithms for Graphical Models (GM). Below the text and links, there is a large figure titled "Figure 2. Performance of GNN-based marginal inference on training graphs." The figure is divided into several subplots:
(a) Shows adjacency matrices for various graph structures (star, binary tree, path, cycle, ladder, grid, circular ladder, barbell, lollipop, wheel, bipartite, tripartite, complete). Each matrix is a grid of dark and light green squares.
(b) Shows the corresponding graph structures as node-link diagrams, with nodes as small circles and edges as lines.
(c), (d), (e) Show scatter plots comparing "estimated marginal" (y-axis) against "true marginal" (x-axis) for different inference methods: (c) BP (Belief Propagation), (d) msg-GNN, and (e) node-GNN. Each subplot contains multiple smaller scatter plots, one for each graph structure, with red dots representing marginals.
---
## Page 15
### Content
Other related topics we didn't get to
Distribution shift through the lens of causality: modeling and understanding performance of models when data is expected to not be iid.
Example surveys/papers: https://arxiv.org/abs/1706.08576, https://arxiv.org/abs/1907.02893, https://arxiv.org/abs/2010.05761.
[Peters-Bühlmann-Meinshausen'15]
[Arjovsky-Bottou-Gulrajani-Lopez-Paz'19]
### Visual Description
The slide discusses distribution shift through the lens of causality. Below the text and links, there are three causal diagrams, each representing a different "environment e".
- **Environment e = 1 (blue box):** Shows nodes X5, X2, X4, Y, X3. X5 points to X2 and X4. X2 and X4 both point to Y. Y points to X3.
- **Environment e = 2 (orange box):** Similar structure to e=1, but with two dashed red circles indicating interventions or changes. One circle is around the arrow from X5 to X2, and another around the arrow from Y to X3.
- **Environment e = 3 (gray box):** Similar structure to e=1, but with one dashed red circle around the arrow from X5 to X4.
All nodes are labeled X_i or Y and are enclosed in light gray circles.
---
## Page 16
### Content
That's all Folks!
### Visual Description
The slide displays the classic "That's all Folks!" message in a stylized white script font against a background of concentric red and black circles, with a dark blue circle in the center. This is the iconic ending screen from Looney Tunes cartoons.
---
