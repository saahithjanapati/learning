# How GPT-5, Claude, and Gemini Are Actually Trained and Served

Source: `https://www.youtube.com/watch?v=xmkSf5IS-zw`
Companion summary: `https://podwise.ai/dashboard/episodes/7886446`
Site: `Dwarkesh Patel / YouTube`
Title: `How GPT-5, Claude, and Gemini are actually trained and served`
Speaker: `Reiner Pope`
Ingested: `2026-05-05`
Extraction engine: `YouTube metadata + transcript excerpt + companion summary digest`
Strategy: `talk transcript normalization into infrastructure lesson`

## Summary

This talk is a blackboard-style systems lecture on why modern frontier LLMs look the way they do when you take training, inference, hardware, batching, memory bandwidth, and API pricing seriously at the same time.

The discussion moves from inference economics and batching, to mixture-of-experts and pipeline parallelism, to long-context memory bottlenecks, and finally to what public pricing and latency information lets outsiders infer about model architecture and deployment choices.

## Main Points

### 1. Inference economics explains a lot

The talk treats API behavior and deployment choices as consequences of hardware constraints rather than arbitrary product policy.

### 2. Memory bandwidth and communication are central bottlenecks

Sparse architectures, batching strategy, and memory hierarchy are framed as practical responses to these limits.

### 3. Public signals reveal hidden structure

One of the talk's distinctive ideas is that API prices, latency patterns, and context behavior let careful observers reverse-engineer parts of frontier model serving stacks.
