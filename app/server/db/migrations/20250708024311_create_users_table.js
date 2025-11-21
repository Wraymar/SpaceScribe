exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.specificType("id", "serial").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("hashed_password").notNullable();
    table.text("goal"); // User-defined journaling goal
    table.integer("current_streak").notNullable().defaultTo(0);
    table.integer("longest_streak").notNullable().defaultTo(0);
    table.date("last_entry_date");
    table.string("timezone").defaultTo("America/New_York");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
