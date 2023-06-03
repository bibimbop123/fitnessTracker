const routinesRouter = require("express").Router();
const {
  getAllRoutines,
  createRoutine,
  getRoutineById,
} = require("../db/adapters/routines");
const { authRequired } = require("./utils");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routine = await getAllRoutines();
    res.send(routine);
  } catch (error) {
    next(error);
  }
});
routinesRouter.post("/", async (req, res, next) => {
  try {
    const { creator_id, is_public, name, goal } = req.body;
    const createdRoutine = await createRoutine({
      creator_id,
      is_public,
      name,
      goal,
    });
    res.send(createdRoutine);
  } catch (error) {
    next(error);
  }
});

// routinesRouter.patch("/:id", authRequired, async (req, res, next) => {
//   const { id } = req.params;
//   const { creator_id, is_public, name, goal } = req.body;
//   try {
//     const routine = await getRoutineById(+req.params.id);
//     if (req.user.id === routine.creator_id) {
//       const updatedRoutine = await updateRoutine(+id, req.body);
//       res.send(updatedRoutine);
//       console.log("updatedRoutine", updatedRoutine);
//     } else {

//       alert("you didn't create this routine");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = routinesRouter;
