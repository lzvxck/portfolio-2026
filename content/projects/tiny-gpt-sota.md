---
type: project
name: Tiny GPT SOTA
status: archived
year: 2024
tech: [Python, PyTorch, Hugging Face, CUDA]
github: github.com/lzvxck/tiny-gpt-sota
---

A language model trained from scratch on a single consumer GPU. The goal was to implement a production-quality GPT architecture — not a tutorial toy — with modern techniques including grouped-query attention (GQA) and FlashAttention-2, while keeping the training pipeline runnable on commodity hardware.

A companion repository (`gpt-sota-opt`) extends the base implementation with further optimizations: KV cache management, precision-aware training, and memory efficiency improvements. A third related project (`turboquant-implementation`) explores KV cache compression using custom Triton kernels, implementing quantization-aware cache management at the CUDA level.

This work was driven by wanting to understand the full stack from raw matrix operations to a working language model — not just fine-tuning existing checkpoints but building and training from the weight initialization forward. It informs how Lionel reasons about model architecture trade-offs, inference cost, and optimization opportunities when integrating LLMs into production systems.
