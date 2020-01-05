const normalizeEpisode = episodeObj => {
  const {
    title,
    link,
    pubDate,
    description,
    "itunes:episode": episode
  } = episodeObj;
  const urlSplits = link.match(/(https:\/\/anchor.fm\/[^/]+)(\/episodes.+)/);
  return {
    title,
    link,
    pubDate,
    description,
    episode,
    embedLink: `${urlSplits[1]}/embed${urlSplits[2]}`
  };
};

const normalize = input => {
  const obj = input.rss.channel;
  const { title, link } = obj;

  return {
    title,
    link,
    episodes: obj.item.map(normalizeEpisode)
  };
};

module.exports = {
  normalize
};
