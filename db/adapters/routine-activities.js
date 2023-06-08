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
async function updateRoutineActivity(
  routineActivityId,
  count,
  duration,
  creator_id
) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      ` UPDATE routine_activities 
            SET count = $1, duration = $2
            WHERE id = $3 AND routine_activities.routine_id = creator_id AND routines.creator_id = $4
            RETURNING *;
        `,
      [count, duration, routineActivityId, creator_id]
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

async function getRoutineActivityByRoutine(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE routine_id = $1
      `,
      [routineId]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityByRoutine,
};
