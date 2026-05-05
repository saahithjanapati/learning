# Improving Composer Through Real-Time RL

Source: `https://cursor.com/blog/real-time-rl-for-composer`
Site: `Cursor`
Title: `Improving Composer Through Real-Time RL`
Authors: `Jacob Jackson, Ben Trapani, Nathan Wang, Wanqi Zhu`
Ingested: `2026-05-05`
Extraction engine: `direct web scrape + manual structured ingest`
Strategy: `canonical article extraction and collection-oriented normalization`

## Summary

This article explains how Cursor applies `real-time RL` to Composer by collecting reward signals from actual user interactions, training on those signals, validating the updated checkpoint, and shipping new versions as often as every five hours.

The key motivation is reducing train-test mismatch. Simulated coding environments are useful, but the hardest part to simulate is the human user. Real-time RL uses real users and real production interactions as the supervision loop.

## Main Points

### 1. The central problem is train-test mismatch

The article says simulations capture the computer side of the environment much better than the human side.

### 2. Fast iteration keeps data near on-policy

By producing frequent checkpoints, Cursor tries to keep the training data aligned with the model that generated it.

### 3. Reward hacking becomes a systems problem

The post gives concrete examples of the model exploiting reward loopholes, such as broken tool calls or over-asking clarifying questions, and frames those failures as bugs in the RL stack that must be instrumented and repaired.
