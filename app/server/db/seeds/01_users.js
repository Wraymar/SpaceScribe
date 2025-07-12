/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "sunflower_soul",
      email: "sunny@example.com",
      password_hash: "hashed_pw_1",
    },
    {
      id: 2,
      username: "moodymoon",
      email: "moon@example.com",
      password_hash: "hashed_pw_2",
    },
    {
      id: 3,
      username: "artfulwanderer",
      email: "wanderer@example.com",
      password_hash: "hashed_pw_3",
    },
  ]);
};
