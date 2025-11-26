//Dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//IMPORTS
//****************************************************************************/
const upload = require("./middleware/upload");
const logRoutes = require("./middleware/logRoutes");
const requireAuth = require("./middleware/requireAuth");

//auth
const {
  signup,
  login,
  findMe,
  logout,
} = require("./controllers/auth_controllers");

//user
const getStreak = require("./controllers/get_streak");

//journal entry
const {
  createJournalEntry,
  getJournalEntryById,
  getAllEntriesByUser,
  getEntryCountByUser,
  updateJournalEntry,
  deleteJournalEntry,
} = require("./controllers/journal_entry_controller");

//media
const { uploadImage, getMediaById } = require("./controllers/mediaController");

//ai insights
const {
  createAiInsight,
  getAiInsightsByUser,
} = require("./controllers/ai_insights_controller");

//weather
const getWeather = require("./services/weather");

//MIDDLEWARE
//***************************************************************************/
app.use(express.json());
app.use(cookieParser());
app.use(logRoutes);

//ROUTES
//*************************************************************************** */

//upload an image
//listen for this endpoint    use this (multer) middleware    pass to controller
app.post("/api/media/upload", upload.single("image"), uploadImage);

//get streak (user)
app.get("/api/user/getStreak", requireAuth, getStreak);

//media
app.get("/api/media/entry/:id", getMediaById);

//weather
app.get("/api/weather", getWeather);

//authentication
app.get("/api/me", requireAuth, findMe);
app.post("/api/register", signup);
app.post("/api/login", login);
app.post("/api/logout", requireAuth, logout);

//journal entries
app.post("/api/journal/entries/new", createJournalEntry);
app.get("/api/journal/entries/:id", getJournalEntryById);
app.get("/api/user/entries/count", requireAuth, getEntryCountByUser);
app.get("/api/journal/entries/user/:user_id", getAllEntriesByUser);
app.patch("/api/journal/entries/:id", updateJournalEntry);
app.delete("/api/journal/entries/:id", deleteJournalEntry);

//ai insights
app.post("/api/ai-insights", requireAuth, createAiInsight);
app.get("/api/ai-insights/user/:user_id", requireAuth, getAiInsightsByUser);

//EXPRESS STUFF
//*************************************************************************** */
app.get("/", (req, res) => res.send("Welcome to SpaceScribe, log In here"));

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Express App is now listening at  http://localhost:${port}`)
);
//*************************************************************************** */
