# Lecture_16_VAE

Source: `materials/archive/Lecture_16_VAE.pdf`
Duplicate equivalents: `Lecture_16_VAE.pdf`
Extraction engine: `Gemini API (gemini-2.5-flash)`
Strategy: `chunked inline-PDF conversion`
Finish reason: `STOP`
Pages: 46

## Page 1
### Content
10708
Probabilistic Graphical Models:
Spring 2026

Andrej Risteski
Machine Learning Department

Lecture 16:
Variational Autoencoders and
Black-Box Variational Inference (BBVI)
### Visual Description
Title slide with the course number "10708", course title "Probabilistic Graphical Models: Spring 2026", instructor name "Andrej Risteski", "Machine Learning Department", and the lecture title "Lecture 16: Variational Autoencoders and Black-Box Variational Inference (BBVI)".
---
## Page 2
### Content
Deep generative modeling

**Goal:** Learn a distribution close to some distribution we have few samples from. Additionally, we want to be able to sample efficiently from learned distribution.

**Deep learning approach:** Fit flexible distribution parametrized by neural network. Train using (some version of) gradient descent.

Multiple instantiations of this: variational autoencoders (this lecture), generative adversarial networks (GANs, later), normalizing flows, energy-based models, ...
### Visual Description
Text-only slide.
---
## Page 3
### Content
Deep generative modeling

Training
Data(CelebA)

Model Samples
(Karras et.al., 2018)

4 years of progression on Faces

Brundage et al.,
2017

2014
2015
2016
2017
### Visual Description
The slide is titled "Deep generative modeling". At the top left, a grid of 16 small celebrity face images is labeled "Training Data (CelebA)". To its right, an arrow points to two larger, high-quality generated face images (one female, one male) labeled "Model Samples (Karras et.al., 2018)". Below these, a section titled "4 years of progression on Faces" shows a row of four face images, progressively more realistic, labeled with years 2014, 2015, 2016, 2017, and attributed to "Brundage et al., 2017".
---
## Page 4
### Content
Deep generative modeling

Whichfaceisreal.com
(2019)
### Visual Description
The slide is titled "Deep generative modeling". It displays two large, realistic face images side-by-side. The left image shows an older man, and the right image shows a young woman wearing white sunglasses. Below the images, the text "Whichfaceisreal.com (2019)" is displayed.
---
## Page 5
### Content
Deep generative modeling

HIGGSFIELD
2023
Kling 2.6
2025
https://www.reddit.com/r/ChatGPT/comments/1pe630n/will_smith_eating_spaghetti_29_years_later/
### Visual Description
The slide is titled "Deep generative modeling". It features two side-by-side images of Will Smith. The left image, labeled "2023", shows a deepfake of Will Smith with spaghetti strands unnaturally extending from his mouth. The right image, labeled "2025", shows a more realistic depiction of Will Smith eating spaghetti in what appears to be a studio setting, with "HIGGSFIELD Kling 2.6" visible. A URL is provided at the bottom of the slide.
---
## Page 6
### Content
Deep generative modeling

Conditional generative model P(zebra images| horse images)

Style Transfer

Input Image
Monet
Van Gogh
Zhou el al., Cycle GAN 2017
### Visual Description
The slide is titled "Deep generative modeling". The top section shows two side-by-side images illustrating a "Conditional generative model P(zebra images| horse images)". The left image is a horse in a field, and the right image is the same horse transformed into a zebra in the same field. The bottom section, labeled "Style Transfer", displays three images: an "Input Image" of a field with red poppies, followed by the same scene rendered in the style of "Monet", and then in the style of "Van Gogh". The attribution "Zhou el al., Cycle GAN 2017" is at the bottom right.
---
## Page 7
### Content
Deep generative modeling

Prompt: A movie still-like cinematic shot of Batman seated alone in a cozy, dimly lit wooden booth of a vintage-style café. The camera captures him in a low-angle, wide-frame perspective, emphasizing the ambiance of the space. Batman's black suit contrasts against the warm, golden-brown wooden walls and leather seating. He holds 'The Guardian' newspaper, his face partly obscured, with steam rising from a cup of coffee on the black table. The overhead light casts a soft, filmic glow, with shadows deepening the dramatic atmosphere.
https://www.reddit.com/r/ChatGPT/comments/1eoxr7v/having_fu
n_with_photo_realistic_image_gpt_in/
### Visual Description
The slide is titled "Deep generative modeling". A large image on the left shows Batman (Christian Bale's portrayal) sitting alone in a dimly lit, vintage-style café booth, holding a newspaper, with two cups of coffee on the table. To the right of the image, a detailed text prompt describes the scene. A URL is provided at the bottom of the slide.
---
## Page 8
### Content
Variational autoencoders

Directed Bayesian network with Gaussian layers

$$p(\mathbf{x}|\theta) = \sum_{\mathbf{h}^1,...,\mathbf{h}^L} p(\mathbf{h}^L|\theta)p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta) \cdots p(\mathbf{x}|\mathbf{h}^1, \theta)$$

Each term may denote a complicated nonlinear relationship

Generative
P($\mathbf{h}^3$)
Process
P($\mathbf{h}^2|\mathbf{h}^3$)
W$^3$
W$^2$
P($\mathbf{h}^1|\mathbf{h}^2$)
W$^1$
P($\mathbf{x}|\mathbf{h}^1$)
Input data

Typically, directed layers are parametrized as:
$$p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta) = \mathcal{N}(\mu_\theta(\mathbf{h}^L), \Sigma_\theta(\mathbf{h}^L))$$
Gaussians, means/covariances functions (e.g. one-layer neural net) of previous layer and model parameters $\theta$.
Easy to sample!
### Visual Description
The slide is titled "Variational autoencoders". A blue box at the top contains the equation for a directed Bayesian network: $p(\mathbf{x}|\theta) = \sum_{\mathbf{h}^1,...,\mathbf{h}^L} p(\mathbf{h}^L|\theta)p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta) \cdots p(\mathbf{x}|\mathbf{h}^1, \theta)$. An arrow points from this equation to the text "Each term may denote a complicated nonlinear relationship". On the left, a diagram illustrates a deep neural network (a directed graphical model) with layers $\mathbf{h}^3, \mathbf{h}^2, \mathbf{h}^1, \mathbf{x}$, labeled as "Generative Process" and "Input data", showing connections and weights $W^3, W^2, W^1$. On the right, text explains that directed layers are typically parametrized as $p(\mathbf{h}^{L-1}|\mathbf{h}^L, \theta) = \mathcal{N}(\mu_\theta(\mathbf{h}^L), \Sigma_\theta(\mathbf{h}^L))$, using Gaussians, means/covariances functions of the previous layer and model parameters $\theta$, concluding with "Easy to sample!".
---
## Page 9
### Content
Variational Autoencoder: early days

