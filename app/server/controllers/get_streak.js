const knex = require("../db/knex");
const redis = require("../redis/client");

const getStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `streak:${userId}`;

    // 1) Try Redis first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // 2) If not in cache → fetch from DB
    const user = await knex("users")
      .where({ id: userId })
      .first("current_streak", "longest_streak", "last_entry_date");

    const payload = {
      current_streak: user?.current_streak || 0,
      longest_streak: user?.longest_streak || 0,
      last_entry_date: user?.last_entry_date || null,
    };

    // 3) Store in Redis with TTL (12 hours)
    await redis.set(cacheKey, JSON.stringify(payload), "EX", 60 * 60 * 12);

    return res.json(payload);
  } catch (err) {
    console.error("getStreak error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getStreak;
