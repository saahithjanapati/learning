# Session Recap: Quiz 2 Interactive Review 02 (Conditioning + Subgradients)

Date: `2026-02-17` (learner local day)
Topic Path: `topics/optimization-for-ml`
Lesson IDs:
- [topics/optimization-for-ml/live-chats/2026-02-17-live-chat-02-review.md](../live-chats/2026-02-17-live-chat-02-review.md)
- [topics/optimization-for-ml/lessons/2026-02-17-quiz-2-problem-set-01.md](2026-02-17-quiz-2-problem-set-01.md)

## Scope In This Session

- Condition number intuition for GD:
  - $\kappa = L/\mu$
  - why lower $\kappa$ is better
  - how changes in $L$ and $\mu$ affect speed
- Stable GD step-size range for $L$-smooth objectives:
  - $0 < \eta < 2/L$ (with $0 < \eta \le 1/L$ as common conservative choice)
- Subgradient foundations (problem-set Section C):
  - definition inequality
  - $\partial |x|$ at $x=0$
  - valid/invalid candidate subgradients
  - optimality condition $0 \in \partial f(x^*)$
  - max-of-affines active-branch rule at a point

## What Became More Solid

- Correctly linked larger $L$ to both:
  - larger $\kappa$ (worse conditioning), and
  - narrower stable learning-rate interval.
- Correctly used the subgradient inequality sign ($\ge$) and the $|x|$ subdifferential at zero ($[-1,1]$).
- Correctly stated non-smooth convex optimality condition ($0 \in \partial f(x^*)$).

## Mistakes And Corrections

1. Mistake:
- Tag: `concept-gap`
- Where: max-of-affines subgradient check ($f(x)=\max\{x,-x,2x+1\}$ at $x=0$)
- Initial answer: $1$
- Correction: only branch $2x+1$ is active at $x=0$, so the valid subgradient is $2$.
- Takeaway: for `max` forms, use gradients of active branches only.

2. Mistake:
- Tag: `logic-order`
- Where: wording around smoothness/strong-convexity roles
- Correction: $L$ gives an upper curvature bound; $\mu$ gives a lower curvature bound.
- Takeaway: "smaller $L$, larger $\mu$" both improve conditioning.

## Performance Snapshot (This Session)

- Correct: `8`
- Incorrect: `1`
- Estimated accuracy: `0.89`

## What To Cover Next (Immediate)

1. Continue from problem-set Q18:
- write/interpret subgradient method update.

2. Then complete projected subgradient block:
- projection definition and one-step projection computations.

3. Finish with optimality/KKT block:
- fast condition identification + one timed mixed case.
