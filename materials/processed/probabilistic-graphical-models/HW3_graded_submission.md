# HW3_graded_submission

Source: `materials/archive/HW3_graded_submission.pdf`
Duplicate equivalents: `HW3_graded_submission.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `MIXED`
Pages: 49

## Page 1
### Content
Homework 3
Graded
Student
Saahith Janapati
Total Points
115 / 115 pts
### Visual Description
A title slide for "Homework 3" showing the student's name "Saahith Janapati" and a perfect score of "115 / 115 pts". A green "Graded" indicator is in the top right.
---
## Page 2
### Content
Question 1
1a
7/7 pts
- 0 pts Correct
Solution
$H(q) + E_{x \sim q}[E_{\theta}(x)]$
$= H(q_1) + H(q_2) + H(q_3) + E_{x \sim q}[\theta_1 x_1 + \theta_2 x_2 + \theta_3 x_3 + \theta_{12} x_1 x_2 + \theta_{23} x_2 x_3]$
$= \sum_{i=1}^3 H(q_i) + E_{x \sim q}[\theta_1 x_1] + E_{x \sim q}[\theta_2 x_2] + E_{x \sim q}[\theta_3 x_3] + E_{x \sim q}[\theta_{12} x_1 x_2] + E_{x \sim q}[\theta_{23} x_2 x_3]$
$= \sum_{i=1}^3 H(q_i) + \theta_1 E_{x \sim q}[x_1] + \theta_2 E_{x \sim q}[x_2] + \theta_3 E_{x \sim q}[x_3] + \theta_{12} E_{x \sim q}[x_1 x_2] + \theta_{23} E_{x \sim q}[x_2 x_3]$
$= \sum_{i=1}^3 H(q_i) + \theta_1 \mu_1 + \theta_2 \mu_2 + \theta_3 \mu_3 + \theta_{12} \mu_1 \mu_2 + \theta_{23} \mu_2 \mu_3$
where $H(q_i) = \frac{1}{2}(1+\mu_i) \log \frac{1}{2}(1+\mu_i) - \frac{1}{2}(1-\mu_i) \log \frac{1}{2}(1-\mu_i)$ (since $P(x_1 = 1) = \frac{1}{2}(1+\mu_i)$ and $P(x_1 = -1) = \frac{1}{2}(1-\mu_i)$).
Appendix: Let $q \in Q$ be arbitrary, then,
$H(q) = - \sum_{x \in \{-1,1\}^3} q(x) \log q(x)$
$= - \sum_{(x_1,x_2,x_3) \in \{-1,1\}^3} q_1(x_1)q_2(x_2)q_3(x_3) \log q_1(x_1)q_2(x_2)q_3(x_3)$
$= - \sum_{x_1 \in \{-1,1\}} \sum_{x_2 \in \{-1,1\}} \sum_{x_3 \in \{-1,1\}} q_1(x_1)q_2(x_2)q_3(x_3) (\log q_1(x_1) + \log q_2(x_2) + \log q_3(x_3))$
$= \sum_{i=1}^3 \sum_{x_i \in \{-1,1\}} q_i(x_i) \log q_i(x_i) \left( \sum_{j \neq i \text{ & } x_j \in \{-1,1\}} q_j(x_j) \right) \left( \sum_{k \neq i,j \text{ & } x_k \in \{-1,1\}} q_k(x_k) \right)$
$= - \sum_{x_1 \in \{-1,1\}} q_1(x_1) \log q_1(x_1) - \sum_{x_2 \in \{-1,1\}} q_2(x_2) \log q_2(x_2) - \sum_{x_3 \in \{-1,1\}} q_3(x_3) \log q_3(x_3)$
$= H(q_1) + H(q_2) + H(q_3)$
Equivalent form of $H(q_i)$,
$H(q_i) = - \sum_{x_i \in \{-1,1\}} q_i(x_i) \log q_i(x_i) = -q_i(1) \log q_i(1) - q_i(-1) \log q_i(-1)$
$\mu_i = E_q[x_i] = E_{q_i}[x_i] = \sum_{x_i \in \{-1,1\}} x_i q_i(x_i) = q_i(1) - q_i(-1) = 2q_i(1) - 1 (= 1-2q_i(-1))$
Substituting $q_i(1) = \frac{1}{2}(1+\mu_i)$ and $q_i(-1) = \frac{1}{2}(1-\mu_i)$, we get,
$H(q_i) = -\frac{1}{2}(1+\mu_i) \log \frac{1}{2}(1+\mu_i) - \frac{1}{2}(1-\mu_i) \log \frac{1}{2}(1-\mu_i)$

- 7 pts Blank
- 0.5 pts Does not define $H(q_i)$ in terms of $\mu_i$
- 2 pts Insufficient justification
- 1 pt Slightly Insufficient justification
### Visual Description
A dense page of mathematical derivations for Question 1a, starting with an expression for $H(q) + E_{x \sim q}[E_{\theta}(x)]$ and simplifying it. It then defines $H(q_i)$ and provides an appendix with a detailed derivation of $H(q)$ for a product distribution, showing it decomposes into a sum of individual entropies. The page concludes with an equivalent form of $H(q_i)$ in terms of $\mu_i$. Several feedback points are listed at the bottom.
---
## Page 3
### Content
Question 2
1b
8/8 pts
- 0 pts Correct
Solution We will prove that the intersection between $F_0(\mu_1, \mu_2)$ and the line $\mu_1 = -\mu_2$ is not concave, so the overall objective function is not a concave function.
$F_0(t, -t, 0) = -t^2 \theta_{12} - (1+t) \log(\frac{1+t}{2}) - (1-t) \log(\frac{1-t}{2}) + \text{const}$
By taking derivative with respect to $t$, we have
$\frac{\partial F(t, -t, 0)}{\partial t} = -2t\theta_{12} - \left(\frac{1}{2} + \log(\frac{1+t}{2})\right) + \left(\frac{1}{2} + \log(\frac{1-t}{2})\right)$
$= -2t\theta_{12} - \log(1+t) + \log(1-t)$.
By taking second partial derivative, we have
$\frac{\partial^2 F(t, -t)}{\partial^2 t} = -2\theta_{12} - \frac{1}{1+t} - \frac{1}{1-t} = -2\theta_{12} - \frac{2}{1-t^2}$.
For any fixed $t$, we can pick $\theta_{12}$ such that the second partial derivative is positive so the function is not concave.

- 2 pts First order derivative is wrong
- 2 pts Second order derivative is wrong
- 4 pts Insufficient/Wrong explanation
- 2 pts Missing steps
- 8 pts Blank
- 0.5 pts Minor mistake in calculation of second derivative
### Visual Description
A page presenting the solution to Question 1b, demonstrating that a function is not concave. It starts with the definition of $F_0(t, -t, 0)$, then calculates its first and second partial derivatives with respect to $t$. The final expression for the second derivative is used to argue non-concavity. Several feedback points are listed at the bottom.
---
## Page 4
### Content
Question 3
### Visual Description
A sparse page with only the text "Question 3" centered at the top.
---
## Page 5
### Content
2a
10/10 pts
- 0 pts Correct
Solution Since all the local marginals are pairwise, we only need to ensure pairwise consistency for all pairs of variables $(X_i, X_{i+1})$ (also the pair wrapping up the cycle $(X_n, X_1)$). The key observation here is that the assignment can only change even times throughout the traversal, since the assignment $x_i$ should keep unchanged. Thus, for each edge set $F \subseteq E$ such that $|F|$ is odd, we have the constraint as
$\prod_{(X_i,X_j) \in E \setminus F} \delta(X_i = X_j) \prod_{(X_i,X_j) \in F} \delta(X_i \neq X_j) = 0$.
We can further re-write the constraint as a linear one (boolean logic):
$\sum_{(X_i,X_j) \in E \setminus F} \delta(X_i \neq X_j) + \sum_{(X_i,X_j) \in F} \delta(X_i = X_j) \geq 1$.
We can show the marginal polytope $\mathcal{M}$ is contained by the local polytope $\mathcal{L}$ as below:
It's clear that every distribution $p \in \mathcal{M}$ must satisfy the pairwise constraints. To show that the distribution $p$ also satisfies cycle inequalities, we can first re-arrange the terms in the inequalities

7 of 35

ework 3: Variational Inference
10-708
to derive:
$\sum_{(X_i,X_j) \in E \setminus F} [p_{ij}(x_i = 1, x_j = -1) + p_{ij}(x_i = -1, x_j = 1)]$
$+ \sum_{(X_i,X_j) \in F} [p_{ij}(x_i = 1, x_j = 1) + p_{ij}(x_i = -1, x_j = -1)] \geq 1$
$\leftrightarrow \sum_{(X_i,X_j) \in E \setminus F} p(X_i \neq X_j) + \sum_{(X_i,X_j) \in F} p(X_i = X_j) \geq 1$
$\leftrightarrow E_p \left[ \sum_{(X_i,X_j) \in E \setminus F} \delta(X_i \neq X_j) + \sum_{(X_i,X_j) \in F} \delta(X_i = X_j) \right] \geq 1$.
Now notice that the term inside the expectation is exactly same as the constraint we derived at the beginning, which any valid assignment over variables naturally satisfy. As the term inside the expectation is lower bounded by 1, the expectation is also lower bounded by 1, i.e. the constraints are satisfied.

- 6 pts Major mistake in deriving inequalities/other major mistake that affects correctness of rest of proof
- 2 pts Mistake in combining inequalities
- 4 pts Insufficient justification in deriving inequalities
- 2 pts Mistake in deriving conclusion
- 2 pts Missing steps for the final inequality in terms of $q_{ij}$
### Visual Description
A page detailing the solution to Question 2a, focusing on pairwise consistency and cycle inequalities in variational inference. It presents mathematical constraints using products and sums of delta functions, and then re-writes them as linear inequalities. The solution then shows how the marginal polytope is contained by the local polytope, using expectations of sums of delta functions. The page includes a footer with "7 of 35" and "10-708". Several feedback points are listed at the bottom.
---
## Page 6
### Content
- 1 pt Minor mistake in reasoning
- 7 pts Incorrect approach
- 1 pt Error in notation
- 3 pts Insufficient justification for claims
- 10 pts Did not attempt
- 2 pts Missing case (if using case analysis)
- 2 pts Minor mistake in deriving inequalities
### Visual Description
Text-only slide.
---
## Page 7
### Content
Question 4
2b
8/8 pts
- 0 pts Correct
Solution One can easily verify the cycle inequalities hold for cycle of length 3, 4 and 5.
To show that the marginals actually don't fall into the marginal polytope, consider maximizing the objective function $\sum_{i,j} \delta(x_i \neq x_j)$. Under the (local) expectation of $q$, we get the value $|E| - \frac{n}{2} = \frac{n(n-1)}{2} - \frac{n}{2}$, while the maximum value we can get for integer solution is 6 (it can be achieved by setting any two variables as 1). Notice that a globally valid marginal should be a weighted sum

9 of 35

Homework 3: Variational Inference
10-708
of integer assignments, and thus should not achieve any larger value than the maximum integer solution ($\frac{n(n-1)}{2} - \frac{n}{2} > 6$), which results in a contradiction.

- 2 pts Only showed that polytope constraint holds for some cases ($F \in \{1, 3, 5\}$) of cycles of all lengths (3/4/5)
- 2 pts Only showed that polytope constraint holds for cycle of a single length (either 3/4/5)
- 1 pt Missed 1 case for polytope constraint cycle length (either 3/4/5), and only showed that it holds for 2 of the lengths
- 4 pts Did not show that cycle polytope constraint will hold
- 2 pts Missing justification for why cycle polytope constraint holds
- 3 pts Incorrect argument for why cycle polytope constraint holds
- 2 pts Missing justification for why $\bar{q}$ does not exist
- 3 pts Incorrect proof for why $\bar{q}$ does not exist
- 1 pt Minor error
- 1 pt Calculation error - obtained some other value instead of 20/3 for expectation
- 2 pts Counting error - obtained some other value instead of 6 for maximum of $\sum_{i,j} \delta(x_i \neq x_j)$, or did not show this value
- 4 pts Did not attempt proof for why $\bar{q}$ does not exist
- 8 pts Did not attempt

Question 5
3a
2/2 pts
- 0 pts Correct
- 2 pts Incorrect or Blank answer
### Visual Description
A page presenting the solution to Question 2b, discussing cycle inequalities and the marginal polytope. It describes maximizing an objective function $\sum_{i,j} \delta(x_i \neq x_j)$ and compares the expected value under $q$ with the maximum integer solution to show a contradiction. The page includes a footer with "9 of 35" and "10-708". Below this, "Question 5" and "3a" are introduced with feedback points.
---
## Page 8
### Content
Question 6
3b
8/8 pts
- 0 pts Correct
Solution Since the initial messages for all edges are the same and the graph is symmetric with respect to all nodes, all messages at the same time step should also be the same. By the above algorithm, the (unnormalized) message can be calculated as following: for all $(i, j) \in E$,
$m_{j \to i, t}(0) = \sum_{x_j \in X} \phi_{ij}(0, x_j) \prod_{k \in N(j) \setminus i} m_{k \to j, t-1}(x_j)$
$= m_{k \to j, t-1}(0) + \epsilon m_{k \to j, t-1}(1)$ (k is the other neighbor of j)
$= (1-\epsilon) m_{k \to j, t-1}(0) + \epsilon$ (previous messages are normalized).
Similarly, we have
$m_{j \to i, t}(1) = (1-\epsilon) m_{k \to j, t-1}(1) + \epsilon$.
By normalizing the messages, we have
$m_{j \to i, t}(x_j) = \frac{1-\epsilon}{1+\epsilon} m_{k \to j, t-1}(x_j) + \frac{\epsilon}{1+\epsilon}$ for $x_j = 0, 1$.
By subtracting 1/2 on both sides, we have
$m_{j \to i, t}(x_j) - \frac{1}{2} = \frac{1-\epsilon}{1+\epsilon} \left(m_{k \to j, t-1}(x_j) - \frac{1}{2}\right)$ for $x_j = 0, 1$.
Therefore, we have
$\left|m_{j \to i, t}(x_j) - \frac{1}{2}\right| = \left(\frac{1-\epsilon}{1+\epsilon}\right)^T \left|m_{j \to i, 0}(x_j) - \frac{1}{2}\right|$,
which implies that the messages converge linearly to 0.5. Since we have
$P_T(X_i = x_i) \propto \prod_{k \in N(i)} m_{k \to i, T}(x_i) = m_{k \to i, T}(x_i)^2$ (messages from both direction).
Since both $m_{k \to i, T}(0)$ and $m_{k \to i, T}(1)$ converge to 0.5, asymptotically, we have $P_T(X_i = 0) = P_T(X_i = 1) = 0.5$.

- 3 pts Didn't normalize the messages
- 1 pt Incorrect $C_1$
- 1 pt Incorrect $C_2$
- 8 pts Blank submission
- 1 pt Minor mistake
- 2 pts Major mistake
- 2 pts Does not prove convergence for $T \to \infty$
- 0.5 pts Does not show that $P_T(X_i = x_i) \propto m_{k \to i, T}(x_i)^2$
### Visual Description
A page presenting the solution to Question 3b, which involves a message passing algorithm. It describes how messages are calculated, normalized, and then shows the linear convergence of messages to 0.5. The final part of the solution relates the probability $P_T(X_i = x_i)$ to the product of messages and concludes that $P_T(X_i = 0) = P_T(X_i = 1) = 0.5$ asymptotically. Several feedback points are listed at the bottom.
---
## Page 9
### Content
Question 7
3c
- 0 pts Correct

Solution Using the above results, we have
$m_{j \to s_i, t}(x_j) - \frac{1}{2} = \frac{1-\epsilon}{1+\epsilon} (m_{k \to j, t-1}(x_j) - \frac{1}{2})$, for $x_j = 0,1$.

By plugging in $\epsilon = 0$, we have
$m_{j \to s_i, t}(x_j) = m_{k \to j, t-1}(x_j)$, for $x_j = 0, 1$.

Therefore, it passes the identical message to the next node, which implies that after $N$ iteration, the messages for every edge are the same as the initial messages.
Since there are at least two messages are different, these two messages pass through every edge every $N$ iteration. So the messages do not converge.

- 8 pts Blank answer
- 2 pts Insufficient reasoning
- 2 pts Does not derive message updates when $\epsilon = 0$
- 1 pt Minor mistake
### Visual Description
A solution to a problem involving message passing algorithms, with mathematical equations and explanatory text, followed by grading comments.
---
## Page 10
### Content
Question 8
4a
- 0 pts Correct

Solution Recall that $q(\pi)$ has the form $\text{Dir}(\pi | \gamma)$, where $\gamma = (\gamma_1, \gamma_2)$ need to be determined. We know that the optimal variational distribution satisfies,
$q^*(\pi) \propto \exp \left(E_{q(A,z_{1:T})} [\ln p(x_{1:T}, z_{1:T}, \pi, A)]\right)$,
$\propto \exp \left(E_{q(A,z_{1:T})} [\ln (p(\pi, z_1) \cdot p(x_{1:T}, z_{2:T}, A | z_1))]\right)$,
$= \exp \left(E_{q(z_1)} [\ln p(\pi, z_1)]\right)$,

Rewriting,
$\ln q^*(\pi) = \ln p(\pi) + E_{q(z_1)} [\ln p(z_1 | \pi)] + C$,
where $C$ is some constant that does not depend on $\pi$.

1. Simplifying the first term: Recall that the prior on $\pi$ is $p(\pi) = \text{Dir}(\pi | \alpha)$, so that
$\ln p(\pi) = \ln \text{Dir}(\pi | \alpha) = \sum_{i=1}^2 (\alpha_i - 1) \ln \pi_i + C_\alpha$,
where $C_\alpha$ is some constant.

2: Simplifying the second term: Observe that the log-likelihood for the initial latent state is,
$\ln p(z_1 | \pi) = \sum_{i=1}^2 1[z_1 = i] \ln \pi_i$.
where $1[z_1 = i]$ is an indicator function. Taking expectation with respect to $q(z_1)$,
$E_{q(z_1)} [\ln p(z_1 | \pi)] = \sum_{i=1}^2 \phi_1(i) \ln \pi_i$.

3. Recognize the Dirichlet Form: Combining results from Steps 1 and 2, we have
$\ln q^*(\pi) = \sum_{i=1}^2 (\alpha_i - 1) \ln \pi_i + \sum_{i=1}^2 \phi_1(i) \ln \pi_i + c + C_\alpha = \sum_{i=1}^2 [(\alpha_i - 1) + \phi_1(i)] \ln \pi_i + c + C_\alpha$,
which is the logarithm of a Dirichlet density with,
$\gamma_i = \alpha_i + \phi_1(i)$, for $i = 1, 2$.

- 0.5 pts Minor mistake in result
- 4 pts Major errors
- 5 pts Incorrect/Missing Solution
### Visual Description
A multi-step solution for a variational inference problem, involving derivations of log-likelihood terms and recognition of a Dirichlet form, with mathematical equations and explanatory text, followed by grading comments.
---
## Page 11
### Content
Question 9
### Visual Description
A blank page with only "Question 9" at the top.
---
## Page 12
### Content
4b
- 0 pts Correct

Solution Recall that the variational distribution for the transition matrix factorizes by rows as $q(A) = \prod_{i=1}^2 q(A_i)$, with $q(A_i) = \text{Dir}(A_i | \delta_i)$, where $\delta_i = (\delta_{i1}, \delta_{i2})$ are the parameters to be determined for $i = 1, 2$. We know that the optimal variational distribution satisfies,
$q^*(A_i) \propto \exp \left(E_{q(\pi, z_{1:T}, A_{-i})} [\ln p(x_{1:T}, z_{1:T}, \pi, A)]\right)$.

Since $A_i$ only appears in the prior $p(A_i)$ and the transition probabilities $p(z_t | z_{t-1}, A)$, we can remove all other terms from the factorization,
$\ln q^*(A_i) = \ln p(A_i) + \sum_{t=2}^T E_{q(z_{t-1}, z_t)} [\ln p(z_t | z_{t-1}, A)] + c$,
where $c$ is some constant. We now evaluate each of these terms:

1. Simplifying the prior term:
$\ln p(A_i) = \ln \text{Dir}(A_i | \beta)$
$= \sum_{j=1}^2 (\beta_j - 1) \ln a_{ij} + C_\beta$,
where $C_\beta$ is some constant.

2. Simplifying the likelihood term:
For $t \ge 2$, the transition probability is given by
$p(z_t | z_{t-1}, A) = \prod_{i=1}^2 \prod_{j=1}^2 a_{ij}^{1[z_{t-1}=i] 1[z_t=j]}$,
which implies,
$\ln p(z_t | z_{t-1}, A) = \sum_{i=1}^2 \sum_{j=1}^2 1[z_{t-1} = i] 1[z_t = j] \ln a_{ij}$.
Taking the expectation with respect to $q(z_{t-1}, z_t)$, and recall that $q(z_{t-1} = i) = \phi_{t-1}(i)$ and $q(z_t = j) = \phi_t(j)$, we have,
$E_{q(z_{t-1}, z_t)} [\ln p(z_t | z_{t-1}, A)] = \sum_{i=1}^2 \sum_{j=1}^2 \phi_{t-1}(i) \phi_t(j) \ln a_{ij}$.
Summing over $t = 2$ to $T$ gives,
$\sum_{t=2}^T E_{q(z_{t-1}, z_t)} [\ln p(z_t | z_{t-1}, A)] = \sum_{i=1}^2 \sum_{j=1}^2 \left[\sum_{t=2}^T \phi_{t-1}(i) \phi_t(j)\right] \ln a_{ij}$.

3. Recognize the Dirichlet Form:
### Visual Description
A multi-step solution for a variational inference problem, focusing on the transition matrix, with mathematical derivations for prior and likelihood terms, and explanatory text.
---
## Page 13
### Content
Thus, for a fixed row $i$, we have:
$\ln q^*(A_i) = \sum_{j=1}^2 (\beta_j - 1) \ln a_{ij} + \sum_{j=1}^2 \left[\sum_{t=2}^T \phi_{t-1}(i) \phi_t(j)\right] \ln a_{ij} + c + C_\alpha$
$= \sum_{j=1}^2 \left[(\beta_j - 1) + \sum_{t=2}^T \phi_{t-1}(i) \phi_t(j)\right] \ln a_{ij} + c + C_\alpha$.

The expression above is the logarithm of a Dirichlet density for $A_i$ with parameters
$\delta_{ij} = \beta_j + \sum_{t=2}^T \phi_{t-1}(i) \phi_t(j)$, $j = 1, 2$.

- 1 pt Minor mistake in final expression
- 4 pts Major mistakes/Did not simplify
- 5 pts Missing/Incorrect
### Visual Description
A continuation of a variational inference solution, combining derived terms to identify the Dirichlet form and its parameters, with mathematical equations and explanatory text, followed by grading comments.
---
## Page 14
### Content
Question 10
### Visual Description
A blank page with only "Question 10" at the top.
---
## Page 15
### Content
4c
- 0 pts Correct

Solution For each latent state $z_t$, we need to update its variational distribution $q(z_t)$ based on the terms in the joint distribution that involve $z_t$. We name the following terms:
1. The emission likelihood: $\ln p(x_t | z_t = i)$.
2. The incoming transition (if $t > 1$): $\ln p(z_t | z_{t-1}, A)$.
3. The outgoing transition (if $t < T$): $\ln p(z_{t+1} | z_t, A)$.

Thus, the optimal variational update for $q(z_t)$ satisfies
$\ln q^*(z_t) = E_{q(\pi, A, z_{-t})} [\ln p(x_{1:T}, z_{1:T}, \pi, A)]$
$= \ln p(x_t | z_t) + (\text{transitions terms}) + c$,
where $c$ is some constant. We now evaluate each of these terms:

1. Emission Likelihood:
The term corresponding to the emission model is
$\ln p(x_t | z_t = i) = \ln N(x_t | \mu_i, \sigma^2)$.

2. Incoming Transition (for $t > 1$):
For $t > 1$, the contribution from the previous state is given by the transition probability:
$\ln p(z_t = i | z_{t-1}, A) = \sum_{j=1}^2 1[z_{t-1} = j] \ln a_{ji}$.
Taking the expectation with respect to $q(z_{t-1})$, where $q(z_{t-1} = j) = \phi_{t-1}(j)$, and with respect to $q(A)$, we obtain:
$E_{q(z_{t-1}, A)} [\ln p(z_t = i | z_{t-1}, A)] = \sum_{j=1}^2 \phi_{t-1}(j) E_{q(A)} [\ln a_{ji}]$.
Since $q(A_j) = \text{Dir}(A_j | \delta_j)$, we have
$E_{q(A)} [\ln a_{ji}] = \psi(\delta_{ji}) - \psi(\delta_{j1} + \delta_{j2})$,
where $\psi(\cdot)$ is the digamma function. Therefore, the incoming transition term becomes:
$\sum_{j=1}^2 \phi_{t-1}(j) [\psi(\delta_{ji}) - \psi(\delta_{j1} + \delta_{j2})]$.

3. Outgoing Transition (for $t < T$):
Similarly, for $t < T$, the outgoing transition term corresponds to the probability of transitioning from state $i$ to the next state:
$\ln p(z_{t+1} | z_t = i, A) = \sum_{j=1}^2 1[z_{t+1} = j] \ln a_{ij}$.
### Visual Description
A multi-step solution for updating the variational distribution of a latent state, detailing emission and transition terms with mathematical equations and explanatory text.
---
## Page 16
### Content
Taking the expectation with respect to $q(z_{t+1})$, where $q(z_{t+1} = j) = \phi_{t+1}(j)$, and with respect to $q(A)$, we get:
$E_{q(z_{t+1}, A)} [\ln p(z_{t+1} | z_t = i, A)] = \sum_{j=1}^2 \phi_{t+1}(j) E_{q(A)} [\ln a_{ij}]$
$= \sum_{j=1}^2 \phi_{t+1}(j) [\psi(\delta_{ij}) - \psi(\delta_{i1} + \delta_{i2})]$.

4. Combining the Terms:
For a middle time step $t$ (i.e., $t = 2, \dots, T - 1$), combining the emission, incoming, and outgoing terms, we have:
$\ln q^*(z_t = i) = \ln p(x_t | z_t = i)$
$+ \sum_{j=1}^2 \phi_{t-1}(j) [\psi(\delta_{ji}) - \psi(\delta_{j1} + \delta_{j2})]$
$+ \sum_{j=1}^2 \phi_{t+1}(j) [\psi(\delta_{ij}) - \psi(\delta_{i1} + \delta_{i2})] + c$.

For the boundary cases:
- At $t = 1$: Only the emission likelihood and the outgoing transition contribute (along with the initial state term involving $\pi$ if not already incorporated). We have:
$\ln q^*(z_1 = i) = \psi(\gamma_i) - \psi(\gamma_1 + \gamma_2) + \ln p(x_1 | z_1 = i)$
$+ \sum_{j=1}^2 \phi_2(j) [\psi(\delta_{ij}) - \psi(\delta_{i1} + \delta_{i2})] + c$.

- At $t = T$: Only the emission likelihood and the incoming transition contribute:
$\ln q^*(z_T = i) = \ln p(x_T | z_T = i)$
$+ \sum_{j=1}^2 \phi_{T-1}(j) [\psi(\delta_{ji}) - \psi(\delta_{j1} + \delta_{j2})] + c$.

After computing these log probabilities, we exponentiate and normalize to obtain the final updates.

- 2 pts Incorrect transitions for $1 < t < T$
- 1 pt Incorrect boundary condition for $t = 1$
- 1 pt Incorrect boundary condition for $t = T$
- 6 pts Attempted but mostly incorrect / incomplete
- 10 pts Missing
### Visual Description
A continuation of a variational inference solution, combining emission and transition terms for a general time step and specific boundary conditions, with mathematical equations and explanatory text, followed by grading comments.
---
## Page 17
### Content
Question 11
5a
5/5 pts
- 0 pts Correct
- 1 pt Wrong Derivative.
Correct derivative is $x - \mu$.
- 5 pts Blank

Question 12
5b
5/5 pts
- 0 pts Correct
- 5 pts Blank
- 1 pt Missing Detail

Question 13
5c
7/7 pts
- 0 pts Correct
- 3 pts Does not show or Wrong variance for Reinforce. Correct value is $2b^2 + a^2$.
- 3 pts Wrong variance for Reparametrization. Correct value is 0.
- 6 pts Incorrect.
- 7 pts Blank.
- 3 pts Minor Error
- 1 pt Error but logically there

Question 14
5d
7/7 pts
- 0 pts Correct
- 1 pt Incorrect variance of Reinforce. Correct value is 0.
- 7 pts Blank

Question 15
B.2.a
2/2 pts
- 0 pts Correct
- 2 pts Blank
- 0.5 pts Missing title
- 0.5 pts Missing brief description
- 0.5 pts Missing url
### Visual Description
A graded feedback page listing several questions (11-15) with their respective sub-parts (5a, 5b, 5c, 5d, B.2.a). Each question shows the total points, points awarded (0 pts Correct), and a bulleted list of deductions with specific feedback comments like "Wrong Derivative", "Blank", "Missing Detail", "Wrong variance for Reinforce", "Minor Error", "Missing title", etc.
---
## Page 18
### Content
Question 16
B.2.b
8/8 pts
- 0 pts Correct
- 2 pts No identified topic
- 6 pts Error in implementation but attempted answering
- 8 pts Blank

Question 17
B.2.c.
4/4 pts
- 0 pts Correct
- 4 pts Blank
- 1 pt Does not explain what the topics might represent.
- 1 pt Does not answer whether the predicted topics match description of article.
- 2 pts Error in implementation, but attempted answering.
- 2 pts Not following the instructions (e.g. did not report 10 words)

Question 18
B.2.d.
6/6 pts
- 0 pts Correct
- 6 pts Blank
- 2 pts Missing identified topics and verification of theme match.
- 1 pt Did not generate "document" of length shorter than instructed.
- 4 pts Error in implementation, but attempted answering.
- 1 pt Missing topics
### Visual Description
A graded feedback page listing questions 16-18 with their respective sub-parts (B.2.b, B.2.c., B.2.d.). Each question shows the total points, points awarded (0 pts Correct), and a bulleted list of deductions with specific feedback comments such as "No identified topic", "Error in implementation", "Blank", "Does not explain what the topics might represent", "Not following the instructions", "Missing identified topics", and "Did not generate 'document' of length shorter than instructed".
---
## Page 19
### Content
Question 19
Collaboration Policy
0/0 pts
19.1 Received Help
0/0 pts
- 0 pts Received Help
- 0 pts Did Not Receive Help
- 0 pts Blank

19.2 Gave Help
0/0 pts
- 0 pts Gave Help
- 0 pts Did Not Give Help
- 0 pts Blank

19.3 Found Code
0/0 pts
- 0 pts Found Code
- 0 pts Did Not Find Code
- 0 pts Blank
### Visual Description
A graded feedback page for Question 19, titled "Collaboration Policy". It is divided into three sub-sections: "Received Help", "Gave Help", and "Found Code". Each sub-section lists options like "Received Help", "Did Not Receive Help", "Gave Help", "Did Not Give Help", "Found Code", and "Did Not Find Code", all showing "0 pts" and a "Blank" option. This appears to be a checklist for reporting collaboration.
---
## Page 20
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

HOMEWORK 3
INTRODUCTION OF GRAPHICAL MODELS AND EXACT
INFERENCE $^{1}$

10-708 PROBABILISTIC GRAPHICAL MODELS (SPRING 2026)
https://piazza.com/cmu/spring2026/10708/home

OUT: March 13th, 2026
DUE: March 27th, 2026 11:59 PM ET
TAs: James Ngai, Aviv Bick, Justin Lin

- **Collaboration policy**: The purpose of student collaboration is to facilitate learning, not to circum-
vent it. Studying the material in groups is strongly encouraged. It is also allowed to seek help from
other students in understanding the material needed to solve a particular homework problem, pro-
vided no written notes (including code) are shared, or are taken at that time, and provided learn-
ing is facilitated, not circumvented. The actual solution must be done by each student alone. The
presence or absence of any form of help or collaboration, whether given or received, must be ex-
plicitly stated and disclosed in full by all involved. See the Academic Integrity Section on the
course site for more information: https://andrejristeski.github.io/10708S26/#:
~:text=Academic%20Integrity%20Policies
- **Late Submission Policy**: See the late submission policy here: https://andrejristeski.
github.io/10708S26/#:~:text=Grace%20Day/Late%20Homework%20Policy
- **Submitting your work to Gradescope**: We use Gradescope (https://www.gradescope.
com/courses/1211283/assignments) to collect PDF submissions of open-ended questions
on the homework (e.g. mathematical derivations, plots, short answers). The course staff will man-
ually grade your submission, and you'll receive personalized feedback explaining your final marks.
The homework template must be used and can be completed in Latex or by hand. Handwritten sub-
missions must be legible otherwise we will not be able to give credit to your solutions. No changes
should be made to the template, boxes and choices MUST remain the same size and in the same
locations between the template and your completed submission, the document has 30 pages so your
submission must contain no more and no less than 30 pages.
- **Programming Code**: You will also submit your code for the programming questions on the home-
work to Gradescope, specifically the 'Homework 3 Programming' submission slot. All code written
must be submitted in order for you to get any credit for the written components of the programming
section.

Compiled on Saturday 28th March, 2026 at 03:22
1 of 30
### Visual Description
Text-only slide.
---
## Page 21
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

1 Written Questions [90 pts]

1. (Non-concavity of the mean-field approximation) In this exercise, we will see that the objective that
results from a mean-field relaxation can yield a non-concave maximization problem. In general, such
objectives will have many local maxima and stationary points, thus will not be easy to optimize.
Consider a simple three variables Ising model with parameter $\theta = [\theta_1, \theta_2, \theta_3, \theta_{12}, \theta_{23}] \in \mathbb{R}^5$:
$p(x) \propto \exp (\theta_1x_1 + \theta_2x_2 + \theta_3x_3 + \theta_{12}x_1x_2 + \theta_{23}x_2x_3)$, for all $x = [X_1, X_2, X_3] \in \{-1,1\}^3$.
Consider the mean-field approximation:
$$q^* = \underset{q \in Q}{\operatorname{argmax}} H(q) + E_{x \sim q}[E_{\theta}(x)],$$
(1.1)
where $E_{\theta}(x) = \theta_1x_1 + \theta_2x_2 + \theta_3x_3 + \theta_{12}x_1x_2 + \theta_{23}x_2x_3$, $H$ is the Shannon entropy, and $Q$
consists of product distributions over $\{1, -1\}^3$, i.e. its density function can be factorized as $q(x) = $
$q_1(X_1)q_2(X_2)q_3(X_3)$.

(a) (7 points) Let $\mu_1 = E_q[X_1]$, $\mu_2 = E_q[x_2]$ and $\mu_3 = E_q[x_3]$. Show that the objective function
(Eqn.(1.1)) can be written as
$$\underset{\mu_1,\mu_2, \mu_3 \in (-1,1)}{\operatorname{argmax}} F_{\theta}(\mu_1, \mu_2, \mu_3), \text{ with}$$
$F_{\theta}(\mu_1, \mu_2, \mu_3) = H(q_1) + H(q_2) + H(q_3) + \theta_1\mu_1 + \theta_2\mu_2 + \theta_3\mu_3 + \theta_{12}\mu_1\mu_2 + \theta_{23}\mu_2\mu_3$,
where $H(q_i) = - \frac{1}{2}(1 + \mu_i) \log \frac{1}{2}(1 + \mu_i) - \frac{1}{2}(1 - \mu_i) \log \frac{1}{2}(1 - \mu_i)$.
Write $q_i(1) = p_i$ and $q_i(-1) = 1 - p_i$. Then
$$\mu_i = E_q[x_i] = p_i - (1-p_i) = 2p_i - 1, \quad p_i = \frac{1 + \mu_i}{2}$$
so choosing a product distribution $q(x) = q_1(x_1)q_2(x_2)q_3(x_3)$ is the same as choosing $(\mu_1, \mu_2, \mu_3) \in$
$(-1,1)^3$.
Moreover, the entropy decomposes across the factors of a product distribution:
$$H(q) = - \sum_x q(x) \log q(x)$$
$$= - \sum_x \sum_{i=1}^3 q(x) \log q_i(x_i) = \sum_{i=1}^3 \left( - \sum_{x_i} q_i(x_i) \log q_i(x_i) \right)$$
$$= H(q_1) + H(q_2) + H(q_3).$$
2 of 30
### Visual Description
The page introduces "Written Questions" for Homework 3, starting with Question 1 on "Non-concavity of the mean-field approximation". It defines an Ising model and the mean-field approximation, including mathematical expressions for $p(x)$, $q^*$, and $E_{\theta}(x)$. Part (a) asks to show the objective function can be written as $F_{\theta}(\mu_1, \mu_2, \mu_3)$, providing the formula for $F_{\theta}$ and $H(q_i)$. It then defines the relationship between $\mu_i$ and $p_i$ and shows the decomposition of entropy $H(q)$ into $H(q_1) + H(q_2) + H(q_3)$. The bottom half of the page is dominated by mathematical derivations.
---
## Page 22
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

For each factor,
$$H(q_i) = -p_i \log p_i - (1-p_i) \log(1-p_i) = \frac{1 + \mu_i}{2} \log \frac{1 + \mu_i}{2} - \frac{1 - \mu_i}{2} \log \frac{1 - \mu_i}{2}$$
Since $q$ factorizes, mixed moments factor too:
$E_q[x_1x_2] = E_q[x_1]E_q[x_2] = \mu_1\mu_2$,
$E_q[x_2x_3] = \mu_2\mu_3$.
Therefore
$E_q[E_{\theta}(x)] = \theta_1\mu_1 + \theta_2\mu_2 + \theta_3\mu_3 + \theta_{12}\mu_1\mu_2 + \theta_{23}\mu_2\mu_3$.
Putting the entropy and energy pieces together,
$H(q) + E_q[E_{\theta}(x)] = H(q_1) + H(q_2) + H(q_3) + \theta_1\mu_1 + \theta_2\mu_2 + \theta_3\mu_3 + \theta_{12}\mu_1\mu_2 + \theta_{23}\mu_2\mu_3$,
which is exactly $F_{\theta}(\mu_1, \mu_2, \mu_3)$. Therefore, maximizing over $q \in Q$ is equivalent to maximizing over
$\mu_1, \mu_2, \mu_3 \in (-1, 1)$.
3 of 30
### Visual Description
Text-only slide.
---
## Page 23
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

(b) (8 points) Assume that $\theta_1 = \theta_2 = \theta_3 = \theta_{23} = 0$. Prove that there exists some $\theta_{12} \in \mathbb{R}$ such that
the objective $F_{\theta}(\mu_1, \mu_2, 0)$ is not a concave function.
Hint: prove that $F(t, -t, 0)$ is not a concave function for $-1 < t < 1$ and for some $\theta_{12}$.
With $\theta_1 = \theta_2 = \theta_3 = \theta_{23} = 0$,
$F_{\theta}(\mu_1, \mu_2, 0) = H(q_1) + H(q_2) + H(q_3) + \theta_{12}\mu_1\mu_2$.
Now restrict this to the line $(\mu_1, \mu_2, \mu_3) = (t, -t, 0)$ with $t \in (-1, 1)$. Since $H(q_2) = H(-t) = H(t)$ and
$H(q_3) = H(0)$ is constant,
$G(t) := F_{\theta}(t, -t, 0) = 2H(t) + H(0) - \theta_{12}t^2$.
So it is enough to show that $G$ is not concave for some $\theta_{12}$, because every line restriction of a concave
function must also be concave.
For the binary entropy in this parameterization,
$H(t) = - \frac{1+t}{2} \log \frac{1+t}{2} - \frac{1-t}{2} \log \frac{1-t}{2}$
and differentiating twice yields
$H''(t) = - \frac{1}{1-t^2}$
Hence
$G''(t) = 2H''(t) - 2\theta_{12} = - \frac{2}{1-t^2} - 2\theta_{12}$.
Pick, say, $\theta_{12} = -2$. Then at $t = 0$,
$G''(0) = -2 - 2(-2) = 2 > 0$.
So $G$ is locally convex at $0$, which means $G$ is not concave on $(-1,1)$. Therefore $F_{\theta}(\mu_1, \mu_2,0)$ is not
concave for this choice of $\theta_{12}$.
4 of 30
### Visual Description
The page presents part (b) of Question 1, asking to prove that the objective function $F_{\theta}(\mu_1, \mu_2, 0)$ is not concave under specific conditions. It provides a hint and then proceeds with the proof. The proof involves setting certain $\theta$ parameters to zero, restricting the function to a line $(\mu_1, \mu_2, \mu_3) = (t, -t, 0)$, defining a new function $G(t)$, and then calculating its second derivative $G''(t)$. It shows the formula for binary entropy $H(t)$ and its second derivative $H''(t)$. Finally, it evaluates $G''(t)$ at $t=0$ with a chosen $\theta_{12}$ value to demonstrate local convexity, thus proving non-concavity. The page is dominated by mathematical derivations and explanations.
---
## Page 24
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

2. As discussed in lecture, we know that for undirected graphical models, the local polytope constitutes an
"outer approximation" of the marginal polytope. We showed the two polytopes are the same when
the graph doesn't contain cycles (i.e. is a tree), but for an arbitrary undirected graph $G$, a valid
set of local marginals $\{q_C(x_C)\}$ isn't always globally valid. That is, for an arbitrary set of local
marginals $\{q_C(x_C)\}$, we cannot always find a distribution $\tilde{q}$ over $X$, such that for every clique $C$,
$q_C(x_C) = \tilde{q}_C(x_C)$.

In this question, we're going to see a natural family of additional inequalities that are also satisfied by
valid marginals.

(a) (10 points) Consider a pairwise undirected graphical model with vertices $V$ and edges $E$. We're
going to further assume that every variable $X_i$ only takes values $\{-1,1\}$ for simplicity.
Consider any cycle $C \subset E$, that is a set of edges $\{(v_1, v_2), (v_2, v_3),..., (v_{m-1}, v_m), (v_m, v_1)\}$,
and any $F \subset C$, s.t. $|F|$ is odd. Show that if $\{q_e\}_e$ are valid marginals, that is there is a distribution
$\tilde{q}$, s.t. for every edge in the graph, $q_e(x_e) = \tilde{q}_e(x_e)$, the following inequality holds for $\{q_e\}$:
$$\sum_{(X_i,X_j) \in C \setminus F} (q_{ij}(X_i = 1, X_j = -1) + q_{ij}(X_i = -1, X_j = 1))$$
$$+ \sum_{(X_i,X_j) \in F} (q_{ij}(X_i = 1, X_j = 1) + q_{ij}(X_i = -1, X_j = -1)) \ge 1,$$
Hint: as the assignment for each variable can be either 1 or -1, think about how many times
the assignment can change when we traverse the cycle in the order $(X_1, X_2, ..., X_m, X_1)$. The
argument made in lecture would also help here.

For a fixed global assignment $x$, define
$$Y(x) = \sum_{(i,j) \in C \setminus F} 1[x_i \ne x_j] + \sum_{(i,j) \in F} 1[x_i = x_j].$$
I claim that $Y(x) \ge 1$ for every assignment.
Indeed, if $Y(x) = 0$, then every edge in $C \setminus F$ has equal endpoints and every edge in $F$ has different
endpoints. So when we walk once around the cycle, the sign changes exactly on the edges in $F$, i.e. exactly
$|F|$ times.
5 of 30
### Visual Description
The page introduces Question 2, discussing the local polytope and marginal polytope in undirected graphical models. It explains that for graphs with cycles, local marginals are not always globally valid. Part (a) asks to show a specific inequality for valid marginals in a pairwise undirected graphical model with variables taking values $\{-1,1\}$. The inequality involves sums over edges in a cycle $C$ and a subset $F$. A hint is provided, suggesting to consider how assignments change when traversing the cycle. The page then defines a function $Y(x)$ and presents a claim that $Y(x) \ge 1$ for every assignment, followed by an explanation of this claim. The page contains significant mathematical notation and text.
---
## Page 25
### Content
This is impossible: on a cycle, one must return to the starting value, so the number of sign changes around the whole loop has to be even. Since $|F|$ is odd, we get a contradiction. Hence $Y(x) \ge 1$ for all $x$.
Now take expectation under the valid global distribution $\tilde{q}$:
$$E_{\tilde{q}}[Y(x)] \ge 1.$$
Expanding the expectation gives
$$E_{\tilde{q}}[Y(x)] = \sum_{(i,j) \in C \setminus F} q(x_i \ne x_j) + \sum_{(i,j) \in F} \tilde{q}(X_i = X_j)$$
$$= \sum_{(i,j) \in C \setminus F} (q_{ij}(1,-1) + q_{ij}(-1,1)) + \sum_{(i,j) \in F} (q_{ij}(1,1) + q_{ij}(-1,-1)),$$
because the pairwise marginals of $\tilde{q}$ are exactly the given $q_{ij}$. So the required cycle inequality follows.

(b) (8 points) Unfortunately, even these cycle constraints are not all the constraints in the marginal polytope. You'll now see an example where the cycle polytope strictly contains the marginal polytope.

Consider a fully connected graph with 5 variables $X_1, ..., X_5$, and let the pairwise marginals be
$$q_{ij}(X_i = 1, X_j = 1) = q_{ij}(X_i = -1, X_j = -1) = \frac{1}{6}$$
$$q_{ij}(X_i = -1, X_j = 1) = q_{ij}(X_i = 1, X_j = -1) = \frac{1}{3}$$
for all pairs of $X_i$ and $X_j$. Show that
1. All the cycle inequalities are satisfied, and
2. there is no distribution $\tilde{q}$ such that for all $x_i$ and $x_j$, $q_{ij}(x_i, x_j) = q_{ij}(X_i, X_j)$.

Hint: to show that the distribution $\tilde{q}$ doesn't exist, consider maximizing the objective function $\sum_{i,j} \delta(x_i \ne x_j)$, compare the solution for valid marginals, and the expected value under $q$.
### Visual Description
Text-only slide.
---

## Page 26
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
First, every pair disagrees with probability
$$q_{ij}(1, -1) + q_{ij}(-1,1) = \frac{1}{3} + \frac{1}{3} = \frac{2}{3}$$
and agrees with probability $\frac{1}{3}$.
1. All cycle inequalities hold. Take any cycle $C$ of length $m$ and any odd $F \subset C$. The left-hand side becomes
$$\sum_{e \in C \setminus F} \frac{1}{3} + \sum_{e \in F} \frac{2(m-|F|) + |F|}{3} = \frac{2m - |F|}{3}$$
If $m$ is odd, the smallest value happens at $|F| = m$, giving $m/3 \ge 1$ since $m \ge 3$. If $m$ is even, the largest odd choice is $|F| = m-1$, giving $(m+1)/3 \ge 5/3 > 1$. So every cycle inequality is satisfied.
2. No global distribution can realize these marginals. Let
$$S(x) = \sum_{1 \le i < j \le 5} \mathbf{1}[x_i \ne x_j],$$
the number of disagreeing pairs in the complete graph $K_5$.
For any deterministic assignment with $r$ variables equal to 1 and $5-r$ equal to -1, the number of disagreements is
$$S(x) = r(5-r) \le 6,$$
with the maximum value 6 attained at the split $r=2$ or $r=3$. Therefore, for any global distribution $\tilde{q}$ on $X$,
$$E_{\tilde{q}}[S(x)] \le 6.$$
But under the proposed pairwise marginals,
$$E[S(x)] = \sum_{1 \le i < j \le 5} q_{ij}(X_i \ne X_j) = \binom{5}{2} \cdot \frac{2}{3} = 10 \cdot \frac{2}{3} = \frac{20}{3} > 6.$$
That contradicts the upper bound above. So there is no distribution $\tilde{q}$ whose pairwise marginals are these $q_{ij}$.

3. (Convergence and Non-convergence of the loopy belief propagation algorithm) In this question, we will see loopy belief propagation (LBP) algorithm can sometimes converge, and sometimes not. (Of course, even if it does converge, there's no guarantee it'll converge to the correct marginals.)

Consider a pairwise undirected graphical model (UGM) defined on a graph $G = (V, E)$, where $V$ denotes a set of random variables with domain $X$ and $E$ denotes a set of edges. The UGM can be
### Visual Description
Text-only slide.
---

## Page 27
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
factorized as:
$$p(X = x) = \frac{1}{Z_G} \prod_{(i,j) \in E} \Phi_{i,j}(X_i, X_j),$$
where $Z_G$ is the partition function of this UGM. Next, the LBP algorithm for the pairwise UGM can be characterized as following: given number of iterations $T$, initial messages $m_{j \to i,0}(x)$, $m_{i \to j,0}(x)$ for all $(i, j) \in E$ and for all $x \in X$.
1: procedure LBP(G, T, initial messages ):
2: for $t \in (1... T)$ do
3: for $(i, j) \in E$ do
4: for $x_i \in X$ do
5: $m_{j \to i,t}(x_i) \leftarrow \sum_{x_j \in X} \Phi_{i,j}(x_i, x_j) \prod_{k \in N(j) \setminus i} m_{k \to j,t-1}(x_j)$.
6: Normalize $m_{j \to i,t}(x)$ for all $x \in X$ so that $\sum_{x \in X} m_{j \to i,t}(x) = 1$.
7: for $x_j \in X$ do
8: $m_{i \to j,t}(x_j) \leftarrow \sum_{x_i \in X} \Phi_{i,j}(x_i, x_j) \prod_{k \in N(i) \setminus j} m_{k \to i,t-1}(x_i)$.
9: Normalize $m_{i \to j,t}(x)$ for all $x \in X$ so that $\sum_{x \in X} m_{i \to j,t}(x) = 1$.
10: Return $m_{j \to i,T}$ and $m_{i \to j,T}$ for all $(i, j) \in E$

Ideally, we set the number of iterations $T$ large enough so that all messages converge to some fixed point. After they converge, we can calculate the marginals using the following formula:
$$Pr(X_i = x_i) \propto \prod_{k \in N(i)} m_{k \to i,T}(X_i).$$
Now assume that we aim to use LBP to calculate the marginal distribution. Consider an undirected graphical model $G = (V, E)$, where the node set $V = \{1,2,..., n\}$ represents $n$ binary random variables $X_1,..., X_n \in \{0,1\}$ and the edge set is $E = \{(1,2),..., (n-1, n), (n, 1)\}$. Therefore, these variables form a single cycle consisting of edges between $i$ and $i+1$ for all $1 \le i \le n-1$ and between $1$ and $n$. The potential function for each edge is
$$\Phi_{i,j}(X_i = x_i, X_j = x_j) = \begin{cases} 1, & \text{if } x_i = x_j \text{ for all } (i, j) \in E. \\ \epsilon, & \text{otherwise.} \end{cases}$$
(a) (2 points) Numerical Answer: Assume that $0 < \epsilon < 1$. What is the true marginal probabilities $P(X_1 = 0)$ and $P(X_1 = 1)$?
$P(X_1 = 0) = P(X_1 = 1) = \frac{1}{2}$.

(b) (8 points) Assume that $0 < \epsilon < 1$ and $[m_{j \to i,0}(0), m_{j \to i,0}(1)] = [\pi_0, 1 - \pi_0]$ with $0 < \pi_0 \le 1$ for all $(i, j) \in E$ and $(j, i) \in E$. Prove that $P_T(X_1 = x_1)$ converges to the true marginal probability, i.e.
$$\lim_{T \to \infty} P_T(X_1 = x_1) = P(X_1 = x_1).$$
Hint: derive the following recursive formulas for messages: show that there exist positive constants $C_1, C_2 < 1$ such that
$$m_{i \to j,t}(x) - C_1 = C_2 (m_{k \to i,t-1}(x) – C_1), \text{ for } x \in \{0,1\},$$
for all connected vertices $(k, i, j)$, i.e. $(k, i), (i, j) \in E$ (or $(j, i), (i, k) \in E$). Also, show that the messages $m_{i \to j,t}(x) = m_{k \to i,t}(x)$ are the same.
### Visual Description
Text-only slide.
---

## Page 28
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
Because all initial messages are identical and every edge uses the same potential, induction shows that at every iteration all directed messages remain identical. Thus we may write
$$m_{i \to j,t}(0) = p_t, \quad m_{i \to j,t}(1) = 1 - p_t$$
for every directed edge $(i, j)$.
Consider the update of a single message. Since each node has exactly one incoming message besides the target edge,
$$m_{i \to j,t}(0) = \Phi(0,0)p_{t-1} + \Phi(1,0)(1-p_{t-1}) = p_{t-1} + \epsilon(1 - p_{t-1}),$$
$$m_{i \to j,t}(1) = \Phi(0,1)p_{t-1} + \Phi(1,1)(1 - p_{t-1}) = \epsilon p_{t-1} + (1 - p_{t-1}).$$
The normalizer is $(1 + \epsilon)$, so
$$p_t = \frac{\epsilon + (1-\epsilon)p_{t-1}}{1+\epsilon}$$
Rearranging,
$$p_t - \frac{1}{2} = \frac{1-\epsilon}{1+\epsilon} \left(p_{t-1} - \frac{1}{2}\right).$$
Thus the hint is satisfied with
$$C_1 = \frac{1}{2}, \quad C_2 = \frac{1-\epsilon}{1+\epsilon} \in (0,1).$$
Hence $p_t \to \frac{1}{2}$, and therefore every message converges to $(\frac{1}{2}, \frac{1}{2})$.
Finally, the belief at node 1 is
$$Pr(X_1 = 0) \propto p_T^2, \quad Pr(X_1 = 1) \propto (1 - p_T)^2.$$
Thus
$$P_T(X_1 = 0) = \frac{p_T^2}{p_T^2 + (1-p_T)^2} \to \frac{1}{2}, \quad P_T(X_1 = 1) \to \frac{1}{2}.$$
By part (a), these are exactly the true marginals.

(c) (8 points) Assume that $\epsilon = 0$ and initial messages are positive and normalized, i.e.
$$m_{j \to i,0}(0) + m_{j \to i,0}(1) = 1 \text{ for all } (i, j) \text{ or } (j, i) \in E.$$
Prove that if the initial messages for all edges are not identical, i.e. there exist $(i_1, j_1), (i_2, j_2) \in E$ satisfying $m_{j_1 \to i_1,0}(0) \ne m_{j_2 \to i_2,0}(0)$ and $m_{i_1 \to j_1,0}(0) \ne m_{i_2 \to j_2,0}(0)$, the messages do not converge.
### Visual Description
Text-only slide.
---

## Page 29
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
When $\epsilon = 0$, the edge potential reduces to
$$\Phi_{i,j}(X_i, X_j) = \mathbf{1}[X_i = X_j].$$
So the update becomes especially simple. If $k$ is the other neighbor of $i$, then
$$m_{i \to j,t}(0) \propto \Phi(0,0)m_{k \to i,t-1}(0) + \Phi(1,0)m_{k \to i,t-1}(1) = m_{k \to i,t-1}(0),$$
$$m_{i \to j,t}(1) \propto \Phi(0,1)m_{k \to i,t-1}(0) + \Phi(1,1)m_{k \to i,t-1}(1) = m_{k \to i,t-1}(1).$$
These already sum to 1, so normalization does nothing. Thus each message copies the previous message from the preceding edge.
Let
$$u_{i,t} := m_{i \to i+1,t}(0), \quad v_{i,t} := m_{i+1 \to i,t}(0),$$
with indices modulo $n$. Then
$$u_{i,t} = u_{i-1,t-1}, \quad v_{i,t} = v_{i+1,t-1}.$$
So the clockwise messages $\{u_{i,t}\}_i$ rotate one step each iteration, and the counterclockwise messages $\{v_{i,t}\}_i$ do the same in the opposite direction. In particular,
$$u_{i,t+n} = u_{i,t}, \quad v_{i,t+n} = v_{i,t},$$
so every message sequence is periodic with period dividing $n$.
Now suppose the messages converged. A convergent periodic sequence must eventually be constant, so each $u_{i,t}$ would have to be the same for all $t$, which forces
$$u_{1,0} = u_{2,0} = \dots = u_{n,0}.$$
Likewise convergence of the reverse-direction messages forces
$$v_{1,0} = v_{2,0} = \dots = v_{n,0}.$$
But the hypothesis says the initial messages are not identical in either direction: there exist two edges with different $m_{j \to i,0}(0)$ values and two edges with different $m_{i \to j,0}(0)$ values. So at least one periodic orbit has more than one distinct value, which means it cannot converge.
Therefore the messages do not converge when $\epsilon = 0$ and the initial edge messages are not all identical.
### Visual Description
Text-only slide.
---

## Page 30
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
4. (Bayesian Hidden Markov Models) In this question, we will study Bayesian Hidden Markov Models (HMMs) with two states, and estimate the posterior distribution of the initial state's probability vector $\pi$, the state transition matrix $A$, and the latent sequence $Z_{1:T}$ with mean-field approximation.

We begin by defining a Hidden Markov Model with two latent states where the generative process is defined as follows.

Let the initial (unknown) state probability vector $\pi = (\pi_1, \pi_2)$, with $\pi_1 + \pi_2 = 1$, be drawn
## Page 33
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
(b) (5 points) Derive the update formula for the parameters of $q(A)$.
Keep only the terms involving A:
$ln p(x_{1:Τ}, z_{1:Τ}, π, A) = \sum_{i=1}^2 lnp(A_i) + \sum_{t=2}^T lnp(z_t | z_{t-1}, A) + const.$
Using the Dirichlet prior row by row,
$ln p(A_i) = \sum_{j=1}^2 (\beta_j – 1) ln a_{ij} + const,$
and
$ln p(z_t | z_{t-1}, A) = \sum_{i=1}^2 \sum_{j=1}^2 \mathbf{1}[z_{t-1} = i]\mathbf{1}[z_t = j] ln a_{ij}.$
Now take expectation over $q(π, z_{1:T})$:
$ln q^*(A) = \sum_{i=1}^2 \sum_{j=1}^2 (\beta_j – 1) ln a_{ij}$
$+ \sum_{t=2}^T \sum_{i=1}^2 \sum_{j=1}^2 \mathbb{E}[\mathbf{1}[z_{t-1} = i]\mathbf{1}[z_t = j]] ln a_{ij} + const.$
Because the mean-field posterior factorizes over $z_{t-1}$ and $z_t$,
$\mathbb{E}[\mathbf{1}[z_{t-1} = i]\mathbf{1}[z_t = j]] = \phi_{t-1}(i)\phi_t(j).$
So
$ln q^*(A) = \sum_{i=1}^2 \sum_{j=1}^2 (\beta_j -1 + \sum_{t=2}^T \phi_{t-1}(i)\phi_t(j)) ln a_{ij} + const.$
Hence each row stays Dirichlet:
$q(A) = \prod_{i=1}^2 Dir(A_i | \delta_i), \quad \delta_{ij} = \beta_j + \sum_{t=2}^T \phi_{t-1}(i)\phi_t(j).$
Thus $\delta_{ij}$ equals the prior parameter plus the expected number of transitions $i \to j$.
### Visual Description
Text-only slide.

---

## Page 34
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
(c) (10 points) Derive the update formula for the parameters of $q(z_t)$.
For $q(z_t)$, only the factors touching $z_t$ survive. It is convenient to define
$\pi_i := \mathbb{E}[ln \pi_i] = \psi(\gamma_i) - \psi(\gamma_1+\gamma_2),$
and
$\bar{a}_{ij} := \mathbb{E}[ln a_{ij}] = \psi(\delta_{ij}) – \psi(\delta_{i1} + \delta_{i2}).$
Also write the emission log-likelihood as
$l_t(i) := ln \mathcal{N}(x_t | \mu_i, \sigma^2).$
Case 1: $t = 1$. The relevant terms are
$ln p(z_1 | \pi) + ln p(x_1|z_1) + ln p(z_2 | z_1, A).$
Therefore, for $i \in \{1, 2\}$,
$ln q^*(z_1 = i) = l_1(i) + \mathbb{E}[ln \pi_i] + \sum_{j=1}^2 \mathbb{E}[\mathbf{1}[z_2 = j]] \mathbb{E}[ln a_{ij}] + const$
$= l_1(i) + \pi_i + \sum_{j=1}^2 \phi_2(j)\bar{a}_{ij} + const.$
### Visual Description
Text-only slide.

---

## Page 35
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
Case 2: $1 < t < T$. Then the relevant terms are
$ln p(z_t|z_{t-1}, A) + ln p(x_t | z_t) + ln p(z_{t+1} | z_t, A).$
So for $i \in \{1, 2\}$,
$ln q^*(z_t = i) = l_t(i) + \sum_{a=1}^2 \mathbb{E}[\mathbf{1}[z_{t-1} = a]] \mathbb{E}[ln a_{ai}]$
$+ \sum_{b=1}^2 \mathbb{E}[\mathbf{1}[z_{t+1} = b]] \mathbb{E}[ln a_{ib}] + const$
$= l_t(i) + \sum_{a=1}^2 \phi_{t-1}(a)\bar{a}_{ai} + \sum_{b=1}^2 \phi_{t+1}(b)\bar{a}_{ib} + const.$
Case 3: $t = T$. There is no outgoing transition term, so
$ln q^*(z_T = i) = l_T(i) + \sum_{a=1}^2 \phi_{T-1}(a)\bar{a}_{ai} + const.$
In all three cases, the update has the same softmax form:
$\phi_t(i) = q(z_t = i) = \frac{exp(s_t(i))}{\sum_{r=1}^2 exp(s_t(r))}'$
where $s_t(i)$ is the corresponding score from the expressions above.
### Visual Description
Text-only slide.

---

## Page 36
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
The final coordinate updates may therefore be written compactly as
$\phi_1(i) \propto exp \left( l_1(i) + \pi_i + \sum_{j=1}^2 \phi_2(j)\bar{a}_{ij} \right),$
$\phi_t(i) \propto exp \left( l_t(i) + \sum_{a=1}^2 \phi_{t-1}(a)\bar{a}_{ai} + \sum_{b=1}^2 \phi_{t+1}(b)\bar{a}_{ib} \right), \quad 1 < t < T,$
$\phi_T(i) \propto exp \left( l_T(i) + \sum_{a=1}^2 \phi_{T-1}(a)\bar{a}_{ai} \right).$
After normalizing each two-dimensional vector $\phi_t$, we are done.
Equivalently, each latent state is updated by combining
1. the local Gaussian evidence for $x_t$,
2. the expected incoming transition score, and
3. the expected outgoing transition score,
with the special case $t = 1$ using the prior over $\pi$ instead of an incoming transition.
### Visual Description
Text-only slide.

---

## Page 37
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
5. (Variance of REINFORCE and reparametrization trick) We will consider now the variance of the two estimators introduced for calculating gradients of the VAE loss: REINFORCE and the reparametrization trick. Though usually it's said that the reparametrization trick is useful because it has lower variance, this is in general not true: we will see it in this problem.
The setting is as follows: let us consider estimating a quantity $F = \nabla_\mu(\mathbb{E}_{x \sim q_\mu} f(x))$, for some function $f: \mathbb{R} \to \mathbb{R}$ and $q_\mu = \mathcal{N}(\mu, 1)$, for $\mu \in \mathbb{R}$. We will consider the two estimators mentioned in class, the REINFORCE estimator, and the estimator implied by the reparametrization trick.
As a reminder, the REINFORCE estimator is based on writing
$\nabla_\mu(\mathbb{E}_{x \sim q_\mu} f(x)) = \nabla_\mu \int f(x)q_\mu(x)dx$
$= \int f(x) (\nabla_\mu log q_\mu(x))q_\mu(x)dx$
$= \mathbb{E}_{x \sim q_\mu} (f(x)\nabla_\mu log q_\mu(x))$
Given samples $\{x_i\}_{i=1}^n$ from $q_\mu$, we estimate $F$ as
$\frac{1}{n} \sum_{i=1}^n f(x_i) \nabla_\mu log q_\mu(x_i)$
The reparametrization trick writes a sample $x \sim q_\mu$ as $x = \mu + \epsilon$, where $\epsilon \sim \mathcal{N}(0,1)$. Denoting $g(\mu, \epsilon) = \mu + \epsilon$, by the change of variables formula, we can write $F$ as
$\nabla_\mu(\mathbb{E}_{x \sim q_\mu}f(x)) = \mathbb{E}_{\epsilon \sim \mathcal{N}(0,1)} (f' (\mu + \epsilon)\nabla_\mu g(\mu, \epsilon))$
Given samples $\{x_i\}_{i=1}^n$ from $\mathcal{N}(0, 1)$, we estimate $F$ as
$\frac{1}{n} \sum_{i=1}^n f' (\mu + x_i) \nabla_\mu g(\mu, x_i)$
As is immediately apparent, the former estimator involves $f$, the latter $f'$. Depending on how the gradients of $f$ grow compared to $f$, we will show that the variance of either of the two estimators can be smaller.
(a) (5 points) Show that the variance of the REINFORCE estimator satisfies
$Var_x (f(x)\nabla_\mu log q_\mu(x)) = Var_x(f(x)(x - \mu)).$
For $q_\mu = \mathcal{N}(\mu, 1)$,
$log q_\mu(x) = -\frac{1}{2} (x - \mu)^2 - \frac{1}{2} log(2\pi).$
Differentiate with respect to $\mu$:
$\nabla_\mu log q_\mu (x) = x - \mu.$
So the REINFORCE estimator is exactly $f(x)(x – \mu)$, and therefore
$Var_x (f(x)\nabla_\mu log q_\mu(x)) = Var_x(f(x)(x – \mu)).$
### Visual Description
Text-only slide.

---

## Page 38
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
(b) (5 points) Show that the variance of the reparametrization trick estimator satisfies
$Var_\epsilon (f' (\mu + \epsilon) \nabla_\mu g(\mu, \epsilon)) = Var_\epsilon(f' (\mu + \epsilon)).$
Here $g(\mu, \epsilon) = \mu + \epsilon$, so
$\nabla_\mu g(\mu, \epsilon) = 1.$
Therefore, the estimator from the reparametrization trick is simply
$f' (\mu + \epsilon) \cdot 1 = f' (\mu + \epsilon).$
Hence
$Var_\epsilon (f' (\mu + \epsilon) \nabla_\mu g(\mu, \epsilon)) = Var_\epsilon (f' (\mu + \epsilon)).$
(c) (7 points) Show that for any $f$, s.t. $f(x) = a + bx$, $a, b \in \mathbb{R}$, and evaluated at $\mu = 0$, the variance of the REINFORCE estimator is bigger than the variance of the reparametrization trick estimator. You may use the fact that the 4th moment of the standard Gaussian satisfies $\mathbb{E}_{\epsilon \sim \mathcal{N}(0,1)} [\epsilon^4] = 3$.
Set $\mu = 0$ and write $\epsilon \sim \mathcal{N}(0, 1)$. For $f(x) = a + bx$,
$f'(\epsilon) = b.$
So the reparametrization estimator is the constant $b$, and
$Var(f'(\epsilon)) = 0.$
For REINFORCE,
$f(\epsilon)\nabla_\mu log q_0(\epsilon) = (a + b\epsilon)\epsilon = a\epsilon + b\epsilon^2.$
Its mean is
$\mathbb{E}[a\epsilon + b\epsilon^2] = b.$
Its second moment is
$\mathbb{E}[(a\epsilon + b\epsilon^2)^2] = a^2\mathbb{E}[\epsilon^2] + 2ab\mathbb{E}[\epsilon^3] + b^2\mathbb{E}[\epsilon^4] = a^2 + 0 + 3b^2.$
Therefore
$Var(a\epsilon + b\epsilon^2) = a^2 + 3b^2 – b^2 = a^2 + 2b^2.$
So
$Var_{REINFORCE} = a^2 + 2b^2 \geq 0 = Var_{reparam},$
and it is strictly larger unless $a = b = 0$.
### Visual Description
Text-only slide.

---

## Page 39
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
(d) (7 points) Show that if $f(x) = 1/x$, and evaluated at $\mu = 0$, the variance of the reparametrization trick estimator is bigger than the variance of the REINFORCE estimator. You may use the fact that the variance of $1/\epsilon^2$, $\epsilon \sim \mathcal{N}(0, 1)$ is infinite.
Again set $\mu = 0$ and let $\epsilon \sim \mathcal{N}(0,1)$. If $f(x) = 1/x$, then
$f'(x) = -\frac{1}{x^2}.$
So the reparametrization estimator is
$f'(\epsilon) = -\frac{1}{\epsilon^2}.$
Its variance is the same as the variance of $1/\epsilon^2$, which the hint tells us is infinite.
For REINFORCE,
$f(\epsilon)\nabla_\mu log q_0(\epsilon) = \frac{1}{\epsilon} \cdot \epsilon = 1$
for every $\epsilon \neq 0$; the point $\epsilon = 0$ has probability 0 anyway. So this estimator is almost surely constant, and
$Var_\epsilon (f(\epsilon)\nabla_\mu log q_0(\epsilon)) = 0.$
Hence
$Var_{reparam} = \infty > 0 = Var_{REINFORCE}.$
So in this example the reparametrization estimator has much larger variance.
### Visual Description
Text-only slide.

---

## Page 40
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
2 Programming [20 pts]
For the programming portion of this homework, we're going to focus less on complex software implemen-tations and more on being able to see the amazing results that are possible with variational inference. Using a corpus of articles published in the New York Times, we will be learning the parameters of an LDA model. Then, we'll ask you to do some exploration with the model you've learned.
2.1 Vanilla LDA
Let's recap the vanilla LDA model presented several times in class. Recall, the model has the following parameters:
1. K is the fixed number of topics, V is the size of the vocabulary, M is the number of documents and N is the number of words per document. For simplicity and ease of computation, we assume that each document has the same number of words
2. $\alpha \in \mathbb{R}^K$ be the parameters of the Dirichlet prior over the K topics
3. $\beta \in \mathbb{R}^{K \times V}$, where the row vector $\beta^k \in \mathbb{R}^V$, $k \in [K]$ consists of the parameters of a multinomial distribution on the vocabulary for topic $k$, specifying the probabilities of each word in the vocabulary under that topic. Note that $\beta^k \mathbf{1}_{V \times 1} = 1$, where $\mathbf{1}_{V \times 1}$ denotes a column vector of all ones.
4. $\theta^i \in \mathbb{R}^K$, $i \in [M]$ is the parameter of multinomial distribution over the K topics for document $i$. Therefore $\mathbf{1}_{1 \times K} \theta^i = 1$.
5. $z_{ij} \in [K]$, $i \in [M]$, $j \in [N]$ is the topic selected for the $j^{th}$ word of the $i^{th}$ document.
6. $w_{ij} \in [V]$, $i \in [M]$, $j \in [N]$ be the vocabulary index of the $j^{th}$ word of the $i^{th}$ document
To sample the M documents, each with N words: sample $\theta^i$, $i \in [M]$ from Dirichlet($\alpha$) and then sample $z_{ij}$, $i \in [M]$, $j \in [N]$ from Multinomial($\theta^i$) and finally sample $w_{ij}$, $i \in [M]$, $j \in [N]$ from Multinomial($\beta^{z_{ij}}$).
The model is shown in plate notation in 2.1.

$\alpha$
$\theta$
$\beta$
$z$
$w$
$N$
$M$

Figure 2.1: LDA Generative Model
Our task is thus to estimate these parameters, as well as the latent parameters representing each document's distribution over topics and each word's latent topic. We will do so with a classical algorithm known as Expectation-Maximization, or the EM algorithm.
2.1.1 Shape Convention and Slice Notation
1. The number of documents is M. The documents are always indexed by i.
2. The number of words per document is N. Words are always indexed by j.
3. The number of topics is K. Topics are always indexed by k.
### Visual Description
A plate notation diagram for the LDA Generative Model. It shows $\alpha$ pointing to $\theta$, $\theta$ pointing to $z$, $\beta$ pointing to $w$, and $z$ pointing to $w$. There are plates around $z$ and $w$ for $N$, and a larger plate around $\theta$, $z$, and $w$ for $M$.

---
## Page 41
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

4. The vocabulary of size $V$ (ordered in some arbitrary fashion), and is always indexed by $v$.
5. If we have a tensor $T$ of the shape $[M, N, K, V]$, and $1 \le i \le M$, then $T^i$ is slice of the tensor, and another tensor of shape $[N, K, V]$. It will be clear from context which dimension of the tensor we are "slicing" over.

2.1.2 Expectation Step
For each document $i \in [M]$, our first objective is to compute the posterior distribution on the latent variables:
$$
p(\theta^i, \{z_{ij}\}_j | \{w_{ij}\}_j, \alpha, \beta) = \frac{p(\theta^i, \{z_{ij}\}_j, \{w_{ij}\}_j | \alpha, \beta)}{p(\{w_{ij}\}_j|\alpha, \beta)}
$$
As usual, this is intractable due to the need to marginalize out the latents in the denominator of this expres- sion. Instead, we turn to variational inference!

Figure 2.2: Graphical Representation of the Variational Distribution

Figure 2.2 depicts our chosen variational distribution which we will use to approximate the intractable pos- terior. Observe that we have dropped the prior $\alpha$ over topic distributions which is shared by all documents; instead, our approximation assumes that each document's topic distribution $\theta^i \in \mathbb{R}^K$ is drawn as a function of the variational parameter $\gamma^i \in \mathbb{R}^K$. Likewise, each document has its own variational distribution over topics with the variational parameter $\phi^i \in \mathbb{R}^{N \times K}$. We will also view $\phi$ as a tensor of dimensions $[M, N, K]$, in which case $\phi^i$ is a slice of this tensor.

With the variational parameters defined, we can write the variational distribution for a single document as follows:
$$
q(\theta^i, \{z_{ij}\}_j | \gamma^i, \phi^i) = q(\theta^i | \gamma^i) \prod_{j=1}^N q(z_{ij} | \phi^i_j) := q^i \quad (2.1)
$$
Recall that standard variational inference uses separate variables for each observation. So, we will be opti- mizing the variational parameters separately for each document.

Our goal is to optimize the variational parameters so as to minimize the KL Divergence from our variational distribution to the true posterior. That is,
$$
(\gamma^{*i}, \phi^{*i}) = \arg \min_{\gamma^i, \phi^i} D (q(\theta^i, \{z_{ij}\}_j | \gamma^i, \phi^i) || p(\theta^i, \{z_{ij}\}_j | \{w_{ij}\}_j, \alpha, \beta)). \quad (2.2)
$$
We will minimize this objective by repeatedly solving for a fixed point. Taking the derivative of the KL Divergence, setting it equal to 0, and solving gives us a set of updates which ensure that our parameter

22 of 30
### Visual Description
The page contains text, a numbered list, a section heading, two mathematical equations, and a graphical model diagram. The diagram shows a plate model with nodes Y, Φ, θ, Z, N, and M, representing a hierarchical structure.
---
## Page 42
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708
estimates will converge to the optimum. As promised, we will not make you derive these updates as they are tedious, but the full calculations can be found in the original LDA paper (Blei et al. (2003)).
$$
\phi_{ijk} \propto \beta_{kv}^w \exp \left(E_{q^i} [\log \theta_{ik} | \gamma^i]\right), \quad (2.3)
$$
$$
\gamma_{ik} = \alpha_k + \sum_{j=1}^N \phi_{ijk}. \quad (2.4)
$$
where $\beta_{kv}^w$ is the $w_{ij}$-th coordinate of $\beta^k$. Note, we are viewing $\phi$ as a tensor of dimensions $[M, N, K]$.
Finally, the expectation term in the above update is:
$$
E_{q^i} [\log \theta_{ik} | \gamma^i] = \Psi(\gamma_{ik}) - \Psi \left(\sum_{j=1}^K \gamma_{ij}\right), \quad (2.5)
$$
where $\Psi$ is the derivative of the log of the Gamma function, also known as the digamma function. Observe that the second term in this expectation can be ignored, because we are only solving for the updated $\phi_{ijk}$ up to proportionality ($\phi_{ijk}$ will be normalized to 1 after each iteration).

These updates, repeated until convergence, give us the Expectation step of our expectation-maximization algorithm. For a fixed (assumed known) $\alpha, \beta$, we are optimizing the parameters to ensure our variational distribution gives as close an approximation to the true posterior as possible.

2.1.3 Maximization Step
The above algorithm is only one half of our expectation-maximization procedure. Recall that this objective optimizes the variational parameters for a fixed $\alpha, \beta$. Once we have learned these parameters, our next step is to find the choice of $\alpha, \beta$ which maximizes the resulting lower bound on the log-likelihood of the observed data (hence, the Maximization step). We will then cycle between these two procedures until we arrive at a complete solution.

Once again, we will skip the details and give you the precise update:
$$
\beta_{kv}^k \propto \sum_{i=1}^M \sum_{j=1}^N \phi_{ijk} [w_{ij} = v] \quad \forall k \in [k], v \in [V] \quad (2.6)
$$
To implement this update efficiently, it may be helpful to look into the function `numpy.einsum`. Don't forget to normalize $\beta^k$ to sum to 1. Additionally, the update to $\alpha$ is given as
$$
\alpha = \alpha + \frac{g-c}{h} \quad (2.7)
$$
where $c = \frac{\sum_{k=1}^K g_k/h_k}{\Psi'(z)^{-1} + \sum_{k=1}^K (h_k)^{-1}}$. The $g$ and $h$ in these expressions are $K$-dimensional vectors which give the gradient, and a particular vector which shows up in the Hessian, of the log-likelihood with respect to $\alpha$, respectively. The $z$ is a scalar that also shows up in the Hessian. They can be computed as
$$
g^k = M \left(\Psi(\alpha_k) - \Psi\left(\sum_{t=1}^K \alpha_t\right)\right) + \sum_{i=1}^M \left(\Psi(\gamma_{ik}^i) - \Psi\left(\sum_{t=1}^K \gamma_{it}^i\right)\right) \quad (2.8)
$$
$$
h^k = M\Psi'(\alpha_k), \quad (2.9)
$$
$$
z = -\Psi' \left(\sum_{t=1}^K \alpha_t\right) \quad (2.10)
$$
23 of 30
### Visual Description
Text-only slide.
---
## Page 43
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708
Note the use of $\Psi'$, not $\Psi''$! This is the derivative of the digamma function, or the second derivative of the log Gamma function. It is known as the *polygamma function of order 1*.

2.1.4 Implementation notes
*   For the very first E-step, initialize the parameters
    1.  $\alpha^k = 0.1, \forall k$
    2.  $\beta^{kv} \sim U(0, 1)$ and normalize each $\beta^k$ to 1, $\forall k, v$
    3.  $\phi_{ijk} = \frac{1}{K}, \forall i, j, k$
    4.  $\gamma_{ik} = \alpha_k + N/K, \forall i, k$
*   To check convergence for the E-step, you can use the following criterion:
    $$
    \frac{1}{2M} \left(||\phi(t) - \phi(t-1)|| + ||\gamma(t) - \gamma(t-1)||\right) \le 10^{-2}
    $$
    where, $||.||$ is the $l_2$ norm of the tensor.
*   To check convergence of $\alpha$ for the M-step, you can use a tolerance of $||\alpha(t+1) - \alpha(t)|| \le 10^{-4}$.
*   To check the convergence of the EM algorithm, you can set a reasonable number of maximum itera- tions, say between 50 - 100.
*   Feel free to use the scipy functions for digamma and polygamma computations.

That's it! After doing the two updates in the M step, you should return to the E step and again iterate until convergence. Cycling between these two steps gives the EM algorithm for learning an LDA model. In the next section, we will discuss the specifics of the dataset and what exactly you will be doing for this programming assignment.

24 of 30
### Visual Description
Text-only slide.
---
## Page 44
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

2.2 LDA on New York Times Articles
In this assignment, we will be using the above variational EM algorithm to learn the parameters of an LDA model for a corpus of articles by the New York Times. You'll also get to do this for an article of your choosing!

The handout includes two files, `nyt_vocab.txt` and `nyt_data.txt`. The former is a simple list of vocabulary words. The latter is a collection of articles coming from the New York Times which has already been partially formatted for you. Each document is on a separate line, encoded as key:value pairs—the key is the index of the vocabulary word as it appears in the vocab file (0-indexed, of course) and the value is the number of times that word appears in the document. Since the LDA model doesn't account for word order, this encodes all the information you need but in an easier format.

Unfortunately, we do not have the original source documents from which these counts were created. As a result, we won't be able to directly tie our learned topics to specific articles. To partially fix this, we want you to pick an article/document of your choice to add it to the corpus. Be sure to pick something which is available online and save the url. You can choose any body of text you like, but note the following:
*   It should be sufficiently long that the number of vocabulary words which occur are somewhere around 100-200 (could be more).
*   If you choose something wildly different from what might be covered in the Times, your model may have difficulty picking the right topic(s). We don't think this is likely to be a problem because of the size of the corpus, but just keep this in mind.
*   If you like, you can do multiple articles! This will not take any additional work and it will mean you get some more cool results.

(a) (2 points) Report the title and url of the article you chose and give a brief description of what the article is about.

Title: Elon Musk
URL: `https://www.biography.com/business-leaders/elon-musk`
I selected Biography.com's Elon Musk profile. It is a biographical article covering his early life, major companies such as Zip2, PayPal, Tesla, SpaceX, and X, his wealth and business career, and some of his political activity.

