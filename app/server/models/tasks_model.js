const knex = require("../db/knex");

class Task {
  constructor({
    id,
    user_id,
    title,
    description,
    is_completed,
    priority,
    due_date,
    created_at,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.is_completed = is_completed;
    this.priority = priority;
    this.due_date = due_date;
    this.created_at = created_at;
  }

  static async create({ user_id, title, description, priority, due_date }) {
    const query = `
      INSERT INTO tasks (user_id, title, description, priority, due_date)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `;
    const result = await knex.raw(query, [
      user_id,
      title,
      description,
      priority,
      due_date,
    ]);
    return new Task(result.rows[0]);
  }

  static async findById(id) {
    const result = await knex.raw(`SELECT * FROM tasks WHERE id = ?`, [id]);
    return result.rows[0] ? new Task(result.rows[0]) : null;
  }

  static async findAllByUserId(user_id) {
    const result = await knex.raw(
      `SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC`,
      [user_id]
    );
    return result.rows.map((task) => new Task(task));
  }

  static async updateById(
    id,
    { title, description, priority, due_date, is_completed }
  ) {
    const result = await knex.raw(
      `
        UPDATE tasks
        SET title = ?, description = ?, priority = ?, due_date = ?, is_completed = ?, updated_at = NOW()
        WHERE id = ?
        RETURNING *
      `,
      [title, description, priority, due_date, is_completed, id]
    );
    return result.rows[0] ? new Task(result.rows[0]) : null;
  }

  static async deleteById(id) {
    const result = await knex.raw(
      `DELETE FROM tasks WHERE id = ? RETURNING *`,
      [id]
    );
    return result.rows[0] ? new Task(result.rows[0]) : null;
  }
}

module.exports = Task;
