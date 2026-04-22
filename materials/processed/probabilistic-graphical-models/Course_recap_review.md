# Course_recap_review

Source: `materials/archive/Course_recap_review.pdf`
Duplicate equivalents: `Course_recap_review.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 120

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2025

Andrej Risteski, Albert Gu
Machine Learning Department

Course review
### Visual Description
A title slide with the course number "10708", course title "Probabilistic Graphical Models: Spring 2025", instructors' names "Andrej Risteski, Albert Gu", and their affiliation "Machine Learning Department". The bottom of the slide states "Course review".
---
## Page 2
### Content
Brief course overview

The basics: undirected and directed graphical models.
### Visual Description
Text-only slide.
---
## Page 3
### Content
The three pillars

**Representation**: is the representation compact and/or captures some structural semantics about distribution of choice.
The latter is a little open-ended: we'll see things like conditional dependence, maximum-entropy principles, etc.

**Inference**: can we efficiently draw samples from the model and/or calculate marginals in the model.

**Learning**: can the model be fit from data in an efficient manner.
What loss do we optimize? How do we optimize it? Can we use gradient-based methods to do so?
### Visual Description
Text-only slide.
---
## Page 4
### Content
First view of directed graphical models: causal relationships

Directed Graphs are useful for expressing directional/causal relationships between random variables.

Your symptoms: fever + loss of taste.

Probability that you have covid?

Diseases
Params W
Symptoms

Directed graphical model succinctly describes Pr[symptom| diseases]
### Visual Description
The slide features a heading "First view of directed graphical models: causal relationships". On the left, there is text explaining directed graphs and an example scenario involving symptoms and the probability of COVID. On the right, there is an image of a red coronavirus particle. Below the text, a directed graphical model diagram is shown. It has three rows of nodes: "Diseases" at the top (four nodes, two filled blue, two white), "Params W" on the left (two nodes, one filled blue, one white), and "Symptoms" at the bottom (four nodes, two filled blue, two white). Arrows connect nodes from the top row to the bottom row, and from the "Params W" nodes to the "Symptoms" nodes, indicating causal relationships. A text box to the right of the diagram states "Directed graphical model succinctly describes Pr[symptom| diseases]".
---
## Page 5
### Content
Second view: restricted conditional factorization

The joint distribution defined by the graph is given by the product of a conditional distribution for each node conditioned on its parents:

$$p(x) = \prod_{k=1}^{K} p(x_k|pa_k)$$

where $pa_k$ denotes a set of parents for the node $X_k$.

Each of the conditional distributions will typically have some parametric form. (e.g. product of Bernoullis in the noisy-OR case)

Important restriction: There must be no directed cycles! (i.e. graph is a DAG)
### Visual Description
The slide is titled "Second view: restricted conditional factorization". On the left, there is a directed acyclic graph (DAG) with 7 nodes labeled $x_1$ through $x_7$. The nodes are arranged in layers: $x_1, x_2, x_3$ at the top, $x_4, x_5$ in the middle, and $x_6, x_7$ at the bottom. Arrows indicate dependencies, for example, $x_1$ points to $x_4$ and $x_5$. On the right, there is a mathematical formula for $p(x)$ and explanatory text about conditional distributions and the restriction that the graph must be a DAG.
---
## Page 6
### Content
Third view: generative model

Consider a joint distribution over K random variables $p(x_1,x_2,..., X_K)$ factorizes as:

$$p(x) = \prod_{k=1}^{K} p(x_k|pa_k)$$

Suppose each of the conditional distributions are easy to sample from. How do we sample from the joint?

Start at the top and sample in order.
$\hat{x}_1 \sim p(x_1)$
$\hat{x}_2 \sim p(x_2)$
$\hat{x}_3 \sim p(x_3)$
$\hat{x}_4 \sim p(x_4|\hat{x}_1,\hat{x}_2, \hat{x}_3)$
$\hat{x}_5 \sim p(x_5|\hat{x}_1, \hat{x}_3)$

The parent variables are set to their sampled values

To obtain a sample from the marginal distribution, e.g. $p(x_2, x_5)$, sample from the full joint distribution, retain $\hat{x}_2, \hat{x}_5$, discard the remaining values.
### Visual Description
The slide is titled "Third view: generative model". On the left, there is a directed acyclic graph (DAG) identical to page 5, with 7 nodes labeled $x_1$ through $x_7$. On the right, there is a mathematical formula for $p(x)$ and text explaining how to sample from the joint distribution by starting at the top and sampling in order. A list of sampling steps is provided, such as $\hat{x}_1 \sim p(x_1)$, with an arrow pointing from the text "The parent variables are set to their sampled values" towards the graph. The bottom of the slide explains how to obtain a sample from a marginal distribution.
---
## Page 7
### Content
First view of undirected graphical models: soft constraints/energy

A pairwise undirected graphical model expresses a distribution as product of local potentials $\Phi_{ij}$ (interactions), for example

$$p(x) \propto \exp \left(\sum_{ij} \Phi_{ij}(x_i, x_j)\right)$$

"Soft constraint": the distribution tries to find a good balance in satisfying the (possibly conflicting) influences of the potentials.

Not clear how to draw samples efficiently...
(It will turn out to be hard to do so in general.)
### Visual Description
The slide is titled "First view of undirected graphical models: soft constraints/energy". On the left, there is an undirected graphical model (Markov Random Field) with four nodes: "sprinkler" (1), "rain" (2), "wet pavement" (3), and "clouds" (4). Edges connect "sprinkler" to "rain" ($\Phi(X_1, X_4)$), "sprinkler" to "wet pavement" ($\Phi(X_1, X_3)$), "rain" to "wet pavement" ($\Phi(X_2, X_3)$), and "rain" to "clouds" ($\Phi(X_2, X_4)$). On the right, there is a mathematical formula for $p(x)$ and text explaining "soft constraints" and the difficulty of efficient sampling.
---
## Page 8
### Content
Second view: maximum entropy principle

$$p(x) \propto \exp \left(\sum_{i} \lambda_i \Phi_i(x)\right)$$

In English: The distribution with potentials $\Phi_i$ appropriately weighed, has maximum entropy given the values of the expectations of the potentials.

The potentials $\{\Phi_i\}$ are also called sufficient statistics, and the above family of distributions an exponential family (w/ sufficient statistics $\{\Phi_i\}$)
### Visual Description
Text-only slide, featuring a mathematical formula for $p(x)$ enclosed in a rounded rectangle.
---
## Page 9
### Content
Third view: conditional independence

**Global Markov Property:** Consider pairwise UGM. The independence structure of variables is "captured" by the graph.

Nodes in A, B are independent, given a set of nodes C separating A, B
$p(x_A | x_C, x_B) = p(x_A|x_C)$

Equivalently:
$p(x_A, x_B|x_C) = p(x_A|x_C) p(x_B|x_C)$

$x_A \perp x_B|x_C$

**Special case (Local Markov Property):** node is independent of the rest of the graph, given values of the neighbors
$p(x_v | x_{N(v)}, x_{V/\{N(v),v\}}) = p(x_v|x_{N(v)})$
### Visual Description
A graph with 7 nodes and red edges. Nodes are grouped into three green dashed ovals labeled A, C, and B. Nodes in C are shaded blue. Below this, the conditional independence statement $x_A \perp x_B|x_C$ is written. A smaller graph below shows a central light blue node connected to three other nodes, with a pink oval highlighting the central node and its immediate neighbors.
---
## Page 10
### Content
Hammersley-Clifford theorem

Consider the following two sets of distributions:

- The set of distributions consistent with the conditional independence relationships defined by separations in an undirected graph G.
- The set of distributions consistent with the factorization defined by potential functions on maximal cliques of the graph G.

**Hammersley-Clifford theorem:** these two sets of distributions are the same.
### Visual Description
Text-only slide. The Hammersley-Clifford theorem statement is highlighted in a light blue box at the bottom.
---
## Page 11
### Content
General principle: moralization

X and Z are conditionally independent given the set E, if X and Z are separated in the undirected moralized graph.

**Definition:** $X \perp Z|E$ iff X and Z are separated by E in the undirected ancestral moral graph.

1. **Ancestral graph:** keep only X, Z, E and their ancestors
2. **Moral graph:** add undirected edge between all pairs of each node's parents
3. **Undirected graph:** convert all directed edges to undirected
4. **Givens Removed:** delete any nodes in E
### Visual Description
Text-only slide. The first statement about conditional independence and moralized graphs is highlighted in a light orange box.
---
## Page 12
### Content
Another principle: D-separation

If variables X and Z are d-separated given a set of variables E
Then X and Z are conditionally independent given the set E

**Definition:** Variables X and Z are d-separated given a set of evidence vars E iff every (undirected) path from X to Z is blocked.

A path is blocked whenever:
1. $\exists$ on path s.t. Y $\in$ E and Y is a "common parent"
   X ... $\leftarrow$ Y $\rightarrow$ ... Z
2. $\exists$ on path s.t. Y $\in$ E and Y is in a "cascade"
   X ... $\rightarrow$ Y $\rightarrow$ ... Z
3. $\exists$ on path s.t. {Y, descendants(Y)} $\notin$ E and Y is in a "v-structure”
   X ... $\rightarrow$ Y $\leftarrow$ ... Z
### Visual Description
The top section is highlighted in an orange box. Below the definition, there are three diagrams illustrating different path structures (common parent, cascade, v-structure) between nodes X, Y, and Z. In the first two diagrams, node Y is shaded grey, indicating it is part of the evidence set E. In the third diagram, Y is not shaded.
---
## Page 13
### Content
Inference tasks

**Inference:** answering "probabilistic queries" about a known model

**Sampling:** drawing samples from a given model

**Marginal Inference:** compute marginals of variables (e.g. $p(x_i), p(x_C)$)

**MAP (Maximum A-Posteriori Probability) Inference:** compute variable assignment with highest probability
$\hat{x} = \operatorname{argmax}_x p(x|\theta)$

**Partition Function (for a UGM):** Compute the normalization constant
$Z(\theta) = \sum_x \prod_{C \in C} \psi_C(x_C)$

Seems like an outlier, but very closely related to marginal inference.
(See homework.)
### Visual Description
Text-only slide.
---
## Page 14
### Content
Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
### Visual Description
Text-only slide.
---
## Page 15
### Content
Variable Elimination for Marginal Inference

**Algorithm 1b: Variable Elimination for the Partition Function**
Input: undirected graphical model (i.e. tables for potentials)
Output: the partition function
a. Pick an elimination ordering
b. Eliminate each variable in the ordering using Algorithm 2

**Algorithm 2: Eliminate One Variable**
Input: the variable to be eliminated
Output: new graph with the variable eliminated (i.e. new tables for potentials)
a. Find the input variable and its neighboring variables -- call this set the eliminated set
b. Add a clique on the eliminated set
   a. Build a table for the potential over the new clique (for every possible value of the entries), by summing out the eliminated variable.
### Visual Description
Two algorithms are presented in separate highlighted boxes. Algorithm 1b is in a yellow box, and Algorithm 2 is in a pink box.
---
## Page 16
### Content
Variable elimination

The complexity of the algorithm is governed by the:
largest clique created in the course of running the algorithm,
since to describe a new potential over k vertices, we need a table of size $c^k$

**Important:** the order of elimination of vertices matters.

Order 2: eliminate the center vertex first
### Visual Description
Two undirected graphs are shown side-by-side. The left graph shows a central node (6) connected to five peripheral nodes (1, 2, 3, 4, 5) in a star-like structure. The right graph shows a complete graph (clique) of five nodes (1, 2, 3, 4, 5), with node 6 absent. The title "Order 2: eliminate the center vertex first" is placed above the right graph.
---
## Page 17
### Content
Message Passing: Belief propagation

Both messages judge the possible values of variable X.
Their product = belief at X = product of all 3 messages to X.

Slide by Matt Gormley.
### Visual Description
A diagram illustrating belief propagation in a factor graph. A central variable node `X` is connected to a factor node `Ψ` and other unnamed nodes. Arrows indicate messages being passed between nodes.
- A thought bubble above `X` shows values `v 6`, `n 6`, `a 9`.
- A thought bubble near `X` (from a factor) says "My other factors think I'm likely a n" and shows values `v 1`, `n 6`, `a 3`.
- A thought bubble near `Ψ` (from other variables/factors) says "But my other variables and I think you're likely a v" and shows values `v 6`, `n 1`, `a 3`.
---

## Page 18
### Content
Sum-product belief propagation

**Input:** a factor graph with no cycles
**Output:** exact marginals for each variable and factor

**Algorithm:**
1. Initialize the messages to the uniform distribution.
   $\mu_{i \to \alpha}(x_i) = 1$
   $\mu_{\alpha \to i}(x_i) = 1$
2. Choose a root node.
3. Send messages from the leaves to the root.
4. Send messages from the root to the leaves.
   $\mu_{i \to \alpha}(x_i) = \prod_{\alpha \in N(i)\setminus\alpha} \mu_{\alpha \to i}(x_i)$
   $\mu_{\alpha \to i}(x_i) = \sum_{x_{\alpha \setminus \{i\}}} \psi_{\alpha}(x_{\alpha}) \prod_{j \in N(\alpha)\setminus i} \mu_{j \to \alpha}(x_{\alpha}[j])$
5. Compute the beliefs (unnormalized marginals).
   $b_i(x_i) = \prod_{\alpha \in N(i)} \mu_{\alpha \to i}(x_i)$
   $b_{\alpha}(x_{\alpha}) = \psi_{\alpha}(x_{\alpha}) \prod_{i \in N(\alpha)} \mu_{i \to \alpha}(x_{\alpha}[i])$
6. Normalize beliefs and return the exact marginals.
   $p_i(x_i) \propto b_i(x_i)$
   $p_{\alpha}(x_{\alpha}) \propto b_{\alpha}(x_{\alpha})$

Slide by Matt Gormley.
### Visual Description
A slide detailing the sum-product belief propagation algorithm. The algorithm steps and mathematical formulas are presented within a large white rectangular box.
---

## Page 19
### Content
Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
### Visual Description
Text-only slide. The background features a subtle pattern of interconnected circles and lines, resembling a network or graph.
---

## Page 20
### Content
What distributions are easy to sample from?

Most univariate distributions:
*   Uniform[0,1]: `np.random()` (Mersenne Twister based)
*   Bernoulli(1/2): (if `np.random() < 1/2`, output 1; else output 0)
*   Bernoulli(p): (if `np.random() < p`, output 1; else output 0)
*   Standard univariate Gaussian: (Box-Muller transform of uniform)
*   .... (bruteforce transforms work in 1d)
### Visual Description
Text-only slide.
---

## Page 21
### Content
What distributions are easy to sample from?

Extremely few multivariate distributions:
*   Product distributions: $P(X_1, X_2, ..., X_n) = \prod_i P(x_i)$ (sample coordinates independently)
*   "Tractably factorized" distributions: $P(x_1, x_2, ..., X_n) = \prod_i P(x_i|x_{<i})$ for which factors are some easy to sample distribution (e.g. Bernoulli, Gaussian, etc.)
*   Standard Gaussian (product of standard univariate Gaussians)
*   Any Gaussian: a sample from $y \sim N(\mu, \Sigma)$ can be generated as follows
    *   Sample $x \sim N(0, I)$. Output $y = \mu + \Sigma^{1/2}x$.
### Visual Description
Text-only slide.
---

## Page 22
### Content
Rejection sampling: simplest way to sample

**Input:** target density $f$, proposal density $g$, a constant $c$, s.t. $f(x) \le cg(x)$

**Algorithm:**
*   Generate sample $x$ from $g$
*   Generate sample $u$ from unif(0, 1)
*   Accept if $u \le \frac{f(x)}{cg(x)}$

How often do we accept?
$P(X \text{ accepted}) = P \left(U \le \frac{f(X)}{cg(X)}\right) = \int P \left(U \le \frac{f(x)}{cg(x)} \middle| X = x\right) g(x)dx$
### Visual Description
A plot illustrating rejection sampling. The x-axis ranges from -100 to 100, and the y-axis from 0.00 to 0.05. An orange curve, labeled `cg(x)`, represents the scaled proposal density. A green curve, labeled `f(x)`, represents the target density and is entirely contained beneath `cg(x)`. The area under `f(x)` is shaded green.
---

## Page 23
### Content
Stationary distribution

**Stationary distribution:** a distribution $\pi = (\pi_1, ... \pi_{|X|})$ is stationary for a Markov walk if $\pi T = \pi$.

Many Markov Chains have unique stationary distributions: after taking many steps, starting with any distribution, we get to the same distribution
$\forall p_0, \lim_{t \to \infty} p_0 T^t = \pi$

**Name of the game:** if we wish to sample from some $\pi$, design a Markov Chain which has $\pi$ as stationary distribution.
If we run chain long enough (??), we can draw samples from something close to $\pi$
### Visual Description
A slide with text content organized into two distinct colored boxes. The top box, light orange, contains the definition of a stationary distribution. The bottom box, light green, outlines the goal of designing a Markov Chain with a desired stationary distribution for sampling.
---

## Page 24
### Content
Metropolis-Hastings

Suppose we have an easy to sample from "transition kernel" $q(i,j)$.
Consider the following random walk, for some $\alpha(i, j)$ we will pick:

$\text{Pr}(X_n = j|X_{n-1} = i) = \begin{cases} \text{from state } i \text{ go to state } j \text{ with prob. } q(i,j) \\ \text{with prob } 1 - \alpha(i, j) \text{ go back to state } i, \\ \text{with prob } \alpha(i, j) \text{ stay in state } j. \end{cases}$

Then, we have:
$P(X_{n+1} = j|X_n = i) = q(i,j)\alpha(i,j) \quad \forall j \ne i$
$P(X_{n+1} = i|X_n = i) = q(i,i) + \sum_{k \ne i} q(i, k)(1 - \alpha(i,k))$
### Visual Description
A slide explaining the Metropolis-Hastings algorithm. The definition of the transition probability $\text{Pr}(X_n = j|X_{n-1} = i)$ is presented within a light blue rectangular box.
---
## Page 25
### Content
Metropolis-Hastings

**Observation**
$\pi_i P_{ij} = \pi_j P_{ji} \quad \forall j \neq i \Leftrightarrow \pi_i q(i,j) \alpha(i, j) = \pi_j q(j,i) \alpha(j,i) \quad \forall j \neq i \quad (*)$

**Proof:** $P_{ij} = P(X_{n+1} = j|X_n = i) = q(i, j) \alpha(i, j) \quad \forall j \neq i$

**Theorem**
If $\alpha(i,j) = \min \left( \frac{\pi_j q(j, i)}{\pi_i q(i, j)}, 1 \right) = \min \left( \frac{b(j) q(j, i)}{b(i) q(i, j)}, 1 \right)$
$\Rightarrow (\pi_1, \dots \pi_m)$ stationary distribution

**Proof:**
If $\alpha(i, j) = \frac{\pi_j q(j, i)}{\pi_i q(i, j)} \Leftrightarrow \alpha(j, i) = 1$
$\Rightarrow$ Detailed balance $(*)$ holds

Note, this only depends on unnormalized distribution ($b(i)$ values)
### Visual Description
The slide presents mathematical definitions and proofs related to the Metropolis-Hastings algorithm. It includes an "Observation" with an equivalence relation for detailed balance, a "Proof" for the transition probability, a "Theorem" defining the acceptance probability $\alpha(i,j)$ and stating its implication for a stationary distribution, and another "Proof" showing how a specific form of $\alpha(i,j)$ leads to detailed balance. A blue arrow points from the $\min$ function in the Theorem to a note about unnormalized distributions.
---
## Page 26
### Content
Gibbs sampling

Consider sampling a distribution over n variables $\mathbf{x} = (x_1, x_2, ..., x_n)$, s.t. each of the conditional distributions $P(x_i|\mathbf{x}_{-i})$ is easy to sample. :

e.g. recall Ising models: $P_\theta(x_i = 1|\mathbf{x}_{-i}) = \frac{1}{1 + \exp(-\theta_i - \sum_{j \in E} x_j \theta_{ij})}$

A common way to do this is using **Gibbs sampling**:

Repeat:
* Let current state be $\mathbf{x} = (x_1, x_2, ..., x_n)$
* Pick $i \in [n]$ uniformly at random.
* Sample $x \sim P(X_i = x|\mathbf{x}_{-i})$
* Update state to $\mathbf{y} = (x_1, x_2, ..., x_{i-1}, x, x_{i+1}, ..., x_n)$
### Visual Description
The slide introduces Gibbs sampling. It starts with a general description of the problem (sampling a distribution over n variables where conditionals are easy to sample), provides an example using Ising models with a specific probability formula, and then outlines the "Repeat" steps of the Gibbs sampling algorithm in a bulleted list within a colored box.
---
## Page 27
### Content
Gibbs sampling

$p(\mathbf{x})$
$\mathbf{x}^{(t+3)}$
$\mathbf{x}^{(t+2)}$
$\mathbf{x}^{(t+4)}$
$\mathbf{x}^{(t+1)}$
$\mathbf{x}^{(t)}$
### Visual Description
The slide displays a 2D plot with $x_1$ on the horizontal axis and $x_2$ on the vertical axis. Contour lines represent a probability distribution $p(\mathbf{x})$. A dashed rectangular path with points labeled $\mathbf{x}^{(t)}, \mathbf{x}^{(t+1)}, \mathbf{x}^{(t+2)}, \mathbf{x}^{(t+3)}, \mathbf{x}^{(t+4)}$ illustrates the step-by-step movement of a Gibbs sampler, showing how it samples along one dimension at a time, forming right-angle turns.
---
## Page 28
### Content
Training UGMs using maximum likelihood

For brevity, let us write a UGM as:
$p_\theta(x) \propto \exp(-E_\theta(x))$
where $E_\theta(x)$ has some easy to evaluate form.

Hence, full gradient-based algorithm for learning a UGM:
$\theta_{t+1} = \theta_t + \eta \left( \frac{1}{n} \sum_{\text{samples } x_i} -\nabla_\theta E_\theta(x_i) + \mathbb{E}_{x \sim p_{\theta_t}} [-\nabla_\theta E_\theta(x)] \right)$

Remarks:
In general, likelihood is not concave (so no guarantees of converging to global max)
In general, drawing samples from $p_\theta$ is no easier than estimating partition functions, which is #P-hard. (See HW.)
### Visual Description
The slide discusses training Undirected Graphical Models (UGMs) using maximum likelihood. It defines a UGM's probability distribution in terms of an energy function $E_\theta(x)$ and then presents a full gradient-based algorithm for learning the UGM parameters $\theta$. The formula for $\theta_{t+1}$ includes a sum over samples and an expectation term. Two bulleted remarks at the bottom highlight challenges: non-concavity of likelihood and the difficulty of drawing samples or estimating partition functions.
---
## Page 29
### Content
CD-k Algorithm

For each training example $\mathbf{x}$
* Generate a negative sample $\tilde{\mathbf{x}}$ using k steps of Gibbs sampling, starting at the data point $\mathbf{x}$
* Update model parameters:
    $W \Leftarrow W + \alpha \left( \mathbf{h}(\mathbf{x}) \mathbf{x}^T - \mathbf{h}(\tilde{\mathbf{x}}) \tilde{\mathbf{x}}^T \right)$
    $b \Leftarrow b + \alpha \left( \mathbf{h}(\mathbf{x}) - \mathbf{h}(\tilde{\mathbf{x}}) \right)$
    $c \Leftarrow c + \alpha \left( \mathbf{x} - \tilde{\mathbf{x}} \right)$
* Go back to 1 until stopping criteria

Gradients we derived before
Step size
### Visual Description
The slide outlines the CD-k (Contrastive Divergence with k steps) algorithm. It lists three main steps: generating a negative sample $\tilde{\mathbf{x}}$ via Gibbs sampling, updating model parameters (W, b, c) using specific equations involving $\mathbf{x}$, $\tilde{\mathbf{x}}$, and $\mathbf{h}(\cdot)$, and repeating until a stopping criterion is met. A curly brace on the right groups the parameter update equations, labeled "Gradients we derived before". An arrow points from $\alpha$ in the equations to the text "Step size". The page number '29' is visible in the bottom right corner.
---
## Page 30
### Content
Curse of dimensionality

Curse of dimensionality:
Say we are running Metropolis-Hastings in high dimension.
If we want proposals to be successful with good probability: proposal has to reasonably match distribution we are sampling.

"Exponential # of directions": In high dimension, there's an exponential number of directions to "move in" --- might be hard to "hit" the probability manifold.

"Choosing the step size": if steps are very large, likely to leave manifold. If too small, random walk moves too slowly.
### Visual Description
The slide explains the "Curse of dimensionality" in the context of Metropolis-Hastings. It describes two main challenges: the "Exponential # of directions" making it hard to find the probability manifold, and the difficulty of "Choosing the step size" (too large leaves the manifold, too small makes the walk slow). On the right, two abstract, blob-like shapes with dotted outlines are shown. The top blob has fewer dots, while the bottom blob has more dots along its perimeter, possibly illustrating different step sizes or the difficulty of covering the manifold.
---
## Page 31
### Content
How to pick MH proposals

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to $x$.

Why not try to follow the direction of the gradient, to try to move to where the probability is higher?

**MALA (Metropolis Adjusted Langevin Algorithm):**

Propose: $x_{t+1} = x_t - \eta \nabla E_\theta(x) + \sqrt{2 \eta} \xi_k$
$\xi_k \sim N(0,I)$

Gradient descent
Gaussian noise
### Visual Description
The slide discusses how to pick Metropolis-Hastings (MH) proposals. It sets the context by considering sampling from a distribution $p_\theta(x)$ where the energy function $E_\theta(x)$ is differentiable and gradients are efficient to compute. It then poses a question about following the gradient direction. The main content introduces the **MALA (Metropolis Adjusted Langevin Algorithm)**, providing the proposal equation for $x_{t+1}$. The equation is visually broken down into two components: "$x_t - \eta \nabla E_\theta(x)$" labeled "Gradient descent" and "$+ \sqrt{2 \eta} \xi_k$" labeled "Gaussian noise". The distribution of $\xi_k$ is also given.
---
## Page 32
### Content
How to pick MH proposals

Gradient descent
Langevin Monte Carlo
### Visual Description
The slide contains two contour plots, one above the other, both depicting a double-well potential or a bimodal distribution. The top plot is labeled "Gradient descent", and the bottom plot is labeled "Langevin Monte Carlo". Both plots show concentric contour lines, with darker regions in the center of the two "wells" indicating higher probability or lower energy. The overall shape of the contours is similar in both plots, suggesting a comparison of how different sampling methods might explore such a landscape.
---
## Page 33
### Content
Bottlenecks

The transition graph for the random walk could have "bottlenecks": regions from which it's hard to escape:

The conductance of a subset S is defined as:
$$ \phi(S) = \frac{\Sigma_{i \in S, j \notin S} T_{ij}}{\Sigma_{i \in S} \pi_i} $$
(e.g. how easy it is to leave S, given that we started in S)
(e.g. the colored sets have poor conductance)

It's clear that sets of poor $\phi(S)$ impede mixing time:
If we start at S, even with the correct $\pi$, it'll take us long to leave S.
The distribution is "multimodal": has S's that have large probability, but are difficult to transition between.
### Visual Description
A graph with multiple nodes connected by edges. The nodes are colored into distinct clusters (e.g., yellow, red, blue, green, brown), visually representing regions or communities within the graph. The formula for conductance is highlighted in a box.
---
## Page 34
### Content
Potential solutions for multimodality

Unlike optimization, scale (temperature) matters!

Sampling flatter distributions is easier!

Can we leverage this?

**Tempering/annealing**: run multiple chains at different temperatures, and use the fact that chains at higher temperatures move faster through landscape.
### Visual Description
A 3D plot showing a bimodal probability distribution $p(x) \propto e^{-f(x)}$. The distribution has two distinct peaks, resembling two hills, with a valley in between. The x and y axes represent spatial dimensions, and the z-axis represents probability density.
---
## Page 35
### Content
Tempering: flatten the hills

$$ p_1(x) \propto e^{-f(x)/100} $$
$$ p_2(x) \propto e^{-f(x)/50} $$
$$ p(x) \propto e^{-f(x)} $$

**Algorithm**: run multiple walks in parallel for **different temperatures**. **Swap** locations occasionally so lower-temp. chains explore space faster. (Occasionally = equilibrium distr. at each temperature is correct.)

Popular in practice, among other "annealing tricks" ((reverse) annealed importance sampling, tunneling...).
### Visual Description
Three 3D plots of probability distributions stacked vertically. The top plot shows a very flat, spread-out distribution ($p_1(x)$), the middle plot shows a moderately peaked distribution ($p_2(x)$), and the bottom plot shows a sharply peaked, bimodal distribution ($p(x)$). Vertical arrows indicate movement of samples between the distributions, and horizontal arrows within each distribution suggest swaps or exploration.
---
## Page 36
### Content
Simulated tempering

*   Markov Chain on state space: $\mathbb{R}^d \times [L]$. (L is # of temperatures)
*   Let $M_k$ be the Markov Chain corresponding to temperature k (i.e. with stationary distr. $p_k$)

**Tempering chain:**
Let current point be $(x, k)$.
*   With probability 1/2: evolve x according to $M_k$ to $x'$;
    Set next point to $(x',k)$.
*   With probability 1/2: pick random $k'$, set next point to $(x,k')$ with probability $\min \left( \frac{p_{k'}(x)}{p_k(x)}, 1 \right)$
### Visual Description
Text-only slide.
---
## Page 37
### Content
Annealed importance sampling

"Annealing" strategies try to parcel up the problem into easier problems.

Calculate $Z_0$
Calculate $Z_1/Z_0$
Calculate $Z_2/Z_1$
### Visual Description
Three 3D plots of probability distributions arranged horizontally, with arrows pointing from left to right. The first plot on the left shows a very flat, spread-out distribution. The middle plot shows a distribution with two moderate peaks. The third plot on the right shows a sharply peaked, bimodal distribution. Each plot is labeled with a calculation related to partition functions ($Z_0$, $Z_1/Z_0$, $Z_2/Z_1$).
---
## Page 38
### Content
Annealed importance sampling

We'll produce samples $x^{(1)}, x^{(2)}, ..., x^{(N)}$ and use importance sampling, with carefully defined weights $r^{(1)}, r^{(2)}, ..., r^{(N)}$

**Annealed importance sampling algorithm:**
To generate $(x^{(i)}, r^{(i)})$ pair:
Sample $x_1 \sim p_0$.
Sample $x_2 \sim T_1(x_2, x_1)$.
....
Sample $x_m \sim T_{m-1}(x_m, x_{m-1})$.
Set: $x^{(i)} = x_m$, $r^{(i)} = \frac{p_1^*(x_1) p_2^*(x_2) \dots p_{m-1}^*(x_{m-1}) p_m^*(x_m)}{p_0^*(x_1) p_1^*(x_2) \dots p_{m-2}^*(x_{m-1}) p_{m-1}^*(x_m)}$

Output: $\frac{1}{N} \sum_{i=1}^N r^{(i)}$
### Visual Description
A text-heavy slide describing the Annealed Importance Sampling algorithm. A large question mark icon is present on the right side of the algorithm steps. The formula for $r^{(i)}$ and the final output formula are highlighted within a red box.
---
## Page 39
### Content
Hamiltonian Monte Carlo

Consider sampling from $p_\theta(x) = \frac{1}{Z} \exp(-E_\theta(x))$ with support $\mathbb{R}^d$, $E_\theta$ is differentiable and we can efficiently take gradients with respect to x.

We want to be able to take longer steps.

A crazy idea: what if we introduce new variables?

We'll try to sample $p'_\theta(x, v)$, s.t. the marginal of x matches, i.e. $p'_\theta(x) = p_\theta(x)$, and $p'_\theta(x, v)$ can be sampled faster (i.e exploration is faster).

Think of it as "lifting" the chain to a higher dimension.
### Visual Description
A 2D diagram showing a red elliptical contour representing a probability distribution. A green curved line with an arrow indicates a path or trajectory, starting from a point on the contour, moving along it, and then making a jump (indicated by a dotted line) to another point on the contour.
---
## Page 40
### Content
Hamiltonian Monte Carlo

https://chi-feng.github.io/mcmc-demo/app.html
### Visual Description
A screenshot of an interactive simulation titled "Hamiltonian Monte Carlo". It displays a 2D probability distribution with contour lines, and a path (black dots connected by lines) exploring this distribution. A red arrow indicates a proposed move. Histograms are visible on the left and bottom edges, showing the marginal distributions of the samples. The top right corner has an "Open Control" button.
---
## Page 41
### Content
# Hamiltonian Monte Carlo

$\frac{dv}{dt} := -\frac{dH}{dx}$
Force = - negative grad of potential energy

$\frac{dx}{dt} := \frac{dH}{dv}$
Momentum = grad of kinetic energy

Hamiltonian preservation: $\frac{dH}{dt} = \frac{dH}{dv}\frac{dv}{dt} + \frac{dH}{dx}\frac{dx}{dt} = 0$

Algorithm: Since $H(x, v) = f(x) + ||v||^2$ is preserved under Hamiltonian iteration, and we are trying to sample from $p(x, v) \propto \exp(-H(x, v))$, why not just iterate:

1. In step i, pick a random velocity $\xi_i$ (e.g. $\xi_i \sim N(0,I)$)
2. Obtain $x_{i+1}$ by simulating evolving Hamiltonian for T steps, starting at $(x_i, \xi_i)$.

### Visual Description
The slide introduces Hamiltonian Monte Carlo. It presents two differential equations for $dv/dt$ and $dx/dt$, defining force as negative gradient of potential energy and momentum as gradient of kinetic energy. It then shows an equation for Hamiltonian preservation. The bottom half of the slide outlines a two-step algorithm for sampling from a distribution using Hamiltonian iteration.
---
## Page 42
### Content
# Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
Deterministic approximate inference: variational inference.

### Visual Description
Text-only slide.
---
## Page 43
### Content
# Algorithmic approaches to inference

When faced with a difficult to calculate probabilistic quantity (partition function, difficult posterior), there are two families of approaches:

**MARKOV CHAIN MONTE CARLO**
* Random walk w/ equilibrium distribution the one we are trying to sample from.
* Pros: Eventually, you will get samples from the intended distribution.
* Cons: Might need to run the algorithm very long; v. difficult to diagnose if the Markov Chain has converged.

**VARIATIONAL METHODS**
* Based on solving an optimization problem.
* Pros: Convergence is v. fast (lots of packages with v. efficient implementations)
* Cons: The optimization problems we are trying to solve are typically non-convex; unclear how good the solution we've converged to.

### Visual Description
The slide compares two algorithmic approaches to inference: Markov Chain Monte Carlo and Variational Methods. For each approach, it provides a brief description, lists its pros, and lists its cons. The page number '43' is in the bottom right corner.
---
## Page 44
### Content
# Variational methods for partition functions

**Gibbs variational principle:** Let $p(x) = \frac{1}{Z}\exp(E(x))$ be a distribution over a domain $\mathcal{X}$. Then, $Z$ is the solution to the following optimization problem:
$\log Z = \max_{q: \text{distribution over } \mathcal{X}} H(q) + E_{x \sim q}[E(x)]$

Find the distribution that has both high entropy, and high expected energy value

$H(q) := -\sum_{x \in \mathcal{X}} q(x) \log q(x)$

### Visual Description
The slide defines variational methods for partition functions, starting with the Gibbs variational principle and its associated optimization problem for $\log Z$. It then explains that the goal is to find a distribution with high entropy and high expected energy value, followed by the mathematical definition of entropy $H(q)$. A black and white portrait of a man with a beard is on the right side of the slide.
---
## Page 45
### Content
# Variational methods for partition functions

**Gibbs variational principle:** Let $p(x) = \frac{1}{Z}\exp(E(x))$ be a distribution over a domain $\mathcal{X}$. Then, $Z$ is the solution to the following optimization problem:
$\log Z = \max_{q: \text{distribution over } \mathcal{X}} H(q) + E_{x \sim q}[E(x)]$

Hence, we've reduced calculating partition function to an optimization problem!

But, there is a serious issue: how do we solve an optimization over the set of distributions over $\mathcal{X}$?

Even if $\mathcal{X}$ is a really simple domain, e.g. $\mathcal{X} = \{+1\}^n$, the trivial way to solve the problem would involve introducing a variable $q(x)$, $\forall x \in \{+1\}^n$: there are $2^n$ of them.

In fact, you can't be clever – this can be #P hard even for Ising models!

### Visual Description
The slide reiterates the Gibbs variational principle and the optimization problem for $\log Z$. It then highlights a "serious issue": the difficulty of solving an optimization problem over the set of all distributions, explaining that even for simple domains like $\mathcal{X} = \{+1\}^n$, the number of variables ($2^n$) makes it computationally intractable, potentially #P hard for Ising models.
---
## Page 46
### Content
# The physics approach: inner relaxation

**Gibbs variational principle:** Let $p(x) = \frac{1}{Z}\exp(E(x))$ be a distribution over a domain $\mathcal{X}$. Then, $Z$ is the solution to the following optimization problem:
$\log Z = \max_{q: \text{distribution over } \mathcal{X}} H(q) + E_{x \sim q}[E(x)]$

What can we do to try to approximate this expression?

**Inspiration from physics:** solve a simpler optimization problem over a restricted class of distributions we can explicitly parametrize.
$\log Z \approx \max_{q \in \mathcal{Q}} H(q) + E_{x \sim q}[E(x)]$

**Example:** naïve mean-field approximation: $\mathcal{Q}$ consists of product distribs
Consider again $\mathcal{X} = \{+1\}^n$. A product distribution depends on n parameters only: since $q(x) = \prod_i q_i(x_i)$, for each $i \in [n]$, we only need to specify $q_i(x_i = 1)$.

### Visual Description
The slide introduces "The physics approach: inner relaxation" to approximate the Gibbs variational principle. It first restates the principle and the optimization problem for $\log Z$. It then proposes solving a simpler optimization problem over a "restricted class" of explicitly parametrizable distributions, denoted $\mathcal{Q}$. An example of this is the naïve mean-field approximation, where $\mathcal{Q}$ consists of product distributions, reducing the number of parameters needed.
---
## Page 47
### Content
# The computer science approach: outer relaxation

**Gibbs variational principle:** Let $p(x) = \frac{1}{Z}\exp(E(x))$ be a distribution over a domain $\mathcal{X}$. Then, $Z$ is the solution to the following optimization problem:
$\log Z = \max_{q: \text{distribution over } \mathcal{X}} H(q) + E_{x \sim q}[E(x)]$

What can we do to try to approximate this expression?

**Inspiration from computer science:** solve a simpler optimization problem over a larger set of mathematical objects that's easier to maximize over.

For example, often when we want to solve an integer program where the variables are required to be $\{0,1\}$, we instead solve a relaxed linear program, where the variables are required to be in $[0,1]$.

### Visual Description
The slide introduces "The computer science approach: outer relaxation" for approximating the Gibbs variational principle. It begins by restating the principle and the optimization problem for $\log Z$. It then suggests solving a simpler optimization problem over a "larger set" of mathematical objects that are easier to maximize over. An example provided is relaxing an integer program with $\{0,1\}$ variables to a linear program with variables in $[0,1]$.
---
## Page 48
### Content
# The computer science approach: outer relaxation

Objective can be rewritten as:
$\max_{\{q_c(x_c)\}_c} \left\{ \sum_C E_{q_c}[\Phi_c(x_c)] + \max_{\tilde{q}: q_C(x_C) = q_c(x_C), \forall C} H(\tilde{q}) \right\}$

We seemingly gained something: we are now only optimizing over the set of all $q_c$. If there are K maximal cliques, each of size $\le M$, and each variable $x_i$ can take L values, we only need $K L^M$ variables to describe $q_c$. (As opposed to $L^d$.)

We have a different problem though: the set $\{q_c(x_c)\}_c$ needs to be such that there exists a distribution $\tilde{q}$, s. t. $\tilde{q}_C(x_C) = q_c(x_C)$. In other words, these $q_c$ satisfy some (implicit) constraints.

What are these constraints?

### Visual Description
The slide continues the discussion on the computer science approach to outer relaxation. It presents a rewritten objective function involving a sum over cliques and a maximization over $\tilde{q}$. It explains that this approach reduces the number of variables needed to describe $q_c$ from $L^d$ to $K L^M$. However, it points out a new problem: the set $\{q_c(x_c)\}_c$ must satisfy implicit constraints to ensure consistency with an underlying distribution $\tilde{q}$. The slide ends with a question about these constraints.
---
## Page 49
### Content
The computer science approach:
outer relaxation

Objective can be rewritten as:
$$ \max_{\{q_c(x_c)\}_c} \left\{ \sum_C E_{q_c}[\Phi_c(x_c)] + \max_{\tilde{q}:q_c(x_c)=q_c(x_c)} H(\tilde{q}) \right\} $$

Let's consider pairwise potentials, s.t. $|C| \le 2$. Some obvious constraints:
$$ \sum_{x_i} q_i(x_i) = 1, \quad q_i(x_i) \ge 0, \forall x_i $$
$$ \sum_{x_i} q_{i,j}(x_i, x_j) = q_j(x_j), \quad q_{i,j}(x_i, x_j) \ge 0, \forall x_i, x_j $$

The polytope described by these (in)equalities is called the **local polytope**.

Is this all of them?
Must there be a distribution $\tilde{q}$, s.t. $q_{ij} = \tilde{q}_{ij}, q_i = \tilde{q}_i$?
### Visual Description
Slide introduces the computer science approach to outer relaxation, showing a mathematical objective function and a set of constraints for pairwise potentials. It defines the 'local polytope' and poses two questions.
---

## Page 50
### Content
Exactness on trees

We are optimizing:
$$ \max_{\{q_{ij}(x_{ij})\}\in L} \left\{ \sum_{i \sim j} E_{q_{ij}}[\Phi_{ij}(x_{ij})] + H(\tilde{q}(x_{root})) + \sum_i H(q(x_i|x_{parent(i)})) \right\} \quad ...(1) $$

And trying to show it is equal to:
$$ \max_{\{q_{ij}(x_{ij})\}\in M} \left\{ \sum_{i \sim j} E_{q_{ij}}[\Phi_{ij}(x_{ij})] + \max_{\tilde{q}:q_{ij}(x_c)=q_{ij}(x_c)} H(\tilde{q}) \right\} \quad ...(2) $$

Since $M \subseteq L$ and Claim: $(1) \ge (2)$. How to prove $(1) \le (2)$?
Strategy: Given the best solution to (1), produce a feasible solution to (2), that has the same value as (1). (Hence, $(1) \le (2)$).

How to do this?
(1) We will produce a **distribution** $q$, whose pairwise marginals match $q_{ij}$.
(2) Moreover, the entropy of $q$ satisfies $H(q) = \max_{\tilde{q}:q_{ij}(x_c)=q_{ij}(x_c)} H(\tilde{q})$.
### Visual Description
Slide presents two complex optimization problems, labeled (1) and (2), related to exactness on trees. It outlines a strategy to prove an inequality between them and describes two steps for how to achieve this.
---

## Page 51
### Content
Rewriting the entropy

Claim: If the graph is a **tree**, the entropy $H(q)$ can be written as follows:
$$ H(q) = \sum_{i \sim j} H(q_{ij}) - \sum_i (d_i - 1)H(q_i) $$

Interpretation: every “edge” entropy is added once. Each "node" is "counted" for every edge it participates in, so we should "subtract" the extra $(d_i - 1)$ times it's counted.

Benefit of rewrite: the above expression is well-defined for any graph. (Whether it is a tree or not.)

$H_{Bethe}(q) := \sum_{i \sim j} H(q_{ij}) - \sum_i (d_i - 1)H(q_i)$ is called the **Bethe entropy**, after the physicist Hans Bethe.
### Visual Description
Slide explains how to rewrite entropy for a tree structure, providing a formula and an interpretation. It highlights the benefit of this rewrite and defines the Bethe entropy, accompanied by a portrait of Hans Bethe.
---

## Page 52
### Content
The Bethe relaxation

Regardless if the graph is a tree or not, we can write down the following relaxation to the variational principle for the log partition function:
$$ \max_{\{q_{ij}(x_{ij})\}\in M} \left\{ \sum_{i \sim j} E_{q_{ij}}[\Phi_{ij}(x_{ij})] + H_{Bethe}(\tilde{q}) \right\} $$

The above quantity is also called the **Bethe free energy**.

It is not guaranteed to be either a lower or upper bound of log Z:
$H_{Bethe}(q)$ can be both less and more than log Z.

It is generally not going to equal the entropy.
It is generally not going to be concave.
### Visual Description
Slide introduces the Bethe relaxation, presenting a maximization formula for the Bethe free energy. It discusses the properties of this quantity, noting it's not guaranteed to be a bound for log Z, nor equal to entropy, nor concave.
---

## Page 53
### Content
Can we try to solve it despite non-concavity?

$$ \exp(-\lambda_{ji}(x_i)) \propto \sum_{x_j} \exp\left(-\sum_{k \sim j, k \ne i} \lambda_{kj}(x_j) + \Phi_{ij}(x_i, x_j)\right) $$
$$ m_{j \to i}(x_i) = \sum_{x_j} \exp(\Phi_{ij}(x_i, x_j)) \prod_{k \in N(j) \setminus i} m_{k \to j}(x_j) $$

Set $m_{j \to i}(x_i) = \exp(-\lambda_{ji}(x_i))$

Formal connection between running belief propagation on graphs with loops and Bethe relaxation:

Stationary point of the Lagrangian formulation of Bethe relaxation are in **one-to-one correspondence** with fixed points of the belief propagation updates.
(By mapping $m_{j \to i}(x_i)$ to $\exp(-\lambda_{ji}(x_i))$)

Gives us license to run loopy belief propagation: it would correspond to trying to find stationary points of Bethe relaxation.
### Visual Description
Slide explores solving the Bethe relaxation despite non-concavity, showing two mathematical equations related to belief propagation. It establishes a formal connection between belief propagation on graphs with loops and Bethe relaxation, stating that their stationary points are in one-to-one correspondence.
---

## Page 54
### Content
Variational methods for approximating posteriors

Gibbs variational principle: Let $p(z, x)$ be a joint distribution over latent variables and observables. Then,
$$ p(z|x) = \operatorname{argmax}_{q(z|x):\text{distribution over Z}} \left\{ H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] \right\} $$

Furthermore, for every $q(z|x)$, we have
$$ \log p(x) = KL(q(z|x)||p(z|x)) + H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] $$
$$ = \max_{q(z|x):\text{distribution over Z}} \left\{ H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] \right\} $$
### Visual Description
Text-only slide.
---

## Page 55
### Content
Variational methods for approximating posteriors

Gibbs variational principle: Let $p(z, x)$ be a joint distribution over latent variables and observables. Then,
$$ p(z|x) = \operatorname{argmax}_{q(z|x):\text{distribution over Z}} \left\{ H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] \right\} $$

In fact, for every $q(z|x)$, we have
$$ \log p(x) = KL(q(z|x)||p(z|x)) + H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] $$
$$ = \max_{q(z|x):\text{distribution over Z}} \left\{ H(q(z|x)) + E_{z \sim q(z|x)}[\log p(z,x)] \right\} $$

[Visual representation of the relationship between $\log p(x)$, $KL(q||p)$, and $H(q(z|x)) + E_{z \sim q}[\log p(z,x)]$ is shown with vertical arrows and horizontal lines.]
### Visual Description
Slide reiterates the Gibbs variational principle and related equations for approximating posteriors. It includes a diagram illustrating the relationship between $\log p(x)$, KL divergence, and the variational lower bound.
---

## Page 56
### Content
Expectation-maximization/variational inference

The canonical algorithm for learning a single-layer latent-variable Bayesian network is an iterative algorithm as follows.

Consider the max-likelihood objective, rewritten as in the previous slide:
$$ \max_{\theta \in \Theta} \max_{\{q_i(z|x_i) \in Q\}} \sum_{i=1}^n \left\{ H(q_i(z|x_i)) + E_{q_i(z|x_i)}[\log p_\theta(x_i, z)] \right\} $$

Algorithm maintains iterates $\theta^t$, $\{q_i^t(z|x_i)\}$, and updates them iteratively
(1) **Expectation (E)-step:**
    Keep $\theta^t$ fixed, set $q_i^{t+1}(z|x_i) \in Q$, s.t. they maximize the objective above.
(2) **Maximization (M)-step:**
    Keep $q_i^t(z|x_i)$ fixed, set $\theta^{t+1} \in \Theta$ s.t. it maximizes the objective above.

Clearly, every step cannot make the objective worse!
Does *not* mean it converges to global optimum – could, e.g. get stuck in a local minimum.
### Visual Description
Slide describes the Expectation-Maximization (EM) algorithm for learning Bayesian networks, presenting the max-likelihood objective function. It details the iterative E-step and M-step, and concludes with a note on convergence properties (guaranteed improvement per step but not necessarily global optimum).
---
## Page 57
### Content
Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
Deterministic approximate inference: variational inference.
Deep generative models: VAEs, RBMs, EBMs, GANs
(see 10-417/617, 10-707).
### Visual Description
Text-only slide.
---
## Page 58
### Content
Variational autoencoders

Directed Bayesian network with Gaussian layers
$$p(\mathbf{x}|\theta) = \sum_{\mathbf{h}^1,...,\mathbf{h}^L} p(\mathbf{h}^L|\theta)p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta)\cdots p(\mathbf{x}|\mathbf{h}^1, \theta)$$
Each term may denote a complicated nonlinear relationship

Typically, directed layers are parametrized as:
$$p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta) = \mathcal{N}(\mu_\theta(\mathbf{h}^L), \Sigma_\theta(\mathbf{h}^L))$$
Gaussians, means/covariances functions (e.g. one-layer neural net) of previous layer and model parameters $\theta$.

Easy to sample!
### Visual Description
A blue box at the top contains the main formula for $p(\mathbf{x}|\theta)$. Below it, a diagram illustrates a "Generative Process" as a neural network with layers $h^3, h^2, h^1, x$ and weights $W^3, W^2, W^1$, showing conditional probabilities $P(h^3)$, $P(h^2|h^3)$, $P(h^1|h^2)$, $P(x|h^1)$. Text on the right explains the formula and the parameterization of directed layers.
---
## Page 59
### Content
Approximate posterior family

The posterior family is defined in terms of an analogous factorization:
$$q(\mathbf{h}|\mathbf{x}, \phi) = q(\mathbf{h}^1|\mathbf{x}, \phi)q(\mathbf{h}^2|\mathbf{h}^1, \phi) \dots q(\mathbf{h}^L|\mathbf{h}^{L-1}, \phi)$$
Each term may denote a complicated nonlinear relationship

Typically, directed layers are parametrized as:
$$q(\mathbf{h}^L|\mathbf{h}^{L-1}, \phi) = \mathcal{N}(\mu_\phi(\mathbf{h}^{L-1}), \Sigma_\phi(\mathbf{h}^{L-1}))$$
Means/covariances fns (e.g. one-layer neural net) of previous layer and parameters $\phi$.
### Visual Description
A blue box at the top contains the main formula for $q(\mathbf{h}|\mathbf{x}, \phi)$. Below it, a diagram illustrates an "Approximate Inference" process as a neural network with layers $x, h^1, h^2, h^3$ and weights $W^1, W^2, W^3$, showing conditional probabilities $P(x|h^1)$, $P(h^1|h^2)$, $P(h^2|h^3)$ for the generative process and $Q(h^1|x)$, $Q(h^2|h^1)$, $Q(h^3|h^2)$ for the inference process. Text on the right explains the formula and the parameterization of directed layers.
---
## Page 60
### Content
Training VAEs

Max-likelihood can be written variationally as:
$$\max_\theta \max_\phi \sum_x \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$$
We want to be able to take gradients in $\theta, \phi$.

The main problem: the expectation is with respect to $q_\phi(\mathbf{h}|\mathbf{x})$, which depends on the variables we are taking a derivative with respect to.

Derivatives wrt $\theta$ are easy: a derivative of the type $\nabla_\theta \mathbb{E}_{\mathbf{h} \sim q} f_\theta(\mathbf{h})$ is easy to approximate if $q$ does not depend on $\theta$:
$$\nabla_\theta \mathbb{E}_{\mathbf{h} \sim q} f_\theta(\mathbf{h}) = \mathbb{E}_{\mathbf{h} \sim q} \nabla_\theta f_\theta(\mathbf{h})$$
Exchange only works if $q$ doesn't dep on $\theta$
$$\approx \frac{1}{N} \sum_i \nabla_\theta f_\theta(\mathbf{h}_i)$$
iid samples from $q$
### Visual Description
A blue box at the top contains the max-likelihood variational formula. The rest of the slide is text explaining the challenges of taking gradients and showing a formula for $\nabla_\theta \mathbb{E}_{\mathbf{h} \sim q} f_\theta(\mathbf{h})$ and its Monte Carlo approximation, with arrows pointing to parts of the formula.
---
## Page 61
### Content
REINFORCE estimator

Max-likelihood can be written variationally as:
$$\max_\theta \max_\phi \sum_x \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$$
REINFORCE/score-based estimator:
$$\nabla_\phi \mathbb{E}_{\mathbf{h} \sim q_\phi} f_\phi(\mathbf{x}) = \mathbb{E}_{\mathbf{h} \sim q_\phi} \nabla_\phi f_\phi(\mathbf{h}) + \mathbb{E}_{\mathbf{h} \sim q_\phi} [f_\phi(\mathbf{h})\nabla_\phi \log q_\phi(\mathbf{h})]$$
Evaluating the second term is easy:
Drawing samples from $q_\phi$ is easy, as is evaluating $f_\phi(\mathbf{h})$, $\nabla_\phi \log q_\phi$
(log-density of Gaussian is just a quadratic)
### Visual Description
A blue box at the top contains the max-likelihood variational formula. Another blue box contains the REINFORCE/score-based estimator formula. The rest of the slide is text explaining the ease of evaluating the second term.
---
## Page 62
### Content
Using REINFORCE for BBVI

Strictly speaking, nothing special about VAEs.
Black-Box Variational Inference (BBVI): want to not have to rederive CAVI-style updates every time we have to do it for a new model.

Suppose we have any probabilistic model, parametrized s.t.
(1) $\log p_\theta(\mathbf{x}, \mathbf{h})$ and $\log q_\theta(\mathbf{h}|\mathbf{x})$ can be easily evaluated, as well as the gradients $\nabla_\theta \log q_\theta(\mathbf{h}|\mathbf{x})$.
(2) Suppose that samples from $q_\theta(\mathbf{h}|\mathbf{x})$ can be drawn.

Using previous strategy, can do (Monte-Carlo) approximation of variational version of maximum likelihood.
### Visual Description
A blue box contains two conditions for a probabilistic model. The rest of the slide is text explaining Black-Box Variational Inference and its general applicability.
---
## Page 63
### Content
Reparametrization trick

Max-likelihood can be written variationally as:
$$\max_\theta \max_\phi \sum_x \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$$
As usual: we need to be able to take gradients in $\theta$

Another Monte Carlo estimator: write the expectation $\mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$ as an expectation over a distribution not dependent on $\phi$.

Kingma-Welling '13: reparametrization trick!
Main idea: a sample from $\mathbf{y} \sim \mathcal{N}(\mu, \Sigma)$ can be generated as follows
Sample $\mathbf{x} \sim \mathcal{N}(0, \mathbf{I})$.
Output $\mathbf{y} = \mu + \Sigma^{1/2}\mathbf{x}$.
### Visual Description
A blue box at the top contains the max-likelihood variational formula. Another blue box describes an alternative Monte Carlo estimator. A third blue box explains the reparametrization trick for sampling from a Gaussian distribution.
---
## Page 64
### Content
Using the reparametrization trick

Max-likelihood can be written variationally as:
$$\max_\theta \max_\phi \sum_x \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$$
We can hence write the gradient wrt to $\theta$:
$$\nabla_\phi \mathbb{E}_{q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})} = \mathbb{E}_{\epsilon_1,\epsilon_2,...,\epsilon_L} \nabla_\phi \log \frac{p_\theta(\mathbf{x}, \mathbf{h}(\epsilon, \mathbf{x}, \phi))}{q_\phi(\mathbf{h}(\epsilon, \mathbf{x}, \phi)|\mathbf{x})}$$
$$= \mathbb{E}_{\epsilon_1,\epsilon_2,...,\epsilon_L} \nabla_\phi \log \frac{p_\theta(\mathbf{x}, \mathbf{h}(\epsilon, \mathbf{x}, \phi))}{q_\phi(\mathbf{h}(\epsilon, \mathbf{x}, \phi)|\mathbf{x})}$$
By chain rule:
$$\nabla_\phi \log \frac{p_\theta(\mathbf{x}, \mathbf{h}(\epsilon, \mathbf{x}, \phi))}{q_\phi(\mathbf{h}(\epsilon, \mathbf{x}, \phi)|\mathbf{x})} = \nabla_\mathbf{h} \log \frac{p_\theta(\mathbf{x}, \mathbf{h}(\phi, \epsilon, \mathbf{x}))}{q_\phi(\mathbf{h}(\phi, \epsilon, \mathbf{x})|\mathbf{x})} \nabla_\phi \mathbf{h}(\phi, \epsilon, \mathbf{x})$$
### Visual Description
A blue box at the top contains the max-likelihood variational formula. The rest of the slide shows mathematical derivations for the gradient using the reparametrization trick and the chain rule.
---
## Page 65
### Content
Using reparametrization trick for BBVI
Strictly speaking, nothing special about VAEs.
**Black-Box Variational Inference (BBVI):** want to not have to rederive CAVI-style updates every time we have to do it for a new model.

(1) Suppose to draw samples from $q_\phi(h|x)$, we can sample $\epsilon \sim s(\epsilon)$, then output $h = h(\phi, \epsilon, x)$
(2) Suppose the gradients $\nabla_h \log q_\phi(h|x)$, $\nabla_h \log p_\theta(x, h)$ and $\nabla_\phi h(\phi, \epsilon, x)$ can be evaluated.

Using previous strategy, can do (Monte-Carlo) approximation of variational version of maximum likelihood.
### Visual Description
The page title is "Using reparametrization trick for BBVI". Below the title, there is an introductory sentence and a definition of Black-Box Variational Inference (BBVI). A light blue rounded rectangle contains two numbered conditions for drawing samples and evaluating gradients. At the bottom, there is a concluding sentence about Monte-Carlo approximation.
---
## Page 66
### Content
The GAN paradigm (Goodfellow et al. ‘14)
Game theoretic idea:
Generator trained to fool discriminator.
Discriminator trained to beat generator.
### Visual Description
The page title is "The GAN paradigm (Goodfellow et al. ‘14)". On the left, a diagram illustrates the GAN architecture: a "Discriminator" receives input from either "Real or generated?" sources (represented by a person's photo) or a "Generator". The "Generator" takes "White noise" as input and produces images. Below the diagram, there are images of the Mona Lisa (representing real data) and a cartoon artist painting the Mona Lisa (representing generated data). On the right, bullet points describe the "Game theoretic idea" of GANs, stating that the Generator is trained to fool the Discriminator, and the Discriminator is trained to beat the Generator.
---
## Page 67
### Content
DC-GAN formalization (Goodfellow et al. '14)
Min-max problem:
*   **Min-player:** generators $g \in G$; **Max-player:** discriminators $f \in F, f(x) \in [0,1]$.
*   Samples from image distr. $P_{real}$. Unif. distribution over samples: $P_{samples}$
*   $P_g$ - generator distribution: $Z \sim N(0,I) \rightarrow g(Z)$

Training loss:
$$ \min_{g \in G} \max_{f \in F} \mathbb{E}_{x \sim p_{samples}} \log f(x) + \mathbb{E}_{x \sim p_g} \log(1 - f(x)) $$

$f$ tries to output "1" for samples from $P_{samples}$, "0" for samples from $P_g$
$f$ can be interpreted as a probabilistic classifier, penalized w/ logistic loss.
### Visual Description
The page title is "DC-GAN formalization (Goodfellow et al. '14)". Below the title, the "Min-max problem" is described with bullet points defining the min-player (generators), max-player (discriminators), sample distributions ($P_{real}$, $P_{samples}$), and generator distribution ($P_g$). A large light green rounded rectangle contains the mathematical expression for the "Training loss". Below this, a light orange rounded rectangle explains how $f$ (the discriminator) tries to classify samples and its interpretation as a probabilistic classifier. On the right side, two cartoon panda images are displayed.
---
## Page 68
### Content
DC-GAN formalization (Goodfellow et al. '14)
Plugging in this expression for the inner maximization:
$$ \min_{g \in G} \mathbb{E}_{x \sim p_{samples}} \log \frac{p_{samples}(x)}{p_{samples}(x) + p_g(x)} + \mathbb{E}_{x \sim p_g} \log \frac{p_g(x)}{p_{samples}(x) + p_g(x)} $$

Remember the Jensen Shannon divergence JS(P,Q):
$$ JS(P, Q) := \frac{1}{2} \left( KL\left(P, \frac{P+Q}{2}\right) + KL\left(Q, \frac{P+Q}{2}\right) \right) $$

Training loss:
$$ \min_{g \in G} 2 JS(P_g, P_{samples}) - \log 4 $$
### Visual Description
The page title is "DC-GAN formalization (Goodfellow et al. '14)". A light orange rounded rectangle contains a mathematical expression for the min-max problem after plugging in the inner maximization. Below this, the Jensen Shannon divergence formula $JS(P,Q)$ is presented. At the bottom, a light green rounded rectangle shows the simplified "Training loss" expression in terms of Jensen Shannon divergence.
---
## Page 69
### Content
W-GAN formalization (Arjovsky et al. '17)
Min-max problem:
*   **Min-player:** generators $g \in G$; **Max-player:** discriminators $f \in F$.
*   Samples from image distr. $P_{real}$. Unif. distribution over samples: $P_{samples}$
*   $P_g$ - generator distribution: $Z \sim N(0,I) \rightarrow g(Z)$

Training loss:
$$ \min_{g \in G} \max_{f \in F} \left| \mathbb{E}_{P_g}[f] - \mathbb{E}_{P_{samples}}[f] \right| $$
$$ d_F(P_{samples}, P_g) $$

Discriminators $F$ beat generators if for all $g \in G$, there is an $f \in F$ such that $\mathbb{E}_{P_g}[f] \neq \mathbb{E}_{P_{samples}}[f]$

Training loss = $\min_{g \in G} d_F(P_g, P_{samples})$
### Visual Description
The page title is "W-GAN formalization (Arjovsky et al. '17)". Below the title, the "Min-max problem" is defined with bullet points for min-player, max-player, sample distributions, and generator distribution, similar to the DC-GAN slide. A large light green rounded rectangle contains the mathematical expression for the "Training loss" involving the absolute difference of expectations. Below this, the notation $d_F(P_{samples}, P_g)$ is shown. To the right, a light orange rounded rectangle explains the condition for discriminators to "beat" generators. At the bottom, another light green rounded rectangle presents the final "Training loss" as the minimum of $d_F(P_g, P_{samples})$.
---
## Page 70
### Content
What affects our choice of F?
**Statistical considerations:** very powerful discriminators (e.g. large neural networks) will require a lot of samples. Weak discriminators will specify a very weak metric: very "different" distributions will look very "similar" to metric.

**Algorithmic considerations:** if discriminators are very powerful, gradient information for generator is too weak and can vanish. If they are too weak – metric is weak.
### Visual Description
Text-only slide.
---
## Page 71
### Content
Tension: strength of discriminators
**Small discriminators $\Rightarrow$ mode collapse:**
Generator w/ support size $\approx m$ fools neural net discriminators with $\le m$ parameters.
[Arora et al'17]

**Large discriminators $\Rightarrow$ poor generalization:**
Loss with small # samples differs a lot from loss with infinite # samples.

$d_F(P_{samples}, P_g) \approx d_F(P_{real}, P_g)$
### Visual Description
The page title is "Tension: strength of discriminators". Two main points are presented in light green rounded rectangles. The first point, "Small discriminators $\Rightarrow$ mode collapse", includes an explanation and a reference. The second point, "Large discriminators $\Rightarrow$ poor generalization", also includes an explanation. Below these, a light blue rounded rectangle contains a mathematical approximation relating $d_F(P_{samples}, P_g)$ and $d_F(P_{real}, P_g)$.
---
## Page 72
### Content
How to train a GAN
"**Best response dynamics**": fix generator, find best discriminator; then fix discriminator, find best generator. Repeat.

**Better in practice:** take one gradient step for generator, do a few gradient steps for discriminator. Repeat.

Going with intuition of Wasserstein distance: we'd like the discriminators to be somewhat Lipschitz - **clipping weights** is a good idea.
### Visual Description
Text-only slide.
---
## Page 73
### Content
Common training problems

**Unstable training:** the problem is a min-max problem (also called saddle point problem) – typically optimization is much less stable than pure minimization.

**Vanishing gradient:** if the discriminator is too good, the generator gradients have a propensity to be small. (This is concerning, as to be taking gradients of the Wasserstein/JS/... objective, the discriminator needs to be optimal.)
Less of a problem with more modern GANs than with DC-GAN.

**Mode collapse:** the training only recovers some of the modes of the underlying distribution. (NOT clear if this is a statistical or algorithmic problem.)

Step 0
Step 5k
Step 10k
Step 15k
Step 20k
Step 25k
Target
### Visual Description
The slide presents a title "Common training problems" followed by definitions of "Unstable training", "Vanishing gradient", and "Mode collapse". Below the text, there is a series of seven small, square heatmaps arranged horizontally. The first six heatmaps show a single, concentrated blob of color, gradually shifting and becoming slightly more diffuse from "Step 0" to "Step 25k". The seventh heatmap, labeled "Target", shows a ring of distinct, smaller blobs, indicating a multi-modal distribution.
---

## Page 74
### Content
Diagnosing small support size: bday paradox

**Birthday Paradox:**
If there are 23 people in a group, $> \frac{1}{2}$ chance that two of them share a birthday.

**General version:** Suppose a distribution is uniform over $N$ images. Then
Pr[sample of size $\sqrt{N}$ has a duplicate image] $> \frac{1}{2}$.

**Birthday paradox test\* [Arora et al ICLR'18]**: If a sample of size $s$ has duplicate images with prob. $> \frac{1}{2}$, then distribution essentially\* has only $s^2$ distinct images.

**Implementation:** Draw sample of size $s$; heuristically flag possible near-duplicates. Use human in the loop to verify duplicates.
### Visual Description
The slide features a title "Diagnosing small support size: bday paradox". On the left, there is an image of a cupcake with several lit birthday candles. On the right, there are two text boxes. The top box defines the "Birthday Paradox" with the 23 people example. The bottom box provides a "General version" of the paradox involving a distribution over $N$ images. Below these boxes, a larger blue-shaded box presents the "Birthday paradox test" by Arora et al. (ICLR'18). The bottom of the slide describes the "Implementation" of this test.
---

## Page 75
### Content
Interpolation

If linearly interpolating in latent space gives rise to meaningful images (without sharp transitions), unlikely GAN is just memorizing.

Figure from
Radford, Metz, Chintala '16.

Figure 4: Top rows: Interpolation between a series of 9 random points in Z show that the space learned has smooth transitions, with every image in the space plausibly looking like a bedroom. In the 6th row, you see a room without a window slowly transforming into a room with a giant window. In the 10th row, you see what appears to be a TV slowly being transformed into a window.
### Visual Description
The slide is titled "Interpolation". The majority of the slide is occupied by a large grid of generated images, specifically bedrooms. Each row in the grid shows a smooth interpolation between different bedroom scenes, demonstrating gradual changes in features like furniture, lighting, and room structure. For example, one row shows a room transforming from having no window to a large window, and another shows a TV appearing. To the right of this image grid, there is a text block explaining that meaningful images from linear interpolation suggest the GAN is not memorizing, followed by a citation "Figure from Radford, Metz, Chintala '16." A detailed caption for "Figure 4" is provided at the bottom of the slide.
---

## Page 76
### Content
Inception score

Suppose we use trained network – the *Inception* architecture as a **labeler** for images. Inception gives probability over labels y for sample x: $p(y|x)$.

**Desirable features of generator:** the Inception classifier should be "sure" about the label for most images ($p(y|x)$ should have low entropy), and the classes it generates should be diverse ($p(y) = E_{x \sim P_g} p(y|x)$ should have high entropy)

Thus, we want $H(p(y|x))$ to be low, $H(p(y))$ is high.

Consider the expression: $E_{x \sim p_g} KL(p(y|x)||p(y))$

**Inception score:** $\exp(E_{x \sim P_g} KL(p(y|x)||p(y)))$
### Visual Description
Text-only slide. The slide is titled "Inception score" and explains the concept of using the Inception architecture as a labeler for images. It describes desirable features for a generator in terms of entropy of $p(y|x)$ and $p(y)$. Key statements are highlighted in blue boxes: "Thus, we want $H(p(y|x))$ to be low, $H(p(y))$ is high." and the final definition of the "Inception score" as an exponential of an expected Kullback-Leibler divergence.
---

## Page 77
### Content
Conditional GANS (Mirza-Osindero '14)

Discriminator and generator receive an image as well as a class label. The loss is then:

$\min_{G} \max_{D} V(D, G) = E_{x \sim P_{data}(x)} [\log D(x|y)] + E_{z \sim p_z(z)} [\log(1-D(G(z|y)))]$

0100000000
00000000000000000000
11111111111111111111
22222222222222222222
32333333333333333333
44444444444444444444
55555555555555555555
66666666666666666666
77777777777777777777
88888888888888888888
99999999999999999999
### Visual Description
The slide is titled "Conditional GANS (Mirza-Osindero '14)". On the left, there is a flowchart diagram illustrating the architecture of a Conditional GAN. It shows `Xreal (data)` and `Xfake` feeding into `D` (Discriminator), and `C (class)` and `Z (noise)` feeding into `G` (Generator) to produce `Xfake`. The `D` also takes `real` and `fake` labels. On the right, the text explains that the discriminator and generator receive an image and a class label, followed by the mathematical expression for the min-max loss function. Below the loss function, there is a one-hot encoding vector `0100000000` and a large grid of handwritten digits, where each row consists of multiple instances of the same digit (0 through 9), demonstrating class-conditional generation.
---

## Page 78
### Content
Auxillary classifier GANs (Odena et al '16)

**Idea:** give discriminator only image, and ask it to both predict label, and tell real/fake.

Let us define the "distinguishing" loss and the class prediction loss:
$L_S = E[\log P(S = \text{real} | X_{\text{real}})] + E[\log P(S = \text{fake} | X_{\text{fake}})]$
$L_C = E[\log P(C = c | X_{\text{real}})] + E[\log P(C = c | X_{\text{fake}})]$

Discriminator is trained to maximize $L_S + L_C$
Generator is trained to maximize $L_C - L_S$

(i.e. discriminator tries to both distinguish and predict label; generator tries to fool discriminator and generate "classifiable" images)

**Main benefit:** class-independent latent embedding; stabler training
### Visual Description
The slide is titled "Auxillary classifier GANs (Odena et al '16)". On the left, there is a flowchart diagram of the AC-GAN architecture. It shows `Xreal (data)` and `Xfake` feeding into `D` (Discriminator). `D` has two outputs: one for `real/fake` classification (labeled `real` and `fake` with `c=1`, `c=2` indicating classes) and another for `C (class)` prediction. `C (class)` and `Z (noise)` feed into `G` (Generator) to produce `Xfake`. On the right, the text explains the idea behind AC-GANs, defines the "distinguishing" loss ($L_S$) and "class prediction" loss ($L_C$), and describes how the Discriminator and Generator are trained using these losses. A parenthetical explanation clarifies the training objectives, and the "Main benefit" is listed at the bottom.
---

## Page 79
### Content
Superresolution from a single image
(Ledig et al '17)

Combines L2 loss on VGG-19 features with adversarial loss:

$I^{SR}_{VGG/i,j} = \frac{1}{W_{i,j} H_{i,j}} \sum_{x=1}^{W_{i,j}} \sum_{y=1}^{H_{i,j}} (\phi_{i,j}(I^{HR})_{x,y} - \phi_{i,j}(G_{\theta_G}(I^{LR}))_{x,y})^2$

$\phi_{i,j}$ The feature map for the j-th convolution (after activation) before the i-th maxpooling layer.

$\min_{\theta_G} \max_{\theta_D} E_{I^{HR} \sim P_{train}(I^{HR})} [\log D_{\theta_D}(I^{HR})] + E_{I^{LR} \sim P_G(I^{LR})} [\log(1 - D_{\theta_D}(G_{\theta_G}(I^{LR})))]$

Figure 2: From left to right: bicubic interpolation, deep residual network optimized for MSE, deep residual generative adversarial network optimized for a loss more sensitive to human perception, original HR image. Corresponding PSNR and SSIM are shown in brackets. [4× upscaling]
### Visual Description
The slide is titled "Superresolution from a single image (Ledig et al '17)". It describes combining L2 loss on VGG-19 features with adversarial loss, presenting two mathematical formulas: one for the $I^{SR}_{VGG/i,j}$ (L2 loss) and another for the min-max adversarial loss. Below the formulas, there are four images arranged horizontally, demonstrating different superresolution techniques applied to a person's face. From left to right, the images are labeled "bicubic", "SRResNet", "SRGAN", and "original". Each image label includes PSNR and SSIM values in brackets. The "bicubic" image appears blurriest, "SRResNet" is sharper, "SRGAN" is sharper still with more detail, and "original" is the clearest. A detailed caption for "Figure 2" is provided at the bottom of the slide.
---

## Page 80
### Content
Image-to-image translation
(Pix2Pix, Isola et al '17)

**Loss:** generator tries to "translate"; discriminator tries to distinguish whether it's a "real" translation or "fake" translation.

$\arg \min_{G} \max_{D} E_{x,y}[ \log D(\mathbf{x}, G(\mathbf{x})) + \log(1 - D(\mathbf{x},\mathbf{y})) ]$
### Visual Description
The slide is titled "Image-to-image translation (Pix2Pix, Isola et al '17)". Below the title, there's a description of the loss function's objective for both the generator and discriminator. The main part of the slide is a diagram illustrating the Pix2Pix architecture. On the left, an input image `x` (an outline of a shoe) is fed into `G` (Generator) to produce `G(x)` (a generated colored shoe). `x` and `G(x)` are then fed into `D` (Discriminator) as a "fake" pair. On the right, a real image `y` (a colored shoe) is paired with `x` and fed into `D` as a "real" pair. The diagram visually represents the flow of data and the roles of G and D. Below the diagram, the mathematical expression for the adversarial loss function is provided.
---
## Page 81
### Content
Unpaired image-to-image translation
(CycleGAN, Zhu et al '17)

Major problem with prior approach: we need paired samples.
(How do you "translate" a photograph to the style of Van Gogh?
No "paired" up photos...)
### Visual Description
A grid of images demonstrating unpaired image-to-image translation. The top row shows three pairs of images: "Monet ↔ Photos" (Monet paintings and real photos), "Zebras ↔ Horses" (zebras and horses), and "Summer ↔ Winter" (summer and winter landscapes). Each pair shows a translation in both directions (e.g., Monet → photo and photo → Monet). The bottom row shows a single photograph being translated into the styles of Monet, Van Gogh, Cezanne, and Ukiyo-e.
---
## Page 82
### Content
Unpaired image-to-image translation
(CycleGAN, Zhu et al '17)

Main idea:
Train two generators $F, G$, s.t.
$F$ translates from domain X to domain Y,
$G$ translates from domain Y to domain X.

Discriminators $D_X, D_Y$ trying to
recognize domains X, Y.

Requirement: $F(G(x)) \approx x, G(F(X)) \approx x$
### Visual Description
A diagram illustrating the CycleGAN architecture. Two domains, X and Y, are represented by stacks of images (e.g., horses for X, zebras for Y). A generator F translates from X to Y, and a generator G translates from Y to X. Arrows show the translation process and a cycle consistency loop (X → Y → X and Y → X → Y). Discriminators $D_X$ and $D_Y$ are shown attempting to distinguish real images from generated images within their respective domains.
---
## Page 83
### Content
Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
Deterministic approximate inference: variational inference.
Deep generative models: VAEs, RBMs, EBMs, GANs
(see 10-417/617, 10-707).
Beyond likelihood: score-matching, NCE, GANs.
### Visual Description
Text-only slide.
---
## Page 84
### Content
Score matching

Can we avoid calculating $\nabla_\theta \log Z_\theta$ at every step?

Idea: we will be fitting instead
$$ \min_\theta E_{p_{data}} ||\nabla_x \log p_\theta (x) - \nabla_x \log p_{data} (x)||^2 $$

The function $\nabla_x \log p_{data} (x): \mathbb{R}^d \to \mathbb{R}^d$ is called the score function.
### Visual Description
A plot showing a vector field (score function) overlaid on contours (density function) of a mixture of two Gaussians. The vector field arrows indicate the direction of the gradient, and the contours show the probability density. The figure is sourced from a blog post by Yang Song.
---
## Page 85
### Content
Score matching

So, the loss can be equivalently written as:
$$ E_{p_{data}} ||\nabla_x \log p_\theta(x)||^2 + 2 E_{p_{data}} [\text{Tr}(\nabla_x^2 \log p_\theta(x))] $$

So, instead of parametrizing $\log p_\theta (x)$ we parametrize $\nabla_x \log p_\theta (x)$,
for example as a neural network $s_\theta(x)$.

The training loss then becomes:
$$ \frac{1}{N} \sum_{\text{training data } x_i} || s_\theta(x_i) ||^2 + 2 [\text{Tr}(D s_\theta(x_i))] $$
An arrow points from $D s_\theta(x_i)$ to the text "Jacobian of $s_\theta$".
### Visual Description
Text-only slide with mathematical equations.
---
## Page 86
### Content
How to sample?

So, the loss can be equivalently written as:
$$ \frac{1}{N} \sum_{\text{training data } x_i} || s_\theta(x_i)||² + 2 [\text{tr}(D s_\theta(x_i))] $$

How do we draw samples?!
Unfortunately, still need to run a Markov Chain (albeit only for inference).

Remember Langevin?
$x_{t+1} = x_t + \eta s_\theta(x) + \sqrt{2\eta}\xi_k$
$\xi_k \sim N(0,I)$
(The term $\eta s_\theta(x)$ is labeled "Gradient descent" and $\sqrt{2\eta}\xi_k$ is labeled "Gaussian noise")

Stationary (equilibrium) distr.
$p(x) = p_\theta(x)$

Since $s_\theta(x) = \nabla_x \log p_\theta(x)$, hence we
are running Langevin with energy
function $E_\theta(x) = \nabla_x \log p_\theta(x)$.
### Visual Description
Text-only slide with mathematical equations and boxed content explaining Langevin dynamics and its relation to the score function.
---
## Page 87
### Content
Practical issues

When applying this to complex data (e.g. images), there are several
obstacles to be overcome:

1. Poor estimates of gradients in data-poor regions

Want: $E_{p_{data}}||s_\theta(x) – \nabla_x \log p_{data} (x)||^2 \approx \frac{1}{N} \sum_i ||s_\theta (x_i) - \nabla_x \log p_{data} (x_i)||^2$

Intuitively, if $p_{data}$ doesn't put mass, no incentive for $s_\theta (x)$ to fit $\nabla_x \log p_{data} (x)$
This can bias Langevin into bad regions.
### Visual Description
Three side-by-side plots illustrating the issue of poor gradient estimates in data-poor regions.
1.  **Data density:** A heatmap showing a single, concentrated orange blob representing high data density.
2.  **Data scores:** A vector field with arrows. Regions near the data density blob are marked "Accurate," while regions further away are marked "Inaccurate."
3.  **Estimated scores:** A similar vector field, but the "Inaccurate" regions are larger, indicating that the estimated scores are less accurate in areas where data is sparse.
A caption states: "Estimated scores are only accurate in high density regions." The figure is sourced from a blog post by Yang Song.
---
## Page 88
### Content
Practical issues

When applying this to complex data (e.g. images), there are several
obstacles to be overcome:

2. Drawing samples still requires running Langevin

Langevin can take a long time to mix, when needing
to transition between different modes.

(Bovier '02,'04) $\Rightarrow$
time to get from A to B
(through C) can be
exponential!

Recall, peaks of p = valleys of $-s_\theta$
### Visual Description
A 3D surface plot showing two deep valleys labeled 'A' and 'B', separated by a higher ridge labeled 'C'. The y-axis is labeled '$-s_\theta(x)$'. An arrow indicates a path from valley A, over ridge C, to valley B. This visual demonstrates how Langevin dynamics can struggle to transition between distinct modes (valleys) when a high energy barrier (ridge) exists between them.
---
## Page 89
### Content
Denoising score matching
The fix due to Song-Ermon '20: **Annealing!**
We will fit several "smoothed" versions of $p_{data}$. Precisely, we will fit:
$p_{\sigma_i, data}(x) = p_{data}(x) * N(0, \sigma_i) = \int_{\delta} p_{data}(x - \delta) N(x; \delta, \sigma_i)d\delta$
for several "temperatures” $\sigma_1, \sigma_2, ..., \sigma_T$.

Figure by Stefano Ermon.
### Visual Description
A multi-panel figure illustrating the concept of denoising score matching with annealing. The top row shows "Data density" and "Data scores" (vector fields). The middle row shows "Perturbed density" (a smoothed version of the data density) and "Perturbed scores" (the corresponding vector field). The bottom row shows "Estimated scores" and "Estimated scores" where red encodes error. The panels progress from "Worse data quality!" (more perturbed/noisy) to "Better score estimation!" (less error in the estimated scores). The densities are represented by orange heatmaps, and scores by black vector fields.
---
## Page 90
### Content
Noise contrastive estimation
The setup: we setup a problem of distinguishing samples from $p_{data}$ and a "noise" distribution $q$, which is easy to draw samples from.
Given $N$ samples from $p_{data}$, generate $M := kN$ samples from $q$, train a classifier, that given one of these $N + M$ points, predicts whether the sample is from $p_{data}$ or $q$.
For concreteness, we will use logistic loss.
### Visual Description
Text-only slide.
---
## Page 91
### Content
Noise contrastive estimation
What does this have to do with partition functions?
When training, we need to parametrize the classifier D somehow.
Since $D(x) = \frac{p_{data}(x)}{p_{data}(x) + kq(x)}$ if we think $p_{data}(x)$ can be modeled as $p_{data}(x) \propto \exp(E_\theta(x))$, we can parametrize D as
$D_{\theta,c}(x) = \frac{1}{1 + k \exp(\log q(x) - (E_\theta(x) - \log Z_\theta(x)))}$
$:= r_k (\log q(x) - (E_\theta(x) - c))$
The main idea of NCE:
treat the partition function as an additional parameter!
### Visual Description
Text-only slide.
---
## Page 92
### Content
Noise contrastive estimation
Main Theorem of Noise Contrastive Estimation:
Consider parametrizing $D_{E,c}(x) := r_k (\log q(x) - (E(x) - c))$
The minimizer of
$L(D_{E,c}) = E_x \left[ \frac{p_{data}(x)}{p_{data}(x) + kq(x)} \log D_{E,c}(x) + \frac{kq(x)}{p_{data}(x) + kq(x)} \log(1 - D_{E,c}(x)) \right]$
is such that $p_{data}(x) = \exp(f(x)) = \exp(E(x) - c)$
Note this is a kind of "nonparametric” result: we are optimizing in the space of all functions (as opposed to fixing a parametric family for $E(x)$)
### Visual Description
Text-only slide.
---
## Page 93
### Content
Practical issues
Are all choices of $q$ created equal?
Not really. If $q$ is very far from $p_{data}$ classifier should have a really easy time of distinguishing $q$ from $p_{data}$. If $q = p_{data}$ we recover maximum likelihood!
Mathematically, the landscape is very flat around optimum D, say $D^*$.
Why is this a problem?
If we want to learn a $D \approx D^*$, we have to drive error very low.
This is sometimes called the density chasm problem.
(Rhodes et al '20).
Example of an extremely flat loss landscape on Gaussian mean estimation: starting from the noise Q (orange), the NCE loss (blue) flattens out quickly before reaching the ground truth distribution P* (green).
https://blog.ml.cmu.edu/2021/11/05/analyzing-and-improving-the-optimization-landscape-of-noise-contrastive-estimation/
### Visual Description
A 3D plot showing a loss landscape. The x and y axes range from approximately -20 to 10. The z-axis (loss) ranges from 0.0 to 4.0. The plot shows a broad, relatively flat blue surface with a small orange peak and a small green peak. The caption indicates that the NCE loss (blue) flattens out quickly before reaching the ground truth distribution P* (green), starting from the noise Q (orange).
---
## Page 94
### Content
Practical issues
Are all choices of $q$ created equal?
One "baseline" choice for $q$ is a Gaussian with matching mean and covariance to the data.
A popular fix for the difficulty of choosing a good $q$ is (again)... **annealing!**
TRE (Telescoping Density Ratio Estimation, Rhodes et al '20):
Choose "temperatures" $\sigma_1, \sigma_2, ..., \sigma_L$ and train distinguishers to distinguish $p_{\sigma_i, data}$ VS $p_{\sigma_{i+1}, data}$ for $i \in [L - 1]$.
As we saw with score matching, it's easy to draw samples $p_{\sigma_i, data}$ by sampling a $z \sim N(0, \sigma_i)$ and outputting $x + z$.
### Visual Description
Text-only slide.
---
## Page 95
### Content
Diffusion models
Combines several ideas we've seen so far: **score matching, annealing, variational inference.**
Basic idea: take continuous limits of annealing schedules. Leverage numerical techniques & solvers to deal with the resulting **stochastic differential equation.**
Note: This is a very recent and rapidly developing area. Most questions here are subject to ongoing research.
### Visual Description
Text-only slide.
---
## Page 96
### Content
From denoising score matching to SDEs
Nothing special here! We can take any (fixed, not trained) SDE to go from data to some noise distribution:
$dx = \mathbf{f}(\mathbf{x}, t)dt + g(t)d\mathbf{w}$
Figure from https://yang-song.github.io/blog/2021/score/
### Visual Description
A two-panel figure. The left panel shows a 2x2 grid of images, each depicting a room scene with varying levels of noise or pixelation. The right panel shows a heatmap-like plot with a "Stochastic process" label. The plot shows a density distribution evolving over time (horizontal axis), starting as a narrow, concentrated yellow region on the left and spreading out into a wider, more diffuse blue-purple region on the right.
---
## Page 97
### Content
Reversing the SDE

Under this view, "reversing" the SDE (i.e. finding some stochastic process that goes from noise to data) could be used to generate samples!

Figure from https://yang-song.github.io/blog/2021/score/
### Visual Description
The slide title is "Reversing the SDE". Below the text, there are two images side-by-side. The left image is a square of colorful static/noise. The right image shows a heatmap-like visualization of a "Reverse stochastic process" evolving from a noisy, diffuse state on the left to a more structured, concentrated state on the right, with a label "Reverse stochastic process" above it.
---
## Page 98
### Content
Reversing the SDE

Under this view, "reversing" the SDE (i.e. finding some stochastic process that goes from noise to data) could be used to generate samples!

How can we reverse the SDE (and what does this have to do with score functions...)?

Remarkable result (Anderson, '82): there exists a reversing SDE, and it has a very nice form:
$dx = [f(\mathbf{x}, t) – g^2(t)\nabla_x \log p_t(\mathbf{x})]dt + g(t)dw$

Score function!
### Visual Description
The slide title is "Reversing the SDE". Below the text, there is a mathematical equation for $dx$ enclosed in a rounded rectangle. An arrow points from the term $\nabla_x \log p_t(\mathbf{x})$ within the equation to the text "Score function!".
---
## Page 99
### Content
Reversing the SDE

Learning the score function: just use score matching!

$\underset{\theta}{\operatorname{argmin}} \sum_i \lambda(\sigma_i) \mathbb{E}_{\mathbf{x} \sim p_{\sigma_i, \text{data}}} ||s_{\theta}(\mathbf{x}, i) – \nabla_x \log p_{\sigma_i, \text{data}} (\mathbf{x})||^2$

$\mathbb{E}_{t \in U(0,T)}\mathbb{E}_{p_t(\mathbf{x})}[\lambda(t) ||\nabla_x \log p_t(\mathbf{x}) – s_{\theta}(\mathbf{x}, t)||^2]$

Trained exactly as before (use denoising score matching + sliced score matching to scale up).

The pro is that we don't need to tune the temperature schedule (though we do need to pick a forward SDE, $\lambda(T)$, etc).
### Visual Description
The slide title is "Reversing the SDE". Below the introductory text, there are two mathematical equations. The first is a minimization problem. An arrow points downwards from this equation to a second equation, which is enclosed in a rounded rectangle. The rest of the slide contains explanatory text.
---
## Page 100
### Content
Brief course overview

The basics: undirected and directed graphical models.
Exact inference: variable elimination, message passing, GNNs.
Randomized approximate inference: Markov Chain Monte Carlo.
Deterministic approximate inference: variational inference.
Deep generative models: VAEs, RBMs, EBMs, GANs
(see 10-417/617, 10-707).
Beyond likelihood: score-matching, NCE, GANs.
Causality: identifiability, estimating causal effects (see 80-816).
### Visual Description
Text-only slide.
---
## Page 101
### Content
Endowing directed graphs with causal meaning

We will make some changes to the "interpretation" of a directed graphical model to make it "causal".

*   **Edges connotate causal direction:** a node's parents are its direct causes.
*   **Structural causal equations:** we'll rewrite the conditional probability tables in terms of structural equations.
*   **Modularity and interventions:** we'll introduce language for "intervening" on nodes in the graph.
### Visual Description
The slide title is "Endowing directed graphs with causal meaning". To the left of the bulleted text, there is a directed acyclic graph (DAG) with seven nodes labeled $x_1$ through $x_7$. The graph shows the following directed edges: $x_1 \to x_2$, $x_1 \to x_3$, $x_2 \to x_4$, $x_3 \to x_4$, $x_3 \to x_5$, $x_4 \to x_6$, $x_4 \to x_7$, $x_5 \to x_7$.
---
## Page 102
### Content
Identification

A quantity is called "identifiable" if it can be recovered from observational data only.

This is desirable as we often can't "intervene" (e.g. ethical concerns in trials, expensive experiments to run, ...)

(We will get back to what is the "full" power of interventions.)

It's often the case that we can identify a quantity by "adjusting": that is, partitioning the estimate over "homogeneous" groups.
### Visual Description
The slide title is "Identification". Below the text, there is a horizontal flowchart diagram. It shows "Causal Estimand" leading to "Statistical Estimand" via an "Identification" step, and then "Statistical Estimand" leading to "Estimate" via an "Estimation" step.
---
## Page 103
### Content
Strategies for identifying causal effects

We will see several strategies for identifying causal effects

Backdoor criteria } "sufficient" for identification
Frontdoor criteria }

Do calculus $\longrightarrow$ "complete" for identification

Backdoor criteria largely deals with checking whether “non-causal paths" have been "blocked".

Frontdoor criteria largely deals with when we can ignore “unobserved confounders".

Do calculus is complete: for any effect that is *in principle* identifiable, the algorithm we will propose will be able to (eventually) identify it.
### Visual Description
Text-only slide.
---
## Page 104
### Content
Backdoor adjustment

A set of variables W satisfies the backdoor criterion relative to T and Y if the following are true:
1.  W blocks all backdoor paths from T to Y.
2.  W does not contain any descendants of T.

Theorem: If W satisfies the backdoor criterion with respect to T and Y, then
$P(y | do(t)) = \sum_w P(y | t, w) P(w).$

Read: if W satisfies the backdoor criterion, we can estimate the causal effect of T by adjusting/stratifying based on W.
### Visual Description
The slide title is "Backdoor adjustment". To the right of the text, there is a directed acyclic graph (DAG) with nodes $X_1, X_2, X_3, C, T, M, Y, X_5, X_6$. The nodes $T$ and $Y$ are highlighted as the treatment and outcome, respectively. The direct causal path from $T$ to $Y$ is shown with blue arrows through $M$ ($T \to M \to Y$). Other edges include: $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to C$, $X_3 \to C$, $C \to T$, $C \to Y$, $X_2 \to X_5$, $X_5 \to T$, $X_3 \to X_6$, $X_6 \to Y$.
---
## Page 105
### Content
## Front-door Criterion
A set of variables $M$ satisfies the front-door criterion relative to $T$ and $Y$ if:
1. $M$ completely mediates the effect of $T$ on $Y$.
(M intercepts all directed paths between $T$ and $Y$).
2. There is no unblocked backdoor path from $T$ to $M$.
3. All backdoor paths from $M$ to $Y$ are blocked by $T$.
### Visual Description
A causal directed acyclic graph (DAG) is shown. There are four nodes: $W$, $T$, $M$, and $Y$. $W$ is enclosed in a dashed circle, indicating it might be an unobserved variable. There are directed edges from $W$ to $T$ and from $W$ to $Y$. There is a directed edge from $T$ to $M$ and from $M$ to $Y$.

---

## Page 106
### Content
## Front-door Adjustment
**Theorem:** If $(T, M, Y)$ satisfy the front-door criterion, then
$P(y | do(t)) = \sum_m P(m|t) \sum_{t'} P(y | m, t') P(t')$
**Proof:**
### Visual Description
A causal directed acyclic graph (DAG) is shown in the top right corner. It is the same graph as on the previous page, but smaller. There are four nodes: $W$, $T$, $M$, and $Y$. $W$ is enclosed in a dashed circle. There are directed edges from $W$ to $T$ and from $W$ to $Y$. There is a directed edge from $T$ to $M$ and from $M$ to $Y$.

---

## Page 107
### Content
## Do-calculus
Given disjoint sets of variables $Y, T, Z$, and $W$ in graph $G$:
*   **Rule 1:** Decide if an observation can be ignored:
    $P(y | do(t), z, w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\overline{T})$
*   **Rule 2:** Decide if an intervention can be treated as an observation or vice versa:
    $P(y | do(t), do(z), w) = P(y | do(t), z, w)$ if $Y \perp Z | T, W$ in $G(\overline{T},\underline{Z})$
*   **Rule 3:** Decide if we can ignore an intervention or vice versa:
    $P(y | do(t), do(z), w) = P(y | do(t), w)$ if $Y \perp Z | T, W$ in $G(\overline{T}, \underline{Z(W)})$
    where $Z(W)$ denotes the set of nodes of $Z$ that aren't ancestors of any node of $W$ in $G(\overline{T})$
### Visual Description
Text-only slide.

---

## Page 108
### Content
## The SGS (Spirtes-Glymour-Scheines) Algorithm
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

## Page 109
### Content
## The PC (Peter-Clark) Algorithm
The trouble with the algorithm is that it's very inefficient (there are $2^n$ subsets for a graph on $n$ nodes).

In general this is unavoidable (problem is NP-hard). PC algorithm tries to make SGS a bit more efficient.

It's enough to find one $S$ making $X$ and $Y$ independent to remove their edge!
1.  For each $X$ and $Y$, see if $X \perp Y$; if so, remove their edge.
2.  For each $X$ and $Y$ still connected, and each third variable $Z$, see if $X \perp Y | Z$; if so, remove the edge between $X$ and $Y$.
3.  For each $X$ and $Y$ still connected, and each third and fourth variables $Z_1$ and $Z_2$, see if $X \perp Y|\{Z_1,Z_2\}$; if so, remove their edge.
4.  ...

Slide by Hoda Heidari.
### Visual Description
Text-only slide.

---

## Page 110
### Content
## What about interventions?
**Example:** two-variable graph
These two graphs are not distinguishable from observations alone.

Slide by Brady Neal.
### Visual Description
The page number '110' is in the top right corner. Below the title, two causal graphs are displayed side-by-side.
The first graph shows two nodes, A and B, with a directed arrow from A to B (A -> B).
The second graph shows two nodes, A and B, with a directed arrow from B to A (B -> A).

---

## Page 111
### Content
## What about interventions?
What about looking at other interventions?

Slide by Brady Neal.
### Visual Description
The page number '112' is in the top right corner. Below the title, a grid of causal graphs is presented, organized into four columns and three rows.

**Column 1: True graph**
*   Row 1: Node A with a directed arrow to Node B (A -> B).
*   Row 2: Node B with a directed arrow to Node A (B -> A).
*   Row 3: Node A and Node B connected by an undirected edge (A -- B).

**Column 2: I = {A}** (Intervention on A)
*   Row 1: Node A with a directed arrow to Node B (A -> B). The incoming edge to A (if any) would be removed by intervention, but none are shown.
*   Row 2: Node B with a directed arrow to Node A (B -> A). The incoming edge to A is removed, so only B is shown, with A isolated.
*   Row 3: Node A and Node B connected by an undirected edge (A -- B). The undirected edge is removed, leaving A and B isolated.

**Column 3: I = {B}** (Intervention on B)
*   Row 1: Node A with a directed arrow to Node B (A -> B). The incoming edge to B is removed, so only A is shown, with B isolated.
*   Row 2: Node B with a directed arrow to Node A (B -> A). The incoming edge to B (if any) would be removed by intervention, but none are shown.
*   Row 3: Node A and Node B connected by a dashed undirected edge (A --- B). This implies an unobserved confounder or an undirected edge that is not removed by intervention on B.

**Column 4: I = {}** (No intervention)
*   Row 1: Node A with a directed arrow to Node B (A -> B).
*   Row 2: Node B with a directed arrow to Node A (B -> A).
*   Row 3: Node A and Node B connected by a dashed undirected edge (A --- B).

---

## Page 112
### Content
## How many interventions are needed?
**Single variable interventions:** $n-1$ interventions single-var interventions suffice to identify graph. (Eberhardt et al 2006)

**Multi-variable interventions:** $O(\log n)$ interventions suffice if we can intervene on larger sets of variables. (Eberhardt et al 2005)
### Visual Description
Text-only slide.
## Page 114
### Content
What about interventions?
How about larger graphs?

Conclusions:
* No C->A edge.
* No C->B edge.
* A,B are connected.
### Visual Description
The slide title is "What about interventions?". Below it, "How about larger graphs?". On the left, a directed graph shows nodes A, B, C forming a triangle. A has arrows pointing to B and C. B has an arrow pointing to C. On the right, another graph shows nodes A, B, C. An intervention set $I = \{C\}$ is indicated. In this graph, A and B are connected by an undirected edge, while C is isolated. Below this graph, a bulleted list presents conclusions: "No C->A edge.", "No C->B edge.", and "A,B are connected.". The footer reads "Slide by Brady Neal.".
---
## Page 115
### Content
What about interventions?
How about larger graphs?

Conclusions:
* No C->A edge.
* No C->B edge.
* A,B are connected.

For a general graph (on n nodes): intervening on node 1 gives us skeleton on remaining nodes, so tells us which nodes are connected.
### Visual Description
The slide title is "What about interventions?". Below it, "How about larger graphs?". On the left, a directed graph shows nodes A, B, C forming a triangle. A has arrows pointing to B and C. B has an arrow pointing to C. On the right, another graph shows nodes A, B, C. An intervention set $I = \{C\}$ is indicated. In this graph, A and B are connected by an undirected edge, while C is isolated. Below this graph, a bulleted list presents conclusions: "No C->A edge.", "No C->B edge.", and "A,B are connected.". A blue box at the bottom contains the text: "For a general graph (on n nodes): intervening on node 1 gives us skeleton on remaining nodes, so tells us which nodes are connected.". The footer reads "Slide by Brady Neal.".
---
## Page 116
### Content
What about interventions?
How about larger graphs?

Conclusions:
* No B->A edge.
* Yes A->C edge.
* Yes B->C edge.

For a general graph (on n nodes): intervening on node i tells us for every node j, whether the edge i-j is directed as i->j or j->i.
For a general graph (on n nodes): intervening on node n is not needed, as all edges i-n have been directed by interventions on node i.
### Visual Description
The slide title is "What about interventions?". Below it, "How about larger graphs?". On the left, a directed graph shows nodes A, B, C forming a triangle. A has arrows pointing to B and C. B has an arrow pointing to C. On the right, another graph shows nodes A, B, C. An intervention set $I = \{B\}$ is indicated. In this graph, A is connected to C by an undirected edge, and B is connected to C by an undirected edge. Below this graph, a bulleted list presents conclusions: "No B->A edge.", "Yes A->C edge.", and "Yes B->C edge.". A blue box at the bottom contains two points: "For a general graph (on n nodes): intervening on node i tells us for every node j, whether the edge i-j is directed as i->j or j->i." and "For a general graph (on n nodes): intervening on node n is not needed, as all edges i-n have been directed by interventions on node i.". The footer reads "Slide by Brady Neal.".
---
## Page 117
### Content
What about interventions on more nodes?
An "adjacency" test can tell if nodes are adjacent. (E.g. intervening on x is an adjacency test for any pair in V/x).
Does either x→y or y→x?
An "x-directionality" test is one in which x ∈ X is being intervened on, but not Y.
Does x→y?
It suffices to expose every pair of nodes to either: "adjacency" + directionality test; or two opposite directionality tests.

In single-node interventions result:
(1) First intervention is an adjacency test for all pairs of nodes not involving node 1, and directionality test for all other nodes;
(2) All other interventions give the opposite directionality test for all other pairs.
### Visual Description
Text-only slide.
---
## Page 118
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
The slide title is "What about interventions on more nodes?". The top half of the slide contains text explaining "adjacency" and "x-directionality" tests, and stating that it suffices to expose every pair of nodes to either "adjacency" + directionality test or two opposite directionality tests. The bottom half of the slide lists two strategies for every pair (x, y): (1) intervening on both x and y, or (2) intervening on one of (x, y) and another node z. Below this text, there are three isolated circular nodes labeled X, Y, and Z, arranged in a triangular formation.
---
## Page 119
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
The slide title is "What about interventions on more nodes?". Below it, the text "Consider intervening on N/2 nodes:" is displayed. On the left side of the slide, there is a graph with six nodes (X1, X2, X3, X4, X5, X6). Nodes X1, X2, X3 are arranged vertically on the left, and X4, X5, X6 are arranged vertically on the right. Red arrows point from left to right, indicating interventions on X1, X2, and X3. The nodes are connected by a mix of dashed and solid lines, forming a complex network. Specifically, X1 is connected to X6, X2 to X5, and X3 to X4 with solid lines. Other connections are shown with dashed lines. On the right side of the slide, there is text explaining that log(N) interventions suffice for directionality tests, defining S as intervened sets and U as the rest, and providing a recurrence relation for the total number of interventions needed: $1 + \text{max\_interv\_needed}(S, U)$, which solves to $\text{max\_interv\_needed} \le \text{log}(N)$. At the bottom, there is additional text explaining that adding a "null experiment" (no interventions) for adjacency testing means that with log(N)+1 experiments, every pair has been exposed to adjacency + directionality test.
---
## Page 120
### Content
How many interventions are needed?

**Single variable interventions:** n-1 interventions single-var interventions suffice to identify graph. (Eberhardt et al 2006)

**Multi-variable interventions:** O(log n) interventions suffice if we can intervene on larger sets of variables. (Eberhardt et al 2005)

Both schemes described are *static*: set of interventions is fixed

Can perhaps do better with *adaptive* interventions (wait to see result before deciding next set of nodes to intervene on)

But these results are tight: worst case scenarios will need this many interventions
### Visual Description
Text-only slide.
---
## Page 121
### Content
That's all Folks!
### Visual Description
The slide features the iconic "That's all Folks!" text in a whimsical, white script font, centered against a background of concentric red and black circles, reminiscent of the Looney Tunes outro.
---
