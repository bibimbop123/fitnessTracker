const { client } = require("../client");

async function getRoutineActivityById(routineActivityId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      SELECT * FROM routine_activities
      WHERE id = $1
    `,
      [routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}
async function addActivityToRoutine(routine_id, activity_id, duration, count) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO routine_activities(routine_id, activity_id, duration, count)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [routine_id, activity_id, duration, count]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}
async function updateRoutineActivity(routineActivityId, count, duration) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      ` UPDATE routine_activities 
            SET count = $2, duration = $3
            WHERE id = $1
            RETURNING *;
        `,
      [routineActivityId, count, duration]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}
async function destroyRoutineActivity(routineActivityId) {
  await client.query(
    `DELETE from routine_activities
        WHERE id = $1
        `,
    [routineActivityId]
  );
  return;
}
module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
};