Now that you've chosen an article, you should copy the raw text into a file. Then, write a script to count the number of occurrences of each vocabulary word and encode the document in the same format as the provided corpus. Finally, append your formatted article to `nyt_data.txt`.

25 of 30
### Visual Description
The page contains text, a section heading, bullet points, a question, and a text box providing an answer with a title, URL, and description.
---
## Page 45
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708
Now for the algorithm! Using the steps described in the previous section, implement the variational EM algorithm to learn the parameters for an LDA model of the data. A few specifics:
*   Recall that we assume a fixed document length $N$—for this assignment, we will set $N = 200$. First, you should throw away all documents with fewer than 150 words. Then, for documents with *fewer* than $N$ words, sample $N$ words from the document uniformly with replacement, and for documents with *more* than $N$ words, sample exactly $N$ words without replacement.
*   We also assume a fixed number of topics $K$. We choose to set $K = 25$; this provides a nice balance such that there won't be too many combined topics, but also we won't have "leftover" topics that don't correlate with anything.

We highly recommend you vectorize functions where applicable and think about which calculations can be evaluated as a matrix product—and keep in mind `numpy.einsum`. Be sure to save your final parameter estimates!

Once you've run this algorithm to convergence, you should have three sets of parameters which interest us. The first is $\alpha$, the Dirichlet prior over document topics. The second is $\beta$, which parameterizes each topic's multinomial distribution over words. The last one is $\theta$, the inferred distribution over topics for each document; this one you won't have solved for directly, but it will be the mean of $q(\theta | \gamma)$.

