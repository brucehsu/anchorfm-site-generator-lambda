const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

const fetchFeed = async (anchorId) => {
    const url = `https://anchor.fm/s/${anchorId}/podcast/rss`;
    const response = await fetch(url);
    const body = await response.text();
    return parser.parse(body);
};

module.exports = {
    fetchFeed
};

