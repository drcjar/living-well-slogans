#!/usr/bin/env node
/**
 * check-links.js — link + purity check, run against the built _site/.
 *
 * Two jobs:
 *   1. Every internal link and asset reference resolves to a file that exists.
 *   2. No page references an external host — no CDN, no third-party font, no
 *      analytics. "No external requests" is a hard constraint of this project
 *      (it is shown in schools), so a stray https://… in a stylesheet link or
 *      script/img src fails the build.
 *
 * Run `npm run build` first. No dependencies.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = path.join(ROOT, "_site");

if (!fs.existsSync(SITE)) {
  console.error("✗ _site/ not found — run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".html")) htmlFiles.push(p);
  }
})(SITE);

const errors = [];
// Hosts we allow to be *named as text* (e.g. citations, the repo link in the
// footer). Anything that would cause the browser to FETCH is caught by the
// attribute-scoped checks below, so this is just to avoid noise.
const FETCHING_ATTR = /\b(?:src|href)\s*=\s*"([^"]+)"/gi;

// Must match pathPrefix in .eleventy.js. Links carry this prefix, but the
// built files sit at the _site root, so strip it before resolving to disk.
const PREFIX = "/living-well-slogans";

function resolveInternal(href) {
  let target = href.split("#")[0].split("?")[0];
  if (target.startsWith(PREFIX)) target = target.slice(PREFIX.length) || "/";
  if (target === "" || target === "/") target = "/";
  if (!target.startsWith("/")) return null; // relative — skip (none authored)
  let fsPath = path.join(SITE, target);
  if (target.endsWith("/")) fsPath = path.join(fsPath, "index.html");
  else if (!path.extname(fsPath)) fsPath = path.join(fsPath, "index.html");
  return fsPath;
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(SITE, file);
  for (const m of html.matchAll(FETCHING_ATTR)) {
    const href = m[1];
    if (/^(mailto:|tel:|#)/.test(href)) continue;
    if (/^https?:\/\//i.test(href)) {
      // External. Allowed ONLY as an anchor href the user must click; never as
      // a resource the browser fetches automatically. We detect the latter by
      // the surrounding tag: <link>, <script>, <img>, <source>, <iframe>.
      const before = html.slice(Math.max(0, m.index - 60), m.index).toLowerCase();
      if (/<(link|script|img|source|iframe|audio|video|embed)\b[^>]*$/.test(before)) {
        errors.push(`${rel}: external resource fetched at build/runtime: ${href}`);
      }
      continue;
    }
    const resolved = resolveInternal(href);
    if (resolved && !fs.existsSync(resolved)) {
      errors.push(`${rel}: broken internal link "${href}" → ${path.relative(ROOT, resolved)} missing`);
    }
  }
}

if (errors.length) {
  console.error(`\n✗ Link check failed (${errors.length}):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error("");
  process.exit(1);
}
console.log(`✓ Link check passed: ${htmlFiles.length} pages, all internal links resolve, no external requests.`);
