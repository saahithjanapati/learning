# Exam 2 Mock Exam - Exam 1 Calibrated - Answer Key

Use with:

- [[2026-04-19-exam-2-mock-exam-exam1-calibrated-true-false]]
- [[2026-04-19-exam-2-mock-exam-exam1-calibrated-select-all]]
- [[2026-04-19-exam-2-mock-exam-exam1-calibrated-short-answer]]

## Part I: True / False

| Question | Answer |
|---|---|
| 1.1 | False |
| 1.2 | True |
| 1.3 | True |
| 1.4 | False |
| 1.5 | True |
| 1.6 | False |
| 1.7 | True |
| 1.8 | False |
| 1.9 | False |
| 1.10 | False |
| 1.11 | False |
| 1.12 | True |

## Part II: Select All That Apply

| Question | Correct Choices |
|---|---|
| 2.1 | a, b, d |
| 2.2 | a, b, c, e |
| 2.3 | a, c, d |
| 2.4 | a, b, c, d |
| 2.5 | a, b, c, e |
| 2.6 | a, c, d |
| 2.7 | a, c, d |
| 2.8 | a, b, c |
| 2.9 | a, b, c, d |
| 2.10 | a, c |
| 2.11 | a, c, e |

## Part III: Short Answer Sketches

### 3.1

Let

$$
v=x-\eta \nabla g(x).
$$

The assumption

$$
0 \in \nabla g(x)+\partial h(x)
$$

implies

$$
0 \in \frac{1}{\eta}(x-v)+\partial h(x).
$$

By the proximal optimality condition, this is exactly the condition for

$$
x=\operatorname{prox}_{\eta,h}(v)
=
\operatorname{prox}_{\eta,h}(x-\eta \nabla g(x)).
$$

### 3.2

Condition on $x^t$. Then

$$
\mathbb{E}[g_t\mid x^t]\in \partial f(x^t).
$$

Apply the subgradient inequality at $x^t$ with $y=x^*$:

$$
f(x^*) \ge f(x^t)+\mathbb{E}[g_t\mid x^t]^T(x^*-x^t).
$$

Rearranging,

$$
\mathbb{E}[g_t\mid x^t]^T(x^t-x^*) \ge f(x^t)-f(x^*).
$$

Since $x^t-x^*$ is fixed given $x^t$,

$$
\mathbb{E}[g_t^T(x^t-x^*)\mid x^t]
=
\mathbb{E}[g_t\mid x^t]^T(x^t-x^*),
$$

which gives the claim.

### 3.3

For a $2\times 2$ symmetric matrix, PSD is equivalent to nonnegative principal minors:

$$
1 \ge 0,
\qquad
\det X(a)=1-a^2 \ge 0.
$$

Hence

$$
a^2 \le 1
\qquad\Longleftrightarrow\qquad
-1 \le a \le 1.
$$

So $X(a)\succeq 0$ exactly for

$$
a\in[-1,1].
$$

### 3.4

Let

$$
g_1(x,y)=1-x-y,
\qquad
g_2(x,y)=-x.
$$

The Lagrangian is

$$
L(x,y,\lambda_1,\lambda_2)
=
x^2+y^2+\lambda_1(1-x-y)+\lambda_2(-x),
$$

with $\lambda_1,\lambda_2\ge 0$.

Stationarity:

$$
2x-\lambda_1-\lambda_2=0,
\qquad
2y-\lambda_1=0.
$$

So

$$
y=\lambda_1/2,
\qquad
x=(\lambda_1+\lambda_2)/2.
$$

At the optimum the first constraint must be active, since $(0,0)$ is infeasible, so

$$
x+y=1.
$$

If $\lambda_2>0$, then complementary slackness for $g_2$ would force $x=0$, which together with $x+y=1$ gives $y=1$, but then stationarity gives $\lambda_1=2$ and $2x-\lambda_1-\lambda_2=0$ becomes $0-2-\lambda_2=0$, impossible. Hence $\lambda_2=0$.

Then

$$
x=y=\lambda_1/2,
\qquad
x+y=1
\Longrightarrow
\lambda_1=1.
$$

Therefore

$$
x^*=y^*=\frac12,
\qquad
\lambda_1^*=1,
\qquad
\lambda_2^*=0.
$$
