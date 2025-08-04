/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.specificType("id", "serial").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("hashed_password").notNullable();
    table.text("goal"); // User-defined journaling goal
    table.integer("current_streak").defaultTo(0);
    table.integer("longest_streak").defaultTo(0);
    table.date("last_entry_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
