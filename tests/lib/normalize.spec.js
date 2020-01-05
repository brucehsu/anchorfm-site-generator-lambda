const fs = require("fs");
const path = require("path");
const parser = require("fast-xml-parser");

const { normalize } = require("../../lib/normalize");

describe("Normalize", () => {
  const mockFeedPath = path.join(__dirname, "..", "mocks", "feed.xml");
  const feed = parser.parse(fs.readFileSync(mockFeedPath, "utf8"));
  test("normalizes given feed object", () => {
    const result = normalize(feed);
    expect(result).toMatchObject({
      title: "Taiwanese Expats in Tech",
      link: "https://anchor.fm/twexpatsintech"
    });
    expect(result.episodes.length).toBe(3);
    expect(result.episodes[0].episode).toBe(3);
    expect(result.episodes[2].embedLink).toBe(
      "https://anchor.fm/twexpatsintech/embed/episodes/Episode-0----543--with-qcl-e6ep0o"
    );
  });
});
