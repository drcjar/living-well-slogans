# Claude Code brief: `living-well-slogans` — evidence site + talk kit

**Owner:** Carl Reynolds
**Collaborator:** [name], 15 — co-author, not a mascot. See §8.
**Status:** new repo, nothing built yet.
**Source content:** `slogans_evidence_pack.md` (drop it in `content/` before starting).

---

## 1. Objective

A small, fast, static website that hosts an evidence-checked set of public health slogans and the evidence behind each one, published from a GitHub repo via GitHub Pages. It has three jobs, in priority order:

1. **Be right.** Every claim carries its study design, its effect size, and its weakness. The site's credibility is the whole product. If it becomes a nice-looking set of assertions, it has failed and is indistinguishable from the industry material it critiques.
2. **Be a talk kit.** Generate a presentable deck from the same source files, so trialling a talk with a school class doesn't mean maintaining a second copy of the content.
3. **Be a workbench.** Capture what actually happened when the talk was given — which bits landed, which questions got asked, what a 15-year-old audience found patronising — and feed that back into the content.

Non-goal: a campaign site. No calls to action, no donate button, no advocacy framing. It is a reference.

---

## 2. Hard constraints

- **Plain text source.** Content is markdown in git. The markdown files are the canonical artefact; the site is a rendering of them. If the site build breaks forever, the content must still be readable in a terminal.
- **No build step required to read or edit content.** A contributor should be able to fix a typo in the GitHub web editor.
- **Open source, open licence.** Code MIT, content CC BY 4.0. State both.
- **No trackers, no analytics that set cookies, no third-party fonts, no CDN calls.** Partly principle, partly because this will be shown in schools. Self-host everything. If you want usage numbers, use GitHub's own traffic panel or nothing.
- **No JS required for content.** Progressive enhancement only.
- **Accessible.** Real headings, real contrast, works at 320px, works with a screen reader. Test it, don't assert it.

---

## 3. Stack decision

Use **Eleventy (11ty)** with a hand-written minimal layout, deployed to GitHub Pages via GitHub Actions.

Rationale, so you don't relitigate it:
- Jekyll is the zero-config GH Pages default but the Ruby toolchain is a tax and the plugin allowlist is restrictive.
- Astro/Next are far more machinery than eight pages of prose needs.
- 11ty takes markdown files essentially as-is, has no opinions, no client-side JS by default, and the output is plain HTML. It fits the "markdown is canonical" constraint better than anything else.

For the deck: **Marp** (`@marp-team/marp-cli`). Markdown in, HTML/PDF slides out, runs in CI, no GUI. Do **not** use reveal.js hand-authored in HTML — it breaks the single-source rule.

Node LTS. Commit `package-lock.json`. Keep total dependencies countable on two hands.

---

## 4. Repo structure

```
living-well-slogans/
├── README.md                 # what this is, how to run it, how to contribute
├── LICENSE                   # MIT (code)
├── LICENSE-CONTENT           # CC BY 4.0 (prose)
├── CONTRIBUTING.md           # see §8
├── .github/workflows/
│   ├── build.yml             # build + deploy to Pages on push to main
│   └── check.yml             # link check + evidence-integrity lint on every PR
├── content/
│   ├── index.md              # the overview / organising argument
│   ├── slogans/
│   │   ├── smoking.md
│   │   ├── alcohol.md
│   │   ├── gambling.md
│   │   ├── food.md
│   │   ├── movement.md
│   │   ├── sleep.md
│   │   ├── sun.md
│   │   └── failures.md       # the slogans that failed — the closing page
│   ├── provenance.md         # the verified / from-recall split, maintained honestly
│   └── talks/                # one file per time the talk is actually given
│       └── _template.md
├── slides/
│   └── deck.md               # Marp front-matter + includes; NOT a second copy of the content
├── src/
│   ├── _layouts/             # base.njk, slogan.njk
│   ├── _data/
│   └── css/style.css         # one file, hand-written, no framework
└── .eleventy.js
```

---

## 5. The content model — this is the important bit

Every slogan page is the same shape, enforced by front-matter schema and by a lint script. Don't let pages drift into freeform essays.

```yaml
---
slogan: "Smoking kills, stopping helps"
verdict: "The strongest causal claim in non-communicable disease epidemiology."
confidence: near-certain        # one of: near-certain | high | moderate | contested
clock: both                     # one of: ten-year | seventy-year | both
authored_by: public-health      # one of: public-health | industry | marketing | folk
---
```

Body sections, in this order, all required:

1. **The claim** — what we are actually asserting, stated narrowly.
2. **The evidence** — each item as: *citation → design → effect size*. A citation without a design is not evidence, it is a name.
3. **The honest weakness** — required, never empty. If you cannot state a weakness, you have not understood the study. `"None material"` is an acceptable value only where it is true (smoking) and it must say why.
4. **What this means for a 15-year-old** — the ten-year clock, not the seventy-year clock.
5. **The slogan to attack** — where there is an industry-authored counterpart. This is the through-line.

### Evidence-integrity rules (enforce in `check.yml`)

