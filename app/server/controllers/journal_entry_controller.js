const JournalEntry = require("../models/journal_entry_model");

exports.createJournalEntry = async (req, res) => {
  try {
    const { user_id, title, content, mood, is_shared } = req.body;
    const newEntry = await JournalEntry.create({
      user_id,
      title,
      content,
      mood,
      is_shared,
    });
    res.status(201).json(newEntry);
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
    res.json({ message: "Journal entry deleted", entry: deletedEntry });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Failed to delete journal entry" });
  }
};
