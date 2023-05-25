const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send("API is greeaaat!");
  } catch (error) {
    next(error);
  }
});
module.exports = router;

const usersRouter = require("./users");
router.use("/users", usersRouter);
const activitiesRouter = require("./activities");
router.use("/activites", activitiesRouter);
const routinesRouter = require("./routines");
router.use("/routines", routinesRouter);
const routineActivitiesRouter = require("./routine_activities");
router.use("/routineactivities", routineActivitiesRouter);
const authRouter = require("./auth.js ");
router.use("/auth", authRouter);
