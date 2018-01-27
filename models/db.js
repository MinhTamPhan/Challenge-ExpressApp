module.exports = {
  host: process.env.MONGODB_HOST || "localhost",
  port: process.env.MONGODB_PORT || 27017,
  database: process.env.MONGODB_DB || "challenge"
};