Data
VAE samples
Images generated using a trained VAE, slides from
http://efrosgans.eecs.berkeley.edu/CVPR18_slides/VAE_GANS_by_Rosca.pdf
### Visual Description
The slide displays two grids of images side-by-side. The left grid, labeled "Data," shows a collection of 64 diverse real-world images, including animals (dogs, horses, birds), vehicles (boats, planes), and landscapes. The right grid, labeled "VAE samples," shows 64 corresponding images generated by a VAE. These generated images are noticeably blurrier and less distinct than the original data images, but they capture the general content and color schemes.
---
## Page 10
### Content
Variational Autoencoder: early days

Images generated using a trained VAE, slides from
http://efrosgans.eecs.berkeley.edu/CVPR18_slides/VAE_GANS_by_Rosca.pdf
### Visual Description
The slide presents two large grids of human faces. The left grid shows 64 distinct, clear photographs of various individuals' faces, labeled implicitly as "Data" (though the label is not present on this specific slide, it follows the pattern of the previous slide). The right grid displays 64 faces generated by a VAE, labeled implicitly as "VAE samples." These generated faces are generally recognizable as human faces but appear somewhat blurred, smoothed, and less detailed than the real photographs, characteristic of early VAE outputs.
---
## Page 11
### Content
Variational Autoencoder: recent versions
(VQ-VAE, Oord et al '17, Razavi et al '19)

Figure from Razavi et al '19
### Visual Description
The slide features six high-quality, photorealistic images of human faces arranged in a 2x3 grid. Each face is distinct, showing different genders, ethnicities, and expressions. The images are sharp and detailed, demonstrating the improved generation capabilities of recent VAE versions like VQ-VAE.
---
## Page 12
### Content
Variational Autoencoder: recent versions
(DALL-E, Ramesh et al '21)

TEXT PROMPT
an illustration of a baby daikon radish in a tutu walking a dog
AI-GENERATED IMAGES

TEXT PROMPT
an armchair in the shape of an avocado [...]
AI-GENERATED IMAGES

Edit prompt or view more images ↓
https://openai.com/blog/dall-e/
### Visual Description
The slide showcases two examples of text-to-image generation by DALL-E. The top section shows a text prompt: "an illustration of a baby daikon radish in a tutu walking a dog." Below it are five AI-generated images, each depicting a cartoon-like baby daikon radish in a pink tutu, walking a small dog. The radishes vary slightly in appearance and pose. The bottom section presents another text prompt: "an armchair in the shape of an avocado [...]". Below this, five AI-generated images display armchairs designed to resemble avocados, with variations in color, material, and specific avocado-like features.
---
## Page 13
### Content
Variational Autoencoder: recent versions
(DALL-E, Ramesh et al '21)

TEXT PROMPT
a professional high quality illustration of a giraffe turtle
chimera. a giraffe imitating a turtle. a giraffe made of turtle.
AI-GENERATED
IMAGES

We find that DALL-E is sometimes able
to combine distinct animals in
plausible ways. We include "pikachu"
to explore DALL-E's ability to
incorporate knowledge of popular
media, and "robot" to explore its ability
to generate animal cyborgs. Generally,
the features of the second animal
mentioned in the caption tend to be
dominant.

We also find that inserting the phrase
"professional high quality" before
"illustration" and "emoji" sometimes
improves the quality and consistency
of the results.
https://openai.com/blog/dall-e/
### Visual Description
The slide presents a DALL-E demonstration focusing on animal chimeras. On the left, a text prompt reads: "a professional high quality illustration of a giraffe turtle chimera. a giraffe imitating a turtle. a giraffe made of turtle." Below this, a 3x5 grid displays 15 AI-generated images, each depicting various interpretations of giraffe-turtle hybrids or giraffes with turtle-like features. The images range from realistic illustrations to more stylized or abstract representations. On the right, there is a block of explanatory text detailing DALL-E's ability to combine distinct animals, incorporate popular media knowledge, and how prompt phrasing can affect image quality.
---
## Page 14
### Content
Variational Autoencoder: recent versions
(NVAE, Vahdat-Kautz '21)

Figure from Vahdat-Kautz '21
### Visual Description
The slide displays a 4x4 grid of 16 high-quality, photorealistic human faces. Each face is distinct, showing a variety of genders, ages, ethnicities, and expressions. The images are sharp, detailed, and appear very natural, showcasing the advanced generative capabilities of NVAE.
---
## Page 15
### Content
Approximate posterior family

The posterior family is defined in terms of an analogous factorization:
$$q(\mathbf{h}|\mathbf{x}, \phi) = q(\mathbf{h}^1|\mathbf{x}, \phi)q(\mathbf{h}^2|\mathbf{h}^1, \phi) \dots q(\mathbf{h}^L|\mathbf{h}^{L-1}, \Phi)$$

Each term may denote a complicated nonlinear relationship

Typically, directed layers are parametrized as:
$$q(\mathbf{h}^l|\mathbf{h}^{l-1}, \phi) = \mathcal{N}(\mu_\phi(\mathbf{h}^{l-1}), \Sigma_\phi(\mathbf{h}^{l-1}))$$

Means/covariances fns (e.g. one-layer neural net) of previous layer and parameters $\phi$.
### Visual Description
The slide features a large diagram of a deep neural network, illustrating both the "Approximate Inference" and "Generative Process" flows. On the left, red arrows indicate "Approximate Inference" flowing upwards from input data 'x' through hidden layers $\mathbf{h}^1, \mathbf{h}^2, \mathbf{h}^3$, with associated conditional probabilities $Q(\mathbf{h}^2|\mathbf{h}^1)$ and $Q(\mathbf{h}^3|\mathbf{h}^2)$. On the right, blue arrows indicate the "Generative Process" flowing downwards from $\mathbf{h}^3$ through $\mathbf{h}^2, \mathbf{h}^1$ to 'x', with associated conditional probabilities $P(\mathbf{h}^2|\mathbf{h}^3)$, $P(\mathbf{h}^1|\mathbf{h}^2)$, and $P(\mathbf{x}|\mathbf{h}^1)$. The network layers are represented by nodes (circles) and connections (lines) with weights $\mathbf{W}^1, \mathbf{W}^2, \mathbf{W}^3$. The top of the slide contains a blue box with a mathematical factorization for the posterior family. Below the diagram, there are explanations for the nonlinear relationships and the parametrization of directed layers using a normal distribution.
---
## Page 16
### Content
Training VAEs

Max-likelihood can be written variationally as:
$$\max_\theta \max_\phi \sum_x \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})} \log \frac{p_\theta(\mathbf{x}, \mathbf{h})}{q_\phi(\mathbf{h}|\mathbf{x})}$$

