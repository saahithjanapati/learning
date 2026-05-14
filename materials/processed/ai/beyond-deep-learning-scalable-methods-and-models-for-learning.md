# Beyond Deep Learning: Scalable Methods And Models For Learning

Source: `https://www2.eecs.berkeley.edu/Pubs/TechRpts/2013/Archive/EECS-2013-202.pdf`
Canonical report page: `http://www.eecs.berkeley.edu/Pubs/TechRpts/2013/EECS-2013-202.html`
Author: Oriol Vinyals
Institution: University of California, Berkeley, Electrical Engineering and Computer Sciences
Report: UCB/EECS-2013-202
Source publication: Berkeley EECS technical report, 2013
Ingested: 2026-05-14
Extraction engine: PyMuPDF local PDF extraction
Strategy: Structured thesis ingest with chapter-level summary, research contributions, and learning-oriented synthesis

## Summary

Oriol Vinyals's PhD thesis studies scalable machine learning methods for speech, vision, and deep learning. The thesis was written in 2013, during the period when neural networks were returning to the center of applied machine learning because larger datasets, GPUs, and better optimization made deep architectures practical again.

The thesis is not about one single model. It is a collection of connected research threads around one question:

**How can we train useful, scalable models for high-dimensional signals such as speech and images, and what do depth, size, optimization, and task-specific engineering contribute to that success?**

The thesis covers:

- second-order optimization for difficult neural network objectives;
- recurrent neural networks for acoustic modeling;
- sparse coding and simple convex alternatives to deep neural networks;
- Random Recursive SVMs as a stacked, feed-forward, convexly trained model;
- empirical analysis of why layer size and depth matter;
- keyword spotting systems for both low-resource and high-resource speech settings.

## Chapter-Level Map

### Chapter 1: Introduction And Summary

The thesis frames learning as finding a function from signals to useful outputs: speech to words, images to object labels, and similar mappings. Vinyals emphasizes that deep learning is powerful but not magic. Good results come from the interaction of data, representations, models, optimization, compute, and task-specific details.

The stated contributions are:

- a robust second-order optimization method for large neural models;
- simpler models that preserve some deep-learning representational power while being easier to optimize;
- analysis of why depth and size matter;
- speech-recognition and keyword-detection applications.

### Chapter 2: Current Trends

This chapter introduces the background needed for the thesis: supervised learning, optimization, neural networks, speech recognition, acoustic modeling, keyword detection, and computer vision. It places deep learning inside the larger history of signal processing and pattern recognition rather than treating it as a standalone invention.

The key context is that neural networks had become newly practical because of more data and compute, while classical speech and vision systems still depended heavily on representation choices, pipelines, and evaluation metrics.

### Chapter 3: Optimization Challenges In Learning

This chapter introduces Krylov Subspace Descent, or KSD, a second-order optimization method for large neural networks.

The motivation is that deep networks can be hard to optimize because their objectives are high-dimensional, non-convex, expensive to evaluate, and sometimes ill-conditioned. Standard stochastic gradient descent is simple and scalable, but it can struggle in flat or badly curved regions. Hessian-free methods try to use curvature information without storing the full Hessian matrix.

KSD is close in spirit to Hessian-free optimization. Instead of solving a damped linear system through conjugate gradient and managing several heuristic damping choices, KSD builds a low-dimensional Krylov subspace from the gradient and curvature-vector products. It then optimizes the original objective inside that smaller subspace using BFGS on a data subset.

The chapter reports that KSD converges faster than Hessian-free optimization and often gives lower generalization error on the tested models. It also shows that stronger second-order methods can reduce the need for unsupervised pretraining in some settings.

The chapter then applies this optimization perspective to recurrent neural networks for acoustic modeling. RNNs are natural for speech because speech is sequential, but they were historically difficult to train. Vinyals uses pretraining and second-order optimization to make RNN acoustic features useful inside a Tandem speech-recognition system.

### Chapter 4: Convex Deep Learning

This chapter explores models that try to keep some of the representational benefits of deep architectures while making training easier.

The first part studies sparse representations for acoustic modeling. Sparse coding maps raw features into a larger sparse feature space, then uses a linear classifier. The attraction is that the final classifier is simple, convex, and easier to understand. Vinyals applies a fast approximation to sparse coding on TIMIT phone classification and argues that this can be a simple alternative to deeper systems in some speech settings.

The second part introduces Random Recursive SVM, or R2SVM. This model stacks linear SVMs and random projections to create a nonlinear classifier through a feed-forward layered structure. The goal is to combine:

- the training simplicity of linear SVMs;
- the nonlinear power of deeper representations;
- better scaling than kernel SVMs on large datasets;
- better robustness than some nonlinear methods in low-data, high-dimensional settings.

