#!/usr/bin/env node
/**
 * check-evidence.js — the evidence-integrity linter.
 *
 * This is the entire point of the project rendered as CI. A slogan site that
 * criticises other people's evidence has to hold its own to a stricter bar.
 * It enforces four things and fails the build (exit 1) on any violation:
 *
 *   1. Front-matter schema — required fields, values drawn from the allowed enums.
 *   2. Section shape — the four required sections, present and in order.
 *   3. Numeric-claim citation adjacency — every figure (a number followed by
 *      %, kcal, g/day, -fold, or an HR/RR/OR estimate) must sit in the same
 *      block as a citation. A figure that is a *published design parameter*
 *      (a stated house edge / return-to-player / fraction) counts as its own
 *      citation — the Tier-1 "arithmetic, not statistics" exemption.
 *   4. Provenance membership — every figure on a slogan page must also appear
 *      in content/provenance.md, in one of its two buckets.
 *
 * No dependencies: this must run in CI with nothing but Node.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SLOGANS_DIR = path.join(ROOT, "content", "slogans");
const PROVENANCE = path.join(ROOT, "content", "provenance.md");

const SCHEMA = {
  confidence: ["near-certain", "high", "moderate", "contested"],
  clock: ["ten-year", "seventy-year", "both"],
};
const REQUIRED_FIELDS = ["order", "slogan", "verdict", "confidence", "clock"];

// Old-style pages (pre age-tabs) must carry these four sections in order.
const REQUIRED_SECTIONS = [
  "The claim",
  "The evidence",
  "The honest weakness",
  "What this means for a 15-year-old",
];
// Optional, not enforced: "The slogan to attack".

// New-style pages carry three age bands, then the shared evidence. A page is
// treated as new-style the moment any "For ages …" heading appears, so the two
// shapes can coexist while the pages are converted one at a time.
const AGE_BAND_SECTIONS = ["For ages 8–11", "For ages 11–16", "For ages 16+"];
const REQUIRED_SECTIONS_NEW = [...AGE_BAND_SECTIONS, "The evidence", "The honest weakness"];
const isNewStyle = (headings) => headings.some((h) => /^For ages\b/.test(h));

// A figure: a number bound to one of the brief's units, or an effect estimate.
const FIGURE_UNIT = /\d[\d,]*(?:\.\d+)?\s?(?:%|kcal|g\/day|-fold)/g;
// Effect estimates. Tolerate markdown emphasis (**), "=", ":" and whitespace
// between the estimator and its value — e.g. "HR **0.50**" must still match.
const FIGURE_ESTIMATE = /\b(HR|RR|OR)\b[\s*=:]*([0-9][0-9.]*)/g;

// Signals that a block carries a citation.
const CITATION_TESTS = [
  /\b(?:19|20)\d{2}\b/, // a year
  /\bet al\b/, // author list
  /\]\(/, // a markdown link to a source
  /\b(?:IARC|WHO|Cochrane|NHS|SimSmoke|CMO|CCSA|AASM|GBD)\b/, // naming bodies
  /Gambling Commission/,
];
// The arithmetic exemption: a published design parameter is its own source.
const ARITHMETIC_TESTS = [/house edge/i, /return-to-player/i, /expected value/i, /\b\d+\/\d+\b/];

const errors = [];
const fail = (file, msg) => errors.push(`${path.relative(ROOT, file)}: ${msg}`);

function parseFrontMatter(raw, file) {
  if (!raw.startsWith("---")) {
    fail(file, "no YAML front-matter");
    return { data: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    fail(file, "unterminated front-matter");
    return { data: {}, body: raw };
  }
  const fmText = raw.slice(3, end).trim();
  const body = raw.slice(raw.indexOf("\n", end + 1) + 1);
  const data = {};
  for (const line of fmText.split("\n")) {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!m) continue;
    let [, key, val] = m;
    val = val.trim().replace(/^["']|["']$/g, "");
    data[key] = val;
  }
  return { data, body };
}

function figuresIn(text) {
  const out = new Set();
  for (const m of text.matchAll(FIGURE_UNIT)) out.add(m[0].trim());
  // Normalise effect estimates to "HR 0.50" regardless of surrounding markup.
  for (const m of text.matchAll(FIGURE_ESTIMATE)) out.add(`${m[1].toUpperCase()} ${m[2]}`);
  return [...out];
}

function hasCitation(line) {
  return CITATION_TESTS.some((re) => re.test(line)) || ARITHMETIC_TESTS.some((re) => re.test(line));
}

// --- Load provenance once -------------------------------------------------
let provenanceText = "";
if (!fs.existsSync(PROVENANCE)) {
  fail(PROVENANCE, "provenance.md is missing — it is required");
} else {
  provenanceText = fs.readFileSync(PROVENANCE, "utf8");
  if (!provenanceText.includes("## Sources")) {
    fail(PROVENANCE, 'missing required "## Sources" heading');
  }
}

// --- Lint each slogan page ------------------------------------------------
const files = fs
  .readdirSync(SLOGANS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => path.join(SLOGANS_DIR, f));

if (files.length === 0) fail(SLOGANS_DIR, "no slogan pages found");

const allFigures = new Set();

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontMatter(raw, file);

  // 1. Schema
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === "") fail(file, `front-matter missing "${field}"`);
  }
  for (const [field, allowed] of Object.entries(SCHEMA)) {
    if (field in data && !allowed.includes(data[field])) {
      fail(file, `${field}="${data[field]}" is not one of: ${allowed.join(", ")}`);
    }
  }

  // 2. Section shape — required sections present, in canonical order. Which
  // set is required depends on whether the page has been converted to age tabs.
  const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
  const required = isNewStyle(headings) ? REQUIRED_SECTIONS_NEW : REQUIRED_SECTIONS;
  let cursor = -1;
  for (const section of required) {
    const at = headings.indexOf(section);
    if (at === -1) {
      fail(file, `missing required section "## ${section}"`);
    } else if (at < cursor) {
      fail(file, `section "## ${section}" is out of order`);
    } else {
      cursor = at;
    }
  }

  // 3 & 4. Figures: citation-adjacent, and present in provenance.
  const lines = body.split("\n");
  for (const line of lines) {
    if (/^\s*#/.test(line)) continue; // headings carry no claims
    const figures = figuresIn(line);
    if (figures.length === 0) continue;
    if (!hasCitation(line)) {
      fail(file, `uncited figure(s) [${figures.join(", ")}] in: "${line.trim().slice(0, 90)}"`);
    }
    figures.forEach((f) => allFigures.add(f));
  }
}

// 4. Provenance membership (checked after collecting every figure).
for (const fig of [...allFigures].sort()) {
  if (!provenanceText.includes(fig)) {
    fail(PROVENANCE, `figure "${fig}" appears on a slogan page but is not listed in provenance.md`);
  }
}

// --- Report ---------------------------------------------------------------
if (errors.length) {
  console.error(`\n✗ Evidence check failed (${errors.length} problem${errors.length > 1 ? "s" : ""}):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ Evidence check passed: ${files.length} slogan pages, ${allFigures.size} figures, all sourced and in provenance.`);
