"""
KV Cache Exercise (Single-Head Self-Attention)

Goal:
Implement KV-caching for autoregressive decoding and verify that it matches
the non-cached causal attention outputs.

How to use:
1) Fill in all TODO sections (search for "TODO").
2) Run this file (optional): `python kv_cache_exercise.py`
3) Share your filled code and I can review it.

Notes:
- This is intentionally tiny and uses PyTorch only.
- Batch size = 1 for clarity.
- Shapes use [time, dim] or [dim].
"""

from __future__ import annotations

from dataclasses import dataclass
import math
import torch


torch.set_printoptions(sci_mode=False, precision=4)


def softmax(x: torch.Tensor, dim: int = -1) -> torch.Tensor:
    """Numerically stable softmax."""
    return torch.softmax(x, dim=dim)


@dataclass
class KVCache:
    """Stores keys/values for all previously generated tokens."""

    keys: torch.Tensor  # shape: [t, d_head]    (normally this is B, n_h, t, d_head), but we're abstracting away b and n_h i guess
    values: torch.Tensor  # shape: [t, d_head]





class TinyAttention:
    """
    Single-head self-attention:
      q_t = x_t @ W_q # (t, d_model) @ (d_model, d_head) --> (t, d_head)
      k_t = x_t @ W_k # (t, d_model) @ (d_model, d_head) --> (t, d_head)
      v_t = x_t @ W_v # (t, d_model) @ (d_model, d_head) --> (t, d_head)
      attn_t = softmax((q_t K^T) / sqrt(d_head)) # (t, d_head) @ (d_head, t) --> (t, t)
      out_t = attn_t V # (t, t) (t, d_head) --> (t, d_head)
    """

    def __init__(
        self,
        d_model: int,
        d_head: int,
        dtype: torch.dtype = torch.float64,
        device: torch.device | str = "cpu",
    ):
        self.d_model = d_model
        self.d_head = d_head
        self.dtype = dtype
        self.device = torch.device(device)

        torch.manual_seed(7)
        self.W_q = torch.randn(d_model, d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, d_head)
        self.W_k = torch.randn(d_model, d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, d_head)
        self.W_v = torch.randn(d_model, d_head, dtype=dtype, device=self.device) * 0.5 # (d_model, d_head)
        self.scale = math.sqrt(d_head)

    # --------------------------
    # Reference implementation
    # --------------------------
    def forward_full(self, x: torch.Tensor) -> torch.Tensor:
        """
        Full causal self-attention over entire sequence.
        x shape: [T, d_model]
        returns: [T, d_head]


        at each iteration of T, this loop is picking up a single query, doing attention for that query using all the previous keys and values... (why is it t+1?)
        """
        T, _ = x.shape
        q = x @ self.W_q  # [T, d_head]
        k = x @ self.W_k  # [T, d_head]
        v = x @ self.W_v  # [T, d_head]

        outputs = []
        for t in range(T):
            q_t = q[t]  # [d_head] # picking up the current query
            k_prefix = k[: t + 1]  # [t, d_head]
            v_prefix = v[: t + 1]  # [t, d_head]

            # why is this t + 1???

            scores = (q_t @ k_prefix.T) / self.scale  # (d_head) @ (d_head, t) --> [t] (is this right?)
            probs = softmax(scores, dim=-1)  # [t+1]
            out_t = probs @ v_prefix  # [d_head]
            outputs.append(out_t)
        return torch.stack(outputs, dim=0) # outputs will be of shape (T, d_head) at the end...



    # --------------------------
    # Exercise: KV-cache path
    # --------------------------
    def init_cache(self) -> KVCache:
        """
        TODO 1:
        Return an empty KVCache with 0 time steps.
        keys shape should be [0, d_head], values shape should be [0, d_head].
        """
        keys = torch.zeros(0, self.d_head, dtype=self.dtype, device=self.device)
        values = torch.zeros(0, self.d_head, dtype=self.dtype, device=self.device)
        return  KVCache(keys=keys, values=values)
        # Replace with your code
        # raise NotImplementedError("TODO 1: implement init_cache")


    def project_qkv(
        self, x_t: torch.Tensor
    ) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        TODO 2:
        Compute q_t, k_t, v_t from x_t for a single token.
        x_t shape: [d_model]
        return each as shape: [d_head]
        """
        q_t = x_t @ self.W_q # (d_model) @ (d_model, d_head) --> (d_head)
        k_t = x_t  @ self.W_k # (d_model) @ (d_model, d_head) --> (d_head)
        v_t = x_t @ self.W_v # (d_model) @ (d_model, d_head) --> (d_head)

        return q_t, k_t, v_t
        # Replace with your code
        # raise NotImplementedError("TODO 2: implement project_qkv")


    def append_cache(
        self, cache: KVCache, k_t: torch.Tensor, v_t: torch.Tensor
    ) -> KVCache:
        """
        TODO 3:
        Append k_t and v_t to cache along time dimension.
        Return a *new* KVCache (don't mutate in place).
        """
        # k_t dim: (d_head)
        # v_t dim: (d_head)
        # cache.keys() dim: (t, d_head)
        # cache.values() dim: (t, d_head)

        # Replace with your code
        new_keys = torch.cat([cache.keys, k_t[None, :]], dim=0) # (t+1, d_head) (increase cache size by one timestep)
        new_values = torch.cat([cache.values, v_t[None, :]], dim=0) # (t+1, d_head) (increase cache size by one timestep)
        return KVCache(keys=new_keys, values=new_values)


    def attend_with_cache(self, q_t: torch.Tensor, cache: KVCache) -> torch.Tensor:
        """
        TODO 4:
        Compute attention output for current token using only cache keys/values.
        q_t shape: [d_head]
        cache.keys shape: [t, d_head], cache.values shape: [t, d_head]
        return out_t shape: [d_head]
        """

        scores = (q_t @ cache.keys.T) / self.scale #  (d_head) @ (d_head, t) --> (t)
        probs = softmax(scores, dim=-1)  # [t+1]
        out = probs @ cache.values # (t) @ (t, d_head) --> (d_head)
        return out

        # # Replace with your code
        # raise NotImplementedError("TODO 4: implement attend_with_cache")


    def decode_step(
        self, x_t: torch.Tensor, cache: KVCache
    ) -> tuple[torch.Tensor, KVCache]:
        """
        TODO 5:
        One autoregressive decoding step:
        1) project q/k/v for x_t
        2) append k,v to cache
        3) compute output for current token using updated cache
        4) return (out_t, new_cache)
        """

        q_t, k_t, v_t = self.project_qkv(x_t)
        new_cache = self.append_cache(cache, k_t, v_t)
        out_t = self.attend_with_cache(q_t, new_cache)
        return (out_t, new_cache)
        # Replace with your code
        # raise NotImplementedError("TODO 5: implement decode_step")


    def decode_sequence_with_cache(self, x: torch.Tensor) -> torch.Tensor:
        """
        TODO 6:
        Decode an entire sequence token-by-token with decode_step.
        x shape: [T, d_model]
        return outputs shape: [T, d_head]
        """
        cache = self.init_cache()
        T, _ = x.shape
        out_arr = []

        for t in range(T):
            x_t = x[t]
            out_t, new_cache = self.decode_step(x_t, cache)
            out_arr.append(out_t)
            cache = new_cache

        outputs = torch.stack(out_arr, dim=0) # (T, d_head)
        return outputs

        # # Replace with your code
        # raise NotImplementedError("TODO 6: implement decode_sequence_with_cache")


def make_toy_input(
    T: int = 6,
    d_model: int = 8,
    dtype: torch.dtype = torch.float64,
    device: torch.device | str = "cpu",
) -> torch.Tensor:
    torch.manual_seed(11)
    return torch.randn(T, d_model, dtype=dtype, device=device)


def check_correctness() -> None:
    d_model = 8
    d_head = 8
    dtype = torch.float64
    device = "cpu"

    x = make_toy_input(T=6, d_model=d_model, dtype=dtype, device=device)
    attn = TinyAttention(d_model=d_model, d_head=d_head, dtype=dtype, device=device)

    full_out = attn.forward_full(x)
    cached_out = attn.decode_sequence_with_cache(x)
    max_diff = (full_out - cached_out).abs().max().item()

    print("max abs diff:", max_diff)
    print("full_out:\n", full_out)
    print("cached_out:\n", cached_out)

    # If your implementation is correct, this should pass.
    torch.testing.assert_close(full_out, cached_out, atol=1e-8, rtol=1e-6)
    print("PASS: cached decoding matches full causal attention.")


if __name__ == "__main__":
    check_correctness()
