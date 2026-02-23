# S26_10_725_HW1_optimization_ml

Source: `materials/archive/S26_10_725_HW1_optimization_ml.pdf`
Duplicate equivalents: `S26_10_725_HW1_optimization_ml.pdf`
Extraction engine: `Local PyMuPDF text extraction (fitz)`
Strategy: `full-PDF page-wise text extraction`
Finish reason: `COMPLETE`
Pages: 10
## Page 1
### Content
Homework 1
CMU 10-725: Optimization for Machine Learning
OUT: Tuesday, Jan 20th, 2026
DUE: Tuesday, February 3rd, 2026, 11:59pm
START HERE: Instructions
• Collaboration policy: Collaboration on solving the homework is allowed, after you
have thought about the problems on your own. To remind you, many questions in
this HW have solutions that are very easy to find online (and many are from previous
versions of this course). It is also OK to get clarification (but not solutions) from
books or online resources, again after you have thought about the problems on your
own. There are two requirements: first, cite your collaborators fully and completely
(e.g., “Jane explained to me what is asked in Question 2.1”).
Second, write your
solution independently: close the book and all of your notes, and send collaborators
out of the room, so that the solution comes from you only.
• Submitting your work:
– Gradescope: For the written problems such as short answer, multiple choice,
derivations, proofs, or plots, we will be using the Gradescope. The best way to
format your homework is by using the Latex template released in the handout
and writing your solutions in Latex. However, submissions can be handwritten
onto the template, but should be labeled and clearly legible. If your writing is
not legible, you will not be awarded marks.
Regrade requests can be made after the homework grades are released, however
this gives the TA the opportunity to regrade your entire paper, meaning if addi-
tional mistakes are found then points will be deducted.
– Programming: You should submit all code used to solve the programming as-
pect of the homework to the corresponding ’Programming’ submission slot on
Gradescope. If you do not do this, you will not get any credit for any of the pro-
gramming section irrespective of the plots and values submitted to the ’Written’
submission slot.
1

---

## Page 2
### Content
1
Convex sets - Michael
1.1
The polytope
Solution To show P is convex, pick any x, y ∈P and θ ∈[0, 1].
We must show z =
θx + (1 −θ)y ∈P. Since x, y ∈P, they satisfy ⟨ai, x⟩≤bi and ⟨ai, y⟩≤bi for all i ∈[m].
For the point z:
⟨ai, θx + (1 −θ)y⟩= θ⟨ai, x⟩+ (1 −θ)⟨ai, y⟩
≤θbi + (1 −θ)bi = bi
Since z satisfies all m constraints, z ∈P. Thus, the polytope is convex.
ℓ1 ball: The set {x | ∥x∥1 ≤1} can be expressed as a collection of linear inequalities:
Pd
i=1 ±xi ≤1 for all 2d combinations of signs. Since this is a finite intersection of half-spaces
(making it a polytope), it is a convex set.
1.2
The unit ball
Solution Pick x, y ∈B and θ ∈[0, 1]. We check if z = θx + (1 −θ)y satisfies P z2
i ≤1.
Using the hint 2ab ≤a2 + b2:
d
X
i=1
(θxi + (1 −θ)yi)2 =
X
(θ2x2
i + (1 −θ)2y2
i + 2θ(1 −θ)xiyi)
≤
X
(θ2x2
i + (1 −θ)2y2
i + θ(1 −θ)(x2
i + y2
i ))
= (θ2 + θ −θ2)
X
x2
i + ((1 −θ)2 + θ −θ2)
X
y2
i
= θ
X
x2
i + (1 −θ)
X
y2
i
Since P x2
i ≤1 and P y2
i ≤1, we have θ(1) + (1 −θ)(1) = 1. Thus z ∈B, and the unit ball
is convex.
1.3
The linear transformation
Solution Let x1, x2 ∈C and θ ∈[0, 1]. By definition, Ax1 + b = d1 and Ax2 + b = d2 for
some d1, d2 ∈D. Let z = θx1 + (1 −θ)x2. We check if Az + b ∈D:
A(θx1 + (1 −θ)x2) + b = θAx1 + (1 −θ)Ax2 + (θ + 1 −θ)b
= θ(Ax1 + b) + (1 −θ)(Ax2 + b)
= θd1 + (1 −θ)d2
Since D is a convex set, the convex combination θd1 + (1 −θ)d2 is also in D. Therefore,
z ∈C, so C is convex.
2

