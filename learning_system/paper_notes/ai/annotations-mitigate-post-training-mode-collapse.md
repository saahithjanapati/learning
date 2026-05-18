# Annotations Mitigate Post-Training Mode Collapse

Captured: 2026-05-18
Topic: AI / Collection + Scale AI Research Internship Prep
Source: `https://arxiv.org/pdf/2605.09995`
Processed source: [materials/processed/ai/annotations-mitigate-post-training-mode-collapse.md](../../../materials/processed/ai/annotations-mitigate-post-training-mode-collapse.md)
Lesson: [topics/ai/lessons/2026-05-18-annotations-mitigate-post-training-mode-collapse.md](../../../topics/ai/lessons/2026-05-18-annotations-mitigate-post-training-mode-collapse.md)
Tags: post-training, semantic diversity, mode collapse, annotations, pretraining, evaluation

## Normalized Takeaway

Post-training can improve quality while collapsing the semantic range of outputs, and the collapse can worsen with scale. Annotation-anchored training separates the semantic prior from the response conditional: learn a broad annotation distribution during pretraining, protect it with annotation loss masking during post-training, then sample annotations at inference as semantic plans.

## Why It Belongs In The Prep Queue

This is a direct post-training objective-design paper. It connects data distribution, semantic diversity, evaluation, and pretraining-time structure. It is especially useful beside DPO/RLHF, creative-writing diversity, distilled pretraining, and safety pretraining because it asks what post-training should preserve rather than only what it should optimize.

## Questions To Revisit

1. Can an annotation anchor be learned cheaply for an already pretrained model?
2. What annotations would preserve useful diversity for math, coding, tool use, or agent planning?
3. How robust are semantic-entropy metrics if models are optimized for them?
4. Could hidden annotations become a general control layer for product models?
5. How does this compare with preserving diversity through KL, entropy regularization, or preference-data balancing?

