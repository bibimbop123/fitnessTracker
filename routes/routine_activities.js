const routinesActivitiesRouter = require("express").Router();
const {
  getRoutineActivityById,
  addActivityToRoutine,
} = require("../db/adapters/routine-activities");
const { authRequired } = require("./utils");

routinesActivitiesRouter.get("/", async (req, res, next) => {
  try {
    const routineActivity = await getRoutineActivityById();
    res.send(routineActivity);
  } catch (error) {
    next(error);
  }
});

//post  /routine_activities
routinesActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const newRoutineActivities = await addActivityToRoutine();
    res.send(newRoutineActivities);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesActivitiesRouter;
