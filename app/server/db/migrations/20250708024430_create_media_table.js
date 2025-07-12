/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("media", (table) => {
    table.specificType("id", "serial").primary();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("journal_entry_id")
      .notNullable()
      .references("id")
      .inTable("journal_entries")
      .onDelete("CASCADE");
    table.string("filename").notNullable();
    table.string("s3_url").notNullable();
    table.string("s3_key").notNullable();
    table.string("file_type").notNullable();
    table.integer("file_size");
    table.string("alt_text");
    table.text("caption");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("media");
};
