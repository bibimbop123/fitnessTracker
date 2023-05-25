const { client } = require("../client");
async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
            INSERT INTO activities(name, description)
            VALUES($1,$2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  const { rows } = await client.query(`
    SELECT * FROM activities;
  `);
  return rows;
}

async function getActivityById(id) {
  const { rows } = await client.query(`
    SELECT * FROM activities
    WHERE id=${id};
  `);
  return rows;
}
module.exports = { createActivity, getAllActivities, getActivityById };
