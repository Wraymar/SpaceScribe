const env = process.env.NODE_ENV || "development"; //development shhh
const config = require("../knexfile.js")[env];
module.exports = require("knex")(config);