Recall: $\log p_\theta(\mathbf{x}) = KL(q_\phi(\mathbf{h}|\mathbf{x}) || p_\theta(\mathbf{h}|\mathbf{x})) + H(q_\phi(\mathbf{h}|\mathbf{x})) + \mathbb{E}_{\mathbf{h} \sim q_\phi(\mathbf{h}|\mathbf{x})}[\log p_\theta(\mathbf{h},\mathbf{x})]$

(Gibbs variational principle)
### Visual Description
Text-only slide.
---
## Page 17
### Content
# Training VAEs

Max-likelihood can be written variationally as:
$$ \max_{\theta} \max_{\phi} \sum_x E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x, h)}{q_{\phi}(h|x)} $$

We want to be able to take gradients in $\theta, \phi$.

**The main problem:** the expectation is with respect to $q_{\phi}(h|x)$, which depends on the variables we are taking a derivative with respect to.

**Derivatives wrt $\theta$ are easy:** a derivative of the type $\nabla_{\theta} E_{h \sim q} f_{\theta}(h)$ is easy to approximate if $q$ does not depend on $\theta$:
$$ \nabla_{\theta} E_{h \sim q} f_{\theta}(h) = E_{h \sim q} \nabla_{\theta} f_{\theta}(h) $$
Exchange only works if $q$ doesn't dep on $\theta$
$$ \approx \frac{1}{N} \sum_i \nabla_{\theta} f_{\theta}(h_i) \quad \text{iid samples from q} $$

### Visual Description
The slide is titled "Training VAEs". It features a light green box containing the variational form of max-likelihood. Below this, there is text explaining the challenge of taking gradients when the expectation depends on the variables of differentiation. An equation shows how derivatives with respect to $\theta$ are easy if $q$ does not depend on $\theta$, with an arrow pointing to the approximation using iid samples.
---
## Page 18
### Content
# REINFORCE estimator

Max-likelihood can be written variationally as:
$$ \max_{\theta} \max_{\phi} \sum_x E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x, h)}{q_{\phi}(h|x)} $$

**REINFORCE/score-based estimator:** the most straight-forward Monte Carlo estimator
$$ \nabla_{\phi} E_{h \sim q_{\phi}} f_{\phi}(h) = \nabla_{\phi} \int f_{\phi}(h) q_{\phi}(h) dh = \int \nabla_{\phi}[f_{\phi}(h) q_{\phi}(h)] dh $$
$$ = \int \nabla_{\phi} f_{\phi}(h) q_{\phi}(h) dh + \int f_{\phi}(h) \nabla_{\phi} q_{\phi}(h) dh $$
$$ = E_{h \sim q_{\phi}} [\nabla_{\phi} f_{\phi}(h)] + \int f_{\phi}(h) \frac{q_{\phi}(h)}{q_{\phi}(h)} \nabla_{\phi} q_{\phi}(h) dh $$
$$ = E_{h \sim q_{\phi}}[\nabla_{\phi} f_{\phi}(h)] + \int f_{\phi}(h) q_{\phi}(h) \nabla_{\phi} \log q_{\phi}(h) dh $$
$$ = E_{h \sim q_{\phi}}[\nabla_{\phi} f_{\phi}(h)] + E_{h \sim q_{\phi}}[f_{\phi}(h) \nabla_{\phi} \log q_{\phi}(h)] $$

### Visual Description
The slide is titled "REINFORCE estimator". It includes the same light green box with the variational form of max-likelihood as the previous slide. Below this, the definition of the REINFORCE/score-based estimator is given, followed by a multi-line mathematical derivation of the gradient $\nabla_{\phi} E_{h \sim q_{\phi}} f_{\phi}(h)$. A blue box highlights the term $\frac{q_{\phi}(h)}{q_{\phi}(h)}$ in the derivation, with an accompanying note "Idea: Turn integral into expectation by introducing this term".
---
## Page 19
### Content
# REINFORCE estimator

Max-likelihood can be written variationally as:
$$ \max_{\theta} \max_{\phi} \sum_x E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x, h)}{q_{\phi}(h|x)} $$

**REINFORCE/score-based estimator:**
$$ \nabla_{\phi} E_{h \sim q_{\phi}} f_{\phi}(x) = E_{h \sim q_{\phi}} \nabla_{\phi} f_{\phi}(h) + E_{h \sim q_{\phi}} [f_{\phi}(h) \nabla_{\phi} \log q_{\phi}(h)] $$

The first term actually vanishes!
$$ E_{h \sim q_{\phi}} \nabla_{\phi} f_{\phi}(h) = E_{h \sim q_{\phi}} \nabla_{\phi} \log p_{\theta}(x, h) - E_{h \sim q_{\phi}(h|x)} \nabla_{\phi} \log q_{\phi}(h|x) $$
$$ = 0 $$
$$ E_{h \sim q_{\phi}(h|x)} \nabla_{\phi} \log q_{\phi}(h|x) = \int q_{\phi}(h|x) \frac{1}{q_{\phi}(h|x)} \nabla_{\phi} q_{\phi}(h|x) dh = \nabla_{\phi} \int q_{\phi}(h|x) dh $$

