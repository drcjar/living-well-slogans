import fs from "node:fs";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Copy the hand-written CSS through untouched. No pipeline, no framework.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // GitHub Pages serves a project site under /<repo>/. This rewrites every
  // root-absolute link and asset URL to include that prefix, so the same
  // markdown works locally (prefix "/") and on Pages. Override at build time
  // with `eleventy --pathprefix=/living-well/`.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // The markdown files in content/ are the canonical artefact. We render them
  // as-is; the site is just a view of them.
  eleventyConfig.addGlobalData("site", {
    title: "Living Well and the Evidence",
    // Set this in the GitHub Pages settings / repo, used only for absolute
    // URLs where unavoidable. Kept relative everywhere we can.
    repo: "https://github.com/drcjar/living-well",
  });

  // Human-readable labels for the confidence and authorship enums, so the
  // template never hard-codes prose that belongs next to the schema.
  eleventyConfig.addGlobalData("labels", {
    confidence: {
      "near-certain": "Near-certain",
      high: "High",
      moderate: "Moderate",
      contested: "Contested",
    },
    clock: {
      "ten-year": "Ten-year clock",
      "seventy-year": "Seventy-year clock",
      both: "Both clocks",
    },
    clockShort: {
      "ten-year": "10-yr clock",
      "seventy-year": "70-yr clock",
      both: "both clocks",
    },
  });

  // Collection of slogan pages, ordered by the `order` front-matter field so
  // the index and prev/next navigation follow the argument, not the filename.
  eleventyConfig.addCollection("slogans", (collection) =>
    collection
      .getFilteredByGlob("content/slogans/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  return {
    // GitHub Pages serves this project under /living-well/ (via the account's
    // carlreynolds.net apex). Default to that prefix so `npm run build` in CI
    // produces correct links. Override for a root deploy with
    // `eleventy --pathprefix=/`.
    pathPrefix: "/living-well/",
    dir: {
      input: "content",
      includes: "../src/_layouts",
      data: "../src/_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // Content must remain readable in a terminal and in the GitHub file view,
    // so we accept plain .md as the source of truth.
    templateFormats: ["md", "njk", "html"],
  };
}
