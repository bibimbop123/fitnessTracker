const activitiesRouter = require("express").Router();
const { getAllActivities } = require("../db/adapters/activities");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activity = await getAllActivities();
    res.send({ activity });
  } catch (error) {
    next(error);
  }
});
module.exports = activitiesRouter;
