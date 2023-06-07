const activitiesRouter = require("express").Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");
const { authRequired } = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});
//check if user is authorized, and compare req.user.id = creator_id
activitiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newActivity = await createActivity({ name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  try {
    const { activityId } = req.params.activityId;
    const publicRoutineswithActivity = await getPublicRoutinesByActivity(
      activityId
    );
    res.send(publicRoutineswithActivity);
  } catch (error) {
    next(error);
  }
});

// check if user is authorized and make sure req.user.id = creator_id
// join the routines activities table and then check req.user.id= creatorid
activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updatedActivity = await updateActivity(activityId, name, description);
    res.send(updatedActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