(b) (8 points) Pick 5 random topics, and for each one, report the 10 words with the highest likelihood. Based on these words, can you identify the focus of each topic? What are they?

The five sampled topics were 8, 15, 16, 20, and 22.
Topic 8: official, states, government, military, cause, tell, kill, group, plan, life. Government and conflict reporting.
Topic 15: issue, member, official, public, support, law, move, leader, state, company. Public policy and institutions.
Topic 16: case, family, lawyer, child, tell, member, ask, receive, charge, law. Courts and family law.
Topic 20: official, government, political, american, leader, military, group, states, force, tell. National politics and foreign affairs.
Topic 22: child, tell, school, live, home, life, woman, little, ago, thing. Family, education, and social life.

26 of 30
### Visual Description
The page contains text, bullet points outlining specifics for the LDA model implementation, a question, and a text box providing an answer with a list of sampled topics, their top 10 words, and identified focus for each.
---
## Page 46
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

(c) (4 points) Now you get to see the payoff of choosing your own article! Having inferred the distribution over topics $\theta$ for your specific article, find the two or three topics with the highest likelihood under $\theta$, and report the top 10 words for these topics. What might these topics represent? Does this match your description of the article which you gave earlier?

The top three topics for my Elon Musk document were Topic 17, Topic 22, and Topic 16.
Topic 17: percent, company, market, rise, increase, industry, price, business, cost, pay. Business, markets, and corporate performance.
Topic 22: child, tell, school, live, home, life, woman, little, ago, thing. Childhood, family, and personal life.
Topic 16: case, family, lawyer, child, tell, member, ask, receive, charge, law. Legal and family-related matters.
This is a reasonable match. The biography article mixes Musk's companies and wealth with details about his upbringing, family, and public controversies, so the inferred topics appear consistent with the article contents.

