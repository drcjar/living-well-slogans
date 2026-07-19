---
layout: base.njk
title: How are we to live?
verdict: "Evidence-based pointers on living well — each one linked to the study design, the effect size, and the honest weakness behind it."
---

# How are we to live?

<p class="lede">Evidence-based pointers on living well. If you don't care what happens next, or whether your beliefs are true, you'll not find anything useful here.</p>

<ul class="slogan-index" id="pointers">
{% for s in collections.slogans %}
  <li>
    <a href="{{ s.url }}">
      <span class="s-title">{{ s.data.slogan }}</span>
    </a>
  </li>
{% endfor %}
</ul>

---

*Prepared July 2026. See [how this was made and how to contribute](https://github.com/drcjar/living-well-slogans). Effect sizes are given with the design that generated them, and with the honest weaknesses.*