### Visual Description
The slide is titled "REINFORCE estimator". It again features the light green box with the variational form of max-likelihood. Below this, the REINFORCE/score-based estimator equation is presented in a light blue box. The text "The first term actually vanishes!" is displayed, followed by a mathematical derivation showing why the first term equals zero.
---
## Page 20
### Content
# REINFORCE estimator

Max-likelihood can be written variationally as:
$$ \max_{\theta} \max_{\phi} \sum_x E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x, h)}{q_{\phi}(h|x)} $$

**REINFORCE/score-based estimator:**
$$ \nabla_{\phi} E_{h \sim q_{\phi}} f_{\phi}(x) = E_{h \sim q_{\phi}} \nabla_{\phi} f_{\phi}(h) + E_{h \sim q_{\phi}}[f_{\phi}(h) \nabla_{\phi} \log q_{\phi}(h)] $$

Evaluating the second term is easy:
Drawing samples from $q_{\phi}$ is easy, as is evaluating $f_{\phi}(h), \nabla_{\phi} \log q_{\phi}$
(log-density of Gaussian is just a quadratic)

### Visual Description
The slide is titled "REINFORCE estimator". It contains the familiar light green box with the variational form of max-likelihood. Below this, the REINFORCE/score-based estimator equation is shown in a light blue box. The text then explains that evaluating the second term of this estimator is easy, detailing that drawing samples from $q_{\phi}$ and evaluating $f_{\phi}(h), \nabla_{\phi} \log q_{\phi}$ are straightforward, with a parenthetical note about the log-density of a Gaussian.
---
## Page 21
### Content
# Using REINFORCE for BBVI

Strictly speaking, nothing special about VAEs.

**Black-Box Variational Inference (BBVI):** want to not have to rederive CAVI-style updates every time we have to do it for a new model.

Suppose we have any probabilistic model, parametrized s.t.
(1) $\log p_{\theta}(x, h)$ and $\log q_{\theta}(h|x)$ can be easily evaluated, as well as the gradients $\nabla_{\theta} \log q_{\theta}(h|x)$.
(2) Suppose that samples from $q_{\theta}(h|x)$ can be drawn.

Using previous strategy, can do (Monte-Carlo) approximation of variational version of maximum likelihood.

### Visual Description
The slide is titled "Using REINFORCE for BBVI". It begins with a general statement about VAEs. It then defines Black-Box Variational Inference (BBVI). A light blue box lists two conditions for a probabilistic model to be used with BBVI. Finally, text indicates that the previously discussed strategy can be used for Monte-Carlo approximation of the variational maximum likelihood.
---
## Page 22
### Content
# Using REINFORCE for BBVI

*   Control the variance of the gradient
    *   Rao-Blackwellization, control variates, importance sampling, ...
*   Adaptive step sizes
    *   [e.g., Duchi+ 2011; Tieleman and Hinton 2012; Kingma and Ba 2014]
*   Data subsampling, for massive data
    *   [Hoffman+ 2013]

Slide by David Blei

### Visual Description
The slide is titled "Using REINFORCE for BBVI". It features a diagram illustrating the concept of Black Box Variational Inference. "ANY MODEL", "REUSABLE VARIATIONAL FAMILIES", and "MASSIVE DATA" are shown as inputs to a "BLACK BOX VARIATIONAL INFERENCE" component, which outputs $p(\beta, z | x)$. Below the diagram, there are three bullet points detailing techniques for improving BBVI: controlling gradient variance (with examples like Rao-Blackwellization), adaptive step sizes (with citations), and data subsampling for massive data (with a citation). The slide is credited to David Blei.
---
## Page 23
### Content
# Using REINFORCE for BBVI

Slide by David Blei

### Visual Description
The slide is titled "Using REINFORCE for BBVI". It displays a complex graphical model diagram. The model shows a hierarchical structure with nodes labeled $\eta$, $z_{n,L,k}$, $w_{l+1,k}$, $z_{n,l+1,k}$, $w_{l,k}$, $z_{n,l,k}$, $w_{1,k}$, $z_{n,1,k}$, $w_{0,i}$, and $x_{n,i}$. Arrows indicate dependencies between these nodes. To the right of the diagram, the distributions for some nodes are specified: $z_{n,L,k} \sim \text{EXP-FAM}(\eta)$, $z_{n,l,k} \sim \text{EXP-FAM}(g(w_{l,k}^T z_{n,l+1}))$, and $x_{n,i} \sim \text{EXP-FAM}(g(w_{0,i}^T z_{n,1}))$. The slide is credited to David Blei.
---
## Page 24
### Content
# Reparametrization trick

Max-likelihood can be written variationally as:
$$ \max_{\theta} \max_{\phi} \sum_x E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x, h)}{q_{\phi}(h|x)} $$

As usual: we need to be able to take gradients in $\phi$

**Another Monte Carlo estimator:** write the expectation $E_{h \sim q_{\phi}(h|x)} \log \frac{p_{\theta}(x,h)}{q_{\phi}(h|x)}$ as an expectation over a distribution not dependent on $\phi$.

**Kingma-Welling '13: reparametrization trick!**
**Main idea:** a sample from $y \sim N(\mu, \Sigma)$ can be generated as follows
Sample $x \sim N(0, 1)$.
Output $y = \mu + \Sigma^{1/2}x$.

### Visual Description
The slide is titled "Reparametrization trick". It starts with the familiar light green box showing the variational form of max-likelihood. Below this, text states the need to take gradients in $\phi$. A light blue box introduces the idea of "Another Monte Carlo estimator" which involves rewriting an expectation over a distribution not dependent on $\phi$. The slide then highlights "Kingma-Welling '13: reparametrization trick!" and presents the "Main idea" in another light blue box, explaining how to generate a sample from a normal distribution $N(\mu, \Sigma)$ using a sample from $N(0,1)$.
---
## Page 25
### Content
Reparametrization trick

Max-likelihood can be written variationally as:
$$ \max_\theta \max_\phi \sum_x E_{h \sim q_\phi(h|x)} \log \frac{p_\theta(x, h)}{q_\phi(h|x)} $$

