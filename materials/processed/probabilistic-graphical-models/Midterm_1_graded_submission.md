# Midterm_1_graded_submission

Source: `materials/archive/Midterm_1_graded_submission.pdf`
Duplicate equivalents: `Midterm_1_graded_submission.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 25

## Page 1
### Content
Midterm
Student
Saahith Janapati
Total Points
37/70 pts

Question 1
Question 1: Bayesian Network
6/7 pts

1.1 1.a
- 0 pts Correct:
$B, C, E$.
- 1 pt Missed 1 node
3/3 pts

1.2 1.b
- 0 pts Correct:
False, because $A, B, C$ forms a v-structure.
- 1 pt Incorrect
1/1 pt

1.3 1.c
- 0 pts Correct:
False. There is a v-structure (descendant of C is observed)
- 1 pt Incorrect
1/1 pt

1.4 1.d
- 0 pts Correct:
True.
- 1 pt Incorrect
1/1 pt

1.5 1.e
- 0 pts Correct:
False. The path, $D, B, C, F$, is not blocked.
- 1 pt Incorrect
0/1 pt
### Visual Description
The page displays a graded midterm submission. It shows the student's name, total points, and the first question with multiple sub-parts. Each sub-part includes the question number, the student's answer, a correctness indicator (0 pts Correct), the correct answer or explanation, and a grade (e.g., 3/3 pts, 1/1 pt, 0/1 pt). There are also feedback comments like "Missed 1 node" or "Incorrect". Text-only slide.

---
## Page 2
### Content
Question 2
Question 2: Undirected Graphical Model
7/7 pts

2.1 2.a
- 0 pts Correct:
$B, C, D, F$
3/3 pts

2.2 2.b
- 0 pts Correct:
- 3 pts Incorrect
3/3 pts

2.3 2.c
- 0 pts Correct:
False, because the path $A, F, E, B$ is not blocked.
- 1 pt Incorrect
1/1 pt
### Visual Description
The page displays Question 2, focusing on an Undirected Graphical Model. It includes sub-questions 2.1, 2.2, and 2.3, each with a grade and feedback. The central part of the page is dominated by a large diagram of an undirected graphical model. The graph consists of six nodes labeled A, B, C, D, E, F, connected by edges. Some edges have small black squares on them, possibly indicating factors or specific types of connections.

---
## Page 3
### Content
Question 3
Question 3: Markov Chain
3/3 pts
- 0 pts Correct:
2 is correct. Clearly, there is no path from $\{1, 2, 3\}$ to 4, so it is not irreducible. Also, we can easily check that it is aperiodic.
- 1.5 pts A Selected
- 1.5 pts B Not Selected

Question 4
Question 4: MALA
1/1 pt
- 0 pts Correct:
False
- 1 pt Incorrect

Question 5
Question 5: Metropolis Hastings
0/1 pt
- 0 pts Correct:
False, the conductance depends on the specific chain.
- 1 pt Incorrect

Question 6
Question 6: Gibbs Sampling
0/1 pt
- 0 pts Correct:
True, the chain just may stop being ergodic.
- 1 pt Incorrect

Question 7
Question 7: Simulated Tempering Intuition
1/1 pt
- 0 pts Correct:
False
- 1 pt Incorrect

Question 8
Question 8: Simulated Tempering Distribution
1/1 pt
- 0 pts Correct:
True, the other temperatures change the mixing time.
- 1 pt Incorrect
### Visual Description
The page presents a series of graded questions (Questions 3 through 8), each with a title related to a specific concept (e.g., Markov Chain, MALA, Metropolis Hastings, Gibbs Sampling, Simulated Tempering). For each question, the student's answer is marked as correct (0 pts Correct) or incorrect, followed by an explanation or the correct answer. Grades (e.g., 3/3 pts, 1/1 pt, 0/1 pt) are provided for each question. Text-only slide.

---
## Page 4
### Content
Question 9
Question 9: Gibbs Sampler - Systematic Scan
8/16 pts

9.1 9.a
- 0 pts Correct:
Direct calculation shows:
$\pi(x_2 = 0) = 0.4 + 0.1 = 0.5$,
$\pi(x_2 = 1) = 0.1 + 0.4 = 0.5$,
so
$\pi(x_1 = 1 | x_2 = 0) = \frac{0.1}{0.5} = 0.2$,
$\pi(x_1 = 1 | x_2 = 1) = \frac{0.4}{0.5} = 0.8$.
Similarly,
$\pi(x_1 = 0) = 0.4 + 0.1 = 0.5$,
$\pi(x_1 = 1) = 0.1 + 0.4 = 0.5$,
so
$\pi(x_2 = 1 | x_1 = 0) = \frac{0.1}{0.5} = 0.2$,
$\pi(x_2 = 1 | x_1 = 1) = \frac{0.4}{0.5} = 0.8$.
4/4 pts
- 1 pt Minor calculation mistakes but correct logic / Mostly complete but doesn't arrive at correct final answer
- 2 pts Did not normalize / half of solution is correct
- 3 pts Major mistakes / Incorrect logic / Mostly incomplete
- 4 pts Missing solution
### Visual Description
The page displays Question 9, specifically sub-part 9.a, which deals with Gibbs Sampler - Systematic Scan. The content includes a detailed step-by-step calculation of conditional probabilities $\pi(x_2=0)$, $\pi(x_2=1)$, $\pi(x_1=1|x_2=0)$, $\pi(x_1=1|x_2=1)$, $\pi(x_1=0)$, $\pi(x_1=1)$, $\pi(x_2=1|x_1=0)$, and $\pi(x_2=1|x_1=1)$. The calculations involve fractions and decimal values. Below the solution, there are various feedback comments regarding common errors and their corresponding point deductions. Text-only slide.

---
## Page 5
### Content
9.2 9.b
- 0 pts Correct:
One sweep updates $x_1$ given $x_2$, then updates $x_2$ given the new $x_1$.
From $(0, 0)$: first update uses $x_2 = 0$, so $x'_1 = 0$ w.p. 0.8 and $x'_1 = 1$ w.p. 0.2.
If $x'_1 = 0$, then $x''_2 = 0$ w.p. 0.8 and $x''_2 = 1$ w.p. 0.2.
If $x'_1 = 1$, then $x''_2 = 0$ w.p. 0.2 and $x''_2 = 1$ w.p. 0.8.
Thus
$P((0,0), \cdot) = (0.64, 0.16, 0.04, 0.16)$.
From $(0, 1)$ we have $x_2 = 1$, so $x'_1 = 0$ w.p. 0.2 and $x'_1 = 1$ w.p. 0.8, hence
$P((0, 1), \cdot) = (0.16, 0.04, 0.16, 0.64)$.
By the same reasoning, rows depend only on $x_2$, so
$P((1,0), \cdot) = (0.64, 0.16, 0.04, 0.16)$,
$P((1, 1), \cdot) = (0.16, 0.04, 0.16, 0.64)$.
Therefore
$P= \begin{pmatrix}
0.64 & 0.16 & 0.04 & 0.16 \\
0.16 & 0.04 & 0.16 & 0.64 \\
0.64 & 0.16 & 0.04 & 0.16 \\
0.16 & 0.04 & 0.16 & 0.64
\end{pmatrix}$
2/4 pts
- 1 pt Minor calculation errors OR Mostly correct logic
- 2 pts Substantial error + unclear logic OR mismatched rows & cols OR mostly correct logic + only partially complete
- 3 pts Major calculation errors OR mostly incorrect logic but attempted
- 4 pts Blank / almost completely missing
1 0.8*0.2=0.16
### Visual Description
The page presents Question 9.b, which involves calculating a transition matrix P for a Gibbs Sampler. It details the steps for one sweep, updating $x_1$ given $x_2$ and then $x_2$ given the new $x_1$. Conditional probabilities are used to derive the rows of the transition matrix $P((0,0), \cdot)$, $P((0,1), \cdot)$, $P((1,0), \cdot)$, and $P((1,1), \cdot)$. The final result is a $4 \times 4$ matrix $P$ with decimal entries. Below the solution, there are various feedback comments regarding calculation errors, logic, and completeness. Text-only slide.

---
## Page 6
### Content
9.3 9.c
- 0 pts Correct:
Let $T_1$ be the transition matrix that updates $x_1$ given $x_2$ (coordinate 1 Gibbs step), and $T_2$ the transition matrix that updates $x_2$ given $x_1$. The standard Gibbs-step argument shows $T_1$ and $T_2$ each satisfy detailed balance with $\pi$, hence each has $\pi$ as a stationary distribution:
$\pi T_1 = \pi$ and $\pi T_2 = \pi$.
One full sweep is $P = T_1 T_2$, hence
$\pi P = \pi(T_1 T_2) = (\pi T_1) T_2 = \pi T_2 = \pi$,
so $\pi$ is stationary for $P$.
A direct calculation also is acceptable as an answer.
0/4 pts
- 2 pts Insufficient explanation
- 4 pts Incorrect
- 2 pts Incorrect Calculations

9.4 9.d
- 0 pts Correct:
To disprove reversibility, take $x = (0,0)$ and $y = (0, 1)$.
From the matrix (or by direct multiplication of conditional probabilities),
$P(x, y) = 0.16$, $P(y, x) = 0.16$.
Then
$\pi(x)P(x, y) = 0.4 \cdot 0.16 = 0.064$,
$\pi(y)P(y, x) = 0.1 \cdot 0.16 = 0.016$,
which are not equal. Hence detailed balance fails and $P$ is not reversible w.r.t. $\pi$.
This does not contradict (c) because stationarity ($\pi P = \pi$) does not imply detailed balance --- which is sufficient but not necessary for stationarity.
2/4 pts
- 4 pts Incorrect
- 1 pt Minor Error
- 2 pts Incorrect Explanation
- 2 pts Incorrect states
### Visual Description
The page contains two sub-questions, 9.c and 9.d, related to Gibbs Sampler properties. Question 9.c explains why $\pi$ is stationary for $P = T_1 T_2$, involving transition matrices $T_1$ and $T_2$ and detailed balance. Question 9.d disproves reversibility by showing that $\pi(x)P(x,y) \neq \pi(y)P(y,x)$ for specific states $x=(0,0)$ and $y=(0,1)$, and clarifies that stationarity does not imply detailed balance. Both sections include mathematical expressions and explanations, followed by grading feedback. Text-only slide.

---
## Page 7
### Content
Question 10
Question 10: Metropolis-Hastings independent sampler
0/15 pts

10.1 10.a
- 0 pts Correct: showing detailed balance
- 0 pts Correct:
For Metropolis-Hastings with proposal kernel $q(x, y)$, the acceptance probability is
$\alpha(x,y) = \min \left\{1, \frac{\pi(y) q(y,x)}{\pi(x) q(x,y)}\right\}$.
In the independent sampler, the proposal is $Y \sim r$ regardless of the current state $x$, so
$q(x, y) = r(y)$ and $q(y,x) = r(x)$.
Substituting into the MH formula yields
$\alpha(x, y) = \min \left\{1, \frac{\pi(y)r(x)}{\pi(x)r(y)}\right\}$,
as desired.
0/3 pts
- 3 pts No answer
- 2 pts Incorrect
- 3 pts You wrote the acceptance probability, but did not prove it.
- 2 pts You did not use the independence of the sampler, and the derivation is incorrect.

10.2 10.b
- 0 pts Correct:
Irreducible: For any $x, y$, the probability to propose $y$ from any $x$ is $r(y) > 0$, and the acceptance probability is $\alpha(x, y) > 0$ because $\pi, r$ have full support, so $P(x, y) > 0$. Hence irreducible.
Aperiodic: $P(x, x) \ge r(x) > 0$ gives a self-loop at every state, hence aperiodic.
0/4 pts
- 4 pts Incorrect or blank
- 1 pt Error
- 2 pts Two errors
- 2 pts Incorrect aperiodic argument
- 2 pts Incorrect irreducible argument
+ 1 pt Partial credit for definitions
### Visual Description
The page presents Question 10, focusing on the Metropolis-Hastings independent sampler. Sub-question 10.a provides a derivation for the acceptance probability $\alpha(x,y)$, starting from the general Metropolis-Hastings formula and substituting the properties of an independent sampler where $q(x,y)=r(y)$. Sub-question 10.b explains the irreducibility and aperiodicity of the chain, citing conditions like $r(y)>0$ and $P(x,x) \ge r(x) > 0$. Both sections include mathematical formulas and explanations, followed by grading feedback. Text-only slide.

---
## Page 8
### Content
10.3 10.c
- 0 pts Correct:
From part (a),
$\alpha(x, y) = \min \left\{1, \frac{\pi(y)r(x)}{\pi(x)r(y)}\right\}$.
Since $\pi$ is uniform on $\{0, 1\}^d$, we have $\pi(x) = \pi(y) = 2^{-d}$ for all $x, y$.
Therefore,
$\frac{\pi(y) r(x)}{\pi(x)r(y)} = \frac{2^{-d}r(x)}{2^{-d}r(y)} = \frac{r(x)}{r(y)}$.
Hence
$\alpha(x, y) = \min\left\{1, \frac{r(x)}{r(y)}\right\}$.
0/2 pts
- 2 pts No Answer
- 2 pts Incorrect
- 1 pt Incomplete answer

10.4 10.d
- 1.5 pts Explanation does not describe the difference between "typical" configurations under pi and MH. Also includes saying something about the bias of r but only noting that some particular states are hard to reach.
- 1.5 pts Explanation does not describe why the difference in "typical" configuration exacerbates the mixing time under large d. Also includes being vague about "curse of dimensionality" but not saying anything about the specific case in the problem.
- 0 pts Correct:
Under the target distribution $\pi$ (uniform on $\{0, 1\}^d$), a typical configuration has about half of its coordinates equal to 1. That is, most of the probability mass of $\pi$ lies on strings with roughly $d/2$ ones.
Under the proposal distribution $r$, each coordinate equals 1 with probability 1/4, so a typical draw from $r$ has only about $d/4$ ones.
Thus the proposal distribution concentrates on configurations that look very different from those typical under $\pi$.
The MH sampler proposes entire configurations at once. Therefore, to move from a low-weight configuration (around $d/4$ ones) to a typical configuration under $\pi$ (around $d/2$ ones), the proposal must produce a string with many more 1's than it usually does. Such configurations are extremely atypical under $r$ for large $d$ by concentration.
As a result, the chain rarely proposes states that look typical under $\pi$. Even though the acceptance probability for those states may be high, the proposals themselves almost never land there. Hence the chain takes an extremely long time to reach the bulk of the target distribution, and therefore mixes very slowly in high dimension.
0/3 pts
- 3 pts Incorrect or vague or missing.
- 0.5 pts Explanation does not explain the effect of the independence of r
- 0.5 pts Minor point
### Visual Description
The page continues Question 10 with sub-questions 10.c and 10.d. Question 10.c derives the acceptance probability $\alpha(x,y)$ for a Metropolis-Hastings independent sampler when the target distribution $\pi$ is uniform on $\{0,1\}^d$. It simplifies the formula to $\min\{1, r(x)/r(y)\}$. Question 10.d provides a detailed explanation of why the Metropolis-Hastings independent sampler mixes slowly in high dimensions. It contrasts typical configurations under the target distribution $\pi$ (around $d/2$ ones) with those under the proposal distribution $r$ (around $d/4$ ones), explaining how this mismatch leads to rare proposals of typical states and slow mixing. Both sections include mathematical expressions and extensive textual explanations, followed by grading feedback. Text-only slide.
## Page 9
### Content
10.5 10.e
0/3 pts
- 0 pts Correct:
After coordinate $i$ gets updated, it becomes uniform in $\{0, 1\}$ and independent from any of the other coordinates. Thus, after one full sweep, each coordinate is uniform in $\{0,1\}$ and independent from all the others --- which just means we've sampled from the uniform distribution.
- 1 pt Minor mistakes in explanation
- 2 pts Major mistakes in explanation / does not explain why stationary distribution reached (i.e. due to coordinates being independent and due to one update of a coordinate correctly setting the distribution of that coordinate)
- 3 pts Missing / Minimal / Vague / Incorrect
### Visual Description
Text-only slide. It presents a question (10.e) with a score of 0/3 pts and provides detailed feedback in bullet points, indicating correct and incorrect aspects of an explanation.

---

## Page 10
### Content
Question 11
Question 11:
1/8 pts
- 0 pts Correct:
Fix an arbitrary graph $G$ and let $\backslash Cc(G)$ denote its set of maximal cliques.
A basic fact is that \emph{every vertex belongs to at least one maximal clique}: starting from the clique $\{i\}$, we can keep adding vertices while maintaining the clique property until it is maximal. Hence, for every $i \in [n]$, the quantity
$m_i := |\{C \in \backslash Cc(G) : i \in C \}|$
is a positive integer ($m_i \ge 1$).

Define for each maximal clique $C \in \backslash Cc(G)$ the clique log-potential
$\Psi_C(\mathbf{x}_{V_C})$
$:= \sum_{i \in C} \frac{1}{m_i} \phi_i(\mathbf{x}_{V_i})$.
Then summing over all maximal cliques yields
$\sum_{C \in \backslash Cc(G)} \Psi_C(\mathbf{x}_{V_C}) = \sum_{C \in \backslash Cc(G)} \sum_{i \in C} \frac{1}{m_i} \phi_i(\mathbf{x}_{V_i}) = \sum_{i=1}^n \left( \frac{1}{m_i} \phi_i(\mathbf{x}_{V_i}) \right) \cdot |\{C \in \backslash Cc(G) : i \in C \}| = \sum_{i=1}^n \phi_i(\mathbf{x}_{V_i})$.
Therefore,
$\exp \left( \sum_{C \in \backslash Cc(G)} \Psi_C(\mathbf{x}_{V_C}) \right) = \exp \left( \sum_{i=1}^n \phi_i(\mathbf{x}_{V_i}) \right)$,
so the factorization (3) holds with the above choice of $\{\Psi_C\}_{C \in \backslash Cc(G)}$.
(There are many valid choices: any set of weights $\{w_{C,i}\}$ with $w_{C,i} = 0$ if $i \notin C$ and $\sum_{C \ni i} w_{C,i} = 1$ for each $i$ gives a valid construction via $\Psi_C(\mathbf{x}_{V_C}) = \sum_{i \in C} w_{C,i} \phi_i(\mathbf{x}_{V_i})$.)

- 0 pts Correct:
Assigns each potential function to a clique and justifies existence that clique exists
- 1 pt Minor Error
- 3 pts Sums to correct result but does not give explicit construction
- 4 pts Major Error in Construction
- 4 pts Needs More Detailed Construction
- 7 pts Explicit Expression given does not sum to correct result
- 7 pts Does not provide explicit construction
- 7 pts Major Proof Mistakes
- 8 pts No Answer
- Does not provide explicit construction
### Visual Description
A text-heavy slide presenting a solution and grading criteria for Question 11. It includes definitions of maximal cliques and log-potentials, followed by mathematical derivations and a proof of factorization. Below the solution, there's a list of bulleted grading feedback options, with one option "Does not provide explicit construction" highlighted.

---

## Page 11
### Content
Question 12
Question 12:
9/9 pts
- 0 pts Correct:
Let the decomposition tree $T$ be a path on nodes $t_1, t_2, \dots, t_{n-2}$:
$t_1 - t_2 - \dots - t_{n-2}$.
Define bags
$B_{t_i} := \{v_1, v_{i+1}, v_{i+2}\}$
for $i = 1, 2, \dots, n - 2$.
(So $B_{t_1} = \{v_1, v_2, v_3\}$, $B_{t_2} = \{v_1, v_3, v_4\}$, ..., $B_{t_{n-2}} = \{v_1, v_{n-1}, v_n\}$.)
We verify the tree decomposition conditions:
(Cover) Every vertex appears in at least one bag:
$v_1$ appears in all bags; $v_2$ appears in $B_{t_1}$; for $3 \le k \le n - 1$, $v_k$ appears in $B_{t_{k-2}}$ and $B_{t_{k-1}}$; and $v_n$ appears in $B_{t_{n-2}}$. Hence $\bigcup_i B_{t_i} = \{v_1, \dots, v_n\}$.
(Edge) Every edge is contained in some bag:
- The edge $(v_1, v_2)$ is contained in $B_{t_1} = \{v_1, v_2, v_3\}$.
- For $i = 2, \dots, n - 1$, the edge $(v_i, v_{i+1})$ is contained in $B_{t_{i-1}} = \{v_1, v_i, v_{i+1}\}$.
- The edge $(v_n, v_1)$ is contained in $B_{t_{n-2}} = \{v_1, v_{n-1}, v_n\}$.
Thus the edge condition holds.
(Running intersection) Fix a vertex and check that the set of bags containing it is connected in $T$:
- For $v_1$, the set of nodes $\{t_i : v_1 \in B_{t_i} \}$ is all of $V(T)$, which is connected.
- For $v_2$, it appears only in $B_{t_1}$, so the set is $\{t_1\}$, connected.
- For $3 \le k \le n - 1$, $v_k$ appears exactly in $B_{t_{k-2}}$ and $B_{t_{k-1}}$, which are adjacent along the path, hence connected.
- For $v_n$, it appears only in $B_{t_{n-2}}$, connected.
Therefore $(T, \{B_{t_i}\})$ is a valid tree decomposition. Every bag has size 3, as we needed.
There are other valid tree decompositions as well --- all that are correct are accepted.

- 4 pts Argued that there is an elimination order that produces no cliques of size > 3. This shows that treewidth is 2, but the question asks for a tree decomposition (which is either not provided or incorrect)
- 9 pts Tree decomposition provided is incorrect
- 2 pts Correct decomposition, but running intersection property not argued.
- 1 pt Correct decomposition, but containment of edges or vertices in a subset/bag not argued.
- 3 pts Mostly on the right trajectory, but something essential missing.
### Visual Description
Text-only slide. It presents a detailed solution for Question 12, defining a tree decomposition for a path graph, specifying bags, and verifying the cover, edge, and running intersection properties. Below the solution, there are bulleted grading feedback options.

---

## Page 12
### Content
10-708 Probabilistic Graphical Models
Spring 2026
Midterm
02/25/26
Time Limit: 80 minutes

Name: Saahith Janapati
Andrew ID: Sjanapat

Instructions:
- Please fill in your name and Andrew ID above. Be sure to write neatly so that you receive credit for your answers.
- This exam contains 13 pages (including this cover page). There are 12 questions. The total number of points is 70.
- You are allowed to use one page of notes, single sided only.
- If you have made a mistake, cross out the invalid parts of your solution, and circle the parts which should be graded.
- Look over the exam first to make sure that none of the 13 pages are missing. The last page is left blank for your use. Please do not remove any pages. The problems are of varying difficulty, so you may wish to tackle the easy ones first.
- No electronic devices may be used during the exam.
- Please write all answers in pen or very darkly in pencil.
- You have 80 minutes to complete the exam.
- If you don't know how to do a problem, don't panic and keep moving. Good luck!
### Visual Description
A standard exam cover page. It includes the course title, semester, exam date, time limit, and fields for student name and Andrew ID (both filled in). Below this, there is a list of 10 instructions for taking the exam.

---

## Page 13
### Content
10-708
Midterm - Page 2 of 13
02/25/26
1. Consider the Bayesian Network described in Figure 1.
Figure 1: Bayesian Network Structure
(a) (3 points) Write down the Markov blanket of D.
parent, children, coparent
B, E, C
(b) (1 point) True or False: A and B are conditionally independent given C.
True
False
(c) (1 point) True or False: A and B are conditionally independent given F.
True
False
(d) (1 point) True or False: C and D are conditionally independent given B.
True
False
(e) (1 point) True or False: D and F are conditionally independent given E.
True
False
### Visual Description
A directed acyclic graph (DAG) labeled "Figure 1: Bayesian Network Structure". Nodes are A, B, C, D, E, F. Edges are A->C, B->C, C->D, C->E, D->F, E->F. Below the graph, there are five sub-questions (a-e). Sub-question (a) asks for the Markov blanket of D, with a handwritten answer "B, E, C" and "parent, children, coparent" written above it. Sub-questions (b-e) are True/False questions about conditional independence, with radio buttons. The "False" option is selected for (b), (c), and (d). The "True" option is selected for (e).

---

## Page 14
### Content
10-708
Midterm - Page 3 of 13
02/25/26
2. Consider the undirected graphical model described in Figure 2.
Figure 2: Undirected Graphical Model Structure
(a) (3 points) Write down the Markov blanket of E. -neighbors
C, B, D, F
(b) (3 points) Convert the undirected graphical model in Figure 2 to a factor graph with the smallest number of factors.
(c) (1 point) True or False: A and B are conditionally independent given C.
True
False
### Visual Description
An undirected graph labeled "Figure 2: Undirected Graphical Model Structure". Nodes are A, B, C, D, E, F. Edges are A-C, B-C, B-D, C-D, C-E, D-E, D-F, E-F. Below the graph, there are three sub-questions (a-c). Sub-question (a) asks for the Markov blanket of E, with a handwritten answer "C, B, D, F" and "-neighbors" written above it. Sub-question (b) provides a large empty box for drawing a factor graph, which contains a handwritten drawing of a factor graph with nodes A, B, C, D, E, F and factors connecting cliques (A-C, B-C, C-D, B-D, C-E, D-E, D-F, E-F). Sub-question (c) is a True/False question about conditional independence, with the "False" option selected.

---

## Page 15
### Content
10-708
Midterm - Page 4 of 13
02/25/26
3. (3 points) Select all that apply: Consider a Markov Chain with state space $\{1, 2, 3, 4\}$ and transition matrix
$T = \begin{pmatrix} 0 & 2/3 & 1/3 & 0 \\ 1/3 & 0 & 2/3 & 0 \\ 0 & 1/3 & 0 & 2/3 \\ 0 & 0 & 1/3 & 2/3 \end{pmatrix}$
(1)
The Markov Chain is irreducible. $\times$
☑ The Markov Chain is aperiodic.

4. (1 point) True or False: We can remove the Gaussian noise in Metropolis Adjusted Langevin Algorithm to make it converge faster to the stationary distribution.
True
✔False

5. (1 point) True or False: If we use two different proposal distributions in Metropolis Hastings that result in the same stationary distribution, the conductance of both chains will necessarily be the same.
True
False

6. (1 point) True or False: Suppose in Gibbs sampling, we always update the first coordinate to update (instead of picking a random coordinate). Then, the intended distribution $\pi$ is still a stationary distribution for this chain.
True
False

7. (1 point) True or False: The key intuition behind simulated tempering is that decreasing the temperature (i.e. making the modes sharper) makes the transition between modes more likely to happen.
True
False

8. (1 point) True or False: In the stationary distribution of simulated tempering, the conditional distribution at temperature 1 is the same regardless of how we choose the other temperatures.
True
False
### Visual Description
The page contains multiple-choice questions related to Markov Chains and MCMC methods. Question 3 presents a transition matrix $T$ for a Markov Chain and asks to select properties (irreducible, aperiodic). A handwritten state diagram is drawn next to the matrix. The option "The Markov Chain is irreducible." is marked with an 'x', and "The Markov Chain is aperiodic." is checked. Questions 4 through 8 are True/False statements. For question 4, "False" is checked. For questions 5, 6, 7, and 8, no option is explicitly checked in the OCR, but the image shows the "False" option for Q5, Q6, Q7, Q8 are not checked.

(Self-correction: The OCR for Q5-Q8 does not show checks, but the image does not show any checks for these questions. I will reflect this by not marking any option as selected for Q5-Q8.)

### Visual Description
The page contains multiple-choice questions related to Markov Chains and MCMC methods. Question 3 presents a transition matrix $T$ for a Markov Chain and asks to select properties (irreducible, aperiodic). A handwritten state diagram is drawn next to the matrix. The option "The Markov Chain is irreducible." is marked with an 'x', and "The Markov Chain is aperiodic." is checked. Questions 4 through 8 are True/False statements. For question 4, "False" is checked. For questions 5, 6, 7, and 8, no option is selected.

---

## Page 16
### Content
10-708
Midterm - Page 5 of 13
02/25/26
9. Consider systematic-scan Gibbs on $\mathcal{X}^2$ with $\mathcal{X} = \{0,1\}$. Let $\pi$ be the distribution on $\{0, 1\}^2$ given by
$\pi(0,0) = 0.4, \pi(0, 1) = 0.1, \pi(1, 0) = 0.1, \pi(1,1) = 0.4$.
One sweep of the systematic-scan Gibbs sampler updates coordinate 1 from its full conditional, then coordinate 2 from its full conditional.
(a) (4 points) Write down the full conditional distributions $\pi(x_1 | x_2)$ and $\pi(x_2 | x_1)$ explicitly. (Write down the numerical values.)

$0.8 = \pi(x_1 = 0 | x_2 = 0) = \frac{0.4}{0.1+0.4}$
$0.2 = \pi(x_1 = 0 | x_2 = 1) = \frac{0.1}{0.1+0.4}$
$0.2 = \pi(x_1 = 1 | x_2 = 0) = \frac{0.1}{0.1+0.4}$
$0.8 = \pi(x_1 = 1 | x_2 = 1) = \frac{0.4}{0.4+0.1}$

$\pi(x_2 = 0 | x_1 = 0) = \frac{0.4}{0.4+0.1} = \frac{0.4}{0.5} = 0.8$
$\pi(x_2 = 0 | x_1 = 1) = \frac{0.1}{0.1+0.4} = \frac{0.1}{0.5} = 0.2$
$\pi(x_2 = 1 | x_1 = 0) = \frac{0.1}{0.4+0.1} = \frac{0.1}{0.5} = 0.2$
$\pi(x_2 = 1 | x_1 = 1) = \frac{0.4}{0.1+0.4} = \frac{0.4}{0.5} = 0.8$
### Visual Description
The page presents Question 9, which involves calculating full conditional distributions for a systematic-scan Gibbs sampler. The problem provides the joint distribution $\pi(x_1, x_2)$ for $x_1, x_2 \in \{0,1\}$. Below the problem statement, there are handwritten calculations for $\pi(x_1 | x_2)$ and $\pi(x_2 | x_1)$ for all possible values of $x_1$ and $x_2$, showing the numerical values and intermediate steps. Some calculations have checkmarks next to them.

---
## Page 17
### Content
10-708 Midterm - Page 6 of 13 02/25/26

(b) (4 points) Compute the $4 \times 4$ transition matrix $P$ for one full sweep (update 1 then 2). (Use the state ordering (0,0), (0, 1), (1, 0), (1, 1) to write down the numerical values in the matrix.)

(c) (4 points) Prove that $\pi$ is stationary for $P$.
Hint: You cannot just cite the Gibbs chain lecture notes, as the version of Gibbs we covered in class picks the coordinate to update at random.

### Visual Description
The page contains question 9 parts (b) and (c). Part (b) has a large handwritten matrix calculation for the transition matrix P. The matrix is labeled with states (0,0), (0,1), (1,0), (1,1) for both rows and columns. Many entries show intermediate calculations like $(0.2)(0.8) = 0.16$. Several arrows indicating state transitions are drawn on the left margin, such as $(0,1) \to (1,0)$ and $(1,1) \to (0,1)$. Below part (c), there is a partially filled $4 \times 4$ matrix with some numerical values like $0.4$, $0.1$, $0.64$, $0.04$.

---
## Page 18
### Content
10-708 Midterm - Page 7 of 13 02/25/26

(d) (4 points) Show that the sweep chain is not reversible with respect to $\pi$ (that is, show that detailed balance doesn't hold for some pair of states $x, y$). Explain why this doesn't contradict what you showed in part (c).

$\pi$ can be stationary even without satisfying detailed balance. (For example, if one state has a self-loop to itself).

### Visual Description
The page contains question 9 part (d). A large blank box is provided for the answer, within which a handwritten note explains that a stationary distribution can exist without detailed balance, giving a self-loop as an example.

---
## Page 19
### Content
10-708 Midterm - Page 8 of 13 02/25/26

10. Let $\pi$ be a full-support distribution on a finite set $\Omega$, i.e., $\forall x \in \Omega, \pi(x) > 0$. Consider the Metropolis-Hastings independent sampler with proposal distribution $r$ that also has full support — from $x \in \Omega$, propose $Y \sim r$, independent of the value of $x$.

(a) (3 points) Show that the acceptance probability for this proposal has the form:
$\alpha(x, y) = \min \left\{1, \frac{\pi(y)r(x)}{\pi(x)r(y)}\right\}$

(b) (4 points) Prove the Metropolis-Hastings chain, with this choice of proposal distribution, is irreducible and aperiodic.

### Visual Description
The page contains question 10 parts (a) and (b). Part (a) presents the formula for the acceptance probability $\alpha(x,y)$. Below each part, there is a large blank box for the solution.

---
## Page 20
### Content
10-708 Midterm - Page 9 of 13 02/25/26

(c) (2 points) Let $\Omega = \{0, 1\}^d$ and let the target be the uniform distribution
$\pi(x) = 2^{-d}$ for all $x \in \Omega$.
Let the proposal $r$ be a product of slightly biased Bernoullis:
$r(x) = \prod_{i=1}^d F(x_i)$, $r(1) = \frac{1}{4}$, $r(0) = \frac{3}{4}$.
Show that for this special case, the acceptance probability is
$\alpha(x, y) = \min\{1,r(x)/r(y)\}$.

(d) (3 points) Keeping with the setting from (c), without doing any calculations, explain why Metropolis-Hastings with this choice of proposal distribution mixes extremely slowly when $d$ is large. Your explanation should refer to what a "typical" configuration looks like under $\pi$ versus what a "typical" configuration looks like when running the Metropolis-Hastings chain, and should explicitly explain the effect of large $d$ and the independence of $r$. (Solution box continues on next page.)

### Visual Description
The page contains question 10 parts (c) and (d). Part (c) provides formulas for $\pi(x)$, $r(x)$, and the acceptance probability $\alpha(x,y)$. Below each part, there is a large blank box for the solution. The box for part (d) indicates that the solution continues on the next page.

---
## Page 21
### Content
10-708 Midterm - Page 10 of 13 02/25/26

(e) (3 points) Consider the systematic sweep Gibbs sampler, in which we update the coordinates in a deterministic cyclic fashion according to their appropriate conditionals. Keeping with the setting of (c), without doing any calculations, explain why after one cycle through all the coordinate, the stationary distribution $\pi$ is reached. Since there are $d$ coordinates, conclude this chain is much more efficient — that is, mixes a lot more quickly—in high dimensions.

### Visual Description
The page contains question 10 part (e). A large blank box is provided for the solution.

---
## Page 22
### Content
10-708 Midterm - Page 11 of 13 02/25/26

11. (8 points) Consider a product distribution over $n$ random variables $X_1, \dots, X_n$, namely:
$p(X = x) \propto \exp \left(\sum_{i=1}^n \phi_i(x_i)\right)$, (2)
where each $\phi_i$ is a (unary) potential function.
Consider any undirected graph $G$. Even though (2) (obviously) does not depend on the edges of $G$, prove that it is still true that the density function $p$ can be written in terms of potentials on the maximal cliques of the graph $G$, namely:
$p(X = x) \propto \exp \left(\sum_{C \in C(G)} \Psi_C(x_C)\right)$, (3)
where $C(G)$ is the set of maximal cliques of $G$. In other words, prove that a product distribution factorizes over the maximal cliques for any graph $G$.

Specifically, please write down explicit expressions for the potentials $\{\Psi_C\}_{C \in C(G)}$ in terms of the potentials $\{\phi_i\}_{i \in [n]}$. (There is more than one way to define them and any correct way will be accepted as long as you clearly define them.)

$= \sum \sum \sum \dots \sum \phi_i(x_i)$
$\Psi_C = \frac{1}{Z} \prod_{i=1}^{|C|} \phi_i(x_i)$ where $|C|$ is number of nodes in Clique $C$.
$\uparrow$ normalization constant

### Visual Description
The page contains question 11, which involves proving a factorization property for product distributions over maximal cliques. The question includes two mathematical expressions for $p(X=x)$. Below the question, there is a handwritten solution attempt. The handwritten part shows an equation starting with an equals sign, followed by a sum of sums of $\phi_i(x_i)$. Below that, it defines $\Psi_C$ as a product of $\phi_i(x_i)$ terms, divided by a normalization constant $Z$, and clarifies that $|C|$ is the number of nodes in Clique $C$.

---
## Page 23
### Content
10-708 Midterm - Page 12 of 13 02/25/26

12. (9 points) Let $C_n$ be the (undirected) cycle graph on vertex set $\{v_1, \dots, v_n\}$ with edges
$\{v_i, v_{i+1}\}$ for $i = 1, \dots, n-1$ and $\{v_n, v_1\}$,
where $n \ge 3$.
Show that the treewidth of the cycle (for any $n$) is at most 2, by constructing an explicit tree decomposition of $C_n$ in which the largest subset has size 3. Show that the tree decomposition you exhibit satisfies the properties required of a tree decomposition.
(The problem doesn't ask you to do this, but in fact, you can show that there is no tree decomposition in which each subset is of size at most 2 — so the treewidth equals 2.)

consider tree decomp like this

(1) $U_i w_i = V = \{1,2,3, \dots, n\}$
(2) $U_1, v_1$ is contained in first node.
edge $\{v_i, v_{i+1}\}$ is contained in $\{v_i, v_{i+1}\}$.
$\{v_n, v_1\}$ is contained in last node
(3) neighboring nodes in the tree contain node $v \in \{2,3, \dots, n-2\}$ and they are the only two nodes that contain $v$. All nodes contain node $v_n$, so all nodes along any path will contain node $v_n$.

### Visual Description
The page contains question 12, which asks to demonstrate that the treewidth of a cycle graph $C_n$ is at most 2 by constructing a tree decomposition. There's a handwritten diagram illustrating a cycle graph with nodes $v_1, v_2, \dots, v_n$. Below this, there's a handwritten sketch of a tree decomposition, showing nodes like $(1,2)$, $(2,3)$, $(3,4)$, and $(n-2, n-1)$, connected in a line. The sketch is labeled "consider tree decomp like this". Below the sketch, there are three numbered points with handwritten text describing properties of the tree decomposition, including vertex coverage, edge coverage, and connectivity.

---
## Page 24
### Content
10-708 Midterm - Page 13 of 13 02/25/26

Do not remove this page! Use this page for scratch work.

### Visual Description
Text-only slide.

---
## Page 25
### Content

### Visual Description
A completely blank white page with a very faint diagonal line in the top right corner, likely a scan artifact or page corner.
---
