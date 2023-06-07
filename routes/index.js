const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send({
      message: "API is up and running",
    });
  } catch (error) {
    next(error);
  }
});

const usersRouter = require("./users");
router.use("/users", usersRouter);
const activitiesRouter = require("./activities");
router.use("/activities", activitiesRouter);
const routinesRouter = require("./routines");
router.use("/routines", routinesRouter);
const routineActivitiesRouter = require("./routine_activities");
router.use("/routineactivities", routineActivitiesRouter);

module.exports = router;
