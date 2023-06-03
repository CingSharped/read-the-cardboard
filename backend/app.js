const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

const userRouter = require('./routers/users')

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Read The Cardboard API");
});

app.use('/users', userRouter)

module.exports = app;