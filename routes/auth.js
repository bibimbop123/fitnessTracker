const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users.js");
const { authRequired } = require("./utils.js");
const jwt = require("jsonwebtoken");

//this is where we create token

// POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: " That user already exists!",
        name: " Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const user = await createUser({ username, hashedPassword });

    const token = jwt.sign(user, process.env.JWT_TOKEN);
    console.log("token:", token);

    res.cookie("token", token, {
      sameSite: `strict`,
      httpOnly: true,
      signed: true,
    });
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkedpassword = await bcrypt.compare(password, user.password);
    const user = await getUserByUsername({ username, checkedpassword });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
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

authRouter.get("/me", authRequired, async (req, res, next) => {
  res.send(req.user);
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
