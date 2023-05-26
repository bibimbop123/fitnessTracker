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
  const {
    rows: [routine],
  } = await client.query(
    `
    SELECT routines.name, activities.name FROM routines 
    JOIN activities 
    ON routines.id = activities.id
    WHERE routine.id = $1 
    
    
  `,
    [id]
  );
  return routine;
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
    ON routines.id = activities.id;
    WHERE is_public = true
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
