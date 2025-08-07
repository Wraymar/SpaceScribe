// controllers/mediaController.js
const cloudinary = require("../services/cloudinary");
const fs = require("fs");
const Media = require("../models/media_model");

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
