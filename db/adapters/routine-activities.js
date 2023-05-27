const { client } = require("../client");
async function getRoutineActivityById(routineActivityId) {
  const { rows } = await client.query(
    `
      SELECT * FROM routine_activities
      WHERE id = ${routineActivityId};

    `,
    [routineActivityId]
  );
  return rows;
}
async function addActivityToRoutine(routine_id, activity_id, duration, count) {
  const { rows } = await client.query(
    `
      INSERT INTO routine_activities(routine_id, activity_id, duration, count)
      VALUES ($1, $2, $3, $4)

    `,
    [routine_id, activity_id, duration, count]
  );
  return rows;
}
module.exports = { getRoutineActivityById, addActivityToRoutine };
