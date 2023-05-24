const routinesRouter = require("express").Router();
const { getAllRoutines } = require("../db/adapters/routines");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routine = await getAllRoutines();
    res.send(routine);
  } catch (error) {
    next(error);
  }
});
module.exports = routinesRouter;
