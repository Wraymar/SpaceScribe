const { hashPassword } = require("../../utilities/passwordHasher");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      username: "sunflower_soul",
      email: "sunny@example.com",
      hashed_password: "hashed_pw_1",
    },
    {
      username: "moodymoon",
      email: "moon@example.com",
      hashed_password: "hashed_pw_2",
    },
    {
      username: "artfulwanderer",
      email: "wanderer@example.com",
      hashed_password: "hashed_pw_3",
    },
    {
      username: "Wraymar",
      email: "wraymar@email.com",
      hashed_password:
        "$2b$10$oszTgem.2riz/PcnO4f0Se8aHI7XD8pbEmwCKVZlh4GE/BV8KHzl6",
    },
  ]);
};