---

## Page 3
### Content
1.4
Ellipsoid
Solution The ellipsoid can be rewritten as E = {x ∈Rd | ∥A(x −b)∥2
2 ≤1}. This is the set
of points x such that the linear transformation f(x) = Ax −Ab maps x into the unit ball
B. From section 1.2, we know the unit ball B is convex. From section 1.3, we know that the
inverse image of a convex set under a linear transformation is also convex. Since E is the
inverse image of B under f(x), E is convex.
3

---

## Page 4
### Content
2
Convex Functions
2.1
The max Operation
Solution Let f(x) = maxi{fi(x)}. For any x, y ∈Rd and θ ∈[0, 1]:
f(θx + (1 −θ)y) = max
i
fi(θx + (1 −θ)y)
≤max
i (θfi(x) + (1 −θ)fi(y))
(by convexity of each fi)
≤θ max
i
fi(x) + (1 −θ) max
i
fi(y)
= θf(x) + (1 −θ)f(y)
Thus, f(x) is convex. For g(x) = min{fi(x)}, it is not necessarily convex. For example,
if f1(x) = x2 and f2(x) = (x −2)2, the minimum of these two convex parabolas creates a
non-convex hump at their intersection.
2.2
1-d Convex Functions
Solution
• f(x) = xex: f ′(x) = (x + 1)ex, f ′′(x) = (x + 2)ex. For x < −2, f ′′ < 0. Not convex.
• f(x) = ReLU(x)c: For c ≥1, this is a non-decreasing convex function composed with
a convex function. f ′′(x) ≥0 where defined. Convex.
• f(x) = log(1 + ex): f ′(x) =
ex
1+ex, f ′′(x) =
ex
(1+ex)2 > 0. Convex.
• f(x) = x log x: f ′(x) = 1 + log x, f ′′(x) = 1/x. Since x > 0, f ′′ > 0. Convex.
• f(x) = x sin x: f ′′(x) = 2 cos x−x sin x, which changes signs periodically. Not convex.
2.3
Products and Quotients
Solution
1. Let f(x) = 1 and g(x) = x2 + 1. Both are positive and convex, but f/g =
1
x2+1 is a
”bell curve” shape, which is concave near x = 0.
2. (fg)′′ = f ′′g + 2f ′g′ + fg′′. Since f, g > 0 and f, g are convex (f ′′, g′′ ≥0), and f ′, g′
have the same sign (both non-decreasing or non-increasing), all terms are ≥0. Thus
fg is convex.
3. Let h(x) = 1/g(x). Since g is positive, concave, and non-increasing, h is positive,
convex, and non-decreasing. Since f is also positive, convex, and non-decreasing, their
product f · h = f/g is convex by part 2.
2.4
Properties of KL-Divergence
Solution Using the hint DKL(u∥v) = f(u)−f(v)−∇f(v)T(u−v) where f(u) = P ui log ui:
The Hessian ∇2f(u) is a diagonal matrix with entries 1/ui. Since ui > 0, the Hessian is
4

---

## Page 5
### Content
positive definite, so f(u) is strictly convex. A property of convex functions is that the first-
order Taylor approximation is a lower bound: f(u) ≥f(v) + ∇f(v)T(u −v). Rearranging
gives f(u) −f(v) −∇f(v)T(u −v) ≥0, so DKL(u∥v) ≥0. By strict convexity, the equality
f(u) = f(v) + ∇f(v)T(u −v) holds if and only if u = v.
2.5
Logistic Regression
Solution f(x) = Pm
i=1 log(1 + exp(−yi⟨ai, x⟩)). Let g(z) = log(1 + ez), which we showed
is convex in 2.2. The term zi(x) = −yi⟨ai, x⟩is an affine (and thus convex) function of x.
The composition of a convex, non-decreasing function g with a convex function zi is convex.
Since f(x) is the sum of these convex compositions, f(x) is convex.
5

