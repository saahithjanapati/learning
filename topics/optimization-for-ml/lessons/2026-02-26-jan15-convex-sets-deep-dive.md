# Optimization for ML - January 15, 2026

## Expository Deep Dive: Convex Sets and Geometric Thinking

Source transcript: `materials/processed/optimization-for-ml/Jan15_ConvexSets.md`

## How to read this lesson

This is the geometry lecture. Read slowly and draw pictures. If you only memorize formulas, later optimality conditions will feel abstract and hard.

## 1) The central definition

A set $C$ is convex if every line segment between two points in $C$ stays in $C$:

$$
x_1,x_2\in C,\ \theta\in[0,1] \Rightarrow \theta x_1+(1-\theta)x_2\in C.
$$

That is it. But almost every later theorem depends on this one closure property.

## 2) Why convexity is algorithmically powerful

The lecture's key theorem is:

- in convex optimization, every local minimum is a global minimum.

The proof by contradiction is worth internalizing:

1. assume a local minimum $x$ is not global
2. pick better feasible point $x^*$
3. form a convex combination that stays feasible and stays inside local neighborhood
4. convexity forces lower objective than at $x$, contradiction

This is the reason local search can be globally meaningful in convex problems.

## 3) Convex hull and affine hull

Convex hull is "all convex combinations" of points in $C$:

$$
\operatorname{conv}(C)=\left\{\sum_i \theta_i x_i:\ \theta_i\ge0,\ \sum_i\theta_i=1\right\}.
$$

Affine hull is the smallest affine set containing $C$. Keep both in mind because relative interior, boundaries, and dimensional arguments use affine hull heavily.

## 4) Building blocks: hyperplanes and halfspaces

The lecture repeatedly uses:

- hyperplane: $a^\top x=b$
- halfspace: $a^\top x\le b$

Intersections of halfspaces create polyhedral feasible sets, a major practical class in optimization.

## 5) Cones and convex cones

Cone means scaling closure by nonnegative factors. Convex cone adds closure under nonnegative linear combinations.

This lecture then introduces conic hull and examples like PSD cones and norm cones. These are not side topics; they become core in duality and optimality geometry.

## 6) Interior, relative interior, boundary

A subtle but crucial point:

- lower-dimensional sets can have empty standard interior
- relative interior uses the affine hull as ambient space

Without this distinction, many feasibility conditions are misapplied.

## 7) Polar, normal, and tangent cones

The lecture introduces the cone triad that appears later in KKT conditions:

- polar cone
- normal cone
- tangent cone

Normal cone at $x$:

$$
N_C(x)=\{g:\ g^\top(y-x)\le0,\ \forall y\in C\}.
$$

Geometrically, normal vectors point "outward" from feasible directions. This is exactly the language used in constrained first-order optimality.

## 8) Intuition you should keep

For convex sets, movement is predictable: if two points are feasible, the whole segment is feasible. For nonconvex sets, you can have "good points across a wall" that local steps cannot access.

That picture explains most algorithmic behavior differences.

## Checkpoint

You should be able to explain, without notes:

- why local equals global in convex programs
- difference between interior and relative interior
- what normal cone means at interior vs smooth-boundary vs corner points

## Common mistakes

- assuming union of convex sets is convex
- treating every cone as convex
- using interior when relative interior is required
- viewing normal cone as just one vector (it can be a full cone at corners)

## One-paragraph recap

Jan 15 gives you the geometric language of optimization: convex sets, hulls, cones, and boundaries. Later optimality and algorithm proofs are direct translations of these geometric facts into algebra.
