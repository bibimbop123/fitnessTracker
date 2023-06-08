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
// routinesActivitiesRouter.delete(
//   "/:routineActivityId",
//   authRequired,
//   async (req, res, next) => {
//     try {
//       // Check if the req.user.id is the same as the routine ID (you have this because of the authRequired function)
//       //  Get the routine_activity by its id first!
//       //  compare the routine_id and get the associated routine
//       //  check if the associated routine's creator_id is equal to our req.user.id

//       const { routineActivityId } = req.params;
//       const destroyedActivityRoutine = await destroyRoutineActivity(
//         routineActivityId
//       );
//       console.log("destroyedActvityRoutine", destroyedActivityRoutine);
//       res.send(destroyedActivityRoutine);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

routinesActivitiesRouter.delete(
  "/:routineId/:activityId",
  async (req, res, next) => {
    const { routineId, activityId } = req.params;
    // get the routineById and make sure the req.user.id is the routine's crator_id
    try {
      // DELETE FROM routine_activities where routine_id = req.params.routineId AND activity_id = req.params.acitivtyId
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routinesActivitiesRouter;
