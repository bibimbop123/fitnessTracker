const routinesRouter = require("express").Router();
const { getAllRoutines, createRoutine } = require("../db/adapters/routines");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routine = await getAllRoutines();
    res.send(routine);
  } catch (error) {
    next(error);
  }
});
routinesRouter.post("/", async (req, res, next) => {
  try {
    const { creator_id, is_public, name, goal } = req.body;
    const createdRoutine = await createRoutine({
      creator_id,
      is_public,
      name,
      goal,
    });
    res.send(createdRoutine);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
