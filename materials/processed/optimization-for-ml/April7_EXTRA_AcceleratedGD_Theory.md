# April7_EXTRA_AcceleratedGD_Theory

Source: `materials/archive/April7_EXTRA_AcceleratedGD_Theory.pdf`
Duplicate equivalents: `April7_EXTRA_AcceleratedGD_Theory.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 27

## Page 1
### Content
Optimization for
Machine Learning

Theory of Nesterov's
Accelerated Gradient Descent
### Visual Description
Title slide with "Optimization for Machine Learning" and "Theory of Nesterov's Accelerated Gradient Descent". Carnegie Mellon University logo at the bottom right.
---

## Page 2
### Content
Problem setting
We consider the unconstrained optimization problem
$$ \min_{\theta \in \mathbb{R}^d} F(\theta), $$
where $F: \mathbb{R}^d \to \mathbb{R}$ is convex and differentiable.

Assume that $F$ is L-smooth, i.e.
$$ \| \nabla F(x) - \nabla F(y) \| \le L \| x - y \| \quad \forall x, y \in \mathbb{R}^d $$
Let $\theta^*$ be a minimizer of $F$, and write
$F^* := F(\theta^*)$
### Visual Description
Text and mathematical equations defining the unconstrained optimization problem, properties of the function F (convex, differentiable, L-smooth), and notation for the minimizer.
---

## Page 3
### Content
Nesterov's Accelerated Gradient
We study the iteration
$$ \theta_{t+1} = \theta_t - \eta \nabla F(\theta_t + \gamma_t(\theta_t - \theta_{t-1})) + \gamma_t(\theta_t - \theta_{t-1}), \quad t \ge 0. $$
Define the lookahead point $y_t := \theta_t + \gamma_t(\theta_t - \theta_{t-1}).$
$$ \Rightarrow \theta_{t+1} = y_t - \eta \nabla F(y_t). $$
We will choose
$$ \tau_0 = 1, \quad \tau_{t+1} = \frac{1 + \sqrt{1+4\tau_t^2}}{2}, $$
and
$$ \gamma_t = \frac{\tau_t - 1}{\tau_{t+1}}, \quad \eta = \frac{1}{L}. $$
We also initialize
$\theta_{-1} = \theta_0.$
### Visual Description
Text and mathematical equations describing the Nesterov's Accelerated Gradient iteration, including the definition of a lookahead point and specific parameter choices for $\tau_0, \tau_{t+1}, \gamma_t, \eta$, and $\theta_{-1}$.
---

## Page 4
### Content
Basic Inequalities
Theorem [Smooth upper bound]
If $F$ is L-smooth, then for all $x, y \in \mathbb{R}^d,$
$$ F(y) \le F(x) + \langle \nabla F(x), y - x \rangle + \frac{L}{2}\|y - x\|^2. $$
Proof: [We have proved this before]
### Visual Description
A theorem statement titled "Smooth upper bound" with its mathematical inequality, followed by a note that the proof was previously covered.
---

## Page 5
### Content
Basic Inequalities
Lemma [Gradient-step inequality]
Let
$$ x^+ = y - \frac{1}{L}\nabla F(y). $$
Then for every $u \in \mathbb{R}^d,$
$$ F(x^+) \le F(u) + L \langle y - x^+, y - u \rangle - \frac{L}{2}\|y - x^+\|^2. $$
Proof: [Next slide]
### Visual Description
A lemma statement titled "Gradient-step inequality" with its mathematical inequality, followed by a note indicating the proof is on the next slide.
---

## Page 6
### Content
Proof:
Proof of Gradient-step inequality
We want to prove: $F(x^+) \le F(u) + L \langle y - x^+, y - u \rangle - \frac{L}{2}\|y - x^+\|^2$ for all $u \in \mathbb{R}^d.$
By L-smoothness,
$$ F(x^+) \le F(y) + \langle \nabla F(y), x^+ - y \rangle + \frac{L}{2}\|x^+ - y\|^2. $$
Since $x^+ = y - \frac{1}{L}\nabla F(y),$ we have
$\nabla F(y) = L(y - x^+).$
Hence
$$ F(x^+) \le F(y) - L\|y - x^+\|^2 + \frac{L}{2}\|y - x^+\|^2 = F(y) - \frac{L}{2}\|y - x^+\|^2. $$
By convexity,
$$ F(y) \le F(u) + \langle \nabla F(y), y - u \rangle = F(u) + L \langle y - x^+, y - u \rangle. $$
$$ \Rightarrow F(x^+) \le F(u) + L \langle y - x^+, y - u \rangle - \frac{L}{2}\|y - x^+\|^2 \quad \forall u \in \mathbb{R}^d. \quad \blacksquare $$
### Visual Description
A detailed mathematical proof of the Gradient-step inequality, using L-smoothness and convexity properties.
---

## Page 7
### Content
Remark
We already know:
$$ \tau_0 = 1, \quad \tau_{t+1} = \frac{1 + \sqrt{1+4\tau_t^2}}{2}, $$
Therefore,
$$ 2\tau_{t+1} - 1 = \sqrt{1 + 4\tau_t^2} $$
Squaring both sides:
$$ (2\tau_{t+1} - 1)^2 = 1 + 4\tau_t^2 $$
$$ 4\tau_{t+1}^2 - 4\tau_{t+1} + 1 = 1 + 4\tau_t^2 $$
$$ 4\tau_{t+1}^2 - 4\tau_{t+1} = 4\tau_t^2 $$
$$ \tau_{t+1}^2 - \tau_{t+1} = \tau_t^2 $$
This will be important in the main proof later.
### Visual Description
A remark slide showing the derivation of the relationship $\tau_{t+1}^2 - \tau_{t+1} = \tau_t^2$ from the definition of $\tau_{t+1}$.
---

## Page 8
### Content
Auxiliary sequence
Definition: $w_t := \tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t, \quad t \ge 0.$

Lemma [Key recursions]
For every $t \ge 0,$
$$ \tau_{t+1}y_t = (\tau_{t+1} - 1)\theta_t + w_t, \quad (*1) $$
$$ w_{t+1} = w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t). \quad (*2) $$
Proof (*1) is immediate from the definition
(*2): Next slide
### Visual Description
A definition of an auxiliary sequence $w_t$ and a lemma presenting two key recursive equations, with a note about their proofs.
---
## Page 9
### Content
Proof
**Reminder:**
$w_t := \tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t$,
$y_t := \theta_t + \gamma_t(\theta_t - \theta_{t-1})$.
$\gamma_t = \frac{\tau_t - 1}{\tau_{t+1}}$

To prove (*2), start from the definition of $w_{t+1}$:
$w_{t+1} = \tau_{t+2}y_{t+1} - (\tau_{t+2} - 1)\theta_{t+1}$.

Using
$y_{t+1} = \theta_{t+1} + \frac{\tau_{t+1} - 1}{\tau_{t+2}}(\theta_{t+1} - \theta_t)$,

we obtain
$w_{t+1} = \tau_{t+2} \left( \theta_{t+1} + \frac{\tau_{t+1} - 1}{\tau_{t+2}}(\theta_{t+1} - \theta_t) \right) - (\tau_{t+2} - 1)\theta_{t+1}$
$= \tau_{t+2}\theta_{t+1} + (\tau_{t+1} - 1)(\theta_{t+1} - \theta_t) - (\tau_{t+2} - 1)\theta_{t+1}$
$= \tau_{t+2}\theta_{t+1} + \tau_{t+1}\theta_{t+1} - \theta_{t+1} - (\tau_{t+1} - 1)\theta_t - \tau_{t+2}\theta_{t+1} - \theta_{t+1}$
$= \tau_{t+1}\theta_{t+1} - (\tau_{t+1} - 1)\theta_t$.
### Visual Description
This slide presents a proof, starting with a "Reminder" section defining $w_t$, $y_t$, and $\gamma_t$. It then states the goal to prove (*2) by starting from the definition of $w_{t+1}$. The main part of the slide shows a series of algebraic steps, substituting expressions for $y_{t+1}$ into the definition of $w_{t+1}$ and simplifying it down to a final expression. The equations are aligned vertically.
---
## Page 10
### Content
Proof
**Reminder:**
$y_t := \theta_t + \gamma_t(\theta_t - \theta_{t-1})$.
$w_t := \tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t$,
$w_{t+1} = \tau_{t+1}\theta_{t+1} - (\tau_{t+1} - 1)\theta_t$.
$\gamma_t = \frac{\tau_t - 1}{\tau_{t+1}}$
$\theta_{t+1} = y_t - \eta\nabla F(y_t)$.

Now use $\theta_{t+1} = y_t - \frac{1}{L}\nabla F(y_t)$:
$w_{t+1} = \tau_{t+1} \left( y_t - \frac{1}{L}\nabla F(y_t) \right) - (\tau_{t+1} - 1)\theta_t$
$= (\tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t) - \frac{\tau_{t+1}}{L}\nabla F(y_t)$
$= w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t)$. [Since $w_t := \tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t$ by definition]

This proves (*2).
### Visual Description
This slide continues the proof from the previous page. It starts with a "Reminder" section listing definitions for $y_t$, $w_t$, $w_{t+1}$, $\gamma_t$, and $\theta_{t+1}$. The core of the slide shows the substitution of the expression for $\theta_{t+1}$ into the equation for $w_{t+1}$, followed by algebraic simplification. The final step identifies the resulting expression as $w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t)$, explicitly stating that this proves (*2).
---
## Page 11
### Content
Main Theorem
### Visual Description
Text-only slide.
---
## Page 12
### Content
Main Theorem
**Theorem[Accelerated $O(1/t^2)$ rate]**
Assume that $F$ is convex and $L$-smooth.

Let $\{\theta_t\}$ be generated by $\theta_{t+1} = \theta_t - \eta\nabla F(\theta_t + \gamma_t(\theta_t - \theta_{t-1})) + \gamma_t(\theta_t - \theta_{t-1})$, $t \ge 0$.

Let $\tau_0 = 1$, $\tau_{t+1} = \frac{1+\sqrt{1+4\tau_t^2}}{2}$, $\gamma_t = \frac{\tau_t - 1}{\tau_{t+1}}$, $\eta = \frac{1}{L}$.

We initialize $\theta_{-1} = \theta_0$.

Then for every $t \ge 0$,
$F(\theta_t) - F^* \le \frac{4L ||\theta_0 - \theta^*||^2}{(t + 2)^2}$

Hence,
$F(\theta_t) - F^* = O\left(\frac{1}{t^2}\right)$
### Visual Description
This slide presents the "Main Theorem" for an Accelerated $O(1/t^2)$ rate. It begins by stating the assumptions that $F$ is convex and $L$-smooth. It then defines how the sequence $\{\theta_t\}$ is generated, including the update rule for $\theta_{t+1}$ and the definitions for $\tau_{t+1}$, $\gamma_t$, and $\eta$. The initialization condition for $\theta_{-1}$ is also provided. Finally, it presents the two main results: an upper bound for $F(\theta_t) - F^*$ and the asymptotic $O(1/t^2)$ rate.
---
## Page 13
### Content
Proof of Main Theorem
### Visual Description
Text-only slide.
---
## Page 14
### Content
Proof of Main Theorem
Define
$A_t := \frac{\tau_t^2}{L}$, $t \ge 0$.

Since
$\tau_{t+1}^2 - \tau_{t+1} = \tau_t^2$,
$\frac{\tau_{t+1}^2}{L} - \frac{\tau_{t+1}}{L} = \frac{\tau_t^2}{L}$.

we have
$A_{t+1} = A_t + \frac{\tau_{t+1}}{L}$.

Fix $t \ge 0$, and define
$\delta_t := y_t - \theta_{t+1}$.

Because $\theta_{t+1} = y_t - \frac{1}{L}\nabla F(y_t)$, we have
$\nabla F(y_t) = L\delta_t$.
### Visual Description
This slide begins the "Proof of Main Theorem". It starts by defining $A_t$ in terms of $\tau_t$ and $L$. It then shows an algebraic identity involving $\tau_{t+1}$ and $\tau_t$, and its scaled version by $L$. This leads to an update rule for $A_{t+1}$. Next, it defines $\delta_t$ and, based on the definition of $\theta_{t+1}$, derives an expression for $\nabla F(y_t)$ in terms of $L$ and $\delta_t$.
---
## Page 15
### Content
Step 1
**Reminder:**
Let $x^+ = y - \frac{1}{L}\nabla F(y)$. Then for every $u \in \mathbb{R}^d$,
$F(x^+) \le F(u) + L \langle y - x^+, y - u \rangle - \frac{L}{2} ||y - x^+||^2$.

$\delta_t := y_t - \theta_{t+1}$.

**Step 1: A one-step upper bound for $F(\theta_{t+1}) - F^*$.**
Apply the Gradient-step inequality Lemma with
$y = y_t$, $x^+ = \theta_{t+1}$, $u = \theta^*$.

Then
$F(\theta_{t+1}) \le F^* + L \langle \delta_t, y_t - \theta^* \rangle - \frac{L}{2} ||\delta_t||^2$.

Multiplying by $\frac{\tau_{t+1}}{L}$ gives
$\frac{\tau_{t+1}}{L}(F(\theta_{t+1}) - F^*) \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2$.
### Visual Description
This slide outlines "Step 1" of the proof. It starts with a "Reminder" section, presenting the Gradient-step inequality Lemma, which provides an upper bound for $F(x^+)$. It also re-states the definition of $\delta_t$. The main part of the slide, titled "Step 1", applies this lemma by specifying the substitutions for $y$, $x^+$, and $u$. This results in an inequality for $F(\theta_{t+1})$. Finally, the entire inequality is multiplied by $\frac{\tau_{t+1}}{L}$.
---
## Page 16
### Content
Step 2
**Reminder:** $F(y) \le F(x) + \langle \nabla F(x), y - x \rangle + \frac{L}{2} ||y - x||^2$.
$\nabla F(y_t) = L\delta_t$.
$\delta_t := y_t - \theta_{t+1}$.

**Step 2: Descent from smoothness.**
Because $F$ is $L$-smooth,
$F(\theta_{t+1}) \le F(y_t) + \langle \nabla F(y_t), \theta_{t+1} - y_t \rangle + \frac{L}{2} ||\theta_{t+1} - y_t||^2$.

Since $\theta_{t+1} - y_t = -\delta_t$ and $\nabla F(y_t) = L\delta_t$,
$F(\theta_{t+1}) \le F(y_t) - L \langle \delta_t, \delta_t \rangle + \frac{L}{2} ||-\delta_t||^2$.
$F(\theta_{t+1}) \le F(y_t) - L||\delta_t||^2 + \frac{L}{2}||\delta_t||^2$.
$F(\theta_{t+1}) \le F(y_t) - \frac{L}{2} ||\delta_t||^2$.

Multiplying by $A_t = \frac{\tau_t^2}{L}$, we obtain
$A_t F(\theta_{t+1}) \le A_t F(y_t) - \frac{\tau_t^2}{2} ||\delta_t||^2$.
### Visual Description
This slide details "Step 2" of the proof, focusing on "Descent from smoothness". It starts with a "Reminder" of the $L$-smoothness inequality and re-states the definitions for $\nabla F(y_t)$ and $\delta_t$. The main section applies the $L$-smoothness property to $F(\theta_{t+1})$, substituting $x=y_t$ and $y=\theta_{t+1}$. It then simplifies the inequality using the definitions of $\delta_t$ and $\nabla F(y_t)$, leading to a simplified upper bound for $F(\theta_{t+1})$. Finally, the entire inequality is multiplied by $A_t = \frac{\tau_t^2}{L}$.
---
## Page 17
### Content
Step 3
Reminder:
$\frac{\tau_{t+1}}{L}(F(\theta_{t+1}) - F^*) \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2$. $A_{t+1} = A_t + \frac{\tau_{t+1}}{L}$.
$\Rightarrow (A_{t+1} - A_t)(F(\theta_{t+1}) - F^*) \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2$.
We also know: $A_tF(\theta_{t+1}) \le A_tF(y_t) - \frac{\tau_t^2}{2} ||\delta_t||^2$.

Step 3: Add the two estimates. Adding the above inequalities, we get
$\Rightarrow (A_{t+1}-A_t)(F(\theta_{t+1})-F^*)+A_tF(\theta_{t+1}) \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2 + A_tF(y_t) - \frac{\tau_t^2}{2} ||\delta_t||^2$.
$A_{t+1}(F(\theta_{t+1})-F^*)-A_t(F(\theta_{t+1})-F^*)+A_tF(\theta_{t+1}) \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2 + A_tF(y_t) - \frac{\tau_t^2}{2} ||\delta_t||^2$.
$A_{t+1}(F(\theta_{t+1}) - F^*) + A_tF^* \le \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}}{2} ||\delta_t||^2 + A_tF(y_t) - \frac{\tau_t^2}{2} ||\delta_t||^2$.
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t (F(y_t) - F^*) + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_t^2 + \tau_{t+1}}{2} ||\delta_t||^2$.
### Visual Description
The slide presents a series of mathematical inequalities, starting with a reminder and then showing the steps of adding two estimates. The equations are stacked vertically, demonstrating the derivation of a final inequality.
---

## Page 18
### Content
Step 3
We already know:
$\tau_{t+1}^2 - \tau_{t+1} = \tau_t^2$.
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(y_t) - F^*) + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_t^2 + \tau_{t+1}}{2} ||\delta_t||^2$.
Since $\tau_t^2 + \tau_{t+1} = \tau_{t+1}^2$, this becomes
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(y_t) - F^*) + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
### Visual Description
The slide shows a mathematical identity for $\tau_t^2$ and then an inequality. It then uses another identity to simplify the inequality, presenting the steps vertically.
---

## Page 19
### Content
Step 4
We already know:
$\nabla F(y_t) = L\delta_t$.
$\delta_t := y_t - \theta_{t+1}$.
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(y_t) - F^*) + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
Step 4: Replace $F(y_t)$ by $F(\theta_t)$.
By convexity,
$F(y_t) - F(\theta_t) \le \langle \nabla F(y_t), y_t - \theta_t \rangle = L \langle \delta_t, y_t - \theta_t \rangle$.
Multiplying by $A_t = \tau_t^2/L$, we get
$A_t(F(y_t) - F^*) \le A_t(F(\theta_t) - F^*) + \tau_t^2 \langle \delta_t, y_t - \theta_t \rangle$.
Using this with the above inequality,
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(\theta_t) - F^*) + \tau_t^2 \langle \delta_t, y_t - \theta_t \rangle + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
### Visual Description
The slide presents definitions for $\nabla F(y_t)$ and $\delta_t$, followed by an inequality. It then shows how to replace $F(y_t)$ using convexity and multiplication by $A_t$, leading to a new combined inequality. The equations are stacked vertically.
---

## Page 20
### Content
Step 5
We already know [Key Recursions]: $\tau_{t+1}y_t = (\tau_{t+1} - 1)\theta_t + w_t$, (*1)
$w_{t+1} = w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t)$. (*2)
Using
$\tau_t^2 = \tau_{t+1}^2 - \tau_{t+1}$,
we have
$\tau_t^2(y_t - \theta_t) + \tau_{t+1}(y_t - \theta^*) = (\tau_{t+1}^2 - \tau_{t+1})(y_t - \theta_t) + \tau_{t+1}(y_t - \theta^*)$
$= \tau_{t+1}((\tau_{t+1} - 1)(y_t - \theta_t) + (y_t - \theta^*))$.
By the Key Recursions Lemma,
$(\tau_{t+1} - 1)(y_t - \theta_t) + (y_t - \theta^*) = (\tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t) - \theta^* = w_t - \theta^*$.
Step 5: Combine the two inner-product terms.
$\tau_t^2 \langle \delta_t, y_t - \theta_t \rangle + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle = \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle$.
[since $\delta_t := y_t - \theta_{t+1}$ and $\tau_t^2 = \tau_{t+1}^2 - \tau_{t+1}$]
### Visual Description
The slide introduces "Key Recursions" with two equations. It then uses an identity for $\tau_t^2$ to expand and simplify a sum of inner product terms. The "Key Recursions Lemma" is applied to further simplify the expression, leading to a final combined inner-product term. Equations are stacked vertically.
---

## Page 21
### Content
Step 5
We already know:
$\tau_t^2 \langle \delta_t, y_t - \theta_t \rangle + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle = \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle$.
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(\theta_t) - F^*) + \tau_t^2 \langle \delta_t, y_t - \theta_t \rangle + \tau_{t+1} \langle \delta_t, y_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
Therefore,
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(\theta_t) - F^*) + \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
### Visual Description
The slide presents an identity for combining inner product terms and an inequality from a previous step. It then substitutes the identity into the inequality to derive a simplified "Therefore" statement. Equations are stacked vertically.
---

## Page 22
### Content
Step 6
We already know [Key Recursions Lemma]: $w_{t+1} = w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t)$.
Step 6: Use the recursion for $w_t$.
From the Key Recursions Lemma:
$w_{t+1} = w_t - \frac{\tau_{t+1}}{L}\nabla F(y_t) = w_t - \tau_{t+1}\delta_t$.
Therefore,
$\frac{1}{2}||w_{t+1} - \theta^*||^2 = \frac{1}{2}||w_t - \theta^* - \tau_{t+1}\delta_t||^2$
$= \frac{1}{2}||w_t - \theta^*||^2 - \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle + \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
### Visual Description
The slide states a key recursion for $w_{t+1}$. It then uses this recursion to derive an expression for $\frac{1}{2}||w_{t+1} - \theta^*||^2$, expanding the squared norm. Equations are stacked vertically.
---

## Page 23
### Content
Step 6
We already know:
$\frac{1}{2}||w_{t+1} - \theta^*||^2 = \frac{1}{2}||w_t - \theta^*||^2 - \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle + \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
$A_{t+1}(F(\theta_{t+1}) - F^*) \le A_t(F(\theta_t) - F^*) + \tau_{t+1} \langle \delta_t, w_t - \theta^* \rangle - \frac{\tau_{t+1}^2}{2} ||\delta_t||^2$.
Adding these two together, the last two terms cancel exactly, yielding
$A_{t+1}(F(\theta_{t+1}) - F^*) + \frac{1}{2}||w_{t+1} - \theta^*||^2 \le A_t(F(\theta_t) - F^*) + \frac{1}{2}||w_t - \theta^*||^2$.
Thus the potential
$\Phi_t := A_t(F(\theta_t) - F^*) + \frac{1}{2}||w_t - \theta^*||^2$, $t \ge 0$,
is nonincreasing:
$\Phi_{t+1} \le \Phi_t$.
Hence
$A_t(F(\theta_t) - F^*) \le \Phi_t \le \Phi_0$.
### Visual Description
The slide presents two inequalities from previous steps. It then shows that adding these two inequalities results in a simplified inequality where terms cancel. This leads to the definition of a potential function $\Phi_t$ and the conclusion that it is nonincreasing, implying a final bound. Equations are stacked vertically.
---

## Page 24
### Content
Step 7
We already know:
$\Phi_t := A_t(F(\theta_t) - F^*) + \frac{1}{2}||w_t - \theta^*||^2$, $t \ge 0$,
$w_t := \tau_{t+1}y_t - (\tau_{t+1} - 1)\theta_t$, $\tau_0 = 1$,
Step 7: Bound the initial potential.
Since $\theta_{-1} = \theta_0$, we have $y_0 = \theta_0$.
Therefore,
$w_0 = \tau_1y_0 - (\tau_1 - 1)\theta_0 = \theta_0$.
So
$\Phi_0 = \frac{\tau_0^2}{L}(F(\theta_0) - F^*) + \frac{1}{2}||w_0 - \theta^*||^2 = \frac{1}{L}(F(\theta_0) - F^*) + \frac{1}{2}||\theta_0 - \theta^*||^2$.
### Visual Description
The slide reiterates the definition of the potential function $\Phi_t$ and $w_t$. It then proceeds to bound the initial potential $\Phi_0$ by setting initial conditions for $\theta$ and $y$, calculating $w_0$, and finally substituting these into the $\Phi_t$ definition to find $\Phi_0$. Equations are stacked vertically.
---
## Page 25
### Content
Step 7
We already know:
$F(y) \le F(x) + \langle \nabla F(x), y - x \rangle + \frac{L}{2}\|y-x\|^2$.
$\Phi_0 = \frac{\tau_0^2}{L}(F(\theta_0) - F^*) + \frac{1}{2}\|\theta_0 - \theta^*\|^2 = \frac{1}{L}(F(\theta_0) - F^*) + \frac{1}{2}\|\theta_0 - \theta^*\|^2$.
$A_t(F(\theta_t) - F^*) \le \Phi_t \le \Phi_0$.

Since $\nabla F(\theta^*) = 0$, smoothness gives
$F(\theta_0) \le F(\theta^*) + \frac{L}{2}\|\theta_0 - \theta^*\|^2$,
$\Rightarrow F(\theta_0) - F^* \le \frac{L}{2}\|\theta_0 - \theta^*\|^2$.
$\frac{1}{L}(F(\theta_0) - F^*) \le \frac{1}{2}\|\theta_0 - \theta^*\|^2$.
$\Phi_0 \le \|\theta_0 - \theta^*\|^2$.
$F(\theta_t) - F^* \le \frac{L}{\tau_t^2}\|\theta_0 - \theta^*\|^2$. [Since $A_t(F(\theta_t) – F^*) \le \Phi_t \le \Phi_0$]
### Visual Description
The slide is titled "Step 7" in large blue font at the top center. The main content consists of mathematical equations and explanatory text, all in white font against a dark blue background. The equations are centered and formatted for readability. The text "We already know:" is at the top left, followed by a series of inequalities and equations. Below this, "Since $\nabla F(\theta^*) = 0$, smoothness gives" introduces another set of inequalities. A final bracketed statement provides a justification for the last inequality.
---
## Page 26
### Content
Step 8
We already know: $F(\theta_t) - F^* \le \frac{L}{\tau_t^2}\|\theta_0 - \theta^*\|^2$.

Step 8: Lower bound $\tau_t$.
We claim that
$\tau_t \ge \frac{t+2}{2} \quad \forall t \ge 0$.
This is true for $t = 0$ since $\tau_0 = 1$.
If it holds for $t$, then
$\tau_{t+1} = \frac{1+\sqrt{1+4\tau_t^2}}{2} \ge \frac{1+2\tau_t}{2} = \tau_t + \frac{1}{2} \ge \frac{t+2}{2} + \frac{1}{2} = \frac{t+3}{2}$.
Thus the bound holds for all $t$.
Consequently,
$F(\theta_t) - F^* \le \frac{L}{\tau_t^2}\|\theta_0 - \theta^*\|^2 \le \frac{4L}{(t+2)^2}\|\theta_0 - \theta^*\|^2$.
This proves the theorem.
### Visual Description
The slide is titled "Step 8" in large blue font at the top center. The content is primarily mathematical derivations and proofs, presented in white text and equations on a dark blue background. It starts with "We already know:" followed by an inequality. Then, "Step 8: Lower bound $\tau_t$." introduces the main topic of the slide. A claim about $\tau_t$ is stated, followed by a proof by induction involving several inequalities. The conclusion "Thus the bound holds for all $t$." is followed by a final inequality and the statement "This proves the theorem." A small black square marks the end of the proof.
---
## Page 27
### Content
Thanks for your Attention 🙂
### Visual Description
The slide has a plain white background. In the center, the text "Thanks for your Attention" is displayed in large blue font, followed by a blue smiley face emoji. The Carnegie Mellon University logo is present at the bottom right corner.
---