27 of 30
### Visual Description
The page contains a question and a text box providing an answer with a list of top three topics for a specific document, their top 10 words, identified focus, and an assessment of the match with the article description.
---
## Page 47
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

(d) (6 points) Using the inferred $\theta$ for your article, generate a new "document" consisting of 30 words according to the LDA model: for each word, draw a topic $t$ according to $\theta$, and then draw a word according to the multinomial $\beta_t$. Paste the generated document below. Can you identify any topics in the "document"? Do they match the themes of your chosen article?

Generated document:
seat turn advertising neighborhood security action share open rise television project rock establish create activity hang proposal percent competitor create market early limit pursue cost family hard doubt percent add
This sample is noisy given that it is only a 30-word sample. But it still suggests a business / market theme through words such as *share, rise, percent, competitor, and market*, with a smaller personal-life signal from *family*. Accordingly, it matches the article only partially: the corporate and wealth-related side appears more strongly than the specific details about Tesla, SpaceX, or Musk's biography.

(e) (0 points) Further reading: there also exists deep-learning counterpart of LDA called neural topic mod- els, which are essentially VAEs with different priors. If you would like to learn more about this type of models, Srivastava and Sutton (2017), Miao et al. (2017) and Dieng et al. (2020) are some works you can start with; there are also variants using the trending pre-trained LM (Bianchi et al. (2020a), Bianchi et al. (2020b)), or with additional modules to capture the topics varying over time (Dieng et al. (2019)). One can refer to the recent survey paper (Zhao et al. (2021)) for more details.

