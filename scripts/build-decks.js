#!/usr/bin/env node
/**
 * build-decks.js — generate one slide deck per age band from the slogan pages.
 *
 * The site is the canonical artefact; the decks are a *view* of it, exactly
 * like the web pages. For each of the three age bands (8–11, 11–16, 16+) this
 * reads every slogan page, pulls out that band's section ("## For ages …"),
 * and emits a Marp markdown deck covering the whole site at that reading level.
 *
 * Output: slides/_generated/deck-8-11.md, deck-11-16.md, deck-16plus.md
 * Rendered to HTML + PDF by `npm run deck` (Marp). No dependencies.
 *
 * Because the decks are generated, they cannot drift from the pages: change a
 * band on a slogan page and rebuild, and the deck changes with it.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SLOGANS_DIR = path.join(ROOT, "content", "slogans");
const OUT_DIR = path.join(ROOT, "slides", "_generated");

const BANDS = [
  { key: "8-11", heading: "For ages 8–11", label: "Ages 8–11", file: "deck-8-11.md" },
  { key: "11-16", heading: "For ages 11–16", label: "Ages 11–16", file: "deck-11-16.md" },
  { key: "16plus", heading: "For ages 16+", label: "Ages 16+", file: "deck-16plus.md" },
];

// Roughly how many characters of body fit on one 4:3 slide before it overflows.
// Content longer than this is split across continuation slides.
const SLIDE_BUDGET = 620;

// Shared Marp header. Self-contained on purpose: system fonts only, no remote
// assets, so it renders on a school projector with no network. Mirrors the
// hand-written slides/deck.md styling.
function header(title) {
  return `---
marp: true
size: 4:3
paginate: true
title: ${JSON.stringify(title)}
author: Carl Reynolds and contributors
style: |
  section {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 26px;
    line-height: 1.4;
    color: #1a1a1a;
    background: #fbfaf7;
    padding: 48px 56px;
  }
  h1 { font-size: 46px; letter-spacing: -0.02em; }
  h2 { font-size: 34px; letter-spacing: -0.015em; color: #1a1a1a; }
  strong { color: #a3341f; }
  ul { font-size: 25px; }
  blockquote { font-size: 24px; border-left: 4px solid #d9d5cc; padding-left: 16px; color: #444; }
  section.lead { justify-content: center; }
  section.lead h1 { font-size: 52px; }
  footer { color: #6a6a6a; font-size: 15px; }
---
`;
}

function parse(raw) {
  const end = raw.indexOf("\n---", 3);
  const fm = raw.slice(3, end);
  const body = raw.slice(raw.indexOf("\n", end + 1) + 1);
  const data = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body };
}

// Pull the block of markdown under "## <heading>" up to the next "## ".
function sectionFor(body, heading) {
  const lines = body.split("\n");
  const out = [];
  let inside = false;
  for (const line of lines) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      if (inside) break;
      inside = h[1] === heading;
      continue;
    }
    if (inside) out.push(line);
  }
  return out.join("\n").trim();
}

// Split a section into slides that fit the budget, breaking on blank lines so a
// paragraph or bullet list is never cut mid-thought.
function paginate(section) {
  const blocks = section.split(/\n{2,}/).filter((b) => b.trim());
  const slides = [];
  let cur = "";
  for (const block of blocks) {
    if (cur && (cur.length + block.length > SLIDE_BUDGET)) {
      slides.push(cur.trim());
      cur = "";
    }
    cur += (cur ? "\n\n" : "") + block;
  }
  if (cur.trim()) slides.push(cur.trim());
  return slides.length ? slides : [""];
}

function buildDeck(band, slogans) {
  const parts = [header(`Living Well — ${band.label}`)];

  // Lead slide
  parts.push(`<!-- _class: lead -->
# How are we to live?

### ${band.label}

*Evidence-based pointers on living well —*
*each with its study design, its effect size, and its honest weakness.*
`);

  for (const s of slogans) {
    const section = sectionFor(s.body, band.heading);
    if (!section) continue;
    const slides = paginate(section);
    slides.forEach((slide, i) => {
      const title = i === 0 ? s.data.slogan : `${s.data.slogan} (cont.)`;
      parts.push(`---\n\n## ${title}\n\n${slide}\n`);
    });
  }

  // Closing slide
  parts.push(`---

<!-- _class: lead -->
## Trust, but verify.

*Full evidence — with the study designs, the effect sizes,*
*and the honest weaknesses — is on the site.*

**Information is power.**
`);

  return parts.join("\n");
}

// --- Load slogans in argument order --------------------------------------
const slogans = fs
  .readdirSync(SLOGANS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { data, body } = parse(fs.readFileSync(path.join(SLOGANS_DIR, f), "utf8"));
    return { data, body, order: Number(data.order ?? 99) };
  })
  .sort((a, b) => a.order - b.order);

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const band of BANDS) {
  const deck = buildDeck(band, slogans);
  fs.writeFileSync(path.join(OUT_DIR, band.file), deck);
  const covered = slogans.filter((s) => sectionFor(s.body, band.heading)).length;
  console.log(`✓ ${band.file} — ${covered}/${slogans.length} slogans at ${band.label}`);
}
