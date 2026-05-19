# An Economic Framework for Generative Engines: Advertising or Subscription?

Source: `https://arxiv.org/abs/2603.29071v1`
PDF: `https://arxiv.org/pdf/2603.29071v1`
Local PDF reviewed: `/Users/saahithjanapati/Downloads/2603.29071v1.pdf`
Site: `arXiv`
Published: `2026-03-30`
Authors: `Luyang Zhang, Cathy Jiao, Beibei Li, Chenyan Xiong`
Subjects: `Game Theory (cs.GT)`
Extraction engine: `PyMuPDF full-text extraction + arXiv metadata lookup + manual structured normalization`
Strategy: `canonical PDF extraction and medium/full AI paper lesson normalization`

## Medium-Length Version

This paper studies a practical monetization question for generative search products: should a generative engine show ads inside synthesized answers, or should it keep the free experience ad-free in order to grow engagement and paid subscriptions?

The authors model the problem as a dynamic Stackelberg game between a generative engine and users. For each query from a non-subscribed user, the engine chooses either a with-ad response, `REad`, or an ad-free response, `REfree`. The user then decides whether to engage with the response or take an outside option, such as another generative engine. These choices update the user's state over time. Ad-free interactions increase an "AI experience" state that can raise retention and move the user toward subscription; ad exposure increases an ad-fatigue state that can reduce future engagement and retention. Once the user subscribes, they receive the paid ad-free experience and the engine earns subscription margin.

The core theoretical result is a cutoff rule. Showing ads is optimal only when the immediate ad payoff is large enough to dominate the discounted continuation value of showing an ad-free response. That continuation value comes from future retention, future engagement, and eventual subscription conversion. The paper decomposes the decision into a short-term monetization edge for ads and a long-term value edge for ad-free service.

The comparative statics are intuitive but useful. The optimal policy shifts toward ad-free responses when users are more ad-sensitive, when the query is likely to generate a valuable ad-free experience gain, when the engine is more forward-looking, when the user is near the subscription threshold, or when outside competition is stronger. It shifts toward with-ad responses when query-level ad revenue is high or paid-tier serving costs are high.

The simulation study reinforces the dynamic logic. Ad-heavy policies can earn more immediately, but they slow AI-experience accumulation, reduce active users, and suppress subscription growth. Always-ad-free maximizes retention and conversion but can be too costly. The dynamic-programming policy performs best because it treats ad-free responses as an investment that is valuable for the right users and queries, not as a blanket moral or product rule.

## Full-Length Version

## Why This Paper Exists

Generative engines change the economics of search. Traditional search engines monetize by sending users through ranked links and selling ads around those links. Generative engines answer directly. That can reduce publisher traffic and weaken the old ad-supported web model, but it also creates a monetization problem for the generative engine itself.

The engine has expensive inference costs. If it gives away synthesized answers for free, it needs a way to pay for them. Two obvious routes are:

- insert ads into generated responses and earn query-level advertising revenue,
- keep responses ad-free, improve user experience, and try to convert users to paid subscriptions.

The paper's central point is that this is not a static product choice. It is a repeated allocation problem. A with-ad answer may earn today, but it may also make the user less likely to return. An ad-free answer costs money today, but it may increase user trust, habit, retention, and eventual subscription demand.

## Model Setup

The model has a generative engine, users, and repeated query interactions.

For a non-subscribed user, each period proceeds as follows:

1. The user submits a query `q_t`.
2. The generative engine chooses a response format:
   - `REad`: a free response with advertising,
   - `REfree`: a free ad-free response.
3. The user either engages with the displayed response or takes an outside option.
4. The user's state updates. The state tracks accumulated AI experience, accumulated ad exposure, and subscription status.
5. The user may convert to paid subscription or remain in the pre-subscription population.

The user context `x` represents stable user traits such as preferences and usage patterns. The state variables evolve:

- `s`: accumulated AI experience from engaging with ad-free responses,
- `c`: accumulated ad exposure from engaging with with-ad responses,
- `z`: subscription indicator.

The paper treats subscription as absorbing in the main model: once a user subscribes, the engine receives a paid-tier margin and no longer chooses ads for that user. Appendices relax this with churn and probabilistic adoption, but the main insight does not depend on those variants.

## User Choice And State Dynamics

The user's within-query choice is modeled with a random-utility / discrete-choice formulation. The user compares the utility of engaging with the displayed generative response against the outside option. Outside options include rival generative engines and other ways of satisfying the information need.

Response format affects utility and future state:

- A with-ad response can produce immediate ad revenue but may increase ad exposure `c`.
- An ad-free response does not produce ad revenue but can increase AI experience `s`.
- Higher AI experience can improve future retention and make subscription more likely.
- Higher ad exposure can reduce future engagement and retention.

This is the mechanism that makes the decision dynamic. The engine is not choosing "ads or no ads" in isolation. It is choosing how today's response changes the state distribution of tomorrow's users.

## The Dynamic Program

The engine maximizes discounted expected payoff. For subscribed users, the value is the present value of subscription margin. For pre-subscribed users, the value depends on current state and future state transitions.

For a query `q` and pre-subscription state `(s, c, 0)`, the paper defines the action value for response type `a` as the immediate payoff plus discounted expected continuation value:

$$
Q_x^a(s,c,q)
= r_a(x,q)
+ \beta \mathbb{E}_{Y \sim \Pr(\cdot \mid x,q,a)}
\left[
\rho_x(S^+_{a,Y}, C^+_{a,Y}, Z^+_{a,Y})
V_x(S^+_{a,Y}, C^+_{a,Y}, Z^+_{a,Y})
\right].
$$

The engine compares `REad` and `REfree` by the edge:

$$
\Delta_x(s,c,q) = Q_x^{REad}(s,c,q) - Q_x^{REfree}(s,c,q).
$$

The optimal policy is:

$$
g_x^*(s,c,q) = REad \quad \text{if and only if} \quad \Delta_x(s,c,q) \ge 0.
$$

This is simple but important: the ad decision is not about whether ads are generally profitable. It is about whether the ad response wins after including the effect on future retention and conversion.

## Short-Term Versus Long-Term Decomposition

The paper decomposes `REad`'s edge into two pieces:

1. A short-term monetization edge: expected ad revenue from showing an ad and getting engagement.
2. A long-term value edge: the difference in discounted continuation value after the user's state changes.

In the authors' notation, the first term is the expected ad revenue:

$$
R(x,q)\Pr(Y=1 \mid x,q,REad).
$$

The second term compares future value after the `REad` state update with future value after the `REfree` state update. `REfree` may win this continuation comparison because it builds AI experience, raises retention, and accelerates subscription conversion.

The key lesson is that ads are most attractive when their current revenue is high and their future state damage is small. Ad-free responses are most attractive when they meaningfully increase the chance that the user stays, trusts the engine, and eventually subscribes.

## Threshold Structure Across Users And Queries

The paper then studies how the decision changes across user and query types. It introduces three type variables:

- `gamma`: user ad sensitivity,
- `r`: query-level ad profitability,
- `psi`: ad-free AI-experience gain from the query.

The optimal policy has a monotone threshold structure. Holding the state fixed:

- higher ad sensitivity pushes toward `REfree`,
- higher AI-experience gain pushes toward `REfree`,
- higher immediate ad revenue pushes toward `REad`.

Equivalently, for fixed user ad sensitivity and ad revenue, there is an experience-gain cutoff `psi*`: ads are optimal below the cutoff and ad-free service is optimal above it. For fixed ad sensitivity and experience gain, there is an ad-revenue cutoff `r*`: ads are justified only when immediate ad revenue is high enough.

This makes the result operational. A provider should not choose one global ad load for every user and query. The dynamic optimum is closer to a targeting rule: preserve the ad-free experience where the long-run relationship is valuable, and monetize more directly where the query is ad-profitable and the user is less sensitive.