---

## Page 6
### Content
3
Characterizations of Convexity
1. Solution By convexity, for any t ∈[0, 1], f(x + t(y −x)) ≤(1 −t)f(x) + tf(y).
Rearranging: f(x+t(y−x))−f(x)
t
≤f(y)−f(x). Taking the limit as t →0: ∇f(x)T(y−x) ≤
f(y) −f(x) =⇒f(y) ≥f(x) + ∇f(x)T(y −x).
2. Solution From the hint, f(y)−f(x) =
R 1
0 ∇f(x+t(y −x))T(y −x)dt. Subtracting the
first-order term: f(y)−f(x)−∇f(x)T(y−x) =
R 1
0 (∇f(x+t(y−x))−∇f(x))T(y−x)dt.
Let zt = x+t(y−x). Then zt−x = t(y−x). The integrand is 1
t(∇f(zt)−∇f(x))T(zt−x).
By monotone gradient property, (∇f(zt)−∇f(x))T(zt −x) ≥0. The integral of a non-
negative function is non-negative, so f(y) ≥f(x) + ∇f(x)T(y −x).
3. Solution Pick x, y ∈dom(f). Then (x, f(x)) ∈Epi(f) and (y, f(y)) ∈Epi(f). Since
Epi(f) is convex, the segment θ(x, f(x))+(1−θ)(y, f(y)) is in Epi(f) for θ ∈[0, 1]. The
point is (θx + (1 −θ)y, θf(x) + (1 −θ)f(y)). By definition of the epigraph, the height
component must be ≥f(position component): f(θx + (1 −θ)y) ≤θf(x) + (1 −θ)f(y).
This is the definition of convexity for f.
4
Partial Minimization
1. Solution Let x1, x2 ∈Rd. For any ϵ > 0, there exist y1, y2 ∈C such that f(x1, y1) ≤
g(x1) + ϵ and f(x2, y2) ≤g(x2) + ϵ. Let xθ = θx1 + (1 −θ)x2 and yθ = θy1 + (1 −θ)y2.
Since C is convex, yθ ∈C. g(xθ) = infy∈C f(xθ, y) ≤f(xθ, yθ). By convexity of f:
g(xθ) ≤θf(x1, y1) + (1 −θ)f(x2, y2) ≤θg(x1) + (1 −θ)g(x2) + ϵ. Since this holds for
all ϵ > 0, g is convex.
2. Solution Yes.
Define f(x, u) = h1(u) + h2(x −u).
h1(u) is convex in (x, u) and
h2(x −u) is a convex function of a linear transformation of (x, u), so f is convex in
(x, u). By the partial minimization rule from part 1, h1□h2(x) = infu f(x, u) is convex.
3. Solution f ∗(y) = supx(xy −f(x)). For a fixed x, h(y) = xy −f(x) is a linear (affine)
function of y. Linear functions are convex. The pointwise supremum of any collection
of convex functions is convex. Thus, f ∗(y) is convex. The convexity of the original
f(x) was not necessary for this conclusion.
6

---

