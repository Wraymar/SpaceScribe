/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("media").del();
  await knex("media").insert([
    {
      user_id: 1,
      journal_entry_id: 1,
      filename: "morning.jpg",
      cloudinary_url:
        "https://images.pond5.com/sunrise-sun-rising-over-downtown-085334354_prevstill.jpeg",
      // cloudinary_key: "morning.jpg",
      file_type: "image/jpeg",
      file_size: 204800,
      alt_text: "Sunrise over cityscape",
      caption: "Captured my view during meditation",
    },
    {
      user_id: 2,
      journal_entry_id: 2,
      filename: "sketch.png",
      cloudinary_url:
        "https://letsdrawtoday.com/wp-content/uploads/2021/06/How-to-Draw-a-Tree-with-Leaves-featured-image.jpg",
      // cloudinary_key: "sketch.png",
      file_type: "image/png",
      file_size: 102400,
      alt_text: "Sketch of tree",
      caption: "One of today’s creative outputs",
    },
    {
      user_id: 3,
      journal_entry_id: 3,
      filename: "desk.png",
      cloudinary_url:
        "https://www.conferencesthatwork.com/wp-content/uploads/2010/08/messy-desk-harryharris-300782460_bafaba2776_o.jpg",
      // cloudinary_key: "desk.png",
      file_type: "image/png",
      file_size: 95000,
      alt_text: "Messy school desk",
      caption: "This is why I feel so unorganized",
    },
  ]);
};
