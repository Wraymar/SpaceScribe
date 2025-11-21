const { hashPassword } = require("../../utilities/passwordHasher");

exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      username: "sunflower_soul",
      email: "sunny@example.com",
      hashed_password: "hashed_pw_1",
      goal: "Practice gratitude daily",
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
    },
    {
      username: "moodymoon",
      email: "moon@example.com",
      hashed_password: "hashed_pw_2",
      goal: "Reflect on emotions weekly",
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
    },
    {
      username: "artfulwanderer",
      email: "wanderer@example.com",
      hashed_password: "hashed_pw_3",
      goal: "Explore creativity through journaling",
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
    },
    {
      username: "Wraymar",
      email: "wraymar@email.com",
      hashed_password:
        "$2b$10$oszTgem.2riz/PcnO4f0Se8aHI7XD8pbEmwCKVZlh4GE/BV8KHzl6",
      goal: "Maintain daily journaling habit",
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
    },
  ]);
};
