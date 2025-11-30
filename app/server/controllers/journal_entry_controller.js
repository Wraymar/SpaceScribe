const JournalEntry = require("../models/journal_entry_model");
const redis = require("../redis/client");
const { createJournalEntryWithStreak } = require("../services/journalService");

exports.createJournalEntry = async (req, res) => {
  try {
    const { user_id, title, content, mood, is_shared } = req.body;
    const newEntry = await createJournalEntryWithStreak({
      user_id,
      title,
      content,
      mood,
      is_shared,
    });

    // UPDATE REDIS CALENDAR SUMMARY
    try {
      const dateStr = newEntry.created_at.toISOString().split("T")[0];

      // Load existing cache
      let summary = await redis.get(`calendar:summary:${newEntry.user_id}`);
      //parse and redefine
      summary = summary ? JSON.parse(summary) : {};

      // Add new entry to that date
      if (!summary[dateStr]) {
        summary[dateStr] = [];
      }

      summary[dateStr].push({
        id: newEntry.id,
        title: newEntry.title,
        preview_img: null,
      });

      // Save back to Redis
      await redis.set(
        `calendar:summary:${newEntry.user_id}`,
        JSON.stringify(summary)
      );
    } catch (err) {
      console.error("REDIS UPDATE FAILED:", err);
    }

    //respond to the frontend
    res.status(201).json({ newEntry, message: "Entry Created!" });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ error: "Failed to create journal entry" });
  }
};

exports.getJournalEntryById = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(entry);
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    res.status(500).json({ error: "Failed to fetch journal entry" });
  }
};

exports.getAllEntriesByUser = async (req, res) => {
  try {
    const entries = await JournalEntry.findAllByUserId(req.params.user_id);
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
};

exports.getEntryCountByUser = async (req, res) => {
  try {
    const total = await JournalEntry.countByUserId(req.user.id); // use requireAuth
    res.json({ total });
  } catch (error) {
    console.error("Error counting journal entries:", error);
    res.status(500).json({ error: "Failed to count journal entries" });
  }
};

exports.updateJournalEntry = async (req, res) => {
  try {
    const { title, content, mood, is_shared } = req.body;
    const updatedEntry = await JournalEntry.updateById(req.params.id, {
      title,
      content,
      mood,
      is_shared,
    });
    if (!updatedEntry) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ error: "Failed to update journal entry" });
  }
};

exports.deleteJournalEntry = async (req, res) => {
  try {
    const deletedEntry = await JournalEntry.deleteById(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    // --- UPDATE REDIS CALENDAR SUMMARY (entry delete) ---
    try {
      const userId = deletedEntry.user_id;
      const entryId = deletedEntry.id;

      // Convert date to YYYY-MM-DD
      const dateStr = new Date(deletedEntry.created_at)
        .toISOString()
        .split("T")[0];

      // Load existing cache
      let summary = await redis.get(`calendar:summary:${userId}`);
      summary = summary ? JSON.parse(summary) : {};

      // If the date exists in summary
      if (summary[dateStr]) {
        // Remove the entry from that date
        summary[dateStr] = summary[dateStr].filter(
          (entry) => entry.id !== entryId
        );

        // If no more entries on this date → delete the date entirely
        if (summary[dateStr].length === 0) {
          delete summary[dateStr];
        }

        // Save updated summary
        await redis.set(`calendar:summary:${userId}`, JSON.stringify(summary));
      }
    } catch (err) {
      console.error("Redis update (entry delete) failed:", err);
    }
    res.json({ message: "Journal entry deleted", entry: deletedEntry });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Failed to delete journal entry" });
  }
};
