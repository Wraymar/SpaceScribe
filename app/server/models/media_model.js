// models/media_model.js
const knex = require("../db/knex");

class Media {
  constructor({
    id,
    journal_entry_id,
    filename,
    cloudinary_url,
    file_type,
    alt_text,
    caption,
    created_at,
  }) {
    this.id = id;
    this.journal_entry_id = journal_entry_id;
    this.filename = filename;
    this.cloudinary_url = cloudinary_url;
    this.file_type = file_type;
    this.alt_text = alt_text;
    this.caption = caption;
    this.created_at = created_at;
  }

  static async create({
    journal_entry_id,
    user_id,
    filename,
    cloudinary_url,
    file_type = null,
    alt_text = null,
    caption = null,
  }) {
    const query = `
      INSERT INTO media (journal_entry_id, user_id, filename, cloudinary_url, file_type, alt_text, caption)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `;
    const result = await knex.raw(query, [
      journal_entry_id,
      user_id,
      filename,
      cloudinary_url,
      file_type,
      alt_text,
      caption,
    ]);
    return new Media(result.rows[0]);
  }

  static async findAllByEntryId(entryId) {
    const query = `
      SELECT * FROM media WHERE journal_entry_id = ?
    `;
    const result = await knex.raw(query, [entryId]);
    return result.rows.map((m) => new Media(m));
  }

  static async getSingleEntryByJournalId(journalId) {
    const query = `
      SELECT * FROM media where journal_entry_id = ?
    `;
    const result = await knex.raw(query, [journalId]);
    return result.rows[0];
  }

  static async findAllByUserId(userid) {
    const query = `
      SELECT * FROM media WHERE user_id = ?
    `;
    const result = await knex.raw(query, [userid]);
    return result.rows.map((m) => new Media(m));
  }
}

module.exports = Media;
