const routinesActivitiesRouter = require("express").Router();
const {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine-activities");
const { getRoutineById } = require("../db/adapters/routines");
const { getUserByUsername } = require("../db/adapters/users");
const { routines } = require("../db/seedData");
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
//       // Check if the req.user.id is the same as the routine creator ID (you have this because of the authRequired function)
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
  authRequired,
  async (req, res, next) => {
    // get the routineById and make sure the req.user.id is the routine's crator_id
    try {
      const routine = await getRoutineById(+req.params.routineId);
      const { routine_id, activity_id } = req.params;
      console.log(req.user.id);
      if (req.user.id === routine.creator_id) {
        const destroyedActivityRoutine = await destroyRoutineActivity(
          routine_id,
          activity_id
        );
        console.log("destroyedActivityRoutine:", destroyedActivityRoutine);
        res.send(destroyedActivityRoutine);
      } else {
        next({ message: "You are not authorized to edit this routine" });
      }

      // DELETE FROM routine_activities where routine_id = ( this will be $1 --req.params.routineId) AND activity_id = ( this will be $2 req.params.acitivtyId
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routinesActivitiesRouter;