Recall that $q(\mathbf{h}|\mathbf{x}, \phi) = q(\mathbf{h}^1|\mathbf{x}, \phi)q(\mathbf{h}^2|\mathbf{h}^1, \phi) \dots q(\mathbf{h}^L|\mathbf{h}^{L-1}, \phi)$
where $q(\mathbf{h}^l|\mathbf{h}^{l-1}, \phi) = \mathcal{N}(\mu_\phi(\mathbf{h}^{l-1}), \Sigma_\phi(\mathbf{h}^{l-1}))$

To produce a sample from $q(\mathbf{h}|\mathbf{x}, \phi)$, sample iid standard Gaussians $\epsilon_1, \epsilon_2, \dots, \epsilon_L$. Set
$$ \mathbf{h}^l(\epsilon_l, \mathbf{h}^{l-1}, \phi) = \Sigma_\phi(\mathbf{h}^{l-1}, \phi)^{\frac{1}{2}}\epsilon_l + \mu(\mathbf{h}^{l-1}, \phi) $$
### Visual Description
The slide introduces the reparametrization trick. It shows the variational form of max-likelihood. Below this, it details how the posterior $q(\mathbf{h}|\mathbf{x}, \phi)$ can be decomposed into a product of conditional normal distributions. A boxed section at the bottom explains how to sample from this distribution using iid standard Gaussians and provides the formula for $h^l$.
---

## Page 26
### Content
Using the reparametrization trick

Max-likelihood can be written variationally as:
$$ \max_\theta \max_\phi \sum_x E_{h \sim q_\phi(h|x)} \log \frac{p_\theta(x, h)}{q_\phi(h|x)} $$

We can hence write the gradient wrt to $\phi$:
$$ \nabla_\phi E_{q_\phi(h|x)} \log \frac{p_\theta(x, h)}{q_\phi(h|x)} = E_{\epsilon_1, \epsilon_2, \dots, \epsilon_L} \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} $$
$$ = E_{\epsilon_1, \epsilon_2, \dots, \epsilon_L} \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} $$

By chain rule:
$$ \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} = \nabla_h \log \frac{p_\theta(x, h(\phi, \epsilon, x))}{q_\phi(h(\phi, \epsilon, x)|x)} \nabla_\phi h(\phi, \epsilon, x) $$
### Visual Description
The slide reiterates the variational form of max-likelihood. It then shows the derivation of the gradient with respect to $\phi$ for the expectation term, using the reparametrization trick to move the gradient inside the expectation. The chain rule is applied to further break down the gradient calculation.
---

## Page 27
### Content
Using the reparametrization trick

Max-likelihood can be written variationally as:
$$ \max_\theta \max_\phi \sum_x E_{h \sim q_\phi(h|x)} \log \frac{p_\theta(x, h)}{q_\phi(h|x)} $$

By chain rule:
$$ \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} = \nabla_h \log \frac{p_\theta(x, h(\phi, \epsilon, x))}{q_\phi(h(\phi, \epsilon, x)|x)} \nabla_\phi h(\phi, \epsilon, x) $$

Both gradients are easy to calculate via backprop (easy simple case on next slide).
It's common to have diagonal covariance mxs for training efficiency.
### Visual Description
The slide repeats the variational max-likelihood equation and the chain rule derivation for the gradient. It then states that these gradients are easy to calculate via backpropagation and mentions the common use of diagonal covariance matrices for training efficiency.
---

## Page 28
### Content
Using the reparametrization trick
$$ E_{\epsilon_1, \epsilon_2, \dots, \epsilon_L} \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} $$

Let's see how this loss looks for a special case.

In the simplest case of a single stochastic layer:
$p(x|z) = \mathcal{N}(f(z), \sigma^2I)$, $q(z|x) = \mathcal{N}(g(x), D)$
where $\sigma^2 > 0$ is the decoder variance, $D$ is a diagonal matrix with nonnegative entries, and $f, g, D, \sigma$ are all trainable parameters.

We have (for some constants $C_1, C_2, C_3$):
$$ \log p(x|z) = -\frac{1}{2\sigma^2} ||x - f(z)||^2 - d \log(\sigma) + C_1 $$
$$ \log p(z) = -||z||^2/2 + C_2 $$
$$ \log q(z|x) = -\frac{1}{2}(z - g(x), D^{-1}(z - g(x))) - \log \sqrt{\det D} + C_3 $$
### Visual Description
The slide shows a boxed equation for the gradient of the log-likelihood term. It then introduces a special case for a single stochastic layer, defining $p(x|z)$ and $q(z|x)$ as normal distributions with specific parameters. The parameters $\sigma^2$, $D$, $f$, $g$ are explained. Finally, it provides the log-likelihood expressions for $p(x|z)$, $p(z)$, and $q(z|x)$ with constants $C_1, C_2, C_3$.
---

## Page 29
### Content
Using the reparametrization trick
$$ E_{\epsilon_1, \epsilon_2, \dots, \epsilon_L} \nabla_\phi \log \frac{p_\theta(x, h(\epsilon, x, \phi))}{q_\phi(h(\epsilon, x, \phi)|x)} $$

Plugging this into the VAE loss (in the limit of infinite data):
$$ E_{x \sim p^*} E_{z \sim q(z|x)} [\log p(x|z) + \log p(z) - \log q(z|x)] - C $$
$$ = E_{x \sim p^*} E_{z \sim q(z|x)} \left[ -\frac{1}{2\sigma^2}||x - f(z)||^2 - d \log(\sigma) - ||z||^2/2 + \frac{1}{2}(z - g(x), D^{-1}(z - g(x))) + \log \sqrt{\det D} \right] $$
$$ = E_{x \sim p^*} E_{z' \sim \mathcal{N}(0, I_r)} \left[ -\frac{1}{2\sigma^2}||x - f(g(x) + D^{1/2}z')||^2 - d \log(\sigma) - ||g(x) + D^{1/2}z'||^2/2 \right. $$
$$ \left. \quad + \frac{1}{2}(z', z') + \log \sqrt{\det D} \right] $$
Involves quadratic functions of $f \circ g, g$; easy to calculate gradients through backpropagation.
### Visual Description
The slide starts with the same boxed gradient equation. It then shows the VAE loss function and expands it by substituting the log-likelihood terms from the previous slide. A further expansion is shown where $z$ is reparametrized as $g(x) + D^{1/2}z'$, with $z' \sim \mathcal{N}(0, I_r)$. The slide concludes by noting that the resulting expression involves quadratic functions, making gradient calculation via backpropagation easy.
---

