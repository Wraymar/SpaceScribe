const knex = require("../db/knex");

exports.createAiInsight = async (req, res) => {
  try {
    const { user_id, content, week_start, week_end } = req.body;

    const newInsight = await knex("ai_insights")
      .insert({
        user_id,
        insight_text: content,
        insight_type: "weekly_recap",
        week_start_date: week_start,
        generated_at: new Date(),
      })
      .returning("*");

    res.status(201).json({
      message: "AI insight saved successfully",
      insight: newInsight[0],
    });
  } catch (error) {
    console.error("Error creating AI insight:", error);
    res.status(500).json({ error: "Failed to save AI insight" });
  }
};

exports.getAiInsightsByUser = async (req, res) => {
  try {
    const insights = await knex("ai_insights")
      .where("user_id", req.params.user_id)
      .orderBy("generated_at", "desc");

    res.json(insights);
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    res.status(500).json({ error: "Failed to fetch AI insights" });
  }
};
