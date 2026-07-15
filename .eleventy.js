import fs from "node:fs";

export default function (eleventyConfig) {
  // Copy the hand-written CSS through untouched. No pipeline, no framework.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // The markdown files in content/ are the canonical artefact. We render them
  // as-is; the site is just a view of them.
  eleventyConfig.addGlobalData("site", {
    title: "Living Well: Slogans and the Evidence",
    // Set this in the GitHub Pages settings / repo, used only for absolute
    // URLs where unavoidable. Kept relative everywhere we can.
    repo: "https://github.com/OWNER/living-well-slogans",
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
    authored_by: {
      "public-health": "Public health",
      industry: "Industry",
      marketing: "Marketing",
      folk: "Folk wisdom",
    },
    clock: {
      "ten-year": "Ten-year clock",
      "seventy-year": "Seventy-year clock",
      both: "Both clocks",
    },
  });

  // A tidy, readable date filter for the talks write-ups.
  eleventyConfig.addFilter("isoDate", (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().slice(0, 10);
  });

  // Collection of slogan pages, ordered by the `order` front-matter field so
  // the index and prev/next navigation follow the argument, not the filename.
  eleventyConfig.addCollection("slogans", (collection) =>
    collection
      .getFilteredByGlob("content/slogans/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addCollection("talks", (collection) =>
    collection
      .getFilteredByGlob("content/talks/*.md")
      .filter((t) => !t.inputPath.includes("_template"))
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0))
  );

  return {
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
