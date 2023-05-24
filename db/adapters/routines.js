const { client } = require("../client");
async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO users(creatorId, isPublic, name, goal)
        VALUES($1,$2,$3,$5)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [creatorId, isPublic, name, goal]
    );
    return user;
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
module.exports = { createRoutine, getAllRoutines };
