const apiRouter = require("express").Router();

apiRouter.get("/health", (req, res, next) => {
  try {
    res.send("API is greeaaat!");
  } catch (error) {
    next(error);
  }
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

//error handler
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