28 of 30
### Visual Description
The page contains a question, a text box with a generated document and its analysis, and a "Further reading" section with a list of academic references.
---
## Page 48
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

3 Collaboration Policy
After you have completed all other components of this assignment, report your answers to the collaboration policy questions detailed in the Academic Integrity Policies for this course.

1.  Did you receive any help whatsoever from anyone in solving this assignment? If so, include full details including names of people who helped you and the exact nature of help you received.
    I did not receive any assistance.

2.  Did you give any help whatsoever to anyone in solving this assignment? If so, include full details including names of people you helped and the exact nature of help you offered.
    I did not provide assistance to others.

3.  Did you find or come across code that implements any part of this assignment? If so, include full details including the source of the code and how you used it in the assignment.
    I did not use any external code.

29 of 30
### Visual Description
The page contains a section heading "Collaboration Policy", an introductory paragraph, and three numbered questions. Each question is followed by a text box containing a short answer.
---
## Page 49
### Content
Homework 3: Introduction of Graphical Models and Exact Inference
10-708

### References
F. Bianchi, S. Terragni, and D. Hovy. Pre-training is a hot topic: Contextualized document embeddings improve topic coherence. *arXiv preprint arXiv:2004.03974*, 2020a.

F. Bianchi, S. Terragni, D. Hovy, D. Nozza, and E. Fersini. Cross-lingual contextualized topic models with zero-shot learning. *arXiv preprint arXiv:2004.07737*, 2020b.

D. M. Blei, A. Y. Ng, and M. I. Jordan. Latent dirichlet allocation. *the Journal of machine Learning research*, 3:993-1022, 2003.

A. B. Dieng, F. J. Ruiz, and D. M. Blei. The dynamic embedded topic model. *arXiv preprint arXiv:1907.05545*, 2019.

A. B. Dieng, F. J. Ruiz, and D. M. Blei. Topic modeling in embedding spaces. *Transactions of the Association for Computational Linguistics*, 8:439-453, 2020.

Y. Miao, E. Grefenstette, and P. Blunsom. Discovering discrete latent topics with neural variational inference. In *International Conference on Machine Learning*, pages 2410–2419. PMLR, 2017.

A. Srivastava and C. Sutton. Autoencoding variational inference for topic models. *arXiv preprint arXiv:1703.01488*, 2017.

H. Zhao, D. Phung, V. Huynh, Y. Jin, L. Du, and W. Buntine. Topic modelling meets deep neural networks: A survey. *arXiv preprint arXiv:2103.00498*, 2021.

30 of 30
### Visual Description
Text-only slide. The page lists a series of academic references, each starting with author names, followed by the title of the work, publication details, and year. The references are presented as a single column of text.
---
