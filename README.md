# Living Well: Slogans and the Evidence

A small, fast, static site that hosts an evidence-checked set of public-health
slogans **and the evidence behind each one** — with, for every claim, its study
design, its effect size, and its honest weakness. It is a reference, not a
campaign: no calls to action, no donate button, no advocacy framing.

The site has three jobs, in priority order:

1. **Be right.** Every claim carries its design, its effect size, and its
   weakness. The credibility is the whole product. A build check fails the site
   if a figure appears without a citation, or is missing from the provenance
   ledger.
2. **Be a talk kit.** The same markdown builds a slide deck (Marp), so trialling
   the talk in a school doesn't mean maintaining a second copy of the content.
3. **Be a workbench.** `content/talks/` records what actually happened when the
   talk was given, and feeds it back into the pages.

## The content is the artefact

The markdown files under `content/` are canonical; the website is just a
rendering of them. If the build breaks forever, the content is still readable in
a terminal and in the GitHub file view. A contributor can fix a typo in the
GitHub web editor without running anything.

## Principles baked into the build

- **No trackers, no analytics, no third-party fonts, no CDN calls.** Everything
  is self-hosted; the pages make zero external requests. This is shown in
  schools. For usage numbers, use GitHub's own traffic panel or nothing.
- **No JavaScript required for content.** Progressive enhancement only.
- **Accessible.** Real headings, real contrast, works at 320px, works with a
  screen reader.
- **Open.** Code is MIT (`LICENSE`); prose is CC BY 4.0 (`LICENSE-CONTENT`).

## Run it locally

Requires Node LTS (see `.nvmrc`).

```sh
npm install        # install Eleventy + Marp (dependencies countable on two hands)
npm run serve      # live-reloading dev server at http://localhost:8080
npm run build      # write the static site to _site/
npm run check      # run the evidence-integrity linter
npm run deck       # build the slide deck to _site/deck.html and _site/deck.pdf
```

## How the evidence check works

`scripts/check-evidence.js` (run in CI on every PR, and via `npm run check`)
enforces four things and fails the build on any violation:

1. **Front-matter schema** — every slogan page has `order`, `slogan`, `verdict`,
   `confidence`, `clock`, `authored_by`, with values from the allowed enums.
2. **Section shape** — the four required sections, present and in order:
   *The claim → The evidence → The honest weakness → What this means for a
   15-year-old*. (*The slogan to attack* is optional.)
3. **Numeric-claim citation adjacency** — every figure (a number followed by
   `%`, `kcal`, `g/day`, `-fold`, or an `HR`/`RR`/`OR` estimate) must sit in the
   same block as a citation. A *published design parameter* (a stated house edge
   or return-to-player, or a fraction) counts as its own citation — the Tier-1
   "arithmetic, not statistics" exemption used on the gambling page.
4. **Provenance membership** — every figure on a slogan page must also appear in
   `content/provenance.md`, in the *verified* or the *from recall* bucket.

To see it bite, add an unsourced number to a slogan page and run `npm run check`.

## Repo layout

```
content/            canonical markdown — the source of truth
  index.md          the organising argument + the two-clock diagram
  slogans/*.md      one page per slogan, all the same shape
  provenance.md     every figure, verified vs from-recall
  talks/            one file per time the talk is given (_template.md to copy)
slides/deck.md      the Marp deck — a selection of the content, not a second copy
src/                layouts, data, and the one hand-written stylesheet
scripts/            the evidence linter
.github/workflows/  build+deploy (build.yml) and PR checks (check.yml)
```

## Contributing

Everything goes through a branch and a pull request — including from the
maintainers. See `CONTRIBUTING.md`; it explains why, and how the project works
with its 15-year-old co-author.

## Deployment

Pushing to `main` builds the site and deploys it to GitHub Pages via
`.github/workflows/build.yml`. Set the repo's Pages source to "GitHub Actions",
and replace `OWNER` in `.eleventy.js` and the licence files with the real
GitHub owner/repo.
