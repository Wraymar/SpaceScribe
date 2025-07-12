/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      id: 1,
      user_id: 1,
      title: "Meditate 10 minutes",
      description: "Start the day with a calm mind",
      is_completed: true,
      priority: "medium",
      due_date: "2025-07-08",
      completed_at: knex.fn.now(),
    },
    {
      id: 2,
      user_id: 2,
      title: "Finish art class homework",
      description: "Upload final sketches before deadline",
      is_completed: false,
      priority: "high",
      due_date: "2025-07-09",
    },
    {
      id: 3,
      user_id: 3,
      title: "Declutter workspace",
      description: "Organize desk and supplies",
      is_completed: false,
      priority: "low",
      due_date: "2025-07-10",
    },
  ]);
};
