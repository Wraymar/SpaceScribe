//Dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

//Imports
const logRoutes = require("./middleware/logRoutes");
const { signup, login } = require("./controllers/auth_controllers");

//MIDDLEWARE
app.use(express.json());
app.use(logRoutes);

//ROUTES
//authentication
app.post("/api/register", signup);
app.post("/api/login", login);

//EXPRESS STUFF
//*************************************************************************** */
app.get("/", (req, res) => res.send("Welcome to SpaceScribe, log In here"));

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Express App is now listening at  http://localhost:${port}`)
);
//*************************************************************************** */
