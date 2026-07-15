---
layout: base.njk
title: The organising argument
verdict: "Evidence-checked public-health slogans, and the evidence behind each one — with the design, the effect size, and the honest weakness."
---

# Living well, and who wrote the rules

<p class="lede">The slogans that changed population health are honest statements about a product or an environment. The slogans that failed put the burden on your willpower. This site shows its workings for both.</p>

Every claim here carries its **study design**, its **effect size**, and its **honest weakness**. Every number is tracked in [provenance](/provenance/) and marked either *verified against source* or *from recall — unverified*. This is a reference, not a campaign: no calls to action, no donate button. If it ever reads as a nice-looking set of assertions, it has failed and is indistinguishable from the industry material it critiques.

## The spine: worked vs failed

<div class="table-wrap">

| Worked | Failed / weak |
|---|---|
| Smoking kills | Just say no (DARE) |
| Back to sleep | Drink responsibly |
| Slip, slop, slap | When the fun stops, stop |
| Clunk click, every trip | 10,000 steps |

</div>

The first column describes the world. The second column describes *you*, and implies that if you are harmed it is because you failed. Notice who wrote each column: the left is public health; much of the right is the industry selling the product, or a marketing department. That authorship is marked with a coloured badge on every page — the argument made structurally, not rhetorically.

Living well is much less about being strong than about (a) knowing which products are engineered against you, and (b) arranging life so the good choice is the default choice.

## Two different clocks

An honest epidemiologist has to concede that the standard "living well" slogans are almost all about the **seventy-year clock**, not the **ten-year clock**. For a 14-year-old in England, the leading causes of death over the next decade are suicide and self-harm, injury (chiefly road), and cancer — not lung cancer, cirrhosis or ischaemic heart disease. Deaths in this age group are rare in absolute terms, but their distribution is not what the slogans address.

<figure class="two-clock">
  <svg viewBox="0 0 640 300" role="img" aria-labelledby="clock-title clock-desc">
    <title id="clock-title">The ten-year clock versus the seventy-year clock</title>
    <desc id="clock-desc">Two ranked lists side by side. The near-term risks for a teenager — nicotine initiation, acute alcohol harm, road injury, gambling, sleep and mood — barely overlap with the long-term risks by lifetime magnitude — smoking, physical inactivity, alcohol, diet, gambling, sun, sleep. Only smoking and, via melanoma, sun protection appear on both.</desc>

    <text x="20" y="28" class="clock-heading">Ten-year clock</text>
    <text x="20" y="46" class="clock-label">Acute, salient, actionable now</text>
    <text x="340" y="28" class="clock-heading">Seventy-year clock</text>
    <text x="340" y="46" class="clock-label">Lifetime magnitude &times; causal strength</text>

    <line x1="20" y1="58" x2="300" y2="58" class="clock-axis" />
    <line x1="340" y1="58" x2="620" y2="58" class="clock-axis" />

    <!-- Ten-year column -->
    <g>
      <rect x="20" y="72"  width="14" height="18" class="clock-bar-10" />
      <text x="42" y="86"  class="clock-label">1. Don&#39;t start nicotine</text>
      <rect x="20" y="100" width="14" height="18" class="clock-bar-10" />
      <text x="42" y="114" class="clock-label">2. Alcohol &amp; acute injury</text>
      <rect x="20" y="128" width="14" height="18" class="clock-bar-10" />
      <text x="42" y="142" class="clock-label">3. Road (belt, helmet)</text>
      <rect x="20" y="156" width="14" height="18" class="clock-bar-10" />
      <text x="42" y="170" class="clock-label">4. Gambling on a phone</text>
      <rect x="20" y="184" width="14" height="18" class="clock-bar-10" />
      <text x="42" y="198" class="clock-label">5. Sleep &amp; mood</text>
    </g>

    <!-- Seventy-year column -->
    <g>
      <rect x="340" y="72"  width="14" height="18" class="clock-bar-70" />
      <text x="362" y="86"  class="clock-label">1. Smoking</text>
      <rect x="340" y="100" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="114" class="clock-label">2. Physical inactivity</text>
      <rect x="340" y="128" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="142" class="clock-label">3. Alcohol</text>
      <rect x="340" y="156" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="170" class="clock-label">4. Diet / food environment</text>
      <rect x="340" y="184" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="198" class="clock-label">5. Gambling</text>
      <rect x="340" y="212" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="226" class="clock-label">6. Sun protection</text>
      <rect x="340" y="240" width="14" height="18" class="clock-bar-70" />
      <text x="362" y="254" class="clock-label">7. Sleep</text>
    </g>

    <text x="20" y="284" class="clock-label">The two lists barely overlap. Only smoking sits near the top of both;</text>
    <text x="20" y="298" class="clock-label">sun protection joins them because melanoma is common in 15&ndash;34s.</text>
  </svg>
  <figcaption>The most counterintuitive thing on this site: the risks that will actually kill a teenager this decade are almost a different list from the ones the slogans are about. The talk should say so out loud.</figcaption>
</figure>

## The slogans, and who wrote them

<ul class="slogan-index">
{% for s in collections.slogans %}
  <li>
    <a href="{{ s.url }}" data-author="{{ s.data.authored_by }}">
      <span class="s-title">{{ s.data.slogan }}</span>
      <span class="s-author">{{ labels.authored_by[s.data.authored_by] }}</span>
    </a>
  </li>
{% endfor %}
</ul>

## The talk

This site is also a talk kit. The same content builds a slide deck — a 20-minute
selection, not the whole thing: [**view the deck**](/deck.html) (or the
[printable PDF](/deck.pdf)). What happened when it was given is written up under
[talks](/talks/).

## The final slogan set

> **Smoking kills — stopping helps.**
> **Alcohol: no safe dose.**
> **Gambling: designed so you lose.**
> **Move more, sit less.**
> **Eat food. Mostly plants. Not too much.**
> **Sleep like it matters.**
> **Slip, slop, slap.**
> **And: anyone who tells you to enjoy their product "responsibly" is telling you whose fault it will be.**

---

*Prepared July 2026. See [how this was made and how to contribute](https://github.com/drcjar/living-well-slogans). Effect sizes are given with the design that generated them, and with the honest weaknesses.*
