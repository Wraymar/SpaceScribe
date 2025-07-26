// middleware/upload.js
const multer = require("multer");

// Store files temporarily in the "uploads/" directory
const upload = multer({ dest: "uploads/" });

module.exports = upload;
