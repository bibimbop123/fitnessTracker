const usersRouter = require("express").Router();
const { getPublicRoutinesByUser } = require("../db/adapters/routines");
const { getAllUsers } = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const username = req.params.username;
    const publicRoutinesbyUser = await getPublicRoutinesByUser(username);
    res.send({ publicRoutinesbyUser });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
