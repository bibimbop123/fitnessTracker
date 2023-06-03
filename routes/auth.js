const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const { authRequired } = require("./utils.js");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
require("dotenv").config();

//this is where we create token

authRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggiedIn: false,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

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

module.exports = authRouter;
