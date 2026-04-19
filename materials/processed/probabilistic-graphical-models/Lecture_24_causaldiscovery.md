# Lecture_24_causaldiscovery

Source: `materials/archive/Lecture_24_causaldiscovery.pdf`
Duplicate equivalents: `Lecture_24_causaldiscovery.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 15

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 24:
Algorithms for structure learning
### Visual Description
Text-only slide.
---
## Page 2
### Content
Identifying the Structure of a Causal Model

Prior results were not “algorithmic” (e.g. we said we "can” find which nodes have undirected edges between them, but not “how”)

In general, we saw a lot of work on “parameter learning”, that is learning a vector of parameters for a probabilistic model. What if we want to learn the structure of a DAG?
### Visual Description
A causal graph illustrating relationships between variables. Nodes are 'smoking' (rectangle), 'stress' (rectangle), 'genes' (oval), 'tar' (rectangle), and 'lung disease' (rectangle). Directed edges are: 'smoking' -> 'tar', 'stress' -> 'tar', 'stress' -> 'lung disease', 'genes' -> 'lung disease'.
---
## Page 3
### Content
Overview of the Algorithm

• Start with an initial guess about the DAG.

• Deduce conditional independence relations from d-separation. (In other words, find the skeleton of the graph.)

• Test these, and reject the DAG if variables which ought to be conditionally independent turn out to be dependent.
### Visual Description
Text-only slide.
---
## Page 4
### Content
Assumptions

• Acyclicity: The underlying causal graph G is a DAG.

• Causal Sufficiency: We know all variables in G, no unobserved confounders of any variable. (In other words, no latent variables.)

• Consistent independence tests: We can consistently test $X \perp Y | Z$.

• Faithfulness: (Next slide)
### Visual Description
Text-only slide.
---
## Page 5
### Content
Faithfulness

• Markov assumption: If Z d-separates X and Y in G, then $X \perp Y | Z$.

• But the reverse is not always true. (Typically not true when "cancellations" exist.)

• Faithfulness assumption: If $X \perp Y | Z$, then Z d-separates X and Y in G.

Equations:
$B := \alpha A$
$C := \gamma A$
$D := \beta B + \delta C = \beta \cdot \alpha A + \delta \cdot \gamma A = (\beta \alpha + \delta \gamma)A$
### Visual Description
A diamond-shaped graph with four nodes labeled A, B, C, D. Edges are: A -> B (labeled $\alpha$), A -> C (labeled $\gamma$), B -> D (labeled $\beta$), C -> D (labeled $\delta$).
---
## Page 6
### Content
Markov equivalences

Consider three variables X, Y, and Z:
### Visual Description
Four distinct directed acyclic graphs (DAGs) are shown, each involving three variables X, Y, and Z:
1. X -> Y -> Z
2. Z -> Y -> X
3. X <- Y -> Z (Y is a common cause of X and Z)
4. X -> Y <- Z (Y is a collider, with X and Z as its causes)
---
## Page 7
### Content
Markov equivalences

Consider three variables X, Y, and Z:

Markov equivalent
### Visual Description
Four distinct directed acyclic graphs (DAGs) are shown, each involving three variables X, Y, and Z. The first three graphs are enclosed together in a red rectangular box and labeled "Markov equivalent":
1. X -> Y -> Z (with blue handwritten circles around X, Y, Z and blue lines along edges)
2. Z -> Y -> X (with blue handwritten circles around X, Y, Z and blue lines along edges)
3. X <- Y -> Z (with blue handwritten circles around X, Y, Z and blue lines along edges)
The fourth graph is enclosed in a separate red rectangular box:
4. X -> Y <- Z (with blue handwritten circles around X, Y, Z and blue lines along edges)
---
## Page 8
### Content
Markov equivalences

• Two graphs are Markov equivalent if and only if they have the same skeleton and same colliders.

• Using conditional independencies in observational data, we cannot distinguish graphs in the same Markov Equivalent class.
### Visual Description
Three distinct directed acyclic graphs (DAGs) are shown, each involving three variables X, Y, and Z, enclosed together in a red rectangular box:
1. X -> Y -> Z
2. Z -> Y -> X
3. X <- Y -> Z (Y is a common cause of X and Z)
---
## Page 9
### Content
The SGS (Spirtes-Glymour-Scheines) Algorithm

1.  **Phase I: edge elimination (skeleton finding)**
    *   Start with a complete undirected graph on variables.
    *   Try to identify conditional independencies to eliminate edges in skeleton of graph.

2.  **Phase II: orient edges**
    *   First, find the edges which are "forced" to go a certain direction by existence of colliders.
    *   Second, recursively orient edges by excluding impossible configurations.

Slide by Hoda Heidari.
### Visual Description
Text-only slide.
---
## Page 10
### Content
The SGS (Spirtes-Glymour-Scheines) Algorithm

1.  **Edge elimination**
    *   Start with a complete undirected graph on variables.
    *   For each pair of variables $X$ and $Y$, and each set of other variables $S$, see if $X \perp Y | S$;
    *   if so, remove the edge between $X$ and $Y$.

2.  **Collider finding**
    *   Find colliders by checking for conditional dependence.
    *   **Rule:** for any undirected path $X-Z-Y$, s.t. no $X-Y$ edge, and conditioning on $Z$ does not make $X-Y$ independent, there is a collider.
    *   Orient the edges of colliders.

3.  **Inducing orientations**
    *   Try to orient undirected edges by consistency with already-oriented edges using a couple of simple rules. (Next slide.)
    *   Do this recursively until no more edges can be oriented.

Slide by Hoda Heidari.
### Visual Description
Text-only slide.
---
## Page 11
### Content
The SGS (Spirtes-Glymour-Scheines) Algorithm

3.  **Inducing orientations**

**Collider Detection Rule**
Constraints In -> Constraints Out

**Known Non-Colliders Rule**
Constraints In -> Constraints Out

**Cycle Avoidance Rule**
Constraints In -> Constraints Out

**Theorem:** These rules suffice to identify a graph in the same Markov equivalence class!
### Visual Description
The slide illustrates three rules for inducing orientations using diagrams.
1.  **Collider Detection Rule:** Shows an undirected path $X-Z-Y$ (Constraints In) transforming into $X \to Z \leftarrow Y$ (Constraints Out), indicating $Z$ is a collider.
2.  **Known Non-Colliders Rule:** Shows a path $X \to Z \to Y$ (Constraints In) transforming into $X \to Z \to Y$ (Constraints Out), implying that if $Z$ is not a collider on the path $X-Z-Y$, and $X \to Z$ and $Z \to Y$ are known, then $X$ and $Y$ are not directly connected.
3.  **Cycle Avoidance Rule:** Shows an undirected edge $X-Y$ with paths $X \to Z_1 \dots Z_k \to Y$ (Constraints In) transforming into $X \to Y$ (Constraints Out), implying that if orienting $X \to Y$ avoids a cycle, it should be oriented that way.
---
## Page 12
### Content
The PC (Peter-Clark) Algorithm

The trouble with the algorithm is that it's very inefficient (there are $2^n$ subsets for a graph on $n$ nodes).

In general this is unavoidable (problem is NP-hard). PC algorithm tries to make SGS a bit more efficient.

It's enough to find one $S$ making $X$ and $Y$ independent to remove their edge!
1.  For each $X$ and $Y$, see if $X \perp Y$; if so, remove their edge.
2.  For each $X$ and $Y$ still connected, and each third variable $Z$, see if $X \perp Y | Z$; if so, remove the edge between $X$ and $Y$.
3.  For each $X$ and $Y$ still connected, and each third and fourth variables $Z_1$ and $Z_2$, see if $X \perp Y | \{Z_1,Z_2\}$; if so, remove their edge.
4.  ...

Slide by Hoda Heidari.
### Visual Description
Text-only slide.
---
## Page 13
### Content
Example

1.  **Edge elimination**
    *   Start with a complete undirected graph on variables.
    *   For each pair of variables $X$ and $Y$, and each set of other variables $S$, see if $X \perp Y | S$;
    *   if so, remove the edge between $X$ and $Y$.

From defn of directed GM:
$A \perp B | \{\}$
$A \perp E | \{C\}$
$B \perp D | \{C\}$

Slide by Hoda Heidari.
### Visual Description
The top right shows a directed acyclic graph (DAG) with nodes A, B, C, D, E. Edges are $A \to C$, $B \to C$, $C \to D$, $C \to E$.
The bottom left shows a hand-drawn complete undirected graph with nodes A, B, C, D, E. Several edges are crossed out with red 'X' marks, specifically A-B, A-D, B-E, D-E.
Next to the hand-drawn graph, there are handwritten conditional independence statements.
A separate hand-drawn graph on the right shows nodes A, B, C, D, E with edges forming a cross shape centered at C, similar to the DAG, but without explicit direction.
---
## Page 14
### Content
Example

2.  **Collider finding**
    *   Find colliders by checking for conditional dependence;
    *   Orient the edges of colliders.

Slide by Hoda Heidari.
### Visual Description
The top right shows a directed acyclic graph (DAG) with nodes A, B, C, D, E. Edges are $A \to C$, $B \to C$, $C \to D$, $C \to E$.
The bottom shows a hand-drawn graph with nodes A, B, C, D, E. Edges are oriented: $A \to C$, $B \to C$, $C \to D$, $C \to E$. Red arrows indicate the direction of the edges. This illustrates the identification of C as a collider for A and B.
---
## Page 15
### Content
Example

3.  **Inducing orientations**
    *   Try to orient undirected edges by consistency with already-oriented edges;
    *   do this recursively until no more edges can be oriented.

Slide by Hoda Heidari.
### Visual Description
The top right shows a directed acyclic graph (DAG) with nodes A, B, C, D, E. Edges are $A \to C$, $B \to C$, $C \to D$, $C \to E$.
The bottom shows a hand-drawn graph with nodes A, B, C, D, E. All edges are oriented: $A \to C$, $B \to C$, $C \to D$, $C \to E$. Red arrows indicate the direction of the edges. This graph is identical to the bottom graph on the previous page, implying that all orientations have been induced.
---
