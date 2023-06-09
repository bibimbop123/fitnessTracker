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

activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updatedActivity = await updateActivity(
      activityId,
      name,
      description,
      req.user.id
    );

    res.send(updatedActivity);
  } catch (error) {
    next({ message: "invalid user credentials" });
  }
});

module.exports = activitiesRouter;
