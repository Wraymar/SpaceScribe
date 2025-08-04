const knex = require("../db/knex");

class JournalEntry {
  constructor({ id, user_id, title, content, mood, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.mood = mood;
    this.created_at = created_at;
  }

  static async create({ user_id, title, content, mood, is_shared = false }) {
    const query = `
      INSERT INTO journal_entries (user_id, title, content, mood, is_shared)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `;
    const result = await knex.raw(query, [
      user_id,
      title,
      content,
      mood,
      is_shared,
    ]);
    return new JournalEntry(result.rows[0]);
  }

  static async findById(id) {
    const query = `SELECT * FROM journal_entries WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const entry = result.rows[0];
    return entry ? new JournalEntry(entry) : null;
  }

  static async findAllByUserId(user_id) {
    const query = `SELECT * FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC`;
    const result = await knex.raw(query, [user_id]);
    return result.rows.map((entry) => new JournalEntry(entry));
  }

  static async countByUserId(user_Id) {
    const query = `SELECT COUNT(id) AS total FROM journal_entries WHERE user_id = ?`;
    const result = await knex.raw(query, [user_Id]);
    return parseInt(result.rows[0].total, 10);
  }

  static async updateById(id, { title, content, mood, is_shared }) {
    const query = `
      UPDATE journal_entries
      SET title = ?, content = ?, mood = ?, is_shared = ?, updated_at = NOW()
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [title, content, mood, is_shared, id]);
    const updated = result.rows[0];
    return updated ? new JournalEntry(updated) : null;
  }

  static async deleteById(id) {
    const query = `DELETE FROM journal_entries WHERE id = ? RETURNING *`;
    const result = await knex.raw(query, [id]);
    const deleted = result.rows[0];
    return deleted ? new JournalEntry(deleted) : null;
  }
}

module.exports = JournalEntry;
