const knex = require("../db/knex");
const bcrypt = require("bcrypt");

class User {
  constructor({ id, username, email, hashedPassword }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.passwordHash);
  };

  static async createNewUser({ username, password, email }) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `
    INSERT INTO users (username, email, passwordHash)
    VALUES (?, ?, ?)
    RETURNING *
  `;

    const result = await knex.raw(query, [username, email, passwordHash]);
    const rawUserData = result.rows[0];
    console.log(rawUserData);
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

  static async findByEmail(email) {
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
    const result = await knex.raw(query, [username, email, age, zipcode, id]);
    const rawUpdatedUser = await result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  User,
};
