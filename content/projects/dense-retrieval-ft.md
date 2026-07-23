---
type: project
name: BGE-M3 LoRA Fine-Tune
status: production
year: 2026
tech: [Python, PyTorch, LoRA, BGE-M3, Hugging Face, FlagEmbedding]
github: github.com/lzvxck/dense-retrieval-ft
---

A LoRA fine-tune of BAAI's bge-m3 embedding model for domain-specific dense retrieval, trained on a single consumer GPU (12GB VRAM). Uses LoRA (r=16, alpha=32) targeting the query/key/value projections — 2.36M trainable parameters, 0.41% of the base model's 570M — trained for 3 epochs on 2,072 examples with 7 negatives per query, bf16 precision.

Published to the Hugging Face Hub as a merge-ready adapter. A sanity check comparing mean cosine-similarity margin between query-to-positive and query-to-negative pairs on a held-out validation set showed the fine-tune widened the margin over baseline bge-m3 — a weak-but-real positive signal, expected given the small dataset and short training run. A full retrieval benchmark (nDCG/Recall/MRR against baseline) requires building a BEIR-format test set, which the repo scaffolds but hasn't yet completed.

Along the way, patched a compatibility break in FlagEmbedding's trainer caused by transformers 5.x removing the `Trainer.tokenizer` attribute it still relied on.
