const usersRouter = require("express").Router();
const { getAllUsers } = require("../db/adapters/users");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
