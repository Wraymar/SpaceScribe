const env = process.env.NODE_ENV || "development"; //development shhh
const config = require("../knexfile.js")[env];

const db = require("knex")(config);
// db.raw("SELECT 1")
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch((err) => console.error("❌ Database connection failed:", err));

db.raw("SELECT current_database(), current_schema();")
  .then((result) => console.log("📦 Connected to:", result.rows[0]))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = require("knex")(config);

//THIS IS HOW MODULE SYNTAX WOULD LOOK IN BACKEND
//TO ENABLE USING IMPORT INSTEAD OF REQUIURE WE WOULD HAVE TO ADD "TYPE: MODULE IN THE PACKAGE.JSON"
// import knex from "knex";
// import knexConfig from "../knexfile.js";

// const env = process.env.NODE_ENV || "development";
// const db = knex(knexConfig[env]);

// export default db;