## Page 30
### Content
Using reparametrization trick for BBVI

Strictly speaking, nothing special about VAEs.

**Black-Box Variational Inference (BBVI):** want to not have to rederive CAVI-style updates every time we have to do it for a new model.

(1) Suppose to draw samples from $q_\phi(h|x)$, we can sample $\epsilon \sim s(\epsilon)$, then output $h = h(\phi, \epsilon, x)$
(2) Suppose the gradients $\nabla_h \log q_\phi(h|x)$, $\nabla_h \log p_\theta(x, h)$ and $\nabla_\phi h(\phi, \epsilon, x)$ can be evaluated.

Using previous strategy, can do (Monte-Carlo) approximation of variational version of maximum likelihood.
### Visual Description
The slide introduces Black-Box Variational Inference (BBVI) and states that the reparametrization trick is not exclusive to VAEs. It defines BBVI's goal. A boxed section outlines two key assumptions/conditions for applying the reparametrization trick in BBVI: the ability to sample $h$ via a deterministic transformation of a simple distribution $\epsilon$, and the evaluability of specific gradients. The slide concludes by mentioning that this strategy allows for Monte-Carlo approximation of the variational maximum likelihood.
---

## Page 31
### Content
Using reparametrization trick for BBVI

Strictly speaking, nothing special about VAEs.

**Black-Box Variational Inference (BBVI):** want to not have to rederive CAVI-style updates every time we have to do it for a new model.

Many machine learning models are differentiable. For example: linear and logistic regression, matrix factorization with continuous or discrete observations, linear dynamical systems, and Gaussian processes. (See Table 1.) At first blush, the restriction to continuous random variables may seem to leave out other common machine learning models, such as mixture models, hidden Markov models, and topic models. However, marginalizing out the discrete variables in the likelihoods of these models renders them differentiable.

| Model Type | Examples |
|---|---|
| Generalized linear models | (e.g., linear / logistic / probit) |
| Mixture models | (e.g., mixture of Gaussians) |
| Deep exponential families | (e.g., deep latent Gaussian models) |
| Topic models | (e.g., latent Dirichlet allocation) |
| Linear dynamical systems | (e.g., state space models, hidden Markov models) |
| Gaussian process models | (e.g., regression / classification) |

Table 1: Popular differentiable probability models in machine learning.

Figure from Kucukelbir et al '16
### Visual Description
The slide reiterates the definition and purpose of BBVI. It then discusses the differentiability of various machine learning models, explaining that even models with discrete variables can become differentiable by marginalizing them out. A table titled "Table 1: Popular differentiable probability models in machine learning" lists several model types with examples. The source of the table is cited as Kucukelbir et al '16.
---

## Page 32
### Content
Reparametrization trick vs REINFORCE

**REINFORCE:**
*   **PRO:** Can be used for discrete or continuous distributions. (Gradients of $p(h,x)$ or $q(h|x)$ wrt $h$ not required.)
*   **PRO:** Variational distribution class can be just about anything.
*   **CON:** Variance tends to be a problem in practice.

**Reparametrization trick:**
*   **CON:** Requires continuous distributions. (Gradients of $p(h,x)$ or $q(h|x)$ with respect to $h$ need to be calculated.)
*   **CON:** Variational distribution class needs to be expressible as deterministic transform of simple distribution.
*   **PRO:** Variance tends to be better behaved in practice. (Though see HW.)
### Visual Description
The slide presents a comparison between the REINFORCE algorithm and the Reparametrization trick. For REINFORCE, it lists two pros (discrete/continuous distributions, flexible variational class) and one con (variance issues). For the Reparametrization trick, it lists two cons (requires continuous distributions, specific variational class structure) and one pro (better-behaved variance).
---
## Page 33
### Content
Reparametrization trick vs REINFORCE

Plot/text from Kucukelbir et al, 2016.
(ADVI = reparametrization trick BBVI = REINFORCE)

Figure 8 empirically compares the variance of both estimators for two models. Figure 8a shows the variance of both gradient estimators for a simple univariate model, where the posterior is a Gamma(10, 10). We estimate the variance using ten thousand re-calculations of the gradient $\nabla_\mathcal{L}$, across an increasing number of MC samples $M$. The ADVI gradient has lower variance; in practice, a single sample suffices. (See the experiments in Section 4.)

Figure 8b shows the same calculation for a 100-dimensional nonlinear regression model with likelihood $N(y \mid \tanh(\mathbf{x}^\top \boldsymbol{\beta}), I)$ and a Gaussian prior on the regression coefficients $\boldsymbol{\beta}$. Because this is a multivariate example, we also show the BBVI gradient with a variance reduction scheme using control variates described in Ranganath et al. (2014). In both cases, the ADVI gradients are statistically more efficient.
### Visual Description
The slide title is "Reparametrization trick vs REINFORCE". On the right, there's a text box stating "Plot/text from Kucukelbir et al, 2016. (ADVI = reparametrization trick BBVI = REINFORCE)". Below the title, there are two line plots.

Plot (a) is titled "Univariate Model" and shows "Variance" on the y-axis (log scale from $10^0$ to $10^3$) against "Number of MC samples" on the x-axis (log scale from $10^0$ to $10^3$). It contains two lines: orange for ADVI and blue for BBVI. The ADVI line is consistently lower than the BBVI line.

Plot (b) is titled "Multivariate Nonlinear Regression Model" and has the same axis labels and scales as plot (a). It contains three lines: orange for ADVI, blue for BBVI, and purple for BBVI with control variate. The ADVI line is the lowest, followed by BBVI with control variate, and then BBVI.
---
## Page 37
### Content
Variational autoencoders

Directed Bayesian network with Gaussian layers
$p(\mathbf{x}|\boldsymbol{\theta}) = \sum_{\mathbf{h}^1,...,\mathbf{h}^L} p(\mathbf{h}^L|\boldsymbol{\theta})p(\mathbf{h}^{L-1}|\mathbf{h}^L, \boldsymbol{\theta})\cdots p(\mathbf{x}|\mathbf{h}^1, \boldsymbol{\theta})$

