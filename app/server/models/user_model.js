const knex = require("../db/knex");
const {
  hashPassword,
  comparePasswords,
} = require("../utilities/passwordHasher");

class User {
  #hashedPassword; //private value declared

  constructor({ id, username, email, hashed_password }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.#hashedPassword = hashed_password;
  }

  static async createNewUser({ username, email, password }) {
    const hashedPassword = await hashPassword(password);
    const query = `
    INSERT INTO users (username, email, hashed_password)
    VALUES (?, ?, ?)
    RETURNING *
  `;

    const result = await knex.raw(query, [username, email, hashedPassword]);
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
}

module.exports = User;
