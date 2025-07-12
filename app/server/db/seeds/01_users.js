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
  ]);
};
