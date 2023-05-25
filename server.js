require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;
const jwt = require("jsonwebtoken");
const app = express();

const { client } = require("./db/client");

client.connect();
// Middleware
app.use(morgan("dev"));
app.use(express.json());

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

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

// app.post("/signup", (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const token = jwt.sign({ username, password }, process.env["SECRET"]);
//     res.send({
//       message: "Thanks for signing up!",
//       token: token,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// app.get("/authenticate", (req, res, next) => {
//   const authorization = req.headers.authorization;

//   if (!authorization) {
//     res.status(403);
//     next({
//       message: "Sorry, you are not an authenticated user",
//       name: "Unauthorized",
//     });
//     return;
//   }

//   const prefix = "Bearer ";
//   const token = authorization.slice(prefix.length);
//   try {
//     const { username, iat } = jwt.verify(token, process.env["SECRET"]);
//     res.send({
//       success: true,
//       message: `Correctly Authenticated!`,
//       data: {
//         username,
//         iat,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });
