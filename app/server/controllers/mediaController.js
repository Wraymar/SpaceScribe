// controllers/mediaController.js
const cloudinary = require("../services/cloudinary");
const fs = require("fs");
const Media = require("../models/media_model");
const redis = require("../redis/client");

async function uploadImage(req, res) {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  try {
    //access the file key in request
    const file = req.file;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "journal_entries",
    });

    console.log(result);

    // Delete temp file after successful upload
    fs.unlinkSync(file.path);

    // Save to DB (example assumes journal_entry_id is in req.body)
    const media = await Media.create({
      journal_entry_id: req.body.journal_entry_id,
      user_id: req.body.user_id,
      filename: req.body.filename,
      cloudinary_url: result.secure_url,
      cloudinary_id: result.public_id,
      file_type: req.body.file_type,
      alt_text: req.body.alt_text,
      caption: req.body.caption,
    });

    // --- UPDATE REDIS CALENDAR SUMMARY (PATCH PREVIEW IMAGE) ---
    try {
      const entryId = req.body.journal_entry_id;
      const userId = req.body.user_id;
      const imageUrl = result.secure_url;

      // Load existing Redis cache
      let summary = await redis.get(`calendar:summary:${userId}`);
      if (!summary) {
        summary = {};
      } else {
        summary = JSON.parse(summary);
      }

      // We don't know the date yet — so we must search for the entry
      for (const dateStr in summary) {
        const entries = summary[dateStr];

        // Find matching entry by ID
        const entryIndex = entries.findIndex((e) => e.id === Number(entryId));
        if (entryIndex !== -1) {
          // Update preview image
          summary[dateStr][entryIndex].preview_img = imageUrl;

          // Save back to Redis
          await redis.set(
            `calendar:summary:${userId}`,
            JSON.stringify(summary)
          );

          break;
        }
      }
    } catch (err) {
      console.error("Redis update (media) failed:", err);
    }
    res.status(200).json({ imageUrl: media.cloudinary_url }); // use correct property
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}

const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await Media.getSingleEntryByJournalId(id);
    if (!media) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
};

module.exports = { uploadImage, getMediaById };
