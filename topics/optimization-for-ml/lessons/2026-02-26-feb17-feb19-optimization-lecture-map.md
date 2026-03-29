# Optimization for ML - February 17 + February 19

## Combined Lecture Map and Study Roadmap

This file links and organizes the full summaries for the two lectures:

- [Feb 17 Full Summary: Optimality Conditions](/Users/saahithjanapati/Desktop/learning/topics/optimization-for-ml/lessons/2026-02-26-feb17-optimality-conditions-full-summary.md)
- [Feb 19 Full Summary: SGD](/Users/saahithjanapati/Desktop/learning/topics/optimization-for-ml/lessons/2026-02-26-feb19-sgd-full-summary.md)

Primary source transcripts:
- `materials/processed/optimization-for-ml/Feb17_Optimiality_Conditions.md`
- `materials/processed/optimization-for-ml/Feb19_stoch_gd.md`

## 1) Concept Bridge (Why These Two Lectures Belong Together)

Feb 17 gives the **target condition** for optimality:

$$
0 \in \partial f(x^*) + N_C(x^*)
$$

(or unconstrained $0\in\partial f(x^*)$).

Feb 19 gives the **stochastic algorithmic path** to approach those optimality conditions in large-scale settings:

$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t), \quad \mathbb{E}[g(x;\xi)] = \nabla f(x).
$$

In short:
- Feb 17 answers "what does optimality look like?"
- Feb 19 answers "how do we get near it with noisy gradients?"

## 2) Side-by-Side Formula Snapshot

### Feb 17 (Optimality)

$$
x^* \text{ optimal unconstrained } \iff 0\in\partial f(x^*)
$$

$$
x^* \text{ optimal constrained convex } \iff 0\in \partial f(x^*)+N_C(x^*)
$$

$$
N_C(x)=\{v:\ v^\top(y-x)\le 0,\ \forall y\in C\}
$$

$$
x^*=S_\lambda(y)\ \text{for}\ \min_x \frac12\|y-x\|^2+\lambda\|x\|_1
$$

### Feb 19 (SGD)

$$
x^{t+1}=x^t-\eta_t g(x^t;\xi_t)
$$

$$
\mathbb{E}[f(\bar x_k)]-f^* \le O(1/\sqrt{k})
\quad\text{(convex nonsmooth)}
$$

$$
\mathbb{E}[f(\bar x_k)]-f^* \le O((\log k)/k)
\quad\text{(strongly convex, }\eta_t=1/(\alpha(t+1))\text{)}
$$

## 3) Recommended Study Sequence (In-Depth)

1. Rebuild optimality from Feb 17:
   - unconstrained subgradient condition;
   - constrained normal-cone condition;
   - projection optimality inequality;
   - LASSO soft-threshold derivation.
2. Move to Feb 19 algorithmic side:
   - unbiased stochastic gradients;
   - warm-up average example;
   - convex nonsmooth theorem;
   - strongly convex theorem and variance floor interpretation.
3. Final integration:
   - identify optimization class from a problem statement;
   - map to corresponding optimality condition and expected rate.

## 4) High-Risk Confusions to Actively Avoid

- Rate confusion:
  - $1/\sqrt{k}$ (convex nonsmooth) vs $(\log k)/k$ (strongly convex averaged SGD).
- Confusing "certificate" with "closed-form solution" in general LASSO.
- Dropping feasibility/normal-cone terms in constrained optimality.
- Forgetting that many SGD bounds are for **averaged iterate** $\bar x_k$.

## 5) Fast Self-Test (5 Prompts)

1. State the optimality condition for convex constrained nonsmooth minimization.
2. Write the soft-thresholding operator and explain when coordinate output is exactly zero.
3. Explain in one line why fixed-step SGD cannot usually converge exactly under persistent variance.
4. State the nonsmooth convex SGD expected rate and required assumptions.
5. For strongly convex SGD, compare fixed-step vs decaying-step behavior.

If you can answer these quickly and correctly, your Feb 17/Feb 19 coverage is strong.
