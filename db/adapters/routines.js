const { client } = require("../client");

async function createRoutine({ creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines("creator_id", is_public, name, goal)
        VALUES($1,$2,$3,$4)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        `,
      [creator_id, is_public, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}
async function getAllRoutines() {
  const { rows } = await client.query(`
  SELECT * FROM routines
  INNER JOIN activities 
  ON routines.id = activities.id
  INNER JOIN users
  ON routines.creator_id = users.id
  `);
  return rows;
}

async function getRoutineById(id) {
  console.log("hello");
  const {
    rows: [routine],
  } = await client.query(
    `
    SELECT 
    routines.id as id,
    routines.name as name,
    routines.goal as goal, 
    routines.creator_id,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE 
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'routineActivityid', routine_activities.id,
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
        )
      ) END AS activities
      FROM routines
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities 
      ON routine_activities.activity_id = activities.id
      WHERE routines.id = $1
      GROUP BY routines.id, routine_activities.routine_id
  `,
    [id]
  );

  return routine;
}
async function getRoutinesWithoutActivities() {
  const { rows } = await client.query(`SELECT * from routines`);
  return rows;
}
async function getAllRoutinesByUser(userId) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM routines
        WHERE creator_id = ${userId};
        `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          
        )
      ) END AS activities
      FROM routines
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routine_activities.activity_id
      WHERE routines.is_public = true
      GROUP BY routines.id, routine_activities.routine_id
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
async function getPublicRoutinesByUser(username) {
  try {
    const { rows } = client.query(
      `
      SELECT 
      routines.id as id,
      routines.name as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE 
      JSON_AGG(
        JSon_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          )
        ) END AS activities
        FROM routines
        JOIN users
        ON routines.creator_id = users.id
        FULL OUTER JOIN routine_activities
        ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities 
        ON activities.id = routine_activities.activity_id
        WHERE users.username = $1 AND routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id
     
    `,
      [username]
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getPublicRoutinesByActivity(activityId) {
  const { rows } = await client.query(
    `
    SELECT 
    routines.id as id,
    routines.name as goal,
    CASE WHEN routine_activities.activity_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
        )
      ) END AS activities
      FROM routines
      JOIN users
      ON routines.creator_id = users.id
      FULL OUTER JOIN routine_activities
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities 
      ON activities.id = routine_activities.activity_id
      WHERE routines.is_public = true AND routine_activities.activity_id = $1
      GROUP BY routines.id, routine_activities.routine_id, routine_activities.activity_id
      `,
    [activityId]
  );
  console.log({ rows });
  return rows;
}
async function updateRoutine(routineId, is_public, name, goal) {
  try {
    const {
      rows: [updatedRoutine],
    } = await client.query(
      `UPDATE routines
      SET  name = $3, goal = $4, is_public = $2
      WHERE  id = $1
      RETURNING *
    `,
      [routineId, is_public, name, goal]
    );
    return updatedRoutine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routineId) {
  await client.query(
    `DELETE from routines
          WHERE id = $1
          `,
    [routineId]
  );
  return;
}
module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
};
