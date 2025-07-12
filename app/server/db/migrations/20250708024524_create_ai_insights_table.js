/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ai_insights", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("insight_text").notNullable();
    table.string("insight_type");
    table.timestamp("generated_at").defaultTo(knex.fn.now());
    table.date("week_start_date");
    table.boolean("is_bookmarked").defaultTo(false);
    table.json("source_journal_ids");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ai_insights");
};