## Inference Cost And Subscription Price

The model also studies AI economics near the subscription threshold. This is the region where one ad-free response can plausibly push the user into a paid state.

The comparative statics are:

- Higher free-tier inference cost can push the engine toward `REfree` near the threshold, because moving the user into paid subscription ends repeated free-tier serving.
- Higher paid-tier inference cost can push away from `REfree`, because subscription becomes less profitable.
- Higher subscription price can push toward `REfree` near the threshold, because conversion becomes more valuable.

The near-threshold qualification matters. Far from subscription, a higher subscription price can also raise the conversion threshold and make adoption harder. The paper's clean result applies where the ad-free action triggers immediate conversion.

## Outside Competition

Outside competition enters as an increase in the attractiveness of the user's outside option. This might happen if rival LLM products improve, offer cleaner ad-free experiences, or become more available.

The paper shows that stronger outside competition shifts the optimal policy toward `REfree`. There are two channels:

- The short-term ad-revenue edge shrinks because users are less likely to engage with ad-heavy responses when alternatives are good.
- The continuation value of retention becomes more important because users are harder to keep.

As competition intensifies, ads are justified only for more ad-profitable queries or cases with lower ad-free experience gains. This is one of the paper's sharper strategic claims: competition makes aggressive ad insertion less sustainable, even though competition also compresses overall payoffs.

## Simulations

The paper simulates a market with heterogeneous users over 20 periods. It compares four policies:

- `Optimal DP`: computed from the Bellman equation,
- `One-step greedy`: optimizes near-term payoff plus one-period value,
- `Always REad`: always shows ads,
- `Always REfree`: always shows ad-free responses.

The simulation tracks cumulative payoff, active users, subscriptions, and ad-free exposure rate.

The qualitative result is that the dynamic policy outperforms fixed extremes. `Always REad` can earn early revenue but erodes the user base and subscription pipeline. `Always REfree` builds strong retention and conversion but pays the highest short-term serving cost. The dynamic policy earns by allocating ad-free responses where they are an investment, while still showing ads when short-term monetization dominates.

The sensitivity analysis varies ad sensitivity, query profitability, inference cost, and outside-option strength. The dynamic policy remains robust across conditions. It shifts toward ad-free service for ad-sensitive users and low-profit queries, and toward ads when immediate ad revenue is high.

## What The Paper Contributes

The paper contributes three things:

- a dynamic model of ads versus subscription in generative engines,
- a cutoff characterization of the optimal response-format policy,
- simulation evidence showing why ad-heavy policies can underperform over time.

The useful framing is that ads and subscriptions are not independent revenue models. They interact through user state. Ads can cannibalize the future subscription base; ad-free answers can be a costly but productive investment in retention.

## Limitations And Caveats

- The empirical section is simulation-based, not estimated from real generative-engine logs.
- The model assumes specific state variables: AI experience and ad exposure. Real users may respond to many additional factors such as answer quality, privacy concerns, brand trust, UI design, and task criticality.
- Subscription is absorbing in the main text, though the appendix sketches churn extensions.
- The framework assumes the provider can estimate user/query types and transition primitives well enough to compute policies.
- The welfare analysis is secondary. The main policy maximizes provider payoff, not publisher welfare, user welfare, or web ecosystem health.
- The paper models ads as a response-format decision, but real ad systems include auction design, ad quality, relevance, labeling, regulation, and trust effects.

## Study Questions

- Why can an ad-free response be economically valuable even if it earns no immediate revenue?
- What state variables does the paper use to connect current response format to future user behavior?
- How does the value edge `Delta` decompose into short-term and long-term terms?
- Why does stronger outside competition push the optimal policy toward ad-free responses?
- Why do inference costs have different implications for free-tier and paid-tier service near the subscription threshold?
- What would the model need in order to be estimated on real generative-engine data?
