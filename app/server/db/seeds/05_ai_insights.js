/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("ai_insights").del();
  await knex("ai_insights").insert([
    {
      user_id: 1,
      insight_text:
        "This week you’ve taken great steps toward starting your new school journey. You began with hope, experienced disappointment in trying to make friends, but showed resilience by continuing to try. By midweek, you made a meaningful connection and even participated in a group activity. You’re adjusting well — keep it up!",
      insight_type: "weekly_summary",
      generated_at: knex.fn.now(),
      week_start_date: "2025-07-07",
      is_bookmarked: true,
      source_journal_ids: JSON.stringify([1]),
    },
    {
      user_id: 2,
      insight_text:
        "Your creativity has really shined this week. Despite some early struggles with motivation, you gradually picked up momentum. You explored new themes in your artwork, reflected deeply on your process, and even started preparing for an upcoming local gallery show. Stay focused — your dedication is paying off.",
      insight_type: "goal_suggestion",
      generated_at: knex.fn.now(),
      week_start_date: "2025-07-07",
      is_bookmarked: false,
      source_journal_ids: JSON.stringify([2]),
    },
    {
      user_id: 3,
      insight_text:
        "This week brought emotional ups and downs, but you handled it with grace. You juggled academic pressures and social fatigue while trying to maintain focus. Your entry midweek showed growth — acknowledging the need for balance. Keep building on your awareness and give yourself credit for the small victories.",
      insight_type: "motivation",
      generated_at: knex.fn.now(),
      week_start_date: "2025-07-07",
      is_bookmarked: false,
      source_journal_ids: JSON.stringify([3]),
    },
  ]);
};
