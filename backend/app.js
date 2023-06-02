const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Read The Cardboard API");
});

module.exports = app;