/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("media").del();
  await knex("media").insert([
    {
      id: 1,
      user_id: 1,
      journal_entry_id: 1,
      filename: "morning.jpg",
      s3_url: "https://s3.amazonaws.com/example/morning.jpg",
      s3_key: "morning.jpg",
      file_type: "image/jpeg",
      file_size: 204800,
      alt_text: "Sunrise over cityscape",
      caption: "Captured my view during meditation",
    },
    {
      id: 2,
      user_id: 2,
      journal_entry_id: 2,
      filename: "sketch.png",
      s3_url: "https://s3.amazonaws.com/example/sketch.png",
      s3_key: "sketch.png",
      file_type: "image/png",
      file_size: 102400,
      alt_text: "Sketch of tree",
      caption: "One of today’s creative outputs",
    },
    {
      id: 3,
      user_id: 3,
      journal_entry_id: 3,
      filename: "desk.png",
      s3_url: "https://s3.amazonaws.com/example/desk.png",
      s3_key: "desk.png",
      file_type: "image/png",
      file_size: 95000,
      alt_text: "Messy school desk",
      caption: "This is why I feel so unorganized",
    },
  ]);
};
