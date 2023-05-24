const routinesActivitiesRouter = require("express").Router();
const { getRoutineActivityById } = require("../db/adapters/routine-activities");

routinesActivitiesRouter.get("/", async (req, res, next) => {
  try {
    const routineActivity = await getRoutineActivityById();
    res.send(routineActivity);
  } catch (error) {
    next(error);
  }
});
module.exports = routinesActivitiesRouter;