(Hierarchical) latent variable model where conditional distributions have simple parameterizations (e.g. Gaussian)
### Visual Description
The slide title is "Variational autoencoders". Below the title, there's a blue box containing the equation for $p(\mathbf{x}|\boldsymbol{\theta})$ and the text "Directed Bayesian network with Gaussian layers".

Below the blue box, there's a diagram illustrating a generative process. It's a multi-layer neural network-like structure with nodes arranged in columns.
- On the left, nodes are labeled $h^3$, $h^2$, $h^1$, and $x$.
- On the right, arrows point downwards, indicating a "Generative Process".
- The top layer starts with $P(h^3)$. An arrow labeled $W^3$ points from $h^3$ to $P(h^2|h^3)$.
- An arrow labeled $W^2$ points from $h^2$ to $P(h^1|h^2)$.
- An arrow labeled $W^1$ points from $h^1$ to $P(x|h^1)$.
- The bottom node is labeled 'x' and "Input data".
---
## Page 38
### Content
Why is it called an "autoencoder"?

The idea behind autoencoders: learn features, s.t. input is reconstructable from them

* Details of what goes inside the encoder and decoder matter!
* Need constraints to avoid learning an identity.
### Visual Description
The slide title is "Why is it called an "autoencoder"?". Below the title, there's a block diagram illustrating the autoencoder concept.

- At the top, a blue rectangular box is labeled "Feature Representation".
- Below it, two green rectangular boxes are side-by-side: "Decoder" on the left and "Encoder" on the right.
- An arrow points from "Feature Representation" down to "Decoder".
- An arrow points from "Encoder" up to "Feature Representation".
- Text next to "Decoder" says "Feed-back, generative, top-down".
- Text next to "Encoder" says "Feed-forward, bottom-up".
- At the bottom, a blue rectangular box is labeled "Input Image".
- An arrow points from "Decoder" down to "Input Image".
- An arrow points from "Input Image" up to "Encoder".
---
## Page 39
### Content
Why is it called an "autoencoder"?

Max-likelihood can be written variationally as:
$$ \max_{\boldsymbol{\theta}} \max_{\boldsymbol{\phi}} \sum_{\mathbf{x}} \mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{h}|\mathbf{x})} \log \frac{p_{\boldsymbol{\theta}}(\mathbf{x}, \mathbf{h})}{q_{\boldsymbol{\phi}}(\mathbf{h}|\mathbf{x})} $$
Let's rewrite the ELBO a bit:
$H(q(\mathbf{h}|\mathbf{x})) + \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} [\log p(\mathbf{x}, \mathbf{h})] = \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} [\log p(\mathbf{x}, \mathbf{h}) – \log q(\mathbf{h}|\mathbf{x})]$
$= \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} [\log p(\mathbf{h}) + \log p(\mathbf{x}|\mathbf{h}) – \log q(\mathbf{h}|\mathbf{x})]$
$= \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} \log p(\mathbf{x}|\mathbf{h}) – \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} \log \frac{q(\mathbf{h}|\mathbf{x})}{p(\mathbf{h})}$
$= \mathbb{E}_{q(\mathbf{h}|\mathbf{x})} \log p(\mathbf{x}|\mathbf{h}) – KL(q(\mathbf{h}|\mathbf{x})||p(\mathbf{h}))$

"Reconstruction" error
Use q as a "probabilistic" encoder,
Use p as a "probabilistic" decoder,
$\mathbf{x} \rightarrow \mathbf{h}^L \rightarrow \mathbf{x}$

"Regularization towards prior"
### Visual Description
Text-only slide.
---
## Page 40
### Content
The blurry samples problem

Samples are blurry, though they capture some high-level structure.
Some hypotheses for what goes wrong:

*   **Strong metric:** VAEs try to match the input distribution in KL divergence, which is quite a strong metric.
*   **Poor posteriors:** The posteriors in a VAE are Gaussian – very poor modeling power, e.g. cannot model multimodal distributions.
### Visual Description
Text-only slide.
---
## Page 41
### Content
The "variational" KL divergence
$$ KL(q||p) = - \int q(Z) \ln \frac{p(Z)}{q(Z)} dZ. $$
There is a large positive contribution to the KL divergence from regions of Z space in which:
- p(Z) is near zero
- unless q(Z) is also close to zero.

Minimizing KL(q||p) leads to distributions q(Z) that avoid regions in which p(Z) is small.
### Visual Description
The slide title is "The "variational" KL divergence". Below the title is the mathematical definition of KL divergence. On the right, there is a 2D contour plot titled "KL(q||p)". The x-axis is $z_1$ from 0 to 1, and the y-axis is $z_2$ from 0 to 1. There are several concentric green elliptical contours, representing one distribution, and several concentric red circular contours, representing another distribution, with the red circles nested within the green ellipses. The red circles are centered around (0.5, 0.5).
---
## Page 42
### Content
The blurry samples problem

Samples are blurry, though they capture some high-level structure.
Some hypotheses for what goes wrong:

*   **Strong metric:** VAEs try to match the input distribution in KL divergence, which is quite a strong metric.
*   **Poor posteriors:** The posteriors in a VAE are Gaussian – very poor modeling power, e.g. cannot model multimodal distributions.
*   **Max-likelihood encourages averaging:** finding the max-likelihood q to fit a distribution p is equivalent to minimizing KL(p||q) (by expanding the def. of KL = $\mathbb{E}_p \log p - \mathbb{E}_p \log q$).

Recall from when we talked about variational methods: this KL tends to "average" modes.
### Visual Description
The slide title is "The blurry samples problem". On the right, there is a 2D contour plot titled "KL(p||q)". The plot shows two sets of contours: one in blue and one in red. The blue contours form two distinct, separated elliptical regions, suggesting a bimodal distribution. The red contours form a single, larger elliptical region that encompasses both of the blue regions, suggesting an average or smoothed distribution.
---
## Page 43
### Content
The "maximum likelihood" KL divergence
$$ KL(p||q) = - \int p(Z) \ln \frac{q(Z)}{p(Z)} dZ. $$
There is a large positive contribution to the KL divergence from regions of Z space in which:
- q(Z) is near zero,
- unless p(Z) is also close to zero.

