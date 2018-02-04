const host = process.env.MONGODB_HOST || "localhost";
const port = process.env.MONGODB_PORT || 27017;
const database = process.env.MONGODB_DB || "challenge";
const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};
module.exports = {
  url: `mongodb://${host}:${port}/${database}`,
  //options: options
};