const PORT = 3000;
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
let cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const cors = require("cors");

const { client } = require("./db/client");

client.connect();
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes
app.use("/api", require("./routes"));

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
const { authRequired } = require("./routes/utils");
app.get("/test", (req, res, next) => {
  res.send("You are authorized!");
});
// Server App
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
