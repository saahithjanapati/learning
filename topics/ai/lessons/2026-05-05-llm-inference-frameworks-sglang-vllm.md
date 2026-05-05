# LLM Inference Frameworks: SGLang, vLLM, And The Systems Layer Behind Fast AI

Source note: This lesson is based on official docs and project papers checked on 2026-05-05: [vLLM docs](https://docs.vllm.ai/en/latest/), the [vLLM PagedAttention paper](https://arxiv.org/abs/2309.06180), [SGLang docs](https://docs.sglang.ai/), the [SGLang paper](https://arxiv.org/abs/2312.07104), [SGLang OpenAI-compatible API docs](https://docs.sglang.io/basic_usage/openai_api.html), [SGLang frontend language docs](https://docs.sglang.io/references/frontend/frontend_index.html), [SGLang for RL systems](https://docs.sglang.io/advanced_features/sglang_for_rl.html), [Hugging Face Text Generation Inference docs](https://huggingface.co/docs/text-generation-inference/en/index), [NVIDIA TensorRT-LLM docs](https://nvidia.github.io/TensorRT-LLM/), and the [llama.cpp README](https://github.com/ggml-org/llama.cpp/blob/master/README.md).

## Table of Contents

- [Start Here](#start-here)
- [The One-Sentence Mental Model](#the-one-sentence-mental-model)
- [Why Inference Frameworks Exist](#why-inference-frameworks-exist)
- [The Serving Problem](#the-serving-problem)
- [Prefill, Decode, And The Shape Of LLM Work](#prefill-decode-and-the-shape-of-llm-work)
- [The KV Cache Is The Main Character](#the-kv-cache-is-the-main-character)
- [Batching And Scheduling](#batching-and-scheduling)
- [What vLLM Is For](#what-vllm-is-for)
- [What SGLang Is For](#what-sglang-is-for)
- [SGLang vs vLLM](#sglang-vs-vllm)
- [Other Frameworks In The Same Neighborhood](#other-frameworks-in-the-same-neighborhood)
- [Why People Actually Use These Systems](#why-people-actually-use-these-systems)
- [How To Choose A Framework](#how-to-choose-a-framework)
- [What Benchmarks Usually Miss](#what-benchmarks-usually-miss)
- [Common Confusions](#common-confusions)
- [Quick Check](#quick-check)
- [One-Minute Summary](#one-minute-summary)

## Start Here

An LLM inference framework is the software layer that turns model weights into a usable, fast, multi-user service.

That sounds simple until you look at what serving a modern language model actually requires. A production server must load huge weights onto accelerators, accept many user requests at once, tokenize prompts, run prefill, store and reuse KV cache, schedule decode steps, stream tokens back, handle failures, expose an API, support quantization, distribute a model across GPUs, and keep latency and cost under control.

SGLang and vLLM live in that layer. They are not new model families like Llama, Qwen, or DeepSeek. They are not agent frameworks like LangGraph, OpenAI Agents SDK, or custom tool loops. They are model serving and inference systems: the engine room where a prompt becomes output tokens.

The practical question they answer is:

> Given a model, hardware, and a pile of requests, how do we produce tokens quickly, cheaply, and reliably?

## The One-Sentence Mental Model

An inference framework is an operating system for LLM generation.

It does not change the model's learned knowledge by itself. Instead, it manages the scarce resources around the model: GPU memory, memory bandwidth, compute kernels, request queues, KV cache blocks, batching slots, tool-facing API behavior, and sometimes structured generation constraints.

If the model is the brain, the inference framework is the body plus traffic controller. It decides which requests get packed together, where attention state lives, how decoding work is interleaved, and how the outside world talks to the model.

## Why Inference Frameworks Exist

The naive way to run an LLM is:

1. Load the model.
2. Send one prompt.
3. Generate one token at a time.
4. Return the answer.

That works for a demo. It collapses under real load.

Real inference is hard because each user request has a different prompt length, output length, sampling configuration, stopping condition, and arrival time. Some users send short questions. Some send 100,000-token documents. Some ask for one sentence. Some ask for long code. If the server waits to batch only equal-shaped requests, hardware sits idle. If it packs requests poorly, memory fragments. If it over-batches, latency spikes. If it ignores KV cache, long-context serving gets wildly expensive.

Inference frameworks exist to solve this mismatch between messy human traffic and rigid accelerator hardware.

They provide:

- high-throughput serving for many concurrent users
- lower cost per token through batching and better memory use
- OpenAI-compatible APIs so apps can switch backends more easily
- memory management for long prompts and many active sequences
- distributed execution across multiple GPUs
- support for quantization, LoRA adapters, speculative decoding, structured outputs, and multimodal models, depending on the framework
- operational hooks such as metrics, logging, routing, and deployment knobs

The reason people care is not aesthetic. A better inference stack can decide whether a model is economically usable.

## The Serving Problem

At a high level, serving has four layers:

| Layer | What it handles | Example questions |
|---|---|---|
| Model weights | The neural network itself | Which Llama/Qwen/Mistral model? Dense or MoE? FP16, BF16, INT4? |
| Inference engine | GPU execution and scheduling | How are requests batched? Where is KV cache stored? Which kernels run? |
| Server/API | Product-facing request interface | Is there an OpenAI-compatible `/v1/chat/completions` endpoint? Streaming? Auth? |
| Application | User workflow | Is this a chatbot, coding agent, RAG system, RL rollout worker, or batch job? |

SGLang and vLLM mostly live in the inference engine and server/API layers. TensorRT-LLM leans especially hard into optimized engine/runtime execution. Hugging Face Text Generation Inference is a production serving stack around Hugging Face models. llama.cpp is a local and edge inference project built around GGUF and efficient CPU/GPU execution.

This distinction matters because "serving framework" gets confused with "agent framework." An agent framework decides what steps to take. An inference framework produces model tokens efficiently when asked.

## Prefill, Decode, And The Shape Of LLM Work

Autoregressive LLM inference has two very different phases.

### Prefill

Prefill processes the input prompt. If the user sends a 4,000-token prompt, the model can process much of that prompt in parallel. Prefill builds the KV cache for all prompt tokens and produces the logits for the next token.

Prefill is often compute-heavy. Long prompts make it expensive, but the work is more parallel than generation.

### Decode

Decode generates new tokens one at a time. After each token, the model appends that token's keys and values to the cache, then uses the cache to predict the next token.

Decode is sequential at the sequence level. You cannot know token 57 before generating token 56. The serving system gets throughput by decoding many different users' sequences together, not by making one user's sequence fully parallel.

### Why This Split Matters

Prefill and decode stress the system differently. Prefill wants large parallel computation. Decode often becomes a memory-bandwidth and scheduling problem because each step reuses model weights and reads KV cache while producing only one token per active sequence.

Good inference frameworks treat prefill and decode as separate workloads that should be scheduled carefully.

## The KV Cache Is The Main Character

Transformer attention needs keys and values from previous tokens. During generation, recomputing all earlier keys and values every time would be painfully wasteful, so servers store them in a KV cache.

The KV cache is what makes autoregressive generation practical. It is also what makes long-context serving expensive.

A useful picture:

```text
prompt tokens -> prefill -> KV cache blocks
new token 1  -> decode  -> append to KV cache
new token 2  -> decode  -> append to KV cache
...
```

The cache grows with:

- number of layers
- number of attention heads or KV heads
- head dimension
- sequence length
- number of active requests
- bytes per cache element

This is why a server can run out of memory even when the model weights fit. The weights are mostly fixed after loading. The KV cache expands with live traffic.

Good inference frameworks care deeply about KV cache layout, allocation, eviction, reuse, and sharing. This is the heart of vLLM's PagedAttention story and SGLang's RadixAttention story.

## Batching And Scheduling

The obvious way to batch is static batching:

```text
wait for N requests
run them together
finish the whole batch
start another batch
```

That is inefficient for LLM serving because requests finish at different times. One user might need 20 output tokens. Another might need 2,000. If the whole batch waits for the long request, hardware is wasted.

Modern LLM servers use continuous batching or in-flight batching. Instead of treating a batch as a fixed object, the server continually adds new requests and removes completed ones during the decode loop.

```text
decode step 1: requests A, B, C
decode step 2: requests A, B, C, D
decode step 3: requests A, C, D      B finished
decode step 4: requests A, C, D, E
```

This keeps the accelerator busier. But it makes scheduling much harder. The framework must decide:

- which waiting requests enter the active batch
- how much memory to reserve for each sequence
- how to balance prefill and decode
- how to prevent long requests from starving short requests
- how to handle prefix sharing and cache reuse
- how to meet latency targets while maximizing throughput

This is why inference frameworks are full systems projects, not just wrappers around `model.generate()`.

## What vLLM Is For

vLLM is a high-throughput LLM serving framework best known for PagedAttention and its OpenAI-compatible server.

Its core thesis is that LLM serving needs better memory management. The original vLLM paper frames the KV cache as a major bottleneck and introduces PagedAttention, which applies an idea similar to virtual memory paging to attention cache storage.

Instead of requiring each sequence's KV cache to occupy one large contiguous memory region, vLLM divides KV cache into blocks. This lets the server allocate memory more flexibly, reduce fragmentation, and serve more concurrent sequences.

The result is a system that is especially attractive when you want:

- a drop-in OpenAI-compatible server for open-weight models
- strong throughput under many concurrent requests
- good support for popular Hugging Face models
- tensor parallel serving across multiple GPUs
- production-ish deployment with a large community
- features such as prefix caching, quantization, LoRA serving, speculative decoding, and structured outputs where supported

The vLLM mental model is:

> Make LLM serving look more like efficient memory-managed systems software, then expose it through familiar APIs.

### Where vLLM Feels Natural

vLLM is often the first tool people try when they want to self-host an open model behind an OpenAI-style API. It is practical, widely adopted, and optimized for serving many requests efficiently.

Typical uses:

- internal chat completions service
- batch generation service
- RAG backend
- coding assistant backend
- evaluation harness generation
- synthetic data generation
- local replacement for a hosted API during development

vLLM is also a good teaching tool because it makes the serving problem visible: KV cache paging, request scheduling, model parallelism, and API compatibility all show up in one place.

## What SGLang Is For

SGLang is both a serving runtime and a programming system for structured LLM applications.

That dual identity is important. Many people compare SGLang and vLLM only as inference servers, but SGLang's original pitch is broader: it provides a frontend language for expressing LLM programs and a backend runtime for executing them efficiently.

The SGLang paper emphasizes workloads with:

- multiple LLM calls
- branching control flow
- tool or function-like calls
- constrained or structured generation
- repeated prefixes
- agentic or reasoning-style pipelines
- multi-turn programs where cache reuse matters

SGLang's backend is known for RadixAttention, a prefix-aware KV cache reuse mechanism. The intuition is that many LLM programs reuse the same prefixes. For example, a system prompt, few-shot examples, retrieved context, or previous conversation prefix may be shared across many branches or calls. If the runtime can recognize and reuse those cached prefixes, it can avoid repeated prefill work.

The SGLang mental model is:

> Treat LLM applications as programs with reusable structure, then make the runtime exploit that structure.

### Where SGLang Feels Natural

SGLang is especially interesting when your workload is not just "one independent prompt in, one completion out."

Typical uses:

- agent workloads with repeated system prompts and branching
- structured generation and constrained decoding
- multi-call reasoning pipelines
- RL/post-training rollout generation
- high-throughput serving where prefix cache reuse matters
- model serving with OpenAI-compatible endpoints
- experiments where you want tight control over the generation program

SGLang's current docs also include material specifically for RL systems. That matters because modern post-training often needs huge volumes of sampled rollouts. In that setting, inference throughput is not just product serving infrastructure; it is part of the training pipeline.

## SGLang vs vLLM

Here is the clean comparison.

| Question | vLLM | SGLang |
|---|---|---|
| Core identity | High-throughput LLM serving engine | LLM serving runtime plus structured LLM programming system |
| Signature idea | PagedAttention for KV cache memory management | RadixAttention for prefix-aware KV cache reuse |
| API story | Strong OpenAI-compatible server and broad serving workflow | OpenAI-compatible serving plus SGLang frontend/programming interface |
| Best mental model | Efficient memory-managed model server | Efficient runtime for repeated, structured LLM programs |
| Natural workload | Many independent chat/completion requests | Agentic, branching, structured, or prefix-reusing workloads |
| Why teams try it | Throughput, easy serving, broad model support, community | Prefix reuse, structured generation, RL rollouts, fast agent/program execution |
| Main operational question | Can it serve my model fast and reliably under my traffic? | Can it exploit my workload structure better than a generic server? |

This does not mean vLLM cannot serve structured workloads, and it does not mean SGLang is only for exotic agents. Both projects move quickly and borrow ideas from the same research ecosystem. The difference is emphasis.

vLLM became famous for making open-model serving efficient and accessible. SGLang became famous for connecting a higher-level LLM programming model to a runtime that can optimize the repeated structure inside those programs.

### A Simple Example

Suppose you are building a normal internal chat API:

```text
user prompt -> model -> answer
```

vLLM is a very natural default. You want throughput, OpenAI-compatible endpoints, and a serving stack that many people know how to operate.

Now suppose you are running an agent that tests five reasoning branches, reuses the same long system prompt, samples multiple candidates, verifies them, and then asks the model to synthesize a final answer:

```text
shared prefix
  -> branch A -> verify
  -> branch B -> verify
  -> branch C -> verify
  -> branch D -> verify
  -> branch E -> verify
final synthesis
```

SGLang's prefix-aware and program-oriented design becomes more compelling because the workload has reusable structure.

## Other Frameworks In The Same Neighborhood

SGLang and vLLM are two important points in a larger serving landscape.

### TensorRT-LLM

TensorRT-LLM is NVIDIA's optimized LLM inference stack. It is especially relevant when you are targeting NVIDIA GPUs and care about squeezing performance out of kernels, quantization, model parallel execution, and deployment through NVIDIA's runtime ecosystem.

Use the mental model:

> TensorRT-LLM is the "optimize hard for NVIDIA deployment" path.

It can be more complex than a quick vLLM-style server setup, but it is attractive for teams with serious production GPU infrastructure and performance engineering capacity.

### Hugging Face Text Generation Inference

Text Generation Inference, usually TGI, is Hugging Face's production-oriented serving system for text generation models. It is tightly connected to the Hugging Face model ecosystem and deployment story.

Use the mental model:

> TGI is the "serve Hugging Face models in a production HF-native way" path.

It is especially natural if your workflow is already built around Hugging Face Hub, containers, and HF deployment conventions.

### llama.cpp

llama.cpp is the local and edge inference workhorse. It is famous for GGUF model files, CPU-friendly inference, quantized local models, and broad hardware support. It is less about huge multi-GPU production serving and more about making models run on laptops, desktops, local servers, and edge-ish machines.

Use the mental model:

> llama.cpp is the "make open models run locally almost anywhere" path.

This is why it shows up in desktop apps, local assistants, privacy-sensitive prototypes, small servers, and experiments where avoiding heavyweight GPU infrastructure matters.

### Ollama

Ollama is a higher-level local model runner and developer experience. It wraps local model management and serving behind a simple interface. Under the hood, it belongs closer to the local inference ecosystem than to hyperscale serving engines.

Use the mental model:

> Ollama is the "easy local model UX" path.

It is convenient when you want to pull a model and talk to it locally without becoming an inference systems engineer first.

## Why People Actually Use These Systems

People use inference frameworks for five very concrete reasons.

### 1. Cost

If you can serve more tokens per GPU per second, your cost per token drops. For companies with heavy generation workloads, small serving improvements can translate into large infrastructure savings.

### 2. Latency

Users feel latency. Agents also feel latency because every model call can sit on the critical path of a multi-step workflow. Faster prefill, smoother decoding, and better batching can make an application feel alive instead of sluggish.

### 3. Throughput

Evaluation, synthetic data, RL rollouts, batch summarization, and offline generation often care about total tokens per hour more than one user's latency. Inference frameworks let teams keep accelerators saturated.

### 4. Control

Self-hosting gives teams control over models, prompts, logs, privacy, deployments, customization, adapters, and cost structure. It also lets them run models that hosted APIs do not expose.

### 5. Workload Fit

Different workloads have different shapes. A customer-support chatbot, a code-generation batch job, a tree-search reasoning system, a long-context RAG service, and an RL rollout generator do not stress the server the same way. The right framework depends on the shape of the work.

## How To Choose A Framework

A practical choice tree:

| You want... | Start by considering... | Why |
|---|---|---|
| Easy high-throughput OpenAI-compatible serving for open models | vLLM | Strong default for many self-hosted serving workloads |
| Structured LLM programs, prefix reuse, agentic branching, RL rollouts | SGLang | Runtime is designed around reusable program structure |
| Maximum NVIDIA-optimized production performance | TensorRT-LLM | Deep NVIDIA stack integration and optimized execution |
| Hugging Face-native production serving | TGI | Fits HF model/deployment ecosystem |
| Local laptop/desktop inference | llama.cpp or Ollama | Simple local running, quantized models, broad hardware access |
| A hosted API with minimal ops | OpenAI, Anthropic, Google, etc. | You avoid managing serving infrastructure entirely |

The best first question is not "which framework is fastest?" It is:

> What is the shape of my workload?

Ask:

- How many concurrent users?
- How long are prompts?
- How long are outputs?
- Is traffic online and latency-sensitive, offline and throughput-sensitive, or both?
- Do requests share prefixes?
- Do I need structured outputs or constrained decoding?
- Do I need LoRA/adapters?
- Do I need multimodal support?
- Am I serving one model or many?
- Am I running on one GPU, many GPUs, CPUs, or mixed hardware?
- Is this for product traffic, evaluation, synthetic data, or RL?

Once you answer those, the framework comparison gets much less mystical.

## What Benchmarks Usually Miss

Inference benchmarks are useful, but they can mislead.

The same framework can look different depending on:

- prompt length distribution
- output length distribution
- batch size and concurrency
- model architecture
- context length
- quantization format
- GPU type and interconnect
- whether prefix caching helps
- whether streaming latency or total throughput matters
- whether the workload includes multimodal inputs
- scheduler settings
- warmup state

This is why "framework X is faster than framework Y" is rarely a complete sentence. A better sentence is:

> On this model, hardware, prompt/output distribution, concurrency level, and latency target, framework X gives better throughput or tail latency.

That sounds less dramatic, but it is the sentence you can actually trust.

## Common Confusions

### "Is vLLM a model?"

No. vLLM serves models. You might run Llama, Qwen, Mistral, DeepSeek, or another supported model through vLLM.

### "Is SGLang just another OpenAI-compatible server?"

No. It can expose OpenAI-compatible APIs, but its deeper identity is a structured LLM programming and runtime system.

### "Do these frameworks make the model smarter?"

Usually no. They make the model faster, cheaper, easier to serve, or easier to use in complex workflows. They can enable smarter applications by making more samples, branches, verifiers, or tool loops affordable, but they do not magically improve the weights.

### "Why not just use Hugging Face Transformers?"

Transformers is great for model loading, experimentation, and research code. Production serving needs scheduling, batching, memory management, streaming APIs, metrics, and distributed execution. Inference frameworks build that serving layer around the model.

### "Why not just use a hosted API?"

Hosted APIs are often the best default if you want quality, reliability, and no infrastructure work. Self-hosted inference frameworks become attractive when you need open weights, privacy, custom deployment, lower marginal cost at scale, unusual sampling, adapters, or very high-volume offline generation.

### "Is OpenAI compatibility enough to make switching easy?"

It helps, but it is not the whole story. Different servers vary in supported parameters, tool calling, structured outputs, streaming details, tokenizer behavior, chat templates, error semantics, and performance under load.

### "Can I compare frameworks by peak tokens per second?"

Only as a first pass. Tail latency, time-to-first-token, throughput at a latency target, memory headroom, crash behavior, model support, and operational complexity matter just as much.

## Quick Check

1. Why is decode harder to parallelize for a single request than prefill?
2. What is stored in the KV cache, and why does it grow with context length?
3. Why does continuous batching improve throughput over static batching?
4. What is the main intuition behind vLLM's PagedAttention?
5. What kind of workload makes SGLang's prefix-aware design especially useful?
6. When would TensorRT-LLM be more attractive than a simpler serving stack?
7. Why is "which framework is fastest?" an incomplete question?

## One-Minute Summary

SGLang, vLLM, TensorRT-LLM, TGI, llama.cpp, and similar systems are inference frameworks: they make LLMs run efficiently outside a toy notebook. Their core job is to manage batching, scheduling, memory, KV cache, hardware execution, and API serving. vLLM is a strong default for high-throughput open-model serving and is famous for PagedAttention. SGLang is especially compelling for structured LLM programs, prefix reuse, agentic branching, and RL-style rollout workloads, with RadixAttention as a signature idea. TensorRT-LLM is the NVIDIA-optimized production path, TGI is Hugging Face-native serving, and llama.cpp/Ollama are local inference workhorses. The right choice depends less on a universal leaderboard and more on workload shape: prompt lengths, output lengths, concurrency, cache reuse, latency targets, hardware, and operational tolerance.
