const decoder = require("./src/_data/decoder.json");

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ESCAPES[c]);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // {% term "co-sell" %} or {% term "co-sell", "co-selling" %}
  // Renders the jargon as written, with the plain-English gloss one hover or tap away.
  eleventyConfig.addShortcode("term", (id, display) => {
    const entry = decoder.find((d) => d.id === id);
    if (!entry) {
      throw new Error(
        `Unknown decoder term "${id}". Add it to src/_data/decoder.json or fix the spelling.`
      );
    }
    return [
      '<span class="gloss">',
      '<button class="gloss__trigger" type="button" aria-expanded="false">',
      escapeHtml(display || entry.term),
      "</button>",
      '<span class="gloss__pop" role="note">',
      '<span class="gloss__poplabel">In plain English</span>',
      escapeHtml(entry.plain),
      "</span></span>",
    ].join("");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
