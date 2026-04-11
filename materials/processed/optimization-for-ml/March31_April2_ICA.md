# March31_April2_ICA

Source: `materials/archive/March31_April2_ICA.pdf`
Duplicate equivalents: `March31_April2_ICA.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 47

## Page 1
### Content
Optimization for ML
CMU-10725
Independent Component Analysis

ML
MACHINE LEARNING DEPARTMENT
Carnegie Mellon.
School of Computer Science
### Visual Description
The slide is a title slide. The main title "Optimization for ML CMU-10725" is in large white font on a dark purple background. Below it, "Independent Component Analysis" is in white font on a lighter purple background. At the bottom left, there's a stylized "ML" logo with "MACHINE LEARNING DEPARTMENT" next to it. On the bottom right, the Carnegie Mellon University logo with "School of Computer Science" is present.
---
## Page 2
### Content
Independent Component Analysis
Application for
* Newton Method
* Lagrange multipliers
### Visual Description
The slide has a large red banner at the top with the text "Independent Component Analysis" in white. Below this, the text "Application for" is in black, followed by two bullet points: "Newton Method" and "Lagrange multipliers". The page number '2' is in the bottom right corner.
---
## Page 3
### Content
Independent Component Analysis
Model
$x_1(t) = a_{11}s_1(t) + a_{12}s_2(t)$
$x_2(t) = a_{21}s_1(t) + a_{22}s_2(t)$

original signals

Observations (Mixtures)

ICA estimated signals
### Visual Description
The slide is titled "Independent Component Analysis" in a red banner at the top. The left side of the slide presents a "Model" with two linear equations: $x_1(t)$ and $x_2(t)$ expressed as linear combinations of $s_1(t)$ and $s_2(t)$ with coefficients $a_{ij}$. The rest of the slide is divided into three sections, each containing two time-series plots. The top right section is labeled "original signals", showing two distinct periodic waveforms. The bottom left section is labeled "Observations (Mixtures)", showing two mixed, more complex waveforms. The bottom right section is labeled "ICA estimated signals", showing two waveforms that resemble the original signals but with some phase shifts or amplitude differences. Each plot shows amplitude on the y-axis and time on the x-axis (0 to 200).
---
## Page 4
### Content
Independent Component Analysys
Model
$x_1(t) = a_{11}s_1(t) + a_{12}s_2(t)$
$x_2(t) = a_{21}s_1(t) + a_{22}s_2(t)$

We observe
$\begin{pmatrix} x_1(1) \\ x_2(1) \end{pmatrix}, \begin{pmatrix} x_1(2) \\ x_2(2) \end{pmatrix}, \dots, \begin{pmatrix} x_1(t) \\ x_2(t) \end{pmatrix}$

We want
$\begin{pmatrix} s_1(1) \\ s_2(1) \end{pmatrix}, \begin{pmatrix} s_1(2) \\ s_2(2) \end{pmatrix}, \dots, \begin{pmatrix} s_1(t) \\ s_2(t) \end{pmatrix}$

But we don't know $\{a_{ij}\}$, nor $\{s_i(t)\}$

Goal:
Estimate $\{s_i(t)\}$, (and also $\{a_{ij}\}$)
### Visual Description
The slide is titled "Independent Component Analysys" in a red banner. It reiterates the "Model" equations for $x_1(t)$ and $x_2(t)$. Below this, it states "We observe" and shows a sequence of column vectors representing observed data points $(x_1(t), x_2(t))^T$ at different times $t$. Then, "We want" is stated, followed by a similar sequence of column vectors representing the desired source signals $(s_1(t), s_2(t))^T$. A gray box highlights the challenge: "But we don't know $\{a_{ij}\}$, nor $\{s_i(t)\}$". Finally, the "Goal" is to "Estimate $\{s_i(t)\}$, (and also $\{a_{ij}\}$)".
---
## Page 5
### Content
The Cocktail Party Problem
SOLVING WITH PCA

Sources
Mixing
Observation
PCA Estimation

$A \in \mathbb{R}^{M \times M}$
$s(t)$
$x(t) = As(t)$
$y(t)=Wx(t)$
### Visual Description
The slide is titled "The Cocktail Party Problem" with "SOLVING WITH PCA" below it, both in a red banner. It presents a diagram illustrating the cocktail party problem solved with PCA. On the left, under "Sources", there are four images representing different sound sources (an ambulance, a person speaking into a microphone, a person playing a violin, and a band). These sources are connected by lines (representing "Mixing") to four microphones on the right, under "Observation". This mixing process is mathematically represented as $x(t) = As(t)$, where $s(t)$ are the sources and $A \in \mathbb{R}^{M \times M}$ is the mixing matrix. The microphones are then connected by a thick black arrow to four loudspeakers on the far right, under "PCA Estimation". This estimation is represented as $y(t)=Wx(t)$.
---
## Page 6
### Content
The Cocktail Party Problem
SOLVING WITH ICA

Sources
Mixing
Observation
ICA Estimation

$A \in \mathbb{R}^{M \times M}$
$s(t)$
$x(t) = As(t)$
$y(t)=Wx(t)$
### Visual Description
The slide is titled "The Cocktail Party Problem" with "SOLVING WITH ICA" below it, both in a red banner. It presents a diagram illustrating the cocktail party problem solved with ICA. On the left, under "Sources", there are four images representing different sound sources (an ambulance, a person speaking into a microphone, a person playing a violin, and a band). These sources are connected by lines (representing "Mixing") to four microphones on the right, under "Observation". This mixing process is mathematically represented as $x(t) = As(t)$, where $s(t)$ are the sources and $A \in \mathbb{R}^{M \times M}$ is the mixing matrix. The microphones are then connected by a thick black arrow to four loudspeakers on the far right, under "ICA Estimation". This estimation is represented as $y(t)=Wx(t)$. The diagram is identical to the one on page 5, with only the "SOLVING WITH PCA" changed to "SOLVING WITH ICA" and "PCA Estimation" changed to "ICA Estimation".
---
## Page 7
### Content
ICA vs PCA, Similarities

* Perform linear transformations
* Matrix factorization

PCA: low rank matrix factorization for compression
$$
\underset{N \times M}{X} = \underset{N \times M}{U} \underset{M \times M}{S} \quad M < N
$$
Columns of U = PCA vectors

ICA: full rank matrix factorization to remove dependency among the rows
$$
\underset{N \times N}{X} = \underset{N \times N}{A} \underset{N \times N}{S}
$$
Columns of A = ICA vectors
### Visual Description
The slide is titled "ICA vs PCA, Similarities" in a green banner. It lists two bullet points: "Perform linear transformations" and "Matrix factorization". Below this, it differentiates PCA and ICA in terms of matrix factorization. For PCA, it states "low rank matrix factorization for compression" and shows the equation $X = US$ with matrix dimensions $N \times M$, $N \times M$, and $M \times M$ respectively, and the condition $M < N$. It also notes "Columns of U = PCA vectors". For ICA, it states "full rank matrix factorization to remove dependency among the rows" and shows the equation $X = AS$ with matrix dimensions $N \times N$, $N \times N$, and $N \times N$. It notes "Columns of A = ICA vectors".
---
## Page 8
### Content
PCA basis vectors extracted from
natural images
### Visual Description
The slide is titled "PCA basis vectors extracted from natural images" in a green banner. The main content of the slide is a large grid of small, square grayscale images. Each small image appears to be a visual representation of a basis vector, showing different patterns like stripes, edges, and checkerboard-like textures. There are 8 rows and 8 columns of these small images, totaling 64 distinct patterns.
---
## Page 9
### Content
ICA basis vectors extracted from natural images

Gabor wavelets,
edge detection,
receptive fields of V1 cells..., deep neural networks
### Visual Description
The page displays a title "ICA basis vectors extracted from natural images". Below the title, on the left, there is a grayscale photograph of a grassy hillside with trees. Below the photograph, there is a 3D plot of a Gabor wavelet, which looks like a central peak surrounded by concentric ripples. To the right of these images, there is a large grid of 8x8 (64) small grayscale images, each depicting a different Gabor-like filter or basis vector, characterized by oriented edges or bars. At the bottom left, there is text describing the applications of these concepts.

---
## Page 10
### Content
Some ICA Applications

**STATIC**
* Image denoising
* Microarray data processing
* Decomposing the spectra of galaxies
* Face recognition
* Facial expression recognition

**TEMPORAL**
* Medical signal processing – fMRI, ECG, EEG
* Brain Computer Interfaces
* Modeling of the hippocampus, place cells
* Modeling of the visual cortex
* Time series analysis
* Financial applications
* Blind deconvolution
### Visual Description
Text-only slide.

---
## Page 11
### Content
ICA Application,
Removing Artifacts from EEG

* EEG ~ Neural cocktail party
* Severe contamination of EEG activity by
    * eye movements
    * blinks
    * muscle
    * heart, ECG artifact
    * vessel pulse
    * electrode noise
    * line noise, alternating current (60 Hz)
* ICA can improve signal
    * effectively detect, separate and remove activity in EEG records from a wide variety of artifactual sources.
    (Jung, Makeig, Bell, and Sejnowski)
* ICA weights (mixing matrix) help find location of sources
### Visual Description
The slide has a title "ICA Application, Removing Artifacts from EEG". On the right side of the slide, there is a translucent blue illustration of a human head, showing the brain inside. Several yellow electrodes are placed on the scalp, and some of these electrodes have small square images embedded within them, depicting what appear to be brain activity patterns or artifacts. The left side of the slide contains bulleted text explaining EEG contamination and how ICA is used to remove artifacts.

---
## Page 12
### Content
ICA Application,
Removing Artifacts from EEG

**EEG Scalp Channels**
vEOG
F3
FC5
Cz
Pz
...
$\mu V$

**unmixing (W)**

**Independent Components**
IC1
IC2
IC3
IC4
...
1 sec
**activations (u=WX)**

**scalp maps (W$^{-1}$)**

Fig from Jung
### Visual Description
The slide illustrates the process of unmixing EEG signals using ICA. On the top left, there's a photograph of a person wearing an EEG cap with numerous wires. Below this, on the left side of the main diagram, are several time-series plots labeled "EEG Scalp Channels" (vEOG, F3, FC5, Cz, Pz), showing raw EEG signals. A scalp map with color-coded voltage distribution is shown below these signals. An arrow labeled "unmixing (W)" points from these raw signals to the right. On the right side, there are four rows of plots, each representing an "Independent Component" (IC1, IC2, IC3, IC4). Each row contains a time-series plot of the component's activation and a corresponding scalp map showing its spatial distribution. The time-series plots are labeled "activations (u=WX)" and the scalp maps are labeled "scalp maps (W$^{-1}$)".

---
## Page 13
### Content
Removing Artifacts from EEG

Summed Projection of Selected Components

C1
C2
C3
C4

**mixing W$^{-1}$**

**Artifact-corrected EEG**
VEOG
F3
Cz
Pz
...
$x_0=W^{-1}u_0$

Fig from Jung
### Visual Description
The slide demonstrates the process of correcting EEG artifacts. On the left, there are four time-series plots labeled C1, C2, C3, and C4, representing independent components. Components C1 and C4 are marked with large red 'X's, indicating they are selected for removal (or not included in the reconstruction). An arrow labeled "mixing W$^{-1}$" points from these components to the right. On the right side, there are several time-series plots labeled "Artifact-corrected EEG" (VEOG, F3, Cz, Pz), showing the cleaned EEG signals. Below these signals, there is a scalp map with color-coded voltage distribution, representing the artifact-corrected EEG. The equation $x_0=W^{-1}u_0$ is displayed below the scalp map.

---
## Page 14
### Content
ICA for Image Denoising

original
noisy
Wiener filtered
ICA denoised
(Hoyer, Hyvarinen)
median filtered
### Visual Description
The slide presents five grayscale images of a lighthouse, demonstrating different image denoising techniques.
- Top left: "original" image, a clear picture of a lighthouse.
- Top middle: "noisy" image, the original image corrupted with significant noise.
- Top right: "Wiener filtered" image, showing a denoised version with some blurring.
- Bottom middle (implied position): "ICA denoised" image, a cleaner version of the noisy image, attributed to Hoyer and Hyvarinen.
- Bottom left: "median filtered" image, another denoised version, showing characteristic median filter effects.
- Bottom right: The ICA denoised image is actually placed here, showing a significantly clearer image than the noisy or Wiener filtered versions.

---
## Page 15
### Content
ICA for Motion Style Components

* Method for analysis and synthesis of human motion from motion captured data
* Provides perceptually meaningful "style" components
* 109 markers, (327dim data)
* Motion capture => data matrix

**Goal:** Find motion style components.

ICA => 6 independent components (emotion, content,...)

(Mori & Hoshino 2002, Shapiro et al
2006, Cao et al 2003)
### Visual Description
Text-only slide.

---
## Page 16
### Content
walk
sneaky
walk with sneaky
sneaky with walk
### Visual Description
The slide displays four panels, each showing a red stick figure performing a different motion against a dark background with a brown grid floor.
- Top left: A stick figure in a walking pose, labeled "walk".
- Top right: A stick figure in a crouched, cautious pose, labeled "sneaky".
- Bottom left: A stick figure in a walking pose that also conveys a sneaky quality, labeled "walk with sneaky".
- Bottom right: A stick figure in a sneaky pose that also conveys a walking motion, labeled "sneaky with walk".
Each panel also has a small watermark "Kate's Video Converter (Free)".

---
## Page 17
### Content
ICA Theory
### Visual Description
A red banner spans the width of the slide in the middle, containing the white text "ICA Theory". The page number "17" is in the bottom right corner.
---
## Page 18
### Content
Statistical (in)dependence

**Definition** (Independence)
$Y_1, Y_2$ are independent $\Leftrightarrow p(y_1,y_2) = p(Y_1)p(Y_2)$

**Definition** (Shannon entropy)
$H(Y) \doteq H(Y_1,..., Y_m) \doteq - \int p(y_1,..., y_m) \log p(y_1,..., y_m)dy.$

**Definition** (KL divergence)
$$0 \leq KL(f||g) = \int f(x) \log \frac{f(x)}{g(x)} dx$$

**Definition** (Mutual Information)
$$0 \leq I(Y_1, ..., Y_M) \doteq \int p(y_1,..., Y_M) \log \frac{p(y_1,...,Y_M)}{p(y_1)...p(Y_M)} dy$$
### Visual Description
The top of the slide has a red banner with the title "Statistical (in)dependence" in white text. Below this, there are four definitions: Independence, Shannon entropy, KL divergence, and Mutual Information, each followed by its mathematical formula. The page number "18" is in the bottom right corner.
---
## Page 19
### Content
Solving the ICA problem with i.i.d. sources

**ICA problem:** $x = As, s = [s_1;...;s_M]$ are jointly independent.

**Ambiguity:**
$s = [s_1;...;s_M]$ sources can be recovered only up to
sign, scale and permutation.

**Proof:**
* P = arbitrary permutation matrix,
* $\Lambda$ = arbitrary diagonal scaling matrix.

$\Rightarrow x = [AP^{-1}\Lambda^{-1}][\Lambda Ps]$
### Visual Description
The top of the slide has a red banner with the title "Solving the ICA problem with i.i.d. sources" in white text. Below this, the ICA problem is defined. A green scroll-like box contains the "Ambiguity" statement. The "Proof" section follows with two bullet points defining P and $\Lambda$, and a final mathematical expression. The page number "19" is in the bottom right corner.
---
## Page 20
### Content
Solving the ICA problem

**Lemma:**
We can assume that $E[s] = 0$.

**Proof:**
Removing the mean does not change the mixing matrix.
$x - E[x] = A(s - E[s])$.

In what follows we assume that $E[ss^T] = I_M, E[s] = 0$.
### Visual Description
The top of the slide has a red banner with the title "Solving the ICA problem" in white text. Below this, a Lemma is stated, followed by its Proof. At the bottom of the slide, there is a grey rectangular box containing an assumption. The page number "20" is in the bottom right corner.
---
## Page 21
### Content
Whitening

* Let $\Sigma \doteq cov(x) = E[xx^T] = AE[ss^T]A^T = AA^T$.
(We assumed centered data)
* Do SVD: $\Sigma \in \mathbb{R}^{N \times N}, rank(\Sigma) = M,$
$\Rightarrow \Sigma = UDU^T,$
where $U \in \mathbb{R}^{N \times M}, U^TU = I_M,$ Signular vectors
$D \in \mathbb{R}^{M \times M},$ diagonal with rank M. Singular values
### Visual Description
The top of the slide has a red banner with the title "Whitening" in white text. Below this, there are two bullet points explaining the concept of whitening, including mathematical definitions for covariance and Singular Value Decomposition (SVD), and terms like "Singular vectors" and "Singular values". The page number "21" is in the bottom right corner.
---
## Page 22
### Content
Whitening (continued)

* Let $Q \doteq D^{-1/2}U^T \in \mathbb{R}^{M \times N}$ whitening matrix
* Let $A^* \doteq QA$
* $x^* \doteq Qx = QAs = A^*s$ is our new (whitened) ICA task.

We have,
$E[x^*x^{*T}] = E[Qxx^TQ^T] = Q\Sigma Q^T$
$= (D^{-1/2}U^T)UDU^T (UD^{-1/2}) = I_M$

$E[x^*x^{*T}] = E[A^*ss^TA^{*T}] = A^*E[ss^T]A^{*T} = A^*A^{*T}$

$\Rightarrow E[x^*x^{*T}] = I_M,$ and $A^*A^{*T} = I_M.$
### Visual Description
The top of the slide has a red banner with the title "Whitening (continued)" in white text. Below this, there are three bullet points defining the whitening matrix Q, A*, and x*. Following these definitions, there are mathematical derivations for $E[x^*x^{*T}]$, concluding with a final result enclosed in a red rectangular box. The page number "22" is in the bottom right corner.
---
## Page 23
### Content
Whitening solves half of the ICA problem

**Note:**
The number of free parameters of an N by N orthogonal matrix is (N-1)(N-2)/2.

$\Rightarrow$ whitening solves half of the ICA problem

After whitening it is enough to consider
orthogonal matrices for separation.
### Visual Description
The top of the slide has a red banner with the title "Whitening solves half of the ICA problem" in white text. Below this, there's a "Note" explaining the number of free parameters for an orthogonal matrix, and a statement that whitening solves half of the ICA problem. Three scatter plots are displayed horizontally: "original" (random points in a square), "mixed" (points forming a parallelogram), and "whitened" (points forming a rotated square). A red rectangular box at the bottom contains the concluding statement. The page number "23" is in the bottom right corner.
---
## Page 24
### Content
Solving ICA

**ICA task:** Given $x$,
* find $y$ (the estimation of $s$),
* find $W$ (the estimation of $A^{-1}$)

**ICA solution:** $y=Wx$
* Remove mean, $E[x]=0$
* Whitening, $E[xx^T]=I$
* Find an orthogonal $W$ optimizing an objective function
    * Sequence of 2-d Jacobi (Givens) rotations
### Visual Description
The top of the slide has a red banner with the title "Solving ICA" in white text. Below this, the "ICA task" is outlined with two bullet points. The "ICA solution" is then presented as $y=Wx$, followed by three bullet points detailing the steps, with the last point having a sub-bullet. Four scatter plots are arranged horizontally at the bottom: "original", "mixed", "whitened", and "rotated (demixed)". The page number is not visible in the provided image.
---
## Page 25
### Content
Optimization Using Jacobi Rotation Matrices

$G(p,q, \theta) \doteq \begin{pmatrix}
1 & \dots & 0 & \dots & 0 & \dots & 0 \\
\vdots & \ddots & \vdots & & \vdots & & \vdots \\
0 & \dots & \cos(\theta) & \dots & -\sin(\theta) & \dots & 0 \\
\vdots & & \vdots & \ddots & \vdots & & \vdots \\
0 & \dots & \sin(\theta) & \dots & \cos(\theta) & \dots & 0 \\
\vdots & & \vdots & & \vdots & \ddots & \vdots \\
0 & \dots & 0 & \dots & 0 & \dots & 1
\end{pmatrix} \leftarrow p$
$\in \mathbf{R}^{M \times M}$
$\leftarrow q$
$\uparrow$
$p$
$\uparrow$
$q$

Observation : $x = As$
Estimation : $y = Wx$

$W = \arg \min_{\tilde{W} \in \mathcal{W}} J(\tilde{W}x),$

where $W = \{W|W = \prod_i G(p_i, q_i, \theta_i)\}$
### Visual Description
The slide features the title "Optimization Using Jacobi Rotation Matrices" at the top. Below the title, a large matrix $G(p,q,\theta)$ is displayed, with arrows pointing to rows $p$ and $q$ and columns $p$ and $q$, indicating the positions of $\cos(\theta)$ and $\sin(\theta)$ terms. Below the matrix, there are definitions for "Observation", "Estimation", and an optimization problem for $W$, followed by the definition of the set $\mathcal{W}$.
---
## Page 26
### Content
ICA Cost Functions

Let $y \doteq Wx$, $y = [y_1; \dots; y_M]$, and let us measure the dependence using Shannon's mututal information:

$J_{ICA_1}(W) \doteq I(y_1, \dots, y_M) \doteq \int p(y_1, \dots, y_M) \log \frac{p(y_1, \dots, y_M)}{p(y_1) \dots p(y_M)} dy,$

Let $H(y) \doteq H(y_1, \dots, y_M) \doteq - \int p(y_1, \dots, y_M) \log p(y_1, \dots, y_M) dy.$

Lemma
$H(Wx) = H(x) + \log | \det W|$
Proof: Homework

Therefore,
$I(y_1, \dots, y_M)$
$= \int p(y_1, \dots, y_M) \log \frac{p(y_1, \dots, y_M)}{p(y_1) \dots p(y_M)} dy$
$= -H(y_1, \dots, y_M) + H(y_1) + \dots + H(y_M)$
$= -H(x_1, \dots, x_M) - \log | \det W| + H(y_1) + \dots + H(y_M).$
### Visual Description
The slide is titled "ICA Cost Functions". It defines $y$ and introduces Shannon's mutual information. A key formula for $J_{ICA_1}(W)$ is presented within a grey box with a decorative scroll-like border. Following this, the definition of entropy $H(y)$ is given. A "Lemma" states the relationship between $H(Wx)$ and $H(x)$, with "Proof: Homework". The slide concludes with a detailed derivation of $I(y_1, \dots, y_M)$.
---
## Page 27
### Content
ICA Cost Functions

$I(y_1, \dots, y_M)$
$= \int p(y_1, \dots, y_M) \log \frac{p(y_1, \dots, y_M)}{p(y_1) \dots p(y_M)}$
$= -H(y_1, \dots, y_M) + H(y_1) + \dots + H(y_M)$
$= -H(x_1, \dots, x_M) - \log | \det W| + H(y_1) + \dots + H(y_M).$

$H(x_1, \dots, x_M)$ is constant, $\log | \det W| = 0$.

Therefore,

$J_{ICA_2}(W) \doteq H(y_1) + \dots + H(y_M)$

The covariance is fixed: $I$. Which distribution has the largest entropy?
$\Rightarrow$ go away from normal distribution
### Visual Description
The slide continues the "ICA Cost Functions" topic. It shows the final steps of the derivation for $I(y_1, \dots, y_M)$ from the previous slide. It then states that $H(x_1, \dots, x_M)$ is constant and $\log | \det W| = 0$. A formula for $J_{ICA_2}(W)$ is presented within a grey box with a decorative scroll-like border. The slide ends with a question about which distribution has the largest entropy given fixed covariance, with the answer "go away from normal distribution" highlighted in red.
---
## Page 28
### Content
Central Limit Theorem

The sum of independent variables converges to the normal distribution
$\Rightarrow$ For separation go far away from the normal distribution
$\Rightarrow$ Negentropy, $| \text{kurtozis} |$ maximization
### Visual Description
The slide is titled "Central Limit Theorem". It explains the theorem and its implications for ICA, specifically suggesting to "go far away from the normal distribution" and to maximize "Negentropy, |kurtozis|". Below the text, there are six plots arranged in two rows and three columns. Each plot shows a probability density function (histogram). The top row shows distributions for 's', 'a', and 'b', which progressively become more bell-shaped. The bottom row shows more peaked distributions. The caption "Figs from Ata Kaban" is at the bottom right.
---
## Page 29
### Content
ICA algorithm based on Kurtosis maximization

Kurtosis = 4th order cumulant

Measures
* the distance from normality
* the degree of peakedness

* $\kappa_4(y) = E \{y^4\} - 3 (E \{y^2\})^2$
$= 3$ if $E \{y\} = 0$ and whitened
### Visual Description
The slide is titled "ICA algorithm based on Kurtosis maximization". A red box highlights "Kurtosis = 4th order cumulant". A blue box contains bullet points describing what Kurtosis "Measures": "the distance from normality" and "the degree of peakedness". Below this, the mathematical formula for $\kappa_4(y)$ is given, along with a condition for when it equals 3. The bottom part of the slide displays three plots, each showing a probability density function (histogram) for different values of $\kappa_4(y)$: $\kappa_4(y) = -\frac{2}{15}$, $\kappa_4(y) = 0$, and $\kappa_4(y) = 12$. These plots illustrate varying degrees of peakedness.
---
## Page 30
### Content
The Fast ICA algorithm (Hyvarinen)

* Given whitened data $z$
* Estimate the $1^{st}$ ICA component:

Probably the most famous
ICA algorithm

* $y = w^Tz, ||w|| = 1,$
$\Leftrightarrow w = 1^{st}$ row of $W$

* maximize kurtosis $f(w) \doteq \kappa_4(y) \doteq E[y^4]-3$
with constraint $h(w) = ||w||^2 - 1 = 0$

* At optimum $f'(w) + \lambda h'(w) = 0^T$
$\Rightarrow 4E[(w^Tz)^3z] + 2\lambda w = 0$
(Lagrange multiplier)

Solve this equation by Newton-Raphson's method.
### Visual Description
The slide is titled "The Fast ICA algorithm (Hyvarinen)". It outlines the steps for estimating the first ICA component. A yellow box highlights "Probably the most famous ICA algorithm". The slide lists bullet points: "Given whitened data z" and "Estimate the 1st ICA component". It then presents the relationship $y = w^Tz$ with the constraint $||w||=1$, and states that $w$ is the first row of $W$. A grey box highlights the objective: "maximize kurtosis $f(w) \doteq \kappa_4(y) \doteq E[y^4]-3$" with the constraint $h(w) = ||w||^2 - 1 = 0$. Finally, it shows the condition at optimum using a Lagrange multiplier and the resulting equation $4E[(w^Tz)^3z] + 2\lambda w = 0$, followed by the instruction to solve it using Newton-Raphson's method.
---
## Page 31
### Content
The Fast ICA algorithm (Hyvarinen)

Solve: $F(w) = 4E[(w^Tz)^3z] + 2\lambda w = 0$

Note:
$y = w^Tz, ||w|| = 1, z \text{ white} \Rightarrow E[(w^Tz)^2] = 1$

The derivative of $F$:
$F'(w) = 12E[(w^Tz)^2zz^T] + 2\lambda I$
$\sim 12E[(w^Tz)^2]E[zz^T] + 2\lambda I$
$= 12E[(w^Tz)^2]I + 2\lambda I$
$= 12I + 2\lambda I$
### Visual Description
The slide is titled "The Fast ICA algorithm (Hyvarinen)". It presents the equation $F(w) = 4E[(w^Tz)^3z] + 2\lambda w = 0$ to be solved. A "Note" section explains that for whitened data $z$ and $||w||=1$, $E[(w^Tz)^2] = 1$. The main content is the detailed derivation of the derivative of $F$, denoted as $F'(w)$, simplifying it to $12I + 2\lambda I$.
---
## Page 32
### Content
The Fast ICA algorithm (Hyvarinen)

The Jacobian matrix becomes diagonal, and can easily be inverted.
$w(k + 1) = w(k) - [F'(w(k))]^{-1}F(w(k))$
$w(k + 1) = w(k) - \frac{4E[(w(k)^Tz)^3z]+2\lambda w(k)}{12+2\lambda}$
$(12+2\lambda)w(k + 1) = (12 + 2\lambda)w(k) - 4E[(w(k)^Tz)^3z] - 2\lambda w(k)$
$\frac{12+2\lambda}{4}w(k + 1) = -3w(k) + E[(w(k)^Tz)^3z]$

Therefore,

Let $w_1$ be the fix pont of:
$\tilde{w}(k + 1) = E[(w(k)^Tz)^3z] - 3w(k)$
$w(k + 1) = \frac{\tilde{w}(k+1)}{||\tilde{w}(k+1)||}$

* Estimate the $2^{nd}$ ICA component similarly
using the $w \perp w_1$ additional constraint... and so on ...
### Visual Description
The slide is titled "The Fast ICA algorithm (Hyvarinen)". It states that the Jacobian matrix becomes diagonal and easily invertible. It then presents the Newton-Raphson update rule for $w(k+1)$ and shows the derivation steps, simplifying the expression. A grey box highlights the definition of $w_1$ as a fixed point, providing two equations for its iterative calculation: $\tilde{w}(k+1)$ and the normalized $w(k+1)$. The slide concludes with a bullet point about estimating the second ICA component using an additional orthogonality constraint.
---
## Page 33
### Content
Independent Subspace Analysis
### Visual Description
A white slide with a red horizontal band across the middle. Inside the red band, the text "Independent Subspace Analysis" is written in white. The page number "33" is in the bottom right corner.
---
## Page 34
### Content
Independent Subspace Analysis

$S^1 \in R^2$
$S^2 \in R^2$
$S^3 \in R^2$

A B C
### Visual Description
The top of the slide has a red band with the title "Independent Subspace Analysis" in white text. Below the title, there are three identical square plots arranged horizontally. Each plot shows a 2D coordinate system with axes ranging from -2 to 2. A single blue dot is visible near the center (0,0) in each plot. Below these plots, the mathematical expressions "$S^1 \in R^2$", "$S^2 \in R^2$", and "$S^3 \in R^2$" are written, corresponding to the plots above them. Below these expressions, large black letters "A", "B", "C" are displayed. The page number "34" is in the bottom right corner.
---
## Page 35
### Content
Independent Subspace Analysis

A B C

Hidden, independent sources (subspaces)
$S^1 \in R^2$
$S^2 \in R^2$
$S^3 \in R^2$
$$S = \begin{pmatrix} S^1 \\ S^2 \\ S^3 \end{pmatrix} \in R^6$$

Observation
$X^1 \in R^2$ $X^2 \in R^2$ $X^3 \in R^2$
$X^i = A_{i1}S^1 + A_{i2}S^2 + A_{i3}S^3, A_{ij} \in R^{2 \times 2}$
$A \in R^{6 \times 6}$ unknown mixing matrix
$$X = \begin{pmatrix} X^1 \\ X^2 \\ X^3 \end{pmatrix} = AS \in R^6$$

Goal:
Estimate A and S observing samples from X=AS only
### Visual Description
The top of the slide has a red band with the title "Independent Subspace Analysis" in white text. Below the title, large black letters "A", "B", "C" are displayed horizontally. Below these letters, there are three identical square scatter plots, each showing a dense cluster of blue points, representing distributions. To the right of the letters and plots, mathematical definitions for "Hidden, independent sources (subspaces)" and "Observation" are provided, including matrix representations for $S$ and $X$. At the bottom of the slide, there is a green horizontal band with the "Goal" stated in white text. The page number "35" is in the bottom right corner.
---
## Page 36
### Content
Independent Subspace Analysis

Hidden sources
$$S = \begin{pmatrix} S^1 \\ S^2 \\ S^3 \end{pmatrix} \in R^6$$

Observation
$$X = \begin{pmatrix} X^1 \\ X^2 \\ X^3 \end{pmatrix} = AS \in R^6$$

Estimation
$\hat{S} = WX = WAS \in R^6$
$W \in R^{6 \times 6}$

In case of perfect separation,
WA is a block permutation matrix.

Objective: $\min_{W \in R^{6 \times 6}} I(\hat{S}^1, \hat{S}^2, \hat{S}^3)$
### Visual Description
The top of the slide has a red band with the title "Independent Subspace Analysis" in white text. On the left side, there are sections for "Hidden sources", "Observation", and "Estimation" with corresponding mathematical equations. On the right side, there are four square scatter plots, each showing a dense cluster of blue points. Below these plots, there is a 6x6 grid of squares, with each square filled with a different shade of gray, resembling a grayscale image of a matrix. This grid is labeled with numbers 1-6 on the y-axis and 2, 4, 6 on the x-axis. An "Objective" function is stated above the plots. The page number "36" is in the bottom right corner.
---
## Page 37
### Content
Code

Independent Component Analysis
* https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.FastICA.html
### Visual Description
Text-only slide.
---
## Page 38
### Content
Appendix
### Visual Description
A white slide with the word "Appendix" in large, bold, black text centered horizontally and vertically. The page number "38" is in the bottom right corner.
---
## Page 39
### Content
ICA vs PCA, Similarities

* PCA: $X=US, U^TU=I$
* ICA: $X=AS, A$ is invertible
* PCA does compression
    * M<N
* ICA does not do compression
    * same # of features (M=N)
* PCA just removes correlations, **not** higher order dependence
* ICA removes correlations, **and** higher order dependence
* PCA: some components are **more important** than others (based on eigenvalues)
* ICA: components are **equally important**
### Visual Description
Text-only slide. The top of the slide has a green horizontal band with the title "ICA vs PCA, Similarities" in white text. Below the title, several bullet points compare PCA and ICA.
---
## Page 40
### Content
ICA vs PCA

Note
* PCA vectors are orthogonal
* ICA vectors are not orthogonal
### Visual Description
The top of the slide has a green horizontal band with the title "ICA vs PCA" in white text. Below the title, there is a 2D scatter plot. A dense cloud of blue points forms a parallelogram shape. From the origin (0,0), two red lines (labeled "PCA") extend outwards, appearing orthogonal to each other. Also from the origin, two green lines (labeled "ICA") extend outwards, appearing non-orthogonal. The x-axis ranges from -2 to 1, and the y-axis ranges from -1.5 to 1. Below the plot, there is a "Note" section with two bullet points.
## Page 41
### Content
ICA vs PCA

### Visual Description
The slide shows two scatter plots of data points. The left plot is labeled "PCA" and shows two red arrows representing the principal components, which appear to align with the directions of greatest variance in the data. The right plot is labeled "ICA" and shows two blue arrows representing independent components, which appear to be oriented differently, possibly towards directions of statistical independence rather than just variance. The data points in both plots show a similar elliptical distribution.
---
## Page 42
### Content
RÉNYI DIVERGENCE ESTIMATION
without density estimation

Using $X_{1:n} = \{X_1,..., X_n\} \sim p$ $Y_{1:m} = \{Y_1, ..., Y_m \} \sim q$

Estimate divergence $R_\alpha(p||q) = \frac{1}{\alpha - 1} \log \int p^\alpha q^{1-\alpha}$

### Visual Description
Text-only slide.
---
## Page 43
### Content
The Estimator

$X_{1:n} = \{X_1,..., X_n\} \sim p$
$Y_{1:m} = \{Y_1,..., Y_m\} \sim q$

$k \ge 1$, fixed.

$R_\alpha(p||q) = \frac{1}{\alpha - 1} \log \int p^\alpha q^{1-\alpha}$
$D_\alpha(p||q) = \int p^\alpha(x)q^{1-\alpha}(x)dx$.

$\rho_k(i)$: the distance of the k-th nearest neighbor of $X_i$ in $X_{1:n}$
$\nu_k(i)$ : the distance of the k-th nearest neighbor of $X_i$ in $Y_{1:m}$

$\hat{D}_\alpha(X_{1:n}||Y_{1:m}) = \frac{1}{n} \sum_{i=1}^{n} \left( \frac{(n-1)\rho_k^d(i)}{m\nu_k^d(i)} \right)^{1-\alpha} \frac{\Gamma(k)^2}{\Gamma(k - \alpha + 1)\Gamma(k + \alpha - 1)}$

$\int p^\alpha(x)q^\beta(x)dx$ can be estimated similarly.

### Visual Description
The slide presents mathematical formulas for Rényi divergence estimation. A diagram illustrates a point $X_i$ with its k-th nearest neighbors from two different distributions, $X_{1:n}$ (red points) and $Y_{1:m}$ (blue points). The distances $\rho_k(i)$ and $\nu_k(i)$ are shown as arrows from $X_i$ to its k-th nearest neighbors in each set, with $k=2$ indicated. The diagram is enclosed within a cloud-like shape.
---
## Page 44
### Content
ENTROPY ESTIMATION
without density estimation

Using $X_{1:n} \doteq (X_1,..., X_n)$ i.i.d. sample $\sim f$

Estimate Rényi entropy $R_\alpha = \frac{1}{1 - \alpha} \log \int f^\alpha(x)dx$

### Visual Description
Text-only slide.
---
## Page 45
### Content
Rényi-$\alpha$ entropy estimators using kNN graphs
Pál, Póczos & Szepesvári. NIPS 2010

$X^1,...,X^n \sim f$ i.i.d. samples in $R^d$
Let $p \doteq d - d\alpha$, $k$ fixed.

Let $N_{k,j}$ be the set of the $k$ nearest neighbours of $X^j$ in $\{X^1,...,X^n\}$

Calculate: $L_n = \sum_{j=1}^{n} \sum_{V \in N_{k,j}} ||V - X^j||^p$

$H_n(X^{1:n}) \doteq \frac{1}{1-\alpha} \log \left( \frac{L_n}{\beta_{d,p,k} n^\alpha} \right)$

$k=3$

### Visual Description
The slide presents a method for Rényi-$\alpha$ entropy estimation using kNN graphs. On the right, a large scatter plot shows numerous data points connected by lines, forming a k-nearest neighbor graph structure. On the bottom left, a smaller diagram illustrates a central point $X^j$ (red) and its three nearest neighbors (two red, one blue), with lines connecting them, indicating $k=3$. The text defines the samples, parameters, and the formulas for $L_n$ and $H_n(X^{1:n})$.
---
## Page 46
### Content
Theoretical Results

Almost surely consistent
$H_n(X^{1:n}) \doteq \frac{1}{1-\alpha} \log \left( \frac{L_n}{n^{(d-p)/d} \beta} \right) \to H_\alpha(X)$

Convergence rate
If the density $f$ is Lipschitz, $\alpha = 1 - p/d$, then for any $\delta > 0$ with probability at least $1 - \delta$,
$\left| H_n(X^{1:n}) - H_\alpha(f) \right| \le \begin{cases} O \left( n^{-\frac{d-p}{d(2d-p)}} (\log(1/\delta))^{1/2-p/(2d)} \right) & \text{if } 0 < p < d-1 \\ O \left( n^{-\frac{d-p}{d(d+1)}} (\log(1/\delta))^{1/2-p/(2d)} \right) & \text{if } d-1 \le p < d \end{cases}$

Pál, Póczos & Szepesvári, NIPS 2010

### Visual Description
Text-only slide.
---
## Page 47
### Content
Thanks for your Attention!

### Visual Description
A simple slide with the text "Thanks for your Attention!" centered on a red banner.
---
