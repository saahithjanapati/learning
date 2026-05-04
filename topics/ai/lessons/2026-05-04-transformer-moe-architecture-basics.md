# Basics of Transformer MoE Architecture

Source note: topic lesson written from standard mixture-of-experts transformer design patterns used in modern LLMs.

## Table of Contents

1. [Start Here](#start-here)
2. [What MoE Adds To A Transformer](#what-moe-adds-to-a-transformer)
3. [Router, Experts, And Sparsity](#router-experts-and-sparsity)
4. [Why People Use MoE Models](#why-people-use-moe-models)
5. [Tradeoffs And Failure Modes](#tradeoffs-and-failure-modes)

## Start Here

A Mixture-of-Experts transformer keeps the ordinary transformer skeleton, but replaces some dense feed-forward blocks with a set of specialized sub-networks called `experts`.

## What MoE Adds To A Transformer

In a dense transformer, every token goes through the same feed-forward block. In an MoE transformer, a router chooses which experts should process each token.

That means the model can have very large total parameter count without using all parameters for every token.

## Router, Experts, And Sparsity

The three key pieces are:

- `router`: scores experts for each token,
- `experts`: separate feed-forward subnetworks,
- `sparse activation`: only top-k experts run for a given token.

This gives conditional computation: large capacity, but cheaper per-token compute than activating the full parameter set.

## Why People Use MoE Models

MoE designs are attractive because they can scale model capacity faster than dense compute. That is useful for reasoning, multilingual coverage, and specialized behaviors where different token types may benefit from different sub-networks.

## Tradeoffs And Failure Modes

MoE models introduce new engineering headaches:

- load balancing across experts,
- routing instability,
- communication overhead,
- expert collapse,
- harder serving and training infrastructure.

So MoE is not free capacity. It is a capacity-versus-systems-complexity trade.
