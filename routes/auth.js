const authRouter = require("express").Router();

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

module.exports = authRouter;
