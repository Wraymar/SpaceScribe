/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("journal_entries").del();
  await knex("journal_entries").insert([
    {
      id: 1,
      user_id: 1,
      title: "A Grateful Morning",
      content:
        "Started the day with meditation and journaling. Feeling centered.",
      mood: "grateful",
      is_shared: false,
    },
    {
      id: 2,
      user_id: 2,
      title: "Creative Highs",
      content: "Worked on my art project and got a ton of new ideas.",
      mood: "inspired",
      is_shared: false,
    },
    {
      id: 3,
      user_id: 3,
      title: "Stressful Midweek",
      content: "Classes were overwhelming today. I need to organize better.",
      mood: "stressed",
      is_shared: false,
    },
  ]);
};
