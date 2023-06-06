const activitiesRouter = require("express").Router();
const {
  getAllActivities,
  createActivity,
} = require("../db/adapters/activities");
const { authRequired } = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});
activitiesRouter.patch(
  "/:activityId",
  authRequired,
  async (req, res, next) => {}
);

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newActivity = await createActivity({ name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});
module.exports = activitiesRouter;
