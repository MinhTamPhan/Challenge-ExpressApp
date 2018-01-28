const host = process.env.MONGODB_HOST || "localhost";
const port = process.env.MONGODB_PORT || 27017;
const database = process.env.MONGODB_DB || "challenge";
module.exports = {
  url: `mongodb://${host}:${port}/${database}`
};