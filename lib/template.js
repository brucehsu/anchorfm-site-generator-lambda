const fs = require("fs");
const path = require("path");

const dot = require("dot");

const INDEX_TEMPLATE = path.join(
  __dirname,
  "..",
  "templates",
  "index.dot.html"
);
const EPISODE_TEMPLATE = path.join(
  __dirname,
  "..",
  "templates",
  "episode.dot.html"
);

const generateIndex = dot.template(fs.readFileSync(INDEX_TEMPLATE, "UTF-8"));
const generateEpisode = dot.template(
  fs.readFileSync(EPISODE_TEMPLATE, "UTF-8")
);

module.exports = {
  generateIndex,
  generateEpisode
};
