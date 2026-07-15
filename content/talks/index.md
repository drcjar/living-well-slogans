---
layout: base.njk
title: Talks
verdict: "What actually happened when the talk was given — what landed, what didn't, and what a school audience changed our minds about."
---

# Talks given

This is the workbench. The site is a set of claims; this is the record of what happened when those claims met a room of 15-year-olds. Each write-up captures the setting, what landed, what fell flat, the questions asked, and — most importantly — anything a student said that changed the content. Where it did, the change should be traceable to a commit.

A project about intellectual honesty should show its own peer review, so the outside responses gathered before the first talk are logged here too.

{% if collections.talks.length %}
<ul class="talk-list">
{% for talk in collections.talks %}
  <li>
    <a href="{{ talk.url }}">{{ talk.data.title }}</a>
    <div class="talk-meta">
      {{ talk.data.date | isoDate }}{% if talk.data.setting %} · {{ talk.data.setting }}{% endif %}{% if talk.data.year_group %} · {{ talk.data.year_group }}{% endif %}{% if talk.data.size %} · {{ talk.data.size }} students{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
{% else %}
<p><em>No talks written up yet.</em> The first one should not be given until at least two people outside this repo have said what is wrong with it — see <a href="{{ site.repo }}/blob/main/CONTRIBUTING.md">CONTRIBUTING</a>. Copy <code>content/talks/_template.md</code> to start a write-up.</p>
{% endif %}
