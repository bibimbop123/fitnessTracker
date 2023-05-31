const activitiesRouter = require("express").Router();
const { getAllActivities } = require("../db/adapters/activities");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});
module.exports = activitiesRouter;
