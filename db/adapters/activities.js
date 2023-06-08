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
//work on this
async function getActivityById(id) {
  const {
    rows: [activity],
  } = await client.query(`
    SELECT * FROM activities
    WHERE id=${id};
  `);
  return activity;
}

async function updateActivity(activityId, name, description) {
  // const setString = Object.keys(fields)
  //   .map((key, index) => `"${key}"=$${index + 1}`)
  //   .join(", ");

  // if (setString.length === 0) {
  //   return;
  // }

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        UPDATE activities
        SET name = $1, description = $2
        JOIN users
      ON routines.creator_id = users.id
      FULL OUTER JOIN routine_activities
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities 
      ON activities.id = routine_activities.activity_id
        WHERE id = $3 
        RETURNING *;
      `,
      [name, description, activityId]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
