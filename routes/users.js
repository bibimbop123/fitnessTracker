const usersRouter = require("express").Router();
const { getAllUsers } = require("../db/adapters/users");

usersRouter.get("/users", (req, res, next) => {
  try {
    const users = getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
