# Practice_Exam_Solutions

Source: `materials/archive/Practice_Exam_Solutions.pdf`
Duplicate equivalents: `Practice_Exam_Solutions.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 46

## Page 1
### Content
Solutions
10-708 Probabilistic Graphical Models
Practice exam

Name:
Andrew ID:
Time Limit: N/A

Instructions:
* Please fill in your name and Andrew ID above. Be sure to write neatly, or you may not receive credit for your exam.
* This exam contains 46 pages (including this cover page). There are 14 short questions and 5 longer problems. The total number of points is 105.
* You are allowed to use one page of notes, double sided.
* If you have made a mistake, cross out the invalid parts of your solution, and circle the ones which should be graded.
* Look over the exam first to make sure that none of the 46 pages are missing. The last three pages are left blank for your use. Please do not remove any pages. The problems are of varying difficulty, so you may wish to pick off the easy ones first.
* Some answer boxes span more than one page to give you more space for an answer. You do not have to fill out all the space in the answer box if you do not need it.
* No electronic devices may be used during the exam.
* Please write all answers in pen or *darkly* in pencil.
* You have N/A to complete the exam. Good luck!
### Visual Description
Text-only slide.

---

## Page 2
### Content
10-708 Page 2 of 46

1 Short Questions

1. (2 points) Select all that apply: Relaxations of the Gibbs variational principle satisfy the following properties:
    * □ Inner approximations give a smaller value than $\log Z$.
    * Outer approximations give a smaller value than $\log Z$.
    * Mean field approximation is an instance of an outer approximation.
    * Inner approximations typically result in a non-convex minimization problem.
    1 and 4 are correct. (Outer approx overestimate $\log Z$, and mean-field is an inner approx.)

2. (2 points) Select all that apply: Which of the following statements correctly describe and distinguish over-smoothing and over-squashing in deep GNNs?
    * □ Over-smoothing refers to node representations becoming too similar (often nearly indistinguishable) after many message-passing layers, even for nodes that are far apart.
    * □ Over-squashing refers to information from many distant nodes being compressed into a fixed-size message/representation across graph bottlenecks, so that long-range information is hard to propagate.
    * Both over-smoothing and over-squashing are primarily due to vanishing gradients during training.
    * Using mean aggregation in the message-passing layers fixes both over-smoothing and over-squashing.
    1 and 2 are correct.

3. (2 points) Select all that apply: Which of the following statements about GANs are correct?
    * In the DC-GAN formalism, with an optimal discriminator and infinite capacity, training the generator corresponds to minimizing the Jensen-Shannon divergence between the model and data distributions.
    * □ If we take enough discriminator gradient steps, so it is trained to optimality for every generator gradient step, mode collapse will never occur.
    * A trained GAN generator provides a tractable way to compute the exact likelihood of any given data point.
    * □ Replacing the DC-GAN loss with the Wasserstein loss empirically ameliorates gradient vanishing.
    1 and 4 are correct.
### Visual Description
Text-only slide.

---

## Page 3
### Content
10-708 Page 3 of 46

4. (2 points) Select all that apply: Consider the following scenario in the context of variational inference (VI) and maximum likelihood (MLE). Let the true posterior $p(z | x)$ be a symmetric mixture of two well-separated Gaussians in one dimension. The variational distribution class is a single Gaussian $q(z)$ with trainable mean and covariance. Which of the following statements are correct?
    * Minimizing $KL(q || p)$, that is the loss for VI, tends to be mode-seeking, often pushing $q$ to sit on top of one of the modes with underestimated variance.
    * □ Minimizing $KL(p || q)$, that is, the loss for MLE, tends to be mass-covering, often pushing $q$ to lie between the modes with inflated variance.
    * For this symmetric mixture, minimizing $KL(q || p)$ and minimizing $KL(p || q)$ necessarily yield the same optimal $q$.
    * □ In practice, it rarely matters if we use $KL(q || p)$ or $KL(p || q)$ as a loss.
    1, 2 are correct.

5. (2 points) Select all that apply: Recall Hamiltonian Monte Carlo (HMC) and simulated tempering as methods for sampling from a target distribution $\pi(x)$. Which of the following statements are correct?
    * Both HMC and simulated tempering can be viewed as Markov Chains on an extended state space: HMC augments with a velocity variable, while simulated tempering augments with a temperature (or inverse-temperature) index.
    * □ In the stationary distribution for HMC, the marginal distribution of $x$ is different from $\pi(x)$.
    * □ In the stationary distribution over $(x, k)$ for simulated tempering, for any temperature index $k$, the conditional distribution $p_k(x)$ is the original $\pi(x)$.
    * HMC is a special case of simulated tempering for a particular choice of temperatures.
    1 is correct.

6. (2 points) Select all that apply: Which of the following statements correctly compare variational inference (VI) and Markov Chain Monte Carlo (MCMC)?
    * Given enough optimization steps, all VI methods provide exact answers, just like MCMC.
    * A standard VI objective is the ELBO bound, which is a lower bound on the log likelihood.
    * Markov Chains typically mix faster in high dimensions than in low, because of the central limit theorem.
    * One key advantage of VI over MCMC is that VI more effectively uses the power of randomness.
### Visual Description
Text-only slide.

---

## Page 4
### Content
10-708 Page 4 of 46

The correct answer is 2.
### Visual Description
Text-only slide.

---

## Page 5
### Content
10-708 Page 5 of 46

7. True or False:
    (a) (1 point) With infinite samples from the data distribution $P_{data}$ and infinite capacity for the generator and discriminator, any local minimum of the standard GAN loss corresponds to a generator $p_g$ that exactly matches $P_{data}$.
        * True
        * False
    False.

    (b) (2 points) Consider unpaired image-to-image translation between two domains A and B (e.g., A = horses, B = zebras). Suppose we have infinite samples from $P_A$ and $P_B$, and infinite capacity for the "translators" $f: A \to B$ and $g: B \to A$.
    Claim: Without the cycle-consistency loss, the adversarial losses alone admit many different optima for $f$ and $g$; but once we add the cycle-consistency loss and minimize the full CycleGAN objective perfectly, the optimal translators $f, g$ become unique.
        * True
        * False
    False. Adding the cycle-consistency loss does not generally make the solution unique: there can still be many bijections between supports of $P_A$ and $P_B$ that are both distribution-matching and cycle-consistent (for example, composing one cycle-consistent solution with a measure-preserving permutation within domain B). Thus, even in the idealized infinite-data, infinite-capacity limit, the optimal translators need not be unique.

8. (1 point) True or False: In Noise Contrastive Estimation (NCE), it is generally best to choose the noise distribution to be as far as possible from the data distribution, so that the classifier can easily distinguish data from noise. This significantly improves the sample efficiency of NCE.
    * True
    * False
    False.
### Visual Description
Text-only slide.

---

## Page 6
### Content
10-708 Page 6 of 46

9. Check all that apply: For a variational autoencoder (VAE), let $p_\theta(x, z)$ denote the generative model (decoder) and $q_\phi(z | x)$ the variational posterior (encoder). We want to estimate gradients of the variational relaxation (ELBO) with respect to $\phi$ using either the REINFORCE or the reparameterization trick.

In each of the following scenarios, which estimator can be applied directly (without extra tricks) to obtain an unbiased stochastic gradient of the ELBO with respect to $\phi$?

(a) (3 points) The latent variable $z$ is discrete (categorical with finitely many states). We can evaluate $\log p_\theta(x, z)$, $\log q_\phi(z | x)$, and $\nabla_\phi \log q_\phi(z | x)$, but there is no continuous reparameterization of $z$ as $z = g_\phi(\epsilon, x)$.
    * REINFORCE
    * Reparameterization trick
    REINFORCE.
    The score-function estimator only needs to sample $z \sim q_\phi(z | x)$, evaluate $\log q_\phi(z | x)$, and differentiate $\log q_\phi(z | x)$ with respect to $\phi$; it does not require that $z$ be continuous or reparameterizable.

(b) (3 points) The latent variable $z$ is continuous and we have a differentiable reparameterization $z = g_\phi(\epsilon, x)$ with $\epsilon$ sampled from a fixed, parameter-free noise distribution. We can backpropagate through $g_\phi$ and through $\log p_\theta(x, z)$, but computing $\nabla_\phi \log q_\phi(z | x)$ explicitly is painful or unavailable.
    * REINFORCE
    * Reparameterization trick
    Reparameterization trick.
    The pathwise (reparameterization) gradient only requires that we can write $z = g_\phi(\epsilon, x)$ and differentiate the ELBO integrand with respect to $\phi$ via the chain rule through $z$. It does not require an explicit closed form for $\nabla_\phi \log q_\phi(z | x)$, unlike REINFORCE.

(c) (3 points) We can evaluate $\log p_\theta(x, z)$ and $\log q_\phi(z | x)$ for any sampled $z$, and we can compute $\nabla_\phi \log q_\phi(z | x)$, but the decoder is a black box: we cannot reliably compute $\nabla_z \log p_\theta(x, z)$ or $\nabla_z \log q_\phi(z | x)$ (e.g., due to non-differentiable components).
    * REINFORCE
    * Reparameterization trick
    REINFORCE.
    The score-function estimator for $\nabla_\phi$ only needs $\nabla_\phi \log q_\phi(z | x)$ and the scalar reward (e.g., $\log p_\theta(x, z) - \log q_\phi(z | x)$). It does not require differentiating with respect to $z$. The reparameterization trick, by contrast, relies on backpropagating through $z = g_\phi(\epsilon, x)$ and hence requires differentiability with respect to $z$.
### Visual Description
Text-only slide.

---

## Page 7
### Content
10-708 Page 7 of 46

10. (4 points) Select All that Apply: In Figure 1 consider the set of variables highlighted by gray in the following causal graphs. In which graphs the highlighted set satisfies the backdoor criterion relative to treatment $T$ and outcome $Y$?

(a)
(b) □
(c)
(d)
None of the above
c Only as $w_1$ blocks the back door path
### Visual Description
Figure 1 shows four causal graphs (a, b, c, d).
Graph (a): Nodes T, W1, W2, W3, Y, Z. T points to W2. W1 points to T and W2. W2 points to W3. W3 points to Y. Z points to W2 and Y. W2 and W3 are grayed out.
Graph (b): Nodes T, W1, V, M, Y, W2, Z. W1 points to T and V. V points to M. T points to M. M points to Y. W2 points to M and Z. Z points to Y. W1, V, M, W2 are grayed out.
Graph (c): Nodes T, W1, W2, V, M, Y. W1 points to T and V. V points to W2. T points to M. M points to Y. W2 points to Y. W1 and W2 are grayed out.
Graph (d): Nodes T, W1, V, M, Y, W2, W3. W1 points to T and V. V points to W2. T points to M. M points to Y. W2 points to W3. W3 points to Y. W1, W2, W3 are grayed out.

---

## Page 8
### Content
10-708 Page 8 of 46

11. (4 points) Select All that Apply: Which of the following structures in Figure 2 can be fully identified by the PC algorithm?

(a)
(b)
(c)
(d)
None of the above
(b) and (d)

12. (2 points) Select All that Apply: In the predictor-corrector (PC) algorithm for sampling from score-based diffusion models, it holds that:
    * We must train two separate neural networks: one for the predictor step (reverse SDE) and a different one for the corrector step (Langevin updates).
    * The predictor step numerically integrates a discretization of the reverse-time SDE/ODE, using the learned score to take one discrete step.
    * □ The corrector step applies a few iterations of Langevin dynamics (or related MCMC) at a fixed noise level, using the learned score.
    * □ PC sampling fundamentally additionally requires a classifier to “guide” the samples toward high-density regions.
### Visual Description
Figure 2 shows four causal graphs (a, b, c, d).
Graph (a): A chain of 5 nodes, where the first node points to the second, the second to the third, and so on. The first node also points to the third.
Graph (b): A chain of 5 nodes, where each node points to the next in sequence.
Graph (c): A triangle of 3 nodes, where each node points to the other two, forming a cycle.
Graph (d): A triangle of 3 nodes, where node 1 points to node 2, node 2 points to node 3, and node 3 points to node 1, forming a directed cycle.
## Page 9
### Content
10-708 - Page 9 of 46

2 and 3 are correct.

13. (2 points) Select All that Apply: The probability flow ODE rewrite of the SDE in diffusion models (i.e. the “derandomized” interpretation) is useful for:
    * Developing efficient procedures to evaluate the likelihood of the model.
    * Faster generation of samples (though sometimes at the expense of worse quality generations in practice).
    * Finding the latent representation of an image by inverting the trajectory that finishes at the image.
    * All of the above.

4 is correct.

14. (2 points) Select All that Apply: For a continuous energy-based model $p_\theta(x) \propto \exp(-E_\theta(x))$ on $\mathbb{R}^d$, Hÿvarinen's original score matching objective (after integration by parts) avoids the partition function, but requires computing which of the following quantities?
    * The squared norm of the gradient of the energy with respect to the data: $|| \nabla_x E_\theta(x) ||^2_2$.
    * The trace of the Hessian of the energy with respect to the data: $\sum_{i=1}^d \partial_{x_i x_i} E_\theta(x)$.
    * The log-partition function $\log Z(\theta)$.
    * The gradient of the log-partition function with respect to parameters: $\nabla_\theta \log Z(\theta)$.

1 and 2 are correct.

After integration by parts, the score matching loss can be written (up to constants) as
$$
E_{p_{data}} \left[ || \nabla_x \log p_\theta(x) ||_2^2 + \sum_{i=1}^d \partial_{x_i x_i} \log p_\theta(x) \right] = E_{p_{data}} \left[ || \nabla_x E_\theta(x) ||_2^2 - \sum_{i=1}^d \partial_{x_i x_i} E_\theta(x) \right]
$$
(up to a sign convention). This depends on first- and second-order derivatives of $E_\theta(x)$ w.r.t. $x$, but not on the partition function $Z(\theta)$ or its derivatives with respect to $\theta$.
### Visual Description
Text-only slide with multiple-choice questions and answers. One mathematical equation at the bottom.
---
## Page 10
### Content
10-708 - Page 10 of 46

2 Problems

1. Consider the Bayesian Network described in Figure 3

Figure 3: Bayesian Network Structure

Based on this network structure, answer the following questions:
(a) (2 points) Factorize the joint distribution $P(A, B, C, D, E, F, G, H)$ according to the directed graph in Figure 3.
$P(A, B, C, D, E, F, G, H) = P(A)P(B | A)P(C | B)P(D | B)P(E | C, D, F, G)P(F | D) P(G | D, H) P(H | B)$

(b) (1 point) Is $A \perp H | B$?
True
False
True, B blocks only path to A from H

(c) (1 point) Is $F \perp D | G$?
True
False
False, direct edge from D to F

(d) (1 point) Is $A \perp F | D$?
True
False
### Visual Description
A directed acyclic graph (DAG) representing a Bayesian Network with nodes A, B, C, D, E, F, G, H. The graph shows directed edges: A->B, B->C, B->D, B->H, C->E, D->E, D->F, D->G, F->E, G->E, H->G. Below the graph are multiple-choice questions with radio buttons.
---
## Page 11
### Content
10-708 - Page 11 of 46

True, D blocks path from A to F in the undirected ancestral moral graph.

(e) (1 point) Is $P(E|A, C, D, H) = P(E|C, D, H)$ or equivalently is $A \perp E | C, D, H$?
True
False
True. Since E and A are independent random variables given C,H,D.

(f) (2 points) Which nodes are present in the Markov blanket of C?
B,D,E,F,G

(g) (2 points) Which nodes are present in the Markov blanket of D?
B,C,E,F,G,H

(h) (2 points) Draw the undirected moralized graph of the Bayesian network.
### Visual Description
Text-only slide with multiple-choice questions and answers. Some answers are provided in text boxes.
---
## Page 12
### Content
10-708 - Page 12 of 46
### Visual Description
A large empty white box at the top, followed by a directed acyclic graph (DAG) representing a Bayesian Network with nodes A, B, C, D, E, F, G, H. This is the same graph as on page 10.
---
## Page 13
### Content
10-708 - Page 13 of 46

2. Consider the Markov Chain with 4 states, $\{A, B, C, D\}$. Its transition matrix is
$$
T=
\begin{pmatrix}
0 & 0.6 & 0.4 & 0 \\
0.2 & 0.5 & 0.3 & 0 \\
0 & 0.5 & 0 & 0.5 \\
0 & 1.0 & 0 & 0
\end{pmatrix}
\quad (1)
$$
(a) (2 points) Draw the transition graph of this Markov chain.

(b) (2 points) Is the Markov Chain is irreducible? Please provide a short reason for your answer.
### Visual Description
A transition matrix $T$ for a 4-state Markov Chain. Below it, a directed graph representing the transition graph of the Markov Chain with states A, B, C, D and edge weights (probabilities).
---
## Page 14
### Content
10-708 - Page 14 of 46

Yes, given any two pair of nodes, there exists a path between them. Any node can be visited from any other node by tracing through the cycles with shared nodes (e.g. A → C → D → B → A). We can also show specific paths from any node to any node here:
1. From State A:
    (a) To B: Directly with probability $P_{AB} = 0.6$.
    (b) To C: Directly with probability $P_{AC} = 0.4$.
    (c) To D:
        i. Via C: A → C → D, with probability $P_{AC} \times P_{CD} = 0.4 \times 0.5 = 0.2$.
        ii. Via B: A → B → C → D, with positive probability.
2. From State B:
    (a) To A: Directly with probability $P_{BA} = 0.2$.
    (b) To C: Directly with probability $P_{BC} = 0.3$.
    (c) To D:
        i. Via C: B → C → D, with probability $P_{BC} \times P_{CD} = 0.3 \times 0.5 = 0.15$.
3. From State C:
    (a) To B: Directly with probability $P_{CB} = 0.5$.
    (b) To D: Directly with probability $P_{CD} = 0.5$.
    (c) To A:
        i. Via B: C → B → A, with probability $P_{CB} \times P_{BA} = 0.5 \times 0.2 = 0.1$.
4. From State D:
    (a) To B: Directly with probability $P_{DB} = 1.0$.
    (b) To A and C: Via B, since D → B → A and D → B → C.
### Visual Description
A large empty white box at the top, followed by text explaining the irreducibility of the Markov Chain by detailing paths between all states.
---
## Page 15
### Content
10-708 - Page 15 of 46

Since there is a sequence of transitions with positive probability connecting every pair of states, the Markov chain is irreducible.
### Visual Description
Text-only slide.
---
## Page 16
### Content
10-708 - Page 16 of 46

(c) (2 points) Is the Markov Chain aperiodic? Please provide a short reason for your answer.

Yes, the Markov Chain is aperiodic. Irreducibility, combined with any self-loop (node B in this case), makes the chain aperiodic. You can also prove $\text{gcd}(\{t|p_t(s, s) > 1\} = 1$ for all states $s \in \{A, B, C, D\}$

(d) (2 points) Does it have a unique stationary distribution? If yes, what is the unique stationary distribution and why is it unique? If no, write down at least two different stationary distributions.
### Visual Description
A large empty white box at the top, followed by text questions and answers regarding the aperiodicity and stationary distribution of the Markov Chain.
---
## Page 17
### Content
The unique stationary distribution is $\pi = [\frac{20}{177}, \frac{100}{177}, \frac{38}{177}, \frac{19}{177}]$. This can be found by solving the following system of linear equations. [Even without solving this system, we know it is unique by the previous two parts, but this is useful to find the stationary values.]

$\pi T = \pi$, subject to $\pi_A + \pi_B + \pi_C + \pi_D = 1$.
### Visual Description
Text and math equations describing the unique stationary distribution and the system of linear equations to find it.

---

## Page 18
### Content
Then we have
$\pi T = \pi \Leftrightarrow \pi(T - I) = 0$
$\leftrightarrow [\pi_A, \pi_B, \pi_C, \pi_D] (T - I) = 0$
$\leftrightarrow [\pi_A, \pi_B, \pi_C, \pi_D] \begin{bmatrix} -1 & 0.6 & 0.4 & 0 \\ 0.2 & -0.5 & 0.3 & 0 \\ 0 & 0.5 & -1 & 0.5 \\ 0 & 1.0 & 0 & -1 \end{bmatrix} = 0$
$\begin{cases} 0 = -\pi_A + 0.2\pi_B \\ 0 = 0.6\pi_A - 0.5\pi_B + 0.5\pi_C + \pi_D \\ 0 = 0.4\pi_A + 0.3\pi_B - \pi_C \\ 0 = 0.5\pi_C - \pi_D \\ \pi_A + \pi_B + \pi_C + \pi_D = 1 \end{cases}$
$\leftrightarrow \begin{cases} \pi_A = 0.2\pi_B \\ \pi_C = 0.38\pi_B \\ \pi_D = 0.19\pi_B \\ \pi_A + \pi_B + \pi_C + \pi_D = 1 \end{cases}$
$\leftrightarrow \begin{cases} \pi_A = \frac{20}{177} \\ \pi_B = \frac{100}{177} \\ \pi_C = \frac{38}{177} \\ \pi_D = \frac{19}{177} \end{cases}$

3. In this problem we examine how a very simple message-passing GNN can exactly simulate a textbook algorithm for finding single-source shortest paths on an unweighted graph.

Let $G = (V, E)$ be a finite, undirected, unweighted graph, and let $s \in V$ be a distinguished source node. For each node $v \in V$, let $d(v)$ denote the length (number of edges) of a shortest path from $s$ to $v$, with the convention $d(v) = +\infty$ if $v$ is not reachable from $s$. Let $N(v)$ denote the set of neighbors of $v$.

We will first describe a standard (Bellman-Ford) algorithm, and then show how a GNN can implement it exactly.

(a) (4 points) Consider the following iterative algorithm. Each node $v$ maintains a scalar $d_t(v) \in \{0, 1, 2, \dots \} \cup \{+\infty\}$ at time (round) $t$:
* Initialization:
$$d_0(v) = \begin{cases} 0 & \text{if } v = s, \\ +\infty & \text{otherwise.} \end{cases}$$
### Visual Description
Math equations showing the derivation of stationary probabilities, followed by a new problem description (Problem 3) about GNNs and shortest paths, including definitions and the initialization step of an iterative algorithm.

---

## Page 19
### Content
* For $t = 1, 2, 3, \dots$, all nodes update in parallel according to
$$d_t(v) = \min \left(d_{t-1}(v), 1 + \min_{u \in N(v)} d_{t-1}(u)\right).$$
where $\min \emptyset := +\infty$ if $v$ has no neighbors.
Prove that after $t$ rounds, $d_t(v)$ is the length of the shortest $s \to v$ path of length at most $t$, or $+\infty$ if no such path exists.
### Visual Description
Text describing the update rule for $d_t(v)$ in an iterative algorithm for shortest paths, followed by a proof prompt. Two large blank white boxes are present below the text.

---

## Page 20
### Content
We argue by induction on $t$ that $d_t(v)$ is the length of the shortest $s \to v$ path of length at most $t$ (or $+\infty$ if no such path exists).

For $t = 0$, by construction $d_0(s) = 0$ and $d_0(v) = +\infty$ for $v \neq s$. This is correct: with zero edges, $s$ can only reach itself.

Assume the claim holds for some $t - 1 \ge 0$. Consider round $t$ and a node $v$. Any path from $s$ to $v$ of length at most $t$ either:
* has length at most $t - 1$, in which case its length is already captured by $d_{t-1}(v)$ by the induction hypothesis; or
* has length exactly $t$, say $s \to \dots \to u \to v$, where the prefix from $s$ to $u$ has length $t - 1$ and $u \in N(v)$. By the induction hypothesis, the shortest such prefix has length $d_{t-1}(u)$, so the total length of the best $t$-edge path ending in $v$ via $u$ is $1 + d_{t-1}(u)$. Minimizing over neighbors gives $1 + \min_{u \in N(v)} d_{t-1}(u)$ as the best $t$-edge path.

The update
$$d_t(v) = \min \left(d_{t-1}(v), 1 + \min_{u \in N(v)} d_{t-1}(u)\right)$$
takes the minimum between (a) the best path of length at most $t - 1$ and (b) the best path of length exactly $t$. Hence $d_t(v)$ is the length of the best path of length at most $t$, or $+\infty$ if none exists. This completes the induction.

(b) (2 points) Using the reasoning from the previous part, argue that if we run the algorithm for
$$T \ge \max\{d(v) : v \in V \text{ and } d(v) < +\infty\},$$
(for example, $T$ at least the diameter of the connected component of $s$), then $d_T(v) = d(v)$ for all $v$ reachable from $s$.
### Visual Description
Text-only slide, presenting a detailed proof by induction for the correctness of the shortest path algorithm and introducing part (b) of the problem.

---

## Page 21
### Content
From the previous part, after $t$ rounds $d_t(v)$ is the length of the shortest $s \to v$ path of length at most $t$, or $+\infty$ if none exists. If $d(v)$ is finite, then for $t \ge d(v)$ there exists a shortest path of length $d(v) \le t$, so $d_t(v) \le d(v)$. On the other hand, no path of length less than $d(v)$ exists by definition of $d(v)$, so $d_t(v) \ge d(v)$. Thus $d_t(v) = d(v)$ for all $t \ge d(v)$.

Therefore, if we choose
$$T \ge \max\{d(v) : v \in V, d(v) < +\infty\},$$
then $d_T(v) = d(v)$ for all $v$ with finite distance from $s$. In particular, this holds if $T$ is at least the diameter of the connected component of $s$.

(c) (4 points) A standard message-passing GNN layer has the form
$$m_v^{(t)} = \text{AGGREGATE}(\{h_u^{(t-1)} : u \in N(v)\}), \quad h_v^{(t)} = \text{UPDATE}(h_v^{(t-1)}, m_v^{(t)}),$$
for some choice of functions AGGREGATE and UPDATE shared across nodes.
Show how to implement the above algorithm using a message-passing GNN: that is, show that there is a choice of functions AGGREGATE and UPDATE such that, with appropriate choice of initial embeddings $h_u^{(0)}$ for the nodes $u$, it will be the case that for all $t \ge 0$ and all nodes $u$, we have $h_u^{(t)} = d_t(u)$. (Note, you are allowed to pick these functions to be anything, and they are not required to be any of the "standard" GNN layers we saw in class.)
### Visual Description
Text-only slide, continuing the argument for part (b) of the problem and introducing part (c) which asks to implement the shortest path algorithm using a message-passing GNN.

---

## Page 22
### Content
* Initialization:
$$h_v^{(0)} = \begin{cases} 0 & \text{if } v = s, \\ +\infty & \text{otherwise.} \end{cases}$$
* For $t = 1, 2, 3, \dots$, define the aggregated message and update:
$$m_v^{(t)} = \min_{u \in N(v)} h_u^{(t-1)} \quad \text{(min-aggregation)},$$
$$h_v^{(t)} = \min(h_v^{(t-1)}, 1 + m_v^{(t)}) \quad \text{(min-plus update)}.$$
In other words:
$$\text{AGGREGATE}(\{h_u^{(t-1)} : u \in N(v)\}) = \min_{u \in N(v)} h_u^{(t-1)},$$
### Visual Description
Text and math equations describing the initialization, aggregation, and update rules for implementing the shortest path algorithm using a GNN.

---

## Page 23
### Content
and
$$\text{UPDATE}(h_v^{(t-1)}, m_v^{(t)}) = \min(h_v^{(t-1)}, 1 + m_v^{(t)}).$$
To show correctness—assume for some $t - 1 \ge 0$ that $h_v^{(t-1)} = d_{t-1}(v)$ for every $v \in V$. Then the aggregation step yields
$$m_v^{(t)} = \min_{u \in N(v)} h_u^{(t-1)} = \min_{u \in N(v)} d_{t-1}(u),$$
and the update step gives
$$h_v^{(t)} = \min(h_v^{(t-1)}, 1 + m_v^{(t)}) = \min\left(d_{t-1}(v), 1 + \min_{u \in N(v)} d_{t-1}(u)\right),$$
which is exactly the update rule defining $d_t(v)$ in the local algorithm. Since the initialization $h_v^{(0)}$ matches $d_0(v)$, this holds for all $t$ by induction.
### Visual Description
Text and math equations demonstrating the correctness of the GNN implementation by showing how its aggregation and update steps match the local algorithm's update rule, concluding with an inductive proof.

---

## Page 24
### Content
4. In class we saw Hyvärinen's score matching objective, which compares the score $\nabla_x \log p_{\text{data}}(x)$ of the data distribution to the score $\nabla_x \log q_\theta(x)$ of a parametric model $q_\theta(x)$, and then uses integration by parts to obtain a loss that can be evaluated using only samples from $p_{\text{data}}$. In this problem we explore two modifications of that loss:
* directly matching density gradients $\nabla_x p_{\text{data}}$ rather than scores,
* and generalized score matching, where the score is pre-multiplied by a known matrix-valued function $A(x)$ to emphasize certain regions.

For both parts of this problem, you may assume all densities are smooth and rapidly decaying so that integration by parts is justified and boundary terms vanish.

(a) (4 points) Let $p_{\text{data}}(x)$ be the (unknown) data density on $\mathbb{R}^d$ and let $q_\theta(x)$ be a smooth, strictly positive parametric model. Consider the following "gradient matching" loss:
$$L_{\text{grad}}(\theta) := \int_{\mathbb{R}^d} ||\nabla_x p_{\text{data}}(x) - \nabla_x q_\theta(x)||^2 \, dx.$$
This is analogous to the score-matching loss we saw, but with $\nabla_x p_{\text{data}}$ in place of $\nabla_x \log p_{\text{data}}$.
Expand the square and write $L_{\text{grad}}(\theta)$ as the sum of three integrals. Rewrite the cross term using integration by parts in analogy to how we did it for Hyvärinen's score matching objective.
### Visual Description
Text describing Problem 4, which introduces modifications to Hyvärinen's score matching objective. Part (a) defines a "gradient matching" loss and asks for its expansion and rewriting of the cross term using integration by parts. A large blank white box is present below the text.
## Page 25
### Content
10-708 Page 25 of 46

**Expansion.** Expanding the square gives
$L_{grad}(\theta) = \int_R ((\nabla_x P_{data})^2 - 2\nabla_x P_{data} \nabla_x q_\theta + (\nabla_x q_\theta)^2) dx$
$= \int (\nabla_x P_{data}(x))^2 dx - 2 \int \nabla_x P_{data}(x) \nabla_x q_\theta(x) dx + \int (\nabla_x q_\theta(x))^2 dx.$
independent of $\theta$
The first integral depends only on $P_{data}$ and is therefore constant with respect to $\theta$.

**Integration by parts.** For the cross term, let $u(x) = \nabla_x q_\theta(x)$ and $v(x) = P_{data}(x)$ so that $\nabla v(x) = \nabla_x P_{data}(x)$. Then
$\int \nabla_x P_{data}(x) \nabla_x q_\theta(x) dx = \int v(x) u(x)dx = [v(x) u(x)]_{-\infty}^{+\infty} - \int v(x) \nabla_x u(x)dx.$
Under the decay assumptions, the boundary term $[v(x)u(x)]_{-\infty}^{+\infty}$ vanishes, leaving
$\int P_{data}(x) \nabla_x q_\theta(x) dx = - \int P_{data}(x) \nabla_x q_\theta(x) dx,$
as claimed.

**Three-term decomposition.** Plugging into the initial expression, we obtain
$L_{grad}(\theta) = \int (\nabla_x P_{data})^2 dx - 2(-\int P_{data} \nabla_x q_\theta dx) + \int (\nabla_x q_\theta)^2 dx$
$= \int (\nabla_x P_{data}(x))^2 dx + \int (\nabla_x q_\theta(x))^2 dx + 2 \int P_{data}(x) \nabla_x q_\theta(x)dx.$
This is the desired decomposition into a constant term, a model-only Lebesgue integral, and a cross term expressed as an expectation under $P_{data}$.
### Visual Description
Mostly text with several mathematical equations, some highlighted in red.
---

## Page 26
### Content
10-708 Page 26 of 46

(b) (2 points) Recall, in the usual Hyvärinen score matching derivation, one ends up with an objective of the form
$J_{SM}(\theta) = E_{x \sim P_{data}} [||\nabla_x \log q_\theta(x)||^2 + 2Tr (\nabla^2 \log q_\theta(x)) + ||\nabla_x \log P_{data}(x)||^2]$
Explain carefully why $L_{grad}(\theta)$ cannot be straightforwardly minimized given only i.i.d. samples $x_1,..., x_n \sim P_{data}$, whereas $J_{SM}(\theta)$ can. In particular, point out which of the three terms is not easy to estimate from samples for $L_{grad}$, and contrast with $J_{SM}$.

The key difference is how the integrals are weighted.
For Hyvärinen score matching, every term in $J_{SM}(\theta)$ is of the form
$E_{x \sim P_{data}} [\phi(x; \theta)] = \int P_{data}(x) \phi(x; \theta) dx,$
where $\phi$ depends only on $q_\theta$ and its derivatives (e.g., $\phi = \frac{1}{2}||\nabla_x \log q_\theta(x)||^2 + \frac{1}{2}Tr(\nabla^2 \log q_\theta(x))$). As a result, with samples $x_1,...,x_n \sim P_{data}$ we can approximate $J_{SM}(\theta)$ via the empirical average $\frac{1}{n} \sum_i \phi(x_i; \theta)$; no knowledge of $P_{data}(x)$ in closed form is needed.

In contrast, the decomposition of $L_{grad}(\theta)$ includes the model-only Lebesgue integral
$\int (\nabla_x q_\theta(x))^2 dx.$
Formally, one can write
$\int (\nabla_x q_\theta(x))^2 dx = \int P_{data}(x) \frac{(\nabla_x q_\theta(x))^2}{P_{data}(x)} dx = E_{x \sim P_{data}} \left[ \frac{(\nabla_x q_\theta(x))^2}{P_{data}(x)} \right]$
### Visual Description
Text-only slide with a large empty white box in the middle, and several mathematical equations.
---

## Page 27
### Content
10-708 Page 27 of 46

However, this representation involves the factor $1/P_{data}(x)$ inside the expectation. Given only samples from $P_{data}$, we do not know $P_{data}(x)$ pointwise, so we cannot evaluate $(\nabla_x q_\theta(x))^2 / P_{data}(x)$ at the sample points without first estimating $P_{data}$ itself.

Thus, unlike in standard score matching, there is no way to express $L_{grad}(\theta)$ purely as an expectation with respect to $P_{data}$ of a function depending only on $q_\theta$ and its derivatives. Minimizing $L_{grad}(\theta)$ would require either:
* access to $P_{data}(x)$ in closed form (which we do not have), or
* a separate density estimator for $P_{data}$, defeating the purpose of the method.
This is precisely why matching $\nabla_x P_{data}$ is a bad idea in the usual generative modeling setting, while matching $\nabla_x \log P_{data}$ (the score) is workable.

(c) (5 points) Now consider the usual score matching setting in $\mathbb{R}^d$. Let $P_{data}(x)$ be an unknown density and $q_\theta(x)$ a smooth, strictly positive model. Denote the scores
$S_{data}(x) := \nabla_x \log P_{data}(x),$
$S_\theta(x) := \nabla_x \log q_\theta(x).$
Let $A(x) \in \mathbb{R}^{d \times d}$ be a pre-chosen (known) smooth matrix-valued function such that, for each $x$, $A(x)$ is positive definite. Define the generalized score matching loss
$D_A(P_{data}||q_\theta) := E_{x \sim P_{data}} [|| A(x) (S_{data}(x) - S_\theta(x)) ||^2].$
Expand the square and write $D_A(P_{data}||q_\theta)$ as the sum of three integrals. Rewrite the cross term using integration by parts in analogy to how we did it for Hyvärinen's score matching objective. Explain why this loss can be easily evaluated in this form, given only samples from $P_{data}$.
### Visual Description
Text-only slide with definitions and a new loss function.
---

## Page 28
### Content
10-708 Page 28 of 46

**Expansion.** Let $B(x) := A(x)^T A(x)$, which is symmetric positive definite for each $x$. Then
$D_A(P_{data}||q_\theta) = E_{P_{data}} [|| A(x) (S_{data}(x) - S_\theta(x))||^2]$
$= E_{P_{data}} [(S_{data} - S_\theta)^T B(x) (S_{data} - S_\theta)]$
$= E_{P_{data}} [S_{data}^T B S_{data}] - 2 E_{P_{data}} [S_{data}^T B S_\theta] + E_{P_{data}} [S_\theta^T B S_\theta].$
The last term depends only on $P_{data}$ (and $A$) and is therefore a constant in $\theta$. This yields the desired form with $||A(x)S_\theta(x)||^2 = S_\theta(x)^T B(x)S_\theta(x)$.

**Removing $S_{data}$ via integration by parts.** Write the cross term in integral form:
$E_{P_{data}} [S_{data}^T B S_\theta] = \int P_{data}(x) S_{data}(x)^T B(x) S_\theta(x) dx.$
### Visual Description
Text-only slide with several mathematical equations, some highlighted in red.
---

## Page 29
### Content
10-708 Page 29 of 46

Using $S_{data} = \nabla_x \log P_{data} = \nabla_x P_{data} / P_{data}$ we can rewrite this as
$\int (\nabla_x P_{data}(x))^T (B(x) S_\theta(x)) dx.$
This has the same structure as in the standard score matching derivation: an integral of $\nabla_x P_{data}$ dotted with a vector-valued function of $(A, q_\theta)$. By applying multivariate integration by parts (or the divergence theorem), and assuming sufficient decay so that boundary terms vanish, we can move the derivative off $P_{data}$ onto $B(x)S_\theta(x)$. Concretely,
$\int (\nabla_x P_{data})^T (B S_\theta) dx = - \int P_{data}(x) \nabla_x \cdot (B(x)S_\theta(x)) dx,$
where $\nabla_x \cdot (\cdot)$ denotes the divergence with respect to $x$. The right-hand side depends only on $P_{data}$ as a weighting measure and on $B(x)S_\theta(x)$ and its derivatives; there is no explicit $S_{data}$ any more.

**Generalized score matching objective.** Plugging (ii) into the expansion from (i), we can write
$D_A(P_{data}||q_\theta) = E_{P_{data}} [||A(x)S_\theta(x)||^2] + 2 E_{P_{data}} [\nabla_x \cdot (B(x)S_\theta(x))] + const,$
where "const" is independent of $\theta$. Thus, up to a constant and global factor, minimizing $D_A$ is equivalent to minimizing
$J_A(\theta) := E_{x \sim P_{data}} \left[ \frac{1}{2}||A(x)S_\theta(x)||^2 + \nabla_x \cdot (B(x)S_\theta(x)) \right],$
Since $J_A(\theta)$ is an expectation with respect to $P_{data}$ of a function that we can evaluate at sample points (given $A$ and $q_\theta$), we can approximate $J_A(\theta)$ from samples $x_1,...,x_n \sim P_{data}$ just as in standard score matching.

(d) (3 points) Consider the following mixture model for the data:
$P_{data}(x) = (1 - \epsilon) \mathcal{N}(x; 0, I_d) + \epsilon \mathcal{N}(x; \mu^*, I_d),$
where $0 < \epsilon \ll 1$, $I_d$ is the $d \times d$ identity, and the mean $\mu^* \in \mathbb{R}^d$ of the rare component satisfies
$\|\mu^*\|^2 = R,$
for some known radius $R \gg 1$. The direction of $\mu^*$ is unknown.
Suppose our model $q_\theta(x)$ has the same form with parameter $\theta = \mu$, i.e.
$q_\theta(x) = (1 - \epsilon) \mathcal{N}(x; 0, I_d) + \epsilon \mathcal{N}(x; \theta, I_d),$
and we use generalized score matching with a matrix-valued weight $A(x) \in \mathbb{R}^{d \times d}$.
$D_A(P_{data}||q_\theta) = E_{x \sim P_{data}} || A(x) (\nabla_x \log P_{data}(x) - \nabla_x \log q_\theta(x)) ||^2.$
### Visual Description
Text-only slide with several mathematical equations and bullet points.
---

## Page 30
### Content
10-708 Page 30 of 46

Give a qualitative argument (i.e. words only, no math/proofs needed) for why the unweighted choice $A(x) = I_d$ may be statistically inefficient for estimating $\mu^*$ when $\epsilon$ is small and $R \gg 1$. Furthermore, state some natural properties a good $A(x)$ might have in this setting. You can consider specifically rotationally symmetric choice $A(x) = a(||x||_2) I_d$ with a scalar weight $a(\cdot)$ that depends only on radius. Justify (in words) your answer.

**Inefficiency of $A(x) = I_d$.** When $\epsilon$ is small, almost all samples come from the central Gaussian $\mathcal{N}(0, I_d)$; only a tiny fraction come from the rare component $\mathcal{N}(\mu^*, I_d)$ far out near $||\mu^*|| \le R$. In the unweighted case $A(x) = I_d$, the loss
$E_{P_{data}} || \nabla_x \log P_{data}(x) - \nabla_x \log q_\theta(x) ||^2$
gives equal weight to all samples drawn from $P_{data}$. Most of these lie near the origin, where the mixture score is dominated by the central component and changes in $\mu$ have only a very small effect. Thus the loss is dominated by many "uninformative" central samples, and the few rare samples near $\mu^*$ have very little influence, making estimation of $\mu^*$ statistically inefficient.

We would like $A(x)$ to:
* **Downweight the origin region:** For $||x||_2$ small (where the central component dominates and the score carries little information about $\mu^*$), $A(x)$ should be
### Visual Description
Text-only slide with bullet points and a large empty white box in the middle.
---

## Page 31
### Content
10-708 Page 31 of 46

small in norm (e.g., $a(||x||_2) \approx 0$ if $A(x) = a(||x||_2)I_d$).
* **Upweight the tail region:** For radii $||x||_2^2$ comparable to where the rare component lives (e.g., $||x||_2$ not too far below $R$), $A(x)$ should have larger norm (e.g., $a(||x||_2)$ increasing with $||x||_2$), so that points likely from the rare component contribute strongly to the loss.
* **Be rotationally symmetric:** Since the direction of $\mu^*$ is unknown, a natural choice is $A(x) = a(||x||_2)I_d$, depending only on $||x||_2$, so that all directions at the same radius are treated equally and no particular direction is privileged.
For example, one might choose $a(r)$ to be near 0 for $r$ in a small ball around the origin and increasing to 1 for $r$ above some threshold (or a smooth version of this).
With such an $A(x)$, the generalized score matching loss effectively replaces the unweighted error $||\nabla_x \log P_{data}(x) - \nabla_x \log q_\theta(x)||^2$ by
$|| A(x) (\nabla_x \log P_{data}(x) - \nabla_x \log q_\theta(x)) ||^2,$
which scales roughly like $a(||x||_2)^2$ times the squared score error when $A(x) = a(||x||_2)I_d$. Points near the origin (from the central component) have $a(||x||_2) \approx 0$ and therefore contribute very little to the loss, while points with large $||x||_2$ (where the rare component lives) have $a(||x||_2)$ close to its maximum and thus contribute much more. In this way, the generalized objective is driven primarily by samples from the rare, far component, making it more effective for learning $\mu^*$ than the unweighted version.

5. In this problem we look at a very simple 1D example to compare the behavior of a Jensen-Shannon (JS) loss-based GANs (as used in DC-GAN) and the Wasserstein loss-based GANs (as used in W-GAN).
Let the true data distribution be $p(x) = \text{Unif}[0, 1]$ and consider a parametrized generator family given by $p_m(x) = \text{Unif}[m, m+1]$, where $m \in \mathbb{R}$ is a scalar parameter (which is the parameter being learned). Thus the generator simply learns a distribution supported on a unit interval with a learned left end. Note that $p_m$ has the same shape as $p$, but when $|m| \ge 1$ the supports are disjoint. We will compare two GAN losses:
* the Jensen-Shannon divergence $JSD(p||p_m)$ (used by DC-GAN),
* the Wasserstein-1 distance $W_1(p, p_m)$ (used by W-GAN).
To keep the calculations simple, in the subsequent parts assume $|m| > 1$ so that the supports $[0, 1]$ and $[m, m+1]$ are disjoint.

(a) (3 points) Let the current guess for the generator be $p_m$. Write down the JS loss, used by DC-GANs in the limit of an optimal discriminator.
### Visual Description
Text-only slide with bullet points and mathematical expressions.
---

## Page 32
### Content
10-708 Page 32 of 46

$JSD(p||p_m) := \frac{1}{2} KL(p || M) + \frac{1}{2} KL(q || M),$
$M := \frac{1}{2}(p + p_m).$
### Visual Description
Text-only slide with two mathematical equations highlighted in red.
---
## Page 33
### Content
10-708 Page 33 of 46
(b) (3 points) For $|m| > 1$, the supports of $p$ and $p_m$ are disjoint. Compute the value of JSD($p||p_m$).

When $p = \text{Unif}[0,1]$ and $p_m = \text{Unif}[m, m + 1]$ with $|m| > 1$, the supports do not overlap:
$\text{supp}(p) = [0, 1]$,
$\text{supp}(p_m) = [m, m + 1]$,
and these intervals are disjoint.
On $[0, 1]$ we have $p(x) = 1$ and $p_m(x) = 0$, so
$M(x) = \frac{1}{2}p(x) + \frac{1}{2}p_m(x) = \frac{1}{2} \cdot 1 + \frac{1}{2} \cdot 0 = \frac{1}{2}$.
On $[m, m + 1]$ we have $p(x) = 0$ and $p_m(x) = 1$, so
$M(x) = \frac{1}{2} \cdot 0 + \frac{1}{2} \cdot 1 = \frac{1}{2}$.
Outside $[0, 1] \cup [m, m + 1]$, all densities are zero and contribute nothing.
### Visual Description
The page contains a question (b) about computing JSD for disjoint supports, followed by a large blank white box. Below the box, the solution begins with text explaining the setup of uniform distributions and their disjoint supports, and then calculates the mixture distribution $M(x)$ in different regions.
---
## Page 34
### Content
10-708 Page 34 of 46
Therefore,
$\text{KL}(p || M) = \int_0^1 1 \cdot \log \frac{1}{1/2} dx = \int_0^1 \log 2 dx = \log 2$,
and similarly
$\text{KL}(p_m || M) = \int_m^{m+1} 1 \cdot \log \frac{1}{1/2} dx = \log 2$.
Hence
$\text{JSD}(p||p_m) = \frac{1}{2}(\log 2 + \log 2) = \log 2$
for every $m$ such that $|m| > 1$.
### Visual Description
The page continues the solution from the previous page, showing the calculation of KL divergence for $p$ and $p_m$ with respect to $M$, and then combines them to find the JSD value. The content is primarily mathematical equations and explanatory text.
---
## Page 35
### Content
10-708 Page 35 of 46
(c) (3 points) Let $L_{\text{JS}}(m) := \text{JSD}(p||p_m)$ be the generator loss for the JS-based GAN. Compute the derivative $\frac{d}{dm}L_{\text{JS}}(m)$ for $|m| > 1$.
What does this tell you about the gradient signal available to a generator trained by gradient descent when the generator distribution $p_m$ is far away from the data distribution (i.e., when $|m| > 1$)? Explain briefly in words what the practical problem is.

For all $m$ with $|m| \ge 1$, we just showed that
$L_{\text{JS}}(m) = \text{JSD}(p||p_m) = \log 2$,
a constant independent of $m$. Therefore
$\frac{d}{dm}L_{\text{JS}}(m) = 0$ for all $|m| > 1$.
### Visual Description
The page presents question (c) which asks to compute the derivative of the JS-based GAN loss and explain its implications. A large blank white box occupies the middle of the page. Below the box, the solution starts by stating that the loss is a constant and thus its derivative is zero.
---
## Page 36
### Content
10-708 Page 36 of 46
This means that when the generator distribution $p_m$ is far away from the data distribution (disjoint supports), the JS-based GAN objective provides no gradient signal with respect to $m$: gradient descent “sees” a flat landscape. In practice, this is one aspect of why JS-based GANs (like DC-GAN) can suffer from vanishing gradients when the generator and data supports barely overlap: the generator has no direction in which to move to reduce the loss.
### Visual Description
Text-only slide.
---
## Page 37
### Content
10-708 Page 37 of 46
(d) (4 points) For W-GAN, the generator is instead trained to minimize the Wasserstein-1 distance
$W_1(P,P_m) = \sup_{\substack{f:\mathbb{R}\to\mathbb{R} \\ \text{Lip}(f)\le 1}} (\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)])$,
where the supremum is over all 1-Lipschitz functions $f$, i.e. functions satisfying $|f(x) - f(y)| \le |x - y|$ for all $x, y \in \mathbb{R}$.
Show that the function $f(x) = -x$ is 1-Lipschitz and show that this choice of $f$ yields:
$W_1(P,P_m) \ge \mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)] = m$ for $m > 0$.
Similarly, consider the critic $f(x) = x$, show that it is 1-Lipschitz and that this choice of critic yields
$W_1(P,P_m) \ge |m|$ for $m < 0$.
Conclude that for all $m \in \mathbb{R}$ we have:
$W_1(P,P_m) \ge |m|$.
### Visual Description
The page introduces question (d) regarding the Wasserstein-1 distance in W-GANs. It defines $W_1(P,P_m)$ and asks to show that specific choices of 1-Lipschitz functions lead to $W_1(P,P_m) \ge m$ for $m>0$ and $W_1(P,P_m) \ge |m|$ for $m<0$, concluding with $W_1(P,P_m) \ge |m|$ for all $m$. A large blank white box is present in the lower half of the page.
---
## Page 38
### Content
10-708 Page 38 of 46
For $m > 0$, consider $f(x) = -x$. Then
$|f(x) - f(y)| = | -x - (-y)| = |x - y|$,
so $f$ is 1-Lipschitz. With $p = \text{Unif}[0, 1]$ and $p_m = \text{Unif}[m, m + 1]$, we have
$\mathbb{E}_{X\sim p}[f(X)] = \mathbb{E}[-X] = -\frac{1}{2}$,
and
$\mathbb{E}_{Y\sim p_m}[f(Y)] = \mathbb{E}[-Y] = -\mathbb{E}[Y] = -(m + \frac{1}{2})$.
Hence
$\mathbb{E}_p[f(X)] - \mathbb{E}_{p_m}[f(Y)] = -\frac{1}{2} - (-(m + \frac{1}{2})) = m$.
By definition of the supremum,
$W_1(P, P_m) = \sup_{\text{Lip}(f)\le 1} (\mathbb{E}_p[f] - \mathbb{E}_{p_m}[f]) \ge m$ for $m > 0$.
For $m < 0$, consider $f(x) = x$. Then again $|f(x)-f(y)| = |x-y|$, so $f$ is 1-Lipschitz.
Now
$\mathbb{E}_p[f(X)] = \mathbb{E}[X] = \frac{1}{2}$,
$\mathbb{E}_{p_m}[f(Y)] = \mathbb{E}[Y] = m + \frac{1}{2}$,
hence
$\mathbb{E}_p[f(X)] - \mathbb{E}_{p_m}[f(Y)] = \frac{1}{2} - (m + \frac{1}{2}) = -m$.
Thus
$W_1(P,P_m) \ge -m = |m|$ for $m < 0$.
Combining, we obtain
$W_1(p,p_m) \ge |m|$ for all $m \in \mathbb{R}$.
### Visual Description
The page provides the solution for question (d), demonstrating the 1-Lipschitz property for $f(x)=-x$ and $f(x)=x$, and calculating the expected differences for $m>0$ and $m<0$ respectively. It then uses the definition of the Wasserstein-1 distance to show $W_1(P,P_m) \ge |m|$ for both cases, leading to the final conclusion.
---
## Page 39
### Content
10-708 Page 39 of 46
(e) (4 points) Show that for any $f$, we have:
$\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)] = \int_0^1 (f(u) - f(m + u)) du$.
From this, conclude that for any such $f$:
$\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)] \le |m|$.
Conclude that
$W_1(P, P_m) = \sup_{\text{Lip}(f)\le 1} (\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)]) \le |m|$.
Justify clearly which property you are using at each step.
### Visual Description
The page presents question (e), asking to show an integral identity for the difference of expectations and then use it to conclude an upper bound for the difference and for the Wasserstein-1 distance. A large blank white box occupies the lower half of the page, where the solution is expected to be written.
---
## Page 40
### Content
10-708 Page 40 of 46
For any 1-Lipschitz $f$,
$\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)] = \int_0^1 f(x) dx - \int_m^{m+1} f(y) dy$.
With the change of variables $y = m + u$ in the second integral,
$\mathbb{E}_{X\sim p}[f(X)] - \mathbb{E}_{Y\sim p_m}[f(Y)] = \int_0^1 f(u) du - \int_0^1 f(m+u) du = \int_0^1 (f(u) - f(m+u)) du$.
By the 1-Lipschitz property,
$|f(u) - f(m + u)| \le |u - (m + u)| = |m|$
$\Rightarrow f(u) - f(m + u) \le |m|$ for all $u \in [0, 1]$. Therefore
$\mathbb{E}_p[f(X)] - \mathbb{E}_{p_m}[f(Y)] = \int_0^1 (f(u) - f(m + u)) du \le \int_0^1 |m| du = |m|$.
Since this holds for every 1-Lipschitz $f$,
$W_1(p, P_m) = \sup_{\text{Lip}(f)\le 1} (\mathbb{E}_p[f] - \mathbb{E}_{p_m}[f]) \le |m|$.
### Visual Description
The page provides the solution for question (e). It starts by expressing the difference of expectations as integrals, then performs a change of variables to combine them into a single integral. It then applies the 1-Lipschitz property of $f$ to bound the integrand, leading to the conclusion that the difference of expectations is less than or equal to $|m|$, and finally, that $W_1(p, P_m) \le |m|$.
---
## Page 41
### Content
(f) (2 points) Combining this with Part (i), show that $W_1(p, p_m) = |m|$ for all $m \in \mathbb{R}$.

Follows from combining upper and lower bound immediately.
### Visual Description
A question (f) asking to show a property of $W_1(p, p_m)$, followed by a short answer.
---
## Page 42
### Content
(g) (3 points) Define the W-GAN generator loss as $L_W(m) := W_1(p, p_m) = |m|$. Compute its derivative for $m > 0$ and for $m < 0$, and compare this behavior to the JS-based loss $L_{JS}(m)$ from Part 1. Briefly explain why, even when the supports are disjoint (i.e., $|m| \ge 1$), the W-GAN objective still provides a meaningful gradient signal.

For $m > 0$,
$$ \frac{d}{dm} L_W(m) = \frac{d}{dm} |m| = 1, $$
and for $m < 0$,
$$ \frac{d}{dm} L_W(m) = \frac{d}{dm} |m| = -1. $$
(At $m = 0$ the derivative does not exist, but any subgradient in $[-1,1]$ is valid; this corresponds to the minimum.)
### Visual Description
A question (g) defining W-GAN generator loss and asking for its derivative and comparison to JS-based loss. Below the question, the derivatives for $m > 0$ and $m < 0$ are provided, followed by a parenthetical note.
---
## Page 43
### Content
In contrast, the JS-based loss from Part 1 was flat for $|m| \ge 1$, with $\frac{d}{dm} L_{JS}(m) = 0$ in that regime, providing no gradient signal when the generator and data supports are disjoint. Here, the Wasserstein loss is linear in $|m|$ and has a nonzero gradient for every $m \ne 0$:
* If $m > 0$ (the generator interval is shifted to the right), then $\frac{d}{dm} L_W(m) = 1$, so gradient descent moves $m$ left toward 0.
* If $m < 0$ (the generator interval is shifted to the left), then $\frac{d}{dm} L_W(m) = -1$, so gradient descent moves $m$ right toward 0.

Thus, even when the supports are completely disjoint (e.g. $|m| \ge 1$), the W-GAN objective still provides a meaningful, nonvanishing gradient that pulls the generator towards the data distribution, resolving the “no gradient when supports are disjoint" problem of the JS-based GAN loss.
### Visual Description
Text-only slide.
---
## Page 44
### Content
Do not remove this page! Use this page for scratch work.
### Visual Description
A blank page with a header and a single sentence in the middle.
---
## Page 45
### Content
Do not remove this page! Use this page for scratch work.
### Visual Description
A blank page with a header and a single sentence in the middle.
---
## Page 46
### Content
Do not remove this page! Use this page for scratch work.
### Visual Description
A blank page with a header and a single sentence in the middle.
---