## Page 7
### Content
5
Optimization with CVX (20 points) (Canary)
CVX is a framework for disciplined convex programming: it’s rarely the fastest tool for the
job, but it’s widely applicable, and so it’s a great tool to be comfortable with. In this exercise
we will set up the CVX environment and solve a convex optimization problem.
Generally speaking, for homeworks in this class, your solution to programming-based prob-
lems should include plots and whatever explanation necessary to answer the questions asked.
In addition, your full code should be submitted to the Homework 1 Gradescope submission
slot otherwise you will not get credit for the programming section.
CVX variants are available for each of the major numerical programming languages. There
are some minor syntactic and functional differences between the variants but all provide
essentially the same functionality. Download the CVX variant of your choosing:
• Matlab: http://cvxr.com/cvx/
• Python: http://www.cvxpy.org/
• R: https://cvxr.rbind.io
• Julia: https://github.com/JuliaOpt/Convex.jl
and consult the documentation to understand the basic functionality. Make sure that you
can solve the least squares problem minβ ∥y −Xβ∥2
2 for an arbitrary vector y and matrix
X. Check your answer by comparing with the closed-form solution (XTX)−1XTy.
Note: There are certain quirks of CVX that may result in you getting strange errors even
if your code is technically correct. We strongly recommend setting your solver to the Split-
ting Conic Solver (SCS) and sticking to CVX specific functions such as sum_squares and
quad_form if you encounter such errors when attempting the problems below.
Given labels y ∈{−1, 1}n, and a feature matrix X ∈Rn×p with rows x1, . . . xn, recall the
support vector machine (SVM) problem
min
β,β0,ξ
1
2∥β∥2
2 + C
n
X
i=1
ξi
subject to
ξi ≥0, i = 1, . . . n
yi(xT
i β + β0) ≥1 −ξi, i = 1, . . . n.
1. (5 pts) Load the training data in xy train.csv. This is a matrix of n = 200 row and
3 columns. The first two columns give the first p = 2 features, and the third column
gives the labels. Using CVX, solve the SVM problem with C = 1. Report the optimal
criterion value, and the optimal coefficients β ∈R2 and intercept β0 ∈R.
2. (5 pts) Recall that the SVM solution defines a hyperplane
β0 + βTx = 0,
7

---

## Page 8
### Content
which serves as the decision boundary for the SVM classifier. Plot the training data
and color the points from the two classes differently. Draw the decision boundary on
top.
3. (5 pts) Now define e
X ∈Rn×p to have rows exi = yixi, i = 1, . . . , n, and solve using
CVX the problem
max
w
−1
2wT e
X e
XTw + 1Tw
subject to
0 ≤w ≤C1, wTy = 0,
(Above, we use 1 to denote the vector of all 1s.) Report the optimal criterion value;
it should match that from part (1). Also report e
XTw at the optimal w; this should
mach the optimal β from part (1). Note: this is not a coincidence, and is an example
of duality, as we will study in detail later in the course.
4. (5 pts) Investigate many values of the cost parameter C = 2a, as a varies from
−5 to 5.
For each one, solve the SVM problem, form the decision boundary, and
calculate the misclassification error on the test data in xy test.csv. Make a plot of
misclassification error (y-axis) versus C (x-axis, which you will probably want to put
a log scale). Evaluate at least 50 points in the discretization.
Solution (1) Using CVXPY with the SCS solver and C = 1, the primal SVM solution
is
β =
1.41967209
1.24607492

,
β0 = −2.82372750,
with optimal objective value
1
2∥β∥2
2 + C
X
i
ξi = 36.74893271.
(2) The decision boundary is
β0 + β⊤x = 0
⇒
1.4197 x1 + 1.2461 x2 −2.8237 = 0,
or equivalently
x2 = −1.1393 x1 + 2.2661.
Figure 1 shows the training data and the separating hyperplane.
(3) Solving the dual with e
X and C = 1 yields optimal objective value
36.74893264,
matching the primal up to numerical precision. The recovered vector is
e
X⊤w =
1.41967191
1.24607477

,
which matches the primal β within solver tolerance, confirming duality.
(4) I evaluated 50 values of C = 2a for a ∈[−5, 5]. The error is nearly flat (about
0.08–0.09). Figure 2 shows the curve.
8

---

## Page 9
### Content
Figure 1: SVM Decision Boundary (C=1)
Figure 2: Test Error vs C
Important: Remember that you MUST submit all code used in this part to the Program-
ming submission slot on Gradescope otherwise you will not get credit for this section.
9

---

## Page 10
### Content
6
Collaboration Questions
1.
(a) Did you receive any help whatsoever from anyone in solving this assignment?
Solution No.
(b) If you answered ‘yes’, give full details (e.g. “Jane Doe explained to me what is
asked in Question 3.4”)
Solution No
2.
(a) Did you give any help whatsoever to anyone in solving this assignment?
Solution
No.
(b) If you answered ‘yes’, give full details (e.g. “I pointed Joe Smith to section 2.3
since he didn’t know how to proceed with Question 2”)
Solution
3.
(a) Did you find or come across code that implements any part of this assignment?
Solution No.
(b) If you answered ‘yes’, give full details (book & page, URL & location within the
page, etc.).
Solution
10

---
