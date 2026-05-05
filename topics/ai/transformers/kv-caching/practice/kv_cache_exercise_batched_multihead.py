"""
KV Cache Exercise: Batched Multi-Head Self-Attention (PyTorch)

Goal:
Implement KV-caching for autoregressive decoding with cache shape [B, H, T, D],
and verify that it matches a full causal forward pass.

How to use:
1) Fill in all TODO sections (search for "TODO").
2) (Optional) run: `python kv_cache_exercise_batched_multihead.py`
3) Ask me to review your implementation.

Conventions:
- B = batch size
- T = sequence length
- H = number of heads
- D = head dimension
- d_model = H * D (kept equal in this exercise for simple head merge)
"""

from __future__ import annotations

from dataclasses import dataclass
import math
import torch


torch.set_printoptions(sci_mode=False, precision=4)


def softmax(x: torch.Tensor, dim: int = -1) -> torch.Tensor:
    return torch.softmax(x, dim=dim)


@dataclass
class KVCache:
    """Stores past keys/values for decode, shape [B, H, t, D]."""

    keys: torch.Tensor
    values: torch.Tensor


class TinyMultiHeadAttention:
    """
    Tiny MHA block (no output projection):
      q = x @ W_q
      k = x @ W_k
      v = x @ W_v
      reshape to heads
      causal attention per token
      concat heads back to [B, d_model]
    """

    def __init__(
        self,
        d_model: int,
        n_heads: int,
        d_head: int,
        dtype: torch.dtype = torch.float64,
        device: torch.device | str = "cpu",
    ):
        if n_heads * d_head != d_model:
            raise ValueError("For this exercise, require n_heads * d_head == d_model")

        self.d_model = d_model
        self.n_heads = n_heads
        self.d_head = d_head
        self.dtype = dtype
        self.device = torch.device(device)
        self.scale = math.sqrt(d_head)

        torch.manual_seed(17)
        self.W_q = torch.randn(d_model, n_heads * d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, n_head * d_head) (in regular transformers, the two sides are equal)
        self.W_k = torch.randn(d_model, n_heads * d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, n_head * d_head) (in regular transformers, the two sides are equal)
        self.W_v = torch.randn(d_model, n_heads * d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, n_head * d_head) (in regular transformers, the two sides are equal)

    # --------------------------
    # Helpers
    # --------------------------
    def _to_heads(self, x: torch.Tensor) -> torch.Tensor:
        """
        x: [B, T, H*D] -> [B, H, T, D] # go from 
        """
        B, T, _ = x.shape
        return x.view(B, T, self.n_heads, self.d_head).permute(0, 2, 1, 3).contiguous()

    def _merge_heads(self, x: torch.Tensor) -> torch.Tensor:
        """
        x: [B, H, D] -> [B, H*D]
        """
        B, H, D = x.shape
        return x.reshape(B, H * D)

    # --------------------------
    # Reference implementation
    # --------------------------
    def forward_full(self, x: torch.Tensor) -> torch.Tensor:
        """
        Full causal self-attention over whole sequence.
        x: [B, T, d_model]
        returns: [B, T, d_model]
        """
        B, T, _ = x.shape

        q = self._to_heads(x @ self.W_q)  # [B, H, T, D]
        k = self._to_heads(x @ self.W_k)  # [B, H, T, D]
        v = self._to_heads(x @ self.W_v)  # [B, H, T, D]

        outputs = []
        for t in range(T):
            q_t = q[:, :, t, :]           # [B, H, D]
            k_prefix = k[:, :, : t + 1, :]  # [B, H, t+1, D]
            v_prefix = v[:, :, : t + 1, :]  # [B, H, t+1, D]

            # (B, H, D) @ (B, H, D, t+1) --> (B, H, t+1)
            # scores = q_t @ (k_prefix.transpose(2,3)) / self.scale
            scores = torch.einsum("bhd,bhtd->bht", q_t, k_prefix) / self.scale  # [B, H, t+1]
            probs = softmax(scores, dim=-1)  # [B, H, t+1]
            out_heads = torch.einsum("bht,bhtd->bhd", probs, v_prefix)  # [B, H, D]
            out_t = self._merge_heads(out_heads)  # [B, d_model]
            outputs.append(out_t)

        return torch.stack(outputs, dim=1)  # [B, T, d_model]

    # --------------------------
    # Exercise: KV-cache path
    # --------------------------
    def init_cache(self, batch_size: int) -> KVCache:
        """
        TODO 1:
        Return empty KV cache with shape [B, H, 0, D] for keys/values.
        """
        keys = torch.zeros(batch_size, self.n_heads, 0, self.d_head, device=self.device, dtype=self.dtype)
        values = torch.zeros(batch_size, self.n_heads, 0, self.d_head, device=self.device, dtype=self.dtype)
        return KVCache(keys=keys, values = values)
        # raise NotImplementedError("TODO 1: implement init_cache")

    def project_qkv(self, x_t: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        TODO 2:
        Compute q_t, k_t, v_t for one decode step.
        x_t: [B, d_model]
        return each as: [B, H, D]
        """
        q_t = x_t @ self.W_q # (B, d_model) @ (d_model, n_head * d_head) --> (B, n_head * d_head)
        k_t = x_t @ self.W_k # (B, d_model) @ (d_model, n_head * d_head) --> (B, n_head * d_head)
        v_t = x_t @ self.W_v # (B, d_model) @ (d_model, n_head * d_head) --> (B, n_head * d_head)

        q_t = self._to_heads(q_t[:, None, :]).squeeze(2)
        k_t = self._to_heads(k_t[:, None, :]).squeeze(2)
        v_t = self._to_heads(v_t[:, None, :]).squeeze(2)

        return q_t, k_t, v_t

        # raise NotImplementedError("TODO 2: implement project_qkv")


    def append_cache(self, cache: KVCache, k_t: torch.Tensor, v_t: torch.Tensor) -> KVCache:
        """
        TODO 3:
        Append current k_t, v_t to cache time dimension.
        cache.keys/cache.values: [B, H, t, D]
        k_t/v_t: [B, H, D]
        return new cache with [B, H, t+1, D]
        """
        # cache_dim: [B, H, t, D]

        new_keys = torch.cat([cache.keys, k_t[:, :, None, :]], dim=2)
        new_values = torch.cat([cache.values, v_t[:, :, None, :]], dim=2)
        return KVCache(keys = new_keys, values = new_values)



    def attend_with_cache(self, q_t: torch.Tensor, cache: KVCache) -> torch.Tensor:
        """
        TODO 4:
        Compute attention output for current token from cache.
        q_t: [B, H, D]
        cache.keys/cache.values: [B, H, t, D]
        return out_heads_t: [B, H, D]
        """
        # q_t = q_t[:, :, None, :] # (B, H, 1, D)
        k_t = cache.keys # (B, H, t, D)
        v_t = cache.values # (B, H, t, D)

        att_scores = torch.einsum('bhd,bhtd->bht', q_t, k_t) / self.scale
        att_scores = softmax(att_scores, dim=2) # (B,h,T)
        out = torch.einsum('bht,bhtd->bhd', att_scores, v_t)
        return out



    def decode_step(self, x_t: torch.Tensor, cache: KVCache) -> tuple[torch.Tensor, KVCache]:
        """
        TODO 5:
        One autoregressive decode step:
        1) q/k/v projection
        2) append k,v to cache
        3) attention using updated cache
        4) merge heads to [B, d_model]
        return (out_t, new_cache)
        """
        q_t, k_t, v_t = self.project_qkv(x_t)
        new_cache = self.append_cache(cache, k_t, v_t)
        output = self.attend_with_cache(q_t, new_cache) 
        output = self._merge_heads(output) # [B, d_model]
        return (output, new_cache)


    def decode_sequence_with_cache(self, x: torch.Tensor) -> torch.Tensor:
        """
        TODO 6:
        Decode full sequence token-by-token with cache.
        x: [B, T, d_model]
        return: [B, T, d_model]
        """
        B, T, _ = x.shape
        cache = self.init_cache(batch_size=B)
        outputs = []

        for t in range(T):
            output, new_cache = self.decode_step(x[:, t, :], cache)
            outputs.append(output)
            cache = new_cache
        return torch.stack(outputs, dim=1)


def make_toy_input(
    B: int = 2,
    T: int = 5,
    d_model: int = 12,
    dtype: torch.dtype = torch.float64,
    device: torch.device | str = "cpu",
) -> torch.Tensor:
    torch.manual_seed(23)
    return torch.randn(B, T, d_model, dtype=dtype, device=device)


def check_correctness() -> None:
    B, T = 2, 5
    n_heads, d_head = 3, 4
    d_model = n_heads * d_head
    dtype = torch.float64
    device = "cpu"

    x = make_toy_input(B=B, T=T, d_model=d_model, dtype=dtype, device=device)
    attn = TinyMultiHeadAttention(
        d_model=d_model,
        n_heads=n_heads,
        d_head=d_head,
        dtype=dtype,
        device=device,
    )

    full_out = attn.forward_full(x)
    cached_out = attn.decode_sequence_with_cache(x)

    max_diff = (full_out - cached_out).abs().max().item()
    print("max abs diff:", max_diff)
    print("full_out.shape:", tuple(full_out.shape))
    print("cached_out.shape:", tuple(cached_out.shape))

    torch.testing.assert_close(full_out, cached_out, atol=1e-8, rtol=1e-6)
    print("PASS: cached decode matches full causal forward.")


if __name__ == "__main__":
    check_correctness()

