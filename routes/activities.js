const activitiesRouter = require("express").Router();
const { getAllActivities } = require("../db/adapters/activities");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllActivities();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = activitiesRouter;
