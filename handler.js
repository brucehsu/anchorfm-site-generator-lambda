const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { S3 } = require("aws-sdk");

const { fetchFeed } = require("./lib/xml");
const { normalize } = require("./lib/normalize");
const { generateIndex, generateEpisode } = require("./lib/template");

const s3 = new S3();

const uploadAssets = async (dir, bucketName) => {
  const basePath = path.join(__dirname, dir);
  const entities = fs.readdirSync(basePath);
  const entitiesAsync = entities.map(async entity => {
    const filePath = path.join(basePath, entity);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await uploadAssets(filePath, bucketName);
    } else if (stat.isFile()) {
      await s3
        .upload({
          Bucket: bucketName,
          Key: filePath.split(`${__dirname}/templates/`)[1],
          Body: fs.readFileSync(filePath),
          ContentType: mime.lookup(filePath)
        })
        .promise();
    }
  });
  await Promise.all(entitiesAsync);
};

module.exports.handler = async () => {
  const { ANCHOR_ID, BUCKET_NAME } = process.env;
  const feed = await fetchFeed(ANCHOR_ID);
  const podcast = normalize(feed);

  await uploadAssets("templates/assets", BUCKET_NAME);

  await s3
    .putObject({
      Bucket: BUCKET_NAME,
      Key: "index.html",
      Body: generateIndex(podcast),
      ContentType: "text/html"
    })
    .promise();

  // eslint-disable-next-line no-restricted-syntax
  for (const episode of podcast.episodes) {
    // eslint-disable-next-line no-await-in-loop
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: `episodes/${episode.episode}.html`,
        Body: generateEpisode({
          title: podcast.title,
          episode
        }),
        ContentType: "text/html"
      })
      .promise();
  }

  return true;
};
