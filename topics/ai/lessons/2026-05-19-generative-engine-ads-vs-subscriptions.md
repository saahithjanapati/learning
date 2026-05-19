# Generative Engine Monetization: Ads, Subscriptions, and the Value of Keeping Users

Source note: Luyang Zhang, Cathy Jiao, Beibei Li, and Chenyan Xiong, "An Economic Framework for Generative Engines: Advertising or Subscription?" arXiv:2603.29071v1, published March 30, 2026. Source page: [arxiv.org/abs/2603.29071v1](https://arxiv.org/abs/2603.29071v1). Processed source: [materials/processed/ai/an-economic-framework-for-generative-engines-advertising-or-subscription.md](../../../materials/processed/ai/an-economic-framework-for-generative-engines-advertising-or-subscription.md).

Original sources: [arXiv abstract](https://arxiv.org/abs/2603.29071v1), [arXiv PDF](https://arxiv.org/pdf/2603.29071v1).

## Table of Contents

- [Medium-Length Version](#medium-length-version)
- [Full-Length Version](#full-length-version)
- [The Product Problem](#the-product-problem)
- [The State Variables](#the-state-variables)
- [The Cutoff Rule](#the-cutoff-rule)
- [Why Competition Makes Ads Harder](#why-competition-makes-ads-harder)
- [How To Read The Simulations](#how-to-read-the-simulations)
- [Memory Checklist](#memory-checklist)

## Medium-Length Version

This paper asks a clean question: for a free generative search product, when should the answer include ads, and when should the product stay ad-free to build a future subscription business?

The answer is not "ads are good" or "ads are bad." The paper models the decision as a dynamic user-state problem. A with-ad response can earn revenue immediately, but it may increase ad fatigue and reduce future retention. An ad-free response costs the provider money now, but it can build the user's AI experience, make the product more habit-forming, and move the user toward paid subscription.

The main result is a cutoff rule. Show ads only when the immediate ad payoff exceeds the discounted future value of preserving or improving the user's relationship with the product. That future value includes retention and subscription conversion.

The strongest intuition is that the same query can deserve different monetization depending on the user and market. If the user is ad-sensitive, the query is likely to create a useful ad-free experience, or competitors are easy to switch to, then ad-free service becomes more attractive. If the query is highly ad-profitable and the user is not very sensitive to ads, showing ads becomes more attractive.

The simulations make the point concrete. Always showing ads can look good early, but it damages long-term active-user and subscription growth. Always staying ad-free builds the subscription base but can be too expensive. The dynamic policy wins by treating ad-free responses as targeted investments.

## Full-Length Version

## The Product Problem

Generative engines are search-like products that answer directly. That makes monetization awkward.

Traditional search can place ads around links. The user still clicks out to websites, and the economic system is built around traffic. A generative engine can satisfy the user without sending them anywhere. That changes publisher economics, but it also forces the engine provider to decide how to pay for inference.

There are two obvious monetization paths:

- put ads inside or near generated answers,
- keep the free product clean and convert users into paid subscribers.

The paper's insight is that these are not independent choices. If ads make the product worse, they can hurt the future subscription business. If ad-free answers create habit and trust, they can be a real investment even though they earn nothing in the current query.

## The State Variables

The model tracks a user over repeated queries. Each non-subscribed user has:

- `s`: AI experience, built by engaging with ad-free responses,
- `c`: ad exposure, built by engaging with with-ad responses,
- `z`: subscription status.

The engine chooses between:

- `REad`: a free response with ads,
- `REfree`: a free ad-free response,
- `REpaid`: the paid ad-free experience after subscription.

The user can engage or take an outside option. That outside option matters because a user who dislikes the current product can switch to another generative engine.

The dynamic mechanism is:

- `REad` can earn now, but it may raise ad exposure and weaken future engagement.
- `REfree` costs now, but it may raise AI experience and improve retention.
- More AI experience can push the user over a subscription threshold.

So the real object is not just current revenue. It is the value of the user's future path.

## The Cutoff Rule

The paper defines the action value of showing each response type. The engine compares:

$$
\Delta = Q^{REad} - Q^{REfree}.
$$

If `Delta >= 0`, ads win. If `Delta < 0`, the ad-free response wins.

That value difference has two parts:

- short-term ad revenue,
- long-term continuation value from retention and subscription.

This gives the core decision rule:

**Show ads only when the immediate ad revenue is worth more than the long-term user value you lose by not giving the ad-free experience.**

The rule becomes a threshold across users and queries. Ad-free responses are favored when:

- the user is more sensitive to ads,
- the query is likely to create a strong product experience,
- the user is close to subscribing,
- the provider is more patient and values future revenue,
- rivals are strong enough that users can easily leave.

Ads are favored when:

- the query has high ad revenue,
- the user is relatively ad-tolerant,
- ad-free experience gains are low,
- paid-tier serving costs make subscription less attractive.

## Why Competition Makes Ads Harder

One of the most useful results is the competition result. Stronger outside options shift the optimal policy toward ad-free responses.

At first that might sound odd. If competition lowers profits, maybe the engine should monetize harder while it can. The model says that logic is myopic. When users can easily switch, ad-heavy responses become more dangerous:

- fewer users engage with ad-loaded answers,
- retention becomes harder,
- the future value of keeping the user rises.

So competition narrows the set of cases where ads are justified. The engine needs higher immediate ad revenue before it is worth risking the relationship.

## How To Read The Simulations

The simulation compares four policies:

- dynamic programming optimum,
- one-step greedy,
- always ads,
- always ad-free.

The story is not that one fixed policy dominates everywhere. The story is that fixed policies miss state.

Always-ads earns immediate revenue but damages the future user base. Always-ad-free builds users and subscribers but can overpay for retention. One-step greedy notices some short-term continuation value but still underweights long-horizon effects. The dynamic policy changes behavior by user state and market condition.

This is the practical takeaway: the monetization decision should look like lifecycle management, not like a global ad-load toggle.

## Memory Checklist

- Generative-engine monetization is dynamic because today's response changes tomorrow's user.
- `REad` earns immediate ad revenue but can raise ad exposure.
- `REfree` costs money now but can build AI experience and subscription demand.
- The optimal policy compares ad revenue against discounted retention and conversion value.
- More ad sensitivity, more competition, and higher experience gain push toward ad-free service.
- Higher query ad profitability pushes toward ads.
- The best policy is targeted and state-dependent, not always-ads or always-ad-free.
