const knex = require("../db/knex");
const {
  hashPassword,
  comparePasswords,
} = require("../utilities/passwordHasher");

class User {
  #hashedPassword; //private value declared

  constructor({
    id,
    username,
    email,
    hashed_password,
    goal,
    current_streak,
    longest_streak,
    last_entry_date,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.#hashedPassword = hashed_password;
    this.goal = goal;
    this.current_streak = current_streak;
    this.longest_streak = longest_streak;
    this.last_entry_date = last_entry_date;
  }

  async isValidPassword(password) {
    return await comparePasswords(password, this.#hashedPassword);
  }

  static async createNewUser({
    username,
    email,
    password,
    goal,
    current_streak = 0,
    longest_streak = 0,
    last_entry_date = null,
  }) {
    const hashedPassword = await hashPassword(password);
    const query = `
      INSERT INTO users (username, email, hashed_password, goal, current_streak, longest_streak, last_entry_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `;
    const result = await knex.raw(query, [
      username,
      email,
      hashedPassword,
      goal,
      current_streak,
      longest_streak,
      last_entry_date,
    ]);
    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  static async listAllUsers() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  static async findUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await knex.raw(query, [email]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async updateUserById(id, username, email) {
    const query = `
      UPDATE users
      SET username = ?,
        email = ?,
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [username, email, id]);
    const rawUpdatedUser = await result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async updateStreak(userId) {
    const today = new Date().toISOString().split("T")[0];

    const query = `SELECT current_streak, longest_streak, last_entry_date FROM users WHERE id = ?`;
    const result = await knex.raw(query, [userId]);
    const user = result.rows[0];

    if (!user) return null;

    let { current_streak, longest_streak, last_entry_date } = user;

    // Prevent double counting if user already created an entry today
    if (
      last_entry_date &&
      new Date(last_entry_date).toDateString() ===
        new Date(today).toDateString()
    ) {
      return user;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    //if the last entry date was yesterday then we can update the streak if not it means it would be one
    if (
      last_entry_date &&
      new Date(last_entry_date).toDateString() === yesterday.toDateString()
    ) {
      current_streak += 1;
    } else {
      current_streak = 1;
    }

    longest_streak = Math.max(longest_streak, current_streak);

    const updateQuery = `
      UPDATE users
      SET current_streak = ?, longest_streak = ?, last_entry_date = ?
      WHERE id = ?
      RETURNING *
    `;

    // "Today" would be the new "last_entry_date"
    const updatedUser = await knex.raw(updateQuery, [
      current_streak,
      longest_streak,
      today,
      userId,
    ]);
    return new User(updatedUser.rows[0]);
  }
}

module.exports = User;
