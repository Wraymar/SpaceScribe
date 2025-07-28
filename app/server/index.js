//Dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//IMPORTS
//*************************************************************************** */
const upload = require("./middleware/upload");
const logRoutes = require("./middleware/logRoutes");
const requireAuth = require("./middleware/requireAuth");

//auth
const { signup, login, findMe } = require("./controllers/auth_controllers");

//journal entry
const {
  createJournalEntry,
  getJournalEntryById,
  getAllEntriesByUser,
  updateJournalEntry,
  deleteJournalEntry,
} = require("./controllers/journal_entry_controller");

//media
const { uploadImage, getMediaById } = require("./controllers/mediaController");

//weather
const getWeather = require("./services/weather");

//MIDDLEWARE
//*************************************************************************** */
app.use(express.json());
app.use(cookieParser());
app.use(logRoutes);

//ROUTES
//*************************************************************************** */

//upload an image
//listen for this endpoint    use this middleware    pass to controller
app.post("/api/media/upload", upload.single("image"), uploadImage);

//media
app.get("/api/media/entry/:id", getMediaById);

//weather
app.get("/api/weather", getWeather);

//authentication
app.get("/api/me", requireAuth, findMe);
app.post("/api/register", signup);
app.post("/api/login", login);

//journal entries
app.post("/api/journal/entries/new", createJournalEntry);
app.get("/api/journal/entries/:id", getJournalEntryById);
app.get("/api/journal/entries/user/:user_id", getAllEntriesByUser);
app.patch("/api/journal/entries/:id", updateJournalEntry);
app.delete("/api/journal/entries/:id", deleteJournalEntry);

//tasks
// app.post();
// app.get();
// app.patch();
// app.delete();

//EXPRESS STUFF
//*************************************************************************** */
app.get("/", (req, res) => res.send("Welcome to SpaceScribe, log In here"));

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Express App is now listening at  http://localhost:${port}`)
);
//*************************************************************************** */
