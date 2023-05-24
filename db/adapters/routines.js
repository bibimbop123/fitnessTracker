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
    SELECT * FROM routines;
  `);
  return rows;
}

async function getRoutineById(id) {
  const {
    rows: [routine],
  } = await client.query(
    `
    SELECT routines.name, activities.name 
    FROM routines 
    WHERE routine.id = $1 
    INNER JOIN activities 
    ON routines.id = activities.id
    
  `,
    [id]
  );
  return routine;
}

module.exports = { createRoutine, getAllRoutines, getRoutineById };
