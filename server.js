const PORT = 3000;
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { client } = require("./db/client");
client.connect();
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "./client", "dist")));
// Routes
app.use("/api", require("./routes"));

const { authRequired } = require("./routes/utils");
app.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized!");
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Server App
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
