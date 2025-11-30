const db = require("../db/knex");
const redis = require("../redis/client"); // assuming you export a redis client

module.exports = async function getCalendarSummary(req, res) {
  const userId = req.user.id;

  try {
    // 1: Try Redis first
    const cached = await redis.get(`calendar:summary:${userId}`);

    if (cached) {
      return res.json(JSON.parse(cached)); // send cached version
    }

    // 2: Fetch all entries
    const entries = await db("journal_entries")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");

    // 3: Build summary object
    const summary = {};

    for (const entry of entries) {
      const dateStr = entry.created_at.toISOString().split("T")[0];

      // Fetch media for the entry
      const media = await db("media")
        .where({ journal_entry_id: entry.id })
        .first();

      // Create the array for that date if it doesn't exist
      if (!summary[dateStr]) {
        summary[dateStr] = [];
      }

      // Add entry info to that date
      summary[dateStr].push({
        id: entry.id,
        title: entry.title,
        preview_img: media ? media.cloudinary_url : null,
      });
    }

    /*
    {
  "2025-01-04": [
    { "id": 42, "preview_img": "https://cloudinary/abc.jpg" },
    { "id": 43, "preview_img": null }
  ],
  "2025-01-06": [
    { "id": 55, "preview_img": "https://cloudinary/xyz.jpg" }
  ]
}
*/
    // 4: Save to Redis
    await redis.set(`calendar:summary:${userId}`, JSON.stringify(summary));

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get calendar summary" });
  }
};