Minimizing KL(p||q) leads to distributions q(Z) that are nonzero in regions where p(Z) is nonzero.
### Visual Description
The slide title is "The "maximum likelihood" KL divergence". Below the title is the mathematical definition of KL divergence. On the right, there is a 2D contour plot titled "KL(p||q)". The x-axis is $z_1$ from 0 to 1, and the y-axis is $z_2$ from 0 to 1. There are several concentric green elliptical contours, representing one distribution, and several concentric red circular contours, representing another distribution. The red circles are nested within the green ellipses, and both are centered around (0.5, 0.5).
---
## Page 41
### Content
Some fixes

*   Force latent space to be discrete: simpler posterior, potentially better match for real data. (VQ-VAE: Oord et al '17, Razavi et al '19)
*   Careful engineering of architectures of generators/encoders. (NVAE: Vahdat-Kautz '21)
### Visual Description
Text-only slide.
---
## Page 42
### Content
NVAE, Vahdat-Kautz '21

Figure from Vahdat-Kautz '21
### Visual Description
A grid of 16 high-quality, photorealistic generated human faces, arranged in 4 rows and 4 columns. The faces show diverse individuals with varying ages, genders, and ethnicities.
---
## Page 43
### Content
Basic idea: careful changes in architecture

Main idea: hierarchical model for the generative and inference direction, with careful choice of architecture;

Generative model:
Use residual networks from layer to layer; the dimensions of the $z$'s gradually increase to gradually add more detail to image.

Figure 2: The neural networks implementing an encoder $q(z|x)$ and generative model $p(x, z)$ for a 3-group hierarchical VAE. $\diamond$ denotes residual neural networks, $\oplus$ denotes feature combination (e.g., concatenation), and $\boxplus$ is a trainable parameter.
### Visual Description
A diagram illustrating a "Bidirectional Encoder" (a) and a "Generative Model" (b) for a 3-group hierarchical VAE. Both models show a hierarchical structure with layers labeled $z_1, z_2, z_3$ and connections involving 'r' (residual networks), 'h' (feature combination), and 'sample' operations. The encoder processes from 'x' (bottom-up) to 'z' layers, while the generative model processes from 'z' layers (top-down) to 'x'.
---
## Page 44
### Content
Basic idea: careful changes in architecture

Generative model:
Use residual networks from layer to layer; the dimensions of the $z$'s gradually increase to gradually add more detail to image.

| Hyperparamter           | MNIST   | CIFAR-10 | ImageNet | CelebA  | CelebA HQ | FFHQ    |
| :---------------------- | :------ | :------- | :------- | :------ | :-------- | :------ |
| 28×28                   | 32×32   | 32×32    | 64×64    | 256×256   | 256×256 |         |
| \# latent variable scales | 2       | 1        | 1        | 3       | 5         | 5       |
| \# groups in each scale | 5, 10   | 30       | 28       | 5, 10, 20 | 4, 4, 4, 8, 16 | 4, 4, 4, 8, 16 |
| spatial dims of $z$ in each scale | $4^2, 8^2$ | $16^2$   | $16^2$   | $8^2, 16^2, 32^2$ | $8^2, 16^2, 32^2, 64^2, 128^2$ | $8^2, 16^2, 32^2, 64^2, 128^2$ |

Significant amount of engineering in architecture (batch norm layers were thought to be bad; swish activation; depthwise separated convolutions)
### Visual Description
A table titled "Hyperparamter" showing different datasets (MNIST, CIFAR-10, ImageNet, CelebA, CelebA HQ, FFHQ) and their corresponding image dimensions, number of latent variable scales, number of groups in each scale, and spatial dimensions of $z$ in each scale. Below the table, there is a diagram labeled "(a) Residual Cell for NVAE Generative Model" which shows a sequence of operations: C, BN, conv 1x1, Swish, conv 5x5, Swish, BN, conv 1x1, C, and an output with a summation symbol.
---
## Page 45
### Content
Basic idea: careful changes in architecture

Encoder: weight tied w/ decoder for better behavior of KL term

Recall, there is a term $KL(q(z|x)||p(z))$ which will be large if $q$ and $p$ are far.

Weight tying: if we parametrize $p(z)$ s.t.
$p(z_l|z_{<l}) := \mathcal{N}(\mu_l(z_{<l}), \sigma_l(z_{<l}))$
we parametrize $q(z|x)$ correspondingly as
$q(z_l|z_{<l},x) := \mathcal{N}(\mu_l(z_{<l}) + \Delta\mu_l(z_{<l}, x), \sigma_l(z_{<l}) \cdot \Delta\sigma_l(z_{<l},x))$
("relative to p" parametrization)

Then, we have:
$$KL(q(z_l^i|x)||p(z_l^i)) = \frac{1}{2}\left(\frac{\Delta\mu_l^2}{\sigma_l^2} + \Delta\sigma_l^2 - \log \Delta\sigma_l^2 - 1\right)$$

Figure 2: The neural networks implementing an encoder $q(z|x)$ and generative model $p(x, z)$ for a 3-group hierarchical VAE. $\diamond$ denotes residual neural networks, $\oplus$ denotes feature combination (e.g., concatenation), and $\boxplus$ is a trainable parameter.
### Visual Description
A diagram illustrating a "Bidirectional Encoder" (a) and a "Generative Model" (b) for a 3-group hierarchical VAE. Both models show a hierarchical structure with layers labeled $z_1, z_2, z_3$ and connections involving 'r' (residual networks), 'h' (feature combination), and 'sample' operations. The encoder processes from 'x' (bottom-up) to 'z' layers, while the generative model processes from 'z' layers (top-down) to 'x'. This is the same diagram as on page 43.
---
## Page 46
### Content
Some fixes for this

*   Force latent space to be discrete: simpler posterior, potentially better match for real data. (VQ-VAE: Oord et al '17, Razavi et al '19)
*   Careful engineering of architectures of generators/encoders. (NVAE: Vahdat-Kautz '21)

Change the loss you are fitting from maximum likelihood.
*   **Generative Adversarial Networks:** "learn" a distance by training a neural net distinguisher between learned and data distribution. (Stay tuned.)
*   **Score matching/noise contrastive estimation:** fit an entirely different loss that isn't maximum likelihood. (Stay tuned.)

See classes like 10-707, 10-617.
### Visual Description
Text-only slide.
---
