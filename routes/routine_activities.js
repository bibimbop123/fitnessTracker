const routinesActivitiesRouter = require("express").Router();
const {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
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

routinesActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const newRoutineActivities = await addActivityToRoutine();
    res.send(newRoutineActivities);
  } catch (error) {
    next(error);
  }
});

//PATCH /routine_activities/:routineActivityId
// you still need to check to see if the correct user is updating routineActivity data
routinesActivitiesRouter.patch(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const { count, duration } = req.body;
      const updatedRoutineActivity = await updateRoutineActivity(
        routineActivityId,
        count,
        duration
      );
      res.send(updatedRoutineActivity);
    } catch (error) {
      next(error);
    }
  }
);
//delete /routine_activities/:routineActivityId
// you still need to check to see if the correct user is updating routineActivity data
routinesActivitiesRouter.delete(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const destroyedActivityRoutine = await destroyRoutineActivity();
      console.log("destroyedActvityRoutine", destroyedActivityRoutine);
      res.send(destroyedActivityRoutine);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routinesActivitiesRouter;