- Every numeric claim (regex for digits followed by `%`, `-fold`, `g/day`, `HR`, `RR`, `OR`, `kcal`) must appear within a paragraph containing a citation. Fail the build otherwise.
- Every effect estimate should carry its interval where the source gives one. Hazard ratios without CIs on a site about evidence quality are an own goal.
- `provenance.md` must list every figure in one of two buckets: **verified against source** or **from recall — unverified**. A figure may not appear on a slogan page unless it appears in one of those buckets. Write the lint to check this and fail the PR. It is tedious and it is the entire point of the project.
- The `authored_by` field renders as a visible badge on each page. A reader should be able to see at a glance who wrote each slogan. This is the argument, made structurally rather than rhetorically.

---

## 6. Design

Read `/mnt/skills/public/frontend-design/SKILL.md` before touching CSS.

Direction: this should look like a reference document, not a campaign. Think working paper or a good textbook — generous measure, real typographic hierarchy, one accent colour used sparingly for the `authored_by` badges. Explicitly avoid: hero images, stock photography of teenagers looking pensive, gradients, rounded cards, anything that reads as NHS-campaign-adjacent. The visual argument is *we are showing you our workings*.

Two things earn their pixels:
- **The two-clock diagram** on the index — ten-year risks vs seventy-year risks, side by side, showing they barely overlap. This is the most counterintuitive thing on the site.
- **The worked/failed table** — it is already in the source and it is the spine.

System font stack. No webfonts.

---

## 7. Phases

Ship each phase before starting the next. Don't build it all and then debug it all.

**Phase 1 — skeleton that publishes**
- Repo, 11ty, one layout, `index.md` and `smoking.md` only, Pages deploying from Actions on push to `main`.
- Acceptance: the two pages are live at the Pages URL, readable on a phone, and `content/smoking.md` renders correctly in the GitHub file view too.

**Phase 2 — all content in, schema enforced**
- Split `slogans_evidence_pack.md` into the eight pages, front-matter on each, `provenance.md` populated with the appendix split as-is.
- Acceptance: `check.yml` fails a deliberately-introduced unsourced number. Test this by actually introducing one.

**Phase 3 — the deck**
- `slides/deck.md`, Marp, building to `dist/deck.html` and `dist/deck.pdf` in CI, linked from the index.
- Speaker notes in Marp's `<!-- notes -->` blocks — the talk is 20 minutes and the site is 8 pages, so the deck is a *selection*, not the whole thing. Suggested cut: two-clock diagram → smoking (threat + exit) → gambling arithmetic → the manpo-kei story → the failed-slogans table → the closing line.
- Acceptance: PDF opens, renders in a school projector's 4:3 worst case, notes present.

**Phase 4 — the workbench**
- `content/talks/` with a template capturing: date, setting, year group, size, what landed, what didn't, questions asked, anything a student said that changed our mind, changes made as a result.
- Acceptance: one real talk written up, and at least one change to a slogan page traceable to it via a linked commit.

---

## 8. Working with a 15-year-old collaborator

Set this up properly at the start; it is much harder to retrofit.

**Contribution workflow.** Branch + PR for everything, including from Carl. This is not ceremony — it is the mechanism by which the collaborator can disagree with the consultant in writing, which is the only way their contribution will be real. `CONTRIBUTING.md` should say so out loud.

**Attribution.** Ask, don't assume. Real name, first name only, or a handle — their call, and revisit it when they're 18, because a GitHub commit history is permanent and public and they are making that decision at 15. Do not put a school name, a photo, or anything that identifies where they are. If the site ever gets attention, they get the attention too, and that needs to be a thing they chose. Consider adding a Zenodo release hook so there's a DOI and a citable artefact with their name on it — that is worth more to them than a footnote.

**Their actual job.** The single most valuable thing they can do is the thing Carl cannot: tell you when a page is patronising, when the framing is a 50-year-old's idea of what a teenager cares about, and when the ten-year clock section is wrong about what actually scares them. Give them explicit standing to reject content on those grounds. Record those rejections in the talks write-ups.

**One honest note on the engagement plan.** Handing the "talk to everyone else working in this space" job to the 15-year-old is a reasonable division of labour on paper, but be careful about the reasoning behind it. "I've got the best insight about how to do this" is exactly the prior that the field's existing failures were built on — and this project's entire thesis is that the failed slogans failed because their authors didn't check. Wardle, Newall, van Schalkwyk and the gambling-harm group at LSHTM have done the messaging-evaluation work; the tobacco control people have the only track record of a slogan actually moving a population; and someone has almost certainly tried and abandoned an approach very close to this one. Finding out costs a week and could save the project. Sending a 15-year-old to do it alone also puts them in rooms with industry-adjacent bodies without a senior person present, which isn't fair to them. Suggest: they do the outreach, Carl reads every reply, and the first talk isn't given until at least two people outside this repo have told you what's wrong with it. Log those responses in `content/talks/` too — a project about intellectual honesty should show its own peer review.

---

## 9. Definition of done

- Live at a Pages URL, `<50KB` per page, no external requests, Lighthouse accessibility 100.
- Every figure on the site is in `provenance.md` in one of the two buckets, and the unverified bucket is visibly shrinking over time.
- Deck builds from the same markdown in CI.
- At least one talk delivered and written up.
- At least one change traceable to a 15-year-old telling us we were wrong.
