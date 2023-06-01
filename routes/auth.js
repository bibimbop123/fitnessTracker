const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const createUser = require("../db/adapters/users.js");
const { authRequired } = require("./utils.js");

//this is where we create token

// POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password, hashedPassword });
    delete user.password;

    const token = jwt.sign(user, "wopalopagus");

    res.cookie("token", token, {
      sameSite: `strict`,
      httpOnly: true,
      signed: true,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
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
// app.post("/register", (req, res, next) => {
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

module.exports = authRouter;