Experiments include CIFAR-10, Caltech101, MNIST, and TIMIT. The broad conclusion is that R2SVM can improve over linear baselines while remaining relatively simple and scalable.

### Chapter 5: Analysis - Why And How Does Depth Matter?

This chapter studies two related questions: how large should learned representations be, and what does depth actually buy?

For size, the thesis connects sparse coding and dictionary size to Nystrom-style approximation. A large dictionary can improve performance but becomes expensive. Vinyals and collaborators propose Pooling Aware Dictionary Learning, which selects dictionary elements based on pooled feature statistics. The goal is to keep the useful diversity of a large dictionary while using a smaller one.

For depth, the thesis asks a careful version of the "deeper is better" claim. It fixes the parameter budget, varies the number of layers, and studies performance in noisy speech recognition. The result is not simply "more depth always wins." Instead, there can be an optimal depth for a given noise condition and resource budget. Depth can help generalization under mismatch, but it is not a free improvement.

The chapter also studies CNN features for vision and argues that deeper layers capture more semantic information than shallower or classical feature pipelines.

### Chapter 6: Keyword Spotting

This chapter applies the thesis's themes to speech keyword detection.

In limited-resource keyword spotting, such as the IARPA BABEL setting, the system may need to detect keywords in languages with little transcribed data. Vinyals works with speech recognition lattices and directly optimizes task-specific metrics such as ATWV, instead of relying only on generic accuracy or likelihood. This matters because keyword spotting is judged by the tradeoff between misses and false alarms, not just ordinary classification accuracy.

In high-resource hotword detection, the thesis studies a commercial-style setting where there is much more data and compute. The proposed approaches include sparse hotword representations and a deep hotword method that uses representations from large acoustic models without necessarily running a full speech recognizer. This anticipates the practical design constraint of mobile or always-on speech systems: the system must be accurate, fast, and efficient.

### Chapter 7: Conclusions

The conclusion is unusually useful because it is candid. Vinyals argues that machine learning is not a magic formula. Algorithms matter, but so do data, representations, compute, engineering constraints, and problem-specific structure.

The main closing points are:

- KSD is a useful second-order method, but modern SGD-style methods remain very strong defaults.
- Simple, convexly trained models can sometimes capture useful structure without requiring full deep-network training.
- Depth and size matter, but their effects depend on budget, data, noise, and task.
- Real applications often require stepping outside a pure model-centered view and optimizing the actual system objective.

## Main Contributions

1. **Krylov Subspace Descent.** A second-order optimization approach for neural networks that uses curvature information without storing the Hessian.
2. **RNN acoustic modeling.** A demonstration that recurrent networks can be trained and used effectively for speech features when paired with careful optimization.
3. **Fast sparse acoustic modeling.** A sparse-coding-inspired approach for phone classification that is simple, fast at test time, and mostly convex at the classifier stage.
4. **Random Recursive SVM.** A stacked SVM model that creates nonlinear decision boundaries through recursive transformations while keeping each training step simple.
5. **Depth and size analysis.** Empirical studies showing that layer size and depth interact with performance, generalization, and resource constraints.
6. **Keyword spotting systems.** Practical speech applications in both low-resource and high-resource regimes, including direct optimization of keyword-detection metrics.

## Why It Matters

This thesis is useful as a historical bridge between classical signal-processing pipelines and modern deep learning. It shows deep learning becoming dominant, but it also preserves a researcher's skepticism: neural networks are powerful, yet the best system depends on optimization, representations, compute, objectives, and data regime.

For a modern reader, the thesis is especially useful for three reasons:

- it explains why second-order and curvature-aware optimization were attractive before today's large-scale first-order training recipes became standard;
- it connects sparse coding, dictionary learning, and neural network features, which is relevant to modern representation learning and interpretability;
- it shows how applied ML systems often improve when the training objective is aligned with the actual product or benchmark metric.

## Key Terms

- **Acoustic modeling:** Modeling the relationship between speech audio features and linguistic units such as phones or subphones.
- **ATWV:** Actual Term Weighted Value, a keyword-spotting metric that balances hits and false alarms across keywords.
- **Curvature:** Information about how the loss surface bends, often represented by the Hessian or approximations to it.
- **Hessian-free optimization:** A second-order optimization family that uses Hessian-vector products instead of explicitly storing the Hessian.
- **Krylov subspace:** A low-dimensional subspace generated by repeatedly applying a matrix, such as a curvature matrix, to a vector such as the gradient.
- **Sparse coding:** A representation method where an input is encoded using a small number of active elements from a larger dictionary.
- **Tandem speech system:** A speech-recognition setup where neural network outputs are transformed and used as features for a traditional HMM/GMM recognizer.
