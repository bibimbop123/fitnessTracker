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
    ON routines.id = activities.id;
  `);
  return rows;
}

async function getRoutineById(id) {
  console.log("hello");
  const { rows } = await client.query(
    `
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
        JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        JOIN activities 
        ON routine_activities.activity_id = activities.id
        WHERE routines.id = $1
        GROUP BY routines.id, routine_activities.routine_id
  `,
    [id]
  );
  console.log({ rows });
  return rows;
}
async function getRoutinesWithoutActivities() {
  const {
    rows: [routine],
  } = await client.query(`SELECT * FROM routines`);
}
async function getAllPublicRoutines() {
  try {
    const {
      rows: [publicRoutine],
    } = await client.query(`
    SELECT * FROM routines
    JOIN activities 
    ON routines.id = activities.id
    WHERE is_public = true;
  `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
};
